import searchResultsFormReducer from '../actions/SearchResults/SearchResultsFormActions.js';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    searchData: searchResultsFormReducer
});
export default rootReducer;