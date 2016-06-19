import {concatMonths} from '../api/api';

const reqMonths = (months,year) => ({
  type: 'REQUEST_MONTHS',
  year,
  months
});
const recMonths = (months,year,response) => ({
  type: 'RECIEVE_MONTHS',
  year,
  months,
  response
});

const getMonthsData = (months,year,data) => (dispatch, getState) => {
    return concatMonths(months,year,data)
      .then(result => {
          return dispatch(recMonths(result.months,result.year,result.newData));
      });
  }

export default getMonthsData;