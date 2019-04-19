/*
   This file serves as the entry point for Webpack, so any static CSS files must
   be imported in addition to the Sass and React root files, courses.scss
   and App.jsx.
 */

import { Meteor } from 'meteor/meteor'
import React from 'react'
import { render } from 'react-dom'

import 'client/scss/courses.scss'
import App from 'imports/ui/App'

Meteor.startup(() => {
  render(<App />, document.getElementById('root'));
  
  // accessibility: set <html lang="">
  document.documentElement.lang = 'en-US';
});
