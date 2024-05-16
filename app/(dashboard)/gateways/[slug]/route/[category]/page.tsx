'use client';
import React, {useEffect, useState} from 'react'
import { AxiosResponse } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import RouteForm from '../RouteForm';
import PageTitle from '@/app/components/PageTitle'
import BackButton from '@/app/components/buttons/BackButton'
import { removeSlashTwenty } from '@/app/helper/UrlHelper'
import AppService from '@/app/services/AppService';
import { getGateway, getUser } from '@/app/store/reducers/gateway.selector';
import { useAppSelector } from '@/app/store/hooks'
import { successToast, errorToast } from '@/app/helper/toastMsg';
import { getProvidersService } from '@/app/services/ProviderServices';
import { sortAlphabeticallyAsce, sortByModifiedAt } from '@/app/helper/sortArray';
import { updateOrgMetaDataLastUpdated } from '@/app/helper/axiosHeaderHelper';
import { useAppDispatch } from '@/app/store/hooks';
import { setOrg } from '@/app/store/reducers/gateway.reducer';
import SpinLoader from '@/app/components/loaders/SpinLoader';
const EditRoute = () => {
    const params = useParams()
    const slug = params.slug
    const router= useRouter()   
    const dispatch = useAppDispatch()
    const currentRoute = params.category as string
    const currentNamespace = removeSlashTwenty(params.slug)   
    const activeGateway = useAppSelector(getGateway)  
    const currentUser = useAppSelector(getUser)  
    const breadcrumbs=[
        { name: 'Home', link: '/' },
        { name: 'Gateways', link: '/gateways'},
        { name: currentNamespace, link: '/gateways/'+currentNamespace},
        { name: 'Configuration', link: '/gateways/'+currentNamespace},
        { name: `Edit Route - ${currentRoute}`, link: `/gateways/${currentNamespace}/route/${currentRoute}`}    
    ]   
    const [ name , setName] = useState<string>('')
    const [ modelName , setModelName] = useState<string>('')
    const [ modelProvider , setModelProvider] = useState<string>('')
    const [ modelSuffix , setModelSuffix] = useState<string>('')
    const [ type , setType] = useState<string>('')
    const [ configRateLimit , setConfigRateLimit] = useState<number>(0)
    const [ configOwner , setConfigOwner] = useState<string>('')
    const [ configArchive , setConfigArchive] = useState<boolean>(true)
    const [ configOrg , setConfirgOrg] = useState<string>('')
    const [ configRetries , setConfigRetries] = useState<number>(0)
    const [ configDlp, setConfigDlp] = useState<boolean>(false)
    const [ strategy , setStrategy] = useState<string>('')
    const [ action , setAction] = useState<string>('')
    const [ costBudget, setCostBudget] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>('')
    const [interval, setInterval] = useState<string>('')
    const [configRetention, setConfigRetention] = useState<number>(7)
    const [routeProviders, setRouteProviders] = useState<[]>([])
    const [isResetform, setIsResetform] = useState<boolean>(false)
    const [dataProtections, setDataProtections] = useState<any>([])
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [ secretKey , setSecretKey] = useState<string>('')
    const [secrets, setSecrets] = useState<any>([])
    const [ modelFallback, setModelFallback] = useState<boolean>(false)
    const [ fbModelName , setFbModelName] = useState<string>('')
    const [ fbModelProvider , setFbModelProvider] = useState<string>('')
    const [ fbModelSuffix , setFbModelSuffix] = useState<string>('') 
    const [ fbSecretKey , setFbSecretKey] = useState<string>('')  
    useEffect(()=>{
        setInProgress(true) 
        const getRouteData = () => {
            try{
                AppService.getRoute(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id,currentRoute)
                .then((res:AxiosResponse) => {
                    if(res?.status === 200)                
                    { 
                        console.log('route data',res?.data)

                        if(res?.data?.config?.budget){                        
                            setCostBudget(res?.data?.config?.budget?.enabled)
                            let keys = getBudgetKeys(res?.data?.config?.budget);                                             
                            if(keys){
                                setAmount(keys?.val)
                                setInterval(keys?.key)
                            }
                        }else{
                            setCostBudget(false)
                            setAmount("")
                            setInterval("")
                        }                  
                        setName(res?.data?.name)         
                        setType(res?.data?.type)           
                        setModelName((res?.data?.models)?res?.data?.models[0]?.name:'')
                        setModelProvider((res?.data?.models)?res?.data?.models[0]?.provider:'')                    
                        setModelSuffix((res?.data?.models)?res?.data?.models[0]?.suffix:'')
                        setConfigArchive(res?.data?.config?.archive)
                        setConfigOwner(res?.data?.config?.owner)
                        setConfigRateLimit(res?.data?.config?.rate_limit?res?.data?.config?.rate_limit:0)
                        setConfigRetries(res?.data?.config?.retries?res?.data?.config?.retries:0)
                        setConfirgOrg(res?.data?.config?.organization)
                        setConfigRetention(res?.data?.config?.retention?res?.data?.config?.retention :7)                  
                        setConfigDlp(res?.data?.config?.dlp?res?.data?.config?.dlp?.enabled:false)
                        setAction(res?.data?.config?.dlp?.action?res?.data?.config?.dlp?.action:'')
                        setStrategy(res?.data?.config?.dlp?.strategy?res?.data?.config?.dlp?.strategy:'') 
                        
                        setSecretKey(res?.data?.models?res?.data?.models[0]?.virtual_secret_key:'')
                        setModelFallback((res?.data?.models)?res?.data?.models[0]?.fallback_enabled:false)
                        if(res?.data?.models?.length>1 && res?.data?.models[0]?.fallback_enabled===true ){
                            setFbModelName((res?.data?.models)?res?.data?.models[1]?.name:'')
                            setFbModelProvider((res?.data?.models)?res?.data?.models[1]?.provider:'')
                            setFbModelSuffix((res?.data?.models)?res?.data?.models[1]?.suffix:'')                            
                            setFbSecretKey((res?.data?.models)?res?.data?.models[1]?.virtual_secret_key:'')
                        }

                        setInProgress(false)                  
                    }
                    else{
                        errorToast(res?.data?.message);
                        setInProgress(false)
                    }
                })
                .catch((error:any)=>{
                    console.log(error); 
                    setInProgress(false)  
                })
            }
            catch(error){
                console.log(error);
                setInProgress(false)
            }
        }
        getRouteData()
    },[])
    const getBudgetKeys=(budgetData:any)=>{
        let KeyName = Object.keys(budgetData)[0];
        let keyVal = budgetData[KeyName];
        return({key:KeyName, val:keyVal})
    }    
    const getProviders = () => {
        try{
            getProvidersService(activeGateway?.base_url , activeGateway?.api_key_value , currentUser?.id).
            then((res:AxiosResponse) => {
              if(res?.status === 200){                   
                  const sortData = sortAlphabeticallyAsce(res.data) as []; 
                  let providers:any = [];
                  sortData.map((item:any)=>{
                    providers.push({displayValue : item?.name, value : item?.name})
                  })
                  setRouteProviders(providers);                    
              }   
            })
          }
          catch(error){
            console.log(error)
          }
    }  
    const getProtectionData = async() => {  
        try{
            await AppService.getDataProtections(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id).then((res:AxiosResponse)=>{
                if(res){         
                    if(res?.status === 200){
                        setDataProtections(res?.data);
                    } else{
                        setDataProtections([])
                    }                         
                }
            }).catch((error:any)=>{
                console.log(error);
            })
            
        }catch(error:any){}
    }  
    const getSecretsData = async() => {  
        try{
            await AppService.getAllKeyVaults(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id).then((res:AxiosResponse)=>{
                if(res){                           
                    if(res?.status === 200){
                        const sortedData= sortByModifiedAt(res?.data)                        
                        setSecrets(sortedData);
                    } else{
                        setSecrets([])
                    }                         
                }
            }).catch((error:any)=>{
                console.log(error);
            })
            
        }catch(error:any){}
    } 
    const updateLastUpdated = async() => {
        let data = await updateOrgMetaDataLastUpdated(
            currentUser?.organizationMemberships[0]?.organization?.id,
            currentUser?.organizationMemberships[0]?.organization?.publicMetadata,
            activeGateway?.namespace
        )       
        if(data !== undefined){ dispatch(setOrg(data)) }
    } 
    useEffect(()=>{
        getProviders();
        getProtectionData();
        getSecretsData()
    },[])
    const reloadRoute=(name:string)=>{
        try{
            AppService.reloadRoute(activeGateway?.base_url, activeGateway?.api_key_value, currentUser?.id ,name).then((res:AxiosResponse)=>{
                console.log(res)
            })
        }catch(error){console.log(error)}
    }     
    const saveRoute = (params:{}) => {      
        try{
            AppService.updateRoute(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id, params)
            .then((res:AxiosResponse) => {                
                if(res?.status === 200){
                    successToast("Route Updated Successfully")
                    reloadRoute(name); 
                    updateLastUpdated()  
                    router.push('/gateways/'+slug)
                                 
                }else{
                    errorToast(res?.data?.message)
                }
            })
            .catch((error:any)=>{
                console.log(error)
                errorToast('Some error occurred. Try again later');
            })
        }
        catch(error){console.log(error)}
    } 
    const FormProps={
        setName:setName,
        setRouteType:setType,
        setModelName:setModelName,
        setModelProvider:setModelProvider,
        setModelSuffix:setModelSuffix,
        routeProviders:routeProviders,
        // setModelRetries:setModelRetries,
        setConfigRateLimit:setConfigRateLimit,
        setConfigOwner:setConfigOwner,
        setConfigArchive:setConfigArchive,
        setConfirgOrg:setConfirgOrg,
        setConfigRetries:setConfigRetries,
        setConfigDlp:setConfigDlp,
        setStrategy:setStrategy,
        setAction:setAction,
        setCostBudget:setCostBudget,
        setAmount:setAmount,
        setInterval:setInterval,
        setConfigRetention:setConfigRetention,
        setIsResetform:setIsResetform,
        setSecretKey:setSecretKey,
        setModelFallback:setModelFallback,
        setFbModelName:setFbModelName,
        setFbModelProvider:setFbModelProvider,
        setFbModelSuffix:setFbModelSuffix,        
        setFbSecretKey:setFbSecretKey,
        name:name,
        routeType:type,
        modelName:modelName,
        modelProvider:modelProvider,
        modelSuffix:modelSuffix,
        // modelRetries:modelRetries,
        configOwner:configOwner,
        configOrg:configOrg,
        configRateLimit:configRateLimit,
        configArchive:configArchive,
        configRetries:configRetries,
        configDlp:configDlp,
        strategy:strategy,
        action:action,
        costBudget:costBudget,
        amount:amount,
        interval:interval,
        configRetention:configRetention,
        isResetform:isResetform,
        saveRouteData:saveRoute,
        activeGateway:activeGateway,
        dataProtections:dataProtections,
        secretKey:secretKey,
        secrets: secrets,
        modelFallback:modelFallback, 
        fbModelName:fbModelName,
        fbModelProvider:fbModelProvider,
        fbModelSuffix:fbModelSuffix,        
        fbSecretKey:fbSecretKey,
    }
    
  return (
    <>
        <div className='flex justify-between items-center flex-wrap mb-2 lg:mb-0'>
            <PageTitle pageTitle="Edit Route" icon={false} breadcrumbData={breadcrumbs} />
            <BackButton url={`/gateways/${params.slug}`} />
        </div>
        <div className='px-6 py-6 border rounded-xl bg-white border-blue-700 h-full flex justify-between flex-col min-h-[82vh]'>
            {inProgress? <SpinLoader/>: <RouteForm {...FormProps} formType='edit' />}
        </div>
    </>
  )
}

export default EditRoute
