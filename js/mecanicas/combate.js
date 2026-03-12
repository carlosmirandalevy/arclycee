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

    // Bloqueo de entrada para evitar que una tecla se procese varias veces
    this._bloqueoEntrada = false;

    // --- Mensaje de feedback ---
    // Muestra al jugador qué pasó en el último turno
    this._mensaje = '';

    // --- Temporizador del turno del enemigo ---
    // El enemigo espera un momento antes de actuar para que el jugador
    // pueda leer el resultado de su propia acción
    this._tiempoEsperaEnemigo = 0;
    this._esperandoEnemigo = false;

    // --- Opciones personalizadas por enemigo ---
    // Si el enemigo trae opcionesPersonalizadas, se usan en vez de las genéricas.
    // Cada opción: { id, nombre, paciencia: [min, max], hostilidad: [min, max],
    //   mensaje, respuestaEnemigo: { mensaje, hostilidad: [min, max], paciencia: [min, max] } }
    this._opcionesActivas = OPCIONES_COMBATE;
    this._ultimaAccion = null;
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
    this._mensaje = '';
    this._tiempoEsperaEnemigo = 0;
    this._esperandoEnemigo = false;
    this._bloqueoEntrada = true; // Empieza bloqueado para no capturar la E del diálogo

    // Si el enemigo trae opciones personalizadas, usarlas en vez de las genéricas
    // Esto permite que cada enemigo tenga acciones de combate únicas
    if (enemigo.opcionesPersonalizadas) {
      this._opcionesActivas = enemigo.opcionesPersonalizadas.map(o => o.id);
    } else {
      this._opcionesActivas = OPCIONES_COMBATE;
    }
    this._ultimaAccion = null;
  }

  // --- Mover la selección del menú ---
  seleccionarOpcion(direccion) {
    if (!this.turnoJugador) return;

    if (direccion === 'izquierda') {
      this.opcionSeleccionada = Math.max(0, this.opcionSeleccionada - 1);
    } else if (direccion === 'derecha') {
      this.opcionSeleccionada = Math.min(this._opcionesActivas.length - 1, this.opcionSeleccionada + 1);
    }
  }

  // --- Ejecutar la opción seleccionada ---
  // Cada opción tiene un efecto diferente sobre el combate.
  // Después de ejecutar, pasa al turno del enemigo con una pausa.
  ejecutarOpcion(jugador, inventario) {
    if (!this.turnoJugador || !this.enCombate) return;

    // --- Opciones personalizadas ---
    // Si el enemigo tiene acciones propias (ej: el Constructor con activismo),
    // ejecutar la lógica personalizada en vez del switch genérico
    if (this.enemigo?.opcionesPersonalizadas) {
      this._ejecutarPersonalizada();
    } else {
      // --- Opciones genéricas ---
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
    }

    // Si el combate sigue, esperar un momento antes del turno enemigo
    if (this.enCombate) {
      this._esperandoEnemigo = true;
      this._tiempoEsperaEnemigo = 0;
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

    this._mensaje = `¡Atacas! -${dano} HP`;

    this.verificarFinCombate();
  }

  // --- Hablar: reducir hostilidad con palabras ---
  // Baja la hostilidad y sube la paciencia directamente.
  // Es la ruta pacifista principal — cada intento ayuda.
  _ejecutarHablar() {
    const reduccionHostilidad = 8 + Math.floor(Math.random() * 12);
    const gananciaPatience = 12 + Math.floor(Math.random() * 13);

    this.hostilidad = Math.max(0, this.hostilidad - reduccionHostilidad);
    this.paciencia = Math.min(100, this.paciencia + gananciaPatience);

    this._mensaje = `Hablas con calma. Paciencia +${gananciaPatience}`;

    this.verificarFinCombate();
  }

  // --- Negociar: más efectivo pero arriesgado ---
  // Reduce más la hostilidad que hablar, pero si falla puede subir.
  // Tener ciertos objetos en el inventario mejora las probabilidades.
  _ejecutarNegociar(jugador) {
    // Base 55% de éxito, sube con inteligencia del jugador
    const probabilidadExito = 55 + jugador.nivelInteligencia * 5;
    const tirada = Math.random() * 100;

    if (tirada < probabilidadExito) {
      // Negociación exitosa: gran ganancia de paciencia
      const ganancia = 20 + Math.floor(Math.random() * 15);
      this.hostilidad = Math.max(0, this.hostilidad - ganancia);
      this.paciencia = Math.min(100, this.paciencia + ganancia);
      this._mensaje = `¡Negociación exitosa! Paciencia +${ganancia}`;
    } else {
      // Falló la negociación: el enemigo se ofende un poco
      this.hostilidad = Math.min(100, this.hostilidad + 5);
      this._mensaje = 'La negociación falló...';
    }

    this.verificarFinCombate();
  }

  // --- Usar objeto: abrir inventario durante combate ---
  // Marca que el jugador quiere usar un objeto (la UI se encarga del resto)
  _ejecutarObjeto(inventario) {
    if (inventario) {
      inventario.abrir();
    }
    this._mensaje = 'Buscas en tu mochila...';
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
      this._mensaje = '¡Escapaste!';
      this.terminar('huida');
    } else {
      this._mensaje = 'No pudiste escapar...';
      // Si falla, el turno pasa al enemigo
      if (this.enCombate) {
        this._esperandoEnemigo = true;
        this._tiempoEsperaEnemigo = 0;
        this.turnoJugador = false;
      }
    }
  }

  // --- Ejecutar acción personalizada ---
  // Para enemigos con opciones propias (como el Constructor Méndez).
  // Cada acción tiene sus propios valores de paciencia y hostilidad,
  // simulando diferentes formas de activismo ciudadano.
  _ejecutarPersonalizada() {
    const opciones = this.enemigo.opcionesPersonalizadas;
    const opcion = opciones[this.opcionSeleccionada];
    this._ultimaAccion = opcion;

    // Calcular efecto con rango aleatorio [min, max]
    const ganancia = opcion.paciencia[0]
      + Math.floor(Math.random() * (opcion.paciencia[1] - opcion.paciencia[0] + 1));
    const reduccion = opcion.hostilidad[0]
      + Math.floor(Math.random() * (opcion.hostilidad[1] - opcion.hostilidad[0] + 1));

    this.paciencia = Math.min(100, this.paciencia + ganancia);
    this.hostilidad = Math.max(0, this.hostilidad - reduccion);

    this._mensaje = opcion.mensaje || `Paciencia +${ganancia}`;

    this.verificarFinCombate();
  }

  // --- Turno del enemigo ---
  // El enemigo decide qué hacer basado en su hostilidad.
  // Si está poco hostil (< 30), puede hablar en vez de atacar,
  // mostrando que la diplomacia está funcionando.
  turnoEnemigo(jugador) {
    if (this.turnoJugador || !this.enCombate) return;

    // --- Contra-respuesta personalizada ---
    // Si el enemigo tiene opciones personalizadas y el jugador acaba de usar una,
    // el enemigo responde con su propia contra-estrategia (ej: influencers vs redes sociales)
    if (this._ultimaAccion?.respuestaEnemigo) {
      const resp = this._ultimaAccion.respuestaEnemigo;

      // La contra-respuesta sube un poco la hostilidad y baja la paciencia
      const subeHostilidad = resp.hostilidad[0]
        + Math.floor(Math.random() * (resp.hostilidad[1] - resp.hostilidad[0] + 1));
      const bajaPatience = resp.paciencia[0]
        + Math.floor(Math.random() * (resp.paciencia[1] - resp.paciencia[0] + 1));

      this.hostilidad = Math.min(100, this.hostilidad + subeHostilidad);
      this.paciencia = Math.max(0, this.paciencia - bajaPatience);

      this._mensaje = resp.mensaje || `${this.enemigo?.nombre || 'Enemigo'} contraataca.`;

    } else if (this.hostilidad < 30 && Math.random() > 0.3) {
      // El enemigo se calma y habla (la paciencia sube sola)
      const ganancia = 10 + Math.floor(Math.random() * 10);
      this.paciencia = Math.min(100, this.paciencia + ganancia);
      this._mensaje = `${this.enemigo?.nombre || 'Enemigo'} duda... Paciencia +${ganancia}`;
    } else {
      // El enemigo ataca (con daño reducido para ser justo)
      const danoEnemigo = (this.enemigo.fuerza || 2) * 2 + Math.floor(Math.random() * 3);
      jugador.recibirDano(danoEnemigo);
      this._mensaje = `${this.enemigo?.nombre || 'Enemigo'} ataca. -${danoEnemigo} HP`;
    }

    this.turnoJugador = true;
    this._esperandoEnemigo = false;
    this.verificarFinCombate(jugador);
  }

  // --- Verificar si el combate terminó ---
  // Hay 4 formas de terminar: victoria, pacificado, huida o derrota
  verificarFinCombate(jugador) {
    // El enemigo fue derrotado
    if (this.enemigo && this.enemigo.vida <= 0) {
      this._mensaje = '¡Victoria!';
      this.terminar('victoria');
      return;
    }

    // El enemigo fue pacificado (paciencia al máximo)
    if (this.paciencia >= 100) {
      this._mensaje = '¡Lo convenciste! El enemigo se rinde pacíficamente.';
      this.terminar('pacificado');
      return;
    }

    // El jugador fue derrotado
    if (jugador && jugador.vida <= 0) {
      this._mensaje = 'Fuiste derrotado...';
      this.terminar('derrota');
      return;
    }
  }

  // --- Actualizar cada frame ---
  // Maneja la entrada del jugador y el temporizador del turno enemigo
  actualizar(dt, entrada, jugador, inventario) {
    if (!this.enCombate) return;

    // --- Turno del enemigo con pausa ---
    // Esperamos 0.8 segundos para que el jugador lea su mensaje
    if (this._esperandoEnemigo) {
      this._tiempoEsperaEnemigo += dt;
      if (this._tiempoEsperaEnemigo >= 0.8) {
        this.turnoEnemigo(jugador);
      }
      return;
    }

    if (this.turnoJugador) {
      // Navegar opciones con izquierda/derecha
      // Usamos estaPresionada() que es el método de la clase Entrada
      if (entrada.estaPresionada('izquierda') && !this._bloqueoEntrada) {
        this.seleccionarOpcion('izquierda');
        this._bloqueoEntrada = true;
      }
      if (entrada.estaPresionada('derecha') && !this._bloqueoEntrada) {
        this.seleccionarOpcion('derecha');
        this._bloqueoEntrada = true;
      }
      // Confirmar con acción (E o Enter)
      if (entrada.estaPresionada('accion') && !this._bloqueoEntrada) {
        this.ejecutarOpcion(jugador, inventario);
        this._bloqueoEntrada = true;
      }
      // Desbloquear cuando se sueltan las teclas
      if (!entrada.estaPresionada('izquierda') &&
          !entrada.estaPresionada('derecha') &&
          !entrada.estaPresionada('accion')) {
        this._bloqueoEntrada = false;
      }
    }
  }

  // --- Dibujar la interfaz de combate ---
  // Dibuja todo: el enemigo arriba, la vida del jugador, las opciones
  // abajo, y los medidores de paciencia/hostilidad.
  // Necesita el jugador para mostrar su barra de vida.
  dibujar(renderizador, anchoCanvas, altoCanvas, idiomas, jugador) {
    if (!this.enCombate) return;

    const ctx = renderizador;

    // Fondo de combate (negro semitransparente)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, anchoCanvas, altoCanvas);

    // --- Zona del enemigo (parte superior) ---
    // Dibujar un soldado si el nombre lo indica, si no un cuadrado rojo
    const enemigoAncho = 40;
    const enemigoAlto = 50;
    const enemigoX = anchoCanvas / 2 - enemigoAncho / 2;
    const enemigoY = 50;

    // Cuerpo del enemigo
    ctx.fillStyle = '#8B0000';
    ctx.fillRect(enemigoX, enemigoY + 10, enemigoAncho, enemigoAlto - 10);

    // Cabeza
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(enemigoX + 10, enemigoY, 20, 16);

    // Casco
    ctx.fillStyle = '#808080';
    ctx.fillRect(enemigoX + 6, enemigoY - 6, 28, 10);

    // Ojos
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(enemigoX + 14, enemigoY + 5, 4, 4);
    ctx.fillRect(enemigoX + 22, enemigoY + 5, 4, 4);
    ctx.fillStyle = '#000000';
    ctx.fillRect(enemigoX + 15, enemigoY + 6, 2, 2);
    ctx.fillRect(enemigoX + 23, enemigoY + 6, 2, 2);

    // Nombre del enemigo
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    const nombreEnemigo = this.enemigo?.nombre || 'Enemigo';
    ctx.fillText(nombreEnemigo, anchoCanvas / 2, enemigoY + enemigoAlto + 20);

    // Barra de vida del enemigo
    const barraAncho = 150;
    const barraAlto = 10;
    const barraX = anchoCanvas / 2 - barraAncho / 2;
    const barraY = enemigoY + enemigoAlto + 30;
    const vidaEnemigo = this.enemigo ? this.enemigo.vida / (this.enemigo.vidaMaxima || 100) : 1;

    ctx.fillStyle = '#333333';
    ctx.fillRect(barraX, barraY, barraAncho, barraAlto);
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(barraX, barraY, barraAncho * Math.max(0, vidaEnemigo), barraAlto);
    ctx.strokeStyle = '#555555';
    ctx.lineWidth = 1;
    ctx.strokeRect(barraX, barraY, barraAncho, barraAlto);

    // --- Medidores de paciencia y hostilidad ---
    const medidorY = 175;
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';

    // Medidor de paciencia (verde = bueno, sube al hablar)
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText('Paciencia:', 30, medidorY);
    ctx.fillStyle = '#333333';
    ctx.fillRect(140, medidorY - 10, 100, 12);
    ctx.fillStyle = '#44cc44';
    ctx.fillRect(140, medidorY - 10, this.paciencia, 12);
    ctx.strokeStyle = '#555555';
    ctx.strokeRect(140, medidorY - 10, 100, 12);
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px monospace';
    ctx.fillText(`${Math.floor(this.paciencia)}%`, 245, medidorY);

    // Medidor de hostilidad (rojo = peligro, baja al hablar)
    ctx.font = '12px monospace';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText('Hostilidad:', 30, medidorY + 25);
    ctx.fillStyle = '#333333';
    ctx.fillRect(140, medidorY + 15, 100, 12);
    ctx.fillStyle = '#cc4444';
    ctx.fillRect(140, medidorY + 15, this.hostilidad, 12);
    ctx.strokeStyle = '#555555';
    ctx.strokeRect(140, medidorY + 15, 100, 12);
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px monospace';
    ctx.fillText(`${Math.floor(this.hostilidad)}%`, 245, medidorY + 25);

    // --- Vida del jugador (lado derecho) ---
    if (jugador) {
      const jpX = anchoCanvas - 270; // Posición X del bloque del jugador
      const jpY = medidorY - 10;

      // Nombre del jugador
      ctx.font = '12px monospace';
      ctx.fillStyle = '#aaaaaa';
      ctx.textAlign = 'left';
      ctx.fillText('Tu vida:', jpX, jpY + 10);

      // Barra de vida del jugador (verde)
      const vidaMax = jugador.vidaMaxima || 100;
      const vidaActual = Math.max(0, jugador.vida || 0);
      const porcentajeVida = vidaActual / vidaMax;

      ctx.fillStyle = '#333333';
      ctx.fillRect(jpX + 80, jpY, 100, 12);

      // Color cambia según la vida: verde → amarillo → rojo
      if (porcentajeVida > 0.5) {
        ctx.fillStyle = '#44cc44';
      } else if (porcentajeVida > 0.25) {
        ctx.fillStyle = '#cccc44';
      } else {
        ctx.fillStyle = '#cc4444';
      }
      ctx.fillRect(jpX + 80, jpY, 100 * porcentajeVida, 12);

      ctx.strokeStyle = '#555555';
      ctx.lineWidth = 1;
      ctx.strokeRect(jpX + 80, jpY, 100, 12);

      // Número de vida
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.fillText(`${Math.floor(vidaActual)}/${vidaMax}`, jpX + 185, jpY + 10);
    }

    // --- Mensaje de feedback (centro de la pantalla) ---
    // Muestra qué pasó en el último turno para que el jugador entienda
    if (this._mensaje) {
      ctx.font = '14px monospace';
      ctx.fillStyle = '#FFD700';
      ctx.textAlign = 'center';
      ctx.fillText(this._mensaje, anchoCanvas / 2, medidorY + 65);
    }

    // --- Pista para el jugador ---
    ctx.font = '11px monospace';
    ctx.fillStyle = '#777777';
    ctx.textAlign = 'center';
    const pista = this.enemigo?.pistaPersonalizada
      || 'Usa Hablar o Negociar para llenar la barra de Paciencia';
    ctx.fillText(pista, anchoCanvas / 2, medidorY + 85);

    // --- Opciones de combate (parte inferior) ---
    const opcionesY = altoCanvas - 90;
    const numOpciones = this._opcionesActivas.length;
    // El ancho de cada botón se adapta: más opciones = botones más pequeños
    const opcionAncho = numOpciones <= 4 ? 110 : 90;
    const opcionesInicioX = (anchoCanvas - numOpciones * (opcionAncho + 10)) / 2;

    for (let i = 0; i < numOpciones; i++) {
      const opX = opcionesInicioX + i * (opcionAncho + 10);

      // Fondo de la opción: amarillo si seleccionada, gris si no
      const seleccionada = (i === this.opcionSeleccionada) && this.turnoJugador;
      ctx.fillStyle = seleccionada ? '#ffcc00' : '#555555';
      ctx.fillRect(opX, opcionesY, opcionAncho, 30);

      // Borde
      ctx.strokeStyle = seleccionada ? '#FFD700' : '#666666';
      ctx.lineWidth = seleccionada ? 2 : 1;
      ctx.strokeRect(opX, opcionesY, opcionAncho, 30);

      // Texto de la opción
      ctx.fillStyle = seleccionada ? '#000000' : '#ffffff';
      ctx.font = seleccionada ? 'bold 11px monospace' : '11px monospace';
      ctx.textAlign = 'center';

      // Para opciones personalizadas usar el nombre de la opción,
      // para las genéricas buscar traducción en el sistema de idiomas
      let nombreOpcion;
      if (this.enemigo?.opcionesPersonalizadas) {
        nombreOpcion = this.enemigo.opcionesPersonalizadas[i].nombre
          || this._opcionesActivas[i];
      } else {
        nombreOpcion = idiomas?.[this._opcionesActivas[i]]
          || this._opcionesActivas[i];
      }
      ctx.fillText(nombreOpcion, opX + opcionAncho / 2, opcionesY + 20);
    }

    // Indicador de turno
    ctx.fillStyle = '#ffffff';
    ctx.font = '13px monospace';
    ctx.textAlign = 'center';
    if (this.turnoJugador) {
      ctx.fillText('< Tu turno — elige una acción >', anchoCanvas / 2, altoCanvas - 30);
    } else {
      ctx.fillStyle = '#ff8888';
      ctx.fillText('... turno del enemigo ...', anchoCanvas / 2, altoCanvas - 30);
    }

    // --- Controles ---
    ctx.font = '10px monospace';
    ctx.fillStyle = '#444444';
    ctx.fillText('Flechas: elegir | E: confirmar', anchoCanvas / 2, altoCanvas - 12);

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
    this._esperandoEnemigo = false;
    this._opcionesActivas = OPCIONES_COMBATE;
    this._ultimaAccion = null;
    return resultado;
  }

  // --- Getter para saber el resultado del último combate ---
  get resultado() {
    return this._resultado;
  }
}
