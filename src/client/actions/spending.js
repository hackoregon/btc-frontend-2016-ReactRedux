import {
  CALL_API,
  Schemas
} from '../api/serverApi.js';
import * as api from '../api/api.js'
// const types = ['SPENDING_REQUEST', 'SPENDING_SUCCESS', 'SPENDING_FAILURE'];
//
// function fetchSpending(filerId) {
//   return {
//     [CALL_API]: {
//       types: types,
//       endpoint: `current_candidate_transactions_out/${filerId}/`,
//       schema: Schemas.EXPENDITURE_ARRAY
//     }
//   }
// }
//
// function (filerId, requiredFields = []) {
//   return (dispatch, getState) => {
//     return dispatch(fetchSpending(filerId));
//   }
// }

const reqSpendByYear = (filerId,data) => ({
  type: 'YR_SPENDING_REQUEST',
  filerId,
  data
});
const recSpendByYear = (filerId,response,cashContribs) => ({
  type: 'YR_SPENDING_RECIEVED',
  filerId,
  response,
  cashContribs
});

export const loadSpending = (filerId, data) => (dispatch) => {

  dispatch(reqSpendByYear(filerId,data));
  return api.mungeSpending(filerId, data)
    .then(value => {
      const {
        filerId,
        response,
        cashContribs
      } = value;
      dispatch(recSpendByYear(filerId, response, cashContribs));
      return filerId
    })
}
export default loadSpending;
