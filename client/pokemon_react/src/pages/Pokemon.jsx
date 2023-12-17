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
import StatsTable from '../components/StatsTable';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';


const Pokemon = () => {
  const [mon, setMon] = useState([]);
  const [allPokemonInTier, setAllPokemonInTier] = useState([]);
  const { tier, name } = useParams();
  let gyatt = {HP : 80 ,Atk : 145, Def : 125, SpA : 55, SpD : 200, Spe : 50 } 



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
          <Header/>
           <h2>{mon.name || 'ok'}</h2>
           {console.log(mon.data)}
          <img src={mon.sprite} alt={mon.name}></img>
          <div style={{width: "400px"}}><ListGroup moves={mon.data?.Moves || {}}/></div>
          <div style={{width: "400px"}}> <TeamGroup teammates= {mon.data?.Teammates || {}}  tier= {allPokemonInTier || []} /> </div>
          <div style={{width: "400px"}}><AbilityGroup abilities={mon.data?.Abilities || {}}/></div>
          <div style={{width: "400px"}}><EvGroup evs={mon.data?.Spreads || {}}/></div>
          <div style={{width: "400px"}}><ItemGroup items={mon.data?.Items || {}}/></div>
          <TypeChart type1 = {mon.type1 ? mon.type1 : "fire"} type2 = {mon.type2}/>
          <StatsTable stats={mon.data ? { HP: mon.hp, Atk: mon.atk, Def: mon.def, SpA: mon.spAtk, SpD: mon.spDef, Spe: mon.spe } : gyatt} />
          {console.log(mon)}
          
        </div>
      )}
    </>
  );
};

export default Pokemon;