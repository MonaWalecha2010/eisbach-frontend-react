import React, { FC, InputHTMLAttributes, useEffect, useState } from "react";
import styles from '../../styles/styles.module.scss'
import ErrorMessage from "../texts/ErrorMessage";
interface CheckboxGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;  
  label?: string;
  error?: any;
  register?: any;
  options?:any; 
  handleChange?:Function; 
  handleSelectAll?:Function;
  currentValues?:[];  
  inputClassName?: string; 
  isAllSelected?:boolean;
  isCollapsible?:boolean;
  selectCount?:number,
  countLabel?:string,
  setSelectCount?:(val:any)=>void;
}

const FormCheckboxGroup: FC<CheckboxGroupProps> = ({  
  name,  
  label,
  error,
  register,  
  options, 
  handleChange,
  handleSelectAll,
  currentValues, 
  inputClassName,
  isAllSelected=false, 
  isCollapsible=false,
  selectCount,
  countLabel='',
  setSelectCount,
  ...rest
}) => { 
    let count:number=0;
    const registerField = register(name);
    const getSelectCount=()=>{
        options.map((option:any, index:number) => {
            if(currentValues && currentValues?.length>0){
                let filter = currentValues?.filter((i:any)=>i?.name === option?.name)                               
                if(filter?.length > 0){ 
                    count= count + 1;
                }
            }
        })
        setSelectCount && setSelectCount(count);
    }
    getSelectCount();
    return(
        <>
            {isCollapsible===true ?(
            <div className="collapse collapse-arrow bg-white_1-400 rounded-lg ">
                <input type="checkbox" className="peer" name={`collapse_${name}`} /> 
                <div className={`group collapse-title min-h-0 flex items-center space-y-1 gap-x-3 py-2 px-4 ${styles.navText} group-hover:bg-primary-400 group-hover:text-primary-100  text-black-500`}>                    
                    <label className="label text-[.813rem]">
                        <span className={`${styles.label_text} text-primary-100`}>{label}</span>
                    </label>                   
                    {selectCount!==undefined && selectCount>0 && <div className="mb-1 ml-auto mr-[1.5rem] text-center">
                        <span className={`xs:text-black-100 text-xs `}>
                            <span className={`text-primary-100 max-[460px]:badge max-[460px] max-[460px]:badge-xs} max-[460px]:text-[12px]`}>{selectCount} </span>
                            <span className="hidden min-[461px]:inline-block mr-1">{selectCount>1?`${countLabel}s`:`${countLabel}`}</span>
                            <span className="hidden sm:inline-block mr-1"> selected</span>
                        </span>
                    </div>}                                            
                    <label className={`label cursor-pointer mr-[2rem] relative z-[99] ${selectCount===undefined || selectCount===0 && 'ml-auto'}`}>                                                                     
                        <input
                            name={name}                                                         
                            type="checkbox"                                           
                            className={`rounded-[.313rem] checkbox checkbox-sm ${inputClassName}`}                              
                            onChange={e => {
                                handleSelectAll && handleSelectAll(name, e.target.checked); 
                            }}                         
                            {...rest}
                        />
                        <span className="label-text ml-2 text-xs hidden sm:block">Select All</span>   
                    </label>                    
                </div>
                <div className="collapse-content peer-checked:"> 
                    <div className="flex items-center flex-wrap">                
                        {options && options.map((option:any, index:number) => {
                            let checked = false;                            
                            if(currentValues && currentValues?.length>0){
                                let filter = currentValues?.filter((i:any)=>i?.name === option?.name)                               
                                if(filter?.length > 0){ 
                                    checked = true; 
                                }
                            }
                            return(
                                <div className="form-control mx-3" key={`radio_${index}`}>
                                    <label className="label cursor-pointer">                                                                     
                                        <input 
                                            {...registerField}
                                            name={option?.name}
                                            value={option.name}                               
                                            type="checkbox"                                           
                                            className={`rounded-[.313rem] checkbox checkbox-sm ${inputClassName}`}                              
                                            onChange={e => {
                                                registerField.onChange(e);
                                                handleChange && handleChange(e.target.value, e.target.checked);                                             
                                            }} 
                                            checked={checked}                                         
                                            {...rest}
                                        />
                                        <span className="label-text ml-2 text-xs">{option?.displayName}</span>   
                                    </label>
                                </div>
                            );
                        })}                
                    </div>
                    <ErrorMessage error={error} /> 
                </div>
            </div>              
            ):(
                <div className="">
                    <div className="flex items-center mb-4">
                        <label className="label py-[.25rem] text-[.813rem]">
                            <span className={`${styles.label_text} text-primary-100`}>{label}</span>
                        </label>
                        <label className="ml-auto label cursor-pointer">                                                                     
                            <input
                                name={name}                                                         
                                type="checkbox"                                           
                                className={`rounded-[.313rem] checkbox checkbox-sm ${inputClassName}`}                              
                                onChange={e => {
                                    handleSelectAll && handleSelectAll(name, e.target.checked); 
                                }}                         
                                {...rest}
                            />
                            <span className="label-text ml-2 text-xs">Select All</span>   
                        </label>
                    </div>
                    <div className="flex items-center flex-wrap">                
                        {options && options.map((option:any, index:number) => {
                            let checked = false; 
                            if(currentValues && currentValues?.length>0)
                            {
                                let filter = currentValues?.filter((i:any)=>i?.name === option?.name)
                                if(filter?.length > 0){ checked = true; }
                            }
                            return(
                                <div className="form-control mx-3" key={`radio_${index}`}>
                                    <label className="label cursor-pointer">                                                                     
                                        <input 
                                            {...registerField}
                                            name={option?.name}
                                            value={option.name}                               
                                            type="checkbox"                                           
                                            className={`rounded-[.313rem] checkbox checkbox-sm ${inputClassName}`}                              
                                            onChange={e => {
                                                registerField.onChange(e);
                                                handleChange && handleChange(e.target.value, e.target.checked);                                             
                                            }} 
                                            checked={checked}                                         
                                            {...rest}
                                        />
                                        <span className="label-text ml-2 text-xs">{option?.displayName}</span>   
                                    </label>
                                </div>
                            );
                        })}                
                    </div>
                    <ErrorMessage error={error} /> 
                </div>
            )}
        </>
    );
}
export default FormCheckboxGroup;