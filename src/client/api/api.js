import {
  Schema,
  arrayOf,
  unionOf,
  valuesOf,
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
  // donor info
const donor = new Schema('donors', {
  idAttribute: 'fullName'
});
export const fetchDonor = (name) => {
  const url = `${API_ROOT}donor_meta/${name}/`
  const schema = arrayOf(donor);
  return promiseToFetch(url, schema);
}
export const fetchDonorTransactions = (name) => {
  const url = `${API_ROOT}transactions_by_alias/${name}/`
  const schema = arrayOf(transaction);
  return promiseToFetch(url, schema);
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
  const sumData = d3.values(data);
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
        .map(sumData);
      resolve(munged);
    } catch (e) {
      reject(e)
    }
  });
}

function formatData(arr) {
  let newData = {
    labels: [],
    series: []
  };
  arr.forEach((item) => {
    let raised = item.total_in == null ? 0 : item.total_in;
    let spent = item.total_out == null ? 0 : (item.total_out);
    newData.labels.push(item.tran_date);
    newData.series[0].push(raised);
    newData.series[1].push(spent);
  });
  console.log(d3.extent(newData.series[0]));
  return newData;
}

function splitCodes(trans) {
  var obj = {}
  trans.forEach((item) => {
    if (item.purposeCodes) {
      let codes = item['purposeCodes'].split(';');
      codes.map((code) => {
        c = code.trim()
        if (c in obj) {
          obj[c] += item.amount / codes.length;
        } else {
          obj[c] = 0;
        }
      })
    }
  })
  return obj
}
export const mungeSpending = (filerId, data) => {
  return new Promise((resolve, reject) => {
    try {
      let response = {};
      let cashContribs = {};
      let trans = d3.values(data);
      trans.forEach((item) => {
        if (item.purposeCodes) {
          let codes = item['purposeCodes'].split(';');
          codes.map((code) => {
            let c = code.trim()
            let short = /\ \(/.test(c);
            let cash = /[C|c]ash/.test(c);
            if (short) {
              c = c.split(/\ \(/)[0];
            }
            if (cash && item.purposeCodes == 'Cash Contribution') {
              if (item.payee in cashContribs) {
                cashContribs[item.contributorPayee] += Number((item.amount / codes.length)
                  .toFixed(2));
              } else {
                cashContribs[item.contributorPayee] = Number(item.amount.toFixed(2)) || 0;
              }
            }
            if (c in response) {
              response[c] += Number((item.amount / codes.length)
                .toFixed(2));
            } else {
              response[c] = Number(item.amount.toFixed(2)) || 0;
            }
          })
        }
      })
      resolve({
        filerId,
        response,
        cashContribs
      })
    } catch (e) {
      reject(e)
    } finally {}
  });
}

function formatMonth(year, [...months]) {
  let monthData = months.map((item) => {
    return year[item]
  })
  let newYear = year[months];
  console.log(newYear);
}
export const concatMonths = (months, year, data) => {
  return new Promise((resolve, reject) => {
    try {
      const monthData = months.map(m => {
        return {
          [m]: data[year][m]
        }
      })
      const newData = {
        [year]: {...monthData
        }
      }
      resolve({
        months,
        year,
        newData
      });
    } catch (e) {
      reject(e)
    }
  });
}
