import { Meteor } from 'meteor/meteor'
import rp from 'request-promise'

import Degrees from 'imports/api/degrees/degrees'
import { scrapeDegrees } from 'imports/startup/server/scrape_degrees'

const scuApiRoot = 'https://www.scu.edu/apps/ws/courseavail';

Meteor.methods({
  
  /**
   * Queries the CourseAvail JSON API for classes fitting the provided search
   * string and filters.
   *
   * @param text  The input text, which may be anything, i.e., class title.
   * @returns {Promise<T>}  Once the POST request has been completed.
   */
  'api.search'({ q: q, }) {
    return rp({
      method: 'POST',
      uri: `${scuApiRoot}/search/4040/ugrad`,
      formData: {
        q: q,
        maxRes: 50,
      },
    }).then(body => {
      const result = JSON.parse(body);
      return result.results;
    }).catch(err => { console.warn(err); });
  },
  
});

if (Meteor.isServer) {
  Meteor.startup(() => {
    
    Degrees.remove({});
    scrapeDegrees();
  
  });
}
