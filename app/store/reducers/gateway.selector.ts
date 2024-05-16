export const getGateway = (state:any) => state?.gatewayReducer?.gateway;
export const getUser = (state:any) => state?.gatewayReducer?.user;
export const getOrg = (state:any) => state?.gatewayReducer?.org;
export const getAlert = (state:any) => state?.gatewayReducer?.alert;
export const getIsGatewayProcessing = (state:any) => state?.gatewayReducer?.isGatewayProcessing;
export const getRequestProcessor = (state:any) => state?.gatewayReducer?.requestProcessor;
export const getResponseProcessor = (state:any) => state?.gatewayReducer?.responseProcessor;