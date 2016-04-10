// import {
//   CALL_API,
//   Schemas
// } from '../api/serverApi.js';
//
// export const BIZ_REQUEST = 'BIZ_REQUEST'
// export const BIZ_SUCCESS = 'BIZ_SUCCESS'
// export const BIZ_FAILURE = 'BIZ_FAILURE'
//
// function fetchBizInfo(filerId) {
//   return {
//     [CALL_API]: {
//       types: [BIZ_REQUEST, BIZ_SUCCESS, BIZ_FAILURE],
//       endpoint: `current_candidate_transactions_pac_in/${filerId}/`,
//       schema: Schemas.BIZ_CONTRIBUTION_ARRAY
//     }
//   }
// }
//
// export function loadBizInfo(filerId, requiredFields = []) {
//   return (dispatch, getState) => {
//     //   const donor = getState().entities.donors[filerId]
//     //   if (donor && requiredFields.every(key => donor.hasOwnProperty(key))) {
//     //     return null
//     //   }
//
//     return dispatch(fetchBizInfo(filerId))
//   }
// }