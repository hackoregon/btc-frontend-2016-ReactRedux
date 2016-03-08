import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Table} from 'react-bootstrap';
import DonorRowItem from './DonorRowItem.jsx';


class ResultDonorsList extends Component {

  constructor(props, content) {
    super(props, content);
    console.log(props, content)
  }
  componentWillReceiveProps(nextProps) {
    debugger
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
    const {individual,pac,business,unknown} = this.props;
    let individualRows = individual.donors.map((item, index) => {
      return (
          <DonorRowItem key={index} donors={individual.donors} payee={item.contributor_payee} amount={item.amount}/>
      )
    });
    let businessRows = business.donors.map((item, index) => {
      return (
          <DonorRowItem key={index} donors={business.donors} payee={item.contributor_payee} amount={item.amount}/>
      )
    });
    let pacRows = pac.donors.map((item, index) => {
      return (
          <DonorRowItem key={index} donors={pac.donors} payee={item.contributor_payee} amount={item.amount}/>
      )
    });
    // let unknownRows = unknown.donors.map((item, index) => {
    //   return (
    //       <DonorRowItem key={index} donors={unknown.donors} payee={item.contributor_payee} amount={item.amount}/>
    //   )
    // });
    debugger
    return (
      <Panel {...this.props} collapsible defaultExpanded header = {individual.type} >
      <Col  xs={12} sm={6} style={{
        "display": "inline-block",
        "float": "none",
        "textAlign": "left",
        "marginRight": "-4px"
      }}>
        <Table fill striped={false} bordered={false} condensed={true} hover={true} className="col-sm-6 col-xs-12">
          <tbody>
            {individualRows}
          </tbody>
        </Table>
      </Col>
      </Panel>
    );
  }
}

function mapStateToProps(state) {
  const {resultData:{
    donorData: {
      individual, pac, business, party, unknown
      }
    }
  } = state;
  return {individual,pac,business,unknown,party};

}

export default connect(mapStateToProps)(ResultDonorsList);
