// ============================================================
// MUSEO-HOMBRE.JS — Museo del Hombre Dominicano
// ============================================================
// Principal museo antropológico del Caribe, ubicado en Santo
// Domingo. Aquí el jugador entrega los 3 artefactos recuperados
// del cenote del Manantial de la Aleta.
//
// NPCs:
// - Curador del museo (recibe los artefactos, completa sidequest)
// - Arqueóloga de Indiana University (contexto científico)
// - 2 visitantes (diálogos educativos sobre patrimonio)
//
// Al entregar los 3 artefactos: +20 reputación, misión completada.
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';

export class MuseoHombre {

  constructor() {
    this.juego = null;
    this.dialogos = new SistemaDialogos();
    this.sfx = new SonidoProcedural();
    this.bloqueoEntrada = true;
    this.tiempoTotal = 0;

    // Interior del museo (una sala, sin scroll)
    this.anchoNivel = ANCHO_JUEGO;
    this.altoNivel = ALTO_JUEGO;

    // NPCs
    this.npcs = [];

    // Estado de entrega
    this._artefactosEntregados = false;
  }

  iniciar(juego) {
    this.juego = juego;
    this.bloqueoEntrada = true;
    this.tiempoTotal = 0;

    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';
      juego.jugador.x = ANCHO_JUEGO / 2 - 14;
      juego.jugador.y = ALTO_JUEGO - 80;
    }

    this._artefactosEntregados = juego.misiones?.estaCompletada('ofrendasAleta') || false;

    // --- NPCs ---
    this.npcs = [
      {
        id: 'curador', x: 420, y: 120, ancho: 28, alto: 32,
        nombre: 'Dr. Veloz', color: '#2255AA', dialogoHecho: false
      },
      {
        id: 'arqueologa', x: 180, y: 200, ancho: 28, alto: 32,
        nombre: 'Dra. Conrad', color: '#AA5522', dialogoHecho: false
      },
      {
        id: 'visitante1', x: 700, y: 250, ancho: 28, alto: 32,
        nombre: 'Visitante', color: '#888888', dialogoHecho: false
      },
      {
        id: 'visitante2', x: 100, y: 350, ancho: 28, alto: 32,
        nombre: 'Estudiante', color: '#55AA88', dialogoHecho: false
      }
    ];

    // Vitrinas del museo (obstáculos decorativos)
    this._vitrinas = [
      { x: 50, y: 80, ancho: 100, alto: 60 },
      { x: 300, y: 80, ancho: 100, alto: 60 },
      { x: 550, y: 80, ancho: 100, alto: 60 },
      { x: 150, y: 300, ancho: 80, alto: 50 },
      { x: 600, y: 300, ancho: 80, alto: 50 }
    ];

    // Diálogo de bienvenida
    const t = this._obtenerTextos()?.dialogos?.museoHombre;
    this.dialogos.iniciarDialogo([
      { personaje: '🏛️', texto: t?.entrada || 'Museo del Hombre Dominicano — Santo Domingo. El principal museo antropológico del Caribe.' }
    ]);
  }

  actualizar(dt, entrada, jugador, companeros) {
    if (!jugador) return;
    this.tiempoTotal += dt;

    // --- Diálogo ---
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

    // --- Movimiento ---
    jugador.velocidadX = 0;
    jugador.velocidadY = 0;
    jugador.esAnimando = false;

    if (entrada.estaPresionada('arriba')) { jugador.velocidadY = -VELOCIDAD_JUGADOR; jugador.direccion = 'arriba'; jugador.esAnimando = true; }
    if (entrada.estaPresionada('abajo')) { jugador.velocidadY = VELOCIDAD_JUGADOR; jugador.direccion = 'abajo'; jugador.esAnimando = true; }
    if (entrada.estaPresionada('izquierda')) { jugador.velocidadX = -VELOCIDAD_JUGADOR; jugador.direccion = 'izquierda'; jugador.esAnimando = true; }
    if (entrada.estaPresionada('derecha')) { jugador.velocidadX = VELOCIDAD_JUGADOR; jugador.direccion = 'derecha'; jugador.esAnimando = true; }

    const factorTiempo = dt * 60;
    jugador.x += jugador.velocidadX * factorTiempo;
    jugador.y += jugador.velocidadY * factorTiempo;

    // Límites
    jugador.x = Math.max(10, Math.min(jugador.x, this.anchoNivel - 40));
    jugador.y = Math.max(10, Math.min(jugador.y, this.altoNivel - 40));

    // Colisión con vitrinas
    for (const v of this._vitrinas) {
      if (jugador.x + 28 > v.x && jugador.x < v.x + v.ancho &&
          jugador.y + 32 > v.y && jugador.y < v.y + v.alto) {
        // Empujar fuera
        const dx = (jugador.x + 14) - (v.x + v.ancho / 2);
        const dy = (jugador.y + 16) - (v.y + v.alto / 2);
        if (Math.abs(dx) > Math.abs(dy)) {
          jugador.x = dx > 0 ? v.x + v.ancho : v.x - 28;
        } else {
          jugador.y = dy > 0 ? v.y + v.alto : v.y - 32;
        }
      }
    }

    // --- Interacción con NPCs ---
    if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      for (const npc of this.npcs) {
        const dx = (jugador.x + 14) - (npc.x + 14);
        const dy = (jugador.y + 16) - (npc.y + 16);
        if (Math.sqrt(dx * dx + dy * dy) < 45) {
          this._hablarConNPC(npc, jugador);
          this.bloqueoEntrada = true;
          break;
        }
      }
    }
    if (!entrada.estaPresionada('accion')) this.bloqueoEntrada = false;

    // Salir con M o borde inferior
    if (entrada.estaPresionada('mapa') || jugador.y >= this.altoNivel - 42) {
      this.juego.cambiarEscena('mapaPrincipal');
    }
  }

  _hablarConNPC(npc, jugador) {
    const t = this._obtenerTextos()?.dialogos?.museoHombre;

    if (npc.id === 'curador') {
      if (this._artefactosEntregados) {
        this.dialogos.iniciarDialogo([
          { personaje: '🏛️ Dr. Veloz', texto: t?.curadorPost || 'Los artefactos del Manantial de la Aleta están siendo catalogados. Será la exhibición más importante del año.' }
        ]);
      } else if (this.juego?.misiones?.estaEnProgreso('ofrendasAleta')) {
        // Tiene los artefactos — entregarlos
        this.dialogos.iniciarDialogo([
          { personaje: '🏛️ Dr. Veloz', texto: t?.curador1 || '¡Bienvenido al Museo del Hombre Dominicano! Soy el Dr. Veloz, curador de la colección taína.' },
          { personaje: '🏛️ Dr. Veloz', texto: t?.curador2 || '¿Son esos... artefactos del Manantial de la Aleta? ¡No puede ser!' },
          { personaje: '🏛️ Dr. Veloz', texto: t?.curador3 || '¡Un duho ceremonial, un cemí de madera y una vasija ritual! Preservados por más de 500 años en el agua anóxica del cenote.' },
          { personaje: '🏛️ Dr. Veloz', texto: t?.curador4 || 'Estos artefactos son invaluables para entender la cosmología taína. Los cenotes eran portales a Coaybay, la tierra de los muertos.' },
          { personaje: '🏛️ Dr. Veloz', texto: t?.curador5 || '¡Gracias! Serán exhibidos con el mayor cuidado. Has contribuido enormemente al patrimonio cultural dominicano.' }
        ], () => {
          // Completar misión
          if (this.juego.misiones) {
            this.juego.misiones.completar('ofrendasAleta');
            if (this.juego.registro) {
              const mis = this._obtenerTextos()?.misiones || {};
              this.juego.registro.marcarCompletada(mis.ofrendasAletaTitulo || 'Ofrendas del Cenote');
            }
          }
          if (this.juego.reputacion) {
            this.juego.reputacion.modificar(20, t?.reputacionOfrendas || 'Ofrendas entregadas al museo');
          }
          this._artefactosEntregados = true;
          this.juego?.mostrarToast(t?.completadoToast || '🏛️ ¡Misión completada: Ofrendas del Cenote! +20 reputación', 4);
        });
      } else {
        this.dialogos.iniciarDialogo([
          { personaje: '🏛️ Dr. Veloz', texto: t?.curadorGenerico || 'Bienvenido al museo. Tenemos la colección de artefactos taínos más grande del Caribe.' }
        ]);
      }
    } else if (npc.id === 'arqueologa') {
      this.dialogos.iniciarDialogo([
        { personaje: '🔬 Dra. Conrad', texto: t?.arqueologa1 || 'Soy la Dra. Conrad, de Indiana University. Trabajé en las excavaciones del Manantial de la Aleta.' },
        { personaje: '🔬 Dra. Conrad', texto: t?.arqueologa2 || 'El agua sin oxígeno del cenote preservó madera, tejidos y restos orgánicos que normalmente se destruyen en el Caribe.' },
        { personaje: '🔬 Dra. Conrad', texto: t?.arqueologa3 || 'Es como una cápsula del tiempo. Los cemíes de madera que encontramos son los mejor conservados del mundo taíno.' }
      ], () => { npc.dialogoHecho = true; });
    } else if (npc.id === 'visitante1') {
      this.dialogos.iniciarDialogo([
        { personaje: '👤 Visitante', texto: t?.visitante1 || '¿Sabías que este museo tiene más de 5,000 piezas taínas? Es la colección más grande del Caribe.' }
      ]);
    } else if (npc.id === 'visitante2') {
      this.dialogos.iniciarDialogo([
        { personaje: '🎓 Estudiante', texto: t?.estudiante1 || 'Estoy haciendo mi tesis sobre la cerámica Chicoid. Los taínos tenían un arte increíble.' },
        { personaje: '🎓 Estudiante', texto: t?.estudiante2 || 'Los cemíes representaban a los espíritus ancestrales. Cada uno tenía un significado sagrado.' }
      ]);
    }
  }

  dibujar(renderizador, ancho, alto, textos, jugador) {
    const ctx = renderizador.ctx || renderizador;

    // --- Fondo: interior del museo ---
    // Suelo de mármol
    ctx.fillStyle = '#E8E0D0';
    ctx.fillRect(0, 0, ancho, alto);
    // Cuadrícula de baldosas
    ctx.strokeStyle = '#D0C8B8';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < ancho; x += 50) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, alto); ctx.stroke();
    }
    for (let y = 0; y < alto; y += 50) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(ancho, y); ctx.stroke();
    }

    // Pared norte (gris oscuro con moldura)
    ctx.fillStyle = '#4a4a55';
    ctx.fillRect(0, 0, ancho, 50);
    ctx.fillStyle = '#5a5a65';
    ctx.fillRect(0, 48, ancho, 4);

    // --- Vitrinas ---
    for (const v of this._vitrinas) {
      // Base
      ctx.fillStyle = '#3a3535';
      ctx.fillRect(v.x, v.y, v.ancho, v.alto);
      // Cristal
      ctx.fillStyle = 'rgba(200, 220, 240, 0.3)';
      ctx.fillRect(v.x + 3, v.y + 3, v.ancho - 6, v.alto - 6);
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 1;
      ctx.strokeRect(v.x + 3, v.y + 3, v.ancho - 6, v.alto - 6);
      // Artefacto dentro (decorativo)
      ctx.fillStyle = '#CCAA44';
      ctx.font = '16px monospace';
      const emojis = ['🏺', '🗿', '🪑', '🏺', '🗿'];
      const idx = this._vitrinas.indexOf(v);
      ctx.fillText(emojis[idx], v.x + v.ancho / 2 - 8, v.y + v.alto / 2 + 5);
    }

    // Cartel del museo
    ctx.fillStyle = '#2a2a35';
    ctx.fillRect(ancho / 2 - 140, 8, 280, 30);
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('MUSEO DEL HOMBRE DOMINICANO', ancho / 2, 28);
    ctx.textAlign = 'left';

    // --- NPCs ---
    for (const npc of this.npcs) {
      ctx.fillStyle = npc.color;
      ctx.fillRect(npc.x, npc.y, npc.ancho, npc.alto);
      ctx.fillStyle = '#DEB887';
      ctx.fillRect(npc.x + 5, npc.y - 8, 18, 10);
      // Nombre
      ctx.fillStyle = '#333333';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(npc.nombre, npc.x + 14, npc.y - 12);
      ctx.textAlign = 'left';
    }

    // --- Jugador ---
    if (jugador) {
      ctx.fillStyle = '#2266AA';
      ctx.fillRect(jugador.x + 2, jugador.y + 4, 24, 20);
      ctx.fillStyle = '#DEB887';
      ctx.fillRect(jugador.x + 6, jugador.y - 4, 16, 12);
      ctx.fillStyle = '#4a3020';
      ctx.fillRect(jugador.x + 6, jugador.y - 6, 16, 4);
      ctx.fillStyle = '#885522';
      ctx.fillRect(jugador.x + 5, jugador.y + 24, 8, 8);
      ctx.fillRect(jugador.x + 15, jugador.y + 24, 8, 8);
    }

    // --- Indicador [E] cerca de NPCs ---
    if (jugador) {
      for (const npc of this.npcs) {
        const dx = (jugador.x + 14) - (npc.x + 14);
        const dy = (jugador.y + 16) - (npc.y + 16);
        if (Math.sqrt(dx * dx + dy * dy) < 50) {
          ctx.fillStyle = '#FFD700';
          ctx.font = 'bold 12px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('[E]', npc.x + 14, npc.y - 18);
          ctx.textAlign = 'left';
        }
      }
    }

    // Diálogo
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto, textos);
    }
  }

  salir() {}

  _obtenerTextos() {
    if (this.juego && this.juego.idiomas) {
      return this.juego.idiomas.traducciones[this.juego.idiomas.idiomaActual];
    }
    return null;
  }
}
