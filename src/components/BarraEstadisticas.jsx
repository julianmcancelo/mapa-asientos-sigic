/**
 * @fileoverview Barra de estadísticas que resume el conteo de asientos por rol.
 * Usa useMemo para evitar recalcular en cada render cuando los datos no cambian.
 *
 * @version 2.0.0
 * @author Julian Cancelo
 */

import React, { useMemo } from 'react';
import { ROLES } from '../constants/roles.js';

/**
 * @param {object} props
 * @param {Record<string, string>} props.mapaRoles    - Asignación de roles por asiento ID.
 * @param {{ filas: number, asientos: number }} props.configuracion - Tamaño del nivel.
 * @param {string}             props.nivelActivo  - Nivel actualmente visible.
 * @param {(indice: number) => string} props.etiquetaFila - Función de etiqueta de fila.
 */
export function BarraEstadisticas({ mapaRoles, configuracion, nivelActivo, etiquetaFila }) {
  const conteo = useMemo(() => {
    const resultado = {};
    const { filas = 0, asientos = 0 } = configuracion;

    for (let fi = 0; fi < filas; fi++) {
      const fila = etiquetaFila(fi);
      for (let ai = 0; ai < asientos; ai++) {
        const id  = `${nivelActivo}-${fila}-${ai + 1}`;
        const rol = mapaRoles[id] || 'disponible';
        resultado[rol] = (resultado[rol] || 0) + 1;
      }
    }

    return resultado;
  }, [mapaRoles, configuracion, nivelActivo, etiquetaFila]);

  const total = Object.values(conteo).reduce((a, b) => a + b, 0);

  // Ordenar según el orden definido en ROLES, disponible al final junto a total
  const pills = Object.keys(ROLES)
    .filter((rol) => conteo[rol] && conteo[rol] > 0)
    .sort((a, b) => (ROLES[a]?.orden ?? 99) - (ROLES[b]?.orden ?? 99));

  return (
    <div className="sigic-stats" role="status" aria-label="Resumen de asientos por rol">
      {pills.map((rol) => {
        const cfg  = ROLES[rol];
        if (!cfg) return null;
        const { Icono } = cfg;
        return (
          <span
            key={rol}
            className={`sigic-stats__pill sigic-stats__pill--${rol}`}
            title={cfg.descripcion}
          >
            <Icono size={10} aria-hidden="true" />
            <strong>{conteo[rol]}</strong>
            <span className="sigic-stats__pill-label">{cfg.label}</span>
          </span>
        );
      })}

      <span className="sigic-stats__pill sigic-stats__pill--total">
        <strong>{total}</strong>
        <span className="sigic-stats__pill-label">Total</span>
      </span>
    </div>
  );
}
