/**
 * @fileoverview Controles de zoom integrados para el mapa de asientos.
 * Gestiona el estado del zoom internamente cuando el consumidor no lo controla,
 * o actúa como componente controlado si se pasa `zoom` y `onZoomChange`.
 *
 * @version 2.0.0
 * @author Julian Cancelo
 */

import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

const PASO  = 0.1;
const REDONDEAR = (n) => Math.round(n * 10) / 10;

/**
 * @param {object} props
 * @param {number}             props.zoom         - Valor actual del zoom (0.5 – 2).
 * @param {(z: number) => void} props.onZoomChange - Callback al cambiar el zoom.
 * @param {number}             [props.min=0.5]    - Valor mínimo de zoom.
 * @param {number}             [props.max=2]      - Valor máximo de zoom.
 * @param {number}             [props.default=1]  - Valor por defecto para el botón de reset.
 */
export function ControlesZoom({ zoom, onZoomChange, min = 0.5, max = 2, default: zoomDefault = 1 }) {
  const reducir  = () => onZoomChange?.(REDONDEAR(Math.max(min, zoom - PASO)));
  const ampliar  = () => onZoomChange?.(REDONDEAR(Math.min(max, zoom + PASO)));
  const restaurar = () => onZoomChange?.(zoomDefault);

  const porcentaje = Math.round(zoom * 100);

  return (
    <div className="sigic-zoom" role="group" aria-label="Controles de zoom">
      <button
        className="sigic-zoom__btn"
        onClick={reducir}
        disabled={zoom <= min}
        aria-label="Reducir zoom"
        title="Reducir"
      >
        <ZoomOut size={14} aria-hidden="true" />
      </button>

      <button
        className="sigic-zoom__valor"
        onClick={restaurar}
        aria-label={`Zoom actual: ${porcentaje}%. Click para restaurar.`}
        title="Restaurar zoom"
      >
        {porcentaje}%
      </button>

      <button
        className="sigic-zoom__btn"
        onClick={ampliar}
        disabled={zoom >= max}
        aria-label="Ampliar zoom"
        title="Ampliar"
      >
        <ZoomIn size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
