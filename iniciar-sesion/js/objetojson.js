// * Logica de iniciar sesion
const CLAVE_USUARIOS = "usuarios";

export function obtenerUsuariosRegistrados() {
    try {
        const datosGuardados = localStorage.getItem(CLAVE_USUARIOS);
        if (!datosGuardados) {
            return [];
        }

        const usuariosParseados = JSON.parse(datosGuardados);

        if (Array.isArray(usuariosParseados)) {
            return usuariosParseados;
        }
        if (usuariosParseados && typeof usuariosParseados === "object") {
            return [usuariosParseados];
        }

        return [];
    } catch (error) {
        console.error("Error al leer o parsear el JSON de usuarios:", error);
        return [];
    }
}

export function tieneEstructuraValida(usuario) {
    if (!usuario || typeof usuario !== "object") {
        return false;
    }

    const tieneEmail = typeof usuario.email === "string" && usuario.email.trim() !== "";
    const clave = usuario.contraseña ?? usuario.password;
    const tieneClave = typeof clave === "string" && clave !== "";

    return tieneEmail && tieneClave;
}

export function buscarUsuarioPorEmail(correoIngresado) {
    const correoNormalizado = correoIngresado.trim().toLowerCase();
    const usuarios = obtenerUsuariosRegistrados().filter(tieneEstructuraValida);

    return usuarios.find(
        (usuario) => usuario.email.trim().toLowerCase() === correoNormalizado
    ) || null;
}

// * Se actualiza la contraseña de un usuario
export function actualizarContrasenaUsuario(correoIngresado, nuevaContrasena) {

    const correoNormalizado = correoIngresado.trim().toLowerCase();

    const usuarios = obtenerUsuariosRegistrados();

    // * Se busca la posición del usuario
    const indiceUsuario = usuarios.findIndex(
        (usuario) =>
            usuario.email.trim().toLowerCase() === correoNormalizado
    );

    // * Se verifica que el usuario exista
    if (indiceUsuario === -1) {
        return false;
    }

    // * Se actualiza la contraseña
    usuarios[indiceUsuario].contraseña = nuevaContrasena;

    // * Se guardan nuevamente los usuarios
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));

    return true;
}