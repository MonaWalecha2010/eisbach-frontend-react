'use client';
import React, { useEffect, useState } from 'react'
import TabsComponent from '@/app/components/TabsComponent';
import { useParams } from 'next/navigation'
import { AxiosResponse } from 'axios';
import { sortAlphabeticallyAsce, awsTextToJson } from '@/app/helper/sortArray';
import PageTitle from '@/app/components/PageTitle'
import PlainTextMsg from '@/app/components/messages/PlainTextMsg';
import DataNotFound from '@/app/components/messages/DataNotFound';
import BarChart from '@/app/components/charts/BarChart'
import PieChart from '@/app/components/charts/PieChart';
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
import RouteQueryLatency from './RouteQueryLatency';
import LLMProviders from './LLMProviders';
import LlmMostUsedProviders from './LlmMostUsedProviders';
import LlmMostUsedModelProviders from './LlmMostUsedModelProviders';
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
    const [routeQL, setRouteQL] = useState<any>([]) 
    const [llmProviders, setLlmProviders] = useState<any>([]) 
    const [mostUsedProviders, setMostUsedProviders] = useState<any>([])
    const [mostUsedModels, setMostUsedModels] = useState<any>([])
    const [llmRouteData, setLlmRouteData] = useState({
        labels: [],
        datasets: [{}],        
        options: barChartOptions('Routes', 'Queries'),
        totalCount:0
    }); 
    const [topFiveRouteErorr, setTopFiveRouteErorr]  = useState({
        labels: [],
        datasets: [{}],
        options: barChartOptions('Routes', 'Errors')          
    }) 
    const [unknownRouteErorr, setUnknownRouteErorr]  = useState({
        labels: [],
        datasets: [{}],
        options: barChartOptions('Routes', 'Errors')          
    }) 
    const [routeQLatency, setRouteQLatency]  = useState({
        labels: [],
        datasets: [{}],
        options: barChartOptions('Routes', 'Errors')          
    }) 
    const [routeQThrottled , setRouteQThrottled ]  = useState({
        labels: [],
        datasets: [{}]
    })     
    const [llmProviderData, setLlmProviderData] = useState<any>({
        labels: [],
        datasets: [{}],        
        options: barChartOptions('Providers', 'Queries'),
        totalCount:0
    })
    const [llmMostUsedProviders, setLlmMostUsedProviders] = useState<any>({
        labels: [],
        datasets: [{}],        
    })
    const [llmUnownProviders, setUnownProviders] = useState({
        labels: [],
        datasets: [{}],   
        options: barChartOptions('Providers', 'Errors'),
    })
    const [mostUsedModelProviders, setMostUsedModelProviders] = useState<any>({
        labels: [],
        datasets: [{}],        
    })
    const [inprogress, setInprogress] = useState<boolean>(false);
    // const [providersList, setProvidersList]=useState<[]>();       
    const getRoutes=async()=>{
        await AppService.getRoutes(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.primaryEmailAddress?.emailAddress).then((res:AxiosResponse)=>{
            if(res){
                if(res?.status === 200){                   
                    const sortData = sortAlphabeticallyAsce(res.data) as [];                     
                    setGatewayRoutes(sortData.slice(0, 10) as []);
                    // setLlmRouteData({
                    //     ...llmRouteData,
                    //     labels: sortData.slice(0, 10).map((route:any) => route.name) as [],
                    // })                                    
                }                
            }
        })
    } 
    // const getProviders=async()=>{
    //     try{
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
        await AppService.getAnalytics(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.primaryEmailAddress?.emailAddress,'','').then((res:AxiosResponse)=>{
            if(res){                
                if(res?.status === 200){ 
                    // const data = awsTextToJson(res?.data);
                    setMetricsData(res?.data?.data);                       
                    filterLlmRouteData(res?.data?.data);
                    //filterLlmRouteErros(res?.data?.data);
                    //filterUnknownErros(res?.data?.data);                    
                    filterLlmProviderData(res?.data?.data); 
                    filterLlmUnownProviderData(res?.data?.data);
                    filterLlmProvidersByModel(res?.data?.data);
                } else{
                    setInprogress(false);
                }               
            }
        });
        
    }
   
    const filterLlmRouteData=(jsonData:any)=>{        
        const data = jsonData?.result.filter((entry:any) => entry?.metric?.__name__==="llm_queries_by_route"); 
        console.log('data',data)
        setLlmRoutes(data)
        const totalValCount = data.reduce((total:any, item:any) => total + parseInt(item.value[1], 10), 0);       
        setLlmRouteData({
            ...llmRouteData,            
            labels: data.map((d:any) => d?.metric?.route) as [],
            datasets: [
                {
                    label: 'Queries',
                    data: data.map((d:any) => d?.value[1]) as [],
                    backgroundColor: ['#449cf1', '#7ad67a', '#9B9B9B'],
                    barPercentage: .35,
                },   
            ],            
            totalCount: totalValCount
        })  
        setProgress({...progress, llmRoute:false})      
    }    
    const filterLlmRouteErros=(jsonData:any)=>{
        const data = jsonData?.result.filter((entry:any) => entry?.metric?.__name__==="server_error_count");           
        const optionData:any = {
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {                            
                            label: function(tooltipItem:any, data:any) {                             
                                return tooltipItem.value;
                            },                            
                        }
                    }
                }
            },            
        };       
        
        setTopFiveRouteErorr({
            ...topFiveRouteErorr,
            labels: data.map((d:any) => d?.metric?.route) as [],            
            datasets: [
                {
                    label: 'Errors',
                    data: data.map((d:any) => d?.value[1]) as [],
                    backgroundColor: ['#449cf1', '#9B9B9B', '#D9D9D9', '#e83c3a', '#000000', '#7ad67a'],
                    barPercentage: .35,
                },                   
            ],
            options: optionData,
                         
        }); 
        setProgress({...progress, llmRouteError:false})       
    }
    const filterUnknownErros=(jsonData:any)=>{        
        const data = jsonData?.result.filter((entry:any) => entry?.metric?.__name__==="server_error_count");
        const reducedData= combineAndSumData(data, "server_error_count", "route");  
        setUnknownRouteErorr({
            ...unknownRouteErorr,
            labels: reducedData.map((d:any) => d?.metric?.route) as [],
            datasets: [
                {
                    label: 'Errors',
                    data: reducedData.map((d:any) => d?.value[1]) as [],
                    backgroundColor: ['#449cf1', '#9B9B9B', '#D9D9D9', '#e83c3a', '#7ad67a'],
                    borderWidth: .2,
                },   
            ],
        });
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
        const sortedData = sortedLeData(data) as any;
        setRouteQL(sortedData)       
        if(sortedData && sortedData?.length>0){
            setRouteQLatency({
                ...routeQLatency,
                labels: sortedData.map((d:any) => d?.metric?.le) as [],
                datasets: [
                    {
                        label: 'Latency',                        
                        data: sortedData.map((d:any) => d?.value[1]) as [],
                        backgroundColor: getRandomColor(data?.length),
                        // barPercentage: .5,
                    },   
                ],
            }); 
        }      
    }
    const filterRouteQThrottled=(jsonData:any, routeVal:any)=>{
        const data = jsonData?.result.filter((item:any) =>
            item?.metric?.__name__==="server_error_count" && item?.metric?.error_type === "rate limit enforced" && item?.metric?.route=== routeVal
        );  
        // console.log(data) 
        if(data && data?.length>0){
            setRouteQThrottled({
                ...routeQThrottled,
                labels: data.map((d:any) => d?.metric?.route) as [],
                datasets: [
                    {
                        label: 'rate limit enforced',
                        data: data.map((d:any) => d?.value[1]) as [],
                        backgroundColor: ['#449cf1', '#9B9B9B', '#D9D9D9', '#e83c3a', '#000000', '#7ad67a'],
                        borderWidth: .2,
                    },   
                ],
            }); 
        }   
              
    } 
    const filterLlmProviderData=(jsonData:any)=>{
        const data = jsonData?.result.filter((item:any) =>item?.metric?.__name__==='llm_queries_by_provider');  
        setLlmProviders(data)
        setMostUsedProviders(data)
        // const data = jsonData.filter((entry:any) => {
        //     return Object.keys(entry).includes('llm_queries_by_provider');
        // });
        //const totalValCount = data.reduce((total:any, item:any) => total + item.llm_queries_by_provider.val, 0);       
   
        const totalValCount = data.reduce((total:any, item:any) => total + parseInt(item.value[1], 10), 0);
        setLlmProviderData({
            ...llmProviderData,
            labels: data.map((d:any) => d?.metric?.provider) as [],
            datasets: [
                {
                    label: 'Queries',
                    data: data.map((d:any) => d?.value[1]) as [],
                    backgroundColor: ['#449cf1', '#7ad67a', '#9B9B9B'],
                    barPercentage: .25,
                },   
            ],
            totalCount:totalValCount
        })    
        setLlmMostUsedProviders({
            ...llmMostUsedProviders,
            labels: data.map((d:any) => d?.metric?.provider) as [],
            datasets: [
                {
                    label: 'Providers',
                    data: data.map((d:any) => d?.value[1]) as [],
                    borderColor: '#D9D9D9',
                    backgroundColor: ['#449cf1', '#7ad67a', '#9B9B9B'],
                    lineTension: 0.25,
                },   
            ],
        })  
        setProgress({...progress, llmProvider:false}) 
    }
    const filterLlmUnownProviderData=(jsonData:any)=>{
        // const data = jsonData.filter((entry:any) => {
        //     return Object.keys(entry).includes('llm_unknown_provider_count');
        // });
        const data = jsonData?.result.filter((item:any) =>item?.metric?.__name__==='llm_unknown_provider_count'); 
        setUnownProviders({
            ...topFiveRouteErorr,
            labels: data.map((d:any) => d?.metric?.provider) as [],
            datasets: [
                {
                    label: 'Providers',
                    data: data.map((d:any) => d?.value[1]) as [],
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
        setMostUsedModels(data)
        setMostUsedModelProviders({
            ...mostUsedModelProviders,
            labels: data.map((d:any) => d?.metric?.model) as [],
            datasets: [
                {
                    label: 'Models',
                    data: data.map((d:any) => d?.value[1]) as [],
                    backgroundColor: ['#7ad67a','#449cf1', '#9B9B9B' ],
                    barPercentage: .125,
                },   
            ],
        })  
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

    const resetDataOnChange=()=>{
        setRouteQLatency({ ...routeQLatency, labels: [], datasets: [{}]}) 
        setRouteQThrottled({ ...routeQThrottled, labels: [], datasets: [{}]}) 
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
                    <h2 className='text-md font-bold mb-3'> Routes Used</h2>
                    {llmRoutes && llmRoutes?.length>0 && <div className={`w-full border border-[#F1F1F1] p-4 ${llmRouteData?.totalCount===0?styles.blurChart:''}`}>
                        <LLMRoutes data={llmRoutes}/>
                    </div>}
                    <div className=""> 
                        <h3 className='text-sm text-black-100 font-semibold mt-2 mb-3'>Total LLM Queries: {llmRouteData?.totalCount}</h3>                        
                        <div className={`w-full border border-[#F1F1F1] p-4 max-h-[280px] ${llmRouteData?.totalCount===0?styles.blurChart:''}`}>
                            <BarChart chartData={llmRouteData} optData={llmRouteData?.options} />
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-lg shadow-lg px-4 py-4 mt-3 mb-5'>
                    <h2 className='text-md font-bold mb-3'> Route Errors </h2>
                    <div className="grid auto-cols-max grid-cols-1 sm:grid-cols-2 gap-2" >
                        <div>
                            <h3 className='text-sm text-black-100 font-semibold mb-3'>Top 5 routes with errors</h3>
                            <div className={`flex items-center justify-center w-full border border-[#F1F1F1] h-64 p-4 ${topFiveRouteErorr?.labels?.length===0?styles.blurChart:''}`}>
                                <BarChart chartData={topFiveRouteErorr} optData={topFiveRouteErorr?.options} />
                            </div>
                        </div>
                        {unknownRouteErorr?.labels?.length>0 && 
                        <div>
                            <h3 className='text-sm text-black-100 font-semibold mb-3'>Unknown Route Errors</h3>
                            <div className='flex items-center justify-center w-full border h-64 border-[#F1F1F1] p-4'>
                                <PieChart chartData={unknownRouteErorr} />  
                            </div>        
                        </div>}
                    </div>
                </div>
                <div className='bg-white rounded-lg shadow-lg px-4 py-4 mt-3 mb-5 min-h-[400px]'>
                    <select className="select border-0 rounded-none select-bordered select-md w-full max-w-full bg-silver-300 text-black-100 focus:outline-none text-semibold" defaultValue={selectedRoute!==''?selectedRoute:"Select The Route"} onChange={(e:any)=>{handleRouteChange(e?.target?.value)}}>
                        <option disabled >Select The Route</option>
                        {gatewayRoutes && gatewayRoutes.map((data:any, index:number)=>(
                            <option key={`g-route-${index}`} value={data?.name} >{data?.name}</option>
                        ))}                            
                    </select>

                    <h2 className='text-md font-bold mb-3'> Route Latency </h2>

                    <div className="grid auto-cols-max grid-cols-1 sm:grid-cols-2 gap-2 mt-4" >                        
                        {selectedRoute!==undefined && selectedRoute!=='' ?(<>                        
                            {routeQLatency?.labels?.length>0 && <>
                                <div className='mt-3'>  
                                    <div className='flex items-center justify-center w-full border bg-[#f3f3f3] border-gray-300 p-4'>                                        
                                        <RouteQueryLatency data={routeQL} />
                                    </div>                          
                                    <div className='flex items-center justify-center w-full border bg-[#f3f3f3] h-60 border-gray-300 p-4'>
                                        <BarChart chartData={routeQLatency} optData={routeQLatency?.options} />
                                    </div>
                                    <h3 className='text-center text-sm font-semibold mt-3'>Query Latency</h3>
                                </div> 
                            </>}
                            {routeQThrottled?.labels?.length>0 && <>
                                <div className='mt-3'>                            
                                    <div className='flex items-center justify-center w-full border bg-[#f3f3f3] h-60 border-gray-300 p-4'>
                                        <PieChart chartData={routeQThrottled} /> 
                                    </div>
                                    <h3 className='text-center text-sm font-semibold mt-3'>Query Throttled by Route</h3>                            
                                </div>
                            </>}
                            {routeQLatency?.labels?.length===0 && routeQThrottled?.labels?.length===0 && <div className="col-span-2 mt-3"><DataNotFound message='No Data found for the selected route.' /></div>}
                            </>):<div className="col-span-2 mt-2"><PlainTextMsg message='Please select the route' /></div>                    
                        }
                    </div>
                </div>
            </>)
        },
        {
            tabName: 'Provider Metrics',
            content: (<>  
                <div className='bg-white rounded-lg shadow-lg px-4 py-4 mb-5'>
                    <h2 className='text-md font-bold mb-3'> Queries</h2>
                    {llmRoutes && llmRoutes?.length>0 && <div className={`w-full border border-[#F1F1F1] p-4 ${llmRouteData?.totalCount===0?styles.blurChart:''}`}>
                        <LLMProviders data={llmProviders}/>
                    </div>}
                    <div className="col-span-2 "> 
                        <h3 className='text-sm text-black-100 font-semibold mt-2 mb-3'>Total LLM Queries: {llmProviderData?.totalCount}</h3>
                        <div className={`w-full border border-[#F1F1F1] p-4 max-h-[280px] ${llmProviderData?.totalCount===0?styles.blurChart:''}`}>                      
                            <BarChart chartData={llmProviderData} optData={llmProviderData?.options} />
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-lg shadow-lg px-4 py-4 mt-2 mb-5'>
                    <h2 className='text-md font-bold mb-3'> Errors </h2>
                    <div className="grid auto-cols-max grid-cols-1 sm:grid-cols-2 gap-3" >
                        {llmMostUsedProviders?.labels?.length>0 && 
                            <div>
                                <LlmMostUsedProviders data={mostUsedProviders} />
                                <h3 className='text-sm text-black-100 font-semibold mt-2 mb-3'>Providers Used</h3>
                                <div className='flex items-center justify-center w-full border border-[#F1F1F1] h-64 p-4'>
                                    <PieChart chartData={llmMostUsedProviders} /> 
                                </div>
                            </div>
                        } 
                        <div>
                            <h3 className='text-sm text-black-100 font-semibold mt-2 mb-3'>Unknown Providers Accessed</h3>
                            <div className={`flex items-center justify-center w-full border h-64 border-[#F1F1F1] p-4 ${llmUnownProviders?.labels?.length===0?styles.blurChart:''}`}>
                                <BarChart chartData={llmUnownProviders} optData={llmUnownProviders?.options} />
                                {/* <PieChart chartData={llmUnownProviders} />   */}
                            </div>        
                        </div> 
                        {mostUsedModelProviders?.labels?.length>0 &&
                            <div>
                                <LlmMostUsedModelProviders data={mostUsedModels} />
                                <h3 className='text-sm text-black-100 font-semibold mt-2 mb-3'>Models Used</h3>
                                <div className='flex items-center justify-center w-full border border-[#F1F1F1] h-64 p-4'>
                                    <PieChart chartData={mostUsedModelProviders} /> 
                                </div>
                            </div>
                        } 
                    </div>
                </div>
                {/* <div className='bg-white rounded-lg shadow-lg px-4 py-4 mt-3 mb-5 min-h-[400px]'>
                        <select className="select border-0 rounded-none select-bordered select-md w-full max-w-full bg-silver-300 focus:outline-none text-semibold" defaultValue="Select The Providers">
                            <option disabled >Select The Providers</option>
                            {providersList && providersList.map((data:any, index:number)=>(
                                <option key={`g-provider-${index}`} value={data?.name}>{data?.name}</option>
                            ))}                            
                        </select>
                        <div className="grid auto-cols-max grid-cols-1 sm:grid-cols-2 gap-2 mt-4" >
                            <div className='mt-3'>
                                <div className='flex items-center justify-center h-60 w-full border bg-[#f3f3f3] p-4 border-gray-300'>                      
                                    <LineChart chartData={PotentialLatency?.data} optData={PotentialLatency?.options} />
                                </div> 
                                <h3 className='text-center text-sm font-semibold mt-3'>Potential Latency</h3>
                            </div>
                            <div className='mt-3'>
                                <div className='flex items-center justify-center w-full border bg-[#f3f3f3] h-60 border-gray-300 p-4'>
                                <PieChart chartData={UnownRouteErrors?.data} /> 
                                </div>
                                <h3 className='text-center text-sm font-semibold mt-3'>Query Throttled by Route</h3>
                            </div>
                        </div>
                </div> */}
                
            </>)
        }       
    ];   
    return (
        <>
            <div className='flex justify-between items-center'>
                <PageTitle pageTitle="Analytics" icon={false} breadcrumbData={breadcrumbs} />
                <RefreshButton  click={refreshData} btnClass='mt-[1.675rem] mr-3' inprogress={inprogress} />               
            </div>
            <div className='px-6 py-6 border rounded-xl bg-white border-blue-700 h-full'>
                <TabsComponent tabsData={tabsData} />
            </div>
        </>
    );
}
export default Analytics