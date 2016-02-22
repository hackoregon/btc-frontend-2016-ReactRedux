import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import SearchResultsHeader from '../../components/SearchResults/SearchResultsHeader.jsx';
import SearchResultsListRow from '../../components/SearchResults/SearchResultsListRow.jsx';

class SearchResultsList extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        const {list, fetching} = this.props;
        let listItems;
        console.log(this.props);
        if (list && list.length > 0) {
            listItems = list.map((item, index) => {
                return (<div colSpan="12" key={ index }>
                            <SearchResultsListRow item={item}/>
                        </div>
                    );
            })
        } else if (list && list.length == 0) {

        } else {
            listItems = (<div>

            </div>);

        }
        return (<div colSpan="12" {...this.props}>
                    <SearchResultsHeader status={fetching.status} />
                    { listItems }
                </div>
            );
    }
}
function mapStateToProps(state) {
    const {searchData: {list, fetching}} = state;
    return {
        list , fetching
    };
}

export default connect(mapStateToProps)(SearchResultsList);
