import React, { Component, PropTypes } from 'react';
import { Grid, Col } from 'react-flexbox-grid';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import Spinner from 'react-spinkit';
import * as json from '../data/transactions.json';
import d3 from 'd3';
import _ from 'lodash'

const parsed = _.values(json);

function cleanData(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i]["filed_date"] == undefined) {
      array.splice(i)
    }
  }
  return array
}

const cleaned = cleanData(parsed);

const byYear = d3.nest().key(function(d) {
  if(d.filed_date){
      return d.filed_date.split("-")[0];
  }
  }).rollup(function(v) {
  return v
}).map(cleaned);
const selectKeys = Object.keys(byYear);
console.log(selectKeys);

const Test = ({year,data}) =>{
  if(data){
  const divs = data.map((item,i) => {
    return (
      <Col key={i} style={{paddingBottom:'.5rem',margin:'.5rem',borderBottom:'1px #eee solid'}}>
      <Col>Filed date: {item.filed_date}</Col>
      <Col>Trans id: {item.tran_id}</Col>
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
      this.handleSelect = this.handleSelect.bind(this);
    }
    componentWillMount() {
      this.setState({
        data: byYear,
        year: selectKeys[selectKeys.length]
      });
    }

    componentDidMount() {
      debugger;
      // this.renderTest()
    }

    renderTest(){
      return(<Test year={this.state.year} data={this.state.data[this.state.year]} />);
    }

    handleSelect(year) {
      console.log('parent year',year);
      this.setState({
        year: year
        // year: this.refs.nav.refs.subnav.refs.year.state.year
      });
    }

    render() {
        return (
            <div>
                <BTCNav ref={'nav'} onToggleSelect={this.handleSelect}/>
                <Grid fluid={ true }
                      style={ {    marginTop: '100px',    fontWeight: '200px'} }
                      params={ this.props.params }>
                  <Col>
                    {this.renderTest()}
                  </Col>
                </Grid>
            </div>
            );
    }
}

export default CandidatesPage;
