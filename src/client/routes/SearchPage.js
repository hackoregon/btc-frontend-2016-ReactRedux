import React, {Component, PropTypes} from 'react';
import {Col, Grid} from 'react-flexbox-grid';
import SearchResultsList from '../containers/SearchResults/SearchResultsList.jsx';
import SearchResultsForm from '../containers/SearchResults/SearchResultsForm.jsx';
import SearchResultsAlert from '../components/SearchResults/SearchResultsAlert.jsx';
import BTCNav from '../components/Navigation/BTCNav.jsx';

class SearchPage extends Component {

    render() {
        return (
            <div {...this.props} params={this.props.params}>
                <BTCNav params={this.props.params} />
                <Grid fluid>
                  <SearchResultsList  striped={true} bordered={false} condensed={false} hover={true} params={this.props.params} searchTerm={this.props.params}></SearchResultsList>
                </Grid>
            </div>
        );
    }
}

export default SearchPage;
