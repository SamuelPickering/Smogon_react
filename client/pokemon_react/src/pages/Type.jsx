// Type.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import TypeButton from '../components/TypeButton';
import { useParams } from 'react-router-dom';
import {getTypeColor} from '../data/functions';

const Type = () => {
  const [allPokemonInTier, setAllPokemonInTier] = useState([]);
  const [typeData, setTypeData] = useState({})
  const { tier, type } = useParams();
  const [selectedTier, setSelectedTier] = useState(tier || "")
  const navigate = useNavigate();


  useEffect(() => {
    const fetchAllPokemonInTier = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/pokemon/${tier}`);
        setAllPokemonInTier(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchAllPokemonInTier();
  }, [tier]);
  useEffect(() => {
    const fetchType = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/types/${type}`);
        setTypeData(res.data[0]);
        console.log(res.data[0]);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchType();
  }, [type]);
  const handleTierChange = (event) => {
    const newTier = event.target.value;
    setSelectedTier(newTier);
    navigate(`/pokemon/${newTier}`);
  };
  const [pokemonWithType, setPokemonWithType] = useState([]);

  // Function to filter Pokemon based on type
  const filterPokemonByType = (type) => {
    const filteredPokemon = allPokemonInTier.filter(
      (pokemon) => pokemon.type1 === type || pokemon.type2 === type
    );
    setPokemonWithType(filteredPokemon);
  };

  useEffect(() => {
    
    filterPokemonByType(type);
  }, [type, allPokemonInTier]);

  return (
    <>
      <Header />
      <main style={{ display: 'flex' }}>
        <Sidebar selectedTier={selectedTier} handleTierChange={handleTierChange} allPokemonInTier={allPokemonInTier} />
        <div>
            <h2>Offensive matchups</h2>
            <div>
                <h5>{type} moves are super-effective against :</h5>
                {typeData.data && ( <>{typeData.data.offense.superEffectiveAgainst.map((match) => {
                     return (<TypeButton type={match} tier={tier}/> )
                })} </>)  }
            </div>
            <div>
                <h5>{type} moves are not very effective against :</h5>
                {typeData.data && ( <>{typeData.data.offense.resistantOn.map((match) => {
                     return (<TypeButton type={match} tier={tier}/> )
                })} </>)  }
            </div>
            {(typeData.data && typeData.data.offense.immuneOn.length > 0) && (            
            <div>
                <h5>{type} moves have no effect on:</h5>
                {typeData.data && ( <>{typeData.data.offense.immuneOn.map((match) => {
                     return (<TypeButton type={match} tier={tier}/> )
                })} </>)  }
            </div>)}

            <h2>Defense matchups</h2>
            {(typeData.data && typeData.data.defense.immuneOn.length > 0) && (            
            <div>
                <h5>{type} are immune to these types</h5>
                {typeData.data && ( <>{typeData.data.defense.immuneOn.map((match) => {
                     return (<TypeButton type={match} tier={tier}/> )
                })} </>)  }
            </div>)}
            <div>
                <h5>These types are not very effective against {type}  Pokémon</h5>
                {typeData.data && ( <>{typeData.data.defense.resistantOn.map((match) => {
                     return (<TypeButton type={match} tier={tier}/> )
                })} </>)  }
            </div>
            <div>
                <h5>These types are super effective against {type} Pokémon</h5>
                {console.log('Pokemon with type:', pokemonWithType)}
                {typeData.data && ( <>{typeData.data.defense.superEffectiveAgainst.map((match) => {
                     return (<TypeButton type={match} tier={tier}/> )
                })} </>)  }
            </div>
            <ul>
                {typeData.data ? typeData.data.info.map((point) => {
                    return (<li key={point.substring(0, 7)}>{point}</li>)
                })      : "ok"}
            </ul>
            <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Usage</th>
            <th>Name</th>
            <th>Type</th>
            <th>Total</th>
            <th>HP</th>
            <th>Attack</th>
            <th>Defense</th>
            <th>Sp. Atk</th>
            <th>Sp. Def</th>
            <th>Speed</th>
          </tr>
        </thead>
        <tbody>
          {pokemonWithType.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>
                <div>
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  style={{ width: '48px', height: '48px' }}
                />
                {pokemon.usage}%
                </div>
                </td>
              <td>{pokemon.name}</td>
              <td>
                <div>
                  <TypeButton type={pokemon.type1} tier={tier} />
                  {pokemon.type2 && <TypeButton type={pokemon.type2} tier={tier} />}
                </div>
              </td>
              <td>100</td>
              <td>{pokemon.hp}</td>
              <td>{pokemon.atk}</td>
              <td>{pokemon.def}</td>
              <td>{pokemon.spAtk}</td>
              <td>{pokemon.spDef}</td>
              <td>{pokemon.spe}</td>
              <td>
                {/* <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  style={{ width: '48px', height: '48px' }}
                /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
        

        
        {/* {<button className="type-button" style={{ backgroundColor: getTypeColor(allMoves[move].type), marginLeft : "5px", marginRight : "4px" }}>{allMoves[move].type}</button> {moves.moves[move]}%} */}
      </main>

    </>
  );
};

export default Type;

