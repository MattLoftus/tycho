var db = require('../db/connection.js');

module.exports = {
  getVehicleTrajectory: function (callback) {
    db.query('select * from mission', function (err, trajectory) {
      if (err) {
        callback(err);
      } else {
        callback(null, trajectory);
      }
    });
  }  
}