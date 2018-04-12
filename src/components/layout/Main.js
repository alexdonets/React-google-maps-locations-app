import React, { Component } from 'react';

import MapContainer from '../MapContainer';
import LocationList from '../LocationList';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      selectedPlace: {},
      activeMarker: {},
      showingInfoWindow: false,
      mapCenter: {},
      locations: [],
      loaded: false
    }

  }

  componentWillMount() {
    //  Get list of locations
    fetch('https://www.deskbookers.com/nl-nl/explore/ajax.json?bounds=<east>')
      .then(res => res.json())
      .then(data => {
        this.setState({
          mapCenter: this.getMapCenter(data.bounds),
          locations: data.rows,
          loaded: true
        });
      });
  }

  getMapCenter = (bounds) => {
    const lat = (bounds.n + bounds.s) / 2;
    const lng = Math.abs(bounds.e + bounds.w) / 2;

    return {
      lat,
      lng
    }
  }

  handleLocationChange = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  handleOnInfoWindowClose = () => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });
  }

  handleOnMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
    }
  }

  render() {
    return (
      <div className="Main">
        {/*}  Create map component */}
        {this.state.loaded &&
          <MapContainer mapCenter={this.state.mapCenter}
                        locations={this.state.locations}
                        handleLocationChange={this.handleLocationChange}
                        handleOnInfoWindowClose={this.handleOnInfoWindowClose}
                        handleOnMapClicked={this.handleOnMapClicked}
                        selectedPlace={this.state.selectedPlace}
                        activeMarker={this.state.activeMarker}
                        showingInfoWindow={this.state.showingInfoWindow}
                        />}
        {/*  Create list of locations component */}
        {this.state.loaded &&
          <LocationList locations={this.state.locations}
                        handleLocationChange={this.handleLocationChange}/>}
      </div>
    );
  }
}

export default Main;
