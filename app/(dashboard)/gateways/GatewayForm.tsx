import React, {useState} from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Form from '@/app/components/forms-components/Form'
import FormInputText from '@/app/components/forms-components/FormInputText'
import FormRadioGroup from '@/app/components/forms-components/FormRadioGroup'
import FormDropdown from '@/app/components/forms-components/FromDropdown'
import SaveButton from '@/app/components/forms-components/SaveButton'
type GatewayFormProps={
    name: string;
    url: string;
    mode:string;
    plan: string;
    setName:(val:any)=>void;
    setUrl:(val:any)=>void;
    setMode:(val:any)=>void;
    setPlan:(val:any)=>void;
    formType?: string;
    inProgress:boolean;
    saveGatewayData: Function;   

}
interface GatewayFormInterface {   
    name:string; 
    url:string; 
    mode:string;
    plan: string;    
};
const validationSchema = Yup.object().shape({
    gatewayName: Yup.string().required('Enter name'),
    gatewayUrl: Yup.string().required('Enter url'),  
    mode: Yup.string().required('select type'),
    plan: Yup.string().required('Choose plan'),
});
const modeOptions=[
    {
        displayValue:'Development',
        value:'development'
    },
    {
        displayValue:'Production',
        value:'production'
    }    
];
const GatewayForm: React.FC<GatewayFormProps> = ({name, setName, mode, setMode, url, setUrl, plan, setPlan, inProgress, saveGatewayData, formType='add'}) => {
    const [error, setError] = useState({
        name : false,
        mode : false,
        url : false,       
    }) 
    const {
        register,
        control,        
        handleSubmit,
        reset,
        formState   
    } = useForm();

    const saveGateway = () => {
        if(mode===''){
            setError({
                name: (name === ''),
                url: (url === ''),
                mode: (mode === ''),
            })
            return;
        }
        // let payload={name: name, mode: mode}
        // let payload={namespace: "test-namespace"}
        saveGatewayData(); 
    };    
    return (
        <Form onSubmit={saveGateway} handleSubmit={handleSubmit} register={register} className='form'>            
            <FormInputText
                name="name" 
                label="Name"
                type='text'                                              
                register={register} 
                handleChange={(e:any)=>{setName(e.target.value)}}                                         
                placeholder="Gateway Name"                
                error={error?.name && name === ''}
                // disabled={formType==='edit'?true:false}
                // readOnly={formType==='edit'?true:false}
                defaultValue={name}
            />
            {/*
                <FormInputText
                name="url" 
                label="URL"
                type='text'                                              
                register={register} 
                handleChange={(e:any)=>{setUrl(e.target.value)}}                                         
                placeholder="Gateway Url"                
                error={error?.url && url === ''}
                disabled={formType==='edit'?true:false}
                readOnly={formType==='edit'?true:false}
                defaultValue={url}
                inputClassName='lowercase placeholder:lowercase'
            /> */}
            <FormDropdown 
                name='mode'     
                label='Type'   
                placeholder="Select type ..."          
                error={error?.mode && mode === ''}
                register={register}
                options={modeOptions} 
                handleChange={(e:any)=>{                    
                    setMode(e.target.value)}}      
                value={mode}                  
                wrapperClass='mt-4 mb-[2rem]'         
            />
            {/* <FormRadioGroup 
                name='plan'     
                label='Plan'             
                error={formState?.errors?.plan?.message}
                register={register}
                options={planOptions} 
                handleChange={(e:any)=>setPlan(e.target.value)} 
                currentValue={planOptions[0]?.value}
            /> */}
            <div className='mt-4 w-full text-center'>
                <SaveButton btnTitle="save" inProgress={inProgress} />
            </div>
        </Form>
    );
}

export default GatewayForm;