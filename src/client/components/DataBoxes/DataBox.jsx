import React, { Component, PropTypes } from 'react';
import { Grid,Col,Row } from 'react-flexbox-grid';
import { Panel } from 'react-bootstrap';

class DataBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const column = {
        textAlign : 'center',
        border: '1px solid #eee',
        borderRadius: '4px',
        margin: '1.5rem'
      }
      
    return (
      <Col center='xs' style={column}>
        <h2> { this.props.value } </h2>
        <h4> { this.props.name } </h4>
      </Col>
    );
  }
}

DataBox.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string
};

DataBox.defaultProps = {
  value: '999',
  name: 'default'
};

export default DataBox;
