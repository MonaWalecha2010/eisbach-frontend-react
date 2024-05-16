'use client';
import React, {useRef, useState, useEffect} from 'react'
type TabProp={
    tabsData: []|any;
    currentTab?:string;
    setCurrTab?: (val:any)=>void;
    wraperClass?:string;
    contentClass?:string;
}
const TabsComponent:React.FC<TabProp> = ({tabsData, currentTab, setCurrTab, wraperClass, contentClass}) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);    
    const firstBtnRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;
    useEffect(() => {
        firstBtnRef?.current?.focus();
    }, []);
    const activateTab=(index:number, name: string)=>{
        setCurrTab && setCurrTab(name);
        setSelectedTab(index);
    }
    useEffect(()=>{
        if(currentTab && currentTab!==''){
            const index = tabsData.findIndex((obj:any) => obj.tabName === currentTab);
            setSelectedTab(index);
        }
    },[currentTab])
    return (
        <div className={`${wraperClass?wraperClass:''}`}>
            <div className="tabs gap-x-0 gap-y-3 md:gap-8 mt-2 justify-center sm:justify-start ">
                {tabsData && tabsData.map((data:any, index:number)=>(
                    <button 
                        key={index} 
                        type="button" 
                        ref={index === 0 ? firstBtnRef : null} 
                        onClick={()=>activateTab(index, data?.tabName)}
                        className={` ${selectedTab === index ? 'tab-bordered tab-active ' : ''} tab md:min-w-[6rem] focus:outline-none text-[.725rem] sm:text-xs `}>
                            {data?.tabName}
                    </button> 
                ))}
            </div>
            <div className={`tab-content pt-[1.5rem] ${contentClass}`}>
                {tabsData && tabsData.map((data:any, index:number)=>(
                    <div key={`tab-content-${index}`} className={`${selectedTab === index ? 'flex flex-col justify-between' : 'hidden'}`}>
                        {data.content}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TabsComponent