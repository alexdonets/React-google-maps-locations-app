import React, { Component } from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const GOOGLE_API_KEY = 'AIzaSyAER83VqiWQLsSpUTFlg1LzYgWUqmZIlRk';
const style = {
  width: '100%',
  heigth: '100%',
}
const containerStyle = {
  width: '100%',
  heigth: '100%',
}

export class MapContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      markers: []
    }
  }

  fetchPlaces = () => {
    //  Create markers for each location
    let markers = this.props.locations.map((el, index) => {
      return (
        <Marker key={index}
                onClick={this.onMarkerClick}
                name={el.name}
                city={el.address_object.place}
                country={el.address_object.country}
                address={el.address_object.address_line1}
                postalcode={el.address_object.postalcode}
                position={{lat: el.coordinate[0], lng: el.coordinate[1]}} />
      );
    });

    this.setState({
      markers
    });
  }
  //  Show info about chosen location
  onMarkerClick = (props, marker, e) => {
    this.props.handleLocationChange(props, marker);
  }
  //  Close info handle
  onInfoWindowClose = () => {
    this.props.handleOnInfoWindowClose();
  }
  //  Close info window if map was clicked
  onMapClicked = () => {
    this.props.handleOnMapClicked();
  };

  render() {
    return (
      <div className="MapContainer">

        <Map google={this.props.google}
          onClick={this.onMapClicked}
          zoom={8}
          style={style}
          containerStyle={containerStyle}
          initialCenter={this.props.mapCenter}
          onReady={this.fetchPlaces}>

            {this.state.markers}

            <InfoWindow position={this.props.selectedPlace.position || this.props.mapCenter}
                        marker={this.props.activeMarker}
                        onClose={this.onInfoWindowClose}
                        visible={this.props.showingInfoWindow}
                        ref='infoWindow'>
              <div>
                <h2>{this.props.selectedPlace.name}</h2>
                <p>{this.props.selectedPlace.address}</p>
                <p>{`${this.props.selectedPlace.postalcode}, ${this.props.selectedPlace.city}`}</p>
                <p>{this.props.selectedPlace.country}</p>
              </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapContainer);
