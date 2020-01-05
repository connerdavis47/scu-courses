import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import id from 'shortid'

import DegreeForm from '/imports/ui/DegreeForm'
import Nav from '/imports/ui/Nav'

const routes = [ DegreeForm ];
export default () => (
  <Router>
    <Nav links={ Object.keys(routes) } />
    {Object.entries(routes).map(component => (
      <Route
        key={id.generate()}
        exact
        component={component}
        path={`/${component.toString().toLowerCase()}`}
      />
    ))}
  </Router>
);
