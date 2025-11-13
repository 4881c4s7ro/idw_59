// assets/js/turnos.js

import { inicializarStorageTurnos } from "./initStorageTurnos.js";
import { obtenerMedicos } from "./medicos.js"; // si querés vincular con médicos

// Inicializa el localStorage si no existe
inicializarStorageTurnos();

// Helpers de almacenamiento
const obtenerTurnos = () => JSON.parse(localStorage.getItem("turnos")) || [];
const guardarTurnos = (lista) => localStorage.setItem("turnos", JSON.stringify(lista));

// Rellenar tabla de turnos
const renderizarTabla = () => {
  const tabla = document.getElementById("tablaTurnos");
  if (!tabla) return;

  const turnos = obtenerTurnos();
  tabla.innerHTML = turnos.map(t => `
    <tr>
      <td>${t.id}</td>
      <td>${t.doctor}</td>
      <td>${t.paciente}</td>
      <td>${t.dia}</td>
      <td>${t.hora}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editarTurno(${t.id})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarTurno(${t.id})">Eliminar</button>
      </td>
    </tr>
  `).join('');
};

// Crear turno
window.crearTurno = (event) => {
  event.preventDefault();
  const doctor = document.getElementById("doctor").value.trim();
  const paciente = document.getElementById("paciente").value.trim();
  const dia = document.getElementById("dia").value;
  const hora = document.getElementById("hora").value;

  if (!doctor || !paciente || !dia || !hora) {
    alert("Por favor complete todos los campos.");
    return;
  }

  const turnos = obtenerTurnos();
  const nuevoId = turnos.length > 0 ? Math.max(...turnos.map(t => t.id)) + 1 : 1;

  turnos.push({ id: nuevoId, doctor, paciente, dia, hora });
  guardarTurnos(turnos);
  renderizarTabla();
  event.target.reset();
};

// Editar turno
window.editarTurno = (id) => {
  const turnos = obtenerTurnos();
  const turno = turnos.find(t => t.id === id);
  if (!turno) return alert("Turno no encontrado");

  document.getElementById("doctor").value = turno.doctor;
  document.getElementById("paciente").value = turno.paciente;
  document.getElementById("dia").value = turno.dia;
  document.getElementById("hora").value = turno.hora;
  document.getElementById("turnoId").value = turno.id;
};

// Actualizar turno
window.actualizarTurno = (event) => {
  event.preventDefault();
  const id = parseInt(document.getElementById("turnoId").value);
  if (!id) return crearTurno(event);

  const turnos = obtenerTurnos();
  const index = turnos.findIndex(t => t.id === id);
  if (index === -1) return alert("Turno no encontrado");

  turnos[index] = {
    id,
    doctor: document.getElementById("doctor").value.trim(),
    paciente: document.getElementById("paciente").value.trim(),
    dia: document.getElementById("dia").value,
    hora: document.getElementById("hora").value
  };

  guardarTurnos(turnos);
  renderizarTabla();
  event.target.reset();
  document.getElementById("turnoId").value = "";
};

// Eliminar turno
window.eliminarTurno = (id) => {
  if (!confirm("¿Desea eliminar este turno?")) return;
  const turnos = obtenerTurnos().filter(t => t.id !== id);
  guardarTurnos(turnos);
  renderizarTabla();
};

// Renderizar tabla al cargar
document.addEventListener("DOMContentLoaded", () => {
  renderizarTabla();
});
