var renderer;

var scene;
var camera;

var myController;

function init () {
	renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	var zNear = 0.1;
	var zFar = 1e9;

	// Help objects
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, zNear, zFar);

	myController = new MyController(camera, renderer.domElement);
	
/*
	let loader = new THREE.TextureLoader();
	material = new THREE.MeshBasicMaterial({
		map: loader.load("index_files/8k_sun.jpg")
	});

	mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 24), material);
	mesh.scale.set(2, 2, 2);
	scene.add(mesh);
*/
	camera.position.set(0, 0, 200000);

	init_3d();
	init_ui();
}