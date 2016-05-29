import {
  CALL_API,
  Schemas
} from '../api/serverApi.js';


const indivTypes = ['INDIV_REQUEST', 'INDIV_SUCCESS', 'INDIV_FAILURE'];

function fetchIndivs(filerId) {
  return {
    [CALL_API]: {
      types: indivTypes,
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


const pacTypes = ['PAC_REQUEST', 'PAC_SUCCESS', 'PAC_FAILURE'];

function fetchPACinfo(filerId) {
  return {
    [CALL_API]: {
      types: pacTypes,
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


const bizTypes = ['BIZ_REQUEST', 'BIZ_SUCCESS', 'BIZ_FAILURE'];

function fetchBizInfo(filerId) {
  return {
    [CALL_API]: {
      types: bizTypes,
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