import React, { Component, PropTypes } from 'react';
import { Grid,Col,Row } from 'react-flexbox-grid';
import DataBox from './DataBox.jsx'
import numeral from 'numeral';
class DataBoxGroup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const count = this.props.boxes.length;
    const boxes = this.props.boxes.map(function(box) {

      if (numeral().unformat(box.value) > 0) {
        return (
          <Col xs={ 12 }
               sm={ Math.max(Math.floor(12 / count), 1) }
               md={ Math.max(Math.floor(12 / count), 1) }
               lg={ Math.max(Math.floor(12 / count), 1) }
               key={ box.name }>
            <DataBox name={ box.name } value={ box.value } />
          </Col>
        );
      }
    });
    return (
            <Row around='lg'>
              { boxes }
            </Row>
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
