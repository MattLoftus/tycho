var db = require('../db/connection.js');

module.exports = {
  
  getMetaData: function (callback) {
    db.query('select * from mission'), function (err, missionMeta) {
      if (err) {
        callback(err);
      } else {
        callback(null, missionMeta);
      }
    });
  }
}