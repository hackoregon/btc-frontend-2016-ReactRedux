import 'isomorphic-fetch';
import fetchJSON from '../utils/fetchJSON';

String.prototype.capitalize = function(lower) {
  return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
}

export function readData(searchTerm) {
  debugger
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
    fetchJSON(`https://api.github.com/users/${owner}/repos`,{
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
