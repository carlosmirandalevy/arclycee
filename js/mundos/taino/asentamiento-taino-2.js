// ============================================================
// ASENTAMIENTO-TAINO-2.JS - Aldea agrícola taína (top-down)
// ============================================================
// El segundo asentamiento taíno. Esta aldea se enfoca en la
// agricultura (conucos), la medicina natural (behique) y las
// ceremonias (areíto). El jugador aprende cómo los taínos
// cultivaban yuca, usaban plantas medicinales y celebraban
// sus tradiciones a través de música y danza.
//
// MODO: Top-down (vista desde arriba, sin gravedad)
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';
import { CemiMurcielago } from '../../personajes/companeros/cemi-murcielago.js';

export class AsentamientoTaino2 {

  constructor() {
    // --- Dimensiones del nivel ---
    this.anchoNivel = 1400;
    this.altoNivel = 1000;

    // --- Cámara ---
    this.camaraX = 0;
    this.camaraY = 0;

    // --- Estructuras ---
    this.bohios = [];
    this.conucos = [];  // Montículos de cultivo taíno

    // --- NPCs ---
    this.npcs = [];

    // --- Batey para el areíto ---
    this.batey = { x: 700, y: 500, radio: 90 };

    // --- Objetos coleccionables ---
    this.objetos = [];

    // --- Diálogos ---
    this.dialogos = new SistemaDialogos();

    // --- Sonidos ---
    this.sfx = new SonidoProcedural();

    // --- Árboles ---
    this.arboles = [];

    // --- Bloqueo de entrada ---
    this.bloqueoEntrada = false;

    // --- Tiempo ---
    this.tiempoTotal = 0;

    // --- Misión ---
    this.misionActual = '';
    this.npcsHablados = 0;
    this.totalNPCs = 3;

    // --- Referencia al juego ---
    this.juego = null;
  }

  // --- Construir la aldea agrícola ---
  iniciar(juego) {
    this.juego = juego;

    // Poner al jugador en modo top-down
    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';
      juego.jugador.x = 100;
      juego.jugador.y = 800;
      juego.jugador.direccion = 'arriba';
    }

    // --- Bohíos ---
    this.bohios = [
      { x: 250, y: 250, radio: 45, tipo: 'bohio', nombre: 'Bohío del Behique' },
      { x: 500, y: 180, radio: 40, tipo: 'bohio', nombre: 'Bohío de Semillas' },
      { x: 1050, y: 300, radio: 45, tipo: 'bohio', nombre: 'Bohío del Agricultor' },
      { x: 1100, y: 600, radio: 50, tipo: 'caney', nombre: 'Caney Ceremonial' }
    ];

    // --- Conucos (montículos de cultivo) ---
    // Los taínos hacían montículos de tierra donde plantaban yuca,
    // batata, maíz y otros cultivos. Esto mejoraba el drenaje y
    // protegía las raíces de las inundaciones.
    this.conucos = [
      { x: 400, y: 350, ancho: 60, alto: 40, cultivo: 'yuca' },
      { x: 500, y: 380, ancho: 50, alto: 35, cultivo: 'batata' },
      { x: 600, y: 340, ancho: 55, alto: 38, cultivo: 'maiz' },
      { x: 450, y: 430, ancho: 45, alto: 32, cultivo: 'aji' },
      { x: 550, y: 460, ancho: 50, alto: 36, cultivo: 'yuca' },
      { x: 350, y: 420, ancho: 48, alto: 34, cultivo: 'tabaco' }
    ];

    // --- NPCs ---
    this.npcs = [
      {
        id: 'behique',
        x: 280, y: 310,
        ancho: 28, alto: 32,
        nombre: 'Behique Yuisa',
        color: '#6B8E23',
        dialogoHecho: false,
        esCurandero: true  // Siempre muestra [E] y permite re-interacción para curar
      },
      {
        id: 'agricultor',
        x: 1020, y: 360,
        ancho: 28, alto: 32,
        nombre: 'Guarionex (Agricultor)',
        color: '#8B6914',
        dialogoHecho: false,
        esCurandero: true  // Siempre muestra [E] — da guanábana
      },
      {
        id: 'musico',
        x: 750, y: 570,
        ancho: 28, alto: 32,
        nombre: 'Higüemota (Música)',
        color: '#B8860B',
        dialogoHecho: false
      }
    ];

    // --- Objetos coleccionables ---
    this.objetos = [
      {
        x: 700, y: 500,
        ancho: 16, alto: 16,
        tipo: 'navaja',
        recogido: false
      }
    ];

    // --- Árboles ---
    this.arboles = [];
    const posiciones = [
      [50, 80], [200, 60], [900, 100], [1250, 180],
      [1300, 500], [50, 700], [1300, 800], [600, 900],
      [850, 850], [100, 450], [1200, 400], [350, 750],
      [800, 150], [1100, 100]
    ];
    for (const [ax, ay] of posiciones) {
      this.arboles.push({
        x: ax, y: ay,
        tamano: 20 + Math.random() * 15,
        colorTronco: `rgb(${100 + Math.random() * 40}, ${70 + Math.random() * 30}, ${30 + Math.random() * 20})`,
        colorCopa: `rgb(${30 + Math.random() * 40}, ${120 + Math.random() * 60}, ${30 + Math.random() * 30})`
      });
    }

    // Misión inicial
    const textos = this._obtenerTextos();
    this.misionActual = textos?.dialogos?.aldea2?.misionHablar || 'Habla con los 3 aldeanos';
    this.npcsHablados = 0;
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, jugador, companeros) {
    if (!jugador) return;

    this.tiempoTotal += dt;

    // --- Diálogo activo ---
    if (this.dialogos.estaActivo()) {
      this.dialogos.actualizar(dt);

      // Navegar opciones con arriba/abajo (para diálogos con elección)
      if (entrada.estaPresionada('arriba') && !this.bloqueoEntrada) {
        this.dialogos.seleccionarOpcion(-1);
        this.bloqueoEntrada = true;
      }
      if (entrada.estaPresionada('abajo') && !this.bloqueoEntrada) {
        this.dialogos.seleccionarOpcion(1);
        this.bloqueoEntrada = true;
      }

      if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
        // Si la línea actual tiene opciones, confirmar la selección
        const lineaActual = this.dialogos.lineas[this.dialogos.lineaActual];
        if (lineaActual && lineaActual.opciones && lineaActual.opciones.length > 0 && this.dialogos._textoCompleto) {
          const opcion = this.dialogos.confirmarOpcion();
          if (opcion && opcion.valor === 'aceptar_batu') {
            this._aceptarBatu();
          } else if (opcion && opcion.valor === 'rechazar_batu') {
            this._rechazarBatu();
          }
        } else {
          this.dialogos.avanzar();
        }
        this.sfx.dialogo();
        this.bloqueoEntrada = true;
      }

      if (!entrada.estaPresionada('accion') &&
          !entrada.estaPresionada('arriba') &&
          !entrada.estaPresionada('abajo')) {
        this.bloqueoEntrada = false;
      }
      return;
    }

    // --- Movimiento top-down ---
    jugador.velocidadX = 0;
    jugador.velocidadY = 0;
    jugador.esAnimando = false;

    if (entrada.estaPresionada('arriba')) {
      jugador.velocidadY = -VELOCIDAD_JUGADOR;
      jugador.direccion = 'arriba';
      jugador.esAnimando = true;
    }
    if (entrada.estaPresionada('abajo')) {
      jugador.velocidadY = VELOCIDAD_JUGADOR;
      jugador.direccion = 'abajo';
      jugador.esAnimando = true;
    }
    if (entrada.estaPresionada('izquierda')) {
      jugador.velocidadX = -VELOCIDAD_JUGADOR;
      jugador.direccion = 'izquierda';
      jugador.esAnimando = true;
    }
    if (entrada.estaPresionada('derecha')) {
      jugador.velocidadX = VELOCIDAD_JUGADOR;
      jugador.direccion = 'derecha';
      jugador.esAnimando = true;
    }

    const factorTiempo = dt * 60;
    jugador.x += jugador.velocidadX * factorTiempo;
    jugador.y += jugador.velocidadY * factorTiempo;

    if (jugador.esAnimando) {
      jugador.cuadroAnimacion += 0.15;
    }

    // --- Bordes del nivel ---
    jugador.x = Math.max(0, Math.min(this.anchoNivel - jugador.ancho, jugador.x));
    jugador.y = Math.max(0, Math.min(this.altoNivel - jugador.alto, jugador.y));

    // --- Colisión con bohíos ---
    for (const bohio of this.bohios) {
      const dx = (jugador.x + jugador.ancho / 2) - bohio.x;
      const dy = (jugador.y + jugador.alto / 2) - bohio.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radioColision = bohio.radio + 10;

      if (dist < radioColision) {
        const angulo = Math.atan2(dy, dx);
        jugador.x = bohio.x + Math.cos(angulo) * radioColision - jugador.ancho / 2;
        jugador.y = bohio.y + Math.sin(angulo) * radioColision - jugador.alto / 2;
      }
    }

    // --- Interacción con NPCs ---
    for (const npc of this.npcs) {
      if (this._estaCerca(jugador, npc, 45)) {
        if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
          this.bloqueoEntrada = true;
          this._hablarConNPC(npc);
        }
      }
    }

    // --- Recoger objetos ---
    for (const obj of this.objetos) {
      if (obj.recogido) continue;
      if (this._estaCerca(jugador, obj, 25)) {
        obj.recogido = true;
        this.sfx.recoger();

        const textos = this._obtenerTextos();
        const nombreObjeto = textos?.objetos?.[obj.tipo] || obj.tipo;

        // Los objetos curativos restauran vida en vez de ir al inventario
        if (obj.esCurativo) {
          jugador.curar(obj.curacion);
          if (this.juego && this.juego.mostrarToast) {
            this.juego.mostrarToast(`💚 ${nombreObjeto} — +${obj.curacion} vida`);
          }
        } else {
          jugador.agregarAlInventario({ nombre: obj.tipo });

          if (this.juego && this.juego.inventario) {
            this.juego.inventario.agregar({
              id: obj.tipo,
              nombre: nombreObjeto,
              descripcion: textos?.objetos?.[`desc${obj.tipo.charAt(0).toUpperCase() + obj.tipo.slice(1)}`] || '',
              tipo: 'herramienta',
              cantidad: 1,
              color: '#CC4444',
              esUsable: false
            });
          }

          if (this.juego && this.juego.mostrarToast) {
            this.juego.mostrarToast(`✦ ${nombreObjeto} — ${textos?.ui?.itemAnadido || 'ítem añadido al inventario'}`);
          }
        }
      }
    }

    // --- Verificar misión ---
    // IMPORTANTE: va ANTES de la salida con Q para guardar progreso
    this.npcsHablados = this.npcs.filter(n => n.dialogoHecho).length;
    if (this.npcsHablados >= this.totalNPCs) {
      const textos = this._obtenerTextos();
      this.misionActual = textos?.dialogos?.aldea2?.misionCompleta || '¡Aldea explorada!';

      if (this.juego && this.juego.progreso) {
        if (!this.juego.progreso.nodosCompletados.includes(2)) {
          this.juego.progreso.nodosCompletados.push(2);
        }
        if (!this.juego.progreso.nodosDesbloqueados.includes(3)) {
          this.juego.progreso.nodosDesbloqueados.push(3);
        }
      }
    }

    // --- Volver al mapa con M o caminando al borde inferior ---
    if (entrada.estaPresionada('mapa') && !this.bloqueoEntrada) {
      if (this.juego && this.juego.cambiarEscena) {
        this.juego.cambiarEscena('mapaPrincipal');
      }
      this.bloqueoEntrada = true;
      return;
    }

    // Salir por el borde inferior (por donde entró el jugador)
    if (jugador.y >= this.altoNivel - jugador.alto - 5) {
      if (this.juego && this.juego.cambiarEscena) {
        this.juego.cambiarEscena('mapaPrincipal');
      }
      return;
    }

    // --- Desbloquear entrada ---
    if (!entrada.estaPresionada('accion') && !entrada.estaPresionada('mapa')) {
      this.bloqueoEntrada = false;
    }

    // --- Actualizar compañeros ---
    if (companeros) {
      for (const companero of companeros) {
        if (typeof companero.actualizar === 'function') {
          companero.actualizar(dt, jugador);
        }
      }
    }

    // --- Cámara suave ---
    const objetivoCamaraX = jugador.x - ANCHO_JUEGO / 2 + jugador.ancho / 2;
    const objetivoCamaraY = jugador.y - ALTO_JUEGO / 2 + jugador.alto / 2;
    this.camaraX += (objetivoCamaraX - this.camaraX) * 0.08;
    this.camaraY += (objetivoCamaraY - this.camaraY) * 0.08;
    this.camaraX = Math.max(0, Math.min(this.anchoNivel - ANCHO_JUEGO, this.camaraX));
    this.camaraY = Math.max(0, Math.min(this.altoNivel - ALTO_JUEGO, this.camaraY));
  }

  // --- Dibujar todo ---
  dibujar(renderizador, ancho, alto, textos, jugador, companeros) {
    if (!jugador) return;

    const ctx = renderizador.ctx;
    const offsetX = -this.camaraX;
    const offsetY = -this.camaraY;

    // --- Fondo: césped verde más claro (zona abierta, agrícola) ---
    ctx.fillStyle = '#4a8a3a';
    ctx.fillRect(0, 0, ancho, alto);

    // Textura del césped
    ctx.fillStyle = 'rgba(60, 150, 50, 0.25)';
    for (let gx = -1; gx < ancho / 60 + 1; gx++) {
      for (let gy = -1; gy < alto / 60 + 1; gy++) {
        const px = gx * 60 + (offsetX % 60);
        const py = gy * 60 + (offsetY % 60);
        ctx.fillRect(px + 10, py + 10, 30, 30);
      }
    }

    // --- Río que cruza la aldea (los taínos cultivaban cerca del agua) ---
    ctx.fillStyle = 'rgba(40, 100, 160, 0.4)';
    ctx.beginPath();
    ctx.moveTo(0 + offsetX, 650 + offsetY);
    ctx.quadraticCurveTo(400 + offsetX, 600 + offsetY, 700 + offsetX, 680 + offsetY);
    ctx.quadraticCurveTo(1000 + offsetX, 750 + offsetY, 1400 + offsetX, 700 + offsetY);
    ctx.lineTo(1400 + offsetX, 730 + offsetY);
    ctx.quadraticCurveTo(1000 + offsetX, 780 + offsetY, 700 + offsetX, 710 + offsetY);
    ctx.quadraticCurveTo(400 + offsetX, 630 + offsetY, 0 + offsetX, 680 + offsetY);
    ctx.closePath();
    ctx.fill();

    // Borde del río
    ctx.strokeStyle = 'rgba(30, 80, 130, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // --- Caminos de tierra ---
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';

    // Entrada al batey
    ctx.beginPath();
    ctx.moveTo(100 + offsetX, 900 + offsetY);
    ctx.lineTo(700 + offsetX, 500 + offsetY);
    ctx.stroke();

    // Caminos a los bohíos
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(700 + offsetX, 500 + offsetY);
    ctx.lineTo(250 + offsetX, 250 + offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(700 + offsetX, 500 + offsetY);
    ctx.lineTo(500 + offsetX, 180 + offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(700 + offsetX, 500 + offsetY);
    ctx.lineTo(1050 + offsetX, 300 + offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(700 + offsetX, 500 + offsetY);
    ctx.lineTo(1100 + offsetX, 600 + offsetY);
    ctx.stroke();

    // Camino a los conucos
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(700 + offsetX, 500 + offsetY);
    ctx.lineTo(480 + offsetX, 400 + offsetY);
    ctx.stroke();

    // --- Conucos (montículos de cultivo) ---
    for (const conuco of this.conucos) {
      this._dibujarConuco(ctx, conuco.x + offsetX, conuco.y + offsetY, conuco);
    }

    // --- Batey ---
    const bx = this.batey.x + offsetX;
    const by = this.batey.y + offsetY;

    ctx.fillStyle = '#C8A84E';
    ctx.beginPath();
    ctx.arc(bx, by, this.batey.radio, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Piedras alrededor del batey
    for (let i = 0; i < 16; i++) {
      const angulo = (i / 16) * Math.PI * 2;
      const px = bx + Math.cos(angulo) * (this.batey.radio + 8);
      const py = by + Math.sin(angulo) * (this.batey.radio + 8);
      ctx.fillStyle = '#777777';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Dujo ceremonial en el centro del batey
    // El dujo era un asiento de madera tallado usado por el cacique
    this._dibujarDujo(ctx, bx, by - 20);

    // --- Árboles detrás del jugador ---
    for (const arbol of this.arboles) {
      if (arbol.y < jugador.y) {
        this._dibujarArbol(ctx, arbol.x + offsetX, arbol.y + offsetY, arbol);
      }
    }

    // --- Bohíos ---
    for (const bohio of this.bohios) {
      this._dibujarBohio(ctx, bohio.x + offsetX, bohio.y + offsetY, bohio);
    }

    // --- Objetos coleccionables ---
    for (const obj of this.objetos) {
      if (obj.recogido) continue;
      const ox = obj.x + offsetX;
      const oy = obj.y + offsetY;

      // Brillo pulsante (verde para curativos, rojo para normales)
      const brillo = 0.5 + Math.sin(this.tiempoTotal * 3) * 0.3;

      if (obj.esCurativo) {
        // --- Ícono de hierbas curativas ---
        ctx.fillStyle = `rgba(68, 204, 68, ${brillo})`;
        ctx.beginPath();
        ctx.arc(ox + 8, oy + 8, 12, 0, Math.PI * 2);
        ctx.fill();

        // Tres hojitas verdes
        ctx.fillStyle = '#228B22';
        // Hoja central
        ctx.beginPath();
        ctx.ellipse(ox + 8, oy + 5, 3, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        // Hoja izquierda
        ctx.beginPath();
        ctx.ellipse(ox + 4, oy + 7, 2, 5, -0.4, 0, Math.PI * 2);
        ctx.fill();
        // Hoja derecha
        ctx.beginPath();
        ctx.ellipse(ox + 12, oy + 7, 2, 5, 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Tallo
        ctx.strokeStyle = '#2E8B2E';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ox + 8, oy + 10);
        ctx.lineTo(ox + 8, oy + 14);
        ctx.stroke();
      } else {
        // --- Ícono navaja ---
        ctx.fillStyle = `rgba(204, 68, 68, ${brillo})`;
        ctx.beginPath();
        ctx.arc(ox + 8, oy + 8, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#CC3333';
        ctx.fillRect(ox + 4, oy + 3, 8, 10);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(ox + 6, oy + 1, 4, 3);
      }
    }

    // --- NPCs ---
    for (const npc of this.npcs) {
      this._dibujarNPC(ctx, npc, offsetX, offsetY, jugador);
    }

    // --- Jugador ---
    this._dibujarJugador(ctx, jugador, offsetX, offsetY);

    // --- Compañeros ---
    if (companeros) {
      for (const companero of companeros) {
        if (companero.activo && typeof companero.dibujar === 'function') {
          ctx.save();
          ctx.translate(offsetX, offsetY);
          companero.dibujar(ctx);
          ctx.restore();
        }
      }
    }

    // --- Árboles delante del jugador ---
    for (const arbol of this.arboles) {
      if (arbol.y >= jugador.y) {
        this._dibujarArbol(ctx, arbol.x + offsetX, arbol.y + offsetY, arbol);
      }
    }

    // --- HUD ---
    renderizador.dibujarBarra(10, 10, 120, 14, jugador.vida / jugador.vidaMaxima,
      '#333333', '#44CC44');
    renderizador.dibujarTexto(textos?.interfaz?.vida || 'Vida', 15, 22, {
      tamano: 10, color: '#FFFFFF'
    });

    renderizador.dibujarTexto(`🗣️ ${this.npcsHablados}/${this.totalNPCs}`, 15, 42, {
      tamano: 11, color: '#FFD700'
    });

    // Objetos recogidos (excluir curativos del conteo — se regeneran)
    const objetosPermanentes = this.objetos.filter(o => !o.esCurativo);
    const objRecogidos = objetosPermanentes.filter(o => o.recogido).length;
    renderizador.dibujarTexto(`📦 ${objRecogidos}/${objetosPermanentes.length}`, 15, 58, {
      tamano: 11, color: objRecogidos >= objetosPermanentes.length ? '#44CC44' : '#FFD700'
    });

    // Regalos de NPCs (Guarionex da guanábana, Behique da Cemí Murciélago)
    const agricultor = this.npcs.find(n => n.id === 'agricultor');
    const behique = this.npcs.find(n => n.id === 'behique');
    const regalosRecibidos = (agricultor?.dialogoHecho ? 1 : 0) + (behique?.dialogoHecho ? 1 : 0);
    const totalRegalos = 2;
    renderizador.dibujarTexto(`🎁 ${regalosRecibidos}/${totalRegalos}`, 15, 74, {
      tamano: 11, color: regalosRecibidos >= totalRegalos ? '#44CC44' : '#FFD700'
    });

    renderizador.dibujarTexto(this.misionActual, ancho - 10, 20, {
      tamano: 12, color: '#CCCCCC', alineacion: 'right'
    });

    // --- Diálogo ---
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto, textos);
    }

    // --- Indicador de F para Magnoboot ---
    if (companeros && companeros.some(c => c.tipo === 'magnoboot' && c.activo)) {
      const texDetectar = this._obtenerTextos()?.ui?.fDetectarMetal || '[F] Detectar Metal';
      renderizador.dibujarTexto(texDetectar, 15, 90, {
        tamano: 10, color: '#44FFFF'
      });
    }

    // --- Controles ---
    if (!this.dialogos.estaActivo()) {
      const texControles = this._obtenerTextos()?.ui?.controlesHabilidad || 'WASD: mover | E: hablar | F: habilidad | I: inventario | M: mapa | P: fotos | L: misiones';
      renderizador.dibujarTexto(texControles, ancho / 2, alto - 10, {
        tamano: 10, color: '#555555', alineacion: 'center'
      });
    }
  }

  // ============================================================
  // DIBUJO DE ELEMENTOS
  // ============================================================

  // --- Dibujar un conuco (montículo de cultivo taíno) ---
  _dibujarConuco(ctx, x, y, conuco) {
    // Montículo de tierra
    ctx.fillStyle = '#7a5a30';
    ctx.beginPath();
    ctx.ellipse(x + conuco.ancho / 2, y + conuco.alto / 2,
      conuco.ancho / 2, conuco.alto / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Capa de tierra más clara encima
    ctx.fillStyle = '#8B6914';
    ctx.beginPath();
    ctx.ellipse(x + conuco.ancho / 2, y + conuco.alto / 2 - 3,
      conuco.ancho / 2 - 4, conuco.alto / 2 - 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Plantitas según el tipo de cultivo
    const cx = x + conuco.ancho / 2;
    const cy = y + conuco.alto / 2 - 5;

    if (conuco.cultivo === 'yuca') {
      // Hojas verdes alargadas (la yuca tiene hojas en forma de mano)
      ctx.fillStyle = '#3a8a20';
      for (let i = 0; i < 5; i++) {
        const angulo = (i / 5) * Math.PI * 2;
        ctx.fillRect(
          cx + Math.cos(angulo) * 6 - 2,
          cy + Math.sin(angulo) * 4 - 6,
          4, 8
        );
      }
    } else if (conuco.cultivo === 'maiz') {
      // Tallos verticales con hojitas
      ctx.fillStyle = '#4a9a30';
      ctx.fillRect(cx - 1, cy - 12, 2, 14);
      ctx.fillRect(cx - 6, cy - 10, 2, 12);
      ctx.fillRect(cx + 5, cy - 8, 2, 10);
      // Mazorca
      ctx.fillStyle = '#DAA520';
      ctx.fillRect(cx - 2, cy - 6, 4, 5);
    } else if (conuco.cultivo === 'batata') {
      // Hojas en forma de corazón (bajas y extendidas)
      ctx.fillStyle = '#2a7a18';
      ctx.beginPath();
      ctx.arc(cx - 5, cy - 2, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + 5, cy - 3, 5, 0, Math.PI * 2);
      ctx.fill();
    } else if (conuco.cultivo === 'aji') {
      // Plantita con frutos rojos (el ají picante taíno)
      ctx.fillStyle = '#3a8a20';
      ctx.fillRect(cx - 1, cy - 8, 2, 10);
      ctx.fillStyle = '#CC2222';
      ctx.beginPath();
      ctx.arc(cx - 4, cy - 4, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + 4, cy - 6, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (conuco.cultivo === 'tabaco') {
      // Hojas grandes y anchas
      ctx.fillStyle = '#5a9a40';
      ctx.beginPath();
      ctx.ellipse(cx, cy - 4, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#4a8a30';
      ctx.beginPath();
      ctx.ellipse(cx, cy - 8, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Etiqueta del cultivo (sutil)
    ctx.font = '8px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.textAlign = 'center';
    ctx.fillText(conuco.cultivo, x + conuco.ancho / 2, y + conuco.alto + 10);
    ctx.textAlign = 'left';
  }

  // --- Dibujar el dujo (asiento ceremonial) ---
  _dibujarDujo(ctx, x, y) {
    // Base del asiento
    ctx.fillStyle = '#6B3410';
    ctx.fillRect(x - 10, y, 20, 8);

    // Patas
    ctx.fillRect(x - 10, y + 8, 4, 6);
    ctx.fillRect(x + 6, y + 8, 4, 6);

    // Respaldo con cara tallada
    ctx.fillRect(x - 8, y - 12, 16, 12);
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - 6, y - 10, 12, 8);

    // Ojos tallados en el respaldo
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(x - 4, y - 8, 3, 3);
    ctx.fillRect(x + 1, y - 8, 3, 3);

    // Etiqueta
    ctx.font = '8px monospace';
    ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText('Dujo', x, y + 22);
    ctx.textAlign = 'left';
  }

  // --- Dibujar bohío (reutiliza patrón de Asentamiento 1) ---
  _dibujarBohio(ctx, x, y, bohio) {
    const r = bohio.radio;

    if (bohio.tipo === 'caney') {
      ctx.fillStyle = '#8B6914';
      ctx.fillRect(x - r, y - r * 0.6, r * 2, r * 1.2);

      ctx.fillStyle = '#5a7a2e';
      ctx.beginPath();
      ctx.moveTo(x - r - 10, y - r * 0.6);
      ctx.lineTo(x, y - r * 1.3);
      ctx.lineTo(x + r + 10, y - r * 0.6);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#4a6a20';
      ctx.lineWidth = 1;
      for (let i = -r; i <= r; i += 12) {
        ctx.beginPath();
        ctx.moveTo(x + i, y - r * 0.6);
        ctx.lineTo(x, y - r * 1.3);
        ctx.stroke();
      }

      ctx.fillStyle = '#3a2a0a';
      ctx.fillRect(x - 8, y - r * 0.6 + r * 0.4, 16, r * 0.8);
    } else {
      ctx.fillStyle = '#8B6914';
      ctx.beginPath();
      ctx.arc(x, y, r * 0.7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#5a7a2e';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#4a6a20';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, r * 0.7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, r * 0.4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#8B6914';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#3a2a0a';
      ctx.beginPath();
      ctx.arc(x, y + r * 0.5, 8, 0, Math.PI);
      ctx.fill();
    }

    ctx.font = '9px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText(bohio.nombre, x, y + r + 15);
    ctx.textAlign = 'left';
  }

  // --- Dibujar NPC ---
  _dibujarNPC(ctx, npc, offsetX, offsetY, jugador) {
    const nx = npc.x + offsetX;
    const ny = npc.y + offsetY;

    ctx.fillStyle = npc.color;
    ctx.fillRect(nx, ny, npc.ancho, npc.alto);

    // Cabeza
    ctx.fillStyle = '#C68642';
    ctx.fillRect(nx + 4, ny - 10, 20, 12);

    // Ojos
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(nx + 8, ny - 6, 4, 4);
    ctx.fillRect(nx + 16, ny - 6, 4, 4);
    ctx.fillStyle = '#000000';
    ctx.fillRect(nx + 9, ny - 5, 2, 2);
    ctx.fillRect(nx + 17, ny - 5, 2, 2);

    // Decoración según NPC
    if (npc.id === 'behique') {
      // Collar de huesos y plumas (el behique era el chamán/curandero)
      ctx.fillStyle = '#EEEEEE';
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(nx + 6 + i * 4, ny - 2, 3, 4);
      }
      // Pluma en la cabeza
      ctx.fillStyle = '#22AA22';
      ctx.fillRect(nx + 12, ny - 18, 3, 8);
    } else if (npc.id === 'agricultor') {
      // Herramienta de cavar (coa — palo de labranza taíno)
      ctx.strokeStyle = '#6B3410';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(nx + npc.ancho, ny + 5);
      ctx.lineTo(nx + npc.ancho + 12, ny + npc.alto);
      ctx.stroke();
      // Punta
      ctx.fillStyle = '#555555';
      ctx.beginPath();
      ctx.moveTo(nx + npc.ancho + 10, ny + npc.alto);
      ctx.lineTo(nx + npc.ancho + 14, ny + npc.alto);
      ctx.lineTo(nx + npc.ancho + 12, ny + npc.alto + 6);
      ctx.closePath();
      ctx.fill();
    } else if (npc.id === 'musico') {
      // Maraca (instrumento taíno)
      ctx.fillStyle = '#B8860B';
      ctx.beginPath();
      ctx.arc(nx - 6, ny + 10, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#6B3410';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(nx - 6, ny + 16);
      ctx.lineTo(nx - 6, ny + 26);
      ctx.stroke();
    }

    // Nombre
    ctx.font = '10px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(npc.nombre, nx + npc.ancho / 2, ny - 20);

    // Interacción — el curandero siempre muestra [E] para poder curar
    if (this._estaCerca(jugador, npc, 45) && (!npc.dialogoHecho || npc.esCurandero)) {
      const parpadeo = Math.sin(this.tiempoTotal * 4) > 0 ? 1 : 0.4;
      ctx.font = '11px monospace';
      ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
      const _t = this._obtenerTextos()?.ui;
      const etiqueta = npc.esCurandero && npc.dialogoHecho ? (_t?.eCurar || '[E] Curar') : (_t?.eHablar || '[E] Hablar');
      ctx.fillText(etiqueta, nx + npc.ancho / 2, ny - 32);
    }

    if (npc.dialogoHecho && !npc.esCurandero) {
      ctx.font = 'bold 14px monospace';
      ctx.fillStyle = '#44CC44';
      ctx.fillText('✓', nx + npc.ancho / 2, ny - 32);
    }

    ctx.textAlign = 'left';
  }

  // --- Dibujar jugador (top-down) ---
  _dibujarJugador(ctx, jugador, offsetX, offsetY) {
    const px = jugador.x + offsetX;
    const py = jugador.y + offsetY;
    const genero = jugador.genero || 'pepito';

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(px + jugador.ancho / 2, py + jugador.alto + 2, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    const colorCuerpo = genero === 'pepito' ? '#4488ff' : '#aa44ff';
    ctx.fillStyle = colorCuerpo;
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

  // --- Dibujar árbol ---
  _dibujarArbol(ctx, x, y, arbol) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.beginPath();
    ctx.ellipse(x, y + arbol.tamano * 0.5, arbol.tamano * 0.8, arbol.tamano * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = arbol.colorTronco;
    ctx.fillRect(x - 3, y - arbol.tamano * 0.3, 6, arbol.tamano * 0.8);

    ctx.fillStyle = arbol.colorCopa;
    ctx.beginPath();
    ctx.arc(x, y - arbol.tamano * 0.3, arbol.tamano * 0.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = arbol.colorCopa;
    ctx.lineWidth = 3;
    for (let i = 0; i < 6; i++) {
      const angulo = (i / 6) * Math.PI * 2 + 0.3;
      ctx.beginPath();
      ctx.moveTo(x, y - arbol.tamano * 0.3);
      ctx.lineTo(
        x + Math.cos(angulo) * arbol.tamano * 0.7,
        y - arbol.tamano * 0.3 + Math.sin(angulo) * arbol.tamano * 0.5
      );
      ctx.stroke();
    }
  }

  // --- Hablar con NPC ---
  _hablarConNPC(npc) {
    const textos = this._obtenerTextos();
    const aldea2 = textos?.dialogos?.aldea2;

    if (npc.id === 'behique') {
      // Si ya habló, solo curar (visita de regreso)
      if (npc.dialogoHecho) {
        const jugador = this.juego.jugador;
        if (jugador && jugador.vida < jugador.vidaMaxima) {
          this.dialogos.iniciarDialogo([
            { personaje: '🌿 Behique Yuisa', texto: aldea2?.behiqueCurar || 'Déjame prepararte un remedio con hierbas. ¡Quedarás como nuevo!' }
          ], () => {
            const cantidadCurada = jugador.vidaMaxima - jugador.vida;
            jugador.curar(cantidadCurada);
            if (this.juego.mostrarToast) {
              this.juego.mostrarToast(`💚 ${aldea2?.behiqueCuroToast || 'El behique te ha curado'} — +${cantidadCurada} vida`);
            }
          });
        } else {
          this.dialogos.iniciarDialogo([
            { personaje: '🌿 Behique Yuisa', texto: aldea2?.behiqueSano || 'Te veo bien de salud. ¡Que los cemíes te protejan!' }
          ]);
        }
        return;
      }

      // El behique da el Cemí Murciélago al jugador después de hablar
      const yaTieneCemi = this.juego.companeros.some(c => c.tipo === 'cemiMurcielago');

      this.dialogos.iniciarDialogo([
        { personaje: '🌿 Behique Yuisa', texto: aldea2?.behique1 || 'Soy el behique, el curandero de la aldea.' },
        { personaje: '🌿 Behique Yuisa', texto: aldea2?.behique2 || 'Las plantas de esta tierra tienen poderes curativos.' },
        { personaje: '🌿 Behique Yuisa', texto: aldea2?.behique3 || 'Usamos tabaco en las ceremonias de cohoba.' },
        { personaje: '🌿 Behique Yuisa', texto: aldea2?.behique4 || 'La guayaba, la jagua y la sábila curan muchos males.' },
        // Solo muestra la línea del Cemí si no lo tiene todavía
        ...(yaTieneCemi ? [] : [
          { personaje: '🦇 Behique Yuisa', texto: aldea2?.behiqueCemi || '¡El espíritu del Cemí Murciélago te ha elegido! Él te guiará en las cuevas.' }
        ]),
        // El behique siempre ofrece curar al jugador
        { personaje: '🌿 Behique Yuisa', texto: aldea2?.behiqueCurar || 'Déjame prepararte un remedio con hierbas. ¡Quedarás como nuevo!' }
      ], () => {
        npc.dialogoHecho = true;
        // Dar el Cemí Murciélago si no lo tiene
        if (!yaTieneCemi) {
          const cemi = new CemiMurcielago(this.juego.jugador.x - 20, this.juego.jugador.y - 25);
          cemi.activar();
          this.juego.companeros.push(cemi);
          this.sfx.recoger();
        }
        // El behique cura al jugador completamente
        const jugador = this.juego.jugador;
        if (jugador && jugador.vida < jugador.vidaMaxima) {
          const cantidadCurada = jugador.vidaMaxima - jugador.vida;
          jugador.curar(cantidadCurada);
          if (this.juego.mostrarToast) {
            this.juego.mostrarToast(`💚 ${aldea2?.behiqueCuroToast || 'El behique te ha curado'} — +${cantidadCurada} vida`);
          }
        }
      });
    } else if (npc.id === 'agricultor') {
      // Guarionex da hojas de guanábana al jugador (curativas, usables desde inventario)
      const yaTieneGuanabana = this.juego?.inventario?.tieneObjeto('guanabana');

      // Re-visita: solo ofrece guanábana si la usó
      if (npc.dialogoHecho) {
        if (!yaTieneGuanabana) {
          this.dialogos.iniciarDialogo([
            { personaje: '🌱 Guarionex', texto: aldea2?.agricultorGuanabana || 'Toma más hojas de guanábana. ¡Cuídate!' }
          ], () => {
            const t = textos?.objetos || {};
            this.juego.inventario.agregar({
              id: 'guanabana',
              nombre: t.guanabana || 'Hojas de Guanábana',
              descripcion: t.descGuanabana || 'Hojas y semillas medicinales. Restauran 30 de vida.',
              tipo: 'curacion', cantidad: 1, color: '#44AA44', esUsable: true, valor: 30
            });
            this.sfx.recoger();
            if (this.juego.mostrarToast) {
              this.juego.mostrarToast(`✦ ${t.guanabana || 'Hojas de Guanábana'} — ${textos?.ui?.itemAnadidoBrief || 'ítem añadido'}`);
            }
          });
        } else {
          this.dialogos.iniciarDialogo([
            { personaje: '🌱 Guarionex', texto: aldea2?.agricultorSaludo || '¡Los conucos están dando buena cosecha hoy!' }
          ]);
        }
        return;
      }

      // Primera visita: diálogo completo + dar guanábana
      this.dialogos.iniciarDialogo([
        { personaje: '🌱 Guarionex', texto: aldea2?.agricultor1 || '¡Mira nuestros conucos!' },
        { personaje: '🌱 Guarionex', texto: aldea2?.agricultor2 || 'Hacemos montículos de tierra para plantar.' },
        { personaje: '🌱 Guarionex', texto: aldea2?.agricultor3 || 'Cultivamos yuca, maíz, batata, ají y tabaco.' },
        { personaje: '🌱 Guarionex', texto: aldea2?.agricultor4 || 'La yuca es lo más importante — con ella hacemos el casabe.' },
        { personaje: '🌱 Guarionex', texto: aldea2?.agricultorGuanabana || 'Toma estas hojas y semillas de guanábana. ¡Son medicinales!' }
      ], () => {
        npc.dialogoHecho = true;
        if (this.juego?.inventario) {
          const t = textos?.objetos || {};
          this.juego.inventario.agregar({
            id: 'guanabana',
            nombre: t.guanabana || 'Hojas de Guanábana',
            descripcion: t.descGuanabana || 'Hojas y semillas medicinales. Restauran 30 de vida.',
            tipo: 'curacion', cantidad: 1, color: '#44AA44', esUsable: true, valor: 30
          });
          this.sfx.recoger();
          if (this.juego.mostrarToast) {
            this.juego.mostrarToast(`✦ ${t.guanabana || 'Hojas de Guanábana'} — ${textos?.ui?.itemAnadidoBrief || 'ítem añadido'}`);
          }
        }
      });
    } else if (npc.id === 'musico') {
      // Higüemota: areíto + misión secundaria de batú
      // Primera vez: diálogo sobre el areíto, luego ofrece batú con opción sí/no
      // Si rechazó: queda como misión pendiente, puede aceptar al volver a hablar
      // Si aceptó: juega batú inmediatamente
      // Si completó: diálogo de cierre
      const misionBatu = this.juego?.misiones?.misiones?.batu;
      const batuCompletado = misionBatu?.estado === 'completada';
      const batuDescubierto = misionBatu && misionBatu.estado !== 'no_descubierta';

      if (!npc.dialogoHecho) {
        // Primera conversación: areíto + oferta de batú
        this.dialogos.iniciarDialogo([
          { personaje: '🎵 Higüemota', texto: aldea2?.musico1 || '¡Bienvenido al batey!' },
          { personaje: '🎵 Higüemota', texto: aldea2?.musico2 || 'Aquí celebramos el areíto — nuestra ceremonia de música y danza.' },
          { personaje: '🎵 Higüemota', texto: aldea2?.musico3 || 'Usamos maracas, güiros y tambores hechos de troncos.' },
          { personaje: '🎵 Higüemota', texto: aldea2?.musico4 || 'En el areíto contamos la historia de nuestro pueblo cantando.' },
          { personaje: '🎵 Higüemota', texto: aldea2?.batuOferta1 || '¿Quieres jugar batú? Es nuestro juego de pelota sagrado.' },
          { personaje: '🎵 Higüemota', texto: aldea2?.batuOferta2 || 'Se golpea con la cadera, los hombros y la cabeza. ¡Nunca con las manos!',
            opciones: [
              { texto: aldea2?.batuAceptar || '¡Sí, vamos a jugar!', valor: 'aceptar_batu' },
              { texto: aldea2?.batuRechazar || 'Ahora no, quizás después.', valor: 'rechazar_batu' }
            ]
          }
        ], () => { npc.dialogoHecho = true; });
      } else if (batuDescubierto && !batuCompletado) {
        // Ya conoce la misión pero no la ha completado — ofrecer de nuevo
        this.dialogos.iniciarDialogo([
          { personaje: '🎵 Higüemota', texto: aldea2?.batuOfertaRepite || '¿Listo para el batú? ¡El batey te espera!',
            opciones: [
              { texto: aldea2?.batuAceptar || '¡Sí, vamos a jugar!', valor: 'aceptar_batu' },
              { texto: aldea2?.batuRechazar || 'Ahora no, quizás después.', valor: 'rechazar_batu' }
            ]
          }
        ]);
      } else if (batuCompletado) {
        // Ya completó el batú — diálogo de cierre
        this.dialogos.iniciarDialogo([
          { personaje: '🎵 Higüemota', texto: aldea2?.batuRepite || '¡Fue un gran partido! El batú une a las aldeas y resuelve conflictos sin violencia.' }
        ]);
      }
    }
  }

  // --- Aceptar la misión de batú e iniciar el mini-juego ---
  _aceptarBatu() {
    const textos = this._obtenerTextos();
    const aldea2 = textos?.dialogos?.aldea2;
    const mis = textos?.misiones || {};

    // Registrar como misión secundaria descubierta + en progreso
    if (this.juego && this.juego.misiones) {
      // Si no estaba descubierta, descubrir primero
      if (!this.juego.misiones.estaDescubierta('batu')) {
        this.juego.misiones.descubrir('batu');
        // Agregar al registro de misiones
        if (this.juego.registro) {
          const titulo = mis.batuTitulo || 'Batú';
          this.juego.registro.agregarEntrada('secundaria', titulo,
            mis.batuDesc || 'Jugar un partido de batú contra Higüemota en el batey.');
        }
      }
      this.juego.misiones.iniciar('batu');
    }

    // Iniciar el juego de batú como overlay
    if (this.juego && this.juego.batu) {
      this.juego.batu.iniciar({
        historia: 'ceremonia',
        alTerminar: (gano) => {
          // Marcar misión como completada
          if (this.juego.misiones) {
            this.juego.misiones.completar('batu');
          }
          if (this.juego.registro) {
            const titulo = mis.batuTitulo || 'Batú';
            this.juego.registro.marcarCompletada(titulo);
          }

          // Reputación +10 por completar la misión
          if (this.juego.reputacion) {
            this.juego.reputacion.modificar(10, aldea2?.batuReputacion || 'Batú completado');
          }

          // Mostrar mensaje de resultado
          const msg = gano
            ? (aldea2?.batuVictoria || '¡Higüemota: Impresionante! Juegas como un verdadero taíno.')
            : (aldea2?.batuDerrota || '¡Higüemota: Buen intento! El batú requiere mucha práctica.');
          if (this.juego.mostrarToast) {
            this.juego.mostrarToast(msg, 4);
          }
        }
      });
    }
  }

  // --- Rechazar la misión de batú (queda como pendiente) ---
  _rechazarBatu() {
    const textos = this._obtenerTextos();
    const mis = textos?.misiones || {};

    // Descubrir la misión para que aparezca en el registro como pendiente
    if (this.juego && this.juego.misiones) {
      if (!this.juego.misiones.estaDescubierta('batu')) {
        this.juego.misiones.descubrir('batu');
        if (this.juego.registro) {
          const titulo = mis.batuTitulo || 'Batú';
          this.juego.registro.agregarEntrada('secundaria', titulo,
            mis.batuDesc || 'Jugar un partido de batú contra Higüemota en el batey.');
        }
      }
    }

    // Toast informando que queda pendiente
    if (this.juego && this.juego.mostrarToast) {
      const aldea2 = textos?.dialogos?.aldea2;
      this.juego.mostrarToast(aldea2?.batuPendiente || '🏐 Misión pendiente: Batú', 3);
    }
  }

  // ============================================================
  // UTILIDADES
  // ============================================================

  _estaCerca(a, b, distancia) {
    const dx = (a.x + (a.ancho || 0) / 2) - (b.x + (b.ancho || 0) / 2);
    const dy = (a.y + (a.alto || 0) / 2) - (b.y + (b.alto || 0) / 2);
    return Math.sqrt(dx * dx + dy * dy) < distancia;
  }

  _obtenerTextos() {
    if (this.juego && this.juego.idiomas) {
      return this.juego.idiomas.traducciones[this.juego.idiomas.idiomaActual];
    }
    return null;
  }
}
