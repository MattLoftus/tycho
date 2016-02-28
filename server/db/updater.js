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
  updateTankData(time);
  time += interval/1000;
}, interval);

//Table updating methos

//Update main engine data
function updateEngineData (time) {
  for (var i = 0; i < sampleEngines.length; i++) {
    var engine = sampleEngines[i];
    if (time < 8) {
      engine.chamber_pressure += .8;
      engine.exit_pressure++;
      
    }
    if (engine.engine_num === 3 && time < 20) {
      engine.chamber_pressure += .2;
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
        console.log("updated engine:", engine);
      }
    });
  }
}

//Update main fuel tank data
//Stage sep: 144 sec. 2nd stage start: 155 sec, shutdown: 600sec 
function updateTankData(time) {
  var flowRateS1LOX = 857.1429;
  var flowRateS1RP1 = 571.429;
  var flowRateS2LOX = 60.674;
  var flowRateS2RP1 = 35.955;
  if (time < 144) {
    sampleTanks[0].fuel_volume -= flowRateS1RP1;
    vehicleModel.updateTankData(sampleTanks[0], function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log("updated tank", sampleTanks[0]);
      }
    });
    sampleTanks[1].fuel_volume -= flowRateS1LOX;
    vehicleModel.updateTankData(sampleTanks[1], function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log("updated tank", sampleTanks[1]);
      }
    });
  } else if (time >= 155 && time < 600) {
    sampleTanks[2].fuel_volume -= flowRateS2RP1;
    vehicleModel.updateTankData(sampleTanks[2], function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log("updated tank", sampleTanks[2]);
      }
    });
    sampleTanks[3].fuel_volume -= flowRateS2LOX;
    vehicleModel.updateTankData(sampleTanks[3], function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log("updated tank", sampleTanks[3]);
      }
    });
  }
}









