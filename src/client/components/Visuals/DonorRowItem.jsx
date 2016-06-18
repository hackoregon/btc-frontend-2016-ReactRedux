import React from 'react';
import {Col,Row} from 'react-flexbox-grid';
import _ from 'lodash';
import { Link } from 'react-router';
import d3 from 'd3';
import {capitalize,fixNames} from '../../utils';

const DonorRowItem = ({donors, payee, amount, formattedAmount}) => {
  const colorBlend = d3.interpolateRgb('#A3D3D2', '#10716F');
  function donorPercent(amount) {
    if (amount > 0) {
      let donorMax = d3.max(donors, function(donor) {
        return donor.grandTotal;
      });
      let donorSize = d3.scale.linear().domain([0, donorMax]).range([0, 1]);
      return {
        size: 100 * donorSize(amount) + '%',
        color: colorBlend(donorSize(amount))
      };
    } else
      return {size: '0%', color: '#FFF'};
  }
  const name = fixNames(payee.toLowerCase().capitalize());
  return (
    <Col>
      <Row start = "xs" >
        <Col sm={6} xs={10}>
          <span><Link to={`/donors/${name}`}>{name}</Link></span>
        </Col>
        <Col sm={3} xs={2}>
          <span>{formattedAmount}</span>
        </Col>
        <Col sm={3} xs={12} style={{alignItems:'center',display:'block'}}>
          <div style={{
            height: '15px',
            borderRadius: '3px',
            width: '100%',
            backgroundColor: 'rgb(16, 113, 111)',
            width: donorPercent(amount).size,
            backgroundColor: donorPercent(amount).color
          }}/>
        </Col>
      </Row>
    </Col>
  );
}

export default DonorRowItem;