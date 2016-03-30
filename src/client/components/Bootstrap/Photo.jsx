import React, { Component, PropTypes } from 'react';


class Photo extends Component {
  
  
  render() {

    return (
      <div className={this.props.imgDivClasses}>
        <img src={this.props.photo} className={this.props.imgClasses} alt={this.props.alt}/>
        <h4>{this.props.caption}</h4>
        
      </div>
    );
  }
}

export default Photo;
