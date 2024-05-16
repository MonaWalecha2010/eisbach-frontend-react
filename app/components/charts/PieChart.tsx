import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { DeepPartial } from 'react-hook-form';

ChartJS.register(ArcElement, Tooltip, Legend);
export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: false,
      title: {
        display: false,
      },
    }   
} as any;
type PieChartProps={
  chartData: {}|any,
}
const PieChart:React.FC<PieChartProps> = ({chartData}) => {
  return (
    <Pie options={options} data={chartData} />
  )
}

export default PieChart