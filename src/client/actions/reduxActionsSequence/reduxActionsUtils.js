export const START = 'start';
export const DONE = 'done';
export const ERROR = 'error';

const SPLIT_CHARACTER = '.';

function wrapAction(type, stage, payload){
    return {
        type: type + SPLIT_CHARACTER + stage,
        payload
    }
}

export function wrapPromise(actionType, dispatch, promise){
    //console.log('Starting: ' + actionType);
    dispatch(wrapAction(actionType, START));
    return promise()
        .then(payload => {
            dispatch(wrapAction(actionType, DONE, payload));
        })
        .catch(payload => {
            dispatch(wrapAction(actionType, ERROR, payload));
        })
}

export function parseAction(action){
    const { payload, type } = action;
    //console.log('Parsing action with type: ' + type);
    if(type && type.indexOf(SPLIT_CHARACTER) > 0){
        const [actionType, stageCode] = type.split(SPLIT_CHARACTER);
        let stage = undefined;
        if(stageCode === START){
            stage = START;
        } else if(stageCode === DONE){
            stage = DONE;
        } else if(stageCode === ERROR){
            stage = ERROR;
        }
        return {
            type: actionType,
            stage,
            payload
        }
    } else {
        return {
            type,
            payload
        }
    }
}