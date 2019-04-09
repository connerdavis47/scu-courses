import { JSDOM } from 'jsdom'

import Degrees from 'imports/api/degrees/degrees'

const DegreePages = [
  //'Bioengineering',
  //'CivilEngineering',
  'ComputerEngineering',
  //'ElectricalEngineering',
  //'GeneralEngineering',
  //'MechanicalEngineering',
];

let scrapeDegrees = ( ) => {
  parsePrograms()
    .then(result => {
      result.forEach((program) => {
        Degrees.insert(program);
        console.log(Degrees.findOne({ title: program.title }));
      });
    }).catch(error => {
      console.log('err: ' + error);
    })
};

let parsePrograms = async ( ) => {
  let degrees = [ ];
  
  // query each page for its data
  for (let path of DegreePages) {
    let result = await parseProgram(path);
    let degree = {
      title: result,
      prefix: '',
      reqs: { },
    };
    
    degrees.push(degree);
  }
  
  return degrees;
};

let parseProgram = ( path ) => {
  return new Promise(resolve => {
    JSDOM.fromURL(
      `https://www.scu.edu/bulletin/undergraduate/chapter-5/${path}.html`
    ).then(dom => {
      const html = dom.window.document.querySelector('.markdown-section');
      
      let result = {
        title: parseProgramTitle(html.querySelector('h1').innerHTML),
        reqs: [],
      };
      
      for (let item of html.children) {
        if (item.tagName.toLowerCase() === 'p' &&
          item.innerHTML.startsWith('<strong>')) {
          if (item.innerHTML.indexOf('Bachelor of ') < 0) {
            // console.log('Category: ' + item.children[0].innerHTML);
          }
        } else if (item.tagName.toLowerCase() === 'ul') {
          for (let req of item.children) {
            parseRequirement(result.reqs, req.textContent);
          }
        }
      }
      
      resolve(result);
    });
  });
};

let parseProgramTitle = ( title ) => {
  const prefix = 'Department of ';
  const suffix = ' Program';
  
  if (title.startsWith(prefix))
    title = title.substr(prefix.length);
  
  if (title.endsWith(suffix))
    title = title.substr(0, title.indexOf(suffix));
  
  return title;
};

let parseRequirement = ( list, str ) => {
  // trim newline characters
  str = str.replace(/\r?\n|\r/g, ' ');
  
  // trim characters that don't fit our expected set
  str = str.replace(/[^A-Za-z0-9 ,-]/g, '');
  
  // remove space at the end if it exists
  if (str.endsWith(' ')) str = str.substr(0, str.length - 1);
  
  // try to find an OR implication (a slash /, or the word "or")
  /*if (str.indexOf('or') > -1 || str.indexOf('OR') > -1) {
    let splits = str.split(' or ');
    
    splits.forEach(it => {
      if (it.startsWith(' ')) it = it.substr(1);
      if (it.endsWith(' ')) it = it.substr(0, it.length - 1);
      console.log(it + ':' + isCourse(it));
    });
  }*/
  
  // otherwise, perhaps it's an AND (a comma , in virtually all cases)
  if (str.indexOf(',') > -1) {
    let splits = str.split(',');
    let prefix = splits[0].substr(0, splits[0].indexOf(' '));
  
    splits.forEach(it => {
      if (it.startsWith(' ')) it = it.substr(1);
      if (it.endsWith(' ')) it = it.substr(0, it.length - 1);
      
      if (!it.match(/^[A-Za-z]/))
        it = prefix + ' ' + it;
      
      if (isCourse(it))
        console.log(it);
    });
    
    return;
  }
  
  // otherwise, let's see if it's just one course
  
  // if none of the rest is true, it's a long-form description
  if (isCourse(str)) {
    console.log(str);
  }
  
  //list.push(str);
};

let isCourse = ( str ) => {
  return /^((?!(or|and))\w){0,4} ?([0-9]){1,3}$/.test(str);
};

export { scrapeDegrees, };
