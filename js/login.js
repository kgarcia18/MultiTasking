const LOCAL_STORAGE_KEY_USERS = 'usuarios';

// Función para guardar los usuarios en localStorage
function guardarUsuario(usuario) {
    const usuarios = obtenerUsuarios();
    usuarios.push(usuario);
    localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(usuarios));
}

// Función para obtener la lista de usuarios desde localStorage
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USERS)) || [];
}

// Crear y mostrar el modal de inicio de sesión
function showLoginModal() {
    const loginModal = document.createElement('div');
    loginModal.id = 'loginModal';
    loginModal.classList.add('modal');

    const modalContent = `
        <div class="modal-content login-container">
            <div class="login-left">
                <div></div>
            </div>
            <div class="login-right">
                <h2>Hola<br>Bienvenido a multitasking</h2>
                <form id="loginForm">
                    <input type="text" id="usuario" placeholder="Usuario o correo" required>
                    <input type="password" id="password" placeholder="Contraseña" required>
                    <button type="button" id="betaButton">Probar Beta</button>
                    <button type="submit">Iniciar</button>
                </form>
                <a href="#">Crea Cuenta</a>
            </div>
        </div>
    `;
    
    loginModal.innerHTML = modalContent;
    document.body.appendChild(loginModal);

    const betaButton = document.getElementById('betaButton');
    betaButton.addEventListener('click', () => {
        hideLoginModal();
        showMainPage();
    });

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const usuario = document.getElementById('usuario').value;

        // Guardar el usuario en localStorage
        guardarUsuario(usuario);

        hideLoginModal();
        showMainPage();
    });
}

function hideLoginModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.style.display = 'none';
}

showLoginModal();