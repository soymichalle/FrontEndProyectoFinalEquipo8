// * Se definen variables del navbar
const navSaludo = document.querySelector("#navSaludo");
const btnLoginNav = document.querySelector("#btnLoginNav");
const btnRegistroNav = document.querySelector("#btnRegistroNav");
const btnLogoutNav = document.querySelector("#btnLogoutNav");

// * Se consulta la sesión almacenada
const datosSesion = localStorage.getItem("usuarioSesion");

// * Se verifica si existe una sesión activa
if (datosSesion) {

    try {
        const usuario = JSON.parse(datosSesion);

        if (usuario && usuario.nombre) {

            // * Se muestra el saludo
            navSaludo.textContent = `¡Hola, ${usuario.nombre}! 💚`;
            navSaludo.classList.remove("d-none");

            // * Se ocultan los botones de visitante
            btnLoginNav.classList.add("d-none");
            btnRegistroNav.classList.add("d-none");

            // * Se muestra el botón de cerrar sesión
            btnLogoutNav.classList.remove("d-none");
            btnLogoutNav.classList.remove("btn-outline-light");
            btnLogoutNav.classList.add("btn-eliminar", "btn-sm");

        }

    } catch (error) {
        console.error("Error al recuperar la sesión:", error);
        localStorage.removeItem("usuarioSesion");
    }
}

// * Evento para cerrar sesión
btnLogoutNav.addEventListener("click", () => {

    // * Se elimina la información de la sesión
    localStorage.removeItem("usuarioSesion");

    // * Se actualiza el navbar
    window.location.reload();

});