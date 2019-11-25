import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'

import { Links, Link } from '/imports/api/links'

class Info extends React.Component<{
  links: Link[];
}> {

  renderLink(link: Link) {
    return (
        <li key={link._id}>
          <a href={link.url} target="_blank">{link.title}</a>
        </li>
    );
  }

  render() {
    const links = this.props.links.map(
      link => this.renderLink(link)
    );

    return (
      <div>
        <h2>Learn Meteor!</h2>
        <ul>{ links }</ul>
      </div>
    );
  }

}

export default withTracker(() => {
  return {
    links: Links.find().fetch(),
  };
})(Info);
