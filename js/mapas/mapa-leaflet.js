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
      naufragios: null
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

    // --- Control para alternar capas de sitios ---
    const capasSitios = {
      '🗿 Sitios Taínos': this.capas.taino,
      '🏰 Sitios Coloniales': this.capas.colonial,
      '⚓ Naufragios': this.capas.naufragios
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
      { lat: 18.4723, lng: -69.9080, nombre: 'Museo del Hombre Dominicano', desc: 'Principal museo arqueológico del país con extensa colección de cemíes y artefactos taínos.' },
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
          html: '<span style="font-size: 16px;">🗿</span>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
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
      { lat: 18.4748, lng: -69.8815, nombre: 'Museo de las Atarazanas Reales', desc: 'Antiguo almacén portuario (s. XVI) con más de 1,200 piezas rescatadas de naufragios.' },
      { lat: 18.4725, lng: -69.8820, nombre: 'Ruinas del Monasterio de San Francisco', desc: 'Primer monasterio construido en América (1508), destruido por terremotos.' },
      { lat: 18.4860, lng: -69.8790, nombre: 'Fortaleza Ozama', desc: 'Fortaleza militar más antigua de América (1502-1508).' },
      { lat: 19.2350, lng: -70.4950, nombre: 'La Vega Vieja', desc: 'Ruinas de la primera ciudad minera de oro en América, destruida por terremoto en 1562.' },
      { lat: 19.7960, lng: -70.6960, nombre: 'Fortaleza San Felipe', desc: 'Fortaleza del siglo XVI en Puerto Plata para defender la costa norte de corsarios.' },
      // --- Haití ---
      { lat: 19.5708, lng: -72.2397, nombre: 'Citadelle Laferrière', desc: 'La fortaleza más grande del Caribe (1805-1820). Patrimonio UNESCO.' },
      { lat: 19.6047, lng: -72.2186, nombre: 'Palacio Sans-Souci', desc: 'Palacio del rey Henri Christophe en Milot, rival de Versalles. Patrimonio UNESCO.' },
      { lat: 19.7577, lng: -72.2000, nombre: 'Cap-Haïtien (Centro Histórico)', desc: 'Antigua capital de Saint-Domingue, "París de las Antillas", con arquitectura colonial francesa.' },
      { lat: 18.2341, lng: -72.5350, nombre: 'Jacmel (Centro Histórico)', desc: 'Ciudad colonial con arquitectura de hierro forjado del siglo XIX, patrimonio cultural haitiano.' }
    ];

    for (const s of sitios) {
      const marcador = L.marker([s.lat, s.lng], {
        icon: L.divIcon({
          className: 'marcador-sitio',
          html: '<span style="font-size: 16px;">🏰</span>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
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
          html: '<span style="font-size: 16px;">⚓</span>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
      });
      marcador.bindPopup(`<strong>⚓ ${s.nombre}</strong><br><small>${s.desc}</small>`);
      marcador.addTo(this.capas.naufragios);
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

    // Limpiar referencia global
    if (window._viajarANodo) {
      delete window._viajarANodo;
    }
  }
}
