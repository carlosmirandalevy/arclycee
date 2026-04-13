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
  // CONFIGURACIÓN DE PÁGINAS POR IDIOMA
  // Cada entrada mapea un id de sección a sus archivos en cada idioma.
  // ============================================================
  const PAGINAS = {
    overview: {
      icono: '📖',
      label: { es: 'Inicio', en: 'Home', fr: 'Accueil' },
      archivos: { es: 'index.html', en: 'en.html', fr: 'fr.html' }
    },
    // --- La Historia (grupo con subitems) ---
    historiaGrupo: {
      icono: '📜',
      label: { es: 'El Juego', en: 'Game Concept', fr: 'Le Jeu' },
      grupo: true,
      children: ['historia', 'worlds', 'characters', 'dialogues', 'archaeology', 'nature']
    },
    historia: {
      icono: '📖',
      label: { es: 'Historia', en: 'Story', fr: 'Histoire' },
      archivos: { es: 'historia.html', en: 'historia-en.html', fr: 'historia-fr.html' },
      parent: 'historiaGrupo'
    },
    worlds: {
      icono: '🌍',
      label: { es: 'Mundos', en: 'Worlds', fr: 'Mondes' },
      archivos: { es: 'worlds.html', en: 'worlds-en.html', fr: 'worlds-fr.html' },
      parent: 'historiaGrupo'
    },
    characters: {
      icono: '👥',
      label: { es: 'Personajes', en: 'Characters', fr: 'Personnages' },
      archivos: { es: 'characters.html', en: 'characters-en.html', fr: 'characters-fr.html' },
      parent: 'historiaGrupo'
    },
    dialogues: {
      icono: '💬',
      label: { es: 'Diálogos', en: 'Dialogues', fr: 'Dialogues' },
      archivos: { es: 'dialogues.html', en: 'dialogues-en.html', fr: 'dialogues-fr.html' },
      parent: 'historiaGrupo'
    },
    // --- Técnico (grupo con subitems) ---
    tecnicoGrupo: {
      icono: '🔧',
      label: { es: 'Técnico', en: 'Technical', fr: 'Technique' },
      grupo: true,
      children: ['mechanics', 'technical']
    },
    mechanics: {
      icono: '⚙️',
      label: { es: 'Mecánicas', en: 'Mechanics', fr: 'Mécaniques' },
      archivos: { es: 'mechanics.html', en: 'mechanics-en.html', fr: 'mechanics-fr.html' },
      parent: 'tecnicoGrupo'
    },
    technical: {
      icono: '💻',
      label: { es: 'Programación', en: 'Programming', fr: 'Programmation' },
      archivos: { es: 'technical.html', en: 'technical-en.html', fr: 'technical-fr.html' },
      parent: 'tecnicoGrupo'
    },
    // --- Pedagogía (grupo con subitems) ---
    pedagogiaGrupo: {
      icono: '🎓',
      label: { es: 'Pedagogía', en: 'Pedagogy', fr: 'Pédagogie' },
      grupo: true,
      children: ['pedagogia', 'pedagogiaAI', 'learningGuide', 'assessment']
    },
    pedagogia: {
      icono: '📚',
      label: { es: 'Educación', en: 'Education', fr: 'Éducation' },
      archivos: { es: 'pedagogy.html', en: 'pedagogy-en.html', fr: 'pedagogy-fr.html' },
      parent: 'pedagogiaGrupo'
    },
    pedagogiaAI: {
      icono: '🤖',
      label: { es: 'Uso de IA', en: 'AI Usage', fr: 'Usage de l\'IA' },
      archivos: { es: 'pedagogy-ai.html', en: 'pedagogy-ai-en.html', fr: 'pedagogy-ai-fr.html' },
      parent: 'pedagogiaGrupo'
    },
    learningGuide: {
      icono: '🧭',
      label: { es: 'Guía de Aprendizaje', en: 'Learning Guide', fr: 'Guide d\'Apprentissage' },
      archivos: { es: 'learning-guide.html', en: 'learning-guide-en.html', fr: 'learning-guide-fr.html' },
      parent: 'pedagogiaGrupo'
    },
    assessment: {
      icono: '📝',
      label: { es: 'Evaluación', en: 'Assessment', fr: 'Évaluation' },
      archivos: { es: 'assessment.html', en: 'assessment-en.html', fr: 'assessment-fr.html' },
      parent: 'pedagogiaGrupo'
    },
    encyclopedia: {
      icono: '📖',
      label: { es: 'Arquepedia', en: 'Archpedia', fr: 'Archepédie' },
      archivos: { es: 'encyclopedia.html', en: 'encyclopedia-en.html', fr: 'encyclopedia-fr.html' }
    },
    archaeology: {
      icono: '🏛️',
      label: { es: 'Arqueología', en: 'Archaeology', fr: 'Archéologie' },
      archivos: { es: 'archaeology.html', en: 'archaeology-en.html', fr: 'archaeology-fr.html' },
      parent: 'historiaGrupo'
    },
    nature: {
      icono: '🌿',
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
    html += '<a href="' + PAGINAS.overview.archivos[idiomaActual] + '" class="doc-nav-logo">'
          + '<img src="../resources/arclycee-logo.png" alt="ArcLycée" height="28">'
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
          html += '<a href="' + child.archivos[idiomaActual] + '" class="doc-nav-dropdown-item' + (childActivo ? ' active' : '') + '">'
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

    // Insertar logo centrado en el footer
    var footer = document.querySelector('footer');
    if (footer) {
      var logoDiv = document.createElement('div');
      logoDiv.className = 'footer-logo';
      logoDiv.innerHTML = '<img src="../resources/arclycee-logo.png" alt="ArcLycée" height="48">';
      footer.insertBefore(logoDiv, footer.firstChild);
    }
  });
})();
