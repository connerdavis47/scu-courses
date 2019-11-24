import React from 'react'
import { Badge, } from 'reactstrap'
import update from 'immutability-helper/index'

/**
 * A clickable Bootstrap Badge for one course requirement at SCU. These are used
 * for all of the course requirements that the suggestion algorithm can actually
 * understand.
 */
export default class CourseBadge extends React.Component
{
  
  /**
   * Compares some text to the regular expression for a course title at SCU.
   * Courses are denoted by a four-letter department code, a space, a one-to-three
   * digit course number, an optional suffix in (A, B, C, D, E, F, G), and an
   * optional suffix of L.
   *
   * @param text - The text to scan
   * @returns {boolean} - True if the text matches the regular expression
   */
  static isCourse( text )
  {
    return /^\w{4} [0-9]{1,3}[ABCDEFG]?L?$/.test(text);
  }
  
  constructor( props )
  {
    super(props);
  }
  
  render( )
  {
    // true for badges that do NOT contain " or ", i.e., is one course
    const isOneCourse = CourseBadge.isCourse(this.props.name);
    
    return (
      <Badge
        color={ this.props.color }
        className={ `m-1 p-3 border-bottom ${isOneCourse ? '' : 'badge-fill'}` }
        onClick={ this.props.onClick }
      >
        { this.props.name }
      </Badge>
    )
  }
  
}
