import * as json from '../../data/transactions.json';
import {Row, Col} from 'react-flexbox-grid'
import d3 from 'd3';
import React, { PropTypes } from 'react'
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

let byYear = d3.nest().key(function(d) {
  if(d.filed_date){
      return d.filed_date.split("-")[0];
  }
  }).rollup(function(v) {
  return v
}).map(cleaned);
let selectKeys = Object.keys(byYear);
console.log(selectKeys);

const Test = () =>{
  const divs = parsed.map((item,i) => {
    return (
      <Col key={i} style={{paddingBottom:'.5rem',margin:'.5rem',borderBottom:'1px #eee solid'}}>
      <Col>Filed date: {item.filed_date}</Col>
      <Col>Trans id: {item.tran_id}</Col>
       </Col>
    )
  });
    return (
      <div>
        <Col>this.state.year</Col>
        {divs}
      </div>
    )
};

export default Test
