import 'babel-polyfill';
import './assets/css/stylesheets/react-widgets.css';
import './assets/css/stylesheets/bootstrap.css';
import './assets/css/stylesheets/font-awesome.css';
import './assets/css/components/autosuggest.css';
import './assets/css/stylesheets/app.css';
import './assets/css/stylesheets/bootstrapOverride.css';

// import Moment from 'moment'; TODO - needed?

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
  fontFamily: 'Lato',
  fontWeight: '300'
}

const Root = () => {
    return (
      <Provider store={store} >
        <div style={mainStyles}>
        {routes}
        <DevTools />
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

if (module.hot) {
    module.hot.accept(() => {
        renderApp();
    });
}
