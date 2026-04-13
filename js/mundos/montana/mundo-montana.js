// ============================================================
// MUNDO-MONTANA.JS - Palenque de Lemba (Mundo de Montaña)
// ============================================================
// Comunidad cimarrona fundada por Sebastián Lemba Calembo en
// las montañas del interior de La Hispaniola (~1540s).
//
// Lemba lideró una de las primeras rebeliones de esclavizados
// en las Américas. Los cimarrones escaparon a las montañas y
// establecieron comunidades libres llamadas "palenques".
//
// MODO: Top-down (vista desde arriba, sin gravedad)
// ENTRADA: Nodo 9 en el mapa, entre Asentamiento Taíno I y II
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';

export class MundoMontana {

  constructor() {
    // --- Dimensiones del nivel ---
    this.anchoNivel = 1400;
    this.altoNivel = 1000;

    // --- Cámara ---
    this.camaraX = 0;
    this.camaraY = 0;

    // --- Estructuras (chozas con colisión) ---
    this.estructuras = [];

    // --- NPCs ---
    this.npcs = [];

    // --- Objetos coleccionables ---
    this.objetos = [];

    // --- Diálogos ---
    this.dialogos = new SistemaDialogos();

    // --- Sonidos ---
    this.sfx = new SonidoProcedural();

    // --- Árboles de montaña ---
    this.arboles = [];

    // --- Rocas decorativas ---
    this.rocas = [];

    // --- Bloqueo de entrada ---
    this.bloqueoEntrada = true;

    // --- Tiempo total ---
    this.tiempoTotal = 0;

    // --- Misión ---
    this.misionActual = '';
    this.npcsHablados = 0;
    this.totalNPCs = 4; // Kofi, Amara, Yemayá, Marcos (Lemba es mentor)

    // --- Combate ---
    this.combateIniciado = false;
    this.combateTerminado = false;

    // --- Diálogo rotativo de Lemba ---
    this._lembaConversacion = 0;

    // --- Referencia al juego ---
    this.juego = null;
  }

  iniciar(juego) {
    this.juego = juego;
    this.bloqueoEntrada = true;
    this.tiempoTotal = 0;

    // Configurar jugador para vista top-down
    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';
      juego.jugador.x = 700;
      juego.jugador.y = 900;
      juego.jugador.velocidadX = 0;
      juego.jugador.velocidadY = 0;
    }

    // Toast de bienvenida
    const textos = this._obtenerTextos();
    if (juego.mostrarToast) {
      juego.mostrarToast('⛰️ ' + (textos?.ui?.palenqueBienvenida || 'Palenque de Lemba — Comunidad Cimarrona'), 3);
    }

    // --- Estructuras del palenque ---
    this.estructuras = [
      { x: 660, y: 160, ancho: 80, alto: 80, tipo: 'chozaLider', nombre: 'Choza del Líder' },
      { x: 260, y: 260, ancho: 70, alto: 70, tipo: 'chozaForja', nombre: 'Choza de la Forja' },
      { x: 960, y: 310, ancho: 70, alto: 70, tipo: 'chozaTambores', nombre: 'Círculo de Tambores' },
      { x: 410, y: 460, ancho: 65, alto: 65, tipo: 'chozaSanacion', nombre: 'Choza de Sanación' },
      { x: 1100, y: 120, ancho: 50, alto: 60, tipo: 'atalaya', nombre: 'Atalaya del Vigía' }
    ];

    // --- NPCs del palenque ---
    const mt = textos?.dialogos?.montana;
    this.npcs = [
      // Lemba Calembo — mentor, líder del palenque
      {
        id: 'lemba', x: 700, y: 280, ancho: 28, alto: 36,
        nombre: mt?.lembaNombre || 'Sebastián Lemba',
        color: '#8B4513',
        dialogoHecho: false, esMentor: true, esQuestGiver: false
      },
      // Kofi — herrero, da el Machete Cimarrón
      {
        id: 'herrero', x: 350, y: 350, ancho: 28, alto: 36,
        nombre: mt?.herreroNombre || 'Kofi',
        color: '#4a4a4a',
        dialogoHecho: false, esMentor: false, esQuestGiver: false
      },
      // Amara — tamborera, da el Tambor de Guerra
      {
        id: 'tambora', x: 1050, y: 400, ancho: 28, alto: 36,
        nombre: mt?.tamboraNombre || 'Amara',
        color: '#8B0000',
        dialogoHecho: false, esMentor: false, esQuestGiver: false
      },
      // Yemayá — curandera, cura al jugador
      {
        id: 'curandera', x: 500, y: 550, ancho: 28, alto: 36,
        nombre: mt?.curanderaNombre || 'Yemayá',
        color: '#2E8B57',
        dialogoHecho: false, esMentor: false, esQuestGiver: false,
        esCurandero: true
      },
      // Marcos — vigía, desata el combate
      {
        id: 'vigia', x: 1100, y: 220, ancho: 28, alto: 36,
        nombre: mt?.vigiaNombre || 'Marcos',
        color: '#556B2F',
        dialogoHecho: false, esMentor: false, esQuestGiver: false,
        esCombate: true
      }
    ];

    // --- Objeto coleccionable en el centro ---
    this.objetos = [
      { x: 700, y: 500, tipo: 'pergaminoLibertad', recogido: false }
    ];

    // --- Árboles de montaña (pinos, más oscuros) ---
    this.arboles = [];
    const posArboles = [
      [100, 150], [200, 600], [50, 400], [1300, 200], [1250, 500],
      [150, 800], [900, 150], [1350, 700], [50, 900], [1300, 850],
      [800, 700], [400, 800], [600, 750], [1100, 600]
    ];
    for (const [ax, ay] of posArboles) {
      this.arboles.push({ x: ax, y: ay, alto: 30 + Math.random() * 20 });
    }

    // --- Rocas decorativas ---
    this.rocas = [
      { x: 500, y: 200, radio: 15 },
      { x: 900, y: 500, radio: 12 },
      { x: 300, y: 700, radio: 18 },
      { x: 1200, y: 400, radio: 14 },
      { x: 800, y: 850, radio: 16 }
    ];

    // Restaurar estado del combate
    if (juego.progreso && juego.progreso.nodosCompletados?.includes(9)) {
      this.combateTerminado = true;
      const vigia = this.npcs.find(n => n.id === 'vigia');
      if (vigia) { vigia.esCombate = false; vigia.dialogoHecho = true; }
    }

    // Misión
    this.misionActual = mt?.misionHablar || 'Explora el palenque y habla con los cimarrones';
  }

  // ============================================================
  // ACTUALIZAR
  // ============================================================

  actualizar(dt, entrada, jugador, companeros) {
    if (!jugador) return;
    this.tiempoTotal += dt;

    // Diálogo activo consume la entrada
    if (this.dialogos.estaActivo()) {
      this.dialogos.actualizar(dt);
      if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
        this.dialogos.avanzar();
        this.sfx.dialogo();
        this.bloqueoEntrada = true;
      }
      if (!entrada.estaPresionada('accion')) this.bloqueoEntrada = false;
      return;
    }

    // --- Movimiento top-down ---
    jugador.velocidadX = 0;
    jugador.velocidadY = 0;
    jugador.esAnimando = false;

    if (entrada.estaPresionada('izquierda')) { jugador.velocidadX = -VELOCIDAD_JUGADOR; jugador.esAnimando = true; }
    if (entrada.estaPresionada('derecha'))   { jugador.velocidadX = VELOCIDAD_JUGADOR; jugador.esAnimando = true; }
    if (entrada.estaPresionada('arriba'))    { jugador.velocidadY = -VELOCIDAD_JUGADOR; jugador.esAnimando = true; }
    if (entrada.estaPresionada('abajo'))     { jugador.velocidadY = VELOCIDAD_JUGADOR; jugador.esAnimando = true; }

    const factorTiempo = dt * 60;
    jugador.x += jugador.velocidadX * factorTiempo;
    jugador.y += jugador.velocidadY * factorTiempo;

    if (jugador.esAnimando) {
      jugador.cuadroAnimacion = (jugador.cuadroAnimacion || 0) + dt * 8;
    }

    // --- Colisión con estructuras ---
    for (const est of this.estructuras) {
      if (jugador.x + jugador.ancho > est.x && jugador.x < est.x + est.ancho &&
          jugador.y + jugador.alto > est.y && jugador.y < est.y + est.alto) {
        const solapeDer = (jugador.x + jugador.ancho) - est.x;
        const solapeIzq = (est.x + est.ancho) - jugador.x;
        const solapeAbajo = (jugador.y + jugador.alto) - est.y;
        const solapeArriba = (est.y + est.alto) - jugador.y;
        const minSolape = Math.min(solapeDer, solapeIzq, solapeAbajo, solapeArriba);
        if (minSolape === solapeDer) jugador.x = est.x - jugador.ancho;
        else if (minSolape === solapeIzq) jugador.x = est.x + est.ancho;
        else if (minSolape === solapeAbajo) jugador.y = est.y - jugador.alto;
        else jugador.y = est.y + est.alto;
      }
    }

    // Limitar jugador al nivel
    jugador.x = Math.max(0, Math.min(this.anchoNivel - jugador.ancho, jugador.x));
    jugador.y = Math.max(0, Math.min(this.altoNivel - jugador.alto, jugador.y));

    // --- Verificar resultado de combate ---
    if (this.combateIniciado && !this.combateTerminado && this.juego.combate.resultado) {
      this.combateTerminado = true;
      const vigia = this.npcs.find(n => n.id === 'vigia');
      if (vigia) { vigia.esCombate = false; vigia.dialogoHecho = true; }

      if (this.juego.combate.resultado === 'pacificado') {
        this.juego.progreso.combatesPacificados++;
        if (this.juego.reputacion) this.juego.reputacion.modificar(15, 'Victoria pacífica');
      } else if (this.juego.combate.resultado === 'victoria') {
        this.juego.progreso.combatesViolentos++;
        if (this.juego.reputacion) this.juego.reputacion.modificar(5, 'Victoria en combate');
      }

      const textos = this._obtenerTextos();
      const mt = textos?.dialogos?.montana;
      if (this.juego.combate.resultado === 'pacificado') {
        this.dialogos.iniciarDialogo([
          { personaje: '👁 Marcos', texto: mt?.vigilaPaz || 'El soldado entendió que no puede encadenar a quien nació libre.' }
        ]);
      } else {
        this.dialogos.iniciarDialogo([
          { personaje: '👁 Marcos', texto: mt?.vigiaVictoria || 'El cazador ha huido. ¡Nuestra montaña sigue siendo libre!' }
        ]);
      }
      this._verificarMisionCompleta();
    }

    // --- Recoger objetos ---
    for (const obj of this.objetos) {
      if (obj.recogido) continue;
      if (this._estaCerca(jugador, obj, 25)) {
        obj.recogido = true;
        this.sfx.recoger();
        const textos = this._obtenerTextos();
        const objTextos = textos?.objetos || {};
        let nombreObjeto = objTextos?.[obj.tipo] || obj.tipo;
        jugador.agregarAlInventario({ nombre: obj.tipo });
        if (this.juego?.inventario) {
          this.juego.inventario.agregar({
            id: obj.tipo, nombre: nombreObjeto,
            descripcion: objTextos?.[`desc${obj.tipo.charAt(0).toUpperCase() + obj.tipo.slice(1)}`] || '',
            tipo: 'clave', cantidad: 1, color: '#DAA520', esUsable: false
          });
        }
        if (this.juego?.mostrarToast) {
          this.juego.mostrarToast(`✦ ${nombreObjeto} — ${textos?.ui?.itemAnadido || 'ítem añadido al inventario'}`);
        }
      }
    }

    // --- Interacción con NPCs ---
    if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      for (const npc of this.npcs) {
        if (this._estaCerca(jugador, npc, 45) && (!npc.dialogoHecho || npc.esMentor || npc.esCurandero)) {
          this._hablarConNPC(npc);
          this.bloqueoEntrada = true;
          break;
        }
      }
    }

    if (!entrada.estaPresionada('accion') && !entrada.estaPresionada('mapa')) {
      this.bloqueoEntrada = false;
    }

    // --- Volver al mapa con M ---
    if (entrada.estaPresionada('mapa') && !this.bloqueoEntrada) {
      if (this.juego?.cambiarEscena) this.juego.cambiarEscena('mapaPrincipal');
      this.bloqueoEntrada = true;
      return;
    }

    // Salir por borde inferior (jugador.y está clampeado a altoNivel - alto)
    if (jugador.y >= this.altoNivel - jugador.alto - 5 && this.juego) {
      this.juego.cambiarEscena('mapaPrincipal');
    }

    // Contar NPCs hablados (excluyendo mentor y curandero re-interacciones)
    this.npcsHablados = this.npcs.filter(n => n.dialogoHecho && !n.esMentor).length;
  }

  // ============================================================
  // DIBUJO
  // ============================================================

  dibujar(renderizador, ancho, alto, textos, jugador, companeros) {
    const ctx = renderizador.ctx;

    // Cámara
    if (jugador) {
      this.camaraX += (jugador.x - ancho / 2 - this.camaraX) * 0.08;
      this.camaraY += (jugador.y - alto / 2 - this.camaraY) * 0.08;
    }
    this.camaraX = Math.max(0, Math.min(this.anchoNivel - ancho, this.camaraX));
    this.camaraY = Math.max(0, Math.min(this.altoNivel - alto, this.camaraY));
    const offsetX = -this.camaraX;
    const offsetY = -this.camaraY;

    // --- Fondo de montaña (verde oscuro) ---
    ctx.fillStyle = '#4a5a3a';
    ctx.fillRect(0, 0, ancho, alto);

    // Terreno rocoso (textura)
    ctx.fillStyle = '#5a6b4a';
    for (let tx = 0; tx < this.anchoNivel; tx += 80) {
      for (let ty = 0; ty < this.altoNivel; ty += 80) {
        const px = tx + offsetX;
        const py = ty + offsetY;
        if (px > -80 && px < ancho + 80 && py > -80 && py < alto + 80) {
          ctx.fillRect(px + 10, py + 10, 60, 60);
        }
      }
    }

    // --- Montañas de fondo (parte superior) ---
    ctx.fillStyle = '#3a4a2a';
    const montanas = [[200, 80, 150], [500, 60, 180], [900, 70, 160], [1200, 85, 140]];
    for (const [mx, my, mw] of montanas) {
      ctx.beginPath();
      ctx.moveTo(mx - mw / 2 + offsetX, my + 50 + offsetY);
      ctx.lineTo(mx + offsetX, my - 50 + offsetY);
      ctx.lineTo(mx + mw / 2 + offsetX, my + 50 + offsetY);
      ctx.closePath();
      ctx.fill();
      // Cima rocosa (sin nieve — estamos en el Caribe)
      ctx.fillStyle = '#5a5a4a';
      ctx.beginPath();
      ctx.moveTo(mx - 12 + offsetX, my - 30 + offsetY);
      ctx.lineTo(mx + offsetX, my - 50 + offsetY);
      ctx.lineTo(mx + 12 + offsetX, my - 30 + offsetY);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#3a4a2a';
    }

    // --- Senderos de tierra (conectan las chozas) ---
    ctx.fillStyle = '#6B5335';
    // Sendero central vertical
    ctx.fillRect(690 + offsetX, 240 + offsetY, 20, 300);
    // Senderos horizontales a chozas
    ctx.fillRect(330 + offsetX, 290 + offsetY, 370, 15);
    ctx.fillRect(700 + offsetX, 360 + offsetY, 310, 15);
    ctx.fillRect(470 + offsetX, 500 + offsetY, 240, 15);

    // --- Hoguera central ---
    const hogueraX = 700 + offsetX;
    const hogueraY = 480 + offsetY;
    // Piedras del círculo
    ctx.fillStyle = '#555555';
    for (let i = 0; i < 8; i++) {
      const angulo = (i / 8) * Math.PI * 2;
      ctx.fillRect(hogueraX + Math.cos(angulo) * 20 - 3, hogueraY + Math.sin(angulo) * 20 - 3, 6, 6);
    }
    // Fuego animado
    const llama = Math.sin(this.tiempoTotal * 8) * 3;
    ctx.fillStyle = '#FF6600';
    ctx.beginPath();
    ctx.ellipse(hogueraX, hogueraY - 5 + llama, 8, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFAA00';
    ctx.beginPath();
    ctx.ellipse(hogueraX, hogueraY - 3 + llama, 5, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFDD44';
    ctx.beginPath();
    ctx.ellipse(hogueraX, hogueraY - 1 + llama, 2, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- Rocas decorativas ---
    ctx.fillStyle = '#666666';
    for (const roca of this.rocas) {
      ctx.beginPath();
      ctx.arc(roca.x + offsetX, roca.y + offsetY, roca.radio, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#777777';
      ctx.beginPath();
      ctx.arc(roca.x + offsetX - 2, roca.y + offsetY - 2, roca.radio * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#666666';
    }

    // --- Estructuras ---
    for (const est of this.estructuras) {
      this._dibujarEstructura(ctx, est, offsetX, offsetY);
    }

    // --- Árboles detrás del jugador ---
    for (const arbol of this.arboles) {
      if (!jugador || arbol.y < jugador.y) {
        this._dibujarPino(ctx, arbol.x + offsetX, arbol.y + offsetY, arbol.alto);
      }
    }

    // --- Entidades ordenadas por Y ---
    const entidades = [];
    for (const npc of this.npcs) {
      entidades.push({ tipo: 'npc', datos: npc, y: npc.y });
    }
    if (jugador) {
      entidades.push({ tipo: 'jugador', datos: jugador, y: jugador.y });
    }
    if (companeros) {
      for (const comp of companeros) {
        if (comp.activo) entidades.push({ tipo: 'companero', datos: comp, y: comp.y });
      }
    }
    entidades.sort((a, b) => a.y - b.y);

    for (const ent of entidades) {
      if (ent.tipo === 'npc') {
        this._dibujarNPC(ctx, ent.datos, jugador, offsetX, offsetY);
      } else if (ent.tipo === 'jugador') {
        this._dibujarJugador(ctx, jugador, offsetX, offsetY);
      } else if (ent.tipo === 'companero') {
        ctx.save();
        ctx.translate(offsetX, offsetY);
        ent.datos.dibujar(ctx);
        ctx.restore();
      }
    }

    // --- Árboles delante del jugador ---
    for (const arbol of this.arboles) {
      if (jugador && arbol.y >= jugador.y) {
        this._dibujarPino(ctx, arbol.x + offsetX, arbol.y + offsetY, arbol.alto);
      }
    }

    // --- Objetos ---
    for (const obj of this.objetos) {
      if (obj.recogido) continue;
      const ox = obj.x + offsetX;
      const oy = obj.y + offsetY;
      const brillo = 0.5 + Math.sin(this.tiempoTotal * 3) * 0.3;
      ctx.fillStyle = `rgba(218, 165, 32, ${brillo})`;
      ctx.beginPath();
      ctx.arc(ox + 8, oy + 8, 12, 0, Math.PI * 2);
      ctx.fill();
      // Pergamino
      ctx.fillStyle = '#F5DEB3';
      ctx.fillRect(ox + 2, oy + 3, 12, 10);
      ctx.fillStyle = '#8B7355';
      ctx.fillRect(ox + 4, oy + 5, 8, 1);
      ctx.fillRect(ox + 4, oy + 8, 6, 1);
    }

    // --- HUD ---
    const _t = this._obtenerTextos();
    const _ui = _t?.ui;

    // Vida
    ctx.fillStyle = '#333333';
    ctx.fillRect(10, 10, 120, 14);
    ctx.fillStyle = '#44cc44';
    ctx.fillRect(10, 10, 120 * ((jugador?.vida || 100) / (jugador?.vidaMaxima || 100)), 14);
    ctx.strokeStyle = '#555555';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, 120, 14);
    ctx.font = '10px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.fillText(`❤ ${Math.floor(jugador?.vida || 0)}/${jugador?.vidaMaxima || 100}`, 15, 22);

    // Misión
    ctx.font = '12px monospace';
    ctx.fillStyle = '#FFD700';
    ctx.fillText(`📋 ${this.misionActual}`, 15, 42);

    // NPCs hablados
    ctx.fillStyle = this.npcsHablados >= this.totalNPCs ? '#44CC44' : '#FFD700';
    ctx.fillText(`👥 ${this.npcsHablados}/${this.totalNPCs}`, 15, 58);

    // Regalos recibidos
    const regalos = this._contarRegalos();
    ctx.fillStyle = regalos.recibidos >= regalos.total ? '#44CC44' : '#FFD700';
    ctx.fillText(`🎁 ${regalos.recibidos}/${regalos.total}`, 15, 74);

    // Nombre del lugar
    ctx.font = '11px monospace';
    ctx.fillStyle = '#AAAAAA';
    ctx.textAlign = 'center';
    ctx.fillText(_t?.dialogos?.montana?.nombreLugar || '⛰️ Palenque de Lemba', ancho / 2, alto - 40);
    ctx.fillStyle = '#888888';
    ctx.fillText(_ui?.controlespalenque || 'WASD: mover | E: hablar | M: mapa | I: inventario', ancho / 2, alto - 15);
    ctx.textAlign = 'left';

    // Diálogos
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto, _t);
    }
  }

  // ============================================================
  // DIBUJO DE ELEMENTOS
  // ============================================================

  _dibujarEstructura(ctx, est, offsetX, offsetY) {
    const ex = est.x + offsetX;
    const ey = est.y + offsetY;

    if (est.tipo === 'atalaya') {
      // Atalaya rectangular con plataforma
      ctx.fillStyle = '#5a3a1a';
      ctx.fillRect(ex + 15, ey, 20, 60);
      ctx.fillStyle = '#6B4226';
      ctx.fillRect(ex, ey - 5, 50, 15);
      ctx.fillStyle = '#8a6a3a';
      ctx.fillRect(ex + 5, ey - 10, 40, 8);
    } else {
      // Chozas circulares africanas
      // Base circular
      ctx.fillStyle = '#6B4226';
      ctx.beginPath();
      ctx.ellipse(ex + est.ancho / 2, ey + est.alto / 2, est.ancho / 2, est.alto / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Paredes con patrón de cruz
      ctx.strokeStyle = '#8a6a3a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ex + est.ancho / 2, ey + 5);
      ctx.lineTo(ex + est.ancho / 2, ey + est.alto - 5);
      ctx.moveTo(ex + 5, ey + est.alto / 2);
      ctx.lineTo(ex + est.ancho - 5, ey + est.alto / 2);
      ctx.stroke();
      // Techo cónico (triángulo oscuro)
      ctx.fillStyle = '#7a5a3e';
      ctx.beginPath();
      ctx.moveTo(ex + est.ancho / 2, ey - 15);
      ctx.lineTo(ex - 5, ey + est.alto / 3);
      ctx.lineTo(ex + est.ancho + 5, ey + est.alto / 3);
      ctx.closePath();
      ctx.fill();
    }

    // Etiqueta
    const textos = this._obtenerTextos();
    ctx.font = '9px monospace';
    ctx.fillStyle = '#CCCCAA';
    ctx.textAlign = 'center';
    ctx.fillText(textos?.lugares?.[est.tipo] || est.nombre, ex + est.ancho / 2, ey + est.alto + 14);
    ctx.textAlign = 'left';
  }

  _dibujarPino(ctx, x, y, alto) {
    // Tronco
    ctx.fillStyle = '#4a3520';
    ctx.fillRect(x - 2, y - alto * 0.3, 4, alto * 0.4);
    // Copa cónica (3 niveles)
    ctx.fillStyle = '#2a5a2a';
    for (let i = 0; i < 3; i++) {
      const w = 18 - i * 4;
      const cy = y - alto * 0.3 - i * (alto * 0.2);
      ctx.beginPath();
      ctx.moveTo(x, cy - alto * 0.25);
      ctx.lineTo(x - w, cy);
      ctx.lineTo(x + w, cy);
      ctx.closePath();
      ctx.fill();
    }
  }

  _dibujarNPC(ctx, npc, jugador, offsetX, offsetY) {
    const nx = npc.x + offsetX;
    const ny = npc.y + offsetY;
    const esCerca = jugador && this._estaCerca(jugador, npc, 45);

    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(nx + npc.ancho / 2, ny + npc.alto + 2, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cuerpo
    ctx.fillStyle = npc.color;
    ctx.fillRect(nx + 4, ny + 10, 20, 16);

    // Cabeza (piel oscura para personajes africanos, excepto Marcos que es mestizo)
    ctx.fillStyle = npc.id === 'vigia' ? '#C68642' : '#8B5E3C';
    ctx.fillRect(nx + 6, ny, 16, 14);

    // Pelo
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(nx + 5, ny - 2, 18, 5);

    // Ojos
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(nx + 9, ny + 4, 3, 3);
    ctx.fillRect(nx + 16, ny + 4, 3, 3);
    ctx.fillStyle = '#000000';
    ctx.fillRect(nx + 10, ny + 5, 1.5, 1.5);
    ctx.fillRect(nx + 17, ny + 5, 1.5, 1.5);

    // Piernas
    ctx.fillStyle = '#2a3a5a';
    ctx.fillRect(nx + 6, ny + 26, 7, 8);
    ctx.fillRect(nx + 15, ny + 26, 7, 8);

    // Zapatos
    ctx.fillStyle = '#4a3520';
    ctx.fillRect(nx + 5, ny + 32, 8, 3);
    ctx.fillRect(nx + 15, ny + 32, 8, 3);

    // Indicador de interacción
    if (esCerca && (!npc.dialogoHecho || npc.esMentor || npc.esCurandero)) {
      const pulso = 0.7 + Math.sin(this.tiempoTotal * 3) * 0.3;
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(255, 215, 0, ${pulso})`;
      const textos = this._obtenerTextos();
      const texHablar = npc.esCurandero && npc.dialogoHecho
        ? (textos?.ui?.eCurar || '[E] Curar')
        : (textos?.ui?.eHablar || '[E] Hablar');
      ctx.fillText(texHablar, nx + npc.ancho / 2, ny - 4);
      ctx.textAlign = 'left';
    }

    // Checkmark
    if (npc.dialogoHecho && !npc.esMentor && !npc.esCurandero) {
      ctx.font = '14px monospace';
      ctx.fillStyle = '#44CC44';
      ctx.textAlign = 'center';
      ctx.fillText('✓', nx + npc.ancho / 2, ny - 4);
      ctx.textAlign = 'left';
    }

    // Nombre
    ctx.font = '10px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(npc.nombre, nx + npc.ancho / 2, ny + npc.alto + 16);
    ctx.textAlign = 'left';
  }

  // ============================================================
  // INTERACCIÓN CON NPCs
  // ============================================================

  _hablarConNPC(npc) {
    const textos = this._obtenerTextos();
    const mt = textos?.dialogos?.montana;
    const nombre = npc.nombre;

    if (npc.id === 'lemba') {
      this._hablarLemba(npc, mt);
    } else if (npc.id === 'herrero') {
      this._hablarHerrero(npc, mt);
    } else if (npc.id === 'tambora') {
      this._hablarTambora(npc, mt);
    } else if (npc.id === 'curandera') {
      this._hablarCurandera(npc, mt);
    } else if (npc.id === 'vigia') {
      this._hablarVigia(npc, mt);
    }
  }

  // --- Lemba: mentor con diálogo rotativo ---
  _hablarLemba(npc, mt) {
    const nombre = '⛰️ ' + npc.nombre;
    const conversaciones = [
      [{ personaje: nombre, texto: mt?.lemba1 || 'Soy Sebastián Lemba. Escapé de las cadenas y fundé este palenque en las montañas.' }],
      [{ personaje: nombre, texto: mt?.lemba2 || 'En los años 1540, lideramos la primera rebelión de esclavizados en las Américas.' }],
      [{ personaje: nombre, texto: mt?.lemba3 || 'Los cimarrones vivimos libres. Estas montañas son nuestro refugio y nuestra fortaleza.' }],
      [{ personaje: nombre, texto: mt?.lemba4 || 'Trajimos nuestra cultura africana — nuestros ritmos, nuestra medicina, nuestra forja.' }],
      [{ personaje: nombre, texto: mt?.lemba5 || 'Las comunidades cimarronas dejaron una huella profunda en la cultura dominicana de hoy.' }]
    ];
    const indice = this._lembaConversacion % conversaciones.length;
    this.dialogos.iniciarDialogo(conversaciones[indice], () => {
      this._lembaConversacion++;
    });
  }

  // --- Kofi: herrero, da el Machete Cimarrón ---
  _hablarHerrero(npc, mt) {
    const nombre = '🔨 ' + npc.nombre;
    if (npc.dialogoHecho) {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: mt?.herreroSaludo || '¡El fuego de la forja nunca se apaga, como nuestra lucha por la libertad!' }
      ]);
      return;
    }
    this.dialogos.iniciarDialogo([
      { personaje: nombre, texto: mt?.herrero1 || 'Soy Kofi, herrero de este palenque. Forjo herramientas con el arte de mis ancestros de África occidental.' },
      { personaje: nombre, texto: mt?.herrero2 || 'En mi tierra, los herreros éramos respetados como guardianes del fuego sagrado.' },
      { personaje: nombre, texto: mt?.herrero3 || 'Con este machete defendemos nuestra libertad. Tómalo — te servirá en tu camino.' }
    ], () => {
      npc.dialogoHecho = true;
      this._darArtefactoAfricano('macheteCimarron');
      this._verificarMisionCompleta();
    });
  }

  // --- Amara: tamborera, da el Tambor de Guerra ---
  _hablarTambora(npc, mt) {
    const nombre = '🥁 ' + npc.nombre;
    if (npc.dialogoHecho) {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: mt?.tamboraSaludo || '¡Los tambores siguen sonando — la libertad nunca se calla!' }
      ]);
      return;
    }
    this.dialogos.iniciarDialogo([
      { personaje: nombre, texto: mt?.tambora1 || '¡Bienvenido al círculo de tambores! Soy Amara.' },
      { personaje: nombre, texto: mt?.tambora2 || 'Los tambores son nuestra voz. Con ellos transmitimos mensajes, celebramos y recordamos.' },
      { personaje: nombre, texto: mt?.tambora3 || 'Los palos y atabales que se tocan hoy en la República Dominicana vienen de nuestras tradiciones africanas.' },
      { personaje: nombre, texto: mt?.tambora4 || 'Este tambor de guerra nos protege. Llévalo contigo — su ritmo te dará fuerza.' }
    ], () => {
      npc.dialogoHecho = true;
      this._darArtefactoAfricano('tamborGuerra');
      this._verificarMisionCompleta();
    });
  }

  // --- Yemayá: curandera ---
  _hablarCurandera(npc, mt) {
    const nombre = '🌿 ' + npc.nombre;
    const jugador = this.juego?.jugador;
    if (npc.dialogoHecho && jugador && jugador.vida >= jugador.vidaMaxima) {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: mt?.curanderaSano || 'Te veo bien de salud. ¡Que la fuerza de los ancestros te proteja!' }
      ]);
      return;
    }
    if (npc.dialogoHecho) {
      // Curar de nuevo
      if (jugador) jugador.vida = jugador.vidaMaxima || 100;
      this.sfx.recoger();
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: mt?.curanderaCurar || '¡Listo! Las hierbas sagradas te han sanado.' }
      ]);
      return;
    }
    this.dialogos.iniciarDialogo([
      { personaje: nombre, texto: mt?.curandera1 || 'Soy Yemayá, curandera del palenque. Mi nombre honra a la diosa yoruba del mar.' },
      { personaje: nombre, texto: mt?.curandera2 || 'Mezclamos la medicina africana con las plantas que aprendimos de los taínos.' },
      { personaje: nombre, texto: mt?.curandera3 || 'La guanábana, el jengibre, la sábila — esta isla tiene todo lo que necesitamos para sanar.' },
      { personaje: nombre, texto: mt?.curandera4 || 'Déjame curarte con mis remedios. ¡Quedarás como nuevo!' }
    ], () => {
      npc.dialogoHecho = true;
      if (jugador) jugador.vida = jugador.vidaMaxima || 100;
      this.sfx.recoger();
      this._verificarMisionCompleta();
    });
  }

  // --- Marcos: vigía, desata el combate ---
  _hablarVigia(npc, mt) {
    const nombre = '👁 ' + npc.nombre;
    if (this.combateTerminado) {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: mt?.vigiaVictoria || 'El cazador ha huido. ¡Nuestra montaña sigue siendo libre!' }
      ]);
      return;
    }
    this.dialogos.iniciarDialogo([
      { personaje: nombre, texto: mt?.vigia1 || '¡Alto! Soy Marcos, el vigía del palenque.' },
      { personaje: nombre, texto: mt?.vigia2 || '¡Cuidado! Veo un cazador de cimarrones acercándose por el sendero.' },
      { personaje: nombre, texto: mt?.vigia3 || '¡Prepárate para defender nuestra libertad!' }
    ], () => {
      this.combateIniciado = true;
      if (this.juego?.combate) {
        this.juego.combate.iniciar({
          nombre: mt?.enemigoCazador || 'Cazador de Cimarrones',
          vida: 45, vidaMaxima: 45,
          fuerza: 3, velocidad: 2,
          hostilidad: 75,
          tipoSprite: 'soldado',
          // El cazador viene acompañado de un sabueso que ataca al jugador
          conPerro: true,
          mensajePerro: mt?.ataquePerro || '¡El sabueso del cazador te muerde!'
        }, this.juego);
      }
    });
  }

  // --- Dar artefacto africano al jugador ---
  _darArtefactoAfricano(tipo) {
    const textos = this._obtenerTextos();
    const objTextos = textos?.objetos || {};
    const jugador = this.juego?.jugador;

    if (jugador) jugador.agregarAlInventario({ nombre: tipo });
    if (this.juego?.inventario) {
      const capitalized = tipo.charAt(0).toUpperCase() + tipo.slice(1);
      this.juego.inventario.agregar({
        id: tipo,
        nombre: objTextos?.[tipo] || tipo,
        descripcion: objTextos?.[`desc${capitalized}`] || '',
        tipo: 'herramienta', cantidad: 1,
        color: tipo === 'macheteCimarron' ? '#888888' : '#8B4513',
        esUsable: false
      });
    }

    // Incrementar contador de artefactos africanos
    if (this.juego?.progreso) {
      this.juego.progreso.artefactosAfricanos = (this.juego.progreso.artefactosAfricanos || 0) + 1;
    }

    if (this.juego?.mostrarToast) {
      const nombre = objTextos?.[tipo] || tipo;
      this.juego.mostrarToast(`🗡️ ${nombre} — +2 ${textos?.ui?.danoEnCombate || 'daño en combate'}`);
    }
  }

  // --- Verificar si la misión está completa ---
  _verificarMisionCompleta() {
    const hablados = this.npcs.filter(n => n.dialogoHecho && !n.esMentor).length;
    if (hablados >= this.totalNPCs && this.combateTerminado) {
      const textos = this._obtenerTextos();
      const mt = textos?.dialogos?.montana;
      this.misionActual = mt?.misionCompleta || '¡Palenque explorado! Vuelve al mapa (M)';

      if (this.juego?.progreso) {
        if (!this.juego.progreso.nodosCompletados) this.juego.progreso.nodosCompletados = [];
        if (!this.juego.progreso.nodosCompletados.includes(9)) {
          this.juego.progreso.nodosCompletados.push(9);
        }
        if (!this.juego.progreso.nodosDesbloqueados) this.juego.progreso.nodosDesbloqueados = [];
        if (!this.juego.progreso.nodosDesbloqueados.includes(2)) {
          this.juego.progreso.nodosDesbloqueados.push(2);
        }
      }
    }
  }

  // --- Contar regalos recibidos (artefactos + curación) ---
  _contarRegalos() {
    const herrero = this.npcs.find(n => n.id === 'herrero');
    const tambora = this.npcs.find(n => n.id === 'tambora');
    const recibidos = (herrero?.dialogoHecho ? 1 : 0) + (tambora?.dialogoHecho ? 1 : 0);
    return { recibidos, total: 2 };
  }

  // --- Utilidades ---
  _dibujarJugador(ctx, jugador, offsetX, offsetY) {
    const px = jugador.x + offsetX;
    const py = jugador.y + offsetY;
    const genero = jugador.genero || 'pepito';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(px + jugador.ancho / 2, py + jugador.alto + 2, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = genero === 'pepito' ? '#4488ff' : '#aa44ff';
    ctx.fillRect(px + 4, py + 10, 20, 16);
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(px + 6, py, 16, 14);
    ctx.fillStyle = genero === 'pepito' ? '#2a1a0a' : '#1a0a00';
    if (genero === 'pepito') {
      ctx.fillRect(px + 5, py - 2, 18, 6);
    } else {
      ctx.fillRect(px + 4, py - 2, 20, 6);
      ctx.fillRect(px + 3, py + 2, 4, 10);
      ctx.fillRect(px + 21, py + 2, 4, 10);
    }
    ctx.fillStyle = '#FFFFFF';
    let ojoDx = 0, ojoDy = 0;
    if (jugador.direccion === 'izquierda') ojoDx = -1;
    if (jugador.direccion === 'derecha') ojoDx = 1;
    if (jugador.direccion === 'arriba') ojoDy = -1;
    if (jugador.direccion === 'abajo') ojoDy = 1;
    ctx.fillRect(px + 9 + ojoDx, py + 4 + ojoDy, 3, 3);
    ctx.fillRect(px + 16 + ojoDx, py + 4 + ojoDy, 3, 3);
    ctx.fillStyle = '#000000';
    ctx.fillRect(px + 10 + ojoDx, py + 5 + ojoDy, 1.5, 1.5);
    ctx.fillRect(px + 17 + ojoDx, py + 5 + ojoDy, 1.5, 1.5);
    ctx.fillStyle = '#2a5599';
    const pasoAnim = jugador.esAnimando ? Math.sin(jugador.cuadroAnimacion * 5) * 3 : 0;
    ctx.fillRect(px + 6, py + 26 + pasoAnim, 7, 8);
    ctx.fillRect(px + 15, py + 26 - pasoAnim, 7, 8);
    ctx.fillStyle = '#4a3520';
    ctx.fillRect(px + 5, py + 32 + pasoAnim, 8, 3);
    ctx.fillRect(px + 15, py + 32 - pasoAnim, 8, 3);
  }

  _estaCerca(jugador, obj, rango) {
    const dx = (jugador.x + jugador.ancho / 2) - (obj.x + (obj.ancho || 16) / 2);
    const dy = (jugador.y + jugador.alto / 2) - (obj.y + (obj.alto || 16) / 2);
    return Math.sqrt(dx * dx + dy * dy) < rango;
  }

  _obtenerTextos() {
    if (!this.juego || !this.juego.idiomas) return null;
    return this.juego.idiomas.traducciones[this.juego.idiomas.idiomaActual];
  }
}
