# @jcancelo/mapa-asientos-sigic

Librería profesional para la visualización y gestión interactiva de mapas de asientos en entornos institucionales. Desarrollada por Julian Cancelo para el Instituto Tecnológico Beltrán.

---

## Instalación

```bash
npm install @jcancelo/mapa-asientos-sigic lucide-react
```

### Importación de estilos

Importar en el punto de entrada de su aplicación (`main.js` o `App.js`):

```javascript
import '@jcancelo/mapa-asientos-sigic/dist/style.css';
```

---

## Guía de Uso

### Implementación Básica

```javascript
import { MapaAsientos } from '@jcancelo/mapa-asientos-sigic';

const Ejemplo = () => {
  const estructura = {
    baja: { filas: 8, asientos: 16 },
    alta: { filas: 5, asientos: 12 },
  };

  const roles = {
    'baja-A-1': 'autoridad',
    'baja-A-2': 'autoridad',
    'baja-C-5': 'egresado',
    'baja-D-3': 'discapacitado',
  };

  return (
    <MapaAsientos
      estructura={estructura}
      mapaRoles={roles}
      alHacerClick={(id) => console.log('Asiento:', id)}
    />
  );
};
```

### Modo Solo Lectura (Portería / Monitoreo)

```javascript
<MapaAsientos
  estructura={estructura}
  mapaRoles={roles}
  modoVisualizacion={true}
  datosPorAsiento={{
    'baja-C-5': { nombre: 'Ana Gómez' },
    'baja-D-3': { nombre: 'Carlos Ruiz' },
  }}
/>
```

### Leyenda independiente

```javascript
import { LeyendaAsientos } from '@jcancelo/mapa-asientos-sigic';

// Todos los roles
<LeyendaAsientos />

// Solo los roles que se usan
<LeyendaAsientos rolesVisibles={['egresado', 'discapacitado', 'disponible']} />

// Orientación vertical
<LeyendaAsientos orientacion="vertical" />
```

### Control externo del nivel activo

```javascript
const [nivel, setNivel] = useState('baja');

<MapaAsientos
  estructura={estructura}
  mapaRoles={roles}
  nivelActivo={nivel}
  alCambiarNivel={(nuevoNivel) => setNivel(nuevoNivel)}
/>
```

---

## API de Componentes

### `<MapaAsientos />`

| Propiedad | Tipo | Por Defecto | Descripción |
| :--- | :--- | :--- | :--- |
| **estructura** | `Object` | `{}` | Definición de filas y asientos por nivel. `{ baja: { filas: 8, asientos: 16 } }` |
| **mapaRoles** | `Object` | `{}` | Asignación de roles a IDs de asiento. `{ 'baja-A-1': 'egresado' }` |
| **seleccionados** | `Array` | `[]` | IDs de asientos marcados como seleccionados activamente. |
| **alHacerClick** | `Function` | `null` | Callback disparado con el `id` del asiento al hacer click. |
| **zoom** | `Number` | `1` | Factor de escala para la visualización del mapa. |
| **nivelActivo** | `String` | `undefined` | Si se provee, el componente actúa en modo controlado para el nivel. |
| **alCambiarNivel** | `Function` | `null` | Callback con el nombre del nivel cuando el usuario lo cambia. |
| **modoVisualizacion** | `Boolean` | `false` | Desactiva toda interacción. Ideal para pantallas de monitoreo. |
| **mostrarEstadisticas** | `Boolean` | `true` | Muestra una barra de resumen de asientos por rol debajo del mapa. |
| **datosPorAsiento** | `Object` | `{}` | Datos extra por asiento (ej: `{ nombre: 'Ana Gómez' }`) para mostrar en tooltips. |

### `<LeyendaAsientos />`

| Propiedad | Tipo | Por Defecto | Descripción |
| :--- | :--- | :--- | :--- |
| **rolesVisibles** | `Array` | `undefined` | Si se provee, filtra la leyenda solo con los roles listados. |
| **orientacion** | `String` | `'horizontal'` | Layout de la leyenda: `'horizontal'` o `'vertical'`. |

---

## Roles Soportados

| ID | Ícono | Color |
| :--- | :--- | :--- |
| `disponible` | Sillón | Blanco |
| `egresado` | Birrete | Violeta |
| `autoridad` | Escudo | Negro |
| `discapacitado` | Alerta | Púrpura |
| `reservado` | Sillón | Ámbar |
| `bloqueado` | X | Gris (inactivo) |

---

## Contexto Institucional

Componente parte del proyecto de modernización digital del **Instituto Tecnológico Beltrán (2026)**.

## Licencia

MIT

---
Julian Cancelo — Desarrollo y Arquitectura
Instituto Tecnológico Beltrán
