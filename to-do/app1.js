//add Container
var container2 = document.querySelector(".container2");
var container3 = document.querySelector(".container3");
var notes = document.querySelector(".notes");
var notification = document.getElementById("del");
const selctorNav = document.querySelectorAll(".nav-btn li");
console.log(selctorNav);
var addButton = document.querySelector(".add-btn");
var container = document.querySelector(".container");
//get elemnet from local Storage
var todosList = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todosList);
if (todosList.length > 0) {
  console.log("list");
  displayTask();
}

//add element
addButton.addEventListener("click", (e) => {
  e.preventDefault();
  var addInputBtn = document.querySelector(".inpUpdate");
  var inputClose = document.querySelector(".inpClose");
  var enteredInput = document.querySelector(".editInp");

  var cancelInpBtn = document.querySelector(".inpCancel");
  var addErrorMsg = document.querySelector(".addErr");
  var inputModel = document.querySelector(".inputModel");
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
      notification.innerHTML = "Added successfully";
      setTimeout(function () {
        notification.innerHTML = "";
      }, 2000);
    }
  });
  inputClose.addEventListener("click", () => {
    inputModel.style.display = "none";
  });
  cancelInpBtn.addEventListener("click", () => {
    inputModel.style.display = "none";
  });
});

//add task to local storage
function addTaskToLocalStore(input) {
  todosList = JSON.parse(localStorage.getItem("todos")) || [];
  todosList.push({
    text: input,
    completed: false,
  });
  localStorage.setItem("todos", JSON.stringify(todosList));
  displayTask();
}
if (todosList.length === 0) {
  container.innerHTML = "No Task";
}
// display task
function displayTask() {
  container2.style.display = "none";
  container3.style.display = "none";
  container.style.display = "block";
  container.innerHTML = "";
  notes.style.display = "block";

  if (todosList.length === 0) {
    container.innerHTML = "No Task";
  }
  todosList.forEach((todoList) => {
    var itemBox = document.createElement("div");
    itemBox.classList.add("item");
    var todoElement = document.createElement("li");
    todoElement.innerHTML = todoList.text;
    todoElement.classList.add("item_input");
    todoElement.id = "placing";

    todoElement.addEventListener("click", (e) => {
      e.preventDefault();
      todoElement.classList.toggle("completed");
      updateTaskToLocalStore();
    });

    if (todoList && todoList.completed) {
      todoElement.classList.add("completed");
    }

    var editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.innerHTML = "EDIT";
    editBtn.id = "placing";
    editBtn.addEventListener("click", (e) => {
      e.preventDefault();
      editElement(todoElement);
    });

    var removeBtn = document.createElement("button");
    removeBtn.innerHTML = "DELETE";
    removeBtn.classList.add("delete");
    removeBtn.id = "placing";
    removeBtn.addEventListener("click", () => {
      removeElement(itemBox, todoList.text);
    });

    itemBox.appendChild(todoElement);
    itemBox.appendChild(editBtn);
    itemBox.appendChild(removeBtn);
    container.appendChild(itemBox);
  });
}

function editElement(todoEl) {
  var updateModel = document.querySelector(".edit-model");
  var userInputBox = document.querySelector(".edit-input");
  var errorMsg = document.querySelector(".editErr");
  var updateBtn = document.querySelector(".edit-update");
  var upCancelBtn = document.querySelector(".edit-cancel");
  var upCloseBtn = document.querySelector(".edit-Close");
  var todoText = todoEl.innerHTML;
  for (var i = 0; i < todosList.length; i++) {
    console.log(todosList[i].text);
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
      console.log(userInputBox.value);
      if (userInputBox.value === "") {
        errorMsg.innerHTML = "Enter your task";
        setTimeout(function () {
          errorMsg.innerHTML = "";
        }, 2000);
      } else {
        todosList[index].text = userInputBox.value;
        window.localStorage.setItem("todos", JSON.stringify(todosList));
        //todoEl.innerHTML = userInputBox.value;
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

function removeElement(itemBox, todoText) {
  var index = -1;
  for (var i = 0; i < todosList.length; i++) {
    if (todosList[i].text === todoText) {
      index = i;
      break;
    }
  }
  var delModel = document.querySelector(".modal");
  var delModelContent = document.querySelector(".delP");
  var delBtn = document.querySelector(".del1");
  var delCanBtn = document.querySelector(".cancel1");
  var delClose = document.querySelector(".close");
  //delete if task completed
  if (todosList[index].completed === true) {
    delModelContent.innerHTML = "Are your Sure?";
    delModel.style.display = "block";
    delBtn.addEventListener("click", () => {
      console.log(itemBox);
      console.log(itemBox.parentNode);
      delModel.style.display = "none";
      itemBox.parentNode.removeChild(itemBox);
      todosList.splice(index, 1);
      window.localStorage.setItem("todos", JSON.stringify(todosList));
      todosList = JSON.parse(localStorage.getItem("todos")) || [];
      notification.innerHTML = "Deleted successfully";
      setTimeout(function () {
        notification.innerHTML = "";
      }, 2000);
    });
    delCanBtn.addEventListener("click", () => {
      delModel.style.display = "none";
    });
    delClose.addEventListener("click", () => {
      delModel.style.display = "none";
    });
  } else {
    //delete task incomplete
    delModelContent.innerHTML = "Ypur task is inComplete?Are your Sure?";
    delModel.style.display = "block";
    delBtn.addEventListener("click", () => {
      itemBox.parentNode.removeChild(itemBox);
      todosList.splice(index, 1);
      window.localStorage.setItem("todos", JSON.stringify(todosList));
      todosList = JSON.parse(localStorage.getItem("todos")) || [];
      delModel.style.display = "none";
      notification.innerHTML = "Deleted successfully";
      setTimeout(function () {
        notification.innerHTML = "";
      }, 2000);
    });
    delCanBtn.addEventListener("click", () => {
      delModel.style.display = "none";
    });
    delClose.addEventListener("click", () => {
      delModel.style.display = "none";
    });
  }
  //displayTask();
}

var btnContainer = document.getElementsByClassName("nav-btn");
var btns = document.getElementsByClassName("btn");
console.log(btns);
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
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

selctorNav.forEach((item) =>
  item.addEventListener("click", (e) => {
    e.preventDefault();
    var currentActiveNav = document.getElementsByClassName("active");
    //console.log(currentActiveNav);
    switch (e.target.id) {
      case "completed":
        console.log("complete");
        container.style.display = "none";
        container3.style.display = "none";
        notes.style.display = "none";
        container2.innerHTML = "";
        for (var i = 0; i < todosList.length; i++) {
          if (todosList[i].completed === true) {
            var todoText = todosList[i].text;
            var itemBox = document.createElement("div");
            itemBox.classList.add("item");

            var todoEl = document.createElement("li");
            todoEl.innerHTML = todoText;
            todoEl.classList.add("item_input1");
            todoEl.id = "placing";
            container2.appendChild(itemBox);
            itemBox.append(todoEl);
          }
        }
        if (container2.innerHTML == "") {
          container2.innerHTML = "No Completed Task";
          container2.style.display = "block";
        } else {
          container2.style.display = "block";
        }
        break;
      case "incomplete":
        console.log("inComplete");
        container.style.display = "none";
        container2.style.display = "none";
        container3.innerHTML = "";
        notes.style.display = "none";
        for (var i = 0; i < todosList.length; i++) {
          if (todosList[i].completed === false) {
            var todoText = todosList[i].text;
            var itemBox = document.createElement("div");
            itemBox.classList.add("item");

            var todoEl = document.createElement("li");
            todoEl.innerHTML = todoText;
            todoEl.classList.add("item_input1");
            todoEl.id = "placing";
            container3.appendChild(itemBox);
            itemBox.append(todoEl);
          }
        }
        if (container3.innerHTML == "") {
          container3.innerHTML = "No Incomplete Task";
          container3.style.display = "block";
        } else {
          container3.style.display = "block";
        }
        break;
      case "total":
        displayTask();
        break;
    }
  })
);
