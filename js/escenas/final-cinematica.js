// ============================================================
// FINAL-CINEMATICA.JS - Cinemática de final del juego
// ============================================================
// Después de completar el Museo de las Atarazanas Reales, el
// jugador ve una secuencia cinematográfica que resume su viaje
// y muestra el impacto de sus acciones.
//
// Hay 4 finales posibles basados en las decisiones del jugador:
// - Completo: todos los nodos + todos los combates pacificados
// - Ecológico: acciones ecológicas ≥ 3, sin combates violentos
// - Oscuro: más combates violentos que pacificados
// - Museo: final por defecto — exhibición museística
//
// Usa pasos secuenciales con fades, fondos temáticos y sonidos.
// ============================================================

import { ANCHO_JUEGO, ALTO_JUEGO } from '../motor/configuracion.js';
import { SonidoProcedural } from '../motor/sonido-procedural.js';

export class FinalCinematica {

  constructor() {
    // Paso actual (0-4, cinco pantallas por final)
    this.paso = 0;

    // Temporizador para avance automático
    this.temporizador = 0;

    // Opacidad para fade in/out
    this.opacidad = 0;

    // Bloqueo de entrada
    this.bloqueoEntrada = true;

    // Duración de cada paso (segundos)
    this.duracionesPasos = [5.0, 5.0, 5.0, 5.0, 6.0];

    // Sonidos procedurales
    this.sfx = new SonidoProcedural();
    this._sonidoPasoTocado = -1;

    // Tipo de final determinado
    this.tipoFinal = 'museo';

    // Textos del final actual
    this.textosFinales = [];

    // Referencia al juego
    this.juego = null;
  }

  // --- Preparar la cinemática ---
  iniciar(juego) {
    this.juego = juego;
    this.paso = 0;
    this.temporizador = 0;
    this.opacidad = 0;
    this.bloqueoEntrada = true;
    this._sonidoPasoTocado = -1;

    // Determinar qué final mostrar basado en el progreso
    this.tipoFinal = this._determinarFinal(juego);

    // Obtener los textos del final
    this.textosFinales = this._obtenerTextosFinales(juego);
  }

  // --- Determinar cuál de los 4 finales mostrar ---
  _determinarFinal(juego) {
    if (!juego || !juego.progreso) return 'museo';

    const progreso = juego.progreso;
    const nodosCompletos = (progreso.nodosCompletados || []).length;
    const pacificados = progreso.combatesPacificados || 0;
    const violentos = progreso.combatesViolentos || 0;
    const ecologicas = progreso.accionesEcologicas || 0;

    // Final completo: todos los nodos (8) + todos los combates pacificados
    if (nodosCompletos >= 8 && pacificados > 0 && violentos === 0) {
      return 'completo';
    }

    // Final oscuro: más combates violentos que pacificados
    if (violentos > pacificados && violentos > 0) {
      return 'oscuro';
    }

    // Final ecológico: acciones ecológicas ≥ 3, sin violencia
    if (ecologicas >= 3 && violentos === 0) {
      return 'ecologico';
    }

    // Final museo: por defecto
    return 'museo';
  }

  // --- Obtener textos según idioma y tipo de final ---
  _obtenerTextosFinales(juego) {
    const textos = juego?.idiomas?.traducciones?.[juego.idiomas.idiomaActual];
    const fin = textos?.dialogos?.finales;

    // Si no hay traducciones, usar textos por defecto en español
    const defecto = {
      completo: [
        'Has completado todos los desafíos con sabiduría y paz.',
        'Desde las cuevas del Pomier hasta el Museo de las Atarazanas, protegiste el patrimonio dominicano.',
        'Los artefactos están seguros en los museos. Los traficantes, ante la justicia.',
        'El pez león está bajo control. Los arrecifes se recuperan.',
        'Eres un verdadero guardián del patrimonio. La historia te recordará.'
      ],
      museo: [
        'Los artefactos recuperados brillan bajo las luces del museo.',
        'El Dr. Morbán inaugura la nueva sala de exhibición con tus descubrimientos.',
        'Desde los petroglifos taínos hasta los tesoros coloniales, cada pieza cuenta una historia.',
        'Los visitantes aprenden sobre la rica historia de la República Dominicana.',
        'El patrimonio está protegido. Tu misión ha terminado... por ahora.'
      ],
      ecologico: [
        'El mar Caribe brilla con colores renovados.',
        'Gracias a tus acciones ecológicas, los arrecifes de coral se están recuperando.',
        'Las tortugas carey nadan libres. Los peces nativos regresan.',
        'Tu ejemplo inspiró a comunidades enteras a proteger el medio ambiente marino.',
        'La naturaleza y la historia van de la mano. Proteger una es proteger la otra.'
      ],
      oscuro: [
        'Los artefactos llegaron al museo, pero no todos intactos.',
        'La violencia dejó marcas. Algunas piezas se dañaron en los enfrentamientos.',
        'El constructor Méndez sigue buscando maneras de demoler las ruinas.',
        'Los traficantes escaparon hacia otras rutas. La red sigue activa.',
        'El patrimonio merece ser protegido con inteligencia, no con fuerza. Quizás la próxima vez...'
      ]
    };

    // Intentar usar los textos traducidos, caer a defaults
    if (fin && fin[this.tipoFinal]) {
      const f = fin[this.tipoFinal];
      return [f.linea1, f.linea2, f.linea3, f.linea4, f.linea5].filter(Boolean);
    }

    return defecto[this.tipoFinal] || defecto.museo;
  }

  // --- Lógica de cada frame ---
  actualizar(dt, entrada, _jugador, _companeros) {
    this.temporizador += dt;

    // Permitir avanzar con E
    if (entrada.estaPresionada('accion') && !this.bloqueoEntrada) {
      this._avanzarPaso();
      this.bloqueoEntrada = true;
    }

    if (!entrada.estaPresionada('accion')) {
      this.bloqueoEntrada = false;
    }

    // Avance automático
    const duracion = this.duracionesPasos[this.paso] || 5.0;
    if (this.temporizador >= duracion) {
      this._avanzarPaso();
    }

    // Fade in
    this.opacidad = Math.min(1, this.temporizador / 1.5);

    // Sonidos por paso
    if (this._sonidoPasoTocado < this.paso) {
      this._sonidoPasoTocado = this.paso;
      this._tocarSonidoPaso();
    }
  }

  // --- Dibujar la cinemática ---
  dibujar(renderizador, ancho, alto, textos) {
    const ctx = renderizador.ctx;

    // Fondo según tipo de final y paso
    this._dibujarFondo(ctx, ancho, alto);

    // Texto del paso actual
    const texto = this.textosFinales[this.paso] || '';

    // Texto centrado con fade
    ctx.font = 'bold 18px monospace';
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacidad})`;
    ctx.textAlign = 'center';

    // Dividir texto largo en líneas
    const palabras = texto.split(' ');
    const lineas = [];
    let lineaActual = '';

    for (const palabra of palabras) {
      const prueba = lineaActual ? lineaActual + ' ' + palabra : palabra;
      if (ctx.measureText(prueba).width > ancho - 120) {
        lineas.push(lineaActual);
        lineaActual = palabra;
      } else {
        lineaActual = prueba;
      }
    }
    if (lineaActual) lineas.push(lineaActual);

    const yInicio = alto / 2 - (lineas.length * 28) / 2;
    for (let i = 0; i < lineas.length; i++) {
      ctx.fillText(lineas[i], ancho / 2, yInicio + i * 28);
    }

    // Indicador de paso
    ctx.font = '12px monospace';
    ctx.fillStyle = `rgba(150, 150, 150, ${this.opacidad * 0.6})`;
    ctx.fillText(`${this.paso + 1} / ${this.textosFinales.length}`, ancho / 2, alto - 45);

    // Indicador de continuar
    ctx.fillStyle = `rgba(150, 150, 150, ${0.4 + Math.sin(this.temporizador * 2) * 0.3})`;
    ctx.fillText('Presiona E para continuar', ancho / 2, alto - 20);

    ctx.textAlign = 'left';
  }

  // --- Fondos temáticos según tipo de final ---
  _dibujarFondo(ctx, ancho, alto) {
    switch (this.tipoFinal) {
      case 'completo':
        // Fondo dorado triunfante
        ctx.fillStyle = '#1a1a0a';
        ctx.fillRect(0, 0, ancho, alto);
        // Rayos dorados
        ctx.fillStyle = `rgba(255, 215, 0, ${0.05 * this.opacidad})`;
        for (let i = 0; i < 6; i++) {
          const cx = (ancho / 7) * (i + 1);
          ctx.beginPath();
          ctx.moveTo(cx, 0);
          ctx.lineTo(cx - 60, alto);
          ctx.lineTo(cx + 60, alto);
          ctx.closePath();
          ctx.fill();
        }
        break;

      case 'ecologico':
        // Fondo azul marino con gradiente
        const gradEco = ctx.createLinearGradient(0, 0, 0, alto);
        gradEco.addColorStop(0, '#0a1a3a');
        gradEco.addColorStop(0.5, '#0a3a5a');
        gradEco.addColorStop(1, '#0a2a4a');
        ctx.fillStyle = gradEco;
        ctx.fillRect(0, 0, ancho, alto);
        // Burbujas decorativas
        ctx.fillStyle = `rgba(100, 200, 255, ${0.1 * this.opacidad})`;
        for (let i = 0; i < 8; i++) {
          const bx = 100 + i * 110;
          const by = alto * 0.3 + Math.sin(this.temporizador + i) * 30;
          ctx.beginPath();
          ctx.arc(bx, by, 5 + i * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        break;

      case 'oscuro':
        // Fondo rojo oscuro sombrío
        const gradOsc = ctx.createLinearGradient(0, 0, 0, alto);
        gradOsc.addColorStop(0, '#1a0a0a');
        gradOsc.addColorStop(1, '#2a1a1a');
        ctx.fillStyle = gradOsc;
        ctx.fillRect(0, 0, ancho, alto);
        // Grietas
        ctx.strokeStyle = `rgba(100, 30, 30, ${0.3 * this.opacidad})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ancho * 0.3, 0);
        ctx.lineTo(ancho * 0.35, alto * 0.4);
        ctx.lineTo(ancho * 0.3, alto);
        ctx.moveTo(ancho * 0.7, 0);
        ctx.lineTo(ancho * 0.65, alto * 0.6);
        ctx.lineTo(ancho * 0.7, alto);
        ctx.stroke();
        break;

      default: // museo
        // Fondo cálido de museo
        const gradMus = ctx.createLinearGradient(0, 0, 0, alto);
        gradMus.addColorStop(0, '#1a150a');
        gradMus.addColorStop(1, '#2a200f');
        ctx.fillStyle = gradMus;
        ctx.fillRect(0, 0, ancho, alto);
        // Luces de museo
        ctx.fillStyle = `rgba(255, 220, 150, ${0.04 * this.opacidad})`;
        ctx.beginPath();
        ctx.arc(ancho / 2, alto * 0.3, 200, 0, Math.PI * 2);
        ctx.fill();
        break;
    }
  }

  // --- Sonidos según paso y tipo de final ---
  _tocarSonidoPaso() {
    if (this.paso === 0) {
      // Acorde inicial temático
      this._tocarAcordeInicial();
    } else if (this.paso === this.textosFinales.length - 1) {
      // Acorde final
      this._tocarAcordeFinal();
    }
  }

  _tocarAcordeInicial() {
    if (!this.sfx._asegurarContexto()) return;
    const ctx = this.sfx.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this.sfx._crearGanancia(this.sfx.volumen * 0.2);

    // Acorde según tipo de final
    const acordes = {
      completo: [261, 329, 392, 523],  // C mayor brillante
      museo: [220, 277, 329],           // A menor cálido
      ecologico: [261, 329, 392],       // C mayor suave
      oscuro: [196, 233, 293]           // G menor sombrío
    };

    const notas = acordes[this.tipoFinal] || acordes.museo;

    for (const freq of notas) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ahora);
      osc.connect(ganancia);
      osc.start(ahora);
      osc.stop(ahora + 3);
    }

    ganancia.gain.setValueAtTime(this.sfx.volumen * 0.2, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 3);
  }

  _tocarAcordeFinal() {
    if (!this.sfx._asegurarContexto()) return;
    const ctx = this.sfx.contexto;
    const ahora = ctx.currentTime;
    const ganancia = this.sfx._crearGanancia(this.sfx.volumen * 0.3);

    // Arpegio ascendente
    const notas = [261, 329, 392, 523];
    for (let i = 0; i < notas.length; i++) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(notas[i], ahora + i * 0.3);
      osc.connect(ganancia);
      osc.start(ahora + i * 0.3);
      osc.stop(ahora + i * 0.3 + 2);
    }

    ganancia.gain.setValueAtTime(this.sfx.volumen * 0.3, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 4);
  }

  // --- Avanzar al siguiente paso ---
  _avanzarPaso() {
    this.paso++;
    this.temporizador = 0;
    this.opacidad = 0;

    // Después del último paso, volver al menú principal
    if (this.paso >= this.textosFinales.length) {
      if (this.juego && this.juego.cambiarEscena) {
        this.juego.cambiarEscena('menuPrincipal');
      }
    }
  }
}
