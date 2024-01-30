// ScatterPlot.js
import React from 'react';
import { Scatter } from 'react-chartjs-2';

const ScatterPlot = ({ data, stat, typeColorMap }) => {
  const scatterData = {
    datasets: [
      {
        label: `${stat} vs Usage Rate`,
        data: data.map((pokemon) => ({
          x: pokemon.usage,
          y: pokemon[stat],
          backgroundColor: typeColorMap[pokemon.type],
          pointRadius: 4,
          label: pokemon.name, // Add this line for labels
        })),
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Usage Rate',
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: stat,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
    elements: {
      point: {
        // Customize tooltip appearance
        tooltipBackgroundColor: 'rgba(255,255,255,0.7)',
        tooltipBorderColor: '#000',
        hoverRadius: 10,
      },
    },
  };
  const containerStyle = {
    height: '500px', // Adjust the height
    width: '500px',  // Adjust the width
  };

  return (
    <div style={containerStyle}>
      <Scatter data={scatterData} options={options} />
    </div>
  );
};

export default ScatterPlot;

