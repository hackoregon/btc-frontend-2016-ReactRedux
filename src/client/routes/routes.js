import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import HomePage from './HomePage.js';
import SearchPage from './SearchPage.js';
import RecipientsPage from './RecipientsPage.js';
import DonorsPage from './DonorsPage.js';
import Donor from './DonorPage.js';
import RecipientPage from './RecipientPage.jsx';
import FaqPage from './FaqPage.js';
import AboutPage from './AboutPage.js';
import Dev from './Dev';

export default function(history) {
    return (
        <Router history={history}>
            <Route path="/" component="div">
                <IndexRoute component={ HomePage } />
                <Route path="/" pageType={'home'} component={ HomePage } />
                <Route path="/search" pageType ={'search'} component={ SearchPage } />
                <Route path="/recipients" pageType={'singleResult'} component={ RecipientsPage } />
                <Route path="/recipients/:filer_id" component={ RecipientPage } />
                <Route path="/donors" component={ DonorsPage } />
                <Route path="/donors/:donorName" pageType={'singleResult'} component={ Donor } />
                <Route path="/faq" component={ FaqPage } />
                <Route path="/about" component={ AboutPage } />
                <Route path="/dev" component={ Dev } />
            </Route>
        </Router>
        );
}