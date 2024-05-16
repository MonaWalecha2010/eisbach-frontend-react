import React, {useState, useEffect} from 'react'
import { useForm } from "react-hook-form"
import { InfoTypesData } from '@/app/components/data/gatwayData'
import TabsComponent from '@/app/components/TabsComponent'
import Form from '@/app/components/forms-components/Form'
import FormInputText from '@/app/components/forms-components/FormInputText'
import FormDropdown from '@/app/components/forms-components/FromDropdown'
import FormInputTextArea from '@/app/components/forms-components/FormInputTextarea'
import FormCheckboxGroup from '@/app/components/forms-components/FormCheckboxGroup'
import FormInputToggle from '@/app/components/forms-components/FormInputToggle'
import SaveButton from '@/app/components/forms-components/SaveButton'
import styles from "../../../../styles/styles.module.scss"
import ErrorMessage from '@/app/components/texts/ErrorMessage'
type DPFormProps={
    name:string;
    setName:(val:any)=>void;
    prompt:string;
    setPrompt:(val:any)=>void;
    notify:boolean;
    setNotify:(val:any)=>void;
    reject:boolean;
    setReject:(val:any)=>void;
    description:string;
    setDescription:(val:any)=>void;
    transformation:string;
    setTransformation:(val:any)=>void;
    confidenceThreshold:string; 
    setConfidenceThreshold:(val:any)=>void;
    infotypes:any;
    setIsResetform: Function;
    formType:string;
    isResetform:boolean;
    inProgress:boolean;
    saveData: Function;
}
const DataProtectionForm:React.FC<DPFormProps> = ({name, setName, prompt, setPrompt,notify, setNotify, reject, setReject, description, setDescription, transformation, setTransformation, confidenceThreshold, setConfidenceThreshold, infotypes, isResetform, setIsResetform,formType, inProgress, saveData}) => {
    const { handleSubmit, reset, register} = useForm()   
    const [selectedVal, setSelectedVal] = useState<any>(infotypes)  
    const [currTab, setCurrTab] = useState<string>("Config");
    const [disableReject, setDisableReject] = useState<boolean>(true);
    const [piiCount, setPiicount] = useState<number>(0);
    const [phiCount, setPhicount] = useState<number>(0);
    const [CTCount, setCTCount] = useState<number>(0);
    const [SFCount, setSFCount] = useState<number>(0);
    const [error, setError] = useState({
        name : false,
        transformation: false,
        confidenceThreshold : false,
        infotypes : false
    })  

    useEffect(()=>{
        if(transformation !== 'Inspect'){
            setDisableReject(true); setReject(false);
        }
        else{
            setDisableReject(false);
        }
    },[transformation])

    const transformationOptions=[
        {
            displayValue:'Inspect Only',
            value:'Inspect'
        },
        {
            displayValue:'Mask',
            value:'Mask'
        },
        {
            displayValue:'Redact',
            value:'Redact'
        },
        {
            displayValue:'Replace',
            value:'Replace'
        }
    ]
    const confidenceThresholdOptions=[       
        {
            displayValue:'VeryLikely',
            value:'VeryLikely'
        },
        {
            displayValue:'Likely',
            value:'Likely'
        },
        {
            displayValue:'Possible',
            value:'Possible'
        },
        {
            displayValue:'Unlikely',
            value:'Unlikely'
        },
        {
            displayValue:'VeryUnlikely',
            value:'VeryUnlikely'
        },
    ]  
     
    const saveDPData=()=>{ 
        if((name ==='' || transformation ==='' || confidenceThreshold ==='') && selectedVal?.length === 0){
            setError({                
                name : (name === ''),
                transformation : (transformation === ''),
                confidenceThreshold : (confidenceThreshold === ''),
                infotypes : (selectedVal?.length === 0)               
            })
            setCurrTab('Config')
            return;
        }
        if((name || transformation || confidenceThreshold ) && selectedVal?.length===0){            
            setError({
                ...error,                
                infotypes : (selectedVal?.length === 0)               
            })
            setCurrTab('Detection Settings')
            return;
        }
        let payload={
            name: name,
            description: description,
            enabled: true,
            type: transformation && transformation.toLowerCase() ===  'inspect'?'inspect':'de-identify',
            models: [{
                name: "Sensitive Data Protection",
                provider: "Google Cloud",
                suffix: "",
                weight: 0
            }],
            config: {
                infoTypes: selectedVal,
                likelihood: confidenceThreshold,
                transformation: {
                    method: transformation
                },
                rejectPrompt: prompt,
                notify: notify,
                reject: reject
            }
        }         
        saveData(payload)
    }
    useEffect(()=>{        
        if(isResetform===true){
            reset();
            setIsResetform(false);
        }
    },[isResetform])
    const handleChecked=(value:string, checked:boolean)=>{       
        if(checked){
            const objectExists = selectedVal.some((object:any) => object.name === value);
            if (!objectExists) {
                setSelectedVal([...selectedVal, {name: value}])
            }      
        }
        else{
            setSelectedVal(selectedVal.filter((items:any)=>items.name!==value));
        }
    } 
    const handleSelectAll=(groupName:string, value:boolean)=>{
        let values = selectedVal;           
        switch (groupName) {
            case 'PII':
                if(value){                   
                    InfoTypesData?.PII.map((item:any)=>( 
                        values = [...values , {name:item?.name}]
                    ))
                }else{
                    InfoTypesData?.PII.map((item:any)=>( 
                        values = values.filter((items:any)=>items.name!==item?.name)
                    ))
                }                 
                setSelectedVal([...values])
                return;                             
            case 'PHI':
                if(value){                   
                    InfoTypesData?.PHI.map((item:any)=>( 
                        values = [...values , {name:item?.name}]
                    ))
                }else{
                    InfoTypesData?.PHI.map((item:any)=>( 
                        values = values.filter((items:any)=>items.name!==item?.name)
                    ))
                } 
                setSelectedVal([...values])
                return;              
            case 'credentialAndTokens':
                if(value){                   
                    InfoTypesData?.credentialAndTokens.map((item:any)=>( 
                        values = [...values , {name:item?.name}]
                    ))
                }else{
                    InfoTypesData?.credentialAndTokens.map((item:any)=>( 
                        values = values.filter((items:any)=>items.name!==item?.name)
                    ))
                } 
                setSelectedVal([...values])
                return;                  
            case 'sensitiveFields':
                if(value){                   
                    InfoTypesData?.sensitiveFields.map((item:any)=>( 
                        values = [...values , {name:item?.name}]
                    ))
                }else{
                    InfoTypesData?.sensitiveFields.map((item:any)=>( 
                        values = values.filter((items:any)=>items.name!==item?.name)
                    ))
                } 
                setSelectedVal([...values])
                return;    
            default:
                return '';
        } 
    }  
    const tabsData=[
        {
            tabName: 'Config',
            content: (                
                <div className='w-full grid grid-cols-1 gap-3 sm:gap-5 px-1 sm:px-3 lg:px-5'>
                    <FormInputText
                        name="name" 
                        label="Name"
                        // labelDesc='Data protection name'
                        type='text'                                              
                        register={register} 
                        handleChange={(e:any)=>{setName(e.target.value)}}                                         
                        placeholder="Name"                                 
                        error={error?.name && name === '' }
                        defaultValue={name}                      
                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite} ${styles.border_t_lite} `}
                        inputClassName='max-w-xs sm:max-w-sm mr-auto'
                        labelWrapperClass='xs:min-w-[35%] sm:min-w-[20%]'
                        readOnly={formType==='edit'}
                        disabled={formType==='edit'}
                    />
                    <FormInputText
                        name="description" 
                        label="Description"
                        // labelDesc='Data protection description'
                        type='text'                                              
                        register={register} 
                        handleChange={(e:any)=>{setDescription(e.target.value)}}                                         
                        placeholder="Description"  
                        defaultValue={description}                      
                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite}`}
                        inputClassName='max-w-sm mr-auto'
                        labelWrapperClass='xs:min-w-[35%] sm:min-w-[20%]'
                        
                    />
                    {/* <FormDropdown 
                        name='transformation'     
                        label="Transformation"
                        labelDesc='Data protection Transformation' 
                        placeholder="Select Transformation ..."          
                        error={error?.transformation && transformation === ''}
                        register={register}
                        options={transformationOptions} 
                        handleChange={(e:any)=>{
                            setTransformation(e.target.value)}}      
                        value={transformation}
                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite}`}  
                        inputClassName='xl:max-w-xl'     
                    /> */}
                    <FormDropdown 
                        name='confidenceThreshold'     
                        label="Confidence Threshold"
                        // labelDesc='Data protection confidence threshold' 
                        placeholder="Select Confidence Threshold ..."          
                        error={error?.confidenceThreshold && confidenceThreshold === ''}
                        register={register}
                        options={confidenceThresholdOptions} 
                        handleChange={(e:any)=>{
                        setConfidenceThreshold(e.target.value)}}      
                        value={confidenceThreshold}
                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite}`} 
                        inputClassName='max-w-sm mr-auto'
                        labelWrapperClass='xs:min-w-[35%] sm:min-w-[20%]'
                           
                    />

                </div>               
            )
        },
        {
            tabName: 'Detection Settings',
            content: (<div className='w-full grid grid-cols-1 gap-3 sm:gap-5 px-1 sm:px-3 lg:px-5'>  
                <h2 className="text-lg font-semibold mb-2 text-primary-100">Infotypes</h2>      
                {error?.infotypes && selectedVal?.length === 0 ? <ErrorMessage fSize='text-sm' eClass='text-center' error='Please select the Infotypes from below options.'/>:<></>}       
                <div className='pb-[.5rem]'>                    
                    <FormCheckboxGroup 
                        name= "PII"
                        label= "PII"                           
                        register= {register}
                        options={InfoTypesData?.PII} 
                        currentValues={selectedVal}
                        selectCount={piiCount}
                        setSelectCount={setPiicount}
                        countLabel='Infotype'
                        handleChange={handleChecked} 
                        handleSelectAll={handleSelectAll}
                        isCollapsible={true}
                    />
                </div>
                <div className='pb-[.5rem]'>                    
                    <FormCheckboxGroup 
                        name= "PHI"
                        label= "PHI"                           
                        register= {register}
                        options={InfoTypesData?.PHI} 
                        currentValues={selectedVal}
                        selectCount={phiCount}
                        countLabel='Infotype'
                        setSelectCount={setPhicount}
                        handleChange={handleChecked} 
                        handleSelectAll={handleSelectAll}
                        isCollapsible={true}
                    />
                </div>
                <div className='pb-[.5rem]'>                                        
                    <FormCheckboxGroup 
                        name= "credentialAndTokens"
                        label= "Credential And Tokens"                           
                        register= {register}
                        options={InfoTypesData?.credentialAndTokens} 
                        currentValues={selectedVal}
                        selectCount={CTCount}
                        countLabel='Infotype'
                        setSelectCount={setCTCount}
                        handleChange={handleChecked}
                        handleSelectAll={handleSelectAll}
                        isCollapsible={true}
                    />
                </div>
                <div className='pb-[.5rem]'>                    
                    <FormCheckboxGroup 
                        name= "sensitiveFields"
                        label= "Other Sensitive Fields"                           
                        register= {register}
                        options={InfoTypesData?.sensitiveFields} 
                        currentValues={selectedVal}
                        selectCount={SFCount}
                        countLabel='Infotype'
                        setSelectCount={setSFCount}
                        handleChange={handleChecked} 
                        handleSelectAll={handleSelectAll}  
                        isCollapsible={true}                          
                    />
                </div>
            </div>)
        },
        {
            tabName: 'Action Settings',
            content: (                
                <div className='w-full grid grid-cols-1 gap-3 sm:gap-5 px-1 sm:px-3 lg:px-5'>
                    <FormDropdown 
                        name='transformation'     
                        label="Transformation"
                        // labelDesc='Data protection Transformation' 
                        placeholder="Select Transformation ..."          
                        error={error?.transformation && transformation === ''}
                        register={register}
                        options={transformationOptions} 
                        handleChange={(e:any)=>{
                            setTransformation(e.target.value)}
                        }      
                        value={transformation}
                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite}`}  
                        inputClassName='max-w-sm mr-auto'
                        labelWrapperClass='xs:min-w-[35%] sm:min-w-[20%]'
                    />
                    <FormInputToggle
                        name='reject'     
                        label='Reject' 
                        //labelDesc='Enable data protection'            
                        error={false}
                        register={register}                     
                        handleChange={(e:any)=>{                        
                            setReject(e.target.checked)
                        }} 
                        disabled={disableReject}
                        left={true}
                        isChecked={reject} 
                        wrapperClass='pt-3 pb-3'   
                        inputClassName={`max-w-sm mr-auto ${disableReject?'disabled cursor-not-allowed':''}`}
                        labelWrapperClass='xs:min-w-[35%] sm:min-w-[20%]'
                        toggleClass={`${disableReject?'disabled cursor-not-allowed':''}`}               
                    />
                    <FormInputTextArea
                        name="prompt" 
                        label="Reject Prompt"
                        type='text'                                              
                        register={register} 
                        handleChange={(e:any)=>{setPrompt(e.target.value)}}                                         
                        placeholder="Reject Prompt"                                 
                        //error={error?.api_key && api_key === ''}
                        defaultValue={prompt}
                        autoComplete='off'  
                        maxLength={5000}                                  
                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite}`}  
                        inputClassName='max-w-sm mr-auto'
                        labelWrapperClass='xs:min-w-[35%] sm:min-w-[20%]' 
                        showTooltip={false}                                         
                    />
                    <FormInputToggle
                        name='notify'     
                        label='Notify' 
                        //labelDesc='Enable data protection'            
                        error={false}
                        register={register}                     
                        handleChange={(e:any)=>{                        
                            setNotify(e.target.checked)
                        }} 
                        left={true}
                        isChecked={notify} 
                        wrapperClass='pt-3 pb-3' 
                        inputClassName='max-w-sm mr-auto'
                        labelWrapperClass='xs:min-w-[35%] sm:min-w-[20%]'                 
                    />

                </div>               
            )
        }
    ];
    return (
        <Form onSubmit={saveDPData} handleSubmit={handleSubmit} register={register} className='form h-full'> 
            <div className='h-full'>
                <div className='h-full min-h-[25vh] max-w-full'>
                    <TabsComponent tabsData={tabsData}  wraperClass='h-full--3 overflow-y-hidden' currentTab={currTab} setCurrTab={setCurrTab} contentClass='h-full--4 overflow-y-auto'/>
                </div>           
                <div className='w-full text-center mt-[4rem] mb-0'>
                    <SaveButton btnTitle="save" inProgress={inProgress} isDisabled={inProgress} />
                </div>
            </div>
        </Form>
    )
}

export default DataProtectionForm