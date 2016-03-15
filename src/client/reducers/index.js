import * as ActionTypes from '../actions/index'
// import searchData from '../actions/SearchResults/SearchResultsFormActions';
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux';

function entities(state = { campaigns: {}, transactions: {}, donors:{}, searchData:{}}, action){
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
  // const {
    // payload
  // } = parseAction(action);
  // if (type === FETCH_SEARCH_DATA) {
  // if (type === FETCH_SEARCH_DATA) {
    // if (stage === START) {
    //   state = Object.assign({}, state, {
    //     list: [],
    //     fetching: {
    //       status: 'loading',
    //     }
    //   });
    //   return state;
    // }
    // if (stage === DONE) {
    //   state = Object.assign({}, state, {
    //     searchTerm: payload.searchTerm,
    //     list: payload.list,
    //     fetching: {
    //       status: 'done'
    //     }
    //   });
    //   return state;
    // }
    // if (stage === ERROR) {
    //   state = Object.assign({}, state, {
    //     list: [],
    //     fetching: {
    //       status: 'error',
    //       statusText: payload
    //     }
    //   });
    //   return state;
    // }
  // }

  return state;
}
console.log(ActionTypes)
function errorMessage(state = null, action){

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
  entities,
  errorMessage,
  routing
    // searchData: searchResultsFormReducer,
    // resultData: resultReducer
});
export default rootReducer;