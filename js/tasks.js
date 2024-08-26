import { guardarAsignaciones, obtenerAsignaciones } from './storage.js';

// Función para crear la tabla de tareas
function creartareatabla() {
    let tabladetareas = document.createElement('table');
    let tabla = document.createElement('thead');
    let encabezado = document.createElement('tr');

    let nombredetarea = document.createElement('th');
    nombredetarea.textContent = 'Nombre de la Tarea';
    let asignacion = document.createElement('th');
    asignacion.textContent = 'Asignado';
    let rangofechas = document.createElement('th');
    rangofechas.textContent = 'Rango de Fechas';
    let estado = document.createElement('th');
    estado.textContent = 'Estado';
    let acciones = document.createElement('th');

    encabezado.appendChild(nombredetarea);
    encabezado.appendChild(asignacion);
    encabezado.appendChild(rangofechas);
    encabezado.appendChild(estado);
    encabezado.appendChild(acciones);
    tabla.appendChild(encabezado);
    tabladetareas.appendChild(tabla);

    let cuerpo = document.createElement('tbody');
    tabladetareas.appendChild(cuerpo);

    return tabladetareas;
}

// Función para mostrar el formulario de tareas
function mostrarformulario() {
    let formulariodetareas = document.createElement('div');
    formulariodetareas.classList.add('task-form');

    let nombredelatarea = document.createElement('input');
    nombredelatarea.placeholder = 'Nombre de la tarea';

    let entradadeasignacion = document.createElement('input');
    entradadeasignacion.placeholder = 'Asignado para... (separa por comas los nombres)';

    let cuadrodefechas = document.createElement('div');
    let fechainicio = document.createElement('input');
    fechainicio.type = 'date';
    fechainicio.placeholder = 'Fecha de inicio';

    let fechadeentrega = document.createElement('input');
    fechadeentrega.type = 'date';
    fechadeentrega.placeholder = 'Fecha de entrega';

    cuadrodefechas.appendChild(fechainicio);
    cuadrodefechas.appendChild(fechadeentrega);

    let seleccionarestado = document.createElement('select');
    let estados = ['Sin Iniciar', 'Asignado', 'Completado', 'Completado con retraso', 'No presentado'];
    estados.forEach(optionText => {
        let option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        seleccionarestado.appendChild(option);
    });

    formulariodetareas.appendChild(nombredelatarea);
    formulariodetareas.appendChild(entradadeasignacion);
    formulariodetareas.appendChild(cuadrodefechas);
    formulariodetareas.appendChild(seleccionarestado);

    let btnguardar = document.createElement('button');
    btnguardar.textContent = 'Guardar tarea';
    btnguardar.addEventListener('click', () => {
        guardarlastareas(nombredelatarea.value, entradadeasignacion.value, fechainicio.value, fechadeentrega.value, seleccionarestado.value);
        formulariodetareas.style.display = 'none';
    });

    formulariodetareas.appendChild(btnguardar);
    document.body.appendChild(formulariodetareas);
    formulariodetareas.style.display = 'block';
}

// Función para guardar la tarea y agregarla a la tabla
function guardarlastareas(name, assigned, startDate, endDate, status) {
    let asignaciones = obtenerAsignaciones();

    let tareanueva = {
        name: name,
        assigned: assigned.split(',').map(name => name.trim()),
        startDate: startDate,
        endDate: endDate,
        status: status
    };

    asignaciones.push(tareanueva);
    guardarAsignaciones(asignaciones);

    agregartabladetareas(tareanueva);
}

// Función para eliminar una tarea
function eliminartarea(index) {
    let asignaciones = obtenerAsignaciones();
    asignaciones.splice(index, 1);
    guardarAsignaciones(asignaciones);

    // Volver a cargar las tareas en la tabla
    let tablatareas = document.querySelector('table tbody');
    tablatareas.innerHTML = ''; // Limpiar tabla
    cargartareas(); // Volver a cargar tareas
}

// Función para agregar una tarea a la tabla
function agregartabladetareas(tarea, index) {
    let tablatareas = document.querySelector('table tbody');

    let filadetareas = document.createElement('tr');

    let nombredelatarea = document.createElement('td');
    nombredelatarea.textContent = tarea.name;

    let asignacion = document.createElement('td');
    tarea.assigned.forEach(name => {
        let yaasignado = document.createElement('span');
        yaasignado.textContent = name;
        yaasignado.style.marginRight = '5px';
        asignacion.appendChild(yaasignado);
    });

    let fechas = document.createElement('td');
    fechas.textContent = tarea.startDate && tarea.endDate ? `${tarea.startDate} - ${tarea.endDate}` : tarea.startDate;

    let estados = document.createElement('td');
    let btndeestado = document.createElement('button');
    btndeestado.textContent = tarea.status;
    btndeestado.classList.add('status-button');
    estados.appendChild(btndeestado);

    let acciones = document.createElement('td');
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => eliminartarea(index));
    acciones.appendChild(deleteButton);

    filadetareas.appendChild(nombredelatarea);
    filadetareas.appendChild(asignacion);
    filadetareas.appendChild(fechas);
    filadetareas.appendChild(estados);
    filadetareas.appendChild(acciones);

    tablatareas.appendChild(filadetareas);
}

// Función para cargar tareas de localStorage y mostrarlas en la tabla
function cargartareas() {
    let asignaciones = obtenerAsignaciones();
    asignaciones.forEach((tarea, index) => agregartabladetareas(tarea, index));
}

export { creartareatabla, mostrarformulario, cargartareas };
