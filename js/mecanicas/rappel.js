// ============================================================
// RAPPEL.JS — Mini-juego de rapel para descender al cenote
// ============================================================
// El jugador desciende por una cuerda en un pozo vertical.
// Flechas de dirección suben por la pantalla — el jugador debe
// presionar la dirección correcta cuando la flecha llega a la
// "zona dulce" en el centro. Es como un juego de ritmo pero
// con las 4 direcciones.
//
// Cada acierto baja al personaje un poco. Cada fallo reduce
// el medidor de agarre. Si llega a 0, el jugador cae y reintenta.
// ============================================================

export class JuegoRappel {
  constructor() {
    this.enJuego = false;
    this._resultado = null;
  }

  // config: { alTerminar: fn(resultado), juego }
  iniciar(config) {
    this.enJuego = true;
    this._resultado = null;
    this._alTerminar = config.alTerminar || (() => {});
    this._juego = config.juego;

    // --- Fase ---
    this._fase = 'intro'; // 'intro' → 'descendiendo' → 'resultado'
    this._tiempoFase = 0;
    this._tiempoTotal = 0;

    // --- Prompts de dirección ---
    // Cada prompt tiene: { dir: 'arriba'|'abajo'|'izquierda'|'derecha', y: posición, activo: true }
    this._prompts = [];
    this._proximoPrompt = 0; // tiempo hasta el próximo prompt
    this._intervaloPrompt = 1.0; // segundos entre prompts (se reduce con dificultad)
    this._promptsCompletados = 0;
    this._totalPrompts = 35; // prompts necesarios para llegar abajo

    // --- Jugador ---
    this._profundidad = 0; // 0 a 30 (metros)
    this._agarre = 100; // medidor de agarre (0 = caer)
    this._personajeY = 200; // posición visual del personaje
    this._balanceo = 0; // oscilación en la cuerda

    // --- Zona dulce (hit zone) ---
    this._zonaY = 260; // centro de la zona de acierto
    this._zonaAlto = 40; // tolerancia en píxeles

    // --- Efectos ---
    this._flash = ''; // 'verde' o 'rojo'
    this._flashTiempo = 0;
    this._sacudida = 0;

    // --- Input ---
    this._bloqueoEntrada = true;
    this._teclasAnteriores = { arriba: false, abajo: false, izquierda: false, derecha: false };
  }

  // --- Obtener textos traducidos ---
  _textos() {
    const t = this._juego?.idiomas?.traducciones?.[this._juego?.idiomas?.idiomaActual];
    return t?.rappel || {};
  }

  // ============================================================
  // ACTUALIZAR
  // ============================================================
  actualizar(dt, entrada) {
    this._tiempoTotal += dt;
    this._tiempoFase += dt;
    if (this._flashTiempo > 0) this._flashTiempo -= dt;
    if (this._sacudida > 0) this._sacudida -= dt;

    if (this._fase === 'intro') {
      this._actualizarIntro(dt, entrada);
    } else if (this._fase === 'descendiendo') {
      this._actualizarDescenso(dt, entrada);
    } else if (this._fase === 'resultado') {
      this._actualizarResultado(dt, entrada);
    }
  }

  _actualizarIntro(dt, entrada) {
    if (this._tiempoFase > 1.5 && !this._bloqueoEntrada) {
      if (entrada.estaPresionada('accion')) {
        this._fase = 'descendiendo';
        this._tiempoFase = 0;
        this._bloqueoEntrada = true;
      }
    }
    if (!entrada.estaPresionada('accion')) this._bloqueoEntrada = false;
  }

  _actualizarResultado(dt, entrada) {
    if (this._tiempoFase > 1.5 && !this._bloqueoEntrada) {
      if (entrada.estaPresionada('accion')) {
        if (this._resultado === 'fallo') {
          // Reiniciar — permitir reintento
          this.iniciar({ alTerminar: this._alTerminar, juego: this._juego });
        } else {
          this.enJuego = false;
          this._alTerminar(this._resultado);
        }
      }
    }
    if (!entrada.estaPresionada('accion')) this._bloqueoEntrada = false;
  }

  // ============================================================
  // DESCENSO — la mecánica principal
  // ============================================================
  _actualizarDescenso(dt, entrada) {
    // --- Generar nuevos prompts ---
    this._proximoPrompt -= dt;
    if (this._proximoPrompt <= 0 && this._promptsCompletados + this._prompts.length < this._totalPrompts) {
      const dirs = ['arriba', 'abajo', 'izquierda', 'derecha'];
      this._prompts.push({
        dir: dirs[Math.floor(Math.random() * 4)],
        y: 500, // empieza abajo
        activo: true,
        resuelto: false
      });
      // Dificultad progresiva: más rápido conforme baja
      const progreso = this._promptsCompletados / this._totalPrompts;
      this._intervaloPrompt = 1.0 - progreso * 0.55; // de 1.0s a 0.45s
      this._proximoPrompt = this._intervaloPrompt;
    }

    // --- Mover prompts hacia arriba ---
    const velocidadPrompt = 120 + (this._promptsCompletados / this._totalPrompts) * 80; // 120-200 px/s
    for (const p of this._prompts) {
      if (p.activo) {
        p.y -= velocidadPrompt * dt;
      }
    }

    // --- Detectar input del jugador ---
    const dirs = ['arriba', 'abajo', 'izquierda', 'derecha'];
    for (const dir of dirs) {
      const presionada = entrada.estaPresionada(dir);
      if (presionada && !this._teclasAnteriores[dir]) {
        // Flanco de subida — buscar un prompt en la zona dulce
        this._procesarInput(dir);
      }
      this._teclasAnteriores[dir] = presionada;
    }

    // --- Eliminar prompts que pasaron la zona (fallidos) ---
    this._prompts = this._prompts.filter(p => {
      if (p.activo && p.y < this._zonaY - this._zonaAlto * 1.5) {
        // Se pasó — falló
        this._agarre -= 25;
        this._flash = 'rojo';
        this._flashTiempo = 0.3;
        this._sacudida = 0.3;
        this._balanceo = (Math.random() - 0.5) * 20;
        return false;
      }
      if (p.resuelto && p.y < 50) return false; // limpiar resueltos que subieron
      return true;
    });

    // --- Balanceo del personaje en la cuerda ---
    this._balanceo *= 0.95;
    this._balanceo += Math.sin(this._tiempoTotal * 1.5) * 0.3;

    // --- Actualizar posición visual ---
    const progreso = this._promptsCompletados / this._totalPrompts;
    this._personajeY = 200 + progreso * 150; // baja visualmente
    this._profundidad = progreso * 30; // metros

    // --- Condiciones de fin ---
    if (this._agarre <= 0) {
      this._resultado = 'fallo';
      this._fase = 'resultado';
      this._tiempoFase = 0;
      this._bloqueoEntrada = true;
    } else if (this._promptsCompletados >= this._totalPrompts) {
      this._resultado = 'exito';
      this._fase = 'resultado';
      this._tiempoFase = 0;
      this._bloqueoEntrada = true;
    }
  }

  // --- Procesar una tecla presionada ---
  _procesarInput(dir) {
    // Buscar el prompt más cercano a la zona dulce que coincida con la dirección
    let mejor = null;
    let mejorDist = Infinity;

    for (const p of this._prompts) {
      if (!p.activo || p.resuelto) continue;
      if (p.dir !== dir) continue;
      const dist = Math.abs(p.y - this._zonaY);
      if (dist < this._zonaAlto && dist < mejorDist) {
        mejor = p;
        mejorDist = dist;
      }
    }

    if (mejor) {
      // ¡Acierto!
      mejor.resuelto = true;
      mejor.activo = false;
      this._promptsCompletados++;
      this._flash = 'verde';
      this._flashTiempo = 0.2;
      this._juego?.sfx?.recoger?.();
    } else {
      // Presionó en mal momento o dirección incorrecta
      this._agarre -= 12;
      this._flash = 'rojo';
      this._flashTiempo = 0.3;
      this._sacudida = 0.15;
      this._balanceo += (Math.random() - 0.5) * 15;
    }
  }

  // ============================================================
  // DIBUJAR
  // ============================================================
  dibujar(ctx, ancho, alto, textos) {
    if (!this.enJuego) return;

    ctx.save();

    // Sacudida
    if (this._sacudida > 0) {
      ctx.translate(Math.sin(this._tiempoTotal * 40) * this._sacudida * 8, 0);
    }

    // --- Fondo: pozo vertical oscuro ---
    this._dibujarPozo(ctx, ancho, alto);

    if (this._fase === 'intro') {
      this._dibujarIntro(ctx, ancho, alto);
    } else if (this._fase === 'descendiendo') {
      this._dibujarDescenso(ctx, ancho, alto);
    } else if (this._fase === 'resultado') {
      this._dibujarDescenso(ctx, ancho, alto);
      this._dibujarResultado(ctx, ancho, alto);
    }

    ctx.restore();
  }

  // --- Fondo del pozo ---
  _dibujarPozo(ctx, ancho, alto) {
    // Oscuridad total con paredes de roca
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, ancho, alto);

    // Paredes rocosas a los lados
    const paredIzq = ancho * 0.25;
    const paredDer = ancho * 0.75;

    // Textura de roca
    ctx.fillStyle = '#1a1a25';
    ctx.fillRect(0, 0, paredIzq, alto);
    ctx.fillRect(paredDer, 0, ancho - paredDer, alto);

    // Detalles de roca (grietas y protuberancias)
    ctx.strokeStyle = '#252535';
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      const y = (i * 73 + Math.floor(this._profundidad * 5)) % alto;
      // Lado izquierdo
      ctx.beginPath();
      ctx.moveTo(paredIzq - 5 - (i % 3) * 8, y);
      ctx.lineTo(paredIzq, y + 10 + (i % 4) * 5);
      ctx.stroke();
      // Lado derecho
      ctx.beginPath();
      ctx.moveTo(paredDer + 5 + (i % 3) * 8, y);
      ctx.lineTo(paredDer, y + 10 + (i % 4) * 5);
      ctx.stroke();
    }

    // Luz tenue desde arriba
    const gradLuz = ctx.createRadialGradient(ancho / 2, 0, 10, ancho / 2, 0, 250);
    gradLuz.addColorStop(0, 'rgba(100, 120, 150, 0.15)');
    gradLuz.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradLuz;
    ctx.fillRect(paredIzq, 0, paredDer - paredIzq, alto);

    // Cuerda vertical en el centro
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ancho / 2, 0);
    ctx.lineTo(ancho / 2, alto);
    ctx.stroke();
    // Textura de cuerda
    ctx.strokeStyle = '#6B5335';
    ctx.lineWidth = 1;
    for (let y = 0; y < alto; y += 12) {
      ctx.beginPath();
      ctx.moveTo(ancho / 2 - 2, y);
      ctx.lineTo(ancho / 2 + 2, y + 6);
      ctx.stroke();
    }
  }

  // --- Pantalla intro ---
  _dibujarIntro(ctx, ancho, alto) {
    const t = this._textos();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(ancho * 0.1, alto * 0.12, ancho * 0.8, alto * 0.76);
    ctx.strokeStyle = '#CCAA44';
    ctx.lineWidth = 2;
    ctx.strokeRect(ancho * 0.1, alto * 0.12, ancho * 0.8, alto * 0.76);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 20px monospace';
    ctx.fillText(t?.titulo || '🧗 Rapel — Manantial de la Aleta', ancho / 2, alto * 0.23);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px monospace';
    const instrucciones = [
      t?.instr1 || 'Flechas de dirección subirán por la pantalla.',
      t?.instr2 || 'Presiona ↑ ↓ ← → cuando lleguen a la zona verde.',
      t?.instr3 || '¡Aciertos te bajan por la cuerda!',
      t?.instr4 || 'Fallar reduce tu agarre. Si llega a 0, ¡caes!'
    ];
    for (let i = 0; i < instrucciones.length; i++) {
      ctx.fillText(instrucciones[i], ancho / 2, alto * 0.38 + i * 26);
    }

    ctx.fillStyle = '#AAAAAA';
    ctx.font = '12px monospace';
    ctx.fillText(t?.dato || '📋 Los arqueólogos usan rapel para acceder a cenotes verticales.', ancho / 2, alto * 0.6);

    if (this._tiempoFase > 1.5) {
      ctx.fillStyle = '#CCAA44';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(t?.comenzar || '[E] Comenzar descenso', ancho / 2, alto * 0.74);
    }
    ctx.textAlign = 'left';
  }

  // --- Descenso: flechas, personaje, HUD ---
  _dibujarDescenso(ctx, ancho, alto) {
    const centroX = ancho / 2;

    // --- Zona dulce (hit zone) ---
    const zonaIzq = centroX - 60;
    const zonaDer = centroX + 60;
    ctx.fillStyle = this._flash === 'verde' && this._flashTiempo > 0
      ? 'rgba(0, 200, 0, 0.25)'
      : this._flash === 'rojo' && this._flashTiempo > 0
        ? 'rgba(200, 0, 0, 0.25)'
        : 'rgba(0, 255, 0, 0.08)';
    ctx.fillRect(zonaIzq, this._zonaY - this._zonaAlto / 2, zonaDer - zonaIzq, this._zonaAlto);
    // Bordes de la zona
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(zonaIzq, this._zonaY - this._zonaAlto / 2, zonaDer - zonaIzq, this._zonaAlto);

    // --- Flechas (prompts) ---
    for (const p of this._prompts) {
      if (p.resuelto) continue;
      const flechaX = centroX;
      const flechaY = p.y;
      const enZona = Math.abs(flechaY - this._zonaY) < this._zonaAlto / 2;

      ctx.fillStyle = enZona ? '#FFD700' : '#AAAAAA';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';

      const simbolos = { arriba: '▲', abajo: '▼', izquierda: '◀', derecha: '▶' };
      ctx.fillText(simbolos[p.dir], flechaX, flechaY + 8);
    }

    // --- Personaje en la cuerda ---
    const pjX = centroX + this._balanceo;
    const pjY = this._personajeY;
    // Cuerpo
    ctx.fillStyle = '#2266AA';
    ctx.fillRect(pjX - 5, pjY - 12, 10, 16);
    // Cabeza
    ctx.fillStyle = '#DEB887';
    ctx.beginPath();
    ctx.arc(pjX, pjY - 16, 5, 0, Math.PI * 2);
    ctx.fill();
    // Casco
    ctx.fillStyle = '#DD8800';
    ctx.beginPath();
    ctx.arc(pjX, pjY - 18, 5, Math.PI, Math.PI * 2);
    ctx.fill();
    // Brazos en la cuerda
    ctx.strokeStyle = '#DEB887';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(pjX - 5, pjY - 6);
    ctx.lineTo(centroX, pjY - 18);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pjX + 5, pjY - 6);
    ctx.lineTo(centroX, pjY - 10);
    ctx.stroke();
    // Piernas
    ctx.strokeStyle = '#885522';
    ctx.beginPath();
    ctx.moveTo(pjX - 3, pjY + 4);
    ctx.lineTo(pjX - 6, pjY + 14);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pjX + 3, pjY + 4);
    ctx.lineTo(pjX + 6, pjY + 14);
    ctx.stroke();

    // --- HUD ---
    ctx.textAlign = 'left';

    // Medidor de agarre (izquierda)
    const t = this._textos();
    ctx.fillStyle = '#222';
    ctx.fillRect(15, 15, 110, 14);
    const agarrePct = this._agarre / 100;
    ctx.fillStyle = agarrePct > 0.5 ? '#44AA44' : agarrePct > 0.25 ? '#CCAA22' : '#CC4444';
    ctx.fillRect(15, 15, 110 * agarrePct, 14);
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.strokeRect(15, 15, 110, 14);
    ctx.fillStyle = '#FFF';
    ctx.font = '10px monospace';
    ctx.fillText(t?.agarre || 'Agarre', 18, 26);

    // Profundidad (derecha)
    ctx.textAlign = 'right';
    ctx.fillStyle = '#AAAAAA';
    ctx.font = '13px monospace';
    ctx.fillText(`${Math.floor(this._profundidad)}m / 30m`, ancho - 15, 27);

    // Barra de progreso (derecha)
    ctx.fillStyle = '#222';
    ctx.fillRect(ancho - 125, 35, 110, 10);
    const progPct = this._promptsCompletados / this._totalPrompts;
    ctx.fillStyle = '#4488CC';
    ctx.fillRect(ancho - 125, 35, 110 * progPct, 10);
    ctx.strokeStyle = '#666';
    ctx.strokeRect(ancho - 125, 35, 110, 10);

    ctx.textAlign = 'left';
  }

  // --- Pantalla de resultado ---
  _dibujarResultado(ctx, ancho, alto) {
    const t = this._textos();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, alto * 0.3, ancho, alto * 0.35);

    ctx.textAlign = 'center';
    ctx.font = 'bold 22px monospace';

    if (this._resultado === 'exito') {
      ctx.fillStyle = '#44CC44';
      ctx.fillText(t?.exito || '✅ ¡Llegaste al fondo del cenote!', ancho / 2, alto * 0.43);
    } else {
      ctx.fillStyle = '#CC4444';
      ctx.fillText(t?.fallo || '💀 ¡Perdiste el agarre!', ancho / 2, alto * 0.43);
    }

    if (this._tiempoFase > 1.5) {
      ctx.fillStyle = '#CCAA44';
      ctx.font = '15px monospace';
      if (this._resultado === 'fallo') {
        ctx.fillText(t?.reintentar || '[E] Reintentar', ancho / 2, alto * 0.55);
      } else {
        ctx.fillText(t?.continuar || '[E] Continuar', ancho / 2, alto * 0.55);
      }
    }
    ctx.textAlign = 'left';
  }
}
