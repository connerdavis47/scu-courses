import { Mongo } from 'meteor/mongo'

export interface Degree {

  _id?: string;
  name: string;
  categories: DegreeCategory [];

}

export interface DegreeCategory {

  _id?: string;
  name: string;
  requirements: DegreeRequirement [];

}

export interface DegreeRequirement {

  _id?: string;
  pre?: string;
  post?: string;
  courses?: string [];

}

export const Degrees = new Mongo.Collection<Degree>('links');
