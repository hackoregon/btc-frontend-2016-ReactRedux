import {
  CALL_API,
  Schemas
} from '../api/serverApi.js';

const types = ['LOCATION_REQUEST', 'LOCATION_SUCCESS', 'LOCATION_FAILURE'];

function fetchLocationData(filerId) {
  return {
    [CALL_API]: {
      types: [LOCATION_REQUEST, LOCATION_SUCCESS, LOCATION_FAILURE],
      endpoint: `candidate_in_by_state_by_id/${filerId}/`,
      schema: Schemas.LOCATION_ARRAY
    }
  }
}

export default function loadLocationData(filerId, requiredFields = []) {
  return (dispatch, getState) => {
    const location = getState().entities.locations[filerId]
    if (location && requiredFields.every(key => location.hasOwnProperty(key))) {

      return null
    }
    return dispatch(fetchLocationData(filerId))
  }
}
