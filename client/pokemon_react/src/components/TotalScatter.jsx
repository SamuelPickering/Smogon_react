
import React from 'react';
import { Scatter } from 'react-chartjs-2';

const TotalScatter = ({ data, typeColorMap }) => {
  const scatterData = {
    datasets: [
      {
        label: `Total Stats vs Usage Rate`,
        data: data.map((pokemon) => ({
          x: calculateTotalStats(pokemon),
          y: pokemon.usage,
          backgroundColor: typeColorMap[pokemon.type],
          pointRadius: 4,
          label: pokemon.name,
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
          text: 'Total Stats',
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Usage Rate',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        tooltipBackgroundColor: 'rgba(255,255,255,0.7)',
        tooltipBorderColor: '#000',
        hoverRadius: 6,
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

const calculateTotalStats = (pokemon) => {
  const totalStats =
    pokemon.hp + pokemon.atk + pokemon.def + pokemon.spAtk + pokemon.spDef + pokemon.spe;
  return totalStats;
};

export default TotalScatter;
