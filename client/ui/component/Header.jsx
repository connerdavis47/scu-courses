import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

/**
 * Responsive header with navigation to SPA sections.
 *
 * @param links List of paths to navigable SPA pages. Assigns the first path to
 *              the brand homepage.
 */
class Header extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <header className="header-scu">
        <nav className="nav-top nav-top-custom fixed-top bg-white">
          <div className="container d-flex py-2 align-items-center">
            <a href={ `/${this.props.links[0]}` }
               className="text-uppercase wordmark pr-3 border-right">
              Courses
            </a>
            <div className="pl-2 mr-auto">
              { Object.values(this.props.links).map((path, i) =>
                <NavLink key={ i } exact to={ `/${path}` }
                         activeClassName="font-weight-bold">
                  <span className="px-2">
                    { this.constructor.properNoun(path) }
                  </span>
                </NavLink>
              )}
            </div>
            <div className="d-none d-lg-block ml-auto">
              <a href="/login" className="px-2">Login</a>
              <a href="/search" className="px-2">
                <i className="fas fa-search">&nbsp;</i>
                <span className="sr-only">Search</span>
              </a>
            </div>
          </div>
        </nav>
      </header>
    );
  }
  
  /**
   * @public
   * Generates the proper noun of a word, which capitalizes the first letter.
   */
  static properNoun( word ) {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
  }
  
}
export default hot(module)(Header)
