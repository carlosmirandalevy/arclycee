// ============================================================
// SONIDO-PROCEDURAL.JS - Efectos de sonido generados por código
// ============================================================
// En vez de cargar archivos .mp3 o .wav, generamos los sonidos
// directamente usando la Web Audio API del navegador.
// Ventaja: cero archivos que descargar, sonidos instantáneos.
// Cada sonido se crea combinando osciladores y filtros simples.
//
// NOTA: El AudioContext se crea al primer uso porque los
// navegadores modernos lo bloquean hasta que el usuario
// interactúe con la página (click, toque, tecla).
// ============================================================

export class SonidoProcedural {

  constructor() {
    // El AudioContext se crea lazy (al primer sonido)
    // porque el navegador lo bloquea hasta la primera interacción
    this.contexto = null;
    this.volumen = 0.3;
  }

  // --- Inicializar el contexto de audio ---
  // Se llama automáticamente al primer sonido.
  // Si falla (navegador muy viejo), los sonidos simplemente no suenan.
  _asegurarContexto() {
    if (this.contexto) return true;

    try {
      this.contexto = new (window.AudioContext || window.webkitAudioContext)();
      return true;
    } catch (e) {
      console.warn('Web Audio API no disponible — los sonidos no funcionarán.');
      return false;
    }
  }

  // --- Crear un nodo de ganancia (volumen) conectado a la salida ---
  // Todos los sonidos pasan por aquí para poder controlar el volumen
  _crearGanancia(volumen = this.volumen) {
    const ganancia = this.contexto.createGain();
    ganancia.gain.value = volumen;
    ganancia.connect(this.contexto.destination);
    return ganancia;
  }

  // --- SONIDO DE SALTO ---
  // Un "boing" ascendente rápido — frecuencia sube de grave a agudo
  salto() {
    if (!this._asegurarContexto()) return;

    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.5);

    const osc = ctx.createOscillator();
    osc.type = 'square';
    // Empieza en 150Hz (grave) y sube a 400Hz (agudo) en 0.1 segundos
    osc.frequency.setValueAtTime(150, ahora);
    osc.frequency.exponentialRampToValueAtTime(400, ahora + 0.1);

    // El volumen baja rápido para que suene como un "pip" corto
    ganancia.gain.setValueAtTime(this.volumen * 0.5, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.15);

    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.15);
  }

  // --- SONIDO DE ATERRIZAR ---
  // Un golpe seco grave — frecuencia baja que decae rápido
  aterrizar() {
    if (!this._asegurarContexto()) return;

    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.3);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, ahora);
    osc.frequency.exponentialRampToValueAtTime(40, ahora + 0.08);

    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.1);

    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.1);
  }

  // --- SONIDO DE RECOGER OBJETO ---
  // Dos notas ascendentes rápidas — "tin-tin!" alegre
  recoger() {
    if (!this._asegurarContexto()) return;

    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.4);

    // Primera nota
    const osc1 = ctx.createOscillator();
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(523, ahora); // C5
    osc1.connect(ganancia);
    osc1.start(ahora);
    osc1.stop(ahora + 0.08);

    // Segunda nota más aguda
    const osc2 = ctx.createOscillator();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(659, ahora + 0.1); // E5
    osc2.connect(ganancia);
    osc2.start(ahora + 0.1);
    osc2.stop(ahora + 0.2);

    ganancia.gain.setValueAtTime(this.volumen * 0.4, ahora);
    ganancia.gain.setValueAtTime(this.volumen * 0.4, ahora + 0.1);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.25);
  }

  // --- SONIDO DE DESCUBRIR PETROGLIFO ---
  // Acorde misterioso que resuena — da sensación de descubrimiento ancestral
  descubrir() {
    if (!this._asegurarContexto()) return;

    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.35);

    // Tres notas simultáneas formando un acorde menor (misterioso)
    const frecuencias = [220, 261, 329]; // A3, C4, E4
    for (const freq of frecuencias) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ahora);
      osc.connect(ganancia);
      osc.start(ahora);
      osc.stop(ahora + 0.6);
    }

    // El acorde se desvanece lentamente
    ganancia.gain.setValueAtTime(this.volumen * 0.35, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.6);
  }

  // --- SONIDO DE PASO ---
  // Un crujido suave de grava — ruido filtrado muy corto
  paso() {
    if (!this._asegurarContexto()) return;

    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.1);

    // Ruido blanco muy corto filtrado en frecuencias bajas = grava
    const bufferSize = ctx.sampleRate * 0.04; // 40ms de ruido
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;

    // Filtro pasa-bajos para que suene a grava, no a estática
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.value = 800;

    fuente.connect(filtro);
    filtro.connect(ganancia);

    ganancia.gain.setValueAtTime(this.volumen * 0.1, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.04);

    fuente.start(ahora);
  }

  // --- SONIDO DE GOTEO DE AGUA ---
  // Una gota cayendo — frecuencia alta que baja rápido, como "plink"
  goteo() {
    if (!this._asegurarContexto()) return;

    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.15);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    // Frecuencia alta que baja = gota de agua
    const freqBase = 800 + Math.random() * 400;
    osc.frequency.setValueAtTime(freqBase, ahora);
    osc.frequency.exponentialRampToValueAtTime(freqBase * 0.3, ahora + 0.08);

    ganancia.gain.setValueAtTime(this.volumen * 0.15, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.12);

    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.12);
  }

  // --- SONIDO DE DAÑO ---
  // Ruido grave y distorsionado — suena a "golpe"
  dano() {
    if (!this._asegurarContexto()) return;

    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.4);

    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ahora);
    osc.frequency.exponentialRampToValueAtTime(50, ahora + 0.15);

    ganancia.gain.setValueAtTime(this.volumen * 0.4, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.2);

    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.2);
  }

  // ============================================================
  // SONIDOS DE COMBATE
  // ============================================================
  // Cada acción de combate tiene su propio sonido temático.
  // Los sonidos del jugador son más "limpios" y los del enemigo
  // más graves/agresivos para que se sientan diferentes.

  // --- ATACAR: golpe agresivo descendente ---
  combateAtacar() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.35);

    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, ahora);
    osc.frequency.exponentialRampToValueAtTime(100, ahora + 0.15);

    ganancia.gain.setValueAtTime(this.volumen * 0.35, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.18);

    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.18);
  }

  // --- HABLAR: tono calmado y suave ---
  // Dos notas simultáneas crean una sensación de diálogo pacífico
  combateHablar() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.25);

    for (const freq of [300, 350]) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ahora);
      osc.connect(ganancia);
      osc.start(ahora);
      osc.stop(ahora + 0.2);
    }

    ganancia.gain.setValueAtTime(this.volumen * 0.25, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.25);
  }

  // --- NEGOCIAR: dos notas alternadas (ida y vuelta) ---
  combateNegociar() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.3);

    const osc1 = ctx.createOscillator();
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(440, ahora);
    osc1.connect(ganancia);
    osc1.start(ahora);
    osc1.stop(ahora + 0.08);

    const osc2 = ctx.createOscillator();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(520, ahora + 0.1);
    osc2.connect(ganancia);
    osc2.start(ahora + 0.1);
    osc2.stop(ahora + 0.18);

    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora);
    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora + 0.1);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.22);
  }

  // --- OBJETO: ruido de buscar en la mochila ---
  combateObjeto() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.2);

    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;

    const filtro = ctx.createBiquadFilter();
    filtro.type = 'bandpass';
    filtro.frequency.value = 800;

    fuente.connect(filtro);
    filtro.connect(ganancia);

    ganancia.gain.setValueAtTime(this.volumen * 0.2, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.1);

    fuente.start(ahora);
  }

  // --- HUIR: whoosh descendente rápido ---
  combateHuir() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.3);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ahora);
    osc.frequency.exponentialRampToValueAtTime(200, ahora + 0.2);

    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.25);

    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.25);
  }

  // --- REDES SOCIALES: notificación de teléfono "ding-ding" ---
  combateRedesSociales() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.3);

    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, ahora);
    osc1.connect(ganancia);
    osc1.start(ahora);
    osc1.stop(ahora + 0.06);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1047, ahora + 0.08);
    osc2.connect(ganancia);
    osc2.start(ahora + 0.08);
    osc2.stop(ahora + 0.14);

    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora);
    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora + 0.08);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.2);
  }

  // --- PROTESTAS: ritmo de multitud (tres pulsos rápidos) ---
  combateProtestas() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.3);

    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(220, ahora + i * 0.1);
      osc.connect(ganancia);
      osc.start(ahora + i * 0.1);
      osc.stop(ahora + i * 0.1 + 0.06);
    }

    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.35);
  }

  // --- DENUNCIA: sello oficial (ruido + golpe grave) ---
  combateDenuncia() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.35);

    // Ruido del papel
    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1) * 0.4;
    }
    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;
    fuente.connect(ganancia);
    fuente.start(ahora);

    // Golpe del sello
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, ahora + 0.05);
    osc.frequency.exponentialRampToValueAtTime(60, ahora + 0.12);
    osc.connect(ganancia);
    osc.start(ahora + 0.05);
    osc.stop(ahora + 0.15);

    ganancia.gain.setValueAtTime(this.volumen * 0.35, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.18);
  }

  // --- VÍA LEGAL: golpe de mazo judicial ---
  combateViaLegal() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.4);

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, ahora);
    osc.frequency.exponentialRampToValueAtTime(90, ahora + 0.1);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.15);

    ganancia.gain.setValueAtTime(this.volumen * 0.4, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.15);
  }

  // --- ATRAPAR: swoosh de red submarina ---
  combateAtrapar() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.3);

    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1) * 0.5;
    }
    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;

    const filtro = ctx.createBiquadFilter();
    filtro.type = 'bandpass';
    filtro.frequency.value = 1200;

    fuente.connect(filtro);
    filtro.connect(ganancia);

    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.15);

    fuente.start(ahora);
  }

  // --- PESCAR: lanzamiento de arpón + splash ---
  combatePescar() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.35);

    // El lanzamiento (tono ascendente rápido)
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, ahora);
    osc.frequency.exponentialRampToValueAtTime(800, ahora + 0.05);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.06);

    // El splash (ruido filtrado bajo)
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1) * 0.4;
    }
    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.value = 400;
    fuente.connect(filtro);
    filtro.connect(ganancia);
    fuente.start(ahora + 0.07);

    ganancia.gain.setValueAtTime(this.volumen * 0.35, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.2);
  }

  // --- PROTEGER CORAL: acorde protector cálido ---
  combateProtegerCoral() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.25);

    // Acorde mayor cálido (Do-Mi-Sol)
    for (const freq of [330, 415, 523]) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ahora);
      osc.connect(ganancia);
      osc.start(ahora);
      osc.stop(ahora + 0.3);
    }

    ganancia.gain.setValueAtTime(0.001, ahora);
    ganancia.gain.linearRampToValueAtTime(this.volumen * 0.25, ahora + 0.08);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.35);
  }

  // --- ALERTAR BUZOS: silbato submarino con vibrato ---
  combateAlertarBuzos() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.3);

    // Oscilador principal (el silbato)
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(700, ahora);
    osc.connect(ganancia);

    // LFO para vibrato (hace que la frecuencia oscile)
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(8, ahora);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(50, ahora);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    lfo.start(ahora);
    osc.start(ahora);
    osc.stop(ahora + 0.25);
    lfo.stop(ahora + 0.25);

    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.28);
  }

  // --- LEY 318: mazo judicial firme ---
  combateLey318() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.4);

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, ahora);
    osc.frequency.exponentialRampToValueAtTime(100, ahora + 0.08);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.12);

    ganancia.gain.setValueAtTime(this.volumen * 0.4, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.12);
  }

  // --- EVIDENCIA FORENSE: beep clínico (cámara/escáner) ---
  combateEvidenciaForense() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.3);

    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1000, ahora);
    osc1.connect(ganancia);
    osc1.start(ahora);
    osc1.stop(ahora + 0.04);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1200, ahora + 0.06);
    osc2.connect(ganancia);
    osc2.start(ahora + 0.06);
    osc2.stop(ahora + 0.1);

    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora);
    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora + 0.06);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.15);
  }

  // --- INTERPOL: chirp de radio policial ---
  combateInterpol() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.3);

    const osc = ctx.createOscillator();
    osc.type = 'square';
    // Sube de 600 a 800 y vuelve a bajar (chirp de sirena)
    osc.frequency.setValueAtTime(600, ahora);
    osc.frequency.linearRampToValueAtTime(800, ahora + 0.15);
    osc.frequency.linearRampToValueAtTime(600, ahora + 0.3);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.3);

    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.32);
  }

  // --- UNESCO: acorde diplomático solemne ---
  combateUnesco() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.25);

    // Acorde mayor en Do5 (solemne e internacional)
    for (const freq of [523, 659, 784]) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ahora);
      osc.connect(ganancia);
      osc.start(ahora);
      osc.stop(ahora + 0.35);
    }

    ganancia.gain.setValueAtTime(this.volumen * 0.25, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.35);
  }

  // --- CONTRAATAQUE ENEMIGO: golpe grave amenazante ---
  combateContraataque() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.4);

    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ahora);
    osc.frequency.exponentialRampToValueAtTime(60, ahora + 0.12);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.15);

    // Ruido adicional para más agresividad
    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.value = 500;
    fuente.connect(filtro);
    filtro.connect(ganancia);
    fuente.start(ahora);

    ganancia.gain.setValueAtTime(this.volumen * 0.4, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.18);
  }

  // --- ENEMIGO DUDA: tono descendente suave (vacilación) ---
  combateEnemigoDuda() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.25);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ahora);
    osc.frequency.exponentialRampToValueAtTime(300, ahora + 0.2);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.25);

    ganancia.gain.setValueAtTime(this.volumen * 0.25, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.25);
  }

  // --- VICTORIA: arpegio ascendente triunfal ---
  combateVictoria() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.4);

    const notas = [523, 659, 784]; // Do5, Mi5, Sol5
    for (let i = 0; i < notas.length; i++) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(notas[i], ahora + i * 0.12);
      osc.connect(ganancia);
      osc.start(ahora + i * 0.12);
      osc.stop(ahora + i * 0.12 + 0.15);
    }

    ganancia.gain.setValueAtTime(this.volumen * 0.4, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.55);
  }

  // --- PACIFICADO: acorde cálido sostenido (armonía restaurada) ---
  combatePacificado() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.35);

    // Acorde mayor en Do4 (cálido y reconfortante)
    for (const freq of [262, 330, 392]) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ahora);
      osc.connect(ganancia);
      osc.start(ahora);
      osc.stop(ahora + 0.5);
    }

    ganancia.gain.setValueAtTime(this.volumen * 0.35, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.55);
  }

  // --- DERROTA: dos notas tristes descendentes ---
  combateDerrota() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.35);

    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(400, ahora);
    osc1.frequency.exponentialRampToValueAtTime(300, ahora + 0.15);
    osc1.connect(ganancia);
    osc1.start(ahora);
    osc1.stop(ahora + 0.18);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(300, ahora + 0.2);
    osc2.frequency.exponentialRampToValueAtTime(200, ahora + 0.35);
    osc2.connect(ganancia);
    osc2.start(ahora + 0.2);
    osc2.stop(ahora + 0.38);

    ganancia.gain.setValueAtTime(this.volumen * 0.35, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.4);
  }

  // --- NAVEGAR MENÚ DE COMBATE: click suave ---
  combateNavegar() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.15);

    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(500, ahora);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.03);

    ganancia.gain.setValueAtTime(this.volumen * 0.15, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.03);
  }

  // ============================================================
  // SONIDOS DEL BATÚ (juego de pelota taíno)
  // ============================================================

  // --- GOLPE DE BATÚ: impacto seco de pelota de cupey contra el yugo ---
  batuGolpe() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.4);

    // Impacto grave y corto (pelota de caucho contra cinturón de piedra)
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, ahora);
    osc.frequency.exponentialRampToValueAtTime(60, ahora + 0.08);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.1);

    ganancia.gain.setValueAtTime(this.volumen * 0.4, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.12);
  }

  // --- REBOTE DE BATÚ: pelota de caucho rebotando contra piedra ---
  batuRebote() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.25);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ahora);
    osc.frequency.exponentialRampToValueAtTime(150, ahora + 0.06);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.08);

    ganancia.gain.setValueAtTime(this.volumen * 0.25, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.08);
  }

  // --- PUNTO DE BATÚ: tono ascendente celebratorio ---
  batuPunto() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.35);

    const notas = [392, 494, 587]; // Sol4, Si4, Re5
    for (let i = 0; i < notas.length; i++) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(notas[i], ahora + i * 0.1);
      osc.connect(ganancia);
      osc.start(ahora + i * 0.1);
      osc.stop(ahora + i * 0.1 + 0.12);
    }

    ganancia.gain.setValueAtTime(this.volumen * 0.35, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.45);
  }

  // --- SAQUE DE BATÚ: señal tipo silbato para iniciar ---
  batuSaque() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.2);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ahora);
    osc.frequency.linearRampToValueAtTime(800, ahora + 0.1);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.12);

    ganancia.gain.setValueAtTime(this.volumen * 0.2, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.15);
  }

  // --- MULTITUD DE BATÚ: ruido breve de espectadores ---
  batuMultitud() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.15);

    const bufferSize = ctx.sampleRate * 0.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'bandpass';
    filtro.frequency.value = 600;
    filtro.Q.value = 0.5;
    fuente.connect(filtro);
    filtro.connect(ganancia);

    ganancia.gain.setValueAtTime(0.001, ahora);
    ganancia.gain.linearRampToValueAtTime(this.volumen * 0.15, ahora + 0.05);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.25);

    fuente.start(ahora);
  }

  // --- SONIDO DE DIÁLOGO ---
  // "Bleep" corto estilo Undertale — suena con cada carácter del texto
  dialogo() {
    if (!this._asegurarContexto()) return;

    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.08);

    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(380 + Math.random() * 40, ahora);

    ganancia.gain.setValueAtTime(this.volumen * 0.08, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.04);

    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.04);
  }
}
