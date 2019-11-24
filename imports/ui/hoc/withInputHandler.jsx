import React from 'react'

/**
 * A <a href="https://reactjs.org/docs/higher-order-components.html">Higher-Order Component</a>
 * that provides useful generic input handling mechanisms that capture a variety
 * of formInputs inputs and maintain them in
 *
 * @param WrappedComponent - A component we want to grant access to the functions
 *  found in this class
 */
export default function withInputHandler(WrappedComponent)
{
  return class extends React.Component
  {
  
    constructor( props )
    {
      super(props);
      
      this.handleInput = this.handleInput.bind(this);
    }
    
    render( )
    {
      return (
        <WrappedComponent
          {...this.props}
          handleInput={ this.handleInput }
        />
      )
    }
  
  }
}
