import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Radium from 'radium';
import { fetchSummaryData } from '../../actions/index.js';
const styles = {
  base: {
    display: 'inline-block',
    float: 'none',
    textAlign: 'left',
    marginRight: '-4px'
  },
  centered : {
    textAlign: 'center'
  }
}

@Radium
class ResultHeader extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        const {candidate, race} = this.props;
        return (<Row {...this.props}
                     style={ styles.centered }>
                    <Col xs={ 12 }
                         md={ 6 }
                         sm={ 12 }
                         lg={ 6 }
                         style={ styles.base }>
                    <h1 style={styles.centered} >{candidate}</h1>
                    <h4 style={styles.centered} >{race}</h4>
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
