import React from 'react'
import { ArrowLeftIcon } from './icons/svgIcons'
import styles from '../styles/styles.module.scss'
import Link from 'next/link'
type PageTitleProps={
    pageTitle: string;
    icon: boolean;
    breadcrumbData?: [] | any;
}
const PageTitle:React.FC<PageTitleProps> = ({pageTitle, icon, breadcrumbData=[]}) => {
  const height = breadcrumbData && breadcrumbData?.length>0? '4.875rem':'4.063rem';
  return (
    <div className={`flex flex-col items-start justify-center sm:min-h-[4.875rem] mr-3 max-xs:py-2`}>
        <h1 className={`flex items-center ${styles.page_title} text-lg`}>
          {icon && <span><ArrowLeftIcon /></span>} {pageTitle}
        </h1>
        {breadcrumbData && breadcrumbData?.length>0 &&
          <div className="text-sm breadcrumbs py-[3px] lg:py-1">
            <ul className='flex-wrap'>
              {breadcrumbData.map((breadcrumb:any, index:number)=>{
                return(
                  <li key={`breadcrumb-${index}`} className='text-gray-200'>
                    <Link className='text-[.725rem] sm:text-xs text-gray-200 font-light capitalize' href={breadcrumb?.link}>{breadcrumb?.name}</Link>
                  </li>
                );
              })}              
            </ul>
          </div>
        }
    </div>
  )
}
export default PageTitle