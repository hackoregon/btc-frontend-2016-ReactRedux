
import React, { Component, PropTypes } from 'react';

import { Grid } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import SearchResultsList from '../containers/SearchResults/SearchResultsList.jsx';
import SearchResultsForm from '../containers/SearchResults/SearchResultsForm.jsx';
import SearchResultsAlert from '../components/SearchResults/SearchResultsAlert.jsx';
import BTCNav from '../components/Navigation/BTCNav.jsx';


class SearchPage extends Component {

    render() {
        return (
            <div>
                <BTCNav />
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

export default SearchPage;
