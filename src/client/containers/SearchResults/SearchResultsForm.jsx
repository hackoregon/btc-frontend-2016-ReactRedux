import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Button, Input} from 'react-bootstrap';
import {loadSearchData} from '../../actions/index.js';
import Autosuggest from 'react-autosuggest';
import fetchSuggestions from '../../utils/fetchSuggestions.js';

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
    this.handleFetch = this.handleFetch.bind(this);
    this.state = {
      value: '',
      suggestions: getMatches('')
    };
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  loadSuggestions(value) {
    this.setState({isLoading: true});
    fetchSuggestions(value).then((data) => {
      let dataArr = [
        ...data.candidate_names,
        ...data.related
      ]
      const suggestions = getMatches(value, dataArr);

      if (value === this.state.value) {
        this.setState({isLoading: false, suggestions});
      } else {
        this.setState({isLoading: false})
      }
    })
  }

  onChange(event, {newValue}) {
    this.setState({value: newValue});
  }

  onSuggestionSelected(e, {suggestionValue}) {
    this.setState({searchTerm: suggestionValue})
    const {dispatch} = this.props;
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

    const {dispatch} = this.props;
    // const searchTerm = this.searchTermRef;
    if (!this.searchTermRef.trim()) {
      return
    }
    dispatch(loadSearchData(this.searchTermRef));
    this.context.router.push('/search');
  }

  render() {
    const {value, suggestions, isLoading, noResults} = this.state;

    const inputProps = {
      placeholder: 'Search for candidates, measures or PAC name',
      value,
      className: 'form-control input-group',
      onChange: this.onChange
    };

    const iconstyle = {
      position: 'absolute',
      top: '10px',
      right: '30px',
      color: '#888'
    }
    let enterMessage = (
      <i style={iconstyle} className={"fa fa-search"}></i>
    );
    let fetchButton = null;

    if (this.state.value.length > 0) {
      enterMessage = (
        <i style={iconstyle}>Press Enter/return to search</i>
      );
    }

    return (
      <form {...this.props} onSubmit={this.handleFetch}>
        <Grid fluid={true}>
          <Row>
            <Col xs={12} md={12} sm={12} lg={12}>

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

function mapStateToProps(state) {
  const {entities: {
      searchData
    }} = state;

  return {searchData};
}

export default connect(mapStateToProps)(SearchResultsForm);
