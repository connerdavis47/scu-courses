import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import {
  Badge, Button, Form, FormGroup, InputGroup, InputGroupAddon, Label, Input,
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
        <div className="border my-4 p-4">
          <ul className="m-0 p-0">
            { this.state.results && this.state.results }
          </ul>
        </div>
      </div>
    )
  }
  
  renderSearchForm = () => {
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
    console.log(res);
    
    this.setState({
      results: res.map((course, i) => (
        <li className="classes-course mb-2"
            key={ i }>
          <InputGroup className="align-items-center">
            <InputGroupAddon addonType="prepend">
              <Badge color="primary"
                     className="p-3 font-weight-light">
                <small>#</small> { course.class_nbr }
              </Badge>
            </InputGroupAddon>
            <InputGroupAddon addonType="prepend">
              <Badge color="light"
                     className="p-3 font-weight-light">
                { course.subject } { course.catalog_nbr }
              </Badge>
            </InputGroupAddon>
            <div className="d-flex flex-grow-1 justify-content-between px-5">
              <div>{ course.class_descr }</div>
              <div>{ course.mtg_days_1 } { course.mtg_time_beg_1 } - { course.mtg_time_end_1 }</div>
            </div>
            <InputGroupAddon addonType="append">
              <Badge color="success" className="p-2 font-weight-light">
                <i className="fas fa-plus"> </i>
              </Badge>
            </InputGroupAddon>
          </InputGroup>
        </li>
      )),
    })
  };
  
}
export default hot(module)(Classes)
