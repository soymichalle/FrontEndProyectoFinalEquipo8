const botonRegistrar = document.getElementById("btn-registrar");

botonRegistrar.addEventListener("click", function(evento) {
    evento.preventDefault(); 

    const nombreCompleto = document.getElementById("registro-nombre").value.trim();
    const email = document.getElementById("registro-email").value.trim();
    const telefono = document.getElementById("registro-telefono").value.trim();
    const contrasena = document.getElementById("registro-contraseña").value;
    const confirmarContraseña = document.getElementById("registro-confirmar-contraseña").value; 

    const nuevoUsuario = {
        nombre: nombreCompleto,
        telefono: telefono,
        email: email,
        contraseña: contrasena,
        contraseña_confirmada: confirmarContraseña 
    };

    console.log("Objeto JSON del usuario creado:", nuevoUsuario);
});