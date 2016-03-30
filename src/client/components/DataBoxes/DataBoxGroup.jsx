import React, { Component, PropTypes } from 'react';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
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
               sm={ 12 }
               md={ Math.max(Math.floor(12 / count), 1) }
               lg={ Math.max(Math.floor(12 / count), 1) }
               key={ box.name }>
            <DataBox name={ box.name } value={ box.value } />
          </Col>
        );
      }
    });
    return (
      <Grid fluid={ true }
            style={ {width: '90%', margin: 'auto'} }
            className="databox-group">
            <Row>
              { boxes }
            </Row>
      </Grid>
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
