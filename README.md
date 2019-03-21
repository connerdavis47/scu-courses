### Santa Clara University 
# SCU Courses

Authors: [Conner Davis](http://connerdavis.xyz), Matthew Wong

Advisor: Dr. Lewis

### What Is This

A web application that suggests class schedules to students at SCU by asking them to provide their degree and classes already taken.

### How Does It Work

100% JavaScript front to back. Node.js interprets our code. Babel converts our ES6 code into JavaScript with proper browser compatibility. Webpack compresses all of our assets, both on the server and client (distinct units), into one package (each). MongoDB creates databases in extremely convenient JSON objects, and can be queried by JSON requests. Meteor is the actual web server accepting clients and forwarding them to the front-end. React is the front-end and abstracts static HTML into dynamic, object-oriented components.

* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [Babel](https://babeljs.io/) - transpiler - converts [ECMAScript 6](https://www.ecma-international.org/ecma-262/6.0/) code to browser-ready JavaScript
* [Webpack](https://webpack.js.org/) - bundler - compresses code and assets into one static package for client and server
* [MongoDB](https://www.mongodb.com/) - database
* [Meteor](https://www.meteor.com/) - web server framework
* [React](https://reactjs.org/) - front end OOP framework
* [Jest](https://jestjs.io/) - testing framework
* [Sass](https://sass-lang.com/) - "CSS with superpowers"

### Installation Guide

You can run the web server yourself on your home computer. All you need is to install [Node.js](https://nodejs.org/en/) and [Meteor](https://www.meteor.com/install). Simply enter your local copy of the project via the terminal, and type the command `meteor`. On macOS and Linux this should be fairly trivial, but Windows machines may need to do some extra work, i.e. updating the PATH to this command.

### Navigation

| Relative path | Purpose |
|---|---|
| ./client | Meteor client-side scripts, JavaScript, React, Sass, CSS, other asset files that will only be loaded on the client side. |
| ./client/assets | Static assets, e.g. multimedia, `.css`. |
| ./client/scss | Sass `.scss` files. |
| ./client/ui | React `.jsx` files. |
| ./client/ui/component | Individual "pieces" or component classes in React. |
| ./client/ui/page | Pages found in the navbar which put several components together. |
| ./doc | Output of JSDoc (`npm run docs`) which creates a Javadoc-like documentation in HTML of the codebase. |
| ./server | Meteor server-side scripts that will only be loaded by the server on the back-end. |
