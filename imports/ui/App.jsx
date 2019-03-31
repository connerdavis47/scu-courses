import { hot } from 'react-hot-loader'
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Header from 'imports/ui/component/Header'
import Home from 'imports/ui/page/Home'
import Classes from 'imports/ui/page/Classes'
import Schedules from 'imports/ui/page/Schedules'

/**
 * Master index of routes with links in the SPA header. Maps the path of the
 * page to the component that should be displayed there.
 */
const Routes = {
  home: Home,
  classes: Classes,
  schedules: Schedules,
};

/**
 * Root page which draws the header and current active route in the SPA.
 */
const App = () => (
  <Router>
    <div>
      <Header links={ Object.keys(Routes) } />
      <div className="container py-5">
        { Object.entries(Routes).map(([path, component], i) =>
          <Route key={ i } exact path={ `/${path}` } component={ component } />
        ) }
      </div>
    </div>
  </Router>
);
export default hot(module)(App)
