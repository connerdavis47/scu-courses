import { withTracker } from 'meteor/react-meteor-data'
import React, { Component, } from 'react'
import { Badge, Button, Col, Form, Label, Input, Row, } from 'reactstrap'

import Degrees from 'imports/api/degrees/Degrees'

/**
 * Landing page, which prompts users for basic degree information the server
 * will use to generate schedule suggestions.
 */
class Home extends Component {
  
  constructor( props ) {
    super(props);
    
    this.state = {
  
      formState: 'degree',
      
      degreeForm: {
        degree: {
        
        },
        core: {
        
        },
        major: {
        
        },
        extra: {
        
        },
      },
  
    };
  }
  
  render( ) {
    console.log(this.state);
    return (
      <section id="degree-form"
               className="degree-form">
        <div className="container-fluid mb-5 bg-primary-less">
          <div className="container py-5">
            <h2 className="font-weight-bold text-white">
              Tell us a little about yourself.
            </h2>
          </div>
        </div>
        <div className="container mb-5">
          <Row>
            <Col sm="4">
              <h5 className="mb-0 pb-3 border-bottom border-bottom-thicker border-primary">
                My progress
              </h5>
              <ol className="degree-form-progress-list list-unstyled">
                { this.renderFormNavItem('degree', 'Degree program') }
                { this.renderFormNavItem('core', 'Core requirements') }
                { this.renderFormNavItem('major', 'Major requirements') }
                { this.renderFormNavItem('extra', 'Finishing touches') }
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
            
                    case 'extra':
                      return this.renderFormExtra();
                  }
                })() }
              </Form>
            </Col>
          </Row>
        </div>
      </section>
    )
  }
  
  renderFormNavItem = ( formState, title ) => {
    const active = this.state.formState === formState
      ? 'degree-form-progress-active' : '';
    const completed =
      Object.entries(this.state.degreeForm[formState]).length === 0
        ? 'text-light' : 'text-success';
    
    return (
      <li className={ `${active} border-bottom border-secondary p-4` }
          onClick={ () => this.forceFormState(formState) }>
        { title }
        <i className={ `fas fa-check-circle text-success ${completed}` }> </i>
      </li>
    )
  };
  
  renderFormNext = ( ) => {
    return (
      <div className="d-flex pt-4">
        <Button outline
                color="success"
                onClick={ this.updateFormState }>
          { this.state.formState === 'extra' ?
            'Get schedules' : 'Save and continue' }
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
        <Label for="inputDegree">Degree program</Label>
        <Input type="select"
               name="degree"
               id="inputDegree"
               onChange={ this.updateFormState }
               defaultValue={ this.state.degreeForm.degree.title }>
          { Object.values(this.props.degrees).map((degree, i) =>
            <option
              key={ i }
              name={ degree.title }>
              { degree.title }
            </option>
          ) }
        </Input>
        { this.renderFormNext() }
      </div>
    );
  };
  
  renderFormCore = ( ) => {
    return (
      <div>
        <Label>Select University Core you've completed.</Label>
        <div className="d-flex flex-wrap">
        </div>
        { this.renderFormNext() }
      </div>
    );
  };
  
  renderFormMajor = ( ) => {
    let categories = this.props.degrees[0].categories;
    for (let degree of this.props.degrees)
      if (degree.title === this.state.degreeForm.degree.title)
        categories = degree.categories;
    
    return (
      <div>
        <h4 className="font-weight-bolder mb-4">
          Major requirements
        </h4>
        <p>Select the classes you've already taken.</p>
        <div>
          { categories.map((each, i) =>
            <div className="mb-3">
              <p
                className="font-weight-bold mb-2"
                key={ i }>
                { each.name }
              </p>
              <div className="degree-form d-flex flex-wrap">
                { this.renderRequirements(each) }
              </div>
            </div>
          ) }
        </div>
        { this.renderFormNext() }
      </div>
    );
  };
  
  renderFormExtra = ( ) => {
    return (
      <div>
        <Label>Mess with some of these other cool filters.</Label>
        
        { this.renderFormNext() }
      </div>
    );
  };
  
  renderRequirements = ( category ) => {
    return Object.values(category.reqs).map((item, i) => {
      if (Array.isArray(item)) {
        if (item.toString().indexOf(',') > -1)
          item = item.toString().replace(/[,]+/g, ' or ');
        
        return (
          <div key={ i }>
            <div className="small font-weight-bold">
              { item.option }
            </div>
            <Badge
              color="light"
              className="m-1 p-2 border-bottom"
              onClick={ this.toggleOneCourse }>
              { item }
            </Badge>
          </div>
        )
      } else if (Object.prototype.toString.call(item) === '[object Object]') {
        const isOption = item.hasOwnProperty('option');
        
        return (
          <div
            key={ i }
            className="mx-3">
            { isOption &&
              <p className={
                `mb-0 font-weight-bold text-dark w-100 ${i === 0 ? '' : 'mt-3'}`
                }>
                { item.option }
              </p>
            }
            { Object.values(item.reqs).map((req, i) => {
              if (req.toString().startsWith('<p>')) {
                return (
                  <div
                    key={ i }
                    dangerouslySetInnerHTML={{ __html: req }}>
                  </div>
                );
              } else {
                if (req.toString().indexOf(',') > -1)
                  req = req.toString().replace(/[,]+/g, ' or ');
  
                return (
                  <Badge
                    key={ i }
                    color="light"
                    className="m-1 p-2 border-bottom"
                    onClick={this.toggleOneCourse}>
                    {req}
                  </Badge>
                );
              }
            }) }
          </div>
        )
      } else {
        if (item.indexOf('<li>') > -1) {
          return (
            <div
              key={ i }
              dangerouslySetInnerHTML={{ __html: item }}>
            </div>
          );
        }
        
        if (item.indexOf('<p>') > -1)
          item = item.replace(/<\/?p>/g, '');
        
        return (
          <Badge
            key={ i }
            color="light"
            className="m-1 p-2 border-bottom"
            onClick={ this.toggleOneCourse }>
            { item }
          </Badge>
        )
      }
    })
  };
  
  toggleOneCourse = ( e ) => {
    const options = [ 'badge-primary', 'badge-light' ];
    options.forEach(color => e.target.classList.toggle(color));
  };
  
  forceFormState = ( to ) => {
    this.setState({
      formState: to,
    })
  };
  
  updateFormState = ( e ) => {
    let state = {
      formState: this.state.formState,
      degreeForm: this.state.degreeForm,
    };
    
    switch (this.state.formState) {
      case 'degree':
        state.formState = 'core';
        state.degreeForm.degree = {
          title: e.target.value,
        };
        break;
      
      case 'core':
        state.formState = 'major';
        break;
        
      case 'major':
        state.formState = 'extra';
        break;
        
      case 'extra':
        console.log('done');
        break;
    }
    
    this.setState(state);
  };
  
}

export default withTracker(props => {
  const handle = Meteor.subscribe('degrees.public');
  
  return {
    degreesLoading: !handle.ready(),
    degrees: Degrees.find({}).fetch(),
  };
})(Home);
