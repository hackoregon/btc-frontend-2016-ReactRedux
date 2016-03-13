import merge from 'lodash/merge'
import union from 'lodash/union'


const START = 'start';
const DONE = 'done';
const ERROR = 'error';

const SPLIT_CHARACTER = '.';

function wrapAction(type, stage, payload){
    return {
        type: type + SPLIT_CHARACTER + stage,
        payload
    }
}

function wrapPromise(actionType, dispatch, promise){
    //console.log('Starting: ' + actionType);
    dispatch(wrapAction(actionType, START));
    return promise()
        .then(payload => {
            dispatch(wrapAction(actionType, DONE, payload));
        })
        .catch(payload => {
            dispatch(wrapAction(actionType, ERROR, payload));
        })
}
// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function compileResults({
  types,
  mapActionToKey
}) {
  if (!Array.isArray(types) || types.length !== 3) {
      throw new Error('Expected types to be an array of three elements.')
    }
    if (!types.every(t => typeof t === 'string')) {
      throw new Error('Expected types to be strings.')
    }
    if (typeof mapActionToKey !== 'function') {
      throw new Error('Expected mapActionToKey to be a function.')
    }
  const [requestType, successType, failureType] = types
  function updateResults(state = {
    isFetching: false,
    searchTerm: undefined,
    list: [],
    ids: []
  }, action) {
    switch (action.type) {
      case requestType:
        state = Object.assign({}, state, {
          list: [],
          fetching: {
            status: 'loading',
          }
        });
        return state;
      case successType:
        debugger
        state = Object.assign({}, state, {
          searchTerm: payload.searchTerm,
          list: payload.list,
          fetching: {
            status: 'done'
          }
        });
        debugger
        return state;
      case failureType:
        return merge({}, state, {
          isFetching: false
        })
      default:
        return state
    }
  }
  return function updateResultsByKey(state = {}, action) {
    debugger
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action)
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.')
        }
        return merge({}, state, {
          [key]: updatePagination(state[key], action)
        })
      default:
        return state
    }
  }

  // if (type === FETCH_SEARCH_DATA) {
  //   if (stage === START) {
  //     state = Object.assign({}, state, {
  //       list: [],
  //       fetching: {
  //         status: 'loading',
  //       }
  //     });
  //     return state;
  //   }
  //   if (stage === DONE) {
  //     state = Object.assign({}, state, {
  //       searchTerm: payload.searchTerm,
  //       list: payload.list,
  //       fetching: {
  //         status: 'done'
  //       }
  //     });
  //     debugger
  //     return state;
  //   }
  //   if (stage === ERROR) {
  //     state = Object.assign({}, state, {
  //       list: [],
  //       fetching: {
  //         status: 'error',
  //         statusText: payload
  //       }
  //     });
  //     return state;
  //   }
  // }
  //
  // return state;
}

//
// export default function compileResults({
//   types,
//   mapActionToKey
// }) {
//   if (!Array.isArray(types) || types.length !== 3) {
//     throw new Error('Expected types to be an array of three elements.')
//   }
//   if (!types.every(t => typeof t === 'string')) {
//     throw new Error('Expected types to be strings.')
//   }
//   if (typeof mapActionToKey !== 'function') {
//     throw new Error('Expected mapActionToKey to be a function.')
//   }
  // const [requestType, successType, failureType] = types
//
//   function updateResults(state = {
//     isFetching: false,
//     searchTerm: undefined,
//     list: [],
//     ids: []
//   }, action) {
//     debugger
//     switch (action.type) {
//       case requestType:
//         return merge({}, state, {
//           isFetching: true
//         })
//       case successType:
//       debugger
//         return merge({}, state, {
//           isFetching: false,
//           list: action.response.result,
//           searchTerm: action.response.searchTerm
//         })
//       case failureType:
//         return merge({}, state, {
//           isFetching: false
//         })
//       default:
//         return state
//     }
//   }
//   return function updateResultsByKey(state = {}, action) {
//     debugger
//     switch (action.type) {
//       case requestType:
//       case successType:
//       case failureType:
//         const key = mapActionToKey(action)
//         if (typeof key !== 'string') {
//           throw new Error('Expected key to be a string.')
//         }
//         return merge({}, state, {
//           [key]: updatePagination(state[key], action)
//         })
//       default:
//         return state
//     }
//   }
// }