import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'

export default class Map extends Component {
  static defaultProps = {
    center: {lat: 40.705576 , lng: -74.013421},
    zoom: 13
  }


  render() {
    if (this.props.users.length === 0){
      return <div> loading </div>
    }

    // const Markers = this.props.users.map( user => < Marker key={user.id} lat={parseFloat(user.home_location.split(',')[0])} lng={parseFloat(user.home_location.split(',')[1])} />)

    return (

      <div id="map">

      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}


        bootstrapURLKeys={{
          key: "AIzaSyBRAcZqVDsu2XEF9Sz-rQp_c-xWg7wMHRA",
          language: 'en'
          }}  >

          

      </GoogleMapReact>
    </div>
    );
  }
}
