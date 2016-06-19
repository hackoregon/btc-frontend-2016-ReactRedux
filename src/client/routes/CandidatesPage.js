import React, { Component } from 'react';
import { Grid, Col } from 'react-flexbox-grid';
import {connect} from 'react-redux';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import Spinner from 'react-spinkit';
import * as json from '../data/transactions.json';
import {fetchCampaigns,loadStateInfo} from '../actions';
import d3 from 'd3';
import _ from 'lodash'
import ResultPage from '../containers/Result/ResultPage.jsx';
import moment from 'moment';

const parsed = _.values(json);

function loadData(props){
  const {filer_id} = props;
 props.fetchCampaigns(filer_id);
 props.loadStateInfo(filer_id);
}

function cleanData(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i]["filedDate"] == undefined) {
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

// const cleaned = cleanData(parsed);
//
// const byYear = d3.nest().key(function(d) {
//   if(d.filed_date){
//       return d.filed_date.split("-")[0];
//   }
//   }).rollup(function(v) {
//   return v
// }).map(cleaned);
// const selectKeys = Object.keys(byYear);
// console.log(selectKeys);

const Test = ({year,data}) =>{
  if(data){
  const divs = data.map((item,i) => {
    return (
      <Col key={i} style={{paddingBottom:'.5rem',margin:'.5rem',borderBottom:'1px #eee solid'}}>
      <Col>Filed date: {item.filedDate}</Col>
      <Col>Trans id: {item.tranId}</Col>
       </Col>
    )
  });
    return (
      <div>
        <Col><h3>{year}</h3></Col>
        {divs}</div>
    )
  }
  else {
    return (<Col>
      <h5>Choose a year</h5>
    </Col>);
  }
};

class CandidatesPage extends Component {
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

    shouldComponentUpdate(nextProps, nextState) {
      const {transactions} = nextProps;
      let trans = _.values(transactions);
      if(transactions && trans.length > 0){
        return true;
      }
      return false;
    }

    renderTest(){
        console.log('render test',this.state);
          return(<Test year={this.state.year} data={this.state.dispData} />);
    }

    handleSelect(year) {
      console.log('parent year',year);
      this.setState({
        year: year,
        dispData: this.state.data[year]
        // year: this.refs.nav.refs.subnav.refs.year.state.year
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
        console.log('render page',this.state.year);
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

      let elem = this.state.display ?
        (this.renderTest()) : (<Spinner spinnerName='rotating-plane'/>);
        console.log('before spending',this.state.data,this.state.year);
        let spending = this.state.display ? (this.renderPage(campaign,this.state.data[this.state.year],mungedSums,stateContributions,filer_id)) : (<Spinner spinnerName='cube-grid'/>);
        return (
            <div {...this.props}>
                <BTCNav ref={'nav'} years={selectKeys} onToggleSelect={this.handleSelect}/>
                <Grid fluid={ true }
                      style={ {    marginTop: '100px',    fontWeight: '200px'} }
                      params={ this.props.params }>
                  <Col>
                    <Col>
                      {spending}
                    </Col>
                    {elem}
                  </Col>
                </Grid>
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
})(CandidatesPage)
// export default CandidatesPage;
