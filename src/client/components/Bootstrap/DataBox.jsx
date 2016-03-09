import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

class DataBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Panel footer={ this.props.name }>
        { this.props.value }
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
