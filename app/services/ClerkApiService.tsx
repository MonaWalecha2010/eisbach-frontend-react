import ApiConfig from "../config/apiConfig";
import instance from "./AppInterceptor";

export const createOrganization = (payload : any) => {
    return instance.post(ApiConfig.organization , payload)
}

export const saveOrganiationMetaData = (organizationId:string, data:{}|any) => {
    let payload = {
        organizationId : organizationId,
        data : data
    }
    return instance.post(ApiConfig.orgMetaData , payload)
}