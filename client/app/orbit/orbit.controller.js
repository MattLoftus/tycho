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

    //TODO: Think about procedures for explicity determining the dimensions
    //of the canvas then calculating all necessary parameters (earth radius,
    //apogee, perigee, etc.) based off of that scale.
    
    //AND how to redefine the properties of ctx based on what we are 
    //drawing at the given moment.

    //How to determine C1-C4 based on a variable trajectory

    //Initialization procedures
    getOrbitalData();
    drawTrajectory();

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

    //Creating the trajectory map
    function drawTrajectory () {
      var canvas = $(".trajectory-canvas")[0];

      //Distance scaling constant
      var D = canvas.height / ( 5 * 6371 );
      var radiusEarth = canvas.height / 5;

      var center = [canvas.width/2, canvas.height/2];
      var ctx = canvas.getContext("2d");
      //Set apogee and perigee
      var perigee = [center[0], center[1] - vm.perigee * D - radiusEarth - 100];
      var apogee = [center[0], center[1] + vm.apogee * D + radiusEarth + 100];
      console.log("Center: ", center);
      console.log("Perigee: ", perigee);
      console.log("Apogee: ", apogee);
 
      //Draw earth
      ctx.beginPath();
      ctx.arc(center[0], center[1], radiusEarth, 0, 2*Math.PI);
      ctx.fillStyle = "#0000A0";
      ctx.fill()
      ctx.strokeStyle = "#0000A0";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.closePath();

      //Draw apogee and perigee
      ctx.beginPath(); 
      ctx.arc(perigee[0], perigee[1], 6, 0, 2*Math.PI);
      ctx.fillStyle = "#FFF";
      ctx.fill()
      ctx.strokeStyle = "#FFF";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(apogee[0], apogee[1], 6, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();

      //Apogee/Perigee text markers
      ctx.font = "20px Helvetica Neue";
      ctx.fillText("Pg", perigee[0] + 8, perigee[1] - 8);
      ctx.fillText("Ap", apogee[0] + 8, apogee[1] - 8);

      //Draw vehicle trajectory
      ctx.beginPath();
      ctx.moveTo(perigee[0], perigee[1]); // A1 (Perigee)
      ctx.setLineDash([3,3]);
      ctx.bezierCurveTo(
        center[0] + 1.5 * radiusEarth, perigee[1], // C1
        center[0] + 1.5 * radiusEarth, apogee[1], // C2
        apogee[0], apogee[1]); // A2 (Apogee)
      ctx.bezierCurveTo(
        center[0] - 1.5 * radiusEarth, apogee[1], // C3
        center[0] - 1.5 * radiusEarth, perigee[1], // C4
        perigee[0], perigee[1]); // A1 (Back to Perigee)
      ctx.strokeStyle = "#FFF";
      ctx.stroke();
      ctx.closePath();

    }
    
  }

})();