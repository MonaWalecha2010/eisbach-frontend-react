'use client'
import React, {useEffect, useState, useRef} from 'react' 
import { useParams, useRouter } from 'next/navigation'
import { AxiosResponse } from 'axios'
import { useAppSelector } from '@/app/store/hooks';
import { getGateway, getOrg , getUser} from '@/app/store/reducers/gateway.selector';
import PageTitle from '@/app/components/PageTitle'
import AppService from '@/app/services/AppService'
import { sortAlphabeticallyAsce, dateFormatYYYYMMDDhhmm, soryByTime, sortByModifiedAt } from '@/app/helper/sortArray'
import { maskText } from '@/app/helper/textHelper';
import SpinLoader from '@/app/components/loaders/SpinLoader'
import DataNotFound from '@/app/components/messages/DataNotFound'
import { getProvidersService } from '@/app/services/ProviderServices'
import { DeleteIcon, EditIcon, CopyIcon } from '@/app/components/icons/svgIcons'
import DeletePopup from '@/app/components/modal/DeletePopup'
import { successToast, errorToast } from '@/app/helper/toastMsg'
import PopupModal from '@/app/components/modal/PopupModal'
import SecretsForm from './SecretsForm'
import styles from '../../../../styles/styles.module.scss'
import AddButton from '@/app/components/buttons/AddButton'
import TableComponent from '@/app/components/table/TableComponent'
import CopyToClipBoard from '@/app/components/shared/CopyToClipBoard';
import { removeSlashTwenty } from '@/app/helper/UrlHelper';
import { providerImage } from '@/app/components/data/gatwayData';
type SecretsDatatype = {    
    api_key: string
    api_key_secret_key: string
    api_key_secret_name: string
    virtual_key: string
    created_at: string
    enabled : boolean
    group: string
    modified_at: string
    organization: string
}; 
const Secrets = () => {   
    const params = useParams(); 
    const router = useRouter();
    const currentNamespace = removeSlashTwenty(params.slug); 
    const currentOrg = useAppSelector(getOrg)
    // const [gateway, setGateway] = useState<any>([]);   
    const [deleteKeyName, setDeleteKeyName] = useState<string>('')
    const [deleteProviderName, setDeleteProviderName] = useState<string>('')
    const deleteKeyModal = useRef<HTMLDialogElement>(null)
    const activeGateway = useAppSelector(getGateway)
    const currentUser = useAppSelector(getUser);
    const [provider, setProvider] = useState<string>("")    
    const [keyVaultData, setKeyVaultData] = useState<SecretsDatatype[]>([]); 
    const breadcrumbs=[
        { name: 'Home', link: '/'},
        { name: 'Gateways', link: '/gateways'},
        { name: currentNamespace, link: '/gateways/'+currentNamespace},
        { name: 'Secrets', link: '/gateways/'+currentNamespace+'/secrets'}
    ];
    const headingsData=[
        { name:'Name'}, 
        { name:'Virtual Key'},
        { name:'Secret Name'}, 
        { name: 'Group'},
        // { name: 'Enabled'},    
        { name:'created'},
        { name:'Provider'},        
    ]
    const [inProgress, setInProgress] = useState<boolean>(true);    
    const getAllKeyVaults = async() => { 
        setInProgress(true);              
        await AppService.getAllKeyVaults(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id).then((res:AxiosResponse)=>{
            if(res){                                 
                if(res?.status === 200){ 
                    const sortedData= sortByModifiedAt(res?.data);
                    setKeyVaultData(sortedData);        
                }else{
                    setKeyVaultData([])
                } 
                setInProgress(false);               
            }
        })
    }         
    useEffect(()=>{
        if(activeGateway && activeGateway!==undefined){
            getAllKeyVaults();
        }
    },[activeGateway]);    
    const deleteConfirmation=(name: string, provider:string)=>{        
        if(name === ''){
            return;
        }
        else{
            setDeleteKeyName(name);
            setDeleteProviderName(provider)
            if (deleteKeyModal?.current) {           
                deleteKeyModal.current.show();
            }
        }
    }
    const deleteKeyVault=()=>{
        try{
            AppService.deleteKeyVault(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id, deleteProviderName, deleteKeyName)
            .then((res:AxiosResponse) => {
                getAllKeyVaults()
                successToast('Secret Deleted Successfully');
                deleteKeyModal?.current?.close();
            })
            .catch((error:any)=>{                
                errorToast('Some Error Occurred. Please try again Later');
                deleteKeyModal?.current?.close();
            })
        }
        catch(error){
            console.log(error)
        }
    } 
    const updateKeyData=(data:any, status:boolean)=>{
        let params={
            api_key:data?.api_key,
            api_key_secret_key:data?.api_key_secret_key,
            api_key_secret_name:data?.api_key_secret_name,
            v_api_key_secret_key: data?.v_api_key_secret_key,
            group:data?.group,
            // organization: data?.organisation,
            enabled:status,
        };           
        try{
            AppService.updateKeyVault(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.id, provider, params)
            .then((res:AxiosResponse) => {               
                if(res?.status === 200){
                    successToast("Key Enabled Successfully")
                    getAllKeyVaults();   
                }else{
                    errorToast(res?.data?.message)
                }
            }).catch((error:any)=>{
                console.log(error)
                errorToast('Some error occurred. Try again later');
            })
        }
        catch(error){
            console.log(error)
        }
    } 
    return (
        <>
            <div className='flex justify-between items-center flex-wrap mb-2 lg:mb-0'>                
                <PageTitle pageTitle="Secrets" icon={false} breadcrumbData={breadcrumbs}  />
                <div className='ml-auto flex items-center'>
                    <AddButton url={`/gateways/${currentNamespace}/secrets/addSecret`} click={()=>{}} btnClass='mr-3' btnSm={true} /> 
                </div>               
                <div className={`group `}>
                    {/* <label className="label py-[.25rem] pr-[16px] text-sm">
                        <span className={`text-primary-100`}> Select Provider </span>
                    </label> 
                    <div className="tooltip group-hover:tooltip-open tooltip-top w-full " data-tip="Select Provider" >
                        <select className={`select select-bordered text-sm text-black-600 placeholder:text-gray-700  placeholder:text-sm border-[#E3DFFD] shadow-inputShadow w-full focus:outline-none lg:min-w-[150px] h-[2.5rem] min-h-[2.5rem]`} 
                            onChange={(e)=>setProvider(e.target.value)}
                        >
                            <option className="capitalize text-sm" value="" >Select Provider</option>				
                            {providerOptions && providerOptions.map((option:any, index:any) => {
                                return <option className="text-black-600 text-sm" key={index} value={option.name}>{option.name}</option>
                            })}
                        </select>
                    </div>
                    */}
                </div>  
            </div>
            <div className='p-2 xs:p-4 md:px-6 md:py-6 border rounded-xl bg-white border-blue-700 h-full flex justify-between flex-col min-h-[82vh]'>                
                {
                    inProgress ? <SpinLoader />:(<>
                        {keyVaultData && keyVaultData?.length===0?<DataNotFound message='You haven&#39;t added any secrets yet' />:<>
                        <TableComponent headingsData={headingsData} actions={true} bodyClassName={`text-black-100 ${styles.fontMenlo} `}>
                            {keyVaultData.map((item:any, index:number)=>{ 
                                let maskVal= item?.api_key_secret_key_javelin.substring(0,10) 
                                let pImage = item?.provider_name?providerImage(item?.provider_name):item?.provider_name;                                                                       
                                return(   
                                    <tr key={`row-${index}`} className={`border-b-1 font-light`}>                            
                                        <td>{item?.api_key}</td>                                            
                                        <td>                                               
                                            <div className='flex items-center'>
                                                <span className='mr-3'>{maskText(maskVal)}</span>
                                                <CopyToClipBoard id={`cp-${index}`} text={item?.api_key_secret_key_javelin} />
                                            </div>
                                        </td> 
                                        <td>{item?.api_key_secret_name}</td>
                                        <td>{(item?.group)}</td>                                            
                                        {/* <td>
                                            <div className="form-control">
                                                <label className={`label cursor-pointer mr-2 ${styles.toggle_switch}`}>
                                                    <input  
                                                        id={`routeStatus_${index}`}              
                                                        type="checkbox" 
                                                        className={`toggle`}
                                                        defaultChecked={item?.enabled} 
                                                        onChange={(e:any)=>{
                                                            setProvider(item?.provider)
                                                            updateKeyData(item, e?.target?.checked)
                                                        }}
                                                    />
                                                    <span className={`${styles.slider} ${styles.round}`}></span>
                                                </label>                       
                                            </div> 
                                        </td>  */}
                                        <td>{dateFormatYYYYMMDDhhmm(item?.created_at)}</td>
                                        <td>
                                            {pImage!== undefined && pImage!==''?<div className='max-w-[5.5rem]'>
                                                <img src={pImage} alt={item?.provider} className='w-full h-auto object-cover' />
                                            </div>:''}
                                        </td>
                                        <td>
                                            <div className='flex items-center'>                                                
                                                <div className='mx-1 inline-flex items-center justify-center w-[22px] h-[22px] bg-silver-700 rounded-full'><button type='button' className='inline-flex items-center justify-center mx-1' onClick={()=>router.push(`/gateways/${currentNamespace}/secrets/${item?.api_key}/${item?.provider_name}`)}><EditIcon /></button></div>
                                                <div className='mx-1 inline-flex items-center justify-center w-[22px] h-[22px] bg-silver-700 rounded-full'><button type='button' className='' onClick={()=>deleteConfirmation(item?.api_key, item?.provider_name)}><DeleteIcon /></button></div>
                                                
                                            </div>
                                        </td>
                                    </tr>                       
                                )}
                            )}
                        </TableComponent> 
                        </>}                           
                    </>)                        
                     
                }                
            </div>
            <DeletePopup 
                modalId="deleteRoute" width='md:w-[28.123rem] mx-w-3xl'
                modalRef={deleteKeyModal}
                message="Are You Sure You Want to Remove This Key" 
                deleteAction={deleteKeyVault}
            />           
        </>
    );
}
export default Secrets