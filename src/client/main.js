import 'babel-polyfill';
import './assets/css/stylesheets/font-awesome.css';
import './assets/css/stylesheets/globals.css';
import './assets/css/stylesheets/bootstrapOverride.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getRoutes from './routes/routes.js';
import storeManager from './store/storeManager.js';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import DevTools from './containers/DevTools.jsx';

const store = storeManager();
const history = syncHistoryWithStore(browserHistory, store)
const routes = getRoutes(history);

const mainStyles = {
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
}

const Root = () => {
    return (
      <Provider store={store} >
        <div style={mainStyles}>
        {routes}
        { module.hot ? (<DevTools />) : null }
        </div>
      </Provider>
    );

};


function renderApp() {
    ReactDOM.render(
        <Root />,
        document.getElementById('content')
    );
}

renderApp();

if(module.hot) {
  module.hot.accept(() => {
    renderApp();
  });
}
