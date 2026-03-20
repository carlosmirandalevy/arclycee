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

// Tamaño de las selfies (verticales, dos personajes uno al lado del otro)
const SELFIE_ANCHO = 160;
const SELFIE_ALTO = 200;

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
  tomarFoto(objetivo, descripcion, mundo, entidad, tipoEntidad, escena) {
    // Evitar duplicados exactos (misma foto del mismo objetivo en el mismo mundo)
    if (this.tieneFoto(objetivo)) return false;

    // Generar la imagen del retrato con sprites
    // Se pasa la escena para que pueda usar _dibujarNPC con los sprites reales
    const miniatura = this._generarRetrato(entidad, tipoEntidad, escena);

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
  tomarSelfie(objetivo, descripcion, mundo, entidad, tipoEntidad, jugador, escena) {
    // Evitar duplicados
    if (this.tieneSelfie(objetivo)) return false;

    // Generar la selfie con ambos personajes lado a lado
    // Se pasa la escena para que pueda usar _dibujarNPC con los sprites reales
    const miniatura = this._generarSelfie(entidad, tipoEntidad, jugador, escena);

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
  // Cada foto/selfie dibuja sprites sobre un fondo oscuro neutro
  // en un canvas temporal. NO se captura la pantalla del juego.
  // Para NPCs, se usa un canvas auxiliar para detectar el bounding
  // box del sprite y centrarlo automáticamente.

  // --- GENERAR RETRATO (FOTO) ---
  // Crea una imagen cuadrada con SOLO el sprite de la entidad,
  // centrado sobre un fondo oscuro neutro. Sin captura de pantalla.
  _generarRetrato(entidad, tipoEntidad, escena) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = FOTO_TAMANO;
      canvas.height = FOTO_TAMANO;
      const ctx = canvas.getContext('2d');

      // Fondo oscuro neutro (no temático — evita confusión con pantalla)
      this._renderizarFondo(ctx, FOTO_TAMANO, FOTO_TAMANO);

      // Sprite de la entidad centrado y grande
      // Usamos un canvas auxiliar para capturar el sprite y centrarlo
      const centroX = FOTO_TAMANO / 2;
      const centroY = FOTO_TAMANO / 2;
      this._renderizarEntidadCentrada(ctx, entidad, tipoEntidad, centroX, centroY, 3.5, escena);

      // Marco dorado sencillo
      this._renderizarMarco(ctx, FOTO_TAMANO, FOTO_TAMANO, false);

      return canvas.toDataURL('image/jpeg', 0.6);
    } catch (error) {
      console.warn('No se pudo generar la foto:', error.message);
      return null;
    }
  }

  // --- GENERAR SELFIE ---
  // Crea una imagen vertical con la entidad a la izquierda y el
  // jugador a la derecha, ambos centrados verticalmente.
  _generarSelfie(entidad, tipoEntidad, jugador, escena) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = SELFIE_ANCHO;
      canvas.height = SELFIE_ALTO;
      const ctx = canvas.getContext('2d');

      // Fondo oscuro neutro
      this._renderizarFondo(ctx, SELFIE_ANCHO, SELFIE_ALTO);

      // Línea divisoria sutil en el centro
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(SELFIE_ANCHO / 2, 20);
      ctx.lineTo(SELFIE_ANCHO / 2, SELFIE_ALTO - 20);
      ctx.stroke();

      // Entidad a la izquierda, jugador a la derecha
      const centroY = SELFIE_ALTO / 2;
      const escalaPersonajes = 2.5;
      const entidadX = SELFIE_ANCHO * 0.28;
      const jugadorX = SELFIE_ANCHO * 0.72;

      this._renderizarEntidadCentrada(ctx, entidad, tipoEntidad, entidadX, centroY, escalaPersonajes, escena);
      this._renderizarJugador(ctx, jugador, jugadorX, centroY, escalaPersonajes);

      // Marco polaroid blanco
      this._renderizarMarco(ctx, SELFIE_ANCHO, SELFIE_ALTO, true);

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

  // --- RENDERIZAR ENTIDAD CENTRADA ---
  // Dibuja el sprite en un canvas auxiliar, detecta los píxeles
  // dibujados, y los centra correctamente en la posición (cx, cy).
  // Esto funciona con cualquier escena y cualquier método _dibujarNPC
  // sin importar cómo ese método posicione el sprite internamente.
  _renderizarEntidadCentrada(ctx, entidad, tipoEntidad, cx, cy, escala, escena) {
    if (tipoEntidad === 'tortuga') {
      this._renderizarTortuga(ctx, entidad, cx, cy, escala);
    } else if (tipoEntidad === 'coral') {
      this._renderizarCoral(ctx, entidad, cx, cy, escala);
    } else if (tipoEntidad === 'npc') {
      this._renderizarNPCCentrado(ctx, entidad, cx, cy, escala, escena);
    } else if (tipoEntidad === 'petroglifo') {
      this._renderizarPetroglifo(ctx, entidad, cx, cy, escala);
    } else if (tipoEntidad === 'fauna') {
      this._renderizarFauna(ctx, entidad, cx, cy, escala);
    } else if (tipoEntidad === 'objeto') {
      this._renderizarObjeto(ctx, entidad, cx, cy, escala);
    }
  }

  // --- RENDERIZAR NPC CENTRADO ---
  // Dibuja el NPC en un canvas auxiliar para capturar su sprite,
  // luego lo copia centrado en la posición deseada. Esto asegura
  // que el sprite quede centrado sin importar los offsets internos
  // del método _dibujarNPC de cada escena.
  _renderizarNPCCentrado(ctx, entidad, cx, cy, escala, escena) {
    // Tamaño del canvas auxiliar (suficiente para cualquier sprite)
    const auxTamano = 200;
    const auxCanvas = document.createElement('canvas');
    auxCanvas.width = auxTamano;
    auxCanvas.height = auxTamano;
    const auxCtx = auxCanvas.getContext('2d');

    // Dibujar el sprite del NPC en el centro del canvas auxiliar
    if (escena && typeof escena._dibujarNPC === 'function') {
      // Usamos _dibujarNPC con offsets que posicionen el NPC en el centro
      escena._dibujarNPC(auxCtx, entidad, auxTamano / 2 - entidad.x, auxTamano / 2 - entidad.y, entidad);
    } else {
      // Fallback: dibujar personaje genérico centrado
      this._dibujarNPCGenerico(auxCtx, entidad, auxTamano / 2, auxTamano / 2);
    }

    // Detectar los límites reales del sprite dibujado (bounding box)
    const datos = auxCtx.getImageData(0, 0, auxTamano, auxTamano).data;
    let minX = auxTamano, minY = auxTamano, maxX = 0, maxY = 0;
    for (let py = 0; py < auxTamano; py++) {
      for (let px = 0; px < auxTamano; px++) {
        // Canal alfa > 0 significa que hay un pixel dibujado
        if (datos[(py * auxTamano + px) * 4 + 3] > 0) {
          if (px < minX) minX = px;
          if (px > maxX) maxX = px;
          if (py < minY) minY = py;
          if (py > maxY) maxY = py;
        }
      }
    }

    // Si no se dibujó nada, usar fallback
    if (maxX <= minX || maxY <= minY) {
      this._dibujarNPCGenerico(ctx, entidad, cx, cy);
      return;
    }

    // Recortar solo la zona del sprite y dibujarla centrada + escalada
    const spriteAncho = maxX - minX + 1;
    const spriteAlto = maxY - minY + 1;

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      auxCanvas,
      minX, minY, spriteAncho, spriteAlto,           // Fuente: solo el sprite
      cx - spriteAncho * escala / 2,                   // Destino X centrado
      cy - spriteAlto * escala / 2,                    // Destino Y centrado
      spriteAncho * escala,                            // Ancho escalado
      spriteAlto * escala                              // Alto escalado
    );
    ctx.restore();
  }

  // --- DIBUJAR NPC GENÉRICO ---
  // Sprite de personaje centrado en (cx, cy) para cuando la escena
  // no tiene un método _dibujarNPC propio.
  _dibujarNPCGenerico(ctx, entidad, cx, cy) {
    ctx.save();
    ctx.translate(cx, cy);

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
  // --- RENDERIZAR FAUNA ---
  // Dibuja un sprite simplificado de cada especie animal
  _renderizarFauna(ctx, entidad, cx, cy, escala) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(escala, escala);

    const nombre = entidad.nombre || '';

    if (nombre.indexOf('Cocodrilo') >= 0 || nombre.indexOf('Crocodile') >= 0) {
      // Cocodrilo — cuerpo verde alargado con mandíbula
      ctx.fillStyle = '#3a5a2a';
      ctx.beginPath();
      ctx.ellipse(0, 0, 20, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#4a6a3a';
      ctx.beginPath();
      ctx.moveTo(18, -3); ctx.lineTo(28, 0); ctx.lineTo(18, 3);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#FF4444';
      ctx.beginPath(); ctx.arc(20, -2, 1.5, 0, Math.PI * 2); ctx.fill();
      // Patas
      ctx.fillStyle = '#3a5a2a';
      ctx.fillRect(-10, 5, 4, 5); ctx.fillRect(5, 5, 4, 5);
    } else if (nombre.indexOf('Rinoceronte') >= 0 || nombre.indexOf('Rhinoceros') >= 0 || nombre.indexOf('Rhinoc') >= 0) {
      // Iguana rinoceronte — verde-gris con cuernos
      ctx.fillStyle = '#6a7a5a';
      ctx.beginPath();
      ctx.ellipse(0, 0, 14, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      // Cabeza
      ctx.beginPath(); ctx.arc(12, -1, 5, 0, Math.PI * 2); ctx.fill();
      // Cuernos
      ctx.fillStyle = '#5a5a4a';
      ctx.beginPath(); ctx.arc(15, -4, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(13, -5, 1.5, 0, Math.PI * 2); ctx.fill();
      // Ojo amarillo
      ctx.fillStyle = '#CCAA44';
      ctx.beginPath(); ctx.arc(11, -2, 1.5, 0, Math.PI * 2); ctx.fill();
      // Cresta dorsal
      ctx.fillStyle = '#5a6a4a';
      for (let i = 0; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(-6 + i * 4, -4); ctx.lineTo(-4 + i * 4, -7); ctx.lineTo(-2 + i * 4, -4); ctx.closePath(); ctx.fill();
      }
    } else if (nombre.indexOf('Ricord') >= 0) {
      // Iguana Ricord — gris-azul con ojos rojos
      ctx.fillStyle = '#5a6a6a';
      ctx.beginPath();
      ctx.ellipse(0, 0, 14, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath(); ctx.arc(12, -1, 5, 0, Math.PI * 2); ctx.fill();
      // Ojo ROJO
      ctx.fillStyle = '#CC2222';
      ctx.beginPath(); ctx.arc(11, -2, 2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#111';
      ctx.beginPath(); ctx.arc(11, -2, 0.8, 0, Math.PI * 2); ctx.fill();
      // Cresta
      ctx.fillStyle = '#4a5a5a';
      for (let i = 0; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(-6 + i * 4, -4); ctx.lineTo(-4 + i * 4, -7); ctx.lineTo(-2 + i * 4, -4); ctx.closePath(); ctx.fill();
      }
    } else if (nombre.indexOf('Flamenco') >= 0 || nombre.indexOf('Flamingo') >= 0 || nombre.indexOf('Flamant') >= 0) {
      // Flamenco rosado
      ctx.fillStyle = '#FF8899';
      ctx.beginPath(); ctx.ellipse(0, 5, 7, 5, 0, 0, Math.PI * 2); ctx.fill();
      // Cuello en S
      ctx.strokeStyle = '#FF8899';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(4, 2);
      ctx.bezierCurveTo(6, -6, 1, -14, 4, -18);
      ctx.stroke();
      // Cabeza
      ctx.fillStyle = '#FF8899';
      ctx.beginPath(); ctx.arc(4, -18, 3, 0, Math.PI * 2); ctx.fill();
      // Ojo
      ctx.fillStyle = '#111';
      ctx.beginPath(); ctx.arc(5, -19, 0.8, 0, Math.PI * 2); ctx.fill();
      // Pico
      ctx.fillStyle = '#222';
      ctx.beginPath(); ctx.moveTo(7, -19); ctx.lineTo(12, -17); ctx.lineTo(10, -15); ctx.closePath(); ctx.fill();
      // Pata
      ctx.strokeStyle = '#CC6677'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(0, 9); ctx.lineTo(0, 20); ctx.stroke();
    } else if (nombre.indexOf('Cuc') >= 0 || nombre.indexOf('Burrowing') >= 0 || nombre.indexOf('Hibou') >= 0) {
      // Cucú — búho pequeño
      ctx.fillStyle = '#8a7a5a';
      ctx.beginPath(); ctx.ellipse(0, 2, 5, 6, 0, 0, Math.PI * 2); ctx.fill();
      // Cabeza
      ctx.beginPath(); ctx.arc(0, -5, 4, 0, Math.PI * 2); ctx.fill();
      // Disco facial
      ctx.fillStyle = '#DDCCAA';
      ctx.beginPath(); ctx.arc(0, -5, 3, 0, Math.PI * 2); ctx.fill();
      // Ojos amarillos grandes
      ctx.fillStyle = '#DDAA22';
      ctx.beginPath(); ctx.arc(-1.5, -6, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(1.5, -6, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#111';
      ctx.beginPath(); ctx.arc(-1.5, -6, 0.6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(1.5, -6, 0.6, 0, Math.PI * 2); ctx.fill();
    } else if (nombre.indexOf('Culebra') >= 0 || nombre.indexOf('Racer') >= 0 || nombre.indexOf('Couleuvre') >= 0) {
      // Culebra corredora — serpiente sinuosa
      ctx.strokeStyle = '#6a5a2a';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.quadraticCurveTo(-10, -5, 0, 2);
      ctx.quadraticCurveTo(10, 8, 18, 0);
      ctx.stroke();
      // Cabeza
      ctx.fillStyle = '#6a5a2a';
      ctx.beginPath(); ctx.moveTo(16, -2); ctx.lineTo(22, 0); ctx.lineTo(16, 2); ctx.closePath(); ctx.fill();
      // Ojo
      ctx.fillStyle = '#DDAA22';
      ctx.beginPath(); ctx.arc(17, -1, 1, 0, Math.PI * 2); ctx.fill();
    } else {
      // Genérico — silueta de animal
      ctx.fillStyle = '#888888';
      ctx.beginPath(); ctx.ellipse(0, 0, 12, 8, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#AAAAAA';
      ctx.font = '12px monospace'; ctx.textAlign = 'center';
      ctx.fillText('🐾', 0, 4);
    }

    ctx.restore();
  }

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

  // --- RENDERIZAR CORAL ---
  // Dibuja el sprite de un coral centrado en (cx, cy).
  // Cada tipo tiene forma y colores únicos: cerebro, cuerno, abanico, mesa.
  _renderizarCoral(ctx, entidad, cx, cy, escala) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(escala, escala);

    const tipo = entidad.tipo || '';

    if (tipo === 'coralCerebro') {
      // Coral cerebro — hemisferio con surcos meándricos
      // Base: gradiente radial beige→marrón
      const grad = ctx.createRadialGradient(-2, -3, 2, 0, 0, 22);
      grad.addColorStop(0, '#D4B896');
      grad.addColorStop(0.6, '#C4A070');
      grad.addColorStop(1, '#8B7355');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(0, 2, 22, 16, 0, 0, Math.PI * 2);
      ctx.fill();

      // Surcos meándricos (líneas sinuosas clipeadas)
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, 2, 20, 14, 0, 0, Math.PI * 2);
      ctx.clip();
      ctx.strokeStyle = '#6B5A3A';
      ctx.lineWidth = 0.8;
      for (let fila = -12; fila <= 14; fila += 4) {
        ctx.beginPath();
        ctx.moveTo(-22, fila);
        for (let x = -20; x <= 20; x += 2) {
          ctx.lineTo(x, fila + Math.sin(x * 0.5 + fila * 0.3) * 2);
        }
        ctx.stroke();
      }
      // Valles más oscuros entre surcos
      ctx.strokeStyle = 'rgba(60, 40, 20, 0.3)';
      ctx.lineWidth = 1.5;
      for (let fila = -10; fila <= 14; fila += 4) {
        ctx.beginPath();
        ctx.moveTo(-22, fila + 2);
        for (let x = -20; x <= 20; x += 2) {
          ctx.lineTo(x, fila + 2 + Math.sin(x * 0.5 + fila * 0.3) * 2);
        }
        ctx.stroke();
      }
      ctx.restore();

      // Brillo especular
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.ellipse(-5, -4, 10, 6, -0.3, 0, Math.PI * 2);
      ctx.fill();

    } else if (tipo === 'coralCuerno' || tipo === 'coralCuerno de Alce') {
      // Coral cuerno de alce — ramas que salen de una base
      // Base
      ctx.fillStyle = '#8B6914';
      ctx.fillRect(-4, 8, 8, 8);

      // Ramas (5 ramas de tonos dorados/ocre)
      const ramas = [
        { x: 0, ang: -Math.PI / 2, largo: 22, color: '#CD853F' },
        { x: -3, ang: -Math.PI / 2 - 0.4, largo: 18, color: '#DEB887' },
        { x: 3, ang: -Math.PI / 2 + 0.4, largo: 18, color: '#DEB887' },
        { x: -6, ang: -Math.PI / 2 - 0.7, largo: 14, color: '#D2B48C' },
        { x: 6, ang: -Math.PI / 2 + 0.7, largo: 14, color: '#D2B48C' }
      ];
      for (const r of ramas) {
        const ex = r.x + Math.cos(r.ang) * r.largo;
        const ey = 8 + Math.sin(r.ang) * r.largo;
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(r.x, 8);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        // Puntas bifurcadas
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(ex - 3, ey - 4);
        ctx.moveTo(ex, ey);
        ctx.lineTo(ex + 3, ey - 3);
        ctx.stroke();
      }

    } else if (tipo === 'coralAbanico') {
      // Coral abanico (gorgonia) — abanico con red de venación
      // Tallo leñoso
      ctx.strokeStyle = '#5a3a1a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 16);
      ctx.lineTo(0, 4);
      ctx.stroke();

      // Abanico: gradiente púrpura→rosa
      const gradAb = ctx.createRadialGradient(0, -4, 2, 0, -4, 20);
      gradAb.addColorStop(0, '#CC4488');
      gradAb.addColorStop(0.5, '#9933CC');
      gradAb.addColorStop(1, '#662288');
      ctx.fillStyle = gradAb;
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.bezierCurveTo(-22, -4, -20, -22, 0, -20);
      ctx.bezierCurveTo(20, -22, 22, -4, 0, 4);
      ctx.fill();

      // Red de venación (venas radiales)
      ctx.strokeStyle = 'rgba(255, 200, 230, 0.5)';
      ctx.lineWidth = 0.6;
      for (let i = 0; i < 7; i++) {
        const ang = -Math.PI / 2 + (i - 3) * 0.35;
        ctx.beginPath();
        ctx.moveTo(0, 4);
        ctx.quadraticCurveTo(
          Math.cos(ang) * 10, Math.sin(ang) * 10,
          Math.cos(ang) * 18, Math.sin(ang) * 18 + 2
        );
        ctx.stroke();
      }
      // Arcos concéntricos
      ctx.strokeStyle = 'rgba(255, 180, 220, 0.3)';
      for (let r = 6; r <= 16; r += 5) {
        ctx.beginPath();
        ctx.arc(0, -4, r, Math.PI * 0.7, Math.PI * 0.3, true);
        ctx.stroke();
      }

    } else if (tipo === 'coralMesa') {
      // Coral de mesa — tronco con plataforma plana arriba
      // Tronco
      ctx.fillStyle = '#8B7355';
      ctx.fillRect(-3, 0, 6, 14);

      // Plataforma — elipse marrón claro
      const gradMesa = ctx.createRadialGradient(-2, -3, 2, 0, -2, 20);
      gradMesa.addColorStop(0, '#DEB887');
      gradMesa.addColorStop(1, '#A0845C');
      ctx.fillStyle = gradMesa;
      ctx.beginPath();
      ctx.ellipse(0, -2, 22, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Textura radial de la mesa
      ctx.strokeStyle = 'rgba(100, 70, 40, 0.3)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 8; i++) {
        const ang = i * Math.PI / 4;
        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.lineTo(Math.cos(ang) * 18, -2 + Math.sin(ang) * 6);
        ctx.stroke();
      }
      // Borde más oscuro
      ctx.strokeStyle = '#6B5A3A';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, -2, 22, 8, 0, 0, Math.PI * 2);
      ctx.stroke();

    } else {
      // Coral genérico — arbusto redondeado
      ctx.fillStyle = '#CC6644';
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#884422';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 14, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  // --- RENDERIZAR TORTUGA ---
  // Dibuja el sprite de una tortuga marina centrado en (cx, cy).
  // Cada especie tiene colores y rasgos únicos (carey, tinglar, caguama, verde).
  _renderizarTortuga(ctx, entidad, cx, cy, escala) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(escala, escala);

    const id = entidad.id || '';
    // Dimensiones base de la tortuga para el retrato (siempre mirando a la derecha)
    const w = 20; // Medio ancho del caparazón
    const h = 14; // Medio alto del caparazón

    if (id === 'tortugaCarey') {
      // Caparazón oliva con rayas carey
      ctx.fillStyle = '#6B8E23';
      ctx.beginPath();
      ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2);
      ctx.fill();
      // Patrón del caparazón (rayas verticales)
      ctx.strokeStyle = '#8B6914';
      ctx.lineWidth = 0.8;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 5, -h + 3);
        ctx.lineTo(i * 5, h - 3);
        ctx.stroke();
      }
      // Cabeza
      ctx.fillStyle = '#556B2F';
      ctx.beginPath();
      ctx.arc(w + 5, 0, 6, 0, Math.PI * 2);
      ctx.fill();
      // Ojo
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(w + 7, -1, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Aletas
      ctx.fillStyle = '#556B2F';
      ctx.fillRect(w - 2, -h + 2, 6, 4);
      ctx.fillRect(-w - 4, -h + 2, 6, 4);
      ctx.fillRect(w - 2, h - 6, 6, 4);
      ctx.fillRect(-w - 4, h - 6, 6, 4);

    } else if (id === 'tortugaTinglar') {
      // Caparazón azul-negro oscuro con crestas
      ctx.fillStyle = '#1a1a2e';
      ctx.beginPath();
      ctx.ellipse(0, 0, w + 2, h + 2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Crestas longitudinales
      ctx.strokeStyle = '#3d3d5c';
      ctx.lineWidth = 1.2;
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 3, -h);
        ctx.lineTo(i * 3, h);
        ctx.stroke();
      }
      // Manchas claras
      ctx.fillStyle = '#E8E8E8';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(Math.sin(i * 2.3) * 10, Math.cos(i * 1.7) * 8, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      // Cabeza
      ctx.fillStyle = '#4a5568';
      ctx.beginPath();
      ctx.arc(w + 8, 0, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(w + 11, -1, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Aletas grandes
      ctx.fillStyle = '#4a5568';
      ctx.fillRect(w, -h + 1, 8, 5);
      ctx.fillRect(-w - 6, -h + 1, 8, 5);
      ctx.fillRect(w, h - 5, 8, 5);
      ctx.fillRect(-w - 6, h - 5, 8, 5);

    } else if (id === 'tortugaCaguama') {
      // Caparazón marrón rojizo con marca de corazón
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2);
      ctx.fill();
      // Marca corazón
      ctx.strokeStyle = '#D2691E';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.bezierCurveTo(-7, -2, -7, -7, 0, -4);
      ctx.bezierCurveTo(7, -7, 7, -2, 0, 5);
      ctx.stroke();
      // Cruz central
      ctx.strokeStyle = '#5a3520';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(-w + 5, 0);
      ctx.lineTo(w - 5, 0);
      ctx.moveTo(0, -h + 4);
      ctx.lineTo(0, h - 4);
      ctx.stroke();
      // Cabeza grande (mandíbulas poderosas)
      ctx.fillStyle = '#8B7355';
      ctx.beginPath();
      ctx.arc(w + 5, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(w + 8, -1, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Aletas
      ctx.fillStyle = '#8B7355';
      ctx.fillRect(w - 2, -h + 2, 6, 4);
      ctx.fillRect(-w - 4, -h + 2, 6, 4);
      ctx.fillRect(w - 2, h - 6, 6, 4);
      ctx.fillRect(-w - 4, h - 6, 6, 4);

    } else {
      // Tortuga verde u otra — verde oliva genérica
      ctx.fillStyle = '#4A7A3A';
      ctx.beginPath();
      ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2);
      ctx.fill();
      // Líneas del caparazón
      ctx.strokeStyle = '#2a5a1a';
      ctx.lineWidth = 0.8;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 5, -h + 3);
        ctx.lineTo(i * 5, h - 3);
        ctx.stroke();
      }
      // Manchitas
      ctx.fillStyle = '#3a6a2a';
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(Math.sin(i * 2) * 8, Math.cos(i * 2.5) * 6, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      // Cabeza
      ctx.fillStyle = '#3a6a2a';
      ctx.beginPath();
      ctx.arc(w + 5, 0, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(w + 7, -1, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Aletas
      ctx.fillStyle = '#3a6a2a';
      ctx.fillRect(w - 2, -h + 2, 6, 4);
      ctx.fillRect(-w - 4, -h + 2, 6, 4);
      ctx.fillRect(w - 2, h - 6, 6, 4);
      ctx.fillRect(-w - 4, h - 6, 6, 4);
    }

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
  // Fondo oscuro neutro con viñeta sutil. Igual para todos los tipos
  // de entidad. Esto evita que el fondo se confunda con una captura
  // de pantalla del juego.
  _renderizarFondo(ctx, ancho, alto) {
    // Fondo base gris oscuro
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, ancho, alto);

    // Viñeta radial sutil (centro un poco más claro)
    const gradiente = ctx.createRadialGradient(
      ancho / 2, alto / 2, 10,
      ancho / 2, alto / 2, Math.max(ancho, alto) * 0.7
    );
    gradiente.addColorStop(0, 'rgba(60, 60, 80, 0.5)');
    gradiente.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, ancho, alto);
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
