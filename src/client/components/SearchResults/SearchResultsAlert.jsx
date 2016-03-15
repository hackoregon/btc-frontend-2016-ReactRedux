import React, { Component, PropTypes } from 'react';
import { AlertDismissable } from '../Bootstrap';
// @connect here to fetching to remove the inbetween message
class SearchResultsAlert extends Component {

    constructor(props, content) {
        super(props, content);
        this.state = {
          searchTerm : ''
        }
    }

    componentDidMount() {
    }

    render() {
      const {searchTerm} = this.props;
        return (<AlertDismissable {...this.props}
                bsStyle="danger">
                <p>We did not find a match for that. Please update your search and try again.</p>
                <strong>Tips:</strong>
                <ol>
                  <li>Check your spelling.</li>
                  <li>If you are not sure what to search, try browsing for a candidate, donor, measure, PAC name or corporation.</li>
                  <li>Let us know if you think there is an issue with our site.</li>
                </ol>
                </AlertDismissable>
            );
    }
}

SearchResultsAlert.propTypes = {
        searchTerm: PropTypes.string
};

export default SearchResultsAlert;
