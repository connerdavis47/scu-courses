import React, { Component } from 'react'

class ConstructionNotice extends Component {
  
  constructor( props ) {
    super(props);
  }
  
  render() {
    return (
      <div className="construction-notice mb-3 p-3 d-flex align-items-center justify-content-center text-white bg-warning w-100">
        <i className="fas fa-exclamation-triangle mx-3"> </i>
        This product is currently under development, so there are many sections that do not contain any click-able buttons. These are disregarded by the suggestion algorithm, and they will not impact your results.
      </div>
    )
  }
  
}

export default ConstructionNotice;
