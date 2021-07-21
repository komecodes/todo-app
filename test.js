//   Selectors
const createTodo = document.querySelector(".create-todo");
const todoList = document.querySelector("#todoslist");
const todoForm = document.querySelector("#todo-form");
const sortTodo = document.querySelector(".todo-sort");
const clearCompletedTodoBtn = document.querySelector(".clear-completed-btn");
const activeTodosCounter = document.querySelector("#active-todo-counter");

// Arrays

const todos = [];
const completedTodos = []; //Clear completed should remove all items in the todos that has the completed class and push them to the completedTodos array

//Event listeners
createTodo.addEventListener("keypress", createNewTodo);
todoList.addEventListener("click", updateTodo);
sortTodo.addEventListener("click", filterTodo);
clearCompletedTodoBtn.addEventListener("click", clearCompletedTodo);

//Functions

// Create new todo
function createNewTodo(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (createTodo.value) {
      // Div container for new todo created
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo-div");
      // todoDiv.setAttribute("draggable", "true");

      // create radio button and add to div
      const todoCheckButton = document.createElement("input");
      todoCheckButton.type = "radio";
      todoCheckButton.setAttribute("name", "radio-button");
      todoCheckButton.classList.add("check-todo");
      todoDiv.appendChild(todoCheckButton);

      // create list item to hold the todo text and add to div

      const todoInput = document.createElement("li");
      todoInput.classList.add("todo-text");
      todoInput.innerText = createTodo.value;
      todoDiv.appendChild(todoInput);

      // create delete button/icon and add to div

      const todoDelete = document.createElement("img");
      todoDelete.src = "images/icon-cross.svg";
      todoDelete.classList.add("delete-todo");
      todoDiv.appendChild(todoDelete);

      todoList.appendChild(todoDiv);
      // reset create todo form to default placeholder text
      todoForm.reset();
      todos.push(todoDiv);
      countTodo();
    }
  }
}

// Delete todo and check/uncheck todo as completed

function updateTodo(e) {
  const item = e.target;
  const todo = item.parentElement;
  if (item.classList.contains("delete-todo")) {
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    for (let i = 0; i < todos.length; i++) {
      console.log(todos);
      if (todos[i].classList.contains("fall")) {
        todos.splice(i, 1);
        i--;
      }
    }
    countTodo();
  }

  if (item.classList.contains("check-todo")) {
    item.classList.toggle("special-class");
    const todoChildren = todo.childNodes;
    todoChildren.forEach(function (element) {
      if (element.classList.contains("todo-text")) {
        element.classList.toggle("todo-completed");
        todo.classList.toggle("complete-div");
      }
    });
    countTodo();
  }
}

// Sort/filter through todos according to status - active, completed, all

function filterTodo(e) {
  if (e.target.value === "all") {
    for (let i = 0; i < todos.length; i++) {
      todos[i].style.display = "grid";
    }
  } else if (e.target.value === "completed") {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].classList.contains("complete-div")) {
        todos[i].style.display = "grid";
      } else {
        todos[i].style.display = "none";
      }
    }
  } else if (e.target.value === "active") {
    for (let i = 0; i < todos.length; i++) {
      if (!todos[i].classList.contains("complete-div")) {
        todos[i].style.display = "grid";
      } else {
        todos[i].style.display = "none";
      }
    }
  }
}

// clear completed todos
// Find a way to save completed todos that were cleared

function clearCompletedTodo(_event) {
  for (let i = 0; i < todos.length; i++) {
    console.log(todos);
    if (todos[i].classList.contains("complete-div")) {
      todos[i].style.display = "none";
      todos.splice(i, 1);
      i--;
    }
  }
  countTodo();
}

// Count todo and show active todo status

function countTodo() {
  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) =>
    todo.classList.contains("complete-div")
  );
  const activeTasks = totalTasks - completedTasks.length;
  activeTodosCounter.innerText = activeTasks;
}

// Theme toggle function

function darkTheme() {
  const themeToggle = document.getElementById("theme-toggle").src;
  if (themeToggle.indexOf("images/icon-moon.svg") != -1) {
    document.getElementById("theme-toggle").src = "images/icon-sun.svg";
    const elementsWithSameStyle = document.querySelectorAll(
      ".form-group, .todos-block, .todo-sort, .create-todo, .clear-completed-btn, #todo-radio,body, header"
    );
    console.log(elementsWithSameStyle);
    for (let i = 0; i < elementsWithSameStyle.length; i++) {
      elementsWithSameStyle[i].classList.add("dark");
    }
  } else {
    document.getElementById("theme-toggle").src = "images/icon-moon.svg";
    const elementsWithSameStyle = document.querySelectorAll(
      ".form-group, .todos-block, .todo-sort, .create-todo, .clear-completed-btn, #todo-radio,body, header"
    );
    console.log(elementsWithSameStyle);
    for (let i = 0; i < elementsWithSameStyle.length; i++) {
      elementsWithSameStyle[i].classList.remove("dark");
    }
  }
}
new Sortable(todoList,{
  animation: 200,
  handle: ".todo-div",
  sort: "true"
})