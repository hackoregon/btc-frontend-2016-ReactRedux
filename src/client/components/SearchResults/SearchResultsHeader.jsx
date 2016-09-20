import React, { Component, PropTypes } from 'react';

class SearchResultsHeader extends Component {

    constructor(props, content) {
        super(props, content);
        this.state = {
          statusText : ''
        }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        statusText: nextProps.status
      })
    }

    render() {
        return (<div colSpan="12"  >
                    <h6>
                      <span>{this.state.statusText}</span>
                    </h6>
                </div>
            );
    }
}

SearchResultsHeader.propTypes = {
    statusText:  PropTypes.string
};

export default SearchResultsHeader;
