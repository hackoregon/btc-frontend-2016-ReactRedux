import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import numeral from 'numeral';

function format(num){
  return numeral(num).format('($0.0a)')
}

class SearchResultsListRow extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        const {item} = this.props;
        return (<Col {...this.props} style={{
          borderBottom: 'solid #eee 1px',
          paddingTop: '1rem'
        }}>
                    <Col>
                    <h4 style={{
                        fontSize:'1.75rem',
                        margin: '1.5rem 0 0'}}>
                      <Link to= {`/recipients/${item.filerId}`} >
                      {item.candidateName}
                      </Link>
                    </h4>

                    </Col>
                    <Col>

                      <Col>
                      <p> Raised: {format(item.total)} Spent: {format(item.totalSpent)}</p>
                      </Col>

                    </Col>
                </Col>
            );
    }
}
// <p style={{fontSize:'1.5rem'}}>{item.race}</p>
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
