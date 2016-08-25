import {
  CALL_API,
  Schemas
} from '../api/serverApi.js';
// import * as api from '../api/api.js'

const types = ['CAMPAIGN_REQUEST', 'CAMPAIGN_SUCCESS', 'CAMPAIGN_FAILURE'];

function fetchExample() {
  return {
    [CALL_API]: {
      types: types,
      endpoint: `committee_data_by_id/${filerId}/`,
      schema: Schemas.CAMPAIGN_ARRAY
    }
  }
}

export function loadCampaign(filerId, requiredFields = []) {
  return (dispatch, getState) => {
    const campaign = getState()
      .entities.campaigns[filerId]
    if (campaign && requiredFields.every(key => campaign.hasOwnProperty(key))) {
      return null
    }
    return dispatch(fetchCampaign(filerId))
  }
}

