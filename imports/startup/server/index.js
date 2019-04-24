import { Meteor } from 'meteor/meteor'
import rp from 'request-promise'

import Degrees from 'imports/api/degrees/degrees'
import { scrape } from 'imports/startup/server/scrape'

/**
 * The root path to the API. Important since the search's behavior can be
 * altered by changing URL contents after this root.
 */
const scuApiRoot = 'https://www.scu.edu/apps/ws/courseavail';

Meteor.methods({
  
  /**
   * Hits the CourseAvail JSON API for sections of courses available this
   * quarter which match the input query.
   *
   * @param text
   *        The input text, which may be anything, i.e., class title.
   * @returns {Promise<T>}
   *          After the POST request has been completed.
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
      return JSON.parse(body).results;
    }).catch(err => {
      throw new Meteor.Error('api-unavailable', `Could not query the remote API for data: ${err}`);
    });
  },
  
});

if (Meteor.isServer) {
  Meteor.startup(() => {
    
    // on startup, always prune old Degrees and scrape for newest
    Degrees.remove({});
    scrape();
  
  });
}
