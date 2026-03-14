// ============================================================
// LA-ISABELA.JS - Primer asentamiento europeo en América
// ============================================================
// La Isabela fue la primera ciudad fundada por los europeos en
// el Nuevo Mundo (1494, por Cristóbal Colón). Hoy sus ruinas
// están en Puerto Plata, República Dominicana.
//
// Este nivel introduce el Mundo Colonial y el sistema de combate.
// El jugador encuentra un soldado español que custodia las ruinas
// y debe convencerlo pacíficamente de que lo deje explorar.
//
// MODO: Top-down (vista desde arriba, sin gravedad)
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';

export class LaIsabela {

  constructor() {
    // --- Dimensiones del nivel ---
    this.anchoNivel = 1600;
    this.altoNivel = 1100;

    // --- Cámara ---
    this.camaraX = 0;
    this.camaraY = 0;

    // --- Estructuras coloniales ---
    this.edificios = [];

    // --- NPCs ---
    this.npcs = [];

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
    this.totalNPCs = 4;

    // --- Combate ---
    // El soldado guardián inicia un combate la primera vez
    this.combateIniciado = false;
    this.combateTerminado = false;

    // --- Referencia al juego ---
    this.juego = null;
  }

  // --- Construir La Isabela ---
  iniciar(juego) {
    this.juego = juego;

    // Poner al jugador en modo top-down
    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';
      juego.jugador.x = 100;
      juego.jugador.y = 900;
      juego.jugador.direccion = 'arriba';
    }

    // --- Edificios coloniales (ruinas) ---
    // Las ruinas reales de La Isabela incluyen una iglesia, la casa
    // de Colón y un almacén/alhóndiga
    this.edificios = [
      {
        x: 400, y: 250,
        ancho: 120, alto: 80,
        tipo: 'iglesia',
        nombre: 'Iglesia (ruinas)'
      },
      {
        x: 700, y: 180,
        ancho: 100, alto: 70,
        tipo: 'casaColon',
        nombre: 'Casa de Colón'
      },
      {
        x: 1000, y: 350,
        ancho: 90, alto: 60,
        tipo: 'almacen',
        nombre: 'Alhóndiga'
      },
      {
        x: 300, y: 500,
        ancho: 80, alto: 60,
        tipo: 'torre',
        nombre: 'Torre de Vigía'
      },
      {
        x: 1200, y: 550,
        ancho: 100, alto: 70,
        tipo: 'cementerio',
        nombre: 'Cementerio Colonial'
      }
    ];

    // --- NPCs ---
    this.npcs = [
      {
        id: 'soldado',
        x: 550, y: 400,
        ancho: 28, alto: 32,
        nombre: 'Soldado Diego',
        color: '#8B0000',
        dialogoHecho: false,
        esCombate: true  // Este NPC inicia un combate
      },
      {
        id: 'cronista',
        x: 750, y: 280,
        ancho: 28, alto: 32,
        nombre: 'Fray Ramón Pané',
        color: '#4a3520',
        dialogoHecho: false,
        esCombate: false
      },
      {
        id: 'taino',
        x: 1050, y: 430,
        ancho: 28, alto: 32,
        nombre: 'Guatiguaná',
        color: '#B8860B',
        dialogoHecho: false,
        esCombate: false
      },
      {
        // Roberto Cassá — historiador dominicano real.
        // Está investigando el sitio y quiere intercambiar
        // información por artefactos coloniales.
        id: 'historiador',
        x: 1350, y: 450,
        ancho: 28, alto: 32,
        nombre: 'Roberto Cassá',
        color: '#2a4a6a',
        dialogoHecho: false,
        esCombate: false
      }
    ];

    // --- Objetos coleccionables ---
    // El magnetómetro aparece junto a la iglesia DESPUÉS de resolver
    // el encuentro con el soldado (está bajo escombros que Diego custodiaba).
    // El arcabuz aparece junto a la Alhóndiga (almacén de armas coloniales).
    this.objetos = [
      {
        x: 440, y: 345,
        ancho: 16, alto: 16,
        tipo: 'magnetometro',
        recogido: false,
        requiereCombate: true
      },
      {
        // Arcabuz — arma colonial que el jugador intercambiará con
        // Roberto Cassá por un mapa de los sitios coloniales
        x: 1010, y: 420,
        ancho: 16, alto: 16,
        tipo: 'arcabuz',
        recogido: false,
        requiereCombate: true  // Solo visible tras resolver el combate
      }
    ];

    // --- Árboles tropicales ---
    this.arboles = [];
    const posiciones = [
      [50, 100], [200, 50], [1400, 120], [1500, 400],
      [1450, 800], [50, 750], [1350, 900], [800, 950],
      [100, 400], [1300, 250], [600, 850], [950, 100],
      [1100, 150], [250, 850]
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
    this.misionActual = textos?.dialogos?.isabela?.misionHablar || 'Explora las ruinas de La Isabela';
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, jugador, companeros) {
    if (!jugador) return;

    this.tiempoTotal += dt;

    // --- Si hay combate activo, lo maneja juego.js ---
    if (this.juego && this.juego.combate.enCombate) {
      return;
    }

    // --- Verificar si el combate TERMINÓ (resultado disponible) ---
    // Esto va FUERA del bloque enCombate porque cuando el combate
    // termina, enCombate ya es false pero el resultado está guardado
    if (this.combateIniciado && !this.combateTerminado && this.juego.combate.resultado) {
      this.combateTerminado = true;
      const soldado = this.npcs.find(n => n.id === 'soldado');
      if (soldado) {
        soldado.esCombate = false;
        soldado.dialogoHecho = true;
      }

      // --- Rastrear resultado para el sistema de finales ---
      if (this.juego.combate.resultado === 'pacificado') {
        this.juego.progreso.combatesPacificados++;
      } else if (this.juego.combate.resultado === 'victoria') {
        this.juego.progreso.combatesViolentos++;
      }

      // Mostrar un diálogo de resolución según el resultado
      const textos = this._obtenerTextos();
      const isabela = textos?.dialogos?.isabela;
      if (this.juego.combate.resultado === 'pacificado') {
        this.dialogos.iniciarDialogo([
          { personaje: '⚔️ Soldado Diego', texto: isabela?.soldadoPaz1 || 'Tienes razón... estas ruinas deben ser protegidas.' },
          { personaje: '⚔️ Soldado Diego', texto: isabela?.soldadoPaz2 || 'La Isabela fue fundada en 1494. Es la primera ciudad europea en América.' }
        ]);
      } else if (this.juego.combate.resultado === 'victoria') {
        this.dialogos.iniciarDialogo([
          { personaje: '⚔️ Soldado Diego', texto: '¡Agh! Me rindo... explora las ruinas si quieres.' }
        ]);
      }
    }

    // --- Diálogo activo ---
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

    // --- Colisión con edificios ---
    for (const edificio of this.edificios) {
      if (jugador.x + jugador.ancho > edificio.x &&
          jugador.x < edificio.x + edificio.ancho &&
          jugador.y + jugador.alto > edificio.y &&
          jugador.y < edificio.y + edificio.alto) {
        // Empujar al jugador fuera del edificio
        const dx = (jugador.x + jugador.ancho / 2) - (edificio.x + edificio.ancho / 2);
        const dy = (jugador.y + jugador.alto / 2) - (edificio.y + edificio.alto / 2);

        if (Math.abs(dx) > Math.abs(dy)) {
          jugador.x = dx > 0 ? edificio.x + edificio.ancho : edificio.x - jugador.ancho;
        } else {
          jugador.y = dy > 0 ? edificio.y + edificio.alto : edificio.y - jugador.alto;
        }
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

    // --- Recoger objetos ---
    for (const obj of this.objetos) {
      if (obj.recogido) continue;
      // Algunos objetos solo aparecen tras resolver el combate
      if (obj.requiereCombate && !this.combateTerminado) continue;
      if (this._estaCerca(jugador, obj, 25)) {
        obj.recogido = true;
        this.sfx.recoger();

        const textos = this._obtenerTextos();
        const nombreObjeto = textos?.objetos?.[obj.tipo] || obj.tipo;
        jugador.agregarAlInventario({ nombre: obj.tipo });

        if (this.juego && this.juego.inventario) {
          this.juego.inventario.agregar({
            id: obj.tipo,
            nombre: nombreObjeto,
            descripcion: textos?.objetos?.[`desc${obj.tipo.charAt(0).toUpperCase() + obj.tipo.slice(1)}`] || '',
            tipo: 'herramienta',
            cantidad: 1,
            color: '#44AACC',
            esUsable: false
          });
        }

        // Mostrar mensaje flotante indicando qué objeto se recogió
        if (this.juego && this.juego.mostrarToast) {
          this.juego.mostrarToast(`✦ ${nombreObjeto} — ítem añadido al inventario`);
        }
      }
    }

    // --- Verificar misión ---
    // IMPORTANTE: va ANTES de la salida para guardar progreso
    this.npcsHablados = this.npcs.filter(n => n.dialogoHecho).length;
    if (this.npcsHablados >= this.totalNPCs) {
      const textos = this._obtenerTextos();
      this.misionActual = textos?.dialogos?.isabela?.misionCompleta || '¡La Isabela explorada!';

      if (this.juego && this.juego.progreso) {
        if (!this.juego.progreso.nodosCompletados.includes(3)) {
          this.juego.progreso.nodosCompletados.push(3);
        }
        // Desbloquear la Zona Colonial (nodo 4) si el jugador
        // tiene el mapa colonial que le dio Roberto Cassá
        const tieneMapaColonial = this.juego.inventario &&
          this.juego.inventario.objetos.some(o => o.id === 'mapaColonial');
        if (tieneMapaColonial && !this.juego.progreso.nodosDesbloqueados.includes(4)) {
          this.juego.progreso.nodosDesbloqueados.push(4);
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

    // --- Fondo: tierra seca y arena (zona costera caribeña) ---
    const gradiente = ctx.createLinearGradient(0, 0, 0, alto);
    gradiente.addColorStop(0, '#7a8a5a');   // Verde oliva (tierra adentro)
    gradiente.addColorStop(0.7, '#b8a878'); // Arena (cerca de la costa)
    gradiente.addColorStop(1, '#d4c898');   // Arena clara
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, ancho, alto);

    // Textura del suelo (piedras y tierra)
    ctx.fillStyle = 'rgba(140, 120, 90, 0.2)';
    for (let gx = -1; gx < ancho / 50 + 1; gx++) {
      for (let gy = -1; gy < alto / 50 + 1; gy++) {
        const px = gx * 50 + (offsetX % 50);
        const py = gy * 50 + (offsetY % 50);
        ctx.fillRect(px + 8, py + 8, 25, 25);
      }
    }

    // --- Mar al fondo (La Isabela está en la costa norte) ---
    ctx.fillStyle = 'rgba(30, 90, 160, 0.35)';
    ctx.fillRect(0, 0 + offsetY, ancho + 200, 60);

    // Olas
    ctx.strokeStyle = 'rgba(200, 220, 255, 0.3)';
    ctx.lineWidth = 2;
    for (let w = 0; w < ancho + 200; w += 40) {
      const wy = 50 + offsetY + Math.sin(this.tiempoTotal * 2 + w * 0.05) * 5;
      ctx.beginPath();
      ctx.moveTo(w, wy);
      ctx.quadraticCurveTo(w + 20, wy - 5, w + 40, wy);
      ctx.stroke();
    }

    // --- Caminos de piedra ---
    ctx.strokeStyle = '#8a7a60';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';

    // Camino principal de entrada
    ctx.beginPath();
    ctx.moveTo(100 + offsetX, 950 + offsetY);
    ctx.lineTo(550 + offsetX, 500 + offsetY);
    ctx.stroke();

    // Caminos entre edificios
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(550 + offsetX, 500 + offsetY);
    ctx.lineTo(450 + offsetX, 300 + offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(550 + offsetX, 500 + offsetY);
    ctx.lineTo(750 + offsetX, 250 + offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(550 + offsetX, 500 + offsetY);
    ctx.lineTo(1050 + offsetX, 400 + offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(550 + offsetX, 500 + offsetY);
    ctx.lineTo(300 + offsetX, 530 + offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(1050 + offsetX, 400 + offsetY);
    ctx.lineTo(1250 + offsetX, 580 + offsetY);
    ctx.stroke();
    // Camino hacia Roberto Cassá (al este del mapa)
    ctx.beginPath();
    ctx.moveTo(1050 + offsetX, 400 + offsetY);
    ctx.lineTo(1350 + offsetX, 460 + offsetY);
    ctx.stroke();

    // --- Edificios coloniales (ruinas de piedra) ---
    for (const edificio of this.edificios) {
      this._dibujarEdificio(ctx, edificio.x + offsetX, edificio.y + offsetY, edificio);
    }

    // --- Árboles detrás del jugador ---
    for (const arbol of this.arboles) {
      if (arbol.y < jugador.y) {
        this._dibujarArbol(ctx, arbol.x + offsetX, arbol.y + offsetY, arbol);
      }
    }

    // --- Objetos coleccionables ---
    for (const obj of this.objetos) {
      if (obj.recogido) continue;
      // No dibujar si requiere combate y aún no se ha resuelto
      if (obj.requiereCombate && !this.combateTerminado) continue;
      const ox = obj.x + offsetX;
      const oy = obj.y + offsetY;

      // Brillo pulsante alrededor del objeto
      const brillo = 0.5 + Math.sin(this.tiempoTotal * 3) * 0.3;
      const colorBrillo = obj.tipo === 'arcabuz'
        ? `rgba(200, 170, 50, ${brillo})`
        : `rgba(68, 170, 204, ${brillo})`;
      ctx.fillStyle = colorBrillo;
      ctx.beginPath();
      ctx.arc(ox + 8, oy + 8, 12, 0, Math.PI * 2);
      ctx.fill();

      if (obj.tipo === 'magnetometro') {
        // Ícono magnetómetro (detector de metales)
        ctx.strokeStyle = '#555555';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ox + 8, oy + 2);
        ctx.lineTo(ox + 8, oy + 12);
        ctx.stroke();
        ctx.fillStyle = '#44AACC';
        ctx.beginPath();
        ctx.ellipse(ox + 8, oy + 13, 6, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#44FF44';
        ctx.fillRect(ox + 7, oy + 2, 3, 3);

      } else if (obj.tipo === 'arcabuz') {
        // Ícono arcabuz (arma colonial — cañón largo + culata de madera)
        // Cañón metálico
        ctx.fillStyle = '#888888';
        ctx.fillRect(ox + 2, oy + 7, 12, 3);
        // Culata de madera
        ctx.fillStyle = '#6B4226';
        ctx.fillRect(ox + 1, oy + 6, 5, 5);
        // Detalle de la mecha
        ctx.fillStyle = '#CC8844';
        ctx.fillRect(ox + 6, oy + 5, 2, 2);
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

    renderizador.dibujarTexto(this.misionActual, ancho - 10, 20, {
      tamano: 12, color: '#CCCCCC', alineacion: 'right'
    });

    // --- Indicador de F para Magnoboot ---
    if (companeros && companeros.some(c => c.tipo === 'magnoboot' && c.activo)) {
      renderizador.dibujarTexto('[F] Detectar Metal', 15, 60, {
        tamano: 10, color: '#44FFFF'
      });
    }

    // --- Diálogo ---
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto);
    }

    // --- Controles ---
    if (!this.dialogos.estaActivo()) {
      renderizador.dibujarTexto('WASD: mover | E: hablar | F: habilidad | I: inventario | M: mapa', ancho / 2, alto - 10, {
        tamano: 10, color: '#555555', alineacion: 'center'
      });
    }
  }

  // ============================================================
  // DIBUJO DE ELEMENTOS
  // ============================================================

  // --- Dibujar edificio colonial (ruinas de piedra) ---
  _dibujarEdificio(ctx, x, y, edificio) {
    const a = edificio.ancho;
    const h = edificio.alto;

    if (edificio.tipo === 'iglesia') {
      // Muros de piedra (ruinas — bordes irregulares)
      ctx.fillStyle = '#a09070';
      ctx.fillRect(x, y, a, h);

      // Piedras visibles en los muros
      ctx.strokeStyle = '#887060';
      ctx.lineWidth = 1;
      for (let i = 0; i < a; i += 15) {
        for (let j = 0; j < h; j += 10) {
          ctx.strokeRect(x + i + (j % 2 === 0 ? 0 : 7), y + j, 14, 9);
        }
      }

      // Arco de la entrada (la iglesia tenía un arco de piedra)
      ctx.fillStyle = '#3a2a1a';
      ctx.beginPath();
      ctx.arc(x + a / 2, y + h - 10, 12, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(x + a / 2 - 12, y + h - 10, 24, 10);

      // Cruz en la parte superior (aún visible en las ruinas)
      ctx.strokeStyle = '#c0b090';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + a / 2, y - 15);
      ctx.lineTo(x + a / 2, y + 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + a / 2 - 8, y - 8);
      ctx.lineTo(x + a / 2 + 8, y - 8);
      ctx.stroke();

    } else if (edificio.tipo === 'casaColon') {
      // Casa más elaborada con techo
      ctx.fillStyle = '#b0a080';
      ctx.fillRect(x, y, a, h);

      // Piedras
      ctx.strokeStyle = '#907060';
      ctx.lineWidth = 1;
      for (let i = 0; i < a; i += 12) {
        for (let j = 0; j < h; j += 8) {
          ctx.strokeRect(x + i, y + j, 11, 7);
        }
      }

      // Techo (parcialmente intacto)
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.moveTo(x - 5, y);
      ctx.lineTo(x + a / 2, y - 20);
      ctx.lineTo(x + a + 5, y);
      ctx.closePath();
      ctx.fill();

      // Puerta
      ctx.fillStyle = '#4a3020';
      ctx.fillRect(x + a / 2 - 8, y + h - 18, 16, 18);

      // Ventana
      ctx.fillStyle = '#2a1a0a';
      ctx.fillRect(x + 10, y + 15, 12, 10);

    } else if (edificio.tipo === 'almacen') {
      // Almacén más simple y cuadrado
      ctx.fillStyle = '#9a8a70';
      ctx.fillRect(x, y, a, h);
      ctx.strokeStyle = '#807060';
      ctx.lineWidth = 1;
      for (let i = 0; i < a; i += 10) {
        ctx.beginPath();
        ctx.moveTo(x + i, y);
        ctx.lineTo(x + i, y + h);
        ctx.stroke();
      }
      ctx.fillStyle = '#3a2a1a';
      ctx.fillRect(x + a / 2 - 10, y + h - 15, 20, 15);

    } else if (edificio.tipo === 'torre') {
      // Torre de vigía (más alta que ancha)
      ctx.fillStyle = '#a09878';
      ctx.fillRect(x, y, a, h);
      // Almenas arriba
      for (let i = 0; i < a; i += 12) {
        ctx.fillRect(x + i, y - 8, 8, 8);
      }
      // Abertura
      ctx.fillStyle = '#2a1a0a';
      ctx.fillRect(x + a / 2 - 5, y + 15, 10, 12);

    } else if (edificio.tipo === 'cementerio') {
      // Suelo del cementerio
      ctx.fillStyle = 'rgba(80, 70, 50, 0.3)';
      ctx.fillRect(x, y, a, h);

      // Cruces (tumbas de los primeros colonos)
      ctx.strokeStyle = '#908070';
      ctx.lineWidth = 2;
      for (let i = 0; i < 4; i++) {
        const cx = x + 15 + i * 22;
        const cy = y + 15 + (i % 2) * 25;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, cy + 18);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 6, cy + 6);
        ctx.lineTo(cx + 6, cy + 6);
        ctx.stroke();
      }

      // Muro bajo alrededor
      ctx.strokeStyle = '#807060';
      ctx.lineWidth = 3;
      ctx.strokeRect(x - 2, y - 2, a + 4, h + 4);
    }

    // Nombre
    ctx.font = '9px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText(edificio.nombre, x + a / 2, y + h + 15);
    ctx.textAlign = 'left';
  }

  // --- Dibujar NPC ---
  _dibujarNPC(ctx, npc, offsetX, offsetY, jugador) {
    const nx = npc.x + offsetX;
    const ny = npc.y + offsetY;

    // Cuerpo
    ctx.fillStyle = npc.color;
    ctx.fillRect(nx, ny, npc.ancho, npc.alto);

    // Cabeza
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(nx + 4, ny - 10, 20, 12);

    // Ojos
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(nx + 8, ny - 6, 4, 4);
    ctx.fillRect(nx + 16, ny - 6, 4, 4);
    ctx.fillStyle = '#000000';
    ctx.fillRect(nx + 9, ny - 5, 2, 2);
    ctx.fillRect(nx + 17, ny - 5, 2, 2);

    // Decoración según NPC
    if (npc.id === 'soldado') {
      // Casco de conquistador (morrión)
      ctx.fillStyle = '#808080';
      ctx.fillRect(nx + 2, ny - 16, 24, 8);
      ctx.fillRect(nx + 8, ny - 20, 12, 6);

      // Espada al lado
      ctx.strokeStyle = '#AAAAAA';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(nx + npc.ancho, ny + 8);
      ctx.lineTo(nx + npc.ancho + 10, ny + npc.alto);
      ctx.stroke();
      ctx.fillStyle = '#DAA520';
      ctx.fillRect(nx + npc.ancho - 2, ny + 6, 6, 4);

    } else if (npc.id === 'cronista') {
      // Hábito de fraile (marrón oscuro)
      ctx.fillStyle = '#3a2a1a';
      ctx.fillRect(nx + 2, ny + 2, npc.ancho - 4, npc.alto - 4);

      // Libro
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(nx - 8, ny + 10, 10, 14);
      ctx.fillStyle = '#EEEECC';
      ctx.fillRect(nx - 6, ny + 12, 6, 10);

    } else if (npc.id === 'taino') {
      // Collar de conchas
      ctx.fillStyle = '#EEEECC';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(nx + 6 + i * 4, ny, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      // Pluma
      ctx.fillStyle = '#CC4444';
      ctx.fillRect(nx + 12, ny - 18, 3, 8);

    } else if (npc.id === 'historiador') {
      // Roberto Cassá — traje de académico moderno
      // Camisa azul claro (ya es el color del cuerpo '#2a4a6a')
      // Lentes redondos
      ctx.strokeStyle = '#CCCCCC';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(nx + 10, ny - 4, 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(nx + 18, ny - 4, 4, 0, Math.PI * 2);
      ctx.stroke();
      // Puente de los lentes
      ctx.beginPath();
      ctx.moveTo(nx + 14, ny - 4);
      ctx.lineTo(nx + 14, ny - 4);
      ctx.stroke();
      // Libro bajo el brazo
      ctx.fillStyle = '#8B0000';
      ctx.fillRect(nx - 6, ny + 12, 8, 12);
      ctx.fillStyle = '#EEEECC';
      ctx.fillRect(nx - 4, ny + 14, 4, 8);
    }

    // Nombre
    ctx.font = '10px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(npc.nombre, nx + npc.ancho / 2, ny - 22);

    // Indicador de interacción
    if (this._estaCerca(jugador, npc, 45) && !npc.dialogoHecho) {
      const parpadeo = Math.sin(this.tiempoTotal * 4) > 0 ? 1 : 0.4;
      ctx.font = '11px monospace';
      ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
      const texto = npc.esCombate ? '[E] ¡Alerta!' : '[E] Hablar';
      ctx.fillText(texto, nx + npc.ancho / 2, ny - 34);
    }

    if (npc.dialogoHecho) {
      ctx.font = 'bold 14px monospace';
      ctx.fillStyle = '#44CC44';
      ctx.fillText('✓', nx + npc.ancho / 2, ny - 34);
    }

    ctx.textAlign = 'left';
  }

  // --- Dibujar jugador (top-down, igual que en los asentamientos) ---
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

    // Pelo
    ctx.fillStyle = genero === 'pepito' ? '#2a1a0a' : '#1a0a00';
    if (genero === 'pepito') {
      ctx.fillRect(px + 5, py - 2, 18, 6);
    } else {
      ctx.fillRect(px + 4, py - 2, 20, 6);
      ctx.fillRect(px + 3, py + 2, 4, 10);
      ctx.fillRect(px + 21, py + 2, 4, 10);
    }

    // Ojos
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

    // Piernas con animación
    ctx.fillStyle = '#2a5599';
    const pasoAnim = jugador.esAnimando ? Math.sin(jugador.cuadroAnimacion * 5) * 3 : 0;
    ctx.fillRect(px + 6, py + 26 + pasoAnim, 7, 8);
    ctx.fillRect(px + 15, py + 26 - pasoAnim, 7, 8);

    // Zapatos
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
  _hablarConNPC(npc, jugador) {
    const textos = this._obtenerTextos();
    const isabela = textos?.dialogos?.isabela;

    if (npc.id === 'soldado') {
      if (npc.esCombate && !this.combateTerminado) {
        // El soldado inicia un combate — primero un diálogo de advertencia
        this.dialogos.iniciarDialogo([
          { personaje: '⚔️ Soldado Diego', texto: isabela?.soldado1 || '¡Alto! ¡Esta zona está prohibida por orden del Virrey!' },
          { personaje: '⚔️ Soldado Diego', texto: isabela?.soldado2 || '¡Nadie puede entrar a las ruinas sin permiso de la Corona!' }
        ], () => {
          // Después del diálogo, iniciar combate
          this.combateIniciado = true;
          if (this.juego && this.juego.combate) {
            this.juego.combate.iniciar({
              nombre: 'Soldado Diego',
              vida: 40,
              vidaMaxima: 40,
              fuerza: 2,
              velocidad: 2,
              hostilidad: 60  // No es tan hostil, se puede convencer
            }, this.juego);
          }
        });
      } else {
        // Después de ser pacificado, el soldado da información
        this.dialogos.iniciarDialogo([
          { personaje: '⚔️ Soldado Diego', texto: isabela?.soldadoPaz1 || 'Tienes razón... estas ruinas deben ser protegidas, no prohibidas.' },
          { personaje: '⚔️ Soldado Diego', texto: isabela?.soldadoPaz2 || 'La Isabela fue fundada en 1494. Es la primera ciudad europea en América.' }
        ]);
      }

    } else if (npc.id === 'cronista') {
      this.dialogos.iniciarDialogo([
        { personaje: '📖 Fray Ramón Pané', texto: isabela?.cronista1 || 'Soy Fray Ramón Pané, el primer cronista de las Indias.' },
        { personaje: '📖 Fray Ramón Pané', texto: isabela?.cronista2 || 'Escribo sobre las costumbres de los taínos para que no se pierdan.' },
        { personaje: '📖 Fray Ramón Pané', texto: isabela?.cronista3 || 'Mi obra se llama "Relación acerca de las antigüedades de los indios".' },
        { personaje: '📖 Fray Ramón Pané', texto: isabela?.cronista4 || 'Es el primer libro escrito en América. Proteger la historia es mi deber.' }
      ], () => {
        npc.dialogoHecho = true;

        // --- Descubrimiento de misión secundaria: Good Vibrations ---
        // El cronista menciona que el magnetómetro parece descalibrado
        if (this.juego && this.juego.misiones && !this.juego.misiones.estaDescubierta('buenasVibraciones')) {
          const textosMision = this._obtenerTextos();
          const isabela2 = textosMision?.dialogos?.isabela;
          this.dialogos.iniciarDialogo([
            { personaje: '📖 Fray Ramón Pané', texto: isabela2?.cronistaVibraciones || 'Por cierto... el magnetómetro que encontré parece descalibrado. Los estudiantes de robótica del LFSD quizás puedan arreglarlo.' }
          ], () => {
            this.juego.misiones.descubrir('buenasVibraciones');
            this.juego.mostrarToast('📋 Misión descubierta: Good Vibrations');
            const tituloMision = isabela2?.misionBuenasVibraciones || 'Good Vibrations';
            this.juego.registro.agregarEntrada('secundaria', tituloMision, 'Calibrar el magnetómetro con los estudiantes de robótica del LFSD.');
          });
        }
      });

    } else if (npc.id === 'taino') {
      this.dialogos.iniciarDialogo([
        { personaje: '🪶 Guatiguaná', texto: isabela?.taino1 || 'Soy Guatiguaná. Mi pueblo fue de los primeros en resistir a los invasores.' },
        { personaje: '🪶 Guatiguaná', texto: isabela?.taino2 || 'Los españoles nos obligaron a buscar oro. Muchos murieron de trabajo forzado.' },
        { personaje: '🪶 Guatiguaná', texto: isabela?.taino3 || 'Pero nuestra cultura no murió. Vive en las palabras: hamaca, canoa, tabaco, maíz.' },
        { personaje: '🪶 Guatiguaná', texto: isabela?.taino4 || 'Cada vez que dices "huracán" o comes casabe, los taínos seguimos vivos.' }
      ], () => { npc.dialogoHecho = true; });

    } else if (npc.id === 'historiador') {
      // Roberto Cassá tiene diálogo condicional:
      // - Si el jugador NO tiene el arcabuz, le dice que busque artefactos
      // - Si TIENE el arcabuz, hace el intercambio por el mapa colonial
      // - Si ya hizo el intercambio, repite información útil
      const tieneArcabuz = this.juego && this.juego.inventario &&
        this.juego.inventario.objetos.some(o => o.id === 'arcabuz');

      if (npc.dialogoHecho) {
        // Ya intercambió — repite información
        this.dialogos.iniciarDialogo([
          { personaje: '📚 Roberto Cassá', texto: isabela?.cassaRepite || 'Usa el mapa colonial para visitar los sitios históricos. ¡Hay mucho por descubrir!' }
        ]);
      } else if (tieneArcabuz) {
        // ¡Tiene el arcabuz! — intercambio
        this.dialogos.iniciarDialogo([
          { personaje: '📚 Roberto Cassá', texto: isabela?.cassa1 || 'Soy Roberto Cassá, historiador. Estudio los orígenes de nuestra nación.' },
          { personaje: '📚 Roberto Cassá', texto: isabela?.cassaVeArcabuz || '¡Un arcabuz colonial! Estos se usaban en La Isabela desde 1494.' },
          { personaje: '📚 Roberto Cassá', texto: isabela?.cassaIntercambio || 'Te propongo un intercambio: dame el arcabuz para el museo, y yo te doy mi mapa de sitios coloniales.' },
          { personaje: '📚 Roberto Cassá', texto: isabela?.cassaEntrega || '¡Trato hecho! Con este mapa podrás visitar la Zona Colonial de Santo Domingo y otros sitios históricos.' }
        ], () => {
          // --- Intercambio de objetos ---
          // Quitar el arcabuz del inventario
          if (this.juego.inventario) {
            this.juego.inventario.remover('arcabuz');
          }
          // Quitar del inventario simple del jugador
          if (jugador.inventario) {
            const idx = jugador.inventario.findIndex(o => o.nombre === 'arcabuz');
            if (idx !== -1) jugador.inventario.splice(idx, 1);
          }

          // Dar el mapa colonial
          const textos2 = this._obtenerTextos();
          const nombreMapa = textos2?.objetos?.mapaColonial || 'Mapa Colonial';
          jugador.agregarAlInventario({ nombre: 'mapaColonial' });
          if (this.juego.inventario) {
            this.juego.inventario.agregar({
              id: 'mapaColonial',
              nombre: nombreMapa,
              descripcion: textos2?.objetos?.descMapaColonial || 'Mapa con los sitios coloniales más importantes de la isla.',
              tipo: 'clave',
              cantidad: 1,
              color: '#DAA520',
              esUsable: false
            });
          }

          // Toast de intercambio
          if (this.juego.mostrarToast) {
            this.juego.mostrarToast(`🔄 Arcabuz → ${nombreMapa}`);
          }

          npc.dialogoHecho = true;
        });
      } else {
        // No tiene el arcabuz — le dice que busque
        this.dialogos.iniciarDialogo([
          { personaje: '📚 Roberto Cassá', texto: isabela?.cassa1 || 'Soy Roberto Cassá, historiador. Estudio los orígenes de nuestra nación.' },
          { personaje: '📚 Roberto Cassá', texto: isabela?.cassaSinArcabuz || 'Busco artefactos coloniales de La Isabela. Si encuentras algo, tráemelo — tengo algo valioso que ofrecerte a cambio.' }
        ]);
      }
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
