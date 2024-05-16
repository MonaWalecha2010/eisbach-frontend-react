'use client'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { removeSlashTwenty } from '@/app/helper/UrlHelper'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { setGateway} from '@/app/store/reducers/gateway.reducer';
import { getOrg, getIsGatewayProcessing } from '@/app/store/reducers/gateway.selector';
import styles from '../../styles/styles.module.scss'
type NavListProps={
    listData: []|any;
    currentRoute: string;
    isExpanded: boolean|any;
}
const NavList:React.FC<NavListProps> = ({listData, currentRoute, isExpanded}) => {  
    const router = useRouter()
    const [pathsData, setPathsData] = useState<string[]>([]);    
    const [isCollapseExpanded, setIsCollapseExpanded] = useState(true);
    const [isAccCollapseExpanded, setIsAccCollapseExpanded] = useState(true);
    const [isExpLevelTwo, setIsExpLevelTwo] = useState(true); 
    const [isExpLevelThree, setIsExpLevelThree] = useState(true); 
    const [gatewaysList , setGatewaysList] = useState<any>([])
    const dispatch = useAppDispatch(); 
    const currentOrg = useAppSelector(getOrg); 
    const isSettingGateway= useAppSelector(getIsGatewayProcessing); 
    // const isSettingGateway= true; 
    // console.log(listData)
    const toggleCollapse=()=>{
        setIsCollapseExpanded(!isCollapseExpanded);
    }
    const toggleCollapseItem=(name:string)=>{      
        setIsAccCollapseExpanded(!isAccCollapseExpanded);
    }
    const toggleCollapseLevelTwo=()=>{
        setIsExpLevelTwo(!isExpLevelTwo);
    }

    const toggleCollapseLevelThree=()=>{
        setIsExpLevelThree(!isExpLevelThree);
    }
    useEffect(()=>{
        if(currentRoute.startsWith('/gateways/')){
            let routeParts=currentRoute.split('/').filter(item => item !== '');            
            setPathsData(routeParts);
        } 
    },[currentRoute]);
    useEffect(()=>{
        if(currentOrg!=='' && currentOrg!==undefined && currentOrg?.publicMetadata?.Gateways!==undefined && currentOrg?.publicMetadata?.Gateways?.length>0 && gatewaysList?.length === 0){
            setGatewaysList(currentOrg?.publicMetadata?.Gateways)
        }        
    },[gatewaysList, currentOrg])  

    const setCurrentGateway=(namespace:string)=>{
        if(gatewaysList?.length > 0){
            let gateway = gatewaysList.filter((item:any)=>item?.namespace===namespace);
            dispatch(setGateway(gateway[0]));            
        }
    } 

    const ExpandListIcons=({isCollapseExpanded,currentRoute,item}:{isCollapseExpanded:boolean, currentRoute:string, item:any})=>{
        return(
            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-auto ${(isCollapseExpanded===true && currentRoute.startsWith(item?.link)) ?'':'rotate-[270deg]'}`} width="18" height="11" viewBox="0 0 18 11" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.04992 8.57282L13.6284 3.72505L13.7976 3.54586C13.9757 3.35727 14.2645 3.35727 14.4426 3.54586C14.6207 3.73444 14.6207 4.0402 14.4426 4.22879L14.2734 4.40798L9.62728 9.32735L9.45804 9.50654C9.3471 9.62401 9.19324 9.6683 9.04992 9.63944C8.9066 9.66831 8.75273 9.62401 8.6418 9.50654L8.47256 9.32735L3.82648 4.40798L3.65725 4.22879C3.47914 4.0402 3.47914 3.73444 3.65725 3.54586C3.83536 3.35727 4.12413 3.35727 4.30224 3.54586L4.47147 3.72505L9.04992 8.57282Z" fill={currentRoute.startsWith(item?.link)?'#1F263E':'#1F263E'}/>
            </svg>
        );
    }
        
    return (
        <>
            {listData && listData.map((item:any, index:number)=>{ 
                return(                                
                    <li key={`menu-${index}`}>
                        {item?.level===0 && item?.link!==undefined && <>
                            <Link className={`group flex items-center gap-x-3.5 py-2 px-4 hover:bg-primary-400 hover:text-primary-100 ${currentRoute === item.link?'bg-primary-400 text-primary-100':'bg-white text-black-500'} ${isSettingGateway===true?'disabled cursor-not-allowed':''} `} href={!isSettingGateway?item?.link:currentRoute}>                                       
                                {(currentRoute=== item.link)?(<>
                                    <span>{item?.icons[0].darkIcon}</span>
                                </>):(<>
                                    <span className={`inline-block group-hover:hidden`}>{item?.icons[0].darkIcon}</span>
                                    <span className={`hidden group-hover:inline-block`}>{item?.icons[0].darkIcon}</span>
                                </>)} 
                                <span className={`${item?.indicator===true?'indicator':''}`}>                                      
                                    {isExpanded && <span className={`capitalize ${styles.navText} `}>{item.menuText}</span>}
                                    {/* {item?.indicator===true && item?.indicatorVal!=='' && <span className="left-0 top-0 py-[3px]  badge-sm text-[.8125rem] badge bg-primary-300 text-white">{item?.indicatorVal}</span> } */}
                                </span> 
                            </Link>
                        </>}
                        {item?.level===1 && (<>
                            <div className="group collapse rounded-none">
                                <input type="checkbox" className='min-h-0' defaultChecked={true} onChange={()=>toggleCollapseItem(item.menuText)} /> 
                                <div className={`group collapse-title min-h-0 flex items-center space-y-1 gap-x-3 py-2 px-4 ${styles.navText} group-hover:bg-primary-400 group-hover:text-primary-100 ${currentRoute.startsWith(item?.link) ?'bg-primary-400 text-primary-100':'bg-white text-black-500'}`} >                                    
                                    {currentRoute.startsWith(item?.link)?(<>
                                        <span>{item?.icons[0].darkIcon}</span>
                                    </>):(<>
                                        <span className={`inline-block group-hover:hidden`}>{item?.icons[0].darkIcon}</span>
                                        <span className={`hidden group-hover:inline-block`}>{item?.icons[0].darkIcon}</span>
                                    </>)}                                    
                                    {isExpanded && <Link href={!isSettingGateway?item?.link:currentRoute} className={`capitalize ${styles.menuTextLink} ${isSettingGateway===true?'disabled cursor-not-allowed':''}`}>{item?.menuText}</Link>}
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`ml-auto ${(isAccCollapseExpanded===true && currentRoute.startsWith(item?.link))?'rotate-':'[270deg]'}`} width="18" height="11" viewBox="0 0 18 11" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.04992 8.57282L13.6284 3.72505L13.7976 3.54586C13.9757 3.35727 14.2645 3.35727 14.4426 3.54586C14.6207 3.73444 14.6207 4.0402 14.4426 4.22879L14.2734 4.40798L9.62728 9.32735L9.45804 9.50654C9.3471 9.62401 9.19324 9.6683 9.04992 9.63944C8.9066 9.66831 8.75273 9.62401 8.6418 9.50654L8.47256 9.32735L3.82648 4.40798L3.65725 4.22879C3.47914 4.0402 3.47914 3.73444 3.65725 3.54586C3.83536 3.35727 4.12413 3.35727 4.30224 3.54586L4.47147 3.72505L9.04992 8.57282Z" fill={currentRoute.startsWith(item?.link)?'#1F263E':'#1F263E'}/>
                                    </svg>                                    
                                </div>
                                <div className={`collapse-content pr-0 pl-0 ${styles.pb_0}`}> 
                                    <ul className="">
                                        {item?.subMenu && item?.subMenu?.map((subItem:any, index:number)=>{                                           
                                            return(
                                                <div key={`'submenu-' ${index}`} className="group collapse rounded-none">
                                                    {subItem.link!==undefined?<li>
                                                        {item.menuText==='Gateways'?(<> 
                                                            <button className={`w-full flex items-center gap-x-3.5 py-2 pl-[3.125rem] pr-4 cursor-pointer ${styles.navText} hover:bg-white_1-500 hover:text-gray-200 ${currentRoute === subItem.link?'bg-white_1-500 text-gray-200':'bg-white text-black-500'} ${subItem?.menuText?.length>12?'truncate ...':''} ${isSettingGateway===true?'disabled cursor-not-allowed':''}`} onClick={()=>{
                                                                setCurrentGateway(subItem.menuText)
                                                                router.push(subItem.link)
                                                            }}><span>{subItem.menuText.slice(0, 14) +"..." }</span><ExpandListIcons isCollapseExpanded={isCollapseExpanded} currentRoute={currentRoute} item={item}  /> </button>
                                                             
                                                        </>):(<>
                                                            <Link className={`flex items-center gap-x-3.5 py-2 pl-[3.125rem] pr-2 ${styles.navText} hover:bg-white_1-500 hover:text-gray-200 ${currentRoute === subItem.link?'bg-white_1-500 text-gray-200':'bg-white text-black-500'} ${isSettingGateway===true?'disabled cursor-not-allowed':''}`} href={!isSettingGateway?subItem?.link:currentRoute}>{subItem.menuText} </Link>
                                                        </>)}
                                                    </li>:''}                                           
                                                </div>
                                            );
                                        })}                                                                                           
                                    </ul>
                                </div>
                            </div>
                        </>)} 
                        {item?.level===2 && item?.link!==undefined && (<>                            
                            {item?.menuText==='Gateways' && pathsData?.length<2 ?(
                                <Link className={`group flex items-center gap-x-3.5 py-2 px-4 hover:bg-primary-400 hover:text-primary-100 ${currentRoute === item.link?'bg-primary-400 text-primary-100':'bg-white text-black-500'} ${isSettingGateway===true?'disabled cursor-not-allowed':''}`} href={!isSettingGateway?item?.link:currentRoute}>                                       
                                {(currentRoute=== item.link)?(<>
                                    <span>{item?.icons[0].darkIcon}</span>
                                </>):(<>
                                    <span className={`inline-block group-hover:hidden`}>{item?.icons[0].darkIcon}</span>
                                    <span className={`hidden group-hover:inline-block`}>{item?.icons[0].darkIcon}</span>
                                </>)}                                        
                                {isExpanded && <span className={`capitalize ${styles.navText} `}>{item.menuText}</span>}
                            </Link>
                            ):(                         
                            <div className="group collapse rounded-none">
                                <input type="checkbox" className='min-h-0' checked={isCollapseExpanded && currentRoute.startsWith(item?.link)}  onChange={()=>toggleCollapse()} /> 
                                <div className={`group collapse-title min-h-0 flex items-center space-y-1 gap-x-3.5 py-2 px-4 ${styles.navText} group-hover:bg-primary-400 group-hover:text-primary-100 ${ currentRoute.startsWith(item?.link)?'bg-primary-400 text-primary-100':'bg-white text-black-500'}`} >                                    
                                    {currentRoute.startsWith(item?.link)?(<>
                                        <span>{item?.icons[0].darkIcon}</span>
                                    </>):(<>
                                        <span className={`inline-block group-hover:hidden`}>{item?.icons[0].darkIcon}</span>
                                        <span className={`hidden group-hover:inline-block`}>{item?.icons[0].lightIcon}</span>
                                    </>)}
                                    {isExpanded && <Link href={!isSettingGateway?item?.link:currentRoute} className={`capitalize ${styles.menuTextLink} ${isSettingGateway===true?'disabled cursor-not-allowed':''}`}>{item?.menuText}</Link>}
                                    <ExpandListIcons isCollapseExpanded={isCollapseExpanded} currentRoute={currentRoute} item={item}  />
                                                                        
                                </div>
                                <div className={`collapse-content pr-0 pl-0 ${styles.pb_0}`}> 
                                    <ul className="">
                                        {item?.subMenu && item?.subMenu?.map((subItem:any, index:number)=>{
                                            return(
                                                <div key={`'submenu-' ${index}`} className="group collapse rounded-none">
                                                    {subItem?.parent===true?(<>
                                                        <input type="checkbox" className='min-h-0' checked={isExpLevelTwo && currentRoute.startsWith(item?.link)} onChange={()=>toggleCollapseLevelTwo()} /> 
                                                        <div className={`group collapse-title min-h-0 flex items-center space-y-1 gap-x-3 py-2 pl-[3.125rem] pr-4 ${styles.navText} group-hover:bg-silver-700  group-hover:text-primary-100 ${currentRoute===subItem?.link || subItem?.subMenu?.some((item:any )=> currentRoute === item.link) ?'bg-silver-700 text-primary-100':'bg-white text-black-500'}`} > 
                                                            {isExpanded && <Link className={`capitalize ${styles.menuTextLink} ${subItem?.menuText?.length>12?'truncate 111 ...':''}`} href={!isSettingGateway?subItem?.link:currentRoute} >{item?.menuText==='Gateways'? removeSlashTwenty(pathsData[1]).slice(0, 14) +"..." : subItem.menuText}</Link>}
                                                            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-auto ${(isExpLevelTwo===true && currentRoute.startsWith(item?.link))?'':'rotate-[270deg]'}`} width="18" height="11" viewBox="0 0 18 11" fill="none">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M9.04992 8.57282L13.6284 3.72505L13.7976 3.54586C13.9757 3.35727 14.2645 3.35727 14.4426 3.54586C14.6207 3.73444 14.6207 4.0402 14.4426 4.22879L14.2734 4.40798L9.62728 9.32735L9.45804 9.50654C9.3471 9.62401 9.19324 9.6683 9.04992 9.63944C8.9066 9.66831 8.75273 9.62401 8.6418 9.50654L8.47256 9.32735L3.82648 4.40798L3.65725 4.22879C3.47914 4.0402 3.47914 3.73444 3.65725 3.54586C3.83536 3.35727 4.12413 3.35727 4.30224 3.54586L4.47147 3.72505L9.04992 8.57282Z" fill={'#1F263E'}/>
                                                            </svg>   
                                                        </div>
                                                        <div className={`collapse-content pr-0 pl-0 ${styles.pb_0}`}>
                                                            <ul className=" pb-0">
                                                                {subItem?.subMenu && subItem?.subMenu.map((smItem:any, index:number)=>{
                                                                    // console.log(smItem);
                                                                    return (
                                                                                <div key={`'submenu-' ${index}`} className="group collapse rounded-none">
                                                                                {smItem?.parent===true?(<>
                                                                                    <input type="checkbox" className='min-h-0' checked={isExpLevelThree && currentRoute.startsWith(item?.link)} onChange={()=>toggleCollapseLevelThree()} /> 
                                                                                    <div className={`group collapse-title min-h-0 flex items-center space-y-1 gap-x-3 py-2 pl-[3.125rem] pr-4 ${styles.navText} group-hover:bg-silver-700  group-hover:text-primary-100 ${currentRoute===subItem?.link || subItem?.subMenu?.some((item:any )=> currentRoute === item.link) ?'bg-silver-700 text-primary-100':'bg-white text-black-500'}`} > 
                                                                                        {isExpanded && <Link className={`capitalize ${styles.menuTextLink} ${subItem?.menuText?.length>12?'truncate ...':''}`} href={!isSettingGateway?subItem?.link:currentRoute} >{item?.menuText==='Gateways'? removeSlashTwenty(pathsData[1]): subItem.menuText}</Link>}
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className={`ml-auto ${(isExpLevelThree===true && currentRoute.startsWith(item?.link))?'':'rotate-[270deg]'}`} width="18" height="11" viewBox="0 0 18 11" fill="none">
                                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.04992 8.57282L13.6284 3.72505L13.7976 3.54586C13.9757 3.35727 14.2645 3.35727 14.4426 3.54586C14.6207 3.73444 14.6207 4.0402 14.4426 4.22879L14.2734 4.40798L9.62728 9.32735L9.45804 9.50654C9.3471 9.62401 9.19324 9.6683 9.04992 9.63944C8.9066 9.66831 8.75273 9.62401 8.6418 9.50654L8.47256 9.32735L3.82648 4.40798L3.65725 4.22879C3.47914 4.0402 3.47914 3.73444 3.65725 3.54586C3.83536 3.35727 4.12413 3.35727 4.30224 3.54586L4.47147 3.72505L9.04992 8.57282Z" fill={'#1F263E'}/>
                                                                                        </svg>   
                                                                                    </div>
                                                                                    <div className={`collapse-content pr-0 pl-0 ${styles.pb_0}`}>
                                                                                        <ul className=" pb-0">
                                                                                            {smItem?.subMenu && smItem?.subMenu.map((sm1Item:any, index:number)=>(
                                                                                                <li key={`sm-item-${index}`}>
                                                                                                <Link className={`flex items-center gap-x-3 py-2 pl-[3.5rem] pr-2  ${styles.navText} ${styles?.menuTextLink} hover:bg-white_1-500 hover:text-gray-200 ${currentRoute === sm1Item.link?'bg-white_1-500 text-gray-200':'bg-white text-black-500'} ${isSettingGateway===true?'disabled cursor-not-allowed':''}`} href={!isSettingGateway?sm1Item?.link:currentRoute}>
                                                                                                {sm1Item.menuText}
                                                                                                </Link>
                                                                                            </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                </>):  
                                                                                <li key={`sm-item-${index}`}>
                                                                                    <Link className={`flex items-center gap-x-3 py-2 pl-[3.5rem] pr-2  ${styles.navText} ${styles?.menuTextLink} hover:bg-white_1-500 hover:text-gray-200 ${currentRoute === smItem.link?'bg-white_1-500 text-gray-200':'bg-white text-black-500'} ${isSettingGateway===true?'disabled cursor-not-allowed':''}`} href={!isSettingGateway?smItem?.link:currentRoute}>
                                                                                    {smItem.menuText}
                                                                                    </Link>
                                                                                </li>
                                                                                }                                                    
                                                                            </div>
                                                                        )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </>):(<li>
                                                        <Link className={`flex items-center gap-x-3.5 py-2 pl-[3.125rem] pr-2  ${styles.navText} hover:bg-white_1-500 hover:text-gray-200 ${currentRoute === subItem.link?'bg-white_1-500 text-gray-200':'bg-white text-black-500'} ${isSettingGateway===true?'disabled cursor-not-allowed':''}`} href={!isSettingGateway?subItem.link:currentRoute}>
                                                        {subItem.menuText}
                                                        </Link>
                                                    </li>)}                                                    
                                                </div>
                                            );
                                        })}               
                                    </ul>
                                </div>
                            </div>
                            )}
                        </>)} 
                        {item?.level===3 && item?.link!==undefined && (<>                            
                            <div className="group collapse rounded-none">
                                <input type="checkbox" className='min-h-0' defaultChecked={true} onChange={()=>toggleCollapseItem(item.menuText)} /> 
                                <div className={`group collapse-title min-h-0 flex items-center space-y-1 gap-x-3 py-2 px-4 ${styles.navText} group-hover:bg-primary-400 group-hover:text-primary-100 ${currentRoute.startsWith(item?.link) ?'bg-primary-400 text-primary-100':'bg-white text-black-500'}`} >                                    
                                    {currentRoute.startsWith(item?.link)?(<>
                                        <span>{item?.icons[0].darkIcon}</span>
                                    </>):(<>
                                        <span className={`inline-block group-hover:hidden`}>{item?.icons[0].darkIcon}</span>
                                        <span className={`hidden group-hover:inline-block`}>{item?.icons[0].darkIcon}</span>
                                    </>)}                                    
                                    {isExpanded && <Link href={!isSettingGateway?item?.link:currentRoute} className={`capitalize ${styles.menuTextLink} ${isSettingGateway===true?'disabled cursor-not-allowed':''}`}>{item?.menuText}</Link>}
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`ml-auto ${(isAccCollapseExpanded===true && currentRoute.startsWith(item?.link))?'rotate-':'[270deg]'}`} width="18" height="11" viewBox="0 0 18 11" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.04992 8.57282L13.6284 3.72505L13.7976 3.54586C13.9757 3.35727 14.2645 3.35727 14.4426 3.54586C14.6207 3.73444 14.6207 4.0402 14.4426 4.22879L14.2734 4.40798L9.62728 9.32735L9.45804 9.50654C9.3471 9.62401 9.19324 9.6683 9.04992 9.63944C8.9066 9.66831 8.75273 9.62401 8.6418 9.50654L8.47256 9.32735L3.82648 4.40798L3.65725 4.22879C3.47914 4.0402 3.47914 3.73444 3.65725 3.54586C3.83536 3.35727 4.12413 3.35727 4.30224 3.54586L4.47147 3.72505L9.04992 8.57282Z" fill={currentRoute.startsWith(item?.link)?'#1F263E':'#1F263E'}/>
                                    </svg>                                    
                                </div>
                                <div className={`collapse-content pr-0 pl-0 ${styles.pb_0}`}> 
                                    <ul className="">
                                        {item?.subMenu && item?.subMenu?.map((subItem:any, index:number)=>{                                           
                                            return(
                                                <div key={`'submenu-sm' ${index}`} className="group collapse rounded-none">
                                                    {subItem.link!==undefined?<li>
                                                        {subItem.link==='/gateways' && subItem?.parent ?(
                                                        <>
                                                            <div className="group collapse rounded-none">
                                                                <input type="checkbox" className='min-h-0' defaultChecked={true} onChange={()=>toggleCollapseItem(item.menuText)} /> 
                                                                <div className={`pl-[3.125rem] group collapse-title min-h-0 flex items-center space-y-1 gap-x-3 py-2 px-4 ${styles.navText} group-hover:bg-primary-400 group-hover:text-primary-100 ${currentRoute.startsWith(subItem?.link) ?'bg-primary-400 text-primary-100':'bg-white text-black-500'}`} >                                    
                                                                                              
                                                                    {isExpanded && <Link href={!isSettingGateway?subItem?.link:currentRoute} className={`capitalize ${styles.menuTextLink} ${isSettingGateway===true?'disabled cursor-not-allowed':''}`}>{subItem?.menuText}</Link>}
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`ml-auto ${(isAccCollapseExpanded===true && currentRoute.startsWith(item?.link))?'rotate-':'[270deg]'}`} width="18" height="11" viewBox="0 0 18 11" fill="none">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.04992 8.57282L13.6284 3.72505L13.7976 3.54586C13.9757 3.35727 14.2645 3.35727 14.4426 3.54586C14.6207 3.73444 14.6207 4.0402 14.4426 4.22879L14.2734 4.40798L9.62728 9.32735L9.45804 9.50654C9.3471 9.62401 9.19324 9.6683 9.04992 9.63944C8.9066 9.66831 8.75273 9.62401 8.6418 9.50654L8.47256 9.32735L3.82648 4.40798L3.65725 4.22879C3.47914 4.0402 3.47914 3.73444 3.65725 3.54586C3.83536 3.35727 4.12413 3.35727 4.30224 3.54586L4.47147 3.72505L9.04992 8.57282Z" fill={currentRoute.startsWith(item?.link)?'#1F263E':'#1F263E'}/>
                                                                    </svg>                                    
                                                                </div>
                                                                <div className={`collapse-content pr-0 pl-0 ${styles.pb_0}`}> 
                                                                    <ul className="">
                                                                        {subItem?.subMenu && subItem?.subMenu?.map((smItem:any, index:number)=>{                                           
                                                                            return(
                                                                                <div key={`'submenu-sm' ${index}`} className="group collapse rounded-none">
                                                                                    {smItem.link!==undefined?<li>
                                                                                        {smItem?.parent ?(
                                                                                        <>
                                                                                           <div className="group collapse rounded-none">
                                                                                                <input type="checkbox" className='min-h-0' defaultChecked={true} onChange={()=>toggleCollapseItem(smItem.menuText)} /> 
                                                                                                <div className={`pl-[4rem] group collapse-title min-h-0 flex items-center space-y-1 gap-x-3 py-2 px-4 ${styles.navText} group-hover:bg-primary-400 group-hover:text-primary-100 ${currentRoute.startsWith(smItem?.link) ?'bg-primary-400 text-primary-100':'bg-white text-black-500'}`} >                                    
                                                                                                                            
                                                                                                    {isExpanded && <Link href={!isSettingGateway?subItem?.link:currentRoute} className={`capitalize ${styles.menuTextLink} ${isSettingGateway===true?'disabled cursor-not-allowed':''}`}>{smItem?.menuText}</Link>}
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`ml-auto ${(isAccCollapseExpanded===true && currentRoute.startsWith(smItem?.link))?'rotate-':'[270deg]'}`} width="18" height="11" viewBox="0 0 18 11" fill="none">
                                                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.04992 8.57282L13.6284 3.72505L13.7976 3.54586C13.9757 3.35727 14.2645 3.35727 14.4426 3.54586C14.6207 3.73444 14.6207 4.0402 14.4426 4.22879L14.2734 4.40798L9.62728 9.32735L9.45804 9.50654C9.3471 9.62401 9.19324 9.6683 9.04992 9.63944C8.9066 9.66831 8.75273 9.62401 8.6418 9.50654L8.47256 9.32735L3.82648 4.40798L3.65725 4.22879C3.47914 4.0402 3.47914 3.73444 3.65725 3.54586C3.83536 3.35727 4.12413 3.35727 4.30224 3.54586L4.47147 3.72505L9.04992 8.57282Z" fill={currentRoute.startsWith(item?.link)?'#1F263E':'#1F263E'}/>
                                                                                                    </svg>                                    
                                                                                                </div>
                                                                                                <div className={`collapse-content w-full pr-0 pl-0 ${styles.pb_0}`}> 
                                                                                                    <ul className="w-full">
                                                                                                        {smItem?.subMenu && smItem?.subMenu?.map((sm1Item:any, index:number)=>{                                           
                                                                                                            return(
                                                                                                                <div key={`'submenu-sm-sm' ${index}`} className="group collapse rounded-none">
                                                                                                                    {sm1Item.link!==undefined?<li>
                                                                                                                        {sm1Item.link==='/gateways' && sm1Item?.parent ?(
                                                                                                                        <>
                                                                                                                            <button className={`w-full flex items-center gap-x-3.5 py-2 pl-[4rem] pr-4 cursor-pointer ${styles.navText} hover:bg-white_1-500 hover:text-gray-200 ${currentRoute === sm1Item.link?'bg-white_1-500 text-gray-200':'bg-white text-black-500'} ${sm1Item?.menuText?.length>12?'truncate ...':''} ${isSettingGateway===true?'disabled cursor-not-allowed':''}`} onClick={()=>{
                                                                                                                                setCurrentGateway(sm1Item.menuText)
                                                                                                                                router.push(sm1Item.link)
                                                                                                                            }}><span>{sm1Item.menuText.slice(0, 14) +"..." }</span><ExpandListIcons isCollapseExpanded={isCollapseExpanded} currentRoute={currentRoute} item={item}  /> </button>
                                                                                                                            
                                                                                                                        </>):(<>
                                                                                                                            <Link className={`flex items-center gap-x-3.5 py-2 pl-[4rem] pr-2 ${styles.navText} hover:bg-white_1-500 hover:text-gray-200 ${currentRoute === sm1Item.link?'bg-white_1-500 text-gray-200':'bg-white text-black-500'} ${isSettingGateway===true?'disabled cursor-not-allowed':''}`} href={!isSettingGateway?sm1Item?.link:currentRoute}>{sm1Item.menuText} </Link>
                                                                                                                        </>)}
                                                                                                                    </li>:''}                                               
                                                                                                                </div>
                                                                                                            );
                                                                                                        })}                                                                                           
                                                                                                    </ul>
                                                                                                </div>
                                                                                            </div>
                                                                                                                            
                                                                                        </>):(<>
                                                                                            <Link className={`flex items-center gap-x-3.5 py-2 pl-[4rem] pr-2 ${styles.navText} hover:bg-white_1-500 hover:text-gray-200 ${currentRoute === smItem.link?'bg-white_1-500 text-gray-200':'bg-white text-black-500'} ${isSettingGateway===true?'disabled cursor-not-allowed':''}`} href={!isSettingGateway?smItem?.link:currentRoute}>{smItem.menuText} </Link>
                                                                                        </>)}
                                                                                    </li>:''}                                           
                                                                                </div>
                                                                            );
                                                                        })}                                                                                           
                                                                    </ul>
                                                                </div>
                                                            </div>                                                             
                                                        </>):(<>
                                                            <Link className={`flex items-center gap-x-3.5 py-2 pl-[3.125rem] pr-2 ${styles.navText} hover:bg-white_1-500 hover:text-gray-200 ${currentRoute === subItem.link?'bg-white_1-500 text-gray-200':'bg-white text-black-500'} ${isSettingGateway===true?'disabled cursor-not-allowed':''}`} href={!isSettingGateway?subItem?.link:currentRoute}>{subItem.menuText} </Link>
                                                        </>)}
                                                    </li>:''}                                           
                                                </div>
                                            );
                                        })}                                                                                           
                                    </ul>
                                </div>
                            </div>
                        </>)}                           
                    </li>
                );
            })}
        </>
    );
} 
export default NavList;
