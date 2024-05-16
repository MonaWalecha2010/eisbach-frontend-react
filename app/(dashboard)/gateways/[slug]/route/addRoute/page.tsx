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
const AddRoute = () => {
    const dispatch = useAppDispatch()
    const params = useParams()
    const slug = params.slug
    const router= useRouter()   
    const currentNamespace = removeSlashTwenty(params.slug)   
    const activeGateway = useAppSelector(getGateway)  
    const currentUser = useAppSelector(getUser)  
    const breadcrumbs=[
        { name: 'Home', link: '/' },
        { name: 'Gateways', link: '/gateways'},
        { name: currentNamespace, link: '/gateways/'+currentNamespace},
        { name: 'Configuration', link: '/gateways/'+currentNamespace},
        { name: `Add Route`, link: '/gateways/'+currentNamespace}        
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
    const [ configRetries , setConfigRetries] = useState<number>(0);
    const [ configDlp, setConfigDlp] = useState<boolean>(false);
    const [ strategy , setStrategy] = useState<string>('');
    const [ action , setAction] = useState<string>('');
    const [ costBudget, setCostBudget] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>('');
    const [interval, setInterval] = useState<string>('');
    const [configRetention, setConfigRetention] = useState<number>(7); 
    const [routeProviders, setRouteProviders] = useState<[]>([]);
    const [isResetform, setIsResetform] = useState<boolean>(false)
    const [dataProtections, setDataProtections] = useState<any>([])
    const [ secretKey , setSecretKey] = useState<string>('')
    const [secrets, setSecrets] = useState<any>([])
    const [ modelFallback, setModelFallback] = useState<boolean>(false);
    const [ fbModelName , setFbModelName] = useState<string>('')
    const [ fbModelProvider , setFbModelProvider] = useState<string>('')
    const [ fbModelSuffix , setFbModelSuffix] = useState<string>('') 
    const [ fbSecretKey , setFbSecretKey] = useState<string>('')   
   
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
                        const sortedData= sortByModifiedAt(res?.data);
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

    const updateLastUpdated = async() => {
        let data = await updateOrgMetaDataLastUpdated(
            currentUser?.organizationMemberships[0]?.organization?.id,
            currentUser?.organizationMemberships[0]?.organization?.publicMetadata,
            activeGateway?.namespace
        )       
        if(data !== undefined){ dispatch(setOrg(data)) }
    } 
    
    const saveRoute = (params:any) => {
        let param = {...params , enabled:true}
        try{
            AppService.addRoute(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id, param)
            .then((res:AxiosResponse) => {               
                if(res?.status === 200){
                    successToast("Route Added Successfully");
                    reloadRoute(params?.name)
                    updateLastUpdated()  
                    router.push('/gateways/'+slug)
                }else if(res?.status === 400){                    
                    errorToast(res?.data?.error)
                }else{
                    errorToast(res?.data)
                }                             
            })
            .catch((error:any)=>{
                console.log(error)
                errorToast("Some error occurred. Please try again later")
            })
        }
        catch(error)
        {
            console.log(error)
        }
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
    
    return (<>
        <div className='flex justify-between items-center flex-wrap mb-2 lg:mb-0'>
            <PageTitle pageTitle="Add Route" icon={false} breadcrumbData={breadcrumbs} />
            <BackButton url={`/gateways/${params.slug}`} />
        </div>
        <div className='px-6 py-6 border rounded-xl bg-white border-blue-700 h-full flex justify-between flex-col min-h-[82vh]'>
            <RouteForm {...FormProps} formType='add' />
        </div>
    </>)
}

export default AddRoute
