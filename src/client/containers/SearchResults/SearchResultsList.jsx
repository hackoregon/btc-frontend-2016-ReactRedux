import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Col} from 'react-flexbox-grid';
import SearchResultsHeader from '../../components/SearchResults/SearchResultsHeader.jsx';
import SearchResultsListRow from '../../components/SearchResults/SearchResultsListRow.jsx';
import SearchResultsAlert from '../../components/SearchResults/SearchResultsAlert.jsx';
import './SearchResultsList.css';


class SearchResultsList extends Component {

  constructor(props, content) {
    super(props, content);
    this.state = {
      noResults: false
    }
  }
  // 
  // componentWillMount() {
  //   const {list,params} = this.props;
  //
  // }

  render() {
    const {list, error, searchTerm} = this.props;
    let listItems = (<div></div>);

    let errorMsg = null;
    if (error === 'trigger') {
      // errorMessage.error = '';

      errorMsg = (<Col xs={12} md={12} lg={12} className={'SearchResultsList-container'}>
        <SearchResultsAlert searchTerm={searchTerm}/>
      </Col>);
      return errorMsg
    }
    if (list && list.length > 0) {
      listItems = list.map((item, index) => {
        return (
          <Col className={'SearchResultsList-item'} key={index}>
            <SearchResultsListRow item={item}/>
          </Col>

        );
      });
       (
        <Col className={'SearchResultsList-item'} {...this.props}>
          <SearchResultsHeader/>
          {listItems}
        </Col>
      );
    } else if (list && list.length == 0) {
      return (
        <Col className={'SearchResultsList-item'} {...this.props}>
          <SearchResultsHeader/>
          <SearchResultsAlert/>
        </Col>
      );
    } else {
      return (
        <Col className={'SearchResultsList-item'} {...this.props}>
          <SearchResultsHeader/>
          {errorMsg}
        </Col>
      );
    }

    return (
      <Col xs={12} md={12} lg={12} className={'SearchResultsList-container'}>
        {listItems}
      </Col>
    )
  }
}

SearchResultsList.contextTypes = {router: React.PropTypes.object.isRequired}
function mapStateToProps(state,ownProps) {
  const {
    entities: {
      searchData: {
        list
      },
      error
    }

  } = state;
  const {searchTerm} = ownProps.params;
  return {error, list, searchTerm};
}

export default connect(mapStateToProps)(SearchResultsList);
