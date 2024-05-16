'use client'
import React, {Children, ReactNode, useEffect, useState} from 'react' 
import JSONPretty from 'react-json-pretty'
import { JsonPrettyColorCodes, JsonPrettyStyles } from '@/app/components/data/jsonPrettyData'
// import 'react-json-pretty/themes/monikai.css'
import styles from '../../../../styles/styles.module.scss'
import { useParams } from 'next/navigation'
import TableComponent from '@/app/components/table/TableComponent'
import PageTitle from '@/app/components/PageTitle'
import { ChronicalData } from '@/app/components/data/gatwayData'
import { AngleDownThin, AngleUpIcon } from '@/app/components/icons/svgIcons'
import AppService from '@/app/services/AppService'
import { sortAlphabeticallyAsce, dateFormatYYYYMMDDhhmm, sortByModifiedAt, sortByModifiedAtAsc } from '@/app/helper/sortArray'
import { removeSlashTwenty } from '@/app/helper/UrlHelper'
import { AxiosResponse } from 'axios'
import { soryByTime, sortByLatestModifiedAt } from '@/app/helper/sortArray'
import { useAppSelector } from '@/app/store/hooks';
import { getGateway, getUser } from '@/app/store/reducers/gateway.selector';
import RefreshButton from '@/app/components/buttons/RefreshButton'
import SpinLoader from '@/app/components/loaders/SpinLoader'
import DataNotFound from '@/app/components/messages/DataNotFound'
import PlainTextMsg from '@/app/components/messages/PlainTextMsg'
import TabsComponent from '@/app/components/TabsComponent'
import AddButton from '@/app/components/buttons/AddButton'
import AlertsListing from '@/app/(dashboard)/alert/AlertsListing'
import FormInputToggle from '@/app/components/forms-components/FormInputToggle'
import ReviewStatusButton from '@/app/components/buttons/ReviewStatusButton'
import { errorToast, successToast } from '@/app/helper/toastMsg'
export type childrenType = ReactNode;
const Chronicle = () => {
    const params = useParams();
    const activeGateway = useAppSelector(getGateway);
    const currentUser = useAppSelector(getUser)
    const currentNamespace = removeSlashTwenty(params.slug); 
    const [routeOptions , setRouteOptions] = useState<[]>();  
    const [route, setRoute] = useState<string>("");    
    const [combinedChronicleData , setCombinedChronicleData] = useState<any|null>(null); 
    const firstRowRef = React.useRef() as React.MutableRefObject<HTMLTableRowElement>;   
    const headingsData=[
        { name:'Date/time'},
        { name:'Type'}, 
        { name:'Route'}, 
        { name:'Message'},
        { name:'Model Name'},         
        { name:'Provider'}, 
        { name: ''}
    ];
    const alertsheadingsData=[
        { name:'Date/time'},
        { name:'Message'},
        { name:'Model Name'},         
        { name:'Provider'}, 
        { name:'Status'}, 
        { name: ''}
    ];
    const breadcrumbs=[
        { name: 'Home', link: '/'},
        { name: 'Gateways', link: '/gateways'},
        { name: currentNamespace, link: '/gateways/'+currentNamespace},
        { name: 'Chronicle', link: '/gateways/'+currentNamespace+'/chronicle'}
    ];
    const [selectedRow, setelectedRow] = useState<string>('')
    const [expanded, setExpanded]= useState(false)
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [alertinProgress, setAlertInProgress] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<boolean>(false)  
    const [currentTab, setCurrentTab] = useState<string>('Archives')
    const [alertsData, setAlertsData] = useState<any>([]) 
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10); 
    const [itemsCount, setItemsCount] = useState<number>(); 
    const toggleRowCollapse=(rowId:string)=>{
        if(selectedRow!==rowId){
            setExpanded(true)
            setelectedRow(rowId)
        }else{
            setExpanded(expanded?false:true)
            setelectedRow(rowId)
        }
    }
    const getRoutes=async()=>{
        await AppService.getRoutes(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id).then((res:AxiosResponse)=>{
            if(res){
                if(res?.status === 200){                   
                    const sortData = sortAlphabeticallyAsce(res.data) as [];                     
                    setRouteOptions(sortData);                    
                }                
            }
        })
    }
    const getChronicleCount=async()=>{
        await AppService.getChronicleCount(activeGateway?.base_url, activeGateway?.api_key_value, currentUser?.id, route).then((res:AxiosResponse)=>{
            if(res){                
                if(res?.status === 200){ 
                    setItemsCount(res?.data?.count)
                }
            }
        })
    }
    const getChronicle = async() => {
        let queryParams;
        queryParams={'page':currentPage, limit:limit}
        setInProgress(true)
        setelectedRow('')        
        await AppService.getChronicle(activeGateway?.base_url, activeGateway?.api_key_value, currentUser?.id, route, queryParams).then((res:AxiosResponse)=>{
            if(res){                
                if(res?.status === 200){                                         
                    const sortedData= sortByModifiedAt(res?.data);                    
                    if(sortedData && sortedData?.length>0){  
                        setInProgress(false);
                        combineCorelatedData(sortedData)                       
                    }              
                }else{ 
                    setInProgress(false); 
                    setCombinedChronicleData(null)
                }                
                setRefresh(false)              
            }else{setInProgress(false);}
        })
    }    

    const getAlerts = async() => {
        setInProgress(true)
        setelectedRow('')
        await AppService.getAlerts(activeGateway?.base_url, activeGateway?.api_key_value, currentUser?.id, route).then((res:AxiosResponse)=>{
            if(res){                
                if(res?.status === 200){                                         
                    const sortedData= sortByModifiedAt(res?.data);                    
                    if(sortedData && sortedData?.length>0){  
                        setAlertInProgress(false);
                        combineCorelatedData(sortedData, 'alerts')                       
                    }              
                }else{ 
                    setAlertInProgress(false); 
                    setAlertsData(null)
                }                
                setRefresh(false)              
            }
        })
    }    
    const combineCorelatedData=(cronData:any, type:string='')=>{    
        let relationalData:any=[];
        let otherData:any=[];      
        cronData.map((cdata:any)=>{ 
            otherData= [...otherData, cdata]          
            // if(cdata?.metadata.hasOwnProperty('correlation_id')){                 
            //     if(relationalData?.length===0){
            //         relationalData = [...relationalData,{correlation_id: cdata?.metadata?.correlation_id, data: [cdata]}];
            //     }else{
            //         const index = relationalData.findIndex((item:any) => item.correlation_id === cdata?.metadata?.correlation_id);
            //         if (index !== -1) {
            //             relationalData[index].data.push(cdata);
            //         } else {
            //             relationalData.push({
            //                 correlation_id: cdata?.metadata?.correlation_id,
            //                 data: [cdata]
            //             });
            //         }
            //     }             
            // }else{
            //     otherData= [...otherData, cdata]
            // }
        })
        if(type === 'alerts'){
            setAlertsData({
                relationalData:relationalData,
                otherData:otherData
            })
        }
        else{
            setCombinedChronicleData({
                relationalData:relationalData,
                otherData:otherData
            })
        }
    }
    useEffect(()=>{        
        getRoutes();      
    },[]);
    useEffect(()=>{
        getChronicle();  
        getAlerts();
        getChronicleCount();          
          
    },[route, limit, currentPage]);  
    const refreshPage=()=>{
        setRefresh(true);
        getChronicle();
        getAlerts();
    }
    const ReviewStatusUpdate = (item:any) => {
        let status = (item?.review_status === 'unread')?'read':'unread'
        try{
            AppService.updateAlertsData(activeGateway?.base_url, activeGateway?.api_key_value, currentUser?.id, item?.uuid, {review_status:status})
            .then((data:any)=>{
                if(data?.status === 200){
                    successToast('Alerts Status Updated Successfully');
                    getAlerts();
                }
                else{
                    errorToast('Some Error Occurred. Please try again later')
                }
            })
            .catch((e:any)=>{
                console.log(e);
            })
        }
        catch(error){
            console.log(error)
        }        
    }
    const CronicleItemDesc=({item}:{item:any})=>{ 
        const message = {message:item?.message}
        return(<div className="border border-gray-600 p-3 max-w-full my-1"> 
            <p className='flex mb-2 text-xs text-gray-900'>
                <span className='text-black-100 font-semibold min-w-[4.375rem] mr-4'>Date/Time</span>
                <span className={`${styles.fontMenlo}`}>{dateFormatYYYYMMDDhhmm(item?.modified_at)}</span>
            </p>                        
            <p className='flex mb-2 text-xs text-gray-900'>
                <span className='text-black-100 font-semibold min-w-[4.375rem] mr-4'>UUID</span>
                <span className={`${styles.fontMenlo}`}>{item?.uuid}</span>
            </p>
            {item?.metadata?.model_latency!=='0s'&& 
            <p className='flex mb-2 text-xs text-gray-900'>
                <span className='text-black-100 font-semibold min-w-[4.375rem] mr-4'>Model Latency</span>
                <span className={`${styles.fontMenlo}`}>{`${item?.metadata?.model_latency}`}</span>
            </p>}
            <p className='flex mb-2 text-xs text-gray-900'>
                <span className='text-black-100 font-semibold min-w-[4.375rem] mr-4'>Sensitive Data Detected</span>
                <span className={`${styles.fontMenlo}`}>{(item?.metadata?.sensitive_data_detected !== undefined)?`${item?.metadata?.sensitive_data_detected}`:'False'}</span>
            </p>
            <div className='flex mb-2 text-xs text-gray-900'>
                <span className='text-black-100 font-semibold min-w-[4.375rem] mr-4'>Text: </span>
                <span className={`${styles.fontMenlo}`}>
                    <JSONPretty id={`json-pretty-${item?.uuid}`} {...JsonPrettyStyles}  data={JSON.stringify(message, null, 2)} theme={{...JsonPrettyColorCodes}}></JSONPretty>
                    {/* {item?.message && item?.message?.length > 0 && item?.message?.map((i:any, idx:number)=>{return (<React.Fragment key={`message-${idx}`}>{i?.content}</React.Fragment>)})} */}
                </span>
            </div>
        </div>)
    }
    const CollapsibleRow=({item, relatedItems, index, preString, type=""}:{item:any, index:number, preString:string, relatedItems?:any, type?:string})=>{
        if(relatedItems?.length > 0){
            let ascendingData = sortByModifiedAtAsc(relatedItems);
            return(<><tr className={`border-b-1 font-light ${(selectedRow==='row-'+preString+'-'+index && expanded)?'bg-silver-400 text-gray-900':'bg-white text-gray-800'} ${styles.fontMenlo}`} onClick={()=>toggleRowCollapse('row-'+preString+'-'+index)}>                            
                <td>{dateFormatYYYYMMDDhhmm(ascendingData[0]?.modified_at)}</td>
                <td>{item?.metadata?.model_latency && item?.metadata?.model_latency !== '0s'?'Response':'Request'}</td> 
                <td>{item?.route}</td> 
                <td><div className='max-w-full'>{ascendingData[0]?.message && ascendingData[0]?.message?.length > 0?ascendingData[0]?.message[0]?.content.substring(0, 70):''}...</div></td>
                <td>{(item?.metadata?.model)? item?.metadata?.model : ''}</td>                                            
                <td>{(item?.metadata?.provider)?item?.metadata?.provider : (item?.provider)?item?.provider:''}</td>
                {type === 'alerts' &&
                    <td>
                        <ReviewStatusButton status={item?.review_status} click={()=>ReviewStatusUpdate(item)}/>
                    </td>
                }
                <td>{(selectedRow==='row-'+preString+'-'+index && expanded)?<AngleUpIcon />:<AngleDownThin />}</td>  
            </tr> 
            <tr ref={index === 0 ? firstRowRef : null} id={`row-${preString}-${index}`} className={`${(selectedRow==='row-'+preString+'-'+index && expanded)?'':'hidden'}`}>
                <td colSpan={7} className='py-0 px-2'>
                    {relatedItems && relatedItems?.length>0?(<>{sortByModifiedAtAsc(relatedItems).map((reItem:any, idnx:number)=>{
                        return( <React.Fragment key={`re-message-${idnx}`}><CronicleItemDesc item={reItem} /></React.Fragment>)
                    })}</>):(<CronicleItemDesc item={item} />)}
                </td>
            </tr></>)
        }
        else{
        return(<><tr className={`border-b-1 font-light ${(selectedRow==='row-'+preString+'-'+index && expanded)?'bg-silver-400 text-gray-900':'bg-white text-gray-800'} ${styles.fontMenlo}`} onClick={()=>toggleRowCollapse('row-'+preString+'-'+index)}>                            
            <td>{dateFormatYYYYMMDDhhmm(item?.modified_at)}</td>
            <td>{item?.metadata?.model_latency && item?.metadata?.model_latency !== '0s'?'Response':'Request'}</td>
            <td>{item?.route}</td> 
            <td><div className='max-w-full'>{item?.message && item?.message?.length > 0?item?.message[0]?.content.substring(0, 70):''}...</div></td>
            <td>{(item?.metadata?.model)? item?.metadata?.model : ''}</td>                                            
            <td>{(item?.metadata?.provider)?item?.metadata?.provider : (item?.provider)?item?.provider:''}</td>
            {type === 'alerts' &&
                <td>
                    <ReviewStatusButton status={item?.review_status} click={()=>ReviewStatusUpdate(item)}/>
                </td>
            }
            <td>{(selectedRow==='row-'+preString+'-'+index && expanded)?<AngleUpIcon />:<AngleDownThin />}</td>  
        </tr> 
        <tr ref={index === 0 ? firstRowRef : null} id={`row-${preString}-${index}`} className={`${(selectedRow==='row-'+preString+'-'+index && expanded)?'':'hidden'}`}>
            <td colSpan={7} className='py-0 px-2'>
                {relatedItems && relatedItems?.length>0?(<>{sortByModifiedAtAsc(relatedItems).map((reItem:any, idnx:number)=>{
                    return( <React.Fragment key={`re-message-${idnx}`}><CronicleItemDesc item={reItem} /></React.Fragment>)
                })}</>):(<CronicleItemDesc item={item} />)}
            </td>
        </tr></>)
        }
    }
    const paginationProps={
        pageHandler:getChronicle,
        pageLimit: limit,
        setPageLimit:setLimit,
        pageNumber:currentPage,
        setPageNumber:setCurrentPage,
        totalCount: itemsCount,
        showPagination:true,
        showLimitOption:false,
    }
    const tabsData=[
        {
            tabName: 'Archives',
            content: (<>
                <TableComponent headingsData={headingsData} {...paginationProps}>   
                    {inProgress? <tr className={`border-b-1 font-light bg-white text-gray-800`}>
                        <td colSpan={7} className='text-center'><SpinLoader /></td>
                    </tr>:(<>{combinedChronicleData!==null && Object.keys(combinedChronicleData).length>0 ?(<>
                    {combinedChronicleData && combinedChronicleData?.relationalData?.length>0 && <>{combinedChronicleData?.relationalData.map((crdata:any, index:number)=>{
                        return(<React.Fragment key={`coRel-row-${index}`}><CollapsibleRow item={crdata?.data[0]} relatedItems={crdata?.data} index={index} preString='coRel' /></React.Fragment>)})}
                    </>}
                    {combinedChronicleData && combinedChronicleData?.otherData?.length>0 && <>{combinedChronicleData?.otherData.map((data:any, index:number)=>{
                        return(<React.Fragment key={`otherRel-row-${index}`}><CollapsibleRow item={data} index={index} preString='otherRel' /></React.Fragment>)})}</>
                    }</>):(<tr className={`border-b-1 font-light bg-white text-gray-800`}><td colSpan={7} className='text-center'><DataNotFound message='No Chronicle Data Found.' /></td></tr>)}</>)}                                  
                </TableComponent> 
            </>)
        },
        {
            tabName: 'Alerts',
            content: (<TableComponent headingsData={alertsheadingsData}>   
                {alertinProgress? <tr className={`border-b-1 font-light bg-white text-gray-800`}>
                    <td colSpan={7} className='text-center'><SpinLoader /></td>
                </tr>:(<>{alertsData!==null && Object.keys(alertsData).length>0 ?(<>
                {alertsData && alertsData?.relationalData?.length>0 && <>{alertsData?.relationalData.map((crdata:any, index:number)=>{
                    return(<React.Fragment key={`coRel-row-${index}`}><CollapsibleRow item={crdata?.data[0]} relatedItems={crdata?.data} index={index} preString='coRel' type="alerts" /></React.Fragment>)})}
                </>}
                {alertsData && alertsData?.otherData?.length>0 && <>{alertsData?.otherData.map((data:any, index:number)=>{
                    return(<React.Fragment key={`otherRel-row-${index}`}><CollapsibleRow item={data} index={index} preString='otherRel' type="alerts"/></React.Fragment>)})}</>
                }</>):(<tr className={`border-b-1 font-light bg-white text-gray-800`}><td colSpan={7} className='text-center'><DataNotFound message='No Alerts Found.' /></td></tr>)}</>)}
                               
            </TableComponent> )
        }
    ]
    
    return (
        <>
            <div className='flex justify-between items-center flex-wrap mb-2 lg:mb-0'>                
                <PageTitle pageTitle="Chronicle" icon={false} breadcrumbData={breadcrumbs} />
                {currentTab==='Archives'?(<div className='inline-flex items-center justify-end ml-auto'>
                    <RefreshButton  click={refreshPage} btnClass='mr-3' inprogress={refresh} />
                    <div className={`group`}>
                        {/* <label className="label py-[.25rem] pr-[16px] text-[.813rem]">
                            <span className={`text-primary-100 text-xs`}> Select Route </span>
                        </label> */}
                        <div className="tooltip group-hover:tooltip-open tooltip-top w-full text-sm" data-tip="Filter By Route" >
                            <select className={`select select-bordered text-xs text-black-600 placeholder:text-gray-700  placeholder:text-xs border-[#E3DFFD] shadow-inputShadow w-full focus:outline-none lg:min-w-[150px] h-[2.25rem] min-h-[2.25rem]`} 
                                onChange={(e)=>{
                                    setCurrentPage(1)
                                    setRoute(e.target.value)
                                }}
                            >
                                <option className="capitalize text-xs" value="" >Filter By Route</option>				
                                {routeOptions && routeOptions.map((option:any, index:any) => {
                                    return <option className="text-black-600 text-xs" key={index} value={option.name}>{option.name}</option>
                                })}
                                <option className="capitalize text-xs" value="" >show All</option>
                            </select>
                        </div>
                    </div> 
                </div>):(<>
                    <AddButton click={()=>setAlertsData([])} plusShow={false}btnTitle={'Clear Alerts'} />
                </>)}           
            </div>
            <div className='p-2 xs:p-4 md:px-6 md:py-6 border rounded-xl bg-white border-blue-700 h-full min-h-[75vh]'>
                {/* <TableComponent headingsData={headingsData} {...paginationProps} >   
                    {inProgress? <tr className={`border-b-1 font-light bg-white text-gray-800`}>
                        <td colSpan={7} className='text-center'><SpinLoader /></td>
                    </tr>:(<>{combinedChronicleData!==null && Object.keys(combinedChronicleData).length>0 ?(<>
                        {combinedChronicleData && combinedChronicleData?.relationalData?.length>0 && <>{combinedChronicleData?.relationalData.map((crdata:any, index:number)=>{
                            return(<React.Fragment key={`coRel-row-${index}`}><CollapsibleRow item={crdata?.data[0]} relatedItems={crdata?.data} index={index} preString='coRel' /></React.Fragment>)})}
                        </>}
                        {combinedChronicleData && combinedChronicleData?.otherData?.length>0 && <>{combinedChronicleData?.otherData.map((data:any, index:number)=>{
                            return(<React.Fragment key={`otherRel-row-${index}`}><CollapsibleRow item={data} index={index} preString='otherRel' /></React.Fragment>)})}</>
                        }</>):(<tr className={`border-b-1 font-light bg-white text-gray-800`}><td colSpan={7} className='text-center'><DataNotFound message='You haven&#39;t added any archived messages yet.' /></td></tr>)}</>)}                                   
                </TableComponent>   */}
                <TabsComponent tabsData={tabsData} currentTab={currentTab} />
            </div>
        </>
    );
}
export default Chronicle