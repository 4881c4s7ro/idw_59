// assets/js/initStorageTurnos.js

export const inicializarStorageTurnos = () => {
  if (localStorage.getItem("turnos")) return;

  const turnos = [
    { id: 1, doctor: "Dr. Ricardo Fernández", paciente: "Juan Martínez", dia: "Lunes", hora: "09:00" },
    { id: 2, doctor: "Dra. Ana Pérez", paciente: "María López", dia: "Lunes", hora: "10:00" },
    { id: 3, doctor: "Dr. Juan López", paciente: "Carlos Gómez", dia: "Martes", hora: "11:00" },
    { id: 4, doctor: "Dra. Lautaro Gómez", paciente: "Lucía Fernández", dia: "Miércoles", hora: "14:00" }
  ];

  localStorage.setItem("turnos", JSON.stringify(turnos));
};
