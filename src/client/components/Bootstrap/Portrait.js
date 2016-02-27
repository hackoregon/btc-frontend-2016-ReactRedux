import React, { Component, PropTypes } from 'react';



class Photo extends Component {
  
  render() {
    return (
      <div className="hacker-portrait">
        <img src={this.props.filepath} />
        
      </div>
    );
  }
}


class PhotoGrid extends Component {
  
  buildPhotos() {
    var built = this.props.photos.map(function(p,i){
      return (
        <Photo name={p.name} key={i} filepath={p.file}></Photo>
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



export default PhotoGrid;
