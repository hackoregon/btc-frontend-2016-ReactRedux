import React, { PropTypes } from 'react';
import numeral from 'numeral';
import DataBoxGroup from '../../components/DataBoxes/DataBoxGroup.jsx';

const ResultSummaryCard = ({total, totalSpent, grassroots, instate}) => {
  debugger
  total = numeral(total).format('($ 0.00 a)')
  totalSpent = numeral(totalSpent).format('($ 0.00 a)')
  grassroots = numeral(grassroots).format('0.0%')
  instate = numeral(instate).format('0.0%')
  return (
    <DataBoxGroup
      boxes={[
        {
        name: 'Raised',
        value: total},
        {
          name: 'Spent',
          value: totalSpent
        },
        {
          name: 'Grassroots',
          value: grassroots
        },
        {
          name: 'In state',
          value: instate
        }
      ]}/>
  )
}

export default ResultSummaryCard
