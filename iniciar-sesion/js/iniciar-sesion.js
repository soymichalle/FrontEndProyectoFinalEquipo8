
// * Se importan las librerias requeridas
import { notificarError, notificarExito } from "../../js/alertas.js";

// * Se definen variables
const email = document.querySelector("#login-email");
const contrasena = document.querySelector("#login-contraseña");
const btnIniciarSesion = document.querySelector("#btn-login");
const recordar = document.querySelector("#recordarme");

// ! Pruebas: Usuario hardcodeado
const nuevoUsuario = {
    nombre: "Dani Munoz",
    email: "dani@gmail.com",
    telefono: 3108025334,
    password: "Palomitas123*"
};

const btnOjo = document.getElementById('boton-ojo');
const icono = btnOjo.querySelector('i');

// * Se recupera el correo guardado
const correoGuardado = localStorage.getItem("correoRecordado");

if (correoGuardado) {
    email.value = correoGuardado;
    recordar.checked = true;
}

// * Evento para mostrar u ocultar contraseña
btnOjo.addEventListener('click', () => {

    const estaOculta = contrasena.type === 'password';

    // Cambia el tipo de input
    contrasena.type = estaOculta ? 'text' : 'password';

    // Cambia el ícono del ojo
    icono.classList.toggle('fa-eye');
    icono.classList.toggle('fa-eye-slash');

});

// * Se define evento
btnIniciarSesion.addEventListener("click", function (e) {

    e.preventDefault();

    // * Se validan campos vacíos
    if (email.value.trim() === "" || contrasena.value.trim() === "") {
        notificarError("Oh-uh! No has digitado todos los campos. Por favor, valida.");
        return;
    }

    // * Se valida el formato del correo
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email.value.trim())) {
        notificarError("El correo electrónico no tiene un formato válido.");
        return;
    }

    // * Se validan credenciales
    if (
        email.value.trim().toLowerCase() === nuevoUsuario.email &&
        contrasena.value === nuevoUsuario.password
    ) {
        
        // * Se guarda o elimina el correo según la preferencia
        if (recordar.checked) {
            localStorage.setItem("correoRecordado", email.value.trim());
        } else {
            localStorage.removeItem("correoRecordado");
        }

        notificarExito("¡Inicio de sesión exitoso!");

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1600);

    } else {
        notificarError("Correo o contraseña incorrectos.");
    }

});