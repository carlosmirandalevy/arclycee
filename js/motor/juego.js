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

// --- Importar el sistema de combate ---
import { SistemaCombate } from '../mecanicas/combate.js';

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
import { AsentamientoTaino2 } from '../mundos/taino/asentamiento-taino-2.js';
import { LaIsabela } from '../mundos/colonial/la-isabela.js';
import { ZonaColonial } from '../mundos/colonial/zona-colonial.js';
import { MundoAcuatico } from '../mundos/acuatico/mundo-acuatico.js';

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

    // --- Combate ---
    // Sistema de combate estilo Undertale con opción pacifista
    this.combate = new SistemaCombate();

    // Bloqueo para evitar que la tecla I abra y cierre en el mismo frame
    this._bloqueoInventario = false;

    // Bloqueo para la tecla F (habilidad especial de compañeros)
    this._bloqueoEspecial = false;

    // Rastrear si el inventario estaba abierto el frame anterior
    // para dar un frame de gracia cuando se cierra
    this._inventarioEstabaAbierto = false;

    // --- Sistema de mensajes flotantes (toasts) ---
    // Son mensajes temporales que aparecen arriba de la pantalla
    // y desaparecen solos después de unos segundos.
    // Se usan para notificar al jugador cuando recoge un objeto,
    // completa una misión, etc. sin interrumpir el juego.
    // Cada toast es: { texto, duracion, tiempoRestante, opacidad }
    this._toasts = [];

    // --- Código secreto para saltar a cualquier nivel ---
    // Secuencia: ↑ ↑ ↓ ↓ ← → ← → (estilo Konami)
    // Cuando se completa, aparece un selector de niveles
    this._codigoSecreto = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'
    ];
    this._progresoSecreto = 0;       // Cuántas teclas van bien
    this._selectorNiveles = false;    // ¿Está abierto el selector?
    this._nivelSeleccionado = 0;      // Índice del nivel elegido
    this._bloqueoSelector = true;     // Evitar input inmediato al abrir
    this._listaNiveles = [
      { nombre: 'Menú Principal',        escena: 'menuPrincipal' },
      { nombre: 'Selección Personaje',   escena: 'seleccionPersonaje' },
      { nombre: 'Intro Cinemática',      escena: 'introCinematica' },
      { nombre: 'Cuevas del Pomier',     escena: 'cuevasPomier' },
      { nombre: 'Mapa Principal',        escena: 'mapaPrincipal' },
      { nombre: 'Asentamiento Taíno I',  escena: 'asentamientoTaino1' },
      { nombre: 'Asentamiento Taíno II', escena: 'asentamientoTaino2' },
      { nombre: 'La Isabela (Colonial)', escena: 'mundoColonial' },
      { nombre: 'Zona Colonial',        escena: 'zonaColonial' },
      { nombre: 'Naufragio La Pinta (Acuático)', escena: 'mundoAcuatico' }
    ];
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

    // Listener RAW para detectar la secuencia secreta (Konami code)
    // Se escucha aparte del sistema de entrada porque necesitamos las
    // teclas exactas, no las acciones mapeadas
    window.addEventListener('keydown', (evento) => {
      this._procesarCodigoSecreto(evento.key);
    });

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

    // Asentamiento Taíno II — aldea agrícola con conucos y areíto
    const asentamientoTaino2 = new AsentamientoTaino2();
    this.registrarEscena('asentamientoTaino2', asentamientoTaino2);

    // La Isabela — primer asentamiento europeo (Mundo Colonial)
    const laIsabela = new LaIsabela();
    this.registrarEscena('mundoColonial', laIsabela);

    // Zona Colonial de Santo Domingo — Patrimonio de la Humanidad
    const zonaColonial = new ZonaColonial();
    this.registrarEscena('zonaColonial', zonaColonial);

    // Mundo Acuático — Naufragio de La Pinta (primer nivel submarino)
    const mundoAcuatico = new MundoAcuatico();
    this.registrarEscena('mundoAcuatico', mundoAcuatico);
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
    // --- Selector de niveles secreto ---
    // Si está abierto, consume TODA la entrada
    if (this._selectorNiveles) {
      // Esperar a que se suelten las teclas antes de aceptar input
      if (this._bloqueoSelector) {
        if (!this.entrada.estaPresionada('arriba') &&
            !this.entrada.estaPresionada('abajo') &&
            !this.entrada.estaPresionada('accion') &&
            !this.entrada.estaPresionada('cancelar')) {
          this._bloqueoSelector = false;
        }
        return;
      }

      // Navegar con flechas
      if (this.entrada.estaPresionada('arriba')) {
        this._nivelSeleccionado = Math.max(0, this._nivelSeleccionado - 1);
        this._bloqueoSelector = true;
      } else if (this.entrada.estaPresionada('abajo')) {
        this._nivelSeleccionado = Math.min(
          this._listaNiveles.length - 1,
          this._nivelSeleccionado + 1
        );
        this._bloqueoSelector = true;
      }

      // Confirmar con E/Enter
      if (this.entrada.estaPresionada('accion')) {
        const nivel = this._listaNiveles[this._nivelSeleccionado];
        this._selectorNiveles = false;
        this._bloqueoSelector = true;
        this.cambiarEscena(nivel.escena);
        return;
      }

      // Cerrar con Q/Esc
      if (this.entrada.estaPresionada('cancelar')) {
        this._selectorNiveles = false;
        this._bloqueoSelector = true;
      }

      return;
    }

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

    // --- Combate: si hay un combate activo, consume toda la entrada ---
    if (this.combate.enCombate) {
      this.combate.actualizar(dt, this.entrada, this.jugador, this.inventario);
      return;
    }

    // --- Habilidad especial con F ---
    // Si el jugador presiona F y tiene a Magnoboot, activa la detección
    if (this.jugador) {
      if (this.entrada.estaPresionada('especial') && !this._bloqueoEspecial) {
        this._bloqueoEspecial = true;

        // Buscar Magnoboot entre los compañeros
        const magnoboot = this.companeros.find(c => c.tipo === 'magnoboot' && c.activo);
        if (magnoboot && typeof magnoboot.iniciarDeteccion === 'function') {
          magnoboot.iniciarDeteccion();
        }
      }
      if (!this.entrada.estaPresionada('especial')) {
        this._bloqueoEspecial = false;
      }
    }

    if (this.escenaActual && typeof this.escenaActual.actualizar === 'function') {
      this.escenaActual.actualizar(dt, this.entrada, this.jugador, this.companeros);
    }

    // --- Actualizar toasts (siempre, incluso durante combate/inventario) ---
    this._actualizarToasts(dt);
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

    // --- Combate se dibuja ENCIMA de la escena (overlay) ---
    if (this.combate.enCombate) {
      this.combate.dibujar(this.ctx, ANCHO_JUEGO, ALTO_JUEGO, textos?.combate, this.jugador);
    }

    // --- Inventario se dibuja ENCIMA de todo (overlay) ---
    // Usa el contexto raw porque maneja su propio dibujo
    if (this.inventario.abierto) {
      this.inventario.dibujar(this.ctx, ANCHO_JUEGO, ALTO_JUEGO, textos);
    }

    // --- Mensajes flotantes (toasts) encima de la UI ---
    // Se dibujan sobre todo excepto el selector secreto
    this._dibujarToasts(this.ctx, ANCHO_JUEGO);

    // --- Selector de niveles secreto (se dibuja sobre ABSOLUTAMENTE todo) ---
    if (this._selectorNiveles) {
      this._dibujarSelectorNiveles(this.ctx, ANCHO_JUEGO, ALTO_JUEGO);
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
    const escenasJugables = ['cuevasPomier', 'asentamientoTaino1', 'asentamientoTaino2', 'mundoColonial', 'zonaColonial', 'mundoAcuatico'];
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

  // --- MENSAJES FLOTANTES (TOASTS) ---
  // Los toasts son notificaciones no intrusivas que aparecen en la
  // parte superior de la pantalla y desaparecen solas. Se usan para
  // informar al jugador de eventos sin pausar el juego (ej: recoger
  // un objeto, completar una misión, desbloquear algo).

  /**
   * Muestra un mensaje flotante en pantalla.
   * @param {string} texto - El mensaje a mostrar
   * @param {number} duracion - Segundos que dura visible (por defecto 3)
   */
  mostrarToast(texto, duracion = 3) {
    this._toasts.push({
      texto,
      duracion,
      tiempoRestante: duracion
    });

    // Máximo 4 toasts a la vez para no saturar la pantalla
    if (this._toasts.length > 4) {
      this._toasts.shift(); // Quitar el más viejo
    }
  }

  /**
   * Reduce el tiempo de vida de cada toast y elimina los expirados.
   * Se llama cada frame desde actualizar().
   */
  _actualizarToasts(dt) {
    for (let i = this._toasts.length - 1; i >= 0; i--) {
      this._toasts[i].tiempoRestante -= dt;
      if (this._toasts[i].tiempoRestante <= 0) {
        this._toasts.splice(i, 1);
      }
    }
  }

  /**
   * Dibuja todos los toasts activos en la parte superior de la pantalla.
   * Cada toast tiene una animación de entrada (baja desde arriba) y
   * de salida (se desvanece al expirar). Están diseñados para no
   * tapar la acción del juego.
   */
  _dibujarToasts(ctx, anchoCanvas) {
    if (this._toasts.length === 0) return;

    ctx.save();

    for (let i = 0; i < this._toasts.length; i++) {
      const toast = this._toasts[i];
      const y = 50 + i * 36; // Cada toast se apila debajo del anterior

      // --- Calcular opacidad ---
      // Aparece rápido (0.3s), desaparece suave (último segundo)
      const tiempoVivido = toast.duracion - toast.tiempoRestante;
      let opacidad = 1;

      // Fade in: primer 0.3 segundos
      if (tiempoVivido < 0.3) {
        opacidad = tiempoVivido / 0.3;
      }
      // Fade out: último segundo
      if (toast.tiempoRestante < 1) {
        opacidad = toast.tiempoRestante;
      }

      // --- Animación de entrada (baja desde arriba) ---
      const desplazamiento = tiempoVivido < 0.3 ? (1 - tiempoVivido / 0.3) * -15 : 0;

      // --- Medir el texto para ajustar el fondo ---
      ctx.font = 'bold 13px monospace';
      const medida = ctx.measureText(toast.texto);
      const anchoTexto = medida.width + 30; // Padding de 15px a cada lado
      const xCentro = anchoCanvas / 2;

      // --- Fondo redondeado semitransparente ---
      // Dibujamos un rectángulo con esquinas redondeadas manualmente
      // para compatibilidad con navegadores que no soporten roundRect
      const rx = xCentro - anchoTexto / 2;
      const ry = y + desplazamiento - 12;
      const rw = anchoTexto;
      const rh = 26;
      const radio = 8;

      ctx.fillStyle = `rgba(20, 20, 20, ${0.8 * opacidad})`;
      ctx.beginPath();
      ctx.moveTo(rx + radio, ry);
      ctx.lineTo(rx + rw - radio, ry);
      ctx.arcTo(rx + rw, ry, rx + rw, ry + radio, radio);
      ctx.lineTo(rx + rw, ry + rh - radio);
      ctx.arcTo(rx + rw, ry + rh, rx + rw - radio, ry + rh, radio);
      ctx.lineTo(rx + radio, ry + rh);
      ctx.arcTo(rx, ry + rh, rx, ry + rh - radio, radio);
      ctx.lineTo(rx, ry + radio);
      ctx.arcTo(rx, ry, rx + radio, ry, radio);
      ctx.closePath();
      ctx.fill();

      // Borde dorado sutil
      ctx.strokeStyle = `rgba(255, 215, 0, ${0.5 * opacidad})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // --- Texto del toast ---
      ctx.fillStyle = `rgba(255, 255, 255, ${opacidad})`;
      ctx.textAlign = 'center';
      ctx.fillText(toast.texto, xCentro, y + desplazamiento + 3);
    }

    ctx.restore();
  }

  // --- CÓDIGO SECRETO (KONAMI CODE) ---

  /**
   * Verifica si la tecla presionada continúa la secuencia secreta.
   * Si la secuencia se completa, abre el selector de niveles.
   * Si se presiona una tecla incorrecta, reinicia el progreso.
   */
  _procesarCodigoSecreto(tecla) {
    // Si el selector ya está abierto, no procesar más la secuencia
    if (this._selectorNiveles) return;

    if (tecla === this._codigoSecreto[this._progresoSecreto]) {
      this._progresoSecreto++;

      // ¿Se completó la secuencia?
      if (this._progresoSecreto >= this._codigoSecreto.length) {
        this._progresoSecreto = 0;
        this._selectorNiveles = true;
        this._nivelSeleccionado = 0;
        this._bloqueoSelector = true; // Evitar que la última tecla active algo
      }
    } else {
      // Tecla incorrecta → reiniciar
      // Pero si la tecla es el inicio de la secuencia, contar como primer paso
      this._progresoSecreto = (tecla === this._codigoSecreto[0]) ? 1 : 0;
    }
  }

  /**
   * Dibuja el selector de niveles en pantalla.
   * Aparece como un overlay oscuro con la lista de todas las escenas.
   */
  _dibujarSelectorNiveles(ctx, ancho, alto) {
    // Fondo semitransparente
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, ancho, alto);

    // Título
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 28px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('🔓 SELECTOR DE NIVELES 🔓', ancho / 2, 60);

    ctx.fillStyle = '#AAAAAA';
    ctx.font = '14px monospace';
    ctx.fillText('(Código Konami activado)', ancho / 2, 85);

    // Lista de niveles
    const inicioY = 130;
    const altoOpcion = 40;

    for (let i = 0; i < this._listaNiveles.length; i++) {
      const y = inicioY + i * altoOpcion;
      const nivel = this._listaNiveles[i];
      const seleccionado = (i === this._nivelSeleccionado);

      // Fondo de la opción seleccionada
      if (seleccionado) {
        ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
        ctx.fillRect(ancho / 2 - 200, y - 5, 400, 35);

        // Borde dorado
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.strokeRect(ancho / 2 - 200, y - 5, 400, 35);
      }

      // Número y nombre
      ctx.fillStyle = seleccionado ? '#FFD700' : '#FFFFFF';
      ctx.font = seleccionado ? 'bold 20px monospace' : '18px monospace';
      ctx.textAlign = 'center';

      const flecha = seleccionado ? '▸ ' : '  ';
      ctx.fillText(`${flecha}${i + 1}. ${nivel.nombre}`, ancho / 2, y + 20);
    }

    // Instrucciones
    ctx.fillStyle = '#888888';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    const yInstrucciones = inicioY + this._listaNiveles.length * altoOpcion + 30;
    ctx.fillText('↑↓: elegir  |  E: ir al nivel  |  Q: cerrar', ancho / 2, yInstrucciones);
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
