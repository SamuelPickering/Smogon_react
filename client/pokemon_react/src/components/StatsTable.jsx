import React from 'react';

const StatBar = ({ statName, statValue }) => {
  const maxStatValue = 200; // Assuming the maximum stat value is 200 for the bar length
  const barLength = (statValue / maxStatValue) * 100;
  let barColor = '#ff7f0f'; // Default color for values below 60

  if (statValue >= 150) {
    barColor = '#00c2b8';
  } else if (statValue >= 120) {
    barColor = '#23cd5e';
  } else if (statValue >= 90) {
    barColor = '#a0e515';
  } else if (statValue >= 60) {
    barColor = '#ffdd57';
  }

  const barStyle = {
    width: `${barLength * 0.75}%`,
    height: '10px',
    backgroundColor: barColor, // Green color for the bar
    borderRadius: '5px',
    margin: '5px 0',

  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px',  }}>
      <span style={{ width: '50px', marginRight: '10px', textAlign: 'right' }}>{statName}</span>
      <span style={{ width: '30px', marginRight: '10px', textAlign: 'right' }}>{statValue}</span>
      <div style={barStyle}></div>
    </div>
  );
};

const StatsTable = ({ stats }) => {
    const totalStats = Object.values(stats).reduce((acc, value) => acc + value, 0);
  return (
    <div style={{ maxWidth: '400px' }}>
      {Object.entries(stats).map(([statName, statValue]) => (
        <StatBar key={statName} statName={statName} statValue={statValue} />
      ))}
            <div style={{ marginTop: '20px' }}>
        <strong>Total:</strong> {totalStats}
      </div>
    </div>
  );
};

export default StatsTable;
