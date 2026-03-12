// ============================================================
// MAGNOBOOT.JS - Robot compañero que detecta metales y excava
// ============================================================
// Magnoboot es un robot que sigue al jugador y tiene habilidades
// de excavación y detección de metales. Es útil para encontrar
// tesoros enterrados y objetos metálicos escondidos.
// Usa "lerp" (interpolación lineal) para seguir al jugador
// con un pequeño retraso, así se ve más natural y no robótico.
// ============================================================

export class Magnoboot {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;

    // Tipo de compañero para identificarlo
    this.tipo = 'magnoboot';

    // Empieza desactivado porque el jugador lo encuentra durante el juego
    this.activo = false;

    // Energía limita cuántas acciones puede hacer antes de recargar
    this.energia = 100;

    // Si es true, sigue al jugador automáticamente
    this.siguiendoJugador = true;

    // --- Estado visual de detección ---
    // Cuando el jugador presiona F, se activa un pulso visual
    this.detectando = false;
    this._tiempoDeteccion = 0;
  }

  // --- Actualizar posición cada frame ---
  // Usamos "lerp" para que el robot se acerque poco a poco al jugador
  // en vez de teletransportarse. El 0.05 controla qué tan rápido sigue:
  // más cerca de 0 = más lento/suave, más cerca de 1 = más pegado
  actualizar(dt, jugador) {
    if (!this.activo) return;

    // Animación de detección (dura 1.5 segundos)
    if (this.detectando) {
      this._tiempoDeteccion += dt;
      if (this._tiempoDeteccion > 1.5) {
        this.detectando = false;
        this._tiempoDeteccion = 0;
      }
    }

    if (this.siguiendoJugador) {
      // Lerp: posición actual + (destino - actual) * velocidad
      // Se pone un poco atrás y a la derecha del jugador para no estorbar
      const destinoX = jugador.x + 30;
      const destinoY = jugador.y + 5;
      this.x += (destinoX - this.x) * 0.05;
      this.y += (destinoY - this.y) * 0.05;
    }
  }

  // --- Dibujar al robot ---
  // Placeholder: rectángulo gris/plateado con una antena arriba
  // para que se vea claramente que es un robot y no un personaje normal
  dibujar(renderizador) {
    if (!this.activo) return;

    const ctx = renderizador;

    // Cuerpo del robot (plateado)
    ctx.fillStyle = '#b0b0b0';
    ctx.fillRect(this.x, this.y, 20, 24);

    // Antena (línea delgada con bolita arriba)
    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x + 10, this.y);
    ctx.lineTo(this.x + 10, this.y - 8);
    ctx.stroke();

    // Bolita de la antena (roja para que parezca que "detecta" cosas)
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(this.x + 10, this.y - 10, 3, 0, Math.PI * 2);
    ctx.fill();

    // Ojitos del robot (cuadrados, porque es un robot)
    ctx.fillStyle = '#44ffff';
    ctx.fillRect(this.x + 4, this.y + 6, 4, 4);
    ctx.fillRect(this.x + 12, this.y + 6, 4, 4);

    // --- Pulso de detección ---
    // Cuando el jugador presiona F, se dibuja un círculo expandiéndose
    // como si fuera una onda de radar detectando metales
    if (this.detectando) {
      const progreso = this._tiempoDeteccion / 1.5;
      const radio = progreso * 100;
      const opacidad = 1 - progreso;

      ctx.strokeStyle = `rgba(68, 255, 255, ${opacidad * 0.6})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x + 10, this.y + 12, radio, 0, Math.PI * 2);
      ctx.stroke();

      // Segundo anillo más pequeño
      if (progreso > 0.2) {
        const radio2 = (progreso - 0.2) * 100;
        ctx.strokeStyle = `rgba(68, 255, 255, ${opacidad * 0.3})`;
        ctx.beginPath();
        ctx.arc(this.x + 10, this.y + 12, radio2, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }

  // --- Excavar en una posición ---
  // Intenta cavar en las coordenadas dadas. Gasta energía porque
  // excavar es trabajo pesado incluso para un robot.
  // Retorna un objeto con el resultado para que el juego sepa qué pasó.
  excavar(x, y) {
    if (this.energia < 10) {
      return { exito: false, objeto: null };
    }

    // Excavar cuesta 10 de energía
    this.energia -= 10;

    // Por ahora retornamos éxito sin objeto real
    // (el sistema de mapas decidirá qué hay enterrado ahí)
    return { exito: true, objeto: null };
  }

  // --- Detectar objetos metálicos cercanos ---
  // Escanea en un radio y retorna la lista de metales encontrados.
  // Esto se conectará con el sistema de objetos del mapa después.
  // Retorna array vacío por ahora (placeholder para cuando existan objetos)
  // --- Activar la animación de detección ---
  // Se llama cuando el jugador presiona F. Inicia el pulso visual.
  iniciarDeteccion() {
    if (!this.activo) return;
    this.detectando = true;
    this._tiempoDeteccion = 0;
  }

  detectarMetal(radioDeteccion = 100) {
    if (!this.activo) return [];

    // TODO: conectar con sistema de objetos del mapa
    // Por ahora retorna vacío, pero la estructura está lista
    return [];
  }

  activar() {
    this.activo = true;
  }

  desactivar() {
    this.activo = false;
  }
}
