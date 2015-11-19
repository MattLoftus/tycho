var User = require("../models/userModel.js");
var util = require("../config/utilities.js");

module.exports = {

  signup: function(req, res) {
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    
    User.getUserByName(req.body.username, function(err, user) {
      // if there are any errors, return the error
      if (err) {
        console.error(err);
        res.status(500).send();
      }
      // check to see if there's already a user with that email
      if (user.length === 1) {
        return res.status(409).send();
      } else {
        // if there is no user with that email
        // create the user
        var newUser = {
          username: req.body.username,
          password: req.body.password
        };

        User.addUserByLocal(newUser, function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).send();
          } else {
            User.getUserByID(result.insertId, function (err, user) {
              if (err) {
                console.error(err);
                res.status(500).send();
              } else {
                res.status(201).json({ token: util.generateWebToken(user[0]) });
              }
            });
          }

        });
      }
    });
  },

  signin:  function(req, res) { // callback with email and password from our form
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists

    User.getUserByName(req.body.username, function(err, user) {
      // if there are any errors, return the error before anything else
      if (err) {
        console.error(err);
        return res.status(500).send();
      }
      // if no user is found, return the message
      if (user.length === 0) {
        return res.status(404).send();
      }
      // if the user is found but the password is wrong
      if (!util.isValidPassword(req.body.password, user[0].password)) {
        return res.status(422).send();
      }
      // all is well, create new token, save it to database and return it

      var newToken = util.generateWebToken(user[0]);

      return res.status(200).json({ token: newToken });  


    });
  },

  deleteAccount: function (req, res) {
    User.deleteAccount(req.params.userID, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        res.status(204).end();
      }
    })
  }


};