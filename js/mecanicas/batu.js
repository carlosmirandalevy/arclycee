// ============================================================
// BATU.JS - Mini-juego del batú (pelota taína)
// ============================================================
// El batú era el juego de pelota de los taínos, jugado en canchas
// rectangulares de piedra llamadas bateyes. La pelota se hacía con
// látex del árbol de cupey, era muy elástica y del tamaño de una
// softball. Se golpeaba con caderas (usando un cinturón llamado yugo),
// hombros, codos, rodillas y cabeza — NUNCA con manos ni pies.
//
// Se usaba para resolver disputas entre aldeas y en ceremonias.
// Sitios arqueológicos con bateyes: Chacuey, La Aleta (RD).
//
// Este mini-juego funciona como overlay (igual que el combate):
// se dibuja encima de la escena actual y consume toda la entrada.
// Vista lateral, estilo Pong pero con física de rebote realista.
// ============================================================

import { SonidoProcedural } from '../motor/sonido-procedural.js';

// --- Constantes de física ---
// Calibradas para que la pelota se sienta elástica y satisfactoria
const GRAVEDAD = 480;              // px/s² — aceleración hacia abajo (menor para vuelos más largos)
const REBOTE_PELOTA = 0.8;         // Coeficiente de rebote contra el suelo
const REBOTE_PARED = 0.9;          // Coeficiente de rebote contra las paredes
const FRICCION_AIRE = 0.998;       // La pelota pierde velocidad más gradualmente
const VELOCIDAD_SAQUE = 400;       // px/s al servir (más fuerte para cruzar la cancha)
const VELOCIDAD_GOLPE_MIN = 280;   // px/s golpe débil
const VELOCIDAD_GOLPE_MAX = 500;   // px/s golpe fuerte
const VELOCIDAD_JUGADOR = 250;     // px/s movimiento horizontal del jugador
const RADIO_PELOTA = 8;            // px
const PUNTOS_PARA_GANAR = 5;       // Primero en llegar gana

// --- Dimensiones de la cancha (dentro del overlay de 960×540) ---
const CANCHA_X = 80;               // Margen izquierdo
const CANCHA_ANCHO = 800;          // Ancho total de la cancha
const CANCHA_SUELO = 420;          // Línea del suelo (Y)
const CANCHA_TECHO = 60;           // Límite superior
const LINEA_CENTRAL = CANCHA_X + CANCHA_ANCHO / 2;  // División de la cancha

// --- Dimensiones de los jugadores ---
const JUGADOR_ANCHO = 28;
const JUGADOR_ALTO = 40;

// --- IA del rival ---
// Diseñada para ser vencible por jugadores de ~13 años
const IA_VELOCIDAD_FACTOR = 0.72;  // 72% de la velocidad del jugador
const IA_RETARDO_REACCION = 0.3;   // Segundos antes de reaccionar (más lento)
const IA_PROBABILIDAD_ERROR = 0.10; // 10% de fallar intencionalmente
const IA_IMPRECISION = 25;          // px de error al apuntar a la pelota

// --- Datos educativos sobre el batú (se muestran entre puntos) ---
const DATOS_EDUCATIVOS = [
  'datoFisica',      // La pelota se hacía con látex de cupey
  'datoCancha',      // Los bateyes tenían petroglifos tallados
  'datoYugo',        // El yugo era un cinturón de piedra/madera
  'datoCeremonia',   // Se jugaba durante las fiestas de areíto
  'datoDisputa',     // Servía para resolver conflictos sin guerra
  'datoArqueologia'  // Sitios: Chacuey, La Aleta, Tibes (PR)
];

export class JuegoBatu {

  constructor() {
    // --- Estado principal ---
    this.enJuego = false;

    // Máquina de estados:
    // intro → saque → jugando → punto → educativo → saque → ... → finJuego
    this.fase = 'intro';

    // --- Puntuación ---
    this.puntosJugador = 0;
    this.puntosRival = 0;

    // --- Pelota ---
    this.pelota = { x: 0, y: 0, vx: 0, vy: 0 };

    // --- Posiciones de los personajes ---
    // El jugador está a la izquierda, el rival a la derecha
    this.jugadorX = CANCHA_X + 80;
    this.rivalX = CANCHA_X + CANCHA_ANCHO - 80 - JUGADOR_ANCHO;

    // --- IA ---
    this._iaObjetivo = 0;           // X hacia donde se mueve el rival
    this._iaRetardo = 0;            // Cuenta regresiva de retardo
    this._iaErrorActivo = false;    // ¿El rival "falla" este punto?

    // --- Temporizadores ---
    this._tiempoFase = 0;           // Tiempo en la fase actual
    this._indiceDatoEducativo = 0;  // Cuál dato educativo mostrar

    // --- Bloqueo de entrada ---
    this._bloqueoEntrada = true;

    // --- Historia elegida ---
    // 'disputa' (default) o 'ceremonia'
    this.historia = 'disputa';

    // --- Callback al terminar ---
    this._alTerminar = null;

    // --- Quién saca ---
    // true = jugador saca, false = rival saca. Alterna cada punto.
    this._saqueJugador = true;

    // --- Sonidos ---
    this._sfx = new SonidoProcedural();

    // --- Espectadores (posiciones pre-calculadas para animación) ---
    this._espectadores = [];
    for (let i = 0; i < 12; i++) {
      this._espectadores.push({
        x: CANCHA_X + 30 + i * 65,
        fase: Math.random() * Math.PI * 2  // Fase de animación de "bailoteo"
      });
    }

    // --- Tiempo total (para animaciones) ---
    this._tiempoTotal = 0;
  }

  // ============================================================
  // INICIAR EL JUEGO DE BATÚ
  // ============================================================
  // Se llama desde la escena (asentamiento-taino-2.js) con opciones:
  // { historia: 'disputa'|'ceremonia', alTerminar: callback }
  iniciar(opciones = {}) {
    this.enJuego = true;
    this.fase = 'intro';
    this.puntosJugador = 0;
    this.puntosRival = 0;
    this.historia = opciones.historia || 'disputa';
    this._alTerminar = opciones.alTerminar || null;
    this._tiempoFase = 0;
    this._indiceDatoEducativo = 0;
    this._bloqueoEntrada = true;
    this._saqueJugador = true;
    this._tiempoTotal = 0;

    // Posicionar jugadores
    this.jugadorX = CANCHA_X + 80;
    this.rivalX = CANCHA_X + CANCHA_ANCHO - 80 - JUGADOR_ANCHO;

    // Pelota en el centro
    this._resetearPelota();
  }

  // --- Preparar la pelota para un nuevo saque ---
  _resetearPelota() {
    this.pelota.x = LINEA_CENTRAL;
    this.pelota.y = CANCHA_SUELO - 100;
    this.pelota.vx = 0;
    this.pelota.vy = 0;
  }

  // ============================================================
  // ACTUALIZACIÓN (cada frame)
  // ============================================================
  actualizar(dt, entrada) {
    if (!this.enJuego) return;

    this._tiempoTotal += dt;
    this._tiempoFase += dt;

    // --- Desbloquear entrada cuando se sueltan las teclas ---
    if (this._bloqueoEntrada) {
      // En fin de juego, solo necesita soltar E para desbloquear
      // (el jugador puede seguir con flechas presionadas)
      if (this.fase === 'finJuego' || this.fase === 'educativo') {
        if (!entrada.estaPresionada('accion')) {
          this._bloqueoEntrada = false;
        }
      } else if (!entrada.estaPresionada('accion') &&
          !entrada.estaPresionada('izquierda') &&
          !entrada.estaPresionada('derecha')) {
        this._bloqueoEntrada = false;
      }
      // En la fase intro, solo bloqueamos la acción
      if (this.fase !== 'intro') return;
    }

    switch (this.fase) {
      case 'intro':
        this._actualizarIntro(dt, entrada);
        break;
      case 'saque':
        this._actualizarSaque(dt, entrada);
        break;
      case 'jugando':
        this._actualizarJugando(dt, entrada);
        break;
      case 'punto':
        this._actualizarPunto(dt, entrada);
        break;
      case 'educativo':
        this._actualizarEducativo(dt, entrada);
        break;
      case 'finJuego':
        this._actualizarFin(dt, entrada);
        break;
    }
  }

  // --- Fase: Introducción (explicación de reglas) ---
  _actualizarIntro(dt, entrada) {
    // Avanzar con E después de 1 segundo
    if (this._tiempoFase > 1 && entrada.estaPresionada('accion') && !this._bloqueoEntrada) {
      this.fase = 'saque';
      this._tiempoFase = 0;
      this._bloqueoEntrada = true;
      this._sfx.batuSaque();
    }
  }

  // --- Fase: Saque (la pelota se lanza al aire) ---
  _actualizarSaque(dt, entrada) {
    if (this._tiempoFase > 0.5) {
      // Lanzar la pelota — arco más plano para que siempre cruce la línea central
      const direccion = this._saqueJugador ? 1 : -1;
      this.pelota.x = this._saqueJugador
        ? this.jugadorX + JUGADOR_ANCHO / 2
        : this.rivalX + JUGADOR_ANCHO / 2;
      this.pelota.y = CANCHA_SUELO - JUGADOR_ALTO - 10;
      // Variación aleatoria en el saque (±10%) para que no sea siempre igual
      const varSaque = 0.9 + Math.random() * 0.2;
      // Primer saque: fly ball alto para dar tiempo al jugador de prepararse
      const esPrimerSaque = this.puntosJugador === 0 && this.puntosRival === 0;
      if (esPrimerSaque) {
        this.pelota.vx = VELOCIDAD_SAQUE * 0.6 * direccion;
        this.pelota.vy = -VELOCIDAD_SAQUE * 0.9;  // Arco alto y lento
      } else {
        this.pelota.vx = VELOCIDAD_SAQUE * direccion * varSaque;
        this.pelota.vy = -VELOCIDAD_SAQUE * 0.5 * varSaque;  // Arco más bajo y rápido
      }

      this._sfx.batuSaque();

      // Decidir si la IA falla este punto (se re-evalúa cada pocos segundos)
      this._iaErrorActivo = Math.random() < IA_PROBABILIDAD_ERROR;
      this._iaRetardo = IA_RETARDO_REACCION;
      this._iaProximoReeval = 1.5 + Math.random() * 2; // Re-evaluar error cada 1.5-3.5s

      this.fase = 'jugando';
      this._tiempoFase = 0;
    }
  }

  // --- Fase: Jugando (física activa, control del jugador) ---
  _actualizarJugando(dt, entrada) {
    const factorTiempo = dt * 60;

    // --- Movimiento del jugador (solo en su mitad izquierda) ---
    if (entrada.estaPresionada('izquierda')) {
      this.jugadorX -= VELOCIDAD_JUGADOR * dt;
    }
    if (entrada.estaPresionada('derecha')) {
      this.jugadorX += VELOCIDAD_JUGADOR * dt;
    }
    // Limitar al lado izquierdo de la cancha
    this.jugadorX = Math.max(CANCHA_X + 5, Math.min(LINEA_CENTRAL - JUGADOR_ANCHO - 5, this.jugadorX));

    // --- IA del rival ---
    this._actualizarIA(dt);

    // Re-evaluar si la IA falla periódicamente (no solo al inicio del punto)
    if (this._iaProximoReeval !== undefined) {
      this._iaProximoReeval -= dt;
      if (this._iaProximoReeval <= 0) {
        this._iaErrorActivo = Math.random() < IA_PROBABILIDAD_ERROR;
        this._iaProximoReeval = 1.5 + Math.random() * 2;
      }
    }

    // --- Física de la pelota ---
    // Gravedad
    this.pelota.vy += GRAVEDAD * dt;

    // Fricción del aire
    this.pelota.vx *= FRICCION_AIRE;
    this.pelota.vy *= FRICCION_AIRE;

    // Mover
    this.pelota.x += this.pelota.vx * dt;
    this.pelota.y += this.pelota.vy * dt;

    // --- Rebote contra paredes laterales ---
    if (this.pelota.x - RADIO_PELOTA < CANCHA_X) {
      this.pelota.x = CANCHA_X + RADIO_PELOTA;
      this.pelota.vx = Math.abs(this.pelota.vx) * REBOTE_PARED;
      this._sfx.batuRebote();
    }
    if (this.pelota.x + RADIO_PELOTA > CANCHA_X + CANCHA_ANCHO) {
      this.pelota.x = CANCHA_X + CANCHA_ANCHO - RADIO_PELOTA;
      this.pelota.vx = -Math.abs(this.pelota.vx) * REBOTE_PARED;
      this._sfx.batuRebote();
    }

    // --- Rebote contra el techo ---
    if (this.pelota.y - RADIO_PELOTA < CANCHA_TECHO) {
      this.pelota.y = CANCHA_TECHO + RADIO_PELOTA;
      this.pelota.vy = Math.abs(this.pelota.vy) * REBOTE_PARED;
      this._sfx.batuRebote();
    }

    // --- Colisión con el jugador ---
    this._verificarGolpe(
      this.jugadorX, CANCHA_SUELO - JUGADOR_ALTO,
      JUGADOR_ANCHO, JUGADOR_ALTO,
      1  // Dirección: hacia la derecha
    );

    // --- Colisión con el rival ---
    this._verificarGolpe(
      this.rivalX, CANCHA_SUELO - JUGADOR_ALTO,
      JUGADOR_ANCHO, JUGADOR_ALTO,
      -1  // Dirección: hacia la izquierda
    );

    // --- Pelota toca el suelo → punto ---
    if (this.pelota.y + RADIO_PELOTA >= CANCHA_SUELO) {
      // ¿En qué lado cayó?
      if (this.pelota.x < LINEA_CENTRAL) {
        // Cayó en el lado del jugador → punto para el rival
        this.puntosRival++;
        this._saqueJugador = true;  // El que perdió el punto saca
      } else {
        // Cayó en el lado del rival → punto para el jugador
        this.puntosJugador++;
        this._saqueJugador = false;
      }

      this._sfx.batuPunto();
      this.pelota.y = CANCHA_SUELO - RADIO_PELOTA;
      this.pelota.vx = 0;
      this.pelota.vy = 0;

      // ¿Alguien ganó?
      if (this.puntosJugador >= PUNTOS_PARA_GANAR || this.puntosRival >= PUNTOS_PARA_GANAR) {
        this.fase = 'finJuego';
      } else {
        this.fase = 'punto';
      }
      this._tiempoFase = 0;
    }
  }

  // --- Verificar si la pelota golpea a un jugador ---
  _verificarGolpe(jx, jy, jAncho, jAlto, direccion) {
    const px = this.pelota.x;
    const py = this.pelota.y;

    // Verificar si la pelota está dentro del rectángulo del jugador (con margen)
    if (px + RADIO_PELOTA > jx - 5 && px - RADIO_PELOTA < jx + jAncho + 5 &&
        py + RADIO_PELOTA > jy - 5 && py - RADIO_PELOTA < jy + jAlto + 5) {

      // Determinar tipo de golpe según la altura relativa de la pelota
      const alturaRelativa = (py - jy) / jAlto;  // 0 = cabeza, 1 = pies

      let velocidadGolpe;
      let anguloGolpe;

      if (alturaRelativa < 0.25) {
        // Cabeza — golpe alto, medio poder
        velocidadGolpe = (VELOCIDAD_GOLPE_MIN + VELOCIDAD_GOLPE_MAX) / 2;
        anguloGolpe = -70 * (Math.PI / 180);  // Casi vertical
      } else if (alturaRelativa < 0.5) {
        // Hombro — golpe fuerte, ángulo de 60°
        velocidadGolpe = VELOCIDAD_GOLPE_MAX * 0.85;
        anguloGolpe = -60 * (Math.PI / 180);
      } else if (alturaRelativa < 0.75) {
        // Cadera/yugo — golpe más fuerte, ángulo de 45°
        velocidadGolpe = VELOCIDAD_GOLPE_MAX;
        anguloGolpe = -45 * (Math.PI / 180);
      } else {
        // Rodilla — golpe bajo, defensivo
        velocidadGolpe = VELOCIDAD_GOLPE_MIN;
        anguloGolpe = -30 * (Math.PI / 180);
      }

      // Aplicar velocidad con variación aleatoria significativa
      // Esto hace que los golpes sean impredecibles — a veces fuertes, a veces débiles
      const variacion = 0.75 + Math.random() * 0.5;  // ±25% de variación
      // El ángulo también varía ligeramente para trayectorias impredecibles
      const variacionAngulo = (Math.random() - 0.5) * 0.3;  // ±~8° de variación
      this.pelota.vx = Math.cos(anguloGolpe + variacionAngulo) * velocidadGolpe * direccion * variacion;
      this.pelota.vy = Math.sin(anguloGolpe + variacionAngulo) * velocidadGolpe * variacion;

      // Empujar la pelota fuera del jugador para evitar doble colisión
      this.pelota.x += direccion * (RADIO_PELOTA + 5);

      this._sfx.batuGolpe();
    }
  }

  // --- IA del rival (vencible, con errores realistas) ---
  _actualizarIA(dt) {
    // Retardo de reacción — no se mueve hasta que pasa el retardo
    if (this._iaRetardo > 0) {
      this._iaRetardo -= dt;
      return;
    }

    // Objetivo: ir hacia donde CREE que está la pelota (con imprecisión)
    let objetivo;
    if (this._iaErrorActivo) {
      // Cuando está en "modo error", se mueve de forma errática
      // y a veces se queda quieto o va en la dirección equivocada
      if (Math.random() < 0.08) {
        // Moverse al azar — falla de lectura de la pelota
        objetivo = this.rivalX + (Math.random() - 0.5) * 150;
      } else {
        // Quedarse quieto o ir lento hacia el centro
        objetivo = CANCHA_X + CANCHA_ANCHO * 0.75 - JUGADOR_ANCHO / 2;
      }
    } else {
      // Seguir la pelota, pero solo si está en su lado o acercándose
      if (this.pelota.x > LINEA_CENTRAL || this.pelota.vx > 0) {
        // Imprecisión: el rival no apunta exactamente a la pelota
        const error = (Math.random() - 0.5) * IA_IMPRECISION * 2;
        objetivo = this.pelota.x - JUGADOR_ANCHO / 2 + error;
      } else {
        // Pelota lejos, volver al centro de su zona (a veces se relaja)
        objetivo = CANCHA_X + CANCHA_ANCHO * 0.75 - JUGADOR_ANCHO / 2;
      }
    }

    // Moverse hacia el objetivo con velocidad limitada
    // La velocidad también varía un poco para hacerlo más humano
    const velocidadIA = VELOCIDAD_JUGADOR * IA_VELOCIDAD_FACTOR * (0.85 + Math.random() * 0.3);
    const diferencia = objetivo - this.rivalX;

    if (Math.abs(diferencia) > 5) {
      const direccionIA = diferencia > 0 ? 1 : -1;
      this.rivalX += direccionIA * velocidadIA * dt;
    }

    // Limitar al lado derecho de la cancha
    this.rivalX = Math.max(LINEA_CENTRAL + 5, Math.min(CANCHA_X + CANCHA_ANCHO - JUGADOR_ANCHO - 5, this.rivalX));
  }

  // --- Fase: Punto anotado (pausa breve) ---
  _actualizarPunto(dt, entrada) {
    if (this._tiempoFase > 1.5) {
      this.fase = 'educativo';
      this._tiempoFase = 0;
      this._bloqueoEntrada = true;
    }
  }

  // --- Fase: Dato educativo (entre puntos) ---
  _actualizarEducativo(dt, entrada) {
    if (this._tiempoFase > 0.5 && entrada.estaPresionada('accion') && !this._bloqueoEntrada) {
      this._indiceDatoEducativo = (this._indiceDatoEducativo + 1) % DATOS_EDUCATIVOS.length;
      this._resetearPelota();
      this.fase = 'saque';
      this._tiempoFase = 0;
      this._bloqueoEntrada = true;
    }
  }

  // --- Fase: Fin del juego ---
  _actualizarFin(dt, entrada) {
    if (this._tiempoFase > 2 && entrada.estaPresionada('accion') && !this._bloqueoEntrada) {
      this.enJuego = false;
      if (this._alTerminar) {
        this._alTerminar(this.puntosJugador >= PUNTOS_PARA_GANAR);
      }
    }
  }

  // ============================================================
  // DIBUJO
  // ============================================================
  dibujar(ctx, ancho, alto, textos) {
    if (!this.enJuego) return;

    ctx.save();

    // --- Fondo semi-transparente (overlay) ---
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, ancho, alto);

    // --- Cielo del batey ---
    const gradiente = ctx.createLinearGradient(0, 0, 0, CANCHA_SUELO);
    gradiente.addColorStop(0, '#1a3a5c');
    gradiente.addColorStop(1, '#3a7a9c');
    ctx.fillStyle = gradiente;
    ctx.fillRect(CANCHA_X - 10, CANCHA_TECHO - 20, CANCHA_ANCHO + 20, CANCHA_SUELO - CANCHA_TECHO + 30);

    // --- Espectadores (siluetas animadas al fondo) ---
    this._dibujarEspectadores(ctx);

    // --- Suelo de la cancha (tierra apisonada del batey) ---
    ctx.fillStyle = '#C8A84E';
    ctx.fillRect(CANCHA_X, CANCHA_SUELO, CANCHA_ANCHO, 50);

    // --- Bordes de piedra con petroglifos ---
    this._dibujarBordesPiedra(ctx);

    // --- Línea central ---
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(LINEA_CENTRAL, CANCHA_TECHO);
    ctx.lineTo(LINEA_CENTRAL, CANCHA_SUELO);
    ctx.stroke();
    ctx.setLineDash([]);

    // --- Cacique en su dujo (árbitro) ---
    this._dibujarCacique(ctx);

    // --- Pelota ---
    this._dibujarPelota(ctx);

    // --- Jugador (izquierda) ---
    this._dibujarPersonaje(ctx, this.jugadorX, CANCHA_SUELO - JUGADOR_ALTO, true);

    // --- Rival (derecha) ---
    this._dibujarPersonaje(ctx, this.rivalX, CANCHA_SUELO - JUGADOR_ALTO, false);

    // --- Marcador ---
    this._dibujarMarcador(ctx, ancho, textos);

    // --- Textos de fase ---
    switch (this.fase) {
      case 'intro':
        this._dibujarIntro(ctx, ancho, alto, textos);
        break;
      case 'saque':
        this._dibujarTextoSaque(ctx, ancho, textos);
        break;
      case 'punto':
        this._dibujarTextoPunto(ctx, ancho, textos);
        break;
      case 'educativo':
        this._dibujarDatoEducativo(ctx, ancho, alto, textos);
        break;
      case 'finJuego':
        this._dibujarFin(ctx, ancho, alto, textos);
        break;
    }

    // --- Controles (solo durante el juego) ---
    if (this.fase === 'jugando') {
      ctx.font = '11px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.textAlign = 'center';
      ctx.fillText(textos?.controles || '← → mover | Golpea con el cuerpo (cadera, hombro, cabeza, rodilla)',
        ancho / 2, alto - 15);
    }

    ctx.restore();
  }

  // --- Dibujar la pelota con efecto de movimiento ---
  _dibujarPelota(ctx) {
    const px = this.pelota.x;
    const py = this.pelota.y;

    // Estela de movimiento (motion blur)
    const velocidad = Math.sqrt(this.pelota.vx ** 2 + this.pelota.vy ** 2);
    if (velocidad > 100) {
      const longEstela = Math.min(velocidad / 20, 20);
      ctx.strokeStyle = 'rgba(200, 160, 80, 0.3)';
      ctx.lineWidth = RADIO_PELOTA * 1.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - this.pelota.vx * longEstela / velocidad,
                 py - this.pelota.vy * longEstela / velocidad);
      ctx.stroke();
    }

    // Sombra en el suelo
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    const sombra = Math.max(0.3, 1 - (CANCHA_SUELO - py) / 300);
    ctx.beginPath();
    ctx.ellipse(px, CANCHA_SUELO + 2, RADIO_PELOTA * sombra, 3 * sombra, 0, 0, Math.PI * 2);
    ctx.fill();

    // La pelota (marrón/gris como el látex de cupey)
    ctx.fillStyle = '#8B7355';
    ctx.beginPath();
    ctx.arc(px, py, RADIO_PELOTA, 0, Math.PI * 2);
    ctx.fill();

    // Brillo
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(px - 2, py - 2, RADIO_PELOTA * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Contorno
    ctx.strokeStyle = '#5a4a35';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(px, py, RADIO_PELOTA, 0, Math.PI * 2);
    ctx.stroke();
  }

  // --- Dibujar un personaje (jugador o rival) ---
  _dibujarPersonaje(ctx, x, y, esJugador) {
    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(x + JUGADOR_ANCHO / 2, CANCHA_SUELO + 2, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cuerpo (color diferente para distinguir)
    const colorCuerpo = esJugador ? '#4488DD' : '#CC6644';
    ctx.fillStyle = colorCuerpo;
    ctx.fillRect(x + 4, y + 12, 20, 16);

    // Cabeza
    ctx.fillStyle = '#C68642';
    ctx.fillRect(x + 6, y, 16, 14);

    // Pelo
    ctx.fillStyle = '#2a1a0a';
    ctx.fillRect(x + 5, y - 2, 18, 6);

    // Ojos (mirando hacia la pelota)
    ctx.fillStyle = '#FFFFFF';
    const ojoDx = esJugador ? 1 : -1;
    ctx.fillRect(x + 9 + ojoDx, y + 4, 3, 3);
    ctx.fillRect(x + 16 + ojoDx, y + 4, 3, 3);
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 10 + ojoDx, y + 5, 1.5, 1.5);
    ctx.fillRect(x + 17 + ojoDx, y + 5, 1.5, 1.5);

    // Yugo (cinturón de piedra/madera en la cadera) — elemento clave del batú
    ctx.fillStyle = '#6B3410';
    ctx.fillRect(x + 2, y + 22, 24, 6);
    // Decoración del yugo
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(x + 10, y + 23, 8, 4);

    // Piernas con animación sutil
    const anim = Math.sin(this._tiempoTotal * 3) * 2;
    ctx.fillStyle = '#5a4a30';
    ctx.fillRect(x + 6, y + 28 + anim, 7, 10);
    ctx.fillRect(x + 15, y + 28 - anim, 7, 10);

    // Pies
    ctx.fillStyle = '#3a2a10';
    ctx.fillRect(x + 5, y + 36 + anim, 8, 4);
    ctx.fillRect(x + 15, y + 36 - anim, 8, 4);

    // Etiqueta
    ctx.font = '9px monospace';
    ctx.fillStyle = esJugador ? '#88BBFF' : '#FFAA88';
    ctx.textAlign = 'center';
    const _uiTex = this.juego?.idiomas?.traducciones?.[this.juego?.idiomas?.idiomaActual]?.ui;
    ctx.fillText(esJugador ? (_uiTex?.tu || 'Tú') : (_uiTex?.rival || 'Rival'), x + JUGADOR_ANCHO / 2, y - 8);
  }

  // --- Bordes de piedra con petroglifos tallados ---
  _dibujarBordesPiedra(ctx) {
    // Borde izquierdo
    ctx.fillStyle = '#777777';
    ctx.fillRect(CANCHA_X - 10, CANCHA_TECHO - 10, 12, CANCHA_SUELO - CANCHA_TECHO + 60);

    // Borde derecho
    ctx.fillRect(CANCHA_X + CANCHA_ANCHO - 2, CANCHA_TECHO - 10, 12, CANCHA_SUELO - CANCHA_TECHO + 60);

    // Petroglifos simples tallados en las piedras
    ctx.fillStyle = '#999999';
    // Espirales en el borde izquierdo
    for (let i = 0; i < 4; i++) {
      const py = CANCHA_TECHO + 40 + i * 90;
      ctx.beginPath();
      ctx.arc(CANCHA_X - 4, py, 4, 0, Math.PI * 1.5);
      ctx.stroke();
    }
    // Caras en el borde derecho
    for (let i = 0; i < 4; i++) {
      const py = CANCHA_TECHO + 60 + i * 90;
      ctx.fillRect(CANCHA_X + CANCHA_ANCHO, py - 3, 6, 6);
      ctx.fillStyle = '#555555';
      ctx.fillRect(CANCHA_X + CANCHA_ANCHO + 1, py - 1, 1, 1);
      ctx.fillRect(CANCHA_X + CANCHA_ANCHO + 4, py - 1, 1, 1);
      ctx.fillStyle = '#999999';
    }
  }

  // --- Espectadores animados ---
  _dibujarEspectadores(ctx) {
    for (const esp of this._espectadores) {
      const bobeo = Math.sin(this._tiempoTotal * 2 + esp.fase) * 3;
      const y = CANCHA_SUELO + 30 + bobeo;

      // Silueta
      ctx.fillStyle = 'rgba(80, 60, 40, 0.7)';
      // Cabeza
      ctx.beginPath();
      ctx.arc(esp.x, y - 8, 5, 0, Math.PI * 2);
      ctx.fill();
      // Cuerpo
      ctx.fillRect(esp.x - 4, y - 3, 8, 12);
    }
  }

  // --- Cacique en su dujo (esquina derecha del suelo) ---
  _dibujarCacique(ctx) {
    const cx = CANCHA_X + CANCHA_ANCHO + 20;
    const cy = CANCHA_SUELO - 10;

    // Dujo (asiento)
    ctx.fillStyle = '#6B3410';
    ctx.fillRect(cx - 8, cy, 16, 6);
    ctx.fillRect(cx - 8, cy + 6, 4, 4);
    ctx.fillRect(cx + 4, cy + 6, 4, 4);

    // Cacique sentado
    ctx.fillStyle = '#C68642';
    ctx.fillRect(cx - 4, cy - 18, 12, 10);  // Cabeza
    ctx.fillStyle = '#DAA520';
    ctx.fillRect(cx - 5, cy - 8, 14, 10);   // Cuerpo (manto dorado)

    // Corona de plumas
    ctx.fillStyle = '#22AA22';
    ctx.fillRect(cx - 2, cy - 24, 2, 6);
    ctx.fillStyle = '#CC2222';
    ctx.fillRect(cx + 1, cy - 26, 2, 8);
    ctx.fillStyle = '#22AA22';
    ctx.fillRect(cx + 4, cy - 24, 2, 6);

    ctx.font = '8px monospace';
    ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText('Cacique', cx + 2, cy + 18);
  }

  // --- Marcador ---
  _dibujarMarcador(ctx, ancho, textos) {
    // Fondo del marcador
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(ancho / 2 - 80, 5, 160, 35);

    // Borde dorado
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.strokeRect(ancho / 2 - 80, 5, 160, 35);

    // Puntuación
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#88BBFF';
    ctx.fillText(this.puntosJugador, ancho / 2 - 30, 30);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('-', ancho / 2, 30);
    ctx.fillStyle = '#FFAA88';
    ctx.fillText(this.puntosRival, ancho / 2 + 30, 30);

    // Título
    ctx.font = '10px monospace';
    ctx.fillStyle = '#FFD700';
    ctx.fillText(textos?.titulo || 'BATÚ', ancho / 2, 15);
  }

  // --- Pantalla de introducción ---
  _dibujarIntro(ctx, ancho, alto, textos) {
    // Panel central
    ctx.fillStyle = 'rgba(20, 15, 10, 0.9)';
    ctx.fillRect(ancho / 2 - 280, alto / 2 - 120, 560, 240);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.strokeRect(ancho / 2 - 280, alto / 2 - 120, 560, 240);

    ctx.textAlign = 'center';

    // Título
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#FFD700';
    ctx.fillText(textos?.tituloIntro || '¡Juego de Batú!', ancho / 2, alto / 2 - 80);

    // Historia
    ctx.font = '13px monospace';
    ctx.fillStyle = '#DDDDDD';
    const lineas = this.historia === 'disputa'
      ? [
          textos?.introDisputa1 || 'Dos aldeas discuten por un territorio de pesca.',
          textos?.introDisputa2 || 'Los caciques han decidido resolver la disputa con un juego de batú.',
          textos?.introDisputa3 || '¡El ganador se queda con los derechos de pesca!'
        ]
      : [
          textos?.introCeremonia1 || '¡Es día de areíto! La aldea celebra con música y juegos.',
          textos?.introCeremonia2 || 'Higüemota te reta a un partido amistoso de batú.',
          textos?.introCeremonia3 || '¡Demuestra tu habilidad en el batey!'
        ];

    for (let i = 0; i < lineas.length; i++) {
      ctx.fillText(lineas[i], ancho / 2, alto / 2 - 40 + i * 22);
    }

    // Reglas
    ctx.font = '11px monospace';
    ctx.fillStyle = '#AAAAAA';
    ctx.fillText(textos?.reglas || 'Reglas: golpea la pelota con cadera, hombros o cabeza. ¡Sin manos ni pies!',
      ancho / 2, alto / 2 + 45);
    ctx.fillText(textos?.reglas2 || 'Primero en 5 puntos gana. La pelota no puede tocar el suelo de tu lado.',
      ancho / 2, alto / 2 + 65);

    // Continuar
    const parpadeo = Math.sin(this._tiempoTotal * 4) > 0 ? 1 : 0.4;
    ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
    ctx.fillText(textos?.continuar || '[E] Comenzar', ancho / 2, alto / 2 + 100);
  }

  // --- Texto de saque ---
  _dibujarTextoSaque(ctx, ancho, textos) {
    ctx.font = 'bold 16px monospace';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    const quien = this._saqueJugador
      ? (textos?.saqueJugador || '¡Tu saque!')
      : (textos?.saqueRival || '¡Saque del rival!');
    ctx.fillText(quien, ancho / 2, CANCHA_TECHO + 15);
  }

  // --- Texto de punto anotado ---
  _dibujarTextoPunto(ctx, ancho, textos) {
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';

    // Determinar quién anotó (el último punto lo anotó quien NO saca ahora)
    if (this._saqueJugador) {
      // El jugador saca → el rival anotó el último punto
      ctx.fillStyle = '#FF8866';
      ctx.fillText(textos?.puntoRival || '¡Punto para el rival!', ancho / 2, CANCHA_SUELO / 2);
    } else {
      ctx.fillStyle = '#66BBFF';
      ctx.fillText(textos?.puntoJugador || '¡Tu punto!', ancho / 2, CANCHA_SUELO / 2);
    }
  }

  // --- Dato educativo entre puntos ---
  _dibujarDatoEducativo(ctx, ancho, alto, textos) {
    // Panel
    ctx.fillStyle = 'rgba(20, 15, 10, 0.9)';
    ctx.fillRect(ancho / 2 - 300, alto / 2 - 60, 600, 120);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.strokeRect(ancho / 2 - 300, alto / 2 - 60, 600, 120);

    ctx.textAlign = 'center';

    // Icono
    ctx.font = 'bold 14px monospace';
    ctx.fillStyle = '#FFD700';
    ctx.fillText(textos?.sabiasQue || '¿Sabías que...?', ancho / 2, alto / 2 - 35);

    // Dato
    const clavesDato = DATOS_EDUCATIVOS[this._indiceDatoEducativo];
    const dato = textos?.[clavesDato] || this._datoFallback(this._indiceDatoEducativo);

    ctx.font = '12px monospace';
    ctx.fillStyle = '#DDDDDD';
    // Dividir el dato en líneas de ~70 caracteres
    const palabras = dato.split(' ');
    let linea = '';
    let lineaY = alto / 2 - 10;
    for (const palabra of palabras) {
      if ((linea + ' ' + palabra).length > 70) {
        ctx.fillText(linea, ancho / 2, lineaY);
        linea = palabra;
        lineaY += 18;
      } else {
        linea = linea ? linea + ' ' + palabra : palabra;
      }
    }
    ctx.fillText(linea, ancho / 2, lineaY);

    // Continuar
    const parpadeo = Math.sin(this._tiempoTotal * 4) > 0 ? 1 : 0.4;
    ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
    ctx.font = '11px monospace';
    ctx.fillText(textos?.continuar || '[E] Continuar', ancho / 2, alto / 2 + 48);
  }

  // --- Datos fallback si no hay traducciones ---
  _datoFallback(indice) {
    const datos = [
      'La pelota del batú se hacía con látex del árbol de cupey. Era muy elástica y del tamaño de una softball.',
      'Los bateyes (canchas) tenían petroglifos tallados en las piedras de los bordes. Eran lugares sagrados.',
      'El yugo era un cinturón de piedra o madera que se usaba para golpear la pelota con la cadera.',
      'El batú se jugaba durante las fiestas de areíto, junto con música, danza y comida.',
      'El batú servía para resolver disputas entre aldeas sin recurrir a la guerra. Diplomacia deportiva taína.',
      'Se han encontrado bateyes en Chacuey y La Aleta (RD), y en Tibes y Caguana (Puerto Rico).'
    ];
    return datos[indice] || datos[0];
  }

  // --- Pantalla final ---
  _dibujarFin(ctx, ancho, alto, textos) {
    ctx.fillStyle = 'rgba(20, 15, 10, 0.9)';
    ctx.fillRect(ancho / 2 - 280, alto / 2 - 80, 560, 160);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.strokeRect(ancho / 2 - 280, alto / 2 - 80, 560, 160);

    ctx.textAlign = 'center';

    const gano = this.puntosJugador >= PUNTOS_PARA_GANAR;

    ctx.font = 'bold 22px monospace';
    ctx.fillStyle = gano ? '#66FFAA' : '#FF8866';
    ctx.fillText(gano
      ? (textos?.victoria || '¡Victoria!')
      : (textos?.derrota || '¡Derrota!'),
      ancho / 2, alto / 2 - 40);

    ctx.font = '13px monospace';
    ctx.fillStyle = '#DDDDDD';
    const mensajeFin = gano
      ? (this.historia === 'disputa'
          ? (textos?.victoriaDisputa || '¡Tu aldea gana los derechos de pesca! El batú resolvió el conflicto sin violencia.')
          : (textos?.victoriaCeremonia || '¡Gran partido! Higüemota te felicita. El areíto continúa con más fuerza.'))
      : (this.historia === 'disputa'
          ? (textos?.derrotaDisputa || 'La otra aldea gana. Pero el batú evitó un conflicto violento.')
          : (textos?.derrotaCeremonia || 'Higüemota gana esta vez. ¡Pero lo importante es la celebración!'));

    // Dividir mensaje largo
    const palabras = mensajeFin.split(' ');
    let linea = '';
    let lineaY = alto / 2 - 10;
    for (const palabra of palabras) {
      if ((linea + ' ' + palabra).length > 65) {
        ctx.fillText(linea, ancho / 2, lineaY);
        linea = palabra;
        lineaY += 20;
      } else {
        linea = linea ? linea + ' ' + palabra : palabra;
      }
    }
    ctx.fillText(linea, ancho / 2, lineaY);

    // Continuar
    if (this._tiempoFase > 2) {
      const parpadeo = Math.sin(this._tiempoTotal * 4) > 0 ? 1 : 0.4;
      ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
      ctx.font = '11px monospace';
      ctx.fillText(textos?.continuar || '[E] Continuar', ancho / 2, alto / 2 + 60);
    }
  }
}
