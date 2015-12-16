(function () {
 'use strict'

  angular.module("app", [])
  .directive("orbitDirective", orbitDirective)

  orbitDirective.$inject = ['Mission', '$window'];

  function orbitDirective(Mission, $window) {
    return {
      restrict: 'A',
      scope: { 
        'width': '=',
        'height': '=',
        'fillcontainer': '=',
        'scale': '=',
        'materialType': '='
      },
      link: function (scope, elem, attr) {
        var vm = this;
        //////////////////////
        ///  SCENE/CAMERA  ///
        //////////////////////

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, $window.innerWidth/$window.innerHeight, 0.1, 1000 );

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( $window.innerWidth, $window.innerHeight );
        elem[0].appendChild( renderer.domElement );

        camera.position.set(0, 0, 200);
        camera.rotation.x = -(Math.PI / 4) * .4 ;
        // camera.rotation. = (Math.PI/2) * 0.25;
        // camera.lookAt(0,0,0);

        ///////////////////////////
        ///// ORBIT CONTROLS //////
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

        var geometry = new THREE.SphereGeometry(radius, segments, rings);
        var material = new THREE.MeshPhongMaterial({color: 0x3022bb});
        var sphere = new THREE.Mesh( geometry, material );
        scene.add( sphere );

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
        var radius = 5;
        var segments = 32;
        var rings = 32;

        var craftGeometry = new THREE.SphereGeometry(radius, segments, rings);
        var craftMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
        var craft = new THREE.Mesh( craftGeometry, craftMaterial );
        craft.position.set(100, 0, 0);
        scene.add( craft );

        //Current Trajectory / orbit
        apogee = [0, 150, 0];
        perigee = [0, 100, 0];

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

        vm.render = function (actions) {
          // z += dz;
          // camera.position.z += dz;
          // if (Math.abs(z) > 500) {
          //   dz *= -1;
          // }
          // line.rotation.y += 0.001;
          // target.rotation.y -= 0.002;
          camera.lookAt(vec)
          renderer.render(scene, camera);
          requestAnimationFrame( render );
        };
        vm.render();
        

      }
    }
    

  };
})();


