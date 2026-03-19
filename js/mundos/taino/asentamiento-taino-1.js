// ============================================================
// ASENTAMIENTO-TAINO-1.JS - Aldea taína (vista top-down)
// ============================================================
// El primer asentamiento taíno que el jugador visita al salir
// de las Cuevas del Pomier. Una aldea con bohíos (casas taínas),
// un batey (plaza ceremonial) y NPCs que enseñan sobre la vida
// cotidiana del pueblo taíno.
//
// MODO: Top-down (vista desde arriba, sin gravedad)
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';
import { Viralata } from '../../personajes/companeros/viralata.js';

export class AsentamientoTaino1 {

  constructor() {
    // --- Dimensiones del nivel ---
    this.anchoNivel = 1200;
    this.altoNivel = 900;

    // --- Cámara ---
    this.camaraX = 0;
    this.camaraY = 0;

    // --- Estructuras de la aldea ---
    // Bohíos = casas taínas circulares con techo de hojas de palma
    this.bohios = [];

    // --- NPCs ---
    this.npcs = [];

    // --- Batey (plaza ceremonial) ---
    this.batey = { x: 600, y: 450, radio: 80 };

    // --- Objetos coleccionables ---
    this.objetos = [];

    // --- Diálogos ---
    this.dialogos = new SistemaDialogos();

    // --- Sonidos ---
    this.sfx = new SonidoProcedural();

    // --- Árboles decorativos ---
    this.arboles = [];

    // --- Bloqueo de entrada ---
    this.bloqueoEntrada = false;

    // --- Tiempo total (para animaciones) ---
    this.tiempoTotal = 0;

    // --- Misión ---
    this.misionActual = '';
    this.npcsHablados = 0;
    this.totalNPCs = 3;

    // --- Perro callejero (Viralata) ---
    // Aparece cerca de la entrada de la aldea, el jugador lo adopta
    this.perroCallejero = null;
    this.perroAdoptado = false;

    // --- Referencia al juego ---
    this.juego = null;
  }

  // --- Construir la aldea ---
  iniciar(juego) {
    this.juego = juego;

    // Poner al jugador en modo top-down (vista de arriba)
    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';
      juego.jugador.x = 100;
      juego.jugador.y = 700;
      juego.jugador.direccion = 'arriba';
    }

    // --- Bohíos (casas taínas) ---
    // Los bohíos eran casas circulares con techo de hojas de palma (cana)
    // El cacique vivía en un caney (bohío rectangular más grande)
    this.bohios = [
      { x: 200, y: 200, radio: 45, tipo: 'bohio', nombre: 'Bohío del Alfarero', clave: 'bohioAlfarero' },
      { x: 450, y: 150, radio: 45, tipo: 'bohio', nombre: 'Bohío del Pescador', clave: 'bohioPescador' },
      { x: 850, y: 200, radio: 45, tipo: 'bohio', nombre: 'Bohío de la Curandera', clave: 'bohioCurandera' },
      { x: 900, y: 500, radio: 55, tipo: 'caney', nombre: 'Caney del Cacique', clave: 'caneyCacique' },
      { x: 300, y: 500, radio: 40, tipo: 'bohio', nombre: 'Bohío de Casabe', clave: 'bohioCasabe' }
    ];

    // --- NPCs de la aldea ---
    // Cada NPC enseña algo sobre la cultura taína
    this.npcs = [
      {
        id: 'cacique',
        x: 850, y: 560,
        ancho: 28, alto: 32,
        nombre: 'Cacique Guacanagaríx',
        color: '#DAA520',
        dialogoHecho: false
      },
      {
        id: 'alfarera',
        x: 230, y: 260,
        ancho: 28, alto: 32,
        nombre: 'Anacaona (Alfarera)',
        color: '#CD853F',
        dialogoHecho: false,
        esCurandero: true  // Siempre muestra [E] — da vasija curativa
      },
      {
        id: 'pescador',
        x: 480, y: 210,
        ancho: 28, alto: 32,
        nombre: 'Caonabó (Pescador)',
        color: '#8B7355',
        dialogoHecho: false
      }
    ];

    // --- Objetos coleccionables ---
    this.objetos = [
      {
        x: 600, y: 450,
        ancho: 16, alto: 16,
        tipo: 'brujula',
        recogido: false
      }
    ];

    // --- Árboles decorativos ---
    this.arboles = [];
    const posicionesArboles = [
      [50, 100], [150, 80], [700, 100], [1050, 150],
      [1100, 400], [50, 600], [1100, 700], [500, 800],
      [750, 750], [100, 400], [950, 350], [400, 650]
    ];
    for (const [ax, ay] of posicionesArboles) {
      this.arboles.push({
        x: ax, y: ay,
        tamano: 20 + Math.random() * 15,
        colorTronco: `rgb(${100 + Math.random() * 40}, ${70 + Math.random() * 30}, ${30 + Math.random() * 20})`,
        colorCopa: `rgb(${30 + Math.random() * 40}, ${120 + Math.random() * 60}, ${30 + Math.random() * 30})`
      });
    }

    // --- Perro callejero cerca de la entrada ---
    // Si el jugador ya tiene Viralata como compañero, no mostrarlo
    const yaAdoptado = juego.companeros && juego.companeros.some(c => c instanceof Viralata);
    this.perroAdoptado = yaAdoptado;
    this.perroCallejero = {
      x: 180, y: 650,
      ancho: 22, alto: 14,
      tiempoAnimCola: 0
    };

    // Misión inicial
    const textos = this._obtenerTextos();
    this.misionActual = textos?.dialogos?.aldea?.misionHablar || 'Habla con los aldeanos';
    this.npcsHablados = 0;
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, jugador, companeros) {
    if (!jugador) return;

    this.tiempoTotal += dt;

    // --- Si hay diálogo activo, solo actualizar diálogo ---
    if (this.dialogos.estaActivo()) {
      this.dialogos.actualizar(dt);
      if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
        this.dialogos.avanzar();
        this.sfx.dialogo();
        this.bloqueoEntrada = true;
      }
      if (!entrada.estaPresionada('accion')) {
        this.bloqueoEntrada = false;
      }
      return;
    }

    // --- Movimiento del jugador (top-down) ---
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

    // Aplicar movimiento con factor de tiempo
    const factorTiempo = dt * 60;
    jugador.x += jugador.velocidadX * factorTiempo;
    jugador.y += jugador.velocidadY * factorTiempo;

    // Animación de caminar
    if (jugador.esAnimando) {
      jugador.cuadroAnimacion += 0.15;
    }

    // --- Colisión con los bordes del nivel ---
    jugador.x = Math.max(0, Math.min(this.anchoNivel - jugador.ancho, jugador.x));
    jugador.y = Math.max(0, Math.min(this.altoNivel - jugador.alto, jugador.y));

    // --- Colisión con bohíos ---
    for (const bohio of this.bohios) {
      const dx = (jugador.x + jugador.ancho / 2) - bohio.x;
      const dy = (jugador.y + jugador.alto / 2) - bohio.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radioColision = bohio.radio + 10;

      if (dist < radioColision) {
        // Empujar al jugador fuera del bohío
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
          this._hablarConNPC(npc, jugador);
        }
      }
    }

    // --- Interacción con el perro callejero ---
    if (this.perroCallejero && !this.perroAdoptado) {
      this.perroCallejero.tiempoAnimCola += dt * 5;
      if (this._estaCerca(jugador, this.perroCallejero, 45)) {
        if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
          this.bloqueoEntrada = true;
          const textos = this._obtenerTextos();
          const aldea = textos?.dialogos?.aldea;
          this.dialogos.iniciarDialogo([
            { personaje: '🐕 ???', texto: aldea?.perro1 || '¡Un perro callejero! Parece amigable...' },
            { personaje: '🐕 ???', texto: aldea?.perro2 || 'El perro mueve la cola y te mira con ojos grandes.' },
            { personaje: '🐕 Viralata', texto: aldea?.perro3 || '¡Decidido! Lo llamarás Viralata. ¡Ahora te acompaña!' }
          ], () => {
            // Adoptar al perro — crear compañero Viralata
            this.perroAdoptado = true;
            const viralata = new Viralata(jugador.x - 25, jugador.y + 10);
            viralata.activar();
            this.juego.companeros.push(viralata);
            this.sfx.recoger();
          });
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
              color: '#4488CC',
              esUsable: false
            });
          }

          if (this.juego && this.juego.mostrarToast) {
            this.juego.mostrarToast(`✦ ${nombreObjeto} — ${textos?.ui?.itemAnadido || 'ítem añadido al inventario'}`);
          }
        }
      }
    }

    // --- Verificar si habló con todos los NPCs ---
    // IMPORTANTE: esto va ANTES de la salida con Q para que el progreso
    // se guarde incluso si el jugador sale rápido después del último diálogo
    this.npcsHablados = this.npcs.filter(n => n.dialogoHecho).length;
    if (this.npcsHablados >= this.totalNPCs) {
      const textos = this._obtenerTextos();
      this.misionActual = textos?.dialogos?.aldea?.misionCompleta || '¡Aldea explorada!';

      // Marcar nodo completado y desbloquear siguiente
      if (this.juego && this.juego.progreso) {
        if (!this.juego.progreso.nodosCompletados.includes(1)) {
          this.juego.progreso.nodosCompletados.push(1);
        }
        if (!this.juego.progreso.nodosDesbloqueados.includes(9)) {
          this.juego.progreso.nodosDesbloqueados.push(9);
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

    // --- Fondo: césped verde ---
    ctx.fillStyle = '#3a7a2e';
    ctx.fillRect(0, 0, ancho, alto);

    // Textura del césped (manchas de color)
    ctx.fillStyle = 'rgba(50, 140, 40, 0.3)';
    for (let gx = -1; gx < ancho / 60 + 1; gx++) {
      for (let gy = -1; gy < alto / 60 + 1; gy++) {
        const px = gx * 60 + (offsetX % 60);
        const py = gy * 60 + (offsetY % 60);
        ctx.fillRect(px + 10, py + 10, 30, 30);
      }
    }

    // --- Caminos de tierra entre los bohíos ---
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';

    // Camino principal de entrada al batey
    ctx.beginPath();
    ctx.moveTo(100 + offsetX, 800 + offsetY);
    ctx.lineTo(600 + offsetX, 450 + offsetY);
    ctx.stroke();

    // Caminos a los bohíos
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(600 + offsetX, 450 + offsetY);
    ctx.lineTo(200 + offsetX, 200 + offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(600 + offsetX, 450 + offsetY);
    ctx.lineTo(450 + offsetX, 150 + offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(600 + offsetX, 450 + offsetY);
    ctx.lineTo(850 + offsetX, 200 + offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(600 + offsetX, 450 + offsetY);
    ctx.lineTo(900 + offsetX, 500 + offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(600 + offsetX, 450 + offsetY);
    ctx.lineTo(300 + offsetX, 500 + offsetY);
    ctx.stroke();

    // --- Batey (plaza ceremonial) ---
    // El batey era un espacio plano donde los taínos jugaban al batu
    // (juego de pelota) y hacían ceremonias llamadas areítos
    const bx = this.batey.x + offsetX;
    const by = this.batey.y + offsetY;

    ctx.fillStyle = '#C8A84E';
    ctx.beginPath();
    ctx.arc(bx, by, this.batey.radio, 0, Math.PI * 2);
    ctx.fill();

    // Borde del batey con piedras
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Piedras decorativas alrededor del batey
    for (let i = 0; i < 12; i++) {
      const angulo = (i / 12) * Math.PI * 2;
      const px = bx + Math.cos(angulo) * (this.batey.radio + 8);
      const py = by + Math.sin(angulo) * (this.batey.radio + 8);
      ctx.fillStyle = '#777777';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- Árboles (detrás de los bohíos, solo los de la parte superior) ---
    for (const arbol of this.arboles) {
      if (arbol.y < jugador.y) {
        this._dibujarArbol(ctx, arbol.x + offsetX, arbol.y + offsetY, arbol);
      }
    }

    // --- Bohíos ---
    const _tLug = this._obtenerTextos()?.lugares;
    for (const bohio of this.bohios) {
      this._dibujarBohio(ctx, bohio.x + offsetX, bohio.y + offsetY, bohio, _tLug);
    }

    // --- Objetos coleccionables ---
    for (const obj of this.objetos) {
      if (obj.recogido) continue;
      const ox = obj.x + offsetX;
      const oy = obj.y + offsetY;

      // Brillo pulsante (verde para curativos, azul para normales)
      const brillo = 0.5 + Math.sin(this.tiempoTotal * 3) * 0.3;

      if (obj.esCurativo) {
        // --- Ícono de casabe (pan redondo taíno) ---
        ctx.fillStyle = `rgba(68, 204, 68, ${brillo})`;
        ctx.beginPath();
        ctx.arc(ox + 8, oy + 8, 12, 0, Math.PI * 2);
        ctx.fill();

        // Pan circular color marrón claro
        ctx.fillStyle = '#D4A860';
        ctx.beginPath();
        ctx.arc(ox + 8, oy + 8, 7, 0, Math.PI * 2);
        ctx.fill();

        // Textura del casabe (líneas cruzadas)
        ctx.strokeStyle = '#B8860B';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ox + 3, oy + 8);
        ctx.lineTo(ox + 13, oy + 8);
        ctx.moveTo(ox + 8, oy + 3);
        ctx.lineTo(ox + 8, oy + 13);
        ctx.stroke();
      } else {
        // --- Ícono brújula ---
        ctx.fillStyle = `rgba(68, 136, 204, ${brillo})`;
        ctx.beginPath();
        ctx.arc(ox + 8, oy + 8, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(ox + 8, oy + 8, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#CC3333';
        ctx.beginPath();
        ctx.moveTo(ox + 8, oy + 2);
        ctx.lineTo(ox + 10, oy + 8);
        ctx.lineTo(ox + 6, oy + 8);
        ctx.closePath();
        ctx.fill();
      }
    }

    // --- NPCs ---
    for (const npc of this.npcs) {
      this._dibujarNPC(ctx, npc, offsetX, offsetY, jugador);
    }

    // --- Perro callejero (antes de ser adoptado) ---
    if (this.perroCallejero && !this.perroAdoptado) {
      this._dibujarPerroCallejero(ctx, offsetX, offsetY, jugador);
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

    // --- Árboles delante del jugador (los de abajo tapan al jugador) ---
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

    // NPCs hablados
    renderizador.dibujarTexto(`🗣️ ${this.npcsHablados}/${this.totalNPCs}`, 15, 42, {
      tamano: 11, color: '#FFD700'
    });

    // Objetos recogidos (excluir curativos del conteo — se regeneran)
    const objetosPermanentes = this.objetos.filter(o => !o.esCurativo);
    const objRecogidos = objetosPermanentes.filter(o => o.recogido).length;
    renderizador.dibujarTexto(`📦 ${objRecogidos}/${objetosPermanentes.length}`, 15, 58, {
      tamano: 11, color: objRecogidos >= objetosPermanentes.length ? '#44CC44' : '#FFD700'
    });

    // Regalos de NPCs (Anacaona da vasija curativa)
    const alfarera = this.npcs.find(n => n.id === 'alfarera');
    const regalosRecibidos = alfarera?.dialogoHecho ? 1 : 0;
    const totalRegalos = 1;
    renderizador.dibujarTexto(`🎁 ${regalosRecibidos}/${totalRegalos}`, 15, 74, {
      tamano: 11, color: regalosRecibidos >= totalRegalos ? '#44CC44' : '#FFD700'
    });

    // Misión actual
    renderizador.dibujarTexto(this.misionActual, ancho - 10, 20, {
      tamano: 12, color: '#CCCCCC', alineacion: 'right'
    });

    // --- Diálogo ---
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto, textos);
    }

    // --- Controles ---
    if (!this.dialogos.estaActivo()) {
      const texControles = this._obtenerTextos()?.ui?.controlesAldea || 'WASD: mover | E: hablar | I: inventario | M: mapa | P: fotos | L: misiones';
      renderizador.dibujarTexto(texControles, ancho / 2, alto - 10, {
        tamano: 10, color: '#555555', alineacion: 'center'
      });
    }
  }

  // ============================================================
  // DIBUJO DE ELEMENTOS
  // ============================================================

  // --- Dibujar un bohío taíno ---
  // Los bohíos eran casas circulares hechas de madera y hojas de palma.
  // El caney era rectangular y más grande — la casa del cacique.
  _dibujarBohio(ctx, x, y, bohio, _tLug) {
    const r = bohio.radio;

    if (bohio.tipo === 'caney') {
      // Caney: casa rectangular del cacique, más grande y elaborada
      // Base de madera
      ctx.fillStyle = '#8B6914';
      ctx.fillRect(x - r, y - r * 0.6, r * 2, r * 1.2);

      // Techo triangular de hojas (cana)
      ctx.fillStyle = '#5a7a2e';
      ctx.beginPath();
      ctx.moveTo(x - r - 10, y - r * 0.6);
      ctx.lineTo(x, y - r * 1.3);
      ctx.lineTo(x + r + 10, y - r * 0.6);
      ctx.closePath();
      ctx.fill();

      // Líneas del techo (hojas de palma)
      ctx.strokeStyle = '#4a6a20';
      ctx.lineWidth = 1;
      for (let i = -r; i <= r; i += 12) {
        ctx.beginPath();
        ctx.moveTo(x + i, y - r * 0.6);
        ctx.lineTo(x, y - r * 1.3);
        ctx.stroke();
      }

      // Puerta
      ctx.fillStyle = '#3a2a0a';
      ctx.fillRect(x - 8, y - r * 0.6 + r * 0.4, 16, r * 0.8);
    } else {
      // Bohío circular: la casa común taína
      // Base circular de madera
      ctx.fillStyle = '#8B6914';
      ctx.beginPath();
      ctx.arc(x, y, r * 0.7, 0, Math.PI * 2);
      ctx.fill();

      // Techo cónico de hojas (se ve como un círculo más grande)
      ctx.fillStyle = '#5a7a2e';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      // Capas del techo (anillos concéntricos simulando hojas)
      ctx.strokeStyle = '#4a6a20';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, r * 0.7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, r * 0.4, 0, Math.PI * 2);
      ctx.stroke();

      // Punta central del techo
      ctx.fillStyle = '#8B6914';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Puerta (abertura oscura)
      ctx.fillStyle = '#3a2a0a';
      ctx.beginPath();
      ctx.arc(x, y + r * 0.5, 8, 0, Math.PI);
      ctx.fill();
    }

    // Nombre del bohío
    ctx.font = '9px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText(_tLug?.[bohio.clave] || bohio.nombre, x, y + r + 15);
    ctx.textAlign = 'left';
  }

  // --- Dibujar un NPC ---
  _dibujarNPC(ctx, npc, offsetX, offsetY, jugador) {
    const nx = npc.x + offsetX;
    const ny = npc.y + offsetY;

    // Cuerpo
    ctx.fillStyle = npc.color;
    ctx.fillRect(nx, ny, npc.ancho, npc.alto);

    // Cabeza (tono piel taíno)
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
    if (npc.id === 'cacique') {
      // Corona de plumas (el cacique usaba un guanín dorado)
      ctx.fillStyle = '#FFD700';
      for (let i = 0; i < 5; i++) {
        const px = nx + 4 + i * 4;
        ctx.fillRect(px, ny - 16, 3, 6);
      }
    } else if (npc.id === 'alfarera') {
      // Vasija en las manos
      ctx.fillStyle = '#B8860B';
      ctx.beginPath();
      ctx.arc(nx + 14, ny + npc.alto - 4, 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (npc.id === 'pescador') {
      // Caña de pescar
      ctx.strokeStyle = '#8B7355';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(nx + npc.ancho, ny + 5);
      ctx.lineTo(nx + npc.ancho + 15, ny - 10);
      ctx.stroke();
      // Hilo
      ctx.strokeStyle = '#CCCCCC';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(nx + npc.ancho + 15, ny - 10);
      ctx.lineTo(nx + npc.ancho + 15, ny + 5);
      ctx.stroke();
    }

    // Nombre flotante
    ctx.font = '10px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(npc.nombre, nx + npc.ancho / 2, ny - 20);

    // Indicador de interacción — curanderos siempre muestran [E]
    if (this._estaCerca(jugador, npc, 45) && (!npc.dialogoHecho || npc.esCurandero)) {
      const parpadeo = Math.sin(this.tiempoTotal * 4) > 0 ? 1 : 0.4;
      ctx.font = '11px monospace';
      ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
      const texHablar = this._obtenerTextos()?.ui?.eHablar || '[E] Hablar';
      ctx.fillText(texHablar, nx + npc.ancho / 2, ny - 32);
    }

    // Palomita si ya habló con el NPC (no para curanderos)
    if (npc.dialogoHecho && !npc.esCurandero) {
      ctx.font = 'bold 14px monospace';
      ctx.fillStyle = '#44CC44';
      ctx.fillText('✓', nx + npc.ancho / 2, ny - 32);
    }

    ctx.textAlign = 'left';
  }

  // --- Dibujar al jugador (top-down, sprite detallado) ---
  _dibujarJugador(ctx, jugador, offsetX, offsetY) {
    const px = jugador.x + offsetX;
    const py = jugador.y + offsetY;
    const genero = jugador.genero || 'pepito';

    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(px + jugador.ancho / 2, py + jugador.alto + 2, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cuerpo
    const colorCuerpo = genero === 'pepito' ? '#4488ff' : '#aa44ff';
    ctx.fillStyle = colorCuerpo;
    ctx.fillRect(px + 4, py + 10, 20, 16);

    // Cabeza
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(px + 6, py, 16, 14);

    // Cabello
    ctx.fillStyle = genero === 'pepito' ? '#2a1a0a' : '#1a0a00';
    if (genero === 'pepito') {
      ctx.fillRect(px + 5, py - 2, 18, 6);
    } else {
      ctx.fillRect(px + 4, py - 2, 20, 6);
      ctx.fillRect(px + 3, py + 2, 4, 10);
      ctx.fillRect(px + 21, py + 2, 4, 10);
    }

    // Ojos (miran en la dirección del movimiento)
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

    // Piernas (animadas al caminar)
    ctx.fillStyle = '#2a5599';
    const pasoAnim = jugador.esAnimando ? Math.sin(jugador.cuadroAnimacion * 5) * 3 : 0;
    ctx.fillRect(px + 6, py + 26 + pasoAnim, 7, 8);
    ctx.fillRect(px + 15, py + 26 - pasoAnim, 7, 8);

    // Zapatos
    ctx.fillStyle = '#4a3520';
    ctx.fillRect(px + 5, py + 32 + pasoAnim, 8, 3);
    ctx.fillRect(px + 15, py + 32 - pasoAnim, 8, 3);
  }

  // --- Dibujar un árbol ---
  _dibujarArbol(ctx, x, y, arbol) {
    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.beginPath();
    ctx.ellipse(x, y + arbol.tamano * 0.5, arbol.tamano * 0.8, arbol.tamano * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tronco
    ctx.fillStyle = arbol.colorTronco;
    ctx.fillRect(x - 3, y - arbol.tamano * 0.3, 6, arbol.tamano * 0.8);

    // Copa (palmera tropical)
    ctx.fillStyle = arbol.colorCopa;
    ctx.beginPath();
    ctx.arc(x, y - arbol.tamano * 0.3, arbol.tamano * 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Hojas de palma (líneas radiales)
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

  // --- Dibujar el perro callejero antes de ser adoptado ---
  _dibujarPerroCallejero(ctx, offsetX, offsetY, jugador) {
    const perro = this.perroCallejero;
    const px = perro.x + offsetX;
    const py = perro.y + offsetY;

    // Cuerpo (marrón)
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(px, py, 22, 14);

    // Cabeza
    ctx.fillStyle = '#A0522D';
    ctx.fillRect(px + 16, py - 4, 10, 12);

    // Ojito
    ctx.fillStyle = '#000000';
    ctx.fillRect(px + 22, py - 1, 2, 2);

    // Nariz
    ctx.fillStyle = '#333333';
    ctx.fillRect(px + 25, py + 2, 2, 2);

    // Oreja caída
    ctx.fillStyle = '#6B3410';
    ctx.fillRect(px + 17, py - 7, 5, 5);

    // Patitas
    ctx.fillStyle = '#6B3410';
    ctx.fillRect(px + 2, py + 14, 4, 5);
    ctx.fillRect(px + 14, py + 14, 4, 5);

    // Cola (siempre moviéndose — el perro es amigable)
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px, py + 2);
    const movCola = Math.sin(perro.tiempoAnimCola) * 5;
    ctx.lineTo(px - 8, py - 3 + movCola);
    ctx.stroke();

    // Indicador de interacción
    if (this._estaCerca(jugador, perro, 45)) {
      const parpadeo = Math.sin(this.tiempoTotal * 4) > 0 ? 1 : 0.4;
      ctx.font = '11px monospace';
      ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
      ctx.textAlign = 'center';
      const texAdoptar = this._obtenerTextos()?.ui?.eAdoptar || '[E] Adoptar';
      ctx.fillText(texAdoptar, px + 11, py - 14);
      ctx.textAlign = 'left';
    }
  }

  // --- Hablar con un NPC ---
  _hablarConNPC(npc, jugador) {
    const textos = this._obtenerTextos();
    const aldea = textos?.dialogos?.aldea;

    if (npc.id === 'cacique') {
      this.dialogos.iniciarDialogo([
        { personaje: '👑 Cacique Guacanagaríx', texto: aldea?.cacique1 || '¡Bienvenido a nuestra aldea!' },
        { personaje: '👑 Cacique Guacanagaríx', texto: aldea?.cacique2 || 'Soy el cacique de este yucayeque.' },
        { personaje: '👑 Cacique Guacanagaríx', texto: aldea?.cacique3 || 'Nuestro pueblo vive en armonía con la tierra.' },
        { personaje: '👑 Cacique Guacanagaríx', texto: aldea?.cacique4 || 'Habla con los aldeanos para aprender sobre nuestra cultura.' }
      ], () => { npc.dialogoHecho = true; });
    } else if (npc.id === 'alfarera') {
      // Anacaona da vasija curativa al jugador (usable desde inventario)
      const yaTieneVasija = this.juego?.inventario?.tieneObjeto('vasijaCurativa');

      // Re-visita: ofrece sidequest de Enriquillo si aún no descubierta
      if (npc.dialogoHecho) {
        const misiones = this.juego?.misiones;
        const questEnriquillo = misiones && !misiones.estaDescubierta('idoloEnriquillo');

        if (questEnriquillo && !this.juego?.progreso?.idoloCemiEntregado) {
          // Descubrir la sidequest del ídolo para Enriquillo
          this.dialogos.iniciarDialogo([
            { personaje: '🏺 Anacaona', texto: aldea?.anacaonaIdolo1 || 'Tengo algo importante que pedirte.' },
            { personaje: '🏺 Anacaona', texto: aldea?.anacaonaIdolo2 || 'He tallado un cemí sagrado. Necesito que se lo lleves a Enriquillo, en el Lago Enriquillo.' },
            { personaje: '🏺 Anacaona', texto: aldea?.anacaonaIdolo3 || 'Enriquillo lucha contra los españoles en las montañas del Bahoruco. Este cemí le dará fuerza espiritual.' },
            { personaje: '🏺 Anacaona', texto: aldea?.anacaonaIdolo4 || 'El lago está al suroeste de la isla. Cuidado con los cocodrilos — la Isla Cabritos está en el centro del lago.' }
          ], () => {
            // Dar el ídolo cemí al jugador
            const t = textos?.objetos || {};
            if (this.juego.jugador) this.juego.jugador.agregarAlInventario({ nombre: 'idoloCemi' });
            if (this.juego.inventario) {
              this.juego.inventario.agregar({
                id: 'idoloCemi',
                nombre: t.idoloCemi || 'Ídolo Cemí Sagrado',
                descripcion: t.descIdoloCemi || 'Cemí tallado por Anacaona. Llévalo a Enriquillo en el Lago Enriquillo.',
                tipo: 'clave', cantidad: 1, color: '#DAA520', esUsable: false
              });
            }
            this.sfx.recoger();
            if (this.juego.mostrarToast) {
              this.juego.mostrarToast(`✦ ${t.idoloCemi || 'Ídolo Cemí Sagrado'} — ${textos?.ui?.itemAnadido || 'ítem añadido al inventario'}`);
            }
            // Descubrir e iniciar la sidequest
            if (misiones) {
              misiones.descubrir('idoloEnriquillo');
              misiones.iniciar('idoloEnriquillo');
              const mis = textos?.misiones || {};
              this.juego.mostrarToast(
                (textos?.ui?.misionDescubierta || '📋 Misión descubierta:') + ' ' +
                (mis.idoloEnriquilloTitulo || 'El Ídolo de Enriquillo'));
              this.juego.registro?.agregarEntrada('secundaria',
                mis.idoloEnriquilloTitulo || 'El Ídolo de Enriquillo',
                mis.idoloEnriquilloDesc || 'Llevar el cemí sagrado a Enriquillo en el Lago Enriquillo.');
            }
            // Desbloquear nodo del Lago Enriquillo
            if (this.juego.progreso && !this.juego.progreso.nodosDesbloqueados.includes(10)) {
              this.juego.progreso.nodosDesbloqueados.push(10);
            }
          });
          return;
        }

        if (!yaTieneVasija) {
          this.dialogos.iniciarDialogo([
            { personaje: '🏺 Anacaona', texto: aldea?.alfarerVasija || 'Toma otra vasija curativa. ¡Cuídate en el camino!' }
          ], () => {
            const t = textos?.objetos || {};
            this.juego.inventario.agregar({
              id: 'vasijaCurativa',
              nombre: t.vasijaCurativa || 'Vasija Curativa',
              descripcion: t.descVasijaCurativa || 'Vasija con pulpa de higüero, savia de maguey y tuna. Restaura 35 de vida.',
              tipo: 'curacion', cantidad: 1, color: '#B8860B', esUsable: true, valor: 35
            });
            this.sfx.recoger();
            if (this.juego.mostrarToast) {
              this.juego.mostrarToast(`✦ ${t.vasijaCurativa || 'Vasija Curativa'} — ${textos?.ui?.itemAnadidoBrief || 'ítem añadido'}`);
            }
          });
        } else {
          this.dialogos.iniciarDialogo([
            { personaje: '🏺 Anacaona', texto: aldea?.alfareraSaludo || '¡Sigue creando arte con la arcilla de nuestra tierra!' }
          ]);
        }
        return;
      }

      // Primera visita: diálogo completo + dar vasija
      this.dialogos.iniciarDialogo([
        { personaje: '🏺 Anacaona', texto: aldea?.alfarera1 || '¡Hola! Estoy haciendo una vasija de barro.' },
        { personaje: '🏺 Anacaona', texto: aldea?.alfarera2 || 'Los taínos éramos grandes alfareros.' },
        { personaje: '🏺 Anacaona', texto: aldea?.alfarera3 || 'Hacíamos ollas, platos y burenes para cocinar el casabe.' },
        { personaje: '🏺 Anacaona', texto: aldea?.alfarera4 || 'El casabe se hace con yuca rallada — ¡es delicioso!' },
        { personaje: '🏺 Anacaona', texto: aldea?.alfarerVasija || 'Toma esta vasija con pulpa de higüero, savia de maguey y tuna. ¡Te curará!' }
      ], () => {
        npc.dialogoHecho = true;
        if (this.juego?.inventario) {
          const t = textos?.objetos || {};
          this.juego.inventario.agregar({
            id: 'vasijaCurativa',
            nombre: t.vasijaCurativa || 'Vasija Curativa',
            descripcion: t.descVasijaCurativa || 'Vasija con pulpa de higüero, savia de maguey y tuna. Restaura 35 de vida.',
            tipo: 'curacion', cantidad: 1, color: '#B8860B', esUsable: true, valor: 35
          });
          this.sfx.recoger();
          if (this.juego.mostrarToast) {
            this.juego.mostrarToast(`✦ ${t.vasijaCurativa || 'Vasija Curativa'} — ${textos?.ui?.itemAnadidoBrief || 'ítem añadido'}`);
          }
        }
      });
    } else if (npc.id === 'pescador') {
      this.dialogos.iniciarDialogo([
        { personaje: '🐟 Caonabó', texto: aldea?.pescador1 || '¡Buenos días! Hoy la pesca ha sido buena.' },
        { personaje: '🐟 Caonabó', texto: aldea?.pescador2 || 'Los taínos pescábamos con redes, nasas y anzuelos de hueso.' },
        { personaje: '🐟 Caonabó', texto: aldea?.pescador3 || 'También usábamos canoas talladas en un solo tronco de árbol.' },
        { personaje: '🐟 Caonabó', texto: aldea?.pescador4 || '¡Algunas canoas podían llevar hasta 50 personas!' }
      ], () => { npc.dialogoHecho = true; });
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
