// ============================================================
// MAPA-TILES.JS - Sistema de tiles para el mapa de la isla
// ============================================================
// Genera y dibuja un mapa con tiles que representa la isla de
// La Hispaniola (República Dominicana). En vez de un fondo
// simple con gradientes, ahora el mapa tiene tierra, agua,
// montañas, bosques y playas — como un mapa real.
//
// La forma de la isla se genera con elipses que simulan la
// costa dominicana. Los tiles se dibujan como cuadrados de
// 32×32 píxeles con colores y detalles procedurales.
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
// 48 columnas × 30 filas = 1536 × 960 píxeles
// La pantalla muestra 30×17 tiles a la vez
export const MAPA_ANCHO = 48;
export const MAPA_ALTO = 30;

// --- Formas que componen la isla ---
// Cada elipse define una "masa de tierra". Si un punto
// está dentro de cualquiera de estas elipses, es tierra.
// Los valores (cx, cy) son el centro en coordenadas de tile,
// (rx, ry) son los radios horizontal y vertical.
const FORMAS_ISLA = [
  // Cuerpo principal de la isla (centro-este)
  { cx: 25, cy: 15, rx: 17, ry: 7 },
  // Valle del Cibao (norte, zona agrícola)
  { cx: 17, cy: 10, rx: 10, ry: 4 },
  // Extensión noroeste (Montecristi → Puerto Plata)
  { cx: 11, cy: 9, rx: 7, ry: 3.5 },
  // Península de Samaná (noreste)
  { cx: 34, cy: 10, rx: 6, ry: 2.5 },
  // Extensión sur (Baní → Barahona)
  { cx: 20, cy: 20, rx: 9, ry: 5 },
  // Punta Cana / extremo este
  { cx: 40, cy: 14, rx: 6, ry: 4 },
  // Costa sureste (San Pedro, La Romana)
  { cx: 35, cy: 18, rx: 7, ry: 4 }
];

// --- Bahías y entrantes de agua ---
// Estas elipses "recortan" la tierra para crear bahías
const BAHIAS = [
  // Bahía de Samaná (entre la península y el continente)
  { cx: 30, cy: 11, rx: 4, ry: 2.5 },
  // Bahía de Neiba (suroeste)
  { cx: 13, cy: 20, rx: 3, ry: 3 },
  // Bahía de Ocoa
  { cx: 19, cy: 22, rx: 2.5, ry: 2 }
];

// --- Cordillera Central ---
// Línea de montañas que cruza la isla de noroeste a sureste.
// Definida como puntos de una línea; los tiles cercanos son montaña.
const CORDILLERA = [
  { x: 10, y: 11 },
  { x: 15, y: 13 },
  { x: 20, y: 14 },
  { x: 25, y: 15 },
  { x: 30, y: 16 }
];

// --- Ríos principales ---
// Cada río es una lista de puntos (en tiles) que se conectan
const RIOS = [
  // Río Yaque del Norte (desde Cordillera hacia el noroeste)
  [{ x: 18, y: 13 }, { x: 15, y: 12 }, { x: 12, y: 11 }, { x: 9, y: 10 }],
  // Río Yaque del Sur (hacia el suroeste)
  [{ x: 20, y: 15 }, { x: 18, y: 18 }, { x: 16, y: 21 }],
  // Río Ozama (hacia Santo Domingo)
  [{ x: 25, y: 14 }, { x: 27, y: 16 }, { x: 28, y: 18 }]
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

  // --- Paso 4: Montañas (Cordillera Central) ---
  for (let fila = 0; fila < MAPA_ALTO; fila++) {
    for (let col = 0; col < MAPA_ANCHO; col++) {
      if (tiles[fila][col] === TILE.PRADERA) {
        const distCordillera = _distanciaACordillera(col, fila);
        if (distCordillera < 1.8) {
          tiles[fila][col] = TILE.MONTANA;
        }
      }
    }
  }

  // --- Paso 5: Bosques (basado en pseudo-ruido) ---
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
      id: 0,
      tileX: 20, tileY: 19,
      nombre: 'Cuevas del Pomier',
      tipo: 'cueva',
      escena: 'cuevasPomier',
      conectadoA: [1]
    },
    {
      id: 1,
      tileX: 17, tileY: 16,
      nombre: 'Asentamiento Taino I',
      tipo: 'aldea',
      escena: 'asentamientoTaino1',
      conectadoA: [2]
    },
    {
      id: 2,
      tileX: 22, tileY: 14,
      nombre: 'Asentamiento Taino II',
      tipo: 'aldea',
      escena: 'asentamientoTaino2',
      conectadoA: [3]
    },
    {
      id: 3,
      tileX: 11, tileY: 8,
      nombre: 'La Isabela',
      tipo: 'ciudad',
      escena: 'mundoColonial',
      conectadoA: [4]
    },
    {
      id: 4,
      tileX: 28, tileY: 17,
      nombre: 'Zona Colonial',
      tipo: 'ciudad',
      escena: 'zonaColonial',
      conectadoA: [5]
    },
    {
      id: 5,
      tileX: 32, tileY: 20,
      nombre: 'Naufragio La Pinta',
      tipo: 'naufragio',
      escena: 'mundoAcuatico',
      conectadoA: [6]
    },
    {
      id: 6,
      tileX: 42, tileY: 14,
      nombre: 'Aeropuerto Punta Cana',
      tipo: 'juridico',
      escena: 'mundoJuridico',
      conectadoA: [7]
    },
    {
      id: 7,
      tileX: 29, tileY: 15,
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

/** ¿Este punto (col, fila) es tierra según las elipses? */
function _esTierra(col, fila) {
  let dentroForma = false;

  // Verificar si está dentro de alguna masa de tierra
  for (const f of FORMAS_ISLA) {
    const dx = (col - f.cx) / f.rx;
    const dy = (fila - f.cy) / f.ry;
    if (dx * dx + dy * dy <= 1) {
      dentroForma = true;
      break;
    }
  }

  if (!dentroForma) return false;

  // Verificar si está dentro de alguna bahía (recorta la tierra)
  for (const b of BAHIAS) {
    const dx = (col - b.cx) / b.rx;
    const dy = (fila - b.cy) / b.ry;
    if (dx * dx + dy * dy <= 0.85) {
      return false;
    }
  }

  return true;
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

/** Distancia mínima de un punto a la Cordillera Central */
function _distanciaACordillera(col, fila) {
  let minDist = Infinity;

  for (let i = 0; i < CORDILLERA.length - 1; i++) {
    const a = CORDILLERA[i];
    const b = CORDILLERA[i + 1];
    const dist = _distanciaPuntoASegmento(col, fila, a.x, a.y, b.x, b.y);
    if (dist < minDist) minDist = dist;
  }

  return minDist;
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
