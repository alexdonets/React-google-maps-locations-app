import React, { Component } from 'react';

class LocationItem extends Component {

  handleClick = () => {
    let {name, address, postalcode, city, country, position} = this.props;

    this.props.handleClick({name, address, postalcode, city, country, position});
  }

  render() {
    return (
      <div className="LocationItem" onClick={this.handleClick}>
        <h3>{this.props.name}</h3>
        <p>{this.props.address}</p>
        <p>{`${this.props.postalcode}, ${this.props.city}`}</p>
        <p>{this.props.country}</p>
      </div>
    );
  }
}

export default LocationItem;
