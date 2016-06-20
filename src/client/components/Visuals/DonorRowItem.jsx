import React from 'react';
import {Col,Row} from 'react-flexbox-grid';
import _ from 'lodash';
import { Link } from 'react-router';
import d3 from 'd3';
import {capitalize,fixNames} from '../../utils';

const DonorRowItem = ({donors, payee, link, amount, formattedAmount}) => {
  // const colorBlend = d3.interpolateRgb('#A3D3D2', '#10716F');
  const colorBlend = d3.interpolateRgb('#C0CFFF', '#1B3E99');
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
  const parentStyle = {
    display:'flex',
    flex: '1',
    minWidth: '1rem'
  }
  const withChildStyle = {
    flex: '1',
    textOverflow: 'ellipsis',
    alignItems: 'flex-start'

  }
  const childStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
  return (
    <Col style={{flex:'0'}}>
      <Row start="xs" around='xs' style={parentStyle}>
        <div xs={10} style={withChildStyle}>
          <Link  style={childStyle} to={`/donors/${link}`}>{name}</Link>
          </div>

        <div  xs={2} style={{fontWeight:'light'}}>{formattedAmount}</div>
        <Col  xs={12} style={{alignItems:'flex-start',display:'block'}}>

          <div style={{
            height: '15px',
            borderRadius: '3px',
            margin: '2px 4px',
            width: '100%',
            backgroundColor: 'RGB(27, 62, 153)',
            width: donorPercent(amount).size,
            backgroundColor: donorPercent(amount).color
          }}></div>

        </Col>
      </Row>
    </Col>
  );
}

export default DonorRowItem;