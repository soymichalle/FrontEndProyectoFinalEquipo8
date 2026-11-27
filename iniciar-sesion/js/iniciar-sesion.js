
// * Se importan las librerias requeridas
import { notificarError, notificarExito, solicitarCorreoRecuperacion, solicitarNuevaContrasena } from "../../js/alertas.js";
import { buscarUsuarioPorEmail, actualizarContrasenaUsuario } from "./objetojson.js";

// * Se definen variables
const email = document.querySelector("#login-email");
const contrasena = document.querySelector("#login-contraseña");
const btnIniciarSesion = document.querySelector("#btn-login");
const recordar = document.querySelector("#recordarme");
const enlaceRecuperar = document.querySelector("#enlace-recuperar-contrasena");

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

    // * Cambia el tipo de input
    contrasena.type = estaOculta ? 'text' : 'password';

    // * Cambia el ícono del ojo
    icono.classList.toggle('fa-eye');
    icono.classList.toggle('fa-eye-slash');

});

// * Evento para recuperar contraseña
enlaceRecuperar.addEventListener("click", async (e) => {

    e.preventDefault();

    // * Se solicita el correo
    const resultadoCorreo = await solicitarCorreoRecuperacion();

    if (!resultadoCorreo.isConfirmed) return;

    const correo = resultadoCorreo.value.trim();

    // * Se verifica que el usuario exista
    const usuario = buscarUsuarioPorEmail(correo);

    if (!usuario) {
        notificarError("No encontramos una cuenta con ese correo.");
        return;
    }

    // * Se solicita la nueva contraseña
    const resultadoContrasena = await solicitarNuevaContrasena();

    if (!resultadoContrasena.isConfirmed) return;

    // * Se actualiza la contraseña
    const actualizado = actualizarContrasenaUsuario(
        correo,
        resultadoContrasena.value
    );

    if (actualizado) {

        notificarExito("¡Contraseña actualizada correctamente!");

        email.value = correo;
        contrasena.value = "";

    } else {

        notificarError("No se pudo actualizar la contraseña.");

    }
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

    // * Se consulta el usuario registrado por su correo
    const usuarioEncontrado = buscarUsuarioPorEmail(email.value);

    // * Se verifica que el usuario exista
    if (!usuarioEncontrado) {
        notificarError("No encontramos una cuenta asociada a este correo.");
        return;
    }

    // * Se obtiene la contraseña del usuario
    const claveUsuario = usuarioEncontrado.contraseña ?? usuarioEncontrado.password;

    // * Se validan las credenciales
    if (contrasena.value !== claveUsuario) {
        notificarError("La contraseña ingresada es incorrecta.");
        return;
    }

    // * Se guarda o elimina el correo según la preferencia
    if (recordar.checked) {
        localStorage.setItem("correoRecordado", email.value.trim());
    } else {
        localStorage.removeItem("correoRecordado");
    }

    // * Se guarda la información del usuario autenticado
    const sesionUsuario = {
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email
    };

    localStorage.setItem("usuarioSesion", JSON.stringify(sesionUsuario));

    notificarExito("¡Inicio de sesión exitoso!");

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 1600);

});
