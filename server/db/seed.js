// this file will be used to seed our test database with fake data
// run in terminal using npm seed
var faker = require('faker');
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
  mission_id: 1;
  power: 100,
  cabin_pressure: 1.2,
  monoprop: 52.2
}];

var sampleEngine = [{
  mission_id: 1,
  stage_num: 1,
  engine_num: 1,
  chamber_pressure: 87.0,
  force_thrust: 100.0,
  created_at: 100,
  last_updated: 1
}];

var sampleTank = [{
  mission_id: 1,
  stage_num: 1,
  tank_pressure: 1,
  fuel_volume: 150.0,
  fuel_mass: 100,
  created_at: 100,
  last_updated: 1
}];


//Methods for inserting sampkle information into the database
function addUsers () {
  for (var i = 0; i < sampleUsers.length; i++) {
    var user = sampleUsers[i];
    userModel.addUserByLocal(newUser, function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log("Added user:", newUser);
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
  for (var i = 0; i < sampleEngine.length; i++) {
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
  for (var i = 0; i < sampleTank.length; i++) {
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