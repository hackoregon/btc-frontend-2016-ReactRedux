import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

class DataBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const boxStyle = {
      textAlign : 'center'
    };
    return (
      <Panel style={boxStyle}>
        <h2> { this.props.value } </h2>
        <h4> { this.props.name } </h4>
      </Panel>
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
