// ============================================================
// JUEGO.JS - El cerebro principal del juego
// ============================================================
// Este es el archivo que controla TODO. Es como el director de
// una película: no actúa, no filma, no pone la música — pero le
// dice a cada departamento qué hacer y cuándo.
//
// Su trabajo principal es el "game loop" (bucle de juego):
// un ciclo infinito que 60 veces por segundo hace esto:
//   1. Leer qué botones presiona el jugador (entrada)
//   2. Actualizar la lógica (mover personajes, revisar colisiones)
//   3. Dibujar todo en pantalla (renderizado)
// Esto pasa tan rápido que parece movimiento continuo, como un cine.
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, ESCALA_MINIMA, ESCALA_MAXIMA } from './configuracion.js';
import { Entrada } from './entrada.js';
import { Renderizador } from './renderizado.js';
import { CargadorRecursos } from './recursos.js';
import { Sonido } from './sonido.js';
import { SistemaGuardado } from './guardado.js';

// --- Importar el inventario ---
import { Inventario } from '../mecanicas/inventario.js';

// --- Importar el sistema de idiomas ---
import idiomas from '../idiomas/idiomas.js';

// --- Importar al jugador ---
import { Jugador } from '../personajes/pepito.js';

// --- Importar todas las escenas ---
import { MenuPrincipal } from '../escenas/menu-principal.js';
import { SeleccionPersonaje } from '../escenas/seleccion-personaje.js';
import { IntroCinematica } from '../escenas/intro-cinematica.js';
import { CuevasPomier } from '../mundos/taino/cuevas-pomier.js';
import { MapaPrincipal } from '../mundos/mapa-principal.js';
import { AsentamientoTaino1 } from '../mundos/taino/asentamiento-taino-1.js';

export class Juego {

  constructor() {
    // --- Sistemas del motor ---
    // Cada uno hace UNA cosa bien (principio de responsabilidad única)
    this.entrada = new Entrada();
    this.recursos = new CargadorRecursos();
    this.guardado = new SistemaGuardado();

    // Renderizador y sonido se crean en iniciar() porque
    // necesitan el canvas/recursos que aún no existen
    this.renderizador = null;
    this.sonido = null;

    // --- Sistema de idiomas ---
    // Referencia al singleton de idiomas para acceso rápido
    this.idiomas = idiomas;

    // --- Canvas ---
    this.canvas = null;
    this.ctx = null;
    this.escala = 1; // Factor de escala para pantallas de diferentes tamaños

    // --- Control del bucle ---
    // Usamos delta time para que el juego se mueva a la misma velocidad
    // en una computadora rápida y en un celular viejo.
    this.tiempoAnterior = 0;
    this.corriendo = false;
    this.idAnimacion = null; // Para poder cancelar requestAnimationFrame

    // --- Escenas ---
    // El juego tiene diferentes "pantallas": menú, selección de personaje,
    // cueva, mapa del mundo. Solo una está activa a la vez.
    this.escenas = {};
    this.escenaActual = null;
    this.nombreEscenaActual = '';

    // --- Estado del juego ---
    // Estos datos representan el "estado" del jugador. Son los que
    // se guardan cuando el jugador quiere guardar su progreso.
    this.jugador = null;
    this.generoJugador = 'pepito';
    this.reinoActual = 'taino';
    this.companeros = [];
    this.progreso = {
      nodosCompletados: [],
      nodosDesbloqueados: [0]
    };

    // --- Inventario ---
    // El inventario vive en el juego (no en el jugador) porque es una
    // UI global que se puede abrir en cualquier escena jugable.
    this.inventario = new Inventario();

    // Bloqueo para evitar que la tecla I abra y cierre en el mismo frame
    this._bloqueoInventario = false;

    // Rastrear si el inventario estaba abierto el frame anterior
    // para dar un frame de gracia cuando se cierra
    this._inventarioEstabaAbierto = false;
  }

  // --- ARRANQUE ---

  /**
   * Prepara todo lo necesario y arranca el juego.
   * Este es el método que se llama UNA sola vez al cargar la página.
   */
  iniciar() {
    // Crear el canvas donde se dibuja todo
    this.canvas = document.getElementById('juego-canvas');

    // Si no existe el canvas en el HTML, lo creamos nosotros
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'juego-canvas';
      document.body.appendChild(this.canvas);
    }

    // Establecemos el tamaño interno del canvas (resolución del juego).
    // Esto es DIFERENTE al tamaño CSS (cómo se ve en pantalla).
    // El tamaño interno es siempre 960x540, pero el CSS lo escala.
    this.canvas.width = ANCHO_JUEGO;
    this.canvas.height = ALTO_JUEGO;

    // Obtenemos el "pincel" 2D para dibujar
    this.ctx = this.canvas.getContext('2d');

    // Desactivamos el suavizado de imagen para que el pixel art
    // se vea nítido y no borroso al escalar
    this.ctx.imageSmoothingEnabled = false;

    // Crear los sistemas que necesitan el canvas
    this.renderizador = new Renderizador(this.ctx);
    this.sonido = new Sonido(this.recursos);

    // Activar la entrada (teclado + táctil)
    this.entrada.iniciarTeclado();
    this.entrada.iniciarTactil(document.body);

    // Calcular la escala inicial para que el juego quepa en la ventana
    this.redimensionar();

    // Escuchar cambios de tamaño de ventana para re-escalar
    window.addEventListener('resize', () => this.redimensionar());

    // --- Registrar todas las escenas del juego ---
    // Cada escena se registra con un nombre único que usamos
    // para cambiar entre ellas (como canales de televisión)
    this._registrarEscenas();

    // --- Ocultar la pantalla de carga ---
    // La pantalla de carga era visible mientras se preparaba todo.
    // Ahora que todo está listo, la ocultamos con una animación de fade.
    const pantallaCarga = document.getElementById('pantalla-carga');
    if (pantallaCarga) {
      pantallaCarga.classList.add('oculto');
      // La eliminamos del DOM después de la animación para no ocupar memoria
      setTimeout(() => {
        if (pantallaCarga.parentNode) {
          pantallaCarga.parentNode.removeChild(pantallaCarga);
        }
      }, 1000);
    }

    // Empezar en el menú principal
    this.cambiarEscena('menuPrincipal');

    // ¡Arrancamos el bucle infinito!
    this.corriendo = true;
    this.tiempoAnterior = performance.now();
    this.idAnimacion = requestAnimationFrame(
      (tiempo) => this.bucleJuego(tiempo)
    );
  }

  // --- REGISTRO DE ESCENAS ---

  /**
   * Crea e inicializa todas las escenas del juego.
   * Cada escena recibe una referencia a este objeto (juego) para
   * poder acceder a los sistemas compartidos (entrada, idiomas, etc).
   */
  _registrarEscenas() {
    // Menú principal — la primera pantalla que ve el jugador
    const menuPrincipal = new MenuPrincipal();
    menuPrincipal.iniciar(this);
    this.registrarEscena('menuPrincipal', menuPrincipal);

    // Selección de personaje — elegir Pepito o Pepita
    const seleccionPersonaje = new SeleccionPersonaje();
    seleccionPersonaje.iniciar(this);
    this.registrarEscena('seleccionPersonaje', seleccionPersonaje);

    // Cinemática de introducción — la historia de cómo cae a la cueva
    const introCinematica = new IntroCinematica();
    introCinematica.iniciar(this);
    this.registrarEscena('introCinematica', introCinematica);

    // Cuevas del Pomier — primer nivel jugable (plataforma)
    const cuevasPomier = new CuevasPomier();
    this.registrarEscena('cuevasPomier', cuevasPomier);

    // Mapa principal del Mundo Taíno — estilo Super Mario World
    const mapaPrincipal = new MapaPrincipal();
    this.registrarEscena('mapaPrincipal', mapaPrincipal);

    // Asentamiento Taíno I — aldea top-down con bohíos y NPCs
    const asentamientoTaino1 = new AsentamientoTaino1();
    this.registrarEscena('asentamientoTaino1', asentamientoTaino1);
  }

  // --- BUCLE PRINCIPAL ---

  /**
   * El corazón del juego. Se ejecuta ~60 veces por segundo.
   *
   * Calcula el "delta time" (dt): cuánto tiempo pasó desde el último frame.
   * Esto es CRUCIAL porque si un frame tarda más (computadora lenta),
   * el dt será mayor y los personajes se moverán más en ese frame,
   * compensando la lentitud. Resultado: movimiento constante siempre.
   */
  bucleJuego(tiempoActual) {
    // Si el juego está pausado o detenido, no hacer nada
    if (!this.corriendo) return;

    // Calcular delta time en segundos.
    // performance.now() da milisegundos, dividimos entre 1000 para segundos.
    const dt = (tiempoActual - this.tiempoAnterior) / 1000;
    this.tiempoAnterior = tiempoActual;

    // Limitamos el dt a máximo 0.1 segundos (100ms).
    // Sin este límite, si el jugador minimiza el juego 5 minutos
    // y vuelve, el dt sería enorme y todo se teleportaría.
    const dtSeguro = Math.min(dt, 0.1);

    // Las dos fases de cada frame:
    this.actualizar(dtSeguro);  // 1. Lógica (mover cosas, revisar colisiones)
    this.dibujar();             // 2. Gráficos (pintar todo en pantalla)

    // Programar el siguiente frame.
    // requestAnimationFrame es mejor que setInterval porque:
    // - Se pausa automáticamente si el jugador cambia de pestaña (ahorra batería)
    // - Se sincroniza con la pantalla del monitor (sin "tearing")
    this.idAnimacion = requestAnimationFrame(
      (tiempo) => this.bucleJuego(tiempo)
    );
  }

  /**
   * Actualiza toda la lógica del juego.
   * Pasamos los parámetros que cada escena necesita:
   * - dt: delta time para movimiento suave
   * - entrada: para saber qué botones presiona el jugador
   * - jugador: el personaje principal (si existe)
   * - companeros: las mascotas/robots que acompañan al jugador
   */
  actualizar(dt) {
    // --- Inventario: abrir/cerrar con I ---
    // Solo se puede abrir en escenas jugables (cuando hay jugador)
    if (this.jugador) {
      if (this.entrada.estaPresionada('inventario') && !this._bloqueoInventario) {
        this.inventario.alternar();
        this._bloqueoInventario = true;
      }
      if (!this.entrada.estaPresionada('inventario')) {
        this._bloqueoInventario = false;
      }

      // Si el inventario está abierto, consume TODA la entrada
      if (this.inventario.abierto) {
        this.inventario.manejarEntrada(this.entrada, this.jugador);
        this._inventarioEstabaAbierto = true;
        return;
      }

      // Frame de gracia: si el inventario se ACABA de cerrar, no procesar
      // la escena este frame. Evita que un Q de "cerrar inventario"
      // también cierre la escena (salir del mapa/cueva).
      if (this._inventarioEstabaAbierto) {
        this._inventarioEstabaAbierto = false;
        return;
      }
    }

    if (this.escenaActual && typeof this.escenaActual.actualizar === 'function') {
      this.escenaActual.actualizar(dt, this.entrada, this.jugador, this.companeros);
    }
  }

  /**
   * Dibuja todo en pantalla.
   * Primero limpia el canvas (borra el frame anterior) y después
   * le dice a la escena actual que dibuje lo suyo.
   * Pasamos el renderizador, las dimensiones y los textos en el idioma actual.
   */
  dibujar() {
    this.renderizador.limpiar();

    // Obtenemos los textos del idioma actual
    const textos = this.idiomas.traducciones[this.idiomas.idiomaActual];

    if (this.escenaActual && typeof this.escenaActual.dibujar === 'function') {
      this.escenaActual.dibujar(
        this.renderizador,
        ANCHO_JUEGO,
        ALTO_JUEGO,
        textos,
        this.jugador,
        this.companeros
      );
    }

    // --- Inventario se dibuja ENCIMA de todo (overlay) ---
    // Usa el contexto raw porque maneja su propio dibujo
    if (this.inventario.abierto) {
      this.inventario.dibujar(this.ctx, ANCHO_JUEGO, ALTO_JUEGO, textos);
    }
  }

  // --- MANEJO DE ESCENAS ---

  /**
   * Registra una escena para poder cambiar a ella después.
   * Es como agregar un canal a la tele: primero lo registras,
   * después puedes cambiar a él cuando quieras.
   */
  registrarEscena(nombre, escena) {
    this.escenas[nombre] = escena;
  }

  /**
   * Cambia a una escena diferente (menú → juego, juego → cueva, etc).
   * Si la escena anterior tiene un método 'salir', lo llamamos
   * para que pueda limpiar lo que necesite (parar música, etc).
   * Si la nueva escena tiene un método 'iniciar', lo llamamos
   * para que pueda prepararse (cargar mapa, empezar música, etc).
   */
  cambiarEscena(nombreEscena) {
    if (!this.escenas[nombreEscena]) {
      console.warn(
        `La escena "${nombreEscena}" no existe. ` +
        `Escenas disponibles: ${Object.keys(this.escenas).join(', ')}`
      );
      return;
    }

    // Avisar a la escena actual que nos vamos
    if (this.escenaActual && typeof this.escenaActual.salir === 'function') {
      this.escenaActual.salir();
    }

    // Cambiar a la nueva escena
    this.escenaActual = this.escenas[nombreEscena];
    this.nombreEscenaActual = nombreEscena;

    // Si entramos a un nivel jugable, creamos al jugador ANTES de iniciar
    // la escena, para que la escena pueda posicionarlo y configurarlo
    const escenasJugables = ['cuevasPomier', 'asentamientoTaino1'];
    if (escenasJugables.includes(nombreEscena) && !this.jugador) {
      this.jugador = new Jugador(60, 350, this.generoJugador);
    }

    // Preparar la nueva escena.
    // Le pasamos referencia a este juego para que pueda acceder
    // a los sistemas compartidos y cambiar a otras escenas.
    if (typeof this.escenaActual.iniciar === 'function') {
      this.escenaActual.iniciar(this);
    }
  }

  // --- RESPONSIVO ---

  /**
   * Ajusta el tamaño visual del canvas cuando cambia el tamaño
   * de la ventana del navegador. Así el juego se ve bien tanto
   * en un monitor gigante como en un celular pequeño.
   *
   * La resolución INTERNA del canvas siempre es 960x540.
   * Solo cambiamos el tamaño CSS (cómo se muestra en pantalla).
   */
  redimensionar() {
    const anchoVentana = window.innerWidth;
    const altoVentana = window.innerHeight;

    // Calculamos qué escala necesitamos para que el juego
    // quepa completamente en la ventana sin cortarse.
    // Usamos Math.min para elegir la escala más pequeña
    // (así no se sale por ningún lado).
    const escalaAncho = anchoVentana / ANCHO_JUEGO;
    const escalaAlto = altoVentana / ALTO_JUEGO;
    let nuevaEscala = Math.min(escalaAncho, escalaAlto);

    // Limitamos la escala para que no sea ridículamente
    // pequeña ni absurdamente grande
    nuevaEscala = Math.max(ESCALA_MINIMA, Math.min(ESCALA_MAXIMA, nuevaEscala));

    this.escala = nuevaEscala;

    // Aplicamos el tamaño visual al canvas
    this.canvas.style.width = `${ANCHO_JUEGO * nuevaEscala}px`;
    this.canvas.style.height = `${ALTO_JUEGO * nuevaEscala}px`;

    // Centramos el canvas en la pantalla
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = `${(anchoVentana - ANCHO_JUEGO * nuevaEscala) / 2}px`;
    this.canvas.style.top = `${(altoVentana - ALTO_JUEGO * nuevaEscala) / 2}px`;
  }
}

// --- ARRANQUE AUTOMÁTICO ---
// Cuando la página HTML termina de cargar, creamos el juego y lo arrancamos.
// Usamos DOMContentLoaded (no 'load') porque DOMContentLoaded se dispara
// cuando el HTML está listo, sin esperar a que carguen TODAS las imágenes/CSS.
// Nosotros cargamos nuestros recursos por separado con el CargadorRecursos.
document.addEventListener('DOMContentLoaded', () => {
  const juego = new Juego();
  juego.iniciar();

  // Guardamos una referencia global para debugging desde la consola.
  // En producción se puede quitar, pero durante desarrollo es muy útil
  // poder escribir "window.juego.jugador" en la consola del navegador.
  window.juego = juego;
});
