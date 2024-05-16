'use client';
import React, {useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import Header from './Header';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { getOrg, getUser} from '@/app/store/reducers/gateway.selector';
import { setOrg, setUser } from '@/app/store/reducers/gateway.reducer';

type DashboardProps={
    children?: React.ReactNode;
}
const DashboardPagesLayout: React.FC<DashboardProps> = ({children}) => {
    const currentRoute = usePathname(); 
    const dispatch = useAppDispatch();
    const currentOrg = useAppSelector(getOrg);
    const currentUser = useAppSelector(getUser);
    const [isExpanded, setIsExpanded ]= useState(true);
    const {user} = useUser();
    const router = useRouter();
    //const [showSidebar, setShowSidebar] = useState<boolean>(false)
    const setUpUser=()=>{
        if(user !== null){
            dispatch(setUser(user));
            if(user?.organizationMemberships[0]?.organization?.id){
                dispatch(setOrg(user?.organizationMemberships[0]?.organization));
            }
        }else{
            dispatch(setUser(null));
            dispatch(setOrg(null));
        }
    }
    useEffect(()=>{        
        setUpUser();
    },[user])
    // useEffect(()=>{    
    //     if(currentRoute === '/terms-of-use' || currentRoute === '/privacy-policy' || currentRoute==='/license-agreement'){
    //         return;
    //     }
    //     else if((currentOrg==='' || currentOrg === undefined || currentOrg === null) && (currentUser !==null && currentUser !==''))
    //     {              
    //         if(currentRoute !== '/onboarding/create-organization'){
    //             router.push('/onboarding');
    //         }
    //     }
    //     else if(currentOrg!=='' && currentOrg !== undefined &&  currentRoute === '/onboarding'){           
    //         router.push('/');
    //     }
    //     else{
    //         return;            
    //     }
    // }, [currentUser, currentOrg, currentRoute]);  
    
    useEffect(()=>{
        const afterOrgSetup=()=>{            
            if(currentRoute.startsWith('/sign-in') || currentRoute === '/onboarding'){               
                //router.push('/productionServices');
                router.push('/gateways');
            }else if(currentRoute === '/terms-of-use' || currentRoute === '/privacy-policy' || currentRoute==='/license-agreement'){
                return
            }else{
                return
            }
        }
        const beforeOrgSetup=()=>{             
            if(!currentRoute.startsWith('/onboarding')){
                if(currentRoute === '/terms-of-use' || currentRoute === '/privacy-policy' || currentRoute==='/license-agreement'){
                    return
                }else{                   
                    router.push('/onboarding');
                }            
            }
        }  
        const handleUser=()=>{
            if(currentUser ===null || currentUser ==='' || currentUser ===undefined){               
                setUpUser();
                return
            }else{
                if( currentOrg==='' || currentOrg === undefined || currentOrg === null){   
                    beforeOrgSetup();
                }else{ 
                    afterOrgSetup()
                }
            }       
        }
        handleUser();
    },[currentUser, currentOrg, currentRoute])
    return (<>
        <main className="flex min-h-screen flex-col bg-silver-900">
            {children}  
        </main>
    </>);
}
export default DashboardPagesLayout