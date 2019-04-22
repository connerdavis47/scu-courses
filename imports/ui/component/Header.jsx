import React, { Component, } from 'react'
import { NavLink, } from 'react-router-dom'

/**
 * Responsive header with navigation to SPA sections.
 *
 * @param links List of paths to navigable SPA pages. Note that this will also
 *              assign the first element, links[0], as the de facto homepage of
 *              the website, meaning its nav item will be the "COURSES" branded
 *              title, separate from the links that follow.
 */
class Header extends Component {
  
  constructor( props ) {
    super(props);
  }
  
  render( ) {
    return (
      <header className="header-scu">
        <nav className="nav-top nav-top-custom fixed-top bg-primary text-white">
          <div className="container d-flex py-4 align-items-center">
            {/* assign links[0] as homepage, a separate link */}
            <NavLink exact
                     to={ `/${this.props.links[0]}` }
                     activeClassName="font-weight-bold">
              <span className="text-uppercase wordmark pr-3 border-right">
                SCU Courses
              </span>
            </NavLink>
            <div className="pl-2 mr-auto">
              {/* create links for remaining nav items (path) */
                Object.values(this.props.links).slice(1).map((path, i) =>
                  <NavLink key={ i }
                           to={ `/${path}` }
                           activeClassName="font-weight-bold">
                    <span className="px-2">
                      { this.constructor.properNoun(path) }
                    </span>
                  </NavLink>
                )}
            </div>
            <div className="d-none d-lg-block ml-auto">
              <a href="/login"
                 className="px-2">Login</a>
              <a href="/search"
                 className="px-2">
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
  static properNoun = ( word ) => {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
  };
  
}

export default Header;
