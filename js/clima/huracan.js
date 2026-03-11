// ============================================================
// huracan.js - Mecanicas especificas del huracan
// ============================================================
// Este archivo maneja todo lo que pasa cuando hay un huracan
// en el juego. Un huracan es una tormenta ENORME con vientos
// super fuertes que pueden empujar al jugador y lanzar cosas
// por el aire.
//
// Los huracanes se miden en categorias del 1 al 5:
//   1 = Vientos fuertes pero manejables
//   5 = Destruccion total, casi imposible caminar
//
// En la vida real, los huracanes son muy comunes en el Caribe
// y en la Republica Dominicana. Por eso los incluimos en el juego!
// ============================================================

import { lerp, limitar, aleatorio, aleatorioEntero } from '../utilidades/matematicas.js';

export class Huracan {
  constructor() {
    // --- Estado general del huracan ---

    // Si el huracan esta activo o no (true/false)
    this.activo = false;

    // Categoria del huracan (1 a 5, como en la vida real)
    // 1 = debil, 5 = catastrofico
    this.fuerza = 1;

    // --- Propiedades del viento ---

    // Direccion del viento en grados (0 = derecha, 90 = abajo, 180 = izquierda)
    // En el Caribe los huracanes suelen venir del este (derecha)
    this.direccionViento = 0;

    // Cuantos pixeles empuja el viento al jugador cada frame
    // Mas fuerza = mas empuje
    this.velocidadViento = 0;

    // --- Lluvia ---

    // Que tan fuerte llueve (0 = nada, 1 = diluvio)
    this.lluviaIntensidad = 0;

    // --- Escombros voladores ---

    // Lista de objetos volando por el aire (ramas, piedras, etc.)
    // Cada escombro tiene: x, y, velocidadX, velocidadY, tamano
    this.escombros = [];

    // --- Control del tiempo ---

    // Cuanto tiempo lleva activo el huracan (en segundos)
    this.tiempoActivo = 0;

    // Cuanto dura el huracan en total (en segundos)
    this.duracionTotal = 0;

    // Fase actual: 'inicio' (se forma), 'pico' (maximo), 'final' (se va)
    // Los huracanes no aparecen de golpe, van creciendo
    this.fase = 'inicio';

    // --- Efecto visual de sacudida ---
    // La sacudida hace que la pantalla tiemble, como un terremoto
    this.sacudidaX = 0;
    this.sacudidaY = 0;
  }

  // --- Iniciar un huracan ---
  // fuerza: categoria del 1 al 5
  // Ejemplo: iniciar(3) crea un huracan categoria 3
  iniciar(fuerza) {
    // Nos aseguramos de que la fuerza este entre 1 y 5
    this.fuerza = limitar(Math.round(fuerza), 1, 5);
    this.activo = true;
    this.tiempoActivo = 0;
    this.fase = 'inicio';

    // El viento viene del este (derecha) con un poco de variacion
    this.direccionViento = aleatorio(-20, 20);

    // La velocidad del viento depende de la categoria
    // Categoria 1: empuja poquito (2px), Categoria 5: empuja mucho (10px)
    this.velocidadViento = this.fuerza * 2;

    // La lluvia tambien depende de la categoria
    this.lluviaIntensidad = limitar(this.fuerza * 0.2, 0, 1);

    // Cuanto dura el huracan: entre 20 y 60 segundos
    // Los mas fuertes duran mas (porque son mas grandes)
    this.duracionTotal = 20 + (this.fuerza * 8);

    // Empezamos sin escombros, se van creando con el tiempo
    this.escombros = [];
  }

  // --- Actualizar el huracan cada frame ---
  // dt: cuantos segundos pasaron desde el ultimo frame
  actualizar(dt) {
    // Si el huracan no esta activo, no hacemos nada
    if (!this.activo) return;

    // Sumamos el tiempo que ha pasado
    this.tiempoActivo += dt;

    // --- Determinar en que fase esta el huracan ---
    // Los huracanes tienen 3 fases:
    // 1. INICIO (primeros 25%): el viento va creciendo
    // 2. PICO (del 25% al 75%): viento maximo, lo peor
    // 3. FINAL (ultimo 25%): se va calmando

    const progreso = this.tiempoActivo / this.duracionTotal;

    if (progreso < 0.25) {
      this.fase = 'inicio';
      // Durante el inicio, la intensidad sube gradualmente
      // progreso va de 0 a 0.25, lo convertimos a 0 a 1
      const progresoFase = progreso / 0.25;
      this.lluviaIntensidad = limitar(this.fuerza * 0.2 * progresoFase, 0, 1);
      this.velocidadViento = this.fuerza * 2 * progresoFase;
    } else if (progreso < 0.75) {
      this.fase = 'pico';
      // En el pico todo esta al maximo
      this.lluviaIntensidad = limitar(this.fuerza * 0.2, 0, 1);
      this.velocidadViento = this.fuerza * 2;
    } else if (progreso < 1) {
      this.fase = 'final';
      // En el final, la intensidad baja gradualmente
      const progresoFase = (progreso - 0.75) / 0.25;
      this.lluviaIntensidad = limitar(this.fuerza * 0.2 * (1 - progresoFase), 0, 1);
      this.velocidadViento = this.fuerza * 2 * (1 - progresoFase);
    } else {
      // El huracan ya termino
      this.terminar();
      return;
    }

    // --- Mover los escombros que ya existen ---
    // Cada escombro se mueve en la direccion del viento
    for (let i = this.escombros.length - 1; i >= 0; i--) {
      const escombro = this.escombros[i];

      // Mover el escombro segun su velocidad
      escombro.x += escombro.velocidadX * dt * 60;
      escombro.y += escombro.velocidadY * dt * 60;

      // Si el escombro salio de la pantalla, lo eliminamos
      // Asi no llenamos la memoria con escombros invisibles
      if (escombro.x > 900 || escombro.x < -100 || escombro.y > 700 || escombro.y < -100) {
        this.escombros.splice(i, 1);
      }
    }

    // --- Crear nuevos escombros ---
    // Mas fuerza = mas escombros volando
    const escombrosNuevosPorFrame = Math.floor(this.fuerza * 0.5 * (this.fase === 'pico' ? 1 : 0.3));

    for (let i = 0; i < escombrosNuevosPorFrame; i++) {
      this._crearEscombro();
    }

    // --- Sacudir la pantalla ---
    // La sacudida es proporcional a la fuerza del huracan
    // Usamos numeros aleatorios para que se sienta caotico
    this.sacudidaX = aleatorio(-this.fuerza, this.fuerza) * 0.8;
    this.sacudidaY = aleatorio(-this.fuerza * 0.5, this.fuerza * 0.5) * 0.8;

    // Limite de escombros para no matar el rendimiento
    const MAXIMO_ESCOMBROS = 100;
    if (this.escombros.length > MAXIMO_ESCOMBROS) {
      this.escombros.splice(0, this.escombros.length - MAXIMO_ESCOMBROS);
    }
  }

  // --- Dibujar todos los efectos visuales del huracan ---
  // renderizador: el contexto 2D del canvas
  // ancho, alto: tamano de la pantalla
  dibujar(renderizador, ancho, alto) {
    // Si el huracan no esta activo, no dibujamos nada
    if (!this.activo) return;

    // Guardamos el estado del renderizador
    renderizador.save();

    // Aplicamos la sacudida de pantalla moviendo todo un poco
    renderizador.translate(this.sacudidaX, this.sacudidaY);

    // --- 1. Capa oscura ---
    // Mientras mas fuerte el huracan, mas oscuro se pone todo
    // Esto simula las nubes oscuras que tapan el sol
    const oscuridad = limitar(this.fuerza * 0.08 + 0.1, 0, 0.6);
    renderizador.fillStyle = `rgba(10, 10, 30, ${oscuridad})`;
    renderizador.fillRect(-20, -20, ancho + 40, alto + 40);

    // --- 2. Lluvia diagonal ---
    // La lluvia va en angulo porque el viento la empuja
    // Convertimos la direccion del viento a radianes para los calculos
    const anguloVientoRad = (this.direccionViento * Math.PI) / 180;
    const cantidadGotas = Math.floor(30 * this.lluviaIntensidad);

    renderizador.strokeStyle = `rgba(100, 140, 255, ${0.4 + this.lluviaIntensidad * 0.4})`;
    renderizador.lineWidth = 1.5;

    for (let i = 0; i < cantidadGotas; i++) {
      // Cada gota aparece en una posicion al azar
      const inicioX = aleatorio(0, ancho);
      const inicioY = aleatorio(0, alto);

      // La gota se estira en la direccion del viento
      const largoGota = 15 + this.fuerza * 5;
      const finX = inicioX + Math.cos(anguloVientoRad) * largoGota;
      const finY = inicioY + Math.sin(anguloVientoRad + Math.PI * 0.3) * largoGota;

      renderizador.beginPath();
      renderizador.moveTo(inicioX, inicioY);
      renderizador.lineTo(finX, finY);
      renderizador.stroke();
    }

    // --- 3. Escombros voladores ---
    // Los dibujamos como cuadraditos de diferentes tamanos y colores
    for (const escombro of this.escombros) {
      // Color marron/gris para parecer ramas y piedras
      renderizador.fillStyle = `rgba(${100 + escombro.tamano * 20}, ${80 + escombro.tamano * 10}, ${60}, 0.8)`;

      // Rotamos el escombro para que parezca que gira mientras vuela
      renderizador.save();
      renderizador.translate(escombro.x, escombro.y);
      // Usamos el tiempo para que el escombro gire
      const rotacion = this.tiempoActivo * (escombro.tamano + 1) * 2;
      renderizador.rotate(rotacion);
      renderizador.fillRect(
        -escombro.tamano / 2,
        -escombro.tamano / 2,
        escombro.tamano,
        escombro.tamano
      );
      renderizador.restore();
    }

    // --- 4. Lineas de viento ---
    // Lineas diagonales semi-transparentes que sugieren viento fuerte
    renderizador.strokeStyle = `rgba(200, 210, 230, ${0.1 + this.fuerza * 0.04})`;
    renderizador.lineWidth = 0.8;

    const cantidadLineasViento = this.fuerza * 3;
    for (let i = 0; i < cantidadLineasViento; i++) {
      const posX = aleatorio(-50, ancho);
      const posY = aleatorio(0, alto);
      const largo = aleatorio(60, 200);

      renderizador.beginPath();
      renderizador.moveTo(posX, posY);
      renderizador.lineTo(
        posX + Math.cos(anguloVientoRad) * largo,
        posY + Math.sin(anguloVientoRad) * largo * 0.3
      );
      renderizador.stroke();
    }

    // Restauramos el estado del renderizador
    renderizador.restore();
  }

  // --- Empujar al jugador con el viento ---
  // El jugador se mueve en la direccion del viento
  // Mientras mas fuerte el huracan, mas lo empuja
  empujarJugador(jugador) {
    if (!this.activo) return;

    // Convertimos la direccion del viento a movimiento horizontal y vertical
    const anguloRad = (this.direccionViento * Math.PI) / 180;

    // El empuje depende de la velocidad del viento
    const empujeX = Math.cos(anguloRad) * this.velocidadViento * 0.5;
    const empujeY = Math.sin(anguloRad) * this.velocidadViento * 0.2;

    // Aplicamos la fuerza al jugador
    // Sumamos a su velocidad actual para que se sienta natural
    jugador.velocidadX += empujeX;
    jugador.velocidadY += empujeY;
  }

  // --- Terminar el huracan ---
  // Limpiamos todo y dejamos el huracan inactivo
  terminar() {
    this.activo = false;
    this.escombros = [];
    this.velocidadViento = 0;
    this.lluviaIntensidad = 0;
    this.sacudidaX = 0;
    this.sacudidaY = 0;
    this.fase = 'inicio';
    this.tiempoActivo = 0;
  }

  // =====================================================
  // METODOS PRIVADOS
  // =====================================================

  // --- Crear un escombro nuevo ---
  // Los escombros nacen en el borde izquierdo de la pantalla
  // y vuelan hacia la derecha empujados por el viento
  _crearEscombro() {
    const anguloRad = (this.direccionViento * Math.PI) / 180;

    const escombro = {
      // Nace en el borde izquierdo, a una altura al azar
      x: aleatorio(-20, 0),
      y: aleatorio(50, 550),

      // Se mueve en la direccion del viento con algo de variacion
      // para que no todos vayan exactamente igual
      velocidadX: Math.cos(anguloRad) * aleatorio(3, 8) + this.fuerza,
      velocidadY: Math.sin(anguloRad) * aleatorio(-2, 2),

      // Tamano entre 3 y 12 pixeles
      // Los escombros grandes son mas raros
      tamano: aleatorioEntero(3, 12)
    };

    this.escombros.push(escombro);
  }
}
