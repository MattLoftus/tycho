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
  },

  addMissionData: function (missionData, callback) {
    date = Date.now();
    db.query('insert into mission (name, velocity, heading, \
      altitude, latitude, longitude, apogee, perigee, \
      inclination, created_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [missionData.name, missionData.veloctiy, missionData.heading, 
      missionData.altitude, missionData.latitude, missionData.longitude,
      missionData.apogee, missionData.perigee, missionData.inclination, date], 
      function (err,  missionData) {
        if (err) {
          callback(err);
        } else {
          callback(null, missionData);
        }
      })
  }
}