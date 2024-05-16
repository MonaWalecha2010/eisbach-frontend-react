'use client';
import React, {useState, useEffect } from 'react'


import { useRouter } from 'next/navigation';
import Sidebar from '../components/(layout)/Sidebar';
import Header from '../components/(layout)/Header';
import { setUser, setOrg  } from '../store/reducers/gateway.reducer';
import { useAppDispatch } from '../store/hooks';
import { useClerk } from "@clerk/clerk-react";
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {     
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [isExpanded, setIsExpanded ]= useState<any>(true)
    const [lastActivity, setLastActivity] = useState<any>(new Date())
    const { signOut } = useClerk();
    const timeout = 5 * 60 * 1000; //5min
    function handleEvent() {      
      setLastActivity(new Date());
    }
    // useEffect(() => {
    //   window.addEventListener("mousemove", handleEvent);
    //   window.addEventListener("keydown", handleEvent);   
    //   window.addEventListener("click", handleEvent);
    //   const interval = setInterval(() => {
    //     const now:any = new Date();
    //     const diff = now - lastActivity;
  
    //     if (diff > timeout) {
    //       dispatch(setUser(null));
    //       dispatch(setOrg(null));
    //       signOut(() => router.push("/sign-in"))            
    //     }
    //   }, timeout); 
    //   document.addEventListener("mousemove", handleEvent);
    //   document.addEventListener("keypress", handleEvent);
    //   document.addEventListener("touchstart", handleEvent);
    //   return () => clearInterval(interval);
    // }, []); 
    
    return (<>  
      <div className="min-h-screen flex">
        <div className={`bg-white transition-[width] duration-400 ease-in-out ${isExpanded?'lg:w-[13.563rem]':'-translate-x-full lg:w-0'} flex-none ...`}>
          <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </div>
        <main className="flex-1 min-w-0 overflow-auto bg-gray-600 h-full...">
          <Header isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          <div className='xlg:container-full flex flex-col mx-auto pb-3 px-3 lg:px-2.313 h-auto min-h-full--70'>     
            {children}  
          </div>
        </main>
      </div>
    </>);
}