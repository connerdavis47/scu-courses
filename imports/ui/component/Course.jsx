import React, { Component, } from 'react';
import { Badge, InputGroup, InputGroupAddon, } from 'reactstrap';
import { hot } from 'react-hot-loader/index';

/**
 * One course listed on the Classes page, which are in search results as well
 * as the running list of any courses the user has chosen to hold onto.
 */
class Course extends Component {
  
  constructor( props ) {
    super( props );
  }
  
  render() {
    return (
      <li className="classes-course mb-2" key={ this.props.data.key }>
        <InputGroup className="align-items-center">
          <InputGroupAddon addonType="prepend">
            { this.renderNbr() }
          </InputGroupAddon>
          <InputGroupAddon addonType="prepend">
            { this.renderName() }
          </InputGroupAddon>
          <div className="d-flex flex-grow-1 justify-content-between px-5">
            { this.renderDesc() }
            { this.renderTime() }
          </div>
          <InputGroupAddon addonType="append">
            { this.renderActions() }
          </InputGroupAddon>
        </InputGroup>
      </li>
    )
  }
  
  renderNbr = () => {
    return (
      <Badge color="primary"
             className="p-3 font-weight-light">
        <small>#</small> { this.props.data.class_nbr }
      </Badge>
    )
  };
  
  renderName = () => {
    return (
      <Badge color="light"
             className="p-3 font-weight-light">
        { this.props.data.subject } { this.props.data.catalog_nbr }
      </Badge>
    )
  };
  
  renderDesc = () => {
    return (
      <div>
        { this.props.data.class_descr }
      </div>
    )
  };
  
  renderTime = () => {
    return (
      <div>
        { this.props.data.mtg_days_1 } { this.props.data.mtg_time_beg_1 } -
        { this.props.data.mtg_time_end_1 }
      </div>
    )
  };
  
  renderActions = () => {
    return (
      <Badge color="success" className="p-2">
        <i className="fas fa-plus"> </i>
      </Badge>
    )
  };
  
}
export default hot(module)(Course)
