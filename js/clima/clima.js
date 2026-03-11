// ============================================================
// clima.js - Sistema principal de clima para el RPG
// ============================================================
// Este archivo controla todo el clima del juego: sol, lluvia,
// tormentas, huracanes y terremotos. El clima cambia solo con
// el tiempo y afecta como el jugador se mueve y lo que ve.
// ============================================================

import { lerp, limitar, aleatorio, aleatorioEntero } from '../utilidades/matematicas.js';

// --- Todos los tipos de clima que existen en el juego ---
// Los pusimos en una lista constante para no escribirlos mal por accidente
const TIPOS_CLIMA = ['soleado', 'nublado', 'lluvia', 'tormenta', 'huracan', 'terremoto'];

// --- Probabilidades de que el clima cambie a cada tipo ---
// El sol es lo mas comun, los desastres son muy raros
const PROBABILIDAD_CLIMA = {
  soleado: 0.45,
  nublado: 0.25,
  lluvia: 0.20,
  tormenta: 0.07,
  huracan: 0.02,
  terremoto: 0.01
};

export class SistemaClima {
  constructor() {
    // El clima con el que empieza el juego
    this.climaActual = 'soleado';

    // Que tan fuerte es el clima actual (0 = nada, 1 = maximo)
    this.intensidad = 0;

    // Contador que dice cuantos segundos faltan para que el clima cambie
    // Empieza entre 30 y 90 segundos para que no cambie de golpe
    this.temporizadorCambio = aleatorio(30, 90);

    // Lista de particulas visibles en pantalla (gotas de lluvia, escombros, etc.)
    this.particulas = [];

    // --- Variables para transiciones suaves ---
    // Cuando el clima cambia, no lo hace de golpe sino poco a poco
    this.enTransicion = false;
    this.climaDestino = null;
    this.duracionTransicion = 0;
    this.tiempoTransicion = 0;
    this.intensidadInicial = 0;

    // Intensidad que queremos alcanzar al terminar la transicion
    this.intensidadObjetivo = 0;
  }

  // --- Cambiar el clima suavemente ---
  // nuevoClima: a que clima queremos ir (ej: 'lluvia')
  // duracion: cuantos segundos tarda en hacer la transicion
  cambiarClima(nuevoClima, duracion = 5) {
    // Si ya estamos en ese clima, no hacemos nada
    if (nuevoClima === this.climaActual && !this.enTransicion) return;

    this.enTransicion = true;
    this.climaDestino = nuevoClima;
    this.duracionTransicion = duracion;
    this.tiempoTransicion = 0;
    this.intensidadInicial = this.intensidad;

    // Cada tipo de clima tiene una intensidad "natural" diferente
    // El sol casi no tiene intensidad, un huracan tiene mucha
    const intensidadesPorDefecto = {
      soleado: 0.1,
      nublado: 0.3,
      lluvia: 0.6,
      tormenta: 0.8,
      huracan: 1.0,
      terremoto: 0.9
    };

    this.intensidadObjetivo = intensidadesPorDefecto[nuevoClima] || 0.5;
  }

  // --- Actualizar el sistema de clima cada frame ---
  // dt: "delta time", cuantos segundos pasaron desde el ultimo frame
  // (usualmente es un numero muy pequeno como 0.016)
  actualizar(dt) {
    // --- Manejar la transicion entre climas ---
    if (this.enTransicion) {
      this.tiempoTransicion += dt;

      // Calculamos que tan avanzada va la transicion (0 = inicio, 1 = final)
      const progreso = limitar(this.tiempoTransicion / this.duracionTransicion, 0, 1);

      // Lerp mezcla suavemente entre la intensidad vieja y la nueva
      this.intensidad = lerp(this.intensidadInicial, this.intensidadObjetivo, progreso);

      // Cuando el progreso llega a 1, la transicion termino
      if (progreso >= 1) {
        this.climaActual = this.climaDestino;
        this.enTransicion = false;
        this.climaDestino = null;
      }
    }

    // --- Contar tiempo para el proximo cambio de clima ---
    this.temporizadorCambio -= dt;

    if (this.temporizadorCambio <= 0) {
      // Toca cambiar de clima! Escogemos uno al azar usando probabilidades
      const nuevoClima = this._escogerClimaAleatorio();
      this.cambiarClima(nuevoClima, aleatorio(3, 8));

      // Ponemos el temporizador de nuevo para el siguiente cambio
      this.temporizadorCambio = aleatorio(40, 120);
    }

    // --- Actualizar particulas del clima ---
    this._actualizarParticulas(dt);
  }

  // --- Dibujar los efectos visuales del clima ---
  // renderizador: el objeto que dibuja cosas en pantalla (canvas context)
  // ancho, alto: dimensiones de la pantalla en pixeles
  dibujar(renderizador, ancho, alto) {
    // Guardamos el estado del renderizador para no afectar otros dibujos
    renderizador.save();

    switch (this.climaActual) {
      case 'soleado':
        this._dibujarSoleado(renderizador, ancho, alto);
        break;
      case 'nublado':
        this._dibujarNublado(renderizador, ancho, alto);
        break;
      case 'lluvia':
        this._dibujarLluvia(renderizador, ancho, alto);
        break;
      case 'tormenta':
        this._dibujarTormenta(renderizador, ancho, alto);
        break;
      case 'huracan':
        this._dibujarHuracan(renderizador, ancho, alto);
        break;
      case 'terremoto':
        this._dibujarTerremoto(renderizador, ancho, alto);
        break;
    }

    // Restauramos el estado para que otros dibujos no se vean afectados
    renderizador.restore();
  }

  // --- Aplicar efectos del clima al jugador ---
  // Cada clima afecta al jugador de forma diferente
  afectaJugador(jugador) {
    switch (this.climaActual) {
      case 'lluvia':
        // La lluvia hace que el jugador camine un poco mas lento
        // porque el suelo esta mojado y resbaloso
        jugador.velocidadX *= (1 - 0.15 * this.intensidad);
        break;

      case 'tormenta':
        // La tormenta es como lluvia pero peor
        jugador.velocidadX *= (1 - 0.25 * this.intensidad);
        break;

      case 'huracan':
        // El viento empuja al jugador hacia un lado
        // y caminar es mucho mas dificil
        const empujeViento = 2 * this.intensidad;
        jugador.velocidadX += empujeViento;
        jugador.velocidadX *= (1 - 0.35 * this.intensidad);
        break;

      case 'terremoto':
        // El terremoto hace que el jugador tropiece al azar
        // Hay un 2% de chance cada frame de tropezar
        if (Math.random() < 0.02 * this.intensidad) {
          jugador.velocidadX += aleatorio(-3, 3);
          jugador.velocidadY -= aleatorio(1, 3);
        }
        break;

      // soleado y nublado no afectan al jugador
    }
  }

  // =====================================================
  // METODOS PRIVADOS (los que empiezan con _ son internos)
  // =====================================================

  // --- Escoger un clima al azar usando las probabilidades ---
  // Usamos un truco: imaginamos una linea de 0 a 1, y cada clima
  // ocupa un pedazo proporcional a su probabilidad
  _escogerClimaAleatorio() {
    const dado = Math.random();
    let acumulado = 0;

    for (const clima of TIPOS_CLIMA) {
      acumulado += PROBABILIDAD_CLIMA[clima];
      if (dado <= acumulado) {
        return clima;
      }
    }

    // Si por algun error de redondeo no escogimos nada, devolvemos soleado
    return 'soleado';
  }

  // --- Crear y mover particulas segun el clima ---
  _actualizarParticulas(dt) {
    // Crear nuevas particulas segun el tipo de clima
    const cantidadNuevas = this._cantidadParticulasPorFrame();

    for (let i = 0; i < cantidadNuevas; i++) {
      this.particulas.push(this._crearParticula());
    }

    // Mover cada particula y quitar las que ya salieron de la pantalla
    for (let i = this.particulas.length - 1; i >= 0; i--) {
      const p = this.particulas[i];
      p.x += p.velocidadX * dt * 60;
      p.y += p.velocidadY * dt * 60;

      // Si la particula salio de la pantalla, la quitamos
      // (para no llenar la memoria con particulas invisibles)
      if (p.y > p.limiteY || p.x > p.limiteX || p.x < -50) {
        this.particulas.splice(i, 1);
      }
    }

    // Limite maximo de particulas para que el juego no se ponga lento
    const MAXIMO_PARTICULAS = 500;
    if (this.particulas.length > MAXIMO_PARTICULAS) {
      this.particulas.splice(0, this.particulas.length - MAXIMO_PARTICULAS);
    }
  }

  // --- Cuantas particulas nuevas creamos por frame ---
  _cantidadParticulasPorFrame() {
    switch (this.climaActual) {
      case 'lluvia': return Math.floor(3 * this.intensidad);
      case 'tormenta': return Math.floor(6 * this.intensidad);
      case 'huracan': return Math.floor(8 * this.intensidad);
      default: return 0;
    }
  }

  // --- Crear una particula nueva con propiedades segun el clima ---
  _crearParticula() {
    // Por defecto las particulas nacen arriba de la pantalla
    // y caen hacia abajo (como gotas de lluvia)
    const particula = {
      x: aleatorio(0, 800),
      y: aleatorio(-20, -5),
      velocidadX: 0,
      velocidadY: aleatorio(4, 8),
      tamano: aleatorio(1, 3),
      limiteY: 620,
      limiteX: 850,
      color: 'rgba(100, 150, 255, 0.6)'
    };

    // Ajustamos la particula segun el tipo de clima
    if (this.climaActual === 'tormenta') {
      particula.velocidadY = aleatorio(6, 12);
      particula.velocidadX = aleatorio(-2, -1);
      particula.color = 'rgba(80, 120, 220, 0.7)';
    }

    if (this.climaActual === 'huracan') {
      // En un huracan las gotas van casi horizontales por el viento
      particula.velocidadX = aleatorio(5, 10);
      particula.velocidadY = aleatorio(3, 6);
      particula.color = 'rgba(60, 100, 200, 0.8)';
    }

    return particula;
  }

  // --- Dibujar rayos de sol sutiles ---
  _dibujarSoleado(renderizador, ancho, alto) {
    // Solo dibujamos rayos de sol si la intensidad es mayor a 0
    if (this.intensidad <= 0) return;

    // Hacemos unos rayos de luz semi-transparentes desde arriba
    renderizador.globalAlpha = 0.08 * this.intensidad;
    renderizador.fillStyle = '#FFFF88';

    // Dibujamos triangulos que parecen rayos de sol
    for (let i = 0; i < 5; i++) {
      const centroX = (ancho / 6) * (i + 1);
      renderizador.beginPath();
      renderizador.moveTo(centroX, 0);
      renderizador.lineTo(centroX - 40, alto);
      renderizador.lineTo(centroX + 40, alto);
      renderizador.closePath();
      renderizador.fill();
    }

    renderizador.globalAlpha = 1;
  }

  // --- Dibujar una capa gris sobre la pantalla para simular nubes ---
  _dibujarNublado(renderizador, ancho, alto) {
    renderizador.fillStyle = `rgba(100, 100, 110, ${0.2 * this.intensidad})`;
    renderizador.fillRect(0, 0, ancho, alto);
  }

  // --- Dibujar gotas de lluvia cayendo ---
  _dibujarLluvia(renderizador, ancho, alto) {
    // Primero un tinte oscuro para que parezca dia nublado
    renderizador.fillStyle = `rgba(50, 50, 80, ${0.15 * this.intensidad})`;
    renderizador.fillRect(0, 0, ancho, alto);

    // Luego dibujamos cada gota como una linea azul
    for (const p of this.particulas) {
      renderizador.strokeStyle = p.color;
      renderizador.lineWidth = p.tamano * 0.5;
      renderizador.beginPath();
      renderizador.moveTo(p.x, p.y);
      renderizador.lineTo(p.x + p.velocidadX * 0.5, p.y + p.velocidadY * 2);
      renderizador.stroke();
    }
  }

  // --- Dibujar tormenta con lluvia fuerte y relampagos ---
  _dibujarTormenta(renderizador, ancho, alto) {
    // Tinte mas oscuro que la lluvia normal
    renderizador.fillStyle = `rgba(30, 30, 60, ${0.25 * this.intensidad})`;
    renderizador.fillRect(0, 0, ancho, alto);

    // Dibujar las gotas
    for (const p of this.particulas) {
      renderizador.strokeStyle = p.color;
      renderizador.lineWidth = p.tamano * 0.7;
      renderizador.beginPath();
      renderizador.moveTo(p.x, p.y);
      renderizador.lineTo(p.x + p.velocidadX, p.y + p.velocidadY * 2.5);
      renderizador.stroke();
    }

    // Relampagos aleatorios (muy raro, como 0.5% de chance por frame)
    if (Math.random() < 0.005 * this.intensidad) {
      renderizador.fillStyle = 'rgba(255, 255, 255, 0.7)';
      renderizador.fillRect(0, 0, ancho, alto);
    }
  }

  // --- Dibujar efectos de huracan ---
  _dibujarHuracan(renderizador, ancho, alto) {
    // Tinte oscuro fuerte
    renderizador.fillStyle = `rgba(20, 20, 50, ${0.4 * this.intensidad})`;
    renderizador.fillRect(0, 0, ancho, alto);

    // Particulas de lluvia diagonal
    for (const p of this.particulas) {
      renderizador.strokeStyle = p.color;
      renderizador.lineWidth = p.tamano;
      renderizador.beginPath();
      renderizador.moveTo(p.x, p.y);
      renderizador.lineTo(p.x + p.velocidadX * 2, p.y + p.velocidadY * 1.5);
      renderizador.stroke();
    }

    // Lineas de viento horizontales para dar sensacion de viento fuerte
    renderizador.strokeStyle = `rgba(200, 200, 220, ${0.15 * this.intensidad})`;
    renderizador.lineWidth = 1;
    for (let i = 0; i < 10; i++) {
      const posY = aleatorio(0, alto);
      const posX = aleatorio(0, ancho);
      const largo = aleatorio(40, 120);
      renderizador.beginPath();
      renderizador.moveTo(posX, posY);
      renderizador.lineTo(posX + largo, posY + aleatorio(-5, 5));
      renderizador.stroke();
    }
  }

  // --- Dibujar efecto de terremoto sacudiendo la pantalla ---
  _dibujarTerremoto(renderizador, ancho, alto) {
    // Sacudimos todo el canvas moviendo el origen un poco al azar
    // Esto hace que TODO lo que se dibuje despues se vea temblando
    const sacudidaX = aleatorio(-6, 6) * this.intensidad;
    const sacudidaY = aleatorio(-4, 4) * this.intensidad;
    renderizador.translate(sacudidaX, sacudidaY);

    // Un tinte marron para simular polvo en el aire
    renderizador.fillStyle = `rgba(139, 119, 101, ${0.1 * this.intensidad})`;
    renderizador.fillRect(0, 0, ancho, alto);
  }
}
