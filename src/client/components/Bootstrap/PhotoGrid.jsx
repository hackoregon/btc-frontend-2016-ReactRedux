import React, { Component, PropTypes } from 'react';
import Photo from "./Photo.jsx";


class PhotoGrid extends Component {

  buildGrid() {
    var grid = this.props.photos.map(function(pData,index){
      
      return (
        <Photo 
          key={index} 
          photo={pData.photo} 
          caption={pData.caption} 
          alt={pData.alt} 
          imgDivClasses={pData.imgDivClasses} 
          imgClasses={pData.imgClasses}
        ></Photo>
      );
    });

    return grid;
  }

  render() {
    return (
      <div>
        {this.buildGrid()}
      </div>
    );
  }
}



export default PhotoGrid;
