import React from 'react'
import { useNavigate } from 'react-router-dom';

const PokemonList = (props) => {
    let { Mons, tier } = props;
    const navigate = useNavigate()

    const handleClick = (mon) => {
        navigate(`/pokemon/gen9${tier[0].tier.toLowerCase()}/${mon.toLowerCase()}`);
      };
  return (
    <>
   <ul  className="list-group overflow-auto" style={{ maxHeight: '85vh' }}>
       {console.log(Mons)}
       {(Mons|| []).map((mon) =>   { 
        return (
            <> 
            
           <li key={mon.name + "2"} 
           className="list-group-item"
           onClick={() => handleClick(mon.name)}
           style={{ cursor: 'pointer' }}
           >
           {mon?.sprite && <img src={mon.sprite} key={mon.name + "3"} alt={mon.name} style={{ width: '48px', height: '48px' }} />}
             {mon.name}  {mon.usage}%  </li>
           </>
       )
       })}
       
 </ul>
 </>
  
    )
}

export default PokemonList