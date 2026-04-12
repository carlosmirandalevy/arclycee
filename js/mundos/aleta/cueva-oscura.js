// ============================================================
// CUEVA-OSCURA.JS — Caminata en la cueva con linterna
// ============================================================
// Exploración top-down en la oscuridad con visibilidad limitada
// a un radio de linterna alrededor del jugador. El jugador debe
// navegar por pasadizos estrechos evitando pozas de agua y
// estalactitas hasta llegar al cenote al final de la cueva.
//
// Al llegar al fondo, transición al buceo en el cenote.
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';

export class CuevaOscura {

  constructor() {
    this.juego = null;
    this.dialogos = new SistemaDialogos();
    this.sfx = new SonidoProcedural();
    this.bloqueoEntrada = true;
    this.tiempoTotal = 0;

    // Dimensiones del nivel (más grande que la pantalla)
    this.anchoNivel = 1400;
    this.altoNivel = 900;

    // Cámara
    this.camaraX = 0;
    this.camaraY = 0;

    // Linterna
    this._radioLuz = 120;

    // NPCs
    this.npcs = [];

    // Obstáculos (estalactitas, pozas)
    this._estalactitas = [];
    this._pozas = [];

    // Notas arqueológicas coleccionables
    this._notas = [];

    // Salida al cenote — más grande que las pozas para ser distinguible
    this._salidaCenote = { x: 1250, y: 400, ancho: 120, alto: 120 };

    // Estado
    this._notasRecogidas = 0;
  }

  iniciar(juego) {
    this.juego = juego;
    this.bloqueoEntrada = true;
    this.tiempoTotal = 0;

    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';
      juego.jugador.x = 60;
      juego.jugador.y = 420;
    }

    // --- Generar obstáculos ---
    this._estalactitas = [];
    this._pozas = [];
    this._notas = [];

    // Estalactitas (colisionables) distribuidas por la cueva
    const posEst = [
      [200, 200], [350, 500], [500, 300], [650, 600], [800, 200],
      [900, 450], [1000, 300], [1100, 600], [300, 700], [750, 150]
    ];
    for (const [ex, ey] of posEst) {
      this._estalactitas.push({ x: ex, y: ey, ancho: 20, alto: 25, radio: 8 + Math.random() * 6 });
    }

    // Pozas de agua (daño si se pisan)
    this._pozas = [
      { x: 400, y: 400, radio: 35 },
      { x: 700, y: 350, radio: 30 },
      { x: 1050, y: 500, radio: 40 }
    ];

    // Notas arqueológicas (3 coleccionables educativos)
    this._notas = [
      { x: 300, y: 350, recogida: false, clave: 'nota1' },
      { x: 750, y: 500, recogida: false, clave: 'nota2' },
      { x: 1100, y: 250, recogida: false, clave: 'nota3' }
    ];
    this._notasRecogidas = 0;

    // NPC guía a la entrada
    this.npcs = [
      {
        id: 'guia', x: 120, y: 420, ancho: 28, alto: 32,
        nombre: 'Guía Local', color: '#8B7355', dialogoHecho: false
      }
    ];

    // Diálogo de bienvenida
    const t = this._obtenerTextos()?.dialogos?.cuevaOscura;
    this.dialogos.iniciarDialogo([
      { personaje: '🔦', texto: t?.entrada1 || 'La cueva se extiende hacia las profundidades. Tu linterna ilumina solo unos metros.' },
      { personaje: '🔦', texto: t?.entrada2 || 'Busca el cenote al fondo de la cueva. Cuidado con las pozas de agua y las estalactitas.' }
    ]);
  }

  actualizar(dt, entrada, jugador, companeros) {
    if (!jugador) return;
    this.tiempoTotal += dt;

    // --- Diálogo activo ---
    if (this.dialogos.estaActivo()) {
      this.dialogos.actualizar(dt);
      if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
        this.dialogos.avanzar();
        this.sfx.dialogo();
        this.bloqueoEntrada = true;
      }
      if (!entrada.estaPresionada('accion')) this.bloqueoEntrada = false;
      return;
    }

    // --- Movimiento top-down ---
    jugador.velocidadX = 0;
    jugador.velocidadY = 0;
    jugador.esAnimando = false;
    const vel = VELOCIDAD_JUGADOR * 0.8; // más lento en la oscuridad

    if (entrada.estaPresionada('arriba')) { jugador.velocidadY = -vel; jugador.direccion = 'arriba'; jugador.esAnimando = true; }
    if (entrada.estaPresionada('abajo')) { jugador.velocidadY = vel; jugador.direccion = 'abajo'; jugador.esAnimando = true; }
    if (entrada.estaPresionada('izquierda')) { jugador.velocidadX = -vel; jugador.direccion = 'izquierda'; jugador.esAnimando = true; }
    if (entrada.estaPresionada('derecha')) { jugador.velocidadX = vel; jugador.direccion = 'derecha'; jugador.esAnimando = true; }

    const factorTiempo = dt * 60;
    jugador.x += jugador.velocidadX * factorTiempo;
    jugador.y += jugador.velocidadY * factorTiempo;

    // Límites del nivel
    jugador.x = Math.max(10, Math.min(jugador.x, this.anchoNivel - 30));
    jugador.y = Math.max(10, Math.min(jugador.y, this.altoNivel - 30));

    // Colisión con estalactitas
    for (const est of this._estalactitas) {
      const dx = (jugador.x + 14) - (est.x + est.ancho / 2);
      const dy = (jugador.y + 16) - (est.y + est.alto / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < est.radio + 12) {
        // Empujar fuera
        const ang = Math.atan2(dy, dx);
        jugador.x = est.x + est.ancho / 2 + Math.cos(ang) * (est.radio + 13) - 14;
        jugador.y = est.y + est.alto / 2 + Math.sin(ang) * (est.radio + 13) - 16;
      }
    }

    // Daño por pozas de agua
    for (const poza of this._pozas) {
      const dx = (jugador.x + 14) - poza.x;
      const dy = (jugador.y + 16) - poza.y;
      if (Math.sqrt(dx * dx + dy * dy) < poza.radio) {
        jugador.vida = Math.max(0, jugador.vida - 0.3);
      }
    }

    // Recoger notas arqueológicas
    for (const nota of this._notas) {
      if (nota.recogida) continue;
      const dx = (jugador.x + 14) - nota.x;
      const dy = (jugador.y + 16) - nota.y;
      if (Math.sqrt(dx * dx + dy * dy) < 30) {
        nota.recogida = true;
        this._notasRecogidas++;
        this.sfx.recoger();
        const t = this._obtenerTextos()?.dialogos?.cuevaOscura;
        const textoNota = t?.[nota.clave] || 'Nota arqueológica encontrada.';
        this.dialogos.iniciarDialogo([
          { personaje: '📝', texto: textoNota }
        ]);
      }
    }

    // Hablar con guía
    if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      for (const npc of this.npcs) {
        const dx = (jugador.x + 14) - (npc.x + 14);
        const dy = (jugador.y + 16) - (npc.y + 16);
        if (Math.sqrt(dx * dx + dy * dy) < 40) {
          const t = this._obtenerTextos()?.dialogos?.cuevaOscura;
          this.dialogos.iniciarDialogo([
            { personaje: '🧑‍🦯 Guía', texto: t?.guia1 || 'El cenote está al este, al fondo de la cueva.' },
            { personaje: '🧑‍🦯 Guía', texto: t?.guia2 || 'Recoge las notas de los arqueólogos que trabajaron aquí. Contienen información valiosa.' }
          ]);
          this.bloqueoEntrada = true;
          break;
        }
      }
    }
    if (!entrada.estaPresionada('accion')) this.bloqueoEntrada = false;

    // Salida al cenote
    const s = this._salidaCenote;
    if (jugador.x + 14 > s.x && jugador.x < s.x + s.ancho &&
        jugador.y + 16 > s.y && jugador.y < s.y + s.alto) {
      // Transición al cenote
      if (this.juego?.progreso?.mundos) {
        this.juego.progreso.mundos.manantialAleta = { fase: 'cenote' };
      }
      this.juego.cambiarEscena('cenoteBuceo');
    }

    // Cámara sigue al jugador
    this.camaraX = jugador.x - ANCHO_JUEGO / 2 + 14;
    this.camaraY = jugador.y - ALTO_JUEGO / 2 + 16;
    this.camaraX = Math.max(0, Math.min(this.camaraX, this.anchoNivel - ANCHO_JUEGO));
    this.camaraY = Math.max(0, Math.min(this.camaraY, this.altoNivel - ALTO_JUEGO));

    // Salir con M
    if (entrada.estaPresionada('mapa')) {
      this.juego.cambiarEscena('mapaPrincipal');
    }
  }

  dibujar(renderizador, ancho, alto, textos, jugador) {
    const ctx = renderizador.ctx || renderizador;
    if (!jugador) return;

    ctx.save();
    ctx.translate(-this.camaraX, -this.camaraY);

    // --- Fondo de cueva (oscuro) ---
    ctx.fillStyle = '#0a0808';
    ctx.fillRect(0, 0, this.anchoNivel, this.altoNivel);

    // Suelo rocoso con textura
    ctx.fillStyle = '#1a1510';
    ctx.fillRect(0, 0, this.anchoNivel, this.altoNivel);
    ctx.strokeStyle = '#252015';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 40; i++) {
      const rx = (i * 137) % this.anchoNivel;
      const ry = (i * 89) % this.altoNivel;
      ctx.beginPath();
      ctx.arc(rx, ry, 5 + (i % 4) * 3, 0, Math.PI * 2);
      ctx.stroke();
    }

    // --- Pozas de agua ---
    for (const poza of this._pozas) {
      ctx.fillStyle = 'rgba(20, 40, 80, 0.7)';
      ctx.beginPath();
      ctx.arc(poza.x, poza.y, poza.radio, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(40, 80, 120, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // --- Estalactitas ---
    for (const est of this._estalactitas) {
      ctx.fillStyle = '#3a3530';
      ctx.beginPath();
      ctx.moveTo(est.x + est.ancho / 2, est.y);
      ctx.lineTo(est.x + est.ancho, est.y + est.alto);
      ctx.lineTo(est.x, est.y + est.alto);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#4a4540';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // --- Notas arqueológicas ---
    for (const nota of this._notas) {
      if (nota.recogida) continue;
      ctx.fillStyle = '#CCAA44';
      ctx.font = '16px monospace';
      ctx.fillText('📝', nota.x - 8, nota.y + 5);
    }

    // --- NPC guía ---
    for (const npc of this.npcs) {
      ctx.fillStyle = npc.color;
      ctx.fillRect(npc.x, npc.y, npc.ancho, npc.alto);
      ctx.fillStyle = '#DEB887';
      ctx.fillRect(npc.x + 5, npc.y - 8, 18, 10);
    }

    // --- Dibujar jugador ---
    this._dibujarJugadorLocal(ctx, jugador);

    // --- Salida (cenote sagrado) — visualmente distinto de las pozas ---
    const s = this._salidaCenote;
    const cx = s.x + s.ancho / 2;
    const cy = s.y + s.alto / 2;
    const pulso = 0.7 + Math.sin(this.tiempoTotal * 1.5) * 0.15;
    // Brillo exterior amplio (indica algo especial)
    const gradOuter = ctx.createRadialGradient(cx, cy, 10, cx, cy, 100);
    gradOuter.addColorStop(0, 'rgba(40, 120, 180, ' + (0.15 * pulso) + ')');
    gradOuter.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradOuter;
    ctx.fillRect(cx - 100, cy - 100, 200, 200);
    // Borde del cenote (anillo turquesa)
    ctx.strokeStyle = 'rgba(60, 160, 200, ' + (0.5 * pulso) + ')';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 50, 0, Math.PI * 2);
    ctx.stroke();
    // Agua del cenote (azul profundo, más grande que las pozas)
    const gradCenote = ctx.createRadialGradient(cx, cy, 5, cx, cy, 48);
    gradCenote.addColorStop(0, 'rgba(30, 80, 140, 0.8)');
    gradCenote.addColorStop(0.7, 'rgba(20, 60, 120, 0.6)');
    gradCenote.addColorStop(1, 'rgba(10, 40, 80, 0.3)');
    ctx.fillStyle = gradCenote;
    ctx.beginPath();
    ctx.arc(cx, cy, 48, 0, Math.PI * 2);
    ctx.fill();
    // Etiqueta del cenote
    ctx.fillStyle = 'rgba(60, 180, 220, ' + (0.6 * pulso) + ')';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('▼ Cenote ▼', cx, cy + 65);
    ctx.textAlign = 'left';

    ctx.restore();

    // --- Máscara de oscuridad con linterna ---
    this._dibujarOscuridad(ctx, ancho, alto, jugador);

    // --- HUD ---
    ctx.fillStyle = '#AAAAAA';
    ctx.font = '11px monospace';
    ctx.fillText(`📝 ${this._notasRecogidas}/3`, 15, alto - 15);

    // Nombre del lugar y controles
    ctx.fillStyle = '#999999';
    ctx.textAlign = 'center';
    const _t = textos?.ui;
    ctx.fillText(_t?.cuevaOscuraNombre || '🔦 Cueva Oscura — Manantial de la Aleta', ancho / 2, alto - 40);
    ctx.fillStyle = '#777777';
    ctx.fillText(_t?.controlesCueva2 || 'WASD: mover | E: examinar | M: mapa → Busca el cenote al este →', ancho / 2, alto - 15);
    ctx.textAlign = 'left';

    // --- Brújula / indicador de dirección al cenote ---
    if (jugador) {
      const s = this._salidaCenote;
      const dcx = (s.x + s.ancho / 2) - (jugador.x + 14);
      const dcy = (s.y + s.alto / 2) - (jugador.y + 16);
      const dist = Math.sqrt(dcx * dcx + dcy * dcy);
      if (dist > 120) {
        // Mostrar flecha indicando dirección
        const ang = Math.atan2(dcy, dcx);
        const indicX = ancho - 40;
        const indicY = 40;
        ctx.save();
        ctx.translate(indicX, indicY);
        ctx.rotate(ang);
        ctx.fillStyle = 'rgba(60, 160, 200, 0.5)';
        ctx.beginPath();
        ctx.moveTo(12, 0);
        ctx.lineTo(-6, -6);
        ctx.lineTo(-6, 6);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        ctx.fillStyle = 'rgba(60, 160, 200, 0.4)';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(Math.round(dist / 10) + 'm', indicX, indicY + 18);
        ctx.textAlign = 'left';
      }
    }

    // Dibujar diálogo
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto, textos);
    }
  }

  // --- Máscara de oscuridad (todo negro excepto el radio de la linterna) ---
  _dibujarOscuridad(ctx, ancho, alto, jugador) {
    const luzX = jugador.x + 14 - this.camaraX;
    const luzY = jugador.y + 16 - this.camaraY;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-in';
    const grad = ctx.createRadialGradient(luzX, luzY, 10, luzX, luzY, this._radioLuz);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.5)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, ancho, alto);
    ctx.restore();

    // Borde oscuro alrededor (para que no se vea el fondo fuera de la luz)
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, ancho, alto);
    ctx.restore();
  }

  // --- Dibujar jugador simple (sin el renderizador completo) ---
  _dibujarJugadorLocal(ctx, jugador) {
    const x = jugador.x;
    const y = jugador.y;
    // Cuerpo
    ctx.fillStyle = '#2266AA';
    ctx.fillRect(x + 2, y + 4, 24, 20);
    // Cabeza
    ctx.fillStyle = '#DEB887';
    ctx.fillRect(x + 6, y - 4, 16, 12);
    // Casco de espeleólogo con luz
    ctx.fillStyle = '#DD8800';
    ctx.fillRect(x + 5, y - 6, 18, 4);
    // Luz de casco
    ctx.fillStyle = '#FFEE88';
    ctx.beginPath();
    ctx.arc(x + 14, y - 4, 3, 0, Math.PI * 2);
    ctx.fill();
    // Piernas
    ctx.fillStyle = '#885522';
    ctx.fillRect(x + 5, y + 24, 8, 8);
    ctx.fillRect(x + 15, y + 24, 8, 8);
  }

  salir() {}

  _obtenerTextos() {
    if (this.juego && this.juego.idiomas) {
      return this.juego.idiomas.traducciones[this.juego.idiomas.idiomaActual];
    }
    return null;
  }
}
