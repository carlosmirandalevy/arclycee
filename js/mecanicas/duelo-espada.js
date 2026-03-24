// ============================================================
// DUELO-ESPADA.JS — Mini-juego de duelo de espadas
// ============================================================
// Un duelo de espadas lateral contra el Soldado Diego en La Isabela.
// El jugador puede moverse (← →), atacar (E), bloquear/parry (Q)
// y agacharse (↓).
//
// Posturas realistas de esgrima:
// - En garde: posición base con pie adelantado, espada extendida
// - Ataque: estocada hacia adelante (lunge) con extensión del cuerpo
// - Bloqueo: espada vertical frente al cuerpo, peso atrás
// - Agachado: arquear la espalda hacia atrás y abajo (esquive matrix)
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
    // 'intro' → 'enGarde' → 'combate' → 'resultado'
    this._fase = 'intro';
    this._tiempoFase = 0;
    this._tiempoTotal = 0;

    // --- Toast de "¡En garde!" ---
    this._toastTexto = '';
    this._toastTiempo = 0;

    // --- Jugador ---
    this._jugador = {
      x: 180,
      estado: 'idle', // idle, caminando, atacando, bloqueando, agachado, herido
      tiempoEstado: 0,
      vida: 100,
      vidaMax: 100,
      miraDerecha: true,
      bloqueInicio: 0, // momento en que empezó a bloquear (para parry)
      lungeOffset: 0   // desplazamiento extra durante la estocada
    };

    // --- Diego ---
    this._diego = {
      x: 580,
      estado: 'esperando', // esperando, acercando, atacandoAlto, atacandoBajo, retrocediendo, aturdido, rendido
      tiempoEstado: 0,
      vida: 60,
      vidaMax: 60,
      conviccion: 0, // solo en modo pacifista
      velocidadAtaque: 1.0, // se reduce en pacifista conforme sube convicción
      lungeOffset: 0,
      miraDerecha: false // Diego empieza mirando a la izquierda (hacia el jugador)
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

    // Decrementar sacudida y toast
    if (this._sacudida > 0) this._sacudida -= dt;
    if (this._toastTiempo > 0) this._toastTiempo -= dt;

    // Actualizar chispas
    this._chispas = this._chispas.filter(c => {
      c.x += c.vx * dt * 60;
      c.y += c.vy * dt * 60;
      c.vy += 3 * dt; // gravedad en las chispas
      c.vida -= dt;
      return c.vida > 0;
    });

    // --- Despachar según fase ---
    if (this._fase === 'intro') {
      this._actualizarIntro(dt, entrada);
    } else if (this._fase === 'enGarde') {
      this._actualizarEnGarde(dt, entrada);
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
        this._fase = 'enGarde';
        this._tiempoFase = 0;
        this._bloqueoEntrada = true;
        // Mostrar toast "¡En garde!"
        const t = this._textos();
        this._toastTexto = t?.enGarde || '⚔️ ¡En garde!';
        this._toastTiempo = 2.0;
      }
    }
    if (!entrada.estaPresionada('accion')) this._bloqueoEntrada = false;
  }

  // --- Fase en garde: ambos toman posición antes de pelear ---
  _actualizarEnGarde(dt, entrada) {
    // Los personajes se acercan ligeramente y toman posición
    const j = this._jugador;
    const d = this._diego;

    // Mover hacia posiciones de duelo
    if (j.x < 220) j.x += 1.5 * dt * 60;
    if (d.x > 540) d.x -= 1.5 * dt * 60;

    // Después de 2 segundos, empezar el combate
    if (this._tiempoFase > 2.0) {
      this._fase = 'combate';
      this._tiempoFase = 0;
      this._bloqueoEntrada = true;
    }
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

    // Animación de lunge: avanzar y retroceder durante el ataque
    if (j.estado === 'atacando') {
      const progreso = j.tiempoEstado / 0.4;
      if (progreso < 0.4) {
        j.lungeOffset = progreso * 2.5 * 40; // avanzar rápido
      } else {
        j.lungeOffset = (1 - progreso) * 40 / 0.6; // retroceder suave
      }
    } else {
      j.lungeOffset *= 0.85; // suavizar vuelta a 0
    }

    if (j.estado === 'herido' && j.tiempoEstado > 0.45) {
      j.estado = 'idle';
      j.tiempoEstado = 0;
    }
    if (j.estado === 'atacando' && j.tiempoEstado > 0.4) {
      j.estado = 'idle';
      j.tiempoEstado = 0;
    }

    // --- Input del jugador (solo si no está herido/atacando) ---
    if (j.estado !== 'herido' && j.estado !== 'atacando') {
      // Movimiento ← → (footwork lateral de esgrima)
      const vel = 3.2;
      if (entrada.estaPresionada('izquierda')) {
        j.x -= vel * factorTiempo;
        if (j.estado !== 'bloqueando' && j.estado !== 'agachado') j.estado = 'caminando';
      } else if (entrada.estaPresionada('derecha')) {
        j.x += vel * factorTiempo;
        if (j.estado !== 'bloqueando' && j.estado !== 'agachado') j.estado = 'caminando';
      } else if (j.estado === 'caminando') {
        j.estado = 'idle';
        j.tiempoEstado = 0;
      }

      // Agacharse ↓ (arquear espalda hacia atrás)
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

      // Atacar E — estocada (lunge)
      if (accionPresionada && !this._teclaAtaqueAnterior && j.estado !== 'bloqueando' && j.estado !== 'agachado') {
        j.estado = 'atacando';
        j.tiempoEstado = 0;
        this._juego?.sfx?.combateContraataque?.();
        this._teclaAtaqueAnterior = true;
      }
    }

    // Limitar posición del jugador
    j.x = Math.max(50, Math.min(j.x, 700));

    // --- Ambos personajes siempre se miran entre sí ---
    j.miraDerecha = j.x < d.x;
    d.miraDerecha = d.x < j.x;

    // --- Verificar golpe del jugador a Diego ---
    if (j.estado === 'atacando' && j.tiempoEstado > 0.1 && j.tiempoEstado < 0.28) {
      const jDir = j.miraDerecha ? 1 : -1;
      const alcance = j.x + j.lungeOffset * jDir;
      const dist = Math.abs(d.x - alcance);
      // El jugador debe estar mirando hacia Diego para golpearlo
      const apuntaADiego = (j.miraDerecha && d.x > j.x) || (!j.miraDerecha && d.x < j.x);
      if (dist < 50 && apuntaADiego && d.estado !== 'aturdido' && !d._golpeado) {
        d._golpeado = true;

        if (d.estado === 'bloqueando') {
          // Diego bloquea — chispas pero sin daño, contraataque vendrá del AI
          this._crearChispas((j.x + d.x) / 2, 240);
          this._juego?.sfx?.combateContraataque?.();
        } else if (d.estado === 'esquivando') {
          // Diego esquiva — ataque falla por completo
        } else {
          // Golpe conecta
          if (this._modo === 'agresivo') {
            const dmg = 8 + Math.floor(Math.random() * 5);
            d.vida = Math.max(0, d.vida - dmg);
            this._crearChispas((j.x + d.x) / 2, 240);
            this._juego?.sfx?.combateContraataque?.();
            this._sacudida = 0.15;
          } else {
            d.conviccion = Math.min(100, d.conviccion + 3);
            this._crearChispas((j.x + d.x) / 2, 240);
          }
          // Empujar a Diego lejos del jugador
          const empuje = j.miraDerecha ? 18 : -18;
          d.x = Math.max(50, Math.min(750, d.x + empuje));
          d.estado = 'retrocediendo';
          d.tiempoEstado = 0;
        }
      }
    }
    // Resetear flag al terminar ataque
    if (j.estado !== 'atacando') d._golpeado = false;

    // --- IA de Diego ---
    this._actualizarDiego(dt);

    // --- Verificar golpe de Diego al jugador ---
    if ((d.estado === 'atacandoAlto' || d.estado === 'atacandoBajo') &&
        d.tiempoEstado > 0.18 && d.tiempoEstado < 0.38 && !j._golpeadoPorDiego) {
      const dDir = d.miraDerecha ? 1 : -1;
      const alcanceDiego = d.x + d.lungeOffset * dDir;
      const dist = Math.abs(alcanceDiego - j.x);
      const apuntaAJugador = (d.miraDerecha && j.x > d.x) || (!d.miraDerecha && j.x < d.x);
      if (dist < 55 && apuntaAJugador && j.estado !== 'herido') {
        // ¿El jugador se defiende?
        if (d.estado === 'atacandoAlto' && j.estado === 'agachado') {
          // Esquivó arqueando la espalda — ataque alto falla
        } else if (j.estado === 'bloqueando') {
          j._golpeadoPorDiego = true;
          // ¿Es parry? (bloqueó en los últimos 0.2s)
          const tiempoBloqueo = this._tiempoTotal - j.bloqueInicio;
          if (tiempoBloqueo < 0.2) {
            // ¡PARRY! Diego se aturde
            d.estado = 'aturdido';
            d.tiempoEstado = 0;
            d.lungeOffset = 0;
            this._crearChispas((j.x + d.x) / 2, 230);
            this._sacudida = 0.2;
            this._juego?.sfx?.combateContraataque?.();
            const t = this._textos();
            this._toastTexto = t?.parry || '✨ ¡Parry!';
            this._toastTiempo = 1.0;
            if (this._modo === 'pacifista') {
              d.conviccion = Math.min(100, d.conviccion + 8);
            }
          } else {
            // Bloqueo normal — daño reducido
            j.vida = Math.max(0, j.vida - 2);
            this._crearChispas((j.x + d.x) / 2, 240);
            this._juego?.sfx?.combateContraataque?.();
          }
        } else {
          // Golpe directo
          j._golpeadoPorDiego = true;
          const dmg = d.estado === 'atacandoBajo' ? 10 : 8;
          j.vida = Math.max(0, j.vida - dmg);
          j.estado = 'herido';
          j.tiempoEstado = 0;
          j.lungeOffset = 0;
          this._sacudida = 0.3;
          // Empujar al jugador lejos de Diego
          j.x += d.miraDerecha ? 20 : -20;
        }
      }
    }
    // Resetear flag cuando Diego no ataca
    if (d.estado !== 'atacandoAlto' && d.estado !== 'atacandoBajo') {
      j._golpeadoPorDiego = false;
    }

    // --- Diálogos pacifistas ---
    if (this._modo === 'pacifista') {
      this._dialogoTiempo += dt;
      if (this._dialogoTiempo >= this._dialogoIntervalo) {
        this._dialogoTiempo = 0;
        const dialogos = this._dialogosPacifistas();
        this._dialogoActual = dialogos[this._dialogoIndice % dialogos.length];
        this._dialogoIndice++;
        d.conviccion = Math.min(100, d.conviccion + 12);
        d.velocidadAtaque = Math.max(0.4, 1.0 - d.conviccion / 150);
      }
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

    // Animación de lunge de Diego durante ataques
    if (d.estado === 'atacandoAlto' || d.estado === 'atacandoBajo') {
      const progreso = d.tiempoEstado / 0.55;
      if (progreso < 0.35) {
        d.lungeOffset = progreso * 2.8 * 35;
      } else {
        d.lungeOffset = Math.max(0, (1 - progreso) * 35 / 0.65);
      }
    } else {
      d.lungeOffset *= 0.85;
    }

    // --- Reacción defensiva: Diego bloquea o esquiva ataques del jugador ---
    if (j.estado === 'atacando' && j.tiempoEstado < 0.08 &&
        d.estado === 'esperando' && distancia < 80) {
      // 40% bloquear, 20% esquivar, 40% no reacciona (deja que el golpe conecte)
      const reaccion = Math.random();
      if (reaccion < 0.4) {
        d.estado = 'bloqueando';
        d.tiempoEstado = 0;
      } else if (reaccion < 0.6) {
        d.estado = 'esquivando';
        d.tiempoEstado = 0;
      }
    }

    switch (d.estado) {
      case 'esperando':
        // Pausa corta entre ataques — Diego es agresivo
        if (d.tiempoEstado > (0.5 / vel + Math.random() * 0.4)) {
          if (distancia > 65) {
            d.estado = 'acercando';
          } else {
            d.estado = Math.random() < 0.6 ? 'atacandoAlto' : 'atacandoBajo';
          }
          d.tiempoEstado = 0;
        }
        break;

      case 'acercando':
        // Se acerca rápido al jugador
        if (j.x < d.x) {
          d.x -= 3.5 * vel * dt * 60;
        } else {
          d.x += 3.5 * vel * dt * 60;
        }
        d.x = Math.max(50, Math.min(750, d.x));
        if (distancia < 65 || d.tiempoEstado > 1.2) {
          d.estado = Math.random() < 0.6 ? 'atacandoAlto' : 'atacandoBajo';
          d.tiempoEstado = 0;
        }
        break;

      case 'atacandoAlto':
      case 'atacandoBajo':
        if (d.tiempoEstado > 0.45) {
          // 35% combo attack (alternate high/low)
          if (distancia < 70 && Math.random() < 0.35) {
            d.estado = d.estado === 'atacandoAlto' ? 'atacandoBajo' : 'atacandoAlto';
          } else {
            d.estado = 'retrocediendo';
          }
          d.tiempoEstado = 0;
        }
        break;

      case 'bloqueando':
        // Diego mantiene guardia brevemente, luego contraataca
        if (d.tiempoEstado > 0.4) {
          // Contraataque inmediato tras bloquear (soldado entrenado)
          if (distancia < 75) {
            d.estado = Math.random() < 0.5 ? 'atacandoAlto' : 'atacandoBajo';
          } else {
            d.estado = 'esperando';
          }
          d.tiempoEstado = 0;
        }
        break;

      case 'esquivando':
        // Diego se agacha para esquivar, luego contraataca bajo
        if (d.tiempoEstado > 0.35) {
          if (distancia < 75) {
            d.estado = 'atacandoBajo'; // contraataque bajo desde esquive
          } else {
            d.estado = 'esperando';
          }
          d.tiempoEstado = 0;
        }
        break;

      case 'retrocediendo':
        // Retrocede poco — quiere mantenerse cerca
        if (j.x < d.x) {
          d.x += 1.0 * dt * 60;
        } else {
          d.x -= 1.0 * dt * 60;
        }
        d.x = Math.max(50, Math.min(750, d.x));
        if (d.tiempoEstado > 0.35) {
          d.estado = 'esperando';
          d.tiempoEstado = 0;
        }
        break;

      case 'aturdido':
        if (d.tiempoEstado > 0.8) {
          d.estado = 'retrocediendo';
          d.tiempoEstado = 0;
        }
        break;

      case 'rendido':
        break;
    }
  }

  // --- Crear partículas de chispas ---
  _crearChispas(x, y) {
    for (let i = 0; i < 8; i++) {
      this._chispas.push({
        x, y,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 4 - 1,
        vida: 0.3 + Math.random() * 0.3
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
      const amp = this._sacudida * 10;
      ctx.translate(Math.sin(this._tiempoTotal * 50) * amp, 0);
    }

    // --- Fondo: ruinas de La Isabela ---
    this._dibujarFondo(ctx, ancho, alto);

    if (this._fase === 'intro') {
      // Dibujar personajes en posición inicial durante intro
      this._dibujarCombate(ctx, ancho, alto);
      this._dibujarIntro(ctx, ancho, alto);
    } else if (this._fase === 'enGarde' || this._fase === 'combate') {
      this._dibujarCombate(ctx, ancho, alto);
    } else if (this._fase === 'resultado') {
      this._dibujarCombate(ctx, ancho, alto);
      this._dibujarResultado(ctx, ancho, alto);
    }

    // --- Toast flotante (en garde, parry, etc.) ---
    if (this._toastTiempo > 0) {
      const alpha = Math.min(1, this._toastTiempo * 2);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 28px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(this._toastTexto, ancho / 2, alto * 0.35 - (2 - this._toastTiempo) * 15);
      ctx.textAlign = 'left';
      ctx.restore();
    }

    ctx.restore();
  }

  // --- Fondo de ruinas ---
  _dibujarFondo(ctx, ancho, alto) {
    // Cielo crepuscular
    const gradCielo = ctx.createLinearGradient(0, 0, 0, alto * 0.55);
    gradCielo.addColorStop(0, '#1a1030');
    gradCielo.addColorStop(0.4, '#3a2050');
    gradCielo.addColorStop(1, '#6a3545');
    ctx.fillStyle = gradCielo;
    ctx.fillRect(0, 0, ancho, alto * 0.55);

    // Estrellas
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 25; i++) {
      const sx = (i * 137 + 50) % ancho;
      const sy = (i * 89 + 20) % (alto * 0.35);
      const size = (i % 4 === 0) ? 2 : 1;
      ctx.globalAlpha = 0.5 + (i % 3) * 0.2;
      ctx.fillRect(sx, sy, size, size);
    }
    ctx.globalAlpha = 1;

    // Ruinas al fondo (columnas rotas con sombra)
    for (let i = 0; i < 5; i++) {
      const cx = 50 + i * 185;
      const cAlto = 70 + (i % 3) * 35;
      // Sombra
      ctx.fillStyle = '#252018';
      ctx.fillRect(cx + 3, alto * 0.55 - cAlto + 3, 22, cAlto);
      // Columna
      ctx.fillStyle = '#4a4538';
      ctx.fillRect(cx, alto * 0.55 - cAlto, 22, cAlto);
      // Capitel
      ctx.fillStyle = '#5a5548';
      ctx.fillRect(cx - 5, alto * 0.55 - cAlto - 6, 32, 6);
    }

    // Suelo de piedra
    const sueloY = alto * 0.55;
    const gradSuelo = ctx.createLinearGradient(0, sueloY, 0, alto);
    gradSuelo.addColorStop(0, '#5a5040');
    gradSuelo.addColorStop(0.3, '#4a4030');
    gradSuelo.addColorStop(1, '#2a2018');
    ctx.fillStyle = gradSuelo;
    ctx.fillRect(0, sueloY, ancho, alto - sueloY);

    // Baldosas del suelo
    ctx.strokeStyle = 'rgba(80, 70, 50, 0.5)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const lx = i * (ancho / 10);
      ctx.beginPath();
      ctx.moveTo(lx, sueloY);
      ctx.lineTo(lx, alto);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(0, sueloY + (alto - sueloY) * 0.4);
    ctx.lineTo(ancho, sueloY + (alto - sueloY) * 0.4);
    ctx.stroke();
  }

  // --- Pantalla de intro ---
  _dibujarIntro(ctx, ancho, alto) {
    const t = this._textos();

    // Panel semi-transparente
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(ancho * 0.08, alto * 0.12, ancho * 0.84, alto * 0.76);
    ctx.strokeStyle = '#CCAA44';
    ctx.lineWidth = 2;
    ctx.strokeRect(ancho * 0.08, alto * 0.12, ancho * 0.84, alto * 0.76);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 22px monospace';
    ctx.fillText(t?.titulo || '⚔️ Duelo de Espadas', ancho / 2, alto * 0.23);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px monospace';
    const controles = [
      t?.ctrl1 || '← → : Moverse (footwork)',
      t?.ctrl2 || 'E : Estocada (lunge)',
      t?.ctrl3 || 'Q : Bloquear / Parry (justo a tiempo)',
      t?.ctrl4 || '↓ : Esquivar (arquear espalda hacia atrás)'
    ];
    for (let i = 0; i < controles.length; i++) {
      ctx.fillText(controles[i], ancho / 2, alto * 0.36 + i * 26);
    }

    // Modo
    ctx.font = '13px monospace';
    if (this._modo === 'pacifista') {
      ctx.fillStyle = '#44CC44';
      ctx.fillText(t?.modoPaz || '🕊️ Modo Pacifista — Defiéndete mientras dialogas', ancho / 2, alto * 0.58);
    } else {
      ctx.fillStyle = '#CC4444';
      ctx.fillText(t?.modoAtaque || '⚔️ Modo Agresivo — Derrota al soldado', ancho / 2, alto * 0.58);
    }

    // [E] Comenzar
    if (this._tiempoFase > 1.5) {
      ctx.fillStyle = '#CCAA44';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(t?.comenzar || '[E] Comenzar', ancho / 2, alto * 0.73);
    }
    ctx.textAlign = 'left';
  }

  // --- Renderizado del combate ---
  _dibujarCombate(ctx, ancho, alto) {
    const j = this._jugador;
    const d = this._diego;
    const sueloY = alto * 0.55;

    // --- Sombras en el suelo ---
    const jDir = j.miraDerecha ? 1 : -1;
    const dDir = d.miraDerecha ? 1 : -1;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(j.x + j.lungeOffset * 0.5 * jDir, sueloY + 2, 18, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(d.x + d.lungeOffset * 0.5 * dDir, sueloY + 2, 20, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- Dibujar jugador ---
    this._dibujarJugador(ctx, j, sueloY);

    // --- Dibujar Diego ---
    this._dibujarDiego(ctx, d, sueloY);

    // --- Chispas ---
    for (const c of this._chispas) {
      const brillo = Math.floor(200 + Math.random() * 55);
      ctx.fillStyle = `rgba(255, ${brillo}, 50, ${Math.min(1, c.vida * 3)})`;
      ctx.fillRect(c.x - 1, c.y - 1, 3, 3);
    }

    // --- HUD ---
    if (this._fase !== 'intro') {
      this._dibujarHUD(ctx, ancho, alto);
    }

    // --- Diálogo pacifista ---
    if (this._dialogoActual) {
      this._dibujarDialogo(ctx, ancho, alto);
    }
  }

  // ============================================================
  // HELPER: dibujar un segmento de extremidad (línea gruesa)
  // ============================================================
  _dibujarLimbo(ctx, x1, y1, x2, y2, grosor, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = grosor;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Helper: interpolar entre dos valores
  _lerp(a, b, t) {
    return a + (b - a) * Math.min(1, Math.max(0, t));
  }

  // ============================================================
  // SPRITE DEL JUGADOR — animación articulada estilo Prince of Persia
  // ============================================================
  _dibujarJugador(ctx, j, sueloY) {
    const dir = j.miraDerecha ? 1 : -1;
    const baseX = j.x + j.lungeOffset * dir;
    const herido = j.estado === 'herido';
    const agachado = j.estado === 'agachado';
    const atacando = j.estado === 'atacando';
    const bloqueando = j.estado === 'bloqueando';
    const caminando = j.estado === 'caminando';

    ctx.save();
    if (herido && Math.floor(this._tiempoTotal * 20) % 2 === 0) {
      ctx.globalAlpha = 0.4;
    }

    // Escala y espejado
    const S = 2.0;
    ctx.translate(baseX, sueloY);
    ctx.scale(S * dir, S);

    // --- Colores ---
    const piel = '#DEB887';
    const pelo = '#4a3020';
    const tunica = '#2266AA';
    const pantalon = '#885522';
    const bota = '#5a3a1a';
    const espada = '#C0C0C0';
    const guardia = '#AA8833';
    const grosorBrazo = 3;
    const grosorPierna = 3.5;

    // --- Respiración sutil en idle ---
    const respiro = (j.estado === 'idle') ? Math.sin(this._tiempoTotal * 2.5) * 0.5 : 0;

    // --- Paso de caminata (ciclo suave) ---
    const t = this._tiempoTotal;
    const ciclo = caminando ? Math.sin(t * 9) : 0;

    // --- CADERA (punto de anclaje) ---
    const caderaX = 0;
    const caderaY = -8;

    // === PIERNAS (muslo + pantorrilla + pie) ===
    let piernaDelMusloAng, piernaDelPantoAng, pieDelX, pieDelY;
    let pieTraMusloAng, pieTraPantoAng, pieTraX, pieTraY;

    if (agachado) {
      // Piernas muy flexionadas, peso bajo
      piernaDelMusloAng = 0.6;  piernaDelPantoAng = -1.0;
      pieTraMusloAng = -0.4;    pieTraPantoAng = -0.6;
    } else if (atacando) {
      // Pierna delantera extendida (lunge), trasera empuja
      const p = Math.min(1, j.tiempoEstado / 0.2);
      piernaDelMusloAng = this._lerp(0.3, 0.8, p);
      piernaDelPantoAng = this._lerp(-0.4, -0.3, p);
      pieTraMusloAng = this._lerp(-0.3, -0.7, p);
      pieTraPantoAng = this._lerp(-0.5, -0.2, p);
    } else if (bloqueando) {
      piernaDelMusloAng = 0.2;  piernaDelPantoAng = -0.5;
      pieTraMusloAng = -0.4;    pieTraPantoAng = -0.4;
    } else {
      // En garde: pierna delantera flexionada, trasera recta
      piernaDelMusloAng = 0.35 + ciclo * 0.25;
      piernaDelPantoAng = -0.5 - ciclo * 0.1;
      pieTraMusloAng = -0.3 - ciclo * 0.25;
      pieTraPantoAng = -0.4 + ciclo * 0.1;
    }

    const musloLen = 10;
    const pantoLen = 10;

    // Pierna delantera
    const musloDelFx = caderaX + Math.sin(piernaDelMusloAng) * musloLen;
    const musloDelFy = caderaY + Math.cos(piernaDelMusloAng) * musloLen;
    const pantoDelFx = musloDelFx + Math.sin(piernaDelMusloAng + piernaDelPantoAng) * pantoLen;
    const pantoDelFy = musloDelFy + Math.cos(piernaDelMusloAng + piernaDelPantoAng) * pantoLen;
    this._dibujarLimbo(ctx, caderaX, caderaY, musloDelFx, musloDelFy, grosorPierna, pantalon);
    this._dibujarLimbo(ctx, musloDelFx, musloDelFy, pantoDelFx, pantoDelFy, grosorPierna, pantalon);
    // Pie
    ctx.fillStyle = bota;
    ctx.fillRect(pantoDelFx - 1, pantoDelFy - 1, 5, 2);

    // Pierna trasera
    const musloTraFx = caderaX + Math.sin(pieTraMusloAng) * musloLen;
    const musloTraFy = caderaY + Math.cos(pieTraMusloAng) * musloLen;
    const pantoTraFx = musloTraFx + Math.sin(pieTraMusloAng + pieTraPantoAng) * pantoLen;
    const pantoTraFy = musloTraFy + Math.cos(pieTraMusloAng + pieTraPantoAng) * pantoLen;
    this._dibujarLimbo(ctx, caderaX, caderaY, musloTraFx, musloTraFy, grosorPierna - 0.5, pantalon);
    this._dibujarLimbo(ctx, musloTraFx, musloTraFy, pantoTraFx, pantoTraFy, grosorPierna - 0.5, pantalon);
    ctx.fillStyle = bota;
    ctx.fillRect(pantoTraFx - 1, pantoTraFy - 1, 5, 2);

    // === TORSO ===
    let torsoAng;
    if (agachado) {
      torsoAng = -1.1; // arqueado hacia atrás (matrix dodge)
    } else if (atacando) {
      torsoAng = this._lerp(0.05, 0.35, Math.min(1, j.tiempoEstado / 0.15));
    } else if (bloqueando) {
      torsoAng = -0.15;
    } else if (herido) {
      torsoAng = -0.3;
    } else {
      torsoAng = 0.08 + respiro * 0.02;
    }

    const torsoLen = 16;
    const hombroX = caderaX + Math.sin(torsoAng) * torsoLen;
    const hombroY = caderaY - Math.cos(torsoAng) * torsoLen;

    // Dibujar torso (línea gruesa)
    this._dibujarLimbo(ctx, caderaX, caderaY, hombroX, hombroY, 6, tunica);
    // Cinturón
    ctx.fillStyle = '#664411';
    ctx.fillRect(caderaX - 3, caderaY - 1, 6, 2);

    // === CABEZA ===
    const cabezaX = hombroX + Math.sin(torsoAng) * 5;
    const cabezaY = hombroY - 5 + respiro;
    ctx.fillStyle = piel;
    ctx.beginPath();
    ctx.arc(cabezaX, cabezaY, 4, 0, Math.PI * 2);
    ctx.fill();
    // Pelo
    ctx.fillStyle = pelo;
    ctx.beginPath();
    ctx.arc(cabezaX, cabezaY - 1.5, 4, Math.PI, Math.PI * 2);
    ctx.fill();
    // Ojo
    ctx.fillStyle = '#000';
    ctx.fillRect(cabezaX + 1.5, cabezaY - 1, 1.5, 1.5);

    // === BRAZO ESPADA (delantero) ===
    let brazoAng, antebrazoAng, espadaAng;
    if (atacando) {
      const p = Math.min(1, j.tiempoEstado / 0.15);
      brazoAng = this._lerp(0.3, 1.4, p);    // extiende hacia adelante
      antebrazoAng = this._lerp(-0.5, 0.1, p);
      espadaAng = this._lerp(-0.2, 0.0, p);   // espada recta
    } else if (bloqueando) {
      brazoAng = 0.3;
      antebrazoAng = -1.2; // codo doblado, espada arriba
      espadaAng = -1.5;    // vertical
    } else if (agachado) {
      brazoAng = -0.5;
      antebrazoAng = -0.3;
      espadaAng = -0.8;
    } else {
      // En garde: brazo extendido con espada apuntando al frente
      brazoAng = 0.6 + Math.sin(t * 2) * 0.03;
      antebrazoAng = -0.3;
      espadaAng = -0.15;
    }

    const brazoLen = 8;
    const antebrazoLen = 7;
    const espadaLen = 18;

    const codoX = hombroX + Math.sin(torsoAng + brazoAng) * brazoLen;
    const codoY = hombroY + Math.cos(torsoAng + brazoAng) * brazoLen;
    const manoX = codoX + Math.sin(torsoAng + brazoAng + antebrazoAng) * antebrazoLen;
    const manoY = codoY + Math.cos(torsoAng + brazoAng + antebrazoAng) * antebrazoLen;
    const puntaX = manoX + Math.sin(torsoAng + brazoAng + antebrazoAng + espadaAng) * espadaLen;
    const puntaY = manoY + Math.cos(torsoAng + brazoAng + antebrazoAng + espadaAng) * espadaLen;

    this._dibujarLimbo(ctx, hombroX, hombroY, codoX, codoY, grosorBrazo, piel);
    this._dibujarLimbo(ctx, codoX, codoY, manoX, manoY, grosorBrazo, piel);
    // Guardia (cazoleta)
    ctx.fillStyle = guardia;
    ctx.beginPath();
    ctx.arc(manoX, manoY, 2.5, 0, Math.PI * 2);
    ctx.fill();
    // Espada
    this._dibujarLimbo(ctx, manoX, manoY, puntaX, puntaY, 1.5, espada);
    // Punta
    ctx.fillStyle = '#E0E0E0';
    ctx.fillRect(puntaX - 0.5, puntaY - 0.5, 2, 2);

    // === BRAZO TRASERO (mano libre, postura clásica) ===
    let backBrazoAng, backAnteAng;
    if (atacando) {
      backBrazoAng = -0.8; backAnteAng = -0.6;
    } else if (agachado) {
      backBrazoAng = -0.3; backAnteAng = -0.8;
    } else {
      // Mano arriba y curvada (esgrima clásica)
      backBrazoAng = -0.5; backAnteAng = -1.2;
    }
    const backCodoX = hombroX + Math.sin(torsoAng + backBrazoAng) * brazoLen;
    const backCodoY = hombroY + Math.cos(torsoAng + backBrazoAng) * brazoLen;
    const backManoX = backCodoX + Math.sin(torsoAng + backBrazoAng + backAnteAng) * (antebrazoLen - 1);
    const backManoY = backCodoY + Math.cos(torsoAng + backBrazoAng + backAnteAng) * (antebrazoLen - 1);

    this._dibujarLimbo(ctx, hombroX, hombroY, backCodoX, backCodoY, grosorBrazo - 0.5, piel);
    this._dibujarLimbo(ctx, backCodoX, backCodoY, backManoX, backManoY, grosorBrazo - 0.5, piel);

    ctx.restore(); // main save
  }

  // ============================================================
  // SPRITE DEL SOLDADO DIEGO — articulado con armadura
  // ============================================================
  _dibujarDiego(ctx, d, sueloY) {
    const dir = d.miraDerecha ? 1 : -1;
    const baseX = d.x + d.lungeOffset * dir;
    const rendido = d.estado === 'rendido';
    const aturdido = d.estado === 'aturdido';
    const atacandoAlto = d.estado === 'atacandoAlto';
    const atacandoBajo = d.estado === 'atacandoBajo';
    const acercando = d.estado === 'acercando';
    const bloqueando = d.estado === 'bloqueando';
    const esquivando = d.estado === 'esquivando';

    ctx.save();
    if (aturdido && Math.floor(this._tiempoTotal * 15) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }

    const S = 2.1; // Diego ligeramente más grande
    ctx.translate(baseX, sueloY);
    ctx.scale(S * dir, S);

    // --- Colores de armadura ---
    const armadura = rendido ? '#555555' : '#8A8A90';
    const armOscuro = rendido ? '#444444' : '#6A6A70';
    const piel = '#D4A76A';
    const capa = rendido ? '#662222' : '#AA2222';
    const espada = '#D0D0D0';
    const guardia = '#AA8833';
    const bota = '#3a2a1a';
    const grosorBrazo = 3.5;
    const grosorPierna = 4;

    const t = this._tiempoTotal;
    const ciclo = acercando ? Math.sin(t * 9) : 0;

    // --- CADERA ---
    const caderaX = 0;
    const caderaY = -9;

    // === PIERNAS ===
    let pDelMusloAng, pDelPantoAng, pTraMusloAng, pTraPantoAng;
    const musloLen = 11;
    const pantoLen = 11;

    if (rendido) {
      pDelMusloAng = 0.1; pDelPantoAng = -0.2;
      pTraMusloAng = -0.1; pTraPantoAng = -0.2;
    } else if (esquivando) {
      pDelMusloAng = 0.6; pDelPantoAng = -1.0;
      pTraMusloAng = -0.4; pTraPantoAng = -0.6;
    } else if (atacandoAlto || atacandoBajo) {
      const p = Math.min(1, d.tiempoEstado / 0.2);
      pDelMusloAng = this._lerp(0.3, 0.8, p);
      pDelPantoAng = this._lerp(-0.4, -0.3, p);
      pTraMusloAng = this._lerp(-0.3, -0.7, p);
      pTraPantoAng = this._lerp(-0.5, -0.2, p);
    } else if (bloqueando) {
      pDelMusloAng = 0.2; pDelPantoAng = -0.5;
      pTraMusloAng = -0.4; pTraPantoAng = -0.4;
    } else {
      pDelMusloAng = 0.35 + ciclo * 0.25;
      pDelPantoAng = -0.5 - ciclo * 0.1;
      pTraMusloAng = -0.3 - ciclo * 0.25;
      pTraPantoAng = -0.4 + ciclo * 0.1;
    }

    // Pierna delantera
    const mDF = { x: caderaX + Math.sin(pDelMusloAng) * musloLen, y: caderaY + Math.cos(pDelMusloAng) * musloLen };
    const pDF = { x: mDF.x + Math.sin(pDelMusloAng + pDelPantoAng) * pantoLen, y: mDF.y + Math.cos(pDelMusloAng + pDelPantoAng) * pantoLen };
    this._dibujarLimbo(ctx, caderaX, caderaY, mDF.x, mDF.y, grosorPierna, armOscuro);
    this._dibujarLimbo(ctx, mDF.x, mDF.y, pDF.x, pDF.y, grosorPierna, armOscuro);
    ctx.fillStyle = bota; ctx.fillRect(pDF.x - 1, pDF.y - 1, 6, 2);

    // Pierna trasera
    const mTF = { x: caderaX + Math.sin(pTraMusloAng) * musloLen, y: caderaY + Math.cos(pTraMusloAng) * musloLen };
    const pTF = { x: mTF.x + Math.sin(pTraMusloAng + pTraPantoAng) * pantoLen, y: mTF.y + Math.cos(pTraMusloAng + pTraPantoAng) * pantoLen };
    this._dibujarLimbo(ctx, caderaX, caderaY, mTF.x, mTF.y, grosorPierna - 0.5, armOscuro);
    this._dibujarLimbo(ctx, mTF.x, mTF.y, pTF.x, pTF.y, grosorPierna - 0.5, armOscuro);
    ctx.fillStyle = bota; ctx.fillRect(pTF.x - 1, pTF.y - 1, 6, 2);

    // === TORSO ===
    let torsoAng;
    if (rendido) { torsoAng = -0.4; }
    else if (esquivando) { torsoAng = -1.0; }
    else if (atacandoAlto) { torsoAng = this._lerp(0.05, 0.3, Math.min(1, d.tiempoEstado / 0.15)); }
    else if (atacandoBajo) { torsoAng = this._lerp(0.05, 0.45, Math.min(1, d.tiempoEstado / 0.15)); }
    else if (bloqueando) { torsoAng = -0.15; }
    else if (aturdido) { torsoAng = -0.2; }
    else { torsoAng = 0.08; }

    const torsoLen = 17;
    const hombroX = caderaX + Math.sin(torsoAng) * torsoLen;
    const hombroY = caderaY - Math.cos(torsoAng) * torsoLen;

    // Capa roja (detrás del torso)
    if (!rendido) {
      ctx.save();
      ctx.translate(caderaX, caderaY);
      ctx.rotate(torsoAng - 0.2);
      ctx.fillStyle = capa;
      ctx.beginPath();
      ctx.moveTo(-4, 0);
      ctx.lineTo(-6, -torsoLen + 2);
      ctx.lineTo(-2, -torsoLen + 2);
      ctx.lineTo(0, 0);
      ctx.fill();
      ctx.restore();
    }

    // Torso (armadura — más grueso que jugador)
    this._dibujarLimbo(ctx, caderaX, caderaY, hombroX, hombroY, 7, armadura);
    // Detalle de peto
    this._dibujarLimbo(ctx, caderaX, caderaY, hombroX, hombroY, 3, armOscuro);

    // === CABEZA — casco morión ===
    const cabezaX = hombroX + Math.sin(torsoAng) * 5;
    const cabezaY = hombroY - 5;

    ctx.fillStyle = armadura;
    // Casco
    ctx.beginPath();
    ctx.arc(cabezaX, cabezaY, 5, 0, Math.PI * 2);
    ctx.fill();
    // Cresta del morión
    ctx.fillRect(cabezaX - 5, cabezaY - 6, 10, 2);
    // Ala inferior
    ctx.fillRect(cabezaX - 6, cabezaY + 1, 12, 1.5);
    // Pluma roja
    ctx.fillStyle = capa;
    ctx.fillRect(cabezaX + 1, cabezaY - 12, 2, 8);
    // Visor
    ctx.fillStyle = '#222';
    ctx.fillRect(cabezaX + 1, cabezaY - 2, 4, 2);

    // === BRAZO ESPADA ===
    let brazoAng, antebrazoAng, espadaAng;
    const brazoLen = 9;
    const antebrazoLen = 8;
    const espadaLen = 20;

    if (rendido) {
      brazoAng = 0.8; antebrazoAng = 0.5; espadaAng = 1.0;
    } else if (esquivando) {
      brazoAng = -0.5; antebrazoAng = -0.3; espadaAng = -0.8;
    } else if (atacandoAlto) {
      const p = Math.min(1, d.tiempoEstado / 0.15);
      brazoAng = this._lerp(-0.8, 1.4, p);
      antebrazoAng = this._lerp(-0.5, 0.1, p);
      espadaAng = this._lerp(-0.5, 0.0, p);
    } else if (atacandoBajo) {
      const p = Math.min(1, d.tiempoEstado / 0.15);
      brazoAng = this._lerp(0.3, 1.2, p);
      antebrazoAng = this._lerp(-0.3, 0.6, p);
      espadaAng = this._lerp(-0.15, 0.5, p);
    } else if (bloqueando) {
      brazoAng = 0.3; antebrazoAng = -1.2; espadaAng = -1.5;
    } else {
      brazoAng = 0.6 + Math.sin(t * 2) * 0.03;
      antebrazoAng = -0.3;
      espadaAng = -0.15;
    }

    const codoX = hombroX + Math.sin(torsoAng + brazoAng) * brazoLen;
    const codoY = hombroY + Math.cos(torsoAng + brazoAng) * brazoLen;
    const manoX = codoX + Math.sin(torsoAng + brazoAng + antebrazoAng) * antebrazoLen;
    const manoY = codoY + Math.cos(torsoAng + brazoAng + antebrazoAng) * antebrazoLen;
    const puntaX = manoX + Math.sin(torsoAng + brazoAng + antebrazoAng + espadaAng) * espadaLen;
    const puntaY = manoY + Math.cos(torsoAng + brazoAng + antebrazoAng + espadaAng) * espadaLen;

    this._dibujarLimbo(ctx, hombroX, hombroY, codoX, codoY, grosorBrazo, armadura);
    this._dibujarLimbo(ctx, codoX, codoY, manoX, manoY, grosorBrazo, piel);
    if (!rendido) {
      ctx.fillStyle = guardia;
      ctx.beginPath();
      ctx.arc(manoX, manoY, 3, 0, Math.PI * 2);
      ctx.fill();
      this._dibujarLimbo(ctx, manoX, manoY, puntaX, puntaY, 2, espada);
    }

    // === BRAZO TRASERO ===
    let bBAng = rendido ? 0.2 : -0.5;
    let bAAng = rendido ? 0.1 : -1.0;
    const bCodoX = hombroX + Math.sin(torsoAng + bBAng) * brazoLen;
    const bCodoY = hombroY + Math.cos(torsoAng + bBAng) * brazoLen;
    const bManoX = bCodoX + Math.sin(torsoAng + bBAng + bAAng) * (antebrazoLen - 1);
    const bManoY = bCodoY + Math.cos(torsoAng + bBAng + bAAng) * (antebrazoLen - 1);
    this._dibujarLimbo(ctx, hombroX, hombroY, bCodoX, bCodoY, grosorBrazo - 0.5, armadura);
    this._dibujarLimbo(ctx, bCodoX, bCodoY, bManoX, bManoY, grosorBrazo - 0.5, piel);

    // Estrellas de aturdimiento
    if (aturdido) {
      ctx.fillStyle = '#FFD700';
      ctx.font = '7px monospace';
      for (let i = 0; i < 3; i++) {
        const sx = cabezaX - 8 + i * 8;
        const sy = cabezaY - 12 + Math.sin(t * 5 + i * 2) * 3;
        ctx.fillText('★', sx, sy);
      }
    }

    // Rendido: espada en el suelo (fuera del escalado)
    if (rendido) {
      ctx.fillStyle = espada;
      ctx.fillRect(5, -1, 18, 1.5);
      ctx.fillStyle = guardia;
      ctx.beginPath();
      ctx.arc(5, 0, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore(); // main save
  }

  // --- HUD: barras de vida / convicción ---
  _dibujarHUD(ctx, ancho, alto) {
    const t = this._textos();
    const j = this._jugador;
    const d = this._diego;

    // Vida del jugador (izquierda)
    ctx.fillStyle = '#222222';
    ctx.fillRect(14, 14, 122, 18);
    const vidaPct = j.vida / j.vidaMax;
    ctx.fillStyle = vidaPct > 0.5 ? '#44AA44' : vidaPct > 0.25 ? '#CCAA22' : '#CC4444';
    ctx.fillRect(15, 15, 120 * vidaPct, 16);
    ctx.strokeStyle = '#888888';
    ctx.lineWidth = 1;
    ctx.strokeRect(15, 15, 120, 16);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '11px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`${t?.tuVida || 'HP'}: ${j.vida}`, 18, 28);

    // Barra de Diego (derecha)
    ctx.fillStyle = '#222222';
    ctx.fillRect(ancho - 166, 14, 152, 18);
    if (this._modo === 'agresivo') {
      const dPct = d.vida / d.vidaMax;
      ctx.fillStyle = '#CC4444';
      ctx.fillRect(ancho - 165, 15, 150 * dPct, 16);
      ctx.strokeStyle = '#888888';
      ctx.strokeRect(ancho - 165, 15, 150, 16);
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'right';
      ctx.fillText(`Diego: ${d.vida}`, ancho - 18, 28);
    } else {
      const cPct = d.conviccion / 100;
      ctx.fillStyle = '#44CC44';
      ctx.fillRect(ancho - 165, 15, 150 * cPct, 16);
      ctx.strokeStyle = '#888888';
      ctx.strokeRect(ancho - 165, 15, 150, 16);
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'right';
      ctx.fillText(`${t?.conviccion || 'Convicción'}: ${d.conviccion}%`, ancho - 18, 28);
    }
    ctx.textAlign = 'left';

    // Controles (abajo)
    ctx.font = '10px monospace';
    ctx.fillStyle = '#999999';
    ctx.textAlign = 'center';
    ctx.fillText(t?.controles || '← → Moverse | E Estocada | Q Bloquear | ↓ Esquivar', ancho / 2, alto - 10);
    ctx.textAlign = 'left';
  }

  // --- Burbuja de diálogo pacifista ---
  _dibujarDialogo(ctx, ancho, alto) {
    const texto = this._dialogoActual;
    if (!texto) return;

    const bx = ancho * 0.12;
    const by = alto * 0.06;
    const bw = ancho * 0.76;
    const bh = 36;

    ctx.fillStyle = 'rgba(0, 60, 0, 0.88)';
    ctx.fillRect(bx, by, bw, bh);
    ctx.strokeStyle = '#44CC44';
    ctx.lineWidth = 1;
    ctx.strokeRect(bx, by, bw, bh);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('🕊️ ' + texto, ancho / 2, by + 22);
    ctx.textAlign = 'left';
  }

  // --- Pantalla de resultado ---
  _dibujarResultado(ctx, ancho, alto) {
    const t = this._textos();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.fillRect(0, alto * 0.3, ancho, alto * 0.4);

    ctx.textAlign = 'center';
    ctx.font = 'bold 22px monospace';

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
