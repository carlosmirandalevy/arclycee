// ============================================================
// ENTRADA.JS - Escucha lo que el jugador quiere hacer
// ============================================================
// Este módulo traduce las teclas del teclado Y los toques en
// pantalla táctil a "acciones" del juego (moverse, saltar, etc).
// Así el resto del código nunca necesita saber SI el jugador
// usa teclado o celular — solo pregunta "¿quiere ir a la derecha?"
// ============================================================

import { TECLAS_POR_DEFECTO } from './configuracion.js';

export class Entrada {

  constructor() {
    // Guardamos qué teclas están presionadas AHORA MISMO.
    // Usamos un Map porque es más rápido que un objeto normal
    // para agregar/quitar cosas constantemente.
    this.teclasPresionadas = new Map();

    // Guardamos qué acciones táctiles están activas.
    // Separamos esto de las teclas para que no se confundan.
    this.accionesTocadas = new Map();

    // Guardamos referencias a los botones táctiles creados
    // para poder destruirlos después si cambiamos de escena.
    this.elementosTactiles = [];

    // Invertimos el mapa de teclas para buscar más rápido:
    // en vez de "arriba → ['w', 'ArrowUp']" hacemos "'w' → arriba"
    // Así cuando el jugador presiona 'w', sabemos al instante que es 'arriba'.
    this.teclaAAccion = new Map();
    for (const [accion, teclas] of Object.entries(TECLAS_POR_DEFECTO)) {
      for (const tecla of teclas) {
        this.teclaAAccion.set(tecla, accion);
      }
    }
  }

  // --- TECLADO ---

  /**
   * Empieza a escuchar el teclado.
   * Necesitamos tanto 'keydown' (tecla presionada) como 'keyup' (tecla soltada)
   * porque queremos saber MIENTRAS está presionada, no solo el momento del clic.
   */
  iniciarTeclado() {
    // Guardamos las funciones como propiedades para poder quitarlas después.
    // Si no las guardamos, no podemos hacer removeEventListener.
    this.funcionTeclaAbajo = (evento) => {
      const accion = this.teclaAAccion.get(evento.key);
      if (accion) {
        // Prevenimos el comportamiento normal del navegador
        // (por ejemplo, que la barra espaciadora haga scroll)
        evento.preventDefault();
        this.teclasPresionadas.set(accion, true);
      }
    };

    this.funcionTeclaArriba = (evento) => {
      const accion = this.teclaAAccion.get(evento.key);
      if (accion) {
        evento.preventDefault();
        this.teclasPresionadas.delete(accion);
      }
    };

    window.addEventListener('keydown', this.funcionTeclaAbajo);
    window.addEventListener('keyup', this.funcionTeclaArriba);
  }

  // --- CONTROLES TÁCTILES ---

  /**
   * Crea botones virtuales en la pantalla para dispositivos táctiles.
   * Los botones son elementos HTML reales que el CSS se encargará de estilizar.
   * Los ponemos dentro del 'contenedor' que nos pasen (normalmente un div).
   */
  iniciarTactil(contenedor) {
    // --- D-PAD (flechas de dirección) ---
    // Creamos un contenedor para las 4 flechas de movimiento.
    // Lo posicionamos en la esquina inferior izquierda porque
    // el pulgar izquierdo controla el movimiento (como un gamepad).
    const dpad = document.createElement('div');
    dpad.className = 'dpad-contenedor';
    this.elementosTactiles.push(dpad);

    const direcciones = [
      { accion: 'arriba',    texto: '\u25B2', clase: 'dpad-arriba' },
      { accion: 'abajo',     texto: '\u25BC', clase: 'dpad-abajo' },
      { accion: 'izquierda', texto: '\u25C0', clase: 'dpad-izquierda' },
      { accion: 'derecha',   texto: '\u25B6', clase: 'dpad-derecha' }
    ];

    for (const dir of direcciones) {
      const boton = this._crearBotonTactil(dir.accion, dir.texto, dir.clase);
      dpad.appendChild(boton);
    }

    contenedor.appendChild(dpad);

    // --- BOTONES DE ACCIÓN ---
    // Los ponemos a la derecha porque el pulgar derecho
    // controla las acciones (como en un control de consola).
    const botonesAccion = document.createElement('div');
    botonesAccion.className = 'acciones-contenedor';
    this.elementosTactiles.push(botonesAccion);

    const acciones = [
      { accion: 'accion',     texto: 'A', clase: 'boton-a' },       // Interactuar
      { accion: 'cancelar',   texto: 'B', clase: 'boton-b' },       // Cancelar
      { accion: 'inventario', texto: 'X', clase: 'boton-x' },       // Inventario
      { accion: 'especial',   texto: 'Y', clase: 'boton-y' },       // Especial
      { accion: 'saltar',     texto: 'SALTO', clase: 'boton-saltar' }
    ];

    for (const acc of acciones) {
      const boton = this._crearBotonTactil(acc.accion, acc.texto, acc.clase);
      botonesAccion.appendChild(boton);
    }

    contenedor.appendChild(botonesAccion);
  }

  /**
   * Crea un solo botón táctil.
   * Usamos touchstart/touchend en vez de click porque click tiene
   * un retraso de ~300ms en celulares y se siente lento para un juego.
   */
  _crearBotonTactil(accion, texto, claseCSS) {
    const boton = document.createElement('button');
    boton.className = `boton-tactil ${claseCSS}`;
    boton.textContent = texto;
    // Evitamos que el navegador seleccione texto al tocar los botones
    boton.style.userSelect = 'none';
    boton.style.webkitUserSelect = 'none';

    // Cuando el dedo TOCA el botón, activamos la acción
    boton.addEventListener('touchstart', (evento) => {
      evento.preventDefault(); // Evita que el navegador haga zoom o scroll
      this.accionesTocadas.set(accion, true);
      boton.classList.add('activo'); // Para que el CSS muestre que está presionado
    });

    // Cuando el dedo SE LEVANTA, desactivamos la acción
    boton.addEventListener('touchend', (evento) => {
      evento.preventDefault();
      this.accionesTocadas.delete(accion);
      boton.classList.remove('activo');
    });

    // Si el dedo se sale del botón sin soltar, también desactivamos.
    // Sin esto, el botón quedaría "pegado" si el jugador desliza el dedo fuera.
    boton.addEventListener('touchcancel', () => {
      this.accionesTocadas.delete(accion);
      boton.classList.remove('activo');
    });

    return boton;
  }

  // --- CONSULTAR ESTADO ---

  /**
   * La función más usada: ¿el jugador quiere hacer esta acción AHORA MISMO?
   * Revisa tanto teclado como pantalla táctil para que funcione en ambos.
   */
  estaPresionada(accion) {
    return this.teclasPresionadas.has(accion) || this.accionesTocadas.has(accion);
  }

  // --- LIMPIEZA ---

  /**
   * Quita todos los event listeners y botones táctiles.
   * SIEMPRE hay que limpiar cuando ya no necesitamos algo,
   * porque si no, se acumulan listeners "fantasma" que gastan memoria
   * y pueden causar bugs raros.
   */
  destruir() {
    // Quitar listeners del teclado
    if (this.funcionTeclaAbajo) {
      window.removeEventListener('keydown', this.funcionTeclaAbajo);
    }
    if (this.funcionTeclaArriba) {
      window.removeEventListener('keyup', this.funcionTeclaArriba);
    }

    // Quitar botones táctiles del DOM
    for (const elemento of this.elementosTactiles) {
      if (elemento.parentNode) {
        elemento.parentNode.removeChild(elemento);
      }
    }

    // Limpiar todos los mapas
    this.teclasPresionadas.clear();
    this.accionesTocadas.clear();
    this.elementosTactiles = [];
  }
}
