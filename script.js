// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // Function to create a task element (separated for reuse)
    function createTaskElement(taskText) {
        // Create a new list item
        const li = document.createElement('li');

        // Create a span for task text
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        li.appendChild(textSpan);

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Add event listener to remove task
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            updateLocalStorage();
        });

        // Append button to list item, then item to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Function to update Local Storage with current tasks
    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#task-list li span').forEach(taskElement => {
            tasks.push(taskElement.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        // Check if input is not empty
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create and add the task element
        createTaskElement(taskText);

        // Update Local Storage
        updateLocalStorage();

        // Clear input field
        taskInput.value = '';
    }

    // Add event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
