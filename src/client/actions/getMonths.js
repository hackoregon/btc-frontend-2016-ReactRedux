import { concatMonths } from '../api/api';

// const reqMonths = (months,year) => ({
//   type: 'REQUEST_MONTHS',
//   year,
//   months
// });
const recieveMonths = (months,year,response) => ({
  type: 'RECIEVE_MONTHS',
  year,
  months,
  response
});

const getMonthsData = (months,year,data) => (dispatch) => {
    return concatMonths(months,year,data)
      .then(result => {
          return dispatch(recieveMonths(result.months,result.year,result.newData));
      });
  }

export default getMonthsData;
