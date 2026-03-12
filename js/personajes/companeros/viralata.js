// ============================================================
// VIRALATA.JS - Perro callejero compañero
// ============================================================
// El viralata (perro callejero) es un compañero que usa su olfato
// para encontrar objetos escondidos. Cuando huele algo, mueve
// la cola para avisarle al jugador. Es el compañero más "amigable"
// y accesible — todos los jugadores entienden lo que hace un perro.
// ============================================================

export class Viralata {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;

    // Tipo de compañero para identificarlo
    this.tipo = 'viralata';

    // Empieza desactivado, el jugador lo adopta durante la historia
    this.activo = false;

    // Rango de olfato en píxeles: qué tan lejos puede oler cosas
    this.olfato = 50;

    // Si sigue al jugador automáticamente
    this.siguiendoJugador = true;

    // Se pone en true cuando detecta algo cerca (activa la cola)
    this.encontroAlgo = false;

    // Para animar la cola
    this._tiempoCola = 0;
  }

  // --- Actualizar cada frame ---
  // Sigue al jugador y revisa si hay objetos escondidos cerca.
  // "objetosCercanos" es una lista de objetos del mapa actual
  // que el sistema de juego le pasa cada frame.
  actualizar(dt, jugador, objetosCercanos = []) {
    if (!this.activo) return;

    this._tiempoCola += dt * 5;

    // Seguir al jugador con lerp (un poquito detrás de él)
    if (this.siguiendoJugador) {
      const destinoX = jugador.x - 25;
      const destinoY = jugador.y + 10;
      this.x += (destinoX - this.x) * 0.06;
      this.y += (destinoY - this.y) * 0.06;
    }

    // Revisar si hay algo escondido cerca usando distancia
    this.encontroAlgo = false;
    for (const objeto of objetosCercanos) {
      const distancia = this._calcularDistancia(this.x, this.y, objeto.x, objeto.y);
      if (distancia <= this.olfato) {
        this.encontroAlgo = true;
        // Con encontrar uno basta para activar la alerta
        break;
      }
    }
  }

  // --- Dibujar al perro ---
  // Placeholder: rectángulo marrón con cola que se mueve cuando
  // el perro huele algo. La cola quieta = nada interesante,
  // cola moviéndose = ¡hay algo escondido cerca!
  dibujar(renderizador) {
    if (!this.activo) return;

    const ctx = renderizador;

    // Cuerpo del perro (marrón)
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(this.x, this.y, 22, 14);

    // Cabeza (un poco más clara)
    ctx.fillStyle = '#A0522D';
    ctx.fillRect(this.x + 16, this.y - 4, 10, 12);

    // Ojito
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x + 22, this.y - 1, 2, 2);

    // Nariz
    ctx.fillStyle = '#333333';
    ctx.fillRect(this.x + 25, this.y + 2, 2, 2);

    // Patitas
    ctx.fillStyle = '#6B3410';
    ctx.fillRect(this.x + 2, this.y + 14, 4, 5);
    ctx.fillRect(this.x + 14, this.y + 14, 4, 5);

    // Cola: se mueve solo si encontró algo, así el jugador nota la diferencia
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + 2);

    if (this.encontroAlgo) {
      // Cola moviéndose rápido (¡encontré algo!)
      const movimiento = Math.sin(this._tiempoCola) * 6;
      ctx.lineTo(this.x - 8, this.y - 4 + movimiento);
    } else {
      // Cola quieta y caída (nada interesante)
      ctx.lineTo(this.x - 8, this.y + 5);
    }
    ctx.stroke();
  }

  // --- Rastrear objeto más cercano ---
  // Calcula la dirección hacia el objeto escondido más cercano.
  // Retorna null si no hay nada dentro del rango de olfato.
  // La dirección es un string simple que el jugador puede entender.
  rastrear(objetosCercanos = []) {
    if (!this.activo) return null;

    let objetoMasCercano = null;
    let distanciaMinima = this.olfato;

    for (const objeto of objetosCercanos) {
      const distancia = this._calcularDistancia(this.x, this.y, objeto.x, objeto.y);
      if (distancia < distanciaMinima) {
        distanciaMinima = distancia;
        objetoMasCercano = objeto;
      }
    }

    if (!objetoMasCercano) return null;

    // Calculamos dirección general para dar una pista simple
    const dx = objetoMasCercano.x - this.x;
    const dy = objetoMasCercano.y - this.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? 'derecha' : 'izquierda';
    } else {
      return dy > 0 ? 'abajo' : 'arriba';
    }
  }

  // --- Buscar huesos en un área ---
  // Escanea un área rectangular buscando artefactos de hueso.
  // Retorna los que encuentre (se conectará con el sistema de mapas).
  buscarHuesos(area = { x: 0, y: 0, ancho: 100, alto: 100 }) {
    if (!this.activo) return [];

    // TODO: conectar con sistema de objetos del mapa
    // El área define dónde buscar, pero necesitamos los datos del mapa
    return [];
  }

  activar() {
    this.activo = true;
  }

  desactivar() {
    this.activo = false;
  }

  // --- Utilidad: calcular distancia entre dos puntos ---
  // Fórmula de Pitágoras: la distancia en línea recta entre dos puntos
  _calcularDistancia(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
