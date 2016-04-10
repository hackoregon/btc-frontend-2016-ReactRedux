import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Table} from 'react-bootstrap';
import DonorRowItem from '../../components/Visuals/DonorRowItem.jsx';
import numeral from 'numeral';

class ResultDonorsList extends Component {

  constructor(props, content) {
    super(props, content);
    console.log(props, content)
  }
  componentWillReceiveProps(nextProps) {
    const {dispatch} = this.props;
  }

  componentWillMount() {

  }

  componentWillUpdate(nextProps, nextState) {
    const {dispatch} = this.props;
  }
  componentDidMount() {
    const {dispatch} = this.props;
  }

  render() {
    const {donors} = this.props;
    let donorRows = donors.map((item, index) => {
      let amount = numeral(item.grandTotal).format('0,0');
      return (
          <DonorRowItem key={index} donors={donors} payee={item.contributorPayee} formattedAmount={amount} amount={item.grandTotal}/>
      )
    });

    return (
      <Col  xs={12} md={6} sm={6} style={{
        "marginRight": "-4px"
      }} >
      <Panel {...this.props} collapsible defaultExpanded header = {this.props.donorType} >
      <Col xs={12} sm={12} style={{
        "display": "inline-block",
        "float": "none",
        "textAlign": "left",
        "marginRight": "-4px"
      }}>
        <Table fill striped={false} bordered={false} condensed={true} hover={true}>
          <tbody>
            {donorRows}
          </tbody>
        </Table>
      </Col>
      </Panel>
      </Col>
    );
  }
}

export default ResultDonorsList;
