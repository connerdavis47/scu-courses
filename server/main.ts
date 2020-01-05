import { Meteor } from 'meteor/meteor'

import { Degrees, Placeholder } from '/imports/api/degrees'

Meteor.startup(() => {

  // TODO - Dev - Placeholder Degrees data while developing client
  if (Degrees.find().count() === 0) {
    Degrees.insert(Placeholder);
    console.log('Inserted placeholder Degree');
  }

});
