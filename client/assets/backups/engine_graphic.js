//Engine Graphic creator
    function engineGraphic(engine_num) {
      var width = $window.innerWidth * 1/5 * 2/3;
      var height = $window.innerHeight * .45/2;
      var selector = ".engine-" + engine_num + " .graphic";
      console.log(selector);
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );

      var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
      renderer.setClearColor(0xffffff, 0);
      renderer.setSize( width, height );
      $(selector).prepend( renderer.domElement );

      camera.position.set(0,5, 30);
      // camera.rotation.x = -(Math.PI / 4) * .4 ;
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

      //Nozzle
      var nozzleGeometry = new THREE.CylinderGeometry(2, 9.3, 17, 45, 20, true);
      // var nozzleMaterial = new THREE.MeshBasicMaterial( {color: 0x00b8e6} );
      var nozzleMaterial = new THREE.MeshPhongMaterial({
        color: 0x393b3c,
        emissive: 0x1e1b1b,
        specular: 0x433d3d,
        shininess: 85,
        wireframe: false,
        transparent: false,
        opacity: 1
      });
      var nozzle = new THREE.Mesh(nozzleGeometry, nozzleMaterial);
      scene.add(nozzle);


      var nozzleTopGeometry = new THREE.CylinderGeometry(4, 2, 6, 45, 20, true);
      var nozzleTop = new THREE.Mesh(nozzleTopGeometry, nozzleMaterial);
      nozzleTop.position.y = 11;
      // nozzleTop.rotation.z = Math.PI;
      scene.add(nozzleTop);

      var nozzleCylinderGeometry = new THREE.CylinderGeometry(4,4,6,45,20, true);
      var nozzleCylinder = new THREE.Mesh(nozzleCylinderGeometry, nozzleMaterial);
      nozzleCylinder.position.y = 17;
      scene.add(nozzleCylinder);

      // var turboExuastGeometry = new THREE.CylinderGeometry(2,2,8,45,20)

      ///////////////////////////
      /// RENDERING/ANIM LOOP ///
      ///////////////////////////

      var vec = new THREE.Vector3( 0, 5, 0 );

      var render = function () {
        // camera.position.x += dx;
        // camera.position.z += dz;
        camera.lookAt(vec)
        renderer.render(scene, camera);
        requestAnimationFrame( render );
        //16.66ms
      };
      render();

    }