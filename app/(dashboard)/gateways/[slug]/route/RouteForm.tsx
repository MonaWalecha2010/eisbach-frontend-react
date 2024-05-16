import React, { useEffect, useState } from 'react'
import { useForm} from "react-hook-form"
import Form from '@/app/components/forms-components/Form'
import FormInputText from '@/app/components/forms-components/FormInputText'
import FormInputToggle from '@/app/components/forms-components/FormInputToggle'
import FormDropdown from '@/app/components/forms-components/FromDropdown'
import SaveButton from '@/app/components/forms-components/SaveButton'
import FormInputNumber from '@/app/components/forms-components/FormInputNumber'
import TabsComponent from '@/app/components/TabsComponent'
import styles from '../../../../styles/styles.module.scss'
type RouteFormProps={
    setName:(val:any)=>void;
    setModelName:(val:any)=>void;
    setModelProvider:(val:any)=>void;
    setModelSuffix:(val:any)=>void;
    setRouteType: (val:any)=>void;
    setConfigRateLimit:(val:any)=>void;
    setConfigOwner:(val:any)=>void;
    setConfigArchive:(val:any)=>void;
    setConfirgOrg:(val:any)=>void;
    setConfigRetries:(val:any)=>void;
    setConfigDlp:(val:any)=>void;
    setStrategy?:(val:any)=>void;
    setAction?:(val:any)=>void;
    setCostBudget?:(val:any)=>void;
    setAmount?:(val:any)=>void;
    setInterval?:(val:any)=>void;
    setConfigRetention:(val:any)=>void;
    setIsResetform:(val:any)=>void;
    setSecretKey:(val:any)=>void;
    setModelFallback:(val:any)=>void;
    setFbModelName:(val:any)=>void;
    setFbModelProvider:(val:any)=>void;
    setFbModelSuffix:(val:any)=>void;    
    setFbSecretKey:(val:any)=>void;
    routeProviders:any,
    name:string;
    modelName:string;
    modelProvider:string;
    modelSuffix:string;
    routeType:string;
    configOwner:string;
    configOrg:string;
    configRateLimit:number;
    configArchive:boolean;
    configRetries:number;     
    routeData?:{}|any;
    formType?:string;
    configDlp?:boolean;
    strategy?:string; 
    action?:string;  
    costBudget?: boolean;
    amount?:string;
    interval?:string;
    configRetention: number;
    saveRouteData: Function; 
    activeGateway:any;
    isResetform: boolean;
    dataProtections:any;
    secretKey?:string;
    secrets:any;
    modelFallback:boolean;
    fbModelName:string;
    fbModelProvider:string;
    fbModelSuffix:string;   
    fbSecretKey?:string;
}
const strategyOptions=[
    {
        displayValue:'Inspect',
        value:'inspect'
    },
    {
        displayValue:'Mask',
        value:'mask'
    },
    {
        displayValue:'Redact',
        value:'redact'
    },
    {
        displayValue:'Replace',
        value:'replace'
    },
    {
        displayValue:'Anonymize',
        value:'anonymize'
    }    
];
const actionOptionsInspect=[ 
    {
        displayValue:'Reject',
        value:'reject'
    },
    {
        displayValue:'Notify',
        value:'notify'
    }
];
const actionOptions=[ 
    {
        displayValue:'Reject',
        value:'reject'
    },   
    {
        displayValue:'Notify',
        value:'notify'
    }
];
const intervalOptions=[    
    {
        displayValue:'Weekly',
        value:'weekly'
    },
    {
        displayValue:'Monthly',
        value:'monthly'
    },
    {
        displayValue:'Annual',
        value:'annual'
    }
];
const typeOptions=[    
    {
        displayValue:'Chat',
        value:'chat'
    },   
    {
        displayValue:'Completions',
        value:'completions'
    },
    {
        displayValue:'Embeddings',
        value:'embeddings'
    },
    {
        displayValue:'Other',
        value:'other'
    }
];
const RouteForm: React.FC<RouteFormProps> = ({ routeProviders, name, modelName, modelProvider, modelSuffix, routeType, secretKey, configOwner, configOrg, configRateLimit, configArchive, configRetries, configDlp, strategy, action, costBudget, amount, interval, configRetention, isResetform, activeGateway, modelFallback, fbModelName, fbModelProvider, fbModelSuffix, fbSecretKey, //type, // modelRetries,
setName, setModelName, setModelProvider, setModelSuffix, setRouteType, setSecretKey, setConfigRateLimit , setConfigOwner , setConfigArchive, setConfirgOrg, setConfigRetries, setConfigDlp, setStrategy, setAction, setCostBudget,setAmount, setInterval, setConfigRetention, setIsResetform, routeData={}, saveRouteData, formType='add', dataProtections, secrets, setModelFallback, setFbModelName,setFbModelProvider, setFbModelSuffix, setFbSecretKey }) => {    
    
    const {register, control, handleSubmit, reset, formState } = useForm();
    const [strategies, setStrategies]=useState<any>([])
    const [apiKeys, setApiKeys]=useState<any>([])
    const [fbApiKeys, setfbApiKeys]=useState<any>([])
    const [currTab, setCurrTab] = useState<string>("Detail");
    const [error, setError] = useState({
        name : false,
        modelName : false,
        modelProvider : false,
        modelSuffix : false,
        routeType: false,
        configOwner : false,
        configOrg : false,
        configRateLimit : false,
        configArchive : false,
        configRetries : false,
        configDlp : false,
        strategy : false,
        action : false,
        costBudget : false, 
        amount : false,
        interval : false,
        configRetention: false,
    })         
    const saveRoute = () => {  
        if( name === '' || modelName === '' || modelProvider === '' ||    modelSuffix === '' || routeType==='' ){
            setError({
                name : (name === ''),
                modelName : (modelName === ''),
                modelProvider : (modelProvider === ''),
                modelSuffix : (modelSuffix === ''),
                routeType : (routeType === ''),
                configOwner : false,
                configOrg : false,
                configRateLimit : false,
                configArchive : false,
                configRetention: false,
                configRetries : false,
                configDlp : false,
                strategy : (configDlp && strategy === '')?true:false,
                action : (configDlp && action === '')?true:false,
                costBudget: false,
                amount: false,
                interval: false,                
            })
            setCurrTab('Detail')
            return;
        }
        let dlp={}
        let budget={}       
        if(configDlp){
            dlp={
                enabled: configDlp,
                strategy: strategy,                
            }
        }else{
            dlp={enabled: false}
        }  
        if(costBudget && interval && amount) {
            budget= {
                enabled: costBudget,
                [interval]: amount,
                currency: "USD"
            }
        } else{
            budget= {
                enabled: costBudget,
                currency: "USD"
            }
        }   
        let models:any= [
            {
                name:modelName,
                provider:modelProvider,
                suffix: modelSuffix,
                virtual_secret_key:secretKey,
                fallback_enabled: modelFallback,
                fallback_codes: [429, 503],
                weight: 0               
            }
        ]
        if(modelFallback===true){
            models = [...models, {name: fbModelName, provider: fbModelProvider, suffix: fbModelSuffix, virtual_secret_key:fbSecretKey }]
        }
        let payload={
            name: name, 
            type: routeType,           
            models : models,
            config : {
                rate_limit:parseInt(`${configRateLimit}`),
                archive : configArchive,
                retention : configRetention,
                retries :  parseInt(`${configRetries}`),
                // costBudget : costBudget,
                // amount : amount,
                // interval : interval,
                organization :configOrg,
                owner :  configOwner,
                budget,
                dlp,
                action: action,
            }
        };
        console.log(payload)
        saveRouteData(payload); 
    }; 
    const handleConfigRate=(val:number)=>{ 
        if(val.toString()==='NaN'){
            setConfigRateLimit(0);
            return;
        }else{
            setConfigRateLimit(val);
        }
        
    } 
    const handleConfigRetries=(val:number)=>{
        if(val.toString()==='NaN'){
            setConfigRetries(0);
            return;
        }else{
            setConfigRetries(val);
        }
    }
    const handleConfigRetentions=(val:number)=>{
        if(val.toString()==='NaN'){
            setConfigRetention(7);
            return;
        }else{
            setConfigRetention(val);
        }
    }   
    // handle type and set suffix as type 
    const handleRouteType=(e:any )=>{
        let type = e.target.value;
        setRouteType(()=>type)
        setModelSuffix('')
        switch (type) {
            case 'chat':
                setModelSuffix(() => '/chat/completions');
                break;
            case 'completions':
                setModelSuffix(() => '/completions');

                break;
            case 'embeddings':
                setModelSuffix(() => '/embeddings');

                break;
            case 'other':
                setModelSuffix(() => '');

                break;
            default:
                console.log("type",type)

                break;
        }
        
    }
    useEffect(()=>{        
        if(isResetform===true){
            reset();
            setCurrTab('Detail')
            setIsResetform(false);
        }
    },[isResetform])    
    useEffect(()=>{
        let strategyData:any=[];
        if(dataProtections?.length>0){
            dataProtections.map((item:any)=>(
                strategyData= [...strategyData, { displayValue:item.name, value:item.name} ]                              
            ))
            setStrategies(strategyData)  
        }
    },[dataProtections])  
    useEffect(()=>{
        if(modelProvider!=='' && secrets?.length>0){
            let secretsData:any=[];
            const filterSecrets = secrets.filter((item:any)=>item?.provider_name===modelProvider);
            if(filterSecrets && filterSecrets?.length>0){
                filterSecrets.map((item:any)=>(
                    secretsData= [...secretsData, { displayValue:item.api_key_secret_name, value:item.api_key_secret_key_javelin} ]                              
                ))
                setApiKeys(secretsData)  
            }
        }
    },[modelProvider, secrets])
    useEffect(()=>{            
        if(modelProvider!=='' && secrets?.length>0){
            let fbSecretsData:any=[];
            const filterFbSecrets = secrets.filter((item:any)=>item?.provider_name===modelProvider);
            if(filterFbSecrets && filterFbSecrets?.length>0){
                filterFbSecrets.map((item:any)=>(
                    fbSecretsData= [...fbSecretsData, { displayValue:item.api_key_secret_name, value:item.api_key_secret_key_javelin} ]                              
                ))
                setfbApiKeys(fbSecretsData)  
            }
        }
    },[fbModelProvider, secrets])
    const tabsData=[
        {
            tabName: 'Detail',
            content: (
                <>
                    <div className="grid grid-cols-1 gap-y-[2px] gap-x-2">                      
                        <FormInputText
                            name="name" 
                            label="Route Name"
                            //labelDesc='Enter Name'
                            type='text'                                              
                            register={register} 
                            handleChange={(e:any)=>{setName(e.target.value)}}                                         
                            placeholder="Route Name"                                 
                            error={error?.name && name === ''}
                            defaultValue={name}
                            disabled={formType==='edit'?true:false}
                            readOnly={formType==='edit'?true:false}
                            wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1.75rem] ${styles.border_b_lite} ${styles.border_t_lite}`}                             
                            inputClassName='max-w-sm mr-auto'
                            labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]'                      
                        />

                        {formType === 'edit' &&
                        <FormInputText
                            name="routeURL" 
                            label="Route URL"
                            //labelDesc='Enter Name'
                            type='text'                                              
                            register={register} 
                            handleChange={(e:any)=>{setName(e.target.value)}}                                         
                            placeholder="Route URL"                                 
                            error={error?.name && name === ''}
                            defaultValue={"https://api.javelin.live/v1/query/"+name}
                            disabled={false}
                            readOnly={formType==='edit'?true:false}
                            wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1.75rem] ${styles.border_b_lite} ${styles.border_t_lite} ${styles.fontMenlo}`}                             
                            inputClassName={`max-w-sm mr-auto ${styles.fontMenlo}`}
                            labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]'                      
                        />}

                        <div className="relative collapse collapse-arrow bg-white_1-400 rounded-lg mt-2 mb-3">
                            <input type="checkbox" className="peer" name={`collapse_primary_model`} /> 
                            <div className={` group collapse-title min-h-0 flex items-center space-y-1 gap-x-3 py-2 px-4 group-hover:bg-primary-400 group-hover:text-primary-100 text-xs font-[500]  text-primary-100 md:pl-[1.5rem]`}>Primary Model</div>
                            <div className="collapse-content peer-checked:">                                 
                                <div className={`bg-gray-400 px-4 py-3 rounded-[.313rem] md:pl-[1.75rem] `}>  
                                    <FormInputText
                                        name="modelName" 
                                        label="Model Name"
                                        //labelDesc='Enter model name'
                                        type='text'                                              
                                        register={register} 
                                        handleChange={(e:any)=>{setModelName(e.target.value)}}                                         
                                        placeholder="Model Name"                
                                        error={error?.modelName && modelName === ''}
                                        defaultValue={modelName}
                                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1rem] ${styles.border_b_lite}`}
                                        inputClassName='max-w-sm mr-auto'
                                        labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]'    
                                    />
                                    <FormDropdown 
                                        name='modelProvider'     
                                        label="Provider"  
                                        //labelDesc='Select provider value'                  
                                        placeholder="Provider"          
                                        error={error?.modelProvider && modelProvider === ''}
                                        register={register}
                                        options={routeProviders} 
                                        handleChange={(e:any)=>{setModelProvider(e.target.value)}} 
                                        value={modelProvider}
                                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1rem] ${styles.border_b_lite}`}
                                        inputClassName='max-w-sm mr-auto'
                                        labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]' 
                                    /> 
                                   
                                    <FormDropdown 
                                        name='routeType'     
                                        label="Type"  
                                        //labelDesc='Select Type value'                  
                                        placeholder="Type"          
                                        error={error?.routeType && routeType === ''}
                                        register={register}
                                        options={typeOptions} 
                                        handleChange={(e:any)=>{
                                            handleRouteType(e)}
                                        } 
                                        value={routeType}
                                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1rem] ${styles.border_b_lite}`}
                                        inputClassName='max-w-sm mr-auto'
                                        labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]' 
                                    />
                                     <FormInputText
                                        name="modelSuffix" 
                                        label="Suffix"
                                        //labelDesc='Enter suffix'
                                        value={modelSuffix}
                                        type='text'                                              
                                        register={register} 
                                        disabled= {routeType !== 'other' }
                                        handleChange={(e:any)=>{                                           
                                            setModelSuffix(e.target.value)}}                                         
                                        placeholder="Suffix"                
                                        error={error?.modelSuffix && modelSuffix === ''}
                                        
                                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1rem] ${styles.border_b_lite}`}
                                        inputClassName='max-w-sm mr-auto'
                                        labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]'    
                                    />  
                                    {(modelProvider && apiKeys?.length>0) && 
                                        <FormDropdown 
                                            name='secretKey'     
                                            label="Secret"  
                                            //labelDesc='Select Type value'                  
                                            placeholder="Api key secret"          
                                            //error={error?.secretKey && secretKey === ''}
                                            register={register}
                                            options={apiKeys} 
                                            handleChange={(e:any)=>{setSecretKey(e.target.value)}} 
                                            value={secretKey}
                                            wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1rem] ${styles.border_b_lite}`}
                                            inputClassName='max-w-sm mr-auto'
                                            labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]' 
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        <FormInputToggle
                            name='modelFallback'     
                            label='Enable Model Fallback'   
                            //labelDesc='Enable model fallback'          
                            // error={error?.configArchive}
                            register={register}                     
                            handleChange={(e:any)=>{                        
                                setModelFallback(e.target.checked)
                            }} 
                            isChecked={modelFallback}  
                            wrapperClass={`pt-[.5rem] md:pl-[1.25rem] ${!modelFallback && styles.border_b_lite}`}   
                            inputClassName='max-w-sm mr-auto'
                            labelWrapperClass='xs:max-md:mr-5 md:min-w-[20%]'
                            toggleClass='z-[99]'                  
                        />
                        {modelFallback && <>
                            <div className="relative collapse collapse-arrow bg-white_1-400 rounded-lg mt-2 mb-3">
                                <input type="checkbox" className="peer" name={`collapse_fallback_model`}  /> 
                                <div className={` group collapse-title min-h-0 flex items-center space-y-1 gap-x-3 py-2 px-4 group-hover:bg-primary-400 group-hover:text-primary-100 text-xs font-[500]  text-primary-100 md:pl-[1.5rem]`}>Fallback Model</div>
                                <div className="collapse-content peer-checked:">                                 
                                    <div className={`bg-gray-400 px-4 py-3 rounded-[.313rem] md:pl-[1.75rem] `}>  
                                        <FormInputText
                                            name="fbModelName" 
                                            label="Model Name"
                                            //labelDesc='Enter model name'
                                            type='text'                                              
                                            register={register} 
                                            handleChange={(e:any)=>{setFbModelName(e.target.value)}}                                         
                                            placeholder="Model Name"                
                                            // error={error?.modelName && modelName === ''}
                                            defaultValue={fbModelName}
                                            wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1rem] ${styles.border_b_lite}`}
                                            inputClassName='max-w-sm mr-auto'
                                            labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]'    
                                        />
                                        <FormDropdown 
                                            name='fbModelProvider'     
                                            label="Provider"  
                                            //labelDesc='Select provider value'                  
                                            placeholder="Provider"          
                                            // error={error?.modelProvider && modelProvider === ''}
                                            register={register}
                                            options={routeProviders} 
                                            handleChange={(e:any)=>{setFbModelProvider(e.target.value)}} 
                                            value={fbModelProvider}
                                            wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1rem] ${styles.border_b_lite}`}
                                            inputClassName='max-w-sm mr-auto'
                                            labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]' 
                                        /> 
                                        <FormInputText
                                            name="fbModelSuffix" 
                                            label="Suffix"
                                            //labelDesc='Enter suffix'
                                            type='text'                                              
                                            register={register} 
                                            handleChange={(e:any)=>{setFbModelSuffix(e.target.value)}}                                         
                                            placeholder="Suffix"                
                                            // error={error?.modelSuffix && modelSuffix === ''}
                                            defaultValue={fbModelSuffix}
                                            wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1rem] ${styles.border_b_lite}`}
                                            inputClassName='max-w-sm mr-auto'
                                            labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]'    
                                        />
                                        {(fbModelProvider && fbApiKeys?.length>0) && 
                                            <FormDropdown 
                                                name='fbSecretKey'     
                                                label="Secret"  
                                                //labelDesc='Select Type value'                  
                                                placeholder="Api key secret"          
                                                //error={error?.secretKey && secretKey === ''}
                                                register={register}
                                                options={fbApiKeys}
                                                handleChange={(e:any)=>{setFbSecretKey(e.target.value)}} 
                                                value={fbSecretKey}
                                                wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1rem] ${styles.border_b_lite}`}
                                                inputClassName='max-w-sm mr-auto'
                                                labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]' 
                                            />
                                        }                               
                                    </div>
                                </div>
                            </div>
                        </>}
                    </div>
                </>
            )
        },
        {
            tabName: 'Settings',
            content: (<>                
                <div className="grid grid-cols-1 gap-y-[2px] gap-x-2"> 
                    <FormInputNumber 
                        register={register}
                        name="configRateLimit"
                        placeholder="Rate Limit"                
                        error={(error?.configRateLimit && configRateLimit < 0)}
                        label="Rate-Limit"
                        //labelDesc='Enter rate limit'
                        handleChange={(e:any)=>{handleConfigRate(parseInt(e.target.value))}}                    
                        currentVal={configRateLimit}
                        setCurrentVal={setConfigRateLimit} 
                        wrapperClass={`flex flex-row justify-between pt-[.5rem] pb-[.5rem] md:pl-[1.75rem] ${styles.border_t_lite} ${styles.border_b_lite}`}                   
                        // defaultValue={configRateLimit}
                        inputClassName='max-w-sm mr-auto'
                        labelWrapperClass='max-md:mr-5 md:min-w-[10%]'   
                    />
                    <FormInputNumber 
                        register={register}
                        name="configRetries"
                        placeholder="Retries"                
                        error={error?.configRetries && configRetries < 0}
                        label="Retries"
                        //labelDesc='Enter retries'
                        handleChange={(e:any)=>{handleConfigRetries(parseInt(e.target.value))}}                    
                        currentVal={configRetries}
                        setCurrentVal={setConfigRetries} 
                        wrapperClass={`flex flex-row justify-between pt-[.5rem] pb-[.5rem] md:pl-[1.75rem] ${styles.border_b_lite}`}
                        // defaultValue={configRetries}  
                        inputClassName='max-w-sm mr-auto'
                        labelWrapperClass='xs:max-md:mr-5 md:min-w-[10%]'    
                    />
                    <div className="relative collapse collapse-arrow bg-white_1-400 rounded-lg mt-2 mb-3">
                        <input type="checkbox" className="peer" name={`collapse_configArchive`} disabled={configArchive===false} />
                        <div className={` group collapse-title min-h-0 flex items-center space-y-1 gap-x-3 py-2 px-4 group-hover:bg-primary-400 group-hover:text-primary-100  text-black-500`}>
                            <FormInputToggle
                                name='configArchive'     
                                label='Archive'   
                                //labelDesc='Enable archive'          
                                error={error?.configArchive}
                                register={register}                     
                                handleChange={(e:any)=>{                        
                                    setConfigArchive(e.target.checked)
                                }} 
                                isChecked={configArchive}  
                                wrapperClass={`pt-[.5rem] md:pl-[1.25rem] ${!configArchive && styles.border_b_lite}`}   
                                inputClassName='max-w-sm mr-auto'
                                labelWrapperClass='max-md:mr-5 md:min-w-[11%]'
                                toggleClass='z-[99]'                  
                            />
                        </div>
                        <div className="collapse-content peer-checked:">
                            {configArchive && <div className={`bg-gray-400 px-4 py-3 rounded-[.313rem] md:pl-[1.75rem]`}>
                                <FormInputNumber 
                                    register={register}
                                    name="configRetention"
                                    placeholder="Retention"                
                                    error={error?.configRetention && configRetention < 7}
                                    label="Retention (Days)"
                                    //labelDesc='Enter retention'
                                    handleChange={(e:any)=>{handleConfigRetentions(parseInt(e.target.value))}}                    
                                    currentVal={configRetention}
                                    setCurrentVal={setConfigRetention} 
                                    wrapperClass={`flex flex-row justify-between pt-[.25rem] pb-[.25rem]`}                           
                                    inputClassName='max-w-sm mr-auto'
                                    labelWrapperClass='max-md:mr-5 md:min-w-[10%]'    
                                />
                            </div>}
                        </div>
                    </div>            
                </div>
            </>)
        },
        {
            tabName: 'Routing Policy',
            content: (<>                
                <div className="grid grid-cols-1 gap-y-[2px] gap-x-2"> 
                    <div className="relative collapse collapse-arrow bg-white_1-400 rounded-lg mb-3">
                        <input type="checkbox" className="peer" name={`collapse_costBudget`} disabled={costBudget===false} /> 
                        <div className={` group collapse-title min-h-0 flex items-center space-y-1 gap-x-3 py-2 px-4 group-hover:bg-primary-400 group-hover:text-primary-100  text-black-500`}>
                            <FormInputToggle
                                name='costBudget'     
                                label='Cost Guardrails'   
                                //labelDesc='Enable archive'          
                                error={error?.costBudget}
                                register={register}                     
                                handleChange={(e:any)=>{ setCostBudget &&                       
                                    setCostBudget(e.target.checked)
                                }} 
                                isChecked={costBudget}  
                                wrapperClass={`pt-[.5rem] md:pl-[1.25rem] ${!costBudget && styles.border_b_lite}`} 
                                inputClassName='max-w-sm mr-auto'
                                labelWrapperClass='max-md:mr-5 md:min-w-[10%]'  
                                toggleClass='z-[99]'                    
                            />
                        </div>
                        <div className="collapse-content peer-checked:">
                            {costBudget && <div className={`bg-gray-400 px-4 py-3 rounded-[.313rem] md:pl-[1.75rem] `}>  
                                <FormInputText
                                    name="amount" 
                                    label="Amount USD"
                                    //labelDesc='Enter model name'
                                    type='text'                                              
                                    register={register} 
                                    handleChange={(e:any)=>{setAmount && setAmount(e.target.value)}}                                         
                                    placeholder="Amount USD"                
                                    error={error?.amount && amount === ''}
                                    defaultValue={amount}
                                    wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite}`}
                                    //inputClassName='select-sm'
                                    inputClassName='max-w-sm mr-auto'
                                    labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]'   
                                />                   
                                <FormDropdown 
                                    name='interval'     
                                    label="Interval" 
                                    //labelDesc='Select action'                   
                                    placeholder="Interval"          
                                    // error={formState?.errors?.actions?.message}
                                    register={register}
                                    options={intervalOptions} 
                                    handleChange={(e:any)=>{setInterval && setInterval(e.target.value)}} 
                                    defaultValue={action}
                                    wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem]`} 
                                    inputClassName='max-w-sm mr-auto'
                                    labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]'     
                                />

                                <FormDropdown 
                                    name='action'     
                                    label="Action" 
                                    //labelDesc='Select action'                   
                                    placeholder="Action"          
                                    // error={formState?.errors?.actions?.message}
                                    register={register}
                                    options={actionOptions} 
                                    handleChange={(e:any)=>{setAction && setAction(e.target.value)}} 
                                    value={action}
                                    wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] `} 
                                    inputClassName='max-w-sm mr-auto'
                                    labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]'     
                                />
                            </div>}
                        </div>
                    </div>
                           
                    <div className="relative collapse collapse-arrow bg-white_1-400 rounded-lg mb-3">
                        <input type="checkbox" className="peer" name={`collapse_configDlp`} disabled={configDlp===false} />
                        <div className={` group collapse-title min-h-0 flex items-center space-y-1 gap-x-3 py-2 px-4 group-hover:bg-primary-400 group-hover:text-primary-100  text-black-500`}>
                            <FormInputToggle
                                name='configDlp'     
                                label='Data Protection' 
                                error={error?.configDlp}
                                register={register}                     
                                handleChange={(e:any)=>{                        
                                    setConfigDlp(e.target.checked)
                                }} 
                                isChecked={configDlp} 
                                wrapperClass='pt-3 pb-3 md:pl-[1.75rem]' 
                                inputClassName='max-w-sm mr-auto'
                                labelWrapperClass='max-md:mr-5 md:min-w-[10%]'  
                                toggleClass='z-[99]'                  
                            />
                        </div>
                        <div className="collapse-content peer-checked:">
                            {configDlp && <div className='bg-gray-400 px-4 py-3 rounded-[.313rem] '>                     
                                <FormDropdown 
                                    name='strategy'     
                                    label="Strategy"      
                                    //labelDesc='Select strategy'              
                                    placeholder="Strategy"          
                                    // error={formState?.errors?.strategy?.message}
                                    register={register}
                                    options={strategies} 
                                    handleChange={(e:any)=>{setStrategy && setStrategy(e.target.value)}} 
                                    value={strategy}
                                    wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] md:pl-[1.75rem] ${styles.border_b_lite}`}
                                    inputClassName='max-w-sm mr-auto'
                                    labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]'    
                                /> 
                            </div>}
                        </div>
                    </div>                    
                      
                </div>
            </>)
        },
        {
            tabName: 'Team',
            content: (
                <>
                    <div className="grid grid-cols-1 gap-y-[2px] gap-x-2"> 
                        <FormInputText
                            name="configOwner" 
                            label="Owner"
                            //labelDesc='Enter owner'
                            type='text'                                              
                            register={register} 
                            handleChange={(e:any)=>{setConfigOwner(e.target.value)}}                                         
                            placeholder="Owner"                
                            error={error?.configOwner}
                            defaultValue={configOwner}
                            wrapperClass={`flex flex-row pb-[.5rem] pt-[.5rem] md:pl-[1.75rem] ${styles.border_b_lite} ${styles.border_t_lite}`}
                            inputClassName='max-w-sm mr-auto'
                            labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]'     
                        />
                        <FormInputText
                            name="configOrg" 
                            label="Organization"
                            //labelDesc='Enter organization'
                            type='text'                                              
                            register={register} 
                            handleChange={(e:any)=>{setConfirgOrg(e.target.value)}}                                         
                            placeholder="Organization"                
                            error={error?.configOrg}
                            defaultValue={configOrg}
                            wrapperClass={`flex flex-row pt-[.5rem] md:pl-[1.75rem]`}
                            inputClassName='max-w-sm mr-auto'
                            labelWrapperClass='xs:min-w-[20%] md:min-w-[15%]'     
                        />                        
                    </div>
                </>
            )
        }
    ];    
    
    return (
        <Form onSubmit={saveRoute} handleSubmit={handleSubmit} register={register} className='form h-full'> 
            <div className='h-full'>
                <TabsComponent tabsData={tabsData} setCurrTab={setCurrTab} currentTab={currTab} wraperClass='h-full--3 overflow-y-hidden' contentClass='h-full--4 overflow-y-auto' />            
                <div className='w-full text-center mt-[3rem] mb-0'>
                    <SaveButton btnTitle="save" />
                </div>
            </div>
        </Form>
    );
}

export default RouteForm;