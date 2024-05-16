'use client';
import React, { useEffect, useState } from 'react'
import TabsComponent from '@/app/components/TabsComponent';
import { useParams } from 'next/navigation'
import { AxiosResponse } from 'axios';
import moment from 'moment-timezone';
import { sortAlphabeticallyAsce, awsTextToJson } from '@/app/helper/sortArray';
import PageTitle from '@/app/components/PageTitle'
import SpinLoader from '@/app/components/loaders/SpinLoader';
import PlainTextMsg from '@/app/components/messages/PlainTextMsg';
import DataNotFound from '@/app/components/messages/DataNotFound';
import BarChart from '@/app/components/charts/BarChart'
import PieChart from '@/app/components/charts/PieChart';
import { useForm} from "react-hook-form"
import FormDropdown from '@/app/components/forms-components/FromDropdown'
import AppService from '@/app/services/AppService';
import { getProvidersService } from '@/app/services/ProviderServices';
import { convertToJSON} from '@/app/helper/sortArray';
import { getRandomColor } from '@/app/helper/chartHelper';
import { useAppSelector } from '@/app/store/hooks';
import { getGateway, getUser } from '@/app/store/reducers/gateway.selector';
import { AnyARecord } from 'dns';
import RefreshButton from '@/app/components/buttons/RefreshButton';
import { removeSlashTwenty } from '@/app/helper/UrlHelper'
import styles from '../../../../styles/styles.module.scss'
import LLMRoutes from './LLMRoutes';
import TopFiveRouteErrors from './TopFiveRouteErrors';
import UnknownRouteErrors from './UnknownRouteErrors';
import RouteQueryLatency from './RouteQueryLatency';
import RouteQThrottled from './RouteQThrottled';
import LLMProviders from './LLMProviders';
import LlmMostUsedProviders from './LlmMostUsedProviders';
import LlmMostUsedModelProviders from './LlmMostUsedModelProviders';
import UnknownProviders from './UnknownProviders';

const Analytics = () => {
    const activeGateway = useAppSelector(getGateway);
    const currentUser = useAppSelector(getUser)
    const params = useParams();
    const currentNamespace = removeSlashTwenty(params.slug); 
    const breadcrumbs=[
        { name: 'Home', link: '/'},
        { name: 'Gateways', link: '/gateways'},
        { name: currentNamespace, link: '/gateways/'+currentNamespace},
        { name: 'Analytics', link: '/gateways/'+currentNamespace+'/analytics'}
    ];  

    const [metricsData, setMetricsData] = useState<{}>(); 
    // const [sysMetricsData, setSysMetricsData] = useState<{}>(); 
    const [gatewayRoutes, setGatewayRoutes]=useState<[]>(); 
    const [selectedRoute, setSelectedRoute]=useState<string>(''); 
    const barChartOptions = (xAxis:string, yAxis:string, otherOpt?:AnyARecord) => {        
        return({
            options:{
                responsive: true,
                maintainAspectRatio: false,                
                scales: {
                    x: {
                        title:{
                            display: true,
                            text: xAxis,
                            align: 'center',
                            font: {
                                size: 14,
                                weight: 600,                        
                            },
                            color: "#000" ,                    
                        },               
                        grid: {
                            display: false,
                        },
                        stacked:true
                    },
                    y: {                          
                        ticks: {
                            beginatzero: true,
                            stepSize: 5,
                            mirror:true
                        },                                                           
                        title:{
                            display: true,
                            text: yAxis,
                            align: 'center',
                            font: {
                                size: 14,
                                weight: 600,                        
                            },
                            color: "#000" ,                    
                        },                              
                        grid: {
                            display: false
                        },                                                
                    }, 
                },
                ...otherOpt,            
            },            
        })
    } 
    const [llmRoutes, setLlmRoutes] = useState<any>([]) 
    const [topFiveRErrors, setTopFiveRErrors] = useState<any>([]) 
    const [unknownRErrors, setUnknownRErrors] = useState<any>([]) 
    const [routeQL, setRouteQL] = useState<any>([]) 
    const [routeQTh, setRouteQTh] = useState<any>([]) 
    const [llmProviders, setLlmProviders] = useState<any>([]) 
    const [mostUsedProviders, setMostUsedProviders] = useState<any>([])
    const [mostUsedModels, setMostUsedModels] = useState<any>([])
    const [unknownProviders, setUnknownProviders] = useState<any>([])
    const [selectedRange, setSelectedRange] = useState<number>(30)
    
    const {register, control, handleSubmit, reset, formState } = useForm();
    const TimerangeOptions= [{displayValue:'24 Hours ',value:1 },{displayValue:'7 Days',value:7 },
                            {displayValue:'1 Month',value:30},{displayValue:'3 Months',value:90}]
    const [llmUnownProviders, setUnownProviders] = useState({
        labels: [],
        datasets: [{}],   
        options: barChartOptions('Providers', 'Errors'),
    })    
    const [inprogress, setInprogress] = useState<boolean>(false);
    // const [providersList, setProvidersList]=useState<[]>();       
    const getRoutes=async()=>{
        await AppService.getRoutes(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id).then((res:AxiosResponse)=>{
            if(res){
                if(res?.status === 200){                   
                    const sortData = sortAlphabeticallyAsce(res.data) as [];                     
                    setGatewayRoutes(sortData.slice(0, 10) as []);
                }                
            }
        })
    } 
    // const getProviders=async()=>{
    //     t
    //       getProvidersService(activeGateway?.base_url , activeGateway?.api_key_value).
    //       then((res:AxiosResponse) => {
    //         if(res?.status === 200){                   
    //             const sortData = sortAlphabeticallyAsce(res.data) as []; 
    //             setProvidersList(sortData);                    
    //         }   
    //       })
    //     }
    //     catch(error){
    //       console.log(error)
    //     }
    // }   
    const [progress, setProgress] = useState({
        llmRoute : false,
        llmRouteError : false,
        llmUnknownError:false,
        llmProvider : false, 
        llmUnknownProvider: false, 
        lmProvidersByModel: false,     
    }) 
    const getMetricsData=async()=>{
        //calulate time 
            const timeZone =  Intl.DateTimeFormat().resolvedOptions().timeZone;
            const now = moment.utc().tz(timeZone);            
            const previous = now.clone().subtract(selectedRange, 'days');      
           
            let currentDay = now?.utc().format()            
            let previousDays = previous.utc().format()
            setInprogress(true)
        //**************** */
        await AppService.getAnalytics(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id,previousDays,currentDay).then((res:AxiosResponse)=>{
            if(res){                
                if(res?.status === 200){ 
                    // const data = awsTextToJson(res?.data);
                    // console.log(res?.data?.data)
                    setMetricsData(res?.data?.data);                       
                    filterLlmRouteData(res?.data?.data);
                    filterLlmRouteErros(res?.data?.data);
                    setInprogress(false);
                    //filterUnknownErros(res?.data?.data);                    
                    filterLlmProviderData(res?.data?.data); 
                    filterLlmUnownProviderData(res?.data?.data);
                    filterLlmProvidersByModel(res?.data?.data);
                } else{
                    setInprogress(false);
                }               
            }
        })        
    }
   
    const filterLlmRouteData=(jsonData:any)=>{        
        const data = jsonData?.result.filter((entry:any) => entry?.metric?.__name__==="llm_queries_by_route");  
        setLlmRoutes(data)
        setProgress({...progress, llmRoute:false})      
    }    
    const filterLlmRouteErros=(jsonData:any)=>{
        const data = jsonData?.result.filter((entry:any) => entry?.metric?.__name__==="server_error_count");  
        setTopFiveRErrors(data) 
        setProgress({...progress, llmRouteError:false})       
    }
    const filterUnknownErros=(jsonData:any)=>{        
        const data = jsonData?.result.filter((entry:any) => entry?.metric?.__name__==="server_error_count");
        const reducedData= combineAndSumData(data, "server_error_count", "route");  
        setUnknownRErrors(reducedData)        
        setProgress({...progress, llmUnknownError:false}) 
    }
    const sortedLeData=(data:any)=>{
        return data.sort((a:any, b:any) => {
            const leA = a.metric.le === "+Inf" ? Infinity : parseFloat(a.metric.le);
            const leB = b.metric.le === "+Inf" ? Infinity : parseFloat(b.metric.le);        
            return leA - leB;
        });        
    }    
    const filterRouteQLatency=(jsonData:any, routeVal:any)=>{ 
        const data = jsonData?.result.filter((item:any) =>item?.metric?.__name__==='llm_route_latency_milliseconds_bucket' && item?.metric?.route === routeVal);        
        let sortedData;
        let filteredData;
        if(data && data?.length>0){
            sortedData = sortedLeData(data) as any;
            if(sortedData){
                filteredData = sortedData.filter((item:any)=>item?.metric?.le!=="+Inf");
                setRouteQL(filteredData) 
            }            
        } 
    }
    const filterRouteQThrottled=(jsonData:any, routeVal:any)=>{
        const data = jsonData?.result.filter((item:any) =>
            item?.metric?.__name__==="server_error_count" && item?.metric?.error_type === "rate limit enforced" && item?.metric?.route=== routeVal
        ); 
        setRouteQTh(data); 
    } 
    const filterLlmProviderData=(jsonData:any)=>{
        const data = jsonData?.result.filter((item:any) =>item?.metric?.__name__==='llm_queries_by_provider');  
        setLlmProviders(data)
        setMostUsedProviders(data)  
        setProgress({...progress, llmProvider:false}) 
    }
    const filterLlmUnownProviderData=(jsonData:any)=>{      
        const data = jsonData?.result.filter((item:any) =>item?.metric?.__name__==='llm_unknown_provider_count'); 
        setUnknownProviders(data)
        setUnownProviders({
            ...llmUnownProviders,
            labels: data.map((d:any) => d?.metric?.provider) as [],
            datasets: [
                {
                    label: 'Providers',
                    data: data.map((d:any) => d?.values[0][1]) as [],
                    backgroundColor: ['#449cf1', '#7ad67a', '#9B9B9B'],
                    barPercentage: .125,
                },   
            ],
        }) 
        setProgress({...progress, llmUnknownProvider:false})        
    }
    const filterLlmProvidersByModel=(jsonData:any)=>{
        // const data = jsonData.filter((entry:any) => {
        //     return Object.keys(entry).includes('llm_queries_by_model');
        // });
        const data = jsonData?.result.filter((item:any) =>item?.metric?.__name__==='llm_queries_by_model');
        console.log(data);
        setMostUsedModels(data)        
        setProgress({...progress, lmProvidersByModel:false})                 
    }
    const combineAndSumData = (data:any, firstKey:string, secondKey:string) => {
        const routeToData:any = {};
        data.forEach((item:any) => {
            const key = item[firstKey][secondKey];
            if (routeToData[key]) {
                routeToData[key][firstKey].val += item[firstKey].val;
            } else {
                routeToData[key] = { ...item };
            }
        });
        return Object.values(routeToData);
    };      

    const handleRouteChange=(value:string)=>{  
        resetDataOnChange();     
        setSelectedRoute(value)
        if(metricsData){           
            filterRouteQLatency(metricsData, value );
            filterRouteQThrottled(metricsData, value);
        }
    }  
    
    useEffect(()=>{
        getRoutes();
        getMetricsData();  
    },[]);
    useEffect(()=>{
        getMetricsData();
    },[selectedRange]);

    const resetDataOnChange=()=>{
        setRouteQL([]);
        setRouteQTh([])
        //setRouteQLatency({ ...routeQLatency, labels: [], datasets: [{}]}) 
        //setRouteQThrottled({ ...routeQThrottled, labels: [], datasets: [{}]}) 
    }
    const refreshData=()=>{
        setInprogress(true)
        setProgress({
            llmRoute : true,
            llmRouteError : true,
            llmUnknownError:true,
            llmProvider : true, 
            llmUnknownProvider: true, 
            lmProvidersByModel: true, 
        })        
        getMetricsData();
    }
    useEffect(()=>{
        if(progress?.llmRoute && progress?.llmRouteError && progress?.llmUnknownError && progress?.llmProvider && progress?.llmUnknownProvider && progress?.lmProvidersByModel){
            setInprogress(true)
        }else{
            setInprogress(false)
        }
    },[progress])
    const tabsData=[
        {
            tabName: 'Route Metrics',
            content: (<>
                <div className='bg-white rounded-lg shadow-lg px-4 py-4 mb-5'>
                    <h2 className='text-md font-bold mb-3 text-black-100'> Routes Used</h2>
                    <LLMRoutes data={llmRoutes}/>                                      
                </div>
                <div className='bg-white rounded-lg shadow-lg px-4 py-4 mt-3 mb-5'>
                    <h2 className='text-md font-bold mb-3 text-black-100'> Route Errors </h2>
                    <div className="grid auto-cols-max grid-cols-1 sm:grid-cols-2 gap-2" >                       
                        <div> <TopFiveRouteErrors data={topFiveRErrors} /></div>                        
                        <div><UnknownRouteErrors data={unknownRErrors} /></div>
                    </div>
                </div>
                <div className='bg-white rounded-lg shadow-lg px-4 py-4 mt-3 mb-5'>
                    <h2 className='text-md font-bold mb-3 text-black-100'> Routes Used </h2>
                    <div className="grid auto-cols-max grid-cols-1 sm:grid-cols-2 gap-2" >
                        <div><LlmMostUsedModelProviders data={mostUsedModels} /></div>                        
                    </div>
                </div>
                <div className='bg-white rounded-lg shadow-lg px-4 py-4 mt-3 mb-5 min-h-[400px]'>
                    <select className="select border-0 rounded-none select-bordered select-md w-full max-w-full bg-silver-300 text-black-100 focus:outline-none text-semibold" defaultValue={selectedRoute!==''?selectedRoute:"Select The Route"} onChange={(e:any)=>{handleRouteChange(e?.target?.value)}}>
                        <option disabled >Select The Route</option>
                        {gatewayRoutes && gatewayRoutes.map((data:any, index:number)=>(
                            <option key={`g-route-${index}`} value={data?.name} >{data?.name}</option>
                        ))}                            
                    </select>
                    {/* <h2 className='text-md font-bold mb-3 text-black-100'> Route Latency </h2> */}
                    <div className="grid auto-cols-max grid-cols-1 sm:grid-cols-2 gap-2 mt-4" >                        
                        {selectedRoute!==undefined && selectedRoute!=='' ?(<>                        
                            {routeQL?.length>0 && <>
                                <div className='mt-3'>  
                                    <RouteQueryLatency data={routeQL} />
                                </div> 
                            </>}
                            {routeQTh?.length>0 && <>
                                <div className='mt-3'>  
                                    <RouteQThrottled data={routeQTh} /> 
                                </div>
                            </>}
                            {routeQL?.length===0 && routeQTh?.length===0 && <div className="col-span-2 mt-3"><DataNotFound message='No Data found for the selected route.' /></div>}
                        </>):<div className="col-span-2 mt-2"><PlainTextMsg message='Please select the route' /></div>}
                    </div>
                </div>
            </>)
        },
        {
            tabName: 'Provider Metrics',
            content: (<>  
                <div className='bg-white rounded-lg shadow-lg px-4 py-4 mb-5'>
                    <h2 className='text-md font-bold mb-3 text-black-100'> Queries</h2>   
                    <LLMProviders data={llmProviders}/>
                </div>
                <div className='bg-white rounded-lg shadow-lg px-4 py-4 mt-2 mb-5'>
                    <h2 className='text-md font-bold mb-3 text-black-100'> Errors </h2>
                    <div className="grid auto-cols-max grid-cols-1 sm:grid-cols-2 gap-3" >                        
                        <div><LlmMostUsedProviders data={mostUsedProviders} /></div>                    
                        <div><UnknownProviders data={unknownProviders} /> </div> 
                        {/* <div><LlmMostUsedModelProviders data={mostUsedModels} /></div> */}
                    </div>
                </div>                
                
            </>)
        }       
    ];   
    return (
        <>
            <div className='flex justify-between items-center flex-wrap mb-2 lg:mb-0'>
                <div>
                <PageTitle pageTitle="Analytics" icon={false} breadcrumbData={breadcrumbs} />
                </div>
                <div className='flex '> 
                <div className='mr-2'>

                    { inprogress && <SpinLoader />}
                </div>
                 <FormDropdown 
                        name='dataSource'     
                        label=""
                        register={register}   
                        //labelDesc='Select provider value'                  
                        placeholder="Select Time Range"          
                        options={TimerangeOptions} 
                        handleChange={(e:any)=>{setSelectedRange(e.target.value)}} 
                        value={selectedRange}
                        wrapperClass={`flex flex-row pt-[.5rem] pb-[.5rem] ${styles.border_b_lite}`}
                        inputClassName='max-w-sm mr-auto'
                        labelWrapperClass='xs:min-w-[30%] md:min-w-[30%]' 
                    />     
                    <div className='m-auto'>
                         <RefreshButton  click={refreshData} btnClass='mr-3' inprogress={inprogress} /> 
                    </div>
                 </div>

            </div>
            <div className='px-6 py-6 border rounded-xl bg-white border-blue-700 h-full'>
                <TabsComponent tabsData={tabsData} />
            </div>
        </>
    );
}
export default Analytics