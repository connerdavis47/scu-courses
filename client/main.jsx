import { Meteor } from 'meteor/meteor'
import React from 'react'
import { render } from 'react-dom'

import './assets/brand.scu.css'
import './scss/courses.scss'
import App from './ui/App'

/**
 * This file serves as the entry point for Webpack, so any static CSS files
 * must be imported in addition to the Sass and React root files, courses.scss
 * and App.jsx.
 */

Meteor.startup(() => {
  render(<App />, document.getElementById('root'));
  
  // accessibility: set <html lang="">
  document.documentElement.lang = 'en';
});
