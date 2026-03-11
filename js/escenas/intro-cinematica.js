// ============================================================
// INTRO-CINEMATICA.JS - La secuencia animada de introducción
// ============================================================
// Cuenta la historia de cómo el jugador descubre la reliquia
// en una obra de construcción y cae en las cuevas subterráneas.
// Usa pasos secuenciales con efectos de fade, texto, temblor
// de pantalla y sonidos procedurales para crear tensión.
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO } from '../motor/configuracion.js';
import { SonidoProcedural } from '../motor/sonido-procedural.js';

export class IntroCinematica {

  constructor() {
    // Paso actual de la cinemática (0 a 5)
    this.paso = 0;

    // Temporizador para avanzar automáticamente entre pasos
    this.temporizador = 0;

    // Texto que se muestra en el paso actual
    this.textoActual = '';

    // Opacidad general para fade in/out
    this.opacidad = 0;

    // Efecto de temblor (terremoto)
    this.temblor = 0;

    // Posición Y del personaje cayendo (paso 4)
    this.personajeCaidaY = 200;

    // Posición X del personaje caminando (paso 1)
    this.personajeCaminaX = -30;

    // Efecto de destello/brillo (paso 2)
    this.brilloOpacidad = 0;
    this.brilloTiempo = 0;

    // Bloqueo de entrada
    this.bloqueoEntrada = false;

    // Duración de cada paso
    this.duracionesPasos = [3.5, 4.0, 3.5, 3.0, 3.5, 4.0];

    // --- Sonidos procedurales ---
    this.sfx = new SonidoProcedural();

    // Control de sonidos: evitamos tocar el mismo sonido varias veces
    this._sonidoPasoTocado = -1;

    // Temporizador para pasos del personaje caminando
    this._tiempoProximoPaso = 0;

    // Temporizador para sonido de viento/caída
    this._tiempoProximoViento = 0;

    // Temporizador para crujidos del terremoto
    this._tiempoProximoCrujido = 0;
  }

  // --- Preparar la cinemática ---
  iniciar(juego) {
    this.juego = juego;
    this.paso = 0;
    this.temporizador = 0;
    this.opacidad = 0;
    this.temblor = 0;
    this.personajeCaidaY = 200;
    this.personajeCaminaX = -30;
    this.bloqueoEntrada = false;
    this._sonidoPasoTocado = -1;
    this._tiempoProximoPaso = 0;
    this._tiempoProximoViento = 0;
    this._tiempoProximoCrujido = 0;
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, _jugador, _companeros) {
    this.temporizador += dt;

    // Permitir saltar la intro con el botón de acción
    if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      this._avanzarPaso();
      this.bloqueoEntrada = true;
    }

    if (!entrada.estaPresionada('accion')) {
      this.bloqueoEntrada = false;
    }

    // Avance automático
    const duracion = this.duracionesPasos[this.paso] || 3.5;
    if (this.temporizador >= duracion) {
      this._avanzarPaso();
    }

    // --- Animaciones y sonidos por paso ---
    switch (this.paso) {
      case 0:
        // Fade in del texto inicial
        this.opacidad = Math.min(1, this.temporizador / 1.5);

        // Sonido ambiental: un tono bajo misterioso al inicio
        if (this._sonidoPasoTocado < 0) {
          this._sonidoPasoTocado = 0;
          this._tocarAmbienteMisterio();
        }
        break;

      case 1:
        // Personaje camina de izquierda a derecha
        this.opacidad = 1;
        this.personajeCaminaX += 60 * dt;
        if (this.personajeCaminaX > ANCHO_JUEGO * 0.6) {
          this.personajeCaminaX = ANCHO_JUEGO * 0.6;
        }

        // Sonido de pasos mientras camina
        this._tiempoProximoPaso -= dt;
        if (this._tiempoProximoPaso <= 0 && this.personajeCaminaX < ANCHO_JUEGO * 0.6) {
          this.sfx.paso();
          this._tiempoProximoPaso = 0.35;
        }
        break;

      case 2:
        // Brillo parpadeante — algo brilla entre los escombros
        this.brilloTiempo += dt * 5;
        this.brilloOpacidad = (Math.sin(this.brilloTiempo) + 1) / 2;

        // Sonido de descubrimiento al entrar en este paso
        if (this._sonidoPasoTocado < 2) {
          this._sonidoPasoTocado = 2;
          this.sfx.descubrir();
        }
        break;

      case 3:
        // Temblor de pantalla — terremoto
        this.temblor = Math.min(8, this.temporizador * 3);

        // Sonido de terremoto: crujidos y golpes graves repetidos
        if (this._sonidoPasoTocado < 3) {
          this._sonidoPasoTocado = 3;
          this._tocarTerremoto();
        }

        // Crujidos continuos durante el temblor
        this._tiempoProximoCrujido -= dt;
        if (this._tiempoProximoCrujido <= 0) {
          this._tocarCrujido();
          this._tiempoProximoCrujido = 0.3 + Math.random() * 0.4;
        }
        break;

      case 4:
        // Personaje cae
        this.personajeCaidaY += 150 * dt;
        this.opacidad = Math.min(1, this.temporizador / 2);

        // Sonido de viento/caída al inicio del paso
        if (this._sonidoPasoTocado < 4) {
          this._sonidoPasoTocado = 4;
          this._tocarVientoCaida();
        }

        // Sonido de viento continuo mientras cae
        this._tiempoProximoViento -= dt;
        if (this._tiempoProximoViento <= 0) {
          this._tocarRafaga();
          this._tiempoProximoViento = 0.4 + Math.random() * 0.3;
        }
        break;

      case 5:
        // Texto final fade in
        this.opacidad = Math.min(1, this.temporizador / 1.5);
        this.temblor = 0;

        // Sonido de impacto al llegar al fondo
        if (this._sonidoPasoTocado < 5) {
          this._sonidoPasoTocado = 5;
          this._tocarImpactoCaida();
        }
        break;
    }
  }

  // --- Dibujar la cinemática ---
  dibujar(renderizador, ancho, alto, textos) {
    const ctx = renderizador.ctx;

    // Aplicar temblor de pantalla
    const temblorX = this.temblor > 0 ? (Math.random() - 0.5) * this.temblor : 0;
    const temblorY = this.temblor > 0 ? (Math.random() - 0.5) * this.temblor : 0;

    ctx.save();
    ctx.translate(temblorX, temblorY);

    switch (this.paso) {
      case 0: this._dibujarPaso0(ctx, ancho, alto); break;
      case 1: this._dibujarPaso1(ctx, ancho, alto); break;
      case 2: this._dibujarPaso2(ctx, ancho, alto); break;
      case 3: this._dibujarPaso3(ctx, ancho, alto); break;
      case 4: this._dibujarPaso4(ctx, ancho, alto); break;
      case 5: this._dibujarPaso5(ctx, ancho, alto); break;
    }

    ctx.restore();

    // Indicador de "presiona para continuar"
    ctx.font = '12px monospace';
    ctx.fillStyle = 'rgba(150, 150, 150, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText('Presiona E para continuar', ancho / 2, alto - 20);
    ctx.textAlign = 'left';
  }

  // ============================================================
  // SONIDOS DE LA CINEMÁTICA
  // ============================================================

  // --- Tono bajo misterioso al inicio ---
  // Acorde grave que establece el mood de la historia
  _tocarAmbienteMisterio() {
    if (!this.sfx._asegurarContexto()) return;
    const ctx = this.sfx.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this.sfx._crearGanancia(this.sfx.volumen * 0.25);

    // Dos notas graves simultáneas (5ta abierta = misterioso)
    const frecuencias = [82, 123]; // E2, B2
    for (const freq of frecuencias) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ahora);
      osc.connect(ganancia);
      osc.start(ahora);
      osc.stop(ahora + 2.5);
    }

    ganancia.gain.setValueAtTime(this.sfx.volumen * 0.25, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 2.5);
  }

  // --- Golpe grave de terremoto ---
  // Rumble bajo que sube de intensidad
  _tocarTerremoto() {
    if (!this.sfx._asegurarContexto()) return;
    const ctx = this.sfx.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this.sfx._crearGanancia(this.sfx.volumen * 0.4);

    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(30, ahora);
    osc.frequency.setValueAtTime(40, ahora + 1);
    osc.frequency.setValueAtTime(25, ahora + 2);

    // Filtro pasa-bajos para que suene a rumble, no a zumbido
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.value = 100;

    osc.connect(filtro);
    filtro.connect(ganancia);

    ganancia.gain.setValueAtTime(0.001, ahora);
    ganancia.gain.linearRampToValueAtTime(this.sfx.volumen * 0.4, ahora + 0.5);
    ganancia.gain.setValueAtTime(this.sfx.volumen * 0.4, ahora + 2);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 2.8);

    osc.start(ahora);
    osc.stop(ahora + 2.8);
  }

  // --- Crujido de roca rompiéndose ---
  // Ruido corto filtrado — como piedra agrietándose
  _tocarCrujido() {
    if (!this.sfx._asegurarContexto()) return;
    const ctx = this.sfx.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this.sfx._crearGanancia(this.sfx.volumen * 0.2);

    // Ruido blanco muy corto
    const duracion = 0.05 + Math.random() * 0.05;
    const bufferSize = Math.floor(ctx.sampleRate * duracion);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1);
    }

    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;

    const filtro = ctx.createBiquadFilter();
    filtro.type = 'bandpass';
    filtro.frequency.value = 200 + Math.random() * 600;
    filtro.Q.value = 2;

    fuente.connect(filtro);
    filtro.connect(ganancia);

    ganancia.gain.setValueAtTime(this.sfx.volumen * 0.2, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + duracion);

    fuente.start(ahora);
  }

  // --- Sonido de viento al caer ---
  // Tono descendente largo que simula el aire pasando
  _tocarVientoCaida() {
    if (!this.sfx._asegurarContexto()) return;
    const ctx = this.sfx.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this.sfx._crearGanancia(this.sfx.volumen * 0.2);

    // Ruido filtrado en frecuencias medias = viento
    const duracion = 3;
    const bufferSize = Math.floor(ctx.sampleRate * duracion);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;

    const filtro = ctx.createBiquadFilter();
    filtro.type = 'bandpass';
    filtro.frequency.setValueAtTime(400, ahora);
    filtro.frequency.linearRampToValueAtTime(800, ahora + duracion);
    filtro.Q.value = 1;

    fuente.connect(filtro);
    filtro.connect(ganancia);

    ganancia.gain.setValueAtTime(0.001, ahora);
    ganancia.gain.linearRampToValueAtTime(this.sfx.volumen * 0.2, ahora + 0.5);
    ganancia.gain.setValueAtTime(this.sfx.volumen * 0.2, ahora + 2);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + duracion);

    fuente.start(ahora);
  }

  // --- Ráfagas cortas de viento durante la caída ---
  _tocarRafaga() {
    if (!this.sfx._asegurarContexto()) return;
    const ctx = this.sfx.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this.sfx._crearGanancia(this.sfx.volumen * 0.1);

    const duracion = 0.08;
    const bufferSize = Math.floor(ctx.sampleRate * duracion);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;

    const filtro = ctx.createBiquadFilter();
    filtro.type = 'highpass';
    filtro.frequency.value = 600 + Math.random() * 800;

    fuente.connect(filtro);
    filtro.connect(ganancia);

    ganancia.gain.setValueAtTime(this.sfx.volumen * 0.1, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + duracion);

    fuente.start(ahora);
  }

  // --- Impacto al llegar al fondo de la cueva ---
  // Golpe grave + reverb que marca el aterrizaje
  _tocarImpactoCaida() {
    if (!this.sfx._asegurarContexto()) return;
    const ctx = this.sfx.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this.sfx._crearGanancia(this.sfx.volumen * 0.5);

    // Golpe grave
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, ahora);
    osc.frequency.exponentialRampToValueAtTime(20, ahora + 0.4);

    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.5);

    // Ruido de escombros cayendo encima
    const duracionRuido = 0.3;
    const bufferSize = Math.floor(ctx.sampleRate * duracionRuido);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1);
    }

    const gananciaRuido = this.sfx._crearGanancia(this.sfx.volumen * 0.3);
    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;

    const filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.value = 300;

    fuente.connect(filtro);
    filtro.connect(gananciaRuido);

    gananciaRuido.gain.setValueAtTime(this.sfx.volumen * 0.3, ahora);
    gananciaRuido.gain.exponentialRampToValueAtTime(0.001, ahora + duracionRuido);

    fuente.start(ahora);

    ganancia.gain.setValueAtTime(this.sfx.volumen * 0.5, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.5);
  }

  // ============================================================
  // DIBUJO DEL PERSONAJE DETALLADO
  // ============================================================

  // --- Sprite del personaje con cabello, ojos, ropa y piernas animadas ---
  // Reutiliza el estilo visual del personaje en la cueva
  _dibujarPersonajeDetallado(ctx, x, y, caminando, direccion) {
    const genero = this.juego ? this.juego.generoJugador || 'pepito' : 'pepito';
    const esPepito = genero === 'pepito';
    const colorCuerpo = esPepito ? '#4488ff' : '#aa44ff';
    const colorCuerpoOscuro = esPepito ? '#3366cc' : '#8833cc';
    const colorPiel = '#D2956A';
    const mirandoIzq = direccion === 'izquierda';
    const w = 20;
    const h = 28;

    // Piernas animadas al caminar
    const animPiernas = caminando ? Math.sin(this.temporizador * 12) * 3 : 0;
    ctx.fillStyle = '#333355';
    ctx.fillRect(x + 4, y + h - 8 + animPiernas, 5, 8 - animPiernas);
    ctx.fillRect(x + w - 9, y + h - 8 - animPiernas, 5, 8 + animPiernas);

    // Zapatos
    ctx.fillStyle = '#553322';
    ctx.fillRect(x + 2, y + h - 3, 7, 3);
    ctx.fillRect(x + w - 11, y + h - 3, 7, 3);

    // Torso
    ctx.fillStyle = colorCuerpo;
    ctx.fillRect(x + 2, y + 8, w - 4, h - 16);

    // Detalle de ropa
    ctx.fillStyle = colorCuerpoOscuro;
    ctx.fillRect(x + w / 2 - 1, y + 10, 2, h - 20);

    // Brazos
    const animBrazos = caminando ? Math.sin(this.temporizador * 12) * 2 : 0;
    ctx.fillStyle = colorPiel;
    ctx.fillRect(x - 1, y + 11 + animBrazos, 3, 8);
    ctx.fillRect(x + w - 2, y + 11 - animBrazos, 3, 8);

    // Cabeza
    ctx.fillStyle = colorPiel;
    const cabezaAncho = 16;
    const cabezaAlto = 12;
    const cabezaX = x + (w - cabezaAncho) / 2;
    const cabezaY = y - 4;
    ctx.fillRect(cabezaX, cabezaY, cabezaAncho, cabezaAlto);

    // Cabello
    ctx.fillStyle = esPepito ? '#332211' : '#221133';
    if (esPepito) {
      ctx.fillRect(cabezaX + 1, cabezaY - 3, cabezaAncho - 2, 4);
    } else {
      ctx.fillRect(cabezaX - 1, cabezaY - 3, cabezaAncho + 2, 4);
      ctx.fillRect(cabezaX - 2, cabezaY, 3, 8);
      ctx.fillRect(cabezaX + cabezaAncho - 1, cabezaY, 3, 8);
    }

    // Ojos
    ctx.fillStyle = '#FFFFFF';
    const ojosBaseX = cabezaX + 3;
    const ojosY = cabezaY + 4;
    const desplOjosX = mirandoIzq ? -1 : (direccion === 'abajo' ? 0 : 1);
    const desplOjosY = direccion === 'abajo' ? 1 : 0;
    ctx.fillRect(ojosBaseX + desplOjosX, ojosY + desplOjosY, 4, 3);
    ctx.fillRect(ojosBaseX + 6 + desplOjosX, ojosY + desplOjosY, 4, 3);

    // Pupilas
    ctx.fillStyle = '#000000';
    ctx.fillRect(ojosBaseX + 1 + desplOjosX * 2, ojosY + 1 + desplOjosY, 2, 2);
    ctx.fillRect(ojosBaseX + 7 + desplOjosX * 2, ojosY + 1 + desplOjosY, 2, 2);

    // Boca
    ctx.fillStyle = '#000000';
    ctx.fillRect(cabezaX + 5, cabezaY + 9, 5, 1);
  }

  // ============================================================
  // DIBUJO DE CADA PASO
  // ============================================================

  // --- Paso 0: Pantalla negra, texto aparece ---
  _dibujarPaso0(ctx, ancho, alto) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, ancho, alto);

    ctx.font = 'bold 22px monospace';
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacidad})`;
    ctx.textAlign = 'center';
    ctx.fillText('En algun lugar de Santo Domingo...', ancho / 2, alto / 2);
    ctx.textAlign = 'left';
  }

  // --- Paso 1: Obra de construcción, personaje camina ---
  _dibujarPaso1(ctx, ancho, alto) {
    // Cielo azul grisáceo
    ctx.fillStyle = '#6688aa';
    ctx.fillRect(0, 0, ancho, alto * 0.5);

    // Suelo de la obra
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(0, alto * 0.65, ancho, alto * 0.35);

    // Escombros
    ctx.fillStyle = '#999999';
    ctx.fillRect(200, alto * 0.58, 80, 40);
    ctx.fillRect(400, alto * 0.55, 60, 55);
    ctx.fillRect(600, alto * 0.60, 90, 30);

    // Estructuras de construcción
    ctx.fillStyle = '#666666';
    ctx.fillRect(100, alto * 0.2, 150, alto * 0.45);
    ctx.fillRect(650, alto * 0.15, 120, alto * 0.5);

    // Andamios
    ctx.strokeStyle = '#444444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, alto * 0.35);
    ctx.lineTo(250, alto * 0.35);
    ctx.moveTo(650, alto * 0.30);
    ctx.lineTo(770, alto * 0.30);
    ctx.stroke();

    // Personaje caminando (sprite detallado)
    const caminando = this.personajeCaminaX < ANCHO_JUEGO * 0.6;
    this._dibujarPersonajeDetallado(ctx, this.personajeCaminaX, alto * 0.58, caminando, 'derecha');
  }

  // --- Paso 2: Algo brilla entre los escombros ---
  _dibujarPaso2(ctx, ancho, alto) {
    this._dibujarPaso1(ctx, ancho, alto);

    this.personajeCaminaX = ancho * 0.6;

    // Destello dorado parpadeante
    const brilloX = ancho * 0.62;
    const brilloY = alto * 0.62;

    const radio = 15 + this.brilloOpacidad * 8;
    const gradienteBrillo = ctx.createRadialGradient(
      brilloX, brilloY, 2,
      brilloX, brilloY, radio
    );
    gradienteBrillo.addColorStop(0, `rgba(255, 215, 0, ${this.brilloOpacidad})`);
    gradienteBrillo.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.fillStyle = gradienteBrillo;
    ctx.fillRect(brilloX - radio, brilloY - radio, radio * 2, radio * 2);

    // Punto central
    ctx.fillStyle = `rgba(255, 255, 200, ${this.brilloOpacidad})`;
    ctx.fillRect(brilloX - 3, brilloY - 3, 6, 6);

    ctx.font = '16px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText('Algo brilla entre los escombros...', ancho / 2, 40);
    ctx.textAlign = 'left';
  }

  // --- Paso 3: Reliquia recogida, terremoto ---
  _dibujarPaso3(ctx, ancho, alto) {
    this._dibujarPaso1(ctx, ancho, alto);

    // Grietas en el suelo
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2 + this.temblor * 0.3;
    ctx.beginPath();
    ctx.moveTo(ancho * 0.5, alto * 0.65);
    ctx.lineTo(ancho * 0.55 + this.temblor, alto * 0.75);
    ctx.lineTo(ancho * 0.52 - this.temblor, alto * 0.9);
    ctx.moveTo(ancho * 0.6, alto * 0.65);
    ctx.lineTo(ancho * 0.65, alto * 0.80 + this.temblor);
    ctx.stroke();

    // Texto de alarma
    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = '#FF4444';
    ctx.textAlign = 'center';
    ctx.fillText('CUIDADO! El suelo se derrumba!', ancho / 2, 40);
    ctx.textAlign = 'left';
  }

  // --- Paso 4: El personaje cae al vacío ---
  _dibujarPaso4(ctx, ancho, alto) {
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, ancho, alto);

    // Paredes de roca
    ctx.fillStyle = '#3d2b1f';
    ctx.fillRect(0, 0, ancho * 0.3, alto);
    ctx.fillRect(ancho * 0.7, 0, ancho * 0.3, alto);

    // Luz del agujero arriba
    const tamanoLuz = Math.max(20, 100 - this.personajeCaidaY * 0.15);
    const gradienteLuz = ctx.createRadialGradient(
      ancho / 2, 30, tamanoLuz * 0.3,
      ancho / 2, 30, tamanoLuz
    );
    gradienteLuz.addColorStop(0, 'rgba(150, 180, 220, 0.5)');
    gradienteLuz.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradienteLuz;
    ctx.fillRect(0, 0, ancho, 200);

    // Personaje cayendo (sprite detallado)
    const personajeX = ancho / 2 - 10;
    const yDibujo = Math.min(this.personajeCaidaY, alto * 0.8);

    this._dibujarPersonajeDetallado(ctx, personajeX, yDibujo, false, 'abajo');

    // Líneas de velocidad
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const lineaX = personajeX - 15 + Math.random() * 50;
      ctx.beginPath();
      ctx.moveTo(lineaX, yDibujo - 20 - Math.random() * 30);
      ctx.lineTo(lineaX, yDibujo - 40 - Math.random() * 30);
      ctx.stroke();
    }

    // Fade a negro
    ctx.fillStyle = `rgba(0, 0, 0, ${this.opacidad * 0.7})`;
    ctx.fillRect(0, 0, ancho, alto);
  }

  // --- Paso 5: Pantalla negra, texto final ---
  _dibujarPaso5(ctx, ancho, alto) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, ancho, alto);

    ctx.font = 'italic 22px monospace';
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacidad})`;
    ctx.textAlign = 'center';
    ctx.fillText('...Donde estoy?', ancho / 2, alto / 2);
    ctx.textAlign = 'left';
  }

  // --- Avanzar al siguiente paso ---
  _avanzarPaso() {
    this.paso++;
    this.temporizador = 0;
    this.opacidad = 0;
    this.temblor = 0;

    // Después del último paso, transicionar a las Cuevas del Pomier
    if (this.paso > 5) {
      if (this.juego && this.juego.cambiarEscena) {
        this.juego.cambiarEscena('cuevasPomier');
      }
    }
  }
}
