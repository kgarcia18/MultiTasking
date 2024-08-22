// Función para crear la tabla de tareas
function createTaskTable() {
    const taskTable = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const thTaskName = document.createElement('th');
    thTaskName.textContent = 'Nombre de la Tarea';
    const thAssigned = document.createElement('th');
    thAssigned.textContent = 'Asignado';
    const thDateRange = document.createElement('th');
    thDateRange.textContent = 'Rango de Fechas';
    const thStatus = document.createElement('th');
    thStatus.textContent = 'Estado';

    headerRow.appendChild(thTaskName);
    headerRow.appendChild(thAssigned);
    headerRow.appendChild(thDateRange);
    headerRow.appendChild(thStatus);
    thead.appendChild(headerRow);
    taskTable.appendChild(thead);

    const tbody = document.createElement('tbody');
    taskTable.appendChild(tbody);

    return taskTable;
}

// Función para mostrar el formulario de tareas
function showTaskForm() {
    const taskForm = document.createElement('div');
    taskForm.classList.add('task-form');

    const taskNameInput = document.createElement('input');
    taskNameInput.placeholder = 'Nombre de la tarea';

    const assignedInput = document.createElement('input');
    assignedInput.placeholder = 'Asignado (separar múltiples nombres por comas)';

    const dateContainer = document.createElement('div');
    const startDateInput = document.createElement('input');
    startDateInput.type = 'date';
    startDateInput.placeholder = 'Fecha de inicio';

    const endDateInput = document.createElement('input');
    endDateInput.type = 'date';
    endDateInput.placeholder = 'Fecha de entrega';

    dateContainer.appendChild(startDateInput);
    dateContainer.appendChild(endDateInput);

    const statusSelect = document.createElement('select');
    const statusOptions = ['No iniciado', 'En progreso', 'Finalizado'];
    statusOptions.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        statusSelect.appendChild(option);
    });

    taskForm.appendChild(taskNameInput);
    taskForm.appendChild(assignedInput);
    taskForm.appendChild(dateContainer);
    taskForm.appendChild(statusSelect);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar tarea';
    saveButton.addEventListener('click', () => {
        saveTask(taskNameInput.value, assignedInput.value, startDateInput.value, endDateInput.value, statusSelect.value);
        taskForm.style.display = 'none';
    });

    taskForm.appendChild(saveButton);
    root.appendChild(taskForm);
    taskForm.style.display = 'block';
}

// Función para guardar la tarea y agregarla a la tabla
function saveTask(name, assigned, startDate, endDate, status) {
    const taskTable = document.querySelector('table tbody');

    const taskRow = document.createElement('tr');

    const taskName = document.createElement('td');
    taskName.textContent = name;

    const assignedCell = document.createElement('td');
    const assignedNames = assigned.split(',').map(name => name.trim());
    assignedNames.forEach(name => {
        const assignedBadge = document.createElement('span');
        assignedBadge.textContent = name;
        assignedBadge.style.marginRight = '5px';
        assignedCell.appendChild(assignedBadge);
    });

    const dateCell = document.createElement('td');
    dateCell.textContent = startDate && endDate ? `${startDate} - ${endDate}` : startDate;

    const statusCell = document.createElement('td');
    const statusButton = document.createElement('button');
    statusButton.textContent = status;
    statusButton.classList.add('status-button');
    statusCell.appendChild(statusButton);

    taskRow.appendChild(taskName);
    taskRow.appendChild(assignedCell);
    taskRow.appendChild(dateCell);
    taskRow.appendChild(statusCell);

    taskTable.appendChild(taskRow);
}
