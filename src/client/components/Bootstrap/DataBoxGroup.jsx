import React, { Component, PropTypes } from 'react';
import DataBox from './DataBox.jsx'

class DataBoxGroup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const boxes = this.props.boxes.map(function(box) {
      return (
        <DataBox key={ box.name } name={ box.name } value={ box.value } />
      );
    });
    return (
      <div className="databox-group">
        { boxes }
      </div>
    );
  }
}

DataBoxGroup.propTypes = {
  boxes: PropTypes.array
};

DataBoxGroup.defaultProps = {
  boxes: [
    {name: 'alpha', value: '10'},
    {name: 'beta', value: '11'},
    {name: 'gamma', value: '12'}
  ]
};

export default DataBoxGroup;
