import { Mongo } from 'meteor/mongo'

export interface Degree {

  _id?: string;
  name: string;
  categories: DegreeCategory [];

}

export interface DegreeCategory {

  _id?: string;
  name: string;
  courses: (string | string []) [];
  pre?: string;
  post?: string;

}

export const Placeholder: Degree = {
  name: 'Computer Science & Engineering',
  categories: [
    {
      name: 'English',
      courses: [ 'ENGL 181' ]
    },
    {
      name: 'Mathematics and Natural Science',
      courses: [
        'MATH 11',
        'MATH 12',
        'MATH 13',
        'MATH 14',
        [
          'AMTH 106',
          'MATH 22'
        ],
        'AMTH 108',
        [
          'MATH 53',
          'CSCI 166',
          'AMTH 118'
        ],
        'CHEM 11',
        'PHYS 31',
        'PHYS 32',
        'PHYS 33'
      ],
      'post': '*Pre-approved replacements for CHEM 11: AP Biology score of 4 or 5, AP Environmental Science score of 4 or 5, BIOL 18, CHEM 1, ENVS 21, and PHYS 34; pre-approved substitutions for AMTH 106: CHEM 12, BIOL 21, MATH 101--178, or any CHEM 11 replacement if not used to replace CHEM 11.'
    },
    {
      name: 'Engineering',
      courses: [
        'ENGR 1',
        'ELEN 50',
        'ELEN 153',
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
        [
          'COEN 194',
          'ENGR 194'
        ],
        [
          'COEN 195',
          'ENGR 195'
        ],
        [
          'COEN 196',
          'ENGR 196'
        ]
      ]
    },
    {
      name: 'Computer Science and Engineering Electives',
      courses: [
        'Three upper-division courses totaling at least 12 units selected from COEN 101--180, ELEN 115, 133, and 134 in an emphasis area selected in consultation with an academic advisor'
      ],
      'post': 'Note: 6 units of COEN 193 or 4 units of COEN 199 may be used as one elective. At most one upper-division MATH or CSCI course may be used as an elective with advisor approval.'
    },
    {
      name: 'Educational Enrichment Electives',
      courses: [
        '8 or more units in a study abroad program that does not duplicate other coursework',
        'Cooperative education experience with enrollment in COEN 188 and 189',
        'Admission to one of the department\'s master\'s degree programs and completion of at least the first 12 units of that program prior to completion of the undergraduate degree',
        'Undergraduate research with completion of 6 or more units of COEN 193 cannot also be used to satisfy a COEN elective',
        '12 or more units selected in consultation with an academic advisor. The courses may not also be used to satisfy Undergraduate Core Curriculum requirements, but a minor or second major may be used to complete this option.'
      ],
      'pre': 'An educational enrichment experience selected from one of the following options:'
    }
  ]
};

export const Degrees = new Mongo.Collection<Degree>('links');
