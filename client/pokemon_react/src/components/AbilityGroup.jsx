import React from 'react'
import allAbilities from "../data/allUsedAbilites.json"
import AbilityPopover from './AbilityPopover'
const AbilityGroup = (props) => {

    const {abilities} = props
    return (
        <>
          <h1>Abilities</h1>
          <AbilityPopover move= {allAbilities["protean"]}></AbilityPopover>
          <ul className="list-group">
            {console.log(abilities)}
            {Object.keys(abilities)
              .sort((a, b) => abilities[b] - abilities[a])
              .map((ability) => ability !== 'other' && (
                <li key={ability.name} className="list-group-item">
                    <p>               
                        <AbilityPopover ability = {allAbilities[ability]}/>
                   {abilities[ability]}%
                  </p>
    
                </li>
              ))}
            
          </ul>
        </>
      );
    }


export default AbilityGroup