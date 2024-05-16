'use client';
import React, { useEffect, useState } from 'react'
import { useClerk } from "@clerk/clerk-react"
import { usePathname } from 'next/navigation'
import NavList from './NavList'
import styles from '../../styles/styles.module.scss'
import {PowerOff, CircleClose, CloseIcon } from '../icons/svgIcons'
import { MenuDataOne, MenuDataTwo } from '../data/menuData'
import Link from 'next/link'
import { getGateway, getUser } from '@/app/store/reducers/gateway.selector';
import { setAlert  } from '@/app/store/reducers/gateway.reducer'
import AppService from '@/app/services/AppService'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { AxiosResponse } from 'axios'
type SidebarProps={
    isExpanded?: boolean;   
    setIsExpanded: (val:any)=>void; 
}
const Sidebar: React.FC<SidebarProps> = ({isExpanded, setIsExpanded}) => {   
    const currentRoute = usePathname()
    const { signOut } = useClerk()
    const activeGateway = useAppSelector(getGateway)
    const currentUser = useAppSelector(getUser)
    const dispatch = useAppDispatch()
    const menuData = MenuDataOne(currentRoute)       
    // useEffect(()=>{
    //     const getAlertsData = async()=>{             
    //         await AppService.getAlerts(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.primaryEmailAddress?.emailAddress).then((res:AxiosResponse)=>{
    //             if(res){                      
    //                 if(res?.status === 200){                     
    //                     const newAlerts:any = res.data.filter((alert:any)=>alert?.was_read===true);   
    //                     dispatch(setAlert(newAlerts.length))
    //                 } else{
    //                     dispatch(setAlert(null))
    //                 }
    //             }else{dispatch(setAlert(null))}
    //         }).catch(error => {dispatch(setAlert(null))});
    //     } 
    //     getAlertsData()
    // },[])
    return (
        <>  
            <div id="docs-sidebar" className={`transition-all lg:transition-[width] duration-400 ease-in-out transform fixed top-0 left-0 bottom-0 z-[60] bg-white  pb-2 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0  ${isExpanded?'w-[13.563rem] expanded max-xs:shadow-sidebarShadow ':'-translate-x-full  w-0 '}`}>
                <div className={`relative flex items-center border-white-900 h-[4.375rem] ${isExpanded?'ml-6 w-166':'ml-4 w-0'}`}>
                    <Link className={`flex-none ${styles.brand_text} text-xl text-black-100 font-sans ${!isExpanded && 'text-sm'}`} href="/" aria-label="Brand">{isExpanded?'Javelin.': 'Javelin.'}</Link>
                    <span className={`lg:hidden absolute right-[-18px] top-2 ${isExpanded?'':'hidden'}`} onClick={()=> setIsExpanded(!isExpanded)} ><CloseIcon iconClass={'text-primary-100'} /></span>
                </div>
                <nav className="pb-2 w-full min-h-[89%] flex flex-col justify-between flex-wrap">
                    <ul className="space-y-[1px] relative">
                        <NavList listData={menuData}  currentRoute={currentRoute} isExpanded={isExpanded} />
                    </ul>                    
                    <ul>                        
                        <li>
                            <hr className='border-t-0 border-b border-gray-300 m-2' />
                        </li>
                        <NavList listData={MenuDataTwo}  currentRoute={currentRoute} isExpanded={isExpanded} />
                        {/* <li>
                            <div className={`group flex items-center space-y-1 gap-x-3.5 py-2 px-4 text-sm hover:bg-primary-300 hover:text-white ${currentRoute==='/logout'?'bg-primary-300 text-white':'bg-white text-black-500'}`} onClick={() => signOut()}>
                                <span className='inline-block group-hover:hidden'><PowerOff color="#373737" /></span>
                                <span className='hidden group-hover:inline-block'><PowerOff color="#ffffff" /></span>
                                {isExpanded && 'Logout'}
                            </div> 
                        </li> */}
                    </ul>
                </nav>
            </div>
        </>
    );
}
export default Sidebar