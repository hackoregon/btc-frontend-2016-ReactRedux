import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid';
import {FlexBody, FlexGrid} from '../components/Layout';
import {connect} from 'react-redux';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import Loading from '../components/Loading/Loading.jsx';
import {fetchDonor} from '../actions';
import _ from 'lodash'
import DonorPage from '../containers/Donor/DonorPage.jsx';

function loadData(props){
  const {donorName} = props;
 props.fetchDonor(donorName);
}

class Donor extends Component {
    constructor(){
      super()
      this.state = {
        year: '2016',
        display: false,
        dispData: null
      }
      this.handleSelect = this.handleSelect.bind(this);
    }
    componentWillMount() {
      loadData(this.props);
    }

    componentWillReceiveProps(nextProps) {
      const {donationsData} = nextProps;
      if(!_.isEmpty(donationsData)){
        const {transactions,mungedDonations,filerIds} = donationsData;
        const selectKeys = Object.keys(mungedDonations);
        this.setState({
          display: true,
          data: mungedDonations,
          year: selectKeys[selectKeys.length-1],
          dispData: mungedDonations[selectKeys[selectKeys.length-1]]
        });
      }
    }

    shouldComponentUpdate(nextProps) {
      const {donationsData} = nextProps;
      if(!_.isEmpty(donationsData)){
      const {transactions,mungedDonations,filerIds} = donationsData;
        if(transactions.length > 0){
        return true;
        }
      }
      return false;
    }

    handleSelect(year) {
      const {data} = this.state;

      this.setState({
        year: year,
        dispData: data[year]
      });
    }

    renderPage(year,donor,data,allTransactions,donorName){

        return (
          <DonorPage year={year}
            donor={donor} spendData={this.state.dispData} transactions={allTransactions} donorName={donorName} />
        );
    }

    render() {
      const {donor, donorName, donationsData } = this.props;

      if(!_.isEmpty(donationsData)){
        const {transactions,mungedDonations,filerIds} = donationsData;

        const selectKeys = Object.keys(mungedDonations);
        let donations = this.state.display ? (this.renderPage(this.state.year,donor,this.state.dispData,transactions,donorName)) : null;
        return (
            <FlexBody params={ this.props.params }>
                <BTCNav ref={'nav'} pageType={'singleResult'} years={selectKeys} onToggleSelect={this.handleSelect}/>
                <FlexGrid>
                  <Col>
                      {donations}
                  </Col>
                </FlexGrid>
            </FlexBody>
            );
      } else {
          return (<Loading name='cube-grid'/>);
      }
    }
}
function mapStateToProps(state, ownProps) {
  const { donorName } = ownProps.params
  const {
    entities: { donationsData, donors }
  } = state;
  const donor = donors[donorName]
  return {
    donorName, donor, donationsData
  }
}


export default connect(mapStateToProps, {
  fetchDonor
})(Donor);