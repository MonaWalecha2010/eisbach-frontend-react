import React, { FC, InputHTMLAttributes} from "react";
import styles from '../../styles/styles.module.scss'
import ErrorMessage from "../texts/ErrorMessage";
import { PlusSquare } from "../icons/svgIcons";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    note?:string;
    error?: any;
    errorMsg?:string;
    register?: any;
    maxLength?:number;
    wrapperClass?: string;
    iconClass?:string
    handleChange?:any;
    inputClassName?: string;  
    hideDefault?:boolean
    tooltip?:string;
}

const FormInputFile: FC<FileInputProps> = ({
  register,
  name, 
  note,
  error,
  errorMsg,
  label,
  maxLength,
  wrapperClass,
  iconClass,
  handleChange, 
  inputClassName,
  hideDefault=true,
  tooltip,
  ...rest
}) => {  
  const registerField = register(name);
  return (
    <div className={`relative ${wrapperClass}`}>
        <label htmlFor={name} >
            {/* <div className="label py-0 px-0"> */}
                <span className={`${styles.label_text} text-primary-100 text-xs`}>{label}</span>  
            {/* </div> */}
           <div className="group flex items-center my-2 cursor-pointer">
                <div className="tooltip group-hover:tooltip-open tooltip-right inline-flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-[.313rem] border border-silver-100 bg-white hover:bg-silver-100 mr-3 " data-tip={tooltip?tooltip:'Choose Files'}><PlusSquare /></div>
                {note && <p className="text-xs text-gray-700">{note}</p>}
           </div>
        </label>    
        <input className={`${hideDefault===true?'hidden':'file-input file-input-ghost'} focus:outline-none ${inputClassName}`}
            id={name}       
            type="file"     
            aria-invalid={error ? "true" : "false"}
            maxLength={maxLength?maxLength:''}
            {...registerField}
            onChange={e => {
            registerField.onChange(e);
            handleChange && handleChange(e); 
            }}
            {...rest}
        /> 
        {errorMsg && <ErrorMessage error={errorMsg} /> } 
    </div>
  )
}
export default FormInputFile;