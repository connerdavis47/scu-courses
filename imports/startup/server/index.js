import { Meteor } from 'meteor/meteor';

import Degrees from 'imports/api/degrees/degrees';
import request from 'request';
import rp from 'request-promise';

const scuApiRoot = 'https://www.scu.edu/apps/ws/courseavail';

Meteor.startup(() => {
  
  Meteor.methods({
  
    /**
     * Queries the CourseAvail JSON API for classes fitting the provided search
     * string and filters.
     *
     * @param text  The input text, which may be anything, i.e., class title.
     * @returns {Promise<T>}  Once the POST request has been completed.
     */
    search({ text: text, }) {
      return rp({
        method: 'POST',
        uri: `${scuApiRoot}/search/4060/ugrad`,
        formData: {
          q: text,
          maxRes: 50,
        },
      }).then(body => {
        const result = JSON.parse(body);
        return result.results;
      }).catch(err => { console.warn(err); });
    },
  
  });
  
  
  
  // check to see if degree requirements API has yet to be populated with data
  if (typeof Degrees.findOne({}) === 'undefined') {
    // if so, we need to pull the latest
    
    // add compatible degrees
    const DegreePages = [
      /*'Bioengineering',
      'CivilEngineering',*/
      'ComputerEngineering',
      /*'ElectricalEngineering',
      'GeneralEngineering',
      'MechanicalEngineering',*/
    ];
    
    // query each page for its data
    /*for (let path of DegreePages) {
      JSDOM.fromURL(
        `https://www.scu.edu/bulletin/undergraduate/chapter-5/${path}.html`
      ).then(dom => {
        let sec = dom.window.document.querySelector('.markdown-section');
  
        console.log(
          `---- Degree Program: ${sec.querySelector('h1').innerHTML}`
        );
  
        for (let item of sec.children) {
          if (item.tagName.toLowerCase() === 'p' && item.innerHTML.startsWith('<strong>')) {
            if (item.innerHTML.indexOf('Bachelor of ') < 0) {
              console.log('Category: ' + item.children[0].innerHTML);
            }
          } else if (item.tagName.toLowerCase() === 'ul') {
            for (let req of item.children) {
              console.log('--> Requirement: ' + req.textContent);
            }
          }
        }
      });
    }*/
    
  }

});
