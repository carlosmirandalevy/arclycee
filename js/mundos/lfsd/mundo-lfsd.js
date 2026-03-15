// ============================================================
// MUNDO-LFSD.JS - Clase de robótica del LFSD (Misiones Secundarias)
// ============================================================
// El Liceo Francés de Santo Domingo tiene una clase de robótica
// llamada "les fous du robot". Aquí el jugador conoce al
// Prof. Nicolas Droulers y a 8 estudiantes, 3 de los cuales
// ofrecen misiones secundarias con mini-juegos únicos:
//
// - Émile (electrónica) → Calibración de señal (magnetómetro)
// - Sofía (programación) → Programación de bloques (robot submarino)
// - Lucas (mecánica) → Conexión de cables (equipo de análisis)
//
// MODO: Top-down interior (como mundo-laboratorio.js)
// ENTRADA: Desde nodo en el mapa de tiles (Santo Domingo)
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';

export class MundoLFSD {

  constructor() {
    // --- Dimensiones del nivel ---
    this.anchoNivel = 1200;
    this.altoNivel = 900;

    // --- Cámara ---
    this.camaraX = 0;
    this.camaraY = 0;

    // --- Estructuras (obstáculos con colisión) ---
    this.estructuras = [];

    // --- NPCs ---
    this.npcs = [];

    // --- Diálogos ---
    this.dialogos = new SistemaDialogos();

    // --- Sonidos ---
    this.sfx = new SonidoProcedural();

    // --- Bloqueo de entrada ---
    this.bloqueoEntrada = true;

    // --- Tiempo total ---
    this.tiempoTotal = 0;

    // --- Referencia al juego ---
    this.juego = null;

    // --- Diálogo rotativo para NPCs de relleno ---
    this._dialogoRotativo = {};
  }

  // --- Preparar el mundo ---
  iniciar(juego) {
    this.juego = juego;
    this.bloqueoEntrada = true;
    this.tiempoTotal = 0;

    // Configurar jugador para vista top-down
    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';
      juego.jugador.x = 600;
      juego.jugador.y = 800;
      juego.jugador.velocidadX = 0;
      juego.jugador.velocidadY = 0;
    }

    // --- Estructuras del aula ---
    this.estructuras = [
      // 4 mesas de trabajo
      { x: 100, y: 200, ancho: 200, alto: 100, tipo: 'mesa', nombre: 'Mesa Electrónica' },
      { x: 450, y: 200, ancho: 200, alto: 100, tipo: 'mesa', nombre: 'Mesa Programación' },
      { x: 800, y: 200, ancho: 200, alto: 100, tipo: 'mesa', nombre: 'Mesa Mecánica' },
      { x: 450, y: 500, ancho: 200, alto: 100, tipo: 'mesa', nombre: 'Mesa Diseño' },
      // Estanterías
      { x: 30, y: 30, ancho: 300, alto: 60, tipo: 'estanteria', nombre: 'Estantería' },
      { x: 870, y: 30, ancho: 300, alto: 60, tipo: 'estanteria', nombre: 'Estantería' },
      // Escritorio del profesor
      { x: 500, y: 50, ancho: 200, alto: 70, tipo: 'escritorio', nombre: 'Escritorio Profesor' },
      // Vitrina con robot
      { x: 30, y: 500, ancho: 100, alto: 100, tipo: 'vitrina', nombre: 'Robot de exhibición' },
      // Impresora 3D
      { x: 1050, y: 500, ancho: 80, alto: 80, tipo: 'impresora', nombre: 'Impresora 3D' }
    ];

    // --- NPCs del aula ---
    const textos = this._obtenerTextos();
    const lfsd = textos?.dialogos?.lfsd;

    this.npcs = [
      // Quest-givers (camisas de colores)
      {
        id: 'emile', x: 150, y: 340, ancho: 28, alto: 36,
        nombre: lfsd?.emileNombre || 'Émile',
        color: '#4488FF', // Azul
        dialogoHecho: false, esMentor: false, esQuestGiver: true,
        quest: 'buenasVibraciones'
      },
      {
        id: 'sofia', x: 500, y: 340, ancho: 28, alto: 36,
        nombre: lfsd?.sofiaNombre || 'Sofía',
        color: '#44AA44', // Verde
        dialogoHecho: false, esMentor: false, esQuestGiver: true,
        quest: 'metalCompleto'
      },
      {
        id: 'lucas', x: 850, y: 340, ancho: 28, alto: 36,
        nombre: lfsd?.lucasNombre || 'Lucas',
        color: '#FF8844', // Naranja
        dialogoHecho: false, esMentor: false, esQuestGiver: true,
        quest: 'cienciaLoca'
      },
      // Profesor — líder del proyecto y de la clase de robótica
      {
        id: 'profesor', x: 560, y: 140, ancho: 28, alto: 36,
        nombre: lfsd?.profesorNombre || 'Prof. Droulers',
        color: '#2255AA', // Azul LFSD
        dialogoHecho: false, esMentor: true, esQuestGiver: false
      },
      // Estudiantes de relleno
      {
        id: 'estudiante1', x: 200, y: 450, ancho: 28, alto: 36,
        nombre: lfsd?.est1Nombre || 'Théo',
        color: '#888888',
        dialogoHecho: false, esMentor: false, esQuestGiver: false
      },
      {
        id: 'estudiante2', x: 700, y: 450, ancho: 28, alto: 36,
        nombre: lfsd?.est2Nombre || 'Nael',
        color: '#777777',
        dialogoHecho: false, esMentor: false, esQuestGiver: false
      },
      {
        id: 'estudiante3', x: 350, y: 650, ancho: 28, alto: 36,
        nombre: lfsd?.est3Nombre || 'Jules',
        color: '#999999',
        dialogoHecho: false, esMentor: false, esQuestGiver: false
      },
      {
        id: 'estudiante4', x: 650, y: 650, ancho: 28, alto: 36,
        nombre: lfsd?.est4Nombre || 'Rafael',
        color: '#666666',
        dialogoHecho: false, esMentor: false, esQuestGiver: false
      },
      {
        id: 'estudiante5', x: 1000, y: 650, ancho: 28, alto: 36,
        nombre: lfsd?.est5Nombre || 'Alberto',
        color: '#AAAAAA',
        dialogoHecho: false, esMentor: false, esQuestGiver: false
      },
      // Miembros restantes del equipo
      {
        id: 'estudiante6', x: 400, y: 780, ancho: 28, alto: 36,
        nombre: lfsd?.est6Nombre || 'Carlos Guillermo',
        color: '#88AACC',
        dialogoHecho: false, esMentor: false, esQuestGiver: false
      },
      {
        id: 'estudiante7', x: 750, y: 780, ancho: 28, alto: 36,
        nombre: lfsd?.est7Nombre || 'Elian',
        color: '#CC88AA',
        dialogoHecho: false, esMentor: false, esQuestGiver: false
      },
      {
        id: 'estudiante8', x: 1050, y: 450, ancho: 28, alto: 36,
        nombre: lfsd?.est8Nombre || 'Tom',
        color: '#AABB88',
        dialogoHecho: false, esMentor: false, esQuestGiver: false
      }
    ];
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, jugador, companeros) {
    if (!jugador) return;
    this.tiempoTotal += dt;

    // Si hay un mini-juego activo, no procesar
    if (this.juego?.calibracion?.enJuego) return;
    if (this.juego?.programacion?.enJuego) return;
    if (this.juego?.conexion?.enJuego) return;

    // Diálogo activo consume la entrada
    if (this.dialogos.estaActivo()) {
      this.dialogos.actualizar(dt);
      if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
        this.dialogos.avanzar();
        this.sfx.dialogo();
        this.bloqueoEntrada = true;
      }
      if (!entrada.estaPresionada('accion')) {
        this.bloqueoEntrada = false;
      }
      return;
    }

    // --- Movimiento top-down ---
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

    // --- Colisión con estructuras ---
    for (const est of this.estructuras) {
      if (jugador.x + jugador.ancho > est.x && jugador.x < est.x + est.ancho &&
          jugador.y + jugador.alto > est.y && jugador.y < est.y + est.alto) {
        const solapeDer = (jugador.x + jugador.ancho) - est.x;
        const solapeIzq = (est.x + est.ancho) - jugador.x;
        const solapeAbajo = (jugador.y + jugador.alto) - est.y;
        const solapeArriba = (est.y + est.alto) - jugador.y;
        const minSolape = Math.min(solapeDer, solapeIzq, solapeAbajo, solapeArriba);
        if (minSolape === solapeDer) jugador.x = est.x - jugador.ancho;
        else if (minSolape === solapeIzq) jugador.x = est.x + est.ancho;
        else if (minSolape === solapeAbajo) jugador.y = est.y - jugador.alto;
        else jugador.y = est.y + est.alto;
      }
    }

    // Limitar jugador al nivel
    jugador.x = Math.max(0, Math.min(this.anchoNivel - jugador.ancho, jugador.x));
    jugador.y = Math.max(0, Math.min(this.altoNivel - jugador.alto, jugador.y));

    // --- Interacción con NPCs ---
    if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      for (const npc of this.npcs) {
        if (this._estaCerca(jugador, npc, 45)) {
          this._hablarConNPC(npc);
          this.bloqueoEntrada = true;
          break;
        }
      }
    }

    if (!entrada.estaPresionada('accion')) {
      this.bloqueoEntrada = false;
    }

    // --- Salir con M o borde inferior ---
    if (entrada.estaPresionada('mapa') && !this.bloqueoEntrada) {
      if (this.juego) this.juego.cambiarEscena('mapaPrincipal');
      this.bloqueoEntrada = true;
      return;
    }

    if (jugador.y >= this.altoNivel - jugador.alto - 5) {
      if (this.juego) this.juego.cambiarEscena('mapaPrincipal');
      return;
    }

    // --- Actualizar compañeros ---
    if (companeros) {
      for (const comp of companeros) {
        if (comp.activo && typeof comp.actualizar === 'function') {
          comp.actualizar(dt, jugador);
        }
      }
    }

    // --- Cámara suave ---
    const objetivoCamX = jugador.x - ANCHO_JUEGO / 2 + jugador.ancho / 2;
    const objetivoCamY = jugador.y - ALTO_JUEGO / 2 + jugador.alto / 2;
    this.camaraX += (objetivoCamX - this.camaraX) * 0.08;
    this.camaraY += (objetivoCamY - this.camaraY) * 0.08;
    this.camaraX = Math.max(0, Math.min(this.anchoNivel - ANCHO_JUEGO, this.camaraX));
    this.camaraY = Math.max(0, Math.min(this.altoNivel - ALTO_JUEGO, this.camaraY));
  }

  // --- Dibujar el mundo ---
  dibujar(renderizador, ancho, alto, textos, jugador, companeros) {
    const ctx = renderizador.ctx;
    ctx.save();
    ctx.translate(-this.camaraX, -this.camaraY);

    // --- Suelo del aula ---
    for (let fila = 0; fila < this.altoNivel / 40; fila++) {
      for (let col = 0; col < this.anchoNivel / 40; col++) {
        const esClaro = (fila + col) % 2 === 0;
        ctx.fillStyle = esClaro ? '#D0D8E0' : '#C0C8D0';
        ctx.fillRect(col * 40, fila * 40, 40, 40);
      }
    }

    // --- Paredes ---
    ctx.fillStyle = '#E8E0D0';
    ctx.fillRect(0, 0, this.anchoNivel, 20);
    ctx.fillRect(0, this.altoNivel - 20, this.anchoNivel, 20);
    ctx.fillRect(0, 0, 20, this.altoNivel);
    ctx.fillRect(this.anchoNivel - 20, 0, 20, this.altoNivel);

    // Franja azul (colores del LFSD)
    ctx.fillStyle = '#2255AA';
    ctx.fillRect(0, 20, this.anchoNivel, 8);

    // --- Pizarra con texto "les fous du robot" ---
    ctx.fillStyle = '#2a4a2a';
    ctx.fillRect(400, 25, 400, 80);
    ctx.strokeStyle = '#8a7a5a';
    ctx.lineWidth = 3;
    ctx.strokeRect(400, 25, 400, 80);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('les fous du robot', 600, 58);
    ctx.font = '11px monospace';
    ctx.fillStyle = '#CCCCCC';
    ctx.fillText('Classe de Robotique - LFSD', 600, 78);
    ctx.textAlign = 'left';

    // --- Estructuras ---
    for (const est of this.estructuras) {
      this._dibujarEstructura(ctx, est);
    }

    // --- Entidades ordenadas por Y ---
    const entidades = [];
    for (const npc of this.npcs) {
      entidades.push({ tipo: 'npc', datos: npc, y: npc.y });
    }
    if (jugador) {
      entidades.push({ tipo: 'jugador', datos: jugador, y: jugador.y });
    }
    if (companeros) {
      for (const comp of companeros) {
        if (comp.activo) {
          entidades.push({ tipo: 'companero', datos: comp, y: comp.y || jugador.y });
        }
      }
    }
    entidades.sort((a, b) => a.y - b.y);

    for (const ent of entidades) {
      if (ent.tipo === 'npc') {
        this._dibujarNPC(ctx, ent.datos, jugador);
      } else if (ent.tipo === 'jugador') {
        this._dibujarJugador(ctx, ent.datos);
      } else if (ent.tipo === 'companero') {
        ctx.save();
        ctx.translate(this.camaraX, this.camaraY);
        ent.datos.dibujar(ctx);
        ctx.restore();
      }
    }

    ctx.restore();

    // --- HUD ---
    this._dibujarHUD(ctx, ancho, alto, textos, jugador);
  }

  // ============================================================
  // DIBUJO
  // ============================================================

  _dibujarEstructura(ctx, est) {
    switch (est.tipo) {
      case 'mesa':
        ctx.fillStyle = '#8B7355';
        ctx.fillRect(est.x, est.y, est.ancho, est.alto);
        ctx.strokeStyle = '#6B5335';
        ctx.lineWidth = 2;
        ctx.strokeRect(est.x, est.y, est.ancho, est.alto);
        // Componentes sobre la mesa
        ctx.fillStyle = '#44AA44';
        ctx.fillRect(est.x + 10, est.y + 10, 20, 15);
        ctx.fillStyle = '#AA4444';
        ctx.fillRect(est.x + 40, est.y + 15, 15, 10);
        break;
      case 'estanteria':
        ctx.fillStyle = '#6B5335';
        ctx.fillRect(est.x, est.y, est.ancho, est.alto);
        // Libros
        const colores = ['#AA3333', '#3333AA', '#33AA33', '#AAAA33', '#AA33AA'];
        for (let i = 0; i < 10; i++) {
          ctx.fillStyle = colores[i % colores.length];
          ctx.fillRect(est.x + 10 + i * 28, est.y + 10, 20, 40);
        }
        break;
      case 'escritorio':
        ctx.fillStyle = '#4a3520';
        ctx.fillRect(est.x, est.y, est.ancho, est.alto);
        // Laptop
        ctx.fillStyle = '#333333';
        ctx.fillRect(est.x + 70, est.y + 15, 60, 40);
        ctx.fillStyle = '#4488FF';
        ctx.fillRect(est.x + 75, est.y + 20, 50, 30);
        break;
      case 'vitrina':
        ctx.fillStyle = 'rgba(200, 220, 240, 0.5)';
        ctx.fillRect(est.x, est.y, est.ancho, est.alto);
        ctx.strokeStyle = '#888888';
        ctx.lineWidth = 2;
        ctx.strokeRect(est.x, est.y, est.ancho, est.alto);
        // Robot dentro
        ctx.fillStyle = '#FF8800';
        ctx.fillRect(est.x + 30, est.y + 20, 40, 50);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(est.x + 38, est.y + 28, 8, 8);
        ctx.fillRect(est.x + 54, est.y + 28, 8, 8);
        break;
      case 'impresora':
        ctx.fillStyle = '#555555';
        ctx.fillRect(est.x, est.y, est.ancho, est.alto);
        ctx.fillStyle = '#333333';
        ctx.fillRect(est.x + 10, est.y + 10, est.ancho - 20, 30);
        // LED verde
        ctx.fillStyle = '#44FF44';
        ctx.beginPath();
        ctx.arc(est.x + est.ancho / 2, est.y + est.alto - 10, 4, 0, Math.PI * 2);
        ctx.fill();
        break;
    }
  }

  _dibujarNPC(ctx, npc, jugador) {
    const esCerca = jugador && this._estaCerca(jugador, npc, 45);

    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(npc.x + npc.ancho / 2, npc.y + npc.alto + 2, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cuerpo (camisa del color del NPC — profesor más delgado)
    ctx.fillStyle = npc.color;
    if (npc.id === 'profesor') {
      ctx.fillRect(npc.x + 6, npc.y + 10, 16, 16);
    } else {
      ctx.fillRect(npc.x + 4, npc.y + 10, 20, 16);
    }

    // Cabeza
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(npc.x + 6, npc.y, 16, 14);

    // Pelo (el profesor tiene pelo blanco)
    ctx.fillStyle = npc.id === 'profesor' ? '#DDDDDD' : '#2a1a0a';
    ctx.fillRect(npc.x + 5, npc.y - 2, 18, 5);

    // El profesor es delgado — cuerpo más estrecho y sonrisa visible
    if (npc.id === 'profesor') {
      // Sonrisa (siempre sonriente)
      ctx.strokeStyle = '#8a5a3a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(npc.x + 14, npc.y + 10, 4, 0.1, Math.PI - 0.1);
      ctx.stroke();
    }

    // Ojos
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(npc.x + 9, npc.y + 4, 3, 3);
    ctx.fillRect(npc.x + 16, npc.y + 4, 3, 3);
    ctx.fillStyle = '#000000';
    ctx.fillRect(npc.x + 10, npc.y + 5, 1.5, 1.5);
    ctx.fillRect(npc.x + 17, npc.y + 5, 1.5, 1.5);

    // Piernas
    ctx.fillStyle = '#2a3a5a';
    ctx.fillRect(npc.x + 6, npc.y + 26, 7, 8);
    ctx.fillRect(npc.x + 15, npc.y + 26, 7, 8);

    // Zapatos
    ctx.fillStyle = '#4a3520';
    ctx.fillRect(npc.x + 5, npc.y + 32, 8, 3);
    ctx.fillRect(npc.x + 15, npc.y + 32, 8, 3);

    // Indicador de quest para quest-givers
    if (npc.esQuestGiver && esCerca) {
      const misiones = this.juego?.misiones;
      if (misiones && !misiones.estaCompletada(npc.quest)) {
        ctx.fillStyle = `rgba(255, 215, 0, ${0.7 + Math.sin(this.tiempoTotal * 3) * 0.3})`;
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('!', npc.x + npc.ancho / 2, npc.y - 16);
      }
    }

    // Indicador de interacción
    if (esCerca) {
      const pulso = 0.7 + Math.sin(this.tiempoTotal * 3) * 0.3;
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(255, 215, 0, ${pulso})`;
      ctx.fillText('[E] Hablar', npc.x + npc.ancho / 2, npc.y - 4);
      ctx.textAlign = 'left';
    }

    // Nombre debajo
    ctx.font = '10px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(npc.nombre, npc.x + npc.ancho / 2, npc.y + npc.alto + 16);
    ctx.textAlign = 'left';
  }

  _dibujarJugador(ctx, jugador) {
    const px = jugador.x;
    const py = jugador.y;
    const genero = jugador.genero || 'pepito';

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(px + jugador.ancho / 2, py + jugador.alto + 2, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    const colorCuerpo = genero === 'pepito' ? '#4488ff' : '#aa44ff';
    ctx.fillStyle = colorCuerpo;
    ctx.fillRect(px + 4, py + 10, 20, 16);

    ctx.fillStyle = '#D2956A';
    ctx.fillRect(px + 6, py, 16, 14);

    ctx.fillStyle = genero === 'pepito' ? '#2a1a0a' : '#1a0a00';
    if (genero === 'pepito') {
      ctx.fillRect(px + 5, py - 2, 18, 6);
    } else {
      ctx.fillRect(px + 4, py - 2, 20, 6);
      ctx.fillRect(px + 3, py + 2, 4, 10);
      ctx.fillRect(px + 21, py + 2, 4, 10);
    }

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

    ctx.fillStyle = '#2a5599';
    const pasoAnim = jugador.esAnimando ? Math.sin((jugador.cuadroAnimacion || 0) * 5) * 3 : 0;
    ctx.fillRect(px + 6, py + 26 + pasoAnim, 7, 8);
    ctx.fillRect(px + 15, py + 26 - pasoAnim, 7, 8);

    ctx.fillStyle = '#4a3520';
    ctx.fillRect(px + 5, py + 32 + pasoAnim, 8, 3);
    ctx.fillRect(px + 15, py + 32 - pasoAnim, 8, 3);
  }

  _dibujarHUD(ctx, ancho, alto, textos, jugador) {
    const lfsd = textos?.dialogos?.lfsd;

    // Barra de vida
    if (jugador) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(10, 10, 104, 16);
      ctx.fillStyle = '#44AA44';
      const anchoVida = Math.max(0, (jugador.vida / 100) * 100);
      ctx.fillRect(12, 12, anchoVida, 12);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '10px monospace';
      ctx.fillText(`${textos?.interfaz?.vida || 'Vida'}: ${jugador.vida}`, 15, 22);
    }

    // Nombre del lugar
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(ancho / 2 - 150, alto - 55, 300, 20);
    ctx.fillStyle = '#FFD700';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(lfsd?.nombreLugar || 'LFSD - Classe de Robotique', ancho / 2, alto - 40);

    // Controles
    ctx.fillStyle = '#AAAAAA';
    ctx.fillText('WASD: mover | E: hablar | M: mapa | I: inventario | P: fotos | L: misiones', ancho / 2, alto - 15);
    ctx.textAlign = 'left';

    // Diálogos
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto);
    }
  }

  // ============================================================
  // INTERACCIÓN CON NPCs
  // ============================================================

  _hablarConNPC(npc) {
    const textos = this._obtenerTextos();
    const lfsd = textos?.dialogos?.lfsd;

    if (npc.esQuestGiver) {
      this._hablarQuestGiver(npc, lfsd);
    } else {
      this._hablarEstudiante(npc, lfsd);
    }
  }

  _hablarQuestGiver(npc, lfsd) {
    const misiones = this.juego?.misiones;
    if (!misiones) return;

    switch (npc.id) {
      case 'emile':
        this._hablarEmile(npc, lfsd, misiones);
        break;
      case 'sofia':
        this._hablarSofia(npc, lfsd, misiones);
        break;
      case 'lucas':
        this._hablarLucas(npc, lfsd, misiones);
        break;
    }
  }

  _hablarEmile(npc, lfsd, misiones) {
    const nombre = '🔧 ' + npc.nombre;

    // Misión ya completada
    if (misiones.estaCompletada('buenasVibraciones')) {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: lfsd?.emileCompleto || '¡El magnetómetro funciona perfecto! Ahora puede detectar metales enterrados con precisión.' }
      ]);
      return;
    }

    // Verificar si tiene magnetómetro y misión descubierta
    const tieneMagnetometro = this.juego?.jugador?.inventario?.some(o => o === 'magnetometro') ||
                               this.juego?.inventario?.objetos?.some(o => o.id === 'magnetometro');
    const descubierta = misiones.estaDescubierta('buenasVibraciones');

    if (tieneMagnetometro && descubierta) {
      if (!misiones.estaEnProgreso('buenasVibraciones')) {
        misiones.iniciar('buenasVibraciones');
      }

      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: lfsd?.emileQuest1 || '¡Tienes el magnetómetro! Puedo calibrarlo para ti.' },
        { personaje: nombre, texto: lfsd?.emileQuest2 || 'Necesitas ajustar la frecuencia, amplitud y fase para que coincidan con la señal de referencia.' },
        { personaje: nombre, texto: lfsd?.emileQuest3 || '¡Vamos al osciloscopio!' }
      ], () => {
        // Iniciar mini-juego de calibración
        if (this.juego?.calibracion) {
          this.juego.calibracion.iniciar({
            alTerminar: (resultado) => {
              if (resultado === 'exito') {
                misiones.completar('buenasVibraciones');
                this.juego.progreso.magnetometroCalibrado = true;
                const cambio = this.juego.reputacion.modificar(15, lfsd?.repCalibracion || 'Magnetómetro calibrado');
                this.juego.mostrarToast(`⭐ +${cambio.cambio} ${lfsd?.reputacion || 'reputación'}`);
                this.juego.registro?.agregarEntrada('secundaria',
                  lfsd?.misionBV || 'Good Vibrations',
                  lfsd?.misionBVDesc || 'Magnetómetro calibrado en el LFSD');
                this.juego.registro?.marcarCompletada(lfsd?.misionBV || 'Good Vibrations');
              }
            }
          });
        }
      });
    } else {
      // Diálogo rotativo — intro + pares de flavor sobre el club
      if (!this._dialogoRotativo['emile']) this._dialogoRotativo['emile'] = 0;
      const idx = this._dialogoRotativo['emile'];
      const pares = [
        [lfsd?.emile1 || 'Soy Émile, me encanta la electrónica.',
         lfsd?.emile2 || 'Si encuentras un magnetómetro, puedo calibrarlo para que detecte objetos con más precisión.'],
        [lfsd?.emile5a || '¿Conoces nuestro club? ¡Somos "les fous du robot"!',
         lfsd?.emile5b || 'Usamos Arduino, sensores ultrasónicos y hasta cámaras infrarrojas.'],
        [lfsd?.emile6a || 'En el LFSD aprendemos en tres idiomas.',
         lfsd?.emile6b || 'Vamos a presentar nuestro proyecto en una feria de ciencias.']
      ];
      const par = pares[idx % pares.length];
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: par[0] },
        { personaje: nombre, texto: par[1] }
      ]);
      this._dialogoRotativo['emile']++;
      npc.dialogoHecho = true;
    }
  }

  _hablarSofia(npc, lfsd, misiones) {
    const nombre = '💻 ' + npc.nombre;

    if (misiones.estaCompletada('metalCompleto')) {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: lfsd?.sofiaCompleto || '¡El robot submarino está programado! Revisa el mapa para ver los sitios que descubrió.' }
      ]);
      return;
    }

    const descubierta = misiones.estaDescubierta('metalCompleto');
    if (descubierta) {
      if (!misiones.estaEnProgreso('metalCompleto')) {
        misiones.iniciar('metalCompleto');
      }

      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: lfsd?.sofiaQuest1 || '¡Perfecto! Vamos a programar el robot submarino.' },
        { personaje: nombre, texto: lfsd?.sofiaQuest2 || 'Ordena los bloques de instrucciones para que el robot llegue al punto de escaneo.' },
        { personaje: nombre, texto: lfsd?.sofiaQuest3 || '¡Cuidado con los obstáculos!' }
      ], () => {
        if (this.juego?.programacion) {
          this.juego.programacion.iniciar({
            alTerminar: (resultado) => {
              if (resultado === 'exito') {
                misiones.completar('metalCompleto');
                this.juego.progreso.robotProgramado = true;
                const cambio = this.juego.reputacion.modificar(15, lfsd?.repRobot || 'Robot programado');
                this.juego.mostrarToast(`⭐ +${cambio.cambio} ${lfsd?.reputacion || 'reputación'}`);
                this.juego.registro?.agregarEntrada('secundaria',
                  lfsd?.misionFMA || 'Full Metal Archeologist',
                  lfsd?.misionFMADesc || 'Robot submarino programado');
                this.juego.registro?.marcarCompletada(lfsd?.misionFMA || 'Full Metal Archeologist');

                // Dar el robot submarino al jugador para llevar a la arqueóloga
                const textos2 = this._obtenerTextos();
                const objTextos = textos2?.objetos;
                if (this.juego.jugador) {
                  this.juego.jugador.agregarAlInventario({ nombre: 'robotSubmarino' });
                }
                if (this.juego.inventario) {
                  this.juego.inventario.agregar({
                    id: 'robotSubmarino',
                    nombre: objTextos?.robotSubmarino || 'Robot Submarino',
                    descripcion: objTextos?.descRobotSubmarino || 'Robot submarino programado en el LFSD. Llévalo a la arqueóloga submarina.',
                    tipo: 'clave',
                    cantidad: 1,
                    color: '#44AA44',
                    esUsable: false
                  });
                }
                this.juego.mostrarToast(
                  `🤖 ${objTextos?.robotSubmarino || 'Robot Submarino'} — añadido al inventario`
                );

                // Sub-misión: llevar el robot a la Dra. Sofía en el Santuario del Manatí
                this.juego.registro?.agregarEntrada('secundaria',
                  lfsd?.subMisionRobot || 'Entregar Robot Submarino',
                  lfsd?.subMisionRobotDesc || 'Lleva el Robot Submarino a la Dra. Sofía en el Santuario del Manatí.');
              }
            }
          });
        }
      });
    } else {
      // Diálogo rotativo — intro + pares de flavor sobre el club
      if (!this._dialogoRotativo['sofia']) this._dialogoRotativo['sofia'] = 0;
      const idx = this._dialogoRotativo['sofia'];
      const pares = [
        [lfsd?.sofia1 || 'Soy Sofía, programo robots.',
         lfsd?.sofia2 || 'Estoy trabajando en un robot submarino para explorar sitios arqueológicos.'],
        [lfsd?.sofia5a || '¿Sabías que RD tiene más de 400 naufragios?',
         lfsd?.sofia5b || 'Por eso diseñamos robots submarinos.'],
        [lfsd?.sofia6a || 'Lo que más me gusta del club es combinar ciencia con historia.',
         lfsd?.sofia6b || 'Cada robot que construimos tiene un propósito.']
      ];
      const par = pares[idx % pares.length];
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: par[0] },
        { personaje: nombre, texto: par[1] }
      ]);
      this._dialogoRotativo['sofia']++;
      npc.dialogoHecho = true;
    }
  }

  _hablarLucas(npc, lfsd, misiones) {
    const nombre = '⚙ ' + npc.nombre;

    // Si el equipo ya fue reparado (mini-juego completado)
    if (this.juego?.progreso?.equipoReparado) {
      const yaEntrego = this.juego?.progreso?.equipoEntregado;
      const yaDescubrimiento = this.juego?.progreso?.descubrimientoCientifico;
      if (yaDescubrimiento) {
        // Después del descubrimiento científico — Lucas está orgulloso
        this.dialogos.iniciarDialogo([
          { personaje: nombre, texto: lfsd?.lucasPostDescubrimiento || '¡Salimos en el periódico! El artículo dice que nuestro club ayudó a un descubrimiento científico.' },
          { personaje: nombre, texto: lfsd?.lucasPostDescubrimiento2 || 'Mi mamá lo recortó y lo pegó en la nevera. ¡Dice que soy famoso!' }
        ]);
      } else if (yaEntrego) {
        // Equipo entregado, esperando descubrimiento
        this.dialogos.iniciarDialogo([
          { personaje: nombre, texto: lfsd?.lucasPostEntrega || '¡La Dra. López ya tiene el equipo! A ver qué descubre con eso.' }
        ]);
      } else {
        // Equipo reparado pero no entregado
        this.dialogos.iniciarDialogo([
          { personaje: nombre, texto: lfsd?.lucasCompleto || '¡El equipo funciona de nuevo! Ahora hay que llevárselo a la Dra. López en el museo.' }
        ]);
      }
      return;
    }

    const descubierta = misiones.estaDescubierta('cienciaLoca');
    if (descubierta) {
      if (!misiones.estaEnProgreso('cienciaLoca')) {
        misiones.iniciar('cienciaLoca');
      }

      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: lfsd?.lucasQuest1 || '¡Genial que vengas! El equipo de análisis tiene los cables desconectados.' },
        { personaje: nombre, texto: lfsd?.lucasQuest2 || 'Conecta cada cable con su par correcto. Los colores y símbolos te guían.' },
        { personaje: nombre, texto: lfsd?.lucasQuest3 || '¡Cuidado! Si conectas mal, salta una chispa.' }
      ], () => {
        if (this.juego?.conexion) {
          this.juego.conexion.iniciar({
            alTerminar: (resultado, tiempo) => {
              if (resultado === 'exito') {
                // Marcar que el equipo fue reparado (mini-juego completado)
                this.juego.progreso.equipoReparado = true;
                const bonusTiempo = tiempo < 15 ? 5 : 0;
                const cambio = this.juego.reputacion.modificar(15 + bonusTiempo,
                  lfsd?.repEquipo || 'Equipo reparado');
                this.juego.mostrarToast(`⭐ +${cambio.cambio} ${lfsd?.reputacion || 'reputación'}`);

                // Dar el equipo reparado como objeto para entregar a la Dra. López
                const objTextos = this._obtenerTextos()?.objetos;
                if (this.juego.inventario) {
                  this.juego.inventario.agregar({
                    id: 'equipoAnalisis',
                    nombre: objTextos?.equipoAnalisis || 'Equipo de Análisis',
                    descripcion: objTextos?.descEquipoAnalisis || 'Equipo de análisis reparado en el LFSD. Llévalo a la Dra. López en el Museo.',
                    tipo: 'herramienta',
                    cantidad: 1,
                    color: '#FF8C00',
                    esUsable: false
                  });
                }
                if (jugador) {
                  jugador.agregarAlInventario(objTextos?.equipoAnalisis || 'Equipo de Análisis');
                }
                this.juego.mostrarToast('🔧 ' + (lfsd?.equipoObtenido || '¡Equipo reparado! Llévalo a la Dra. López.'));

                // Sub-misión: entregar el equipo a la Dra. López
                this.juego.registro?.agregarEntrada('secundaria',
                  lfsd?.subMisionEquipo || 'Entregar Equipo de Análisis',
                  lfsd?.subMisionEquipoDesc || 'Lleva el equipo reparado a la Dra. López en el Museo de las Atarazanas Reales.');
              }
            }
          });
        }
      });
    } else {
      // Diálogo rotativo — intro + par de flavor sobre innovación taína
      if (!this._dialogoRotativo['lucas']) this._dialogoRotativo['lucas'] = 0;
      const idx = this._dialogoRotativo['lucas'];
      const pares = [
        [lfsd?.lucas1 || 'Soy Lucas, me gusta arreglar cosas.',
         lfsd?.lucas2 || 'Estoy tratando de reparar un equipo de análisis para el museo, pero los cables están revueltos.'],
        [lfsd?.lucas5a || '¿Sabías que los taínos eran excelentes ingenieros?',
         lfsd?.lucas5b || 'Nosotros seguimos esa tradición de innovación.']
      ];
      const par = pares[idx % pares.length];
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: par[0] },
        { personaje: nombre, texto: par[1] }
      ]);
      this._dialogoRotativo['lucas']++;
      npc.dialogoHecho = true;
    }
  }

  _hablarEstudiante(npc, lfsd) {
    // El profesor tiene su propio flujo de diálogo
    if (npc.id === 'profesor') {
      this._hablarProfesor(npc, lfsd);
      return;
    }

    // Diálogo rotativo para cada estudiante
    const key = npc.id;
    if (!this._dialogoRotativo[key]) this._dialogoRotativo[key] = 0;

    const dialogos = {
      // Théo — Sonic, velocidad, papas fritas, lore
      estudiante1: [
        lfsd?.theo1 || '¡Sonic X Shadow Generations es el MEJOR juego!',
        lfsd?.theo2 || 'Siempre elijo al personaje más rápido. La velocidad es todo.',
        lfsd?.theo3 || 'Spin dash, homing attack, boost... ¡los movimientos de Sonic son perfección!',
        lfsd?.theo4 || '¿Quieres papas fritas? Son mi combustible para programar.',
        lfsd?.theo5 || 'Un buen juego necesita lore, backstory. Sin eso, es solo un jueguito.',
        lfsd?.theo6 || 'Usamos Arduino y sensores ultrasónicos. ¡La tecnología al servicio de la historia!',
        lfsd?.theo7 || 'Shadow es el mejor personaje de Sonic. Rápido, oscuro, con historia.',
        lfsd?.theo8 || 'Si nuestro robot fuera a la velocidad de Sonic, ya habríamos explorado todo.'
      ],
      // Nael — One Piece, Blue Lock, Roblox, hamburguesas, travesuras
      estudiante2: [
        lfsd?.nael1 || '¿Juegas Roblox? Tengo como 500 horas.',
        lfsd?.nael2 || 'Las hamburguesas de Wendy\'s son superiores. El Baconator es arte.',
        lfsd?.nael3 || '¡Luffy Gear Fifth es lo más épico que he visto en mi vida!',
        lfsd?.nael4 || 'Blue Lock es INCREÍBLE. Isagi calculando ángulos es como nuestro robot.',
        lfsd?.nael5 || '¡Je, je! Acabo de esconder la mochila de Tom. *risa malvada*',
        lfsd?.nael6 || 'Mi hermano dice que lo molesto. Yo digo que es entrenamiento de combate.',
        lfsd?.nael7 || 'Diseñamos robots submarinos. ¡Hay patrimonio sumergido esperando!',
        lfsd?.nael8 || 'Zoro se pierde más que nuestro robot cuando falla el GPS.'
      ],
      // Jules — Star Wars, Assassin's Creed, dinosaurios, surf, guitarra
      estudiante3: [
        lfsd?.jules1 || 'Assassin\'s Creed me hizo amar la historia.',
        lfsd?.jules2 || '¡Star Wars! Lightsabers, la Fuerza... Si pudiera ser Jedi y arqueólogo...',
        lfsd?.jules3 || '¿Sabías que en la Hispaniola se han encontrado fósiles?',
        lfsd?.jules4 || 'Después del club voy a surfear. Las olas de Cabarete son perfectas.',
        lfsd?.jules5 || 'Toco guitarra desde los 8. A veces le pongo música a nuestras presentaciones.',
        lfsd?.jules6 || 'En Assassin\'s Creed proteges la historia. Nosotros con robots. ¡Misma energía!',
        lfsd?.jules7 || 'El Velociraptor tenía garras letales. Como nuestra pinza robótica pero más... mortal.',
        lfsd?.jules8 || 'Cada robot que construimos tiene un propósito.'
      ],
      // Rafael — Core Keeper, Minecraft, Brawl Stars, pasta, guitarra, side quests
      estudiante4: [
        lfsd?.rafael1 || 'En Minecraft construí una réplica de la Zona Colonial. ¡Tres meses!',
        lfsd?.rafael2 || '¿Lo mejor de cualquier juego? Las side quests.',
        lfsd?.rafael3 || 'Toco guitarra y pongo soundtracks de videojuegos mientras programo.',
        lfsd?.rafael4 || 'Core Keeper es adictivo. Excavar, construir, explorar...',
        lfsd?.rafael5 || 'Pizza y pasta son lo mejor que existe. *mira su plato*',
        lfsd?.rafael6 || 'En Brawl Stars, mi main es León. Invisible y letal.',
        lfsd?.rafael7 || 'Presentamos nuestro proyecto en una feria de ciencias en París.',
        lfsd?.rafael8 || 'Las side quests son donde está la verdadera aventura.'
      ],
      // Alberto — Terraria, Core Keeper, sushi, bromista
      estudiante5: [
        lfsd?.alberto1 || 'Terraria tiene más de 5,000 ítems. ¡Los quiero todos!',
        lfsd?.alberto2 || '¿Probaste sushi de salmón? Eso y los pancakes con sirope. ¡No juntos!',
        lfsd?.alberto3 || 'Binding of Isaac es perturbador pero genial. Cada run es diferente.',
        lfsd?.alberto4 || 'Je, je... le puse un sticker de "frágil" a la mochila de Nael.',
        lfsd?.alberto5 || 'Core Keeper y Terraria son primos. Excavar, construir, sobrevivir.',
        lfsd?.alberto6 || '¿Leer libros? Nah, prefiero leer código.',
        lfsd?.alberto7 || 'Mew Genics va a ser INCREÍBLE. Gatos mutantes + Edmund McMillen.',
        lfsd?.alberto8 || '¡Somos "les fous du robot"! Los locos del robot. Orgullosos de eso.'
      ],
      // Carlos Guillermo — Percy Jackson, Hollow Knight, Adventure Time, etc.
      estudiante6: [
        lfsd?.carlosG1 || 'Percy Jackson me enseñó que los mitos griegos son reales... bueno, casi.',
        lfsd?.carlosG2 || '¿Conoces Hollow Knight? Hallownest es como las cuevas del Pomier!',
        lfsd?.carlosG3 || 'En Deltarune, las decisiones importan. En arqueología también.',
        lfsd?.carlosG4 || 'Gravity Falls es lo máximo. Dipper es básicamente lo que hacemos nosotros.',
        lfsd?.carlosG5 || 'Adventure Time tiene la lore más profunda. Post-apocalíptica.',
        lfsd?.carlosG6 || 'Delicious in Dungeon: ¿y si los arqueólogos cocinaran lo que encuentran?',
        lfsd?.carlosG7 || 'Dan Da Dan mezcla aliens, fantasmas y romance. Caótico y brillante.',
        lfsd?.carlosG8 || 'Annabeth Chase habría sido una arqueóloga increíble.',
        lfsd?.carlosG9 || 'Spider-Verse tiene el estilo gráfico más increíble del cine. ¡Cada frame!',
        lfsd?.carlosG10 || 'Un personaje necesita carácter, historia, motivaciones completas.',
        lfsd?.carlosG11 || 'Los boss fights definen un juego. Si no te hacen sudar, no está bien.',
        lfsd?.carlosG12 || 'Me encanta leer. Los libros te llevan a mundos que los juegos no pueden.',
        lfsd?.carlosG13 || '¿Shawarma o falafel? ¡Los dos! Perfectos para maratones de lectura.',
        lfsd?.carlosG14 || 'Undertale: puedes ganar sin pelear. La ruta pacifista es hermosa.',
        lfsd?.carlosG15 || 'En Minecraft construyo mundos enteros. Ciudades, calabozos, templos...'
      ],
      // Elian — impresión 3D, Fortnite, Gatorade, aguacate con atún
      estudiante7: [
        lfsd?.elian1 || 'Estoy diseñando el chasis del robot con impresión 3D.',
        lfsd?.elian2 || 'Un buen robot necesita buena estructura. Ingeniería simple pero eficaz.',
        lfsd?.elian3 || '¡Necesito mi Gatorade! Programar da sed. Azul, siempre azul.',
        lfsd?.elian4 || 'En Fortnite mi técnica es esconderme en un arbusto. ¡Estrategia pura!',
        lfsd?.elian5 || '¿Probaste aguacate con atún y mayonesa? Suena raro pero es DELICIOSO.',
        lfsd?.elian6 || '*se rasca la espalda con una cuchara* ¿Qué? Es multiusos.',
        lfsd?.elian7 || 'Hay que ver todas las opciones antes de decidir. En Fortnite y en la vida.',
        lfsd?.elian8 || 'La impresora 3D es mi herramienta favorita del taller.'
      ],
      // Tom — Brawl Stars, pasta, bromas, IA, handball
      estudiante8: [
        lfsd?.tom1 || 'Yo manejo la comunicación Bluetooth del robot.',
        lfsd?.tom2 || 'Las señales bajo el agua son difíciles. ¡Por eso usamos cables!',
        lfsd?.tom3 || '¡Brawl Stars! Mi main es Shelly. Simple pero efectiva.',
        lfsd?.tom4 || '¿Y si le ponemos IA al robot para que tome decisiones solo?',
        lfsd?.tom5 || 'Pasta con salsa boloñesa. La mejor comida. No acepto debate.',
        lfsd?.tom6 || 'Juego handball en el LFSD. Calcular ángulos, como programar.',
        lfsd?.tom7 || '*mira a Nael* Acabo de cambiarle el fondo de pantalla. No le digas.',
        lfsd?.tom8 || 'Algún día la IA analizará artefactos arqueológicos automáticamente.'
      ]
    };

    const lineas = dialogos[key] || ['...'];
    const indice = this._dialogoRotativo[key] % lineas.length;

    this.dialogos.iniciarDialogo([
      { personaje: npc.nombre, texto: lineas[indice] }
    ], () => {
      this._dialogoRotativo[key]++;
      npc.dialogoHecho = true;
    });
  }

  // --- Diálogo del Prof. Nicolas Droulers ---
  // Profesor de robótica del LFSD y líder del proyecto ArcLycée.
  // Diálogo rotativo con temas sobre el proyecto, los estudiantes
  // y la intersección entre tecnología y patrimonio.
  _hablarProfesor(npc, lfsd) {
    if (!this._dialogoRotativo['profesor']) this._dialogoRotativo['profesor'] = 0;
    const idx = this._dialogoRotativo['profesor'];
    const nombre = '👨‍🏫 ' + npc.nombre;

    const pares = [
      [lfsd?.profesor1 || 'Bienvenido a la clase de robótica del Liceo Francés. Soy Nicolas Droulers, el profesor de este grupo.',
       lfsd?.profesor2 || 'Estos estudiantes son "les fous du robot". Locos por los robots, pero también por la historia de este país.'],
      [lfsd?.profesor3 || 'Yo tuve la idea de combinar robótica con arqueología. Un mapa, un videojuego, robots que exploran el patrimonio.',
       lfsd?.profesor4 || 'Los chicos le dieron vida al proyecto. Diseñan, programan, resuelven problemas reales. Aprenden haciendo.'],
      [lfsd?.profesor5 || 'La República Dominicana tiene un patrimonio arqueológico enorme y mucho por descubrir.',
       lfsd?.profesor6 || 'Nuestro trabajo es conectar la ciencia con la cultura. Robótica al servicio de la historia.'],
      [lfsd?.profesor7 || 'Conozco a cada uno de mis estudiantes. Cada uno aporta algo diferente: electrónica, programación, mecánica, diseño...',
       lfsd?.profesor8 || 'Lo más importante no es el robot en sí, sino lo que aprenden construyéndolo juntos. Eso es lo que me hace más orgulloso.'],
      [lfsd?.profesor9 || 'Este proyecto nació de una idea simple: ¿y si la tecnología pudiera ayudar a proteger el patrimonio?',
       lfsd?.profesor10 || 'Cada chico aportó al proyecto y realizó distintos aspectos también. Todos investigaron mucho.']
    ];

    const par = pares[idx % pares.length];
    this.dialogos.iniciarDialogo([
      { personaje: nombre, texto: par[0] },
      { personaje: nombre, texto: par[1] }
    ]);
    this._dialogoRotativo['profesor']++;
  }

  // ============================================================
  // UTILIDADES
  // ============================================================

  _estaCerca(jugador, obj, radio) {
    const dx = (jugador.x + jugador.ancho / 2) - (obj.x + (obj.ancho || 0) / 2);
    const dy = (jugador.y + jugador.alto / 2) - (obj.y + (obj.alto || 0) / 2);
    return Math.sqrt(dx * dx + dy * dy) < radio;
  }

  _obtenerTextos() {
    if (this.juego && this.juego.idiomas) {
      return this.juego.idiomas.traducciones[this.juego.idiomas.idiomaActual];
    }
    return null;
  }
}
