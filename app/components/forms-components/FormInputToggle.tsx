import React, { FC, InputHTMLAttributes } from "react";
import ErrorMessage from "../texts/ErrorMessage";
import styles from '../../styles/styles.module.scss'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    register?: any;
    name: string;    
    label?: string;
    labelDesc?:string;
    error?: any;
    handleChange?:any;
    isChecked?:boolean;
    left?:boolean;
    disabled?:boolean;
    inputClassName?: string;   
    wrapperClass?: string;
    labelWrapperClass?:string;
    toggleClass?:string;
}
const FormInputToggle: FC<InputProps> = ({
    register,
    name,   
    error,
    label,
    labelDesc,
    handleChange, 
    isChecked=false, 
    left=false, 
    disabled=false, 
    inputClassName,
    wrapperClass,
    labelWrapperClass,
    toggleClass,
    ...rest
}) => {
    const registerField = register(name);   
    return (<>
        <div className={`form-control w-full ${wrapperClass} ${labelDesc?'flex-wrap xs:flex-nowrap':''}`}>
            <div className={`flex w-full items-center`}>
                <div className={`flex flex-col justify-center ${labelWrapperClass?labelWrapperClass:'md:min-w-[35%]'} ${labelDesc?'mb-2 xs:mb-0':'mr-4 xs:mr-0'}`}>
                    <div className="label text-[.813rem] px-0 py-0">
                        <span className={`${styles.label_text} text-primary-100 `}>{label}</span>
                    </div>
                    {labelDesc && <p className='text-xs text-gray-200 '>{labelDesc}</p>}
                </div>
                <label className={`${styles.toggle_switch} w-full text-right mr-[.875rem] ${toggleClass?toggleClass:''}`}>
                    <input 
                        {...registerField}                   
                        type="checkbox" 
                        className={`toggle ${inputClassName}`} 
                        checked={isChecked}
                        onChange={e => {
                            registerField.onChange(e);
                            handleChange && handleChange(e); 
                        }}
                        disabled={disabled}
                    />
                    <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
            </div>  
            <ErrorMessage error={error} />
        </div>
                
    </>);
}

export default FormInputToggle