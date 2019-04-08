import React, { Component, } from 'react'
import {
  Button, Form, InputGroup, InputGroupAddon, Input,
} from 'reactstrap';
import { hot } from 'react-hot-loader'

import Course from 'imports/ui/component/Course';

class Classes extends Component {
  
  constructor( props ) {
    super(props);
    
    this.state = {
      results: undefined,
      form: {
        q: '',
      }
    }
  }
  
  render( ) {
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
  
  renderSearchForm = ( ) => {
    return (
      <Form className="my-4" onSubmit={ this.search }>
        <InputGroup>
          <Input type="text"
                 id="formQ"
                 name="q"
                 onChange={ this.changeHandler } />
          <InputGroupAddon addonType="append">
            <Button color="primary"
                    onClick={ this.search }>
              <i className="fas fa-search"> </i>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    )
  };
  
  changeHandler = ( event ) => {
    this.setState({
      form: {
        [event.target.name]: event.target.value,
      },
    });
  };
  
  search = async( event )  => {
    event.preventDefault();
    
    let res = await new Promise((resolve, reject) => {
      Meteor.call('search',
        {
          q: this.state.form.q,
        },
        (err, response) => {
          if (err) return reject(err);
          resolve(response);
        });
      return resolve;
    }).catch(err => console.warn(err));
    console.log(res);
    
    this.setState({
      results: res.map((course, i) => (
        <Course
          key={ i }
          data={ course }
        />
      )),
    })
  };
  
}
export default hot(module)(Classes)
