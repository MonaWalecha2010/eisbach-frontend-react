import React, { useEffect, useState } from 'react'
import { ArrowLeftSmIcon,ArrowRightSmIcon } from '../icons/svgIcons'
type PaginatonProps={
  isEnabled?:boolean;
  pageNumber?:number;
  setPageNumber?:(val:any)=>void;
  pageLimit?: number;
  setPageLimit?:(val:any)=>void;
  totalCount: number;
  pageHandler:Function;
  showLimitOption?:boolean;
  showTotalRecords?:boolean;
}
const Pagination:React.FC<PaginatonProps> = ({isEnabled=true, showLimitOption=true, showTotalRecords=true, pageNumber=1, setPageNumber, pageLimit=10, setPageLimit, totalCount, pageHandler}) => {   
  const pageCount = Math.ceil(totalCount / pageLimit);
  const handlePrev=(page:number)=>{
    if(page>1){
      setPageNumber && setPageNumber(page - 1);
    }
  }
  const handleNext=(page:number)=>{
    if(page<pageCount){
      setPageNumber && setPageNumber(page + 1);
    }
  }
  
  const resetPageNumber=()=>{
    setPageNumber && setPageNumber(1);
  }
  const firstPage=()=>{
    setPageNumber && setPageNumber(1);
  }
  const lastPage=()=>{
    setPageNumber && setPageNumber(pageCount);
  }
  useEffect(()=>{
    pageHandler()
  },[pageNumber])
  const handleLimit=(value:number)=>{
    if(setPageLimit){
      setPageLimit(value);
    }
  }
  return (<>
    <div className='flex items-center justify-between mt-3'>
      <button type='button' className={showTotalRecords && totalCount>0?'ml-2 text-black-100 text-xs border px-3 rounded-md py-1 shadow-lg border-white_1-400':'hidden'} onClick={()=>resetPageNumber()}><span className='text-md'>{totalCount}</span> Records</button>
      <div className='inline-flex items-center justify-end'>    
        <select name="pageLimit" className={showLimitOption && totalCount>0?`text-xs text-primary-100 select select-sm select-bordered border-primary-100 max-w-xs focus:outline-none ml-auto mr-4`:'hidden'} value={pageLimit?pageLimit:'Select page limit'} onChange={(e:any)=>handleLimit(e.target.value)} >
          <option disabled className='text-xs'>Select page limit</option>
          <option value={10} className='text-xs'>10 Items</option>
          <option value={20} className='text-xs'>20 Items</option>
          <option value={25} className='text-xs'>25 Items</option>
        </select>      
        <div className={`${isEnabled && totalCount>0?'inline-flex items-center justify-end p-3 gap-2':'hidden'}`}>
          <button type='button' className={`${(pageNumber===null || pageNumber===1)? 'disabled cursor-not-allowed':'btn-outline '} btn-sm flex-inline btn capitalize shadow-lg`} onClick={()=>firstPage()}><ArrowLeftSmIcon />  <span className='text-xs'>First</span></button>
          <button type='button' className={`${(pageNumber===null || pageNumber===1)? 'disabled cursor-not-allowed':'btn-outline '} btn-sm flex-inline btn capitalize shadow-lg`} onClick={()=>handlePrev(pageNumber)}><ArrowLeftSmIcon />  <span className='text-xs'>Prev</span></button>
        {/* <div className='text-primary-100 text-xs'>
            {pageNumber} of {pageCount}
          </div>   */}
          <button type='button' className={`${(pageNumber===pageCount)? 'disabled cursor-not-allowed':'btn-outline'} btn-sm flex-inline btn capitalize shadow-lg`} onClick={()=>handleNext(pageNumber)} > <span className='text-xs'>Next</span> <ArrowRightSmIcon /></button>
          <button type='button' className={`${(pageNumber===pageCount)? 'disabled cursor-not-allowed':'btn-outline'} btn-sm flex-inline btn capitalize shadow-lg`} onClick={()=>lastPage()} > <span className='text-xs'>Last</span> <ArrowRightSmIcon /></button>
        </div>
      </div>
    </div>
  </>)
}

export default Pagination