import { withTracker } from 'meteor/react-meteor-data'
import React, { Component, } from 'react'
import { Button, Col, Form, Label, Input, Row, } from 'reactstrap'
import update from 'immutability-helper'

import Degrees from 'imports/api/degrees/Degrees'
import Header from 'imports/ui/component/Header'
import CourseBadge from 'imports/ui/component/CourseBadge';
import WarningBox from 'imports/ui/component/WarningBox'

/**
 * Landing page, which prompts users for basic degree information the server
 * will use to generate schedule suggestions.
 */
class Home extends Component {
  
  constructor( props ) {
    super(props);
    
    this.state = {
  
      formState: 'degree',
      form: {
        degree: { },
        core: { },
        major: { },
        finishing: { },
      },
  
    };
  }
  
  render( ) {
    console.log(this.state);
    return (
      <section className="degree-form"
               id="degree-form">
        <Header content="Tell us a little about yourself." />
        <div className="container mb-5">
          <Row>
            <Col sm="4">
              <h5 className="mb-0 pb-3 border-bottom border-bottom-thicker border-primary">
                My progress
              </h5>
              <ol className="degree-form-progress-list list-unstyled">
                { this.renderBtnProgress('degree', 'Degree program') }
                { this.renderBtnProgress('core', 'Core requirements') }
                { this.renderBtnProgress('major', 'Major requirements') }
                { this.renderBtnProgress('finishing', 'Finishing touches') }
              </ol>
            </Col>
            <Col sm="8">
              <Form>
                { (() => {
                  switch (this.state.formState) {
                    case 'degree':
                      return this.renderFormDegree();
            
                    case 'core':
                      return this.renderFormCore();
            
                    case 'major':
                      return this.renderFormMajor();
            
                    case 'finishing':
                      return this.renderFormFinishing();
                  }
                })() }
              </Form>
            </Col>
          </Row>
        </div>
      </section>
    )
  }
  
  renderBtnProgress = ( formState, title ) => {
    const active = this.state.formState === formState ? 'degree-form-progress-active' : '';
    const completed = (!(typeof this.state.form[formState] === 'undefined') &&
      Object.values(this.state.form[formState]).length > 0)
        ? 'text-success' : 'text-light';
    
    return (
      <li className={ `${active} border-bottom border-secondary p-4` }
          onClick={ () => this.setFormState(formState) }>
        { title }
        <i className={ `fas fa-check-circle text-success ${completed}` }> </i>
      </li>
    )
  };
  
  renderBtnContinue = ( ) => {
    return (
      <Button outline
              color="success"
              onClick={ this.nextFormState }>
        { 'finishing'.startsWith(this.state.formState)
          ? 'Get schedules' : 'Save and continue' }
        <i className="fas fa-arrow-right pl-2"> </i>
      </Button>
    )
  };
  
  renderFormDegree = ( ) => {
    return (
      <div>
        <h4 className="font-weight-bolder mb-4">
          Degree program
        </h4>
        <p>
          <Label for="title">Degree program</Label>
          <Input type="select"
                 name="title"
                 id="inputTitle"
                 onChange={ this.handleInput }
                 defaultValue={ this.state.form.degree.title }>
            { this.getDegreesSorted().map(( degree, i) =>
              <option key={ i }
                      name={ degree.title }>
                { degree.title }
              </option>
            ) }
          </Input>
        </p>
        { this.renderBtnContinue() }
      </div>
    );
  };
  
  renderFormCore = ( ) => {
    return (
      <div>
        <h4 className="font-weight-bolder mb-4">
          Core requirements
        </h4>
        <WarningBox/>
        <p>Select the University Core classes you've already taken.</p>
        <div>
          { this.props.degrees.filter(d => d.title === 'Undergraduate Degrees')[0].categories.map((each, i) =>
            <div key={ i }
                 className="mb-4">
              <h5 key={ i }
                 className="degree-form-category font-weight-bold mb-2">
                { each.name }
                <span className="ml-3"> </span>
              </h5>
              <div className="degree-form d-flex flex-wrap">
                { this.renderRequirements(each) }
              </div>
            </div>
          ) }
        </div>
        { this.renderBtnContinue() }
      </div>
    )
  };
  
  renderFormMajor = ( ) => {
    return (
      <div>
        <h4 className="font-weight-bolder mb-4">
          Major requirements
        </h4>
        <WarningBox />
        <p>Select the classes you've already taken.</p>
        <div>
          { this.props.degrees.filter(d => d.title === this.state.form.degree.title)[0].categories.map((each, i) =>
            <div className="mb-4">
              <h5 key={ i }
                 className="degree-form-category font-weight-bold mb-2">
                { each.name }
                <span className="ml-3"> </span>
              </h5>
              <div className="degree-form d-flex flex-wrap">
                { this.renderRequirements(each) }
              </div>
            </div>
          ) }
        </div>
        { this.renderBtnContinue() }
      </div>
    )
  };
  
  renderFormFinishing = ( ) => {
    return (
      <div>
        <h4 className="font-weight-bolder mb-4">
          Finishing touches
        </h4>
        <p>See if you would like to try any of these extra restrictions.</p>
        <div>
        
        </div>
        { this.renderBtnContinue() }
      </div>
    )
  };
  
  renderRequirements = ( category ) => {
    return Object.values(category.reqs).map((item, i) => {
      // deal with objects, e.g., { reqs: [], pre: '...' }
      if (Object.prototype.toString.call(item) === '[object Object]')
      {
        return (
          <React.Fragment key={ i }>
            { item.hasOwnProperty('pre') &&
              <p className={ `${i === 0 ? '' : 'mt-3'} mb-2 text-dark w-100` }>
                <strong>
                  { item.pre }
                </strong>
              </p>
            }
            { Object.values(item.reqs).map((req, i) => this.renderOneRequirement(req, i)) }
            { item.hasOwnProperty('post') &&
              <p className="mt-3 text-dark w-100">
                <em>
                  { item.post }
                </em>
              </p>
            }
          </React.Fragment>
        )
      }
      
      // deal with simple requirements that have no pre/post text
      return this.renderOneRequirement(item, i);
    })
  };
  
  renderOneRequirement = ( item, key ) => {
    if (Array.isArray(item))
      item = item.toString().replace(/[,]+/g, ' or ');
    
    if (item.includes('<') && item.includes('>'))
    {
      return (
        <div key={ key }
             className="mt-3 text-muted"
             dangerouslySetInnerHTML={{ __html: item }}>
        </div>
      )
    }
    
    if (!this.startsWithCourse(item))
    {
      return (
        <span key={ key }
              className="badge-fill mb-2 pb-2 border-bottom text-muted">
          { this.props.name }
        </span>
      )
    }
    
    return (
      <CourseBadge key={ key }
                   name={ item }
                   onClick={ this.toggleCourse } />
    )
  };
  
  toggleCourse = ( e ) => {
    const text = e.target.textContent;
    const options = [ 'badge-primary', 'badge-light' ];
    options.forEach(color => e.target.classList.toggle(color));
    const toggled = e.target.classList.contains('badge-primary');
    
    const state = update(this.state, {
      form: {
        major: {
          [text]: { $set: toggled },
        },
      },
    });
    this.setState(state);
  };
  
  handleInput = ( e ) => {
    const name = e.target.name;
    let value;
    
    switch (e.target.type) {
      case 'checkbox':
        value = e.target.checked;
        break;
      
      case 'email':
      case 'select-one':
      case 'tel':
      case 'text':
      case 'textarea':
        value = e.target.value;
        break;
      
      default:
        console.log('handleInput: surprising input type => ' + e.target.type);
        break;
    }
    
    console.log(`handleInput: { ${name} => ${value} }`);
    this.setState({
      form: {
        [this.state.formState]: {
          [name]: value,
        },
      },
    });
  };
  
  nextFormState = ( ) => {
    let state = {
      formState: this.state.formState,
      form: this.state.form,
    };
    
    switch (state.formState) {
      case 'degree':
        state.formState = 'core';
        
        if (typeof this.state.form.degree.title === 'undefined')
          state.form.degree.title = this.getDegreesSorted()[0].title;
        break;
      
      case 'core':
        state.formState = 'major';
        break;
        
      case 'major':
        state.formState = 'finishing';
        break;
        
      case 'finishing':
        console.log('done');
        break;
    }
  
    this.setState(state);
  };
  
  setFormState = ( to ) => {
    this.setState({ formState: to });
  };
  
  getDegreesSorted = ( ) => {
    return Object.values(this.props.degrees.filter(c => c.title !== 'Undergraduate Degrees'))
      .sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  };
  
  getDegreeByName = ( name ) => {
    return this.props.degrees.filter(d => d.title === name)[0].categories;
  };
  
  startsWithCourse = ( text ) => /^\w{4} [0-9]{1,3}[ABCDEFG]?L?/.test(text);
  
}

export default withTracker(props => {
  const handle = Meteor.subscribe('degrees.public');
  
  return {
    degreesLoading: !handle.ready(),
    degrees: Degrees.find({}).fetch(),
  };
})(Home);
