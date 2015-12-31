// this file will be used to seed our test database with fake data
// run in terminal using npm seed
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

//Methods for inserting sample information into the database
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
