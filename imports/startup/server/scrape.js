import { JSDOM } from 'jsdom'

import Degrees from 'imports/api/degrees/degrees'

const RemotePages = [
  'Bioengineering',
  'CivilEngineering',
  'ComputerEngineering',
  'ElectricalEngineering',
  'GeneralEngineering',
  'MechanicalEngineering',
];

let prefix = '';

let scrapeAll = ( ) => {
  try {
    for (let page of RemotePages) {
      loadDOM(page).then(dom => {
        let degrees = parseDOM(dom);
        Degrees.insert(degrees[0]);
        if (degrees.length > 1)
          Degrees.insert(degrees[1]);
      });
    }
  } catch (err) {
    console.log('err ' + err);
  } finally {
    console.log('done');
  }
};

let loadDOM = ( page ) => {
  return new Promise(resolve => {
    JSDOM
      .fromURL(
        `https://www.scu.edu/bulletin/undergraduate/chapter-5/${page}.html`
      )
      .then(dom =>
        // return only the section of the DOM we want to parse
        resolve(dom.window.document.body.querySelector('.markdown-section'))
      );
  });
};

let parseDOM = ( dom ) => {
  let degrees = [ ];
  degrees.push({
    title: formatDegreeTitle(dom.querySelector('h1').textContent),
    categories: [],
  });
  
  const nodes = Object.values(dom.children);
  nodes.some((elem, i) => {
    if (categoryHeader(elem)) {
      // skip sections with any of these titles
      if (elemContains(elem, "Lower-Division Courses")
        || elemContains(elem, "Upper-Division Courses")
        || elemContains(elem, "Laboratories")
        || elemContains(elem, "Minor")
        || elemContains(elem, "Bachelor"))
        return;
      
      // find the end of the section and slice at that point
      let categories = nodes.slice(i + 1);
      categories.some((elem, j) => {
        if (categoryHeader(elem)) {
          categories = categories.slice(0, j);
          return true;
        }
      });
      
      // try to parse several degree programs on one page
      if (elemContains(elem, "Requirements for the Majors"))
        degrees = parseDegrees(Object.values(categories));
      // try to parse a page with only one degree program
      else if (elemContains(elem, "Requirements for the Major"))
        degrees[0].categories = parseDegree(Object.values(categories));
    }
  });
  
  return degrees;
};

let parseDegrees = ( elems ) => {
  let degrees = [ ];
  let open = -1;
  elems.some((elem, i) => {
    if (i === elems.length - 1) {
      degrees[degrees.length - 1].categories =
        parseDegree(elems.slice(open));
    }
    
    if (sectionHeader(elem) && elemContains(elem, 'Bachelor of ')) {
      if (open > -1) {
        degrees[degrees.length - 1].categories =
          parseDegree(elems.slice(1, i - open));
        open = i + 1;
      } else {
        open = i + 1;
      }
  
      degrees.push({
        title: elem.textContent.substr(elem.textContent.indexOf('in') + 3),
        categories: [],
      });
    }
  });
  
  return degrees;
};

let parseDegree = ( elems ) => {
  let categories = [ ];
  
  elems.some((elem, i) => {
    if (sectionHeader(elem)) {
      let section = elems.slice(i + 1);
      section.some((elem, j) => {
        if (sectionHeader(elem)) {
          section = section.slice(0, j);
          return true;
        }
      });
      
      categories.push({
        name: elem.textContent,
        reqs: parseSection(section),
      });
    }
  });
  
  return categories;
};

let parseSection = ( elems ) => {
  let reqs = [ ];
  
  if (elems.length === 1 && elemTag(elems[0], 'ul'))
    reqs = reqs.concat(parseCourseList(elems[0]));
  else
  {
    while (elems.length > 1)
    {
      if (elemTag(elems[0], 'p') && elemTag(elems[1], 'ul'))
      {
        let title = elems[0].textContent.replace(':', '');
        title = title.replace('\n', ' ');
        
        reqs.push({
          option: title,
          reqs: parseCourseList(elems[1]),
        });
        elems.shift();
        elems.shift();
      }
      else if (elemTag(elems[0], 'ul') && elemTag(elems[1], 'p'))
      {
        if (elems[1].textContent.endsWith(':'))
        {
          reqs.push(parseCourseList(elems[0]));
          elems.shift();
        }
        else
        {
          reqs = reqs.concat(parseCourseList(elems[0]));
          elems.shift();
          elems.shift();
        }
      }
      else if (elemTag(elems[0], 'ul'))
      {
        reqs = reqs.concat(parseCourseList(elems[0]));
        elems.shift();
      }
      else if (elemTag(elems[0], 'p'))
      {
        let text = elems[0].outerHTML;
        text = text.replace('\n', '');
        
        elems.shift();
        while (elems.length > 0) {
          text += elems[0].outerHTML;
          elems.shift();
        }
        
        reqs.push({
          reqs: [text],
        });
      }
      else break;
    }
  }
  
  return reqs;
};

let parseCourseList = ( ul ) => {
  let reqs = [];
  
  for (let li of ul.children)
    reqs = reqs.concat(parseCourseListItem(li));
  
  return reqs;
};

let parseCourseListItem = ( li ) => {
  let courses = [ ];
  
  let html = li.innerHTML.replace(/[\n\r]+/g, ' ');
  let text = li.textContent;
  text = text.replace(/[\n\r]+/g, ' ');
  text = text.replace(/[()]+/g, '');
  
  if (text.endsWith(' '))
    text = text.slice(0, -1);
  
  if (course(text)) {
    courses.push(text);
    return courses;
  } else {
    if (text.startsWith('One course from ')) {
      courses.push([]);
      parseCourseExpression(courses[0], text.substr('One course from '.length));
    } else if (text.startsWith('One from ')) {
      courses.push([]);
      parseCourseExpression(courses[0], text.substr('One from '.length));
    } else if (text.indexOf('approved') > -1
            || text.indexOf('listed') > -1
            || !/^\w{0,4} ([0-9]){1,3}A?L?/g.test(text)
            || !/\d/.test(text))
      courses.push(html);
    else
      parseCourseExpression(courses, text);
  }

  return courses;
};

let parseCourseExpression = ( output, input ) => {
  let match;
  
  if ((match = andExpression(input)) !== input)
    for (let split of match)
      matchExpression(output, split);
  else if ((match = orExpression(input)) !== input) {
    let orBlock = [ ];
    
    for (let split of match)
      matchExpression(orBlock, split);
    
    output.push(orBlock);
  }
};

let matchExpression = ( output, input ) => {
  if (input.endsWith(' '))
    input = input.slice(0, -1);
  else if (input[0] === ' ')
    input = input.substr(1);
  
  if (course(input)) {
    output.push(input);
    prefix = input.substr(0, 4);
  } else if (input.match(/^\d{1,3}A?L?$/)) {
    if (input.indexOf('L') > -1)
      return;
    
    input = prefix + ' ' + input;
    output.push(input);
  }
  else
    parseCourseExpression(output, input);
};

let andExpression = ( str ) => {
  if (str.indexOf(', and ') > -1)
    return str.split(', and ');
  else if (str.indexOf(' and ') > -1)
    return str.split(' and ');
  else if (str.indexOf(', ') > -1)
    return str.split(', ');
  else if (str.indexOf('; ') > -1)
    return str.split('; ');
  return str;
};

let orExpression = ( str ) => {
  if (str.indexOf('either ') > -1)
  {
    let splits = [];
    splits.push(str.substr('either '.length, str.indexOf(' ') - 3));
    splits.push(str.substr(str.indexOf('or') + 3));
    return splits;
  }
  else if (str.indexOf(' or ') > -1)
    return str.split(' or ');
  else if (str.indexOf('/') > -1)
    return str.split('/');
  return str;
};

let formatDegreeTitle = ( title ) => {
  if (title.startsWith('Department of '))
    title = title.substr('Department of '.length);
  
  if (title.endsWith(' Program'))
    title = title.substr(0, title.length - ' Program'.length);
  
  if (title.endsWith(' '))
    title = title.slice(0, -1);
  
  return title;
};

let replaceSingleItemArrays = ( arr ) => {
  arr.forEach((item, i) => {
    if (Array.isArray(item))
    {
      if (item.length === 1)
        arr[i] = item[0];
      else
        replaceSingleItemArrays(item);
    }
  }, arr);
  
  return arr;
};

let course = ( str ) => {
  return /^\w{0,4} ([0-9]){1,3}A?L?$/.test(str);
};

let elemContains = ( elem, match ) => {
  return elem.textContent.indexOf(match) > -1;
};

let elemTag = ( elem, tag ) => {
  return elem.nodeName.toLowerCase() === tag;
};

let categoryHeader = ( elem ) => {
    return elemTag(elem, 'h2');
};

let sectionHeader = ( elem ) => {
  return elemTag(elem, 'p') && elemTag(elem.firstChild, 'strong');
};

export { scrapeAll };
