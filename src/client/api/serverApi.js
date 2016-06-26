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
} from 'humps'
import assign from 'lodash/assign';
import 'isomorphic-fetch';
const API_ROOT = 'http://54.213.83.132/hackoregon/http/';

// local
// const API_ROOT = 'http://localhost:8080/hackoregon/http/';

function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  return fetch(fullUrl)
    .then((response) => {
      return response.json()
        .then(json => ({
          json,
          response
        }))
      return {
        json,
        response
      }
    })
    .then(({
      json,
      response
    }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      const camelizedJson = camelizeKeys(json);
      return normalize(camelizedJson, schema)
    })
}
const campaign = new Schema('campaigns', {
  idAttribute: 'filerId'
});
const donor = new Schema('donors', {
  idAttribute: 'tranId'
});
const transaction = new Schema('transactions', {
  idAttribute: 'tranId'
});
const list = {
  campaigns: campaign
};
//
// function mungeExpenditures(data) {
//   let expenditures = {};
//   data.forEach((val) => {
//     let key = val['purposeCodes'];
//
//     if (!_(expenditures)
//       .has(key)) {
//       expenditures[key] = 0;
//     }
//     expenditures[key] += val.total;
//   });
//
//   return expenditures;
// }
// var self = {};
// var CONTRIBUTION = {
//   PAC: 'PAC',
//   BUSINESS: 'Business',
//   GRASSROOTS: 'Grassroots',
//   INDIVIDUAL: 'Individual',
//   PARTY: 'Party',
//   UNION: 'Union',
//   NA: 'NA'
// };
// self.CONTRIBUTION = CONTRIBUTION;
//
// function mungeContribs(data) {
//   var keyMap = {
//     'Political Committee': CONTRIBUTION.PAC,
//     'Large Donor': CONTRIBUTION.INDIVIDUAL,
//     'Grassroot': CONTRIBUTION.GRASSROOTS,
//     'Political Party Committee': CONTRIBUTION.PARTY,
//     'Business Entity': CONTRIBUTION.BUSINESS,
//     'Labor Organization': CONTRIBUTION.UNION,
//     'Other': CONTRIBUTION.NA
//   }
//   var result = {};
//   Array.forEach(data, function (val) {
//     var key = keyMap[val['contributionType']];
//     if (key) {
//       if (!_(result)
//         .has(key)) {
//         result[key] = {
//           amount: 0
//         };
//       }
//       result[key].amount += val.total;
//     }
//   });
//   return result;
// }
//
// (function(){
//   return function(){
//
//   }
// })
// function munge(t) {
//   var contributions = {};
//   // _(self.CONTRIBUTION)
//   //   .each(function (type) {
//   //     contributions[type] = {
//   //       amount: 0,
//   //       number: 0
//   //     };
//   //   });
//   var expenditures = {};
//   // var donors = {
//   //   indiv: {},
//   //   corp: {},
//   //   pac: {}
//   // };
//   // var committee_codes = {};
//
//   donors.indiv = _.map(donors.indiv, function (amount, donor) {
//     return {
//       payee: donor,
//       amount: amount
//     };
//   });
//   donors.indiv.sort(sortEntry);
//   donors.corp = _.map(donors.corp, function (amount, donor) {
//     return {
//       payee: donor,
//       amount: amount
//     };
//   });
//   donors.corp.sort(sortEntry);
//   donors.pac = _.map(donors.pac, function (amount, donor) {
//     return {
//       payee: donor,
//       amount: amount
//     };
//   })
//   donors.pac.sort(sortEntry);
//   _.each(donors.pac, function (val) {
//     if (_.has(committee_codes, val.payee)) {
//       val['filerId'] = committee_codes[val.payee];
//     }
//   })
//
//   return ({contributions:contributions,expenditures:expenditures, donors: donors});
// }
// function mungeExp(data) {
//       var expenditures = {};
//       Array.forEach(data, function(val) {
//         var key = val['purposeCodes'];
//         if (!_(expenditures).has(key)) {
//           expenditures[key] = 0;
//         }
//         expenditures[key] += val.total;
//       });
//
//       return expenditures;
//     }
//
// function makeSpending(transactions) {
//   console.log(transactions)
//   let expenditures = {};
//   _(transactions)
//     .chain()
//     .each(function (row) {
//
//       var subType = row['subType'];
//       switch (subType) {
//       case 'Cash Expenditure':
//         var purposeCodes = (row['purposeCodes'] || '')
//           .split('; ');
//           console.log(purposeCodes)
//         _(purposeCodes)
//           .each(function (purposeCode) {
//             if (!_(expenditures)
//               .has(purposeCode)) {
//               expenditures[purposeCode] = 0;
//             }
//             expenditures[purposeCode] += (Number(row['amount']) / purposeCodes.length);
//           });
//         break;
//       }
//     })
//     return expenditures;
// }
// function splitPurposeCodes(str){
//   str.split('; ')
// }
//
// function makeSpendId(){
//   return
// }
//
// let options = {
//     idAttribute: 'purposeCodes',
//     assignEntity: (output, key, value, input) => {
//       if (key === 'purposeCodes') {}
//       if (key in obj) {
//         obj[key] += value;
//       } else {
//         obj[key] = value;
//       }
//     }
//   }
  // const expenditure = new Schema('expenditure', );
  // const contribution = new Schema('contributions', {
  //   idAttribute: 'contributorPayee'
  // });
const stateContribution = new Schema('stateContributions', {
  idAttribute: 'state'
});
const indivContribution = new Schema('indivContributions', {
  idAttribute: 'contributorPayee'
});
const pacContribution = new Schema('pacContributions', {
  idAttribute: 'contributorPayee'
});
const businessContribution = new Schema('businessContributions', {
  idAttribute: 'contributorPayee'
});
const contributions = ({
  owner: campaign,
  individual: arrayOf(indivContribution),
  business: arrayOf(businessContribution),
  pac: arrayOf(pacContribution),
  states: arrayOf(stateContribution)
});
campaign.define({
  listByName: valuesOf(campaign, {
    schemaAttribute: 'candidateName'
  })
});
const search = new Schema('searches');
search.define({
  list: arrayOf(campaign)
});
// contribution.define({
//   owner: campaign
// });
indivContribution.define({
  owner: campaign,
  listByType: valuesOf(transaction, {
    schemaAttribute: 'bookType'
  })
});
donor.define({
  owner: transaction,
  listByName: valuesOf(transaction, {
    schemaAttribute: 'contributorPayee'
  }),
  relationships: valuesOf(campaign)
});
export const Schemas = {
  CAMPAIGN: campaign,
  CAMPAIGN_ARRAY: arrayOf(campaign),
  TRANSACTION: transaction,
  TRANSACTION_ARRAY: arrayOf(transaction),
  EXPENDITURE: transaction,
  EXPENDITURE_ARRAY: arrayOf(transaction),
  DONOR: donor,
  DONOR_ARRAY: arrayOf(donor),
  LIST: list,
  STATE_CONTRIBUTION: stateContribution,
  STATE_CONTRIBUTION_ARRAY: arrayOf(stateContribution),
  INDIV_CONTRIBUTION: indivContribution,
  INDIV_CONTRIBUTION_ARRAY: arrayOf(indivContribution),
  BIZ_CONTRIBUTION: businessContribution,
  BIZ_CONTRIBUTION_ARRAY: arrayOf(businessContribution),
  PAC_CONTRIBUTION: pacContribution,
  PAC_CONTRIBUTION_ARRAY: arrayOf(pacContribution)
}
export const CALL_API = Symbol('Call API');
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }
  let {
    endpoint
  } = callAPI
  const {
    schema,
    types
  } = callAPI
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }
  const [requestType, successType, failureType] = types
  next(actionWith({
    type: requestType
  }))
  return callApi(endpoint, schema)
    .then(
      response => next(actionWith({
        response,
        type: successType
      })),
      error => next(actionWith({
        type: failureType,
        error: error.message || 'Something bad happened'
      }))
    )
}
