(function() {
  'use strict';

  angular.module('app')
  .controller('OrbitController', OrbitController);

  OrbitController.$inject = ['$window', 'Mission'];

  function OrbitController ($window, Mission) {
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
    getOrbitalData();

    //Scope methods

    //Non scope methods
    function getOrbitalData () {
      Mission.getMissionMeta(vm.missionID) 
        .then(function (orbitData) {
          console.log("The orbit data is: ", orbitData)
          vm.missionID = orbitData.id;
          vm.missionName = orbitData.name;
          vm.heading = orbitData.heading;
          vm.velocity = orbitData.velocity;
          vm.altitude = orbitData.altitude;
          vm.latitude = orbitData.latitude;
          vm.longitude = orbitData.longitude;
          vm.apogee = orbitData.apogee;
          vm.perigee = orbitData.perigee;
          vm.inclination = orbitData.inclination;
          vm.timestamp = orbitData.last_updated;
        });
    }

    
  }

})();