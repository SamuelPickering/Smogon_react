import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import PieChart from '../components/Piechart';
// import Plot from 'react-plotly.js';  CHAT GPT is ASS remember to remove plotly
import ScatterPlot from '../components/ScatterPlot';
import TotalScatter from '../components/TotalScatter';



const Tier = () => {
   const [Pokemon, setPokemon] = useState([])
   const { tier } = useParams();
   const typeUsage = {
    normal: 12.45,
    fire: 64.03,
    water: 77.63,
    electric: 22.04,
    grass: 56.129999999999995,
    ice: 5.9,
    fighting: 84.91999999999999,
    poison: 73.59,
    ground: 92.72999999999999,
    flying: 91.38000000000001,
    psychic: 21.31,
    bug: 7.38,
    rock: 22.189999999999998,
    ghost: 67.06,
    dark: 79.67999999999999,
    steel: 84.7,
    fairy: 68.28,
    dragon: 56.129999999999995
  }
  
  const typeColorMap = {
    poison: '#934397',
    grass: '#72c232',
    water: '#3198f5',
    fire: '#c71b00',
    electric: '#f7c53c',
    rock: '#9e853a',
    ground: '#cdad50',
    steel: '#9292a2',
    flying: '#6982dd',
    fighting: '#5c1f0e',
    psychic: '#df2f69',
    bug: '#8a9703',
    dark: '#36291c',
    ghost: '#434494',
    fairy: '#f0b1f3',
    ice: '#6ed4f5',
    dragon: '#41318a',
    normal: '#8f8b80',
  };
   useEffect(() => {
    const fetchAllPokemon = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/pokemon/${tier}`)

            setPokemon(res.data)
            console.log(res)
        } catch (err) {
            console.log(`http://localhost:8800/pokemon/${tier}`)
            console.log(err.message)
        }
    }
    fetchAllPokemon()
   }, [])
   const stats = ['hp', 'atk', 'def', 'spAtk', 'spDef', 'spe'];


   return (
    <>
    <div>Pokemon</div>
    <div className='piecon'>
    <div  style={{display: "flex", justifyContent: "center"}}>
      {/* <h1>Pokémon Type Usage</h1> */}
      
      <PieChart typeUsage={typeUsage} typeColorMap={typeColorMap} />
    </div>
    </div>
    {stats.map((stat) => (
        <div key={stat} className="scatter-plot">
          <ScatterPlot data={Pokemon} stat={stat} typeColorMap={typeColorMap} />
        </div>
      ))}
    <TotalScatter data={Pokemon} typeColorMap={typeColorMap}></TotalScatter>


    {Pokemon.map((poke) => {
         return (<div className="pokemon" key= {poke.id}>
            <h2>{poke.name || "Loading..."}</h2>
            <img src= {poke.sprite}></img>
            {Object.keys(poke.data.Moves).map((move) => {
                return (
                    <p>{move} <span>{poke.data.Moves[move]}%</span></p>
                )
            })}
            
        </div> )
    })}
    </>
       

   )
}

export default Tier


// Objects are not valid as a React child (found: object with keys {Items, Moves, Spreads, Abilities, Teammates}). If you meant to render a collection of children, use an array instead.