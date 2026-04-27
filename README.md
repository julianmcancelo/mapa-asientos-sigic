<div align="center">
  <img src="./encabezado.png" width="100%" alt="Encabezado SiGIC" />

  <br />

  <img src="./logo_sigic_oficial.png" width="350" alt="Logo SiGIC Oficial" />

  # Mapa de Asientos SiGIC
  **Tecnicatura Superior en Analista de Sistemas | Instituto Tecnológico Beltrán**
  
  *Solución Profesional para la Gestión de Aforos y Protocolo Institucional*

  [![Versión NPM](https://img.shields.io/npm/v/@jcancelo/mapa-asientos-sigic?style=for-the-badge&color=2C3E50&label=VERSI%C3%93N)](https://www.npmjs.com/package/@jcancelo/mapa-asientos-sigic)
  [![Licencia](https://img.shields.io/npm/l/@jcancelo/mapa-asientos-sigic?style=for-the-badge&color=16A085&label=LICENCIA)](https://github.com/julianmcancelo/mapa-asientos-sigic/blob/main/LICENSE)
  [![Compatible con React](https://img.shields.io/badge/React-18%2B-2980B9?style=for-the-badge&logo=react&label=COMPATIBILIDAD)](https://react.dev/)

  [Introducción](#introducción-y-contexto) • [Análisis](#análisis-de-la-problemática) • [Propuesta](#propuesta-de-solución-mapa-de-asientos-sigic) • [Guía de Uso](#guía-de-implementación) • [Documentación](#referencia-de-la-api-documentación-técnica)

  ---
</div>

## Introducción y Contexto

Soy **Julian Cancelo**, estudiante de la **Tecnicatura Superior en Analista de Sistemas** y desarrollador en el **Instituto Tecnológico Beltrán**. 

Este proyecto nace de la necesidad de estandarizar la gestión de espacios en el ecosistema **SiGIC (Sistema de Gestión Institucional de Ceremonias)**. Como futuro analista, mi enfoque no fue solo "escribir código", sino realizar un relevamiento profundo de las necesidades de las instituciones académicas al organizar eventos masivos, donde la precisión, el control de roles y la accesibilidad son requerimientos críticos.

## Análisis de la Problemática

En el desarrollo de sistemas institucionales, la gestión de asientos suele abordarse con soluciones genéricas que fallan en escenarios complejos. Durante mi análisis, identifiqué tres pilares fundamentales que esta librería debía resolver:

1.  **Complejidad Arquitectónica**: La necesidad de representar múltiples niveles (Plateas, Palcos) sin perder la simplicidad técnica.
2.  **Gestión de Roles Específicos**: En ceremonias académicas, un asiento no es solo "libre/ocupado". Necesitamos distinguir entre autoridades, egresados y personas con movilidad reducida.
3.  **Brecha de Accesibilidad**: Garantizar que el sistema sea operable por cualquier usuario, cumpliendo con estándares internacionales (WCAG 2.1).

## Propuesta de Solución: Mapa de Asientos SiGIC

La solución propuesta es una librería de componentes React de alto rendimiento, diseñada bajo un paradigma de **estética premium y robustez técnica**. No es solo un mapa; es una herramienta de gestión de aforos con las siguientes características:

### Arquitectura y Funcionalidades
- **Diseño Estructural Flexible**: Soporta configuraciones de filas y columnas dinámicas por sector.
- **Motor de Roles Dinámico**: Sistema de tipado para asignar perfiles (Autoridades, Egresados, Prioritarios) con representación visual automática.
- **Experiencia de Usuario (UX) Premium**: Interfaz basada en el diseño "Bento", con soporte para *Glassmorphism* y transiciones fluidas.
- **Interoperabilidad**: Compatible con arquitecturas modernas de frontend, permitiendo una integración limpia en minutos.
- **Modos de Operación**:
    - **Interactivo**: Para selección y reserva de lugares.
    - **Monitoreo**: Modo "Solo Lectura" optimizado para pantallas de control de acceso.

---

## Especificaciones Técnicas

### Requisitos de Entorno
*   **Node.js**: 16.x o superior
*   **React**: 18.x (optimizado para Modo Concurrente)
*   **Dependencias**: `lucide-react` para iconografía técnica.

### Instalación
```bash
npm install @jcancelo/mapa-asientos-sigic lucide-react
```

### Inyección de Estilos
Para garantizar la integridad visual de alta gama, se debe importar el núcleo de estilos en el punto de entrada de la aplicación:
```javascript
import '@jcancelo/mapa-asientos-sigic/dist/style.css';
```

---

## Guía de Implementación

A continuación, se presenta un caso de uso típico siguiendo los estándares de implementación analizados:

```javascript
import { useState } from 'react';
import { MapaAsientos, LeyendaAsientos } from '@jcancelo/mapa-asientos-sigic';

export default function GestionCeremonia() {
  const [seleccion, setSeleccion] = useState([]);

  // Definición lógica de la arquitectura del teatro
  const teatroBeltran = {
    plateaBaja: { filas: 10, asientos: 20 },
    plateaAlta: { filas: 6, asientos: 15 },
  };

  // Mapeo de roles según relevamiento protocolar
  const rolesProtocolo = {
    'plateaBaja-A-1': 'autoridad',
    'plateaBaja-E-5': 'discapacitado', // Prioridad visual
    'plateaAlta-B-2': 'egresado',
  };

  return (
    <main className="sigic-container">
      <MapaAsientos
        estructura={teatroBeltran}
        mapaRoles={rolesProtocolo}
        seleccionados={seleccion}
        alHacerClick={(id) => setSeleccion([...seleccion, id])}
        tema="oscuro"
        mostrarControlesZoom={true}
        maxSeleccionados={5}
      />
      <LeyendaAsientos orientacion="horizontal" />
    </main>
  );
}
```

---

## Referencia de la API (Documentación Técnica)

| Atributo | Tipo | Descripción |
| :--- | :--- | :--- |
| `estructura` | `Object` | Define sectores, filas y asientos. Clave para la escalabilidad. |
| `mapaRoles` | `Object` | Diccionario de IDs vinculados a un rol de protocolo. |
| `tema` | `'claro' \| 'oscuro'` | Selector de interfaz para adaptabilidad de entorno. |
| `modoVisualizacion` | `Boolean` | Desactiva interacciones para uso en paneles de monitoreo. |
| `maxSeleccionados` | `Number` | Restricción lógica de negocio para límites de reserva. |

---

## Contribución y Soporte

Como parte de mi formación constante, este proyecto está abierto a retroalimentación técnica. Si encuentras un error o tienes una sugerencia sobre la lógica de negocio del mapa, por favor abre un **Issue** (Incidencia).

**Desarrollado con enfoque analítico por Julian Cancelo.**

<div align="center">
  <br />
  <a href="https://github.com/julianmcancelo">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  <a href="mailto:jcancelo.dev@gmail.com">
    <img src="https://img.shields.io/badge/Correo-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
  </a>
</div>



