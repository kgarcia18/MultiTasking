import { creartareatabla, mostrarformulario, cargartareas } from './tasks.js';
import { buscartareas } from './search.js';

//mostrar la página principal
function paginaprincipal() {
    let root = document.getElementById('root'); 

    root.style.display = 'flex';

    let header = document.createElement('header');
    let title = document.createElement('h1');
    title.textContent = 'Multitasking';
    
    let buscarcontenedor = document.createElement('div');
    let búsquedaentrada = document.createElement('input');
    búsquedaentrada.placeholder = 'Buscar por nombre';

    // Asigna el evento de búsqueda al input
    búsquedaentrada.addEventListener('input', () => {
        buscartareas(búsquedaentrada.value);
    });
    
    let btnmas = document.createElement('button');
    btnmas.textContent = '+';
    btnmas.addEventListener('click', mostrarformulario);

    // Crear y agregar el elemento del perfil
    let perfilcontenedor = document.createElement('div');
    perfilcontenedor.classList.add('profile-container');
    let imgperfil = document.createElement('img');
    imgperfil.classList.add('profile-img');
    
    // Obtener el usuario del localStorage
    let almacenarusuario = JSON.parse(localStorage.getItem('usuario'));
    if (almacenarusuario && almacenarusuario.perfil) {
        imgperfil.src = almacenarusuario.perfil;
        perfilcontenedor.appendChild(imgperfil);
    }

    buscarcontenedor.appendChild(búsquedaentrada);
    buscarcontenedor.appendChild(btnmas);
    if (almacenarusuario) {
        buscarcontenedor.appendChild(perfilcontenedor);
    }

    header.appendChild(title);
    header.appendChild(buscarcontenedor);

    root.appendChild(header);
    root.appendChild(creartareatabla());

    // Cargar tareas al iniciar
    cargartareas();
}

// Llamada inicial para mostrar la página principal
paginaprincipal();
