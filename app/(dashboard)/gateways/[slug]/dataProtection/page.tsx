'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link'
import { AxiosResponse } from 'axios'
import styles from '../../../../styles/styles.module.scss'
import PageTitle from '@/app/components/PageTitle'
import { DataProtectionData } from '@/app/components/data/gatwayData'
import TableComponent from '@/app/components/table/TableComponent'
import { getGateway, getUser } from '@/app/store/reducers/gateway.selector';
import { useAppSelector } from '@/app/store/hooks'
import AppService from '@/app/services/AppService'
import { dateFormatYYYYMMDDhhmm, sortByModifiedAt } from '@/app/helper/sortArray'
import DeletePopup from '@/app/components/modal/DeletePopup'
import { EditIcon, DeleteIcon } from '@/app/components/icons/svgIcons'
import SpinLoader from '@/app/components/loaders/SpinLoader'
import DataNotFound from '@/app/components/messages/DataNotFound'
import { removeSlashTwenty } from '@/app/helper/UrlHelper'
import AddButton from '@/app/components/buttons/AddButton';
import { successToast, errorToast } from '@/app/helper/toastMsg';

type DataProtections={
    name:string
    type: string     
    description: string 
    enabled: boolean
    config: {infoTypes:{name:string}[]}   
    created_at: string
    modified_at: string    
}
const DataProtection = () => {
    const params = useParams();
    const router= useRouter();    
    const currentNamespace = removeSlashTwenty(params.slug); 
    const activeGateway = useAppSelector(getGateway)
    const activeUser = useAppSelector(getUser)
    const deleteDataProtectionRef = useRef<HTMLDialogElement>(null)
    const [deleteDPName, setDeleteDPName] = useState<string>('')  
    const [inProgress, setInProgress] = useState<boolean>(true)
    const breadcrumbs=[
        { name: 'Home', link: '/'},
        { name: 'Gateways', link: '/gateways'},
        { name: currentNamespace, link: '/gateways/'+currentNamespace},
        { name: 'Data Protection', link: '/gateways/'+currentNamespace+'/dataProtection'}
    ];
    const headingsData=[
        { name:'Strategy Name'}, 
        { name:'Type'},               
        { name:'Enabled'}, 
        { name:'Description'},
        { name: 'Created'}
    ]
    const [dataProtections, setDataProtections] = useState<DataProtections[]>([])
    const getProtectionData = async() => {         
        setInProgress(true)       
        try{
            await AppService.getDataProtections(activeGateway?.base_url , activeGateway?.api_key_value, activeUser?.id).then((res:AxiosResponse)=>{
                if(res){         
                    if(res?.status === 200){
                        // let key='modified_at';                       
                        const sortedData= sortByModifiedAt(res?.data) as [];
                        if(sortedData && sortedData?.length>0){                                                 
                            setDataProtections(sortedData);
                        } 
                    } else{
                        setDataProtections([])
                    }                         
                }
            }).catch((error:any)=>{
                console.log(error);
            })
            setInProgress(false);
        }catch(error:any){
            setInProgress(false)
        }
    }
    useEffect(()=>{
        getProtectionData();
    },[])
    const reloadDP=(tempName:string)=>{
        try{
            AppService.reloadDataProtection(activeGateway?.base_url, activeGateway?.api_key_value, activeUser?.id, tempName).then((res:AxiosResponse)=>{
                console.log(res)
            })
        }catch(error){console.log(error)}
    }
    const updateDataProtection=async(data:any, enabled:boolean)=>{   
        let user=activeUser?.id
        let param = {
            name: data?.name,
            description: data?.description,
            enabled: enabled,
            type: data?.transformation && data?.transformation === 'Inspect Only'?'inspect':'de-identify',
            models: [{
                name: "Sensitive Data Protection",
                provider: "Google Cloud",
                suffix: "",
                weight: 0
            }],
            config: {
                infoTypes: data?.config?.infoTypes,
                likelihood: data?.config?.likelihood,
                transformation: {
                    method: data?.config?.transformation?.method
                }
            }
        };
        try{            
            await AppService.updateDataProtection(activeGateway?.base_url, activeGateway?.api_key_value, user, param)
            .then((res:AxiosResponse) => {                
                if(res?.status === 200){
                    successToast("Template Status Updated Successfully")
                    reloadDP(param?.name)
                    getProtectionData()                                         
                }else{                        
                    errorToast(res?.data?.error)
                }                
            })
            .catch((error:any)=>{
                console.log(error)
                errorToast('Some error occurred. Try again later');
               
            })                 
        }
        catch(error){  console.log(error)}
    }    
    const deleteDataProtection=()=>{
        let user=activeUser?.id
        try{
            AppService.deleteDataProtection(activeGateway?.base_url , activeGateway?.api_key_value, user, deleteDPName)
            .then((res:AxiosResponse) => {                
                getProtectionData();
                successToast('Data Protection Template Deleted Successfully');
                deleteDataProtectionRef?.current?.close();
            })
            .catch((error:any)=>{                
                errorToast('Some Error Occurred. Please try again Later');
                deleteDataProtectionRef?.current?.close();
            })
        }
        catch(error){
            console.log(error)
        }
    }
    const deleteConfirmation=(name: string)=>{        
        if(name === ''){
            return;
        }
        else{
            setDeleteDPName(name);
            if (deleteDataProtectionRef?.current) {           
                deleteDataProtectionRef.current.show();
            }
        }
    }
    return (
        <>        
            <div className='flex justify-between flex-wrap items-center mb-2 lg:mb-0'>
                <PageTitle pageTitle="Data Protection" icon={false} breadcrumbData={breadcrumbs} /> 
                <AddButton click={()=>router.push('/gateways/'+params.slug+'/dataProtection/addDataProtection')} btnClass=' mr-3' btnSm={true} /> 
            </div>
            <div className='p-4 md:px-6 md:py-6 border rounded-xl bg-white border-blue-700 h-full'>
                {/* <h1 className='text-[1.5rem] font-bold'>Data Protection</h1> */}   
                <TableComponent headingsData={headingsData} actions={true} bodyClassName='text-black-100' >
                    {inProgress?<tr><td colSpan={6}><SpinLoader /></td></tr>:dataProtections && dataProtections?.length===0?<tr><td colSpan={6}><DataNotFound message='You haven&#39;t added any Data Protection Strategies yet.' /></td></tr>:(<>
                        {dataProtections.map((item:any, index:number)=>{                                     
                            return(   
                                <tr key={`row-${index}`} className={`border-b-1 font-light ${styles.fontMenlo}`}>                            
                                    <td>{item?.name}</td> 
                                    <td>{item?.type}</td>                                                                               
                                    <td>
                                        <div className="form-control">
                                            <label className={`label cursor-pointer mr-2 ${styles.toggle_switch}`}>
                                                <input  
                                                    id={`routeStatus_${index}`}              
                                                    type="checkbox" 
                                                    className={`toggle`}
                                                    defaultChecked={item?.enabled} 
                                                    onChange={(e:any)=>updateDataProtection(item, e?.target?.checked)}
                                                />
                                                <span className={`${styles.slider} ${styles.round}`}></span>
                                            </label>                       
                                        </div> 
                                    </td> 
                                    <td>{item?.description}</td>
                                    <td>{dateFormatYYYYMMDDhhmm(item?.created_at)}</td>
                                    <td>
                                        <div className='flex items-center'>
                                            <div className='mx-1 inline-flex items-center justify-center w-[22px] h-[22px] bg-silver-700 rounded-full'>
                                                <Link className='inline-flex items-center justify-center mx-1' href={`/gateways/${params.slug}/dataProtection/${item?.name}`}><EditIcon /></Link>
                                            </div>
                                            <div className='mx-1 inline-flex items-center justify-center w-[22px] h-[22px] bg-silver-700 rounded-full'><button type='button' className='' onClick={()=>deleteConfirmation(item?.name)}><DeleteIcon /></button></div>                                        
                                        </div>
                                    </td>
                                </tr>                       
                            )}
                        )}
                    </>)}
                </TableComponent>                                          
                {/* <div className='px-[2.5rem] py-4'>
                    <p className='text-[1rem] text-black-500'>Data Protection helps you discover, classify, and de-identify sensitive data. The inspect identify sensitive data exchanged between your applications and LLM providers. You can specify actions that you want to take like reject the request or notify security operations.</p>
                    <p className='text-[1rem] text-black-500'>The De-identication lets you obfuscate and various transformation methods are currently supported:</p>
                    <div className='my-3'>                
                        <h2 className='text-xl font-bold text-primary-100'>Inspect</h2>
                        <p className='text-[1rem] text-black-500'>Scan sensitive data between applications and LLM providers.</p>
                    </div>
                    <div>
                        <h2 className='text-xl font-bold text-primary-100'>De-identification Methods: </h2>
                        <div className='my-3'>
                            <h3 className='text-lg font-bold text-primary-100'>Mask</h3>  
                            <p className='text-[1rem] text-black-500'>This method replaces sensitive data with a character, like a hash (#) or an asterisk (*)
                            . For instance, a credit card number like &quot;1234 5678 9101 1121&quot; could be masked as &quot;#### #### #### 1121&quot;.</p>
                        </div>
                        <div className='my-3'>
                            <h3 className='text-lg font-bold text-primary-100'>Redact</h3>  
                            <p className='text-[1rem] text-black-500'>This method completely removes the sensitive data from the text. Example: My name is Get Javelin, and my email address is javelin@example.com, the email &quot;javelin@example.com&quot; is detected and removed from the text.</p>
                        </div>
                        <div className='my-3'>
                            <h3 className='text-lg font-bold text-primary-100'>Replace</h3>  
                            <p className='text-[1rem] text-black-500'>This method swaps out the sensitive data with a substitute value. For example, an email address could be replaced with &quot;user@domain.com&quot;.</p>
                        </div>
                        <div className='my-3'>
                            <h3 className='text-lg font-bold text-primary-100'>Anonymization</h3>  
                            <p className='text-[1rem text-black-500'>This method replaces sensitive data with a cryptographic hash. Hash for &quot;javelin@example.com&quot;: a6c2f5a8b6f2c3d...</p>
                        </div>
                        <div className='my-3'>
                            <h3 className='text-lg font-bold text-primary-100'>Supported Data Types</h3>  
                            <p className='text-[1rem] text-black-500'>As of now, system supports Text data, on the roadmap extending support to other data types such as images, documents, and structured data.</p>
                        </div>
                    </div>  
                </div> */}
            </div>
            <DeletePopup 
                modalId="deleteRoute" width='md:w-[28.123rem] mx-w-3xl'
                modalRef={deleteDataProtectionRef}
                message={`Are You Sure You Want to Remove This Data Protection`}
                deleteAction={deleteDataProtection}
            />
        </>
    );
}
export default DataProtection