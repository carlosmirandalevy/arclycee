// ============================================================
// MAPA-LEAFLET.JS - Mapa de referencia interactivo
// ============================================================
// Este es el mapa de referencia del juego: un mapa real de la
// República Dominicana usando LeafletJS. Muestra las ubicaciones
// reales de los niveles del juego con marcadores interactivos.
//
// Características:
// - 6 estilos de mapa artísticos (acuarela, terreno, oscuro...)
// - Marcadores con colores según estado (completado/bloqueado)
// - Click para viajar a una ubicación desde el mapa
// - Sitios arqueológicos reales adicionales (taínos, coloniales)
// - Se abre/cierra con la tecla R desde el mapa del mundo
//
// Este mapa complementa el mapa de tiles del juego: mientras
// el mapa de tiles es para jugar, este es para aprender sobre
// la geografía real de los lugares del juego.
// ============================================================

import { configurarControlCapas, configurarControlOverlays } from './referencia/capas.js';
import { crearMarcadoresJuego, actualizarMarcadores, obtenerCoordenadas, crearMarcadoresSitiosArqueologicos } from './referencia/marcadores.js';
import {
  CENTRO_RD,
  ZOOM_PAIS,
  abrirMapaReferencia,
  cerrarMapaReferencia,
  volarAUbicacion
} from './referencia/transiciones.js';

export class MapaLeaflet {
  constructor() {
    // Instancia del mapa de Leaflet
    this.mapa = null;

    // Contenedor HTML
    this.contenedor = null;

    // Si el mapa está visible
    this.visible = false;

    // Marcadores del juego (con estado)
    this.marcadoresJuego = [];

    // Marcadores adicionales (sitios arqueológicos)
    this.marcadoresExtra = [];

    // Control de capas artísticas
    this.controlCapas = null;

    // Capas de sitios arqueológicos y naufragios (para alternar)
    this.capas = {
      taino: null,
      colonial: null,
      naufragios: null,
      museos: null,
      sitiosArqueologicos: null,
      potencialArqueologico: null
    };

    // Callback para cuando el jugador viaja a un nodo
    this._alViajar = null;

    // Referencia al juego
    this._juego = null;
  }

  /** Obtiene los textos del mapa real en el idioma actual */
  _textosMapa() {
    return this._juego?.idiomas?.traducciones?.[this._juego.idiomas.idiomaActual]?.mapaReal;
  }

  /**
   * Inicializa el mapa de referencia.
   *
   * @param {HTMLElement} elementoDOM - El div donde crear el mapa
   * @param {Object} juego - Referencia al juego (para progreso y escenas)
   */
  iniciar(elementoDOM, juego) {
    this.contenedor = elementoDOM;
    this._juego = juego;

    // Crear el mapa centrado en República Dominicana
    this.mapa = L.map(elementoDOM, {
      zoomControl: true,
      attributionControl: true
    }).setView([CENTRO_RD.lat, CENTRO_RD.lng], ZOOM_PAIS);

    // --- Configurar capas de tiles artísticos ---
    // La primera capa (acuarela) se activa por defecto
    this.controlCapas = configurarControlCapas(this.mapa, this._textosMapa());

    // --- Crear capas para sitios y naufragios ---
    this.capas.taino = L.layerGroup().addTo(this.mapa);
    this.capas.colonial = L.layerGroup().addTo(this.mapa);
    this.capas.naufragios = L.layerGroup().addTo(this.mapa);
    this.capas.museos = L.layerGroup().addTo(this.mapa);

    // --- Agregar marcadores del juego ---
    const progreso = juego?.progreso || { nodosCompletados: [], nodosDesbloqueados: [0] };
    this.marcadoresJuego = crearMarcadoresJuego(
      this.mapa,
      progreso,
      (idNodo) => this._viajarANodo(idNodo),
      this._textosMapa()
    );

    // --- Agregar sitios arqueológicos reales y naufragios ---
    this._agregarSitiosTainos();
    this._agregarSitiosColoniales();
    this._agregarNaufragios();
    this._agregarMuseos();

    // --- Naufragios descubiertos por el robot submarino del LFSD ---
    if (progreso?.naufragiosRobotDescubiertos === true) {
      this._agregarNaufragiosRobot();
    }

    // --- Capa de sitios inexplorados (solo si el robot fue programado) ---
    if (progreso?.robotProgramado === true) {
      this.capas.sitiosArqueologicos = L.layerGroup().addTo(this.mapa);
      crearMarcadoresSitiosArqueologicos(this.capas.sitiosArqueologicos, this._textosMapa());
    }

    // --- Capa de potencial arqueológico (siempre visible) ---
    this.capas.potencialArqueologico = L.layerGroup().addTo(this.mapa);
    this._agregarPotencialArqueologico();

    // --- Control para alternar capas de sitios ---
    // Usa configurarControlOverlays que incluye sitios inexplorados condicionalmente
    configurarControlOverlays(this.mapa, this.capas, progreso, this._textosMapa());

    // Empezar oculto
    this.contenedor.style.display = 'none';
    this.visible = false;
  }

  /** Muestra el mapa de referencia con animación */
  mostrar() {
    if (!this.contenedor || !this.mapa) return;

    // Actualizar marcadores con progreso actual
    if (this._juego?.progreso) {
      actualizarMarcadores(this.marcadoresJuego, this._juego.progreso);
    }

    abrirMapaReferencia(this.contenedor, this.mapa, this._textosMapa());
    this.visible = true;
  }

  /** Oculta el mapa de referencia con animación */
  async ocultar() {
    if (!this.contenedor) return;
    await cerrarMapaReferencia(this.contenedor);
    this.visible = false;
  }

  /** Alterna entre mostrar y ocultar */
  alternar() {
    if (this.visible) {
      this.ocultar();
    } else {
      this.mostrar();
    }
  }

  /**
   * Viajar a un nodo desde el mapa de referencia.
   * Anima un vuelo a la ubicación y luego cambia de escena.
   */
  _viajarANodo(idNodo) {
    const coords = obtenerCoordenadas(idNodo);
    if (!coords) return;

    // Animar el vuelo
    volarAUbicacion(this.mapa, coords.lat, coords.lng, () => {
      // Cerrar el mapa y cambiar a la escena del nodo
      this.ocultar().then(() => {
        if (this._juego) {
          // Buscar la escena correspondiente al nodo
          const escenas = [
            'cuevasPomier', 'asentamientoTaino1', 'asentamientoTaino2',
            'mundoColonial', 'zonaColonial', 'mundoAcuatico',
            'mundoJuridico', 'mundoLaboratorio'
          ];
          if (escenas[idNodo] && this._juego.cambiarEscena) {
            this._juego.cambiarEscena(escenas[idNodo]);
          }
        }
      });
    });
  }

  // --- Sitios arqueológicos taínos / precolombinos (reales) ---
  // Coordenadas verificadas — cubre toda La Hispaniola (RD + Haití)
  _agregarSitiosTainos() {
    const sitios = [
      // --- República Dominicana ---
      { lat: 18.4673, lng: -70.1343, clave: 'cuevasPomierBorbon', nombre: 'Cuevas del Pomier (Borbón)', desc: 'Sistema de 55 cuevas con más de 6,000 pictografías y petroglifos taínos e igneris.' },
      { lat: 18.4105, lng: -69.5525, clave: 'cuevaMaravillas', nombre: 'Cueva de las Maravillas', desc: 'Más de 500 petroglifos y pictografías taínos, incluyendo escenas de rituales funerarios.' },
      { lat: 19.0439, lng: -69.5929, clave: 'losHaitises', nombre: 'Parque Nacional Los Haitises', desc: 'Cuevas accesibles solo por mar con más de 1,000 pictografías y petroglifos taínos.' },
      { lat: 18.9250, lng: -69.3650, clave: 'cuevaFunFun', nombre: 'Cueva Fun Fun', desc: 'Enorme sistema de cuevas con río subterráneo y arte rupestre indígena en Hato Mayor.' },
      { lat: 18.3530, lng: -68.6170, clave: 'cuevaBerna', nombre: 'Cueva de Berna', desc: 'Unos 300 petroglifos taínos tallados en roca en el Parque Nacional Cotubanamá.' },
      { lat: 18.3640, lng: -68.8350, clave: 'cuevaPadreNuestro', nombre: 'Cueva Padre Nuestro', desc: 'Cenotes con piscinas de agua dulce y petroglifos en el Parque Nacional Cotubanamá.' },
      { lat: 18.5600, lng: -71.6878, clave: 'lasCaritas', nombre: 'Las Caritas de los Indios', desc: 'Petroglifos pre-taínos tallados en roca coralina frente al Lago Enriquillo.' },
      { lat: 19.0580, lng: -70.1520, clave: 'guacarasCotui', nombre: 'Guácaras de Cotuí', desc: 'Cavernas con petroglifos taínos en Sánchez Ramírez (Hoyo de Sanabe, Guácara del Lago).' },
      { lat: 19.5430, lng: -71.5530, clave: 'chacuey', nombre: 'Petroglifos de Chacuey', desc: 'Centenares de petroglifos a orillas del río Chacuey en Dajabón, cerca de la frontera.' },
      { lat: 18.4320, lng: -69.7380, clave: 'laCaleta', nombre: 'Parque Submarino La Caleta', desc: 'Cementerio precolombino y museo, parque submarino con esculturas de dioses taínos.' },
      { lat: 18.4480, lng: -69.6050, clave: 'juanDolio', nombre: 'Plaza Ceremonial de Juan Dolio', desc: 'Sitio arqueológico taíno costero con restos de plaza ceremonial y batey.' },
      // --- Haití ---
      { lat: 19.6914, lng: -72.0250, clave: 'enBasSaline', nombre: 'En Bas Saline', desc: 'Uno de los mayores asentamientos taínos (95,000 m²), posible pueblo del cacique Guacanagarí.' },
      { lat: 19.6660, lng: -71.8390, clave: 'fortLiberte', nombre: 'Fort-Liberté (Bayajá)', desc: '164 vestigios de asentamientos taínos documentados y ruinas coloniales en la bahía.' },
      { lat: 18.1050, lng: -73.9520, clave: 'grotteMarieJeanne', nombre: 'Grotte Marie-Jeanne', desc: 'Cueva natural más larga de Haití (5.3 km) con vestigios precolombinos cerca de Port-à-Piment.' },
      { lat: 19.7570, lng: -72.1960, clave: 'museoTainoCapHaitien', nombre: 'Museo Taíno de Cap-Haïtien', desc: 'Colección de brazaletes, cemíes y artefactos ceremoniales taínos del norte de Haití.' },
      { lat: 19.7220, lng: -72.0680, clave: 'petroSainteSuzanne', nombre: 'Petroglifos de Sainte-Suzanne', desc: 'Garganta con petroglifos taínos notables en el norte de Haití.' }
    ];

    // Obtener traducciones del idioma actual (con fallback a strings en español)
    const t = this._textosMapa()?.sitiosTainos;

    for (const s of sitios) {
      const nombre = t?.[s.clave] || s.nombre;
      const desc = t?.['desc' + s.clave[0].toUpperCase() + s.clave.slice(1)] || s.desc;
      const marcador = L.marker([s.lat, s.lng], {
        icon: L.divIcon({
          className: 'marcador-sitio',
          html: '<span style="font-size: 28px;">🗿</span>',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      });
      marcador.bindPopup(`<strong>🗿 ${nombre}</strong><br><small>${desc}</small>`);
      marcador.addTo(this.capas.taino);
    }
  }

  // --- Sitios coloniales (reales) ---
  // Cubre toda La Hispaniola (RD + Haití)
  _agregarSitiosColoniales() {
    const sitios = [
      // --- República Dominicana ---
      { lat: 18.4735, lng: -69.8838, clave: 'zonaColonialSD', nombre: 'Zona Colonial de Santo Domingo', desc: 'Primera ciudad colonial permanente del Nuevo Mundo. Patrimonio UNESCO desde 1990.' },
      { lat: 19.8193, lng: -71.0832, clave: 'laIsabela', nombre: 'La Isabela', desc: 'Primer asentamiento europeo planificado en América, fundado por Colón en 1493.' },
      { lat: 18.4738, lng: -69.8817, clave: 'alcazarColon', nombre: 'Alcázar de Colón', desc: 'Palacio virreinal de Diego Colón (1510), hoy museo con mobiliario y arte colonial.' },
      { lat: 18.4725, lng: -69.8820, clave: 'sanFrancisco', nombre: 'Ruinas del Monasterio de San Francisco', desc: 'Primer monasterio construido en América (1508), destruido por terremotos.' },
      { lat: 19.2350, lng: -70.4950, clave: 'vegaVieja', nombre: 'La Vega Vieja', desc: 'Ruinas de la primera ciudad minera de oro en América, destruida por terremoto en 1562.' },
      { lat: 19.7960, lng: -70.6960, clave: 'sanFelipe', nombre: 'Fortaleza San Felipe', desc: 'Fortaleza del siglo XVI en Puerto Plata para defender la costa norte de corsarios.' },
      // --- Haití ---
      { lat: 19.7577, lng: -72.2000, clave: 'capHaitien', nombre: 'Cap-Haïtien (Centro Histórico)', desc: 'Antigua capital de Saint-Domingue, "París de las Antillas", con arquitectura colonial francesa.' },
      { lat: 18.2341, lng: -72.5350, clave: 'jacmel', nombre: 'Jacmel (Centro Histórico)', desc: 'Ciudad colonial con arquitectura de hierro forjado del siglo XIX, patrimonio cultural haitiano.' }
    ];

    // Obtener traducciones del idioma actual (con fallback a strings en español)
    const t = this._textosMapa()?.sitiosColoniales;

    for (const s of sitios) {
      const nombre = t?.[s.clave] || s.nombre;
      const desc = t?.['desc' + s.clave[0].toUpperCase() + s.clave.slice(1)] || s.desc;
      const marcador = L.marker([s.lat, s.lng], {
        icon: L.divIcon({
          className: 'marcador-sitio',
          html: '<span style="font-size: 28px;">🏰</span>',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      });
      marcador.bindPopup(`<strong>🏰 ${nombre}</strong><br><small>${desc}</small>`);
      marcador.addTo(this.capas.colonial);
    }
  }

  // --- Naufragios históricos alrededor de La Hispaniola ---
  _agregarNaufragios() {
    const naufragios = [
      { lat: 19.69, lng: -72.01, clave: 'santaMaria1492', nombre: 'Santa María (1492)', desc: 'Nave capitana de Colón, encalló la noche de Navidad cerca de Cap-Haïtien. Sus maderas construyeron el fuerte La Navidad.' },
      { lat: 19.63, lng: -70.07, clave: 'sanMiguel1551', nombre: 'San Miguel (1551)', desc: 'Galeón español cargado de tesoros, naufragó en la costa norte cerca de Río San Juan.' },
      { lat: 20.54, lng: -70.63, clave: 'concepcion1641', nombre: 'Ntra. Sra. de la Concepción (1641)', desc: 'Galeón de la flota de plata en el Banco de la Plata. Burt Webber recuperó 25 toneladas de plata en 1978.' },
      { lat: 19.888, lng: -71.665, clave: 'monteCristi1660', nombre: 'Monte Cristi Pipe Wreck (1660)', desc: 'Barco mercante holandés con más de 10,000 pipas de arcilla, la mayor colección de artefactos de tabaco submarinos.' },
      { lat: 18.36, lng: -69.00, clave: 'quedagh1699', nombre: 'Quedagh Merchant (1699)', desc: 'Barco armenio capturado por el pirata Capitán Kidd, abandonado cerca de Isla Catalina. Hoy museo submarino.' },
      { lat: 19.20, lng: -69.35, clave: 'guadalupe1724', nombre: 'Ntra. Sra. de Guadalupe (1724)', desc: 'Galeón de azogue español hundido en Bahía de Samaná durante un huracán con 400 toneladas de mercurio.' },
      { lat: 19.18, lng: -69.33, clave: 'tolosa1724', nombre: 'Conde de Tolosa (1724)', desc: 'Compañero de la Guadalupe en la Flota de Azogues, naufragó en Samaná con más de 550 víctimas.' },
      { lat: 19.16, lng: -69.32, clave: 'scipion1782', nombre: 'Le Scipion (1782)', desc: 'Navío francés de 74 cañones, veterano de la Batalla de Chesapeake, chocó contra roca en Bahía de Samaná.' },
      { lat: 20.48, lng: -70.55, clave: 'goldenFleece1827', nombre: 'Golden Fleece (1827)', desc: 'Barco mercante estadounidense perdido en el Banco de la Plata, arrecifes traicioneros al norte de la isla.' },
      { lat: 18.725, lng: -68.452, clave: 'astron1978', nombre: 'Astron (1978)', desc: 'Carguero soviético de 127 m encallado frente a Playa Bávaro, Punta Cana. Popular sitio de buceo.' },
      { lat: 18.43, lng: -69.63, clave: 'hickory1944', nombre: 'Hickory (1944)', desc: 'Barco de la Armada de EE.UU. hundido cerca de la costa sureste durante la Segunda Guerra Mundial.' },
      { lat: 18.45, lng: -69.85, clave: 'zonaSantoDomingo', nombre: 'Zona de naufragios de Santo Domingo', desc: 'Área con múltiples naufragios coloniales al sur de Santo Domingo. Arqueología submarina activa.' }
    ];

    // Obtener traducciones del idioma actual (con fallback a strings en español)
    const t = this._textosMapa()?.naufragios;

    for (const s of naufragios) {
      const nombre = t?.[s.clave] || s.nombre;
      const desc = t?.['desc' + s.clave[0].toUpperCase() + s.clave.slice(1)] || s.desc;
      const marcador = L.marker([s.lat, s.lng], {
        icon: L.divIcon({
          className: 'marcador-sitio',
          html: '<span style="font-size: 28px;">⚓</span>',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      });
      marcador.bindPopup(`<strong>⚓ ${nombre}</strong><br><small>${desc}</small>`);
      marcador.addTo(this.capas.naufragios);
    }
  }

  // --- Museos históricos y arqueológicos de La Hispaniola ---
  _agregarMuseos() {
    const museos = [
      // --- Santo Domingo ---
      { lat: 18.4723, lng: -69.9080, clave: 'hombreDominicano', nombre: 'Museo del Hombre Dominicano', desc: 'Principal museo antropológico del Caribe con la mayor colección de artefactos taínos.' },
      { lat: 18.4776, lng: -69.8826, clave: 'atarazanasReales', nombre: 'Museo de las Atarazanas Reales', desc: 'Antiguo arsenal naval colonial con arqueología subacuática y restos de naufragios del s. XVI.' },
      { lat: 18.4771, lng: -69.8832, clave: 'alcazarColonMuseo', nombre: 'Museo Alcázar de Colón', desc: 'Palacio virreinal de Diego Colón (1510), el edificio colonial más importante del Nuevo Mundo.' },
      { lat: 18.4758, lng: -69.8832, clave: 'casasReales', nombre: 'Museo de las Casas Reales', desc: 'Antigua sede de la Real Audiencia con historia colonial de La Española desde 1492.' },
      { lat: 18.4730, lng: -69.8843, clave: 'catedralPrimada', nombre: 'Museo de la Catedral Primada', desc: 'Tesoro de arte sacro colonial dentro de la primera catedral del Nuevo Mundo (1512-1540).' },
      { lat: 18.4704, lng: -69.9087, clave: 'historiaNatural', nombre: 'Museo Nacional de Historia Natural', desc: 'Biodiversidad y geología de La Española con ecosistemas caribeños y especies endémicas.' },
      { lat: 18.4735, lng: -69.8860, clave: 'resistencia', nombre: 'Museo de la Resistencia Dominicana', desc: 'Memorial sobre la lucha contra la dictadura de Trujillo (1930-1961).' },
      { lat: 18.4819, lng: -69.9253, clave: 'bellapart', nombre: 'Museo Bellapart', desc: 'Colección privada de arte dominicano de los siglos XIX y XX.' },
      { lat: 18.4700, lng: -69.9090, clave: 'arteModerno', nombre: 'Museo de Arte Moderno', desc: 'Principal museo de arte contemporáneo dominicano en la Plaza de la Cultura.' },
      { lat: 18.4762, lng: -69.8822, clave: 'trampolin', nombre: 'Museo Infantil Trampolín', desc: 'Museo interactivo para niños en la Casa de Rodrigo de Bastidas, Calle Las Damas.' },
      { lat: 18.4732, lng: -69.8848, clave: 'mundoAmbar', nombre: 'Museo Mundo del Ámbar', desc: 'Ámbar dominicano con insectos fosilizados de millones de años, en la Zona Colonial.' },
      { lat: 18.4725, lng: -69.8834, clave: 'larimar', nombre: 'Museo de Larimar', desc: 'Piedra semipreciosa azul exclusiva de RD, con exhibiciones sobre geología y extracción.' },
      { lat: 18.4745, lng: -69.8810, clave: 'fortalezaOzama', nombre: 'Museo Fortaleza Ozama', desc: 'Fortaleza militar más antigua de América (1502) con la Torre del Homenaje.' },
      { lat: 18.4793, lng: -69.8687, clave: 'faroColon', nombre: 'Faro a Colón', desc: 'Monumental museo-mausoleo en forma de cruz con restos atribuidos a Cristóbal Colón.' },
      // --- Santiago ---
      { lat: 19.4633, lng: -70.6706, clave: 'centroLeon', nombre: 'Centro León', desc: 'Centro cultural con colecciones de arte, historia y antropología dominicana.' },
      { lat: 19.4612, lng: -70.6945, clave: 'tabacoAurora', nombre: 'Museo del Tabaco La Aurora', desc: 'Historia del tabaco dominicano dentro de la fábrica La Aurora (fundada 1903).' },
      // --- Puerto Plata ---
      { lat: 19.7965, lng: -70.6922, clave: 'ambarPP', nombre: 'Museo del Ámbar (Puerto Plata)', desc: 'Ámbar y ámbar azul dominicano en la Villa Bentz con insectos prehistóricos.' },
      { lat: 19.8041, lng: -70.6959, clave: 'fortalezaSanFelipe', nombre: 'Museo Fortaleza San Felipe', desc: 'Fortaleza española del s. XVI convertida en museo militar e histórico.' },
      { lat: 19.8888, lng: -71.0796, clave: 'arqueologicoIsabela', nombre: 'Museo Arqueológico La Isabela', desc: 'Sitio del primer asentamiento europeo permanente en América (1493).' },
      // --- Otras ciudades RD ---
      { lat: 18.4188, lng: -68.8872, clave: 'altosChavon', nombre: 'Museo Arqueológico Altos de Chavón', desc: 'Más de 3,000 piezas precolombinas taínas junto al río Chavón en La Romana.' },
      { lat: 19.2058, lng: -69.3326, clave: 'ballenasSamana', nombre: 'Museo de las Ballenas (Samaná)', desc: 'Historia natural marina dedicada a las ballenas jorobadas que migran a la bahía.' },
      { lat: 19.2936, lng: -70.5442, clave: 'vegaViejaMuseo', nombre: 'Parque Museo La Vega Vieja', desc: 'Ruinas de la ciudad fundada por Colón (1494) con artefactos taínos y coloniales.' },
      { lat: 19.3812, lng: -70.4168, clave: 'hermanasMirabal', nombre: 'Casa Museo Hermanas Mirabal', desc: 'Casa-museo de las heroínas de la resistencia contra Trujillo en Salcedo.' },
      { lat: 18.6150, lng: -68.7078, clave: 'altagracia', nombre: 'Museo Basílica de la Altagracia', desc: 'Arte sacro junto a la basílica patronal de RD en Higüey.' },
      { lat: 18.4537, lng: -69.3083, clave: 'sanPedroMacoris', nombre: 'Museo de San Pedro de Macorís', desc: 'Historia azucarera y la inmigración de los cocolos antillanos angloparlantes.' },
      // --- Haití ---
      { lat: 18.5416, lng: -72.3362, clave: 'mupanah', nombre: 'MUPANAH (Panthéon National Haïtien)', desc: 'Museo nacional haitiano con héroes de la independencia y el ancla de la Santa María.' },
      { lat: 18.5452, lng: -72.3390, clave: 'arteHaitiano', nombre: "Musée d'Art Haïtien", desc: 'Mayor colección de arte haitiano con obras maestras del movimiento naíf.' },
      { lat: 18.5445, lng: -72.3375, clave: 'centreArt', nombre: "Centre d'Art (Port-au-Prince)", desc: 'Institución fundada en 1944 que impulsó el movimiento artístico haitiano.' },
      { lat: 18.5472, lng: -72.3363, clave: 'saintMartial', nombre: 'Musée Saint-Martial', desc: 'Histórico colegio-seminario (1864) con colección de historia natural y cultural.' },
      { lat: 18.7453, lng: -72.6273, clave: 'ogierFombrun', nombre: 'Musée Ogier-Fombrun', desc: 'Plantación azucarera del s. XVIII en Montrouis con artefactos taínos y de la Revolución Haitiana.' }
    ];

    // Obtener traducciones del idioma actual (con fallback a strings en español)
    const t = this._textosMapa()?.museos;

    for (const s of museos) {
      const nombre = t?.[s.clave] || s.nombre;
      const desc = t?.['desc' + s.clave[0].toUpperCase() + s.clave.slice(1)] || s.desc;
      const marcador = L.marker([s.lat, s.lng], {
        icon: L.divIcon({
          className: 'marcador-sitio',
          html: '<span style="font-size: 28px;">🏛</span>',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      });
      marcador.bindPopup(`<strong>🏛 ${nombre}</strong><br><small>${desc}</small>`);
      marcador.addTo(this.capas.museos);
    }
  }

  // --- Naufragios descubiertos por el robot submarino del LFSD ---
  // 4 naufragios reales poco conocidos que el robot explorador encuentra
  _agregarNaufragiosRobot() {
    const naufragios = [
      {
        lat: 19.95, lng: -70.72,
        clave: 'luperon',
        nombre: 'Pecio de Luperón (s. XVII)',
        desc: 'Restos de un barco mercante español encontrado por el robot en la bahía de Luperón. Cargamento de cerámica y herramientas.'
      },
      {
        lat: 18.21, lng: -68.50,
        clave: 'islaSaona',
        nombre: 'Pecio de Isla Saona (s. XVIII)',
        desc: 'Barco de esclavos hundido al sur de Isla Saona. El robot detectó anclas y cadenas en el fondo arenoso.'
      },
      {
        lat: 19.85, lng: -70.98,
        clave: 'galeonPP',
        nombre: 'Galeón de Puerto Plata (1563)',
        desc: 'Galeón de la flota de Nueva España perdido durante un huracán. El robot encontró cañones y lingotes.'
      },
      {
        lat: 18.60, lng: -69.90,
        clave: 'sanAndres',
        nombre: 'Vapor costero San Andrés (1891)',
        desc: 'Vapor dominicano hundido cerca de Boca Chica. El robot escaneó calderas y estructura metálica intacta.'
      }
    ];

    // Obtener traducciones del idioma actual (con fallback a strings en español)
    const t = this._textosMapa()?.naufragiosRobot;
    const textoDescubierto = this._textosMapa()?.descubiertoRobot || '📡 Descubierto por Robot LFSD';

    for (const s of naufragios) {
      const nombre = t?.[s.clave] || s.nombre;
      const desc = t?.['desc' + s.clave[0].toUpperCase() + s.clave.slice(1)] || s.desc;
      const marcador = L.marker([s.lat, s.lng], {
        icon: L.divIcon({
          className: 'marcador-sitio',
          html: `<div style="
            background: #1E90FF;
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #44FF44;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          ">
            <span style="
              transform: rotate(45deg);
              font-size: 14px;
            ">🤖</span>
          </div>`,
          iconSize: [32, 42],
          iconAnchor: [16, 42],
          popupAnchor: [0, -42]
        })
      });
      marcador.bindPopup(`
        <div style="font-family: monospace; min-width: 180px;">
          <strong>🤖 ${nombre}</strong>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 6px 0;">
          <p style="margin: 4px 0; font-size: 12px;">${desc}</p>
          <small style="color: #44AA44;">${textoDescubierto}</small>
        </div>
      `);
      marcador.addTo(this.capas.naufragios);
    }
  }

  /** Centrar el mapa en una ubicación con animación */
  centrarEn(lat, lng, zoom = 14) {
    if (this.mapa) {
      this.mapa.flyTo([lat, lng], zoom);
    }
  }

  // --- Potencial Arqueológico: sitios inexplorados o subexplorados ---
  // 15 localizaciones reales con potencial arqueológico en la Hispaniola
  _agregarPotencialArqueologico() {
    const sitios = [
      { lat: 18.36, lng: -68.62, clave: 'elCabo', nombre: 'El Cabo y alrededores', desc: 'Asentamientos taínos costeros no excavados (Higüey, RD). Leiden University excavó la aldea principal pero los alrededores apenas se han explorado.' },
      { lat: 18.28, lng: -68.80, clave: 'manantialAleta', nombre: 'Manantial de la Aleta', desc: 'Cenote sagrado taíno de 73m de profundidad con ofrendas de madera. Solo se ha investigado "la punta del iceberg".' },
      { lat: 19.85, lng: -71.65, clave: 'monteCristi', nombre: 'Plataforma costera de Montecristi', desc: 'Más de 400 naufragios coloniales reportados, menos de 50 localizados. Zona prioritaria de patrimonio subacuático UNESCO.' },
      { lat: 19.17, lng: -69.33, clave: 'samanaBay', nombre: 'Bahía de Samaná', desc: 'Además de los galeones conocidos, las aguas protegidas contienen naufragios no descubiertos. El sitio arcaico El Pozito (hallazgo de Sapienza) indica ocupación pre-colombina costera.' },
      { lat: 19.68, lng: -72.10, clave: 'fortLiberte', nombre: 'Fort-Liberté y En Bas Saline', desc: '~300 sitios arqueológicos registrados en la región, en riesgo de saqueo. Candidato más probable para La Navidad (fuerte de Colón, 1492).' },
      { lat: 18.45, lng: -70.10, clave: 'pomierInexplorado', nombre: 'Cuevas del Pomier (secciones inexploradas)', desc: '55 cuevas, solo 5 abiertas al público. Las ~50 restantes contienen arte rupestre no documentado. Más de 6,000 pinturas conocidas.' },
      { lat: 17.83, lng: -71.53, clave: 'jaraguaCuevas', nombre: 'Cuevas del Parque Nacional Jaragua', desc: 'Cacicazgo de Jaragua. Cuevas con pictogramas datados hasta 2590 a.C. El interior kárstico de 1,374 km² nunca se ha prospectado sistemáticamente.' },
      { lat: 18.35, lng: -73.95, clave: 'grotteMarieJeanne', nombre: 'Grotte Marie-Jeanne (Haití)', desc: 'El sistema de cuevas más grande del Caribe (~1 km). Cerámica taína, herramientas y arte rupestre de uso ritual. Inventario arqueológico incompleto.' },
      { lat: 18.58, lng: -70.50, clave: 'manielOcoa', nombre: 'Maniel de Ocoa (cimarrón)', desc: 'Primer asentamiento cimarrón documentado de la Hispaniola (s. XVI-XVII). Nunca excavado sistemáticamente pese a estar documentado históricamente.' },
      { lat: 18.20, lng: -71.60, clave: 'bahorucoMaroon', nombre: 'Sierra de Bahoruco (cimarrón)', desc: 'Durante 85+ años grandes comunidades cimarronas ocuparon estas montañas. También refugio de Enriquillo (1519-1533). Sin prospección arqueológica sistemática.' },
      { lat: 19.55, lng: -71.65, clave: 'chacuey', nombre: 'Valle del río Chacuey', desc: 'Cientos de petroglifos y plazas ceremoniales de piedra con caminos sofisticados. El patrón de asentamientos agrícolas del valle no se ha excavado.' },
      { lat: 19.30, lng: -70.50, clave: 'cibaoInterior', nombre: 'Interior del Valle del Cibao', desc: 'Evidencia paleoecológica de agricultura pre-colombina. ~300 sitios indígenas registrados pero el interior del valle recibió mucha menos atención que la costa.' },
      { lat: 18.38, lng: -70.12, clave: 'bocaNigua', nombre: 'Boca de Nigua', desc: 'Restos de asentamiento taíno sin excavar. Sitio de la revuelta de esclavizados de 1796. Doble dimensión arqueológica: taína y cimarrona.' },
      { lat: 18.36, lng: -68.96, clave: 'islaCatalina', nombre: 'Isla Catalina (subacuático)', desc: 'El Quedagh Merchant del Capitán Kidd descubierto aquí en 2007. El sistema de arrecifes probablemente contiene naufragios adicionales no documentados.' },
      { lat: 18.25, lng: -73.75, clave: 'costaHaitiSW', nombre: 'Costa suroeste de Haití (Les Cayes-Jérémie)', desc: 'Cacicazgo de Jaragua. Aldeas pesqueras pre-colombinas probablemente presentes pero sin prospección costera sistemática.' }
    ];

    const t = this._textosMapa()?.potencialArqueologico;

    for (const s of sitios) {
      const nombre = t?.[s.clave] || s.nombre;
      const claveDesc = 'desc' + s.clave[0].toUpperCase() + s.clave.slice(1);
      const desc = t?.[claveDesc] || s.desc;

      const marcador = L.marker([s.lat, s.lng], {
        icon: L.divIcon({
          className: 'marcador-sitio',
          html: '<span style="font-size: 24px;">🔬</span>',
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        })
      });
      marcador.bindPopup(
        `<strong>🔬 ${nombre}</strong><br><small>${desc}</small>`
      );
      marcador.addTo(this.capas.potencialArqueologico);
    }
  }

  /** Limpiar y destruir el mapa */
  destruir() {
    if (this.mapa) {
      this.mapa.remove();
      this.mapa = null;
    }
    this.marcadoresJuego = [];
    this.marcadoresExtra = [];
    this.contenedor = null;
    this.visible = false;
    this.capas.taino = null;
    this.capas.colonial = null;
    this.capas.naufragios = null;
    this.capas.museos = null;
    this.capas.sitiosArqueologicos = null;
    this.capas.potencialArqueologico = null;

    // Limpiar referencia global
    if (window._viajarANodo) {
      delete window._viajarANodo;
    }
  }
}
