import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import DataNotFound from '@/app/components/messages/DataNotFound';
import styles from '../../../../styles/styles.module.scss'
export default function UnknownProviders({data}:{data:any}) {   
    const totalCount = data?.reduce((total:any, item:any) => total + parseInt(item.values[0][1], 10), 0); 
    
    return (<>
        <h3 className='text-sm text-black-100 font-semibold mt-2 mb-3'>Unknown Providers Accessed</h3>
        <div className='flex items-center justify-center w-full border border-[#F1F1F1] p-4'>
        {data?.length>0 ?(
            <BarChart
                xAxis={[
                    {
                        id: 'unknpwnPrviders',
                        data: data.map((d:any) => d?.metric?.provider) as [],                
                        scaleType: 'band',
                        label: 'Providers',
                        labelStyle: {
                            fontSize: 14,                       
                            transform: `translateY(30px)`,
                            fontFamily: styles.fontMenlo,
                        },                                   
                        tickLabelStyle: {                           
                            fontSize: 12, 
                            fontFamily: styles.fontMenlo                      
                        },                   
                                        
                    },                
                ]}                
                yAxis={[
                    {
                        label: 'Queries',
                        tickMinStep:1,
                        labelStyle:{
                            fontFamily: styles.fontMenlo
                        },
                        tickLabelStyle:{
                            fontFamily: styles.fontMenlo
                        }
                    }
                ]}                      
                series={
                    [
                        {
                            data: data.map((d:any) => d?.values.reduce((acc:any, curr:any) => acc + parseInt(curr[1], 10), 0)) as [],
                            label: 'Queries'                                                    
                        },
                        
                    ]                
                }                    
                width={400}                        
                height={380}
                slotProps={{
                    legend: {
                    hidden: true
                    },
                }}        
                margin={{bottom:100, left:100}}
                sx={{
                    "& .MuiChartsAxis-label":{
                        transform: 'translateX(-30px)',
                        fontFamily: styles.fontMenlo ,
                    },                  
                    "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                       paddingLeft:'3rem',
                       fontFamily: styles.fontMenlo,                      
                    }, 
                    "& .MuiBarElement-root":{
                        width: '3rem !important', 
                    }  
                }}
            />):(
                <div className={`ml-4 mb-4 border-l border-b border-gray-300 mr-auto w-[22rem] h-60 blur-[1.3px] flex items-center justify-center`}>
                    <div className={''}><DataNotFound message='Insufficient data to plot graph' /> </div>
                </div>
            )
        }
        </div> 
        
    </>);
}