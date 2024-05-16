import React, {InputHTMLAttributes} from 'react'
import styles from '../../styles/styles.module.scss'
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;  
    label?: string;
    description?:string;
    error?: any;
    register?: any;
    options?:any; 
    handleChange?:Function;   
    currentValue?:boolean;  
    wrapperClass?:string;
    inputClassName?: string; 
   
}
const FormInputCheckbox:React.FC<CheckboxProps> = ({
    name,
    label,
    description,
    error,
    register,
    options,
    handleChange, 
    currentValue,
    wrapperClass,
    inputClassName,
    ...rest
}) => {
  return (
    <>
        <div className={`${wrapperClass?wrapperClass:''}`}>            
            <label className="ml-auto label cursor-pointer items-start gap-3">                                                                     
                <input
                    name={name}                                                         
                    type="checkbox"                                           
                    className={`rounded-[.313rem] checkbox checkbox-sm focus:outline-none focus:shadow-none mt-2 ${error===true?'border-red-100':'border-primary-100'} ${inputClassName && inputClassName}`}                              
                    onChange={e => {
                        handleChange && handleChange(e.target.checked); 
                    }}  
                    checked={currentValue}                          
                    {...rest}
                />
                <div>
                    <p className={`${styles.label_text} text-primary-100 text-sm`}>{label}</p>
                    {description && <p className='text-xs text-gray-700'>{description}</p>}
                </div>
            </label>
    </div>
    </>
  )
}

export default FormInputCheckbox