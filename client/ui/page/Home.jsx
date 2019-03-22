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

/**
 * Landing page, which prompts users for basic degree information before
 * attempting to generate schedules.
 */
class Home extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      
      /**
       * Whether a degree has been chosen from the dropdown, `#inputDegree`.
       */
      degreeSelected: false,
      
    };
  }
  
  render() {
    return (
      <section id="home-form" className="home-form">
        <h2 className="mb-4">Tell us a little about yourself.</h2>
        <Form className="border p-4">
          <FormGroup>
            <Label for="inputDegree">Degree Program</Label>
            <Input type="select" name="degree" id="inputDegree"
                   onChange={ this.toggleDegreeSelected }>
              { Object.values(Degrees).map((degree, i) =>
                <option key={ i } name={ degree }>{ degree }</option>
              )}
            </Input>
          </FormGroup>
          { this.state.degreeSelected &&
            <FormGroup>
              <Label>Select classes you've already taken.</Label>
              <div className="home-form-courses d-flex flex-wrap">
                { Object.values(UGRAD_COEN).map((course, i) =>
                  <Badge key={ i } color="light" className="m-1 p-2 border"
                         onClick={ this.toggleOneCourse }>
                    { ` ${course}` }
                  </Badge>
                )}
              </div>
            </FormGroup>
          }
          { this.state.degreeSelected &&
            <div>
              <hr />
              <Button outline color="success">Suggest Schedules</Button>
            </div>
          }
        </Form>
      </section>
    )
  }
  
  /**
   * @public
   * Once the user has selected their degree, update state so the next stage of
   * the form will roll out.
   */
  toggleDegreeSelected = () => this.setState({ degreeSelected: true, });
  
  /**
   * @public
   * Toggles the active state of a course badge in this form. Badges colored
   * brand primary are considered active, light gray inactive.
   *
   * @param e The badge to toggle to gray or brand primary.
   */
  toggleOneCourse( e ) {
    const options = [ 'badge-primary', 'badge-light' ];
    options.forEach(color => e.target.classList.toggle(color));
  }
  
}
export default hot(module)(Home)
