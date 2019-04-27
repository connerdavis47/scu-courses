import { updatedDiff } from 'deep-object-diff'

const ExpectedOutputs = [
  {
    title: 'Undergraduate Degrees',
    categories: [
      {
        name: 'Critical Thinking & Writing',
        reqs: [
          'One two-course sequence in composition: CTW 1 and 2',
        ],
      },
      {
        name: 'Advanced Writing',
        reqs: [
          'ENGL 181',
        ],
      },
      {
        name: 'Religion, Theology & Culture 1, 2, and 3',
        reqs: [
          'Three courses approved to satisfy the core requirements',
        ],
      },
      {
        name: 'Cultures & Ideas 1 and 2',
        reqs: [
          'One course sequence from the approved list of Cultures &amp; Ideas course sequences',
        ],
      },
      {
        name: 'Cultures & Ideas 3',
        reqs: [
          'One course from the approved list',
        ],
      },
      {
        name: 'Mathematics and Natural Science',
        reqs: [
          'Course requirements are specified in the respective major requirements',
        ],
      },
      {
        name: 'Second Language',
        reqs: [
          'Recommended proficiency in one foreign language; requirement is satisfied by two years of high school study in a foreign language',
        ],
      },
      {
        name: 'Social Science',
        reqs: [
          'One course from the approved list',
        ],
      },
      {
        name: 'Civic Engagement',
        reqs: [
          {
            reqs: [
              'One course from the approved list',
              'A combination of ENGR 1 and a senior design project',
            ],
            pre: 'The civic engagement requirement may be met by one of two options:',
          },
        ],
      },
      {
        name: 'Ethics',
        reqs: [
          'One course in general or applied ethics from the approved list',
        ],
      },
      {
        name: 'Diversity',
        reqs: [
          'One course from the approved list',
        ],
      },
      {
        name: 'Arts',
        reqs: [
          {
            reqs: [
              'One course from the approved list',
              'A combination of ENGL 181 and a senior design project',
            ],
            pre: 'The arts requirement may be met by one of two options:',
          }
        ],
      },
      {
        name: 'Science, Technology & Society',
        reqs: [
          {
            reqs: [
              'One course from the approved list',
              'A combination of ENGL 181 and a senior design project',
            ],
            pre: 'The Science, Technology & Society requirement may be met by one of two options:',
          },
        ],
      },
      {
        name: 'Experiential Learning for Social Justice',
        reqs: [
          'One course or activity approved to satisfy experiential learning',
        ],
      },
      {
        name: 'Pathways',
        reqs: [
          'Three courses with a common theme approved for a declared Pathway; materials submitted from two of these courses and a Pathway Essay following the requirements specified in the Core Curriculum.',
        ],
      },
    ],
  },
  {
    title: 'Bioengineering',
    categories: [
      {
        name: 'English',
        reqs: [
          'ENGL 181',
        ],
      },
      {
        name: 'Bioethics',
        reqs: [
          [
            'BIOE 180',
            'BIOL 171',
            'ENGR 19',
            'PHIL 7',
            'PHIL 117',
            'TESP 157',
          ],
        ],
      },
      {
        name: 'Natural Science',
        reqs: [
          {
            reqs: [
              'BIOL 1A',
              'BIOL 1B',
              'BIOE 22',
              'CHEM 11',
              'CHEM 12',
              'CHEM 13',
              'CHEM 31',
              'CHEM 32',
              'PHYS 31',
              'PHYS 32',
              'PHYS 33',
            ],
            pre: 'Biomolecular track:',
          },
          {
            reqs: [
              'BIOE 21',
              'BIOE 22',
              'CHEM 11',
              'CHEM 12',
              'CHEM 13',
              'CHEM 31',
              'PHYS 31',
              'PHYS 32',
              'PHYS 33',
            ],
            pre: 'Medical-device track:',
          },
          {
            reqs: [
              'BIOL 1A',
              'BIOL 1B',
              'BIOL 1C',
              'CHEM 11',
              'CHEM 12',
              'CHEM 13',
              'CHEM 31',
              'CHEM 32',
              'CHEM 33',
              'PHYS 31',
              'PHYS 32',
              'PHYS 33',
            ],
            pre: 'Pre-med track:',
          },
        ],
      },
      {
        name: 'Mathematics',
        reqs: [
          'MATH 11',
          'MATH 12',
          'MATH 13',
          'MATH 14',
          'AMTH 106',
          [
            'BIOE 120',
            'AMTH 108',
          ],
        ],
      },
      {
        name: 'Engineering',
        reqs: [
          'ENGR 1',
          'ELEN 50',
          [
            'COEN 45',
            'COEN 44',
          ],
          'BIOE 10',
          {
            reqs: [
              [
                'ELEN 21',
                'MECH 10',
              ],
              'BIOE 153',
              'BIOE 162',
              'BIOE 163',
              'BIOE 172',
              'BIOE 175',
              'BIOE 176',
            ],
            pre: 'Biomolecular track:',
          },
          {
            reqs: [
              'ELEN 21',
              'MECH 10',
              'BIOE 153',
              'BIOE 154',
              'BIOE 155',
              'BIOE 161',
              'BIOE 162',
              'BIOE 171',
              'BIOE 174',
            ],
            pre: 'Medical-device track:',
          },
          {
            reqs: [
              [
                'ELEN 21',
                'MECH 10',
              ],
              'BIOE 153',
              [
                'BIOE 154',
                'BIOE 155',
              ],
              'BIOE 162',
              [
                'BIOE 161',
                'BIOE 163',
              ],
              'BIOE 171',
              'BIOE 172',
            ],
            pre: 'Pre-med track:',
          },
        ],
      },
      {
        name: 'Senior Design Project',
        reqs: [
          'BIOE 194',
          'BIOE 195',
          'BIOE 196',
        ],
      },
      {
        name: 'Technical Elective (TE) Requirements',
        reqs: [
          {
            reqs: [
              'Of the required minimum of 16 TE units, at least 8 units must be upper-division BIOE courses.',
              'Recommended courses: BIOE 100^1^, 108, 115, 154, 155, 157, 161, 167, 168, 170, 171, 173, 174, 178, 179, 180, 185, 186, 188/189, 198, 199^2^; BIOL 110, 113, 114, 122, 172, 174, 178, 179; CHEM 33, 111, 141, 142, 150, 151; PHYS 171',
            ],
            pre: 'Biomolecular track 16 units minimum:',
          },
          {
            reqs: [
              'Of the required minimum of 15 TE units, at least 8 units must be upper-division BIOE courses.',
              'Recommended courses: BIOE 100^1^, 107, 108, 115, 157, 163, 167, 168, 170, 172, 173, 175, 176, 178, 179, 180, 185, 186, 188/189, 198, 199^2^; AMTH 118; COEN 140; CSCI 183, 184; ELEN 115, 116, 130, 156, 160; MECH 143 cross-listed as COEN 123 and ELEN 123, 151; PHYS 171',
            ],
            pre: 'Medical-device track 15 units minimum:',
          },
          {
            reqs: [
              'Of the required minimum of 10 TE units, at least 4 units must be upper-division BIOE courses.',
              'Recommended courses: BIOE 100^1^, 107, 108, 115, 154 or 155^3^, 157, 161 or 163^3^, 167, 168, 170, 173, 174, 175, 176, 178, 179, 180, 185, 186, 188/189, 198, 199^2^; BIOL 110, 113, 114, 122, 172, 174, 178, 179; CHEM 111, 141, 142, 150, 151; PHYS 171',
            ],
            pre: 'Pre-med track 10 units minimum:',
          },
          'Notes:<ol> <li>BIOE 100 can only be taken up to three times. </li> <li>Maximum of 6 units combined for co-ops, internships, and supervised independent research. Non-BIOE units will not be credited. </li> <li>The course not selected as a required course may count as a TE. </li> </ol>',
        ],
      },
    ]
  },
  {
    title: 'Civil, Environmental, and Sustainable Engineering',
    categories: [
      {
        name: 'English',
        reqs: [
          'ENGL 181',
        ],
      },
      {
        name: 'Mathematics and Natural Science',
        reqs: [
          'MATH 11',
          'MATH 12',
          'MATH 13',
          'MATH 14',
          [
            'AMTH 106',
            'MATH 22',
          ],
          [
            'AMTH 112',
            'AMTH 108',
          ],
          'CHEM 11',
          'PHYS 31',
          'PHYS 32',
          'PHYS 33',
          'CENG 20',
        ],
      },
      {
        name: 'Engineering',
        reqs: [
          'ENGR 1',
          [
            'ELEN 49',
            'ELEN 50',
          ],
          'CENG 7',
          'CENG 10',
          'CENG 15',
          'CENG 41',
          'CENG 44A',
          'CENG 44B',
          'CENG 115',
          'CENG 121A',
          'CENG 121B',
          'CENG 125',
          'CENG 128',
          'CENG 132',
          'CENG 140',
          'CENG 141',
          'CENG 143',
          'CENG 145',
          'CENG 148',
          'CENG 192A',
          'CENG 192B',
          'CENG 192C',
          'CENG 193',
          'CENG 194',
          [
            'CENG 160',
            'CENG 182',
          ],
        ],
      },
      {
        name: 'Electives',
        reqs: [
          {
            reqs: [
              'Four technical electives from those listed below, with at least two design-focused electives and at least one analysis-focused elective: <ul> <li>Design-focused electives: CENG 119, 133, 134, 135 &amp; 135L, 136, 137, 138, 142, 144 &amp; 144L, 146, 147, 150 </li> <li>Analysis-focused electives: CENG 118, 123 &amp; 123L, 124, 139, 149, 151, 160, 161, 162, 163, 182, 184, 186 &amp; 186L, 187 &amp; 187L </li> </ul>',
              'One free elective 4 units',
            ],
            post: 'The technical electives should be selected in consultation with an academic advisor to satisfy the requirements of the general civil, environmental, and sustainable engineering program or one of the approved emphasis area programs in civil engineering. The program requires that students take either CENG 160 or CENG 182; whichever course is not taken to satisfy this requirement may be taken as a technical elective.',
          },
        ],
      },
    ],
  },
  {
    title: 'Computer Science and Engineering',
    categories: [
      {
        name: 'English',
        reqs: [
          'ENGL 181',
        ]
      },
      {
        name: 'Mathematics and Natural Science',
        reqs: [
          {
            reqs: [
              'MATH 11',
              'MATH 12',
              'MATH 13',
              'MATH 14',
              [
                'AMTH 106',
                'MATH 22',
              ],
              'AMTH 108',
              [
                'MATH 53',
                'CSCI 166',
                'AMTH 118',
              ],
              'CHEM 11',
              'PHYS 31',
              'PHYS 32',
              'PHYS 33',
            ],
            post: '*Pre-approved replacements for CHEM 11: AP Biology score of 4 or 5, AP Environmental Science score of 4 or 5, BIOL 18, CHEM 1, ENVS 21, and PHYS 34; pre-approved substitutions for AMTH 106: CHEM 12, BIOL 21, MATH 101--178, or any CHEM 11 replacement if not used to replace CHEM 11.',
          },
        ],
      },
      {
        name: 'Engineering',
        reqs: [
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
            'ENGR 194',
          ],
          [
            'COEN 195',
            'ENGR 195',
          ],
          [
            'COEN 196',
            'ENGR 196',
          ],
        ],
      },
      {
        name: 'Computer Science and Engineering Electives',
        reqs: [
          {
            reqs: [
              'Three upper-division courses totaling at least 12 units selected from COEN 101--180, ELEN 115, 133, and 134 in an emphasis area selected in consultation with an academic advisor',
            ],
            post: 'Note: 6 units of COEN 193 or 4 units of COEN 199 may be used as one elective. At most one upper-division MATH or CSCI course may be used as an elective with advisor approval.',
          }
        ],
      },
      {
        name: 'Educational Enrichment Electives',
        reqs: [
          {
            reqs: [
              '8 or more units in a study abroad program that does not duplicate other coursework',
              'Cooperative education experience with enrollment in COEN 188 and 189',
              'Admission to one of the department\'s master\'s degree programs and completion of at least the first 12 units of that program prior to completion of the undergraduate degree',
              'Undergraduate research with completion of 6 or more units of COEN 193 cannot also be used to satisfy a COEN elective',
              '12 or more units selected in consultation with an academic advisor. The courses may not also be used to satisfy Undergraduate Core Curriculum requirements, but a minor or second major may be used to complete this option.',
            ],
            pre: 'An educational enrichment experience selected from one of the following options:',
          },
        ],
      },
    ],
  },
  {
    title: 'Electrical Engineering',
    categories: [
      {
        name: 'English',
        reqs: [
          'ENGL 181',
        ],
      },
      {
        name: 'Mathematics and Natural Science',
        reqs: [
          'MATH 11',
          'MATH 12',
          'MATH 13',
          'MATH 14',
          [
            'AMTH 106',
            'MATH 22',
          ],
          [
            'AMTH 108',
            'MATH 122',
          ],
          'CHEM 11',
          [
            'CHEM 12',
            'BIOL 21',
            'PHYS 113',
            'PHYS 121',
            'MATH 53',
            'MATH 105',
            'MATH 123',
          ],
          'PHYS 31',
          'PHYS 32',
          'PHYS 33',
          'PHYS 34',
        ],
      },
      {
        name: 'Engineering',
        reqs: [
          'ENGR 1',
          'CENG 41',
          [
            'COEN 44',
            'COEN 11',
          ],
          'COEN 12',
          'MECH 121',
          'ELEN 20',
          'ELEN 21',
          'ELEN 33',
          'ELEN 50',
          'ELEN 100',
          'ELEN 104',
          'ELEN 110',
          'ELEN 115',
          'ELEN 192',
          'ELEN 194',
          'ELEN 195',
          'ELEN 196',
        ],
      },
      {
        name: 'Technical Electives',
        reqs: [
          {
            reqs: [
              'IC Design: ELEN 116, 127, 151, 152, 153, 156',
              'Systems: ELEN 118, 123, 129, 130, 133, 134, 160, 167',
              'RF and Communication: ELEN 105, 141, 144',
              'Power Systems: ELEN 164, 182, 183, 184',
            ],
            pre: 'Four undergraduate elective courses. One must be selected from each of the following four areas:',
          },
          {
            reqs: [
              'Computer Engineering courses: COEN 120, 122, 146',
              'First-year graduate-level electrical engineering coursework',
            ],
            pre: 'Additional electives may be substituted, with the approval of the advisor, from the following:',
          }
        ],
      },
      {
        name: 'Professional Development',
        reqs: [
          {
            reqs: [
              '4 or more units in a study abroad program that does not duplicate other coursework',
              'Cooperative education experience with enrollment in ELEN 188 and ELEN 189',
              '2 units in ENGR 110 Community-Based Engineering Design',
              'Preparation for graduate study in electrical engineering with completion of 2 or more additional units of upper-division or graduate-level courses',
              'Completion of an approved minor or second major in any field of engineering or science',
              'Completion of 10 or more units in the combined bachelor of science and master of science program',
              '2 units of Peer education experience',
            ],
            pre: 'A professional development experience selected from one of the following options:',
          }
        ],
      },
    ],
  },
  {
    title: 'General Engineering',
    categories: [
      {
        name: 'English',
        reqs: [
          'ENGL 181',
        ],
      },
      {
        name: 'Mathematics and Natural Science',
        reqs: [
          'MATH 11',
          'MATH 12',
          'MATH 13',
          'MATH 14',
          [
            'MATH 22',
            'AMTH 106',
          ],
          'One upper-division mathematics elective',
          'CHEM 11',
          'PHYS 31',
          'PHYS 32',
          'PHYS 33',
          'MECH 15',
        ],
      },
      {
        name: 'Engineering',
        reqs: [
          'ENGR 1',
          'ENGR 110',
          'BIOE 10',
          'CENG 41',
          'CENG 43',
          'COEN 10',
          'COEN 21',
          'ELEN 50',
          'ELEN 115',
          'MECH 10',
          'MECH 11',
          'MECH 121',
        ],
      },
      {
        name: 'Design Sequence from one of the following options:',
        reqs: [
          [
            'BIOE 194',
            'BIOE 195',
            'BIOE 196',
          ],
          [
            'CENG 129A',
            'CENG 193',
            'CENG 194',
          ],
          [
            'COEN 194',
            'COEN 195',
            'COEN 196',
          ],
          [
            'ELEN 194',
            'ELEN 195',
            'ELEN 196',
          ],
          [
            'ENGR 194',
            'ENGR 195',
            'ENGR 196',
          ],
          [
            'MECH 194',
            'MECH 195',
            'MECH 196',
          ],
        ],
      },
      {
        name: 'Electives',
        reqs: [
          '36 upper-division units defining a coherent concentration, selected in consultation with an academic advisor',
        ],
      },
    ],
  },
  {
    title: 'Mechanical Engineering',
    categories: [
      {
        name: 'English',
        reqs: [
          'ENGL 181',
        ],
      },
      {
        name: 'Mathematics and Natural Science',
        reqs: [
          'MATH 11',
          'MATH 12',
          'MATH 13',
          'MATH 14',
          [
            'AMTH 106',
            'MATH 22',
          ],
          [
            'AMTH 118',
            'MATH 166',
          ],
          'CHEM 11',
          'PHYS 31',
          'PHYS 32',
          'PHYS 33',
          'MECH 15',
          'MECH 102 required for students with an average GPA below 3.0 for MATH 13, MATH 14, AMTH 106 or an approved mathematics or natural science elective.',
        ],
      },
      {
        name: 'Engineering',
        reqs: [
          'ENGR 1',
          'CENG 41',
          'CENG 43',
          [
            'COEN 44',
            'COEN 45',
          ],
          [
            'ELEN 50',
            'PHYS 70',
          ],
          'MECH 10',
          'MECH 11',
          'MECH 114',
          'MECH 115',
          'MECH 121',
          'MECH 122',
          'MECH 123',
          'MECH 125',
          'MECH 140',
          'MECH 141',
          'MECH 142',
          'MECH 160',
          'MECH 194',
          'MECH 195',
          'MECH 196',
        ],
      },
      {
        name: 'Technical Electives',
        reqs: [
          '8 units of technical electives from approved upper-division or graduate engineering classes.',
        ],
      },
    ],
  },
  {
    title: 'Web Design and Engineering',
    categories: [
      {
        name: 'Arts, Humanities, and Social Science',
        reqs: [
          'ENGL 181',
          [
            'ARTS 74',
            'ARTS 174',
          ],
          [
            'ARTS 75',
            'ARTS 175',
          ],
          'ARTS 177',
          'COMM 2',
          'COMM 12',
          'COMM 30',
          [
            'SOCI 49',
            'SOCI 149',
          ],
        ],
      },
      {
        name: 'Mathematics and Natural Science',
        reqs: [
          'MATH 11',
          'MATH 12',
          'MATH 13',
          'MATH 14',
          'AMTH 108',
        ],
      },
      {
        name: 'Engineering',
        reqs: [
          'ENGR 1',
          [
            [
              'COEN 10',
              'COEN 11',
              'COEN 12',
            ],
            [
              'CSCI 10',
              'CSCI 60',
              'CSCI 61',
            ],
          ],
          'COEN 60',
          'COEN 146',
          'COEN 160',
          'COEN 161',
          'COEN 162',
          'COEN 163',
          'COEN 164',
          'COEN 169',
          'COEN 174',
          [
            'COEN 194',
            'ENGR 194',
          ],
          [
            'COEN 195',
            'ENGR 195',
          ],
          [
            'COEN 196',
            'ENGR 196',
          ],
        ],
      },
      {
        name: 'Educational Enrichment Electives',
        reqs: [
          'Same as for the bachelor of science in computer science and engineering',
        ]
      }
    ],
  },
];

function compare( to )
{
  // search for the matching degree
  const matches = ExpectedOutputs.filter(it => it.title === to.title);
  if (matches.length !== 1)
    return false;
  
  // diff, and generate any differences into object result
  const result = updatedDiff(matches[0], to);
  
  // there was some inconsistency, so return failure
  if (Object.keys(result).length > 0) {
    console.log(result);
    return false;
  }
  
  return JSON.stringify(matches[0]) === JSON.stringify(to);
}

export { compare };
