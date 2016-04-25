
import React, { Component, PropTypes } from 'react';

import { Grid } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { PanelGroup } from '../components/Bootstrap';
import { NavbarCollapsible } from '../components/BootstrapNavigation';
import { Nav } from 'react-bootstrap';
import CustomNavRouterLink from '../components/CustomNav/CustomNavRouterLink.jsx';


class FaqPage extends Component {

    render() {
        return (
            <div>
                <NavbarCollapsible inverse={ false }
                                   fixedTop={ true }
                                   fluid={ true }
                                   brandName='Behind the Curtain'
                                   params={ this.props.params }>
                    <Nav pullRight={ true } params={ this.props.params }>
                        <CustomNavRouterLink className="nav-item"
                                             name="Search"
                                             params={ this.props.params }></CustomNavRouterLink>
                        <CustomNavRouterLink className="nav-item"
                                             name="Oregon"
                                             params={ this.props.params }></CustomNavRouterLink>
                        <CustomNavRouterLink className="nav-item"
                                             name="Campaigns"
                                             params={ this.props.params }></CustomNavRouterLink>
                        <CustomNavRouterLink className="nav-item"
                                             name="Candidates"
                                             params={ this.props.params }></CustomNavRouterLink>
                        <CustomNavRouterLink className="nav-item"
                                             name="Donors"
                                             params={ this.props.params }></CustomNavRouterLink>
                        <CustomNavRouterLink className="nav-item"
                                             name="About"
                                             params={ this.props.params }></CustomNavRouterLink>
                        <CustomNavRouterLink className="nav-item"
                                             name="FAQ"
                                             params={ this.props.params }></CustomNavRouterLink>
                    </Nav>
                    <Nav pullRight={ false } params={ this.props.params }></Nav>
                </NavbarCollapsible>
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
