(function() {
  'use strict';

  angular.module('app')
  .controller('CraftController', CraftController);

  CraftController.$inject = ['Spacecraft'];

  function CraftController (Spacecraft) {
    var vm = this;

    //view model properties and methods
    vm.craftID = 0;
    vm.missionID = 0;
    vm.power = 0
    vm.cabinPressure = 0;
    vm.monoprop = 0;
    vm.timestamp = 0;

    //Initialization procedures
    getCraftData();

    //scope methods

    //non-scope methods
    function getCraftData () {
      Spacecraft.getCraftData(vm.missionID)
        .then(function (craftData) {
          vm.missionID = craftData.mission_id;
          vm.power = craftData.power;
          vm.cabinPressure = craftData.cabin_pressure;
          vm.monoprop = craftData.monoprop;
          vm.timestamp = craftData.last_updated;
        });
    }
    
  }

})();