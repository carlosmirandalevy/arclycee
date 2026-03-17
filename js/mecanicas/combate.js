// ============================================================
// COMBATE.JS - Sistema de combate con opción pacifista
// ============================================================
// Inspirado en Undertale: puedes pelear O convencer al enemigo
// de que deje de atacar. Hay un medidor de "hostilidad" que baja
// cuando hablas o negocias, y un medidor de "convencimiento" que sube.
// Si el convencimiento llega a 100, el enemigo se convence y ganas sin violencia.
// Esto enseña que no siempre pelear es la mejor solución.
// ============================================================

import { SonidoProcedural } from '../motor/sonido-procedural.js';

// --- Las opciones que el jugador puede elegir en combate ---
// Cada opción tiene consecuencias diferentes para fomentar estrategia
const OPCIONES_COMBATE = ['atacar', 'hablar', 'negociar', 'objeto', 'huir'];

// --- Mapa de sonidos por acción personalizada ---
// Cada id de opción personalizada tiene su sonido temático.
// Si un id no está en el mapa, no suena nada (silencioso).
const SONIDOS_POR_ACCION = {
  redesSociales: 'combateRedesSociales',
  protestas: 'combateProtestas',
  denuncia: 'combateDenuncia',
  legal: 'combateViaLegal',
  atrapar: 'combateAtrapar',
  pescar: 'combatePescar',
  protegerCoral: 'combateProtegerCoral',
  alertarBuzos: 'combateAlertarBuzos',
  ley318: 'combateLey318',
  evidenciaForense: 'combateEvidenciaForense',
  interpol: 'combateInterpol',
  unesco: 'combateUnesco',
};

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

    // Sonidos procedurales de combate
    this._sfx = new SonidoProcedural();

    // Bloqueo de entrada para evitar que una tecla se procese varias veces
    this._bloqueoEntrada = false;

    // --- Mensaje de feedback ---
    // Muestra al jugador qué pasó en el último turno
    this._mensaje = '';

    // --- Temporizador del turno del enemigo ---
    // Muestra el mensaje 2.5s, luego espera que el jugador presione E
    this._tiempoEsperaEnemigo = 0;
    this._esperandoEnemigo = false;
    this._esperandoContinuar = false;  // true cuando muestra "[E] Continuar"
    this._pausaLectura = 2.5;

    // --- Opciones personalizadas por enemigo ---
    // Si el enemigo trae opcionesPersonalizadas, se usan en vez de las genéricas.
    // Cada opción: { id, nombre, paciencia: [min, max], hostilidad: [min, max],
    //   mensaje, respuestaEnemigo: { mensaje, hostilidad: [min, max], paciencia: [min, max] } }
    this._opcionesActivas = OPCIONES_COMBATE;
    this._ultimaAccion = null;
  }

  // --- Iniciar un combate ---
  // Recibe un enemigo con propiedades como: vida, fuerza, velocidad, nombre
  // juego (opcional): referencia al juego para calcular bonus de reputación
  iniciar(enemigo, juego = null) {
    this.enCombate = true;
    this.turnoJugador = true;
    this.enemigo = enemigo;
    this.opcionSeleccionada = 0;
    // Bonus de reputación: a mayor reputación, el enemigo empieza más convencido
    this.paciencia = juego?.reputacion
      ? Math.min(juego.reputacion.puntos / 2, 25)
      : 0;
    // La hostilidad inicial depende del enemigo (algunos son más calmados)
    this.hostilidad = enemigo.hostilidad || 80;
    this._resultado = null;
    this._mensaje = '';
    this._tiempoEsperaEnemigo = 0;
    this._esperandoEnemigo = false;
    this._esperandoContinuar = false;
    this._esperandoContinuarEnemigo = false;
    this._tiempoMensajeEnemigo = 0;
    this._mostrarBotonEnemigo = false;
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

    const anterior = this.opcionSeleccionada;
    if (direccion === 'izquierda') {
      this.opcionSeleccionada = Math.max(0, this.opcionSeleccionada - 1);
    } else if (direccion === 'derecha') {
      this.opcionSeleccionada = Math.min(this._opcionesActivas.length - 1, this.opcionSeleccionada + 1);
    }
    // Solo sonar si la selección realmente cambió
    if (this.opcionSeleccionada !== anterior) {
      this._sfx.combateNavegar();
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

    // Si el combate sigue, mostrar el mensaje 2.5s y luego esperar E
    if (this.enCombate) {
      this._esperandoEnemigo = true;
      this._tiempoEsperaEnemigo = 0;
      this._esperandoContinuar = false;
      this._pausaLectura = 2.5;
      this.turnoJugador = false;
    }
  }

  // --- Atacar: la opción directa ---
  // Hace daño basado en la fuerza del jugador. Simple pero efectivo.
  _ejecutarAtaque(jugador) {
    this._sfx.combateAtacar();
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
    this._sfx.combateHablar();
    const reduccionHostilidad = 8 + Math.floor(Math.random() * 12);
    const gananciaPatience = 12 + Math.floor(Math.random() * 13);

    this.hostilidad = Math.max(0, this.hostilidad - reduccionHostilidad);
    this.paciencia = Math.min(100, this.paciencia + gananciaPatience);

    this._mensaje = `Hablas con calma. Convencido +${gananciaPatience}`;

    this.verificarFinCombate();
  }

  // --- Negociar: más efectivo pero arriesgado ---
  // Reduce más la hostilidad que hablar, pero si falla puede subir.
  // Tener ciertos objetos en el inventario mejora las probabilidades.
  _ejecutarNegociar(jugador) {
    this._sfx.combateNegociar();
    // Base 55% de éxito, sube con inteligencia del jugador
    const probabilidadExito = 55 + jugador.nivelInteligencia * 5;
    const tirada = Math.random() * 100;

    if (tirada < probabilidadExito) {
      // Negociación exitosa: gran ganancia de paciencia
      const ganancia = 20 + Math.floor(Math.random() * 15);
      this.hostilidad = Math.max(0, this.hostilidad - ganancia);
      this.paciencia = Math.min(100, this.paciencia + ganancia);
      this._mensaje = `¡Negociación exitosa! Convencido +${ganancia}`;
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
    this._sfx.combateObjeto();
    if (inventario) {
      inventario.abrir();
    }
    this._mensaje = 'Buscas en tu mochila...';
  }

  // --- Huir: intentar escapar ---
  // La probabilidad depende de la velocidad del enemigo.
  // Enemigos rápidos son más difíciles de esquivar.
  _ejecutarHuir(jugador) {
    this._sfx.combateHuir();
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
        this._esperandoContinuar = false;
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

    // Reproducir el sonido temático de esta acción
    const metodoSonido = SONIDOS_POR_ACCION[opcion.id];
    if (metodoSonido && this._sfx[metodoSonido]) {
      this._sfx[metodoSonido]();
    }

    // Calcular efecto con rango aleatorio [min, max]
    const ganancia = opcion.paciencia[0]
      + Math.floor(Math.random() * (opcion.paciencia[1] - opcion.paciencia[0] + 1));
    const reduccion = opcion.hostilidad[0]
      + Math.floor(Math.random() * (opcion.hostilidad[1] - opcion.hostilidad[0] + 1));

    this.paciencia = Math.min(100, this.paciencia + ganancia);
    this.hostilidad = Math.max(0, this.hostilidad - reduccion);

    this._mensaje = opcion.mensaje || `Convencido +${ganancia}`;

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

      // La contra-respuesta también causa daño al jugador
      const danoContra = (this.enemigo.fuerza || 2) + Math.floor(Math.random() * 3);
      jugador.recibirDano(danoContra);

      this._mensaje = (resp.mensaje || `${this.enemigo?.nombre || 'Enemigo'} contraataca.`)
        + ` -${danoContra} HP`;
      this._sfx.combateContraataque();

    } else if (this.hostilidad < 30 && Math.random() > 0.3) {
      // El enemigo se calma y habla (la paciencia sube sola)
      const ganancia = 10 + Math.floor(Math.random() * 10);
      this.paciencia = Math.min(100, this.paciencia + ganancia);
      this._mensaje = `${this.enemigo?.nombre || 'Enemigo'} duda... Convencido +${ganancia}`;
      this._sfx.combateEnemigoDuda();
    } else {
      // El enemigo ataca (con daño reducido para ser justo)
      const danoEnemigo = (this.enemigo.fuerza || 2) * 2 + Math.floor(Math.random() * 3);
      jugador.recibirDano(danoEnemigo);
      this._mensaje = `${this.enemigo?.nombre || 'Enemigo'} ataca. -${danoEnemigo} HP`;
      this._sfx.combateContraataque();
    }

    this._esperandoEnemigo = false;
    // Mostrar el mensaje del enemigo 2.5s, luego esperar E antes de devolver el turno
    this._esperandoContinuarEnemigo = true;
    this._tiempoMensajeEnemigo = 0;
    this._mostrarBotonEnemigo = false;
    this._jugadorRef = jugador; // Guardar referencia para verificar fin después
  }

  // --- Verificar si el combate terminó ---
  // Hay 4 formas de terminar: victoria, pacificado, huida o derrota
  verificarFinCombate(jugador) {
    // El enemigo fue derrotado
    if (this.enemigo && this.enemigo.vida <= 0) {
      this._mensaje = '¡Victoria!';
      this._sfx.combateVictoria();
      this.terminar('victoria');
      return;
    }

    // El enemigo fue pacificado (paciencia al máximo)
    if (this.paciencia >= 100) {
      this._mensaje = '¡Lo convenciste! El enemigo se rinde pacíficamente.';
      this._sfx.combatePacificado();
      this.terminar('pacificado');
      return;
    }

    // El jugador fue derrotado
    if (jugador && jugador.vida <= 0) {
      this._mensaje = 'Fuiste derrotado...';
      this._sfx.combateDerrota();
      this.terminar('derrota');
      return;
    }
  }

  // --- Actualizar cada frame ---
  // Maneja la entrada del jugador y el temporizador del turno enemigo
  actualizar(dt, entrada, jugador, inventario) {
    if (!this.enCombate) return;

    // --- Turno del enemigo con pausa + botón de continuar ---
    // Muestra el mensaje 2.5s, luego "[E] Continuar" hasta que presione E
    if (this._esperandoEnemigo) {
      this._tiempoEsperaEnemigo += dt;
      if (!this._esperandoContinuar && this._tiempoEsperaEnemigo >= this._pausaLectura) {
        // Pasaron 2.5s — mostrar botón de continuar
        this._esperandoContinuar = true;
        this._bloqueoEntrada = true;
      }
      if (this._esperandoContinuar) {
        // Desbloquear cuando suelta E
        if (!entrada.estaPresionada('accion')) {
          this._bloqueoEntrada = false;
        }
        // Avanzar cuando presiona E
        if (entrada.estaPresionada('accion') && !this._bloqueoEntrada) {
          this.turnoEnemigo(jugador);
          this._bloqueoEntrada = true;
        }
      }
      return;
    }

    // --- Mensaje del enemigo con pausa + botón de continuar ---
    if (this._esperandoContinuarEnemigo) {
      this._tiempoMensajeEnemigo += dt;
      if (!this._mostrarBotonEnemigo && this._tiempoMensajeEnemigo >= this._pausaLectura) {
        this._mostrarBotonEnemigo = true;
        this._bloqueoEntrada = true;
      }
      if (this._mostrarBotonEnemigo) {
        if (!entrada.estaPresionada('accion')) {
          this._bloqueoEntrada = false;
        }
        if (entrada.estaPresionada('accion') && !this._bloqueoEntrada) {
          this._esperandoContinuarEnemigo = false;
          this.turnoJugador = true;
          this._bloqueoEntrada = true;
          this.verificarFinCombate(this._jugadorRef);
        }
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
  // textos: objeto completo de traducciones (textos.combate para nombres
  //   de opciones, textos.ui para etiquetas de interfaz)
  dibujar(renderizador, anchoCanvas, altoCanvas, textos, jugador) {
    if (!this.enCombate) return;

    // Extraer subsecciones de traducciones para uso local
    const idiomas = textos?.combate;
    const ui = textos?.ui;

    const ctx = renderizador;

    // Fondo de combate (negro semitransparente)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, anchoCanvas, altoCanvas);

    // --- Zona del enemigo (parte superior) ---
    // Cada enemigo puede traer su propio sprite vía tipoSprite.
    // Si no tiene tipo, dibujamos el sprite genérico de soldado/persona.
    const enemigoAncho = 40;
    const enemigoAlto = 50;
    const enemigoX = anchoCanvas / 2 - enemigoAncho / 2;
    const enemigoY = 50;

    const tipoSprite = this.enemigo?.tipoSprite || 'soldado';
    this._dibujarSpriteEnemigo(ctx, enemigoX, enemigoY, enemigoAncho, enemigoAlto, tipoSprite);

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

    // Medidor de convencimiento (verde = bueno, sube al hablar/negociar)
    // Antes se llamaba "Paciencia" pero realmente estamos convenciendo
    // al oponente, no esperando a que se calme.
    const etiquetaConv = this.enemigo?.etiquetaConvencimiento || 'Convencido:';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText(etiquetaConv, 30, medidorY);
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
    ctx.fillText(ui?.hostilidad || 'Hostilidad:', 30, medidorY + 25);
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
      ctx.fillText(ui?.tuVida || 'Tu vida:', jpX, jpY + 10);

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

    // --- Botón "[E] Continuar" cuando espera input del jugador ---
    if (this._esperandoContinuar || this._mostrarBotonEnemigo) {
      const parpadeo = 0.5 + Math.sin(Date.now() / 300) * 0.3;
      ctx.font = 'bold 12px monospace';
      ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
      ctx.textAlign = 'center';
      ctx.fillText(ui?.presionaE || '[E] Continuar', anchoCanvas / 2, medidorY + 85);
    } else {
      // --- Pista para el jugador ---
      ctx.font = '11px monospace';
      ctx.fillStyle = '#777777';
      ctx.textAlign = 'center';
      const pista = this.enemigo?.pistaPersonalizada
        || ui?.pistaDefecto
        || 'Usa Hablar o Negociar para convencer al oponente';
      ctx.fillText(pista, anchoCanvas / 2, medidorY + 85);
    }

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
      ctx.fillText(ui?.tuTurno || '< Tu turno — elige una acción >', anchoCanvas / 2, altoCanvas - 30);
    } else {
      ctx.fillStyle = '#ff8888';
      ctx.fillText(ui?.turnoEnemigo || '... turno del enemigo ...', anchoCanvas / 2, altoCanvas - 30);
    }

    // --- Controles ---
    ctx.font = '10px monospace';
    ctx.fillStyle = '#444444';
    ctx.fillText(ui?.controlesCombate || 'Flechas: elegir | E: confirmar', anchoCanvas / 2, altoCanvas - 12);

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

  // --- Dibujar el sprite del enemigo según su tipo ---
  // Cada enemigo puede traer tipoSprite: 'soldado', 'constructor',
  // 'pezLeon', etc. Si no trae tipo, usamos el sprite genérico.
  _dibujarSpriteEnemigo(ctx, x, y, ancho, alto, tipo) {
    switch (tipo) {

      case 'pezLeon':
        this._dibujarPezLeon(ctx, x, y, ancho, alto);
        break;

      case 'constructor':
        this._dibujarConstructor(ctx, x, y, ancho, alto);
        break;

      case 'traficante':
        this._dibujarTraficante(ctx, x, y, ancho, alto);
        break;

      case 'soldado':
      default:
        this._dibujarSoldado(ctx, x, y, ancho, alto);
        break;
    }
  }

  // --- Sprite: Soldado colonial (Diego en La Isabela) ---
  _dibujarSoldado(ctx, x, y, ancho, alto) {
    // Cuerpo del soldado (rojo oscuro — uniforme militar)
    ctx.fillStyle = '#8B0000';
    ctx.fillRect(x, y + 10, ancho, alto - 10);

    // Cabeza
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(x + 10, y, 20, 16);

    // Casco de conquistador (morión)
    ctx.fillStyle = '#808080';
    ctx.fillRect(x + 6, y - 6, 28, 10);

    // Ojos
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x + 14, y + 5, 4, 4);
    ctx.fillRect(x + 22, y + 5, 4, 4);
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 15, y + 6, 2, 2);
    ctx.fillRect(x + 23, y + 6, 2, 2);
  }

  // --- Sprite: Constructor Méndez (Zona Colonial) ---
  _dibujarConstructor(ctx, x, y, ancho, alto) {
    // Cuerpo (camisa de constructor amarilla)
    ctx.fillStyle = '#DDAA00';
    ctx.fillRect(x, y + 10, ancho, alto - 10);

    // Cabeza
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(x + 10, y, 20, 16);

    // Casco de construcción (amarillo)
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(x + 6, y - 6, 28, 10);
    ctx.fillStyle = '#CC9900';
    ctx.fillRect(x + 8, y - 2, 24, 3);

    // Ojos
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x + 14, y + 5, 4, 4);
    ctx.fillRect(x + 22, y + 5, 4, 4);
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 15, y + 6, 2, 2);
    ctx.fillRect(x + 23, y + 6, 2, 2);
  }

  // --- Sprite: Pez León (especie invasora del Caribe) ---
  // Cuerpo alargado con rayas rojas/blancas, aletas pectorales
  // en abanico (lo que lo hace tan reconocible), y espinas
  // dorsales venenosas que son su defensa principal.
  _dibujarPezLeon(ctx, x, y, ancho, alto) {
    const cx = x + ancho / 2;   // Centro horizontal
    const cy = y + alto / 2;    // Centro vertical

    // --- Cuerpo principal (forma ovalada horizontal) ---
    ctx.fillStyle = '#CC3333';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 5, 22, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- Rayas blancas verticales (patrón del pez león) ---
    ctx.fillStyle = '#FFFFFF';
    for (let i = -15; i <= 15; i += 6) {
      ctx.fillRect(cx + i, cy - 6, 2, 22);
    }

    // --- Rayas rojas más oscuras entre las blancas ---
    ctx.fillStyle = '#991111';
    for (let i = -12; i <= 12; i += 6) {
      ctx.fillRect(cx + i, cy - 4, 1.5, 18);
    }

    // --- Aletas pectorales en abanico (lo más icónico del pez león) ---
    // Aleta izquierda — varillas con membrana semitransparente
    ctx.strokeStyle = '#CC5555';
    ctx.lineWidth = 1.5;
    for (let a = 0; a < 5; a++) {
      const angulo = Math.PI * 0.6 + a * 0.15;
      const largo = 18 + a * 2;
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy + 5);
      ctx.lineTo(cx - 10 - Math.cos(angulo) * largo, cy + 5 + Math.sin(angulo) * largo);
      ctx.stroke();
    }
    // Membrana entre varillas
    ctx.fillStyle = 'rgba(200, 80, 80, 0.3)';
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy + 5);
    for (let a = 0; a < 5; a++) {
      const angulo = Math.PI * 0.6 + a * 0.15;
      const largo = 18 + a * 2;
      ctx.lineTo(cx - 10 - Math.cos(angulo) * largo, cy + 5 + Math.sin(angulo) * largo);
    }
    ctx.closePath();
    ctx.fill();

    // Aleta derecha (espejada)
    for (let a = 0; a < 5; a++) {
      const angulo = Math.PI * 0.4 - a * 0.15;
      const largo = 18 + a * 2;
      ctx.strokeStyle = '#CC5555';
      ctx.beginPath();
      ctx.moveTo(cx + 10, cy + 5);
      ctx.lineTo(cx + 10 + Math.cos(angulo) * largo, cy + 5 + Math.sin(angulo) * largo);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(200, 80, 80, 0.3)';
    ctx.beginPath();
    ctx.moveTo(cx + 10, cy + 5);
    for (let a = 0; a < 5; a++) {
      const angulo = Math.PI * 0.4 - a * 0.15;
      const largo = 18 + a * 2;
      ctx.lineTo(cx + 10 + Math.cos(angulo) * largo, cy + 5 + Math.sin(angulo) * largo);
    }
    ctx.closePath();
    ctx.fill();

    // --- Espinas dorsales venenosas (la defensa del pez león) ---
    ctx.strokeStyle = '#FFAA44';
    ctx.lineWidth = 1.5;
    for (let i = -12; i <= 12; i += 4) {
      ctx.beginPath();
      ctx.moveTo(cx + i, cy - 8);
      ctx.lineTo(cx + i + 1, cy - 22 - Math.abs(i) * 0.3);
      ctx.stroke();
      // Punta venenosa brillante
      ctx.fillStyle = '#FFDD66';
      ctx.fillRect(cx + i, cy - 23 - Math.abs(i) * 0.3, 2, 2);
    }

    // --- Cola en V ---
    ctx.fillStyle = '#CC3333';
    ctx.beginPath();
    ctx.moveTo(cx + 22, cy);
    ctx.lineTo(cx + 34, cy - 8);
    ctx.lineTo(cx + 30, cy + 2);
    ctx.lineTo(cx + 34, cy + 12);
    ctx.lineTo(cx + 22, cy + 8);
    ctx.closePath();
    ctx.fill();
    // Rayas en la cola
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(cx + 24, cy - 2, 1.5, 10);
    ctx.fillRect(cx + 28, cy - 4, 1.5, 12);

    // --- Ojo ---
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(cx - 10, cy, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(cx - 10, cy, 2, 0, Math.PI * 2);
    ctx.fill();
    // Banda oscura a través del ojo (marca del pez león)
    ctx.fillStyle = '#661111';
    ctx.fillRect(cx - 14, cy - 1, 8, 2);

    // --- Boca ---
    ctx.fillStyle = '#661111';
    ctx.fillRect(cx - 22, cy + 1, 6, 2);
  }

  // --- Sprite: Traficante Rodrigo Torres (Aeropuerto de Punta Cana) ---
  // Hombre de negocios con traje oscuro, gafas de sol, maletín
  // sospechoso y un reloj de oro. Aspecto nervioso pero arrogante.
  _dibujarTraficante(ctx, x, y, ancho, alto) {
    const cx = x + ancho / 2;

    // --- Cuerpo: traje oscuro de negocios ---
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(x + 2, y + 14, ancho - 4, alto - 14);

    // Solapa del traje (triángulos)
    ctx.fillStyle = '#111122';
    ctx.beginPath();
    ctx.moveTo(x + 8, y + 14);
    ctx.lineTo(cx - 2, y + 28);
    ctx.lineTo(x + 2, y + 28);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + ancho - 8, y + 14);
    ctx.lineTo(cx + 2, y + 28);
    ctx.lineTo(x + ancho - 2, y + 28);
    ctx.closePath();
    ctx.fill();

    // Camisa blanca (visible entre solapas)
    ctx.fillStyle = '#EEEEEE';
    ctx.fillRect(cx - 3, y + 16, 6, 14);

    // Corbata roja
    ctx.fillStyle = '#8a2a2a';
    ctx.fillRect(cx - 2, y + 16, 4, 16);
    // Nudo de la corbata
    ctx.fillStyle = '#6a1a1a';
    ctx.beginPath();
    ctx.moveTo(cx, y + 16);
    ctx.lineTo(cx - 3, y + 20);
    ctx.lineTo(cx + 3, y + 20);
    ctx.closePath();
    ctx.fill();

    // --- Cabeza ---
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(x + 8, y, 24, 18);

    // Pelo peinado hacia atrás (slicked-back)
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(x + 6, y - 4, 28, 8);
    // Patillas
    ctx.fillRect(x + 7, y + 2, 3, 6);
    ctx.fillRect(x + ancho - 10, y + 2, 3, 6);

    // --- Gafas de sol oscuras ---
    ctx.fillStyle = '#111111';
    ctx.fillRect(x + 11, y + 5, 8, 5);
    ctx.fillRect(x + 21, y + 5, 8, 5);
    // Puente de las gafas
    ctx.fillStyle = '#333333';
    ctx.lineWidth = 1;
    ctx.fillRect(x + 19, y + 7, 2, 2);
    // Patillas de las gafas
    ctx.fillRect(x + 10, y + 6, 2, 2);
    ctx.fillRect(x + 29, y + 6, 2, 2);

    // Reflejo en los lentes
    ctx.fillStyle = 'rgba(100, 150, 200, 0.3)';
    ctx.fillRect(x + 12, y + 6, 3, 2);
    ctx.fillRect(x + 22, y + 6, 3, 2);

    // --- Boca: expresión nerviosa (línea torcida) ---
    ctx.strokeStyle = '#8a5a4a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 14, y + 14);
    ctx.lineTo(x + 18, y + 13);
    ctx.lineTo(x + 22, y + 15);
    ctx.stroke();

    // --- Maletín sospechoso (mano izquierda) ---
    ctx.fillStyle = '#5a3a1a';
    ctx.fillRect(x - 8, y + alto - 18, 14, 10);
    // Asa del maletín
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - 4, y + alto - 20, 6, 3);
    // Cerradura
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(x - 3, y + alto - 12, 3, 2);

    // --- Reloj de oro (muñeca derecha) ---
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(x + ancho + 1, y + alto - 12, 5, 4);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x + ancho + 2, y + alto - 11, 3, 2);

    // --- Hombros anchos ---
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(x - 2, y + 14, 6, 8);
    ctx.fillRect(x + ancho - 4, y + 14, 6, 8);

    // --- Botones del traje ---
    ctx.fillStyle = '#333344';
    ctx.beginPath();
    ctx.arc(cx, y + 32, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, y + 38, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
}
