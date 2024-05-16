import axios from "axios";
import {RagUrl} from "../config/apiConfig";

class RagServices { 
    
    //DATA SETS 
    searchDataSets(payload:any){ 
        return axios.get(
            `${RagUrl.searchDataSet}`, {params:payload},
        ).then(response => {
            return response;     
        }).catch(error => {      
            return error.response; 
        });  
    }  

    allDataSets(payload:any){ 
        return axios.get(
            `${RagUrl.allDataSet}`, {params:payload},
        ).then(response => {
            return response;     
        }).catch(error => {      
            return error.response; 
        });  
    } 

    getDataSet(payload:any){ 
        return axios.get(
            `${RagUrl.getDataSet}`, {params:payload},
        ).then(response => {
            return response;     
        }).catch(error => {      
            return error.response; 
        });  
    } 
    getQa(payload:any){ 
        return axios.get(
            `${RagUrl.getQa}`, {params:payload},
        ).then(response => {
            return response;     
        }).catch(error => {      
            return error.response; 
        });  
    } 

    addDataSet(payload:any){ 
        return axios.post(
            `${RagUrl.addDataSet}`, payload,
        ).then(response => {
            return response;     
        }).catch(error => {      
            return error.response; 
        });  
    } 

    //LLM HUB
    searchEndpoints(payload:any){ 
        return axios.get(
            `${RagUrl.searchEndpoint}`, {params:payload},
        ).then(response => {
            return response;     
        }).catch(error => {      
            return error.response; 
        });  
    }  

    allEndpoints(payload:any){ 
        return axios.get(
            `${RagUrl.allEndPoints}`, {params:payload},
        ).then(response => {
            return response;     
        }).catch(error => {      
            return error.response; 
        });  
    } 

    addEndpoint(payload:any){ 
        return axios.post(
            `${RagUrl.addEndPoint}`, payload,
        ).then(response => {
            return response;     
        }).catch(error => {      
            return error.response; 
        });  
    } 

    getEndpoint(payload:any){ 
        return axios.get(
            `${RagUrl.getEndPoint}`, {params:payload},
        ).then(response => {
            return response;     
        }).catch(error => {      
            return error.response; 
        });  
    } 

    //Simulations
    searchSimulation(payload:any){ 
        return axios.get(
            `${RagUrl.searchSimulation}`, {params:payload},
        ).then(response => {
            return response;     
        }).catch(error => {      
            return error.response; 
        });  
    }  

    allSimulations(payload:any){ 
        return axios.get(
            `${RagUrl.allSimulations}`, {params:payload},
        ).then(response => {
            return response;     
        }).catch(error => {      
            return error.response; 
        });  
    } 

    addSimulation(payload:any){ 
        return axios.post(
            `${RagUrl.addSimulation}`, payload,
        ).then(response => {
            return response;     
        }).catch(error => {      
            return error.response; 
        });  
    } 

    getSimulation(payload:any){ 
        return axios.get(
            `${RagUrl.getSimulation}`, {params:payload},
        ).then(response => {
            return response;     
        }).catch(error => {      
            return error.response; 
        });  
    } 

    triggerSimulation(payload:any){ 
        return axios.post(
            `${RagUrl.triggerSimulation}`, payload,
        ).then(response => {
            return response;     
        }).catch(error => {      
            return error.response; 
        });  
    } 
}

export default new RagServices();
