 //Create Stage 1 engine graphic
    function s1EngineGraphic () {
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, $window.innerWidth/$window.innerHeight, 0.1, 1000 );
      camera.position.set(0,0,300)

      var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
      renderer.setClearColor(0xffffff, 0);
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

    //Create stage 2 engine graphic
    function s2EngineGraphic() {
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
      camera.position.set(0,0,80)

      var width = $window.innerWidth;
      var height = $window.innerHeight;
      width = width * .6 * .45 * .2;
      height = height * .35 * .3;

      var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
      renderer.setClearColor( 0xffffff, 0);
      renderer.setSize( width, height );
      $(".s2-engine-graphic").append( renderer.domElement );

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

      scene.add( engine1 );

      var render = function () {
        requestAnimationFrame( render );
        renderer.render(scene, camera);
      };
      render();
    }