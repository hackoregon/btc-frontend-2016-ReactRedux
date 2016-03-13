import { START, DONE, ERROR, parseAction, wrapPromise} from '../reduxActionsSequence/reduxActionsUtils.js';
import { readData } from '../../api/serverApi.js';

const FETCH_SEARCH_DATA = 'FETCH_SEARCH_DATA';

export function fetchSearchData(inputText) {
  return (dispatch, getState) => wrapPromise(FETCH_SEARCH_DATA, dispatch, () => {
    return readData(inputText).then(response => {
      let result = {
        searchTerm : inputText,
        list : []
      };
      if (response && response.length > 0) {
        result.list = response.map(item => {
          return {
            name: item.candidate_name,
            race: item.race,
            lastUpdated: item.db_update_status,
            filerId: item.filer_id,
            total: item.total,
            spent: item.total_spent
          }
        });
      }
      return result;
    });
  });
}

export default function(state = {}, action = {
  type: 'UNKNOWN'
}) {
  const {
    type,
    stage,
    payload
  } = parseAction(action);
  if (type === FETCH_SEARCH_DATA) {
  // if (type === FETCH_SEARCH_DATA) {
    if (stage === START) {
      state = Object.assign({}, state, {
        list: [],
        fetching: {
          status: 'loading',
        }
      });
      return state;
    }
    if (stage === DONE) {
      state = Object.assign({}, state, {
        searchTerm: payload.searchTerm,
        list: payload.list,
        fetching: {
          status: 'done'
        }
      });
      return state;
    }
    if (stage === ERROR) {
      state = Object.assign({}, state, {
        list: [],
        fetching: {
          status: 'error',
          statusText: payload
        }
      });
      return state;
    }
  }

  return state;
}