import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'


const Tier = () => {
   const [Pokemon, setPokemon] = useState([])
   const { tier } = useParams();
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

   return (
    <>
    <div>Pokemon</div>

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