// ============================================================
// INVENTARIO.JS - Sistema de inventario (la mochila del jugador)
// ============================================================
// Maneja todos los objetos que el jugador recoge durante el juego.
// Funciona como una grilla visual (tipo Minecraft) donde puedes
// ver qué tienes, seleccionar objetos y usarlos.
// Los objetos se "stackean" (apilan) si son del mismo tipo,
// así no desperdicias espacio con 5 pociones separadas.
// ============================================================

export class Inventario {
  constructor() {
    // Lista de objetos en el inventario
    // Cada objeto tiene: {id, nombre, descripcion, tipo, cantidad, color, esUsable}
    this.objetos = [];

    // Máximo 20 objetos para obligar al jugador a decidir qué guardar
    this.capacidad = 20;

    // Estado de la UI: si el inventario está visible o no
    this.abierto = false;

    // Cuál slot tiene seleccionado el jugador (para navegar con flechas)
    this.seleccion = 0;

    // Bloqueo de entrada para evitar pulsaciones repetidas
    this.bloqueoEntrada = false;

    // Callback que se llama al usar un objeto exitosamente
    // juego.js lo asigna para mostrar toasts de curación
    this.alUsar = null;
  }

  // --- Agregar un objeto ---
  // Si ya tiene uno del mismo tipo, solo suma la cantidad (stackear).
  // Si no, lo agrega como nuevo si hay espacio.
  agregar(objeto) {
    const existente = this.objetos.find(o => o.id === objeto.id);

    if (existente) {
      existente.cantidad += (objeto.cantidad || 1);
      return true;
    }

    if (this.estaLleno()) return false;

    this.objetos.push({
      ...objeto,
      cantidad: objeto.cantidad || 1
    });
    return true;
  }

  // --- Remover un objeto por ID ---
  remover(id) {
    const indice = this.objetos.findIndex(o => o.id === id);
    if (indice === -1) return false;

    if (this.objetos[indice].cantidad > 1) {
      this.objetos[indice].cantidad -= 1;
    } else {
      this.objetos.splice(indice, 1);
    }

    if (this.seleccion >= this.objetos.length) {
      this.seleccion = Math.max(0, this.objetos.length - 1);
    }
    return true;
  }

  // --- Usar un objeto en el jugador ---
  usar(id, jugador) {
    const objeto = this.obtener(id);
    if (!objeto || !objeto.esUsable) return false;

    switch (objeto.tipo) {
      case 'curacion':
        jugador.curar(objeto.valor || 20);
        break;
      case 'comida':
        jugador.hambre = Math.min(100, jugador.hambre + (objeto.valor || 15));
        break;
      default:
        return false;
    }

    // Notificar al juego (para mostrar toast de curación)
    if (this.alUsar) {
      this.alUsar(objeto, jugador);
    }

    this.remover(id);
    return true;
  }

  estaLleno() {
    return this.objetos.length >= this.capacidad;
  }

  obtener(id) {
    return this.objetos.find(o => o.id === id) || null;
  }

  tieneObjeto(id) {
    return this.objetos.some(o => o.id === id);
  }

  // --- Controles de UI ---
  abrir() { this.abierto = true; }
  cerrar() { this.abierto = false; }
  alternar() { this.abierto = !this.abierto; }

  // --- Mover la selección en la grilla ---
  // La grilla tiene 5 columnas, así que arriba/abajo saltan de 5 en 5
  moverSeleccion(direccion) {
    const columnas = 5;

    switch (direccion) {
      case 'arriba':
        this.seleccion = Math.max(0, this.seleccion - columnas);
        break;
      case 'abajo':
        this.seleccion = Math.min(this.capacidad - 1, this.seleccion + columnas);
        break;
      case 'izquierda':
        this.seleccion = Math.max(0, this.seleccion - 1);
        break;
      case 'derecha':
        this.seleccion = Math.min(this.capacidad - 1, this.seleccion + 1);
        break;
    }
  }

  // --- Manejar entrada cuando el inventario está abierto ---
  // Retorna true si el inventario consumió la entrada (para bloquear el juego)
  manejarEntrada(entrada, jugador) {
    if (!this.abierto) return false;

    // Cerrar con I o Q/Escape
    if ((entrada.estaPresionada('inventario') || entrada.estaPresionada('cancelar'))
        && !this.bloqueoEntrada) {
      this.cerrar();
      this.bloqueoEntrada = true;
      return true;
    }

    // Navegar con flechas
    if (entrada.estaPresionada('arriba') && !this.bloqueoEntrada) {
      this.moverSeleccion('arriba');
      this.bloqueoEntrada = true;
    }
    if (entrada.estaPresionada('abajo') && !this.bloqueoEntrada) {
      this.moverSeleccion('abajo');
      this.bloqueoEntrada = true;
    }
    if (entrada.estaPresionada('izquierda') && !this.bloqueoEntrada) {
      this.moverSeleccion('izquierda');
      this.bloqueoEntrada = true;
    }
    if (entrada.estaPresionada('derecha') && !this.bloqueoEntrada) {
      this.moverSeleccion('derecha');
      this.bloqueoEntrada = true;
    }

    // Usar objeto con acción (E/Enter)
    if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      if (this.seleccion < this.objetos.length) {
        const obj = this.objetos[this.seleccion];
        if (obj.esUsable && jugador) {
          this.usar(obj.id, jugador);
        }
      }
      this.bloqueoEntrada = true;
    }

    // Desbloquear cuando se sueltan todas las teclas de navegación
    if (!entrada.estaPresionada('arriba') &&
        !entrada.estaPresionada('abajo') &&
        !entrada.estaPresionada('izquierda') &&
        !entrada.estaPresionada('derecha') &&
        !entrada.estaPresionada('accion') &&
        !entrada.estaPresionada('inventario') &&
        !entrada.estaPresionada('cancelar')) {
      this.bloqueoEntrada = false;
    }

    return true; // Siempre consume la entrada mientras esté abierto
  }

  // --- Dibujar el inventario ---
  // Recibe el contexto raw del canvas (no el Renderizador),
  // dimensiones del canvas, y los textos traducidos del idioma actual
  dibujar(ctx, anchoCanvas, altoCanvas, textos) {
    if (!this.abierto) return;

    const columnas = 5;
    const filas = 4;
    const tamanoSlot = 52;
    const margen = 4;
    const anchoGrilla = columnas * (tamanoSlot + margen);
    const altoGrilla = filas * (tamanoSlot + margen);

    // Panel centrado con algo de padding
    const panelAncho = anchoGrilla + 60;
    const panelAlto = altoGrilla + 130;
    const panelX = (anchoCanvas - panelAncho) / 2;
    const panelY = (altoCanvas - panelAlto) / 2;

    const inicioX = panelX + 30;
    const inicioY = panelY + 50;

    ctx.save();

    // --- Fondo oscuro que cubre toda la pantalla ---
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, anchoCanvas, altoCanvas);

    // --- Panel del inventario ---
    ctx.fillStyle = 'rgba(30, 25, 20, 0.95)';
    ctx.fillRect(panelX, panelY, panelAncho, panelAlto);

    // Borde del panel
    ctx.strokeStyle = '#C8A84E';
    ctx.lineWidth = 2;
    ctx.strokeRect(panelX, panelY, panelAncho, panelAlto);

    // Línea decorativa dorada debajo del título
    ctx.strokeStyle = '#C8A84E';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(panelX + 10, panelY + 38);
    ctx.lineTo(panelX + panelAncho - 10, panelY + 38);
    ctx.stroke();

    // --- Título ---
    const tituloTexto = textos?.inventario?.titulo || 'Inventario';
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(tituloTexto, anchoCanvas / 2, panelY + 28);

    // --- Contador de slots ---
    ctx.font = '11px monospace';
    ctx.fillStyle = '#888888';
    ctx.textAlign = 'right';
    const slotsTexto = textos?.inventario?.slots || 'slots';
    ctx.fillText(`${this.objetos.length}/${this.capacidad} ${slotsTexto}`, panelX + panelAncho - 15, panelY + 28);

    // --- Grilla de slots ---
    for (let i = 0; i < this.capacidad; i++) {
      const fila = Math.floor(i / columnas);
      const columna = i % columnas;
      const slotX = inicioX + columna * (tamanoSlot + margen);
      const slotY = inicioY + fila * (tamanoSlot + margen);

      const estaSeleccionado = i === this.seleccion;
      const tieneObjeto = i < this.objetos.length;

      // Fondo del slot
      if (estaSeleccionado) {
        ctx.fillStyle = tieneObjeto ? 'rgba(200, 168, 78, 0.3)' : 'rgba(200, 168, 78, 0.15)';
      } else {
        ctx.fillStyle = tieneObjeto ? 'rgba(60, 50, 35, 0.8)' : 'rgba(40, 35, 25, 0.6)';
      }
      ctx.fillRect(slotX, slotY, tamanoSlot, tamanoSlot);

      // Borde del slot
      ctx.strokeStyle = estaSeleccionado ? '#FFD700' : '#555544';
      ctx.lineWidth = estaSeleccionado ? 2 : 1;
      ctx.strokeRect(slotX, slotY, tamanoSlot, tamanoSlot);

      // Si hay un objeto, dibujar su ícono
      if (tieneObjeto) {
        const objeto = this.objetos[i];
        this._dibujarIconoObjeto(ctx, slotX + 10, slotY + 8, objeto);

        // Cantidad (solo si tiene más de 1)
        if (objeto.cantidad > 1) {
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 11px monospace';
          ctx.textAlign = 'right';
          ctx.fillText(`x${objeto.cantidad}`, slotX + tamanoSlot - 3, slotY + tamanoSlot - 4);
        }
      }
    }

    // --- Info del objeto seleccionado ---
    const infoY = inicioY + altoGrilla + 10;

    if (this.seleccion < this.objetos.length) {
      const seleccionado = this.objetos[this.seleccion];

      // Nombre del objeto
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(seleccionado.nombre || 'Desconocido', anchoCanvas / 2, infoY + 5);

      // Descripción
      ctx.font = '11px monospace';
      ctx.fillStyle = '#BBBBBB';
      const descTexto = seleccionado.descripcion || '';
      // Dividir descripción en dos líneas si es muy larga
      if (descTexto.length > 55) {
        const mitad = descTexto.lastIndexOf(' ', 55);
        ctx.fillText(descTexto.substring(0, mitad), anchoCanvas / 2, infoY + 22);
        ctx.fillText(descTexto.substring(mitad + 1), anchoCanvas / 2, infoY + 36);
      } else {
        ctx.fillText(descTexto, anchoCanvas / 2, infoY + 22);
      }

      // Indicador de usable
      if (seleccionado.esUsable) {
        ctx.fillStyle = '#44CC44';
        ctx.font = '11px monospace';
        const usarTexto = textos?.inventario?.usar || '[E] Usar';
        ctx.fillText(usarTexto, anchoCanvas / 2, infoY + 52);
      }
    } else {
      // Slot vacío seleccionado
      ctx.fillStyle = '#666666';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      const vacioTexto = textos?.inventario?.vacio || 'Vacío';
      ctx.fillText(vacioTexto, anchoCanvas / 2, infoY + 15);
    }

    // --- Instrucciones en la parte inferior ---
    ctx.font = '11px monospace';
    ctx.fillStyle = '#777777';
    ctx.textAlign = 'center';
    const cerrarTexto = textos?.inventario?.cerrar || '[I] o [Q] Cerrar';
    ctx.fillText(`Flechas: navegar | ${cerrarTexto}`, anchoCanvas / 2, panelY + panelAlto - 10);

    ctx.restore();
  }

  // --- Dibujar íconos de objetos según su ID ---
  // Cada objeto tiene un dibujo único para reconocerlo de un vistazo
  _dibujarIconoObjeto(ctx, x, y, objeto) {
    const id = objeto.id;

    if (id === 'linterna') {
      // Cuerpo amarillo de la linterna
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(x + 6, y + 8, 20, 10);
      ctx.fillStyle = '#FFF8DC';
      ctx.fillRect(x + 2, y + 10, 6, 6);
      // Rayo de luz
      ctx.fillStyle = 'rgba(255, 255, 200, 0.5)';
      ctx.beginPath();
      ctx.moveTo(x + 2, y + 8);
      ctx.lineTo(x - 6, y + 4);
      ctx.lineTo(x - 6, y + 22);
      ctx.lineTo(x + 2, y + 18);
      ctx.closePath();
      ctx.fill();

    } else if (id === 'fragmentoMapa') {
      // Pergamino
      ctx.fillStyle = '#D2B48C';
      ctx.fillRect(x + 4, y + 4, 24, 24);
      // Líneas de texto
      ctx.fillStyle = '#8B7355';
      ctx.fillRect(x + 7, y + 9, 18, 1);
      ctx.fillRect(x + 7, y + 13, 14, 1);
      ctx.fillRect(x + 7, y + 17, 18, 1);
      ctx.fillRect(x + 7, y + 21, 10, 1);
      // Borde enrollado
      ctx.fillStyle = '#BFA679';
      ctx.fillRect(x + 4, y + 4, 24, 3);
      ctx.fillRect(x + 4, y + 25, 24, 3);

    } else if (id === 'artefactoTaino') {
      // Cemí con detalles dorados (guanín en ojos y órganos sensoriales)
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(x + 16, y + 12, 8, 0, Math.PI * 2);
      ctx.fill();
      // Cuerpo
      ctx.fillRect(x + 11, y + 18, 10, 8);
      // Ojos
      ctx.fillStyle = '#000000';
      ctx.fillRect(x + 12, y + 9, 3, 3);
      ctx.fillRect(x + 18, y + 9, 3, 3);
      // Boca
      ctx.fillRect(x + 14, y + 15, 5, 1);

    } else if (id === 'brujula') {
      // Círculo de la brújula
      ctx.strokeStyle = '#C8A84E';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x + 16, y + 16, 10, 0, Math.PI * 2);
      ctx.stroke();
      // Aguja (roja al norte)
      ctx.fillStyle = '#FF4444';
      ctx.beginPath();
      ctx.moveTo(x + 16, y + 6);
      ctx.lineTo(x + 14, y + 16);
      ctx.lineTo(x + 18, y + 16);
      ctx.closePath();
      ctx.fill();
      // Aguja (blanca al sur)
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(x + 16, y + 26);
      ctx.lineTo(x + 14, y + 16);
      ctx.lineTo(x + 18, y + 16);
      ctx.closePath();
      ctx.fill();

    } else if (id === 'navaja') {
      // Mango
      ctx.fillStyle = '#CC3333';
      ctx.fillRect(x + 8, y + 10, 16, 12);
      // Hoja
      ctx.fillStyle = '#CCCCCC';
      ctx.beginPath();
      ctx.moveTo(x + 8, y + 10);
      ctx.lineTo(x + 16, y + 2);
      ctx.lineTo(x + 18, y + 10);
      ctx.closePath();
      ctx.fill();
      // Cruz suiza
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(x + 14, y + 13, 4, 1);
      ctx.fillRect(x + 15, y + 12, 2, 3);

    } else if (id === 'magnetometro') {
      // Cuerpo del detector
      ctx.fillStyle = '#555555';
      ctx.fillRect(x + 14, y + 4, 4, 20);
      // Cabeza del detector
      ctx.fillStyle = '#888888';
      ctx.beginPath();
      ctx.arc(x + 16, y + 26, 6, 0, Math.PI);
      ctx.fill();
      // Pantalla
      ctx.fillStyle = '#44FF44';
      ctx.fillRect(x + 12, y + 6, 8, 5);

    } else if (id === 'arcabuz') {
      // Arcabuz colonial — arma larga con culata de madera
      // Cañón metálico
      ctx.fillStyle = '#888888';
      ctx.fillRect(x + 4, y + 14, 20, 4);
      // Culata de madera
      ctx.fillStyle = '#6B4226';
      ctx.fillRect(x + 2, y + 12, 8, 8);
      // Mecanismo de mecha
      ctx.fillStyle = '#CC8844';
      ctx.fillRect(x + 12, y + 11, 4, 3);
      // Boca del cañón
      ctx.fillStyle = '#555555';
      ctx.fillRect(x + 24, y + 15, 3, 2);

    } else if (id === 'mapaColonial') {
      // Mapa colonial — pergamino con marcas de ubicación
      ctx.fillStyle = '#DAA520';
      ctx.fillRect(x + 4, y + 4, 24, 24);
      // Bordes enrollados
      ctx.fillStyle = '#B8860B';
      ctx.fillRect(x + 4, y + 4, 24, 3);
      ctx.fillRect(x + 4, y + 25, 24, 3);
      // Marcas de sitios (puntos rojos)
      ctx.fillStyle = '#CC3333';
      ctx.beginPath();
      ctx.arc(x + 12, y + 14, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 20, y + 11, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 16, y + 20, 2, 0, Math.PI * 2);
      ctx.fill();
      // Líneas de ruta
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + 12, y + 14);
      ctx.lineTo(x + 20, y + 11);
      ctx.lineTo(x + 16, y + 20);
      ctx.stroke();

    } else if (id === 'planoColonial') {
      // Plano arquitectónico — pergamino con líneas de plano
      ctx.fillStyle = '#F5DEB3';
      ctx.fillRect(x + 4, y + 4, 24, 24);
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 4, y + 4, 24, 24);
      // Líneas del plano (planta de edificio)
      ctx.strokeStyle = '#4a4a8a';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 8, y + 8, 16, 12);
      ctx.beginPath();
      ctx.moveTo(x + 14, y + 8);
      ctx.lineTo(x + 14, y + 20);
      ctx.moveTo(x + 8, y + 14);
      ctx.lineTo(x + 24, y + 14);
      ctx.stroke();

    } else if (id === 'monedaColonial') {
      // Moneda de oro — círculo con corona
      ctx.fillStyle = '#DAA520';
      ctx.beginPath();
      ctx.arc(x + 16, y + 16, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#B8860B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x + 16, y + 16, 10, 0, Math.PI * 2);
      ctx.stroke();
      // Corona estilizada
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(x + 12, y + 12, 8, 2);
      ctx.fillRect(x + 12, y + 10, 2, 4);
      ctx.fillRect(x + 18, y + 10, 2, 4);
      ctx.fillRect(x + 15, y + 9, 2, 5);

    } else if (id === 'azulejoAntiguo') {
      // Azulejo decorado — cuadrado con patrón geométrico
      ctx.fillStyle = '#4a6a8a';
      ctx.fillRect(x + 6, y + 6, 20, 20);
      ctx.fillStyle = '#FFFFFF';
      // Patrón decorativo
      ctx.fillRect(x + 9, y + 9, 14, 14);
      ctx.fillStyle = '#4a6a8a';
      ctx.fillRect(x + 12, y + 12, 8, 8);
      ctx.fillStyle = '#DAA520';
      ctx.fillRect(x + 14, y + 14, 4, 4);

    } else if (id === 'llaveHierro') {
      // Llave de hierro forjado
      ctx.fillStyle = '#888888';
      // Anillo de la llave
      ctx.strokeStyle = '#888888';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x + 10, y + 10, 5, 0, Math.PI * 2);
      ctx.stroke();
      // Vástago
      ctx.fillRect(x + 14, y + 9, 14, 3);
      // Dientes
      ctx.fillRect(x + 24, y + 9, 3, 8);
      ctx.fillRect(x + 20, y + 9, 3, 5);

    } else if (id === 'clavoBronce') {
      // Clavo de bronce de la Santa María — forma de clavo con cabeza ancha
      ctx.fillStyle = '#B87333';
      // Cabeza del clavo
      ctx.fillRect(x + 10, y + 5, 12, 4);
      // Vástago
      ctx.fillRect(x + 14, y + 9, 4, 16);
      // Punta
      ctx.beginPath();
      ctx.moveTo(x + 14, y + 25);
      ctx.lineTo(x + 16, y + 29);
      ctx.lineTo(x + 18, y + 25);
      ctx.closePath();
      ctx.fill();
      // Reflejo metálico
      ctx.fillStyle = '#D4956B';
      ctx.fillRect(x + 11, y + 6, 4, 2);

    } else if (id === 'registroAduanal') {
      // Registro aduanal — documento oficial con sello rojo
      ctx.fillStyle = '#D2B48C';
      ctx.fillRect(x + 4, y + 4, 24, 24);
      // Líneas de texto
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(x + 7, y + 9, 18, 1);
      ctx.fillRect(x + 7, y + 13, 14, 1);
      ctx.fillRect(x + 7, y + 17, 18, 1);
      // Sello rojo oficial
      ctx.fillStyle = '#CC3333';
      ctx.beginPath();
      ctx.arc(x + 22, y + 22, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FF6666';
      ctx.beginPath();
      ctx.arc(x + 22, y + 22, 3, 0, Math.PI * 2);
      ctx.fill();

    } else if (id === 'ordenJudicial') {
      // Orden judicial — documento con borde dorado y martillo
      ctx.fillStyle = '#708090';
      ctx.fillRect(x + 4, y + 4, 24, 24);
      // Borde dorado
      ctx.strokeStyle = '#DAA520';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 4, y + 4, 24, 24);
      // Líneas de texto
      ctx.fillStyle = '#2F4F4F';
      ctx.fillRect(x + 7, y + 9, 18, 1);
      ctx.fillRect(x + 7, y + 13, 14, 1);
      ctx.fillRect(x + 7, y + 17, 18, 1);
      // Martillo de juez (mini)
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(x + 14, y + 20, 8, 3);
      ctx.fillRect(x + 16, y + 18, 4, 6);

    } else if (id === 'mapaNaufragios') {
      // Mapa de naufragios — pergamino azulado con siluetas de barcos
      ctx.fillStyle = '#4488cc';
      ctx.fillRect(x + 4, y + 4, 24, 24);
      // Bordes enrollados
      ctx.fillStyle = '#336699';
      ctx.fillRect(x + 4, y + 4, 24, 3);
      ctx.fillRect(x + 4, y + 25, 24, 3);
      // Siluetas de barcos hundidos
      ctx.fillStyle = '#223355';
      // Barco 1
      ctx.beginPath();
      ctx.moveTo(x + 9, y + 16);
      ctx.lineTo(x + 12, y + 12);
      ctx.lineTo(x + 15, y + 16);
      ctx.closePath();
      ctx.fill();
      // Barco 2
      ctx.beginPath();
      ctx.moveTo(x + 18, y + 20);
      ctx.lineTo(x + 21, y + 15);
      ctx.lineTo(x + 24, y + 20);
      ctx.closePath();
      ctx.fill();
      // Olas
      ctx.strokeStyle = '#5599dd';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + 7, y + 14);
      ctx.quadraticCurveTo(x + 10, y + 12, x + 13, y + 14);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + 16, y + 18);
      ctx.quadraticCurveTo(x + 19, y + 16, x + 22, y + 18);
      ctx.stroke();

    } else if (id === 'certificadoAutenticidad') {
      // Certificado de autenticidad — documento con sello dorado
      ctx.fillStyle = '#D2B48C';
      ctx.fillRect(x + 4, y + 4, 24, 24);
      // Líneas de texto
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(x + 7, y + 9, 18, 1);
      ctx.fillRect(x + 7, y + 13, 14, 1);
      ctx.fillRect(x + 7, y + 17, 18, 1);
      // Sello dorado oficial
      ctx.fillStyle = '#DAA520';
      ctx.beginPath();
      ctx.arc(x + 22, y + 22, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(x + 22, y + 22, 3, 0, Math.PI * 2);
      ctx.fill();
      // Estrella en el sello
      ctx.fillStyle = '#B8860B';
      ctx.fillRect(x + 21, y + 20, 2, 4);
      ctx.fillRect(x + 20, y + 21, 4, 2);

    } else if (id === 'catalogoMuseo') {
      // Catálogo del museo — libro con portada marrón
      ctx.fillStyle = '#6B4226';
      ctx.fillRect(x + 6, y + 4, 20, 24);
      // Lomo del libro
      ctx.fillStyle = '#4a2a10';
      ctx.fillRect(x + 6, y + 4, 4, 24);
      // Páginas (blancas visibles)
      ctx.fillStyle = '#F5F5DC';
      ctx.fillRect(x + 10, y + 6, 14, 20);
      // Título en la portada
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(x + 12, y + 10, 10, 1);
      ctx.fillRect(x + 12, y + 14, 8, 1);
      ctx.fillRect(x + 12, y + 18, 10, 1);

    } else if (id === 'guanabana') {
      // Hojas de guanábana — hojas verdes con semillas
      // Hoja grande
      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      ctx.ellipse(x + 16, y + 10, 8, 5, -0.3, 0, Math.PI * 2);
      ctx.fill();
      // Hoja pequeña
      ctx.fillStyle = '#2E8B57';
      ctx.beginPath();
      ctx.ellipse(x + 10, y + 16, 6, 4, 0.4, 0, Math.PI * 2);
      ctx.fill();
      // Semillas (puntos marrones)
      ctx.fillStyle = '#6B3410';
      ctx.beginPath();
      ctx.arc(x + 20, y + 18, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 16, y + 22, 2, 0, Math.PI * 2);
      ctx.fill();
      // Nervaduras de la hoja
      ctx.strokeStyle = '#1a6b1a';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(x + 10, y + 10);
      ctx.lineTo(x + 22, y + 10);
      ctx.stroke();

    } else if (id === 'vasijaCurativa') {
      // Vasija de barro con mezcla curativa
      // Cuerpo de la vasija
      ctx.fillStyle = '#B8860B';
      ctx.beginPath();
      ctx.ellipse(x + 16, y + 18, 9, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      // Boca de la vasija
      ctx.fillStyle = '#D4A860';
      ctx.fillRect(x + 10, y + 8, 12, 4);
      // Contenido verde (mezcla medicinal)
      ctx.fillStyle = '#44AA44';
      ctx.beginPath();
      ctx.ellipse(x + 16, y + 10, 5, 2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Decoración taína (línea zigzag)
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + 9, y + 16);
      ctx.lineTo(x + 12, y + 14);
      ctx.lineTo(x + 15, y + 16);
      ctx.lineTo(x + 18, y + 14);
      ctx.lineTo(x + 21, y + 16);
      ctx.stroke();

    } else {
      // Genérico: cuadrado con color del objeto
      ctx.fillStyle = objeto.color || '#66aaff';
      ctx.fillRect(x + 6, y + 6, 20, 20);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 6, y + 6, 20, 20);
    }
  }
}
