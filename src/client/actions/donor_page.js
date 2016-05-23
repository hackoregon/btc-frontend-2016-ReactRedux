
import {
  CALL_API,
  Schemas
} from '../api/serverApi.js';

const types = ['DONOR_REQUEST', 'DONOR_SUCCESS', 'DONOR_FAILURE'];

function fetchDonor(donor_name) {
  return {
    [CALL_API]: {
      types: types,
      endpoint: `transactions_by_contributor_payee/${donor_name}/`,
      schema: Schemas.DONOR_ARRAY
    }
  }
}

export default function loadDonor(donor_name, requiredFields = []) {
  return (dispatch, getState) => {
    const donor = getState().entities.donors[donor_name]
    if (donor && requiredFields.every(key => donor.hasOwnProperty(key))) {

      return null
    }
    return dispatch(fetchDonor(donor_name))
  }
}
