// ============================================================
// CUEVAS-POMIER.JS - Primer nivel jugable (plataforma 2D)
// ============================================================
// Las Cuevas del Pomier son un sistema real de cuevas en San
// Cristóbal, República Dominicana, con petroglifos taínos
// auténticos. Este nivel introduce la mecánica de oscuridad,
// exploración y la problemática de los graffitis vandálicos
// que dañan el patrimonio real.
//
// MODO: Plataforma (vista lateral con gravedad y saltos)
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, GRAVEDAD, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';

export class CuevasPomier {

  constructor() {
    // --- Diseño del nivel ---
    // Plataformas son los "pisos" donde el jugador puede pararse
    this.plataformas = [];

    // Petroglifos: arte taíno real en las paredes de la cueva
    // Cada uno tiene un mensaje educativo sobre la cultura taína
    this.petroglifos = [];

    // Objetos coleccionables: artefactos que el jugador puede recoger
    this.objetos = [];

    // Graffitis vandálicos: muestran el problema real de la destrucción
    // del patrimonio — el jugador aprende por qué esto es malo
    this.graffitis = [];

    // Posición de la salida del nivel
    this.salidaX = 0;
    this.salidaY = 0;

    // --- Sistema de oscuridad ---
    // 0.85 = muy oscuro. Solo se ve alrededor del jugador.
    // Esto crea tensión y la sensación real de explorar una cueva
    this.nivelOscuridad = 0.85;

    // Radio del círculo de luz alrededor del jugador
    // Se agranda si tiene linterna en el inventario
    this.radioLuz = 80;

    // --- Cámara ---
    // La cámara sigue al jugador suavemente por el nivel
    // sin movimientos bruscos que mareen
    this.camaraX = 0;
    this.camaraY = 0;

    // Ancho total del nivel — mucho más ancho que la pantalla
    // para que el jugador tenga que avanzar horizontalmente
    this.anchoNivel = 3000;
    this.altoNivel = ALTO_JUEGO;

    // Mensaje que se muestra cuando el jugador interactúa con algo
    this.mensajeActual = null;
    this.tiempoMensaje = 0;

    // Misión actual que aparece en el HUD
    this.misionActual = 'Explora la cueva y encuentra la salida';

    // --- Respawn (reaparición) ---
    // Si el jugador cae al vacío, lo devolvemos al último piso seguro.
    // Guardamos la última posición donde estuvo parado en algo sólido.
    this.ultimaPosSeguraX = 60;
    this.ultimaPosSeguraY = 350;

    // Límite inferior: si el jugador cae más abajo que esto, se respawnea.
    // Es un poco más abajo que la plataforma más baja para dar tiempo
    // a ver la caída antes de reaparecer (feedback visual).
    this.limiteInferior = ALTO_JUEGO + 100;

    // Bloqueo de entrada para evitar pulsaciones repetidas
    this.bloqueoEntrada = false;
  }

  // --- Construir el nivel ---
  // Creamos las plataformas, petroglifos y objetos a mano
  // porque este nivel es lo suficientemente pequeño para eso
  iniciar(juego) {
    this.juego = juego;

    // Poner al jugador en modo plataforma con gravedad
    if (juego.jugador) {
      juego.jugador.modoJuego = 'plataforma';
      juego.jugador.x = 60;
      juego.jugador.y = 350;
    }

    // --- Plataformas ---
    // Cada una es un rectángulo sólido {x, y, ancho, alto}
    // Diseñadas para crear un recorrido que sube y baja
    this.plataformas = [
      // Suelo principal al inicio (donde cae el jugador)
      { x: 0, y: 430, ancho: 400, alto: 110 },

      // Escalones que suben — obligan a saltar
      { x: 350, y: 380, ancho: 120, alto: 20 },
      { x: 500, y: 340, ancho: 100, alto: 20 },

      // Plataforma ancha intermedia — zona segura para respirar
      { x: 650, y: 360, ancho: 250, alto: 20 },

      // Salto largo sobre un vacío — desafiante
      { x: 970, y: 330, ancho: 80, alto: 20 },

      // Zona baja (el jugador baja para encontrar un petroglifo)
      { x: 1100, y: 420, ancho: 200, alto: 120 },

      // Subida con plataformas pequeñas
      { x: 1350, y: 370, ancho: 80, alto: 20 },
      { x: 1470, y: 320, ancho: 80, alto: 20 },
      { x: 1590, y: 280, ancho: 100, alto: 20 },

      // Zona alta — vista panorámica de la cueva
      { x: 1740, y: 300, ancho: 300, alto: 20 },

      // Descenso hacia la salida
      { x: 2090, y: 350, ancho: 120, alto: 20 },
      { x: 2240, y: 390, ancho: 150, alto: 20 },

      // Suelo final donde está la salida
      { x: 2450, y: 430, ancho: 550, alto: 110 },

      // Techo de la cueva (pared superior que impide salir por arriba)
      { x: 0, y: 0, ancho: this.anchoNivel, alto: 30 },

      // Paredes laterales
      { x: 0, y: 0, ancho: 20, alto: this.altoNivel },
      { x: this.anchoNivel - 20, y: 0, ancho: 20, alto: this.altoNivel }
    ];

    // --- Petroglifos ---
    // Representan el arte taíno real de las cuevas
    // Cada tipo tiene un símbolo diferente y un mensaje educativo
    this.petroglifos = [
      {
        x: 200, y: 380,
        descubierto: false,
        tipo: 'sol',
        mensaje: 'Petroglifo del Sol: Los tainos adoraban al sol como fuente de vida.'
      },
      {
        x: 700, y: 310,
        descubierto: false,
        tipo: 'murcielago',
        mensaje: 'Cemi Murcielago: Los tainos creian que los muertos se convertian en murcielagos.'
      },
      {
        x: 1150, y: 370,
        descubierto: false,
        tipo: 'cara',
        mensaje: 'Rostro tallado: Puede representar un cacique o un espiritu ancestral.'
      },
      {
        x: 1800, y: 250,
        descubierto: false,
        tipo: 'espiral',
        mensaje: 'Espiral: Simbolo de agua y movimiento. El mar era sagrado para los tainos.'
      },
      {
        x: 2600, y: 380,
        descubierto: false,
        tipo: 'rana',
        mensaje: 'Rana: Representaba la fertilidad y la lluvia en la cultura taina.'
      }
    ];

    // --- Objetos coleccionables ---
    this.objetos = [
      { x: 520, y: 310, tipo: 'linterna', recogido: false,
        mensaje: 'Encontraste una linterna! Ahora puedes ver mas lejos.' },
      { x: 1500, y: 290, tipo: 'fragmentoMapa', recogido: false,
        mensaje: 'Un fragmento de mapa antiguo... parece mostrar otras cuevas.' },
      { x: 2700, y: 400, tipo: 'artefactoTaino', recogido: false,
        mensaje: 'Un artefacto taino! Deberias llevarlo al museo.' }
    ];

    // --- Graffitis ---
    // Muestran el problema REAL del vandalismo en las cuevas
    // El jugador los ve y entiende por qué la conservación es importante
    this.graffitis = [
      { x: 400, y: 400, texto: 'PEPE 2019', color: '#FF0000' },
      { x: 900, y: 320, texto: 'yo estuve aki', color: '#00FF00' },
      { x: 1650, y: 260, texto: 'RD #1', color: '#FF00FF' }
    ];

    // La salida está al extremo derecho del nivel
    this.salidaX = 2850;
    this.salidaY = 390;

    // Iniciar cámara en la posición del jugador
    this.camaraX = 0;
    this.camaraY = 0;

    // Resetear el respawn al punto de inicio
    this.ultimaPosSeguraX = 60;
    this.ultimaPosSeguraY = 350;
    this.bloqueoEntrada = false;
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, jugador, companeros) {
    if (!jugador) return;

    // --- Salir de la cueva con Q/Escape ---
    // El jugador puede volver al mapa en cualquier momento.
    // Esto evita que el jugador quede "atrapado" sin salida.
    if (entrada.estaPresionada('cancelar') && !this.bloqueoEntrada) {
      this.bloqueoEntrada = true;
      if (this.juego && this.juego.cambiarEscena) {
        this.juego.cambiarEscena('mapaPrincipal');
      }
      return;
    }

    // Desbloquear cuando se suelta la tecla de cancelar
    if (!entrada.estaPresionada('cancelar')) {
      this.bloqueoEntrada = false;
    }

    // --- Detección de caída al vacío ---
    // Si el jugador cae más abajo del límite inferior, lo devolvemos
    // a la última posición donde estuvo parado (respawn).
    // También pierde un poco de vida como consecuencia de la caída.
    if (jugador.y > this.limiteInferior) {
      jugador.x = this.ultimaPosSeguraX;
      jugador.y = this.ultimaPosSeguraY;
      jugador.velocidadX = 0;
      jugador.velocidadY = 0;
      jugador.enSuelo = true;
      jugador.puedeSaltar = true;

      // Perder un poco de vida por la caída (10 puntos)
      jugador.recibirDano(10);

      this.mensajeActual = 'Caiste al vacio! Vuelves al ultimo punto seguro.';
      this.tiempoMensaje = 3;
      return;
    }

    // --- Movimiento del jugador ---
    // Leemos la entrada y calculamos velocidades
    jugador.velocidadX = 0;
    jugador.esAnimando = false;

    if (entrada.estaPresionada('izquierda')) {
      jugador.velocidadX = -VELOCIDAD_JUGADOR;
      jugador.direccion = 'izquierda';
      jugador.esAnimando = true;
    }
    if (entrada.estaPresionada('derecha')) {
      jugador.velocidadX = VELOCIDAD_JUGADOR;
      jugador.direccion = 'derecha';
      jugador.esAnimando = true;
    }

    // Salto: solo si está tocando el suelo
    // Sin esta restricción podría saltar infinitamente en el aire
    if (entrada.estaPresionada('saltar') && jugador.enSuelo && jugador.puedeSaltar) {
      jugador.velocidadY = -10;
      jugador.enSuelo = false;
      jugador.puedeSaltar = false;
    }

    // Gravedad: siempre jala hacia abajo.
    // NO multiplicamos por dt porque usamos física de "frame fijo":
    // la velocidad ya se aplica multiplicada por dt en la posición.
    // Si multiplicáramos por dt aquí TAMBIÉN, la gravedad sería
    // demasiado débil (dt ≈ 0.016, haría la gravedad 60 veces menor).
    jugador.velocidadY += GRAVEDAD;

    // Aplicar movimiento: aquí SÍ multiplicamos por un factor de escala
    // para que el movimiento sea suave independiente del framerate.
    // Usamos 60 como referencia porque apuntamos a 60 FPS.
    const factorTiempo = dt * 60;
    jugador.x += jugador.velocidadX * factorTiempo;
    jugador.y += jugador.velocidadY * factorTiempo;

    // --- Colisiones con plataformas ---
    // Verificamos DESPUÉS de mover para "corregir" si se metió en una
    this.verificarColisionPlataformas(jugador);

    // --- Guardar posición segura ---
    // Cada vez que el jugador está parado en suelo sólido, guardamos
    // su posición. Si después cae al vacío, lo devolvemos aquí.
    if (jugador.enSuelo) {
      this.ultimaPosSeguraX = jugador.x;
      this.ultimaPosSeguraY = jugador.y;
    }

    // --- Límites del nivel ---
    // No dejamos que salga por los lados
    if (jugador.x < 20) jugador.x = 20;
    if (jugador.x + jugador.ancho > this.anchoNivel - 20) {
      jugador.x = this.anchoNivel - 20 - jugador.ancho;
    }

    // --- Recoger objetos ---
    // Revisamos si el jugador está encima de algún objeto
    for (const objeto of this.objetos) {
      if (!objeto.recogido && this._estaCerca(jugador, objeto, 30)) {
        objeto.recogido = true;
        this.mensajeActual = objeto.mensaje;
        this.tiempoMensaje = 4;

        // Si es linterna, agrandar el radio de luz
        if (objeto.tipo === 'linterna') {
          this.radioLuz = 150;
          jugador.agregarAlInventario({ nombre: 'linterna' });
        }

        // Actualizar misión al recoger el artefacto final
        if (objeto.tipo === 'artefactoTaino') {
          this.misionActual = 'Lleva el artefacto a la salida de la cueva';
        }
      }
    }

    // --- Interacción con petroglifos ---
    // El jugador presiona acción cerca de un petroglifo para "estudiarlo"
    if (entrada.estaPresionada('accion')) {
      for (const petro of this.petroglifos) {
        if (!petro.descubierto && this._estaCerca(jugador, petro, 40)) {
          petro.descubierto = true;
          this.mensajeActual = petro.mensaje;
          this.tiempoMensaje = 5;
        }
      }
    }

    // --- Verificar si llega a la salida ---
    if (this._estaCerca(jugador, { x: this.salidaX, y: this.salidaY }, 35)) {
      if (this.juego) {
        // Marcar las Cuevas del Pomier como completadas en el progreso.
        // Esto desbloquea el siguiente nodo (Asentamiento Taíno I) en el mapa.
        if (this.juego.progreso) {
          if (!this.juego.progreso.nodosCompletados.includes(0)) {
            this.juego.progreso.nodosCompletados.push(0);
          }
          if (!this.juego.progreso.nodosDesbloqueados.includes(1)) {
            this.juego.progreso.nodosDesbloqueados.push(1);
          }
        }

        if (this.juego.cambiarEscena) {
          this.juego.cambiarEscena('mapaPrincipal');
        }
      }
    }

    // --- Eco-localización del Cemí Murciélago ---
    // Si el compañero murciélago está activo, revela objetos ocultos
    if (companeros) {
      for (const companero of companeros) {
        if (companero.tipo === 'cemiMurcielago' && companero.ecoLocalizacion) {
          for (const obj of this.objetos) {
            // Los objetos "brillan" más fuerte cuando el murciélago detecta
            obj._reveladoPorEco = true;
          }
        }
      }
    }

    // --- Cámara suave ---
    // La cámara persigue al jugador con un poco de retraso
    // para que el movimiento se sienta fluido, no robótico
    const objetivoCamaraX = jugador.x - ANCHO_JUEGO / 2 + jugador.ancho / 2;
    const objetivoCamaraY = jugador.y - ALTO_JUEGO / 2 + jugador.alto / 2;

    // Interpolación lineal (lerp): mueve la cámara un 8% hacia el objetivo cada frame
    // Valores bajos = más suave, valores altos = más brusco
    this.camaraX += (objetivoCamaraX - this.camaraX) * 0.08;
    this.camaraY += (objetivoCamaraY - this.camaraY) * 0.08;

    // No permitir que la cámara muestre fuera del nivel
    this.camaraX = Math.max(0, Math.min(this.anchoNivel - ANCHO_JUEGO, this.camaraX));
    this.camaraY = Math.max(0, Math.min(this.altoNivel - ALTO_JUEGO, this.camaraY));

    // --- Temporizador de mensajes ---
    if (this.tiempoMensaje > 0) {
      this.tiempoMensaje -= dt;
      if (this.tiempoMensaje <= 0) {
        this.mensajeActual = null;
      }
    }
  }

  // --- Dibujar todo el nivel ---
  // Los parámetros extra (jugador, companeros) vienen después de 'textos'
  dibujar(renderizador, ancho, alto, textos, jugador, companeros) {
    if (!jugador) return;

    const ctx = renderizador.ctx;

    // Posición del jugador relativa a la cámara (para dibujar en el lugar correcto)
    const offsetX = -this.camaraX;
    const offsetY = -this.camaraY;

    ctx.save();

    // --- Fondo de la cueva ---
    // Marrón oscuro con variaciones para simular roca natural
    ctx.fillStyle = '#1a1209';
    ctx.fillRect(0, 0, ancho, alto);

    // Variaciones de color en el fondo (manchas más claras de roca)
    ctx.fillStyle = '#231a0f';
    ctx.fillRect(100 + offsetX, 50 + offsetY, 200, 150);
    ctx.fillRect(600 + offsetX, 80 + offsetY, 180, 120);
    ctx.fillRect(1200 + offsetX, 40 + offsetY, 250, 130);
    ctx.fillRect(2000 + offsetX, 60 + offsetY, 220, 140);

    // --- Plataformas ---
    // Las dibujamos como rectángulos de piedra con un borde más oscuro
    for (const plat of this.plataformas) {
      const px = plat.x + offsetX;
      const py = plat.y + offsetY;

      // Solo dibujar si está visible en pantalla (optimización)
      if (px + plat.ancho < 0 || px > ancho) continue;
      if (py + plat.alto < 0 || py > alto) continue;

      // Superficie de la plataforma
      ctx.fillStyle = '#5C4033';
      ctx.fillRect(px, py, plat.ancho, plat.alto);

      // Borde superior más claro — simula la parte iluminada de la roca
      ctx.fillStyle = '#7A5C47';
      ctx.fillRect(px, py, plat.ancho, 3);

      // Borde inferior más oscuro — sombra
      ctx.fillStyle = '#3D2B1F';
      ctx.fillRect(px, py + plat.alto - 2, plat.ancho, 2);
    }

    // --- Petroglifos ---
    // Solo se ven si están dentro del radio de luz o ya fueron descubiertos
    for (const petro of this.petroglifos) {
      const px = petro.x + offsetX;
      const py = petro.y + offsetY;

      // Calcular distancia al jugador para ver si está iluminado
      const dist = this._distancia(jugador.x, jugador.y, petro.x, petro.y);
      const esVisible = dist < this.radioLuz || petro.descubierto;

      if (!esVisible) continue;

      // Fondo del petroglifo (zona de pared más lisa)
      ctx.fillStyle = petro.descubierto ? '#4A3728' : '#3D2B1F';
      ctx.fillRect(px - 5, py - 5, 40, 40);

      // Símbolo del petroglifo — formas geométricas simples
      // que evocan el arte taíno real
      ctx.strokeStyle = petro.descubierto ? '#FFD700' : '#AA8855';
      ctx.lineWidth = 2;
      this._dibujarSimboloPetroglifo(ctx, px + 15, py + 15, petro.tipo);

      // Indicador de interacción si está cerca y no descubierto
      if (dist < 40 && !petro.descubierto) {
        ctx.font = '11px monospace';
        ctx.fillStyle = '#FFD700';
        ctx.textAlign = 'center';
        ctx.fillText('[E] Examinar', px + 15, py - 15);
        ctx.textAlign = 'left';
      }
    }

    // --- Graffitis vandálicos ---
    // Se ven con colores chillones para contrastar con la cueva
    // y que el jugador entienda que "no pertenecen ahí"
    for (const graffiti of this.graffitis) {
      const gx = graffiti.x + offsetX;
      const gy = graffiti.y + offsetY;

      const dist = this._distancia(jugador.x, jugador.y, graffiti.x, graffiti.y);
      if (dist > this.radioLuz) continue;

      ctx.font = 'bold 14px monospace';
      ctx.fillStyle = graffiti.color;
      ctx.fillText(graffiti.texto, gx, gy);
    }

    // --- Objetos coleccionables ---
    for (const obj of this.objetos) {
      if (obj.recogido) continue;

      const ox = obj.x + offsetX;
      const oy = obj.y + offsetY;

      const dist = this._distancia(jugador.x, jugador.y, obj.x, obj.y);
      // Los objetos brillan un poco incluso en la oscuridad para guiar al jugador
      const esVisible = dist < this.radioLuz + 30 || obj._reveladoPorEco;

      if (!esVisible) continue;

      // Brillo pulsante alrededor del objeto
      const brilloPulso = (Math.sin(Date.now() * 0.005) + 1) / 2;
      const gradienteBrillo = ctx.createRadialGradient(
        ox + 8, oy + 8, 2,
        ox + 8, oy + 8, 12 + brilloPulso * 5
      );
      gradienteBrillo.addColorStop(0, 'rgba(255, 215, 0, 0.6)');
      gradienteBrillo.addColorStop(1, 'rgba(255, 215, 0, 0)');
      ctx.fillStyle = gradienteBrillo;
      ctx.fillRect(ox - 10, oy - 10, 36, 36);

      // El objeto en sí (cuadrado dorado)
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(ox, oy, 16, 16);

      // Borde más oscuro
      ctx.strokeStyle = '#B8860B';
      ctx.lineWidth = 1;
      ctx.strokeRect(ox, oy, 16, 16);
    }

    // --- Marcador de salida ---
    const sx = this.salidaX + offsetX;
    const sy = this.salidaY + offsetY;
    const distSalida = this._distancia(jugador.x, jugador.y, this.salidaX, this.salidaY);

    if (distSalida < this.radioLuz + 50) {
      // Luz que sale de la salida (sugiere el exterior)
      const gradienteSalida = ctx.createRadialGradient(
        sx + 15, sy + 15, 5,
        sx + 15, sy + 15, 40
      );
      gradienteSalida.addColorStop(0, 'rgba(200, 220, 255, 0.4)');
      gradienteSalida.addColorStop(1, 'rgba(200, 220, 255, 0)');
      ctx.fillStyle = gradienteSalida;
      ctx.fillRect(sx - 25, sy - 25, 80, 80);

      // Rectángulo de la salida
      ctx.fillStyle = '#AACCFF';
      ctx.fillRect(sx, sy, 30, 40);

      ctx.font = '11px monospace';
      ctx.fillStyle = '#AACCFF';
      ctx.textAlign = 'center';
      ctx.fillText('SALIDA', sx + 15, sy - 10);
      ctx.textAlign = 'left';
    }

    // --- Dibujar al jugador ---
    const jugadorPantallaX = jugador.x + offsetX;
    const jugadorPantallaY = jugador.y + offsetY;

    const colorJugador = jugador.genero === 'pepito' ? '#4488ff' : '#aa44ff';
    ctx.fillStyle = colorJugador;
    ctx.fillRect(jugadorPantallaX, jugadorPantallaY, jugador.ancho, jugador.alto);

    // Cabeza
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(jugadorPantallaX + 4, jugadorPantallaY - 10, 20, 12);

    // Ojos que miran hacia la dirección del movimiento
    ctx.fillStyle = '#FFFFFF';
    const ojosDesplX = jugador.direccion === 'izquierda' ? -2 : 2;
    ctx.fillRect(jugadorPantallaX + 8 + ojosDesplX, jugadorPantallaY - 6, 4, 4);
    ctx.fillRect(jugadorPantallaX + 16 + ojosDesplX, jugadorPantallaY - 6, 4, 4);

    ctx.restore();

    // --- Filtro de oscuridad de cueva ---
    // Se aplica ENCIMA de todo para simular la oscuridad
    // El círculo de luz alrededor del jugador queda transparente
    renderizador.aplicarFiltroCueva(
      jugadorPantallaX + jugador.ancho / 2,
      jugadorPantallaY + jugador.alto / 2,
      this.radioLuz
    );

    // --- HUD (elementos de interfaz fijos en pantalla) ---
    // Estos se dibujan DESPUÉS del filtro para que se vean siempre

    // Barra de vida
    renderizador.dibujarBarra(10, 10, 120, 14, jugador.vida / jugador.vidaMaxima,
      '#333333', '#44CC44');
    renderizador.dibujarTexto('Vida', 15, 22, {
      tamano: 10, color: '#FFFFFF'
    });

    // Misión actual
    renderizador.dibujarTexto(this.misionActual, ancho - 10, 20, {
      tamano: 12, color: '#CCCCCC', alineacion: 'right'
    });

    // Mensaje temporal (cuando descubres algo)
    if (this.mensajeActual) {
      // Fondo semitransparente para el mensaje
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(ancho / 2 - 250, alto - 80, 500, 50);
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 1;
      ctx.strokeRect(ancho / 2 - 250, alto - 80, 500, 50);

      renderizador.dibujarTexto(this.mensajeActual, ancho / 2, alto - 50, {
        tamano: 13, color: '#FFFFFF', alineacion: 'center'
      });
    }

    // --- Controles en la parte inferior ---
    // Recordatorio de teclas para que el jugador no se pierda
    renderizador.dibujarTexto('WASD/Flechas: mover | Espacio: saltar | E: examinar | Q: salir', ancho / 2, alto - 10, {
      tamano: 10, color: '#555555', alineacion: 'center'
    });
  }

  // --- Colisión AABB (Axis-Aligned Bounding Box) ---
  // Verifica si dos rectángulos se superponen
  // Es el tipo de colisión más simple y eficiente para 2D
  verificarColision(entidad, plataforma) {
    return (
      entidad.x < plataforma.x + plataforma.ancho &&
      entidad.x + entidad.ancho > plataforma.x &&
      entidad.y < plataforma.y + plataforma.alto &&
      entidad.y + entidad.alto > plataforma.y
    );
  }

  // --- Verificar colisión con TODAS las plataformas ---
  // Recorre la lista y corrige la posición del jugador si choca
  verificarColisionPlataformas(jugador) {
    jugador.enSuelo = false;

    for (const plat of this.plataformas) {
      if (!this.verificarColision(jugador, plat)) continue;

      // Calculamos cuánto se superpone en cada dirección
      // para decidir desde qué lado empujar al jugador
      const solapadoIzq = (jugador.x + jugador.ancho) - plat.x;
      const solapadoDer = (plat.x + plat.ancho) - jugador.x;
      const solapadoArriba = (jugador.y + jugador.alto) - plat.y;
      const solapadoAbajo = (plat.y + plat.alto) - jugador.y;

      // Encontrar el lado con MENOS superposición
      // Ese es el lado por donde el jugador "entró"
      const minSolapado = Math.min(solapadoIzq, solapadoDer, solapadoArriba, solapadoAbajo);

      if (minSolapado === solapadoArriba) {
        // Cayó encima de la plataforma — aterrizar
        jugador.y = plat.y - jugador.alto;
        jugador.velocidadY = 0;
        jugador.enSuelo = true;
        jugador.puedeSaltar = true;
      } else if (minSolapado === solapadoAbajo) {
        // Se golpeó la cabeza contra la plataforma
        jugador.y = plat.y + plat.alto;
        jugador.velocidadY = 0;
      } else if (minSolapado === solapadoIzq) {
        // Chocó contra el lado izquierdo de la plataforma
        jugador.x = plat.x - jugador.ancho;
      } else if (minSolapado === solapadoDer) {
        // Chocó contra el lado derecho de la plataforma
        jugador.x = plat.x + plat.ancho;
      }
    }
  }

  // --- Dibujar símbolos de petroglifos ---
  // Formas geométricas simples que evocan el arte taíno real
  _dibujarSimboloPetroglifo(ctx, cx, cy, tipo) {
    ctx.beginPath();

    switch (tipo) {
      case 'sol':
        // Círculo con rayos — el sol taíno
        ctx.arc(cx, cy, 8, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 8; i++) {
          const angulo = (i / 8) * Math.PI * 2;
          ctx.moveTo(cx + Math.cos(angulo) * 10, cy + Math.sin(angulo) * 10);
          ctx.lineTo(cx + Math.cos(angulo) * 15, cy + Math.sin(angulo) * 15);
        }
        ctx.stroke();
        break;

      case 'murcielago':
        // Alas extendidas — silueta de murciélago
        ctx.moveTo(cx - 12, cy);
        ctx.lineTo(cx - 6, cy - 8);
        ctx.lineTo(cx, cy - 3);
        ctx.lineTo(cx + 6, cy - 8);
        ctx.lineTo(cx + 12, cy);
        ctx.lineTo(cx, cy + 5);
        ctx.closePath();
        ctx.stroke();
        break;

      case 'cara':
        // Rostro con ojos circulares — máscara ceremonial
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx - 4, cy - 2, 2, 0, Math.PI * 2);
        ctx.arc(cx + 4, cy - 2, 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 3, cy + 4);
        ctx.lineTo(cx + 3, cy + 4);
        ctx.stroke();
        break;

      case 'espiral':
        // Espiral que simboliza el agua y el ciclo de la vida
        for (let i = 0; i < 20; i++) {
          const angulo = (i / 20) * Math.PI * 4;
          const radio = 2 + i * 0.6;
          const px = cx + Math.cos(angulo) * radio;
          const py = cy + Math.sin(angulo) * radio;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        break;

      case 'rana':
        // Rana simplificada — símbolo de fertilidad taína
        ctx.arc(cx, cy - 3, 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillRect(cx - 8, cy + 3, 4, 6);
        ctx.fillRect(cx + 4, cy + 3, 4, 6);
        // Ojos
        ctx.beginPath();
        ctx.arc(cx - 2, cy - 5, 1.5, 0, Math.PI * 2);
        ctx.arc(cx + 2, cy - 5, 1.5, 0, Math.PI * 2);
        ctx.stroke();
        break;
    }
  }

  // --- Verificar si dos puntos están cerca ---
  // Útil para interacciones y recoger objetos
  _estaCerca(entidad, punto, distanciaMaxima) {
    const dx = (entidad.x + entidad.ancho / 2) - punto.x;
    const dy = (entidad.y + entidad.alto / 2) - punto.y;
    return Math.sqrt(dx * dx + dy * dy) < distanciaMaxima;
  }

  // --- Calcular distancia entre dos puntos ---
  _distancia(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
