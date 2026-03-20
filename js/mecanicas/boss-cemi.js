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
      this.sfx.bossAturdido();
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
      this._bossFlash = 0;
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
      this._bossFlash = 0;
      this._bossAturdido = false;
      this._bossY = 80;
      this._bloqueoEntrada = true;
    }
  }

  // --- Victoria ---
  _actualizarVictoria(dt, entrada) {
    // Sonido de bendición al llegar al momento de la bendición
    if (!this._bendicionSonada && this._tiempoFase > 7) {
      this._bendicionSonada = true;
      this.sfx.bossBendicion();
    }
    if (this._tiempoFase > 8 && entrada.estaPresionada('accion') && !this._bloqueoEntrada) {
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
      this.sfx.bossAnillo();
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
      this.sfx.bossDirigido();
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

    // --- Fase VICTORIA (cutscene animada con progresión emocional) ---
    if (this.fase === 'victoria') {
      // Progresión emocional: furioso (rojo) → calmado (dorado/cálido)
      // 0-3s: furioso (rojo), 3-6s: transición, 6+: cálido (dorado)
      const progreso = Math.min(1, this._tiempoFase / 6); // 0→1 en 6 segundos

      // Fondo cambia de rojo oscuro a púrpura cálido
      const gradFondo = ctx.createLinearGradient(0, 0, 0, alto);
      const rF = Math.floor(30 - progreso * 15);
      const gF = Math.floor(5 + progreso * 15);
      const bF = Math.floor(10 + progreso * 25);
      gradFondo.addColorStop(0, `rgb(${rF}, ${gF}, ${bF})`);
      gradFondo.addColorStop(1, `rgb(${rF - 5}, ${gF + 5}, ${bF + 10})`);
      ctx.fillStyle = gradFondo;
      ctx.fillRect(0, 0, ancho, alto);

      // Relámpagos en el fondo (muestran el poder del ser)
      if (Math.random() < 0.03 + (1 - progreso) * 0.05) {
        // Rayo aleatorio
        const rayoX = Math.random() * ancho;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 + Math.random() * 0.4})`;
        ctx.lineWidth = 1 + Math.random() * 2;
        ctx.beginPath();
        ctx.moveTo(rayoX, 0);
        let ry = 0;
        while (ry < alto) {
          ry += 20 + Math.random() * 30;
          ctx.lineTo(rayoX + (Math.random() - 0.5) * 40, ry);
        }
        ctx.stroke();
        // Flash del cielo
        ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + (1 - progreso) * 0.08})`;
        ctx.fillRect(0, 0, ancho, alto);
      }

      // Aura del boss: roja cuando furioso, dorada cuando calmado
      const auraR = Math.floor(255 - progreso * 55);
      const auraG = Math.floor(50 + progreso * 165);
      const auraB = Math.floor(50 + progreso * 100);
      const auraAlpha = 0.2 + Math.sin(this._tiempoTotal * 3) * 0.1;
      ctx.fillStyle = `rgba(${auraR}, ${auraG}, ${auraB}, ${auraAlpha})`;
      ctx.beginPath();
      ctx.arc(this._bossX, this._bossY, 80 + Math.sin(this._tiempoTotal * 2) * 10, 0, Math.PI * 2);
      ctx.fill();

      // Partículas: rojas al inicio, doradas al final
      const numParticulas = Math.min(25, Math.floor(this._tiempoFase * 3));
      for (let i = 0; i < numParticulas; i++) {
        const angP = (i / numParticulas) * Math.PI * 2 + this._tiempoTotal * (1.5 - progreso * 0.5);
        const radioP = 60 + Math.sin(this._tiempoTotal * 2 + i) * 20;
        const px = this._bossX + Math.cos(angP) * radioP;
        const py = this._bossY + Math.sin(angP) * radioP;
        const pR = Math.floor(255 - progreso * 55);
        const pG = Math.floor(80 + progreso * 135);
        const pB = Math.floor(50 + progreso * 100);
        const pAlpha = 0.3 + Math.sin(this._tiempoTotal * 4 + i) * 0.2;
        ctx.fillStyle = `rgba(${pR}, ${pG}, ${pB}, ${pAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, 2 + Math.sin(i) * 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Haz de luz dorada que crece durante la bendición
      if (this._tiempoFase > 6) {
        const luzAlpha = Math.min(0.2, (this._tiempoFase - 6) * 0.06);
        const gradLuz = ctx.createRadialGradient(this._bossX, this._bossY, 10, this._bossX, this._bossY, 250);
        gradLuz.addColorStop(0, `rgba(255, 215, 0, ${luzAlpha})`);
        gradLuz.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = gradLuz;
        ctx.fillRect(0, 0, ancho, alto);
      }

      this._dibujarBoss(ctx, ancho);
      ctx.textAlign = 'center';

      // Diálogo del espíritu (aparece gradualmente, color cambia con emoción)
      const lineas = [
        { texto: t.victoriaDialogo1 || '¡¿Cómo te ATREVES a despertarme de mi sueño eterno?!', color: '#FF4444' },
        { texto: t.victoriaDialogo2 || 'Pero... debo admitir que esta gloriosa batalla ha sido lo más divertido que he tenido en siglos.', color: '#FF8866' },
        { texto: t.victoriaDialogo3 || 'Así que he decidido bendecirte, hijo mío.', color: '#FFBB88' },
        { texto: t.victoriaDialogo4 || 'Pero no me hagas enfadar de nuevo... o sentirás todo el poder de mi ira.', color: '#FFAA66' }
      ];

      const lineaVisible = Math.min(lineas.length, Math.floor(this._tiempoFase / 1.5) + 1);
      let ly = alto / 2 - 50;

      for (let i = 0; i < lineaVisible; i++) {
        ctx.font = i === 0 ? 'bold 14px monospace' : '13px monospace';
        ctx.fillStyle = lineas[i].color;
        ctx.fillText(lineas[i].texto, ancho / 2, ly);
        ly += 22;
      }

      // Después de todo el diálogo, mostrar la bendición
      if (this._tiempoFase > 7) {
        ctx.font = 'bold 16px monospace';
        ctx.fillStyle = '#FFD700';
        ctx.fillText(t.bendicion || '✨ Recibes la Bendición Divina ✨', ancho / 2, ly + 15);
        ctx.font = '12px monospace';
        ctx.fillStyle = '#CCAAFF';
        ctx.fillText(t.bendicionDetalle || '+30 vida máxima | +5 fuerza | +20% velocidad', ancho / 2, ly + 35);
      }

      if (this._tiempoFase > 8) {
        const p = 0.5 + Math.sin(this._tiempoTotal * 4) * 0.3;
        ctx.fillStyle = `rgba(255, 215, 0, ${p})`;
        ctx.font = 'bold 13px monospace';
        ctx.fillText('[E]', ancho / 2, ly + 65);
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
