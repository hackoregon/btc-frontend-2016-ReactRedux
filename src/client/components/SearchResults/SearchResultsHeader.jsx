import React, { Component, PropTypes } from 'react';

class SearchResultsHeader extends Component {

    constructor(props, content) {
        super(props, content);
        this.state = {
          statusText : ''
        }
    }

    componentWillReceiveProps(nextProps) {
      console.log(nextProps)
      this.setState({
        statusText: nextProps.status
      })
    }

    render() {
      const {statusText} = this.props; 
        return (<div colSpan="12" {...this.props}>
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
