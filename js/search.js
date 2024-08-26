export function buscartareas(searchTerm) {
    let filadetareas = document.querySelectorAll('table tbody tr');
    
    filadetareas.forEach(fila => {
        let tareacelda = fila.querySelector('td:first-child');

        //para que la busqueda sea en minisculas o mayusculas
        let taskName = tareacelda.textContent.toLowerCase();
        let tarea = taskName.includes(searchTerm.toLowerCase());
        
        if (tarea) {
            fila.style.display = ''; // Muestra la fila
        } else {
            fila.style.display = 'none'; // Oculta la fila
        }
    });
}
