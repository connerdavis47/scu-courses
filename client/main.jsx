import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import { renderRoutes } from '/imports/startup/client/routes';

Meteor.startup(() => {
  // define language on <html> as standard in WCAG 2.0, Guideline 3.1.1
  document.documentElement.setAttribute('lang', 'en-US');
  
  render(renderRoutes(), document.getElementById('app'));
});
