
import React, { Component, PropTypes } from 'react';

import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import DataBoxGroup from '../components/DataBoxes/DataBoxGroup.jsx';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import SearchResultsForm from '../containers/SearchResults/SearchResultsForm.jsx';


class HomePage extends Component {

    render() {
        return (
            <div>
                <BTCNav />
                <Grid fluid={ true }
                      style={ {    marginTop: '100px',    fontWeight: '200px'} }
                      params={ this.props.params }>
                      <DataBoxGroup boxes={[
                        {name:"Expenditures", value:"$313,412,231"},
                        {name:"Contributions", value:"$307,489,692"},
                        {name:"Average Cost per Ballot", value:"$48"}
                      ]} />

                    <Row params={ this.props.params }>
                        <Col xs={ 12 }
                             md={ 12 }
                             sm={ 12 }
                             lg={ 12 }
                             params={ this.props.params }>
                        <SearchResultsForm params={ this.props.params }></SearchResultsForm>
                        </Col>
                    </Row>
                    <Col style={{    marginTop: '40px'} }
                         xs={ 12 }
                         md={ 12 }
                         sm={ 12 }
                         lg={ 12 }
                         params={ this.props.params }>
                    <Panel header="How does the money flow?"
                           className="text-center"
                           style={ {    fontWeight: 200} }
                           params={ this.props.params }>
                        <p params={ this.props.params }>
                            <span params={ this.props.params }>The diagram below shows the major categories of donors and their contributions to candidates are ultimately expended. The thickness of each line represents the relative size of each category of funds.</span>
                        </p>
                        <Panel bsSize="md" params={ this.props.params }></Panel>
                    </Panel>
                    <Panel header="How does the money flow?"
                           className="text-center"
                           style={ {    fontWeight: 200} }
                           params={ this.props.params }>
                        <p params={ this.props.params }>
                            <span params={ this.props.params }>The diagram below shows the major categories of donors and their contributions to candidates are ultimately expended. The thickness of each line represents the relative size of each category of funds.</span>
                        </p>
                        <Panel bsSize="md" params={ this.props.params }></Panel>
                    </Panel>
                    <Panel header="How does the money flow?"
                           className="text-center"
                           style={ {    fontWeight: 200} }
                           params={ this.props.params }>
                        <p params={ this.props.params }>
                            <span params={ this.props.params }>The diagram below shows the major categories of donors and their contributions to candidates are ultimately expended. The thickness of each line represents the relative size of each category of funds.</span>
                        </p>
                        <Panel bsSize="md" params={ this.props.params }></Panel>
                    </Panel>
                    </Col>
                    <div className="footer container-fluid" params={ this.props.params }>
                        <div className="container-fluid" params={ this.props.params }>
                            <Col xs={ 12 }
                                 md={ 3 }
                                 sm={ 3 }
                                 lg={ 3 }
                                 params={ this.props.params }>
                            <h4 className="underlined text-center"
                                style={ {    fontWeight: '200'} }
                                params={ this.props.params }><span params={ this.props.params }>About</span></h4>
                            <div className="text-center nav-item" params={ this.props.params }>
                                <a href="#" params={ this.props.params }><span params={ this.props.params }>2016 Team</span></a>
                            </div>
                            </Col>
                            <Col xs={ 12 }
                                 md={ 3 }
                                 sm={ 3 }
                                 lg={ 3 }
                                 params={ this.props.params }>
                            <h4 className="underlined text-center"
                                style={ {    fontWeight: 200} }
                                params={ this.props.params }><span params={ this.props.params }>Take action</span></h4>
                            <div className="text-center nav-item" params={ this.props.params }>
                                <a href="#" params={ this.props.params }><span params={ this.props.params }>Register to vote</span></a>
                            </div>
                            </Col>
                            <Col xs={ 12 }
                                 md={ 3 }
                                 sm={ 3 }
                                 lg={ 3 }
                                 params={ this.props.params }>
                            <h4 className="underlined text-center"
                                style={ {    fontWeight: 200} }
                                params={ this.props.params }><span params={ this.props.params }>Contact</span></h4>
                            <div className="text-center nav-item" params={ this.props.params }>
                                <a href="#" params={ this.props.params }><span params={ this.props.params }>Twitter</span></a>
                            </div>
                            <div className="text-center nav-item" params={ this.props.params }>
                                <a href="#" params={ this.props.params }><span params={ this.props.params }>Email</span></a>
                            </div>
                            </Col>
                            <Col xs={ 12 }
                                 md={ 3 }
                                 sm={ 3 }
                                 lg={ 3 }
                                 params={ this.props.params }>
                            <h4 className="underlined text-center"
                                style={ {    fontWeight: 200} }
                                params={ this.props.params }><span params={ this.props.params }>Explore</span></h4>
                            <div className="text-center nav-item" params={ this.props.params }>
                                <a href="#" params={ this.props.params }><span params={ this.props.params }>Search campaigns</span></a>
                            </div>
                            </Col>
                        </div>
                    </div>
                </Grid>
            </div>
            );
    }
}

export default HomePage;
