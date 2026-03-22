// Sistema de diálogos del juego — maneja conversaciones, efecto máquina de escribir y opciones
// Diseñado para integrarse con el bucle principal de renderizado del motor

class SistemaDialogos {
  constructor() {
    // Estado del diálogo — controla si el jugador puede moverse o no
    this.dialogoActivo = false;

    // Índice de la línea actual dentro de la secuencia de diálogo
    this.lineaActual = 0;

    // Arreglo de líneas del diálogo: [{personaje, texto, opciones?}]
    this.lineas = [];

    // Velocidad del efecto máquina de escribir — caracteres por frame
    this.velocidadTexto = 1;

    // Porción del texto actualmente visible (se incrementa con el efecto typewriter)
    this.textoMostrado = '';

    // Contador interno para controlar cuántos caracteres se han revelado
    this._caracteresVisibles = 0;

    // Indica si el texto actual ya se mostró completo
    this._textoCompleto = false;

    // Índice de la opción resaltada cuando hay opciones de diálogo
    this.opcionSeleccionada = 0;

    // Callback opcional que se ejecuta al terminar un diálogo
    this._alTerminar = null;

    // Callback opcional que se ejecuta al elegir una opción
    this._alElegirOpcion = null;
  }

  /**
   * Inicia una secuencia de diálogo
   * Recibe un arreglo de objetos con la estructura: {personaje, texto, opciones?}
   * Las opciones son un arreglo de {texto, valor} para diálogos con elección
   */
  iniciarDialogo(lineas, alTerminar = null) {
    // Valida que haya contenido para evitar diálogos vacíos
    if (!lineas || lineas.length === 0) return;

    this.lineas = lineas;
    this.lineaActual = 0;
    this.dialogoActivo = true;
    this.opcionSeleccionada = 0;
    this._alTerminar = alTerminar;

    // Reinicia el efecto typewriter para la primera línea
    this._reiniciarTypewriter();
  }

  /**
   * Avanza el diálogo: completa el texto si está escribiendo,
   * o pasa a la siguiente línea si ya terminó
   */
  avanzar() {
    if (!this.dialogoActivo) return null;

    const lineaObj = this.lineas[this.lineaActual];

    // Si el texto aún se está mostrando, lo completa de inmediato
    if (!this._textoCompleto) {
      this._textoCompleto = true;
      this.textoMostrado = lineaObj.texto;
      return null;
    }

    // Si la línea tiene opciones, no avanza automáticamente — espera confirmarOpcion()
    if (lineaObj.opciones && lineaObj.opciones.length > 0) {
      return null;
    }

    // Avanza a la siguiente línea o termina el diálogo
    this.lineaActual++;

    if (this.lineaActual >= this.lineas.length) {
      this.terminar();
      return null;
    }

    // Prepara la nueva línea con efecto typewriter fresco
    this.opcionSeleccionada = 0;
    this._reiniciarTypewriter();
    return null;
  }

  /**
   * Actualiza el efecto máquina de escribir cada frame
   * dt = delta time en segundos desde el último frame
   */
  actualizar(dt) {
    if (!this.dialogoActivo || this._textoCompleto) return;

    const lineaObj = this.lineas[this.lineaActual];
    if (!lineaObj) return;

    // Incrementa los caracteres visibles según la velocidad configurada
    // Usa dt para que la velocidad sea consistente sin importar los FPS
    this._caracteresVisibles += this.velocidadTexto;

    if (this._caracteresVisibles >= lineaObj.texto.length) {
      // El texto se completó naturalmente
      this.textoMostrado = lineaObj.texto;
      this._textoCompleto = true;
    } else {
      // Muestra solo la porción revelada hasta ahora
      this.textoMostrado = lineaObj.texto.substring(0, Math.floor(this._caracteresVisibles));
    }
  }

  /**
   * Dibuja la caja de diálogo en la parte inferior del canvas
   * Usa el renderizador (contexto 2D) directamente para máxima compatibilidad
   * textos: objeto de traducciones completo (se usa textos?.ui?.presionaEContinuar)
   */
  dibujar(renderizador, anchoCanvas, altoCanvas, textos) {
    if (!this.dialogoActivo) return;

    const lineaObj = this.lineas[this.lineaActual];
    if (!lineaObj) return;

    // Dimensiones de la caja — ocupa el ancho completo con margen
    const margen = 20;
    const altoCaja = 160;
    const xCaja = margen;
    const yCaja = altoCanvas - altoCaja - margen;
    const anchoCaja = anchoCanvas - margen * 2;

    // Fondo semi-transparente oscuro para contraste con el texto blanco
    renderizador.save();
    renderizador.fillStyle = 'rgba(0, 0, 0, 0.85)';
    renderizador.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    renderizador.lineWidth = 2;

    // Rectángulo redondeado para un aspecto más pulido
    this._dibujarRectanguloRedondeado(renderizador, xCaja, yCaja, anchoCaja, altoCaja, 12);
    renderizador.fill();
    renderizador.stroke();

    // Nombre del personaje — resaltado con color dorado para diferenciarlo del texto
    if (lineaObj.personaje) {
      renderizador.fillStyle = '#FFD700';
      renderizador.font = 'bold 18px monospace';
      renderizador.fillText(lineaObj.personaje, xCaja + 16, yCaja + 28);
    }

    // Texto del diálogo con efecto typewriter
    renderizador.fillStyle = '#FFFFFF';
    renderizador.font = '16px monospace';

    // Calcula la posición Y del texto según si hay nombre de personaje o no
    const yTexto = lineaObj.personaje ? yCaja + 54 : yCaja + 32;
    const anchoMaxTexto = anchoCaja - 32;

    // Divide el texto en líneas que quepan en la caja
    this._dibujarTextoMultilinea(renderizador, this.textoMostrado, xCaja + 16, yTexto, anchoMaxTexto, 22);

    // Opciones de diálogo — se muestran horizontalmente cuando el texto terminó
    if (this._textoCompleto && lineaObj.opciones && lineaObj.opciones.length > 0) {
      const yOpciones = yCaja + altoCaja - 28;
      const numOpciones = lineaObj.opciones.length;
      const anchoOpcion = (anchoCaja - 32) / numOpciones;

      lineaObj.opciones.forEach((opcion, indice) => {
        const esSeleccionada = indice === this.opcionSeleccionada;
        const xOp = xCaja + 16 + indice * anchoOpcion + anchoOpcion / 2;

        // Fondo de la opción seleccionada
        if (esSeleccionada) {
          renderizador.fillStyle = 'rgba(255, 215, 0, 0.15)';
          renderizador.fillRect(xCaja + 16 + indice * anchoOpcion, yOpciones - 16, anchoOpcion, 24);
        }

        renderizador.fillStyle = esSeleccionada ? '#FFD700' : '#AAAAAA';
        renderizador.font = esSeleccionada ? 'bold 14px monospace' : '14px monospace';
        renderizador.textAlign = 'center';
        renderizador.fillText(opcion.texto, xOp, yOpciones);
        renderizador.textAlign = 'left';
      });
    }

    // Indicador "presiona E para continuar" — parpadea para llamar la atención
    if (this._textoCompleto && !(lineaObj.opciones && lineaObj.opciones.length > 0)) {
      const parpadeo = Math.floor(Date.now() / 500) % 2 === 0;
      if (parpadeo) {
        renderizador.fillStyle = 'rgba(255, 255, 255, 0.6)';
        renderizador.font = '13px monospace';
        renderizador.textAlign = 'right';
        renderizador.fillText(textos?.ui?.presionaEContinuar || 'Presiona E para continuar ▶', xCaja + anchoCaja - 16, yCaja + altoCaja - 12);
        renderizador.textAlign = 'left';
      }
    }

    renderizador.restore();
  }

  /**
   * Indica si hay un diálogo en curso
   * Útil para que el motor sepa si debe bloquear el movimiento del jugador
   */
  estaActivo() {
    return this.dialogoActivo;
  }

  /**
   * Termina el diálogo actual y ejecuta el callback de finalización si existe
   */
  terminar() {
    this.dialogoActivo = false;
    this.lineas = [];
    this.lineaActual = 0;
    this.textoMostrado = '';
    this._caracteresVisibles = 0;
    this._textoCompleto = false;
    this.opcionSeleccionada = 0;

    // Ejecuta el callback de finalización si fue proporcionado
    if (this._alTerminar) {
      const callback = this._alTerminar;
      this._alTerminar = null;
      callback();
    }
  }

  /**
   * Mueve la selección de opciones arriba o abajo
   * direccion: -1 para arriba, 1 para abajo
   */
  seleccionarOpcion(direccion) {
    if (!this.dialogoActivo) return;

    const lineaObj = this.lineas[this.lineaActual];
    if (!lineaObj || !lineaObj.opciones || lineaObj.opciones.length === 0) return;

    // Envuelve la selección para que vuelva al inicio/final circularmente
    this.opcionSeleccionada += direccion;

    if (this.opcionSeleccionada < 0) {
      this.opcionSeleccionada = lineaObj.opciones.length - 1;
    } else if (this.opcionSeleccionada >= lineaObj.opciones.length) {
      this.opcionSeleccionada = 0;
    }
  }

  /**
   * Confirma la opción actualmente seleccionada
   * Retorna el objeto de opción elegido para que la lógica del juego reaccione
   */
  confirmarOpcion() {
    if (!this.dialogoActivo) return null;

    const lineaObj = this.lineas[this.lineaActual];
    if (!lineaObj || !lineaObj.opciones || lineaObj.opciones.length === 0) return null;

    const opcionElegida = lineaObj.opciones[this.opcionSeleccionada];

    // Avanza al siguiente diálogo tras elegir
    this.lineaActual++;

    if (this.lineaActual >= this.lineas.length) {
      this.terminar();
    } else {
      this.opcionSeleccionada = 0;
      this._reiniciarTypewriter();
    }

    return opcionElegida;
  }

  // --- Métodos privados auxiliares ---

  /**
   * Reinicia el estado del efecto typewriter para una nueva línea
   */
  _reiniciarTypewriter() {
    this._caracteresVisibles = 0;
    this._textoCompleto = false;
    this.textoMostrado = '';
  }

  /**
   * Dibuja un rectángulo con esquinas redondeadas
   * Necesario porque canvas no tiene roundRect en todas las versiones
   */
  _dibujarRectanguloRedondeado(ctx, x, y, ancho, alto, radio) {
    ctx.beginPath();
    ctx.moveTo(x + radio, y);
    ctx.lineTo(x + ancho - radio, y);
    ctx.quadraticCurveTo(x + ancho, y, x + ancho, y + radio);
    ctx.lineTo(x + ancho, y + alto - radio);
    ctx.quadraticCurveTo(x + ancho, y + alto, x + ancho - radio, y + alto);
    ctx.lineTo(x + radio, y + alto);
    ctx.quadraticCurveTo(x, y + alto, x, y + alto - radio);
    ctx.lineTo(x, y + radio);
    ctx.quadraticCurveTo(x, y, x + radio, y);
    ctx.closePath();
  }

  /**
   * Divide texto largo en múltiples líneas que quepan en el ancho dado
   * Evita que el texto se salga de la caja de diálogo
   */
  _dibujarTextoMultilinea(ctx, texto, x, y, anchoMax, alturaLinea) {
    const palabras = texto.split(' ');
    let lineaTexto = '';
    let yActual = y;

    for (const palabra of palabras) {
      const pruebaLinea = lineaTexto + (lineaTexto ? ' ' : '') + palabra;
      const medida = ctx.measureText(pruebaLinea);

      if (medida.width > anchoMax && lineaTexto) {
        // La palabra no cabe — dibuja la línea actual y empieza una nueva
        ctx.fillText(lineaTexto, x, yActual);
        lineaTexto = palabra;
        yActual += alturaLinea;
      } else {
        lineaTexto = pruebaLinea;
      }
    }

    // Dibuja la última línea restante
    if (lineaTexto) {
      ctx.fillText(lineaTexto, x, yActual);
    }
  }
}

export default SistemaDialogos;
