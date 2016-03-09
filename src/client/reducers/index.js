import searchResultsFormReducer from '../actions/SearchResults/SearchResultsFormActions.js';
import resultReducer from '../actions/Result/ResultActions.js';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    searchData: searchResultsFormReducer,
    resultData: resultReducer
});
export default rootReducer;