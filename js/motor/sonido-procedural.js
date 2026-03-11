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
