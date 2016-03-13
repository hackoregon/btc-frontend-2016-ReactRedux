import * as ActionTypes from '../actions/index'
import searchData from '../actions/SearchResults/SearchResultsFormActions';
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux';

function entities(state = { campaigns: {}, transactions: {} }, action) {

  if (action.response && action.response.entities) {
    debugger
    return merge({}, state, action.response.entities)
  }
  return state
}

function errorMessage(state = null, action) {

  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}
// const compilation = combineReducers({
//   starredByUser: compileResults({
//     mapActionToKey: action => action.searchTerm,
//     types: [
//       ActionTypes.SEARCH_REQUEST,
//       ActionTypes.SEARCH_SUCCESS,
//       ActionTypes.SEARCH_FAILURE
//     ]
//   })
// })

const rootReducer = combineReducers({
  searchData,
  entities,
  errorMessage,
  routing
    // searchData: searchResultsFormReducer,
    // resultData: resultReducer
});
export default rootReducer;