// ============================================================
// MENU-PRINCIPAL.JS - La primera pantalla que ve el jugador
// ============================================================
// Este es el "lobby" del juego: desde aquí puedes empezar una
// partida nueva, continuar una vieja, cambiar opciones o ver
// los créditos. También tiene partículas flotantes y una
// animación del título para que no se vea estático y aburrido.
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, CLAVE_GUARDADO } from '../motor/configuracion.js';

export class MenuPrincipal {

  constructor() {
    // Las 6 opciones que puede elegir el jugador en el menú.
    // 'idioma' es una opción directa del menú (no un submenú)
    // porque el jugador necesita poder cambiar el idioma fácilmente
    // sin tener que entrar a "opciones" primero.
    this.opciones = ['nuevoJuego', 'continuarJuego', 'idioma', 'documentacion', 'opciones', 'creditos'];

    // Índice de la opción resaltada (empieza en 0 = "Nuevo Juego")
    this.seleccion = 0;

    // Desplazamiento vertical del título — sube y baja suavemente
    // para darle vida al menú (sin esto se ve como una diapositiva)
    this.animacionTitulo = 0;

    // Partículas flotantes que simulan polvo de cueva en el ambiente
    // Dan profundidad visual sin necesitar imágenes pesadas
    this.particulasAmbientales = [];

    // Guardamos si existe una partida guardada para activar/desactivar
    // la opción "Continuar" — no tiene sentido mostrarla si no hay nada
    this.hayGuardado = false;

    // Controla si estamos mostrando un submenú (opciones o créditos)
    // para no procesar la entrada del menú principal al mismo tiempo
    this.submenuActivo = null;

    // Índice de la opción seleccionada dentro del submenú de opciones
    this.seleccionOpciones = 0;
    // Las opciones configurables (por ahora solo controles táctiles)
    this.opcionesConfig = ['controlesTactiles'];

    // Índice del idioma seleccionado actualmente: 0=ES, 1=FR, 2=EN
    this.idiomaIndice = 0;
    this.codigosIdioma = ['es', 'fr', 'en'];
    this.nombresIdioma = ['Español', 'Français', 'English'];

    // Bloqueo de entrada: evita que una sola pulsación de tecla
    // se registre muchas veces (las teclas se repiten ~60 veces/segundo)
    this.bloqueoEntrada = false;

    // Temporizador del título para la animación sinusoidal
    this.tiempoAnimacion = 0;
  }

  // --- Preparar el menú cuando se entra a esta escena ---
  // Se llama UNA vez al cargar la escena (no cada frame)
  iniciar(juego) {
    this.juego = juego;
    this.seleccion = 0;
    this.submenuActivo = null;

    // Sincronizar el índice de idioma con el idioma actual del juego
    if (juego && juego.idiomas) {
      const indice = this.codigosIdioma.indexOf(juego.idiomas.idiomaActual);
      if (indice >= 0) this.idiomaIndice = indice;
    }

    // Revisamos si hay una partida guardada en el navegador
    // localStorage guarda datos incluso si cierras el navegador
    try {
      const guardado = localStorage.getItem(CLAVE_GUARDADO);
      this.hayGuardado = guardado !== null;
    } catch (error) {
      // Algunos navegadores bloquean localStorage (modo privado)
      // Si eso pasa, simplemente desactivamos "Continuar"
      this.hayGuardado = false;
    }

    // Creamos las partículas iniciales — empezamos con 30 porque
    // es suficiente para verse bonito sin desperdiciar rendimiento
    if (this.particulasAmbientales.length === 0) {
      for (let i = 0; i < 30; i++) {
        this.particulasAmbientales.push(this._crearParticula());
      }
    }
  }

  // --- Crear una partícula con posición y velocidad aleatorias ---
  // Cada partícula es un puntito blanco semitransparente que flota
  _crearParticula() {
    return {
      x: Math.random() * ANCHO_JUEGO,
      y: Math.random() * ALTO_JUEGO,
      // Tamaño entre 1 y 3 pixeles — variedad visual sin ser distractivo
      tamano: Math.random() * 2 + 1,
      // Velocidad lenta hacia arriba para simular polvo flotando
      velocidadX: (Math.random() - 0.5) * 0.3,
      velocidadY: -(Math.random() * 0.5 + 0.1),
      // Opacidad entre 0.2 y 0.6 — visibles pero no gritones
      opacidad: Math.random() * 0.4 + 0.2
    };
  }

  // --- Lógica que corre cada frame ---
  // Recibimos dt, entrada, y parámetros extra del juego que no usamos aquí
  actualizar(dt, entrada, _jugador, _companeros) {
    // Animación del título: oscila suavemente usando seno
    // Math.sin produce una onda suave entre -1 y 1, perfecta para flotar
    this.tiempoAnimacion += dt * 2;
    this.animacionTitulo = Math.sin(this.tiempoAnimacion) * 6;

    // Mover cada partícula y reciclar las que salen de pantalla
    for (let i = 0; i < this.particulasAmbientales.length; i++) {
      const p = this.particulasAmbientales[i];
      p.x += p.velocidadX;
      p.y += p.velocidadY;

      // Si la partícula sale por arriba, la reciclamos abajo
      // Así siempre hay partículas visibles sin crear nuevas constantemente
      if (p.y < -5) {
        this.particulasAmbientales[i] = this._crearParticula();
        this.particulasAmbientales[i].y = ALTO_JUEGO + 5;
      }
    }

    // Si hay un submenú abierto, procesamos su entrada en vez del menú principal
    if (this.submenuActivo) {
      this._actualizarSubmenu(entrada);
      return;
    }

    // --- Navegación del menú ---
    // Solo procesamos si la tecla NO estaba presionada el frame anterior
    // para evitar que salte muchas opciones de golpe
    if (entrada.estaPresionada('arriba') && !this.bloqueoEntrada) {
      this.seleccion--;
      // Si pasamos del principio, volvemos al final (menú circular)
      if (this.seleccion < 0) this.seleccion = this.opciones.length - 1;
      // Saltar la opción "Continuar" si está deshabilitada
      if (this.opciones[this.seleccion] === 'continuarJuego' && !this.hayGuardado) {
        this.seleccion--;
        if (this.seleccion < 0) this.seleccion = this.opciones.length - 1;
      }
      this.bloqueoEntrada = true;

    } else if (entrada.estaPresionada('abajo') && !this.bloqueoEntrada) {
      this.seleccion++;
      // Si pasamos del final, volvemos al principio
      if (this.seleccion >= this.opciones.length) this.seleccion = 0;
      // Saltar la opción "Continuar" si está deshabilitada
      if (this.opciones[this.seleccion] === 'continuarJuego' && !this.hayGuardado) {
        this.seleccion++;
        if (this.seleccion >= this.opciones.length) this.seleccion = 0;
      }
      this.bloqueoEntrada = true;

    } else if (this.opciones[this.seleccion] === 'idioma' && !this.bloqueoEntrada) {
      // --- Cambiar idioma con izquierda/derecha cuando está seleccionada ---
      // Esto es MÁS intuitivo que tener que abrir un submenú: ves "Idioma: Español"
      // y usas las flechas horizontales para cambiar directamente
      if (entrada.estaPresionada('izquierda')) {
        this.idiomaIndice--;
        if (this.idiomaIndice < 0) this.idiomaIndice = this.codigosIdioma.length - 1;
        this._aplicarIdioma();
        this.bloqueoEntrada = true;
      } else if (entrada.estaPresionada('derecha') || entrada.estaPresionada('accion')) {
        this.idiomaIndice++;
        if (this.idiomaIndice >= this.codigosIdioma.length) this.idiomaIndice = 0;
        this._aplicarIdioma();
        this.bloqueoEntrada = true;
      }

    } else if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      this.seleccionarOpcion();
      this.bloqueoEntrada = true;
    }

    // Desbloqueamos cuando el jugador SUELTA todas las teclas de navegación
    if (!entrada.estaPresionada('arriba') &&
        !entrada.estaPresionada('abajo') &&
        !entrada.estaPresionada('izquierda') &&
        !entrada.estaPresionada('derecha') &&
        !entrada.estaPresionada('accion') &&
        !entrada.estaPresionada('cancelar')) {
      this.bloqueoEntrada = false;
    }
  }

  // --- Aplicar el idioma seleccionado al juego ---
  _aplicarIdioma() {
    if (this.juego && this.juego.idiomas) {
      this.juego.idiomas.cambiarIdioma(this.codigosIdioma[this.idiomaIndice]);
    }
  }

  // --- Procesar entrada dentro de un submenú ---
  _actualizarSubmenu(entrada) {
    // En el submenú de opciones, permitimos navegar con flechas
    if (this.submenuActivo === 'opciones') {
      this._actualizarSubmenuOpciones(entrada);
      return;
    }

    // En créditos (y otros submenús sin navegación), cerrar con cualquier tecla
    if ((entrada.estaPresionada('cancelar') || entrada.estaPresionada('accion')) && !this.bloqueoEntrada) {
      this.submenuActivo = null;
      this.bloqueoEntrada = true;
    }

    if (!entrada.estaPresionada('cancelar') &&
        !entrada.estaPresionada('accion')) {
      this.bloqueoEntrada = false;
    }
  }

  // --- Navegación dentro del submenú de opciones ---
  // Las opciones se cambian con izquierda/derecha (como el selector de idioma)
  _actualizarSubmenuOpciones(entrada) {
    if (entrada.estaPresionada('cancelar') && !this.bloqueoEntrada) {
      // Salir del submenú de opciones
      this.submenuActivo = null;
      this.bloqueoEntrada = true;
      return;
    }

    // Cambiar el valor de la opción seleccionada con izquierda/derecha
    const opcionActual = this.opcionesConfig[this.seleccionOpciones];

    if (opcionActual === 'controlesTactiles' && !this.bloqueoEntrada) {
      if (entrada.estaPresionada('izquierda') || entrada.estaPresionada('derecha') || entrada.estaPresionada('accion')) {
        // Alternar entre joystick y d-pad
        const modoActual = this.juego.entrada.modoControlTactil;
        const nuevoModo = modoActual === 'joystick' ? 'dpad' : 'joystick';
        this.juego.entrada.cambiarModoTactil(nuevoModo);
        this.bloqueoEntrada = true;
      }
    }

    // Desbloquear cuando se sueltan todas las teclas
    if (!entrada.estaPresionada('cancelar') &&
        !entrada.estaPresionada('accion') &&
        !entrada.estaPresionada('izquierda') &&
        !entrada.estaPresionada('derecha') &&
        !entrada.estaPresionada('arriba') &&
        !entrada.estaPresionada('abajo')) {
      this.bloqueoEntrada = false;
    }
  }

  // --- Dibujar todo lo visual del menú ---
  dibujar(renderizador, ancho, alto, textos) {
    const ctx = renderizador.ctx;

    // --- Fondo con degradado oscuro ---
    // Un degradado de azul muy oscuro a negro da sensación de cueva/misterio
    const gradiente = ctx.createLinearGradient(0, 0, 0, alto);
    gradiente.addColorStop(0, '#0a0a2e');
    gradiente.addColorStop(1, '#000000');
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, ancho, alto);

    // --- Partículas ambientales ---
    // Las dibujamos ANTES del texto para que queden "detrás"
    for (const p of this.particulasAmbientales) {
      ctx.fillStyle = `rgba(255, 255, 200, ${p.opacidad})`;
      ctx.fillRect(p.x, p.y, p.tamano, p.tamano);
    }

    // --- Título principal con animación flotante ---
    ctx.save();
    ctx.font = 'bold 48px monospace';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.fillText(
      textos.menu.titulo,
      ancho / 2,
      120 + this.animacionTitulo
    );

    // --- Subtítulo ---
    ctx.font = '16px monospace';
    ctx.fillStyle = '#CCCCCC';
    ctx.fillText(
      'Aventura Arqueológica Dominicana',
      ancho / 2,
      150 + this.animacionTitulo
    );
    ctx.restore();

    // --- Opciones del menú ---
    // Si hay un submenú activo, dibujamos eso en vez de las opciones
    if (this.submenuActivo) {
      this._dibujarSubmenu(ctx, ancho, alto, textos);
      return;
    }

    const inicioY = 220;
    const espaciado = 40;

    for (let i = 0; i < this.opciones.length; i++) {
      const opcion = this.opciones[i];
      const y = inicioY + i * espaciado;

      // La opción "Continuar" se ve gris si no hay guardado
      // para que el jugador sepa que no puede usarla
      const esContinuar = opcion === 'continuarJuego';
      const estaDeshabilitada = esContinuar && !this.hayGuardado;
      const estaSeleccionada = i === this.seleccion;

      if (estaDeshabilitada) {
        ctx.font = '18px monospace';
        ctx.fillStyle = '#444444';
        ctx.textAlign = 'center';
        ctx.fillText(textos.menu[opcion] || opcion, ancho / 2, y);
        continue;
      }

      // --- Caso especial: selector de idioma ---
      // Muestra "Idioma: < Español >" con flechas para indicar
      // que se puede cambiar con izquierda/derecha
      if (opcion === 'idioma') {
        ctx.font = estaSeleccionada ? 'bold 22px monospace' : '18px monospace';
        ctx.fillStyle = estaSeleccionada ? '#FFD700' : '#FFFFFF';
        ctx.textAlign = 'center';

        const nombreIdiomaActual = this.nombresIdioma[this.idiomaIndice];
        if (estaSeleccionada) {
          // Mostrar flechas laterales para indicar que puede cambiar
          ctx.fillText(`< ${nombreIdiomaActual} >`, ancho / 2, y);
        } else {
          ctx.fillText(nombreIdiomaActual, ancho / 2, y);
        }
        continue;
      }

      // --- Opciones normales ---
      const textoOpcion = textos.menu[opcion] || opcion;

      // La opción seleccionada se ve dorada y más grande
      // Las demás se ven blancas y normales
      ctx.font = estaSeleccionada ? 'bold 22px monospace' : '18px monospace';
      ctx.fillStyle = estaSeleccionada ? '#FFD700' : '#FFFFFF';
      ctx.textAlign = 'center';

      // Flechitas a los lados de la opción seleccionada
      // para que sea SUPER obvio cuál es (accesibilidad)
      const prefijo = estaSeleccionada ? '> ' : '  ';
      const sufijo = estaSeleccionada ? ' <' : '  ';
      ctx.fillText(prefijo + textoOpcion + sufijo, ancho / 2, y);
    }

    // --- Controles en la parte inferior ---
    ctx.font = '12px monospace';
    ctx.fillStyle = '#555555';
    ctx.textAlign = 'center';
    ctx.fillText(
      'Flechas/WASD: navegar | Enter/E: seleccionar',
      ancho / 2,
      alto - 40
    );

    // --- Versión en la esquina inferior ---
    ctx.font = '11px monospace';
    ctx.fillStyle = '#333333';
    ctx.fillText(
      'v0.10 - Liceo Frances de Santo Domingo 2026',
      ancho / 2,
      alto - 15
    );

    // Restauramos alineación por cortesía
    ctx.textAlign = 'left';
  }

  // --- Dibujar submenú (opciones o créditos) ---
  _dibujarSubmenu(ctx, ancho, alto, textos) {
    // Fondo semitransparente para que se vea que es una "ventana encima"
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(50, 80, ancho - 100, alto - 160);

    // Borde dorado
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 80, ancho - 100, alto - 160);

    ctx.textAlign = 'center';

    if (this.submenuActivo === 'opciones') {
      ctx.font = 'bold 24px monospace';
      ctx.fillStyle = '#FFD700';
      ctx.fillText(textos.menu.opciones, ancho / 2, 130);

      // --- Controles táctiles ---
      const modoActual = this.juego.entrada.modoControlTactil;
      const nombreModo = modoActual === 'joystick'
        ? (textos.menu.joystick || 'Joystick')
        : (textos.menu.cruceta || 'D-Pad');

      ctx.font = 'bold 18px monospace';
      ctx.fillStyle = '#FFD700';
      const etiqueta = textos.menu.controlesTactiles || 'Controles táctiles';
      ctx.fillText(`${etiqueta}:`, ancho / 2, 195);

      ctx.font = '16px monospace';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`< ${nombreModo} >`, ancho / 2, 225);

      // Descripción del modo seleccionado
      ctx.font = '13px monospace';
      ctx.fillStyle = '#888888';
      const desc = modoActual === 'joystick'
        ? (textos.menu.descJoystick || 'Stick analógico — arrastra para moverte')
        : (textos.menu.descCruceta || 'Botones de dirección clásicos');
      ctx.fillText(desc, ancho / 2, 260);

      ctx.font = '14px monospace';
      ctx.fillStyle = '#888888';
      const instruccion = textos.menu.opcionesVolver || 'Presiona Q / Escape para volver';
      ctx.fillText(instruccion, ancho / 2, alto - 110);
    }

    if (this.submenuActivo === 'creditos') {
      ctx.font = 'bold 24px monospace';
      ctx.fillStyle = '#FFD700';
      ctx.fillText(textos.menu.creditos, ancho / 2, 130);

      // Nombres del equipo real del proyecto
      const miembros = [
        'Elian', 'Theo', 'Carlos Guillermo', 'Jules',
        'Alberto', 'Rafael', 'Tom', 'Nael'
      ];

      ctx.font = '16px monospace';
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < miembros.length; i++) {
        ctx.fillText(miembros[i], ancho / 2, 175 + i * 28);
      }

      ctx.font = '14px monospace';
      ctx.fillStyle = '#888888';
      ctx.fillText('Presiona Q / Escape / Enter para volver', ancho / 2, alto - 110);
    }

    ctx.textAlign = 'left';
  }

  // --- Ejecutar la opción seleccionada ---
  seleccionarOpcion() {
    const opcion = this.opciones[this.seleccion];

    switch (opcion) {
      case 'nuevoJuego':
        // Ir a la pantalla de elegir personaje
        if (this.juego && this.juego.cambiarEscena) {
          this.juego.cambiarEscena('seleccionPersonaje');
        }
        break;

      case 'continuarJuego':
        // Solo funciona si hay un guardado existente
        if (this.hayGuardado && this.juego && this.juego.cargarPartida) {
          this.juego.cargarPartida();
        }
        break;

      case 'idioma':
        // El idioma se cambia con izquierda/derecha, pero si presionan
        // acción/Enter también rotamos al siguiente idioma
        this.idiomaIndice++;
        if (this.idiomaIndice >= this.codigosIdioma.length) this.idiomaIndice = 0;
        this._aplicarIdioma();
        break;

      case 'documentacion':
        // Abrir la documentación en una nueva ventana según el idioma activo
        // Mapa de idioma → archivo de documentación correspondiente
        {
          const archivosDoc = { es: 'docs.html', fr: 'docs-fr.html', en: 'docs-en.html' };
          const idiomaActual = this.codigosIdioma[this.idiomaIndice];
          const archivoDoc = archivosDoc[idiomaActual] || 'docs.html';
          window.open(archivoDoc, '_blank');
          // Al abrir una pestaña nueva, el navegador le da el foco a esa pestaña.
          // Cuando el jugador vuelve, las teclas pueden quedar "atascadas" porque
          // el evento keyup se perdió. Refocalizamos la ventana del juego después
          // de un instante para que el teclado vuelva a funcionar correctamente.
          this.bloqueoEntrada = true;
          setTimeout(() => window.focus(), 100);
        }
        break;

      case 'opciones':
        // Abrir el submenú de opciones
        this.submenuActivo = 'opciones';
        break;

      case 'creditos':
        // Abrir el submenú de créditos
        this.submenuActivo = 'creditos';
        break;
    }
  }
}
