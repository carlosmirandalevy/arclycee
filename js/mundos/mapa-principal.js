// ============================================================
// MAPA-PRINCIPAL.JS - Mapa del mundo estilo Super Mario World
// ============================================================
// Vista desde arriba donde el jugador se mueve entre nodos
// (niveles). Cada nodo es un lugar real de República Dominicana.
// Los nodos se desbloquean al completar el anterior, como en
// Super Mario World — esto motiva al jugador a seguir avanzando.
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO } from '../motor/configuracion.js';

export class MapaPrincipal {

  constructor() {
    // Nodos = lugares/niveles en el mapa
    // Cada uno tiene posición, nombre, estado y conexiones
    this.nodos = [];

    // Caminos visibles entre nodos (líneas en el mapa)
    this.caminosActivos = [];

    // En qué nodo está parado el jugador ahora
    this.jugadorNodoActual = 0;

    // Animación del jugador en el mapa (rebote suave)
    this.tiempoAnimacion = 0;

    // Bloqueo de entrada
    this.bloqueoEntrada = false;

    // Animación de nodo desbloqueándose
    this.nodoDesbloqueandose = null;
    this.tiempoDesbloqueo = 0;
  }

  // --- Construir el mapa ---
  iniciar(juego) {
    this.juego = juego;
    this.tiempoAnimacion = 0;

    // --- Definir los nodos del Mundo Taíno ---
    // Las posiciones simulan un camino por la geografía dominicana
    this.nodos = [
      {
        id: 0,
        x: 120, y: 380,
        nombre: 'Cuevas del Pomier',
        tipo: 'cueva',
        completado: false,
        bloqueado: false,
        // Lista de IDs de nodos a los que se conecta
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
        // La Isabela conecta con la Zona Colonial (primer nivel
        // del Mundo Colonial que se desbloquea al obtener el mapa)
        conectadoA: [4],
        escena: 'mundoColonial'
      },
      // --- Mundo Colonial ---
      // Se desbloquea al obtener el Mapa Colonial de Roberto Cassá
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
      // Se desbloquea al completar la Zona Colonial
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
      // Se desbloquea al completar el Mundo Acuático
      {
        id: 6,
        x: 720, y: 340,
        nombre: 'Aeropuerto Las Américas',
        tipo: 'juridico',
        completado: false,
        bloqueado: true,
        conectadoA: [],
        escena: 'mundoJuridico'
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

    // El jugador empieza en el primer nodo desbloqueado no completado
    // o en el último completado si todos están hechos
    this.jugadorNodoActual = 0;
    for (let i = this.nodos.length - 1; i >= 0; i--) {
      if (!this.nodos[i].bloqueado) {
        this.jugadorNodoActual = i;
        break;
      }
    }
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, _jugador, _companeros) {
    this.tiempoAnimacion += dt * 2;

    // Animación de desbloqueo (si hay un nodo desbloqueándose)
    if (this.nodoDesbloqueandose !== null) {
      this.tiempoDesbloqueo += dt;
      if (this.tiempoDesbloqueo > 1.5) {
        this.nodoDesbloqueandose = null;
        this.tiempoDesbloqueo = 0;
      }
      return; // No procesar entrada durante la animación
    }

    const nodoActual = this.nodos[this.jugadorNodoActual];
    if (!nodoActual) return;

    // --- Volver al menú con Q/Escape ---
    if (entrada.estaPresionada('cancelar') && !this.bloqueoEntrada) {
      if (this.juego && this.juego.cambiarEscena) {
        this.juego.cambiarEscena('menuPrincipal');
      }
      this.bloqueoEntrada = true;
      return;
    }

    // --- Movimiento libre por el mapa ---
    // El jugador camina libremente entre todos los nodos (conectados o no).
    // Si intenta entrar a un nivel bloqueado, le avisamos con un mensaje.
    if (!this.bloqueoEntrada) {
      if (entrada.estaPresionada('derecha') || entrada.estaPresionada('arriba')) {
        // Avanzar al siguiente nodo (sin importar si está bloqueado)
        const siguiente = this._buscarNodoConectado(nodoActual, 'adelante');
        if (siguiente !== null) {
          this.jugadorNodoActual = siguiente;
          this.bloqueoEntrada = true;
        }
      }

      if (entrada.estaPresionada('izquierda') || entrada.estaPresionada('abajo')) {
        // Retroceder al nodo anterior
        const anterior = this._buscarNodoConectado(nodoActual, 'atras');
        if (anterior !== null) {
          this.jugadorNodoActual = anterior;
          this.bloqueoEntrada = true;
        }
      }

      // Entrar al nivel con acción (E o Enter)
      if (entrada.estaPresionada('accion')) {
        if (nodoActual.bloqueado) {
          // Mostrar mensaje de nivel bloqueado
          if (this.juego && this.juego.mostrarToast) {
            this.juego.mostrarToast(`🔒 ${nodoActual.nombre} — completa el nivel anterior para desbloquear`);
          }
        } else if (this.juego && this.juego.cambiarEscena && nodoActual.escena) {
          this.juego.cambiarEscena(nodoActual.escena);
        }
        this.bloqueoEntrada = true;
      }
    }

    // Desbloquear cuando se sueltan las teclas
    if (!entrada.estaPresionada('derecha') &&
        !entrada.estaPresionada('izquierda') &&
        !entrada.estaPresionada('arriba') &&
        !entrada.estaPresionada('abajo') &&
        !entrada.estaPresionada('accion') &&
        !entrada.estaPresionada('cancelar')) {
      this.bloqueoEntrada = false;
    }
  }

  // --- Dibujar el mapa ---
  // Recibimos textos (traducciones del idioma actual) y parámetros extra que ignoramos
  dibujar(renderizador, ancho, alto, textos) {
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
    // Cambia según la zona en la que está el jugador
    const nodoJugador = this.nodos[this.jugadorNodoActual];
    const esJuridico = nodoJugador && nodoJugador.id >= 6;
    const esAcuatico = nodoJugador && nodoJugador.id === 5;
    const esColonial = nodoJugador && nodoJugador.id >= 3 && nodoJugador.id < 5;
    const tituloMundo = esJuridico
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
    // Una línea sutil que divide la zona Taína (arriba) de la Colonial (abajo)
    ctx.strokeStyle = 'rgba(200, 168, 78, 0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 8]);
    ctx.beginPath();
    ctx.moveTo(30, 390);
    ctx.lineTo(ancho - 30, 390);
    ctx.stroke();
    ctx.setLineDash([]);

    // --- Caminos entre nodos ---
    // Líneas punteadas que conectan los lugares en el mapa
    for (const camino of this.caminosActivos) {
      const desde = this.nodos[camino.desdeId];
      const hasta = this.nodos[camino.hastaId];
      if (!desde || !hasta) continue;

      // El camino se ve dorado si ambos nodos están desbloqueados
      // y gris si el destino está bloqueado
      const estaActivo = !hasta.bloqueado;
      ctx.strokeStyle = estaActivo ? '#C8A84E' : '#555555';
      ctx.lineWidth = estaActivo ? 3 : 2;
      ctx.setLineDash(estaActivo ? [8, 6] : [4, 8]);

      ctx.beginPath();
      ctx.moveTo(desde.x, desde.y);
      ctx.lineTo(hasta.x, hasta.y);
      ctx.stroke();

      ctx.setLineDash([]); // Restaurar línea sólida
    }

    // --- Nodos (niveles) ---
    for (const nodo of this.nodos) {
      const estaSeleccionado = nodo.id === this.jugadorNodoActual;
      const estaDesbloqueandose = nodo.id === this.nodoDesbloqueandose;

      // Radio del nodo — el seleccionado es un poco más grande
      let radio = estaSeleccionado ? 22 : 18;

      // Animación de desbloqueo: el nodo pulsa
      if (estaDesbloqueandose) {
        const pulso = Math.sin(this.tiempoDesbloqueo * 8) * 5;
        radio += pulso;
      }

      // --- Color según estado ---
      if (nodo.bloqueado) {
        // Gris oscuro = no disponible todavía
        ctx.fillStyle = '#3a3a3a';
      } else if (nodo.completado) {
        // Verde = ya lo completaste
        ctx.fillStyle = '#44AA44';
      } else {
        // Dorado = disponible para jugar
        ctx.fillStyle = '#C8A84E';
      }

      // Dibujar el círculo del nodo
      ctx.beginPath();
      ctx.arc(nodo.x, nodo.y, radio, 0, Math.PI * 2);
      ctx.fill();

      // Borde del nodo
      ctx.strokeStyle = estaSeleccionado ? '#FFD700' : '#222222';
      ctx.lineWidth = estaSeleccionado ? 3 : 2;
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

      // Marca de completado (palomita)
      if (nodo.completado) {
        ctx.font = 'bold 16px monospace';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('v', nodo.x + radio + 5, nodo.y - 5);
      }

      // Candado si está bloqueado
      if (nodo.bloqueado) {
        ctx.font = '12px monospace';
        ctx.fillStyle = '#888888';
        ctx.fillText('[x]', nodo.x, nodo.y + radio + 15);
      }

      // Nombre del nodo debajo
      ctx.font = nodo.bloqueado ? '11px monospace' : '12px monospace';
      ctx.fillStyle = nodo.bloqueado ? '#666666' : '#FFFFFF';
      ctx.fillText(nodo.nombre, nodo.x, nodo.y + radio + 28);
    }

    // --- Jugador sobre el nodo actual ---
    const nodoActual = this.nodos[this.jugadorNodoActual];
    if (nodoActual) {
      const rebote = Math.sin(this.tiempoAnimacion) * 3;
      const genero = this.juego ? this.juego.generoJugador || 'pepito' : 'pepito';
      const colorJugador = genero === 'pepito' ? '#4488ff' : '#aa44ff';

      // Cuerpo del jugador (versión pequeña)
      ctx.fillStyle = colorJugador;
      ctx.fillRect(nodoActual.x - 8, nodoActual.y - 40 + rebote, 16, 20);

      // Cabeza
      ctx.fillStyle = '#D2956A';
      ctx.fillRect(nodoActual.x - 5, nodoActual.y - 50 + rebote, 10, 10);

      // Flecha apuntando al nodo
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.moveTo(nodoActual.x, nodoActual.y - 24 + rebote);
      ctx.lineTo(nodoActual.x - 5, nodoActual.y - 30 + rebote);
      ctx.lineTo(nodoActual.x + 5, nodoActual.y - 30 + rebote);
      ctx.closePath();
      ctx.fill();
    }

    // --- Nombre del nodo seleccionado ---
    if (nodoActual) {
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = nodoActual.bloqueado ? '#888888' : '#FFFFFF';
      ctx.fillText(nodoActual.nombre, ancho / 2, alto - 55);

      if (nodoActual.bloqueado) {
        ctx.font = '12px monospace';
        ctx.fillStyle = '#cc4444';
        ctx.fillText('🔒 Bloqueado — completa el nivel anterior', ancho / 2, alto - 38);
      } else if (nodoActual.completado) {
        ctx.font = '12px monospace';
        ctx.fillStyle = '#44AA44';
        ctx.fillText('(Completado)', ancho / 2, alto - 38);
      }
    }

    // --- Instrucciones en la parte inferior ---
    ctx.font = '12px monospace';
    ctx.fillStyle = '#AAAAAA';
    ctx.fillText(
      'Flechas: moverse | E: entrar al nivel | I: inventario | Q: menu',
      ancho / 2,
      alto - 15
    );

    ctx.textAlign = 'left';
  }

  // --- Desbloquear un nodo ---
  // Se llama cuando el jugador completa el nivel anterior
  desbloquearNodo(id) {
    const nodo = this.nodos.find(n => n.id === id);
    if (nodo && nodo.bloqueado) {
      nodo.bloqueado = false;

      // Activar la animación de desbloqueo
      this.nodoDesbloqueandose = id;
      this.tiempoDesbloqueo = 0;
    }
  }

  // --- Buscar un nodo conectado al actual en una dirección ---
  // 'adelante' busca nodos que este nodo apunta (conectadoA)
  // 'atras' busca nodos que apuntan A este nodo
  // El jugador puede moverse a cualquier nodo conectado (incluso bloqueados)
  // para explorar el mapa libremente.
  _buscarNodoConectado(nodoActual, direccion) {
    if (direccion === 'adelante') {
      for (const destinoId of nodoActual.conectadoA) {
        const destino = this.nodos[destinoId];
        if (destino) {
          return destinoId;
        }
      }
    } else {
      for (const nodo of this.nodos) {
        if (nodo.conectadoA.includes(nodoActual.id)) {
          return nodo.id;
        }
      }
    }

    return null;
  }
}
