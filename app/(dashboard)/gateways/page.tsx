'use client';
import React, { useState, useRef, useEffect } from 'react'
import PageTitle from '@/app/components/PageTitle'
import Link from 'next/link'
import { AxiosResponse } from 'axios';
import GatewayForm from './GatewayForm'
import { GatewayData } from '@/app/components/data/gatwayData'
import styles from '../../styles/styles.module.scss'
import { CircleXs, EditIcon, DeleteIcon } from '@/app/components/icons/svgIcons'
import PopupModal from '@/app/components/modal/PopupModal'
import CardOne from '@/app/components/card/CardOne'
import { PlusCircle } from '@/app/components/icons/svgIcons'
import AppService from '@/app/services/AppService'
import { successToast, errorToast } from '@/app/helper/toastMsg'
import { saveOrganiationMetaData } from '@/app/services/ClerkApiService'
import { useUser } from "@clerk/nextjs";
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setGateway, setOrg, setIsGatewayProcessing } from '@/app/store/reducers/gateway.reducer';
import { getOrg, getUser, getIsGatewayProcessing } from '@/app/store/reducers/gateway.selector';
import moment from 'moment';
import { timeDifference } from '@/app/helper/axiosHeaderHelper';
import MailServices from '@/app/services/MailServices';
import SpinLoader from '@/app/components/loaders/SpinLoader';

const Gateways = () => {
    const {user} = useUser();    
    const currentOrg = useAppSelector(getOrg);
    const activeUser = useAppSelector(getUser)
    const isSettingGateway = useAppSelector(getIsGatewayProcessing);
    const dispatch = useAppDispatch();
    const [gatewaysList , setGatewaysList] = useState<any>([])
    const [gatwayTempData, setGatewayTempData] = useState<{status:string, namespace:string, base_url:string}>()  
    const [organizationId, setOrganizationId] = useState('');
    const [editIndex, setEditIndex] = useState<number|null>(null);
    const [name, setName] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [mode, setMode] = useState<string>('');
    const [plan, setPlan] = useState<string>('');
    const [openedModal, setOpenModal] = useState<string>('');
    const [healthzData, setHealthzData] = useState<any>('OK');
    const [healthInPrgress, setHealthInProgress] = useState<boolean>(false);
    const addGatewayModal = useRef<HTMLDialogElement>(null);
    const editGatewayModal = useRef<HTMLDialogElement>(null); 
    const [inprogress, setInProgress]=useState<boolean>(false);
    const [gtwInprogress, setGtwInProgress]=useState<boolean>(true);
    // const [isSettingGateway, setIsSettingGateway]=useState<boolean>(false);    
    useEffect(()=>{        
        if(currentOrg && currentOrg!=='' && currentOrg !==null && currentOrg !== undefined && gatewaysList?.length === 0){
            setOrganizationId(currentOrg?.id)
            setGatewaysList((currentOrg?.publicMetadata?.Gateways) ? currentOrg?.publicMetadata?.Gateways : [] )
            setGtwInProgress(false)
        }
    }, [currentOrg])

    const breadcrumbs=[
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Gateways',
            link: '/gateways'
        }
    ];
    const saveData=(params:any, key:string)=>{            
        try{
            AppService.addGateway(params ,key)
            .then((res:AxiosResponse) => { 
                console.log(res);    
            }
            )
            .catch((error:any)=>{
                console.log(error)
                error('Some error occurred. Try again later');
            })
            setInProgress(false);           
            dispatch(setIsGatewayProcessing(false))
        }catch(error){
            console.log(error)
            setInProgress(false);            
            dispatch(setIsGatewayProcessing(false))
        }
    }
    useEffect(()=>{     
        const interval = setInterval(() => {
            getHealthzData()
        }, 10000);        
        return () => clearInterval(interval);
    },[organizationId, gatewaysList])
    const getHealthzData= async()=>{
        if(gatewaysList?.length > 0){            
            let updatedMetaData = JSON.parse(JSON.stringify(gatewaysList));
            gatewaysList?.map((item:any, index:number)=>{                
                try{
                    AppService.getHealthz(item?.base_url , item?.api_key_value, activeUser?.id)
                    .then((res:AxiosResponse) => {                                                                   
                        updatedMetaData[index] = {...item, status:res?.status}  
                    })
                    .catch((error:any)=>{                                             
                        console.log(error)           
                    })
                }catch(error){
                    console.log(error)
                }
            })           
            //if(updatedMetaData){
                setGatewaysList(updatedMetaData);
            //}
            // setGatewaysList(updatedMetaData);
            saveOrganiationMetaData(organizationId, {'Gateways' : updatedMetaData});
        }
    }
    if(healthzData===null){
        getHealthzData();
    }
    const createAccount=()=>{
        setInProgress(true);        
        let data = {
            namespace : name,
            organization_id : organizationId,
            mode: mode
        }      
        try{
            setGatewayTempData({status:'', namespace:name, base_url:'https://api.javelin.live/'})                
            dispatch(setIsGatewayProcessing(true)) 
            if(addGatewayModal?.current!==undefined){                
                addGatewayModal?.current?.close();
            }
            AppService.createAccount(data)
            .then((res:AxiosResponse) => {               
                if(res?.status === 200){                    
                    dispatch(setIsGatewayProcessing(false))                  
                    successToast("Gateway Added Successfully. ");                    
                    saveOrgMeta(res);                    
                    // closeModal(openedModal);                   
                    // let updatedOrg = await saveOrganiationMetaData(organizationId, {Gateways : [...gatewaysList, {...res?.data, namespace:name, mode:mode, status: 200, lastUpdated : moment().format()}]} )
                    // if(updatedOrg !== undefined){dispatch(setOrg(updatedOrg?.data?.data))}                                    
                    // resetGateway();
                    // saveData({account_id : res?.data?.account_id, organization_id : organizationId} , res?.data?.api_key_value)
                }else{
                    errorToast(res?.data?.message)
                    setInProgress(false);                   
                    dispatch(setIsGatewayProcessing(false))
                    dispatch(setIsGatewayProcessing(false))
                }                
            })
            .catch((error:any)=>{ 
                error('Some error occurred. Try again later. ');
                setInProgress(false);               
                dispatch(setIsGatewayProcessing(false))
            })
        }catch(error){
            console.log(error)
        }
    }  
    const saveOrgMeta=async(res:any)=>{
        let updatedOrg = await saveOrganiationMetaData(organizationId, {Gateways : [...gatewaysList, {...res?.data, namespace:name, mode:mode, status: 200, lastUpdated : moment().format()}]} )
        if(updatedOrg !== undefined){
            dispatch(setOrg(updatedOrg?.data?.data))            
            const orgData = updatedOrg?.data?.data
            const newGateway = updatedOrg?.data?.data?.publicMetadata?.Gateways.filter((data:any)=>data?.namespace===name);            
            if(orgData && newGateway && newGateway?.length>0 && activeUser)
                sendGatewayMail(orgData, newGateway, activeUser)            
        }         
        //saveData({account_id : res?.data?.account_id, organization_id : organizationId} , res?.data?.api_key_value)
    } 
    const sendGatewayMail = async(orgData:any, gWayData:any, userData:any) =>{              
        let sendEmail = await MailServices.gatewayMail({gateway_name: gWayData[0]?.namespace, account_id: gWayData[0]?.account_id, organization_id: orgData?.id, organization_name: orgData?.name, user_id: userData?.id, user_name: userData?.fullName, user_email: userData?.primaryEmailAddress?.emailAddress })
        if(sendEmail!==undefined){console.log(sendEmail)}
        resetGateway();
        setInProgress(false);
    } 
    const updateAccount=async()=>{ 
        if(editIndex!==null){
            setInProgress(true);           
            let updatedList = JSON.parse(JSON.stringify(gatewaysList));            
            gatewaysList?.map((item:any, index:number)=>{
                if(index===editIndex){
                    updatedList[index].mode = mode;                   
                    updatedList[index].namespace = name;
                }
            });
            let updatedOrg = await saveOrganiationMetaData(organizationId, {'Gateways' : updatedList});            
            if(updatedOrg !== undefined){                
                setGatewaysList((updatedOrg?.data?.data?.publicMetadata?.Gateways) ? updatedOrg?.data?.data?.publicMetadata?.Gateways : gatewaysList)             
                dispatch(setOrg(updatedOrg?.data?.data)) 
                setInProgress(false)                
                successToast("Gateway Updated Successfully.")
                editGatewayModal?.current && editGatewayModal?.current.close()
                resetGateway()
                setEditIndex(null)
            }else{
                errorToast('Something went wrong, gateway is not updated.')
            }
        }            
    }
    const resetGateway=()=>{
        setName("")        
        setMode("")
    }
    const openAddGatewayModal = () => {
        if (addGatewayModal?.current) {           
            addGatewayModal?.current.show();
            setOpenModal('addGateway');
        }
    }; 
    const openEditGatewayModal = (gname:string) => {        
        const gData = gatewaysList.filter((gateway:any)=>{return(gateway?.namespace===gname)});        
        if(gData){
            setName(gData[0]?.namespace);
            setMode(gData[0]?.mode);
            if (editGatewayModal?.current) {           
                editGatewayModal?.current.show();
                setOpenModal('editGateway');
            }
        }
        
    };
    const closeModal=(modalName:string)=>{             
        switch (modalName) {
            case 'addGateway':
                addGatewayModal?.current?.close();  
                if(inprogress){setInProgress(false);}              
            case 'editGateway':
                if(editGatewayModal!==null && editGatewayModal?.current){
                    editGatewayModal?.current.close();
                    if(inprogress){setInProgress(false);}
                } 
            default:
                return '';
        }        
    }     
    const deleteGateway=()=>{
        console.log('addeleted gateway modal')
    }
    const gatewayFormProps={
        name: name, setName:setName,
        url: url, setUrl:setUrl,
        mode: mode, setMode:setMode,
        plan:plan, setPlan:setPlan,
        inProgress:(inprogress),        
    }

    const GatewayCard=({data, index=null, healthProgress}:{data:any, index:number|null, healthProgress:boolean})=>{
        return(
            <CardOne classList='relative rounded-xl w-full mx-auto sm:mx-0 max-w-[17.5rem] sm:max-w-auto sm:min-w-[17.5rem] lg:min-w-[24.875rem] sm:w-auto p-3 md:py-[32px] md:px-[1.75rem] lg:py-[.938rem] '>                            
                <div className='absolute top-2 right-2'>
                    <button type='button' onClick={()=>{
                        setEditIndex(index);
                        openEditGatewayModal(data?.namespace)}
                    } className={`inline-flex items-center justify-center w-[1.438rem] h-[1.438rem] rounded-full bg-white_1-300 mr-2 ${index===null?'disabled cursor-not-allowed':''}`}><EditIcon /></button>
                    {/* <button type='button' className='inline-flex items-center justify-center w-[1.438rem] h-[1.438rem] rounded-full bg-white_1-300' onClick={()=>deleteGateway()}><DeleteIcon /></button> */}
                </div>
                <Link className={`block pt-5 ${(data?.status===200)?'cursor-pointer':(data?.status !== 400 && data?.status !== 200)?'cursor-wait':'cursor-no-drop'}`} href={(data?.status === 200)?`/gateways/${data?.namespace}`:'#'} onClick={()=>dispatch(setGateway(data))} >
                    <div className='mb-3'>
                        <div className={`text-xs mb-1 text-primary-100 font-light uppercase `}>Name</div>
                        <div className={`border rounded-[.313rem] px-[1.125rem] py-3 border-silver-100 text-gray-700 text-xs first-letter:uppercase shadow-[rgba(184, 200, 224, 0.22)] ${styles.fontMenlo} truncate`}>{data?.namespace?data?.namespace:''}</div>
                    </div>
                    <div className='mb-3'>
                        <div className={`text-sm mb-1 text-primary-100 font-light `}>URL</div>
                        <div className={`border rounded-[.313rem] px-[1.125rem] py-3 border-silver-100 text-gray-700 text-xs lowercase shadow-[rgba(184, 200, 224, 0.22)] ${styles.fontMenlo} truncate `}>{data?.base_url?data?.base_url:''}</div>
                    </div>                            
                    <div className='mb-3 flex items-center'>
                        <CircleXs color={(data?.status !== 400 && data?.status !== 200)?'#FFA500':(data?.status === 400)?'#D40400':'#026B24'} />
                        <span className='ml-2 text-xs text-primary-100 font-light uppercase'> {(data?.status !== 400 && data?.status !== 200)?'Provision in progress' : (data?.status === 400)? 'Gateway down' :'Ready'}</span>
                    </div>                    
                    {healthProgress? <div className='text-xs text-gray-800 uppercase'>Provisioning is in Progress</div>:
                    <div className='text-xs text-gray-800 '>Last Updated {timeDifference(data?.lastUpdated)}</div>}
                </Link>
            </CardOne>
        )
    }
    return (
        <>
            <div className='flex justify-between items-center'>
                <PageTitle pageTitle="Gateways" icon={false} breadcrumbData={breadcrumbs} />                
            </div>
            <div className='p-4 md:px-6 md:py-6 border rounded-xl bg-white border-blue-700 h-full min-h-[82vh]'>                
                <div className="flex flex-wrap gap-4">
                    {gatewaysList && gatewaysList?.length > 0 ?(<>
                        {gatewaysList?.map((data:any, index:number)=>{
                            return(<React.Fragment key={`llm-provd-${index}`}>
                                <GatewayCard data={data} index={index} healthProgress={healthInPrgress} />                               
                            </React.Fragment>);
                        })}
                    </>):(isSettingGateway===true || (gatewaysList?.length===0 && gatwayTempData))&&(<>
                        <GatewayCard data={gatwayTempData} index={null} healthProgress={healthInPrgress} />
                    </>)} 
                    {gtwInprogress ?<SpinLoader />:                    
                        <CardOne classList='relative rounded-xl w-full mx-auto sm:mx-0 max-w-[17.5rem] sm:max-w-auto sm:min-w-[17.5rem] lg:min-w-[24.875rem] min-h-[17rem] sm:w-auto p-3 md:py-[32px] md:px-[1.75rem] lg:py-[.938rem]' disabled={gatewaysList?.length>=1}>
                            <div onClick={(gatewaysList?.length>=1 || isSettingGateway===true)?()=>{}:openAddGatewayModal} className={`${(gatewaysList?.length===0 || !isSettingGateway)?'cursor-pointer':'cursor-not-allowed'} h-full flex flex-col items-center justify-center`}>                                   
                                <div className='flex flex-col items-center justify-between'>
                                    <PlusCircle color={(gatewaysList?.length>=1 || isSettingGateway===true)?'#e0e7f4':'#5945FF'} />          
                                    <p className={`mt-1 ${styles.card_text} ${(gatewaysList?.length>=1|| isSettingGateway===true)?'text-silver-800':'text-black-100'}`}>Add Gateway</p>
                                </div>          
                            </div>
                        </CardOne>
                    }
                </div>
            </div>
            <PopupModal modalTitle='Add Gateway' modalId="addGateway" width='md:w-[29.125rem] mx-w-3xl' height='h-[18.938rem]' modalRef={addGatewayModal} closeModal={()=>closeModal(openedModal)} >                
                <GatewayForm  {...gatewayFormProps } saveGatewayData={createAccount} />
            </PopupModal>
            <PopupModal modalTitle='Edit Gateway' modalId="editGateway" width='md:w-[29.125rem] mx-w-3xl' height='h-[18.938rem]' modalRef={editGatewayModal} closeModal={()=>closeModal(openedModal)} >
                <GatewayForm  {...gatewayFormProps } saveGatewayData={updateAccount} formType='edit'  />                
            </PopupModal>
        </>
    );
}
export default Gateways