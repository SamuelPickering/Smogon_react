

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import React from 'react'

const MovePopover = (props) => {
  let {move} = props
  return (
    <OverlayTrigger
          trigger="hover"
          placement={"right"}
          overlay={
            <Popover id={`popover-positioned-right`}>
              {/* <Popover.Header as="h3">{move.display}</Popover.Header> */}
              <Popover.Body>
                <p>{move.effect}</p>
                <p><strong>Category: </strong> {move.category} </p>
                <p><strong>Power: </strong>  {move.power}</p> 
                <p><strong>Accuracy: </strong> {move.accuracy}</p>
                <p><strong>PP: </strong> {move.pp}</p>
              </Popover.Body>
            </Popover>
          }
        >
          <h6>{move.display}</h6>
        </OverlayTrigger>
  )
}

export default MovePopover
