// ============================================================
// world-previews.js — Canvas-based preview renders of game worlds
// ============================================================
// Reemplaza las ilustraciones SVG estáticas en docs/worlds.html
// con renders Canvas 2D que reflejan los colores y elementos
// reales de cada mundo del juego. Animación con requestAnimationFrame
// y IntersectionObserver para eficiencia.
// ============================================================

(function () {
  'use strict';

  // Dimensiones del canvas (coinciden con el viewBox SVG original)
  var W = 480, H = 270;

  // Tiempo global de animación
  var t = 0;

  // ---- Utilidades ----

  function grad(ctx, x0, y0, x1, y1, stops) {
    var g = ctx.createLinearGradient(x0, y0, x1, y1);
    for (var i = 0; i < stops.length; i++) g.addColorStop(stops[i][0], stops[i][1]);
    return g;
  }

  function circle(ctx, x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function rect(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }

  function tri(ctx, x1, y1, x2, y2, x3, y3, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
  }

  function label(ctx, text, x, y, color, size) {
    ctx.fillStyle = color || '#8888aa';
    ctx.font = (size || 8) + 'px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(text, x, y);
  }

  function labelBar(ctx, text) {
    rect(ctx, 0, H - 15, W, 15, '#0a0a18');
    label(ctx, text, 10, H - 5, '#8888aa', 8);
  }

  // Hash pseudo-aleatorio estable
  function hash(x, y) {
    var n = x * 374761393 + y * 668265263;
    n = (n ^ (n >> 13)) * 1274126177;
    return ((n ^ (n >> 16)) & 0x7fffffff) / 0x7fffffff;
  }

  // ============================================================
  // RENDERERS — uno por mundo
  // ============================================================

  // 1. Cuevas del Pomier — Plataformas en la oscuridad
  function drawCuevas(ctx) {
    // Fondo oscuro de cueva
    rect(ctx, 0, 0, W, H, '#0a0808');

    // Textura de roca
    for (var i = 0; i < 60; i++) {
      var rx = hash(i, 7) * W, ry = hash(i, 13) * H;
      ctx.fillStyle = 'rgba(80,60,40,' + (hash(i, 3) * 0.08) + ')';
      ctx.fillRect(rx, ry, hash(i, 1) * 15 + 3, hash(i, 2) * 8 + 2);
    }

    // Plataformas de piedra
    var plats = [[20, 200, 100], [150, 170, 80], [260, 190, 90], [370, 160, 80]];
    for (var p = 0; p < plats.length; p++) {
      var px = plats[p][0], py = plats[p][1], pw = plats[p][2];
      rect(ctx, px, py, pw, 12, '#706050');
      rect(ctx, px, py, pw, 3, '#8B7355');
    }

    // Petroglifos (espirales simples)
    ctx.strokeStyle = '#B8860B';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.6;
    var petroX = [80, 300, 420];
    var petroY = [140, 120, 130];
    for (var s = 0; s < petroX.length; s++) {
      ctx.beginPath();
      for (var a = 0; a < 8; a++) {
        var angle = a * 0.8;
        var r = 2 + a * 1.2;
        var sx = petroX[s] + Math.cos(angle) * r;
        var sy = petroY[s] + Math.sin(angle) * r;
        if (a === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Halo de luz (antorcha/linterna)
    var lightX = 240 + Math.sin(t * 0.5) * 5;
    var lightY = 150;
    var radGrad = ctx.createRadialGradient(lightX, lightY, 5, lightX, lightY, 80);
    radGrad.addColorStop(0, 'rgba(255,200,100,0.25)');
    radGrad.addColorStop(0.5, 'rgba(255,180,80,0.08)');
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, W, H);

    // Jugador (silueta en la luz)
    rect(ctx, 236, 185, 8, 8, '#D2956A');
    rect(ctx, 234, 193, 12, 10, '#22AA44');

    // Oscuridad overlay
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, 0, W, H);

    // Re-dibujar luz por encima de la oscuridad
    var radGrad2 = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, 90);
    radGrad2.addColorStop(0, 'rgba(255,200,100,0.3)');
    radGrad2.addColorStop(0.6, 'rgba(255,180,80,0.05)');
    radGrad2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radGrad2;
    ctx.fillRect(lightX - 90, lightY - 90, 180, 180);

    labelBar(ctx, 'Cuevas del Pomier — Platformer + Darkness mechanic');
  }

  // 2. Asentamiento Taíno I — Aldea con bohíos
  function drawTaino1(ctx) {
    // Pasto
    rect(ctx, 0, 0, W, H, '#3a7a2e');
    // Textura de hierba
    for (var i = 0; i < 80; i++) {
      ctx.fillStyle = 'rgba(50,140,40,' + (hash(i, 5) * 0.15 + 0.05) + ')';
      ctx.fillRect(hash(i, 1) * W, hash(i, 2) * H, 2, hash(i, 3) * 4 + 1);
    }

    // Caminos de tierra
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(220, 0, 40, H);
    ctx.fillRect(0, 130, W, 35);

    // Batey central (plaza ceremonial)
    circle(ctx, 240, 135, 40, '#C8A84E');
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(240, 135, 42, 0, Math.PI * 2); ctx.stroke();

    // Bohíos (casas redondas con techo cónico)
    var bohios = [[80, 70], [380, 70], [80, 210], [380, 210], [240, 40]];
    for (var b = 0; b < bohios.length; b++) {
      var bx = bohios[b][0], by = bohios[b][1];
      // Paredes
      circle(ctx, bx, by + 10, 22, '#8B6914');
      // Techo
      tri(ctx, bx - 28, by + 5, bx + 28, by + 5, bx, by - 20, '#5a7a2e');
      // Puerta
      rect(ctx, bx - 3, by + 5, 6, 12, '#3a2a1a');
    }

    // Árboles
    var trees = [[30, 30], [440, 40], [30, 240], [450, 230], [160, 20], [320, 240]];
    for (var tr = 0; tr < trees.length; tr++) {
      var tx = trees[tr][0], ty = trees[tr][1];
      rect(ctx, tx - 2, ty, 4, 14, 'rgb(100,70,30)');
      circle(ctx, tx, ty - 4, 12, 'rgb(' + (40 + hash(tr, 1) * 30) + ',' + (120 + hash(tr, 2) * 40) + ',' + (30 + hash(tr, 3) * 20) + ')');
    }

    // Piedras decorativas del batey
    circle(ctx, 225, 110, 3, '#777');
    circle(ctx, 255, 110, 3, '#777');
    circle(ctx, 225, 160, 3, '#777');
    circle(ctx, 255, 160, 3, '#777');

    // NPC (Cacique)
    rect(ctx, 236, 127, 8, 8, '#D2956A');
    rect(ctx, 234, 135, 12, 10, '#CC6600');

    labelBar(ctx, 'Asentamiento Taíno I — Bohíos + Batey central');
  }

  // 3. Asentamiento Taíno II — Agricultura y ceremonias
  function drawTaino2(ctx) {
    // Pasto
    rect(ctx, 0, 0, W, H, '#3a7a2e');
    for (var i = 0; i < 80; i++) {
      ctx.fillStyle = 'rgba(50,140,40,' + (hash(i + 99, 5) * 0.12 + 0.03) + ')';
      ctx.fillRect(hash(i + 99, 1) * W, hash(i + 99, 2) * H, 2, hash(i + 99, 3) * 4 + 1);
    }

    // Caminos
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(200, 0, 35, H);
    ctx.fillRect(0, 120, W, 30);

    // Batey más grande
    circle(ctx, 210, 135, 50, '#C8A84E');

    // Conucos (montículos agrícolas)
    var conucos = [[350, 60], [400, 60], [350, 100], [400, 100], [350, 200], [400, 200]];
    for (var c = 0; c < conucos.length; c++) {
      var cx2 = conucos[c][0], cy2 = conucos[c][1];
      ctx.fillStyle = '#6a5a3a';
      ctx.beginPath();
      ctx.ellipse(cx2, cy2, 18, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      // Plantitas
      ctx.fillStyle = '#4a8a2a';
      ctx.fillRect(cx2 - 6, cy2 - 8, 2, 6);
      ctx.fillRect(cx2, cy2 - 10, 2, 8);
      ctx.fillRect(cx2 + 6, cy2 - 7, 2, 5);
    }

    // Bohíos
    var bohios2 = [[70, 60], [70, 210], [140, 60], [140, 210]];
    for (var b2 = 0; b2 < bohios2.length; b2++) {
      var bx2 = bohios2[b2][0], by2 = bohios2[b2][1];
      circle(ctx, bx2, by2 + 10, 20, '#8B6914');
      tri(ctx, bx2 - 25, by2 + 5, bx2 + 25, by2 + 5, bx2, by2 - 18, '#5a7a2e');
      rect(ctx, bx2 - 3, by2 + 5, 6, 10, '#3a2a1a');
    }

    // Árboles
    var trees2 = [[20, 20], [460, 30], [20, 240], [460, 240], [280, 20], [280, 245]];
    for (var t2 = 0; t2 < trees2.length; t2++) {
      var tx2 = trees2[t2][0], ty2 = trees2[t2][1];
      rect(ctx, tx2 - 2, ty2, 4, 12, 'rgb(100,70,30)');
      circle(ctx, tx2, ty2 - 3, 11, 'rgb(' + (45 + hash(t2 + 50, 1) * 25) + ',' + (125 + hash(t2 + 50, 2) * 35) + ',' + (35 + hash(t2 + 50, 3) * 15) + ')');
    }

    // NPC Behique (con tocado)
    rect(ctx, 206, 127, 8, 8, '#D2956A');
    rect(ctx, 204, 135, 12, 10, '#8B008B');
    rect(ctx, 205, 122, 6, 6, '#FFD700');

    labelBar(ctx, 'Asentamiento Taíno II — Conucos + Ceremonias');
  }

  // 4. La Isabela — Ruinas coloniales
  function drawIsabela(ctx) {
    // Cielo
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#87CEEB'], [0.4, '#c8dce8'], [0.5, '#d4c898'], [1, '#b8a878']]);
    ctx.fillRect(0, 0, W, H);

    // Mar al fondo
    rect(ctx, 0, 0, W, 50, 'rgba(30,90,160,0.35)');
    // Olas
    ctx.strokeStyle = 'rgba(200,220,255,0.3)';
    ctx.lineWidth = 1;
    for (var ola = 0; ola < 4; ola++) {
      ctx.beginPath();
      var oy = 15 + ola * 10 + Math.sin(t + ola) * 2;
      for (var ox = 0; ox < W; ox += 2) {
        var vy = oy + Math.sin(ox * 0.05 + t * 0.8 + ola) * 3;
        if (ox === 0) ctx.moveTo(ox, vy); else ctx.lineTo(ox, vy);
      }
      ctx.stroke();
    }

    // Línea costera
    rect(ctx, 0, 48, W, 3, '#c8b888');

    // Caminos de piedra
    ctx.fillStyle = '#8a7a60';
    ctx.fillRect(100, 80, 280, 12);
    ctx.fillRect(240, 60, 12, 180);

    // Iglesia
    rect(ctx, 60, 70, 60, 50, '#a09070');
    tri(ctx, 55, 70, 125, 70, 90, 45, '#887060');
    rect(ctx, 83, 95, 14, 25, '#3a2a1a');
    // Cruz
    rect(ctx, 88, 38, 4, 12, '#c0b090');
    rect(ctx, 84, 42, 12, 3, '#c0b090');

    // Casa de Colón
    rect(ctx, 160, 100, 50, 35, '#a09070');
    rect(ctx, 160, 90, 50, 12, '#8B4513');
    rect(ctx, 178, 115, 10, 20, '#3a2a1a');

    // Almacén
    rect(ctx, 280, 110, 40, 25, '#a09070');
    rect(ctx, 280, 105, 40, 8, '#8B4513');

    // Torre de vigía
    rect(ctx, 400, 60, 25, 60, '#a09070');
    rect(ctx, 396, 55, 33, 8, '#887060');
    // Almenas
    for (var a = 0; a < 4; a++) rect(ctx, 398 + a * 8, 50, 5, 6, '#887060');

    // Cementerio
    for (var cr = 0; cr < 3; cr++) {
      var ccx = 340 + cr * 18, ccy = 190;
      rect(ctx, ccx, ccy, 2, 10, '#999');
      rect(ctx, ccx - 3, ccy + 2, 8, 2, '#999');
    }

    // Vegetación escasa
    circle(ctx, 30, 140, 8, '#5a8a3a');
    circle(ctx, 450, 100, 10, '#5a8a3a');
    rect(ctx, 28, 145, 4, 10, '#6a4a2a');
    rect(ctx, 448, 107, 4, 12, '#6a4a2a');

    // NPC (Soldado Diego)
    rect(ctx, 196, 170, 8, 8, '#D2956A');
    rect(ctx, 194, 178, 12, 10, '#cc3333');
    // Casco
    rect(ctx, 194, 166, 12, 6, '#888');

    labelBar(ctx, 'La Isabela — First European settlement (1494)');
  }

  // 5. Zona Colonial — Calles empedradas y edificios
  function drawZonaColonial(ctx) {
    // Fondo adoquinado
    rect(ctx, 0, 0, W, H, '#a09880');
    // Textura adoquines
    for (var i = 0; i < 100; i++) {
      ctx.fillStyle = 'rgba(120,110,90,' + (hash(i + 200, 3) * 0.15 + 0.05) + ')';
      var ax = hash(i + 200, 1) * W, ay = hash(i + 200, 2) * H;
      ctx.fillRect(ax, ay, 6, 4);
    }

    // Calles principales
    ctx.fillStyle = '#706050';
    ctx.fillRect(0, 120, W, 40);
    ctx.fillRect(180, 0, 35, H);

    // Edificio: Catedral
    rect(ctx, 30, 30, 70, 70, '#c0b090');
    tri(ctx, 25, 30, 105, 30, 65, 5, '#a08060');
    rect(ctx, 55, 65, 20, 35, '#4a3a2a');
    // Roseta
    circle(ctx, 65, 40, 8, '#d0c0a0');
    circle(ctx, 65, 40, 5, '#4a3a2a');

    // Panteón Nacional
    rect(ctx, 250, 30, 80, 60, '#b0a080');
    rect(ctx, 250, 25, 80, 8, '#907060');
    // Columnas
    for (var col = 0; col < 4; col++) rect(ctx, 258 + col * 20, 30, 4, 60, '#c0b090');
    // Guardias ceremoniales
    rect(ctx, 255, 85, 6, 10, '#2a3a2a');
    rect(ctx, 319, 85, 6, 10, '#2a3a2a');

    // Edificios laterales
    rect(ctx, 30, 175, 50, 40, '#b8a888');
    rect(ctx, 100, 180, 40, 35, '#c0a878');
    rect(ctx, 250, 175, 60, 45, '#b0a080');
    rect(ctx, 350, 170, 50, 50, '#c0b090');
    rect(ctx, 420, 180, 40, 35, '#b8a888');

    // Ventanas y puertas
    var blds = [[45, 185], [112, 190], [270, 185], [365, 180], [432, 190]];
    for (var bd = 0; bd < blds.length; bd++) {
      rect(ctx, blds[bd][0], blds[bd][1], 8, 12, '#3a2a1a');
      rect(ctx, blds[bd][0] + 15, blds[bd][1] - 5, 5, 5, '#5a4a3a');
    }

    // Zona de excavación (brillo pulsante)
    var glow = 0.08 + Math.sin(t * 2) * 0.04;
    ctx.fillStyle = 'rgba(255,215,0,' + glow + ')';
    ctx.fillRect(380, 120, 50, 40);
    ctx.strokeStyle = 'rgba(255,215,0,0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(380, 120, 50, 40);

    // NPC (Dra. Martínez)
    rect(ctx, 398, 133, 8, 8, '#D2956A');
    rect(ctx, 396, 141, 12, 10, '#ffffff');

    labelBar(ctx, 'Zona Colonial de Santo Domingo — UNESCO Heritage');
  }

  // 6. Mundo Acuático — Naufragio de la Santa María
  function drawAcuatico(ctx) {
    // Gradiente oceánico
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#0a1a3a'], [0.5, '#143050'], [1, '#1a3a5a']]);
    ctx.fillRect(0, 0, W, H);

    // Arena del fondo
    ctx.fillStyle = grad(ctx, 0, H * 0.75, 0, H, [[0, 'rgba(180,160,120,0.08)'], [1, 'rgba(180,160,120,0.2)']]);
    ctx.fillRect(0, H * 0.75, W, H * 0.25);

    // Rayos de luz
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = '#ffffc8';
    ctx.beginPath();
    ctx.moveTo(100, 0); ctx.lineTo(80, H); ctx.lineTo(130, H); ctx.lineTo(120, 0);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(320, 0); ctx.lineTo(290, H); ctx.lineTo(340, H); ctx.lineTo(330, 0);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Algas (animadas)
    ctx.lineWidth = 2;
    var algae = [[50, 230], [60, 235], [420, 228], [440, 232]];
    for (var al = 0; al < algae.length; al++) {
      var alx = algae[al][0], aly = algae[al][1];
      ctx.strokeStyle = al % 2 === 0 ? '#2a8a4a' : '#3a9a5a';
      ctx.beginPath();
      ctx.moveTo(alx, aly);
      var sway = Math.sin(t * 1.5 + al * 2) * 5;
      ctx.quadraticCurveTo(alx + sway, aly - 20, alx + sway * 0.5, aly - 40);
      ctx.stroke();
    }

    // Corales
    circle(ctx, 80, 220, 14, '#8a5040');
    circle(ctx, 93, 216, 9, '#cc6688');
    circle(ctx, 400, 224, 11, '#8a5040');
    circle(ctx, 385, 218, 7, '#44aacc');

    // Restos del naufragio
    ctx.save();
    ctx.translate(240, 200);
    ctx.rotate(-0.08);
    rect(ctx, -60, -4, 120, 8, '#5a3a1a');
    ctx.restore();
    // Mástil roto
    rect(ctx, 200, 170, 6, 30, '#5a3a1a');
    ctx.save();
    ctx.translate(264, 168);
    ctx.rotate(0.15);
    rect(ctx, 0, 0, 6, 32, '#5a3a1a');
    ctx.restore();

    // Burbujas (animadas)
    for (var bu = 0; bu < 8; bu++) {
      var bx2 = 60 + bu * 55;
      var by2 = 40 + hash(bu, 5) * 100 - ((t * 15 + bu * 30) % 150);
      if (by2 < 0) by2 += 150;
      var br2 = 1.5 + hash(bu, 6) * 2;
      ctx.strokeStyle = 'rgba(200,220,255,' + (0.2 + hash(bu, 7) * 0.15) + ')';
      ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.arc(bx2, by2, br2, 0, Math.PI * 2); ctx.stroke();
    }

    // Medusa
    var jy = 75 + Math.sin(t * 0.7) * 10;
    ctx.fillStyle = 'rgba(200,180,255,0.45)';
    ctx.beginPath(); ctx.ellipse(100, jy, 8, 5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(200,180,255,0.25)';
    ctx.lineWidth = 0.8;
    for (var ten = -1; ten <= 1; ten++) {
      ctx.beginPath();
      ctx.moveTo(100 + ten * 4, jy + 5);
      ctx.lineTo(100 + ten * 4 + Math.sin(t + ten) * 2, jy + 20);
      ctx.stroke();
    }

    // Pez león
    ctx.fillStyle = '#cc4444';
    ctx.beginPath(); ctx.ellipse(300, 160, 10, 6, 0, 0, Math.PI * 2); ctx.fill();
    // Espinas
    ctx.strokeStyle = '#cc4444';
    ctx.lineWidth = 1.2;
    for (var sp = 0; sp < 3; sp++) {
      ctx.beginPath();
      ctx.moveTo(295 + sp * 5, 155);
      ctx.lineTo(292 + sp * 5, 148);
      ctx.stroke();
    }

    // Tortuga
    ctx.fillStyle = '#5a8a3a';
    ctx.beginPath(); ctx.ellipse(350, 120, 12, 8, 0, 0, Math.PI * 2); ctx.fill();
    circle(ctx, 338, 118, 4, '#6a9a4a');

    // Jugador nadando
    rect(ctx, 236, 140, 8, 8, '#D2956A');
    rect(ctx, 234, 148, 12, 10, '#4488CC');

    // Tinte de agua
    rect(ctx, 0, 0, W, H, 'rgba(20,60,100,0.18)');

    labelBar(ctx, 'Mundo Acuático — Shipwreck + Depth sorting');
  }

  // 7. Mundo Jurídico — Aeropuerto de Punta Cana
  function drawJuridico(ctx) {
    // Piso del aeropuerto
    rect(ctx, 0, 0, W, H, '#d0ccc0');
    // Tiles
    for (var ty3 = 0; ty3 < H; ty3 += 30) {
      for (var tx3 = 0; tx3 < W; tx3 += 30) {
        var dark = ((tx3 / 30 + ty3 / 30) % 2 === 0);
        if (dark) rect(ctx, tx3, ty3, 30, 30, '#c4c0b4');
        ctx.strokeStyle = 'rgba(160,155,140,0.3)';
        ctx.strokeRect(tx3, ty3, 30, 30);
      }
    }

    // Paredes
    rect(ctx, 0, 0, W, 20, '#8a8478');
    rect(ctx, 0, 17, W, 4, '#6a6458');

    // Mostrador de Aduanas
    rect(ctx, 30, 50, 120, 30, '#5a5a60');
    rect(ctx, 30, 50, 120, 5, '#4a4a50');
    label(ctx, 'ADUANAS', 55, 70, '#ddd', 9);

    // Máquina rayos X
    rect(ctx, 200, 55, 60, 35, '#333');
    rect(ctx, 210, 60, 40, 22, '#224488');
    ctx.fillStyle = '#44ff44';
    ctx.fillRect(260, 58, 3, 3);

    // Cinta transportadora
    rect(ctx, 280, 65, 100, 10, '#555');
    for (var seg = 0; seg < 5; seg++) rect(ctx, 285 + seg * 20, 65, 8, 10, '#666');

    // Carrusel de equipaje
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(350, 180, 60, 35, 0, 0, Math.PI * 2); ctx.stroke();
    // Maletas
    rect(ctx, 320, 175, 12, 8, '#cc4444');
    rect(ctx, 370, 170, 10, 8, '#4444cc');

    // Puerta de embarque
    rect(ctx, 30, 140, 100, 25, '#5a5a60');
    rect(ctx, 30, 140, 100, 4, '#4a4a50');
    label(ctx, 'GATE B7', 50, 157, '#ddd', 8);

    // Oficina INTERPOL
    rect(ctx, 30, 200, 80, 50, '#2a3a5a');
    rect(ctx, 30, 200, 80, 5, '#1a2a4a');
    label(ctx, 'INTERPOL', 40, 230, '#aabbdd', 8);

    // Barreras de seguridad
    for (var bar = 0; bar < 3; bar++) {
      rect(ctx, 180 + bar * 50, 120, 30, 6, '#888');
      rect(ctx, 185 + bar * 50, 115, 4, 18, '#aaa');
      rect(ctx, 200 + bar * 50, 115, 4, 18, '#aaa');
    }

    // NPC Traficante (sospechoso)
    rect(ctx, 345, 106, 8, 8, '#D2956A');
    rect(ctx, 343, 114, 12, 10, '#222');
    // Maletín
    rect(ctx, 356, 116, 8, 6, '#553311');

    // NPC Inspector
    rect(ctx, 70, 215, 8, 8, '#D2956A');
    rect(ctx, 68, 223, 12, 10, '#2244aa');

    labelBar(ctx, 'Mundo Jurídico — Aeropuerto de Punta Cana');
  }

  // 8. Museo de las Atarazanas Reales
  function drawMuseo(ctx) {
    // Piso de mármol a cuadros
    for (var my = 0; my < H; my += 20) {
      for (var mx = 0; mx < W; mx += 20) {
        var chk = ((mx / 20 + my / 20) % 2 === 0);
        rect(ctx, mx, my, 20, 20, chk ? '#E8E0D0' : '#D8D0C0');
      }
    }

    // Paredes
    rect(ctx, 0, 0, W, 18, '#8B7355');
    rect(ctx, 0, 15, W, 5, '#6B4226');
    rect(ctx, 0, H - 18, W, 18, '#8B7355');

    // Sala de exhibición
    rect(ctx, 20, 40, 140, 80, 'rgba(200,220,240,0.15)');
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 40, 140, 80);

    // Vitrinas con artefactos
    var vitrinas = [[40, 55], [80, 55], [120, 55]];
    for (var v = 0; v < vitrinas.length; v++) {
      var vx = vitrinas[v][0], vy = vitrinas[v][1];
      rect(ctx, vx, vy, 25, 40, 'rgba(200,220,240,0.35)');
      ctx.strokeStyle = '#999';
      ctx.strokeRect(vx, vy, 25, 40);
      // Artefacto dentro
      var colors = ['#B87333', '#8B6914', '#6B4226'];
      circle(ctx, vx + 12, vy + 20, 5, colors[v]);
    }

    // Laboratorio C-14
    rect(ctx, 200, 40, 100, 70, 'rgba(220,240,220,0.15)');
    ctx.strokeStyle = '#888';
    ctx.strokeRect(200, 40, 100, 70);
    label(ctx, 'Lab C-14', 220, 58, '#666', 8);
    // Equipo científico
    rect(ctx, 220, 65, 30, 20, '#555');
    rect(ctx, 225, 68, 20, 12, '#338833');
    rect(ctx, 260, 70, 20, 15, '#666');

    // Taller de restauración
    rect(ctx, 340, 40, 120, 70, 'rgba(240,220,200,0.15)');
    ctx.strokeStyle = '#888';
    ctx.strokeRect(340, 40, 120, 70);
    rect(ctx, 360, 60, 40, 25, '#8B7355');
    rect(ctx, 420, 55, 25, 30, '#8B7355');

    // Recepción
    rect(ctx, 150, 170, 150, 25, '#8B7355');
    rect(ctx, 150, 170, 150, 4, '#6B4226');

    // Certificado en la pared (con sello dorado)
    rect(ctx, 380, 160, 30, 40, '#D2B48C');
    circle(ctx, 395, 190, 5, '#FFD700');

    // NPC Dr. Morbán
    rect(ctx, 215, 175, 8, 8, '#D2956A');
    rect(ctx, 213, 183, 12, 10, '#ffffff');

    // NPC sospechoso
    rect(ctx, 400, 140, 8, 8, '#D2956A');
    rect(ctx, 398, 148, 12, 10, '#333');

    labelBar(ctx, 'Museo de las Atarazanas Reales — Carbon-14 lab');
  }

  // 9. LFSD — Clase de Robótica
  function drawLFSD(ctx) {
    // Piso a cuadros (estilo escolar)
    for (var ly = 0; ly < H; ly += 18) {
      for (var lx = 0; lx < W; lx += 18) {
        var chk2 = ((lx / 18 + ly / 18) % 2 === 0);
        rect(ctx, lx, ly, 18, 18, chk2 ? '#D0D8E0' : '#C0C8D0');
      }
    }

    // Paredes
    rect(ctx, 0, 0, W, 16, '#E8E0D0');
    rect(ctx, 0, 14, W, 4, '#2255AA');

    // Pizarra
    rect(ctx, 140, 22, 200, 45, '#8a7a5a');
    rect(ctx, 145, 25, 190, 38, '#2a4a2a');
    ctx.fillStyle = '#fff';
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('les fous du robot', 240, 42);
    ctx.fillStyle = '#ccc';
    ctx.font = '7px monospace';
    ctx.fillText('Robotics Class 2026', 240, 55);
    ctx.textAlign = 'left';

    // Mesas de trabajo (4)
    var mesas = [[60, 90], [200, 90], [60, 180], [200, 180]];
    for (var m = 0; m < mesas.length; m++) {
      var mxx = mesas[m][0], myy = mesas[m][1];
      rect(ctx, mxx, myy, 80, 35, '#8B7355');
      rect(ctx, mxx, myy, 80, 3, '#7a6345');
      // Componentes electrónicos
      rect(ctx, mxx + 10, myy + 8, 12, 8, '#44AA44');
      rect(ctx, mxx + 30, myy + 10, 8, 6, '#AA4444');
      rect(ctx, mxx + 50, myy + 8, 15, 10, '#3333AA');
    }

    // Estantería
    rect(ctx, 380, 30, 80, 100, '#6B5335');
    for (var sh = 0; sh < 4; sh++) rect(ctx, 380, 40 + sh * 24, 80, 2, '#5a4325');
    // Libros de colores
    var bookColors = ['#AA3333', '#3333AA', '#33AA33', '#AA33AA', '#AAAA33'];
    for (var bk = 0; bk < 5; bk++) rect(ctx, 385 + bk * 14, 44, 10, 18, bookColors[bk]);

    // Escritorio del profesor
    rect(ctx, 380, 160, 80, 35, '#4a3520');
    // Laptop
    rect(ctx, 395, 165, 30, 20, '#333');
    rect(ctx, 398, 167, 24, 14, '#4488FF');

    // Impresora 3D
    rect(ctx, 380, 210, 35, 30, '#555');
    rect(ctx, 380, 207, 35, 5, '#333');
    ctx.fillStyle = '#44FF44';
    ctx.fillRect(410, 210, 3, 3);

    // Vitrina con robot
    rect(ctx, 420, 210, 35, 30, 'rgba(200,220,240,0.4)');
    ctx.strokeStyle = '#999';
    ctx.strokeRect(420, 210, 35, 30);
    // Robot naranja
    rect(ctx, 432, 220, 10, 12, '#DD8800');
    rect(ctx, 434, 217, 6, 5, '#CC7700');
    ctx.fillStyle = '#44FFFF';
    ctx.fillRect(435, 219, 2, 2);
    ctx.fillRect(438, 219, 2, 2);

    // Estudiantes NPC (9 — con camisetas de colores)
    var students = [
      [75, 125, '#4488DD'],   // Émile (blue)
      [120, 125, '#44AA44'],  // Diana (green)
      [215, 125, '#DD6644'],  // Lucas (orange)
      [255, 125, '#AA44AA'],  // Théo
      [75, 215, '#DD4444'],   // Naël
      [120, 215, '#44AAAA'],  // Jules
      [215, 215, '#AAAA44'],  // Rafael
      [255, 215, '#AA6633'],  // Alberto
      [310, 150, '#4488DD']   // Carlos Guillermo
    ];
    for (var st = 0; st < students.length; st++) {
      var stx = students[st][0], sty = students[st][1], stc = students[st][2];
      rect(ctx, stx, sty, 8, 8, '#D2956A');
      rect(ctx, stx - 2, sty + 8, 12, 10, stc);
    }

    // Profesor
    rect(ctx, 395, 195, 8, 8, '#D2956A');
    rect(ctx, 393, 203, 12, 10, '#333');

    labelBar(ctx, 'LFSD — Robotics Classroom + 3 Side Quest mini-games');
  }

  // ============================================================
  // MATCHING — asociar cada renderer con su mundo-card
  // ============================================================

  // Mapa de keywords en el título → función de dibujo
  var renderers = [
    // Cuevas del Pomier (ES/EN/FR)
    { key: 'Cuevas', fn: drawCuevas },
    { key: 'Pomier', fn: drawCuevas },
    { key: 'Grottes', fn: drawCuevas },
    // Asentamiento / Settlement / Village Taíno I
    { key: 'Taíno I', fn: drawTaino1 },
    { key: 'Settlement I', fn: drawTaino1 },
    { key: 'Village Taïno I', fn: drawTaino1 },
    // Taíno II
    { key: 'Taíno II', fn: drawTaino2 },
    { key: 'Settlement II', fn: drawTaino2 },
    { key: 'Village Taïno II', fn: drawTaino2 },
    // La Isabela
    { key: 'Isabela', fn: drawIsabela },
    // Zona Colonial
    { key: 'Zona Colonial', fn: drawZonaColonial },
    // Mundo Acuático / Aquatic / Aquatique
    { key: 'Acuático', fn: drawAcuatico },
    { key: 'Aquatic', fn: drawAcuatico },
    { key: 'Aquatique', fn: drawAcuatico },
    // Mundo Jurídico / Legal / Juridique
    { key: 'Jurídico', fn: drawJuridico },
    { key: 'Legal World', fn: drawJuridico },
    { key: 'Juridique', fn: drawJuridico },
    // Museo / Museum / Musée
    { key: 'Atarazanas', fn: drawMuseo },
    { key: 'Royal Shipyards', fn: drawMuseo },
    // LFSD / Side Quests / Quêtes
    { key: 'LFSD', fn: drawLFSD },
    { key: 'Robótica', fn: drawLFSD },
    { key: 'Side Quests Overview', fn: drawLFSD },
    { key: 'Cours de Robotique', fn: drawLFSD }
  ];

  function findRenderer(title) {
    for (var r = 0; r < renderers.length; r++) {
      if (title.indexOf(renderers[r].key) !== -1) return renderers[r].fn;
    }
    return null;
  }

  // ============================================================
  // INIT — buscar mundo-cards, insertar canvas, animar
  // ============================================================

  var canvases = []; // {canvas, ctx, fn, visible}

  function init() {
    var cards = document.querySelectorAll('.mundo-card');
    cards.forEach(function (card) {
      var titulo = card.querySelector('.mundo-titulo');
      if (!titulo) return;
      var text = titulo.textContent;
      var fn = findRenderer(text);
      if (!fn) return;

      // Buscar si ya hay una world-illustration
      var existing = card.querySelector('.world-illustration');
      var container;

      if (existing) {
        // Reemplazar SVG con canvas
        existing.innerHTML = '';
        container = existing;
      } else {
        // Crear nuevo contenedor después del .mundo-desc o primer <p>
        container = document.createElement('div');
        container.className = 'world-illustration';
        var desc = card.querySelector('.mundo-desc') || card.querySelector('p');
        if (desc && desc.nextSibling) {
          card.insertBefore(container, desc.nextSibling);
        } else {
          card.appendChild(container);
        }
      }

      var canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = 'auto';
      canvas.style.imageRendering = 'auto';
      container.appendChild(canvas);

      var ctx2 = canvas.getContext('2d');
      canvases.push({ canvas: canvas, ctx: ctx2, fn: fn, visible: false });
    });

    // IntersectionObserver para eficiencia
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          for (var i = 0; i < canvases.length; i++) {
            if (canvases[i].canvas === entry.target) {
              canvases[i].visible = entry.isIntersecting;
              break;
            }
          }
        });
      }, { threshold: 0.1 });

      canvases.forEach(function (item) {
        observer.observe(item.canvas);
      });
    } else {
      // Fallback: siempre visible
      canvases.forEach(function (item) { item.visible = true; });
    }

    // Dibujo inicial (todos una vez)
    canvases.forEach(function (item) {
      item.fn(item.ctx);
    });

    // Animación
    requestAnimationFrame(animate);
  }

  function animate() {
    t += 0.016; // ~60fps increment
    var anyVisible = false;
    for (var i = 0; i < canvases.length; i++) {
      if (canvases[i].visible) {
        canvases[i].ctx.clearRect(0, 0, W, H);
        canvases[i].fn(canvases[i].ctx);
        anyVisible = true;
      }
    }
    requestAnimationFrame(animate);
  }

  // Esperar DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
