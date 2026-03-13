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

    // Capas de sitios arqueológicos (para alternar)
    this.capas = {
      taino: null,
      colonial: null
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

    // --- Crear capas para sitios arqueológicos ---
    this.capas.taino = L.layerGroup().addTo(this.mapa);
    this.capas.colonial = L.layerGroup().addTo(this.mapa);

    // --- Agregar marcadores del juego ---
    const progreso = juego?.progreso || { nodosCompletados: [], nodosDesbloqueados: [0] };
    this.marcadoresJuego = crearMarcadoresJuego(
      this.mapa,
      progreso,
      (idNodo) => this._viajarANodo(idNodo)
    );

    // --- Agregar sitios arqueológicos reales ---
    this._agregarSitiosTainos();
    this._agregarSitiosColoniales();

    // --- Control para alternar capas de sitios ---
    const capasSitios = {
      '🗿 Sitios Taínos': this.capas.taino,
      '🏰 Sitios Coloniales': this.capas.colonial
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

  // --- Sitios arqueológicos taínos (reales) ---
  _agregarSitiosTainos() {
    const sitios = [
      { lat: 18.4074, lng: -70.1511, nombre: 'Cuevas del Pomier', desc: 'Más de 6,000 petroglifos taínos. El conjunto de arte rupestre más importante del Caribe.' },
      { lat: 18.3230, lng: -68.8224, nombre: 'Parque Nacional del Este', desc: 'Hogar de la Isla Saona. Cuevas con evidencia taína, cemíes y zonas de pesca ceremonial.' },
      { lat: 18.4631, lng: -69.6297, nombre: 'Cuevas de las Maravillas', desc: 'Museo subterráneo con petroglifos taínos y formaciones geológicas impresionantes.' },
      { lat: 18.9147, lng: -69.4714, nombre: 'Cueva de Fun Fun', desc: 'Una de las cuevas más grandes del Caribe. Refugio y lugar sagrado taíno.' },
      { lat: 19.0600, lng: -69.9200, nombre: 'Los Haitises', desc: 'Mogotes con cuevas que contienen arte rupestre taíno bien preservado.' },
      { lat: 18.4800, lng: -69.9400, nombre: 'Parque Mirador del Este', desc: 'Restos de asentamiento taíno con herramientas, cerámica y evidencia de vida cotidiana.' },
      { lat: 19.2200, lng: -69.3100, nombre: 'Cueva Padre Nuestro', desc: 'Cenotes y petroglifos. Los taínos la consideraban entrada al mundo de los espíritus.' }
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
  _agregarSitiosColoniales() {
    const sitios = [
      { lat: 18.4722, lng: -69.8833, nombre: 'Zona Colonial de Santo Domingo', desc: 'Primera ciudad permanente de América (1498). Patrimonio UNESCO.' },
      { lat: 19.8897, lng: -71.0825, nombre: 'La Isabela', desc: 'Primer asentamiento europeo permanente en América, fundado por Colón en 1493.' },
      { lat: 18.4735, lng: -69.8834, nombre: 'Alcázar de Colón', desc: 'Palacio de Diego Colón (1510). Hoy es museo con objetos coloniales.' },
      { lat: 18.4860, lng: -69.8790, nombre: 'Fortaleza Ozama', desc: 'Fortaleza militar más antigua de América (1502-1508).' },
      { lat: 19.7580, lng: -70.6980, nombre: 'La Vega Vieja', desc: 'Ruinas de una de las primeras ciudades coloniales (1494).' }
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

    // Limpiar referencia global
    if (window._viajarANodo) {
      delete window._viajarANodo;
    }
  }
}
