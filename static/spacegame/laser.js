var THREEx = THREEx || {}
	THREEx.LaserBeam = function(){
		var object3d	= new THREE.Object3D();
		this.object3d	= object3d;

		// generate the texture
		var canvas	= generateLaserBodyCanvas();
		var texture	= new THREE.Texture(canvas);
		texture.needsUpdate	= true;

		// do the material
		var material	= new THREE.MeshBasicMaterial({
			map			: texture,
			blending	: THREE.AdditiveBlending,
			color		: 0x4444aa,
			side		: THREE.DoubleSide,
			depthWrite	: false,
			transparent	: true
		});
		material.coltype = "laser";
		var geometry = new THREE.PlaneBufferGeometry(1, 0.1);
		var nPlanes	= 2;
		for(var i = 0; i < nPlanes; i++){
			var mesh	= new THREE.Mesh(geometry, material);
			mesh.position.x	= 1 / 2;
			mesh.rotation.x	= i / nPlanes * Math.PI;
			object3d.add(mesh);
		}

		function generateLaserBodyCanvas(){
			// init canvas
			var canvas	= document.createElement( 'canvas' );
			var context	= canvas.getContext( '2d' );
			canvas.width	= 1;
			canvas.height	= 64;

			// set gradient
			var gradient	= context.createLinearGradient(0, 0, canvas.width, canvas.height);
			gradient.addColorStop( 0  , 'rgba(  0,  0,  0,0.5)' );
			gradient.addColorStop( 0.1, 'rgba(160,160,160,0.8)' );
			gradient.addColorStop( 0.5, 'rgba(255,255,255,0.9)' );
			gradient.addColorStop( 0.9, 'rgba(160,160,160,0.8)' );
			gradient.addColorStop( 1.0, 'rgba(  0,  0,  0,0.5)' );

			// fill the rectangle
			context.fillStyle	= gradient;
			context.fillRect(0,0, canvas.width, canvas.height);

			// return the just built canvas
			return canvas;
		}
	}

	THREEx.LaserCooked	= function(laserBeam, laserContainer, length){
		// for update loop
		var updateFcts = [];
		this.update	= function(){
			//console.log("update");
			updateFcts.forEach(function(updateFct){
				updateFct();
			})
		};

		var object3d = laserBeam.object3d;

		// build THREE.Sprite for impact
		var textureUrl = 'https://raw.githubusercontent.com/jeromeetienne/threex.laser/master/images/blue_particle.jpg';
		var texture	= new THREE.TextureLoader().load(textureUrl);
		var material = new THREE.SpriteMaterial({
			map		: texture,
			blending	: THREE.AdditiveBlending,
		});
		var sprite	= new THREE.Sprite(material);
		sprite.scale.x = 0.5;
		sprite.scale.y = 4;

		sprite.position.x = 1 - 0.01;
		object3d.add(sprite);

		// add a point light
		var light	= new THREE.PointLight( 0x4444ff);
		light.intensity	= 0.5;
		light.distance	= 4;
		light.position.x = -0.05;
		this.light = light;
		sprite.add(light);
		updateFcts.push(function(){
			//what
		}.bind(this));
	}
