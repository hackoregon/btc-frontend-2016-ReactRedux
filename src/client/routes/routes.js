'use strict';

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import HomePage from './HomePage.js';
import SearchPage from './SearchPage.js';
import CampaignsPage from './CampaignsPage.js';
import ResultsPage from './ResultsPage.js';
import DonorsPage from './DonorsPage.js';
import CandidatesPage from './CandidatesPage.js';
import OregonPage from './OregonPage.js';
import FaqPage from './FaqPage.js';
import AboutPage from './AboutPage.js';
import CampaignResultPage from './CampaignResultPage.js';

export default function() {
    const history = createHistory();
    return (
        <Router history={ history }>
            <Route path="/" component="div">
                <IndexRoute component={ HomePage } />
                <Route path="/" component={ HomePage } />
                <Route path="/search" component={ SearchPage } />
                <Route path="/campaigns" component={ CampaignsPage } />
                <Route path="/results/:searchTerm" component={ ResultsPage } />
                <Route path="/donors" component={ DonorsPage } />
                <Route path="/candidates" component={ CandidatesPage } />
                <Route path="/oregon" component={ OregonPage } />
                <Route path="/faq" component={ FaqPage } />
                <Route path="/about" component={ AboutPage } />
                <Route path="/campaign/:filer_id" component={ CampaignResultPage } />
            </Route>
        </Router>
        );
}