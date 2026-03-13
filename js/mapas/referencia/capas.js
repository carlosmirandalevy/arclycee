// ============================================================
// CAPAS.JS - Capas de tiles artísticos para el mapa de referencia
// ============================================================
// Define las diferentes capas visuales del mapa de referencia
// usando tiles de Stadia Maps (antes Stamen). Cada capa ofrece
// un estilo diferente: acuarela, terreno, oscuro, moderno, etc.
//
// El jugador puede cambiar entre capas para ver el mapa de
// diferentes formas — como filtros en una app de fotos.
//
// NOTA: Stadia Maps ofrece estos tiles gratis para uso educativo.
// ============================================================

/**
 * Configuraciones de capas de tiles disponibles.
 * Cada una tiene un nombre, URL de tiles y atribución.
 *
 * @returns {Object[]} Array de configuraciones de capas
 */
export function obtenerCapasDisponibles() {
  return [
    {
      id: 'acuarela',
      nombre: 'Acuarela',
      descripcion: 'Estilo artístico de acuarela — parece pintado a mano',
      url: 'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg',
      atribucion: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://stamen.com/">Stamen Design</a>',
      opacidad: 1,
      maxZoom: 16
    },
    {
      id: 'terreno',
      nombre: 'Terreno',
      descripcion: 'Muestra montañas, ríos y elevación del terreno',
      url: 'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.png',
      atribucion: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://stamen.com/">Stamen Design</a>',
      opacidad: 1,
      maxZoom: 18
    },
    {
      id: 'toner',
      nombre: 'Tóner',
      descripcion: 'Blanco y negro limpio — resalta fronteras y nombres',
      url: 'https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png',
      atribucion: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://stamen.com/">Stamen Design</a>',
      opacidad: 1,
      maxZoom: 18
    },
    {
      id: 'oscuro',
      nombre: 'Oscuro',
      descripcion: 'Tema oscuro elegante — ideal para ver marcadores brillantes',
      url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png',
      atribucion: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      opacidad: 1,
      maxZoom: 18
    },
    {
      id: 'suave',
      nombre: 'Suave',
      descripcion: 'Colores suaves y claros — fácil de leer',
      url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png',
      atribucion: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      opacidad: 1,
      maxZoom: 18
    },
    {
      id: 'osm',
      nombre: 'OSM Moderno',
      descripcion: 'OpenStreetMap con estilo moderno y limpio',
      url: 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.png',
      atribucion: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      opacidad: 1,
      maxZoom: 18
    }
  ];
}

/**
 * Crea una capa de tiles de Leaflet a partir de una configuración.
 *
 * @param {Object} config - Configuración de la capa
 * @returns {L.TileLayer} Capa de tiles lista para agregar al mapa
 */
export function crearCapaTiles(config) {
  return L.tileLayer(config.url, {
    attribution: config.atribucion,
    maxZoom: config.maxZoom || 18,
    opacity: config.opacidad || 1
  });
}

/**
 * Crea un control de capas para que el usuario cambie entre estilos.
 * Aparece como un selector en la esquina del mapa.
 *
 * @param {L.Map} mapa - Instancia del mapa de Leaflet
 * @returns {Object} Objeto con las capas creadas y el control
 */
export function configurarControlCapas(mapa) {
  const configuraciones = obtenerCapasDisponibles();
  const capasBase = {};
  let capaActiva = null;

  // Crear todas las capas de tiles
  for (const config of configuraciones) {
    const capa = crearCapaTiles(config);
    capasBase[config.nombre] = capa;

    // La primera capa (acuarela) es la activa por defecto
    if (!capaActiva) {
      capaActiva = capa;
      capa.addTo(mapa);
    }
  }

  // Agregar el control de capas al mapa
  const control = L.control.layers(capasBase, null, {
    position: 'topright',
    collapsed: true
  }).addTo(mapa);

  return { capasBase, control, capaActiva };
}
