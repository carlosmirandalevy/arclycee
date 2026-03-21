// ============================================================
// DUELO-ESPADA.JS — Mini-juego de duelo de espadas
// ============================================================
// Un duelo de espadas lateral contra el Soldado Diego en La Isabela.
// El jugador puede moverse (← →), atacar (E), bloquear/parry (Q)
// y agacharse (↓).
//
// Dos modos:
// - 'agresivo': pelea normal, ganar bajando los HP de Diego
// - 'pacifista': diálogos amistosos durante la pelea, convicción sube
//   progresivamente. Diego se rinde cuando la convicción llega a 100.
//
// El resultado ('victoria' o 'pacificado') se devuelve vía callback.
// ============================================================

export class DueloEspada {
  constructor(sfx) {
    this.sfx = sfx;
    this.enJuego = false;
    this._resultado = null;
  }

  // --- Iniciar el duelo ---
  // config: { modo: 'agresivo'|'pacifista', alTerminar: fn(resultado), juego }
  iniciar(config) {
    this.enJuego = true;
    this._resultado = null;
    this._modo = config.modo || 'agresivo';
    this._alTerminar = config.alTerminar || (() => {});
    this._juego = config.juego;

    // --- Fase del duelo ---
    this._fase = 'intro'; // 'intro' → 'combate' → 'resultado'
    this._tiempoFase = 0;
    this._tiempoTotal = 0;

    // --- Jugador ---
    this._jugador = {
      x: 200,
      estado: 'idle', // idle, caminando, atacando, bloqueando, agachado, herido
      tiempoEstado: 0,
      vida: 100,
      vidaMax: 100,
      miraDerecha: true,
      bloqueInicio: 0 // momento en que empezó a bloquear (para parry)
    };

    // --- Diego ---
    this._diego = {
      x: 550,
      estado: 'esperando', // esperando, acercando, atacandoAlto, atacandoBajo, retrocediendo, aturdido, rendido
      tiempoEstado: 0,
      vida: 60,
      vidaMax: 60,
      conviccion: 0, // solo en modo pacifista
      velocidadAtaque: 1.0 // se reduce en pacifista conforme sube convicción
    };

    // --- Diálogo pacifista ---
    this._dialogoActual = '';
    this._dialogoTiempo = 0;
    this._dialogoIndice = 0;
    this._dialogoIntervalo = 5; // segundos entre diálogos

    // --- Input ---
    this._bloqueoEntrada = true;
    this._teclaAtaqueAnterior = false;
    this._teclaBloqueoAnterior = false;

    // --- Efectos visuales ---
    this._chispas = []; // partículas de choque de espadas
    this._sacudida = 0;
  }

  // --- Obtener textos del duelo ---
  _textos() {
    const t = this._juego?.idiomas?.traducciones?.[this._juego?.idiomas?.idiomaActual];
    return t?.duelo || {};
  }

  // --- Diálogos pacifistas ---
  _dialogosPacifistas() {
    const d = this._textos();
    return [
      d?.paz1 || '¡Espera! Solo quiero hablar de historia.',
      d?.paz2 || 'Estas ruinas cuentan la historia de tu pueblo.',
      d?.paz3 || 'La Isabela fue la primera ciudad europea en América. ¡Merece protección!',
      d?.paz4 || 'No soy tu enemigo. Soy un arqueólogo accidental.',
      d?.paz5 || 'El patrimonio es de todos. Luchemos juntos por protegerlo.',
      d?.paz6 || 'Tu deber es proteger estas ruinas, no prohibirlas.',
      d?.paz7 || 'Los taínos y los españoles comparten esta historia.',
      d?.paz8 || '¡Piensa en lo que diría Fray Ramón Pané!'
    ];
  }

  // ============================================================
  // ACTUALIZAR — lógica de cada frame
  // ============================================================
  actualizar(dt, entrada) {
    this._tiempoTotal += dt;
    this._tiempoFase += dt;

    // Decrementar sacudida
    if (this._sacudida > 0) this._sacudida -= dt;

    // Actualizar chispas
    this._chispas = this._chispas.filter(c => {
      c.x += c.vx * dt * 60;
      c.y += c.vy * dt * 60;
      c.vida -= dt;
      return c.vida > 0;
    });

    // --- Despachar según fase ---
    if (this._fase === 'intro') {
      this._actualizarIntro(dt, entrada);
    } else if (this._fase === 'combate') {
      this._actualizarCombate(dt, entrada);
    } else if (this._fase === 'resultado') {
      this._actualizarResultado(dt, entrada);
    }
  }

  // --- Fase intro: mostrar instrucciones ---
  _actualizarIntro(dt, entrada) {
    if (this._tiempoFase > 1.5 && !this._bloqueoEntrada) {
      if (entrada.estaPresionada('accion')) {
        this._fase = 'combate';
        this._tiempoFase = 0;
        this._bloqueoEntrada = true;
      }
    }
    if (!entrada.estaPresionada('accion')) this._bloqueoEntrada = false;
  }

  // --- Fase resultado: esperar E ---
  _actualizarResultado(dt, entrada) {
    if (this._tiempoFase > 1.0 && !this._bloqueoEntrada) {
      if (entrada.estaPresionada('accion')) {
        this.enJuego = false;
        this._alTerminar(this._resultado);
      }
    }
    if (!entrada.estaPresionada('accion')) this._bloqueoEntrada = false;
  }

  // ============================================================
  // FASE COMBATE — la pelea principal
  // ============================================================
  _actualizarCombate(dt, entrada) {
    const j = this._jugador;
    const d = this._diego;
    const factorTiempo = dt * 60;

    // --- Desbloqueo de entrada ---
    const accionPresionada = entrada.estaPresionada('accion');
    const bloqueoPresionado = entrada.estaPresionada('cancelar');
    if (!accionPresionada) this._teclaAtaqueAnterior = false;
    if (!bloqueoPresionado) this._teclaBloqueoAnterior = false;

    // --- Actualizar estado del jugador ---
    j.tiempoEstado += dt;

    if (j.estado === 'herido' && j.tiempoEstado > 0.4) {
      j.estado = 'idle';
      j.tiempoEstado = 0;
    }
    if (j.estado === 'atacando' && j.tiempoEstado > 0.35) {
      j.estado = 'idle';
      j.tiempoEstado = 0;
    }

    // --- Input del jugador (solo si no está herido/atacando) ---
    if (j.estado !== 'herido' && j.estado !== 'atacando') {
      // Movimiento ← →
      const vel = 3.5;
      if (entrada.estaPresionada('izquierda')) {
        j.x -= vel * factorTiempo;
        j.miraDerecha = false;
        if (j.estado !== 'bloqueando' && j.estado !== 'agachado') j.estado = 'caminando';
      } else if (entrada.estaPresionada('derecha')) {
        j.x += vel * factorTiempo;
        j.miraDerecha = true;
        if (j.estado !== 'bloqueando' && j.estado !== 'agachado') j.estado = 'caminando';
      } else if (j.estado === 'caminando') {
        j.estado = 'idle';
        j.tiempoEstado = 0;
      }

      // Agacharse ↓
      if (entrada.estaPresionada('abajo')) {
        j.estado = 'agachado';
      } else if (j.estado === 'agachado') {
        j.estado = 'idle';
        j.tiempoEstado = 0;
      }

      // Bloquear Q
      if (bloqueoPresionado) {
        if (j.estado !== 'bloqueando') {
          j.estado = 'bloqueando';
          j.bloqueInicio = this._tiempoTotal;
          j.tiempoEstado = 0;
        }
      } else if (j.estado === 'bloqueando') {
        j.estado = 'idle';
        j.tiempoEstado = 0;
      }

      // Atacar E (flanco de subida)
      if (accionPresionada && !this._teclaAtaqueAnterior && j.estado !== 'bloqueando' && j.estado !== 'agachado') {
        j.estado = 'atacando';
        j.tiempoEstado = 0;
        j.miraDerecha = true; // siempre ataca hacia Diego
        this._juego?.sfx?.combateContraataque?.();
        this._teclaAtaqueAnterior = true;
      }
    }

    // Limitar posición del jugador
    j.x = Math.max(50, Math.min(j.x, 700));

    // --- Verificar golpe del jugador a Diego ---
    if (j.estado === 'atacando' && j.tiempoEstado > 0.08 && j.tiempoEstado < 0.25) {
      const distancia = d.x - j.x;
      if (distancia > 0 && distancia < 55 && d.estado !== 'aturdido') {
        if (this._modo === 'agresivo') {
          const dmg = 8 + Math.floor(Math.random() * 5);
          d.vida = Math.max(0, d.vida - dmg);
          this._crearChispas(d.x - 10, 220);
          this._juego?.sfx?.combateContraataque?.();
          this._sacudida = 0.15;
        } else {
          // En pacifista, atacar sube convicción un poco (el jugador "presiona")
          d.conviccion = Math.min(100, d.conviccion + 3);
          this._crearChispas(d.x - 10, 220);
        }
        // Empujar a Diego hacia atrás
        d.x = Math.min(750, d.x + 20);
        d.estado = 'retrocediendo';
        d.tiempoEstado = 0;
      }
    }

    // --- IA de Diego ---
    this._actualizarDiego(dt);

    // --- Verificar golpe de Diego al jugador ---
    if ((d.estado === 'atacandoAlto' || d.estado === 'atacandoBajo') &&
        d.tiempoEstado > 0.15 && d.tiempoEstado < 0.35) {
      const distancia = j.x - d.x;
      if (distancia < 0 && distancia > -60 && j.estado !== 'herido') {
        // ¿El jugador se defiende?
        if (d.estado === 'atacandoAlto' && j.estado === 'agachado') {
          // Esquivó agachándose — ataque alto falla
        } else if (j.estado === 'bloqueando') {
          // ¿Es parry? (bloqueó en los últimos 0.2s)
          const tiempoBloqueo = this._tiempoTotal - j.bloqueInicio;
          if (tiempoBloqueo < 0.2) {
            // ¡PARRY! Diego se aturde
            d.estado = 'aturdido';
            d.tiempoEstado = 0;
            this._crearChispas((j.x + d.x) / 2, 210);
            this._sacudida = 0.2;
            this._juego?.sfx?.combateContraataque?.();
            if (this._modo === 'pacifista') {
              d.conviccion = Math.min(100, d.conviccion + 8);
            }
          } else {
            // Bloqueo normal — daño reducido
            const dmg = 2;
            j.vida = Math.max(0, j.vida - dmg);
            this._crearChispas((j.x + d.x) / 2, 220);
            this._juego?.sfx?.combateContraataque?.();
          }
        } else {
          // Golpe directo
          const dmg = d.estado === 'atacandoBajo' ? 10 : 8;
          j.vida = Math.max(0, j.vida - dmg);
          j.estado = 'herido';
          j.tiempoEstado = 0;
          this._sacudida = 0.3;
          j.x -= 25; // empujón
        }
        // Marcar ataque como resuelto avanzando el timer
        d.tiempoEstado = 0.36;
      }
    }

    // --- Diálogos pacifistas ---
    if (this._modo === 'pacifista') {
      this._dialogoTiempo += dt;
      // Mostrar diálogo periódicamente
      if (this._dialogoTiempo >= this._dialogoIntervalo) {
        this._dialogoTiempo = 0;
        const dialogos = this._dialogosPacifistas();
        this._dialogoActual = dialogos[this._dialogoIndice % dialogos.length];
        this._dialogoIndice++;
        // Subir convicción con cada diálogo
        d.conviccion = Math.min(100, d.conviccion + 12);
        // Diego ataca más lento conforme sube convicción
        d.velocidadAtaque = Math.max(0.4, 1.0 - d.conviccion / 150);
      }
      // Ocultar diálogo después de 3.5 segundos
      if (this._dialogoTiempo > 3.5) {
        this._dialogoActual = '';
      }
    }

    // --- Condiciones de fin ---
    if (this._modo === 'agresivo' && d.vida <= 0) {
      this._resultado = 'victoria';
      this._fase = 'resultado';
      this._tiempoFase = 0;
      this._bloqueoEntrada = true;
      d.estado = 'rendido';
    } else if (this._modo === 'pacifista' && d.conviccion >= 100) {
      this._resultado = 'pacificado';
      this._fase = 'resultado';
      this._tiempoFase = 0;
      this._bloqueoEntrada = true;
      d.estado = 'rendido';
    } else if (j.vida <= 0) {
      this._resultado = 'derrota';
      this._fase = 'resultado';
      this._tiempoFase = 0;
      this._bloqueoEntrada = true;
    }
  }

  // --- IA de Diego ---
  _actualizarDiego(dt) {
    const d = this._diego;
    const j = this._jugador;
    d.tiempoEstado += dt;
    const distancia = Math.abs(j.x - d.x);
    const vel = d.velocidadAtaque;

    switch (d.estado) {
      case 'esperando':
        // Esperar antes del próximo ataque
        if (d.tiempoEstado > (1.2 / vel + Math.random() * 0.8)) {
          if (distancia > 70) {
            d.estado = 'acercando';
          } else {
            // Atacar: 60% alto, 40% bajo
            d.estado = Math.random() < 0.6 ? 'atacandoAlto' : 'atacandoBajo';
          }
          d.tiempoEstado = 0;
        }
        break;

      case 'acercando':
        // Caminar hacia el jugador
        d.x -= 2.5 * vel * dt * 60;
        d.x = Math.max(100, d.x);
        if (distancia < 65 || d.tiempoEstado > 2) {
          d.estado = Math.random() < 0.6 ? 'atacandoAlto' : 'atacandoBajo';
          d.tiempoEstado = 0;
        }
        break;

      case 'atacandoAlto':
      case 'atacandoBajo':
        // Animación de ataque (0.5s total)
        if (d.tiempoEstado > 0.5) {
          d.estado = 'retrocediendo';
          d.tiempoEstado = 0;
        }
        break;

      case 'retrocediendo':
        // Retroceder después de atacar
        d.x += 1.5 * dt * 60;
        d.x = Math.min(750, d.x);
        if (d.tiempoEstado > 0.6) {
          d.estado = 'esperando';
          d.tiempoEstado = 0;
        }
        break;

      case 'aturdido':
        // Aturdido por parry
        if (d.tiempoEstado > 1.0) {
          d.estado = 'retrocediendo';
          d.tiempoEstado = 0;
        }
        break;

      case 'rendido':
        // No hacer nada
        break;
    }
  }

  // --- Crear partículas de chispas ---
  _crearChispas(x, y) {
    for (let i = 0; i < 6; i++) {
      this._chispas.push({
        x, y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        vida: 0.3 + Math.random() * 0.2
      });
    }
  }

  // ============================================================
  // DIBUJAR — renderizado del duelo
  // ============================================================
  dibujar(ctx, ancho, alto, textos) {
    if (!this.enJuego) return;

    ctx.save();

    // Sacudida de pantalla
    if (this._sacudida > 0) {
      const amp = this._sacudida * 8;
      ctx.translate(Math.sin(this._tiempoTotal * 50) * amp, 0);
    }

    // --- Fondo: ruinas de La Isabela ---
    this._dibujarFondo(ctx, ancho, alto);

    if (this._fase === 'intro') {
      this._dibujarIntro(ctx, ancho, alto);
    } else if (this._fase === 'combate') {
      this._dibujarCombate(ctx, ancho, alto);
    } else if (this._fase === 'resultado') {
      this._dibujarCombate(ctx, ancho, alto);
      this._dibujarResultado(ctx, ancho, alto);
    }

    ctx.restore();
  }

  // --- Fondo de ruinas ---
  _dibujarFondo(ctx, ancho, alto) {
    // Cielo crepuscular
    const gradCielo = ctx.createLinearGradient(0, 0, 0, alto * 0.6);
    gradCielo.addColorStop(0, '#2a1a3a');
    gradCielo.addColorStop(0.5, '#4a2a5a');
    gradCielo.addColorStop(1, '#6a3a4a');
    ctx.fillStyle = gradCielo;
    ctx.fillRect(0, 0, ancho, alto * 0.6);

    // Estrellas
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 20; i++) {
      const sx = (i * 137 + 50) % ancho;
      const sy = (i * 89 + 20) % (alto * 0.4);
      const size = (i % 3 === 0) ? 2 : 1;
      ctx.fillRect(sx, sy, size, size);
    }

    // Ruinas al fondo (columnas rotas)
    ctx.fillStyle = '#3a3530';
    for (let i = 0; i < 5; i++) {
      const cx = 60 + i * 180;
      const cAlto = 80 + (i % 3) * 30;
      ctx.fillRect(cx, alto * 0.6 - cAlto, 25, cAlto);
      // Capitel roto
      ctx.fillRect(cx - 5, alto * 0.6 - cAlto - 8, 35, 8);
    }

    // Suelo de piedra
    const gradSuelo = ctx.createLinearGradient(0, alto * 0.6, 0, alto);
    gradSuelo.addColorStop(0, '#5a5040');
    gradSuelo.addColorStop(1, '#3a3020');
    ctx.fillStyle = gradSuelo;
    ctx.fillRect(0, alto * 0.6, ancho, alto * 0.4);

    // Líneas del suelo (baldosas)
    ctx.strokeStyle = '#4a4030';
    ctx.lineWidth = 1;
    for (let i = 0; i < 10; i++) {
      const lx = i * (ancho / 9);
      ctx.beginPath();
      ctx.moveTo(lx, alto * 0.6);
      ctx.lineTo(lx, alto);
      ctx.stroke();
    }
    // Línea horizontal
    ctx.beginPath();
    ctx.moveTo(0, alto * 0.75);
    ctx.lineTo(ancho, alto * 0.75);
    ctx.stroke();
  }

  // --- Pantalla de intro ---
  _dibujarIntro(ctx, ancho, alto) {
    const t = this._textos();

    // Panel semi-transparente
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(ancho * 0.1, alto * 0.15, ancho * 0.8, alto * 0.7);
    ctx.strokeStyle = '#CCAA44';
    ctx.lineWidth = 2;
    ctx.strokeRect(ancho * 0.1, alto * 0.15, ancho * 0.8, alto * 0.7);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 22px monospace';
    ctx.fillText(t?.titulo || '⚔️ Duelo de Espadas', ancho / 2, alto * 0.25);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px monospace';
    const controles = [
      t?.ctrl1 || '← → : Moverse',
      t?.ctrl2 || 'E : Atacar con espada',
      t?.ctrl3 || 'Q : Bloquear (mantener) / Parry (justo a tiempo)',
      t?.ctrl4 || '↓ : Agacharse (esquivar ataques altos)'
    ];
    for (let i = 0; i < controles.length; i++) {
      ctx.fillText(controles[i], ancho / 2, alto * 0.38 + i * 26);
    }

    // Modo
    ctx.font = '13px monospace';
    if (this._modo === 'pacifista') {
      ctx.fillStyle = '#44CC44';
      ctx.fillText(t?.modoPaz || '🕊️ Modo Pacifista — Defiéndete mientras dialogas', ancho / 2, alto * 0.6);
    } else {
      ctx.fillStyle = '#CC4444';
      ctx.fillText(t?.modoAtaque || '⚔️ Modo Agresivo — Derrota al soldado', ancho / 2, alto * 0.6);
    }

    // [E] Comenzar
    if (this._tiempoFase > 1.5) {
      ctx.fillStyle = '#CCAA44';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(t?.comenzar || '[E] Comenzar', ancho / 2, alto * 0.75);
    }
    ctx.textAlign = 'left';
  }

  // --- Renderizado del combate ---
  _dibujarCombate(ctx, ancho, alto) {
    const j = this._jugador;
    const d = this._diego;
    const sueloY = alto * 0.6;

    // --- Dibujar jugador ---
    this._dibujarJugador(ctx, j, sueloY);

    // --- Dibujar Diego ---
    this._dibujarDiego(ctx, d, sueloY);

    // --- Chispas ---
    for (const c of this._chispas) {
      ctx.fillStyle = `rgba(255, ${200 + Math.floor(Math.random() * 55)}, 50, ${c.vida * 3})`;
      ctx.fillRect(c.x, c.y, 3, 3);
    }

    // --- HUD ---
    this._dibujarHUD(ctx, ancho, alto);

    // --- Diálogo pacifista ---
    if (this._dialogoActual) {
      this._dibujarDialogo(ctx, ancho, alto);
    }
  }

  // --- Sprite del jugador ---
  _dibujarJugador(ctx, j, sueloY) {
    const x = j.x;
    const agachado = j.estado === 'agachado';
    const cuerpoAlto = agachado ? 22 : 36;
    const y = sueloY - cuerpoAlto;
    const herido = j.estado === 'herido';

    ctx.save();
    if (herido && Math.floor(this._tiempoTotal * 20) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }

    // Cuerpo (túnica verde/azul)
    ctx.fillStyle = '#2266AA';
    ctx.fillRect(x - 8, y, 16, cuerpoAlto - 6);

    // Cabeza
    ctx.fillStyle = '#DEB887';
    if (!agachado) {
      ctx.fillRect(x - 5, y - 10, 10, 10);
      // Pelo
      ctx.fillStyle = '#4a3020';
      ctx.fillRect(x - 5, y - 12, 10, 4);
    } else {
      ctx.fillRect(x - 5, y - 5, 10, 8);
    }

    // Piernas
    ctx.fillStyle = '#885522';
    if (!agachado) {
      const paso = j.estado === 'caminando' ? Math.sin(this._tiempoTotal * 10) * 4 : 0;
      ctx.fillRect(x - 5, sueloY - 6, 5, 6 + paso);
      ctx.fillRect(x + 1, sueloY - 6, 5, 6 - paso);
    } else {
      ctx.fillRect(x - 8, sueloY - 6, 16, 6);
    }

    // Espada
    ctx.fillStyle = '#C0C0C0';
    if (j.estado === 'atacando') {
      // Espada hacia adelante (animación de golpe)
      const progreso = j.tiempoEstado / 0.35;
      const angulo = -Math.PI / 3 + progreso * Math.PI * 0.8;
      ctx.save();
      ctx.translate(x + 8, y + 10);
      ctx.rotate(angulo);
      ctx.fillRect(0, -2, 30, 3);
      // Empuñadura
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(-4, -3, 6, 5);
      ctx.restore();
    } else if (j.estado === 'bloqueando') {
      // Espada vertical (guardia)
      ctx.fillRect(x + 10, y - 5, 3, 30);
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(x + 9, y + 8, 5, 6);
    } else if (!agachado) {
      // Espada en reposo (diagonal abajo)
      ctx.save();
      ctx.translate(x + 8, y + 10);
      ctx.rotate(Math.PI / 6);
      ctx.fillRect(0, -2, 25, 3);
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(-4, -3, 6, 5);
      ctx.restore();
    }

    ctx.restore();
  }

  // --- Sprite del Soldado Diego ---
  _dibujarDiego(ctx, d, sueloY) {
    const x = d.x;
    const rendido = d.estado === 'rendido';
    const aturdido = d.estado === 'aturdido';
    const cuerpoAlto = 38;
    const y = sueloY - cuerpoAlto;

    ctx.save();
    if (aturdido && Math.floor(this._tiempoTotal * 15) % 2 === 0) {
      ctx.globalAlpha = 0.6;
    }

    // Armadura (gris metálico)
    ctx.fillStyle = rendido ? '#666666' : '#8A8A8A';
    ctx.fillRect(x - 10, y, 20, cuerpoAlto - 6);

    // Casco con pluma roja
    ctx.fillStyle = '#7A7A7A';
    ctx.fillRect(x - 7, y - 12, 14, 12);
    ctx.fillStyle = '#CC2222';
    ctx.fillRect(x - 2, y - 18, 3, 8);

    // Visor del casco
    ctx.fillStyle = '#333333';
    ctx.fillRect(x - 5, y - 6, 10, 3);

    // Piernas
    ctx.fillStyle = '#6A6A6A';
    ctx.fillRect(x - 7, sueloY - 6, 6, 6);
    ctx.fillRect(x + 1, sueloY - 6, 6, 6);

    // Espada de Diego
    ctx.fillStyle = '#D0D0D0';
    if (d.estado === 'atacandoAlto') {
      // Espada bajando desde arriba
      const progreso = d.tiempoEstado / 0.5;
      const angulo = -Math.PI * 0.7 + progreso * Math.PI * 0.9;
      ctx.save();
      ctx.translate(x - 10, y + 8);
      ctx.rotate(angulo);
      ctx.fillRect(-35, -2, 35, 4);
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(-2, -3, 6, 6);
      ctx.restore();
    } else if (d.estado === 'atacandoBajo') {
      // Barrida baja
      const progreso = d.tiempoEstado / 0.5;
      ctx.save();
      ctx.translate(x - 10, sueloY - 8);
      ctx.rotate(-0.3 + progreso * 0.6);
      ctx.fillRect(-35, -2, 35, 4);
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(-2, -3, 6, 6);
      ctx.restore();
    } else if (!rendido) {
      // En guardia (espada diagonal)
      ctx.save();
      ctx.translate(x - 10, y + 10);
      ctx.rotate(-Math.PI / 6);
      ctx.fillRect(-25, -2, 28, 3);
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(-2, -3, 6, 5);
      ctx.restore();
    }

    // Estrellas de aturdimiento
    if (aturdido) {
      ctx.fillStyle = '#FFD700';
      ctx.font = '14px monospace';
      for (let i = 0; i < 3; i++) {
        const sx = x - 15 + i * 12;
        const sy = y - 20 + Math.sin(this._tiempoTotal * 5 + i * 2) * 5;
        ctx.fillText('★', sx, sy);
      }
    }

    // Rendido: arma en el suelo
    if (rendido) {
      ctx.fillStyle = '#D0D0D0';
      ctx.fillRect(x - 30, sueloY - 3, 30, 3);
    }

    ctx.restore();
  }

  // --- HUD: barras de vida / convicción ---
  _dibujarHUD(ctx, ancho, alto) {
    const t = this._textos();
    const j = this._jugador;
    const d = this._diego;

    // Vida del jugador (izquierda)
    ctx.fillStyle = '#333333';
    ctx.fillRect(15, 15, 120, 16);
    const vidaPct = j.vida / j.vidaMax;
    ctx.fillStyle = vidaPct > 0.5 ? '#44AA44' : vidaPct > 0.25 ? '#CCAA22' : '#CC4444';
    ctx.fillRect(15, 15, 120 * vidaPct, 16);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.strokeRect(15, 15, 120, 16);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '11px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`${t?.tuVida || 'HP'}: ${j.vida}`, 18, 28);

    // Barra de Diego (derecha)
    ctx.fillStyle = '#333333';
    ctx.fillRect(ancho - 165, 15, 150, 16);
    if (this._modo === 'agresivo') {
      // HP de Diego
      const dPct = d.vida / d.vidaMax;
      ctx.fillStyle = '#CC4444';
      ctx.fillRect(ancho - 165, 15, 150 * dPct, 16);
      ctx.strokeStyle = '#FFFFFF';
      ctx.strokeRect(ancho - 165, 15, 150, 16);
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'right';
      ctx.fillText(`Diego: ${d.vida}`, ancho - 18, 28);
    } else {
      // Convicción
      const cPct = d.conviccion / 100;
      ctx.fillStyle = '#44CC44';
      ctx.fillRect(ancho - 165, 15, 150 * cPct, 16);
      ctx.strokeStyle = '#FFFFFF';
      ctx.strokeRect(ancho - 165, 15, 150, 16);
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'right';
      ctx.fillText(`${t?.conviccion || 'Convicción'}: ${d.conviccion}%`, ancho - 18, 28);
    }
    ctx.textAlign = 'left';

    // Indicador de controles
    ctx.font = '10px monospace';
    ctx.fillStyle = '#AAAAAA';
    ctx.textAlign = 'center';
    ctx.fillText(t?.controles || '← → Moverse | E Atacar | Q Bloquear | ↓ Agacharse', ancho / 2, alto - 12);
    ctx.textAlign = 'left';
  }

  // --- Burbuja de diálogo pacifista ---
  _dibujarDialogo(ctx, ancho, alto) {
    const texto = this._dialogoActual;
    if (!texto) return;

    const bx = ancho * 0.15;
    const by = alto * 0.08;
    const bw = ancho * 0.7;
    const bh = 36;

    // Fondo de burbuja
    ctx.fillStyle = 'rgba(0, 80, 0, 0.85)';
    ctx.fillRect(bx, by, bw, bh);
    ctx.strokeStyle = '#44CC44';
    ctx.lineWidth = 1;
    ctx.strokeRect(bx, by, bw, bh);

    // Icono de paz
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('🕊️ ' + texto, ancho / 2, by + 22);
    ctx.textAlign = 'left';
  }

  // --- Pantalla de resultado ---
  _dibujarResultado(ctx, ancho, alto) {
    const t = this._textos();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, alto * 0.3, ancho, alto * 0.4);

    ctx.textAlign = 'center';
    ctx.font = 'bold 24px monospace';

    if (this._resultado === 'pacificado') {
      ctx.fillStyle = '#44CC44';
      ctx.fillText(t?.victoriaPaz || '🕊️ Diego se rinde — ¡Victoria Pacifista!', ancho / 2, alto * 0.45);
    } else if (this._resultado === 'victoria') {
      ctx.fillStyle = '#FFD700';
      ctx.fillText(t?.victoriaFuerza || '⚔️ ¡Victoria por la fuerza!', ancho / 2, alto * 0.45);
    } else {
      ctx.fillStyle = '#CC4444';
      ctx.fillText(t?.derrota || '💀 Has sido derrotado...', ancho / 2, alto * 0.45);
    }

    if (this._tiempoFase > 1.0) {
      ctx.fillStyle = '#CCAA44';
      ctx.font = '16px monospace';
      ctx.fillText(t?.continuar || '[E] Continuar', ancho / 2, alto * 0.58);
    }
    ctx.textAlign = 'left';
  }
}
