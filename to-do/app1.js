var container = document.querySelector(".container");
var notification = document.getElementById("del");
const selctorNav = document.querySelectorAll(".nav-btn li");
var addButton = document.querySelector(".add-btn");
//get elemnet from local Storage
var todosList = JSON.parse(localStorage.getItem("todos")) || [];
displayTask();
//add element
var addInputBtn = document.querySelector(".inpUpdate");
var inputClose = document.querySelector(".inpClose");
var addErrorMsg = document.querySelector(".addErr");
var inputModel = document.querySelector(".inputModel");
var enteredInput = document.querySelector(".editInp");
inputClose.onclick = () => {
	inputModel.style.display = "none";
};
var cancelInpBtn = document.querySelector(".inpCancel");
cancelInpBtn.onclick = () => {
	inputModel.style.display = "none";
};
addButton.addEventListener("click", (e) => {
	e.preventDefault();
	inputModel.style.display = "block";
	enteredInput.focus();
	addInputBtn.addEventListener("click", () => {
		if (enteredInput.value === "") {
			addErrorMsg.innerHTML = "Add Your Task";
			setTimeout(function () {
				addErrorMsg.innerHTML = "";
			}, 1000);
		} else {
			var input = enteredInput.value;
			addTaskToLocalStore(input);
			inputModel.style.display = "none";
			enteredInput.value = "";
			todosList = JSON.parse(localStorage.getItem("todos")) || [];
			delMsg((msg = "Added"));
		}
	});
});
//add task to local storage
function addTaskToLocalStore(input) {
	todosList.push({
		text: input,
		completed: false,
	});
	localStorage.setItem("todos", JSON.stringify(todosList));
	displayTask();
}
//create element
function createElement(element, clsName, Id, innerText) {
	var el = document.createElement(element);
	el.classList.add(clsName);
	el.id = Id;
	el.innerHTML = innerText;
	return el;
}
//display tasks
function displayTask() {
	container.innerHTML = "";
	if (todosList.length == 0) {
		container.innerHTML = "No Task";
	}
	if (todosList.length === 0) {
		container.innerHTML = "No Task";
	}
	todosList.forEach((todoList) => {
		var itemBox = document.createElement("div");
		itemBox.classList.add("item");
		var todoTxt = todoList.text;
		var todoElement = createElement("li", "item_input", "placing", todoTxt);
		console.log(todoElement);
		todoElement.onclick = (e) => {
			e.preventDefault();
			todoElement.classList.toggle("completed");
			updateTaskToLocalStore();
		};
		if (todoList && todoList.completed) {
			todoElement.classList.add("completed");
		}

		var editBtn = createElement("button", "edit", "placing", "EDIT");
		editBtn.onclick = () => {
			editElement(todoElement);
		};

		var removeBtn = createElement("button", "delete", "placing", "DELETE");
		removeBtn.onclick = () => {
			removeElement(itemBox, todoList.text);
		};

		itemBox.appendChild(todoElement);
		itemBox.appendChild(editBtn);
		itemBox.appendChild(removeBtn);
		container.appendChild(itemBox);
	});
}
//edit function
function editElement(todoEl) {
	var updateModel = document.querySelector(".edit-model");
	var userInputBox = document.querySelector(".edit-input");
	var errorMsg = document.querySelector(".editErr");
	var updateBtn = document.querySelector(".edit-update");
	var upCancelBtn = document.querySelector(".edit-cancel");
	var upCloseBtn = document.querySelector(".edit-Close");
	var todoText = todoEl.innerHTML;
	for (var i = 0; i < todosList.length; i++) {
		if (todosList[i].text === todoText) {
			index = i;
			break;
		}
	}
	if (todosList[index].completed === false) {
		updateModel.style.display = "block";
		userInputBox.value = todosList[index].text;
		userInputBox.focus();
		updateBtn.addEventListener("click", () => {
			if (userInputBox.value === "") {
				errorMsg.innerHTML = "Enter your task";
				setTimeout(function () {
					errorMsg.innerHTML = "";
				}, 2000);
			} else {
				todosList[index].text = userInputBox.value;
				window.localStorage.setItem("todos", JSON.stringify(todosList));
				updateModel.style.display = "none";
				displayTask();
			}
		});
		upCancelBtn.addEventListener("click", () => {
			updateModel.style.display = "none";
		});
		upCloseBtn.addEventListener("click", () => {
			updateModel.style.display = "none";
		});
	} else {
		var modal2 = document.querySelector(".modal1");
		var span1 = document.querySelector(".close1");
		var ok = document.querySelector(".ok");
		modal2.style.display = "block";
		span1.addEventListener("click", () => {
			modal2.style.display = "none";
		});
		ok.addEventListener("click", () => {
			modal2.style.display = "none";
		});
	}
}
//remove function
function removeElement(itemBox, todoText) {
	var delModel = document.querySelector(".modal");
	var delModelContent = document.querySelector(".delP");
	var delBtn = document.querySelector(".del1");
	var delCanBtn = document.querySelector(".cancel1");
	var delClose = document.querySelector(".close");
	delCanBtn.onclick = () => {
		delModel.style.display = "none";
	};
	delClose.onclick = () => {
		delModel.style.display = "none";
	};
	var index = -1;
	for (var i = 0; i < todosList.length; i++) {
		if (todosList[i].text === todoText) {
			index = i;
			break;
		}
	}
	if (todosList[index].completed === true) {
		delModelContent.innerHTML = "Are your Sure?";
		delModel.style.display = "block";
		delBtn.onclick = () => {
			delAction(itemBox, index, delModel);
		};
	} else {
		delModelContent.innerHTML = "Your task is inComplete?Are your Sure?";
		delModel.style.display = "block";
		delBtn.onclick = () => {
			delAction(itemBox, index, delModel);
		};
	}
}
function delAction(itemBox, index, delModel) {
	itemBox.parentNode.removeChild(itemBox);
	todosList.splice(index, 1);
	window.localStorage.setItem("todos", JSON.stringify(todosList));
	todosList = JSON.parse(localStorage.getItem("todos")) || [];
	delModel.style.display = "none";
	delMsg((msg = "Deleted"));
}
function delMsg(msg) {
	notification.innerHTML = msg + " Successfully";
	setTimeout(function () {
		notification.innerHTML = "";
	}, 2000);
}
//complete sts update
function updateTaskToLocalStore() {
	const todosEl = document.querySelectorAll(".item_input");
	const todos = [];
	todosEl.forEach((todoEl) => {
		todos.push({
			text: todoEl.innerHTML,
			completed: todoEl.classList.contains("completed"),
		});
	});
	localStorage.setItem("todos", JSON.stringify(todos));
	todosList = JSON.parse(localStorage.getItem("todos"));
}
//active nav bars
var btnContainer = document.getElementsByClassName("nav-btn");
var btns = document.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function () {
		var current = document.getElementsByClassName("active");
		current[0].className = current[0].className.replace(" active", "");
		this.className += " active";
	});
}
//nav bar function
selctorNav.forEach((item) =>
	item.addEventListener("click", (e) => {
		switch (e.target.id) {
			case "completed":
				var dataItem = document.querySelectorAll(".item_input");
				for (i = 0; i < dataItem.length; i++) {
					if (dataItem[i].classList.contains("completed")) {
						dataItem[i].parentNode.style.display = "block";
					} else {
						dataItem[i].parentNode.style.display = "none";
					}
				}
				break;
			case "incomplete":
				var dataItem = document.querySelectorAll(".item_input");
				for (i = 0; i < dataItem.length; i++) {
					if (dataItem[i].classList.contains("completed")) {
						dataItem[i].parentNode.style.display = "none";
					} else {
						dataItem[i].parentNode.style.display = "block";
					}
				}
				break;
			case "total":
				displayTask();
				break;
		}
	})
);
