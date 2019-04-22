import React, { Component, } from 'react'
import { Badge, InputGroup, InputGroupAddon, } from 'reactstrap'

/**
 * One course listed on the Classes page, found in search results as well as
 * the running list of courses the user has chosen to hold onto.
 *
 * @param data  The course data obtained via JSON request by the server.
 * @param key   The key used to uniquely identify this course in a list.
 */
class Course extends Component {
  
  constructor( props ) {
    super(props);
    
    this.state = {
      expanded: false,
    };
  }
  
  render( ) {
    return (
      <li className={ `classes-course mb-2
            ${this.state.expanded && 'classes-course-expanded'} `}
          key={ this.props.key }
          onClick={ () => { this.expandCollapse() } }>
        <div>
          <InputGroup className="align-items-center">
            <InputGroupAddon addonType="prepend">
              { this.renderNbr() }
              { this.renderName() }
            </InputGroupAddon>
            <div className="d-flex flex-grow-1 justify-content-between px-4">
              { this.renderDesc() }
              { this.renderTime() }
            </div>
            <InputGroupAddon addonType="append">
              { this.renderSeats() }
              { this.renderActions() }
            </InputGroupAddon>
          </InputGroup>
          { this.state.expanded &&
            this.renderExpanded()
          }
        </div>
      </li>
    )
  }
  
  expandCollapse = ( ) => {
    this.setState({ expanded: !this.state.expanded, });
  };
  
  renderExpanded = ( ) => {
    return (
      <div className="py-3">
        <p>Room: { this.props.data.mtg_facility_1 }<br />
          Instructor: { this.props.data.instr_1 }.</p>
      </div>
    )
  };
  
  renderNbr = ( ) => {
    return (
      <Badge color="primary"
             className="px-2 py-3 font-weight-light">
        { this.props.data.class_nbr }
      </Badge>
    )
  };
  
  renderName = ( ) => {
    return (
      <Badge color="light"
             className="py-3 font-weight-light">
        { this.props.data.subject } { this.props.data.catalog_nbr }
      </Badge>
    )
  };
  
  renderDesc = ( ) => {
    return (
      <div>
        { this.props.data.class_descr }
      </div>
    )
  };
  
  renderTime = ( ) => {
    return (
      <div>
        { this.props.data.mtg_days_1 } { this.props.data.mtg_time_beg_1 } -
        { this.props.data.mtg_time_end_1 }
      </div>
    )
  };
  
  renderSeats = ( ) => {
    return (
      <div className="classes-course-seats d-flex align-items-center justify-content-center text-warning">
        <i className="fas fa-chair"> </i>
        <span className="pl-1">{ this.props.data.seats_remaining }</span>
      </div>
    )
  };
  
  renderActions = ( ) => {
    return (
      <div className="d-flex align-items-center mx-3">
        <i className="fas fa-plus text-success p-1"> </i>
        <i className="fas fa-minus text-danger ml-1 p-1"> </i>
      </div>
    )
  };
  
}

export default Course;
