// ============================================================
// AREITO.JS — Mini-juego de danza areíto (DDR / Friday Night Funkin)
// ============================================================
// El areíto era la ceremonia sagrada de los taínos: danza, canto
// y narración oral. Aquí lo representamos como un juego de ritmo
// estilo Dance Dance Revolution.
//
// Flechas suben por 4 carriles (← ↓ ↑ →). El jugador presiona
// la dirección cuando la flecha llega a la zona de acierto.
// 3 niveles de dificultad creciente dentro de la misma canción.
// Puntuación: Perfecto > Bien > Fallo. Combo multiplicador.
// ============================================================

export class JuegoAreito {
  constructor() {
    this.enJuego = false;
    this._resultado = null;
  }

  // config: { alTerminar: fn(gano), juego }
  iniciar(config) {
    this.enJuego = true;
    this._resultado = null;
    this._alTerminar = config.alTerminar || (() => {});
    this._juego = config.juego;

    // --- Fase ---
    this._fase = 'intro'; // 'intro' → 'bailando' → 'resultado'
    this._tiempoFase = 0;
    this._tiempoTotal = 0;

    // --- Canción: secuencia de notas con timestamps ---
    // Cada nota: { dir: 'izquierda'|'abajo'|'arriba'|'derecha', tiempo: segundos }
    this._notas = this._generarCancion();
    this._indiceNota = 0; // próxima nota a activar

    // --- Notas activas en pantalla ---
    this._notasActivas = [];

    // --- Puntuación ---
    this._perfecto = 0;
    this._bien = 0;
    this._fallo = 0;
    this._combo = 0;
    this._maxCombo = 0;
    this._puntos = 0;

    // --- Zona de acierto ---
    this._zonaY = 80; // donde las flechas deben ser presionadas (arriba)
    this._toleranciaPerfecto = 18; // píxeles para "perfecto"
    this._toleranciaBien = 35; // píxeles para "bien"

    // --- Velocidad de las notas (aumenta por fase) ---
    this._velocidad = 200; // px/s

    // --- Fase de dificultad (cambia durante la canción) ---
    this._faseCancion = 1; // 1, 2, 3
    this._duracionCancion = 60; // segundos total

    // --- Efectos visuales ---
    this._flashCarril = [0, 0, 0, 0]; // flash por carril al acertar
    this._sacudida = 0;
    this._feedbackTexto = '';
    this._feedbackTiempo = 0;

    // --- Danzarines (animación de fondo) ---
    this._danzarines = [];
    for (let i = 0; i < 6; i++) {
      this._danzarines.push({
        x: 100 + i * 130, fase: Math.random() * Math.PI * 2
      });
    }

    // --- Input ---
    this._bloqueoEntrada = true;
    this._teclasAnteriores = { izquierda: false, abajo: false, arriba: false, derecha: false };
  }

  // --- Generar la secuencia de notas de la canción ---
  _generarCancion() {
    const notas = [];
    const dirs = ['izquierda', 'abajo', 'arriba', 'derecha'];
    let t = 2.0; // empezar después de 2 segundos

    // --- FASE 1: Lenta y simple (0-20s) — una nota a la vez ---
    while (t < 20) {
      notas.push({ dir: dirs[Math.floor(Math.random() * 4)], tiempo: t });
      t += 0.7 + Math.random() * 0.3; // 0.7-1.0s entre notas
    }

    // --- FASE 2: Más rápida, algunas notas dobles (20-40s) ---
    while (t < 40) {
      notas.push({ dir: dirs[Math.floor(Math.random() * 4)], tiempo: t });
      // 30% chance de nota doble (dos direcciones al mismo tiempo)
      if (Math.random() < 0.3) {
        let dir2 = dirs[Math.floor(Math.random() * 4)];
        while (dir2 === notas[notas.length - 1].dir) {
          dir2 = dirs[Math.floor(Math.random() * 4)];
        }
        notas.push({ dir: dir2, tiempo: t + 0.05 });
      }
      t += 0.45 + Math.random() * 0.25; // 0.45-0.7s entre notas
    }

    // --- FASE 3: Intensa, secuencias rápidas (40-58s) ---
    while (t < 58) {
      // Patrones rítmicos (ráfagas de 3-4 notas rápidas)
      const patron = Math.floor(Math.random() * 4);
      if (patron === 0) {
        // Escalera ← ↓ ↑ →
        for (let i = 0; i < 4; i++) {
          notas.push({ dir: dirs[i], tiempo: t + i * 0.2 });
        }
        t += 1.0;
      } else if (patron === 1) {
        // Zigzag ← → ← →
        for (let i = 0; i < 4; i++) {
          notas.push({ dir: dirs[i % 2 === 0 ? 0 : 3], tiempo: t + i * 0.25 });
        }
        t += 1.2;
      } else if (patron === 2) {
        // Dobles simultáneos
        notas.push({ dir: 'izquierda', tiempo: t });
        notas.push({ dir: 'derecha', tiempo: t });
        t += 0.5;
        notas.push({ dir: 'arriba', tiempo: t });
        notas.push({ dir: 'abajo', tiempo: t });
        t += 0.6;
      } else {
        // Notas individuales rápidas
        for (let i = 0; i < 3; i++) {
          notas.push({ dir: dirs[Math.floor(Math.random() * 4)], tiempo: t + i * 0.18 });
        }
        t += 0.8;
      }
    }

    return notas;
  }

  // --- Textos traducidos ---
  _textos() {
    const t = this._juego?.idiomas?.traducciones?.[this._juego?.idiomas?.idiomaActual];
    return t?.areito || {};
  }

  // ============================================================
  // ACTUALIZAR
  // ============================================================
  actualizar(dt, entrada) {
    this._tiempoTotal += dt;
    this._tiempoFase += dt;
    if (this._sacudida > 0) this._sacudida -= dt;
    if (this._feedbackTiempo > 0) this._feedbackTiempo -= dt;
    for (let i = 0; i < 4; i++) {
      if (this._flashCarril[i] > 0) this._flashCarril[i] -= dt;
    }

    if (this._fase === 'intro') {
      this._actualizarIntro(dt, entrada);
    } else if (this._fase === 'bailando') {
      this._actualizarBaile(dt, entrada);
    } else if (this._fase === 'resultado') {
      this._actualizarResultado(dt, entrada);
    }
  }

  _actualizarIntro(dt, entrada) {
    if (this._tiempoFase > 1.5 && !this._bloqueoEntrada) {
      if (entrada.estaPresionada('accion')) {
        this._fase = 'bailando';
        this._tiempoFase = 0;
        this._bloqueoEntrada = true;
      }
    }
    if (!entrada.estaPresionada('accion')) this._bloqueoEntrada = false;
  }

  _actualizarResultado(dt, entrada) {
    if (this._tiempoFase > 2.0 && !this._bloqueoEntrada) {
      if (entrada.estaPresionada('accion')) {
        this.enJuego = false;
        const total = this._perfecto + this._bien + this._fallo;
        const gano = total > 0 && (this._perfecto + this._bien) / total >= 0.6;
        this._alTerminar(gano);
      }
    }
    if (!entrada.estaPresionada('accion')) this._bloqueoEntrada = false;
  }

  // ============================================================
  // BAILE — la mecánica principal
  // ============================================================
  _actualizarBaile(dt, entrada) {
    const tiempoCancion = this._tiempoFase;

    // --- Actualizar fase de dificultad ---
    if (tiempoCancion < 20) this._faseCancion = 1;
    else if (tiempoCancion < 40) this._faseCancion = 2;
    else this._faseCancion = 3;

    // Velocidad aumenta por fase
    this._velocidad = 180 + (this._faseCancion - 1) * 40;

    // --- Activar notas que ya deben aparecer ---
    const tiempoAnticipacion = 400 / this._velocidad; // tiempo que tarda en llegar a la zona
    while (this._indiceNota < this._notas.length) {
      const nota = this._notas[this._indiceNota];
      if (nota.tiempo - tiempoAnticipacion <= tiempoCancion) {
        const carril = ['izquierda', 'abajo', 'arriba', 'derecha'].indexOf(nota.dir);
        this._notasActivas.push({
          dir: nota.dir,
          carril: carril,
          y: 500, // empieza abajo
          tiempoObjetivo: nota.tiempo,
          activa: true
        });
        this._indiceNota++;
      } else {
        break;
      }
    }

    // --- Mover notas hacia arriba ---
    for (const n of this._notasActivas) {
      if (n.activa) {
        n.y -= this._velocidad * dt;
      }
    }

    // --- Detectar input ---
    const dirs = ['izquierda', 'abajo', 'arriba', 'derecha'];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      const presionada = entrada.estaPresionada(dir);
      if (presionada && !this._teclasAnteriores[dir]) {
        this._procesarInput(dir, i);
      }
      this._teclasAnteriores[dir] = presionada;
    }

    // --- Notas que pasaron sin ser presionadas (fallo) ---
    this._notasActivas = this._notasActivas.filter(n => {
      if (n.activa && n.y < this._zonaY - 50) {
        this._fallo++;
        this._combo = 0;
        this._feedbackTexto = 'MISS';
        this._feedbackTiempo = 0.4;
        return false;
      }
      if (!n.activa && n.y < -20) return false; // limpiar resueltas
      return true;
    });

    // --- Fin de la canción ---
    if (tiempoCancion >= this._duracionCancion &&
        this._notasActivas.length === 0 &&
        this._indiceNota >= this._notas.length) {
      this._fase = 'resultado';
      this._tiempoFase = 0;
      this._bloqueoEntrada = true;
    }
  }

  _procesarInput(dir, carril) {
    // Buscar la nota más cercana a la zona de acierto en este carril
    let mejor = null;
    let mejorDist = Infinity;

    for (const n of this._notasActivas) {
      if (!n.activa || n.dir !== dir) continue;
      const dist = Math.abs(n.y - this._zonaY);
      if (dist < this._toleranciaBien && dist < mejorDist) {
        mejor = n;
        mejorDist = dist;
      }
    }

    if (mejor) {
      mejor.activa = false;
      this._flashCarril[carril] = 0.15;

      if (mejorDist <= this._toleranciaPerfecto) {
        this._perfecto++;
        this._combo++;
        this._puntos += 100 * Math.min(4, 1 + Math.floor(this._combo / 10));
        this._feedbackTexto = '✨ PERFECTO';
        this._feedbackTiempo = 0.3;
        this._juego?.sfx?.recoger?.();
      } else {
        this._bien++;
        this._combo++;
        this._puntos += 50 * Math.min(4, 1 + Math.floor(this._combo / 10));
        this._feedbackTexto = '👍 BIEN';
        this._feedbackTiempo = 0.3;
      }

      if (this._combo > this._maxCombo) this._maxCombo = this._combo;
    } else {
      // Presionó sin nota cerca
      this._fallo++;
      this._combo = 0;
      this._feedbackTexto = 'MISS';
      this._feedbackTiempo = 0.4;
      this._sacudida = 0.1;
    }
  }

  // ============================================================
  // DIBUJAR
  // ============================================================
  dibujar(ctx, ancho, alto, textos) {
    if (!this.enJuego) return;

    ctx.save();
    if (this._sacudida > 0) {
      ctx.translate(Math.sin(this._tiempoTotal * 40) * this._sacudida * 6, 0);
    }

    // --- Fondo: batey ceremonial de noche con antorchas ---
    this._dibujarFondo(ctx, ancho, alto);

    if (this._fase === 'intro') {
      this._dibujarIntro(ctx, ancho, alto);
    } else if (this._fase === 'bailando') {
      this._dibujarBaile(ctx, ancho, alto);
    } else if (this._fase === 'resultado') {
      this._dibujarBaile(ctx, ancho, alto);
      this._dibujarResultado(ctx, ancho, alto);
    }

    ctx.restore();
  }

  _dibujarFondo(ctx, ancho, alto) {
    // Cielo nocturno
    const grad = ctx.createLinearGradient(0, 0, 0, alto * 0.4);
    grad.addColorStop(0, '#0a0a1a');
    grad.addColorStop(1, '#1a1530');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, ancho, alto);

    // Estrellas
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 30; i++) {
      const sx = (i * 113 + 30) % ancho;
      const sy = (i * 67 + 10) % (alto * 0.3);
      ctx.globalAlpha = 0.3 + (i % 3) * 0.2;
      ctx.fillRect(sx, sy, i % 4 === 0 ? 2 : 1, 1);
    }
    ctx.globalAlpha = 1;

    // Suelo del batey (tierra compacta)
    ctx.fillStyle = '#3a3020';
    ctx.fillRect(0, alto * 0.7, ancho, alto * 0.3);
    ctx.fillStyle = '#4a3a28';
    ctx.fillRect(0, alto * 0.7, ancho, 3);

    // Antorchas a los lados
    for (let i = 0; i < 4; i++) {
      const tx = 50 + i * (ancho - 100) / 3;
      const ty = alto * 0.65;
      // Palo
      ctx.fillStyle = '#5a3a1a';
      ctx.fillRect(tx - 2, ty, 4, 30);
      // Llama (animada)
      const flicker = Math.sin(this._tiempoTotal * 8 + i * 2) * 3;
      ctx.fillStyle = '#FF8800';
      ctx.beginPath();
      ctx.ellipse(tx, ty - 5 + flicker, 6, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFCC00';
      ctx.beginPath();
      ctx.ellipse(tx, ty - 5 + flicker, 3, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      // Luz de la antorcha
      const gradLuz = ctx.createRadialGradient(tx, ty, 5, tx, ty, 80);
      gradLuz.addColorStop(0, 'rgba(255, 150, 50, 0.1)');
      gradLuz.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradLuz;
      ctx.fillRect(tx - 80, ty - 80, 160, 160);
    }

    // Danzarines de fondo (siluetas animadas)
    if (this._fase === 'bailando') {
      ctx.fillStyle = 'rgba(80, 60, 30, 0.6)';
      for (const d of this._danzarines) {
        d.fase += 3 * 0.016; // avance constante
        const dy = alto * 0.68 + Math.sin(d.fase * 2) * 8;
        // Cuerpo
        ctx.beginPath();
        ctx.ellipse(d.x, dy, 5, 12, Math.sin(d.fase) * 0.3, 0, Math.PI * 2);
        ctx.fill();
        // Cabeza
        ctx.beginPath();
        ctx.arc(d.x + Math.sin(d.fase) * 3, dy - 16, 4, 0, Math.PI * 2);
        ctx.fill();
        // Brazos
        const brazoAng = Math.sin(d.fase * 1.5) * 0.8;
        ctx.beginPath();
        ctx.moveTo(d.x, dy - 8);
        ctx.lineTo(d.x + Math.cos(brazoAng) * 12, dy - 8 + Math.sin(brazoAng) * 10);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(80, 60, 30, 0.6)';
        ctx.stroke();
      }
    }
  }

  _dibujarIntro(ctx, ancho, alto) {
    const t = this._textos();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(ancho * 0.08, alto * 0.1, ancho * 0.84, alto * 0.8);
    ctx.strokeStyle = '#CCAA44';
    ctx.lineWidth = 2;
    ctx.strokeRect(ancho * 0.08, alto * 0.1, ancho * 0.84, alto * 0.8);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 22px monospace';
    ctx.fillText(t?.titulo || '💃 Areíto — Danza Ceremonial Taína', ancho / 2, alto * 0.21);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px monospace';
    const instrucciones = [
      t?.instr1 || 'Flechas suben por 4 carriles: ← ↓ ↑ →',
      t?.instr2 || 'Presiona la dirección cuando llegue a la zona superior.',
      t?.instr3 || '✨ Perfecto = timing exacto | 👍 Bien = cerca',
      t?.instr4 || '¡Mantén el combo para multiplicar puntos!'
    ];
    for (let i = 0; i < instrucciones.length; i++) {
      ctx.fillText(instrucciones[i], ancho / 2, alto * 0.35 + i * 26);
    }

    ctx.fillStyle = '#AAAAAA';
    ctx.font = '12px monospace';
    ctx.fillText(t?.dato || '🎵 El areíto era la ceremonia más importante de los taínos.', ancho / 2, alto * 0.58);
    ctx.fillText(t?.dato2 || 'Cantaban la historia del pueblo para que nunca se olvidara.', ancho / 2, alto * 0.62);

    // Dificultad
    ctx.fillStyle = '#FF8844';
    ctx.font = '13px monospace';
    ctx.fillText(t?.fases || '3 fases: 🟢 Lenta → 🟡 Media → 🔴 Intensa', ancho / 2, alto * 0.72);

    if (this._tiempoFase > 1.5) {
      ctx.fillStyle = '#CCAA44';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(t?.comenzar || '[E] ¡Que comience el areíto!', ancho / 2, alto * 0.82);
    }
    ctx.textAlign = 'left';
  }

  _dibujarBaile(ctx, ancho, alto) {
    // --- 4 carriles de flechas ---
    const carriles = ['◀', '▼', '▲', '▶'];
    const colores = ['#CC4444', '#4488CC', '#44CC44', '#CCAA44'];
    const carrilAncho = 60;
    const carrilInicioX = (ancho - 4 * carrilAncho) / 2;

    // Fondo de los carriles (semi-transparente)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(carrilInicioX - 5, 0, 4 * carrilAncho + 10, alto * 0.85);

    // Líneas divisorias
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const x = carrilInicioX + i * carrilAncho;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, alto * 0.85);
      ctx.stroke();
    }

    // --- Zona de acierto (arriba) ---
    for (let i = 0; i < 4; i++) {
      const cx = carrilInicioX + i * carrilAncho + carrilAncho / 2;
      const flash = this._flashCarril[i] > 0;

      // Contorno de la flecha objetivo
      ctx.strokeStyle = flash ? '#FFFFFF' : 'rgba(150, 150, 150, 0.5)';
      ctx.lineWidth = flash ? 3 : 2;
      ctx.font = flash ? 'bold 28px monospace' : '26px monospace';
      ctx.fillStyle = flash ? colores[i] : 'rgba(100, 100, 100, 0.3)';
      ctx.textAlign = 'center';
      ctx.fillText(carriles[i], cx, this._zonaY + 8);
    }

    // --- Notas activas ---
    for (const n of this._notasActivas) {
      if (!n.activa) continue;
      const cx = carrilInicioX + n.carril * carrilAncho + carrilAncho / 2;
      const enZona = Math.abs(n.y - this._zonaY) < this._toleranciaBien;

      ctx.fillStyle = enZona ? '#FFFFFF' : colores[n.carril];
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(carriles[n.carril], cx, n.y + 8);
    }

    // --- Indicador de fase ---
    const faseNombres = ['', '🟢 Fase 1', '🟡 Fase 2', '🔴 Fase 3'];
    ctx.textAlign = 'left';
    ctx.fillStyle = this._faseCancion === 3 ? '#CC4444' : this._faseCancion === 2 ? '#CCAA44' : '#44CC44';
    ctx.font = '12px monospace';
    ctx.fillText(faseNombres[this._faseCancion], 15, alto - 15);

    // --- HUD: puntos, combo ---
    ctx.textAlign = 'right';
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`${this._puntos}`, ancho - 15, 25);

    // Combo
    if (this._combo >= 5) {
      ctx.fillStyle = this._combo >= 20 ? '#FF4444' : this._combo >= 10 ? '#FFAA00' : '#44CC44';
      ctx.font = 'bold 14px monospace';
      ctx.fillText(`${this._combo} COMBO`, ancho - 15, 45);
    }

    // --- Feedback (PERFECTO / BIEN / MISS) ---
    if (this._feedbackTiempo > 0) {
      const alpha = Math.min(1, this._feedbackTiempo * 3);
      ctx.globalAlpha = alpha;
      ctx.textAlign = 'center';
      ctx.font = 'bold 20px monospace';
      if (this._feedbackTexto.includes('PERFECTO')) {
        ctx.fillStyle = '#FFD700';
      } else if (this._feedbackTexto.includes('BIEN')) {
        ctx.fillStyle = '#44CC44';
      } else {
        ctx.fillStyle = '#CC4444';
      }
      ctx.fillText(this._feedbackTexto, ancho / 2, alto * 0.5);
      ctx.globalAlpha = 1;
    }

    // --- Barra de progreso de la canción ---
    ctx.textAlign = 'left';
    const progreso = Math.min(1, this._tiempoFase / this._duracionCancion);
    ctx.fillStyle = '#222';
    ctx.fillRect(15, alto - 8, ancho - 30, 4);
    ctx.fillStyle = '#CCAA44';
    ctx.fillRect(15, alto - 8, (ancho - 30) * progreso, 4);
  }

  _dibujarResultado(ctx, ancho, alto) {
    const t = this._textos();
    const total = this._perfecto + this._bien + this._fallo;
    const gano = total > 0 && (this._perfecto + this._bien) / total >= 0.6;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(ancho * 0.1, alto * 0.12, ancho * 0.8, alto * 0.76);
    ctx.strokeStyle = '#CCAA44';
    ctx.lineWidth = 2;
    ctx.strokeRect(ancho * 0.1, alto * 0.12, ancho * 0.8, alto * 0.76);

    ctx.textAlign = 'center';

    // Título
    ctx.fillStyle = gano ? '#FFD700' : '#CC4444';
    ctx.font = 'bold 22px monospace';
    ctx.fillText(gano
      ? (t?.victoria || '💃 ¡Areíto completado!')
      : (t?.derrota || '💔 La danza necesita más práctica...'), ancho / 2, alto * 0.25);

    // Estadísticas
    ctx.font = '15px monospace';
    ctx.fillStyle = '#FFFFFF';
    const stats = [
      `✨ ${t?.perfecto || 'Perfecto'}: ${this._perfecto}`,
      `👍 ${t?.bienLabel || 'Bien'}: ${this._bien}`,
      `❌ ${t?.falloLabel || 'Fallo'}: ${this._fallo}`,
      `🔥 ${t?.maxComboLabel || 'Max Combo'}: ${this._maxCombo}`,
      `⭐ ${t?.puntosLabel || 'Puntos'}: ${this._puntos}`
    ];
    for (let i = 0; i < stats.length; i++) {
      ctx.fillText(stats[i], ancho / 2, alto * 0.38 + i * 24);
    }

    // Calificación
    const ratio = total > 0 ? (this._perfecto + this._bien) / total : 0;
    let rango;
    if (ratio >= 0.95) rango = 'S';
    else if (ratio >= 0.85) rango = 'A';
    else if (ratio >= 0.7) rango = 'B';
    else if (ratio >= 0.6) rango = 'C';
    else rango = 'D';

    ctx.fillStyle = rango === 'S' ? '#FFD700' : rango === 'A' ? '#44CC44' : '#CCAA44';
    ctx.font = 'bold 36px monospace';
    ctx.fillText(rango, ancho / 2, alto * 0.7);
    ctx.font = '13px monospace';
    ctx.fillStyle = '#AAAAAA';
    ctx.fillText(`${Math.floor(ratio * 100)}%`, ancho / 2, alto * 0.74);

    if (this._tiempoFase > 2.0) {
      ctx.fillStyle = '#CCAA44';
      ctx.font = 'bold 15px monospace';
      ctx.fillText(t?.continuar || '[E] Continuar', ancho / 2, alto * 0.82);
    }
    ctx.textAlign = 'left';
  }
}
