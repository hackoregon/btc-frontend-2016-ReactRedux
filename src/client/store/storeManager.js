import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import serverApi from '../api/serverApi'
import DevTools from '../containers/DevTools.jsx';

export default function initStore(initialState) {
    const store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(thunk,serverApi,createLogger()),
        DevTools.instrument()
    ));
    if (module.hot) {
        // hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}

