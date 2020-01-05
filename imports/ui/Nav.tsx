import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import id from 'shortid'

export default class Nav extends Component<
  { links: string [] },
  {}
> {

  renderLink(to: string, home?: boolean) {
    return (
      <NavLink
        key={id.generate()}
        exact
        activeClassName="font-weight-bold"
        className="navlink px-2 text-white"
        to={`/${to}`}
      >
        {home ? 'SCU Courses' : to}
      </NavLink>
    )
  }

  render() {
    const links = this.props.links;
    return (
      <nav className="bg-primary">
        <div className="container d-flex align-items-center py-2">
          {this.renderLink(links[0], true)}
          <span className="px-2 text-white">&#124;</span>
          {links.length > 1 && links.slice(1).map(link => this.renderLink(link))}
        </div>
      </nav>
    )
  }

}
