import React, { Component } from 'react'
import { Glyphicon } from 'react-bootstrap'

import {mapMarker} from '../App.css'

export default function (props) {



    return(
      <div style={mapMarker}>
        <h5><Glyphicon glyph="book" /></h5>
      </div>
    )

}
