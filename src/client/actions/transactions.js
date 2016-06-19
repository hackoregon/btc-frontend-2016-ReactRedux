import {
  CALL_API,
  Schemas
} from '../api/serverApi.js';

const types = ['TRANSACTIONS_REQUEST','TRANSACTIONS_SUCCESS','TRANSACTIONS_FAILURE']

function fetchTransactions(filerId) {

  return {
    [CALL_API]: {
      types: types,
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
