import {
  Schema,
  arrayOf,
  unionOf,
  valuesOf,
  normalize
}
from 'normalizr';
import { camelizeKeys } from 'humps';
import 'isomorphic-fetch';
const API_ROOT = 'http://54.213.83.132/hackoregon/http/';

// promise wrapper for fetching endpoints
function promiseToFetch (url,schema) {
  return fetch(url)
    .then(response => {
      return response.json()
        .then(json => ({
          json,
          response
        }))
    })
    .then(({
      json,
      response
    }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      const camelizedJson = camelizeKeys(json);
      return normalize(camelizedJson, schema);
    })
}

// campaign basic info
const campaign = new Schema('campaigns', {
  idAttribute: 'filerId'
});

export const fetchCampaigns = (filerId) => {
  const url = `${API_ROOT}committee_data_by_id/${filerId}/`
  const schema = arrayOf(campaign);
  return promiseToFetch(url,schema);
}

// all transactions for campaign
const transaction = new Schema('transactions', {
  idAttribute: 'tranId'
});

export const fetchTransactions = (filerId) => {
  const url = `${API_ROOT}current_candidate_transactions/${filerId}/`
  const schema = arrayOf(transaction);
  return promiseToFetch(url,schema);
}

//