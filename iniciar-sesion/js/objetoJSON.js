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