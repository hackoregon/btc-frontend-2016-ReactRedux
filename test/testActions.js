import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { expect } from 'chai';

import rootReducer from '../src/client/reducers';
import * as actions from '../src/client/actions';
import serverApi, { CALL_API, Schema } from '../src/client/api/serverApi'


const middlewares = [ thunk, serverApi ]
const mockStore = configureMockStore(middlewares)
mockStore

describe ('TEST ACTIONS', () => {

  describe('DB search Actions return appropriate response objects', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('creates SEARCH_SUCCESS when search is completed successfully', () => {
      nock('http://54.213.83.132/')
        .get(/hackoregon.*/)
        .reply(200, {"returned": "foo"})

      const expectedActions = genericResponse('SEARCH')
      const store = getStore()

      return store.dispatch(actions.loadSearchData("Valerie Folkema"))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
    })


    it('creates CAMPAIGN_SUCCESS when campaign fetching is completed successfully', () => {
      nock('http://54.213.83.132/')
        .get(/hackoregon.*/)
        .reply(200, {"returned": "foo"})

      const expectedActions = genericResponse('CAMPAIGN')
      const store = getStore()

      return store.dispatch(actions.loadCampaign("931"),store.getState())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
    })


  // ############# Not implemented because schema from serverApi.js is missing ##################

  //   it('creates LOCATION_SUCCESS when campaign fetching is completed successfully', () => {
  //     nock('http://54.213.83.132/')
  //       .get(/hackoregon.*/)
  //       .reply(200, {"returned": "foo"})

  //     const expectedActions = genericResponse('LOCATION')
  //     const store = getStore()
  //     console.log('location store\n',store.getState())

  //     return store.dispatch(actions.loadLocationData("931"),store.getState())
  //       .then(() => {
  //         expect(store.getActions()).to.eql(expectedActions)
  //       })
  //   })


    it('creates TRANSACTIONS_SUCCESS when campaign fetching is completed successfully', () => {
      nock('http://54.213.83.132/')
        .get(/hackoregon.*/)
        .reply(200, {"returned": "foo"})

      const expectedActions = genericResponse('TRANSACTIONS')
      const store = getStore()

      return store.dispatch(actions.loadTransactions("931"),store.getState())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
    })


    it('creates DONOR_SUCCESS when campaign fetching is completed successfully', () => {
      nock('http://54.213.83.132/')
        .get(/hackoregon.*/)
        .reply(200, {"returned": "foo"})

      const expectedActions = genericResponse('DONOR')
      const store = getStore()

      return store.dispatch(actions.loadDonors("931"),store.getState())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
    })


    it('creates INDIV_SUCCESS when campaign fetching is completed successfully', () => {
      nock('http://54.213.83.132/')
        .get(/hackoregon.*/)
        .reply(200, {"returned": "foo"})

      const expectedActions = genericResponse('INDIV')
      const store = getStore()

      return store.dispatch(actions.loadIndivs("931"),store.getState())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
    })


    it('creates PAC_SUCCESS when campaign fetching is completed successfully', () => {
      nock('http://54.213.83.132/')
        .get(/hackoregon.*/)
        .reply(200, {"returned": "foo"})

      const expectedActions = genericResponse('PAC')
      const store = getStore()

      return store.dispatch(actions.loadPACinfo("931"),store.getState())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
    })


    it('creates BIZ_SUCCESS when campaign fetching is completed successfully', () => {
      nock('http://54.213.83.132/')
        .get(/hackoregon.*/)
        .reply(200, {"returned": "foo"})

      const expectedActions = genericResponse('BIZ')
      const store = getStore()

      return store.dispatch(actions.loadBizInfo("931"),store.getState())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
    })


    it('creates STATE_SUCCESS when campaign fetching is completed successfully', () => {
      nock('http://54.213.83.132/')
        .get(/hackoregon.*/)
        .reply(200, {"returned": "foo"})

      const expectedActions = genericResponse('STATE')
      const store = getStore()

      return store.dispatch(actions.loadStateInfo("931"),store.getState())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
    })

    it('creates SPENDING SUCCESS when fetch is completed successfully', ()=>{
      nock('http://54.213.83.132/')
        .get(/hackoregon.*/)
        .reply(200, {"returned": "foo"})

        const expectedActions = genericResponse('SPENDING')
        const store = getStore()

        return store.dispatch(actions.loadStateInfo("931"),store.getState())
          .then(() => {
            expect(store.getActions()).to.eql(expectedActions)
          })
    })
  })


})

const genericResponse = function(type) {
  return (
    [
      { type: type + '_REQUEST' },
      { type: type + '_SUCCESS',
        response: {
          entities: {},
          result: {"returned": "foo"}
        }
      }
    ]
  )
}

const getStore = function() {
  return mockStore(
    {
      entities: {
        campaigns: {},
        transactions: {},
        contributions: {},
        donors: {},
        searchData: {},
        locations: {}
      }
    }
  )
}
