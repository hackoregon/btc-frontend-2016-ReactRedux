import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import DataMap from '../../components/Visuals/DataMap.jsx';
import statesData from '../../data/statesData';
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
        return (
                <Col {...this.props}
                      minWidth={500}
                       className="text-center"
                       style={ {    "fontWeight": 200} }>
                      <h3>Where does the money come from?</h3>
                    <p>
                        <span>Money spent in Oregon is raised all across the country. This graphic demonstrates the magnitude of money spent in Oregon by state of origin.</span>
                    </p>
                    <DataMap regionData={statesData}/>
              </Col>
        );
    }
}
export default connect()(ResultLocationStoryCard);
