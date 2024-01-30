import React from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart as ChartJS} from "chart.js/auto"

const PieChart = ({ typeUsage, typeColorMap }) => {
  const total = Object.values(typeUsage).reduce((sum, value) => sum + value, 0);

  const percentageData = Object.fromEntries(
    Object.entries(typeUsage).map(([type, value]) => [type, (value / total) * 100])
  );

  const data = {
    labels: Object.keys(typeUsage),
    datasets: [
      {
        data: Object.values(percentageData),
        backgroundColor: Object.keys(typeUsage).map((type) => typeColorMap[type]),
      },
    ],
  };

  const options = {
    responsive: true,
     maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value.toFixed(2)}%`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;


// More options when I add for responsiveness
//   responsive: true,
 // maintainAspectRatio: false,