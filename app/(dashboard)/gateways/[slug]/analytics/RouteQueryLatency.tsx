import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import DataNotFound from '@/app/components/messages/DataNotFound';
import styles from '../../../../styles/styles.module.scss'
export default function RouteQueryLatency({data}:{data:any}) {
    const [leData, setLeData] = React.useState<any>([]);
    //  console.log(data)   
    React.useEffect(()=>{        
        const setGrapghValues=()=>{
            let count :any= [];
            data.map((d:any, ind:number) => { 
                if(ind>0){
                    let prev= ind - 1;
                    count = [...count, d?.values.reduce((acc:any, curr:any) => acc + parseInt(curr[1], 10), 0)- data[prev]?.values.reduce((acc:any, curr:any) => acc + parseInt(curr[1], 10), 0)]
                }else{
                    count = [...count, d?.values.reduce((acc:any, curr:any) => acc + parseInt(curr[1], 10), 0)]
                }
            })
            setLeData([...count])
        }
        if(data && data?.length>0){
            setGrapghValues();
        }
    },[data])  
    const CustomItemTooltipContent = (props:any) => {
        const { itemData, series, graphData } = props; 
        let index = itemData?.dataIndex;
        return (
            <div className={`bg-white border border-gray-101 min-w-[150px] min-h-[80px] rounded-[.313rem] ${styles.fontMenlo}`}>
                <div className='p-2 border-b-[1px] border-gray-101'>
                    <p className='text-gray-200 font-medium text-sm'>Latency</p>
                </div>
                <div className='mx-2 py-2 px-3 flex items-center justify-between text-gray-500 text-sm'>
                    <span>{graphData[index]?.metric?.le} ms &nbsp;&nbsp;</span>
                    <span>{series?.data[itemData.dataIndex]}</span>
                </div>
            </div>
        );
    }  
    return (<>
        <h3 className='text-sm text-black-100 font-semibold mt-2 mb-3'>Route Latency</h3>  
        <div className='flex items-center justify-center w-full border bg-[#f3f3f3] border-gray-300 p-4'>
            {data && leData?.length>0 ? (<>
                <BarChart
                    series={
                        [
                            {
                                data: [...leData],
                                label: 'Latency'                        
                            },                            
                        ]                
                    }
                    colors={['#5945FF']}
                    xAxis={[
                        {
                            id: 'llmRoutes',
                            data: data.map((d:any) =>  d?.metric?.le) as [],
                            scaleType: 'band',
                            label: 'Route Latency (ms)',
                            labelStyle: {
                                fontSize: 14,                       
                                transform: `translateY(30px)`,
                                fontFamily: styles.fontMenlo,
                            },                                   
                            tickLabelStyle: {
                                angle: 45,
                                textAnchor: 'start',
                                fontSize: 12, 
                                fontFamily: styles.fontMenlo,                      
                            },                    
                        },
                    ]}
                    yAxis={[
                        {
                            label: 'Requests',
                            tickMinStep:1, 
                            tickLabelStyle:{
                                fontFamily: styles.fontMenlo,
                            }, 
                            labelStyle:{
                                fontFamily: styles.fontMenlo,
                            }                      
                        }
                    ]}                      
                                        
                    width={500}        
                    height={360}
                    slotProps={{
                        legend: {
                            hidden: true
                        },
                    }}
                    margin={{bottom:100, left:100}}
                    tooltip={{ 
                        trigger: "item",                   
                    }}               
                    slots={                    
                        { 
                            itemContent: (params: any) => {
                                const { itemData, series } = params; 
                                return (<>  
                                    <CustomItemTooltipContent itemData={itemData} series={series} graphData={data} /> 
                                </>); 
                            }
                    }}
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
                />
            </>):(
                <div className={`ml-4 mb-4 border-l border-b border-gray-300 mr-auto w-[22rem] h-60 blur-[1.3px] flex items-center justify-center`}>
                    <div className={''}><DataNotFound message='Insufficient data to plot graph' /> </div>
                </div>
            )}
        </div>
    </>);
}