import React, { Component, PropTypes } from 'react';
import { Col } from 'react-flexbox-grid';

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
    const {title} = this.props;

    const topTitle = title ? (<h3> { this.props.title} </h3>) : null;
    return (
      <Col center='xs' style={column}>
        {topTitle}
        <h1> { this.props.value } </h1>
        <h4> { this.props.msg } </h4>
      </Col>
    );
  }
}

DataBox.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  msg: PropTypes.string
};

DataBox.defaultProps = {
  value: '999',
  name: 'default'
};

export default DataBox;
