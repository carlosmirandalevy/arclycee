/**
 * tech-diagrams.js — Diagramas técnicos SVG para la documentación de ArcLycée
 *
 * Genera 10 diagramas SVG inline con soporte trilingüe (ES/EN/FR).
 * Detecta el idioma del documento y usa CSS variables del tema para
 * adaptarse automáticamente a los modos claro y oscuro.
 *
 * Cada diagrama se inserta automáticamente en la sección correspondiente
 * de la documentación técnica.
 *
 * Uso: <script src="tech-diagrams.js"></script> al final del <body>
 */

(function () {
  'use strict';

  // ============================================================
  // DETECCIÓN DE IDIOMA
  // ============================================================
  var lang = document.documentElement.lang || 'es';
  if (lang !== 'en' && lang !== 'fr') lang = 'es';

  // ============================================================
  // TRADUCCIONES — etiquetas de los diagramas
  // ============================================================
  var T = {
    // Diagrama 1: Arquitectura
    arch_title: { es: 'Arquitectura del Motor', en: 'Engine Architecture', fr: 'Architecture du Moteur' },
    arch_core: { es: 'Motor (núcleo)', en: 'Engine (core)', fr: 'Moteur (noyau)' },
    arch_mechanics: { es: 'Mecánicas', en: 'Mechanics', fr: 'Mécaniques' },
    arch_worlds: { es: 'Mundos (9 niveles)', en: 'Worlds (9 levels)', fr: 'Mondes (9 niveaux)' },
    arch_characters: { es: 'Personajes', en: 'Characters', fr: 'Personnages' },
    arch_support: { es: 'Soporte', en: 'Support', fr: 'Support' },

    // Diagrama 2: Game Loop
    loop_title: { es: 'Bucle Principal del Juego', en: 'Main Game Loop', fr: 'Boucle Principale du Jeu' },
    loop_raf: { es: 'requestAnimationFrame', en: 'requestAnimationFrame', fr: 'requestAnimationFrame' },
    loop_dt: { es: 'Calcular dt', en: 'Compute dt', fr: 'Calculer dt' },
    loop_cap: { es: 'dt = min(dt, 0.1)', en: 'dt = min(dt, 0.1)', fr: 'dt = min(dt, 0.1)' },
    loop_update: { es: 'Actualizar escena', en: 'Update scene', fr: 'Mettre à jour scène' },
    loop_draw: { es: 'Dibujar escena', en: 'Draw scene', fr: 'Dessiner scène' },
    loop_overlays: { es: 'Dibujar overlays', en: 'Draw overlays', fr: 'Dessiner overlays' },
    loop_repeat: { es: 'Repetir ~60 FPS', en: 'Repeat ~60 FPS', fr: 'Répéter ~60 FPS' },

    // Diagrama 3: Overlay Stack
    stack_title: { es: 'Capas de Overlay (orden de dibujo)', en: 'Overlay Layers (draw order)', fr: 'Couches d\'Overlay (ordre de dessin)' },

    // Diagrama 4: Combate
    combat_title: { es: 'Flujo de Combate por Turnos', en: 'Turn-Based Combat Flow', fr: 'Déroulement du Combat par Tours' },
    combat_player: { es: 'Turno jugador', en: 'Player turn', fr: 'Tour joueur' },
    combat_choose: { es: 'Elegir acción', en: 'Choose action', fr: 'Choisir action' },
    combat_feedback: { es: 'Feedback', en: 'Feedback', fr: 'Retour' },
    combat_enemy: { es: 'Turno enemigo', en: 'Enemy turn', fr: 'Tour ennemi' },
    combat_check: { es: 'Verificar resultado', en: 'Check result', fr: 'Vérifier résultat' },
    combat_peace: { es: 'Victoria Pacífica', en: 'Pacifist Victory', fr: 'Victoire Pacifiste' },
    combat_force: { es: 'Victoria por Fuerza', en: 'Force Victory', fr: 'Victoire par Force' },
    combat_patience: { es: 'Paciencia', en: 'Patience', fr: 'Patience' },
    combat_hostility: { es: 'Hostilidad', en: 'Hostility', fr: 'Hostilité' },

    // Diagrama 5: Input
    input_title: { es: 'Flujo del Sistema de Input', en: 'Input System Flow', fr: 'Flux du Système d\'Entrée' },
    input_keyboard: { es: 'Teclado', en: 'Keyboard', fr: 'Clavier' },
    input_touch: { es: 'Táctil', en: 'Touch', fr: 'Tactile' },
    input_unified: { es: 'API Unificada', en: 'Unified API', fr: 'API Unifiée' },
    input_actions: { es: 'Acciones del juego', en: 'Game actions', fr: 'Actions du jeu' },

    // Diagrama 6: Audio
    audio_title: { es: 'Cadena de Síntesis de Audio', en: 'Audio Synthesis Chain', fr: 'Chaîne de Synthèse Audio' },
    audio_source: { es: 'Fuente', en: 'Source', fr: 'Source' },
    audio_process: { es: 'Procesado', en: 'Processing', fr: 'Traitement' },
    audio_output: { es: 'Salida', en: 'Output', fr: 'Sortie' },
    audio_simple: { es: 'Ejemplo simple: salto()', en: 'Simple example: salto()', fr: 'Exemple simple : salto()' },
    audio_complex: { es: 'Ejemplo complejo: cantoBallenaCerca()', en: 'Complex example: cantoBallenaCerca()', fr: 'Exemple complexe : cantoBallenaCerca()' },

    // Diagrama 7: Terrain Pipeline
    terrain_title: { es: 'Pipeline de Generación de Terreno', en: 'Terrain Generation Pipeline', fr: 'Pipeline de Génération de Terrain' },

    // Diagrama 8: Weather
    weather_title: { es: 'Máquina de Estados del Clima', en: 'Weather State Machine', fr: 'Machine à États Météo' },
    weather_sunny: { es: 'Soleado', en: 'Sunny', fr: 'Ensoleillé' },
    weather_cloudy: { es: 'Nublado', en: 'Cloudy', fr: 'Nuageux' },
    weather_rain: { es: 'Lluvia', en: 'Rain', fr: 'Pluie' },
    weather_storm: { es: 'Tormenta', en: 'Storm', fr: 'Orage' },
    weather_hurricane: { es: 'Huracán', en: 'Hurricane', fr: 'Ouragan' },
    weather_earthquake: { es: 'Terremoto', en: 'Earthquake', fr: 'Séisme' },

    // Diagrama 9: Endings
    endings_title: { es: 'Árbol de Decisión de Finales', en: 'Endings Decision Tree', fr: 'Arbre de Décision des Fins' },
    endings_complete: { es: 'Completo', en: 'Complete', fr: 'Complet' },
    endings_pacifist: { es: 'Pacifista', en: 'Pacifist', fr: 'Pacifiste' },
    endings_eco: { es: 'Ecológico', en: 'Ecological', fr: 'Écologique' },
    endings_dark: { es: 'Oscuro', en: 'Dark', fr: 'Sombre' },
    endings_museum: { es: 'Museo', en: 'Museum', fr: 'Musée' },
    endings_yes: { es: 'Sí', en: 'Yes', fr: 'Oui' },
    endings_no: { es: 'No', en: 'No', fr: 'Non' },

    // Diagrama 10: Side Quests
    quests_title: { es: 'Ciclo de Vida de Misiones Secundarias', en: 'Side Quest Lifecycle', fr: 'Cycle de Vie des Quêtes Secondaires' },
    quests_undiscovered: { es: 'No descubierta', en: 'Undiscovered', fr: 'Non découverte' },
    quests_discovered: { es: 'Descubierta', en: 'Discovered', fr: 'Découverte' },
    quests_inprogress: { es: 'En progreso', en: 'In progress', fr: 'En cours' },
    quests_completed: { es: 'Completada', en: 'Completed', fr: 'Terminée' },
    quests_talk: { es: 'Hablar con NPC', en: 'Talk to NPC', fr: 'Parler au PNJ' },
    quests_accept: { es: 'Aceptar misión', en: 'Accept quest', fr: 'Accepter quête' },
    quests_finish: { es: 'Cumplir objetivo', en: 'Complete goal', fr: 'Remplir objectif' }
  };

  function t(key) { return (T[key] && T[key][lang]) || (T[key] && T[key].es) || key; }

  // ============================================================
  // UTILIDADES SVG
  // ============================================================

  function svgEl(tag, attrs, children) {
    var ns = 'http://www.w3.org/2000/svg';
    var el = document.createElementNS(ns, tag);
    if (attrs) {
      for (var k in attrs) {
        if (k === 'textContent') el.textContent = attrs[k];
        else el.setAttribute(k, attrs[k]);
      }
    }
    if (children) {
      for (var i = 0; i < children.length; i++) {
        if (children[i]) el.appendChild(children[i]);
      }
    }
    return el;
  }

  function svgText(x, y, text, opts) {
    opts = opts || {};
    var attrs = {
      x: x, y: y,
      'font-family': opts.mono ? "'Cascadia Code', 'Fira Code', Consolas, monospace" : "'Segoe UI', system-ui, sans-serif",
      'font-size': opts.size || 12,
      fill: opts.fill || 'var(--texto)',
      'text-anchor': opts.anchor || 'middle',
      'dominant-baseline': opts.baseline || 'middle'
    };
    if (opts.weight) attrs['font-weight'] = opts.weight;
    attrs.textContent = text;
    return svgEl('text', attrs);
  }

  function svgRect(x, y, w, h, opts) {
    opts = opts || {};
    return svgEl('rect', {
      x: x, y: y, width: w, height: h, rx: opts.rx || 6,
      fill: opts.fill || 'var(--fondo-tarjeta)',
      stroke: opts.stroke || 'var(--borde)',
      'stroke-width': opts.sw || 1.5
    });
  }

  function svgLine(x1, y1, x2, y2, opts) {
    opts = opts || {};
    return svgEl('line', {
      x1: x1, y1: y1, x2: x2, y2: y2,
      stroke: opts.stroke || 'var(--dorado)',
      'stroke-width': opts.sw || 1.5,
      'marker-end': opts.arrow ? 'url(#arrowhead)' : ''
    });
  }

  function svgArrowDef() {
    return svgEl('defs', {}, [
      svgEl('marker', {
        id: 'arrowhead', markerWidth: 8, markerHeight: 6,
        refX: 8, refY: 3, orient: 'auto', fill: 'var(--dorado)'
      }, [svgEl('polygon', { points: '0 0, 8 3, 0 6' })])
    ]);
  }

  function insertAfterHeading(sectionId, svg, afterH3Index) {
    var section = document.getElementById(sectionId);
    if (!section) return;
    var wrapper = document.createElement('div');
    wrapper.className = 'world-illustration';
    wrapper.appendChild(svg);
    if (typeof afterH3Index === 'number') {
      var h3s = section.querySelectorAll('h3');
      if (h3s[afterH3Index]) {
        // Insert before the h3
        h3s[afterH3Index].parentNode.insertBefore(wrapper, h3s[afterH3Index]);
        return;
      }
    }
    // Default: insert after first h3 or at end of section
    var firstH3 = section.querySelector('h3');
    if (firstH3) {
      firstH3.parentNode.insertBefore(wrapper, firstH3);
    } else {
      section.appendChild(wrapper);
    }
  }

  // ============================================================
  // DIAGRAMA 1: ARQUITECTURA
  // ============================================================
  function diagramArchitecture() {
    var W = 900, H = 380;
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': t('arch_title') }, [
      svgEl('title', { textContent: t('arch_title') }),
      svgArrowDef()
    ]);

    // Tier labels and boxes
    var tiers = [
      { y: 20, label: t('arch_core'), color: 'var(--dorado)', items: ['juego.js', 'entrada.js', 'renderizado.js', 'sonido-procedural.js', 'guardado.js', 'configuracion.js'] },
      { y: 105, label: t('arch_mechanics'), color: 'var(--azul)', items: ['combate.js', 'dialogo.js', 'inventario.js', 'album-fotos.js', 'batu.js', 'reputacion.js', 'misiones.js'] },
      { y: 190, label: t('arch_worlds'), color: 'var(--verde)', items: ['cuevas', 'asentam. I', 'asentam. II', 'isabela', 'colonial', 'acuático', 'jurídico', 'laborat.', 'LFSD'] },
      { y: 275, label: t('arch_characters') + ' + ' + t('arch_support'), color: 'var(--morado)', items: ['pepito.js', 'magnoboot', 'viralata', 'cemí', 'idiomas/', 'mapas/', 'clima/'] }
    ];

    tiers.forEach(function (tier) {
      var itemW = Math.min(95, (W - 120) / tier.items.length - 6);
      var totalW = tier.items.length * (itemW + 6) - 6;
      var startX = 110 + (W - 110 - totalW) / 2;

      // Tier label
      svg.appendChild(svgRect(6, tier.y, 96, 55, { fill: 'var(--fondo-codigo)', stroke: tier.color, rx: 8 }));
      svg.appendChild(svgText(54, tier.y + 28, tier.label, { size: 10, fill: tier.color, weight: 600 }));

      // Items
      tier.items.forEach(function (item, i) {
        var x = startX + i * (itemW + 6);
        svg.appendChild(svgRect(x, tier.y + 5, itemW, 45, { stroke: tier.color, rx: 4 }));
        svg.appendChild(svgText(x + itemW / 2, tier.y + 28, item, { size: 9, mono: true, fill: 'var(--texto)' }));
      });
    });

    // Arrows between tiers
    for (var i = 0; i < 3; i++) {
      var y1 = tiers[i].y + 60;
      var y2 = tiers[i + 1].y + 5;
      svg.appendChild(svgLine(54, y1, 54, y2, { arrow: true }));
      svg.appendChild(svgLine(W / 2, y1 - 5, W / 2, y2, { arrow: true, stroke: 'var(--borde)' }));
    }

    insertAfterHeading('overview', svg, 0);
  }

  // ============================================================
  // DIAGRAMA 2: GAME LOOP
  // ============================================================
  function diagramGameLoop() {
    var W = 400, H = 460;
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': t('loop_title') }, [
      svgEl('title', { textContent: t('loop_title') }),
      svgArrowDef()
    ]);

    var cx = W / 2, bw = 220, bh = 40;
    var steps = [
      { y: 30, text: t('loop_raf'), fill: 'var(--fondo-codigo)', stroke: 'var(--dorado)' },
      { y: 95, text: t('loop_dt') + '\n' + t('loop_cap'), fill: 'var(--fondo-codigo)', stroke: 'var(--azul)' },
      { y: 175, text: t('loop_update'), fill: 'var(--fondo-codigo)', stroke: 'var(--verde)' },
      { y: 240, text: t('loop_draw'), fill: 'var(--fondo-codigo)', stroke: 'var(--verde)' },
      { y: 305, text: t('loop_overlays'), fill: 'var(--fondo-codigo)', stroke: 'var(--morado)' },
      { y: 380, text: t('loop_repeat'), fill: 'var(--fondo-tarjeta)', stroke: 'var(--dorado)' }
    ];

    steps.forEach(function (step, i) {
      var isDouble = i === 1;
      var h = isDouble ? 55 : bh;
      // Rounded rect for each step
      svg.appendChild(svgRect(cx - bw / 2, step.y, bw, h, { fill: step.fill, stroke: step.stroke, rx: i === 0 || i === 5 ? 20 : 6 }));

      if (isDouble) {
        var lines = step.text.split('\n');
        svg.appendChild(svgText(cx, step.y + 20, lines[0], { size: 12, fill: 'var(--texto)' }));
        svg.appendChild(svgText(cx, step.y + 38, lines[1], { size: 10, mono: true, fill: 'var(--azul)' }));
      } else {
        svg.appendChild(svgText(cx, step.y + h / 2, step.text, { size: 12, fill: 'var(--texto)' }));
      }

      // Arrow to next step
      if (i < steps.length - 1) {
        var nextY = steps[i + 1].y;
        var curBottom = step.y + h;
        svg.appendChild(svgLine(cx, curBottom, cx, nextY, { arrow: true }));
      }
    });

    // Loop-back arrow
    var loopX = cx + bw / 2 + 25;
    svg.appendChild(svgEl('path', {
      d: 'M ' + (cx + bw / 2) + ' 400 Q ' + loopX + ' 400 ' + loopX + ' 300 L ' + loopX + ' 60 Q ' + loopX + ' 30 ' + (cx + bw / 2) + ' 30',
      fill: 'none', stroke: 'var(--dorado)', 'stroke-width': 1.5,
      'stroke-dasharray': '6 4', 'marker-end': 'url(#arrowhead)'
    }));

    insertAfterHeading('gameloop', svg, 0);
  }

  // ============================================================
  // DIAGRAMA 3: OVERLAY STACK
  // ============================================================
  function diagramOverlayStack() {
    var W = 600, H = 420;
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': t('stack_title') }, [
      svgEl('title', { textContent: t('stack_title') })
    ]);

    var layers = [
      { label: '12. Selector secreto', color: '#cc4444' },
      { label: '11. Toasts', color: '#cc8844' },
      { label: '10. Inventario', color: '#ccaa44' },
      { label: '9. Foto/Selfie hint', color: '#88aa44' },
      { label: '8. Álbum de fotos', color: '#44aa88' },
      { label: '7. Reputación', color: '#4488aa' },
      { label: '6. Registro de juego', color: '#4466cc' },
      { label: '5. Mini-juegos LFSD', color: '#6644cc' },
      { label: '4. Batú', color: '#8844aa' },
      { label: '3. Combate', color: '#aa4466' },
      { label: '2. Clima', color: '#668888' },
      { label: '1. Escena base', color: '#446644' }
    ];

    var layerH = 28, gap = 3;
    var offsetX = 15, offsetY = 8;
    var baseX = 40, baseY = H - 50;
    var rectW = 320, rectH = layerH;

    layers.forEach(function (layer, i) {
      var idx = layers.length - 1 - i;
      var x = baseX + idx * offsetX;
      var y = baseY - idx * (layerH + gap) - idx * offsetY / 2;

      // Parallelogram-ish 3D effect via skewed rect
      svg.appendChild(svgEl('polygon', {
        points: [
          x + ',' + y,
          (x + rectW) + ',' + y,
          (x + rectW + offsetX) + ',' + (y - offsetY),
          (x + offsetX) + ',' + (y - offsetY)
        ].join(' '),
        fill: layer.color,
        'fill-opacity': 0.15,
        stroke: layer.color,
        'stroke-width': 1.2
      }));

      // Label
      svg.appendChild(svgText(x + rectW + offsetX + 12, y - offsetY / 2, layer.label, {
        size: 11, fill: layer.color, anchor: 'start', weight: 500
      }));
    });

    // Title
    svg.appendChild(svgText(W / 2, 18, t('stack_title'), { size: 13, fill: 'var(--dorado)', weight: 600 }));

    insertAfterHeading('gameloop', svg, 2);
  }

  // ============================================================
  // DIAGRAMA 4: COMBATE
  // ============================================================
  function diagramCombat() {
    var W = 700, H = 300;
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': t('combat_title') }, [
      svgEl('title', { textContent: t('combat_title') }),
      svgArrowDef()
    ]);

    // Main flow: Player → Feedback → Enemy → Check → loop back
    var nodes = [
      { x: 80, y: 80, w: 120, h: 50, label: t('combat_player'), color: 'var(--azul)' },
      { x: 240, y: 80, w: 100, h: 50, label: t('combat_feedback'), color: 'var(--dorado)' },
      { x: 380, y: 80, w: 120, h: 50, label: t('combat_enemy'), color: 'var(--rojo)' },
      { x: 540, y: 80, w: 120, h: 50, label: t('combat_check'), color: 'var(--morado)' }
    ];

    nodes.forEach(function (n) {
      svg.appendChild(svgRect(n.x, n.y, n.w, n.h, { stroke: n.color, rx: 8 }));
      svg.appendChild(svgText(n.x + n.w / 2, n.y + n.h / 2, n.label, { size: 11, fill: n.color, weight: 600 }));
    });

    // Arrows between nodes
    svg.appendChild(svgLine(200, 105, 240, 105, { arrow: true }));
    svg.appendChild(svgLine(340, 105, 380, 105, { arrow: true }));
    svg.appendChild(svgLine(500, 105, 540, 105, { arrow: true }));

    // Loop back arrow from Check to Player
    svg.appendChild(svgEl('path', {
      d: 'M 600 130 Q 600 170 400 170 L 140 170 Q 80 170 80 130',
      fill: 'none', stroke: 'var(--borde)', 'stroke-width': 1.5,
      'stroke-dasharray': '6 4', 'marker-end': 'url(#arrowhead)'
    }));

    // Victory nodes
    svg.appendChild(svgRect(490, 200, 150, 40, { fill: 'var(--fondo-codigo)', stroke: 'var(--verde)', rx: 20 }));
    svg.appendChild(svgText(565, 220, t('combat_peace'), { size: 10, fill: 'var(--verde)', weight: 600 }));
    svg.appendChild(svgText(565, 232, t('combat_patience') + ' = 100', { size: 8, mono: true, fill: 'var(--texto-tenue)' }));

    svg.appendChild(svgRect(490, 252, 150, 40, { fill: 'var(--fondo-codigo)', stroke: 'var(--rojo)', rx: 20 }));
    svg.appendChild(svgText(565, 272, t('combat_force'), { size: 10, fill: 'var(--rojo)', weight: 600 }));
    svg.appendChild(svgText(565, 284, 'HP = 0', { size: 8, mono: true, fill: 'var(--texto-tenue)' }));

    svg.appendChild(svgLine(600, 130, 565, 200, { arrow: true, stroke: 'var(--verde)' }));
    svg.appendChild(svgLine(620, 130, 580, 252, { arrow: true, stroke: 'var(--rojo)' }));

    // Meters
    // Patience bar
    svg.appendChild(svgRect(30, 210, 200, 24, { fill: 'var(--fondo-codigo)', stroke: 'var(--verde)', rx: 4 }));
    svg.appendChild(svgRect(32, 212, 130, 20, { fill: 'var(--verde)', stroke: 'none', rx: 3 }));
    svg.appendChild(svgText(130, 222, t('combat_patience') + ' (0-100)', { size: 10, fill: '#fff', weight: 600 }));
    svg.appendChild(svgText(130, 250, '+hablar +negociar +personal', { size: 9, mono: true, fill: 'var(--verde)' }));

    // Hostility bar
    svg.appendChild(svgRect(30, 266, 200, 24, { fill: 'var(--fondo-codigo)', stroke: 'var(--rojo)', rx: 4 }));
    svg.appendChild(svgRect(32, 268, 80, 20, { fill: 'var(--rojo)', stroke: 'none', rx: 3 }));
    svg.appendChild(svgText(130, 278, t('combat_hostility') + ' (0-100)', { size: 10, fill: '#fff', weight: 600 }));

    // Title
    svg.appendChild(svgText(W / 2, 25, t('combat_title'), { size: 13, fill: 'var(--dorado)', weight: 600 }));

    // Subtitle: reputation bonus
    svg.appendChild(svgText(W / 2, 48, 'pacienciaInicial = min(reputación / 2, 25)', { size: 10, mono: true, fill: 'var(--texto-tenue)' }));

    insertAfterHeading('combat', svg, 0);
  }

  // ============================================================
  // DIAGRAMA 5: INPUT
  // ============================================================
  function diagramInput() {
    var W = 700, H = 260;
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': t('input_title') }, [
      svgEl('title', { textContent: t('input_title') }),
      svgArrowDef()
    ]);

    // Keyboard box
    svg.appendChild(svgRect(20, 30, 160, 80, { stroke: 'var(--azul)', rx: 8 }));
    svg.appendChild(svgText(100, 50, t('input_keyboard'), { size: 12, fill: 'var(--azul)', weight: 600 }));
    svg.appendChild(svgText(100, 70, 'keydown / keyup', { size: 9, mono: true, fill: 'var(--texto-tenue)' }));
    svg.appendChild(svgText(100, 85, 'teclasPresionadas', { size: 9, mono: true, fill: 'var(--texto-tenue)' }));
    svg.appendChild(svgText(100, 100, 'Map<accion, true>', { size: 9, mono: true, fill: 'var(--texto-tenue)' }));

    // Touch box
    svg.appendChild(svgRect(20, 140, 160, 95, { stroke: 'var(--morado)', rx: 8 }));
    svg.appendChild(svgText(100, 160, t('input_touch'), { size: 12, fill: 'var(--morado)', weight: 600 }));
    svg.appendChild(svgText(100, 180, 'Joystick / D-pad', { size: 9, mono: true, fill: 'var(--texto-tenue)' }));
    svg.appendChild(svgText(100, 195, 'A / B / X / Y / SALTO', { size: 9, mono: true, fill: 'var(--texto-tenue)' }));
    svg.appendChild(svgText(100, 210, 'accionesTocadas', { size: 9, mono: true, fill: 'var(--texto-tenue)' }));
    svg.appendChild(svgText(100, 225, 'Map<accion, true>', { size: 9, mono: true, fill: 'var(--texto-tenue)' }));

    // Unified API box (center)
    svg.appendChild(svgRect(250, 80, 180, 100, { stroke: 'var(--dorado)', rx: 12, sw: 2.5 }));
    svg.appendChild(svgText(340, 108, t('input_unified'), { size: 13, fill: 'var(--dorado)', weight: 700 }));
    svg.appendChild(svgText(340, 132, 'estaPresionada', { size: 11, mono: true, fill: 'var(--dorado-claro)' }));
    svg.appendChild(svgText(340, 150, '(accion)', { size: 11, mono: true, fill: 'var(--dorado-claro)' }));
    svg.appendChild(svgText(340, 170, 'bloqueoEntrada', { size: 9, mono: true, fill: 'var(--texto-tenue)' }));

    // Game actions box
    svg.appendChild(svgRect(500, 50, 170, 160, { stroke: 'var(--verde)', rx: 8 }));
    svg.appendChild(svgText(585, 70, t('input_actions'), { size: 11, fill: 'var(--verde)', weight: 600 }));
    var actions = ['arriba / abajo', 'izquierda / derecha', 'accion / cancelar', 'saltar / mapa', 'inventario / especial', 'foto / selfie / album', 'registro / referencia'];
    actions.forEach(function (a, i) {
      svg.appendChild(svgText(585, 92 + i * 16, a, { size: 9, mono: true, fill: 'var(--texto-tenue)' }));
    });

    // Arrows
    svg.appendChild(svgLine(180, 70, 250, 115, { arrow: true, stroke: 'var(--azul)' }));
    svg.appendChild(svgLine(180, 188, 250, 145, { arrow: true, stroke: 'var(--morado)' }));
    svg.appendChild(svgLine(430, 130, 500, 130, { arrow: true, stroke: 'var(--verde)' }));

    // Title
    svg.appendChild(svgText(W / 2, 18, t('input_title'), { size: 13, fill: 'var(--dorado)', weight: 600 }));

    insertAfterHeading('input', svg, 0);
  }

  // ============================================================
  // DIAGRAMA 6: AUDIO SYNTHESIS
  // ============================================================
  function diagramAudio() {
    var W = 750, H = 250;
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': t('audio_title') }, [
      svgEl('title', { textContent: t('audio_title') }),
      svgArrowDef()
    ]);

    // Title
    svg.appendChild(svgText(W / 2, 18, t('audio_title'), { size: 13, fill: 'var(--dorado)', weight: 600 }));

    // Simple chain: osc → gain(ADSR) → destination
    svg.appendChild(svgText(80, 55, t('audio_simple'), { size: 10, fill: 'var(--texto-tenue)', anchor: 'start' }));
    var simpleY = 75;
    // Oscillator
    svg.appendChild(svgRect(30, simpleY, 120, 40, { stroke: 'var(--verde)', rx: 6 }));
    svg.appendChild(svgText(90, simpleY + 14, 'Oscillator', { size: 10, fill: 'var(--verde)', weight: 600 }));
    svg.appendChild(svgText(90, simpleY + 28, 'square 150→400Hz', { size: 8, mono: true, fill: 'var(--texto-tenue)' }));
    // Arrow
    svg.appendChild(svgLine(150, simpleY + 20, 190, simpleY + 20, { arrow: true, stroke: 'var(--verde)' }));
    // Gain
    svg.appendChild(svgRect(190, simpleY, 120, 40, { stroke: 'var(--dorado)', rx: 6 }));
    svg.appendChild(svgText(250, simpleY + 14, 'GainNode', { size: 10, fill: 'var(--dorado)', weight: 600 }));
    svg.appendChild(svgText(250, simpleY + 28, 'ADSR envelope', { size: 8, mono: true, fill: 'var(--texto-tenue)' }));
    // Arrow
    svg.appendChild(svgLine(310, simpleY + 20, 350, simpleY + 20, { arrow: true, stroke: 'var(--verde)' }));
    // Destination
    svg.appendChild(svgRect(350, simpleY, 100, 40, { stroke: 'var(--texto-tenue)', rx: 20 }));
    svg.appendChild(svgText(400, simpleY + 20, '🔊 destination', { size: 9, fill: 'var(--texto)' }));

    // Complex chain: osc + LFO → filter → gain → destination
    svg.appendChild(svgText(80, 145, t('audio_complex'), { size: 10, fill: 'var(--texto-tenue)', anchor: 'start' }));
    var compY = 165;
    // Main oscillator
    svg.appendChild(svgRect(30, compY, 110, 40, { stroke: 'var(--verde)', rx: 6 }));
    svg.appendChild(svgText(85, compY + 14, 'Oscillator', { size: 10, fill: 'var(--verde)', weight: 600 }));
    svg.appendChild(svgText(85, compY + 28, 'sine + vibrato', { size: 8, mono: true, fill: 'var(--texto-tenue)' }));
    // LFO box (above, connected)
    svg.appendChild(svgRect(50, compY - 40, 90, 32, { stroke: 'var(--azul)', rx: 6 }));
    svg.appendChild(svgText(95, compY - 30, 'LFO 4Hz', { size: 9, fill: 'var(--azul)', weight: 600 }));
    svg.appendChild(svgText(95, compY - 18, '± modulation', { size: 8, mono: true, fill: 'var(--texto-tenue)' }));
    svg.appendChild(svgLine(95, compY - 8, 85, compY, { arrow: true, stroke: 'var(--azul)' }));
    // Arrow
    svg.appendChild(svgLine(140, compY + 20, 180, compY + 20, { arrow: true, stroke: 'var(--verde)' }));
    // Filter
    svg.appendChild(svgRect(180, compY, 120, 40, { stroke: 'var(--morado)', rx: 6 }));
    svg.appendChild(svgText(240, compY + 14, 'BiquadFilter', { size: 10, fill: 'var(--morado)', weight: 600 }));
    svg.appendChild(svgText(240, compY + 28, 'lowpass 600Hz', { size: 8, mono: true, fill: 'var(--texto-tenue)' }));
    // Arrow
    svg.appendChild(svgLine(300, compY + 20, 340, compY + 20, { arrow: true, stroke: 'var(--verde)' }));
    // Gain
    svg.appendChild(svgRect(340, compY, 110, 40, { stroke: 'var(--dorado)', rx: 6 }));
    svg.appendChild(svgText(395, compY + 14, 'GainNode', { size: 10, fill: 'var(--dorado)', weight: 600 }));
    svg.appendChild(svgText(395, compY + 28, 'exp. decay 4.2s', { size: 8, mono: true, fill: 'var(--texto-tenue)' }));
    // Arrow
    svg.appendChild(svgLine(450, compY + 20, 490, compY + 20, { arrow: true, stroke: 'var(--verde)' }));
    // Destination
    svg.appendChild(svgRect(490, compY, 100, 40, { stroke: 'var(--texto-tenue)', rx: 20 }));
    svg.appendChild(svgText(540, compY + 20, '🔊 destination', { size: 9, fill: 'var(--texto)' }));

    // Legend on right
    svg.appendChild(svgRect(610, 55, 120, 150, { fill: 'var(--fondo-codigo)', stroke: 'var(--borde)', rx: 8 }));
    svg.appendChild(svgText(670, 75, 'Waveforms:', { size: 9, fill: 'var(--texto-tenue)', weight: 600 }));
    ['sine', 'square', 'sawtooth', 'triangle'].forEach(function (w, i) {
      svg.appendChild(svgText(670, 95 + i * 16, w, { size: 9, mono: true, fill: 'var(--verde)' }));
    });
    svg.appendChild(svgText(670, 165, 'Filters:', { size: 9, fill: 'var(--texto-tenue)', weight: 600 }));
    ['lowpass', 'highpass', 'bandpass'].forEach(function (f, i) {
      svg.appendChild(svgText(670, 183 + i * 14, f, { size: 9, mono: true, fill: 'var(--morado)' }));
    });

    insertAfterHeading('audio', svg, 0);
  }

  // ============================================================
  // DIAGRAMA 7: TERRAIN PIPELINE
  // ============================================================
  function diagramTerrain() {
    var W = 800, H = 200;
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': t('terrain_title') }, [
      svgEl('title', { textContent: t('terrain_title') }),
      svgArrowDef()
    ]);

    svg.appendChild(svgText(W / 2, 18, t('terrain_title'), { size: 13, fill: 'var(--dorado)', weight: 600 }));

    var steps = [
      { label: 'ISLA_BITMAP', sub: '128×68 chars', color: '#4488cc' },
      { label: 'Tierra/Agua', sub: "'1'/'0'", color: '#446644' },
      { label: 'Costa', sub: '1-tile borde', color: '#88aa44' },
      { label: 'Playas', sub: 'arena', color: '#ccaa44' },
      { label: 'Cordilleras', sub: '8 cadenas', color: '#888888' },
      { label: 'Lagos', sub: '2 elipses', color: '#4488aa' },
      { label: 'Bosques', sub: 'hash 40%', color: '#226622' },
      { label: 'Ríos', sub: 'Bresenham ×5', color: '#4466cc' }
    ];

    var stepW = 82, stepH = 50, gap = 8;
    var startX = (W - steps.length * (stepW + gap) + gap) / 2;
    var y = 50;

    steps.forEach(function (step, i) {
      var x = startX + i * (stepW + gap);
      svg.appendChild(svgRect(x, y, stepW, stepH, { stroke: step.color, rx: 6 }));
      svg.appendChild(svgText(x + stepW / 2, y + 18, step.label, { size: 9, fill: step.color, weight: 600 }));
      svg.appendChild(svgText(x + stepW / 2, y + 35, step.sub, { size: 8, mono: true, fill: 'var(--texto-tenue)' }));
      // Step number
      svg.appendChild(svgEl('circle', { cx: x + stepW / 2, cy: y - 8, r: 9, fill: step.color, 'fill-opacity': 0.3, stroke: step.color, 'stroke-width': 1 }));
      svg.appendChild(svgText(x + stepW / 2, y - 8, '' + (i + 1), { size: 8, fill: step.color, weight: 700 }));
      // Arrow
      if (i < steps.length - 1) {
        svg.appendChild(svgLine(x + stepW, y + stepH / 2, x + stepW + gap, y + stepH / 2, { arrow: true, stroke: 'var(--borde)' }));
      }
    });

    // Terrain color legend
    var terrainTypes = [
      { name: 'Agua prof.', color: '#1a3a5c' },
      { name: 'Agua sup.', color: '#3a7aaa' },
      { name: 'Arena', color: '#c8b478' },
      { name: 'Pradera', color: '#5a8a3a' },
      { name: 'Bosque', color: '#2a5a1a' },
      { name: 'Montaña', color: '#6a6a7a' },
      { name: 'Río', color: '#4a8acc' },
      { name: 'Camino', color: '#8a7a5a' }
    ];

    var legendY = 130;
    var legendX = (W - terrainTypes.length * 90) / 2;
    terrainTypes.forEach(function (tt, i) {
      var x = legendX + i * 95;
      svg.appendChild(svgRect(x, legendY, 14, 14, { fill: tt.color, stroke: 'var(--borde)', rx: 2 }));
      svg.appendChild(svgText(x + 22, legendY + 7, tt.name, { size: 9, fill: 'var(--texto-tenue)', anchor: 'start' }));
    });

    // Output label
    svg.appendChild(svgText(W / 2, 175, '→ 128×68 = 8,704 tiles', { size: 11, mono: true, fill: 'var(--dorado)' }));

    insertAfterHeading('tilemap', svg, 0);
  }

  // ============================================================
  // DIAGRAMA 8: WEATHER STATE MACHINE
  // ============================================================
  function diagramWeather() {
    var W = 700, H = 320;
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': t('weather_title') }, [
      svgEl('title', { textContent: t('weather_title') }),
      svgArrowDef()
    ]);

    svg.appendChild(svgText(W / 2, 22, t('weather_title'), { size: 13, fill: 'var(--dorado)', weight: 600 }));

    var states = [
      { x: 120, y: 80, r: 42, label: t('weather_sunny'), pct: '45%', icon: '☀', color: '#DAA520' },
      { x: 280, y: 70, r: 34, label: t('weather_cloudy'), pct: '25%', icon: '☁', color: '#8888aa' },
      { x: 420, y: 80, r: 30, label: t('weather_rain'), pct: '20%', icon: '🌧', color: '#4488cc' },
      { x: 550, y: 100, r: 24, label: t('weather_storm'), pct: '7%', icon: '⛈', color: '#8844cc' },
      { x: 620, y: 190, r: 20, label: t('weather_hurricane'), pct: '2%', icon: '🌀', color: '#cc4444' },
      { x: 480, y: 210, r: 18, label: t('weather_earthquake'), pct: '1%', icon: '🌋', color: '#8B6914' }
    ];

    // Connection lines (simplified — not all-to-all, just main transitions)
    var connections = [[0,1],[1,0],[1,2],[2,1],[2,3],[3,2],[3,4],[4,3],[0,5]];
    connections.forEach(function (c) {
      var a = states[c[0]], b = states[c[1]];
      svg.appendChild(svgLine(a.x, a.y, b.x, b.y, { stroke: 'var(--borde)', sw: 1 }));
    });

    states.forEach(function (s) {
      // Circle sized by probability
      svg.appendChild(svgEl('circle', {
        cx: s.x, cy: s.y, r: s.r,
        fill: s.color, 'fill-opacity': 0.15,
        stroke: s.color, 'stroke-width': 2
      }));
      svg.appendChild(svgText(s.x, s.y - 6, s.icon, { size: s.r * 0.6 }));
      svg.appendChild(svgText(s.x, s.y + s.r + 14, s.label, { size: 10, fill: s.color, weight: 600 }));
      svg.appendChild(svgText(s.x, s.y + s.r + 28, s.pct, { size: 9, mono: true, fill: 'var(--texto-tenue)' }));
    });

    // Hurricane sub-phases
    var phY = 270;
    svg.appendChild(svgText(350, phY, 'Huracán:', { size: 10, fill: 'var(--rojo)', weight: 600, anchor: 'end' }));
    var phases = ['inicio 0-25%', 'pico 25-75%', 'final 75-100%'];
    phases.forEach(function (p, i) {
      var px = 370 + i * 110;
      svg.appendChild(svgRect(px, phY - 12, 95, 24, { stroke: 'var(--rojo)', rx: 12, fill: 'var(--fondo-codigo)' }));
      svg.appendChild(svgText(px + 47, phY, p, { size: 8, mono: true, fill: 'var(--rojo)' }));
      if (i < 2) svg.appendChild(svgLine(px + 95, phY, px + 110, phY, { arrow: true, stroke: 'var(--rojo)' }));
    });

    insertAfterHeading('weather', svg, 0);
  }

  // ============================================================
  // DIAGRAMA 9: ENDINGS DECISION TREE
  // ============================================================
  function diagramEndings() {
    var W = 700, H = 340;
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': t('endings_title') }, [
      svgEl('title', { textContent: t('endings_title') }),
      svgArrowDef()
    ]);

    svg.appendChild(svgText(W / 2, 18, t('endings_title'), { size: 13, fill: 'var(--dorado)', weight: 600 }));

    // Decision nodes (diamonds as rotated squares)
    function diamond(cx, cy, label, detail) {
      var g = svgEl('g');
      g.appendChild(svgEl('rect', {
        x: cx - 24, y: cy - 24, width: 48, height: 48, rx: 4,
        fill: 'var(--fondo-tarjeta)', stroke: 'var(--dorado)', 'stroke-width': 1.5,
        transform: 'rotate(45 ' + cx + ' ' + cy + ')'
      }));
      g.appendChild(svgText(cx, cy - 3, label, { size: 7, fill: 'var(--dorado)', weight: 600 }));
      if (detail) g.appendChild(svgText(cx, cy + 8, detail, { size: 6, mono: true, fill: 'var(--texto-tenue)' }));
      return g;
    }

    function terminal(x, y, label, color) {
      var g = svgEl('g');
      g.appendChild(svgRect(x - 55, y - 16, 110, 32, { fill: color, 'fill-opacity': 0.85, stroke: color, rx: 16 }));
      g.appendChild(svgText(x, y, label, { size: 11, fill: '#fff', weight: 700 }));
      return g;
    }

    // Layout: cascading decisions left-to-right, terminals branching off
    // D1: violentos > pacificados?
    svg.appendChild(diamond(120, 80, 'violentos', '> pacif.?'));
    svg.appendChild(svgText(170, 60, t('endings_yes'), { size: 9, fill: 'var(--rojo)', anchor: 'start' }));
    svg.appendChild(svgLine(152, 80, 220, 80, { arrow: true, stroke: 'var(--rojo)' }));
    svg.appendChild(terminal(300, 80, t('endings_dark'), '#cc4444'));

    svg.appendChild(svgText(120, 120, t('endings_no'), { size: 9, fill: 'var(--verde)' }));
    svg.appendChild(svgLine(120, 112, 120, 145, { arrow: true, stroke: 'var(--verde)' }));

    // D2: ecológicas >= 3 && violentos == 0?
    svg.appendChild(diamond(120, 175, 'eco ≥ 3', '&& !viol.'));
    svg.appendChild(svgText(170, 155, t('endings_yes'), { size: 9, fill: 'var(--azul)', anchor: 'start' }));
    svg.appendChild(svgLine(152, 175, 220, 175, { arrow: true, stroke: 'var(--azul)' }));
    svg.appendChild(terminal(300, 175, t('endings_eco'), '#4488cc'));

    svg.appendChild(svgText(120, 215, t('endings_no'), { size: 9, fill: 'var(--verde)' }));
    svg.appendChild(svgLine(120, 207, 120, 240, { arrow: true, stroke: 'var(--verde)' }));

    // D3: 8 nodos + 7 sidequests?
    svg.appendChild(diamond(120, 270, '8 nodos', '+ 5 side'));
    svg.appendChild(svgText(170, 250, t('endings_yes'), { size: 9, fill: 'var(--dorado)', anchor: 'start' }));
    svg.appendChild(svgLine(152, 270, 220, 270, { arrow: true, stroke: 'var(--dorado)' }));
    svg.appendChild(terminal(300, 270, t('endings_complete'), '#DAA520'));

    svg.appendChild(svgText(120, 310, t('endings_no'), { size: 9, fill: 'var(--verde)' }));
    svg.appendChild(svgLine(120, 302, 200, 320, { arrow: true, stroke: 'var(--verde)' }));

    // D4: pacificados > violentos?
    svg.appendChild(diamond(250, 320, 'pacif.', '> viol.?'));
    svg.appendChild(svgText(300, 305, t('endings_yes'), { size: 9, fill: 'var(--verde)', anchor: 'start' }));
    svg.appendChild(svgLine(282, 320, 360, 320, { arrow: true, stroke: 'var(--verde)' }));
    svg.appendChild(terminal(440, 320, t('endings_pacifist'), '#44cc44'));

    svg.appendChild(svgText(250, 338, t('endings_no'), { size: 9, fill: 'var(--texto-tenue)' }));
    svg.appendChild(svgLine(250, 344, 250, 338, {}));
    // Museum goes to the right-bottom
    svg.appendChild(svgLine(282, 330, 540, 330, { arrow: true, stroke: 'var(--texto-tenue)' }));
    svg.appendChild(terminal(620, 330, t('endings_museum'), '#cc8844'));

    insertAfterHeading('endings', svg, 0);
  }

  // ============================================================
  // DIAGRAMA 10: SIDE QUEST LIFECYCLE
  // ============================================================
  function diagramQuests() {
    var W = 700, H = 150;
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': t('quests_title') }, [
      svgEl('title', { textContent: t('quests_title') }),
      svgArrowDef()
    ]);

    svg.appendChild(svgText(W / 2, 18, t('quests_title'), { size: 13, fill: 'var(--dorado)', weight: 600 }));

    var stateData = [
      { x: 30, label: t('quests_undiscovered'), icon: '🔒', color: 'var(--texto-tenue)' },
      { x: 190, label: t('quests_discovered'), icon: '👁', color: 'var(--dorado)' },
      { x: 350, label: t('quests_inprogress'), icon: '⚙', color: 'var(--azul)' },
      { x: 510, label: t('quests_completed'), icon: '✓', color: 'var(--verde)' }
    ];

    var y = 70, boxW = 120, boxH = 46;

    stateData.forEach(function (s, i) {
      svg.appendChild(svgRect(s.x, y, boxW, boxH, { stroke: s.color, rx: 10, sw: 2 }));
      svg.appendChild(svgText(s.x + 20, y + boxH / 2, s.icon, { size: 16 }));
      svg.appendChild(svgText(s.x + boxW / 2 + 10, y + boxH / 2, s.label, { size: 10, fill: s.color, weight: 600 }));

      // Arrow + transition label
      if (i < stateData.length - 1) {
        var nextX = stateData[i + 1].x;
        svg.appendChild(svgLine(s.x + boxW, y + boxH / 2, nextX, y + boxH / 2, { arrow: true }));

        var transitions = [t('quests_talk'), t('quests_accept'), t('quests_finish')];
        svg.appendChild(svgText((s.x + boxW + nextX) / 2, y - 6, transitions[i], {
          size: 8, fill: 'var(--texto-tenue)'
        }));
      }
    });

    // Quest examples below
    svg.appendChild(svgText(W / 2, 136, 'batú · rescateManatí · buenasVibraciones · metalCompleto · cienciaLoca', {
      size: 9, mono: true, fill: 'var(--texto-tenue)'
    }));

    insertAfterHeading('reputation', svg, 2);
  }

  // ============================================================
  // INICIALIZACIÓN — generar todos los diagramas
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    diagramArchitecture();
    diagramGameLoop();
    diagramOverlayStack();
    diagramCombat();
    diagramInput();
    diagramAudio();
    diagramTerrain();
    diagramWeather();
    diagramEndings();
    diagramQuests();
  });

})();
