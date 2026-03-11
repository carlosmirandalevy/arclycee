// ============================================================
// CEMI-MURCIELAGO.JS - Espíritu cemí en forma de murciélago
// ============================================================
// El Cemí Murciélago es un espíritu taíno que acompaña al jugador
// y gana poderes a medida que encuentra botijas (tesoros).
// Cada cierta cantidad de botijas sube de nivel y desbloquea
// una habilidad nueva, incentivando la exploración.
// Los poderes están inspirados en habilidades reales de murciélagos
// (ecolocación, ondas sonoras) mezcladas con misticismo taíno.
// ============================================================

// --- Tabla de niveles y poderes ---
// Cada entrada define: cuántas botijas necesitas y qué poder ganas.
// Los nombres son descriptivos para que el jugador entienda qué hacen.
const NIVELES = [
  { nivel: 0,  botijasNecesarias: 0,  poder: null,                nombre: 'Sin poderes' },
  { nivel: 1,  botijasNecesarias: 1,  poder: 'ecoLocalizacion',   nombre: 'Eco-Localización' },
  { nivel: 3,  botijasNecesarias: 3,  poder: 'rafagaDeAlas',      nombre: 'Ráfaga de Alas' },
  { nivel: 5,  botijasNecesarias: 5,  poder: 'oidoDelPasado',     nombre: 'Oído del Pasado' },
  { nivel: 8,  botijasNecesarias: 8,  poder: 'chirridoAturdidor',  nombre: 'Chirrido Aturdidor' },
  { nivel: 10, botijasNecesarias: 10, poder: 'visionDeCemi',      nombre: 'Visión de Cemí' }
];

export class CemiMurcielago {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;

    // Empieza en nivel 0 sin poderes, los gana explorando
    this.nivel = 0;
    this.experiencia = 0;
    this.activo = false;

    // Contador de botijas: es lo que determina cuándo sube de nivel
    this.botijasEncontradas = 0;

    // El poder que está usando ahora mismo (null = ninguno)
    this.poderActivo = null;

    // Para la animación de flotar/aletear
    this._tiempoFlotacion = 0;
  }

  // --- Actualizar cada frame ---
  // El murciélago flota cerca del jugador con un movimiento de "bobbing"
  // (sube y baja suavemente) usando seno para que sea ondulatorio
  actualizar(dt, jugador) {
    if (!this.activo) return;

    // Incrementamos el tiempo para la animación de flotar
    this._tiempoFlotacion += dt * 3;

    // Se posiciona arriba y a la izquierda del jugador
    const destinoX = jugador.x - 20;
    const destinoY = jugador.y - 25;

    // Lerp suave para seguir al jugador
    this.x += (destinoX - this.x) * 0.08;
    // El seno hace que suba y baje como flotando en el aire
    this.y += (destinoY - this.y) * 0.08;
    this.y += Math.sin(this._tiempoFlotacion) * 0.5;
  }

  // --- Dibujar al murciélago ---
  // Placeholder: forma de murciélago morada con alas que aletean.
  // Usamos triángulos para las alas y un círculo para el cuerpo.
  dibujar(renderizador) {
    if (!this.activo) return;

    const ctx = renderizador;

    // Calculamos el aleteo: las alas suben y bajan con el tiempo
    const aleteo = Math.sin(this._tiempoFlotacion * 2) * 5;

    // Ala izquierda (triángulo morado oscuro)
    ctx.fillStyle = '#6a1b9a';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + 6);
    ctx.lineTo(this.x - 10, this.y + aleteo);
    ctx.lineTo(this.x - 3, this.y + 10);
    ctx.closePath();
    ctx.fill();

    // Ala derecha (espejo de la izquierda)
    ctx.beginPath();
    ctx.moveTo(this.x + 12, this.y + 6);
    ctx.lineTo(this.x + 22, this.y + aleteo);
    ctx.lineTo(this.x + 15, this.y + 10);
    ctx.closePath();
    ctx.fill();

    // Cuerpo (círculo morado más claro)
    ctx.fillStyle = '#9c27b0';
    ctx.beginPath();
    ctx.arc(this.x + 6, this.y + 7, 6, 0, Math.PI * 2);
    ctx.fill();

    // Ojitos brillantes (amarillos para que parezcan ojos de murciélago)
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(this.x + 3, this.y + 5, 2, 2);
    ctx.fillRect(this.x + 8, this.y + 5, 2, 2);
  }

  // --- Encontrar una botija ---
  // Cada botija cuenta para subir de nivel. Revisamos si ya alcanzó
  // el umbral del siguiente nivel después de sumar.
  encontrarBotija() {
    this.botijasEncontradas += 1;
    this._verificarSubidaDeNivel();
  }

  // --- Verificar si debe subir de nivel ---
  // Recorre la tabla de niveles de arriba a abajo buscando el nivel
  // más alto que le corresponda según las botijas encontradas
  _verificarSubidaDeNivel() {
    for (let i = NIVELES.length - 1; i >= 0; i--) {
      if (this.botijasEncontradas >= NIVELES[i].botijasNecesarias) {
        if (this.nivel < NIVELES[i].nivel) {
          this.nivel = NIVELES[i].nivel;
          this.subirNivel();
        }
        break;
      }
    }
  }

  // --- Subir de nivel ---
  // Por ahora solo registra el evento. Después puede mostrar una
  // animación o notificación al jugador.
  subirNivel() {
    // TODO: Disparar evento de notificación para la UI
    // "¡Cemí Murciélago subió al nivel X! Nuevo poder: Y"
  }

  // --- Usar un poder ---
  // Solo puede usar poderes que ya desbloqueó (según su nivel).
  // Retorna true si logró activarlo, false si no tiene acceso.
  usarPoder(nombrePoder) {
    const poderesDisponibles = this.obtenerPoderesDisponibles();
    const tieneAcceso = poderesDisponibles.some(p => p.poder === nombrePoder);

    if (!tieneAcceso) return false;

    this.poderActivo = nombrePoder;
    return true;
  }

  // --- Listar poderes desbloqueados ---
  // Filtra la tabla de niveles y retorna solo los que ya puede usar.
  // Excluye el nivel 0 porque ese no tiene poder.
  obtenerPoderesDisponibles() {
    return NIVELES.filter(n =>
      n.nivel <= this.nivel && n.poder !== null
    );
  }
}
