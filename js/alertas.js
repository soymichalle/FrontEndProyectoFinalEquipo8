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