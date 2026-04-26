/**
 * @fileoverview Selector de nivel (piso) del anfiteatro.
 * Solo se renderiza cuando hay más de un nivel definido en la estructura.
 * Cuando cambia de nivel, emite una transición animada de contenido.
 *
 * @version 2.0.0
 * @author Julian Cancelo
 */

import React from 'react';
import { Layers } from 'lucide-react';

/**
 * @param {object} props
 * @param {string[]}           props.niveles       - Lista de nombres de niveles disponibles.
 * @param {string}             props.nivelActivo   - Nombre del nivel actualmente seleccionado.
 * @param {(nivel: string) => void} props.alCambiarNivel - Callback al seleccionar un nivel.
 */
export function SelectorNivel({ niveles, nivelActivo, alCambiarNivel }) {
  if (!niveles || niveles.length <= 1) return null;

  return (
    <div
      className="sigic-nivel-selector"
      role="tablist"
      aria-label="Seleccionar piso del anfiteatro"
    >
      <Layers size={13} className="sigic-nivel-selector__icono" aria-hidden="true" />

      {niveles.map((nivel) => {
        const activo = nivel === nivelActivo;
        return (
          <button
            key={nivel}
            role="tab"
            aria-selected={activo}
            className={`sigic-nivel-tab${activo ? ' sigic-nivel-tab--activo' : ''}`}
            onClick={() => !activo && alCambiarNivel?.(nivel)}
            tabIndex={activo ? 0 : -1}
          >
            {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
            {activo && <span className="sigic-nivel-tab__indicador" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}
