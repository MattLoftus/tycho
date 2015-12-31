var craftModel = require('../models/craftModel.js');
var missionModel = require('../models/missionModel.js');
var userModel = require('../models/userModel.js');
var vehicleModel = require('../models/vehicleModel.js');
var sampleData = require('./sample_data.js');

//Create sample arrays of data to store in the DB.
var sampleUsers = sampleData.sampleUsers;
var sampleMission = sampleData.sampleMission;
var sampleCraft = sampleData.sampleCraft;
var sampleEngines = sampleData.sampleEngines;
var sampleCraftEngines = sampleData.sampleCraftEngines;
var sampleTanks = sampleData.sampleTanks;
var sampleCraftTanks = sampleData.sampleCraftTanks;

var time = 0;
var interval = 5000;

setInterval(function () {
  updateEngineData();
  time += interval;
}, interval);

//Methods for updating datasets in the database
function updateEngineData (time) {
  for (var i = 0; i < sampleEngines.length; i++) {
    var engine = sampleEngines[i];
    engine.chamber_pressure++;
    engine.exit_pressure++;
    engine.force_thrust++;
    engine.nozzle_temp++;
    engine.turbopump_speed++;
    vehicleModel.updateEngineData(engine, function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log("Added engine:", engine);
      }
    });
  }
}