// storage.js

const LOCAL_STORAGE_KEY_ASSIGNMENTS = 'asignaciones';

// Para guardar las asignaciones
function guardarAsignaciones(asignaciones) {
    localStorage.setItem(LOCAL_STORAGE_KEY_ASSIGNMENTS, JSON.stringify(asignaciones));
}

// Para obtener las asignaciones
function obtenerAsignaciones() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ASSIGNMENTS)) || [];
}

export { LOCAL_STORAGE_KEY_ASSIGNMENTS, guardarAsignaciones, obtenerAsignaciones };
