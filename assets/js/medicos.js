import { inicializarStorage } from "./initStorage.js";
import { ESPECIALIDADES } from "./especialidades.js"; // <-- NUEVA IMPORTACIÓN

// Inicializa LocalStorage
inicializarStorage();

const obtenerMedicos = () => JSON.parse(localStorage.getItem("medicos")) || [];
const guardarMedicos = (lista) => localStorage.setItem("medicos", JSON.stringify(lista));

// NUEVA FUNCIÓN: Llenar el select de especialidades
const poblarEspecialidades = () => {
    const select = document.getElementById("especialidad");
    if (!select) return; // Salir si no estamos en medicos.html

    // Obtener la opción "Seleccione una especialidad" (primer elemento)
    const primerOpcion = select.querySelector('option[disabled][selected]');

    // Si ya existe la opción por defecto, la eliminamos para empezar limpio
    if (primerOpcion) {
        select.innerHTML = '';
        select.appendChild(primerOpcion);
    }
    
    // Si la lista fue vaciada, aseguramos la opción por defecto
    if(select.options.length === 0){
        select.innerHTML = '<option value="" disabled selected>Seleccione una especialidad</option>';
    }

    ESPECIALIDADES.forEach(esp => {
        const option = document.createElement('option');
        option.value = esp;
        option.textContent = esp;
        select.appendChild(option);
    });
};

const renderizarTabla = () => {
  const tabla = document.getElementById("tablaMedicos");
  if (!tabla) return;

  const medicos = obtenerMedicos();
  tabla.innerHTML = medicos.map(m => `
    <tr>
      <td>${m.id}</td>
      <td>${m.nombre}</td>
      <td>${m.especialidad}</td>
      <td><img src="../${m.foto}" alt="${m.nombre}" width="80"></td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editarMedico(${m.id})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarMedico(${m.id})">Eliminar</button>
      </td>
    </tr>
  `).join('');
};

// Crear médico
window.crearMedico = (event) => {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  // Obtiene el valor del select
  const especialidad = document.getElementById("especialidad").value; 
  
  // Se asigna directamente la imagen por defecto
  const fotoUrl = "img/doctorDefault.jpg"; 
  
  const medicos = obtenerMedicos();

  // Calcular ID consecutivo
  const nuevoId = medicos.length > 0 ? Math.max(...medicos.map(m => m.id)) + 1 : 1;

  medicos.push({ id: nuevoId, nombre, especialidad, foto: fotoUrl });

  guardarMedicos(medicos);
  renderizarTabla();
  event.target.reset();
};


// Editar médico
window.editarMedico = (id) => {
  const medicos = obtenerMedicos();
  const medico = medicos.find(m => m.id === id);
  if (!medico) return alert("Médico no encontrado");

  document.getElementById("nombre").value = medico.nombre;
  // Selecciona el valor correcto en el select
  document.getElementById("especialidad").value = medico.especialidad; 
  
  document.getElementById("medicoId").value = medico.id;
};

// Actualizar médico
window.actualizarMedico = (event) => {
  event.preventDefault();
  const id = parseInt(document.getElementById("medicoId").value);
  // Si no hay ID, asume que es una creación
  if (!id) return crearMedico(event); 

  const medicos = obtenerMedicos();
  const index = medicos.findIndex(m => m.id === id);
  if (index === -1) return alert("Médico no encontrado");

  medicos[index] = {
    id,
    nombre: document.getElementById("nombre").value.trim(),
    // Obtiene el valor actualizado del select
    especialidad: document.getElementById("especialidad").value, 
    // La foto se mantiene tal como estaba
    foto: medicos[index].foto 
  };

  guardarMedicos(medicos);
  renderizarTabla();
  event.target.reset();
  document.getElementById("medicoId").value = "";
};

// Eliminar médico
window.eliminarMedico = (id) => {
  if(!confirm("¿Desea eliminar este médico?")) return;
  const medicos = obtenerMedicos().filter(m => m.id !== id);
  guardarMedicos(medicos);
  renderizarTabla();
};

// Renderizar tabla y poblar especialidades al cargar
document.addEventListener("DOMContentLoaded", () => {
    poblarEspecialidades(); // <-- NUEVA LLAMADA
    renderizarTabla();
});