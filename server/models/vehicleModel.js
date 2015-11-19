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
  }, 

  addEngineData: function (engineData, callback) {
    var date = Date.now();
    db.query('insert into engines (mission_id, stage_num, engine_num, \
      chamber_pressure, force_thrust, last_updated) values (?, ?, ?, ?, \
      ?, ?)', [engineData.mission_id, engineData.stage_num, engineData.engine_num,
      engineData.chamber_pressure, engineData.force_thrust, date], function (err, engineData) {
        if (err) {
          callback(err);
        } else {
          callback(null, engineData);
        }
      });
  }, 

  addTankData: function (tankData, callback) {
    var date = Date.now();
    db.query('insert into tanks (mission_id, stage_num, tank_pressure, fuel_volume, 
      fuel_mass, last_updated) values (?, ?, ?, ?, ?, ?)', [tankData.mission_id, 
      tankData.stage_num, tankData.tank_pressure, tankData.fuel_volume, tankData.fuel_mass,
      date], function (err, tankData) {
        if (err) {
          callback(err);
        } else {
          callback(null, tankData);
        }
      })
  }

}
