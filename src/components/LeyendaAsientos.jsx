/**
 * @fileoverview Leyenda visual de roles de asientos.
 * Componente exportable independientemente de MapaAsientos.
 * Soporta filtrado de roles y orientación horizontal o vertical.
 *
 * @version 2.0.0
 * @author Julian Cancelo
 */

import React from 'react';
import { ROLES } from '../constants/roles.js';

/**
 * @param {object} props
 * @param {string[]} [props.rolesVisibles] - Si se pasa, filtra la leyenda a esos roles.
 * @param {'horizontal'|'vertical'} [props.orientacion='horizontal'] - Layout de la leyenda.
 * @param {boolean}  [props.mostrarDescripcion=false] - Si mostrar descripción larga bajo cada ítem.
 */
export function LeyendaAsientos({
  rolesVisibles,
  orientacion = 'horizontal',
  mostrarDescripcion = false,
}) {
  const items = Object.entries(ROLES)
    .filter(([rol]) => (rolesVisibles ? rolesVisibles.includes(rol) : true))
    .sort(([, a], [, b]) => a.orden - b.orden);

  return (
    <div
      className={`sigic-leyenda sigic-leyenda--${orientacion}`}
      role="list"
      aria-label="Leyenda de roles de asientos"
    >
      {items.map(([rol, { label, Icono, clase, descripcion }]) => (
        <div
          key={rol}
          className="sigic-leyenda__item"
          role="listitem"
          title={descripcion}
        >
          {/* Mini-asiento de muestra */}
          <div
            className={`sigic-leyenda__muestra sigic-seat ${clase}`}
            aria-hidden="true"
          >
            <Icono size={11} />
          </div>

          <div className="sigic-leyenda__texto">
            <span className="sigic-leyenda__label">{label}</span>
            {mostrarDescripcion && (
              <span className="sigic-leyenda__descripcion">{descripcion}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
