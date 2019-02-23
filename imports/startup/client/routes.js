import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Index from '/imports/ui/pages/Index';

export const renderRoutes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ Index } />
    </Switch>
  </Router>
);
