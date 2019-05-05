import React, { Component } from 'react'

class ConstructionNotice extends Component {
  
  constructor( props ) {
    super(props);
  }
  
  render() {
    return (
      <div className="construction-notice mb-3 p-3 d-flex flex-column flex-md-row align-items-center justify-content-center text-white bg-warning w-100">
        <i className="fas fa-exclamation-triangle mb-3 mb-md-0 mr-md-3"> </i>
        Some sections do not have buttons. These are too complex to generate suggestions from, so they are not factored into your schedules.
      </div>
    )
  }
  
}

export default ConstructionNotice;
