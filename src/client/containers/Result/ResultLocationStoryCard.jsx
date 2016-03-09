import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import DataMap from '../../components/Visuals/DataMap.jsx';
import statesData from '../../data/statesData';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';

class ResultLocationStoryCard extends Component {

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
      debugger
        return (<div>
                <StoryCard
                  style={{minHeight:'400px',minWidth:'600px'}}
                  question={"Where does the money come from?"}
                  description={"Money spent in Oregon is raised all across the country. This graphic demonstrates the magnitude of money spent in Oregon by state of origin."}>
                  <DataMap {...this.props} regionData={statesData}/>
                </StoryCard>
                </div>
        );
    }
}
function mapStateToProps(state) {
    const {resultData:{locationData: donations}} = state;
    return {
        donations
    };
}

export default connect(mapStateToProps)(ResultLocationStoryCard);
