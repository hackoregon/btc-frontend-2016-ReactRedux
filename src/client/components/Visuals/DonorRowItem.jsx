import React from 'react';
import {Col,Row} from 'react-flexbox-grid';
import _ from 'lodash';
import { Link } from 'react-router';
import d3 from 'd3';
import {capitalize,fixNames} from '../../utils';
import './DataRowItem.css'
const DonorRowItem = ({donors, payee, link, amount, formattedAmount, nameOnly}) => {
  const colorBlend = d3.interpolateRgb('#CDF3F2', '#08519c');
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
    display:'flex'
  }
  const withChildStyle = {

  }
  const childStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }

  const classNum = {
    flexGrow: 0,
    flexShrink: 0
  }

  let linkOrName = nameOnly ?  (<span className={'ellipsify'}>{name}</span>) : (<Link  className={'ellipsify Raleway btc-text-onyx'} to={link}>{name}</Link>);

  return (
    <Row className={'DataRowItem'} style={{flex:'0',margin:'.5rem'}}>
        <Col  xs={12} sm={9} >
        <Row className = {'nameRow'} between ='xs' start='xs'>
        <Col xs={10}  className={'nameCol'}>
          {linkOrName}
        </Col>

        <Col  xs={2}  style={{fontWeight:'light',textAlign:'right'}}><span>{formattedAmount}</span></Col>
        </Row>
        </Col>

        <Col  className={'visualRow'} xs={12} sm={3} style={{height:'1.4rem',flex:'1',display:'block'}}>

          <div style={{
            height: '100%',
            borderRadius: '3px',
            width: '100%',
            backgroundColor: 'RGB(27, 62, 153)',
            width: donorPercent(amount).size,
            backgroundColor: donorPercent(amount).color
          }}></div>

      </Col>
    </Row>
  );
}

export default DonorRowItem;