const x = `
const LOCAL_STOREGE_KEY_ASSIGNMENTS = 'lista_tareas';

// para guardar las asignaciones y necesita una lista
function guardarAsignaciones(asignaciones){
    localStorage.setItem(LOCAL_STOREGE_KEY_ASSIGNMENTS, JSON.stringify(asignaciones));
}

// para convertirla a una lista 
function obtenerAsignaciones(){
    return JSON.parse(localStorage.getItem(LOCAL_STOREGE_KEY_ASSIGNMENTS)) || [];
}

export{LOCAL_STOREGE_KEY_ASSIGNMENTS,guardarAsignaciones,obtenerAsignaciones};
`;