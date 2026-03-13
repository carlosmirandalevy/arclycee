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

import { configurarControlCapas } from './referencia/capas.js';
import { crearMarcadoresJuego, actualizarMarcadores, obtenerCoordenadas } from './referencia/marcadores.js';
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
      museos: null
    };

    // Callback para cuando el jugador viaja a un nodo
    this._alViajar = null;

    // Referencia al juego
    this._juego = null;
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
    this.controlCapas = configurarControlCapas(this.mapa);

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
      (idNodo) => this._viajarANodo(idNodo)
    );

    // --- Agregar sitios arqueológicos reales y naufragios ---
    this._agregarSitiosTainos();
    this._agregarSitiosColoniales();
    this._agregarNaufragios();
    this._agregarMuseos();

    // --- Control para alternar capas de sitios ---
    const capasSitios = {
      '🗿 Sitios Taínos': this.capas.taino,
      '🏰 Sitios Coloniales': this.capas.colonial,
      '⚓ Naufragios': this.capas.naufragios,
      '🏛 Museos': this.capas.museos
    };
    L.control.layers(null, capasSitios, {
      position: 'bottomright',
      collapsed: false
    }).addTo(this.mapa);

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

    abrirMapaReferencia(this.contenedor, this.mapa);
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
      { lat: 18.4673, lng: -70.1343, nombre: 'Cuevas del Pomier (Borbón)', desc: 'Sistema de 55 cuevas con más de 6,000 pictografías y petroglifos taínos e igneris.' },
      { lat: 18.4105, lng: -69.5525, nombre: 'Cueva de las Maravillas', desc: 'Más de 500 petroglifos y pictografías taínos, incluyendo escenas de rituales funerarios.' },
      { lat: 19.0439, lng: -69.5929, nombre: 'Parque Nacional Los Haitises', desc: 'Cuevas accesibles solo por mar con más de 1,000 pictografías y petroglifos taínos.' },
      { lat: 18.9250, lng: -69.3650, nombre: 'Cueva Fun Fun', desc: 'Enorme sistema de cuevas con río subterráneo y arte rupestre indígena en Hato Mayor.' },
      { lat: 18.3530, lng: -68.6170, nombre: 'Cueva de Berna', desc: 'Unos 300 petroglifos taínos tallados en roca en el Parque Nacional Cotubanamá.' },
      { lat: 18.3640, lng: -68.8350, nombre: 'Cueva Padre Nuestro', desc: 'Cenotes con piscinas de agua dulce y petroglifos en el Parque Nacional Cotubanamá.' },
      { lat: 18.5600, lng: -71.6878, nombre: 'Las Caritas de los Indios', desc: 'Petroglifos pre-taínos tallados en roca coralina frente al Lago Enriquillo.' },
      { lat: 19.0580, lng: -70.1520, nombre: 'Guácaras de Cotuí', desc: 'Cavernas con petroglifos taínos en Sánchez Ramírez (Hoyo de Sanabe, Guácara del Lago).' },
      { lat: 19.5430, lng: -71.5530, nombre: 'Petroglifos de Chacuey', desc: 'Centenares de petroglifos a orillas del río Chacuey en Dajabón, cerca de la frontera.' },
      { lat: 18.4320, lng: -69.7380, nombre: 'Parque Submarino La Caleta', desc: 'Cementerio precolombino y museo, parque submarino con esculturas de dioses taínos.' },
      { lat: 18.4480, lng: -69.6050, nombre: 'Plaza Ceremonial de Juan Dolio', desc: 'Sitio arqueológico taíno costero con restos de plaza ceremonial y batey.' },
      // --- Haití ---
      { lat: 19.6914, lng: -72.0250, nombre: 'En Bas Saline', desc: 'Uno de los mayores asentamientos taínos (95,000 m²), posible pueblo del cacique Guacanagarí.' },
      { lat: 19.6660, lng: -71.8390, nombre: 'Fort-Liberté (Bayajá)', desc: '164 vestigios de asentamientos taínos documentados y ruinas coloniales en la bahía.' },
      { lat: 18.1050, lng: -73.9520, nombre: 'Grotte Marie-Jeanne', desc: 'Cueva natural más larga de Haití (5.3 km) con vestigios precolombinos cerca de Port-à-Piment.' },
      { lat: 19.7570, lng: -72.1960, nombre: 'Museo Taíno de Cap-Haïtien', desc: 'Colección de brazaletes, cemíes y artefactos ceremoniales taínos del norte de Haití.' },
      { lat: 19.7220, lng: -72.0680, nombre: 'Petroglifos de Sainte-Suzanne', desc: 'Garganta con petroglifos taínos notables en el norte de Haití.' }
    ];

    for (const s of sitios) {
      const marcador = L.marker([s.lat, s.lng], {
        icon: L.divIcon({
          className: 'marcador-sitio',
          html: '<span style="font-size: 28px;">🗿</span>',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      });
      marcador.bindPopup(`<strong>🗿 ${s.nombre}</strong><br><small>${s.desc}</small>`);
      marcador.addTo(this.capas.taino);
    }
  }

  // --- Sitios coloniales (reales) ---
  // Cubre toda La Hispaniola (RD + Haití)
  _agregarSitiosColoniales() {
    const sitios = [
      // --- República Dominicana ---
      { lat: 18.4735, lng: -69.8838, nombre: 'Zona Colonial de Santo Domingo', desc: 'Primera ciudad colonial permanente del Nuevo Mundo. Patrimonio UNESCO desde 1990.' },
      { lat: 19.8193, lng: -71.0832, nombre: 'La Isabela', desc: 'Primer asentamiento europeo planificado en América, fundado por Colón en 1493.' },
      { lat: 18.4738, lng: -69.8817, nombre: 'Alcázar de Colón', desc: 'Palacio virreinal de Diego Colón (1510), hoy museo con mobiliario y arte colonial.' },
      { lat: 18.4725, lng: -69.8820, nombre: 'Ruinas del Monasterio de San Francisco', desc: 'Primer monasterio construido en América (1508), destruido por terremotos.' },
      { lat: 19.2350, lng: -70.4950, nombre: 'La Vega Vieja', desc: 'Ruinas de la primera ciudad minera de oro en América, destruida por terremoto en 1562.' },
      { lat: 19.7960, lng: -70.6960, nombre: 'Fortaleza San Felipe', desc: 'Fortaleza del siglo XVI en Puerto Plata para defender la costa norte de corsarios.' },
      // --- Haití ---
      { lat: 19.7577, lng: -72.2000, nombre: 'Cap-Haïtien (Centro Histórico)', desc: 'Antigua capital de Saint-Domingue, "París de las Antillas", con arquitectura colonial francesa.' },
      { lat: 18.2341, lng: -72.5350, nombre: 'Jacmel (Centro Histórico)', desc: 'Ciudad colonial con arquitectura de hierro forjado del siglo XIX, patrimonio cultural haitiano.' }
    ];

    for (const s of sitios) {
      const marcador = L.marker([s.lat, s.lng], {
        icon: L.divIcon({
          className: 'marcador-sitio',
          html: '<span style="font-size: 28px;">🏰</span>',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      });
      marcador.bindPopup(`<strong>🏰 ${s.nombre}</strong><br><small>${s.desc}</small>`);
      marcador.addTo(this.capas.colonial);
    }
  }

  // --- Naufragios históricos alrededor de La Hispaniola ---
  _agregarNaufragios() {
    const naufragios = [
      { lat: 19.69, lng: -72.01, nombre: 'Santa María (1492)', desc: 'Nave capitana de Colón, encalló la noche de Navidad cerca de Cap-Haïtien. Sus maderas construyeron el fuerte La Navidad.' },
      { lat: 19.63, lng: -70.07, nombre: 'San Miguel (1551)', desc: 'Galeón español cargado de tesoros, naufragó en la costa norte cerca de Río San Juan.' },
      { lat: 20.54, lng: -70.63, nombre: 'Ntra. Sra. de la Concepción (1641)', desc: 'Galeón de la flota de plata en el Banco de la Plata. Burt Webber recuperó 25 toneladas de plata en 1978.' },
      { lat: 19.888, lng: -71.665, nombre: 'Monte Cristi Pipe Wreck (1660)', desc: 'Barco mercante holandés con más de 10,000 pipas de arcilla, la mayor colección de artefactos de tabaco submarinos.' },
      { lat: 18.36, lng: -69.00, nombre: 'Quedagh Merchant (1699)', desc: 'Barco armenio capturado por el pirata Capitán Kidd, abandonado cerca de Isla Catalina. Hoy museo submarino.' },
      { lat: 19.20, lng: -69.35, nombre: 'Ntra. Sra. de Guadalupe (1724)', desc: 'Galeón de azogue español hundido en Bahía de Samaná durante un huracán con 400 toneladas de mercurio.' },
      { lat: 19.18, lng: -69.33, nombre: 'Conde de Tolosa (1724)', desc: 'Compañero de la Guadalupe en la Flota de Azogues, naufragó en Samaná con más de 550 víctimas.' },
      { lat: 19.16, lng: -69.32, nombre: 'Le Scipion (1782)', desc: 'Navío francés de 74 cañones, veterano de la Batalla de Chesapeake, chocó contra roca en Bahía de Samaná.' },
      { lat: 20.48, lng: -70.55, nombre: 'Golden Fleece (1827)', desc: 'Barco mercante estadounidense perdido en el Banco de la Plata, arrecifes traicioneros al norte de la isla.' },
      { lat: 18.725, lng: -68.452, nombre: 'Astron (1978)', desc: 'Carguero soviético de 127 m encallado frente a Playa Bávaro, Punta Cana. Popular sitio de buceo.' },
      { lat: 18.43, lng: -69.63, nombre: 'Hickory (1944)', desc: 'Barco de la Armada de EE.UU. hundido cerca de la costa sureste durante la Segunda Guerra Mundial.' },
      { lat: 18.45, lng: -69.85, nombre: 'Zona de naufragios de Santo Domingo', desc: 'Área con múltiples naufragios coloniales al sur de Santo Domingo. Arqueología submarina activa.' }
    ];

    for (const s of naufragios) {
      const marcador = L.marker([s.lat, s.lng], {
        icon: L.divIcon({
          className: 'marcador-sitio',
          html: '<span style="font-size: 28px;">⚓</span>',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      });
      marcador.bindPopup(`<strong>⚓ ${s.nombre}</strong><br><small>${s.desc}</small>`);
      marcador.addTo(this.capas.naufragios);
    }
  }

  // --- Museos históricos y arqueológicos de La Hispaniola ---
  _agregarMuseos() {
    const museos = [
      // --- Santo Domingo ---
      { lat: 18.4723, lng: -69.9080, nombre: 'Museo del Hombre Dominicano', desc: 'Principal museo antropológico del Caribe con la mayor colección de artefactos taínos.' },
      { lat: 18.4776, lng: -69.8826, nombre: 'Museo de las Atarazanas Reales', desc: 'Antiguo arsenal naval colonial con arqueología subacuática y restos de naufragios del s. XVI.' },
      { lat: 18.4771, lng: -69.8832, nombre: 'Museo Alcázar de Colón', desc: 'Palacio virreinal de Diego Colón (1510), el edificio colonial más importante del Nuevo Mundo.' },
      { lat: 18.4758, lng: -69.8832, nombre: 'Museo de las Casas Reales', desc: 'Antigua sede de la Real Audiencia con historia colonial de La Española desde 1492.' },
      { lat: 18.4730, lng: -69.8843, nombre: 'Museo de la Catedral Primada', desc: 'Tesoro de arte sacro colonial dentro de la primera catedral del Nuevo Mundo (1512-1540).' },
      { lat: 18.4704, lng: -69.9087, nombre: 'Museo Nacional de Historia Natural', desc: 'Biodiversidad y geología de La Española con ecosistemas caribeños y especies endémicas.' },
      { lat: 18.4735, lng: -69.8860, nombre: 'Museo de la Resistencia Dominicana', desc: 'Memorial sobre la lucha contra la dictadura de Trujillo (1930-1961).' },
      { lat: 18.4819, lng: -69.9253, nombre: 'Museo Bellapart', desc: 'Colección privada de arte dominicano de los siglos XIX y XX.' },
      { lat: 18.4700, lng: -69.9090, nombre: 'Museo de Arte Moderno', desc: 'Principal museo de arte contemporáneo dominicano en la Plaza de la Cultura.' },
      { lat: 18.4762, lng: -69.8822, nombre: 'Museo Infantil Trampolín', desc: 'Museo interactivo para niños en la Casa de Rodrigo de Bastidas, Calle Las Damas.' },
      { lat: 18.4732, lng: -69.8848, nombre: 'Museo Mundo del Ámbar', desc: 'Ámbar dominicano con insectos fosilizados de millones de años, en la Zona Colonial.' },
      { lat: 18.4725, lng: -69.8834, nombre: 'Museo de Larimar', desc: 'Piedra semipreciosa azul exclusiva de RD, con exhibiciones sobre geología y extracción.' },
      { lat: 18.4745, lng: -69.8810, nombre: 'Museo Fortaleza Ozama', desc: 'Fortaleza militar más antigua de América (1502) con la Torre del Homenaje.' },
      { lat: 18.4793, lng: -69.8687, nombre: 'Faro a Colón', desc: 'Monumental museo-mausoleo en forma de cruz con restos atribuidos a Cristóbal Colón.' },
      // --- Santiago ---
      { lat: 19.4633, lng: -70.6706, nombre: 'Centro León', desc: 'Centro cultural con colecciones de arte, historia y antropología dominicana.' },
      { lat: 19.4612, lng: -70.6945, nombre: 'Museo del Tabaco La Aurora', desc: 'Historia del tabaco dominicano dentro de la fábrica La Aurora (fundada 1903).' },
      // --- Puerto Plata ---
      { lat: 19.7965, lng: -70.6922, nombre: 'Museo del Ámbar (Puerto Plata)', desc: 'Ámbar y ámbar azul dominicano en la Villa Bentz con insectos prehistóricos.' },
      { lat: 19.8041, lng: -70.6959, nombre: 'Museo Fortaleza San Felipe', desc: 'Fortaleza española del s. XVI convertida en museo militar e histórico.' },
      { lat: 19.8888, lng: -71.0796, nombre: 'Museo Arqueológico La Isabela', desc: 'Sitio del primer asentamiento europeo permanente en América (1493).' },
      // --- Otras ciudades RD ---
      { lat: 18.4188, lng: -68.8872, nombre: 'Museo Arqueológico Altos de Chavón', desc: 'Más de 3,000 piezas precolombinas taínas junto al río Chavón en La Romana.' },
      { lat: 19.2058, lng: -69.3326, nombre: 'Museo de las Ballenas (Samaná)', desc: 'Historia natural marina dedicada a las ballenas jorobadas que migran a la bahía.' },
      { lat: 19.2936, lng: -70.5442, nombre: 'Parque Museo La Vega Vieja', desc: 'Ruinas de la ciudad fundada por Colón (1494) con artefactos taínos y coloniales.' },
      { lat: 19.3812, lng: -70.4168, nombre: 'Casa Museo Hermanas Mirabal', desc: 'Casa-museo de las heroínas de la resistencia contra Trujillo en Salcedo.' },
      { lat: 18.6150, lng: -68.7078, nombre: 'Museo Basílica de la Altagracia', desc: 'Arte sacro junto a la basílica patronal de RD en Higüey.' },
      { lat: 18.4537, lng: -69.3083, nombre: 'Museo de San Pedro de Macorís', desc: 'Historia azucarera y la inmigración de los cocolos antillanos angloparlantes.' },
      // --- Haití ---
      { lat: 18.5416, lng: -72.3362, nombre: 'MUPANAH (Panthéon National Haïtien)', desc: 'Museo nacional haitiano con héroes de la independencia y el ancla de la Santa María.' },
      { lat: 18.5452, lng: -72.3390, nombre: "Musée d'Art Haïtien", desc: 'Mayor colección de arte haitiano con obras maestras del movimiento naíf.' },
      { lat: 18.5445, lng: -72.3375, nombre: "Centre d'Art (Port-au-Prince)", desc: 'Institución fundada en 1944 que impulsó el movimiento artístico haitiano.' },
      { lat: 18.5472, lng: -72.3363, nombre: 'Musée Saint-Martial', desc: 'Histórico colegio-seminario (1864) con colección de historia natural y cultural.' },
      { lat: 18.7453, lng: -72.6273, nombre: 'Musée Ogier-Fombrun', desc: 'Plantación azucarera del s. XVIII en Montrouis con artefactos taínos y de la Revolución Haitiana.' }
    ];

    for (const s of museos) {
      const marcador = L.marker([s.lat, s.lng], {
        icon: L.divIcon({
          className: 'marcador-sitio',
          html: '<span style="font-size: 28px;">🏛</span>',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      });
      marcador.bindPopup(`<strong>🏛 ${s.nombre}</strong><br><small>${s.desc}</small>`);
      marcador.addTo(this.capas.museos);
    }
  }

  /** Centrar el mapa en una ubicación con animación */
  centrarEn(lat, lng, zoom = 14) {
    if (this.mapa) {
      this.mapa.flyTo([lat, lng], zoom);
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

    // Limpiar referencia global
    if (window._viajarANodo) {
      delete window._viajarANodo;
    }
  }
}
