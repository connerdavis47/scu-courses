import React from 'react'

/**
 * The top-level heading associated with each page of the Single Page Application
 * (SPA). Granted significant visual weight and separated distinctly from content
 * with a Bootstrap `primary` background color.
 */
export default class Header extends React.Component
{
  
  constructor( props )
  {
    super(props);
  }
  
  render( )
  {
    return (
      <header className="container-fluid mb-5 bg-primary-less">
        <div className="container py-5">
          <h2 className="font-weight-bold text-white">
            { this.props.content }
          </h2>
        </div>
      </header>
    )
  }
  
}
