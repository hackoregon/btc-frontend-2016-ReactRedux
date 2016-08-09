import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Grid, Row, Col} from 'react-flexbox-grid';
import DataBoxGroup from '../components/DataBoxes/DataBoxGroup.jsx';
import DataTable from '../components/DataVisuals/DataTable.jsx'
import BTCNav from '../components/Navigation/BTCNav.jsx';
import Footer from '../components/Navigation/Footer.jsx';
import Loading from '../components/Loading/Loading.jsx';

import {fetchOregon} from '../actions';
import _ from 'lodash'


const { object } = PropTypes;
// http://54.213.83.132/hackoregon/http/oregon_committee_contributors/_/
// http://54.213.83.132/hackoregon/http/oregon_business_contributors/_/
// http://54.213.83.132/hackoregon/http/oregon_individual_contributors/_/
// http://54.213.83.132/hackoregon/http/all_oregon_sum/_/


function loadData(props) {
    props.fetchOregon();
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



class HomePage extends Component {
  static propTypes = {
    params: object,
    allOregon: object
  }
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

    renderPage() {
        let pac = formatData(this.state.pac)
        const styles = {
            smallest: {
                minWidth: '320px'
            },
            reducedSize: {
                fontSize: '.85rem',
                fontWeight: '200'
            }
        }
        return (
            <Col center='xs' around='xs'>
                <Row styles={{
                    minWidth: '320px',
                    fontSize: '.85rem',
                    fontWeight: '200'
                }} xs>
                    <DataTable styles={{
                        ...styles.smallest,
                        ...styles.reducedSize
                    }} type='trans' title={'Latest Transactions'} data={formatData(this.state.feed, 'trans')}/>
                </Row>
                <Col xs>
                    <DataTable xs type='Top' title={'All-time Top Individual Donors'} data={formatData(this.state.ind)}/>
                    <Row between='xs'>
                        <Col xs style={{
                            minWidth: '320px'
                        }}>
                            <DataTable xs type='Top' title={'All-time Top Pac Donors'} data={pac}/>
                        </Col>
                        <Col xs style={{
                            minWidth: '320px'
                        }}>
                            <DataTable styles={{
                                ...styles.smallest,
                                ...styles.reducedSize
                            }} xs type='Top' title={'All-time Top Business Donors'} data={formatData(this.state.biz)}/>
                        </Col>

                    </Row>
                </Col>
            </Col>
        )
    }

    render() {

        let spending = this.state.display
            ? this.renderPage()
            : (<Loading name='cube-grid'/>);
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
                                title: 'New Funds',
                                value: '$313,412,231'
                            }, {
                                title: 'Transferred Funds',
                                value: '$307,489,692'
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

function mapStateToProps(state) {
    const {entities: {
            allOregon
        }} = state;
    return {allOregon}
}

export default connect(mapStateToProps, {fetchOregon})(HomePage)
// export default HomePage;