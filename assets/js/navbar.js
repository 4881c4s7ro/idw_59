// assets/js/navbar.js
import { estaLogeado, logout } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const navList = document.querySelector(".navbar-nav");
  if (!navList) return;

  const loginItem = document.createElement("li");
  loginItem.className = "nav-item ms-3";

  if (estaLogeado()) {
    // Enlace a Usuarios DummyJSON (resaltado en rojo)
    const usuariosItem = document.createElement("li");
    usuariosItem.className = "nav-item";
    usuariosItem.innerHTML = `
      <a class="nav-link fw-bold text-danger" href="/admin/usuarios.html" title="Ver usuarios DummyJSON">
        Usuarios DummyJSON
      </a>
    `;
    navList.insertBefore(usuariosItem, navList.lastElementChild);

    // Enlace a Administrar Médicos
    const adminItem = document.createElement("li");
    adminItem.className = "nav-item";
    adminItem.innerHTML = `
      <a class="nav-link fw-bold text-primary" href="/admin/medicos.html">Administrar Médicos</a>
    `;
    navList.insertBefore(adminItem, navList.lastElementChild);

    
const especialidadesItem = document.createElement("li");
especialidadesItem.className = "nav-item";
especialidadesItem.innerHTML = `
  <a class="nav-link fw-bold text-success" href="/admin/especialidades.html">
    Administrar Especialidades
  </a>
`;
navList.insertBefore(especialidadesItem, navList.lastElementChild);


    // Botón de cierre de sesión
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
        window.location.href = "/index.html";
      }
    });

  } else {
    // Si no está logeado, mostrar botón de login
    loginItem.innerHTML = `
      <a href="/login/login.html" class="btn btn-outline-primary btn-sm ms-3">
        Login
      </a>
    `;
    navList.appendChild(loginItem);
  }
});
