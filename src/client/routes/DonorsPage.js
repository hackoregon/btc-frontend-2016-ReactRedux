
import React, { Component, PropTypes } from 'react';

import { Grid } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { CarouselItem } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import SearchResultsForm from '..//containers/SearchResults/SearchResultsForm.jsx';
import BTCNav from '../components/Navigation/BTCNav.jsx';

class DonorsPage extends Component {

    render() {
        return (
            <div>
                <BTCNav />
                <Grid fluid={ false }
                      style={ {    marginTop: '100px',    fontWeight: '200px'} }
                      params={ this.props.params }>
                    <SearchResultsForm params={ this.props.params }></SearchResultsForm>

                <Carousel wrap={false} indicators={false} params={ this.props.params }>
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

                    </CarouselItem>
                    <CarouselItem params={ this.props.params }>

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
                    </CarouselItem>
                </Carousel>
                <Panel>
                  <Table fill striped={ false }
                         bordered={ false }
                         condensed={ false }
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
                </Panel>
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
                </Grid>
            </div>

            );
    }
}

export default DonorsPage;
