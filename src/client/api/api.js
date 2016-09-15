import {
  Schema,
  arrayOf,
  normalize
}
from 'normalizr';
import {
  camelizeKeys
} from 'humps';
import moment from 'moment';
import d3 from 'd3';
import 'isomorphic-fetch';
const API_ROOT = 'http://54.213.83.132/hackoregon/http/';

// local below
// const API_ROOT = 'http://localhost:8080/hackoregon/http/';
// promise wrapper for fetching endpoints
function promiseToFetch(url, schema) {
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
    return promiseToFetch(url, schema);
  }
  // all transactions for campaign
const transaction = new Schema('transactions', {
  idAttribute: 'tranId'
});
const expense = new Schema('expenses', {
  idAttribute: 'tranId'
});

export const fetchTransactions = (filerId) => {
  const url = `${API_ROOT}current_candidate_transactions_in/${filerId}/`
  const schema = arrayOf(transaction);
  return promiseToFetch(url, schema);
}
export const fetchSpending = (filerId) => {
    const url = `${API_ROOT}current_candidate_transactions_out/${filerId}/`
    const schema = arrayOf(expense);
    return promiseToFetch(url, schema);
  }

export const fetchDonor = (name) => {
  const url = `${API_ROOT}donor_meta/${name}/`

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
      if (typeof json === 'string') {
        return {
          [json]: {
            fullName: json
          }
        }
      }
      const camelizedJson = camelizeKeys(json[0]);
      return {
        [camelizedJson['fullName']]: camelizedJson
      }
    });
}
export const fetchDonorTransactions = (name) => {
  const url = `${API_ROOT}transactions_by_alias/${name}/`
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
      const filerIds = json.map((item) => {
        return item.filer_id
      })
      const transactions = json.map((item) => {
        const {
          filer_id,
          filer,
          amount,
          tran_id,
          tran_date,
          state
        } = item;
        return {
          filer_id,
          filer,
          amount,
          tran_id,
          tran_date,
          state
        }
      });
      const mungedDonations = d3.nest()
        .key(function (d) {
          if (d.tran_date) {
            return moment(d.tran_date)
              .format('YYYY');
          }
        })
        .key(function (d) {
          return moment(d.tran_date)
            .format('MMM');
        })
        .rollup(function (v) {
          return v
        })
        .map(transactions);
      const donations = {
        transactions,
        filerIds,
        mungedDonations
      }
      const donationData = camelizeKeys(donations);
      return {
        name,
        donationData
      }
    });
}
const sum = new Schema('sums', {
  idAttribute: 'tranDate'
});
export const fetchTransactionsForTimeline = (filerId) => {
  const url = `${API_ROOT}candidate_sum_by_date/${filerId}/`
  const schema = arrayOf(sum);
  return promiseToFetch(url, schema);
}
export const mungeByYear = (data) => {
  const dataToMunge = d3.values(data);
  return new Promise((resolve, reject) => {
    try {
      const munged = d3.nest()
        .key(function (d) {
          if (d.tranDate) {
            return moment(d.tranDate)
              .format('YYYY');
          }
        })
        .key(function (d) {
          return moment(d.tranDate)
            .format('MMM');
        })
        .rollup(function (v) {
          return v
        })
        .map(dataToMunge);
      resolve(munged);
    } catch (e) {
      reject(e)
    }
  });
}
export const mungeSpendByYear = (data) => {
  const dataToMunge = d3.values(data);
  return new Promise((resolve, reject) => {
    try {
      const munged = d3.nest()
        .key(function (d) {
          if (d.tranDate) {
            return moment(d.tranDate)
              .format('YYYY');
          }
        })
        .rollup(function (v) {
          return v
        })
        .map(dataToMunge);
      const years = Object.keys(munged)
      let spendingByYear = {};
      years.forEach(year => spendingByYear[year] = mungeYear(munged[year]))
      resolve(spendingByYear);
    } catch (e) {
      reject(e)
    }
  });
}

function mungeYear(arr) {
  let spending = {};
  let cashContribs = {};

  arr.forEach((item) => {
    if (item.purposeCodes) {
      let codes = item['purposeCodes'].split(';');
      codes.map((code) => {
        let c = code.trim()
        let cash = item.purposeCodes == 'Cash Contribution'
        if (cash) {
          if (item.payee in cashContribs) {
            cashContribs[item.contributorPayee] += Number((item.amount / codes.length)
              .toFixed(2));
          } else {
            cashContribs[item.contributorPayee] = Number(item.amount.toFixed(2)) || 0;
          }
        } else {
          if (c in spending) {
            spending[c] += Number((item.amount / codes.length)
              .toFixed(2));
          } else {
            spending[c] = Number(item.amount.toFixed(2)) || 0;
          }
        }
      })
    }
  })
  return {
    spending,
    cashContribs
  };
}

