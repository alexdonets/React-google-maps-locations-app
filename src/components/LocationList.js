import React, { Component } from 'react';

import LocationItem from './LocationItem';

class LocationList extends Component {

  handleClick = (location) => {
    this.props.handleLocationChange(location);
  }

  render() {
    let locations = this.props.locations.map((el, index) => {
      return (
        <LocationItem key={index}
                      onClick={(el) => {this.handleClick(el)}}
                      name={el.name}
                      city={el.address_object.place}
                      country={el.address_object.country}
                      address={el.address_object.address_line1}
                      postalcode={el.address_object.postalcode}
                      position={{lat: el.coordinate[0], lng: el.coordinate[1]}}
                      handleClick={this.handleClick} />
      );
    });

    return (
      <div className="LocationList">
        {locations}
      </div>
    );
  }
}

export default LocationList;
