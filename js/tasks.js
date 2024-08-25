import { guardarAsignaciones, obtenerAsignaciones } from './storage.js';

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
    const thActions = document.createElement('th');

    headerRow.appendChild(thTaskName);
    headerRow.appendChild(thAssigned);
    headerRow.appendChild(thDateRange);
    headerRow.appendChild(thStatus);
    headerRow.appendChild(thActions);
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
    const statusOptions = ['Sin Iniciar', 'Asignado', 'Completado', 'Completado con retraso', 'No presentado'];
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
    document.body.appendChild(taskForm);
    taskForm.style.display = 'block';
}

// Función para guardar la tarea y agregarla a la tabla
function saveTask(name, assigned, startDate, endDate, status) {
    const assignments = obtenerAsignaciones();

    const newTask = {
        name: name,
        assigned: assigned.split(',').map(name => name.trim()),
        startDate: startDate,
        endDate: endDate,
        status: status
    };

    assignments.push(newTask);
    guardarAsignaciones(assignments);

    addTaskToTable(newTask);
}

// Función para eliminar una tarea
function deleteTask(index) {
    const assignments = obtenerAsignaciones();
    assignments.splice(index, 1);
    guardarAsignaciones(assignments);

    // Volver a cargar las tareas en la tabla
    const taskTable = document.querySelector('table tbody');
    taskTable.innerHTML = ''; // Limpiar tabla
    loadTasks(); // Volver a cargar tareas
}

// Función para agregar una tarea a la tabla
function addTaskToTable(task, index) {
    const taskTable = document.querySelector('table tbody');

    const taskRow = document.createElement('tr');

    const taskName = document.createElement('td');
    taskName.textContent = task.name;

    const assignedCell = document.createElement('td');
    task.assigned.forEach(name => {
        const assignedBadge = document.createElement('span');
        assignedBadge.textContent = name;
        assignedBadge.style.marginRight = '5px';
        assignedCell.appendChild(assignedBadge);
    });

    const dateCell = document.createElement('td');
    dateCell.textContent = task.startDate && task.endDate ? `${task.startDate} - ${task.endDate}` : task.startDate;

    const statusCell = document.createElement('td');
    const statusButton = document.createElement('button');
    statusButton.textContent = task.status;
    statusButton.classList.add('status-button');
    statusCell.appendChild(statusButton);

    const actionsCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => deleteTask(index));
    actionsCell.appendChild(deleteButton);

    taskRow.appendChild(taskName);
    taskRow.appendChild(assignedCell);
    taskRow.appendChild(dateCell);
    taskRow.appendChild(statusCell);
    taskRow.appendChild(actionsCell);

    taskTable.appendChild(taskRow);
}

// Función para cargar tareas de localStorage y mostrarlas en la tabla
function loadTasks() {
    const assignments = obtenerAsignaciones();
    assignments.forEach((task, index) => addTaskToTable(task, index));
}

export { createTaskTable, showTaskForm, loadTasks };
