const devApiUrl=process.env.NEXT_PUBLIC_DEV_API_URL
const prodApiUrl= process.env.NEXT_PUBLIC_PROD_API_URL
const ragAPIURL= process.env.NEXT_PUBLIC_RAGEVAL_BACKEND_URL

const ApiConfig = {
    'account' : `v1/admin/customer/account/org`,
    'allRoutes' : `v1/admin/routes`, 
    'allProvider' : `v1/admin/providers`,
    'reloadRoutes' : 'v1/routes', 
    'reloadProvider' : 'v1/providers',   
    'query' : `v1/query`,
    'assistants' : `v1/assistants`,
    'createAccount' : `${prodApiUrl}customer/account`,
    'addGateway' : `${prodApiUrl}customer/gateway`,
    'systemMetrics': `${devApiUrl}system-metrics`,
    'metrics': `v1/metrics/usage`,
    'analytics': 'v1/admin/metrics/usage',
    'healthz': `v1/system/healthz`,
    'chronicle' : `v1/admin/archives`,
    'archive' : `v1/admin/archive`,
    'logs' : `v1/admin/logs`,
    'dataProtections' : 'v1/admin/processors/dp/templates', 
    'reloadDP': 'v1/processors/dp/templates/',
    'support' : 'v1/admin/support',
    'alerts' : 'v1/admin/alerts',
    //NEXT JS API's
    'organization' : '/api/organization',
    'orgMetaData' : '/api/orgMetaData',

    //MAIL API's
    'onBoardingMail' : '/api/onboardingMail',
    'supportMail' : '/api/supportMail',
    'gatewayMail' : '/api/gatewayMail'
};

export const RagUrl = {
    'searchDataSet' : `${ragAPIURL}/api/dataset/search`,
    'allDataSet' : `${ragAPIURL}/api/dataset/list`,
    'addDataSet' : `${ragAPIURL}/api/generate`,
    'getQa' : `${ragAPIURL}/api/qa-data`,
    'getDataSet' : `${ragAPIURL}/api/dataset`,
    
    'searchEndpoint' : `${ragAPIURL}/api/llm-endpoints/search`,
    'allEndPoints' : `${ragAPIURL}/api/llm-endpoints/list`,
    'addEndPoint' : `${ragAPIURL}/api/endpoint/add`,
    'getEndPoint' : `${ragAPIURL}/api/llm-endpoint`,
    
    'searchSimulation' : `${ragAPIURL}/api/simulation/search`,
    'allSimulations' : `${ragAPIURL}/api/simulation/list`,
    'addSimulation' : `${ragAPIURL}/api/simulation/add`,
    'getSimulation' : `${ragAPIURL}/api/simulation`,
    'triggerSimulation' : `${ragAPIURL}/api/simulation/trigger`,
}

export default ApiConfig;