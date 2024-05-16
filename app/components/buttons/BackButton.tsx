import React from 'react'
import Link from 'next/link'
import { ArrowLeftSmIcon } from '../icons/svgIcons'
type BackBtnProps={
    url:any;
    btnClass?:string
}
const BackButton:React.FC<BackBtnProps> = ({url, btnClass}) => {
  return (
    <Link href={url} className={`group btn-sm flex-inline btn btn-outline py-[.313rem] lg:py-[.438rem] px-[.938rem] min-h-fit h-auto ml-auto rounded-[.313rem] ${btnClass?btnClass:''}`}>
        <ArrowLeftSmIcon class={`text-primary-100 group-hover:text-white`} />
        <span className='capitalize text-xs font-normal text-primary-100 group-hover:text-white' >Back</span>
    </Link>
  )
}

export default BackButton