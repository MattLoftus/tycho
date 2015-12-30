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

  getCraftEngineData: function (missionID, callback) {
    db.query('select * from spacecraft_engines where mission_id = ?', [missionID], function (err, engineData) {
      if (err) {
        callback(err);
      } else {
        callback(null, engineData);
      }
    });
  },

  getCraftTankData: function (missionID, callback) {
    db.query('select * from spacecraft_tanks where mission_id = ?', [missionID], function (err, tankData) {
      if (err) {
        callback(err);
      } else {
        callback(null, tankData);
      }
    });
  },

  addCraftData: function (craftData, callback) {
    var date = Date.now();
    db.query('insert into craft (mission_id, cabin_pressure, o2_level, co2_level, \
      cycle_rate, o2_storage, h2o_storage, total_power, pv_1_production, \
      pv_1_orientation, pv_2_production, pv_2_orientation, last_updated) \
      values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [craftData.mission_id, craftData.cabin_pressure,
      craftData.o2_level, craftData.co2_level, craftData.cycle_rate, craftData.o2_storage, craftData.h2o_storage,
      craftData.total_power, craftData.pv_1_production, craftData.pv_1_orientation, craftData.pv_2_production,
      craftData.pv_2_orientation, date], function (err, craftData) {
        if (err) {
          callback(err);
        } else {
          callback(null, craftData);
        }
      });
  },

  addCraftEngineData: function (engineData, callback) {
    var date = Date.now();
    db.query('insert into spacecraft_engines (mission_id, engine_type, \
      engine_id, force_thrust, chamber_pressure, chamber_temperature, \
      last_updated) values (?, ?, ?, ?, ?, ?, ?)', [engineData.mission_id,
      engineData.engine_type, engineData.engine_id, engineData.force_thrust, 
      engineData.chamber_pressure, engineData.chamber_temperature, date], 
      function (err, engineData) {
        if (err) {
          callback(err);
        } else {
          callback(null, engineData);
        }
      });
  }, 

  addCraftTankData: function(tankData, callback) {
    var date = Date.now();
    db.query('insert into spacecraft_tanks (mission_id, tank_type, \
      tank_id, fuel_mass, fuel_temp, tank_pressure, last_updated) values \
      (?, ?, ?, ?, ?, ?, ?)', [tankData.mission_id, tankData.tank_type,
      tankData.tank_id, tankData.fuel_mass, tankData.fuel_temp, tankData.tank_pressure,
      date], function (err, tankData) {
        if (err) {
          callback(err);
        } else {
          callback(null, tankData);
        }
      });
  }
}


