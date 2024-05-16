import React from 'react'
import { PlusIcon } from '../icons/svgIcons'
import Link from 'next/link'
type AddBtnProps={
    btnClass?:string;
    btnTitle?:string;
    btnSm?:boolean;
    plusShow?:boolean;
    click:Function;
    url?:string
}
const AddButton:React.FC<AddBtnProps> = ({url='', btnClass="", btnTitle="", click, btnSm=false, plusShow=true}) => {
    const clickButton=()=>{
        click();
    }
    return (
        (url !== '')?
        <Link href={url} className={`flex-inline btn  btn-primary bg-primary-300 hover:bg-primary-500 transition-colors py-[.313rem] lg:py-[.438rem] px-[.938rem] min-h-fit h-auto ml-auto rounded-[.313rem] ${btnClass} `}>
            <span className={`capitalize font-normal text-white ${btnSm?'text-xs':'text-xs lg:text-sm'}`} onClick={()=>clickButton()}>{btnTitle?btnTitle:'Add New'} </span>
            {plusShow && <PlusIcon color="#ffffff" isSm={btnSm} /> }  
        </Link>
        :
        <button type='button' className={`flex-inline btn  btn-primary bg-primary-300 hover:bg-primary-500 transition-colors py-[.313rem] lg:py-[.438rem] px-[.938rem] min-h-fit h-auto ml-auto rounded-[.313rem] ${btnClass} `} onClick={()=>clickButton()}>
            <span className={`capitalize font-normal text-white ${btnSm?'text-xs':'text-xs lg:text-sm'}`} onClick={()=>clickButton()}>{btnTitle?btnTitle:'Add New'} </span>
            {plusShow && <PlusIcon color="#ffffff" isSm={btnSm} /> }          
        </button>
    );
}
export default AddButton