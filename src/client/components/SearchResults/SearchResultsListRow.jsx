import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

class SearchResultsListRow extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        const {item} = this.props;
        return (<div colSpan="12" {...this.props}>
                    <h4>
                      <Link to= {`/campaign/${item.filerId}`} >
                      {item.candidateName}
                      </Link>
                    </h4>
                    <div>
                      <p><span>{item.race}</span></p>
                      <span>Raised: ${item.total}</span>
                      <span>Spent: ${item.totalSpent}</span>
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
        candidateName: PropTypes.string,
        total: PropTypes.Number,
        totalSpent: PropTypes.Number,
        race: PropTypes.string,
        filerId: PropTypes.Number
    })
};

export default SearchResultsListRow;
