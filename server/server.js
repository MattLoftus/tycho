var express = require('express');
var passport = require('passport');
var path = require('path');
var flash = require('connect-flash');
var session = require('express-session');
var cors = require('cors');

if (process.env.PORT) {
  var auth = require('./config/auth.deploy.js');
} else {
  var auth = require('./config/auth.js');
}

//Our app is an instance of express
var app = express();

//Configure our port for deployment/local development
var port = process.env.PORT || 3000;

app.use(cors());

// required for passport
// app.use(session({ secret: auth.secret }));
app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

//Our app will listen to whatever port we are currently using
app.listen(port);

console.log("Listening on port: ", port);

//export our app for testing and flexibility
module.exports = app;
