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
  let nextState;
  switch (action.type) {
    // case 'RECIEVE_MONTHS':
    //  ;
    // let nextState = {...state,
    //   concactedMonths: {...action.response
    //   }
    // }
    // return nextState;

  case 'SEARCH_FAILURE':
   nextState = {...state,
     error: 'trigger'
   }
   return nextState;
  case 'RECIEVE_DONOR':
    nextState = {...state,
      donors: {...action.response
      }
    }
    return nextState
  case 'RECIEVE_DONATIONS':
    nextState = {...state,
      donationsData: {...action.donationData
      }
    }
    return nextState
  case 'RECIEVE_OREGON':
    nextState = {...state,
      allOregon: {...action.response
      }
    }
    return nextState
  case 'RECIEVE_MUNGED_SPENDING':
    nextState = {...state,
      mungedSpending: {...action.spendingByYear
      }
    }
    return nextState
  case 'RECIEVE_MUNGED_SUM':
    nextState = {...state,
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

}

function errorMessage(state = {}, action) {
  const {
    type,
    error
  } = action
  switch (type) {
    case ActionTypes.SEARCH_FAILURE:
      return state = {
        error: 'trigger'
      }
    case ActionTypes.RESET_ERROR_MESSAGE:
    return state = null
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
