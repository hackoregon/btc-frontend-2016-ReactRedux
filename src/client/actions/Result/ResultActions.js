import {
  START,
  DONE,
  ERROR,
  parseAction,
  wrapPromise
} from '../reduxActionsSequence/reduxActionsUtils.js';
import {
  readResultData, readSummaryData
} from '../../api';
import _ from 'lodash';

const FETCH_RESULT_DATA = 'FETCH_RESULT_DATA';
const FETCH_SUMMARY_DATA = 'FETCH_SUMMARY_DATA';
// const FETCH_RESULT_DATA = 'FETCH_RESULT_DATA';

// const getOregonContributions = () =>{
//   return Promise.resolve(mungeContributions(result.data))
//
//       $http.get(urls.oregonContributions()).then((result) =>{
//         deferred.resolve;
//       })
//       return deferred.promise;
//     }

//   const getOreganExpenditures = () =>{
//
//   var deferred = $q.defer();
//   $http.get(urls.oregonExpenditures()).then((result) =>{
//     deferred.resolve(mungeExpenditures(result.data));
//   })
//   return deferred.promise;
// }
//
// const getTopIndividualDonors = () => {
//   var deferred = $q.defer();
//   $http.get(urls.oregonTopIndividualDonors()).then((result) => {
//     deferred.resolve(mungeTopDonors(result.data));
//   })
//   return deferred.promise;
// }
//
// const getTopBusinessDonors = () => {
//   var deferred = $q.defer();
//   $http.get(urls.oregonTopBusinessDonors()).then((result) => {
//     deferred.resolve(mungeTopDonors(result.data));
//   })
//   return deferred.promise;
// }
//
// const getTopCommitteeDonors = () => {
//   var deferred = $q.defer();
//   $http.get(urls.oregonTopPACDonors()).then((result) => {
//     deferred.resolve(mungeTopPACDonors(result.data));
//   })
//   return deferred.promise;
// }

export function fetchSummaryData(filerId){
  return (dispatch, getState) => wrapPromise(FETCH_SUMMARY_DATA, dispatch, () => {
    return readSummaryData(filerId).then(response => {
      let result = {};
      if (response && response.length > 0) {
        result = response[0];
      }
      return result;
    });
  });
}

export function fetchResultData(filerId) {
  return (dispatch, getState) => wrapPromise(FETCH_RESULT_DATA, dispatch, () => {
    return readResultData(filerId).then(response => {
      debugger
      let result = {
        donorData:{
        individual: {
          donors: []
        },
        business: {
          donors: []
        },
        pac: {
          donors: []
        },
        unknown: {
          donors: []
        }
        // grassroots: { donors: [] },
        // party: {
        //   donors: []
        }
      };
      if (response && response.length > 0) {
        result.donorData.individual.donors = _.chain(response).filter({"book_type":"Individual"||"Candidate's Immediate Family"}).orderBy('amount','desc').value();
        result.donorData.business.donors = _.chain(response).filter({"book_type":"Business Entity"}).orderBy('amount','desc').value();
        result.donorData.pac.donors = _.chain(response).filter({"book_type":"Political Committee"}).orderBy('amount','desc').value();
        // result.individual.donors = response.map(item => {
        //
        // });
        // result.grassroots.donors = response.map(item => {
        //   return _.chain(response).filter((item)=>{return item.amount < 200 &&{"book_type":"Individual"||"Candidate's Immediate Family"}}).orderBy('amount','desc').value();
        // });
        // result.unknown.donors = response.map(item => {
        //   return _.chain(response).filter({"book_type":"Other" || ""}).orderBy('amount','desc').value();
        // });
        // result.party.donors = response.map(item => {
        //   return _.chain(response).filter({"book_type":"Political Party Committee"}).orderBy('amount','desc').value();
        // });
        // result.pac.donors = response.map(item => {
        //   return
        // });
        // result.business.donors = response.map(item => {
        //   return
        // });
      }
      return result;
    });
  });
}

function mungeTopPACDonors(results) {
  return _.map(results, function(payee) {
    var result = {
      payee: payee.contributor_payee,
      amount: payee.sum
    };

    if (_.has(payee, 'contributor_payee_committee_id')) {
      result.filer_id = payee['contributor_payee_committee_id'];
    }
    return result;
  })
}

// for Oregon Page Only
function mungeContributions(data) {
  let keyMap = {
    'Political Committee': CONTRIBUTION.PAC,
    'Large Donor': CONTRIBUTION.INDIVIDUAL,
    'Grassroot': CONTRIBUTION.GRASSROOTS,
    'Political Party Committee': CONTRIBUTION.PARTY,
    'Business Entity': CONTRIBUTION.BUSINESS,
    'Labor Organization': CONTRIBUTION.UNION,
    'Other': CONTRIBUTION.NA
  }
  let result = {};
  data.forEach(function(item) {
    for (var val in object) {
      if (object.hasOwnProperty(val)) {
        let key = keyMap[val['contribution_type']];
        if (key) {
          if (!_(result).has(key)) {
            result[key] = {
              amount: 0
            };
          }
          result[key].amount += val.total;
        }
      }
    }
  });
  return result;
}

function mungeTopDonors(results) {
  return _.map(results, (payee) => {
    return {
      payee: payee.contributor_payee,
      amount: payee.sum
    };
  });
}
// function sortState(data){
// var individual = _.chain(data).orderBy('amount','desc').filter({"book_type":"Individual"||"Candidate's Immediate Family"}).value()
// var grassroot = _.chain(data).orderBy('amount','desc').filter({"book_type":"Individual"||"Candidate's Immediate Family"}).value()
// var unknown = _.chain(data).orderBy('amount','desc').filter({"book_type":"Individual"||"Candidate's Immediate Family"}).value()
// var party = _.chain(data).orderBy('amount','desc').filter({"book_type":"Individual"||"Candidate's Immediate Family"}).value()
// var business = _.chain(data) _.filter(data,{"book_type":"Business Entity"})
// var pac = _.filter(data,{"book_type":"Political Committee"})
// return {
//   individual, business, pac
//   }
// }

// function formatData(res){

  // var hashMap = {
  //           PAC:        {label: 'PAC', icon: 'pac', donors:[]},
  //           Business:   {label: 'Business', icon: 'corporate', donors:[]},
  //           Grassroots: {label: 'Grass Roots', icon: 'grassroot', donors:[]},
  //           Individual: {label: 'Large Donors', icon: 'individual', donors: []},
  //           Party:      {label: 'Party', icon: 'party', donors: []},
  //           //Union?
  //           NA: {label: 'Unknown', donors:[]}
  //         }
//   _.forEach(res,(val,key) => {
//     // var obj = _.clone(val);
//     // if(obj!=null){
//     console.log(val,key);
//           var keys = Object.keys(res)
//           console.log(keys);
//           // keys.forEach(item => {
//           //   console.log(res);
//           //   item.label == res.book_type ? item.donors.push(res)
//           //   console.log(hashMap);
//           // })
//           _.sortBy()
//           // console.log(hashMap.Individual==['book_type'])
//           // dataState.push(obj);
//         // }
//   })
// }

export default function(state = {}, action = {
  type: 'UNKNOWN'
}) {
  const {
    type,
    stage,
    payload
  } = parseAction(action);
  if (type === FETCH_SUMMARY_DATA) {
      debugger
      if (stage === START) {
        state = Object.assign({}, state, {
          resultData: {summaryData: {},
          fetching: {
            status: 'loading',
          }
        }
        });
        return state;
      }
      if (stage === DONE) {
        state = {
          resultData:{
            summaryData: {...payload}
          },
          fetching: {
            status: 'done'
            }
        };
        debugger
        return state;
      }
      if (stage === ERROR) {
        state = Object.assign({}, state, {
          resultData:{summaryData: {},
          fetching: {
            status: 'error',
            statusText: payload
          }}
        });
        return state;
      }


  }
  if (type === FETCH_RESULT_DATA) {
    if (stage === START) {
      state = Object.assign({}, state, {
        resultData:{
        donors: [],
        fetching: {
          status: 'loading',
        }
      }
      });
      return state;
    }
    if (stage === DONE) {
      state = {...payload,
        resultData: {...payload},
        fetching: {
          status: 'done'
        }
      };
      debugger
      console.log('stage done:',state)
      return state;
    }
    if (stage === ERROR) {
      state = Object.assign({}, state, {
        resultData:{
        fetching: {
          status: 'error',
          statusText: payload
        }
      }
      });
      return state;
    }
  }

  return state;
}