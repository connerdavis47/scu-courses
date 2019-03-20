import { Meteor } from 'meteor/meteor'
import React, { Component }  from 'react'
import { render } from 'react-dom'

import App from './ui/App'

Meteor.startup(() => {
  render(<App />, document.getElementById('root'));
  
  // accessibility: set <html lang="">
  document.documentElement.lang = 'en';
});
