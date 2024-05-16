'use client';
import React, {useEffect, useState} from 'react'
import { AxiosResponse } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import ProviderForm from '../ProviderForm';
import PageTitle from '@/app/components/PageTitle'
import BackButton from '@/app/components/buttons/BackButton'
import { removeSlashTwenty } from '@/app/helper/UrlHelper'
import AppService from '@/app/services/AppService';
import { getGateway, getUser } from '@/app/store/reducers/gateway.selector';
import { useAppSelector } from '@/app/store/hooks'
import { successToast, errorToast } from '@/app/helper/toastMsg';
import { addProviderService, reloadProviderService } from '@/app/services/ProviderServices';
import { sortAlphabeticallyAsce } from '@/app/helper/sortArray';
import { updateOrgMetaDataLastUpdated } from '@/app/helper/axiosHeaderHelper';
import { useAppDispatch } from '@/app/store/hooks';
import { setOrg } from '@/app/store/reducers/gateway.reducer';

const AddProvider = () => {
    const dispatch = useAppDispatch()
    const params = useParams()   
    const router= useRouter()  
    const currentNamespace = removeSlashTwenty(params.slug)   
    const activeGateway = useAppSelector(getGateway)  
    const currentUser = useAppSelector(getUser)  
    const breadcrumbs=[
        { name: 'Home', link: '/' },
        { name: 'Gateways', link: '/gateways'},
        { name: currentNamespace, link: '/gateways/'+currentNamespace},
        { name: 'Configuration', link: `/gateways/${currentNamespace}`},
        { name: `Add Provider`, link: `/gateways/${currentNamespace}/addProvider`}        
    ]   
    const [providersList, setProvidersList]=useState<[]>();   
    const [deleteProviderName, setDeleteProviderName] = useState<string>('')    
    //Provider Form Parameters
    const [ providerName , setProviderName] = useState<string>('')
    const [ providerType , setProviderType] = useState<string>('')
    // const [ providerApiKey , setProviderApiKey] = useState<string>('')
    const [ providerApiType , setProviderApiType] = useState<string>('')
    const [ providerApiUrl , setProviderApiUrl] = useState<string>('')
    const [ providerApiVersion , setProviderApiVersion] = useState<string>('')
    const [ providerOrg , setProviderOrg] = useState<string>('')
    const [ providerdepName , setProviderDepName] = useState<string>('')   
    const [isResetform, setIsResetform] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)    
    const updateLastUpdated = async() => {
        let data = await updateOrgMetaDataLastUpdated(
            currentUser?.organizationMemberships[0]?.organization?.id,
            currentUser?.organizationMemberships[0]?.organization?.publicMetadata,
            activeGateway?.namespace
        )       
        if(data !== undefined){ dispatch(setOrg(data)) }
    } 
    const reloadProvider=(name:string)=>{
        try{
            reloadProviderService(activeGateway?.base_url, activeGateway?.api_key_value, currentUser?.id, name).then((res:AxiosResponse)=>{
                console.log(res)
            })
        }catch(error){console.log(error)}
    }
    const saveProviderData = (params:any) => {
        try{
            addProviderService(activeGateway?.base_url , activeGateway?.api_key_value ,currentUser?.id , params)
            .then((res:AxiosResponse) => {               
                if(res?.status === 200){
                    successToast("Provider Added Successfully");
                    reloadProvider(params?.name)
                    router.push(`/gateways/${currentNamespace}`)
                    // resetProvider();
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
    
  return (
    <>
        <div className='flex justify-between items-center flex-wrap mb-2 lg:mb-0'>
            <PageTitle pageTitle="Add Route" icon={false} breadcrumbData={breadcrumbs} />
            <BackButton url={{pathname: `/gateways/${params.slug}`,
                                query: {tab:'LLM Provider'}
                            }}
            />
            {/* <BackButton url={`/gateways/${params.slug}`} /> */}
        </div>
        <div className='px-6 py-6 border rounded-xl bg-white border-blue-700 h-full flex justify-between flex-col min-h-[82vh]'>
            <ProviderForm 
                providerName={providerName}
                providerType={providerType}
                // providerApiKey={providerApiKey}
                providerApiType={providerApiType}
                providerApiUrl={providerApiUrl}
                providerApiVersion={providerApiVersion}
                providerOrg={providerOrg}
                providerdepName={providerdepName}
                setProviderName={setProviderName}
                setProviderType={setProviderType}
                // setProviderApiKey={setProviderApiKey}
                setProviderApiType={setProviderApiType}
                setProviderApiUrl={setProviderApiUrl}
                setProviderApiVersion={setProviderApiVersion}
                setProviderOrg={setProviderOrg}
                setProviderDepName={setProviderDepName}
                saveProviderData={saveProviderData}
                // isResetform={isResetProvform} 
                // setIsResetform={setIsResetProvform}
            />
        </div>
    </>
  )
}

export default AddProvider
