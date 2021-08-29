var sidebarHided = false;
var propertiesHided = false;

function updateAfterResizeWindow() {
	let sidebar = document.body.querySelector("div.sidebar-list");

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	sidebar.style.height = window.innerHeight + "px";

	if (sidebar.clientHeight > window.innerHeight)
		sidebar.style.overflowY = "scroll";
	else
		sidebar.style.overflowY = "auto";

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function sidebarHide() {
	document.body.querySelector("div.sidebar").style.width = 170 * sidebarHided + "px";

	if (sidebarHided)
		this.innerText = "<";
	else
		this.innerText = ">";

	sidebarHided = !sidebarHided;
}

function propertiesHide() {
	document.body.querySelector("div.properties").style.width = 270 * propertiesHided + 10 + "px";

	if (propertiesHided)
		this.innerText = ">";
	else
		this.innerText = "<";

	propertiesHided = !propertiesHided;
}

function getDataAboutObject() {
	let propertiesListRowValue = document.querySelectorAll("div.properties-list-row-value");
	let name = document.querySelectorAll("div.sidebar-list-row");

	for (let i = 0; i < listOfObjectInSidebar.length; i++)
	{
		if (this == name[i])
		{
			name = this.innerText;
			break;
		}
	}

	let index;

	for (let i = 0; i < listOfObjectInSidebar.length; i++)
	{
		if (listOfObjectInSidebar[i].name_ == name)
		{
			index = i;
			break;
		}
	}

	let checkNull = function(param, postfix="") {
		if (param !== null)
			return param + postfix;
		return "Нет данных";
	};

	propertiesListRowValue[0].innerText = listOfObjectInSidebar[index].class_;
	propertiesListRowValue[1].innerText = listOfObjectInSidebar[index].name_;
	propertiesListRowValue[2].innerText = checkNull(listOfObjectInSidebar[index].mass, " кг");
	propertiesListRowValue[3].innerText = checkNull(listOfObjectInSidebar[index].diameter, " км");
	propertiesListRowValue[4].innerText = checkNull(listOfObjectInSidebar[index].density, " г/см^3");
	propertiesListRowValue[5].innerText = checkNull(listOfObjectInSidebar[index].temperature, " С");

	// Добавление camera в объект на который нажали
	listOfObjectInSidebar[index].group.add(camera);
	let pos = listOfObjectInSidebar[index].mesh.position.clone().add((new THREE.Vector3(0, 0, 1)).multiplyScalar(listOfObjectInSidebar[index].diameter));
	camera.position.set(pos.x, pos.y, pos.z);
	listOfObjectInSidebar[index].mesh.getWorldPosition(pos);
	camera.lookAt(pos.x, pos.y, pos.z);
	
	// Рандомное значение вектор2, нормализация и умножение на половину диаметр объекта + 500 км
	// camera.atlook = координаты объекта
}

function init_ui () {
	document.body.appendChild(renderer.domElement);

	//Генерация html из var list
	let tmpHtml;

	for (let i = 0; i < listOfObjectInSidebar.length; i++)
	{
		tmpHtml = "<div class=\"sidebar-list-row\">" + 
		"<img class=\"sidebar-list-row-icon\" src=\"index_files/unknow.png\">" + 
		"<div class=\"sidebar-list-row-name\">" + listOfObjectInSidebar[i].name_ + "</div>" + 
		"</div>";

		document.querySelector("div.sidebar-list").insertAdjacentHTML("beforeend", tmpHtml);
	}

	updateAfterResizeWindow();

	window.addEventListener("resize", updateAfterResizeWindow, false);

	document.body.querySelector("div.sidebar-buttonhide").addEventListener("click", sidebarHide, false);
	document.body.querySelector("div.properties-buttonhide").addEventListener("click", propertiesHide, false);

	let list = document.body.querySelectorAll("div.sidebar-list-row");

	for (let i = 0; i < listOfObjectInSidebar.length; i++)
		list[i].addEventListener("click", getDataAboutObject, false);
}