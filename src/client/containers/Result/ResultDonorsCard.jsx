import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import DataMap from '../../components/Visuals/DataMap.jsx';
import statesData from '../../data/statesData';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
import ResultDonorsList from './ResultDonorsList.jsx';
import {loadTransactions} from '../../actions'
// import { fetchResultData } from '../../actions/index.js';

function loadData(props) {
  const { filer_id } = props.params;
  debugger
  props.loadTransactions(filer_id);
}

class ResultDonorsCard extends Component {

    constructor(props, content) {
        super(props, content);
    }
    componentWillReceiveProps(nextProps) {
      debugger
        const {dispatch} = this.props;
    }
    componentWillUpdate(nextProps, nextState) {
      console.log('update:',nextProps,nextState)
        const {dispatch} = this.props;
    }
    componentWillMount() {
      debugger
      loadData(this.props);
    }
    componentDidMount() {
        let filerId = this.props.params.filer_id != undefined ? this.props.params.filer_id : '913'
        const {dispatch} = this.props;
        // dispatch(fetchResultData(filerId));
    }

    render() {
      const {transactions} = this.props;
      console.log('rendering donor card:', individual);
        return (<div>
                <StoryCard
                  question={"Who is giving?"}
                  description={"This visualization is calculated by total dollars, not total people."}>
                  <ResultDonorsList donations={individual}></ResultDonorsList>
                </StoryCard>
                </div>
        );
    }
}

ResultDonorsCard.propTypes = {
  transactions: PropTypes.object
}

function mapStateToProps(state) {
  const {entities:{
    transactions
    }
  } = state;
  return {transactions};

}
export default connect(mapStateToProps,{
  loadTransactions
})(ResultDonorsCard);
