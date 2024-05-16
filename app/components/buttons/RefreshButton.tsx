import React from 'react'
import { RefreshIcon } from '../icons/svgIcons'
type refreshProps={
    click: Function;
    btnClass?:string;
    inprogress?:boolean;
}
const RefreshButton:React.FC<refreshProps>=({click, btnClass, inprogress=false}) => {
    const clickButton=()=>{
        click();
    }   
    return (<>
        <button type="button" className={`group btn-sm flex-inline btn btn-outline hover:bg-primary-100 py-[.313rem] lg:py-[.438rem] px-[.938rem] min-h-fit h-auto ml-auto rounded-[.313rem] ${btnClass}`} onClick={()=>clickButton()}>
            <RefreshIcon color="#ffffff" iconClass={`inprogress===true?'animate-spin':'animate-none' group-hover:text-white` } />
            <span className='capitalize text-xs font-normal text-primary-100 group-hover:text-white' >Refresh</span>
        </button>
    </>)
}

export default RefreshButton