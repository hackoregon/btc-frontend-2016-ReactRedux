// import {
//   CALL_API,
//   Schemas
// } from '../api/serverApi.js';
// import {capitalize} from '../utils';
//
// export const SEARCH_REQUEST = 'SEARCH_REQUEST';
// export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
// export const SEARCH_FAILURE = 'SEARCH_FAILURE';
//
// function fetchSearchData(searchTerm) {
//   let searchFor = searchTerm.capitalize();
//
//   return {
//     [CALL_API]: {
//       types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE],
//       endpoint: `competitors_from_name/${searchFor}/`,
//       schema: Schemas.LIST
//     }
//   }
// }
//
// export function loadSearchData(searchTerm, requiredFields = []) {
//   return (dispatch, getState) => {
//     return dispatch(fetchSearchData(searchTerm))
//   }
// }