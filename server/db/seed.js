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
  inclination: 2.5,
  target_apogee: 150,
  target_perigee: 97,
  target_inclination: 12
}];

var sampleCraft = [{
  mission_id: 1,
  cabin_pressure: 100,
  o2_level: 100,
  co2_level: 100,
  cycle_rate: 100,
  o2_storage: 100,
  h2o_storage: 100,
  total_power: 100,
  pv_1_production: 100,
  pv_1_orientation: 100,
  pv_2_production: 100,
  pv_2_orientation: 100,  
}];

var sampleEngines = [
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 1,
    chamber_pressure: 87.0,
    exit_pressure: 95.0,
    force_thrust: 100.0,
    nozzle_temp: 872.0,
    turbopump_speed: 432.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 2,
    chamber_pressure: 87.0,
    exit_pressure: 95.0,
    force_thrust: 100.0,
    nozzle_temp: 872.0,
    turbopump_speed: 432.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 3,
    chamber_pressure: 87.0,
    exit_pressure: 95.0,
    force_thrust: 100.0,
    nozzle_temp: 872.0,
    turbopump_speed: 432.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 4,
    chamber_pressure: 87.0,
    exit_pressure: 95.0,
    force_thrust: 100.0,
    nozzle_temp: 872.0,
    turbopump_speed: 432.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 5,
    chamber_pressure: 87.0,
    exit_pressure: 95.0,
    force_thrust: 100.0,
    nozzle_temp: 872.0,
    turbopump_speed: 432.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 6,
    chamber_pressure: 87.0,
    exit_pressure: 95.0,
    force_thrust: 100.0,
    nozzle_temp: 872.0,
    turbopump_speed: 432.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 7,
    chamber_pressure: 87.0,
    exit_pressure: 95.0,
    force_thrust: 100.0,
    nozzle_temp: 872.0,
    turbopump_speed: 432.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 8,
    chamber_pressure: 87.0,
    exit_pressure: 95.0,
    force_thrust: 100.0,
    nozzle_temp: 872.0,
    turbopump_speed: 432.0
  },
  {
    mission_id: 1,
    stage_num: 1,
    engine_num: 9,
    chamber_pressure: 87.0,
    exit_pressure: 95.0,
    force_thrust: 100.0,
    nozzle_temp: 872.0,
    turbopump_speed: 432.0
  },
  {
    mission_id: 1,
    stage_num: 2,
    engine_num: 10,
    chamber_pressure: 87.0,
    exit_pressure: 95.0,
    force_thrust: 100.0,
    nozzle_temp: 872.0,
    turbopump_speed: 432.0
  }
];

var sampleCraftEngines = [
  {
    mission_id: 1,
    engine_type: "superdraco",
    engine_id: "SD-1",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "superdraco",
    engine_id: "SD-2",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "superdraco",
    engine_id: "SD-3",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "superdraco",
    engine_id: "SD-4",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B1-1",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B1-2",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B1-3",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B1-4",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B2-1",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B2-2",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B2-3",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B2-4",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B3-1",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B3-2",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B3-3",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B3-4",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B4-1",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B4-2",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B4-3",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  },
  {
    mission_id: 1,
    engine_type: "rcs",
    engine_id: "B4-4",
    force_thrust: 123,
    chamber_pressure: 27,
    chamber_temperature: 456
  }
];

var sampleTanks = [
  {
    mission_id: 1,
    stage_num: 1,
    fuel_type: "RP1",
    tank_pressure: 1,
    fuel_volume: 150.0,
    fuel_mass: 100,
    fuel_temp: 145.0,
    intake: "closed",
    outake: "open"
  },
  {
    mission_id: 1,
    stage_num: 1,
    fuel_type: "LOX",
    tank_pressure: 1,
    fuel_volume: 150.0,
    fuel_mass: 100,
    fuel_temp: 145.0,
    intake: "closed",
    outake: "open"
  },
  {
    mission_id: 1,
    stage_num: 2,
    fuel_type: "RP1",
    tank_pressure: 1,
    fuel_volume: 150.0,
    fuel_mass: 100,
    fuel_temp: 145.0,
    intake: "closed",
    outake: "open"
  },
  {
    mission_id: 1,
    stage_num: 2,
    fuel_type: "LOX",
    tank_pressure: 1,
    fuel_volume: 150.0,
    fuel_mass: 100,
    fuel_temp: 145.0,
    intake: "closed",
    outake: "open"
  }

];

var sampleCraftTanks = [
  {
    mission_id: 1,
    tank_type: "superdraco",
    tank_id: "SD-1",
    fuel_mass: 75,
    fuel_temp: 123,
    tank_pressure: 23
  },
  {
    mission_id: 1,
    tank_type: "superdraco",
    tank_id: "SD-2",
    fuel_mass: 75,
    fuel_temp: 123,
    tank_pressure: 23
  },
  {
    mission_id: 1,
    tank_type: "superdraco",
    tank_id: "SD-3",
    fuel_mass: 75,
    fuel_temp: 123,
    tank_pressure: 23
  },
  {
    mission_id: 1,
    tank_type: "superdraco",
    tank_id: "SD-4",
    fuel_mass: 75,
    fuel_temp: 123,
    tank_pressure: 23
  },
  {
    mission_id: 1,
    tank_type: "rcs",
    tank_id: "B1",
    fuel_mass: 75,
    fuel_temp: 123,
    tank_pressure: 23
  },
  {
    mission_id: 1,
    tank_type: "rcs",
    tank_id: "B2",
    fuel_mass: 75,
    fuel_temp: 123,
    tank_pressure: 23
  },
  {
    mission_id: 1,
    tank_type: "rcs",
    tank_id: "B3",
    fuel_mass: 75,
    fuel_temp: 123,
    tank_pressure: 23
  },
  {
    mission_id: 1,
    tank_type: "rcs",
    tank_id: "B4",
    fuel_mass: 75,
    fuel_temp: 123,
    tank_pressure: 23
  }
];

function run () {
  addUsers();
  addMissionData();
  addCraftData();
  addEngineData();
  addTankData();
  addCraftEngineData();
  addCraftTankData();
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
    var engine = sampleEngines[i];
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
    var tank = sampleTanks[i];
    vehicleModel.addTankData(tank, function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log("Added tank:", tank);
      }
    });
  }
}

function addCraftEngineData() {
  for (var i = 0; i < sampleCraftEngines.length; i++) {
    var engine = sampleCraftEngines[i];
    craftModel.addCraftEngineData(engine, function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log("Added spacecraft engine:", engine);
      }
    });
  }
}

function addCraftTankData() {
    for (var i = 0; i < sampleCraftTanks.length; i++) {
      var tank = sampleCraftTanks[i];
      craftModel.addCraftTankData(tank, function (err, result) {
        if (err) {
          console.error(err);
        } else {
          console.log("Added spacecraft tank:", tank);
        }
      });
    } 

}
