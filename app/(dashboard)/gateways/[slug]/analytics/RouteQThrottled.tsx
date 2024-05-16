import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import styles from '../../../../styles/styles.module.scss'
export default function RouteQThrottled({data}:{data:any}) { 
    const CustomItemTooltipContent = (props:any) => {
        const { itemData, series } = props; 
        let index = itemData?.dataIndex;  
        let color = series?.data[itemData.dataIndex]?.color;      
        return (
            <div className={`bg-white border border-gray-101 min-w-[150px] min-h-[80px] rounded-[.313rem] ${styles.fontMenlo}`}>
                <div className='p-2 border-b-[1px] border-gray-101'>
                    <p className={'text-gray-200 font-medium text-sm'}>Route</p>
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
        <h3 className='text-sm text-black-100 font-semibold mt-2 mb-3'>Query Throttled by Route</h3>
        <div className='flex items-center justify-center w-full border border-[#F1F1F1] h-[396px] p-4'>
            <PieChart
                series={[
                    {
                        data: data.map((d:any, index:number) => (
                        { id: index, value: d?.values.reduce((acc:any, curr:any) => acc + parseInt(curr[1], 10), 0), label: d?.metric?.route, }
                        )) as [],
                        innerRadius: 15,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -90,
                        // endAngle: 180,
                        //cx: 150,
                        //cy: 150,              
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
                width={500}
                height={200}
                
            />
        </div>
    </>);
}