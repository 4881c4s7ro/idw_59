// assets/js/auth.js

const USUARIO_ADMIN = {
  usuario: "admin",
  clave: "1234"
};

// Guarda sesión en LocalStorage
export const login = (usuario, clave) => {
  if (usuario === USUARIO_ADMIN.usuario && clave === USUARIO_ADMIN.clave) {
    localStorage.setItem("usuarioLogeado", JSON.stringify(USUARIO_ADMIN));
    return true;
  }
  return false;
};

// Cierra sesión
export const logout = () => {
  localStorage.removeItem("usuarioLogeado");
};

// Verifica si está logueado
export const estaLogeado = () => {
  return !!localStorage.getItem("usuarioLogeado");
};
