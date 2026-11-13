// Hacemos llamada del ID del form de registro
const FORMULARIO = document.getElementById('formulario-registro');
const telefonoInput = document.getElementById('registro-telefono');

// Para indicativo pais
const iti = window.intlTelInput(telefonoInput, {
    initialCountry: "co",
    separateDialCode: true
});
        
FORMULARIO.addEventListener('input', function () {
            validateForm();
        });

        // Funcion para validaciones del formulario
        function validateForm() {
            const username = document.getElementById('registro-nombre').value.trim();
            const emailForm = document.getElementById('registro-email').value.trim();
            const telefonoForm = document.getElementById('registro-telefono').value.trim();
            const password = document.getElementById('registro-contraseña').value;
            const confirmPassword = document.getElementById('registro-confirmar-contraseña').value;
            const submitForm = document.getElementById('btn-registrar');
            const errorElement = document.getElementById('passwordError');

            let isValid = true;

            if (password === '' && confirmPassword === ''){
                errorElement.textContent = '';
                errorElement.classList.remove('error', 'success');
            }   else if (password.length < 8){
                errorElement.textContent = 'La contraseña debe tener más de 8 carácteres.';
                errorElement.classList.remove('success');
                errorElement.classList.add('error');
                isValid = false;
            }   else if (password !== confirmPassword) {
                errorElement.textContent = 'Las contraseñas no coinciden';
                errorElement.classList.remove('success');
                errorElement.classList.add('error');
                isValid = false;
            } else {
                errorElement.textContent = 'Las constraseñas coinciden';
                errorElement.classList.remove('error');
                errorElement.classList.add('success');
            }

            if (!username || !password || !confirmPassword || !emailForm || !telefonoForm) {
                isValid = false;
            }

            // Validacion de correo siguiendo el formato nombre@dominio.com
            const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailValid.test(emailForm)) {
                isValid = false;
            }

            // Verificacion de número === 10 | reemplazo de caracteres por espacios
            const soloNumeros = telefonoForm.replace(/\D/g, '');
            if (soloNumeros.length !== 10) {
                isValid = false;
            }

            // Activacion/desactivacion de boton "Registrarme"
            if (isValid) {
                submitForm.classList.add('enabled');
                submitForm.disabled = false;
            } else {
                submitForm.classList.remove('enabled');
                submitForm.disabled = true;
            }
        }

FORMULARIO.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.tagName !== "TEXTAREA") {
        event.preventDefault();

        const campos = Array.from(
            FORMULARIO.querySelectorAll(
                "input:not([hidden]), select, textarea"
            )
        );

        const indice = campos.indexOf(event.target);

        if (indice >= 0 && indice < campos.length - 1) {
            campos[indice + 1].focus();
        }
    }
});
        