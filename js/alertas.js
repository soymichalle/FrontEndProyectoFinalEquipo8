// * Implementaciones del Sweet Alert para el proyecto

// * Notificaciones exitosas
export function notificarExito(mensaje) {

    Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: false,
        width: "250px",
        padding: "8px",
        customClass: {
            popup: "alerta-pequena"
        }
    });

}

// * Notificaciones de error
export function notificarError(mensaje) {

    Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title: mensaje,
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: false,
        width: "250px",
        padding: "8px",
        customClass: {
            popup: "alerta-pequena"
        }
    });

}

// * Confirmación de acciones
export function confirmarAccion(titulo, mensaje) {

    return Swal.fire({
        title: titulo,
        text: mensaje,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d9534f",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        customClass: {
            popup: "alerta-pequena",
            title: "titulo-alerta",
            confirmButton: "boton-confirmar",
            cancelButton: "boton-cancelar"
        }
    });

}

// * Solicitar correo para recuperar contraseña
export function solicitarCorreoRecuperacion() {

    return Swal.fire({
        title: "Recuperar contraseña",
        text: "Ingresa el correo electrónico asociado a tu cuenta.",
        input: "email",
        inputPlaceholder: "correo@ejemplo.com",
        showCancelButton: true,
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#A65D45",
        inputValidator: (valor) => {
            if (!valor || !valor.trim()) {
                return "Debes ingresar tu correo electrónico.";
            }
        }
    });

}

// * Solicitar nueva contraseña
export function solicitarNuevaContrasena() {

    return Swal.fire({
        title: "Nueva contraseña",
        html: `
            <input
                type="password"
                id="nueva-contrasena"
                class="swal2-input"
                placeholder="Nueva contraseña"
            >

            <input
                type="password"
                id="confirmar-contrasena"
                class="swal2-input"
                placeholder="Confirmar contraseña"
            >
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Actualizar contraseña",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#A65D45",

        preConfirm: () => {

            const nueva = document.querySelector("#nueva-contrasena").value;
            const confirmar = document.querySelector("#confirmar-contrasena").value;

            if (!nueva || !confirmar) {
                Swal.showValidationMessage("Debes completar ambos campos.");
                return false;
            }

            if (nueva.length < 8) {
                Swal.showValidationMessage(
                    "La contraseña debe tener mínimo 8 caracteres."
                );
                return false;
            }

            if (nueva !== confirmar) {
                Swal.showValidationMessage(
                    "Las contraseñas no coinciden."
                );
                return false;
            }

            return nueva;
        }
    });

}