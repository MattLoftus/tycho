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
  },

  addCraftData: function (craftData, callback) {
    var date = Date.now();
    db.query('insert into craft (mission_id, power, cabin_pressure, monoprop, \
      last_updated) values (?, ?, ?, ?, ?)', [craftData.mission_id, craftData.power, 
      craftData.cabin_pressure, craftData.monoprop, date], function (err, craftData) {
        if (err) {
          callback(err);
        } else {
          callback(null, craftData);
        }
      });
  }
}