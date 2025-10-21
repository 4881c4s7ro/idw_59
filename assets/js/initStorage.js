export const inicializarStorage = () => {
  if (localStorage.getItem("medicos")) return;

  const medicos = [
    // Rutas corregidas: "img/..."
    { id: 1, nombre: "Ricardo Fernández", especialidad: "Dirección Médica", foto: "img/doctor1.jpg" },
    { id: 2, nombre: "Ana Pérez", especialidad: "Pediatría", foto: "img/doctor2.jpg" },
    { id: 3, nombre: "Juan López", especialidad: "Cardiología", foto: "img/doctor3.jpg" },
    { id: 4, nombre: "Lautaro Gómez", especialidad: "Ginecología", foto: "img/doctor4.jpg" }
  ];

  localStorage.setItem("medicos", JSON.stringify(medicos));
};