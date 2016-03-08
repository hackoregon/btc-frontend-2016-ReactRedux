import 'babel-polyfill';
import './assets/css/stylesheets/react-widgets.css';
import './assets/css/stylesheets/bootstrap.css';
import './assets/css/stylesheets/font-awesome.css';
import './assets/css/components/autosuggest.css';
import './assets/css/stylesheets/app.css';
import './assets/js/bootstrap.js';

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

const routes = getRoutes();
const store = storeManager();

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('content')
);
