// ============================================================
// MAPA-PRINCIPAL.JS - Mapa del mundo con exploración libre
// ============================================================
// El jugador camina libremente por el mapa con el mismo sprite
// que usa en el resto del juego. Los nodos (niveles) son lugares
// a los que puede acercarse y entrar con E. Si el nodo está
// bloqueado, le avisamos con un mensaje en vez de impedirle
// caminar — así puede explorar todo el mapa y ver qué le espera.
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR } from '../motor/configuracion.js';

export class MapaPrincipal {

  constructor() {
    // Nodos = lugares/niveles en el mapa
    this.nodos = [];

    // Caminos visibles entre nodos (líneas en el mapa)
    this.caminosActivos = [];

    // Animación general (para pulsos, brillo, etc.)
    this.tiempoAnimacion = 0;

    // Bloqueo de entrada (para el botón de acción)
    this.bloqueoEntrada = true;

    // Animación de nodo desbloqueándose
    this.nodoDesbloqueandose = null;
    this.tiempoDesbloqueo = 0;

    // Nodo cercano al jugador (para mostrar info y permitir entrar)
    this._nodoCercano = null;

    // Radio de proximidad para interactuar con un nodo
    this._radioInteraccion = 40;

    // Referencia al juego
    this.juego = null;
  }

  // --- Construir el mapa ---
  iniciar(juego) {
    this.juego = juego;
    this.tiempoAnimacion = 0;
    this.bloqueoEntrada = true;

    // --- Definir los nodos ---
    // Las posiciones simulan un camino por la geografía dominicana
    this.nodos = [
      {
        id: 0,
        x: 120, y: 380,
        nombre: 'Cuevas del Pomier',
        tipo: 'cueva',
        completado: false,
        bloqueado: false,
        conectadoA: [1],
        escena: 'cuevasPomier'
      },
      {
        id: 1,
        x: 300, y: 280,
        nombre: 'Asentamiento Taino I',
        tipo: 'aldea',
        completado: false,
        bloqueado: true,
        conectadoA: [2],
        escena: 'asentamientoTaino1'
      },
      {
        id: 2,
        x: 530, y: 200,
        nombre: 'Asentamiento Taino II',
        tipo: 'aldea',
        completado: false,
        bloqueado: true,
        conectadoA: [3],
        escena: 'asentamientoTaino2'
      },
      {
        id: 3,
        x: 780, y: 300,
        nombre: 'La Isabela',
        tipo: 'ciudad',
        completado: false,
        bloqueado: true,
        conectadoA: [4],
        escena: 'mundoColonial'
      },
      // --- Mundo Colonial ---
      {
        id: 4,
        x: 780, y: 460,
        nombre: 'Zona Colonial',
        tipo: 'ciudad',
        completado: false,
        bloqueado: true,
        conectadoA: [5],
        escena: 'zonaColonial'
      },
      // --- Mundo Acuático ---
      {
        id: 5,
        x: 620, y: 460,
        nombre: 'Naufragio La Pinta',
        tipo: 'naufragio',
        completado: false,
        bloqueado: true,
        conectadoA: [6],
        escena: 'mundoAcuatico'
      },
      // --- Mundo Jurídico ---
      {
        id: 6,
        x: 720, y: 340,
        nombre: 'Aeropuerto Las Américas',
        tipo: 'juridico',
        completado: false,
        bloqueado: true,
        conectadoA: [7],
        escena: 'mundoJuridico'
      },
      // --- Mundo Laboratorio ---
      {
        id: 7,
        x: 530, y: 340,
        nombre: 'Museo Atarazanas',
        tipo: 'museo',
        completado: false,
        bloqueado: true,
        conectadoA: [],
        escena: 'mundoLaboratorio'
      }
    ];

    // Construir los caminos a partir de las conexiones de cada nodo
    this.caminosActivos = [];
    for (const nodo of this.nodos) {
      for (const destinoId of nodo.conectadoA) {
        this.caminosActivos.push({
          desdeId: nodo.id,
          hastaId: destinoId
        });
      }
    }

    // Si hay datos de progreso guardados, aplicarlos
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

    // Posicionar al jugador cerca del último nodo desbloqueado
    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';

      // Buscar el último nodo desbloqueado para colocar al jugador ahí
      let nodoInicio = this.nodos[0];
      for (let i = this.nodos.length - 1; i >= 0; i--) {
        if (!this.nodos[i].bloqueado) {
          nodoInicio = this.nodos[i];
          break;
        }
      }

      // Colocar al jugador un poco debajo del nodo para que no tape el ícono
      juego.jugador.x = nodoInicio.x - juego.jugador.ancho / 2;
      juego.jugador.y = nodoInicio.y + 25;
    }
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, jugador, _companeros) {
    this.tiempoAnimacion += dt * 2;

    // Animación de desbloqueo (si hay un nodo desbloqueándose)
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
    // Igual que en los mundos top-down: WASD/flechas para caminar
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

    // Aplicar movimiento
    const factorTiempo = dt * 60;
    jugador.x += jugador.velocidadX * factorTiempo;
    jugador.y += jugador.velocidadY * factorTiempo;

    // Animación de piernas
    if (jugador.esAnimando) {
      jugador.cuadroAnimacion = (jugador.cuadroAnimacion || 0) + dt * 8;
    }

    // --- Limitar al jugador dentro del mapa ---
    jugador.x = Math.max(0, Math.min(ANCHO_JUEGO - jugador.ancho, jugador.x));
    jugador.y = Math.max(40, Math.min(ALTO_JUEGO - jugador.alto - 30, jugador.y));

    // --- Detectar el nodo más cercano ---
    const centrox = jugador.x + jugador.ancho / 2;
    const centroY = jugador.y + jugador.alto / 2;
    this._nodoCercano = null;

    for (const nodo of this.nodos) {
      const dx = centrox - nodo.x;
      const dy = centroY - nodo.y;
      const distancia = Math.sqrt(dx * dx + dy * dy);

      if (distancia < this._radioInteraccion) {
        this._nodoCercano = nodo;
        break;
      }
    }

    // --- Entrar al nivel con acción (E o Enter) ---
    if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      if (this._nodoCercano) {
        if (this._nodoCercano.bloqueado) {
          if (this.juego && this.juego.mostrarToast) {
            this.juego.mostrarToast(`🔒 ${this._nodoCercano.nombre} — completa el nivel anterior para desbloquear`);
          }
        } else if (this.juego && this.juego.cambiarEscena && this._nodoCercano.escena) {
          this.juego.cambiarEscena(this._nodoCercano.escena);
        }
      }
      this.bloqueoEntrada = true;
    }

    // Desbloquear botón de acción cuando se suelta
    if (!entrada.estaPresionada('accion') && !entrada.estaPresionada('cancelar')) {
      this.bloqueoEntrada = false;
    }
  }

  // --- Dibujar el mapa ---
  dibujar(renderizador, ancho, alto, textos, jugador) {
    const ctx = renderizador.ctx;

    // --- Fondo del mapa ---
    // Degradado verde/marrón que evoca la isla caribeña
    const gradienteFondo = ctx.createLinearGradient(0, 0, ancho, alto);
    gradienteFondo.addColorStop(0, '#2d5a27');
    gradienteFondo.addColorStop(0.5, '#3a6b35');
    gradienteFondo.addColorStop(1, '#5a4a2f');
    ctx.fillStyle = gradienteFondo;
    ctx.fillRect(0, 0, ancho, alto);

    // Detalles del terreno (manchas de color para simular vegetación)
    ctx.fillStyle = 'rgba(34, 80, 30, 0.4)';
    ctx.fillRect(50, 100, 120, 80);
    ctx.fillRect(400, 50, 100, 60);
    ctx.fillRect(700, 150, 150, 90);

    // Agua (un río que cruza el mapa)
    ctx.fillStyle = 'rgba(40, 80, 140, 0.3)';
    ctx.fillRect(0, 440, ancho, 100);

    // --- Título del mundo ---
    // Cambia según la zona cercana al jugador
    const nodoCercano = this._nodoCercano;
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

    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.fillText(tituloMundo, ancho / 2, 35);

    // --- Separador visual entre mundos ---
    ctx.strokeStyle = 'rgba(200, 168, 78, 0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 8]);
    ctx.beginPath();
    ctx.moveTo(30, 390);
    ctx.lineTo(ancho - 30, 390);
    ctx.stroke();
    ctx.setLineDash([]);

    // --- Caminos entre nodos ---
    for (const camino of this.caminosActivos) {
      const desde = this.nodos[camino.desdeId];
      const hasta = this.nodos[camino.hastaId];
      if (!desde || !hasta) continue;

      const estaActivo = !hasta.bloqueado;
      ctx.strokeStyle = estaActivo ? '#C8A84E' : '#555555';
      ctx.lineWidth = estaActivo ? 3 : 2;
      ctx.setLineDash(estaActivo ? [8, 6] : [4, 8]);

      ctx.beginPath();
      ctx.moveTo(desde.x, desde.y);
      ctx.lineTo(hasta.x, hasta.y);
      ctx.stroke();

      ctx.setLineDash([]);
    }

    // --- Nodos (niveles) ---
    for (const nodo of this.nodos) {
      const esCercano = nodoCercano && nodo.id === nodoCercano.id;
      const estaDesbloqueandose = nodo.id === this.nodoDesbloqueandose;

      // Radio del nodo — el cercano es un poco más grande
      let radio = esCercano ? 22 : 18;

      // Animación de desbloqueo: el nodo pulsa
      if (estaDesbloqueandose) {
        const pulso = Math.sin(this.tiempoDesbloqueo * 8) * 5;
        radio += pulso;
      }

      // --- Color según estado ---
      if (nodo.bloqueado) {
        ctx.fillStyle = '#3a3a3a';
      } else if (nodo.completado) {
        ctx.fillStyle = '#44AA44';
      } else {
        ctx.fillStyle = '#C8A84E';
      }

      // Dibujar el círculo del nodo
      ctx.beginPath();
      ctx.arc(nodo.x, nodo.y, radio, 0, Math.PI * 2);
      ctx.fill();

      // Borde del nodo (dorado si está cerca del jugador)
      ctx.strokeStyle = esCercano ? '#FFD700' : '#222222';
      ctx.lineWidth = esCercano ? 3 : 2;
      ctx.stroke();

      // --- Ícono según tipo de lugar ---
      ctx.font = '14px monospace';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';

      if (nodo.tipo === 'cueva') ctx.fillText('⛏', nodo.x, nodo.y + 5);
      if (nodo.tipo === 'aldea') ctx.fillText('🏘', nodo.x, nodo.y + 5);
      if (nodo.tipo === 'ciudad') ctx.fillText('🏛', nodo.x, nodo.y + 5);
      if (nodo.tipo === 'naufragio') ctx.fillText('⚓', nodo.x, nodo.y + 5);
      if (nodo.tipo === 'juridico') ctx.fillText('⚖️', nodo.x, nodo.y + 5);
      if (nodo.tipo === 'museo') ctx.fillText('🏛', nodo.x, nodo.y + 5);

      // Marca de completado (palomita)
      if (nodo.completado) {
        ctx.font = 'bold 16px monospace';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('✓', nodo.x + radio + 5, nodo.y - 5);
      }

      // Candado si está bloqueado
      if (nodo.bloqueado) {
        ctx.font = '12px monospace';
        ctx.fillStyle = '#888888';
        ctx.fillText('🔒', nodo.x, nodo.y + radio + 15);
      }

      // Nombre del nodo debajo
      ctx.font = nodo.bloqueado ? '11px monospace' : '12px monospace';
      ctx.fillStyle = nodo.bloqueado ? '#666666' : '#FFFFFF';
      ctx.fillText(nodo.nombre, nodo.x, nodo.y + radio + 28);

      // Indicador [E] si el jugador está cerca
      if (esCercano) {
        const pulso = 0.7 + Math.sin(this.tiempoAnimacion * 3) * 0.3;
        ctx.font = 'bold 13px monospace';
        ctx.fillStyle = `rgba(255, 215, 0, ${pulso})`;
        ctx.fillText('[E] Entrar', nodo.x, nodo.y - radio - 10);
      }
    }

    // --- Jugador (sprite detallado, igual que en los mundos) ---
    if (jugador) {
      this._dibujarJugador(ctx, jugador);
    }

    // --- Info del nodo cercano (parte inferior) ---
    ctx.textAlign = 'center';
    if (nodoCercano) {
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = nodoCercano.bloqueado ? '#888888' : '#FFFFFF';
      ctx.fillText(nodoCercano.nombre, ancho / 2, alto - 55);

      if (nodoCercano.bloqueado) {
        ctx.font = '12px monospace';
        ctx.fillStyle = '#cc4444';
        ctx.fillText('🔒 Bloqueado — completa el nivel anterior', ancho / 2, alto - 38);
      } else if (nodoCercano.completado) {
        ctx.font = '12px monospace';
        ctx.fillStyle = '#44AA44';
        ctx.fillText('(Completado)', ancho / 2, alto - 38);
      }
    }

    // --- Instrucciones en la parte inferior ---
    ctx.font = '12px monospace';
    ctx.fillStyle = '#AAAAAA';
    ctx.fillText(
      'Camina hasta un nivel y pulsa E | I: inventario | Q: menú',
      ancho / 2,
      alto - 15
    );

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

  // --- Dibujar jugador (mismo sprite que en los mundos top-down) ---
  _dibujarJugador(ctx, jugador) {
    const px = jugador.x;
    const py = jugador.y;
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

    // Ojos (miran en la dirección de movimiento)
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

    // Piernas con animación de caminar
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
