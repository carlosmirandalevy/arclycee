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
// 64 columnas × 34 filas = 2048 × 1088 píxeles
// Más grande que el mapa anterior (48×30) para representar
// toda La Hispaniola con sus dos penínsulas haitianas,
// la Península de Samaná, y la extensión de Punta Cana.
export const MAPA_ANCHO = 64;
export const MAPA_ALTO = 34;

// --- Bitmap de la isla ---
// Cada string representa una fila del mapa (64 caracteres = 64 columnas).
// '1' = tierra, '0' = agua. Trazado desde la imagen de referencia
// pixelada (resources/hispaniola-map-pixelated-tiled.png) para máxima
// fidelidad a la forma real de La Hispaniola.
//
// Características geográficas visibles en el bitmap:
// - Península NW de Haití (filas 3-7, cols 11-18)
// - Península Tiburon / SW de Haití (filas 19-27, cols 2-11)
// - Golfo de la Gonâve (espacio entre las dos penínsulas)
// - Île de la Gonâve (fila 16, cols 12-15)
// - Valle del Cibao (fila 7-9, centro)
// - Bahía de Samaná (filas 9-13, cols 47+, abierta al este)
// - Punta Cana (filas 11-15, cols 50-60+)
// - Costa sur con bahías (filas 23-25)
const ISLA_BITMAP = [
  '0000000000000000000000000000000000000000000000000000000000000000', // 0
  '0000000000000000000000000000000000000000000000000000000000000000', // 1
  '0000000000000000000000000000000000000000000000000000000000000000', // 2
  '0000000000000000111000000000000000000000000000000000000000000000', // 3
  '0000000000000001111100000000000000000000000000000000000000000000', // 4
  '0000000000000111111110000000111111111100000000000000000000000000', // 5
  '0000000000011111111111111001111111111111000000000000000000000000', // 6
  '0000000000011111111111111111111111111111111000000000000000000000', // 7
  '0000000000011111111111111111111111111111111111100000000000000000', // 8
  '0000000000001111111111111111111111111111111111100000000000000000', // 9
  '0000000000000000111111111111111111111111111111100000000000000000', // 10
  '0000000000000000011111111111111111111111111111110011110000000000', // 11
  '0000000000000000011111111111111111111111111111111111110000000000', // 12
  '0000000000000000011111111111111111111111111111111111110000000000', // 13
  '0000000000000000011111111111111111111111111111111111111111000000', // 14
  '0000000000000000011111111111111111111111111111111111111111000000', // 15
  '0000000000001111000111111111111111111111111111111111111111100000', // 16  Gonâve (12-15) separada por canal (16)
  '0000000000000111000111111111111111111111111111111111111111110000', // 17  Canal de agua entre Gonâve y tierra firme
  '0000000000000000001111111111111111111111111111111111111111111000', // 18
  '0011111011000001111111111111111111111111111111111111111111111100', // 19
  '0011111111111000000111111011111111111111111111111111111111111110', // 20
  '0111111111111111111111111111101111111111111111111111111111111100', // 21
  '0111111111111111111111111111111111111111111111111111111111111100', // 22
  '0011111111111111111111111111111111111111111110000000001111111000', // 23
  '0000011111111111111111111111111111111001111110000000000011110000', // 24
  '0000001111100011111110000011111111110000110000000000000001111000', // 25
  '0000001111100000000000000001111111100000000000000000000000110000', // 26
  '0000000110000000000000000000111111100000000000000000000000000000', // 27
  '0000000000000000000000000000111111000000000000000000000000000000', // 28
  '0000000000000000000000000000111111000000000000000000000000000000', // 29
  '0000000000000000000000000000011110000000000000000000000000000000', // 30
  '0000000000000000000000000000011100000000000000000000000000000000', // 31
  '0000000000000000000000000000010000000000000000000000000000000000', // 32
  '0000000000000000000000000000000000000000000000000000000000000000', // 33
];

// --- Lagos interiores ---
// Grandes cuerpos de agua dentro de la isla, se dibujan como
// tiles de río sobre tierra firme.
const LAGOS = [
  // Lago Enriquillo (suroeste de RD, el lago más grande del Caribe)
  { cx: 20, cy: 18, rx: 2.5, ry: 1 },
  // Lac Étang Saumâtre (Haití, justo cruzando la frontera)
  { cx: 17, cy: 17, rx: 2, ry: 0.8 }
];

// --- Cordilleras ---
// Líneas de montañas que cruzan la isla. Cada array es una cadena
// montañosa definida como puntos. Los tiles cercanos se pintan montaña.
// Trazadas desde el mapa de referencia (resources/hispaniola-map.png).
const CORDILLERAS = [
  // Cordillera Central (RD — Pico Duarte 3098m, la más alta del Caribe)
  [{ x: 24, y: 13 }, { x: 29, y: 14 }, { x: 34, y: 15 }, { x: 39, y: 16 }],
  // Cordillera Septentrional (norte de RD, paralela a la costa)
  [{ x: 26, y: 10 }, { x: 32, y: 10 }, { x: 38, y: 10 }],
  // Sierra de Bahoruco (suroeste RD, frontera con Haití)
  [{ x: 20, y: 20 }, { x: 24, y: 19 }],
  // Massif de la Hotte (Haití — península sur)
  [{ x: 5, y: 19 }, { x: 10, y: 17 }],
  // Massif de la Selle (Haití — el más alto de Haití, Pic la Selle 2680m)
  [{ x: 14, y: 16 }, { x: 18, y: 15 }],
  // Massif du Nord (Haití — Citadelle Laferrière en la cima)
  [{ x: 5, y: 10 }, { x: 11, y: 11 }]
];

// --- Ríos principales ---
// Cada río es una lista de puntos (en tiles) que se conectan
const RIOS = [
  // Río Yaque del Norte (desde Cordillera Central hacia el noroeste, desemboca en Montecristi)
  [{ x: 29, y: 14 }, { x: 26, y: 12 }, { x: 22, y: 11 }, { x: 19, y: 10 }],
  // Río Yaque del Sur (hacia la Bahía de Neiba)
  [{ x: 30, y: 15 }, { x: 27, y: 18 }, { x: 24, y: 20 }],
  // Río Ozama (hacia Santo Domingo)
  [{ x: 34, y: 14 }, { x: 35, y: 16 }, { x: 36, y: 18 }],
  // Río Artibonite (el más largo de Haití, nace en RD, cruza la frontera)
  [{ x: 23, y: 13 }, { x: 19, y: 13 }, { x: 15, y: 12 }]
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
        if (distCordillera < 1.8) {
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
  // Conectar las ubicaciones del juego con senderos
  const nodos = obtenerNodosIsla();
  for (let i = 0; i < nodos.length - 1; i++) {
    const desde = nodos[i];
    const hasta = nodos[i + 1];
    // Solo dibujar camino si ambos están conectados
    if (desde.conectadoA && desde.conectadoA.includes(hasta.id)) {
      _dibujarCaminoTile(tiles, desde.tileX, desde.tileY, hasta.tileX, hasta.tileY);
    }
  }

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
      // San Cristóbal — al sur de Santo Domingo, donde están las cuevas reales
      id: 0,
      tileX: 21, tileY: 17,
      nombre: 'Cuevas del Pomier',
      tipo: 'cueva',
      escena: 'cuevasPomier',
      conectadoA: [1]
    },
    {
      // Cerca de Pomier, ligeramente al oeste (aldea taína cercana a las cuevas)
      id: 1,
      tileX: 19, tileY: 17,
      nombre: 'Asentamiento Taino I',
      tipo: 'aldea',
      escena: 'asentamientoTaino1',
      conectadoA: [2]
    },
    {
      // Cerca de Pomier, ligeramente al noreste
      id: 2,
      tileX: 22, tileY: 16,
      nombre: 'Asentamiento Taino II',
      tipo: 'aldea',
      escena: 'asentamientoTaino2',
      conectadoA: [3]
    },
    {
      // Costa noroeste — Puerto Plata, donde está La Isabela real
      id: 3,
      tileX: 13, tileY: 8,
      nombre: 'La Isabela',
      tipo: 'ciudad',
      escena: 'mundoColonial',
      conectadoA: [4]
    },
    {
      // Santo Domingo — costa sur-central, donde está la Zona Colonial real
      id: 4,
      tileX: 26, tileY: 17,
      nombre: 'Zona Colonial',
      tipo: 'ciudad',
      escena: 'zonaColonial',
      conectadoA: [5]
    },
    {
      // Costa sur — naufragio en agua cerca de la costa
      id: 5,
      tileX: 37, tileY: 24,
      nombre: 'Naufragio La Pinta',
      tipo: 'naufragio',
      escena: 'mundoAcuatico',
      conectadoA: [6]
    },
    {
      // Extremo este de la isla — Punta Cana real
      id: 6,
      tileX: 42, tileY: 14,
      nombre: 'Aeropuerto Punta Cana',
      tipo: 'juridico',
      escena: 'mundoJuridico',
      conectadoA: [7]
    },
    {
      // Santo Domingo — cerca de la Zona Colonial, donde está el museo real
      id: 7,
      tileX: 28, tileY: 16,
      nombre: 'Museo Atarazanas',
      tipo: 'museo',
      escena: 'mundoLaboratorio',
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

      // Nieve en la cima (solo montañas altas)
      if (hash > 0.6) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
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
