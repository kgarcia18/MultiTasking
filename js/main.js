import { searchTasksByName } from './search.js';

// Función para mostrar la página principal después del login
function showMainPage() {
    root.style.display = 'flex';

    const header = document.createElement('header');
    const title = document.createElement('h1');
    title.textContent = 'Multitasking';
    
    const searchContainer = document.createElement('div');
    const searchInput = document.createElement('input');
    searchInput.placeholder = 'Buscar por nombre de la tarea...';

    // Asigna el evento de búsqueda al input
    searchInput.addEventListener('input', () => {
        searchTasksByName(searchInput.value);
    });
    
    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.addEventListener('click', showTaskForm);

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(addButton);

    header.appendChild(title);
    header.appendChild(searchContainer);

    root.appendChild(header);
    root.appendChild(createTaskTable());
}

// Llamada inicial para mostrar la página principal
showMainPage();
