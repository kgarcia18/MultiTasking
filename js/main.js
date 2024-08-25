import { createTaskTable, showTaskForm, loadTasks } from './tasks.js';
import { searchTasksByName } from './search.js';

// Función para mostrar la página principal después del login
function showMainPage() {
    const root = document.getElementById('root'); // Asegúrate de que 'root' esté definido

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

    // Crear y agregar el elemento del perfil
    const profileContainer = document.createElement('div');
    profileContainer.classList.add('profile-container');
    const profileImg = document.createElement('img');
    profileImg.classList.add('profile-img');
    
    // Obtener el usuario del localStorage
    const storedUser = JSON.parse(localStorage.getItem('usuario'));
    if (storedUser && storedUser.perfil) {
        profileImg.src = storedUser.perfil;
        profileContainer.appendChild(profileImg);
    }

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(addButton);
    if (storedUser) {
        searchContainer.appendChild(profileContainer);
    }

    header.appendChild(title);
    header.appendChild(searchContainer);

    root.appendChild(header);
    root.appendChild(createTaskTable());

    // Cargar tareas al iniciar
    loadTasks();
}

// Llamada inicial para mostrar la página principal
showMainPage();
