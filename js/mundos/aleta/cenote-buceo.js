// ============================================================
// CENOTE-BUCEO.JS — Buceo en el cenote del Manantial de la Aleta
// ============================================================
// El jugador desciende en un cenote vertical para encontrar
// 3 artefactos taínos sumergidos:
//   1. Duho ceremonial (taburete ritual) — a ~400px de profundidad
//   2. Ofrenda de madera (cemí de madera) — a ~800px
//   3. Vasija taína (cerámica ritual) — a ~1100px
//
// Mecánicas: natación con oxígeno limitado, corrientes fuertes,
// oscuridad con visibilidad limitada. Bolsas de aire para recargar.
//
// Al recoger los 3 artefactos se desbloquea la misión secundaria
// "Ofrendas del Cenote" y el nodo del Museo del Hombre Dominicano.
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';

export class CenoteBuceo {

  constructor() {
    this.juego = null;
    this.dialogos = new SistemaDialogos();
    this.sfx = new SonidoProcedural();
    this.bloqueoEntrada = true;
    this.tiempoTotal = 0;

    // Nivel vertical (estrecho y profundo como un cenote real)
    this.anchoNivel = 800;
    this.altoNivel = 1400;

    // Cámara
    this.camaraX = 0;
    this.camaraY = 0;

    // Oxígeno (120 segundos de aire)
    this._oxigeno = 120;
    this._oxigenoMax = 120;

    // Artefactos a encontrar
    this._artefactos = [];
    this._artefactosRecogidos = 0;

    // Bolsas de aire
    this._bolsasAire = [];

    // Corrientes de agua
    this._corrientes = [];

    // Burbujas decorativas
    this._burbujas = [];
  }

  iniciar(juego) {
    this.juego = juego;
    this.bloqueoEntrada = true;
    this.tiempoTotal = 0;
    this._oxigeno = this._oxigenoMax;

    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';
      juego.jugador.x = 370;
      juego.jugador.y = 50;
    }

    // --- 3 artefactos sumergidos ---
    this._artefactos = [
      { id: 'duho', x: 200, y: 400, recogido: false, nombre: 'Duho Ceremonial', emoji: '🪑' },
      { id: 'cemi', x: 550, y: 800, recogido: false, nombre: 'Cemí de Madera', emoji: '🗿' },
      { id: 'vasija', x: 350, y: 1150, recogido: false, nombre: 'Vasija Taína', emoji: '🏺' }
    ];
    this._artefactosRecogidos = 0;

    // --- Bolsas de aire (burbujas que recargan O₂) ---
    this._bolsasAire = [
      { x: 400, y: 300, activa: true },
      { x: 250, y: 650, activa: true },
      { x: 500, y: 1000, activa: true }
    ];

    // --- Corrientes laterales que empujan al jugador ---
    this._corrientes = [
      { x: 100, y: 500, ancho: 600, alto: 80, fuerza: 1.5, dir: 'derecha' },
      { x: 100, y: 900, ancho: 600, alto: 80, fuerza: -1.5, dir: 'izquierda' }
    ];

    // Diálogo de entrada
    const t = this._obtenerTextos()?.dialogos?.cenoteBuceo;
    this.dialogos.iniciarDialogo([
      { personaje: '🤿', texto: t?.entrada1 || 'Te sumerges en las aguas oscuras del cenote. El agua está fría y tranquila.' },
      { personaje: '🤿', texto: t?.entrada2 || 'Tu equipo de buceo detecta señales de artefactos en 3 profundidades. Búscalos con cuidado.' },
      { personaje: '🤿', texto: t?.entrada3 || '¡Atención! Tu oxígeno es limitado. Busca burbujas de aire para recargarlo.' }
    ]);
  }

  actualizar(dt, entrada, jugador, companeros) {
    if (!jugador) return;
    this.tiempoTotal += dt;

    // --- Diálogo ---
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

    // --- Oxígeno se agota ---
    this._oxigeno -= dt;
    if (this._oxigeno <= 0) {
      this._oxigeno = 0;
      jugador.vida = Math.max(0, jugador.vida - 3 * dt);
    }

    // --- Movimiento de natación (más lento que caminar) ---
    jugador.velocidadX = 0;
    jugador.velocidadY = 0;
    jugador.esAnimando = false;
    const vel = VELOCIDAD_JUGADOR * 0.6;

    if (entrada.estaPresionada('arriba')) { jugador.velocidadY = -vel; jugador.esAnimando = true; }
    if (entrada.estaPresionada('abajo')) { jugador.velocidadY = vel; jugador.esAnimando = true; }
    if (entrada.estaPresionada('izquierda')) { jugador.velocidadX = -vel; jugador.esAnimando = true; }
    if (entrada.estaPresionada('derecha')) { jugador.velocidadX = vel; jugador.esAnimando = true; }

    const factorTiempo = dt * 60;

    // Aplicar corrientes
    for (const c of this._corrientes) {
      if (jugador.x + 14 > c.x && jugador.x < c.x + c.ancho &&
          jugador.y + 16 > c.y && jugador.y < c.y + c.alto) {
        jugador.velocidadX += c.fuerza;
      }
    }

    jugador.x += jugador.velocidadX * factorTiempo;
    jugador.y += jugador.velocidadY * factorTiempo;

    // Límites
    jugador.x = Math.max(20, Math.min(jugador.x, this.anchoNivel - 50));
    jugador.y = Math.max(10, Math.min(jugador.y, this.altoNivel - 40));

    // --- Recoger artefactos ---
    if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      for (const art of this._artefactos) {
        if (art.recogido) continue;
        const dx = (jugador.x + 14) - art.x;
        const dy = (jugador.y + 16) - art.y;
        if (Math.sqrt(dx * dx + dy * dy) < 35) {
          art.recogido = true;
          this._artefactosRecogidos++;
          this.sfx.recoger();
          const t = this._obtenerTextos()?.dialogos?.cenoteBuceo;
          this.dialogos.iniciarDialogo([
            { personaje: art.emoji, texto: t?.[art.id] || `¡Encontraste: ${art.nombre}!` }
          ]);
          this.bloqueoEntrada = true;

          // Verificar si se recogieron los 3
          if (this._artefactosRecogidos >= 3) {
            this._completarCenote();
          }
          break;
        }
      }
    }
    if (!entrada.estaPresionada('accion')) this.bloqueoEntrada = false;

    // --- Bolsas de aire ---
    for (const b of this._bolsasAire) {
      if (!b.activa) continue;
      const dx = (jugador.x + 14) - b.x;
      const dy = (jugador.y + 16) - b.y;
      if (Math.sqrt(dx * dx + dy * dy) < 30) {
        b.activa = false;
        this._oxigeno = Math.min(this._oxigenoMax, this._oxigeno + 40);
        this.sfx.recoger();
        this.juego?.mostrarToast('🫧 +40s oxígeno', 2);
      }
    }

    // --- Burbujas decorativas ---
    if (Math.random() < 0.05) {
      this._burbujas.push({
        x: Math.random() * this.anchoNivel,
        y: this.altoNivel,
        vel: 0.5 + Math.random() * 1
      });
    }
    this._burbujas = this._burbujas.filter(b => {
      b.y -= b.vel;
      b.x += Math.sin(b.y * 0.05) * 0.3;
      return b.y > -10;
    });

    // Cámara
    this.camaraX = jugador.x - ANCHO_JUEGO / 2 + 14;
    this.camaraY = jugador.y - ALTO_JUEGO / 2 + 16;
    this.camaraX = Math.max(0, Math.min(this.camaraX, this.anchoNivel - ANCHO_JUEGO));
    this.camaraY = Math.max(0, Math.min(this.camaraY, this.altoNivel - ALTO_JUEGO));

    // Salir con M
    if (entrada.estaPresionada('mapa')) {
      this.juego.cambiarEscena('mapaPrincipal');
    }
  }

  // --- Completar la exploración del cenote ---
  _completarCenote() {
    const t = this._obtenerTextos()?.dialogos?.cenoteBuceo;

    // Marcar fase como completada
    if (this.juego?.progreso?.mundos) {
      this.juego.progreso.mundos.manantialAleta = { fase: 'completado' };
    }

    // Descubrir sidequest ofrendasAleta
    if (this.juego?.misiones) {
      this.juego.misiones.descubrir('ofrendasAleta');
      this.juego.misiones.iniciar('ofrendasAleta');

      const mis = this._obtenerTextos()?.misiones || {};
      if (this.juego.registro) {
        this.juego.registro.agregarEntrada('secundaria',
          mis.ofrendasAletaTitulo || 'Ofrendas del Cenote',
          mis.ofrendasAletaDesc || 'Llevar los 3 artefactos taínos al Museo del Hombre Dominicano en Santo Domingo.'
        );
      }
    }

    // Desbloquear nodo del Museo del Hombre Dominicano
    if (this.juego?.progreso && !this.juego.progreso.nodosDesbloqueados.includes(13)) {
      this.juego.progreso.nodosDesbloqueados.push(13);
    }

    // Diálogo de celebración (se muestra tras el diálogo del artefacto)
    setTimeout(() => {
      this.dialogos.iniciarDialogo([
        { personaje: '🤿', texto: t?.completado1 || '¡Has encontrado las 3 ofrendas taínas del cenote!' },
        { personaje: '🤿', texto: t?.completado2 || 'Un duho ceremonial, un cemí de madera y una vasija ritual — preservados 500 años en estas aguas.' },
        { personaje: '🤿', texto: t?.completado3 || 'Debes llevar estos artefactos al Museo del Hombre Dominicano en Santo Domingo para que sean estudiados y protegidos.' }
      ], () => {
        this.juego?.mostrarToast(t?.completadoToast || '📋 Misión descubierta: Ofrendas del Cenote', 4);
        this.juego.cambiarEscena('mapaPrincipal');
      });
    }, 500);
  }

  dibujar(renderizador, ancho, alto, textos, jugador) {
    const ctx = renderizador.ctx || renderizador;
    if (!jugador) return;

    ctx.save();
    ctx.translate(-this.camaraX, -this.camaraY);

    // --- Fondo del cenote (gradiente de profundidad) ---
    const grad = ctx.createLinearGradient(0, 0, 0, this.altoNivel);
    grad.addColorStop(0, '#0a2a3a');
    grad.addColorStop(0.3, '#061a2a');
    grad.addColorStop(0.7, '#03101a');
    grad.addColorStop(1, '#010810');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.anchoNivel, this.altoNivel);

    // Paredes rocosas del cenote
    ctx.fillStyle = '#0f1a15';
    ctx.fillRect(0, 0, 30, this.altoNivel);
    ctx.fillRect(this.anchoNivel - 30, 0, 30, this.altoNivel);

    // Texturas de roca en las paredes
    ctx.strokeStyle = '#1a2520';
    ctx.lineWidth = 1;
    for (let i = 0; i < 30; i++) {
      const wy = (i * 97) % this.altoNivel;
      ctx.beginPath();
      ctx.moveTo(30, wy);
      ctx.lineTo(30 + (i % 4) * 5, wy + 15);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(this.anchoNivel - 30, wy);
      ctx.lineTo(this.anchoNivel - 30 - (i % 4) * 5, wy + 15);
      ctx.stroke();
    }

    // --- Corrientes (visualizadas como líneas ondulantes) ---
    for (const c of this._corrientes) {
      ctx.strokeStyle = 'rgba(100, 180, 255, 0.15)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        const ly = c.y + i * (c.alto / 5);
        ctx.beginPath();
        for (let lx = c.x; lx < c.x + c.ancho; lx += 10) {
          ctx.lineTo(lx, ly + Math.sin((lx + this.tiempoTotal * 100) * 0.03) * 5);
        }
        ctx.stroke();
      }
    }

    // --- Burbujas ---
    ctx.fillStyle = 'rgba(150, 200, 255, 0.3)';
    for (const b of this._burbujas) {
      ctx.beginPath();
      ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- Bolsas de aire ---
    for (const b of this._bolsasAire) {
      if (!b.activa) continue;
      ctx.fillStyle = 'rgba(100, 200, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(b.x, b.y, 12 + Math.sin(this.tiempoTotal * 3) * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '14px monospace';
      ctx.fillText('🫧', b.x - 7, b.y + 5);
    }

    // --- Artefactos ---
    for (const art of this._artefactos) {
      if (art.recogido) continue;
      // Brillo dorado pulsante
      const brillo = 0.5 + Math.sin(this.tiempoTotal * 2) * 0.3;
      const gradArt = ctx.createRadialGradient(art.x, art.y, 5, art.x, art.y, 25);
      gradArt.addColorStop(0, `rgba(255, 200, 50, ${brillo})`);
      gradArt.addColorStop(1, 'rgba(255, 200, 50, 0)');
      ctx.fillStyle = gradArt;
      ctx.fillRect(art.x - 25, art.y - 25, 50, 50);
      // Ícono
      ctx.font = '20px monospace';
      ctx.fillText(art.emoji, art.x - 10, art.y + 7);
    }

    // --- Jugador (buzos) ---
    this._dibujarBuzo(ctx, jugador);

    ctx.restore();

    // --- Oscuridad submarina ---
    this._dibujarOscuridadSubmarina(ctx, ancho, alto, jugador);

    // --- HUD ---
    // Oxígeno
    const oxPct = this._oxigeno / this._oxigenoMax;
    ctx.fillStyle = '#222';
    ctx.fillRect(15, 15, 100, 14);
    ctx.fillStyle = oxPct > 0.3 ? '#4488CC' : oxPct > 0.15 ? '#CCAA22' : '#CC4444';
    ctx.fillRect(15, 15, 100 * oxPct, 14);
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.strokeRect(15, 15, 100, 14);
    ctx.fillStyle = '#FFF';
    ctx.font = '10px monospace';
    ctx.fillText(`O₂: ${Math.ceil(this._oxigeno)}s`, 18, 26);

    // Artefactos recogidos
    ctx.fillStyle = this._artefactosRecogidos >= 3 ? '#44CC44' : '#CCAA44';
    ctx.font = '12px monospace';
    ctx.fillText(`🏺 ${this._artefactosRecogidos}/3`, ancho - 70, 26);

    // Profundidad
    ctx.fillStyle = '#AAAAAA';
    ctx.font = '11px monospace';
    const profundidad = Math.floor((jugador.y / this.altoNivel) * 40);
    ctx.fillText(`${profundidad}m`, ancho - 40, 45);

    // Diálogo
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto, textos);
    }
  }

  _dibujarBuzo(ctx, jugador) {
    const x = jugador.x;
    const y = jugador.y;
    // Traje de buceo
    ctx.fillStyle = '#1a3a5a';
    ctx.fillRect(x + 2, y + 4, 24, 20);
    // Cabeza con máscara
    ctx.fillStyle = '#DEB887';
    ctx.fillRect(x + 6, y - 2, 16, 10);
    // Máscara de buceo
    ctx.fillStyle = '#44AADD';
    ctx.fillRect(x + 8, y, 12, 6);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 8, y, 12, 6);
    // Tanque de oxígeno
    ctx.fillStyle = '#CCCC00';
    ctx.fillRect(x + 1, y + 6, 6, 14);
    // Aletas
    ctx.fillStyle = '#2255AA';
    ctx.fillRect(x + 4, y + 24, 10, 8);
    ctx.fillRect(x + 16, y + 24, 10, 8);
  }

  _dibujarOscuridadSubmarina(ctx, ancho, alto, jugador) {
    const luzX = jugador.x + 14 - this.camaraX;
    const luzY = jugador.y + 16 - this.camaraY;
    const radio = 130;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-in';
    const grad = ctx.createRadialGradient(luzX, luzY, 15, luzX, luzY, radio);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.4)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, ancho, alto);
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#010508';
    ctx.fillRect(0, 0, ancho, alto);
    ctx.restore();
  }

  salir() {}

  _obtenerTextos() {
    if (this.juego && this.juego.idiomas) {
      return this.juego.idiomas.traducciones[this.juego.idiomas.idiomaActual];
    }
    return null;
  }
}
