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
    this.bloqueoEntrada = false;
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

    // --- Dibujar a Pepito (placeholder más grande) ---
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

    // --- Dibujar a Pepita (placeholder más grande) ---
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
      '14 anos. Ascendencia taina, espanola y africana.',
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

  // --- Dibujar un personaje placeholder con detalles ---
  // Usamos rectángulos y cuadrados para construir una silueta simple
  // que da la idea del personaje sin necesitar sprites reales
  _dibujarPersonaje(ctx, opciones) {
    const { x, y, ancho, alto, color, nombre, seleccionado, animacion, peloPuntas } = opciones;
    const yAnimado = y + animacion;

    // Borde dorado si está seleccionado — feedback visual claro
    if (seleccionado) {
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 3;
      ctx.strokeRect(x - 10, yAnimado - 10, ancho + 20, alto + 20);

      // Brillo sutil detrás del personaje seleccionado
      ctx.fillStyle = 'rgba(255, 215, 0, 0.1)';
      ctx.fillRect(x - 10, yAnimado - 10, ancho + 20, alto + 20);
    }

    // Cuerpo principal
    ctx.fillStyle = color;
    ctx.fillRect(x, yAnimado, ancho, alto);

    // Cabeza (un cuadrado encima del cuerpo)
    const cabezaTamano = ancho * 0.6;
    const cabezaX = x + (ancho - cabezaTamano) / 2;
    const cabezaY = yAnimado - cabezaTamano * 0.7;
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(cabezaX, cabezaY, cabezaTamano, cabezaTamano);

    // Pelo: corto con puntas para Pepito, largo para Pepita
    ctx.fillStyle = '#1a1a1a';
    if (peloPuntas) {
      // Pelo corto: solo la parte de arriba de la cabeza
      ctx.fillRect(cabezaX - 2, cabezaY - 4, cabezaTamano + 4, 10);
    } else {
      // Pelo largo: cubre los lados de la cabeza y baja más
      ctx.fillRect(cabezaX - 4, cabezaY - 4, cabezaTamano + 8, 10);
      ctx.fillRect(cabezaX - 4, cabezaY, 5, cabezaTamano + 8);
      ctx.fillRect(cabezaX + cabezaTamano - 1, cabezaY, 5, cabezaTamano + 8);
    }

    // Ojos blancos con pupilas negras
    ctx.fillStyle = '#FFFFFF';
    const ojoCentroX = cabezaX + cabezaTamano / 2;
    const ojoCentroY = cabezaY + cabezaTamano * 0.4;
    ctx.fillRect(ojoCentroX - 8, ojoCentroY, 5, 5);
    ctx.fillRect(ojoCentroX + 3, ojoCentroY, 5, 5);

    ctx.fillStyle = '#000000';
    ctx.fillRect(ojoCentroX - 6, ojoCentroY + 1, 2, 2);
    ctx.fillRect(ojoCentroX + 5, ojoCentroY + 1, 2, 2);

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

      // Avanzamos a la cinemática introductoria
      if (this.juego.cambiarEscena) {
        this.juego.cambiarEscena('introCinematica');
      }
    }
  }
}
