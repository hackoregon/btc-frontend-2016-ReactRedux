import 'babel-polyfill';
import './assets/css/stylesheets/react-widgets.css';
import './assets/css/stylesheets/bootstrap.css';
import './assets/css/stylesheets/font-awesome.css';
import './assets/css/components/autosuggest.css';
import './assets/css/stylesheets/app.css';
import './assets/css/stylesheets/bootstrapOverride.css';

import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);
import numberLocalizer from 'react-widgets/lib/localizers/simple-number';
numberLocalizer();

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

ReactDOM.render(
    <Provider store={store} >
        <div>
        {routes}
        <DevTools />
        </div>
    </Provider>,
    document.getElementById('content')
);
