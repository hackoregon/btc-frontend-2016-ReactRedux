import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash';
import { Grid, Row, Col, Table, Panel } from 'react-bootstrap';
import d3 from 'd3';

import {loadDonor} from '../../actions'

import BTCNav from '../../components/Navigation/BTCNav';
import DataBoxGroup from '../../components/DataBoxes/DataBoxGroup';
import BarChart from '../../components/BarChart/BarChart';
import StoryCard from '../../components/StoryCards/StoryCard';
import DonorCard from '../../components/DonorCard/DonorCard';


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
          <td>{currency(datum.value)}</td>
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

function currency(amount) {

  if (amount > 1000000) {
    return '$' + ((amount) / 1000000).toFixed(1) + ' M';
  } else if (amount > 1000) {
    return '$' + ((amount) / 1000).toFixed(1) + ' K';
  } else {
    return '$' + amount.toFixed(2);
  }
}

function filterTransactions(transactions, filterFunction) {

  return _.chain(transactions)
    .filter(filterFunction)
    .reduce((acc, d) => {
      if (acc[d.subType]) {
        acc[d.subType] += d.amount;
      } else {
        acc[d.subType] = d.amount;
      }
      return acc;
    }, {})
    .map((total, receiver) => {
      return {
        value: total,
        name: receiver
      }
    })
    .sortBy('value')
    .takeRight(4)
    .reverse()
    .value();
}


function loadData(props) {
  const { donor_name } = props;
  props.loadDonor(donor_name);
}

class DonorPage extends Component {
  constructor(props){
    super(props)
  }
  componentWillMount() {
    loadData(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.donor_name !== this.props.donor_name){
      loadData(nextProps)
    }
  }

  render(){

    const { donors, donor_name } = this.props
    if (_.isEmpty(donors)) {
      // needs loading icon here
      return <h1><i>Loading... </i></h1>
    }
    const donor = {
      name: donor_name,
      locationDescription: 'In-State Donor',
      title: 'CEO',
      organization: 'Nike Inc.'
    };

    const transactions = _.values(donors);

    const cashSpent = _.filter(transactions, (transaction) => {
      return transaction.subType === 'Cash Expenditure' && transaction.direction === 'out';
    });
    const totalCashSpent = _.reduce(cashSpent, (acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    // const inKindDonated = _.filter(transactions, (transaction) => {
    //   return transaction.subType === 'Cash Expenditure' && transaction.direction === 'out';
    // });
    const spentTransactions = _.filter(transactions, (transaction) => transaction.direction === 'out');
    const totalContribution = _.reduce(spentTransactions, (acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    const averageSpent = totalContribution / spentTransactions.length;



    const dataSummaryValues = [
      { name: 'Total Cash Donated', value: currency(totalCashSpent) },
      { name: 'Total Donated In-Kind', value: currency(10.28000) },
      { name: 'Average Contribution', value: currency(averageSpent) },
      { name: 'Largest Contribution', value: currency(222500.1) }
    ];
    const barChartData = [[26], [87], [90], [10], [34]];
    const colorData = ['#bebada', '#fb8072', '#8dd3c7', '#b3de69', '#80b1d3'];
    const labelData = [];

    // const campaignRecipients = _.map([
    //   {
    //     contributorPayee: 'lsdkfdlk',
    //     filerId: 1,
    //     grandTotal: 2500,
    //     totalCount: 1
    //   },
    //   {
    //     contributorPayee: 'hello',
    //     filerId: 2,
    //     grandTotal: 200,
    //     totalCount: 1
    //   }
    // ], (d) => {
    //   return {
    //     name: d.contributorPayee,
    //     value: d.grandTotal
    //   }
    // });


    // NOTE: Warning: Unsure if d.bookType is the best way to differentiate between Campaign and PAC recipients

    const campaignRecipients = filterTransactions(transactions, (d) => {
      return d.bookType === "Individual";
    });

    const pacRecipients = filterTransactions(transactions, (d) => {
      return d.bookType !== "Individual";
    });


    return (
      <div>
        <BTCNav />
        <Grid fluid={ false }
          params={ this.props.params }>

          <DonorCard donor={donor} />

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

DonorPage.propTypes = {
  campaign: PropTypes.object,
  // searchTerm: PropTypes.string.isRequired,
  donor_name: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  const { donor_name } = ownProps.params
  const {
    entities: { donors }
  } = state;
  // const donor = transactions[donor_name]
  return {
    // donor_name, donor
    donors
  }
}

export default connect(mapStateToProps, {
  loadDonor
})(DonorPage)