var db = require('../db/connection.js');

module.exports = {
  
  getMetaData: function (missionID, callback) {
    db.query('select * from mission where id = ?', [missionID], function (err, missionMeta) {
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
      inclination, target_apogee, target_perigee, target_inclination, \
      last_updated) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [missionData.name, missionData.velocity, missionData.heading, 
      missionData.altitude, missionData.latitude, missionData.longitude,
      missionData.apogee, missionData.perigee, missionData.inclination,
      missionData.target_apogee, missionData.target_perigee, 
      missionData.target_inclination, date], 
      function (err,  missionData) {
        if (err) {
          callback(err);
        } else {
          callback(null, missionData);
        }
      });
  }
}