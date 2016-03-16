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
        const {list,errorMessage} = this.props;
        debugger
        let listItems;
        console.log(this.props);
        let errorMsg = null;
        // if (list && list.length == 0) {
        //   errorMsg = (
        //     <div colSpan="12">
        //   </div>
        //   );
        // }
        if (errorMessage.error === 'trigger') {
          errorMessage.error = '';
          errorMsg = (<SearchResultsAlert />);
          return errorMsg
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
          debugger
          return (<div colSpan="12" {...this.props}>
                      <SearchResultsHeader />
                    <SearchResultsAlert />
                  </div>
              );
        } else {
          return (<div colSpan="12" {...this.props}>
                      <SearchResultsHeader />
                      {errorMsg}
                  </div>
              );
        }

    }
}
function mapStateToProps(state) {
    const {entities:{searchData:{list}},errorMessage} = state;
    return {
      errorMessage, list
    };
}

export default connect(mapStateToProps)(SearchResultsList);
