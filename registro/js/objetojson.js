const botonRegistrar = document.getElementById("btn-registrar");

botonRegistrar.addEventListener("click", function(evento) {
    evento.preventDefault();

    const nombreCompleto = document.getElementById("registro-nombre").value.trim();
    const email = document.getElementById("registro-email").value.trim();
    const telefono = document.getElementById("registro-telefono").value.trim();
    const contrasena = document.getElementById("registro-contraseña").value;
    const confirmarContraseña = document.getElementById("registro-confirmar-contraseña").value;

   if (!nombreCompleto || !email || !telefono || !contrasena || !confirmarContraseña) {
    const errorElement = document.getElementById("passwordError");
    if (errorElement) {
        errorElement.textContent = "Llena todos los campos antes de registrar.";
        errorElement.classList.remove("success");
        errorElement.classList.add("error");
    }
    return;
}

    if (contrasena.length < 8 || contrasena !== confirmarContraseña) {
        return;
    }

    const nuevoUsuario = {
        nombre: nombreCompleto,
        telefono: telefono,
        email: email,
        contraseña: contrasena,
        contraseña_confirmada: confirmarContraseña
    };

    console.log("Objeto JSON del usuario creado:", nuevoUsuario);
});