// ============================================================
// MISIONES-SECUNDARIAS.JS - Estado de las 3 sidequests
// ============================================================
// Controla el estado de las 5 misiones secundarias:
// 1. batu — jugar batú con Higüemota (Asentamiento Taíno 2)
// 2. rescateManati — liberar al manatí + limpiar arrecife (Santuario)
// 3. buenasVibraciones — calibrar el magnetómetro (Leonardo, LFSD)
// 4. metalCompleto — programar el robot submarino (Diana, LFSD)
// 5. cienciaLoca — reparar el equipo de análisis (Hugo, LFSD)
//
// Cada misión pasa por 4 estados:
//   no_descubierta → descubierta → en_progreso → completada
//
// Las misiones se "descubren" hablando con NPCs en los mundos
// existentes. Se "inician" y "completan" en el nivel LFSD.
// ============================================================

export class MisionesSecundarias {

  constructor() {
    // Estado de las 6 misiones (batú + rescate manatí + 3 del LFSD + museo catedral)
    this.misiones = {
      batu: { estado: 'no_descubierta', datos: {} },
      rescateManati: { estado: 'no_descubierta', datos: {} },
      buenasVibraciones: { estado: 'no_descubierta', datos: {} },
      metalCompleto: { estado: 'no_descubierta', datos: {} },
      cienciaLoca: { estado: 'no_descubierta', datos: {} },
      museoCatedral: { estado: 'no_descubierta', datos: {} },
      idoloEnriquillo: { estado: 'no_descubierta', datos: {} },
      ofrendasAleta: { estado: 'no_descubierta', datos: {} }
    };
  }

  // --- Descubrir una misión (al hablar con un NPC en otro mundo) ---
  descubrir(id) {
    if (!this.misiones[id]) return;
    if (this.misiones[id].estado !== 'no_descubierta') return;
    this.misiones[id].estado = 'descubierta';
  }

  // --- Iniciar una misión (al hablar con el quest-giver en LFSD) ---
  iniciar(id) {
    if (!this.misiones[id]) return;
    if (this.misiones[id].estado !== 'descubierta') return;
    this.misiones[id].estado = 'en_progreso';
  }

  // --- Completar una misión (al terminar el mini-juego) ---
  completar(id) {
    if (!this.misiones[id]) return;
    this.misiones[id].estado = 'completada';
  }

  // --- Verificar estado ---
  estaCompletada(id) {
    return this.misiones[id]?.estado === 'completada';
  }

  estaDescubierta(id) {
    const estado = this.misiones[id]?.estado;
    return estado === 'descubierta' || estado === 'en_progreso' || estado === 'completada';
  }

  estaEnProgreso(id) {
    return this.misiones[id]?.estado === 'en_progreso';
  }

  // --- Contar misiones completadas ---
  contarCompletadas() {
    return Object.values(this.misiones).filter(m => m.estado === 'completada').length;
  }

  // --- Serializar para guardado ---
  serializar() {
    const resultado = {};
    for (const [id, mision] of Object.entries(this.misiones)) {
      resultado[id] = { estado: mision.estado };
    }
    return resultado;
  }

  // --- Restaurar desde guardado ---
  restaurar(datos) {
    if (!datos) return;
    for (const [id, mision] of Object.entries(datos)) {
      if (this.misiones[id]) {
        this.misiones[id].estado = mision.estado || 'no_descubierta';
      }
    }
  }
}
