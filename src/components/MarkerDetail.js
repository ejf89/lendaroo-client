import React from 'react'
import { Glyphicon } from 'react-bootstrap'

import {mapMarker} from '../App.css'

export default function (props) {

    return(
      <div style={mapMarker}>
        <p>{props.name}</p>
        <h5 onHover={ props.setHoverUser() }><Glyphicon glyph="book" /></h5>
      </div>
    )

}
