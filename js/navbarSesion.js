import { obtenerSesionActiva, cerrarSesion } from "./auth.js";

export function actualizarNavbar() {
  const sesion = obtenerSesionActiva();
  const navSaludo = document.getElementById("navSaludo");
  const btnLoginNav = document.getElementById("btnLoginNav");
  const btnRegistroNav = document.getElementById("btnRegistroNav");
  const btnLogoutNav = document.getElementById("btnLogoutNav");

  if (sesion && sesion.nombre) {
    if (navSaludo) {
      navSaludo.textContent = `Hola, ${sesion.nombre}`;
      navSaludo.classList.remove("d-none");
    }
    if (btnLoginNav) btnLoginNav.classList.add("d-none");
    if (btnRegistroNav) btnRegistroNav.classList.add("d-none");
    if (btnLogoutNav) btnLogoutNav.classList.remove("d-none");
  } else {
    if (navSaludo) {
      navSaludo.textContent = "";
      navSaludo.classList.add("d-none");
    }
    if (btnLoginNav) btnLoginNav.classList.remove("d-none");
    if (btnRegistroNav) btnRegistroNav.classList.remove("d-none");
    if (btnLogoutNav) btnLogoutNav.classList.add("d-none");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarNavbar();

  const btnLogoutNav = document.getElementById("btnLogoutNav");
  if (btnLogoutNav) {
    btnLogoutNav.addEventListener("click", (e) => {
      e.preventDefault();
      cerrarSesion();
      actualizarNavbar();
    });
  }
});