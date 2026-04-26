import React, { useState, useCallback, useRef, useMemo } from 'react';
import { Eye } from 'lucide-react';
import { etiquetaFilaDefault, ROL_BLOQUEADO } from '../constants/roles.js';
import { useNavegacionTeclado } from '../hooks/useNavegacionTeclado.js';
import { SelectorNivel }     from './SelectorNivel.jsx';
import { Asiento }           from './Asiento.jsx';
import { BarraEstadisticas } from './BarraEstadisticas.jsx';
import { ControlesZoom }     from './ControlesZoom.jsx';

/**
 * Componente principal del mapa de asientos del anfiteatro.
 * @version 2.0.0 — @author Julian Cancelo
 *
 * @param {{ estructura, mapaRoles, seleccionados, alHacerClick,
 *   zoom, onZoomChange, nivelActivo, alCambiarNivel,
 *   modoVisualizacion, mostrarEstadisticas, mostrarControlesZoom,
 *   maxSeleccionados, datosPorAsiento, etiquetaFila, tema }} props
 */
export function MapaAsientos({
  estructura         = { baja: { filas: 5, asientos: 10 } },
  mapaRoles          = {},
  seleccionados      = [],
  alHacerClick,
  zoom:        zoomExterno,
  onZoomChange,
  nivelActivo: nivelExterno,
  alCambiarNivel,
  modoVisualizacion  = false,
  mostrarEstadisticas   = true,
  mostrarControlesZoom  = false,
  maxSeleccionados,
  datosPorAsiento    = {},
  etiquetaFila       = etiquetaFilaDefault,
  tema               = 'claro',
}) {
  const niveles = useMemo(() => Object.keys(estructura), [estructura]);

  const [nivelInterno, setNivelInterno] = useState(niveles[0] || 'baja');
  const nivelActual = nivelExterno !== undefined ? nivelExterno : nivelInterno;
  const manejarCambioNivel = useCallback((nivel) => {
    setNivelInterno(nivel);
    alCambiarNivel?.(nivel);
  }, [alCambiarNivel]);

  const [zoomInterno, setZoomInterno] = useState(zoomExterno ?? 1);
  const zoom = zoomExterno !== undefined ? zoomExterno : zoomInterno;
  const manejarZoom = useCallback((z) => {
    setZoomInterno(z);
    onZoomChange?.(z);
  }, [onZoomChange]);

  const configuracion = useMemo(
    () => estructura[nivelActual] || { filas: 0, asientos: 0 },
    [estructura, nivelActual]
  );

  const limiteAlcanzado = maxSeleccionados != null && seleccionados.length >= maxSeleccionados;

  const gridRef = useRef(null);
  const { posicion, manejarTecla } = useNavegacionTeclado({
    configuracion,
    mapaRoles,
    nivelActivo: nivelActual,
    onSeleccionar: modoVisualizacion ? undefined : alHacerClick,
    etiquetaFila,
  });

  const filas = useMemo(() => {
    return Array.from({ length: configuracion.filas }, (_, fi) => {
      const etiqueta = etiquetaFila(fi);
      const asientos = Array.from({ length: configuracion.asientos }, (_, ai) => {
        const numero         = ai + 1;
        const id             = `${nivelActual}-${etiqueta}-${numero}`;
        const rol            = mapaRoles[id] || 'disponible';
        const esSeleccionado = seleccionados.includes(id);
        const esFocusTeclado = posicion.fila === fi && posicion.asiento === ai;
        const deshabilitado  = limiteAlcanzado && !esSeleccionado && rol !== ROL_BLOQUEADO;

        return (
          <Asiento
            key={id}
            id={id}
            rol={rol}
            esSeleccionado={esSeleccionado}
            esFocusTeclado={esFocusTeclado}
            deshabilitado={deshabilitado}
            modoVisualizacion={modoVisualizacion}
            dato={datosPorAsiento[id]}
            onClick={alHacerClick}
          />
        );
      });

      return (
        <div key={etiqueta} className="sigic-fila" role="row">
          <span className="sigic-fila__etiqueta" aria-hidden="true">{etiqueta}</span>
          <div className="sigic-fila__asientos" role="rowgroup">{asientos}</div>
          <span className="sigic-fila__etiqueta" aria-hidden="true">{etiqueta}</span>
        </div>
      );
    });
  }, [configuracion, nivelActual, mapaRoles, seleccionados, posicion, limiteAlcanzado, modoVisualizacion, datosPorAsiento, alHacerClick, etiquetaFila]);

  return (
    <div
      className="sigic-wrapper"
      data-tema={tema}
      role="region"
      aria-label="Mapa interactivo de asientos del anfiteatro"
    >
      <div className="sigic-cabecera">
        <SelectorNivel niveles={niveles} nivelActivo={nivelActual} alCambiarNivel={manejarCambioNivel} />
        {mostrarControlesZoom && (
          <ControlesZoom zoom={zoom} onZoomChange={manejarZoom} min={0.4} max={2} />
        )}
      </div>

      {limiteAlcanzado && !modoVisualizacion && (
        <div className="sigic-aviso-limite" role="alert">
          Límite de {maxSeleccionados} asiento{maxSeleccionados !== 1 ? 's' : ''} alcanzado.
        </div>
      )}

      <div className="sigic-mapa">
        <div
          className="sigic-mapa__contenido"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="sigic-escenario" aria-hidden="true">
            <div className="sigic-escenario__barra">
              <span className="sigic-escenario__texto">Escenario</span>
            </div>
            <div className="sigic-escenario__sombra" />
          </div>

          <div
            ref={gridRef}
            className="sigic-grilla"
            role="grid"
            aria-label={`Grilla de asientos — Nivel ${nivelActual}`}
            aria-multiselectable="true"
            onKeyDown={!modoVisualizacion ? manejarTecla : undefined}
            tabIndex={modoVisualizacion ? undefined : 0}
          >
            {filas}
          </div>
        </div>
      </div>

      {mostrarEstadisticas && (
        <BarraEstadisticas
          mapaRoles={mapaRoles}
          configuracion={configuracion}
          nivelActivo={nivelActual}
          etiquetaFila={etiquetaFila}
        />
      )}

      {modoVisualizacion && (
        <div className="sigic-badge-lectura" role="status">
          <Eye size={12} aria-hidden="true" />
          Solo visualización
        </div>
      )}
    </div>
  );
}
