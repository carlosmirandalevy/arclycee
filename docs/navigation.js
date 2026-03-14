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
    technical: {
      icono: '💻',
      label: { es: 'Técnico', en: 'Technical', fr: 'Technique' },
      archivos: { es: 'technical.html', en: 'technical-en.html', fr: 'technical-fr.html' }
    }
  };

  // ============================================================
  // DETECCIÓN DEL IDIOMA Y PÁGINA ACTUAL
  // ============================================================
  const archivoActual = window.location.pathname.split('/').pop() || 'index.html';

  // Detectar idioma actual por el nombre del archivo
  function detectarIdioma() {
    if (archivoActual.includes('-en') || archivoActual === 'en.html') return 'en';
    if (archivoActual.includes('-fr') || archivoActual === 'fr.html') return 'fr';
    return 'es';
  }

  // Detectar página actual
  function detectarPagina() {
    for (const [id, config] of Object.entries(PAGINAS)) {
      for (const archivo of Object.values(config.archivos)) {
        if (archivoActual === archivo) return id;
      }
    }
    return 'overview';
  }

  const idiomaActual = detectarIdioma();
  const paginaActual = detectarPagina();

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
    const btn = document.getElementById('doc-theme-toggle');
    if (btn) btn.textContent = tema === 'dark' ? '☀️' : '🌙';
  }

  // Aplicar tema guardado al cargar
  aplicarTema(obtenerTema());

  // ============================================================
  // GENERAR HTML DE LA NAVEGACIÓN
  // ============================================================
  function crearNavegacion() {
    const nav = document.createElement('nav');
    nav.className = 'doc-nav';
    nav.setAttribute('aria-label', 'Documentation navigation');

    let html = '<div class="doc-nav-inner">';

    // Pills de secciones
    html += '<div class="doc-nav-pills">';
    for (const [id, config] of Object.entries(PAGINAS)) {
      const esActiva = id === paginaActual;
      const href = config.archivos[idiomaActual];
      const label = config.label[idiomaActual];
      html += `<a href="${href}" class="doc-nav-pill${esActiva ? ' active' : ''}">`
            + `<span>${config.icono}</span> ${label}</a>`;
    }
    html += '</div>';

    // Controles: idioma + tema
    html += '<div class="doc-nav-controls">';

    // Selector de idioma
    html += '<div class="doc-nav-lang">';
    const pagConfig = PAGINAS[paginaActual];
    for (const [lang, label] of [['es', 'ES'], ['en', 'EN'], ['fr', 'FR']]) {
      const href = pagConfig.archivos[lang];
      const activo = lang === idiomaActual;
      html += `<a href="${href}" class="${activo ? 'active' : ''}">${label}</a>`;
    }
    html += '</div>';

    // Boton de tema
    const temaIcono = obtenerTema() === 'dark' ? '☀️' : '🌙';
    html += `<button id="doc-theme-toggle" class="doc-nav-theme" `
          + `title="Toggle theme" aria-label="Toggle theme">${temaIcono}</button>`;

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
    const nav = crearNavegacion();
    document.body.insertBefore(nav, document.body.firstChild);

    // Evento del boton de tema
    document.getElementById('doc-theme-toggle').addEventListener('click', function () {
      const nuevoTema = obtenerTema() === 'dark' ? 'light' : 'dark';
      aplicarTema(nuevoTema);
    });
  });
})();
