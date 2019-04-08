import { JSDOM } from 'jsdom'

const DegreePages = [
  'Bioengineering',
  'CivilEngineering',
  'ComputerEngineering',
  'ElectricalEngineering',
  'GeneralEngineering',
  'MechanicalEngineering',
];

let parsePrograms = async ( ) => {
  let degrees = [ ];
  
  // query each page for its data
  for (let path of DegreePages) {
    let result = await parseProgram(path);
    console.log(result);
    let degree = {
      title: result,
      prefix: '',
      reqs: { },
    };
    console.log(degree);
    Meteor.call('degrees.insert', degree, (err, res) => {
      if (err) console.error(err);
      else console.log(res);
    });
  }
};

let parseProgram = ( path ) => {
  return new Promise(resolve => {
    JSDOM.fromURL(
      `https://www.scu.edu/bulletin/undergraduate/chapter-5/${path}.html`
    ).then(dom => {
      const html = dom.window.document.querySelector('.markdown-section');
      
      const program = parseProgramTitle(html.querySelector('h1').innerHTML);
      
      for (let item of html.children) {
        if (item.tagName.toLowerCase() === 'p' &&
          item.innerHTML.startsWith('<strong>')) {
          if (item.innerHTML.indexOf('Bachelor of ') < 0) {
            // console.log('Category: ' + item.children[0].innerHTML);
          }
        } else if (item.tagName.toLowerCase() === 'ul') {
          for (let req of item.children) {
            //console.log('--> Requirement: ' + req.textContent);
          }
        }
      }
      
      resolve(program);
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

export { parsePrograms, };
