// Importamos alertas.js
import { notificarExito, notificarError} from '../js/alertas.js';

// Hacemos llamada del ID del form de registro
const FORMULARIO = document.getElementById('formulario-registro');
const nombreInput = document.getElementById('registro-nombre');
const emailInput = document.getElementById('registro-email');
const telefonoInput = document.getElementById('registro-telefono');
const passwordInput = document.getElementById('registro-contraseña');
const confirmPasswordInput = document.getElementById('registro-confirmar-contraseña');
const submitBtn = document.getElementById('btn-registrar');
const mensajeEstado = document.getElementById('passwordError');

const botonOjo = document.getElementById('boton-ojo');
const iconoOjo = botonOjo.querySelector('i');

// Para indicativo pais
const iti = window.intlTelInput(telefonoInput, {
    initialCountry: "co",
    separateDialCode: true
});

botonOjo.addEventListener('click', () => {
    const estaOculta = passwordInput.type === 'password';
    passwordInput.type = estaOculta ? 'text' : 'password';

    // Para mostrar cuando se oprima el ojo
    iconoOjo.classList.toggle('fa-eye', estaOculta);
    iconoOjo.classList.toggle('fa-eye-slash', !estaOculta);
});

function setEstadoMensaje(texto, tipo = '') {
    mensajeEstado.textContent = texto;
    mensajeEstado.classList.remove('error', 'success');
    if (tipo) mensajeEstado.classList.add(tipo);
}

// Funcion para validaciones del formulario
function validateForm() {
    const username = nombreInput.value.trim();
    const emailForm = emailInput.value.trim().toLowerCase();
    const telefonoForm = telefonoInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    let isValid = true;

    if (password === '' && confirmPassword === '') {
        setEstadoMensaje('');
    } else if (password.length < 8) {
        setEstadoMensaje('La contraseña debe tener al menos 8 caracteres.', 'error');
        isValid = false;
    } else if (password !== confirmPassword) {
        setEstadoMensaje('Las contraseñas no coinciden.', 'error');
        isValid = false;
    } else {
        setEstadoMensaje('Las contraseñas coinciden.', 'success');
    }

    if (!username || !password || !confirmPassword || !emailForm || !telefonoForm) {
        isValid = false;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailForm !== '' && !emailValid.test(emailForm)) {
        setEstadoMensaje('Ingresa un correo electrónico válido.', 'error');
        isValid = false;
    }

    const soloNumeros = telefonoForm.replace(/\D/g, '');
    if (telefonoForm !== '' && soloNumeros.length !== 10) {
        setEstadoMensaje('El teléfono debe tener 10 dígitos.', 'error');
        isValid = false;
    }

    submitBtn.classList.toggle('enabled', isValid);
    submitBtn.disabled = !isValid;
    return isValid;
}

FORMULARIO.addEventListener('input', validateForm);

// Evita que el formulario se envíe por defecto | al hacer "enter" se trasladaría al siguiente campo vacío
FORMULARIO.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault();
        const campos = Array.from(
            FORMULARIO.querySelectorAll('input:not([type="hidden"]):not([disabled]), select, textarea')
        );
        const indice = campos.indexOf(event.target);
        if (indice >= 0 && indice < campos.length - 1) {
            campos[indice + 1].focus();
        }
    }
});

// Función para recuperar los usuarios guardados en localStorage
function obtenerUsuarios() {
    try {
        return JSON.parse(localStorage.getItem('usuarios')) || [];
    } catch {
        return [];
    }
}

FORMULARIO.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) {
        notificarError('Completa todos los campos correctamente.');
        return;
    }

    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const telefono = iti.getNumber() || telefonoInput.value.trim();
    const password = passwordInput.value;

    const usuarios = obtenerUsuarios();
    const existeCorreo = usuarios.some((usuario) => usuario.email === email);

    if (existeCorreo) {
        setEstadoMensaje('Este correo electrónico ya está registrado.', 'error');
        notificarError('Este correo ya está registrado.');
        return;
    }

    const nuevoUsuario = {
        nombre,
        email,
        telefono,
        password
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Limpiar todos los campos, teléfono y estado visual
    FORMULARIO.reset();
    telefonoInput.value = '';
    if (typeof iti.setNumber === 'function') {
        iti.setNumber('');
    }
    setEstadoMensaje('');

    // Dejar la contraseña oculta y el ícono en su estado inicial
    passwordInput.type = 'password';
    confirmPasswordInput.type = 'password';
    iconoOjo.classList.add('fa-eye');
    iconoOjo.classList.remove('fa-eye-slash');

    // Volver a bloquear el botón hasta un nuevo registro válido
    submitBtn.classList.remove('enabled');
    submitBtn.disabled = true;

    notificarExito('¡Usuario registrado con éxito!');
});