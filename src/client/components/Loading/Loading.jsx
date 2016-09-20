import React, { PropTypes, Component } from 'react'
import Spinner from 'react-spinkit';
import {Grid, Col, Row} from 'react-flexbox-grid';
import './Loading.css';

class Loading extends Component {

// 'cube-grid'
// 'three-bounce'
// 'chasing-dots'

  render() {
    const { name } = this.props;
    return (
    <Grid >
      <Col center='xs' middle='xs' xs={12}  >
      <Row around='xs' middle='xs' style={{height: '100vh'}}>
        <Col xs={2}>
        <Spinner className={`Loading-${name}`} spinnerName={name}/>
        </Col>
    </Row>
    </Col>
    </Grid>
  )}
}

export default Loading;
