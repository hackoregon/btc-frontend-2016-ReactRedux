import { expect } from 'chai';
import rootReducer from '../src/client/reducers';

describe('TEST REDUCER', () => {
    
    var initState = {entities:{campaign:"ctest"}};
    const frozenState = {entities:{campaign:"ctest"}};
    const testAction = {type:"SEARCH_SUCCESS", response:{result:{campaign:"check",filer_id:1234}}};
    rootReducer(initState,testAction);
    
    it('should not mutate the original state', () => {
        expect(initState).to.eql(frozenState);
    })

});
