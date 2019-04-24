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
  }
];

const { diff, addedDiff, deletedDiff, detailedDiff, updatedDiff } = require("deep-object-diff");

function compare(to)
{
  const matches = ExpectedOutputs.filter(it => it.title === to.title);
  if (matches.length !== 1)
    return false;
  
  const result = updatedDiff(matches[0], to);
  if (Object.keys(result).length > 0) {
    console.log(JSON.stringify(to));
    return false;
  }
  
  return true;
}

export { compare };
