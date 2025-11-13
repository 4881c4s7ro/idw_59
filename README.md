TRABAJO INTEGRADOR – INTRODUCCIÓN AL DESARROLLO WEB
GRUPO 59

INTEGRANTES:

* Abigail Alejandra Castro
* Danilo Luis Ramirez
* Tadeo Perez
* Nicolas Testa

LINK REPOSITORIO: [https://github.com/4881c4s7ro/idw_59](https://github.com/4881c4s7ro/idw_59)
LINK DEMO: [https://4881c4s7ro.github.io/idw_59/](https://4881c4s7ro.github.io/idw_59/)
LINK VIDEO: https://youtu.be/ZEiQ3YiqZH4

PROYECTO: “Clínica Salud y Vida”

El proyecto consiste en el desarrollo de un sitio web para una clínica médica ficticia, con el objetivo de aplicar los conceptos aprendidos en la materia Introducción al Desarrollo Web.
El sitio incluye las secciones principales: Inicio, Institucional, Contacto, Turnos y Login.

Durante esta tercera entrega (TP3) se realizaron los siguientes cambios y mejoras:

1. Navbar dinámico con JavaScript
   Se implementó un menú de navegación que se adapta según si el usuario está logueado o no.
   Se agregaron rutas absolutas para evitar errores al navegar entre carpetas y se integró con el sistema de autenticación mediante el archivo auth.js.

2. Rediseño del Login
   Se mejoró el diseño del formulario de inicio de sesión con un fondo degradado moderno, animación de entrada, botones estilizados y validación de usuario y contraseña.
   Se eliminaron elementos innecesarios (como el ícono del ojo) para mantener un diseño más limpio y profesional.
   Al iniciar sesión correctamente, el usuario es redirigido automáticamente a la página principal.

3. CRUD de Médicos con JavaScript
   Se incorporó una nueva sección de administración de médicos (admin/medicos.html) con un CRUD funcional implementado completamente en JavaScript.
   Permite agregar, editar y eliminar médicos, almacenando los datos en LocalStorage.
   Los médicos cargados desde esta interfaz se muestran automáticamente en la página de inicio (index.html).

4. Implementación de modo oscuro
   Se agregó un sistema de modo oscuro opcional que guarda la preferencia del usuario utilizando LocalStorage.

5. Código modular y organizado
   Se separaron las funcionalidades en distintos archivos JavaScript (auth.js, navbar.js, medicos.js, initStorage.js) utilizando módulos ES6.
   Esto mejora la legibilidad, mantenimiento y escalabilidad del proyecto.

TECNOLOGÍAS UTILIZADAS:

* HTML5
* CSS3 y Bootstrap 5
* JavaScript
* LocalStorage
* GitHub Pages para el despliegue del sitio
