const registrodeusuario = [
    {
        nombreUser: "Kathy",
        correoUser: "kgarcia@sc.edu.gt",
        passUser: "12345",
        perfil: "img/snoopy1.jpg"
    },
    {
        nombreUser: "Jaz",
        correoUser: "katherinegarcia0918@gmail.com",
        passUser: "1234",
        perfil: "img/snoopy2.jpg"
    }
];

// Crear y mostrar el modal de inicio de sesión
function mostrarventadadeinicio() {
    let loginModal = document.createElement('div');
    loginModal.id = 'loginModal';
    loginModal.classList.add('modal');

    let contenidodelmodal = `
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

    loginModal.innerHTML = contenidodelmodal;
    document.body.appendChild(loginModal);

    let betabtn = document.getElementById('betaButton');
    betabtn.addEventListener('click', () => {
        // Puedes optar por pasar un usuario prueba
        let testUser = registrodeusuario[0]
        guardarUsuario(testUser);
        hideLoginModal();
        showMainPage(); 
        
    });

    let formulario = document.getElementById('loginForm');
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        let usuario = document.getElementById('usuario').value;
        let password = document.getElementById('password').value;
        let errorMessage = document.getElementById('error-message');

        // Verificar si las credenciales coinciden con algún usuario en la lista
        let user = registrodeusuario.find(user => 
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

mostrarventadadeinicio();
