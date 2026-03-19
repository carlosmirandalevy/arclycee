// ============================================================
// MUSICA.JS - Sistema de música de fondo
// ============================================================
// Reproduce música de fondo MP3 para cada escena del juego.
// Cada escenario tiene 2 pistas que se alternan en loop con
// crossfade suave (~2 segundos). Al cambiar de escena, si el
// grupo musical es diferente, hace crossfade al nuevo grupo.
//
// Combate y batú pueden "override" temporalmente la música
// del mundo, y al terminar se restaura la pista anterior.
//
// Volumen guardado en localStorage para persistir entre sesiones.
// ============================================================

// --- Mapeo de escena → grupo musical ---
// Varias escenas pueden compartir el mismo grupo (misma música)
const MUSICA_POR_ESCENA = {
  menuPrincipal: 'menu',
  seleccionPersonaje: 'menu',
  introCinematica: 'menu',
  cuevasPomier: 'cuevas',
  asentamientoTaino1: 'taino',
  mundoMontana: 'lemba',
  asentamientoTaino2: 'taino',
  lagoEnriquillo: 'enriquillo',
  mundoColonial: 'colonial',
  zonaColonial: 'colonial',
  mundoAcuatico: 'acuatico',
  santuarioManati: 'acuatico',
  mundoJuridico: 'aeropuerto',
  mundoLaboratorio: 'museo',
  mundoLFSD: 'lfsd',
  mapaPrincipal: 'mapa',
  finalCinematica: 'creditos'
};

// --- Mapeo de grupo → archivos MP3 (2 pistas por grupo) ---
const PISTAS_POR_GRUPO = {
  menu:       ['resources/music/Menu_Theme_1.mp3',              'resources/music/Menu_Theme_2.mp3'],
  cuevas:     ['resources/music/Caves_theme_1.mp3',             'resources/music/Caves_theme_2.mp3'],
  taino:      ['resources/music/Taino_Village_Theme_1.mp3',     'resources/music/Taino_Village_Theme_2.mp3'],
  colonial:   ['resources/music/La_Isabela_-_Zona_Colonial_1.mp3', 'resources/music/La_Isabela_-_Zona_Colonial_2.mp3'],
  acuatico:   ['resources/music/Mundo_Acuatico_1.mp3',          'resources/music/Mundo_Acuatico_2.mp3'],
  combate:    ['resources/music/Combat_Theme_1.mp3',             'resources/music/Combat_Theme_2.mp3'],
  aeropuerto: ['resources/music/Aeroport_theme_1.mp3',           'resources/music/Aeroport_theme_2.mp3'],
  museo:      ['resources/music/Museo_theme_1.mp3',              'resources/music/Museo_theme_2.mp3'],
  lfsd:       ['resources/music/Robotica_theme_1.mp3',           'resources/music/Robotica_theme_2.mp3'],
  mapa:       ['resources/music/Main_Map_Theme_1.mp3',           'resources/music/Main_Map_Theme_2.mp3'],
  batu:       ['resources/music/Batu_Theme_1.mp3',               'resources/music/Batu_Theme_2.mp3'],
  lemba:      ['resources/music/Palenque_de_Lemba-01.mp3',       'resources/music/Palenque_de_Lemba-02.mp3'],
  enriquillo: ['resources/music/Lago_Enriquillo-01.mp3',        'resources/music/Lago_Enriquillo-02.mp3'],
  creditos:   ['resources/music/End_credits_Theme_1.mp3',        'resources/music/End_credits_Theme_2.mp3']
};

// Duración del crossfade en milisegundos
const DURACION_CROSSFADE = 2000;
// Intervalo del timer de crossfade (ms)
const PASO_CROSSFADE = 50;

export class SistemaMusica {

  constructor() {
    // Volumen actual (0.0 a 1.0) — por defecto 20%
    this.volumen = 0.2;

    // Intentar restaurar volumen guardado
    try {
      const guardado = localStorage.getItem('arclycee_volumen_musica');
      if (guardado !== null) this.volumen = parseFloat(guardado);
    } catch (_e) { /* localStorage no disponible */ }

    // Grupo musical actual (ej: 'menu', 'taino', 'combate')
    this.grupoActual = null;

    // Dos elementos Audio que se alternan para crossfade
    this._audios = [new Audio(), new Audio()];
    this._audios[0].volume = 0;
    this._audios[1].volume = 0;

    // Índice de cuál Audio está sonando actualmente (0 o 1)
    this._pistaActiva = 0;

    // Índice de cuál de las 2 pistas del grupo se está tocando (0 o 1)
    this._indicePista = 0;

    // Timer del crossfade en curso (para poder cancelarlo)
    this._crossfadeTimer = null;

    // --- Override temporal (combate/batú) ---
    this._grupoOverride = null;   // Grupo del override activo
    this._grupoGuardado = null;   // Grupo que estaba antes del override

    // Evento: cuando termina una pista, alternar a la otra
    this._audios[0].addEventListener('ended', () => this._alTerminarPista());
    this._audios[1].addEventListener('ended', () => this._alTerminarPista());
  }

  // --- Cambiar música según la escena ---
  // Se llama desde juego.cambiarEscena(). Si la nueva escena
  // usa el mismo grupo musical, no hace nada.
  cambiarParaEscena(nombreEscena) {
    const nuevoGrupo = MUSICA_POR_ESCENA[nombreEscena];
    if (!nuevoGrupo) return;

    // Si hay un override activo (combate/batú), solo guardar el grupo destino
    if (this._grupoOverride) {
      this._grupoGuardado = nuevoGrupo;
      return;
    }

    // Si ya estamos en ese grupo y hay audio sonando, no reiniciar
    // (si el audio está pausado, es porque el navegador lo bloqueó — reintentar)
    if (nuevoGrupo === this.grupoActual) {
      const activo = this._audios[this._pistaActiva];
      if (!activo.paused) return; // Ya está sonando, no hacer nada
      // Audio pausado (bloqueado por el navegador) — reintentar
    }

    this._iniciarGrupo(nuevoGrupo);
  }

  // --- Override temporal (para combate o batú) ---
  // Guarda la música actual y cambia al grupo de override
  override(grupo) {
    if (this._grupoOverride) return; // Ya hay un override activo
    this._grupoGuardado = this.grupoActual;
    this._grupoOverride = grupo;
    this._iniciarGrupo(grupo);
  }

  // --- Restaurar la música anterior tras un override ---
  restaurar() {
    if (!this._grupoOverride) return;
    const grupoAnterior = this._grupoGuardado;
    this._grupoOverride = null;
    this._grupoGuardado = null;
    if (grupoAnterior) {
      this._iniciarGrupo(grupoAnterior);
    }
  }

  // --- Ajustar volumen y guardar preferencia ---
  ajustarVolumen(valor) {
    this.volumen = Math.max(0, Math.min(1, valor));
    // Aplicar al audio que está sonando ahora
    const activo = this._audios[this._pistaActiva];
    if (!activo.paused) {
      activo.volume = this.volumen;
    }
    // Guardar en localStorage
    try {
      localStorage.setItem('arclycee_volumen_musica', this.volumen.toFixed(2));
    } catch (_e) { /* localStorage no disponible */ }
  }

  // --- Detener toda la música ---
  detener() {
    this._cancelarCrossfade();
    for (const audio of this._audios) {
      audio.pause();
      audio.volume = 0;
      audio.currentTime = 0;
    }
    this.grupoActual = null;
    this._grupoOverride = null;
    this._grupoGuardado = null;
  }

  // ============================================================
  // MÉTODOS INTERNOS
  // ============================================================

  // --- Iniciar un nuevo grupo musical con crossfade ---
  _iniciarGrupo(grupo) {
    const pistas = PISTAS_POR_GRUPO[grupo];
    if (!pistas) return;

    // Cancelar cualquier crossfade en curso
    this._cancelarCrossfade();

    // Fade out de lo que esté sonando
    const anterior = this._audios[this._pistaActiva];
    const nuevaPista = this._pistaActiva === 0 ? 1 : 0;
    const nuevo = this._audios[nuevaPista];

    // Cargar la primera pista del nuevo grupo
    this._indicePista = 0;
    nuevo.src = pistas[0];
    nuevo.volume = 0;
    nuevo.currentTime = 0;

    // Guardar el grupo
    this.grupoActual = grupo;

    // Si no hay nada sonando, simplemente hacer fade in
    if (anterior.paused || anterior.volume < 0.01) {
      anterior.pause();
      this._pistaActiva = nuevaPista;
      this._fadeIn(nuevo);
      return;
    }

    // Crossfade: fade out anterior, fade in nuevo
    this._pistaActiva = nuevaPista;
    this._crossfade(anterior, nuevo);
  }

  // --- Cuando termina una pista, alternar a la otra del mismo grupo ---
  _alTerminarPista() {
    const pistas = PISTAS_POR_GRUPO[this.grupoActual];
    if (!pistas) return;

    // Alternar entre pista 0 y 1
    this._indicePista = this._indicePista === 0 ? 1 : 0;

    const anterior = this._audios[this._pistaActiva];
    const nuevaPista = this._pistaActiva === 0 ? 1 : 0;
    const nuevo = this._audios[nuevaPista];

    nuevo.src = pistas[this._indicePista];
    nuevo.volume = 0;
    nuevo.currentTime = 0;

    this._pistaActiva = nuevaPista;
    this._crossfade(anterior, nuevo);
  }

  // --- Crossfade entre dos audios ---
  _crossfade(saliente, entrante) {
    this._cancelarCrossfade();

    const pasos = DURACION_CROSSFADE / PASO_CROSSFADE;
    let paso = 0;
    const volInicial = saliente.volume;
    const volFinal = this.volumen;

    // Intentar reproducir el entrante
    this._reproducir(entrante);

    this._crossfadeTimer = setInterval(() => {
      paso++;
      const progreso = paso / pasos;

      // Fade out del saliente
      saliente.volume = Math.max(0, volInicial * (1 - progreso));

      // Fade in del entrante
      entrante.volume = Math.min(volFinal, volFinal * progreso);

      if (paso >= pasos) {
        // Completar
        saliente.pause();
        saliente.volume = 0;
        saliente.currentTime = 0;
        entrante.volume = volFinal;
        this._cancelarCrossfade();
      }
    }, PASO_CROSSFADE);
  }

  // --- Fade in simple ---
  _fadeIn(audio) {
    this._cancelarCrossfade();

    this._reproducir(audio);

    const pasos = DURACION_CROSSFADE / PASO_CROSSFADE;
    let paso = 0;
    const volFinal = this.volumen;

    this._crossfadeTimer = setInterval(() => {
      paso++;
      audio.volume = Math.min(volFinal, volFinal * (paso / pasos));

      if (paso >= pasos) {
        audio.volume = volFinal;
        this._cancelarCrossfade();
      }
    }, PASO_CROSSFADE);
  }

  // --- Cancelar crossfade en curso ---
  _cancelarCrossfade() {
    if (this._crossfadeTimer) {
      clearInterval(this._crossfadeTimer);
      this._crossfadeTimer = null;
    }
  }

  // --- Intentar reproducir un audio (maneja política de autoplay) ---
  _reproducir(audio) {
    const promesa = audio.play();
    if (promesa && promesa.catch) {
      promesa.catch(() => {
        // El navegador bloqueó el autoplay — se intentará de nuevo
        // cuando el usuario interactúe (el próximo cambio de escena)
      });
    }
  }
}
