import update from 'immutability-helper'
import { withTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { Button, Col, Form, Label, Input, Row, } from 'reactstrap'
import shortid from 'shortid'

import Degrees from 'imports/api/degrees/Degrees'
import Header from 'imports/ui/component/Header'
import WarningBox from 'imports/ui/component/WarningBox'
import CourseBadge from 'imports/ui/component/CourseBadge'

/**
 * Determines whether some text begins with a valid course at SCU.
 *
 * @param text - The text to scan
 * @returns {boolean} - If the text matches the SCU course regular expression
 *  with restriction `/^` to indicate it must *start* with a course, but will
 *  also permit "OR" course options.
 * @public
 */
function startsWithCourse( text )
{
  return /^\w{4} [0-9]{1,3}[ABCDEFG]?L?/.test(text);
}

class DegreeProgressForm extends React.Component
{
  
  degreeByTitle( name )
  {
    return this.props.degrees.filter(d => d.title === name)[0].categories;
  }
  
  degreesSorted( )
  {
    return Object
      .values(this.props.degrees.filter(d => d.title !== 'Undergraduate Degrees'))
      .sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  }
  
  constructor( props )
  {
    super(props);
  
    this.state = {
    
      /**
       * The formInputs section that is currently in focus.
       */
      form: 'degree',
      
      selected: {
        
        core: [],
        
        major: [],
        
      },
    
      /**
       * The controlled formInputs state of all input fields found in each of the
       * corresponding formInputs sections.
       */
      formInputs: {
      
        /**
         * Degree program
         */
        degree: {},
      
        /**
         * Core Curriculum requirements
         */
        core: {},
      
        /**
         * Major degree requirements
         */
        major: {},
      
        /**
         * Finishing touches to further refine search results
         */
        finishing: {},
      
      },
    
    };
    
    this.handleInput = this.handleInput.bind(this);
    this.handleFormStateChange = this.handleFormStateChange.bind(this);
    this.handleToggleCourse = this.handleToggleCourse.bind(this);
  }
  
  handleInput( e )
  {
    const name = e.target.name;
    let value;
    
    switch (e.target.type)
    {
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
    const state = update(this.state, {
      formInputs: {
        [this.state.form]: {
          [name]: { $set: value },
        },
      },
    });
    this.setState(state);
  }
  
  handleFormStateChange( to = this.state.form )
  {
    let newState;
    
    switch (to)
    {
      case 'degree':
        
        break;
      
      case 'core':
        let title = this.state.formInputs.degree.title;
        if (typeof title === 'undefined')
          title = this.degreesSorted()[0].title;
  
        newState = update(this.state, {
          form: { $set: 'core' },
          formInputs: {
            core: { $set: this.degreeByTitle('Undergraduate Degrees') },
            major: { $set: this.degreeByTitle(title) },
          },
        });
        break;
      
      case 'major':
        newState = update(this.state, {
          form: { $set: 'major' },
        });
        break;
      
      case 'finishing':
        newState = update(this.state, {
          form: { $set: 'finishing' },
        });
        break;
    }
    
    this.setState(newState);
  }
  
  handleToggleCourse( e )
  {
    const text = e.target.textContent;
    const options = [ 'badge-primary', 'badge-light' ];
    options.forEach(color => e.target.classList.toggle(color));
  
    const state = update(this.state, {
      selected: {
        [this.state.form]: { $push: [ text ] },
      },
    });
    this.setState(state);
  }
  
  /**
   * Search for a degree program by its official title, e.g., Mechanical
   * Engineering.
   *
   * @param name
   * @returns {Array[Object]} - A valid set of course requirements, which are a
   *  collection of objects as well as normal array entries.
   * @public
   */
  getDegreeByName( name )
  {
    return this.props.degrees.filter(d => d.title === name)[0].categories;
  }
  
  renderDegreeCategories( degreeTitle )
  {
    return this.getDegreeByName(degreeTitle).map((each, i) =>
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
    )
  }
  
  renderRequirements( category )
  {
    return Object.values(category.reqs).map(item => {
      // deal with objects, e.g., { reqs: [], pre: '...' }
      if (Object.prototype.toString.call(item) === '[object Object]')
        return (
          <React.Fragment key={ shortid.generate() }>
            { item.hasOwnProperty('pre') && (
              <p className="my-2 font-weight-bold text-dark w-100">
                { item.pre }
              </p>
            ) }
            { Object.values(item.reqs).map(req => this.renderOneRequirement(req)) }
            { item.hasOwnProperty('post') && (
              <p className="mt-2 font-italic text-dark w-100">
                { item.post }
              </p>
            ) }
          </React.Fragment>
        );
      
      // deal with simple requirements that have no pre/post text
      return this.renderOneRequirement(item);
    })
  }
  
  renderOneRequirement( req )
  {
    // convert arrays (options between several courses) into string with " or "
    // e.g. [ "MATH 53", "AMTH 116" ] --> "MATH 53 or AMTH 116"
    if (Array.isArray(req))
      req = req.toString().replace(/[,]+/g, ' or ');
    
    // draw requirements with HTML content as HTML
    // e.g. "<ul><li>Some list item</li><li>And another</li></ul>" --> same
    if (req.includes('<') && req.includes('>'))
      return (
        <div
          className="mt-3 text-muted"
          dangerouslySetInnerHTML={{ __html: req }}
          key={ shortid.generate() }
        />
      );
    
    // draw requirements that were not parsed as un-clickable text lines
    if (!startsWithCourse(req))
      return (
        <span
          className="badge-fill mb-2 pb-2 border-bottom text-muted"
          key={ shortid.generate() }
        >
          { req }
        </span>
      );
    
    // finally, draw the course (or list of courses) as clickable CourseBadge
    const toggled = this.state.selected[this.state.form].includes(req);
    console.log(req);
    return (
      <CourseBadge
        name={ req }
        color={ toggled ? 'primary' : 'light' }
        onClick={ this.handleToggleCourse }
        key={ shortid.generate() }
      />
    )
  }
  
  /**
   * The green button found on each formInputs that lets you advance to the next formInputs.
   * @public
   */
  renderBtnContinue( )
  {
    return (
      <Button outline color="success" onClick={ this.handleFormStateChange }>
        { this.state.form.startsWith('finishing') ? 'Get schedules' : 'Continue' }
        <i className="fas fa-arrow-right pl-2" />
      </Button>
    )
  }
  
  /**
   * The progress buttons that click into each section of the formInputs. They have
   * slightly complex state in that we know when the section is currently open as
   * well as when the section has been completed, and display both visually.
   *
   * @param form - The formInputs where this button is found
   * @param title - The text displayed for this button
   * @public
   */
  renderBtnProgress( form, title )
  {
    const active = this.state.form === form ? 'degree-formInputs-progress-active' : '';
    const completed = typeof form !== 'undefined' && Object.values(this.state.formInputs[form]).length > 0;
    
    return (
      <li
        className={ `${active} border-bottom border-secondary p-4` }
        onClick={ () => this.handleFormStateChange(form) }
      >
        { title }
        <i className={ `fas fa-check-circle text-success text-${completed ? 'success' : 'light'}` } />
      </li>
    )
  }
  
  /**
   * The degree formInputs is the first page opened
   * @returns {*}
   */
  renderFormDegree( )
  {
    return (
      <div>
        <h4 className="font-weight-bolder mb-4">
          Degree program
        </h4>
        <p>
          <Label for="title">Degree program</Label>
          <Input
            key={ shortid.generate() }
            type="select"
            name="title"
            onChange={ this.handleInput }
            defaultValue={ this.state.formInputs['degree']['title'] }
          >
            { this.degreesSorted().map(degree =>
              <option key={ shortid.generate() } name={ degree.title }>
                { degree.title }
              </option>
            ) }
          </Input>
        </p>
        { this.renderBtnContinue() }
      </div>
    )
  }
  
  renderFormCore( )
  {
    return (
      <div>
        <h4 className="font-weight-bolder mb-4">
          Core requirements
        </h4>
        <WarningBox />
        <p>
          Select the University Core classes you've already taken.
        </p>
        { this.renderDegreeCategories('Undergraduate Degrees') }
        { this.renderBtnContinue() }
      </div>
    )
  }
  
  renderFormMajor( )
  {
    return (
      <div>
        <h4 className="font-weight-bolder mb-4">
          Major requirements
        </h4>
        <WarningBox />
        <p>
          Select the classes you've already taken in your major.
        </p>
        { this.renderDegreeCategories(this.state.formInputs['degree']['title']) }
        { this.renderBtnContinue() }
      </div>
    )
  }
  
  renderFormFinishing( )
  {
    return (
      <div>
        <h4 className="font-weight-bolder mb-4">
          Finishing touches
        </h4>
        <p>See if you would like to try any of these extra restrictions.</p>
        <div>
          ...
        </div>
        { this.renderBtnContinue() }
      </div>
    )
  }
  
  render( )
  {
    console.log(this.state);
    return (
      <section id="degree-form" className="degree-form">
        <Header content="Tell us a little about yourself." />
        <div className="container">
          <Row>
            <Col sm="4">
              <h5 className="mb-0 pb-3 border-primary border-bottom border-bottom-thicker">
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
                  switch (this.state.form)
                  {
                    case 'degree':    return this.renderFormDegree();
                    case 'core':      return this.renderFormCore();
                    case 'major':     return this.renderFormMajor();
                    case 'finishing': return this.renderFormFinishing();
                  }
                })() }
              </Form>
            </Col>
          </Row>
        </div>
      </section>
    )
  }
  
}

export default withTracker(props => {
  const handle = Meteor.subscribe('degrees.public');
  
  return {
    degreesLoading: !handle.ready(),
    degrees: Object
      .values(Degrees.find({}).fetch())
      .sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)),
  };
})(DegreeProgressForm);
