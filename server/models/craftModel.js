var db = require('../db/connection.js');

module.exports = {
  getCraftData: function (missionID, callback) {
    db.query('select * from craft where mission_id = ?', [missionID], function (err, craftData) {
      if (err) {
        callback(err);
      } else {
        callback(null, craftData);
      }
    });
  }
}