import React, {useState, useEffect} from 'react'
import { useUser } from "@clerk/nextjs";
import { useAppSelector } from '@/app/store/hooks';
import { getOrg } from '@/app/store/reducers/gateway.selector';
import DataNotFound from '@/app/components/messages/DataNotFound'
type gatewayDropdownProps={
    setGatewayData: (val:any)=>void;
    defaultActive?:string;
    classVal:any
}
const GatewayDropdown:React.FC<gatewayDropdownProps> = ({setGatewayData, classVal, defaultActive}) => {
    const {user} = useUser();
    const [gatewaysList , setGatewaysList] = useState<any>([])
    const currentOrg = useAppSelector(getOrg);
    // useEffect(()=>{
    //     if(user?.organizationMemberships && user?.organizationMemberships?.length > 0){           
    //         setGatewaysList((user?.organizationMemberships[0]?.organization?.publicMetadata?.Gateways)?user?.organizationMemberships[0]?.organization?.publicMetadata?.Gateways : [] )
    //     }
    // }, [user])   
    useEffect(()=>{        
        if(currentOrg && currentOrg!=='' && currentOrg !==null && currentOrg !== undefined && gatewaysList?.length === 0){
            setGatewaysList((currentOrg?.publicMetadata?.Gateways) ? currentOrg?.publicMetadata?.Gateways : [] )
        }
    }, [currentOrg])
    const handleChange=(val:any)=>{
        const currentGateway= gatewaysList.filter((current:any)=> current.namespace===val);        
        setGatewayData(currentGateway);        
    }
    return (
        <>
            {gatewaysList && gatewaysList?.length > 0 ?(
                <select name="gateway" className={`${classVal} text-xs`} value={defaultActive?defaultActive:'select a gateway'} onChange={(e:any)=>{handleChange(e.target.value)}} >
                    <option disabled className='text-xs'>Select a gateway</option>
                    {gatewaysList.map((gateway:any, index:number)=>(
                        <option key={`g-key-${index}`} value={gateway?.namespace} className='text-xs'>{gateway?.namespace}</option>
                    ))}
                </select>
            ):<DataNotFound message='You have not added any gateway yet.' />}
        </>
    )
}
export default GatewayDropdown;