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
import SpinLoader from '@/app/components/loaders/SpinLoader';
import { setRequestMeta } from 'next/dist/server/request-meta';
type DataProtections={
    name:string
    type: string 
    created_by: string 
    created: string 
    enabled: boolean   
}
const EditSecret = () => {
    const params = useParams()
    const slug = params.slug
    const router= useRouter() 
    const currentNamespace = removeSlashTwenty(params.slug)   
    const currentsecret = params.id[0] as string
    const currentProvider = params.id[1] as string
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
            name: `Edit Secret`,
            link: `/gateways/${currentNamespace}/secrets/${currentsecret}/${currentProvider}`
        }        
    ] 
    const [api_key , setapi_key] = useState<string>('')
    const [api_key_secret_name, setapi_key_secret_name] = useState<string>('')
    const [api_key_secret_key, setapi_key_secret_key] = useState<string>('')
    const [virtual_key, set_virtual_key ] = useState<string>('');
    const [Key_type, set_secret_Key_type] = useState<string>('')
    const [query_param_key, set_query_param_key] = useState<string>('')
    const [header_key, set_header_key] = useState<string>('')
    // const [organisation, setOrg ] = useState<string>('');
    const [group , setgroup] = useState<string>('')    
    const [inProgress, setInProgress] = useState<boolean>(false)   
    const [isResetform, setIsResetform] = useState<boolean>(false)  
    useEffect(()=>{
        const getDPData = async() => {
            setInProgress(true)       
            try{
                setIsResetform(false);                
                AppService.getKeyVault(activeGateway?.base_url , activeGateway?.api_key_value, activeUser?.id, currentProvider, currentsecret)
                .then((res:AxiosResponse) => {
                    if(res?.status === 200){                        
                        setapi_key(res?.data?.api_key)
                        setapi_key_secret_key(res?.data?.api_key_secret_key)
                        setapi_key_secret_name(res?.data?.api_key_secret_name)
                        setgroup(res?.data?.group)
                        set_virtual_key(res?.data?.api_key_secret_key_javelin?res?.data?.api_key_secret_key_javelin:'')  
                        set_query_param_key(res?.data?.query_param_key?res?.data?.query_param_key:'')  
                        set_header_key(res?.data?.header_key?res?.data?.header_key:'') 
                        if(res?.data?.header_key){
                            set_secret_Key_type('header_key')
                        }else if(res?.data?.query_param_key){
                            set_secret_Key_type('query_params')
                        }else{
                            set_secret_Key_type('')
                        }                                            
                    }
                    else if(res?.status === 500){
                        errorToast(`Some Error Occurred. Can't load data for ${currentsecret}. Please try again Later`);
                    }else{
                        errorToast(res?.data?.message);
                    }
                    setInProgress(false)
                })
                .catch((error:any)=>{
                    console.log(error);
                })
            }
            catch(error){
                console.log(error);
            }
        }
        getDPData();
    },[currentsecret])     
    const saveData=async(params:any)=>{                
        setInProgress(true)
        try{
            let param = {...params } 
            await AppService.updateKeyVault(activeGateway?.base_url , activeGateway?.api_key_value, activeUser?.id, currentProvider, param)
            .then((res:AxiosResponse) => {                
                if(res?.status === 200){
                    successToast("Key Updated Successfully")                  
                    router.push(`/gateways/${currentNamespace}/secrets`)
                }else{
                    errorToast(res?.data?.message)
                }
                setInProgress(false)
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
  return (
    <>
        <div className='flex justify-between items-center flex-wrap mb-2 lg:mb-0'>
            <PageTitle pageTitle="Edit Secret" icon={false} breadcrumbData={breadcrumbs} />
            <BackButton url={`/gateways/${params.slug}/secrets`} />
        </div>
        <div className='px-6 py-6 border rounded-xl bg-white border-blue-700 h-full flex justify-between flex-col min-h-[82vh]'>
            {inProgress===true?(<SpinLoader />):(
                <SecretsForm 
                    setapi_key={setapi_key}
                    setapi_key_secret_key={setapi_key_secret_key}
                    setapi_key_secret_name={setapi_key_secret_name}
                    // setOrg={setOrg}
                    setgroup={setgroup}
                    api_key={api_key}
                    api_key_secret_key={api_key_secret_key}
                    api_key_secret_name={api_key_secret_name}
                    virtual_key={virtual_key}
                    // organisation={organisation}
                    group={group}
                    provider={currentProvider}
                    // setProvider={setProvider}
                    set_secret_Key_type={set_secret_Key_type}
                    set_header_key={set_header_key}
                    set_query_param_key={set_query_param_key}
                    secret_Key_type={Key_type}
                    header_key={header_key}
                    query_param_key={query_param_key}
                    form_type="edit"
                    saveKeyData={saveData}
                    isResetform={isResetform}
                    setIsResetform={setIsResetform}                  
                />  
            )}  
        </div>
    </>
  )
}

export default EditSecret
