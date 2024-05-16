'use client';
import React,{ useEffect, useState, ChangeEvent } from 'react'
import { AxiosResponse } from 'axios'
import PageTitle from '@/app/components/PageTitle'
import Link from 'next/link';
import { useForm} from "react-hook-form"
import Form from '@/app/components/forms-components/Form'
import FormInputText from '@/app/components/forms-components/FormInputText'
import FormDropdown from '@/app/components/forms-components/FromDropdown'
import FormInputTextArea from '@/app/components/forms-components/FormInputTextarea'
import FormInputCheckbox from '@/app/components/forms-components/FormInputCheckbox'
import FormInputFile from '@/app/components/forms-components/FormInputFile'
import SaveButton from '@/app/components/forms-components/SaveButton'
import { getUser, getOrg } from '@/app/store/reducers/gateway.selector'
import { useAppSelector } from '@/app/store/hooks'
import { successToast, errorToast } from '@/app/helper/toastMsg';
import AppService from '@/app/services/AppService';
import MailServices from '@/app/services/MailServices';
import { Base64 } from 'aws-sdk/clients/ecr';
import { stateOrProvince } from 'aws-sdk/clients/importexport';
import { DeleteIcon } from '@/app/components/icons/svgIcons';
import { Files } from 'aws-sdk/clients/iotsitewise';
type GatewayOptions = { 
    displayValue:string;
    value:string;
    namespace:string;
    base_url:string;
    api_key_value:string;
};
const Support = () => {
    const currentOrg = useAppSelector(getOrg)  
    const activeUser = useAppSelector(getUser)  
    const breadcrumbs=[
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Support',
            link: '/support'
        }
    ];
    const apiIssuesOptions=[
        {
            displayValue:'Gateway Configuration',
            value:'Gateway Configuration'
        },
        {
            displayValue:' Reaching LLMs through Gateway',
            value:' Reaching LLMs through Gateway'
        },
        {
            displayValue:'Account Settings',
            value:'Account Settings'
        },
        {
            displayValue:'APIs/Client Libraries',
            value:'APIs/Client Libraries'
        },
        {
            displayValue:'Other',
            value:'Other'
        },

    ]
    const severityOptions=[
        {
            displayValue:'Low',
            value:'low'
        },
        {
            displayValue:'Medium',
            value:'medium'
        },
        {
            displayValue:'High',
            value:'high'
        }
    ]
    const featureOptions=[
        { displayValue:'Configuration - Routes',value:'configuration routes' },{ displayValue:'Providers',value:'providers' },{ displayValue:'Logs',value:'logs' },{ displayValue:'Chronicle',value:'chronicle' },{ displayValue:'Rate Limiting',value:'rate limiting' },{ displayValue:'Throttling',value:'throttling' },{ displayValue:'Cost Guardrails',value:'cost guardrails' },{ displayValue:'Data Protection',value:'data protection' }, { displayValue:'Archiving',value:'data archiving' }, { displayValue:'Data Protection Strategies',value:'data protection strategies' }, { displayValue:'Secrets',value:'secrets' }, { displayValue:'Other',value:'Other' }
    ]
    const [provGateway, setProvGateway] = useState<GatewayOptions[]>([]);   
    useEffect(()=>{        
        if(currentOrg && currentOrg!=='' && currentOrg !==null && currentOrg !== undefined && provGateway?.length === 0){   
            if(currentOrg?.publicMetadata?.Gateways){
                currentOrg?.publicMetadata?.Gateways.map((item:any)=>{
                    if(item?.status===200){
                        setProvGateway([...provGateway, {displayValue:item?.namespace, value:item?.account_id,namespace:item?.namespace, base_url:item?.base_url, api_key_value:item?.api_key_value}])
                    }
                })
            }
        }
    }, [currentOrg])
    const [apiIssue, setApiIssue]=useState<string>('')
    const [subject, setSubject]=useState<string>('')    
    const [affectedProject, setAffectedProject]=useState<string>('')
    const [severity, setSeverity]=useState<string>('')
    const [library, setLibrary]=useState<string>('')
    const [message, setMessage]=useState<string>('')
    const [isAllow, setIsAllow]=useState<boolean>(false)
    const [screenshots, setScreenshots] = useState<File[]>([]); 
    const [attachments, setAttachments] = useState<{ path:string }[]>([]);  
    const [inProgress, setInProgress] = useState<boolean>(false)
    const {register,control, handleSubmit, reset, formState    } = useForm();    
    const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;         
        if(fileInput.files && fileInput.files?.length>0){  
            const files = Array.from(fileInput.files).slice(0, 5)
            Array.from(files).forEach((file:any) =>{ 
                setScreenshots((prev:any)=> [...prev, file])                               
            });
        } 
        if (!fileInput.files) {
            // setFileError("No file was chosen");
            return;
        }        
        if (!fileInput.files || fileInput.files.length === 0) {            
            // setFileError("Files list is empty");
            return;
        }        
        /** Reset file input */
        e.currentTarget.type = "text";
        e.currentTarget.type = "file";
    };  
    const [error, setError] = useState({
        apiIssue : false,
        affectedProject : false,
        severity : false,
        library : false,
        isAllow: false
    })    
    const convertToBase64 = (files:any) => {
        let newFiles:any=[];
        Array.from(files).forEach( (file:any) =>{ 
            const reader = new FileReader()
            reader.readAsDataURL(file)                         
            reader.onload = () => {  
                let attachment ={path:reader.result}  
                if(attachment){
                    newFiles = [...newFiles, attachment] ;
                    setAttachments(newFiles)
                    // setAttachments((prev:any)=>[...prev, attachment ])   
                }
            }                                   
        });
    }
    useEffect(()=>{
        if(screenshots && screenshots?.length>0){
            convertToBase64(screenshots) 
        }
    },[screenshots])
    const removeScreenshot=(itemIndex:number)=>{
        if(screenshots && screenshots?.length>0){
            const newScreenshots = screenshots.filter((files:any, index:number)=>index!==itemIndex);
            convertToBase64(newScreenshots);
            setScreenshots(newScreenshots);
        }
    }
    const submitForm=()=>{  
        if(apiIssue==='' || affectedProject==='' || severity==='' || library==='' || isAllow){
            setError({
                apiIssue: (apiIssue===''),
                affectedProject: (affectedProject===''),
                severity: (severity===''),
                library: (library===''),
                isAllow: (isAllow===false)
            })
            return
        } else{ 
            if(screenshots && screenshots?.length>0 && attachments?.length===0){
                convertToBase64(screenshots) 
            }                       
            let currentGateway = provGateway.filter((item:any)=>item?.namespace!==affectedProject)
            let payload={
                api_issues: apiIssue,
                gateway: affectedProject,
                severity: severity,
                subject: subject,
                library:library,
                message:message,
                screenshots:attachments
            }            
            saveData(payload, currentGateway);
        }
    }
    const saveData=async(params:{}, currentGateway:any)=>{        
        setInProgress(true)
        let user=activeUser?.primaryEmailAddress?.emailAddress
        try{
            let param = {...params , email: user }             
            const response = await MailServices.supportMail(param);            
            successToast("Support Request Submitted Successfully")
            setInProgress(false) 
            reset()
            resetForm()                                 
        }
        catch(error){
            console.log(error)
            setInProgress(false)
        }
    } 
    const resetForm=()=>{
        setApiIssue('')
        setAffectedProject('')
        setSeverity('')
        setScreenshots([])
        setAttachments([])
        setLibrary('')
        setSubject('')
        setMessage('')
        setIsAllow(false)
        setError({
            apiIssue: (false),
            affectedProject: (false),
            severity: (false),
            library: (false),
            isAllow: (false)
        })
    }
  return (
    <>
        <div className='flex justify-between items-center flex-wrap'>
            <PageTitle pageTitle="Javelin Support" icon={false} breadcrumbData={breadcrumbs}  />     
            <div className="inline-flex items-center space-x-4 flex-wrap justify-end ml-auto mb-2 xs:mb-0">
                <Link className="text-xs btn-ghost py-2 px-3 rounded-sm text-black-100" href="https://docs.getjavelin.io/docs/javelin-core/overview">Documentation</Link>
                <div className="flex items-center space-x-2">
                    <div className="badge badge-ghost cursor-pointer text-xs">
                        <div className="badge bg-green-500 badge-xs mr-2"></div>
                        All systems operational
                    </div>
                </div>
            </div>            
        </div> 
        <div className='p-2 xs:p-4 md:px-6 md:py-6 border rounded-xl bg-white border-blue-700 h-full min-h-[82vh]'>
            <div className="max-w-3xl mx-auto">
                {/* <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Javelin support</h1>
                    <div className="flex items-center space-x-4">
                        <Link className="text-sm btn-ghost py-2 px-3 rounded-sm" href="https://docs.getjavelin.io/docs/javelin-core/overview">Documentation</Link>
                        <div className="flex items-center space-x-2">
                            <div className="badge badge-ghost text-sm">
                                <div className="badge bg-green-500 badge-xs mr-2"></div>
                                All systems operational
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="bg-white sm:shadow rounded-lg p-3 sm:p-6">
                    <h2 className="text-base font-medium mb-4 text-black-100">How can we help?</h2>
                    <Form onSubmit={submitForm} handleSubmit={handleSubmit} register={register} className='form h-full'> 
                        <div className="grid grid-cols-2 gap-y-[2px] gap-x-2 mt-4">  
                            <div className='col-span-2'> 
                                <FormDropdown 
                                    name='apiIssue'     
                                    label="What area are you having problems with?"                                    
                                    // labelDesc='Data protection Transformation' 
                                    placeholder="Select Issue"          
                                    error={error?.apiIssue && apiIssue === ''}
                                    register={register}
                                    options={apiIssuesOptions} 
                                    handleChange={(e:any)=>{setApiIssue(e.target.value)}}      
                                    value={apiIssue}
                                    wrapperClass={`pt-[.5rem] pb-[.5rem]`}  
                                    showTooltip={false}
                                                                       
                                />
                            </div>
                            <div className='max-xs:col-span-2 pb-[.5rem]'>                               
                                <FormDropdown 
                                    name='affectedProject'     
                                    label="Which project is affected?"
                                    // labelDesc='Data protection Transformation' 
                                    placeholder="Select Provisioned Gateway"          
                                    error={error?.affectedProject && affectedProject === ''}
                                    register={register}
                                    options={provGateway} 
                                    handleChange={(e:any)=>{
                                        setAffectedProject(e.target.value)}}      
                                    value={affectedProject}
                                    wrapperClass={`pt-[.5rem]`} 
                                    showTooltip={false}                                    
                                />
                                <p className='text-xs text-gray-700'>This project is on the free plan</p>
                            </div>
                            <div className='pb-[.5rem] max-xs:col-span-2'>
                                <FormDropdown 
                                    name='severity'     
                                    label="Severity"
                                    // labelDesc='Data protection Transformation' 
                                    placeholder="Select Severity"          
                                    error={error?.severity && severity === ''}
                                    register={register}
                                    options={severityOptions} 
                                    handleChange={(e:any)=>{
                                        setSeverity(e.target.value)}}      
                                    value={severity}
                                    wrapperClass={`pt-[.5rem]`}  
                                    showTooltip={false}                                   
                                />
                            </div>
                            <div className='col-span-2'> 
                                <FormInputText
                                    name="subject" 
                                    label="Subject"
                                    type='text'                                              
                                    register={register} 
                                    handleChange={(e:any)=>{setSubject(e.target.value)}}                                         
                                    placeholder="Summary of the problem you have"                                 
                                    //error={error?.api_key && api_key === ''}
                                    defaultValue={subject}
                                    autoComplete='off'
                                    wrapperClass={`pt-[.5rem] pb-[.5rem]`}   
                                    showTooltip={false}                                         
                                />
                            </div>
                            <div className='col-span-2'>
                                <FormDropdown 
                                    name='library'     
                                    label="Which Library are you having problems with?"
                                    // labelDesc='Data protection Transformation' 
                                    placeholder="Select Library"          
                                    error={error?.library && library === ''}
                                    register={register}
                                    options={featureOptions} 
                                    handleChange={(e:any)=>{
                                        setLibrary(e.target.value)}}      
                                    value={library}
                                    wrapperClass={`pt-[.5rem]  pb-[.5rem]`}    
                                    showTooltip={false}                                 
                                />
                            </div>
                            <div className='col-span-2'> 
                                <FormInputTextArea
                                    name="message" 
                                    label="Message"
                                    type='text'                                              
                                    register={register} 
                                    handleChange={(e:any)=>{setMessage(e.target.value)}}                                         
                                    placeholder="Describe the issue you're facing, along with any relevant information. Please be as detailed and specific as possible."                                 
                                    //error={error?.api_key && api_key === ''}
                                    defaultValue={message}
                                    autoComplete='off'  
                                    maxLength={5000}                                  
                                    wrapperClass={`pt-[.5rem] pb-[.5rem]`}   
                                    showTooltip={false}                                         
                                />
                            </div>
                            <div className='col-span-2'>
                               <FormInputCheckbox
                                    name="isAllow" 
                                    label="Allow Javelin Support to access your project temporarily"
                                    description="In some cases, we may require temporary access to your project to complete troubleshooting, or to answer questions related specifically to your project"
                                    error={error?.isAllow && isAllow === false}                                   
                                    register={register}                                                                    
                                    handleChange={(e:any)=>setIsAllow(e?.target?.checked)}   
                                    // currentValue={isAllow} 
                               /> 
                            </div>
                            <div className='col-span-2'>
                                <FormInputFile
                                    name="screenShots"                                   
                                    label="Attachments"
                                    note="Upload up to 5 screenshots that might be relevant to the issue that you're facing"                                 
                                    register={register}
                                    maxLength={5}
                                    iconClass="text-black-100"
                                    handleChange={onFileUploadChange}                                     
                                    multiple                                    
                                />
                                
                                {screenshots && screenshots?.length>0 && <div className='flex items-center flex-wrap mt-3 gap-2'>
                                    {screenshots.map((pFile:any, index:number)=>{                                       
                                        return(
                                            <div key={`preview-${index}`} className='relative w-[100px] h-[100px] border border-silver-100 rounded-md'>
                                                <img src={URL.createObjectURL(pFile)} className='object-cover'/>
                                                <button type="button" className='cursor-pointer absolute -top-2 -right-2 w-[20px] h-[20px] rounded-full flex justify-center items-center bg-red-600' onClick={()=>removeScreenshot(index)}><DeleteIcon color="#ffffff" /></button>
                                            </div>
                                        )
                                    })}
                                </div>}                                
                            </div>   
                        </div>
                        <div className='w-full text-center mt-4 mb-0'>
                            <SaveButton btnTitle="Save" inProgress={inProgress} />
                        </div>                        
                    </Form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Support