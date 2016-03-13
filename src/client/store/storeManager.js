import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
// import myMiddleware from '../middleware/middleware.js';
import thunkMiddleWare from 'redux-thunk';
import createLogger from 'redux-logger'
import serverApi from '../api/serverApi'
// import initialState from './initialState.js';
import DevTools from '../containers/DevTools.jsx';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleWare
)(createStore);

export default function initStore(initialState) {
    const store = createStoreWithMiddleware(
      rootReducer,
      initialState,
      compose(
        // applyMiddleware(thunk,serverApi,createLogger()),
        DevTools.instrument()
      // window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}

