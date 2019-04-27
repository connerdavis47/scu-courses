import { JSDOM } from 'jsdom'

import Degrees from 'imports/api/degrees/degrees'
import { compare } from 'imports/startup/server/scrape.tests'

/**
 * The filename of each degree program's webpage on the Undergraduate Bulletin.
 * <br />
 * A major breaking point in the parser, since a filename change on the remote
 * server will result in this parser no longer seeing that page at all.
 */
const RemotePages = [
  
  /*{
    chapter: 'chapter-3',
    pages: [
      'UndergraduateDegrees',
      'Anthropology',
      'ArtandArtHistory',
      'Biology',
      'ChemistryandBiochemistry',
      'ChildStudies',
      'Classics',
      'Communication',
      'Economics',
      'English',
      'EnvironementalStudiesandSciences',
      'EthnicStudiesProgram',
      'History',
      'IndividualStudies',
      'MathematicsandComputerScience',
      'ModernLanguagesandLiteratures',
      'Music',
      'Neuroscience',
      'Philosophy',
      'Physics',
      'PoliticalScience',
      'Psychology',
      'PublicHealthProgram',
      'ReligiousStudies',
      'Sociology',
      'TheatreandDance',
      'WomensandGenderStudies',
    ],
  },
  {
    chapter: 'chapter-4',
    pages: [
      'UndergraduateDegrees',   // Leavey School of Business - Core Curriculum
      'Accounting',
      'Economics',
      'Finance',
      'Management',
      'Marketing',
      'OperationsManagementandInformationSystems',
    ],
  },*/
  {
    chapter: 'chapter-5',
    pages: [
      'UndergraduateDegrees',   // School of Engineering - Core Curriculum
      'Bioengineering',
      'CivilEngineering',
      'ComputerEngineering',    // also includes Web Design & Engineering
      'ElectricalEngineering',
      'GeneralEngineering',
      'MechanicalEngineering',
    ],
  },
  
];

/**
 * Attempts to scrape every web page found in #RemotePages, and stores each
 * degree that was detected into the Mongo database.
 */
let scrape = ( ) => {
  try
  {
    for (const chapter of RemotePages)
    {
      for (const page of chapter.pages)
      {
        loadDOM(chapter.chapter, page).then(dom => {
          const degrees = parseDOM(dom);
          
          if (degrees.length > 0)
          {
            for (const d of degrees)
            {
              console.log(`scrape.js#scrapeAll(): emitted -> ${d.title}, passes tests -> (${compare(d)})`);
              Degrees.insert(d);
            }
          }
        })
      }
    }
  }
  catch (err)
  {
    console.log(`scrape.js#scrapeAll(): error -> ${err}`);
  }
};
/**
 * Loads the DOM of the specified page. Returns a subset of that DOM, targeting
 * a class called `.markdown-section` which contains the actual content of the
 * Undergraduate Bulletin page, excluding its extraneous navigation system.
 *
 * @param page
 *        The page to load.
 * @returns {Promise<any>}
 *          After the DOM has been fully loaded.
 */
let loadDOM = ( chapter, page ) => {
  return new Promise(resolve => {
    JSDOM
      .fromURL(
        `https://www.scu.edu/bulletin/undergraduate/${chapter}/${page}.html`
      )
      .then(dom =>
        // return only the section of the DOM we want to parse
        resolve(dom.window.document.body.querySelector('.markdown-section'))
      )
  })
};
/**
 * Attempts to parse the provided DOM for degree programs. The fundamental
 * structure of the output produced by this function generally looks like:
 * <br />
 * [
 *  {
 *    title: "Computer Science and Engineering",
 *    categories: [
 *      {
 *        name: "English",
 *        reqs: [
 *          "ENGL 181",
 *          ... (more requirements)
 *        ]
 *      }, ... (more categories)
 *    ]
 *  }, ... (more degrees)
 * ]
 * <br />
 *
 * @param dom
 *        The Document Object Model to parse.
 * @returns {Array}
 *          Containing the list of degrees parsed within this DOM.
 */
let parseDOM = ( dom ) => {
  // <h1>"Department of ..." OR "... Program"</h1>
  let degreeTitle;
  if (dom.querySelector('h1')) {
    degreeTitle = trimDegreeTitle(dom.querySelector('h1').textContent);
  } else {
    degreeTitle = trimDegreeTitle(dom.querySelector('h2').textContent);
  }
  
  let degrees = [ ];
  
  // loop through every element in the DOM
  const nodes = Object.values(dom.children);
  nodes.some((e, i) => {
    /*
      match SECTION headers, which are <h2>-level elements that contain
      subsections identified as CATEGORIES.
     */
    if (sectionHeader(e))
    {
      // completely skip sections with any of these titles
      if (containsText(e, 'Lower-Division Courses')
        || containsText(e, 'Upper-Division Courses')
        || containsText(e, 'Laboratories')
        || containsText(e, 'Minor')
        || containsText(e, 'Program'))
        return;
      
      // otherwise, search for the end of the section and slice to that point
      let section = nodes.slice(i + 1);
      section.some((f, j) => {
        /* the next section header indicates the end of this one */
        if (sectionHeader(f))
        {
          section = section.slice(0, j);
          return true;
        }
      });
      
      // try to parse more than one degree on the same page
      if (containsText(e, 'Requirements for the Majors'))
      {
        const attempt = parseDegrees(Object.values(section));
        
        for (const d of attempt)
          if (d.categories.length > 0)
            degrees.push(d);
      }
      
      // try to parse a page with only one degree program
      else if (containsText(e, "Requirements for the Major")
            || containsText(e, "Requirements for the Bachelor"))
      {
        const attempt = parseDegree(Object.values(section));
        
        if (attempt.length > 0)
          degrees.push({
            title: degreeTitle,
            categories: attempt,
          });
      }
    }
  });
  
  return degrees;
};

/**
 * Attempts to parse a degree for its set of categories, each of which contains
 * some list of requirements.
 *
 * @param nodes
 *        The DOM nodes found within this degree.
 * @returns {Array}
 *          A list of categories, ready to be plugged into a degree object.
 */
let parseDegree = ( nodes ) => {
  let categories = [ ];
  
  nodes.some((e, i) => {
    if (categoryHeader(e))
    {
      let contents = nodes.slice(i + 1);
      contents.some((f, j) => {
        // find the end of this section and slice at that point
        if (categoryHeader(f))
        {
          contents = contents.slice(0, j);
          return true;
        }
      });
      
      const matches = parseCategory(contents);
      if (matches.length > 0)
        categories.push({
          name: e.textContent,
          reqs: matches,
        });
    }
  });
  
  // sometimes pages do not have any category headers, just courses
  if (categories.length === 0)
    categories.push({
      name: 'Uncategorized',
      reqs: parseCategory(nodes.slice(1)),
    });
  
  return categories;
};
let parseDegrees = ( nodes ) => {
  let degrees = [ ];
  let end = -1;
  
  nodes.some((e, i) => {
    if (i === nodes.length - 1) {
      degrees[degrees.length - 1].categories = parseDegree(nodes.slice(end + 1));
      return true;
    }
    
    if (categoryHeader(e)
      && (containsText(e, 'Bachelor of ') || containsText(e, 'Major in '))) {
      if (i > 1) {
        end = i;
        degrees[degrees.length - 1].categories = parseDegree(nodes.slice(1, i));
      }
      
      degrees.push({
        title: e.textContent.substr(e.textContent.indexOf(' in ') + 4),
        categories: [],
      });
    }
  });
  
  return degrees;
};

/**
 * Attempts to parse the contents of a category on the degree page. These are
 * often dynamic and may contain blocks that are contextually connected but
 * are not described as such with the HTML, so we must interpret it ourselves.
 *
 * @param nodes
 *        The nodes found inside this category, not including the header.
 * @returns {Array}
 *          All of the matches we made to requirements, where each array item
 *          may be a course string, an array containing course strings, or an
 *          object containing fields that describe a text block.
 */
let parseCategory = ( nodes ) => {
  // all results including course requirements are considered matches, since
  // we don't always get *only* courses, and sometimes must emit raw HTML that
  // cannot reliably be interpreted into meaningful data
  let matches = [ ];
  
  // match one <ul>...</ul> and only one --> a course list
  if (nodes.length === 1 && isTag(nodes[0], 'ul'))
    matches = matches.concat(parseCourseList(nodes[0]));
  else
  {
    while (nodes.length > 1)
    {
      // match <p>..</p> followed immediately by <ul>...</ul>
      if (isTag(nodes[0], 'p') && isTag(nodes[1], 'ul'))
      {
        matches.push({
          reqs: containsCourse(nodes[1].textContent)
                ? parseCourseList(nodes[1]) : [ trimHtml(nodes[1].textContent) ],
          pre: trimHtml(nodes[0].textContent),
        });
        
        /* "pop" nodes from the front (like a stack) */
        nodes.shift();
        nodes.shift();
      }
      // match <ul>...</ul> followed immediately by <p>...</p>
      else if (isTag(nodes[0], 'ul') && isTag(nodes[1], 'p')
              && !nodes[1].textContent.endsWith(':'))
      {
        matches.push({
          reqs: containsCourse(nodes[0].textContent)
                ? parseCourseList(nodes[0]) : [ trimHtml(nodes[0].textContent) ],
          post: trimHtml(nodes[1].textContent),
        });
        
        nodes.shift();
        nodes.shift();
      }
      // match one <ul>...</ul> --> a course list
      else if (isTag(nodes[0], 'ul'))
      {
        matches = matches.concat(parseCourseList(nodes[0]));
        nodes.shift();
      }
      // match one <p>...</p> --> a text block we can't interpret
      else if (isTag(nodes[0], 'p'))
      {
        let text = nodes[0].outerHTML;
        
        nodes.shift();
        while (nodes.length > 0) {
          text += nodes[0].outerHTML;
          nodes.shift();
        }
        
        matches.push(trimHtml(text));
      }
      else break;
    }
  }
  
  return matches;
};

/**
 * Attempts to parse a <ul>...</ul> for course lists. Each list item may or may
 * not contain a sequence of courses. We scan each individually, searching for
 * expressions that we can identify as course sequences.
 *
 * @param ul
 *        The list to scan.
 * @returns {Array}
 *          All of the contents found within this list, including those which
 *          were not found to match a course expression, stored as raw HTML.
 */
let parseCourseList = ( ul ) => {
  let reqs = [];
  
  for (const li of ul.children)
  {
    reqs = reqs.concat(replaceSingleItemArrays(parseCourseListItem(li)));
    expression = []; // reset expression after each <li>
  }
  
  return reqs;
};
/**
 * Attempts to scan a <li>...</li> which contains a string that may or may not
 * contain a valid list of courses. If it does, we will attempt to match specific
 * expressions found within, including namely ANDs and ORs. Otherwise, the list
 * item will be interpreted as its entire `.innerHTML` to avoid items that are
 * too complex to parse reliably.
 *
 * @param li
 *        The list item to scan.
 * @returns {*}
 *          An array of courses if there was at least one, or a string containing
 *          the HTML of this element if there were zero.
 */
let parseCourseListItem = ( li ) => {
  // input: <li>...</li>
  const html = trimHtml(li.innerHTML),
        text = trimHtml(li.textContent);
  
  // example: ENGL 181 -> ["ENGL 181"]
  if (isCourse(text))
    return [ text ];
  
  // example: One course from COEN 161, 163, 164 -> [ ["COEN 161", "COEN 163", "COEN 164"] ]
  if (/^One (.?)(from|course from)/.test(text) && containsCourse(text))
    return parseExpression(text.substr(text.match(/\w{4} [0-9]{1,3}[ABCDE]?L?/).index), true);
  
  // example: AMTH 106 or MATH 22 -> [ ["AMTH 106", "MATH 22"] ]
  if (startsWithCourse(text))
    return parseExpression(text);
  
  // last resort: return raw HTML
  return html;
};

let expression = [ ];
let prefix = '';

/**
 * Attempts to derive a valid expression from a list item string input. The two
 * main types of expressions are ANDs, which declare a list of courses that should
 * all be taken, and ORs, which declare a list of courses where one should be
 * picked.
 * <br />
 * This function will search recursively for matching expressions, which means
 * that there can be several "nesting" layers in the text and it will interpret
 * ANDs before ORs the whole way.
 *
 * @param text
 *        The input to scan, which is a list item.
 * @param forceOr
 *        An optional parameter which allows us
 * @returns {Array}
 *          Containing all of the items matched, with sub-arrays indicating a
 *          set of classes where one should be taken (OR).
 */
let parseExpression = ( text, forceOr = false ) => {
  let match;
  
  if (forceOr)
  {
    let save = expression;
    expression = [ ];
  
    const splits = text.split(/(either\s|\sor\s|\/|,\sand\s|,\s|;\s)+/g);
    for (const split of splits.filter(t => (isCourse(t) || t.match(/^\d{1,3}[ABCDE]?L?$/))))
      matchExpression(split);
    
    save.push(expression);
    expression = save;
  }
  // try to match an AND expression first
  else if ((match = andExpression(text)) !== text)
  {
    for (const split of match)
      matchExpression(split);
  }
  // otherwise try to match an OR
  else if ((match = orExpression(text)) !== text)
  {
    /* we store ORs as a sub-array */
    let save = expression;
    expression = [ ];
    
    for (const split of match)
      matchExpression(split);
    
    save.push(expression);
    expression = save;
  }
  
  return expression;
};
/**
 * Attempts to match a valid course entry listed inside of a larger course list
 * expression. For example, in the list item "COEN 10, 11, 12" we will interpret
 * each of "COEN 10", "11", "12" as individual courses in a sequence.
 *
 * @param expr
 *        The input expression to scan for matches.
 */
let matchExpression = ( expr ) => {
  expr = trimHtml(expr);
  
  // matches a full course title ("COEN 11")
  if (isCourse(expr))
  {
    prefix = expr.substring(0, 4);
    expression.push(expr);
  }
  // matches a continuing course title ("11")
  else if (expr.match(/^\d{1,3}[ABCDE]?L?$/))
  {
    /* disregard labs, since we can search for these with the API on a user basis */
    if (expr.includes('L')) return;
    
    expression.push(prefix + ' ' + expr);
  }
  // otherwise, try to parse a whole new expression (a "sub-expression")
  else
    parseExpression(expr);
};
/**
 * Searches for a valid keyword denoting an "AND" expression.
 *
 * @param text
 *        The string to search in.
 * @returns {*}
 *          An array of substrings from the resulting expression, or the original
 *          string itself if there was no "AND".
 */
let andExpression = ( text ) => {
  if (text.includes(', and '))      return text.split(', and ');
  else if (text.includes(' and '))  return text.split(' and ');
  else if (text.includes(', '))     return text.split(', ');
  else if (text.includes('; '))     return text.split('; ');
                                    return text;
};
/**
 * Searches for a valid keyword denoting an "OR" expression.
 *
 * @param text
 *        The string to search in.
 * @returns {*}
 *          An array of substrings from the resulting expression, or the original
 *          string itself if there was no "OR".
 */
let orExpression = ( text ) => {
  if (text.includes('either '))     return [
      text.substring('either '.length, text.indexOf(' or ')),
      text.substring(text.indexOf(' or ') + ' or '.length),
  ];
  else if (text.includes(', or'))   return text.split(', or');
  else if (text.includes(' or '))   return text.split(' or ');
  else if (text.includes('/'))      return text.split('/');
                                    return text;
};

/**
 * @param e
 *        The tag whose text we want to scan.
 * @param text
 *        The text we are expecting to find.
 * @returns {boolean}
 *          True if the text is found in this element.
 */
let containsText = ( e, text ) => e.textContent.includes(text);
/**
 * @param e
 *        The tag we want to scan.
 * @param tag
 *        The name of the tag we are expecting to find.
 * @returns {boolean}
 *          True if the tag name is found to equal the expected value.
 */
let isTag = ( e, tag ) => e.nodeName.toLowerCase() === tag;

/**
 * Scans a string to see if it contains at least one string matching the course
 * regex, which can be found at `#isCourse(str)`.
 *
 * @param text
 *        The string to scan.
 * @returns {boolean}
 *          True if this string contains at least one valid course.
 */
let containsCourse = ( text ) => /\w{4} [0-9]{1,3}[ABCDE]?L?/.test(text);
/**
 * Scans a string to see if it matches the acceptable regex for a course at
 * SCU, which is defined as zero to four letters, one space, one to three numbers,
 * and an optional A and/or L at the end.
 * <br />
 * For example, "COEN 10", "10", "10L", and "BIOE 164AL" all positively match the
 * expression. "10" passes because this signifies that a previous element
 * already defined the four-letter prefix, and it will be forwarded.
 *
 * @param text
 *        The string to scan.
 * @returns {boolean}
 *          True if this string is a valid course.
 */
let isCourse = ( text ) => /^\w{0,4} [0-9]{1,3}[ABCDE]?L?$/.test(text);
let startsWithCourse = ( text ) => /^\w{4} [0-9]{1,3}[ABCDE]?L?/.test(text);

/**
 * Sections are denoted by `<h2>...</h2>`. A section is a group of categories.
 * Every degree page shares a few in common, e.g. "Requirements for the Major(s)",
 * "Upper-Division Courses" among others. This parser intentionally ignores all
 * sections that are not pertinent to the major degree requirements.
 *
 * @param e
 *        The element to scan.
 * @returns {boolean}
 *          True if this is a section header.
 */
let sectionHeader = ( e ) => isTag(e, 'h2');
/**
 * Categories are denoted by `<p><strong>...</strong></p>`. A category manifests
 * in two ways. On most pages, a category is a named segment of degree
 * requirements that are all somehow in common with one another, e.g., "English".
 * <br />
 * However, on pages that describe more than one degree program, there will be
 * category headers denoting each degree program's content in addition to the
 * actual category headers of each degree.
 *
 * @param e
 *        The element to scan.
 * @returns {boolean}
 *          True if this is a category header.
 */
let categoryHeader = ( e ) => isTag(e, 'p') && isTag(e.firstChild, 'strong');

/**
 * Removes prefix, and sometimes suffix, found in every degree page's <h1>
 * element, which is the title of the degree program.
 *
 * @param title
 *        The title of the degree with some garbage around it.
 * @returns {string}
 *          The actual title of the degree.
 */
let trimDegreeTitle = ( title ) => {
  if (title.startsWith('Department of '))
    title = title.substr('Department of '.length);
  
  if (title.endsWith(' Program'))
    title = title.substring(0, title.length - ' Program'.length);
  
  return trimHtml(title);
};
/**
 * Removes generally undesirable characters from raw HTML strings interpreted
 * via the DOM element `.innerHTML`property. These includes newlines, parentheses,
 * and <p> tags, which all make it a little more difficult to format results on
 * the web page.
 *
 * @param html
 *        The `.innerHTML` to format.
 * @returns {string}
 *          The formatted HTML, which may just be text now.
 */
let trimHtml = ( html ) => {
  html = html.replace(/[\n\r]+/g, ' ');
  html = html.replace(/[()]+/g, '');
  html = html.replace(/<\/?p>/g, '');
  
  if (html.endsWith(' '))
    html = html.slice(0, -1); // neat trick to trim last character of string
  
  return html;
};

let replaceSingleItemArrays = ( arr ) => {
  if (!Array.isArray(arr)) return arr;
  
  arr.forEach((item, i) => {
    if (Array.isArray(item))
    {
      if (item.length === 1)
        arr[i] = item[0];
      else if (item.length === 0)
        arr.splice(i, 1);
      else
        replaceSingleItemArrays(item);
    }
  }, arr);
  
  return arr;
};

export { scrape };
