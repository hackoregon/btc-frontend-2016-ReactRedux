import React, {Component, PropTypes} from 'react';
import {Col} from 'react-flexbox-grid';
import {FlexBody, FlexGrid} from '../components/Layout';
import {connect} from 'react-redux';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import Loading from '../components/Loading/Loading.jsx';
import {fetchCampaigns, loadStateInfo} from '../actions';
import d3 from 'd3';
import _ from 'lodash'
import ResultPage from '../containers/Result/ResultPage.jsx';
import moment from 'moment';

const {string, object, array} = PropTypes;

function loadData(props) {
    const {filer_id} = props;
    props.fetchCampaigns(filer_id);
    props.loadStateInfo(filer_id);
}

function cleanData(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i]['tranDate'] == undefined) {
            array.splice(i)
        }
    }
    return array
}

class Recipient extends Component {
    static propTypes = {
        campaign: object,
        filer_id: string,
        transactions: object,
        stateContributions: object,
        mungedSums: object,
        mungedSpending: object,
        params: object
    }

    constructor() {
        super()
        this.state = {
            year: '2016',
            display: false,
            dispData: null
        }
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentWillMount() {
        loadData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const {transactions, mungedSpending} = nextProps;
        if (!_.isEmpty(transactions) && !_.isEmpty(mungedSpending)) {
            let trans = _.values(transactions);
            const cleaned = cleanData(trans);
            const byYear = d3.nest().key(function(d) {
                if (d.tranDate) {
                    return moment(d.tranDate).format('YYYY');
                    // return d.filedDate.split("-")[1];
                }
            }).rollup(function(v) {
                return v
            }).map(cleaned);
            const selectKeys = Object.keys(byYear);
            const selectSpending = Object.keys(mungedSpending);
            this.setState({
                display: true,
                data: byYear,
                spending: mungedSpending,
                spendData: mungedSpending[selectSpending[selectSpending.length - 1]],
                year: selectKeys[selectKeys.length - 1],
                dispData: byYear[selectKeys[selectKeys.length - 1]]
            });
        }
    }

    shouldComponentUpdate(nextProps) {
        const {transactions} = nextProps;
        let trans = _.values(transactions);
        if (transactions && trans.length > 0) {

            return true;
        }
        return false;
    }

    handleSelect(year) {
        const {data, spending} = this.state;
        this.setState({
            year: year, dispData: data[year], spendData: spending[year]
        });
    }

    renderPage(campaign, data, spendData, mungedSums, stateInfo, filerId) {
        if (data) {
            const contribs = {
                ind: data.filter(datum => {
                    return datum.bookType === 'Individual' && datum.contributorPayeeClass != 'grassroots_contributor'
                }),
                grassroots: data.filter(datum => datum.contributorPayeeClass === 'grassroots_contributor'),
                biz: data.filter(datum => {
                    return datum.bookType === ('Business Entity')
                }),
                pac: data.filter(datum => {
                    return datum.contributorPayeeCommitteeId != null && datum.bookType !== ('Political Party Committee')
                }),
                party: data.filter((datum) => {
                    return datum.bookType === 'Political Party Committee'
                })
            }

            return (<ResultPage year={this.state.year} campaign={campaign} contributions={contribs} spendData={spendData} sums={mungedSums} stateInfo={stateInfo} filerId={filerId}/>)
        }
    }

    render() {
        const {
            campaign,
            filer_id,
            transactions,
            stateContributions,
            mungedSums,
            mungedSpending
        } = this.props;
        let trans = _.values(transactions);
        const cleaned = cleanData(trans);
        const byYear = d3.nest().key(function(d) {
            if (d.filedDate) {
                return d.filedDate.split('-')[0];
            }
        }).rollup(function(v) {
            return v
        }).map(cleaned);
        const selectKeys = Object.keys(byYear);

        if (!_.isEmpty(transactions) && !_.isEmpty(mungedSpending)) {

            let spending = this.state.display
                ? (this.renderPage(campaign, this.state.dispData, this.state.spendData, mungedSums, stateContributions, filer_id))
                : null;
            return (
                <FlexBody {...this.props} params={this.props.params}>
                    <BTCNav ref={'nav'} pageType={'singleResult'} years={selectKeys} onToggleSelect={this.handleSelect}/>
                    <FlexGrid>
                        <Col>
                            {spending}
                        </Col>
                    </FlexGrid>
                </FlexBody>
            );
        } else {
            return (<Loading name='cube-grid'/>);
        }
    }
}

function mapStateToProps(state, ownProps) {
    const {filer_id} = ownProps.params
    const {
        entities: {
            transactions,
            campaigns,
            stateContributions,
            mungedSums,
            mungedSpending
        }
    } = state;
    const campaign = campaigns[filer_id]
    return {
        filer_id,
        campaign,
        transactions,
        stateContributions,
        mungedSums,
        mungedSpending
    }
}

export default connect(mapStateToProps, {fetchCampaigns, loadStateInfo})(Recipient)