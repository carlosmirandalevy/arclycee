// ============================================================
// ZONA-COLONIAL.JS - Zona Colonial de Santo Domingo
// ============================================================
// La Zona Colonial de Santo Domingo es Patrimonio de la Humanidad
// (UNESCO, 1990). Contiene las primeras construcciones europeas
// permanentes en América: la primera catedral, el primer hospital,
// el primer monasterio y la primera calle empedrada.
//
// Este nivel expande el Mundo Colonial. El jugador llega con el
// mapa colonial que le dio Roberto Cassá en La Isabela y explora
// los monumentos históricos mientras enfrenta un conflicto con
// un constructor que quiere demoler ruinas para un hotel.
//
// MECÁNICA NUEVA: Magnoboot detecta zonas de excavación (F).
// Cuando el pulso de detección toca una zona enterrada, se revela
// el objeto oculto y el jugador puede recogerlo.
//
// MODO: Top-down (vista desde arriba, sin gravedad)
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';

export class ZonaColonial {

  constructor() {
    // --- Dimensiones del nivel ---
    // La Zona Colonial es una cuadrícula urbana, más ancha que alta
    this.anchoNivel = 1800;
    this.altoNivel = 1200;

    // --- Cámara ---
    this.camaraX = 0;
    this.camaraY = 0;

    // --- Monumentos históricos (edificios) ---
    this.edificios = [];

    // --- NPCs ---
    this.npcs = [];

    // --- Objetos coleccionables ---
    this.objetos = [];

    // --- Zonas de excavación (detectables con Magnoboot) ---
    // Cada zona tiene: {x, y, radio, descubierta, tipo, nombre}
    // Se revelan cuando el pulso de Magnoboot las toca
    this.zonasExcavacion = [];

    // --- Diálogos ---
    this.dialogos = new SistemaDialogos();

    // --- Sonidos ---
    this.sfx = new SonidoProcedural();

    // --- Calles empedradas ---
    this.calles = [];

    // --- Árboles ---
    this.arboles = [];

    // --- Bloqueo de entrada ---
    this.bloqueoEntrada = true;

    // --- Tiempo ---
    this.tiempoTotal = 0;

    // --- Misión ---
    this.misionActual = '';
    this.npcsHablados = 0;
    this.totalNPCs = 5;

    // --- Combate ---
    this.combateIniciado = false;
    this.combateTerminado = false;

    // --- Mapa de riesgo (3 colores) ---
    // Verde = protegido, Amarillo = en peligro, Rojo = amenazado
    this.zonasRiesgo = [];

    // --- Roberto Cassá: conversación rotativa ---
    // Cada vez que hablas con él dice algo diferente.
    // No cuenta para la misión principal (es mentor recurrente).
    this._cassaConversacion = 0;
    this._cassaToastMostrado = false;

    // --- Guardia Presidencial del Panteón Nacional ---
    // 2 guardias activos + 2 de relevo. Cada cierto tiempo hacen
    // el cambio de guardia ceremonial (los activos salen marchando,
    // los de relevo entran y toman su puesto).
    this.guardias = [];
    this._tiempoGuardia = 0;
    this._INTERVALO_CAMBIO = 45; // segundos entre cada cambio
    this._cambioEnCurso = false;
    this._progresoCambio = 0;    // 0 a 1 durante la animación del cambio

    // --- Referencia al juego ---
    this.juego = null;
  }

  // --- Construir la Zona Colonial ---
  iniciar(juego) {
    this.juego = juego;

    // Poner al jugador en modo top-down
    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';
      juego.jugador.x = 900;
      juego.jugador.y = 1100;
      juego.jugador.direccion = 'arriba';
    }

    // --- Monumentos históricos reales de la Zona Colonial ---
    this.edificios = [
      {
        // Primera catedral de América (1512-1540)
        x: 400, y: 300,
        ancho: 140, alto: 100,
        tipo: 'catedral',
        nombre: 'Catedral Primada de América'
      },
      {
        // Primer hospital del Nuevo Mundo (1503)
        x: 750, y: 200,
        ancho: 110, alto: 80,
        tipo: 'hospital',
        nombre: 'Hospital San Nicolás de Bari'
      },
      {
        // Primer monasterio de América (1508)
        x: 1100, y: 280,
        ancho: 100, alto: 90,
        tipo: 'monasterio',
        nombre: 'Monasterio San Francisco'
      },
      {
        // Primera calle empedrada de América
        x: 200, y: 550,
        ancho: 160, alto: 40,
        tipo: 'calle',
        nombre: 'Calle de las Damas'
      },
      {
        // Panteón Nacional (antes iglesia jesuita, s. XVIII)
        x: 1350, y: 500,
        ancho: 100, alto: 80,
        tipo: 'panteon',
        nombre: 'Panteón Nacional'
      },
      {
        // Reloj de Sol — monumento histórico en la Calle de las Damas.
        // Es uno de los relojes solares más antiguos de América.
        x: 310, y: 540,
        ancho: 24, alto: 24,
        tipo: 'relojSol',
        nombre: 'Reloj de Sol'
      },
      {
        // Museo de la Catedral — alojado en la restaurada Real Cárcel
        // de Santo Domingo, junto a la Catedral Primada. Contiene arte
        // sacro y objetos religiosos de los siglos XVI al XX.
        // 15 salas temáticas con tesoros: sagrario, cruces pectorales,
        // el Águila Bicéfala, el Coro Alto y la Piedra Pentagonal.
        x: 560, y: 280,
        ancho: 90, alto: 70,
        tipo: 'museo',
        nombre: 'Museo de la Catedral'
      }
    ];

    // --- NPCs ---
    this.npcs = [
      {
        // Constructor corrupto — antagonista del nivel
        // Quiere demoler ruinas para construir un hotel
        id: 'constructor',
        x: 600, y: 450,
        ancho: 28, alto: 32,
        nombre: 'Constructor Méndez',
        color: '#8B4513',
        dialogoHecho: false,
        esCombate: true
      },
      {
        // Arqueóloga guardiana — protege el patrimonio
        id: 'arqueologa',
        x: 450, y: 420,
        ancho: 28, alto: 32,
        nombre: 'Dra. Pérez',
        color: '#2a6a4a',
        dialogoHecho: false,
        esCombate: false
      },
      {
        // Guía turístico — enseña la historia de cada monumento
        id: 'guia',
        x: 800, y: 350,
        ancho: 28, alto: 32,
        nombre: 'Don Rafael',
        color: '#4a4a8a',
        dialogoHecho: false,
        esCombate: false
      },
      {
        // Estudiante de arquitectura — investiga las técnicas coloniales
        id: 'estudiante',
        x: 1150, y: 400,
        ancho: 28, alto: 32,
        nombre: 'María',
        color: '#8a4a6a',
        dialogoHecho: false,
        esCombate: false
      },
      {
        // Roberto Cassá — historiador recurrente (mentor del jugador).
        // No cuenta para completar la misión. Tiene diálogos rotativos:
        // cada vez que le hablas dice algo nuevo.
        id: 'historiador',
        x: 280, y: 610,
        ancho: 28, alto: 32,
        nombre: 'Roberto Cassá',
        color: '#2a4a6a',
        dialogoHecho: false,  // Nunca se pone true — siempre tiene algo que decir
        esCombate: false,
        esMentor: true        // Flag para excluirlo del conteo de misión
      },
      {
        // Fabiola Herrera — Directora del Voluntariado del Museo de la Catedral.
        // Matemática y tecnóloga que transformó el sueño del Museo
        // en la realidad que es hoy. Trabaja incansablemente coordinando
        // voluntarios, gestionando las 15 salas y la tienda del museo.
        id: 'fabiola',
        x: 590, y: 370,
        ancho: 28, alto: 32,
        nombre: 'Fabiola Herrera',
        color: '#6a3a6a',
        dialogoHecho: false,
        esCombate: false
      }
    ];

    // --- Guardias del Panteón Nacional ---
    // El Primer Regimiento Dominicano de la Guardia Presidencial
    // custodia la entrada del Panteón. Son 4 guardias que rotan
    // en parejas: 2 activos montando guardia + 2 esperando el relevo.
    const panteon = this.edificios.find(e => e.tipo === 'panteon');
    const px = panteon.x;
    const py = panteon.y + panteon.alto;
    this.guardias = [
      // Pareja A (activa al inicio)
      { id: 'guardiaA1', x: px + 30, y: py + 8, activo: true,
        posOriginalX: px + 30, posOriginalY: py + 8,
        cuadroAnimacion: 0, esAnimando: false },
      { id: 'guardiaA2', x: px + 60, y: py + 8, activo: true,
        posOriginalX: px + 60, posOriginalY: py + 8,
        cuadroAnimacion: 0.5, esAnimando: false },  // Desfasado para que marchen alternando
      // Pareja B (fuera de escena al inicio — entran desde la derecha)
      { id: 'guardiaB1', x: px + 30 + 200, y: py + 8, activo: false,
        posOriginalX: px + 30, posOriginalY: py + 8,
        cuadroAnimacion: 0, esAnimando: false },
      { id: 'guardiaB2', x: px + 60 + 200, y: py + 8, activo: false,
        posOriginalX: px + 60, posOriginalY: py + 8,
        cuadroAnimacion: 0.5, esAnimando: false }
    ];

    // --- Objetos coleccionables ---
    // Algunos requieren que el combate con el constructor haya terminado
    this.objetos = [
      {
        // Plano arquitectónico original de la Catedral
        x: 430, y: 410,
        ancho: 16, alto: 16,
        tipo: 'planoColonial',
        recogido: false,
        requiereCombate: true
      }
    ];

    // --- Zonas de excavación (para Magnoboot) ---
    // Están enterradas y solo se revelan con el pulso de detección (F)
    this.zonasExcavacion = [
      {
        x: 500, y: 600,
        radio: 30,
        descubierta: false,
        excavada: false,
        tipo: 'monedaColonial',
        nombre: 'Moneda de la Corona'
      },
      {
        x: 1200, y: 350,
        radio: 30,
        descubierta: false,
        excavada: false,
        tipo: 'azulejoAntiguo',
        nombre: 'Azulejo Colonial'
      },
      {
        x: 850, y: 550,
        radio: 30,
        descubierta: false,
        excavada: false,
        tipo: 'llaveHierro',
        nombre: 'Llave de Hierro'
      }
    ];

    // --- Zonas de riesgo (mapa de colores superpuesto) ---
    // Muestran qué áreas están protegidas, en peligro o amenazadas
    this.zonasRiesgo = [
      // Verde — Protegido por UNESCO
      { x: 350, y: 250, ancho: 240, alto: 200, color: 'verde' },
      { x: 1300, y: 450, ancho: 200, alto: 180, color: 'verde' },
      // Amarillo — En peligro por desarrollo urbano
      { x: 700, y: 150, ancho: 200, alto: 180, color: 'amarillo' },
      { x: 150, y: 500, ancho: 250, alto: 130, color: 'amarillo' },
      // Rojo — Amenazado por construcción ilegal
      { x: 1050, y: 230, ancho: 200, alto: 180, color: 'rojo' }
    ];

    // --- Calles empedradas ---
    // Las calles de la Zona Colonial son de piedra (adoquines)
    this.calles = [
      // Calle principal norte-sur
      { x1: 900, y1: 100, x2: 900, y2: 1100 },
      // Calle este-oeste central
      { x1: 100, y1: 450, x2: 1700, y2: 450 },
      // Calle hacia la Catedral
      { x1: 470, y1: 400, x2: 470, y2: 600 },
      // Calle hacia el Monasterio
      { x1: 900, y1: 300, x2: 1150, y2: 300 },
      // Calle hacia el Panteón
      { x1: 1150, y1: 450, x2: 1400, y2: 540 }
    ];

    // --- Árboles coloniales (flamboyanes y palmas) ---
    this.arboles = [];
    const posiciones = [
      [50, 150], [180, 80], [1600, 200], [1700, 500],
      [1650, 900], [80, 900], [1500, 850], [950, 950],
      [100, 350], [1450, 150], [650, 800], [350, 900],
      [1300, 800], [700, 100], [1050, 700]
    ];
    for (const [ax, ay] of posiciones) {
      this.arboles.push({
        x: ax, y: ay,
        tamano: 18 + Math.random() * 12,
        colorTronco: `rgb(${90 + Math.random() * 40}, ${65 + Math.random() * 25}, ${25 + Math.random() * 20})`,
        colorCopa: `rgb(${25 + Math.random() * 35}, ${110 + Math.random() * 50}, ${25 + Math.random() * 25})`
      });
    }

    // Misión inicial
    const textos = this._obtenerTextos();
    this.misionActual = textos?.dialogos?.zonaColonial?.misionExplorar
      || 'Explora la Zona Colonial';
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
    if (this.combateIniciado && !this.combateTerminado && this.juego.combate.resultado) {
      this.combateTerminado = true;
      const constructor = this.npcs.find(n => n.id === 'constructor');
      if (constructor) {
        constructor.esCombate = false;
        constructor.dialogoHecho = true;
      }

      // --- Rastrear resultado para el sistema de finales ---
      if (this.juego.combate.resultado === 'pacificado') {
        this.juego.progreso.combatesPacificados++;
        if (this.juego.reputacion) this.juego.reputacion.modificar(15, 'Victoria pacífica');
      } else if (this.juego.combate.resultado === 'victoria') {
        this.juego.progreso.combatesViolentos++;
        if (this.juego.reputacion) this.juego.reputacion.modificar(5, 'Victoria en combate');
      }

      // Diálogo de resolución
      const textos = this._obtenerTextos();
      const zc = textos?.dialogos?.zonaColonial;
      if (this.juego.combate.resultado === 'pacificado') {
        this.dialogos.iniciarDialogo([
          { personaje: '🏗️ Constructor Méndez', texto: zc?.constructorPaz1 || 'Espera... ¿Patrimonio de la Humanidad? No tenía idea.' },
          { personaje: '🏗️ Constructor Méndez', texto: zc?.constructorPaz2 || 'Voy a reunir a mi equipo e inversionistas y traer historiadores para rediseñar el proyecto.' },
          { personaje: '🏗️ Constructor Méndez', texto: zc?.constructorPaz3 || 'Un hotel que proteja y destaque estas ruinas... será más caro, pero le dará un valor único.' },
          { personaje: '🏗️ Constructor Méndez', texto: zc?.constructorPaz4 || 'Incluso podría ser más rentable. Y además... es lo correcto.' }
        ]);
      } else if (this.juego.combate.resultado === 'victoria') {
        this.dialogos.iniciarDialogo([
          { personaje: '🏗️ Constructor Méndez', texto: zc?.constructorDerrota1 || 'Está bien, está bien... me hiciste pensar.' },
          { personaje: '🏗️ Constructor Méndez', texto: zc?.constructorDerrota2 || 'Hablaré con los inversionistas. Quizás podamos construir algo que respete la historia.' }
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
      // La Calle de las Damas y el Reloj de Sol NO bloquean
      if (edificio.tipo === 'calle' || edificio.tipo === 'relojSol') continue;

      if (jugador.x + jugador.ancho > edificio.x &&
          jugador.x < edificio.x + edificio.ancho &&
          jugador.y + jugador.alto > edificio.y &&
          jugador.y < edificio.y + edificio.alto) {
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

    // --- Toast de Cassá: cuando el jugador se acerca, mostrar pista ---
    // Solo una vez por visita al nivel para no ser molesto
    const cassa = this.npcs.find(n => n.id === 'historiador');
    if (cassa && this._estaCerca(jugador, cassa, 70) && !this._cassaToastMostrado) {
      this._cassaToastMostrado = true;
      if (this.juego && this.juego.mostrarToast) {
        this.juego.mostrarToast('💬 Roberto Cassá siempre tiene algo interesante que contar');
      }
    }

    // --- Interacción con guardias del Panteón ---
    for (const guardia of this.guardias) {
      if (!guardia.activo) continue; // Solo los que están montando guardia
      if (this._estaCerca(jugador, { x: guardia.x, y: guardia.y, ancho: 20, alto: 28 }, 40)) {
        if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
          this.bloqueoEntrada = true;
          this._hablarConGuardia();
        }
      }
    }

    // --- Cambio de guardia ceremonial ---
    // Cada INTERVALO_CAMBIO segundos, las parejas rotan
    this._tiempoGuardia += dt;
    if (this._tiempoGuardia >= this._INTERVALO_CAMBIO && !this._cambioEnCurso) {
      this._cambioEnCurso = true;
      this._progresoCambio = 0;
      if (this.juego && this.juego.mostrarToast) {
        this.juego.mostrarToast('🎖️ ¡Cambio de guardia en el Panteón Nacional!');
      }
    }

    // Actualizar animación de marcha de todos los guardias
    for (const g of this.guardias) {
      if (g.esAnimando) {
        g.cuadroAnimacion += 0.15;
      }
    }

    // Animar el cambio de guardia (dura 5 segundos para que sea ceremonioso)
    // Fases:
    //   0.0–0.3: relevo marcha desde lejos hacia la posición de guardia
    //   0.3–0.5: ambas parejas frente a frente (encuentro ceremonial)
    //   0.5–0.8: saludo militar, intercambio de posición
    //   0.8–1.0: guardia saliente marcha fuera de escena
    if (this._cambioEnCurso) {
      this._progresoCambio += dt / 5; // 5 segundos de ceremonia

      const activos = this.guardias.filter(g => g.activo);
      const relevo = this.guardias.filter(g => !g.activo);

      // Distancia desde la que entra/sale el relevo (fuera de pantalla)
      const distanciaFuera = 200;

      if (this._progresoCambio <= 0.3) {
        // Relevo marcha desde lejos hacia la posición de guardia
        const t = this._progresoCambio / 0.3;
        for (const g of relevo) {
          g.x = g.posOriginalX + distanciaFuera * (1 - t);
          g.y = g.posOriginalY + 20;
          g.esAnimando = true; // Marchando
        }
        // Activos se mantienen firmes (sin mover pies)
        for (const g of activos) {
          g.x = g.posOriginalX;
          g.y = g.posOriginalY;
          g.esAnimando = false;
        }

      } else if (this._progresoCambio <= 0.5) {
        // Ambas parejas frente a frente — pausa ceremonial (todos firmes)
        for (const g of relevo) {
          g.x = g.posOriginalX;
          g.y = g.posOriginalY + 20;
          g.esAnimando = false;
        }
        for (const g of activos) {
          g.x = g.posOriginalX;
          g.y = g.posOriginalY;
          g.esAnimando = false;
        }

      } else if (this._progresoCambio <= 0.8) {
        // Intercambio: relevo sube a posición, salientes bajan
        const t = (this._progresoCambio - 0.5) / 0.3;
        for (const g of relevo) {
          g.x = g.posOriginalX;
          g.y = g.posOriginalY + 20 * (1 - t);
          g.esAnimando = true;
        }
        for (const g of activos) {
          g.x = g.posOriginalX;
          g.y = g.posOriginalY + 20 * t;
          g.esAnimando = true;
        }

      } else {
        // Guardia saliente marcha fuera de escena
        const t = (this._progresoCambio - 0.8) / 0.2;
        for (const g of relevo) {
          g.x = g.posOriginalX;
          g.y = g.posOriginalY;
          g.esAnimando = false; // Ya en puesto, firmes
        }
        for (const g of activos) {
          g.x = g.posOriginalX + distanciaFuera * t;
          g.y = g.posOriginalY + 20;
          g.esAnimando = true; // Marchando fuera
        }
      }

      // Cambio completo
      if (this._progresoCambio >= 1) {
        this._cambioEnCurso = false;
        this._tiempoGuardia = 0;
        // Intercambiar roles
        for (const g of activos) {
          g.activo = false;
          g.x = g.posOriginalX + distanciaFuera; // Fuera de escena
          g.y = g.posOriginalY;
        }
        for (const g of relevo) {
          g.activo = true;
          g.x = g.posOriginalX;
          g.y = g.posOriginalY;
        }
      }
    }

    // --- Recoger objetos ---
    for (const obj of this.objetos) {
      if (obj.recogido) continue;
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
            color: '#DAA520',
            esUsable: false
          });
        }

        if (this.juego && this.juego.mostrarToast) {
          this.juego.mostrarToast(`✦ ${nombreObjeto} — ${textos?.ui?.itemAnadido || 'ítem añadido al inventario'}`);
        }
      }
    }

    // --- Detección con Magnoboot ---
    // Cuando Magnoboot está detectando (pulso activo), revisamos si
    // alguna zona de excavación está dentro del radio del pulso
    if (companeros) {
      const magnoboot = companeros.find(c => c.tipo === 'magnoboot' && c.activo);
      if (magnoboot && magnoboot.detectando) {
        const radioActual = (magnoboot._tiempoDeteccion / 1.5) * 100;
        for (const zona of this.zonasExcavacion) {
          if (zona.descubierta) continue;
          const dx = magnoboot.x + 10 - zona.x;
          const dy = magnoboot.y + 12 - zona.y;
          const distancia = Math.sqrt(dx * dx + dy * dy);

          // Si el pulso alcanza la zona, se revela
          if (distancia <= radioActual + zona.radio) {
            zona.descubierta = true;
            this.sfx.recoger();
            if (this.juego && this.juego.mostrarToast) {
              this.juego.mostrarToast(`🔍 ¡Magnoboot detectó algo enterrado!`);
            }
          }
        }
      }
    }

    // --- Excavar zonas descubiertas (E cerca de la zona) ---
    for (const zona of this.zonasExcavacion) {
      if (!zona.descubierta || zona.excavada) continue;
      if (this._estaCerca(jugador, { x: zona.x - zona.radio, y: zona.y - zona.radio, ancho: zona.radio * 2, alto: zona.radio * 2 }, 40)) {
        if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
          this.bloqueoEntrada = true;
          zona.excavada = true;
          this.sfx.recoger();

          const textos = this._obtenerTextos();
          const nombreObjeto = textos?.objetos?.[zona.tipo] || zona.nombre;
          jugador.agregarAlInventario({ nombre: zona.tipo });

          if (this.juego && this.juego.inventario) {
            this.juego.inventario.agregar({
              id: zona.tipo,
              nombre: nombreObjeto,
              descripcion: textos?.objetos?.[`desc${zona.tipo.charAt(0).toUpperCase() + zona.tipo.slice(1)}`] || '',
              tipo: 'tesoro',
              cantidad: 1,
              color: '#FFD700',
              esUsable: false
            });
          }

          if (this.juego && this.juego.mostrarToast) {
            this.juego.mostrarToast(`⛏️ ${nombreObjeto} — ${textos?.ui?.itemAnadido || 'ítem añadido al inventario'}`);
          }
        }
      }
    }

    // --- Verificar misión ---
    // Cassá (esMentor) no cuenta para completar la misión — siempre tiene más que decir
    this.npcsHablados = this.npcs.filter(n => n.dialogoHecho && !n.esMentor).length;
    if (this.npcsHablados >= this.totalNPCs) {
      const textos = this._obtenerTextos();
      this.misionActual = textos?.dialogos?.zonaColonial?.misionCompleta
        || '¡Zona Colonial explorada!';

      if (this.juego && this.juego.progreso) {
        if (!this.juego.progreso.nodosCompletados.includes(4)) {
          this.juego.progreso.nodosCompletados.push(4);
        }
        // Desbloquear el naufragio de la Santa María (nodo 5, Mundo Acuático)
        if (!this.juego.progreso.nodosDesbloqueados.includes(5)) {
          this.juego.progreso.nodosDesbloqueados.push(5);
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

    // --- Fondo: empedrado urbano colonial ---
    ctx.fillStyle = '#a09880';
    ctx.fillRect(0, 0, ancho, alto);

    // Textura de adoquines
    ctx.fillStyle = 'rgba(120, 110, 90, 0.25)';
    for (let gx = -1; gx < ancho / 40 + 1; gx++) {
      for (let gy = -1; gy < alto / 40 + 1; gy++) {
        const px = gx * 40 + (offsetX % 40);
        const py = gy * 40 + (offsetY % 40);
        ctx.fillRect(px + 2, py + 2, 36, 18);
        ctx.fillRect(px + 22, py + 22, 36, 16);
      }
    }

    // --- Zonas de riesgo (overlay semitransparente) ---
    for (const zona of this.zonasRiesgo) {
      let colorRiesgo;
      if (zona.color === 'verde') colorRiesgo = 'rgba(50, 180, 50, 0.12)';
      else if (zona.color === 'amarillo') colorRiesgo = 'rgba(220, 200, 50, 0.12)';
      else colorRiesgo = 'rgba(220, 50, 50, 0.12)';

      ctx.fillStyle = colorRiesgo;
      ctx.fillRect(zona.x + offsetX, zona.y + offsetY, zona.ancho, zona.alto);

      // Borde de la zona
      let bordeColor;
      if (zona.color === 'verde') bordeColor = 'rgba(50, 180, 50, 0.3)';
      else if (zona.color === 'amarillo') bordeColor = 'rgba(220, 200, 50, 0.3)';
      else bordeColor = 'rgba(220, 50, 50, 0.3)';

      ctx.strokeStyle = bordeColor;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(zona.x + offsetX, zona.y + offsetY, zona.ancho, zona.alto);
      ctx.setLineDash([]);
    }

    // --- Calles empedradas ---
    ctx.strokeStyle = '#706050';
    ctx.lineWidth = 22;
    ctx.lineCap = 'round';
    for (const calle of this.calles) {
      ctx.beginPath();
      ctx.moveTo(calle.x1 + offsetX, calle.y1 + offsetY);
      ctx.lineTo(calle.x2 + offsetX, calle.y2 + offsetY);
      ctx.stroke();
    }
    // Detalle de adoquines en las calles
    ctx.fillStyle = 'rgba(90, 80, 60, 0.3)';
    for (const calle of this.calles) {
      const largo = Math.sqrt(
        (calle.x2 - calle.x1) ** 2 + (calle.y2 - calle.y1) ** 2
      );
      for (let i = 0; i < largo; i += 15) {
        const t = i / largo;
        const px = calle.x1 + (calle.x2 - calle.x1) * t + offsetX;
        const py = calle.y1 + (calle.y2 - calle.y1) * t + offsetY;
        ctx.fillRect(px - 4, py - 4, 8, 6);
      }
    }

    // --- Edificios coloniales ---
    for (const edificio of this.edificios) {
      this._dibujarEdificio(ctx, edificio.x + offsetX, edificio.y + offsetY, edificio);
    }

    // --- Árboles detrás del jugador ---
    for (const arbol of this.arboles) {
      if (arbol.y < jugador.y) {
        this._dibujarArbol(ctx, arbol.x + offsetX, arbol.y + offsetY, arbol);
      }
    }

    // --- Zonas de excavación ---
    for (const zona of this.zonasExcavacion) {
      if (zona.excavada) continue;

      const zx = zona.x + offsetX;
      const zy = zona.y + offsetY;

      if (zona.descubierta) {
        // Zona revelada — brillo pulsante indicando que se puede excavar
        const brillo = 0.4 + Math.sin(this.tiempoTotal * 3) * 0.3;
        ctx.fillStyle = `rgba(255, 215, 0, ${brillo})`;
        ctx.beginPath();
        ctx.arc(zx, zy, zona.radio, 0, Math.PI * 2);
        ctx.fill();

        // Ícono de pala/excavación
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(zx - 5, zy - 5);
        ctx.lineTo(zx + 5, zy + 5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(zx + 5, zy - 5);
        ctx.lineTo(zx - 5, zy + 5);
        ctx.stroke();

        // Indicador [E] si el jugador está cerca
        if (this._estaCerca(jugador, { x: zona.x - zona.radio, y: zona.y - zona.radio, ancho: zona.radio * 2, alto: zona.radio * 2 }, 40)) {
          ctx.font = '11px monospace';
          ctx.fillStyle = '#FFD700';
          ctx.textAlign = 'center';
          const texExcavar = this._obtenerTextos()?.ui?.eExcavar || '[E] Excavar';
          ctx.fillText(texExcavar, zx, zy - zona.radio - 8);
          ctx.textAlign = 'left';
        }
      } else {
        // Zona oculta — solo un leve parpadeo para jugadores atentos
        const parpadeo = Math.sin(this.tiempoTotal * 1.5 + zona.x) * 0.05;
        if (parpadeo > 0) {
          ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
          ctx.beginPath();
          ctx.arc(zx, zy, zona.radio * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // --- Objetos coleccionables ---
    for (const obj of this.objetos) {
      if (obj.recogido) continue;
      if (obj.requiereCombate && !this.combateTerminado) continue;

      const ox = obj.x + offsetX;
      const oy = obj.y + offsetY;

      // Brillo pulsante
      const brillo = 0.5 + Math.sin(this.tiempoTotal * 3) * 0.3;
      ctx.fillStyle = `rgba(218, 165, 32, ${brillo})`;
      ctx.beginPath();
      ctx.arc(ox + 8, oy + 8, 12, 0, Math.PI * 2);
      ctx.fill();

      // Ícono de plano arquitectónico (pergamino enrollado)
      ctx.fillStyle = '#F5DEB3';
      ctx.fillRect(ox + 2, oy + 3, 12, 10);
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 1;
      ctx.strokeRect(ox + 2, oy + 3, 12, 10);
      // Líneas del plano
      ctx.strokeStyle = '#4a4a8a';
      ctx.beginPath();
      ctx.moveTo(ox + 4, oy + 6);
      ctx.lineTo(ox + 12, oy + 6);
      ctx.moveTo(ox + 4, oy + 9);
      ctx.lineTo(ox + 10, oy + 9);
      ctx.stroke();
    }

    // --- Guardias del Panteón ---
    for (const guardia of this.guardias) {
      this._dibujarGuardia(ctx, guardia, offsetX, offsetY, jugador);
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

    // Objetos recogidos
    const objRecogidos = this.objetos.filter(o => o.recogido).length;
    renderizador.dibujarTexto(`📦 ${objRecogidos}/${this.objetos.length}`, 15, 58, {
      tamano: 11, color: objRecogidos >= this.objetos.length ? '#44CC44' : '#FFD700'
    });

    // Contador de excavaciones
    const totalExcavaciones = this.zonasExcavacion.length;
    const excavadas = this.zonasExcavacion.filter(z => z.excavada).length;
    if (companeros && companeros.some(c => c.tipo === 'magnoboot' && c.activo)) {
      renderizador.dibujarTexto(`⛏️ ${excavadas}/${totalExcavaciones}`, 15, 74, {
        tamano: 11, color: '#44FFFF'
      });
    }

    renderizador.dibujarTexto(this.misionActual, ancho - 10, 20, {
      tamano: 12, color: '#CCCCCC', alineacion: 'right'
    });

    // --- Indicador de F para Magnoboot ---
    if (companeros && companeros.some(c => c.tipo === 'magnoboot' && c.activo)) {
      const texDetectar = this._obtenerTextos()?.ui?.fDetectarMetal || '[F] Detectar Metal';
      renderizador.dibujarTexto(texDetectar, 15, 90, {
        tamano: 10, color: '#44FFFF'
      });
    }

    // --- Leyenda del mapa de riesgo ---
    this._dibujarLeyendaRiesgo(ctx, ancho);

    // --- Diálogo ---
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto, textos);
    }

    // --- Controles ---
    if (!this.dialogos.estaActivo()) {
      const texControles = this._obtenerTextos()?.ui?.controlesExcavar || 'WASD: mover | E: hablar/excavar | F: detectar | I: inventario | M: mapa | P: fotos | L: misiones';
      renderizador.dibujarTexto(texControles, ancho / 2, alto - 10, {
        tamano: 10, color: '#555555', alineacion: 'center'
      });
    }
  }

  // ============================================================
  // DIBUJO DE ELEMENTOS
  // ============================================================

  // --- Dibujar edificio colonial ---
  _dibujarEdificio(ctx, x, y, edificio) {
    const a = edificio.ancho;
    const h = edificio.alto;

    if (edificio.tipo === 'catedral') {
      // Catedral Primada — estilo gótico isabelino
      // Muros de piedra caliza (color crema típico de la Zona Colonial)
      ctx.fillStyle = '#d4c8a0';
      ctx.fillRect(x, y, a, h);

      // Contrafuertes laterales
      ctx.fillStyle = '#c0b490';
      ctx.fillRect(x - 8, y + 10, 10, h - 20);
      ctx.fillRect(x + a - 2, y + 10, 10, h - 20);

      // Piedras en los muros
      ctx.strokeStyle = '#b0a480';
      ctx.lineWidth = 1;
      for (let i = 0; i < a; i += 18) {
        for (let j = 0; j < h; j += 12) {
          ctx.strokeRect(x + i + (j % 2 === 0 ? 0 : 9), y + j, 17, 11);
        }
      }

      // Puerta principal (arco ojival — típico gótico)
      ctx.fillStyle = '#3a2a1a';
      ctx.beginPath();
      ctx.moveTo(x + a / 2 - 15, y + h);
      ctx.lineTo(x + a / 2 - 15, y + h - 25);
      ctx.quadraticCurveTo(x + a / 2, y + h - 38, x + a / 2 + 15, y + h - 25);
      ctx.lineTo(x + a / 2 + 15, y + h);
      ctx.closePath();
      ctx.fill();

      // Rosetón (ventana circular decorada)
      ctx.strokeStyle = '#DAA520';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x + a / 2, y + 25, 12, 0, Math.PI * 2);
      ctx.stroke();
      // Radios del rosetón
      for (let r = 0; r < 8; r++) {
        const angulo = (r / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(x + a / 2, y + 25);
        ctx.lineTo(
          x + a / 2 + Math.cos(angulo) * 12,
          y + 25 + Math.sin(angulo) * 12
        );
        ctx.stroke();
      }

      // Torres gemelas
      ctx.fillStyle = '#c8bc96';
      ctx.fillRect(x - 5, y - 25, 20, 30);
      ctx.fillRect(x + a - 15, y - 25, 20, 30);

      // Cruz en la torre izquierda
      ctx.strokeStyle = '#DAA520';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + 5, y - 35);
      ctx.lineTo(x + 5, y - 25);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + 1, y - 31);
      ctx.lineTo(x + 9, y - 31);
      ctx.stroke();

    } else if (edificio.tipo === 'hospital') {
      // Hospital San Nicolás de Bari — ruinas con arcos
      ctx.fillStyle = '#b8a888';
      ctx.fillRect(x, y, a, h);

      // Arcos (el hospital tenía una fachada con arcos de medio punto)
      ctx.fillStyle = '#3a2a1a';
      for (let i = 0; i < 3; i++) {
        const ax2 = x + 15 + i * 35;
        ctx.beginPath();
        ctx.arc(ax2, y + h - 15, 12, Math.PI, 0);
        ctx.fill();
        ctx.fillRect(ax2 - 12, y + h - 15, 24, 15);
      }

      // Cruz médica (era un hospital)
      ctx.fillStyle = '#CC3333';
      ctx.fillRect(x + a / 2 - 3, y + 8, 6, 16);
      ctx.fillRect(x + a / 2 - 8, y + 13, 16, 6);

      // Muros parcialmente destruidos (es una ruina)
      ctx.strokeStyle = '#a09070';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + a - 5, y);
      ctx.lineTo(x + a + 3, y + 10);
      ctx.lineTo(x + a - 2, y + 20);
      ctx.stroke();

    } else if (edificio.tipo === 'monasterio') {
      // Monasterio San Francisco — ruinas imponentes
      ctx.fillStyle = '#a89878';
      ctx.fillRect(x, y, a, h);

      // Piedras
      ctx.strokeStyle = '#908060';
      ctx.lineWidth = 1;
      for (let i = 0; i < a; i += 14) {
        for (let j = 0; j < h; j += 10) {
          ctx.strokeRect(x + i, y + j, 13, 9);
        }
      }

      // Claustro (patio interior con columnas)
      ctx.fillStyle = '#5a8a5a';
      ctx.fillRect(x + 20, y + 20, a - 40, h - 40);
      // Columnas del claustro
      ctx.fillStyle = '#d0c4a0';
      const columnas = [[x + 18, y + 18], [x + a - 22, y + 18],
                         [x + 18, y + h - 22], [x + a - 22, y + h - 22]];
      for (const [cx, cy] of columnas) {
        ctx.fillRect(cx, cy, 6, 6);
      }

      // Campanario (ruina)
      ctx.fillStyle = '#a89878';
      ctx.fillRect(x + a / 2 - 10, y - 18, 20, 20);
      ctx.fillStyle = '#3a2a1a';
      ctx.beginPath();
      ctx.arc(x + a / 2, y - 8, 6, Math.PI, 0);
      ctx.fill();

    } else if (edificio.tipo === 'calle') {
      // Calle de las Damas — empedrado especial
      ctx.fillStyle = '#807060';
      ctx.fillRect(x, y, a, h);

      // Adoquines más detallados
      ctx.strokeStyle = '#605040';
      ctx.lineWidth = 1;
      for (let i = 0; i < a; i += 12) {
        for (let j = 0; j < h; j += 8) {
          ctx.strokeRect(x + i + (j % 2 === 0 ? 0 : 6), y + j, 11, 7);
        }
      }

      // Faroles coloniales a los lados
      ctx.fillStyle = '#333333';
      ctx.fillRect(x - 4, y + h / 2 - 8, 4, 16);
      ctx.fillRect(x + a, y + h / 2 - 8, 4, 16);
      ctx.fillStyle = '#FFDD44';
      const parpadeoFarol = 0.7 + Math.sin(this.tiempoTotal * 2) * 0.3;
      ctx.globalAlpha = parpadeoFarol;
      ctx.beginPath();
      ctx.arc(x - 2, y + h / 2 - 10, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + a + 2, y + h / 2 - 10, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

    } else if (edificio.tipo === 'panteon') {
      // Panteón Nacional — fachada neoclásica
      ctx.fillStyle = '#c8c0a8';
      ctx.fillRect(x, y, a, h);

      // Columnas frontales (estilo neoclásico)
      ctx.fillStyle = '#d8d0b8';
      for (let i = 0; i < 4; i++) {
        const cx = x + 12 + i * 26;
        ctx.fillRect(cx, y + 10, 8, h - 15);
        // Capitel (parte superior de la columna)
        ctx.fillRect(cx - 2, y + 8, 12, 4);
      }

      // Frontón triangular
      ctx.fillStyle = '#d0c8b0';
      ctx.beginPath();
      ctx.moveTo(x - 5, y + 8);
      ctx.lineTo(x + a / 2, y - 15);
      ctx.lineTo(x + a + 5, y + 8);
      ctx.closePath();
      ctx.fill();

      // Puerta principal
      ctx.fillStyle = '#2a1a0a';
      ctx.fillRect(x + a / 2 - 12, y + h - 25, 24, 25);

      // Llama eterna (símbolo del Panteón)
      const llamaY = y - 20 + Math.sin(this.tiempoTotal * 5) * 2;
      ctx.fillStyle = '#FF6600';
      ctx.beginPath();
      ctx.moveTo(x + a / 2, llamaY - 8);
      ctx.quadraticCurveTo(x + a / 2 + 5, llamaY, x + a / 2, llamaY + 5);
      ctx.quadraticCurveTo(x + a / 2 - 5, llamaY, x + a / 2, llamaY - 8);
      ctx.fill();

    } else if (edificio.tipo === 'relojSol') {
      // Reloj de Sol — columna de piedra con disco solar en la parte superior.
      // Uno de los relojes solares más antiguos de América,
      // ubicado en la Calle de las Damas.

      // Base de piedra (pedestal cuadrado)
      ctx.fillStyle = '#b0a488';
      ctx.fillRect(x + 4, y + 14, 16, 10);

      // Columna
      ctx.fillStyle = '#c8bc96';
      ctx.fillRect(x + 8, y + 4, 8, 12);

      // Disco del reloj (círculo con líneas horarias)
      ctx.fillStyle = '#d8d0b0';
      ctx.beginPath();
      ctx.arc(x + 12, y + 2, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#8a7a60';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x + 12, y + 2, 8, 0, Math.PI * 2);
      ctx.stroke();

      // Líneas horarias del reloj
      ctx.strokeStyle = '#6a5a40';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 12; i++) {
        const angulo = (i / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(x + 12 + Math.cos(angulo) * 4, y + 2 + Math.sin(angulo) * 4);
        ctx.lineTo(x + 12 + Math.cos(angulo) * 7, y + 2 + Math.sin(angulo) * 7);
        ctx.stroke();
      }

      // Gnomon (la aguja que proyecta la sombra)
      // Rota lentamente con el tiempo del juego para dar vida
      const anguloGnomon = (this.tiempoTotal * 0.1) % (Math.PI * 2);
      ctx.strokeStyle = '#4a3a20';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + 12, y + 2);
      ctx.lineTo(
        x + 12 + Math.cos(anguloGnomon) * 5,
        y + 2 + Math.sin(anguloGnomon) * 5
      );
      ctx.stroke();

    } else if (edificio.tipo === 'museo') {
      // Museo de la Catedral — alojado en la restaurada Real Cárcel
      // de Santo Domingo. Fachada colonial con paredes gruesas de piedra,
      // puertas de madera pesada y ventanas con rejas de hierro forjado.

      // Muros de piedra restaurada (más claros que las ruinas)
      ctx.fillStyle = '#d8c8a8';
      ctx.fillRect(x, y, a, h);

      // Piedras en los muros (mampostería colonial)
      ctx.strokeStyle = '#c0b090';
      ctx.lineWidth = 1;
      for (let i = 0; i < a; i += 14) {
        for (let j = 0; j < h; j += 10) {
          ctx.strokeRect(x + i + (j % 2 === 0 ? 0 : 7), y + j, 13, 9);
        }
      }

      // Puerta principal (doble, de madera oscura con arco)
      ctx.fillStyle = '#3a2510';
      ctx.beginPath();
      ctx.moveTo(x + a / 2 - 14, y + h);
      ctx.lineTo(x + a / 2 - 14, y + h - 22);
      ctx.quadraticCurveTo(x + a / 2, y + h - 32, x + a / 2 + 14, y + h - 22);
      ctx.lineTo(x + a / 2 + 14, y + h);
      ctx.closePath();
      ctx.fill();
      // Línea central de la puerta doble
      ctx.strokeStyle = '#2a1a08';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + a / 2, y + h);
      ctx.lineTo(x + a / 2, y + h - 28);
      ctx.stroke();

      // Ventanas con rejas de hierro (3 ventanas)
      for (let i = 0; i < 3; i++) {
        const vx = x + 12 + i * 28;
        // Hueco de ventana
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(vx, y + 10, 14, 18);
        // Rejas (barras verticales de hierro forjado)
        ctx.strokeStyle = '#555555';
        ctx.lineWidth = 1;
        for (let b = 0; b < 4; b++) {
          ctx.beginPath();
          ctx.moveTo(vx + 2 + b * 4, y + 10);
          ctx.lineTo(vx + 2 + b * 4, y + 28);
          ctx.stroke();
        }
      }

      // Letrero del museo
      ctx.fillStyle = '#2a1a08';
      ctx.fillRect(x + a / 2 - 20, y - 6, 40, 10);
      ctx.fillStyle = '#DAA520';
      ctx.font = '6px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('MUSEO', x + a / 2, y + 1);
      ctx.textAlign = 'left';

      // Cruz dorada pequeña (vínculo con la Catedral)
      ctx.strokeStyle = '#DAA520';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + a / 2, y - 14);
      ctx.lineTo(x + a / 2, y - 6);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + a / 2 - 4, y - 11);
      ctx.lineTo(x + a / 2 + 4, y - 11);
      ctx.stroke();
    }

    // Nombre del edificio
    ctx.font = '9px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
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
    if (npc.id === 'constructor') {
      // Casco de obra amarillo
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(nx + 2, ny - 16, 24, 8);
      ctx.fillRect(nx - 2, ny - 10, 32, 3);

      // Planos enrollados bajo el brazo
      ctx.fillStyle = '#F5DEB3';
      ctx.fillRect(nx + npc.ancho + 2, ny + 10, 12, 6);

    } else if (npc.id === 'arqueologa') {
      // Sombrero de campo
      ctx.fillStyle = '#C8A870';
      ctx.fillRect(nx, ny - 16, 28, 4);
      ctx.fillRect(nx + 4, ny - 20, 20, 6);

      // Brocha de excavación
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(nx - 8, ny + 15, 3, 12);
      ctx.fillStyle = '#DAA520';
      ctx.fillRect(nx - 9, ny + 25, 5, 4);

    } else if (npc.id === 'guia') {
      // Gorra y banderita
      ctx.fillStyle = '#4444AA';
      ctx.fillRect(nx + 4, ny - 14, 18, 6);
      ctx.fillRect(nx + 4, ny - 16, 12, 3);

      // Bandera dominicana pequeña
      ctx.fillStyle = '#CC0000';
      ctx.fillRect(nx + npc.ancho + 2, ny - 5, 8, 4);
      ctx.fillStyle = '#000088';
      ctx.fillRect(nx + npc.ancho + 2, ny - 1, 8, 4);

    } else if (npc.id === 'estudiante') {
      // Cola de caballo
      ctx.fillStyle = '#2a1a0a';
      ctx.fillRect(nx + 10, ny - 14, 8, 6);
      ctx.fillRect(nx + 18, ny - 12, 4, 10);

      // Cuaderno
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(nx - 6, ny + 8, 8, 10);
      ctx.strokeStyle = '#4444AA';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(nx - 5, ny + 10 + i * 2);
        ctx.lineTo(nx + 1, ny + 10 + i * 2);
        ctx.stroke();
      }

    } else if (npc.id === 'historiador') {
      // Roberto Cassá — académico con lentes y libro rojo
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

    } else if (npc.id === 'fabiola') {
      // Fabiola Herrera — pelo largo castaño oscuro hasta los hombros,
      // con raya al lado. Basado en su foto real.
      // Tono de piel claro (redibujar sobre el genérico)
      ctx.fillStyle = '#E8C8A8';
      ctx.fillRect(nx + 4, ny - 10, 20, 12);
      // Ojos oscuros
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(nx + 8, ny - 6, 4, 4);
      ctx.fillRect(nx + 16, ny - 6, 4, 4);
      ctx.fillStyle = '#2a1a0a';
      ctx.fillRect(nx + 9, ny - 5, 2, 2);
      ctx.fillRect(nx + 17, ny - 5, 2, 2);

      // Pelo largo castaño oscuro — cae a ambos lados de la cabeza
      ctx.fillStyle = '#1a0e08';
      // Parte superior del pelo (volumen arriba)
      ctx.fillRect(nx + 2, ny - 14, 24, 8);
      // Lado izquierdo del pelo (cae hasta los hombros)
      ctx.fillRect(nx + 1, ny - 10, 6, 22);
      // Lado derecho del pelo (cae hasta los hombros)
      ctx.fillRect(nx + 21, ny - 10, 6, 22);
      // Mechón frontal (flequillo al lado)
      ctx.fillRect(nx + 3, ny - 12, 10, 4);

      // Labios (rojo — rasgo distintivo de su foto)
      ctx.fillStyle = '#CC2222';
      ctx.fillRect(nx + 10, ny - 1, 8, 2);

      // Blusa blanca (lleva ropa clara en su foto)
      ctx.fillStyle = '#EEEEDD';
      ctx.fillRect(nx + 2, ny + 2, 24, 8);
    }

    // Nombre
    ctx.font = '10px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(npc.nombre, nx + npc.ancho / 2, ny - 22);

    // Indicador de interacción
    // Cassá (esMentor) siempre muestra [E] porque siempre tiene algo nuevo
    if (this._estaCerca(jugador, npc, 45) && (!npc.dialogoHecho || npc.esMentor)) {
      const parpadeo = Math.sin(this.tiempoTotal * 4) > 0 ? 1 : 0.4;
      ctx.font = '11px monospace';
      ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
      const _t = this._obtenerTextos()?.ui;
      const texto = npc.esCombate ? (_t?.eAlerta || '[E] ¡Alerta!') : (_t?.eHablar || '[E] Hablar');
      ctx.fillText(texto, nx + npc.ancho / 2, ny - 34);
    }

    if (npc.dialogoHecho && !npc.esMentor) {
      ctx.font = 'bold 14px monospace';
      ctx.fillStyle = '#44CC44';
      ctx.fillText('✓', nx + npc.ancho / 2, ny - 34);
    }

    ctx.textAlign = 'left';
  }

  // --- Dibujar jugador (mismo patrón que La Isabela) ---
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

    // Ramas
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

  // --- Leyenda del mapa de riesgo (esquina inferior izquierda) ---
  _dibujarLeyendaRiesgo(ctx, anchoCanvas) {
    const lx = 10;
    const ly = 440;

    // Fondo semitransparente
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(lx, ly, 130, 58);

    ctx.font = 'bold 9px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Mapa de Riesgo:', lx + 5, ly + 12);

    // Verde
    ctx.fillStyle = '#44CC44';
    ctx.fillRect(lx + 5, ly + 18, 10, 10);
    ctx.fillStyle = '#CCCCCC';
    ctx.font = '8px monospace';
    ctx.fillText('Protegido', lx + 20, ly + 27);

    // Amarillo
    ctx.fillStyle = '#CCCC44';
    ctx.fillRect(lx + 5, ly + 32, 10, 10);
    ctx.fillStyle = '#CCCCCC';
    ctx.fillText('En peligro', lx + 20, ly + 41);

    // Rojo
    ctx.fillStyle = '#CC4444';
    ctx.fillRect(lx + 5, ly + 46, 10, 10);
    ctx.fillStyle = '#CCCCCC';
    ctx.fillText('Amenazado', lx + 20, ly + 55);
  }

  // --- Hablar con NPC ---
  _hablarConNPC(npc, jugador) {
    const textos = this._obtenerTextos();
    const zc = textos?.dialogos?.zonaColonial;

    if (npc.id === 'constructor') {
      if (npc.esCombate && !this.combateTerminado) {
        // El constructor se enfrenta al jugador
        this.dialogos.iniciarDialogo([
          { personaje: '🏗️ Constructor Méndez', texto: zc?.constructor1 || '¡Fuera de aquí, mocoso! ¡Estas piedras viejas van a caer para hacer espacio a mi hotel!' },
          { personaje: '🏗️ Constructor Méndez', texto: zc?.constructor2 || '¡Nadie va a impedirme construir! ¡Estos escombros no valen nada!' }
        ], () => {
          this.combateIniciado = true;
          if (this.juego && this.juego.combate) {
            // --- Opciones de activismo ciudadano ---
            // En vez de pelear físicamente, el jugador usa herramientas
            // sociales y legales para defender el patrimonio.
            // El Constructor contraataca con sus propias estrategias.
            this.juego.combate.iniciar({
              nombre: 'Constructor Méndez',
              vida: 50,
              vidaMaxima: 50,
              fuerza: 3,
              velocidad: 1,
              hostilidad: 70,
              tipoSprite: 'constructor',
              pistaPersonalizada: zc?.combatePista || 'Usa activismo ciudadano para convencer al Constructor',
              opcionesPersonalizadas: [
                {
                  // --- Redes Sociales: seguro pero efecto moderado ---
                  id: 'redesSociales',
                  nombre: zc?.accionRedes || 'Redes Sociales',
                  paciencia: [10, 16],
                  hostilidad: [6, 12],
                  mensaje: zc?.accionRedesMsg || '¡Publicas fotos de las ruinas amenazadas!',
                  respuestaEnemigo: {
                    mensaje: zc?.respuestaRedes || 'Méndez paga influencers para promover su hotel.',
                    hostilidad: [4, 8],
                    paciencia: [2, 5]
                  }
                },
                {
                  // --- Protestas: efecto fuerte, presión social directa ---
                  id: 'protestas',
                  nombre: zc?.accionProtestas || 'Protestas',
                  paciencia: [14, 22],
                  hostilidad: [10, 16],
                  mensaje: zc?.accionProtestasMsg || '¡Organizas una manifestación frente a la obra!',
                  respuestaEnemigo: {
                    mensaje: zc?.respuestaProtestas || 'Méndez patrocina un teteo y conciertos para la comunidad.',
                    hostilidad: [6, 10],
                    paciencia: [4, 8]
                  }
                },
                {
                  // --- Denuncia: muy efectivo pero variable ---
                  id: 'denuncia',
                  nombre: zc?.accionDenuncia || 'Denunciar',
                  paciencia: [16, 26],
                  hostilidad: [12, 20],
                  mensaje: zc?.accionDenunciaMsg || '¡Denuncias la demolición ante las autoridades!',
                  respuestaEnemigo: {
                    mensaje: zc?.respuestaDenuncia || 'Méndez negocia permisos y excepciones con políticos.',
                    hostilidad: [8, 14],
                    paciencia: [5, 10]
                  }
                },
                {
                  // --- Legal: el más poderoso pero la contra es fuerte ---
                  id: 'legal',
                  nombre: zc?.accionLegal || 'Vía Legal',
                  paciencia: [20, 30],
                  hostilidad: [15, 24],
                  mensaje: zc?.accionLegalMsg || '¡Presentas un recurso legal para detener la obra!',
                  respuestaEnemigo: {
                    mensaje: zc?.respuestaLegal || 'Méndez usa maniobras legales para dilatar mientras sigue construyendo.',
                    hostilidad: [10, 16],
                    paciencia: [6, 12]
                  }
                }
              ]
            }, this.juego);
          }
        });
      } else {
        this.dialogos.iniciarDialogo([
          { personaje: '🏗️ Constructor Méndez', texto: zc?.constructorRepite || 'Ya hablé con los inversionistas. Vamos a rediseñar el hotel para proteger las ruinas. ¡Será único!' }
        ]);
      }

    } else if (npc.id === 'arqueologa') {
      this.dialogos.iniciarDialogo([
        { personaje: '🔬 Dra. Pérez', texto: zc?.arqueologa1 || 'Soy la Dra. Pérez, arqueóloga del Museo del Hombre Dominicano.' },
        { personaje: '🔬 Dra. Pérez', texto: zc?.arqueologa2 || 'La Zona Colonial tiene más de 500 años. Cada piedra cuenta una historia.' },
        { personaje: '🔬 Dra. Pérez', texto: zc?.arqueologa3 || 'Hay tesoros enterrados bajo estas calles. Tu robot podría ayudar a encontrarlos.' },
        { personaje: '🔬 Dra. Pérez', texto: zc?.arqueologa4 || 'Presiona F para que Magnoboot escanee el suelo. Si detecta algo, podrás excavarlo con E.' }
      ], () => { npc.dialogoHecho = true; });

    } else if (npc.id === 'guia') {
      this.dialogos.iniciarDialogo([
        { personaje: '🎙️ Don Rafael', texto: zc?.guia1 || '¡Bienvenido a la Zona Colonial! Soy Don Rafael, guía certificado.' },
        { personaje: '🎙️ Don Rafael', texto: zc?.guia2 || 'La Catedral Primada fue la primera de América. ¡Se empezó a construir en 1512!' },
        { personaje: '🎙️ Don Rafael', texto: zc?.guia3 || 'El Hospital San Nicolás de Bari fue el primer hospital del Nuevo Mundo, fundado en 1503.' },
        { personaje: '🎙️ Don Rafael', texto: zc?.guia4 || 'Y la Calle de las Damas es la primera calle empedrada de América. ¡Caminas sobre historia!' }
      ], () => { npc.dialogoHecho = true; });

    } else if (npc.id === 'estudiante') {
      this.dialogos.iniciarDialogo([
        { personaje: '📐 María', texto: zc?.estudiante1 || '¡Hola! Soy María, estudio arquitectura en la UASD.' },
        { personaje: '📐 María', texto: zc?.estudiante2 || 'Estoy investigando las técnicas de construcción colonial. ¡Usaban coral fosilizado como material!' },
        { personaje: '📐 María', texto: zc?.estudiante3 || 'El Monasterio San Francisco fue el primero de América. Hoy sus ruinas son un escenario de conciertos.' },
        { personaje: '📐 María', texto: zc?.estudiante4 || 'El Panteón Nacional era una iglesia jesuita. Ahora guarda los restos de nuestros héroes nacionales.' }
      ], () => { npc.dialogoHecho = true; });

    } else if (npc.id === 'fabiola') {
      // Fabiola Herrera — Directora del Voluntariado del Museo de la Catedral
      this.dialogos.iniciarDialogo([
        { personaje: '🏛️ Fabiola Herrera', texto: zc?.fabiola1 || '¡Bienvenido al Museo de la Catedral! Soy Fabiola Herrera, directora del voluntariado.' },
        { personaje: '🏛️ Fabiola Herrera', texto: zc?.fabiola2 || 'Este museo está en la antigua Real Cárcel de Santo Domingo. La restauramos para preservar siglos de historia y fe.' },
        { personaje: '🏛️ Fabiola Herrera', texto: zc?.fabiola3 || 'Tenemos 15 salas con tesoros del siglo XVI al XX: el portapaz de Colón, cruces pectorales, el Águila Bicéfala, el Coro Bajo de la Catedral...' },
        { personaje: '🏛️ Fabiola Herrera', texto: zc?.fabiola4 || 'Yo soy matemática, trabajé proyectos de tecnología toda mi vida, pero un día descubrí que mi verdadera misión era transformar este sueño en realidad.' },
        { personaje: '🏛️ Fabiola Herrera', texto: zc?.fabiola5 || 'Un museo no es solo un espacio de exhibición. Es un viaje que transporta al visitante a un pasado lleno de arte y devoción.' },
        { personaje: '🏛️ Fabiola Herrera', texto: zc?.fabiola6 || 'Cada objeto aquí cuenta una historia. La Piedra Pentagonal, las esculturas restauradas con su pátina original... ¡todo habla!' }
      ], () => { npc.dialogoHecho = true; });

    } else if (npc.id === 'historiador') {
      // Roberto Cassá — diálogos rotativos (cada vez dice algo diferente)
      this._hablarConCassa(zc);
    }
  }

  // --- Diálogos rotativos de Roberto Cassá ---
  // Cassá es un mentor recurrente. Cada vez que le hablas, avanza
  // a la siguiente conversación. Cuando se acaban, vuelve al inicio.
  _hablarConCassa(zc) {
    const conversaciones = [
      // 0: Saludo y reencuentro
      [
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaZC1 || '¡Volvemos a encontrarnos! Vine a investigar la Zona Colonial.' },
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaZC2 || 'Este lugar tiene más de 500 años de historia. Cada esquina esconde un secreto.' }
      ],
      // 1: Sobre el conflicto con el constructor
      [
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaConflicto1 || '¿Viste al constructor? Pasa mucho: empresarios que quieren demoler para construir.' },
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaConflicto2 || 'Pero la historia no se puede reemplazar. Un hotel nuevo se construye en meses... estas piedras tardaron siglos.' },
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaConflicto3 || 'Lo mejor es cuando logran integrarse: modernidad y patrimonio conviviendo. Todos ganan.' }
      ],
      // 2: Datos históricos profundos
      [
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaDatos1 || '¿Sabías que la Catedral Primada tiene los restos que se atribuyen a Cristóbal Colón?' },
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaDatos2 || 'El Hospital San Nicolás de Bari atendía a españoles e indígenas por igual. Fue revolucionario para su época.' },
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaDatos3 || 'Y la Calle de las Damas se llama así porque las damas de la corte de María de Toledo paseaban por ella.' }
      ],
      // 3: Sobre la protección del patrimonio
      [
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaPatrimonio1 || 'La UNESCO declaró esta zona Patrimonio de la Humanidad en 1990.' },
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaPatrimonio2 || 'Eso significa que pertenece a todos los pueblos del mundo, no solo a nosotros.' },
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaPatrimonio3 || 'Proteger el patrimonio no es solo conservar piedras — es mantener viva la memoria de quiénes somos.' }
      ],
      // 4: Sobre la Calle de las Damas
      [
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaCalle1 || '¿Ves esta calle? Es la Calle de las Damas — la primera calle empedrada de América.' },
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaCalle2 || 'Fue trazada por orden de Nicolás de Ovando en 1502. Por aquí pasaban los gobernadores y sus familias.' },
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaCalle3 || 'Se dice que las damas de la corte de María de Toledo paseaban aquí cada tarde. De ahí su nombre.' }
      ],
      // 5: Sobre el Reloj de Sol
      [
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaReloj1 || '¿Has visto el Reloj de Sol? Es uno de los más antiguos de América.' },
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaReloj2 || 'Fue construido en el siglo XVI para que los vecinos de la ciudad pudieran medir el tiempo.' },
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaReloj3 || 'Antes de los relojes mecánicos, el sol era el único reloj. Esta columna proyectaba su sombra sobre las marcas horarias.' }
      ],
      // 6: Pista sobre el próximo mundo
      [
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaPista1 || 'Has aprendido mucho sobre los taínos y los colonizadores...' },
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaPista2 || 'Pero hay un mundo que aún no has explorado: el mar que rodea nuestra isla.' },
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaPista3 || 'Los océanos guardan tesoros y peligros. Ballenas, tortugas, arrecifes... y amenazas que debemos enfrentar.' },
        { personaje: '📚 Roberto Cassá', texto: zc?.cassaPista4 || 'Cuando estés listo, el Mundo Acuático te espera. ¡Buena suerte, joven arqueólogo!' }
      ]
    ];

    // Elegir la conversación actual y avanzar el contador
    const indice = this._cassaConversacion % conversaciones.length;
    this.dialogos.iniciarDialogo(conversaciones[indice], () => {
      this._cassaConversacion++;
    });
  }

  // --- Hablar con un guardia del Panteón ---
  // Los guardias no pueden hablar porque están en servicio.
  // El diálogo lo narra el juego explicando el protocolo.
  _hablarConGuardia() {
    const textos = this._obtenerTextos();
    const zc = textos?.dialogos?.zonaColonial;

    this.dialogos.iniciarDialogo([
      { personaje: '🎖️ Narrador', texto: zc?.guardia1 || 'Los guardias no pueden hablar mientras montan guardia. Es parte del protocolo militar.' },
      { personaje: '🎖️ Narrador', texto: zc?.guardia2 || 'Son miembros del Primer Regimiento Dominicano de la Guardia Presidencial.' },
      { personaje: '🎖️ Narrador', texto: zc?.guardia3 || 'Custodian la entrada del Panteón Nacional, donde reposan los restos de los héroes de la patria.' },
      { personaje: '🎖️ Narrador', texto: zc?.guardia4 || 'Cada cierto tiempo realizan el cambio de guardia: una ceremonia solemne donde dos guardias relevan a los anteriores.' },
      { personaje: '🎖️ Narrador', texto: zc?.guardia5 || 'Dentro del Panteón arde una llama que nunca se apaga — símbolo eterno del sacrificio de los padres de la nación.' }
    ]);
  }

  // --- Dibujar guardia del Panteón ---
  // Solo se dibujan los guardias activos (montando guardia) o
  // durante el cambio de guardia (ambas parejas visibles brevemente).
  // Los guardias de relevo están fuera de escena hasta la ceremonia.
  _dibujarGuardia(ctx, guardia, offsetX, offsetY, jugador) {
    // No dibujar guardias de relevo a menos que el cambio esté en curso
    if (!guardia.activo && !this._cambioEnCurso) return;
    const gx = guardia.x + offsetX;
    const gy = guardia.y + offsetY;

    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.beginPath();
    ctx.ellipse(gx + 10, gy + 30, 10, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Animación de marcha (igual que el jugador — pies alternando)
    const pasoAnim = guardia.esAnimando
      ? Math.sin(guardia.cuadroAnimacion * 5) * 3 : 0;

    // Pantalón de uniforme (verde oliva oscuro)
    ctx.fillStyle = '#3a4a2a';
    ctx.fillRect(gx + 3, gy + 16 + pasoAnim, 6, 10);
    ctx.fillRect(gx + 11, gy + 16 - pasoAnim, 6, 10);

    // Botas negras
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(gx + 2, gy + 24 + pasoAnim, 7, 5);
    ctx.fillRect(gx + 11, gy + 24 - pasoAnim, 7, 5);

    // Torso (chaqueta verde oliva con botones dorados)
    ctx.fillStyle = '#4a5a3a';
    ctx.fillRect(gx + 2, gy + 4, 16, 14);
    // Botones dorados
    ctx.fillStyle = '#DAA520';
    ctx.fillRect(gx + 9, gy + 6, 2, 2);
    ctx.fillRect(gx + 9, gy + 10, 2, 2);
    ctx.fillRect(gx + 9, gy + 14, 2, 2);

    // Cinturón
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(gx + 1, gy + 15, 18, 2);
    ctx.fillStyle = '#DAA520';
    ctx.fillRect(gx + 8, gy + 15, 4, 2);

    // Cabeza
    ctx.fillStyle = '#C68642';
    ctx.fillRect(gx + 4, gy - 6, 12, 11);

    // Gorra militar (verde con visera)
    ctx.fillStyle = '#3a4a2a';
    ctx.fillRect(gx + 2, gy - 10, 16, 6);
    ctx.fillStyle = '#2a3a1a';
    ctx.fillRect(gx + 1, gy - 5, 18, 2);
    // Insignia dorada en la gorra
    ctx.fillStyle = '#DAA520';
    ctx.fillRect(gx + 8, gy - 9, 4, 3);

    // Ojos (mirada al frente, firme)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(gx + 6, gy - 3, 3, 3);
    ctx.fillRect(gx + 11, gy - 3, 3, 3);
    ctx.fillStyle = '#000000';
    ctx.fillRect(gx + 7, gy - 2, 1.5, 1.5);
    ctx.fillRect(gx + 12, gy - 2, 1.5, 1.5);

    // Fusil ceremonial (vertical, al costado derecho)
    ctx.fillStyle = '#555555';
    ctx.fillRect(gx + 18, gy - 8, 2, 30);
    // Bayoneta
    ctx.fillStyle = '#AAAAAA';
    ctx.fillRect(gx + 17, gy - 12, 4, 5);

    // Indicador [E] si el jugador está cerca y el guardia está activo
    if (guardia.activo && this._estaCerca(jugador, { x: guardia.x, y: guardia.y, ancho: 20, alto: 28 }, 40)) {
      ctx.font = '11px monospace';
      ctx.fillStyle = `rgba(255, 215, 0, ${Math.sin(this.tiempoTotal * 4) > 0 ? 1 : 0.4})`;
      ctx.textAlign = 'center';
      ctx.fillText('[E]', gx + 10, gy - 18);
      ctx.textAlign = 'left';
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
