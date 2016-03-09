import React, { Component, PropTypes } from 'react';



class Photo extends Component {
  
  render() {
    return (
      <div className="hacker-portrait col-md-3">
        <img src={require(this.props.filepath)}  className="img-responsive img-thumbnail" alt={this.props.name}/>
        <h4>{this.props.name} - {this.props.role}</h4>
        
      </div>
    );
  }
}


class PhotoGrid extends Component {
  


  buildPhotos() {
    console.log(this.props.photos);
    var built = this.props.photos.map(function(p,i){
      return (
        <Photo name={p.name} key={i} filepath={p.file} role={p.role}></Photo>
      );
    });
    console.log(built);
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
