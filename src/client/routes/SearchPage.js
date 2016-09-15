import React, {Component, PropTypes} from 'react';
import { Grid } from 'react-flexbox-grid';
import SearchResultsList from '../containers/SearchResults/SearchResultsList.jsx';

import BTCNav from '../components/Navigation/BTCNav.jsx';

class SearchPage extends Component {
    render() {
        return (
            <div params={this.props.params}>
                <BTCNav params={this.props.params} />
                <Grid fluid>
                  <SearchResultsList striped={true} bordered={false} condensed={false} hover={true} params={this.props.params} searchTerm={this.props.params}></SearchResultsList>
                </Grid>
            </div>
        );
    }
}

export default SearchPage;
