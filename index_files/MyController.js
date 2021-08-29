MyController = function(object, domElement) {
// settings
	this.speedRotation = new THREE.Vector3(1, 1, 1);
	this.normalSpeed = 1;
	this.speedMultiplier = 1;

	this.unlockMouseKey = 1; /*Код мыши 1 - LM  2 - MM  3 - RM */

	this.speedZeroing = 0.3;

// don't mod.
	this.camera = camera;

	this.domElement = domElement;

	this.lookIsLock = true;

	this.axisKeys = new THREE.Vector2(0, 0); /* ws ad */
	this.axisMouse = new THREE.Vector2(0, 0);
	this.axisRoll = 0;

	this.sign = new THREE.Vector2(1, 1);

	this.newPos = new THREE.Vector2(0, 0);
	this.oldPos = new THREE.Vector2(0, 0);

	this.currentSpeedMovement;

	//this.rotation = this.camera.rotation.toVector3().clone();

	var contextmenu = function(event) {
		event.preventDefault();
	}

	this.debugTic = 0;

/*
==================================================
Язык вычисляет значение this во время выполнения. Значение зависит от контекста.
ПО МОИМ СКРОМНЫМ НАХУЙ ДОГАДКАМ. КОГДА МЫ addEventListener() и передаем туда наш метод/функцию, this - НЕ НАШ СОЗДАННЫЙ ОБЪЕКТ потому что, пример,

function BrowserMouseDown(method)
{
	this.browser.method(this.event);
}

this - это объект browser, а не MyController
Поэтому используем функцию bind
*/
	this.eventWheel = function()
	{
		if (event.deltaY < 0)
			this.speedMultiplier *= 1.5;
		else
			this.speedMultiplier /= 1.5;

		if (this.speedMultiplier > 1e8)
			this.speedMultiplier = 1e8;
		else if (this.speedMultiplier < 1)
			this.speedMultiplier = 1;
	};

	this.eventMouseDown = function(event)
	{
		if (event.which == this.unlockMouseKey)
			this.lookIsLock = false;
	};

	this.eventMouseUp = function(event)
	{
		if (event.which == this.unlockMouseKey)
			this.lookIsLock = true;
	};

	this.eventMouseMove = function(event)
	{
		this.newPos.x = event.pageX;
		this.newPos.y = event.pageY;

		this.axisMouse = this.oldPos.sub(this.newPos);
		//this.axisMouse = this.axisMouse.normalize();
		this.axisMouse.divideScalar(3);

		this.oldPos = this.newPos.clone();
	};

	this.eventKeyDown = function(event)
	{
		if (event.code == "KeyW")
			this.axisKeys.y = -1;
		else if (event.code == "KeyS")
			this.axisKeys.y = 1;
		else if (event.code == "KeyA")
			this.axisKeys.x = -1;
		else if (event.code == "KeyD")
			this.axisKeys.x = 1;

		else if (event.code == "KeyQ")
			this.axisRoll = 1;
		else if (event.code == "KeyE")
			this.axisRoll = -1;

		else if (event.code == "Equal")
			globalTimeSpeed += 1;
		else if (event.code == "Minus" && globalTimeSpeed > 0)
			globalTimeSpeed -= 1;
	};

	this.eventKeyUp = function(event)
	{
		if (event.code == "KeyW" || event.code == "KeyS")
			this.axisKeys.y = 0;
		else if (event.code == "KeyA" || event.code == "KeyD")
			this.axisKeys.x = 0;

		else if (event.code == "KeyE" || event.code == "KeyQ")
			this.axisRoll = 0;
	};
/*
==================================================
*/
	this.zeroing = function()
	{
		if (this.axisMouse.length() == 0)
			return;

		if (this.axisMouse.x < 0)
			this.sign.x = -1;

		if (this.axisMouse.y < 0)
			this.sign.y = -1;

		this.axisMouse.multiply(this.sign);
		this.axisMouse.subScalar(this.speedZeroing);

		if (this.axisMouse.x < 0)
			this.axisMouse.x = 0;

		if (this.axisMouse.y < 0)
			this.axisMouse.y = 0;

		this.axisMouse.multiply(this.sign);
	}

	this.update = function()
	{
		/* Movement */
		this.currentSpeedMovement = (this.isBoosted ? this.boostSpeedMultiplier : this.normalSpeed) * this.speedMultiplier;

		this.camera.translateZ(this.currentSpeedMovement * this.axisKeys.y);
		this.camera.translateX(this.currentSpeedMovement * this.axisKeys.x);

		/* Rotation */
		if (!this.lookIsLock)
		{
			this.camera.rotateX(this.axisMouse.y * this.speedRotation.y * 0.01);
			this.camera.rotateY(this.axisMouse.x * this.speedRotation.x * 0.01);
		}

		this.camera.rotateZ(this.axisRoll * this.speedRotation.x * 0.01);

		this.zeroing();

		// this.debugTic += 1;

		// if (this.debugTic >= 100)
		// {
		// 	this.debugTic = 0;
		// 	console.log(camera.position.x + ' ' + camera.position.y + ' ' + camera.position.z);
		// }
	};

	function bind(scope, fn) {
		return function() {
			fn.apply(scope, arguments);
		};
	}

	var _onMouseMove = bind(this, this.eventMouseMove);
	var _onWheele = bind(this, this.eventWheel);
	var _onMouseDown = bind(this, this.eventMouseDown);
	var _onMouseUp = bind(this, this.eventMouseUp);
	var _onKeyDown = bind(this, this.eventKeyDown);
	var _onKeyUp = bind(this, this.eventKeyUp);

	this.domElement.addEventListener("contextmenu", contextmenu, false);
	window.addEventListener("mousemove", _onMouseMove, false);
	this.domElement.addEventListener("wheel", _onWheele, false);
	this.domElement.addEventListener("mousedown", _onMouseDown, false);
	window.addEventListener("mouseup", _onMouseUp, false);

	window.addEventListener("keydown", _onKeyDown, false);
	window.addEventListener("keyup", _onKeyUp, false);
};