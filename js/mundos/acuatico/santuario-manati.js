// ============================================================
// SANTUARIO-MANATI.JS - Santuario del Manatí (sub-nivel marino)
// ============================================================
// Zona costera poco profunda con praderas de pastos marinos,
// accesible desde el borde derecho del Mundo Acuático. Aquí el
// jugador puede realizar 2 acciones ecológicas que complementan
// la del pez león para desbloquear el final ecológico:
//
//   1. Liberar un manatí adulto atrapado en una red fantasma
//   2. Limpiar desechos del arrecife (3 piezas de basura)
//
// Los manatíes antillanos (Trichechus manatus manatus) están
// en peligro de extinción — quedan menos de 2,500 en el Caribe.
// La Ley 64-00 de Medio Ambiente de la República Dominicana
// protege la biodiversidad, incluyendo a los manatíes.
//
// PELIGROS: Tiburones patrulleros + zona de hélices de lancha
// MODO: Top-down (vista desde arriba, velocidad ×0.7 = nadar)
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO, VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';

export class SantuarioManati {

  constructor() {
    // --- Dimensiones del nivel ---
    // Aguas costeras poco profundas con praderas de pasto marino
    this.anchoNivel = 1800;
    this.altoNivel = 1200;

    // --- Cámara ---
    this.camaraX = 0;
    this.camaraY = 0;

    // --- Estructuras (formaciones de coral con colisión) ---
    this.estructuras = [];

    // --- NPCs ---
    this.npcs = [];

    // --- Tiburones (peligros patrulleros) ---
    this.tiburones = [];

    // --- Red fantasma que atrapa al manatí adulto ---
    this.redFantasma = null;

    // --- Desechos para limpiar el arrecife ---
    this.desechos = [];

    // --- Objetos coleccionables ---
    this.objetos = [];

    // --- Sombras de ballenas jorobadas (fondo lejano) ---
    // Siluetas oscuras adaptadas del proyecto cary (Phaser 3)
    this.ballenasJorobadas = [];
    this._cooldownCantoballena = 0;

    // --- Decoración marina ---
    this.corales = [];      // Corales decorativos (brain, staghorn, fan, table)
    this.algas = [];         // Praderas de pasto marino (Bezier animado)
    this.esponjas = [];      // Esponjas (barrel, tube)
    this.pecesEscuela = [];  // Pececitos con comportamiento de cardumen
    this.tortugasBebe = [];  // Tortuguitas decorativas
    this.burbujas = [];      // Partículas de burbujas

    // --- Estado de acciones ecológicas ---
    this.manatiLiberado = false;
    this.desechosRecogidos = 0;
    this.limpiezaCompleta = false;
    this.biologaHablada = false;   // Requisito para liberar manatí
    this.tortugaHablada = false;   // Requisito para recoger desechos

    // --- Zona de hélices (peligro en la parte superior) ---
    this.zonaHelice = { y: 0, alto: 50 };
    this.tiempoEnHelice = 0;
    this.cooldownHelice = 0;

    // --- Lanchas rápidas (speedboats que cruzan la zona de hélices) ---
    // Cada cierto tiempo una lancha cruza a toda velocidad por la superficie,
    // dejando estela de olas y haciendo ruido de motor. Si el jugador está
    // en la zona superior puede ser golpeado y perder vida.
    this.lanchas = [];
    this._cooldownLancha = 5; // Segundos hasta la primera lancha
    this._olasDeLancha = [];  // Estelas de olas que persisten tras pasar

    // --- Oxígeno (apnea con snorkel en aguas poco profundas) ---
    // El jugador nada a pulmón: el oxígeno se agota lentamente y debe
    // subir a la superficie (zona de hélices, peligrosa) para respirar.
    this.oxigeno = 100;          // 0-100, empieza lleno
    this.oxigenoMax = 100;
    this._oxigenoAlerta = false;  // true cuando ya sonó la alerta de bajo oxígeno
    this._oxigenoCooldownDano = 0; // Cooldown entre daños por asfixia

    // --- Diálogos ---
    this.dialogos = new SistemaDialogos();

    // --- Sonidos ---
    this.sfx = new SonidoProcedural();

    // --- Bloqueo de entrada ---
    this.bloqueoEntrada = true;

    // --- Tiempo total (para animaciones) ---
    this.tiempoTotal = 0;

    // Ángulo de nado del jugador — rota suavemente al moverse horizontalmente
    this._anguloNado = 0;

    // --- Misión ---
    this.misionActual = '';

    // --- Reunión madre-cría tras liberar al manatí ---
    // Animación en 3 fases: cría nada hacia la madre, se encuentran, nadan juntas
    this._reunionManati = {
      activa: false,
      fase: 0,        // 0=cría se acerca, 1=juntas, 2=nadan fuera de pantalla
      tiempo: 0,
      criaX: 0, criaY: 0,   // Posición del bebé manatí
      madreX: 0, madreY: 0, // Posición de la madre
      criaMirandoDerecha: false,  // Dirección de la cría
      madreMirandoDerecha: true,  // Dirección de la madre
      terminada: false
    };

    // --- Efecto de lentitud por tiburón ---
    this.efectoLentitud = 0;
    this.invulnerabilidad = 0;

    // --- Referencia al juego ---
    this.juego = null;
  }

  // --- Construir el santuario ---
  iniciar(juego) {
    this.juego = juego;

    // Poner al jugador en modo top-down
    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';
      juego.jugador.x = 60;
      juego.jugador.y = 600;
      juego.jugador.direccion = 'derecha';
    }

    // --- Restaurar estado de acciones ecológicas del progreso guardado ---
    // Evita que el jugador sume acciones dobles al re-entrar
    if (juego.progreso) {
      this.manatiLiberado = !!juego.progreso.manatiLiberado;
      this.limpiezaCompleta = !!juego.progreso.arrecifeLimpiado;
      if (this.limpiezaCompleta) this.desechosRecogidos = 3;
    }

    // --- Estructuras de coral (obstáculos con colisión) ---
    this.estructuras = [
      { x: 400, y: 300, ancho: 120, alto: 60, tipo: 'coralCerebro', nombre: 'Coral Cerebro' },
      { x: 800, y: 500, ancho: 100, alto: 50, tipo: 'coralCuerno', nombre: 'Coral Cuerno de Alce' },
      { x: 1200, y: 350, ancho: 80, alto: 70, tipo: 'coralAbanico', nombre: 'Coral Abanico' },
      { x: 600, y: 800, ancho: 110, alto: 55, tipo: 'coralMesa', nombre: 'Coral de Mesa' },
      { x: 1400, y: 700, ancho: 90, alto: 65, tipo: 'coralCerebro', nombre: 'Coral Cerebro' },
      { x: 1000, y: 900, ancho: 100, alto: 50, tipo: 'coralCuerno', nombre: 'Coral Cuerno' }
    ];

    // --- NPCs ---
    this.npcs = [
      {
        id: 'biologa', nombre: '🧪 Dra. Sofía',
        x: 200, y: 450, ancho: 28, alto: 36,
        dialogoHecho: false
      },
      {
        id: 'tortugaVerde', nombre: '🐢 Tortuga Verde',
        x: 500, y: 700, ancho: 35, alto: 25,
        dialogoHecho: false,
        // Movimiento lento en circuito
        centroX: 500, centroY: 700, radioX: 60, radioY: 30, fase: 0
      },
      {
        id: 'manatiBebe', nombre: '🐋 Manatí Bebé',
        x: 900, y: 550, ancho: 30, alto: 20,
        dialogoHecho: false
      }
    ];

    // --- Tiburones patrulleros ---
    // 3 tiburones con rutas de patrulla entre waypoints
    this.tiburones = [
      {
        x: 700, y: 200,
        ancho: 80, alto: 30,
        puntoA: { x: 500, y: 180 }, puntoB: { x: 900, y: 220 },
        fase: 0, velocidad: 0.3,
        persiguiendo: false, cooldownDano: 0, retirada: 0
      },
      {
        x: 1300, y: 500,
        ancho: 80, alto: 30,
        puntoA: { x: 1100, y: 450 }, puntoB: { x: 1500, y: 550 },
        fase: Math.PI * 0.5, velocidad: 0.25,
        persiguiendo: false, cooldownDano: 0, retirada: 0
      },
      {
        x: 300, y: 950,
        ancho: 80, alto: 30,
        puntoA: { x: 200, y: 900 }, puntoB: { x: 600, y: 1000 },
        fase: Math.PI, velocidad: 0.35,
        persiguiendo: false, cooldownDano: 0, retirada: 0
      }
    ];

    // --- Red fantasma (atrapa al manatí adulto) ---
    this.redFantasma = {
      x: 1300, y: 300, ancho: 140, alto: 100,
      activa: !this.manatiLiberado
    };

    // --- Desechos en el arrecife ---
    this.desechos = [
      { x: 720, y: 830, tipo: 'bolsa', recogido: this.limpiezaCompleta, ancho: 12, alto: 12 },
      { x: 910, y: 520, tipo: 'botella', recogido: this.limpiezaCompleta, ancho: 14, alto: 10 },
      { x: 1110, y: 920, tipo: 'lata', recogido: this.limpiezaCompleta, ancho: 10, alto: 10 }
    ];

    // --- Objeto coleccionable ---
    // Fuera de Coral Cerebro (colisión: 400,300 a 520,360)
    this.objetos = [
      {
        x: 530, y: 320, tipo: 'dienteTiburon',
        ancho: 16, alto: 16, recogido: false
      }
    ];

    // --- Corales decorativos ---
    this.corales = [];
    const posicionesCoral = [
      { x: 150, y: 350, tipo: 'brain' }, { x: 350, y: 650, tipo: 'staghorn' },
      { x: 750, y: 400, tipo: 'fan' }, { x: 950, y: 750, tipo: 'table' },
      { x: 1150, y: 600, tipo: 'brain' }, { x: 1500, y: 400, tipo: 'fan' },
      { x: 1600, y: 850, tipo: 'staghorn' }, { x: 300, y: 1050, tipo: 'table' }
    ];
    for (const pos of posicionesCoral) {
      this.corales.push({
        x: pos.x, y: pos.y, tipo: pos.tipo,
        fase: Math.random() * Math.PI * 2,
        escala: 0.8 + Math.random() * 0.4
      });
    }

    // --- Praderas de pasto marino (algas animadas) ---
    this.algas = [];
    for (let i = 0; i < 5; i++) {
      const hojas = 8 + Math.floor(Math.random() * 18);
      const blades = [];
      for (let b = 0; b < hojas; b++) {
        blades.push({
          offsetX: (Math.random() - 0.5) * 40,
          altura: 25 + Math.random() * 35,
          fase: Math.random() * Math.PI * 2,
          grosor: 1.5 + Math.random() * 1.5
        });
      }
      this.algas.push({
        x: 100 + i * 380 + Math.random() * 100,
        y: 1000 + Math.random() * 150,
        hojas: blades,
        color: `rgb(${40 + Math.floor(Math.random() * 30)}, ${120 + Math.floor(Math.random() * 40)}, ${50 + Math.floor(Math.random() * 30)})`
      });
    }

    // --- Esponjas ---
    this.esponjas = [
      { x: 280, y: 780, tipo: 'barrel', fase: Math.random() * Math.PI * 2 },
      { x: 1100, y: 450, tipo: 'tube', fase: Math.random() * Math.PI * 2 },
      { x: 1550, y: 650, tipo: 'barrel', fase: Math.random() * Math.PI * 2 }
    ];

    // --- Pececitos de cardumen ---
    this.pecesEscuela = [];
    for (let i = 0; i < 10; i++) {
      this.pecesEscuela.push({
        x: 600 + Math.random() * 400,
        y: 300 + Math.random() * 300,
        centroX: 800, centroY: 450,
        offsetX: (Math.random() - 0.5) * 80,
        offsetY: (Math.random() - 0.5) * 60,
        fase: Math.random() * Math.PI * 2,
        velocidad: 0.5 + Math.random() * 0.5,
        color: ['#FFD700', '#87CEEB', '#FF6347', '#7FFFD4'][Math.floor(Math.random() * 4)]
      });
    }

    // --- Tortuguitas decorativas ---
    this.tortugasBebe = [];
    for (let i = 0; i < 3; i++) {
      this.tortugasBebe.push({
        x: 300 + i * 500 + Math.random() * 200,
        y: 600 + Math.random() * 300,
        fase: Math.random() * Math.PI * 2,
        velocidad: 0.2 + Math.random() * 0.2
      });
    }

    // --- Burbujas ---
    this.burbujas = [];
    for (let i = 0; i < 25; i++) {
      this.burbujas.push(this._crearBurbuja());
    }

    // --- Ballenas jorobadas (sombras lejanas) ---
    this.ballenasJorobadas = [];
    this._spawnBallena();

    // Misión inicial
    const textos = this._obtenerTextos();
    this.misionActual = textos?.dialogos?.santuario?.misionExplorar
      || 'Explora el Santuario del Manatí';
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, jugador, companeros) {
    if (!jugador) return;

    this.tiempoTotal += dt;

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
    if (this.cooldownHelice > 0) {
      this.cooldownHelice -= dt;
      if (this.cooldownHelice < 0) this.cooldownHelice = 0;
    }

    // --- Movimiento top-down (velocidad ×0.7 = nadar) ---
    jugador.velocidadX = 0;
    jugador.velocidadY = 0;
    jugador.esAnimando = false;

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
      jugador.cuadroAnimacion += 0.12;
    }

    // --- Ángulo de nado: rota suavemente según dirección ---
    // ±75° al nadar lateralmente, 180° al nadar hacia abajo, 0° al estar quieto o subiendo
    const moviHorizontal = entrada.estaPresionada('izquierda') || entrada.estaPresionada('derecha');
    const moviAbajo = entrada.estaPresionada('abajo') && !moviHorizontal;
    let anguloObjetivo = 0;
    if (moviHorizontal) {
      anguloObjetivo = jugador.direccion === 'izquierda' ? -Math.PI * 0.42 : Math.PI * 0.42;
    } else if (moviAbajo) {
      anguloObjetivo = Math.PI; // 180° — cabeza hacia abajo
    }
    this._anguloNado += (anguloObjetivo - this._anguloNado) * Math.min(1, 8 * dt);

    // --- Bordes del nivel ---
    jugador.x = Math.max(0, Math.min(this.anchoNivel - jugador.ancho, jugador.x));
    jugador.y = Math.max(0, Math.min(this.altoNivel - jugador.alto, jugador.y));

    // --- Colisión con estructuras ---
    for (const est of this.estructuras) {
      if (jugador.x + jugador.ancho > est.x &&
          jugador.x < est.x + est.ancho &&
          jugador.y + jugador.alto > est.y &&
          jugador.y < est.y + est.alto) {
        const dx = (jugador.x + jugador.ancho / 2) - (est.x + est.ancho / 2);
        const dy = (jugador.y + jugador.alto / 2) - (est.y + est.alto / 2);

        if (Math.abs(dx) > Math.abs(dy)) {
          jugador.x = dx > 0 ? est.x + est.ancho : est.x - jugador.ancho;
        } else {
          jugador.y = dy > 0 ? est.y + est.alto : est.y - jugador.alto;
        }
      }
    }

    // --- Sistema de oxígeno (apnea) ---
    // El oxígeno baja lentamente bajo el agua (~60 segundos hasta agotarse)
    // Subir a la superficie (zona de hélices) lo recarga rápido
    if (jugador.y < this.zonaHelice.alto + 15) {
      // En la superficie: respirar — recarga rápida (lleno en ~2s)
      this.oxigeno = Math.min(this.oxigenoMax, this.oxigeno + 50 * dt);
      this._oxigenoAlerta = false;
    } else {
      // Sumergido: el oxígeno baja (~1.7 por segundo → ~60s de autonomía)
      this.oxigeno = Math.max(0, this.oxigeno - 1.7 * dt);
    }
    // Alerta sonora cuando baja del 25%
    if (this.oxigeno < 25 && !this._oxigenoAlerta) {
      this._oxigenoAlerta = true;
      this.sfx.dano();
      const textos = this._obtenerTextos();
      if (this.juego && this.juego.mostrarToast) {
        this.juego.mostrarToast(
          textos?.dialogos?.santuario?.oxigenoBajo
          || '🫁 ¡Oxígeno bajo! ¡Sube a la superficie para respirar!'
        , 3);
      }
    }
    // Daño por asfixia cuando llega a 0
    if (this.oxigeno <= 0) {
      this._oxigenoCooldownDano -= dt;
      if (this._oxigenoCooldownDano <= 0) {
        jugador.vida = Math.max(0, jugador.vida - 3);
        this._oxigenoCooldownDano = 1.5;
        this.sfx.dano();
      }
    }

    // --- Zona de hélices (parte superior del nivel) ---
    if (jugador.y < this.zonaHelice.alto && this.cooldownHelice <= 0) {
      jugador.vida = Math.max(0, jugador.vida - 2);
      this.cooldownHelice = 1.5;
      this.sfx.dano();
      const textos = this._obtenerTextos();
      if (this.juego && this.juego.mostrarToast) {
        this.juego.mostrarToast(
          textos?.dialogos?.santuario?.zonaHelice
          || '⚠ ¡Zona de hélices! ¡Peligro!'
        );
      }
    }

    // --- Lanchas rápidas (speedboats en la zona de hélices) ---
    // Cada 8-15 segundos una lancha cruza la superficie a gran velocidad
    this._cooldownLancha -= dt;
    if (this._cooldownLancha <= 0 && this.lanchas.length < 2) {
      this._spawnLancha();
      this._cooldownLancha = 8 + Math.random() * 7; // 8-15s entre lanchas
    }
    // Actualizar lanchas activas
    for (let i = this.lanchas.length - 1; i >= 0; i--) {
      const lancha = this.lanchas[i];
      lancha.x += lancha.vx * dt * 60;
      // Bobbing vertical leve (la lancha sube y baja con las olas)
      lancha.yOffset = Math.sin(this.tiempoTotal * 8 + lancha.fase) * 2;
      // Generar estela de olas cada pocos frames
      lancha.tiempoOla -= dt;
      if (lancha.tiempoOla <= 0) {
        lancha.tiempoOla = 0.06;
        this._olasDeLancha.push({
          x: lancha.x - lancha.dir * 15,
          y: lancha.y + 8,
          radio: 4 + Math.random() * 3,
          opacidad: 0.6,
          vida: 1.5
        });
      }
      // Colisión con jugador — la lancha golpea fuerte
      if (jugador.y < this.zonaHelice.alto + 10 && this.invulnerabilidad <= 0) {
        const dx = Math.abs((jugador.x + jugador.ancho / 2) - lancha.x);
        const dy = Math.abs((jugador.y + jugador.alto / 2) - lancha.y);
        if (dx < 30 && dy < 20) {
          jugador.vida = Math.max(0, jugador.vida - 8);
          this.invulnerabilidad = 2.0;
          this.sfx.dano();
          const textos = this._obtenerTextos();
          if (this.juego && this.juego.mostrarToast) {
            this.juego.mostrarToast(
              textos?.dialogos?.santuario?.golpeLancha
              || '💥 ¡Una lancha te golpeó! ¡Aléjate de la superficie!'
            , 3);
          }
        }
      }
      // Eliminar lanchas que salieron del nivel
      if (lancha.x < -100 || lancha.x > this.anchoNivel + 100) {
        this.lanchas.splice(i, 1);
      }
    }
    // Actualizar estelas de olas (se desvanecen con el tiempo)
    for (let i = this._olasDeLancha.length - 1; i >= 0; i--) {
      const ola = this._olasDeLancha[i];
      ola.vida -= dt;
      ola.radio += dt * 8; // Se expanden lentamente
      ola.opacidad = Math.max(0, ola.vida / 1.5) * 0.6;
      if (ola.vida <= 0) this._olasDeLancha.splice(i, 1);
    }

    // --- Tiburones: patrulla, persecución y retirada tras morder ---
    // Tras morder, el tiburón se aleja nadando en la dirección opuesta
    // al jugador durante ~1.5s, luego da la vuelta para atacar de nuevo.
    for (const tiburon of this.tiburones) {
      const prevX = tiburon.x;
      // Cooldown de daño
      if (tiburon.cooldownDano > 0) {
        tiburon.cooldownDano -= dt;
      }
      // Temporizador de retirada tras morder
      if (tiburon.retirada > 0) {
        tiburon.retirada -= dt;
      }

      // Calcular distancia al jugador
      const dx = (jugador.x + jugador.ancho / 2) - (tiburon.x + tiburon.ancho / 2);
      const dy = (jugador.y + jugador.alto / 2) - (tiburon.y + tiburon.alto / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (tiburon.retirada > 0) {
        // RETIRADA: nadar en dirección opuesta al jugador tras morder
        tiburon.persiguiendo = false;
        const vel = 2.0 * factorTiempo;
        const angulo = Math.atan2(-dy, -dx);
        tiburon.x += Math.cos(angulo) * vel;
        tiburon.y += Math.sin(angulo) * vel;

        // No salir del nivel
        tiburon.x = Math.max(20, Math.min(this.anchoNivel - 20, tiburon.x));
        tiburon.y = Math.max(20, Math.min(this.altoNivel - 20, tiburon.y));

      } else if (dist < 150) {
        // Perseguir al jugador
        tiburon.persiguiendo = true;
        const vel = 1.2 * factorTiempo;
        const angulo = Math.atan2(dy, dx);
        tiburon.x += Math.cos(angulo) * vel;
        tiburon.y += Math.sin(angulo) * vel;

        // Contacto = daño + retirada
        if (dist < 30 && tiburon.cooldownDano <= 0 && this.invulnerabilidad <= 0) {
          jugador.vida = Math.max(0, jugador.vida - 10);
          this.invulnerabilidad = 1.5;
          tiburon.cooldownDano = 2.0;
          // Tras morder, retirarse 1.5 segundos antes de volver a atacar
          tiburon.retirada = 1.5;
          this.sfx.dano();
          this.sfx.tiburonAlerta();
          const textos = this._obtenerTextos();
          if (this.juego && this.juego.mostrarToast) {
            this.juego.mostrarToast(
              textos?.dialogos?.santuario?.tiburonAlerta
              || '🦈 ¡Tiburón cerca! ¡Aléjate!'
            );
          }
        }
      } else {
        // Patrullar entre waypoints
        tiburon.persiguiendo = false;
        tiburon.fase += dt * tiburon.velocidad;
        const t = (Math.sin(tiburon.fase) + 1) / 2;
        tiburon.x = tiburon.puntoA.x + (tiburon.puntoB.x - tiburon.puntoA.x) * t;
        tiburon.y = tiburon.puntoA.y + (tiburon.puntoB.y - tiburon.puntoA.y) * t;
      }
      // Dirección: el tiburón mira hacia donde se mueve
      if (Math.abs(tiburon.x - prevX) > 0.01) {
        tiburon.mirandoDerecha = tiburon.x > prevX;
      }
    }

    // --- Tortuga verde: circuito ovalado ---
    const tortuga = this.npcs.find(n => n.id === 'tortugaVerde');
    if (tortuga && tortuga.centroX !== undefined) {
      const prevTortX = tortuga.x;
      tortuga.fase += dt * 0.3;
      tortuga.x = tortuga.centroX + Math.cos(tortuga.fase) * tortuga.radioX;
      tortuga.y = tortuga.centroY + Math.sin(tortuga.fase) * tortuga.radioY;
      // Dirección: la tortuga mira hacia donde nada
      if (Math.abs(tortuga.x - prevTortX) > 0.01) {
        tortuga.mirandoDerecha = tortuga.x > prevTortX;
      }
    }

    // --- Interacción con NPCs ---
    for (const npc of this.npcs) {
      if (npc._oculto) continue;
      if (this._estaCerca(jugador, npc, 45)) {
        if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
          this.bloqueoEntrada = true;
          this._hablarConNPC(npc, jugador);
        }
      }
    }

    // --- Interacción con red fantasma (liberar manatí) ---
    if (this.redFantasma.activa && !this.manatiLiberado) {
      if (this._estaCerca(jugador, this.redFantasma, 50)) {
        if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
          this.bloqueoEntrada = true;
          if (this.biologaHablada) {
            this._liberarManati();
          } else {
            const textos = this._obtenerTextos();
            this.dialogos.iniciarDialogo([{
              personaje: '💭',
              texto: textos?.dialogos?.santuario?.necesitasBiologa
                || 'Necesitas hablar con la bióloga primero para saber cómo liberar al manatí.'
            }]);
          }
        }
      }
    }

    // --- Recoger desechos del arrecife ---
    for (let i = 0; i < this.desechos.length; i++) {
      const desecho = this.desechos[i];
      if (desecho.recogido) continue;
      if (this._estaCerca(jugador, desecho, 25)) {
        if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
          this.bloqueoEntrada = true;
          if (this.tortugaHablada) {
            this._recogerDesecho(i);
          } else {
            const textos = this._obtenerTextos();
            this.dialogos.iniciarDialogo([{
              personaje: '💭',
              texto: textos?.dialogos?.santuario?.necesitasTortuga
                || 'Habla con la tortuga verde para entender por qué la limpieza es importante.'
            }]);
          }
        }
      }
    }

    // --- Recoger objetos coleccionables ---
    for (const obj of this.objetos) {
      if (obj.recogido) continue;
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
            color: '#A0A0A0',
            esUsable: false
          });
        }

        if (this.juego && this.juego.mostrarToast) {
          this.juego.mostrarToast(`🦷 ${nombreObjeto} — ${textos?.ui?.itemAnadido || 'ítem añadido al inventario'}`);
        }
      }
    }

    // --- Verificar misión completada ---
    if (this.manatiLiberado && this.limpiezaCompleta) {
      const textos = this._obtenerTextos();
      this.misionActual = textos?.dialogos?.santuario?.misionCompleta
        || '¡Santuario protegido! Vuelve al mapa (M)';
    }

    // --- Actualizar burbujas ---
    for (const burbuja of this.burbujas) {
      burbuja.y -= burbuja.velocidad * dt * 60;
      burbuja.x += Math.sin(this.tiempoTotal * 2 + burbuja.fase) * 0.3;
      if (burbuja.y < -10) {
        Object.assign(burbuja, this._crearBurbuja());
        burbuja.y = this.altoNivel + 10;
      }
    }

    // --- Pececitos de cardumen ---
    for (const pez of this.pecesEscuela) {
      const prevX = pez.x;
      pez.fase += dt * pez.velocidad;
      const targetX = pez.centroX + pez.offsetX + Math.sin(pez.fase) * 40;
      const targetY = pez.centroY + pez.offsetY + Math.cos(pez.fase * 0.7) * 30;
      pez.x += (targetX - pez.x) * 0.02;
      pez.y += (targetY - pez.y) * 0.02;

      // Huir del jugador si está muy cerca
      const dxP = pez.x - (jugador.x + jugador.ancho / 2);
      const dyP = pez.y - (jugador.y + jugador.alto / 2);
      const distP = Math.sqrt(dxP * dxP + dyP * dyP);
      if (distP < 100) {
        pez.x += (dxP / distP) * 2;
        pez.y += (dyP / distP) * 2;
      }
      // Dirección: el pez mira hacia donde se mueve
      if (Math.abs(pez.x - prevX) > 0.01) {
        pez.mirandoDerecha = pez.x > prevX;
      }
    }

    // --- Tortuguitas decorativas: zigzag lento ---
    for (const tort of this.tortugasBebe) {
      const prevX = tort.x;
      tort.fase += dt * tort.velocidad;
      tort.x += Math.sin(tort.fase) * 0.3;
      tort.y += Math.cos(tort.fase * 0.6) * 0.2;
      // Dirección: la tortuga mira hacia donde se mueve
      if (Math.abs(tort.x - prevX) > 0.001) {
        tort.mirandoDerecha = tort.x > prevX;
      }
    }

    // --- Animación de reunión madre-cría ---
    if (this._reunionManati.activa && !this._reunionManati.terminada) {
      const r = this._reunionManati;
      r.tiempo += dt;

      if (r.fase === 0) {
        // Fase 0: la cría nada suavemente hacia la madre
        const velocidadCria = 40 * dt;
        const dx = r.madreX - r.criaX;
        const dy = r.madreY - r.criaY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 30) {
          const prevCriaX = r.criaX;
          r.criaX += (dx / dist) * velocidadCria;
          r.criaY += (dy / dist) * velocidadCria;
          // Ondulación suave de la cría mientras nada
          r.criaY += Math.sin(r.tiempo * 3) * 0.5;
          // Dirección: la cría mira hacia donde nada
          if (Math.abs(r.criaX - prevCriaX) > 0.01) {
            r.criaMirandoDerecha = r.criaX > prevCriaX;
          }
        } else {
          // Llegó la cría — pasar a fase de encuentro
          r.fase = 1;
          r.tiempo = 0;
        }
      } else if (r.fase === 1) {
        // Fase 1: juntas un momento (2 segundos)
        if (r.tiempo > 2) {
          r.fase = 2;
          r.tiempo = 0;
          // Ambas nadan a la izquierda
          r.madreMirandoDerecha = false;
          r.criaMirandoDerecha = false;
        }
      } else if (r.fase === 2) {
        // Fase 2: nadan juntas hacia la izquierda, fuera de pantalla
        const velocidadSalida = 50 * dt;
        r.madreX -= velocidadSalida;
        r.criaX -= velocidadSalida;
        // Ondulación suave al nadar
        r.madreY += Math.sin(r.tiempo * 2) * 0.3;
        r.criaY += Math.sin(r.tiempo * 2.5 + 1) * 0.3;
        // Cuando salen de pantalla, la animación termina
        if (r.madreX < -150) {
          r.terminada = true;
          r.activa = false;
        }
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
    if (this.ballenasJorobadas.length < 1 && Math.random() < 0.005) {
      this._spawnBallena();
      if (this._cooldownCantoballena <= 0) {
        this._cooldownCantoballena = 30;
        this.sfx.cantoBallenaCerca();
        if (this.juego && this.juego.mostrarToast) {
          const textos = this._obtenerTextos();
          this.juego.mostrarToast(
            textos?.dialogos?.santuario?.cantoBallenaCerca
            || '🐋 ¡Una ballena jorobada canta cerca! Migran aquí cada invierno desde el Atlántico Norte.'
          , 4);
        }
      }
    }

    // --- Salir por borde izquierdo → volver al Mundo Acuático ---
    if (jugador.x <= 20) {
      if (this.juego && this.juego.cambiarEscena) {
        // Marcar spawn especial para que mundo-acuatico posicione al jugador a la derecha
        const mundoAcuatico = this.juego.escenas['mundoAcuatico'];
        if (mundoAcuatico) {
          mundoAcuatico._spawnDesdeSubnivel = true;
        }
        this.juego.cambiarEscena('mundoAcuatico');
        // Mensaje: recogemos el equipo de buceo para explorar aguas profundas
        const textos = this._obtenerTextos();
        if (this.juego.mostrarToast) {
          this.juego.mostrarToast(
            textos?.dialogos?.santuario?.transicionNaufragio
            || '🫧 Recogemos los tanques de oxígeno y el equipo de buceo para explorar las aguas profundas en busca de restos del naufragio...'
          , 6);
        }
      }
      return;
    }

    // --- Volver al mapa con M ---
    if (entrada.estaPresionada('mapa') && !this.bloqueoEntrada) {
      if (this.juego && this.juego.cambiarEscena) {
        this.juego.cambiarEscena('mapaPrincipal');
      }
      this.bloqueoEntrada = true;
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
    // CAPA 1: Fondo — degradado azul-verdoso (aguas costeras)
    // =========================================================
    const gradiente = ctx.createLinearGradient(0, 0, 0, alto);
    gradiente.addColorStop(0, '#0a2a3a');
    gradiente.addColorStop(0.5, '#104040');
    gradiente.addColorStop(1, '#1a4a4a');
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, ancho, alto);

    // =========================================================
    // CAPA 2: Fondo arenoso con pastos marinos
    // =========================================================
    const yArena = alto * 0.7;
    const gradienteArena = ctx.createLinearGradient(0, yArena, 0, alto);
    gradienteArena.addColorStop(0, 'rgba(160, 170, 120, 0.1)');
    gradienteArena.addColorStop(1, 'rgba(160, 170, 120, 0.25)');
    ctx.fillStyle = gradienteArena;
    ctx.fillRect(0, yArena, ancho, alto - yArena);

    // Textura de arena
    ctx.fillStyle = 'rgba(180, 180, 140, 0.05)';
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
    for (const ballena of this.ballenasJorobadas) {
      this._dibujarBallenaJorobada(ctx, ballena, offsetX, offsetY);
    }

    // =========================================================
    // CAPA 3: Praderas de pasto marino (Bezier animado)
    // =========================================================
    for (const alga of this.algas) {
      this._dibujarAlgaMarina(ctx, alga, offsetX, offsetY);
    }

    // =========================================================
    // CAPA 3b: Esponjas
    // =========================================================
    for (const esponja of this.esponjas) {
      this._dibujarEsponja(ctx, esponja, offsetX, offsetY);
    }

    // =========================================================
    // CAPA 4: Corales decorativos
    // =========================================================
    for (const coral of this.corales) {
      this._dibujarCoral(ctx, coral, offsetX, offsetY);
    }

    // =========================================================
    // CAPA 4b: Estructuras con colisión
    // =========================================================
    for (const est of this.estructuras) {
      this._dibujarEstructura(ctx, est.x + offsetX, est.y + offsetY, est);
    }

    // =========================================================
    // CAPA 5: Desechos en el arrecife
    // =========================================================
    for (const desecho of this.desechos) {
      if (desecho.recogido) continue;
      this._dibujarDesecho(ctx, desecho, offsetX, offsetY);
    }

    // =========================================================
    // CAPA 5b: Red fantasma + manatí adulto + reunión madre-cría
    // =========================================================
    if (this.redFantasma.activa) {
      // Antes de ser liberado: madre atrapada en la red
      this._dibujarManatiAdulto(ctx, this.redFantasma, offsetX, offsetY);
      this._dibujarRedFantasma(ctx, this.redFantasma, offsetX, offsetY);
    } else if (this._reunionManati.activa && !this._reunionManati.terminada) {
      // Después de liberada: animación de reunión madre-cría
      const r = this._reunionManati;

      // Dibujar madre (ya libre, expresión feliz)
      this._dibujarManatiLibre(ctx, r.madreX + offsetX, r.madreY + offsetY, 1.0, r.madreMirandoDerecha);

      // Dibujar cría (más pequeña)
      this._dibujarManatiCria(ctx, r.criaX + offsetX, r.criaY + offsetY, r.criaMirandoDerecha);
    }

    // =========================================================
    // CAPA 5c: Objetos coleccionables
    // =========================================================
    for (const obj of this.objetos) {
      if (obj.recogido) continue;
      const ox = obj.x + offsetX;
      const oy = obj.y + offsetY;

      // Brillo pulsante
      const brillo = 0.5 + Math.sin(this.tiempoTotal * 3) * 0.3;
      ctx.fillStyle = `rgba(180, 180, 180, ${brillo})`;
      ctx.beginPath();
      ctx.arc(ox + 8, oy + 8, 12, 0, Math.PI * 2);
      ctx.fill();

      // Diente de tiburón (triángulo)
      ctx.fillStyle = '#C0C0C0';
      ctx.beginPath();
      ctx.moveTo(ox + 8, oy);
      ctx.lineTo(ox + 2, oy + 14);
      ctx.lineTo(ox + 14, oy + 14);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#888888';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // =========================================================
    // CAPA 6: Pececitos de cardumen
    // =========================================================
    for (const pez of this.pecesEscuela) {
      this._dibujarPezEscuela(ctx, pez, offsetX, offsetY);
    }

    // =========================================================
    // CAPA 6b: Tortuguitas decorativas
    // =========================================================
    for (const tort of this.tortugasBebe) {
      this._dibujarTortugaBebe(ctx, tort, offsetX, offsetY);
    }

    // =========================================================
    // CAPA 7: Entidades depth-sorted (NPCs + jugador + compañeros)
    // =========================================================
    const entidades = [];

    for (const npc of this.npcs) {
      if (npc._oculto) continue; // La cría se dibuja en la animación de reunión
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
    // CAPA 8: Tiburones (siempre visibles encima)
    // =========================================================
    for (const tiburon of this.tiburones) {
      this._dibujarTiburon(ctx, tiburon, offsetX, offsetY);
    }

    // =========================================================
    // CAPA 9: Burbujas
    // =========================================================
    for (const burbuja of this.burbujas) {
      const bx = burbuja.x + offsetX;
      const by = burbuja.y + offsetY;
      ctx.fillStyle = `rgba(200, 220, 255, ${burbuja.opacidad})`;
      ctx.beginPath();
      ctx.arc(bx, by, burbuja.radio, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(255, 255, 255, ${burbuja.opacidad * 0.5})`;
      ctx.beginPath();
      ctx.arc(bx - 1, by - 1, burbuja.radio * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // =========================================================
    // CAPA 10: Zona de hélices + lanchas rápidas
    // =========================================================
    this._dibujarZonaHelice(ctx, ancho, offsetY);
    this._dibujarLanchas(ctx, offsetX, offsetY);

    // =========================================================
    // CAPA 11: Tinte de agua + rayos de luz
    // =========================================================
    ctx.fillStyle = 'rgba(15, 50, 80, 0.12)';
    ctx.fillRect(0, 0, ancho, alto);

    for (let r = 0; r < 4; r++) {
      const rx = 150 + r * 250;
      const balanceo = Math.sin(this.tiempoTotal * 0.3 + r * 1.5) * 30;
      const opacidad = 0.03 + Math.sin(this.tiempoTotal * 0.5 + r) * 0.015;

      ctx.fillStyle = `rgba(180, 230, 200, ${opacidad})`;
      ctx.beginPath();
      ctx.moveTo(rx + balanceo, 0);
      ctx.lineTo(rx + balanceo + 40, 0);
      ctx.lineTo(rx + balanceo + 120, alto);
      ctx.lineTo(rx + balanceo + 60, alto);
      ctx.closePath();
      ctx.fill();
    }

    // =========================================================
    // CAPA 12: HUD
    // =========================================================
    renderizador.dibujarBarra(10, 10, 120, 14, jugador.vida / jugador.vidaMaxima,
      '#333333', '#44CC44');
    renderizador.dibujarTexto(textos?.interfaz?.vida || 'Vida', 15, 22, {
      tamano: 10, color: '#FFFFFF'
    });

    // --- Barra de oxígeno (azul, parpadea en rojo cuando baja) ---
    const oxiPct = this.oxigeno / this.oxigenoMax;
    const oxiColor = oxiPct < 0.25
      ? (Math.sin(this.tiempoTotal * 8) > 0 ? '#FF4444' : '#CC2222')
      : '#4488DD';
    renderizador.dibujarBarra(140, 10, 100, 14, oxiPct, '#333333', oxiColor);
    renderizador.dibujarTexto(textos?.interfaz?.oxigeno || 'O₂', 145, 22, {
      tamano: 10, color: '#FFFFFF'
    });

    // --- Panel de objetivos ---
    const san = textos?.dialogos?.santuario;
    const npcsHablados = this.npcs.filter(n => n.dialogoHecho).length;
    const totalNPCs = this.npcs.length;
    const colorHablar = npcsHablados >= totalNPCs ? '#44CC44' : '#FFD700';
    const colorManati = this.manatiLiberado ? '#44CC44' : '#FFD700';
    const colorArrecife = this.limpiezaCompleta ? '#44CC44' : '#FFD700';

    // 1. Hablar con habitantes
    renderizador.dibujarTexto(
      `💬 ${san?.objHablar || this._obtenerTextos()?.ui?.hablarHabitantes || 'Hablar con habitantes'}: ${npcsHablados}/${totalNPCs}`, 15, 42,
      { tamano: 10, color: colorHablar }
    );
    // 2. Liberar manatí
    renderizador.dibujarTexto(
      `🐋 ${san?.objManati || 'Liberar al manatí'}: ${this.manatiLiberado ? '✅' : '⬜'}`, 15, 56,
      { tamano: 10, color: colorManati }
    );
    // 3. Limpiar arrecife
    const estadoArrecife = this.limpiezaCompleta ? '✅' : `${this.desechosRecogidos}/3`;
    renderizador.dibujarTexto(
      `🪸 ${san?.objArrecife || 'Limpiar arrecife'}: ${estadoArrecife}`, 15, 70,
      { tamano: 10, color: colorArrecife }
    );

    // 4. Objetos recogidos
    const objRecogidos = this.objetos.filter(o => o.recogido).length;
    renderizador.dibujarTexto(`📦 ${objRecogidos}/${this.objetos.length}`, 15, 84, {
      tamano: 10, color: objRecogidos >= this.objetos.length ? '#44CC44' : '#FFD700'
    });

    // Misión actual
    renderizador.dibujarTexto(this.misionActual, ancho - 10, 20, {
      tamano: 12, color: '#CCCCCC', alineacion: 'right'
    });

    // Indicador de lentitud
    if (this.efectoLentitud > 0) {
      renderizador.dibujarTexto('🦈 ¡Lentitud!', 15, 100, {
        tamano: 10, color: '#CC77FF'
      });
    }

    // Indicador de interacción con red
    if (this.redFantasma.activa && !this.manatiLiberado &&
        this._estaCerca(jugador, this.redFantasma, 50)) {
      const texLiberar = this._obtenerTextos()?.ui?.eLiberarManati || '[E] Liberar manatí';
      renderizador.dibujarTexto(texLiberar, ancho / 2, alto - 40, {
        tamano: 13, color: '#FFD700', alineacion: 'center'
      });
    }

    // --- Diálogo ---
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto, textos);
    }

    // --- Controles ---
    if (!this.dialogos.estaActivo()) {
      const texControles = this._obtenerTextos()?.ui?.controlesNadarInteractuar || 'WASD: nadar | E: interactuar | I: inventario | M: mapa | P: fotos | L: misiones';
      renderizador.dibujarTexto(texControles, ancho / 2, alto - 10, {
        tamano: 10, color: 'rgba(150, 200, 180, 0.6)', alineacion: 'center'
      });
    }
  }

  // ============================================================
  // ACCIONES ECOLÓGICAS
  // ============================================================

  // --- Liberar al manatí atrapado en la red fantasma ---
  _liberarManati() {
    this.manatiLiberado = true;
    this.redFantasma.activa = false;
    this.sfx.redRasgada();
    this.sfx.manatiLlamada();

    // Incrementar acción ecológica solo si no estaba previamente guardado
    if (this.juego && this.juego.progreso && !this.juego.progreso.manatiLiberado) {
      this.juego.progreso.accionesEcologicas = (this.juego.progreso.accionesEcologicas || 0) + 1;
      this.juego.progreso.manatiLiberado = true;
    }

    // Iniciar la animación de reunión madre-cría
    // La cría es el NPC manatiBebe existente — usamos su posición real
    this._reunionManati.activa = true;
    this._reunionManati.fase = 0;
    this._reunionManati.tiempo = 0;
    this._reunionManati.madreX = this.redFantasma.x + this.redFantasma.ancho / 2;
    this._reunionManati.madreY = this.redFantasma.y + this.redFantasma.alto / 2;
    const bebéNPC = this.npcs.find(n => n.id === 'manatiBebe');
    if (bebéNPC) {
      this._reunionManati.criaX = bebéNPC.x + bebéNPC.ancho / 2;
      this._reunionManati.criaY = bebéNPC.y + bebéNPC.alto / 2;
      // Ocultar el NPC durante la animación para no duplicar la cría
      bebéNPC._oculto = true;
    } else {
      this._reunionManati.criaX = this._reunionManati.madreX + 200;
      this._reunionManati.criaY = this._reunionManati.madreY + 40;
    }
    this._reunionManati.terminada = false;

    const textos = this._obtenerTextos();
    this.dialogos.iniciarDialogo([{
      personaje: '🐋 Manatí',
      texto: textos?.dialogos?.santuario?.liberarManati
        || '¡Manatí liberado! La madre y su cría nadan juntas de nuevo.'
    }]);

    if (this.juego && this.juego.mostrarToast) {
      const _t = this._obtenerTextos();
      this.juego.mostrarToast('🐋 ' + (_t?.ui?.accionEcologica || '¡Acción ecológica completada!'));
    }

    // Reputación por liberar al manatí
    if (this.juego && this.juego.reputacion) {
      const textos = this._obtenerTextos();
      this.juego.reputacion.modificar(10,
        textos?.misiones?.rescateManatiReputacion || 'Manatí liberado');
    }

    // Verificar si ambas acciones ecológicas están completas
    this._verificarMisionRescate();
  }

  // --- Recoger un desecho del arrecife ---
  _recogerDesecho(indice) {
    this.desechos[indice].recogido = true;
    this.desechosRecogidos++;
    this.sfx.recoger();

    const textos = this._obtenerTextos();

    if (this.desechosRecogidos >= 3) {
      // Limpieza completa — acción ecológica
      this.limpiezaCompleta = true;

      if (this.juego && this.juego.progreso && !this.juego.progreso.arrecifeLimpiado) {
        this.juego.progreso.accionesEcologicas = (this.juego.progreso.accionesEcologicas || 0) + 1;
        this.juego.progreso.arrecifeLimpiado = true;
      }

      this.dialogos.iniciarDialogo([{
        personaje: '🐢 Tortuga Verde',
        texto: textos?.dialogos?.santuario?.limpiezaCompleta
          || '¡Arrecife limpiado! Los corales podrán recuperarse sin basura.'
      }]);

      if (this.juego && this.juego.mostrarToast) {
        const _t = this._obtenerTextos();
        this.juego.mostrarToast('🪸 ' + (_t?.ui?.accionEcologica || '¡Acción ecológica completada!'));
      }

      // Reputación por limpiar el arrecife
      if (this.juego && this.juego.reputacion) {
        this.juego.reputacion.modificar(10,
          textos?.misiones?.limpiezaReputacion || 'Arrecife limpiado');
      }

      // Verificar si ambas acciones ecológicas están completas
      this._verificarMisionRescate();
    } else {
      if (this.juego && this.juego.mostrarToast) {
        this.juego.mostrarToast(
          `${textos?.dialogos?.santuario?.recogerDesecho || 'Desecho recogido'} (${this.desechosRecogidos}/3)`
        );
      }
    }
  }

  // --- Verificar si la misión de rescate está completa (ambas acciones) ---
  _verificarMisionRescate() {
    if (!this.manatiLiberado || !this.limpiezaCompleta) return;
    if (!this.juego) return;

    // Completar la misión secundaria
    if (this.juego.misiones && this.juego.misiones.estaEnProgreso('rescateManati')) {
      this.juego.misiones.completar('rescateManati');

      // Marcar en el registro de juego
      if (this.juego.registro) {
        const textos = this._obtenerTextos();
        const titulo = textos?.misiones?.rescateManatiTitulo || 'Rescate del manatí';
        this.juego.registro.marcarCompletada(titulo);
      }

      if (this.juego.mostrarToast) {
        const _t = this._obtenerTextos();
        const _titulo = _t?.misiones?.rescateManatiTitulo || 'Rescate del manatí';
        this.juego.mostrarToast((_t?.ui?.misionCompletada || '✅ ¡Misión completada:') + ' ' + _titulo + '!');
      }
    }
  }

  // ============================================================
  // DIBUJO DE ELEMENTOS
  // ============================================================

  // --- Dibujar estructura de coral (con colisión) ---
  _dibujarEstructura(ctx, x, y, est) {
    const a = est.ancho;
    const h = est.alto;

    if (est.tipo === 'coralCerebro') {
      // Coral cerebro — hemisferio 3D con surcos meándricos realistas
      const cx = x + a / 2;
      const cy = y + h / 2;
      const rx = a / 2;
      const ry = h / 2;
      // Gradiente radial para volumen 3D
      const gCerebro = ctx.createRadialGradient(
        cx - rx * 0.2, cy - ry * 0.25, rx * 0.1,
        cx, cy, rx
      );
      gCerebro.addColorStop(0, '#D8B08A');
      gCerebro.addColorStop(0.4, '#C4956A');
      gCerebro.addColorStop(0.8, '#9A7050');
      gCerebro.addColorStop(1, '#6B4530');
      ctx.fillStyle = gCerebro;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      // Surcos meándricos — clipeados a la forma del coral
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx - 2, ry - 2, 0, 0, Math.PI * 2);
      ctx.clip();
      // Surcos principales (líneas gruesas serpeteantes)
      ctx.strokeStyle = '#6B4030';
      ctx.lineWidth = 2;
      const pasos = Math.round(h / 7);
      for (let i = -pasos; i <= pasos; i++) {
        ctx.beginPath();
        const sy = cy + i * 3.8;
        const zigzag = i % 2 === 0 ? 1 : -1;
        ctx.moveTo(x + 2, sy);
        // Ondulación triple para efecto meándrico natural
        ctx.bezierCurveTo(
          cx - rx * 0.5, sy + zigzag * 5,
          cx - rx * 0.15, sy - zigzag * 4,
          cx, sy + zigzag * 2
        );
        ctx.bezierCurveTo(
          cx + rx * 0.15, sy + zigzag * 5,
          cx + rx * 0.5, sy - zigzag * 3,
          x + a - 2, sy + zigzag * 1
        );
        ctx.stroke();
      }
      // Valles entre surcos (más finos, más oscuros)
      ctx.strokeStyle = 'rgba(80, 45, 25, 0.35)';
      ctx.lineWidth = 0.7;
      for (let i = -pasos; i < pasos; i++) {
        ctx.beginPath();
        const sy = cy + i * 3.8 + 1.9;
        ctx.moveTo(x + 8, sy);
        ctx.bezierCurveTo(cx - rx * 0.3, sy - 2, cx + rx * 0.3, sy + 2, x + a - 8, sy);
        ctx.stroke();
      }
      ctx.restore();
      // Brillo húmedo (reflejo especular)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.beginPath();
      ctx.ellipse(cx - rx * 0.2, cy - ry * 0.3, rx * 0.35, ry * 0.2, -0.3, 0, Math.PI * 2);
      ctx.fill();
      // Sombra sutil debajo
      ctx.fillStyle = 'rgba(40, 20, 5, 0.12)';
      ctx.beginPath();
      ctx.ellipse(cx + 2, cy + ry - 2, rx * 0.7, 3, 0, 0, Math.PI);
      ctx.fill();
    } else if (est.tipo === 'coralCuerno') {
      // Coral cuerno de alce — ramas que salen de una base
      ctx.fillStyle = '#CC9955';
      ctx.fillRect(x + a / 2 - 10, y + h - 15, 20, 15);
      // Ramas
      ctx.strokeStyle = '#CC9955';
      ctx.lineWidth = 4;
      for (let i = 0; i < 5; i++) {
        const angulo = -Math.PI * 0.8 + i * (Math.PI * 0.6 / 4);
        ctx.beginPath();
        ctx.moveTo(x + a / 2, y + h - 10);
        ctx.lineTo(
          x + a / 2 + Math.cos(angulo) * (a / 2 - 5),
          y + h - 10 + Math.sin(angulo) * (h - 10)
        );
        ctx.stroke();
      }
    } else if (est.tipo === 'coralAbanico') {
      // Coral abanico (gorgonia) — abanico con red de venación ramificada
      const fx = x + a / 2;
      const fy = y + h;
      // Tallo leñoso
      ctx.strokeStyle = '#6A3040';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.quadraticCurveTo(fx - 1, fy - h * 0.3, fx, fy - h * 0.15);
      ctx.stroke();
      ctx.strokeStyle = '#8A4858';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(fx + 1, fy - 2);
      ctx.lineTo(fx + 1, fy - h * 0.12);
      ctx.stroke();
      // Abanico con gradiente radial
      const gFan = ctx.createRadialGradient(
        fx, y + h * 0.4, a * 0.05,
        fx, y + h * 0.35, a * 0.55
      );
      gFan.addColorStop(0, 'rgba(220, 100, 160, 0.7)');
      gFan.addColorStop(0.5, 'rgba(190, 70, 130, 0.5)');
      gFan.addColorStop(1, 'rgba(160, 50, 110, 0.12)');
      ctx.fillStyle = gFan;
      ctx.beginPath();
      ctx.moveTo(fx, fy - h * 0.1);
      ctx.quadraticCurveTo(x - 2, y + h * 0.2, fx, y - 5);
      ctx.quadraticCurveTo(x + a + 2, y + h * 0.2, fx, fy - h * 0.1);
      ctx.fill();
      // Vena central
      ctx.strokeStyle = 'rgba(180, 70, 120, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(fx, fy - h * 0.1);
      ctx.lineTo(fx, y);
      ctx.stroke();
      // Venas radiales con bifurcación
      ctx.strokeStyle = 'rgba(170, 65, 115, 0.45)';
      ctx.lineWidth = 1;
      const numVenas = 8;
      for (let v = 0; v < numVenas; v++) {
        const ang = -Math.PI * 0.42 + v * (Math.PI * 0.84 / (numVenas - 1));
        const largo = (h * 0.8) * (1 - Math.abs(ang) * 0.3);
        const vx = fx + Math.sin(ang) * largo * 0.55;
        const vy = fy - h * 0.1 - Math.cos(ang) * largo;
        ctx.beginPath();
        ctx.moveTo(fx, fy - h * 0.15);
        ctx.quadraticCurveTo(
          fx + Math.sin(ang) * largo * 0.3,
          fy - h * 0.1 - Math.cos(ang) * largo * 0.5,
          vx, vy
        );
        ctx.stroke();
        // Sub-venas
        ctx.strokeStyle = 'rgba(160, 60, 110, 0.25)';
        ctx.lineWidth = 0.5;
        const mx = fx + Math.sin(ang) * largo * 0.3;
        const my = fy - h * 0.1 - Math.cos(ang) * largo * 0.45;
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(vx + Math.sin(ang + 0.4) * 6, vy - 4);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(vx + Math.sin(ang - 0.4) * 6, vy - 3);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(170, 65, 115, 0.45)';
        ctx.lineWidth = 1;
      }
      // Malla de interconexión (arcos concéntricos = red de gorgonia)
      ctx.strokeStyle = 'rgba(150, 55, 100, 0.15)';
      ctx.lineWidth = 0.4;
      for (let r = h * 0.2; r < h * 0.75; r += h * 0.15) {
        ctx.beginPath();
        ctx.arc(fx, fy - h * 0.1, r, -Math.PI * 0.82, -Math.PI * 0.18);
        ctx.stroke();
      }
    } else if (est.tipo === 'coralMesa') {
      // Coral de mesa — tronco con plataforma plana arriba
      ctx.fillStyle = '#A07050';
      ctx.fillRect(x + a / 2 - 8, y + h * 0.4, 16, h * 0.6);
      // Plataforma
      ctx.fillStyle = '#B08060';
      ctx.beginPath();
      ctx.ellipse(x + a / 2, y + h * 0.4, a / 2, h * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      // Anillos
      ctx.strokeStyle = '#907050';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.ellipse(x + a / 2, y + h * 0.4, a / 3, h * 0.15, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Nombre
    ctx.font = '9px monospace';
    ctx.fillStyle = 'rgba(200, 220, 200, 0.5)';
    ctx.textAlign = 'center';
    ctx.fillText(est.nombre, x + a / 2, y + h + 15);
    ctx.textAlign = 'left';
  }

  // --- Dibujar coral decorativo (sin colisión) ---
  // Corales realistas con formas orgánicas, sin burbujas ni efectos circulares
  _dibujarCoral(ctx, coral, offsetX, offsetY) {
    const cx = coral.x + offsetX;
    const cy = coral.y + offsetY;
    const s = coral.escala;
    // Balanceo sutil con la corriente marina
    const balanceo = Math.sin(this.tiempoTotal * 0.5 + coral.fase) * 1.5;

    if (coral.tipo === 'brain') {
      // Coral cerebro — hemisferio 3D con surcos meándricos realistas
      const rx = 20 * s, ry = 16 * s;
      // Gradiente radial para volumen 3D
      const gCerebro = ctx.createRadialGradient(
        cx - rx * 0.2, cy - ry * 0.25, rx * 0.1,
        cx, cy, rx
      );
      gCerebro.addColorStop(0, '#D8B08A');
      gCerebro.addColorStop(0.4, '#C4956A');
      gCerebro.addColorStop(0.8, '#9A7050');
      gCerebro.addColorStop(1, '#6B4530');
      ctx.fillStyle = gCerebro;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      // Surcos meándricos clipeados a la forma
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx - 1, ry - 1, 0, 0, Math.PI * 2);
      ctx.clip();
      ctx.strokeStyle = '#6B4030';
      ctx.lineWidth = 1.8 * s;
      for (let i = -4; i <= 4; i++) {
        ctx.beginPath();
        const sy = cy + i * 3.5 * s;
        const zigzag = i % 2 === 0 ? 1 : -1;
        ctx.moveTo(cx - rx, sy);
        ctx.bezierCurveTo(
          cx - rx * 0.5, sy + zigzag * 4 * s,
          cx - rx * 0.15, sy - zigzag * 3 * s,
          cx, sy + zigzag * 1.5 * s
        );
        ctx.bezierCurveTo(
          cx + rx * 0.15, sy + zigzag * 4 * s,
          cx + rx * 0.5, sy - zigzag * 2.5 * s,
          cx + rx, sy + zigzag * 1 * s
        );
        ctx.stroke();
      }
      // Valles intermedios
      ctx.strokeStyle = 'rgba(80, 45, 25, 0.35)';
      ctx.lineWidth = 0.5 * s;
      for (let i = -4; i < 4; i++) {
        ctx.beginPath();
        const sy = cy + i * 3.5 * s + 1.75 * s;
        ctx.moveTo(cx - rx * 0.7, sy);
        ctx.bezierCurveTo(cx - rx * 0.2, sy - 1.5 * s, cx + rx * 0.2, sy + 1.5 * s, cx + rx * 0.7, sy);
        ctx.stroke();
      }
      ctx.restore();
      // Brillo húmedo
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.beginPath();
      ctx.ellipse(cx - rx * 0.2, cy - ry * 0.3, rx * 0.3, ry * 0.15, -0.3, 0, Math.PI * 2);
      ctx.fill();
      // Sombra debajo
      ctx.fillStyle = 'rgba(40, 20, 5, 0.12)';
      ctx.beginPath();
      ctx.ellipse(cx + 1, cy + ry - 1, rx * 0.6, 2 * s, 0, 0, Math.PI);
      ctx.fill();

    } else if (coral.tipo === 'staghorn') {
      // Coral cuerno de ciervo — ramas bifurcadas que crecen hacia arriba
      const baseY = cy + 10 * s;
      // Tronco principal
      ctx.strokeStyle = '#D4A855';
      ctx.lineCap = 'round';
      ctx.lineWidth = 4 * s;
      ctx.beginPath();
      ctx.moveTo(cx + balanceo * 0.3, baseY);
      ctx.lineTo(cx + balanceo * 0.5, cy - 5 * s);
      ctx.stroke();
      // Ramas bifurcadas
      const ramas = [
        { dx: -12, dy: -22, dx2: -18, dy2: -28 },
        { dx: 8, dy: -20, dx2: 15, dy2: -30 },
        { dx: -5, dy: -18, dx2: -10, dy2: -32 },
        { dx: 3, dy: -15, dx2: 12, dy2: -25 },
        { dx: -8, dy: -12, dx2: -20, dy2: -20 }
      ];
      ctx.lineWidth = 2.5 * s;
      for (const r of ramas) {
        ctx.strokeStyle = '#CCA050';
        ctx.beginPath();
        ctx.moveTo(cx + balanceo * 0.5, cy - 5 * s);
        ctx.quadraticCurveTo(
          cx + r.dx * s + balanceo, cy + r.dy * s,
          cx + r.dx2 * s + balanceo, cy + r.dy2 * s
        );
        ctx.stroke();
        // Punta más clara
        ctx.strokeStyle = '#E0C070';
        ctx.lineWidth = 1.5 * s;
        ctx.beginPath();
        ctx.arc(cx + r.dx2 * s + balanceo, cy + r.dy2 * s, 1.5 * s, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 2.5 * s;
      }

    } else if (coral.tipo === 'fan') {
      // Coral abanico (gorgonia) — abanico con red de venación ramificada
      ctx.save();
      ctx.translate(cx + balanceo, cy);
      // Tallo leñoso con textura
      ctx.strokeStyle = '#6A3040';
      ctx.lineWidth = 3 * s;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, 15 * s);
      ctx.quadraticCurveTo(-0.5 * s, 8 * s, 0, 2 * s);
      ctx.stroke();
      ctx.strokeStyle = '#8A4858';
      ctx.lineWidth = 1.5 * s;
      ctx.beginPath();
      ctx.moveTo(0.5 * s, 13 * s);
      ctx.lineTo(0.5 * s, 3 * s);
      ctx.stroke();
      // Abanico con gradiente radial
      const grad = ctx.createRadialGradient(0, -5 * s, 2 * s, 0, -5 * s, 20 * s);
      grad.addColorStop(0, 'rgba(220, 100, 160, 0.7)');
      grad.addColorStop(0.5, 'rgba(190, 70, 130, 0.5)');
      grad.addColorStop(1, 'rgba(160, 50, 110, 0.12)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, 10 * s);
      ctx.bezierCurveTo(-18 * s, -2 * s, -16 * s, -20 * s, 0, -22 * s);
      ctx.bezierCurveTo(16 * s, -20 * s, 18 * s, -2 * s, 0, 10 * s);
      ctx.fill();
      // Vena central
      ctx.strokeStyle = 'rgba(180, 70, 120, 0.6)';
      ctx.lineWidth = 1.2 * s;
      ctx.beginPath();
      ctx.moveTo(0, 8 * s);
      ctx.lineTo(0, -20 * s);
      ctx.stroke();
      // Venas radiales con bifurcación
      ctx.strokeStyle = 'rgba(170, 65, 115, 0.45)';
      ctx.lineWidth = 0.8 * s;
      const venasAng = [-0.55, -0.38, -0.2, -0.05, 0.05, 0.2, 0.38, 0.55];
      for (const ang of venasAng) {
        const largo = 17 * s * (1 - Math.abs(ang) * 0.4);
        const vx = Math.sin(ang) * largo;
        const vy = 4 * s - Math.cos(ang) * largo;
        ctx.beginPath();
        ctx.moveTo(0, 5 * s);
        ctx.quadraticCurveTo(
          Math.sin(ang) * largo * 0.4,
          4 * s - Math.cos(ang) * largo * 0.5,
          vx, vy
        );
        ctx.stroke();
        // Sub-venas (ramificación)
        ctx.strokeStyle = 'rgba(160, 60, 110, 0.25)';
        ctx.lineWidth = 0.4 * s;
        const mx = Math.sin(ang) * largo * 0.4;
        const my = 4 * s - Math.cos(ang) * largo * 0.45;
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(vx + Math.sin(ang + 0.35) * 4 * s, vy - 3 * s);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(170, 65, 115, 0.45)';
        ctx.lineWidth = 0.8 * s;
      }
      // Malla de interconexión (arcos concéntricos)
      ctx.strokeStyle = 'rgba(150, 55, 100, 0.15)';
      ctx.lineWidth = 0.3 * s;
      for (let r = 5 * s; r <= 16 * s; r += 4 * s) {
        ctx.beginPath();
        ctx.arc(0, 4 * s, r, -Math.PI * 0.85, -Math.PI * 0.15);
        ctx.stroke();
      }
      ctx.restore();

    } else if (coral.tipo === 'table') {
      // Coral de mesa — plataforma horizontal sobre un tronco
      ctx.save();
      ctx.translate(cx + balanceo * 0.3, cy);
      // Tronco
      ctx.fillStyle = '#9A7550';
      ctx.beginPath();
      ctx.moveTo(-3 * s, 12 * s);
      ctx.lineTo(3 * s, 12 * s);
      ctx.lineTo(2 * s, 0);
      ctx.lineTo(-2 * s, 0);
      ctx.closePath();
      ctx.fill();
      // Plataforma (elipse aplanada)
      ctx.fillStyle = '#B09060';
      ctx.beginPath();
      ctx.ellipse(0, 0, 22 * s, 5 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      // Borde más oscuro debajo
      ctx.strokeStyle = '#806040';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 2 * s, 20 * s, 4 * s, 0, 0.1, Math.PI - 0.1);
      ctx.stroke();
      // Líneas concéntricas de crecimiento
      ctx.strokeStyle = 'rgba(110, 80, 50, 0.3)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, 14 * s, 3 * s, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, 0, 8 * s, 2 * s, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  // --- Dibujar pradera de pasto marino (algas con Bezier) ---
  _dibujarAlgaMarina(ctx, alga, offsetX, offsetY) {
    const ax = alga.x + offsetX;
    const ay = alga.y + offsetY;

    ctx.strokeStyle = alga.color;
    ctx.lineCap = 'round';

    for (const hoja of alga.hojas) {
      const bx = ax + hoja.offsetX;
      const balanceo = Math.sin(this.tiempoTotal * 1.2 + hoja.fase) * 8;

      ctx.lineWidth = hoja.grosor;
      ctx.beginPath();
      ctx.moveTo(bx, ay);
      // Curva Bezier cuadrática que se balancea con la corriente
      ctx.quadraticCurveTo(
        bx + balanceo, ay - hoja.altura * 0.6,
        bx + balanceo * 0.5, ay - hoja.altura
      );
      ctx.stroke();
    }
  }

  // --- Dibujar esponja marina ---
  _dibujarEsponja(ctx, esponja, offsetX, offsetY) {
    const sx = esponja.x + offsetX;
    const sy = esponja.y + offsetY;
    // Animación de pulso ±5%
    const pulso = 1 + Math.sin(this.tiempoTotal * 1.5 + esponja.fase) * 0.05;

    if (esponja.tipo === 'barrel') {
      // Esponja barril — cilindro redondeado
      ctx.fillStyle = '#8B6050';
      ctx.beginPath();
      ctx.ellipse(sx, sy, 12 * pulso, 18 * pulso, 0, 0, Math.PI * 2);
      ctx.fill();
      // Abertura superior
      ctx.fillStyle = '#6B4030';
      ctx.beginPath();
      ctx.ellipse(sx, sy - 14 * pulso, 8 * pulso, 4 * pulso, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (esponja.tipo === 'tube') {
      // Esponja tubular — varios tubos verticales
      ctx.fillStyle = '#9B7040';
      for (let t = -1; t <= 1; t++) {
        ctx.fillRect(sx + t * 8 - 3, sy - 20 * pulso, 6, 20 * pulso);
        ctx.fillStyle = '#7B5020';
        ctx.beginPath();
        ctx.ellipse(sx + t * 8, sy - 20 * pulso, 4, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#9B7040';
      }
    }
  }

  // --- Dibujar pececito de cardumen ---
  _dibujarPezEscuela(ctx, pez, offsetX, offsetY) {
    const px = pez.x + offsetX;
    const py = pez.y + offsetY;
    const colaWave = Math.sin(this.tiempoTotal * 8 + pez.fase) * 3;

    // Espejo horizontal: si nada a la izquierda, invertir sprite
    ctx.save();
    if (pez.mirandoDerecha === false) {
      ctx.translate(px, py);
      ctx.scale(-1, 1);
      ctx.translate(-px, -py);
    }

    // Cuerpo (polígono 15×8)
    ctx.fillStyle = pez.color;
    ctx.beginPath();
    ctx.moveTo(px + 15, py);          // Nariz
    ctx.lineTo(px + 10, py - 4);      // Dorso
    ctx.lineTo(px, py - 2);           // Cola arriba
    ctx.lineTo(px - 3 + colaWave, py - 5); // Aleta caudal arriba
    ctx.lineTo(px - 3 + colaWave, py + 5); // Aleta caudal abajo
    ctx.lineTo(px, py + 2);           // Cola abajo
    ctx.lineTo(px + 10, py + 4);      // Vientre
    ctx.closePath();
    ctx.fill();

    // Ojo
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(px + 11, py - 1, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // --- Dibujar tortuguita bebé decorativa ---
  _dibujarTortugaBebe(ctx, tort, offsetX, offsetY) {
    const tx = tort.x + offsetX;
    const ty = tort.y + offsetY;
    const aletoWave = Math.sin(this.tiempoTotal * 3 + tort.fase) * 0.3;

    // Espejo horizontal: si nada a la izquierda, invertir sprite
    ctx.save();
    if (tort.mirandoDerecha === false) {
      ctx.translate(tx, ty);
      ctx.scale(-1, 1);
      ctx.translate(-tx, -ty);
    }

    // Caparazón (elipse 18×12)
    ctx.fillStyle = '#5A8A3A';
    ctx.beginPath();
    ctx.ellipse(tx, ty, 9, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Patrón del caparazón
    ctx.strokeStyle = '#4A7A2A';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.ellipse(tx, ty, 5, 3, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Cabeza
    ctx.fillStyle = '#4A7A2A';
    ctx.beginPath();
    ctx.arc(tx + 10, ty, 3, 0, Math.PI * 2);
    ctx.fill();

    // Aletas con animación
    ctx.fillRect(tx - 6, ty - 6 + aletoWave * 5, 4, 3);
    ctx.fillRect(tx - 6, ty + 3 - aletoWave * 5, 4, 3);
    ctx.fillRect(tx + 4, ty - 6 + aletoWave * 5, 4, 3);
    ctx.fillRect(tx + 4, ty + 3 - aletoWave * 5, 4, 3);

    // Ojo
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(tx + 11, ty - 1, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // --- Dibujar tiburón ---
  // Cuerpo aerodinámico con curvas suaves (bezier), más largo y estilizado,
  // adelgazándose progresivamente hacia la cola
  _dibujarTiburon(ctx, tiburon, offsetX, offsetY) {
    const sx = tiburon.x + offsetX;
    const sy = tiburon.y + offsetY;
    const colaWave = Math.sin(this.tiempoTotal * 4 + tiburon.fase) * 6;
    // Sprite más largo: 100px de ancho, 26px de alto centrado en sy+13
    const largo = 100;
    const cy = sy + 13; // eje central vertical

    // Espejo horizontal: si nada a la izquierda, invertir sprite
    ctx.save();
    if (tiburon.mirandoDerecha === false) {
      ctx.translate(sx + largo / 2, cy);
      ctx.scale(-1, 1);
      ctx.translate(-(sx + largo / 2), -cy);
    }

    // --- Cuerpo principal (curvas bezier suaves) ---
    // Dorso: nariz → lomo grueso → adelgaza hacia la cola
    ctx.fillStyle = '#5A6A7A';
    ctx.beginPath();
    ctx.moveTo(sx + largo, cy);                          // Punta de la nariz
    ctx.bezierCurveTo(
      sx + 82, cy - 12,                                  // control: dorso frontal
      sx + 55, cy - 14,                                  // control: lomo (punto más alto)
      sx + 30, cy - 8                                    // pedúnculo pre-cola
    );
    ctx.bezierCurveTo(
      sx + 18, cy - 5,                                   // control: estrechamiento
      sx + 10 + colaWave, cy - 3,                        // control: base cola
      sx + colaWave, cy - 12                             // punta cola arriba
    );
    ctx.lineTo(sx + 6 + colaWave, cy);                   // centro cola
    ctx.lineTo(sx + colaWave, cy + 12);                  // punta cola abajo
    ctx.bezierCurveTo(
      sx + 10 + colaWave, cy + 3,                        // control: base cola
      sx + 18, cy + 5,                                   // control: estrechamiento
      sx + 30, cy + 8                                    // pedúnculo post-cola
    );
    ctx.bezierCurveTo(
      sx + 55, cy + 12,                                  // control: vientre
      sx + 82, cy + 10,                                  // control: vientre frontal
      sx + largo, cy                                     // vuelve a la nariz
    );
    ctx.closePath();
    ctx.fill();

    // --- Vientre claro (mitad inferior del cuerpo) ---
    ctx.fillStyle = '#8A9AAA';
    ctx.beginPath();
    ctx.moveTo(sx + 88, cy + 2);
    ctx.bezierCurveTo(sx + 70, cy + 10, sx + 45, cy + 11, sx + 25, cy + 6);
    ctx.bezierCurveTo(sx + 45, cy + 8, sx + 70, cy + 7, sx + 88, cy + 2);
    ctx.closePath();
    ctx.fill();

    // --- Aleta dorsal (curva suave, no triangular) ---
    ctx.fillStyle = '#4A5A6A';
    ctx.beginPath();
    ctx.moveTo(sx + 58, cy - 12);
    ctx.bezierCurveTo(
      sx + 54, cy - 24,                                  // sube curvo
      sx + 48, cy - 24,                                  // punta redondeada
      sx + 44, cy - 13                                   // baja suave
    );
    ctx.closePath();
    ctx.fill();

    // --- Aletas pectorales (forma de gota curva) ---
    ctx.beginPath();
    ctx.moveTo(sx + 72, cy + 6);
    ctx.bezierCurveTo(
      sx + 68, cy + 16,
      sx + 62, cy + 18,
      sx + 58, cy + 10
    );
    ctx.closePath();
    ctx.fill();

    // --- Aleta caudal secundaria (pequeña, cerca de la cola) ---
    ctx.beginPath();
    ctx.moveTo(sx + 22, cy + 6);
    ctx.bezierCurveTo(sx + 20, cy + 10, sx + 17, cy + 10, sx + 16, cy + 6);
    ctx.closePath();
    ctx.fill();

    // --- Hendiduras branquiales (5 líneas suaves) ---
    ctx.strokeStyle = '#4A5A6A';
    ctx.lineWidth = 0.7;
    for (let i = 0; i < 5; i++) {
      const bx = sx + 76 - i * 3;
      ctx.beginPath();
      ctx.moveTo(bx, cy - 4);
      ctx.lineTo(bx - 1, cy + 3);
      ctx.stroke();
    }

    // --- Ojo (rojo si persigue) ---
    ctx.fillStyle = tiburon.persiguiendo ? '#FF3333' : '#222222';
    ctx.beginPath();
    ctx.arc(sx + 86, cy - 2, 2.5, 0, Math.PI * 2);
    ctx.fill();
    // Brillo del ojo
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(sx + 85.5, cy - 3, 0.8, 0, Math.PI * 2);
    ctx.fill();

    // Indicador de peligro (fuera del espejo para que el ⚠ no se invierta)
    ctx.restore();
    if (tiburon.persiguiendo) {
      ctx.font = '12px monospace';
      ctx.fillStyle = 'rgba(255, 50, 50, 0.8)';
      ctx.textAlign = 'center';
      ctx.fillText('⚠', sx + 50, sy - 18);
      ctx.textAlign = 'left';
    }
  }

  // --- Dibujar manatí adulto (atrapado en la red) ---
  _dibujarManatiAdulto(ctx, red, offsetX, offsetY) {
    const mx = red.x + offsetX + red.ancho / 2;
    const my = red.y + offsetY + red.alto / 2;

    // Cuerpo del manatí — forma ovalada grande gris
    ctx.fillStyle = '#7A8A8A';
    ctx.beginPath();
    ctx.ellipse(mx, my, 50, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cabeza redondeada
    ctx.fillStyle = '#6A7A7A';
    ctx.beginPath();
    ctx.arc(mx + 45, my + 3, 18, 0, Math.PI * 2);
    ctx.fill();

    // Hocico
    ctx.fillStyle = '#8A9090';
    ctx.beginPath();
    ctx.ellipse(mx + 58, my + 6, 10, 8, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Cola plana (paleta)
    ctx.fillStyle = '#6A7A7A';
    ctx.beginPath();
    ctx.ellipse(mx - 55, my, 18, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Aletas laterales
    ctx.beginPath();
    ctx.ellipse(mx + 10, my + 22, 12, 5, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(mx + 10, my - 22, 12, 5, -0.5, 0, Math.PI * 2);
    ctx.fill();

    // Ojo
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.arc(mx + 50, my - 2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Expresión triste (boca hacia abajo)
    ctx.strokeStyle = '#555555';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(mx + 55, my + 14, 5, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }

  // --- Dibujar manatí libre (después de ser rescatada, expresión feliz) ---
  _dibujarManatiLibre(ctx, mx, my, escala, mirandoDerecha) {
    // Espejo horizontal: si nada a la izquierda, invertir sprite
    ctx.save();
    if (mirandoDerecha === false) {
      ctx.translate(mx, my);
      ctx.scale(-1, 1);
      ctx.translate(-mx, -my);
    }

    // Cuerpo del manatí — forma ovalada grande gris
    ctx.fillStyle = '#7A8A8A';
    ctx.beginPath();
    ctx.ellipse(mx, my, 50, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cabeza redondeada
    ctx.fillStyle = '#6A7A7A';
    ctx.beginPath();
    ctx.arc(mx + 45, my + 3, 18, 0, Math.PI * 2);
    ctx.fill();

    // Hocico
    ctx.fillStyle = '#8A9090';
    ctx.beginPath();
    ctx.ellipse(mx + 58, my + 6, 10, 8, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Cola plana (paleta) — ondulando suavemente
    const colaOndula = Math.sin(this.tiempoTotal * 2) * 3;
    ctx.fillStyle = '#6A7A7A';
    ctx.beginPath();
    ctx.ellipse(mx - 55, my + colaOndula, 18, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Aletas laterales
    ctx.beginPath();
    ctx.ellipse(mx + 10, my + 22, 12, 5, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(mx + 10, my - 22, 12, 5, -0.5, 0, Math.PI * 2);
    ctx.fill();

    // Ojo
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.arc(mx + 50, my - 2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Expresión feliz (sonrisa hacia arriba)
    ctx.strokeStyle = '#555555';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(mx + 55, my + 10, 5, Math.PI + 0.2, -0.2);
    ctx.stroke();
    ctx.restore();
  }

  // --- Dibujar cría de manatí (bebé más pequeño) ---
  _dibujarManatiCria(ctx, mx, my, mirandoDerecha) {
    // Espejo horizontal: si nada a la izquierda, invertir sprite
    ctx.save();
    if (mirandoDerecha === false) {
      ctx.translate(mx, my);
      ctx.scale(-1, 1);
      ctx.translate(-mx, -my);
    }

    // Cuerpo — más pequeño y redondeado que la madre (escala ~0.5)
    ctx.fillStyle = '#8A9A9A';
    ctx.beginPath();
    ctx.ellipse(mx, my, 25, 13, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cabeza
    ctx.fillStyle = '#7A8A8A';
    ctx.beginPath();
    ctx.arc(mx + 22, my + 2, 10, 0, Math.PI * 2);
    ctx.fill();

    // Hocico pequeño
    ctx.fillStyle = '#9AA0A0';
    ctx.beginPath();
    ctx.ellipse(mx + 29, my + 3, 5, 4, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Cola
    const colaOndula = Math.sin(this.tiempoTotal * 3 + 1) * 2;
    ctx.fillStyle = '#7A8A8A';
    ctx.beginPath();
    ctx.ellipse(mx - 28, my + colaOndula, 10, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Aletas pequeñas
    ctx.beginPath();
    ctx.ellipse(mx + 5, my + 12, 6, 3, 0.5, 0, Math.PI * 2);
    ctx.fill();

    // Ojo
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.arc(mx + 25, my - 1, 2, 0, Math.PI * 2);
    ctx.fill();

    // Sonrisa
    ctx.strokeStyle = '#555555';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(mx + 28, my + 6, 3, Math.PI + 0.3, -0.3);
    ctx.stroke();
    ctx.restore();
  }

  // --- Dibujar red fantasma ---
  _dibujarRedFantasma(ctx, red, offsetX, offsetY) {
    const rx = red.x + offsetX;
    const ry = red.y + offsetY;

    // Red: líneas cruzadas con ondulación
    ctx.strokeStyle = 'rgba(120, 100, 60, 0.5)';
    ctx.lineWidth = 1.5;

    // Líneas horizontales (8)
    for (let i = 0; i <= 8; i++) {
      ctx.beginPath();
      const y = ry + i * (red.alto / 8);
      for (let x = 0; x <= red.ancho; x += 5) {
        const wave = Math.sin(this.tiempoTotal * 1.5 + x * 0.05 + i) * 3;
        if (x === 0) ctx.moveTo(rx + x, y + wave);
        else ctx.lineTo(rx + x, y + wave);
      }
      ctx.stroke();
    }

    // Líneas verticales (6)
    for (let j = 0; j <= 6; j++) {
      ctx.beginPath();
      const x = rx + j * (red.ancho / 6);
      for (let y = 0; y <= red.alto; y += 5) {
        const wave = Math.sin(this.tiempoTotal * 1.5 + y * 0.05 + j) * 3;
        if (y === 0) ctx.moveTo(x + wave, ry + y);
        else ctx.lineTo(x + wave, ry + y);
      }
      ctx.stroke();
    }

    // Pedazos de basura enganchados en la red
    ctx.fillStyle = 'rgba(100, 80, 40, 0.4)';
    ctx.beginPath();
    ctx.arc(rx + 30, ry + 25, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(rx + red.ancho - 35, ry + red.alto - 20, 4, 0, Math.PI * 2);
    ctx.fill();

    // Texto de interacción
    ctx.font = '11px monospace';
    ctx.fillStyle = `rgba(255, 200, 100, ${0.5 + Math.sin(this.tiempoTotal * 3) * 0.3})`;
    ctx.textAlign = 'center';
    const texLib = this._obtenerTextos()?.ui?.eLiberar || '[E] Liberar';
    ctx.fillText(texLib, rx + red.ancho / 2, ry - 10);
    ctx.textAlign = 'left';
  }

  // --- Dibujar desecho en el arrecife ---
  _dibujarDesecho(ctx, desecho, offsetX, offsetY) {
    const dx = desecho.x + offsetX;
    const dy = desecho.y + offsetY;
    const flotacion = Math.sin(this.tiempoTotal * 1.5 + desecho.x) * 2;

    if (desecho.tipo === 'bolsa') {
      // Bolsa de plástico — forma irregular semitransparente
      ctx.fillStyle = 'rgba(200, 200, 200, 0.4)';
      ctx.beginPath();
      ctx.moveTo(dx, dy + flotacion);
      ctx.quadraticCurveTo(dx + 6, dy - 6 + flotacion, dx + 12, dy + flotacion);
      ctx.quadraticCurveTo(dx + 10, dy + 10 + flotacion, dx, dy + flotacion);
      ctx.fill();
    } else if (desecho.tipo === 'botella') {
      // Botella de plástico
      ctx.fillStyle = 'rgba(100, 180, 100, 0.5)';
      ctx.fillRect(dx + 2, dy + flotacion, 10, 8);
      ctx.fillRect(dx + 4, dy - 3 + flotacion, 6, 4);
    } else if (desecho.tipo === 'lata') {
      // Lata oxidada
      ctx.fillStyle = 'rgba(180, 120, 80, 0.6)';
      ctx.beginPath();
      ctx.ellipse(dx + 5, dy + 5 + flotacion, 5, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(150, 100, 60, 0.5)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Indicador de interacción si se puede recoger
    if (this.tortugaHablada) {
      ctx.font = '9px monospace';
      ctx.fillStyle = `rgba(255, 215, 0, ${0.4 + Math.sin(this.tiempoTotal * 3) * 0.3})`;
      ctx.textAlign = 'center';
      ctx.fillText('[E]', dx + 6, dy - 8 + flotacion);
      ctx.textAlign = 'left';
    }
  }

  // --- Dibujar zona de hélices (peligro superior) ---
  _dibujarZonaHelice(ctx, ancho, offsetY) {
    const zy = this.zonaHelice.y + offsetY;
    const zh = this.zonaHelice.alto;

    // Solo mostrar si la zona es visible en pantalla
    if (zy + zh < 0) return;

    // Franja roja parpadeante
    const parpadeo = 0.1 + Math.sin(this.tiempoTotal * 4) * 0.05;
    ctx.fillStyle = `rgba(255, 50, 50, ${parpadeo})`;
    ctx.fillRect(0, zy, ancho, zh);

    // Líneas de advertencia
    ctx.strokeStyle = `rgba(255, 200, 0, ${parpadeo * 2})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(0, zy + zh);
    ctx.lineTo(ancho, zy + zh);
    ctx.stroke();
    ctx.setLineDash([]);

    // Texto de advertencia
    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = `rgba(255, 200, 0, ${0.5 + Math.sin(this.tiempoTotal * 3) * 0.3})`;
    ctx.textAlign = 'center';
    const _t = this._obtenerTextos();
    ctx.fillText(_t?.ui?.helices || '⚠ HÉLICES ⚠', ancho / 2, zy + zh / 2 + 4);
    ctx.textAlign = 'left';
  }

  // --- Crear una lancha rápida que cruce la zona superior ---
  _spawnLancha() {
    const desdeIzquierda = Math.random() > 0.5;
    const dir = desdeIzquierda ? 1 : -1;
    this.lanchas.push({
      x: desdeIzquierda ? -60 : this.anchoNivel + 60,
      y: 15 + Math.random() * 20, // Dentro de la zona de hélices
      vx: dir * (4 + Math.random() * 2), // Muy rápida: 4-6 px/frame
      dir: dir,
      fase: Math.random() * Math.PI * 2,
      yOffset: 0,
      tiempoOla: 0,
      // Color aleatorio del casco
      color: ['#C0392B', '#2980B9', '#F39C12', '#1ABC9C', '#8E44AD'][
        Math.floor(Math.random() * 5)
      ]
    });
    // Sonido de motor al aparecer
    this.sfx.lanchaMotor?.();
  }

  // --- Dibujar lanchas y sus estelas ---
  _dibujarLanchas(ctx, offsetX, offsetY) {
    // Primero las estelas de olas (debajo de las lanchas)
    for (const ola of this._olasDeLancha) {
      const ox = ola.x + offsetX;
      const oy = ola.y + offsetY;
      ctx.strokeStyle = `rgba(255, 255, 255, ${ola.opacidad})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(ox, oy, ola.radio, 0, Math.PI); // Semicírculo = ola
      ctx.stroke();
    }

    // Luego las lanchas
    for (const lancha of this.lanchas) {
      const lx = lancha.x + offsetX;
      const ly = lancha.y + lancha.yOffset + offsetY;

      ctx.save();
      // Voltear si va hacia la izquierda
      if (lancha.dir < 0) {
        ctx.translate(lx, ly);
        ctx.scale(-1, 1);
        ctx.translate(-lx, -ly);
      }

      // --- Casco de la lancha (vista cenital) ---
      // Forma de bote: proa puntiaguda + popa ancha
      ctx.fillStyle = lancha.color;
      ctx.beginPath();
      ctx.moveTo(lx + 25, ly);       // Proa (punta delantera)
      ctx.lineTo(lx + 10, ly - 8);   // Lado superior
      ctx.lineTo(lx - 20, ly - 7);   // Popa superior
      ctx.lineTo(lx - 20, ly + 7);   // Popa inferior
      ctx.lineTo(lx + 10, ly + 8);   // Lado inferior
      ctx.closePath();
      ctx.fill();

      // Borde del casco
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Línea central del casco (quilla)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(lx - 18, ly);
      ctx.lineTo(lx + 22, ly);
      ctx.stroke();

      // Parabrisas
      ctx.fillStyle = 'rgba(150, 200, 255, 0.6)';
      ctx.fillRect(lx + 2, ly - 4, 6, 8);

      // Motor fuera de borda (popa)
      ctx.fillStyle = '#333';
      ctx.fillRect(lx - 23, ly - 4, 5, 8);

      // --- Espuma/estela blanca detrás del motor ---
      const espumaAncho = 15 + Math.sin(this.tiempoTotal * 12) * 3;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.moveTo(lx - 23, ly - 3);
      ctx.lineTo(lx - 23 - espumaAncho, ly - 6 - Math.random() * 2);
      ctx.lineTo(lx - 23 - espumaAncho - 5, ly);
      ctx.lineTo(lx - 23 - espumaAncho, ly + 6 + Math.random() * 2);
      ctx.lineTo(lx - 23, ly + 3);
      ctx.closePath();
      ctx.fill();

      // Salpicaduras laterales (proa cortando el agua)
      const salpicadura = Math.sin(this.tiempoTotal * 15) * 2;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(lx + 20, ly - 9 + salpicadura, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(lx + 20, ly + 9 - salpicadura, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // --- Dibujar NPC ---
  _dibujarNPC(ctx, npc, offsetX, offsetY, jugador) {
    const nx = npc.x + offsetX;
    const ny = npc.y + offsetY;

    if (npc.id === 'biologa') {
      // Bióloga marina — traje de buceo blanco con equipo
      ctx.fillStyle = '#EEEEDD';
      ctx.fillRect(nx, ny, npc.ancho, npc.alto);

      // Cabeza
      ctx.fillStyle = '#D2956A';
      ctx.fillRect(nx + 4, ny - 10, 20, 12);

      // Pelo recogido
      ctx.fillStyle = '#3a2010';
      ctx.fillRect(nx + 3, ny - 13, 22, 6);
      ctx.fillRect(nx + 18, ny - 10, 8, 8);

      // Máscara de buceo
      ctx.fillStyle = 'rgba(100, 220, 255, 0.5)';
      ctx.fillRect(nx + 6, ny - 8, 16, 8);
      ctx.strokeStyle = '#555555';
      ctx.lineWidth = 1;
      ctx.strokeRect(nx + 6, ny - 8, 16, 8);

      // Ojos
      ctx.fillStyle = '#000000';
      ctx.fillRect(nx + 10, ny - 5, 2, 2);
      ctx.fillRect(nx + 16, ny - 5, 2, 2);

      // Tableta impermeable (para datos)
      ctx.fillStyle = '#44AACC';
      ctx.fillRect(nx + npc.ancho + 2, ny + 5, 10, 14);
      ctx.fillStyle = '#88DDFF';
      ctx.fillRect(nx + npc.ancho + 3, ny + 7, 8, 10);

    } else if (npc.id === 'tortugaVerde') {
      // Espejo horizontal: si nada a la izquierda, invertir sprite
      ctx.save();
      if (npc.mirandoDerecha === false) {
        const centroTX = nx + npc.ancho / 2;
        const centroTY = ny + npc.alto / 2;
        ctx.translate(centroTX, centroTY);
        ctx.scale(-1, 1);
        ctx.translate(-centroTX, -centroTY);
      }

      // Tortuga verde — más grande que la carey, verde oliva
      ctx.fillStyle = '#4A7A3A';
      ctx.beginPath();
      ctx.ellipse(nx + npc.ancho / 2, ny + npc.alto / 2, npc.ancho / 2, npc.alto / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Patrón del caparazón (escamas hexagonales sugeridas)
      ctx.strokeStyle = '#3A6A2A';
      ctx.lineWidth = 1;
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.ellipse(nx + npc.ancho / 2 + i * 8, ny + npc.alto / 2, 6, 5, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Cabeza
      ctx.fillStyle = '#3A6A2A';
      ctx.beginPath();
      ctx.arc(nx + npc.ancho + 5, ny + npc.alto / 2, 7, 0, Math.PI * 2);
      ctx.fill();

      // Ojo
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(nx + npc.ancho + 8, ny + npc.alto / 2 - 1, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Aletas animadas — se mueven al nadar como remando
      ctx.fillStyle = '#3A6A2A';
      const aletaVerde = Math.sin(this.tiempoTotal * 3 + (npc.fase || 0)) * 4;
      ctx.fillRect(nx + npc.ancho - 3, ny + 4 + aletaVerde, 7, 5);
      ctx.fillRect(nx - 5, ny + 4 - aletaVerde, 7, 5);
      ctx.fillRect(nx + npc.ancho - 3, ny + npc.alto - 8 - aletaVerde, 7, 5);
      ctx.fillRect(nx - 5, ny + npc.alto - 8 + aletaVerde, 7, 5);
      ctx.restore();

    } else if (npc.id === 'manatiBebe') {
      // Manatí bebé — forma redondeada gris claro
      ctx.fillStyle = '#9AAAAA';
      ctx.beginPath();
      ctx.ellipse(nx + npc.ancho / 2, ny + npc.alto / 2, npc.ancho / 2, npc.alto / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cabeza
      ctx.fillStyle = '#8A9A9A';
      ctx.beginPath();
      ctx.arc(nx + npc.ancho + 3, ny + npc.alto / 2, 8, 0, Math.PI * 2);
      ctx.fill();

      // Hocico redondo
      ctx.fillStyle = '#AABABA';
      ctx.beginPath();
      ctx.ellipse(nx + npc.ancho + 9, ny + npc.alto / 2 + 2, 5, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cola plana
      ctx.fillStyle = '#8A9A9A';
      ctx.beginPath();
      ctx.ellipse(nx - 5, ny + npc.alto / 2, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ojo grande (expresivo)
      ctx.fillStyle = '#333333';
      ctx.beginPath();
      ctx.arc(nx + npc.ancho + 4, ny + npc.alto / 2 - 2, 2.5, 0, Math.PI * 2);
      ctx.fill();
      // Brillo en el ojo
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(nx + npc.ancho + 5, ny + npc.alto / 2 - 3, 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Nombre
    ctx.font = '10px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    const nombreY = npc.id === 'tortugaVerde' ? ny - 10 : ny - 22;
    ctx.fillText(npc.nombre, nx + npc.ancho / 2, nombreY);

    // Indicador de interacción
    if (this._estaCerca(jugador, npc, 45) && !npc.dialogoHecho) {
      const parpadeo = Math.sin(this.tiempoTotal * 4) > 0 ? 1 : 0.4;
      ctx.font = '11px monospace';
      ctx.fillStyle = `rgba(255, 215, 0, ${parpadeo})`;
      const texHablar = this._obtenerTextos()?.ui?.eHablar || '[E] Hablar';
      ctx.fillText(texHablar, nx + npc.ancho / 2, nombreY - 12);
    }

    if (npc.dialogoHecho) {
      ctx.font = 'bold 14px monospace';
      ctx.fillStyle = '#44CC44';
      ctx.fillText('✓', nx + npc.ancho / 2, nombreY - 12);
    }

    ctx.textAlign = 'left';
  }

  // --- Dibujar jugador (versión submarina — copiado de mundo-acuatico) ---
  _dibujarJugador(ctx, jugador, offsetX, offsetY) {
    const px = jugador.x + offsetX;
    const py = jugador.y + offsetY;
    const genero = jugador.genero || 'pepito';

    // Sombra submarina
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.beginPath();
    ctx.ellipse(px + jugador.ancho / 2, py + jugador.alto + 2, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- Rotación de nado: el avatar rota al moverse horizontalmente ---
    ctx.save();
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

    // Máscara de buceo
    ctx.fillStyle = 'rgba(100, 200, 255, 0.4)';
    ctx.fillRect(px + 7, py + 2, 14, 8);
    ctx.strokeStyle = '#444444';
    ctx.lineWidth = 1;
    ctx.strokeRect(px + 7, py + 2, 14, 8);

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

    // Piernas con animación de nadar
    ctx.fillStyle = '#2a5599';
    const pasoAnim = jugador.esAnimando ? Math.sin(jugador.cuadroAnimacion * 5) * 3 : 0;
    ctx.fillRect(px + 6, py + 26 + pasoAnim, 7, 8);
    ctx.fillRect(px + 15, py + 26 - pasoAnim, 7, 8);

    // Aletas de buceo
    ctx.fillStyle = '#2288AA';
    ctx.fillRect(px + 4, py + 32 + pasoAnim, 10, 4);
    ctx.fillRect(px + 14, py + 32 - pasoAnim, 10, 4);

    // Burbujitas al nadar
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

    // Efecto visual de lentitud
    if (this.efectoLentitud > 0) {
      const parpadeo = Math.sin(this.tiempoTotal * 6) * 0.15 + 0.15;
      ctx.fillStyle = `rgba(180, 100, 220, ${parpadeo})`;
      ctx.beginPath();
      ctx.ellipse(px + jugador.ancho / 2, py + jugador.alto / 2, 18, 22, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // --- Hablar con NPC ---
  _hablarConNPC(npc, _jugador) {
    const textos = this._obtenerTextos();
    const san = textos?.dialogos?.santuario;

    if (npc.id === 'biologa') {
      // Verificar si el jugador trae el robot submarino del LFSD
      const tieneRobot = this.juego?.inventario?.objetos.some(o => o.id === 'robotSubmarino');
      const yaEntregoRobot = this.juego?.progreso?.naufragiosRobotDescubiertos === true;

      if (yaEntregoRobot) {
        // Ya entregó el robot — diálogo post-entrega
        this.dialogos.iniciarDialogo([
          { personaje: '🧪 Dra. Sofía', texto: san?.biologaPostRobot || 'El robot sigue escaneando el fondo marino. Cada día encuentra algo nuevo. ¡Gracias por traerlo!' }
        ]);
        npc.dialogoHecho = true;

      } else if (tieneRobot && npc.dialogoHecho) {
        // Tiene el robot y ya habló antes — entregarlo
        this.dialogos.iniciarDialogo([
          { personaje: '🧪 Dra. Sofía', texto: san?.biologaRobot1 || '¡El robot submarino del LFSD! ¡Increíble, lo lograron!' },
          { personaje: '🧪 Dra. Sofía', texto: san?.biologaRobot2 || 'Con esto podré explorar las zonas más profundas del santuario y los arrecifes cercanos.' },
          { personaje: '🧪 Dra. Sofía', texto: san?.biologaRobot3 || '¡Mira! El robot ya detectó señales de 4 naufragios que no teníamos registrados.' },
          { personaje: '🧪 Dra. Sofía', texto: san?.biologaRobot4 || 'He añadido los descubrimientos a tu mapa de naufragios. ¡La tecnología y la biología marina hacen un gran equipo!' }
        ], () => {
          // Quitar el robot del inventario
          if (this.juego.inventario) {
            const idx = this.juego.inventario.objetos.findIndex(o => o.id === 'robotSubmarino');
            if (idx !== -1) this.juego.inventario.objetos.splice(idx, 1);
          }
          const idxJug = _jugador.inventario.findIndex(o => o.nombre === 'robotSubmarino');
          if (idxJug !== -1) _jugador.inventario.splice(idxJug, 1);

          // Marcar progreso
          if (this.juego.progreso) {
            this.juego.progreso.naufragiosRobotDescubiertos = true;
          }

          // Reputación
          if (this.juego.reputacion) {
            this.juego.reputacion.modificar(10, 'Robot entregado a Dra. Sofía');
          }

          // Marcar sub-misión como completada en el registro
          const textos2 = this._obtenerTextos();
          const lfsd = textos2?.dialogos?.lfsd;
          this.juego.registro?.marcarCompletada(lfsd?.subMisionRobot || 'Entregar Robot Submarino');

          if (this.juego.mostrarToast) {
            const _t = this._obtenerTextos();
            this.juego.mostrarToast(_t?.ui?.robotEntregado || '🤖 Robot entregado — ¡4 nuevos naufragios descubiertos!');
          }
        });

      } else {
        // Primera conversación: presentación + misión del manatí
        this.dialogos.iniciarDialogo([
          { personaje: '🧪 Dra. Sofía', texto: san?.biologa1 || '¡Bienvenida al Santuario del Manatí! Soy la Dra. Sofía, bióloga marina.' },
          { personaje: '🧪 Dra. Sofía', texto: san?.biologa2 || 'Los manatíes antillanos están en peligro de extinción. Quedan menos de 2,500 en todo el Caribe.' },
          { personaje: '🧪 Dra. Sofía', texto: san?.biologa3 || 'La Ley 64-00 protege la biodiversidad dominicana. Dañar a un manatí es un delito ambiental.' },
          { personaje: '🧪 Dra. Sofía', texto: san?.biologa4 || 'Los manatíes quedan atrapados por accidente en redes de pesca abandonadas — las llamamos "redes fantasma".' },
          { personaje: '🧪 Dra. Sofía', texto: san?.biologa5 || 'Para liberarlos sin hacerles daño, hay que cortar la red con cuidado, sin tocar al animal. Un manatí asustado puede agitarse y lastimarse más.' },
          { personaje: '🧪 Dra. Sofía', texto: san?.biologa6 || '¡Hay un manatí adulto atrapado ahora mismo! Ve a la red fantasma al este y usa [E] para cortarla. ¡Rápido, pero con calma!' }
        ], () => {
          npc.dialogoHecho = true;
          this.biologaHablada = true;

          // --- Descubrimiento de misión secundaria: Rescate del Manatí ---
          if (this.juego && this.juego.misiones && !this.juego.misiones.estaDescubierta('rescateManati')) {
            this.juego.misiones.descubrir('rescateManati');
            this.juego.misiones.iniciar('rescateManati');
            const textosMision = this._obtenerTextos();
            const mis = textosMision?.misiones || {};
            const titulo = mis.rescateManatiTitulo || 'Rescate del Manatí';
            if (this.juego.registro) {
              this.juego.registro.agregarEntrada('secundaria', titulo,
                mis.rescateManatiDesc || 'Liberar al manatí y limpiar el arrecife en el Santuario.');
            }
            this.juego.mostrarToast(`📋 ${textosMision?.misiones?.descubierta || 'Misión descubierta'}: ${titulo}`);
          }

          // --- Descubrimiento de misión secundaria: Full Metal Archeologist ---
          if (this.juego && this.juego.misiones && !this.juego.misiones.estaDescubierta('metalCompleto')) {
            const textosMision = this._obtenerTextos();
            const san2 = textosMision?.dialogos?.santuario;
            this.dialogos.iniciarDialogo([
              { personaje: '🧪 Dra. Sofía', texto: san2?.biologaMetal || 'Ah, una cosa más — necesitamos un robot submarino para explorar las zonas más profundas. Los estudiantes del LFSD podrían programar uno.' }
            ], () => {
              this.juego.misiones.descubrir('metalCompleto');
              // Desbloquear LFSD para que el jugador pueda ir a completar la misión
              if (!this.juego.progreso.nodosDesbloqueados.includes(8)) {
                this.juego.progreso.nodosDesbloqueados.push(8);
              }
              const _tMetal = this._obtenerTextos();
              const _sanMetal = _tMetal?.dialogos?.santuario;
              this.juego.mostrarToast((_tMetal?.ui?.misionDescubierta || '📋 Misión descubierta:') + ' ' + (_sanMetal?.misionMetalCompleto || 'Full Metal Archeologist'));
              const tituloMision = san2?.misionMetalCompleto || 'Full Metal Archeologist';
              this.juego.registro.agregarEntrada('secundaria', tituloMision, 'Programar un robot submarino de exploración con los estudiantes del LFSD.');
            });
          }
        });
      }

    } else if (npc.id === 'tortugaVerde') {
      this.dialogos.iniciarDialogo([
        { personaje: '🐢 Tortuga Verde', texto: san?.tortugaVerde1 || 'Soy una tortuga verde. A diferencia de la carey, como algas y pastos marinos.' },
        { personaje: '🐢 Tortuga Verde', texto: san?.tortugaVerde2 || 'La basura en el mar nos mata. Confundimos bolsas de plástico con medusas y las comemos.' },
        { personaje: '🐢 Tortuga Verde', texto: san?.tortugaVerde3 || 'Mira todos esos desechos atrapados en el arrecife. ¡Están asfixiando al coral!' },
        { personaje: '🐢 Tortuga Verde', texto: san?.tortugaVerde4 || 'Si recoges los desechos, el arrecife podrá respirar y recuperarse. ¡Cada acción cuenta!' }
      ], () => {
        npc.dialogoHecho = true;
        this.tortugaHablada = true;
      });

    } else if (npc.id === 'manatiBebe') {
      this.sfx.manatiLlamada();
      this.dialogos.iniciarDialogo([
        { personaje: '🐋 Manatí Bebé', texto: san?.manatiBebe1 || '¡El manatí bebé llora suavemente! Su madre está atrapada en la red más adelante.' },
        { personaje: '🐋 Manatí Bebé', texto: san?.manatiBebe2 || 'Te mira con ojos grandes y nada hacia el este, guiándote...' }
      ], () => {
        npc.dialogoHecho = true;
      });
    }
  }

  // ============================================================
  // BALLENAS JOROBADAS — sombras lejanas en el fondo
  // ============================================================
  // Las ballenas jorobadas migran por aguas dominicanas cada
  // invierno. Se dibujan como siluetas oscuras y lejanas.
  // Sprite adaptado del proyecto cary (Phaser 3 → Canvas2D).

  _spawnBallena() {
    const desdeIzquierda = Math.random() > 0.5;
    this.ballenasJorobadas.push({
      x: desdeIzquierda ? -150 : this.anchoNivel + 150,
      y: 200 + Math.random() * 400,
      tamano: 80 + Math.random() * 40,
      vx: desdeIzquierda ? (0.3 + Math.random() * 0.3) : -(0.3 + Math.random() * 0.3),
      fase: Math.random() * Math.PI * 2,
      frecuenciaY: 0.15 + Math.random() * 0.1,
      vida: 25 + Math.random() * 10,
      vidaMax: 35,
      opacidadBase: 0.12 + Math.random() * 0.08
    });
  }

  // --- Dibujar silueta de ballena jorobada ---
  // Cuerpo completo como un único path continuo con curvas Bezier
  // para evitar artefactos de doble-alfa donde las formas se solapan
  _dibujarBallenaJorobada(ctx, ballena, offsetX, offsetY) {
    const bx = ballena.x + offsetX;
    const by = ballena.y + offsetY;
    const s = ballena.tamano;
    const vidaNorm = ballena.vida / ballena.vidaMax;
    const fadeInOut = vidaNorm > 0.8 ? (1 - vidaNorm) / 0.2 : (vidaNorm < 0.2 ? vidaNorm / 0.2 : 1);
    const alpha = ballena.opacidadBase * fadeInOut;
    const dir = ballena.vx > 0 ? 1 : -1;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#142846';

    // Cuerpo entero como un solo path (sin solapamiento)
    ctx.beginPath();
    ctx.moveTo(bx + dir * s * 0.52, by);
    // Lomo (joroba característica)
    ctx.bezierCurveTo(
      bx + dir * s * 0.5, by - s * 0.18,
      bx + dir * s * 0.1, by - s * 0.2,
      bx - dir * s * 0.35, by - s * 0.06
    );
    // Pedúnculo → fluke superior
    ctx.lineTo(bx - dir * s * 0.5, by - s * 0.03);
    ctx.lineTo(bx - dir * s * 0.72, by - s * 0.18);
    ctx.lineTo(bx - dir * s * 0.55, by);
    // Fluke inferior → pedúnculo
    ctx.lineTo(bx - dir * s * 0.72, by + s * 0.18);
    ctx.lineTo(bx - dir * s * 0.5, by + s * 0.03);
    ctx.lineTo(bx - dir * s * 0.35, by + s * 0.06);
    // Vientre
    ctx.bezierCurveTo(
      bx + dir * s * 0.1, by + s * 0.2,
      bx + dir * s * 0.5, by + s * 0.18,
      bx + dir * s * 0.52, by
    );
    ctx.closePath();
    ctx.fill();

    // Aletas pectorales largas
    ctx.fillStyle = '#1a3050';
    ctx.beginPath();
    ctx.moveTo(bx - dir * s * 0.05, by - s * 0.1);
    ctx.lineTo(bx - dir * s * 0.15, by - s * 0.32);
    ctx.lineTo(bx + dir * s * 0.1, by - s * 0.12);
    ctx.closePath();
    ctx.fill();
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

  // --- Crear partícula de burbuja ---
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
