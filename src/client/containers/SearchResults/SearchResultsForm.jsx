import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col}  from 'react-flexbox-grid';
import Autosuggest from 'react-autosuggest';

import {loadSearchData} from '../../actions/index.js';
import fetchSuggestions from '../../utils/fetchSuggestions.js';

import './autosuggest.css'
import './SearchForm.css'

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getMatches(value, dataArr) {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp('^' + escapedValue, 'i');
  return dataArr.filter(data => regex.test(data.candidate_name));
}

function getSuggestionValue(suggestion) {
  return suggestion.candidate_name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.candidate_name}</span>
  );
}

class SearchResultsForm extends Component {

  constructor(props, content) {
    super(props, content);

    this.state = {
      value: '',
      suggestions: getMatches('')
    };
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  loadSuggestions(value) {
    fetchSuggestions(value).then((data) => {

      let dataArr = [
        ...data.candidate_names,
        ...data.related
      ]

      const suggestions = getMatches(value, dataArr);

      if (value === this.state.value) {
        this.setState({suggestions});
      }
    })
  }

  onChange(event, {newValue}) {
    this.setState({value: newValue});
  }

  onSuggestionSelected(e, {suggestionValue}) {
      e.preventDefault();
      e.stopPropagation();
    const {dispatch} = this.props;
    const searchTerm = this.searchTermRef;
    if (!searchTerm.trim()) {
      return
    }
    dispatch(loadSearchData(suggestionValue));
    this.context.router.push('/search');
  }

  onSuggestionsUpdateRequested({value}) {
    this.loadSuggestions(value);
  }

  setRef(ref) {
    this.searchTermRef = ref;
  }

  handleFetch(e) {
    e.preventDefault();
    e.stopPropagation();

    const searchTerm = this.searchTermRef;
    if (!searchTerm.trim()) {
      return
    }

    // if (suggestions && suggestions.length === 1){
    //   const filerId = suggestions[0].filer_id;
    //   dispatch(directLoad(searchTerm,filerId))
    //   return this.context.router.push(`/recipients/${filerId}`);
    // }
    return this.onSuggestionSelected(e,{suggestionValue:searchTerm})

  }

  render() {
    const {value, suggestions} = this.state;
    const { searchData, searchTerm, dispatch, ...rest} = this.props;
    const inputProps = {
      placeholder: 'Search candidates, measures or PACs',
      value,
      className: 'form-control input-group',
      onChange: this.onChange
    };

    const iconstyle = {
      position: 'absolute',
      fontSize: '1.5rem',
      top: '8px',
      right: '20px',
      color: '#888'
    }
    let enterMessage = (
      <i style={iconstyle} className={"fa fa-search"}></i>
    );
    // let fetchButton = null;

    if (this.state.value.length > 0) {
      enterMessage = (
        <i style={{...iconstyle,fontSize:'1rem'}}>Press Enter/return to search</i>
      );
    }

    return (

      <form {...rest} onSubmit={this.handleFetch}>
        <Grid fluid>
          <Row>
            <Col style={{position:'relative'}} xs={12} md={12} sm={12} lg={12}>
              <Autosuggest ref={() => this.setRef(this.state.value)} suggestions={suggestions} onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested} onSuggestionSelected={this.onSuggestionSelected} getSuggestionValue={getSuggestionValue} renderSuggestion={renderSuggestion} inputProps={inputProps}/>
              {enterMessage}
            </Col>
          </Row>

        </Grid>

      </form>
    );
  }
}

SearchResultsForm.contextTypes = {router: React.PropTypes.object.isRequired}

function mapStateToProps(state,ownProps) {
  const {entities: {
      searchData
    }} = state;
  const searchTerm = ownProps.params
  return {searchData, searchTerm};
}

export default connect(mapStateToProps)(SearchResultsForm);
