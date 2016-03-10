import React, { Component, PropTypes } from 'react';


class Photo extends Component {
  
  
  render() {

    return (
      <div className={this.props.classes}>
        <img src={require(this.props.filepath)}  className="img-responsive img-thumbnail" alt={this.props.name}/>
        <h4>{this.props.caption}</h4>
        
      </div>
    );
  }
}

export default Photo;
