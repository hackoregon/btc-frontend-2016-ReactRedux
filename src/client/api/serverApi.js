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
import 'isomorphic-fetch';

const API_ROOT = 'http://54.213.83.132/hackoregon/http/';

function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  debugger
  return fetch(fullUrl)
    .then((response) =>{
      debugger
      response.json().then(json => ({
        json,
        response
      }))
    }).then(({
      json,
      response
    }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const camelizedJson = camelizeKeys(json);

      return Object.assign({},
        normalize(camelizedJson, schema)
      )
    })
}

String.prototype.capitalize = function(lower) {
  return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
}

const campaign = new Schema('campaigns', {
  idAttribute: 'filerId'
});
const donor = new Schema('donors', {
  idAttribute: 'filerId'
});
const transaction = new Schema('transactions', {
  idAttribute: 'tranId'
});
const donation = unionOf({
  campaigns: campaign,
  donors: donor,
  transactions: transaction
}, {
  schemaAttribute: 'tranId'
});

const search = new Schema('searches');

// AppDispatcher.register((payload) => {
//   const { action } = payload;
//   debugger
//
//   if (action.response && action.response.entities && action.response.entities.campaigns) {
//     mergeUsers(action.response.entities.campaigns);
//     CampaignStore.emitChange();
//   }
// });

search.define({
  list: arrayOf(campaign)
});

donor.define({
  owner: donation,
  donations: arrayOf(donation),
  relationships: valuesOf(donation)
});

// donor.define({
//   owner: donation,
//   donors: arrayOf(donor),
//   relationships: valuesOf(donation (donation, {schemaAttribute: 'tranId'}))
// });

export const Schemas = {
  CAMPAIGN: campaign,
  CAMPAIGN_ARRAY: arrayOf(campaign),
  TRANSACTION: transaction,
  TRANSACTION_ARRAY: arrayOf(transaction),
  DONOR: donor,
  DONOR_ARRAY: arrayOf(donor),
  SEARCH: search,
  SEARCH_ARRAY: arrayOf(search)
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
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(actionWith({
    type: requestType
  }))

  return callApi(endpoint, schema).then(
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
// export const FETCH_SEARCH_DATA = 'FETCH_SEARCH_DATA';

// export function fetchSearchData(inputText) {
//   return (dispatch, getState) => wrapPromise(FETCH_SEARCH_DATA, dispatch, () => {
//     return readData(inputText).then(response => {
//       let result = {
//         searchTerm : inputText,
//         list : []
//       };
//       if (response && response.length > 0) {
//         result.list = response.map(item => {
//           return {
//             name: item.candidate_name,
//             race: item.race,
//             lastUpdated: item.db_update_status,
//             filerId: item.filer_id,
//             total: item.total,
//             spent: item.total_spent
//           }
//         });
//       }
//       return result;
//     });
//   });
// }

export function readData(searchTerm) {
  let searchFor = searchTerm.capitalize();
  return fetch(`http://54.213.83.132/hackoregon/http/competitors_from_name/${searchFor}/`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'request'
      }
    })
    .then(response => {
      console.log('Received : ' + response);
      console.log('Response status: ' + response.status);
      console.log('Response statusText: ' + response.statusText);
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    })
    .then(response => {
      debugger
      return response.json();
    });

}
export function readSummaryData(filerId) {
  debugger
  return fetch(`http://54.213.83.132/hackoregon/http/committee_data_by_id/${filerId}/`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'request'
      }
    })
    .then(response => {
      console.log('Received : ' + response);
      console.log('Response status: ' + response.status);
      console.log('Response statusText: ' + response.statusText);
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    })
    .then(response => {
      return response.json();
    });

}

export function readResultData(filerId) {
  return fetch(`http://54.213.83.132/hackoregon/http/current_candidate_transactions/${filerId}/`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'request'
      }
    })
    .then(response => {
      console.log('Received : ' + response);
      console.log('Response status: ' + response.status);
      console.log('Response statusText: ' + response.statusText);
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    })
    .then(response => {
      return response.json();
    });

}

export function searchCandidates(searchTerm) {
  const searchFor = searchTerm.capitalize();
  return dispatch => {
    fetchJSON(`https://api.github.com/users/${owner}/repos`, {
        // `http://54.213.83.132/hackoregon/http/competitors_from_name/${searchFor}/`, {
        method: 'get'
      })
      .then(data => {
        console.log(`parsed data ${data}`);
        dispatch(loginSuccess(data));
      }).catch(error => {
        console.log(`request failed ${error}`);
      });
  };
}