import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
  Filler,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Total LLM Queries',
    },
  },
};
const labels = ['eng_dept', 'myusers', 'salesbot', 'enterprise_users', 'doc_embeddings'];

export const data = {
  labels,
  datasets: [
    {
      fill: false,
      label: 'Routes',
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      lineTension: 0.2
    },
  ],
};
const AreaChart = () => {
  return (
    <div><Line options={options} data={data} /></div>
  )
}
export default AreaChart