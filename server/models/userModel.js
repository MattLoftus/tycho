//Require DB connection
var db = require('../db/connection.js');
var bcrypt = require('bcrypt-nodejs');

if (process.env.PORT) {
  var auth = require('../config/auth.deploy.js');
} else {
  var auth = require("../config/auth.js");
}

module.exports = {

  getUserByID: function (id, callback) {
    // we don't need a password since a profile is viewable by anyone
    db.query('select id, username from users where id = ?', [id], function (err, userObj) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, userObj);
      }
    });
  },

  getUserByName: function (username, callback) {
    db.query('select id, username, password from users where username = ?', [username], function (err, user) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, user);
      }
    })
  },

  addUserByLocal: function (data, callback) {
  
    var password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
  
    db.query('insert into users (username, password) values (?, ?)', [data.username, password], function (err, res) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
  },

  deleteAccount: function (userID, callback) {
    db.query('delete from users where id = ?', [userID], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  }

}