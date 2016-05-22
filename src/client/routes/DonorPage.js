import React from 'react';
import _ from 'lodash';
import { Grid, Row, Col, Table, Panel } from 'react-bootstrap';
import d3 from 'd3';
import {connect} from'react-redux';

import BTCNav from '../components/Navigation/BTCNav';
import DataBoxGroup from '../components/DataBoxes/DataBoxGroup';
import BarChart from '../components/BarChart/BarChart';
import StoryCard from '../components/StoryCards/StoryCard';
import DonorCard from '../components/DonorCard/DonorCard';



const DataTableBar = React.createClass({
  getDefaultProps() {
    return {
      height: 10
    };
  },
  render() {
    const {
      max,
      height,
      scale,
      value,
      color
    } = this.props;
    return (
      <svg
        width={scale(max)}
        height={height}>
        <rect
          width={scale(value)}
          height={height}
          style={{fill: color}}></rect>
      </svg>
    );
  }
});


const DataTable = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    title: React.PropTypes.string
  },
  render() {
    const dataMax = d3.max(_.map(this.props.data, 'value'));
    const scale = d3.scale.linear()
      .domain([0, dataMax])
      .range([10, 100]);

    // determine width of bar
    const dataRows = _.map(this.props.data, (datum, idx) => {
      return (
        <tr key={datum.name}>
          <td>{datum.name}</td>
          <td>{datum.value}</td>
          <td>{this.renderBar(scale, datum.value, dataMax)}</td>
        </tr>
      );
    });
    return (
      <Panel
        header={this.props.title}>
        <Table striped fill>
          <tbody>
            {dataRows}
          </tbody>
        </Table>
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
        color={'rgb(66,141,137)'} />
    );
  }
});

class DonorPage extends React.Component {
  render() {
    const dataSummaryValues = [
      { name: 'Total Cash Donated', value: '22.5K' },
      { name: 'Total Donated In-Kind', value: '22.5K' },
      { name: 'Average Contribution', value: '22.5K' },
      { name: 'Largest Contribution', value: '22.5K' }
    ];
    const barChartData = [[26], [87], [90], [10], [34]];
    const colorData = ['#bebada', '#fb8072', '#8dd3c7', '#b3de69', '#80b1d3'];
    const labelData = [];
    const campaignRecipients = _.map([
      {
        contributorPayee: 'lsdkfdlk',
        filerId: 1,
        grandTotal: 2500,
        totalCount: 1
      },
      {
        contributorPayee: 'hello',
        filerId: 2,
        grandTotal: 200,
        totalCount: 1
      }
    ], (d) => {
      return {
        name: d.contributorPayee,
        value: d.grandTotal
      }
    });

    const pacRecipients = _.map([
      {
        contributorPayee: 'Future PAC',
        filerId: 1,
        grandTotal: 2500,
        totalCount: 1
      },
      {
        contributorPayee: 'Democratic Party',
        filerId: 2,
        grandTotal: 200,
        totalCount: 1
      }
    ], (d) => {
      return {
        name: d.contributorPayee,
        value: d.grandTotal
      }
    });

    const donor = this.props.donor;

    return (
      <div>
        <BTCNav />
        <Grid fluid={ false }
          style={ { marginTop: '100px', fontWeight: '200px' } }
          params={ this.props.params }>

          <DonorCard donor={this.props.donor} />

          <StoryCard
            question={"Who are they giving to?"}
            description={"This visualization is calculated by total dollars, not total people."}>


            <h2>How much are they giving?</h2>
            <DataBoxGroup boxes={dataSummaryValues} />
          </StoryCard>

          <StoryCard
            question={"Who are they giving to?"}
            description={"This visualization is calculated by total dollars, not total people."}>

          <BarChart
            colorBySeries={true}
            height={300}
            data={barChartData}
            labels={labelData}
            colors={colorData} />

          <Grid>
            <Row>
              <Col md={6}>
                <DataTable
                  title='Top Campaign Recipients'
                  data={campaignRecipients}
                  />
              </Col>
              <Col md={6}>
                <DataTable
                  title='Top PAC Recipients'
                  data={pacRecipients}
                  />
              </Col>
            </Row>
          </Grid>
          </StoryCard>



        </Grid>
      </div>
    );

  }
}

function mapStateToProps(state) {
  return _.assign({
    donor: {
      name: 'Phil Knight',
      locationDescription: 'In-State Donor',
      title: 'CEO',
      organization: 'Nike Inc.'
    }
  }, _.pick(state, 'params'));
}

export default connect(
  mapStateToProps
)(DonorPage);