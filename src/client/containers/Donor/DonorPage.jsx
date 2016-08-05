import React, {Component, PropTypes} from 'react'
// import {connect} from 'react-redux'
import _ from 'lodash';
import Loading from '../../components/Loading/Loading.jsx';
// import { Table, Panel } from 'react-bootstrap';
import {Grid, Row, Col} from 'react-flexbox-grid';
import d3 from 'd3';
import DonationsSnugget from './DonationsSnugget.jsx';
import MonthField from '../../components/Select/Month.jsx'

// import {fetchDonor} from '../../actions'

import BTCNav from '../../components/Navigation/BTCNav';
import DataBoxGroup from '../../components/DataBoxes/DataBoxGroup';
import DataTable from '../../components/DataVisuals/DataTable';
import BarChart from '../../components/BarChart/BarChart';
import StoryCard from '../../components/StoryCards/StoryCard';
import DonorCard from '../../components/DonorCard/DonorCard';

function totalOf(arr) {
    return _.reduce(arr, (acc, transaction) => {
        return acc + transaction.amount
    }, 0);
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

    return _.chain(transactions).filter(filterFunction).reduce((acc, d) => {
        if (acc[d.filer]) {
            acc[d.filer] += d.amount;
        } else {
            acc[d.filer] = d.amount;
        }
        return acc;
    }, {}).map((total, receiver) => {
        return {value: total, name: receiver}
    }).sortBy('value').takeRight(5).reverse().value();
}

// function loadData(props) {
//   const { donorName } = props;
//   props.fetchDonor(donorName);
// }
function getDonorMeta(d, t) {
    let loc = null
    if (t) {
        loc = t[0].state == 'OR'
            ? 'In-state donor'
            : 'Out of state donor';
    }

    return {
        name: d.fullName,
        title: d.jobTitle,
        url: d.employerUrl,
        badges: d.patronageCategories,
        organization: d.employerIndustry || null,
        locationDescription: loc
    }
}

function getFilerAmounts(trans) {
    var obj = {}
    trans.forEach((item) => {
        if (item.filer) {
            let filer = item['filer'].split(';');
            if (filer in obj) {
                obj[filer] += item.amount;
            } else {
                obj[filer] = item.amount;
            }
        }
    })
    return obj
}
function makeYearData(data) {
    let yearData = [];
    _.toArray(data).forEach((month) => {
        for (var i = 0; i < month.length; i++) {
            yearData.push(month[i]);
        }
    });
    return yearData;
}
class DonorPage extends Component {
    constructor(props) {
        super(props)
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
      debugger;
        const {donorName, donor, transactions, spendData, year} = this.props;

        if (!_.isEmpty(spendData)) {
            const yearData = makeYearData(spendData);
            this.setState({
                donorName,
                spendData,
                year,
                donor,
                dispData: yearData,
                yearData,
                transactions
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const {spendData, year} = nextProps;

        if (!_.isEmpty(spendData)) {
            const yearData = makeYearData(spendData);
            this.setState({spendData, year, dispData: yearData});
        }
    }
    //
    shouldComponentUpdate(nextProps, nextState) {
        const {dispData} = nextState;
        if (dispData == this.state.dispData) {
            return false;
        }
        return true;
    }

    handleSelect(options) {
        if (options) {
            const months = options.split(',');
            const allData = [...months.map(m => {
                    return this.props.spendData[m.toLowerCase()] || null;
                })];
            let monthsData = [];
            for (let i = 0; i < allData.length; i++) {
                if (allData[i]) {
                    monthsData.push(...allData[i]);
                }
            }
            if (_.isEmpty(monthsData)) {
                return this.setState({dispData: this.state.yearData});
            }
            return this.setState({dispData: monthsData});
        }
    }

    render() {
        const {year, donor, donorName, spendData, transactions} = this.props
        const {dispData} = this.state;
        // const {patronageCategories} = donor;
        debugger;
        let donorMeta;
        // let tData = null;
        // console.log(dispData);
        if (_.isEmpty(donor) && _.isEmpty(transactions)) {
            // needs loading icon here
            return (<Loading name='rotating-plane'/>)
        }

        if (!_.isEmpty(donor) && _.isEmpty(transactions)) {
            donorMeta = getDonorMeta(donor);
            tData = (<Loading name='rotating-plane'/>);
        }

        donorMeta = getDonorMeta(donor, transactions);
        // const donor = {
        //   name: donorName,
        //   locationDescription: 'In-State Donor',
        //   title: 'CEO',
        //   organization: 'Nike Inc.'
        // };

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

        const largest = d3.max(_.toArray(transactions), (t) => {
            return t.amount
        });

        const spentTransactions = _.filter(transactions, (transaction) => transaction.direction === 'out');
        const totalContribution = _.reduce(spentTransactions, (acc, transaction) => {
            return acc + transaction.amount;
        }, 0);
        const averageSpent = totalContribution / spentTransactions.length;

        const dataSummaryValues = [
            {
                name: 'Total Donations',
                value: currency(totalOf(transactions))
            }, {
                name: 'Total Cash Donations',
                value: currency(totalOf(cash))
            }, {
                name: 'Total Donated In-Kind',
                value: currency(totalOf(inKind))
            }, {
                name: 'Average Contribution',
                value: currency(averageSpent)
            }, {
                name: 'Largest Contribution',
                value: currency(largest)
            }
        ];

        const barChartData = [[26], [87], [90], [10], [34]
        ];
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

        // const campaignRecipients = filterTransactions(transactions, (d) => {
        //     return d.contributor_payee_committee_id === null;
        // });
        //
        // const pacRecipients = filterTransactions(transactions, (d) => {
        //     return d.contributorPayeeCommitteeId != null;
        // });

        const labels = _.keys(spendData);
        // const patronageIcons = patronageCategories && patronageCategories.length
        //     ? (
        //         <Col center='xs' around={'xs'} middle={'xs'} xs={12} style={{
        //             height: 'auto',
        //             display: 'flex',
        //             justifyContent: 'space-around'
        //         }}>
        //             <Row xs={6} center={'xs'} middle={'xs'}>
        //                 {(patronageCategories.map((item) => {
        //                     return <Col xs style={{
        //                         padding: '1rem'
        //                     }}>
        //                         <h5>{item}</h5>
        //                     </Col>
        //                 }))}
        //             </Row>
        //         </Col>
        //     )
        //     : null;
        //     console.log(transactions,spendData)

        // <DonorCard donor={donorMeta}/> {patronageIcons}
        return (
            <Grid {...this.props} fluid={false} params={this.props.params}>
                <DonorCard donor={donorMeta}/>
                <Col>

                    <Row xs={6} style={{
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}>
                        <MonthField style={{
                            alignSelf: 'center'
                        }} xs={1} ref={'month'} months={labels} year={year} onToggleSelect={this.handleSelect}/>
                    </Row>
                    {dispData && !_.isEmpty(dispData)
                        ? (<DonationsSnugget year={year} data={this.state.dispData}/>)
                        : (<Loading name='rotating-plane'/>)}
                </Col>
            </Grid>
        );

    }
}

DonorPage.propTypes = {
    donor: PropTypes.object,
    year: PropTypes.string,
    transactions: PropTypes.array,
    spendData: PropTypes.object,
    // searchTerm: PropTypes.string.isRequired,
    donorName: PropTypes.string.isRequired
}

// function mapStateToProps(state, ownProps) {
//   const { donorName } = ownProps.params
//   const {
//     entities: { donors, transactions }
//   } = state;
//   // const donors = donors[donorName]
//   return {
//     donorName,
//     donors,
//     transactions
//   }
// }

export default DonorPage;
// export default connect(mapStateToProps, {
// fetchDonor
// })(DonorPage)
//

// <StoryCard
//   question={"Who are they giving to?"}
//   description={"This visualization is calculated by total dollars, not total people."}>
//
//
//   <h2>How much are they giving?</h2>
//   <DataBoxGroup boxes={dataSummaryValues} />
// </StoryCard>
//
// <StoryCard
//   question={"Who are they giving to?"}
//   description={"This visualization is calculated by total dollars, not total people."}>
//
//   <BarChart
//     colorBySeries={true}
//     height={300}
//     data={barChartData}
//     labels={labelData}
//     colors={colorData} />
//
//   <Grid>
//     <Row>
//       <Col md={6}>
//         <DataTable
//           title='Top Campaign Recipients'
//           data={campaignRecipients}
//           />
//       </Col>
//       <Col md={6}>
//         <DataTable
//           title='Top PAC Recipients'
//           data={pacRecipients}
//           />
//       </Col>
//     </Row>
//   </Grid>
// </StoryCard>