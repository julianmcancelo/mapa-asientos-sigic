/**
 * Punto de entrada del directorio src/.
 * Exporta todos los componentes públicos de la librería.
 *
 * @module @jcancelo/mapa-asientos-sigic
 * @version 2.0.0
 */

import '../src/styles/main.css';

export { MapaAsientos }    from './components/MapaAsientos.jsx';
export { LeyendaAsientos } from './components/LeyendaAsientos.jsx';
export { ControlesZoom }   from './components/ControlesZoom.jsx';

// Utilidades públicas
export { ROLES, etiquetaFilaDefault } from './constants/roles.js';
