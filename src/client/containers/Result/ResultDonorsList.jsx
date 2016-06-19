// component
import React, {Component, PropTypes} from 'react';
// import {connect} from 'react-redux';
import {Panel, PanelGroup, Col, Table} from 'react-bootstrap';
import DonorRowItem from '../../components/Visuals/DonorRowItem.jsx';
import numeral from 'numeral';
import './DonorList.css'

class ResultDonorsList extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeKey: 1
    }
    this.renderTop = this.renderTop.bind(this);
    this.renderMore = this.renderMore.bind(this);
  }
  renderTop(){
    const {donors} = this.props;
    debugger;
    let allDonors = donors.map((item, index) => {
      let amount = numeral(item.total).format('0,0');
      return (
          <DonorRowItem key={index} donors={donors} payee={item.contributorPayee} formattedAmount={amount} amount={item.total}/>
      )
    });
    if(allDonors.length > 5) {
      let topDonors = allDonors.slice(0,5);
      // let allDonors = donorRows;
      return { topDonors, allDonors }
    }
    return allDonors;
  }

  renderMore(activeKey){
    this.setState({activeKey});
  }

  render() {
    // let donorRows = this.renderTop();
    let topRows = this.renderTop().topDonors;
    let restRows = this.renderTop().allDonors;
    return (
      <Col  xs={12} md={6} sm={6} style={{
        'marginRight': '-4px'
      }} >
      <PanelGroup {...this.props} accordion activeKey={this.state.activeKey} onSelect= {this.renderMore} >
        <Panel defaultExpanded header = {this.props.donorType} eventKey='1' >
          <Col xs={12} sm={12} style={{
            'display': 'inline-block',
            'float': 'none',
            'textAlign': 'left',
            'marginRight': '-4px'
          }}>
            <Table fill striped={false} bordered={false} condensed={true} hover={true}>
              <tbody>
                {topRows}
              </tbody>
            </Table>
          </Col>
        </Panel>
        <Panel collapsible header= {'All donors'} eventKey='2'>
      <Col xs={12} sm={12} style={{
        'display': 'inline-block',
        'float': 'none',
        'textAlign': 'left',
        'marginRight': '-4px'
      }}>
        <Table fill striped={false} bordered={false} condensed={true} hover={true}>
          <tbody>
            {restRows}
          </tbody>
        </Table>
      </Col>
    </Panel>
    </PanelGroup>
      </Col>
    );
  }
}

export default ResultDonorsList;
