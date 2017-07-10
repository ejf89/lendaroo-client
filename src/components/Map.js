import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'

export default class Map extends Component {
  static defaultProps = {
    center: {lat: 40.705576 , lng: -74.013421},
    zoom: 11
  }

  render() {
    if (this.props.users.length === 0){
      return <div> loading </div>
    }

    const userLat = this.props.currentUser.latitude
    const userLng = this.props.currentUser.longitude
    const userLocal = {lat: userLat, lng: userLng}


    const Markers = this.props.users.map( user => < Marker key={user.id} lat={user.latitude} lng={user.longitude} />)



    return (

      <div id="map">
        <h1 id="mapHeader">Users Near You</h1>

      <GoogleMapReact
        defaultCenter={userLocal}
        defaultZoom={this.props.zoom}


        bootstrapURLKeys={{
          key: "AIzaSyBRAcZqVDsu2XEF9Sz-rQp_c-xWg7wMHRA",
          language: 'en'
          }}  >

          {Markers}

      </GoogleMapReact>
    </div>
    );
  }
}
