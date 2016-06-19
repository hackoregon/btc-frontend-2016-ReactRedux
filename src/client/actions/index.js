import {
  CALL_API,
  Schemas
} from '../api/serverApi.js';

import {loadSearchData,directLoad} from './search';
import {loadCampaign,fetchCampaigns} from './campaign';
import loadLocationData from './location';
import loadTransactions from './transactions';
import loadSpending from './spending';
import {loadDonors} from './donors';
import { loadIndivs, loadPACinfo, loadBizInfo } from './donorCategories';
import loadStateInfo from './state';
import getMonthsData from './getMonths';
import {fetchDonor} from './donor_page';
export { loadSearchData,directLoad, loadCampaign, fetchCampaigns, fetchDonor, loadLocationData, loadTransactions, loadDonors, loadIndivs, loadPACinfo, loadBizInfo, loadStateInfo, loadSpending, getMonthsData };


console.log(directLoad)

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}