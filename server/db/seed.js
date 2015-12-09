// this file will be used to seed our test database with fake data
// run in terminal using npm seed
var craftModel = require('../models/craftModel.js');
var missionModel = require('../models/missionModel.js');
var userModel = require('../models/userModel.js');
var vehicleModel = require('../models/vehicleModel.js');

//Create sample arrays of data to store in the DB.
var sampleUsers = [{
  username: "mattloftus",
  email: "matthew.a.loftus@gmail.com",
  password: "space"
}];

var sampleMission = [{
  name: "endurance",
  velocity: 100.2,
  heading: 37.1,
  altitude: 50.1,
  latitude: 37.0,
  longitude: 35.0,
  apogee: 97,
  perigee: 74,
  inclination: 2.5
}];

var sampleCraft = [{
  mission_id: 1,
  power: 100,
  cabin_pressure: 1.2,
  monoprop: 52.2
}];

var sampleEngines = [
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 1,
    chamber_pressure: 87.0,
    force_thrust: 100.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 2,
    chamber_pressure: 87.0,
    force_thrust: 100.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 3,
    chamber_pressure: 87.0,
    force_thrust: 100.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 4,
    chamber_pressure: 87.0,
    force_thrust: 100.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 5,
    chamber_pressure: 87.0,
    force_thrust: 100.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 6,
    chamber_pressure: 87.0,
    force_thrust: 100.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 7,
    chamber_pressure: 87.0,
    force_thrust: 100.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 8,
    chamber_pressure: 87.0,
    force_thrust: 100.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 9,
    chamber_pressure: 87.0,
    force_thrust: 100.0
  },
  {
    mission_id: 1,
    stage_num: 2,
    engine_num: 1,
    chamber_pressure: 87.0,
    force_thrust: 100.0
  }
];

var sampleTanks = [
  {
    mission_id: 1,
    stage_num: 1,
    fuel_type: "RP1",
    tank_pressure: 1,
    fuel_volume: 150.0,
    fuel_mass: 100
  },
  {
    mission_id: 1,
    stage_num: 1,
    fuel_type: "LOX",
    tank_pressure: 1,
    fuel_volume: 150.0,
    fuel_mass: 100
  },
  {
    mission_id: 1,
    stage_num: 2,
    fuel_type: "RP1",
    tank_pressure: 1,
    fuel_volume: 150.0,
    fuel_mass: 100
  },
  {
    mission_id: 1,
    stage_num: 2,
    fuel_type: "LOX",
    tank_pressure: 1,
    fuel_volume: 150.0,
    fuel_mass: 100
  },

];

function run () {
  addUsers();
  addMissionData();
  addCraftData();
  addEngineData();
  addTankData();
};
run();


//Methods for inserting sampkle information into the database
function addUsers () {
  for (var i = 0; i < sampleUsers.length; i++) {
    var user = sampleUsers[i];
    userModel.addUserByLocal(user, function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log("Added user:", user);
      }
    });
  }
}

function addMissionData () {
  for (var i = 0; i < sampleMission.length; i++) {
    var mission = sampleMission[i];
    missionModel.addMissionData(mission, function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log("Added mission:", mission);
      }
    });
  }
}

function addCraftData () {
  for (var i = 0; i < sampleCraft.length; i++) {
    var craft = sampleCraft[i];
    craftModel.addCraftData(craft, function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log("Added craft:", craft);
      }
    });
  }
}

function addEngineData () {
  for (var i = 0; i < sampleEngines.length; i++) {
    var engine = sampleEngine[i];
    vehicleModel.addEngineData(engine, function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log("Added engine:", engine);
      }
    });
  }
}

function addTankData () {
  for (var i = 0; i < sampleTanks.length; i++) {
    var tank = sampleTank[i];
    vehicleModel.addTankData(tank, function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log("Added tank:", tank);
      }
    });
  }
}
