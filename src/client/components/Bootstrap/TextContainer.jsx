import React, { Component, PropTypes } from 'react';
import * as ReactBootstrap from 'react-bootstrap';

class TextContainer extends Component {
  render(){
    return (
      <div className={this.props.divClasses}>
        {this.props.children}
      </div>
    );
  }
}

export default TextContainer;
