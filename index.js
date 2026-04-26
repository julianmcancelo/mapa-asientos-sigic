/**
 * Punto de entrada raíz de la librería.
 * Re-exporta todo desde src/ e importa los estilos.
 */
import './src/styles/main.css';

export { MapaAsientos }    from './src/components/MapaAsientos.jsx';
export { LeyendaAsientos } from './src/components/LeyendaAsientos.jsx';
export { ControlesZoom }   from './src/components/ControlesZoom.jsx';
export { ROLES, etiquetaFilaDefault } from './src/constants/roles.js';
