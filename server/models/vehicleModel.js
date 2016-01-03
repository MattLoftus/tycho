var db = require('../db/connection.js');

module.exports = {
  
  getEngineForStage: function (missionID, stageNo, callback) {
    db.query('select * from engines where mission_id = ? and stage_num = ?', [missionID, stageNo], function (err, engineData) {
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

  getTankData: function (missionID, stageNo, callback) {
    db.query('select * from tanks where mission_id = ? and stage_num = ?', [missionID, stageNo], function (err, tankData) {
      if (err) {
        callback(err);
      } else {
        callback(null, tankData);
      }
    });
  }, 

  getAllTanks: function (missionID, callback) {
    db.query('select * from tanks where mission_id = ?', [missionID], function (err, tankData) {
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
      chamber_pressure, exit_pressure, force_thrust, nozzle_temp, \
      turbopump_speed, last_updated) values (?, ?, ?, ?, \
      ?, ?, ?, ?, ?)', [engineData.mission_id, engineData.stage_num, engineData.engine_num,
      engineData.chamber_pressure, engineData.exit_pressure, engineData.force_thrust, 
      engineData.nozzle_temp, engineData.turbopump_speed, date], function (err, engineData) {
        if (err) {
          callback(err);
        } else {
          callback(null, engineData);
        }
      });
  }, 

  addTankData: function (tankData, callback) {
    var date = Date.now();
    db.query('insert into tanks (mission_id, stage_num, fuel_type, tank_pressure, fuel_volume, \
      fuel_mass, fuel_temp, fuel_intake, fuel_outtake, he_bottle_status, pump_status, \
      last_updated) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [tankData.mission_id, 
      tankData.stage_num, tankData.fuel_type, tankData.tank_pressure, tankData.fuel_volume, 
      tankData.fuel_mass, tankData.fuel_temp, tankData.fuel_intake, tankData.fuel_outtake, 
      tankData.he_bottle_status, tankData.pump_status, date], function (err, tankData) {
        if (err) {
          callback(err);
        } else {
          callback(null, tankData);
        }
      });
  },

  updateEngineData: function (engineData, callback) {
    var date = Date.now();
    db.query('update engines set stage_num = ?, chamber_pressure = ?, exit_pressure = ?, \
      force_thrust = ?, nozzle_temp = ?, turbopump_speed = ?, last_updated = ? where \
      (mission_id = ? and engine_num = ?)', [engineData.stage_num,
      engineData.chamber_pressure, engineData.exit_pressure, engineData.force_thrust, 
      engineData.nozzle_temp, engineData.turbopump_speed, date, engineData.mission_id, 
      engineData.engine_num], function (err, engineData) {
        if (err) {
          callback(err);
        } else {
          callback(null, engineData);
        }
      });
  },
  updateTankData: function (tankData, callback) {
    var date = Date.now();
    db.query('update tanks set fuel_volume = ? where (stage_num = ? and \
      fuel_type = ?)', [tankData.fuel_volume, tankData.stage_num, tankData.fuel_type], 
      function (err, tankData) {
        if (err) {
          callback(err);
        } else {
          callback(null, tankData);
        }
      });
  } 

}
