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
    uri: `${scuApiRoot}/details/4100/ugrad/${result}`,
    json: true,
  }));
}

async function getSearch( query )
{
  let sections = await rp({
    method: 'POST',
    uri: `${scuApiRoot}/search/4100/ugrad`,
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
  
  async suggestSchedules( degreeTitle, satisfied )
  {
    const degree = Degrees.find({title: degreeTitle}).fetch()[0];
  
    let classes = [];
    degree.categories.map(c => {
      for (const req of c.reqs) {
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
            else if (startsWithCourse(r))
              classes.push(r);
          }
        }
        else if (startsWithCourse(req))
          classes.push(req);
      }
    });

    const remaining = classes.filter(x => !satisfied[x]);
    let sections = await collectSections(remaining);
  
    let schedules = [ ];
  
    /**
     * Generate 10 possible schedules provided list of all available sections.
     *
     * while schedules < 10:
     *   sched = [ ]
     *   for s of sections
     *     if units >= 18: break
     *     if title not in sched:
     *       sched add s
     */
  
    while (schedules.length < 50)
    {
      let sched = [ ];
      let units = 0;
  
      sections = shuffleArray(sections);
      for (let i = 0; i < sections.length; ++i)
      {
        if (!includesCourse(sched, sections[i])
          && !includesMeetingTime(sched, sections[i])
          && !sections[i]['catalog_nbr'].includes('L'))
        {
          if (sections[i]['units_minimum'] !== 'N/A')
            units += parseInt(sections[i]['units_minimum']);
          sched.push(sections[i]);
        }
        if (units >= 16.00) break;
      }
      
      sched.sort((a, b) => {
        a = parseInt(a.mtg_time_beg_hr_1);
        b = parseInt(b.mtg_time_beg_hr_1);
        
        return (a > b) ? 1 : ((b > a) ? -1 : 0);
      });
      schedules.push(sched);
    }
    
    return schedules;
  }
  
});

function shuffleArray( arr )
{
  for (let i = arr.length - 1; i > 0; --i)
  {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  
  return arr;
}

function includesCourse( schedule, it )
{
  const subj = it['subject'];
  const num = it['catalog_nbr'];
  
  for (const course of schedule)
    if (course['subject'] === subj && course['catalog_nbr'] === num)
      return true;
  
  return false;
}

function includesMeetingTime( schedule, it )
{
  const mtgTime = it['mtg_time_beg_1'];
  
  for (const course of schedule)
    if (course['mtg_time_beg_1'] === mtgTime)
      return true;
  
  return false;
}

if (Meteor.isServer) {
  Meteor.startup(() => {
    
    // on startup, always prune old Degrees and scrape for newest
    Degrees.remove({});
    scrape();
  
  });
}
