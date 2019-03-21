import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import {
  Badge,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'

const Degrees = [
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
  'Elective 1 in (COEN 101-180, ELEN 115, 133, 134)',
  'Elective 2 in (COEN 101-180, ELEN 115, 133, 134)',
  'Elective 3 in (COEN 101-180, ELEN 115, 133, 134)',
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
  '1 in (MATH 53, CSCI 166, AMTH 118)',
  'Educational Enrichment',
];

/**
 * Landing page, which prompts users for basic degree information before
 * attempting to generate schedules.
 */
class Home extends Component {
  
  render() {
    return (
      <section id="home-form" className="home-form">
        <h1 className="mb-4">Tell us a little about yourself.</h1>
        <Form className="border p-3">
          <FormGroup>
            <Label for="inputEmail">Email</Label>
            <Input type="email" name="email" id="inputEmail" />
          </FormGroup>
          <FormGroup>
            <Label for="inputDegree">Degree Program</Label>
            <Input type="select" name="degree" id="inputDegree">
              { Object.values(Degrees).map((degree, i) =>
                <option key={ i } name={ degree }>{ degree }</option>
              )}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Tap all the classes you've already taken.</Label>
            <div className="d-flex flex-wrap">
              { Object.values(UGRAD_COEN).map((course, i) =>
                <Badge key={ i } color="secondary" className="m-1">
                  { ` ${course}` }
                </Badge>
              )}
            </div>
          </FormGroup>
        </Form>
      </section>
    )
  }
  
}
export default hot(module)(Home)
