// assets/js/auth.js

// Inicia sesión contra la API pública de DummyJSON
export async function login(usuario, clave) {
  try {
    const respuesta = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usuario,
        password: clave
      })
    });

    if (!respuesta.ok) {
      alert("Usuario o contraseña incorrectos");
      return false;
    }

    const datos = await respuesta.json();

    // Guardar token y datos del usuario en sessionStorage
    sessionStorage.setItem("accessToken", datos.token);
    sessionStorage.setItem("usuario", JSON.stringify(datos));

    return true;

  } catch (error) {
    console.error("Error en login:", error);
    alert("Error de conexión con el servidor");
    return false;
  }
}

// Cierra la sesión y redirige al login
export function logout() {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("usuario");
  window.location.href = "/login/login.html";
}

// Verifica si hay un usuario logeado (token presente)
export function estaLogeado() {
  return !!sessionStorage.getItem("accessToken");
}
