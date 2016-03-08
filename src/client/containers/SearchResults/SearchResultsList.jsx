import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import SearchResultsHeader from '../../components/SearchResults/SearchResultsHeader.jsx';
import SearchResultsListRow from '../../components/SearchResults/SearchResultsListRow.jsx';
import SearchResultsAlert from '../../components/SearchResults/SearchResultsAlert.jsx';

class SearchResultsList extends Component {

    constructor(props, content) {
        super(props, content);
        this.state = {
          noResults:false,
        }
    }

    componentDidMount() {

    }

    render() {
        const {list, fetching, searchTerm} = this.props;
        let listItems;
        console.log(this.props);
        let errorMessage = null;
        if (list && list.length == 0) {
          errorMessage = (
            <div colSpan="12">
          </div>
          );
        }
        if (list && list.length > 0) {
            listItems = list.map((item, index) => {
                return (<div colSpan="12" key={ index }>
                            <SearchResultsListRow item={item}/>
                        </div>
                    );
            });
            return (<div colSpan="12" {...this.props}>
                        <SearchResultsHeader />
                      { listItems }
                    </div>
                );
        } else if (list && list.length == 0) {
          return (<div colSpan="12" {...this.props}>
                      <SearchResultsHeader />
                    <SearchResultsAlert searchTerm={this.searchTerm} />
                  </div>
              );
        } else {
          return (<div colSpan="12" {...this.props}>
                      <SearchResultsHeader />
                  </div>
              );
        }

    }
}
function mapStateToProps(state) {
    const {searchData: {list, fetching, searchTerm}} = state;
    return {
        list , fetching, searchTerm
    };
}

export default connect(mapStateToProps)(SearchResultsList);
