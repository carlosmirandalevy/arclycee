// ============================================================
// INTRO-CINEMATICA.JS - La secuencia animada de introducción
// ============================================================
// Cuenta la historia de cómo el jugador descubre la reliquia
// en una obra de construcción y cae en las cuevas subterráneas.
// Usa pasos secuenciales con efectos de fade, texto y temblor
// de pantalla para crear tensión sin necesitar video.
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO } from '../motor/configuracion.js';

export class IntroCinematica {

  constructor() {
    // Paso actual de la cinemática (0 a 5)
    // Cada paso es una "escena" con su propia animación y texto
    this.paso = 0;

    // Temporizador para avanzar automáticamente entre pasos
    // Cada paso dura unos 3-4 segundos si el jugador no lo salta
    this.temporizador = 0;

    // Texto que se muestra en el paso actual
    this.textoActual = '';

    // Opacidad general: usamos esto para hacer fade in/out
    // 0 = invisible, 1 = completamente visible
    this.opacidad = 0;

    // Efecto de temblor: cuánto "se mueve" la pantalla
    // Simula un terremoto cuando el suelo se derrumba
    this.temblor = 0;

    // Posición Y del personaje cayendo (para el paso 4)
    this.personajeCaidaY = 200;

    // Posición X del personaje caminando (para el paso 1)
    this.personajeCaminaX = -30;

    // El efecto de destello/brillo (para el paso 2)
    this.brilloOpacidad = 0;
    this.brilloTiempo = 0;

    // Bloqueo de entrada
    this.bloqueoEntrada = false;

    // Duración de cada paso en "unidades de tiempo"
    // Más largo = el jugador tiene más tiempo para leer
    this.duracionesPasos = [3.5, 4.0, 3.5, 3.0, 3.5, 4.0];
  }

  // --- Preparar la cinemática ---
  iniciar(juego) {
    this.juego = juego;
    this.paso = 0;
    this.temporizador = 0;
    this.opacidad = 0;
    this.temblor = 0;
    this.personajeCaidaY = 200;
    this.personajeCaminaX = -30;
    this.bloqueoEntrada = false;
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, _jugador, _companeros) {
    this.temporizador += dt;

    // Permitir saltar la intro con el botón de acción
    // Porque no todos quieren ver la cinemática cada vez que juegan
    if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      this._avanzarPaso();
      this.bloqueoEntrada = true;
    }

    if (!entrada.estaPresionada('accion')) {
      this.bloqueoEntrada = false;
    }

    // Avance automático cuando se cumple el tiempo del paso actual
    const duracion = this.duracionesPasos[this.paso] || 3.5;
    if (this.temporizador >= duracion) {
      this._avanzarPaso();
    }

    // --- Animaciones específicas por paso ---
    switch (this.paso) {
      case 0:
        // Fade in del texto inicial — aparece gradualmente
        this.opacidad = Math.min(1, this.temporizador / 1.5);
        break;

      case 1:
        // Personaje camina de izquierda a derecha en la obra
        this.opacidad = 1;
        this.personajeCaminaX += 60 * dt;
        // No dejar que camine más allá de la pantalla
        if (this.personajeCaminaX > ANCHO_JUEGO * 0.6) {
          this.personajeCaminaX = ANCHO_JUEGO * 0.6;
        }
        break;

      case 2:
        // Efecto de brillo parpadeante — algo brilla entre los escombros
        this.brilloTiempo += dt * 5;
        this.brilloOpacidad = (Math.sin(this.brilloTiempo) + 1) / 2;
        break;

      case 3:
        // Temblor de pantalla — el suelo se sacude
        // Aumenta con el tiempo para crear urgencia
        this.temblor = Math.min(8, this.temporizador * 3);
        break;

      case 4:
        // El personaje cae — velocidad aumenta con gravedad simulada
        this.personajeCaidaY += 150 * dt;
        // Fade gradual a negro mientras cae
        this.opacidad = Math.min(1, this.temporizador / 2);
        break;

      case 5:
        // Texto final fade in
        this.opacidad = Math.min(1, this.temporizador / 1.5);
        this.temblor = 0;
        break;
    }
  }

  // --- Dibujar la cinemática ---
  dibujar(renderizador, ancho, alto, textos) {
    const ctx = renderizador.ctx;

    // Aplicar temblor de pantalla si está activo
    // Movemos TODO el canvas un poco en X e Y aleatorios
    const temblorX = this.temblor > 0 ? (Math.random() - 0.5) * this.temblor : 0;
    const temblorY = this.temblor > 0 ? (Math.random() - 0.5) * this.temblor : 0;

    ctx.save();
    ctx.translate(temblorX, temblorY);

    switch (this.paso) {
      case 0:
        this._dibujarPaso0(ctx, ancho, alto);
        break;
      case 1:
        this._dibujarPaso1(ctx, ancho, alto);
        break;
      case 2:
        this._dibujarPaso2(ctx, ancho, alto);
        break;
      case 3:
        this._dibujarPaso3(ctx, ancho, alto);
        break;
      case 4:
        this._dibujarPaso4(ctx, ancho, alto);
        break;
      case 5:
        this._dibujarPaso5(ctx, ancho, alto);
        break;
    }

    ctx.restore();

    // Indicador de "presiona para continuar" — siempre visible
    ctx.font = '12px monospace';
    ctx.fillStyle = 'rgba(150, 150, 150, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText('Presiona E para continuar', ancho / 2, alto - 20);
    ctx.textAlign = 'left';
  }

  // --- Paso 0: Pantalla negra, texto aparece ---
  // "En algún lugar de Santo Domingo..."
  _dibujarPaso0(ctx, ancho, alto) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, ancho, alto);

    ctx.font = 'bold 22px monospace';
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacidad})`;
    ctx.textAlign = 'center';
    ctx.fillText('En algun lugar de Santo Domingo...', ancho / 2, alto / 2);
    ctx.textAlign = 'left';
  }

  // --- Paso 1: Obra de construcción, personaje camina ---
  _dibujarPaso1(ctx, ancho, alto) {
    // Cielo azul grisáceo (amanecer en la ciudad)
    ctx.fillStyle = '#6688aa';
    ctx.fillRect(0, 0, ancho, alto * 0.5);

    // Suelo de la obra (tierra y concreto)
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(0, alto * 0.65, ancho, alto * 0.35);

    // Escombros: rectángulos grises representando concreto roto
    ctx.fillStyle = '#999999';
    ctx.fillRect(200, alto * 0.58, 80, 40);
    ctx.fillRect(400, alto * 0.55, 60, 55);
    ctx.fillRect(600, alto * 0.60, 90, 30);

    // Estructura de construcción al fondo (rectángulos como edificio)
    ctx.fillStyle = '#666666';
    ctx.fillRect(100, alto * 0.2, 150, alto * 0.45);
    ctx.fillRect(650, alto * 0.15, 120, alto * 0.5);

    // Líneas de andamios
    ctx.strokeStyle = '#444444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, alto * 0.35);
    ctx.lineTo(250, alto * 0.35);
    ctx.moveTo(650, alto * 0.30);
    ctx.lineTo(770, alto * 0.30);
    ctx.stroke();

    // Personaje caminando (placeholder simple)
    const genero = this.juego ? this.juego.generoJugador || 'pepito' : 'pepito';
    const colorPersonaje = genero === 'pepito' ? '#4488ff' : '#aa44ff';
    ctx.fillStyle = colorPersonaje;
    ctx.fillRect(this.personajeCaminaX, alto * 0.58, 20, 28);

    // Cabeza
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(this.personajeCaminaX + 3, alto * 0.58 - 12, 14, 14);
  }

  // --- Paso 2: Algo brilla entre los escombros ---
  _dibujarPaso2(ctx, ancho, alto) {
    // Reutilizamos el fondo de la obra
    this._dibujarPaso1(ctx, ancho, alto);

    // Personaje detenido mirando hacia abajo
    this.personajeCaminaX = ancho * 0.6;

    // Destello/brillo sobre un punto en los escombros
    // El brillo parpadea para llamar la atención del jugador
    const brilloX = ancho * 0.62;
    const brilloY = alto * 0.62;

    // Halo de luz dorada parpadeante
    const radio = 15 + this.brilloOpacidad * 8;
    const gradienteBrillo = ctx.createRadialGradient(
      brilloX, brilloY, 2,
      brilloX, brilloY, radio
    );
    gradienteBrillo.addColorStop(0, `rgba(255, 215, 0, ${this.brilloOpacidad})`);
    gradienteBrillo.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.fillStyle = gradienteBrillo;
    ctx.fillRect(brilloX - radio, brilloY - radio, radio * 2, radio * 2);

    // Punto central brillante
    ctx.fillStyle = `rgba(255, 255, 200, ${this.brilloOpacidad})`;
    ctx.fillRect(brilloX - 3, brilloY - 3, 6, 6);

    // Texto narrativo
    ctx.font = '16px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText('Algo brilla entre los escombros...', ancho / 2, 40);
    ctx.textAlign = 'left';
  }

  // --- Paso 3: Recoge la reliquia, el suelo tiembla ---
  _dibujarPaso3(ctx, ancho, alto) {
    // Fondo de la obra con el terremoto
    this._dibujarPaso1(ctx, ancho, alto);

    // Grietas en el suelo — líneas que se expanden con el temblor
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2 + this.temblor * 0.3;
    ctx.beginPath();
    // Grieta 1
    ctx.moveTo(ancho * 0.5, alto * 0.65);
    ctx.lineTo(ancho * 0.55 + this.temblor, alto * 0.75);
    ctx.lineTo(ancho * 0.52 - this.temblor, alto * 0.9);
    // Grieta 2
    ctx.moveTo(ancho * 0.6, alto * 0.65);
    ctx.lineTo(ancho * 0.65, alto * 0.80 + this.temblor);
    ctx.stroke();

    // Texto de alarma — rojo para urgencia
    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = '#FF4444';
    ctx.textAlign = 'center';
    ctx.fillText('CUIDADO! El suelo se derrumba!', ancho / 2, 40);
    ctx.textAlign = 'left';
  }

  // --- Paso 4: El personaje cae al vacío ---
  _dibujarPaso4(ctx, ancho, alto) {
    // Fondo oscuro (el interior del agujero)
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, ancho, alto);

    // Paredes de roca a los lados (el agujero por donde cae)
    ctx.fillStyle = '#3d2b1f';
    ctx.fillRect(0, 0, ancho * 0.3, alto);
    ctx.fillRect(ancho * 0.7, 0, ancho * 0.3, alto);

    // Luz del agujero arriba (un óvalo claro que se aleja)
    // Se vuelve más pequeño mientras el personaje cae más
    const tamanoLuz = Math.max(20, 100 - this.personajeCaidaY * 0.15);
    const gradienteLuz = ctx.createRadialGradient(
      ancho / 2, 30, tamanoLuz * 0.3,
      ancho / 2, 30, tamanoLuz
    );
    gradienteLuz.addColorStop(0, 'rgba(150, 180, 220, 0.5)');
    gradienteLuz.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradienteLuz;
    ctx.fillRect(0, 0, ancho, 200);

    // Personaje cayendo
    const genero = this.juego ? this.juego.generoJugador || 'pepito' : 'pepito';
    const colorPersonaje = genero === 'pepito' ? '#4488ff' : '#aa44ff';
    const personajeX = ancho / 2 - 10;

    // Limitamos la posición para que no caiga infinitamente
    const yDibujo = Math.min(this.personajeCaidaY, alto * 0.8);

    ctx.fillStyle = colorPersonaje;
    ctx.fillRect(personajeX, yDibujo, 20, 28);
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(personajeX + 3, yDibujo - 12, 14, 14);

    // Líneas de velocidad (indican que está cayendo rápido)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const lineaX = personajeX - 15 + Math.random() * 50;
      ctx.beginPath();
      ctx.moveTo(lineaX, yDibujo - 20 - Math.random() * 30);
      ctx.lineTo(lineaX, yDibujo - 40 - Math.random() * 30);
      ctx.stroke();
    }

    // Fade a negro progresivo
    ctx.fillStyle = `rgba(0, 0, 0, ${this.opacidad * 0.7})`;
    ctx.fillRect(0, 0, ancho, alto);
  }

  // --- Paso 5: Pantalla negra, texto final ---
  _dibujarPaso5(ctx, ancho, alto) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, ancho, alto);

    ctx.font = 'italic 22px monospace';
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacidad})`;
    ctx.textAlign = 'center';
    ctx.fillText('...Donde estoy?', ancho / 2, alto / 2);
    ctx.textAlign = 'left';
  }

  // --- Avanzar al siguiente paso ---
  _avanzarPaso() {
    this.paso++;
    this.temporizador = 0;
    this.opacidad = 0;
    this.temblor = 0;

    // Después del último paso, transicionar a las Cuevas del Pomier
    if (this.paso > 5) {
      if (this.juego && this.juego.cambiarEscena) {
        this.juego.cambiarEscena('cuevasPomier');
      }
    }
  }
}
