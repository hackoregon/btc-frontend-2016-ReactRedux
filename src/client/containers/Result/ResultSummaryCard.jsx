import React, { PropTypes } from 'react';
import numeral from 'numeral';
import DataBoxGroup from '../../components/DataBoxes/DataBoxGroup.jsx';

const formatMoney = (num) => numeral(num).format('($ 0.00 a)');
const ResultSummaryCard = ({newTotal, xferTotal}) => {

  // newTotal = numeral(total).format('($ 0.00 a)')
  // totalSpent = numeral(totalSpent).format('($ 0.00 a)')
  // grassroots = numeral(grassroots).format('0.0%')
  // instate = numeral(instate).format('0.0%')
  return (
    <DataBoxGroup
      boxes={[
        {
        name: 'New Funds',
        value: formatMoney(newTotal)},
        {
          name: 'Transferred Funds',
          value: formatMoney(xferTotal)
        }
      ]}/>
  )
}

export default ResultSummaryCard
