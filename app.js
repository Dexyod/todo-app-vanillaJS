/*-----------------------Selectors-------------------------------*/
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

/*-----------------------Event Listeners--------------------------*/
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

/*-----------------------Functions-------------------------------*/

//Add Todo function
function addTodo(e) {
  //Prevent form from submitting
  e.preventDefault();

  //Create Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");

  //Append Li to TODO div
  todoDiv.appendChild(newTodo);

  //Add to Local Storage
  saveLocalTodos(todoInput.value);

  //Check Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");

  //Append Complete Button
  todoDiv.appendChild(completedButton);

  //Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");

  //Append Delete Button
  todoDiv.appendChild(deleteButton);

  //Append All to List
  todoList.appendChild(todoDiv);

  //Clear Input Value
  todoInput.value = "";
}

//Delete Check function
function deleteCheck(e) {
  const item = e.target;

  //Delete Todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;

    //Animation
    todo.classList.add("fall");

    //remove todo in local storage
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Check Mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//Filter Todo
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//Save Todo List function
function saveLocalTodos(todo) {
  //Check Storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Get Todos back from Local Storage on refresh
function getTodos() {
  //Check Storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    //Append Li to TODO div
    todoDiv.appendChild(newTodo);

    //Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");

    //Append Complete Button
    todoDiv.appendChild(completedButton);

    //Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");

    //Append Delete Button
    todoDiv.appendChild(deleteButton);

    //Append All to List
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  //Check Storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;

  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
