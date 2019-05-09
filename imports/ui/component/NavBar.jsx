import React from 'react'
import { NavLink, } from 'react-router-dom'
import shortid from 'shortid'

/**
 * Responsive navigation bar that contains a set of Single Page Application (SPA)
 * navigation links. The first link is always interpreted as the "home page"
 * link, and is visually separated as such from the succeeding links.
 */
export default class NavBar extends React.Component
{
  
  constructor( props )
  {
    super(props);
  }
  
  render( )
  {
    const homePage = this.props.links[0];
    const pages = this.props.links.slice(1);
    
    return (
      <nav className="bg-primary">
        <div className="container d-flex align-items-center py-2">
          { NavBar.renderNavLink(homePage, 'SCU Courses') }
          <span className="px-2 text-white">&#124;</span>
          { pages.map(path => NavBar.renderNavLink(path, NavBar.properNoun(path))) }
        </div>
      </nav>
    );
  }
  
  /**
   * Renders a navigation link item that points to a path in the SPA.
   *
   * @param to - The path to this item's content, without the root prefix (/)
   * @param text - The text for users to click on
   * @returns {NavLink}
   * @public
   */
  static renderNavLink( to, text )
  {
    return (
      <NavLink
        exact
        to={ `/${to}` }
        activeClassName="font-weight-bold"
        className="px-2 text-white"
        key={ shortid.generate() }>
        { text }
      </NavLink>
    )
  }
  
  /**
   * Converts the first letter of the word to uppercase, resulting in a proper
   * noun.
   *
   * @param {string} word
   * @returns {string}
   * @public
   */
  static properNoun( word )
  {
    return word[0].toUpperCase() + word.slice(1);
  }
  
}
