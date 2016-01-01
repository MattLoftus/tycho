(function() {
  'use strict';

  angular.module('app')
  .controller('EnginesController', EnginesController);

  EnginesController.$inject = ['$window', 'Mission', 'Vehicle'];

  function EnginesController ($window, Mission, Vehicle) {

    var vm = this;

    //view model properties
    vm.missionID = $window.localStorage.missionID;
    vm.engines = {};
    vm.cpThreshold = 9.7 // (9.7 MPa) Upper tolerance for chamber pressure
    vm.nozzTempThresh = 2500; // (2500 K) Upper tolerance nozzle temperature

    //Initialization
    //Fetch engine data once per second
    getEngineData();
    setInterval(getEngineData, 1000);

    //Scope methods
    //Non-scope methods



    //Get all engine data for both rocket stages
    function getEngineData() {
      Vehicle.getAllEngines(vm.missionID)
        .then(function (engineData) {
          console.log(engineData);
          for (var i = 0; i < engineData.length; i++) {
            var engine = engineData[i];
            vm.engines[engine.engine_num] = engine;
            checkStatus(vm.engines[engine.engine_num]);
          }
          console.log(vm.engines);
        });
    }

    //Check levels of engine data values against predefined
    //thresholds and determine appropriate status
    function checkStatus(engine) {
      if (engine.chamber_pressure > vm.cpThreshold) {
        throwCaution(engine.engine_num, " .chamber_pressure");
      }
      if (engine.nozzle_temp > vm.nozzTempThresh) {
        throwCaution(engine.engine_num, " .nozzle_temp");
      }
    }

    //Change data value text color to yellow, and 
    //change status to "warning" for the given engine
    function throwCaution(engineNo, type) {
      var baseSelector = ".engine-" + engineNo;
      $(baseSelector + " .status").addClass("warning");
      $(baseSelector + type).addClass("warning");
    }

    function throwCritical(engineNo) {

    }

    
  }

})();