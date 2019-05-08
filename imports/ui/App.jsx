import React from 'react'
import { BrowserRouter as Router, Route, } from 'react-router-dom'
import shortid from 'shortid'

import NavBar from 'imports/ui/component/NavBar'
import DegreeForm from 'imports/ui/page/DegreeForm'
import Classes from 'imports/ui/page/Classes'
import Schedules from 'imports/ui/page/Schedules'
import withInputHandler from 'imports/ui/hoc/withInputHandler'

/**
 * All of the Single Page Application (SPA) navigation links are found here.
 * Their key identifies the page title, and their value identifies the React
 * component to which we want to route. At any given time, only one of these
 * is displayed on screen to the user.
 */
const Routes = {
  // Note the first Route is ALWAYS considered the "home page" by NavBar
  home: DegreeForm,
  classes: Classes,
  schedules: Schedules,
};

/**
 * The root React context, which simply draws the SPA navigation links and the
 * active SPA route to the screen.
 */
const App = ( ) => (
  <Router>
    <div>
      <NavBar links={ Object.keys(Routes) } />
      <section id="content">
        { Object.entries(Routes).map(([path, component]) => (
          <Route
            exact
            path={ `/${path}` }
            component={ component }
            key={ shortid.generate() }
          />
        )) }
      </section>
    </div>
  </Router>
);

export default App;
