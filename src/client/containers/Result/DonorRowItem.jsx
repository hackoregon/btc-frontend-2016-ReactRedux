import React from 'react';
import {Col} from 'react-bootstrap';
// import {VictoryBar} from 'victory';
import _ from 'lodash';
import d3 from 'd3';
const DonorRowItem = ({donors, payee, amount}) => {
  const colorBlend = d3.interpolateRgb('#A3D3D2', '#10716F');
  function donorPercent(amount) {
    if (amount > 0) {
      let donorMax = d3.max(donors, function(donor) {
        return donor.amount;
      });
      let donorSize = d3.scale.linear().domain([0, donorMax]).range([0, 1]);
      return {
        size: 100 * donorSize(amount) + '%',
        color: colorBlend(donorSize(amount))
      };
    } else
      return {size: '0%', color: '#FFF'};
  }
  
  return (
    <tr>
      <td>
        <Col sm={7}>
          <span>{payee}</span>
        </Col>
        <Col sm={2}>
          <span>{amount}</span>
        </Col>
        <Col sm={3}>
          <div style={{
            height: "15px",
            borderRadius: "3px",
            width: "100%",
            backgroundColor: "rgb(16, 113, 111)",
            width: donorPercent(amount).size,
            backgroundColor: donorPercent(amount).color
          }}></div>
        </Col>
      </td>
    </tr>
  );
}

export default DonorRowItem;