
import React, { Component, PropTypes } from 'react';

import { Grid } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { NavbarCollapsible } from '../components/BootstrapNavigation';
import { Nav } from 'react-bootstrap';
import SearchResultsList from '../containers/SearchResults/SearchResultsList.jsx';
import SearchResultsForm from '../containers/SearchResults/SearchResultsForm.jsx';
import CustomNavRouterLink from '../components/CustomNav/CustomNavRouterLink.jsx';

class ResultsPage extends Component {
    render() {
        return (
            <div>
                <NavbarCollapsible inverse={ false }
                                   fixedTop={ true }
                                   fluid={ true }
                                   branding={ {    name: 'Behind the Curtain'} }
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
                    <SearchResultsForm params={ this.props.params }></SearchResultsForm>
                    <Col xs={ 12 }
                         md={ 12 }
                         sm={ 12 }
                         lg={ 12 }
                         params={ this.props.params }>
                    <SearchResultsList striped={ true }
                                       bordered={ false }
                                       condensed={ false }
                                       hover={ true }
                                       params={ this.props.params }></SearchResultsList>
                    </Col>
                </Grid>
            </div>
            );
    }
}

export default ResultsPage;
