import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
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
                <Panel {...this.props}
                      bordered={false}
                      minWidth={500}
                       header="Where does the money come from?"
                       className="text-center"
                       style={ {    "fontWeight": 200} }>

                    <p>
                        <span>Money spent in Oregon is raised all across the country. This graphic demonstrates the magnitude of money spent in Oregon by state of origin.</span>
                    </p>
                    <DataMap regionData={statesData}/>
              </Panel>
        );
    }
}
export default connect()(ResultLocationStoryCard);
