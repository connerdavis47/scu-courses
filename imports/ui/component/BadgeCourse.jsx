import React, { Component, } from 'react'
import { Badge, } from 'reactstrap'

class BadgeCourse extends Component {
  
  constructor( props ) {
    super(props);
  }
  
  render( ) {
    return (
      <Badge color="light"
             className="m-1 p-2 border-bottom"
             onClick={ this.toggleOneCourse }>
        { this.props.name }
      </Badge>
    )
  }
  
}

export default BadgeCourse;
