var db = require('../db/connection.js');

module.exports = {
  
  getMetaData: function (missionID, callback) {
    db.query('select * from mission where mission_id = ?'), [missionID], function (err, missionMeta) {
      if (err) {
        callback(err);
      } else {
        callback(null, missionMeta);
      }
    });
  }
}