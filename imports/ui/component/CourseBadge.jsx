import React, { Component, } from 'react'
import { Badge, } from 'reactstrap'

class CourseBadge extends Component {
  
  constructor( props ) {
    super(props);
  }
  
  render( ) {
    return this.startsWithCourse(this.props.name) ? (
      <Badge color="light"
             className={ `${this.isCourse(this.props.name) ? '' : 'badge-fill'} m-1 p-3 border-bottom` }
             onClick={ this.toggle }>
        { this.props.name }
      </Badge>
    ) : (
      <span className="badge-fill mb-2 pb-2 border-bottom text-muted">
        { this.props.name }
      </span>
    )
  }
  
  toggle = ( e ) => {
    const options = [ 'badge-primary', 'badge-light' ];
    options.forEach(color => e.target.classList.toggle(color));
  };
  
  isCourse = ( ) => /^\w{4} [0-9]{1,3}[ABCDE]?L?$/.test(this.props.name);
  startsWithCourse = ( ) => /^\w{4} [0-9]{1,3}[ABCDE]?L?/.test(this.props.name);
  
}

export default CourseBadge;
