import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import {mapMarker} from '../App.css'



export default function (props) {

  function hoverUserCheck(marker_id){
    if (props.hoverUser[0] !== undefined && props.hoverUser[0].id === marker_id ){

      return (<p className="mapInfo">{props.hoverUser[0].username}</p>)
    } else {
      console.log("no hover selected")
    }
  }


  return(
    <div style={mapMarker} data-toggle="tooltip" data-placement="top" title="Tooltip on top" >
        {hoverUserCheck(props.user.id)}
        <h4 id={props.user.id} onClick={props.setHoverUser}><Glyphicon glyph="book" /></h4>
    </div>
  )

}
