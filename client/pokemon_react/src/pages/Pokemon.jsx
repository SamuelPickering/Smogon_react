import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import allMoves from "../data/allUsedMoves.json"
import {getTypeColor} from '../data/functions';
import ListGroup from '../components/ListGroup';
import TeamGroup from '../components/TeamGroup';
import AbilityGroup from '../components/AbilityGroup';
import EvGroup from '../components/EvGroup';
import ItemGroup from '../components/ItemGroup';
import Sidebar from '../components/SideBar';
import "../App.css"
import TypeChart from '../components/TypeChart';
import StatsTable from '../components/StatsTable';
import Header from '../components/Header';
import TypeButton from '../components/TypeButton';
import PokemonList from '../components/PokemonList';

const Pokemon = () => {

  const [mon, setMon] = useState([]);
  const [allPokemonInTier, setAllPokemonInTier] = useState([]);
  const { tier, name } = useParams();
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState( tier ||"gen9nu"); // Default tier

  let gyatt = { HP: 80, Atk: 145, Def: 125, SpA: 55, SpD: 200, Spe: 50 };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Check if the name parameter is undefined
        if (!name) {
          const res = await axios.get(`http://localhost:8800/pokemon/${selectedTier}?top=true`);
          setMon(res.data[0]);
          console.log(res.data);
          console.log({ mon });
        } else {
          const res = await axios.get(`http://localhost:8800/pokemon/${selectedTier}/${name}`);
          setMon(res.data[0]);
          console.log(res.data);
          console.log({ mon });
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPokemon();
  }, [selectedTier, name]);

  useEffect(() => {
    const fetchAllPokemonInTier = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/pokemon/${selectedTier}`);
        setAllPokemonInTier(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchAllPokemonInTier();
  }, [selectedTier]);

  const handleTierChange = (event) => {
    const newTier = event.target.value;
    setSelectedTier(newTier);
    navigate(`/pokemon/${newTier}`);
  };

  return (
    <>
      {console.log(allMoves["accelerock"].display)}
      <Header />
      <main style={{display : "flex"}}>
      <Sidebar selectedTier={selectedTier} handleTierChange={handleTierChange} allPokemonInTier={allPokemonInTier} />
        {mon && (
          <div style={{}} className="pokemon">
            <div style={{display : "flex"}}>
              <img src={mon.sprite} alt={mon.name}></img>
              <h2>{mon.name || "ok"}</h2>
              <TypeButton type = {mon.type1} tier= {selectedTier} />
              {mon.type2 && (<TypeButton type={mon.type2} tier= {selectedTier}></TypeButton>)}
            </div>
            <div className="pokeinfo">
      <div className="row" style={{display : 'flex'}}>
        <div className="col-md-6">
          <div style={{ width: "400px" }}>
            <ListGroup moves={mon.data?.Moves || {}} tier={selectedTier} />
          </div>
        </div>
        <div className="col-md-6">
          <div style={{ width: "400px" }}>
            <TeamGroup teammates={mon.data?.Teammates || {}} tier={allPokemonInTier || []} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div style={{ width: "400px" }}>
            <AbilityGroup abilities={mon.data?.Abilities || {}} />
          </div>
        </div>
        <div className="col-md-6">
          <div style={{ width: "400px" }}>
            <EvGroup evs={mon.data?.Spreads || {}} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div style={{ width: "400px" }}>
            <ItemGroup items={mon.data?.Items || {}} />
          </div>
        </div>
        <div className="col-md-6">
          <TypeChart type1={mon.type1 ? mon.type1 : "fire"} type2={mon.type2} tier={selectedTier} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <StatsTable stats={mon.data ? { HP: mon.hp, Atk: mon.atk, Def: mon.def, SpA: mon.spAtk, SpD: mon.spDef, Spe: mon.spe } : gyatt} />
        </div>
        {/* put button here */}
        <div className="col-md-6">
          {/* Content for the second column */}
        </div>
      </div>
      {console.log(mon)}
    </div>
          </div>
        )}
        {/* <Link to={`/pokemon/${selectedTier}/types/grass`}>Go to Type Page</Link> */}
      </main>
    </>
  );
};

export default Pokemon;
