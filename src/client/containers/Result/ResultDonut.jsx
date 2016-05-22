import React, { Component, PropTypes } from 'react'
import DonutChart from '../../components/DonutChart.jsx'
import numeral from 'numeral';

class ResultDonut extends Component {
  render () {
    const {total, totalSpent, grassroots, instate} = this.props;
    total = numeral(total).format('($ 0.00 a)')
    totalSpent = numeral(totalSpent).format('($ 0.00 a)')
    grassroots = numeral(grassroots).format('0.0%')
    instate = numeral(instate).format('0.0%')
    return(
      <div>
      <DonutChart data = {[total,totalSpent]} />
      <DonutChart data = {[grassroots,totalSpent]} />
      </div>)
  }
}

export default ResultDonut;
