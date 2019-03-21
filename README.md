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

### Installation Guide

You can run the web server yourself on your home computer. All you need is to install [Node.js](https://nodejs.org/en/) and [Meteor](https://www.meteor.com/install). Simply enter your local copy of the project via the terminal, and type the command `meteor`. On macOS and Linux this should be fairly trivial, but Windows machines may need to do some extra work, i.e. updating the PATH to this command.
