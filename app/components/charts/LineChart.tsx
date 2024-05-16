import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
    responsive: true,  
    maintainAspectRatio: false, 
    plugins: {
      legend: false,
      title: {
        display: false,
        text: '',
      },      
    }        
}; 
type LineChartProps={
  chartData: {}|any,
  optData?: {}|any,
}
const LineChart:React.FC<LineChartProps> = ({chartData, optData}) => {
  const chartOpt={
    ...options,
    ...optData
  }
  return (
    <Line options={chartOpt} data={chartData} />
  );
}
export default LineChart