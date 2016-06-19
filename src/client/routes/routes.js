'use strict';

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import HomePage from './HomePage.js';
import SearchPage from './SearchPage.js';
import RecipientsPage from './RecipientsPage.js';
import ResultsPage from './ResultsPage.js';
import DonorsPage from './DonorsPage.js';
import CandidatesPage from './CandidatesPage.js';
import RecipientPage from './RecipientPage.jsx';
import OregonPage from './OregonPage.js';
import FaqPage from './FaqPage.js';
import AboutPage from './AboutPage.js';
// import CampaignResultPage from './CampaignResultPage.js';

export default function(history) {
    return (
        <Router history={history}>
            <Route path="/" component="div">
                <IndexRoute component={ HomePage } />
                <Route path="/" component={ HomePage } />
                <Route path="/search" component={ SearchPage } />
                <Route path="/search/:searchTerm" component={ SearchPage } />
                <Route path="/recipients" component={ RecipientsPage } />
                <Route path="/recipients/:filer_id" component={ RecipientPage } />
                <Route path="/donors" component={ DonorsPage } />
                <Route path="/donors/:donor_name" component={ DonorsPage } />
                <Route path="/faq" component={ FaqPage } />
                <Route path="/about" component={ AboutPage } />
            </Route>
        </Router>
        );
}