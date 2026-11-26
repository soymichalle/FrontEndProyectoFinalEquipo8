// * Función para crear el objeto JSON de inicio de sesión
export function crearObjetoLogin(email, contrasena) {

    const datosLogin = {
        email: email,
        contraseña: contrasena
    };

    return datosLogin;
}