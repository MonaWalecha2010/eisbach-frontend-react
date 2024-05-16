'use client';
import React, {useEffect, useState} from 'react'
import { AxiosResponse } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import SecretsForm from '../SecretsForm';
import PageTitle from '@/app/components/PageTitle'
import BackButton from '@/app/components/buttons/BackButton'
import { removeSlashTwenty } from '@/app/helper/UrlHelper'
import AppService from '@/app/services/AppService';
import { getGateway, getUser } from '@/app/store/reducers/gateway.selector';
import { useAppSelector } from '@/app/store/hooks'
import { successToast, errorToast } from '@/app/helper/toastMsg';
import { getProvidersService } from '@/app/services/ProviderServices';
import { sortAlphabeticallyAsce } from '@/app/helper/sortArray';
type DataProtections={
    name:string
    type: string 
    created_by: string 
    created: string 
    enabled: boolean   
}
const AddSecret = () => {
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
        { name: 'Secrets', link: '/gateways/'+currentNamespace+'/secrets'},
        {
            name: `Add Secret`,
            link: '/gateways/'+currentNamespace+'/secrets/addSecret'
        }        
    ] 
    const [provider, setProvider] = useState<string>('')
    const [api_key , setapi_key] = useState<string>('')
    const [api_key_secret_name, setapi_key_secret_name] = useState<string>('')
    const [api_key_secret_key, setapi_key_secret_key] = useState<string>('')    
    const [Key_type, set_secret_Key_type] = useState<string>('')
    const [query_param_key, set_query_param_key] = useState<string>('')
    const [header_key, set_header_key] = useState<string>('')
    
    // const [organisation, setOrg ] = useState<string>('');
    const [group , setgroup] = useState<string>('')    
    const [inProgress, setInProgress] = useState<boolean>(false)   
    const [isResetform, setIsResetform] = useState<boolean>(false)  
    const [providerOptions , setproviderOptions] = useState<any>([]) 
    const getProviders=async()=>{             
        await getProvidersService(activeGateway?.base_url, activeGateway?.api_key_value, activeUser?.id).then((res:AxiosResponse)=>{
            if(res){
                if(res?.status === 200){                   
                    const sortData = sortAlphabeticallyAsce(res.data) as []; 
                    let options:any=[];
                    if (sortData){
                        sortData.map((data:any)=>{
                            options=[...options, {displayValue:data?.name, value:data?.name}]
                        })
                        setproviderOptions([...options])
                    }            
                }                
            }
        })
    } 
    useEffect(()=>{
        getProviders()
    },[])
    const saveData=async(params:any)=>{                
        setInProgress(true)
        let user=activeUser?.id
        try{
            let param = {...params } 
            await AppService.addKeyVault(activeGateway?.base_url , activeGateway?.api_key_value, activeUser?.id, provider, param)
            .then((res:AxiosResponse) => {                
                if(res?.status === 200){
                    successToast("Key Added Successfully")                        
                    router.push(`/gateways/${currentNamespace}/secrets`)
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
  return (
    <>
        <div className='flex justify-between items-center flex-wrap mb-2 lg:mb-0'>
            <PageTitle pageTitle="Add Secret" icon={false} breadcrumbData={breadcrumbs} />
            <BackButton url={`/gateways/${params.slug}/secrets`} />
        </div>
        <div className='px-6 py-6 border rounded-xl bg-white border-blue-700 h-full flex justify-between flex-col min-h-[82vh]'>
            <SecretsForm 
                api_key={api_key}
                api_key_secret_key={api_key_secret_key}
                api_key_secret_name={api_key_secret_name}            
                // organisation={organisation}
                group={group}
                provider={provider}
                setProvider={setProvider}
                setapi_key={setapi_key}
                setapi_key_secret_key={setapi_key_secret_key}
                setapi_key_secret_name={setapi_key_secret_name}
                set_secret_Key_type={set_secret_Key_type}
                set_header_key={set_header_key}
                set_query_param_key={set_query_param_key}
                secret_Key_type={Key_type}
                header_key={header_key}
                query_param_key={query_param_key}
                form_type="add"
                // setOrg={setOrg}
                setgroup={setgroup}
                saveKeyData={saveData}
                isResetform={isResetform}
                setIsResetform={setIsResetform}
                providersOptions={providerOptions}
            />    
        </div>
    </>
  )
}

export default AddSecret
