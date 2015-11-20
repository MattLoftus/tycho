(function() {
  'use strict';

  angular.module('app')
  .controller('MissionController', MissionController);

  MissionController.$inject = ['$window', 'Mission'];

  function MissionController ($window, Mission) {
    var vm = this;

    //View model properties and methods
    vm.missionID = $window.localStorage.missionID;
    vm.missionName = '';
    vm.heading = 0;
    vm.velocity = 0;
    vm.altitude = 0;
    vm.latitude = 0;
    vm.longitude = 0;
    vm.apogee = 0;
    vm.perigee = 0;
    vm.inclination = 0;
    vm.timestamp;

    //Initialization procedures
    getMissionMeta();

    //Scope methods

    //Non scope methods
    function getMissionMeta () {
      Mission.getMissionMeta(vm.missionID) 
        .then(function (missionData) {
          console.log("The mission data is: ", missionData);
          vm.missionID = missionData.id;
          vm.missionName = missionData.name;
          vm.heading = missionData.heading;
          vm.velocity = missionData.velocity;
          vm.altitude = missionData.altitude;
          vm.latitude = missionData.latitude;
          vm.longitude = missionData.longitude;
          vm.apogee = missionData.apogee;
          vm.perigee = missionData.perigee;
          vm.inclination = missionData.inclination;
          vm.timestamp = missionData.last_updated;
        });
    }
    
  }

})();