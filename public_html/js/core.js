
	var render, renderer, scene, camera, stats, model, mesh, mainMesh,  
		loadModels, preparation, model_loader, model_initer;
	
	loadModels = function(){

		model_loader = new ModelLoader( preparation, 1);
		model_loader.load( { name: 'minecraft', model: 'models/minecraft_move1.js' } );

	}

	preparation = function(){

		renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.getElementById( 'viewport' ).appendChild( renderer.domElement );

		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '1px';
		stats.domElement.style.zIndex = 100;
		document.getElementById( 'viewport' ).appendChild( stats.domElement );

		scene = new THREE.Scene();
		
		camera = new THREE.PerspectiveCamera(
			70,
			window.innerWidth / window.innerHeight,
			1,
			10000
		);
		camera.position.set( 0, 100, 300 );
		camera.target = new THREE.Vector3( 0, 0, 0 );
		camera.lookAt( scene.position );
		scene.add( camera );

		model_initer();
		
		render ();

	}

	model_initer = function(){

		
		var geometry  = new THREE.CubeGeometry( 50, 1, 10);
  		mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial( { color: 0xffffff, specular : 0x888888, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading, map: THREE.ImageUtils.loadTexture('images/grass.png') } ) );
  		mesh.position.set(0, -50, 0);
  		mesh.scale.set(10, 1, 10);
  		mesh.receiveShadow = true;
  		mesh.castShadow = true;
  		scene.add(mesh);


		model = model_loader.get('minecraft');
		//console.log(model.geometry);
		//console.log(model.material);
		mesh = null;
		model.material.morphTargets = true;
		mesh = new THREE.Mesh(model.geometry,model.material );//, new THREE.MeshLambertMaterial({ color: 0xff00ff, specular : 0x000000, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading, morphTargets: true }) );
		mesh.position.set(0, 0, 0);
		mesh.scale.set(50, 50, 50);
		//console.log(mesh.position);
		mainMesh = mesh;
		Mine = new MakeObj(mesh);		
		scene.add(mesh);	

		var light = new THREE.SpotLight(0xffffff, 2, 1000 );
		light.target.position.set( 0, 0, 0 );
		// set its position
		light.position.x = 100;
		light.position.y = 320;
		light.position.z = 300;
		light.shadowBias = 0.0001;
		light.shadowDarkness = 0.3;
		light.shadowMapWidth = 2048;
		light.shadowMapHeight = 1024;
		//light.shadowCameraVisible = true;
  		light.castShadow = true;

  		scene.add(light);

	}
	
	render = function() {
		requestAnimationFrame( render );

		animate();			
		//renderer.render( scene, camera); // render the scene
		stats.update();

		

	}
	var radius = 600;
	var theta = 0;

	var duration = 1000;
	var keyframes = 240, interpolation = duration / keyframes;
	var lastKeyframe = 0, currentKeyframe = 0;

	function animate() {
				theta += 0.2;

				camera.position.x = radius * Math.sin( theta * Math.PI / 360 );
				camera.position.z = radius * Math.cos( theta * Math.PI / 360 );

				camera.lookAt( camera.target );
				
				if ( mesh ) {

					// Alternate morph targets

					var time = Date.now() % duration;

					var keyframe = Math.floor( time / interpolation );

					if ( keyframe != currentKeyframe ) {

						mesh.morphTargetInfluences[ lastKeyframe ] = 0;
						mesh.morphTargetInfluences[ currentKeyframe ] = 1;
						mesh.morphTargetInfluences[ keyframe ] = 0;

						lastKeyframe = currentKeyframe;
						currentKeyframe = keyframe;

						//console.log( mesh.morphTargetInfluences );

					}

					mesh.morphTargetInfluences[ keyframe ] = ( time % interpolation ) / interpolation;
					mesh.morphTargetInfluences[ lastKeyframe ] = 1 - mesh.morphTargetInfluences[ keyframe ];

				}

				renderer.render( scene, camera );

			}


	function MakeObj( obj ){
		this.prototype = obj;
		var that = this;
		this.left = function(){
			this.prototype.position.set(this.prototype.position.x-1,this.prototype.position.y,this.prototype.position.z);
		};
		this.right = function(){
			this.prototype.position.set(this.prototype.position.x+1,this.prototype.position.y,this.prototype.position.z);
		};
		this.up = function(){
			this.prototype.position.set(this.prototype.position.x,this.prototype.position.y+1,this.prototype.position.z);
		};
		this.down = function(){
			this.prototype.position.set(this.prototype.position.x,this.prototype.position.y-1,this.prototype.position.z);
		};
	}




