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
// const API_ROOT = 'http://54.213.83.132/hackoregon/http/';
// local below
const API_ROOT = 'http://localhost:8080/hackoregon/http/';
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
// export const fetchOregon = (stateParam) => {
//   // http://54.213.83.132/hackoregon/http/oregon_committee_contributors/_/
//   // http://54.213.83.132/hackoregon/http/oregon_business_contributors/_/
//   // http://54.213.83.132/hackoregon/http/oregon_individual_contributors/_/
//   // http://54.213.83.132/hackoregon/http/all_oregon_sum/_/
//     return
//
//     fetch(`${API_ROOT}oregon_committee_contributors/${stateParam}/`)
//
//
//     ))
//   const url =
//
//   const schema = arrayOf(transaction);
//   return promiseToFetch(url, schema);
// }
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
  idAttribute: 'id'
});
export const fetchDonor = (name) => {
  const url = `${API_ROOT}donor_meta/${name}/`
    // const schema = arrayOf(donor);
    // // online
    // return fetch(url)
    //   .then(response => {
    //     return response.json()
    //       .then(json => ({
    //         json,
    //         response
    //       }))
    //   })
    //   .then(({
    //     json,
    //     response
    //   }) => {
    //     if (!response.ok) {
    //       return Promise.reject(json)
    //     }
    //
    //     if(typeof json === 'string'){
    //       return { [json]: {
    //         fullName: json
    //       }}
    //     }
    //
    //     const camelizedJson = camelizeKeys(json[0]);
    //     return {
    //       [camelizedJson['fullName']]:camelizedJson
    //     }
    //   });
    // offline
  return Promise.resolve({
    ['Jim Kelly']: {
      createDate: "2016-06-15 00:44:50.130928+00",
      donationsAmount: null,
      donationsCount: null,
      donorIdent: "P1748",
      employerIndustry: "Retail Services",
      employerUrl: "www.rejuvenation.com",
      firstName: null,
      fullName: "James Kelly",
      id: 5856,
      jobTitle: "Owner/Founder",
      lastName: null,
      patronage: "Oregon Historical Society (Donor), Oregon Business Association (Top 10 Donor),  ",
      patronageCategories: ["Arts & Culture", "Business"]
    }
  })
}
export const fetchDonorTransactions = (name) => {
  const url = `${API_ROOT}transactions_by_alias/${name}/`
    // const schema = arrayOf(transaction);
    //   // online
    // return fetch(url)
    //   .then(response => {
    //     return response.json()
    //       .then(json => ({
    //         json,
    //         response
    //       }))
    //   })
    //   .then(({
    //     json,
    //     response
    //   }) => {
    //     if (!response.ok) {
    //       return Promise.reject(json)
    //     }
    //     const filerIds = json.map((item) => {
    //       return item.filer_id
    //     })
    //     const transactions = json.map((item) => {
    //       const {
    //         filer_id,
    //         filer,
    //         amount,
    //         tran_id,
    //         tran_date,
    //         state
    //       } = item;
    //       return {
    //         filer_id,
    //         filer,
    //         amount,
    //         tran_id,
    //         tran_date,
    //         state
    //       }
    //     });
    //     const mungedDonations = d3.nest()
    //       .key(function (d) {
    //         if (d.tran_date) {
    //           return moment(d.tran_date)
    //             .format('YYYY');
    //         }
    //       })
    //       .key(function (d) {
    //         return moment(d.tran_date)
    //           .format('MMM');
    //       })
    //       .rollup(function (v) {
    //         return v
    //       })
    //       .map(transactions);
    //     const donations = {
    //       transactions,
    //       filerIds,
    //       mungedDonations
    //     }
    //     const donationData = camelizeKeys(donations);
    //     return {
    //       name,
    //       donationData
    //     }
    //   });
  // // offline
  const fakeJson = {
    "transactions": [{
      "filerId": 16626,
      "filer": "Friends of Elizabeth Furse",
      "amount": 250,
      "tranId": 1656313,
      "tranDate": "2014-02-20",
      "state": "OR"
    }, {
      "filerId": 5718,
      "filer": "Friends of Dan Saltzman",
      "amount": 250,
      "tranId": 1665187,
      "tranDate": "2014-02-26",
      "state": "OR"
    }, {
      "filerId": 5709,
      "filer": "Nick Fish for City Council",
      "amount": 250,
      "tranId": 1642501,
      "tranDate": "2014-01-19",
      "state": "OR"
    }, {
      "filerId": 12047,
      "filer": "Elect Deborah Kafoury",
      "amount": 2500,
      "tranId": 1681851,
      "tranDate": "2014-03-21",
      "state": "OR"
    }, {
      "filerId": 12498,
      "filer": "Friends of Jules",
      "amount": 250,
      "tranId": 1686497,
      "tranDate": "2014-03-28",
      "state": "OR"
    }, {
      "filerId": 16679,
      "filer": "Stop the Bull Run Takeover PAC",
      "amount": 1000,
      "tranId": 1689029,
      "tranDate": "2014-04-01",
      "state": "OR"
    }, {
      "filerId": 17285,
      "filer": "Friends of Amy Kohnstamm",
      "amount": 600,
      "tranId": 2010160,
      "tranDate": "2015-04-29",
      "state": "OR"
    }, {
      "filerId": 17001,
      "filer": "Vote Yes on 90",
      "amount": 10000,
      "tranId": 2040449,
      "tranDate": "2015-06-30",
      "state": "OR"
    }, {
      "filerId": 17001,
      "filer": "Vote Yes on 90",
      "amount": 27500,
      "tranId": 2040450,
      "tranDate": "2015-06-30",
      "state": "OR"
    }, {
      "filerId": 16892,
      "filer": "Every Oregon Voter Counts",
      "amount": 22500,
      "tranId": 2040452,
      "tranDate": "2015-06-30",
      "state": "OR"
    }, {
      "filerId": 16131,
      "filer": "Communities of Color for a Just Oregon",
      "amount": 1000,
      "tranId": 2089333,
      "tranDate": "2015-10-22",
      "state": "OR"
    }, {
      "filerId": 5208,
      "filer": "Friends of Tobias Read",
      "amount": 500,
      "tranId": 2053137,
      "tranDate": "2015-08-12",
      "state": "OR"
    }, {
      "filerId": 15406,
      "filer": "Elect Ellen Rosenblum for Attorney General",
      "amount": 1000,
      "tranId": 2055988,
      "tranDate": "2015-08-13",
      "state": "OR"
    }, {
      "filerId": 17676,
      "filer": "Fix Our Streets Portland",
      "amount": 1000,
      "tranId": 2194431,
      "tranDate": "2016-02-11",
      "state": "OR"
    }, {
      "filerId": 15089,
      "filer": "Charlie Hales for Mayor",
      "amount": 10000,
      "tranId": 2080567,
      "tranDate": "2015-09-28",
      "state": "OR"
    }, {
      "filerId": 931,
      "filer": "Kate Brown Committee",
      "amount": 10000,
      "tranId": 2086626,
      "tranDate": "2015-10-19",
      "state": "OR"
    }, {
      "filerId": 15330,
      "filer": "Friends of Jessica Vega Pederson",
      "amount": 500,
      "tranId": 2092094,
      "tranDate": "2015-10-26",
      "state": "OR"
    }, {
      "filerId": 11487,
      "filer": "Friends of Mark Hass",
      "amount": 250,
      "tranId": 2154458,
      "tranDate": "2016-01-06",
      "state": "OR"
    }, {
      "filerId": 17539,
      "filer": "Oregonians for High School Success",
      "amount": 25000,
      "tranId": 2113378,
      "tranDate": "2015-12-07",
      "state": "OR"
    }, {
      "filerId": 15089,
      "filer": "Charlie Hales for Mayor",
      "amount": 2896.21,
      "tranId": 2151687,
      "tranDate": "2015-12-18",
      "state": "OR"
    }, {
      "filerId": 15109,
      "filer": "Novick for Portland",
      "amount": 500,
      "tranId": 2239575,
      "tranDate": "2016-05-03",
      "state": "OR"
    }, {
      "filerId": 14993,
      "filer": "Committee to Elect Shemia Fagan",
      "amount": 500,
      "tranId": 1276594,
      "tranDate": "2012-06-09",
      "state": "OR"
    }, {
      "filerId": 3701,
      "filer": "Mary Nolan for City Council",
      "amount": 600,
      "tranId": 1332596,
      "tranDate": "2012-09-06",
      "state": "OR"
    }, {
      "filerId": 5677,
      "filer": "Libraries Yes! Committee",
      "amount": 500,
      "tranId": 1337094,
      "tranDate": "2012-09-19",
      "state": "OR"
    }, {
      "filerId": 931,
      "filer": "Kate Brown Committee",
      "amount": 500,
      "tranId": 1333733,
      "tranDate": "2012-09-18",
      "state": "OR"
    }, {
      "filerId": 4681,
      "filer": "Citizens for Jim Thompson",
      "amount": 250,
      "tranId": 2273000,
      "tranDate": "2016-06-18",
      "state": "OR"
    }, {
      "filerId": 16892,
      "filer": "Every Oregon Voter Counts",
      "amount": 20000,
      "tranId": 1730853,
      "tranDate": "2014-05-12",
      "state": "OR"
    }, {
      "filerId": 16672,
      "filer": "Allen Amabisca for Washington County",
      "amount": 300,
      "tranId": 1660356,
      "tranDate": "2014-02-23",
      "state": "OR"
    }, {
      "filerId": 12529,
      "filer": "Friends of Charlotte Lehan",
      "amount": 250,
      "tranId": 1372657,
      "tranDate": "2012-10-11",
      "state": "OR"
    }, {
      "filerId": 16426,
      "filer": "Sal Peralta for Commissioner",
      "amount": 200,
      "tranId": 1787220,
      "tranDate": "2014-07-14",
      "state": "OR"
    }, {
      "filerId": 15089,
      "filer": "Charlie Hales for Mayor",
      "amount": 600,
      "tranId": 1334981,
      "tranDate": "2012-09-18",
      "state": "OR"
    }, {
      "filerId": 15089,
      "filer": "Charlie Hales for Mayor",
      "amount": 25000,
      "tranId": 1269264,
      "tranDate": "2012-06-22",
      "state": "OR"
    }, {
      "filerId": 15089,
      "filer": "Charlie Hales for Mayor",
      "amount": 5000,
      "tranId": 1218937,
      "tranDate": "2012-04-13",
      "state": "OR"
    }, {
      "filerId": 15238,
      "filer": "Ben Unger for Oregon",
      "amount": 500,
      "tranId": 1269323,
      "tranDate": "2012-06-20",
      "state": "OR"
    }, {
      "filerId": 15621,
      "filer": "Reardon for Oregon",
      "amount": 500,
      "tranId": 1222610,
      "tranDate": "2012-04-18",
      "state": "OR"
    }, {
      "filerId": 15089,
      "filer": "Charlie Hales for Mayor",
      "amount": 25000,
      "tranId": 1244284,
      "tranDate": "2012-05-08",
      "state": "OR"
    }, {
      "filerId": 17001,
      "filer": "Vote Yes on 90",
      "amount": 10000,
      "tranId": 1891906,
      "tranDate": "2014-10-23",
      "state": "OR"
    }, {
      "filerId": 12614,
      "filer": "Friends of Carl Hosticka",
      "amount": 500,
      "tranId": 1272755,
      "tranDate": "2012-06-15",
      "state": "OR"
    }, {
      "filerId": 15406,
      "filer": "Elect Ellen Rosenblum for Attorney General",
      "amount": 1000,
      "tranId": 1142792,
      "tranDate": "2012-01-14",
      "state": "OR"
    }, {
      "filerId": 12498,
      "filer": "Friends of Jules",
      "amount": 250,
      "tranId": 1987006,
      "tranDate": "2015-02-18",
      "state": "OR"
    }, {
      "filerId": 13920,
      "filer": "Kitzhaber 2010",
      "amount": 2500,
      "tranId": 1151204,
      "tranDate": "2012-01-17",
      "state": "OR"
    }, {
      "filerId": 17007,
      "filer": "Vote Yes on Measure 92: We have the right to know whats in our food",
      "amount": 1000,
      "tranId": 1856030,
      "tranDate": "2014-09-29",
      "state": "OR"
    }, {
      "filerId": 11487,
      "filer": "Friends of Mark Hass",
      "amount": 2500,
      "tranId": 1280625,
      "tranDate": "2012-07-12",
      "state": "OR"
    }, {
      "filerId": 16138,
      "filer": "Restore Our Natural Areas",
      "amount": 1000,
      "tranId": 1469619,
      "tranDate": "2013-02-26",
      "state": "OR"
    }, {
      "filerId": 4726,
      "filer": "Friends of Arnie Roblan",
      "amount": 2500,
      "tranId": 1280132,
      "tranDate": "2012-06-27",
      "state": "OR"
    }, {
      "filerId": 12498,
      "filer": "Friends of Jules",
      "amount": 500,
      "tranId": 1572502,
      "tranDate": "2013-10-16",
      "state": "OR"
    }, {
      "filerId": 5208,
      "filer": "Friends of Tobias Read",
      "amount": 250,
      "tranId": 1574297,
      "tranDate": "2013-10-14",
      "state": "OR"
    }, {
      "filerId": 3545,
      "filer": "Carolyn Tomei for State Representative",
      "amount": 250,
      "tranId": 1569105,
      "tranDate": "2013-10-15",
      "state": "OR"
    }, {
      "filerId": 12047,
      "filer": "Elect Deborah Kafoury",
      "amount": 2500,
      "tranId": 1578140,
      "tranDate": "2013-10-28",
      "state": "OR"
    }, {
      "filerId": 16426,
      "filer": "Sal Peralta for Commissioner",
      "amount": 500,
      "tranId": 1875165,
      "tranDate": "2014-10-16",
      "state": "OR"
    }, {
      "filerId": 172,
      "filer": "Naral Pro-Choice Oregon PAC",
      "amount": 500,
      "tranId": 1873719,
      "tranDate": "2014-10-15",
      "state": "OR"
    }, {
      "filerId": 16156,
      "filer": "Tom Koehler for School Board",
      "amount": 500,
      "tranId": 1492479,
      "tranDate": "2013-04-23",
      "state": "OR"
    }, {
      "filerId": 15293,
      "filer": "Friends of Sam Chase",
      "amount": 250,
      "tranId": 1168989,
      "tranDate": "2012-02-10",
      "state": "OR"
    }, {
      "filerId": 15089,
      "filer": "Charlie Hales for Mayor",
      "amount": 5000,
      "tranId": 1978535,
      "tranDate": "2015-01-30",
      "state": "OR"
    }, {
      "filerId": 3701,
      "filer": "Mary Nolan for City Council",
      "amount": 500,
      "tranId": 1132265,
      "tranDate": "2011-12-30",
      "state": "OR"
    }, {
      "filerId": 15089,
      "filer": "Charlie Hales for Mayor",
      "amount": 20000,
      "tranId": 1097046,
      "tranDate": "2011-11-02",
      "state": "OR"
    }, {
      "filerId": 931,
      "filer": "Kate Brown Committee",
      "amount": 1000,
      "tranId": 1106352,
      "tranDate": "2011-11-19",
      "state": "OR"
    }, {
      "filerId": 2352,
      "filer": "Oregon League of Conservation Voters PAC",
      "amount": 1000,
      "tranId": 1077724,
      "tranDate": "2011-09-19",
      "state": "OR"
    }, {
      "filerId": 5158,
      "filer": "Friends of Chris Edwards",
      "amount": 2500,
      "tranId": 1716429,
      "tranDate": "2014-05-02",
      "state": "OR"
    }, {
      "filerId": 4792,
      "filer": "Friends of Tina Kotek",
      "amount": 2500,
      "tranId": 1715172,
      "tranDate": "2014-05-01",
      "state": "OR"
    }, {
      "filerId": 16892,
      "filer": "Every Oregon Voter Counts",
      "amount": 30000,
      "tranId": 1733491,
      "tranDate": "2014-05-16",
      "state": "OR"
    }, {
      "filerId": 16892,
      "filer": "Every Oregon Voter Counts",
      "amount": 50000,
      "tranId": 1746993,
      "tranDate": "2014-06-11",
      "state": "OR"
    }, {
      "filerId": 16649,
      "filer": "Our Family Farms Coalition",
      "amount": 250,
      "tranId": 1709468,
      "tranDate": "2014-04-23",
      "state": "OR"
    }, {
      "filerId": 5964,
      "filer": "Friends of Jim Bernard",
      "amount": 250,
      "tranId": 1705254,
      "tranDate": "2014-04-20",
      "state": "OR"
    }, {
      "filerId": 16757,
      "filer": "Kathleen Taylor for Oregon",
      "amount": 1000,
      "tranId": 1713072,
      "tranDate": "2014-04-28",
      "state": "OR"
    }],
    "filerIds": [16626, 5718, 5709, 12047, 12498, 16679, 17285, 17001, 17001, 16892, 16131, 5208, 15406, 17676, 15089, 931, 15330, 11487, 17539, 15089, 15109, 14993, 3701, 5677, 931, 4681, 16892, 16672, 12529, 16426, 15089, 15089, 15089, 15238, 15621, 15089, 17001, 12614, 15406, 12498, 13920, 17007, 11487, 16138, 4726, 12498, 5208, 3545, 12047, 16426, 172, 16156, 15293, 15089, 3701, 15089, 931, 2352, 5158, 4792, 16892, 16892, 16649, 5964, 16757],
    "mungedDonations": {
      "2011": {
        "dec": [{
          "filerId": 3701,
          "filer": "Mary Nolan for City Council",
          "amount": 500,
          "tranId": 1132265,
          "tranDate": "2011-12-30",
          "state": "OR"
        }],
        "nov": [{
          "filerId": 15089,
          "filer": "Charlie Hales for Mayor",
          "amount": 20000,
          "tranId": 1097046,
          "tranDate": "2011-11-02",
          "state": "OR"
        }, {
          "filerId": 931,
          "filer": "Kate Brown Committee",
          "amount": 1000,
          "tranId": 1106352,
          "tranDate": "2011-11-19",
          "state": "OR"
        }],
        "sep": [{
          "filerId": 2352,
          "filer": "Oregon League of Conservation Voters PAC",
          "amount": 1000,
          "tranId": 1077724,
          "tranDate": "2011-09-19",
          "state": "OR"
        }]
      },
      "2012": {
        "jun": [{
          "filerId": 14993,
          "filer": "Committee to Elect Shemia Fagan",
          "amount": 500,
          "tranId": 1276594,
          "tranDate": "2012-06-09",
          "state": "OR"
        }, {
          "filerId": 15089,
          "filer": "Charlie Hales for Mayor",
          "amount": 25000,
          "tranId": 1269264,
          "tranDate": "2012-06-22",
          "state": "OR"
        }, {
          "filerId": 15238,
          "filer": "Ben Unger for Oregon",
          "amount": 500,
          "tranId": 1269323,
          "tranDate": "2012-06-20",
          "state": "OR"
        }, {
          "filerId": 12614,
          "filer": "Friends of Carl Hosticka",
          "amount": 500,
          "tranId": 1272755,
          "tranDate": "2012-06-15",
          "state": "OR"
        }, {
          "filerId": 4726,
          "filer": "Friends of Arnie Roblan",
          "amount": 2500,
          "tranId": 1280132,
          "tranDate": "2012-06-27",
          "state": "OR"
        }],
        "sep": [{
          "filerId": 3701,
          "filer": "Mary Nolan for City Council",
          "amount": 600,
          "tranId": 1332596,
          "tranDate": "2012-09-06",
          "state": "OR"
        }, {
          "filerId": 5677,
          "filer": "Libraries Yes! Committee",
          "amount": 500,
          "tranId": 1337094,
          "tranDate": "2012-09-19",
          "state": "OR"
        }, {
          "filerId": 931,
          "filer": "Kate Brown Committee",
          "amount": 500,
          "tranId": 1333733,
          "tranDate": "2012-09-18",
          "state": "OR"
        }, {
          "filerId": 15089,
          "filer": "Charlie Hales for Mayor",
          "amount": 600,
          "tranId": 1334981,
          "tranDate": "2012-09-18",
          "state": "OR"
        }],
        "oct": [{
          "filerId": 12529,
          "filer": "Friends of Charlotte Lehan",
          "amount": 250,
          "tranId": 1372657,
          "tranDate": "2012-10-11",
          "state": "OR"
        }],
        "apr": [{
          "filerId": 15089,
          "filer": "Charlie Hales for Mayor",
          "amount": 5000,
          "tranId": 1218937,
          "tranDate": "2012-04-13",
          "state": "OR"
        }, {
          "filerId": 15621,
          "filer": "Reardon for Oregon",
          "amount": 500,
          "tranId": 1222610,
          "tranDate": "2012-04-18",
          "state": "OR"
        }],
        "may": [{
          "filerId": 15089,
          "filer": "Charlie Hales for Mayor",
          "amount": 25000,
          "tranId": 1244284,
          "tranDate": "2012-05-08",
          "state": "OR"
        }],
        "jan": [{
          "filerId": 15406,
          "filer": "Elect Ellen Rosenblum for Attorney General",
          "amount": 1000,
          "tranId": 1142792,
          "tranDate": "2012-01-14",
          "state": "OR"
        }, {
          "filerId": 13920,
          "filer": "Kitzhaber 2010",
          "amount": 2500,
          "tranId": 1151204,
          "tranDate": "2012-01-17",
          "state": "OR"
        }],
        "jul": [{
          "filerId": 11487,
          "filer": "Friends of Mark Hass",
          "amount": 2500,
          "tranId": 1280625,
          "tranDate": "2012-07-12",
          "state": "OR"
        }],
        "feb": [{
          "filerId": 15293,
          "filer": "Friends of Sam Chase",
          "amount": 250,
          "tranId": 1168989,
          "tranDate": "2012-02-10",
          "state": "OR"
        }]
      },
      "2013": {
        "feb": [{
          "filerId": 16138,
          "filer": "Restore Our Natural Areas",
          "amount": 1000,
          "tranId": 1469619,
          "tranDate": "2013-02-26",
          "state": "OR"
        }],
        "oct": [{
          "filerId": 12498,
          "filer": "Friends of Jules",
          "amount": 500,
          "tranId": 1572502,
          "tranDate": "2013-10-16",
          "state": "OR"
        }, {
          "filerId": 5208,
          "filer": "Friends of Tobias Read",
          "amount": 250,
          "tranId": 1574297,
          "tranDate": "2013-10-14",
          "state": "OR"
        }, {
          "filerId": 3545,
          "filer": "Carolyn Tomei for State Representative",
          "amount": 250,
          "tranId": 1569105,
          "tranDate": "2013-10-15",
          "state": "OR"
        }, {
          "filerId": 12047,
          "filer": "Elect Deborah Kafoury",
          "amount": 2500,
          "tranId": 1578140,
          "tranDate": "2013-10-28",
          "state": "OR"
        }],
        "apr": [{
          "filerId": 16156,
          "filer": "Tom Koehler for School Board",
          "amount": 500,
          "tranId": 1492479,
          "tranDate": "2013-04-23",
          "state": "OR"
        }]
      },
      "2014": {
        "feb": [{
          "filerId": 16626,
          "filer": "Friends of Elizabeth Furse",
          "amount": 250,
          "tranId": 1656313,
          "tranDate": "2014-02-20",
          "state": "OR"
        }, {
          "filerId": 5718,
          "filer": "Friends of Dan Saltzman",
          "amount": 250,
          "tranId": 1665187,
          "tranDate": "2014-02-26",
          "state": "OR"
        }, {
          "filerId": 16672,
          "filer": "Allen Amabisca for Washington County",
          "amount": 300,
          "tranId": 1660356,
          "tranDate": "2014-02-23",
          "state": "OR"
        }],
        "jan": [{
          "filerId": 5709,
          "filer": "Nick Fish for City Council",
          "amount": 250,
          "tranId": 1642501,
          "tranDate": "2014-01-19",
          "state": "OR"
        }],
        "mar": [{
          "filerId": 12047,
          "filer": "Elect Deborah Kafoury",
          "amount": 2500,
          "tranId": 1681851,
          "tranDate": "2014-03-21",
          "state": "OR"
        }, {
          "filerId": 12498,
          "filer": "Friends of Jules",
          "amount": 250,
          "tranId": 1686497,
          "tranDate": "2014-03-28",
          "state": "OR"
        }],
        "apr": [{
          "filerId": 16679,
          "filer": "Stop the Bull Run Takeover PAC",
          "amount": 1000,
          "tranId": 1689029,
          "tranDate": "2014-04-01",
          "state": "OR"
        }, {
          "filerId": 16649,
          "filer": "Our Family Farms Coalition",
          "amount": 250,
          "tranId": 1709468,
          "tranDate": "2014-04-23",
          "state": "OR"
        }, {
          "filerId": 5964,
          "filer": "Friends of Jim Bernard",
          "amount": 250,
          "tranId": 1705254,
          "tranDate": "2014-04-20",
          "state": "OR"
        }, {
          "filerId": 16757,
          "filer": "Kathleen Taylor for Oregon",
          "amount": 1000,
          "tranId": 1713072,
          "tranDate": "2014-04-28",
          "state": "OR"
        }],
        "may": [{
          "filerId": 16892,
          "filer": "Every Oregon Voter Counts",
          "amount": 20000,
          "tranId": 1730853,
          "tranDate": "2014-05-12",
          "state": "OR"
        }, {
          "filerId": 5158,
          "filer": "Friends of Chris Edwards",
          "amount": 2500,
          "tranId": 1716429,
          "tranDate": "2014-05-02",
          "state": "OR"
        }, {
          "filerId": 4792,
          "filer": "Friends of Tina Kotek",
          "amount": 2500,
          "tranId": 1715172,
          "tranDate": "2014-05-01",
          "state": "OR"
        }, {
          "filerId": 16892,
          "filer": "Every Oregon Voter Counts",
          "amount": 30000,
          "tranId": 1733491,
          "tranDate": "2014-05-16",
          "state": "OR"
        }],
        "jul": [{
          "filerId": 16426,
          "filer": "Sal Peralta for Commissioner",
          "amount": 200,
          "tranId": 1787220,
          "tranDate": "2014-07-14",
          "state": "OR"
        }],
        "oct": [{
          "filerId": 17001,
          "filer": "Vote Yes on 90",
          "amount": 10000,
          "tranId": 1891906,
          "tranDate": "2014-10-23",
          "state": "OR"
        }, {
          "filerId": 16426,
          "filer": "Sal Peralta for Commissioner",
          "amount": 500,
          "tranId": 1875165,
          "tranDate": "2014-10-16",
          "state": "OR"
        }, {
          "filerId": 172,
          "filer": "Naral Pro-Choice Oregon PAC",
          "amount": 500,
          "tranId": 1873719,
          "tranDate": "2014-10-15",
          "state": "OR"
        }],
        "sep": [{
          "filerId": 17007,
          "filer": "Vote Yes on Measure 92: We have the right to know whats in our food",
          "amount": 1000,
          "tranId": 1856030,
          "tranDate": "2014-09-29",
          "state": "OR"
        }],
        "jun": [{
          "filerId": 16892,
          "filer": "Every Oregon Voter Counts",
          "amount": 50000,
          "tranId": 1746993,
          "tranDate": "2014-06-11",
          "state": "OR"
        }]
      },
      "2015": {
        "apr": [{
          "filerId": 17285,
          "filer": "Friends of Amy Kohnstamm",
          "amount": 600,
          "tranId": 2010160,
          "tranDate": "2015-04-29",
          "state": "OR"
        }],
        "jun": [{
          "filerId": 17001,
          "filer": "Vote Yes on 90",
          "amount": 10000,
          "tranId": 2040449,
          "tranDate": "2015-06-30",
          "state": "OR"
        }, {
          "filerId": 17001,
          "filer": "Vote Yes on 90",
          "amount": 27500,
          "tranId": 2040450,
          "tranDate": "2015-06-30",
          "state": "OR"
        }, {
          "filerId": 16892,
          "filer": "Every Oregon Voter Counts",
          "amount": 22500,
          "tranId": 2040452,
          "tranDate": "2015-06-30",
          "state": "OR"
        }],
        "oct": [{
          "filerId": 16131,
          "filer": "Communities of Color for a Just Oregon",
          "amount": 1000,
          "tranId": 2089333,
          "tranDate": "2015-10-22",
          "state": "OR"
        }, {
          "filerId": 931,
          "filer": "Kate Brown Committee",
          "amount": 10000,
          "tranId": 2086626,
          "tranDate": "2015-10-19",
          "state": "OR"
        }, {
          "filerId": 15330,
          "filer": "Friends of Jessica Vega Pederson",
          "amount": 500,
          "tranId": 2092094,
          "tranDate": "2015-10-26",
          "state": "OR"
        }],
        "aug": [{
          "filerId": 5208,
          "filer": "Friends of Tobias Read",
          "amount": 500,
          "tranId": 2053137,
          "tranDate": "2015-08-12",
          "state": "OR"
        }, {
          "filerId": 15406,
          "filer": "Elect Ellen Rosenblum for Attorney General",
          "amount": 1000,
          "tranId": 2055988,
          "tranDate": "2015-08-13",
          "state": "OR"
        }],
        "sep": [{
          "filerId": 15089,
          "filer": "Charlie Hales for Mayor",
          "amount": 10000,
          "tranId": 2080567,
          "tranDate": "2015-09-28",
          "state": "OR"
        }],
        "dec": [{
          "filerId": 17539,
          "filer": "Oregonians for High School Success",
          "amount": 25000,
          "tranId": 2113378,
          "tranDate": "2015-12-07",
          "state": "OR"
        }, {
          "filerId": 15089,
          "filer": "Charlie Hales for Mayor",
          "amount": 2896.21,
          "tranId": 2151687,
          "tranDate": "2015-12-18",
          "state": "OR"
        }],
        "feb": [{
          "filerId": 12498,
          "filer": "Friends of Jules",
          "amount": 250,
          "tranId": 1987006,
          "tranDate": "2015-02-18",
          "state": "OR"
        }],
        "jan": [{
          "filerId": 15089,
          "filer": "Charlie Hales for Mayor",
          "amount": 5000,
          "tranId": 1978535,
          "tranDate": "2015-01-30",
          "state": "OR"
        }]
      },
      "2016": {
        "feb": [{
          "filerId": 17676,
          "filer": "Fix Our Streets Portland",
          "amount": 1000,
          "tranId": 2194431,
          "tranDate": "2016-02-11",
          "state": "OR"
        }],
        "jan": [{
          "filerId": 11487,
          "filer": "Friends of Mark Hass",
          "amount": 250,
          "tranId": 2154458,
          "tranDate": "2016-01-06",
          "state": "OR"
        }],
        "may": [{
          "filerId": 15109,
          "filer": "Novick for Portland",
          "amount": 500,
          "tranId": 2239575,
          "tranDate": "2016-05-03",
          "state": "OR"
        }],
        "jun": [{
          "filerId": 4681,
          "filer": "Citizens for Jim Thompson",
          "amount": 250,
          "tranId": 2273000,
          "tranDate": "2016-06-18",
          "state": "OR"
        }]
      }
    }
  };

  return Promise.resolve({
    name: 'Jim Kelly',
    donationData: fakeJson
  })
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
  return newData;
}

function mungeYear(arr) {
  let spending = {};
  let cashContribs = {};
  // let trans = d3.values(y);
  arr.forEach((item) => {
    if (item.purposeCodes) {
      let codes = item['purposeCodes'].split(';');
      codes.map((code) => {
        let c = code.trim()
        let short = /\ \(/.test(c);
        // let cash = /[C|c]ash/.test(c);
        let cash = item.purposeCodes == 'Cash Contribution'
        if (short) {
          c = c.split(/\ \(/)[0];
        }
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

// export const mungeSpending = (filerId, data) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const allYears = data.map(y => {
//         return mungeYear(y);
//       })
//       resolve({
//         filerId,
//         allYears
//       })
//     } catch (e) {
//       reject(e)
//     }
//   });
// }
function formatMonth(year, [...months]) {
  let monthData = months.map((item) => {
    return year[item]
  })
  let newYear = year[months];
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
