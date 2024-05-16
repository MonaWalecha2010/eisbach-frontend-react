import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import DataNotFound from '@/app/components/messages/DataNotFound';
import styles from '../../../../styles/styles.module.scss'
import { generateRandomColor } from '@/app/helper/chartHelper';
export default function UnknownRouteErrors({data}:{data:any}) { 
    return (<>
        <h3 className='text-sm text-black-100 font-semibold mt-2 mb-3'>Unknown Route Errors</h3>
        <div className='flex items-center justify-center w-full border border-[#F1F1F1] p-4'>
            {data?.length>0?(
            <PieChart
                series={[
                    {
                        data: data.map((d:any, index:number) => (
                        { id: index, value: d?.values?.length>1 ? (d?.values.reduce((max:any, current:any) => current[0] > max[0] ? current[1] : max[1])):d?.values[0][1], label: d?.metric?.route, color: index===0?'#5945FF':generateRandomColor() }
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
                slotProps={{
                    legend: {
                        hidden: true
                    },
                                        
                }}
                width={400}
                height={400}
                
                sx={{
                    fontFamily: styles.fontMenlo,
                }}
                
            />):(
                <div className={`ml-4 mb-4 border-l border-b border-gray-300 mr-auto w-[22rem] h-[382px] blur-[1.3px] flex items-center justify-center`}>
                    <div className={''}><DataNotFound message='Insufficient data to plot graph' /> </div>
                </div>
            )}
        </div>
    </>);
}