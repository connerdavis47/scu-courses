### Santa Clara University 
# SCU Courses

Authors: [Conner Davis](http://connerdavis.xyz), Matthew Wong

Advisor: Dr. Lewis

### What is this

A web application that suggests class schedules to students at Santa Clara based on their degree progress.

### How does it work

100% JavaScript front to back.

* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [Babel](https://babeljs.io/) - transpiler - converts [ECMAScript 7](https://www.ecma-international.org/ecma-262/7.0/) into browser-friendly JavaScript
* [Webpack](https://webpack.js.org/) - bundler - compresses code and assets into one static package for client and server
* [MongoDB](https://www.mongodb.com/) - database
* [Meteor](https://www.meteor.com/) - web server framework
* [React](https://reactjs.org/) - front end OOP framework
* [Sass](https://sass-lang.com/) - CSS preprocessor

### Installation

You can run the web server yourself on your home computer. All you need is to install [Node.js](https://nodejs.org/en/) and [Meteor](https://www.meteor.com/install). Simply enter your local copy of the project via the terminal, and type the command `meteor`. On macOS and Linux this should be fairly trivial, but Windows machines may need to do some extra work, i.e. updating the PATH to include this command.

### Where does it get the Core Curriculum / major degree requirements?

We scrape the public [Santa Clara University Undergraduate Bulletin](https://www.scu.edu/bulletin/undergraduate/) with a Node.js package called [JSDom](https://github.com/jsdom/jsdom). The scraper is entirely in `imports/startup/server/scrape.js`. You can refer to this file for detailed documentation on the inner workings.

### What about the class search / auto-complete search features?

Santa Clara University IT wrote a super robust and easy-to-use API that publishes each new quarters' available class list. This is what powers CourseAvail. You can search the API by any parameter and it will return all matching results. We didn't really do a whole lot of the work in this regard.

### And the schedule suggestion algorithm?

The suggestion algorithm works by solving two smaller problems and stringing them together. First, the scraper creates a data form that consistently describes a list of course requirements. These are generally course strings, like "COEN 12", which denote a single option, and arrays, like [ "COEN 12", "COEN 45" ], which denote an option to choose either. All other requirements the parser finds will be ultimately ignored, because they are too arbitrary.

Second, we use this master list to search for all of the classes the student has not yet taken but could take to get closer to their major via the API. Quite simply, we search for all available sections of each course, then match schedules that do not create time conflicts, and fit within a specified range of units (e.g. no more than 20).

The obvious downfall is that the parser simply cannot interpret every single line as what it actually means. Therefore, many sections are outright ignored by the algorithm because they are too arbitrary. Unless the subtle language used to describe course requirements is dramatically streamlined, we can't really eliminate this range of error.

### Navigation

| Relative path | Purpose |
|---|---|
| `client/main.jsx` | Code that should be run when clients are started, effectively the React entry point |
| `client/main.html` | Generic HTML template surrounding React entry point |
| `client/assets/` | Static assets, like photos or videos |
| `client/scss/` | SASS preprocessor code |
| `imports/api/degrees/` | Mongo model of `Degrees` stored by parser |
| `imports/startup/server/` | Files that should be executed when the server starts |
| `imports/ui/App.jsx` | Highest-level React component that is included at `client/main.jsx` |
| `imports/ui/component/` | React JSX components that are assembled on pages |
| `imports/ui/page/` | React JSX components that build other components together and are routed to as pages |
| `server/main.js` | A reference to `imports/startup/server/` scripts, executing them on server startup |
