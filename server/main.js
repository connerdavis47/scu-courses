/*
  The purpose of this file is to import all files that should be run on the
  server. In other words, none of the client files.
 */

import { Meteor } from 'meteor/meteor';

import 'imports/api/degrees/degrees';
import 'imports/startup/server/index';

Meteor.startup(() => { });
