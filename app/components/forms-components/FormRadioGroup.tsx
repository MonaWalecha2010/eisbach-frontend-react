import React, { FC, InputHTMLAttributes } from "react";
import styles from '../../styles/styles.module.scss'
import ErrorMessage from "../texts/ErrorMessage";
interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;  
  label?: string;
  error?: any;
  register?: any;
  options?:any; 
  handleChange?:any; 
  currentValue?:string;  
  inputClassName?: string; 
}

const FormRadioGroup: FC<RadioGroupProps> = ({  
  name,  
  label,
  error,
  register,  
  options, 
  handleChange,
  currentValue, 
  inputClassName, 
  ...rest
}) => { 
    const registerField = register(name);    
    return(
        <>
            <div className="">
                <label className="label py-[.25rem] text-[.813rem]">
                    <span className={`${styles.label_text} text-primary-100`}>{label}</span>
                </label>
                <div className="flex items-center">                
                    {options && options.map((option:any, index:number) => {
                        return(
                            <div className="form-control max-w-max " key={`radio_${index}`}>
                                <label className="label cursor-pointer">
                                    <span className="label-text mr-4 text-xs">{option?.label}</span>
                                    <input 
                                        {...registerField}
                                        value={option.value}                               
                                        type="radio"                                           
                                        className={`radio radio-sm checked:bg-primary-300 ${inputClassName}`}                              
                                        onChange={e => {
                                            registerField.onChange(e);
                                            handleChange && handleChange(e); 
                                        }}  
                                        checked={currentValue === option.value}                              
                                        {...rest}
                                    />
                                </label>
                            </div>
                        );
                    })}                
                </div>
                <ErrorMessage error={error} /> 
            </div>
        </>
    );
}
export default FormRadioGroup;