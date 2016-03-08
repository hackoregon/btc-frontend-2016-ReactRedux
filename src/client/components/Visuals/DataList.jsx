import React from 'react';
import {VictoryBar} from 'victory';

const SmallBar = ({data}) => {
  return (
    <VictoryBar horizontal />
  );
}

const DataList = React.createClass({
  render () {
    return (
      <SmallBar data={ {x:amount}}
    )
  }
})

export default DataList;
