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

  // --- SONIDO DE MUERTE ---
  // "Wah wah waaah" cómico — trombón descendente tipo cartoon
  muerte() {
    if (!this._asegurarContexto()) return;

    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const vol = this.volumen * 0.5;

    // Tres notas descendentes: Do-Si♭-La♭ con vibrato
    const notas = [
      { freq: 350, inicio: 0, dur: 0.3 },
      { freq: 300, inicio: 0.35, dur: 0.3 },
      { freq: 200, inicio: 0.7, dur: 0.8 }
    ];

    for (const nota of notas) {
      const ganancia = this._crearGanancia(vol);
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';

      // Frecuencia con glissando descendente
      osc.frequency.setValueAtTime(nota.freq, ahora + nota.inicio);
      osc.frequency.exponentialRampToValueAtTime(
        nota.freq * 0.7, ahora + nota.inicio + nota.dur
      );

      // Vibrato con LFO para efecto cómico
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 6;
      lfoGain.gain.value = nota.freq * 0.03;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(ahora + nota.inicio);
      lfo.stop(ahora + nota.inicio + nota.dur);

      // Envolvente de volumen
      ganancia.gain.setValueAtTime(vol, ahora + nota.inicio);
      ganancia.gain.setValueAtTime(vol, ahora + nota.inicio + nota.dur * 0.6);
      ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + nota.inicio + nota.dur);

      osc.connect(ganancia);
      osc.start(ahora + nota.inicio);
      osc.stop(ahora + nota.inicio + nota.dur + 0.05);
    }
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

  // --- CANTO DE BALLENA JOROBADA ---
  // Las ballenas jorobadas producen vocalizaciones complejas que
  // pueden durar hasta 20 minutos. Aquí simulamos un fragmento:
  // tres notas largas descendentes con vibrato, filtradas para
  // sonar lejanas y subacuáticas. Duración ~4 segundos.
  cantoBallenaCerca() {
    if (!this._asegurarContexto()) return;

    const ctx = this.contexto;
    const ahora = ctx.currentTime;

    // Ganancia general baja — es un sonido ambiental lejano
    const ganancia = this._crearGanancia(this.volumen * 0.10);

    // Filtro pasa-bajos para efecto subacuático (como oír bajo el agua)
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.setValueAtTime(600, ahora);
    filtro.Q.setValueAtTime(3, ahora);
    filtro.connect(ganancia);

    // --- Nota 1: gemido largo descendente (la más aguda) ---
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(280, ahora);
    osc1.frequency.linearRampToValueAtTime(220, ahora + 1.2);
    // Vibrato — un LFO que modula la frecuencia ligeramente
    const lfo1 = ctx.createOscillator();
    lfo1.type = 'sine';
    lfo1.frequency.setValueAtTime(4, ahora); // 4 Hz de vibrato
    const lfo1Gain = ctx.createGain();
    lfo1Gain.gain.setValueAtTime(8, ahora); // ±8 Hz de oscilación
    lfo1.connect(lfo1Gain);
    lfo1Gain.connect(osc1.frequency);
    lfo1.start(ahora);
    lfo1.stop(ahora + 1.3);

    const g1 = ctx.createGain();
    g1.gain.setValueAtTime(0.001, ahora);
    g1.gain.linearRampToValueAtTime(0.6, ahora + 0.2);
    g1.gain.linearRampToValueAtTime(0.4, ahora + 0.9);
    g1.gain.exponentialRampToValueAtTime(0.001, ahora + 1.3);
    osc1.connect(g1);
    g1.connect(filtro);
    osc1.start(ahora);
    osc1.stop(ahora + 1.3);

    // --- Nota 2: gemido medio (pausa corta, luego baja más) ---
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(200, ahora + 1.5);
    osc2.frequency.linearRampToValueAtTime(160, ahora + 2.8);
    const lfo2 = ctx.createOscillator();
    lfo2.type = 'sine';
    lfo2.frequency.setValueAtTime(3.5, ahora + 1.5);
    const lfo2Gain = ctx.createGain();
    lfo2Gain.gain.setValueAtTime(6, ahora + 1.5);
    lfo2.connect(lfo2Gain);
    lfo2Gain.connect(osc2.frequency);
    lfo2.start(ahora + 1.5);
    lfo2.stop(ahora + 2.9);

    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.001, ahora + 1.5);
    g2.gain.linearRampToValueAtTime(0.5, ahora + 1.7);
    g2.gain.linearRampToValueAtTime(0.3, ahora + 2.5);
    g2.gain.exponentialRampToValueAtTime(0.001, ahora + 2.9);
    osc2.connect(g2);
    g2.connect(filtro);
    osc2.start(ahora + 1.5);
    osc2.stop(ahora + 2.9);

    // --- Nota 3: nota grave final larga (la más emotiva) ---
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(140, ahora + 3.1);
    osc3.frequency.linearRampToValueAtTime(100, ahora + 4.2);
    const lfo3 = ctx.createOscillator();
    lfo3.type = 'sine';
    lfo3.frequency.setValueAtTime(2.5, ahora + 3.1);
    const lfo3Gain = ctx.createGain();
    lfo3Gain.gain.setValueAtTime(5, ahora + 3.1);
    lfo3.connect(lfo3Gain);
    lfo3Gain.connect(osc3.frequency);
    lfo3.start(ahora + 3.1);
    lfo3.stop(ahora + 4.3);

    const g3 = ctx.createGain();
    g3.gain.setValueAtTime(0.001, ahora + 3.1);
    g3.gain.linearRampToValueAtTime(0.5, ahora + 3.3);
    g3.gain.linearRampToValueAtTime(0.2, ahora + 4.0);
    g3.gain.exponentialRampToValueAtTime(0.001, ahora + 4.3);
    osc3.connect(g3);
    g3.connect(filtro);
    osc3.start(ahora + 3.1);
    osc3.stop(ahora + 4.3);

    // Envolvente general
    ganancia.gain.setValueAtTime(this.volumen * 0.10, ahora);
    ganancia.gain.linearRampToValueAtTime(this.volumen * 0.10, ahora + 4.0);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 4.5);
  }

  // --- LLAMADA DE MANATÍ ---
  // Sonido grave y ondulante que simula la vocalización real de un manatí
  manatiLlamada() {
    if (!this._asegurarContexto()) return;

    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.15);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    // Frecuencia baja con wobble lento (80-120 Hz)
    osc.frequency.setValueAtTime(80, ahora);
    osc.frequency.linearRampToValueAtTime(120, ahora + 0.4);
    osc.frequency.linearRampToValueAtTime(90, ahora + 0.8);
    osc.frequency.linearRampToValueAtTime(110, ahora + 1.0);

    ganancia.gain.setValueAtTime(0.001, ahora);
    ganancia.gain.linearRampToValueAtTime(this.volumen * 0.15, ahora + 0.1);
    ganancia.gain.linearRampToValueAtTime(this.volumen * 0.12, ahora + 0.6);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 1.0);

    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 1.0);
  }

  // --- RED RASGADA ---
  // Ráfaga de ruido con filtro alto — simula fibras rompiéndose
  redRasgada() {
    if (!this._asegurarContexto()) return;

    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.12);

    // Ruido blanco
    const tamano = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, tamano, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < tamano; i++) {
      datos[i] = Math.random() * 2 - 1;
    }

    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;

    // Filtro pasa-altos para sonido de rasgado
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'highpass';
    filtro.frequency.setValueAtTime(2000, ahora);
    filtro.frequency.linearRampToValueAtTime(4000, ahora + 0.15);

    ganancia.gain.setValueAtTime(this.volumen * 0.12, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.3);

    fuente.connect(filtro);
    filtro.connect(ganancia);
    fuente.start(ahora);
  }

  // --- ALERTA DE TIBURÓN ---
  // Dos pulsos bajos rápidos — sensación de peligro inminente
  tiburonAlerta() {
    if (!this._asegurarContexto()) return;

    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.15);

    for (let i = 0; i < 2; i++) {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, ahora + i * 0.2);
      osc.frequency.linearRampToValueAtTime(70, ahora + i * 0.2 + 0.15);

      osc.connect(ganancia);
      osc.start(ahora + i * 0.2);
      osc.stop(ahora + i * 0.2 + 0.15);
    }

    ganancia.gain.setValueAtTime(this.volumen * 0.15, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.5);
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

  // ============================================================
  // SONIDOS DE MINI-JUEGOS LFSD
  // ============================================================
  // Tres mini-juegos educativos: Calibración (Good Vibrations),
  // Programación (Full Metal Archeologist) y Conexión (Weird Science).
  // Cada uno tiene sonidos temáticos que refuerzan la interacción.

  // --- CALIBRACIÓN: tono continuo que cambia de frecuencia ---
  // Simula el ajuste de un instrumento científico (onda senoidal pura)
  calibracionTono(frecuencia) {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.25);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frecuencia, ahora);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.2);

    // Desvanecimiento suave al final para evitar chasquidos
    ganancia.gain.setValueAtTime(this.volumen * 0.25, ahora);
    ganancia.gain.setValueAtTime(this.volumen * 0.25, ahora + 0.15);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.2);
  }

  // --- CALIBRACIÓN EXITOSA: arpegio ascendente Do-Mi-Sol-Do ---
  // Celebra el ajuste correcto con un acorde mayor brillante
  calibracionExito() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.35);

    // Do4-Mi4-Sol4-Do5 (arpegio mayor ascendente)
    const notas = [262, 330, 392, 523];
    for (let i = 0; i < notas.length; i++) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(notas[i], ahora + i * 0.1);
      osc.connect(ganancia);
      osc.start(ahora + i * 0.1);
      osc.stop(ahora + i * 0.1 + 0.12);
    }

    ganancia.gain.setValueAtTime(this.volumen * 0.35, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.55);
  }

  // --- CALIBRACIÓN FALLIDA: dos tonos graves descendentes ---
  // Indica que el ajuste no fue correcto (zumbido de error)
  calibracionFallo() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.3);

    // Primera nota grave descendente
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(200, ahora);
    osc1.frequency.exponentialRampToValueAtTime(150, ahora + 0.12);
    osc1.connect(ganancia);
    osc1.start(ahora);
    osc1.stop(ahora + 0.15);

    // Segunda nota aún más grave
    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(150, ahora + 0.18);
    osc2.frequency.exponentialRampToValueAtTime(100, ahora + 0.3);
    osc2.connect(ganancia);
    osc2.start(ahora + 0.18);
    osc2.stop(ahora + 0.33);

    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.35);
  }

  // --- CALIBRACIÓN AJUSTE: click suave al girar un dial ---
  // Feedback táctil sutil para cada incremento del control
  calibracionAjuste() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.12);

    // Click muy corto con ruido filtrado (simula mecanismo de dial)
    const bufferSize = ctx.sampleRate * 0.02;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;

    const filtro = ctx.createBiquadFilter();
    filtro.type = 'highpass';
    filtro.frequency.value = 2000;

    fuente.connect(filtro);
    filtro.connect(ganancia);

    ganancia.gain.setValueAtTime(this.volumen * 0.12, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.025);

    fuente.start(ahora);
  }

  // --- BLOQUE COLOCAR: click mecánico satisfactorio ---
  // Suena al encajar una pieza de programación en su lugar
  bloqueColocar() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.3);

    // Tono corto agudo (encaje mecánico)
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, ahora);
    osc.frequency.exponentialRampToValueAtTime(400, ahora + 0.04);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.06);

    // Click adicional con ruido
    const bufferSize = ctx.sampleRate * 0.02;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1) * 0.4;
    }
    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;
    fuente.connect(ganancia);
    fuente.start(ahora);

    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.08);
  }

  // --- BLOQUE QUITAR: pop suave al retirar una pieza ---
  // Sonido inverso al colocar — tono ascendente corto
  bloqueQuitar() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.2);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ahora);
    osc.frequency.exponentialRampToValueAtTime(600, ahora + 0.06);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.08);

    ganancia.gain.setValueAtTime(this.volumen * 0.2, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.1);
  }

  // --- ROBOT MOVERSE: zumbido corto de servomotor ---
  // Simula el sonido de un motor paso a paso ejecutando un movimiento
  robotMoverse() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.2);

    // Oscilador con frecuencia modulada (sonido de servo)
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, ahora);
    osc.frequency.linearRampToValueAtTime(180, ahora + 0.08);
    osc.frequency.linearRampToValueAtTime(120, ahora + 0.15);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.15);

    ganancia.gain.setValueAtTime(this.volumen * 0.2, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.18);
  }

  // --- ROBOT ÉXITO: fanfarria ascendente triunfal ---
  // El robot completó su misión — acorde mayor brillante
  robotExito() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.35);

    // Acorde mayor ascendente Do-Mi-Sol-Do (triunfal)
    const notas = [523, 659, 784, 1047];
    for (let i = 0; i < notas.length; i++) {
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(notas[i], ahora + i * 0.1);
      osc.connect(ganancia);
      osc.start(ahora + i * 0.1);
      osc.stop(ahora + i * 0.1 + 0.15);
    }

    ganancia.gain.setValueAtTime(this.volumen * 0.35, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.6);
  }

  // --- ROBOT FALLO: beep de error (dos tonos descendentes) ---
  // Indica que el programa del robot tiene un error
  robotFallo() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.3);

    const osc1 = ctx.createOscillator();
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(440, ahora);
    osc1.connect(ganancia);
    osc1.start(ahora);
    osc1.stop(ahora + 0.1);

    const osc2 = ctx.createOscillator();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(330, ahora + 0.12);
    osc2.connect(ganancia);
    osc2.start(ahora + 0.12);
    osc2.stop(ahora + 0.22);

    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora);
    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora + 0.12);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.25);
  }

  // --- CABLE CONECTAR: click/snap de conexión eléctrica ---
  // Sonido satisfactorio al enchufar un cable correctamente
  cableConectar() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.25);

    // Tono agudo corto (snap eléctrico)
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ahora);
    osc.frequency.exponentialRampToValueAtTime(600, ahora + 0.03);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.05);

    // Pequeño ruido de contacto
    const bufferSize = ctx.sampleRate * 0.015;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;
    fuente.connect(ganancia);
    fuente.start(ahora + 0.02);

    ganancia.gain.setValueAtTime(this.volumen * 0.25, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.06);
  }

  // --- CABLE ERROR: chispa/zumbido de conexión incorrecta ---
  // Ruido eléctrico agresivo indicando cortocircuito
  cableError() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.3);

    // Oscilador con frecuencia errática (chispa eléctrica)
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, ahora);
    osc.frequency.linearRampToValueAtTime(300, ahora + 0.05);
    osc.frequency.linearRampToValueAtTime(80, ahora + 0.1);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.15);

    // Ruido de chispa superpuesto
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1) * 0.6;
    }
    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'highpass';
    filtro.frequency.value = 3000;
    fuente.connect(filtro);
    filtro.connect(ganancia);
    fuente.start(ahora);

    ganancia.gain.setValueAtTime(this.volumen * 0.3, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.15);
  }

  // --- CIRCUITO COMPLETO: zumbido ascendente de encendido ---
  // El circuito se cierra y la energía fluye — sensación de logro
  circuitoCompleto() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.3);

    // Zumbido eléctrico que sube de frecuencia (power-up)
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, ahora);
    osc.frequency.exponentialRampToValueAtTime(600, ahora + 0.4);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.5);

    // Armónico adicional para dar riqueza al sonido
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(200, ahora);
    osc2.frequency.exponentialRampToValueAtTime(1200, ahora + 0.4);
    osc2.connect(ganancia);
    osc2.start(ahora);
    osc2.stop(ahora + 0.5);

    ganancia.gain.setValueAtTime(0.001, ahora);
    ganancia.gain.linearRampToValueAtTime(this.volumen * 0.3, ahora + 0.2);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.55);
  }

  // --- SONIDO DE CAPTURA DE FOTO ---
  // Simula el "click" de un obturador de cámara: ruido blanco corto
  // seguido de un chasquido mecánico. Dura ~0.15 segundos.
  fotoCaptura() {
    if (!this._asegurarContexto()) return;

    const ctx = this.contexto;
    const ahora = ctx.currentTime;

    // Ruido blanco breve (el "shh" del obturador)
    const duracionRuido = 0.08;
    const bufferSize = Math.ceil(ctx.sampleRate * duracionRuido);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;

    const gananciaRuido = this._crearGanancia(this.volumen * 0.25);
    gananciaRuido.gain.setValueAtTime(this.volumen * 0.25, ahora);
    gananciaRuido.gain.exponentialRampToValueAtTime(0.001, ahora + duracionRuido);

    fuente.connect(gananciaRuido);
    fuente.start(ahora);

    // Chasquido mecánico (tono alto muy corto)
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, ahora + 0.03);
    osc.frequency.exponentialRampToValueAtTime(300, ahora + 0.08);

    const gananciaClick = this._crearGanancia(this.volumen * 0.2);
    gananciaClick.gain.setValueAtTime(this.volumen * 0.2, ahora + 0.03);
    gananciaClick.gain.exponentialRampToValueAtTime(0.001, ahora + 0.1);

    osc.connect(gananciaClick);
    osc.start(ahora + 0.03);
    osc.stop(ahora + 0.12);
  }

  // --- SONIDO DE CAPTURA DE SELFIE ---
  // Similar al de foto pero con un tono ascendente brillante que
  // simula el "flash" de la cámara. Más alegre y memorable.
  selfieCaptura() {
    if (!this._asegurarContexto()) return;

    const ctx = this.contexto;
    const ahora = ctx.currentTime;

    // Ruido blanco de obturador (igual que foto)
    const duracionRuido = 0.06;
    const bufferSize = Math.ceil(ctx.sampleRate * duracionRuido);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      datos[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;

    const gananciaRuido = this._crearGanancia(this.volumen * 0.2);
    gananciaRuido.gain.setValueAtTime(this.volumen * 0.2, ahora);
    gananciaRuido.gain.exponentialRampToValueAtTime(0.001, ahora + duracionRuido);

    fuente.connect(gananciaRuido);
    fuente.start(ahora);

    // Tono ascendente brillante (efecto "flash")
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ahora + 0.05);
    osc.frequency.exponentialRampToValueAtTime(1200, ahora + 0.2);

    const gananciaFlash = this._crearGanancia(this.volumen * 0.15);
    gananciaFlash.gain.setValueAtTime(0.001, ahora + 0.05);
    gananciaFlash.gain.linearRampToValueAtTime(this.volumen * 0.15, ahora + 0.1);
    gananciaFlash.gain.exponentialRampToValueAtTime(0.001, ahora + 0.25);

    osc.connect(gananciaFlash);
    osc.start(ahora + 0.05);
    osc.stop(ahora + 0.3);
  }

  // ============================================================
  // SONIDOS AMBIENTALES — loops continuos controlados externamente
  // ============================================================

  /**
   * Inicia el sonido ambiente de lluvia — ruido blanco filtrado a
   * frecuencias graves con modulación suave para simular gotas.
   * Devuelve un objeto con método detener() para pararlo.
   * @param {number} intensidad — 0 a 1, controla el volumen
   * @returns {{ detener: Function, setIntensidad: Function }}
   */
  lluviaAmbiente(intensidad = 0.5) {
    if (!this._asegurarContexto()) return { detener() {}, setIntensidad() {} };
    const ctx = this.contexto;

    // --- Ruido blanco como base de la lluvia ---
    // Creamos un buffer de ruido aleatorio (2 segundos en loop)
    const duracion = 2;
    const muestras = ctx.sampleRate * duracion;
    const buffer = ctx.createBuffer(1, muestras, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < muestras; i++) {
      datos[i] = Math.random() * 2 - 1;
    }

    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;
    fuente.loop = true;

    // --- Filtro paso-bajo para que suene a lluvia, no a estática ---
    // Las frecuencias altas se cortan, dejando un "shhhhh" suave
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.value = 800;
    filtro.Q.value = 0.5;

    // --- Segundo filtro paso-alto para quitar el rumble grave ---
    const filtroPasoAlto = ctx.createBiquadFilter();
    filtroPasoAlto.type = 'highpass';
    filtroPasoAlto.frequency.value = 200;

    // --- Nodo de ganancia para controlar volumen ---
    const ganancia = ctx.createGain();
    const volBase = this.volumen * 0.25 * intensidad;
    ganancia.gain.setValueAtTime(volBase, ctx.currentTime);

    // Conectar: fuente → filtro bajo → filtro alto → ganancia → salida
    fuente.connect(filtro);
    filtro.connect(filtroPasoAlto);
    filtroPasoAlto.connect(ganancia);
    ganancia.connect(ctx.destination);
    fuente.start();

    // --- Gotas individuales periódicas (efecto de textura) ---
    // Un oscilador rápido que se activa brevemente cada ~0.3s
    let intervaloGotas = null;
    const crearGota = () => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      const freq = 2000 + Math.random() * 3000;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.3, ctx.currentTime + 0.05);

      const g = ctx.createGain();
      g.gain.setValueAtTime(this.volumen * 0.02 * intensidad, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(g);
      g.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    };
    intervaloGotas = setInterval(crearGota, 150 + Math.random() * 200);

    // Devolvemos controles para que el sistema de clima pueda
    // ajustar la intensidad o detener el sonido
    return {
      // Cambiar la intensidad en tiempo real (transiciones suaves)
      setIntensidad: (nuevaIntensidad) => {
        const nuevoVol = this.volumen * 0.25 * nuevaIntensidad;
        ganancia.gain.linearRampToValueAtTime(nuevoVol, ctx.currentTime + 0.5);
      },
      // Detener el sonido de lluvia con un fade-out suave
      detener: () => {
        clearInterval(intervaloGotas);
        ganancia.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
        setTimeout(() => { try { fuente.stop(); } catch(e) {} }, 1200);
      }
    };
  }

  /**
   * Sonido de trueno — retumbar grave con eco.
   * Se usa durante tormentas para acompañar los destellos de rayo.
   */
  // --- MOTOR DE LANCHA RÁPIDA ---
  // Ruido grave de motor fuera de borda que se acerca y se aleja (efecto Doppler)
  // Mezcla de onda cuadrada (motor) + ruido filtrado (agua/estela)
  lanchaMotor() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const duracion = 3.0;

    const ganancia = this._crearGanancia(this.volumen * 0.2);

    // Motor: onda cuadrada grave que sube y baja (efecto Doppler)
    const motor = ctx.createOscillator();
    motor.type = 'square';
    motor.frequency.setValueAtTime(60, ahora);
    motor.frequency.linearRampToValueAtTime(90, ahora + 0.8);
    motor.frequency.linearRampToValueAtTime(95, ahora + 1.5);
    motor.frequency.linearRampToValueAtTime(70, ahora + 2.5);
    motor.frequency.linearRampToValueAtTime(50, ahora + duracion);

    // Filtro para suavizar la cuadrada
    const filtroMotor = ctx.createBiquadFilter();
    filtroMotor.type = 'lowpass';
    filtroMotor.frequency.setValueAtTime(200, ahora);
    filtroMotor.frequency.linearRampToValueAtTime(400, ahora + 1.0);
    filtroMotor.frequency.linearRampToValueAtTime(150, ahora + duracion);

    const gMotor = ctx.createGain();
    gMotor.gain.setValueAtTime(0.001, ahora);
    gMotor.gain.linearRampToValueAtTime(0.5, ahora + 0.6);
    gMotor.gain.setValueAtTime(0.5, ahora + 1.5);
    gMotor.gain.linearRampToValueAtTime(0.1, ahora + 2.5);
    gMotor.gain.exponentialRampToValueAtTime(0.001, ahora + duracion);

    motor.connect(filtroMotor);
    filtroMotor.connect(gMotor);
    gMotor.connect(ganancia);
    motor.start(ahora);
    motor.stop(ahora + duracion);

    // Ruido de agua/estela — ruido blanco filtrado
    const muestras = ctx.sampleRate * duracion;
    const buffer = ctx.createBuffer(1, muestras, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < muestras; i++) {
      datos[i] = Math.random() * 2 - 1;
    }
    const ruido = ctx.createBufferSource();
    ruido.buffer = buffer;

    const filtroAgua = ctx.createBiquadFilter();
    filtroAgua.type = 'bandpass';
    filtroAgua.frequency.setValueAtTime(800, ahora);
    filtroAgua.Q.setValueAtTime(1.5, ahora);

    const gAgua = ctx.createGain();
    gAgua.gain.setValueAtTime(0.001, ahora);
    gAgua.gain.linearRampToValueAtTime(0.3, ahora + 0.5);
    gAgua.gain.linearRampToValueAtTime(0.3, ahora + 1.5);
    gAgua.gain.exponentialRampToValueAtTime(0.001, ahora + duracion);

    ruido.connect(filtroAgua);
    filtroAgua.connect(gAgua);
    gAgua.connect(ganancia);
    ruido.start(ahora);
    ruido.stop(ahora + duracion);
  }

  // --- IMPACTO DE LANCHA (colisión con el jugador) ---
  // Golpe grave + ruido de chapoteo + grito agudo corto ("Wilhelm scream" sintético)
  lanchaImpacto() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;

    const ganancia = this._crearGanancia(this.volumen * 0.5);

    // 1) Golpe grave de impacto — onda triangular descendente
    const golpe = ctx.createOscillator();
    golpe.type = 'triangle';
    golpe.frequency.setValueAtTime(200, ahora);
    golpe.frequency.exponentialRampToValueAtTime(40, ahora + 0.25);
    const gGolpe = ctx.createGain();
    gGolpe.gain.setValueAtTime(0.7, ahora);
    gGolpe.gain.exponentialRampToValueAtTime(0.001, ahora + 0.3);
    golpe.connect(gGolpe);
    gGolpe.connect(ganancia);
    golpe.start(ahora);
    golpe.stop(ahora + 0.35);

    // 2) Chapoteo — ruido blanco con bandpass alto
    const muestras = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, muestras, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < muestras; i++) datos[i] = Math.random() * 2 - 1;
    const splash = ctx.createBufferSource();
    splash.buffer = buffer;
    const filtroSplash = ctx.createBiquadFilter();
    filtroSplash.type = 'bandpass';
    filtroSplash.frequency.setValueAtTime(2000, ahora);
    filtroSplash.Q.setValueAtTime(0.8, ahora);
    const gSplash = ctx.createGain();
    gSplash.gain.setValueAtTime(0.5, ahora);
    gSplash.gain.exponentialRampToValueAtTime(0.001, ahora + 0.35);
    splash.connect(filtroSplash);
    filtroSplash.connect(gSplash);
    gSplash.connect(ganancia);
    splash.start(ahora);
    splash.stop(ahora + 0.4);

    // 3) Grito corto (Wilhelm scream sintético) — oscilador con vibrato
    const grito = ctx.createOscillator();
    grito.type = 'sawtooth';
    grito.frequency.setValueAtTime(600, ahora + 0.05);
    grito.frequency.linearRampToValueAtTime(900, ahora + 0.15);
    grito.frequency.linearRampToValueAtTime(700, ahora + 0.35);
    grito.frequency.exponentialRampToValueAtTime(300, ahora + 0.55);
    // Vibrato rápido para que suene a voz
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(30, ahora);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(40, ahora);
    lfo.connect(lfoGain);
    lfoGain.connect(grito.frequency);
    lfo.start(ahora + 0.05);
    lfo.stop(ahora + 0.55);
    // Envolvente del grito
    const gGrito = ctx.createGain();
    gGrito.gain.setValueAtTime(0.001, ahora);
    gGrito.gain.linearRampToValueAtTime(0.4, ahora + 0.1);
    gGrito.gain.setValueAtTime(0.4, ahora + 0.25);
    gGrito.gain.exponentialRampToValueAtTime(0.001, ahora + 0.55);
    // Filtro para dar timbre de voz humana
    const filtroVoz = ctx.createBiquadFilter();
    filtroVoz.type = 'bandpass';
    filtroVoz.frequency.setValueAtTime(1200, ahora);
    filtroVoz.Q.setValueAtTime(3, ahora);
    grito.connect(filtroVoz);
    filtroVoz.connect(gGrito);
    gGrito.connect(ganancia);
    grito.start(ahora + 0.05);
    grito.stop(ahora + 0.55);
  }

  // --- MORDIDA DE TIBURÓN ---
  // Crujido seco de mandíbulas cerrándose + chapoteo + gruñido grave corto
  mordidaTiburon() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;

    const ganancia = this._crearGanancia(this.volumen * 0.5);

    // 1) Crujido de mandíbulas — ruido blanco muy corto con high-pass
    const muestras = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, muestras, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < muestras; i++) datos[i] = Math.random() * 2 - 1;
    const crujido = ctx.createBufferSource();
    crujido.buffer = buffer;
    const filtroCrujido = ctx.createBiquadFilter();
    filtroCrujido.type = 'highpass';
    filtroCrujido.frequency.setValueAtTime(3000, ahora);
    const gCrujido = ctx.createGain();
    gCrujido.gain.setValueAtTime(0.6, ahora);
    gCrujido.gain.exponentialRampToValueAtTime(0.001, ahora + 0.12);
    crujido.connect(filtroCrujido);
    filtroCrujido.connect(gCrujido);
    gCrujido.connect(ganancia);
    crujido.start(ahora);
    crujido.stop(ahora + 0.15);

    // 2) Golpe grave de la mordida — triangular descendente (más grave que lancha)
    const golpe = ctx.createOscillator();
    golpe.type = 'triangle';
    golpe.frequency.setValueAtTime(120, ahora);
    golpe.frequency.exponentialRampToValueAtTime(30, ahora + 0.2);
    const gGolpe = ctx.createGain();
    gGolpe.gain.setValueAtTime(0.6, ahora);
    gGolpe.gain.exponentialRampToValueAtTime(0.001, ahora + 0.25);
    golpe.connect(gGolpe);
    gGolpe.connect(ganancia);
    golpe.start(ahora);
    golpe.stop(ahora + 0.3);

    // 3) Gruñido corto — sawtooth grave con vibrato lento
    const grunido = ctx.createOscillator();
    grunido.type = 'sawtooth';
    grunido.frequency.setValueAtTime(80, ahora + 0.08);
    grunido.frequency.exponentialRampToValueAtTime(50, ahora + 0.4);
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(12, ahora);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(15, ahora);
    lfo.connect(lfoGain);
    lfoGain.connect(grunido.frequency);
    lfo.start(ahora + 0.08);
    lfo.stop(ahora + 0.4);
    const filtroGrunido = ctx.createBiquadFilter();
    filtroGrunido.type = 'lowpass';
    filtroGrunido.frequency.setValueAtTime(200, ahora);
    const gGrunido = ctx.createGain();
    gGrunido.gain.setValueAtTime(0.001, ahora);
    gGrunido.gain.linearRampToValueAtTime(0.35, ahora + 0.12);
    gGrunido.gain.exponentialRampToValueAtTime(0.001, ahora + 0.4);
    grunido.connect(filtroGrunido);
    filtroGrunido.connect(gGrunido);
    gGrunido.connect(ganancia);
    grunido.start(ahora + 0.08);
    grunido.stop(ahora + 0.45);
  }

  // --- MORDIDA COCODRILO: mandíbulas pesadas + grito descendente ---
  // Más grave y brutal que la mordida de tiburón, con un grito
  // tipo Wilhelm (tono descendente rápido) que simula el susto
  mordidaCocodrilo() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.55);

    // 1) Chasquido de mandíbulas — ruido blanco con bandpass grave
    // (mandíbulas más grandes que un tiburón = sonido más grueso)
    const muestras = ctx.sampleRate * 0.12;
    const buffer = ctx.createBuffer(1, muestras, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < muestras; i++) datos[i] = Math.random() * 2 - 1;
    const snap = ctx.createBufferSource();
    snap.buffer = buffer;
    const filtroSnap = ctx.createBiquadFilter();
    filtroSnap.type = 'bandpass';
    filtroSnap.frequency.setValueAtTime(1500, ahora);
    filtroSnap.Q.setValueAtTime(2, ahora);
    const gSnap = ctx.createGain();
    gSnap.gain.setValueAtTime(0.7, ahora);
    gSnap.gain.exponentialRampToValueAtTime(0.001, ahora + 0.1);
    snap.connect(filtroSnap);
    filtroSnap.connect(gSnap);
    gSnap.connect(ganancia);
    snap.start(ahora);
    snap.stop(ahora + 0.12);

    // 2) Golpe grave pesado — mandíbulas cerrándose con fuerza
    const golpe = ctx.createOscillator();
    golpe.type = 'triangle';
    golpe.frequency.setValueAtTime(90, ahora);
    golpe.frequency.exponentialRampToValueAtTime(20, ahora + 0.25);
    const gGolpe = ctx.createGain();
    gGolpe.gain.setValueAtTime(0.7, ahora);
    gGolpe.gain.exponentialRampToValueAtTime(0.001, ahora + 0.3);
    golpe.connect(gGolpe);
    gGolpe.connect(ganancia);
    golpe.start(ahora);
    golpe.stop(ahora + 0.35);

    // 3) Grito descendente tipo Wilhelm — tono agudo que baja rápido
    // Simula el susto/dolor del jugador al ser mordido
    const grito = ctx.createOscillator();
    grito.type = 'sawtooth';
    grito.frequency.setValueAtTime(900, ahora + 0.05);
    grito.frequency.exponentialRampToValueAtTime(300, ahora + 0.35);
    const filtroGrito = ctx.createBiquadFilter();
    filtroGrito.type = 'bandpass';
    filtroGrito.frequency.setValueAtTime(600, ahora);
    filtroGrito.Q.setValueAtTime(3, ahora);
    const gGrito = ctx.createGain();
    gGrito.gain.setValueAtTime(0.001, ahora);
    gGrito.gain.linearRampToValueAtTime(0.25, ahora + 0.08);
    gGrito.gain.exponentialRampToValueAtTime(0.001, ahora + 0.4);
    grito.connect(filtroGrito);
    filtroGrito.connect(gGrito);
    gGrito.connect(ganancia);
    grito.start(ahora + 0.05);
    grito.stop(ahora + 0.45);

    // 4) Gruñido de cocodrilo — muy grave, gutural
    const grunido = ctx.createOscillator();
    grunido.type = 'sawtooth';
    grunido.frequency.setValueAtTime(60, ahora + 0.1);
    grunido.frequency.exponentialRampToValueAtTime(35, ahora + 0.5);
    const filtroGrunido = ctx.createBiquadFilter();
    filtroGrunido.type = 'lowpass';
    filtroGrunido.frequency.setValueAtTime(150, ahora);
    const gGrunido = ctx.createGain();
    gGrunido.gain.setValueAtTime(0.001, ahora);
    gGrunido.gain.linearRampToValueAtTime(0.3, ahora + 0.15);
    gGrunido.gain.exponentialRampToValueAtTime(0.001, ahora + 0.5);
    grunido.connect(filtroGrunido);
    filtroGrunido.connect(gGrunido);
    gGrunido.connect(ganancia);
    grunido.start(ahora + 0.1);
    grunido.stop(ahora + 0.55);
  }

  trueno() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;

    // Ruido grave filtrado para el retumbar
    const duracion = 1.5;
    const muestras = ctx.sampleRate * duracion;
    const buffer = ctx.createBuffer(1, muestras, ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < muestras; i++) {
      datos[i] = Math.random() * 2 - 1;
    }

    const fuente = ctx.createBufferSource();
    fuente.buffer = buffer;

    // Filtro muy grave — el trueno es puro bajo
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.setValueAtTime(150, ahora);
    filtro.frequency.exponentialRampToValueAtTime(60, ahora + duracion);

    const ganancia = this._crearGanancia(this.volumen * 0.4);
    ganancia.gain.setValueAtTime(this.volumen * 0.4, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + duracion);

    fuente.connect(filtro);
    filtro.connect(ganancia);
    fuente.start(ahora);
    fuente.stop(ahora + duracion);
  }

  // --- ROBOT FLL ZUMBIDO: motor continuo que se inicia/detiene ---
  // Simula el zumbido constante de un pequeño robot LEGO moviéndose
  robotFLLIniciar() {
    if (this._robotFLLActivo) return; // Ya está sonando
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;

    // Nodo de ganancia persistente para poder hacer fade out al detener
    const ganancia = ctx.createGain();
    ganancia.gain.setValueAtTime(0.001, ahora);
    ganancia.gain.linearRampToValueAtTime(this.volumen * 0.15, ahora + 0.1);
    ganancia.connect(ctx.destination);

    // Oscilador grave continuo (motor eléctrico pequeño)
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(85, ahora);

    // Filtro pasa-bajos para suavizar
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.setValueAtTime(200, ahora);

    osc.connect(filtro);
    filtro.connect(ganancia);
    osc.start(ahora);

    // Guardar referencias para poder detenerlo después
    this._robotFLLOsc = osc;
    this._robotFLLGanancia = ganancia;
    this._robotFLLActivo = true;
  }

  // Detiene el zumbido del robot FLL con un fade out rápido
  robotFLLDetener() {
    if (!this._robotFLLActivo) return;
    if (!this.contexto) return;
    const ahora = this.contexto.currentTime;

    // Fade out rápido para evitar click
    this._robotFLLGanancia.gain.cancelScheduledValues(ahora);
    this._robotFLLGanancia.gain.setValueAtTime(this._robotFLLGanancia.gain.value, ahora);
    this._robotFLLGanancia.gain.linearRampToValueAtTime(0.001, ahora + 0.08);

    // Detener el oscilador tras el fade
    this._robotFLLOsc.stop(ahora + 0.1);

    this._robotFLLOsc = null;
    this._robotFLLGanancia = null;
    this._robotFLLActivo = false;
  }

  // --- ROBOT FLL CLICK: clic mecánico al detenerse y girar ---
  // Simula el sonido de engranajes deteniéndose
  robotFLLClick() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.01);

    // Pulso muy corto y agudo (clic mecánico)
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, ahora);
    osc.frequency.exponentialRampToValueAtTime(200, ahora + 0.04);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.05);

    ganancia.gain.setValueAtTime(this.volumen * 0.01, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.06);
  }

  // --- BOSS CEMÍ: sonido de ráfaga de anillo ---
  // Pulso grave que suena cuando el boss lanza un anillo de orbes
  bossAnillo() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.15);
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, ahora);
    osc.frequency.exponentialRampToValueAtTime(80, ahora + 0.3);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.35);
    ganancia.gain.setValueAtTime(this.volumen * 0.15, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.35);
  }

  // --- BOSS CEMÍ: sonido de disparo dirigido ---
  // Zumbido agudo corto cuando el boss dispara orbes apuntados
  bossDirigido() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.1);
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, ahora);
    osc.frequency.exponentialRampToValueAtTime(300, ahora + 0.15);
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.setValueAtTime(800, ahora);
    osc.connect(filtro);
    filtro.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.18);
    ganancia.gain.setValueAtTime(this.volumen * 0.1, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.2);
  }

  // --- BOSS CEMÍ: sonido de aturdimiento ---
  // Tono descendente largo cuando el boss se aturde
  bossAturdido() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.2);
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ahora);
    osc.frequency.exponentialRampToValueAtTime(80, ahora + 0.8);
    osc.connect(ganancia);
    osc.start(ahora);
    osc.stop(ahora + 0.9);
    ganancia.gain.setValueAtTime(this.volumen * 0.2, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.9);
  }

  // --- BOSS CEMÍ: sonido de bendición divina ---
  // Arpegio ascendente brillante
  bossBendicion() {
    if (!this._asegurarContexto()) return;
    const ctx = this.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this._crearGanancia(this.volumen * 0.25);
    const notas = [523, 659, 784, 1047, 1318];
    for (let i = 0; i < notas.length; i++) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(notas[i], ahora + i * 0.15);
      osc.connect(ganancia);
      osc.start(ahora + i * 0.15);
      osc.stop(ahora + i * 0.15 + 0.3);
    }
    ganancia.gain.setValueAtTime(this.volumen * 0.25, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 1.2);
  }
}
