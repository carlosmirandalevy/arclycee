// ============================================================
// CAPAS.JS - Capas de tiles artísticos para el mapa de referencia
// ============================================================
// Define las diferentes capas visuales del mapa de referencia
// usando tiles de Stadia Maps (antes Stamen) + proveedores gratuitos.
//
// Stadia Maps requiere una API key gratuita que se obtiene en:
// https://stadiamaps.com/ → Sign Up → crea un dominio permitido.
// La key se configura en STADIA_API_KEY abajo.
//
// También incluye capas de CartoDB/CARTO que NO necesitan API key
// como respaldo.
// ============================================================

// --- API Key de Stadia Maps ---
// Regístrate gratis en https://stadiamaps.com/ y pega tu key aquí.
// El plan gratuito permite 200,000 tiles/mes (más que suficiente).
const STADIA_API_KEY = '4df3a58b-73b6-4d51-88f9-cacb7bea238f';

/**
 * Configuraciones de capas de tiles disponibles.
 * Las capas de Stadia usan la API key; las de CARTO son libres.
 *
 * @param {Object} textosMapa - Traducciones de la sección mapaReal del idioma activo
 * @returns {Object[]} Array de configuraciones de capas
 */
export function obtenerCapasDisponibles(textosMapa) {
  const stadiaKey = STADIA_API_KEY ? `?api_key=${STADIA_API_KEY}` : '';

  return [
    {
      id: 'acuarela',
      nombre: textosMapa?.capas?.acuarela || 'Acuarela',
      descripcion: 'Estilo artístico de acuarela — parece pintado a mano',
      url: `https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg${stadiaKey}`,
      atribucion: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://stamen.com/">Stamen Design</a>',
      opacidad: 1,
      maxZoom: 16
    },
    {
      id: 'terreno',
      nombre: textosMapa?.capas?.terreno || 'Terreno',
      descripcion: 'Muestra montañas, ríos y elevación del terreno',
      url: `https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.png${stadiaKey}`,
      atribucion: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://stamen.com/">Stamen Design</a>',
      opacidad: 1,
      maxZoom: 18
    },
    {
      id: 'toner',
      nombre: textosMapa?.capas?.toner || 'Tóner',
      descripcion: 'Blanco y negro limpio — resalta fronteras y nombres',
      url: `https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png${stadiaKey}`,
      atribucion: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://stamen.com/">Stamen Design</a>',
      opacidad: 1,
      maxZoom: 18
    },
    {
      id: 'oscuro',
      nombre: textosMapa?.capas?.oscuro || 'Oscuro',
      descripcion: 'Tema oscuro elegante — ideal para ver marcadores brillantes',
      url: `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png${stadiaKey}`,
      atribucion: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      opacidad: 1,
      maxZoom: 18
    },
    {
      id: 'suave',
      nombre: textosMapa?.capas?.suave || 'Suave',
      descripcion: 'Colores suaves y claros — fácil de leer',
      url: `https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png${stadiaKey}`,
      atribucion: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      opacidad: 1,
      maxZoom: 18
    },
    {
      id: 'osm',
      nombre: textosMapa?.capas?.osm || 'OSM Moderno',
      descripcion: 'OpenStreetMap con estilo moderno y limpio',
      url: `https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.png${stadiaKey}`,
      atribucion: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      opacidad: 1,
      maxZoom: 18
    },
    // --- Capa de respaldo sin API key (siempre funciona) ---
    {
      id: 'voyager',
      nombre: textosMapa?.capas?.voyager || 'Voyager (CARTO)',
      descripcion: 'Mapa moderno gratuito — no necesita API key',
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      atribucion: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      opacidad: 1,
      maxZoom: 20
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
 * @param {Object} textosMapa - Traducciones de la sección mapaReal del idioma activo
 * @returns {Object} Objeto con las capas creadas y el control
 */
export function configurarControlCapas(mapa, textosMapa) {
  const configuraciones = obtenerCapasDisponibles(textosMapa);
  const capasBase = {};
  let capaActiva = null;

  // Crear todas las capas de tiles
  for (const config of configuraciones) {
    const capa = crearCapaTiles(config);
    capasBase[config.nombre] = capa;

    // La primera capa (Acuarela) es la activa por defecto
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

/**
 * Crea el control de capas de sitios arqueológicos (overlays).
 * Incluye la capa de sitios inexplorados condicionalmente,
 * solo si el jugador ha programado el robot explorador.
 *
 * @param {L.Map} mapa - Instancia del mapa de Leaflet
 * @param {Object} capas - Objeto con las capas { taino, colonial, naufragios, museos, sitiosArqueologicos? }
 * @param {Object} progreso - Progreso del jugador para verificar condiciones
 * @param {Object} textosMapa - Traducciones de la sección mapaReal del idioma activo
 * @returns {L.Control.Layers} Control de overlays creado
 */
export function configurarControlOverlays(mapa, capas, progreso, textosMapa) {
  // Nombres traducidos de los overlays
  const ov = textosMapa?.overlays;

  // Capas base de sitios siempre disponibles
  const capasSitios = {
    [ov?.tainos || '🗿 Sitios Taínos']: capas.taino,
    [ov?.coloniales || '🏰 Sitios Coloniales']: capas.colonial,
    [ov?.naufragios || '⚓ Naufragios']: capas.naufragios,
    [ov?.museos || '🏛 Museos']: capas.museos
  };

  // La capa de sitios inexplorados solo aparece si el robot fue programado
  if (progreso?.robotProgramado === true && capas.sitiosArqueologicos) {
    capasSitios[ov?.inexplorados || '🔍 Sitios Inexplorados'] = capas.sitiosArqueologicos;
  }

  const control = L.control.layers(null, capasSitios, {
    position: 'bottomright',
    collapsed: false
  }).addTo(mapa);

  return control;
}
