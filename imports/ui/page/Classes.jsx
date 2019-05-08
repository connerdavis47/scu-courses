import React from 'react'
import { Button, Form, InputGroup, InputGroupAddon, Input, } from 'reactstrap'
import shortid from 'shortid'

import Course from 'imports/ui/component/Course'

/**
 * A page that lets students search for classes that are currently available and
 * manually assemble a schedule.
 */
export default class Classes extends React.Component
{
  
  constructor( props )
  {
    super(props);
    
    this.state = {
      
      results: undefined,
      
      form: {
        q: '',
      },
      
    }
  }
  
  render( )
  {
    return (
      <div>
        <h1>Classes</h1>
        { this.renderSearchForm() }
        <div className="border my-4 p-4">
          <ul className="m-0 p-0">
            { this.state.results && this.state.results }
          </ul>
        </div>
      </div>
    )
  }
  
  renderSearchForm( )
  {
    return (
      <Form className="my-4" onSubmit={ this.search }>
        <InputGroup>
          <Input type="text" name="q" onChange={ this.changeHandler } />
          <InputGroupAddon addonType="append">
            <Button color="primary" onClick={ this.search }>
              <i className="fas fa-search" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    )
  };
  
  changeHandler( event )
  {
    this.setState({
      formInputs: {
        [event.target.name]: event.target.value,
      },
    });
  }
  
  search( event )
  {
    event.preventDefault();
    
    return new Promise((resolve, reject) => {
      Meteor.call(
        'api.search',
        { q: this.state.formInputs.q, },
        function( err, res )
        {
          if (err)
            return reject(err);
  
          console.log(res);
          this.setState({
            results: res.map(course => (
              <Course key={ shortid.generate() } data={ course } />
            )),
          })
        }
      );
      
      return resolve;
    }).catch(err => console.warn(err));
  }
  
}
