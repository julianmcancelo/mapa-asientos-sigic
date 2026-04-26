/**
 * @fileoverview Hook de navegación accesible por teclado para el mapa de asientos.
 * Cumple WCAG 2.1 AA para role="grid" — Las flechas mueven el foco entre asientos,
 * Enter y Space seleccionan el asiento activo.
 *
 * @version 2.0.0
 * @author Julian Cancelo
 */

import { useState, useCallback } from 'react';
import { ROL_BLOQUEADO } from '../constants/roles.js';

/**
 * @param {object} opciones
 * @param {object} opciones.configuracion - { filas: number, asientos: number }
 * @param {Record<string, string>} opciones.mapaRoles - Mapa de roles por id de asiento.
 * @param {string} opciones.nivelActivo - Nivel activo del anfiteatro.
 * @param {(id: string) => void} [opciones.onSeleccionar] - Callback al seleccionar con teclado.
 * @param {(indice: number) => string} opciones.etiquetaFila - Función de etiqueta de fila.
 * @returns {{ posicion: {fila: number, asiento: number}, setPosicion: Function, manejarTecla: Function }}
 */
export function useNavegacionTeclado({ configuracion, mapaRoles, nivelActivo, onSeleccionar, etiquetaFila }) {
  const [posicion, setPosicion] = useState({ fila: 0, asiento: 0 });

  /**
   * Busca la siguiente posición válida (no bloqueada) en la dirección dada.
   * Si no hay posición válida, retorna la posición original.
   */
  const buscarSiguiente = useCallback(
    (posActual, deltaFila, deltaAsiento) => {
      const { filas, asientos } = configuracion;
      let { fila, asiento } = posActual;
      const maxIntentos = filas * asientos;

      for (let i = 0; i < maxIntentos; i++) {
        const nuevaFila    = Math.max(0, Math.min(filas    - 1, fila    + deltaFila));
        const nuevoAsiento = Math.max(0, Math.min(asientos - 1, asiento + deltaAsiento));

        // Si no se movió (llegó al borde), dejamos de buscar
        if (nuevaFila === fila && nuevoAsiento === asiento) break;

        fila    = nuevaFila;
        asiento = nuevoAsiento;

        const id = `${nivelActivo}-${etiquetaFila(fila)}-${asiento + 1}`;
        const rol = mapaRoles[id] || 'disponible';
        if (rol !== ROL_BLOQUEADO) return { fila, asiento };
      }

      return posActual; // Sin cambio si no encontró posición válida
    },
    [configuracion, mapaRoles, nivelActivo, etiquetaFila]
  );

  const manejarTecla = useCallback(
    (e) => {
      const ACCIONES = {
        ArrowUp:    () => buscarSiguiente(posicion, -1,  0),
        ArrowDown:  () => buscarSiguiente(posicion,  1,  0),
        ArrowLeft:  () => buscarSiguiente(posicion,  0, -1),
        ArrowRight: () => buscarSiguiente(posicion,  0,  1),
      };

      if (ACCIONES[e.key]) {
        e.preventDefault();
        const nuevaPos = ACCIONES[e.key]();
        setPosicion(nuevaPos);
        return;
      }

      if ((e.key === 'Enter' || e.key === ' ') && onSeleccionar) {
        e.preventDefault();
        const id = `${nivelActivo}-${etiquetaFila(posicion.fila)}-${posicion.asiento + 1}`;
        onSeleccionar(id);
      }
    },
    [posicion, buscarSiguiente, onSeleccionar, nivelActivo, etiquetaFila]
  );

  return { posicion, setPosicion, manejarTecla };
}
