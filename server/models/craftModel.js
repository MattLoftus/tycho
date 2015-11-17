var db = require('../db/connection.js');

module.exports = {
  getCraftData: function (callback) {
    db.query('select * from craft', function (err, craftData) {
      if (err) {
        callback(err);
      } else {
        callback(null, craftData);
      }
    });
  }
}