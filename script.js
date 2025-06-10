function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const li = document.createElement('li');

    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;
    li.appendChild(textSpan);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    
    removeBtn.addEventListener('click', () => {
        taskList.removeChild(li);
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    taskInput.value = '';
}
