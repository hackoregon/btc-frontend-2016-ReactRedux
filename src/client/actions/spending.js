import {
  CALL_API,
  Schemas
} from '../api/serverApi.js';
const types = ['SPENDING_REQUEST', 'SPENDING_SUCCESS', 'SPENDING_FAILURE'];
console.log(types);
function fetchSpending(filerId) {
  return {
    [CALL_API]: {
      types: types,
      endpoint: `current_candidate_transactions_out/${filerId}/`,
      schema: Schemas.EXPENDITURE_ARRAY
    }
  }
}

function loadSpending(filerId, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(fetchSpending(filerId));
  }
}

export default loadSpending;