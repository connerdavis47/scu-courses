import React, { Component, } from 'react'
import { Badge, } from 'reactstrap'

class CourseBadge extends Component {
  
  constructor( props ) {
    super(props);
  }
  
  render( ) {
    return (
      <Badge color="light"
             className="m-1 p-3 border-bottom"
             onClick={ this.toggle }>
        { this.props.name }
      </Badge>
    )
  }
  
  toggle = ( e ) => {
    const options = [ 'badge-primary', 'badge-light' ];
    options.forEach(color => e.target.classList.toggle(color));
  };
  
}

export default CourseBadge;
