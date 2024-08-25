const usuariosRegister = [
    {
        nombreUser: "Kathy",
        correoUser: "kgarcia@sc.edu.gt",
        passUser: "12345",
        perfil: "img/snoopy1.jpg" // Ruta a la imagen
    },
    {
        nombreUser: "Jaz",
        correoUser: "katherinegarcia0918@gmail.com",
        passUser: "1234",
        perfil: "img/snoopy2.jpg" // Ruta a la imagen
    }
];

// Crear y mostrar el modal de inicio de sesión
function showLoginModal() {
    const loginModal = document.createElement('div');
    loginModal.id = 'loginModal';
    loginModal.classList.add('modal');

    const modalContent = `
        <div class="modal-content login-container">
        <a href="https://github.com/kgarcia18?tab=repositories" class="git">GitHub</a>
            <div class="login-left">
                <div><img src="https://i.pinimg.com/564x/1c/70/4d/1c704d7cc69781c3488a8ab13b4521c9.jpg" alt=""></div>
            </div>
            <div class="login-right">
                <h2>Hola<br>Bienvenido a multitasking</h2>
                <form id="loginForm">
                    <input type="text" id="usuario" placeholder="Usuario o correo" required>
                    <input type="password" id="password" placeholder="Contraseña" required>
                    <button type="button" id="betaButton">Probar Beta</button>
                    <button type="submit">Iniciar</button>
                </form>
                <a href="#" class="crearcuenta">Crea Cuenta</a>
                <p id="error-message" style="color: red; display: none;">Usuario o contraseña incorrectos.</p>
            </div>
        </div>
    `;

    loginModal.innerHTML = modalContent;
    document.body.appendChild(loginModal);

    const betaButton = document.getElementById('betaButton');
    betaButton.addEventListener('click', () => {
        // Puedes optar por pasar un usuario de prueba aquí si lo deseas
        const testUser = usuariosRegister[0]; // Por ejemplo, Kathy
        guardarUsuario(testUser);
        hideLoginModal();
        showMainPage(); // Asegúrate de que esta función esté correctamente importada
    });

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');

        // Verificar si las credenciales coinciden con algún usuario en la lista
        const user = usuariosRegister.find(user => 
            (user.nombreUser === usuario || user.correoUser === usuario) && 
            user.passUser === password
        );

        if (user) {
            // Guardar el usuario en localStorage
            guardarUsuario(user);

            hideLoginModal();
            showMainPage(); // Asegúrate de que esta función esté correctamente importada
        } else {
            // Mostrar mensaje de error si las credenciales son incorrectas
            errorMessage.style.display = 'block';
        }
    });
}

function guardarUsuario(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario)); // Guardar el usuario completo
}

function hideLoginModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.style.display = 'none';
}

showLoginModal();
