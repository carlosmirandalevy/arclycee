// ============================================================
// PROGRAMACION-BLOQUES.JS - Mini-juego "Full Metal Archeologist"
// ============================================================
// El jugador ordena bloques de instrucciones (avanzar, girar,
// escanear, sumergir, ascender) para guiar un robot submarino
// a través de una cuadrícula 6×4 hasta un punto de escaneo.
//
// Se accede desde el LFSD hablando con Sofía.
// Al completar, desbloquea la capa de sitios arqueológicos
// inexplorados en el mapa Leaflet.
// ============================================================

import { SonidoProcedural } from '../motor/sonido-procedural.js';

// Tipos de bloques disponibles
const BLOQUES = ['avanzar', 'girar_izq', 'girar_der', 'escanear', 'sumergir', 'ascender'];

// Direcciones: 0=arriba, 1=derecha, 2=abajo, 3=izquierda
const DIRS = [
  { dx: 0, dy: -1 },  // arriba
  { dx: 1, dy: 0 },   // derecha
  { dx: 0, dy: 1 },   // abajo
  { dx: -1, dy: 0 }   // izquierda
];

export class ProgramacionBloques {

  constructor() {
    this.enJuego = false;
    this.fase = 'intro';  // 'intro' → 'programando' → 'ejecutando' → 'resultado'
    this._bloqueoEntrada = true;
    this._alTerminar = null;
    this.sfx = new SonidoProcedural();

    // Paleta de bloques
    this._paletaIndice = 0;

    // Programa del jugador (lista de bloques)
    this._programa = [];
    this._maxBloques = 12;

    // Cuadrícula 6×4
    // 0=vacío, 1=obstáculo, 2=objetivo
    this._cuadricula = [];
    this._anchoGrid = 6;
    this._altoGrid = 4;

    // Robot
    this._robotX = 0;
    this._robotY = 0;
    this._robotDir = 1; // mirando derecha
    this._robotSumergido = false;

    // Posición objetivo
    this._objetivoX = 0;
    this._objetivoY = 0;

    // Ejecución
    this._pasoEjecucion = 0;
    this._tiempoEjecucion = 0;
    this._intervaloEjecucion = 0.6; // Segundos entre pasos

    // Timer para la fase de programación
    this._tiempoRestante = 60;

    // Resultado
    this._resultado = null;
    this._tiempoTotal = 0;
  }

  // Inicia el mini-juego con configuración opcional
  iniciar(config) {
    this.enJuego = true;
    this.fase = 'intro';
    this._bloqueoEntrada = true;
    this._alTerminar = config?.alTerminar || null;
    this._resultado = null;
    this._tiempoTotal = 0;
    this._tiempoRestante = 60;
    this._paletaIndice = 0;
    this._programa = [];
    this._pasoEjecucion = 0;
    this._tiempoEjecucion = 0;

    // Generar cuadrícula con obstáculos
    this._generarCuadricula();
  }

  // Crea la cuadrícula 6×4 con obstáculos fijos y posiciones de robot/objetivo
  _generarCuadricula() {
    // Crear cuadrícula vacía
    this._cuadricula = [];
    for (let y = 0; y < this._altoGrid; y++) {
      this._cuadricula[y] = [];
      for (let x = 0; x < this._anchoGrid; x++) {
        this._cuadricula[y][x] = 0;
      }
    }

    // Robot empieza arriba izquierda
    this._robotX = 0;
    this._robotY = 1;
    this._robotDir = 1;
    this._robotSumergido = false;

    // Objetivo abajo derecha
    this._objetivoX = 5;
    this._objetivoY = 2;
    this._cuadricula[this._objetivoY][this._objetivoX] = 2;

    // Obstáculos fijos (diseño que requiere pensar pero es resoluble)
    // Muro vertical bloquea el camino directo, obliga a rodear por abajo
    this._cuadricula[0][2] = 1;
    this._cuadricula[1][2] = 1;
    this._cuadricula[3][3] = 1;
  }

  // Actualiza la lógica según la fase actual
  actualizar(dt, entrada) {
    if (!this.enJuego) return;
    this._tiempoTotal += dt;

    // Bloqueo de entrada — esperar a que el jugador suelte todas las teclas
    if (this._bloqueoEntrada) {
      if (!entrada.estaPresionada('accion') &&
          !entrada.estaPresionada('cancelar') &&
          !entrada.estaPresionada('arriba') &&
          !entrada.estaPresionada('abajo') &&
          !entrada.estaPresionada('izquierda') &&
          !entrada.estaPresionada('especial')) {
        this._bloqueoEntrada = false;
      }
      return;
    }

    // --- FASE: intro ---
    if (this.fase === 'intro') {
      if (entrada.estaPresionada('accion')) {
        this.fase = 'programando';
        this._bloqueoEntrada = true;
      }
      return;
    }

    // --- FASE: resultado ---
    if (this.fase === 'resultado') {
      if (entrada.estaPresionada('accion')) {
        this.enJuego = false;
        if (this._alTerminar) this._alTerminar(this._resultado);
      }
      return;
    }

    // --- FASE: ejecutando ---
    if (this.fase === 'ejecutando') {
      this._tiempoEjecucion += dt;

      if (this._tiempoEjecucion >= this._intervaloEjecucion) {
        this._tiempoEjecucion = 0;
        this._ejecutarPaso();
      }
      return;
    }

    // --- FASE: programando ---
    // Cuenta regresiva — si se acaba el tiempo, fallo automático
    this._tiempoRestante -= dt;
    if (this._tiempoRestante <= 0) {
      this._tiempoRestante = 0;
      this._resultado = 'fallo';
      this.fase = 'resultado';
      this._bloqueoEntrada = true;
      return;
    }

    // Navegar paleta con ↑↓
    if (entrada.estaPresionada('arriba')) {
      this._paletaIndice = (this._paletaIndice + BLOQUES.length - 1) % BLOQUES.length;
      this._bloqueoEntrada = true;
    }
    if (entrada.estaPresionada('abajo')) {
      this._paletaIndice = (this._paletaIndice + 1) % BLOQUES.length;
      this._bloqueoEntrada = true;
    }

    // Agregar bloque con E (accion)
    if (entrada.estaPresionada('accion')) {
      if (this._programa.length < this._maxBloques) {
        this._programa.push(BLOQUES[this._paletaIndice]);
      }
      this._bloqueoEntrada = true;
    }

    // Quitar último bloque con ←
    if (entrada.estaPresionada('izquierda')) {
      if (this._programa.length > 0) {
        this._programa.pop();
      }
      this._bloqueoEntrada = true;
    }

    // Ejecutar programa con F (especial)
    if (entrada.estaPresionada('especial')) {
      if (this._programa.length > 0) {
        this.fase = 'ejecutando';
        this._pasoEjecucion = 0;
        this._tiempoEjecucion = 0;
        this._bloqueoEntrada = true;
      }
    }
  }

  // Ejecuta un paso del programa — mueve el robot según el bloque actual
  _ejecutarPaso() {
    // Si ya ejecutamos todos los bloques, verificar si llegó al objetivo
    if (this._pasoEjecucion >= this._programa.length) {
      if (this._robotX === this._objetivoX && this._robotY === this._objetivoY) {
        this._resultado = 'exito';
        this.sfx.robotExito();
      } else {
        this._resultado = 'fallo';
      }
      this.fase = 'resultado';
      this._bloqueoEntrada = true;
      return;
    }

    const bloque = this._programa[this._pasoEjecucion];

    switch (bloque) {
      case 'avanzar': {
        const dir = DIRS[this._robotDir];
        const nx = this._robotX + dir.dx;
        const ny = this._robotY + dir.dy;

        // Verificar límites — el robot no puede salir de la cuadrícula
        if (nx < 0 || nx >= this._anchoGrid || ny < 0 || ny >= this._altoGrid) {
          this._resultado = 'fallo';
          this.fase = 'resultado';
          this._bloqueoEntrada = true;
          return;
        }
        // Obstáculo bloquea si no está sumergido
        if (this._cuadricula[ny][nx] === 1 && !this._robotSumergido) {
          this._resultado = 'fallo';
          this.fase = 'resultado';
          this._bloqueoEntrada = true;
          return;
        }
        this._robotX = nx;
        this._robotY = ny;
        this.sfx.robotMoverse();
        break;
      }
      case 'girar_izq':
        this._robotDir = (this._robotDir + 3) % 4;
        break;
      case 'girar_der':
        this._robotDir = (this._robotDir + 1) % 4;
        break;
      case 'escanear':
        // Efecto visual solamente — el escaneo ocurre al llegar al objetivo
        this.sfx.bloqueColocar();
        break;
      case 'sumergir':
        this._robotSumergido = true;
        break;
      case 'ascender':
        this._robotSumergido = false;
        break;
    }

    this._pasoEjecucion++;
  }

  // Dibuja toda la interfaz del mini-juego según la fase actual
  dibujar(ctx, ancho, alto, textos) {
    if (!this.enJuego) return;
    const prog = textos?.programacion || {};

    // Fondo oscuro submarino
    ctx.fillStyle = '#0a1a2a';
    ctx.fillRect(0, 0, ancho, alto);

    // --- FASE: intro ---
    if (this.fase === 'intro') {
      ctx.fillStyle = '#44AAFF';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(prog.titulo || 'Programación del Robot', ancho / 2, 120);

      ctx.fillStyle = '#88CCFF';
      ctx.font = '14px monospace';
      ctx.fillText(prog.intro1 || 'Ordena los bloques para guiar al robot', ancho / 2, 180);
      ctx.fillText(prog.intro2 || 'hasta el punto de escaneo.', ancho / 2, 200);
      ctx.fillText(prog.intro3 || '↑↓: elegir bloque | E: agregar | ←: quitar | F: ejecutar', ancho / 2, 240);

      // Texto parpadeante de "Comenzar"
      ctx.fillStyle = `rgba(68, 170, 255, ${0.5 + Math.sin(this._tiempoTotal * 3) * 0.3})`;
      ctx.fillText('[E] ' + (prog.comenzar || 'Comenzar'), ancho / 2, 300);
      ctx.textAlign = 'left';
      return;
    }

    // --- FASE: resultado ---
    if (this.fase === 'resultado') {
      const esExito = this._resultado === 'exito';
      ctx.fillStyle = esExito ? '#44FF44' : '#FF4444';
      ctx.font = 'bold 28px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(
        esExito ? (prog.exito || '¡Robot llegó al objetivo!') : (prog.fallo || 'El robot no llegó...'),
        ancho / 2, 170
      );
      ctx.fillStyle = '#AAAAAA';
      ctx.font = '14px monospace';
      ctx.fillText('[E] ' + (prog.continuar || 'Continuar'), ancho / 2, 230);
      ctx.textAlign = 'left';
      return;
    }

    // --- Layout: izquierda = paleta + programa, derecha = cuadrícula ---

    // Barra de tiempo (solo en fase programando)
    if (this.fase === 'programando') {
      const tiempoFraccion = this._tiempoRestante / 60;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(30, 10, ancho - 60, 8);
      ctx.fillStyle = this._tiempoRestante < 15 ? '#FF4444' : '#44AAFF';
      ctx.fillRect(30, 10, (ancho - 60) * tiempoFraccion, 8);
    }

    // --- Paleta de bloques (columna izquierda) ---
    const coloresBloque = {
      avanzar: '#4488FF',
      girar_izq: '#FF8844',
      girar_der: '#FFAA44',
      escanear: '#44FF88',
      sumergir: '#8844FF',
      ascender: '#FF44AA'
    };
    const nombresBloque = {
      avanzar: prog.avanzar || 'Avanzar',
      girar_izq: prog.girarIzq || 'Girar ←',
      girar_der: prog.girarDer || 'Girar →',
      escanear: prog.escanear || 'Escanear',
      sumergir: prog.sumergir || 'Sumergir',
      ascender: prog.ascender || 'Ascender'
    };

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(prog.paleta || 'Bloques:', 20, 40);

    // Dibujar cada bloque de la paleta
    for (let i = 0; i < BLOQUES.length; i++) {
      const y = 50 + i * 32;
      const esActivo = i === this._paletaIndice && this.fase === 'programando';

      ctx.fillStyle = esActivo ? coloresBloque[BLOQUES[i]] : 'rgba(100, 100, 100, 0.5)';
      ctx.fillRect(20, y, 130, 26);
      ctx.strokeStyle = esActivo ? '#FFFFFF' : '#444444';
      ctx.lineWidth = esActivo ? 2 : 1;
      ctx.strokeRect(20, y, 130, 26);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '11px monospace';
      const flecha = esActivo ? '▸ ' : '  ';
      ctx.fillText(flecha + nombresBloque[BLOQUES[i]], 25, y + 17);
    }

    // --- Programa del jugador (columna centro-izquierda) ---
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(prog.programa || 'Programa:', 170, 40);

    // Bloques ya agregados al programa
    for (let i = 0; i < this._programa.length; i++) {
      const y = 50 + i * 28;
      const esEjecutando = this.fase === 'ejecutando' && i === this._pasoEjecucion;
      const yaEjecutado = this.fase === 'ejecutando' && i < this._pasoEjecucion;

      ctx.fillStyle = yaEjecutado ? 'rgba(100, 100, 100, 0.3)' :
                      esEjecutando ? coloresBloque[this._programa[i]] :
                      'rgba(68, 68, 68, 0.5)';
      ctx.fillRect(170, y, 130, 22);

      // Resaltar el bloque que se está ejecutando
      if (esEjecutando) {
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.strokeRect(170, y, 130, 22);
      }

      ctx.fillStyle = yaEjecutado ? '#666666' : '#FFFFFF';
      ctx.font = '10px monospace';
      ctx.fillText(`${i + 1}. ${nombresBloque[this._programa[i]]}`, 175, y + 15);
    }

    // Slots vacíos (líneas punteadas)
    for (let i = this._programa.length; i < this._maxBloques; i++) {
      const y = 50 + i * 28;
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(170, y, 130, 22);
      ctx.setLineDash([]);
    }

    // --- Cuadrícula del mundo submarino (columna derecha) ---
    const gridX = 380;
    const gridY = 50;
    const tamCelda = 60;

    for (let y = 0; y < this._altoGrid; y++) {
      for (let x = 0; x < this._anchoGrid; x++) {
        const px = gridX + x * tamCelda;
        const py = gridY + y * tamCelda;

        // Fondo de celda — marrón para obstáculo, azul oscuro para vacío
        ctx.fillStyle = this._cuadricula[y][x] === 1 ? '#3a2a1a' : '#1a2a3a';
        ctx.fillRect(px, py, tamCelda - 2, tamCelda - 2);
        ctx.strokeStyle = '#2a4a6a';
        ctx.lineWidth = 1;
        ctx.strokeRect(px, py, tamCelda - 2, tamCelda - 2);

        // Obstáculo (roca submarina)
        if (this._cuadricula[y][x] === 1) {
          ctx.fillStyle = '#6a5a4a';
          ctx.beginPath();
          ctx.arc(px + tamCelda / 2 - 1, py + tamCelda / 2 - 1, 18, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#8a7a6a';
          ctx.font = '18px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('🪨', px + tamCelda / 2 - 1, py + tamCelda / 2 + 6);
        }

        // Punto de escaneo (objetivo parpadeante)
        if (this._cuadricula[y][x] === 2) {
          const brillo = 0.5 + Math.sin(this._tiempoTotal * 3) * 0.3;
          ctx.fillStyle = `rgba(68, 255, 136, ${brillo})`;
          ctx.beginPath();
          ctx.arc(px + tamCelda / 2 - 1, py + tamCelda / 2 - 1, 15, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '12px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('SCAN', px + tamCelda / 2 - 1, py + tamCelda / 2 + 4);
        }
      }
    }

    // --- Robot submarino ---
    const robotPx = gridX + this._robotX * tamCelda + tamCelda / 2 - 1;
    const robotPy = gridY + this._robotY * tamCelda + tamCelda / 2 - 1;

    // Color según estado: azul si sumergido, naranja si en superficie
    ctx.fillStyle = this._robotSumergido ? '#4444AA' : '#FF8800';
    ctx.beginPath();
    ctx.arc(robotPx, robotPy, 12, 0, Math.PI * 2);
    ctx.fill();

    // Flecha de dirección del robot
    const flechas = ['▲', '▶', '▼', '◀'];
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(flechas[this._robotDir], robotPx, robotPy + 5);

    // --- Texto de controles en la parte inferior ---
    ctx.fillStyle = '#666666';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    if (this.fase === 'programando') {
      ctx.fillText(prog.controles || '↑↓: elegir | E: agregar | ←: quitar | F: ejecutar', ancho / 2, alto - 20);
    } else if (this.fase === 'ejecutando') {
      ctx.fillText(prog.ejecutando || 'Ejecutando programa...', ancho / 2, alto - 20);
    }

    ctx.textAlign = 'left';
  }
}
