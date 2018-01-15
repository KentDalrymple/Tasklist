// UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all even listeners
loadEventListeners();

function loadEventListeners() {

    //Dom Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task event
    // Takes two agruments, first being a target second being a method
    form.addEventListener('submit', addTask);

    //Remove task event
    taskList.addEventListener('click', removeTask);

    //Clear task event
    clearBtn.addEventListener('click', clearTasks);

    //Filter Tasks
    filter.addEventListener('keyup', filterTasks);
}


//Get Tasks from Local Storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
    //Create Task elements( Described in detail below)    
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    });
}

// Add Task 
function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task');
    }
    
    // create li element
    const li = document.createElement('li');

    //add class
    li.className = 'collection-item';
    
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');

    //Add Class
    link.className = 'delete-item secondary-content';

    //Add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    //Append the link to li
    li.appendChild(link);

    //Append the li to ul
    taskList.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';


    //Prevent auto submission
    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
         if(confirm('Are you sure you want to delete')) {
            e.target.parentElement.parentElement.remove();

            // Remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }  
    }
}

// Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks(){
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from local storage
    clearTasksFromLocalStorage();
}

//clear from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;

            if(item.toLowerCase().indexOf(text) != -1) {
                    task.style.display = 'block';
            } else {
                    task.style.display = 'none';
            }
        }
    );        
}
    
    
    
    
