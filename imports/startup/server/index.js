import { Meteor } from 'meteor/meteor'
import rp from 'request-promise'

import Degrees from 'imports/api/degrees/degrees'
import { scrape } from 'imports/startup/server/scrape'

/**
 * The root path to the API. Important since the search's behavior can be
 * altered by changing URL contents after this root.
 */
const scuApiRoot = 'https://www.scu.edu/apps/ws/courseavail';

function startsWithCourse( text )
{
  return /^\w{4} [0-9]{1,3}[ABCDEFG]?L?/.test(text);
}

async function getDetails( course )
{
  return await Promise.resolve(rp({
    method: 'GET',
    uri: `${scuApiRoot}/details/4040/ugrad/${result}`,
    json: true,
  }));
}

async function getSearch( query )
{
  let sections = await rp({
    method: 'POST',
    uri: `${scuApiRoot}/search/4040/ugrad`,
    formData: {
      q: query,
      maxRes: 5,
    },
  });
  await Promise.resolve(sections);

  return JSON.parse(sections).results;
}

async function collectSections( courses )
{
  let promises = [ ];
  let options = [ ];
  
  for (const c of courses)
  {
    const search = getSearch(c).then(message => {
      for (const section of message)
        options.push(section);
    });
    promises.push(search);
  }
  await Promise.all(promises);
  
  return options;
}

Meteor.methods({
  
  'suggest-schedules'({ degreeTitle: degreeTitle, satisfied: satisfied, })
  {
    const degree = Degrees.find({ title: degreeTitle }).fetch()[0];
  
    let classes = [ ];
    degree.categories.map(c => {
      for (const req of c.reqs)
      {
        if (Array.isArray(req)) {
          for (const r of req)
            classes.push(r);
        }
        else if (typeof req === 'object' && typeof req.reqs !== 'undefined') {
          for (const r of req.reqs) {
            if (Array.isArray(r)) {
              for (const _r of r)
                classes.push(_r);
            }
            else if (typeof r === 'string' && startsWithCourse(req))
              classes.push(r);
          }
        }
        else if (typeof req === 'string' && startsWithCourse(req))
          classes.push(req);
      }
    });
    classes = classes.flatten();
    
    const remaining = classes.filter(x => !satisfied[x]);
    collectSections(remaining).then(message => {
      for (const course of message)
        console.log(course['subject'] + ' ' + course['catalog_nbr']);
    });
  }
  
});

if (Meteor.isServer) {
  Meteor.startup(() => {
    
    // on startup, always prune old Degrees and scrape for newest
    Degrees.remove({});
    scrape();
  
  });
}
