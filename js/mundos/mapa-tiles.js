// ============================================================
// MAPA-TILES.JS - Sistema de tiles para el mapa de la isla
// ============================================================
// Genera y dibuja un mapa con tiles que representa la isla de
// La Hispaniola (República Dominicana). En vez de un fondo
// simple con gradientes, ahora el mapa tiene tierra, agua,
// montañas, bosques y playas — como un mapa real.
//
// La forma de la isla se define con un bitmap trazado desde
// una imagen de referencia pixelada. Los tiles se dibujan como
// cuadrados de 32×32 píxeles con colores y detalles procedurales.
//
// El mapa es más grande que la pantalla, así que la cámara
// sigue al jugador mostrando solo la parte visible.
// ============================================================

import { TAMANO_TILE } from '../motor/configuracion.js';

// --- Tipos de tile ---
// Cada número representa un tipo de terreno diferente
export const TILE = {
  AGUA_PROFUNDA: 0,   // Mar abierto (azul oscuro)
  AGUA_SUPERFICIAL: 1, // Agua cerca de la costa (azul medio)
  ARENA: 2,            // Playa y arena (dorado)
  PRADERA: 3,          // Llanuras con hierba (verde claro)
  BOSQUE: 4,           // Áreas de vegetación densa (verde oscuro)
  MONTANA: 5,          // Cordilleras y montañas (gris-marrón)
  CAMINO: 6,           // Senderos entre localidades (marrón claro)
  RIO: 7               // Ríos y lagos (azul claro)
};

// --- Colores base de cada tipo de tile ---
const COLORES = {
  [TILE.AGUA_PROFUNDA]:   '#1a3a5c',
  [TILE.AGUA_SUPERFICIAL]:'#2d6a8a',
  [TILE.ARENA]:           '#d4b483',
  [TILE.PRADERA]:         '#4a8c3f',
  [TILE.BOSQUE]:          '#2d5a1e',
  [TILE.MONTANA]:         '#7a6b5a',
  [TILE.CAMINO]:          '#b8a070',
  [TILE.RIO]:             '#3a7abd'
};

// --- Dimensiones del mapa en tiles ---
// 128 columnas × 68 filas = 4096 × 2176 píxeles
// Escalado 2× desde el bitmap original de 64×34 para dar
// más espacio al jugador para moverse entre nodos.
export const MAPA_ANCHO = 128;
export const MAPA_ALTO = 68;

// --- Bitmap de la isla (escalado 2×) ---
// Cada string representa una fila del mapa (128 caracteres = 128 columnas).
// '1' = tierra, '0' = agua. Escalado 2× desde el bitmap original de 64×34
// trazado de resources/hispaniola-map-pixelated-tiled.png.
// Cada pixel original se convirtió en un bloque de 2×2 para duplicar
// la resolución sin perder la forma de La Hispaniola.
const ISLA_BITMAP = [
  '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', // 0
  '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', // 1
  '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', // 2
  '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', // 3
  '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', // 4
  '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', // 5
  '00000000000000000000000000000000111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', // 6
  '00000000000000000000000000000000111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', // 7
  '00000000000000000000000000000011111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', // 8
  '00000000000000000000000000000011111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', // 9
  '00000000000000000000000000111111111111111100000000000000111111111111111111110000000000000000000000000000000000000000000000000000', // 10
  '00000000000000000000000000111111111111111100000000000000111111111111111111110000000000000000000000000000000000000000000000000000', // 11
  '00000000000000000000001111111111111111111111111111000011111111111111111111111111000000000000000000000000000000000000000000000000', // 12
  '00000000000000000000001111111111111111111111111111000011111111111111111111111111000000000000000000000000000000000000000000000000', // 13
  '00000000000000000000001111111111111111111111111111111111111111111111111111111111111111000000000000001111111111111100000000000000', // 14
  '00000000000000000000001111111111111111111111111111111111111111111111111111111111111111000000000000001111111111111100000000000000', // 15
  '00000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100000000000000', // 16
  '00000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100000000000000', // 17
  '00000000000000000000000011111111111111111111111111111111111111111111111111111111111111111111110000001111111111110000000000000000', // 18
  '00000000000000000000000011111111111111111111111111111111111111111111111111111111111111111111110000001111111111110000000000000000', // 19
  '00000000000000000000000000000000111111111111111111111111111111111111111111111111111111111111110000000000000000000000000000000000', // 20
  '00000000000000000000000000000000111111111111111111111111111111111111111111111111111111111111110000000000000000000000000000000000', // 21
  '00000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111100001111111100000000000000000000', // 22
  '00000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111100001111111100000000000000000000', // 23
  '00000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111100000000000000000000', // 24
  '00000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111100000000000000000000', // 25
  '00000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111100000000000000000000', // 26
  '00000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111100000000000000000000', // 27
  '00000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111111111000000000000', // 28
  '00000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111111111000000000000', // 29
  '00000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111111111000000000000', // 30
  '00000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111111111000000000000', // 31
  '00000000000000000000000011111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000000000', // 32
  '00000000000000000000000011111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000000000', // 33
  '00000000000000000000000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100000000', // 34
  '00000000000000000000000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100000000', // 35
  '00000000000000000000000000000000000011111111111111111111111111111111111111111111111111111111111111111111111111111111111111000000', // 36
  '00000000000000000000000000000000000011111111111111111111111111111111111111111111111111111111111111111111111111111111111111000000', // 37
  '00001111111111001111000000000011111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000', // 38
  '00001111111111001111000000000011111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000', // 39
  '00001111111111111111111111000000000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100', // 40
  '00001111111111111111111111000000000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100', // 41
  '00111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000', // 42
  '00111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000', // 43
  '00111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000', // 44
  '00111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000', // 45
  '00001111111111111111111111111111111111111111111111111111111111111111111111111111111111111100000000000000000011111111111111000000', // 46
  '00001111111111111111111111111111111111111111111111111111111111111111111111111111111111111100000000000000000011111111111111000000', // 47
  '00000000001111111111111111111111111111111111111111111111111111111111111111000011111111111100000000000000000000001111111100000000', // 48
  '00000000001111111111111111111111111111111111111111111111111111111111111111000011111111111100000000000000000000001111111100000000', // 49
  '00000000000011111111110000001111111111111100000000001111111111111111111100000000111100000000000000000000000000000011111111000000', // 50
  '00000000000011111111110000001111111111111100000000001111111111111111111100000000111100000000000000000000000000000011111111000000', // 51
  '00000000000011111111110000000000000000000000000000000011111111111111110000000000000000000000000000000000000000000000111100000000', // 52
  '00000000000011111111110000000000000000000000000000000011111111111111110000000000000000000000000000000000000000000000111100000000', // 53
  '00000000000000111100000000000000000000000000000000000000111111111111110000000000000000000000000000000000000000000000000000000000', // 54
  '00000000000000111100000000000000000000000000000000000000111111111111110000000000000000000000000000000000000000000000000000000000', // 55
  '00000000000000000000000000000000000000000000000000000000111111111111000000000000000000000000000000000000000000000000000000000000', // 56
  '00000000000000000000000000000000000000000000000000000000111111111111000000000000000000000000000000000000000000000000000000000000', // 57
  '00000000000000000000000000000000000000000000000000000000111111111111000000000000000000000000000000000000000000000000000000000000', // 58
  '00000000000000000000000000000000000000000000000000000000111111111111000000000000000000000000000000000000000000000000000000000000', // 59
  '00000000000000000000000000000000000000000000000000000000001111111100000000000000000000000000000000000000000000000000000000000000', // 60
  '00000000000000000000000000000000000000000000000000000000001111111100000000000000000000000000000000000000000000000000000000000000', // 61
  '00000000000000000000000000000000000000000000000000000000001111110000000000000000000000000000000000000000000000000000000000000000', // 62
  '00000000000000000000000000000000000000000000000000000000001111110000000000000000000000000000000000000000000000000000000000000000', // 63
  '00000000000000000000000000000000000000000000000000000000001100000000000000000000000000000000000000000000000000000000000000000000', // 64
  '00000000000000000000000000000000000000000000000000000000001100000000000000000000000000000000000000000000000000000000000000000000', // 65
  '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', // 66
  '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', // 67
];

// --- Lagos interiores ---
// Grandes cuerpos de agua dentro de la isla, se dibujan como
// tiles de río sobre tierra firme.
// Posiciones trazadas visualmente desde:
//   resources/hispaniola-map-pixelated-tiled.png (bitmap de referencia)
//   resources/hispaniola-plain-topographic-map-nasa.jpg (elevación)
const LAGOS = [
  // Lago Enriquillo — el lago más grande del Caribe, 44m bajo nivel del mar
  // Ubicado en la Hoya de Enriquillo entre Sierra de Neiba y Sierra de Bahoruco
  { cx: 56, cy: 42, rx: 4, ry: 1 },

  // Étang Saumâtre (Lago Azuei) — lago salobre en Haití, al oeste del Enriquillo
  { cx: 46, cy: 41, rx: 3, ry: 1 },
];

// --- Cordilleras ---
// Líneas de montañas que cruzan la isla. Cada array es una cadena
// montañosa definida como puntos. Los tiles dentro de 3.6 tiles de
// distancia a un segmento se pintan como montaña (no caminable).
// Trazadas visualmente desde:
//   resources/hispaniola-map-pixelated-tiled.png (posiciones pixel-exact)
//   resources/hispaniola-plain-topographic-map-nasa.jpg (elevación real)
const CORDILLERAS = [
  // === República Dominicana ===

  // Cordillera Central — la más alta e importante, cruza el centro de RD
  // de noroeste a sureste. Incluye Pico Duarte (3098m), la montaña más
  // alta de todo el Caribe. Separa el Valle del Cibao al norte de los
  // llanos costeros del sur.
  [{x:52, y:30}, {x:60, y:31}, {x:68, y:32}, {x:76, y:33}, {x:80, y:34}],

  // Cordillera Septentrional — cadena paralela a la costa norte de RD,
  // más baja que la Central. Va desde Puerto Plata hasta cerca de Nagua.
  // Entre ambas cordilleras está el fértil Valle del Cibao.
  [{x:70, y:18}, {x:78, y:19}, {x:86, y:20}],

  // Cordillera Oriental — la más baja y corta de las tres cordilleras
  // dominicanas. Colinas suaves entre Hato Mayor y El Seibo.
  [{x:100, y:32}, {x:106, y:33}],

  // Sierra de Neiba — cadena montañosa al norte de la Hoya de Enriquillo.
  // Separa el Valle de San Juan del lago Enriquillo al sur.
  [{x:50, y:38}, {x:56, y:39}, {x:62, y:40}],

  // Sierra de Bahoruco — cadena al suroeste de RD, al sur de la Hoya
  // de Enriquillo. Zona de bosque húmedo y seco subtropical.
  [{x:46, y:44}, {x:52, y:45}, {x:58, y:46}],

  // === Haití ===

  // Massif du Nord — principal cadena montañosa del norte de Haití,
  // continuación occidental de la Cordillera Central.
  [{x:28, y:18}, {x:36, y:19}, {x:44, y:20}, {x:52, y:21}],

  // Massif de la Selle — se extiende desde la Cordillera Central
  // hacia el suroeste de Haití. Incluye el Pic la Selle (2680m).
  [{x:36, y:38}, {x:42, y:40}, {x:48, y:41}],

  // Massif de la Hotte — recorre la Península de Tiburon en el
  // extremo suroeste de Haití.
  [{x:8, y:46}, {x:14, y:48}, {x:20, y:49}],
];

// --- Ríos principales ---
// Cada río es una lista de puntos (en tiles) que se conectan con
// líneas de Bresenham. Los tiles de río son caminables (agua dulce).
// Trazados desde resources/mapa-hidrografico-hispaniola.jpg
const RIOS = [
  // Río Yaque del Norte — el más largo de RD (296 km). Nace en la
  // Cordillera Central cerca de Jarabacoa, fluye al noroeste por el
  // Valle del Cibao pasando por Santiago, y desemboca en Monte Cristi.
  [{x:70, y:30}, {x:68, y:24}, {x:64, y:18}, {x:60, y:10}],

  // Río Yaque del Sur — segundo río más largo de RD (183 km). Nace en
  // la Cordillera Central y fluye al sur a través del Valle de San Juan,
  // desembocando en la Bahía de Neiba.
  [{x:68, y:32}, {x:64, y:38}, {x:60, y:44}],

  // Río Yuna — tercer río más largo de RD (209 km). Nace en la
  // Cordillera Central y fluye al noreste por el Valle del Cibao,
  // desembocando en la Bahía de Samaná.
  [{x:74, y:30}, {x:80, y:26}, {x:86, y:22}, {x:91, y:19}],

  // Río Ozama — cruza la ciudad de Santo Domingo y desemboca en el
  // Mar Caribe. Históricamente importante para la Zona Colonial.
  [{x:88, y:33}, {x:90, y:37}],

  // Río Artibonite — el más largo de toda La Hispaniola (321 km).
  // Nace en la Cordillera Central dominicana, cruza la frontera
  // y recorre Haití hasta desembocar en el Golfe de la Gonâve.
  [{x:56, y:30}, {x:48, y:27}, {x:42, y:24}, {x:36, y:21}, {x:26, y:18}],
];


// ============================================================
// GENERACIÓN DEL MAPA
// ============================================================

/**
 * Genera el mapa completo de la isla como un array 2D de tiles.
 * Cada celda contiene el tipo de tile (0-7).
 *
 * @returns {number[][]} Array 2D [fila][columna] con tipos de tile
 */
export function generarMapaIsla() {
  // Crear cuadrícula inicial — todo agua profunda
  const tiles = [];
  for (let fila = 0; fila < MAPA_ALTO; fila++) {
    tiles[fila] = [];
    for (let col = 0; col < MAPA_ANCHO; col++) {
      tiles[fila][col] = TILE.AGUA_PROFUNDA;
    }
  }

  // --- Paso 1: Determinar qué tiles son tierra ---
  for (let fila = 0; fila < MAPA_ALTO; fila++) {
    for (let col = 0; col < MAPA_ANCHO; col++) {
      if (_esTierra(col, fila)) {
        tiles[fila][col] = TILE.PRADERA;
      }
    }
  }

  // --- Paso 2: Agua superficial (1 tile alrededor de la costa) ---
  // Los tiles de agua adyacentes a tierra se marcan como agua superficial
  for (let fila = 0; fila < MAPA_ALTO; fila++) {
    for (let col = 0; col < MAPA_ANCHO; col++) {
      if (tiles[fila][col] === TILE.AGUA_PROFUNDA) {
        if (_tieneVecinoTierra(tiles, col, fila)) {
          tiles[fila][col] = TILE.AGUA_SUPERFICIAL;
        }
      }
    }
  }

  // --- Paso 3: Playas (tierra adyacente al agua) ---
  // Los tiles de tierra junto al agua se convierten en arena
  const copiaParaPlaya = tiles.map(f => [...f]);
  for (let fila = 0; fila < MAPA_ALTO; fila++) {
    for (let col = 0; col < MAPA_ANCHO; col++) {
      if (copiaParaPlaya[fila][col] === TILE.PRADERA) {
        if (_tieneVecinoAgua(copiaParaPlaya, col, fila)) {
          tiles[fila][col] = TILE.ARENA;
        }
      }
    }
  }

  // --- Paso 4: Montañas (múltiples cordilleras) ---
  for (let fila = 0; fila < MAPA_ALTO; fila++) {
    for (let col = 0; col < MAPA_ANCHO; col++) {
      if (tiles[fila][col] === TILE.PRADERA) {
        const distCordillera = _distanciaACordilleras(col, fila);
        if (distCordillera < 3.6) {
          tiles[fila][col] = TILE.MONTANA;
        }
      }
    }
  }

  // --- Paso 5: Lagos interiores ---
  // Lago Enriquillo y Étang Saumâtre son cuerpos de agua dentro de la isla
  for (let fila = 0; fila < MAPA_ALTO; fila++) {
    for (let col = 0; col < MAPA_ANCHO; col++) {
      if (tiles[fila][col] >= TILE.ARENA && _esLago(col, fila)) {
        tiles[fila][col] = TILE.RIO; // Lagos se dibujan como agua dulce
      }
    }
  }

  // --- Paso 6: Bosques (basado en pseudo-ruido) ---
  // Usamos un hash simple de la posición para crear parches de bosque
  for (let fila = 0; fila < MAPA_ALTO; fila++) {
    for (let col = 0; col < MAPA_ANCHO; col++) {
      if (tiles[fila][col] === TILE.PRADERA) {
        const ruido = _hashPosicion(col, fila);
        // ~40% de las praderas se convierten en bosque
        if (ruido > 0.6) {
          tiles[fila][col] = TILE.BOSQUE;
        }
      }
    }
  }

  // --- Paso 6: Ríos ---
  for (const rio of RIOS) {
    for (let i = 0; i < rio.length - 1; i++) {
      const desde = rio[i];
      const hasta = rio[i + 1];
      _dibujarLineaTile(tiles, desde.x, desde.y, hasta.x, hasta.y, TILE.RIO);
    }
  }

  // --- Paso 7: Caminos entre localidades ---
  // DESACTIVADO temporalmente mientras se recalculan las coordenadas
  // Los caminos se reactivarán cuando las cordilleras, ríos y lagos estén listos
  // const nodos = obtenerNodosIsla();
  // for (let i = 0; i < nodos.length - 1; i++) {
  //   const desde = nodos[i];
  //   const hasta = nodos[i + 1];
  //   if (desde.conectadoA && desde.conectadoA.includes(hasta.id)) {
  //     _dibujarCaminoTile(tiles, desde.tileX, desde.tileY, hasta.tileX, hasta.tileY);
  //   }
  // }

  return tiles;
}

// ============================================================
// POSICIONES DE LOS NODOS EN EL MAPA DE TILES
// ============================================================

/**
 * Devuelve las posiciones de los 8 niveles del juego
 * en coordenadas de tile del mapa de la isla.
 *
 * Las posiciones son aproximaciones de las ubicaciones reales
 * pero espaciadas para que el jugador pueda caminar entre ellas.
 *
 * @returns {Object[]} Array de nodos con coordenadas de tile
 */
export function obtenerNodosIsla() {
  return [
    {
      // San Cristóbal — en las colinas al noroeste de Santo Domingo.
      // Las Cuevas del Pomier son un sistema real de 55 cuevas con
      // miles de petroglifos y pictografías taínas.
      id: 0,
      tileX: 84, tileY: 38,
      nombre: 'Cuevas del Pomier',
      tipo: 'cueva',
      escena: 'cuevasPomier',
      conectadoA: [1]
    },
    {
      // Estribaciones cerca de Pomier — aldea taína en las colinas
      // donde el jugador aprende sobre la vida cotidiana taína.
      id: 1,
      tileX: 82, tileY: 40,
      nombre: 'Yucayeque de Marién',
      tipo: 'aldea',
      escena: 'asentamientoTaino1',
      conectadoA: [9]
    },
    {
      // Montañas del interior — Sebastián Lemba lideró la primera
      // rebelión de esclavizados en las Américas (~1540s) y estableció
      // comunidades cimarronas libres en las montañas de La Hispaniola.
      id: 9,
      tileX: 82, tileY: 36,
      nombre: 'Palenque de Lemba',
      tipo: 'montana',
      escena: 'mundoMontana',
      conectadoA: [2]
    },
    {
      // Valle del Cibao — el valle más fértil de RD, entre la
      // Cordillera Central y la Septentrional. Zona de grandes
      // centros ceremoniales taínos (bateyes, plazas).
      id: 2,
      tileX: 78, tileY: 26,
      nombre: 'Yucayeque de Maguá',
      tipo: 'aldea',
      escena: 'asentamientoTaino2',
      conectadoA: [3]
    },
    {
      // Costa norte de RD — ruinas reales de La Isabela (1494),
      // segundo asentamiento europeo en las Américas, fundado por
      // Cristóbal Colón cerca de la actual Luperón, Puerto Plata.
      id: 3,
      tileX: 62, tileY: 12,
      nombre: 'La Isabela',
      tipo: 'ciudad',
      escena: 'mundoColonial',
      conectadoA: [4, 11]
    },
    {
      // Santo Domingo — costa sur del Caribe. La Zona Colonial es
      // Patrimonio de la Humanidad UNESCO, primera ciudad europea
      // permanente en las Américas (1498).
      id: 4,
      tileX: 90, tileY: 44,
      nombre: 'Zona Colonial',
      tipo: 'ciudad',
      escena: 'zonaColonial',
      conectadoA: [5]
    },
    {
      // Costa norte de RD — Santuario de Mamíferos Marinos de
      // Estero Hondo, al oeste de La Isabela. Protege manatíes,
      // tortugas y arrecifes de coral en aguas poco profundas.
      id: 11,
      tileX: 55, tileY: 12,
      nombre: 'Santuario del Manatí',
      tipo: 'naufragio',
      escena: 'santuarioManati',
      conectadoA: [5]
    },
    {
      // Costa norte de Haití — en el agua frente a Cap-Haïtien.
      // La Santa María, nave capitana de Colón, encalló aquí la
      // noche del 25 de diciembre de 1492. El nodo está en el agua
      // porque es un sitio de naufragio submarino.
      id: 5,
      tileX: 36, tileY: 5,
      nombre: 'Naufragio Santa María',
      tipo: 'naufragio',
      escena: 'mundoAcuatico',
      conectadoA: [6]
    },
    {
      // Extremo este de la isla — Punta Cana, en la punta oriental
      // de la República Dominicana.
      id: 6,
      tileX: 118, tileY: 34,
      nombre: 'Aeropuerto Punta Cana',
      tipo: 'juridico',
      escena: 'mundoJuridico',
      conectadoA: [7]
    },
    {
      // Santo Domingo — Las Reales Atarazanas (astilleros reales),
      // edificio colonial del siglo XVI en la Zona Colonial, hoy
      // museo con artefactos de naufragios.
      id: 7,
      tileX: 94, tileY: 44,
      nombre: 'Museo Atarazanas',
      tipo: 'museo',
      escena: 'mundoLaboratorio',
      conectadoA: [8]
    },
    {
      // Santo Domingo — Liceo Francés de Santo Domingo, al oeste
      // de la Zona Colonial. Escuela del equipo les fous du robot.
      id: 8,
      tileX: 86, tileY: 44,
      nombre: 'LFSD',
      tipo: 'escuela',
      escena: 'mundoLFSD',
      conectadoA: []
    },
    {
      // Lago Enriquillo — el lago más grande del Caribe, 44m bajo
      // el nivel del mar. El cacique Enriquillo (Guarocuya) lideró
      // una rebelión de 13 años (1519-1533) desde el Bahoruco cercano.
      // La Isla Cabritos en su centro alberga cocodrilos e iguanas.
      // Nodo desbloqueado por la sidequest de Anacaona (ídolo cemí).
      id: 10,
      tileX: 60, tileY: 41,
      nombre: 'Lago Enriquillo',
      tipo: 'lago',
      escena: 'lagoEnriquillo',
      conectadoA: []
    }
  ];
}


// ============================================================
// RENDERIZADO DE TILES
// ============================================================

/**
 * Dibuja los tiles visibles en la pantalla.
 * Solo dibuja los tiles que caen dentro de la ventana de la cámara
 * para no desperdiciar rendimiento dibujando lo que no se ve.
 *
 * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
 * @param {number[][]} tiles - Mapa de tiles (fila × columna)
 * @param {number} camaraX - Posición X de la cámara (en píxeles)
 * @param {number} camaraY - Posición Y de la cámara (en píxeles)
 * @param {number} anchoVista - Ancho de la pantalla
 * @param {number} altoVista - Alto de la pantalla
 * @param {number} tiempo - Tiempo total para animaciones
 */
export function dibujarTilesVisibles(ctx, tiles, camaraX, camaraY, anchoVista, altoVista, tiempo) {
  const tam = TAMANO_TILE;

  // Calcular qué rango de tiles es visible
  const colInicio = Math.max(0, Math.floor(camaraX / tam));
  const colFin = Math.min(MAPA_ANCHO, Math.ceil((camaraX + anchoVista) / tam));
  const filaInicio = Math.max(0, Math.floor(camaraY / tam));
  const filaFin = Math.min(MAPA_ALTO, Math.ceil((camaraY + altoVista) / tam));

  for (let fila = filaInicio; fila < filaFin; fila++) {
    for (let col = colInicio; col < colFin; col++) {
      const tipo = tiles[fila][col];
      const px = col * tam - camaraX;
      const py = fila * tam - camaraY;

      // Color base del tile
      ctx.fillStyle = COLORES[tipo] || '#333333';

      // Variación sutil de color para que no se vea "plano"
      const variacion = _hashPosicion(col, fila) * 0.08 - 0.04;
      if (variacion !== 0) {
        ctx.fillStyle = _variarColor(COLORES[tipo], variacion);
      }

      ctx.fillRect(px, py, tam, tam);

      // --- Detalles decorativos por tipo de tile ---
      _dibujarDetalleTile(ctx, tipo, px, py, tam, col, fila, tiempo);
    }
  }
}

/**
 * Verifica si un tile es caminable (el jugador puede pasar por ahí).
 * Solo el agua profunda bloquea el movimiento.
 */
export function esCaminable(tiles, col, fila) {
  if (fila < 0 || fila >= MAPA_ALTO || col < 0 || col >= MAPA_ANCHO) {
    return false;
  }
  const tipo = tiles[fila][col];
  // El jugador puede caminar por todo excepto agua profunda y montaña
  return tipo !== TILE.AGUA_PROFUNDA && tipo !== TILE.MONTANA;
}


// ============================================================
// FUNCIONES INTERNAS
// ============================================================

/** ¿Este punto (col, fila) es tierra según el bitmap de la isla? */
function _esTierra(col, fila) {
  if (fila < 0 || fila >= MAPA_ALTO || col < 0 || col >= MAPA_ANCHO) {
    return false;
  }
  return ISLA_BITMAP[fila][col] === '1';
}

/** ¿Tiene algún vecino que sea tierra? (para detectar costa) */
function _tieneVecinoTierra(tiles, col, fila) {
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (const [dc, df] of dirs) {
    const nc = col + dc;
    const nf = fila + df;
    if (nf >= 0 && nf < MAPA_ALTO && nc >= 0 && nc < MAPA_ANCHO) {
      if (tiles[nf][nc] >= TILE.ARENA) { // Cualquier tipo de tierra
        return true;
      }
    }
  }
  return false;
}

/** ¿Tiene algún vecino que sea agua? (para detectar playa) */
function _tieneVecinoAgua(tiles, col, fila) {
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (const [dc, df] of dirs) {
    const nc = col + dc;
    const nf = fila + df;
    if (nf >= 0 && nf < MAPA_ALTO && nc >= 0 && nc < MAPA_ANCHO) {
      if (tiles[nf][nc] <= TILE.AGUA_SUPERFICIAL) {
        return true;
      }
    }
  }
  return false;
}

/** Distancia mínima de un punto a cualquiera de las cordilleras */
function _distanciaACordilleras(col, fila) {
  let minDist = Infinity;

  for (const cadena of CORDILLERAS) {
    for (let i = 0; i < cadena.length - 1; i++) {
      const a = cadena[i];
      const b = cadena[i + 1];
      const dist = _distanciaPuntoASegmento(col, fila, a.x, a.y, b.x, b.y);
      if (dist < minDist) minDist = dist;
    }
  }

  return minDist;
}

/** ¿Este punto está dentro de algún lago interior? */
function _esLago(col, fila) {
  for (const lago of LAGOS) {
    const dx = (col - lago.cx) / lago.rx;
    const dy = (fila - lago.cy) / lago.ry;
    if (dx * dx + dy * dy <= 1) {
      return true;
    }
  }
  return false;
}

/** Distancia de un punto (px, py) a un segmento de línea (ax,ay)→(bx,by) */
function _distanciaPuntoASegmento(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const longitudCuadrada = dx * dx + dy * dy;

  if (longitudCuadrada === 0) {
    // El segmento es un punto
    return Math.sqrt((px - ax) * (px - ax) + (py - ay) * (py - ay));
  }

  // Proyección del punto sobre el segmento (valor t entre 0 y 1)
  let t = ((px - ax) * dx + (py - ay) * dy) / longitudCuadrada;
  t = Math.max(0, Math.min(1, t));

  // Punto más cercano en el segmento
  const cercaX = ax + t * dx;
  const cercaY = ay + t * dy;

  return Math.sqrt((px - cercaX) * (px - cercaX) + (py - cercaY) * (py - cercaY));
}

/**
 * Hash simple para generar "ruido" a partir de una posición.
 * Devuelve un valor entre 0 y 1 que parece aleatorio pero es
 * determinista (siempre da el mismo resultado para la misma posición).
 */
function _hashPosicion(col, fila) {
  const n = col * 374761393 + fila * 668265263;
  const h = (n ^ (n >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) & 0x7FFFFFFF) / 0x7FFFFFFF;
}

/** Dibuja una línea de tiles entre dos puntos (para ríos) */
function _dibujarLineaTile(tiles, x0, y0, x1, y1, tipo) {
  // Algoritmo de Bresenham simplificado
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  let x = x0;
  let y = y0;

  while (true) {
    if (y >= 0 && y < MAPA_ALTO && x >= 0 && x < MAPA_ANCHO) {
      // Solo dibujar ríos sobre tierra (no sobre agua)
      if (tiles[y][x] >= TILE.ARENA) {
        tiles[y][x] = tipo;
      }
    }

    if (x === x1 && y === y1) break;

    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x += sx; }
    if (e2 < dx) { err += dx; y += sy; }
  }
}

/** Dibuja un camino entre dos nodos (sendero marrón claro) */
function _dibujarCaminoTile(tiles, x0, y0, x1, y1) {
  _dibujarLineaTile(tiles, x0, y0, x1, y1, TILE.CAMINO);
}

/** Varía un color hex sumando/restando brillo */
function _variarColor(hexColor, cantidad) {
  // Parsear el color hex
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Ajustar brillo
  const ajuste = Math.floor(cantidad * 255);
  const nr = Math.max(0, Math.min(255, r + ajuste));
  const ng = Math.max(0, Math.min(255, g + ajuste));
  const nb = Math.max(0, Math.min(255, b + ajuste));

  return `rgb(${nr}, ${ng}, ${nb})`;
}

/** Dibuja detalles decorativos sobre cada tile según su tipo */
function _dibujarDetalleTile(ctx, tipo, px, py, tam, col, fila, tiempo) {
  const hash = _hashPosicion(col, fila);

  switch (tipo) {
    case TILE.AGUA_PROFUNDA:
    case TILE.AGUA_SUPERFICIAL: {
      // Olas animadas — líneas curvas que se mueven
      const fase = tiempo * 1.5 + col * 0.5 + fila * 0.3;
      const oy = Math.sin(fase) * 2;
      ctx.strokeStyle = tipo === TILE.AGUA_PROFUNDA
        ? 'rgba(100, 160, 220, 0.25)'
        : 'rgba(120, 180, 240, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px + 4, py + 12 + oy);
      ctx.quadraticCurveTo(px + tam / 2, py + 8 + oy, px + tam - 4, py + 12 + oy);
      ctx.stroke();

      if (tipo === TILE.AGUA_SUPERFICIAL) {
        // Espuma en agua superficial
        ctx.beginPath();
        ctx.moveTo(px + 8, py + 22 + oy * 0.5);
        ctx.quadraticCurveTo(px + tam / 2, py + 18 + oy * 0.5, px + tam - 8, py + 22 + oy * 0.5);
        ctx.stroke();
      }
      break;
    }

    case TILE.ARENA: {
      // Puntos de arena (textura granulada)
      ctx.fillStyle = 'rgba(200, 170, 100, 0.3)';
      if (hash > 0.3) ctx.fillRect(px + 5, py + 8, 2, 2);
      if (hash > 0.5) ctx.fillRect(px + 18, py + 20, 2, 2);
      if (hash > 0.7) ctx.fillRect(px + 10, py + 25, 2, 2);
      break;
    }

    case TILE.PRADERA: {
      // Briznas de hierba
      ctx.strokeStyle = 'rgba(80, 160, 60, 0.4)';
      ctx.lineWidth = 1;
      if (hash > 0.4) {
        ctx.beginPath();
        ctx.moveTo(px + 8, py + 20);
        ctx.lineTo(px + 7, py + 14);
        ctx.stroke();
      }
      if (hash > 0.6) {
        ctx.beginPath();
        ctx.moveTo(px + 22, py + 12);
        ctx.lineTo(px + 23, py + 6);
        ctx.stroke();
      }
      break;
    }

    case TILE.BOSQUE: {
      // Copas de árboles (círculos verdes)
      ctx.fillStyle = 'rgba(20, 70, 15, 0.5)';
      ctx.beginPath();
      ctx.arc(px + 10 + hash * 8, py + 10 + hash * 6, 6 + hash * 3, 0, Math.PI * 2);
      ctx.fill();

      // Segundo árbol si el hash es alto
      if (hash > 0.5) {
        ctx.beginPath();
        ctx.arc(px + 22, py + 20, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case TILE.MONTANA: {
      // Triángulo de montaña
      ctx.fillStyle = 'rgba(100, 90, 75, 0.5)';
      ctx.beginPath();
      ctx.moveTo(px + tam / 2, py + 4);
      ctx.lineTo(px + tam - 6, py + tam - 6);
      ctx.lineTo(px + 6, py + tam - 6);
      ctx.closePath();
      ctx.fill();

      // Cima rocosa (sin nieve — Caribe)
      if (hash > 0.6) {
        ctx.fillStyle = 'rgba(80, 75, 65, 0.5)';
        ctx.beginPath();
        ctx.moveTo(px + tam / 2, py + 4);
        ctx.lineTo(px + tam / 2 + 5, py + 12);
        ctx.lineTo(px + tam / 2 - 5, py + 12);
        ctx.closePath();
        ctx.fill();
      }
      break;
    }

    case TILE.CAMINO: {
      // Marcas de pisadas / tierra compacta
      ctx.fillStyle = 'rgba(160, 130, 80, 0.3)';
      if (hash > 0.3) ctx.fillRect(px + 10, py + 6, 4, 3);
      if (hash > 0.5) ctx.fillRect(px + 18, py + 18, 4, 3);
      break;
    }

    case TILE.RIO: {
      // Corriente animada
      const fase = tiempo * 2 + col * 0.8;
      const oy = Math.sin(fase) * 1.5;
      ctx.strokeStyle = 'rgba(100, 180, 240, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px + 2, py + tam / 2 + oy);
      ctx.lineTo(px + tam - 2, py + tam / 2 + oy);
      ctx.stroke();
      break;
    }
  }
}
