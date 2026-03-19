// ============================================================
// MUNDO-ACUATICO.JS - Naufragio de la Santa María (Acto 3)
// ============================================================
// Después de explorar la Zona Colonial, un pescador lleva a
// Pepito en canoa a explorar los restos submarinos de la Santa
// María, la nave capitana de Colón que encalló cerca de
// Cap-Haïtien la noche del 25 de diciembre de 1492.
//
// El jugador explora el fondo marino, habla con fauna marina,
// enfrenta a un pez león invasor y recibe un mapa de naufragios
// de una arqueóloga submarina amateur.
//
// PELIGROS: Medusas que causan daño + efecto de lentitud.
// COMBATE: Pez león (especie invasora) con opciones ecológicas.
// MODO: Top-down (vista desde arriba, movimiento lento = nadar)
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';

export class MundoAcuatico {

  constructor() {
    // --- Dimensiones del nivel ---
    // El fondo marino es amplio para dar sensación de inmensidad
    this.anchoNivel = 1600;
    this.altoNivel = 1100;

    // --- Cámara ---
    this.camaraX = 0;
    this.camaraY = 0;

    // --- Estructuras del naufragio (obstáculos con colisión) ---
    this.estructuras = [];

    // --- NPCs ---
    this.npcs = [];

    // --- Objetos coleccionables ---
    this.objetos = [];

    // --- Medusas (peligros pasivos) ---
    this.medusas = [];

    // --- Partículas de burbujas ---
    this.burbujas = [];

    // --- Algas marinas animadas ---
    this.algas = [];

    // --- Sombras de ballenas jorobadas (fondo lejano) ---
    // Siluetas oscuras que cruzan lentamente el nivel, como si
    // nadaran en aguas profundas debajo del jugador. Adaptadas
    // del proyecto cary (Phaser 3 → Canvas2D vanilla).
    this.ballenasJorobadas = [];
    this._cooldownCantoballena = 0; // Evita spam de sonido/toast

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

    // Ángulo de nado del jugador — rota suavemente al moverse horizontalmente
    this._anguloNado = 0; // radianes: 0 = vertical, ±π/2 = horizontal

    // Sacudida del avatar al recibir daño (medusa, colisión)
    this._sacudida = 0;

    // --- Misión ---
    this.misionActual = '';
    this.npcsHablados = 0;
    this.totalNPCs = 3; // Sin contar al pez león (es combate)

    // --- Combate con el pez león ---
    this.combateIniciado = false;
    this.combateTerminado = false;

    // --- Efecto de lentitud por medusa ---
    // Cuando una medusa pica, el jugador se mueve más lento
    this.efectoLentitud = 0; // Segundos restantes
    this.invulnerabilidad = 0; // Cooldown tras picadura

    // --- Spawn desde sub-nivel (Santuario del Manatí) ---
    // Cuando el jugador vuelve del santuario, aparece a la derecha
    this._spawnDesdeSubnivel = false;

    // --- Referencia al juego ---
    this.juego = null;
  }

  // --- Construir el mundo submarino ---
  iniciar(juego) {
    this.juego = juego;

    // Poner al jugador en modo top-down
    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';
      // Si viene del Santuario del Manatí, aparecer a la derecha
      if (this._spawnDesdeSubnivel) {
        juego.jugador.x = 1500;
        juego.jugador.y = 500;
        this._spawnDesdeSubnivel = false;
      } else {
        juego.jugador.x = 200;
        juego.jugador.y = 900;
      }
      juego.jugador.direccion = 'arriba';
    }

    // --- Estructuras del naufragio de la Santa María ---
    // La Santa María, nave capitana de Colón, encalló en un arrecife
    // cerca de Cap-Haïtien la Nochebuena de 1492. Sus maderos
    // se usaron para construir el Fuerte Navidad — la primera
    // estructura europea en América.
    this.estructuras = [
      {
        x: 600, y: 350,
        ancho: 180, alto: 90,
        tipo: 'cascoGrande',
        nombre: 'Casco de la Santa María'
      },
      {
        x: 900, y: 500,
        ancho: 100, alto: 60,
        tipo: 'cascoPequeno',
        nombre: 'Fragmento del casco'
      },
      {
        x: 750, y: 200,
        ancho: 25, alto: 120,
        tipo: 'mastil',
        nombre: 'Mástil roto'
      },
      {
        x: 450, y: 600,
        ancho: 50, alto: 40,
        tipo: 'ancla',
        nombre: 'Ancla'
      },
      {
        x: 1100, y: 300,
        ancho: 130, alto: 80,
        tipo: 'arrecife',
        nombre: 'Arrecife de coral'
      },
      {
        x: 150, y: 850,
        ancho: 80, alto: 40,
        tipo: 'canoa',
        nombre: 'Canoa del pescador'
      }
    ];

    // --- Estructuras fotografiables (arrecife de coral) ---
    // El arrecife se puede fotografiar con renderizado dedicado de coral
    this.fotografiables = this.estructuras
      .filter(e => e.tipo === 'arrecife')
      .map(e => ({
        ...e,
        tipo: 'coralCerebro', // El arrecife del naufragio es coral cerebro colonizador
        descripcion: 'Arrecife de coral colonizando los restos del naufragio',
        tipoEntidad: 'coral'
      }));

    // --- NPCs ---
    this.npcs = [
      {
        id: 'pescador',
        x: 220, y: 820,
        ancho: 28, alto: 32,
        nombre: 'Pescador Manuel',
        color: '#5a8a4a',
        dialogoHecho: false,
        esCombate: false
      },
      {
        id: 'tortugaCarey',
        x: 850, y: 250,
        ancho: 32, alto: 28,
        nombre: 'Tortuga Carey',
        color: '#6B8E23',
        dialogoHecho: false,
        esCombate: false,
        // La tortuga nada en un circuito ovalado alrededor del arrecife
        centroX: 850, centroY: 250,
        radioX: 120, radioY: 60,
        fase: 0,
        mirandoDerecha: true
      },
      {
        id: 'tortugaTinglar',
        x: 400, y: 600,
        ancho: 42, alto: 32,  // La más grande de las 4 especies
        nombre: 'Tortuga Tinglar',
        color: '#1a1a2e',
        dialogoHecho: false,
        esCombate: false,
        // El tinglar nada en un circuito amplio (es la más grande y viajera)
        centroX: 400, centroY: 600,
        radioX: 180, radioY: 80,
        fase: Math.PI * 0.5,
        mirandoDerecha: true
      },
      {
        id: 'tortugaCaguama',
        x: 1100, y: 400,
        ancho: 34, alto: 26,
        nombre: 'Tortuga Caguama',
        color: '#8B4513',
        dialogoHecho: false,
        esCombate: false,
        // La caguama nada cerca del fondo buscando crustáceos
        centroX: 1100, centroY: 400,
        radioX: 100, radioY: 50,
        fase: Math.PI,
        mirandoDerecha: false
      },
      {
        id: 'arqueologa',
        x: 1200, y: 550,
        ancho: 28, alto: 32,
        nombre: 'Arqueóloga Submarina',
        color: '#4a6a9a',
        dialogoHecho: false,
        esCombate: false
      },
      {
        id: 'pezLeon',
        x: 1000, y: 400,
        ancho: 30, alto: 26,
        nombre: 'Pez León',
        color: '#CC4444',
        dialogoHecho: false,
        esCombate: true, // Inicia combate
        // Patrulla territorial errática — el pez león defiende su zona del arrecife
        centroX: 1000, centroY: 400,
        radioX: 60, radioY: 30,
        fase: 0,
        mirandoDerecha: true
      }
    ];

    // --- Objetos coleccionables ---
    // El clavo de bronce aparece donde estaba el pez león tras el combate
    this.objetos = [
      {
        x: 1010, y: 410,
        ancho: 16, alto: 16,
        tipo: 'clavoBronce',
        recogido: false,
        requiereCombate: true // Solo visible tras combate
      }
    ];

    // --- Medusas (peligros pasivos) ---
    // Cada medusa se mueve en onda sinusoidal entre dos puntos
    this.medusas = [
      { x: 400, y: 300, puntoA: { x: 350, y: 250 }, puntoB: { x: 500, y: 350 }, fase: 0, radio: 18 },
      { x: 650, y: 550, puntoA: { x: 600, y: 500 }, puntoB: { x: 720, y: 600 }, fase: 1.5, radio: 16 },
      { x: 1050, y: 650, puntoA: { x: 980, y: 600 }, puntoB: { x: 1120, y: 700 }, fase: 3.0, radio: 20 },
      { x: 300, y: 500, puntoA: { x: 250, y: 450 }, puntoB: { x: 380, y: 550 }, fase: 4.5, radio: 15 }
    ];

    // --- Algas marinas ---
    // Decoración que se balancea con Math.sin para simular corriente
    const posicionesAlgas = [
      [80, 700], [250, 650], [450, 800], [550, 250], [700, 700],
      [850, 650], [1000, 800], [1150, 450], [1300, 700], [1400, 350],
      [350, 450], [900, 150], [1250, 250], [100, 350], [500, 550],
      [750, 850], [1350, 600], [600, 150], [1450, 500], [200, 200]
    ];
    this.algas = posicionesAlgas.map(([ax, ay]) => ({
      x: ax, y: ay,
      altura: 30 + Math.random() * 30,
      fase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? '#2a6a30' : '#3a8a40'
    }));

    // --- Burbujas ---
    // Partículas que suben constantemente desde el fondo
    this.burbujas = [];
    for (let i = 0; i < 25; i++) {
      this.burbujas.push(this._crearBurbuja());
    }

    // --- Ballenas jorobadas (sombras lejanas) ---
    // Empiezan fuera del nivel y cruzan lentamente
    this.ballenasJorobadas = [];
    this._spawnBallena();

    // Misión inicial
    const textos = this._obtenerTextos();
    this.misionActual = textos?.dialogos?.acuatico?.misionExplorar
      || 'Explora el naufragio de la Santa María';
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, jugador, companeros) {
    if (!jugador) return;

    this.tiempoTotal += dt;

    // Decrementar sacudida por impacto
    if (this._sacudida > 0) this._sacudida = Math.max(0, this._sacudida - dt);

    // --- Si hay combate activo, lo maneja juego.js ---
    if (this.juego && this.juego.combate.enCombate) {
      return;
    }

    // --- Verificar si el combate TERMINÓ ---
    // Esto va FUERA del bloque enCombate porque cuando el combate
    // termina, enCombate ya es false pero el resultado está guardado
    if (this.combateIniciado && !this.combateTerminado && this.juego.combate.resultado) {
      this.combateTerminado = true;
      const pezLeon = this.npcs.find(n => n.id === 'pezLeon');
      if (pezLeon) {
        pezLeon.esCombate = false;
        pezLeon.dialogoHecho = true;
      }

      // --- Rastrear resultado para el sistema de finales ---
      if (this.juego.combate.resultado === 'pacificado') {
        this.juego.progreso.combatesPacificados++;
        this.juego.progreso.accionesEcologicas++;
        if (this.juego.reputacion) this.juego.reputacion.modificar(15, 'Victoria pacífica');
      } else if (this.juego.combate.resultado === 'victoria') {
        this.juego.progreso.combatesViolentos++;
        if (this.juego.reputacion) this.juego.reputacion.modificar(5, 'Victoria en combate');
      }

      // Diálogo de resolución según el resultado
      const textos = this._obtenerTextos();
      const ac = textos?.dialogos?.acuatico;
      if (this.juego.combate.resultado === 'pacificado') {
        this.dialogos.iniciarDialogo([
          { personaje: '🐟 Pez León', texto: ac?.pezLeonPaz1 || 'La pesca controlada mantendrá el equilibrio del arrecife.' },
          { personaje: '🐟 Pez León', texto: ac?.pezLeonPaz2 || '¿Sabías que la carne de pez león es deliciosa y nutritiva? ¡Cocinarme es ecológico!' }
        ]);
      } else if (this.juego.combate.resultado === 'victoria') {
        this.dialogos.iniciarDialogo([
          { personaje: '🐟 Pez León', texto: ac?.pezLeonDerrota || 'El pez león se retira... pero volverán más si no se controla la invasión.' }
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

    // --- Actualizar efecto de lentitud ---
    if (this.efectoLentitud > 0) {
      this.efectoLentitud -= dt;
      if (this.efectoLentitud < 0) this.efectoLentitud = 0;
    }
    if (this.invulnerabilidad > 0) {
      this.invulnerabilidad -= dt;
      if (this.invulnerabilidad < 0) this.invulnerabilidad = 0;
    }

    // --- Movimiento top-down (más lento = sensación de nadar) ---
    jugador.velocidadX = 0;
    jugador.velocidadY = 0;
    jugador.esAnimando = false;

    // Factor de velocidad: 0.7 base, 0.4 si hay lentitud por medusa
    const factorNado = this.efectoLentitud > 0 ? 0.4 : 0.7;
    const velocidadNado = VELOCIDAD_JUGADOR * factorNado;

    if (entrada.estaPresionada('arriba')) {
      jugador.velocidadY = -velocidadNado;
      jugador.direccion = 'arriba';
      jugador.esAnimando = true;
    }
    if (entrada.estaPresionada('abajo')) {
      jugador.velocidadY = velocidadNado;
      jugador.direccion = 'abajo';
      jugador.esAnimando = true;
    }
    if (entrada.estaPresionada('izquierda')) {
      jugador.velocidadX = -velocidadNado;
      jugador.direccion = 'izquierda';
      jugador.esAnimando = true;
    }
    if (entrada.estaPresionada('derecha')) {
      jugador.velocidadX = velocidadNado;
      jugador.direccion = 'derecha';
      jugador.esAnimando = true;
    }

    const factorTiempo = dt * 60;
    jugador.x += jugador.velocidadX * factorTiempo;
    jugador.y += jugador.velocidadY * factorTiempo;

    if (jugador.esAnimando) {
      jugador.cuadroAnimacion += 0.12; // Animación un poco más lenta bajo el agua
    }

    // --- Ángulo de nado: rota suavemente según dirección ---
    // ±75° al nadar lateralmente, 180° al nadar hacia abajo, 0° al estar quieto o subiendo
    // Diagonales: abajo+izquierda = +90° (giro horario), abajo+derecha = -90°
    const moviIzq = entrada.estaPresionada('izquierda');
    const moviDer = entrada.estaPresionada('derecha');
    const moviAbajo = entrada.estaPresionada('abajo');
    const moviArriba = entrada.estaPresionada('arriba');
    let anguloObjetivo = 0;
    if (moviAbajo && moviIzq) {
      anguloObjetivo = Math.PI * 0.5; // 90° horario (abajo + izquierda)
    } else if (moviAbajo && moviDer) {
      anguloObjetivo = -Math.PI * 0.5; // 90° antihorario (abajo + derecha)
    } else if (moviIzq || moviDer) {
      anguloObjetivo = moviIzq ? -Math.PI * 0.42 : Math.PI * 0.42;
    } else if (moviAbajo) {
      anguloObjetivo = Math.PI; // 180° — cabeza hacia abajo
    } else if (moviArriba && moviIzq) {
      anguloObjetivo = -Math.PI * 0.25; // Diagonal arriba-izquierda
    } else if (moviArriba && moviDer) {
      anguloObjetivo = Math.PI * 0.25; // Diagonal arriba-derecha
    }
    // Lerp suave (8× dt para transición rápida pero no instantánea)
    this._anguloNado += (anguloObjetivo - this._anguloNado) * Math.min(1, 8 * dt);

    // --- Bordes del nivel ---
    jugador.x = Math.max(0, Math.min(this.anchoNivel - jugador.ancho, jugador.x));
    jugador.y = Math.max(0, Math.min(this.altoNivel - jugador.alto, jugador.y));

    // --- Transición al Santuario del Manatí (borde derecho) ---
    if (jugador.x >= this.anchoNivel - jugador.ancho - 5) {
      if (this.juego && this.juego.cambiarEscena) {
        this.juego.cambiarEscena('santuarioManati');
        // Mensaje en dos partes: dejamos el equipo pesado para nadar a pulmón
        const textos = this._obtenerTextos();
        const t = textos?.dialogos?.acuatico;
        if (this.juego.mostrarToast) {
          this.juego.mostrarToast(
            t?.transicionSantuario1 || '🤿 Dejamos los tanques de oxígeno y el equipo de buceo.'
          , 4);
          setTimeout(() => {
            this.juego.mostrarToast(
              t?.transicionSantuario2 || '🫁 Nadamos a pulmón con snorkel entre los corales, sin tocarlos...'
            , 5);
          }, 4000);
        }
      }
      return;
    }

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

    // --- Tortuga carey: nada en un circuito ovalado ---
    const tortuga = this.npcs.find(n => n.id === 'tortugaCarey');
    if (tortuga && tortuga.centroX !== undefined) {
      const prevTortX = tortuga.x;
      tortuga.fase += dt * 0.4; // Velocidad de nado lenta y elegante
      tortuga.x = tortuga.centroX + Math.cos(tortuga.fase) * tortuga.radioX;
      tortuga.y = tortuga.centroY + Math.sin(tortuga.fase) * tortuga.radioY;
      // Dirección: la tortuga mira hacia donde nada
      if (Math.abs(tortuga.x - prevTortX) > 0.01) {
        tortuga.mirandoDerecha = tortuga.x > prevTortX;
      }
    }

    // --- Tinglar: nada en circuito amplio (es la más grande y viajera) ---
    const tinglar = this.npcs.find(n => n.id === 'tortugaTinglar');
    if (tinglar && tinglar.centroX !== undefined) {
      const prevTingX = tinglar.x;
      tinglar.fase += dt * 0.25; // Más lenta — majestuosa
      tinglar.x = tinglar.centroX + Math.cos(tinglar.fase) * tinglar.radioX;
      tinglar.y = tinglar.centroY + Math.sin(tinglar.fase) * tinglar.radioY;
      if (Math.abs(tinglar.x - prevTingX) > 0.01) {
        tinglar.mirandoDerecha = tinglar.x > prevTingX;
      }
    }

    // --- Caguama: nada cerca del fondo buscando crustáceos ---
    const caguama = this.npcs.find(n => n.id === 'tortugaCaguama');
    if (caguama && caguama.centroX !== undefined) {
      const prevCagX = caguama.x;
      caguama.fase += dt * 0.35;
      caguama.x = caguama.centroX + Math.cos(caguama.fase) * caguama.radioX;
      caguama.y = caguama.centroY + Math.sin(caguama.fase) * caguama.radioY;
      if (Math.abs(caguama.x - prevCagX) > 0.01) {
        caguama.mirandoDerecha = caguama.x > prevCagX;
      }
    }

    // --- Pez león: patrulla territorial errática ---
    const pezLeon = this.npcs.find(n => n.id === 'pezLeon');
    if (pezLeon && pezLeon.centroX !== undefined && !this.combateTerminado) {
      const prevPezX = pezLeon.x;
      pezLeon.fase += dt * 0.6; // Más rápido y nervioso que las tortugas
      // Movimiento en forma de 8 (Lissajous) — errático y territorial
      pezLeon.x = pezLeon.centroX + Math.sin(pezLeon.fase) * pezLeon.radioX;
      pezLeon.y = pezLeon.centroY + Math.sin(pezLeon.fase * 2) * pezLeon.radioY;
      if (Math.abs(pezLeon.x - prevPezX) > 0.01) {
        pezLeon.mirandoDerecha = pezLeon.x > prevPezX;
      }
    }

    // --- Medusas: movimiento y colisión ---
    for (const medusa of this.medusas) {
      // Movimiento sinusoidal entre puntoA y puntoB
      const t = (Math.sin(this.tiempoTotal * 0.5 + medusa.fase) + 1) / 2;
      medusa.x = medusa.puntoA.x + (medusa.puntoB.x - medusa.puntoA.x) * t;
      medusa.y = medusa.puntoA.y + (medusa.puntoB.y - medusa.puntoA.y) * t;

      // Colisión con el jugador
      if (this.invulnerabilidad <= 0) {
        const dx = (jugador.x + jugador.ancho / 2) - medusa.x;
        const dy = (jugador.y + jugador.alto / 2) - medusa.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < medusa.radio + 15) {
          // ¡Picadura! Daño + lentitud + sacudida
          jugador.vida = Math.max(0, jugador.vida - 5);
          this.efectoLentitud = 2.0; // 2 segundos de lentitud
          this.invulnerabilidad = 1.5; // 1.5s de invulnerabilidad
          this._sacudida = 0.4; // Sacudida breve por picadura
          this.sfx.dano();

          if (this.juego && this.juego.mostrarToast) {
            const textos = this._obtenerTextos();
            this.juego.mostrarToast(
              textos?.dialogos?.acuatico?.medusaPicadura
              || '🪼 ¡Picadura de medusa! Movimiento reducido'
            );
          }
        }
      }
    }

    // --- Actualizar burbujas ---
    for (const burbuja of this.burbujas) {
      burbuja.y -= burbuja.velocidad * dt * 60;
      burbuja.x += Math.sin(this.tiempoTotal * 2 + burbuja.fase) * 0.3;
      // Reiniciar cuando sale de pantalla
      if (burbuja.y < -10) {
        Object.assign(burbuja, this._crearBurbuja());
        burbuja.y = this.altoNivel + 10;
      }
    }

    // --- Actualizar ballenas jorobadas (sombras lejanas) ---
    if (this._cooldownCantoballena > 0) this._cooldownCantoballena -= dt;
    for (let i = this.ballenasJorobadas.length - 1; i >= 0; i--) {
      const b = this.ballenasJorobadas[i];
      b.x += b.vx * dt * 60;
      b.y += Math.sin(this.tiempoTotal * b.frecuenciaY + b.fase) * 0.15;
      b.vida -= dt;
      if (b.vida <= 0 || b.x < -200 || b.x > this.anchoNivel + 200) {
        this.ballenasJorobadas.splice(i, 1);
      }
    }
    // Respawnear ballenas — permite hasta 2 simultáneas
    if (this.ballenasJorobadas.length < 2 && Math.random() < 0.025) {
      this._spawnBallena();
      // Canto + mensaje (cooldown de 20s para no repetir seguido)
      if (this._cooldownCantoballena <= 0) {
        this._cooldownCantoballena = 12;
        // La ballena se hace más visible al cantar
        const bNueva = this.ballenasJorobadas[this.ballenasJorobadas.length - 1];
        if (bNueva) bNueva._cantando = true;
        this.sfx.cantoBallenaCerca();
        if (this.juego && this.juego.mostrarToast) {
          const textos = this._obtenerTextos();
          this.juego.mostrarToast(
            textos?.dialogos?.acuatico?.cantoBallenaCerca
            || '🐋 ¡Escuchas el canto de una ballena jorobada a lo lejos!'
          , 4);
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
            color: '#B87333',
            esUsable: false
          });
        }

        if (this.juego && this.juego.mostrarToast) {
          this.juego.mostrarToast(`⚓ ${nombreObjeto} — ${textos?.ui?.itemAnadido || 'ítem añadido al inventario'}`);
        }
      }
    }

    // --- Verificar misión ---
    // El pez león no cuenta (es combate), los demás 3 sí
    this.npcsHablados = this.npcs.filter(n => n.dialogoHecho && n.id !== 'pezLeon').length;
    if (this.npcsHablados >= this.totalNPCs && this.combateTerminado) {
      const textos = this._obtenerTextos();
      this.misionActual = textos?.dialogos?.acuatico?.misionCompleta
        || '¡Naufragio explorado! Vuelve al mapa (M)';

      if (this.juego && this.juego.progreso) {
        if (!this.juego.progreso.nodosCompletados.includes(5)) {
          this.juego.progreso.nodosCompletados.push(5);
        }
        // Desbloquear el Mundo Jurídico (nodo 6)
        if (!this.juego.progreso.nodosDesbloqueados.includes(6)) {
          this.juego.progreso.nodosDesbloqueados.push(6);
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
    // CAPA 1: Fondo — degradado azul profundo
    // =========================================================
    const gradiente = ctx.createLinearGradient(0, 0, 0, alto);
    gradiente.addColorStop(0, '#0a1a3a'); // Azul muy oscuro (arriba = profundidad)
    gradiente.addColorStop(0.5, '#143050');
    gradiente.addColorStop(1, '#1a3a5a'); // Azul un poco más claro (abajo)
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, ancho, alto);

    // =========================================================
    // CAPA 2: Fondo arenoso del océano (parte inferior)
    // =========================================================
    const yArena = alto * 0.75;
    const gradienteArena = ctx.createLinearGradient(0, yArena, 0, alto);
    gradienteArena.addColorStop(0, 'rgba(180, 160, 120, 0.08)');
    gradienteArena.addColorStop(1, 'rgba(180, 160, 120, 0.2)');
    ctx.fillStyle = gradienteArena;
    ctx.fillRect(0, yArena, ancho, alto - yArena);

    // Textura de arena (puntos sutiles)
    ctx.fillStyle = 'rgba(200, 180, 140, 0.06)';
    for (let gx = -1; gx < ancho / 40 + 1; gx++) {
      for (let gy = Math.floor(yArena / 40); gy < alto / 40 + 1; gy++) {
        const px = gx * 40 + (offsetX % 40);
        const py = gy * 40 + (offsetY % 40);
        ctx.fillRect(px + 5, py + 5, 20, 20);
      }
    }

    // =========================================================
    // CAPA 2b: Sombras de ballenas jorobadas (fondo lejano)
    // =========================================================
    // Siluetas oscuras que cruzan lentamente como si nadaran
    // en aguas profundas debajo del jugador. Adaptado del
    // proyecto cary (Phaser 3 → Canvas2D).
    for (const ballena of this.ballenasJorobadas) {
      this._dibujarBallenaJorobada(ctx, ballena, offsetX, offsetY);
    }

    // =========================================================
    // CAPA 3: Algas marinas (se balancean con la corriente)
    // =========================================================
    for (const alga of this.algas) {
      const ax = alga.x + offsetX;
      const ay = alga.y + offsetY;
      const balanceo = Math.sin(this.tiempoTotal * 1.5 + alga.fase) * 8;

      ctx.strokeStyle = alga.color;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';

      // Cada alga es una curva que se balancea
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.quadraticCurveTo(
        ax + balanceo, ay - alga.altura * 0.6,
        ax + balanceo * 0.5, ay - alga.altura
      );
      ctx.stroke();

      // Hojas laterales
      ctx.lineWidth = 2;
      for (let h = 0.3; h < 0.9; h += 0.3) {
        const hx = ax + balanceo * h;
        const hy = ay - alga.altura * h;
        const lado = h > 0.5 ? 1 : -1;
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.quadraticCurveTo(
          hx + lado * 10 + balanceo * 0.3, hy - 5,
          hx + lado * 15, hy + 3
        );
        ctx.stroke();
      }
    }

    // =========================================================
    // CAPA 4: Estructuras del naufragio
    // =========================================================
    for (const est of this.estructuras) {
      this._dibujarEstructura(ctx, est.x + offsetX, est.y + offsetY, est);
    }

    // =========================================================
    // CAPA 4b: Arco de coral indicando salida al Santuario →
    // =========================================================
    const arcoX = this.anchoNivel - 30 + offsetX;
    const arcoY = 440 + offsetY;
    // Columnas de coral
    ctx.fillStyle = '#8a5040';
    ctx.fillRect(arcoX, arcoY, 15, 80);
    ctx.fillRect(arcoX, arcoY + 140, 15, 80);
    // Arco
    ctx.strokeStyle = '#8a5040';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(arcoX + 7, arcoY + 110, 70, -Math.PI / 2, Math.PI / 2, true);
    ctx.stroke();
    // Flecha >>>
    const flechaParpadeo = 0.3 + Math.sin(this.tiempoTotal * 3) * 0.3;
    ctx.font = 'bold 14px monospace';
    ctx.fillStyle = `rgba(255, 215, 0, ${flechaParpadeo})`;
    ctx.textAlign = 'center';
    ctx.fillText('>>>', arcoX + 7, arcoY + 115);
    ctx.font = '8px monospace';
    ctx.fillStyle = `rgba(200, 220, 255, ${flechaParpadeo})`;
    const _t = this._obtenerTextos();
    ctx.fillText(_t?.ui?.santuario || 'Santuario', arcoX + 7, arcoY + 130);
    ctx.textAlign = 'left';

    // =========================================================
    // CAPA 5: Objetos coleccionables
    // =========================================================
    for (const obj of this.objetos) {
      if (obj.recogido) continue;
      if (obj.requiereCombate && !this.combateTerminado) continue;
      const ox = obj.x + offsetX;
      const oy = obj.y + offsetY;

      // Brillo pulsante
      const brillo = 0.5 + Math.sin(this.tiempoTotal * 3) * 0.3;
      ctx.fillStyle = `rgba(184, 115, 51, ${brillo})`;
      ctx.beginPath();
      ctx.arc(ox + 8, oy + 8, 12, 0, Math.PI * 2);
      ctx.fill();

      // Clavo de bronce
      ctx.fillStyle = '#B87333';
      ctx.fillRect(ox + 3, oy + 4, 4, 10);
      ctx.fillRect(ox + 1, oy + 3, 8, 3);
    }

    // =========================================================
    // CAPA 5b: NPCs (depth-sorted con el jugador)
    // =========================================================
    // Reunir todo lo que necesita depth-sort
    const entidades = [];

    for (const npc of this.npcs) {
      // Si el pez león fue derrotado, no dibujarlo más como NPC activo
      if (npc.id === 'pezLeon' && this.combateTerminado) continue;
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
    // CAPA 6: Medusas (semi-transparentes, encima de todo)
    // =========================================================
    for (const medusa of this.medusas) {
      this._dibujarMedusa(ctx, medusa, offsetX, offsetY);
    }

    // =========================================================
    // CAPA 7: Burbujas (partículas decorativas)
    // =========================================================
    for (const burbuja of this.burbujas) {
      const bx = burbuja.x + offsetX;
      const by = burbuja.y + offsetY;
      ctx.fillStyle = `rgba(200, 220, 255, ${burbuja.opacidad})`;
      ctx.beginPath();
      ctx.arc(bx, by, burbuja.radio, 0, Math.PI * 2);
      ctx.fill();
      // Reflejo dentro de la burbuja
      ctx.fillStyle = `rgba(255, 255, 255, ${burbuja.opacidad * 0.5})`;
      ctx.beginPath();
      ctx.arc(bx - 1, by - 1, burbuja.radio * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // =========================================================
    // CAPA 8: Tinte de agua (overlay azul semitransparente)
    // =========================================================
    ctx.fillStyle = 'rgba(20, 60, 120, 0.15)';
    ctx.fillRect(0, 0, ancho, alto);

    // =========================================================
    // CAPA 9: Rayos de luz (shafts diagonales desde la superficie)
    // =========================================================
    for (let r = 0; r < 4; r++) {
      const rx = 150 + r * 250;
      const balanceo = Math.sin(this.tiempoTotal * 0.3 + r * 1.5) * 30;
      const opacidad = 0.04 + Math.sin(this.tiempoTotal * 0.5 + r) * 0.02;

      ctx.fillStyle = `rgba(180, 220, 255, ${opacidad})`;
      ctx.beginPath();
      ctx.moveTo(rx + balanceo, 0);
      ctx.lineTo(rx + balanceo + 40, 0);
      ctx.lineTo(rx + balanceo + 120, alto);
      ctx.lineTo(rx + balanceo + 60, alto);
      ctx.closePath();
      ctx.fill();
    }

    // =========================================================
    // CAPA 10: HUD (vida, misión, controles)
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

    // Objetos recogidos
    const objRecogidos = this.objetos.filter(o => o.recogido).length;
    renderizador.dibujarTexto(`📦 ${objRecogidos}/${this.objetos.length}`, 15, 58, {
      tamano: 11, color: objRecogidos >= this.objetos.length ? '#44CC44' : '#FFD700'
    });

    // Regalos de NPCs (Arqueóloga Submarina da mapa de naufragios)
    const arqueologa = this.npcs.find(n => n.id === 'arqueologa');
    const regalosRecibidos = arqueologa?.dialogoHecho ? 1 : 0;
    const totalRegalos = 1;
    renderizador.dibujarTexto(`🎁 ${regalosRecibidos}/${totalRegalos}`, 15, 74, {
      tamano: 11, color: regalosRecibidos >= totalRegalos ? '#44CC44' : '#FFD700'
    });

    // Misión actual
    renderizador.dibujarTexto(this.misionActual, ancho - 10, 20, {
      tamano: 12, color: '#CCCCCC', alineacion: 'right'
    });

    // Indicador de lentitud por medusa
    if (this.efectoLentitud > 0) {
      renderizador.dibujarTexto('🪼 ¡Lentitud!', 15, 90, {
        tamano: 10, color: '#CC77FF'
      });
    }

    // --- Diálogo ---
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto, textos);
    }

    // --- Controles ---
    if (!this.dialogos.estaActivo()) {
      const texControles = this._obtenerTextos()?.ui?.controlesNadar || 'WASD: nadar | E: hablar | I: inventario | M: mapa | P: fotos | L: misiones';
      renderizador.dibujarTexto(texControles, ancho / 2, alto - 10, {
        tamano: 10, color: 'rgba(150, 180, 200, 0.6)', alineacion: 'center'
      });
    }
  }

  // ============================================================
  // DIBUJO DE ELEMENTOS
  // ============================================================

  // --- Dibujar estructura del naufragio ---
  _dibujarEstructura(ctx, x, y, est) {
    const a = est.ancho;
    const h = est.alto;

    if (est.tipo === 'cascoGrande') {
      // Casco principal de la Santa María — madera oscura cubierta de algas
      ctx.fillStyle = '#4a3520';
      ctx.fillRect(x, y, a, h);

      // Tablas de madera
      ctx.strokeStyle = '#3a2510';
      ctx.lineWidth = 1;
      for (let i = 0; i < h; i += 12) {
        ctx.beginPath();
        ctx.moveTo(x, y + i);
        ctx.lineTo(x + a, y + i);
        ctx.stroke();
      }

      // Algas marinas creciendo sobre el casco
      ctx.fillStyle = '#2a6a30';
      for (let i = 0; i < a; i += 20) {
        ctx.beginPath();
        ctx.ellipse(x + i + 10, y - 3, 6, 4, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Agujero en el casco (daño del naufragio)
      ctx.fillStyle = '#1a0a00';
      ctx.beginPath();
      ctx.ellipse(x + a * 0.6, y + h * 0.4, 15, 10, 0.2, 0, Math.PI * 2);
      ctx.fill();

    } else if (est.tipo === 'cascoPequeno') {
      // Fragmento más pequeño del casco
      ctx.fillStyle = '#3a2a18';
      ctx.fillRect(x, y, a, h);
      ctx.strokeStyle = '#2a1a0a';
      ctx.lineWidth = 1;
      for (let i = 0; i < h; i += 10) {
        ctx.beginPath();
        ctx.moveTo(x, y + i);
        ctx.lineTo(x + a, y + i);
        ctx.stroke();
      }
      // Coral creciendo
      ctx.fillStyle = '#cc6666';
      ctx.beginPath();
      ctx.arc(x + a * 0.3, y - 5, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff9966';
      ctx.beginPath();
      ctx.arc(x + a * 0.7, y - 3, 6, 0, Math.PI * 2);
      ctx.fill();

    } else if (est.tipo === 'mastil') {
      // Mástil roto — viga vertical
      ctx.fillStyle = '#5a4a30';
      ctx.fillRect(x, y, a, h);
      // Grietas
      ctx.strokeStyle = '#3a2a18';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + a / 2, y + 20);
      ctx.lineTo(x + a / 2 - 5, y + 50);
      ctx.lineTo(x + a / 2 + 3, y + 80);
      ctx.stroke();
      // Restos de cuerda
      ctx.strokeStyle = '#8a7a5a';
      ctx.lineWidth = 1;
      const balanceo = Math.sin(this.tiempoTotal + 1) * 5;
      ctx.beginPath();
      ctx.moveTo(x + a, y + 20);
      ctx.quadraticCurveTo(x + a + 15 + balanceo, y + 40, x + a + 5, y + 60);
      ctx.stroke();

    } else if (est.tipo === 'ancla') {
      // Ancla de hierro oxidado
      ctx.fillStyle = '#6a5a4a';
      // Vástago
      ctx.fillRect(x + a / 2 - 4, y, 8, h);
      // Anillo superior
      ctx.strokeStyle = '#6a5a4a';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(x + a / 2, y - 8, 8, 0, Math.PI * 2);
      ctx.stroke();
      // Brazos curvos
      ctx.beginPath();
      ctx.moveTo(x, y + h);
      ctx.quadraticCurveTo(x + a / 2, y + h + 15, x + a, y + h);
      ctx.stroke();
      // Puntas
      ctx.fillStyle = '#5a4a3a';
      ctx.beginPath();
      ctx.moveTo(x, y + h);
      ctx.lineTo(x - 5, y + h + 8);
      ctx.lineTo(x + 5, y + h);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + a, y + h);
      ctx.lineTo(x + a + 5, y + h + 8);
      ctx.lineTo(x + a - 5, y + h);
      ctx.closePath();
      ctx.fill();

    } else if (est.tipo === 'arrecife') {
      // Arrecife de coral — formaciones realistas con distintos tipos
      // de coral caribeño: cerebro, cuerno de ciervo, abanico y esponjas

      // --- Base rocosa irregular ---
      ctx.fillStyle = '#6b4535';
      ctx.beginPath();
      ctx.moveTo(x + 5, y + h);
      ctx.lineTo(x - 3, y + h * 0.7);
      ctx.lineTo(x + 8, y + h * 0.4);
      ctx.lineTo(x + a * 0.3, y + 5);
      ctx.lineTo(x + a * 0.5, y);
      ctx.lineTo(x + a * 0.7, y + 8);
      ctx.lineTo(x + a - 5, y + h * 0.35);
      ctx.lineTo(x + a + 3, y + h * 0.6);
      ctx.lineTo(x + a - 2, y + h);
      ctx.closePath();
      ctx.fill();

      // Textura de la roca (manchas más claras)
      ctx.fillStyle = '#7d5a48';
      ctx.beginPath();
      ctx.ellipse(x + a * 0.3, y + h * 0.6, 12, 8, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x + a * 0.7, y + h * 0.5, 10, 6, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // --- Coral cerebro (brain coral) — hemisferio 3D con surcos meándricos ---
      const cerebroX = x + 20;
      const cerebroY = y + h * 0.45;
      const cRx = 14, cRy = 11;
      // Base con gradiente para volumen 3D
      const gCerebro = ctx.createRadialGradient(
        cerebroX - 3, cerebroY - 3, 1,
        cerebroX, cerebroY, cRx
      );
      gCerebro.addColorStop(0, '#D8B08A');
      gCerebro.addColorStop(0.5, '#C4956A');
      gCerebro.addColorStop(1, '#8A6540');
      ctx.fillStyle = gCerebro;
      ctx.beginPath();
      ctx.ellipse(cerebroX, cerebroY, cRx, cRy, 0, 0, Math.PI * 2);
      ctx.fill();
      // Surcos meándricos — curvas sinuosas que serpentean como un cerebro real
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cerebroX, cerebroY, cRx - 1, cRy - 1, 0, 0, Math.PI * 2);
      ctx.clip();
      ctx.strokeStyle = '#7A5535';
      ctx.lineWidth = 1.8;
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath();
        const sy = cerebroY + i * 3.2;
        const zigzag = i % 2 === 0 ? 1 : -1;
        ctx.moveTo(cerebroX - 14, sy);
        // Múltiples ondulaciones por surco para efecto meándrico
        ctx.bezierCurveTo(
          cerebroX - 9, sy + zigzag * 3.5,
          cerebroX - 4, sy - zigzag * 2.5,
          cerebroX, sy + zigzag * 1.5
        );
        ctx.bezierCurveTo(
          cerebroX + 4, sy + zigzag * 4,
          cerebroX + 9, sy - zigzag * 2,
          cerebroX + 14, sy + zigzag * 1
        );
        ctx.stroke();
      }
      // Valles entre surcos (líneas más finas entre las principales)
      ctx.strokeStyle = 'rgba(100, 65, 40, 0.4)';
      ctx.lineWidth = 0.6;
      for (let i = -3; i <= 2; i++) {
        ctx.beginPath();
        const sy = cerebroY + i * 3.2 + 1.6;
        ctx.moveTo(cerebroX - 12, sy);
        ctx.bezierCurveTo(
          cerebroX - 5, sy - 2, cerebroX + 5, sy + 2, cerebroX + 12, sy
        );
        ctx.stroke();
      }
      ctx.restore();
      // Brillo húmedo (reflejo especular)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.ellipse(cerebroX - 4, cerebroY - 4, 5, 2.5, -0.4, 0, Math.PI * 2);
      ctx.fill();
      // Sombra sutil debajo
      ctx.fillStyle = 'rgba(60, 30, 10, 0.15)';
      ctx.beginPath();
      ctx.ellipse(cerebroX + 1, cerebroY + cRy - 1, cRx * 0.8, 2, 0, 0, Math.PI);
      ctx.fill();

      // --- Coral cuerno de ciervo (staghorn) — ramas hacia arriba ---
      const ciervoX = x + a * 0.55;
      const ciervoY = y + h * 0.3;
      ctx.strokeStyle = '#e8a060';
      ctx.lineCap = 'round';
      // Ramas principales
      const ramas = [
        [0, 0, -8, -22], [0, 0, 5, -25], [0, 0, 14, -18],
        [-8, -22, -15, -32], [-8, -22, -3, -35],
        [5, -25, 2, -38], [5, -25, 12, -34],
        [14, -18, 20, -28], [14, -18, 10, -30]
      ];
      // Ramas gruesas primero
      ctx.lineWidth = 3;
      for (let i = 0; i < 3; i++) {
        const r = ramas[i];
        ctx.beginPath();
        ctx.moveTo(ciervoX + r[0], ciervoY + r[1]);
        ctx.lineTo(ciervoX + r[2], ciervoY + r[3]);
        ctx.stroke();
      }
      // Ramas finas después
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#f0b878';
      for (let i = 3; i < ramas.length; i++) {
        const r = ramas[i];
        ctx.beginPath();
        ctx.moveTo(ciervoX + r[0], ciervoY + r[1]);
        ctx.lineTo(ciervoX + r[2], ciervoY + r[3]);
        ctx.stroke();
      }
      // Puntas blancas (zona de crecimiento)
      ctx.fillStyle = '#f8e0c8';
      for (let i = 3; i < ramas.length; i++) {
        ctx.beginPath();
        ctx.arc(ciervoX + ramas[i][2], ciervoY + ramas[i][3], 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Coral abanico (gorgonia) — abanico con red de venación ---
      const abanicoX = x + a * 0.82;
      const abanicoY = y + h * 0.35;
      // Tallo leñoso con textura
      ctx.strokeStyle = '#6A3040';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(abanicoX, abanicoY + 14);
      ctx.quadraticCurveTo(abanicoX - 1, abanicoY + 6, abanicoX, abanicoY);
      ctx.stroke();
      ctx.strokeStyle = '#8A4858';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(abanicoX + 0.5, abanicoY + 12);
      ctx.lineTo(abanicoX + 0.5, abanicoY + 2);
      ctx.stroke();
      // Forma del abanico con gradiente
      const gAbanico = ctx.createRadialGradient(
        abanicoX, abanicoY - 8, 2,
        abanicoX, abanicoY - 6, 22
      );
      gAbanico.addColorStop(0, 'rgba(220, 100, 160, 0.7)');
      gAbanico.addColorStop(0.6, 'rgba(190, 70, 130, 0.5)');
      gAbanico.addColorStop(1, 'rgba(160, 50, 110, 0.15)');
      ctx.fillStyle = gAbanico;
      ctx.beginPath();
      ctx.moveTo(abanicoX, abanicoY);
      ctx.bezierCurveTo(
        abanicoX - 18, abanicoY - 6,
        abanicoX - 16, abanicoY - 30,
        abanicoX, abanicoY - 26
      );
      ctx.bezierCurveTo(
        abanicoX + 16, abanicoY - 30,
        abanicoX + 18, abanicoY - 6,
        abanicoX, abanicoY
      );
      ctx.fill();
      // Vena central (más gruesa)
      ctx.strokeStyle = 'rgba(180, 70, 120, 0.6)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(abanicoX, abanicoY);
      ctx.lineTo(abanicoX, abanicoY - 24);
      ctx.stroke();
      // Venas radiales principales (bifurcadas)
      ctx.strokeStyle = 'rgba(170, 65, 115, 0.5)';
      ctx.lineWidth = 0.8;
      const venasAng = [-0.55, -0.35, -0.15, 0.15, 0.35, 0.55];
      for (const ang of venasAng) {
        const largo = 18 + Math.abs(ang) * -6;
        const vx = abanicoX + Math.sin(ang) * largo;
        const vy = abanicoY - Math.cos(ang) * largo;
        ctx.beginPath();
        ctx.moveTo(abanicoX, abanicoY - 2);
        ctx.quadraticCurveTo(
          abanicoX + Math.sin(ang) * largo * 0.5,
          abanicoY - Math.cos(ang) * largo * 0.6,
          vx, vy
        );
        ctx.stroke();
        // Sub-venas (ramas secundarias)
        ctx.strokeStyle = 'rgba(160, 60, 110, 0.3)';
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(
          abanicoX + Math.sin(ang) * largo * 0.5,
          abanicoY - Math.cos(ang) * largo * 0.5
        );
        ctx.lineTo(vx + Math.sin(ang + 0.3) * 4, vy - 3);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(170, 65, 115, 0.5)';
        ctx.lineWidth = 0.8;
      }
      // Malla de interconexión (las venas se conectan entre sí como una red)
      ctx.strokeStyle = 'rgba(150, 55, 100, 0.2)';
      ctx.lineWidth = 0.3;
      for (let r = 6; r <= 18; r += 6) {
        ctx.beginPath();
        ctx.arc(abanicoX, abanicoY, r, -Math.PI * 0.85, -Math.PI * 0.15);
        ctx.stroke();
      }

      // --- Esponjas tubulares (tube sponges) — cilindros verticales ---
      const esponjasPos = [
        [x + a * 0.38, y + h * 0.55, 12, '#8855cc'],
        [x + a * 0.42, y + h * 0.48, 16, '#7744bb'],
        [x + a * 0.35, y + h * 0.6, 9, '#9966dd']
      ];
      for (const [ex, ey, eh, ec] of esponjasPos) {
        // Tubo exterior
        ctx.fillStyle = ec;
        ctx.fillRect(ex - 3, ey - eh, 6, eh);
        // Bordes redondeados
        ctx.beginPath();
        ctx.ellipse(ex, ey - eh, 3, 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        // Apertura oscura en la punta
        ctx.fillStyle = '#3a2266';
        ctx.beginPath();
        ctx.ellipse(ex, ey - eh, 2, 1, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Pequeños corales de fuego (fire coral) — manchas amarillas ---
      ctx.fillStyle = '#ddaa30';
      const fuegosPos = [[x + 10, y + h * 0.7], [x + a - 15, y + h * 0.65], [x + a * 0.5, y + h * 0.75]];
      for (const [fx, fy] of fuegosPos) {
        ctx.beginPath();
        ctx.arc(fx, fy, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#eebb44';
        ctx.beginPath();
        ctx.arc(fx + 2, fy - 2, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ddaa30';
      }

      // --- Algas y hierbas marinas en la base ---
      ctx.strokeStyle = '#3a8844';
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      const t = this.tiempoTotal || 0;
      const algasPos = [
        [x + 5, y + h - 2], [x + 18, y + h], [x + a - 20, y + h - 3],
        [x + a - 8, y + h - 1], [x + a * 0.5, y + h]
      ];
      for (let i = 0; i < algasPos.length; i++) {
        const [ax2, ay2] = algasPos[i];
        const ondulacion = Math.sin(t * 1.5 + i * 2) * 3;
        ctx.beginPath();
        ctx.moveTo(ax2, ay2);
        ctx.quadraticCurveTo(ax2 + ondulacion, ay2 - 10, ax2 + ondulacion * 0.5, ay2 - 18);
        ctx.stroke();
      }

    } else if (est.tipo === 'canoa') {
      // Canoa del pescador — madera clara
      ctx.fillStyle = '#8a7040';
      ctx.beginPath();
      ctx.ellipse(x + a / 2, y + h / 2, a / 2, h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Interior
      ctx.fillStyle = '#a08850';
      ctx.beginPath();
      ctx.ellipse(x + a / 2, y + h / 2, a / 2 - 5, h / 2 - 5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Remo
      ctx.fillStyle = '#6a5a3a';
      ctx.fillRect(x + a - 5, y - 10, 3, h + 20);
    }

    // Nombre de la estructura
    ctx.font = '9px monospace';
    ctx.fillStyle = 'rgba(200, 220, 255, 0.5)';
    ctx.textAlign = 'center';
    ctx.fillText(est.nombre, x + a / 2, y + h + 15);
    ctx.textAlign = 'left';
  }

  // --- Dibujar medusa ---
  _dibujarMedusa(ctx, medusa, offsetX, offsetY) {
    const mx = medusa.x + offsetX;
    const my = medusa.y + offsetY;
    const pulso = 1 + Math.sin(this.tiempoTotal * 3 + medusa.fase) * 0.15;
    const r = medusa.radio * pulso;

    // Campana (semi-transparente)
    ctx.fillStyle = 'rgba(180, 140, 220, 0.4)';
    ctx.beginPath();
    ctx.arc(mx, my, r, Math.PI, 0);
    ctx.closePath();
    ctx.fill();

    // Borde brillante de la campana
    ctx.strokeStyle = 'rgba(220, 180, 255, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(mx, my, r, Math.PI, 0);
    ctx.stroke();

    // Centro luminoso
    ctx.fillStyle = 'rgba(255, 200, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(mx, my - r * 0.2, r * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Tentáculos ondulantes
    ctx.strokeStyle = 'rgba(180, 140, 220, 0.35)';
    ctx.lineWidth = 1.5;
    for (let t = -2; t <= 2; t++) {
      const tx = mx + t * (r * 0.35);
      ctx.beginPath();
      ctx.moveTo(tx, my);
      const ondulacion = Math.sin(this.tiempoTotal * 2 + t + medusa.fase) * 5;
      ctx.quadraticCurveTo(
        tx + ondulacion, my + r * 1.2,
        tx + ondulacion * 0.5, my + r * 2
      );
      ctx.stroke();
    }

    // Indicador de peligro si está cerca
    ctx.font = '10px monospace';
    ctx.fillStyle = 'rgba(255, 100, 100, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText('⚠', mx, my - r - 8);
    ctx.textAlign = 'left';
  }

  // --- Dibujar NPC ---
  _dibujarNPC(ctx, npc, offsetX, offsetY, jugador) {
    const nx = npc.x + offsetX;
    const ny = npc.y + offsetY;

    if (npc.id === 'pescador') {
      // Pescador Manuel — humano con equipo de buceo
      // Cuerpo con traje de neopreno
      ctx.fillStyle = '#2a4a2a';
      ctx.fillRect(nx, ny, npc.ancho, npc.alto);

      // Cabeza
      ctx.fillStyle = '#D2956A';
      ctx.fillRect(nx + 4, ny - 10, 20, 12);

      // Máscara de buceo
      ctx.fillStyle = 'rgba(100, 200, 255, 0.5)';
      ctx.fillRect(nx + 6, ny - 8, 16, 8);
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 1;
      ctx.strokeRect(nx + 6, ny - 8, 16, 8);

      // Ojos detrás de la máscara
      ctx.fillStyle = '#000000';
      ctx.fillRect(nx + 10, ny - 5, 2, 2);
      ctx.fillRect(nx + 16, ny - 5, 2, 2);

      // Sombrero de pescador (gorra)
      ctx.fillStyle = '#5a8a4a';
      ctx.fillRect(nx + 2, ny - 14, 24, 5);

    } else if (npc.id === 'tortugaCarey') {
      // Tortuga carey — especie en peligro de extinción
      // Espejo horizontal: si nada a la izquierda, invertir sprite
      ctx.save();
      if (npc.mirandoDerecha === false) {
        ctx.translate(nx + npc.ancho / 2, ny + npc.alto / 2);
        ctx.scale(-1, 1);
        ctx.translate(-(nx + npc.ancho / 2), -(ny + npc.alto / 2));
      }

      // Caparazón
      ctx.fillStyle = '#6B8E23';
      ctx.beginPath();
      ctx.ellipse(nx + npc.ancho / 2, ny + npc.alto / 2, npc.ancho / 2, npc.alto / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Patrón del caparazón (rayas carey)
      ctx.strokeStyle = '#8B6914';
      ctx.lineWidth = 1;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(nx + npc.ancho / 2 + i * 5, ny + 3);
        ctx.lineTo(nx + npc.ancho / 2 + i * 5, ny + npc.alto - 3);
        ctx.stroke();
      }

      // Cabeza
      ctx.fillStyle = '#556B2F';
      ctx.beginPath();
      ctx.arc(nx + npc.ancho + 5, ny + npc.alto / 2, 6, 0, Math.PI * 2);
      ctx.fill();

      // Ojo
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(nx + npc.ancho + 7, ny + npc.alto / 2 - 1, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Aletas animadas — se mueven al nadar como remando
      ctx.fillStyle = '#556B2F';
      const aletaAng = Math.sin(this.tiempoTotal * 3 + (npc.fase || 0)) * 4;
      // Delanteras (las dos de arriba oscilan en fase opuesta)
      ctx.fillRect(nx + npc.ancho - 2, ny + 5 + aletaAng, 6, 4);
      ctx.fillRect(nx - 4, ny + 5 - aletaAng, 6, 4);
      // Traseras (oscilan opuesto a las delanteras)
      ctx.fillRect(nx + npc.ancho - 2, ny + npc.alto - 8 - aletaAng, 6, 4);
      ctx.fillRect(nx - 4, ny + npc.alto - 8 + aletaAng, 6, 4);

      ctx.restore();

    } else if (npc.id === 'tortugaTinglar') {
      // Tinglar (Dermochelys coriacea) — la tortuga marina más grande del mundo
      // Caparazón coriáceo sin escamas, color azul-negro oscuro con crestas longitudinales
      ctx.save();
      if (npc.mirandoDerecha === false) {
        ctx.translate(nx + npc.ancho / 2, ny + npc.alto / 2);
        ctx.scale(-1, 1);
        ctx.translate(-(nx + npc.ancho / 2), -(ny + npc.alto / 2));
      }

      // Caparazón (más grande que las otras especies)
      ctx.fillStyle = '#1a1a2e';
      ctx.beginPath();
      ctx.ellipse(nx + npc.ancho / 2, ny + npc.alto / 2, npc.ancho / 2, npc.alto / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Crestas longitudinales (7 crestas, característica del tinglar)
      ctx.strokeStyle = '#3d3d5c';
      ctx.lineWidth = 1.5;
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(nx + npc.ancho / 2 + i * 3, ny + 2);
        ctx.lineTo(nx + npc.ancho / 2 + i * 3, ny + npc.alto - 2);
        ctx.stroke();
      }

      // Manchas claras (el tinglar tiene puntos blancos dispersos)
      ctx.fillStyle = '#E8E8E8';
      for (let i = 0; i < 5; i++) {
        const px = nx + 6 + Math.sin(i * 2.3) * 10 + npc.ancho / 2;
        const py = ny + 5 + Math.cos(i * 1.7) * 8 + npc.alto / 4;
        ctx.beginPath();
        ctx.arc(px, py, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cabeza
      ctx.fillStyle = '#4a5568';
      ctx.beginPath();
      ctx.arc(nx + npc.ancho + 6, ny + npc.alto / 2, 7, 0, Math.PI * 2);
      ctx.fill();

      // Ojo
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(nx + npc.ancho + 9, ny + npc.alto / 2 - 1, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Aletas animadas — más grandes que las otras especies (1.3×)
      ctx.fillStyle = '#4a5568';
      const aletaTing = Math.sin(this.tiempoTotal * 3 + (npc.fase || 0)) * 5;
      ctx.fillRect(nx + npc.ancho - 2, ny + 4 + aletaTing, 8, 5);
      ctx.fillRect(nx - 6, ny + 4 - aletaTing, 8, 5);
      ctx.fillRect(nx + npc.ancho - 2, ny + npc.alto - 8 - aletaTing, 8, 5);
      ctx.fillRect(nx - 6, ny + npc.alto - 8 + aletaTing, 8, 5);

      ctx.restore();

    } else if (npc.id === 'tortugaCaguama') {
      // Caguama (Caretta caretta) — cabeza grande y mandíbulas poderosas
      // Caparazón marrón rojizo con marca central en forma de corazón
      ctx.save();
      if (npc.mirandoDerecha === false) {
        ctx.translate(nx + npc.ancho / 2, ny + npc.alto / 2);
        ctx.scale(-1, 1);
        ctx.translate(-(nx + npc.ancho / 2), -(ny + npc.alto / 2));
      }

      // Caparazón
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.ellipse(nx + npc.ancho / 2, ny + npc.alto / 2, npc.ancho / 2, npc.alto / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Marca en forma de corazón (característica visual de la caguama)
      ctx.strokeStyle = '#D2691E';
      ctx.lineWidth = 1.5;
      const cx = nx + npc.ancho / 2;
      const cy = ny + npc.alto / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy + 5);
      ctx.bezierCurveTo(cx - 7, cy - 2, cx - 7, cy - 7, cx, cy - 4);
      ctx.bezierCurveTo(cx + 7, cy - 7, cx + 7, cy - 2, cx, cy + 5);
      ctx.stroke();

      // Líneas del caparazón (cruz central)
      ctx.strokeStyle = '#5a3520';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(nx + 5, ny + npc.alto / 2);
      ctx.lineTo(nx + npc.ancho - 5, ny + npc.alto / 2);
      ctx.moveTo(nx + npc.ancho / 2, ny + 4);
      ctx.lineTo(nx + npc.ancho / 2, ny + npc.alto - 4);
      ctx.stroke();

      // Cabeza — 1.3× más grande (mandíbulas poderosas para triturar crustáceos)
      ctx.fillStyle = '#8B7355';
      ctx.beginPath();
      ctx.arc(nx + npc.ancho + 5, ny + npc.alto / 2, 8, 0, Math.PI * 2);
      ctx.fill();

      // Ojo
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(nx + npc.ancho + 8, ny + npc.alto / 2 - 1, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Aletas animadas
      ctx.fillStyle = '#8B7355';
      const aletaCag = Math.sin(this.tiempoTotal * 3 + (npc.fase || 0)) * 4;
      ctx.fillRect(nx + npc.ancho - 2, ny + 5 + aletaCag, 6, 4);
      ctx.fillRect(nx - 4, ny + 5 - aletaCag, 6, 4);
      ctx.fillRect(nx + npc.ancho - 2, ny + npc.alto - 8 - aletaCag, 6, 4);
      ctx.fillRect(nx - 4, ny + npc.alto - 8 + aletaCag, 6, 4);

      ctx.restore();

    } else if (npc.id === 'arqueologa') {
      // Arqueóloga submarina — traje de buceo con equipo
      ctx.fillStyle = '#3a5a8a';
      ctx.fillRect(nx, ny, npc.ancho, npc.alto);

      // Cabeza
      ctx.fillStyle = '#D2956A';
      ctx.fillRect(nx + 4, ny - 10, 20, 12);

      // Casco de buceo (escafandra ligera)
      ctx.fillStyle = 'rgba(150, 200, 240, 0.4)';
      ctx.beginPath();
      ctx.arc(nx + 14, ny - 4, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#555555';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(nx + 14, ny - 4, 12, 0, Math.PI * 2);
      ctx.stroke();

      // Ojos
      ctx.fillStyle = '#000000';
      ctx.fillRect(nx + 10, ny - 5, 2, 2);
      ctx.fillRect(nx + 16, ny - 5, 2, 2);

      // Tanque de oxígeno en la espalda
      ctx.fillStyle = '#666666';
      ctx.fillRect(nx - 6, ny + 2, 6, 18);
      ctx.fillStyle = '#888888';
      ctx.fillRect(nx - 5, ny, 4, 3);

      // Libreta impermeable
      ctx.fillStyle = '#EEEEAA';
      ctx.fillRect(nx + npc.ancho + 2, ny + 10, 8, 10);

    } else if (npc.id === 'pezLeon') {
      // Pez león — especie invasora del Caribe
      // Espejo horizontal según dirección de nado
      ctx.save();
      if (npc.mirandoDerecha === false) {
        ctx.translate(nx + npc.ancho / 2, ny + npc.alto / 2);
        ctx.scale(-1, 1);
        ctx.translate(-(nx + npc.ancho / 2), -(ny + npc.alto / 2));
      }
      // Cuerpo con rayas rojas y blancas
      ctx.fillStyle = '#CC4444';
      ctx.beginPath();
      ctx.ellipse(nx + npc.ancho / 2, ny + npc.alto / 2, npc.ancho / 2, npc.alto / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Rayas blancas
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(nx + npc.ancho / 2 + i * 4, ny + 2);
        ctx.lineTo(nx + npc.ancho / 2 + i * 4, ny + npc.alto - 2);
        ctx.stroke();
      }

      // Espinas venenosas (la característica más peligrosa)
      ctx.strokeStyle = '#FF6666';
      ctx.lineWidth = 1;
      for (let s = 0; s < 7; s++) {
        const angulo = (s / 7) * Math.PI - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(
          nx + npc.ancho / 2 + Math.cos(angulo) * (npc.ancho / 2),
          ny + npc.alto / 2 + Math.sin(angulo) * (npc.alto / 2)
        );
        ctx.lineTo(
          nx + npc.ancho / 2 + Math.cos(angulo) * (npc.ancho / 2 + 10),
          ny + npc.alto / 2 + Math.sin(angulo) * (npc.alto / 2 + 10)
        );
        ctx.stroke();
      }

      // Ojo
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(nx + npc.ancho * 0.7, ny + npc.alto * 0.35, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(nx + npc.ancho * 0.72, ny + npc.alto * 0.35, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Cola
      ctx.fillStyle = '#CC4444';
      ctx.beginPath();
      ctx.moveTo(nx, ny + npc.alto * 0.3);
      ctx.lineTo(nx - 10, ny);
      ctx.lineTo(nx - 10, ny + npc.alto);
      ctx.lineTo(nx, ny + npc.alto * 0.7);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Nombre
    ctx.font = '10px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    const esTortuga = npc.id === 'tortugaCarey' || npc.id === 'tortugaTinglar' || npc.id === 'tortugaCaguama';
    const nombreY = esTortuga ? ny - 10 : ny - 22;
    ctx.fillText(npc.nombre, nx + npc.ancho / 2, nombreY);

    // Indicador de interacción
    if (this._estaCerca(jugador, npc, 45) && !npc.dialogoHecho) {
      const parpadeo = Math.sin(this.tiempoTotal * 4) > 0 ? 1 : 0.4;
      ctx.font = '11px monospace';
      ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
      const _t = this._obtenerTextos()?.ui;
      const texto = npc.esCombate ? (_t?.eAlerta || '[E] ¡Alerta!') : (_t?.eHablar || '[E] Hablar');
      ctx.fillText(texto, nx + npc.ancho / 2, nombreY - 12);
    }

    if (npc.dialogoHecho && npc.id !== 'pezLeon') {
      ctx.font = 'bold 14px monospace';
      ctx.fillStyle = '#44CC44';
      ctx.fillText('✓', nx + npc.ancho / 2, nombreY - 12);
    }

    ctx.textAlign = 'left';
  }

  // --- Dibujar jugador (versión submarina — con burbujitas) ---
  _dibujarJugador(ctx, jugador, offsetX, offsetY) {
    const px = jugador.x + offsetX;
    const py = jugador.y + offsetY;
    const genero = jugador.genero || 'pepito';

    // Sombra submarina (más difusa)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.beginPath();
    ctx.ellipse(px + jugador.ancho / 2, py + jugador.alto + 2, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- Rotación de nado + sacudida por daño ---
    ctx.save();
    // Sacudida lateral al recibir daño (medusa, etc.)
    if (this._sacudida > 0) {
      const intensidad = this._sacudida / 0.5;
      const desplazamiento = Math.sin(this.tiempoTotal * 50) * 5 * intensidad;
      ctx.translate(desplazamiento, 0);
    }
    if (Math.abs(this._anguloNado) > 0.01) {
      const centroX = px + jugador.ancho / 2;
      const centroY = py + jugador.alto / 2;
      ctx.translate(centroX, centroY);
      ctx.rotate(this._anguloNado);
      ctx.translate(-centroX, -centroY);
    }

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

    // Máscara de buceo (encima de los ojos)
    ctx.fillStyle = 'rgba(100, 200, 255, 0.4)';
    ctx.fillRect(px + 7, py + 2, 14, 8);
    ctx.strokeStyle = '#444444';
    ctx.lineWidth = 1;
    ctx.strokeRect(px + 7, py + 2, 14, 8);

    // Ojos detrás de la máscara
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

    // Piernas con animación de nadar (más lenta)
    ctx.fillStyle = '#2a5599';
    const pasoAnim = jugador.esAnimando ? Math.sin(jugador.cuadroAnimacion * 5) * 3 : 0;
    ctx.fillRect(px + 6, py + 26 + pasoAnim, 7, 8);
    ctx.fillRect(px + 15, py + 26 - pasoAnim, 7, 8);

    // Aletas de buceo (en vez de zapatos)
    ctx.fillStyle = '#2288AA';
    ctx.fillRect(px + 4, py + 32 + pasoAnim, 10, 4);
    ctx.fillRect(px + 14, py + 32 - pasoAnim, 10, 4);

    // Burbujitas saliendo del personaje al nadar
    if (jugador.esAnimando) {
      const bx = px + jugador.ancho / 2;
      const by = py - 5;
      const fase = this.tiempoTotal * 3;
      ctx.fillStyle = 'rgba(200, 230, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(bx + Math.sin(fase) * 3, by - Math.abs(Math.sin(fase * 1.3)) * 8, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(bx + 4 + Math.sin(fase + 1) * 2, by - 3 - Math.abs(Math.sin(fase * 0.9)) * 6, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore(); // Fin de la rotación de nado

    // Efecto visual de lentitud (aura morada)
    if (this.efectoLentitud > 0) {
      const parpadeo = Math.sin(this.tiempoTotal * 6) * 0.15 + 0.15;
      ctx.fillStyle = `rgba(180, 100, 220, ${parpadeo})`;
      ctx.beginPath();
      ctx.ellipse(px + jugador.ancho / 2, py + jugador.alto / 2, 18, 22, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // --- Hablar con NPC ---
  _hablarConNPC(npc, jugador) {
    const textos = this._obtenerTextos();
    const ac = textos?.dialogos?.acuatico;

    if (npc.id === 'pescador') {
      this.dialogos.iniciarDialogo([
        { personaje: '🚣 Pescador Manuel', texto: ac?.pescador1 || '¡Bienvenido al fondo del mar, muchacho! Soy Manuel, pescador de Montecristi.' },
        { personaje: '🚣 Pescador Manuel', texto: ac?.pescador2 || 'Aquí abajo están los restos de la Santa María, la nave capitana de Colón.' },
        { personaje: '🚣 Pescador Manuel', texto: ac?.pescador3 || 'La Santa María encalló en un arrecife la Nochebuena de 1492. Con sus maderos construyeron el Fuerte Navidad.' },
        { personaje: '🚣 Pescador Manuel', texto: ac?.pescador4 || '¡Cuidado con las medusas! Su picadura duele y te hace nadar más lento.' }
      ], () => { npc.dialogoHecho = true; });

    } else if (npc.id === 'tortugaCarey') {
      this.dialogos.iniciarDialogo([
        { personaje: '🐢 Tortuga Carey', texto: ac?.tortuga1 || 'Soy una tortuga carey. Mi especie lleva 100 millones de años nadando en estos mares.' },
        { personaje: '🐢 Tortuga Carey', texto: ac?.tortuga2 || 'Estamos en peligro crítico de extinción. Nos cazan por nuestro caparazón, que usan para joyería.' },
        { personaje: '🐢 Tortuga Carey', texto: ac?.tortuga3 || 'Los arrecifes de coral son nuestro hogar. Si el coral muere, nosotros también.' },
        { personaje: '🐢 Tortuga Carey', texto: ac?.tortuga4 || 'Las tortugas carey comemos esponjas marinas que son tóxicas para otros animales. ¡Somos las guardianas del arrecife!' }
      ], () => { npc.dialogoHecho = true; });

    } else if (npc.id === 'tortugaTinglar') {
      this.dialogos.iniciarDialogo([
        { personaje: '🐢 Tortuga Tinglar', texto: ac?.tinglar1 || 'Soy una tortuga tinglar, la más grande del mundo. Puedo pesar hasta 700 kg.' },
        { personaje: '🐢 Tortuga Tinglar', texto: ac?.tinglar2 || 'Mi caparazón no tiene escamas duras como las otras tortugas — es coriáceo, como cuero.' },
        { personaje: '🐢 Tortuga Tinglar', texto: ac?.tinglar3 || 'Como casi solo medusas. Puedo comer 200 kg al día. ¡Las bolsas de plástico me confunden porque parecen medusas!' },
        { personaje: '🐢 Tortuga Tinglar', texto: ac?.tinglar4 || 'Puedo bucear a más de 1,000 metros de profundidad. Soy el reptil que más profundo se sumerge en el mundo.' }
      ], () => { npc.dialogoHecho = true; });

    } else if (npc.id === 'tortugaCaguama') {
      this.dialogos.iniciarDialogo([
        { personaje: '🐢 Tortuga Caguama', texto: ac?.caguama1 || 'Soy una tortuga caguama. Tengo la cabeza más grande de todas las tortugas marinas.' },
        { personaje: '🐢 Tortuga Caguama', texto: ac?.caguama2 || 'Mis mandíbulas son tan poderosas que puedo triturar cangrejos, erizos y caracoles.' },
        { personaje: '🐢 Tortuga Caguama', texto: ac?.caguama3 || 'Las luces artificiales en las playas confunden a nuestras crías. Caminan hacia la luz en vez del mar.' },
        { personaje: '🐢 Tortuga Caguama', texto: ac?.caguama4 || 'Las redes de pesca nos atrapan por accidente. La pesca responsable y los dispositivos de escape salvan vidas.' }
      ], () => { npc.dialogoHecho = true; });

    } else if (npc.id === 'arqueologa') {
      // La arqueóloga da el mapa de naufragios al terminar
      const tieneMapaNaufragios = this.juego && this.juego.inventario &&
        this.juego.inventario.objetos.some(o => o.id === 'mapaNaufragios');
      const yaEntregoRobot = this.juego?.progreso?.naufragiosRobotDescubiertos === true;

      if (yaEntregoRobot) {
        // Robot ya entregado a la Dra. Sofía — la arqueóloga lo sabe
        this.dialogos.iniciarDialogo([
          { personaje: '🤿 Arqueóloga Submarina', texto: ac?.arqueologaPostRobot || '¡La Dra. Sofía me contó del robot submarino! Los datos que envía son increíbles. ¡Gracias!' }
        ]);

      } else if (npc.dialogoHecho || tieneMapaNaufragios) {
        // Ya dio el mapa — repite información y recuerda el mapa real
        this.dialogos.iniciarDialogo([
          { personaje: '🤿 Arqueóloga Submarina', texto: ac?.arqueologaRepite || 'Usa el mapa de naufragios para encontrar más restos submarinos. ¡El mar Caribe esconde muchos secretos!' }
        ], () => {
          const _t = this._obtenerTextos();
          if (this.juego?.mostrarToast) {
            this.juego.mostrarToast(_t?.ui?.pistaMapaReal || '🗺️ Presiona R para ver el mapa real', 3);
          }
        });
      } else {
        this.dialogos.iniciarDialogo([
          { personaje: '🤿 Arqueóloga Submarina', texto: ac?.arqueologa1 || 'Soy arqueóloga submarina. Estudio los naufragios del Caribe dominicano.' },
          { personaje: '🤿 Arqueóloga Submarina', texto: ac?.arqueologa2 || 'Hay más de 400 naufragios registrados en las costas de esta isla.' },
          { personaje: '🤿 Arqueóloga Submarina', texto: ac?.arqueologa3 || 'Cada naufragio es una cápsula del tiempo. Los clavos, cerámicas y monedas nos cuentan la historia.' },
          { personaje: '🤿 Arqueóloga Submarina', texto: ac?.arqueologa4 || 'Toma este mapa de naufragios. Te ayudará a encontrar otros sitios submarinos.' }
        ], () => {
          // --- Dar mapa de naufragios ---
          const textos2 = this._obtenerTextos();
          const nombreMapa = textos2?.objetos?.mapaNaufragios || 'Mapa de Naufragios';
          jugador.agregarAlInventario({ nombre: 'mapaNaufragios' });
          if (this.juego.inventario) {
            this.juego.inventario.agregar({
              id: 'mapaNaufragios',
              nombre: nombreMapa,
              descripcion: textos2?.objetos?.descMapaNaufragios || 'Mapa con la ubicación de naufragios en el Caribe dominicano.',
              tipo: 'clave',
              cantidad: 1,
              color: '#4488cc',
              esUsable: false
            });
          }

          if (this.juego.mostrarToast) {
            this.juego.mostrarToast(`🗺️ ${nombreMapa} — ${textos2?.ui?.itemAnadido || 'ítem añadido al inventario'}`);
            // Recordar al jugador que puede explorar los naufragios en el mapa real
            setTimeout(() => {
              this.juego.mostrarToast(textos2?.ui?.pistaMapaReal || '🗺️ Presiona R para ver el mapa real', 3);
            }, 3500);
          }

          npc.dialogoHecho = true;
        });
      }

    } else if (npc.id === 'pezLeon') {
      if (npc.esCombate && !this.combateTerminado) {
        // El pez león inicia combate tras diálogo de advertencia
        this.dialogos.iniciarDialogo([
          { personaje: '🐟 Pez León', texto: ac?.pezLeonIntro1 || '¡Un pez león! Esta especie invasora del Indo-Pacífico está destruyendo los arrecifes del Caribe.' },
          { personaje: '🐟 Pez León', texto: ac?.pezLeonIntro2 || 'Come hasta 30 especies nativas y no tiene depredadores naturales aquí. ¡Hay que actuar!' }
        ], () => {
          // Iniciar combate con opciones ecológicas personalizadas
          this.combateIniciado = true;
          if (this.juego && this.juego.combate) {
            this.juego.combate.iniciar({
              nombre: 'Pez León',
              vida: 35,
              vidaMaxima: 35,
              fuerza: 3,
              velocidad: 3,
              hostilidad: 50,
              tipoSprite: 'pezLeon',
              etiquetaConvencimiento: ac?.etiquetaControl || 'Controlado:',
              pistaPersonalizada: ac?.combatePista || 'Usa acciones ecológicas para controlar al invasor',
              opcionesPersonalizadas: [
                {
                  // --- Atrapar: capturar con red para acuario/estudio ---
                  // Opción segura con efecto moderado. La captura individual
                  // es un método real usado por buzos en el Caribe.
                  id: 'atrapar',
                  nombre: ac?.accionAtrapar || 'Atrapar',
                  paciencia: [12, 18],
                  hostilidad: [8, 14],
                  mensaje: ac?.accionAtraparMsg || '¡Intentas atrapar al pez león con una red para llevarlo al acuario!',
                  respuestaEnemigo: {
                    mensaje: ac?.respuestaAtrapar || 'El pez león eriza sus espinas venenosas. ¡Cuidado con la picadura!',
                    hostilidad: [6, 10],
                    paciencia: [3, 6]
                  }
                },
                {
                  // --- Pescar: pescarlo para comer (ceviche, frito) ---
                  // La pesca de pez león es una estrategia REAL de control
                  // en el Caribe. Su carne es deliciosa y libre de ciguatera.
                  id: 'pescar',
                  nombre: ac?.accionPescar || 'Pescar',
                  paciencia: [15, 22],
                  hostilidad: [10, 16],
                  mensaje: ac?.accionPescarMsg || '¡Preparas el arpón! El pez león es comestible y pescarlo ayuda al arrecife.',
                  respuestaEnemigo: {
                    mensaje: ac?.respuestaPescar || '¡Se reproduce rápidamente! Mientras pescas uno, aparecen más juveniles.',
                    hostilidad: [8, 12],
                    paciencia: [4, 8]
                  }
                },
                {
                  // --- Proteger Coral: barrera defensiva ---
                  // Acción lenta pero segura. Protege el ecosistema mientras
                  // se organizan otras acciones de control.
                  id: 'protegerCoral',
                  nombre: ac?.accionProteger || 'Proteger Coral',
                  paciencia: [10, 15],
                  hostilidad: [6, 10],
                  mensaje: ac?.accionProtegerMsg || '¡Colocas barreras para proteger el coral y los peces herbívoros!',
                  respuestaEnemigo: {
                    mensaje: ac?.respuestaProteger || 'El pez león devora peces herbívoros. Sin ellos, las algas invaden el coral.',
                    hostilidad: [4, 7],
                    paciencia: [2, 5]
                  }
                },
                {
                  // --- Alertar Buzos: organizar remoción grupal ---
                  // Acción fuerte con contra-respuesta fuerte. Los torneos
                  // de caza de pez león son una estrategia REAL en el Caribe.
                  id: 'alertarBuzos',
                  nombre: ac?.accionAlertar || 'Alertar Buzos',
                  paciencia: [18, 25],
                  hostilidad: [12, 18],
                  mensaje: ac?.accionAlertarMsg || '¡Alertas a otros buzos para organizar una jornada de remoción!',
                  respuestaEnemigo: {
                    mensaje: ac?.respuestaAlertar || 'El pez león caza peces loro jóvenes. ¡Sin ellos el coral no se limpiará!',
                    hostilidad: [10, 14],
                    paciencia: [5, 10]
                  }
                }
              ]
            }, this.juego);
          }
        });
      } else {
        // Después de ser controlado
        this.dialogos.iniciarDialogo([
          { personaje: '🐟 Pez León', texto: ac?.pezLeonPaz1 || 'La pesca controlada mantendrá el equilibrio del arrecife.' },
          { personaje: '🐟 Pez León', texto: ac?.pezLeonPaz2 || '¿Sabías que la carne de pez león es deliciosa y nutritiva? ¡Cocinarme es ecológico!' }
        ]);
      }
    }
  }

  // ============================================================
  // BALLENAS JOROBADAS — sombras lejanas en el fondo
  // ============================================================
  // Las ballenas jorobadas (Megaptera novaeangliae) migran por
  // las aguas del Caribe dominicano cada invierno (enero-marzo).
  // Aquí las dibujamos como siluetas oscuras y lejanas que cruzan
  // lentamente el nivel, dando sensación de profundidad oceánica.
  // Sprite adaptado del proyecto cary (Phaser 3 → Canvas2D).

  // --- Crear una nueva ballena que cruce el nivel ---
  _spawnBallena() {
    // Aparece por la izquierda o la derecha
    const desdeIzquierda = Math.random() > 0.5;
    this.ballenasJorobadas.push({
      x: desdeIzquierda ? -150 : this.anchoNivel + 150,
      y: 200 + Math.random() * 400,
      // Tamaño grande: 140-200px — sombra majestuosa visible
      tamano: 140 + Math.random() * 60,
      // Velocidad lenta: cruzan en ~30 segundos
      vx: desdeIzquierda ? (0.3 + Math.random() * 0.3) : -(0.3 + Math.random() * 0.3),
      // Bobbing vertical suave
      fase: Math.random() * Math.PI * 2,
      frecuenciaY: 0.15 + Math.random() * 0.1,
      // Duración de vida
      vida: 25 + Math.random() * 10,
      vidaMax: 25, // Coincide con vida mínima para que el fade-in sea inmediato
      // Opacidad base más alta para que las sombras sean visibles
      opacidadBase: 0.22 + Math.random() * 0.1
    });
  }

  // --- Dibujar silueta de ballena jorobada ---
  // Cuerpo completo trazado como un único path continuo con curvas Bezier
  // para evitar artefactos de doble-alfa donde las formas se solapan.
  // La jorobada tiene cabeza ancha, cuerpo robusto y cola bifurcada.
  _dibujarBallenaJorobada(ctx, ballena, offsetX, offsetY) {
    const bx = ballena.x + offsetX;
    const by = ballena.y + offsetY;
    const s = ballena.tamano;
    // Opacidad que sube y baja con la vida (fade in/out)
    // Si la ballena está cantando, su sombra es mucho más visible
    const vidaNorm = ballena.vida / ballena.vidaMax;
    const fadeInOut = vidaNorm > 0.8 ? (1 - vidaNorm) / 0.2 : (vidaNorm < 0.2 ? vidaNorm / 0.2 : 1);
    const baseOpacidad = ballena._cantando ? 0.5 : ballena.opacidadBase;
    const alpha = baseOpacidad * fadeInOut;

    // Dirección: dir=1 va a la derecha, dir=-1 a la izquierda
    const dir = ballena.vx > 0 ? 1 : -1;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#142846';

    // --- Cuerpo entero como un solo path (sin solapamiento) ---
    // Recorrido: hocico → lomo (arriba) → pedúnculo → fluke sup → centro cola
    //            → fluke inf → pedúnculo → vientre (abajo) → hocico
    ctx.beginPath();
    // Hocico (punta delantera, redondeada)
    ctx.moveTo(bx + dir * s * 0.52, by);
    // Lomo: del hocico hacia atrás por arriba (curva convexa = joroba)
    ctx.bezierCurveTo(
      bx + dir * s * 0.5, by - s * 0.18,   // cp1: frente alta
      bx + dir * s * 0.1, by - s * 0.2,     // cp2: pico de la joroba
      bx - dir * s * 0.35, by - s * 0.06    // fin: pedúnculo caudal arriba
    );
    // Pedúnculo → punta de la fluke superior
    ctx.lineTo(bx - dir * s * 0.5, by - s * 0.03);
    ctx.lineTo(bx - dir * s * 0.72, by - s * 0.18);
    // Vuelta al centro de la cola
    ctx.lineTo(bx - dir * s * 0.55, by);
    // Punta de la fluke inferior → pedúnculo
    ctx.lineTo(bx - dir * s * 0.72, by + s * 0.18);
    ctx.lineTo(bx - dir * s * 0.5, by + s * 0.03);
    ctx.lineTo(bx - dir * s * 0.35, by + s * 0.06);
    // Vientre: del pedúnculo hacia adelante por abajo
    ctx.bezierCurveTo(
      bx + dir * s * 0.1, by + s * 0.2,     // cp1: vientre ancho
      bx + dir * s * 0.5, by + s * 0.18,     // cp2: frente baja
      bx + dir * s * 0.52, by                 // fin: hocico (cierra el path)
    );
    ctx.closePath();
    ctx.fill();

    // --- Aletas pectorales largas (la jorobada tiene las más largas) ---
    // Se dibujan aparte con tono ligeramente distinto
    ctx.fillStyle = '#1a3050';
    // Aleta superior
    ctx.beginPath();
    ctx.moveTo(bx - dir * s * 0.05, by - s * 0.1);
    ctx.lineTo(bx - dir * s * 0.15, by - s * 0.32);
    ctx.lineTo(bx + dir * s * 0.1, by - s * 0.12);
    ctx.closePath();
    ctx.fill();
    // Aleta inferior
    ctx.beginPath();
    ctx.moveTo(bx - dir * s * 0.05, by + s * 0.1);
    ctx.lineTo(bx - dir * s * 0.15, by + s * 0.32);
    ctx.lineTo(bx + dir * s * 0.1, by + s * 0.12);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // ============================================================
  // UTILIDADES
  // ============================================================

  // --- Crear una partícula de burbuja ---
  _crearBurbuja() {
    return {
      x: Math.random() * this.anchoNivel,
      y: Math.random() * this.altoNivel,
      radio: 1 + Math.random() * 3,
      velocidad: 0.3 + Math.random() * 0.7,
      opacidad: 0.1 + Math.random() * 0.3,
      fase: Math.random() * Math.PI * 2
    };
  }

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
