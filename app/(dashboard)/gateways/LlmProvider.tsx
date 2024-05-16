import React, {useState, useEffect, useRef} from 'react'
import { DeleteIcon } from '@/app/components/icons/svgIcons'
import { GatewayLlmData, findProviderImage } from '@/app/components/data/gatwayData'
import CardOne from '@/app/components/card/CardOne'
import TextOne from '@/app/components/texts/TextOne'
import { getProvidersService, getProviderService, deleteProviderService, updateProviderService, reloadProviderService } from '@/app/services/ProviderServices'
import { successToast, errorToast } from '@/app/helper/toastMsg'
import { sortAlphabeticallyAsce } from '@/app/helper/sortArray'
import { AxiosResponse } from 'axios'
import DeletePopup from '@/app/components/modal/DeletePopup'
import PopupModal from '@/app/components/modal/PopupModal'
import DataNotFound from '@/app/components/messages/DataNotFound'
import SpinLoader from '@/app/components/loaders/SpinLoader'
import Link from 'next/link';
type ProviderConfigProps={ 
  currentTab: string;
  activeGateway:any;
  currentUser:any;
  currentNamespace:any;
  updateLastUpdated: ()=>void;
}
const LlmProvider:React.FC<ProviderConfigProps> = ({currentNamespace, currentTab, activeGateway, currentUser, updateLastUpdated}) => {    
    const [providersList, setProvidersList]=useState<[]>([]);   
    const [deleteProviderName, setDeleteProviderName] = useState<string>('')
    const deleteProviderModal = useRef<HTMLDialogElement>(null)   
    const [isLoading, setIsLoading] = useState<boolean>(false)
    //******************** */
    const getProviders=async()=>{        
        try{
          getProvidersService(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id).
          then((res:AxiosResponse) => {
            if(res?.status === 200){                   
                const sortData = sortAlphabeticallyAsce(res.data) as []; 
                setProvidersList(sortData);  
                setIsLoading(false)                  
            } 
          })
        }
        catch(error){
          console.log(error);
        }
    }
    useEffect(()=>{ 
        if(providersList && providersList?.length===0 && currentTab==='LLM Provider'){
            setIsLoading(true)
            getProviders();  
        }    
    },[currentTab]);
    const deleteProviderConfirmation=(name: string)=>{
        if(name === ''){
            return;
        }
        else{
            setDeleteProviderName(name);
            if (deleteProviderModal?.current) {           
                deleteProviderModal.current.show();
            }
        }
    }
    const deleteProvider=()=>{
        try{
            deleteProviderService(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id, deleteProviderName)
            .then((res:AxiosResponse) => {                
                getProviders();
                successToast('Provider Deleted Successfully');
                deleteProviderModal?.current?.close();
                updateLastUpdated()
            })
            .catch((error:any)=>{
                console.log(error);
                errorToast('Some Error Occurred. Please try again Later');
                deleteProviderModal?.current?.close();
            })
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <div className='flex flex-wrap gap-5'>
            {providersList && providersList?.length>0 ? providersList.map((item:any, index:number)=>{                
                let pImage = findProviderImage(item?.name, item?.config?.api_base);                
                return(
                <CardOne key={`llm-provd-${index}`} classList='relative rounded-xl w-full mx-auto sm:mx-0 max-w-[17.5rem] sm:max-w-auto sm:min-w-[17.5rem] sm:w-auto px-[.813rem] lg:py-[1.5rem] py-[32px]'>
                    <div className='absolute top-2 right-3'>                    
                    <button type='button' className='inline-flex items-center justify-center' onClick={()=>deleteProviderConfirmation(item?.name)}><DeleteIcon /></button>
                    </div> 
                    <Link className='cursor-pointer' href={`/gateways/${currentNamespace}/provider/${item?.name}`}>  
                        {pImage!== undefined && pImage!=='' ? (
                            <div className='mb-4'>
                            <p className='text-xs text-gray-800 mb-2 uppercase'>Provider</p>
                            <img src={pImage} alt={item?.name} width={100} />
                            </div>
                        ): (<>
                            {item?.name && <TextOne heading="Provider" desc={item?.name} />}
                        </>)}
                        <TextOne heading={item?.type} desc={''} />
                    </Link> 
                </CardOne>
            )}):isLoading?<SpinLoader />:<>
                <DataNotFound message='Providers data not found on this gateway.' />
            </>}
            {providersList && providersList?.length>0 && <>
                <DeletePopup 
                    modalId="deleteRoute" width='md:w-[28.123rem] mx-w-3xl'
                    modalRef={deleteProviderModal}
                    message="Are You Sure You Want to Remove This Provider" 
                    deleteAction={deleteProvider}
                />            
            </>} 
        </div>
    )
}
export default LlmProvider