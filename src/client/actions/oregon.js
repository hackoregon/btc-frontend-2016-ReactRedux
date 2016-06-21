import * as api from '../api/api.js'
import axios from 'axios';
import moment from 'moment';
import {
  camelizeKeys
} from 'humps';
const API_ROOT = 'http://54.213.83.132/hackoregon/http/';

const requestOregon = () => ({
  type: 'OREGON_REQUEST'
});
const recieveOregon = (response) => ({
  type: 'RECIEVE_OREGON',
  response
});
// const requestTransactions = (filerId) => ({
//   type: 'TRANSACTION_REQUEST',
//   filerId
// });
// const requestSpending = (filerId) => ({
//   type: 'SPENDING_REQUEST',
//   filerId
// });
//
// const recieveTransactions = (filerId, response) => ({
//   type: 'RECIEVE_TRANSACTIONS',
//   filerId,
//   response
// });
// const recieveSpending = (filerId, response) => ({
//   type: 'RECIEVE_SPENDING',
//   filerId,
//   response
// });
//
// const requestSumByDate = (filerId) => ({
//   type: 'SUM_REQUEST',
//   filerId
// });
// const recieveSumByDate = (filerId,response) => ({
//   type: 'RECIEVE_SUM',
//   filerId,
//   response
// });
// const requestMungedSpending = (filerId) => ({
//   type: 'REQUEST_MUNGED_SPENDING',
//   filerId
// });
// const recieveMungedSpending = (filerId,response,cashContribs) => ({
//   type: 'RECIEVE_MUNGED_SPENDING',
//   filerId,
//   response,
//   cashContribs
// });
// const requestMungedSum = (filerId) => ({
//   type: 'REQUEST_MUNGED_SUM',
//   filerId
// });
// const recieveMungedSum = (filerId,response) => ({
//   type: 'RECIEVE_MUNGED_SUM',
//   filerId,
//   response
// });

function getPac() {
  return axios.get(API_ROOT+'oregon_committee_contributors/_/')
}
function getBiz() {
  return axios.get(API_ROOT+'oregon_business_contributors/_/')
}
function getInd() {
  return axios.get(API_ROOT+'oregon_individual_contributors/_/')
}
function getSum() {
  return axios.get(API_ROOT+'all_oregon_sum/_/')
}
function getFeed(){
  const yesterday = moment().add(-1, 'days').format('YYYY-MM-DD');
  return axios.get(`${API_ROOT}all_transactions_by_date/${yesterday}/`)
}
function getOr(){
  return axios.all([getPac(),getBiz(),getInd(),getSum(),getFeed()])
    .then(response => ({
      pac:camelizeKeys(response[0].data),
      biz:camelizeKeys(response[1].data),
      ind:camelizeKeys(response[2].data),
      sum:camelizeKeys(response[3].data),
      feed:camelizeKeys(response[4].data)
      }))
}

export const fetchOregon = () => (dispatch,getState) => {
  dispatch(requestOregon());
    return getOr()
      .then(response => {
        dispatch(recieveOregon(response));
        return response
      });

    // .then(filerId => {
    //   const dataToMunge = getState().entities.sums
    //   dispatch(requestMungedSum(filerId));
    //   return api.mungeByYear(dataToMunge)
    //   .then(response => {
    //     dispatch(recieveMungedSum(filerId,response));
    //     return filerId;
    //   })
    // })
    // .then(filerId => {
    //   const spendingData = getState().entities.expenses
    //   dispatch(requestMungedSpending(filerId));
    //   return api.mungeSpending(filerId, spendingData)
    //   .then(value => {
    //     const {filerId,response,cashContribs} = value;
    //     dispatch(recieveMungedSpending(filerId,response,cashContribs));
    //     return filerId;
    //   })
    // })
    // .then(filerId => { TODO: add more dispatch actions here
    //   // dispatch(requestState)
    // })
}
