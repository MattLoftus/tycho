(function() {
  'use strict';

  angular.module('app')
  .controller('TanksController', TanksController);

  TanksController.$inject = ['$window', 'Mission', 'Vehicle'];

  function TanksController ($window, Mission, Vehicle) {

    var vm = this;

    // View model properties
    vm.missionID = $window.localStorage.missionID;

    vm.tanks = {
      "stage1": {},
      "stage2": {}
    };
    vm.throttle = 0;    

    //Initialization procedures
    getTankData();
    setInterval(getTankData, 1000);
    
    //Get all fuel tank data for both rocket stages
    function getTankData () {
      Vehicle.getAllTanks(vm.missionID)
        .then(function (tankData) {
          // console.log(tankData);
          for (var i = 0; i < tankData.length; i++) {
            var tank = tankData[i];
            if (tank.stage_num === 1) {
              vm.tanks.stage1[tank.fuel_type] = tank;
            } else if (tank.stage_num === 2) {
              vm.tanks.stage2[tank.fuel_type] = tank;
            }
          }
          if (vm.throttle == 0) {
            fuelTankGraphic(".stage-2 .LOX .tank-graphic");
            fuelTankGraphic(".stage-2 .RP1 .tank-graphic");
            fuelTankGraphic(".stage-1 .LOX .tank-graphic");
            fuelTankGraphic(".stage-1 .RP1 .tank-graphic");
            vm.throttle++;
          }
          console.log(vm.tanks);
        });
    }

    //Falcon 9 Fuel Notes:
    //Stage 1 LOX: 150,000 Liters
    //Stage 1 RP1: 95,000 Liters
    //Stage 2 LOX: 28,000 Liters
    //Stage 2 RP1: 17,000 Liters
    


    //Tank Graphic rendering method
    function fuelTankGraphic (selector, stageNo) {
      var scene = new THREE.Scene();
      var width = $window.innerWidth * 1/2 * 1/3;
      var height = $window.innerHeight * .44;
      
      var camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
      // var camera = new THREE.OrthographicCamera(- width/1 , width / 1, height / 1, -height /  1, 1, 1000 );
      var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setClearColor( 0xffffff, 0);
      renderer.setSize( width, height);
      // $(renderer.domElement).insertAfter(selector);
      $(selector).append(renderer.domElement);

      camera.position.set(0, 0, 67);

      //Orbit Controls
      var orbit = new THREE.OrbitControls(camera, renderer.domElement);

      //Lighting
      var light = new THREE.AmbientLight( 0x404040 ); // soft white light
      scene.add( light );

      var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
      directionalLight.position.set( -2, 2, 0 );
      scene.add( directionalLight );


      var tankGeometry = new THREE.CylinderGeometry( 25, 25, 40, 30, 30 );
      var tankMaterial = new THREE.MeshPhongMaterial({
        color: 0x65696b,
        emissive: 0x2d2828,
        specular: 0x7f7373,
        wireframe: false,
        transparent: true,
        opacity: .5
      });
      var tank = new THREE.Mesh( tankGeometry, tankMaterial );
      scene.add( tank );


      //Tank top/bottom
      // var tankCapGeometry = new THREE.SphereGeometry(40,40, 30, Math.PI*1.5, Math.PI, 0, 3.1);
      var tankCapGeometry = new THREE.SphereGeometry(27,30, 30, 0, 2*Math.PI, 0, 1.2);
      var tankTop = new THREE.Mesh(tankCapGeometry, tankMaterial)
      scene.add(tankTop);
      tankTop.position.y = 10;
      // tankTop.rotation.x = Math.PI / 2 ;
      // tankTop.rotation.z = -Math.PI/2;


      var tankBottom = new THREE.Mesh(tankCapGeometry, tankMaterial)
      scene.add(tankBottom);
      tankBottom.position.y = -10;
      tankBottom.rotation.z = -Math.PI;

      var fuelSpecs = {
        radius: 24,
        height: 40,
        radialSegments: 30,
        heightSegments: 30
      }

      

      var fuelGeometry = new THREE.CylinderGeometry(fuelSpecs.radius, fuelSpecs.radius, fuelSpecs.height, fuelSpecs.radialSegments, fuelSpecs.heightSegments);
      var fuelMaterial = new THREE.MeshPhongMaterial({
        color: 0x117cb1,
        emissive: 0x0b1b91,
        specular: 0x1e1a1a
      });
      var fuel = new THREE.Mesh(fuelGeometry, fuelMaterial);
      scene.add(fuel);

      // var fuelCapGeometry = new THREE.SphereGeometry(39,30, 30, Math.PI*1.5, Math.PI, 0, 3.1);
      var fuelCapGeometry = new THREE.SphereGeometry(25,30, 30, 0, 2*Math.PI, 0, 1.3);
      var fuelBottom = new THREE.Mesh(fuelCapGeometry, fuelMaterial);
      scene.add(fuelBottom);
      fuelBottom.position.y = -11;
      fuelBottom.rotation.z = Math.PI;

      ///////////////////////////
      /// RENDERING/ANIM LOOP ///
      ///////////////////////////
      var s1LOXMax = 150000;
      var s1RP1Max = 95000;
      var s2LOXMax = 28000;
      var s2RP1Max = 17000;

      //Change fuel height based off remaining fuel volume;
      var vec = new THREE.Vector3( 0, 0, 0 );

      var render = function (actions) {
        if (selector == ".stage-2 .LOX .tank-graphic") {
          fuel.scale.y = vm.tanks.stage2.LOX.fuel_volume / s2LOXMax;
          fuel.position.y = -4 - 0.5 * vm.tanks.stage2.LOX.fuel_volume / s2LOXMax;
        } else if (selector == ".stage-2 .RP1 .tank-graphic") {
          fuel.scale.y = vm.tanks.stage2.RP1.fuel_volume / s2RP1Max;
          fuel.position.y = -4 - 0.5 * vm.tanks.stage2.RP1.fuel_volume / s2RP1Max;
        } else if (selector == ".stage-1 .LOX .tank-graphic") {
          fuel.scale.y = vm.tanks.stage1.LOX.fuel_volume / s1LOXMax;
          fuel.position.y = -14 - vm.tanks.stage1.LOX.fuel_volume / s1LOXMax;
        } else if (selector == ".stage-1 .RP1 .tank-graphic") {
          fuel.scale.y = vm.tanks.stage1.RP1.fuel_volume / s1RP1Max;
          fuel.position.y = -15 - vm.tanks.stage1.RP1.fuel_volume / s1RP1Max;
        }

        camera.lookAt(vec)
        renderer.render(scene, camera);
        requestAnimationFrame( render );
      };
      render();
    }

  }

})();