var add = document.querySelector("button");
var container1 = document.querySelector(".container");
var container2 = document.querySelector(".container2");
var container3 = document.querySelector(".container3");
var del = document.getElementById("del");
var notes = document.querySelector(".notes");

container2.style.display = "none";
container3.style.display = "none";
//fetching element from todo element in local storage
const todos = JSON.parse(localStorage.getItem("todos"));
if (todos) {
  todos.forEach((todo) => {
    addToList(todo); //displaying content in the container
  });
}

//displaying Nav Bars
var totalTask = document.querySelector(".totalTask");
var completedTask = document.querySelector(".completedTask");
var incompleteTask = document.querySelector(".incompleteTask");
var complete = 0;

if (todos && todos.length > 0) {
  var total = todos.length;
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].completed) {
      complete += 1;
    }
  }
  var incomplete = total - complete;
  totalTask.innerHTML = " Total task (" + total + ")";
  completedTask.innerHTML = " Completed (" + complete + ")";
  incompleteTask.innerHTML = "Incomplete (" + incomplete + ")";
} else {
  totalTask.innerHTML = " Total task (0)";
  completedTask.innerHTML = "Completed (0)";
  incompleteTask.innerHTML = "Incomplete(0)";
}
totalTask.addEventListener("click", () => {
  container2.innerHTML = "";
  container2.style.display = "none";
  container3.innerHTML = "";
  container3.style.display = "none";
  container1.style.display = "block";
  notes.style.display = "block";
});
completedTask.addEventListener("click", () => {
  container1.style.display = "none";
  container3.style.display = "none";
  notes.style.display = "none";
  container2.innerHTML = "";
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].completed === true) {
      var todoText = todos[i].text;
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
});
incompleteTask.addEventListener("click", () => {
  container1.style.display = "none";
  container2.style.display = "none";
  container3.innerHTML = "";
  notes.style.display = "none";
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].completed === false) {
      var todoText = todos[i].text;
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
});

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
//adding element to todo list
add.addEventListener("click", function (e) {
  e.preventDefault();
  callInp();
});

//pop for getting input
var input;
var inpModel = document.querySelector(".inputModel");
var inptClose = document.querySelector(".inpClose");
var inpUpdate = document.querySelector(".inpUpdate");
var inp = document.querySelector(".editInp");
var inpCancel = document.querySelector(".inpCancel");
var addConetent = document.querySelector(".addContent");
var addErr = document.querySelector(".addErr");
function callInp() {
  var inpUpdate1 = document.querySelector(".inpUpdate");
  inpUpdate1.innerHTML = "Add Task";
  addConetent.innerHTML = "Enter Your Task";
  inpModel.style.display = "block";
  inp.focus();
  inpUpdate1.addEventListener("click", () => {
    if (inp.value == "") {
      addErr.innerHTML = "Add your task";
      setTimeout(function () {
        addErr.innerHTML = "";
      }, 1000);
    } else {
      input = inp.value;
      addToList();
      inp.value = "";
      inpModel.style.display = "none";
      del.innerHTML = "Added successfully";
      setTimeout(function () {
        del.innerHTML = "";
        window.location.reload();
      }, 2000);
    }
  });
  inptClose.addEventListener("click", () => {
    inpModel.style.display = "none";
    window.location.reload();
  });
  inpCancel.addEventListener("click", () => {
    inpModel.style.display = "none";
    window.location.reload();
  });
}

//adding and displaying content in the container
function addToList(todo) {
  var todoText = input;
  if (todo) {
    todoText = todo.text;
  }
  if (todoText) {
    console.log(todoText);
    var itemBox = document.createElement("div");
    itemBox.classList.add("item");

    var todoEl = document.createElement("li");
    todoEl.innerHTML = todoText;
    todoEl.classList.add("item_input");
    todoEl.id = "placing";

    todoEl.addEventListener("click", (e) => {
      e.preventDefault();
      todoEl.classList.toggle("completed");
      updateTodoList();
      window.location.reload();
    });

    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    var edit = document.createElement("button");
    edit.classList.add("edit");
    edit.innerHTML = "EDIT";
    edit.id = "placing";
    edit.addEventListener("click", () => {
      editEl(todoText);
      updateTodoList();
    });

    var remove = document.createElement("button");
    remove.innerHTML = "DELETE";
    remove.classList.add("delete");
    remove.id = "placing";
    remove.addEventListener("click", () => {
      removeEl(itemBox, todoText);
      updateTodoList();
    });
    container1.appendChild(itemBox);
    itemBox.appendChild(todoEl);
    itemBox.appendChild(edit);
    itemBox.appendChild(remove);
    updateTodoList();
  }
}
if (container1.innerHTML == "") {
  container1.innerHTML = "No Task. Add Your Task";
}
function updateTodoList() {
  const todosEl = document.querySelectorAll(".item_input");
  const todos = [];
  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerHTML,
      completed: todoEl.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeEl(itemBox, todoText) {
  var p = document.querySelector(".delP");
  var modal1 = document.querySelector(".modal");
  var span = document.querySelector(".close");
  var del1 = document.querySelector(".del1");
  console.log("del1");
  var can1 = document.querySelector(".cancel1");
  var index = -1;
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].text === todoText) {
      index = i;
      break;
    }
  }
  console.log(index);
  console.log(todos[index].completed);
  if (todos[index].completed == true) {
    p.innerHTML = "Are you sure you want to delete this?";
    modal1.style.display = "block";
    span.addEventListener("click", () => {
      modal1.style.display = "none";
    });
    del1.addEventListener("click", () => {
      modal1.style.display = "none";
      itemBox.parentNode.removeChild(itemBox);
      todos.splice(index, 1);
      window.localStorage.setItem("todos", JSON.stringify(todos));
      del.innerHTML = "Deleted successfully";
      setTimeout(function () {
        del.innerHTML = "";
        window.location.reload();
      }, 1000);
    });
    can1.addEventListener("click", () => {
      modal1.style.display = "none";
    });
  } else {
    p.innerHTML =
      "Your Task is incomplete.Are you sure you want to delete this?";
    modal1.style.display = "block";
    span.addEventListener("click", () => {
      hideModal();
    });
    function hideModal() {
      modal1.style.display = "none";
    }
    del1.addEventListener("click", () => {
      modal1.style.display = "none";
      itemBox.parentNode.removeChild(itemBox);
      todos.splice(index, 1);
      window.localStorage.setItem("todos", JSON.stringify(todos));
      del.innerHTML = "Deleted successfully";
      setTimeout(function () {
        del.innerHTML = "";
        window.location.reload();
      }, 1000);
    });

    can1.addEventListener("click", () => {
      modal1.style.display = "none";
    });
  }
}
function editEl(todoText) {
  var modal2 = document.querySelector(".modal1");
  var span1 = document.querySelector(".close1");
  var ok = document.querySelector(".ok");
  var index = -1;
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].text === todoText) {
      index = i;
      break;
    }
  }
  if (!todos[index].completed) {
    inpModel.style.display = "block";
    inptClose.addEventListener("click", () => {
      inpModel.style.display = "none";
    });
    inpCancel.addEventListener("click", () => {
      inpModel.style.display = "none";
    });
    var exText = todos[index].text;
    inp.value = exText;
    inp.focus();
    inpUpdate.addEventListener("click", () => {
      if (inp.value == "") {
        addErr.innerHTML = "Your task Content is Empty.Please add Your Task";
        setTimeout(function () {
          addErr.innerHTML = "";
        }, 2000);
      } else {
        todos[index].text = inp.value;
        window.localStorage.setItem("todos", JSON.stringify(todos));
        inpModel.style.display = "none";
        window.location.reload();
      }
    });
  } else {
    modal2.style.display = "block";
    span1.addEventListener("click", () => {
      modal2.style.display = "none";
    });
    ok.addEventListener("click", () => {
      modal2.style.display = "none";
    });
  }
}
