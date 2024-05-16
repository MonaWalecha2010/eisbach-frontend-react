'use client';
import React, { useEffect, useRef, useState } from 'react'
import TabsComponent from '@/app/components/TabsComponent';
import GatewayConfigurations from '../GatewayConfigurations';
import LlmProvider from '../LlmProvider';
import GatewayLogs from '../GatewayLogs';
import PageTitle from '@/app/components/PageTitle';
import AddButton from '@/app/components/buttons/AddButton';
import PopupModal from '@/app/components/modal/PopupModal';
//import RouteForm from '../RouteForm';
import { getProvidersService, reloadProviderService, addProviderService } from '@/app/services/ProviderServices'
import AppService from '@/app/services/AppService';
import { AxiosResponse } from 'axios';
import { successToast, errorToast } from '@/app/helper/toastMsg';
import { sortAlphabeticallyAsce } from '@/app/helper/sortArray'
import DeletePopup from '@/app/components/modal/DeletePopup';
import { Provider } from 'react-redux';
import { useParams } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { setOrg } from '@/app/store/reducers/gateway.reducer';
import { getGateway, getUser } from '@/app/store/reducers/gateway.selector';
import RefreshButton from '@/app/components/buttons/RefreshButton';
import { updateOrgMetaDataLastUpdated } from '@/app/helper/axiosHeaderHelper';
import { removeSlashTwenty } from '@/app/helper/UrlHelper';
import { useUser } from '@clerk/nextjs';
import SpinLoader from '@/app/components/loaders/SpinLoader';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
const Gateway = () => { 
    const router = useRouter();  
    const dispatch = useAppDispatch();
    const activeGateway = useAppSelector(getGateway); 
    const currentUser = useAppSelector(getUser); 
    const params = useParams();    
    const currentNamespace = removeSlashTwenty(params.slug);     
    const {user} = useUser();
    const searchParams = useSearchParams() 
    const tab = searchParams.get('tab')
    const [currenTab, setCurrentTab] = useState((tab && tab !== undefined)?tab:'Route Configuration');     
    const [refreshLogs, setRefreshLogs] = useState<boolean>(false)
    const updateLastUpdated = async() => {
        let data = await updateOrgMetaDataLastUpdated(
            user?.organizationMemberships[0]?.organization?.id,
            user?.organizationMemberships[0]?.organization?.publicMetadata,
            activeGateway?.namespace
        )       
        if(data !== undefined){ dispatch(setOrg(data)) }
    } 
    // console.log(activeGateway)
    const tabsData=[
        {
            tabName: 'Route Configuration',
            content: (
                <GatewayConfigurations currentNamespace={currentNamespace} currentTab={currenTab} currentUser={currentUser} activeGateway={activeGateway} updateLastUpdated={updateLastUpdated} />
            )
        },
        {
            tabName: 'LLM Provider',
            content: (
                <LlmProvider currentNamespace={currentNamespace} currentTab={currenTab} currentUser={currentUser} activeGateway={activeGateway} updateLastUpdated={updateLastUpdated}/>
            )
        },
        {
            tabName: 'Logs',
            content: (
                <GatewayLogs refreshLogs={refreshLogs} currentTab={currenTab} setRefreshLogs={setRefreshLogs} currentUser={currentUser} activeGateway={activeGateway} />
            )
        }
    ];     
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
        {
            name: currenTab==='Route Configuration'?'Configuration':currenTab,
            link: '/gateways/'+currentNamespace 
        }
    ];
    const refreshLogsData=()=>{
        setRefreshLogs(true);
    } 
    return (
        <>
            <div className='flex justify-between items-center flex-wrap mb-2 lg:mb-0'>
                <PageTitle pageTitle="Configuration" icon={false} breadcrumbData={breadcrumbs} />
                {(currenTab === 'Route Configuration' || currenTab === 'LLM Provider') &&
                    <AddButton 
                    url={(currenTab === 'Route Configuration')?`/gateways/${currentNamespace}/route/addRoute`:`/gateways/${currentNamespace}/provider/addProvider`}
                    click={()=>{}}
                    /> 
                }  
                {currenTab === 'Logs' && <RefreshButton  click={refreshLogsData} /> }              
            </div>
            <div className='p-4 md:px-6 border rounded-xl bg-white border-blue-700 h-full flex justify-between flex-col min-h-[82vh]'>
                <TabsComponent tabsData={tabsData} setCurrTab={setCurrentTab}  currentTab={currenTab}/>                
            </div>            
        </>
    );
}
export default Gateway