import React from 'react'

/**
 * A simple box with a message that uses the `warning` Bootstrap color set to
 * indicate significant importance.
 */
export default class WarningBox extends React.Component
{
  
  constructor( props )
  {
    super(props);
  }
  
  render()
  {
    return (
      <div className="mb-3 p-3 d-flex flex-column flex-md-row align-items-center justify-content-center text-white bg-warning w-100">
        <i className="fas fa-exclamation-triangle mb-3 mb-md-0 mr-md-3"> </i>
        { this.props.message }
      </div>
    )
  }
  
}
