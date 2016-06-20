import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import {Grid, Row, Col}  from 'react-flexbox-grid';
import DataBoxGroup from '../components/DataBoxes/DataBoxGroup.jsx';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import Footer from '../components/Navigation/Footer.jsx';
import Loading from '../components/Loading/Loading.jsx';
import ResultPage from '../containers/Result/ResultPage.jsx';

import {fetchCampaigns,loadStateInfo} from '../actions';

import d3 from 'd3';
import _ from 'lodash'
import moment from 'moment';

// http://54.213.83.132/hackoregon/http/oregon_committee_contributors/_/
// http://54.213.83.132/hackoregon/http/oregon_business_contributors/_/
// http://54.213.83.132/hackoregon/http/oregon_individual_contributors/_/
// http://54.213.83.132/hackoregon/http/all_oregon_sum/_/

function loadData(props){
  console.log('loading')
  // const {filer_id} = props;
 // props.fetchCampaigns(filer_id);
 // props.loadStateInfo(filer_id);
}

function cleanData(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i]['filedDate'] == undefined) {
      array.splice(i)
    }
  }
  return array
}

function splitCodes (trans) {
  if(trans){
    let obj = {}
    trans.forEach((item) => {
      if(item.direction=='out' && item.purposeCodes){
      let codes = item['purposeCodes'].split(';');
      codes.map((code) => {
        let c = code.trim()
        if(c in obj){
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
    constructor(){
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
      const {transactions} = nextProps;
      if(!_.isEmpty(transactions)){
        let trans = _.values(transactions);
        const cleaned = cleanData(trans);
        const byYear = d3.nest()
        .key(function(d) {
          if(d.filedDate){
            return moment(d.filedDate).format('YYYY');
              // return d.filedDate.split("-")[1];
          }
          }).rollup(function(v) {
          return v
        }).map(cleaned);
        const selectKeys = Object.keys(byYear);
        this.setState({
          data: byYear,
          year: selectKeys[selectKeys.length-1],
          display: true,
          dispData: byYear[selectKeys[selectKeys.length-1]]
        });
      }
    }

    shouldComponentUpdate(nextProps) {
      const {transactions} = nextProps;
      let trans = _.values(transactions);
      if(transactions && trans.length > 0){
        return true;
      }
      return false;
    }

    handleSelect(year) {
      this.setState({
        year: year,
        dispData: this.state.data[year]
      });
    }

    renderSpend(){
      let spend = JSON.stringify(splitCodes(this.state.dispData));
      return(
        <div>
            {spend}
        </div>
      )
    }

    renderPage(campaign,transactions,mungedSums,stateInfo, filerId){
      const data = this.state.data[this.state.year];
      if(data){
        const contribs = {
          ind : data.filter(datum => {return datum.bookType === 'Individual' && datum.contributorPayeeClass != 'grassroots_contributor' }),
          grassroots: data.filter(datum => datum.contributorPayeeClass === 'grassroots_contributor'),
          biz : data.filter(datum => {return datum.bookType === ('Business Entity')}),
          pac : data.filter(datum => {return datum.contributorPayeeCommitteeId != null && datum.bookType !== ('Political Party Committee')}),
          party: data.filter((datum) => {return datum.bookType === 'Political Party Committee'})
        }
        return (
          <ResultPage year={this.state.year}
            campaign={campaign} contributions={contribs} sums={mungedSums} stateInfo={stateInfo} filerId={filerId} />
        )
      }
    }

    render() {
      const {campaign, filer_id, transactions, stateContributions,mungedSums} = this.props;
      let trans = _.values(transactions);
      const cleaned = cleanData(trans);
      const byYear = d3.nest()
      .key(function(d) {
        if(d.filedDate){
            return d.filedDate.split("-")[0];
        }
        }).rollup(function(v) {
        return v
      }).map(cleaned);
      const selectKeys = Object.keys(byYear);



        let spending = this.state.display ? (this.renderPage(campaign,this.state.data[this.state.year],mungedSums,stateContributions,filer_id)) : (<Loading name='cube-grid'/>);
        return (
          <div {...this.props} style={{display:'flex',minHeight:'100vh',flexDirection:'column'}}>
            <BTCNav ref={'nav'} onToggleSelect={this.handleSelect}/>
            <div style={{flex:'1',paddingTop:'2rem'}}>

                <Grid fluid={ true }
                      params={ this.props.params }>
                      <DataBoxGroup boxes={[
                        {title:"New Funds", value:"$313,412,231"},
                        {title:"Transferred Funds", value:"$307,489,692"}
                      ]} />
                  <Col>
                      {spending}
                  </Col>
                </Grid>
              </div>
                <Footer style={{flex: '1'}}/>
            </div>
            );
    }
}
function mapStateToProps(state, ownProps) {
  const { filer_id } = ownProps.params
  const {
    entities: { transactions, campaigns, stateContributions, mungedSums }
  } = state;
  const campaign = campaigns[filer_id]
  return {
    filer_id, campaign, transactions, stateContributions, mungedSums
  }
}


export default connect(mapStateToProps, {
  fetchCampaigns, loadStateInfo
})(HomePage)
// export default HomePage;
