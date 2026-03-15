// ============================================================
// SELECCION-PERSONAJE.JS - Pantalla para elegir Pepito o Pepita
// ============================================================
// Aquí el jugador decide si quiere ser Pepito (chico) o Pepita
// (chica). Ambos tienen las mismas habilidades — la diferencia
// es solo visual y de algunos diálogos. Esto es importante
// para que todos los jugadores se sientan representados.
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO } from '../motor/configuracion.js';

export class SeleccionPersonaje {

  constructor() {
    // Solo hay dos opciones: pepito o pepita
    this.seleccion = 'pepito';

    // Desplazamiento para animar el personaje seleccionado
    // (un rebote suave para que se vea "vivo")
    this.animacion = 0;

    // Temporizador interno para la animación sinusoidal
    this.tiempoAnimacion = 0;

    // Bloqueo de entrada para evitar pulsaciones repetidas
    this.bloqueoEntrada = false;
  }

  // --- Preparar la escena ---
  iniciar(juego) {
    this.juego = juego;
    this.seleccion = 'pepito';
    this.tiempoAnimacion = 0;
    // Empieza bloqueado porque el jugador acaba de presionar E/Enter
    // para elegir "Nuevo Juego" y la tecla todavía está presionada
    this.bloqueoEntrada = true;
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, _jugador, _companeros) {
    // Animación de rebote: sube y baja el personaje seleccionado
    this.tiempoAnimacion += dt * 3;
    this.animacion = Math.sin(this.tiempoAnimacion) * 5;

    // Cambiar entre personajes con izquierda/derecha
    if ((entrada.estaPresionada('izquierda') || entrada.estaPresionada('derecha'))
        && !this.bloqueoEntrada) {
      // Como solo hay 2 opciones, cualquier dirección cambia al otro
      this.seleccion = this.seleccion === 'pepito' ? 'pepita' : 'pepito';
      this.bloqueoEntrada = true;
    }

    // Confirmar selección con botón de acción
    if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      this.confirmar();
      this.bloqueoEntrada = true;
    }

    // Volver al menú con cancelar
    if (entrada.estaPresionada('cancelar') && !this.bloqueoEntrada) {
      if (this.juego && this.juego.cambiarEscena) {
        this.juego.cambiarEscena('menuPrincipal');
      }
      this.bloqueoEntrada = true;
    }

    // Desbloquear cuando se sueltan todas las teclas
    if (!entrada.estaPresionada('izquierda') &&
        !entrada.estaPresionada('derecha') &&
        !entrada.estaPresionada('accion') &&
        !entrada.estaPresionada('cancelar')) {
      this.bloqueoEntrada = false;
    }
  }

  // --- Dibujar la pantalla de selección ---
  dibujar(renderizador, ancho, alto, textos) {
    const ctx = renderizador.ctx;

    // --- Fondo ---
    // Degradado suave que evoca la tierra dominicana
    const gradiente = ctx.createLinearGradient(0, 0, 0, alto);
    gradiente.addColorStop(0, '#1a0a2e');
    gradiente.addColorStop(1, '#0a0a1a');
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, ancho, alto);

    // --- Título ---
    ctx.font = 'bold 28px monospace';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.fillText(textos.seleccion.eligePersonaje, ancho / 2, 60);

    // --- Posiciones de los dos personajes ---
    // Los colocamos lado a lado con espacio entre ellos
    const pepitoX = ancho / 2 - 150;
    const pepitaX = ancho / 2 + 90;
    const personajeY = 140;
    const personajeAncho = 60;
    const personajeAlto = 80;

    // --- Dibujar a Pepito (sprite detallado del juego) ---
    this._dibujarPersonaje(ctx, {
      x: pepitoX,
      y: personajeY,
      ancho: personajeAncho,
      alto: personajeAlto,
      color: '#4488ff',
      nombre: textos.seleccion.pepito,
      seleccionado: this.seleccion === 'pepito',
      animacion: this.seleccion === 'pepito' ? this.animacion : 0,
      peloPuntas: true
    });

    // --- Dibujar a Pepita (sprite detallado del juego) ---
    this._dibujarPersonaje(ctx, {
      x: pepitaX,
      y: personajeY,
      ancho: personajeAncho,
      alto: personajeAlto,
      color: '#aa44ff',
      nombre: textos.seleccion.pepita,
      seleccionado: this.seleccion === 'pepita',
      animacion: this.seleccion === 'pepita' ? this.animacion : 0,
      peloPuntas: false
    });

    // --- Flechas indicadoras a los lados ---
    // Muestran que puedes cambiar con izquierda/derecha
    ctx.font = 'bold 30px monospace';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.fillText('<', 40, personajeY + personajeAlto / 2);
    ctx.fillText('>', ancho - 40, personajeY + personajeAlto / 2);

    // --- Descripción del personaje ---
    // Ambos comparten la misma descripción porque representan
    // la diversidad étnica real de República Dominicana
    ctx.font = '14px monospace';
    ctx.fillStyle = '#CCCCCC';
    ctx.textAlign = 'center';
    ctx.fillText(
      '14 años. Ascendencia taína, española y africana.',
      ancho / 2,
      personajeY + personajeAlto + 70
    );

    // --- Instrucciones ---
    ctx.font = '13px monospace';
    ctx.fillStyle = '#888888';
    ctx.fillText(
      'Izquierda/Derecha: cambiar | Enter/E: confirmar | Q/Esc: volver',
      ancho / 2,
      alto - 40
    );

    ctx.textAlign = 'left';
  }

  // --- Dibujar un personaje con el sprite detallado del juego ---
  // Usa el mismo diseño que se ve en los mundos top-down y las cuevas,
  // escalado ×2.5 para que se aprecie bien en la pantalla de selección
  _dibujarPersonaje(ctx, opciones) {
    const { x, y, ancho, alto, color, nombre, seleccionado, animacion, peloPuntas } = opciones;
    const yAnimado = y + animacion;

    // Borde dorado si está seleccionado — feedback visual claro
    if (seleccionado) {
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 3;
      ctx.strokeRect(x - 10, yAnimado - 20, ancho + 20, alto + 40);

      // Brillo sutil detrás del personaje seleccionado
      ctx.fillStyle = 'rgba(255, 215, 0, 0.1)';
      ctx.fillRect(x - 10, yAnimado - 20, ancho + 20, alto + 40);
    }

    // Escalar el sprite del juego (originalmente ~28×35) al tamaño de la selección
    const escala = 2.5;
    // Centrar el sprite escalado dentro del área del personaje
    const spriteAncho = 28 * escala;
    const spriteAlto = 36 * escala;
    const sx = x + (ancho - spriteAncho) / 2;
    const sy = yAnimado + (alto - spriteAlto) / 2;

    ctx.save();
    ctx.translate(sx, sy);
    ctx.scale(escala, escala);

    const esPepito = peloPuntas;
    const colorCuerpo = esPepito ? '#4488ff' : '#aa44ff';
    const colorCuerpoOscuro = esPepito ? '#3366cc' : '#8833cc';
    const colorPiel = '#D2956A';

    // --- Sombra ---
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(14, 37, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- Piernas (animación de idle sutil) ---
    const animPiernas = seleccionado ? Math.sin(this.tiempoAnimacion * 2) * 1.5 : 0;
    ctx.fillStyle = '#2a5599';
    ctx.fillRect(6, 26 + animPiernas, 7, 8);
    ctx.fillRect(15, 26 - animPiernas, 7, 8);

    // --- Zapatos ---
    ctx.fillStyle = '#4a3520';
    ctx.fillRect(5, 32 + animPiernas, 8, 3);
    ctx.fillRect(15, 32 - animPiernas, 8, 3);

    // --- Cuerpo (torso) ---
    ctx.fillStyle = colorCuerpo;
    ctx.fillRect(4, 10, 20, 16);

    // Detalle de ropa: línea más oscura al centro
    ctx.fillStyle = colorCuerpoOscuro;
    ctx.fillRect(13, 12, 2, 12);

    // --- Brazos ---
    const animBrazos = seleccionado ? Math.sin(this.tiempoAnimacion * 2) * 1 : 0;
    ctx.fillStyle = colorPiel;
    ctx.fillRect(0, 14 + animBrazos, 4, 10);
    ctx.fillRect(24, 14 - animBrazos, 4, 10);

    // --- Cabeza ---
    ctx.fillStyle = colorPiel;
    ctx.fillRect(6, 0, 16, 14);

    // --- Cabello ---
    ctx.fillStyle = esPepito ? '#2a1a0a' : '#1a0a00';
    if (esPepito) {
      ctx.fillRect(5, -2, 18, 6);
    } else {
      ctx.fillRect(4, -2, 20, 6);
      ctx.fillRect(3, 2, 4, 10);
      ctx.fillRect(21, 2, 4, 10);
    }

    // --- Ojos ---
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(9, 4, 3, 3);
    ctx.fillRect(16, 4, 3, 3);
    ctx.fillStyle = '#000000';
    ctx.fillRect(10, 5, 1.5, 1.5);
    ctx.fillRect(17, 5, 1.5, 1.5);

    // --- Boca (sonrisa) ---
    ctx.fillStyle = '#000000';
    ctx.fillRect(11, 10, 6, 1);

    ctx.restore();

    // Nombre debajo del personaje
    ctx.font = seleccionado ? 'bold 18px monospace' : '16px monospace';
    ctx.fillStyle = seleccionado ? '#FFD700' : '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(nombre, x + ancho / 2, yAnimado + alto + 30);
  }

  // --- Confirmar la selección y avanzar ---
  confirmar() {
    // Guardamos el género elegido en el objeto del juego
    // para que todas las escenas sepan qué personaje usar
    if (this.juego) {
      this.juego.generoJugador = this.seleccion;

      // Limpiar todo el progreso anterior para empezar de cero.
      // Esto es necesario porque si el jugador cargó una partida
      // antes de elegir "Nuevo Juego", el estado viejo persiste.
      if (this.juego.reiniciarEstado) {
        this.juego.reiniciarEstado();
      }

      // Avanzamos a la cinemática introductoria
      if (this.juego.cambiarEscena) {
        this.juego.cambiarEscena('introCinematica');
      }
    }
  }
}
