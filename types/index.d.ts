/**
 * TypeScript declarations for @jcancelo/mapa-asientos-sigic v2.0.0
 * Provides full IntelliSense support for TypeScript and JS projects with JSDoc.
 *
 * @author Julian Cancelo
 */

import * as React from 'react';

// ─── Tipos base ───────────────────────────────────────────────────────────────

/** Roles válidos para asignar a un asiento. */
export type Rol =
  | 'disponible'
  | 'egresado'
  | 'autoridad'
  | 'discapacitado'
  | 'reservado'
  | 'bloqueado';

/** Tema visual del componente. */
export type Tema = 'claro' | 'oscuro';

/** Orientación de la leyenda. */
export type Orientacion = 'horizontal' | 'vertical';

/** Definición de un nivel del anfiteatro. */
export interface NivelEstructura {
  /** Número de filas en este nivel. */
  filas: number;
  /** Número de asientos por fila en este nivel. */
  asientos: number;
}

/**
 * Estructura completa del anfiteatro.
 * Las claves son los nombres de los niveles (ej: 'baja', 'alta').
 */
export type Estructura = Record<string, NivelEstructura>;

/**
 * Mapa de roles asignados a cada asiento por su ID único.
 * El ID sigue el formato `{nivel}-{fila}-{numero}` (ej: `'baja-A-3'`).
 */
export type MapaRoles = Record<string, Rol>;

/**
 * Datos adicionales asociados a un asiento individual.
 * Se muestran en el tooltip al pasar el cursor.
 */
export interface DatoAsiento {
  /** Nombre de la persona asignada al asiento. */
  nombre?: string;
  /** Cualquier campo adicional. */
  [key: string]: unknown;
}

/**
 * Mapa de datos adicionales por ID de asiento.
 */
export type DatosPorAsiento = Record<string, DatoAsiento>;

// ─── Configuración de roles ───────────────────────────────────────────────────

/** Configuración de un rol de asiento. */
export interface RolConfig {
  label: string;
  clase: string;
  Icono: React.ComponentType<{ size?: number; strokeWidth?: number; 'aria-hidden'?: string }>;
  orden: number;
  descripcion: string;
}

/** Mapa de configuración de todos los roles. */
export declare const ROLES: Record<Rol, RolConfig>;

/**
 * Genera la etiqueta de fila por defecto (A, B, C..., AA, AB...).
 * @param indice - Índice base 0 de la fila.
 */
export declare function etiquetaFilaDefault(indice: number): string;

// ─── Props: MapaAsientos ──────────────────────────────────────────────────────

export interface MapaAsientosProps {
  /**
   * Definición de los niveles del anfiteatro con sus filas y asientos.
   * @default { baja: { filas: 5, asientos: 10 } }
   */
  estructura?: Estructura;

  /**
   * Asignación de roles a IDs de asiento específicos.
   * @default {}
   */
  mapaRoles?: MapaRoles;

  /**
   * Array de IDs de asientos actualmente seleccionados.
   * @default []
   */
  seleccionados?: string[];

  /**
   * Callback invocado al hacer click sobre un asiento interactivo.
   * @param id - ID del asiento clickeado (ej: `'baja-A-3'`).
   */
  alHacerClick?: (id: string) => void;

  /**
   * Factor de zoom inicial o controlado (0.4 – 2).
   * Si se pasa junto a `onZoomChange`, el zoom pasa a ser controlado externamente.
   */
  zoom?: number;

  /**
   * Callback para zoom controlado externamente.
   * @param zoom - Nuevo valor de zoom.
   */
  onZoomChange?: (zoom: number) => void;

  /**
   * Nivel activo controlado externamente.
   * Si no se pasa, el componente gestiona el nivel internamente.
   */
  nivelActivo?: string;

  /**
   * Callback invocado al cambiar de nivel.
   * @param nivel - Nombre del nuevo nivel activo.
   */
  alCambiarNivel?: (nivel: string) => void;

  /**
   * Si `true`, deshabilita toda interacción. Ideal para pantallas de monitoreo.
   * @default false
   */
  modoVisualizacion?: boolean;

  /**
   * Si `true`, muestra la barra de resumen de asientos por rol.
   * @default true
   */
  mostrarEstadisticas?: boolean;

  /**
   * Si `true`, muestra los botones de control de zoom.
   * @default false
   */
  mostrarControlesZoom?: boolean;

  /**
   * Límite máximo de asientos que pueden seleccionarse simultáneamente.
   * Cuando se alcanza, los asientos restantes se deshabilitan visualmente.
   */
  maxSeleccionados?: number;

  /**
   * Datos adicionales por ID de asiento para mostrar en tooltips.
   * @default {}
   */
  datosPorAsiento?: DatosPorAsiento;

  /**
   * Función personalizada para generar etiquetas de fila.
   * @default etiquetaFilaDefault (A, B, C..., AA, AB...)
   */
  etiquetaFila?: (indice: number) => string;

  /**
   * Tema visual del mapa.
   * @default 'claro'
   */
  tema?: Tema;
}

// ─── Props: LeyendaAsientos ───────────────────────────────────────────────────

export interface LeyendaAsientosProps {
  /**
   * Si se pasa, filtra la leyenda para mostrar solo estos roles.
   * Si no se pasa, muestra todos los roles definidos en ROLES.
   */
  rolesVisibles?: Rol[];

  /**
   * Layout de la leyenda.
   * @default 'horizontal'
   */
  orientacion?: Orientacion;

  /**
   * Si `true`, muestra una descripción detallada bajo cada etiqueta de rol.
   * @default false
   */
  mostrarDescripcion?: boolean;
}

// ─── Props: ControlesZoom ─────────────────────────────────────────────────────

export interface ControlesZoomProps {
  /** Valor actual del zoom (0.4 – 2). */
  zoom: number;
  /** Callback invocado al cambiar el zoom. */
  onZoomChange: (zoom: number) => void;
  /** Zoom mínimo permitido. @default 0.5 */
  min?: number;
  /** Zoom máximo permitido. @default 2 */
  max?: number;
  /** Zoom por defecto al presionar el botón de reset. @default 1 */
  default?: number;
}

// ─── Exports de Componentes ───────────────────────────────────────────────────

/** Mapa interactivo de asientos del anfiteatro. */
export declare function MapaAsientos(props: MapaAsientosProps): React.ReactElement | null;

/** Leyenda visual de roles, exportable de forma independiente. */
export declare function LeyendaAsientos(props: LeyendaAsientosProps): React.ReactElement | null;

/** Controles de zoom con botones +/- y reset. */
export declare function ControlesZoom(props: ControlesZoomProps): React.ReactElement | null;
