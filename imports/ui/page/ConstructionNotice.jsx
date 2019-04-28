import React, { Component } from 'react'

class ConstructionNotice extends Component {
  
  constructor( props ) {
    super(props);
  }
  
  render() {
    return (
      <div className="construction-notice mb-3 p-3 d-flex flex-column flex-md-row align-items-center justify-content-center text-white bg-warning w-100">
        <i className="fas fa-exclamation-triangle mb-3 mb-md-0 mr-md-3"> </i>
        Only buttons that can be selected will be factored into your suggestions. "Grayed out" sections will not be considered when generating schedules.
      </div>
    )
  }
  
}

export default ConstructionNotice;
