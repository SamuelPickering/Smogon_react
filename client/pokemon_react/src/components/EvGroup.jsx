import React from 'react'
import { useNavigate } from 'react-router-dom';

const EvGroup = (props) => {
    let { evs } = props;



  return (
    <>
    <h1>Evs</h1>
   <ul  className="list-group overflow-auto" style={{ maxHeight: '300px' }} >
       {console.log(evs)}
       {Object.keys((evs || {}))
       .sort((a, b) => evs[b] - evs[a])
       .map((spread) =>   { 

        return (
            <> 
            
           <li key={spread} 
           className="list-group-item"
           >
            {spread} {evs[spread]}%</li>
           </>
       )
       })}
       
 </ul>
 </>
  
    )
}

export default EvGroup