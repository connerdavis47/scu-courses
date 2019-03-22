import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import {
  Alert,
  Badge,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'

const Degrees = [
  'Select your Degree',
  'Applied Mathematics',
  'Bioengineering',
  'Civil Engineering',
  'Computer Engineering',
  'Electrical Engineering',
  'General Engineering',
  'Mechanical Engineering',
];

const UGRAD_CORE = [
  'Critical Thinking & Writing 1',
  'Critical Thinking & Writing 2',
  'Second Language',
  'Religion, Theology & Culture 1',
  'Religion, Theology & Culture 2',
  'Religion, Theology & Culture 3',
  'Ethics',
  'Civic Engagement',
  'Diversity: U.S. Perspectives',
  'Arts',
  'Natural Science',
  'Social Science',
  'Science, Technology & Society',
];

const UGRAD_COEN = [
  'ENGR 1',
  'COEN 10',
  'COEN 11',
  'COEN 12',
  'COEN 19',
  'COEN 20',
  'COEN 21',
  'COEN 79',
  'COEN 122',
  'COEN 146',
  'COEN 171',
  'COEN 174',
  'COEN 175',
  'COEN 177',
  'COEN 179',
  'COEN 194',
  'COEN 195',
  'COEN 196',
  'Elective (Upper-Div)',
  'Elective (Upper-Div)',
  'Elective (Upper-Div)',
  'ELEN 50',
  'ELEN 153',
  'ENGL 181',
  'MATH 11',
  'MATH 12',
  'MATH 13',
  'MATH 14',
  'PHYS 31',
  'PHYS 32',
  'PHYS 33',
  'CHEM 11',
  'AMTH 106 / MATH 22',
  'AMTH 108',
  'MATH 53 / CSCI 166 / AMTH 118',
  'Educational Enrichment',
];

const FormState = Object.freeze({
  
  /**
   * The user is currently entering their degree program.
   */
  DEGREE: 'degree',
  
  /**
   * The user is currently selecting University Core courses they have already
   * satisfied.
   */
  CORE: 'core',
  
  /**
   * The user is currently selecting completed classes within their major.
   */
  MAJOR: 'major',
  
  /**
   * The user is possibly choosing extra filters, such as the desired earliest
   * class time or chunks of time when they cannot take classes.
   */
  EXTRA: 'extra',
  
});

/**
 * Landing page, which prompts users for basic degree information before
 * attempting to generate schedules.
 */
class Home extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
  
      /**
       * The current active form state, which controls what should be displayed
       * within the form. We use this primarily because the whole form is
       * arguably information overload and rightly should be split into chunks.
       */
      formState: FormState.DEGREE,
  
    };
  }
  
  render() {
    return (
      <section id="home-degree-form" className="home-degree-form">
        <h2 className="mb-4">Tell us a little about yourself.</h2>
        <Form className="border p-4">
          { (() => {
            /*
              Display only one form group at a time to help user deal with
              information overload.
             */
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
          { /* display submit once on the last stage */
            this.state.formState === FormState.EXTRA &&
            <div>
              <hr />
              <Button outline color="success">Suggest Schedules</Button>
            </div>
          }
        </Form>
      </section>
    )
  }
  
  renderFormNav() {
    return (
      <div className="d-flex justify-content-between mt-4">
        <Button outline color="danger"
                onClick={ () => { this.updateFormState(false) } }>
          <i className="fas fa-arrow-left pr-2"></i> Go back
        </Button>
        <Button outline color="success"
                onClick={ () => { this.updateFormState(true) } }>
          Next <i className="fas fa-arrow-right pl-2"></i>
        </Button>
      </div>
    )
  }
  
  renderFormDegree() {
    return (
      <FormGroup>
        <Label for="inputDegree">Degree Program</Label>
        <Input type="select" name="degree" id="inputDegree"
               onChange={ () => { this.updateFormState(true) } }>
          { Object.values(Degrees).map((degree, i) =>
            <option key={ i } name={ degree }>{ degree }</option>
          )}
        </Input>
      </FormGroup>
    );
  }
  
  renderFormCore() {
    return (
      <FormGroup>
        <Label>Select University Core you've completed.</Label>
        <div className="d-flex flex-wrap">
          { Object.values(UGRAD_CORE).map((course, i) =>
            <Badge key={ `C${i}` } color="light" className="m-1 p-2 border"
                   onClick={ this.toggleOneCourse }>
              { ` ${course}` }
            </Badge>
          )}
        </div>
        { this.renderFormNav() }
      </FormGroup>
    );
  }
  
  renderFormMajor() {
    return (
      <FormGroup>
        <Label>And pick the degree courses you've already finished.</Label>
        <div className="home-form-courses d-flex flex-wrap">
          { Object.values(UGRAD_COEN).map((course, i) =>
            <Badge key={ `M${i}` } color="light" className="m-1 p-2 border"
                   onClick={ this.toggleOneCourse }>
              { ` ${course}` }
            </Badge>
          )}
        </div>
        { this.renderFormNav() }
      </FormGroup>
    );
  }
  
  renderFormExtra() {
    return (
      <FormGroup>
        <Label>Finally, choose any convenience filters you'd also like to include.</Label>
      </FormGroup>
    );
  }
  
  /**
   * @public
   * Toggles the active state of a course badge in this form. Badges colored
   * brand primary are considered active, light gray inactive.
   *
   * @param e The badge to toggle to gray or brand primary.
   */
  toggleOneCourse = ( e ) => {
    const options = [ 'badge-primary', 'badge-light' ];
    options.forEach(color => e.target.classList.toggle(color));
  };
  
  updateFormState = ( next ) => {
    let to;
    
    switch (this.state.formState) {
      case 'degree':
        to = next ? FormState.CORE : FormState.DEGREE;
        break;
      
      case 'core':
        to = next ? FormState.MAJOR : FormState.DEGREE;
        break;
        
      case 'major':
        to = next ? FormState.EXTRA : FormState.CORE;
        break;
        
      case 'extra':
        to = next ? FormState.EXTRA : FormState.MAJOR;
        break;
    }
    
    this.setState({ formState: to, });
  };
  
}
export default hot(module)(Home)
