var globalTimeSpeed = 1;

// Geometry of planets and star
const geometry = new THREE.SphereGeometry(1, 64, 64);

// distance between objects
const dbo = 9e5;

// Rotation objects
var rotObj = [];

// !!!!!!!!!!! Добавить в инициализацию объектов
/* Родители объектов */
var parents 	= [0, 0, 0, 0, 3, 0, 5, 5, 0, 8, 8, 8, 8, 0, 13, 13, 13, 13, 0, 18, 18, 18, 0, 22, 0, 24];

var listOfObjectInSidebar = [];

var textureLoader = new THREE.TextureLoader();

SSO = function(_class=null, _name=null, _mass=null, _diameter=null, _density=null, _temperature=null, _texture=null, _distanceToParent=null, _geometry=geometry) {
	this.class_ = _class;
	this.name_ = _name;
	this.mass = _mass;
	this.diameter = parseInt(_diameter);
	this.density = _density;
	this.temperature = _temperature;
	this.distanceToParent = _distanceToParent;

	this.radius = this.diameter / 2;

	if (_texture != null)
	{
		this.material = new THREE.MeshBasicMaterial({
			map: textureLoader.load(_texture)
		});
	}
	else
	{
		this.material = new THREE.MeshBasicMaterial({
			map: textureLoader.load("index_files/unknow2.jpg") // empty.jpg
		});
	}

	this.mesh = new THREE.Mesh(_geometry, this.material);
	this.mesh.scale.set(this.radius, this.radius, this.radius);
	this.group = new THREE.Group();

	this.speedRotation = 1; // скорость вращения
	this.speedFlyOnOrbit = 5; // скорость полета на орбите
}

function draw() {
	requestAnimationFrame(draw);

	// Part of animation solar system
	for (let i = 0; i < rotObj.length; i++)
	{
		if (rotObj[i].type == "Object3D")
			rotObj[i].mesh.rotation.y += rotObj[i].speedRotation * 1e-5 * globalTimeSpeed;
		else
			rotObj[i].group.rotation.y += rotObj[i].speedFlyOnOrbit * 1e-5 * globalTimeSpeed;
	}

	myController.update();

	renderer.render(scene, camera);
}

/*
Не вызывать несколько раз!
*/
function updateObjectsData() {
	/*
	диаметр в км
	дистанция до родителя в км
	у деймоса не правильный радиус
	*/
	let objects = listOfObjectInSidebar;
	objects.push(new SSO("Звезда", 		"Солнце", 	"1,99*10^30", 	"1392000", 	null, 		"5526", 		"index_files/8k_sun.jpg", 				null));
	objects.push(new SSO("Планета", 	"Меркурий", "3.3*10^23", 	"4878", 	5.4299998, 	"[-180;430]", 	"index_files/2k_mercury.jpg", 			58000000));
	objects.push(new SSO("Планета", 	"Венера", 	"4,87*10^24", 	"12102", 	5.2500000, 	"480", 			"index_files/2k_venus_atmosphere.jpg", 	108200000));
	objects.push(new SSO("Планета", 	"Земля", 	"5,98*10^24", 	"12756", 	5.5200000, 	"[-96;70]", 	"index_files/8k_earth_daymap.jpg", 		149600000));
	objects.push(new SSO("Спутник", 	"Луна", 	"7,35*10^22", 	"3476", 	null, 		"[-100;160]", 	"index_files/8k_moon.jpg", 				384467));
	objects.push(new SSO("Планета", 	"Марс", 	"6,42*10^23", 	"6786", 	3.9500000, 	"[-125;25]", 	"index_files/2k_mars.jpg", 				227900000));
	objects.push(new SSO("Спутник", 	"Фобос", 	null, 			"22.2", 	null, 		null, 			null, 									9400));
	objects.push(new SSO("Спутник", 	"Деймос", 	null, 			"22.2", 	null, 		null, 			null, 									23500));
	objects.push(new SSO("Планета", 	"Юпитер", 	"1,9*10^27", 	"142984", 	1.3300000, 	"-160", 		"index_files/2k_jupiter.jpg", 			778000000));
	objects.push(new SSO("Спутник", 	"Ио", 		"8,93*10^22", 	"7286", 	3.5300000, 	"[-183;-144]", 	null, 									422000));
	objects.push(new SSO("Спутник", 	"Европа", 	"4,8*10^22", 	"6244", 	3.0000000, 	"-193", 		null, 									617000));
	objects.push(new SSO("Спутник", 	"Ганимед", 	"1,5*10^23", 	"10536", 	1.9299999, 	"[-203;-121]", 	null, 									1070000));
	objects.push(new SSO("Спутник", 	"Каллисто", "1,1*10^23", 	"9642", 	1.8300000, 	"[-193;-108]", 	null, 									1883000));
	objects.push(new SSO("Планета", 	"Сатурн", 	"5,7*10^26", 	"120536", 	0.6900000, 	"-190", 		"index_files/2k_saturn.jpg", 			1426980000));
	objects.push(new SSO("Спутник", 	"Диона", 	"1,05*10^21", 	"1120", 	null, 		null, 			null, 									377400));
	objects.push(new SSO("Спутник", 	"Рея", 		"2,49*10^21", 	"1530", 	null, 		null, 			null, 									527040));
	objects.push(new SSO("Спутник", 	"Титан", 	"1,35*10^23", 	"5150", 	null, 		null, 			null, 									1221850));
	objects.push(new SSO("Спутник", 	"Япет", 	"1,88*10^21", 	"1440", 	null, 		null, 			null, 									3561300));
	objects.push(new SSO("Планета", 	"Уран", 	"8,68*10^25", 	"51118", 	1.2900000, 	"-220", 		"index_files/2k_uranus.jpg", 			2871000000));
	objects.push(new SSO("Спутник", 	"Ариель", 	"1,27*10^21", 	"1158", 	null, 		null, 			null, 									191000));
	objects.push(new SSO("Спутник", 	"Титания", 	"3,49*10^21", 	"1578", 	null, 		null, 			null, 									436000));
	objects.push(new SSO("Спутник", 	"Оберон", 	"3,03*10^21", 	"1522", 	null, 		null, 			null, 									583000));
	objects.push(new SSO("Планета", 	"Нептун", 	"1,02*10^26", 	"49520", 	1.6400000, 	"-231", 		"index_files/2k_neptune.jpg", 			4497000000));
	objects.push(new SSO("Спутник", 	"Тритон", 	null, 			"2700", 	null, 		null, 			null, 									200000));
	objects.push(new SSO("Планета", 	"Плутон", 	"1,29*10^22", 	"2324", 	2.0000000, 	"-233", 		null, 									7400000000));
	objects.push(new SSO("Спутник", 	"Харон", 	"1,52*10^21", 	"1212", 	2.0000000, 	"-220",			null, 									200000));

	let getPos = function (index) {
		if (index < 1)
			return 0;

		return (objects[parents[index]].radius + objects[index].distanceToParent + objects[index].radius);
	};

	var randomVector3 = function () {
		//return new THREE.Vector2(1, 0, 0);
		return (new THREE.Vector3()).random().subScalar(0.5).normalize();
	};

	/* Создание группы каждому объекту и attach к группе */
	for (let i = 0; i < objects.length; i++)
	{
		// Группа - центр вращения вокруг родителя
		objects[i].group.position.copy(objects[parents[i]].mesh.position);
	
		// Объект сс ставим на рандомную точку вокруг центра вращения
		objects[i].mesh.position.copy(randomVector3().multiplyScalar(getPos(i) * 5));

		objects[i].group.attach(objects[i].mesh);

		if (i != 0)
			objects[parents[i]].group.attach(objects[i].group);
	}

	scene.add(objects[0].group);

	/* Поворот объектов */
	rotObj = [];

	for (let i = 0; i < objects.length; i++) {
		rotObj.push(objects[i]);
		//console.log(objects[i].name_);
	}
}

function init_3d () {
	var textureCube = new THREE.CubeTextureLoader().load([
		"index_files/1k_stars.jpg",
		"index_files/1k_stars.jpg",
		"index_files/1k_stars.jpg",
		"index_files/1k_stars.jpg",
		"index_files/1k_stars.jpg",
		"index_files/1k_stars.jpg"
	]);

	scene.background = textureCube;

	updateObjectsData();
	draw();
}