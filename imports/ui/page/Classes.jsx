import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import {
  Button, Form, FormGroup, InputGroup, InputGroupAddon, Label, Input,
} from 'reactstrap';

class Classes extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      results: undefined,
      form: {
        q: '',
      }
    }
  }
  
  render() {
    return (
      <div>
        <h1>Classes</h1>
        { this.renderSearchForm() }
        <div className="border my-4 p-3">
          { this.state.results && this.state.results }
        </div>
      </div>
    )
  }
  
  renderSearchForm = () => {
    return (
      <Form onSubmit={ this.search }>
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
  
  search = async ( event )  => {
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
    
    this.setState({
      results: res.map((course, i) => (
        <p key={ i }>{ course.subject_descr }</p>
      )),
    })
  };
  
}
export default hot(module)(Classes)
