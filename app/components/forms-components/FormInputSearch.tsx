import React from 'react'
import { SearchIcon } from '../icons/svgIcons'
const FormInputSearch = () => {
  return (
    <>        
      <label className="input-group input-group-sm input-bordered bg-gray-400 rounded-full">
        <span className='bg-transparent pr-1'>
          <SearchIcon color='#333' />
        </span>
        <input type="search" placeholder="Search here..." className="bg-transparent input input-sm border-none focus:outline-none placeholder:text-slate-400 text-xs placeholder:text-xs" />
      </label>        
    </>
  );
}
export default FormInputSearch