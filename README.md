<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/armchair.svg" width="120" alt="Logo de Asientos" />
  <h1>SiGIC Seating Map 🪑</h1>
  <p><strong>Una experiencia premium, interactiva y accesible para la gestión de anfiteatros institucionales.</strong></p>

  [![NPM Version](https://img.shields.io/npm/v/@jcancelo/mapa-asientos-sigic?style=for-the-badge&color=800020)](https://www.npmjs.com/package/@jcancelo/mapa-asientos-sigic)
  [![License](https://img.shields.io/npm/l/@jcancelo/mapa-asientos-sigic?style=for-the-badge&color=10b981)](https://github.com/julianmcancelo/mapa-asientos-sigic/blob/main/LICENSE)
  [![React Compatible](https://img.shields.io/badge/React-18%2B-61dafb?style=for-the-badge&logo=react)](https://react.dev/)

  <p>
    <a href="#-sobre-el-proyecto">Sobre el Proyecto</a> •
    <a href="#-características">Características</a> •
    <a href="#-instalación">Instalación</a> •
    <a href="#%EF%B8%8F-demo">Demo</a> •
    <a href="#-guía-rápida">Uso</a>
  </p>
</div>

---

## 👋 Sobre el Proyecto

¡Hola! Soy **Julian Cancelo**, desarrollador e investigador en el **Instituto Tecnológico Beltrán**. 

Desarrollé esta librería como parte del ecosistema **SiGIC (Sistema de Gestión Institucional de Ceremonias)** en 2026. Mi objetivo principal fue resolver un problema complejo: crear un mapa interactivo de asientos que no solo fuera visualmente deslumbrante y "premium", sino que también fuera **100% accesible** (WCAG 2.1) y extremadamente fácil de integrar para otros desarrolladores.

A diferencia de otras librerías genéricas, este mapa está diseñado pensando en **eventos académicos y protocolares**: maneja múltiples pisos, asignación de roles (autoridades, egresados, personas con movilidad reducida) y soporta navegación nativa por teclado.

---

## ✨ Características

- 🎨 **Estética Premium**: Diseño estilo "Bento", soporte nativo para Modo Claro/Oscuro y animaciones fluidas (glassmorphism).
- ♿ **Accesibilidad Total (WCAG 2.1)**: Soporte completo para navegación por teclado (flechas) y soporte para lectores de pantalla.
- 🏢 **Arquitectura Multinivel**: Soporta visualización de plateas bajas, palcos altos o cualquier estructura personalizada.
- 🔍 **Controles de Zoom**: Pan & Zoom integrados para anfiteatros masivos.
- 🎭 **Gestión de Roles**: Colores e íconos automáticos para *Egresados, Autoridades, Discapacitados, Reservados y Disponibles*.
- 🛡️ **Seguridad por Diseño**: Modo "Solo Lectura" ideal para pantallas de monitoreo en la portería o entrada del evento.

---

## 🚀 Instalación

La librería requiere `react`, `react-dom` y `lucide-react` (para su iconografía moderna).

```bash
npm install @jcancelo/mapa-asientos-sigic lucide-react
```

### Importación del Diseño Base
Para que el motor de CSS inyecte el diseño premium, debes importar la hoja de estilos en tu archivo principal (`main.jsx`, `App.jsx` o `_app.js` si usas Next.js):

```javascript
import '@jcancelo/mapa-asientos-sigic/dist/style.css';
```

---

## 🖥️ Demo

> 💡 **Nota sobre demos en NPM**: NPM no ejecuta código interactivo en su página, pero puedes probar esta librería copiando el código de abajo en un [CodeSandbox](https://codesandbox.io/) o [StackBlitz](https://stackblitz.com/).

*(Próximamente agregaré un GIF interactivo aquí mostrando el mapa en funcionamiento).*

---

## 📖 Guía Rápida

Aquí tienes el ejemplo mínimo para renderizar tu primer anfiteatro:

```javascript
import { useState } from 'react';
import { MapaAsientos, LeyendaAsientos } from '@jcancelo/mapa-asientos-sigic';

export default function MiCeremonia() {
  const [seleccionados, setSeleccionados] = useState([]);

  // 1. Definimos la estructura física de nuestro teatro
  const arquitectura = {
    baja: { filas: 8, asientos: 16 },
    alta: { filas: 5, asientos: 12 },
  };

  // 2. Asignamos asientos a perfiles específicos
  const distribucionRoles = {
    'baja-A-1': 'autoridad',
    'baja-A-2': 'autoridad',
    'baja-C-5': 'egresado',
    'baja-D-3': 'discapacitado', // Visualización con ícono de prioridad
  };

  const manejarSeleccion = (idAsiento) => {
    // Lógica simple de toggle para selección múltiple
    setSeleccionados((prev) => 
      prev.includes(idAsiento) 
        ? prev.filter(id => id !== idAsiento)
        : [...prev, idAsiento]
    );
  };

  return (
    <div style={{ padding: '2rem', background: '#0f0f0f' }}>
      <h1 style={{ color: 'white' }}>Gestor de Asientos</h1>
      
      {/* Componente principal del mapa */}
      <MapaAsientos
        estructura={arquitectura}
        mapaRoles={distribucionRoles}
        seleccionados={seleccionados}
        alHacerClick={manejarSeleccion}
        tema="oscuro"
        mostrarControlesZoom={true}
        maxSeleccionados={4} // Limita a 4 tickets por invitado
      />

      {/* Leyenda explicativa automática */}
      <div style={{ marginTop: '2rem' }}>
        <LeyendaAsientos orientacion="horizontal" />
      </div>
    </div>
  );
}
```

---

## 🛠️ API de Componentes

### `<MapaAsientos />`

| Propiedad | Tipo | Por Defecto | Descripción |
| :--- | :--- | :--- | :--- |
| **`estructura`** | `Object` | *Req* | Define los pisos y dimensiones: `{ baja: { filas: 8, asientos: 16 } }` |
| **`mapaRoles`** | `Object` | `{}` | Diccionario de IDs y su rol (`{'baja-A-1': 'egresado'}`) |
| **`seleccionados`** | `String[]`| `[]` | Array con los IDs que el usuario marcó. |
| **`alHacerClick`** | `Function` | `null` | Función que recibe el `id` clickeado. |
| **`tema`** | `String` | `'claro'` | `'claro'` o `'oscuro'`. |
| **`modoVisualizacion`**| `Boolean`| `false` | Actívalo para pantallas de solo-lectura (ej. monitoreo de entradas). |
| **`maxSeleccionados`** | `Number` | `null` | Límite máximo de asientos que se pueden seleccionar. |
| **`mostrarEstadisticas`**| `Boolean`| `true` | Muestra la barra de resumen en tiempo real. |

---

## 🤝 Contribuir y Soporte

Si estás desarrollando en el Instituto Beltrán o simplemente integraste esta herramienta en tu proyecto y tienes dudas, siéntete libre de abrir un **Issue** en el repositorio.

Desarrollado con pasión ❤️ y café ☕ por **Julian Cancelo**.

<div align="center">
  <br />
  <a href="https://github.com/julianmcancelo">GitHub</a> • 
  <a href="mailto:jcancelo@itbeltran.edu.ar">jcancelo@itbeltran.edu.ar</a>
</div>
