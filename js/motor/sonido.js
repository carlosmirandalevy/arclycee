// ============================================================
// SONIDO.JS - Controla toda la música y efectos de sonido
// ============================================================
// Separamos la música de fondo (que suena en bucle) de los efectos
// de sonido (que suenan una vez y ya). Cada uno tiene su volumen
// independiente porque muchos jugadores quieren la música bajita
// pero los efectos fuerte (o al revés).
//
// IMPORTANTE: Todos los métodos manejan errores silenciosamente.
// Si un sonido no existe o el navegador bloquea el audio,
// simplemente avisamos en la consola y seguimos jugando.
// Un error de audio NUNCA debería crashear el juego.
// ============================================================

export class Sonido {

  constructor(cargadorRecursos) {
    // Guardamos referencia al cargador para obtener los audios
    this.cargador = cargadorRecursos;

    // Volúmenes separados: así el jugador puede personalizar
    // su experiencia de audio como prefiera
    this.volumenMusica = 0.5;    // 50% por defecto — no muy fuerte
    this.volumenEfectos = 0.7;   // 70% — los efectos deben destacar un poco más

    // Referencia a la música que suena ahora mismo.
    // Solo puede sonar UNA música a la vez (la del nivel actual).
    this.musicaActual = null;

    // Nombre de la pista actual para saber si ya está sonando
    this.nombreMusicaActual = '';

    // Para poder silenciar y restaurar los volúmenes anteriores
    this.silenciado = false;
    this.volumenMusicaAnterior = this.volumenMusica;
    this.volumenEfectosAnterior = this.volumenEfectos;
  }

  // --- MÚSICA DE FONDO ---

  /**
   * Reproduce música de fondo. Si ya está sonando la misma pista,
   * no la reinicia (sería molesto escucharla empezar de cero
   * cada vez que el jugador camina a un nuevo tile del mismo nivel).
   */
  reproducirMusica(nombre, enBucle = true) {
    // Si ya estamos tocando esta canción, no hacer nada
    if (this.nombreMusicaActual === nombre && this.musicaActual) {
      return;
    }

    // Primero paramos la música anterior (si hay alguna)
    this.detenerMusica();

    const audio = this.cargador.obtenerSonido(nombre);
    if (!audio) {
      console.warn(`Música "${nombre}" no encontrada — ¿ya se cargó el recurso?`);
      return;
    }

    // Clonamos el audio para poder reproducir el mismo sonido
    // múltiples veces sin conflictos
    this.musicaActual = audio.cloneNode();
    this.musicaActual.volume = this.volumenMusica;
    this.musicaActual.loop = enBucle;

    // El navegador puede bloquear la reproducción automática.
    // Esto pasa porque Chrome/Firefox quieren que el usuario
    // interactúe primero (click/touch) antes de permitir audio.
    // Capturamos el error para que no crashee.
    this.musicaActual.play().catch((error) => {
      console.warn(
        `No se pudo reproducir la música "${nombre}". ` +
        `El navegador requiere interacción del usuario primero.`
      );
    });

    this.nombreMusicaActual = nombre;
  }

  /**
   * Para la música actual. Resetea la posición a 0 para que
   * si la volvemos a poner, empiece desde el principio.
   */
  detenerMusica() {
    if (this.musicaActual) {
      this.musicaActual.pause();
      this.musicaActual.currentTime = 0;
      this.musicaActual = null;
      this.nombreMusicaActual = '';
    }
  }

  // --- EFECTOS DE SONIDO ---

  /**
   * Reproduce un efecto de sonido UNA vez (sin bucle).
   * Clonamos el audio para poder tocar el mismo efecto varias veces
   * simultáneamente (ejemplo: varios enemigos haciendo "ouch" a la vez).
   */
  reproducirEfecto(nombre) {
    const audio = this.cargador.obtenerSonido(nombre);
    if (!audio) {
      console.warn(`Efecto "${nombre}" no encontrado — ¿ya se cargó el recurso?`);
      return;
    }

    // Clonamos para que cada reproducción sea independiente
    const efecto = audio.cloneNode();
    efecto.volume = this.volumenEfectos;

    efecto.play().catch((error) => {
      console.warn(`No se pudo reproducir el efecto "${nombre}".`);
    });
  }

  // --- CONTROL DE VOLUMEN ---

  /**
   * Cambia el volumen de la música (0 = silencio, 1 = máximo).
   * También actualiza la música que está sonando ahora mismo
   * para que el cambio sea inmediato (no solo para la siguiente canción).
   */
  cambiarVolumenMusica(volumen) {
    this.volumenMusica = Math.max(0, Math.min(1, volumen));

    // Aplicar el cambio a la música que suena ahora
    if (this.musicaActual) {
      this.musicaActual.volume = this.volumenMusica;
    }
  }

  /**
   * Cambia el volumen de los efectos de sonido.
   * Los efectos futuros usarán este volumen. Los que ya están
   * sonando mantienen su volumen (duran tan poco que no importa).
   */
  cambiarVolumenEfectos(volumen) {
    this.volumenEfectos = Math.max(0, Math.min(1, volumen));
  }

  /**
   * Silencia TODO el audio del juego.
   * Guardamos los volúmenes anteriores para poder restaurarlos después.
   * El jugador no quiere tener que re-ajustar todo después de silenciar.
   */
  silenciarTodo() {
    if (this.silenciado) return; // Ya está silenciado, no hacer nada

    this.silenciado = true;
    this.volumenMusicaAnterior = this.volumenMusica;
    this.volumenEfectosAnterior = this.volumenEfectos;

    this.cambiarVolumenMusica(0);
    this.cambiarVolumenEfectos(0);
  }

  /**
   * Restaura el audio a los volúmenes que tenía antes de silenciar.
   */
  activarTodo() {
    if (!this.silenciado) return; // No está silenciado, no hacer nada

    this.silenciado = false;
    this.cambiarVolumenMusica(this.volumenMusicaAnterior);
    this.cambiarVolumenEfectos(this.volumenEfectosAnterior);
  }
}
