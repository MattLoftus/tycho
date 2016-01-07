var expressJWT = require('express-jwt');

if (process.env.PORT) {
  var auth = require('../config/auth.deploy.js');
} else {
  var auth = require('../config/auth');
}

var authController = require('../controllers/authController.js');
// load helpers
var util = require('../config/utils.js');

module.exports = function (app, passport) {

  app.post('/signup', authController.signup);

  app.post('/signin', authController.signin);

  // route for logging out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
}