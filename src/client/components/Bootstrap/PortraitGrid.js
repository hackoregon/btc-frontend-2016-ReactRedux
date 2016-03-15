import React, { Component, PropTypes } from 'react';
import Photo from "./Photo.js";


class PortraitGrid extends Component {

  buildPhotos() {
    var built = this.props.photos.map(function(p,i){
      var caption = p.name + "-" + p.role;
      return (
        <Photo key={i} filepath={p.file} caption={caption} alt={p.name} classes="hacker-portrait col-md-3">
        </Photo>
      );
    });
    return built;
  }

  render() {
    return (
      <div>
        {this.buildPhotos()}
      </div>
    );
  }
}



export default PortraitGrid;
