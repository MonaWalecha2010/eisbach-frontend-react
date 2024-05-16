'use client';
import React, {useState, useMemo, useEffect, useRef} from 'react'
import { GatewayConfigData, providerImage } from '@/app/components/data/gatwayData'
import { DeleteIcon } from '@/app/components/icons/svgIcons'
import AppService from '@/app/services/AppService';
import { AxiosResponse } from 'axios';
import PopupModal from '@/app/components/modal/PopupModal';
import DeletePopup from '@/app/components/modal/DeletePopup';
import { successToast, errorToast } from '@/app/helper/toastMsg';
import CardOne from '@/app/components/card/CardOne';
import TextOne from '@/app/components/texts/TextOne';
import { sortAlphabeticallyAsce, soryByTime } from '@/app/helper/sortArray';
import FormInputToggle from '@/app/components/forms-components/FormInputToggle';
import DataNotFound from '@/app/components/messages/DataNotFound'
import SpinLoader from '@/app/components/loaders/SpinLoader'
import styles from '../../styles/styles.module.scss'
import Link from 'next/link';
type GatewayConfigProps={
    currentTab: string;
    activeGateway:any;
    currentUser:any;
    currentNamespace:any;
    updateLastUpdated: ()=>void;
}
const GatewayConfigurations:React.FC<GatewayConfigProps> = ({currentNamespace, currentTab, activeGateway , currentUser, updateLastUpdated}) => {
    const [gatewayRoutes, setGatewayRoutes]=useState<[]>([]);   
    const [deleteRouteName, setDeleteRouteName] = useState<string>('');
    const deleteRouteModal = useRef<HTMLDialogElement>(null);
    const [statusId, setStatusId] = useState<string|null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false)
    //******************** */
    const getRoutes=async()=>{       
        await AppService.getRoutes(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id).then((res:AxiosResponse)=>{
            if(res){
                if(res?.status === 200){                   
                    const sortData = sortAlphabeticallyAsce(res.data) as [];
                    setGatewayRoutes(sortData); 
                    setInProgress(false)                   
                }else{
                    setGatewayRoutes([]);
                    setInProgress(false) 
                }           
            }else{
                setInProgress(false) 
            }

        })
    }
    useEffect(()=>{       
        if(gatewayRoutes && gatewayRoutes?.length===0 && currentTab==='Route Configuration'){
            setInProgress(true)
            getRoutes(); 
        } 
    },[currentTab]);    
    const deleteRouteConfirmation=(name: string)=>{
        if(name === ''){
            return;
        }
        else{
            setDeleteRouteName(name);
            if (deleteRouteModal?.current) {           
                deleteRouteModal.current.show();
            }
        }
    }
    const deleteRoute=()=>{
        try{
            AppService.deleteRoute(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id, deleteRouteName)
            .then((res:AxiosResponse) => {                
                getRoutes();
                successToast('Route Deleted Successfully');
                deleteRouteModal?.current?.close();
                updateLastUpdated()
            })
            .catch((error:any)=>{                
                errorToast('Some Error Occurred. Please try again Later');
                deleteRouteModal?.current?.close();
            })
        }
        catch(error){
            console.log(error)
        }
    }
    const getBudgetKeys=(budgetData:any)=>{
        let KeyName = Object.keys(budgetData)[0];
        let keyVal = budgetData[KeyName];
        return({key:KeyName, val:keyVal})
    }
    
    const reloadRoute=(name:string)=>{
        try{
            AppService.reloadRoute(activeGateway?.base_url, activeGateway?.api_key_value, currentUser?.id, name).then((res:AxiosResponse)=>{
                console.log(res)
            })
        }catch(error){console.log(error)}
    }  
   
    const updateRouteData=(data:any, status:boolean)=>{
        let dlp={};
        let budget={};        
        if(data?.config?.dlp?.enabled){
            dlp={
                enabled: data?.config?.dlp?.enabled,
                strategy: data?.config?.dlp?.strategy,
                action: data?.config?.dlp?.action,
            }
        }else{
            dlp={enabled: data?.config?.dlp?.enabled}
        }   
        // budget={
        //     costBudget:data?.config?.budget?.enabled,
        //     amount: keys?.val,
        //     interval: keys?.key,
        // }      
        if(data?.config?.budget){ 
            let keys = getBudgetKeys(data?.config?.budget); 
            // let key = keys?.key
            budget={
                enabled: data?.config?.budget?.enabled,
                [keys?.key]: keys?.val,
                currency: "USD"
               
            };
        }else{
            budget={
                enabled:false,
                currency: "USD"
            };
        }       
        let params={
            name: data?.name,
            type: data?.type, 
            enabled: status,           
            models : [{
                name: data?.models[0]?.name,
                provider: data?.models[0]?.provider,
                suffix: data?.models[0]?.suffix, 
                weight: data?.models[0]?.weight              
            }],
            config : {
                rate_limit: data?.config?.rate_limit,
                archive: data?.config?.archive,
                retention: data?.config?.retention,
                retries: data?.config?.retries,
                budget,
                organization: data?.config?.organization,
                owner: data?.config?.owner,
                dlp
            }
        };                
        try{
            AppService.updateRoute(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id, params)
            .then((res:AxiosResponse) => {               
                if(res?.status === 200){
                    successToast("Route Status Updated Successfully")
                    reloadRoute(params?.name); 
                    getRoutes()     
                    updateLastUpdated()  
                    setStatusId(null)         
                }else{
                    errorToast(res?.data?.message)
                    setStatusId(null) 
                }
            }).catch((error:any)=>{
                console.log(error)
                setStatusId(null) 
                errorToast('Some error occurred. Try again later');
            })
        }
        catch(error){
            console.log(error)
            setStatusId(null) 
        }     
    }  
    return (
        <>
            <div className='flex flex-wrap gap-5'>            
                {gatewayRoutes && gatewayRoutes?.length>0 ? gatewayRoutes.map((item:any, index:number)=>{
                    let pImage = providerImage((item?.models && item?.models?.length > 0) ? item?.models[0]?.provider : '');                                                       
                    return(
                        <CardOne key={`g-config-${index}`} classList='relative rounded-xl w-full mx-auto sm:mx-0 max-w-[17.5rem] sm:max-w-auto sm:min-w-[17.5rem] px-[.813rem] lg:py-[1.5rem] py-[32px]'>                
                            <div className='absolute top-2 right-3'>                    
                                <button type='button' className='inline-flex items-center justify-center' onClick={()=>deleteRouteConfirmation(item?.name)}><DeleteIcon /></button>
                            </div>
                            <Link className='cursor-pointer' href={`/gateways/${currentNamespace}/route/${item?.name}`}>
                                {item?.name && <TextOne heading="Name" desc={item?.name} />}
                                {item?.models && item?.models?.length > 0 && <TextOne heading="Model Name" desc={item?.models[0]?.name} type="sub"/>}
                                {item?.type && <TextOne heading="Type" desc={item?.type} />}
                                {pImage!== undefined && pImage!=='' ? (
                                    <div>
                                        <p className='text-xs text-gray-800 uppercase mb-0'>Provider</p>
                                        <img src={pImage} alt={item?.models[0]?.provider} width={85} />
                                    </div>
                                ): (<>
                                    {item?.models && item?.models?.length > 0 && <TextOne heading="Provider" desc={item?.models[0]?.provider} />}
                                </>)}                      
                            </Link> 
                            <div className="form-control mt-2">
                                <div className='flex items-center justify-between'>
                                    <span className='text-xs text-gray-800 uppercase'>Status</span>    
                                    <label className={`label cursor-pointer mr-2 ${styles.toggle_switch} ${statusId===`routeStatus${index}`?'cursor-wait':''}`}>
                                        <input  
                                            id={`routeStatus_${index}`}              
                                            type="checkbox" 
                                            className={`toggle`}
                                            checked={item?.enabled} 
                                            onChange={(e:any)=>{
                                                setStatusId(`routeStatus${index}`)
                                                updateRouteData(item, e?.target?.checked)
                                            }}
                                        />
                                        <span className={`${styles.slider} ${styles.round} ${statusId===`routeStatus${index}`?'cursor-wait':''}`}></span>
                                    </label>
                                </div>                                
                            </div>                  
                        </CardOne>
                    );
                }): <>
                    {inProgress? <SpinLoader /> :<DataNotFound message='You have not added any route yet.' />}
                </>}
            </div>
            {gatewayRoutes && gatewayRoutes?.length>0 && <>    
                <DeletePopup 
                    modalId="deleteRoute" width='md:w-[28.123rem] mx-w-3xl'
                    modalRef={deleteRouteModal}
                    message="Are You Sure You Want to Remove This Route" 
                    deleteAction={deleteRoute}
                />
            </>}
        </>
    )
}
export default GatewayConfigurations;