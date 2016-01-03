(function() {
  'use strict';

  angular.module('app')
  .controller('OrbitController', OrbitController);

  OrbitController.$inject = ['$window', 'Mission'];

  function OrbitController ($window, Mission) {
    var vm = this;

    //View model properties and methods
    vm.missionID = $window.localStorage.missionID;
    vm.orbit = {};

    //Initialization procedures
    getOrbitalData();

    //Non scope methods
    function getOrbitalData () {
      Mission.getMissionMeta(vm.missionID) 
        .then(function (orbitData) {
          for (var key in orbitData) {
            vm.orbit[key] = orbitData[key];
          }
          console.log(vm.orbit);
          trajectoryGraphic();
        });
    }

    //Graphic scaling notes
    //Earth radius = 50 units
    //Earth real radius = 6371 km
    //Distance conversion: 50/6731 = x / (actual distance)

    //Calculate current position based on altitude, latitude, longitude

    //We want two main cases: 
      //1) orbit is not yet achieved, i.e perigee is negative.
      //In this case we want to draw a parabola with our apogee
      //as the apex, AND we want to have a zoomed in view of the
      //trajectory, probably directly below the current position, 
      //looking at the current position.

      //2) orbit is reached, apogee and perigee positive. Now we want
      //To show a zoomed out view of the orbit.

    //Create THREEJS trajectory Map
    function trajectoryGraphic () {
      var width = $window.innerWidth * .75;
      var height = $window.innerHeight * .88;
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, width/height , 0.1, 1000 );

      var renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setSize( width, height );
      $(".trajectory-graphic").append( renderer.domElement );
      
      var orbit = new THREE.OrbitControls(camera, renderer.domElement);

      var light = new THREE.AmbientLight( 0x888888 )
      scene.add( light )

      var light = new THREE.DirectionalLight( 0xcccccc, 1 )
      light.position.set(5,3,5)
      scene.add( light )

      //Define parameters for scaling data values to map size
      var scale = 50 / 6731;
      var offset = 50;
      var apogee = vm.orbit.apogee * scale + offset;
      var perigee = vm.orbit.perigee * scale + offset;
      var target_apogee = vm.orbit.target_apogee * scale + offset;
      var target_perigee = vm.orbit.target_perigee * scale + offset;

      //Given altitude, latitude, and longitude, determine (x,y,z)
      //Convert lat, lng to radians
      var lat = vm.orbit.latitude * (Math.PI / 180);
      var lng = vm.orbit.longitude * (Math.PI / 180);
      var altitude = vm.orbit.altitude * scale + offset;
      var pos_y = altitude * Math.sin(lat);
      var pos_x = altitude * Math.cos(lng);
      var pos_z = altitude * Math.sin(lng);
      var position = [pos_x, pos_y, pos_z];
      var cam_position = [position[0], position[1] - offset/2, position[2]];

      var inclination = vm.orbit.inclination * (Math.PI / 180);
      var targetInclination = vm.orbit.target_inclination * (Math.PI / 180);
      console.log(altitude);
      console.log(position);

      // console.log(vm.orbit.target_perigee);
      // console.log(apogee, perigee, target_apogee, target_perigee);

      //EARTH
      var radius = 50;
      var segments = 32;
      var rings = 32;

      var earthGeometry = new THREE.SphereGeometry(radius, segments, rings);
      var earthMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture("../../assets/earth_3.jpg"),
        bumpMap: THREE.ImageUtils.loadTexture("../../assets/earth_bump.jpg"),
        color: 0xaaaaaa,
        ambient: 0xaaaaaa,
        specular: 0x333333,
        bumpScale: 0.2,
        shininess: 10
      });
      var earth = new THREE.Mesh( earthGeometry, earthMaterial );
      scene.add( earth );

      //STARS
      var starsGeometry  = new THREE.SphereGeometry(150, 32, 32)
      var starMaterial  = new THREE.MeshBasicMaterial()
      starMaterial.map   = THREE.ImageUtils.loadTexture('../../assets/galaxy_starfield.png')
      starMaterial.side  = THREE.BackSide
      var starField  = new THREE.Mesh(starsGeometry, starMaterial)
      scene.add(starField);

      //CLOUDS
      var cloudGeometry   = new THREE.SphereGeometry(51, 32, 32)
      var cloudMaterial  = new THREE.MeshPhongMaterial({
        map     : new THREE.ImageUtils.loadTexture("../../assets/earthcloudmaptrans.jpg"),
        side        : THREE.DoubleSide,
        opacity     : 0.05,
        transparent : true,
        depthWrite  : false
      })
      var cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
      scene.add(cloudMesh)


      //Spacecraft
      var radius = .5;
      var segments = 32;
      var rings = 32;

      var craftGeometry = new THREE.SphereGeometry(radius, segments, rings);
      var craftMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
      var craft = new THREE.Mesh( craftGeometry, craftMaterial );
      craft.position.set(position[0], position[1], position[2]);
      scene.add( craft );

      // var targetGeometry = new THREE.SphereGeometry(radius, segments, rings);
      // var targetMaterial = new THREE.MeshPhongMaterial({color: 0xb3ebff});
      // var targetObject = new THREE.Mesh( targetGeometry, targetMaterial );
      // targetObject.position.set(0, -30, 100);
      // scene.add( targetObject );

      //Current Trajectory
      var focus_vector;
      if (vm.orbit.perigee > 0) {
        //Draw elliptical orbit
        var ellipseMaterial = new THREE.LineBasicMaterial({color:0xffffff, opacity:1});
        var ellipse = new THREE.EllipseCurve(
          0, 0, 
          perigee, apogee,
          0, 2.0 * Math.PI, 
          false);
        var ellipsePath = new THREE.CurvePath(ellipse.getPoints(1000));
        ellipsePath.add(ellipse);
        var ellipseGeometry = ellipsePath.createPointsGeometry(100);
        var currentTrajectory = new THREE.Line(ellipseGeometry, ellipseMaterial);
        scene.add( currentTrajectory );
        currentTrajectory.rotation.x = Math.PI / 2;
        currentTrajectory.rotation.y = inclination;

        focus_vector = new THREE.Vector3(0, 0, 0);
        camera.position.set(0, 20, 100);
      } else {
        //Draw parabolic trajectory based off of current apogee
        var curve = new THREE.QuadraticBezierCurve(
          new THREE.Vector3( offset, 0, -apogee ),
          new THREE.Vector3( offset + apogee, 0, 0 ),
          new THREE.Vector3( offset, 0, apogee )
        );
        var path = new THREE.Path( curve.getPoints( 50 ) );
        var geometry = path.createPointsGeometry( 50 );
        var material = new THREE.LineBasicMaterial( { color : 0xffffff } );
        var currentTrajectory = new THREE.Line( geometry, material );
        scene.add(currentTrajectory);

        focus_vector = new THREE.Vector3(position[0], position[1], position[2]);
        camera.position.set(cam_position[0], cam_position[1], cam_position[2]);
      }

      //Target trajectory / orbit
      var targetMaterial = new THREE.LineDashedMaterial({
        color: 0xb3ebff, 
        opacity:1, 
        dashSize: 8,
        gapSize: 1
      });
      var targetOrbit = new THREE.EllipseCurve(
        0,0,
        target_perigee, target_apogee, 
        0, 2.0 * Math.PI, 
        false);
      var targetPath = new THREE.CurvePath(targetOrbit.getPoints(1000));
      targetPath.add(targetOrbit);
      var targetGeometry = targetPath.createPointsGeometry(100);
      var targetTrajectory = new THREE.Line(targetGeometry, targetMaterial);
      scene.add( targetTrajectory );
      targetTrajectory.rotation.x = Math.PI / 2;
      targetTrajectory.rotation.y = targetInclination;

      var vec = new THREE.Vector3( 0, 0, 0 );


      var render = function (actions) {
        earth.rotation.y += .0003;
        camera.lookAt(focus_vector);
        renderer.render(scene, camera);
        requestAnimationFrame( render );
      };
      render();
    }

    
    
  }

})();