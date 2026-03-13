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

    // Modo de control táctil: 'joystick' (analógico) o 'dpad' (cruceta con botones)
    // El jugador puede cambiar esto desde Opciones en el menú principal.
    // Se guarda en localStorage para recordar la preferencia.
    this.modoControlTactil = 'joystick';
    try {
      const guardado = localStorage.getItem('arclycee_control_tactil');
      if (guardado === 'dpad') this.modoControlTactil = 'dpad';
    } catch (e) {
      // localStorage no disponible — usamos el valor por defecto
    }

    // Referencia al contenedor donde se insertan los controles táctiles
    // (necesario para poder recrearlos al cambiar de modo)
    this._contenedorTactil = null;

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

    // Cuando la ventana pierde el foco (ej: el jugador abre otra pestaña),
    // limpiamos todas las teclas presionadas. Sin esto, las teclas quedan
    // "pegadas" porque el evento keyup se dispara en la otra pestaña y
    // esta ventana nunca lo recibe.
    this.funcionPerderFoco = () => {
      this.teclasPresionadas.clear();
    };

    window.addEventListener('keydown', this.funcionTeclaAbajo);
    window.addEventListener('keyup', this.funcionTeclaArriba);
    window.addEventListener('blur', this.funcionPerderFoco);
  }

  // --- CONTROLES TÁCTILES ---

  /**
   * Crea controles virtuales en la pantalla para dispositivos táctiles:
   * - Un JOYSTICK analógico a la izquierda (reemplaza el d-pad)
   * - Botones de acción a la derecha (A, B, X, Y, SALTO)
   * Los ponemos dentro del 'contenedor' que nos pasen (normalmente document.body).
   */
  iniciarTactil(contenedor) {
    this._contenedorTactil = contenedor;

    // --- CONTROL DE MOVIMIENTO ---
    // Creamos el joystick O el d-pad según la preferencia del jugador
    if (this.modoControlTactil === 'dpad') {
      this._crearDpad(contenedor);
    } else {
      this._crearJoystick(contenedor);
    }

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

  // --- JOYSTICK VIRTUAL ---

  /**
   * Crea un joystick analógico virtual dibujado en un <canvas>.
   * Funciona así:
   * 1. El jugador toca dentro del círculo base
   * 2. Al arrastrar el dedo, el "stick" sigue al dedo (con un límite máximo)
   * 3. Según la dirección y distancia del stick, activamos las acciones
   *    de movimiento (arriba, abajo, izquierda, derecha)
   * 4. Al soltar, el stick vuelve al centro y se desactivan las acciones
   *
   * Usamos un <canvas> en vez de elementos HTML porque necesitamos
   * dibujar círculos suaves y actualizarlos en cada frame del touch.
   */
  _crearJoystick(contenedor) {
    // Tamaño del joystick en píxeles
    const TAMANO = 160;         // Tamaño total del área táctil
    const RADIO_BASE = 65;      // Radio del círculo exterior (la base)
    const RADIO_STICK = 28;     // Radio del círculo interior (el stick que se mueve)
    const ZONA_MUERTA = 0.15;   // Porcentaje mínimo para activar dirección (evita falsos positivos)

    // Creamos un <canvas> para dibujar el joystick
    const canvas = document.createElement('canvas');
    canvas.width = TAMANO;
    canvas.height = TAMANO;
    canvas.className = 'joystick-canvas';
    canvas.style.position = 'fixed';
    canvas.style.bottom = '30px';
    canvas.style.left = '20px';
    canvas.style.zIndex = '800';
    canvas.style.touchAction = 'none';           // Evita scroll/zoom al tocar
    canvas.style.userSelect = 'none';
    canvas.style.webkitUserSelect = 'none';
    canvas.style.display = 'none';               // Oculto por defecto (CSS lo muestra en táctil)

    const ctx = canvas.getContext('2d');
    const centro = TAMANO / 2;                    // Centro del canvas

    // Estado del joystick: posición actual del stick (0,0 = centro)
    let stickX = 0;
    let stickY = 0;
    let tocando = false;                          // ¿Está el dedo sobre el joystick?
    let touchId = null;                           // ID del toque activo (para multitouch)

    // --- Función para dibujar el joystick ---
    // Se llama cada vez que el dedo se mueve para actualizar la visual.
    const dibujar = () => {
      ctx.clearRect(0, 0, TAMANO, TAMANO);

      // Círculo base (el anillo exterior fijo)
      ctx.beginPath();
      ctx.arc(centro, centro, RADIO_BASE, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Cruz sutil en el centro para indicar los ejes
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.moveTo(centro, centro - RADIO_BASE * 0.6);
      ctx.lineTo(centro, centro + RADIO_BASE * 0.6);
      ctx.moveTo(centro - RADIO_BASE * 0.6, centro);
      ctx.lineTo(centro + RADIO_BASE * 0.6, centro);
      ctx.stroke();

      // Stick (el círculo que se mueve con el dedo)
      const posX = centro + stickX * RADIO_BASE;
      const posY = centro + stickY * RADIO_BASE;

      // Sombra sutil del stick
      ctx.beginPath();
      ctx.arc(posX + 2, posY + 2, RADIO_STICK, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fill();

      // El stick en sí
      ctx.beginPath();
      ctx.arc(posX, posY, RADIO_STICK, 0, Math.PI * 2);
      // Color cambia cuando está siendo tocado (dorado = activo)
      if (tocando) {
        ctx.fillStyle = 'rgba(232, 168, 56, 0.5)';
        ctx.strokeStyle = 'rgba(232, 168, 56, 0.7)';
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      }
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    // --- Función para convertir posición del stick en acciones de movimiento ---
    // Activa/desactiva las 4 direcciones según hacia dónde apunta el stick.
    // La zona muerta evita que movimientos mínimos activen direcciones.
    const actualizarAcciones = () => {
      // Limpiar todas las direcciones primero
      this.accionesTocadas.delete('arriba');
      this.accionesTocadas.delete('abajo');
      this.accionesTocadas.delete('izquierda');
      this.accionesTocadas.delete('derecha');

      if (!tocando) return;

      // Solo activar si el stick está fuera de la zona muerta
      const distancia = Math.sqrt(stickX * stickX + stickY * stickY);
      if (distancia < ZONA_MUERTA) return;

      // Activar direcciones según la posición del stick.
      // Usamos umbrales independientes para X e Y para permitir
      // movimiento diagonal (ej: arriba + derecha al mismo tiempo).
      if (stickX < -ZONA_MUERTA) this.accionesTocadas.set('izquierda', true);
      if (stickX > ZONA_MUERTA)  this.accionesTocadas.set('derecha', true);
      if (stickY < -ZONA_MUERTA) this.accionesTocadas.set('arriba', true);
      if (stickY > ZONA_MUERTA)  this.accionesTocadas.set('abajo', true);
    };

    // --- Calcular posición del stick a partir de la posición del dedo ---
    const procesarToque = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      // Convertir coordenadas de pantalla a coordenadas del canvas
      const dx = clientX - rect.left - centro;
      const dy = clientY - rect.top - centro;

      // Calcular distancia del dedo al centro (normalizada de 0 a 1)
      const distancia = Math.sqrt(dx * dx + dy * dy);
      const distanciaMaxima = RADIO_BASE;

      if (distancia > distanciaMaxima) {
        // Si el dedo está fuera del radio, limitamos el stick al borde
        // (como un joystick real que no puede salirse de su base)
        stickX = dx / distancia;
        stickY = dy / distancia;
      } else {
        // Normalizamos entre -1 y 1
        stickX = dx / distanciaMaxima;
        stickY = dy / distanciaMaxima;
      }

      actualizarAcciones();
      dibujar();
    };

    // --- Eventos táctiles ---

    canvas.addEventListener('touchstart', (evento) => {
      evento.preventDefault();
      // Solo aceptamos un dedo a la vez en el joystick
      if (touchId !== null) return;
      const toque = evento.changedTouches[0];
      touchId = toque.identifier;
      tocando = true;
      procesarToque(toque.clientX, toque.clientY);
    });

    canvas.addEventListener('touchmove', (evento) => {
      evento.preventDefault();
      // Buscamos el toque que pertenece a NUESTRO joystick
      // (puede haber otros dedos tocando botones de acción)
      for (const toque of evento.changedTouches) {
        if (toque.identifier === touchId) {
          procesarToque(toque.clientX, toque.clientY);
          break;
        }
      }
    });

    // Al soltar, el stick vuelve al centro
    const soltar = (evento) => {
      for (const toque of evento.changedTouches) {
        if (toque.identifier === touchId) {
          tocando = false;
          touchId = null;
          stickX = 0;
          stickY = 0;
          actualizarAcciones();
          dibujar();
          break;
        }
      }
    };

    canvas.addEventListener('touchend', (evento) => {
      evento.preventDefault();
      soltar(evento);
    });

    canvas.addEventListener('touchcancel', (evento) => {
      soltar(evento);
    });

    // Dibujo inicial (stick centrado)
    dibujar();

    contenedor.appendChild(canvas);
    this.elementosTactiles.push(canvas);
  }

  // --- D-PAD (cruceta direccional clásica) ---

  /**
   * Crea 4 botones de dirección dispuestos en forma de cruz.
   * Es la alternativa al joystick — algunos jugadores prefieren
   * botones discretos porque dan un feedback táctil más claro.
   */
  _crearDpad(contenedor) {
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
  }

  // --- CAMBIAR MODO DE CONTROL ---

  /**
   * Cambia entre joystick y d-pad en vivo.
   * Destruye los controles de movimiento actuales y crea los nuevos.
   * Los botones de acción (A, B, X, Y, SALTO) no se tocan.
   * @param {string} modo - 'joystick' o 'dpad'
   */
  cambiarModoTactil(modo) {
    if (modo !== 'joystick' && modo !== 'dpad') return;
    if (modo === this.modoControlTactil) return;

    this.modoControlTactil = modo;

    // Guardar preferencia en localStorage
    try {
      localStorage.setItem('arclycee_control_tactil', modo);
    } catch (e) {
      // localStorage no disponible — no pasa nada
    }

    // Si no hay contenedor (teclado puro), no hay nada que cambiar
    if (!this._contenedorTactil) return;

    // Quitar el control de movimiento actual (joystick o d-pad)
    // pero conservar los botones de acción (el último elemento)
    const botonesAccion = this.elementosTactiles.pop(); // sacar botones de acción
    for (const elemento of this.elementosTactiles) {
      if (elemento.parentNode) {
        elemento.parentNode.removeChild(elemento);
      }
    }
    this.elementosTactiles = [];

    // Limpiar direcciones que pudieran estar activas
    this.accionesTocadas.delete('arriba');
    this.accionesTocadas.delete('abajo');
    this.accionesTocadas.delete('izquierda');
    this.accionesTocadas.delete('derecha');

    // Crear el nuevo control de movimiento
    if (modo === 'dpad') {
      this._crearDpad(this._contenedorTactil);
    } else {
      this._crearJoystick(this._contenedorTactil);
    }

    // Re-agregar los botones de acción al final
    this.elementosTactiles.push(botonesAccion);
  }

  /**
   * Crea un solo botón táctil (para los botones de acción A, B, X, Y, SALTO).
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
    if (this.funcionPerderFoco) {
      window.removeEventListener('blur', this.funcionPerderFoco);
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
