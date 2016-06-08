import React, { Component, PropTypes } from 'react';
import { Grid, Col } from 'react-flexbox-grid';
import {connect} from 'react-redux';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import Footer from '../components/Navigation/Footer.jsx'
import Spinner from 'react-spinkit';
import * as json from '../data/transactions.json';
import {fetchCampaigns} from '../actions';
import d3 from 'd3';
import _ from 'lodash'

const parsed = _.values(json);

function loadData(props){
  const {filer_id} = props;
 props.fetchCampaigns(filer_id);
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
      let trans = _.values(transactions);
      const cleaned = cleanData(trans);
      const byYear = d3.nest().key(function(d) {
        if(d.filedDate){
            return d.filedDate.split("-")[0];
        }
        }).rollup(function(v) {
        return v
      }).map(cleaned);
      const selectKeys = Object.keys(byYear);
      this.setState({
        data: byYear,
        year: selectKeys[selectKeys.length],
        display: true,
        dispData: byYear[selectKeys.length]
      });
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
        console.log(this.state);
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

    render() {
      const {transactions} = this.props;
      let trans = _.values(transactions);
      const cleaned = cleanData(trans);
      const byYear = d3.nest().key(function(d) {
        if(d.filedDate){
            return d.filedDate.split("-")[0];
        }
        }).rollup(function(v) {
        return v
      }).map(cleaned);
      const selectKeys = Object.keys(byYear);

      let elem = this.state.display ?
        (this.renderTest()) : (<Spinner spinnerName='rotating-plane'/>);

        let spending = this.state.display ? (this.renderSpend()) : (<Spinner spinnerName='cube-grid'/>);
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
                <Footer />
            </div>
            );
    }
}
function mapStateToProps(state, ownProps) {
  const { filer_id } = ownProps.params
  const {
    entities: { transactions, campaigns }
  } = state;
  const campaign = campaigns[filer_id]
  return {
    filer_id, campaign, transactions
  }
}


export default connect(mapStateToProps, {
  fetchCampaigns
})(CandidatesPage)
// export default CandidatesPage;
