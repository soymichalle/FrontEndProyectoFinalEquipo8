const CLAVE_USUARIOS = "usuarios";
const CLAVE_SESION = "usuarioActivo";

export function obtenerUsuarios() {
  const datos = localStorage.getItem(CLAVE_USUARIOS);
  if (!datos) return [];

  try {
    const lista = JSON.parse(datos);
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

export function validarCredenciales(correo, password) {
  const usuarios = obtenerUsuarios();
  const correoLimpio = (correo || "").trim().toLowerCase();

  return (
    usuarios.find((u) => {
      const correoGuardado = (u.correo ?? u.email ?? "").trim().toLowerCase();
      const passGuardada = u.contrasena ?? u.password ?? "";
      return correoGuardado === correoLimpio && passGuardada === password;
    }) || null
  );
}

export function guardarSesion(usuario) {
  const sesion = {
    nombre: usuario.nombre ?? "Usuario",
    correo: usuario.correo ?? usuario.email ?? ""
  };
  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
}

export function obtenerSesionActiva() {
  const datos = localStorage.getItem(CLAVE_SESION);
  if (!datos) return null;

  try {
    return JSON.parse(datos);
  } catch {
    return null;
  }
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}