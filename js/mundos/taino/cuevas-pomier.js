// ============================================================
// CUEVAS-POMIER.JS - Primer nivel jugable (plataforma 2D)
// ============================================================
// Las Cuevas del Pomier son un sistema real de cuevas en San
// Cristóbal, República Dominicana, con petroglifos taínos
// auténticos. Este nivel introduce la mecánica de oscuridad,
// exploración y la problemática de los graffitis vandálicos
// que dañan el patrimonio real.
//
// MODO: Plataforma (vista lateral con gravedad y saltos)
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, GRAVEDAD, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';
import { Magnoboot } from '../../personajes/companeros/magnoboot.js';

export class CuevasPomier {

  constructor() {
    // --- Diseño del nivel ---
    this.plataformas = [];
    this.petroglifos = [];
    this.objetos = [];
    this.graffitis = [];

    // Posición de la salida del nivel
    this.salidaX = 0;
    this.salidaY = 0;

    // --- NPC Arqueóloga ---
    // Aparece cerca de la salida y le da Magnoboot al jugador
    this.arqueologa = null;
    this.arqueologaDialogoHecho = false;

    // --- Sistema de oscuridad ---
    this.nivelOscuridad = 0.85;
    this.radioLuz = 80;

    // --- Cámara ---
    this.camaraX = 0;
    this.camaraY = 0;
    this.anchoNivel = 3000;
    this.altoNivel = ALTO_JUEGO;

    // --- Diálogos ---
    this.dialogos = new SistemaDialogos();
    this.introMostrada = false;

    // --- Sonidos procedurales ---
    this.sfx = new SonidoProcedural();

    // --- Misión actual ---
    this.misionActual = '';

    // --- Respawn ---
    this.ultimaPosSeguraX = 60;
    this.ultimaPosSeguraY = 350;
    this.limiteInferior = ALTO_JUEGO + 100;

    // --- Partículas ambientales ---
    // Goteos de agua y motas de polvo que hacen la cueva sentir viva
    this.particulas = [];
    this.tiempoProximoGoteo = 0;
    this.tiempoProximoPolvo = 0;

    // --- Parallax ---
    // Capas de fondo que se mueven a diferente velocidad que la cámara
    // para dar sensación de profundidad (las cosas lejanas se mueven menos)
    this.capasParallax = [];

    // --- Feedback visual del jugador ---
    // Squash/stretch al saltar y aterrizar — hace al personaje sentirse vivo
    this.escalaJugadorX = 1;
    this.escalaJugadorY = 1;
    this.estabaEnSuelo = true;
    this.particulasImpacto = [];

    // --- Sonido de pasos ---
    this.tiempoProximoPaso = 0;

    // Bloqueo de entrada
    this.bloqueoEntrada = false;

    // Tiempo total de la escena (para animaciones)
    this.tiempoTotal = 0;

    // --- Control de goteos de sonido ---
    this.tiempoProximoGoteoSonido = 0;
  }

  // --- Construir el nivel ---
  iniciar(juego) {
    this.juego = juego;

    // Poner al jugador en modo plataforma con gravedad
    if (juego.jugador) {
      juego.jugador.modoJuego = 'plataforma';
      juego.jugador.x = 60;
      juego.jugador.y = 350;
    }

    // --- Obtener textos traducidos ---
    const textos = this._obtenerTextos();

    // --- Plataformas ---
    this.plataformas = [
      // Suelo principal al inicio
      { x: 0, y: 430, ancho: 400, alto: 110 },
      // Escalones que suben
      { x: 350, y: 380, ancho: 120, alto: 20 },
      { x: 500, y: 340, ancho: 100, alto: 20 },
      // Plataforma ancha intermedia
      { x: 650, y: 360, ancho: 250, alto: 20 },
      // Salto largo sobre un vacío
      { x: 970, y: 330, ancho: 80, alto: 20 },
      // Zona baja
      { x: 1100, y: 420, ancho: 200, alto: 120 },
      // Subida con plataformas pequeñas
      { x: 1350, y: 370, ancho: 80, alto: 20 },
      { x: 1470, y: 320, ancho: 80, alto: 20 },
      { x: 1590, y: 280, ancho: 100, alto: 20 },
      // Zona alta
      { x: 1740, y: 300, ancho: 300, alto: 20 },
      // Descenso hacia la salida
      { x: 2090, y: 350, ancho: 120, alto: 20 },
      { x: 2240, y: 390, ancho: 150, alto: 20 },
      // Suelo final
      { x: 2450, y: 430, ancho: 550, alto: 110 },
      // Techo
      { x: 0, y: 0, ancho: this.anchoNivel, alto: 30 },
      // Paredes laterales
      { x: 0, y: 0, ancho: 20, alto: this.altoNivel },
      { x: this.anchoNivel - 20, y: 0, ancho: 20, alto: this.altoNivel }
    ];

    // --- Petroglifos ---
    // Mapeo de tipo a clave de traducción
    this.petroglifos = [
      { x: 200, y: 380, descubierto: false, tipo: 'sol', claveTexto: 'petroSol' },
      { x: 700, y: 310, descubierto: false, tipo: 'murcielago', claveTexto: 'petroMurcielago' },
      { x: 1150, y: 370, descubierto: false, tipo: 'cara', claveTexto: 'petroCara' },
      { x: 1800, y: 250, descubierto: false, tipo: 'espiral', claveTexto: 'petroEspiral' },
      { x: 2600, y: 380, descubierto: false, tipo: 'rana', claveTexto: 'petroRana' }
    ];

    // --- Objetos coleccionables ---
    this.objetos = [
      { x: 520, y: 310, tipo: 'linterna', recogido: false },
      { x: 1500, y: 290, tipo: 'fragmentoMapa', recogido: false },
      { x: 2700, y: 400, tipo: 'artefactoTaino', recogido: false }
    ];

    // --- Graffitis vandálicos ---
    this.graffitis = [
      { x: 400, y: 400, texto: 'PEPE 2019', color: '#FF0000' },
      { x: 900, y: 320, texto: 'yo estuve aki', color: '#00FF00' },
      { x: 1650, y: 260, texto: 'RD #1', color: '#FF00FF' }
    ];

    // --- NPC Arqueóloga (cerca de la salida) ---
    this.arqueologa = { x: 2750, y: 398, ancho: 24, alto: 32 };
    this.arqueologaDialogoHecho = false;

    // La salida está al extremo derecho
    this.salidaX = 2850;
    this.salidaY = 390;

    // Iniciar cámara
    this.camaraX = 0;
    this.camaraY = 0;

    // Resetear respawn
    this.ultimaPosSeguraX = 60;
    this.ultimaPosSeguraY = 350;
    this.bloqueoEntrada = false;

    // --- Generar capas de parallax ---
    // Cada capa tiene estalactitas/estalagmitas a diferentes profundidades
    this._generarCapasParallax();

    // --- Limpiar partículas ---
    this.particulas = [];
    this.particulasImpacto = [];
    this.tiempoTotal = 0;
    this.tiempoProximoGoteo = 0;
    this.tiempoProximoPolvo = 0;
    this.tiempoProximoPaso = 0;
    this.tiempoProximoGoteoSonido = 0;

    // --- Misión inicial ---
    this.misionActual = textos?.dialogos?.cueva?.misionExplorar || 'Explora la cueva';

    // --- Diálogo de introducción con el espíritu taíno ---
    this.introMostrada = false;
    this.dialogos = new SistemaDialogos();
    this._lanzarIntro();
  }

  // --- Obtener textos del idioma actual ---
  _obtenerTextos() {
    if (!this.juego || !this.juego.idiomas) return null;
    return this.juego.idiomas.traducciones[this.juego.idiomas.idiomaActual];
  }

  // --- Lanzar diálogo de introducción ---
  // El Espíritu Taína le habla al jugador cuando cae a la cueva
  _lanzarIntro() {
    const textos = this._obtenerTextos();
    if (!textos) return;

    const cueva = textos.dialogos.cueva;
    const espiritu = '🌀 Espíritu Taína';

    this.dialogos.iniciarDialogo([
      { personaje: espiritu, texto: cueva.espirituIntro1 },
      { personaje: espiritu, texto: cueva.espirituIntro2 },
      { personaje: espiritu, texto: cueva.espirituIntro3 },
      { personaje: espiritu, texto: cueva.espirituIntro4 }
    ]);

    this.introMostrada = true;
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, jugador, companeros) {
    if (!jugador) return;

    this.tiempoTotal += dt;

    // --- Actualizar diálogos ---
    // Si hay un diálogo activo, bloqueamos el movimiento del jugador
    if (this.dialogos.estaActivo()) {
      this.dialogos.actualizar(dt);

      // Avanzar diálogo con acción
      if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
        this.dialogos.avanzar();
        this.bloqueoEntrada = true;
      }

      // Navegar opciones con arriba/abajo
      if (entrada.estaPresionada('arriba') && !this.bloqueoEntrada) {
        this.dialogos.seleccionarOpcion(-1);
        this.bloqueoEntrada = true;
      }
      if (entrada.estaPresionada('abajo') && !this.bloqueoEntrada) {
        this.dialogos.seleccionarOpcion(1);
        this.bloqueoEntrada = true;
      }

      // Desbloquear cuando se sueltan todas las teclas
      if (!entrada.estaPresionada('accion') &&
          !entrada.estaPresionada('arriba') &&
          !entrada.estaPresionada('abajo')) {
        this.bloqueoEntrada = false;
      }

      return; // No procesar movimiento mientras hay diálogo
    }

    // --- Salir de la cueva con M (mapa) ---
    if (entrada.estaPresionada('mapa') && !this.bloqueoEntrada) {
      this.bloqueoEntrada = true;
      if (this.juego && this.juego.cambiarEscena) {
        this.juego.cambiarEscena('mapaPrincipal');
      }
      return;
    }

    if (!entrada.estaPresionada('mapa')) {
      this.bloqueoEntrada = false;
    }

    // --- Detección de caída al vacío ---
    if (jugador.y > this.limiteInferior) {
      jugador.x = this.ultimaPosSeguraX;
      jugador.y = this.ultimaPosSeguraY;
      jugador.velocidadX = 0;
      jugador.velocidadY = 0;
      jugador.enSuelo = true;
      jugador.puedeSaltar = true;

      jugador.recibirDano(10);
      this.sfx.dano();

      // Mostrar mensaje de caída traducido
      const textos = this._obtenerTextos();
      const mensajeCaida = textos?.dialogos?.cueva?.caida || 'Caiste al vacio!';
      this.dialogos.iniciarDialogo([
        { personaje: '', texto: mensajeCaida }
      ]);
      return;
    }

    // --- Movimiento del jugador ---
    jugador.velocidadX = 0;
    jugador.esAnimando = false;

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

    // --- Salto ---
    if (entrada.estaPresionada('saltar') && jugador.enSuelo && jugador.puedeSaltar) {
      jugador.velocidadY = -10;
      jugador.enSuelo = false;
      jugador.puedeSaltar = false;
      this.sfx.salto();

      // Squash al saltar (se aplasta horizontalmente y se estira verticalmente)
      this.escalaJugadorX = 1.3;
      this.escalaJugadorY = 0.7;
    }

    // Gravedad (sin multiplicar por dt — física de frame fijo)
    jugador.velocidadY += GRAVEDAD;

    // Aplicar movimiento escalado por dt
    const factorTiempo = dt * 60;
    jugador.x += jugador.velocidadX * factorTiempo;
    jugador.y += jugador.velocidadY * factorTiempo;

    // --- Colisiones ---
    this.verificarColisionPlataformas(jugador);

    // --- Detectar aterrizaje ---
    if (jugador.enSuelo && !this.estabaEnSuelo) {
      // Acaba de aterrizar — stretch horizontal y sonido
      this.escalaJugadorX = 0.7;
      this.escalaJugadorY = 1.3;
      this.sfx.aterrizar();

      // Partículas de polvo al aterrizar
      this._crearParticulasImpacto(jugador.x + jugador.ancho / 2, jugador.y + jugador.alto);
    }
    this.estabaEnSuelo = jugador.enSuelo;

    // --- Recuperar escala del jugador suavemente ---
    // Lerp hacia 1.0 para que el squash/stretch sea temporal
    this.escalaJugadorX += (1 - this.escalaJugadorX) * 0.15;
    this.escalaJugadorY += (1 - this.escalaJugadorY) * 0.15;

    // --- Sonido de pasos ---
    if (jugador.enSuelo && jugador.esAnimando) {
      this.tiempoProximoPaso -= dt;
      if (this.tiempoProximoPaso <= 0) {
        this.sfx.paso();
        this.tiempoProximoPaso = 0.3; // Un paso cada 0.3 segundos
      }
    }

    // --- Guardar posición segura ---
    if (jugador.enSuelo) {
      this.ultimaPosSeguraX = jugador.x;
      this.ultimaPosSeguraY = jugador.y;
    }

    // --- Límites del nivel ---
    if (jugador.x < 20) jugador.x = 20;
    if (jugador.x + jugador.ancho > this.anchoNivel - 20) {
      jugador.x = this.anchoNivel - 20 - jugador.ancho;
    }

    // --- Recoger objetos ---
    for (const objeto of this.objetos) {
      if (!objeto.recogido && this._estaCerca(jugador, objeto, 30)) {
        objeto.recogido = true;
        this.sfx.recoger();

        // Obtener textos traducidos para nombre y descripción
        const textos = this._obtenerTextos();
        const objTextos = textos?.objetos || {};

        // Variable para guardar el nombre traducido del objeto recogido
        let nombreObjeto = '';

        if (objeto.tipo === 'linterna') {
          this.radioLuz = 150;
          nombreObjeto = objTextos.linterna || 'Linterna';
          // Agregar al inventario simple del jugador (para el getter tieneLinterna)
          jugador.agregarAlInventario({ nombre: 'linterna' });
          // Agregar al inventario UI con info completa
          if (this.juego && this.juego.inventario) {
            this.juego.inventario.agregar({
              id: 'linterna',
              nombre: nombreObjeto,
              descripcion: objTextos.descLinterna || 'Ilumina la oscuridad.',
              tipo: 'herramienta',
              esUsable: false
            });
          }
        }

        if (objeto.tipo === 'fragmentoMapa') {
          nombreObjeto = objTextos.fragmentoMapa || 'Fragmento de Mapa';
          jugador.agregarAlInventario({ nombre: 'fragmentoMapa' });
          if (this.juego && this.juego.inventario) {
            this.juego.inventario.agregar({
              id: 'fragmentoMapa',
              nombre: nombreObjeto,
              descripcion: objTextos.descFragmentoMapa || 'Un pedazo de mapa antiguo.',
              tipo: 'clave',
              esUsable: false
            });
          }
        }

        if (objeto.tipo === 'artefactoTaino') {
          nombreObjeto = objTextos.artefactoTaino || 'Artefacto Taíno';
          jugador.agregarAlInventario({ nombre: 'artefactoTaino' });
          if (this.juego && this.juego.inventario) {
            this.juego.inventario.agregar({
              id: 'artefactoTaino',
              nombre: nombreObjeto,
              descripcion: objTextos.descArtefactoTaino || 'Un cemí dorado.',
              tipo: 'clave',
              esUsable: false
            });
          }
          this.misionActual = textos?.dialogos?.cueva?.misionArtefacto || 'Lleva el artefacto a la salida';
        }

        // Mostrar mensaje flotante indicando qué objeto se recogió
        if (nombreObjeto && this.juego && this.juego.mostrarToast) {
          this.juego.mostrarToast(`✦ ${nombreObjeto} — añadido al inventario`);
        }
      }
    }

    // --- Interacción con petroglifos (diálogo en vez de texto plano) ---
    if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      for (const petro of this.petroglifos) {
        if (!petro.descubierto && this._estaCerca(jugador, petro, 40)) {
          petro.descubierto = true;
          this.sfx.descubrir();
          this.bloqueoEntrada = true;

          // Usar texto traducido del petroglifo
          const textos = this._obtenerTextos();
          const textoPetro = textos?.dialogos?.cueva?.[petro.claveTexto] || 'Petroglifo descubierto.';

          this.dialogos.iniciarDialogo([
            { personaje: '🗿 Petroglifo', texto: textoPetro }
          ]);

          // Actualizar misión si todos descubiertos
          const todosDescubiertos = this.petroglifos.every(p => p.descubierto);
          if (todosDescubiertos) {
            const textoMision = textos?.dialogos?.cueva?.misionSalir || 'Busca la salida';
            this.misionActual = textoMision;
          }
          break;
        }
      }
    }

    // --- Interacción con la arqueóloga ---
    if (this.arqueologa && !this.arqueologaDialogoHecho) {
      if (this._estaCerca(jugador, this.arqueologa, 45)) {
        if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
          this.bloqueoEntrada = true;
          this.arqueologaDialogoHecho = true;

          const textos = this._obtenerTextos();
          const cueva = textos?.dialogos?.cueva;
          this.dialogos.iniciarDialogo([
            { personaje: '🔬 Dra. Martínez', texto: cueva?.arqueologoIntro || '¡Alto ahí!' },
            { personaje: '🔬 Dra. Martínez', texto: cueva?.arqueologoReconoce || '¿Encontraste petroglifos?' },
            { personaje: '🔬 Dra. Martínez', texto: cueva?.arqueologoRegalo || 'Toma a Magnoboot.' },
            { personaje: '🔬 Dra. Martínez', texto: cueva?.arqueologoDespedida || 'Cuida el patrimonio.' }
          ], () => {
            // Al terminar el diálogo, la arqueóloga le da Magnoboot al jugador
            const magnoboot = new Magnoboot(jugador.x + 30, jugador.y + 5);
            magnoboot.activar();
            this.juego.companeros.push(magnoboot);
            this.sfx.recoger();
          });
        }
      }
    }

    // --- Verificar si llega a la salida ---
    if (this._estaCerca(jugador, { x: this.salidaX, y: this.salidaY }, 35)) {
      if (this.juego) {
        if (this.juego.progreso) {
          if (!this.juego.progreso.nodosCompletados.includes(0)) {
            this.juego.progreso.nodosCompletados.push(0);
          }
          if (!this.juego.progreso.nodosDesbloqueados.includes(1)) {
            this.juego.progreso.nodosDesbloqueados.push(1);
          }
        }
        if (this.juego.cambiarEscena) {
          this.juego.cambiarEscena('mapaPrincipal');
        }
      }
    }

    // --- Actualizar compañeros ---
    if (companeros) {
      for (const companero of companeros) {
        if (typeof companero.actualizar === 'function') {
          companero.actualizar(dt, jugador);
        }

        // Eco-localización del Cemí Murciélago
        if (companero.tipo === 'cemiMurcielago' && companero.ecoLocalizacion) {
          for (const obj of this.objetos) {
            obj._reveladoPorEco = true;
          }
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

    // --- Actualizar partículas ---
    this._actualizarParticulas(dt);
    this._actualizarParticulasImpacto(dt);

    // --- Generar goteos y polvo ambiental ---
    this._generarParticulasAmbientales(dt);

    // --- Goteo de agua ambiental (sonido) ---
    this.tiempoProximoGoteoSonido -= dt;
    if (this.tiempoProximoGoteoSonido <= 0) {
      this.sfx.goteo();
      // Intervalo aleatorio entre 2 y 6 segundos
      this.tiempoProximoGoteoSonido = 2 + Math.random() * 4;
    }
  }

  // --- Dibujar todo el nivel ---
  dibujar(renderizador, ancho, alto, textos, jugador, companeros) {
    if (!jugador) return;

    const ctx = renderizador.ctx;
    const offsetX = -this.camaraX;
    const offsetY = -this.camaraY;

    ctx.save();

    // --- Fondo de la cueva ---
    ctx.fillStyle = '#0d0a05';
    ctx.fillRect(0, 0, ancho, alto);

    // --- Capas de parallax (fondo lejano) ---
    this._dibujarParallax(ctx, ancho, alto);

    // --- Plataformas ---
    for (const plat of this.plataformas) {
      const px = plat.x + offsetX;
      const py = plat.y + offsetY;

      if (px + plat.ancho < 0 || px > ancho) continue;
      if (py + plat.alto < 0 || py > alto) continue;

      // Superficie rocosa con variaciones de color
      ctx.fillStyle = '#5C4033';
      ctx.fillRect(px, py, plat.ancho, plat.alto);

      // Textura de roca: pequeñas variaciones de color cada ciertos píxeles
      ctx.fillStyle = '#6B4E3D';
      for (let tx = 0; tx < plat.ancho; tx += 24) {
        const h = 3 + Math.sin(plat.x + tx) * 2;
        ctx.fillRect(px + tx, py + 1, 12, h);
      }

      // Borde superior iluminado
      ctx.fillStyle = '#8A6B55';
      ctx.fillRect(px, py, plat.ancho, 2);

      // Musgo en plataformas grandes (detalle visual)
      if (plat.ancho > 100 && plat.alto < 30) {
        ctx.fillStyle = '#2D4A1E';
        for (let mx = 10; mx < plat.ancho - 10; mx += 18) {
          if (Math.sin(plat.x + mx * 0.7) > 0.3) {
            ctx.fillRect(px + mx, py - 2, 8, 3);
          }
        }
      }

      // Borde inferior sombra
      ctx.fillStyle = '#3D2B1F';
      ctx.fillRect(px, py + plat.alto - 2, plat.ancho, 2);
    }

    // --- Petroglifos ---
    for (const petro of this.petroglifos) {
      const px = petro.x + offsetX;
      const py = petro.y + offsetY;

      const dist = this._distancia(jugador.x, jugador.y, petro.x, petro.y);
      const esVisible = dist < this.radioLuz || petro.descubierto;
      if (!esVisible) continue;

      // Fondo del petroglifo
      ctx.fillStyle = petro.descubierto ? '#4A3728' : '#3D2B1F';
      ctx.fillRect(px - 5, py - 5, 40, 40);

      // Brillo dorado si descubierto
      if (petro.descubierto) {
        const brillo = (Math.sin(this.tiempoTotal * 3) + 1) / 2;
        ctx.fillStyle = `rgba(255, 215, 0, ${0.05 + brillo * 0.1})`;
        ctx.fillRect(px - 8, py - 8, 46, 46);
      }

      // Símbolo del petroglifo
      ctx.strokeStyle = petro.descubierto ? '#FFD700' : '#AA8855';
      ctx.lineWidth = 2;
      this._dibujarSimboloPetroglifo(ctx, px + 15, py + 15, petro.tipo);

      // Indicador de interacción
      if (dist < 40 && !petro.descubierto) {
        const parpadeo = Math.sin(this.tiempoTotal * 4) > 0 ? 1 : 0.4;
        ctx.font = '11px monospace';
        ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
        ctx.textAlign = 'center';
        ctx.fillText('[E] Examinar', px + 15, py - 15);
        ctx.textAlign = 'left';
      }
    }

    // --- Graffitis vandálicos ---
    for (const graffiti of this.graffitis) {
      const gx = graffiti.x + offsetX;
      const gy = graffiti.y + offsetY;

      const dist = this._distancia(jugador.x, jugador.y, graffiti.x, graffiti.y);
      if (dist > this.radioLuz) continue;

      ctx.font = 'bold 14px monospace';
      ctx.fillStyle = graffiti.color;
      ctx.fillText(graffiti.texto, gx, gy);
    }

    // --- Objetos coleccionables ---
    for (const obj of this.objetos) {
      if (obj.recogido) continue;

      const ox = obj.x + offsetX;
      const oy = obj.y + offsetY;

      const dist = this._distancia(jugador.x, jugador.y, obj.x, obj.y);
      const esVisible = dist < this.radioLuz + 30 || obj._reveladoPorEco;
      if (!esVisible) continue;

      // Brillo pulsante
      const brilloPulso = (Math.sin(this.tiempoTotal * 4) + 1) / 2;
      const gradienteBrillo = ctx.createRadialGradient(
        ox + 8, oy + 8, 2,
        ox + 8, oy + 8, 12 + brilloPulso * 5
      );
      gradienteBrillo.addColorStop(0, 'rgba(255, 215, 0, 0.6)');
      gradienteBrillo.addColorStop(1, 'rgba(255, 215, 0, 0)');
      ctx.fillStyle = gradienteBrillo;
      ctx.fillRect(ox - 10, oy - 10, 36, 36);

      // Ícono según tipo de objeto
      this._dibujarIconoObjeto(ctx, ox, oy, obj.tipo);
    }

    // --- NPC Arqueóloga ---
    if (this.arqueologa) {
      const ax = this.arqueologa.x + offsetX;
      const ay = this.arqueologa.y + offsetY;

      const dist = this._distancia(jugador.x, jugador.y, this.arqueologa.x, this.arqueologa.y);
      if (dist < this.radioLuz + 20) {
        this._dibujarArqueologa(ctx, ax, ay);

        // Indicador de interacción
        if (dist < 45 && !this.arqueologaDialogoHecho) {
          const parpadeo = Math.sin(this.tiempoTotal * 4) > 0 ? 1 : 0.4;
          ctx.font = '11px monospace';
          ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
          ctx.textAlign = 'center';
          ctx.fillText('[E] Hablar', ax + 12, ay - 20);
          ctx.textAlign = 'left';
        }
      }
    }

    // --- Marcador de salida ---
    const sx = this.salidaX + offsetX;
    const sy = this.salidaY + offsetY;
    const distSalida = this._distancia(jugador.x, jugador.y, this.salidaX, this.salidaY);

    if (distSalida < this.radioLuz + 50) {
      const gradienteSalida = ctx.createRadialGradient(
        sx + 15, sy + 15, 5,
        sx + 15, sy + 15, 40
      );
      gradienteSalida.addColorStop(0, 'rgba(200, 220, 255, 0.4)');
      gradienteSalida.addColorStop(1, 'rgba(200, 220, 255, 0)');
      ctx.fillStyle = gradienteSalida;
      ctx.fillRect(sx - 25, sy - 25, 80, 80);

      ctx.fillStyle = '#AACCFF';
      ctx.fillRect(sx, sy, 30, 40);

      ctx.font = '11px monospace';
      ctx.fillStyle = '#AACCFF';
      ctx.textAlign = 'center';
      ctx.fillText('SALIDA', sx + 15, sy - 10);
      ctx.textAlign = 'left';
    }

    // --- Partículas ambientales (detrás del jugador) ---
    this._dibujarParticulas(ctx, offsetX, offsetY);

    // --- Dibujar al jugador con squash/stretch ---
    this._dibujarJugadorDetallado(ctx, jugador, offsetX, offsetY);

    // --- Dibujar compañeros ---
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

    // --- Partículas de impacto (encima del jugador) ---
    this._dibujarParticulasImpacto(ctx, offsetX, offsetY);

    ctx.restore();

    // --- Filtro de oscuridad ---
    const jugadorPantallaX = jugador.x + offsetX + jugador.ancho / 2;
    const jugadorPantallaY = jugador.y + offsetY + jugador.alto / 2;
    renderizador.aplicarFiltroCueva(jugadorPantallaX, jugadorPantallaY, this.radioLuz);

    // --- HUD ---
    renderizador.dibujarBarra(10, 10, 120, 14, jugador.vida / jugador.vidaMaxima,
      '#333333', '#44CC44');
    renderizador.dibujarTexto(textos?.interfaz?.vida || 'Vida', 15, 22, {
      tamano: 10, color: '#FFFFFF'
    });

    // Contador de petroglifos descubiertos
    const petroDescubiertos = this.petroglifos.filter(p => p.descubierto).length;
    renderizador.dibujarTexto(`🗿 ${petroDescubiertos}/${this.petroglifos.length}`, 15, 42, {
      tamano: 11, color: '#FFD700'
    });

    // Misión actual
    renderizador.dibujarTexto(this.misionActual, ancho - 10, 20, {
      tamano: 12, color: '#CCCCCC', alineacion: 'right'
    });

    // --- Dibujar caja de diálogo (si hay diálogo activo) ---
    // NOTA: dialogos.dibujar() espera el contexto raw, no el Renderizador
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto);
    }

    // --- Controles ---
    if (!this.dialogos.estaActivo()) {
      renderizador.dibujarTexto('WASD: mover | Espacio: saltar | E: examinar | I: inventario | M: mapa', ancho / 2, alto - 10, {
        tamano: 10, color: '#555555', alineacion: 'center'
      });
    }
  }

  // ============================================================
  // SISTEMAS DE PARTÍCULAS
  // ============================================================

  // --- Generar goteos de agua y motas de polvo ---
  _generarParticulasAmbientales(dt) {
    // Goteos de agua desde el techo
    this.tiempoProximoGoteo -= dt;
    if (this.tiempoProximoGoteo <= 0) {
      // Generar un goteo en una posición aleatoria visible
      const xGoteo = this.camaraX + Math.random() * ANCHO_JUEGO;
      this.particulas.push({
        tipo: 'goteo',
        x: xGoteo,
        y: 30 + Math.random() * 20, // Justo debajo del techo
        vy: 60 + Math.random() * 40,
        vida: 3,
        vidaMax: 3,
        tamano: 2
      });
      this.tiempoProximoGoteo = 0.3 + Math.random() * 0.8;
    }

    // Motas de polvo flotantes
    this.tiempoProximoPolvo -= dt;
    if (this.tiempoProximoPolvo <= 0) {
      const xPolvo = this.camaraX + Math.random() * ANCHO_JUEGO;
      this.particulas.push({
        tipo: 'polvo',
        x: xPolvo,
        y: 50 + Math.random() * (ALTO_JUEGO - 100),
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 5,
        vida: 4 + Math.random() * 3,
        vidaMax: 7,
        tamano: 1 + Math.random()
      });
      this.tiempoProximoPolvo = 0.2 + Math.random() * 0.5;
    }
  }

  _actualizarParticulas(dt) {
    for (let i = this.particulas.length - 1; i >= 0; i--) {
      const p = this.particulas[i];
      p.vida -= dt;

      if (p.vida <= 0) {
        this.particulas.splice(i, 1);
        continue;
      }

      if (p.tipo === 'goteo') {
        p.y += p.vy * dt;
      } else if (p.tipo === 'polvo') {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        // Las motas de polvo oscilan suavemente
        p.vx += (Math.random() - 0.5) * 2 * dt;
      }
    }
  }

  _dibujarParticulas(ctx, offsetX, offsetY) {
    for (const p of this.particulas) {
      const px = p.x + offsetX;
      const py = p.y + offsetY;
      const alfa = Math.min(1, p.vida / (p.vidaMax * 0.3));

      if (p.tipo === 'goteo') {
        // Gota de agua: azul claro, alargada verticalmente
        ctx.fillStyle = `rgba(150, 200, 255, ${alfa * 0.6})`;
        ctx.fillRect(px, py, 1, p.tamano + 2);
      } else if (p.tipo === 'polvo') {
        // Mota de polvo: círculo diminuto dorado
        ctx.fillStyle = `rgba(180, 160, 120, ${alfa * 0.3})`;
        ctx.beginPath();
        ctx.arc(px, py, p.tamano, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // --- Partículas de impacto (polvo al aterrizar) ---
  _crearParticulasImpacto(x, y) {
    for (let i = 0; i < 8; i++) {
      const angulo = Math.random() * Math.PI; // Solo hacia arriba (semicírculo)
      const velocidad = 30 + Math.random() * 60;
      this.particulasImpacto.push({
        x: x,
        y: y,
        vx: Math.cos(angulo) * velocidad * (Math.random() > 0.5 ? 1 : -1),
        vy: -Math.sin(angulo) * velocidad,
        vida: 0.3 + Math.random() * 0.3,
        vidaMax: 0.6,
        tamano: 1 + Math.random() * 2
      });
    }
  }

  _actualizarParticulasImpacto(dt) {
    for (let i = this.particulasImpacto.length - 1; i >= 0; i--) {
      const p = this.particulasImpacto[i];
      p.vida -= dt;

      if (p.vida <= 0) {
        this.particulasImpacto.splice(i, 1);
        continue;
      }

      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 80 * dt; // Gravedad sobre las partículas
    }
  }

  _dibujarParticulasImpacto(ctx, offsetX, offsetY) {
    for (const p of this.particulasImpacto) {
      const px = p.x + offsetX;
      const py = p.y + offsetY;
      const alfa = p.vida / p.vidaMax;

      ctx.fillStyle = `rgba(160, 140, 100, ${alfa * 0.8})`;
      ctx.beginPath();
      ctx.arc(px, py, p.tamano, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ============================================================
  // PARALLAX
  // ============================================================

  // --- Generar formaciones rocosas para las capas de fondo ---
  _generarCapasParallax() {
    this.capasParallax = [];

    // Capa 1: Fondo lejano (se mueve al 20% de la cámara)
    // Siluetas de formaciones rocosas grandes
    const capa1 = [];
    for (let x = 0; x < this.anchoNivel; x += 80 + Math.random() * 100) {
      capa1.push({
        x: x,
        y: 100 + Math.random() * 200,
        ancho: 40 + Math.random() * 80,
        alto: 100 + Math.random() * 200
      });
    }

    // Capa 2: Medio (se mueve al 50% de la cámara)
    // Estalactitas colgando del techo
    const capa2 = [];
    for (let x = 0; x < this.anchoNivel; x += 50 + Math.random() * 80) {
      capa2.push({
        x: x,
        y: 30,
        ancho: 6 + Math.random() * 14,
        alto: 30 + Math.random() * 80
      });
    }

    // Estalagmitas subiendo del suelo
    for (let x = 0; x < this.anchoNivel; x += 60 + Math.random() * 100) {
      capa2.push({
        x: x,
        y: ALTO_JUEGO - 30 - Math.random() * 60,
        ancho: 8 + Math.random() * 16,
        alto: 20 + Math.random() * 50,
        estalagmita: true
      });
    }

    this.capasParallax = [
      { formas: capa1, velocidad: 0.2, color: '#1a1209' },
      { formas: capa2, velocidad: 0.5, color: '#241a0f' }
    ];
  }

  _dibujarParallax(ctx, ancho, alto) {
    for (const capa of this.capasParallax) {
      const parallaxOffset = -this.camaraX * capa.velocidad;

      ctx.fillStyle = capa.color;
      for (const forma of capa.formas) {
        const fx = forma.x + parallaxOffset;

        // Solo dibujar si visible en pantalla
        if (fx + forma.ancho < -100 || fx > ancho + 100) continue;

        if (forma.estalagmita) {
          // Estalagmita: triángulo apuntando hacia arriba
          ctx.beginPath();
          ctx.moveTo(fx, forma.y + forma.alto);
          ctx.lineTo(fx + forma.ancho / 2, forma.y);
          ctx.lineTo(fx + forma.ancho, forma.y + forma.alto);
          ctx.closePath();
          ctx.fill();
        } else if (forma.y <= 35) {
          // Estalactita: triángulo apuntando hacia abajo
          ctx.beginPath();
          ctx.moveTo(fx, forma.y);
          ctx.lineTo(fx + forma.ancho / 2, forma.y + forma.alto);
          ctx.lineTo(fx + forma.ancho, forma.y);
          ctx.closePath();
          ctx.fill();
        } else {
          // Formación rocosa: rectángulo irregular
          ctx.fillRect(fx, forma.y, forma.ancho, forma.alto);
        }
      }
    }
  }

  // ============================================================
  // DIBUJO DETALLADO DEL JUGADOR
  // ============================================================

  _dibujarJugadorDetallado(ctx, jugador, offsetX, offsetY) {
    const x = jugador.x + offsetX;
    const y = jugador.y + offsetY;
    const w = jugador.ancho;
    const h = jugador.alto;

    // Centro del jugador (para aplicar squash/stretch desde el centro-abajo)
    const centroX = x + w / 2;
    const baseY = y + h;

    ctx.save();
    ctx.translate(centroX, baseY);
    ctx.scale(this.escalaJugadorX, this.escalaJugadorY);
    ctx.translate(-centroX, -baseY);

    const esPepito = jugador.genero === 'pepito';
    const colorCuerpo = esPepito ? '#4488ff' : '#aa44ff';
    const colorCuerpoOscuro = esPepito ? '#3366cc' : '#8833cc';
    const colorPiel = '#D2956A';
    const mirandoIzq = jugador.direccion === 'izquierda';

    // --- Piernas (animadas si camina) ---
    const animPiernas = jugador.esAnimando ? Math.sin(this.tiempoTotal * 12) * 3 : 0;
    ctx.fillStyle = '#333355';
    // Pierna izquierda
    ctx.fillRect(x + 6, y + h - 10 + animPiernas, 6, 10 - animPiernas);
    // Pierna derecha
    ctx.fillRect(x + w - 12, y + h - 10 - animPiernas, 6, 10 + animPiernas);

    // --- Zapatos ---
    ctx.fillStyle = '#553322';
    ctx.fillRect(x + 4, y + h - 3, 8, 3);
    ctx.fillRect(x + w - 14, y + h - 3, 8, 3);

    // --- Cuerpo (torso) ---
    ctx.fillStyle = colorCuerpo;
    ctx.fillRect(x + 3, y + 10, w - 6, h - 20);

    // Detalle de ropa: línea más oscura al centro
    ctx.fillStyle = colorCuerpoOscuro;
    ctx.fillRect(x + w / 2 - 1, y + 12, 2, h - 24);

    // --- Brazos ---
    const animBrazos = jugador.esAnimando ? Math.sin(this.tiempoTotal * 12) * 2 : 0;
    ctx.fillStyle = colorPiel;
    // Brazo izquierdo
    ctx.fillRect(x - 1, y + 14 + animBrazos, 4, 10);
    // Brazo derecho
    ctx.fillRect(x + w - 3, y + 14 - animBrazos, 4, 10);

    // --- Cabeza ---
    ctx.fillStyle = colorPiel;
    const cabezaAncho = 20;
    const cabezaAlto = 14;
    const cabezaX = x + (w - cabezaAncho) / 2;
    const cabezaY = y - 4;
    ctx.fillRect(cabezaX, cabezaY, cabezaAncho, cabezaAlto);

    // --- Cabello ---
    ctx.fillStyle = esPepito ? '#332211' : '#221133';
    if (esPepito) {
      // Pelo corto arriba
      ctx.fillRect(cabezaX + 1, cabezaY - 3, cabezaAncho - 2, 5);
    } else {
      // Pelo largo a los lados
      ctx.fillRect(cabezaX - 1, cabezaY - 3, cabezaAncho + 2, 5);
      ctx.fillRect(cabezaX - 2, cabezaY, 3, 10);
      ctx.fillRect(cabezaX + cabezaAncho - 1, cabezaY, 3, 10);
    }

    // --- Ojos ---
    ctx.fillStyle = '#FFFFFF';
    const ojosBaseX = cabezaX + 4;
    const ojosY = cabezaY + 5;
    const desplOjosX = mirandoIzq ? -1 : 1;

    // Ojo izquierdo (blanco)
    ctx.fillRect(ojosBaseX + desplOjosX, ojosY, 5, 4);
    // Ojo derecho (blanco)
    ctx.fillRect(ojosBaseX + 8 + desplOjosX, ojosY, 5, 4);

    // Pupilas
    ctx.fillStyle = '#000000';
    ctx.fillRect(ojosBaseX + 1 + desplOjosX * 2, ojosY + 1, 2, 2);
    ctx.fillRect(ojosBaseX + 9 + desplOjosX * 2, ojosY + 1, 2, 2);

    // --- Boca (sonrisa simple) ---
    ctx.fillStyle = '#000000';
    ctx.fillRect(cabezaX + 7, cabezaY + 10, 6, 1);

    ctx.restore();
  }

  // ============================================================
  // DIBUJO DE NPCs Y OBJETOS
  // ============================================================

  // --- Dibujar la arqueóloga ---
  _dibujarArqueologa(ctx, x, y) {
    // Bata blanca de científica
    ctx.fillStyle = '#DDDDDD';
    ctx.fillRect(x + 2, y + 10, 20, 18);

    // Piernas
    ctx.fillStyle = '#555555';
    ctx.fillRect(x + 5, y + 28, 5, 4);
    ctx.fillRect(x + 14, y + 28, 5, 4);

    // Cabeza
    ctx.fillStyle = '#C8886A';
    ctx.fillRect(x + 5, y, 14, 12);

    // Pelo recogido (moño)
    ctx.fillStyle = '#3A2010';
    ctx.fillRect(x + 4, y - 2, 16, 5);
    ctx.fillRect(x + 8, y - 4, 8, 4);

    // Gafas
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 7, y + 4, 4, 3);
    ctx.strokeRect(x + 13, y + 4, 4, 3);
    ctx.beginPath();
    ctx.moveTo(x + 11, y + 5);
    ctx.lineTo(x + 13, y + 5);
    ctx.stroke();

    // Nombre flotante
    ctx.font = '9px monospace';
    ctx.fillStyle = '#AAAAAA';
    ctx.textAlign = 'center';
    ctx.fillText('Dra. Martínez', x + 12, y - 8);
    ctx.textAlign = 'left';
  }

  // --- Dibujar íconos de objetos coleccionables ---
  _dibujarIconoObjeto(ctx, ox, oy, tipo) {
    if (tipo === 'linterna') {
      // Cuerpo cilíndrico amarillo
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(ox + 2, oy + 2, 12, 6);
      ctx.fillStyle = '#FFF8DC';
      ctx.fillRect(ox, oy + 4, 4, 2);
      // Rayo de luz
      ctx.fillStyle = 'rgba(255, 255, 200, 0.5)';
      ctx.beginPath();
      ctx.moveTo(ox, oy + 3);
      ctx.lineTo(ox - 8, oy);
      ctx.lineTo(ox - 8, oy + 10);
      ctx.closePath();
      ctx.fill();
    } else if (tipo === 'fragmentoMapa') {
      // Pergamino enrollado
      ctx.fillStyle = '#D2B48C';
      ctx.fillRect(ox + 1, oy + 1, 14, 14);
      ctx.fillStyle = '#8B7355';
      ctx.fillRect(ox + 3, oy + 4, 10, 1);
      ctx.fillRect(ox + 3, oy + 7, 8, 1);
      ctx.fillRect(ox + 3, oy + 10, 10, 1);
    } else if (tipo === 'artefactoTaino') {
      // Cemí dorado
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(ox + 8, oy + 6, 5, 0, Math.PI * 2);
      ctx.fill();
      // Cuerpo del cemí
      ctx.fillRect(ox + 5, oy + 10, 6, 4);
      // Ojos del cemí
      ctx.fillStyle = '#000000';
      ctx.fillRect(ox + 6, oy + 4, 2, 2);
      ctx.fillRect(ox + 9, oy + 4, 2, 2);
    } else {
      // Genérico: cuadrado dorado
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(ox, oy, 16, 16);
    }

    // Borde
    ctx.strokeStyle = '#B8860B';
    ctx.lineWidth = 1;
    ctx.strokeRect(ox, oy, 16, 16);
  }

  // ============================================================
  // COLISIONES
  // ============================================================

  verificarColision(entidad, plataforma) {
    return (
      entidad.x < plataforma.x + plataforma.ancho &&
      entidad.x + entidad.ancho > plataforma.x &&
      entidad.y < plataforma.y + plataforma.alto &&
      entidad.y + entidad.alto > plataforma.y
    );
  }

  verificarColisionPlataformas(jugador) {
    jugador.enSuelo = false;

    for (const plat of this.plataformas) {
      if (!this.verificarColision(jugador, plat)) continue;

      const solapadoIzq = (jugador.x + jugador.ancho) - plat.x;
      const solapadoDer = (plat.x + plat.ancho) - jugador.x;
      const solapadoArriba = (jugador.y + jugador.alto) - plat.y;
      const solapadoAbajo = (plat.y + plat.alto) - jugador.y;

      const minSolapado = Math.min(solapadoIzq, solapadoDer, solapadoArriba, solapadoAbajo);

      if (minSolapado === solapadoArriba) {
        jugador.y = plat.y - jugador.alto;
        jugador.velocidadY = 0;
        jugador.enSuelo = true;
        jugador.puedeSaltar = true;
      } else if (minSolapado === solapadoAbajo) {
        jugador.y = plat.y + plat.alto;
        jugador.velocidadY = 0;
      } else if (minSolapado === solapadoIzq) {
        jugador.x = plat.x - jugador.ancho;
      } else if (minSolapado === solapadoDer) {
        jugador.x = plat.x + plat.ancho;
      }
    }
  }

  // ============================================================
  // DIBUJO DE PETROGLIFOS
  // ============================================================

  _dibujarSimboloPetroglifo(ctx, cx, cy, tipo) {
    ctx.beginPath();

    switch (tipo) {
      case 'sol':
        ctx.arc(cx, cy, 8, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 8; i++) {
          const angulo = (i / 8) * Math.PI * 2;
          ctx.moveTo(cx + Math.cos(angulo) * 10, cy + Math.sin(angulo) * 10);
          ctx.lineTo(cx + Math.cos(angulo) * 15, cy + Math.sin(angulo) * 15);
        }
        ctx.stroke();
        break;

      case 'murcielago':
        ctx.moveTo(cx - 12, cy);
        ctx.lineTo(cx - 6, cy - 8);
        ctx.lineTo(cx, cy - 3);
        ctx.lineTo(cx + 6, cy - 8);
        ctx.lineTo(cx + 12, cy);
        ctx.lineTo(cx, cy + 5);
        ctx.closePath();
        ctx.stroke();
        break;

      case 'cara':
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx - 4, cy - 2, 2, 0, Math.PI * 2);
        ctx.arc(cx + 4, cy - 2, 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 3, cy + 4);
        ctx.lineTo(cx + 3, cy + 4);
        ctx.stroke();
        break;

      case 'espiral':
        for (let i = 0; i < 20; i++) {
          const angulo = (i / 20) * Math.PI * 4;
          const radio = 2 + i * 0.6;
          const px = cx + Math.cos(angulo) * radio;
          const py = cy + Math.sin(angulo) * radio;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        break;

      case 'rana':
        ctx.arc(cx, cy - 3, 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillRect(cx - 8, cy + 3, 4, 6);
        ctx.fillRect(cx + 4, cy + 3, 4, 6);
        ctx.beginPath();
        ctx.arc(cx - 2, cy - 5, 1.5, 0, Math.PI * 2);
        ctx.arc(cx + 2, cy - 5, 1.5, 0, Math.PI * 2);
        ctx.stroke();
        break;
    }
  }

  // ============================================================
  // UTILIDADES
  // ============================================================

  _estaCerca(entidad, punto, distanciaMaxima) {
    const dx = (entidad.x + (entidad.ancho || 0) / 2) - punto.x;
    const dy = (entidad.y + (entidad.alto || 0) / 2) - punto.y;
    return Math.sqrt(dx * dx + dy * dy) < distanciaMaxima;
  }

  _distancia(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
