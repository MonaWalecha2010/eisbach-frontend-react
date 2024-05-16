'use client';
import React, { useEffect, useState, useRef } from 'react'
import JSONPretty from 'react-json-pretty';
import { JsonPrettyColorCodes, JsonPrettyStyles } from '@/app/components/data/jsonPrettyData';
import 'react-json-pretty/themes/monikai.css'
import styles from '../../styles/styles.module.scss'
import PageTitle from '@/app/components/PageTitle'
import AppService from '@/app/services/AppService';
import { AxiosResponse } from 'axios';
import { sortAlphabeticallyAsce, sortByModifiedAt } from '@/app/helper/sortArray';
import { successToast, errorToast } from '@/app/helper/toastMsg';
import SpinLoader from '@/app/components/loaders/SpinLoader';
import GatewayDropdown from '@/app/components/shared/GatewayDropdown';
import { useAppSelector } from '@/app/store/hooks';
import { getGateway, getUser } from '@/app/store/reducers/gateway.selector';
import { getOrg } from '@/app/store/reducers/gateway.selector';
const prodApiUrl= process.env.NEXT_PUBLIC_PROD_API_URL as string
const breadcrumbs=[
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'Playground',
        link: '/playground'
    }
];
type Gateway = {    
    status: number;
    base_url: string;
    namespace: string;
    api_key_id: string;
    lastUpdated: string;
    api_key_value: string;
    usage_plan_id: string;
};
type DataSetProps={
    dataSets:[];
    handleSearch: (text:string)=>void;
    loading:boolean;
}
const Playground = () => {     
    const [gateway, setGateway] = useState<Gateway[]>([]);   
    const [route, setRoute] = useState<string>('');
    const activeGateway = useAppSelector(getGateway);
    const currentUser = useAppSelector(getUser)
    const [headerType, setHeaderType] = useState<string>('');
    const [authorization, setAuthorization] = useState<string>('');
    const [gatewayRoutes, setGatewayRoutes] = useState<[]>();
    const [queryData, setQueryData] = useState<any>(null);
    const [xJavelinKey, setXJavelinKey] = useState<string>('');
    const [url, setUrl] = useState<string>('')
    const [secretsData, setSecretsData] = useState<[]>();
    const outputRef = useRef<HTMLDivElement>(null);    
    const bodyJson= {
        "messages": [
          {
            "role": "system",
            "content": "Hello, you are a helpful assistant"
          },
          {
            "role": "user",
            "content": "What is the chemical composition of sugar?"
          }
        ],
        "temperature": 0.8
    }
    const headersJson={"Content-Type":"application/json"}; 
    const [headerData, setHeaderData] = useState<string>(JSON.stringify(headersJson, null, 2)); 
    const [bodyText, setBodyText] = useState<string>(JSON.stringify(bodyJson, null, 2));    
    const [inProgress, setInProgress] = useState<boolean>(false);  
    const currentOrg = useAppSelector(getOrg)  
    const getRoutes=async()=>{ 
        if(gateway?.length>0){       
            await AppService.getRoutes(gateway[0]?.base_url , gateway[0]?.api_key_value, currentUser?.id).then((res:AxiosResponse)=>{
                if(res){
                    if(res?.status === 200){                   
                        const sortData = sortAlphabeticallyAsce(res.data) as [];                        
                        setGatewayRoutes(sortData);                    
                    }                
                }
            })
        }
    } 
    useEffect(()=>{        
        if(currentOrg && currentOrg!=='' && currentOrg !==null && currentOrg !== undefined && gateway?.length === 0){           
            setGateway((currentOrg?.publicMetadata?.Gateways) ? currentOrg?.publicMetadata?.Gateways : [] )
        }
    }, [currentOrg]) 
    useEffect(()=>{       
        if(gateway && gateway?.length>0){
            getRoutes();
        }
    },[gateway]);   
    const handleHeaderChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {        
        const inputValue = event.target.value;
        setHeaderData(inputValue);
    };
    const handleBodyDataChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {        
        const inputValue = event.target.value;               
        setBodyText(inputValue);
    }; 
    const scrollToOutput=()=>{
        if (outputRef.current) {
            outputRef.current.scrollIntoView({ behavior: 'smooth' });
        }       
    }
    const handleResponse=(status:any, res:any)=>{
        setQueryData({status : status, data: res?.data});
                return;
        // switch (status) {
        //     case 200:
        //         setQueryData({status : status, data: res?.data});
        //         return;
        //     case 400:
        //         setQueryData({status : status, data: res?.data});               
        //         return;              
        //     case 401:
        //         setQueryData({status : status, data: res?.data});               
        //         return;
        //     case 403:
        //         setQueryData({status : status, data: res?.data?.error});                
        //         return;
        //     case 429:
        //         setQueryData({status : status, data: res?.data?.error});              
        //         return;             
        //     case 504:
        //         setQueryData({status : status, data: res?.data});             
        //         return;
        //     default:
        //         return;
        // }
    }
    const executeCode=(e:any)=>{       
        e.preventDefault();
        setQueryData(null)
        let headers={}; 
        let bodyData={};
        if(headerData){headers = JSON.parse(headerData)} 
        if(bodyText){bodyData = JSON.parse(bodyText)}
        if(headerType === 'x-javelin-virtualapikey' && xJavelinKey !== ''){
            headers = {...headers, 'x-javelin-virtualapikey': xJavelinKey}
        }else if(headerType === 'authorization' && authorization !== ''){
            headers = {...headers, 'Authorization': authorization}
        }
        else{ headers = {...headers} }
        if(gateway?.length>0 && route!=='' && headers!==null && bodyData!==null ){ 
            const url = gateway[0]?.base_url;
            const api_key = gateway[0]?.api_key_value;
            setInProgress(true);
            scrollToOutput();        
            try{
                AppService.getRouteQuery(url , api_key, currentUser?.id, route, headers, bodyData).then((res:AxiosResponse)=>{
                    if(res){  
                        console.log(res)  
                        handleResponse(res?.status, res) 
                        setInProgress(false);                       
                        // if(res?.status === 200){                                 
                        //     // setQueryData({status : res?.status, data: res.data});
                        //     // setInProgress(false);
                        // }else{ 
                        //     let results = handleResponse(res?.status,res.data)  
                        //     setQueryData({...results});  
                        //     setInProgress(false);
                        // }             
                    }
                    else{                       
                        setQueryData({status : 403, data: "ERR_FAILED 403 (Forbidden)"}); 
                        setInProgress(false);
                    }
                      
                })
                .catch((error)=>{                    
                    setQueryData({status : 403, data: error}); 
                    setInProgress(false);  
                })
            }catch(error:any){                
                setQueryData({status : 403, data: error});  
                setInProgress(false);
            }            
        }else{
            errorToast('Please select all the  fields'); 
        }
    }
    const clearEditor=()=>{
        setBodyText('');
        setHeaderData('');
        setUrl('');
        // setGateway([]);
        setRoute('');
    }  
    useEffect(()=>{
        const getAllKeyVaults = async() => {
            await AppService.getAllKeyVaults(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id).then((res:AxiosResponse)=>{
                if(res){                                 
                    if(res?.status === 200){
                        const sortedData= sortByModifiedAt(res?.data);
                        setSecretsData(sortedData); 
                    }else{
                        setSecretsData([])
                    }            
                }
            })
        } 
        getAllKeyVaults();
    },[]);
     
    const getCurrProviderSecrets=async(currRoute:any, routesData:any)=>{ 
        const filteredRoute = routesData.filter((key:any) => key?.name === currRoute);
        const currProvider = filteredRoute[0]?.models[0]?.provider;
        if(gateway?.length>0){       
            await AppService.getKeyVaults(gateway[0]?.base_url , gateway[0]?.api_key_value, currentUser?.id, currProvider).then((res:AxiosResponse)=>{
                if(res){
                    if(res?.status === 200){
                        const sortedData= sortByModifiedAt(res?.data);
                        console.log(sortedData)
                        setSecretsData(sortedData);        
                    }else{
                        setSecretsData([])
                    }               
                }
            })
        }
    }
    return (
    <>
        <div className='flex justify-between items-center'>
            <PageTitle pageTitle="Playground" icon={false} breadcrumbData={breadcrumbs} />                
        </div>
        <div className='p-4 md:px-6 md:py-6 border rounded-xl bg-white border-blue-700 h-full'>
            {/* <section className="w-full h-screen p-3 font-sans"> */}
                <h1 className="text-base font-semibold text-center mb-6 text-black-100">Javelin AI Playground</h1>
                <form className="grid grid-cols-4 gap-4 h-full">
                    <div className="col-span-4 md:col-span-3 order-2 md:order-1 p-4 rounded-lg border bg-white">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-md font-semibold text-primary-100">Code Editor</h2>                           
                            <button className="btn-outline text-xs border text-primary-300 py-2 px-4 rounded-md hover:bg-primary-300 hover:text-white transition-colors" type="reset" onClick={()=>{clearEditor()}}>Clear Editor </button>
                        </div>
                        <div className="mb-2">
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-700" htmlFor="url">URL</label>
                            <input
                                aria-label="URL input"
                                className="mt-1 input input-sm border-zinc-200 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-xs rounded-md placeholder:text-gray-700 text-gray-700 placeholder:text-xs focus:outline-none"
                                id="url"
                                name="url"
                                placeholder={prodApiUrl+'...'}
                                type="text"
                                value={url}
                                readOnly
                            />
                        </div>
                        
                        {secretsData && secretsData?.length===0 &&(
                            <div className="mb-2">
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-700">Header Type</label>
                                <input
                                    aria-label="authorization"
                                    className="mt-1 input input-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-xs border-zinc-200 rounded-md placeholder:text-gray-700 text-gray-700 placeholder:text-xs"
                                    id="authorization"
                                    name="key"
                                    placeholder={'Enter authorization'}
                                    type="text"
                                    value={authorization}
                                    onChange={(e)=>setAuthorization(e.target.value)}
                                />
                            </div>
                        )}
                        {secretsData && secretsData?.length>0 && (<>
                            <div className='mb-2'>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-700">Header Type</label>
                                <select name="gateway" className="select select-sm select-bordered w-full lg:max-w-full max-w-xs text-black-100 focus:outline-none text-xs border-zinc-200" defaultValue="Select header type" onChange={(e:any)=>{
                                    setHeaderType(e?.target?.value);
                                }} >
                                    <option>Select a Header Type</option>
                                    <option className='text-xs' value="x-javelin-virtualapikey">x-javelin-virtualapikey</option>
                                    <option className='text-xs' value="authorization">authorization</option>
                                </select>
                            </div>
                            {headerType === 'x-javelin-virtualapikey' ?<div className="mb-2">
                                {/* <label className="block text-xs font-medium text-gray-700 dark:text-gray-700" htmlFor="key">x-javelin-virtualapikey</label> */}
                                <select name="gateway" className="select select-sm select-bordered w-full lg:max-w-full max-w-xs text-black-100 focus:outline-none text-xs border-zinc-200" defaultValue="Select x-javelin-virtualapikey" onChange={(e:any)=>{
                                    setXJavelinKey(e?.target?.value);
                                }} >
                                    <option>Select x-javelin-virtualapikey</option>
                                    {secretsData.map((secret:any)=>(
                                        <option className='text-xs' value={secret?.api_key_secret_key_javelin}>{secret?.api_key}</option>
                                    ))}
                                </select>
                                {/* <input
                                    aria-label="x-javelin-virtualapikey"
                                    className="mt-1 input input-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-xs border-zinc-200 rounded-md placeholder:text-gray-700 text-gray-700 placeholder:text-xs focus:outline-none"
                                    id="key"
                                    name="key"
                                    placeholder={'Enter x-javelin-virtualapikey'}
                                    type="text"
                                    value={xJavelinKey}
                                    onChange={(e)=>setXJavelinKey(e.target.value)}
                                /> */}
                            </div> : 
                            (headerType === 'authorization') ?
                            <div className="mb-2">
                                {/* <label className="block text-xs font-medium text-gray-700 dark:text-gray-700" htmlFor="authorization">Authorization</label> */}
                                <input
                                    aria-label="authorization"
                                    className="mt-1 input input-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-xs border-zinc-200 rounded-md placeholder:text-gray-700 text-gray-700 placeholder:text-xs"
                                    id="authorization"
                                    name="key"
                                    placeholder={'Enter authorization'}
                                    type="text"
                                    value={authorization}
                                    onChange={(e)=>setAuthorization(e.target.value)}
                                />
                            </div> : '' }
                        </>)}
                        <details className="mb-2">
                            <summary className="cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-700">Headers</summary>
                            <textarea
                                aria-label="Headers editor"
                                className="w-full h-32 p-2 mt-2 rounded-lg resize-none bg-transparent focus:outline-none font-mono text-green-600 border border-zinc-200 dark:border-zinc-200 text-xs placeholder:text-xs"
                                name="headers" onChange={handleHeaderChange} 
                                defaultValue={headerData}                       
                            ></textarea>
                        </details>
                        <details className="mb-2" open>
                            <summary className="cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-700">Body</summary>
                            <textarea
                                aria-label="Body editor"
                                className="w-full p-2 mt-2 rounded-lg resize-none bg-transparent focus:outline-none font-mono text-green-600 border border-zinc-200 dark:border-zinc-200 text-xs placeholder:text-xs" rows={10}
                                name="body" onChange={handleBodyDataChange}  
                                defaultValue={bodyText}       
                            ></textarea>                            
                        </details>
                    </div>
                    <div className="col-span-4 md:col-span-1 order-1 md:order-2 p-4 rounded-lg border bg-white">
                        <div className="mb-4 w-full xs:w-[35%] md:w-auto xs:me-2 inline-block md:block">
                            <h2 className="text-xs font-semibold mb-2 text-primary-100">Gateway Selection</h2>
                            <GatewayDropdown setGatewayData={setGateway}  classVal="select select-sm select-bordered w-full md:max-w-xs lg:max-w-full text-black-100 focus:outline-none" />                            
                        </div>
                        <div className="mb-4 w-full xs:w-[35%] md:w-auto xs:me-2 inline-block md:block">                            
                            {((activeGateway!=='' && activeGateway!==undefined) || (gatewayRoutes && gatewayRoutes?.length>0)) && (<>
                                <h2 className="text-xs font-semibold mb-2 text-primary-100">Route Selection</h2>
                                <select name="gateway" className="select select-sm select-bordered w-full lg:max-w-full md:max-w-xs text-black-100 focus:outline-none text-xs" defaultValue="Select a route" onChange={(e:any)=>{
                                    setRoute(e?.target?.value);
                                    getCurrProviderSecrets(e?.target?.value, gatewayRoutes);
                                    setUrl(gateway[0]?.base_url+'v1/query/'+e?.target?.value);
                                }} >
                                    <option disabled>Select a route</option>
                                    {gatewayRoutes && gatewayRoutes.map((data:any, index)=>{
                                        return(<option className='text-xs' key={`route-${index}`} value={data?.name}>{data?.name}</option>);
                                    })}
                                </select>
                            </>)}
                        </div>                        
                        <button className="mt-4 ml-auto min-w-[100px] block xs:inline-block xs:w-[26%] md:w-full bg-primary-300 text-white py-1 md:py-2 rounded-md hover:bg-primary-500 transition-colors" type="button" onClick={(e)=>executeCode(e)} > Execute </button>
                    </div>
                    <div className="col-span-4 order-3 p-4 mt-4 rounded-lg border bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-md font-semibold text-primary-100">Output: {queryData?.status===200?(<span className='text-green-100'> {queryData?.status}</span> ):(<span className='text-red-500'>{queryData?.status} </span>)} </h2>
                            <button className="btn-outline border text-primary-300 py-2 px-4 rounded-md hover:bg-primary-300 hover:text-white transition-colors text-xs" type="button" onClick={()=>setQueryData(null)}> Clear Output</button>
                        </div>
                        <div ref={outputRef} className="h-auto rounded-lg border border-zinc-200 dark:border-zinc-200">
                            <div className={`w-full h-80 overflow-auto p-2 bg-transparent font-mono text-xs ${styles.fontMenlo}`}>{(queryData!==null && !inProgress) ? 
                                <>
                                    {/* <h3 className='text-base font-bold text-black-100'>Output:</h3>
                                    {queryData?.status===200?
                                        <p className='text-xs mb-4'><span className='text-green-100'>{queryData?.status}</span> OK</p>
                                    : <p className='text-xs mb-4'><span className='text-red-100'>{queryData?.status} </span><span className='break-words'>{queryData?.data}</span></p>}  */}
                                    <JSONPretty id="json-pretty" {...JsonPrettyStyles} data={JSON.stringify(queryData.data, null, 2)} theme={{...JsonPrettyColorCodes}}></JSONPretty>
                                </>
                            : inProgress && <SpinLoader />}</div>
                        </div>
                    </div>
                </form>
            {/* </section> */}
        </div>
    </>
    )
}

export default Playground