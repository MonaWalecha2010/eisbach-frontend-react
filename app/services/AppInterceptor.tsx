import axios, { AxiosError, AxiosInstance } from "axios";
const instance = axios.create({});

instance.interceptors.request.use(request => requestHandler(request));
instance.interceptors.response.use(
    response => {        
        return response
    },
    (error)=> errorHandler(error),    
);
const requestHandler = async (request:any) => {   
    const apiKey=process.env.NEXT_PUBLIC_DEV_API_KEY;  
    let contentType='application/json'
    if(request.hasOwnProperty('content-type')) {        
        contentType= 'multipart/form-data';
    }
    request.headers = {                
        'x-api-key': `${apiKey}`,
        'Content-Type': 'application/json',
    } 
    return request;
}
const errorHandler = async (error:AxiosError) => {
    const originalConfig = error.config; 
    return error.response  
}

export default instance;