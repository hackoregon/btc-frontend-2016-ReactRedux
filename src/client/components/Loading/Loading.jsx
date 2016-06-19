import React, { PropTypes } from 'react'
import Spinner from 'react-spinkit';
import {Grid, Col, Row} from 'react-flexbox-grid';
import './Loading.css';

const Loading = ({name}) => {

// 'cube-grid'
// 'three-bounce'
// 'chasing-dots'

  return (
    <Grid >
      <Col xs={12}  >
      <Row around='xs' middle='xs' style={{height: '40vh'}}>
        <Col xs={2}>
        <Spinner xs={1} className={`Loading-${name}`} spinnerName={name}/>
        </Col>
    </Row>
    </Col>
    </Grid>
  )
}

export default Loading;
