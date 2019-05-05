import React, { Component, } from 'react'
import { Badge, } from 'reactstrap'

class CourseBadge extends Component {
  
  constructor( props ) {
    super(props);
  }
  
  render( ) {
    return (
      <Badge color="light"
             className={ `${this.isCourse(this.props.name) ? '' : 'badge-fill'} m-1 p-3 border-bottom` }
             onClick={ this.props.onClick }>
        { this.props.name }
      </Badge>
    )
  }
  
  isCourse = ( ) => /^\w{4} [0-9]{1,3}[ABCDE]?L?$/.test(this.props.name);
  
}

export default CourseBadge;
