import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import DataNotFound from '@/app/components/messages/DataNotFound';
import styles from '../../../../styles/styles.module.scss'
import { largeValReducer } from '@/app/helper/chartHelper';

export default function LLMRoutes({data}:{data:any}) {
    let totalCount:number=0; 
    let dataSet:any=[];
    if(data?.length>0){
        data.map((d:any)=>{           
            let newData={
                route: d?.metric?.route,
                value: d?.values?.length>1? parseInt(d?.values.reduce(largeValReducer),10):parseInt(d?.values[0][1],10),
                label: 'Queries'
            }            
            dataSet= [...dataSet, newData]
            // totalCount = dataSet.reduce((total:number, item:any) => total + parseInt(item?.value, 10), 0); 
        },[])
    }   
    const CustomItemTooltipContent = (props:any) => {
        const { itemData, series, graphData } = props; 
        let index = itemData?.dataIndex;
        return (
            <div className={`bg-white border border-gray-101 min-w-[150px] min-h-[80px] rounded-[.313rem] ${styles.fontMenlo}`}>
                <div className='p-2 border-b-[1px] border-gray-101'>
                    <p className='text-gray-200 font-medium text-sm'>Queries</p>
                </div>
                <div className='mx-2 py-2 px-3 flex items-center justify-between text-gray-500 text-sm'>
                    <span>{graphData[index]?.route} &nbsp;&nbsp;</span>
                    <span>{series?.data[itemData.dataIndex]}</span>
                </div>
            </div>
        );
    }   
    return (<>
        {/* <h3 className='text-sm text-black-100 font-semibold mt-2 mb-3'>Total LLM Queries: {totalCount}</h3>   */}
        <div className={`w-full border border-[#F1F1F1] min-h-[280px] p-4`}>
            {dataSet?.length>0 ?(
            <BarChart                
                dataset={dataSet}  
                series={[
                    { 
                        dataKey: 'value', 
                        label:'route',                              
                    }
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
                        label: 'Queries',
                        labelStyle: {
                            fontSize: 16, 
                            fontFamily: styles.fontMenlo,
                            // transform: `translateX(-30px)`, 
                        },
                        tickMinStep:1,  
                        tickLabelStyle: {                            
                            fontFamily: styles.fontMenlo,                                              
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
                tooltip={{ 
                    trigger: "item",                   
                }} 
                margin={{bottom:140, left:100}}                 
                slots={                    
                    { 
                        itemContent: (params: any) => {
                            const { itemData, series } = params; 
                            return (<>  
                                <CustomItemTooltipContent itemData={itemData} series={series} graphData={dataSet} /> 
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
            ):(
                <div className={`ml-4 mb-4 border-l border-b border-gray-300 mr-auto w-[22rem] h-60 blur-[1.3px] flex items-center justify-center`}>
                    <div className={''}><DataNotFound message='Insufficient data to plot graph' /> </div>
                </div>
            )}
        </div>
    </>);
}
