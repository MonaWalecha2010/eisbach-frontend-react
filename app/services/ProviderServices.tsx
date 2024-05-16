import ApiConfig from "../config/apiConfig";
import instance from "./AppInterceptor";
import axios from "axios";

export const getProvidersService = (baseurl:string, key:string, user:string) => {
    return axios.get(
        `${baseurl}${ApiConfig.allProvider}`,
        { headers: 
            {
                'x-api-key': `${key}`,
                'x-javelin-user' : `${user}`,
                'Content-Type': 'application/json',
            }
        }
    ).then(response => {
        return response;     
    }).catch(error => {      
        return error.response; 
    });  
}
export const getProviderService = (baseurl:string, key:string,user:string, providerName:string) => {
    return axios.get(
        `${baseurl}${ApiConfig.allProvider}/${providerName}`,
        { headers: 
            {
                'x-api-key': `${key}`,
                'x-javelin-user' : `${user}`,
                'Content-Type': 'application/json',
            }
        }
    ).then(response => {
        return response;     
    }).catch(error => {      
        return error.response; 
    }); 
}
export const addProviderService = (baseurl:string, key:string, user:string , params:any) => {
    return axios.post(
        `${baseurl}${ApiConfig.allProvider}/${params?.name}`, params,
        { headers: 
            {
                'x-api-key': `${key}`,
                'x-javelin-user' : `${user}`,
                'Content-Type': 'application/json',
            }
        }
    ).then(response => {
        return response;     
    }).catch(error => {      
        return error.response; 
    });  
}
export const updateProviderService = (baseurl:string, key:string, user:string , params:any) => {
    return axios.put(
        `${baseurl}${ApiConfig.allProvider}/${params?.name}`,params,
        { headers: 
            {
                'x-api-key': `${key}`,
                'x-javelin-user' : `${user}`,
                'Content-Type': 'application/json',
            }
        }
    ).then(response => {
        return response;     
    }).catch(error => {      
        return error.response; 
    });  
}

export const deleteProviderService = (baseurl:string, key:string, user:string, providerName:string) => {
    return axios.delete(
        `${baseurl}${ApiConfig.allProvider}/${providerName}`,
        { headers: 
            {
                'x-api-key': `${key}`,
                'x-javelin-user' : `${user}`,
                'Content-Type': 'application/json',
            }
        }
    ).then(response => {
        return response;     
    }).catch(error => {      
        return error.response; 
    });  
}

export const reloadProviderService = (baseurl:string, key:string, user:string,  providerName:any) => {    
    return axios.post(
        `${baseurl}${ApiConfig.reloadProvider}/${providerName}/reload`,'',
        { headers: 
            {
                'x-api-key': `${key}`,
                'x-javelin-user' : `${user}`,
                'Content-Type': 'application/json',
            }
        }
    ).then(response => {
        return response;     
    }).catch(error => {      
        return error.response; 
    });  
}