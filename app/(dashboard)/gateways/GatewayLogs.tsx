//'use client';
import React, { useEffect, useState } from 'react'
import styles from "../../styles/styles.module.scss"
import TableComponent from '@/app/components/table/TableComponent'
import { dateFormatYYYYMMDDhhmm, sortByTimeStamp } from '@/app/helper/sortArray'
import { providerImage } from '@/app/components/data/gatwayData';
import DataNotFound from '@/app/components/messages/DataNotFound';
import SpinLoader from '@/app/components/loaders/SpinLoader';
import AppService from '@/app/services/AppService';
import { AxiosResponse } from 'axios'
type gatewayLogProps={
  refreshLogs:boolean;
  currentTab:string;
  setRefreshLogs: (val:any)=>void;
  activeGateway:any;
  currentUser:any;
}

const GatewayLogs:React.FC<gatewayLogProps> = ({refreshLogs, currentTab, setRefreshLogs, activeGateway, currentUser}) => {
  const [logsData, setLogsData] = useState<[]>([])
  const [inProgress, setInProgress] = useState<boolean>(false);
  const headingsData=[
    { name:'Date'}, { name:'Status'}, { name:'Route'}, { name:'Endpoint'}, { name:'Model'}, { name:'Provider'}
  ];
  const [limit, setLimit] = useState<number>(10); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsCount, setItemsCount] = useState<number>(); 

  // let namespace = "javelindev" 
  // const getLogs = async() => {    
  //   fetch('/api/getGatewayLogs?namespace='+activeGateway?.namespace)
  //   .then(response => response.json())
  //   .then(data => {      
  //     if(data?.status === 200){
  //       setLogsData(sortByTimeStamp(data?.data))
  //     }
  //     setRefreshLogs(false);
  //     setInProgress(false);
  //   })
  //   .catch(error => {
  //     console.error("Error fetching data:", error);
  //     setInProgress(false);
  //   });
  // }
  const getLogCount=async()=>{
    await AppService.getLogCount(activeGateway?.base_url, activeGateway?.api_key_value, currentUser?.id).then((res:AxiosResponse)=>{
        if(res){                
            if(res?.status === 200){ 
              setItemsCount(res?.data?.count)
            }
        }
    })
}
  const getGatewayLogsData = async()=>{
    let queryParams;
        queryParams={'page':currentPage, limit:limit}
        setInProgress(true)
    await AppService.getLogs(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id,queryParams).then((res:AxiosResponse)=>{
      if(res){       
        
        if(res?.status === 200){ 
          // setLogsData(sortByTimeStamp(res?.data))                
          setLogsData(res?.data)                
        } 
        setRefreshLogs(false);
        setInProgress(false);
      }
    }).catch(error => {
      console.error("Error fetching data:", error);
      setInProgress(false);
    });
  }
  useEffect(()=>{
    if(logsData && logsData?.length===0 && currentTab==='Logs'){
      setInProgress(true)
      getGatewayLogsData()
    }
    
  }, [currentTab]);  
  useEffect(()=>{
    getLogCount();
  },[]); 
  useEffect(()=>{
    if(refreshLogs===true){
      getGatewayLogsData()
    }
  },[refreshLogs]); 
  const paginationProps={
    pageHandler:getGatewayLogsData,
    pageLimit: limit,
    setPageLimit:setLimit,
    pageNumber:currentPage,
    setPageNumber:setCurrentPage,
    totalCount: itemsCount,
    showPagination:true,
    showLimitOption:false,
}
  return (
    <>
      <TableComponent headingsData={headingsData}  {...paginationProps}>
        {!inProgress && logsData && logsData?.length > 0 ? logsData?.map((item:any, index)=>{
          let pImage = providerImage(item?.provider);           
          return(
            <tr key={`row-${index}`} className={`text-gray-800 ${styles.fontMenlo}`}>
              <td>{dateFormatYYYYMMDDhhmm(item?.timestamp)}</td>
              <td>{item?.response?item?.response:item?.method?item?.method:''}</td>            
              <td>{item?.route}</td> 
              <td>{item?.url}</td>           
              <td>{item?.model}</td>
              <td>
                {pImage!== undefined && pImage!==''?<div className='max-w-[5.5rem]'>
                  <img src={pImage} alt={item?.provider} className='w-full h-auto object-cover' />
                </div>:item?.provider}
              </td>
            </tr>  
          )}
        ):<>
        <tr className='border-b-0'><td colSpan={6}>
          {inProgress? <div className='mt-5'><SpinLoader /></div> :<DataNotFound message='Logs data not found on this gateway.' />}
          </td></tr>
        </>}
      </TableComponent>
    </>
  )
}
export default GatewayLogs