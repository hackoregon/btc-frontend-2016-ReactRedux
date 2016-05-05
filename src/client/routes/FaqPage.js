
import React, { Component, PropTypes } from 'react';

import { Grid } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { PanelGroup } from '../components/Bootstrap';
import BTCNav from '../components/Navigation/BTCNav.jsx';

class FaqPage extends Component {

    render() {
        return (
            <div>
                <BTCNav />
                <Grid fluid={ true }
                      style={ {    marginTop: '100px',    fontWeight: '200px'} }
                      params={ this.props.params }>
                    <PanelGroup accordion={ true }
                                defaultActiveKey={ 1 }
                                params={ this.props.params }>
                        <Panel header="Panel 1"
                               eventKey={ 1 }
                               params={ this.props.params }>
                            <p params={ this.props.params }>
                                <span params={ this.props.params }>Basic panel</span>
                            </p>
                        </Panel>
                        <Panel header="Panel 2"
                               eventKey={ 2 }
                               params={ this.props.params }>
                            <p params={ this.props.params }>
                                <span params={ this.props.params }>Basic panel</span>
                            </p>
                        </Panel>
                    </PanelGroup>
                </Grid>
            </div>
            );
    }
}

export default FaqPage;
