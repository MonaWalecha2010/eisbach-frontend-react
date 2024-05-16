'use client';
import React, {useEffect, useState} from 'react'
import { AxiosResponse } from 'axios';
import PageTitle from '@/app/components/PageTitle'
import AppService from '@/app/services/AppService';
import { useAppSelector } from '@/app/store/hooks';
import { getGateway, getUser } from '@/app/store/reducers/gateway.selector';
import RouteBytes from './RouteBytes';
import SpinLoader from '@/app/components/loaders/SpinLoader';
import RefreshButton from '@/app/components/buttons/RefreshButton';
import styles from '../../styles/styles.module.scss'
const Usage = () => {
    const activeGateway = useAppSelector(getGateway);
    const currentUser = useAppSelector(getUser)
    const breadcrumbs=[
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Usage',
            link: '/usage'
        }
    ];
  
    const [routeBytes, setRouteBytes] = useState<any>([]) 
    const [totalLlmQueries, setTotalLlmQueries] = useState<number>(0)  
    const [transferVal, setTransferVal] = useState<number>(0)
    const [transferSize, setTransferSize] = useState<string>('Bytes')
    const [refreshData, setRefreshData] = useState<boolean>(true)
    const [progress, setProgress] = useState({
        rbytes : false,
        cbytes : false,            
    }) 
    const getMetricsData=async()=>{        
        // add null for the start and end values for analytics 
        await AppService.getAnalytics(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id ,null,null).then((res:AxiosResponse)=>{
            if(res){                
                if(res?.status === 200){
                    filterTotalLlmQueries(res?.data?.data) 
                    filterCustomerBytesData(res?.data?.data);
                    filterRouteBytesData(res?.data?.data); 
                    setProgress({rbytes:false, cbytes:false});            
                } else{
                    setProgress({rbytes:false, cbytes:false});
                }               
            }
        });        
    }
    const filterTotalLlmQueries=(jsonData:any)=>{        
        const data = jsonData?.result.filter((entry:any) => entry?.metric?.__name__==="llm_queries_total");
        let totalLLMCount=0;
        if(data && data?.length>0){     
            totalLLMCount = data[0]?.values.reduce((acc:any, curr:any) => acc[0] > curr[0]? acc[1] : curr[1] );
        }
        setTotalLlmQueries(totalLLMCount);
    }
    const filterCustomerBytesData=(jsonData:any)=>{    
        let value:any;
        let size='';         
        const data = jsonData?.result.filter((entry:any) => entry?.metric?.__name__==="bytes_transferred_by_customer");         
        if(data && data?.length>0){
            //value = data[0]?.values.reduce((acc:any, curr:any) => acc + parseInt(curr[1], 10), 0)  
            value = data[0]?.values.reduce((acc:any, curr:any) => acc[0] > curr[0]? acc[1] : curr[1] );          
            switch (true) {
                case value < 1024:
                    size = "Bytes";
                    break;
                case value < 1024 * 1024:
                    size = "Kilobytes";
                    value /= 1024;
                    break;
                case value < 1024 * 1024 * 1024:
                    size = "Megabytes";
                    value /= (1024 * 1024);
                    break;
                default:
                    size = "Gigabytes";
                    value /= (1024 * 1024 * 1024);
                    break;
            }
            setTransferVal(value);
            setTransferSize(size);
            setProgress({...progress, cbytes:false});
        }
        setProgress({...progress, cbytes:false});
    }
    const filterRouteBytesData=(jsonData:any)=>{
        const data = jsonData?.result.filter((entry:any) => entry?.metric?.__name__==="bytes_transferred_by_route");        
        setRouteBytes(data)
        setProgress({...progress, rbytes:false})       
    }
    useEffect(()=>{
        setProgress({rbytes:true, cbytes:true});
        getMetricsData()
    },[refreshData])    
    return (<>
        <div className='flex justify-between items-center'>
            <PageTitle pageTitle="Usage" icon={false} breadcrumbData={breadcrumbs} />   
            <RefreshButton  click={()=>setRefreshData(!refreshData)} btnClass='mt-[1.675rem] mr-3' inprogress={false} />               
        </div>
        <div className='p-4 md:px-6 md:py-6 border rounded-xl bg-white border-blue-700 h-full min-h-[82vh]'>
            {progress?.cbytes || progress?.rbytes  ?<SpinLoader/> :<>
            {/* <h2 className='text-md font-bold mb-3 text-black-100'> Bytes Transfered</h2> */}
            <div className='flex flex-wrap items-start gap-3 w-full'>
                <div className={`border border-blue-700 bg-white rounded-lg shadow-lg min-w-full sm:min-w-[17rem] py-4 mb-5 h-[10rem] text-center inline-flex flex-col ${styles.fontMenlo}`}>
                    <div className='border-b border-blue-700 px-3'>
                        <h3 className={`text-sm text-black-100 font-semibold mt-2 mb-5`}>Total LLM Queries</h3> 
                    </div>                                   
                    <div className='text-primary-100 text-sm font-semibold flex-1 flex items-center justify-center px-4'>
                        <div>
                            <span className='text-[1.25rem]'>{totalLlmQueries} </span>
                            <span> Queries</span>
                        </div>
                    </div>               
                </div>
                <div className={`border border-blue-700 bg-white rounded-lg shadow-lg min-w-full sm:min-w-[17rem] py-4 mb-5 h-[10rem] text-center inline-flex flex-col ${styles.fontMenlo}`}>
                    <div className='border-b border-blue-700 px-3'>
                        <h3 className={`text-sm text-black-100 font-semibold mt-2 mb-5`}>Bytes Transfered</h3> 
                    </div>                                   
                    <div className='text-primary-100 text-sm font-semibold flex-1 flex items-center justify-center px-4'>
                        <div>
                            <span className='text-[1.25rem]'>{transferVal} </span>
                            <span> {transferSize}</span>
                        </div>
                    </div>               
                </div>
            </div>
            <div className='bg-white rounded-lg shadow-lg px-4 py-4 mb-5 '> 
                <div><RouteBytes data={routeBytes}/> </div>
            </div> </>}                              
        </div>

    </>)
}

export default Usage