(function() {
  'use strict';

  angular.module('app')
  .controller('CraftController', CraftController);

  CraftController.$inject = ['$window', 'Spacecraft'];

  function CraftController ($window, Spacecraft) {
    var vm = this;

    //view model properties and methods
    vm.craftID = 0;
    vm.missionID = $window.localStorage.missionID;
    vm.power = 0
    vm.cabinPressure = 0;
    vm.monoprop = 0;
    vm.timestamp = 0;

    //Initialization procedures
    getCraftData();
    trajectoryGraphic();

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

    //Create THREEJS trajectory Map
    function trajectoryGraphic () {
      //////////////////////
      ///  SCENE/CAMERA  ///
      //////////////////////
      var width = $window.innerWidth * 1/4 * .95;
      var height = $window.innerHeight * 40/100;

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );

      var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
      renderer.setClearColor( 0xffffff, 0);
      renderer.setSize( width, height );
      $(".trajectory-graphic").append( renderer.domElement );

      camera.position.set(0, 200, 0);
      camera.rotation.z = (Math.PI / 3) ;
      // camera.rotation. = (Math.PI/2) * 0.25;
      // camera.lookAt(0,0,0);

      ///////////////////////////
      /// ORBIT CONTROLS //////
      ///////////////////////////
      var orbit = new THREE.OrbitControls(camera, renderer.domElement);

      //////////////////////
      /////  LIGHTS  ///////
      //////////////////////

      var light = new THREE.AmbientLight( 0x888888 )
      scene.add( light )

      var light = new THREE.DirectionalLight( 0xcccccc, 1 )
      light.position.set(5,3,5)
      scene.add( light )


      //////////////////////
      /////  OBJECTS  //////
      //////////////////////

      //Earth
      var radius = 50;
      var segments = 32;
      var rings = 32;

      var earthGeometry = new THREE.SphereGeometry(radius, segments, rings);
      var earthMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture("../../assets/earth_3.jpg"),
        color: 0xaaaaaa,
        ambient: 0xaaaaaa,
        specular: 0x333333,
        bumpScale: 0.2,
        shininess: 10
      });
      var earth = new THREE.Mesh( earthGeometry, earthMaterial );
      scene.add( earth );

      //Spacecraft
      var radius = 5;
      var segments = 32;
      var rings = 32;

      var craftGeometry = new THREE.SphereGeometry(radius, segments, rings);
      var craftMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
      var craft = new THREE.Mesh( craftGeometry, craftMaterial );
      craft.position.set(100, 0, 0);
      scene.add( craft );

      //Optional Target
      var radius = 5;
      var segments = 32;
      var rings = 32;

      var targetGeometry = new THREE.SphereGeometry(radius, segments, rings);
      var targetMaterial = new THREE.MeshPhongMaterial({color: 0x00cc00});
      var targetObject = new THREE.Mesh( targetGeometry, targetMaterial );
      targetObject.position.set(0, -30, 100);
      scene.add( targetObject );

      //////////////////////
      ////  TRAJECTORY  ////
      //////////////////////
     
      //Current Trajectory / orbit
      var apogee = [0, 150, 0];
      var perigee = [0, 100, 0];

      var ellipseMaterial = new THREE.LineBasicMaterial({color:0xffffff, opacity:1});
      var ellipse = new THREE.EllipseCurve(
        0, 0, 
        perigee[1] * .75, apogee[1] * .75, 
        0, 2.0 * Math.PI, 
        false);
      var ellipsePath = new THREE.CurvePath(ellipse.getPoints(1000));
      ellipsePath.add(ellipse);
      var ellipseGeometry = ellipsePath.createPointsGeometry(100);
      var line = new THREE.Line(ellipseGeometry, ellipseMaterial);
      scene.add( line );
      line.rotation.z = (Math.PI / 2) * 0.75;
      line.rotation.x = (Math.PI / 2) * 1.2;


      //Target trajectory / orbit
      var targetMaterial = new THREE.LineDashedMaterial({
        color: 0x00cc00, 
        opacity:1, 
        dashSize: 8,
        gapSize: 8
      });
      var targetOrbit = new THREE.EllipseCurve(
        0,0,
        perigee[1] * 1.0, apogee[1] * 1.0, 
        0, 2.0 * Math.PI, 
        false);
      var targetPath = new THREE.CurvePath(targetOrbit.getPoints(1000));
      targetPath.add(targetOrbit);
      var targetGeometry = targetPath.createPointsGeometry(100);
      var target = new THREE.Line(targetGeometry, targetMaterial);
      scene.add( target );
      target.rotation.z = (Math.PI / 2) * 0.75;
      target.rotation.x = (Math.PI / 2) * 1.2;


      ///////////////////////////
      /// RENDERING/ANIM LOOP ///
      ///////////////////////////

      var vec = new THREE.Vector3( 0, 0, 0 );
      var z = 500;
      var dz = -3;

      var render = function (actions) {
        earth.rotation.y += .001;
        camera.lookAt(vec)
        renderer.render(scene, camera);
        requestAnimationFrame( render );
      };
      render();
    }


    
  }

})();