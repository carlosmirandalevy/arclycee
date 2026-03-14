// ============================================================
// ALBUM-FOTOS.JS - Álbum de fotos y selfies del jugador
// ============================================================
// Mientras el jugador explora el mundo, puede tomar fotos de
// petroglifos, NPCs, objetos coleccionables y paisajes
// interesantes. También puede tomar selfies donde el personaje
// aparece junto al objetivo fotografiado.
//
// Las fotos se generan como retratos con sprites dibujados
// sobre fondos temáticos (no capturas de pantalla del canvas).
// Esto produce imágenes más bonitas y consistentes.
//
// Las fotos se guardan como miniaturas (data URL) en el álbum
// y se pueden ver en cualquier momento presionando P.
// El álbum tiene dos pestañas: Fotos y Selfies.
//
// Al guardar la partida, solo se guarda la metadata de las fotos
// (sin las imágenes) porque las imágenes pesan mucho para
// localStorage. Al cargar, se muestran placeholders en su lugar.
// ============================================================

// --- Constantes del álbum ---
// Tamaño de las fotos (cuadradas)
const FOTO_TAMANO = 160;

// Tamaño de las selfies (verticales, para que quepan dos personajes)
const SELFIE_ANCHO = 120;
const SELFIE_ALTO = 180;

// Disposición de la cuadrícula de fotos en el álbum
const FOTOS_POR_FILA = 3;
const ESPACIO_ENTRE_FOTOS = 16;
const MARGEN_LATERAL = 80;
const MARGEN_SUPERIOR = 100;

// Alto de cada celda en la cuadrícula (la mayor dimensión + texto debajo)
const ALTO_CELDA = SELFIE_ALTO + 30;

export class AlbumFotos {

  constructor() {
    // --- Estado principal ---
    // Array de entradas de fotos/selfies
    // Cada entrada: { tipo, objetivo, descripcion, mundo, fecha, miniatura }
    this.fotos = [];

    // ¿El álbum está visible en pantalla?
    this.visible = false;

    // Pestaña activa: 'fotos' o 'selfies'
    this.seccionActiva = 'fotos';

    // Posición de scroll vertical (para cuando hay muchas fotos)
    this.scrollY = 0;

    // Bloqueo de entrada para evitar input repetido
    this._bloqueoIzquierda = false;
    this._bloqueoDerecha = false;

    // Imágenes cargadas desde data URLs (cache para no recrear cada frame)
    this._imagenesCache = new Map();
  }

  // --- TOMAR UNA FOTO ---
  // Genera un retrato del objetivo usando sprites dibujados
  // sobre un fondo temático. Ya no captura el canvas directamente.
  //
  // Parámetros:
  // - objetivo: nombre del objeto/NPC fotografiado (ej: 'Petroglifo Sol')
  // - descripcion: texto corto describiendo la foto
  // - mundo: nombre del mundo donde se tomó (ej: 'cuevasPomier')
  // - entidad: referencia directa al NPC/petroglifo/objeto
  // - tipoEntidad: 'npc', 'petroglifo' u 'objeto'
  tomarFoto(objetivo, descripcion, mundo, entidad, tipoEntidad) {
    // Evitar duplicados exactos (misma foto del mismo objetivo en el mismo mundo)
    if (this.tieneFoto(objetivo)) return false;

    // Generar la imagen del retrato con sprites
    const miniatura = this._generarRetrato(entidad, tipoEntidad);

    // Crear la entrada del álbum
    this.fotos.push({
      tipo: 'foto',
      objetivo,
      descripcion,
      mundo,
      fecha: Date.now(),
      miniatura  // Data URL de la imagen generada
    });

    return true;
  }

  // --- TOMAR UNA SELFIE ---
  // Genera una imagen vertical con el objetivo arriba y el jugador
  // abajo, como si se estuvieran tomando una foto juntos.
  //
  // Parámetros extra respecto a tomarFoto:
  // - jugador: referencia al objeto jugador (para dibujar su sprite)
  tomarSelfie(objetivo, descripcion, mundo, entidad, tipoEntidad, jugador) {
    // Evitar duplicados
    if (this.tieneSelfie(objetivo)) return false;

    // Generar la selfie con ambos personajes
    const miniatura = this._generarSelfie(entidad, tipoEntidad, jugador);

    this.fotos.push({
      tipo: 'selfie',
      objetivo,
      descripcion,
      mundo,
      fecha: Date.now(),
      miniatura
    });

    return true;
  }

  // ============================================================
  // GENERACIÓN DE RETRATOS CON SPRITES
  // ============================================================
  // En lugar de capturar el canvas del juego, dibujamos sprites
  // sobre fondos temáticos en un canvas temporal. Esto produce
  // imágenes más bonitas y no depende del estado de renderizado.

  // --- GENERAR RETRATO (FOTO) ---
  // Crea una imagen cuadrada con el sprite de la entidad centrado
  // sobre un fondo temático según el tipo de entidad.
  _generarRetrato(entidad, tipoEntidad) {
    try {
      // Canvas temporal cuadrado para la foto
      const canvas = document.createElement('canvas');
      canvas.width = FOTO_TAMANO;
      canvas.height = FOTO_TAMANO;
      const ctx = canvas.getContext('2d');

      // Fondo temático según el tipo de entidad
      this._renderizarFondo(ctx, FOTO_TAMANO, FOTO_TAMANO, tipoEntidad);

      // Sprite de la entidad centrado en la imagen
      const centroX = FOTO_TAMANO / 2;
      const centroY = FOTO_TAMANO / 2;
      const escala = 2.5; // Escalamos el sprite para que se vea bien
      this._renderizarEntidad(ctx, entidad, tipoEntidad, centroX, centroY, escala);

      // Marco decorativo alrededor
      this._renderizarMarco(ctx, FOTO_TAMANO, FOTO_TAMANO, false);

      // Convertir a JPEG comprimido (calidad 60%)
      return canvas.toDataURL('image/jpeg', 0.6);
    } catch (error) {
      console.warn('No se pudo generar la foto:', error.message);
      return null;
    }
  }

  // --- GENERAR SELFIE ---
  // Crea una imagen vertical con la entidad arriba y el jugador
  // abajo, simulando que se toman una foto juntos.
  _generarSelfie(entidad, tipoEntidad, jugador) {
    try {
      // Canvas temporal vertical para la selfie
      const canvas = document.createElement('canvas');
      canvas.width = SELFIE_ANCHO;
      canvas.height = SELFIE_ALTO;
      const ctx = canvas.getContext('2d');

      // Fondo temático
      this._renderizarFondo(ctx, SELFIE_ANCHO, SELFIE_ALTO, tipoEntidad);

      // La entidad se dibuja en la parte superior
      const entidadY = SELFIE_ALTO * 0.33;
      this._renderizarEntidad(ctx, entidad, tipoEntidad, SELFIE_ANCHO / 2, entidadY, 2.0);

      // El jugador se dibuja en la parte inferior
      const jugadorY = SELFIE_ALTO * 0.72;
      this._renderizarJugador(ctx, jugador, SELFIE_ANCHO / 2, jugadorY, 2.0);

      // Marco estilo polaroid (más grueso abajo)
      this._renderizarMarco(ctx, SELFIE_ANCHO, SELFIE_ALTO, true);

      // Convertir a JPEG comprimido
      return canvas.toDataURL('image/jpeg', 0.6);
    } catch (error) {
      console.warn('No se pudo generar la selfie:', error.message);
      return null;
    }
  }

  // ============================================================
  // RENDERIZADO DE ENTIDADES (SPRITES)
  // ============================================================
  // Cada tipo de entidad se dibuja de forma diferente:
  // - NPCs: personaje humanoide con ropa coloreada
  // - Petroglifos: piedra con símbolo grabado
  // - Objetos: ítem brillante con resplandor

  // --- RENDERIZAR UNA ENTIDAD ---
  // Dibuja el sprite de la entidad centrado en (cx, cy) con la escala dada.
  // Delega al método apropiado según el tipo.
  _renderizarEntidad(ctx, entidad, tipoEntidad, cx, cy, escala) {
    if (tipoEntidad === 'npc') {
      this._renderizarNPC(ctx, entidad, cx, cy, escala);
    } else if (tipoEntidad === 'petroglifo') {
      this._renderizarPetroglifo(ctx, entidad, cx, cy, escala);
    } else if (tipoEntidad === 'objeto') {
      this._renderizarObjeto(ctx, entidad, cx, cy, escala);
    }
  }

  // --- RENDERIZAR NPC ---
  // Dibuja un personaje humanoide con cabeza, pelo, ojos, cuerpo,
  // pantalones y zapatos. El color del cuerpo viene de entidad.color.
  _renderizarNPC(ctx, entidad, cx, cy, escala) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(escala, escala);

    // Cuerpo (camisa con el color del NPC)
    ctx.fillStyle = entidad.color || '#4488ff';
    ctx.fillRect(-10, -6, 20, 16);

    // Cabeza (piel)
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(-8, -20, 16, 14);

    // Pelo
    ctx.fillStyle = '#2a1a0a';
    ctx.fillRect(-9, -22, 18, 5);

    // Ojos — blanco y pupila
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(-5, -16, 3, 3);
    ctx.fillRect(2, -16, 3, 3);
    ctx.fillStyle = '#000000';
    ctx.fillRect(-4, -15, 1.5, 1.5);
    ctx.fillRect(3, -15, 1.5, 1.5);

    // Pantalones
    ctx.fillStyle = '#2a3a5a';
    ctx.fillRect(-8, 10, 7, 8);
    ctx.fillRect(1, 10, 7, 8);

    // Zapatos
    ctx.fillStyle = '#4a3520';
    ctx.fillRect(-9, 16, 8, 3);
    ctx.fillRect(1, 16, 8, 3);

    ctx.restore();
  }

  // --- RENDERIZAR PETROGLIFO ---
  // Dibuja una piedra rectangular con un símbolo taíno grabado.
  // El símbolo depende de entidad.tipo (sol, murcielago, cara, espiral).
  _renderizarPetroglifo(ctx, entidad, cx, cy, escala) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(escala, escala);

    // Fondo de piedra
    ctx.fillStyle = '#4A3728';
    ctx.fillRect(-20, -20, 40, 40);

    // Líneas doradas del grabado
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;

    // Dibujar el símbolo según el tipo de petroglifo
    if (entidad.tipo === 'sol') {
      // Sol: círculo central con rayos alrededor
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.stroke();
      // Rayos del sol
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angulo = (i / 8) * Math.PI * 2;
        ctx.moveTo(Math.cos(angulo) * 10, Math.sin(angulo) * 10);
        ctx.lineTo(Math.cos(angulo) * 15, Math.sin(angulo) * 15);
      }
      ctx.stroke();

    } else if (entidad.tipo === 'murcielago') {
      // Murciélago: silueta de alas abiertas
      ctx.beginPath();
      ctx.moveTo(-12, 0);
      ctx.lineTo(-6, -8);
      ctx.lineTo(0, -3);
      ctx.lineTo(6, -8);
      ctx.lineTo(12, 0);
      ctx.lineTo(0, 5);
      ctx.closePath();
      ctx.stroke();

    } else if (entidad.tipo === 'cara') {
      // Cara taína: círculo con ojos y boca
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.stroke();
      // Ojos
      ctx.beginPath();
      ctx.arc(-4, -2, 2, 0, Math.PI * 2);
      ctx.arc(4, -2, 2, 0, Math.PI * 2);
      ctx.stroke();
      // Boca
      ctx.beginPath();
      ctx.moveTo(-3, 4);
      ctx.lineTo(3, 4);
      ctx.stroke();

    } else if (entidad.tipo === 'espiral') {
      // Espiral: símbolo de vida/agua taíno
      ctx.beginPath();
      for (let i = 0; i < 20; i++) {
        const angulo = (i / 20) * Math.PI * 4;
        const radio = i * 0.8;
        const metodo = i === 0 ? 'moveTo' : 'lineTo';
        ctx[metodo](Math.cos(angulo) * radio, Math.sin(angulo) * radio);
      }
      ctx.stroke();

    } else {
      // Tipo desconocido: círculo simple como fallback
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  // --- RENDERIZAR OBJETO COLECCIONABLE ---
  // Dibuja un ítem brillante con un resplandor dorado alrededor.
  // Simula los objetos que el jugador puede recoger en el mundo.
  _renderizarObjeto(ctx, entidad, cx, cy, escala) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(escala, escala);

    // Resplandor dorado alrededor del objeto
    const gradiente = ctx.createRadialGradient(0, 0, 2, 0, 0, 15);
    gradiente.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
    gradiente.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.fillStyle = gradiente;
    ctx.fillRect(-15, -15, 30, 30);

    // Caja del objeto
    ctx.fillStyle = entidad.color || '#FFD700';
    ctx.fillRect(-8, -8, 16, 16);

    // Borde blanco para resaltar
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.strokeRect(-8, -8, 16, 16);

    ctx.restore();
  }

  // --- RENDERIZAR JUGADOR ---
  // Dibuja el sprite del jugador para las selfies.
  // El diseño cambia según el género (pepito o pepita).
  _renderizarJugador(ctx, jugador, cx, cy, escala) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(escala, escala);

    const genero = jugador.genero || 'pepito';

    // Cuerpo (color diferente según género)
    const colorCuerpo = genero === 'pepito' ? '#4488ff' : '#aa44ff';
    ctx.fillStyle = colorCuerpo;
    ctx.fillRect(-10, -6, 20, 16);

    // Cabeza (piel)
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(-8, -20, 16, 14);

    // Pelo (estilo diferente según género)
    ctx.fillStyle = genero === 'pepito' ? '#2a1a0a' : '#1a0a00';
    if (genero === 'pepito') {
      // Pelo corto
      ctx.fillRect(-9, -22, 18, 6);
    } else {
      // Pelo largo con mechones laterales
      ctx.fillRect(-10, -22, 20, 6);
      ctx.fillRect(-11, -18, 4, 10);
      ctx.fillRect(7, -18, 4, 10);
    }

    // Ojos mirando al frente (a la cámara)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(-5, -16, 3, 3);
    ctx.fillRect(2, -16, 3, 3);
    ctx.fillStyle = '#000000';
    ctx.fillRect(-4, -15, 1.5, 1.5);
    ctx.fillRect(3, -15, 1.5, 1.5);

    // Pantalones
    ctx.fillStyle = '#2a5599';
    ctx.fillRect(-8, 10, 7, 8);
    ctx.fillRect(1, 10, 7, 8);

    // Zapatos
    ctx.fillStyle = '#4a3520';
    ctx.fillRect(-9, 16, 8, 3);
    ctx.fillRect(1, 16, 8, 3);

    ctx.restore();
  }

  // ============================================================
  // FONDOS Y MARCOS DECORATIVOS
  // ============================================================

  // --- RENDERIZAR FONDO ---
  // Dibuja un fondo temático según el tipo de entidad fotografiada.
  // Cada tipo tiene un ambiente diferente para hacer las fotos
  // más interesantes visualmente.
  _renderizarFondo(ctx, ancho, alto, tipoEntidad) {
    if (tipoEntidad === 'npc') {
      // NPCs: cielo azul con degradado a verde (exterior soleado)
      const gradiente = ctx.createLinearGradient(0, 0, 0, alto);
      gradiente.addColorStop(0, '#87CEEB');   // Azul cielo arriba
      gradiente.addColorStop(0.6, '#B0E0B0'); // Verdoso en el medio
      gradiente.addColorStop(1, '#4A7A4A');   // Verde oscuro abajo
      ctx.fillStyle = gradiente;
      ctx.fillRect(0, 0, ancho, alto);

    } else if (tipoEntidad === 'petroglifo') {
      // Petroglifos: cueva oscura con textura rocosa sutil
      const gradiente = ctx.createRadialGradient(
        ancho / 2, alto / 2, 10,
        ancho / 2, alto / 2, ancho * 0.8
      );
      gradiente.addColorStop(0, '#3A2A1A'); // Centro un poco más claro
      gradiente.addColorStop(1, '#1A0E05'); // Bordes muy oscuros
      ctx.fillStyle = gradiente;
      ctx.fillRect(0, 0, ancho, alto);

      // Textura sutil de roca (puntos aleatorios pero deterministas)
      ctx.fillStyle = 'rgba(100, 80, 60, 0.15)';
      for (let i = 0; i < 30; i++) {
        // Usamos una fórmula simple para posiciones "aleatorias" pero fijas
        const px = ((i * 37 + 13) % ancho);
        const py = ((i * 53 + 7) % alto);
        ctx.fillRect(px, py, 2, 2);
      }

    } else if (tipoEntidad === 'objeto') {
      // Objetos: degradado ámbar cálido (como un tesoro iluminado)
      const gradiente = ctx.createRadialGradient(
        ancho / 2, alto / 2, 5,
        ancho / 2, alto / 2, ancho * 0.7
      );
      gradiente.addColorStop(0, '#FFE4B5'); // Centro dorado claro
      gradiente.addColorStop(0.5, '#DEB887');
      gradiente.addColorStop(1, '#8B6914'); // Bordes marrón dorado
      ctx.fillStyle = gradiente;
      ctx.fillRect(0, 0, ancho, alto);

    } else {
      // Fallback: gris neutro
      ctx.fillStyle = '#333333';
      ctx.fillRect(0, 0, ancho, alto);
    }
  }

  // --- RENDERIZAR MARCO ---
  // Dibuja un borde decorativo alrededor de la foto.
  // Las selfies tienen un estilo "polaroid" con marco más ancho abajo.
  _renderizarMarco(ctx, ancho, alto, esSelfie) {
    const grosor = 4;

    if (esSelfie) {
      // Estilo polaroid: marco blanco, más grueso abajo
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = grosor;
      ctx.strokeRect(grosor / 2, grosor / 2, ancho - grosor, alto - grosor);

      // Franja blanca extra abajo (estilo polaroid)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(0, alto - 16, ancho, 16);
    } else {
      // Marco dorado sencillo para fotos normales
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = grosor;
      ctx.strokeRect(grosor / 2, grosor / 2, ancho - grosor, alto - grosor);

      // Borde interior más sutil
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(grosor + 1, grosor + 1, ancho - (grosor + 1) * 2, alto - (grosor + 1) * 2);
    }
  }

  // --- VERIFICAR SI YA EXISTE UNA FOTO/SELFIE ---
  // Se usa para evitar duplicados y para mostrar indicadores visuales

  tieneFoto(objetivo) {
    return this.fotos.some(f => f.tipo === 'foto' && f.objetivo === objetivo);
  }

  tieneSelfie(objetivo) {
    return this.fotos.some(f => f.tipo === 'selfie' && f.objetivo === objetivo);
  }

  // --- MANEJAR ENTRADA DEL ÁLBUM ---
  // Procesa las teclas cuando el álbum está visible.
  // Flechas izq/der cambian pestaña, arriba/abajo hacen scroll.
  manejarEntrada(entrada) {
    // Cambiar pestaña con flechas horizontales
    if (entrada.estaPresionada('izquierda') && !this._bloqueoIzquierda) {
      this.seccionActiva = 'fotos';
      this._bloqueoIzquierda = true;
    }
    if (!entrada.estaPresionada('izquierda')) {
      this._bloqueoIzquierda = false;
    }

    if (entrada.estaPresionada('derecha') && !this._bloqueoDerecha) {
      this.seccionActiva = 'selfies';
      this._bloqueoDerecha = true;
    }
    if (!entrada.estaPresionada('derecha')) {
      this._bloqueoDerecha = false;
    }

    // Scroll vertical con flechas verticales
    if (entrada.estaPresionada('arriba')) {
      this.scrollY = Math.max(0, this.scrollY - 5);
    }
    if (entrada.estaPresionada('abajo')) {
      this.scrollY += 5;
    }
  }

  // --- DIBUJAR EL ÁLBUM ---
  // Overlay semi-transparente que muestra la cuadrícula de fotos.
  // Se dibuja encima de todo (como el inventario o el combate).
  // Fotos se muestran como cuadrados (160×160) y selfies como
  // rectángulos verticales (120×180).
  dibujar(ctx, ancho, alto, textos) {
    const t = textos?.album || {};

    ctx.save();

    // --- Fondo oscuro semitransparente ---
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, ancho, alto);

    // --- Título del álbum ---
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(t.titulo || 'Álbum de Fotos', ancho / 2, 40);

    // --- Pestañas (Fotos | Selfies) ---
    const anchoTab = 150;
    const altoTab = 30;
    const tabY = 55;
    const tab1X = ancho / 2 - anchoTab - 5;
    const tab2X = ancho / 2 + 5;

    // Pestaña "Fotos"
    const esFotos = this.seccionActiva === 'fotos';
    ctx.fillStyle = esFotos ? 'rgba(255, 215, 0, 0.3)' : 'rgba(100, 100, 100, 0.3)';
    ctx.fillRect(tab1X, tabY, anchoTab, altoTab);
    ctx.strokeStyle = esFotos ? '#FFD700' : '#666666';
    ctx.lineWidth = esFotos ? 2 : 1;
    ctx.strokeRect(tab1X, tabY, anchoTab, altoTab);
    ctx.fillStyle = esFotos ? '#FFD700' : '#AAAAAA';
    ctx.font = esFotos ? 'bold 14px monospace' : '14px monospace';
    ctx.fillText(t.fotos || 'Fotos', tab1X + anchoTab / 2, tabY + 20);

    // Pestaña "Selfies"
    const esSelfies = this.seccionActiva === 'selfies';
    ctx.fillStyle = esSelfies ? 'rgba(255, 215, 0, 0.3)' : 'rgba(100, 100, 100, 0.3)';
    ctx.fillRect(tab2X, tabY, anchoTab, altoTab);
    ctx.strokeStyle = esSelfies ? '#FFD700' : '#666666';
    ctx.lineWidth = esSelfies ? 2 : 1;
    ctx.strokeRect(tab2X, tabY, anchoTab, altoTab);
    ctx.fillStyle = esSelfies ? '#FFD700' : '#AAAAAA';
    ctx.font = esSelfies ? 'bold 14px monospace' : '14px monospace';
    ctx.fillText(t.selfies || 'Selfies', tab2X + anchoTab / 2, tabY + 20);

    // --- Filtrar fotos por la pestaña activa ---
    const tipoFiltro = this.seccionActiva === 'fotos' ? 'foto' : 'selfie';
    const fotosFiltradas = this.fotos.filter(f => f.tipo === tipoFiltro);

    // --- Si no hay fotos, mostrar mensaje de vacío ---
    if (fotosFiltradas.length === 0) {
      ctx.fillStyle = '#888888';
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      const mensajeVacio = this.seccionActiva === 'fotos'
        ? (t.vacio || '¡Aún no tienes fotos. ¡Explora y captura momentos!')
        : (t.vacioSelfies || '¡Aún no tienes selfies. ¡Posa con lo que encuentres!');
      ctx.fillText(mensajeVacio, ancho / 2, alto / 2);

      // Instrucciones de cierre
      ctx.fillStyle = '#666666';
      ctx.font = '12px monospace';
      ctx.fillText(t.instrucciones || '← → cambiar pestaña | ↑ ↓ desplazar | P cerrar', ancho / 2, alto - 30);

      ctx.restore();
      return;
    }

    // --- Dibujar cuadrícula de fotos ---
    // Aplicamos clip para que las fotos no se salgan de la zona visible
    const zonaY = MARGEN_SUPERIOR;
    const zonaAlto = alto - MARGEN_SUPERIOR - 50; // 50px para instrucciones
    ctx.beginPath();
    ctx.rect(0, zonaY, ancho, zonaAlto);
    ctx.clip();

    // Dimensiones de miniatura según la pestaña activa
    const miniAncho = tipoFiltro === 'foto' ? FOTO_TAMANO : SELFIE_ANCHO;
    const miniAlto = tipoFiltro === 'foto' ? FOTO_TAMANO : SELFIE_ALTO;
    const altoCeldaActual = miniAlto + 30;

    const anchoDisponible = ancho - MARGEN_LATERAL * 2;
    const anchoCelda = (anchoDisponible - (FOTOS_POR_FILA - 1) * ESPACIO_ENTRE_FOTOS) / FOTOS_POR_FILA;

    for (let i = 0; i < fotosFiltradas.length; i++) {
      const foto = fotosFiltradas[i];
      const fila = Math.floor(i / FOTOS_POR_FILA);
      const columna = i % FOTOS_POR_FILA;

      const x = MARGEN_LATERAL + columna * (anchoCelda + ESPACIO_ENTRE_FOTOS);
      const y = zonaY + fila * (altoCeldaActual + ESPACIO_ENTRE_FOTOS) - this.scrollY;

      // Saltar fotos que están fuera de la zona visible
      if (y + altoCeldaActual < zonaY || y > zonaY + zonaAlto) continue;

      // --- Fondo de la miniatura ---
      ctx.fillStyle = 'rgba(40, 40, 40, 0.8)';
      // Centrar la miniatura dentro de la celda
      const offsetX = (anchoCelda - miniAncho) / 2;
      ctx.fillRect(x + offsetX, y, miniAncho, miniAlto);

      // --- Dibujar miniatura o placeholder ---
      if (foto.miniatura) {
        // Intentar obtener la imagen del cache
        let img = this._imagenesCache.get(foto.miniatura);
        if (!img) {
          // Crear y cachear la imagen
          img = new Image();
          img.src = foto.miniatura;
          this._imagenesCache.set(foto.miniatura, img);
        }

        // Solo dibujar si la imagen ya cargó
        if (img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, x + offsetX, y, miniAncho, miniAlto);
        } else {
          // Placeholder mientras carga
          this._dibujarPlaceholder(ctx, x + offsetX, y, miniAncho, miniAlto, foto.tipo);
        }
      } else {
        // Sin miniatura (cargado de guardado) — mostrar placeholder
        this._dibujarPlaceholder(ctx, x + offsetX, y, miniAncho, miniAlto, foto.tipo);
      }

      // --- Borde de la miniatura ---
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + offsetX, y, miniAncho, miniAlto);

      // --- Nombre del objetivo debajo ---
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      // Truncar nombre si es muy largo
      const nombre = foto.objetivo.length > 20
        ? foto.objetivo.substring(0, 18) + '...'
        : foto.objetivo;
      ctx.fillText(nombre, x + anchoCelda / 2, y + miniAlto + 15);
    }

    // Restaurar clip
    ctx.restore();

    // --- Instrucciones al fondo (fuera del clip) ---
    ctx.save();
    ctx.fillStyle = '#666666';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(
      t.instrucciones || '← → cambiar pestaña | ↑ ↓ desplazar | P cerrar',
      ancho / 2,
      alto - 20
    );

    // --- Contador de fotos ---
    ctx.fillStyle = '#AAAAAA';
    ctx.font = '11px monospace';
    ctx.fillText(
      `${fotosFiltradas.length} ${tipoFiltro === 'foto' ? (t.fotos || 'Fotos') : (t.selfies || 'Selfies')}`,
      ancho / 2,
      alto - 40
    );
    ctx.restore();
  }

  // --- DIBUJAR PLACEHOLDER ---
  // Cuando no hay miniatura (ej: después de cargar partida),
  // mostramos un ícono de cámara o persona estilizado.
  _dibujarPlaceholder(ctx, x, y, ancho, alto, tipo) {
    ctx.fillStyle = 'rgba(60, 60, 60, 0.9)';
    ctx.fillRect(x, y, ancho, alto);

    ctx.fillStyle = '#555555';
    ctx.font = '28px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Ícono simple: cámara para fotos, persona+cámara para selfies
    ctx.fillText(tipo === 'foto' ? '[foto]' : '[selfie]', x + ancho / 2, y + alto / 2);
    ctx.textBaseline = 'alphabetic';
  }

  // --- SERIALIZAR PARA GUARDADO ---
  // Devuelve solo la metadata de las fotos (sin las imágenes base64)
  // porque las imágenes son demasiado grandes para localStorage.
  serializar() {
    return this.fotos.map(f => ({
      tipo: f.tipo,
      objetivo: f.objetivo,
      descripcion: f.descripcion,
      mundo: f.mundo,
      fecha: f.fecha
      // NO incluimos 'miniatura' — demasiado grande para localStorage
    }));
  }

  // --- DESERIALIZAR DESDE GUARDADO ---
  // Restaura las entradas del álbum a partir de datos guardados.
  // Las miniaturas serán null (se muestran como placeholders).
  deserializar(datos) {
    if (!Array.isArray(datos)) return;

    this.fotos = datos.map(d => ({
      tipo: d.tipo || 'foto',
      objetivo: d.objetivo || '???',
      descripcion: d.descripcion || '',
      mundo: d.mundo || '',
      fecha: d.fecha || 0,
      miniatura: null  // Las imágenes no se guardan, se muestran placeholders
    }));

    // Limpiar cache de imágenes (ya no son válidas)
    this._imagenesCache.clear();
  }
}
