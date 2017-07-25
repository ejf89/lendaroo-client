import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import {mapMarker} from '../App.css'
import { Link } from 'react-router-dom'



export default function (props) {

  function hoverUserCheck(marker_id){
    if (props.hoverUser[0] !== undefined && props.hoverUser[0].id === marker_id ){

      return (<Link className="mapLink" to={`/users/${props.hoverUser[0].id}`} ><p className="mapInfo">{props.hoverUser[0].username}</p></Link>)
    } else {
      return null
    }
  }


  return(
    <div style={mapMarker} data-toggle="tooltip" data-placement="top" title="Tooltip on top" >
        {hoverUserCheck(props.user.id)}
        <h4 id={props.user.id} onClick={props.setHoverUser}><Glyphicon glyph="book" /></h4>
    </div>
  )

}
