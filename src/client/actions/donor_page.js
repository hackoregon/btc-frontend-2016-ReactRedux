import * as api from '../api/api.js'
// import {capitalize, fixNames } from '../utils'

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

export const fetchDonor = (searchTerm) => async (dispatch) => {
  // const searchTerm = fixNames(name.toLowerCase().capitalize());
  // currently changing the name results in error pages due to backend
  try {
    dispatch(requestDonor(searchTerm));
    dispatch(requestDonations(searchTerm));
    const donor = await api.fetchDonor(searchTerm);
    const {name,donationData} = await api.fetchDonorTransactions(searchTerm);
    dispatch(recieveDonor(searchTerm, donor));
    dispatch(recieveDonations(name,donationData));
  } catch (e) {
    console.error('ERROR IN DONOR API', e)
  }

}
