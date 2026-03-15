// ============================================================
// TRANSICIONES.JS - Transiciones entre mapa de juego y referencia
// ============================================================
// Maneja la animación de abrir/cerrar el mapa de referencia
// y la transición "click-to-travel" cuando el jugador elige
// viajar a una ubicación desde el mapa de Leaflet.
//
// La transición usa un efecto de zoom que centra la cámara
// en la ubicación elegida y luego cambia a la escena del juego.
// ============================================================

/**
 * Coordenadas centrales de la República Dominicana.
 * El mapa de referencia se abre centrado aquí.
 */
export const CENTRO_RD = { lat: 18.7357, lng: -70.1627 };
export const ZOOM_PAIS = 8;
export const ZOOM_DETALLE = 14;

/**
 * Anima la apertura del mapa de referencia.
 * El contenedor aparece con un fade-in suave.
 *
 * @param {HTMLElement} contenedor - El div del mapa Leaflet
 * @param {L.Map} mapa - Instancia del mapa
 * @param {Object} textosMapa - Traducciones de la sección mapaReal del idioma activo
 */
export function abrirMapaReferencia(contenedor, mapa, textosMapa) {
  contenedor.style.display = 'block';
  contenedor.style.opacity = '0';
  contenedor.style.transition = 'opacity 0.4s ease-in';

  // --- Añadir indicador de cierre si no existe ---
  if (!contenedor.querySelector('.mapa-cerrar-hint')) {
    const hint = document.createElement('div');
    hint.className = 'mapa-cerrar-hint';
    hint.textContent = textosMapa?.cerrarMapa || 'R / Esc — cerrar mapa';
    hint.style.cssText = `
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      background: rgba(0, 0, 0, 0.7);
      color: #FFD700;
      padding: 8px 20px;
      border-radius: 20px;
      font: bold 14px monospace;
      pointer-events: none;
      border: 1px solid rgba(255, 215, 0, 0.4);
    `;
    contenedor.appendChild(hint);
  }

  // Forzar reflow antes de animar
  contenedor.offsetHeight;

  contenedor.style.opacity = '1';

  // Leaflet necesita recalcular dimensiones cuando el contenedor cambia de tamaño
  if (mapa) {
    setTimeout(() => mapa.invalidateSize(), 50);
  }
}

/**
 * Anima el cierre del mapa de referencia.
 *
 * @param {HTMLElement} contenedor - El div del mapa Leaflet
 * @returns {Promise} Se resuelve cuando la animación termina
 */
export function cerrarMapaReferencia(contenedor) {
  return new Promise(resolve => {
    contenedor.style.transition = 'opacity 0.3s ease-out';
    contenedor.style.opacity = '0';

    setTimeout(() => {
      contenedor.style.display = 'none';
      resolve();
    }, 300);
  });
}

/**
 * Anima un "vuelo" del mapa de referencia a una ubicación
 * específica. Primero hace zoom out para ver todo el país,
 * luego zoom in a la ubicación seleccionada.
 *
 * @param {L.Map} mapa - Instancia del mapa
 * @param {number} lat - Latitud de destino
 * @param {number} lng - Longitud de destino
 * @param {Function} alLlegar - Callback cuando termina la animación
 */
export function volarAUbicacion(mapa, lat, lng, alLlegar) {
  // Primero: zoom out para ver la isla completa
  mapa.flyTo([CENTRO_RD.lat, CENTRO_RD.lng], ZOOM_PAIS, {
    duration: 0.8
  });

  // Después de 1 segundo: zoom in a la ubicación
  setTimeout(() => {
    mapa.flyTo([lat, lng], ZOOM_DETALLE, {
      duration: 1.2
    });

    // Esperar a que termine el vuelo
    setTimeout(() => {
      if (alLlegar) alLlegar();
    }, 1400);
  }, 1000);
}

/**
 * Dibuja una línea animada de viaje entre dos puntos en el mapa.
 * Usa CSS para animar una polilínea con efecto "serpiente".
 *
 * @param {L.Map} mapa - Instancia del mapa
 * @param {number} desdelat - Latitud de origen
 * @param {number} desdelng - Longitud de origen
 * @param {number} hastalat - Latitud de destino
 * @param {number} hastalng - Longitud de destino
 * @returns {L.Polyline} La línea creada (para limpiar después)
 */
export function dibujarRutaViaje(mapa, desdelat, desdelng, hastalat, hastalng) {
  const ruta = L.polyline(
    [[desdelat, desdelng], [hastalat, hastalng]],
    {
      color: '#FFD700',
      weight: 3,
      opacity: 0.8,
      dashArray: '10, 8',
      className: 'ruta-viaje-animada'
    }
  ).addTo(mapa);

  return ruta;
}
