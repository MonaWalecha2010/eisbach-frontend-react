export const GatewayData =[
    {
        namespace: 'development',
        base_url: 'https://api.javelin.live/javelindev/api/v1/',
        mode: 'development',
        plan: 'free',
        lastUpdated:'20min',
        type: 'development',
    },
    // {
    //     name: 'production',
    //     url: 'text.javelin.live',
    //     mode: 'production',
    //     plan: 'free',
    //     lastUpdated:'20min',
    //     type: 'production'
    // }    
];
export const GatewayConfigData =[
    {
        name: 'eng_dept',     
        modeName: 'Gpy-4-32k',
        type: 'chat',
        provider:'Openai'
    },
    {
        name: 'Myusers',     
        modeName: 'Gpy-4-32k',
        type: 'chat',
        provider:'Openai'
    },
    {
        name: 'Salesbot',     
        modeName: 'Gpy-4-32k',
        type: 'chat',
        provider:'anthropic'
    },
    {
        name: 'Enterprise_users',     
        modeName: 'Gpy-4-32k',
        type: 'chat',
        provider:'Meta'
    },  
];
export const GatewayLlmData =[
    {
        name: 'cohere',     
        api_key: '${COHERE_API_KEY}'       
    },
    {
        name: 'anthropic',     
        api_key: '${ANTHROPIC_KEY}'       
    },
    {
        name: 'openai',     
        api_key: '${OPENAI_KEY}'       
    },
    {
        name: 'meta',     
        api_key: '${META_KEY}'       
    }  
];
export const GatewayLogsData=[
    {
        date:'22-09-2023',
        status:'200',
        endpoint:'open ai',
        Logs_info: '[GET] /_next/data/4msjfhsdfvsd7v780-m/post..'
    },
    {
        date:'22-09-2023',
        status:'200',
        endpoint:'open ai',
        Logs_info: '[GET] /_next/data/4msjfhsdfvsd7v780-m/post..'
    },
    {
        date:'22-09-2023',
        status:'200',
        endpoint:'open ai',
        Logs_info: '[GET] /_next/data/4msjfhsdfvsd7v780-m/post..'
    }
];
export const ChronicalData=[
    {
        modelName:'gpt-4-32k',
        prompt: 'Human',
        provider:'open ai',
        dateTime:'dd/mm/yy   07:05am',
        message:'Lorem ipsum dolor sit am...',
        details: {
            dateTime:'dd/mm/yy 07:05am',
            prompt:'prompt information',
            chat:"human: 'date'",
            emded:'text',
            message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etet Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
        }
    },
    {
        modelName:'gpt-4-32k',
        prompt: 'Human',
        provider:'open ai',
        dateTime:'dd/mm/yy   07:05am',
        message:'Lorem ipsum dolor sit am...',
        details: {
            dateTime:'dd/mm/yy 07:05am',
            prompt:'prompt information',
            chat:"human: 'date'",
            emded:'text',
            message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etet Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
        }
    }
];
export const SecretsData = [
    {
        provider:'cohere',
        name: 'secret 1', 
        api_Key: 'secret1', 
        virtual_Key: 'secret1', 
        enabled: false,
        description: 'test secret data'
    }
]
export const DataProtectionData = [
    {
        name: "inspect",
        description: "Template for inspecting sensitive data",
        enabled: true,
        type: "inspect",
        models: [
            {
                "name": "Sensitive Data Protection",
                "provider": "Google Cloud",
                "suffix": "",
                "weight": 0
            }
        ],
        config: {
            infoTypes: [
                {
                    "name": "CREDIT_CARD_NUMBER"
                },
                {
                    "name": "PASSPORT"
                }
            ]
        },
        created_at: "2023-11-27T07:32:55Z",
        modified_at: "2023-11-27T07:32:55Z"
    },  
    { 
        name: "de-identify",
        description: "Template for anonymizing highly sensitive data",
        enabled: true,
        type: "de-identify",        
        config: {
            infoTypes: [
                {
                    "name": "PASSWORD"
                },
                {
                    "name": "ENCRYPTION_KEY"
                }
            ]
        },
        created_at: "2023-11-27T07:32:16Z",
        modified_at: "2023-11-27T07:32:16Z"
    },
]
export const InfoTypesData={
    PII:[
        {
            name: "MAC_ADDRESS_LOCAL",
            displayName: "MAC Address Local",
            value: true
        },
        { 
            name: "EMAIL_ADDRESS",
            displayName: "Email Address",
            value: false
        },
        {
            name: "STREET_ADDRESS",
            displayName: "Street Address",
            value: false
        },
        {
            name: "PHONE_NUMBER",
            displayName: "Phone Number",
            value: false
        },
        {
            name: "VEHICLE_IDENTIFICATION_NUMBER",
            displayName: "Vehicle Identification Number",
            value: false
        },
        // {
        //     name: "ADVERTISING_ID",
        //     displayName: "Advertising ID",
        //     value: false
        // },
        {
            name: "PERSON_NAME",
            displayName: "Person Name",
            value: false
        },
        {
            name: "US_DRIVERS_LICENSE_NUMBER",
            displayName: "US Drivers License Number",
            value: false
        },
        {
            name: "PASSPORT",
            displayName: "Passport",
            value: false
        },
        {
            name: "US_SOCIAL_SECURITY_NUMBER",
            displayName: "US Social Security Number (SSN)",
            value: false
        },
        {
            name: "US_INDIVIDUAL_TAXPAYER_IDENTIFICATION_NUMBER",
            displayName: "US Individual Taxpayer Identification Number (ITIN)",
            value: false
        },
    ],
    PHI:[
        // {
        //     name: "FDA_CODE",
        //     displayName: "FDA Code",
        //     value: false
        // },
        // {   
        //     name: "ICD10_CODE",
        //     displayName: "ICD10 Code",
        //     value: false
        // },
        // {
        //     name: "ICD9_CODE",
        //     displayName: "ICD9 Code",
        //     value: false
        // },
        { 
            name: "MEDICAL_RECORD_NUMBER",
            displayName: "Medical Record Number",
            value: false
        },
        {
            name: "MEDICAL_TERM",
            displayName: "Medical Term",
            value: false
        },
        {
            name: "US_MEDICARE_BENEFICIARY_ID_NUMBER",
            displayName: "US Medicare Beneficiary Identification Number",
            value: false
        },
        {
            name: "US_HEALTHCARE_NPI",
            displayName: "US Healthcare NPI",
            value: false
        },
    ],
    credentialAndTokens:[
        {
            name: "AUTH_TOKEN",
            displayName: "Authentication Token",
            value: false
        },
        {
            name: "AWS_CREDENTIALS",
            displayName: "Amazon Web Services credentials",
            value: false
        },
        {
            name: 'AZURE_AUTH_TOKEN',
            displayName: "Azure JSON Web Token",
            value: false
        },
        {
            name: "BASIC_AUTH_HEADER",
            displayName: "HTTP Basic Authentication header",
            value: false
        },
        {
            name: "GCP_API_KEY",
            displayName: "Google Cloud Platform API key",
            value: false
        },
        {
            name: "GCP_CREDENTIALS",
            displayName: "GCP Credentials",
            value: false
        },
        {
            name: "HTTP_COOKIE",
            displayName: "HTTP Cookie and Set-Cookie Headers",
            value: false
        },
        {
            name: "JSON_WEB_TOKEN",
            displayName: "JSON Web Token",
            value: false
        },
        {
            name: "ENCRYPTION_KEY",
            displayName: "Encryption key",
            value: false
        },
        {
            name: "OAUTH_CLIENT_SECRET",
            displayName: "Open Authorization Client Secret",
            value: false
        },
        {
            name: "PASSWORD",
            displayName: "Password",
            value: false
        },
        {
            name: "SSL_CERTIFICATE",
            displayName:"SSL Certificate",
            value: false
        },
        {
            name: "STORAGE_SIGNED_POLICY_DOCUMENT",
            displayName: "Storage Signed Policy Document",
            value: false
        },
        {
            name: "STORAGE_SIGNED_URL",
            displayName: "Storage Signed URL",
            value: false
        },
        {
            name: "WEAK_PASSWORD_HASH",
            displayName: "Weakly Hashed Common Password",
            value: false
        },
        {
            name: "XSRF_TOKEN",
            displayName: "Common Headers Containing XSRF Tokens (edited)",
            value: false
        } 
    ],
    sensitiveFields:[
        {
            name: "CREDIT_CARD_TRACK_NUMBER",
            displayName: "Credit Card Track Number",
            value: false
        },
        {
            name: "US_EMPLOYER_IDENTIFICATION_NUMBER",
            displayName: "US Employer Identification Number (EIN)",
            value: false
        },
        {    
            name: "US_ADOPTION_TAXPAYER_IDENTIFICATION_NUMBER",
            displayName: "US Adoption Taxpayer Identification Number (ATIN)",
            value: false
        },          
        {
            name: "US_PREPARER_TAXPAYER_IDENTIFICATION_NUMBER",
            displayName: "US Preparer Taxpayer Identification Number (PTIN)",
            value: false
        },
        {
            name: "US_DEA_NUMBER",
            displayName: "US DEA Number",
            value: false
        },
        {
            name: "US_PASSPORT",
            displayName: "US Passport",
            value: false
        },
        {
            name: "CREDIT_CARD_NUMBER",
            displayName: "Credit Card Number",
            value: false
        }        
    ]
}

export const providerImage=(pName:string)=>{
    switch (pName.toLowerCase()) {
        case 'openai':
            return '/images/providers/openAi.png';                
        case 'wiremock':
            return '/images/providers/wiremock.png';                
        case 'anthropic':
            return '/images/providers/anthropic.png';                
        case 'meta':
            return '/images/providers/LLaMa.png';                
        case 'cohere':
            return '/images/providers/cohere.png';                
        case 'huggingface':
            return '/images/providers/huggingface.png';  
        case 'azure_openai':
            return '/images/providers/AzureopenAi.png';
        case 'google':
            return '/images/providers/google.png';    
        case 'bedrock':
            return '/images/providers/awsbedrock.png';  
        default:
            return '';
    }
}
export const findProviderImage=(pName:string="", baseUrl:string="")=>{
    const name = pName.toLowerCase()
    if(name === 'openai' || baseUrl.indexOf("openai.com") != -1){
        return '/images/providers/openAi.png';                
    }
    else if(name === 'wiremock'){
        return '/images/providers/wiremock.png';                
    }
    else if(name === 'anthropic' || baseUrl.indexOf("anthropic.ai") != -1){
        return '/images/providers/anthropic.png';                
    }
    else if(name === 'meta'){
        return '/images/providers/LLaMa.png';                
    }
    else if(name === 'cohere' || baseUrl.indexOf("cohere.ai") != -1){
        return '/images/providers/cohere.png';                
    }
    else if(name === 'huggingface'){
        return '/images/providers/huggingface.png';  
    }
    else if(name === 'azure_openai'|| baseUrl.indexOf("openai.azure.com") != -1){
        return '/images/providers/AzureopenAi.png';
    }
    else if(name === 'google' || baseUrl.indexOf("googleapis.com") != -1){        
        return '/images/providers/google.png';    
    }
    else if(name === 'bedrock'){
        return '/images/providers/awsbedrock.png';  
    }
    else if(name === 'anyscale' || baseUrl.indexOf("anyscale.com") != -1){
        return '/images/providers/anyscale.png';  
    }
    else if(name === 'mistral ai' || baseUrl.indexOf("mistral.ai") != -1){
        return '/images/providers/mistral_ai.png';  
    }
    else if(name === 'perplexity' || baseUrl.indexOf("perplexity.ai") != -1){
        return '/images/providers/perplexity_ai.png';  
    }
    else if(name === 'together' || baseUrl.indexOf("together.xyz") != -1){
        return '/images/providers/together_ai.png';  
    }
    else {        
        return;
    }
}
