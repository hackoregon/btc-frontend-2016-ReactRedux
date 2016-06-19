import * as ActionTypes from '../actions/index'
import merge from 'lodash/merge'
import {
  routerReducer as routing
} from 'react-router-redux'
import {
  combineReducers
} from 'redux';

function entities(state = {
  campaigns: {},
  transactions: {},
  contributions: {},
  expenditures: {},
  donors: {},
  sums: {},
  mungedSums: {},
  concactedMonths: {},
  searchData: {}
}, action) {
  switch (action.type) {
    // case 'RECIEVE_MONTHS':
    // debugger;
    // let nextState = {...state,
    //   concactedMonths: {...action.response
    //   }
    // }
    // return nextState;
  case 'RECIEVE_MUNGED_SUM':
    let nextState = {...state,
      mungedSums: {...action.response
      }
    }
    return nextState
  case 'SEARCH_SUCCESS':
    let result = action.response.result
    state = {
      campaigns: {},
      transactions: {},
      expenditures: {},
      contributions: {},
      donors: {},
      sums: {},
      mungedSums: {},
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
  default:
    if (action.response && action.response.entities) {
      return merge({}, state, action.response.entities)
    }
    return state
  }
  // if (action.type === ) {
  //   debugger;
  // }
  // if (action.type === 'SEARCH_SUCCESS') {
  // }
}

function errorMessage(state = {}, action) {
  const {
    type,
    error
  } = action
  switch (type) {
  case ActionTypes.RESET_ERROR_MESSAGE:
    return state = null
    break;
  case ActionTypes.SEARCH_FAILURE:
    return state = {
      error: 'trigger'
    }
    break;
  default:
  }
  if (error) {
    return action.error
  }
  return state
}
const rootReducer = combineReducers({
  errorMessage,
  entities,
  routing
});
export default rootReducer;
