// export { fetchSearchData } from './SearchResults/SearchResultsFormActions.js';
// export { fetchResultData,fetchSummaryData } from './Result/ResultActions.js';
import {
  FETCH_SEARCH_DATA,
  FETCH_SEARCH,
  CALL_API,
  Schemas
} from '../api/serverApi.js';
import {
  parseAction,
  wrapPromise
} from './reduxActionsSequence/reduxActionsUtils.js';
// import fetchSearchData from './SearchResults/SearchResultsFormActions.js';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

function fetchSearchData(searchTerm) {
  String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) {
      return a.toUpperCase();
    });
  }
  let searchFor = searchTerm.capitalize();
  return {
    [CALL_API]: {
      types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE],
      endpoint: `competitors_from_name/${searchFor}/`,
      schema: Schemas.LIST
    }
  }
}

export function loadSearchData(searchTerm, requiredFields = []) {
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
  return (dispatch, getState) => {
    // const search = getState().entities.campaigns[searchTerm]
    // if (search && requiredFields.every(key => search.hasOwnProperty(key))) {
    //   return null
    // }
    return dispatch(fetchSearchData(searchTerm))
  }
}

// }

export const CAMPAIGN_REQUEST = 'CAMPAIGN_REQUEST';
export const CAMPAIGN_SUCCESS = 'CAMPAIGN_SUCCESS';
export const CAMPAIGN_FAILURE = 'CAMPAIGN_FAILURE';

function fetchCampaign(filerId) {
  return {
    [CALL_API]: {
      types: [CAMPAIGN_REQUEST, CAMPAIGN_SUCCESS, CAMPAIGN_FAILURE],
      endpoint: `committee_data_by_id/${filerId}/`,
      schema: Schemas.CAMPAIGN_ARRAY
    }
  }
}

export function loadCampaign(filerId, requiredFields = []) {
  return (dispatch, getState) => {
    const campaign = getState().entities.campaigns[filerId]
    if (campaign && requiredFields.every(key => campaign.hasOwnProperty(key))) {
      debugger
      return null
    }
    return dispatch(fetchCampaign(filerId))
  }
}

export const LOCATION_REQUEST = 'LOCATION_REQUEST';
export const LOCATION_SUCCESS = 'LOCATION_SUCCESS';
export const LOCATION_FAILURE = 'LOCATION_FAILURE';

function fetchLocationData(filerId) {
  return {
    [CALL_API]: {
      types: [LOCATION_REQUEST, LOCATION_SUCCESS, LOCATION_FAILURE],
      endpoint: `candidate_in_by_state_by_id/${filerId}/`,
      schema: Schemas.LOCATION_ARRAY
    }
  }
}

export function loadLocationData(filerId, requiredFields = []) {
  return (dispatch, getState) => {
    const location = getState().entities.locations[filerId]
    if (location && requiredFields.every(key => location.hasOwnProperty(key))) {
      debugger
      return null
    }
    return dispatch(fetchLocationData(filerId))
  }
}

export const TRANSACTIONS_REQUEST = 'TRANSACTIONS_REQUEST'
export const TRANSACTIONS_SUCCESS = 'TRANSACTIONS_SUCCESS'
export const TRANSACTIONS_FAILURE = 'TRANSACTIONS_FAILURE'

function fetchTransactions(filerId) {
  debugger
  return {
    [CALL_API]: {
      types: [TRANSACTIONS_REQUEST, TRANSACTIONS_SUCCESS, TRANSACTIONS_FAILURE],
      endpoint: `current_candidate_transactions/${filerId}/`,
      schema: Schemas.TRANSACTION_ARRAY
    }
  }
}

export function loadTransactions(filerId, requiredFields = []) {
  debugger
  return (dispatch, getState) => {
    const transaction = getState().entities.transactions[filerId]
    if (transaction && requiredFields.every(key => transaction.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchTransactions(filerId))
  }
}

export const DONOR_REQUEST = 'DONOR_REQUEST'
export const DONOR_SUCCESS = 'DONOR_SUCCESS'
export const DONOR_FAILURE = 'DONOR_FAILURE'

function fetchDonors(filerId) {

  return {
    [CALL_API]: {
      types: [DONOR_REQUEST, DONOR_SUCCESS, DONOR_FAILURE],
      endpoint: `current_candidate_transactions/${filerId}/`,
      schema: Schemas.DONOR_ARRAY
    }
  }
}

export function loadDonors(filerId, requiredFields = []) {

  return (dispatch, getState) => {
    const donor = getState().entities.donors[filerId]
    if (donor && requiredFields.every(key => donor.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchDonors(filerId))
  }
}

export const INDIV_REQUEST = 'INDIV_REQUEST'
export const INDIV_SUCCESS = 'INDIV_SUCCESS'
export const INDIV_FAILURE = 'INDIV_FAILURE'

function fetchIndivs(filerId) {
  debugger
  return {
    [CALL_API]: {
      types: [ INDIV_REQUEST, INDIV_SUCCESS, INDIV_FAILURE ],
      endpoint: `current_candidate_transactions_individual_in/${filerId}/`,
      schema: Schemas.CONTRIBUTION_ARRAY
    }
  }
}

export function loadIndivs(filerId, requiredFields = []) {
  debugger
  return (dispatch, getState) => {
    // const donor = getState().entities.donors[filerId]
    // if (donor && requiredFields.every(key => donor.hasOwnProperty(key))) {
    //   return null
    // }

    return dispatch(fetchIndivs(filerId))
  }
}

export const PAC_REQUEST = 'PAC_REQUEST'
export const PAC_SUCCESS = 'PAC_SUCCESS'
export const PAC_FAILURE = 'PAC_FAILURE'

function fetchPACinfo(filerId) {
  // debugger
  return {
    [CALL_API]: {
      types: [ PAC_REQUEST, PAC_SUCCESS, PAC_FAILURE ],
      endpoint: `current_candidate_transactions_pac_in/${filerId}/`,
      schema: Schemas.CONTRIBUTION_ARRAY
    }
  }
}

export function loadPACinfo(filerId, requiredFields = []) {
  // debugger
  // return (dispatch, getState) => {
  //   const donor = getState().entities.donors[filerId]
  //   if (donor && requiredFields.every(key => donor.hasOwnProperty(key))) {
  //     return null
  //   }
  //
  //   return dispatch(fetchPACinfo(filerId))
  // }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}