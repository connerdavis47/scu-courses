import { JSDOM } from 'jsdom'

const RemotePages = [
  'Bioengineering',
  'CivilEngineering',
  'ComputerEngineering',
  'ElectricalEngineering',
  'GeneralEngineering',
  'MechanicalEngineering',
];

let prefix = '';

let scrapeAll = () => {
  for (let page of RemotePages)
    loadDOM(page).then(dom => parseDOM(dom));
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
  let degrees = [
    {
      title: formatDegreeTitle(dom.querySelector('h1').textContent),
      categories: [],
    },
  ];
  
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
      let section = nodes.slice(i + 1);
      section.some((elem, j) => {
        if (categoryHeader(elem)) {
          section = section.slice(0, j);
          return true;
        }
      });
      
      // try to parse several degree programs on one page
      if (elemContains(elem, "Requirements for the Majors"))
        parseDegrees(section);
      // try to parse a page with only one degree program
      else if (elemContains(elem, "Requirements for the Major"))
        degrees[0].categories = parseDegree(section);
    }
  });
  
  console.log(JSON.stringify(degrees));
};

let parseDegrees = ( elems ) => {
  let mark;
  Object.values(elems).some((elem, i) => {
    if (sectionHeader(elem) && elemContains(elem, "Bachelor of "))
    {
      if (mark)
      {
      
      }
      else
      {
        mark = i;
      }
    }
  });
};

let parseDegree = ( elems ) => {
  let categories = [ ];
  
  Object.values(elems).some((elem, i) => {
    if (sectionHeader(elem))
    {
      let section = Object.values(elems).slice(i + 1);
      section.some((sElem, j) => {
        if (sectionHeader(sElem))
        {
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
        console.log('--> Complementary section');
        elems.shift();
        elems.shift();
      }
      else if (elemTag(elems[0], 'ul') && elemTag(elems[1], 'p'))
      {
        if (elems[1].textContent.endsWith(':'))
        {
          console.log('--> List of courses');
          elems.shift();
        }
        else
        {
          console.log('--> Supplementary section');
          elems.shift();
          elems.shift();
        }
      }
      else if (elemTag(elems[0], 'ul'))
      {
        console.log('--> List of courses');
        elems.shift();
      }
      else if (elemTag(elems[0], 'p'))
      {
        console.log('--> Text block');
        elems.shift();
      }
      else break;
    }
  }
  
  return reqs;
};

let parseCourseList = ( ul ) => {
  let reqs = [];
  
  for (let li of ul.children)
    reqs = reqs.concat(replaceSingleItemArrays(parseCourseListItem(li)));
  
  return reqs;
};

let parseCourseListItem = ( li ) => {
  let courses = [ ];
  
  li = li.textContent;
  li = li.replace(/[\n\r]+/g, ' ');
  li = li.replace(/[()]+/g, '');
  
  if (li.endsWith(' '))
    li = li.slice(0, -1);
  
  if (course(li))
  {
    courses.push(li);
    return courses;
  }
  else
  {
    if (li.startsWith('One course from '))
    {
      courses.push([]);
      parseCourseExpression(courses[0], li.substr('One course from '.length));
    }
    else if (li.startsWith('One from '))
    {
      courses.push([]);
      parseCourseExpression(courses[0], li.substr('One from '.length));
    }
    else if (li.indexOf('approved') > -1)
      courses.push(li);
    else if (!li.match(/\w{0,4} ([0-9]){1,3}A?L?/g))
      courses.push(li);
    else
      parseCourseExpression(courses, li);
  }

  return courses;
};

let parseCourseExpression = ( output, input ) => {
  let match;
  
  if ((match = andExpression(input)) !== input)
    for (let split of match)
      matchExpression(output, split);
  else if ((match = orExpression(input)) !== input)
  {
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
  
  if (course(input))
  {
    output.push(input);
    prefix = input.substr(0, 4);
  }
  else if (input.match(/^\d{1,3}A?L?$/))
  {
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
