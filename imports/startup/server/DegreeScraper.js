import { JSDOM } from 'jsdom'

/**
 * Attempts to scrape the Santa Clara University Undergraduate Bulletin
 * (https://www.scu.edu/bulletin/undergraduate/) pages for each degree program.
 * <br>
 * Currently only supports the Engineering departments found at
 * https://www.scu.edu/bulletin/undergraduate/chapter-5/SchoolofEngineering.html
 */
class DegreeScraper {
  
  /**
   * @returns {string[]}  Paths to degree pages on the online SCU Undergraduate
   *                      Bulletin.
   */
  static get RemotePages() {
    return [
      //'Bioengineering',
      //'CivilEngineering',
      'ComputerEngineering',
      //'ElectricalEngineering',
      //'GeneralEngineering',
      //'MechanicalEngineering',
    ];
  };
  
  constructor() {
    this.dom = null;
    this.programs = [];
    
    this.scrapeAll();
  };
  
  /**
   * Attempts to query a remote webpage and assembles its DOM contents into
   * the local instance field `this.dom`.
   * <br>
   * Actually, we query the DOM for the class "markdown-section", which
   * always contains only the content we actually are looking for.
   *
   * @param page  The remote page to query.
   */
  storeDOM( page ) {
    return new Promise(resolve => {
      JSDOM
        .fromURL(
          `https://www.scu.edu/bulletin/undergraduate/chapter-5/${page}.html`
        )
        .then(dom =>
          // return a result to our promise
          resolve(dom.window.document.body.querySelector('.markdown-section'))
        );
    });
  }
  
  /**
   * Scrapes all known remote degree pages for their contents.
   *
   * @returns {Promise<void>} Once parsing has finished on all pages.
   */
  async scrapeAll( ) {
    for (let page of DegreeScraper.RemotePages) {
      this.dom = await this.storeDOM(page);
      this.buildParseTree();
    }
  }
  
  /**
   * Attempts to build a logical tree containing only the pertinent contents of
   * the current page whose DOM is found at `this.dom`.
   * <ul>
   *   <li>
   */
  buildParseTree( ) {
    if (this.dom === null) return;
    
    /*
      The default empty tree is a list, which will contain a sequence of all
      degrees found on this page. Within the Engineering department, the only
      page that currently describes more than just one degree is Computer
      Engineering, which also contains Web Design & Engineering.
     */
    let tree = [
      {
        title: this.formatDegreeTitle(
          this.dom.querySelector('h1').innerHTML
        ),
        categories: [],
      },
    ];

    Object.values(this.dom.children).some((elem, i) => {
      if (this.elementIs(elem, 'h2')
        && !this.containsText(elem, 'major')) {
        return true;
      }
      
      if (this.isSectionHeader(elem)) {
        // try to capture a degree title if there are multiple degrees on this
        // page.
        if (this.containsText(elem, 'bachelor ')
          && this.containsText(elem, ' in ')) {
          const major = elem.firstChild.innerHTML.substr(
            elem.firstChild.innerHTML.indexOf(' in ') + ' in '.length
          );
          
          if (tree.length === 1) {
            tree[0].title = major;
          } else {
            tree.push({
              title: major,
              categories: [],
            });
          }
        } else {
          /*
            otherwise this is a normal section header, so try to read its
            content
           */
          tree[tree.length - 1].categories.push({
            name: elem.textContent,
            reqs: this.parseSection(
              Object.values(this.dom.children).slice(i + 1)
            ),
          });
        }
      }
    });
    
    for (let leaf of tree) {
      console.log(leaf);
    }
  }
  
  /**
   * Attempt to parse a particular section of the current page. Sections are
   * defined as the block of content that sits between two bold paragraphs.
   * Sections are important because they contain degree requirement content.
   * <br>
   * We read sections individually because some of them are simply too complex
   * in nature to parse into anything meaningful on a basis consistent across
   * all degrees. In those cases, we add the entire block to this `Degree`'s
   * `.reqs` array, which can then be displayed for users to be aware of even
   * though we can't incorporate them into the algorithm itself.
   *
   * @param elems  The elements found inside this section, in order.
   */
  parseSection( elems ) {
    let reqs = [ ];
    let textBlock = '';
    
    for (let elem of elems) {
      // look for a bold paragraph, which indicates the end of the section
      if (this.isSectionHeader(elem)
        || this.elementIs(elem, 'h2')) break;
      
      if (textBlock.length > 0) {
        textBlock += elem.outerHTML;
      } else {
        if (this.elementIs(elem, 'p')) {
          textBlock += elem.outerHTML;
        }
  
        if (this.elementIs(elem, 'ul')) {
          for (let req of elem.children) {
            reqs = reqs.concat(this.parseReqs(req.textContent));
          }
        }
      }
    }
    
    return reqs;
  }
  
  parseReqs( str ) {
    // trim newline characters
    str = str.replace(/\r?\n|\r/g, ' ');
  
    // trim characters that don't fit our expected set
    str = str.replace(/[^A-Za-z0-9 ,-]/g, '');
  
    // remove space at the end if it exists
    if (str.endsWith(' ')) str = str.substr(0, str.length - 1);
  
    // if the element does not start with a course, do not try to parse further
    if (!this.isCourse(str)) return str;
    
    // otherwise, let's look for ANDs first
    let ands = this.scanAnds(str);
    if (typeof ands !== 'undefined') {
      let ors = [ ];
      
      for (let i = 0; i < ands.length; i++) {
        if (typeof this.scanOrs(ands[i]) !== 'undefined') {
          ors.push(this.scanOrs(ands[i]));
        } else {
          ors.push(ands[i]);
        }
      }
      
      if (ors.length > 0) ands = ors;
      return ands;
    }
    
    // then look for ORs
    let ors = this.scanOrs(str);
    if (typeof ors !== 'undefined') return ors;
    
    // otherwise it's just one course
    return str;
  }
  
  scanAnds( str ) {
    let list = [ ];
    let splits = [ ];
    
    if (str.includes(' and ')) splits = str.split(' and ');
    else if (str.includes(',')) splits = str.split(',');
    else return; // this string contains no AND, we're done here
    
    // get the four-letter prefix associated with each course in the AND list
    const prefix = splits[0].substr(0, splits[0].indexOf(' '));
    
    splits.forEach(entry => {
      // eliminate whitespace which can occur easily after splitting
      if (entry.startsWith(' ')) entry = entry.substr(1);
      if (entry.endsWith(' ')) entry = entry.substr(0, entry.length - 1);
      
      // eliminate any delimiters that were left over
      entry = entry.replace(',', '');
      
      // prepend prefix if this is part of a list
      if (!entry.match(/^[A-Za-z]/)) entry = prefix + ' ' + entry;
      
      // ignore entries that are not courses (e.g. some text)
      if (this.isCourse(entry)) list.push(entry);
    });
    
    return list;
  }
  
  scanOrs( str ) {
    let list = [ ];
    let splits = [ ];
  
    if (str.includes(' or '))
      splits = str.split(' or ');
    else if (str.includes(' OR '))
      splits = str.split(' OR ');
    else return; // this string contains no AND, we're done here
  
    // get the four-letter prefix associated with each course in the AND list
    const prefix = splits[0].substr(0, splits[0].indexOf(' '));
    
    splits.forEach(entry => {
      // eliminate whitespace which can occur easily after splitting
      if (entry.startsWith(' ')) entry = entry.substr(1);
      if (entry.endsWith(' ')) entry = entry.substr(0, entry.length - 1);
  
      // eliminate any delimiters that were left over
      entry.replace(',', '');
  
      // prepend prefix if this is part of a list
      if (!entry.match(/^[A-Za-z]/)) entry = prefix + ' ' + entry;
    
      if (this.isCourse(entry)) list.push(entry);
    });
  
    if (list.length === 1) return list[0];
    return list;
  }
  
  containsText( elem, match ) {
    return elem.innerHTML.toLowerCase().indexOf(match) > -1;
  }
  
  elementIs( elem, is ) {
    return elem.nodeName.toLowerCase() === is;
  }
  
  formatDegreeTitle( title ) {
    if (title.startsWith('Department of '))
      title = title.substr('Department of '.length);
    
    if (title.endsWith(' Program'))
      title = title.substr(0, title.indexOf(' Program'.length));
    
    return title;
  }
  
  isCourse( str ) {
    return /^((?!(or|and))\w){0,4} ?([0-9]){1,3}L?/.test(str);
  }
  
  isSectionHeader( elem ) {
    return this.elementIs(elem, 'p')
      && this.elementIs(elem.firstChild, 'strong');
  }
  
}

/*let scrapeDegrees = ( ) => {
  parsePrograms()
    .then(result => {
      result.forEach((program) => {
        console.log(program);
        //Degrees.insert(program);
        //console.log(Degrees.findOne({ title: program.title }));
      });
    }).catch(error => {
      console.log('err: ' + error);
    })
};


let parseProgram = ( path ) => {
  return new Promise(resolve => {
    JSDOM.fromURL(
      `https://www.scu.edu/bulletin/undergraduate/chapter-5/${path}.html`
    ).then(dom => {
      const html = dom.window.document.body.querySelector('.markdown-section');
      
      // some pages have more than one degree
      let degrees = [
        {
          title: parseProgramTitle(html.querySelector('h1').innerHTML),
          reqs: [],
        },
      ];
      
      for (let item of html.children) {
        if (item.innerHTML.toLowerCase().indexOf('minor') > -1) break;
        if (item.nodeName.toLowerCase() === 'p' &&
          item.firstChild.nodeName.toLowerCase() === 'strong') {
          if (item.innerHTML.match('Bachelor of ')) {
            if (degrees[0].reqs.length > 0) {
              degrees.push({
                title: item.innerHTML.substr(12),
                reqs: [],
              });
            }
          }
        } else if (item.tagName.toLowerCase() === 'ul') {
          for (let req of item.children) {
            parseRequirement(degrees[degrees.length-1].reqs, req.textContent);
          }
        }
      }
      
      resolve(degrees);
    });
  });
};

let parseProgramTitle = ( title ) => {

};

let parseRequirement = ( list, str ) => {
  
    
    return;
  }
  
  
  
  if (isCourse(str))
    list.push(str);
};

let isCourse = ( str ) => {
  return /^((?!(or|and))\w){0,4} ?([0-9]){1,3}L?$/.test(str);
};*/

export default DegreeScraper;
