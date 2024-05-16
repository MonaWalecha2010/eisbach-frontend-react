import React, { InputHTMLAttributes } from "react";
import styles from '../../styles/styles.module.scss'
import ErrorMessage from "../texts/ErrorMessage";
interface DropdownProps extends InputHTMLAttributes<HTMLInputElement> {	
	name: string;
	placeholder:string;
	options:any;
	label?: string;
	labelDesc?:string;
	register?: any;
	error?: any;	
	handleChange?:any;
	inputClassName?: string; 
	wrapperClass?: string;	
	labelWrapperClass?: string;
	width?:string; 
	showTooltip?: boolean;
}
const FormDropdown:React.FC<DropdownProps> = ({	
	name,
	placeholder,
	options,
	label,
	labelDesc,
	register,
	error,	
	handleChange,
	inputClassName, 
	wrapperClass, 
	labelWrapperClass,
	showTooltip=false,
	...rest
}) => {
	const registerField = register(name);   
	
	return(
        <div className={`group ${wrapperClass && wrapperClass} flex-wrap xs:flex-nowrap`}>
			{ label && label!==''  &&
				<div className={`flex flex-col justify-center ${labelWrapperClass?labelWrapperClass:'md:min-w-[35%]'} mb-2 xs:mb-0`}>
				<label className="label px-0 py-0 text-[.813rem]">
					<span className={`${styles.label_text} text-primary-100`}>{label} </span>
				</label>
				{labelDesc && <p className='text-xs text-gray-200 '>{labelDesc}</p>}
			</div>}
			<div className={`${showTooltip===true?"tooltip hover:tooltip-open tooltip-top":''} w-full " `}data-tip={label} >
				<select className={`select select-bordered select-accent-primary-100 text-xs text-black-600 placeholder:text-gray-700  placeholder:text-xs border-[#E3DFFD] shadow-inputShadow w-full focus:outline-none ${inputClassName && inputClassName} ${error?'border-red-100':''} lg:min-w-[150px] h-[2.5rem] min-h-[2.5rem]`} 
					{...registerField} 
					onChange={e => {
						registerField.onChange(e);
						handleChange(e); 
					}}	
					{ ...rest }	
				>
					<option className="capitalize" value=""  disabled>{placeholder}</option>				
					{options && options.map((option:any, index:any) => {
						return <option className="text-black-600" key={index} value={option.value}>{option.displayValue}</option>
					})}
				</select>
			</div>
			<ErrorMessage error={error} /> 
        </div>
    );
}
export default FormDropdown;