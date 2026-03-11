// ============================================================
// COMBATE.JS - Sistema de combate con opción pacifista
// ============================================================
// Inspirado en Undertale: puedes pelear O convencer al enemigo
// de que deje de atacar. Hay un medidor de "hostilidad" que baja
// cuando hablas o negocias, y un medidor de "paciencia" que sube.
// Si la paciencia llega a 100, el enemigo se calma y ganas sin violencia.
// Esto enseña que no siempre pelear es la mejor solución.
// ============================================================

// --- Las opciones que el jugador puede elegir en combate ---
// Cada opción tiene consecuencias diferentes para fomentar estrategia
const OPCIONES_COMBATE = ['atacar', 'hablar', 'negociar', 'objeto', 'huir'];

export class SistemaCombate {
  constructor() {
    // Si estamos en medio de un combate o no
    this.enCombate = false;

    // Turnos: true = le toca al jugador, false = le toca al enemigo
    this.turnoJugador = true;

    // Referencia al enemigo actual (null si no hay combate)
    this.enemigo = null;

    // Cuál opción del menú tiene seleccionada el jugador
    this.opcionSeleccionada = 0;

    // --- Medidores emocionales del enemigo ---
    // Paciencia: cuando llega a 100, el enemigo se calma y el combate
    // termina pacíficamente. Sube al hablar/negociar.
    this.paciencia = 0;

    // Hostilidad: empieza alta y baja con diplomacia. Cuando está
    // por debajo de 30, el enemigo puede hablar en vez de atacar.
    this.hostilidad = 100;

    // Resultado del último combate (para que el juego sepa qué pasó)
    this._resultado = null;
  }

  // --- Iniciar un combate ---
  // Recibe un enemigo con propiedades como: vida, fuerza, velocidad, nombre
  iniciar(enemigo) {
    this.enCombate = true;
    this.turnoJugador = true;
    this.enemigo = enemigo;
    this.opcionSeleccionada = 0;
    this.paciencia = 0;
    // La hostilidad inicial depende del enemigo (algunos son más calmados)
    this.hostilidad = enemigo.hostilidad || 80;
    this._resultado = null;
  }

  // --- Mover la selección del menú ---
  seleccionarOpcion(direccion) {
    if (!this.turnoJugador) return;

    if (direccion === 'izquierda') {
      this.opcionSeleccionada = Math.max(0, this.opcionSeleccionada - 1);
    } else if (direccion === 'derecha') {
      this.opcionSeleccionada = Math.min(OPCIONES_COMBATE.length - 1, this.opcionSeleccionada + 1);
    }
  }

  // --- Ejecutar la opción seleccionada ---
  // Cada opción tiene un efecto diferente sobre el combate.
  // Después de ejecutar, pasa al turno del enemigo.
  ejecutarOpcion(jugador, inventario) {
    if (!this.turnoJugador || !this.enCombate) return;

    const opcion = OPCIONES_COMBATE[this.opcionSeleccionada];

    switch (opcion) {
      case 'atacar':
        this._ejecutarAtaque(jugador);
        break;
      case 'hablar':
        this._ejecutarHablar();
        break;
      case 'negociar':
        this._ejecutarNegociar(jugador);
        break;
      case 'objeto':
        this._ejecutarObjeto(inventario);
        break;
      case 'huir':
        this._ejecutarHuir(jugador);
        return; // Huir no pasa turno al enemigo si tiene éxito
    }

    // Si el combate sigue, es turno del enemigo
    if (this.enCombate) {
      this.turnoJugador = false;
    }
  }

  // --- Atacar: la opción directa ---
  // Hace daño basado en la fuerza del jugador. Simple pero efectivo.
  _ejecutarAtaque(jugador) {
    const dano = jugador.fuerza * 5 + Math.floor(Math.random() * 5);
    this.enemigo.vida -= dano;

    // Atacar sube un poco la hostilidad (el enemigo se enoja más)
    this.hostilidad = Math.min(100, this.hostilidad + 5);

    this.verificarFinCombate();
  }

  // --- Hablar: reducir hostilidad con palabras ---
  // Baja la hostilidad una cantidad aleatoria. Es gratis pero impredecible.
  // A veces funciona mucho, a veces casi nada (como en la vida real).
  _ejecutarHablar() {
    const reduccion = 5 + Math.floor(Math.random() * 15);
    this.hostilidad = Math.max(0, this.hostilidad - reduccion);
    this.paciencia = Math.min(100, this.paciencia + reduccion / 2);

    this.verificarFinCombate();
  }

  // --- Negociar: más efectivo pero arriesgado ---
  // Reduce más la hostilidad que hablar, pero si falla puede subir.
  // Tener ciertos objetos en el inventario mejora las probabilidades.
  _ejecutarNegociar(jugador) {
    // Base 50% de éxito, sube con inteligencia del jugador
    const probabilidadExito = 50 + jugador.nivelInteligencia * 5;
    const tirada = Math.random() * 100;

    if (tirada < probabilidadExito) {
      // Negociación exitosa: gran reducción de hostilidad
      const reduccion = 15 + Math.floor(Math.random() * 20);
      this.hostilidad = Math.max(0, this.hostilidad - reduccion);
      this.paciencia = Math.min(100, this.paciencia + reduccion);
    } else {
      // Falló la negociación: el enemigo se ofende un poco
      this.hostilidad = Math.min(100, this.hostilidad + 10);
    }

    this.verificarFinCombate();
  }

  // --- Usar objeto: abrir inventario durante combate ---
  // Marca que el jugador quiere usar un objeto (la UI se encarga del resto)
  _ejecutarObjeto(inventario) {
    if (inventario) {
      inventario.abrir();
    }
  }

  // --- Huir: intentar escapar ---
  // La probabilidad depende de la velocidad del enemigo.
  // Enemigos rápidos son más difíciles de esquivar.
  _ejecutarHuir(jugador) {
    const velocidadEnemigo = this.enemigo.velocidad || 3;
    // Más lento el enemigo = más fácil huir
    const probabilidadHuida = 70 - velocidadEnemigo * 10;
    const tirada = Math.random() * 100;

    if (tirada < probabilidadHuida) {
      this.terminar('huida');
    }
    // Si falla, el turno pasa al enemigo (pierdes tu turno intentando huir)
    if (this.enCombate) {
      this.turnoJugador = false;
    }
  }

  // --- Turno del enemigo ---
  // El enemigo decide qué hacer basado en su hostilidad.
  // Si está poco hostil (< 30), puede hablar en vez de atacar,
  // mostrando que la diplomacia está funcionando.
  turnoEnemigo(jugador) {
    if (this.turnoJugador || !this.enCombate) return;

    if (this.hostilidad < 30 && Math.random() > 0.5) {
      // El enemigo se calma y habla (la paciencia sube sola)
      this.paciencia = Math.min(100, this.paciencia + 10);
    } else {
      // El enemigo ataca
      const danoEnemigo = (this.enemigo.fuerza || 3) * 3 + Math.floor(Math.random() * 5);
      jugador.recibirDano(danoEnemigo);
    }

    this.turnoJugador = true;
    this.verificarFinCombate(jugador);
  }

  // --- Verificar si el combate terminó ---
  // Hay 4 formas de terminar: victoria, pacificado, huida o derrota
  verificarFinCombate(jugador) {
    // El enemigo fue derrotado
    if (this.enemigo && this.enemigo.vida <= 0) {
      this.terminar('victoria');
      return;
    }

    // El enemigo fue pacificado (paciencia al máximo)
    if (this.paciencia >= 100) {
      this.terminar('pacificado');
      return;
    }

    // El jugador fue derrotado
    if (jugador && jugador.vida <= 0) {
      this.terminar('derrota');
      return;
    }
  }

  // --- Actualizar cada frame ---
  // Maneja la entrada del jugador durante el combate
  actualizar(dt, entrada, jugador, inventario) {
    if (!this.enCombate) return;

    if (this.turnoJugador) {
      // Navegar opciones con izquierda/derecha
      if (entrada.izquierda) this.seleccionarOpcion('izquierda');
      if (entrada.derecha) this.seleccionarOpcion('derecha');
      // Confirmar con acción
      if (entrada.accion) this.ejecutarOpcion(jugador, inventario);
    } else {
      // Turno del enemigo (se ejecuta automáticamente)
      this.turnoEnemigo(jugador);
    }
  }

  // --- Dibujar la interfaz de combate ---
  // Dibuja todo: el enemigo arriba, las stats del jugador abajo-izquierda,
  // las opciones abajo-derecha, y los medidores de paciencia/hostilidad.
  dibujar(renderizador, anchoCanvas, altoCanvas, idiomas) {
    if (!this.enCombate) return;

    const ctx = renderizador;

    // Fondo de combate (negro semitransparente)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, anchoCanvas, altoCanvas);

    // --- Zona del enemigo (parte superior) ---
    ctx.fillStyle = '#ff4444';
    const enemigoAncho = 40;
    const enemigoAlto = 40;
    const enemigoX = anchoCanvas / 2 - enemigoAncho / 2;
    const enemigoY = 60;
    ctx.fillRect(enemigoX, enemigoY, enemigoAncho, enemigoAlto);

    // Nombre del enemigo
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    const nombreEnemigo = this.enemigo?.nombre || 'Enemigo';
    ctx.fillText(nombreEnemigo, anchoCanvas / 2, enemigoY + enemigoAlto + 20);

    // Barra de vida del enemigo
    const barraAncho = 120;
    const barraAlto = 8;
    const barraX = anchoCanvas / 2 - barraAncho / 2;
    const barraY = enemigoY + enemigoAlto + 30;
    const vidaEnemigo = this.enemigo ? this.enemigo.vida / (this.enemigo.vidaMaxima || 100) : 1;

    ctx.fillStyle = '#333333';
    ctx.fillRect(barraX, barraY, barraAncho, barraAlto);
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(barraX, barraY, barraAncho * Math.max(0, vidaEnemigo), barraAlto);

    // --- Medidores de paciencia y hostilidad ---
    const medidorY = 160;
    ctx.font = '11px monospace';
    ctx.textAlign = 'left';

    // Medidor de paciencia (verde = bueno, sube al hablar)
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText('Paciencia:', 30, medidorY);
    ctx.fillStyle = '#333333';
    ctx.fillRect(120, medidorY - 10, 100, 10);
    ctx.fillStyle = '#44cc44';
    ctx.fillRect(120, medidorY - 10, this.paciencia, 10);

    // Medidor de hostilidad (rojo = peligro, baja al hablar)
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText('Hostilidad:', 30, medidorY + 20);
    ctx.fillStyle = '#333333';
    ctx.fillRect(120, medidorY + 10, 100, 10);
    ctx.fillStyle = '#cc4444';
    ctx.fillRect(120, medidorY + 10, this.hostilidad, 10);

    // --- Opciones de combate (parte inferior) ---
    const opcionesY = altoCanvas - 80;
    const opcionAncho = 90;
    const opcionesInicioX = (anchoCanvas - OPCIONES_COMBATE.length * (opcionAncho + 10)) / 2;

    for (let i = 0; i < OPCIONES_COMBATE.length; i++) {
      const opX = opcionesInicioX + i * (opcionAncho + 10);

      // Fondo de la opción: amarillo si seleccionada, gris si no
      ctx.fillStyle = (i === this.opcionSeleccionada) ? '#ffcc00' : '#555555';
      ctx.fillRect(opX, opcionesY, opcionAncho, 30);

      // Texto de la opción
      ctx.fillStyle = (i === this.opcionSeleccionada) ? '#000000' : '#ffffff';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';

      // Buscar traducción o usar el nombre por defecto
      const nombreOpcion = idiomas?.[OPCIONES_COMBATE[i]] || OPCIONES_COMBATE[i];
      ctx.fillText(nombreOpcion, opX + opcionAncho / 2, opcionesY + 20);
    }

    // Indicador de turno
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    const textoTurno = this.turnoJugador ? 'Tu turno' : 'Turno enemigo';
    ctx.fillText(textoTurno, anchoCanvas / 2, altoCanvas - 30);

    // Restaurar alineación
    ctx.textAlign = 'left';
  }

  // --- Terminar el combate ---
  // Limpia todo y guarda el resultado para que el juego reaccione
  terminar(resultado) {
    this._resultado = resultado;
    this.enCombate = false;
    this.enemigo = null;
    this.turnoJugador = true;
    this.opcionSeleccionada = 0;
    this.paciencia = 0;
    this.hostilidad = 100;
    return resultado;
  }

  // --- Getter para saber el resultado del último combate ---
  get resultado() {
    return this._resultado;
  }
}
