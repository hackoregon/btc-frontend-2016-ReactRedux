import {
  CALL_API,
  Schemas
} from '../api/serverApi.js';


const types = ['STATE_REQUEST', 'STATE_SUCCESS', 'STATE_FAILURE'];

function fetchStateInfo(filerId) {
  return {
    [CALL_API]: {
      types: types,
      endpoint: `candidate_in_by_state_by_id/${filerId}/`,
      schema: Schemas.STATE_CONTRIBUTION_ARRAY
    }
  }
}

export default function loadStateInfo(filerId, requiredFields = []) {
  return (dispatch, getState) => {
      // const contribution = getState().entities.stateContributions[filerId]
      // if (contribution && requiredFields.every(key => contribution.hasOwnProperty(key))) {
      //   return null
      // }

    return dispatch(fetchStateInfo(filerId))
  }
}