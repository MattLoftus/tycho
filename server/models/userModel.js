//Require DB connection
var db = require('../db/connection.js');
var bcrypt = require('bcrypt-nodejs');
var auth = require("../config/auth");

module.exports = {

  getUserByID: function (id, callback) {
    // we don't need a password since a profile is viewable by anyone
    db.query('select id, username, email, read_scoped_key, write_scoped_key, about, tessel, location from users where id = ?', [id], function (err, userObj) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, userObj);
      }
    });
  },

  getUserByName: function (username, callback) {
    db.query('select id, username, password, email, read_scoped_key, write_scoped_key, about, tessel, location from users where username = ?', [username], function (err, user) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, user);
      }
    })
  },

  addUserByLocal: function (data, callback) {
  
    var password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
  
    db.query('insert into users (username, password, email, read_scoped_key, write_scoped_key, profile_photo) values (?, ?, ?, ?, ?, ?)', [data.username, password, data.email, readScopedKey, writeScopedKey, data.photo], function (err, res) {
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