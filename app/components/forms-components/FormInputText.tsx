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
  labelWrapperClass?: string;
  iconClass?:string
  handleChange?:any;
  inputClassName?: string;  
}
const FormInputText: FC<InputProps> = ({
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
    <div className={`group form-control w-full relative flex-wrap xs:flex-nowrap m-auto ${wrapperClass}`}>
      <div className={`flex flex-col justify-center ${labelWrapperClass?labelWrapperClass:'sm:min-w-[35%]'} mb-2 xs:mb-0`}>
        <label className="label text-[.813rem] py-0 px-0">
          <span className={`${styles.label_text} text-primary-100`}>{label}</span>
        </label>
        {labelDesc && <p className='text-xs text-gray-200'>{labelDesc}</p>}
      </div>
      <div className={`${showTooltip && ( tooltip || label)?'tooltip group-hover:tooltip-open tooltip-top':''}  w-full`} data-tip={label?label:tooltip?tooltip:''} >
        <input type="text" placeholder={placeholder} className={`input input-bordered border-[#E3DFFD] w-full focus:outline-none text-black-600 placeholder:text-gray-700 shadow-inputShadow disabled:text-gray-700 ${inputClassName} ${error?'border-red-100':''} text-xs placeholder:text-xs h-[2.5rem]`}
          aria-invalid={error ? "true" : "false"} 
          {...registerField}
          onChange={e => {
            registerField.onChange(e);
            handleChange && handleChange(e); 
          }}
          maxLength={maxLength}
          {...rest}
        />
      </div>
      {errorMsg && <ErrorMessage error={errorMsg} /> }
    </div> 
  </>);
};
export default FormInputText;