
import React, { Component, PropTypes } from 'react';

import { Grid } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { CarouselItem } from 'react-bootstrap';
import { NavbarCollapsible } from '../components/BootstrapNavigation';
import { Nav } from 'react-bootstrap';
import SearchResultsForm from '../containers/SearchResults/SearchResultsForm.jsx';
import CustomNavRouterLink from '../components/CustomNav/CustomNavRouterLink.jsx';


class DonorsPage extends Component {

    render() {
        return (
            <div>
                <NavbarCollapsible inverse={ false }
                                   fixedTop={ true }
                                   fluid={ true }
                                   branding={ {    name: 'Behind the Curtain',    href: '#'} }
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
                      style={ {    marginTop: '60px',    fontWeight: '200px'} }
                      params={ this.props.params }>
                    <SearchResultsForm params={ this.props.params }></SearchResultsForm>
                </Grid>
                <Carousel params={ this.props.params }>
                    <CarouselItem params={ this.props.params }>
                        <Table striped={ true }
                               bordered={ false }
                               condensed={ false }
                               hover={ true }
                               params={ this.props.params }>
                            <thead params={ this.props.params }>
                                <tr params={ this.props.params }>
                                    <th params={ this.props.params }>
                                        <span params={ this.props.params }>Text in th</span>
                                    </th>
                                    <th params={ this.props.params }>
                                        <span params={ this.props.params }>Text in th</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody params={ this.props.params }>
                                <tr params={ this.props.params }>
                                    <td params={ this.props.params }>
                                        <span params={ this.props.params }>Text in td</span>
                                    </td>
                                    <td params={ this.props.params }>
                                        <span params={ this.props.params }>Text in td</span>
                                    </td>
                                </tr>
                                <tr params={ this.props.params }>
                                    <td params={ this.props.params }>
                                        <span params={ this.props.params }>Text in td</span>
                                    </td>
                                    <td params={ this.props.params }>
                                        <span params={ this.props.params }>Text in td</span>
                                    </td>
                                </tr>
                                <tr params={ this.props.params }>
                                    <td params={ this.props.params }>
                                        <span params={ this.props.params }>Text in td</span>
                                    </td>
                                    <td params={ this.props.params }>
                                        <span params={ this.props.params }>Text in td</span>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="carousel-caption" params={ this.props.params }>
                            <h3 params={ this.props.params }><span params={ this.props.params }>First slide label</span></h3>
                            <p params={ this.props.params }>
                                <span params={ this.props.params }>Nulla vitae elit libero, a pharetra augue mollis interdum.</span>
                            </p>
                        </div>
                    </CarouselItem>
                    <CarouselItem params={ this.props.params }>
                        <div params={ this.props.params }>
                            <span params={ this.props.params }>Empty div</span>
                            <Table striped={ true }
                                   bordered={ false }
                                   condensed={ false }
                                   hover={ true }
                                   params={ this.props.params }>
                                <thead params={ this.props.params }>
                                    <tr params={ this.props.params }>
                                        <th params={ this.props.params }>
                                            <span params={ this.props.params }>Text in th</span>
                                        </th>
                                        <th params={ this.props.params }>
                                            <span params={ this.props.params }>Text in th</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody params={ this.props.params }>
                                    <tr params={ this.props.params }>
                                        <td params={ this.props.params }>
                                            <span params={ this.props.params }>Text in td</span>
                                        </td>
                                        <td params={ this.props.params }>
                                            <span params={ this.props.params }>Text in td</span>
                                        </td>
                                    </tr>
                                    <tr params={ this.props.params }>
                                        <td params={ this.props.params }>
                                            <span params={ this.props.params }>Text in td</span>
                                        </td>
                                        <td params={ this.props.params }>
                                            <span params={ this.props.params }>Text in td</span>
                                        </td>
                                    </tr>
                                    <tr params={ this.props.params }>
                                        <td params={ this.props.params }>
                                            <span params={ this.props.params }>Text in td</span>
                                        </td>
                                        <td params={ this.props.params }>
                                            <span params={ this.props.params }>Text in td</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="carousel-caption" params={ this.props.params }>
                            <h3 params={ this.props.params }><span params={ this.props.params }>Second slide label</span></h3>
                            <p params={ this.props.params }>
                                <span params={ this.props.params }>Nulla vitae elit libero, a pharetra augue mollis interdum.</span>
                            </p>
                        </div>
                    </CarouselItem>
                    <CarouselItem params={ this.props.params }>
                        <Table striped={ true }
                               bordered={ false }
                               condensed={ false }
                               hover={ true }
                               params={ this.props.params }>
                            <thead params={ this.props.params }>
                                <tr params={ this.props.params }>
                                    <th params={ this.props.params }>
                                        <span params={ this.props.params }>Text in th</span>
                                    </th>
                                    <th params={ this.props.params }>
                                        <span params={ this.props.params }>Text in th</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody params={ this.props.params }>
                                <tr params={ this.props.params }>
                                    <td params={ this.props.params }>
                                        <span params={ this.props.params }>Text in td</span>
                                    </td>
                                    <td params={ this.props.params }>
                                        <span params={ this.props.params }>Text in td</span>
                                    </td>
                                </tr>
                                <tr params={ this.props.params }>
                                    <td params={ this.props.params }>
                                        <span params={ this.props.params }>Text in td</span>
                                    </td>
                                    <td params={ this.props.params }>
                                        <span params={ this.props.params }>Text in td</span>
                                    </td>
                                </tr>
                                <tr params={ this.props.params }>
                                    <td params={ this.props.params }>
                                        <span params={ this.props.params }>Text in td</span>
                                    </td>
                                    <td params={ this.props.params }>
                                        <span params={ this.props.params }>Text in td</span>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="carousel-caption" params={ this.props.params }>
                            <h3 params={ this.props.params }><span params={ this.props.params }>Second slide label</span></h3>
                            <p params={ this.props.params }>
                                <span params={ this.props.params }>Nulla vitae elit libero, a pharetra augue mollis interdum.</span>
                            </p>
                        </div>
                    </CarouselItem>
                </Carousel>
                <Table striped={ false }
                       bordered={ true }
                       condensed={ true }
                       hover={ true }
                       params={ this.props.params }>
                    <thead params={ this.props.params }>
                        <tr params={ this.props.params }>
                            <th params={ this.props.params }>
                                <span params={ this.props.params }>Text in th</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody params={ this.props.params }>
                        <tr params={ this.props.params }>
                            <td params={ this.props.params }>
                                <span params={ this.props.params }>Text in td</span>
                            </td>
                        </tr>
                        <tr params={ this.props.params }>
                            <td params={ this.props.params }>
                                <span params={ this.props.params }>Text in td</span>
                            </td>
                        </tr>
                        <tr params={ this.props.params }>
                            <td params={ this.props.params }>
                                <span params={ this.props.params }>Text in td</span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Table striped={ false }
                       bordered={ true }
                       condensed={ true }
                       hover={ true }
                       params={ this.props.params }>
                    <thead params={ this.props.params }>
                        <tr params={ this.props.params }>
                            <th params={ this.props.params }>
                                <span params={ this.props.params }>Text in th</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody params={ this.props.params }>
                        <tr params={ this.props.params }>
                            <td params={ this.props.params }>
                                <span params={ this.props.params }>Text in td</span>
                            </td>
                        </tr>
                        <tr params={ this.props.params }>
                            <td params={ this.props.params }>
                                <span params={ this.props.params }>Text in td</span>
                            </td>
                        </tr>
                        <tr params={ this.props.params }>
                            <td params={ this.props.params }>
                                <span params={ this.props.params }>Text in td</span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            );
    }
}

export default DonorsPage;

