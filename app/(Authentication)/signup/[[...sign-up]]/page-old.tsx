'use client'
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import Form from '@/app/components/forms-components/Form'
import FormInputText from '@/app/components/forms-components/FormInputText'
import SaveButton from "@/app/components/forms-components/SaveButton"; 
import styles from '../../../styles/styles.module.scss'
import Link from 'next/link'
import { clerkClient } from "@clerk/nextjs";
import { createOrganization } from "@/app/services/ClerkApiService";
import { ValidateEmail, ValidatePassword } from "@/app/helper/validations";
import { successToast, errorToast } from '@/app/helper/toastMsg';
export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp(); 
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [orgName, setOrgName] = useState<string>("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [showOtpMsg, setShowOtpMsg] = useState<boolean>(false);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  // start the sign up process.
  const {register, control,   handleSubmit } = useForm();  
  const [regEerror, setRegError] = useState({
    email:false,
    password:false,
    orgName:false,
  })
  const [regErrorMsg, setRegErrorMsg] = useState({
    email:'',
    password:'',
    orgName:'',
  })
  const organizationId = 'org_2Vw6nE5WQ8pgEu4DazlidKjhj8e';
  const handleEmail=(val:string)=>{
    if(!ValidateEmail(val)){
      setRegErrorMsg({
        ...regErrorMsg,
        email:'Enter a Valid email address.'
      })
    }else{
      setRegErrorMsg({ ...regErrorMsg, email:''})
    }
    return;
  }
  const handlePassword=(val:string)=>{
    //console.log()
    if(!ValidatePassword(val)){
      setRegErrorMsg({
        ...regErrorMsg,
        password:'Password must be 8 digits long and contain uppercase, lowercase, numeric value.'
      })
    }else{
      setRegErrorMsg({ ...regErrorMsg, password:''})
    }
    return;
  }
  const handleSignup = async () => {    
    if (!isLoaded) {
      return;
    }
    if( emailAddress==='' || password=== '' || orgName==='') {
      setRegError({
        email:(emailAddress===''),
        password: (password===''),
        orgName: (orgName==='')
      })
      return;
    }
    try {
      await signUp.create({
        emailAddress,
        password,
      });       
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" }); 
      // change the UI to our pending section.
      setPendingVerification(true);
      setTimeout(function(){
        setShowOtpMsg(true);
      },3000);
    } catch (err: any) {      
      if(err?.status===422 || err?.clerkError===true ){
        errorToast(err?.errors[0]?.message)
      } else{
        errorToast('Something went wrong, please try again.')
      }
    }
  }; 
  // This verifies the user using email code that is delivered.  
  const onPressVerify = async () => { 
    if (!isLoaded) {
      return;
    } 
    setInProgress(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {        
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete" && completeSignUp?.createdUserId) {        
        const createdBy = completeSignUp?.createdUserId; 
        if(clerkClient){    
          try { 
            const organization = await createOrganization({name: orgName, createdBy: createdBy});
            if(organization !== undefined){                         
              await setActive({ session: completeSignUp.createdSessionId });
              router.push("/gateways");
            }
          } catch (err) {          
            console.error(err);
          } 
        }
      }
      setInProgress(false);
    } catch (err: any) {
      if(err?.status===422 ){
        errorToast(err?.errors[0]?.message)
      } else{
        errorToast('Something went wrong, please try again.')
      }
      setInProgress(false);
    }
  };   
  return (
    <>
    <div className="grid grid-cols-7 gap-5 place-content-center	">  
      <div className="col-span-4 h-screen"> 
        <div className={`h-full lg:rounded-tr-[2.5rem] lg:rounded-br-[2.5rem]  ${styles.authBg}`} style={{backgroundImage:'url(/images/javelin.png)'}}></div>  
      </div>
      <div className="col-span-3 py-5 justify-self-center flex items-center ">
        {/* <SignUp /> */}
        {!pendingVerification && (
          <Form  onSubmit={handleSignup} handleSubmit={handleSubmit} register={register} className='form lg:w-[25rem]'>
            <div className=" grid col-span-1 bg-white rounded-lg shadow-lg w-full p-6">
              <div className="mb-4">
                <h1 className="text-lg font-bold">Create your account</h1>
                <p className="text-gray-200">to continue to JavelinPreview</p>
              </div>
              <FormInputText
                name="email" 
                label="Email"
                type='mail'                                              
                register={register} 
                handleChange={(e:any)=>{setEmailAddress(e.target.value)}} 
                onBlur={(e)=>{handleEmail(e.target.value)}}                                        
                placeholder="Email"                                 
                error={regEerror?.email && emailAddress === ''}
                defaultValue={emailAddress}  
                errorMsg={!ValidateEmail(emailAddress)?regErrorMsg?.email:''}
                wrapperClass="mb-3"
              /> 
              <FormInputText
                name="password" 
                label="Password"
                type='password'                                              
                register={register} 
                handleChange={(e:any)=>{setPassword(e.target.value)}} 
                onBlur={(e)=>{handlePassword(e.target.value)}}                                        
                placeholder="Password"                                 
                error={regEerror?.password && password === ''}
                errorMsg={!ValidatePassword(password)?regErrorMsg?.password:''}
                defaultValue={password}  
                wrapperClass="mb-3"
              />
              <FormInputText
                name="name" 
                label="Organization Name"
                type='text'                                              
                register={register} 
                handleChange={(e:any)=>{setOrgName(e.target.value)}}                                         
                placeholder="Organization Name"                                 
                error={regEerror?.orgName && orgName === ''}
                defaultValue={orgName}  
              /> 
              <div className="mt-3 mb-5 w-full">        
                <SaveButton btnTitle="Continue" btnClass="btn-md text-sm w-full"/> 
              </div>
              
              <p className="text-gray-200 mt-2 mb-4 text-sm">Have an account? <Link className="text-primary-300" href="/sign-in">Sign in</Link></p>
             
            </div>          
          </Form>
        )}
        {pendingVerification && (
          <div>
            <Form  onSubmit={onPressVerify} handleSubmit={handleSubmit} register={register} className='form lg:w-[25rem]'>
              {showOtpMsg && <p className="mb-3 py-3 px-2 text-xs text-center text-primary-100 rounded-sm max-w-full">Please Enter the verification code received on <span className="font-bold">{emailAddress}</span></p>}
              <FormInputText
                name="code" 
                label="Code"
                type='text'                                              
                register={register} 
                handleChange={(e:any)=>{setCode(e.target.value)}}                                         
                placeholder="Code..."                                 
                //error={error?.code && code === ''}
                defaultValue={code}  
              /> 
              <div className="mt-3 mb-5 w-full">        
                <SaveButton btnTitle="Verify Email" btnClass="btn-md text-sm w-full" inProgress={inProgress} /> 
              </div>              
            </Form>
          </div>
        )}      
      </div>
    </div>
    
    </>
  );
}
// import { SignUp } from "@clerk/nextjs";
// import styles from '../../../styles/styles.module.scss'
 
// export default function Page() {
//   return (
//   <>
//     <div className="grid grid-cols-7 gap-5 place-content-center	">  
//       <div className="col-span-4 h-screen">    
//         <img
//           className={`w-full ${styles.image_fluid}`}
//           src="/images/istockphoto-1426988809-1024x1024.jpg"        
//           alt="istockphoto-1426988809-1024x1024"
//         />
//       </div>
//       <div className="col-span-3 py-5 justify-self-center flex items-center ">
//         <SignUp />
//       </div>
//     </div>
//   </>
// );
// }