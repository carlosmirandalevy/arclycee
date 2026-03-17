// ============================================================
// MUNDO-LABORATORIO.JS - Museo de las Atarazanas Reales (Acto 5)
// ============================================================
// Después de resolver el caso de tráfico en el aeropuerto, el
// jugador llega al Museo de las Atarazanas Reales, donde los
// artefactos recuperados deben ser autenticados y catalogados.
//
// El jugador aprende sobre métodos de autenticación (Carbono-14,
// restauración, catalogación) y descubre que alguien intenta
// vender falsificaciones al museo.
//
// ENSEÑANZA: Métodos científicos de datación, restauración de
// artefactos, importancia de los museos para la memoria colectiva,
// cómo distinguir piezas auténticas de falsificaciones.
//
// SIN COMBATE — la autenticación se resuelve con diálogos.
// MODO: Top-down (vista desde arriba, velocidad normal indoor)
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';

export class MundoLaboratorio {

  constructor() {
    // --- Dimensiones del nivel ---
    // El museo es un espacio interior con varias salas
    this.anchoNivel = 1800;
    this.altoNivel = 1200;

    // --- Cámara ---
    this.camaraX = 0;
    this.camaraY = 0;

    // --- Estructuras del museo (obstáculos con colisión) ---
    this.estructuras = [];

    // --- NPCs ---
    this.npcs = [];

    // --- Objetos coleccionables ---
    this.objetos = [];

    // --- Diálogos ---
    this.dialogos = new SistemaDialogos();

    // --- Efectos de sonido ---
    this.sfx = new SonidoProcedural();

    // --- Bloqueo de entrada al iniciar ---
    this.bloqueoEntrada = true;

    // --- Tiempo total para animaciones ---
    this.tiempoTotal = 0;

    // --- Misión ---
    this.misionActual = '';
    this.npcsHablados = 0;
    this.totalNPCs = 4; // Morbán, López, Ana y Roberto Cassá

    // --- Roberto Cassá — mentor con diálogo rotativo ---
    this._cassaConversacion = 0;

    // --- Visitante sospechoso ---
    this._sospechosoHablado = false;

    // --- Referencia al juego ---
    this.juego = null;
  }

  // --- Preparar el mundo ---
  iniciar(juego) {
    this.juego = juego;
    this.bloqueoEntrada = true;
    this.tiempoTotal = 0;
    this.npcsHablados = 0;
    this._sospechosoHablado = false;

    // Configurar jugador para vista top-down
    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';
      juego.jugador.x = 900;
      juego.jugador.y = 1050;
      juego.jugador.velocidadX = 0;
      juego.jugador.velocidadY = 0;
    }

    // --- Estructuras del museo ---
    // Representan salas, vitrinas y muebles con colisión
    this.estructuras = [
      // Sala de Exhibición (gran sala central superior)
      { x: 300, y: 100, ancho: 500, alto: 250, tipo: 'sala', clave: 'salaExhibicion', nombre: 'Sala de Exhibición' },
      // Laboratorio C-14 (sala derecha)
      { x: 1100, y: 100, ancho: 350, alto: 250, tipo: 'laboratorio', clave: 'laboratorioC14', nombre: 'Laboratorio C-14' },
      // Taller de Restauración (sala izquierda)
      { x: 100, y: 500, ancho: 350, alto: 250, tipo: 'taller', clave: 'tallerRestauracion', nombre: 'Taller de Restauración' },
      // Vitrina 1 — artefactos taínos
      { x: 350, y: 450, ancho: 80, alto: 80, tipo: 'vitrina', clave: 'vitrinaTaina', nombre: 'Vitrina Taína' },
      // Vitrina 2 — artefactos coloniales
      { x: 550, y: 450, ancho: 80, alto: 80, tipo: 'vitrina', clave: 'vitrinaColonial', nombre: 'Vitrina Colonial' },
      // Vitrina 3 — artefactos submarinos
      { x: 750, y: 450, ancho: 80, alto: 80, tipo: 'vitrina', clave: 'vitrinaSubmarina', nombre: 'Vitrina Submarina' },
      // Mostrador de Recepción (entrada sur)
      { x: 750, y: 950, ancho: 300, alto: 60, tipo: 'mostrador', nombre: 'Recepción' },
      // Almacén de Piezas (sala derecha inferior)
      { x: 1200, y: 600, ancho: 300, alto: 300, tipo: 'almacen', clave: 'almacenPiezas', nombre: 'Almacén de Piezas' }
    ];

    // --- NPCs del museo ---
    this.npcs = [
      {
        id: 'morban',
        x: 500, y: 370,
        ancho: 28, alto: 36,
        nombre: 'Dr. Fernando Morbán',
        color: '#4a6a8a',
        dialogoHecho: false,
        esMentor: false
      },
      {
        id: 'lopez',
        x: 1250, y: 370,
        ancho: 28, alto: 36,
        nombre: 'Dra. López',
        color: '#6a8a4a',
        dialogoHecho: false,
        esMentor: false
      },
      {
        id: 'ana',
        x: 250, y: 770,
        ancho: 28, alto: 36,
        nombre: 'Restauradora Ana',
        color: '#8a4a6a',
        dialogoHecho: false,
        esMentor: false
      },
      {
        id: 'cassa',
        x: 600, y: 700,
        ancho: 28, alto: 36,
        nombre: 'Roberto Cassá',
        color: '#8a6a4a',
        dialogoHecho: false,
        esMentor: false
      },
      {
        id: 'sospechoso',
        x: 900, y: 900,
        ancho: 28, alto: 36,
        nombre: 'Visitante Sospechoso',
        color: '#555555',
        dialogoHecho: false,
        esMentor: false
      }
    ];

    // --- Objetos coleccionables ---
    this.objetos = [
      {
        x: 550, y: 380,
        ancho: 24, alto: 24,
        tipo: 'certificadoAutenticidad',
        recogido: false,
        requiereNPC: 'morban' // Solo aparece tras hablar con Morbán
      },
      {
        x: 1200, y: 380,
        ancho: 24, alto: 24,
        tipo: 'catalogoMuseo',
        recogido: false,
        requiereNPC: 'lopez' // Solo aparece tras hablar con López
      }
    ];

    // Texto de misión
    const textos = this._obtenerTextos();
    const lab = textos?.dialogos?.laboratorio;
    this.misionActual = lab?.misionExplorar || 'Explora el Museo de las Atarazanas Reales';
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, jugador, companeros) {
    if (!jugador) return;
    this.tiempoTotal += dt;

    // --- Si hay un combate activo, no procesar nada ---
    if (this.juego && this.juego.combate && this.juego.combate.enCombate) return;

    // --- Diálogo activo consume toda la entrada ---
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

    // --- Movimiento top-down (velocidad normal, es interior) ---
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

    // Aplicar movimiento
    const factorTiempo = dt * 60;
    jugador.x += jugador.velocidadX * factorTiempo;
    jugador.y += jugador.velocidadY * factorTiempo;

    // Animación de piernas
    if (jugador.esAnimando) {
      jugador.cuadroAnimacion = (jugador.cuadroAnimacion || 0) + dt * 8;
    }

    // --- Colisión con estructuras ---
    for (const est of this.estructuras) {
      if (jugador.x + jugador.ancho > est.x && jugador.x < est.x + est.ancho &&
          jugador.y + jugador.alto > est.y && jugador.y < est.y + est.alto) {
        // Empujar al jugador fuera de la estructura
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

    // --- Limitar jugador al nivel ---
    jugador.x = Math.max(0, Math.min(this.anchoNivel - jugador.ancho, jugador.x));
    jugador.y = Math.max(0, Math.min(this.altoNivel - jugador.alto, jugador.y));

    // --- Interacción con NPCs ---
    if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      for (const npc of this.npcs) {
        if (this._estaCerca(jugador, npc, 45)) {
          this._hablarConNPC(npc, jugador);
          this.bloqueoEntrada = true;
          break;
        }
      }

      // --- Recoger objetos ---
      for (const obj of this.objetos) {
        if (obj.recogido) continue;

        // Verificar requisito de NPC
        if (obj.requiereNPC) {
          const npcRequerido = this.npcs.find(n => n.id === obj.requiereNPC);
          if (npcRequerido && !npcRequerido.dialogoHecho) continue;
        }

        if (this._estaCerca(jugador, obj, 35)) {
          obj.recogido = true;
          this._recogerObjeto(obj);
          this.bloqueoEntrada = true;
          break;
        }
      }
    }

    // Desbloquear entrada
    if (!entrada.estaPresionada('accion')) {
      this.bloqueoEntrada = false;
    }

    // --- Contar NPCs hablados (solo los que cuentan para la misión) ---
    this.npcsHablados = this.npcs.filter(
      n => n.dialogoHecho && !n.esMentor && n.id !== 'sospechoso'
    ).length;

    // --- Verificar si la misión está completa ---
    if (this.npcsHablados >= this.totalNPCs) {
      const textos = this._obtenerTextos();
      const lab = textos?.dialogos?.laboratorio;
      this.misionActual = lab?.misionCompleta || '¡Museo explorado! El final te espera...';

      // Si todos los objetos están recogidos, permitir salir
      const todosRecogidos = this.objetos.every(o => o.recogido);
      if (todosRecogidos) {
        this.misionActual = lab?.misionFinal || '¡Misión completa! Presiona M para ver el final';
      }
    }

    // --- Salir con M (ir al final) o borde inferior ---
    if (entrada.estaPresionada('mapa') && !this.bloqueoEntrada) {
      if (this.npcsHablados >= this.totalNPCs) {
        // Misión completa → ir a cinemática final
        this._completarMundo();
      } else {
        // Volver al mapa del mundo
        if (this.juego && this.juego.cambiarEscena) {
          this.juego.cambiarEscena('mapaPrincipal');
        }
      }
      this.bloqueoEntrada = true;
      return;
    }

    // Borde inferior → volver al mapa
    if (jugador.y >= this.altoNivel - jugador.alto - 5) {
      if (this.npcsHablados >= this.totalNPCs) {
        this._completarMundo();
      } else if (this.juego && this.juego.cambiarEscena) {
        this.juego.cambiarEscena('mapaPrincipal');
      }
      return;
    }

    // --- Actualizar compañeros ---
    if (companeros) {
      for (const comp of companeros) {
        if (comp.activo && typeof comp.actualizar === 'function') {
          comp.actualizar(dt, jugador);
        }
      }
    }

    // --- Cámara suave ---
    const objetivoCamX = jugador.x - ANCHO_JUEGO / 2 + jugador.ancho / 2;
    const objetivoCamY = jugador.y - ALTO_JUEGO / 2 + jugador.alto / 2;
    this.camaraX += (objetivoCamX - this.camaraX) * 0.08;
    this.camaraY += (objetivoCamY - this.camaraY) * 0.08;

    // Limitar cámara al nivel
    this.camaraX = Math.max(0, Math.min(this.anchoNivel - ANCHO_JUEGO, this.camaraX));
    this.camaraY = Math.max(0, Math.min(this.altoNivel - ALTO_JUEGO, this.camaraY));
  }

  // --- Completar el mundo y transicionar al final ---
  _completarMundo() {
    if (!this.juego) return;

    // Marcar nodo como completado
    if (!this.juego.progreso.nodosCompletados.includes(7)) {
      this.juego.progreso.nodosCompletados.push(7);
    }
    // Desbloquear LFSD (nodo 8)
    if (!this.juego.progreso.nodosDesbloqueados.includes(8)) {
      this.juego.progreso.nodosDesbloqueados.push(8);
    }

    // Guardar y ir a cinemática final
    this.juego.guardarPartida();
    this.juego.cambiarEscena('finalCinematica');
  }

  // --- Dibujar el mundo ---
  dibujar(renderizador, ancho, alto, textos, jugador, companeros) {
    const ctx = renderizador.ctx;

    ctx.save();
    ctx.translate(-this.camaraX, -this.camaraY);

    // --- Suelo del museo ---
    // Piso de mármol con patrón de losetas
    for (let fila = 0; fila < this.altoNivel / 40; fila++) {
      for (let col = 0; col < this.anchoNivel / 40; col++) {
        const esClaro = (fila + col) % 2 === 0;
        ctx.fillStyle = esClaro ? '#E8E0D0' : '#D8D0C0';
        ctx.fillRect(col * 40, fila * 40, 40, 40);
      }
    }

    // --- Paredes del museo ---
    // Pared superior
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(0, 0, this.anchoNivel, 20);
    // Pared inferior
    ctx.fillRect(0, this.altoNivel - 20, this.anchoNivel, 20);
    // Pared izquierda
    ctx.fillRect(0, 0, 20, this.altoNivel);
    // Pared derecha
    ctx.fillRect(this.anchoNivel - 20, 0, 20, this.altoNivel);

    // Franja decorativa superior (color museo)
    ctx.fillStyle = '#6B4226';
    ctx.fillRect(0, 20, this.anchoNivel, 8);

    // --- Estructuras ---
    for (const est of this.estructuras) {
      this._dibujarEstructura(ctx, est);
    }

    // --- Objetos coleccionables ---
    for (const obj of this.objetos) {
      if (obj.recogido) continue;

      // Verificar requisito
      if (obj.requiereNPC) {
        const npcRequerido = this.npcs.find(n => n.id === obj.requiereNPC);
        if (npcRequerido && !npcRequerido.dialogoHecho) continue;
      }

      // Brillo pulsante
      const brillo = 0.5 + Math.sin(this.tiempoTotal * 3) * 0.3;
      ctx.fillStyle = `rgba(255, 215, 0, ${brillo})`;
      ctx.beginPath();
      ctx.arc(obj.x + obj.ancho / 2, obj.y + obj.alto / 2, 16, 0, Math.PI * 2);
      ctx.fill();

      // Ícono del documento
      ctx.fillStyle = '#D2B48C';
      ctx.fillRect(obj.x + 2, obj.y + 2, 20, 20);
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(obj.x + 5, obj.y + 6, 14, 1);
      ctx.fillRect(obj.x + 5, obj.y + 10, 10, 1);
      ctx.fillRect(obj.x + 5, obj.y + 14, 14, 1);

      // Sello dorado para certificado
      if (obj.tipo === 'certificadoAutenticidad') {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(obj.x + 18, obj.y + 18, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // --- Entidades ordenadas por Y (depth sorting) ---
    const entidades = [];

    // NPCs
    for (const npc of this.npcs) {
      entidades.push({ tipo: 'npc', datos: npc, y: npc.y });
    }

    // Jugador
    if (jugador) {
      entidades.push({ tipo: 'jugador', datos: jugador, y: jugador.y });
    }

    // Compañeros
    if (companeros) {
      for (const comp of companeros) {
        if (comp.activo) {
          entidades.push({ tipo: 'companero', datos: comp, y: comp.y || jugador.y });
        }
      }
    }

    // Ordenar por Y
    entidades.sort((a, b) => a.y - b.y);

    // Dibujar entidades
    for (const ent of entidades) {
      if (ent.tipo === 'npc') {
        this._dibujarNPC(ctx, ent.datos, jugador);
      } else if (ent.tipo === 'jugador') {
        this._dibujarJugador(ctx, ent.datos);
      } else if (ent.tipo === 'companero') {
        const comp = ent.datos;
        const offsetX = (comp.x || jugador.x) - this.camaraX;
        const offsetY = (comp.y || jugador.y) - this.camaraY;
        ctx.save();
        ctx.translate(this.camaraX, this.camaraY);
        comp.dibujar(ctx);
        ctx.restore();
      }
    }

    // --- Iluminación sutil ---
    ctx.fillStyle = 'rgba(255, 255, 240, 0.03)';
    ctx.fillRect(300, 100, 500, 250);
    ctx.fillRect(1100, 100, 350, 250);

    ctx.restore();

    // --- HUD ---
    this._dibujarHUD(ctx, ancho, alto, textos, jugador);
  }

  // ============================================================
  // MÉTODOS DE DIBUJO
  // ============================================================

  _dibujarEstructura(ctx, est) {
    const _tLug = this._obtenerTextos()?.lugares;
    switch (est.tipo) {
      case 'sala':
        // Sala de exhibición — piso más oscuro, bordes dorados
        ctx.fillStyle = '#C8B896';
        ctx.fillRect(est.x, est.y, est.ancho, est.alto);
        ctx.strokeStyle = '#B8860B';
        ctx.lineWidth = 3;
        ctx.strokeRect(est.x, est.y, est.ancho, est.alto);
        // Texto de la sala
        ctx.fillStyle = '#4a3520';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(_tLug?.[est.clave] || est.nombre, est.x + est.ancho / 2, est.y + 20);
        ctx.textAlign = 'left';
        break;

      case 'laboratorio':
        // Laboratorio — piso gris claro, borde azul
        ctx.fillStyle = '#D0D8E0';
        ctx.fillRect(est.x, est.y, est.ancho, est.alto);
        ctx.strokeStyle = '#4a6a8a';
        ctx.lineWidth = 3;
        ctx.strokeRect(est.x, est.y, est.ancho, est.alto);
        // Equipos de laboratorio (decorativos)
        ctx.fillStyle = '#888888';
        ctx.fillRect(est.x + 20, est.y + 30, 40, 30);
        ctx.fillStyle = '#44AA44';
        ctx.fillRect(est.x + 25, est.y + 35, 12, 8);
        // Texto
        ctx.fillStyle = '#2a3a4a';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(_tLug?.[est.clave] || est.nombre, est.x + est.ancho / 2, est.y + 20);
        ctx.textAlign = 'left';
        break;

      case 'taller':
        // Taller de restauración — piso cálido
        ctx.fillStyle = '#D8C8A8';
        ctx.fillRect(est.x, est.y, est.ancho, est.alto);
        ctx.strokeStyle = '#8a6a4a';
        ctx.lineWidth = 3;
        ctx.strokeRect(est.x, est.y, est.ancho, est.alto);
        // Mesa de trabajo
        ctx.fillStyle = '#6B4226';
        ctx.fillRect(est.x + 30, est.y + 40, 80, 40);
        // Texto
        ctx.fillStyle = '#4a3520';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(_tLug?.[est.clave] || est.nombre, est.x + est.ancho / 2, est.y + 20);
        ctx.textAlign = 'left';
        break;

      case 'vitrina':
        // Vitrina de cristal con brillo
        ctx.fillStyle = 'rgba(200, 220, 240, 0.5)';
        ctx.fillRect(est.x, est.y, est.ancho, est.alto);
        ctx.strokeStyle = '#888888';
        ctx.lineWidth = 2;
        ctx.strokeRect(est.x, est.y, est.ancho, est.alto);
        // Brillo del cristal
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(est.x + 5, est.y + 5, 15, 4);
        // Etiqueta
        ctx.fillStyle = '#333333';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(_tLug?.[est.clave] || est.nombre, est.x + est.ancho / 2, est.y + est.alto + 14);
        ctx.textAlign = 'left';
        break;

      case 'mostrador':
        // Mostrador de recepción
        ctx.fillStyle = '#6B4226';
        ctx.fillRect(est.x, est.y, est.ancho, est.alto);
        ctx.fillStyle = '#8B6242';
        ctx.fillRect(est.x + 5, est.y + 5, est.ancho - 10, est.alto - 10);
        // Cartel "Recepción"
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        const _tRec = this._obtenerTextos();
        ctx.fillText(_tRec?.ui?.recepcion || 'RECEPCIÓN', est.x + est.ancho / 2, est.y - 5);
        ctx.textAlign = 'left';
        break;

      case 'almacen':
        // Almacén — piso gris, cajas
        ctx.fillStyle = '#B0A890';
        ctx.fillRect(est.x, est.y, est.ancho, est.alto);
        ctx.strokeStyle = '#8a7a5a';
        ctx.lineWidth = 2;
        ctx.strokeRect(est.x, est.y, est.ancho, est.alto);
        // Cajas decorativas
        ctx.fillStyle = '#8B7355';
        ctx.fillRect(est.x + 20, est.y + 20, 30, 30);
        ctx.fillRect(est.x + 60, est.y + 40, 25, 25);
        ctx.fillRect(est.x + 100, est.y + 15, 35, 35);
        // Texto
        ctx.fillStyle = '#4a3520';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(_tLug?.[est.clave] || est.nombre, est.x + est.ancho / 2, est.y + est.alto + 18);
        ctx.textAlign = 'left';
        break;
    }
  }

  _dibujarNPC(ctx, npc, jugador) {
    const esCerca = jugador && this._estaCerca(jugador, npc, 45);

    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(npc.x + npc.ancho / 2, npc.y + npc.alto + 2, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cuerpo
    ctx.fillStyle = npc.color;
    ctx.fillRect(npc.x + 4, npc.y + 10, 20, 16);

    // Cabeza
    ctx.fillStyle = '#D2956A';
    ctx.fillRect(npc.x + 6, npc.y, 16, 14);

    // Ojos
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(npc.x + 9, npc.y + 4, 3, 3);
    ctx.fillRect(npc.x + 16, npc.y + 4, 3, 3);
    ctx.fillStyle = '#000000';
    ctx.fillRect(npc.x + 10, npc.y + 5, 1.5, 1.5);
    ctx.fillRect(npc.x + 17, npc.y + 5, 1.5, 1.5);

    // Pelo según NPC
    if (npc.id === 'morban' || npc.id === 'cassa') {
      ctx.fillStyle = '#555555'; // Pelo canoso
      ctx.fillRect(npc.x + 5, npc.y - 2, 18, 5);
    } else if (npc.id === 'lopez' || npc.id === 'ana') {
      ctx.fillStyle = '#1a0a00'; // Pelo oscuro largo
      ctx.fillRect(npc.x + 4, npc.y - 2, 20, 5);
      ctx.fillRect(npc.x + 3, npc.y + 2, 4, 10);
      ctx.fillRect(npc.x + 21, npc.y + 2, 4, 10);
    } else {
      ctx.fillStyle = '#333333';
      ctx.fillRect(npc.x + 5, npc.y - 2, 18, 5);
    }

    // Piernas
    ctx.fillStyle = '#2a3a5a';
    ctx.fillRect(npc.x + 6, npc.y + 26, 7, 8);
    ctx.fillRect(npc.x + 15, npc.y + 26, 7, 8);

    // Zapatos
    ctx.fillStyle = '#4a3520';
    ctx.fillRect(npc.x + 5, npc.y + 32, 8, 3);
    ctx.fillRect(npc.x + 15, npc.y + 32, 8, 3);

    // Indicador de interacción
    if (esCerca) {
      const pulso = 0.7 + Math.sin(this.tiempoTotal * 3) * 0.3;
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';

      if (npc.dialogoHecho && !npc.esMentor) {
        // Checkmark verde si ya habló (excepto mentores)
        ctx.fillStyle = '#44AA44';
        ctx.fillText('✓', npc.x + npc.ancho / 2, npc.y - 14);
      }

      // Siempre mostrar [E] Hablar si está cerca
      ctx.fillStyle = `rgba(255, 215, 0, ${pulso})`;
      const texHablar = this._obtenerTextos()?.ui?.eHablar || '[E] Hablar';
      ctx.fillText(texHablar, npc.x + npc.ancho / 2, npc.y - 4);
      ctx.textAlign = 'left';
    }

    // Nombre debajo
    ctx.font = '10px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(npc.nombre, npc.x + npc.ancho / 2, npc.y + npc.alto + 16);
    ctx.textAlign = 'left';
  }

  _dibujarJugador(ctx, jugador) {
    const px = jugador.x;
    const py = jugador.y;
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
    const pasoAnim = jugador.esAnimando ? Math.sin((jugador.cuadroAnimacion || 0) * 5) * 3 : 0;
    ctx.fillRect(px + 6, py + 26 + pasoAnim, 7, 8);
    ctx.fillRect(px + 15, py + 26 - pasoAnim, 7, 8);

    // Zapatos
    ctx.fillStyle = '#4a3520';
    ctx.fillRect(px + 5, py + 32 + pasoAnim, 8, 3);
    ctx.fillRect(px + 15, py + 32 - pasoAnim, 8, 3);
  }

  _dibujarHUD(ctx, ancho, alto, textos, jugador) {
    const lab = textos?.dialogos?.laboratorio;

    // --- Barra de vida ---
    if (jugador) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(10, 10, 104, 16);
      ctx.fillStyle = '#44AA44';
      const anchoVida = Math.max(0, (jugador.vida / 100) * 100);
      ctx.fillRect(12, 12, anchoVida, 12);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '10px monospace';
      ctx.fillText(`${textos?.interfaz?.vida || 'Vida'}: ${jugador.vida}`, 15, 22);
    }

    // --- Contador de NPCs ---
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(ancho - 160, 10, 150, 18);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '11px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`NPCs: ${this.npcsHablados}/${this.totalNPCs}`, ancho - 15, 23);

    // --- Contador de objetos ---
    const objRecogidos = this.objetos.filter(o => o.recogido).length;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(ancho - 160, 32, 150, 18);
    ctx.fillStyle = objRecogidos >= this.objetos.length ? '#44CC44' : '#FFD700';
    ctx.font = '11px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`📦 ${objRecogidos}/${this.objetos.length}`, ancho - 15, 45);

    // --- Misión actual ---
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(ancho / 2 - 200, alto - 55, 400, 20);
    ctx.fillStyle = '#FFD700';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(this.misionActual, ancho / 2, alto - 40);

    // --- Controles ---
    ctx.fillStyle = '#AAAAAA';
    ctx.font = '11px monospace';
    const texControles = this._obtenerTextos()?.ui?.controlesMuseo || 'WASD: mover | E: hablar/recoger | M: mapa | I: inventario | P: fotos | L: misiones';
    ctx.fillText(texControles, ancho / 2, alto - 15);
    ctx.textAlign = 'left';

    // --- Diálogos ---
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto, textos);
    }
  }

  // ============================================================
  // INTERACCIÓN CON NPCs
  // ============================================================

  _hablarConNPC(npc, jugador) {
    const textos = this._obtenerTextos();
    const lab = textos?.dialogos?.laboratorio;

    switch (npc.id) {
      case 'morban':
        this._hablarMorban(npc, lab);
        break;
      case 'lopez':
        this._hablarLopez(npc, lab, jugador);
        break;
      case 'ana':
        this._hablarAna(npc, lab);
        break;
      case 'cassa':
        this._hablarCassa(npc, lab);
        break;
      case 'sospechoso':
        this._hablarSospechoso(npc, lab);
        break;
    }
  }

  _hablarMorban(npc, lab) {
    const nombre = '🏛 Dr. Morbán';
    if (!npc.dialogoHecho) {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: lab?.morban1 || 'Bienvenido al Museo de las Atarazanas Reales. Soy el Dr. Fernando Morbán, director.' },
        { personaje: nombre, texto: lab?.morban2 || 'Este museo conserva los tesoros rescatados de los naufragios del Caribe.' },
        { personaje: nombre, texto: lab?.morban3 || 'Cada artefacto que llega debe ser autenticado. Sin autenticación, no tiene valor histórico.' },
        { personaje: nombre, texto: lab?.morban4 || 'Habla con la Dra. López en el laboratorio y con Ana en restauración. Ellas te enseñarán el proceso.' }
      ], () => {
        npc.dialogoHecho = true;
        this.sfx.descubrir();
        if (this.juego) {
          const _t = this._obtenerTextos();
          this.juego.mostrarToast(_t?.ui?.morbanAutenticacion || '🏛 Dr. Morbán: proceso de autenticación explicado');
        }
      });
    } else {
      // Diálogo mejorado según progreso del equipo
      const progreso = this.juego?.progreso;
      if (progreso?.descubrimientoCientifico) {
        this.dialogos.iniciarDialogo([
          { personaje: nombre, texto: lab?.morbanPostDescubrimiento || '¡El descubrimiento de la Dra. López ha puesto al museo en el mapa internacional! Y tú eres parte de eso.' }
        ]);
      } else if (progreso?.equipoEntregado) {
        this.dialogos.iniciarDialogo([
          { personaje: nombre, texto: lab?.morbanPostEntrega || 'La Dra. López está muy contenta con el equipo reparado. Se nota que los jóvenes del LFSD saben lo que hacen.' }
        ]);
      } else {
        this.dialogos.iniciarDialogo([
          { personaje: nombre, texto: lab?.morbanRepite || 'Visita el laboratorio C-14 y el taller de restauración. La ciencia protege la historia.' }
        ]);
      }
    }
  }

  _hablarLopez(npc, lab, jugador) {
    const nombre = '🔬 Dra. López';
    const progreso = this.juego?.progreso;

    // --- Fase 4: Descubrimiento hecho — ofrecer periódico como coleccionable ---
    if (progreso?.descubrimientoCientifico) {
      if (progreso?.periodicoRecogido) {
        // Ya recogió el periódico
        this.dialogos.iniciarDialogo([
          { personaje: nombre, texto: lab?.lopezPostPeriodico || '¡El artículo ha generado interés internacional! Ya hay 3 universidades que quieren colaborar con nosotros.' }
        ]);
      } else {
        // Ofrecer el periódico
        this.dialogos.iniciarDialogo([
          { personaje: nombre, texto: lab?.lopezPeriodico1 || '¡Mira! ¡Salimos en el periódico! Tú y los estudiantes del LFSD son mencionados.' },
          { personaje: nombre, texto: lab?.lopezPeriodico2 || 'El artículo habla del descubrimiento y cómo la colaboración entre jóvenes y científicos hizo posible todo esto.' },
          { personaje: nombre, texto: lab?.lopezPeriodico3 || 'Toma, quédate con un ejemplar. ¡Te lo mereces!' }
        ], () => {
          // Dar periódico al inventario
          const objTextos = this._obtenerTextos()?.objetos;
          if (this.juego.inventario) {
            this.juego.inventario.agregar({
              id: 'periodico',
              nombre: objTextos?.periodico || 'Artículo de Periódico',
              descripcion: objTextos?.descPeriodico || 'Artículo sobre el descubrimiento arqueológico logrado con el equipo reparado en el LFSD.',
              tipo: 'documento',
              cantidad: 1,
              color: '#D2B48C',
              esUsable: false
            });
          }
          if (jugador) jugador.agregarAlInventario(objTextos?.periodico || 'Artículo de Periódico');
          if (progreso) progreso.periodicoRecogido = true;
          { const _t = this._obtenerTextos(); this.juego.mostrarToast(_t?.ui?.periodicoRecogido || '📰 ¡Artículo de periódico recogido!'); }

          // Ahora sí completar la misión Weird Science
          if (this.juego.misiones) this.juego.misiones.completar('cienciaLoca');
          this.juego.registro?.agregarEntrada('secundaria',
            lab?.misionWSCompleta || 'Weird Science — Completada',
            lab?.misionWSCompletaDesc || 'El equipo reparado permitió un descubrimiento científico. ¡Saliste en el periódico!');
          this.juego.registro?.marcarCompletada(lab?.misionWSCompleta || 'Weird Science — Completada');
        });
      }
      return;
    }

    // --- Fase 3: Equipo entregado, próxima visita = descubrimiento ---
    if (progreso?.equipoEntregado && !progreso?.descubrimientoCientifico) {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: lab?.lopezDescubrimiento1 || '¡No vas a creer esto! El equipo reparado detectó algo extraordinario.' },
        { personaje: nombre, texto: lab?.lopezDescubrimiento2 || 'Encontramos trazas de guanín auténtico en un artefacto que creíamos era una réplica.' },
        { personaje: nombre, texto: lab?.lopezDescubrimiento3 || '¡Es una pieza taína original de hace más de 500 años! Esto cambia lo que sabíamos del sitio.' },
        { personaje: nombre, texto: lab?.lopezDescubrimiento4 || 'Voy a publicar los resultados. ¡Los estudiantes del LFSD y tú serán co-autores del hallazgo!' }
      ], () => {
        if (progreso) progreso.descubrimientoCientifico = true;
        // Reputación por el descubrimiento
        if (this.juego.reputacion) {
          this.juego.reputacion.modificar(10, lab?.repDescubrimiento || 'Descubrimiento científico');
        }
        this.sfx.descubrir();
        { const _t = this._obtenerTextos(); this.juego.mostrarToast(_t?.ui?.descubrimientoCientifico || '📰 ¡Descubrimiento científico! ¡Saldrás en el periódico!'); }
      });
      return;
    }

    // --- Fase 2: Tiene el equipo reparado — entregarlo ---
    const tieneEquipo = this.juego?.inventario?.objetos?.some(o => o.id === 'equipoAnalisis');
    if (tieneEquipo && progreso?.equipoReparado) {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: lab?.lopezRecibeEquipo1 || '¡El equipo de análisis! ¿Los estudiantes del LFSD lo repararon? ¡Increíble!' },
        { personaje: nombre, texto: lab?.lopezRecibeEquipo2 || 'Llevaba semanas sin poder hacer dataciones precisas. Esto cambia todo.' },
        { personaje: nombre, texto: lab?.lopezRecibeEquipo3 || 'Voy a recalibrar el espectrómetro y empezar a analizar las muestras pendientes.' },
        { personaje: nombre, texto: lab?.lopezRecibeEquipo4 || '¡Gracias! Vuelve pronto — tengo el presentimiento de que este equipo nos dará sorpresas.' }
      ], () => {
        // Quitar equipo del inventario
        if (this.juego.inventario) {
          const idx = this.juego.inventario.objetos.findIndex(o => o.id === 'equipoAnalisis');
          if (idx !== -1) this.juego.inventario.objetos.splice(idx, 1);
        }
        if (jugador) {
          const objTextos = this._obtenerTextos()?.objetos;
          const idxJug = jugador.inventario.findIndex(o => o.nombre === (objTextos?.equipoAnalisis || 'Equipo de Análisis'));
          if (idxJug !== -1) jugador.inventario.splice(idxJug, 1);
        }
        // Marcar progreso
        if (progreso) progreso.equipoEntregado = true;
        // Reputación por la entrega
        if (this.juego.reputacion) {
          this.juego.reputacion.modificar(10, lab?.repEntregaEquipo || 'Equipo entregado a la Dra. López');
        }
        this.sfx.descubrir();
        { const _t = this._obtenerTextos(); this.juego.mostrarToast(_t?.ui?.equipoEntregado || '🔬 Equipo entregado — ¡la Dra. López va a investigar!'); }
        // Marcar sub-misión como completada en el registro
        const lfsdTextos = this._obtenerTextos()?.dialogos?.lfsd;
        this.juego.registro?.marcarCompletada(lfsdTextos?.subMisionEquipo || 'Entregar Equipo de Análisis');
      });
      return;
    }

    // --- Fase 1: Diálogo normal (primera vez / repetido) ---
    if (!npc.dialogoHecho) {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: lab?.lopez1 || 'Soy la Dra. López, especialista en datación por Carbono-14.' },
        { personaje: nombre, texto: lab?.lopez2 || 'El Carbono-14 es un átomo radiactivo que todos los seres vivos absorben. Cuando mueren, empieza a descomponerse.' },
        { personaje: nombre, texto: lab?.lopez3 || 'Midiendo cuánto C-14 queda en un objeto orgánico, calculamos su antigüedad con precisión.' },
        { personaje: nombre, texto: lab?.lopez4 || 'Así confirmamos si un artefacto tiene 500 años o si es una falsificación moderna. ¡La ciencia no miente!' }
      ], () => {
        npc.dialogoHecho = true;
        this.sfx.descubrir();
        if (this.juego) {
          const _t = this._obtenerTextos();
          this.juego.mostrarToast(_t?.ui?.lopezCarbono || '🔬 Dra. López: datación por Carbono-14');
        }
      });
    } else {
      // Diálogo mejorado si el equipo fue reparado en LFSD pero aún no entregado
      if (progreso?.equipoReparado && !progreso?.equipoEntregado) {
        this.dialogos.iniciarDialogo([
          { personaje: nombre, texto: lab?.lopezEsperaEquipo || '¿Escuché que repararon el equipo en el LFSD? ¡Tráemelo cuando puedas, tengo muchas muestras pendientes!' }
        ]);
      } else {
        this.dialogos.iniciarDialogo([
          { personaje: nombre, texto: lab?.lopezRepite || 'Recuerda: la datación C-14 funciona con materiales orgánicos — madera, hueso, tela. Los metales se analizan con otros métodos.' }
        ]);
      }
    }
  }

  _hablarAna(npc, lab) {
    const nombre = '🔧 Restauradora Ana';
    if (!npc.dialogoHecho) {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: lab?.ana1 || 'Soy Ana, restauradora de artefactos. Mi trabajo es reparar sin alterar.' },
        { personaje: nombre, texto: lab?.ana2 || 'La regla de oro de la restauración: todo lo que hagas debe ser reversible.' },
        { personaje: nombre, texto: lab?.ana3 || 'Usamos adhesivos especiales, consolidantes y microscopios para no dañar la pieza original.' },
        { personaje: nombre, texto: lab?.ana4 || 'Un artefacto mal restaurado pierde su valor histórico para siempre. ¡La paciencia es clave!' }
      ], () => {
        npc.dialogoHecho = true;
        this.sfx.descubrir();
        if (this.juego) {
          const _t = this._obtenerTextos();
          this.juego.mostrarToast(_t?.ui?.anaRestauracion || '🔧 Ana: principios de restauración');
        }
      });
    } else {
      const progreso = this.juego?.progreso;
      if (progreso?.descubrimientoCientifico) {
        this.dialogos.iniciarDialogo([
          { personaje: nombre, texto: lab?.anaPostDescubrimiento || '¡El artefacto que descubrió la Dra. López necesita restauración! Es la pieza más emocionante que he visto en años.' }
        ]);
      } else if (progreso?.equipoEntregado) {
        this.dialogos.iniciarDialogo([
          { personaje: nombre, texto: lab?.anaPostEntrega || 'He oído que trajiste el equipo reparado. ¡La Dra. López no para de hablar de las pruebas que va a hacer!' }
        ]);
      } else {
        this.dialogos.iniciarDialogo([
          { personaje: nombre, texto: lab?.anaRepite || 'Restaurar es como ser doctor de artefactos: primero, no hacer daño.' }
        ]);
      }
    }
  }

  _hablarCassa(npc, lab) {
    const nombre = '📚 Roberto Cassá';
    // Diálogo rotativo — 5 temas sobre museos y patrimonio
    const conversaciones = [
      [
        { personaje: nombre, texto: lab?.cassa1_1 || '¡Nos encontramos de nuevo! Este museo es uno de mis lugares favoritos.' },
        { personaje: nombre, texto: lab?.cassa1_2 || 'Las Atarazanas Reales eran los almacenes del puerto de Santo Domingo en el siglo XVI.' }
      ],
      [
        { personaje: nombre, texto: lab?.cassa2_1 || '¿Sabías que este edificio fue restaurado en los años 70?' },
        { personaje: nombre, texto: lab?.cassa2_2 || 'La restauración respetó la estructura original. Así debería hacerse siempre.' }
      ],
      [
        { personaje: nombre, texto: lab?.cassa3_1 || 'Los museos no son almacenes de objetos viejos. Son lugares vivos.' },
        { personaje: nombre, texto: lab?.cassa3_2 || 'Cada pieza aquí cuenta una historia que conecta el pasado con el presente.' }
      ],
      [
        { personaje: nombre, texto: lab?.cassa4_1 || 'La República Dominicana tiene más de 60 museos.' },
        { personaje: nombre, texto: lab?.cassa4_2 || 'Desde el Museo del Hombre Dominicano hasta el Memorial de la Resistencia. ¡Hay tanto por descubrir!' }
      ],
      [
        { personaje: nombre, texto: lab?.cassa5_1 || 'Has recorrido un largo camino, joven arqueólogo.' },
        { personaje: nombre, texto: lab?.cassa5_2 || 'Desde las cuevas del Pomier hasta este museo, has aprendido a proteger el patrimonio. ¡Estoy orgulloso!' }
      ]
    ];

    const indice = this._cassaConversacion % conversaciones.length;
    this.dialogos.iniciarDialogo(conversaciones[indice], () => {
      this._cassaConversacion++;
      npc.dialogoHecho = true;

      // Recordar al jugador sobre el mapa real cuando menciona museos/lugares
      if (indice === 0 || indice === 3) {
        const _tMapa = this._obtenerTextos();
        if (this.juego?.mostrarToast) {
          this.juego.mostrarToast(_tMapa?.ui?.pistaMapaReal || '🗺️ Presiona R para ver el mapa real', 3);
        }
      }

      // --- Descubrimiento de misión secundaria: Weird Science ---
      // Cassá menciona que el equipo de análisis está averiado
      if (this.juego && this.juego.misiones && !this.juego.misiones.estaDescubierta('cienciaLoca')) {
        const textosMision = this._obtenerTextos();
        const lab2 = textosMision?.dialogos?.laboratorio;
        this.dialogos.iniciarDialogo([
          { personaje: '📚 Roberto Cassá', texto: lab2?.cassaCiencia || 'Ah, y un problema — el equipo de análisis está averiado. Quizás los estudiantes del LFSD sepan cómo repararlo.' }
        ], () => {
          this.juego.misiones.descubrir('cienciaLoca');
          // Desbloquear LFSD para que el jugador pueda ir a completar la misión
          if (!this.juego.progreso.nodosDesbloqueados.includes(8)) {
            this.juego.progreso.nodosDesbloqueados.push(8);
          }
          { const _t = this._obtenerTextos(); this.juego.mostrarToast((_t?.ui?.misionDescubierta || '📋 Misión descubierta:') + ' Weird Science'); }
          const tituloMision = lab2?.misionCienciaLoca || 'Weird Science';
          this.juego.registro.agregarEntrada('secundaria', tituloMision, 'Reparar el equipo de análisis del museo con los estudiantes del LFSD.');
        });
      }
    });
  }

  _hablarSospechoso(npc, lab) {
    const nombre = '🕵 Visitante';
    if (!this._sospechosoHablado) {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: lab?.sospechoso1 || '¡Psst! ¿Quieres comprar una reliquia taína auténtica? Precio especial para ti.' },
        { personaje: nombre, texto: lab?.sospechoso2 || 'Espera... ¿me estás diciendo que necesita un certificado? Pero si yo la encontré en mi patio...' },
        { personaje: nombre, texto: lab?.sospechoso3 || 'Hmm, tienes razón. Sin autenticación científica, cualquiera puede vender falsificaciones.' },
        { personaje: nombre, texto: lab?.sospechoso4 || 'Mejor la llevo al museo para que la examinen. ¡Gracias por el consejo, chico!' }
      ], () => {
        this._sospechosoHablado = true;
        npc.dialogoHecho = true;
        this.sfx.descubrir();
        if (this.juego) {
          const _t = this._obtenerTextos();
          this.juego.mostrarToast(_t?.ui?.visitanteConvencido || '🕵 Visitante convencido de autenticar su pieza');
        }
      });
    } else {
      this.dialogos.iniciarDialogo([
        { personaje: nombre, texto: lab?.sospechosoRepite || 'Estoy esperando los resultados del laboratorio. ¡Ojalá sea auténtica!' }
      ]);
    }
  }

  // --- Recoger un objeto ---
  _recogerObjeto(obj) {
    const textos = this._obtenerTextos();
    const objTextos = textos?.objetos;

    if (obj.tipo === 'certificadoAutenticidad') {
      if (this.juego && this.juego.inventario) {
        this.juego.inventario.agregar({
          id: 'certificadoAutenticidad',
          nombre: objTextos?.certificadoAutenticidad || 'Certificado de Autenticidad',
          descripcion: objTextos?.descCertificadoAutenticidad || 'Documento oficial que certifica la autenticidad de un artefacto arqueológico.',
          tipo: 'documento',
          cantidad: 1,
          color: '#DAA520',
          esUsable: false
        });
        { const _t = this._obtenerTextos(); this.juego.mostrarToast(_t?.ui?.certificadoRecogido || '📜 ¡Certificado de Autenticidad recogido!'); }
      }
    } else if (obj.tipo === 'catalogoMuseo') {
      if (this.juego && this.juego.inventario) {
        this.juego.inventario.agregar({
          id: 'catalogoMuseo',
          nombre: objTextos?.catalogoMuseo || 'Catálogo del Museo',
          descripcion: objTextos?.descCatalogoMuseo || 'Catálogo con todos los artefactos del Museo de las Atarazanas Reales.',
          tipo: 'documento',
          cantidad: 1,
          color: '#8B4513',
          esUsable: false
        });
        { const _t = this._obtenerTextos(); this.juego.mostrarToast(_t?.ui?.catalogoRecogido || '📖 ¡Catálogo del Museo recogido!'); }
      }
    }

    this.sfx.recoger();
  }

  // ============================================================
  // UTILIDADES
  // ============================================================

  _estaCerca(jugador, obj, radio) {
    const dx = (jugador.x + jugador.ancho / 2) - (obj.x + (obj.ancho || 0) / 2);
    const dy = (jugador.y + jugador.alto / 2) - (obj.y + (obj.alto || 0) / 2);
    return Math.sqrt(dx * dx + dy * dy) < radio;
  }

  _obtenerTextos() {
    if (this.juego && this.juego.idiomas) {
      return this.juego.idiomas.traducciones[this.juego.idiomas.idiomaActual];
    }
    return null;
  }
}
