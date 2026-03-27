// ============================================================
// MANANTIAL-ALETA.JS — Entrada al Manantial de la Aleta
// ============================================================
// Hub que gestiona las 3 fases del nivel:
//   1. Rapel por el pozo vertical (overlay mini-juego)
//   2. Caminar en la cueva oscura con linterna
//   3. Bucear en el cenote sagrado para encontrar ofrendas
//
// El Manantial de la Aleta es un cenote de ~40m de profundidad
// en el Parque Nacional Cotubanamá (antes Parque del Este),
// cerca de Bayahíbe. Es el sitio de arqueología subacuática
// más importante del Caribe — con cemíes de madera, vasijas
// cerámicas y ofrendas rituales preservadas por agua anóxica
// durante más de 500 años.
//
// PRERREQUISITO: equipoBuceoObtenido (de Dra. Sofía tras
// completar Full Metal Archeologist)
// ============================================================

import { VELOCIDAD_JUGADOR } from '../../motor/configuracion.js';
import SistemaDialogos from '../../mecanicas/dialogos.js';
import { SonidoProcedural } from '../../motor/sonido-procedural.js';

export class ManantialAleta {

  constructor() {
    this.juego = null;
    this.dialogos = new SistemaDialogos();
    this.sfx = new SonidoProcedural();
    this.bloqueoEntrada = true;
    this.tiempoTotal = 0;

    // Fase del nivel: 'entrada' → 'rappel' → 'cueva' → 'cenote' → 'completado'
    this._faseNivel = 'entrada';
  }

  iniciar(juego) {
    this.juego = juego;
    this.bloqueoEntrada = true;
    this.tiempoTotal = 0;

    if (juego.jugador) {
      juego.jugador.modoJuego = 'topdown';
    }

    // Restaurar fase guardada si existe
    this._faseNivel = juego.progreso?.mundos?.manantialAleta?.fase || 'entrada';

    // Verificar prerrequisito: equipo de buceo
    if (!juego.progreso?.equipoBuceoObtenido) {
      const t = this._obtenerTextos()?.dialogos?.manantialAleta;
      this.dialogos.iniciarDialogo([
        { personaje: '🗺️', texto: t?.sinEquipo1 || 'El cenote es muy profundo. Necesitas equipo de buceo profesional.' },
        { personaje: '🗺️', texto: t?.sinEquipo2 || 'La Dra. Sofía en el Santuario del Manatí podría ayudarte si completas su misión.' }
      ], () => {
        juego.cambiarEscena('mapaPrincipal');
      });
      return;
    }

    // Mostrar diálogo de entrada según la fase
    if (this._faseNivel === 'entrada') {
      const t = this._obtenerTextos()?.dialogos?.manantialAleta;
      this.dialogos.iniciarDialogo([
        { personaje: '🗺️', texto: t?.intro1 || 'Manantial de la Aleta — Parque Nacional Cotubanamá' },
        { personaje: '🗺️', texto: t?.intro2 || 'Un cenote sagrado taíno de 40 metros de profundidad. Los taínos creían que los cenotes eran portales a Coaybay, la tierra de los muertos.' },
        { personaje: '🗺️', texto: t?.intro3 || 'Arqueólogos de Indiana University encontraron aquí cemíes de madera y vasijas preservadas por más de 500 años en el agua sin oxígeno.' }
      ], () => {
        this._faseNivel = 'rappel';
        this._guardarFase();
        // Iniciar mini-juego de rapel
        this._iniciarRappel();
      });
    } else if (this._faseNivel === 'rappel') {
      this._iniciarRappel();
    } else if (this._faseNivel === 'cueva') {
      this.juego.cambiarEscena('cuevaOscura');
    } else if (this._faseNivel === 'cenote') {
      this.juego.cambiarEscena('cenoteBuceo');
    } else if (this._faseNivel === 'completado') {
      const t = this._obtenerTextos()?.dialogos?.manantialAleta;
      this.dialogos.iniciarDialogo([
        { personaje: '🗺️', texto: t?.yaCompletado || 'Ya exploraste el cenote y recuperaste las ofrendas taínas. Llévalas al Museo del Hombre Dominicano.' }
      ], () => {
        this.juego.cambiarEscena('mapaPrincipal');
      });
    }
  }

  // --- Iniciar el mini-juego de rapel ---
  _iniciarRappel() {
    if (this.juego && this.juego.rappel) {
      this.juego.rappel.iniciar({
        alTerminar: (resultado) => {
          if (resultado === 'exito') {
            this._faseNivel = 'cueva';
            this._guardarFase();
            const t = this._obtenerTextos()?.dialogos?.manantialAleta;
            this.juego?.mostrarToast(t?.rappelExito || '🧗 ¡Llegaste al fondo! Ahora explora la cueva.', 3);
            this.juego.cambiarEscena('cuevaOscura');
          }
          // Si falló, el rappel se reinicia solo (manejo interno)
        },
        juego: this.juego
      });
    }
  }

  // --- Guardar fase actual en progreso ---
  _guardarFase() {
    if (this.juego?.progreso) {
      if (!this.juego.progreso.mundos) this.juego.progreso.mundos = {};
      this.juego.progreso.mundos.manantialAleta = { fase: this._faseNivel };
    }
  }

  actualizar(dt, entrada, jugador, companeros) {
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
  }

  dibujar(renderizador, ancho, alto, textos, jugador) {
    const ctx = renderizador.ctx || renderizador;

    // Fondo oscuro de cueva
    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(0, 0, ancho, alto);

    // Texto de ubicación
    ctx.fillStyle = '#CCAA44';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Manantial de la Aleta', ancho / 2, alto * 0.4);
    ctx.fillStyle = '#888888';
    ctx.font = '12px monospace';
    ctx.fillText('Parque Nacional Cotubanamá', ancho / 2, alto * 0.45);
    ctx.textAlign = 'left';

    // Dibujar diálogo si está activo
    if (this.dialogos.estaActivo()) {
      this.dialogos.dibujar(ctx, ancho, alto, textos);
    }
  }

  salir() {
    // Nada que limpiar
  }

  _obtenerTextos() {
    if (this.juego && this.juego.idiomas) {
      return this.juego.idiomas.traducciones[this.juego.idiomas.idiomaActual];
    }
    return null;
  }
}
