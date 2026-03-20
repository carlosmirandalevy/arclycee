// ============================================================
// LAGO-ENRIQUILLO.JS - Lago Enriquillo e Isla Cabritos (Guarizacca)
// ============================================================
// El Lago Enriquillo es el lago más grande del Caribe y el punto
// más bajo de la Hispaniola (40m bajo el nivel del mar). Sus aguas
// son hipersalinas — hasta 3 veces más saladas que el mar. En su
// centro está la Isla Cabritos (nombre taíno: Guarizacca),
// hogar de cocodrilos americanos,
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
    this._anguloNado = 0; // Rotación del avatar al nadar
    this._sacudida = 0;   // Sacudida lateral al recibir daño (decae con dt)

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
      const eq = textos?.dialogos?.enriquillo;
      juego.mostrarToast('🐊 ' + (eq?.nombreLugar || 'Lago Enriquillo — El lago más grande del Caribe'), 4);
      // Dato geográfico tras unos segundos
      setTimeout(() => {
        juego.mostrarToast('📍 ' + (eq?.datoGeografico || '40m bajo el nivel del mar — aguas hipersalinas, 3× más saladas que el mar'), 5);
      }, 4500);
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

    // --- Cocodrilos americanos (Crocodylus acutus) ---
    // Lago Enriquillo alberga la mayor población de cocodrilos
    // americanos del Caribe. El jugador debe esquivarlos.
    this.cocodrilos = [
      { x: 400, y: 800, ancho: 60, alto: 25, fase: 0, velocidad: 0.4, centroX: 400, centroY: 800, radioX: 150, radioY: 60 },
      { x: 700, y: 650, ancho: 60, alto: 25, fase: Math.PI, velocidad: 0.35, centroX: 700, centroY: 650, radioX: 120, radioY: 80 },
      { x: 1100, y: 750, ancho: 60, alto: 25, fase: Math.PI / 2, velocidad: 0.45, centroX: 1100, centroY: 750, radioX: 100, radioY: 100 },
      { x: 500, y: 500, ancho: 60, alto: 25, fase: Math.PI * 1.5, velocidad: 0.3, centroX: 500, centroY: 500, radioX: 130, radioY: 50 },
      { x: 1300, y: 600, ancho: 60, alto: 25, fase: 0.5, velocidad: 0.38, centroX: 1300, centroY: 600, radioX: 140, radioY: 70 }
    ];

    // --- Iguanas del Lago Enriquillo (2 especies endémicas) ---
    // Iguana rinoceronte (Cyclura cornuta): cuernos en el hocico, ojos amarillos
    // Iguana de Ricord (Cyclura ricordii): sin cuernos, ojos rojos (más rara)
    this.iguanas = [
      // Rinocerontes en la isla (más comunes)
      { x: 800, y: 480, fase: 0, velocidad: 0.2, centroX: 800, centroY: 480, radioX: 50, radioY: 25, mirandoDerecha: true, tipo: 'rinoceronte' },
      { x: 1050, y: 540, fase: Math.PI, velocidad: 0.15, centroX: 1050, centroY: 540, radioX: 40, radioY: 20, mirandoDerecha: false, tipo: 'rinoceronte' },
      { x: 950, y: 400, fase: Math.PI / 2, velocidad: 0.18, centroX: 950, centroY: 400, radioX: 45, radioY: 22, mirandoDerecha: true, tipo: 'rinoceronte' },
      // Ricord en la isla (ojos rojos)
      { x: 880, y: 520, fase: 1.5, velocidad: 0.13, centroX: 880, centroY: 520, radioX: 30, radioY: 18, mirandoDerecha: false, tipo: 'ricord' },
      { x: 1000, y: 450, fase: 4, velocidad: 0.11, centroX: 1000, centroY: 450, radioX: 25, radioY: 15, mirandoDerecha: true, tipo: 'ricord' },
      // Rinocerontes en las orillas
      { x: 300, y: 1080, fase: 1, velocidad: 0.12, centroX: 300, centroY: 1080, radioX: 50, radioY: 10, mirandoDerecha: true, tipo: 'rinoceronte' },
      { x: 1400, y: 80, fase: 2, velocidad: 0.14, centroX: 1400, centroY: 80, radioX: 40, radioY: 12, mirandoDerecha: false, tipo: 'rinoceronte' },
      // Ricord en las orillas (más raras)
      { x: 100, y: 200, fase: 3, velocidad: 0.16, centroX: 100, centroY: 200, radioX: 30, radioY: 15, mirandoDerecha: true, tipo: 'ricord' },
      { x: 1600, y: 600, fase: 5, velocidad: 0.1, centroX: 1600, centroY: 600, radioX: 35, radioY: 10, mirandoDerecha: false, tipo: 'ricord' }
    ];

    // --- Cucú / Burrowing Owl (Athene cunicularia) ---
    // Búho pequeño que anida en madrigueras en el suelo de Isla Cabritos.
    // Activo de día, a diferencia de otros búhos.
    this.cucus = [
      { x: 870, y: 430, fase: 0 },
      { x: 1020, y: 490, fase: 1.5 },
      { x: 940, y: 550, fase: 3 }
    ];

    // --- Culebras Corredoras (Haitiophis anomalus) ---
    // La mayor serpiente colúbrida de las Américas y la más larga de las
    // Antillas (hasta 2m). Se mueve por las orillas del lago.
    this.culebras = [
      { x: 250, y: 1060, fase: 0, velocidad: 0.5, centroX: 250, centroY: 1060, radioX: 60, radioY: 8, mirandoDerecha: true },
      { x: 1500, y: 90, fase: 2, velocidad: 0.45, centroX: 1500, centroY: 90, radioX: 50, radioY: 10, mirandoDerecha: false },
      { x: 120, y: 500, fase: 4, velocidad: 0.55, centroX: 120, centroY: 500, radioX: 40, radioY: 12, mirandoDerecha: true }
    ];

    // --- Flamencos rosados (Phoenicopterus ruber) ---
    // Frecuentes en el Lago Enriquillo. Se paran en una pata en aguas poco
    // profundas de las orillas y cerca de la Isla Cabritos.
    this.flamencos = [
      // Orilla sur
      { x: 350, y: 1020, dir: 1, origenX: 350, origenY: 1020, volando: false, vuelo: 0 },
      { x: 420, y: 1035, dir: -1, origenX: 420, origenY: 1035, volando: false, vuelo: 0 },
      { x: 500, y: 1015, dir: 1, origenX: 500, origenY: 1015, volando: false, vuelo: 0 },
      // Orilla norte
      { x: 600, y: 110, dir: -1, origenX: 600, origenY: 110, volando: false, vuelo: 0 },
      { x: 700, y: 105, dir: 1, origenX: 700, origenY: 105, volando: false, vuelo: 0 },
      // Cerca de la isla
      { x: 780, y: 380, dir: 1, origenX: 780, origenY: 380, volando: false, vuelo: 0 },
      { x: 1120, y: 560, dir: -1, origenX: 1120, origenY: 560, volando: false, vuelo: 0 },
      // Orilla oeste
      { x: 160, y: 600, dir: 1, origenX: 160, origenY: 600, volando: false, vuelo: 0 },
      { x: 170, y: 700, dir: -1, origenX: 170, origenY: 700, volando: false, vuelo: 0 }
    ];

    // --- Pedestal oculto y Espada de Enriquillo (boss fight secreto) ---
    // Solo visibles después de entregar el primer ídolo y que Enriquillo se haya ido
    this._pedestalVisible = !!juego.progreso?.idoloCemiEntregado;
    this._espadaRecogida = !!juego.progreso?.espadaEnriquillo;
    // Pedestal detrás de un arbusto en la isla (x:1100, y:450)
    this._pedestal = { x: 1100, y: 450 };
    // Espada en el suelo cerca del pedestal
    this._espada = { x: 1060, y: 480, recogida: this._espadaRecogida };

    // --- Elementos fotografiables (fauna del lago) ---
    // Se actualizan dinámicamente cada frame con las posiciones reales
    this.fotografiables = [];
    this._especiesInfo = {}; // Rastrea qué info de especie ya se mostró

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
    const enIsla = this._estaEnTierraJugador(jugador);
    const velMult = enIsla ? 1.0 : 0.6;

    // Toast al pisar la isla por primera vez
    if (enIsla && !this._islaVisitada) {
      this._islaVisitada = true;
      const eq = this._obtenerTextos()?.dialogos?.enriquillo;
      if (this.juego?.mostrarToast) {
        this.juego.mostrarToast('🏝️ ' + (eq?.guarizacca || 'Isla Cabritos — Guarizacca en lengua taína'), 4);
      }
    }

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

    // --- Ángulo de nado (solo en agua, no en la isla) ---
    const enAgua = !this._estaEnTierraJugador(jugador);
    if (enAgua) {
      const moviIzq = entrada.estaPresionada('izquierda');
      const moviDer = entrada.estaPresionada('derecha');
      const moviAbajo = entrada.estaPresionada('abajo');
      const moviArriba = entrada.estaPresionada('arriba');
      let anguloObjetivo = 0;
      if (moviAbajo && moviIzq) {
        anguloObjetivo = -(Math.PI - Math.PI * 0.25); // -135°
      } else if (moviAbajo && moviDer) {
        anguloObjetivo = Math.PI - Math.PI * 0.25; // 135°
      } else if (moviArriba && moviIzq) {
        anguloObjetivo = -Math.PI * 0.25; // -45°
      } else if (moviArriba && moviDer) {
        anguloObjetivo = Math.PI * 0.25; // 45°
      } else if (moviIzq || moviDer) {
        anguloObjetivo = moviIzq ? -Math.PI * 0.42 : Math.PI * 0.42;
      } else if (moviAbajo) {
        anguloObjetivo = Math.PI; // 180°
      }
      let diff = anguloObjetivo - this._anguloNado;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      this._anguloNado += diff * Math.min(1, 8 * dt);
    } else {
      // En la isla: volver a 0 gradualmente
      this._anguloNado += (0 - this._anguloNado) * Math.min(1, 8 * dt);
    }

    // Limitar al nivel
    jugador.x = Math.max(0, Math.min(this.anchoNivel - jugador.ancho, jugador.x));
    jugador.y = Math.max(0, Math.min(this.altoNivel - jugador.alto, jugador.y));

    // --- Cocodrilos americanos (Crocodylus acutus): movimiento + daño ---
    // Toast educativo al ver el primer cocodrilo de cerca
    if (!this._cocodriloAvistado) {
      for (const croc of this.cocodrilos) {
        const dcx = (jugador.x + jugador.ancho / 2) - (croc.x + croc.ancho / 2);
        const dcy = (jugador.y + jugador.alto / 2) - (croc.y + croc.alto / 2);
        if (Math.sqrt(dcx * dcx + dcy * dcy) < 120) {
          this._cocodriloAvistado = true;
          const eq = this._obtenerTextos()?.dialogos?.enriquillo;
          if (this.juego?.mostrarToast) {
            this.juego.mostrarToast('🐊 ' + (eq?.cocodriloInfo || 'Cocodrilo Americano (Crocodylus acutus) — la mayor población del Caribe vive en este lago'), 4);
          }
          break;
        }
      }
    }
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
      // Patrón idéntico al tiburón en el Santuario del Manatí
      if (!jugador._invulnerable) {
        const dx = (jugador.x + jugador.ancho / 2) - (croc.x + croc.ancho / 2);
        const dy = (jugador.y + jugador.alto / 2) - (croc.y + croc.alto / 2);
        if (Math.abs(dx) < 30 && Math.abs(dy) < 20) {
          jugador.vida = Math.max(0, jugador.vida - 8);
          jugador._invulnerable = true;
          jugador._tiempoInvulnerable = 1.5;
          // Sacudida lateral del avatar (misma intensidad que el tiburón: 0.5s)
          this._sacudida = 0.5;
          // Death roll del cocodrilo (gira sobre sí mismo)
          croc._rolando = 0.8;
          this.sfx.mordidaCocodrilo();
          if (this.juego?.mostrarToast) {
            const eq = this._obtenerTextos()?.dialogos?.enriquillo;
            this.juego.mostrarToast('🐊 ' + (eq?.mordidaCocodrilo || '¡Mordida de cocodrilo!'), 2);
          }
        }
      }
    }

    // --- Sacudida lateral (decae con dt, como en Santuario del Manatí) ---
    if (this._sacudida > 0) this._sacudida = Math.max(0, this._sacudida - dt);

    // --- Iguanas: movimiento lento (solo en tierra) ---
    for (const ig of this.iguanas) {
      // Toast al acercarse por primera vez a cada especie
      if (!ig._avistada) {
        const dix = (jugador.x + jugador.ancho / 2) - ig.x;
        const diy = (jugador.y + jugador.alto / 2) - ig.y;
        if (Math.sqrt(dix * dix + diy * diy) < 60) {
          ig._avistada = true;
          const eq = this._obtenerTextos()?.dialogos?.enriquillo;
          if (this.juego?.mostrarToast) {
            if (ig.tipo === 'rinoceronte' && !this._iguanaRinoAvistada) {
              this._iguanaRinoAvistada = true;
              this.juego.mostrarToast('🦎 ' + (eq?.iguanaRinoceronteInfo || 'Iguana Rinoceronte (Cyclura cornuta) — reconocible por sus cuernos en el hocico'), 5);
            } else if (ig.tipo === 'ricord' && !this._iguanaRicordAvistada) {
              this._iguanaRicordAvistada = true;
              this.juego.mostrarToast('🦎 ' + (eq?.iguanaRicordInfo || 'Iguana de Ricord (Cyclura ricordii) — ojos rojos distintivos. Muy amenazada.'), 5);
            }
          }
        }
      }
    }
    for (const ig of this.iguanas) {
      const prevX = ig.x;
      ig.fase += ig.velocidad * dt;
      ig.x = ig.centroX + Math.sin(ig.fase) * ig.radioX;
      ig.y = ig.centroY + Math.cos(ig.fase * 0.5) * ig.radioY;
      // Iguanas no entran al agua — revertir si salen de tierra
      if (!this._estaEnTierra(ig)) {
        ig.x = prevX;
        ig.y = ig.centroY;
        ig.fase -= ig.velocidad * dt;
      }
      ig.mirandoDerecha = ig.x > prevX;
    }

    // --- Culebras corredoras: movimiento por las orillas (no entran al agua) ---
    for (const cul of this.culebras) {
      const prevX = cul.x;
      cul.fase += cul.velocidad * dt;
      cul.x = cul.centroX + Math.sin(cul.fase) * cul.radioX;
      cul.y = cul.centroY + Math.sin(cul.fase * 1.3) * cul.radioY;
      // Culebras no entran al agua
      if (!this._estaEnTierra(cul)) {
        cul.x = prevX;
        cul.y = cul.centroY;
        cul.fase -= cul.velocidad * dt;
      }
      cul.mirandoDerecha = cul.x > prevX;
    }

    // Toast educativo al acercarse a una culebra por primera vez
    if (!this._culebraAvistada) {
      for (const cul of this.culebras) {
        const dcx = (jugador.x + jugador.ancho / 2) - cul.x;
        const dcy = (jugador.y + jugador.alto / 2) - cul.y;
        if (Math.sqrt(dcx * dcx + dcy * dcy) < 80) {
          this._culebraAvistada = true;
          const eq = this._obtenerTextos()?.dialogos?.enriquillo;
          if (this.juego?.mostrarToast) {
            this.juego.mostrarToast('🐍 ' + (eq?.culebraInfo || 'Culebra Corredora (Haitiophis anomalus) — la serpiente más larga de las Antillas, hasta 2m'), 5);
          }
          break;
        }
      }
    }

    // --- Flamencos: movimiento lento + vuelo si el jugador se acerca ---
    for (const fl of this.flamencos) {
      if (fl.volando) {
        // Volando: asciende y se aleja rápido
        fl.vuelo += dt;
        fl.y -= 60 * dt;
        fl.x += fl.dir * 40 * dt;
        // Después de 3 segundos, regresa a su posición original
        if (fl.vuelo > 3) {
          fl.volando = false;
          fl.vuelo = 0;
          fl.x = fl.origenX;
          fl.y = fl.origenY;
        }
      } else {
        // Movimiento muy sutil (apenas se nota, como un flamenco real)
        fl.x += Math.sin(this.tiempoTotal * 0.15 + fl.origenX * 0.02) * 0.08;
        fl.y += Math.cos(this.tiempoTotal * 0.1 + fl.origenY * 0.01) * 0.04;
        // Espantar si el jugador se acerca a menos de 80px
        const dfx = (jugador.x + jugador.ancho / 2) - fl.x;
        const dfy = (jugador.y + jugador.alto / 2) - fl.y;
        if (Math.sqrt(dfx * dfx + dfy * dfy) < 80) {
          fl.volando = true;
          fl.vuelo = 0;
          fl.dir = dfx < 0 ? 1 : -1; // Vuela en dirección opuesta al jugador
        }
      }
    }

    // --- Cucú: toast educativo al acercarse por primera vez ---
    if (!this._cucuAvistado) {
      for (const cu of this.cucus) {
        const dcx = (jugador.x + jugador.ancho / 2) - cu.x;
        const dcy = (jugador.y + jugador.alto / 2) - cu.y;
        if (Math.sqrt(dcx * dcx + dcy * dcy) < 50) {
          this._cucuAvistado = true;
          const eq = this._obtenerTextos()?.dialogos?.enriquillo;
          if (this.juego?.mostrarToast) {
            this.juego.mostrarToast('🦉 ' + (eq?.cucuInfo1 || 'Cucú (Athene cunicularia) — búho que vive en madrigueras en el suelo'), 4);
            setTimeout(() => {
              this.juego.mostrarToast('🦉 ' + (eq?.cucuInfo2 || '¡No excavan! Usan madrigueras abandonadas de otros animales. Son búhos que "piden prestado".'), 5);
            }, 4500);
          }
          break;
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

    // --- Espada de Enriquillo (pickup antes del boss fight) ---
    if (this._pedestalVisible && !this._espada.recogida) {
      const dex = (jugador.x + jugador.ancho / 2) - this._espada.x;
      const dey = (jugador.y + jugador.alto / 2) - this._espada.y;
      if (Math.sqrt(dex * dex + dey * dey) < 30 && entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
        this._espada.recogida = true;
        if (this.juego?.progreso) this.juego.progreso.espadaEnriquillo = true;
        if (this.juego?.jugador) this.juego.jugador.agregarAlInventario({ nombre: 'espadaEnriquillo' });
        if (this.juego?.inventario) {
          const _t = this._obtenerTextos()?.objetos || {};
          this.juego.inventario.agregar({
            id: 'espadaEnriquillo',
            nombre: _t.espadaEnriquillo || 'Espada de Enriquillo',
            descripcion: _t.descEspadaEnriquillo || 'Espada ceremonial del cacique. Necesaria para enfrentar al espíritu del cemí.',
            tipo: 'herramienta', cantidad: 1, color: '#DAA520', esUsable: false
          });
        }
        this.sfx.recoger();
        const _t2 = this._obtenerTextos();
        if (this.juego?.mostrarToast) {
          this.juego.mostrarToast('⚔️ ' + (_t2?.objetos?.espadaEnriquillo || 'Espada de Enriquillo'));
        }
        this.bloqueoEntrada = true;
      }
    }

    // --- Pedestal oculto (activa el boss fight) ---
    if (this._pedestalVisible && this._espada.recogida) {
      const dpx = (jugador.x + jugador.ancho / 2) - this._pedestal.x;
      const dpy = (jugador.y + jugador.alto / 2) - this._pedestal.y;
      if (Math.sqrt(dpx * dpx + dpy * dpy) < 40 && entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
        // Si ya tiene la bendición, reconocerlo
        if (this.juego?.progreso?.bendicionDivina) {
          const eq = this._obtenerTextos()?.dialogos?.enriquillo;
          this.dialogos.iniciarDialogo([
            { personaje: '☀ Espíritu', texto: eq?.yaBendecido || 'Ya posees la Bendición Divina. El espíritu te reconoce.' }
          ]);
        } else {
          // Iniciar el boss fight
          if (this.juego?.bossCemi) {
            this.juego.bossCemi.iniciar({
              alTerminar: (resultado) => {
                if (resultado === 'victoria' && !this.juego.progreso.bendicionDivina) {
                  this.juego.progreso.bendicionDivina = true;
                  // Aplicar Bendición Divina
                  if (this.juego.jugador) {
                    this.juego.jugador.vidaMaxima = (this.juego.jugador.vidaMaxima || 100) + 30;
                    this.juego.jugador.vida = this.juego.jugador.vidaMaxima;
                    this.juego.jugador.fuerza = (this.juego.jugador.fuerza || 1) + 5;
                  }
                  if (this.juego.progreso) this.juego.progreso.bonusVelocidad = 1.2;
                  const eq2 = this._obtenerTextos()?.dialogos?.enriquillo;
                  if (this.juego.mostrarToast) {
                    this.juego.mostrarToast('✨ ' + (eq2?.bendicionRecibida || 'Bendición Divina: +30 vida, +5 fuerza, +20% velocidad'), 5);
                  }
                }
                // Derrota: no pasa nada, como un sueño
              }
            });
          }
        }
        this.bloqueoEntrada = true;
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
    if (!entrada.estaPresionada('accion') && !entrada.estaPresionada('mapa')) {
      this.bloqueoEntrada = false;
    }

    // --- Volver al mapa con M ---
    if (entrada.estaPresionada('mapa') && !this.bloqueoEntrada) {
      if (this.juego?.cambiarEscena) this.juego.cambiarEscena('mapaPrincipal');
      this.bloqueoEntrada = true;
      return;
    }

    // --- Actualizar fotografiables con posiciones actuales de la fauna ---
    this.fotografiables = [];
    for (const ig of this.iguanas) {
      this.fotografiables.push({
        x: ig.x - 5, y: ig.y - 5, ancho: 30, alto: 15,
        nombre: ig.tipo === 'ricord' ? 'Iguana de Ricord' : 'Iguana Rinoceronte',
        tipoEntidad: 'fauna'
      });
    }
    for (const fl of this.flamencos) {
      if (!fl.volando) {
        this.fotografiables.push({
          x: fl.x - 8, y: fl.y - 25, ancho: 16, alto: 30,
          nombre: 'Flamenco Rosado', tipoEntidad: 'fauna'
        });
      }
    }
    for (const cu of this.cucus) {
      this.fotografiables.push({
        x: cu.x - 5, y: cu.y - 8, ancho: 12, alto: 16,
        nombre: 'Cucú', tipoEntidad: 'fauna'
      });
    }
    for (const cul of this.culebras) {
      this.fotografiables.push({
        x: cul.x - 10, y: cul.y - 5, ancho: 40, alto: 10,
        nombre: 'Culebra Corredora', tipoEntidad: 'fauna'
      });
    }
    for (const croc of this.cocodrilos) {
      this.fotografiables.push({
        x: croc.x, y: croc.y, ancho: croc.ancho, alto: croc.alto,
        nombre: 'Cocodrilo Americano', tipoEntidad: 'fauna'
      });
    }

    // Salir por borde inferior (jugador.y está clampeado a altoNivel - alto)
    if (jugador.y >= this.altoNivel - jugador.alto - 5 && this.juego) {
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

    // --- Isla Cabritos / Guarizacca (centro del lago) ---
    // Dimensiones reales: 12km × 2.5km (relación ~5:1, mucho más ancha que alta)
    // Forma irregular con costa dentada, no una elipse perfecta
    // Nombre taíno: Guarizacca
    const islaCX = 900 + offsetX; // Centro X de la isla
    const islaCY = 500 + offsetY; // Centro Y de la isla

    // Polígono irregular de la isla (puntos en sentido horario)
    // Costa norte más recta, costa sur con bahías y protuberancias
    const islaForma = [
      [310, 445], [380, 430], [450, 438], [520, 425], [600, 420],
      [680, 430], [750, 418], [830, 422], [900, 415], [970, 420],
      [1050, 425], [1120, 418], [1200, 428], [1280, 435], [1350, 445],
      [1400, 455], [1430, 470], [1450, 490], [1440, 510], [1420, 530],
      [1380, 545], [1320, 555], [1250, 565], [1180, 570], [1100, 575],
      [1020, 580], [950, 585], [880, 580], [800, 575], [720, 570],
      [650, 565], [580, 558], [510, 550], [450, 540], [400, 525],
      [360, 508], [340, 490], [320, 470]
    ];

    // Arena de la isla (relleno)
    ctx.fillStyle = '#b8a882';
    ctx.beginPath();
    ctx.moveTo(islaForma[0][0] + offsetX, islaForma[0][1] + offsetY);
    for (let i = 1; i < islaForma.length; i++) {
      ctx.lineTo(islaForma[i][0] + offsetX, islaForma[i][1] + offsetY);
    }
    ctx.closePath();
    ctx.fill();

    // Borde irregular de la costa (arena más oscura)
    ctx.strokeStyle = '#9a8a6a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(islaForma[0][0] + offsetX, islaForma[0][1] + offsetY);
    for (let i = 1; i < islaForma.length; i++) {
      ctx.lineTo(islaForma[i][0] + offsetX, islaForma[i][1] + offsetY);
    }
    ctx.closePath();
    ctx.stroke();

    // Textura arenosa interior (manchas más claras)
    ctx.fillStyle = '#c8b892';
    for (let t = 0; t < 8; t++) {
      const tx = 500 + t * 120 + offsetX;
      const ty = 460 + Math.sin(t * 1.7) * 30 + offsetY;
      ctx.beginPath();
      ctx.ellipse(tx, ty, 25 + t * 3, 10, t * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Nombre de la isla (Taíno + español)
    ctx.font = '10px monospace';
    ctx.fillStyle = '#7a6a4a';
    ctx.textAlign = 'center';
    ctx.fillText('Isla Cabritos — Guarizacca', islaCX, islaCY + 100);
    ctx.textAlign = 'left';

    // --- Vegetación xerofítica de Isla Cabritos ---
    // Bosque seco espinoso subtropical con cactus, guayacán, bayahonda, guasábara
    // En la isla
    const vegIsla = [
      // Interior de la isla (meseta caliza)
      [600, 450, 'cactus'], [750, 460, 'cactus'], [900, 440, 'cactus'],
      [1100, 450, 'cactus'], [1250, 460, 'cactus'], [1350, 470, 'pitahaya'],
      [500, 470, 'pitahaya'], [800, 500, 'guayacan'], [1050, 490, 'guayacan'],
      [680, 480, 'bayahonda'], [950, 520, 'bayahonda'], [1200, 510, 'bayahonda'],
      [850, 440, 'guasabara'], [1150, 530, 'guasabara'], [550, 500, 'alpargata'],
      [1300, 490, 'alpargata'], [700, 540, 'cactus'], [1000, 560, 'pitahaya']
    ];
    // En las orillas del lago
    const vegOrilla = [
      [200, 1060, 'cactus'], [600, 1070, 'bayahonda'], [1000, 1065, 'guayacan'],
      [400, 80, 'cactus'], [800, 75, 'guasabara'], [1200, 85, 'pitahaya'],
      [80, 300, 'bayahonda'], [120, 800, 'guayacan'],
      [1680, 300, 'cactus'], [1700, 700, 'guasabara']
    ];
    // Vegetación en aguas poco profundas cerca de la costa de la isla
    // (arbustos espinosos y mangle que crecen parcialmente sumergidos)
    const vegAgua = [
      [350, 460, 'guasabara'], [420, 540, 'bayahonda'], [1400, 480, 'guasabara'],
      [1380, 540, 'bayahonda'], [480, 430, 'alpargata'], [1300, 560, 'alpargata']
    ];
    for (const [vx, vy, tipo] of vegIsla.concat(vegOrilla).concat(vegAgua)) {
      this._dibujarVegetacion(ctx, vx + offsetX, vy + offsetY, tipo);
    }

    // --- Pedestal oculto + Espada de Enriquillo (visibles tras entregar ídolo) ---
    if (this._pedestalVisible) {
      // Arbusto que oculta parcialmente el pedestal
      const arbX = this._pedestal.x + offsetX;
      const arbY = this._pedestal.y + offsetY;
      ctx.fillStyle = '#4a7a3a';
      ctx.beginPath();
      ctx.arc(arbX + 10, arbY - 5, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#3a6a2a';
      ctx.beginPath();
      ctx.arc(arbX + 5, arbY, 10, 0, Math.PI * 2);
      ctx.fill();
      // Pedestal de piedra
      ctx.fillStyle = '#777777';
      ctx.fillRect(arbX - 8, arbY + 5, 16, 12);
      ctx.fillStyle = '#999999';
      ctx.fillRect(arbX - 10, arbY + 3, 20, 4);
      // Brillo si el jugador se acerca
      if (jugador) {
        const dp = Math.sqrt(Math.pow((jugador.x + jugador.ancho / 2) - this._pedestal.x, 2) + Math.pow((jugador.y + jugador.alto / 2) - this._pedestal.y, 2));
        if (dp < 50 && this._espada.recogida) {
          const brillo = 0.3 + Math.sin(this.tiempoTotal * 3) * 0.2;
          ctx.fillStyle = `rgba(200, 150, 255, ${brillo})`;
          ctx.beginPath();
          ctx.arc(arbX, arbY + 8, 15, 0, Math.PI * 2);
          ctx.fill();
          // Indicador [E]
          ctx.font = 'bold 10px monospace';
          ctx.fillStyle = '#CCAAFF';
          ctx.textAlign = 'center';
          ctx.fillText('[E]', arbX, arbY - 15);
          ctx.textAlign = 'left';
        }
      }

      // Espada en el suelo (si no recogida)
      if (!this._espada.recogida) {
        const esX = this._espada.x + offsetX;
        const esY = this._espada.y + offsetY;
        // Brillo
        const brEsp = 0.4 + Math.sin(this.tiempoTotal * 4) * 0.3;
        ctx.fillStyle = `rgba(218, 165, 32, ${brEsp})`;
        ctx.beginPath();
        ctx.arc(esX, esY, 12, 0, Math.PI * 2);
        ctx.fill();
        // Espada (rectángulo + empuñadura)
        ctx.fillStyle = '#CCCCCC';
        ctx.save();
        ctx.translate(esX, esY);
        ctx.rotate(-0.3);
        ctx.fillRect(-2, -12, 4, 20);
        ctx.fillStyle = '#DAA520';
        ctx.fillRect(-5, 6, 10, 3);
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(-2, 8, 4, 5);
        ctx.restore();
        // [E] indicador
        if (jugador) {
          const de = Math.sqrt(Math.pow((jugador.x + jugador.ancho / 2) - this._espada.x, 2) + Math.pow((jugador.y + jugador.alto / 2) - this._espada.y, 2));
          if (de < 30) {
            ctx.font = 'bold 10px monospace';
            ctx.fillStyle = '#FFD700';
            ctx.textAlign = 'center';
            ctx.fillText('[E]', esX, esY - 18);
            ctx.textAlign = 'left';
          }
        }
      }
    }

    // --- Cocodrilos ---
    for (const croc of this.cocodrilos) {
      this._dibujarCocodrilo(ctx, croc, offsetX, offsetY);
    }

    // --- Iguanas rinoceronte ---
    for (const ig of this.iguanas) {
      this._dibujarIguana(ctx, ig, offsetX, offsetY);
    }

    // --- Culebras corredoras ---
    for (const cul of this.culebras) {
      this._dibujarCulebra(ctx, cul, offsetX, offsetY);
    }

    // --- Cucú (burrowing owl) ---
    for (const cu of this.cucus) {
      this._dibujarCucu(ctx, cu, offsetX, offsetY);
    }

    // --- Flamencos rosados ---
    for (const fl of this.flamencos) {
      this._dibujarFlamenco(ctx, fl, offsetX, offsetY);
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

  // --- Vegetación xerofítica de Isla Cabritos y orillas ---
  _dibujarVegetacion(ctx, x, y, tipo) {
    if (tipo === 'cactus') {
      // Pilosocereus polygonus — cactus columnar alto
      ctx.fillStyle = '#3a7a3a';
      ctx.fillRect(x - 3, y - 20, 6, 25);
      ctx.fillRect(x - 12, y - 15, 10, 5);
      ctx.fillRect(x - 12, y - 22, 5, 12);
      ctx.fillRect(x + 3, y - 10, 10, 5);
      ctx.fillRect(x + 8, y - 18, 5, 13);
    } else if (tipo === 'pitahaya') {
      // Harrisia nashii — cactus pitahaya (más delgado, fruto rojo)
      ctx.fillStyle = '#4a8a4a';
      ctx.fillRect(x - 2, y - 18, 4, 22);
      // Espinas (pequeñas líneas)
      ctx.strokeStyle = '#6aaa6a';
      ctx.lineWidth = 0.5;
      for (let s = 0; s < 5; s++) {
        ctx.beginPath();
        ctx.moveTo(x - 2, y - 15 + s * 4);
        ctx.lineTo(x - 6, y - 16 + s * 4);
        ctx.moveTo(x + 2, y - 15 + s * 4);
        ctx.lineTo(x + 6, y - 16 + s * 4);
        ctx.stroke();
      }
      // Fruto rojo en la punta
      ctx.fillStyle = '#CC3344';
      ctx.beginPath();
      ctx.arc(x, y - 19, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (tipo === 'guayacan') {
      // Guaiacum officinale — árbol bajo y leñoso con flores azules
      ctx.fillStyle = '#5a3a1a';
      ctx.fillRect(x - 2, y - 8, 4, 12);
      // Copa densa y redondeada (verde oscuro)
      ctx.fillStyle = '#2a5a2a';
      ctx.beginPath();
      ctx.arc(x, y - 12, 10, 0, Math.PI * 2);
      ctx.fill();
      // Flores azules (pequeños puntos)
      ctx.fillStyle = '#5588CC';
      ctx.fillRect(x - 5, y - 16, 2, 2);
      ctx.fillRect(x + 3, y - 14, 2, 2);
      ctx.fillRect(x - 2, y - 18, 2, 2);
    } else if (tipo === 'bayahonda') {
      // Prosopis juliflora — árbol espinoso bajo con copa aplanada
      ctx.fillStyle = '#6a4a2a';
      ctx.fillRect(x - 2, y - 6, 4, 10);
      // Copa aplanada (típica de bayahonda)
      ctx.fillStyle = '#3a6a2a';
      ctx.beginPath();
      ctx.ellipse(x, y - 10, 12, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      // Espinas (líneas finas)
      ctx.strokeStyle = '#8a6a3a';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x - 8, y - 8); ctx.lineTo(x - 12, y - 6);
      ctx.moveTo(x + 8, y - 8); ctx.lineTo(x + 12, y - 6);
      ctx.stroke();
    } else if (tipo === 'guasabara') {
      // Cylindropuntia caribaea — cactus con segmentos cilíndricos
      ctx.fillStyle = '#4a7a3a';
      // Segmentos cilíndricos ramificados
      ctx.fillRect(x - 2, y - 12, 4, 16);
      ctx.fillRect(x - 8, y - 10, 4, 10);
      ctx.fillRect(x + 4, y - 8, 4, 10);
      // Espinas blancas
      ctx.fillStyle = '#DDDDAA';
      for (let s = 0; s < 3; s++) {
        ctx.fillRect(x - 4, y - 10 + s * 4, 1, 1);
        ctx.fillRect(x + 2, y - 8 + s * 4, 1, 1);
      }
    } else if (tipo === 'alpargata') {
      // Consolea moniliformis — cactus de pad plano (nopal)
      ctx.fillStyle = '#3a7a3a';
      // Tallo
      ctx.fillRect(x - 2, y - 4, 4, 8);
      // Pads ovalados (3 segmentos)
      ctx.beginPath();
      ctx.ellipse(x, y - 8, 5, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x - 6, y - 14, 4, 6, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x + 5, y - 12, 4, 5, 0.3, 0, Math.PI * 2);
      ctx.fill();
      // Espinas (puntos claros)
      ctx.fillStyle = '#CCCC88';
      ctx.fillRect(x - 1, y - 12, 1, 1);
      ctx.fillRect(x + 2, y - 10, 1, 1);
      ctx.fillRect(x - 7, y - 16, 1, 1);
    }
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

  // --- Iguana rinoceronte (Cyclura cornuta) ---
  // Lagarto grande, gris-verde, con cuernos en el hocico y cresta dorsal
  _dibujarIguana(ctx, ig, offsetX, offsetY) {
    const ix = ig.x + offsetX;
    const iy = ig.y + offsetY;
    const dir = ig.mirandoDerecha ? 1 : -1;
    const legSwing = Math.sin(this.tiempoTotal * 3 + ig.fase) * 2;

    // Sombra (más larga, más delgada)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.beginPath();
    ctx.ellipse(ix + 12, iy + 10, 18, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Color base: rinoceronte es verde-gris, Ricord es más gris-azulada
    const colorCuerpo = ig.tipo === 'ricord' ? '#5a6a6a' : '#6a7a5a';
    const colorOscuro = ig.tipo === 'ricord' ? '#4a5a5a' : '#5a6a4a';
    const colorClaro = ig.tipo === 'ricord' ? '#7a8a8a' : '#8a9a7a';

    // Cola larga y curvada (más larga para cuerpo más esbelto)
    ctx.strokeStyle = colorOscuro;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    const tailBaseX = ix + (dir > 0 ? -2 : 26);
    ctx.beginPath();
    ctx.moveTo(tailBaseX, iy + 6);
    ctx.quadraticCurveTo(
      tailBaseX - dir * 10, iy + 4 + Math.sin(this.tiempoTotal * 2 + ig.fase) * 3,
      tailBaseX - dir * 18, iy + 8
    );
    ctx.stroke();
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(tailBaseX - dir * 18, iy + 8);
    ctx.lineTo(tailBaseX - dir * 24, iy + 6);
    ctx.stroke();

    // Cuerpo (elipse más larga y delgada)
    ctx.fillStyle = colorCuerpo;
    ctx.beginPath();
    ctx.ellipse(ix + 12, iy + 5, 15, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Vientre más claro
    ctx.fillStyle = colorClaro;
    ctx.beginPath();
    ctx.ellipse(ix + 12, iy + 7, 10, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cresta dorsal (pequeños triángulos a lo largo del lomo)
    ctx.fillStyle = colorOscuro;
    for (let c = 0; c < 4; c++) {
      const sx = ix + 4 + c * 5;
      ctx.beginPath();
      ctx.moveTo(sx, iy - 1);
      ctx.lineTo(sx + 2, iy - 4);
      ctx.lineTo(sx + 4, iy - 1);
      ctx.closePath();
      ctx.fill();
    }

    // Cabeza (posicionada al frente del cuerpo más largo)
    const headX = ix + (dir > 0 ? 25 : -1);
    ctx.fillStyle = colorCuerpo;
    ctx.beginPath();
    ctx.ellipse(headX, iy + 4, 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cuernos (solo iguana rinoceronte — Cyclura cornuta)
    if (ig.tipo === 'rinoceronte') {
      ctx.fillStyle = '#5a5a4a';
      // Cuerno principal
      ctx.beginPath();
      ctx.arc(headX + dir * 5, iy + 1, 2, 0, Math.PI * 2);
      ctx.fill();
      // Cuerno secundario
      ctx.beginPath();
      ctx.arc(headX + dir * 3, iy - 1, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Tercer cuerno pequeño
      ctx.beginPath();
      ctx.arc(headX + dir * 6, iy + 3, 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Ojo — amarillo para rinoceronte, rojo para Ricord
    const colorOjo = ig.tipo === 'ricord' ? '#CC2222' : '#CCAA44';
    ctx.fillStyle = colorOjo;
    ctx.beginPath();
    ctx.arc(headX + dir * 2, iy + 3, 2, 0, Math.PI * 2);
    ctx.fill();
    // Pupila negra
    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.arc(headX + dir * 2, iy + 3, 0.8, 0, Math.PI * 2);
    ctx.fill();

    // Patas (4, con movimiento alternado realista)
    ctx.fillStyle = colorOscuro;
    // Delantera izquierda
    ctx.save();
    ctx.translate(ix + 15, iy + 11);
    ctx.rotate(legSwing * 0.15);
    ctx.fillRect(-1, 0, 3, 6);
    // Dedos (3 garras)
    ctx.fillRect(-2, 5, 2, 2);
    ctx.fillRect(0, 6, 2, 2);
    ctx.fillRect(2, 5, 2, 2);
    ctx.restore();
    // Delantera derecha
    ctx.save();
    ctx.translate(ix + 6, iy + 11);
    ctx.rotate(-legSwing * 0.15);
    ctx.fillRect(-1, 0, 3, 6);
    ctx.fillRect(-2, 5, 2, 2);
    ctx.fillRect(0, 6, 2, 2);
    ctx.fillRect(2, 5, 2, 2);
    ctx.restore();
    // Trasera izquierda
    ctx.save();
    ctx.translate(ix + 18, iy + 10);
    ctx.rotate(-legSwing * 0.12);
    ctx.fillRect(-1, 0, 3, 5);
    ctx.fillRect(-2, 4, 2, 2);
    ctx.fillRect(0, 5, 2, 2);
    ctx.fillRect(2, 4, 2, 2);
    ctx.restore();
    // Trasera derecha
    ctx.save();
    ctx.translate(ix + 3, iy + 10);
    ctx.rotate(legSwing * 0.12);
    ctx.fillRect(-1, 0, 3, 5);
    ctx.fillRect(-2, 4, 2, 2);
    ctx.fillRect(0, 5, 2, 2);
    ctx.fillRect(2, 4, 2, 2);
    ctx.restore();
  }

  // --- Culebra Corredora de la Hispaniola (Haitiophis anomalus) ---
  // La mayor serpiente colúbrida de las Américas (hasta 2m).
  _dibujarCulebra(ctx, cul, offsetX, offsetY) {
    const sx = cul.x + offsetX;
    const sy = cul.y + offsetY;
    const dir = cul.mirandoDerecha ? 1 : -1;

    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.beginPath();
    ctx.ellipse(sx, sy + 3, 20, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cuerpo sinuoso (segmentos curvados que ondean)
    ctx.strokeStyle = '#6a5a2a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    const tailX = sx - dir * 30;
    ctx.moveTo(tailX, sy + Math.sin(this.tiempoTotal * 4 + cul.fase) * 3);
    for (let s = 0; s < 4; s++) {
      const segX = tailX + dir * (s + 1) * 12;
      const segY = sy + Math.sin(this.tiempoTotal * 4 + cul.fase + s * 1.2) * 4;
      ctx.lineTo(segX, segY);
    }
    ctx.stroke();

    // Centro un poco más grueso
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = '#7a6a3a';
    ctx.beginPath();
    ctx.moveTo(sx - dir * 5, sy + Math.sin(this.tiempoTotal * 4 + cul.fase + 2) * 3);
    ctx.lineTo(sx + dir * 8, sy + Math.sin(this.tiempoTotal * 4 + cul.fase + 3) * 3);
    ctx.stroke();

    // Patrón dorsal (línea más clara)
    ctx.strokeStyle = '#9a8a4a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(tailX + dir * 5, sy + Math.sin(this.tiempoTotal * 4 + cul.fase + 0.5) * 3);
    for (let s = 1; s < 4; s++) {
      ctx.lineTo(tailX + dir * (s + 1) * 12, sy + Math.sin(this.tiempoTotal * 4 + cul.fase + s * 1.2) * 3);
    }
    ctx.stroke();

    // Cabeza triangular
    const headX = sx + dir * 22;
    const headY = sy + Math.sin(this.tiempoTotal * 4 + cul.fase + 3.5) * 3;
    ctx.fillStyle = '#6a5a2a';
    ctx.beginPath();
    ctx.moveTo(headX - dir * 4, headY - 4);
    ctx.lineTo(headX + dir * 6, headY);
    ctx.lineTo(headX - dir * 4, headY + 4);
    ctx.closePath();
    ctx.fill();

    // Ojo amarillo
    ctx.fillStyle = '#DDAA22';
    ctx.beginPath();
    ctx.arc(headX - dir * 1, headY - 1.5, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.arc(headX - dir * 1, headY - 1.5, 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Lengua bífida (aparece periódicamente)
    if (Math.sin(this.tiempoTotal * 2 + cul.fase) > 0.7) {
      ctx.strokeStyle = '#CC3333';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(headX + dir * 6, headY);
      ctx.lineTo(headX + dir * 10, headY - 2);
      ctx.moveTo(headX + dir * 6, headY);
      ctx.lineTo(headX + dir * 10, headY + 2);
      ctx.stroke();
    }
  }

  // --- Cucú / Burrowing Owl (Athene cunicularia) ---
  // Búho pequeño marrón que anida en el suelo. Gira la cabeza periódicamente.
  _dibujarCucu(ctx, cu, offsetX, offsetY) {
    const cx = cu.x + offsetX;
    const cy = cu.y + offsetY;

    // Madriguera (agujero en el suelo)
    ctx.fillStyle = '#6a5a3a';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 8, 8, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#4a3a2a';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 8, 5, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cuerpo (pequeño, marrón moteado)
    ctx.fillStyle = '#8a7a5a';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 2, 5, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Motas blancas en el cuerpo
    ctx.fillStyle = '#CCBB99';
    ctx.fillRect(cx - 3, cy, 1.5, 1.5);
    ctx.fillRect(cx + 1, cy + 2, 1.5, 1.5);
    ctx.fillRect(cx - 1, cy + 4, 1.5, 1.5);

    // Cabeza (gira periódicamente — búho que mira alrededor)
    const giro = Math.sin(this.tiempoTotal * 0.8 + cu.fase) * 3;
    ctx.fillStyle = '#8a7a5a';
    ctx.beginPath();
    ctx.arc(cx + giro * 0.5, cy - 5, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Disco facial (marca blanca alrededor de los ojos — típico del cucú)
    ctx.fillStyle = '#DDCCAA';
    ctx.beginPath();
    ctx.arc(cx + giro * 0.5, cy - 5, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Ojos grandes y amarillos (característicos del cucú)
    ctx.fillStyle = '#DDAA22';
    ctx.beginPath();
    ctx.arc(cx - 1.5 + giro * 0.5, cy - 6, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 1.5 + giro * 0.5, cy - 6, 1.8, 0, Math.PI * 2);
    ctx.fill();
    // Pupilas negras
    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.arc(cx - 1.5 + giro * 0.8, cy - 6, 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 1.5 + giro * 0.8, cy - 6, 0.8, 0, Math.PI * 2);
    ctx.fill();

    // Pico pequeño (amarillo)
    ctx.fillStyle = '#CCAA44';
    ctx.beginPath();
    ctx.moveTo(cx + giro * 0.5, cy - 4.5);
    ctx.lineTo(cx + giro * 0.5 + 1.5, cy - 3);
    ctx.lineTo(cx + giro * 0.5 - 1.5, cy - 3);
    ctx.closePath();
    ctx.fill();

    // Patas cortas (en el suelo)
    ctx.strokeStyle = '#8a7a5a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 2, cy + 7);
    ctx.lineTo(cx - 2, cy + 9);
    ctx.moveTo(cx + 2, cy + 7);
    ctx.lineTo(cx + 2, cy + 9);
    ctx.stroke();
  }

  // --- Flamenco rosado parado en una pata ---
  // Phoenicopterus ruber — ave icónica del Lago Enriquillo
  _dibujarFlamenco(ctx, fl, offsetX, offsetY) {
    const fx = fl.x + offsetX;
    const fy = fl.y + offsetY;
    const dir = fl.dir;

    // Si está volando: dibujar silueta en vuelo (más simple, alas extendidas)
    if (fl.volando) {
      const wingFlap = Math.sin(this.tiempoTotal * 12) * 8;
      ctx.fillStyle = '#FF8899';
      // Cuerpo
      ctx.beginPath();
      ctx.ellipse(fx, fy, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      // Ala izquierda
      ctx.beginPath();
      ctx.moveTo(fx - 3, fy);
      ctx.lineTo(fx - 18, fy - 5 + wingFlap);
      ctx.lineTo(fx - 12, fy + 2);
      ctx.closePath();
      ctx.fill();
      // Ala derecha
      ctx.beginPath();
      ctx.moveTo(fx + 3, fy);
      ctx.lineTo(fx + 18, fy - 5 - wingFlap);
      ctx.lineTo(fx + 12, fy + 2);
      ctx.closePath();
      ctx.fill();
      // Cuello extendido
      ctx.strokeStyle = '#FF8899';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(fx + dir * 4, fy - 2);
      ctx.lineTo(fx + dir * 14, fy - 6);
      ctx.stroke();
      // Sombra en el suelo
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.beginPath();
      ctx.ellipse(fx, fl.origenY + offsetY + 28, 8, 2, 0, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    // Reflejo en el agua (sutil)
    ctx.fillStyle = 'rgba(255, 130, 150, 0.15)';
    ctx.beginPath();
    ctx.ellipse(fx, fy + 28, 6, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Una pata (la otra recogida — pose clásica del flamenco)
    ctx.strokeStyle = '#CC6677';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(fx, fy + 10);
    ctx.lineTo(fx, fy + 25);
    ctx.stroke();
    // Pie (3 dedos)
    ctx.beginPath();
    ctx.moveTo(fx - 2, fy + 25);
    ctx.lineTo(fx + 2, fy + 25);
    ctx.stroke();

    // Pata recogida (doblada, visible a un lado)
    ctx.strokeStyle = '#CC6677';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(fx + dir * 2, fy + 12);
    ctx.lineTo(fx + dir * 4, fy + 16);
    ctx.lineTo(fx + dir * 2, fy + 18);
    ctx.stroke();

    // Cuerpo (elipse rosada)
    ctx.fillStyle = '#FF8899';
    ctx.beginPath();
    ctx.ellipse(fx, fy + 5, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Plumas de la cola (más oscuras)
    ctx.fillStyle = '#DD5566';
    ctx.beginPath();
    ctx.moveTo(fx - dir * 6, fy + 4);
    ctx.lineTo(fx - dir * 12, fy + 2);
    ctx.lineTo(fx - dir * 10, fy + 7);
    ctx.closePath();
    ctx.fill();

    // Cuello largo y curvado (S-curve)
    ctx.strokeStyle = '#FF8899';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(fx + dir * 5, fy + 2);
    // Curva en S del cuello
    ctx.bezierCurveTo(
      fx + dir * 8, fy - 8,
      fx + dir * 2, fy - 16,
      fx + dir * 5, fy - 22
    );
    ctx.stroke();

    // Cabeza (pequeño círculo)
    ctx.fillStyle = '#FF8899';
    ctx.beginPath();
    ctx.arc(fx + dir * 5, fy - 22, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Ojo (punto negro)
    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.arc(fx + dir * 6, fy - 23, 1, 0, Math.PI * 2);
    ctx.fill();

    // Pico curvado hacia abajo (negro con punta rosa)
    ctx.fillStyle = '#222222';
    ctx.beginPath();
    ctx.moveTo(fx + dir * 8, fy - 23);
    ctx.lineTo(fx + dir * 14, fy - 21);
    ctx.lineTo(fx + dir * 12, fy - 19);
    ctx.lineTo(fx + dir * 8, fy - 21);
    ctx.closePath();
    ctx.fill();
    // Punta rosada del pico
    ctx.fillStyle = '#FFAAAA';
    ctx.beginPath();
    ctx.moveTo(fx + dir * 8, fy - 22);
    ctx.lineTo(fx + dir * 10, fy - 22);
    ctx.lineTo(fx + dir * 9, fy - 20.5);
    ctx.closePath();
    ctx.fill();

    // Alas plegadas (línea oscura en el cuerpo)
    ctx.strokeStyle = '#DD5566';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(fx - 5, fy + 3);
    ctx.quadraticCurveTo(fx, fy + 1, fx + 5, fy + 3);
    ctx.stroke();
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
        if (this.juego.inventario) this.juego.inventario.remover('idoloCemi');

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
    const enAgua = !this._estaEnTierraJugador(jugador);
    // Ondulación vertical en el agua
    if (enAgua) {
      py += Math.sin(this.tiempoTotal * 3) * 2;
    }

    const genero = jugador.genero || 'pepito';
    const centroX = px + jugador.ancho / 2;
    const centroY = py + jugador.alto / 2;

    ctx.save();
    // Sacudida lateral tras mordida de cocodrilo (mismo patrón que tiburón)
    if (this._sacudida > 0) {
      const intensidad = this._sacudida / 0.5; // 1→0 mientras decae
      const desplazamiento = Math.sin(this.tiempoTotal * 50) * 6 * intensidad;
      ctx.translate(desplazamiento, 0);
    }
    // Rotación de nado (como en los mundos acuáticos)
    if (enAgua && Math.abs(this._anguloNado) > 0.01) {
      ctx.translate(centroX, centroY);
      ctx.rotate(this._anguloNado);
      ctx.translate(-centroX, -centroY);
    }

    // Sombra (solo en tierra)
    if (!enAgua) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(px + jugador.ancho / 2, py + jugador.alto + 2, 12, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Cuerpo
    ctx.fillStyle = genero === 'pepito' ? '#4488ff' : '#aa44ff';
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

    // Piernas: normales en tierra, pateo de nado en agua
    if (!enAgua) {
      ctx.fillStyle = '#2a5599';
      const pasoAnim = jugador.esAnimando ? Math.sin(jugador.cuadroAnimacion * 5) * 3 : 0;
      ctx.fillRect(px + 6, py + 26 + pasoAnim, 7, 8);
      ctx.fillRect(px + 15, py + 26 - pasoAnim, 7, 8);
      ctx.fillStyle = '#4a3520';
      ctx.fillRect(px + 5, py + 32 + pasoAnim, 8, 3);
      ctx.fillRect(px + 15, py + 32 - pasoAnim, 8, 3);
    } else {
      // Piernas de nado (patada alternada, más separadas y con movimiento de aleta)
      ctx.fillStyle = '#2a5599';
      const kick = Math.sin(this.tiempoTotal * 6) * 5;
      ctx.fillRect(px + 6, py + 26 + kick, 7, 8);
      ctx.fillRect(px + 15, py + 26 - kick, 7, 8);
      // Ondas de agua
      ctx.strokeStyle = 'rgba(100, 180, 200, 0.4)';
      ctx.lineWidth = 1;
      const ondaW = 10 + Math.sin(this.tiempoTotal * 4) * 3;
      ctx.beginPath();
      ctx.ellipse(px + 14, py + 36, ondaW, 3, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore(); // Restaurar sacudida + rotación
  }

  // Verifica si un punto está en tierra (isla o cualquier orilla)
  _estaEnTierra(obj) {
    const ox = obj.x || 0;
    const oy = obj.y || 0;
    // En la isla
    if (this._estaEnIslaXY(ox, oy)) return true;
    // En las orillas (franjas de terreno)
    if (oy > 1050 || oy < 100 || ox < 150 || ox > 1650) return true;
    return false;
  }

  // Forma de la isla (mismos puntos que el dibujo)
  _getIslaForma() {
    return [
      [310, 445], [380, 430], [450, 438], [520, 425], [600, 420],
      [680, 430], [750, 418], [830, 422], [900, 415], [970, 420],
      [1050, 425], [1120, 418], [1200, 428], [1280, 435], [1350, 445],
      [1400, 455], [1430, 470], [1450, 490], [1440, 510], [1420, 530],
      [1380, 545], [1320, 555], [1250, 565], [1180, 570], [1100, 575],
      [1020, 580], [950, 585], [880, 580], [800, 575], [720, 570],
      [650, 565], [580, 558], [510, 550], [450, 540], [400, 525],
      [360, 508], [340, 490], [320, 470]
    ];
  }

  // Point-in-polygon (ray casting)
  _puntoEnPoligono(px, py, poligono) {
    let dentro = false;
    for (let i = 0, j = poligono.length - 1; i < poligono.length; j = i++) {
      const xi = poligono[i][0], yi = poligono[i][1];
      const xj = poligono[j][0], yj = poligono[j][1];
      if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) {
        dentro = !dentro;
      }
    }
    return dentro;
  }

  _estaEnIslaXY(x, y) {
    return this._puntoEnPoligono(x, y, this._getIslaForma());
  }

  // Verifica si el jugador está en la isla (polygon)
  _estaEnIsla(jugador) {
    return this._puntoEnPoligono(
      jugador.x + jugador.ancho / 2,
      jugador.y + jugador.alto / 2,
      this._getIslaForma()
    );
  }

  // Verifica si el jugador está en cualquier tierra (isla + orillas)
  _estaEnTierraJugador(jugador) {
    const px = jugador.x + jugador.ancho / 2;
    const py = jugador.y + jugador.alto / 2;
    if (this._puntoEnPoligono(px, py, this._getIslaForma())) return true;
    if (py > 1050 || py < 100 || px < 150 || px > 1650) return true;
    return false;
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
