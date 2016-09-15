import * as api from '../api/api.js'

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
