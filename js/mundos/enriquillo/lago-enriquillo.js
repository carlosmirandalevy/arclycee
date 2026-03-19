// ============================================================
// LAGO-ENRIQUILLO.JS - Lago Enriquillo e Isla Cabritos
// ============================================================
// El Lago Enriquillo es el lago más grande del Caribe y el punto
// más bajo de las Antillas (44m bajo el nivel del mar). En su
// centro está la Isla Cabritos, hogar de cocodrilos americanos,
// iguanas rinoceronte y flamencos.
//
// Históricamente, el cacique Enriquillo (Guarocuya) se refugió
// en las montañas del Bahoruco cercanas y lideró una rebelión
// de 13 años (1519-1533) contra los españoles, la primera
// revuelta indígena exitosa de las Américas.
//
// MODO: Top-down (vista desde arriba, sin gravedad)
// ENTRADA: Nodo 10 en el mapa (suroeste de la isla)
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';

export class LagoEnriquillo {

  constructor() {
    // --- Dimensiones del nivel ---
    this.anchoNivel = 1800;
    this.altoNivel = 1200;

    // --- Cámara ---
    this.camaraX = 0;
    this.camaraY = 0;

    // --- Diálogos ---
    this.dialogos = new SistemaDialogos();

    // --- Sonidos ---
    this.sfx = new SonidoProcedural();

    // --- NPCs ---
    this.npcs = [];

    // --- Cocodrilos (peligros que patrullan el lago) ---
    this.cocodrilos = [];

    // --- Estado ---
    this.bloqueoEntrada = true;
    this.tiempoTotal = 0;
    this.misionActual = '';
    this._enriquilloConversacion = 0;
    this._idoloEntregado = false;

    // --- Referencia al juego ---
    this.juego = null;
  }

  iniciar(juego) {
    this.juego = juego;
    this.bloqueoEntrada = true;
    this.tiempoTotal = 0;

    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';
      // El jugador entra por la orilla sur del lago
      juego.jugador.x = 200;
      juego.jugador.y = 1100;
      juego.jugador.velocidadX = 0;
      juego.jugador.velocidadY = 0;
    }

    const textos = this._obtenerTextos();
    if (juego.mostrarToast) {
      juego.mostrarToast('🐊 ' + (textos?.dialogos?.enriquillo?.nombreLugar || 'Lago Enriquillo — El lago más grande del Caribe'), 4);
    }

    // Restaurar estado
    this._idoloEntregado = !!juego.progreso?.idoloCemiEntregado;
    this._caritasExaminadas = false;

    // --- Las Caritas: sitio arqueológico en el acantilado norte ---
    // Petroglifos taínos tallados en la roca caliza de la orilla norte
    // del Lago Enriquillo. Son rostros (caritas) con expresiones variadas,
    // datados entre 500 y 1500 d.C. Patrimonio arqueológico real de RD.
    this.caritas = {
      x: 900, y: 50, ancho: 200, alto: 60,
      // 7 caritas con expresiones diferentes
      rostros: [
        { dx: 20, dy: 15, tipo: 'sonrisa' },
        { dx: 55, dy: 10, tipo: 'sorpresa' },
        { dx: 90, dy: 20, tipo: 'serio' },
        { dx: 120, dy: 8, tipo: 'ojo_grande' },
        { dx: 150, dy: 18, tipo: 'triangular' },
        { dx: 175, dy: 12, tipo: 'redondo' },
        { dx: 40, dy: 40, tipo: 'espiral' }
      ]
    };

    // --- NPCs en la Isla Cabritos ---
    const eq = textos?.dialogos?.enriquillo;
    this.npcs = [
      // Enriquillo — cacique rebelde, en el centro de la Isla Cabritos
      {
        id: 'enriquillo', x: 900, y: 500, ancho: 28, alto: 36,
        nombre: eq?.enriquilloNombre || 'Cacique Enriquillo',
        color: '#DAA520',
        dialogoHecho: false, esMentor: false
      },
      // Mencía — esposa de Enriquillo
      {
        id: 'mencia', x: 960, y: 520, ancho: 28, alto: 36,
        nombre: eq?.menciaNombre || 'Mencía',
        color: '#CD853F',
        dialogoHecho: false, esMentor: false
      },
      // Tamayo — guerrero aliado
      {
        id: 'tamayo', x: 840, y: 530, ancho: 28, alto: 36,
        nombre: eq?.tamayoNombre || 'Tamayo',
        color: '#8B6914',
        dialogoHecho: false, esMentor: false
      }
    ];

    // --- Cocodrilos patrullando el lago ---
    // El jugador debe esquivarlos para llegar a la isla
    this.cocodrilos = [
      { x: 400, y: 800, ancho: 60, alto: 25, fase: 0, velocidad: 0.4, centroX: 400, centroY: 800, radioX: 150, radioY: 60 },
      { x: 700, y: 650, ancho: 60, alto: 25, fase: Math.PI, velocidad: 0.35, centroX: 700, centroY: 650, radioX: 120, radioY: 80 },
      { x: 1100, y: 750, ancho: 60, alto: 25, fase: Math.PI / 2, velocidad: 0.45, centroX: 1100, centroY: 750, radioX: 100, radioY: 100 },
      { x: 500, y: 500, ancho: 60, alto: 25, fase: Math.PI * 1.5, velocidad: 0.3, centroX: 500, centroY: 500, radioX: 130, radioY: 50 },
      { x: 1300, y: 600, ancho: 60, alto: 25, fase: 0.5, velocidad: 0.38, centroX: 1300, centroY: 600, radioX: 140, radioY: 70 }
    ];

    // Misión
    const tieneIdolo = juego.jugador?.inventario?.some(i => i.nombre === 'idoloCemi');
    if (this._idoloEntregado) {
      this.misionActual = eq?.misionExplorar || 'Explora el lago y habla con Enriquillo';
    } else if (tieneIdolo) {
      this.misionActual = eq?.misionEntregar || 'Lleva el cemí a Enriquillo en la Isla Cabritos';
    } else {
      this.misionActual = eq?.misionExplorar || 'Explora el Lago Enriquillo';
    }
  }

  // ============================================================
  // ACTUALIZAR
  // ============================================================

  actualizar(dt, entrada, jugador, companeros) {
    if (!jugador) return;
    this.tiempoTotal += dt;

    // Diálogo activo
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

    // --- Movimiento top-down (más lento en el agua) ---
    jugador.velocidadX = 0;
    jugador.velocidadY = 0;
    jugador.esAnimando = false;

    // Velocidad reducida en el agua (fuera de la isla)
    const enIsla = this._estaEnIsla(jugador);
    const velMult = enIsla ? 1.0 : 0.6;

    if (entrada.estaPresionada('izquierda')) { jugador.velocidadX = -VELOCIDAD_JUGADOR * velMult; jugador.esAnimando = true; }
    if (entrada.estaPresionada('derecha'))   { jugador.velocidadX = VELOCIDAD_JUGADOR * velMult; jugador.esAnimando = true; }
    if (entrada.estaPresionada('arriba'))    { jugador.velocidadY = -VELOCIDAD_JUGADOR * velMult; jugador.esAnimando = true; }
    if (entrada.estaPresionada('abajo'))     { jugador.velocidadY = VELOCIDAD_JUGADOR * velMult; jugador.esAnimando = true; }

    const factorTiempo = dt * 60;
    jugador.x += jugador.velocidadX * factorTiempo;
    jugador.y += jugador.velocidadY * factorTiempo;

    if (jugador.esAnimando) {
      jugador.cuadroAnimacion = (jugador.cuadroAnimacion || 0) + dt * 8;
    }

    // Limitar al nivel
    jugador.x = Math.max(0, Math.min(this.anchoNivel - jugador.ancho, jugador.x));
    jugador.y = Math.max(0, Math.min(this.altoNivel - jugador.alto, jugador.y));

    // --- Cocodrilos: movimiento + daño por contacto ---
    for (const croc of this.cocodrilos) {
      const prevX = croc.x;
      croc.fase += croc.velocidad * dt;
      croc.x = croc.centroX + Math.sin(croc.fase) * croc.radioX;
      croc.y = croc.centroY + Math.cos(croc.fase * 0.7) * croc.radioY;
      croc.mirandoDerecha = croc.x > prevX;

      // Actualizar animación de giro (death roll) tras morder
      if (croc._rolando > 0) {
        croc._rolando -= dt;
      }

      // Daño por contacto + sacudida del jugador + death roll del cocodrilo
      if (!jugador._invulnerable) {
        const dx = (jugador.x + jugador.ancho / 2) - (croc.x + croc.ancho / 2);
        const dy = (jugador.y + jugador.alto / 2) - (croc.y + croc.alto / 2);
        if (Math.abs(dx) < 30 && Math.abs(dy) < 20) {
          jugador.recibirDano(8);
          jugador._invulnerable = true;
          jugador._tiempoInvulnerable = 1.5;
          // Sacudida del jugador (como en el mundo acuático)
          jugador._sacudida = 0.5;
          // Death roll del cocodrilo
          croc._rolando = 0.8;
          this.sfx.mordidaTiburon();
          if (this.juego?.mostrarToast) {
            const eq = this._obtenerTextos()?.dialogos?.enriquillo;
            this.juego.mostrarToast('🐊 ' + (eq?.mordidaCocodrilo || '¡Mordida de cocodrilo!'), 2);
          }
        }
      }
    }

    // Invulnerabilidad temporal
    if (jugador._invulnerable) {
      jugador._tiempoInvulnerable -= dt;
      if (jugador._tiempoInvulnerable <= 0) {
        jugador._invulnerable = false;
      }
    }

    // --- Interacción con NPCs y Las Caritas ---
    if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      // Las Caritas — acantilado norte
      const c = this.caritas;
      const cerca = jugador.x > c.x - 30 && jugador.x < c.x + c.ancho + 30
        && jugador.y < c.y + c.alto + 50;
      if (cerca) {
        this._examinarCaritas();
        this.bloqueoEntrada = true;
      } else {
        for (const npc of this.npcs) {
          if (this._estaCerca(jugador, npc, 45)) {
            this._hablarConNPC(npc);
            this.bloqueoEntrada = true;
            break;
          }
        }
      }
    }
    if (!entrada.estaPresionada('accion')) this.bloqueoEntrada = false;

    // Salir por borde inferior
    if (jugador.y >= this.altoNivel - 10 && this.juego) {
      this.juego.cambiarEscena('mapaPrincipal');
    }
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

    // --- Fondo: agua del lago (azul verdoso, más oscuro que el mar) ---
    ctx.fillStyle = '#2a5a6a';
    ctx.fillRect(0, 0, ancho, alto);

    // Ondas del agua (animadas)
    ctx.fillStyle = 'rgba(60, 120, 140, 0.3)';
    for (let wx = 0; wx < this.anchoNivel; wx += 60) {
      for (let wy = 0; wy < this.altoNivel; wy += 60) {
        const px = wx + offsetX + Math.sin(this.tiempoTotal * 2 + wx * 0.02) * 3;
        const py = wy + offsetY;
        if (px > -60 && px < ancho + 60 && py > -60 && py < alto + 60) {
          ctx.fillRect(px, py, 40, 2);
        }
      }
    }

    // --- Orillas del lago (terreno árido al borde) ---
    ctx.fillStyle = '#8a7a5a';
    // Orilla sur
    ctx.fillRect(0 + offsetX, 1050 + offsetY, this.anchoNivel, 150);
    // Orilla norte
    ctx.fillRect(0 + offsetX, 0 + offsetY, this.anchoNivel, 100);
    // Orilla este
    ctx.fillRect(1650 + offsetX, 0 + offsetY, 150, this.altoNivel);
    // Orilla oeste
    ctx.fillRect(0 + offsetX, 0 + offsetY, 150, this.altoNivel);

    // --- Las Caritas: acantilado con petroglifos en la orilla norte ---
    {
      const c = this.caritas;
      const cx = c.x + offsetX;
      const cy = c.y + offsetY;

      // Acantilado de piedra caliza
      ctx.fillStyle = '#9a8a6a';
      ctx.fillRect(cx - 10, cy - 10, c.ancho + 20, c.alto + 20);
      ctx.fillStyle = '#8a7a5a';
      ctx.fillRect(cx, cy, c.ancho, c.alto);
      // Bordes del acantilado (sombra)
      ctx.fillStyle = '#6a5a3a';
      ctx.fillRect(cx, cy + c.alto, c.ancho, 8);

      // Dibujar las caritas (petroglifos tallados en la roca)
      for (const rostro of c.rostros) {
        const rx = cx + rostro.dx;
        const ry = cy + rostro.dy;
        ctx.strokeStyle = '#3a2a1a';
        ctx.lineWidth = 1.5;

        if (rostro.tipo === 'sonrisa') {
          // Cara sonriente
          ctx.beginPath(); ctx.arc(rx, ry, 8, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = '#3a2a1a';
          ctx.fillRect(rx - 4, ry - 3, 2, 2); ctx.fillRect(rx + 2, ry - 3, 2, 2);
          ctx.beginPath(); ctx.arc(rx, ry + 2, 4, 0.1, Math.PI - 0.1); ctx.stroke();
        } else if (rostro.tipo === 'sorpresa') {
          // Cara sorprendida (boca abierta O)
          ctx.beginPath(); ctx.arc(rx, ry, 8, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = '#3a2a1a';
          ctx.fillRect(rx - 4, ry - 3, 2, 2); ctx.fillRect(rx + 2, ry - 3, 2, 2);
          ctx.beginPath(); ctx.arc(rx, ry + 3, 2, 0, Math.PI * 2); ctx.stroke();
        } else if (rostro.tipo === 'serio') {
          // Cara seria (línea recta como boca)
          ctx.beginPath(); ctx.arc(rx, ry, 8, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = '#3a2a1a';
          ctx.fillRect(rx - 4, ry - 3, 2, 2); ctx.fillRect(rx + 2, ry - 3, 2, 2);
          ctx.beginPath(); ctx.moveTo(rx - 3, ry + 3); ctx.lineTo(rx + 3, ry + 3); ctx.stroke();
        } else if (rostro.tipo === 'ojo_grande') {
          // Cara con ojos grandes (estilo taíno)
          ctx.beginPath(); ctx.arc(rx, ry, 9, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.arc(rx - 3, ry - 2, 3, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.arc(rx + 3, ry - 2, 3, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(rx - 2, ry + 4); ctx.lineTo(rx + 2, ry + 4); ctx.stroke();
        } else if (rostro.tipo === 'triangular') {
          // Cara triangular
          ctx.beginPath(); ctx.moveTo(rx, ry - 8); ctx.lineTo(rx - 7, ry + 6); ctx.lineTo(rx + 7, ry + 6); ctx.closePath(); ctx.stroke();
          ctx.fillStyle = '#3a2a1a';
          ctx.fillRect(rx - 3, ry - 2, 2, 2); ctx.fillRect(rx + 1, ry - 2, 2, 2);
        } else if (rostro.tipo === 'redondo') {
          // Cara redonda simple
          ctx.beginPath(); ctx.arc(rx, ry, 7, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = '#3a2a1a';
          ctx.fillRect(rx - 3, ry - 2, 2, 2); ctx.fillRect(rx + 1, ry - 2, 2, 2);
          ctx.beginPath(); ctx.arc(rx, ry + 2, 3, 0.2, Math.PI - 0.2); ctx.stroke();
        } else if (rostro.tipo === 'espiral') {
          // Espiral (motivo común en petroglifos)
          ctx.beginPath();
          for (let a = 0; a < Math.PI * 4; a += 0.2) {
            const sr = a * 1.2;
            ctx.lineTo(rx + Math.cos(a) * sr, ry + Math.sin(a) * sr);
          }
          ctx.stroke();
        }
      }

      // Etiqueta "Las Caritas"
      ctx.font = '10px monospace';
      ctx.fillStyle = '#DDCCAA';
      ctx.textAlign = 'center';
      ctx.fillText('Las Caritas', cx + c.ancho / 2, cy + c.alto + 22);
      ctx.textAlign = 'left';

      // Indicador [E] si el jugador está cerca
      if (jugador) {
        const cerca = jugador.x > c.x - 30 && jugador.x < c.x + c.ancho + 30
          && jugador.y < c.y + c.alto + 50;
        if (cerca) {
          const pulso = 0.7 + Math.sin(this.tiempoTotal * 3) * 0.3;
          ctx.font = 'bold 11px monospace';
          ctx.fillStyle = `rgba(255, 215, 0, ${pulso})`;
          ctx.textAlign = 'center';
          const textos = this._obtenerTextos();
          ctx.fillText(textos?.ui?.eExaminar || '[E] Examinar', cx + c.ancho / 2, cy - 15);
          ctx.textAlign = 'left';
        }
      }
    }

    // --- Isla Cabritos (centro del lago) ---
    // La isla es ovalada, árida, con cactus y rocas
    const islaX = 750 + offsetX;
    const islaY = 350 + offsetY;
    const islaW = 400;
    const islaH = 300;

    // Arena de la isla
    ctx.fillStyle = '#b8a882';
    ctx.beginPath();
    ctx.ellipse(islaX + islaW / 2, islaY + islaH / 2, islaW / 2, islaH / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Borde de la isla (arena más oscura)
    ctx.strokeStyle = '#9a8a6a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(islaX + islaW / 2, islaY + islaH / 2, islaW / 2, islaH / 2, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Cactus en la isla
    const cactusPos = [[800, 400], [1050, 450], [850, 580], [1100, 380], [950, 350]];
    for (const [cx, cy] of cactusPos) {
      this._dibujarCactus(ctx, cx + offsetX, cy + offsetY);
    }

    // --- Cocodrilos ---
    for (const croc of this.cocodrilos) {
      this._dibujarCocodrilo(ctx, croc, offsetX, offsetY);
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

    // --- HUD ---
    const _t = this._obtenerTextos();

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

    // Nombre del lugar
    ctx.font = '11px monospace';
    ctx.fillStyle = '#AAAAAA';
    ctx.textAlign = 'center';
    ctx.fillText(_t?.dialogos?.enriquillo?.nombreLugar || '🐊 Lago Enriquillo', ancho / 2, alto - 40);
    ctx.fillStyle = '#888888';
    ctx.fillText('WASD: mover | E: hablar | M: mapa', ancho / 2, alto - 15);
    ctx.textAlign = 'left';

    // Diálogos
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto, _t);
    }
  }

  // ============================================================
  // DIBUJO DE ELEMENTOS
  // ============================================================

  _dibujarCactus(ctx, x, y) {
    // Tronco principal
    ctx.fillStyle = '#3a7a3a';
    ctx.fillRect(x - 3, y - 20, 6, 25);
    // Brazo izquierdo
    ctx.fillRect(x - 12, y - 15, 10, 5);
    ctx.fillRect(x - 12, y - 22, 5, 12);
    // Brazo derecho
    ctx.fillRect(x + 3, y - 10, 10, 5);
    ctx.fillRect(x + 8, y - 18, 5, 13);
  }

  _dibujarCocodrilo(ctx, croc, offsetX, offsetY) {
    const cx = croc.x + offsetX;
    const cy = croc.y + offsetY;
    const dir = croc.mirandoDerecha ? 1 : -1;
    const bodyW = croc.ancho;
    const bodyH = croc.alto;
    const midX = cx + bodyW / 2;
    const midY = cy + bodyH / 2;

    // Si está rolando (death roll tras morder), rotar el sprite
    const rolando = (croc._rolando || 0) > 0;
    if (rolando) {
      ctx.save();
      ctx.translate(midX, midY);
      ctx.rotate(Math.sin(this.tiempoTotal * 20) * Math.PI * 0.5);
      ctx.translate(-midX, -midY);
    }

    // --- Cuerpo principal (elipse más larga y aplanada) ---
    ctx.fillStyle = '#3a5a2a';
    ctx.beginPath();
    ctx.ellipse(midX, midY, bodyW / 2, bodyH / 2 - 2, 0, 0, Math.PI * 2);
    ctx.fill();
    // Vientre más claro
    ctx.fillStyle = '#6a8a4a';
    ctx.beginPath();
    ctx.ellipse(midX, midY + 2, bodyW / 2 - 5, bodyH / 2 - 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- Hocico largo (snout) ---
    const snoutX = cx + (dir > 0 ? bodyW : 0);
    ctx.fillStyle = '#4a6a3a';
    // Mandíbula superior (más larga y estrecha)
    ctx.beginPath();
    ctx.moveTo(snoutX, cy + 4);
    ctx.lineTo(snoutX + dir * 28, midY - 1);
    ctx.lineTo(snoutX, midY);
    ctx.closePath();
    ctx.fill();
    // Mandíbula inferior
    ctx.fillStyle = '#3a5a2a';
    ctx.beginPath();
    ctx.moveTo(snoutX, midY);
    ctx.lineTo(snoutX + dir * 25, midY + 1);
    ctx.lineTo(snoutX, cy + bodyH - 4);
    ctx.closePath();
    ctx.fill();
    // Línea de la boca
    ctx.strokeStyle = '#2a3a1a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(snoutX, midY);
    ctx.lineTo(snoutX + dir * 26, midY);
    ctx.stroke();
    // Dientes (pequeños triángulos blancos)
    ctx.fillStyle = '#EEEECC';
    for (let d = 0; d < 4; d++) {
      const dx = snoutX + dir * (8 + d * 5);
      ctx.beginPath();
      ctx.moveTo(dx, midY - 1);
      ctx.lineTo(dx + dir * 1.5, midY + 2);
      ctx.lineTo(dx - dir * 1.5, midY - 1);
      ctx.closePath();
      ctx.fill();
    }
    // Fosa nasal
    ctx.fillStyle = '#2a3a1a';
    ctx.beginPath();
    ctx.arc(snoutX + dir * 24, midY - 3, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // --- Ojos (protuberantes, encima de la cabeza) ---
    ctx.fillStyle = '#CCCC44';
    ctx.beginPath();
    ctx.arc(snoutX + dir * 2, cy + 3, 3.5, 0, Math.PI * 2);
    ctx.fill();
    // Pupila vertical (como reptil)
    ctx.fillStyle = '#111111';
    ctx.fillRect(snoutX + dir * 1.5, cy + 1, 1.5, 4);

    // --- Escamas dorsales (crestas a lo largo del lomo) ---
    ctx.fillStyle = '#2a4a1a';
    for (let i = 0; i < 6; i++) {
      const sx = cx + 5 + i * (bodyW / 7);
      ctx.beginPath();
      ctx.moveTo(sx, cy - 1);
      ctx.lineTo(sx + 3, cy - 4);
      ctx.lineTo(sx + 6, cy - 1);
      ctx.closePath();
      ctx.fill();
    }

    // --- Patas (4 patas cortas con movimiento al caminar) ---
    const legSwing = Math.sin(this.tiempoTotal * 4 + croc.fase) * 3;
    ctx.fillStyle = '#3a5a2a';
    // Pata delantera izquierda
    ctx.fillRect(cx + bodyW * 0.25, cy + bodyH - 2 + legSwing, 5, 8);
    // Pata delantera derecha
    ctx.fillRect(cx + bodyW * 0.35, cy + bodyH - 2 - legSwing, 5, 8);
    // Pata trasera izquierda
    ctx.fillRect(cx + bodyW * 0.65, cy + bodyH - 2 - legSwing, 5, 8);
    // Pata trasera derecha
    ctx.fillRect(cx + bodyW * 0.75, cy + bodyH - 2 + legSwing, 5, 8);
    // Garras (pequeñas líneas en cada pata)
    ctx.strokeStyle = '#2a3a1a';
    ctx.lineWidth = 0.8;
    const patas = [bodyW * 0.25, bodyW * 0.35, bodyW * 0.65, bodyW * 0.75];
    const legOffsets = [legSwing, -legSwing, -legSwing, legSwing];
    for (let p = 0; p < 4; p++) {
      const px = cx + patas[p];
      const py = cy + bodyH + 5 + legOffsets[p];
      for (let g = 0; g < 3; g++) {
        ctx.beginPath();
        ctx.moveTo(px + 1 + g * 1.5, py);
        ctx.lineTo(px + 1 + g * 1.5, py + 2);
        ctx.stroke();
      }
    }

    // --- Cola (ondulante, más larga) ---
    const tailX = cx + (dir > 0 ? 0 : bodyW);
    const tailWave = Math.sin(this.tiempoTotal * 5 + croc.fase);
    ctx.strokeStyle = '#3a5a2a';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(tailX, midY);
    ctx.quadraticCurveTo(
      tailX - dir * 12, midY + tailWave * 10,
      tailX - dir * 22, midY + tailWave * 6
    );
    ctx.stroke();
    // Punta de la cola (más fina)
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(tailX - dir * 22, midY + tailWave * 6);
    ctx.lineTo(tailX - dir * 30, midY + tailWave * 3);
    ctx.stroke();

    if (rolando) {
      ctx.restore();
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

    // Cabeza
    ctx.fillStyle = '#C68642';
    ctx.fillRect(nx + 6, ny, 16, 14);

    // Pelo
    ctx.fillStyle = '#1a0a00';
    ctx.fillRect(nx + 5, ny - 2, 18, 5);

    // Corona dorada para Enriquillo
    if (npc.id === 'enriquillo') {
      ctx.fillStyle = '#DAA520';
      for (let i = 0; i < 5; i++) {
        ctx.fillRect(nx + 4 + i * 4, ny - 6, 3, 5);
      }
    }

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
    if (esCerca) {
      const pulso = 0.7 + Math.sin(this.tiempoTotal * 3) * 0.3;
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(255, 215, 0, ${pulso})`;
      const textos = this._obtenerTextos();
      ctx.fillText(textos?.ui?.eHablar || '[E] Hablar', nx + npc.ancho / 2, ny - 4);
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
    const eq = textos?.dialogos?.enriquillo;

    if (npc.id === 'enriquillo') {
      this._hablarEnriquillo(npc, eq, textos);
    } else if (npc.id === 'mencia') {
      this._hablarMencia(npc, eq);
    } else if (npc.id === 'tamayo') {
      this._hablarTamayo(npc, eq);
    }
  }

  _hablarEnriquillo(npc, eq, textos) {
    const nombre = '👑 Cacique Enriquillo';
    const tieneIdolo = this.juego?.jugador?.inventario?.some(i => i.nombre === 'idoloCemi');

    // Entrega del ídolo cemí
    if (tieneIdolo && !this._idoloEntregado) {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: eq?.enriquilloRecibe1 || '¿Un cemí sagrado de Anacaona? ¡Esto es un regalo invaluable!' },
        { personaje: nombre, texto: eq?.enriquilloRecibe2 || 'Los cemíes nos conectan con nuestros ancestros y los espíritus de la tierra.' },
        { personaje: nombre, texto: eq?.enriquilloRecibe3 || 'Con este poder espiritual, nuestra lucha se fortalece. Gracias, joven guerrero.' }
      ], () => {
        this._idoloEntregado = true;
        if (this.juego?.progreso) this.juego.progreso.idoloCemiEntregado = true;

        // Quitar el ídolo del inventario
        if (this.juego.jugador?.inventario) {
          const idx = this.juego.jugador.inventario.findIndex(i => i.nombre === 'idoloCemi');
          if (idx >= 0) this.juego.jugador.inventario.splice(idx, 1);
        }
        if (this.juego.inventario) this.juego.inventario.quitar('idoloCemi');

        // Completar sidequest
        if (this.juego.misiones) {
          this.juego.misiones.completar('idoloEnriquillo');
        }
        if (this.juego.reputacion) {
          this.juego.reputacion.modificar(15, eq?.reputacionIdolo || 'Ídolo entregado a Enriquillo');
        }
        const mis = textos?.misiones || {};
        this.juego.mostrarToast('⭐ ' + (mis.idoloEnriquilloCompleta || '¡Misión completada: El Ídolo de Enriquillo!'));
        this.juego.registro?.marcarCompletada(mis.idoloEnriquilloTitulo || 'El Ídolo de Enriquillo');

        this.misionActual = eq?.misionCompleta || '¡Ídolo entregado! Habla con Enriquillo para aprender más.';

        // Marcar nodo completado
        if (this.juego.progreso) {
          if (!this.juego.progreso.nodosCompletados.includes(10)) {
            this.juego.progreso.nodosCompletados.push(10);
          }
        }
      });
      return;
    }

    // Diálogo rotativo — historia de Enriquillo, Mencía y la rebelión
    const conversaciones = [
      [
        { personaje: nombre, texto: eq?.enriquillo1 || 'Soy Guarocuya, pero los españoles me bautizaron Enriquillo.' },
        { personaje: nombre, texto: eq?.enriquillo2 || 'Me criaron los frailes franciscanos. Aprendí a leer, a escribir y las leyes de Castilla.' }
      ],
      [
        { personaje: nombre, texto: eq?.enriquillo3 || 'Los españoles nos quitaron todo. Nuestras tierras, nuestra libertad, nuestra dignidad.' },
        { personaje: nombre, texto: eq?.enriquillo4 || 'Cuando el encomendero Valenzuela me humilló y golpeó a mi esposa Mencía, dije: ¡basta!' }
      ],
      [
        { personaje: nombre, texto: eq?.enriquillo5 || 'Mencía es mi fuerza. Nos conocimos en el convento — ella también fue educada por los frailes.' },
        { personaje: nombre, texto: eq?.enriquillo6 || 'Nuestro amor nació entre libros y oraciones, pero se forjó en la resistencia. Juntos escapamos a las montañas del Bahoruco.' }
      ],
      [
        { personaje: nombre, texto: eq?.enriquillo7 || 'Mencía no solo es mi esposa — es una líder. Organiza la comunidad, cuida a los heridos y mantiene viva la esperanza.' },
        { personaje: nombre, texto: eq?.enriquillo8 || 'Dicen que un hombre solo puede cambiar el mundo, pero sin Mencía, yo no habría cambiado nada.' }
      ],
      [
        { personaje: nombre, texto: eq?.enriquillo9 || 'Llevamos 13 años resistiendo (1519-1533). Los españoles enviaron ejércitos, pero las montañas nos protegen.' },
        { personaje: nombre, texto: eq?.enriquillo10 || 'Al final, Carlos V firmó un tratado de paz reconociendo nuestra libertad. ¡La primera victoria indígena de las Américas!' }
      ],
      [
        { personaje: nombre, texto: eq?.enriquillo11 || 'Este lago lleva mi nombre. Pero la verdadera victoria no fue mía — fue de todos los que lucharon.' },
        { personaje: nombre, texto: eq?.enriquillo12 || 'La resistencia no siempre es violencia. A veces es sobrevivir, mantener tu cultura y nunca rendirte.' }
      ]
    ];

    const indice = this._enriquilloConversacion % conversaciones.length;
    this.dialogos.iniciarDialogo(conversaciones[indice], () => {
      this._enriquilloConversacion++;
    });
  }

  _hablarMencia(npc, eq) {
    const nombre = '💐 Mencía';
    if (npc.dialogoHecho) {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: eq?.menciaSaludo || 'Mientras haya montañas, habrá libertad. Y mientras haya amor, habrá esperanza.' }
      ]);
      return;
    }
    this.dialogos.iniciarDialogo([
      { personaje: nombre, texto: eq?.mencia1 || 'Soy Mencía. Los frailes me educaron junto a Guarocuya — así nos conocimos.' },
      { personaje: nombre, texto: eq?.mencia2 || 'Cuando Valenzuela me atacó, Guarocuya juró que nunca más nos someteríamos.' },
      { personaje: nombre, texto: eq?.mencia3 || 'Aquí en las montañas somos libres. Cuido a nuestra gente y les enseño a leer.' },
      { personaje: nombre, texto: eq?.mencia4 || 'El amor no es solo sentimiento — es acción. Luchamos juntos cada día por un futuro digno.' }
    ], () => { npc.dialogoHecho = true; });
  }

  _hablarTamayo(npc, eq) {
    const nombre = '⚔️ Tamayo';
    if (npc.dialogoHecho) {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: eq?.tamayoSaludo || '¡Las montañas del Bahoruco son invencibles!' }
      ]);
      return;
    }
    this.dialogos.iniciarDialogo([
      { personaje: nombre, texto: eq?.tamayo1 || 'Soy Tamayo, guerrero y aliado de Enriquillo.' },
      { personaje: nombre, texto: eq?.tamayo2 || 'Conozco cada sendero de estas montañas. Los españoles se pierden, pero nosotros somos parte de la tierra.' },
      { personaje: nombre, texto: eq?.tamayo3 || 'Nuestra estrategia es simple: conocer el terreno, moverse rápido y nunca pelear donde ellos quieren.' }
    ], () => { npc.dialogoHecho = true; });
  }

  // ============================================================
  // UTILIDADES
  // ============================================================

  // Verificar si el jugador está en la Isla Cabritos (elipse central)
  // --- Examinar Las Caritas (petroglifos del acantilado norte) ---
  _examinarCaritas() {
    const textos = this._obtenerTextos();
    const eq = textos?.dialogos?.enriquillo;

    if (this._caritasExaminadas) {
      // Re-visita: dato extra
      this.dialogos.iniciarDialogo([
        { personaje: '🗿 Las Caritas', texto: eq?.caritasRepite || 'Los rostros tallados en la roca te observan con expresiones milenarias. Cada uno es único.' }
      ]);
      return;
    }

    this.dialogos.iniciarDialogo([
      { personaje: '🗿 Las Caritas', texto: eq?.caritas1 || '¡Petroglifos tallados en la roca caliza! Son "Las Caritas" — rostros esculpidos por los taínos.' },
      { personaje: '🗿 Las Caritas', texto: eq?.caritas2 || 'Estas caras tienen entre 500 y 1,000 años. Representan espíritus, ancestros y divinidades.' },
      { personaje: '🗿 Las Caritas', texto: eq?.caritas3 || 'Los taínos tallaban petroglifos en cuevas y acantilados. Estos del Lago Enriquillo son de los más accesibles.' },
      { personaje: '🗿 Las Caritas', texto: eq?.caritas4 || 'Cada rostro tiene una expresión diferente: sonrisas, sorpresa, seriedad. ¿Qué querrían comunicar?' }
    ], () => {
      this._caritasExaminadas = true;
      if (this.juego?.mostrarToast) {
        this.juego.mostrarToast('🗿 ' + (textos?.ui?.caritasDescubiertas || 'Las Caritas descubiertas — petroglifos taínos'), 3);
      }
    });
  }

  _dibujarJugador(ctx, jugador, offsetX, offsetY) {
    let px = jugador.x + offsetX;
    let py = jugador.y + offsetY;
    // Sacudida tras mordida de cocodrilo (decae con el tiempo)
    if (jugador._sacudida > 0) {
      px += Math.sin(this.tiempoTotal * 50) * 3 * jugador._sacudida;
      jugador._sacudida -= 1 / 60;
      if (jugador._sacudida < 0) jugador._sacudida = 0;
    }
    // En el agua: inclinación lateral + ondulación vertical (simula nado)
    const enAgua = !this._estaEnIsla(jugador);
    if (enAgua) {
      py += Math.sin(this.tiempoTotal * 3) * 2;
    }
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
    // Piernas y zapatos (ocultos en el agua — el jugador nada)
    if (!enAgua) {
      ctx.fillStyle = '#2a5599';
      const pasoAnim = jugador.esAnimando ? Math.sin(jugador.cuadroAnimacion * 5) * 3 : 0;
      ctx.fillRect(px + 6, py + 26 + pasoAnim, 7, 8);
      ctx.fillRect(px + 15, py + 26 - pasoAnim, 7, 8);
      ctx.fillStyle = '#4a3520';
      ctx.fillRect(px + 5, py + 32 + pasoAnim, 8, 3);
      ctx.fillRect(px + 15, py + 32 - pasoAnim, 8, 3);
    } else {
      // Ondas de agua alrededor del jugador (simula nado)
      ctx.strokeStyle = 'rgba(100, 180, 200, 0.5)';
      ctx.lineWidth = 1;
      const ondaW = 10 + Math.sin(this.tiempoTotal * 4) * 3;
      ctx.beginPath();
      ctx.ellipse(px + 14, py + 28, ondaW, 4, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  _estaEnIsla(jugador) {
    const cx = 950, cy = 500;
    const rx = 200, ry = 150;
    const dx = (jugador.x + jugador.ancho / 2 - cx) / rx;
    const dy = (jugador.y + jugador.alto / 2 - cy) / ry;
    return (dx * dx + dy * dy) < 1;
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
