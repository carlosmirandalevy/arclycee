// ============================================================
// CONEXION-CABLES.JS - Mini-juego "Weird Science"
// ============================================================
// El jugador conecta 6 cables coloreados del lado izquierdo
// al lado derecho, emparejando colores y símbolos.
//
// Se accede desde el LFSD hablando con Lucas.
// Al completar, el jugador recibe un periódico coleccionable
// y puntos de reputación (bonus si lo hace en <15 segundos).
// ============================================================

import { SonidoProcedural } from '../motor/sonido-procedural.js';

// Colores y símbolos de los 6 cables
const CABLES = [
  { color: '#FF4444', simbolo: '⚡', nombre: 'Rojo' },
  { color: '#44FF44', simbolo: '◆', nombre: 'Verde' },
  { color: '#4444FF', simbolo: '★', nombre: 'Azul' },
  { color: '#FFFF44', simbolo: '●', nombre: 'Amarillo' },
  { color: '#FF44FF', simbolo: '▲', nombre: 'Magenta' },
  { color: '#44FFFF', simbolo: '■', nombre: 'Cian' }
];

export class ConexionCables {

  constructor() {
    this.enJuego = false;
    this.fase = 'intro';  // 'intro' → 'conectando' → 'resultado'
    this._bloqueoEntrada = true;
    this._alTerminar = null;
    this.sfx = new SonidoProcedural();

    // Orden aleatorio de las salidas (derecha)
    this._ordenSalidas = [];

    // Conexiones hechas: array de { entrada: idx, salida: idx }
    this._conexiones = [];

    // Selección actual
    this._ladoActivo = 'entrada'; // 'entrada' o 'salida'
    this._indiceEntrada = 0;
    this._indiceSalida = 0;
    this._entradaSeleccionada = -1; // -1 = ninguna seleccionada

    // Timer (30 segundos)
    this._tiempoRestante = 30;
    this._tiempoInicio = 0;

    // Resultado
    this._resultado = null;
    this._tiempoTotal = 0;
    this._tiempoCompletado = 0;

    // Animación de chispa en error
    this._chispa = null;
  }

  iniciar(config) {
    this.enJuego = true;
    this.fase = 'intro';
    this._bloqueoEntrada = true;
    this._alTerminar = config?.alTerminar || null;
    this._resultado = null;
    this._tiempoTotal = 0;
    this._tiempoRestante = 30;
    this._conexiones = [];
    this._indiceEntrada = 0;
    this._indiceSalida = 0;
    this._entradaSeleccionada = -1;
    this._ladoActivo = 'entrada';
    this._chispa = null;
    this._tiempoCompletado = 0;

    // Barajar el orden de las salidas
    this._ordenSalidas = [0, 1, 2, 3, 4, 5];
    for (let i = this._ordenSalidas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._ordenSalidas[i], this._ordenSalidas[j]] = [this._ordenSalidas[j], this._ordenSalidas[i]];
    }
  }

  actualizar(dt, entrada) {
    if (!this.enJuego) return;
    this._tiempoTotal += dt;

    // Actualizar chispa
    if (this._chispa) {
      this._chispa.tiempo -= dt;
      if (this._chispa.tiempo <= 0) this._chispa = null;
    }

    // Bloqueo de entrada
    if (this._bloqueoEntrada) {
      if (!entrada.estaPresionada('accion') &&
          !entrada.estaPresionada('cancelar') &&
          !entrada.estaPresionada('arriba') &&
          !entrada.estaPresionada('abajo')) {
        this._bloqueoEntrada = false;
      }
      return;
    }

    // --- FASE: intro ---
    if (this.fase === 'intro') {
      if (entrada.estaPresionada('accion')) {
        this.fase = 'conectando';
        this._tiempoInicio = this._tiempoTotal;
        this._bloqueoEntrada = true;
      }
      return;
    }

    // --- FASE: resultado ---
    if (this.fase === 'resultado') {
      if (entrada.estaPresionada('accion')) {
        this.enJuego = false;
        if (this._alTerminar) this._alTerminar(this._resultado, this._tiempoCompletado);
      }
      return;
    }

    // --- FASE: conectando ---
    this._tiempoRestante -= dt;
    if (this._tiempoRestante <= 0) {
      this._tiempoRestante = 0;
      this._resultado = 'fallo';
      this.fase = 'resultado';
      this._bloqueoEntrada = true;
      return;
    }

    // Navegar con ↑↓
    if (entrada.estaPresionada('arriba')) {
      if (this._entradaSeleccionada === -1) {
        this._indiceEntrada = (this._indiceEntrada + 5) % 6;
      } else {
        this._indiceSalida = (this._indiceSalida + 5) % 6;
      }
      this._bloqueoEntrada = true;
    }
    if (entrada.estaPresionada('abajo')) {
      if (this._entradaSeleccionada === -1) {
        this._indiceEntrada = (this._indiceEntrada + 1) % 6;
      } else {
        this._indiceSalida = (this._indiceSalida + 1) % 6;
      }
      this._bloqueoEntrada = true;
    }

    // Seleccionar/conectar con E
    if (entrada.estaPresionada('accion')) {
      if (this._entradaSeleccionada === -1) {
        // Verificar que esta entrada no esté ya conectada
        const yaConectada = this._conexiones.some(c => c.entrada === this._indiceEntrada);
        if (!yaConectada) {
          this._entradaSeleccionada = this._indiceEntrada;
          this._indiceSalida = 0;
        }
      } else {
        // Verificar que esta salida no esté ya conectada
        const salidaYaConectada = this._conexiones.some(c => c.salida === this._indiceSalida);
        if (!salidaYaConectada) {
          // Verificar si es la conexión correcta
          const entradaCable = this._entradaSeleccionada;
          const salidaCable = this._ordenSalidas[this._indiceSalida];

          if (entradaCable === salidaCable) {
            // Conexión correcta
            this._conexiones.push({
              entrada: this._entradaSeleccionada,
              salida: this._indiceSalida
            });

            // Verificar si completó todas
            if (this._conexiones.length === 6) {
              this._resultado = 'exito';
              this._tiempoCompletado = this._tiempoTotal - this._tiempoInicio;
              this.fase = 'resultado';
            }
          } else {
            // Conexión incorrecta — chispa
            this._chispa = {
              x: 480 + 30,
              y: 100 + this._indiceSalida * 65 + 20,
              tiempo: 0.5
            };
          }
          this._entradaSeleccionada = -1;
        }
      }
      this._bloqueoEntrada = true;
    }

    // Cancelar selección con Q
    if (entrada.estaPresionada('cancelar') && this._entradaSeleccionada !== -1) {
      this._entradaSeleccionada = -1;
      this._bloqueoEntrada = true;
    }
  }

  dibujar(ctx, ancho, alto, textos) {
    if (!this.enJuego) return;
    const con = textos?.conexion || {};

    // Fondo: circuito impreso (verde oscuro con trazas)
    ctx.fillStyle = '#0a2a0a';
    ctx.fillRect(0, 0, ancho, alto);

    // Trazas decorativas
    ctx.strokeStyle = 'rgba(0, 80, 0, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      const y = 30 + i * 25;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(ancho, y + (i % 2 === 0 ? 10 : -10));
      ctx.stroke();
    }

    // --- FASE: intro ---
    if (this.fase === 'intro') {
      ctx.fillStyle = '#44FF44';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(con.titulo || 'Conexión de Cables', ancho / 2, 120);

      ctx.fillStyle = '#88FF88';
      ctx.font = '14px monospace';
      ctx.fillText(con.intro1 || 'Conecta cada cable con su par correcto.', ancho / 2, 180);
      ctx.fillText(con.intro2 || 'Empareja colores y símbolos.', ancho / 2, 200);
      ctx.fillText(con.intro3 || '↑↓: navegar | E: seleccionar/conectar | Q: cancelar', ancho / 2, 240);

      ctx.fillStyle = `rgba(68, 255, 68, ${0.5 + Math.sin(this._tiempoTotal * 3) * 0.3})`;
      ctx.fillText('[E] ' + (con.comenzar || 'Comenzar'), ancho / 2, 300);
      ctx.textAlign = 'left';
      return;
    }

    // --- FASE: resultado ---
    if (this.fase === 'resultado') {
      const esExito = this._resultado === 'exito';
      ctx.fillStyle = esExito ? '#44FF44' : '#FF4444';
      ctx.font = 'bold 28px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(
        esExito ? (con.exito || '¡Circuito completo!') : (con.fallo || 'Tiempo agotado...'),
        ancho / 2, 150
      );

      if (esExito && this._tiempoCompletado < 15) {
        ctx.fillStyle = '#FFD700';
        ctx.font = '16px monospace';
        ctx.fillText(con.bonus || '¡Bonus de velocidad! +5 reputación extra', ancho / 2, 190);
      }

      ctx.fillStyle = '#AAAAAA';
      ctx.font = '14px monospace';
      ctx.fillText('[E] ' + (con.continuar || 'Continuar'), ancho / 2, 240);
      ctx.textAlign = 'left';
      return;
    }

    // --- FASE: conectando ---

    // Timer
    const tiempoFraccion = this._tiempoRestante / 30;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(30, 10, ancho - 60, 8);
    ctx.fillStyle = this._tiempoRestante < 10 ? '#FF4444' : '#44FF44';
    ctx.fillRect(30, 10, (ancho - 60) * tiempoFraccion, 8);

    // --- Entradas (izquierda) ---
    const entradaX = 120;
    const salidaX = 720;
    const inicioY = 80;
    const espaciado = 65;

    for (let i = 0; i < 6; i++) {
      const cable = CABLES[i];
      const y = inicioY + i * espaciado;
      const yaConectado = this._conexiones.some(c => c.entrada === i);
      const esSeleccionado = this._entradaSeleccionada === i;
      const esCursor = this._entradaSeleccionada === -1 && this._indiceEntrada === i;

      // Puerto
      ctx.fillStyle = yaConectado ? 'rgba(100, 100, 100, 0.5)' : cable.color;
      ctx.fillRect(entradaX, y, 60, 40);
      ctx.strokeStyle = esCursor || esSeleccionado ? '#FFFFFF' : '#333333';
      ctx.lineWidth = esCursor || esSeleccionado ? 3 : 1;
      ctx.strokeRect(entradaX, y, 60, 40);

      // Símbolo
      ctx.fillStyle = yaConectado ? '#666666' : '#FFFFFF';
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(cable.simbolo, entradaX + 30, y + 28);

      // Flecha de selección
      if (esCursor && !yaConectado) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 14px monospace';
        ctx.fillText('▸', entradaX - 20, y + 26);
      }
    }

    // --- Salidas (derecha) ---
    for (let i = 0; i < 6; i++) {
      const cableOriginal = CABLES[this._ordenSalidas[i]];
      const y = inicioY + i * espaciado;
      const yaConectado = this._conexiones.some(c => c.salida === i);
      const esCursor = this._entradaSeleccionada !== -1 && this._indiceSalida === i;

      // Puerto
      ctx.fillStyle = yaConectado ? 'rgba(100, 100, 100, 0.5)' : cableOriginal.color;
      ctx.fillRect(salidaX, y, 60, 40);
      ctx.strokeStyle = esCursor ? '#FFFFFF' : '#333333';
      ctx.lineWidth = esCursor ? 3 : 1;
      ctx.strokeRect(salidaX, y, 60, 40);

      // Símbolo
      ctx.fillStyle = yaConectado ? '#666666' : '#FFFFFF';
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(cableOriginal.simbolo, salidaX + 30, y + 28);

      // Flecha de selección
      if (esCursor && !yaConectado) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 14px monospace';
        ctx.fillText('◂', salidaX + 80, y + 26);
      }
    }

    // --- Cables conectados (curvas Bezier) ---
    for (const conn of this._conexiones) {
      const cable = CABLES[conn.entrada];
      const yEnt = inicioY + conn.entrada * espaciado + 20;
      const ySal = inicioY + conn.salida * espaciado + 20;

      ctx.strokeStyle = cable.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(entradaX + 60, yEnt);
      ctx.bezierCurveTo(
        entradaX + 200, yEnt,
        salidaX - 140, ySal,
        salidaX, ySal
      );
      ctx.stroke();
    }

    // --- Cable en progreso (desde entrada seleccionada) ---
    if (this._entradaSeleccionada !== -1) {
      const cable = CABLES[this._entradaSeleccionada];
      const yEnt = inicioY + this._entradaSeleccionada * espaciado + 20;
      const ySal = inicioY + this._indiceSalida * espaciado + 20;

      ctx.strokeStyle = cable.color;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(entradaX + 60, yEnt);
      ctx.bezierCurveTo(
        entradaX + 200, yEnt,
        salidaX - 140, ySal,
        salidaX, ySal
      );
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // --- Chispa de error ---
    if (this._chispa) {
      const intensidad = this._chispa.tiempo / 0.5;
      ctx.fillStyle = `rgba(255, 255, 0, ${intensidad})`;
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2 + this._tiempoTotal * 10;
        const dist = 10 + Math.random() * 15;
        ctx.beginPath();
        ctx.arc(
          this._chispa.x + Math.cos(ang) * dist,
          this._chispa.y + Math.sin(ang) * dist,
          2 + Math.random() * 3, 0, Math.PI * 2
        );
        ctx.fill();
      }
    }

    // Contador de conexiones
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${this._conexiones.length}/6`, ancho / 2, 50);

    // Controles
    ctx.fillStyle = '#666666';
    ctx.font = '11px monospace';
    ctx.fillText(con.controles || '↑↓: navegar | E: seleccionar/conectar | Q: cancelar', ancho / 2, alto - 20);
    ctx.textAlign = 'left';
  }
}
