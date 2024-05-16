import React from 'react'
import { PlusIcon } from '../icons/svgIcons'
import { ReadMarkIcon } from '../icons/svgIcons'
import Link from 'next/link'
type ReviewBtnProps={
    btnClass?:string;
    status?:string;
    click:Function;
}
const ReviewStatusButton:React.FC<ReviewBtnProps> = ({btnClass="", status="", click}) => {
    const clickButton=()=>{
        click();
    }
    return (
        <button type='button' className='relative w-auto h-full z-[99] tooltip group-hover:tooltip-open tooltip-left' data-tip={status === 'unread'?'Mark As Read':'Mark As Unread'} onClick={()=>clickButton()}>
            <ReadMarkIcon iconColo={status === 'unread'?'gray':'green'} />
            {/* <span className={`capitalize font-normal text-white text-xs`} onClick={()=>clickButton()}>{status === 'unread'?'Mark As Read':'Mark As Unread'}</span> */}
            {/* {status === 'unread' ?  'open Icon' : 'Close Icon'}            */}
        </button>
    );
}
export default ReviewStatusButton