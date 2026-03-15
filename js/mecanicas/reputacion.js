// ============================================================
// REPUTACION.JS - Sistema de reputación del jugador
// ============================================================
// La reputación mide qué tan respetado es el jugador en el
// mundo del juego. Va de 0 a 100 y sube al completar misiones
// secundarias, acciones ecológicas y combates pacíficos.
//
// Tiene 4 niveles: desconocido, conocido, respetado, legendario.
// A mayor reputación, más fáciles son los combates (el enemigo
// empieza más convencido de que eres alguien de fiar).
// ============================================================

export class SistemaReputacion {

  constructor() {
    // Puntos de reputación (0 = nadie te conoce, 100 = leyenda)
    this.puntos = 0;
  }

  // --- Modificar la reputación ---
  // Recibe cantidad (+/-) y una razón para el toast
  modificar(cantidad, razon) {
    const anterior = this.puntos;
    this.puntos = Math.max(0, Math.min(100, this.puntos + cantidad));

    // Devuelve info para que el llamador muestre toast si quiere
    return {
      anterior,
      nuevo: this.puntos,
      cambio: this.puntos - anterior,
      razon
    };
  }

  // --- Obtener el nivel actual como texto ---
  obtenerNivel() {
    if (this.puntos >= 75) return 'legendario';
    if (this.puntos >= 50) return 'respetado';
    if (this.puntos >= 25) return 'conocido';
    return 'desconocido';
  }

  // --- Dibujar el medidor de reputación en el HUD ---
  // Se dibuja al lado de la barra de Vida, misma fila.
  // Layout: etiqueta "Reputación" arriba + barra con nivel adentro.
  // Igualito al patrón de Vida: etiqueta a y+12, barra a y, alto 14.
  dibujarMedidor(ctx, x, y, ancho, textos) {
    const rep = textos?.reputacion || {};
    const alto = 14;

    // Fondo oscuro (misma altura que la barra de Vida)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(x, y, ancho, alto);

    // Barra de progreso con color según nivel
    const progreso = (this.puntos / 100) * (ancho - 4);
    let color;
    if (this.puntos >= 75) color = '#FFD700';      // Dorado (legendario)
    else if (this.puntos >= 50) color = '#44AA44';  // Verde (respetado)
    else if (this.puntos >= 25) color = '#DDDD44';  // Amarillo (conocido)
    else color = '#AA4444';                          // Rojo (desconocido)

    ctx.fillStyle = color;
    ctx.fillRect(x + 2, y + 2, progreso, alto - 4);

    // Etiqueta "Reputación" dentro de la barra (como "Vida" en la suya)
    const etiqueta = rep.etiqueta || 'Reputación';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(etiqueta, x + 5, y + 12);
  }
}
