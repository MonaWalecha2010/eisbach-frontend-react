import {AnalyticsIcon, HomeIcon, SettingsIcon, KeyIcon, AlertIcon, AccountsIcon, IntegrationsIcon, PlaygroundIcon, DocumentationIcon, SupportIcon, PowerOff } from '../icons/svgIcons'
import { useEffect, useState } from 'react';
import { getAlert, getOrg } from '@/app/store/reducers/gateway.selector';
import { useAppSelector } from '@/app/store/hooks';
type menuData ={
    menuText:string;
    link:string;
    parent:boolean;
}
export const MenuDataOne =(currentRoute:string)=>{
    const [pathsData, setPathsData] = useState<string[]>([]);
    const alertCount= useAppSelector(getAlert);
    // const gateways = useAppSelector(getGateway);
    const currentOrg = useAppSelector(getOrg)  
    const [gatewaySubmenu, setGatewaySubmenu] = useState<any>([])
    useEffect(()=>{
        setPathsData([]);
        if(currentRoute.startsWith('/gateways/')){
            let routeParts=currentRoute.split('/').filter(item => item !== '');
            setPathsData(routeParts);
        } 
    },[currentRoute ]);   
    useEffect(()=>{   
        let subMenu:any=[]
        if(currentOrg && currentOrg!=='' && currentOrg !==null && currentOrg !== undefined){              
            if(pathsData?.length>=2){
                setGatewaySubmenu([{
                    menuText: pathsData[1],
                    link: '/gateways/'+pathsData[1],
                    parent: true,                
                    subMenu:[
                        {
                            menuText: 'Configuration',
                            link: '/gateways/'+pathsData[1]
                        },
                        {
                            menuText: 'Data Protection',
                            link: '/gateways/'+pathsData[1]+'/dataProtection'
                        },
                        {
                            menuText: 'Chronicle',
                            link: '/gateways/'+pathsData[1]+'/chronicle',
                        },
                        {
                            menuText: 'Analytics',
                            link: '/gateways/'+pathsData[1]+'/analytics',
                        },
                        {
                            menuText: 'Secrets',
                            link: '/gateways/'+pathsData[1]+'/secrets',
                        }
                    ]             
                }])
            }
            else{
                currentOrg?.publicMetadata?.Gateways
                currentOrg?.publicMetadata?.Gateways && currentOrg?.publicMetadata?.Gateways.map((data:any)=>{ 
                    subMenu.push({
                        menuText: data?.namespace,
                        link: '/gateways/'+data?.namespace,
                        parent: false,
                    }) 
                });
                setGatewaySubmenu([...subMenu])
            }
        }
    }, [currentOrg, pathsData])     
   
    return ([    
        {
            menuText: 'Gateways',
            link: '/gateways',
            parent: pathsData?.length>=2?true:gatewaySubmenu?.length>0?true:false,
            level: pathsData?.length>=2?2:gatewaySubmenu?.length>0?1:0,
            indicator:false,indicatorVal:'',
            icons:[
                {
                    darkIcon: <SettingsIcon color="#373737" />,
                    lightIcon:<SettingsIcon color="#ffffff" />
                }
            ],            
            subMenu:gatewaySubmenu
        },       
        // {
        //     menuText: 'Alerts',
        //     link: '/alert',
        //     parent: false,
        //     indicator:true,
        //     indicatorVal:alertCount===null?'':alertCount,
        //     level: 0,
        //     icons:[
        //         {
        //             darkIcon: <AlertIcon color="#373737" />,
        //             lightIcon:<AlertIcon color="#ffffff" />
        //         }
        //     ]        
        // },
        {
            menuText: 'Account',
            link: '/account/developer',        
            parent: true,
            indicator:false,indicatorVal:'',
            level: 1,
            icons:[
                {
                    darkIcon: <AccountsIcon color="#373737" />,
                    lightIcon:<AccountsIcon color="#ffffff" />
                }
            ],
            subMenu:[
                {
                    menuText: 'Developer',
                    link: '/account/developer',
                },
                // {
                //     menuText: 'Users',
                //     link: '/account/user',
                // },
                // {
                //     menuText: 'Billing' ,
                //    link: '/account/billing',
                // }
            ],
        },
        {
            menuText: 'Processors',
            link: '/processors',
            indicator:false,indicatorVal:'',
            parent: false,   
            level: 0,     
            icons:[
                {
                    darkIcon: <IntegrationsIcon color="#373737" />,
                    lightIcon:<IntegrationsIcon color="#ffffff" />
                }
            ]
        },
        {
            menuText: 'Integrations',
            link: '/integrations',
            indicator:false,indicatorVal:'',
            parent: false,   
            level: 0,     
            icons:[
                {
                    darkIcon: <IntegrationsIcon color="#373737" />,
                    lightIcon:<IntegrationsIcon color="#ffffff" />
                }
            ]
        },
        {
            menuText: 'Usage',
            link: '/usage',
            indicator:false,indicatorVal:'',
            parent: false,   
            level: 0,     
            icons:[
                {
                    darkIcon: <AnalyticsIcon color="#373737" />,
                    lightIcon:<AnalyticsIcon color="#ffffff" />
                }
            ]
        }
    ]);
}
export const MenuDataTwo =[
    {
        menuText: 'Playground',
        link: '/playground',
        indicator:false,indicatorVal:'',
        parent: false,
        level: 0, 
        icons:[
            {
                darkIcon: <PlaygroundIcon color="#373737" />,
                lightIcon:<PlaygroundIcon color ="#ffffff" />
            }
        ]
    },
    {
        menuText: 'Documentation',
        link: 'https://docs.getjavelin.io/',
        indicator:false,indicatorVal:'',
        parent: true,
        level: 1,   
        icons:[
            {
                darkIcon: <DocumentationIcon color="#373737" />,
                lightIcon:<DocumentationIcon color="#ffffff" />
            }
        ],
        subMenu:[
            {
                menuText: 'Guides',
                link: 'https://docs.getjavelin.io/docs/javelin-core/overview',
            },
            {
                menuText: 'API Reference',
                link: 'https://docs.getjavelin.io/docs/javelin-python/models',
            },            
        ],
    },
    {
        menuText: 'Support',
        indicator:false,indicatorVal:'',
        link: '/support',
        parent: false,
        level: 0,   
        icons:[
            {
                darkIcon: <SupportIcon color="#373737" />,
                lightIcon:<SupportIcon color="#ffffff" />
            }
        ],             
    },   
];