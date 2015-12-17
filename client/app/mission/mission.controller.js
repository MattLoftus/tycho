(function() {
  'use strict';

  angular.module('app')
  .controller('MissionController', MissionController);

  MissionController.$inject = ['$window', 'Mission', 'Vehicle'];

  function MissionController ($window, Mission, Vehicle) {
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
    vm.engines = {
      "stage1": [],
      "stage2": []
    };
    vm.tanks = {
      "stage1": [],
      "stage2": []
    };

    //Initialization procedures
    getMissionMeta();
    getEngineData();
    getTankData();
    drawTrajectory();
    s1EngineGraphic();

    //Scope methods

    //Non scope methods
    function getMissionMeta () {
      Mission.getMissionMeta(vm.missionID) 
        .then(function (missionData) {
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

    //Get all engine data for both rocket stages
    function getEngineData () {
      Vehicle.getAllEngines(vm.missionID)
        .then(function (engineData) {
          for (var i = 0; i < engineData.length; i++) {
            var engine = engineData[i];
            if (engine.stage_num === 1) {
              vm.engines.stage1.push(engine);
            } else if (engine.stage_num === 2) {
              vm.engines.stage2.push(engine);
            }
          }
        });
    }

    //Get all fuel tank data for both rocket stages
    function getTankData () {
      Vehicle.getAllTanks(vm.missionID)
        .then(function (tankData) {
          for (var i = 0; i < tankData.length; i++) {
            var tank = tankData[i];
            if (tank.stage_num === 1) {
              vm.tanks.stage1.push(tank);
            } else if (tank.stage_num === 2) {
              vm.tanks.stage2.push(tank);
            }
          }
        });
    }

    //Creating the trajectory map
    function drawTrajectory () {
      var canvas = $(".trajectory-canvas")[0];
      console.log(canvas);

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

    //Create Stage 1 engine graphic
    function s1EngineGraphic () {
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, $window.innerWidth/$window.innerHeight, 0.1, 1000 );
      camera.position.set(0,0,300)

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( $window.innerWidth * .3, $window.innerHeight * .3 );
      $(".s1-engine-graphic").append( renderer.domElement );

      var light = new THREE.AmbientLight( 0x888888 )
      scene.add( light )

      var light = new THREE.DirectionalLight( 0xcccccc, 1 )
      light.position.set(5,3,5)
      scene.add( light )

      var radius = 50;
      var segments = 50;
      var geometry = new THREE.CircleGeometry(radius, segments);
      var material = new THREE.MeshPhongMaterial({color: 0x017101});

      //Create all 9 engines
      var engine1 = new THREE.Mesh( geometry, material );
      var engine2 = new THREE.Mesh( geometry, material );
      var engine3 = new THREE.Mesh( geometry, material );
      var engine4 = new THREE.Mesh( geometry, material );
      var engine5 = new THREE.Mesh( geometry, material );
      var engine6 = new THREE.Mesh( geometry, material );
      var engine7 = new THREE.Mesh( geometry, material );
      var engine8 = new THREE.Mesh( geometry, material );
      var engine9 = new THREE.Mesh( geometry, material );


      scene.add( engine1 );
      scene.add( engine2 );
      scene.add( engine3 );
      scene.add( engine4 );
      scene.add( engine5 );
      scene.add( engine6 );
      scene.add( engine7 );
      scene.add( engine8 );
      scene.add( engine9 );

      engine2.position.set(0, 150, 0);
      engine3.position.set(100, 100, 0);
      engine4.position.set(150, 0, 0);
      engine5.position.set(100, -100, 0);
      engine6.position.set(0, -150, 0);
      engine7.position.set(-100, -100, 0);
      engine8.position.set(-150, 0, 0);
      engine9.position.set(-100, 100, 0);


      //Add outline around engines
      var outline = new THREE.EllipseCurve(
        0,  0,            // ax, aY
        205, 205,           // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation 
      );

      var path = new THREE.Path( outline.getPoints( 50 ) );
      var outlineGeometry = path.createPointsGeometry( 50 );
      var outlineMaterial = new THREE.LineBasicMaterial( { color : 0xCFC2C2 } );
      var ellipse = new THREE.Line( outlineGeometry, outlineMaterial );

      scene.add(ellipse)


      var render = function () {
        requestAnimationFrame( render );
        renderer.render(scene, camera);
      };

      render();
    }

    
  }

})();