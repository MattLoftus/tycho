var db = require('../db/connection.js');

module.exports = {
  
  getEngineForStage: function (missionID, stageID, callback) {
    db.query('select * from engines where mission_id = ? and stage_id = ?', [missionID, stageID], function (err, engineData) {
      if (err) {
        callback(err);
      } else {
        callback(null, engineData);
      }
    });
  },

  getAllEngines: function (missionID, callback) {
    db.query('select * from engines where mission_id = ?', [missionID], function (err, engineData) {
      if (err) {
        callback(err);
      } else {
        callback(null, engineData);
      }
    });
  },

  getTankData: function (missionID, stageID, callback) {
    db.query('select * from engines where mission_id = ? and stage_id = ?', [missionID, stageID], function (err, tankData) {
      if (err) {
        callback(err);
      } else {
        callback(null, tankData);
      }
    });
  }
}