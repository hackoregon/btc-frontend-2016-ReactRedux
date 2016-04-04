import * as ActionTypes from '../actions/index'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux';

function entities(state = { campaigns: {}, transactions: {}, contributions:{}, donors:{}, searchData:{}}, action){
  if (action.type === 'SEARCH_SUCCESS'){
    let result = action.response.result
    state = {
      searchData: {
        list: []
      }
    }
    for (var key in result) {
      if (result.hasOwnProperty(key)) {
        state.searchData.list.push(result[key])
        }
      }
    return state
  }

  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

function searchData(state = {}, action = {
  type: 'SEARCH_SUCCESS'
}) {

  return state;
}
console.log(ActionTypes)
function errorMessage(state = {}, action){

  const { type, error } = action
  if (type === ActionTypes.RESET_ERROR_MESSAGE) {

    return state = null
  } else if (type === ActionTypes.SEARCH_FAILURE) {
      debugger
      return state = {
        error: 'trigger'
      }
  } else if (error) {
    return action.error
  }

  return state
}

const rootReducer = combineReducers({
  entities,
  errorMessage,
  routing
});
export default rootReducer;