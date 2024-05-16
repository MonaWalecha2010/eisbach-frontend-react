import React, { FC, InputHTMLAttributes } from "react";
import styles from '../../styles/styles.module.scss'
import ErrorMessage from "../texts/ErrorMessage";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder:string;
  label?: string;
  labelDesc?:string;
  showTooltip?: boolean;
  tooltip?:string;
  error?: any;
  errorMsg?:string;
  register?: any;
  maxLength?:number;
  wrapperClass?: string;
  labelWrapperClass?:string;
  iconClass?:string
  handleChange?:any;
  inputClassName?: string;  
}
const FormInputTextarea: FC<InputProps> = ({
  register,
  name,
  placeholder,
  error,
  errorMsg,
  label,
  labelDesc,
  showTooltip=false,
  tooltip,
  maxLength,
  wrapperClass,
  labelWrapperClass,
  inputClassName,
  iconClass,
  handleChange,  
  ...rest
}) => {  
  const registerField = register(name);   
  return (<>
    <div className={`group form-control w-full relative ${wrapperClass} flex-wrap xs:flex-nowrap`}>
      <div className={`flex flex-col justify-center ${labelWrapperClass?labelWrapperClass:'md:min-w-[35%]'} mb-2 xs:mb-0`}>
        <label className="label text-[.813rem] py-0 px-0">
          <span className={`${styles.label_text} text-primary-100`}>{label}</span>
        </label>
        {labelDesc && <p className='text-xs text-gray-200 '>{labelDesc}</p>}
      </div>
      <div className={`${showTooltip && ( tooltip || label)?'tooltip group-hover:tooltip-open tooltip-top':''}  w-full`} data-tip={label?label:tooltip?tooltip:''} >
        <textarea placeholder={placeholder} className={`textarea border-[#E3DFFD] w-full ${inputClassName} ${error?'border-red-100':''} text-xs placeholder:text-xs min-h-[7.5rem] focus:outline-none text-black-600 placeholder:text-gray-700 shadow-inputShadow disabled:text-gray-700`} aria-invalid={error ? "true" : "false"} 
          {...registerField}
          maxLength={maxLength}
          onChange={e => {
            registerField.onChange(e);
            handleChange && handleChange(e); 
          }}
          {...rest}
        ></textarea>
        {maxLength && <p className="text-left text-xs text-gray-700">{maxLength} character limit</p>}
        {/* <input type="text" placeholder={placeholder} className={`input input-bordered border-[#E3DFFD] w-full focus:outline-none text-black-600 placeholder:text-gray-700 shadow-inputShadow disabled:text-gray-700 ${inputClassName} ${error?'border-red-100':''} text-sm placeholder:text-sm h-[2.5rem]`}
          aria-invalid={error ? "true" : "false"} 
          {...registerField}
          onChange={e => {
            registerField.onChange(e);
            handleChange && handleChange(e); 
          }}
          maxLength={maxLength}
          {...rest}
        /> */}
      </div>
      {errorMsg && <ErrorMessage error={errorMsg} /> }
    </div> 
  </>);
};
export default FormInputTextarea;