import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import DataNotFound from '@/app/components/messages/DataNotFound';
import styles from '../../styles/styles.module.scss'
import { largeValReducer } from '@/app/helper/chartHelper';

export default function RouteBytes({data}:{data:any}) {
    let dataSet:any=[];
    if(data?.length>0){ 
        data.map((d:any)=>{                          
            let newData={
                route: d?.metric?.route,
                value: d?.values?.length>1? parseInt(d?.values.reduce(largeValReducer), 10) :parseInt(d?.values[0][1],10),
                label: 'Bytes'
            }
            dataSet= [...dataSet, newData]
        },[])
    }  
    const CustomItemTooltipContent = (props:any) => {
        const { itemData, series, graphData } = props; 
        let index = itemData?.dataIndex;
        let bytes = series?.data[itemData.dataIndex];        
        let size='Bytes';
        if(bytes){
            switch (true) {
                case bytes < 1024:
                    size = "Bytes";
                    break;
                case bytes < 1024 * 1024:
                    size = "Kilobytes";
                    bytes /= 1024;
                    break;
                case bytes < 1024 * 1024 * 1024:
                    size = "Megabytes";
                    bytes /= (1024 * 1024);
                    break;
                default:
                    size = "Gigabytes";
                    bytes /= (1024 * 1024 * 1024);
                    break;
            }
        }
        return (
            <div className={`bg-white border border-gray-101 min-w-[150px] min-h-[80px] rounded-[.313rem] ${styles.fontMenlo}`}>
                <div className='p-2 border-b-[1px] border-gray-101'>
                    <p className='text-gray-200 font-medium text-sm'>{graphData[index]?.route}</p>
                </div>
                <div className='mx-2 py-2 px-3 flex items-center justify-between text-gray-500 text-sm'>
                    {/* <span>{graphData[index]?.route} &nbsp;&nbsp;</span> */}
                    <span>{bytes} {size}</span>
                </div>
            </div>
        );
    }
    return (<>
        <h3 className='text-sm text-black-100 font-semibold mt-2 mb-3'>Bytes Transfered By Route</h3>  
        <div className={`w-full border border-[#F1F1F1] min-h-[280px] p-4`}>
            {dataSet?.length>0 ?(
            <BarChart                
                dataset={dataSet}  
                series={[
                    { dataKey: 'value', label:'route' }
                ]} 
                colors={['#5945FF']}                         
                xAxis={[
                    {
                        id: 'llmRoutes',                        
                        dataKey: 'route',
                        scaleType: 'band',
                        label: 'Routes',
                        labelStyle: {
                            fontSize: 14,                       
                            transform: `translateY(80px)`,
                            fontFamily: styles.fontMenlo
                        },                                   
                        tickLabelStyle: {
                            angle: 45,
                            textAnchor: 'start',
                            fontSize: 12, 
                            fontFamily: styles.fontMenlo                      
                        }, 
                              
                    },
                ]}                
                yAxis={[
                    {
                        label: 'Bytes',                        
                        labelStyle: {
                            fontSize: 14, 
                            fontFamily: styles.fontMenlo,
                            marginRight:1                            
                        },                        
                        tickMinStep:1,  
                        tickLabelStyle: {                            
                            fontFamily: styles.fontMenlo                      
                        },
                        
                                              
                    }
                ]}                  
                width={560}        
                height={400}                
                slotProps={{
                    legend: {
                        hidden: true
                    },
                    bar:{
                        width:20
                    }                    
                }}               
                margin={{bottom:140, left:100}} 
               
                tooltip={{ 
                    trigger: "item",                   
                }}                 
                slots={                    
                    { 
                        itemContent: (params: any) => {
                            const { itemData, series } = params; 
                            return (<>  
                                <CustomItemTooltipContent itemData={itemData} series={series} graphData={dataSet} /> 
                            </>); 
                        }
                    }
                }
                sx={{
                    "& .MuiChartsAxis-label":{
                        transform: 'translateX(-30px)'
                    },                  
                    "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                       paddingLeft:'3rem'
                    }, 
                    "& .MuiBarElement-root":{
                        width: '3rem !important', 
                    }   
                }}                
            />          
            ):(
                <div className={`ml-4 mb-4 border-l border-b border-gray-300 mr-auto w-[22rem] h-60 blur-[1.3px] flex items-center justify-center`}>
                    <div className={''}><DataNotFound message='Insufficient data to plot graph' /> </div>
                </div>
            )}
        </div>
    </>);
}