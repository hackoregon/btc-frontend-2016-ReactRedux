import * as api from '../api/api.js'
import {capitalize, fixNames } from '../utils'
// const types = ['DONOR_REQUEST', 'DONOR_SUCCESS', 'DONOR_FAILURE'];

// function fetchDonor(donor_name) {
//   return {
//     [CALL_API]: {
//       types: types,
//       endpoint: `transactions_by_alias/${donor_name}/`,
//       schema: Schemas.DONOR_ARRAY
//     }
//   }
// }

// export function loadDonor(donor_name, requiredFields = []) {
//   return (dispatch, getState) => {
//     const donor = getState()
//       .entities.donors[donor_name]
//     if (donor && requiredFields.every(key => donor.hasOwnProperty(key))) {
//       return null
//     }
//     return dispatch(fetchDonor(donor_name))
//   }
// }

const requestDonor = (name) => ({
  type: 'DONOR_REQUEST',
  name
});
const requestDonations = (name) => ({
  type: 'DONATIONS_REQUEST',
  name
});
const recieveDonor = (name, response) => ({
  type: 'RECIEVE_DONOR',
  name,
  response
});
const recieveDonations = (name, donationData) => ({
  type: 'RECIEVE_DONATIONS',
  name,
  donationData
});

export const fetchDonor = (name) => (dispatch) => {
  const searchTerm = fixNames(name.toLowerCase().capitalize());
  dispatch(requestDonor(searchTerm));
  return api.fetchDonor(searchTerm)
    .then(response => {
      dispatch(recieveDonor(searchTerm, response));
      return searchTerm;
    })
    .then(searchTerm => {
      dispatch(requestDonations(searchTerm));
      return api.fetchDonorTransactions(searchTerm)
        .then(response => {
          const {name,donationData} = response;
          dispatch(recieveDonations(name,donationData));
          // return searchTerm;
        })
    })
    // .then(filerId => { TODO: add more dispatch actions here
    //   // dispatch(requestState)
    // })
}
