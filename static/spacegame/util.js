//helper functions
loader = new THREE.ObjectLoader();
geometries = {};
materials = {};
geometries[0] = new THREE.TetrahedronGeometry(1, 0);
materials[0] = new THREE.MeshPhongMaterial({
		color: 0x156289,
		emissive: 0x072534,
		shading: THREE.FlatShading
	});
setMaterial = function(index, material){
	materials[index] = material;
}

setGeometry = function(index, geometry){
  geometries[index] = geometry;
}
// load nickship
loader.load(
	// resource URL
	'../static/spacegame/nickship.js',
	// Function when resource is loaded
	function ( obj ) {
		console.log("success loading nickship")
		var material;
		var geometry;
		console.log(obj);
		material = obj.material;
		geometry = obj.geometry;
		setMaterial(1, material);
		setGeometry(1, geometry);
	},
	function(err) {
		console.log("loading nick ship" + err);
	},
	function(err) {
		console.log("error loading nick ship:" + err );
		setMaterial(1, materials[0]);
		setGeometry(1, geometries[0]);
	}
);

createPlayer = function(x,y,z, id, shipID) {
	var obj = new THREE.Object3D();
	var mesh = new THREE.Object3D();
	var geometry = getGeometry(shipID);
	var material =  getMaterial(shipID);
	//apply rotation of geometries if needed
	switch(shipID){
		case 0: 
			geometry.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, -1).normalize(), Math.atan(Math.sqrt(2))));
			break;
		case null:
			geometry.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, -1).normalize(), Math.atan(Math.sqrt(2))));
			break;
	}

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

getMaterial = function (shipID) { 
	return materials[shipID];
}

getGeometry = function (shipID) {
	return geometries[shipID];
}