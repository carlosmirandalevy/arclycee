// ============================================================
// CALIBRACION-SENAL.JS - Mini-juego "Good Vibrations"
// ============================================================
// El jugador calibra un magnetómetro ajustando 3 perillas
// (frecuencia, amplitud, fase) para que la onda generada
// coincida con la onda objetivo en un osciloscopio.
//
// Se accede desde el LFSD hablando con Leonardo cuando se tiene
// el magnetómetro en el inventario y la misión descubierta.
// ============================================================

import { SonidoProcedural } from '../motor/sonido-procedural.js';

export class CalibracionSenal {

  constructor() {
    this.enJuego = false;
    this.fase = 'intro'; // 'intro' → 'calibrando' → 'resultado'
    this._bloqueoEntrada = true;
    this._alTerminar = null;
    this.sfx = new SonidoProcedural();

    // 3 perillas: frecuencia (0-100), amplitud (0-100), fase (0-100)
    this._perillas = [50, 50, 50];
    // Valores objetivo (randomizados al iniciar)
    this._objetivo = [50, 50, 50];
    // Perilla activa (0, 1, 2)
    this._perillaActiva = 0;

    // Timer (45 segundos)
    this._tiempoRestante = 45;

    // Resultado: 'exito' o 'fallo'
    this._resultado = null;

    // Tiempo total para animaciones
    this._tiempoTotal = 0;
  }

  iniciar(config) {
    this.enJuego = true;
    this.fase = 'intro';
    this._bloqueoEntrada = true;
    this._alTerminar = config?.alTerminar || null;
    this._resultado = null;
    this._tiempoTotal = 0;
    this._tiempoRestante = 45;
    this._perillaActiva = 0;

    // Generar objetivo aleatorio (evitar extremos para que no sea trivial)
    this._objetivo = [
      20 + Math.floor(Math.random() * 60),
      20 + Math.floor(Math.random() * 60),
      20 + Math.floor(Math.random() * 60)
    ];
    // Empezar las perillas lejos del objetivo
    this._perillas = [
      (this._objetivo[0] + 40) % 100,
      (this._objetivo[1] + 40) % 100,
      (this._objetivo[2] + 40) % 100
    ];
  }

  actualizar(dt, entrada) {
    if (!this.enJuego) return;
    this._tiempoTotal += dt;

    // --- Bloqueo de entrada ---
    if (this._bloqueoEntrada) {
      if (!entrada.estaPresionada('accion') && !entrada.estaPresionada('cancelar')) {
        this._bloqueoEntrada = false;
      }
      return;
    }

    // --- FASE: intro ---
    if (this.fase === 'intro') {
      if (entrada.estaPresionada('accion')) {
        this.fase = 'calibrando';
        this._bloqueoEntrada = true;
      }
      return;
    }

    // --- FASE: resultado ---
    if (this.fase === 'resultado') {
      if (entrada.estaPresionada('accion')) {
        this.enJuego = false;
        if (this._alTerminar) this._alTerminar(this._resultado);
      }
      return;
    }

    // --- FASE: calibrando ---
    this._tiempoRestante -= dt;

    // Tiempo agotado
    if (this._tiempoRestante <= 0) {
      this._tiempoRestante = 0;
      this._resultado = 'fallo';
      this.fase = 'resultado';
      this._bloqueoEntrada = true;
      return;
    }

    // Cambiar perilla con ↑ ↓
    if (entrada.estaPresionada('arriba')) {
      this._perillaActiva = (this._perillaActiva + 2) % 3; // anterior
      this._bloqueoEntrada = true;
      return;
    }
    if (entrada.estaPresionada('abajo')) {
      this._perillaActiva = (this._perillaActiva + 1) % 3; // siguiente
      this._bloqueoEntrada = true;
      return;
    }

    // Ajustar perilla con ← →
    if (entrada.estaPresionada('izquierda')) {
      this._perillas[this._perillaActiva] = Math.max(0, this._perillas[this._perillaActiva] - 2);
      this._bloqueoEntrada = true;
    }
    if (entrada.estaPresionada('derecha')) {
      this._perillas[this._perillaActiva] = Math.min(100, this._perillas[this._perillaActiva] + 2);
      this._bloqueoEntrada = true;
    }

    // Verificar si los 3 parámetros están dentro de la tolerancia (15%)
    if (entrada.estaPresionada('accion')) {
      const dentroTolerancia = this._perillas.every((val, i) =>
        Math.abs(val - this._objetivo[i]) <= 15
      );
      if (dentroTolerancia) {
        this._resultado = 'exito';
        this.fase = 'resultado';
        this._bloqueoEntrada = true;
      } else {
        // Flash de error — solo bloquear para evitar spam
        this._bloqueoEntrada = true;
      }
    }
  }

  // Obtiene el bloque de textos de UI para fallbacks de mini-juego
  _obtenerTextos(textos) {
    return textos?.ui || {};
  }

  dibujar(ctx, ancho, alto, textos) {
    if (!this.enJuego) return;
    const cal = textos?.calibracion || {};
    const ui = this._obtenerTextos(textos);

    // --- Fondo: osciloscopio (verde sobre negro) ---
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, ancho, alto);

    // Borde del osciloscopio
    ctx.strokeStyle = '#1a3a1a';
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, ancho - 60, 280);

    // Grilla del osciloscopio
    ctx.strokeStyle = 'rgba(0, 100, 0, 0.2)';
    ctx.lineWidth = 1;
    for (let x = 30; x < ancho - 30; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 30);
      ctx.lineTo(x, 310);
      ctx.stroke();
    }
    for (let y = 30; y < 310; y += 40) {
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(ancho - 30, y);
      ctx.stroke();
    }

    // --- FASE: intro ---
    if (this.fase === 'intro') {
      ctx.fillStyle = '#00FF00';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(cal.titulo || ui.calibracionTitulo || 'Calibración de Señal', ancho / 2, 120);

      ctx.fillStyle = '#00CC00';
      ctx.font = '14px monospace';
      ctx.fillText(cal.intro1 || ui.calibracionDesc1 || 'Ajusta las 3 perillas para que la onda coincida', ancho / 2, 180);
      ctx.fillText(cal.intro2 || ui.calibracionDesc2 || 'con la señal objetivo (línea punteada).', ancho / 2, 200);
      ctx.fillText(cal.intro3 || ui.calibracionInstrucciones || '↑↓: cambiar perilla | ←→: ajustar | E: confirmar', ancho / 2, 240);

      ctx.fillStyle = `rgba(0, 255, 0, ${0.5 + Math.sin(this._tiempoTotal * 3) * 0.3})`;
      ctx.fillText('[E] ' + (cal.comenzar || ui.comenzar || 'Comenzar'), ancho / 2, 300);

      ctx.textAlign = 'left';
      return;
    }

    // --- FASE: resultado ---
    if (this.fase === 'resultado') {
      const esExito = this._resultado === 'exito';
      ctx.fillStyle = esExito ? '#00FF00' : '#FF4444';
      ctx.font = 'bold 28px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(
        esExito ? (cal.exito || '¡Calibración exitosa!') : (cal.fallo || ui.tiempoAgotado || 'Tiempo agotado...'),
        ancho / 2, 170
      );

      ctx.fillStyle = '#AAAAAA';
      ctx.font = '14px monospace';
      ctx.fillText('[E] ' + (cal.continuar || ui.continuar || 'Continuar'), ancho / 2, 230);
      ctx.textAlign = 'left';
      return;
    }

    // --- FASE: calibrando ---

    // Dibujar onda objetivo (punteada, verde oscuro)
    ctx.strokeStyle = '#005500';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    this._dibujarOnda(ctx, ancho, 170, this._objetivo);
    ctx.setLineDash([]);

    // Dibujar onda actual (sólida, verde brillante)
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 2;
    this._dibujarOnda(ctx, ancho, 170, this._perillas);

    // --- Barra de tiempo ---
    const tiempoFraccion = this._tiempoRestante / 45;
    const colorTiempo = this._tiempoRestante < 10 ? '#FF4444' : '#00FF00';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(30, 15, ancho - 60, 10);
    ctx.fillStyle = colorTiempo;
    ctx.fillRect(30, 15, (ancho - 60) * tiempoFraccion, 10);

    // Tiempo restante en texto
    ctx.fillStyle = colorTiempo;
    ctx.font = '11px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.ceil(this._tiempoRestante)}s`, ancho - 35, 13);

    // --- Perillas (abajo de la pantalla) ---
    const nombresPerillas = [
      cal.frecuencia || 'Frecuencia',
      cal.amplitud || 'Amplitud',
      cal.fase || 'Fase'
    ];

    for (let i = 0; i < 3; i++) {
      const px = 100 + i * 280;
      const py = 380;
      const esActiva = i === this._perillaActiva;

      // Nombre de la perilla
      ctx.fillStyle = esActiva ? '#00FF00' : '#006600';
      ctx.font = esActiva ? 'bold 13px monospace' : '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(nombresPerillas[i], px + 40, py - 10);

      // Perilla (círculo con indicador)
      ctx.strokeStyle = esActiva ? '#00FF00' : '#004400';
      ctx.lineWidth = esActiva ? 3 : 2;
      ctx.beginPath();
      ctx.arc(px + 40, py + 30, 25, 0, Math.PI * 2);
      ctx.stroke();

      // Indicador de posición en la perilla
      const angulo = (this._perillas[i] / 100) * Math.PI * 1.5 - Math.PI * 0.75;
      const indX = px + 40 + Math.cos(angulo) * 20;
      const indY = py + 30 + Math.sin(angulo) * 20;
      ctx.fillStyle = esActiva ? '#00FF00' : '#006600';
      ctx.beginPath();
      ctx.arc(indX, indY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Valor numérico
      ctx.font = '11px monospace';
      ctx.fillText(this._perillas[i], px + 40, py + 65);

      // Flecha de selección
      if (esActiva) {
        ctx.fillText('▸', px - 5, py + 33);
      }
    }

    // Indicador de tolerancia
    ctx.fillStyle = '#006600';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(cal.tolerancia || ui.calibracionTolerancia || 'Tolerancia: ±15% | E: confirmar calibración', ancho / 2, alto - 30);

    // Indicación de qué tan cerca está cada perilla
    for (let i = 0; i < 3; i++) {
      const diff = Math.abs(this._perillas[i] - this._objetivo[i]);
      const px = 100 + i * 280 + 40;
      if (diff <= 15) {
        ctx.fillStyle = '#00FF00';
        ctx.fillText('✓', px, 345);
      } else if (diff <= 30) {
        ctx.fillStyle = '#FFFF00';
        ctx.fillText('~', px, 345);
      } else {
        ctx.fillStyle = '#FF4444';
        ctx.fillText('✗', px, 345);
      }
    }

    ctx.textAlign = 'left';
  }

  // --- Dibujar una onda sinusoidal basada en los 3 parámetros ---
  _dibujarOnda(ctx, ancho, centroY, params) {
    const freq = params[0] / 20;    // 0-5 ciclos
    const amp = params[1] * 0.8;    // 0-80 píxeles
    const fase = params[2] / 16;    // 0-6.28 radianes

    ctx.beginPath();
    for (let x = 40; x < ancho - 40; x++) {
      const t = (x - 40) / (ancho - 80) * Math.PI * 2 * freq;
      const y = centroY + Math.sin(t + fase) * amp;
      if (x === 40) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}
