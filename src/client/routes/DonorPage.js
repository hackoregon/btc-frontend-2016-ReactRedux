import React, { Component } from 'react';
import { Grid, Col } from 'react-flexbox-grid';
import {FlexBody, FlexGrid} from '../components/Layout';
import {connect} from 'react-redux';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import Loading from '../components/Loading/Loading.jsx';
import {fetchDonor} from '../actions';
import d3 from 'd3';
import _ from 'lodash'
import DonorPage from '../containers/Donor/DonorPage.jsx';
import moment from 'moment';

function loadData(props){
  const {donorName} = props;
 props.fetchDonor(donorName);
}

function cleanData(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i]['tranDate'] == undefined) {
      array.splice(i)
    }
  }
  return array
}

class Donor extends Component {
    constructor(){
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
      const {donationsData} = nextProps;

      // if(!_.isEmpty(donationsData) && !_.isEmpty(mungedSpending)){
      if(!_.isEmpty(donationsData)){
        const {transactions,mungedDonations,filerIds} = donationsData;
        // const cleaned = cleanData(trans);
        // const byYear = d3.nest()
        // .key(function(d) {
        //   if(d.tranDate){
        //     return moment(d.tranDate).format('YYYY');
        //       return d.tranDate.split("-")[1];
        //   }
        //   }).rollup(function(v) {
        //   return v
        // }).map(cleaned);
        const selectKeys = Object.keys(mungedDonations);
      //   const selectSpending = Object.keys(mungedSpending);
        this.setState({
          display: true,
          data: mungedDonations,
          year: selectKeys[selectKeys.length-1],
          dispData: mungedDonations[selectKeys[selectKeys.length-1]]
        });
      }
    }

    shouldComponentUpdate(nextProps) {
      const {donationsData} = nextProps;
      if(!_.isEmpty(donationsData)){
      const {transactions,mungedDonations,filerIds} = donationsData;
        if(transactions.length > 0){
        return true;
        }
      }
      return false;
    }

    handleSelect(year) {
      const {data} = this.state;
      // const {data,spending} = this.state;

      this.setState({
        year: year,
        dispData: data[year]
        // spendData: spending[year]

        // dispSpending: this.state.spendData[year]
      });
    }

    renderPage(year,donor,data,allTransactions,donorName){
      // if(data){
      //   const contribs = {
      //     ind : data.filter(datum => {return datum.bookType === 'Individual' && datum.contributorPayeeClass != 'grassroots_contributor' }),
      //     grassroots: data.filter(datum => datum.contributorPayeeClass === 'grassroots_contributor'),
      //     biz : data.filter(datum => {return datum.bookType === ('Business Entity')}),
      //     pac : data.filter(datum => {return datum.contributorPayeeCommitteeId != null && datum.bookType !== ('Political Party Committee')}),
      //     party: data.filter((datum) => {return datum.bookType === 'Political Party Committee'})
      //   }

        return (
          <DonorPage year={year}
            donor={donor} spendData={this.state.dispData} transactions={allTransactions} donorName={donorName} />
        )
      // }
    }

    render() {
      const {donor, donorName, donationsData } = this.props;

      if(!_.isEmpty(donationsData)){
        const {transactions,mungedDonations,filerIds} = donationsData;

        const selectKeys = Object.keys(mungedDonations);
        let donations = this.state.display ? (this.renderPage(this.state.year,donor,this.state.dispData,transactions,donorName)) : null;
        return (
            <FlexBody {...this.props} params={ this.props.params }>
                <BTCNav ref={'nav'} pageType={'singleResult'} years={selectKeys} onToggleSelect={this.handleSelect}/>
                <FlexGrid>
                  <Col>
                      {donations}
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
  const { donorName } = ownProps.params
  const {
    entities: { donationsData, donors }
  } = state;
  const donor = donors[donorName]
  return {
    donorName, donor, donationsData
  }
}


export default connect(mapStateToProps, {
  fetchDonor
})(Donor);