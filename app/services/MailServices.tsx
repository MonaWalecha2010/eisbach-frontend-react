import instance from './AppInterceptor'
import ApiConfig from '../config/apiConfig';
class MailService { 
    onBoardingMail(params:any){
        instance.post(ApiConfig.onBoardingMail , params)
    }
    supportMail(params:any){
        instance.post(ApiConfig.supportMail , params)
    }
    gatewayMail(params:any){
        instance.post(ApiConfig.gatewayMail , params)
    }
}
export default new MailService();
