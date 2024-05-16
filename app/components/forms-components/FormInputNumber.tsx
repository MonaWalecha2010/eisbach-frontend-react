import React, { FC, InputHTMLAttributes } from 'react'
import styles from '../../styles/styles.module.scss'
import ErrorMessage from "../texts/ErrorMessage";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    placeholder:string;
    label?: string;
    labelDesc?:string;
    error?: any;
    register?: any;
    handleChange?:any;
    currentVal: number;
    setCurrentVal:(val:any)=>void;  
    inputClassName?: string;  
    wrapperClass?: string;
    labelWrapperClass?:string;
}
const FormInputNumber: FC<InputProps> = ({
    register,
    name,
    placeholder,
    error,
    label,
    labelDesc,
    handleChange,
    currentVal,
    setCurrentVal,  
    inputClassName, 
    wrapperClass,
    labelWrapperClass,
    ...rest
}) => {
    const registerField = register(name); 
    const onIncrement=(val:number)=>{        
        setCurrentVal(val + 1);       
    }
    const onDecrement=(val:number)=>{
        if(val>0){
            setCurrentVal(val - 1);           
        }        
    }
    return (
        <div className={`form-control w-full ${wrapperClass} flex-wrap xs:flex-nowrap`}>
            <div className={`flex flex-col justify-center ${labelWrapperClass?labelWrapperClass:'md:min-w-[35%]'} mb-2 xs:mb-0`}>
                <label className={`${styles.label_text} text-primary-100`}>
                    {label}
                </label>
                {labelDesc && <p className='text-xs text-gray-200 '>{labelDesc}</p>}
            </div>
            <div className='relative mr-auto flex items-center'>                
                <button type='button' className={`${styles.minus_button} absolute left-4 text-xs  disabled:hover:cursor-not-allowed`} disabled={currentVal===0} onClick={()=>onDecrement(currentVal)}>-</button>
                <input type="text" placeholder={placeholder} className={`text-xs bg-transparent placeholder:text-s input focus:outline-none text-black-600 placeholder:text-gray-700 disabled:text-gray-700 max-w-[11.25rem] text-center ${inputClassName} ${error?'border-red-100':''} h-[2.5rem]`} aria-invalid={error ? "true" : "false"} 
                    {...registerField}
                    onChange={e => {
                        registerField.onChange(e);
                        handleChange && handleChange(e); 
                    }}                    
                    value={currentVal}
                    {...rest}
                />
                <button type='button' className={`absolute right-4 flex text-xs ${styles.plus_button}`} onClick={()=>onIncrement(currentVal)}>+</button>
            </div>
            <ErrorMessage error={error} />            
        </div> 
    );
}
export default FormInputNumber