import {
  CALL_API,
  Schemas
} from '../api/serverApi.js';
import * as api from '../api/api.js'

const types = ['CAMPAIGN_REQUEST', 'CAMPAIGN_SUCCESS', 'CAMPAIGN_FAILURE'];

function fetchCampaign(filerId) {
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
// new stuff
const requestCampaign = (filerId) => ({
  type: 'CAMPAIGN_REQUEST',
  filerId
});
const requestTransactions = (filerId) => ({
  type: 'TRANSACTION_REQUEST',
  filerId
});
const requestSpending = (filerId) => ({
  type: 'SPENDING_REQUEST',
  filerId
});
const recieveCampaign = (filerId, response) => ({
  type: 'RECIEVE_CAMPAIGN',
  filerId,
  response
});
const recieveTransactions = (filerId, response) => ({
  type: 'RECIEVE_TRANSACTIONS',
  filerId,
  response
});
const recieveSpending = (filerId, response) => ({
  type: 'RECIEVE_SPENDING',
  filerId,
  response
});

const requestSumByDate = (filerId) => ({
  type: 'SUM_REQUEST',
  filerId
});
const recieveSumByDate = (filerId,response) => ({
  type: 'RECIEVE_SUM',
  filerId,
  response
});
const requestMungedSpending = (filerId) => ({
  type: 'REQUEST_MUNGED_SPENDING',
  filerId
});
const recieveMungedSpending = (filerId,spendingByYear) => ({
  type: 'RECIEVE_MUNGED_SPENDING',
  filerId,
  spendingByYear
});
const requestMungedSum = (filerId) => ({
  type: 'REQUEST_MUNGED_SUM',
  filerId
});
const recieveMungedSum = (filerId,response) => ({
  type: 'RECIEVE_MUNGED_SUM',
  filerId,
  response
});
export const fetchCampaigns = (filerId) => (dispatch,getState) => {
  dispatch(requestCampaign(filerId));
  return api.fetchCampaigns(filerId)
    .then(response => {
      dispatch(recieveCampaign(filerId, response));
      return filerId;
    })
    .then(filerId => {
      dispatch(requestTransactions(filerId));
      return api.fetchTransactions(filerId)
        .then(response => {
          dispatch(recieveTransactions(filerId, response));
          return filerId
        })
    })
    .then(filerId => {
      dispatch(requestSpending(filerId));
      return api.fetchSpending(filerId)
        .then(response => {
          dispatch(recieveSpending(filerId, response));
          return filerId
        })
    })
    .then(filerId => {
      dispatch(requestSumByDate(filerId));
      return api.fetchTransactionsForTimeline(filerId)
        .then(response => {
          dispatch(recieveSumByDate(filerId, response));
          return filerId;
        })
    })
    .then(filerId => {
      const dataToMunge = getState().entities.sums

      // console.log(JSON.stringify(dataToMunge));
      dispatch(requestMungedSum(filerId));
      return api.mungeByYear(dataToMunge)
      .then(response => {
        dispatch(recieveMungedSum(filerId,response));
        return filerId;
      })
    })
    .then(filerId => {
      const spendingData = getState().entities.expenses
      dispatch(requestMungedSpending(filerId));
      return api.mungeSpendByYear(spendingData)
      .then(response => {
        dispatch(recieveMungedSpending(filerId,response));
        return filerId;
        // return api.mungeSpending(filerId, response)
        // .then(value => {
          // debugger;
          // const {filerId,allYears} = value;
        // })
      })
    })
    // .then(filerId => { TODO: add more dispatch actions here
    //   // dispatch(requestState)
    // })
}
