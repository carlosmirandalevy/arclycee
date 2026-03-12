// ============================================================
// MUNDO-JURIDICO.JS - Aeropuerto Las Américas (Acto 4)
// ============================================================
// Después de explorar el Naufragio de La Pinta, el mapa de
// naufragios de la arqueóloga submarina revela una red de
// tráfico de artefactos arqueológicos que opera desde el
// Aeropuerto Internacional Las Américas.
//
// El jugador debe usar las leyes dominicanas de protección
// patrimonial y la cooperación internacional para detener
// al traficante Rodrigo Torres.
//
// ENSEÑANZA: Ley 318-68 sobre Patrimonio Cultural, Convención
// UNESCO 1970, rol de INTERPOL en delitos contra el patrimonio,
// procesos legales de protección patrimonial.
//
// COMBATE: Traficante Rodrigo Torres con opciones legales.
// MODO: Top-down (vista desde arriba, velocidad normal indoor)
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';

export class MundoJuridico {

  constructor() {
    // --- Dimensiones del nivel ---
    // El aeropuerto es un espacio interior amplio
    this.anchoNivel = 1800;
    this.altoNivel = 1200;

    // --- Cámara ---
    this.camaraX = 0;
    this.camaraY = 0;

    // --- Estructuras del aeropuerto (obstáculos con colisión) ---
    this.estructuras = [];

    // --- NPCs ---
    this.npcs = [];

    // --- Objetos coleccionables ---
    this.objetos = [];

    // --- Diálogos ---
    this.dialogos = new SistemaDialogos();

    // --- Sonidos ---
    this.sfx = new SonidoProcedural();

    // --- Bloqueo de entrada ---
    // Empieza en true porque la tecla de acción puede estar presionada
    // al entrar desde el mapa
    this.bloqueoEntrada = true;

    // --- Tiempo total (para animaciones) ---
    this.tiempoTotal = 0;

    // --- Misión ---
    this.misionActual = '';
    this.npcsHablados = 0;
    // Sin contar al traficante (es combate) ni a la abogada (es mentor)
    this.totalNPCs = 3;

    // --- Combate con el traficante ---
    this.combateIniciado = false;
    this.combateTerminado = false;

    // --- Contador de conversaciones de la mentora (diálogo rotativo) ---
    this._carmenConversacion = 0;

    // --- Referencia al juego ---
    this.juego = null;
  }

  // --- Construir el aeropuerto ---
  iniciar(juego) {
    this.juego = juego;

    // Poner al jugador en modo top-down
    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';
      juego.jugador.x = 200;
      juego.jugador.y = 1000;
      juego.jugador.direccion = 'arriba';
    }

    // --- Estructuras del aeropuerto ---
    // Representan el área de aduanas e inspección del aeropuerto
    this.estructuras = [
      {
        x: 700, y: 200,
        ancho: 200, alto: 60,
        tipo: 'mostradorAduanas',
        nombre: 'Mostrador de Aduanas'
      },
      {
        x: 350, y: 400,
        ancho: 120, alto: 80,
        tipo: 'maquinaRayosX',
        nombre: 'Máquina de Rayos X'
      },
      {
        x: 200, y: 600,
        ancho: 80, alto: 30,
        tipo: 'barreraSeguridad',
        nombre: 'Barrera de Seguridad'
      },
      {
        x: 600, y: 600,
        ancho: 80, alto: 30,
        tipo: 'barreraSeguridad',
        nombre: 'Barrera de Seguridad'
      },
      {
        x: 1000, y: 600,
        ancho: 80, alto: 30,
        tipo: 'barreraSeguridad',
        nombre: 'Barrera de Seguridad'
      },
      {
        x: 1100, y: 350,
        ancho: 150, alto: 150,
        tipo: 'carrusel',
        nombre: 'Carrusel de Equipaje'
      },
      {
        x: 1450, y: 150,
        ancho: 200, alto: 50,
        tipo: 'puertaEmbarque',
        nombre: 'Puerta de Embarque'
      },
      {
        x: 1500, y: 700,
        ancho: 160, alto: 120,
        tipo: 'oficinaInterpol',
        nombre: 'Oficina de INTERPOL'
      }
    ];

    // --- NPCs ---
    this.npcs = [
      {
        id: 'draMartinez',
        x: 250, y: 920,
        ancho: 28, alto: 32,
        nombre: 'Dra. Martínez',
        color: '#4a6a9a',
        dialogoHecho: false,
        esCombate: false
      },
      {
        id: 'agenteAduanas',
        x: 750, y: 300,
        ancho: 28, alto: 32,
        nombre: 'Agente Rosa Montero',
        color: '#2a4a6a',
        dialogoHecho: false,
        esCombate: false
      },
      {
        id: 'inspector',
        x: 1540, y: 760,
        ancho: 28, alto: 32,
        nombre: 'Inspector Ramírez',
        color: '#3a3a5a',
        dialogoHecho: false,
        esCombate: false
      },
      {
        id: 'abogada',
        x: 500, y: 450,
        ancho: 28, alto: 32,
        nombre: 'Lcda. Carmen Vidal',
        color: '#5a3a4a',
        dialogoHecho: false,
        esCombate: false,
        esMentor: true
      },
      {
        id: 'traficante',
        x: 1400, y: 250,
        ancho: 28, alto: 32,
        nombre: 'Rodrigo Torres',
        color: '#1a1a2e',
        dialogoHecho: false,
        esCombate: true
      }
    ];

    // --- Objetos coleccionables ---
    // El registro aduanal aparece tras hablar con la agente de aduanas
    // La orden judicial aparece tras derrotar al traficante
    this.objetos = [
      {
        x: 380, y: 480,
        ancho: 16, alto: 16,
        tipo: 'registroAduanal',
        recogido: false,
        requiereNPC: 'agenteAduanas'
      },
      {
        x: 1410, y: 260,
        ancho: 16, alto: 16,
        tipo: 'ordenJudicial',
        recogido: false,
        requiereCombate: true
      }
    ];

    // Misión inicial
    const textos = this._obtenerTextos();
    this.misionActual = textos?.dialogos?.juridico?.misionExplorar
      || 'Investiga el tráfico de artefactos';
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, jugador, companeros) {
    if (!jugador) return;

    this.tiempoTotal += dt;

    // --- Si hay combate activo, lo maneja juego.js ---
    if (this.juego && this.juego.combate.enCombate) {
      return;
    }

    // --- Verificar si el combate TERMINÓ ---
    // Esto va FUERA del bloque enCombate porque cuando el combate
    // termina, enCombate ya es false pero el resultado está guardado
    if (this.combateIniciado && !this.combateTerminado && this.juego.combate.resultado) {
      this.combateTerminado = true;
      const traficante = this.npcs.find(n => n.id === 'traficante');
      if (traficante) {
        traficante.esCombate = false;
        traficante.dialogoHecho = true;
      }

      // Diálogo de resolución según el resultado
      const textos = this._obtenerTextos();
      const jur = textos?.dialogos?.juridico;
      if (this.juego.combate.resultado === 'pacificado') {
        this.dialogos.iniciarDialogo([
          { personaje: '⚖️ Narrador', texto: jur?.traficantePaz1 || 'La evidencia es abrumadora. Torres se rinde ante las autoridades.' },
          { personaje: '⚖️ Narrador', texto: jur?.traficantePaz2 || 'Los artefactos serán devueltos al Museo del Hombre Dominicano.' }
        ]);
      } else if (this.juego.combate.resultado === 'victoria') {
        this.dialogos.iniciarDialogo([
          { personaje: '⚖️ Narrador', texto: jur?.traficanteDerrota || 'Torres es detenido. El caso pasa a los tribunales.' }
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

    // --- Movimiento top-down (velocidad normal — interior de aeropuerto) ---
    jugador.velocidadX = 0;
    jugador.velocidadY = 0;
    jugador.esAnimando = false;

    const velocidadInterior = VELOCIDAD_JUGADOR;

    if (entrada.estaPresionada('arriba')) {
      jugador.velocidadY = -velocidadInterior;
      jugador.direccion = 'arriba';
      jugador.esAnimando = true;
    }
    if (entrada.estaPresionada('abajo')) {
      jugador.velocidadY = velocidadInterior;
      jugador.direccion = 'abajo';
      jugador.esAnimando = true;
    }
    if (entrada.estaPresionada('izquierda')) {
      jugador.velocidadX = -velocidadInterior;
      jugador.direccion = 'izquierda';
      jugador.esAnimando = true;
    }
    if (entrada.estaPresionada('derecha')) {
      jugador.velocidadX = velocidadInterior;
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

    // --- Colisión con estructuras ---
    for (const est of this.estructuras) {
      if (jugador.x + jugador.ancho > est.x &&
          jugador.x < est.x + est.ancho &&
          jugador.y + jugador.alto > est.y &&
          jugador.y < est.y + est.alto) {
        // Empujar al jugador fuera de la estructura
        const dx = (jugador.x + jugador.ancho / 2) - (est.x + est.ancho / 2);
        const dy = (jugador.y + jugador.alto / 2) - (est.y + est.alto / 2);

        if (Math.abs(dx) > Math.abs(dy)) {
          jugador.x = dx > 0 ? est.x + est.ancho : est.x - jugador.ancho;
        } else {
          jugador.y = dy > 0 ? est.y + est.alto : est.y - jugador.alto;
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
      if (obj.requiereCombate && !this.combateTerminado) continue;
      if (obj.requiereNPC) {
        const npc = this.npcs.find(n => n.id === obj.requiereNPC);
        if (!npc || !npc.dialogoHecho) continue;
      }
      if (this._estaCerca(jugador, obj, 25)) {
        obj.recogido = true;
        this.sfx.recoger();

        const textos = this._obtenerTextos();
        const nombreObjeto = textos?.objetos?.[obj.tipo] || obj.tipo;
        jugador.agregarAlInventario({ nombre: obj.tipo });

        if (this.juego && this.juego.inventario) {
          // Determinar color del ícono según el tipo
          const colores = {
            registroAduanal: '#8B4513',
            ordenJudicial: '#2F4F4F'
          };
          this.juego.inventario.agregar({
            id: obj.tipo,
            nombre: nombreObjeto,
            descripcion: textos?.objetos?.[`desc${obj.tipo.charAt(0).toUpperCase() + obj.tipo.slice(1)}`] || '',
            tipo: 'documento',
            cantidad: 1,
            color: colores[obj.tipo] || '#8B4513',
            esUsable: false
          });
        }

        if (this.juego && this.juego.mostrarToast) {
          this.juego.mostrarToast(`📄 ${nombreObjeto} — ítem añadido al inventario`);
        }
      }
    }

    // --- Verificar misión ---
    // El traficante no cuenta (es combate), la abogada no cuenta (es mentor)
    this.npcsHablados = this.npcs.filter(
      n => n.dialogoHecho && n.id !== 'traficante' && !n.esMentor
    ).length;
    if (this.npcsHablados >= this.totalNPCs && this.combateTerminado) {
      const textos = this._obtenerTextos();
      this.misionActual = textos?.dialogos?.juridico?.misionCompleta
        || '¡Caso resuelto! Vuelve al mapa (M)';

      if (this.juego && this.juego.progreso) {
        if (!this.juego.progreso.nodosCompletados.includes(6)) {
          this.juego.progreso.nodosCompletados.push(6);
        }
      }
    }

    // --- Volver al mapa con M o borde inferior ---
    if (entrada.estaPresionada('mapa') && !this.bloqueoEntrada) {
      if (this.juego && this.juego.cambiarEscena) {
        this.juego.cambiarEscena('mapaPrincipal');
      }
      this.bloqueoEntrada = true;
      return;
    }

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

    // =========================================================
    // CAPA 1: Suelo — baldosas de aeropuerto (ajedrezado gris/blanco)
    // =========================================================
    const tamBaldosa = 40;
    for (let gx = -1; gx < this.anchoNivel / tamBaldosa + 1; gx++) {
      for (let gy = -1; gy < this.altoNivel / tamBaldosa + 1; gy++) {
        const bx = gx * tamBaldosa + offsetX;
        const by = gy * tamBaldosa + offsetY;
        const esClaro = (gx + gy) % 2 === 0;
        ctx.fillStyle = esClaro ? '#c8c8c8' : '#a0a0a0';
        ctx.fillRect(bx, by, tamBaldosa, tamBaldosa);
      }
    }

    // =========================================================
    // CAPA 2: Paredes del aeropuerto (borde superior e inferior)
    // =========================================================
    // Pared superior
    ctx.fillStyle = '#4a4a5a';
    ctx.fillRect(offsetX, offsetY, this.anchoNivel, 80);
    // Franja decorativa azul
    ctx.fillStyle = '#2a4a8a';
    ctx.fillRect(offsetX, 75 + offsetY, this.anchoNivel, 5);

    // Pared inferior
    ctx.fillStyle = '#4a4a5a';
    ctx.fillRect(offsetX, this.altoNivel - 40 + offsetY, this.anchoNivel, 40);

    // Paredes laterales
    ctx.fillStyle = '#4a4a5a';
    ctx.fillRect(offsetX, offsetY, 40, this.altoNivel);
    ctx.fillRect(this.anchoNivel - 40 + offsetX, offsetY, 40, this.altoNivel);

    // =========================================================
    // CAPA 3: Estructuras del aeropuerto
    // =========================================================
    for (const est of this.estructuras) {
      this._dibujarEstructura(ctx, est.x + offsetX, est.y + offsetY, est);
    }

    // =========================================================
    // CAPA 4: Objetos coleccionables
    // =========================================================
    for (const obj of this.objetos) {
      if (obj.recogido) continue;
      if (obj.requiereCombate && !this.combateTerminado) continue;
      if (obj.requiereNPC) {
        const npc = this.npcs.find(n => n.id === obj.requiereNPC);
        if (!npc || !npc.dialogoHecho) continue;
      }
      const ox = obj.x + offsetX;
      const oy = obj.y + offsetY;

      // Brillo pulsante
      const brillo = 0.5 + Math.sin(this.tiempoTotal * 3) * 0.3;
      const colorBrillo = obj.tipo === 'registroAduanal'
        ? `rgba(139, 69, 19, ${brillo})`
        : `rgba(47, 79, 79, ${brillo})`;
      ctx.fillStyle = colorBrillo;
      ctx.beginPath();
      ctx.arc(ox + 8, oy + 8, 12, 0, Math.PI * 2);
      ctx.fill();

      // Ícono de documento
      ctx.fillStyle = obj.tipo === 'registroAduanal' ? '#D2B48C' : '#708090';
      ctx.fillRect(ox + 2, oy + 2, 12, 14);
      ctx.fillStyle = '#333333';
      ctx.fillRect(ox + 4, oy + 5, 8, 1);
      ctx.fillRect(ox + 4, oy + 8, 6, 1);
      ctx.fillRect(ox + 4, oy + 11, 8, 1);
    }

    // =========================================================
    // CAPA 5: NPCs + jugador + compañeros (depth-sorted)
    // =========================================================
    const entidades = [];

    for (const npc of this.npcs) {
      // Si el traficante fue detenido, dejarlo pero con aspecto diferente
      entidades.push({ tipo: 'npc', datos: npc, y: npc.y });
    }
    entidades.push({ tipo: 'jugador', datos: jugador, y: jugador.y });
    if (companeros) {
      for (const comp of companeros) {
        if (comp.activo) {
          entidades.push({ tipo: 'companero', datos: comp, y: comp.y || jugador.y });
        }
      }
    }

    // Ordenar por Y para efecto de profundidad
    entidades.sort((a, b) => a.y - b.y);

    for (const ent of entidades) {
      if (ent.tipo === 'npc') {
        this._dibujarNPC(ctx, ent.datos, offsetX, offsetY, jugador);
      } else if (ent.tipo === 'jugador') {
        this._dibujarJugador(ctx, jugador, offsetX, offsetY);
      } else if (ent.tipo === 'companero') {
        ctx.save();
        ctx.translate(offsetX, offsetY);
        ent.datos.dibujar(ctx);
        ctx.restore();
      }
    }

    // =========================================================
    // CAPA 6: Iluminación fluorescente (líneas de luz en el techo)
    // =========================================================
    ctx.fillStyle = 'rgba(255, 255, 240, 0.03)';
    for (let lx = 100; lx < this.anchoNivel; lx += 300) {
      ctx.fillRect(lx + offsetX, offsetY, 80, alto);
    }

    // =========================================================
    // CAPA 7: HUD (vida, misión, controles)
    // =========================================================
    renderizador.dibujarBarra(10, 10, 120, 14, jugador.vida / jugador.vidaMaxima,
      '#333333', '#44CC44');
    renderizador.dibujarTexto(textos?.interfaz?.vida || 'Vida', 15, 22, {
      tamano: 10, color: '#FFFFFF'
    });

    // Contador de NPCs hablados
    renderizador.dibujarTexto(`🗣️ ${this.npcsHablados}/${this.totalNPCs}`, 15, 42, {
      tamano: 11, color: '#FFD700'
    });

    // Misión actual
    renderizador.dibujarTexto(this.misionActual, ancho - 10, 20, {
      tamano: 12, color: '#CCCCCC', alineacion: 'right'
    });

    // --- Diálogo ---
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto);
    }

    // --- Controles ---
    if (!this.dialogos.estaActivo()) {
      renderizador.dibujarTexto('WASD: caminar | E: hablar | I: inventario | M: mapa', ancho / 2, alto - 10, {
        tamano: 10, color: 'rgba(100, 100, 120, 0.6)', alineacion: 'center'
      });
    }
  }

  // ============================================================
  // DIBUJO DE ELEMENTOS
  // ============================================================

  // --- Dibujar estructura del aeropuerto ---
  _dibujarEstructura(ctx, x, y, est) {
    const a = est.ancho;
    const h = est.alto;

    if (est.tipo === 'mostradorAduanas') {
      // Mostrador largo de aduanas — madera oscura con superficie de mármol
      ctx.fillStyle = '#5a4a3a';
      ctx.fillRect(x, y, a, h);
      // Superficie
      ctx.fillStyle = '#8a7a6a';
      ctx.fillRect(x + 5, y + 2, a - 10, h - 20);
      // Cartel de ADUANAS
      ctx.fillStyle = '#2a4a8a';
      ctx.fillRect(x + a / 2 - 40, y - 20, 80, 18);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ADUANAS', x + a / 2, y - 6);
      ctx.textAlign = 'left';
      // Computadora en el mostrador
      ctx.fillStyle = '#333333';
      ctx.fillRect(x + 20, y + 8, 20, 15);
      ctx.fillStyle = '#4488cc';
      ctx.fillRect(x + 22, y + 10, 16, 10);

    } else if (est.tipo === 'maquinaRayosX') {
      // Máquina de rayos X — estructura metálica con pantalla
      ctx.fillStyle = '#555555';
      ctx.fillRect(x, y, a, h);
      // Túnel
      ctx.fillStyle = '#3a3a3a';
      ctx.fillRect(x + 10, y + 15, a - 20, h - 30);
      // Cortinas de goma
      ctx.fillStyle = '#222222';
      for (let i = 0; i < 5; i++) {
        ctx.fillRect(x + 12 + i * 4, y + 17, 2, h - 34);
      }
      for (let i = 0; i < 5; i++) {
        ctx.fillRect(x + a - 32 + i * 4, y + 17, 2, h - 34);
      }
      // Pantalla de la máquina
      ctx.fillStyle = '#1a3a1a';
      ctx.fillRect(x + a / 2 - 15, y - 15, 30, 14);
      ctx.fillStyle = '#44cc44';
      ctx.fillRect(x + a / 2 - 13, y - 13, 26, 10);
      // Cinta transportadora
      ctx.fillStyle = '#666666';
      ctx.fillRect(x - 30, y + h / 2 - 5, 30, 10);
      ctx.fillRect(x + a, y + h / 2 - 5, 30, 10);

    } else if (est.tipo === 'barreraSeguridad') {
      // Barreras de cinta retráctil
      ctx.fillStyle = '#888888';
      // Postes
      ctx.fillRect(x, y, 6, h);
      ctx.fillRect(x + a - 6, y, 6, h);
      // Cinta
      ctx.fillStyle = '#cc3333';
      ctx.fillRect(x + 6, y + h / 2 - 2, a - 12, 4);
      ctx.fillStyle = '#FFFFFF';
      // Rayas de la cinta
      for (let i = 0; i < a - 12; i += 12) {
        ctx.fillRect(x + 6 + i, y + h / 2 - 2, 6, 4);
      }

    } else if (est.tipo === 'carrusel') {
      // Carrusel de equipaje — forma circular/ovalada
      ctx.fillStyle = '#555555';
      ctx.beginPath();
      ctx.ellipse(x + a / 2, y + h / 2, a / 2, h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Cinta interior
      ctx.fillStyle = '#444444';
      ctx.beginPath();
      ctx.ellipse(x + a / 2, y + h / 2, a / 2 - 15, h / 2 - 15, 0, 0, Math.PI * 2);
      ctx.fill();
      // Interior vacío
      ctx.fillStyle = '#666666';
      ctx.beginPath();
      ctx.ellipse(x + a / 2, y + h / 2, a / 2 - 25, h / 2 - 25, 0, 0, Math.PI * 2);
      ctx.fill();
      // Maletas en la cinta (girando visualmente)
      const angulo = this.tiempoTotal * 0.5;
      for (let m = 0; m < 3; m++) {
        const ma = angulo + m * (Math.PI * 2 / 3);
        const mx = x + a / 2 + Math.cos(ma) * (a / 2 - 18);
        const my = y + h / 2 + Math.sin(ma) * (h / 2 - 18);
        const coloresMaleta = ['#cc4444', '#4444cc', '#44aa44'];
        ctx.fillStyle = coloresMaleta[m];
        ctx.fillRect(mx - 8, my - 5, 16, 10);
        ctx.fillStyle = '#222222';
        ctx.fillRect(mx - 3, my - 7, 6, 3);
      }

    } else if (est.tipo === 'puertaEmbarque') {
      // Puertas de embarque — estructura con cartel
      ctx.fillStyle = '#3a3a4a';
      ctx.fillRect(x, y, a, h);
      // Ventana
      ctx.fillStyle = '#6688aa';
      ctx.fillRect(x + 20, y + 5, a - 40, h - 15);
      // Marco
      ctx.strokeStyle = '#555555';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 20, y + 5, a - 40, h - 15);
      // Cartel de vuelo
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(x + a / 2 - 30, y + h + 2, 60, 16);
      ctx.fillStyle = '#FFD700';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GATE A1', x + a / 2, y + h + 13);
      ctx.textAlign = 'left';

    } else if (est.tipo === 'oficinaInterpol') {
      // Oficina de INTERPOL — habitación cerrada
      ctx.fillStyle = '#3a3a4a';
      ctx.fillRect(x, y, a, h);
      // Interior visible
      ctx.fillStyle = '#4a4a5a';
      ctx.fillRect(x + 5, y + 5, a - 10, h - 10);
      // Puerta
      ctx.fillStyle = '#5a4a3a';
      ctx.fillRect(x + a / 2 - 15, y + h - 5, 30, 5);
      // Logo INTERPOL
      ctx.fillStyle = '#2a4a8a';
      ctx.fillRect(x + a / 2 - 25, y - 18, 50, 16);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('INTERPOL', x + a / 2, y - 6);
      ctx.textAlign = 'left';
      // Escritorio dentro
      ctx.fillStyle = '#5a4a3a';
      ctx.fillRect(x + 20, y + 40, 60, 30);
    }

    // Nombre de la estructura
    ctx.font = '9px monospace';
    ctx.fillStyle = 'rgba(150, 150, 170, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText(est.nombre, x + a / 2, y + h + 15);
    ctx.textAlign = 'left';
  }

  // --- Dibujar NPC ---
  _dibujarNPC(ctx, npc, offsetX, offsetY, jugador) {
    const nx = npc.x + offsetX;
    const ny = npc.y + offsetY;

    if (npc.id === 'draMartinez') {
      // Dra. Martínez — arqueóloga con bata de laboratorio
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(nx, ny, npc.ancho, npc.alto);
      // Cabeza
      ctx.fillStyle = '#D2956A';
      ctx.fillRect(nx + 4, ny - 10, 20, 12);
      // Pelo recogido
      ctx.fillStyle = '#2a1a0a';
      ctx.fillRect(nx + 3, ny - 13, 22, 6);
      ctx.fillRect(nx + 20, ny - 10, 6, 8);
      // Ojos
      ctx.fillStyle = '#000000';
      ctx.fillRect(nx + 10, ny - 5, 2, 2);
      ctx.fillRect(nx + 16, ny - 5, 2, 2);
      // Gafas
      ctx.strokeStyle = '#666666';
      ctx.lineWidth = 1;
      ctx.strokeRect(nx + 8, ny - 7, 6, 5);
      ctx.strokeRect(nx + 15, ny - 7, 6, 5);
      ctx.beginPath();
      ctx.moveTo(nx + 14, ny - 5);
      ctx.lineTo(nx + 15, ny - 5);
      ctx.stroke();

    } else if (npc.id === 'agenteAduanas') {
      // Agente Rosa Montero — uniforme azul de aduanas
      ctx.fillStyle = '#2a4a6a';
      ctx.fillRect(nx, ny, npc.ancho, npc.alto);
      // Cabeza
      ctx.fillStyle = '#C68642';
      ctx.fillRect(nx + 4, ny - 10, 20, 12);
      // Gorra de uniforme
      ctx.fillStyle = '#1a3a5a';
      ctx.fillRect(nx + 2, ny - 14, 24, 6);
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(nx + 10, ny - 14, 8, 2);
      // Ojos
      ctx.fillStyle = '#000000';
      ctx.fillRect(nx + 10, ny - 5, 2, 2);
      ctx.fillRect(nx + 16, ny - 5, 2, 2);
      // Insignia
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(nx + 3, ny + 5, 6, 6);

    } else if (npc.id === 'inspector') {
      // Inspector Ramírez — traje oscuro de INTERPOL
      ctx.fillStyle = '#2a2a3a';
      ctx.fillRect(nx, ny, npc.ancho, npc.alto);
      // Cabeza
      ctx.fillStyle = '#D2956A';
      ctx.fillRect(nx + 4, ny - 10, 20, 12);
      // Pelo corto gris
      ctx.fillStyle = '#888888';
      ctx.fillRect(nx + 3, ny - 13, 22, 5);
      // Ojos
      ctx.fillStyle = '#000000';
      ctx.fillRect(nx + 10, ny - 5, 2, 2);
      ctx.fillRect(nx + 16, ny - 5, 2, 2);
      // Placa de INTERPOL
      ctx.fillStyle = '#4488cc';
      ctx.fillRect(nx + 2, ny + 4, 8, 5);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '5px monospace';
      ctx.fillText('ID', nx + 3, ny + 8);
      // Corbata
      ctx.fillStyle = '#cc3333';
      ctx.fillRect(nx + 12, ny, 4, 12);

    } else if (npc.id === 'abogada') {
      // Lcda. Carmen Vidal — traje formal de abogada
      ctx.fillStyle = '#5a2a3a';
      ctx.fillRect(nx, ny, npc.ancho, npc.alto);
      // Cabeza
      ctx.fillStyle = '#C68642';
      ctx.fillRect(nx + 4, ny - 10, 20, 12);
      // Pelo largo oscuro
      ctx.fillStyle = '#1a0a00';
      ctx.fillRect(nx + 2, ny - 13, 24, 6);
      ctx.fillRect(nx + 1, ny - 8, 6, 14);
      ctx.fillRect(nx + 21, ny - 8, 6, 14);
      // Ojos
      ctx.fillStyle = '#000000';
      ctx.fillRect(nx + 10, ny - 5, 2, 2);
      ctx.fillRect(nx + 16, ny - 5, 2, 2);
      // Maletín de abogada
      ctx.fillStyle = '#5a3a1a';
      ctx.fillRect(nx + npc.ancho + 2, ny + 15, 10, 8);
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(nx + npc.ancho + 5, ny + 14, 4, 2);
      // Collar de perlas
      ctx.fillStyle = '#EEEEEE';
      ctx.fillRect(nx + 8, ny - 1, 12, 2);

    } else if (npc.id === 'traficante') {
      // Rodrigo Torres — traje de negocios oscuro
      if (this.combateTerminado) {
        // Después de ser detenido: aspecto derrotado
        ctx.fillStyle = '#3a3a3a';
      } else {
        ctx.fillStyle = '#1a1a2e';
      }
      ctx.fillRect(nx, ny, npc.ancho, npc.alto);
      // Cabeza
      ctx.fillStyle = '#D2956A';
      ctx.fillRect(nx + 4, ny - 10, 20, 12);
      // Pelo peinado hacia atrás
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(nx + 3, ny - 13, 22, 5);
      // Ojos (gafas de sol si no está derrotado)
      if (!this.combateTerminado) {
        ctx.fillStyle = '#111111';
        ctx.fillRect(nx + 8, ny - 7, 6, 4);
        ctx.fillRect(nx + 15, ny - 7, 6, 4);
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(nx + 14, ny - 5);
        ctx.lineTo(nx + 15, ny - 5);
        ctx.stroke();
      } else {
        ctx.fillStyle = '#000000';
        ctx.fillRect(nx + 10, ny - 5, 2, 2);
        ctx.fillRect(nx + 16, ny - 5, 2, 2);
      }
      // Maletín sospechoso
      ctx.fillStyle = '#5a3a1a';
      ctx.fillRect(nx - 12, ny + 12, 12, 10);
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(nx - 10, ny + 11, 8, 2);
      // Reloj de oro
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(nx + npc.ancho - 2, ny + 14, 4, 3);
      // Corbata
      ctx.fillStyle = '#8a2a2a';
      ctx.fillRect(nx + 12, ny, 4, 12);
    }

    // Nombre
    ctx.font = '10px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(npc.nombre, nx + npc.ancho / 2, ny - 22);

    // Indicador de interacción
    if (this._estaCerca(jugador, npc, 45)) {
      if (npc.esMentor || !npc.dialogoHecho) {
        const parpadeo = Math.sin(this.tiempoTotal * 4) > 0 ? 1 : 0.4;
        ctx.font = '11px monospace';
        ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
        const texto = npc.esCombate ? '[E] ¡Sospechoso!' : '[E] Hablar';
        ctx.fillText(texto, nx + npc.ancho / 2, ny - 34);
      }
    }

    // Checkmark si habló (excepto mentor y traficante)
    if (npc.dialogoHecho && !npc.esMentor && npc.id !== 'traficante') {
      ctx.font = 'bold 14px monospace';
      ctx.fillStyle = '#44CC44';
      ctx.fillText('✓', nx + npc.ancho / 2, ny - 34);
    }

    ctx.textAlign = 'left';
  }

  // --- Dibujar jugador (versión interior — sin equipo de buceo) ---
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

    // Piernas con animación de marcha
    ctx.fillStyle = '#2a4a88';
    const pasoAnim = jugador.esAnimando ? Math.sin(jugador.cuadroAnimacion * 5) * 3 : 0;
    ctx.fillRect(px + 6, py + 26 + pasoAnim, 7, 8);
    ctx.fillRect(px + 15, py + 26 - pasoAnim, 7, 8);

    // Zapatos
    ctx.fillStyle = '#333333';
    ctx.fillRect(px + 5, py + 33 + pasoAnim, 9, 3);
    ctx.fillRect(px + 14, py + 33 - pasoAnim, 9, 3);
  }

  // --- Hablar con NPC ---
  _hablarConNPC(npc, jugador) {
    const textos = this._obtenerTextos();
    const jur = textos?.dialogos?.juridico;

    if (npc.id === 'draMartinez') {
      // Dra. Martínez — explica la situación del tráfico
      if (npc.dialogoHecho) {
        // Post-combate o ya habló
        if (this.combateTerminado) {
          this.dialogos.iniciarDialogo([
            { personaje: '🔬 Dra. Martínez', texto: jur?.draMartinezPostCombate || '¡Lo lograste! Los artefactos serán devueltos al Museo del Hombre Dominicano.' }
          ]);
        } else {
          this.dialogos.iniciarDialogo([
            { personaje: '🔬 Dra. Martínez', texto: jur?.draMartinezRepite || 'Habla con la Agente Montero en aduanas. Ella puede darte los registros.' }
          ]);
        }
      } else {
        this.dialogos.iniciarDialogo([
          { personaje: '🔬 Dra. Martínez', texto: jur?.draMartinez1 || '¡Te estaba esperando! El mapa de naufragios reveló algo inquietante.' },
          { personaje: '🔬 Dra. Martínez', texto: jur?.draMartinez2 || 'Alguien está sacando artefactos arqueológicos del país a través de este aeropuerto.' },
          { personaje: '🔬 Dra. Martínez', texto: jur?.draMartinez3 || 'Necesitamos evidencia sólida. Habla con la Agente de Aduanas y el Inspector de INTERPOL.' },
          { personaje: '🔬 Dra. Martínez', texto: jur?.draMartinez4 || 'La Licenciada Carmen Vidal te asesorará sobre las leyes de protección patrimonial.' }
        ], () => { npc.dialogoHecho = true; });
      }

    } else if (npc.id === 'agenteAduanas') {
      // Agente Rosa Montero — enseña sobre la Ley 318
      if (npc.dialogoHecho) {
        if (this.combateTerminado) {
          this.dialogos.iniciarDialogo([
            { personaje: '🛃 Agente Montero', texto: jur?.agentePostCombate || 'Este caso sentará un precedente. La Ley 318 se aplica con todo su peso.' }
          ]);
        } else {
          this.dialogos.iniciarDialogo([
            { personaje: '🛃 Agente Montero', texto: jur?.agenteRepite || 'El registro aduanal está cerca de la máquina de rayos X. Recógelo como evidencia.' }
          ]);
        }
      } else {
        this.dialogos.iniciarDialogo([
          { personaje: '🛃 Agente Montero', texto: jur?.agente1 || 'Soy la Agente Rosa Montero, de Aduanas. He detectado movimientos sospechosos.' },
          { personaje: '🛃 Agente Montero', texto: jur?.agente2 || 'La Ley 318-68 prohíbe sacar del país cualquier bien del patrimonio cultural dominicano.' },
          { personaje: '🛃 Agente Montero', texto: jur?.agente3 || 'Las multas van desde 500 hasta 10,000 salarios mínimos, más prisión de 2 a 10 años.' },
          { personaje: '🛃 Agente Montero', texto: jur?.agente4 || 'He preparado un registro aduanal con las anomalías. Búscalo cerca de la máquina de rayos X.' }
        ], () => { npc.dialogoHecho = true; });
      }

    } else if (npc.id === 'inspector') {
      // Inspector Ramírez — enseña sobre cooperación internacional
      if (npc.dialogoHecho) {
        if (this.combateTerminado) {
          this.dialogos.iniciarDialogo([
            { personaje: '🔵 Inspector Ramírez', texto: jur?.inspectorPostCombate || 'INTERPOL ya emitió la alerta. Este traficante no escapará de la justicia internacional.' }
          ]);
        } else {
          this.dialogos.iniciarDialogo([
            { personaje: '🔵 Inspector Ramírez', texto: jur?.inspectorRepite || 'Reúne toda la evidencia posible antes de confrontar al sospechoso.' }
          ]);
        }
      } else {
        this.dialogos.iniciarDialogo([
          { personaje: '🔵 Inspector Ramírez', texto: jur?.inspector1 || 'Inspector Ramírez, INTERPOL. Estamos rastreando una red de tráfico de antigüedades.' },
          { personaje: '🔵 Inspector Ramírez', texto: jur?.inspector2 || 'INTERPOL tiene una base de datos de obras de arte robadas con más de 52,000 registros.' },
          { personaje: '🔵 Inspector Ramírez', texto: jur?.inspector3 || 'La cooperación entre países es clave. Un artefacto robado en RD puede aparecer en una subasta en Europa.' },
          { personaje: '🔵 Inspector Ramírez', texto: jur?.inspector4 || 'Con tu evidencia y la Ley 318, podemos activar una alerta internacional contra Torres.' }
        ], () => { npc.dialogoHecho = true; });
      }

    } else if (npc.id === 'abogada') {
      // Lcda. Carmen Vidal — mentora legal (diálogo rotativo)
      // Cada vez que hablas, avanza al siguiente tema legal
      const conversaciones = [
        // 0: Ley 318-68
        [
          { personaje: '⚖️ Lcda. Vidal', texto: jur?.carmen1_1 || 'Soy la Licenciada Carmen Vidal, especialista en derecho patrimonial.' },
          { personaje: '⚖️ Lcda. Vidal', texto: jur?.carmen1_2 || 'La Ley 318-68 declara patrimonio nacional todo objeto arqueológico encontrado en suelo dominicano.' },
          { personaje: '⚖️ Lcda. Vidal', texto: jur?.carmen1_3 || 'Nadie puede exportar, vender ni destruir bienes patrimoniales sin autorización del Estado.' }
        ],
        // 1: UNESCO 1970
        [
          { personaje: '⚖️ Lcda. Vidal', texto: jur?.carmen2_1 || 'La Convención UNESCO de 1970 es el marco internacional contra el tráfico de bienes culturales.' },
          { personaje: '⚖️ Lcda. Vidal', texto: jur?.carmen2_2 || 'Más de 140 países la ratificaron. Obliga a devolver bienes culturales robados a su país de origen.' }
        ],
        // 2: Cómo denunciar
        [
          { personaje: '⚖️ Lcda. Vidal', texto: jur?.carmen3_1 || 'Para denunciar tráfico de patrimonio, se presenta una denuncia ante el Ministerio de Cultura.' },
          { personaje: '⚖️ Lcda. Vidal', texto: jur?.carmen3_2 || 'También puedes ir a la Procuraduría General. Ellos activan la cadena judicial.' }
        ],
        // 3: Ministerio de Cultura
        [
          { personaje: '⚖️ Lcda. Vidal', texto: jur?.carmen4_1 || 'El Ministerio de Cultura custodia el patrimonio nacional a través de la Dirección de Patrimonio Monumental.' },
          { personaje: '⚖️ Lcda. Vidal', texto: jur?.carmen4_2 || 'Ellos mantienen el registro de bienes culturales y autorizan — o niegan — cualquier exportación.' }
        ],
        // 4: Casos famosos
        [
          { personaje: '⚖️ Lcda. Vidal', texto: jur?.carmen5_1 || 'En 2014, RD recuperó artefactos taínos que habían sido vendidos ilegalmente a coleccionistas europeos.' },
          { personaje: '⚖️ Lcda. Vidal', texto: jur?.carmen5_2 || 'Gracias a INTERPOL y la Ley 318, las piezas volvieron al Museo del Hombre Dominicano.' }
        ]
      ];

      const indice = this._carmenConversacion % conversaciones.length;
      this.dialogos.iniciarDialogo(conversaciones[indice], () => {
        this._carmenConversacion++;
      });

    } else if (npc.id === 'traficante') {
      if (npc.esCombate && !this.combateTerminado) {
        // Diálogo pre-combate con Rodrigo Torres
        this.dialogos.iniciarDialogo([
          { personaje: '💼 Rodrigo Torres', texto: jur?.traficante1 || '¿Qué quieres, muchacho? Estoy esperando mi vuelo.' },
          { personaje: '💼 Rodrigo Torres', texto: jur?.traficante2 || '¿Artefactos? No sé de qué hablas. Esta maleta tiene... souvenirs.' }
        ], () => {
          // Iniciar combate legal
          this.combateIniciado = true;
          if (this.juego && this.juego.combate) {
            this.juego.combate.iniciar({
              nombre: 'Rodrigo Torres',
              vida: 40,
              vidaMaxima: 40,
              fuerza: 3,
              velocidad: 2,
              hostilidad: 70,
              tipoSprite: 'traficante',
              etiquetaConvencimiento: jur?.etiquetaEvidencia || 'Evidencia:',
              pistaPersonalizada: jur?.combatePista || 'Usa las leyes y la evidencia para construir un caso legal',
              opcionesPersonalizadas: [
                {
                  // --- Citar la Ley 318 ---
                  // La base legal dominicana contra el tráfico de patrimonio
                  id: 'ley318',
                  nombre: jur?.accionLey318 || 'Ley 318',
                  paciencia: [12, 18],
                  hostilidad: [8, 14],
                  mensaje: jur?.accionLey318Msg || '¡Citas la Ley 318-68 de Patrimonio Cultural!',
                  respuestaEnemigo: {
                    mensaje: jur?.respuestaLey318 || 'Torres muestra permisos de exportación falsificados.',
                    hostilidad: [6, 10],
                    paciencia: [3, 6]
                  }
                },
                {
                  // --- Evidencia forense ---
                  // Demostrar que los artefactos son auténticos
                  id: 'evidenciaForense',
                  nombre: jur?.accionForense || 'Evidencia',
                  paciencia: [15, 22],
                  hostilidad: [6, 10],
                  mensaje: jur?.accionForenseMsg || '¡Presentas la evidencia forense de autenticidad!',
                  respuestaEnemigo: {
                    mensaje: jur?.respuestaForense || 'Torres alega que son réplicas artesanales.',
                    hostilidad: [8, 12],
                    paciencia: [4, 8]
                  }
                },
                {
                  // --- Alerta INTERPOL ---
                  // Cooperación internacional para bloquear la huida
                  id: 'interpol',
                  nombre: jur?.accionInterpol || 'INTERPOL',
                  paciencia: [18, 25],
                  hostilidad: [10, 16],
                  mensaje: jur?.accionInterpolMsg || '¡Activas la alerta internacional de INTERPOL!',
                  respuestaEnemigo: {
                    mensaje: jur?.respuestaInterpol || 'Torres amenaza con huir a otra jurisdicción.',
                    hostilidad: [10, 14],
                    paciencia: [5, 10]
                  }
                },
                {
                  // --- Convención UNESCO 1970 ---
                  // Marco legal internacional
                  id: 'unesco',
                  nombre: jur?.accionUnesco || 'UNESCO 1970',
                  paciencia: [10, 15],
                  hostilidad: [12, 18],
                  mensaje: jur?.accionUnescoMsg || '¡Invocas la Convención UNESCO de 1970!',
                  respuestaEnemigo: {
                    mensaje: jur?.respuestaUnesco || 'Torres intenta sobornar para que lo dejen ir.',
                    hostilidad: [4, 7],
                    paciencia: [2, 5]
                  }
                }
              ]
            });
          }
        });
      } else {
        // Después de ser detenido
        this.dialogos.iniciarDialogo([
          { personaje: '💼 Rodrigo Torres', texto: jur?.traficantePostCombate || 'Me atraparon... pero esto es más grande que yo. Hay toda una red.' }
        ]);
      }
    }
  }

  // ============================================================
  // UTILIDADES
  // ============================================================

  // --- Verificar si dos objetos están cerca ---
  _estaCerca(a, b, distancia) {
    const dx = (a.x + (a.ancho || 0) / 2) - (b.x + (b.ancho || 0) / 2);
    const dy = (a.y + (a.alto || 0) / 2) - (b.y + (b.alto || 0) / 2);
    return Math.sqrt(dx * dx + dy * dy) < distancia;
  }

  // --- Obtener textos del idioma actual ---
  _obtenerTextos() {
    if (this.juego && this.juego.idiomas) {
      return this.juego.idiomas.traducciones[this.juego.idiomas.idiomaActual];
    }
    return null;
  }
}
