import { readData } from '../api';
import { createAction, handleActions } from '../reduxActionsSequence';

const FETCH_SERVER_DATA = 'FETCH_SERVER_DATA';

export const fetchServerData = createAction(FETCH_SERVER_DATA, () => {
    return readData()
        .then( response => {
            return response.list;
        });
});

/**
 * State substructure: { application }
 */
export default handleActions({

    [FETCH_SERVER_DATA]: {
        start(state, action){
            const serverData = Object.assign({}, state.serverData, {
                fetching: {
                    status: 'loading',
                    errorText: '',
                    error: false
                },
                list: []
            });
            state = Object.assign({}, state, { serverData: serverData });
            return state;
        },
        next(state, action){
            const serverData = Object.assign({}, state.serverData, {
                fetching: {
                    status: 'done',
                    errorText: '',
                    error: false
                },
                list: action.payload
            });
            state = Object.assign({}, state, { serverData: serverData });
            return state;
        },
        throw(state, action){
            console.log('Error is obtained');
            const serverData = Object.assign({}, state.serverData, {
                fetching: {
                    status: 'done',
                    errorText: !!action.payload.message ? action.payload.message : 'Error: no message',
                    error: true
                },
                list: []
            });
            state = Object.assign({}, state, { serverData: serverData });
            return state;
        }
    }

}, {});

