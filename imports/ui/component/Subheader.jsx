import React, { Component, } from 'react'

class Subheader extends Component {
  
  constructor( props ) {
    super(props);
  }
  
  render( ) {
    return (
      <section className="container-fluid mb-5 bg-primary-less"
               id="subheader">
        <div className="container py-5">
          <h2 className="font-weight-bold text-white">
            { this.props.content }
          </h2>
        </div>
      </section>
    )
  }
  
}

export default Subheader;
