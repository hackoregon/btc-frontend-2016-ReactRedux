import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Grid, Row, Col} from 'react-flexbox-grid';
import DataBoxGroup from '../components/DataBoxes/DataBoxGroup.jsx';
import DataTable from '../components/DataVisuals/DataTable.jsx'
import BTCNav from '../components/Navigation/BTCNav.jsx';
import Footer from '../components/Navigation/Footer.jsx';
import Loading from '../components/Loading/Loading.jsx';
import ResultPage from '../containers/Result/ResultPage.jsx';

import {fetchOregon} from '../actions';

import d3 from 'd3';
import _ from 'lodash'
import moment from 'moment';
// http://54.213.83.132/hackoregon/http/oregon_committee_contributors/_/
// http://54.213.83.132/hackoregon/http/oregon_business_contributors/_/
// http://54.213.83.132/hackoregon/http/oregon_individual_contributors/_/
// http://54.213.83.132/hackoregon/http/all_oregon_sum/_/
function loadData(props) {
    props.fetchOregon();
}

const makeTop = (trans, num) => {

    return _.chain(trans).reduce((acc, d) => {
        if (acc[d.contributorPayee]) {
            acc[d.contributorPayee] += d.amount;
        } else {
            acc[d.contributorPayee] = d.amount;
        }
        return acc;
    }, {}).map((total, payee) => {
        return {value: total, name: formatName(payee), link: payee}
    }).sortBy('value').takeRight(num).reverse().value();
}

function formatData(arr, dataType) {

    switch (dataType) {
        case 'trans':
            return arr.map((item) => {
                const {
                    bookType,
                    direction,
                    filer,
                    filerId,
                    contributorPayee,
                    amount
                } = item;
                return {
                    type: 'feed',
                    bookType,
                    direction,
                    name: contributorPayee,
                    filer,
                    filerId,
                    value: amount
                }
            })
        default:
            return arr.map((item) => {
                return {
                    type: 'top',
                    name: item.contributorPayee || item.candidateName || item.filer,
                    link: item.filerId || item.contributorPayeeCommitteeId || item.candidateName || item.contributorPayee,
                    value: item.sum || item.grandTotal || item.amount
                }
            })
    }

}

function cleanData(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i]['filedDate'] == undefined) {
            array.splice(i)
        }
    }
    return array
}

function splitCodes(trans) {
    if (trans) {
        let obj = {}
        trans.forEach((item) => {
            if (item.direction == 'out' && item.purposeCodes) {
                let codes = item['purposeCodes'].split(';');
                codes.map((code) => {
                    let c = code.trim()
                    if (c in obj) {
                        obj[c] += item.amount / codes.length; // NOTE - splitting based on length of codes in trans
                    } else {
                        obj[c] = 0;
                    }
                })
            }
        })
        return obj
    }
}

class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            year: 'Search..',
            display: false,
            dispData: null
        }
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentWillMount() {
        loadData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const {allOregon} = nextProps;
        if (!_.isEmpty(allOregon)) {
            // let trans = _.values(transactions);
            // const cleaned = cleanData(trans);
            // const byYear = d3.nest()
            // .key(function(d) {
            //   if(d.filedDate){
            //     return moment(d.filedDate).format('YYYY');
            //       // return d.filedDate.split("-")[1];
            //   }
            //   }).rollup(function(v) {
            //   return v
            // }).map(cleaned);
            // const selectKeys = Object.keys(byYear);
            // this.setState({
            //   data: byYear,
            //   year: selectKeys[selectKeys.length-1],
            //   display: true,
            //   dispData: byYear[selectKeys[selectKeys.length-1]]
            // });
            const {feed, sum, biz, pac, ind} = allOregon;

            this.setState({
                display: true,
                feed,
                sum,
                biz,
                pac,
                ind
            });

        }
    }

    shouldComponentUpdate(nextProps) {
        const {allOregon} = nextProps;
        let oregon = _.values(allOregon);
        if (oregon && oregon.length > 0) {
            return true;
        }
        return false;
    }

    handleSelect(year) {
        this.setState({year: year, dispData: this.state.data[year]});
    }

    // renderPage(allOregon){
    //   const data = this.state.data[this.state.year];
    //   if(data){
    //     const contribs = {
    //       ind : data.filter(datum => {return datum.bookType === 'Individual' && datum.contributorPayeeClass != 'grassroots_contributor' }),
    //       grassroots: data.filter(datum => datum.contributorPayeeClass === 'grassroots_contributor'),
    //       biz : data.filter(datum => {return datum.bookType === ('Business Entity')}),
    //       pac : data.filter(datum => {return datum.contributorPayeeCommitteeId != null && datum.bookType !== ('Political Party Committee')}),
    //       party: data.filter((datum) => {return datum.bookType === 'Political Party Committee'})
    //     }
    //     return (
    //       <ResultPage year={this.state.year}
    //         campaign={campaign} contributions={contribs} sums={mungedSums} stateInfo={stateInfo} filerId={filerId} />
    //     )
    //   }
    // }
    renderPage() {
        let pac = formatData(this.state.pac)
        const styles = {
          smallest: {
            minWidth:'320px'
          },
          reducedSize: {
            fontSize: '.85rem',
            fontWeight: '200'
          }
        }
        return (
            <Col center='xs' around='xs'>
                <Row styles={{minWidth:'320px',fontSize:'.85rem',fontWeight:'200'}} xs>
                    <DataTable styles={{...styles.smallest,...styles.reducedSize}} type='trans' title={'Latest Transactions'} data={formatData(this.state.feed, 'trans')}/>
                </Row>
                <Col xs>
                    <DataTable xs type='Top' title={'All-time Top Individual Donors'} data={formatData(this.state.ind)}/>
                    <Row between='xs'>
                        <Col xs style={{minWidth:'320px'}}>
                            <DataTable xs type='Top' title={'All-time Top Pac Donors'} data={pac}/>
                        </Col>
                        <Col xs style={{minWidth:'320px'}}>
                            <DataTable styles={{...styles.smallest,...styles.reducedSize}} xs type='Top' title={'All-time Top Business Donors'} data={formatData(this.state.biz)}/>
                        </Col>

                    </Row>
                </Col>
            </Col>
        )
    }

    render() {
        const {allOregon} = this.props;
        // let trans = _.values(transactions);
        // const cleaned = cleanData(trans);
        // const byYear = d3.nest()
        // .key(function(d) {
        //   if(d.filedDate){
        //       return d.filedDate.split("-")[0];
        //   }
        //   }).rollup(function(v) {
        //   return v
        // }).map(cleaned);
        // const selectKeys = Object.keys(byYear);

        let spending = this.state.display
            ? this.renderPage()
            : (<Loading name='cube-grid'/>);
        // (this.renderPage(this.state.data[this.state.year])) : (<Loading name='cube-grid'/>);
        return (
            <div {...this.props} style={{
                display: 'flex',
                minHeight: '100vh',
                flexDirection: 'column'
            }}>
                <BTCNav ref={'nav'} pageType={'home'} onToggleSelect={this.handleSelect}/>
                <div style={{
                    flex: '1',
                    paddingTop: '2rem'
                }}>

                    <Grid fluid={true} params={this.props.params}>
                        <DataBoxGroup boxes={[
                            {
                                title: "New Funds",
                                value: "$313,412,231"
                            }, {
                                title: "Transferred Funds",
                                value: "$307,489,692"
                            }
                        ]}/> {spending}
                    </Grid>
                </div>
                <Footer style={{
                    flex: '1'
                }}/>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    const {filer_id} = ownProps.params
    const {entities: {
            allOregon
        }} = state;
    return {allOregon}
}

export default connect(mapStateToProps, {fetchOregon})(HomePage)
// export default HomePage;