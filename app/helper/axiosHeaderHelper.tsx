import { saveOrganiationMetaData } from '@/app/services/ClerkApiService'
import moment from 'moment';

export const updateOrgMetaDataLastUpdated = (organizationId:any, data:any, namespace:string) => {
    let updatedMeta = JSON.parse(JSON.stringify(data?.Gateways));
    // let updatedMeta = data?.Gateways; 
    data && data?.Gateways?.map((p:any, index:number) =>{
        if(p.namespace === namespace)
        {
            updatedMeta[index]['lastUpdated'] = moment().format()
        }
    });

    saveOrganiationMetaData(organizationId , {'Gateways':updatedMeta});
}

export const timeDifference = (date:any)=>{
    return moment.utc(date).local().startOf('seconds').fromNow()
}