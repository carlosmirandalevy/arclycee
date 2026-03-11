// ============================================================
// PEPITO.JS - El personaje principal que controla el jugador
// ============================================================
// Esta clase maneja TODO lo que tiene que ver con el jugador:
// cómo se mueve, cómo se ve, su vida, su inventario, etc.
// Funciona en dos modos: vista desde arriba (topdown) y
// plataforma (como Mario), porque el juego cambia entre ambos.
// ============================================================

import { GRAVEDAD, VELOCIDAD_JUGADOR } from '../motor/configuracion.js';

export class Jugador {
  constructor(x = 0, y = 0, genero = 'pepito') {
    // --- Posición y tamaño ---
    // 28x32 es un poco más angosto que un tile (32x32)
    // para que el jugador pueda pasar por pasillos sin atascarse
    this.x = x;
    this.y = y;
    this.ancho = 28;
    this.alto = 32;

    // --- Movimiento ---
    // Separamos velocidad en X e Y para poder controlarlas independiente
    // (por ejemplo, caer en Y mientras caminas en X)
    this.velocidadX = 0;
    this.velocidadY = 0;
    this.direccion = 'abajo';

    // --- Identidad ---
    // El jugador escoge si quiere ser pepito o pepita al inicio
    this.genero = genero;

    // --- Vida ---
    // 100 de vida máxima es fácil de entender (como porcentaje)
    this.vida = 100;
    this.vidaMaxima = 100;

    // --- Inventario ---
    // Lista de objetos que el jugador carga consigo
    this.inventario = [];

    // --- Estadísticas ---
    // Empezamos en nivel 1 de todo porque el jugador apenas comienza
    this.nivelInteligencia = 1;
    this.fuerza = 1;

    // --- Necesidades ---
    // Resistencia y hambre bajan con el tiempo, obligando al jugador
    // a buscar comida y descansar (no solo correr sin parar)
    this.resistencia = 100;
    this.hambre = 100;

    // --- Animación ---
    // Controlamos si está animando para no reiniciar la animación
    // cada frame y que se vea suave
    this.esAnimando = false;
    this.cuadroAnimacion = 0;

    // --- Física de plataforma ---
    // Necesitamos saber si está en el suelo para decidir si puede saltar
    this.enSuelo = true;
    this.puedeSaltar = true;

    // --- Modo de juego actual ---
    // Guardamos el modo para saber qué físicas aplicar
    this.modoJuego = 'topdown';
  }

  // --- Actualizar cada frame ---
  // Esta función corre ~60 veces por segundo y decide cómo se mueve
  // el jugador dependiendo del modo de juego activo
  actualizar(dt, entrada, modoJuego) {
    // Guardamos el modo para que otras funciones lo sepan
    this.modoJuego = modoJuego;

    if (modoJuego === 'topdown') {
      this._movimientoTopdown(entrada);
    } else if (modoJuego === 'plataforma') {
      this._movimientoPlataforma(entrada);
    }

    // Aplicamos la velocidad a la posición
    this.x += this.velocidadX * dt;
    this.y += this.velocidadY * dt;
  }

  // --- Movimiento vista desde arriba ---
  // En modo topdown el jugador se mueve en 4 direcciones libremente,
  // como en Zelda o Pokémon. No hay gravedad.
  _movimientoTopdown(entrada) {
    this.velocidadX = 0;
    this.velocidadY = 0;
    this.esAnimando = false;

    // Usamos entrada.estaPresionada() porque la clase Entrada
    // traduce teclas físicas a nombres de acción ('arriba', 'abajo', etc.)
    if (entrada.estaPresionada('arriba')) {
      this.velocidadY = -VELOCIDAD_JUGADOR;
      this.direccion = 'arriba';
      this.esAnimando = true;
    }
    if (entrada.estaPresionada('abajo')) {
      this.velocidadY = VELOCIDAD_JUGADOR;
      this.direccion = 'abajo';
      this.esAnimando = true;
    }
    if (entrada.estaPresionada('izquierda')) {
      this.velocidadX = -VELOCIDAD_JUGADOR;
      this.direccion = 'izquierda';
      this.esAnimando = true;
    }
    if (entrada.estaPresionada('derecha')) {
      this.velocidadX = VELOCIDAD_JUGADOR;
      this.direccion = 'derecha';
      this.esAnimando = true;
    }

    // Avanzamos la animación solo si se está moviendo
    if (this.esAnimando) {
      this.cuadroAnimacion += 0.1;
    }
  }

  // --- Movimiento tipo plataforma ---
  // En modo plataforma solo puedes ir izquierda/derecha y saltar.
  // La gravedad te jala hacia abajo como en Mario o Celeste.
  // NOTA: En la cueva (cuevas-pomier.js) el movimiento lo controla
  // la escena directamente para tener más control sobre las colisiones.
  // Este método es un fallback para pruebas o escenas simples.
  _movimientoPlataforma(entrada) {
    this.velocidadX = 0;

    if (entrada.estaPresionada('izquierda')) {
      this.velocidadX = -VELOCIDAD_JUGADOR;
      this.direccion = 'izquierda';
      this.esAnimando = true;
    }
    if (entrada.estaPresionada('derecha')) {
      this.velocidadX = VELOCIDAD_JUGADOR;
      this.direccion = 'derecha';
      this.esAnimando = true;
    }

    // Solo puedes saltar si estás parado en algo sólido
    // (si no, podrías saltar infinitas veces en el aire)
    if (entrada.estaPresionada('saltar') && this.enSuelo && this.puedeSaltar) {
      // Velocidad negativa en Y = subir (porque Y=0 es arriba en canvas)
      this.velocidadY = -10;
      this.enSuelo = false;
      this.puedeSaltar = false;
    }

    // La gravedad siempre jala hacia abajo
    this.velocidadY += GRAVEDAD;

    // Simulación básica del suelo (temporal, el mapa real lo reemplaza)
    // Cuando toca el "suelo" (y=400 por ahora), dejamos de caer
    if (this.y + this.alto >= 400) {
      this.y = 400 - this.alto;
      this.velocidadY = 0;
      this.enSuelo = true;
      this.puedeSaltar = true;
    }

    if (this.esAnimando) {
      this.cuadroAnimacion += 0.1;
    }
  }

  // --- Dibujar al jugador ---
  // Por ahora usamos rectángulos de colores como placeholder.
  // Los ojitos miran hacia donde camina para dar feedback visual.
  dibujar(renderizador) {
    // Obtenemos el contexto 2D del renderizador para dibujar directamente
    const ctx = renderizador.ctx;

    // Color del cuerpo: azul para pepito, morado para pepita
    // para que el jugador sepa cuál escogió de un vistazo
    ctx.fillStyle = this.genero === 'pepito' ? '#4488ff' : '#aa44ff';
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);

    // --- Dibujar ojitos ---
    // Los ojos se mueven según la dirección para que el jugador
    // siempre sepa hacia dónde está mirando su personaje
    ctx.fillStyle = '#ffffff';
    const centroX = this.x + this.ancho / 2;
    const centroY = this.y + this.alto / 3;
    const tamanoOjo = 3;
    const separacion = 5;

    // Desplazamiento de los ojos según dirección
    let desplazamientoX = 0;
    let desplazamientoY = 0;

    if (this.direccion === 'izquierda') desplazamientoX = -2;
    if (this.direccion === 'derecha') desplazamientoX = 2;
    if (this.direccion === 'arriba') desplazamientoY = -2;
    if (this.direccion === 'abajo') desplazamientoY = 2;

    // Ojo izquierdo
    ctx.fillRect(
      centroX - separacion + desplazamientoX - tamanoOjo / 2,
      centroY + desplazamientoY - tamanoOjo / 2,
      tamanoOjo,
      tamanoOjo
    );
    // Ojo derecho
    ctx.fillRect(
      centroX + separacion + desplazamientoX - tamanoOjo / 2,
      centroY + desplazamientoY - tamanoOjo / 2,
      tamanoOjo,
      tamanoOjo
    );

    // Pupilas (puntos negros dentro de los ojos blancos)
    ctx.fillStyle = '#000000';
    const tamanoPupila = 1.5;
    ctx.fillRect(
      centroX - separacion + desplazamientoX - tamanoPupila / 2,
      centroY + desplazamientoY - tamanoPupila / 2,
      tamanoPupila,
      tamanoPupila
    );
    ctx.fillRect(
      centroX + separacion + desplazamientoX - tamanoPupila / 2,
      centroY + desplazamientoY - tamanoPupila / 2,
      tamanoPupila,
      tamanoPupila
    );
  }

  // --- Recibir daño ---
  // La vida no puede bajar de 0 porque no tiene sentido tener vida negativa
  recibirDano(cantidad) {
    this.vida = Math.max(0, this.vida - cantidad);
  }

  // --- Curarse ---
  // La vida no puede subir más que vidaMaxima (no queremos vida infinita)
  curar(cantidad) {
    this.vida = Math.min(this.vidaMaxima, this.vida + cantidad);
  }

  // --- Manejo de inventario ---
  // Métodos simples para agregar y buscar objetos en la mochila del jugador
  agregarAlInventario(objeto) {
    this.inventario.push(objeto);
  }

  tieneObjeto(nombreObjeto) {
    return this.inventario.some(obj => obj.nombre === nombreObjeto);
  }

  // --- Getters de objetos especiales ---
  // Estos son atajos porque linterna y brújula se revisan MUY seguido
  // en el código del juego (oscuridad, navegación, etc.)
  get tieneLinterna() {
    return this.tieneObjeto('linterna');
  }

  get tieneBrujula() {
    return this.tieneObjeto('brujula');
  }
}
