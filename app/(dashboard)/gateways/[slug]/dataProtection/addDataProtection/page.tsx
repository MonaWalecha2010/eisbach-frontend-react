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
import { successToast, errorToast } from '@/app/helper/toastMsg';

type DataProtections={
    name:string
    type: string 
    created_by: string 
    created: string 
    enabled: boolean   
}
const AddDataProtection = () => {
    const params = useParams()
    const slug = params.slug
    const router= useRouter()   
    const currentNamespace = removeSlashTwenty(params.slug)   
    const activeGateway = useAppSelector(getGateway)  
    const activeUser = useAppSelector(getUser)  
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
            name: `Add Data Protection`,
            link: '/gateways/'+currentNamespace+'/dataProtection/addDataProtection'
        }        
    ]   
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [transformation, setTransformation] = useState<string>('')
    const [confidenceThreshold, setConfidenceThreshold] = useState<string>('')
    const [prompt, setPrompt] = useState<string>('');     
    const [notify, setNotify] = useState<boolean>(false)   
    const [reject, setReject] = useState<boolean>(false)   
    const [inProgress, setInProgress] = useState<boolean>(false)   
    const [isResetform, setIsResetform] = useState<boolean>(false)  
    const reloadDP=(tempName:string)=>{
        try{
            AppService.reloadDataProtection(activeGateway?.base_url, activeGateway?.api_key_value, activeUser?.id, tempName).then((res:AxiosResponse)=>{
                console.log(res)
            })
        }catch(error){console.log(error)}
    } 
    const saveData=async(params:any)=>{                
        setInProgress(true)
        let user=activeUser?.id
        try{
            let param = {...params } 
            await AppService.addDataProtection(activeGateway?.base_url, activeGateway?.api_key_value, user, param)
            .then((res:AxiosResponse) => {                
                if(res?.status === 200){
                    successToast("Data Protection Template Added Successfully")
                    reloadDP(param?.name)
                    router.push('/gateways/'+slug+'/dataProtection')
                                         
                }else{                        
                    errorToast(res?.data?.error)
                }                
            })
            .catch((error:any)=>{
                console.log(error)
                errorToast('Some error occurred. Try again later');
               
            })
            setInProgress(false)                      
        }
        catch(error)
        {
            console.log(error)
            setInProgress(false)
        }
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
        infotypes:[],
        setIsResetform:setIsResetform,
        isResetform:isResetform,
        inProgress:inProgress,
        saveData: saveData,
        prompt:prompt,
        setPrompt:setPrompt,
        notify:notify,
        setNotify:setNotify,
        reject:reject,
        setReject:setReject
    }
    
  return (
    <>
        <div className='flex justify-between items-center flex-wrap mb-2 lg:mb-0'>
            <PageTitle pageTitle="Add Data Protection" icon={false} breadcrumbData={breadcrumbs} />
            <BackButton url={`/gateways/${params.slug}/dataProtection`} />
        </div>
        <div className='p-4 md:px-6 md:py-6 border rounded-xl bg-white border-blue-700 h-full flex justify-between flex-col min-h-[82vh]'>
            <DataProtectionForm {...dpFormProps} formType='add' />
        </div>
    </>
  )
}

export default AddDataProtection
