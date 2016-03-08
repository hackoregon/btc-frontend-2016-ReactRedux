import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

class ResultHeader extends Component {

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
        const {dispatch} = this.props;
        debugger
    }

    render() {
        const {candidate_name, race} = this.props;
        return (<Row {...this.props}
                     style={ {    "textAlign": "center"} }>
                    <Col xs={ 12 }
                         md={ 6 }
                         sm={ 12 }
                         lg={ 6 }
                         style={ {    "display": "inline-block",    "float": "none",    "textAlign": "left",    "marginRight": "-4px"} }>
                    <h1 className="text-center" >{candidate_name}</h1>
                    <h4 className="text-center" >{race}</h4>
                    </Col>
                </Row>
            );
    }
}
function mapStateToProps(state) {
    const {
      resultData: {
        summaryData: {
          candidate_name, race
        }
        }
      } = state;
    return {
        candidate_name,
        race
    };

}

export default connect(mapStateToProps)(ResultHeader);
