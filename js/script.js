// Take todos array and todosId from local storage
var todos = JSON.parse(localStorage.getItem('todos')) || [];

var todoId = Number(localStorage.getItem('todoCounter'));

//Chosing elements
var elTodoForm = $_('.js-task-form');
var elTodoInput = $_('.js-task-input', elTodoForm);
var elTodoList = $_('.js-tasks-list');
var elTodoTamplate = $_('#task-template').content;
var elTodosFooter = $_('.js-todos-footer');


// ===================================
//       FUNCTIONS
// ===================================

//Push todo to todos array function
var pushTodo = function (todo) {
  todos.push({
    task: todo,
    completed: false,
    id: ++todoId
  });
}

// Create todo Element
var createTodoElement = function (todo) {
  var newTodoElement = elTodoTamplate.cloneNode(true);

  $_('.js-task-content', newTodoElement).textContent = todo.task;
  $_('.js-is-completed-checkbox', newTodoElement).dataset.todoId = todo.id;
  $_('.js-is-completed-checkbox', newTodoElement).checked = todo.completed;
  $_('.js-remove-task-btn', newTodoElement).dataset.todoId = todo.id;

  if (todo.completed) {
    $_('.js-task-list-item', newTodoElement).classList.add('completed-task');
  }

  return newTodoElement;
}

//RenderTodos function
var renderTodos = function () {
  elTodoList.innerHTML = '';
  elTodosFragment = document.createDocumentFragment();

  todos.forEach(function (todo) {
    elTodosFragment.appendChild(createTodoElement(todo));
  });

  elTodoList.appendChild(elTodosFragment);

  if (todos.length !== 0) {
    elTodosFooter.classList.remove('d-none');
    elTodosFooter.classList.add('d-flex');
  }
}

//Clear to do input value function
var clearTodoInputValue = function () {
  elTodoInput.value = '';
}

//Update local todos
var updateLocalTodos = function () {
  localStorage.setItem('todos', JSON.stringify(todos));
}

//Update local todoId
var updateLocalTodoId = function () {
  localStorage.setItem('todoCounter', todoId);
}

// Listen to submit event of form function
var onFormSubmit = function (evt) {
  evt.preventDefault();

  // Take value of todo input
  var todoInputValue = elTodoInput.value.trim();

  // Check todo input value isn't empty
  if (!todoInputValue) {
    alert('Iltimos, vazifani kiriting!!');
    return;
  }

  //Push todo to todos array
  pushTodo(todoInputValue);

  //Render todos
  renderTodos();

  //Clear todo Input value after rendering todos
  clearTodoInputValue();

  //Update local Todos and todoId
  updateLocalTodos();
  updateLocalTodoId();
}


// ===============================
// LISTEN TO EVENTS
// ===============================

elTodoForm.addEventListener('submit', onFormSubmit);

elTodoList.addEventListener('click', function (evt) {
  if (evt.target.matches('.js-remove-task-btn')) {
    var removedTodoId = Number(evt.target.dataset.todoId);

    var todoIndex = todos.findIndex(function (todo) {
      return todo.id === removedTodoId;
    });

    evt.target.closest('.tasks-li').remove();
    todos.splice(todoIndex, 1);
    updateLocalTodos();
  }

  if (evt.target.matches('.js-is-completed-checkbox')) {
    var completedTodoId = Number(evt.target.dataset.todoId);

    var completedTodo = todos.find(function (todo) {
      if (todo.id === completedTodoId) {
        todo.completed = !todo.completed;
      }
    });

    evt.target.closest('.js-task-list-item').classList.toggle('completed-task');

    updateLocalTodos();
  }
});


//Show all todos by taking from localStorage
renderTodos();
