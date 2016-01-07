var userController = require('../controllers/userController.js');
var expressJWT = require('express-jwt');

if (process.env.PORT) {
  var auth = require('../config/auth.deploy.js');
} else {
  var auth = require('../config/auth.js');
}

module.exports = function (app, passport) {
  //app === userRouter injected from middlware.js
  
}