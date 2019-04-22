import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

const Degrees = new Mongo.Collection('degrees');

Degrees.schema = new SimpleSchema({
  
  /**
   * The formal title of the degree.
   * "Computer Engineering"
   */
  title: {
    type: String,
    required: true,
    label: 'Degree Program',
  },
  
  /**
   * The four-letter prefix assigned to each academic department's courses.
   * "COEN"
   */
  /*prefix: {
    type: String,
    required: true,
    regEx: /[A-Z]{4}/,
    label: 'Prefix',
  },*/
  
  /**
   * A list of Course objects that identify individual course requirements.
   * "COEN 20 - Intro to Embedded Systems"
   */
  categories: {
    type: Object,
    required: true,
    label: 'Requirements',
  },
  
});

if (Meteor.isServer) {
  Meteor.publish('degrees.public', () => {
    return Degrees.find({ });
  });
}

export default Degrees;
