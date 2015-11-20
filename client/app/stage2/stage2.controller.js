(function() {
  'use strict';

  angular.module('app')
  .controller('Stage2Controller', Stage2Controller);

  Stage2Controller.$inject = ['$window', 'Vehicle'];

  function Stage2Controller($window, Vehicle) {
    var vm = this;

    //NOTE: This will ultimately probably vary depending
    //on the vehicle configuration and mission type. For 
    //now we make the assumption of a 9 engine stage

    //view model properties and methods
    vm.missionID = $window.localStorage.missionID;
    vm.stageNo = 2;
    vm.engines = {};
    vm.tanks = {};



    //initialization procedures

    //scope methods

    //non-scope methods
    function getDataForStage () {
      Vehicle.getEngineForStage(vm.missionID, vm.stageNo)
        .then(function (engineData) {
          console.log("The engine data for stage 1 is: ", engineData);
          for (var i = 0; i < engineData.length; i++) {
            var engine = engineData[i];
            vm.engines[engine.engine_num] = {
              id: engine.id,
              engineNo: engine.engine_num,
              missionID: engine.mission_id,
              stageNo: engine.stage_num,
              engineNo: engine.engine_num,
              chamberPressure: engine.chamber_pressure,
              forceThrust: engine.force_thrust,
              timestamp: engine.last_updated
            };
          }
        });

      Vehicle.getTankData(wm.missionID, vm.stageNo)
        .then(function (tankData) {
          console.log("The tank data for tage 1 is: ", tankData);
          for (var i = 0; i < tankData.length; i++) {
            var tank = tankData[i];
            vm.tanks[tank.fuel_type] = {
              id: tank.id,
              missionID: tank.missionID,
              stageNo: tank.stage_num,
              fuelType: tank.fuel_type,
              fuelPressure: tank.fuel_pressure,
              fuelVolume: tank.fuel_volume,
              fuelMass: tank.fuel_mass,
              timestamp: tank.last_updated
            };
          }
        });
    }

  }

})();