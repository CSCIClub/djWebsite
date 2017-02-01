//helper functions
createPlayer = function(x,y,z, id) {
	var obj = new THREE.Object3D();
	var mesh = new THREE.Object3D();
	var geometry = new THREE.TetrahedronGeometry(1, 0);
	var material = new THREE.MeshPhongMaterial({
		color: 0x156289,
		emissive: 0x072534,
		shading: THREE.FlatShading
	});

	geometry.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, -1).normalize(), Math.atan(Math.sqrt(2))));

	mesh.add(new THREE.Mesh(
	  geometry,
	  material
	));

	material.playerID = id;
	material.coltype = "player";
	obj.playerID = id;
	mesh.rotation.set(Math.PI/8,0.23,0);
	obj.position.set(x,y,z);

	obj.add(mesh);
	return obj;
}
