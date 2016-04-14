import 'babel-polyfill';
import './assets/css/stylesheets/react-widgets.css';
import './assets/css/stylesheets/bootstrap.css';
import './assets/css/stylesheets/font-awesome.css';
import './assets/css/components/autosuggest.css';
import './assets/css/stylesheets/app.css';
import './assets/css/stylesheets/bootstrapOverride.css';

import Moment from 'moment';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getRoutes from './routes/routes.js';
import storeManager from './store/storeManager.js';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import DevTools from './containers/DevTools.jsx';
import BTCNav from './components/BTCNav.jsx';

const store = storeManager();
const history = syncHistoryWithStore(browserHistory, store)
const routes = getRoutes(history);
const mainStyles = {
  fontFamily: 'Helvetica',
  fontWeight: '300'
}
ReactDOM.render(
    <Provider store={store} >
      <BTCNav />
        <div style={mainStyles}>

        {routes}
        <DevTools />
        </div>
    </Provider>,
    document.getElementById('content')
);
