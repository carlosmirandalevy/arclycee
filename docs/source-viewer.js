/**
 * source-viewer.js — Visor de código fuente para la documentación de ArcLycée
 *
 * Convierte automáticamente las referencias a archivos .js en enlaces clicables.
 * Al hacer click, abre un modal con el código fuente formateado con colores
 * (syntax highlighting básico para JavaScript).
 *
 * Uso: <script src="source-viewer.js"></script> al final del <body>
 */

(function () {
  'use strict';

  // ============================================================
  // SYNTAX HIGHLIGHTING — colores para JavaScript
  // Aplica clases CSS a tokens del código fuente.
  // ============================================================

  /**
   * Resalta sintaxis JavaScript de forma básica usando regex.
   * No es un parser completo, pero cubre: comentarios, strings,
   * palabras clave, números, nombres de funciones y operadores.
   */
  function resaltarSintaxis(codigo) {
    // Escapar HTML primero
    var html = codigo
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Tokenizar con un solo regex para respetar el orden de precedencia.
    // Los comentarios y strings deben procesarse ANTES que keywords/números
    // para evitar colorear contenido dentro de ellos.
    var tokens = [];
    var regex = new RegExp(
      // Grupo 1: comentarios de línea
      '(\\/\\/[^\\n]*)'
      // Grupo 2: comentarios de bloque
      + '|(\\/\\*[\\s\\S]*?\\*\\/)'
      // Grupo 3: template literals
      + '|(`(?:[^`\\\\]|\\\\.)*`)'
      // Grupo 4: strings con comillas dobles
      + '|("(?:[^"\\\\]|\\\\.)*")'
      // Grupo 5: strings con comillas simples
      + "|(\'(?:[^\'\\\\]|\\\\.)*\')"
      // Grupo 6: regex literals (simplificado)
      + '|(\\/(?![\\/*])[^\\/\\n]*\\/[gimsuy]*)'
      // Grupo 7: números (decimales, hex, binarios)
      + '|(\\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|\\d+\\.?\\d*(?:[eE][+-]?\\d+)?)\\b)'
      // Grupo 8: palabras clave
      + '|(\\b(?:const|let|var|function|class|extends|return|if|else|for|while|do|switch|case|break|continue|new|this|super|import|export|from|default|async|await|yield|try|catch|finally|throw|typeof|instanceof|in|of|void|delete|null|undefined|true|false|NaN|Infinity|static|get|set)\\b)'
      // Grupo 9: nombres de métodos/funciones (palabra seguida de paréntesis)
      + '|(\\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\\s*\\())',
      'g'
    );

    var resultado = '';
    var ultimoIndice = 0;
    var match;

    while ((match = regex.exec(html)) !== null) {
      // Texto entre matches (sin colorear)
      resultado += html.substring(ultimoIndice, match.index);
      ultimoIndice = match.index + match[0].length;

      if (match[1] || match[2]) {
        // Comentarios
        resultado += '<span class="sv-comment">' + match[0] + '</span>';
      } else if (match[3] || match[4] || match[5]) {
        // Strings y template literals
        resultado += '<span class="sv-string">' + match[0] + '</span>';
      } else if (match[6]) {
        // Regex
        resultado += '<span class="sv-regex">' + match[0] + '</span>';
      } else if (match[7]) {
        // Números
        resultado += '<span class="sv-number">' + match[0] + '</span>';
      } else if (match[8]) {
        // Palabras clave
        resultado += '<span class="sv-keyword">' + match[0] + '</span>';
      } else if (match[9]) {
        // Funciones/métodos
        resultado += '<span class="sv-function">' + match[0] + '</span>';
      }
    }

    // Texto restante
    resultado += html.substring(ultimoIndice);

    return resultado;
  }

  // ============================================================
  // MODAL — crear y gestionar el overlay del visor
  // ============================================================

  var modal = null;
  var modalContenido = null;
  var modalTitulo = null;
  var modalLineas = null;

  function crearModal() {
    modal = document.createElement('div');
    modal.className = 'sv-modal';
    modal.innerHTML =
      '<div class="sv-modal-inner">'
      + '<div class="sv-modal-header">'
      + '<span class="sv-modal-titulo"></span>'
      + '<div class="sv-modal-controles">'
      + '<span class="sv-modal-lineas"></span>'
      + '<button class="sv-modal-cerrar" title="Cerrar (Esc)">&times;</button>'
      + '</div>'
      + '</div>'
      + '<div class="sv-modal-body">'
      + '<pre class="sv-code"><code></code></pre>'
      + '</div>'
      + '</div>';

    document.body.appendChild(modal);

    modalTitulo = modal.querySelector('.sv-modal-titulo');
    modalContenido = modal.querySelector('.sv-code code');
    modalLineas = modal.querySelector('.sv-modal-lineas');

    // Cerrar al hacer click fuera del contenido
    modal.addEventListener('click', function (e) {
      if (e.target === modal) cerrarModal();
    });

    // Botón de cerrar
    modal.querySelector('.sv-modal-cerrar').addEventListener('click', cerrarModal);

    // Cerrar con Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('sv-visible')) {
        cerrarModal();
      }
    });
  }

  function abrirModal(ruta) {
    if (!modal) crearModal();

    // Mostrar estado de carga
    modalTitulo.textContent = ruta;
    modalLineas.textContent = '';
    modalContenido.innerHTML = '<span class="sv-comment">// Cargando...</span>';
    modal.classList.add('sv-visible');
    document.body.style.overflow = 'hidden';

    // Fetch del archivo fuente
    fetch('../' + ruta)
      .then(function (resp) {
        if (!resp.ok) throw new Error(resp.status + ' ' + resp.statusText);
        return resp.text();
      })
      .then(function (codigo) {
        var lineas = codigo.split('\n').length;
        modalLineas.textContent = lineas + ' líneas';

        // Agregar números de línea y resaltar sintaxis
        var codigoResaltado = resaltarSintaxis(codigo);
        var lineasHtml = codigoResaltado.split('\n');
        var conNumeros = lineasHtml.map(function (linea, i) {
          var num = i + 1;
          return '<span class="sv-line-num">' + num + '</span>' + linea;
        }).join('\n');

        modalContenido.innerHTML = conNumeros;
      })
      .catch(function (err) {
        modalContenido.innerHTML =
          '<span class="sv-comment">// Error al cargar ' + ruta + '</span>\n'
          + '<span class="sv-comment">// ' + err.message + '</span>';
      });
  }

  function cerrarModal() {
    if (modal) {
      modal.classList.remove('sv-visible');
      document.body.style.overflow = '';
    }
  }

  // ============================================================
  // INYECCIÓN DE CSS
  // ============================================================

  function inyectarEstilos() {
    var style = document.createElement('style');
    style.textContent = ''
      // Modal overlay
      + '.sv-modal {'
      + '  position: fixed; top: 0; left: 0; right: 0; bottom: 0;'
      + '  background: rgba(0,0,0,0.85);'
      + '  z-index: 10000;'
      + '  display: none;'
      + '  align-items: center;'
      + '  justify-content: center;'
      + '  padding: 20px;'
      + '}'
      + '.sv-modal.sv-visible {'
      + '  display: flex;'
      + '}'
      // Modal inner container
      + '.sv-modal-inner {'
      + '  background: #0d1117;'
      + '  border: 1px solid #30363d;'
      + '  border-radius: 12px;'
      + '  width: 100%;'
      + '  max-width: 1000px;'
      + '  max-height: 90vh;'
      + '  display: flex;'
      + '  flex-direction: column;'
      + '  overflow: hidden;'
      + '  box-shadow: 0 16px 48px rgba(0,0,0,0.5);'
      + '}'
      // Header
      + '.sv-modal-header {'
      + '  display: flex;'
      + '  align-items: center;'
      + '  justify-content: space-between;'
      + '  padding: 12px 20px;'
      + '  background: #161b22;'
      + '  border-bottom: 1px solid #30363d;'
      + '  flex-shrink: 0;'
      + '}'
      + '.sv-modal-titulo {'
      + '  font-family: monospace;'
      + '  font-size: 0.95rem;'
      + '  color: #58a6ff;'
      + '  font-weight: 600;'
      + '}'
      + '.sv-modal-controles {'
      + '  display: flex;'
      + '  align-items: center;'
      + '  gap: 16px;'
      + '}'
      + '.sv-modal-lineas {'
      + '  font-size: 0.8rem;'
      + '  color: #8b949e;'
      + '}'
      + '.sv-modal-cerrar {'
      + '  background: none;'
      + '  border: 1px solid #30363d;'
      + '  border-radius: 6px;'
      + '  color: #8b949e;'
      + '  font-size: 1.4rem;'
      + '  width: 32px;'
      + '  height: 32px;'
      + '  cursor: pointer;'
      + '  display: flex;'
      + '  align-items: center;'
      + '  justify-content: center;'
      + '  transition: all 0.15s;'
      + '}'
      + '.sv-modal-cerrar:hover {'
      + '  color: #f85149;'
      + '  border-color: #f85149;'
      + '}'
      // Body (scrollable)
      + '.sv-modal-body {'
      + '  overflow: auto;'
      + '  flex: 1;'
      + '}'
      // Code block
      + '.sv-code {'
      + '  margin: 0;'
      + '  padding: 16px 0;'
      + '  background: #0d1117;'
      + '  font-family: "Cascadia Code", "Fira Code", "JetBrains Mono", "SF Mono", Consolas, monospace;'
      + '  font-size: 13px;'
      + '  line-height: 1.6;'
      + '  tab-size: 2;'
      + '  color: #c9d1d9;'
      + '  overflow-x: auto;'
      + '}'
      + '.sv-code code {'
      + '  display: block;'
      + '  padding: 0 20px;'
      + '}'
      // Line numbers
      + '.sv-line-num {'
      + '  display: inline-block;'
      + '  width: 48px;'
      + '  text-align: right;'
      + '  padding-right: 16px;'
      + '  margin-right: 16px;'
      + '  color: #484f58;'
      + '  border-right: 1px solid #21262d;'
      + '  user-select: none;'
      + '  -webkit-user-select: none;'
      + '}'
      // Syntax colors (GitHub Dark theme inspired)
      + '.sv-keyword { color: #ff7b72; }'       // rojo — keywords
      + '.sv-string { color: #a5d6ff; }'        // azul claro — strings
      + '.sv-comment { color: #8b949e; font-style: italic; }' // gris — comments
      + '.sv-number { color: #79c0ff; }'        // azul — numbers
      + '.sv-function { color: #d2a8ff; }'      // púrpura — functions
      + '.sv-regex { color: #7ee787; }'         // verde — regex
      // Source links in docs
      + '.source-link {'
      + '  color: #58a6ff;'
      + '  cursor: pointer;'
      + '  text-decoration: none;'
      + '  border-bottom: 1px dashed rgba(88,166,255,0.4);'
      + '  transition: all 0.15s;'
      + '}'
      + '.source-link:hover {'
      + '  color: #79c0ff;'
      + '  border-bottom-color: #79c0ff;'
      + '}'
      + '[data-theme="light"] .source-link {'
      + '  color: #0969da;'
      + '  border-bottom-color: rgba(9,105,218,0.4);'
      + '}'
      + '[data-theme="light"] .source-link:hover {'
      + '  color: #0550ae;'
      + '  border-bottom-color: #0550ae;'
      + '}'
      // Responsive
      + '@media (max-width: 700px) {'
      + '  .sv-modal { padding: 8px; }'
      + '  .sv-modal-inner { max-height: 95vh; border-radius: 8px; }'
      + '  .sv-code { font-size: 11px; }'
      + '  .sv-line-num { width: 36px; padding-right: 8px; margin-right: 8px; }'
      + '}';

    document.head.appendChild(style);
  }

  // ============================================================
  // AUTO-CONVERSIÓN — buscar <code>js/...</code> y convertir en enlaces
  // ============================================================

  function convertirReferencias() {
    // Buscar todos los elementos <code> que contienen rutas de archivos .js
    var codeElements = document.querySelectorAll('code');

    for (var i = 0; i < codeElements.length; i++) {
      var el = codeElements[i];
      var texto = el.textContent.trim();

      // Solo convertir si es una ruta a un archivo .js del proyecto
      // Patrones: "js/motor/juego.js", "js/mecanicas/combate.js", etc.
      if (/^js\/[\w\-\/]+\.js$/.test(texto)) {
        // Verificar que no esté ya dentro de un enlace
        if (el.parentElement && el.parentElement.tagName === 'A') continue;

        // Crear enlace clicable
        var enlace = document.createElement('a');
        enlace.className = 'source-link';
        enlace.setAttribute('data-src', texto);
        enlace.setAttribute('href', '#');
        enlace.setAttribute('title', 'Ver código fuente');
        enlace.textContent = texto;

        // Reemplazar el <code> con el enlace que contiene el <code>
        var nuevoCode = document.createElement('code');
        nuevoCode.appendChild(enlace);
        el.parentElement.replaceChild(nuevoCode, el);
      }
    }

    // Event delegation para todos los source-links
    document.addEventListener('click', function (e) {
      var enlace = e.target.closest('.source-link');
      if (enlace) {
        e.preventDefault();
        var ruta = enlace.getAttribute('data-src');
        if (ruta) abrirModal(ruta);
      }
    });
  }

  // ============================================================
  // INICIALIZACIÓN
  // ============================================================

  inyectarEstilos();

  document.addEventListener('DOMContentLoaded', function () {
    convertirReferencias();
  });

})();
