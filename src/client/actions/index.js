// export { fetchSearchData } from './SearchResults/SearchResultsFormActions.js';
// export { fetchResultData,fetchSummaryData } from './Result/ResultActions.js';
import {FETCH_SEARCH_DATA, CALL_API, Schemas} from '../api/serverApi';
import { parseAction, wrapPromise} from './reduxActionsSequence/reduxActionsUtils.js';
import fetchSearchData from './SearchResults/SearchResultsFormActions.js';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
function fetchSearchData2(searchTerm) {
  String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) {
      return a.toUpperCase();
    });
  }
  let searchFor = searchTerm.capitalize();
  return{
    [CALL_API]: {
      types: [SEARCH_REQUEST,SEARCH_SUCCESS,SEARCH_FAILURE],
      endpoint: `competitors_from_name/${searchFor}/`,
      schema: Schemas.CAMPAIGN
    }
  }
}

export function loadSearchData(searchTerm, requiredFields=[]){
  debugger
  // return (dispatch, getState) => wrapPromise(SEARCH_REQUEST, dispatch, () => {
  //   return readData(searchTerm).then(response => {
  //     debugger
  //     let result = {
  //       searchTerm : searchTerm,
  //       list : []
  //     };
  //     if (response && response.length > 0) {
  //       result.list = response.map(item => {
  //         return {
  //           name: item.candidate_name,
  //           race: item.race,
  //           lastUpdated: item.db_update_status,
  //           filerId: item.filer_id,
  //           total: item.total,
  //           spent: item.total_spent
  //         }
  //       });
  //     }
  //     return result;
  //   });
  // });
  return (dispatch,getState) =>{

    // const search = getState().entities.campaigns[searchTerm]
    // if (search && requiredFields.every(key => search.hasOwnProperty(key))) {
    //   return null
    // }
    return dispatch(fetchSearchData2(searchTerm))
  }
}

// }

export const CAMPAIGN_REQUEST = 'CAMPAIGN_REQUEST';
export const CAMPAIGN_SUCCESS = 'CAMPAIGN_SUCCESS';
export const CAMPAIGN_FAILURE = 'CAMPAIGN_FAILURE';

function fetchCampaign(filerId){
  return {
    [CALL_API]: {
      types: [CAMPAIGN_REQUEST,CAMPAIGN_SUCCESS,CAMPAIGN_FAILURE],
      endpoint: `committee_data_by_id/${filerId}/`,
      schema: Schemas.CAMPAIGN
    }
  }
}

export function loadCampaign(filerId, requiredFields=[]) {
  return (dispatch, getState) => {
    const campaign = getState().entities.campaigns['filer_id']
    if (campaign && requiredFields.every(key => campaign.hasOwnProperty(key))) {
      return null
    }
    return dispatch(fetchCampaign(filerId))
  }
}

export const TRANSACTIONS_REQUEST = 'TRANSACTIONS_REQUEST'
export const TRANSACTIONS_SUCCESS = 'TRANSACTIONS_SUCCESS'
export const TRANSACTIONS_FAILURE = 'TRANSACTIONS_FAILURE'

function fetchTransactions(filerId) {
  return {
    [CALL_API]: {
      types: [ TRANSACTIONS_REQUEST, TRANSACTIONS_SUCCESS, TRANSACTIONS_FAILURE ],
      endpoint: `current_candidate_transactions/${filerId}/`,
      schema: Schemas.TRANSACTION_ARRAY
    }
  }
}

export function loadTransactions(filerId, requiredFields = []) {
  return (dispatch, getState) => {
    const transaction = getState().entities.transaction[filerId]
    if (transaction && requiredFields.every(key => transaction.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchTransactions(filerId))
  }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}


