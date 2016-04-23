import {
  CALL_API,
  Schemas
} from '../api/serverApi.js';

export const TRANSACTIONS_REQUEST = 'TRANSACTIONS_REQUEST'
export const TRANSACTIONS_SUCCESS = 'TRANSACTIONS_SUCCESS'
export const TRANSACTIONS_FAILURE = 'TRANSACTIONS_FAILURE'

function fetchTransactions(filerId) {

  return {
    [CALL_API]: {
      types: [TRANSACTIONS_REQUEST, TRANSACTIONS_SUCCESS, TRANSACTIONS_FAILURE],
      endpoint: `current_candidate_transactions/${filerId}/`,
      schema: Schemas.TRANSACTION_ARRAY
    }
  }
}

export default function loadTransactions(filerId, requiredFields = []) {

  return (dispatch, getState) => {
    const transaction = getState().entities.transactions[filerId]
    if (transaction && requiredFields.every(key => transaction.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchTransactions(filerId))
  }
}
