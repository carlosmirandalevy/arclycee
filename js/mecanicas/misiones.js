// ============================================================
// MISIONES.JS - Sistema de misiones (quests)
// ============================================================
// Controla todas las misiones del juego: las principales (historia)
// y las secundarias (opcionales). Cada misión tiene objetivos
// que se van completando uno por uno, y al terminar todos los
// objetivos, la misión se completa y da recompensas.
// Esto le da al jugador dirección y motivación para explorar.
// ============================================================

export class SistemaMisiones {
  constructor() {
    // Misiones que el jugador está haciendo ahora mismo
    this.misionesActivas = [];

    // Misiones que ya terminó (para no repetirlas y para el historial)
    this.misionesCompletadas = [];

    // La misión principal que aparece en pantalla como guía
    this.misionPrincipalActual = null;

    // Si el panel de misiones está abierto para dibujar
    this._panelAbierto = false;
  }

  // --- Agregar una nueva misión ---
  // Una misión tiene: id, titulo, descripcion, tipo (principal/secundaria),
  // objetivos (lista de cosas por hacer), recompensas, y si está completada.
  // No agregamos duplicados (si ya la tiene activa o completada, ignoramos).
  agregarMision(mision) {
    // Evitar misiones duplicadas
    const yaExiste = this.misionesActivas.some(m => m.id === mision.id)
      || this.misionesCompletadas.some(m => m.id === mision.id);

    if (yaExiste) return false;

    // Asegurar estructura completa de la misión
    const misionCompleta = {
      id: mision.id,
      titulo: mision.titulo || 'Misión sin nombre',
      descripcion: mision.descripcion || '',
      tipo: mision.tipo || 'secundaria',
      objetivos: (mision.objetivos || []).map(obj => ({
        id: obj.id,
        descripcion: obj.descripcion || '',
        completado: obj.completado || false
      })),
      recompensas: mision.recompensas || [],
      completada: false
    };

    this.misionesActivas.push(misionCompleta);

    // Si es misión principal y no hay una activa, la ponemos como actual
    if (misionCompleta.tipo === 'principal' && !this.misionPrincipalActual) {
      this.misionPrincipalActual = misionCompleta;
    }

    return true;
  }

  // --- Completar un objetivo específico ---
  // Busca la misión y marca el objetivo como completado.
  // Después verifica si toda la misión ya está lista.
  completarObjetivo(misionId, objetivoId) {
    const mision = this.misionesActivas.find(m => m.id === misionId);
    if (!mision) return false;

    const objetivo = mision.objetivos.find(o => o.id === objetivoId);
    if (!objetivo) return false;

    objetivo.completado = true;

    // Verificar si al completar este objetivo, se completó toda la misión
    this.verificarComplecion(misionId);
    return true;
  }

  // --- Verificar si una misión tiene todos sus objetivos listos ---
  // Usa .every() que retorna true solo si TODOS los elementos cumplen
  verificarComplecion(misionId) {
    const mision = this.misionesActivas.find(m => m.id === misionId);
    if (!mision) return false;

    const todosCompletos = mision.objetivos.every(o => o.completado);
    return todosCompletos;
  }

  // --- Completar una misión y dar recompensas ---
  // Mueve la misión de activas a completadas y retorna las recompensas
  // para que el juego las aplique (dar objetos, experiencia, etc.)
  completarMision(misionId) {
    const indice = this.misionesActivas.findIndex(m => m.id === misionId);
    if (indice === -1) return null;

    const mision = this.misionesActivas[indice];

    // Solo completar si todos los objetivos están listos
    if (!this.verificarComplecion(misionId)) return null;

    mision.completada = true;

    // Mover de activas a completadas
    this.misionesActivas.splice(indice, 1);
    this.misionesCompletadas.push(mision);

    // Si era la misión principal actual, limpiar la referencia
    if (this.misionPrincipalActual?.id === misionId) {
      // Buscar la siguiente misión principal activa (si hay)
      this.misionPrincipalActual = this.misionesActivas.find(
        m => m.tipo === 'principal'
      ) || null;
    }

    // Retornar recompensas para que el sistema del juego las aplique
    return mision.recompensas;
  }

  // --- Obtener solo las misiones activas ---
  // Útil para la UI y para saber cuántas misiones tiene pendientes
  obtenerMisionesActivas() {
    return this.misionesActivas.filter(m => !m.completada);
  }

  // --- Dibujar el panel de misiones ---
  // Muestra la lista de misiones activas con sus objetivos.
  // Los objetivos completados aparecen tachados (o con checkmark).
  dibujar(renderizador, anchoCanvas, altoCanvas, idiomas) {
    if (!this._panelAbierto) return;

    const ctx = renderizador;

    // Fondo semitransparente
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, anchoCanvas, altoCanvas);

    // Panel central
    const panelAncho = 400;
    const panelAlto = 350;
    const panelX = (anchoCanvas - panelAncho) / 2;
    const panelY = (altoCanvas - panelAlto) / 2;

    ctx.fillStyle = '#2a2a3a';
    ctx.fillRect(panelX, panelY, panelAncho, panelAlto);
    ctx.strokeStyle = '#6666aa';
    ctx.lineWidth = 2;
    ctx.strokeRect(panelX, panelY, panelAncho, panelAlto);

    // Título
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    const titulo = idiomas?.misiones?.titulo || 'Misiones';
    ctx.fillText(titulo, anchoCanvas / 2, panelY + 25);

    // Lista de misiones activas
    ctx.textAlign = 'left';
    ctx.font = '13px monospace';
    let offsetY = panelY + 50;

    const activas = this.obtenerMisionesActivas();

    if (activas.length === 0) {
      ctx.fillStyle = '#888888';
      const sinMisiones = idiomas?.misiones?.sinMisiones || 'No hay misiones activas';
      ctx.fillText(sinMisiones, panelX + 20, offsetY);
    }

    for (const mision of activas) {
      // No dibujar si se sale del panel
      if (offsetY > panelY + panelAlto - 30) break;

      // Tipo de misión (estrella para principal, punto para secundaria)
      const indicador = mision.tipo === 'principal' ? '★' : '•';

      // Nombre de la misión
      ctx.fillStyle = mision.tipo === 'principal' ? '#ffcc00' : '#aaaaff';
      ctx.fillText(`${indicador} ${mision.titulo}`, panelX + 20, offsetY);
      offsetY += 20;

      // Objetivos de la misión
      for (const objetivo of mision.objetivos) {
        if (offsetY > panelY + panelAlto - 30) break;

        // Checkbox visual: [X] si completado, [ ] si no
        const marca = objetivo.completado ? '[X]' : '[ ]';
        ctx.fillStyle = objetivo.completado ? '#44cc44' : '#999999';
        ctx.font = '11px monospace';
        ctx.fillText(`    ${marca} ${objetivo.descripcion}`, panelX + 20, offsetY);
        offsetY += 16;
      }

      // Espacio entre misiones
      offsetY += 10;
    }

    // Restaurar alineación
    ctx.textAlign = 'left';
  }

  // --- Controles del panel ---
  abrirPanel() {
    this._panelAbierto = true;
  }

  cerrarPanel() {
    this._panelAbierto = false;
  }

  alternarPanel() {
    this._panelAbierto = !this._panelAbierto;
  }
}
