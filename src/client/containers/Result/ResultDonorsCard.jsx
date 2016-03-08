import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import DataMap from '../../components/Visuals/DataMap.jsx';
import statesData from '../../data/statesData';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
import ResultDonorsList from './ResultDonorsList.jsx';
import { fetchResultData } from '../../actions/index.js';

class ResultDonorsCard extends Component {

    constructor(props, content) {
        super(props, content);
    }
    componentWillReceiveProps(nextProps) {

        const {dispatch} = this.props;
    }
    componentWillUpdate(nextProps, nextState) {
      console.log('update:',nextProps,nextState)
        const {dispatch} = this.props;
    }
    componentDidMount() {
        let filerId = this.props.params.filer_id != undefined ? this.props.params.filer_id : '913'
        const {dispatch} = this.props;
        dispatch(fetchResultData(filerId));
    }

    render() {
      const {individual} = this.props;
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
function mapStateToProps(state) {
  const {resultData:{
    donorData: {
      individual, pac, business, party, unknown
      }
    }
  } = state;
  return {individual,pac,business,unknown,party};

}
export default connect(mapStateToProps)(ResultDonorsCard);
