import React from 'react';
import d3 from 'd3';
import DataTableBar from './DataTableBar.jsx';
import DonorRowItem from '../Visuals/DonorRowItem.jsx';
import {Panel} from 'react-bootstrap'
import {Row,Col} from 'react-flexbox-grid';
const colorBlend = d3.interpolateRgb('#A3D3D2', '#10716F');
function currency(amount) {

  if (amount > 1000000) {
    return '$' + ((amount) / 1000000).toFixed(0) + 'm';
  } else if (amount > 1000) {
    return '$' + ((amount) / 1000).toFixed(0) + 'k';
  } else {
    return '$' + amount.toFixed(0);
  }
}

const DataTable = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    title: React.PropTypes.string
  },
  donorPercent(amount,max,scale) {
    if (amount > 0) {
      let donorSize = d3.scale.linear().domain([0, max]).range([0, 1]);
      return {
        size: 100 * donorSize(amount) + '%',
        color: colorBlend(donorSize(amount))
      };
    } else
      return {size: '0%', color: '#FFF'};
  },
  render() {
    const dataMax = d3.max(_.map(this.props.data, 'value'));
    const scale = d3.scale.linear()
      .domain([0, dataMax])
      .range([10, 100]);

    // determine width of bar
    // let allDonors = donors.map((item, index) => {
    //   let amount = numeral(item.grandTotal).format('0,0');
    //   return (
    //
    //   )
    // });
    const dataRows = _.map(this.props.data, (datum, idx) => {
      return (
        <DonorRowItem key={idx} donors={this.props.data} link={datum.link} payee={datum.name} formattedAmount={currency(datum.value)} amount={datum.value}/>
      );
    });
    return (
      <Panel
        header={this.props.title} style={{flex:'1'}}>
          <Col>
            {dataRows}
          </Col>
      </Panel>
    );
  },
  renderBar(scale, value, max) {
    const height = 18;
    return (
      <DataTableBar
        height={height}
        scale={scale}
        max={max}
        value={value}
        color={colorBlend((scale(value)/100))} />
    );
  }
});

export default DataTable;