import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,  
  plugins: {
    legend: false,
    title: {
      display: false,
      text: '',
    },
  },
};
type BarChartProps={
  chartData: {}|any,
  optData?: {}|any,
}
const BarChart:React.FC<BarChartProps> = ({chartData, optData}) => {
  const chartOpt={
    ...options,
    ...optData
  }
  return (
    <Bar options={chartOpt} data={chartData} />
  )
}
export default BarChart