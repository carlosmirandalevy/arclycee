// ============================================================
// MARCADORES.JS - Marcadores animados para el mapa de referencia
// ============================================================
// Crea marcadores interactivos en las ubicaciones reales de
// cada nivel del juego. Los marcadores tienen colores según
// su estado (completado, desbloqueado, bloqueado) y muestran
// información al hacer click.
//
// Cada marcador incluye:
// - Ícono temático con colores según estado
// - Popup con nombre y descripción del lugar
// - Click para viajar a ese nivel desde el mapa de referencia
// ============================================================

// --- Coordenadas reales de cada ubicación del juego ---
// Latitud y longitud tomadas de las ubicaciones reales en RD
const UBICACIONES_REALES = [
  {
    id: 0,
    nombre: 'Cuevas del Pomier',
    lat: 18.4667, lng: -70.1500,
    descripcion: 'Sistema de 55 cuevas con más de 6,000 petroglifos taínos. Patrimonio Nacional.',
    icono: '⛏',
    color: '#8B4513'
  },
  {
    id: 1,
    nombre: 'Asentamiento Taíno I',
    lat: 18.4700, lng: -70.1500,
    descripcion: 'Aldea taína reconstruida con bohíos, conucos y plaza ceremonial.',
    icono: '🏘',
    color: '#2E8B57'
  },
  {
    id: 2,
    nombre: 'Asentamiento Taíno II',
    lat: 18.4750, lng: -70.1450,
    descripcion: 'Centro agrícola y ceremonial taíno. Conucos, areíto y ritos de cohoba.',
    icono: '🏘',
    color: '#2E8B57'
  },
  {
    id: 3,
    nombre: 'La Isabela',
    lat: 19.8898, lng: -71.0834,
    descripcion: 'Primer asentamiento europeo permanente en América, fundado por Colón en 1493.',
    icono: '🏛',
    color: '#DAA520'
  },
  {
    id: 4,
    nombre: 'Zona Colonial',
    lat: 18.4719, lng: -69.8828,
    descripcion: 'Primera ciudad permanente de América. Patrimonio UNESCO desde 1990.',
    icono: '🏛',
    color: '#DAA520'
  },
  {
    id: 5,
    nombre: 'Naufragio Santa María',
    lat: 19.9200, lng: -72.2000,
    descripcion: 'Restos de la nave capitana de Colón, encallada la Nochebuena de 1492 cerca de Cap-Haïtien.',
    icono: '⚓',
    color: '#1E90FF'
  },
  {
    id: 6,
    nombre: 'Aeropuerto Punta Cana',
    lat: 18.5674, lng: -68.3634,
    descripcion: 'Aeropuerto Internacional de Punta Cana (PUJ). Punto de control aduanero.',
    icono: '⚖️',
    color: '#DC143C'
  },
  {
    id: 7,
    nombre: 'Museo Atarazanas Reales',
    lat: 18.4738, lng: -69.8812,
    descripcion: 'Museo de las Atarazanas Reales. Artefactos de naufragios y patrimonio marítimo.',
    icono: '🏛',
    color: '#8B008B'
  }
];

/**
 * Crea un ícono personalizado de Leaflet para un marcador.
 * Usa un div con HTML/CSS en vez de una imagen.
 *
 * @param {string} icono - Emoji del ícono
 * @param {string} color - Color de fondo del marcador
 * @param {boolean} completado - Si el nivel está completado
 * @param {boolean} bloqueado - Si el nivel está bloqueado
 * @returns {L.DivIcon} Ícono de Leaflet
 */
function crearIconoMarcador(icono, color, completado, bloqueado) {
  const opacidad = bloqueado ? 0.4 : 1;
  const borde = completado ? '3px solid #44AA44' : '2px solid rgba(255,255,255,0.8)';
  const brillo = completado ? 'brightness(1.1)' : bloqueado ? 'grayscale(0.8)' : 'none';

  return L.divIcon({
    className: 'marcador-juego',
    html: `<div style="
      background: ${color};
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      border: ${borde};
      opacity: ${opacidad};
      filter: ${brillo};
      box-shadow: 0 2px 6px rgba(0,0,0,0.4);
    ">
      <span style="
        transform: rotate(45deg);
        font-size: 14px;
      ">${icono}</span>
    </div>`,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42]
  });
}

/**
 * Crea todos los marcadores del juego en el mapa de referencia.
 *
 * @param {L.Map} mapa - Instancia del mapa de Leaflet
 * @param {Object} progreso - Progreso del jugador (nodosCompletados, nodosDesbloqueados)
 * @param {Function} alViajar - Callback cuando el jugador hace click para viajar (recibe id del nodo)
 * @returns {L.Marker[]} Array de marcadores creados
 */
export function crearMarcadoresJuego(mapa, progreso, alViajar) {
  const marcadores = [];
  const grupo = L.layerGroup().addTo(mapa);

  for (const ubicacion of UBICACIONES_REALES) {
    const completado = progreso.nodosCompletados?.includes(ubicacion.id) || false;
    const bloqueado = !progreso.nodosDesbloqueados?.includes(ubicacion.id);

    // Crear el ícono personalizado
    const icono = crearIconoMarcador(
      ubicacion.icono,
      ubicacion.color,
      completado,
      bloqueado
    );

    // Crear el marcador
    const marcador = L.marker([ubicacion.lat, ubicacion.lng], { icon: icono });

    // Popup con información del lugar
    const estado = completado ? '✅ Completado' : bloqueado ? '🔒 Bloqueado' : '🟡 Disponible';
    const botonViajar = !bloqueado
      ? `<br><button onclick="window._viajarANodo(${ubicacion.id})" style="
          margin-top: 8px;
          padding: 4px 12px;
          background: #C8A84E;
          color: #000;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-family: monospace;
          font-weight: bold;
        ">🗺️ Viajar aquí</button>`
      : '';

    marcador.bindPopup(`
      <div style="font-family: monospace; min-width: 180px;">
        <strong>${ubicacion.icono} ${ubicacion.nombre}</strong>
        <br><small>${estado}</small>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 6px 0;">
        <p style="margin: 4px 0; font-size: 12px;">${ubicacion.descripcion}</p>
        ${botonViajar}
      </div>
    `);

    marcador.addTo(grupo);
    marcadores.push({ marcador, ubicacion, completado, bloqueado });
  }

  // Registrar el callback de viaje en el objeto global
  // (necesario porque los popups de Leaflet usan HTML inline)
  if (alViajar) {
    window._viajarANodo = alViajar;
  }

  return marcadores;
}

/**
 * Actualiza los colores/estados de los marcadores existentes.
 * Se llama cuando cambia el progreso del jugador.
 *
 * @param {Object[]} marcadores - Array de {marcador, ubicacion} del crearMarcadoresJuego
 * @param {Object} progreso - Progreso actualizado
 */
export function actualizarMarcadores(marcadores, progreso) {
  for (const m of marcadores) {
    const completado = progreso.nodosCompletados?.includes(m.ubicacion.id) || false;
    const bloqueado = !progreso.nodosDesbloqueados?.includes(m.ubicacion.id);

    const nuevoIcono = crearIconoMarcador(
      m.ubicacion.icono,
      m.ubicacion.color,
      completado,
      bloqueado
    );

    m.marcador.setIcon(nuevoIcono);
    m.completado = completado;
    m.bloqueado = bloqueado;
  }
}

/**
 * Crea marcadores para 8 sitios arqueológicos reales poco estudiados de RD.
 * Estos sitios representan lugares con potencial de investigación futura
 * que los jugadores desbloquean al programar el robot explorador.
 *
 * @param {L.LayerGroup} capaDestino - Capa donde agregar los marcadores
 * @returns {L.LayerGroup} La misma capa con los marcadores agregados
 */
export function crearMarcadoresSitiosArqueologicos(capaDestino) {
  // --- Sitios arqueológicos poco estudiados en RD ---
  // Lugares reales con gran potencial de investigación arqueológica
  const sitios = [
    {
      lat: 18.32, lng: -68.75,
      nombre: 'Cueva de Berna',
      desc: 'Parque Nacional del Este — pictografías precolombinas en cuevas costeras poco documentadas.'
    },
    {
      lat: 18.73, lng: -68.43,
      nombre: 'Punta Macao',
      desc: 'Zona de Higüey — sitio precerámico con evidencia de ocupación humana anterior a los taínos.'
    },
    {
      lat: 18.33, lng: -68.58,
      nombre: 'El Cabo',
      desc: 'Costa este — gran aldea taína con restos de bohíos, cerámicas y herramientas líticas.'
    },
    {
      lat: 19.62, lng: -70.07,
      nombre: 'Playa Grande',
      desc: 'Río San Juan — sitio del período cerámico con fragmentos de vasijas y depósitos culturales.'
    },
    {
      lat: 18.47, lng: -69.42,
      nombre: 'Loma de Guayacanes',
      desc: 'San Pedro de Macorís — sitio funerario con enterramientos precolombinos y ofrendas rituales.'
    },
    {
      lat: 18.35, lng: -68.82,
      nombre: 'Padre Nuestro',
      desc: 'Bayahíbe — sistema de cuevas con petroglifos, cenotes y evidencia de uso ceremonial taíno.'
    },
    {
      lat: 18.45, lng: -69.55,
      nombre: 'Cueva de las Maravillas',
      desc: 'San Pedro — cámaras inexploradas más allá de la zona turística con posibles pictografías inéditas.'
    },
    {
      lat: 18.36, lng: -68.62,
      nombre: 'Boca de Yuma',
      desc: 'Cuevas costeras con estratigrafía arqueológica que abarca múltiples períodos de ocupación.'
    }
  ];

  // Color púrpura (#9B59B6) con ícono 🔍 para sitios inexplorados
  for (const s of sitios) {
    const marcador = L.marker([s.lat, s.lng], {
      icon: L.divIcon({
        className: 'marcador-sitio',
        html: `<div style="
          background: #9B59B6;
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255,255,255,0.8);
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        ">
          <span style="
            transform: rotate(45deg);
            font-size: 14px;
          ">🔍</span>
        </div>`,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42]
      })
    });
    marcador.bindPopup(`
      <div style="font-family: monospace; min-width: 180px;">
        <strong>🔍 ${s.nombre}</strong>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 6px 0;">
        <p style="margin: 4px 0; font-size: 12px;">${s.desc}</p>
      </div>
    `);
    marcador.addTo(capaDestino);
  }

  return capaDestino;
}

/**
 * Devuelve las coordenadas reales de una ubicación por ID.
 */
export function obtenerCoordenadas(id) {
  const ubicacion = UBICACIONES_REALES.find(u => u.id === id);
  return ubicacion ? { lat: ubicacion.lat, lng: ubicacion.lng } : null;
}
