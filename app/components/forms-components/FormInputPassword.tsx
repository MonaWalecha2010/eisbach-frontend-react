import React, { FC, InputHTMLAttributes, useEffect, useState } from "react";
import styles from '../../styles/styles.module.scss'
import { EyeIcon, SlashEyeIcon } from "../icons/svgIcons";
import ErrorMessage from "../texts/ErrorMessage";
import CopyToClipBoard from "../shared/CopyToClipBoard";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder:string;
  label?: string;
  labelDesc?:string;
  copyValue?:string;
  showTooltip?: boolean;
  tooltip?:string;
  error?: any;
  errorMsg?:string;
  register?: any;
  maxLength?:number;
  wrapperClass?: string;
  iconClass?:string
  handleChange?:any;
  isResetform?:boolean;
  isReadOnly?:boolean;
  isAllowCopy?:boolean;
  inputClassName?: string;    
  labelWrapperClass?:string;
}
const FormInputPassword: FC<InputProps> = ({
  register,
  name,
  placeholder,
  error,
  errorMsg,
  label,
  labelDesc,
  copyValue,
  showTooltip=false,
  tooltip,
  maxLength,
  wrapperClass,
  inputClassName,
  labelWrapperClass,
  iconClass,
  handleChange,
  isResetform, 
  isAllowCopy=false,
  isReadOnly=false,
  ...rest
}) => {  
  const registerField = register(name); 
  const [fieldType, setFieldType] = useState<string>('password');
 
  const changeType=(type:string)=>{
    setFieldType(type)
  }
  useEffect(()=>{
    if(isResetform){
      setFieldType('password');
    }
  },[isResetform])
  return (<>
    <div className={`form-control w-full relative flex-wrap xs:flex-nowrap ${wrapperClass}`}>
        <div className={`flex flex-col justify-center ${labelWrapperClass?labelWrapperClass:'md:min-w-[35%]'} mb-2 xs:mb-0`}>
            <label className="label text-[.813rem] py-0 px-0">
            <span className={`${styles.label_text} text-primary-100`}>{label}</span>
            </label>
            {labelDesc && <p className='text-xs text-gray-200 hidden sm:block'>{labelDesc}</p>}
        </div>
        <div className={`relative ${inputClassName?inputClassName:''}  ${showTooltip && ( tooltip || label)?'tooltip group-hover:tooltip-open tooltip-top':''}  w-full`} data-tip={label?label:tooltip?tooltip:''} >
            <input type={fieldType} placeholder={placeholder} className={`input input-bordered border-[#E3DFFD] w-full focus:outline-none text-black-600 placeholder:text-gray-700 shadow-inputShadow disabled:text-gray-700 ${error?'border-red-100':''} text-xs placeholder:text-xs h-[2.5rem]`}
            aria-invalid={error ? "true" : "false"} 
            {...registerField}
            onChange={e => {
                registerField.onChange(e);
                handleChange && handleChange(e); 
            }}
            maxLength={maxLength}
            {...rest}
            />
            <span className={`absolute right-[.25rem] bottom-[.5rem] ${styles.passwordIcons} ${isReadOnly && styles.grayout}`}>              
              {(isAllowCopy && (copyValue!=='' && copyValue!==undefined))  && <><CopyToClipBoard text={copyValue?copyValue:''} tipPosition="tooltip-top" id={`cp-${name}`} cpClass={'mr-2 '} /></>}
              {fieldType==='password'?<button type="button" className="tooltip hover:tooltip-open tooltip-top" data-tip='show' onClick={()=>changeType('text')}><SlashEyeIcon /></button>:<button type="button" className="tooltip hover:tooltip-open tooltip-top" data-tip='Hide' onClick={()=>changeType('password')}><EyeIcon /></button>}
            </span>
        </div>
      {errorMsg && <ErrorMessage error={errorMsg} /> }
    </div> 
  </>);
};
export default FormInputPassword;