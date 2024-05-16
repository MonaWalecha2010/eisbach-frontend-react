'use client';
import React, { useEffect, useState, useRef } from 'react'
import PageTitle from '@/app/components/PageTitle'
import { getOrg, getGateway, getUser } from '@/app/store/reducers/gateway.selector'
import { useAppSelector } from '@/app/store/hooks'
import CardOne from '@/app/components/card/CardOne'
import SpinLoader from '@/app/components/loaders/SpinLoader'
import CopyToClipBoard from '@/app/components/shared/CopyToClipBoard'
import styles from '../../../styles/styles.module.scss'
import { SlashEyeIcon, EyeIcon, DeleteIcon } from '@/app/components/icons/svgIcons'
import TableComponent from '@/app/components/table/TableComponent'
import DataNotFound from '@/app/components/messages/DataNotFound'
import DeletePopup from '@/app/components/modal/DeletePopup'
import AppService from '@/app/services/AppService';
const APIKeys = () => {
    const breadcrumbs=[
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Developer',
            link: '/account/developer'
        }
    ];
    const [gatewaysList , setGatewaysList] = useState<any>([])
    const [gatewayData , setGatewayData] = useState<any>([])
    const keysDataRef = useRef<HTMLDivElement>(null)
    const currentOrg = useAppSelector(getOrg)  
    const activeUser = useAppSelector(getUser)
    const gateway = useAppSelector(getGateway)
    const [isMasked, setIsMasked] = useState<boolean>(false);
    const [inprogress, setInProgress] = useState<boolean>(true);
    const isShowDelete:boolean = false;
    const [deleteApiKeyId, setDeleteApiKeyId] = useState<string>('')
    const [gatewayId, setGatewayId] = useState<string>('')
    const deleteAPiKeyModal = useRef<HTMLDialogElement>(null) 
    const headingsData=[
        { name:'Key'}, 
    ]
    useEffect(()=>{        
        if(currentOrg && currentOrg!=='' && currentOrg !==null && currentOrg !== undefined && gatewaysList?.length === 0){           
            setGatewaysList((currentOrg?.publicMetadata?.Gateways) ? currentOrg?.publicMetadata?.Gateways : [] )
        }
        setInProgress(false);
    }, [currentOrg])  

    const deleteConfirmation=(name: string)=>{
        if(name === ''){
            return;
        }
        else{
            setDeleteApiKeyId(name);
            if (deleteAPiKeyModal?.current) {           
                deleteAPiKeyModal.current.show();
            }
        }
    }
    const deleteApiKey=()=>{
        deleteAPiKeyModal?.current?.close();
    }
    //console.log(gatewayData)

    useEffect(()=>{
        getAccountDetail()
    }, [gatewaysList])

    const getAccountDetail = async() => {
        if(gatewaysList?.length > 0){   
            await gatewaysList?.map((item:any, index:number)=>{                
                try{
                    AppService.getAccountDetail(item?.base_url , item?.api_key_value, activeUser?.id, currentOrg?.id)
                    .then((res:any) => {     
                        setGatewayId(res?.data?.GatewayID);    
                    })
                    .catch((error:any)=>{                                             
                        console.log(error)           
                    })
                }catch(error){
                    console.log(error)
                }
            })    
        }
    }
  return (
    <>
        <div className='flex justify-between items-center'>
            <PageTitle pageTitle="Developer" icon={false} breadcrumbData={breadcrumbs}  />              
        </div>       
        <div className='sm:p-4 md:px-6 md:py-6 border rounded-xl bg-white border-blue-700 h-full min-h-[82vh]'>           
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                {/* <h1 className="text-xl font-bold text-center my-8">Developer Settings</h1> */}
                {gatewaysList && gatewaysList?.length>0  ?<> 
                    <div className="mt-4 mb-4">
                        <div className="border border-gray-300 p-4 rounded-lg">
                            <p className={`font-semibold text-xs uppercase text-black text-black-100 ${styles.fontMenlo}`}>
                             <span className='uppercase'>Account ID:</span> <span className="font-normal">{gatewaysList[0]?.account_id}</span>
                            </p>
                        </div>
                    </div>
                    {gatewaysList?.map((data:any, index:number)=>(
                        <React.Fragment key={`gateway-api-key-${index}`}>                        
                        <div className="mt-4 mb-4">
                            <div className="border border-gray-300 p-4 rounded-lg">
                                <p className={`font-semibold text-xs text-black text-black-100 ${styles.fontMenlo} break-words`}>
                                    <span className='uppercase'>Base URL:</span> <span className="font-normal">{`${data?.base_url}v1/query/{routename}`}</span>
                                </p>
                            </div>
                        </div>
                        <div className="border border-gray-300 p-4 rounded-lg">
                            <div className="mb-4">
                                <p className={`font-semibold text-xs text-black text-black-100 ${styles.fontMenlo}`}>
                                    <span className='uppercase'>Gateway Name:</span> <span className="font-normal">{data?.namespace}</span>
                                </p>
                                <p className={`font-semibold text-xs text-black text-black-100 ${styles.fontMenlo}`}>
                                    <span className='uppercase'>Gateway ID:</span> <span className="font-normal">{gatewayId}</span>
                                </p>
                            </div>
                            <div className="border border-gray-600 bg-white shadow rounded-lg p-4">
                                <div className='mb-3'>  
                                    <h2 className=" font-semibold text-xs text-black">JAVELIN API KEYS</h2>
                                </div>
                                <TableComponent  headingsData={headingsData} actions={true} bodyClassName='text-black-100'  >
                                    <tr>
                                        <td ><span ref={keysDataRef} className={`${styles.fontMenlo} text-black-100 ${!isMasked?styles.blurText:''}`}>{data?.api_key_value}</span></td>
                                        <td>
                                            <div className='flex items-center'>
                                                {!isMasked?<div className='mx-1 inline-flex items-center justify-center w-[22px] h-[22px] bg-silver-700 rounded-full'>
                                                    <button type="button" className="tooltip hover:tooltip-open tooltip-top inline-flex items-center justify-center mx-1" data-tip='Show' onClick={()=>setIsMasked(true)}><SlashEyeIcon iconColor="#5945FF" /></button>
                                                </div>:
                                                <div className='mx-1 inline-flex items-center justify-center w-[22px] h-[22px] bg-silver-700 rounded-full'>
                                                    <button type="button" className="tooltip hover:tooltip-open tooltip-top inline-flex items-center justify-center mx-1" data-tip='Hide' onClick={()=>setIsMasked(false)}><EyeIcon iconColor="#5945FF" /></button>
                                                </div>}                                            
                                                
                                                <CopyToClipBoard id="apiKeysClipBoard" text={data?.api_key_value} cpClass="mx-1 inline-flex items-center justify-center w-[22px] h-[22px] bg-silver-700 rounded-full" tipPosition="tooltip hover:tooltip-open tooltip-top inline-flex items-center justify-center mx-1" iconColor='text-primary-300' /> 
                                                {isShowDelete && 
                                                    <div className='mx-1 inline-flex items-center justify-center w-[22px] h-[22px] bg-silver-700 rounded-full'>
                                                        <button type='button' className='tooltip hover:tooltip-open tooltip-top inline-flex items-center justify-center mx-1' data-tip='Delete' onClick={()=>deleteConfirmation(data?.api_key_id)}><DeleteIcon /></button>
                                                    </div>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                </TableComponent>
                            </div>
                        </div>
                    </React.Fragment>
                    ))}
                </>:inprogress===true?<SpinLoader/>:<DataNotFound message='You have not added any gateway yet.' />}
                {isShowDelete && <>
                    <DeletePopup 
                        modalId="deleteRoute" width='w-[28.123rem] mx-w-3xl'
                        modalRef={deleteAPiKeyModal}
                        message="Are You Sure You Want to Remove This API Key" 
                        deleteAction={deleteApiKey}
                    />
                </>}
            </div>
        </div>
        
    </>
  )
}

export default APIKeys