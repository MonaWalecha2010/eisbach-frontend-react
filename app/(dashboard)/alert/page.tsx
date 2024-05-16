'use client';
import React, {useState, useEffect} from 'react'
import { AxiosResponse } from 'axios'
import AppService from '@/app/services/AppService';
import { dateFormatYYYYMMDDhhmm, sortByTimeStamp } from '@/app/helper/sortArray';
import TableComponent from '@/app/components/table/TableComponent';
import { AlertsData } from '@/app/components/data/alertsData';
import SpinLoader from '@/app/components/loaders/SpinLoader';
import DataNotFound from '@/app/components/messages/DataNotFound';
import styles from '../../styles/styles.module.scss'
import PageTitle from '@/app/components/PageTitle';
import { getGateway, getUser } from '@/app/store/reducers/gateway.selector';
import { setAlert  } from '@/app/store/reducers/gateway.reducer';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { successToast, errorToast } from '@/app/helper/toastMsg';
import AddButton from '@/app/components/buttons/AddButton';
const Alert = () => {
    const breadcrumbs=[
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Alert',
            link: '/alert'
        }
    ];
    const dispatch = useAppDispatch();
    const [alerts, setAlerts] = useState<any>([])    
    const [inProgress, setInProgress] = useState<boolean>(false);
    const activeGateway = useAppSelector(getGateway);
    const currentUser = useAppSelector(getUser)
    // const headingsData=[{ name:'Alert Id'}, { name:'Message'}, { name:'Source'}, { name:'Status '}, { name:'Priority'}, { name:'Mark as Read' }]
    const headingsData=[{ name:'Date/Time'}, { name:'Alert Id'}, { name:'Message'}, { name:'Source'}, { name:'Priority'}, { name:'Mark as Read' }]
    const [message, setMessage] = useState<string>("")
    const getAlertsData = async()=>{
        setInProgress(true);
        await AppService.getAlerts(activeGateway?.base_url , activeGateway?.api_key_value, currentUser?.primaryEmailAddress?.emailAddress, '').then((res:AxiosResponse)=>{
            if(res){                      
                if(res?.status === 200){ 
                    setAlerts(sortByTimeStamp(res?.data))                
                } else{
                    console.log(res); 
                    setMessage(res?.data?.error)
                    // setAlerts(AlertsData)
                }
            }else{
                setMessage('Something went wrong please try again later.') 
            }
            setInProgress(false); 
        }).catch(error => {
          console.error("Error fetching data:", error);
          setInProgress(false);
        });
    }
    const updateAlertStatus=(data:any, status:boolean)=>{
        let payload={
            alert_id: data?.alert_id,
            account_id: data?.account_id,
            gateway_id: data?.gateway_id,
            message: data?.message,
            description: data?.description,
            source: data?.source,
            status: status,
            priority: data?.priority,
            labels: data?.labels,
            occurances: data?.occurances,
            was_read: data?.was_read,
            notification_id: data?.notification_id,
            created_by: data?.created_by,
            modified_by: data?.modified_by
        }
        updataAlertData(payload);
    }
    const updateReadStatus=(data:any, isRead:boolean)=>{
        let payload={
            alert_id: data?.alert_id,
            account_id: data?.account_id,
            gateway_id: data?.gateway_id,
            message: data?.message,
            description: data?.description,
            source: data?.source,
            status: data?.status,
            priority: data?.priority,
            labels: data?.labels,
            occurances: data?.occurances,
            was_read: isRead,
            notification_id: data?.notification_id,
            created_by: data?.created_by,
            modified_by: data?.modified_by
        }
        updataAlertData(payload);
    }
    const updataAlertData= async(param:any)=>{
        let user=currentUser?.primaryEmailAddress?.emailAddress
        try{            
            await AppService.updateAlertData(activeGateway?.base_url, activeGateway?.api_key_value, user, param)
            .then((res:AxiosResponse) => {                
                if(res?.status === 200){
                    successToast("Alert Updated Successfully")
                    setMessage("");
                    getAlertsData()                                         
                }else{                        
                    errorToast(res?.data?.error)
                }                
            })
            .catch((error:any)=>{
                console.log(error)
                errorToast('Some error occurred. Try again later')
               
            })                 
        }
        catch(error){  
            console.log(error)
            errorToast('Some error occurred. Try again later');
        }
    }
    const setAlertCount=()=>{
        if(alerts && alerts.length >0 ){
            const newAlerts:any = alerts.data.filter((alert:any)=>alert?.was_read===true);   
            dispatch(setAlert(newAlerts.length));
        }else{
            dispatch(setAlert(null)); 
        }
    }
    useEffect(()=>{
        getAlertsData()
    }, []); 
    useEffect(()=>{
        setAlertCount()
    },[alerts])
    return (
        <>
        <div className='flex justify-between items-center'>
            <PageTitle pageTitle="Alert" icon={false} breadcrumbData={breadcrumbs} /> 
            <AddButton click={()=>setAlerts([])} plusShow={false}btnTitle={'Clear Alerts'} /> 
        </div>
        <div className='px-6 py-6 border rounded-xl bg-white border-blue-700 h-full'>
            <TableComponent headingsData={headingsData}>
                {!inProgress && alerts && alerts?.length > 0 ? alerts?.map((item:any, index:number)=>{     
                    let isMarkedRead=item?.was_read===true?true:false;            
                    return(
                        <tr key={`row-${index}`} className='text-gray-800'>   
                            <td>{dateFormatYYYYMMDDhhmm(item?.created_at)}</td>             
                            <td>{item?.alert_id}</td>            
                            <td>{item?.message}</td> 
                            <td>{item?.source}</td>           
                            {/* <td>
                                <div className="form-control">
                                    <label className={`label cursor-pointer mr-2 ${styles.toggle_switch}`}>
                                        <input                                             
                                            id={`alertStatus_${index}`}              
                                            type="checkbox" 
                                            className={`toggle`}
                                            defaultChecked={item?.status} 
                                            onChange={(e:any)=>updateAlertStatus(item, e?.target?.checked)}
                                        />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>                       
                                </div>
                            </td> */}
                            <td>{item?.priority}</td>
                            <td>
                                {item?.was_read===true?(
                                     <label className="label cursor-pointer">
                                        <input id={item?.alert_id} name={`read-${item?.alert_id}`} type="checkbox" className={`checkbox`} disabled={isMarkedRead} checked={isMarkedRead} />
                                    </label> 
                                ):(
                                    <label className="label cursor-pointer">
                                        <input id={item?.alert_id} name={`read-${item?.alert_id}`} type="checkbox" className={`checkbox`} onChange={(e:any)=>updateReadStatus(item, e.target.checked)} />
                                    </label> 
                                )}
                                      
                            </td>
                        </tr>  
                    )}
                ):<>
                    <tr className='border-b-0'><td colSpan={6}>
                        {inProgress? <div className='mt-5'><SpinLoader /></div> :<DataNotFound message={message!==''?message:'Alerts data not found.'} />}
                    </td></tr>
                </>}
            </TableComponent>
        </div>
        </>
    )
}

export default Alert