import React, { Component, PropTypes } from 'react'
import DonutChart from '../../components/DonutChart/DonutChart.jsx'
import numeral from 'numeral';

class ResultDonut extends Component {
  render () {
    let {total, totalSpent, grassroots, instate} = this.props;
    return(
      <div>
      <DonutChart data = {[total,totalSpent]} />
      <DonutChart data = {[grassroots,totalSpent]} />
      </div>)
  }
}

export default ResultDonut;
