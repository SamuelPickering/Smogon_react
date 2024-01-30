import React from 'react'
import { Link } from 'react-router-dom';
import { getTypeColor } from '../data/functions'
const TypeButton = (props) => {
    const {type, tier} = props
  return (
   <Link to= {`/pokemon/${tier}/types/${type}`} style={{textDecoration: "none"}}> <button className="type-button" style={{ backgroundColor: getTypeColor(type), marginLeft : "5px", marginRight : "4px" }}>{type}</button> </Link>
  )
}

export default TypeButton