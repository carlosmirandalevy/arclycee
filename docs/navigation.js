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
    worlds: {
      icono: '🌍',
      label: { es: 'Mundos', en: 'Worlds', fr: 'Mondes' },
      archivos: { es: 'worlds.html', en: 'worlds-en.html', fr: 'worlds-fr.html' }
    },
    dialogues: {
      icono: '💬',
      label: { es: 'Diálogos', en: 'Dialogues', fr: 'Dialogues' },
      archivos: { es: 'dialogues.html', en: 'dialogues-en.html', fr: 'dialogues-fr.html' }
    },
    mechanics: {
      icono: '⚙️',
      label: { es: 'Mecánicas', en: 'Mechanics', fr: 'Mécaniques' },
      archivos: { es: 'mechanics.html', en: 'mechanics-en.html', fr: 'mechanics-fr.html' }
    },
    characters: {
      icono: '👥',
      label: { es: 'Personajes', en: 'Characters', fr: 'Personnages' },
      archivos: { es: 'characters.html', en: 'characters-en.html', fr: 'characters-fr.html' }
    },
    technical: {
      icono: '💻',
      label: { es: 'Técnico', en: 'Technical', fr: 'Technique' },
      archivos: { es: 'technical.html', en: 'technical-en.html', fr: 'technical-fr.html' }
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

  // ============================================================
  // GENERAR HTML DE LA NAVEGACIÓN
  // ============================================================
  function crearNavegacion() {
    var nav = document.createElement('nav');
    nav.className = 'doc-nav';
    nav.setAttribute('aria-label', 'Documentation navigation');

    var html = '<div class="doc-nav-inner">';

    // Pills de secciones — cada una enlaza a la versión del idioma actual
    html += '<div class="doc-nav-pills">';
    for (var id in PAGINAS) {
      var config = PAGINAS[id];
      var esActiva = id === paginaActual;
      var href = config.archivos[idiomaActual];
      var label = config.label[idiomaActual];
      html += '<a href="' + href + '" class="doc-nav-pill' + (esActiva ? ' active' : '') + '">'
            + '<span>' + config.icono + '</span> ' + label + '</a>';
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
  });
})();
