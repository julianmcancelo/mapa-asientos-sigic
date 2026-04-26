/**
 * @fileoverview Fuente de verdad de roles para la librería @jcancelo/mapa-asientos-sigic.
 * Centraliza etiquetas, clases CSS, iconos y orden de visualización de cada rol.
 *
 * @version 2.0.0
 * @author Julian Cancelo
 */

import { Armchair, ShieldCheck, GraduationCap, AlertCircle, Lock } from 'lucide-react';

/**
 * @typedef {'disponible'|'egresado'|'autoridad'|'discapacitado'|'reservado'|'bloqueado'} Rol
 */

/**
 * Configuración completa de cada rol de asiento.
 * @type {Record<Rol, { label: string, clase: string, Icono: React.ComponentType, orden: number, descripcion: string }>}
 */
export const ROLES = {
  disponible: {
    label: 'Disponible',
    clase: 'sigic-seat--disponible',
    Icono: Armchair,
    orden: 0,
    descripcion: 'Asiento libre, disponible para asignar.',
  },
  egresado: {
    label: 'Egresado',
    clase: 'sigic-seat--egresado',
    Icono: GraduationCap,
    orden: 1,
    descripcion: 'Reservado para un graduando.',
  },
  autoridad: {
    label: 'Autoridad',
    clase: 'sigic-seat--autoridad',
    Icono: ShieldCheck,
    orden: 2,
    descripcion: 'Reservado para autoridades institucionales.',
  },
  discapacitado: {
    label: 'Accesibilidad',
    clase: 'sigic-seat--discapacitado',
    Icono: AlertCircle,
    orden: 3,
    descripcion: 'Asiento prioritario con condiciones de accesibilidad.',
  },
  reservado: {
    label: 'Reservado',
    clase: 'sigic-seat--reservado',
    Icono: Armchair,
    orden: 4,
    descripcion: 'Asiento apartado, no disponible.',
  },
  bloqueado: {
    label: 'Bloqueado',
    clase: 'sigic-seat--bloqueado',
    Icono: Lock,
    orden: 5,
    descripcion: 'Asiento inhabilitado estructuralmente.',
  },
};

/** Rol aplicado cuando no se encuentra ninguna asignación en mapaRoles. */
export const ROL_DEFAULT = 'disponible';

/** Identificador del rol inaccesible. */
export const ROL_BLOQUEADO = 'bloqueado';

/**
 * Genera la etiqueta de fila por defecto (A, B, C..., Z, AA, AB...).
 * @param {number} indice - Índice base 0 de la fila.
 * @returns {string} Etiqueta de fila.
 */
export function etiquetaFilaDefault(indice) {
  if (indice < 26) return String.fromCharCode(65 + indice);
  const primera = String.fromCharCode(65 + Math.floor(indice / 26) - 1);
  const segunda = String.fromCharCode(65 + (indice % 26));
  return `${primera}${segunda}`;
}
