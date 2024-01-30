import React from 'react';
import PokemonList from './PokemonList'; 

const Sidebar = ({ selectedTier, handleTierChange, allPokemonInTier }) => {
  return (
    <div className='sidebar'>
      <label style={{ marginTop: '15px' }}>Select Tier:</label>
      <select value={selectedTier} onChange={handleTierChange}>
        <option value="gen9ou">OverUsed</option>
        <option value="gen9uu">UnderUsed</option>
        <option value="gen9ru">RarelyUsed</option>
        <option value="gen9nu">NeverUsed</option>
      </select>
      <div className='poke-search-container'><input /></div>
      <PokemonList Mons={allPokemonInTier || {}} tier={allPokemonInTier} />
    </div>
  );
};

export default Sidebar;

