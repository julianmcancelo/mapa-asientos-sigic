/**
 * @fileoverview Componente de asiento individual. Memoizado con React.memo para
 * evitar re-renders innecesarios en grillas grandes.
 *
 * @version 2.0.0
 * @author Julian Cancelo
 */

import React, { memo } from 'react';
import { ROLES, ROL_BLOQUEADO, ROL_DEFAULT } from '../constants/roles.js';
import { Tooltip } from './Tooltip.jsx';

/**
 * @param {object} props
 * @param {string}   props.id                - ID único del asiento (ej: "baja-A-1")
 * @param {string}   props.rol               - Rol asignado al asiento
 * @param {boolean}  props.esSeleccionado    - Si el asiento está actualmente seleccionado
 * @param {boolean}  props.esFocusTeclado    - Si el asiento tiene el foco de navegación por teclado
 * @param {boolean}  props.deshabilitado     - Si el asiento está deshabilitado (ej: maxSeleccionados alcanzado)
 * @param {boolean}  props.modoVisualizacion - Si el mapa está en solo lectura
 * @param {object}   [props.dato]            - Datos extra del asiento (nombre, etc.)
 * @param {Function} [props.onClick]         - Callback al hacer click
 */
export const Asiento = memo(function Asiento({
  id,
  rol,
  esSeleccionado,
  esFocusTeclado,
  deshabilitado,
  modoVisualizacion,
  dato,
  onClick,
}) {
  const config    = ROLES[rol] || ROLES[ROL_DEFAULT];
  const esBloqueado = rol === ROL_BLOQUEADO;
  const { Icono } = config;

  // Número del asiento (última parte del ID "baja-A-3" → "3")
  const numero = id.split('-').pop();

  const clases = [
    'sigic-seat',
    esSeleccionado          ? 'sigic-seat--seleccionado' : config.clase,
    esFocusTeclado          ? 'sigic-seat--foco-teclado' : '',
    (deshabilitado && !esSeleccionado) ? 'sigic-seat--limitado' : '',
  ].filter(Boolean).join(' ');

  const puedeInteractuar = !modoVisualizacion && !esBloqueado && !deshabilitado;

  // Contenido del tooltip
  const contenidoTooltip = esBloqueado ? null : (
    <span>
      {dato?.nombre && <><strong>{dato.nombre}</strong> · </>}
      {config.label} · <span style={{ opacity: 0.6 }}>{id}</span>
    </span>
  );

  const boton = (
    <button
      className={clases}
      onClick={puedeInteractuar ? () => onClick?.(id) : undefined}
      disabled={esBloqueado || (deshabilitado && !esSeleccionado)}
      aria-label={`Asiento ${id}${dato?.nombre ? ` — ${dato.nombre}` : ''} — ${config.label}`}
      aria-pressed={esSeleccionado}
      aria-describedby={`sigic-tooltip-${id}`}
      tabIndex={esBloqueado ? -1 : 0}
      data-rol={rol}
      data-id={id}
    >
      <Icono
        size={esBloqueado ? 9 : 13}
        strokeWidth={esBloqueado ? 1.5 : 2}
        aria-hidden="true"
      />
      <span className="sigic-seat__numero" aria-hidden="true">
        {numero}
      </span>
    </button>
  );

  if (esBloqueado) return boton;

  return <Tooltip contenido={contenidoTooltip}>{boton}</Tooltip>;
});

Asiento.displayName = 'Asiento';
