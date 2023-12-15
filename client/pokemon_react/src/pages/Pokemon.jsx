import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import allMoves from "../data/allUsedMoves.json"
import allAbilites from "../data/allUsedAbilites.json"
import ListGroup from '../components/ListGroup';
import TeamGroup from '../components/TeamGroup';
import AbilityGroup from '../components/AbilityGroup';
import EvGroup from '../components/EvGroup';
import ItemGroup from '../components/ItemGroup';
import "../App.css"
import TypeEffectiveness from '../data/functions';
import TypeChart from '../components/TypeChart';


const Pokemon = () => {
  const [mon, setMon] = useState([]);
  const [allPokemonInTier, setAllPokemonInTier] = useState([]);
  const { tier, name } = useParams();
  const pokemonTypeEffectiveness = TypeEffectiveness('fire', 'flying');
  console.log(pokemonTypeEffectiveness);


  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        
        
        // Check if the name parameter is undefined
        if (!name) return console.log("Name parameter is undefined");

        const res = await axios.get(`http://localhost:8800/pokemon/${tier}/${name}`);
        setMon(res.data[0]);
        console.log(res.data);
        console.log({mon})
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPokemon();
  }, [tier, name]);

  useEffect(() => {
    const fetchAllPokemonInTier = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/pokemon/${tier}`);
        setAllPokemonInTier(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchAllPokemonInTier();
  }, [tier]);

  return (
    <>
      {console.log(allMoves["accelerock"].display)}
      {mon && (
        
        <div  style = {{}}className="pokemon" >
           <h2>{mon.name || 'ok'}</h2>
           {console.log(mon.data)}
          <img src={mon.sprite} alt={mon.name}></img>
          <div style={{width: "400px"}}><ListGroup moves={mon.data?.Moves || {}}/></div>
          <div style={{width: "400px"}}> <TeamGroup teammates= {mon.data?.Teammates || {}}  tier= {allPokemonInTier || []} /> </div>
          <div style={{width: "400px"}}><AbilityGroup abilities={mon.data?.Abilities || {}}/></div>
          <div style={{width: "400px"}}><EvGroup evs={mon.data?.Spreads || {}}/></div>
          <div style={{width: "400px"}}><ItemGroup items={mon.data?.Items || {}}/></div>
          <TypeChart effectiveness = {pokemonTypeEffectiveness}/>
          {console.log(mon)}
          {/* <h2>{mon.name || 'ok'}</h2>
          <img src={mon.sprite} alt={mon.name}></img>
          {Object.keys(mon.data?.Items || {})
          .sort((a, b) => mon.data.Items[b] - mon.data.Items[a])
          .map((item) => (
            <p key={item}>
              {item} <span>{mon.data.Items[item]}%</span>
            </p>
          ))}
          <h4>Moves</h4>
          {Object.keys(mon.data?.Moves || {})
          .sort((a, b) => mon.data.Moves[b] - mon.data.Moves[a])
          .map((move) => (
            <p key={move}>
              {move !== "other" ? allMoves[move].display : "other"} <span>{mon.data.Moves[move]}%</span>
            </p>
          ))}
          <h4>Abilities</h4>
          {Object.keys(mon.data?.Abilities || {})
          .sort((a, b) => mon.data.Abilities[b] - mon.data.Abilities[a])
          .map((ability) => (
            <p key={ability}> 
              {allAbilites[ability].display} <span>{mon.data.Abilities[ability]}%</span>
            </p>
          ))}
          <h4>Teammates</h4>
          {Object.keys(mon.data?.Teammates || {})
          .sort((a, b) => mon.data.Teammates[b] - mon.data.Teammates[a])
          .map((teammate) => (
            <p key={teammate}>
              {teammate} <span>{mon.data.Teammates[teammate]}%</span>
            </p>
          ))}
          <h4>Ev Spreads</h4>
          {Object.keys(mon.data?.Spreads || {})
          .sort((a, b) => mon.data.Spreads[b] - mon.data.Spreads[a])
          .map((spread) => (
            <p key={spread}>
              {spread} <span>{mon.data.Spreads[spread]}%</span>
            </p>
          ))} */}
        </div>
      )}
    </>
  );
};

export default Pokemon;