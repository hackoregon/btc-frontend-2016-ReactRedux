import React, { Component, PropTypes } from 'react';

class SearchResultsListRow extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        const {item} = this.props;
        return (<div colSpan="12" {...this.props}>
                    <h4>
                      <a href={`campaign/${item.filerId}`}>{ item.name }</a>
                    </h4>
                    <div>
                      <p><span>{item.race}</span></p>
                      <span>Raised: ${item.total}</span>
                      <span>Spent: ${item.spent}</span>
                    </div>
                </div>
            );
    }
}
SearchResultsListRow.defaultProps = {
    item: {
        name: 'Temp Candidate name'
    }
};
SearchResultsListRow.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        total: PropTypes.Number,
        spent: PropTypes.Number,
        race: PropTypes.string,
        filerId: PropTypes.Number
    })
};

export default SearchResultsListRow;
