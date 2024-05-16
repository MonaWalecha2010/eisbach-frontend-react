import React, { FunctionComponent } from 'react'
type btnProps={
    btnTitle:string;
    btnClass?:string;
    inProgress?:boolean;
    isDisabled?:boolean
    onClick?:(val:any)=>void;
}
const SaveButton: React.FC<btnProps> = ({btnTitle, btnClass, inProgress=false, isDisabled=false, onClick}) => {
    return (
        <button type='submit' className={`uppercase min-w-[90px] btn py-[11px] h-auto min-h-0 btn-primary bg-primary-300 text-sm font-medium text-white ${btnClass?btnClass:''} ${isDisabled && 'btn-disabled'}`} onClick={onClick}>{inProgress?"Please Wait!":btnTitle} 
            {/* {btnTitle} 
            {inProgress && <span className="ml-3 loading loading-spinner loading-xs"></span>} */}
        </button>
    );
}

export default SaveButton