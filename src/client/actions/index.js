import {
  CALL_API,
  Schemas
} from '../api/serverApi.js';
// import { loadBizInfo, BIZ_REQUEST,BIZ_SUCCESS,BIZ_FAILURE} from './bizContributions'
import {capitalize} from '../utils'
export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

function fetchSearchData(searchTerm) {
  // let searchFor = searchTerm.capitalize();
  return {
    [CALL_API]: {
      types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE],
      endpoint: `candidate_search/${searchTerm}/`,
      schema: Schemas.LIST
    }
  }
}

export function loadSearchData(searchTerm, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(fetchSearchData(searchTerm))
  }
}

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

      return null
    }
    return dispatch(fetchLocationData(filerId))
  }
}

export const TRANSACTIONS_REQUEST = 'TRANSACTIONS_REQUEST'
export const TRANSACTIONS_SUCCESS = 'TRANSACTIONS_SUCCESS'
export const TRANSACTIONS_FAILURE = 'TRANSACTIONS_FAILURE'

function fetchTransactions(filerId) {

  return {
    [CALL_API]: {
      types: [TRANSACTIONS_REQUEST, TRANSACTIONS_SUCCESS, TRANSACTIONS_FAILURE],
      endpoint: `current_candidate_transactions/${filerId}/`,
      schema: Schemas.TRANSACTION_ARRAY
    }
  }
}

export function loadTransactions(filerId, requiredFields = []) {

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
  return {
    [CALL_API]: {
      types: [INDIV_REQUEST, INDIV_SUCCESS, INDIV_FAILURE],
      endpoint: `current_candidate_transactions_individual_in/${filerId}/`,
      schema: Schemas.INDIV_CONTRIBUTION_ARRAY
    }
  }
}

export function loadIndivs(filerId, requiredFields = []) {
  return (dispatch, getState) => {
    // const contribution = getState().entities.indivContributions[filerId]
    // if (contribution && requiredFields.every(key => contribution.hasOwnProperty(key))) {
    //   return null
    // }
  return dispatch(fetchIndivs(filerId));
}
}

export const PAC_REQUEST = 'PAC_REQUEST'
export const PAC_SUCCESS = 'PAC_SUCCESS'
export const PAC_FAILURE = 'PAC_FAILURE'

function fetchPACinfo(filerId) {
  return {
    [CALL_API]: {
      types: [PAC_REQUEST, PAC_SUCCESS, PAC_FAILURE],
      endpoint: `current_candidate_transactions_pac_in/${filerId}/`,
      schema: Schemas.PAC_CONTRIBUTION_ARRAY
    }
  }
}

export function loadPACinfo(filerId, requiredFields = []) {
  return (dispatch, getState) => {
    // const contribution = getState().entities.pacContributions[filerId]
    // if (contribution && requiredFields.every(key => contribution.hasOwnProperty(key))) {
    //   return null
    // }

    return dispatch(fetchPACinfo(filerId))
  }
}

export const BIZ_REQUEST = 'BIZ_REQUEST'
export const BIZ_SUCCESS = 'BIZ_SUCCESS'
export const BIZ_FAILURE = 'BIZ_FAILURE'

function fetchBizInfo(filerId) {
  return {
    [CALL_API]: {
      types: [BIZ_REQUEST, BIZ_SUCCESS, BIZ_FAILURE],
      endpoint: `current_candidate_transactions_business_in/${filerId}/`,
      schema: Schemas.BIZ_CONTRIBUTION_ARRAY
    }
  }
}

export function loadBizInfo(filerId, requiredFields = []) {
  return (dispatch, getState) => {
    // const contribution = getState().entities.businessContributions[filerId]
    // if (contribution && requiredFields.every(key => contribution.hasOwnProperty(key))) {
    //   return null
    // }

    return dispatch(fetchBizInfo(filerId))
  }
}
export const STATE_REQUEST = 'STATE_REQUEST'
export const STATE_SUCCESS = 'STATE_SUCCESS'
export const STATE_FAILURE = 'STATE_FAILURE'

function fetchStateInfo(filerId) {
  return {
    [CALL_API]: {
      types: [STATE_REQUEST, STATE_SUCCESS, STATE_FAILURE],
      endpoint: `candidate_in_by_state_by_id/${filerId}/`,
      schema: Schemas.STATE_CONTRIBUTION_ARRAY
    }
  }
}

export function loadStateInfo(filerId, requiredFields = []) {
  return (dispatch, getState) => {
      // const contribution = getState().entities.stateContributions[filerId]
      // if (contribution && requiredFields.every(key => contribution.hasOwnProperty(key))) {
      //   return null
      // }

    return dispatch(fetchStateInfo(filerId))
  }
}
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}