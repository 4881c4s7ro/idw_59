// assets/js/especialidadesCrud.js

// Inicializa las especialidades en localStorage si no existen
const inicializarEspecialidades = () => {
  if (localStorage.getItem("especialidades")) return;

  const iniciales = [
    "Medicina General",
    "Cardiología",
    "Pediatría",
    "Ginecología",
    "Dermatología",
    "Neurología",
    "Traumatología",
    "Oftalmología",
    "Urología"
  ];

  const especialidades = iniciales.map((nombre, i) => ({
    id: i + 1,
    nombre
  }));

  localStorage.setItem("especialidades", JSON.stringify(especialidades));
};

// Obtener lista de especialidades
const obtenerEspecialidades = () =>
  JSON.parse(localStorage.getItem("especialidades")) || [];

// Guardar lista de especialidades
const guardarEspecialidades = (lista) =>
  localStorage.setItem("especialidades", JSON.stringify(lista));

// Renderizar tabla
const renderizarTabla = () => {
  const tabla = document.getElementById("tablaEspecialidades");
  if (!tabla) return;

  const especialidades = obtenerEspecialidades();
  tabla.innerHTML = especialidades
    .map(
      (e) => `
      <tr>
        <td>${e.id}</td>
        <td>${e.nombre}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarEspecialidad(${e.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarEspecialidad(${e.id})">Eliminar</button>
        </td>
      </tr>
    `
    )
    .join("");
};

// Crear nueva especialidad
window.crearEspecialidad = (event) => {
  event.preventDefault();

  const nombre = document.getElementById("nombreEspecialidad").value.trim();
  if (!nombre) return alert("Debe ingresar un nombre.");

  const especialidades = obtenerEspecialidades();

  // Evitar duplicados
  if (especialidades.some((e) => e.nombre.toLowerCase() === nombre.toLowerCase())) {
    return alert("Esa especialidad ya existe.");
  }

  const nuevoId = especialidades.length
    ? Math.max(...especialidades.map((e) => e.id)) + 1
    : 1;

  especialidades.push({ id: nuevoId, nombre });

  guardarEspecialidades(especialidades);
  renderizarTabla();
  event.target.reset();
};

// Editar especialidad
window.editarEspecialidad = (id) => {
  const especialidades = obtenerEspecialidades();
  const esp = especialidades.find((e) => e.id === id);
  if (!esp) return alert("Especialidad no encontrada");

  document.getElementById("nombreEspecialidad").value = esp.nombre;
  document.getElementById("especialidadId").value = esp.id;
};

// Actualizar especialidad
window.actualizarEspecialidad = (event) => {
  event.preventDefault();
  const id = parseInt(document.getElementById("especialidadId").value);
  if (!id) return crearEspecialidad(event);

  const especialidades = obtenerEspecialidades();
  const index = especialidades.findIndex((e) => e.id === id);
  if (index === -1) return alert("Especialidad no encontrada");

  const nuevoNombre = document.getElementById("nombreEspecialidad").value.trim();
  if (!nuevoNombre) return alert("Debe ingresar un nombre.");

  // Verificar duplicados (excepto el mismo id)
  if (
    especialidades.some(
      (e) => e.nombre.toLowerCase() === nuevoNombre.toLowerCase() && e.id !== id
    )
  ) {
    return alert("Ya existe otra especialidad con ese nombre.");
  }

  especialidades[index].nombre = nuevoNombre;
  guardarEspecialidades(especialidades);
  renderizarTabla();
  event.target.reset();
  document.getElementById("especialidadId").value = "";
};

// Eliminar especialidad
window.eliminarEspecialidad = (id) => {
  if (!confirm("¿Desea eliminar esta especialidad?")) return;

  const especialidades = obtenerEspecialidades().filter((e) => e.id !== id);
  guardarEspecialidades(especialidades);
  renderizarTabla();
};

// Inicializar y renderizar al cargar
document.addEventListener("DOMContentLoaded", () => {
  inicializarEspecialidades();
  renderizarTabla();
});
