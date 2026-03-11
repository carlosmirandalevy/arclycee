// ============================================================
// RENDERIZADO.JS - Dibuja todo lo que el jugador ve en pantalla
// ============================================================
// Este módulo se encarga de PINTAR cosas en el canvas.
// Tiene funciones simples como "dibujar un rectángulo" o "dibujar texto"
// y funciones especiales como "oscurecer la cueva" o "hacer un círculo
// de luz alrededor del jugador".
//
// También maneja el estilo de arte: el juego puede verse "pixel art"
// o estilo "cuphead", y este módulo decide de qué carpeta cargar
// las imágenes según el estilo elegido.
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, ESTILOS_ARTE } from './configuracion.js';

export class Renderizador {

  /**
   * Recibe el contexto 2D del canvas — es como recibir "el pincel"
   * con el que vamos a dibujar todo.
   */
  constructor(ctx) {
    this.ctx = ctx;

    // Empezamos con estilo pixel porque es el más ligero
    // (menos imágenes pesadas que cargar al inicio)
    this.estiloActual = ESTILOS_ARTE.PIXEL;
  }

  // --- OPERACIONES BÁSICAS ---

  /**
   * Borra TODO lo que hay en pantalla.
   * Llamamos esto al inicio de cada frame antes de dibujar el frame nuevo.
   * Sin esto, cada frame se dibujaría ENCIMA del anterior y se vería un desastre.
   */
  limpiar() {
    this.ctx.clearRect(0, 0, ANCHO_JUEGO, ALTO_JUEGO);
  }

  /**
   * Dibuja un rectángulo de color sólido.
   * Es la forma más simple de dibujar algo — útil para placeholders,
   * colisiones visibles durante debug, y fondos simples.
   */
  dibujarRectangulo(x, y, ancho, alto, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, ancho, alto);
  }

  /**
   * Dibuja una imagen (sprite) en una posición.
   * Si la imagen no existe, dibuja un rectángulo rosa de emergencia
   * para que sea OBVIO que falta un sprite (en vez de fallar en silencio).
   */
  dibujarSprite(sprite, x, y, ancho, alto) {
    if (!sprite) {
      // Rectángulo rosa gritón = "¡hey, aquí falta una imagen!"
      this.dibujarRectangulo(x, y, ancho, alto, '#FF00FF');
      return;
    }

    this.ctx.drawImage(sprite, x, y, ancho, alto);
  }

  /**
   * Dibuja texto en pantalla con opciones configurables.
   * Usamos un objeto 'opciones' para no tener 8 parámetros
   * que nadie recuerda en qué orden van.
   */
  dibujarTexto(texto, x, y, opciones = {}) {
    // Valores por defecto si no nos pasan opciones
    const tamano = opciones.tamano || 16;
    const fuente = opciones.fuente || 'monospace';
    const color = opciones.color || '#FFFFFF';
    const alineacion = opciones.alineacion || 'left';

    this.ctx.font = `${tamano}px ${fuente}`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alineacion;
    this.ctx.fillText(texto, x, y);

    // Restauramos la alineación a la normal para no afectar
    // otros dibujos que vengan después
    this.ctx.textAlign = 'left';
  }

  /**
   * Dibuja una barra (como las de vida, energía, experiencia, etc).
   * Funciona así: dibuja un rectángulo de fondo, y encima otro
   * más pequeño que representa el porcentaje lleno.
   */
  dibujarBarra(x, y, ancho, alto, porcentaje, colorFondo, colorFrente) {
    // Limitamos el porcentaje entre 0 y 1 para evitar barras
    // que se salen de su contenedor (bug visual feo)
    const porcentajeSeguro = Math.max(0, Math.min(1, porcentaje));

    // Fondo de la barra (el "vacío")
    this.ctx.fillStyle = colorFondo;
    this.ctx.fillRect(x, y, ancho, alto);

    // Parte llena de la barra
    this.ctx.fillStyle = colorFrente;
    this.ctx.fillRect(x, y, ancho * porcentajeSeguro, alto);

    // Borde para que se vea más definida
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(x, y, ancho, alto);
  }

  // --- EFECTOS ESPECIALES ---

  /**
   * Oscurece toda la pantalla con un velo negro semitransparente.
   * Útil para: transiciones entre escenas, noches, interiores oscuros.
   * nivelOscuridad va de 0 (nada) a 1 (negro total).
   */
  aplicarFiltroOscuridad(nivelOscuridad) {
    // Limitamos entre 0 y 1 para evitar valores locos
    const nivel = Math.max(0, Math.min(1, nivelOscuridad));

    this.ctx.fillStyle = `rgba(0, 0, 0, ${nivel})`;
    this.ctx.fillRect(0, 0, ANCHO_JUEGO, ALTO_JUEGO);
  }

  /**
   * Efecto de linterna para cuevas: todo oscuro EXCEPTO un círculo
   * alrededor del jugador. Esto crea la sensación de explorar con
   * una antorcha en la oscuridad.
   *
   * Funciona con un "gradiente radial": un degradado circular que va
   * de transparente (centro, donde está el jugador) a negro (bordes).
   */
  aplicarFiltroCueva(jugadorX, jugadorY, radioLuz) {
    // Guardamos el estado actual del canvas para no arruinar
    // los dibujos que vengan después
    this.ctx.save();

    // Creamos un degradado circular centrado en el jugador
    // El centro es transparente (donde ve el jugador)
    // Los bordes son negro total (la oscuridad de la cueva)
    const gradiente = this.ctx.createRadialGradient(
      jugadorX, jugadorY, radioLuz * 0.3,  // Círculo interior: totalmente visible
      jugadorX, jugadorY, radioLuz          // Círculo exterior: oscuridad total
    );

    gradiente.addColorStop(0, 'rgba(0, 0, 0, 0)');      // Centro: transparente
    gradiente.addColorStop(0.7, 'rgba(0, 0, 0, 0.6)');  // Transición: penumbra
    gradiente.addColorStop(1, 'rgba(0, 0, 0, 0.95)');   // Borde: casi negro

    this.ctx.fillStyle = gradiente;
    this.ctx.fillRect(0, 0, ANCHO_JUEGO, ALTO_JUEGO);

    // Restauramos el estado del canvas
    this.ctx.restore();
  }

  // --- ESTILOS DE ARTE ---

  /**
   * Devuelve el estilo de arte que estamos usando ahora.
   * Otros módulos usan esto para saber de qué carpeta cargar imágenes.
   */
  obtenerEstiloActual() {
    return this.estiloActual;
  }

  /**
   * Cambia entre estilo pixel y estilo cuphead.
   * Esto afecta qué carpeta de imágenes usa el juego:
   * 'pixel' -> recursos/sprites/pixel/
   * 'cuphead' -> recursos/sprites/cuphead/
   *
   * Solo aceptamos estilos que existen para evitar errores.
   */
  cambiarEstilo(estilo) {
    const estilosValidos = Object.values(ESTILOS_ARTE);

    if (!estilosValidos.includes(estilo)) {
      console.warn(
        `Estilo "${estilo}" no es válido. ` +
        `Los estilos disponibles son: ${estilosValidos.join(', ')}`
      );
      return;
    }

    this.estiloActual = estilo;
  }

  /**
   * Devuelve la ruta base donde están los sprites del estilo actual.
   * Así otros módulos solo piden "jugador.png" y este método
   * agrega automáticamente la carpeta correcta.
   */
  obtenerRutaSprites() {
    return `recursos/sprites/${this.estiloActual}/`;
  }
}
