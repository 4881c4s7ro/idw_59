// assets/js/navbar.js
import { estaLogeado, logout } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const navList = document.querySelector(".navbar-nav");
  if (!navList) return;

  // Crear elemento del login/logout
  const loginItem = document.createElement("li");
  loginItem.className = "nav-item ms-3";

  if (estaLogeado()) {
    // Si está logueado  mostrar enlace a admin y botón salir
    const adminItem = document.createElement("li");
    adminItem.className = "nav-item";

    // Usamos ruta absoluta para evitar errores de subcarpetas
    adminItem.innerHTML = `
      <a class="nav-link" href="/admin/medicos.html">Administrar Médicos</a>
    `;
    navList.insertBefore(adminItem, navList.lastElementChild);

    // Botón de cerrar sesión
    loginItem.innerHTML = `
      <button id="logoutBtn" class="btn btn-outline-danger btn-sm ms-3">
        Cerrar sesión
      </button>
    `;
    navList.appendChild(loginItem);

    // Acción del botón salir
    document.addEventListener("click", (e) => {
      if (e.target.id === "logoutBtn") {
        logout();
        //  Ruta absoluta también
        window.location.href = "/index.html";
      }
    });

  } else {
    // Si no está logueado → mostrar botón login
    //  Ruta absoluta para funcionar desde cualquier carpeta
    loginItem.innerHTML = `
      <a href="/login/login.html" class="btn btn-outline-primary btn-sm ms-3">
        Login
      </a>
    `;
    navList.appendChild(loginItem);
  }
});
