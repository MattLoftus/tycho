//This script will be used to update the database table data
//on an interval to simulate the real time data updating you 
//would see in a mission.
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
var interval = 1000;

setInterval(function () {
  updateEngineData(time);
  time += interval/1000;
}, interval);

//Table updating methos
function updateEngineData (time) {
  for (var i = 0; i < sampleEngines.length; i++) {
    var engine = sampleEngines[i];
    if (time < 9.7) {
      engine.chamber_pressure++;
      engine.exit_pressure++;
      
    }
    if (time < 825) {
      engine.force_thrust++;
      engine.nozzle_temp += 1.3;
      engine.turbopump_speed += .5;
    }
    vehicleModel.updateEngineData(engine, function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log("Added engine:", engine);
      }
    });
  }
}