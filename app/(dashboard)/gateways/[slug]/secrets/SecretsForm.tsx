import React, { useEffect, useState } from 'react'
import { useForm} from "react-hook-form"
import Form from '@/app/components/forms-components/Form'
import FormInputText from '@/app/components/forms-components/FormInputText'
import FormInputTextarea from '@/app/components/forms-components/FormInputTextarea'
import FormInputPassword from '@/app/components/forms-components/FormInputPassword'
import SaveButton from '@/app/components/forms-components/SaveButton'
import FormDropdown from '@/app/components/forms-components/FromDropdown'
import TabsComponent from '@/app/components/TabsComponent'
import styles from '../../../../styles/styles.module.scss'
type SecretsFormFormProps={
    setapi_key:(val:any)=>void;
    setapi_key_secret_key:(val:any)=>void;
    setapi_key_secret_name:(val:any)=>void;
    setgroup:(val:any)=>void;
    // setOrg:(val:any)=>void;  
    setProvider?:(val:any)=>void; 
    set_secret_Key_type?:(val:any)=>void; 
    set_header_key?:(val:any)=>void; 
    set_query_param_key?:(val:any)=>void;
    provider?:string;   
    api_key:string;
    api_key_secret_key:string;
    api_key_secret_name:string;
    virtual_key?:string;
    // organisation?:string;    
    isResetform:boolean;
    providersOptions?:any;
    saveKeyData: Function;    
    secret_Key_type?:string;
    header_key?:string;
    query_param_key?:string;
    form_type:string;
    group:string;
    setIsResetform: Function;
    
}
const keyTypeOptions=[
    {
        displayValue:'Header key', 
        value:'header_key'        
    },
    {
        displayValue:'Query params', 
        value:'query_params'        
    }
]
const SecretsForm: React.FC<SecretsFormFormProps> = ({ 
    setapi_key,
    setapi_key_secret_key,
    setapi_key_secret_name,
    setgroup,
    // setOrg,
    setIsResetform,
    api_key,
    api_key_secret_key,
    api_key_secret_name,
    virtual_key,
    group,
    form_type='add',
    saveKeyData,
    // organisation,
    isResetform=true,
    provider,
    setProvider,    
    set_secret_Key_type,
    set_header_key,
    set_query_param_key,
    secret_Key_type = 'header_key',
    header_key,
    query_param_key,
    providersOptions
}) => {    
    const {register,control,   handleSubmit, reset, formState    } = useForm();
    // const [routeProviders, setRouteProviders] = useState<[]>([]);
    const [error, setError] = useState({
        api_key:false,
        api_key_secret_key:false,
        api_key_secret_name:false,
        provider: false,
        // group:false,
    })     
    const saveRoute = () => {        
        if( api_key === '' || api_key_secret_key === '' || api_key_secret_name === '' ){
            // console.log('set the error');
            setError({
                api_key : (api_key === ''),
                api_key_secret_key : (api_key_secret_key === ''),
                api_key_secret_name : (api_key_secret_name === ''),
                provider: (provider===''),
                // group : (group === '')  
            })
            return;
        }
        let v_Key={}
        // let keyData={}
        // if(form_type==='edit'){
        //     v_Key = { api_key_secret_key_javelin: virtual_key}
        // }        
        // if(secret_Key_type==='header_key'){
        //     keyData= { header_key: header_key, query_param_key: '' }
        // }
        // if(secret_Key_type==='query_params'){
        //     keyData = { query_param_key: query_param_key, header_key:''}
        // }
        let payload={
            api_key:api_key,
            api_key_secret_key:api_key_secret_key,
            api_key_secret_name:api_key_secret_name,            
            group:group,
            // organisation : organisation,
            provide_name: provider,
            ...v_Key,
            header_key: header_key, 
            query_param_key: query_param_key
            //...keyData
        };
        saveKeyData(payload); 
    }; 
    useEffect(()=>{        
        if(isResetform===true){            
            reset();
            setError({api_key:false,
                api_key_secret_key:false,
                api_key_secret_name:false,
                provider:false,
                // group:false,
            })
            setIsResetform(false);
        }
    },[isResetform]) 
    return (
        <Form onSubmit={saveRoute} handleSubmit={handleSubmit} register={register} className='form h-full'> 
            <div className="grid grid-cols-1 gap-y-[2px] gap-x-2 mt-4">                      
                <FormInputText
                    name="api_key" 
                    label="Name"
                    type='text'                                              
                    register={register} 
                    handleChange={(e:any)=>{setapi_key(e.target.value)}}                                         
                    placeholder="Secret Name"                                 
                    error={error?.api_key && api_key === ''}
                    defaultValue={api_key}
                    autoComplete='off'                    
                    wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite} ${styles.border_t_lite}`}   
                    inputClassName='max-w-sm mr-auto'
                    labelWrapperClass='xs:min-w-[35%] xs:mr-3 sm:min-w-[22%] lg:min-w-[15%] '  
                    readOnly={form_type==='edit'}   
                    disabled={form_type==='edit'}                                     
                />
                <FormInputPassword
                    name="api_key_secret_key" 
                    label="API Secret Key"                                                                  
                    register={register} 
                    handleChange={(e:any)=>{setapi_key_secret_key(e.target.value)}}                                         
                    placeholder="API Secret Key"                                 
                    error={error?.api_key_secret_key && api_key_secret_key === ''}
                    defaultValue={api_key_secret_key}
                    autoComplete="new-password"
                    copyValue={api_key_secret_key}
                    isAllowCopy={true}
                    isResetform={isResetform}
                    wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite}`}  
                    inputClassName='max-w-sm mr-auto'
                    labelWrapperClass='xs:min-w-[35%] xs:mr-3 sm:min-w-[22%] lg:min-w-[15%]'                                         
                />
                {form_type==='edit' && <>
                    <FormInputPassword
                        name="virtual_key" 
                        label="API Virtual Key"                                                                  
                        register={register} 
                        // handleChange={(e:any)=>{setapi_key_secret_key(e.target.value)}}                                         
                        placeholder="Virtual Key"                                 
                        //error={error?.api_key_secret_key && api_key_secret_key === ''}
                        defaultValue={virtual_key}
                        copyValue={virtual_key}
                        autoComplete='off'
                        isResetform={isResetform}
                        readOnly
                        disabled
                        isAllowCopy={true}
                        isReadOnly={true}
                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem]  ${styles.border_b_lite}`}       
                        inputClassName='max-w-sm mr-auto'
                        labelWrapperClass='xs:min-w-[35%] xs:mr-3 sm:min-w-[22%] lg:min-w-[15%]'                                                            
                    />
                </>}
                <FormInputText
                    name="api_key_secret_name" 
                    label="API Secret Key Name"
                    type='text'                                              
                    register={register} 
                    handleChange={(e:any)=>{setapi_key_secret_name(e.target.value)}}                                         
                    placeholder="API Secret Key Name"                                 
                    error={error?.api_key_secret_name && api_key_secret_name === ''}
                    defaultValue={api_key_secret_name}
                    autoComplete='off'
                    wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite}`} 
                    inputClassName='max-w-sm mr-auto'
                    labelWrapperClass='xs:min-w-[35%] xs:mr-3 sm:min-w-[22%] lg:min-w-[15%]'                                            
                />
                <FormInputText
                    name="group" 
                    label="API Group"
                    type='text'                                              
                    register={register} 
                    handleChange={(e:any)=>{setgroup(e.target.value)}}                                         
                    placeholder="API Group"                                 
                    // error={error?.group && group === ''}
                    defaultValue={group}
                    autoComplete='off'
                    wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite}`}  
                    inputClassName='max-w-sm mr-auto'
                    labelWrapperClass='xs:min-w-[35%] xs:mr-3 sm:min-w-[22%] lg:min-w-[15%]'                                           
                />
                {/* <FormInputText
                    name="organisation" 
                    label="Organization"
                    type='text'                                              
                    register={register} 
                    handleChange={(e:any)=>{setOrg(e.target.value)}}                                         
                    placeholder="Organization"                                 
                    error={false}
                    defaultValue={organisation}
                    autoComplete='off'
                    wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite}`}  
                    inputClassName='max-w-sm mr-auto'
                    labelWrapperClass='lg:min-w-[15%]'                                 
                /> */}
                {form_type ==='add' && (providersOptions && providersOptions?.length>0) && <>
                    <FormDropdown
                        name='provider'     
                        label="Provider"  
                        //labelDesc='Select provider value'                  
                        placeholder="Provider"          
                        error={error?.provider && provider === ''}
                        register={register}
                        options={providersOptions} 
                        handleChange={(e:any)=>{setProvider && setProvider(e.target.value)}} 
                        value={provider && provider}
                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite}`}
                        inputClassName='max-w-sm mr-auto'
                        labelWrapperClass='xs:min-w-[35%] xs:mr-3 sm:min-w-[22%] lg:min-w-[15%]'      
                    />
                </>}

                <FormDropdown
                    name='secretKeyType'     
                    label="Key Type"  
                    //labelDesc='Select provider value'                  
                    placeholder="Provider"          
                    // error={error?.provider && provider === ''}
                    register={register}
                    options={keyTypeOptions} 
                    handleChange={(e:any)=>{set_secret_Key_type && set_secret_Key_type(e?.target?.value);}} 
                    value={secret_Key_type}
                    wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem]`}
                    inputClassName='max-w-sm mr-auto'
                    labelWrapperClass='xs:min-w-[35%] xs:mr-3 sm:min-w-[22%] lg:min-w-[15%]'      
                />                
                {secret_Key_type==='header_key'&& (
                    <FormInputText
                        name="header_key" 
                        label="Header Key"
                        type='text'                                              
                        register={register} 
                        handleChange={(e:any)=>{
                            set_header_key && set_header_key(e.target.value);
                            set_query_param_key && set_query_param_key('');
                        }}                                         
                        placeholder="Header key"                                 
                        // error={error?.api_key_secret_name && api_key_secret_name === ''}
                        defaultValue={header_key}
                        autoComplete='off'
                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite}`} 
                        inputClassName='max-w-sm mr-auto'
                        labelWrapperClass='xs:min-w-[35%] xs:mr-3 sm:min-w-[22%] lg:min-w-[15%]'                                            
                    />
                )}
                {secret_Key_type==='query_params' &&(
                    <FormInputText
                        name="query_param_key" 
                        label="Query Params"
                        type='text'                                              
                        register={register} 
                        handleChange={(e:any)=>{
                            set_query_param_key && set_query_param_key(e.target.value);
                            set_header_key && set_header_key('');
                        }}                                         
                        placeholder="Query params"                                 
                        // error={error?.api_key_secret_name && api_key_secret_name === ''}
                        defaultValue={query_param_key}
                        autoComplete='off'
                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite}`} 
                        inputClassName='max-w-sm mr-auto'
                        labelWrapperClass='xs:min-w-[35%] xs:mr-3 sm:min-w-[22%] lg:min-w-[15%]'                                            
                    />
                )}
            </div>
            <div className='w-full text-center mt-[3rem] mb-0'>
                <SaveButton btnTitle="save" />
            </div>
            {/* <div className='h-full'>
                <TabsComponent tabsData={tabsData}  wraperClass='h-full--3 overflow-y-hidden' contentClass='h-full--4 overflow-y-auto' />            
                <div className='w-full text-center mt-4 mb-0'>
                    <SaveButton btnTitle="save" />
                </div>
            </div> */}
        </Form>
    );
}

export default SecretsForm;