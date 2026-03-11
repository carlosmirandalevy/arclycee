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
    // Cada objeto tiene: {id, nombre, descripcion, tipo, cantidad, icono, esUsable}
    this.objetos = [];

    // Máximo 20 objetos para obligar al jugador a decidir qué guardar
    // (un inventario infinito le quita emoción a encontrar cosas)
    this.capacidad = 20;

    // Estado de la UI: si el inventario está visible o no
    this.abierto = false;

    // Cuál slot tiene seleccionado el jugador (para navegar con flechas)
    this.seleccion = 0;
  }

  // --- Agregar un objeto ---
  // Si ya tiene uno del mismo tipo, solo suma la cantidad (stackear).
  // Si no, lo agrega como nuevo si hay espacio.
  // Retorna true si se agregó con éxito, false si no cabe.
  agregar(objeto) {
    // Buscar si ya tiene uno igual para stackear
    const existente = this.objetos.find(o => o.id === objeto.id);

    if (existente) {
      existente.cantidad += (objeto.cantidad || 1);
      return true;
    }

    if (this.estaLleno()) return false;

    // Asegurar que tenga cantidad mínima de 1
    this.objetos.push({
      ...objeto,
      cantidad: objeto.cantidad || 1
    });
    return true;
  }

  // --- Remover un objeto por ID ---
  // Busca el objeto y lo quita. Si tiene cantidad > 1, solo resta 1.
  remover(id) {
    const indice = this.objetos.findIndex(o => o.id === id);
    if (indice === -1) return false;

    if (this.objetos[indice].cantidad > 1) {
      this.objetos[indice].cantidad -= 1;
    } else {
      this.objetos.splice(indice, 1);
    }

    // Ajustar selección si quedó fuera de rango
    if (this.seleccion >= this.objetos.length) {
      this.seleccion = Math.max(0, this.objetos.length - 1);
    }
    return true;
  }

  // --- Usar un objeto en el jugador ---
  // Aplica el efecto del objeto (curar, equipar, etc.) y lo remueve.
  // Solo funciona con objetos que tienen esUsable=true.
  usar(id, jugador) {
    const objeto = this.obtener(id);
    if (!objeto || !objeto.esUsable) return false;

    // Aplicamos el efecto según el tipo de objeto
    switch (objeto.tipo) {
      case 'curacion':
        // Los objetos de curación restauran vida
        jugador.curar(objeto.valor || 20);
        break;
      case 'comida':
        // La comida restaura hambre
        jugador.hambre = Math.min(100, jugador.hambre + (objeto.valor || 15));
        break;
      case 'herramienta':
        // Las herramientas se agregan al inventario del jugador directamente
        // (como la linterna o brújula que se revisan con getters)
        jugador.agregarAlInventario(objeto);
        break;
      default:
        return false;
    }

    this.remover(id);
    return true;
  }

  // --- Verificar si está lleno ---
  estaLleno() {
    return this.objetos.length >= this.capacidad;
  }

  // --- Obtener objeto por ID ---
  obtener(id) {
    return this.objetos.find(o => o.id === id) || null;
  }

  // --- Controles de UI ---
  abrir() {
    this.abierto = true;
  }

  cerrar() {
    this.abierto = false;
  }

  alternar() {
    this.abierto = !this.abierto;
  }

  // --- Mover la selección en la grilla ---
  // La grilla tiene 5 columnas, así que "arriba" y "abajo" saltan de 5 en 5
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

  // --- Dibujar el inventario ---
  // Dibuja una grilla semitransparente en el centro de la pantalla
  // con los objetos representados como rectángulos de colores (placeholder).
  // Muestra nombres en el idioma actual usando el objeto "idiomas".
  dibujar(renderizador, anchoCanvas, altoCanvas, idiomas) {
    if (!this.abierto) return;

    const ctx = renderizador;
    const columnas = 5;
    const filas = 4;
    const tamanoSlot = 48;
    const margen = 4;
    const anchoGrilla = columnas * (tamanoSlot + margen);
    const altoGrilla = filas * (tamanoSlot + margen);

    // Posicionar la grilla en el centro de la pantalla
    const inicioX = (anchoCanvas - anchoGrilla) / 2;
    const inicioY = (altoCanvas - altoGrilla) / 2;

    // Fondo semitransparente oscuro detrás de todo (para que se lea bien)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, anchoCanvas, altoCanvas);

    // Título del inventario
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    const titulo = idiomas?.inventario?.titulo || 'Inventario';
    ctx.fillText(titulo, anchoCanvas / 2, inicioY - 15);

    // Dibujar cada slot de la grilla
    for (let i = 0; i < this.capacidad; i++) {
      const fila = Math.floor(i / columnas);
      const columna = i % columnas;
      const slotX = inicioX + columna * (tamanoSlot + margen);
      const slotY = inicioY + fila * (tamanoSlot + margen);

      // Fondo del slot: dorado si está seleccionado, gris si no
      ctx.fillStyle = (i === this.seleccion) ? '#ffcc00' : '#444444';
      ctx.fillRect(slotX, slotY, tamanoSlot, tamanoSlot);

      // Borde del slot
      ctx.strokeStyle = '#888888';
      ctx.lineWidth = 1;
      ctx.strokeRect(slotX, slotY, tamanoSlot, tamanoSlot);

      // Si hay un objeto en este slot, dibujarlo
      if (i < this.objetos.length) {
        const objeto = this.objetos[i];

        // Icono del objeto (rectángulo de color como placeholder)
        ctx.fillStyle = objeto.icono || '#66aaff';
        ctx.fillRect(slotX + 8, slotY + 8, 32, 24);

        // Cantidad (solo si tiene más de 1)
        if (objeto.cantidad > 1) {
          ctx.fillStyle = '#ffffff';
          ctx.font = '10px monospace';
          ctx.textAlign = 'right';
          ctx.fillText(`x${objeto.cantidad}`, slotX + tamanoSlot - 4, slotY + tamanoSlot - 4);
        }
      }
    }

    // Mostrar info del objeto seleccionado debajo de la grilla
    if (this.seleccion < this.objetos.length) {
      const seleccionado = this.objetos[this.seleccion];
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';

      // Nombre del objeto
      const nombreTexto = seleccionado.nombre || 'Desconocido';
      ctx.fillText(nombreTexto, anchoCanvas / 2, inicioY + altoGrilla + 20);

      // Descripción del objeto
      ctx.font = '11px monospace';
      ctx.fillStyle = '#cccccc';
      const descTexto = seleccionado.descripcion || '';
      ctx.fillText(descTexto, anchoCanvas / 2, inicioY + altoGrilla + 40);
    }

    // Restaurar alineación de texto
    ctx.textAlign = 'left';
  }
}
