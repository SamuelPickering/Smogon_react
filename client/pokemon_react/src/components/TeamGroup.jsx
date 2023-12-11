import React from 'react'
import { useNavigate } from 'react-router-dom';

const TeamGroup = (props) => {
    let { teammates, tier } = props;
    const navigate = useNavigate()

    const handleClick = (partner) => {
        navigate(`/pokemon/gen9${tier[0].tier.toLowerCase()}/${partner.toLowerCase()}`);
      };
  return (
    <>
    <h1>Teammates</h1>
   <ul className="list-group">
       {console.log(teammates)}
       {console.log(tier)}
       {Object.keys((teammates || {}))
       .sort((a, b) => teammates[b] - teammates[a])
       .map((teammate) =>   { 
        let partner = teammate.split("/")[1]
        console.log(partner)
        let partnerInfo = tier.find((pokemon) => pokemon.name === partner);
        return (
            <> 
            {console.log(partner, tier[partner])}
           <li key={teammate} 
           className="list-group-item"
           onClick={() => handleClick(partner)}
           style={{ cursor: 'pointer' }}
           >
           {partnerInfo?.sprite && <img src={partnerInfo.sprite} key={partner} alt={partner} />}
             {partner} , {teammates[teammate]}%</li>
           </>
       )
       })}
       
 </ul>
 </>
  
    )
}

export default TeamGroup