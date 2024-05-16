import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import DataNotFound from '@/app/components/messages/DataNotFound';
import styles from '../../../../styles/styles.module.scss'
import { generateRandomColor, largeValReducer } from '@/app/helper/chartHelper';

export default function LlmMostUsedProviders({data}:{data:any}) { 
    const CustomItemTooltipContent = (props:any) => {
        const { itemData, series } = props; 
        let index = itemData?.dataIndex; 
        let color = series?.data[itemData.dataIndex]?.color;       
        return (
            <div className={`bg-white border border-gray-101 min-w-[150px] min-h-[80px] rounded-[.313rem] ${styles.fontMenlo}`}>
                <div className='p-2 border-b-[1px] border-gray-101'>
                    <p className='text-gray-200 font-medium text-sm'>Provider</p>
                </div>
                <div className='mx-2 py-2 px-3 flex items-center justify-between text-gray-500 text-sm'>
                    <span className={`inline-block w-[.325rem] h-[.325rem] rounded-full mr-3`} style={{backgroundColor: color }}></span>
                    <span>{series?.data[index]?.label} &nbsp;&nbsp;</span> 
                    <span>{series?.data[itemData.dataIndex]?.value}</span> 
                </div>
            </div>
        );
    }
    return (<>
        <h3 className='text-sm text-black-100 font-semibold mt-2 mb-3'>Providers Used</h3>
        <div className='flex items-center justify-center w-full border border-[#F1F1F1] p-4'>
            {data?.length>0 ?(<PieChart
                series={[
                    {
                        data: data.map((d:any, index:number) => (
                            { id: index, value:(d?.values?.length > 1? parseInt(d?.values.reduce(largeValReducer),10):parseInt(d?.values[0][1],10)), label: `${d?.metric?.provider}`, color: index===0?'#5945FF':generateRandomColor()}
                        )) as [] ,
                        innerRadius: 36,
                        outerRadius: 120,
                        paddingAngle: 3,
                        cornerRadius: 6,
                        startAngle: -90,
                        endAngle: 360,
                        arcLabel: (item) => `${item.value}`, 
                    },
                ]}                
                tooltip={{ 
                    trigger: "item",                              
                    itemContent: (params: any) => {
                        const { itemData, series } = params; 
                        return (<>  
                            <CustomItemTooltipContent itemData={itemData} series={series} /> 
                        </>); 
                    }
                }} 
                slotProps={{
                    legend: {
                        hidden: true
                    },
                }}
                width={400}
                height={256}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {                      
                      fontFamily: styles.fontMenlo,
                      fontSize: 16,
                      fontWeight:600,
                      fill: 'white'   
                    },
                }}
                             
            />):(
                <div className={`ml-4 mb-4 border-l border-b border-gray-300 mr-auto w-[20rem] h-60 blur-[1.3px] flex items-center justify-center`}>
                    <div className={''}><DataNotFound message='Insufficient data to plot graph' /> </div>
                </div>                
            )}
        </div>
    </>);
}