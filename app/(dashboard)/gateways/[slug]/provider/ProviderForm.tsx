import React, { HtmlHTMLAttributes, useEffect, useState } from 'react'
import { useForm, SubmitHandler, ValidationRule } from "react-hook-form"
import Form from '@/app/components/forms-components/Form'
import FormInputText from '@/app/components/forms-components/FormInputText'
import FormInputToggle from '@/app/components/forms-components/FormInputToggle'
import FormRadioGroup from '@/app/components/forms-components/FormRadioGroup'
import FormDropdown from '@/app/components/forms-components/FromDropdown'
import SaveButton from '@/app/components/forms-components/SaveButton'
import { errorToast } from '@/app/helper/toastMsg'
import styles from '../../../../styles/styles.module.scss'
import TabsComponent from '@/app/components/TabsComponent'
type ProviderFormProps={
    providerName:string;
    providerType:string;
    // providerApiKey:string;
    providerApiType:string;
    providerApiUrl:string;
    providerApiVersion:string;
    providerOrg:string;
    providerdepName:string;
    formType?:''|string;
    isResetform?: boolean;
    setProviderName:(val:any)=>void;
    setProviderType:(val:any)=>void;
    // setProviderApiKey:(val:any)=>void;
    setProviderApiType:(val:any)=>void;
    setProviderApiUrl:(val:any)=>void;
    setProviderApiVersion:(val:any)=>void;
    setProviderOrg:(val:any)=>void;
    setProviderDepName:(val:any)=>void;
    saveProviderData:(val:any)=>void;
    setIsResetform?:(val:any)=>void;
}
const providerTypes=[
    {
        displayValue:'OpenSource',
        value:'opensource'
    },
    {
        displayValue:'ClosedSource',
        value:'closedsource'
    }  
];
const ProviderForm: React.FC<ProviderFormProps> = ({
    providerName,
    providerType,
    // providerApiKey,
    providerApiType,
    providerApiUrl,
    providerApiVersion,
    providerOrg,
    providerdepName,
    formType,
    isResetform,
    setProviderName,
    setProviderType,
    // setProviderApiKey,
    setProviderApiType,
    setProviderApiUrl,
    setProviderApiVersion,
    setProviderOrg,
    setProviderDepName,
    saveProviderData,
    setIsResetform,
}) => {    
    const [error, setError] = useState({
        providerName:false,
        providerApiUrl:false        
    })
    const [currenTab, setCurrentTab] = useState('Detail')
    const {  control, handleSubmit, reset, formState , register} = useForm();
    const saveProvider = () => {
        if(
            providerName === '' || providerApiUrl === ''
        ){
            setError({
                providerName:(providerName === ''),
                providerApiUrl:(providerApiUrl === ''),
            })
            return;
        }
        let payload={
            name: providerName,
            type: providerType,
            config : {                
                api_type : providerApiType,
                api_base :  providerApiUrl,
                api_version :  providerApiVersion,
                organization : providerOrg,
                deployment_name :  providerdepName,
            }
        };
        saveProviderData(payload); 
    };
    useEffect(()=>{        
        if(isResetform && isResetform===true){            
            reset();
            setCurrentTab('Detail')
            setIsResetform && setIsResetform(false);
        }
    },[isResetform]) 
    const tabsData=[
        {
            tabName: 'Detail',
            content: (
                <div className="grid grid-cols-1">                        
                    <FormInputText
                        name="name" 
                        label="Name"
                        labelDesc='Enter name'
                        type='text'                                              
                        register={register} 
                        handleChange={(e:any)=>{setProviderName(e.target.value)}}                                         
                        placeholder="Provider Name"                                 
                        error={error?.providerName && providerName === '' }
                        defaultValue={providerName}
                        disabled={formType==='edit'?true:false}
                        readOnly={formType==='edit'?true:false}
                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1.75rem] ${styles.border_b_lite} ${styles.border_t_lite}`}
                        inputClassName='max-w-sm mr-auto'
                        labelWrapperClass='md:min-w-[15%]' 
                    />
                    <FormInputText
                        name="apiBaseUrl" 
                        label="API Base URL"
                        labelDesc='Enter api base url'
                        type='text'                                              
                        register={register} 
                        handleChange={(e:any)=>{setProviderApiUrl(e.target.value)}}                                         
                        placeholder="API Base URL"                
                        error={error?.providerApiUrl  && providerApiUrl === ''}
                        defaultValue={providerApiUrl}
                        wrapperClass={`flex flex-row pt-[.5rem] md:pl-[1.75rem]`}
                        inputClassName='max-w-sm mr-auto'
                        labelWrapperClass='md:min-w-[15%]' 
                    />         
                </div> 
            )
        },
        {
            tabName: 'Advanced',
            content: (
                <div className="grid grid-cols-1 px-2"> 
                        {/* <FormInputText
                            name="apiKey" 
                            label="API Key"
                            type='text'
                            //labelDesc='Enter api key'                                              
                            register={register} 
                            handleChange={(e:any)=>{setProviderApiKey(e.target.value)}}                                         
                            placeholder="API Key"                
                            error={error?.providerApiKey  && providerApiKey === ''}
                            defaultValue={providerApiKey}
                            wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite} ${styles.border_t_lite}`}
                        /> */}
                        <FormInputText
                            name="apiType" 
                            label="API Type"
                            //labelDesc='Enter api type'
                            type='text'                                              
                            register={register} 
                            handleChange={(e:any)=>{setProviderApiType(e.target.value)}}                                         
                            placeholder="API Type"                
                            // error={error?.providerApiType  && providerApiType === ''}
                            defaultValue={providerApiType}
                            wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1.75rem] ${styles.border_b_lite}`}
                            inputClassName='max-w-sm mr-auto'
                            labelWrapperClass='md:min-w-[15%]' 
                        />                        
                        <FormInputText
                            name='apiVersion'     
                            label='API Version' 
                            //labelDesc='Enter api version'            
                            // error={error?.providerApiVersion  && providerApiVersion === ''}
                            register={register}                     
                            handleChange={(e:any)=>{ setProviderApiVersion(e.target.value) }} 
                            type='text'  
                            placeholder='API Version'  
                            defaultValue={providerApiVersion}   
                            wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1.75rem] ${styles.border_b_lite}`}   
                            inputClassName='max-w-sm mr-auto'
                            labelWrapperClass='md:min-w-[15%]'      
                        />                
                        <FormInputText
                            name="org" 
                            label="Organization"
                            //labelDesc='Enter organization'
                            type='text'                                              
                            register={register} 
                            handleChange={(e:any)=>{setProviderOrg(e.target.value)}}                                         
                            placeholder="Organization"                
                            // error={error?.providerOrg  && providerOrg === ''}
                            defaultValue={providerOrg}
                            wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1.75rem] ${styles.border_b_lite}`}
                            inputClassName='max-w-sm mr-auto'
                            labelWrapperClass='md:min-w-[15%]' 
                        />   
                        <FormInputText
                            name="depName" 
                            label="Deployment Name"
                            //labelDesc='Enter deployment name'
                            type='text'                                              
                            register={register} 
                            handleChange={(e:any)=>{setProviderDepName(e.target.value)}}                                         
                            placeholder="Deployment Name"                
                            // error={error?.providerdepName  && providerdepName === ''}
                            defaultValue={providerdepName}
                            wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1.75rem] ${styles.border_b_lite}`}
                            inputClassName='max-w-sm mr-auto'
                            labelWrapperClass='md:min-w-[15%]' 
                        />
                        <FormInputText
                            name="type" 
                            label="Type"
                            //labelDesc='Enter provider type'
                            type='text'                                              
                            register={register} 
                            handleChange={(e:any)=>{setProviderType(e.target.value)}}                                         
                            placeholder="Provider Type"                
                            // error={error?.providerType  && providerType === ''}
                            defaultValue={providerType}
                            wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1.75rem]`}
                            inputClassName='max-w-sm mr-auto'
                            labelWrapperClass='md:min-w-[15%]' 
                        /> 
                    </div>
            )
        }
    ];
    return (
        <Form onSubmit={saveProvider} handleSubmit={handleSubmit} register={register} className='py-6 form h-full min-h-[inherit]'> 
            {/* <div className='h-full'> */}
                <TabsComponent tabsData={tabsData} currentTab={currenTab} setCurrTab={setCurrentTab}  wraperClass='h-full--3 overflow-y-hidden' contentClass='h-full--4 overflow-y-auto'/>            
                <div className='w-full text-center mt-[3rem] mb-0'>
                    <SaveButton btnTitle="save" />
                </div>
            {/* </div> */}
        </Form>
    );
}

export default ProviderForm;