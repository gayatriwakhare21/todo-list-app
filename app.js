// Select elements
const taskForm = document.getElementById('task-form');
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add a new task
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the new task text
    const taskText = newTaskInput.value.trim();

    // Only add if the input is not empty
    if (taskText !== '') {
        addTaskToList(taskText);
        storeTaskInLocalStorage(taskText);
        newTaskInput.value = ''; // Clear input
    }
});

// Add task to the UI
function addTaskToList(taskText) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(taskText));

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('Delete'));
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);

    // Add toggle complete functionality
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    // Add delete functionality
    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        removeTaskFromLocalStorage(taskText);
        li.remove();
    });

    taskList.appendChild(li);
}

// Load tasks from localStorage
function loadTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        addTaskToList(task);
    });
}

// Store task in localStorage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from localStorage
function removeTaskFromLocalStorage(taskText) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks = tasks.filter(function(task) {
        return task !== taskText;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
