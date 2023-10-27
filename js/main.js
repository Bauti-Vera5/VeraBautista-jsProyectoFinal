document.addEventListener("DOMContentLoaded", function() {
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    const todoListElement = document.getElementById("todo-list");
    const taskInput = document.getElementById("task-input");
    const output = document.getElementById("output");

    function renderTodoList() {
        todoListElement.innerHTML = "";
        todoList.forEach(function(task, index) {
            const li = document.createElement("li");
            li.textContent = task;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", function() {
                todoList.splice(index, 1);
                renderTodoList();
                saveToLocalStorage();
            });
            li.appendChild(deleteButton);
            todoListElement.appendChild(li);
        });
    }


function saveToLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

renderTodoList();

document.getElementById("add-task").addEventListener("click", function() {
    const newTask = taskInput.value;
    const selectedCategory = document.getElementById("category").value; // Obtiene la categoría seleccionada
    if (newTask.trim() !== "") {
        todoList.push({ task: newTask, category: selectedCategory }); // Almacena la tarea junto con su categoría
        renderTodoList();
        saveToLocalStorage();
        taskInput.value = "";
    }
});



function renderTodoList() {
    todoListElement.innerHTML = "";
    todoList.forEach(function(task, index) {
        const li = document.createElement("li");
        li.textContent = `(${task.category}) ${task.task}`; // Muestra la categoría junto con la tarea
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", function() {
            todoList.splice(index, 1);
            renderTodoList();
            saveToLocalStorage();
        });
        li.appendChild(deleteButton);
        todoListElement.appendChild(li);
    });
}



document.getElementById("clear-tasks").addEventListener("click", function () {
    todoList.length = 0;
    renderTodoList();
    saveToLocalStorage();
    showToastOnTaskDeletion();
});


function showToastOnTaskDeletion() {
    Toastify({
        text: "Tareas eliminadas",
        duration: 3000,
        gravity: "top", 
        position: "left", 
        style: {
            background: "black",
        },
    }).showToast();
}




taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        const newTask = taskInput.value;
        if (newTask.trim() !== "") {
            todoList.push(newTask);
            renderTodoList();
            saveToLocalStorage();
            taskInput.value = "";
        }
    }
});

function showMessage(message) {
    output.textContent = message;
}
});

document.getElementById("load-data").addEventListener("click", function() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Solicitud fallida');
            }
            return response.json();
        })
        .then(data => {


            const taskTitleElement = document.getElementById('task-title');
            taskTitleElement.textContent = data.title;


            todoList.push(data.title);
            renderTodoList();
        })
        .catch(error => {
            console.error("Error al cargar datos: " + error.message);
        });
});
