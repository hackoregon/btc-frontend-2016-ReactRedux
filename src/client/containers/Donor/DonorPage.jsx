import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash';
import { Table, Panel } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-flexbox-grid';
import d3 from 'd3';

import {fetchDonor} from '../../actions'

import BTCNav from '../../components/Navigation/BTCNav';
import DataBoxGroup from '../../components/DataBoxes/DataBoxGroup';
import DataTable from '../../components/DataVisuals/DataTable';
import BarChart from '../../components/BarChart/BarChart';
import StoryCard from '../../components/StoryCards/StoryCard';
import DonorCard from '../../components/DonorCard/DonorCard';

function totalOf(arr){
  return _.reduce(arr,(acc,transaction)=> {
    return acc + transaction.amount
  },0);
}


function currency(amount) {

  if (amount > 1000000) {
    return '$' + ((amount) / 1000000).toFixed(1) + 'M';
  } else if (amount > 1000) {
    return '$' + ((amount) / 1000).toFixed(1) + 'K';
  } else {
    return '$' + amount.toFixed(2);
  }
}

function filterTransactions(transactions, filterFunction) {

  return _.chain(transactions)
    .filter(filterFunction)
    .reduce((acc, d) => {
      if (acc[d.filer]) {
        acc[d.filer] += d.amount;
      } else {
        acc[d.filer] = d.amount;
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
    .takeRight(5)
    .reverse()
    .value();
}




function loadData(props) {
  const { donor_name } = props;
  props.fetchDonor(donor_name);
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

    const { donors, donor_name, transactions } = this.props
    if (_.isEmpty(transactions)) {
      // needs loading icon here
      return <h1><i>Loading... </i></h1>
    }
    const donor = {
      name: donor_name,
      locationDescription: 'In-State Donor',
      title: 'CEO',
      organization: 'Nike Inc.'
    };

    // const transactions = _.values(donors);
    // const total = _.reduce
    const cash = _.filter(transactions, (transaction) => {
      return transaction.subType === 'Cash Expenditure';
    });

    const totalCash = _.reduce(cash, (acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    const inKind = _.filter(transactions, (transaction) => {
      return transaction.subType === 'In-Kind Contribution';
    });

    const largest = d3.max(_.toArray(transactions), (t)=>{return t.amount});

    const spentTransactions = _.filter(transactions, (transaction) => transaction.direction === 'out');
    const totalContribution = _.reduce(spentTransactions, (acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    const averageSpent = totalContribution / spentTransactions.length;


    const dataSummaryValues = [
      { name: 'Total Donations', value: currency(totalOf(transactions))},
      { name: 'Total Cash Donations', value: currency(totalOf(cash)) },
      { name: 'Total Donated In-Kind', value: currency(totalOf(inKind)) },
      { name: 'Average Contribution', value: currency(averageSpent) },
      { name: 'Largest Contribution', value: currency(largest) }
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
      return d.contributor_payee_committee_id === null;
    });

    const pacRecipients = filterTransactions(transactions, (d) => {
      return d.contributorPayeeCommitteeId != null;
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
    entities: { donors, transactions }
  } = state;
  // const donors = donors[donor_name]
  return {
    donor_name,
    donors,
    transactions
  }
}

export default connect(mapStateToProps, {
  fetchDonor
})(DonorPage)