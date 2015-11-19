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
      altitude, latitude, longitude, created_at, apogee, perigee, \
      inclination) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [missionData.name, missionData.veloctiy, missionData.heading, 
      missionData.altitude, missionData.latitude, missionData.longitude,
      date, missionData.apogee, missionData.perigee, missionData.inclination], 
      function (err,  missionData) {
        if (err) {
          callback(err);
        } else {
          callback(null, missionData);
        }
      })
  }
}