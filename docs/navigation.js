/**
 * navigation.js — Barra de navegación compartida para la documentación de ArcLycée
 *
 * Genera una barra de navegación con pills, selector de idioma y
 * switch de tema claro/oscuro. Se incluye en cada página de la
 * documentación y detecta automáticamente la página activa.
 *
 * Uso: <script src="navigation.js"></script> al final del <body>
 */

(function () {
  'use strict';

  // ============================================================
  // LUCIDE SVG ICONS — inline, no CDN dependency
  // ============================================================
  var SVG = function(d) { return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>'; };
  var ICO = {
    home:     SVG('<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
    scroll:   SVG('<path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/>'),
    globe:    SVG('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>'),
    users:    SVG('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    msg:      SVG('<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>'),
    wrench:   SVG('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'),
    cog:      SVG('<circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'),
    code:     SVG('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),
    grad:     SVG('<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>'),
    book:     SVG('<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>'),
    robot:    SVG('<rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" x2="8" y1="16" y2="16"/><line x1="16" x2="16" y1="16" y2="16"/>'),
    compass:  SVG('<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>'),
    pen:      SVG('<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>'),
    landmark: SVG('<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>'),
    leaf:     SVG('<path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>'),
    swords:   SVG('<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/>'),
    clip:     SVG('<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>'),
    gitBranch:SVG('<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>'),
  };

  // ============================================================
  // CONFIGURACIÓN DE PÁGINAS POR IDIOMA
  // Cada entrada mapea un id de sección a sus archivos en cada idioma.
  // ============================================================
  const PAGINAS = {
    overview: {
      icono: ICO.home,
      label: { es: 'Inicio', en: 'Home', fr: 'Accueil' },
      archivos: { es: 'index.html', en: 'en.html', fr: 'fr.html' }
    },
    // --- La Historia (grupo con subitems) ---
    historiaGrupo: {
      icono: ICO.swords,
      label: { es: 'El Juego', en: 'Game Concept', fr: 'Le Jeu' },
      grupo: true,
      children: ['historia', 'narrativa', 'worlds', 'characters', 'dialogues', 'archaeology', 'nature']
    },
    historia: {
      icono: ICO.book,
      label: { es: 'Historia', en: 'Story', fr: 'Histoire' },
      archivos: { es: 'historia.html', en: 'historia-en.html', fr: 'historia-fr.html' },
      parent: 'historiaGrupo'
    },
    narrativa: {
      icono: ICO.scroll,
      label: { es: 'Narrativa', en: 'Narrative', fr: 'Récit' },
      archivos: { es: 'narrativa.html', en: 'narrativa-en.html', fr: 'narrativa-fr.html' },
      parent: 'historiaGrupo'
    },
    worlds: {
      icono: ICO.globe,
      label: { es: 'Mundos', en: 'Worlds', fr: 'Mondes' },
      archivos: { es: 'worlds.html', en: 'worlds-en.html', fr: 'worlds-fr.html' },
      parent: 'historiaGrupo'
    },
    characters: {
      icono: ICO.users,
      label: { es: 'Personajes', en: 'Characters', fr: 'Personnages' },
      archivos: { es: 'characters.html', en: 'characters-en.html', fr: 'characters-fr.html' },
      parent: 'historiaGrupo'
    },
    dialogues: {
      icono: ICO.msg,
      label: { es: 'Diálogos', en: 'Dialogues', fr: 'Dialogues' },
      archivos: { es: 'dialogues.html', en: 'dialogues-en.html', fr: 'dialogues-fr.html' },
      parent: 'historiaGrupo'
    },
    // --- Técnico (grupo con subitems) ---
    tecnicoGrupo: {
      icono: ICO.wrench,
      label: { es: 'Técnico', en: 'Technical', fr: 'Technique' },
      grupo: true,
      children: ['mechanics', 'technical', 'changelog', 'cloneUs']
    },
    mechanics: {
      icono: ICO.cog,
      label: { es: 'Mecánicas', en: 'Mechanics', fr: 'Mécaniques' },
      archivos: { es: 'mechanics.html', en: 'mechanics-en.html', fr: 'mechanics-fr.html' },
      parent: 'tecnicoGrupo'
    },
    technical: {
      icono: ICO.code,
      label: { es: 'Programación', en: 'Programming', fr: 'Programmation' },
      archivos: { es: 'technical.html', en: 'technical-en.html', fr: 'technical-fr.html' },
      parent: 'tecnicoGrupo'
    },
    changelog: {
      icono: ICO.clip,
      label: { es: 'Cambios', en: 'Change Log', fr: 'Changements' },
      archivos: { es: 'changelog.html', en: 'changelog.html', fr: 'changelog.html' },
      parent: 'tecnicoGrupo'
    },
    cloneUs: {
      icono: ICO.gitBranch,
      label: { es: 'Clónanos', en: 'Clone Us', fr: 'Clonez-nous' },
      archivos: { es: 'clone-us.html', en: 'clone-us-en.html', fr: 'clone-us-fr.html' },
      parent: 'tecnicoGrupo'
    },
    // --- Pedagogía (grupo con subitems) ---
    pedagogiaGrupo: {
      icono: ICO.grad,
      label: { es: 'Pedagogía', en: 'Pedagogy', fr: 'Pédagogie' },
      grupo: true,
      children: ['pedagogia', 'pedagogiaAI', 'learningGuide', 'assessment']
    },
    pedagogia: {
      icono: ICO.book,
      label: { es: 'Educación', en: 'Education', fr: 'Éducation' },
      archivos: { es: 'pedagogy.html', en: 'pedagogy-en.html', fr: 'pedagogy-fr.html' },
      parent: 'pedagogiaGrupo'
    },
    pedagogiaAI: {
      icono: ICO.robot,
      label: { es: 'Uso de IA', en: 'AI Usage', fr: 'Usage de l\'IA' },
      archivos: { es: 'pedagogy-ai.html', en: 'pedagogy-ai-en.html', fr: 'pedagogy-ai-fr.html' },
      parent: 'pedagogiaGrupo'
    },
    learningGuide: {
      icono: ICO.compass,
      label: { es: 'Guía de Aprendizaje', en: 'Learning Guide', fr: 'Guide d\'Apprentissage' },
      archivos: { es: 'learning-guide.html', en: 'learning-guide-en.html', fr: 'learning-guide-fr.html' },
      parent: 'pedagogiaGrupo'
    },
    assessment: {
      icono: ICO.pen,
      label: { es: 'Evaluación', en: 'Assessment', fr: 'Évaluation' },
      archivos: { es: 'assessment.html', en: 'assessment-en.html', fr: 'assessment-fr.html' },
      parent: 'pedagogiaGrupo'
    },
    // --- Acerca de (grupo con subitems) ---
    aboutGrupo: {
      icono: ICO.users,
      label: { es: 'Acerca de', en: 'About', fr: 'À propos' },
      grupo: true,
      children: ['aboutNota', 'aboutEquipo', 'aboutContacto']
    },
    aboutNota: {
      icono: ICO.pen,
      label: { es: 'Nota del Profesor', en: 'Teacher\'s Note', fr: 'Note du Professeur' },
      archivos: { es: 'about.html', en: 'about-en.html', fr: 'about-fr.html' },
      hash: 'nota-profesor',
      parent: 'aboutGrupo'
    },
    aboutEquipo: {
      icono: ICO.users,
      label: { es: 'El Equipo', en: 'The Team', fr: 'L\'Équipe' },
      archivos: { es: 'about.html', en: 'about-en.html', fr: 'about-fr.html' },
      hash: 'equipo',
      parent: 'aboutGrupo'
    },
    aboutContacto: {
      icono: ICO.msg,
      label: { es: 'Contáctanos', en: 'Contact Us', fr: 'Contactez-nous' },
      archivos: { es: 'about.html', en: 'about-en.html', fr: 'about-fr.html' },
      hash: 'contacto',
      parent: 'aboutGrupo'
    },
    encyclopedia: {
      icono: ICO.book,
      label: { es: 'Arquepedia', en: 'Archpedia', fr: 'Archepédie' },
      archivos: { es: 'encyclopedia.html', en: 'encyclopedia-en.html', fr: 'encyclopedia-fr.html' }
    },
    archaeology: {
      icono: ICO.landmark,
      label: { es: 'Arqueología', en: 'Archaeology', fr: 'Archéologie' },
      archivos: { es: 'archaeology.html', en: 'archaeology-en.html', fr: 'archaeology-fr.html' },
      parent: 'historiaGrupo'
    },
    nature: {
      icono: ICO.leaf,
      label: { es: 'Naturaleza', en: 'Nature', fr: 'Nature' },
      archivos: { es: 'nature.html', en: 'nature-en.html', fr: 'nature-fr.html' },
      parent: 'historiaGrupo'
    }
  };

  // ============================================================
  // DETECCIÓN DEL IDIOMA Y PÁGINA ACTUAL
  // ============================================================

  // Extraer el nombre del archivo de la URL actual.
  // Maneja: /docs/, /docs/worlds.html, /docs/mechanics (sin extensión), file:///...
  function obtenerNombreArchivo() {
    var ruta = window.location.pathname;
    var ultimo = ruta.split('/').pop() || '';
    // Ruta vacía (termina en /) → directorio raíz → index.html
    if (ultimo === '') {
      return 'index.html';
    }
    // Ya tiene .html → usar directamente
    if (ultimo.indexOf('.html') !== -1) {
      return ultimo;
    }
    // Sin extensión (ej: /docs/mechanics) → añadir .html
    // Buscamos si "ultimo.html" existe en alguna página configurada
    var conExtension = ultimo + '.html';
    for (var id in PAGINAS) {
      var archivos = PAGINAS[id].archivos;
      for (var lang in archivos) {
        if (archivos[lang] === conExtension) return conExtension;
      }
    }
    // No coincide con ninguna página → asumir index.html
    return 'index.html';
  }

  var archivoActual = obtenerNombreArchivo();

  // Calcular el prefijo base para los enlaces de navegación.
  // Cuando se accede a /docs (sin slash final), el navegador trata
  // "docs" como un archivo y resuelve enlaces relativos contra el
  // directorio padre. Detectamos esto y añadimos "docs/" como prefijo.
  // Si la ruta es /docs (sin trailing slash), el navegador resuelve
  // enlaces relativos contra el directorio padre. Redirigimos a /docs/.
  (function() {
    var ruta = window.location.pathname;
    if (/\/docs$/.test(ruta)) {
      window.location.replace(ruta + '/');
    }
  })();

  // Detectar idioma: usa el atributo lang del <html> como fuente
  // principal (siempre correcto), con fallback al nombre del archivo.
  function detectarIdioma() {
    // Fuente principal: atributo lang del HTML
    var lang = document.documentElement.lang;
    if (lang === 'en') return 'en';
    if (lang === 'fr') return 'fr';
    if (lang === 'es') return 'es';
    // Fallback: nombre del archivo
    if (archivoActual.indexOf('-en') !== -1 || archivoActual === 'en.html') return 'en';
    if (archivoActual.indexOf('-fr') !== -1 || archivoActual === 'fr.html') return 'fr';
    return 'es';
  }

  // Detectar página actual buscando el archivo en la configuración.
  function detectarPagina() {
    for (var id in PAGINAS) {
      var archivos = PAGINAS[id].archivos;
      for (var lang in archivos) {
        if (archivoActual === archivos[lang]) return id;
      }
    }
    return 'overview';
  }

  var idiomaActual = detectarIdioma();
  var paginaActual = detectarPagina();

  // ============================================================
  // TEMA (CLARO / OSCURO)
  // Persiste en localStorage con la clave 'arclycee_doc_theme'.
  // ============================================================
  function obtenerTema() {
    return localStorage.getItem('arclycee_doc_theme') || 'dark';
  }

  function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem('arclycee_doc_theme', tema);
    // Actualizar el icono del boton
    var btn = document.getElementById('doc-theme-toggle');
    if (btn) btn.textContent = tema === 'dark' ? '☀️' : '🌙';
  }

  // Aplicar tema guardado al cargar
  aplicarTema(obtenerTema());

  // Aplicar estilo guardado (styles.css o styles2.css)
  (function() {
    var estilo = localStorage.getItem('arclycee_doc_style') || '1';
    if (estilo === '2') {
      var links = document.querySelectorAll('link[rel="stylesheet"]');
      for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute('href') === 'styles.css') {
          links[i].setAttribute('href', 'styles2.css');
          break;
        }
      }
    }
  })();

  // ============================================================
  // GENERAR HTML DE LA NAVEGACIÓN
  // ============================================================
  function crearNavegacion() {
    var nav = document.createElement('nav');
    nav.className = 'doc-nav';
    nav.setAttribute('aria-label', 'Documentation navigation');

    var html = '<div class="doc-nav-inner">';

    // Logo pequeño a la izquierda
    // Logo enlaza a la landing page del idioma actual (raíz del sitio)
    var landingPages = { es: '../index.html', en: '../index-en.html', fr: '../index-fr.html' };
    html += '<a href="' + (landingPages[idiomaActual] || '../index.html') + '" class="doc-nav-logo">'
          + '<img src="../resources/arclycee-logo-rectangular.png" alt="ArcLycée" height="28">'
          + '</a>';

    // Botón hamburguesa para móvil — 3 barras que se convierten en X al abrir
    html += '<button class="doc-nav-hamburger" id="doc-hamburger" aria-label="Menu" aria-expanded="false">'
          + '<span></span><span></span><span></span></button>';

    // Pills de secciones — con soporte para grupos/dropdowns
    html += '<div class="doc-nav-pills" id="doc-nav-pills">';
    for (var id in PAGINAS) {
      var config = PAGINAS[id];
      // Saltar items que son hijos de un grupo (se renderizan dentro del grupo)
      if (config.parent) continue;

      if (config.grupo && config.children) {
        // Grupo con dropdown
        var grupoActivo = config.children.indexOf(paginaActual) >= 0;
        html += '<div class="doc-nav-dropdown' + (grupoActivo ? ' active' : '') + '">';
        html += '<span class="doc-nav-pill doc-nav-dropdown-toggle' + (grupoActivo ? ' active' : '') + '">'
              + '<span>' + config.icono + '</span> ' + config.label[idiomaActual] + ' ▾</span>';
        html += '<div class="doc-nav-dropdown-menu">';
        for (var c = 0; c < config.children.length; c++) {
          var childId = config.children[c];
          var child = PAGINAS[childId];
          if (!child) continue;
          var childActivo = childId === paginaActual;
          var childHref = child.archivos[idiomaActual] + (child.hash ? '#' + child.hash : '');
          html += '<a href="' + childHref + '" class="doc-nav-dropdown-item' + (childActivo ? ' active' : '') + '">'
                + '<span>' + child.icono + '</span> ' + child.label[idiomaActual] + '</a>';
        }
        html += '</div></div>';
      } else {
        // Item normal
        var esActiva = id === paginaActual;
        var href = config.archivos[idiomaActual];
        var label = config.label[idiomaActual];
        html += '<a href="' + href + '" class="doc-nav-pill' + (esActiva ? ' active' : '') + '">'
              + '<span>' + config.icono + '</span> ' + label + '</a>';
      }
    }
    html += '</div>';

    // Controles: idioma + tema
    html += '<div class="doc-nav-controls">';

    // Selector de idioma — enlaza a la misma página en otro idioma
    html += '<div class="doc-nav-lang">';
    var pagConfig = PAGINAS[paginaActual];
    var idiomas = [['es', 'ES'], ['en', 'EN'], ['fr', 'FR']];
    for (var i = 0; i < idiomas.length; i++) {
      var lang = idiomas[i][0];
      var langLabel = idiomas[i][1];
      var langHref = pagConfig.archivos[lang];
      var activo = lang === idiomaActual;
      html += '<a href="' + langHref + '" class="' + (activo ? 'active' : '') + '">' + langLabel + '</a>';
    }
    html += '</div>';

    // Boton de tema
    var temaIcono = obtenerTema() === 'dark' ? '☀️' : '🌙';
    html += '<button id="doc-theme-toggle" class="doc-nav-theme" '
          + 'title="Toggle theme" aria-label="Toggle theme">' + temaIcono + '</button>';

    // Boton de estilo (alterna entre styles.css y styles2.css)
    var estiloActual = localStorage.getItem('arclycee_doc_style') || '1';
    html += '<button id="doc-style-toggle" class="doc-nav-theme" '
          + 'title="Switch design style" aria-label="Switch design style">'
          + (estiloActual === '1' ? '◆' : '◇') + '</button>';

    html += '</div>'; // doc-nav-controls
    html += '</div>'; // doc-nav-inner

    nav.innerHTML = html;
    return nav;
  }

  // ============================================================
  // INSERTAR NAVEGACIÓN EN EL DOM
  // Se inserta al inicio del body, antes de cualquier contenido.
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    var nav = crearNavegacion();
    document.body.insertBefore(nav, document.body.firstChild);

    // Evento del boton de tema
    document.getElementById('doc-theme-toggle').addEventListener('click', function () {
      var nuevoTema = obtenerTema() === 'dark' ? 'light' : 'dark';
      aplicarTema(nuevoTema);
    });

    // Evento del boton de estilo (alterna styles.css ↔ styles2.css)
    document.getElementById('doc-style-toggle').addEventListener('click', function () {
      var estiloActual = localStorage.getItem('arclycee_doc_style') || '1';
      var nuevoEstilo = estiloActual === '1' ? '2' : '1';
      localStorage.setItem('arclycee_doc_style', nuevoEstilo);
      // Buscar el stylesheet link y cambiar el href
      var links = document.querySelectorAll('link[rel="stylesheet"]');
      for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href');
        if (href === 'styles.css' || href === 'styles2.css') {
          links[i].setAttribute('href', nuevoEstilo === '1' ? 'styles.css' : 'styles2.css');
          break;
        }
      }
      this.textContent = nuevoEstilo === '1' ? '◆' : '◇';
    });

    // Hamburguesa para móvil — abre/cierra el menú de pills
    var hamburger = document.getElementById('doc-hamburger');
    var pills = document.getElementById('doc-nav-pills');
    if (hamburger && pills) {
      hamburger.addEventListener('click', function () {
        var abierto = pills.classList.toggle('mobile-open');
        hamburger.classList.toggle('open', abierto);
        hamburger.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      });
      // Cerrar menú al hacer clic en un enlace (navegación inmediata)
      pills.addEventListener('click', function (e) {
        if (e.target.closest('a')) {
          pills.classList.remove('mobile-open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
      // En móvil, los dropdowns se abren con tap (no hover)
      var dropdowns = pills.querySelectorAll('.doc-nav-dropdown-toggle');
      for (var d = 0; d < dropdowns.length; d++) {
        dropdowns[d].addEventListener('click', function (e) {
          // Solo en móvil (cuando la hamburguesa es visible)
          if (window.innerWidth > 768) return;
          e.stopPropagation();
          var parent = this.parentElement;
          // Cerrar otros dropdowns abiertos
          var todos = pills.querySelectorAll('.doc-nav-dropdown.mobile-dropdown-open');
          for (var t = 0; t < todos.length; t++) {
            if (todos[t] !== parent) todos[t].classList.remove('mobile-dropdown-open');
          }
          parent.classList.toggle('mobile-dropdown-open');
        });
      }
    }

    // ============================================================
    // FOOTER COMPARTIDO — generado dinámicamente para no hardcodear
    // la versión ni el contenido en cada página HTML.
    // ============================================================
    var VERSION = 'v0.23.0';
    var FOOTER_TEXT = {
      es: {
        tagline: 'Aventura Arqueológica Dominicana',
        school: 'Liceo Francés de Santo Domingo — Clase de Robótica 2026',
        play: 'Jugar ArcLycée',
        feedback: 'Contáctanos'
      },
      en: {
        tagline: 'Dominican Archaeological Adventure',
        school: 'Liceo Francés de Santo Domingo — Robotics Class 2026',
        play: 'Play ArcLycée',
        feedback: 'Contact Us'
      },
      fr: {
        tagline: 'Aventure Archéologique Dominicaine',
        school: 'Lycée Français de Saint-Domingue — Cours de Robotique 2026',
        play: 'Jouer à ArcLycée',
        feedback: 'Contactez-nous'
      }
    };
    var ft = FOOTER_TEXT[idiomaActual] || FOOTER_TEXT.es;

    // Buscar placeholder o footer existente
    var footerEl = document.getElementById('doc-footer') || document.querySelector('footer');
    if (!footerEl) {
      footerEl = document.createElement('footer');
      document.body.appendChild(footerEl);
    }
    if (footerEl.tagName !== 'FOOTER') {
      // Reemplazar <div id="doc-footer"> con <footer>
      var realFooter = document.createElement('footer');
      footerEl.parentNode.replaceChild(realFooter, footerEl);
      footerEl = realFooter;
    }

    footerEl.innerHTML =
      '<div class="footer-logo"><img src="../resources/arclycee-logo-rectangular.png" alt="ArcLycée" height="48"></div>' +
      '<p>ArcLycée ' + VERSION + ' — ' + ft.tagline + '</p>' +
      '<p class="equipo">' + ft.school + '<br>' +
        '<a href="../juego.html">' + ft.play + '</a> · ' +
        '<a href="https://arclycee-aux.web.app/form.html?lang=' + idiomaActual + '" target="_blank">' + ft.feedback + '</a>' +
      '</p>';
  });
})();
