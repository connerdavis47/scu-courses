import { Meteor } from 'meteor/meteor'

import { Degrees } from 'degrees.ts'

function insertLink(title: string, url: string) {
  Degrees.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Degrees collection is empty, add some data.
  if (Degrees.find().count() === 0) {
    insertLink(
      'Do the Tutorial',
      'https://www.meteor.com/tutorials/react/creating-an-app'
    );

    insertLink(
      'Follow the Guide',
      'http://guide.meteor.com'
    );

    insertLink(
      'Read the Docs',
      'https://docs.meteor.com'
    );

    insertLink(
      'Discussions',
      'https://forums.meteor.com'
    );
  }
});
