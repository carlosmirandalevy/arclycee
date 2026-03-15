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
import { SonidoProcedural } from './sonido-procedural.js';
import { SistemaGuardado } from './guardado.js';

// --- Importar el inventario ---
import { Inventario } from '../mecanicas/inventario.js';

// --- Importar el sistema de combate ---
import { SistemaCombate } from '../mecanicas/combate.js';

// --- Importar el mini-juego de batú ---
import { JuegoBatu } from '../mecanicas/batu.js';

// --- Importar el álbum de fotos ---
import { AlbumFotos } from '../mecanicas/album-fotos.js';

// --- Importar sistemas de misiones secundarias ---
import { RegistroJuego } from '../mecanicas/registro-juego.js';
import { SistemaReputacion } from '../mecanicas/reputacion.js';
import { MisionesSecundarias } from '../mecanicas/misiones-secundarias.js';

// --- Importar mini-juegos del LFSD ---
import { CalibracionSenal } from '../mecanicas/calibracion-senal.js';
import { ProgramacionBloques } from '../mecanicas/programacion-bloques.js';
import { ConexionCables } from '../mecanicas/conexion-cables.js';

// --- Importar el sistema de idiomas ---
import idiomas from '../idiomas/idiomas.js';

// --- Importar al jugador ---
import { Jugador } from '../personajes/pepito.js';

// --- Importar compañeros (para restaurar partidas guardadas) ---
import { Magnoboot } from '../personajes/companeros/magnoboot.js';
import { Viralata } from '../personajes/companeros/viralata.js';
import { CemiMurcielago } from '../personajes/companeros/cemi-murcielago.js';

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
import { SantuarioManati } from '../mundos/acuatico/santuario-manati.js';
import { MundoJuridico } from '../mundos/juridico/mundo-juridico.js';
import { MundoLaboratorio } from '../mundos/laboratorio/mundo-laboratorio.js';
import { FinalCinematica } from '../escenas/final-cinematica.js';
import { MundoLFSD } from '../mundos/lfsd/mundo-lfsd.js';
import { SistemaClima } from '../clima/clima.js';
import { MapaLeaflet } from '../mapas/mapa-leaflet.js';

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
    this.sfx = new SonidoProcedural();

    // Flag para evitar múltiples triggers de muerte simultáneos
    this._muerteEnCurso = false;

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

    // Lista de escenas donde el jugador existe y puede recibir daño
    this.escenasJugables = [
      'mapaPrincipal', 'cuevasPomier', 'asentamientoTaino1', 'asentamientoTaino2',
      'mundoColonial', 'zonaColonial', 'mundoAcuatico', 'santuarioManati',
      'mundoJuridico', 'mundoLaboratorio', 'mundoLFSD'
    ];

    // --- Estado del juego ---
    // Estos datos representan el "estado" del jugador. Son los que
    // se guardan cuando el jugador quiere guardar su progreso.
    this.jugador = null;
    this.generoJugador = 'pepito';
    this.reinoActual = 'taino';
    this.companeros = [];
    this.progreso = {
      nodosCompletados: [],
      nodosDesbloqueados: [0],
      combatesPacificados: 0,
      combatesViolentos: 0,
      accionesEcologicas: 0,
      mundos: {} // Estado persistente por mundo (NPCs, objetos, etc.)
    };

    // --- Sistema de clima ---
    // Controla los efectos climáticos (lluvia, tormenta, etc.)
    // Solo se activa en mundos exteriores
    this.clima = new SistemaClima();
    this._climaActivo = false;

    // --- Mapa de referencia (Leaflet) ---
    // Mapa interactivo real que se abre con R desde el mapa del mundo
    this.mapaReferencia = new MapaLeaflet();
    this._bloqueoReferencia = false;

    // --- Inventario ---
    // El inventario vive en el juego (no en el jugador) porque es una
    // UI global que se puede abrir en cualquier escena jugable.
    this.inventario = new Inventario();
    // Mostrar toast al usar un objeto curativo desde el inventario
    this.inventario.alUsar = (objeto, jugador) => {
      if (objeto.tipo === 'curacion') {
        this.mostrarToast(`💚 ${objeto.nombre} — +${objeto.valor || 20} vida`);
      }
    };

    // --- Combate ---
    // Sistema de combate estilo Undertale con opción pacifista
    this.combate = new SistemaCombate();

    // --- Batú ---
    // Mini-juego de pelota taína (overlay como el combate)
    this.batu = new JuegoBatu();

    // --- Álbum de fotos ---
    // El jugador puede tomar fotos y selfies de objetos, NPCs y paisajes.
    // Se abre con P, se toman fotos con T y selfies con G.
    this.album = new AlbumFotos();

    // Bloqueo para la tecla P (álbum de fotos)
    this._bloqueoAlbum = false;

    // Bloqueo para las teclas T (foto) y G (selfie)
    this._bloqueoFoto = false;
    this._bloqueoSelfie = false;

    // --- Sistemas de misiones secundarias ---
    // Registro de misiones (diario del jugador, tecla L)
    this.registro = new RegistroJuego(this);
    // Reputación del jugador (0-100, afecta combates)
    this.reputacion = new SistemaReputacion();
    // Estado de las 3 sidequests del LFSD
    this.misiones = new MisionesSecundarias();

    // --- Mini-juegos del LFSD (overlays como batú/combate) ---
    this.calibracion = new CalibracionSenal();
    this.programacion = new ProgramacionBloques();
    this.conexion = new ConexionCables();

    // Bloqueo para la tecla L (registro de misiones)
    this._bloqueoRegistro = false;

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
      { nombre: 'Naufragio Santa María (Acuático)', escena: 'mundoAcuatico' },
      { nombre: 'Santuario del Manatí', escena: 'santuarioManati' },
      { nombre: 'Aeropuerto Punta Cana (Jurídico)', escena: 'mundoJuridico' },
      { nombre: 'Museo Atarazanas Reales (Laboratorio)', escena: 'mundoLaboratorio' },
      { nombre: 'LFSD (Robótica)', escena: 'mundoLFSD' },
      { nombre: 'Final Cinemática', escena: 'finalCinematica' }
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

    // Inicializar el mapa de referencia (Leaflet)
    const contenedorMapa = document.getElementById('mapa-contenedor');
    if (contenedorMapa) {
      this.mapaReferencia.iniciar(contenedorMapa, this);
    }

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

    // Mundo Acuático — Naufragio de la Santa María (primer nivel submarino)
    const mundoAcuatico = new MundoAcuatico();
    this.registrarEscena('mundoAcuatico', mundoAcuatico);

    // Santuario del Manatí — sub-nivel marino con acciones ecológicas
    const santuarioManati = new SantuarioManati();
    this.registrarEscena('santuarioManati', santuarioManati);

    // Mundo Jurídico — Aeropuerto de Punta Cana (tráfico de artefactos)
    const mundoJuridico = new MundoJuridico();
    this.registrarEscena('mundoJuridico', mundoJuridico);

    // Mundo Laboratorio — Museo de las Atarazanas Reales (autenticación)
    const mundoLaboratorio = new MundoLaboratorio();
    this.registrarEscena('mundoLaboratorio', mundoLaboratorio);

    // LFSD — clase de robótica del Lycée Français (misiones secundarias)
    const mundoLFSD = new MundoLFSD();
    this.registrarEscena('mundoLFSD', mundoLFSD);

    // Cinemática final — secuencia de créditos con final múltiple
    const finalCinematica = new FinalCinematica();
    this.registrarEscena('finalCinematica', finalCinematica);
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

    // --- Registro de misiones: abrir/cerrar con L ---
    if (this.jugador) {
      if (this.entrada.estaPresionada('registro') && !this._bloqueoRegistro) {
        this.registro.visible = !this.registro.visible;
        this._bloqueoRegistro = true;
      }
      if (!this.entrada.estaPresionada('registro')) {
        this._bloqueoRegistro = false;
      }

      // Si el registro está abierto, consume TODA la entrada
      if (this.registro.visible) {
        this.registro.manejarEntrada(this.entrada);
        return;
      }
    }

    // --- Álbum de fotos: abrir/cerrar con P ---
    // Se puede abrir en cualquier escena jugable (cuando hay jugador)
    if (this.jugador) {
      if (this.entrada.estaPresionada('album') && !this._bloqueoAlbum) {
        this.album.visible = !this.album.visible;
        this.album.scrollY = 0; // Reiniciar scroll al abrir
        this._bloqueoAlbum = true;
      }
      if (!this.entrada.estaPresionada('album')) {
        this._bloqueoAlbum = false;
      }

      // También cerrar con cancelar (Q/Esc)
      if (this.album.visible && this.entrada.estaPresionada('cancelar')) {
        this.album.visible = false;
      }

      // Si el álbum está abierto, consume TODA la entrada
      if (this.album.visible) {
        this.album.manejarEntrada(this.entrada);
        return;
      }
    }

    // --- Combate: si hay un combate activo, consume toda la entrada ---
    if (this.combate.enCombate) {
      this.combate.actualizar(dt, this.entrada, this.jugador, this.inventario);
      return;
    }

    // --- Batú: si hay un juego de batú activo, consume toda la entrada ---
    if (this.batu.enJuego) {
      this.batu.actualizar(dt, this.entrada);
      return;
    }

    // --- Mini-juegos LFSD: si alguno está activo, consume toda la entrada ---
    if (this.calibracion.enJuego) {
      this.calibracion.actualizar(dt, this.entrada);
      return;
    }
    if (this.programacion.enJuego) {
      this.programacion.actualizar(dt, this.entrada);
      return;
    }
    if (this.conexion.enJuego) {
      this.conexion.actualizar(dt, this.entrada);
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

    // --- Foto/Selfie: capturar con T/G cuando hay objetivo cercano ---
    // Detecta NPCs, petroglifos y objetos cerca del jugador en la escena
    // actual y permite tomar fotos o selfies de ellos.
    if (this.jugador && this.escenaActual) {
      const objetivoCercano = this._buscarObjetivoFotografico();

      if (objetivoCercano) {
        // Tomar foto con T
        if (this.entrada.estaPresionada('foto') && !this._bloqueoFoto) {
          this._bloqueoFoto = true;
          const exito = this.album.tomarFoto(
            objetivoCercano.nombre,
            objetivoCercano.descripcion || '',
            this.nombreEscenaActual,
            objetivoCercano.entidad,
            objetivoCercano.tipoEntidad,
            this.escenaActual
          );
          if (exito) {
            const textos = this.idiomas.traducciones[this.idiomas.idiomaActual];
            this.mostrarToast(textos?.album?.fotoTomada || '¡Foto guardada!');
            if (this.sfx) this.sfx.fotoCaptura();
          }
        }
        if (!this.entrada.estaPresionada('foto')) {
          this._bloqueoFoto = false;
        }

        // Tomar selfie con G
        if (this.entrada.estaPresionada('selfie') && !this._bloqueoSelfie) {
          this._bloqueoSelfie = true;
          const exito = this.album.tomarSelfie(
            objetivoCercano.nombre,
            objetivoCercano.descripcion || '',
            this.nombreEscenaActual,
            objetivoCercano.entidad,
            objetivoCercano.tipoEntidad,
            this.jugador,
            this.escenaActual
          );
          if (exito) {
            const textos = this.idiomas.traducciones[this.idiomas.idiomaActual];
            this.mostrarToast(textos?.album?.selfieTomada || '¡Selfie guardada!');
            if (this.sfx) this.sfx.selfieCaptura();
          }
        }
        if (!this.entrada.estaPresionada('selfie')) {
          this._bloqueoSelfie = false;
        }
      }
    }

    // --- Mapa de referencia: abrir/cerrar con R (solo en mapa del mundo) ---
    if (this.nombreEscenaActual === 'mapaPrincipal') {
      if (this.entrada.estaPresionada('referencia') && !this._bloqueoReferencia) {
        this.mapaReferencia.alternar();
        this._bloqueoReferencia = true;
      }
      if (!this.entrada.estaPresionada('referencia')) {
        this._bloqueoReferencia = false;
      }

      // Cerrar el mapa con Escape también
      if (this.mapaReferencia.visible && this.entrada.estaPresionada('cancelar') && !this._bloqueoReferencia) {
        this.mapaReferencia.ocultar();
        this._bloqueoReferencia = true;
      }

      // Si el mapa de referencia está abierto, no actualizar la escena
      if (this.mapaReferencia.visible) return;
    }

    if (this.escenaActual && typeof this.escenaActual.actualizar === 'function') {
      this.escenaActual.actualizar(dt, this.entrada, this.jugador, this.companeros);
    }

    // --- Muerte global: si la vida llega a 0, volver al mapa ---
    // Aplica a cualquier mundo donde el jugador pueda recibir daño.
    // Muestra mensaje cómico, reproduce sonido de muerte y pausa 2.5s
    // antes de volver al mapa para que el jugador vea qué pasó.
    if (this.jugador && this.jugador.vida <= 0 && this.escenasJugables.includes(this.nombreEscenaActual)
        && this.nombreEscenaActual !== 'mapaPrincipal' && !this._muerteEnCurso) {
      this._muerteEnCurso = true;
      this.jugador.vida = 0; // Mantener en 0 durante la pausa

      // Sonido cómico de muerte ("wah wah waaah")
      if (this.sfx) this.sfx.muerte();

      // Mensaje aleatorio
      const textos = this.idiomas.traducciones[this.idiomas.idiomaActual];
      const frases = textos?.interfaz?.muerteFrases || [
        'Se hizo lo que se pudo, bye...',
        'Houston, we have a problem...',
        'Game over, man!',
        'GG no re'
      ];
      const frase = frases[Math.floor(Math.random() * frases.length)];
      this.mostrarToast(frase, 4);

      // Guardar la escena donde murió para respawnear en el nodo correcto
      this._escenaMuerte = this.nombreEscenaActual;

      // Pausa de 2.5 segundos antes de volver al mapa
      setTimeout(() => {
        if (this.jugador) {
          this.jugador.vida = Math.ceil((this.jugador.vidaMaxima || 100) * 0.3);
        }
        this._muerteEnCurso = false;
        this.cambiarEscena('mapaPrincipal');
      }, 2500);
    }

    // --- Actualizar clima si está activo ---
    if (this._climaActivo) {
      this.clima.actualizar(dt);
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

    // --- Clima se dibuja ENCIMA de la escena pero debajo de overlays ---
    if (this._climaActivo) {
      this.clima.dibujar(this.ctx, ANCHO_JUEGO, ALTO_JUEGO);
    }

    // --- Combate se dibuja ENCIMA de la escena (overlay) ---
    if (this.combate.enCombate) {
      this.combate.dibujar(this.ctx, ANCHO_JUEGO, ALTO_JUEGO, textos?.combate, this.jugador);
    }

    // --- Batú se dibuja ENCIMA de la escena (overlay) ---
    if (this.batu.enJuego) {
      this.batu.dibujar(this.ctx, ANCHO_JUEGO, ALTO_JUEGO, textos?.batu);
    }

    // --- Mini-juegos LFSD se dibujan como overlays ---
    if (this.calibracion.enJuego) {
      this.calibracion.dibujar(this.ctx, ANCHO_JUEGO, ALTO_JUEGO, textos?.calibracion);
    }
    if (this.programacion.enJuego) {
      this.programacion.dibujar(this.ctx, ANCHO_JUEGO, ALTO_JUEGO, textos?.programacion);
    }
    if (this.conexion.enJuego) {
      this.conexion.dibujar(this.ctx, ANCHO_JUEGO, ALTO_JUEGO, textos?.conexion);
    }

    // --- Registro de misiones (overlay con tecla L) ---
    if (this.registro.visible) {
      this.registro.dibujar(this.ctx, ANCHO_JUEGO, ALTO_JUEGO, textos);
    }

    // --- Medidor de reputación debajo de la barra de vida ---
    // Se dibuja en la esquina superior izquierda, justo debajo de Vida
    // (la barra de vida ocupa y=10 a y=24, así que empezamos en y=30)
    if (this.jugador && !this.inventario.abierto && !this.registro.visible) {
      this.reputacion.dibujarMedidor(this.ctx, 10, 30, 120, textos);
    }

    // --- Álbum de fotos (overlay con tecla P) ---
    if (this.album.visible) {
      this.album.dibujar(this.ctx, ANCHO_JUEGO, ALTO_JUEGO, textos);
    }

    // --- Pista de foto/selfie cuando hay objetivo cercano ---
    // Muestra [T] Foto | [G] Selfie si el jugador está cerca de algo fotografiable
    if (this.jugador && !this.album.visible && !this.inventario.abierto
        && !this.registro.visible && !this.combate.enCombate && !this.batu.enJuego) {
      this._dibujarPistaFoto(this.ctx, ANCHO_JUEGO, ALTO_JUEGO, textos);
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

    // --- Guardar estado del mundo actual antes de salir ---
    // Esto preserva diálogos hechos, objetos recogidos, etc.
    this._guardarEstadoMundo();

    // Avisar a la escena actual que nos vamos
    if (this.escenaActual && typeof this.escenaActual.salir === 'function') {
      this.escenaActual.salir();
    }

    // Cambiar a la nueva escena
    this.escenaActual = this.escenas[nombreEscena];
    this.nombreEscenaActual = nombreEscena;

    // Si entramos a un nivel jugable, creamos al jugador ANTES de iniciar
    // la escena, para que la escena pueda posicionarlo y configurarlo
    if (this.escenasJugables.includes(nombreEscena) && !this.jugador) {
      this.jugador = new Jugador(60, 350, this.generoJugador);
    }

    // --- Configurar clima según la escena ---
    // Solo se activa en mundos exteriores (no cuevas, submarino ni interiores)
    const climaPorEscena = {
      mapaPrincipal: 'soleado',
      asentamientoTaino1: 'soleado',
      asentamientoTaino2: 'soleado',
      mundoColonial: 'nublado',
      zonaColonial: 'soleado'
    };

    if (climaPorEscena[nombreEscena]) {
      this._climaActivo = true;
      this.clima.cambiarClima(climaPorEscena[nombreEscena]);
    } else {
      this._climaActivo = false;
      // Detener sonidos ambientales al salir de escenas con clima
      this.clima.detenerSonidos();
    }

    // Preparar la nueva escena.
    // Le pasamos referencia a este juego para que pueda acceder
    // a los sistemas compartidos y cambiar a otras escenas.
    if (typeof this.escenaActual.iniciar === 'function') {
      this.escenaActual.iniciar(this);
    }

    // --- Restaurar estado del mundo después de iniciar ---
    // Esto recupera NPCs hablados, objetos recogidos, etc.
    this._restaurarEstadoMundo(nombreEscena);

    // --- Auto-guardado al volver al mapa ---
    // Cuando el jugador regresa al mapa del mundo (después de completar
    // un nivel o presionar M), guardamos automáticamente. Así nunca
    // pierde su progreso. No guardamos al entrar a menús ni cinemáticas.
    if (nombreEscena === 'mapaPrincipal' && this.jugador) {
      this.guardarPartida();
    }
  }

  // --- PERSISTENCIA DE ESTADO POR MUNDO ---
  // Guarda el estado de NPCs hablados, objetos recogidos y otros
  // datos persistentes de cada mundo en progreso.mundos.
  // Esto permite que al re-entrar, el estado se preserve.

  _guardarEstadoMundo() {
    if (!this.escenaActual || !this.nombreEscenaActual) return;
    if (!this.escenasJugables.includes(this.nombreEscenaActual)) return;

    const escena = this.escenaActual;
    if (!this.progreso.mundos) this.progreso.mundos = {};
    const estado = {};

    // NPCs — guardar IDs de los que ya tienen dialogoHecho
    if (escena.npcs?.length) {
      estado.npcsHablados = escena.npcs
        .filter(n => n.dialogoHecho)
        .map(n => n.id);
    }

    // Objetos coleccionables — guardar tipos de los recogidos
    if (escena.objetos?.length) {
      estado.objetosRecogidos = escena.objetos
        .filter(o => o.recogido)
        .map(o => o.tipo);
    }

    // Petroglifos (Cuevas Pomier) — guardar índices descubiertos
    if (escena.petroglifos?.length) {
      estado.petroglifosDescubiertos = [];
      escena.petroglifos.forEach((p, i) => {
        if (p.descubierto) estado.petroglifosDescubiertos.push(i);
      });
    }

    // Desechos (Santuario Manatí) — guardar índices recogidos
    if (escena.desechos?.length) {
      estado.desechosRecogidos = [];
      escena.desechos.forEach((d, i) => {
        if (d.recogido) estado.desechosRecogidos.push(i);
      });
    }

    // Flags específicos de cada mundo
    if (escena._cassaConversacion !== undefined)
      estado.cassaConversacion = escena._cassaConversacion;
    if (escena._sospechosoHablado !== undefined)
      estado.sospechosoHablado = escena._sospechosoHablado;
    if (escena._batuOfrecido !== undefined)
      estado.batuOfrecido = escena._batuOfrecido;
    if (escena._batuCompletado !== undefined)
      estado.batuCompletado = escena._batuCompletado;
    if (escena.arqueologaDialogoHecho !== undefined)
      estado.arqueologaDialogoHecho = escena.arqueologaDialogoHecho;

    // Contadores de diálogo rotativo (LFSD y otros mundos)
    if (escena._dialogoRotativo) {
      estado.dialogoRotativo = { ...escena._dialogoRotativo };
    }

    this.progreso.mundos[this.nombreEscenaActual] = estado;
  }

  _restaurarEstadoMundo(nombreEscena) {
    const estado = this.progreso?.mundos?.[nombreEscena];
    if (!estado) return;

    const escena = this.escenaActual;
    if (!escena) return;

    // Restaurar NPCs — marcar dialogoHecho y desactivar combate resuelto
    if (estado.npcsHablados?.length && escena.npcs?.length) {
      escena.npcs.forEach(npc => {
        if (estado.npcsHablados.includes(npc.id)) {
          npc.dialogoHecho = true;
          // Si era NPC de combate, desactivar (el combate ya se resolvió)
          if (npc.esCombate) npc.esCombate = false;
        }
      });
    }

    // Restaurar objetos recogidos
    if (estado.objetosRecogidos?.length && escena.objetos?.length) {
      escena.objetos.forEach(obj => {
        if (estado.objetosRecogidos.includes(obj.tipo)) {
          obj.recogido = true;
        }
      });
    }

    // Restaurar petroglifos
    if (estado.petroglifosDescubiertos?.length && escena.petroglifos?.length) {
      estado.petroglifosDescubiertos.forEach(i => {
        if (escena.petroglifos[i]) escena.petroglifos[i].descubierto = true;
      });
    }

    // Restaurar desechos
    if (estado.desechosRecogidos?.length && escena.desechos?.length) {
      estado.desechosRecogidos.forEach(i => {
        if (escena.desechos[i]) escena.desechos[i].recogido = true;
      });
      // Actualizar contador
      escena.desechosRecogidos = escena.desechos.filter(d => d.recogido).length;
    }

    // Restaurar flags específicos
    if (estado.cassaConversacion !== undefined)
      escena._cassaConversacion = estado.cassaConversacion;
    if (estado.sospechosoHablado !== undefined)
      escena._sospechosoHablado = estado.sospechosoHablado;
    if (estado.batuOfrecido !== undefined)
      escena._batuOfrecido = estado.batuOfrecido;
    if (estado.batuCompletado !== undefined)
      escena._batuCompletado = estado.batuCompletado;
    if (estado.arqueologaDialogoHecho !== undefined)
      escena.arqueologaDialogoHecho = estado.arqueologaDialogoHecho;

    // Restaurar contadores de diálogo rotativo
    if (estado.dialogoRotativo && escena._dialogoRotativo) {
      Object.assign(escena._dialogoRotativo, estado.dialogoRotativo);
    }

    // Actualizar contador de NPCs hablados (lo recalculan en actualizar())
    if (escena.npcs?.length) {
      const hablados = escena.npcs.filter(n =>
        n.dialogoHecho && !n.esMentor && n.id !== 'sospechoso'
      ).length;
      if (escena.npcsHablados !== undefined) escena.npcsHablados = hablados;
    }
  }

  // --- GUARDADO Y CARGA DE PARTIDA ---
  // El juego se guarda automáticamente cuando el jugador vuelve al mapa
  // desde un nivel. También se puede guardar manualmente desde opciones.
  // La carga restaura el estado completo: progreso, inventario,
  // compañeros, vida, idioma y la escena donde estaba el jugador.

  /**
   * Guarda la partida actual en localStorage.
   * Se llama automáticamente al volver al mapa del mundo y al
   * completar un nodo. El jugador verá un toast confirmando.
   */
  guardarPartida() {
    const datos = this.guardado.crearDatosGuardado(this);
    const exito = this.guardado.guardarLocal(datos);
    if (exito) {
      this.mostrarToast('💾 Partida guardada');
    }
    return exito;
  }

  /**
   * Carga una partida guardada y restaura el estado del juego.
   * Se llama desde "Continuar Juego" en el menú principal.
   * Reconstruye el jugador, los compañeros, el inventario y
   * lleva al jugador a la escena donde estaba (o al mapa).
   */
  // --- REINICIAR ESTADO ---
  // Limpia TODO el progreso en memoria para empezar una partida nueva.
  // Se llama desde la pantalla de selección de personaje al confirmar.
  // NO borra el guardado en localStorage (eso se sobreescribe al guardar).
  reiniciarEstado() {
    // Progreso del mundo
    this.progreso = {
      nodosCompletados: [],
      nodosDesbloqueados: [0],
      combatesPacificados: 0,
      combatesViolentos: 0,
      accionesEcologicas: 0,
      mundos: {}
    };
    // Compañeros
    this.companeros = [];
    // Inventario (UI y jugador)
    this.inventario = new Inventario();
    this.inventario.alUsar = (objeto, jugador) => {
      if (objeto.tipo === 'curacion') {
        this.mostrarToast(`💚 ${objeto.nombre} — +${objeto.valor || 20} vida`);
      }
    };
    // Álbum de fotos
    this.album = new AlbumFotos();
    // Reputación
    this.reputacion = new SistemaReputacion();
    // Misiones secundarias
    this.misiones = new MisionesSecundarias();
    // Registro de juego (diario)
    this.registro = new RegistroJuego(this);
    // Jugador (se recreará en la intro, pero limpiamos por seguridad)
    this.jugador = null;
  }

  cargarPartida() {
    const datos = this.guardado.cargarLocal();
    if (!datos) {
      this.mostrarToast('No hay partida guardada');
      return false;
    }

    // --- Restaurar género del personaje ---
    this.generoJugador = datos.generoJugador || 'pepito';

    // --- Restaurar progreso del mapa ---
    if (datos.progreso) {
      this.progreso.nodosCompletados = datos.progreso.nodosCompletados || [];
      this.progreso.nodosDesbloqueados = datos.progreso.nodosDesbloqueados || [0];
      this.progreso.combatesPacificados = datos.progreso.combatesPacificados || 0;
      this.progreso.combatesViolentos = datos.progreso.combatesViolentos || 0;
      this.progreso.accionesEcologicas = datos.progreso.accionesEcologicas || 0;
      this.progreso.robotProgramado = datos.progreso.robotProgramado || false;
      this.progreso.magnetometroCalibrado = datos.progreso.magnetometroCalibrado || false;
      this.progreso.equipoReparado = datos.progreso.equipoReparado || false;
      this.progreso.equipoEntregado = datos.progreso.equipoEntregado || false;
      this.progreso.descubrimientoCientifico = datos.progreso.descubrimientoCientifico || false;
      this.progreso.periodicoRecogido = datos.progreso.periodicoRecogido || false;
      this.progreso.naufragiosRobotDescubiertos = datos.progreso.naufragiosRobotDescubiertos || false;
      this.progreso.manatiLiberado = datos.progreso.manatiLiberado || false;
      this.progreso.arrecifeLimpiado = datos.progreso.arrecifeLimpiado || false;
      // Estado persistente por mundo (NPCs hablados, objetos recogidos, etc.)
      this.progreso.mundos = datos.progreso.mundos || {};
    }

    // --- Restaurar idioma ---
    if (datos.idioma && this.idiomas) {
      this.idiomas.cambiarIdioma(datos.idioma);
    }

    // --- Crear al jugador con el género correcto ---
    this.jugador = new Jugador(60, 350, this.generoJugador);

    // --- Restaurar vida ---
    if (datos.vida !== undefined) {
      this.jugador.vida = datos.vida;
    }

    // --- Restaurar inventario simple del jugador ---
    if (datos.inventarioJugador) {
      this.jugador.inventario = datos.inventarioJugador;
    }

    // --- Restaurar inventario UI ---
    if (datos.inventario && this.inventario) {
      this.inventario.objetos = datos.inventario;
    }

    // --- Restaurar compañeros ---
    // Recreamos las instancias de clase a partir de los datos guardados
    this._restaurarCompaneros(datos.companeros || []);

    // --- Restaurar reputación ---
    if (datos.reputacion !== undefined) {
      this.reputacion.puntos = datos.reputacion;
    }

    // --- Restaurar misiones secundarias ---
    if (datos.misiones) {
      this.misiones.restaurar(datos.misiones);
    }

    // --- Restaurar registro de misiones ---
    if (datos.registroEntradas) {
      this.registro.entradas = datos.registroEntradas;
    }

    // --- Restaurar álbum de fotos (solo metadata) ---
    if (datos.albumFotos) {
      this.album.deserializar(datos.albumFotos);
    }

    // --- Ir a la escena guardada ---
    // Si estaba en un nivel, lo llevamos al mapa para que no empiece
    // a mitad de un nivel sin contexto. Si estaba en el mapa, al mapa.
    const escenaDestino = datos.escena === 'mapaPrincipal'
      ? 'mapaPrincipal'
      : 'mapaPrincipal'; // Siempre al mapa — más seguro que retomar a mitad de nivel
    this.cambiarEscena(escenaDestino);

    this.mostrarToast('📂 Partida cargada');
    return true;
  }

  /**
   * Recrea los compañeros a partir de los datos guardados.
   * Cada compañero se instancia con su clase real (Magnoboot, Viralata,
   * CemiMurcielago) para que tenga su sprite y comportamiento completo.
   */
  _restaurarCompaneros(datosCompaneros) {
    // No borramos los compañeros existentes si no hay datos,
    // para evitar perder compañeros por un guardado incompleto
    if (datosCompaneros.length === 0) return;

    this.companeros = [];

    for (const datos of datosCompaneros) {
      const companero = this._crearCompaneroBasico(datos.tipo, datos.activo);
      if (companero) {
        this.companeros.push(companero);
      }
    }
  }

  /**
   * Crea un compañero real a partir de su tipo guardado.
   * Usamos las clases importadas (Magnoboot, Viralata, CemiMurcielago)
   * para que el compañero tenga su sprite y comportamiento completo.
   */
  _crearCompaneroBasico(tipo, activo) {
    let companero = null;

    if (tipo === 'magnoboot') {
      companero = new Magnoboot();
    } else if (tipo === 'viralata') {
      companero = new Viralata();
    } else if (tipo === 'cemiMurcielago') {
      companero = new CemiMurcielago();
    }

    if (companero && activo) {
      companero.activar();
    }

    return companero;
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

    // Lista de niveles — con scroll si hay muchos
    const altoOpcion = 32;
    const maxVisibles = 10;
    const inicioY = 120;

    // Calcular scroll para mantener la selección visible
    const totalNiveles = this._listaNiveles.length;
    let scrollOffset = 0;
    if (totalNiveles > maxVisibles) {
      // Centrar la selección en la lista visible
      scrollOffset = Math.max(0,
        Math.min(this._nivelSeleccionado - Math.floor(maxVisibles / 2),
          totalNiveles - maxVisibles));
    }

    const visibleDesde = scrollOffset;
    const visibleHasta = Math.min(totalNiveles, scrollOffset + maxVisibles);

    // Indicador de scroll arriba
    if (visibleDesde > 0) {
      ctx.fillStyle = '#888888';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('▲ más niveles', ancho / 2, inicioY - 5);
    }

    for (let i = visibleDesde; i < visibleHasta; i++) {
      const y = inicioY + (i - visibleDesde) * altoOpcion;
      const nivel = this._listaNiveles[i];
      const seleccionado = (i === this._nivelSeleccionado);

      // Fondo de la opción seleccionada
      if (seleccionado) {
        ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
        ctx.fillRect(ancho / 2 - 200, y - 3, 400, 28);

        // Borde dorado
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.strokeRect(ancho / 2 - 200, y - 3, 400, 28);
      }

      // Número y nombre
      ctx.fillStyle = seleccionado ? '#FFD700' : '#FFFFFF';
      ctx.font = seleccionado ? 'bold 16px monospace' : '14px monospace';
      ctx.textAlign = 'center';

      const flecha = seleccionado ? '▸ ' : '  ';
      ctx.fillText(`${flecha}${i + 1}. ${nivel.nombre}`, ancho / 2, y + 16);
    }

    // Indicador de scroll abajo
    if (visibleHasta < totalNiveles) {
      ctx.fillStyle = '#888888';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('▼ más niveles', ancho / 2, inicioY + maxVisibles * altoOpcion + 10);
    }

    // Instrucciones
    ctx.fillStyle = '#888888';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    const yInstrucciones = inicioY + Math.min(totalNiveles, maxVisibles) * altoOpcion + 25;
    ctx.fillText('↑↓: elegir  |  E: ir al nivel  |  Q: cerrar', ancho / 2, yInstrucciones);
  }

  // --- ÁLBUM DE FOTOS: DETECCIÓN DE OBJETIVOS ---
  // Busca NPCs, petroglifos, objetos y otros elementos fotografiables
  // que estén cerca del jugador en la escena actual.

  /**
   * Busca el objetivo fotografiable más cercano al jugador.
   * Revisa NPCs, petroglifos y objetos de la escena actual.
   * Devuelve { nombre, descripcion, x, y } o null si no hay nada cerca.
   */
  _buscarObjetivoFotografico() {
    const escena = this.escenaActual;
    const jugador = this.jugador;
    if (!escena || !jugador) return null;

    const RANGO_FOTO = 80; // Pixeles de distancia máxima para tomar foto
    let mejorObjetivo = null;
    let mejorDistancia = RANGO_FOTO;

    // --- Buscar en NPCs ---
    if (escena.npcs?.length) {
      for (const npc of escena.npcs) {
        if (!npc.activo && npc.activo !== undefined) continue;
        const dx = (npc.x || 0) - jugador.x;
        const dy = (npc.y || 0) - jugador.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mejorDistancia) {
          mejorDistancia = dist;
          mejorObjetivo = {
            nombre: npc.nombre || npc.id || 'NPC',
            descripcion: npc.descripcion || '',
            x: npc.x || 0,
            y: npc.y || 0,
            entidad: npc,          // Referencia directa al NPC para dibujar su sprite
            tipoEntidad: 'npc'     // Tipo de entidad para elegir el estilo de retrato
          };
        }
      }
    }

    // --- Buscar en petroglifos ---
    if (escena.petroglifos?.length) {
      for (const petro of escena.petroglifos) {
        const dx = (petro.x || 0) - jugador.x;
        const dy = (petro.y || 0) - jugador.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mejorDistancia) {
          mejorDistancia = dist;
          mejorObjetivo = {
            nombre: petro.nombre || petro.tipo || 'Petroglifo',
            descripcion: petro.descripcion || '',
            x: petro.x || 0,
            y: petro.y || 0,
            entidad: petro,            // Referencia al petroglifo para dibujar su símbolo
            tipoEntidad: 'petroglifo'  // Tipo para fondo de cueva y símbolo taíno
          };
        }
      }
    }

    // --- Buscar en objetos coleccionables ---
    if (escena.objetos?.length) {
      for (const obj of escena.objetos) {
        if (obj.recogido) continue; // Ignorar objetos ya recogidos
        const dx = (obj.x || 0) - jugador.x;
        const dy = (obj.y || 0) - jugador.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mejorDistancia) {
          mejorDistancia = dist;
          mejorObjetivo = {
            nombre: obj.nombre || obj.tipo || 'Objeto',
            descripcion: obj.descripcion || '',
            x: obj.x || 0,
            y: obj.y || 0,
            entidad: obj,          // Referencia al objeto para dibujar su sprite
            tipoEntidad: 'objeto'  // Tipo para fondo ámbar y brillo dorado
          };
        }
      }
    }

    return mejorObjetivo;
  }

  /**
   * Dibuja la pista "[T] Foto | [G] Selfie" cuando hay un objetivo
   * fotografiable cerca del jugador. Aparece debajo de los demás
   * prompts (como [E] Hablar) para no taparlos.
   */
  _dibujarPistaFoto(ctx, ancho, alto, textos) {
    const objetivo = this._buscarObjetivoFotografico();
    if (!objetivo) return;

    const t = textos?.album || {};
    const textoFoto = t.tomarFoto || '[T] Foto';
    const textoSelfie = t.tomarSelfie || '[G] Selfie';

    // Indicadores de foto ya tomada
    const yaFoto = this.album.tieneFoto(objetivo.nombre);
    const yaSelfie = this.album.tieneSelfie(objetivo.nombre);

    ctx.save();
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';

    // Posición: parte inferior de la pantalla, centrado
    const y = alto - 45;
    const textoCompleto = `${textoFoto}${yaFoto ? ' ✓' : ''} | ${textoSelfie}${yaSelfie ? ' ✓' : ''}`;

    // Fondo semitransparente
    const medida = ctx.measureText(textoCompleto);
    const anchoFondo = medida.width + 20;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(ancho / 2 - anchoFondo / 2, y - 12, anchoFondo, 18);

    // Texto
    ctx.fillStyle = '#FFDD44';
    ctx.fillText(textoCompleto, ancho / 2, y);
    ctx.restore();
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
