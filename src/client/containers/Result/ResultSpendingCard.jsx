import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import DataMap from '../../components/Visuals/DataMap.jsx';
import statesData from '../../data/statesData';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';

class ResultSpendingCard extends Component {

    constructor(props, content) {
        super(props, content);
    }
    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props;
    }
    componentWillUpdate(nextProps, nextState) {
        const {dispatch} = this.props;
    }
    componentDidMount() {
      debugger
        const {dispatch} = this.props;
    }

    render() {
      const {donations} = this.props;
        return (<div>
                <StoryCard
                  question={"What are they spending money on?"}
                  description={"Did you know campaigns self select these categories?"}>

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
export default connect(mapStateToProps)(ResultSpendingCard);
