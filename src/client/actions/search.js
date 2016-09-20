import {
  CALL_API,
  Schemas
} from '../api/serverApi.js';
import {loadCampaign} from './campaign';

const types = ['SEARCH_REQUEST', 'SEARCH_SUCCESS', 'SEARCH_FAILURE'];

function fetchSearchData(searchTerm) {

  return {
    [CALL_API]: {
      types: types,
      endpoint: `candidate_search/${searchTerm}/`,
      schema: Schemas.LIST
    }
  }
}

const loadDirect = (searchTerm,filerId) => ({
  type: 'LOAD_DIRECT',
  searchTerm,
  filerId
});

function loadDirectly(filerId) {
  return loadCampaign(filerId);
}

export function loadSearchData(searchTerm) {
  return (dispatch) => {
    return dispatch(fetchSearchData(searchTerm))
  }
}

export const directLoad = (searchTerm,filerId) => (dispatch) => {
   dispatch(loadDirect(searchTerm,filerId));
   return loadDirectly(filerId)
}