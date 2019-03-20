import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

/**
 * Responsive header with navigation to SPA sections.
 *
 * @param links List of paths to navigable SPA pages.
 */
class Header extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <header className="header-scu">
        <div className="nav-top nav-top-custom fixed-top bg-white">
          <div className="container d-flex py-2 align-items-center">
            <div className="mr-auto">
              <span className="text-uppercase wordmark link-home pr-4">
                <a href="/">SCU Courses</a>
              </span>
              { Object.values(this.props.links).map((path, key) =>
                <NavLink exact to={ `/${path}` } activeClassName="font-weight-bold">
                  <span className="px-2">{ this.constructor.properNoun(path) }</span>
                </NavLink>
              )}
            </div>
            <div className="ml-auto">
              <a href="/login" className="px-2">Login</a>
              <a href="/search" className="px-2">
                <i className="fas fa-search">&nbsp;</i>
                <span className="sr-only">Search</span>
              </a>
            </div>
          </div>
        </div>
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
