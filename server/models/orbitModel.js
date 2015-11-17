var db = require('../db/connection.js');

module.exports = {
  getVehicleTrajectory: function (missionID, callback) {
    db.query('select * from mission where mission_id = ?', [missionID], function (err, trajectory) {
      if (err) {
        callback(err);
      } else {
        callback(null, trajectory);
      }
    });
  }  
}