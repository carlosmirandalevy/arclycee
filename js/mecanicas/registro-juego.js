// ============================================================
// REGISTRO-JUEGO.JS - Diario de misiones del jugador
// ============================================================
// El registro es un panel que el jugador abre con L para ver
// sus misiones principales y secundarias. Funciona como un
// diario que se va llenando a medida que avanza en el juego.
//
// Tiene dos pestañas: "Principal" (historia principal) y
// "Secundaria" (sidequests como las del LFSD).
// Se puede hacer scroll con ↑↓ cuando hay muchas entradas.
// ============================================================

export class RegistroJuego {

  constructor() {
    // Lista de entradas del registro
    // Cada entrada: { tipo, titulo, descripcion, completada }
    this.entradas = [];

    // Si el registro está visible en pantalla
    this.visible = false;

    // Pestaña activa: 'principal' o 'secundaria'
    this.seccionActiva = 'principal';

    // Posición de scroll dentro de la sección activa
    this.scrollY = 0;

    // Bloqueo de entrada para evitar inputs repetidos
    this._bloqueoEntrada = true;
  }

  // --- Agregar una nueva entrada al registro ---
  agregarEntrada(tipo, titulo, descripcion) {
    // Evitar duplicados
    if (this.entradas.some(e => e.titulo === titulo)) return;

    this.entradas.push({
      tipo,        // 'principal' o 'secundaria'
      titulo,
      descripcion,
      completada: false
    });
  }

  // --- Marcar una entrada como completada ---
  marcarCompletada(titulo) {
    const entrada = this.entradas.find(e => e.titulo === titulo);
    if (entrada) {
      entrada.completada = true;
    }
  }

  // --- Manejar la entrada del jugador dentro del registro ---
  manejarEntrada(entrada) {
    if (this._bloqueoEntrada) {
      if (!entrada.estaPresionada('arriba') &&
          !entrada.estaPresionada('abajo') &&
          !entrada.estaPresionada('izquierda') &&
          !entrada.estaPresionada('derecha') &&
          !entrada.estaPresionada('cancelar')) {
        this._bloqueoEntrada = false;
      }
      return;
    }

    // Cambiar pestaña con ← →
    if (entrada.estaPresionada('izquierda') || entrada.estaPresionada('derecha')) {
      this.seccionActiva = this.seccionActiva === 'principal' ? 'secundaria' : 'principal';
      this.scrollY = 0;
      this._bloqueoEntrada = true;
    }

    // Scroll con ↑ ↓
    if (entrada.estaPresionada('arriba')) {
      this.scrollY = Math.max(0, this.scrollY - 1);
      this._bloqueoEntrada = true;
    }
    if (entrada.estaPresionada('abajo')) {
      this.scrollY++;
      this._bloqueoEntrada = true;
    }

    // Cerrar con Q/Esc
    if (entrada.estaPresionada('cancelar')) {
      this.visible = false;
      this._bloqueoEntrada = true;
    }
  }

  // --- Dibujar el panel del registro ---
  dibujar(ctx, ancho, alto, textos) {
    const reg = textos?.registro || {};

    // Fondo semitransparente
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(40, 30, ancho - 80, alto - 60);

    // Borde dorado
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 30, ancho - 80, alto - 60);

    // Título
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(reg.titulo || 'Registro de Misiones', ancho / 2, 65);

    // --- Pestañas ---
    const tabY = 85;
    const tabAncho = 180;

    // Pestaña Principal
    const esPrincipal = this.seccionActiva === 'principal';
    ctx.fillStyle = esPrincipal ? 'rgba(255, 215, 0, 0.2)' : 'rgba(100, 100, 100, 0.2)';
    ctx.fillRect(ancho / 2 - tabAncho - 10, tabY, tabAncho, 28);
    ctx.strokeStyle = esPrincipal ? '#FFD700' : '#666666';
    ctx.lineWidth = 1;
    ctx.strokeRect(ancho / 2 - tabAncho - 10, tabY, tabAncho, 28);
    ctx.fillStyle = esPrincipal ? '#FFD700' : '#AAAAAA';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(reg.principal || 'Historia Principal', ancho / 2 - tabAncho / 2 - 10, tabY + 19);

    // Pestaña Secundaria
    const esSecundaria = !esPrincipal;
    ctx.fillStyle = esSecundaria ? 'rgba(255, 215, 0, 0.2)' : 'rgba(100, 100, 100, 0.2)';
    ctx.fillRect(ancho / 2 + 10, tabY, tabAncho, 28);
    ctx.strokeStyle = esSecundaria ? '#FFD700' : '#666666';
    ctx.strokeRect(ancho / 2 + 10, tabY, tabAncho, 28);
    ctx.fillStyle = esSecundaria ? '#FFD700' : '#AAAAAA';
    ctx.fillText(reg.secundaria || 'Misiones Secundarias', ancho / 2 + tabAncho / 2 + 10, tabY + 19);

    // --- Entradas de la sección activa ---
    const entradasFiltradas = this.entradas.filter(e => e.tipo === this.seccionActiva);

    // Limitar scroll
    const maxScroll = Math.max(0, entradasFiltradas.length - 7);
    this.scrollY = Math.min(this.scrollY, maxScroll);

    const inicioY = 130;
    const altoEntrada = 50;

    if (entradasFiltradas.length === 0) {
      ctx.fillStyle = '#888888';
      ctx.font = '14px monospace';
      ctx.fillText(reg.vacio || 'No hay misiones registradas', ancho / 2, inicioY + 40);
    }

    for (let i = this.scrollY; i < Math.min(entradasFiltradas.length, this.scrollY + 7); i++) {
      const entrada = entradasFiltradas[i];
      const y = inicioY + (i - this.scrollY) * altoEntrada;

      // Fondo de entrada
      ctx.fillStyle = entrada.completada ? 'rgba(68, 170, 68, 0.1)' : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(60, y, ancho - 120, altoEntrada - 5);

      // Checkmark o bullet
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'left';
      ctx.fillStyle = entrada.completada ? '#44AA44' : '#FFD700';
      ctx.fillText(entrada.completada ? '✓' : '▸', 70, y + 18);

      // Título
      ctx.fillStyle = entrada.completada ? '#88CC88' : '#FFFFFF';
      ctx.font = 'bold 13px monospace';
      ctx.fillText(entrada.titulo, 90, y + 18);

      // Descripción
      ctx.fillStyle = '#AAAAAA';
      ctx.font = '11px monospace';
      // Truncar si es muy largo
      const desc = entrada.descripcion.length > 80
        ? entrada.descripcion.substring(0, 77) + '...'
        : entrada.descripcion;
      ctx.fillText(desc, 90, y + 36);
    }

    // --- Controles ---
    ctx.fillStyle = '#888888';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('← → cambiar pestaña | ↑ ↓ scroll | Q cerrar', ancho / 2, alto - 45);

    ctx.textAlign = 'left';
  }
}
