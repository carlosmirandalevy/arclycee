// ============================================================
// MAPA-PRINCIPAL.JS - Mapa del mundo con tiles de la isla
// ============================================================
// El jugador camina libremente sobre un mapa con tiles que
// representa la isla de La Hispaniola. Los nodos (niveles)
// están ubicados en posiciones que corresponden a sus
// ubicaciones reales en la República Dominicana.
//
// El mapa es más grande que la pantalla (1536×960 vs 960×540),
// así que la cámara sigue al jugador mostrando solo la parte
// visible. El jugador no puede caminar sobre agua profunda
// ni montañas — solo por tierra, playas y caminos.
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR, TAMANO_TILE } from '../motor/configuracion.js';
import {
  generarMapaIsla,
  obtenerNodosIsla,
  dibujarTilesVisibles,
  esCaminable,
  MAPA_ANCHO,
  MAPA_ALTO
} from './mapa-tiles.js';

export class MapaPrincipal {

  constructor() {
    // --- Datos del mapa de tiles ---
    // Se genera una vez y se reutiliza
    this.tiles = null;

    // --- Nodos = lugares/niveles en el mapa ---
    // Posiciones en píxeles del mundo (no de la pantalla)
    this.nodos = [];

    // --- Caminos visibles entre nodos ---
    this.caminosActivos = [];

    // --- Cámara ---
    // Posición del "recorte" que se muestra en pantalla
    this.camaraX = 0;
    this.camaraY = 0;

    // Dimensiones del mundo en píxeles
    this.anchoMundo = MAPA_ANCHO * TAMANO_TILE;
    this.altoMundo = MAPA_ALTO * TAMANO_TILE;

    // --- Animación ---
    this.tiempoAnimacion = 0;

    // --- Bloqueo de entrada ---
    this.bloqueoEntrada = true;

    // --- Animación de nodo desbloqueándose ---
    this.nodoDesbloqueandose = null;
    this.tiempoDesbloqueo = 0;

    // --- Nodo más cercano al jugador ---
    this._nodoCercano = null;
    this._radioInteraccion = 40;

    // --- Referencia al juego ---
    this.juego = null;
  }

  // --- Construir el mapa ---
  iniciar(juego) {
    this.juego = juego;
    this.tiempoAnimacion = 0;
    this.bloqueoEntrada = true;

    // Generar el mapa de tiles (solo la primera vez)
    if (!this.tiles) {
      this.tiles = generarMapaIsla();
    }

    // --- Construir nodos desde las posiciones de tiles ---
    // Convertimos coordenadas de tile a píxeles del mundo
    const nodosIsla = obtenerNodosIsla();
    this.nodos = nodosIsla.map(n => ({
      id: n.id,
      // Centro del tile en píxeles
      x: n.tileX * TAMANO_TILE + TAMANO_TILE / 2,
      y: n.tileY * TAMANO_TILE + TAMANO_TILE / 2,
      nombre: n.nombre,
      tipo: n.tipo,
      completado: false,
      bloqueado: n.id !== 0, // Solo el primer nodo empieza desbloqueado
      conectadoA: n.conectadoA,
      escena: n.escena
    }));

    // Construir caminos entre nodos
    this.caminosActivos = [];
    for (const nodo of this.nodos) {
      for (const destinoId of nodo.conectadoA) {
        this.caminosActivos.push({
          desdeId: nodo.id,
          hastaId: destinoId
        });
      }
    }

    // Aplicar progreso guardado
    if (juego && juego.progreso) {
      for (const nodo of this.nodos) {
        if (juego.progreso.nodosCompletados &&
            juego.progreso.nodosCompletados.includes(nodo.id)) {
          nodo.completado = true;
        }
        if (juego.progreso.nodosDesbloqueados &&
            juego.progreso.nodosDesbloqueados.includes(nodo.id)) {
          nodo.bloqueado = false;
        }
      }
    }

    // Posicionar al jugador en el último nodo desbloqueado
    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';

      let nodoInicio = this.nodos[0];
      for (let i = this.nodos.length - 1; i >= 0; i--) {
        if (!this.nodos[i].bloqueado) {
          nodoInicio = this.nodos[i];
          break;
        }
      }

      // Colocar al jugador un poco debajo del nodo
      juego.jugador.x = nodoInicio.x - juego.jugador.ancho / 2;
      juego.jugador.y = nodoInicio.y + 25;

      // Centrar la cámara en el jugador inmediatamente (sin lerp)
      this.camaraX = juego.jugador.x - ANCHO_JUEGO / 2 + juego.jugador.ancho / 2;
      this.camaraY = juego.jugador.y - ALTO_JUEGO / 2 + juego.jugador.alto / 2;
      this._clampCamara();
    }
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, jugador, _companeros) {
    this.tiempoAnimacion += dt * 2;

    // Animación de desbloqueo
    if (this.nodoDesbloqueandose !== null) {
      this.tiempoDesbloqueo += dt;
      if (this.tiempoDesbloqueo > 1.5) {
        this.nodoDesbloqueandose = null;
        this.tiempoDesbloqueo = 0;
      }
      return;
    }

    if (!jugador) return;

    // --- Volver al menú con Q/Escape ---
    if (entrada.estaPresionada('cancelar') && !this.bloqueoEntrada) {
      if (this.juego && this.juego.cambiarEscena) {
        this.juego.cambiarEscena('menuPrincipal');
      }
      this.bloqueoEntrada = true;
      return;
    }

    // --- Movimiento libre del jugador ---
    jugador.velocidadX = 0;
    jugador.velocidadY = 0;
    jugador.esAnimando = false;

    if (entrada.estaPresionada('arriba')) {
      jugador.velocidadY = -VELOCIDAD_JUGADOR;
      jugador.direccion = 'arriba';
      jugador.esAnimando = true;
    }
    if (entrada.estaPresionada('abajo')) {
      jugador.velocidadY = VELOCIDAD_JUGADOR;
      jugador.direccion = 'abajo';
      jugador.esAnimando = true;
    }
    if (entrada.estaPresionada('izquierda')) {
      jugador.velocidadX = -VELOCIDAD_JUGADOR;
      jugador.direccion = 'izquierda';
      jugador.esAnimando = true;
    }
    if (entrada.estaPresionada('derecha')) {
      jugador.velocidadX = VELOCIDAD_JUGADOR;
      jugador.direccion = 'derecha';
      jugador.esAnimando = true;
    }

    // --- Aplicar movimiento con colisión de tiles ---
    const factorTiempo = dt * 60;
    const nuevoX = jugador.x + jugador.velocidadX * factorTiempo;
    const nuevoY = jugador.y + jugador.velocidadY * factorTiempo;

    // Verificar colisión horizontal (mover en X)
    if (this._puedeMoverse(nuevoX, jugador.y, jugador)) {
      jugador.x = nuevoX;
    }

    // Verificar colisión vertical (mover en Y)
    if (this._puedeMoverse(jugador.x, nuevoY, jugador)) {
      jugador.y = nuevoY;
    }

    // Animación de piernas
    if (jugador.esAnimando) {
      jugador.cuadroAnimacion = (jugador.cuadroAnimacion || 0) + dt * 8;
    }

    // --- Limitar jugador a los bordes del mundo ---
    jugador.x = Math.max(0, Math.min(this.anchoMundo - jugador.ancho, jugador.x));
    jugador.y = Math.max(0, Math.min(this.altoMundo - jugador.alto, jugador.y));

    // --- Cámara suave que sigue al jugador ---
    const objetivoCamX = jugador.x - ANCHO_JUEGO / 2 + jugador.ancho / 2;
    const objetivoCamY = jugador.y - ALTO_JUEGO / 2 + jugador.alto / 2;
    this.camaraX += (objetivoCamX - this.camaraX) * 0.08;
    this.camaraY += (objetivoCamY - this.camaraY) * 0.08;
    this._clampCamara();

    // --- Detectar nodo más cercano ---
    const centroX = jugador.x + jugador.ancho / 2;
    const centroY = jugador.y + jugador.alto / 2;
    this._nodoCercano = null;

    for (const nodo of this.nodos) {
      const dx = centroX - nodo.x;
      const dy = centroY - nodo.y;
      const distancia = Math.sqrt(dx * dx + dy * dy);

      if (distancia < this._radioInteraccion) {
        this._nodoCercano = nodo;
        break;
      }
    }

    // --- Entrar al nivel con E ---
    if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      if (this._nodoCercano) {
        if (this._nodoCercano.bloqueado) {
          if (this.juego && this.juego.mostrarToast) {
            this.juego.mostrarToast(`🔒 ${this._nodoCercano.nombre} — completa el nivel anterior`);
          }
        } else if (this.juego && this.juego.cambiarEscena && this._nodoCercano.escena) {
          this.juego.cambiarEscena(this._nodoCercano.escena);
        }
      }
      this.bloqueoEntrada = true;
    }

    // Desbloquear cuando se sueltan las teclas
    if (!entrada.estaPresionada('accion') && !entrada.estaPresionada('cancelar')) {
      this.bloqueoEntrada = false;
    }
  }

  // --- Dibujar el mapa ---
  dibujar(renderizador, ancho, alto, textos, jugador) {
    const ctx = renderizador.ctx;

    // --- Tiles del mundo (con offset de cámara) ---
    if (this.tiles) {
      dibujarTilesVisibles(
        ctx, this.tiles,
        this.camaraX, this.camaraY,
        ancho, alto,
        this.tiempoAnimacion
      );
    }

    // --- Caminos entre nodos (con offset de cámara) ---
    for (const camino of this.caminosActivos) {
      const desde = this.nodos[camino.desdeId];
      const hasta = this.nodos[camino.hastaId];
      if (!desde || !hasta) continue;

      const estaActivo = !hasta.bloqueado;
      ctx.strokeStyle = estaActivo ? 'rgba(200, 168, 78, 0.6)' : 'rgba(85, 85, 85, 0.4)';
      ctx.lineWidth = estaActivo ? 3 : 2;
      ctx.setLineDash(estaActivo ? [8, 6] : [4, 8]);

      ctx.beginPath();
      ctx.moveTo(desde.x - this.camaraX, desde.y - this.camaraY);
      ctx.lineTo(hasta.x - this.camaraX, hasta.y - this.camaraY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // --- Nodos (con offset de cámara) ---
    const nodoCercano = this._nodoCercano;
    for (const nodo of this.nodos) {
      const nx = nodo.x - this.camaraX;
      const ny = nodo.y - this.camaraY;

      // Solo dibujar nodos visibles en pantalla
      if (nx < -50 || nx > ancho + 50 || ny < -50 || ny > alto + 50) continue;

      const esCercano = nodoCercano && nodo.id === nodoCercano.id;
      const estaDesbloqueandose = nodo.id === this.nodoDesbloqueandose;

      let radio = esCercano ? 22 : 18;
      if (estaDesbloqueandose) {
        radio += Math.sin(this.tiempoDesbloqueo * 8) * 5;
      }

      // Color según estado
      if (nodo.bloqueado) {
        ctx.fillStyle = 'rgba(58, 58, 58, 0.8)';
      } else if (nodo.completado) {
        ctx.fillStyle = '#44AA44';
      } else {
        ctx.fillStyle = '#C8A84E';
      }

      // Círculo del nodo
      ctx.beginPath();
      ctx.arc(nx, ny, radio, 0, Math.PI * 2);
      ctx.fill();

      // Borde
      ctx.strokeStyle = esCercano ? '#FFD700' : '#222222';
      ctx.lineWidth = esCercano ? 3 : 2;
      ctx.stroke();

      // Ícono
      ctx.font = '14px monospace';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';

      const iconos = {
        cueva: '⛏', aldea: '🏘', ciudad: '🏛',
        naufragio: '⚓', juridico: '⚖️', museo: '🏛'
      };
      ctx.fillText(iconos[nodo.tipo] || '●', nx, ny + 5);

      // Marca de completado
      if (nodo.completado) {
        ctx.font = 'bold 16px monospace';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('✓', nx + radio + 5, ny - 5);
      }

      // Candado
      if (nodo.bloqueado) {
        ctx.font = '12px monospace';
        ctx.fillStyle = '#888888';
        ctx.fillText('🔒', nx, ny + radio + 15);
      }

      // Nombre
      ctx.font = nodo.bloqueado ? '11px monospace' : '12px monospace';
      ctx.fillStyle = nodo.bloqueado ? '#666666' : '#FFFFFF';

      // Fondo semitransparente para legibilidad sobre tiles
      const medida = ctx.measureText(nodo.nombre);
      const fondoAncho = medida.width + 8;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(nx - fondoAncho / 2, ny + radio + 18, fondoAncho, 16);

      ctx.fillStyle = nodo.bloqueado ? '#888888' : '#FFFFFF';
      ctx.fillText(nodo.nombre, nx, ny + radio + 30);

      // Indicador [E] si está cerca
      if (esCercano) {
        const pulso = 0.7 + Math.sin(this.tiempoAnimacion * 3) * 0.3;
        ctx.font = 'bold 13px monospace';
        ctx.fillStyle = `rgba(255, 215, 0, ${pulso})`;
        ctx.fillText('[E] Entrar', nx, ny - radio - 10);
      }
    }

    // --- Jugador (con offset de cámara) ---
    if (jugador) {
      this._dibujarJugador(ctx, jugador);
    }

    // --- Título del mundo (fijo en pantalla, no se mueve con la cámara) ---
    const idCercano = nodoCercano ? nodoCercano.id : -1;
    const esMuseo = idCercano === 7;
    const esJuridico = idCercano === 6;
    const esAcuatico = idCercano === 5;
    const esColonial = idCercano >= 3 && idCercano < 5;
    const tituloMundo = esMuseo
      ? (textos?.mundos?.laboratorio || 'Laboratorio / Museo')
      : esJuridico
        ? (textos?.mundos?.juridico || 'Mundo Jurídico')
        : esAcuatico
          ? (textos?.mundos?.acuatico || 'Mundo Acuático')
          : esColonial
            ? (textos?.mundos?.colonial || 'Mundo Colonial')
            : (textos?.mundos?.taino || 'Mundo Taíno');

    // Fondo para el título
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(ancho / 2 - 150, 5, 300, 30);

    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.fillText(tituloMundo, ancho / 2, 28);

    // --- Info del nodo cercano ---
    if (nodoCercano) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(ancho / 2 - 200, alto - 65, 400, 30);

      ctx.font = 'bold 14px monospace';
      ctx.fillStyle = nodoCercano.bloqueado ? '#888888' : '#FFFFFF';
      ctx.fillText(nodoCercano.nombre, ancho / 2, alto - 45);

      if (nodoCercano.bloqueado) {
        ctx.font = '11px monospace';
        ctx.fillStyle = '#cc4444';
        ctx.fillText('🔒 Bloqueado — completa el nivel anterior', ancho / 2, alto - 32);
      } else if (nodoCercano.completado) {
        ctx.font = '11px monospace';
        ctx.fillStyle = '#44AA44';
        ctx.fillText('(Completado)', ancho / 2, alto - 32);
      }
    }

    // --- Instrucciones ---
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(ancho / 2 - 250, alto - 22, 500, 18);
    ctx.font = '11px monospace';
    ctx.fillStyle = '#AAAAAA';
    ctx.fillText(
      'E: entrar | I: inventario | R: mapa real | Q: menú',
      ancho / 2, alto - 8
    );

    // --- Mini-mapa (esquina superior derecha) ---
    this._dibujarMiniMapa(ctx, ancho, jugador);

    ctx.textAlign = 'left';
  }

  // --- Desbloquear un nodo ---
  desbloquearNodo(id) {
    const nodo = this.nodos.find(n => n.id === id);
    if (nodo && nodo.bloqueado) {
      nodo.bloqueado = false;
      this.nodoDesbloqueandose = id;
      this.tiempoDesbloqueo = 0;
    }
  }

  // ============================================================
  // MÉTODOS INTERNOS
  // ============================================================

  /** Limita la cámara a los bordes del mundo */
  _clampCamara() {
    this.camaraX = Math.max(0, Math.min(this.anchoMundo - ANCHO_JUEGO, this.camaraX));
    this.camaraY = Math.max(0, Math.min(this.altoMundo - ALTO_JUEGO, this.camaraY));
  }

  /**
   * Verifica si el jugador puede moverse a la posición indicada.
   * Revisa las 4 esquinas del sprite contra los tiles del mapa.
   */
  _puedeMoverse(x, y, jugador) {
    if (!this.tiles) return true;

    // Márgenes internos del sprite (no usar las esquinas exactas,
    // sino un poco adentro para que el movimiento sea más fluido)
    const margen = 4;
    const izq = x + margen;
    const der = x + jugador.ancho - margen;
    const arr = y + margen;
    const aba = y + jugador.alto - margen;

    // Convertir a coordenadas de tile
    const colIzq = Math.floor(izq / TAMANO_TILE);
    const colDer = Math.floor(der / TAMANO_TILE);
    const filaArr = Math.floor(arr / TAMANO_TILE);
    const filaAba = Math.floor(aba / TAMANO_TILE);

    // Verificar las 4 esquinas
    return esCaminable(this.tiles, colIzq, filaArr) &&
           esCaminable(this.tiles, colDer, filaArr) &&
           esCaminable(this.tiles, colIzq, filaAba) &&
           esCaminable(this.tiles, colDer, filaAba);
  }

  /** Dibuja un mini-mapa en la esquina superior derecha */
  _dibujarMiniMapa(ctx, ancho, jugador) {
    const mmAncho = 120;
    const mmAlto = 75;
    const mmX = ancho - mmAncho - 10;
    const mmY = 10;

    // Fondo
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(mmX - 2, mmY - 2, mmAncho + 4, mmAlto + 4);

    // Borde
    ctx.strokeStyle = 'rgba(200, 168, 78, 0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(mmX - 2, mmY - 2, mmAncho + 4, mmAlto + 4);

    // Escala del mini-mapa
    const escalaX = mmAncho / this.anchoMundo;
    const escalaY = mmAlto / this.altoMundo;

    // Dibujar tiles simplificados (solo forma de la isla)
    if (this.tiles) {
      const paso = 2; // Saltar tiles para rendimiento
      for (let fila = 0; fila < MAPA_ALTO; fila += paso) {
        for (let col = 0; col < MAPA_ANCHO; col += paso) {
          const tipo = this.tiles[fila][col];
          if (tipo >= 2) { // Solo tierra
            const color = tipo === 5 ? '#6a5a4a' : tipo === 4 ? '#2a4a1a' : '#3a6a2a';
            ctx.fillStyle = color;
            const tx = mmX + col * TAMANO_TILE * escalaX;
            const ty = mmY + fila * TAMANO_TILE * escalaY;
            ctx.fillRect(tx, ty, TAMANO_TILE * escalaX * paso, TAMANO_TILE * escalaY * paso);
          }
        }
      }
    }

    // Nodos en el mini-mapa
    for (const nodo of this.nodos) {
      const nx = mmX + nodo.x * escalaX;
      const ny = mmY + nodo.y * escalaY;
      ctx.fillStyle = nodo.bloqueado ? '#555555' : nodo.completado ? '#44AA44' : '#FFD700';
      ctx.beginPath();
      ctx.arc(nx, ny, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Posición del jugador en el mini-mapa
    if (jugador) {
      const px = mmX + jugador.x * escalaX;
      const py = mmY + jugador.y * escalaY;
      ctx.fillStyle = '#FF4444';
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Vista de cámara en el mini-mapa
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(
      mmX + this.camaraX * escalaX,
      mmY + this.camaraY * escalaY,
      ANCHO_JUEGO * escalaX,
      ALTO_JUEGO * escalaY
    );
  }

  /** Dibujar jugador con offset de cámara */
  _dibujarJugador(ctx, jugador) {
    const px = jugador.x - this.camaraX;
    const py = jugador.y - this.camaraY;
    const genero = jugador.genero || 'pepito';

    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(px + jugador.ancho / 2, py + jugador.alto + 2, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cuerpo
    const colorCuerpo = genero === 'pepito' ? '#4488ff' : '#aa44ff';
    ctx.fillStyle = colorCuerpo;
    ctx.fillRect(px + 4, py + 10, 20, 16);

    // Cabeza
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(px + 6, py, 16, 14);

    // Pelo
    ctx.fillStyle = genero === 'pepito' ? '#2a1a0a' : '#1a0a00';
    if (genero === 'pepito') {
      ctx.fillRect(px + 5, py - 2, 18, 6);
    } else {
      ctx.fillRect(px + 4, py - 2, 20, 6);
      ctx.fillRect(px + 3, py + 2, 4, 10);
      ctx.fillRect(px + 21, py + 2, 4, 10);
    }

    // Ojos
    ctx.fillStyle = '#FFFFFF';
    let ojoDx = 0, ojoDy = 0;
    if (jugador.direccion === 'izquierda') ojoDx = -1;
    if (jugador.direccion === 'derecha') ojoDx = 1;
    if (jugador.direccion === 'arriba') ojoDy = -1;
    if (jugador.direccion === 'abajo') ojoDy = 1;

    ctx.fillRect(px + 9 + ojoDx, py + 4 + ojoDy, 3, 3);
    ctx.fillRect(px + 16 + ojoDx, py + 4 + ojoDy, 3, 3);
    ctx.fillStyle = '#000000';
    ctx.fillRect(px + 10 + ojoDx, py + 5 + ojoDy, 1.5, 1.5);
    ctx.fillRect(px + 17 + ojoDx, py + 5 + ojoDy, 1.5, 1.5);

    // Piernas con animación
    ctx.fillStyle = '#2a5599';
    const pasoAnim = jugador.esAnimando ? Math.sin((jugador.cuadroAnimacion || 0) * 5) * 3 : 0;
    ctx.fillRect(px + 6, py + 26 + pasoAnim, 7, 8);
    ctx.fillRect(px + 15, py + 26 - pasoAnim, 7, 8);

    // Zapatos
    ctx.fillStyle = '#4a3520';
    ctx.fillRect(px + 5, py + 32 + pasoAnim, 8, 3);
    ctx.fillRect(px + 15, py + 32 - pasoAnim, 8, 3);
  }
}
