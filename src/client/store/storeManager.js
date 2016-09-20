import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import serverApi from '../api/serverApi'
import DevTools from '../containers/DevTools.jsx';

// NOTE: uncomment block below if you want logging during dev
/* eslint-disable no-unused-vars */
const addLoggingToDispatch = (store) => {
  /* eslint-enable no-unused-vars */
  /* eslint-disable no-console */
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
  /* eslint-enable no-console */
};

export default function initStore(initialState) {

    const store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(thunk,serverApi),
        DevTools.instrument()
    ));

    if (process.env.NODE_ENV === 'development') {
      store.dispatch = addLoggingToDispatch(store);
      if (module.hot) {
        // hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
      }
    }
    return store;
}

