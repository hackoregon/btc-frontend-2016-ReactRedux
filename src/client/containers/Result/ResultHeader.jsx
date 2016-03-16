import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { fetchSummaryData } from '../../actions/index.js';

class ResultHeader extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        const {candidate, race} = this.props;
        return (<Row {...this.props}
                     style={ {    "textAlign": "center"} }>
                    <Col xs={ 12 }
                         md={ 6 }
                         sm={ 12 }
                         lg={ 6 }
                         style={ {    "display": "inline-block",    "float": "none",    "textAlign": "left",    "marginRight": "-4px"} }>
                    <h1 className="text-center" >{candidate}</h1>
                    <h4 className="text-center" >{race}</h4>
                    </Col>
                </Row>
            );
    }
}
// function mapStateToProps(state) {
//     const {resultData: {summaryData: {candidate_name, race}}} = state;
//     return {
//       candidate_name, race
//     };
// }
// function mapStateToProps(state) {
//     const {resultData: {summaryData: {candidate_name, race}}} = state;
//     return {
//       candidate_name, race
//     };
// }

ResultHeader.propTypes = {
  candidate: PropTypes.string.isRequired,
  race: PropTypes.string.isRequired,
}
export default ResultHeader;
// export default connect(mapStateToProps)(ResultHeader);
