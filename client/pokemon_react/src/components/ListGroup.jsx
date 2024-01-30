import React, { useState } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import MovePopover from '../components/MovePopover';
import allMoves from "../data/allUsedMoves.json"
import TypeButton from './TypeButton';
function ListGroup(props) {
  const {moves, tier} = props
  const [selectedMove, setSelectedMove] = useState(null);
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

  const getTypeColor = (type) => typeColorMap[type.toLowerCase()] || '#ffffff';


  return (
    <>
      <h1>Title</h1>
      <MovePopover move= {allMoves["flamethrower"]}></MovePopover>
      <ul  className="list-group overflow-auto" style={{ maxHeight: '320px' }}>
        {Object.keys(moves)
          .sort((a, b) => moves[b] - moves[a])
          .map((move) => move !== 'other' && (
            <li key={move.name} className="list-group-item">
                <div style={{display : "flex", alignItems : "center", paddingTop : "10px", paddingBottom : "10px"}}>                
                    <MovePopover move= {allMoves[move]}> , {moves[move]}%</MovePopover>
                    <TypeButton type = {allMoves[move].type} tier = {tier}></TypeButton> {moves[move]}%
              </div>

            </li>
          ))}
        <li className="list-group-item py-2">Other {moves.other}%</li>
      </ul>
    </>
  );
}

export default ListGroup;