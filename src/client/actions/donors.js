import {
  CALL_API,
  Schemas
} from '../api/serverApi.js';


const types = ['DONOR_REQUEST', 'DONOR_SUCCESS', 'DONOR_FAILURE']

function fetchDonors(filerId) {

  return {
    [CALL_API]: {
      types: types,
      endpoint: `current_candidate_transactions/${filerId}/`,
      schema: Schemas.DONOR_ARRAY
    }
  }
}

export default function loadDonors(filerId, requiredFields = []) {

  return (dispatch, getState) => {
    const donor = getState().entities.donors[filerId]
    if (donor && requiredFields.every(key => donor.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchDonors(filerId))
  }
}