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
   * A list of categories, each containing their respective list of requirements.
   * Every category will contain a list, even if that list has only one element.
   */
  categories: {
    type: Object,
    required: true,
    label: 'Requirements',
  },
  
});

// publish all degrees to the client
if (Meteor.isServer)
  Meteor.publish('degrees.public', () => Degrees.find({ }));

export default Degrees;
