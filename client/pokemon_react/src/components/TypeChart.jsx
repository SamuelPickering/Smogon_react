import React from 'react';
import TypeEffectiveness from '../data/functions';

const TypeChart = (props) => {
    const {type1, type2} = props
    const typeColors = {
        poison: '#934397',
        grass: '#72c232',
        water: '#3198f5',
        fire: '#c71b00',
        electric: '#f7c53c',
        rock: '#9e853a',
        ground: '#cdad50',
        steel: '#9292a2',
        flying: '#6982dd',
        fighting: '#da471f',
        psychic: '#df2f69',
        bug: '#8a9703',
        dark: '#36291c',
        ghost: '#434494',
        fairy: '#f0b1f3',
        ice: '#6ed4f5',
        dragon: '#41318a',
        normal: '#8f8b80',
      };
      console.log( "bruh", type1, type2)
      const effectiveness = TypeEffectiveness(type1, type2)
      
  const renderTypeSquare = (type) => {
    const value = effectiveness[type] || 1;
    const isEmpty = value === 1;


    return (
      <td key={type} className={`type-square ${isEmpty ? 'empty' : ''}`}
      >
        {isEmpty ? null : value}
      </td>
    );
  };

  const renderTable = (types) => (
    <table className="type-table">
      <tbody>
        <tr>
          {types.map((type) => (
            <th key={type} className='type-head' style={{ backgroundColor: typeColors[type] }}>{type.substring(0, 3)}</th>
          ))}
        </tr>
        <tr>
          {types.map((type) => renderTypeSquare(type))}
        </tr>
      </tbody>
    </table>
  );

  // Split types into two groups
  const firstRowTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'ground', 'bug', 'poison'];
  const secondRowTypes = ['fighting', 'flying', 'psychic', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];

  return (
    <div className="type-chart">
      {renderTable(firstRowTypes)}
      {renderTable(secondRowTypes)}
    </div>
  );
};

export default TypeChart;
