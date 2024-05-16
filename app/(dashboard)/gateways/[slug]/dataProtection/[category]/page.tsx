'use client';
import React, {useEffect, useState} from 'react'
import { AxiosResponse } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import DataProtectionForm from '../DataProtectionForm';
import PageTitle from '@/app/components/PageTitle'
import BackButton from '@/app/components/buttons/BackButton'
import { removeSlashTwenty } from '@/app/helper/UrlHelper'
import AppService from '@/app/services/AppService';
import { getGateway, getUser } from '@/app/store/reducers/gateway.selector';
import { useAppSelector } from '@/app/store/hooks'
import SpinLoader from '@/app/components/loaders/SpinLoader';
import { successToast, errorToast } from '@/app/helper/toastMsg';
type DataProtections={
    name:string
    type: string 
    created_by: string 
    created: string 
    enabled: boolean   
}
const EditDataProtection = () => {
    const params = useParams()
    const router= useRouter()  
    const slug = params.slug    
    const currentNamespace = removeSlashTwenty(params.slug)
    const currentTemplate = params.category as string
    const activeGateway = useAppSelector(getGateway) 
    const activeUser = useAppSelector(getUser)    
    const [notify, setNotify] = useState<boolean>(false) 
    const [reject, setReject] = useState<boolean>(false) 
    const breadcrumbs=[
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Gateways',
            link: '/gateways'
        },
        { name: currentNamespace, link: '/gateways/'+currentNamespace},
        { name: 'Data Protection', link: '/gateways/'+currentNamespace+'/dataProtection'},
        {
            name: `Edit Data Protection`,
            link: '/gateways/'+currentNamespace+'/dataProtection/'+currentTemplate
        }        
    ]   
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [transformation, setTransformation] = useState<string>('')
    const [confidenceThreshold, setConfidenceThreshold] = useState<string>('')   
    const [infotypes, setInfotypes] = useState<{name:string}[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [prompt, setPrompt] = useState<string>('');     
    const [isResetform, setIsResetform] = useState<boolean>(false)   
    useEffect(()=>{
        const getDPData = async() => {
            setIsLoading(true)       
            try{
                await AppService.getDataProtection(activeGateway?.base_url , activeGateway?.api_key_value, activeUser?.id, currentTemplate).then((res:AxiosResponse)=>{
                    if(res){                  
                        if(res?.status === 200){  
                            setFormData(res?.data)                         
                        }
                        setIsLoading(false);                          
                    }
                }).catch((error:any)=>{
                    console.log(error);
                    setIsLoading(false);
                })
                
            }catch(error:any){
                setIsLoading(false)
            }
        }
        getDPData();
    },[])  
    
    const reloadDP=(tempName:string)=>{
        try{
            AppService.reloadDataProtection(activeGateway?.base_url, activeGateway?.api_key_value, activeUser?.id, tempName).then((res:AxiosResponse)=>{
                console.log(res)
            })
        }catch(error){console.log(error)}
    } 
    
    const saveData=async(params:{})=>{                
        setInProgress(true)
        let user=activeUser?.id
        try{
            let param = {...params } 
            await AppService.updateDataProtection(activeGateway?.base_url, activeGateway?.api_key_value, user, param)
            .then((res:AxiosResponse) => {                
                if(res?.status === 200){                    
                    successToast("Data Protection Template Updated Successfully")
                    reloadDP(currentTemplate)
                    router.push('/gateways/'+slug+'/dataProtection')
                    setInProgress(false)  
                }else{                        
                    errorToast(res?.data?.error)
                    setInProgress(false)     
                }                
            })
            .catch((error:any)=>{
                console.log(error)
                errorToast('Some error occurred. Try again later');
                setInProgress(false)     
            })                             
        }
        catch(error){
            console.log(error)
            setInProgress(false)
        }
    }
    const setFormData=(data:any)=>{
        console.log(data);
        setName(data?.name?data?.name:''),        
        setDescription(data?.description?data?.description:''),       
        setTransformation(data?.config?.transformation?.method),        
        setConfidenceThreshold(data?.config?.likelihood?data?.config?.likelihood:'')
        setInfotypes(data?.config?.infoTypes)
        setReject(data?.config?.reject)
        setPrompt(data?.config?.rejectPrompt)
        setNotify(data?.config?.notify)
    }
    const dpFormProps={
        name:name,
        description:description,
        transformation:transformation,
        confidenceThreshold:confidenceThreshold, 
        setName:setName,        
        setDescription:setDescription,       
        setTransformation:setTransformation,        
        setConfidenceThreshold:setConfidenceThreshold,
        infotypes:infotypes,
        setIsResetform:setIsResetform,
        isResetform:isResetform,
        inProgress:inProgress,
        prompt:prompt,
        setPrompt:setPrompt,
        notify:notify,
        setNotify:setNotify,
        reject:reject,
        setReject:setReject,
        saveData: saveData,
    }
    
  return (
    <>
        <div className='flex justify-between items-center flex-wrap mb-2 lg:mb-0'>
            <PageTitle pageTitle="Edit Data Protection" icon={false} breadcrumbData={breadcrumbs} />
            <BackButton url={`/gateways/${params.slug}/dataProtection`} />
        </div>
        <div className='p-4 md:px-6 md:py-6 border rounded-xl bg-white border-blue-700 h-full flex justify-between flex-col min-h-[82vh]'>
            {isLoading?<SpinLoader />:<DataProtectionForm {...dpFormProps} formType='edit' />}
        </div>
    </>
  )
}

export default EditDataProtection