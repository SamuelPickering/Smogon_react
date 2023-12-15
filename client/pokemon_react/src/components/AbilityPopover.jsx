import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import React from 'react'

const AbilityPopover = (props) => {
  let {ability} = props
  return (
    <OverlayTrigger
          trigger="hover"
          placement={"right"}
          overlay={
            <Popover id={`popover-positioned-right`}>
              {/* <Popover.Header as="h3">{move.display}</Popover.Header> */}
              <Popover.Body>
                {console.log(ability)}
                <p>{(ability?.effect)}</p>
              </Popover.Body>
            </Popover>
          }
        >
          <span>{ability?.display}</span>
        </OverlayTrigger>
  )
}

export default AbilityPopover