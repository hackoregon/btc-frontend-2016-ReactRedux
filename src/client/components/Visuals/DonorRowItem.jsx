import React from 'react';
import {Col,Row} from 'react-flexbox-grid';
import _ from 'lodash';
import { Link } from 'react-router';
import d3 from 'd3';
import {capitalize,fixNames} from '../../utils';

const DonorRowItem = ({donors, payee, link, amount, formattedAmount}) => {
  const colorBlend = d3.interpolateRgb('#A3D3D2', '#10716F');
  function donorPercent(amount) {
    if (amount > 0) {
      let donorMax = d3.max(donors, function(donor) {
        return donor.value;
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
        <Col style={{flexWrap:'nowrap'}} sm={8} xs={10}>
          <span style={{fontSize:'1.2rem',maxWidth:'50px'}}><Link  to={`/donors/${link}`}>{name}</Link></span>
        </Col>
        <Col sm={2} xs={2}>
          <span>{formattedAmount}</span>
        </Col>
        <Col sm={2} xs={12} style={{alignItems:'center',display:'block'}}>
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