/**
 * @fileoverview Tooltip accesible con detección inteligente de viewport.
 * Se posiciona usando `position: fixed` para escapar de cualquier contenedor con overflow.
 * Detecta si el tooltip se saldría de la pantalla y ajusta la posición horizontalmente.
 *
 * @version 2.0.0
 * @author Julian Cancelo
 */

import React, { useState, useRef, useCallback } from 'react';

const TOOLTIP_ANCHO_ESTIMADO = 180;
const TOOLTIP_ALTO            = 36;
const TOOLTIP_OFFSET          = 10; // px por encima del elemento

/**
 * @param {{ contenido: React.ReactNode, children: React.ReactNode }} props
 */
export function Tooltip({ contenido, children }) {
  const [estado, setEstado] = useState({ visible: false, top: 0, left: 0, alineacion: 'center' });
  const wrapRef = useRef(null);
  const timerRef = useRef(null);

  const calcularPosicion = useCallback(() => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const centro = rect.left + rect.width / 2;
    const top    = rect.top - TOOLTIP_ALTO - TOOLTIP_OFFSET;

    let left     = centro;
    let alineacion = 'center';

    // Detectar overflow derecho
    if (centro + TOOLTIP_ANCHO_ESTIMADO / 2 > window.innerWidth - 8) {
      left       = rect.right;
      alineacion = 'right';
    }
    // Detectar overflow izquierdo
    else if (centro - TOOLTIP_ANCHO_ESTIMADO / 2 < 8) {
      left       = rect.left;
      alineacion = 'left';
    }

    setEstado({ visible: true, top, left, alineacion });
  }, []);

  const mostrar = useCallback(() => {
    clearTimeout(timerRef.current);
    calcularPosicion();
  }, [calcularPosicion]);

  const ocultar = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setEstado((prev) => ({ ...prev, visible: false }));
    }, 60);
  }, []);

  const transformMap = {
    center: 'translateX(-50%)',
    right:  'translateX(-100%)',
    left:   'translateX(0)',
  };

  return (
    <div
      ref={wrapRef}
      className="sigic-tooltip-anchor"
      onMouseEnter={mostrar}
      onMouseLeave={ocultar}
      onFocus={mostrar}
      onBlur={ocultar}
    >
      {children}
      {estado.visible && contenido && (
        <div
          role="tooltip"
          className="sigic-tooltip"
          style={{
            position:  'fixed',
            top:       estado.top,
            left:      estado.left,
            transform: transformMap[estado.alineacion],
            pointerEvents: 'none',
            zIndex: 99999,
          }}
        >
          {contenido}
          <div className="sigic-tooltip__flecha" />
        </div>
      )}
    </div>
  );
}
