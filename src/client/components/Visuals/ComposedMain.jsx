import React, { Component } from 'react';
import { ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area, Bar, Line } from 'recharts';

class Example extends Component {

  componentWillReceiveProps(nextProps,nextState) {
    // debugger;
  }

  render() {
  return (
      	<ComposedChart width={800} height={400} data={this.props.data}
              margin={{top: 20, right: 80, bottom: 20, left: 20}}>
            <XAxis dataKey="contributor_payee" label="Donations"/>
            <YAxis label="Amount"/>
            <Tooltip/>
            <Legend/>
            <CartesianGrid stroke='#f5f5f5'/>
            <Area type='monotone' dataKey='amount' fill='#8884d8' stroke='#8884d8'/>
            <Bar dataKey='amount' barSize={10} fill='#413ea0'/>
            <Line type='monotone' dataKey='amount' stroke='#ff7300'/>
         </ComposedChart>
      );
    }
};

export default Example;