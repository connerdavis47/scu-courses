import { withTracker } from 'meteor/react-meteor-data'
import React, { Component, } from 'react'
import { Button, Col, Form, Label, Input, Row, } from 'reactstrap'

import Degrees from 'imports/api/degrees/Degrees'
import Subheader from 'imports/ui/component/Subheader'
import CourseBadge from 'imports/ui/component/CourseBadge';

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
        <Subheader content="Tell us a little about yourself." />
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
            <Col sm="7"
                 className="ml-4">
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
    const active = this.state.formState === formState
      ? 'degree-form-progress-active' : '';
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
      <div className="d-flex pt-4">
        <Button outline
                color="success"
                onClick={ this.nextFormState }>
          { 'finishing'.startsWith(this.state.formState)
            ? 'Get schedules' : 'Save and continue' }
          <i className="fas fa-arrow-right pl-2"> </i>
        </Button>
      </div>
    )
  };
  
  renderFormDegree = ( ) => {
    return (
      <div>
        <h4 className="font-weight-bolder mb-4">
          Degree program
        </h4>
        <Label for="title">Degree program</Label>
        <Input type="select"
               name="title"
               id="inputTitle"
               onChange={ this.handleInput }
               defaultValue={ this.state.form.degree.title }>
          { this.sortedDegrees().map((degree, i) =>
              <option key={ i }
                      name={ degree.title }>
                { degree.title }
              </option>
          ) }
        </Input>
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
        <p>Select the University Core classes you've already taken.</p>
        <div>
          { this.props.degrees.filter(d => d.title === 'Undergraduate Degrees')[0].categories.map((each, i) =>
            <div key={ i }
                 className="mb-4">
              <p key={ i }
                 className="degree-form-category font-weight-bold mb-2">
                { each.name }
                <span className="ml-3"> </span>
              </p>
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
        <p>Select the classes you've already taken.</p>
        <div>
          { console.log(this.state.form.degree.title) }
          { this.props.degrees.filter(d => d.title === this.state.form.degree.title)[0].categories.map((each, i) =>
            <div className="mb-4">
              <p key={ i }
                 className="degree-form-category font-weight-bold mb-2">
                { each.name }
                <span className="ml-3"> </span>
              </p>
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
      if (Array.isArray(item)) {
        item = item.toString().replace(/[,]+/g, ' -or- ');
      } else if (Object.prototype.toString.call(item) === '[object Object]') {
        const isOption = item.hasOwnProperty('option');
  
        return (
          <div key={ i }>
            { isOption &&
              <p className={ `mb-1 text-dark w-100 ${i === 0 ? '' : 'mt-3'}` }>
                { item.option }
              </p>
            }
            <div>
              { Object.values(item.reqs).map((req, i) => {
                if (req.indexOf('<') > -1 && req.indexOf('>') > -1) {
                  req = req.replace(/<\/?p>/g, '');
  
                  return (
                    <div key={ i }
                         dangerouslySetInnerHTML={{ __html: req }}>
                    </div>
                  )
                }
      
                if (req.toString().indexOf(',') > -1)
                  req = req.toString().replace(/[,]+/g, ' or ');
      
                return (
                  <CourseBadge key={ `${i}badge` }
                               name={ req } />
                )
              }) }
            </div>
          </div>
        )
      }
      
      if (item.indexOf('<p>') > -1)
        item = item.replace(/<\/?p>/g, '');
      
      if (item.indexOf('<li>') > -1) {
        return (
          <div key={ i }
               dangerouslySetInnerHTML={{ __html: item }}>
          </div>
        )
      }
      
      return (
        <CourseBadge name={ item } />
      )
    })
  };
  
  handleInput = ( e ) => {
    let name = e.target.name;
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
          state.form.degree.title = this.sortedDegrees()[0].title;
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
  
  sortedDegrees = ( ) => {
    return Object.values(this.props.degrees.filter(c => c.title !== 'Undergraduate Degrees'))
      .sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  };
  
}

export default withTracker(props => {
  const handle = Meteor.subscribe('degrees.public');
  
  return {
    degreesLoading: !handle.ready(),
    degrees: Degrees.find({}).fetch(),
  };
})(Home);
