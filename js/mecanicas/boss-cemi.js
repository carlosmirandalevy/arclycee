// ============================================================
// BOSS-CEMI.JS - Boss fight: Espíritu del Cemí (bullet hell)
// ============================================================
// Combate secreto estilo Bloody Hell/Silksong en la Isla Cabritos.
// El jugador coloca un segundo ídolo cemí en un pedestal oculto
// y despierta a un ser divino. Debe esquivar orbes rojos (bullet
// hell) durante 60 segundos hasta que el boss se aturde, entonces
// atacar con la Espada de Enriquillo. 3 ciclos para ganar.
//
// 5 corazones — si pierde todos, despierta como de un sueño.
// Victoria: Bendición Divina (stats permanentes).
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO } from '../motor/configuracion.js';
import { SonidoProcedural } from '../motor/sonido-procedural.js';

export class SistemaBossCemi {

  constructor() {
    this.enJuego = false;
    this.fase = 'intro'; // intro → combate → aturdido → golpe → transicion → victoria/derrota
    this._bloqueoEntrada = true;
    this._alTerminar = null;
    this.sfx = new SonidoProcedural();

    // --- Boss ---
    this._cicloActual = 0;
    this._ciclosParaGanar = 3;
    this._tiempoFase = 0;
    this._tiempoTotal = 0;
    this._tiempoCombate = 0;
    this._duracionCombate = 60;

    // --- Jugador (hitbox pequeño) ---
    this._jugadorX = ANCHO_JUEGO / 2;
    this._jugadorY = ALTO_JUEGO - 100;
    this._jugadorRadio = 4;
    this._jugadorVelocidad = 200;

    // --- Corazones ---
    this._corazones = 5;
    this._corazonesMax = 5;
    this._invulnerable = false;
    this._tiempoInvulnerable = 0;

    // --- Boss sprite ---
    this._bossX = ANCHO_JUEGO / 2;
    this._bossY = 80;
    this._bossAturdido = false;
    this._bossFlash = 0;
    this._bossGolpes = 0;

    // --- Proyectiles ---
    this._proyectiles = [];
    this._maxProyectiles = 200;

    // --- Patrones ---
    this._patronActual = 0;
    this._tiempoPatron = 0;
    this._tiempoPatronGlobal = 0;
    this._duracionPatronActual = 10;
    this._anguloEspiral = 0;
  }

  // --- Iniciar el boss fight ---
  iniciar(config) {
    this.enJuego = true;
    this.fase = 'intro';
    this._bloqueoEntrada = true;
    this._alTerminar = config?.alTerminar || null;

    this._cicloActual = 0;
    this._tiempoFase = 0;
    this._tiempoTotal = 0;
    this._tiempoCombate = 0;

    this._jugadorX = ANCHO_JUEGO / 2;
    this._jugadorY = ALTO_JUEGO - 100;
    this._corazones = this._corazonesMax;
    this._invulnerable = false;

    this._bossX = ANCHO_JUEGO / 2;
    this._bossY = 80;
    this._bossAturdido = false;
    this._bossFlash = 0;
    this._bossGolpes = 0;

    this._proyectiles = [];
    this._patronActual = 0;
    this._tiempoPatron = 0;
    this._tiempoPatronGlobal = 0;
    this._duracionPatronActual = 10;
    this._anguloEspiral = 0;
  }

  // ============================================================
  // ACTUALIZAR
  // ============================================================

  actualizar(dt, entrada) {
    if (!this.enJuego) return;
    this._tiempoTotal += dt;
    this._tiempoFase += dt;

    // Desbloquear input
    if (this._bloqueoEntrada) {
      if (!entrada.estaPresionada('accion') &&
          !entrada.estaPresionada('izquierda') && !entrada.estaPresionada('derecha') &&
          !entrada.estaPresionada('arriba') && !entrada.estaPresionada('abajo')) {
        this._bloqueoEntrada = false;
      }
      if (this.fase !== 'intro' && this.fase !== 'victoria' && this.fase !== 'derrota') return;
    }

    switch (this.fase) {
      case 'intro': this._actualizarIntro(dt, entrada); break;
      case 'combate': this._actualizarCombate(dt, entrada); break;
      case 'aturdido': this._actualizarAturdido(dt, entrada); break;
      case 'golpe': this._actualizarGolpe(dt, entrada); break;
      case 'transicion': this._actualizarTransicion(dt, entrada); break;
      case 'victoria': this._actualizarVictoria(dt, entrada); break;
      case 'derrota': this._actualizarDerrota(dt, entrada); break;
    }
  }

  // --- Intro: texto que introduce la pelea ---
  _actualizarIntro(dt, entrada) {
    if (this._tiempoFase > 2 && entrada.estaPresionada('accion') && !this._bloqueoEntrada) {
      this.fase = 'combate';
      this._tiempoFase = 0;
      this._tiempoCombate = 0;
      this._tiempoPatron = 0;
      this._tiempoPatronGlobal = 0;
      this._duracionPatronActual = 8 + Math.random() * 4;
      this._bloqueoEntrada = true;
    }
  }

  // --- Combate: fase de bullet hell ---
  _actualizarCombate(dt, entrada) {
    this._tiempoCombate += dt;

    // Movimiento del jugador
    this._moverJugador(dt, entrada);

    // Generar patrones de proyectiles
    this._actualizarPatrones(dt);

    // Actualizar proyectiles (puede cambiar fase a 'derrota')
    this._actualizarProyectiles(dt);
    if (this.fase !== 'combate') return; // Murió durante colisión

    // Invulnerabilidad
    if (this._invulnerable) {
      this._tiempoInvulnerable -= dt;
      if (this._tiempoInvulnerable <= 0) this._invulnerable = false;
    }

    // Fin de la fase de combate → boss aturdido
    if (this._tiempoCombate >= this._duracionCombate) {
      this.fase = 'aturdido';
      this._tiempoFase = 0;
      this._proyectiles = [];
      this._bossAturdido = true;
    }
  }

  // --- Aturdido: el boss cae, el jugador puede atacar ---
  _actualizarAturdido(dt, entrada) {
    this._moverJugador(dt, entrada);

    // Boss desciende al centro
    this._bossY += (250 - this._bossY) * Math.min(1, 3 * dt);

    // Atacar con E cerca del boss
    const dx = this._jugadorX - this._bossX;
    const dy = this._jugadorY - this._bossY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 80 && entrada.estaPresionada('accion') && !this._bloqueoEntrada) {
      this._bossGolpes++;
      this.fase = 'golpe';
      this._tiempoFase = 0;
      this._bossFlash = 0.5;
      this.sfx.combateAtacar();
      this._bloqueoEntrada = true;
    }
  }

  // --- Golpe: animación del ataque ---
  _actualizarGolpe(dt, _entrada) {
    this._bossFlash = Math.max(0, this._bossFlash - dt);

    if (this._tiempoFase > 1.0) {
      if (this._bossGolpes >= this._ciclosParaGanar) {
        this.fase = 'victoria';
      } else {
        this.fase = 'transicion';
        this._cicloActual++;
      }
      this._tiempoFase = 0;
      this._bossAturdido = false;
      this._bossY = 80;
      this._proyectiles = [];
      this._bloqueoEntrada = true;
    }
  }

  // --- Transición entre ciclos ---
  _actualizarTransicion(dt, entrada) {
    if (this._tiempoFase > 2 && entrada.estaPresionada('accion') && !this._bloqueoEntrada) {
      this.fase = 'combate';
      this._tiempoFase = 0;
      this._tiempoCombate = 0;
      this._tiempoPatron = 0;
      this._tiempoPatronGlobal = 0;
      this._duracionPatronActual = 8 + Math.random() * 4;
      this._bloqueoEntrada = true;
    }
  }

  // --- Victoria ---
  _actualizarVictoria(dt, entrada) {
    if (this._tiempoFase > 3 && entrada.estaPresionada('accion') && !this._bloqueoEntrada) {
      this.enJuego = false;
      if (this._alTerminar) this._alTerminar('victoria');
    }
    if (!entrada.estaPresionada('accion')) this._bloqueoEntrada = false;
  }

  // --- Derrota: todo fue un sueño ---
  _actualizarDerrota(dt, entrada) {
    if (this._tiempoFase > 2 && entrada.estaPresionada('accion') && !this._bloqueoEntrada) {
      this.enJuego = false;
      if (this._alTerminar) this._alTerminar('derrota');
    }
    if (!entrada.estaPresionada('accion')) this._bloqueoEntrada = false;
  }

  // ============================================================
  // MOVIMIENTO DEL JUGADOR
  // ============================================================

  _moverJugador(dt, entrada) {
    if (entrada.estaPresionada('izquierda')) this._jugadorX -= this._jugadorVelocidad * dt;
    if (entrada.estaPresionada('derecha'))   this._jugadorX += this._jugadorVelocidad * dt;
    if (entrada.estaPresionada('arriba'))    this._jugadorY -= this._jugadorVelocidad * dt;
    if (entrada.estaPresionada('abajo'))     this._jugadorY += this._jugadorVelocidad * dt;
    this._jugadorX = Math.max(20, Math.min(ANCHO_JUEGO - 20, this._jugadorX));
    this._jugadorY = Math.max(100, Math.min(ALTO_JUEGO - 20, this._jugadorY));
  }

  // ============================================================
  // SISTEMA DE PATRONES DE PROYECTILES
  // ============================================================

  _factorDificultad() {
    return 1 + this._cicloActual * 0.3;
  }

  _actualizarPatrones(dt) {
    this._tiempoPatronGlobal += dt;
    if (this._tiempoPatronGlobal > this._duracionPatronActual) {
      this._patronActual = (this._patronActual + 1) % 4;
      this._tiempoPatronGlobal = 0;
      this._tiempoPatron = 0;
      this._duracionPatronActual = 8 + Math.random() * 4;
    }

    const patrones = ['_patronEspiral', '_patronAnillo', '_patronOnda', '_patronDirigido'];
    this[patrones[this._patronActual]](dt);

    // En ciclo 2+, doble patrón simultáneo
    if (this._cicloActual >= 2) {
      this[patrones[(this._patronActual + 2) % 4]](dt);
    }
  }

  // Patrón 1: Espiral — orbes rotan desde el centro del boss
  _patronEspiral(dt) {
    this._tiempoPatron += dt;
    const intervalo = 0.06 / this._factorDificultad();
    if (this._tiempoPatron >= intervalo) {
      this._tiempoPatron -= intervalo;
      this._anguloEspiral += 0.18; // Columnas más juntas (era 0.3)
      const vel = 110 * this._factorDificultad();
      for (let i = 0; i < 2; i++) {
        const ang = this._anguloEspiral + i * Math.PI;
        this._proyectiles.push({
          x: this._bossX, y: this._bossY + 40,
          vx: Math.cos(ang) * vel, vy: Math.sin(ang) * vel,
          radio: 5, color: '#FF3333'
        });
      }
    }
  }

  // Patrón 2: Anillo — ráfaga circular expandiéndose
  _patronAnillo(dt) {
    this._tiempoPatron += dt;
    const intervalo = 1.5 / this._factorDificultad();
    if (this._tiempoPatron >= intervalo) {
      this._tiempoPatron -= intervalo;
      const num = 12 + this._cicloActual * 4;
      const vel = 100 * this._factorDificultad();
      for (let i = 0; i < num; i++) {
        const ang = (Math.PI * 2 / num) * i;
        this._proyectiles.push({
          x: this._bossX, y: this._bossY + 40,
          vx: Math.cos(ang) * vel, vy: Math.sin(ang) * vel,
          radio: 6, color: '#FF5555'
        });
      }
    }
  }

  // Patrón 3: Onda — filas descendentes con movimiento sinusoidal
  _patronOnda(dt) {
    this._tiempoPatron += dt;
    const intervalo = 0.4 / this._factorDificultad();
    if (this._tiempoPatron >= intervalo) {
      this._tiempoPatron -= intervalo;
      const num = 3 + this._cicloActual;
      const espaciado = ANCHO_JUEGO / (num + 1);
      for (let i = 0; i < num; i++) {
        this._proyectiles.push({
          x: espaciado * (i + 1), y: 60,
          vx: 0, vy: 80 * this._factorDificultad(),
          radio: 5, color: '#FF4444',
          _onda: true, _fase: i * 1.2, _amplitud: 60
        });
      }
    }
  }

  // Patrón 4: Dirigido — orbes apuntados al jugador
  _patronDirigido(dt) {
    this._tiempoPatron += dt;
    const intervalo = 0.6 / this._factorDificultad();
    if (this._tiempoPatron >= intervalo) {
      this._tiempoPatron -= intervalo;
      const num = 1 + this._cicloActual;
      const vel = 150 * this._factorDificultad();
      const dx = this._jugadorX - this._bossX;
      const dy = this._jugadorY - (this._bossY + 40);
      const baseAng = Math.atan2(dy, dx);
      for (let i = 0; i < num; i++) {
        const spread = (i - (num - 1) / 2) * 0.15;
        const ang = baseAng + spread;
        this._proyectiles.push({
          x: this._bossX, y: this._bossY + 40,
          vx: Math.cos(ang) * vel, vy: Math.sin(ang) * vel,
          radio: 7, color: '#FF2222'
        });
      }
    }
  }

  // ============================================================
  // ACTUALIZAR PROYECTILES
  // ============================================================

  _actualizarProyectiles(dt) {
    for (let i = this._proyectiles.length - 1; i >= 0; i--) {
      const p = this._proyectiles[i];
      // Movimiento sinusoidal para orbes onda
      if (p._onda) {
        p.x += Math.cos(this._tiempoTotal * 3 + p._fase) * p._amplitud * dt;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      // Fuera de pantalla → eliminar
      if (p.x < -20 || p.x > ANCHO_JUEGO + 20 || p.y < -20 || p.y > ALTO_JUEGO + 20) {
        this._proyectiles.splice(i, 1);
        continue;
      }

      // Colisión con jugador
      if (!this._invulnerable) {
        const dx = p.x - this._jugadorX;
        const dy = p.y - this._jugadorY;
        if (Math.sqrt(dx * dx + dy * dy) < p.radio + this._jugadorRadio) {
          this._recibirGolpe();
          this._proyectiles.splice(i, 1);
          // Si murió, dejar de procesar proyectiles
          if (this.fase === 'derrota') return;
        }
      }
    }

    // Limitar cantidad
    if (this._proyectiles.length > this._maxProyectiles) {
      this._proyectiles.splice(0, this._proyectiles.length - this._maxProyectiles);
    }
  }

  _recibirGolpe() {
    this._corazones--;
    this._invulnerable = true;
    this._tiempoInvulnerable = 1.5;
    this.sfx.combateContraataque();
    if (this._corazones <= 0) {
      this.fase = 'derrota';
      this._tiempoFase = 0;
      this._proyectiles = [];
    }
  }

  // ============================================================
  // DIBUJAR
  // ============================================================

  dibujar(ctx, ancho, alto, textos) {
    if (!this.enJuego) return;
    const t = textos || {};

    // Fondo oscuro con tinte púrpura (dimensión espiritual)
    const grad = ctx.createLinearGradient(0, 0, 0, alto);
    grad.addColorStop(0, '#0a0515');
    grad.addColorStop(0.5, '#150a25');
    grad.addColorStop(1, '#0a0a1a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, ancho, alto);

    // Estrellas de fondo (partículas estáticas)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let i = 0; i < 60; i++) {
      const sx = (i * 137 + 42) % ancho;
      const sy = (i * 197 + 13) % alto;
      ctx.fillRect(sx, sy, 1, 1);
    }

    // --- Fase INTRO ---
    if (this.fase === 'intro') {
      ctx.textAlign = 'center';
      ctx.font = 'bold 24px monospace';
      ctx.fillStyle = '#FFD700';
      ctx.fillText(t.titulo || 'Espíritu del Cemí', ancho / 2, alto / 2 - 60);
      ctx.font = '14px monospace';
      ctx.fillStyle = '#CCAAFF';
      ctx.fillText(t.intro1 || 'El cemí brilla con una luz sobrenatural...', ancho / 2, alto / 2 - 20);
      ctx.fillText(t.intro2 || 'Una presencia antigua despierta.', ancho / 2, alto / 2 + 5);
      ctx.fillText(t.intro3 || '¡Esquiva los orbes y sobrevive!', ancho / 2, alto / 2 + 30);
      if (this._tiempoFase > 2) {
        const parpadeo = 0.5 + Math.sin(this._tiempoTotal * 4) * 0.3;
        ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
        ctx.font = 'bold 13px monospace';
        ctx.fillText(t.continuar || '[E] Comenzar', ancho / 2, alto / 2 + 80);
      }
      ctx.textAlign = 'left';
      return;
    }

    // --- Fase DERROTA ---
    if (this.fase === 'derrota') {
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(1, this._tiempoFase)})`;
      ctx.fillRect(0, 0, ancho, alto);
      ctx.font = 'bold 20px monospace';
      ctx.fillStyle = '#888888';
      ctx.fillText(t.derrota || 'La visión se desvanece... despiertas frente al pedestal.', ancho / 2, alto / 2);
      if (this._tiempoFase > 2) {
        ctx.font = '13px monospace';
        ctx.fillStyle = '#666666';
        ctx.fillText('[E]', ancho / 2, alto / 2 + 40);
      }
      ctx.textAlign = 'left';
      return;
    }

    // --- Fase VICTORIA ---
    if (this.fase === 'victoria') {
      this._dibujarBoss(ctx, ancho);
      ctx.textAlign = 'center';
      ctx.font = 'bold 20px monospace';
      ctx.fillStyle = '#FFD700';
      ctx.fillText(t.victoria || 'Has dominado al espíritu del cemí.', ancho / 2, alto / 2 - 20);
      ctx.font = '14px monospace';
      ctx.fillStyle = '#CCAAFF';
      ctx.fillText(t.bendicion || 'Recibes la Bendición Divina', ancho / 2, alto / 2 + 15);
      if (this._tiempoFase > 3) {
        const p = 0.5 + Math.sin(this._tiempoTotal * 4) * 0.3;
        ctx.fillStyle = `rgba(255, 215, 0, ${p})`;
        ctx.font = 'bold 13px monospace';
        ctx.fillText('[E]', ancho / 2, alto / 2 + 60);
      }
      ctx.textAlign = 'left';
      return;
    }

    // --- Boss ---
    this._dibujarBoss(ctx, ancho);

    // --- Proyectiles ---
    for (const p of this._proyectiles) {
      // Resplandor (círculo más grande, semi-transparente)
      ctx.fillStyle = 'rgba(255, 50, 50, 0.2)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radio + 3, 0, Math.PI * 2);
      ctx.fill();
      // Orbe sólido
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- Jugador (hitbox visible) ---
    const visible = !this._invulnerable || Math.sin(this._tiempoTotal * 20) > 0;
    if (visible) {
      // Aura
      ctx.fillStyle = 'rgba(100, 200, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(this._jugadorX, this._jugadorY, 12, 0, Math.PI * 2);
      ctx.fill();
      // Cuerpo
      ctx.fillStyle = '#44BBFF';
      ctx.beginPath();
      ctx.arc(this._jugadorX, this._jugadorY, 6, 0, Math.PI * 2);
      ctx.fill();
      // Hitbox (punto brillante central)
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(this._jugadorX, this._jugadorY, this._jugadorRadio, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- Corazones (arriba derecha) ---
    ctx.font = '18px monospace';
    for (let i = 0; i < this._corazonesMax; i++) {
      ctx.fillStyle = i < this._corazones ? '#FF4444' : '#333333';
      ctx.fillText('♥', ancho - 30 - (this._corazonesMax - 1 - i) * 24, 30);
    }

    // --- Barra de tiempo (arriba) ---
    if (this.fase === 'combate') {
      const progreso = this._tiempoCombate / this._duracionCombate;
      ctx.fillStyle = '#222222';
      ctx.fillRect(50, 8, ancho - 100, 6);
      ctx.fillStyle = progreso < 0.7 ? '#CCAAFF' : '#FFD700';
      ctx.fillRect(50, 8, (ancho - 100) * progreso, 6);
    }

    // --- Indicador de ciclo ---
    ctx.font = '11px monospace';
    ctx.fillStyle = '#888888';
    ctx.textAlign = 'left';
    ctx.fillText(`${t.ciclo || 'Ciclo'} ${this._cicloActual + 1}/${this._ciclosParaGanar}`, 10, 25);

    // --- Fase ATURDIDO: indicador de ataque ---
    if (this.fase === 'aturdido') {
      const dx = this._jugadorX - this._bossX;
      const dy = this._jugadorY - this._bossY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        const p = 0.5 + Math.sin(this._tiempoTotal * 4) * 0.3;
        ctx.font = 'bold 13px monospace';
        ctx.fillStyle = `rgba(255, 215, 0, ${p})`;
        ctx.textAlign = 'center';
        ctx.fillText(t.atacar || '[E] Atacar con la Espada de Enriquillo', ancho / 2, this._bossY + 70);
        ctx.textAlign = 'left';
      }
      // Texto de aturdimiento
      ctx.font = 'bold 14px monospace';
      ctx.fillStyle = '#CCAAFF';
      ctx.textAlign = 'center';
      ctx.fillText(t.aturdido || '¡El espíritu está aturdido!', ancho / 2, 50);
      ctx.textAlign = 'left';
    }

    // --- Fase TRANSICIÓN ---
    if (this.fase === 'transicion') {
      ctx.textAlign = 'center';
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = '#CCAAFF';
      ctx.fillText(`${t.ciclo || 'Ciclo'} ${this._cicloActual + 1}/${this._ciclosParaGanar}`, ancho / 2, alto / 2);
      if (this._tiempoFase > 2) {
        const p = 0.5 + Math.sin(this._tiempoTotal * 4) * 0.3;
        ctx.fillStyle = `rgba(255, 215, 0, ${p})`;
        ctx.font = '13px monospace';
        ctx.fillText('[E]', ancho / 2, alto / 2 + 40);
      }
      ctx.textAlign = 'left';
    }

    // --- Controles (abajo) ---
    ctx.font = '10px monospace';
    ctx.fillStyle = '#444444';
    ctx.textAlign = 'center';
    ctx.fillText(t.controles || 'WASD/Flechas: esquivar | E: atacar (cuando aturdido)', ancho / 2, alto - 10);
    ctx.textAlign = 'left';
  }

  // --- Dibujar el boss (ser divino) ---
  _dibujarBoss(ctx, ancho) {
    ctx.save();
    const bx = this._bossX;
    const by = this._bossY;
    const float = Math.sin(this._tiempoTotal * 2) * 5;

    // Flash blanco al ser golpeado
    if (this._bossFlash > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${this._bossFlash})`;
      ctx.beginPath();
      ctx.arc(bx, by + float, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    // Aura púrpura pulsante
    const pulso = 0.3 + Math.sin(this._tiempoTotal * 3) * 0.15;
    ctx.fillStyle = `rgba(150, 80, 200, ${pulso})`;
    ctx.beginPath();
    ctx.arc(bx, by + float, 55, 0, Math.PI * 2);
    ctx.fill();

    // Cuerpo del ser (óvalo oscuro)
    ctx.fillStyle = this._bossAturdido ? '#4a3a6a' : '#6a4a9a';
    ctx.beginPath();
    ctx.ellipse(bx, by + float, 35, 40, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ojos (brillantes, rojos cuando ataca, apagados cuando aturdido)
    if (!this._bossAturdido) {
      ctx.fillStyle = '#FF3333';
      ctx.beginPath();
      ctx.arc(bx - 12, by - 8 + float, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(bx + 12, by - 8 + float, 5, 0, Math.PI * 2);
      ctx.fill();
      // Pupilas
      ctx.fillStyle = '#FFAA00';
      ctx.beginPath();
      ctx.arc(bx - 12, by - 8 + float, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(bx + 12, by - 8 + float, 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Ojos cerrados (líneas)
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bx - 16, by - 8 + float); ctx.lineTo(bx - 8, by - 8 + float);
      ctx.moveTo(bx + 8, by - 8 + float); ctx.lineTo(bx + 16, by - 8 + float);
      ctx.stroke();
    }

    // Símbolo cemí en el pecho
    ctx.fillStyle = '#FFD700';
    ctx.font = '20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('☀', bx, by + 15 + float);
    ctx.textAlign = 'left';

    // Golpes recibidos (marcas)
    ctx.fillStyle = '#FF6600';
    for (let g = 0; g < this._bossGolpes; g++) {
      ctx.fillRect(bx - 20 + g * 15, by + 30 + float, 10, 3);
    }
    ctx.restore();
  }
}
