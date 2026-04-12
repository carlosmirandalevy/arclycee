// ============================================================
// ENCYCLOPEDIA-NAV.JS — Navegación por tarjetas + búsqueda
// ============================================================
// Inserta tarjetas de navegación rápida al inicio de la enciclopedia
// y un buscador que filtra secciones en tiempo real.
// ============================================================

(function () {
  'use strict';

  var lang = document.documentElement.lang || 'es';

  // --- Secciones con íconos SVG y anclas ---
  var sections = [
    { id: 'personajes', icon: '👤', es: 'Personajes', en: 'Figures', fr: 'Personnages' },
    { id: 'sitios', icon: '🏛️', es: 'Sitios', en: 'Sites', fr: 'Sites' },
    { id: 'legal', icon: '⚖️', es: 'Leyes', en: 'Laws', fr: 'Lois' },
    { id: 'fauna', icon: '🦎', es: 'Fauna', en: 'Fauna', fr: 'Faune' },
    { id: 'cultura-taina', icon: '🏘️', es: 'Taínos', en: 'Taínos', fr: 'Taïnos' },
    { id: 'herencia-africana', icon: '🥁', es: 'África', en: 'Africa', fr: 'Afrique' },
    { id: 'geografia', icon: '🗺️', es: 'Geografía', en: 'Geography', fr: 'Géographie' },
    { id: 'museos', icon: '🏛️', es: 'Museos', en: 'Museums', fr: 'Musées' },
    { id: 'ciencia', icon: '🔬', es: 'Ciencia', en: 'Science', fr: 'Science' }
  ];

  // Fallback IDs for EN/FR pages that use different section ids
  var idAliases = {
    'personajes': ['personajes', 'historical-figures', 'personnages'],
    'sitios': ['sitios', 'archaeological-sites', 'sites-archeologiques'],
    'legal': ['legal', 'legal-framework', 'cadre-juridique'],
    'fauna': ['fauna', 'fauna-ecosystems', 'faune-ecosystemes'],
    'cultura-taina': ['cultura-taina', 'taino-culture', 'culture-taino'],
    'herencia-africana': ['herencia-africana', 'african-heritage', 'heritage-africain'],
    'geografia': ['geografia', 'geography', 'geographie'],
    'museos': ['museos', 'museums', 'musees'],
    'ciencia': ['ciencia', 'scientific-methods', 'methodes-scientifiques']
  };

  var UI = {
    es: { search: 'Buscar en la Arquepedia...', noResults: 'No se encontraron resultados.', title: 'Arquepedia' },
    en: { search: 'Search the Archpedia...', noResults: 'No results found.', title: 'Archpedia' },
    fr: { search: 'Rechercher dans l\'Archepédie...', noResults: 'Aucun résultat trouvé.', title: 'Archepédie' }
  };
  var ui = UI[lang] || UI.es;

  function findSection(baseId) {
    var aliases = idAliases[baseId] || [baseId];
    for (var i = 0; i < aliases.length; i++) {
      var el = document.getElementById(aliases[i]);
      if (el) return el;
    }
    return null;
  }

  function createNavCards() {
    var container = document.createElement('div');
    container.className = 'ency-nav';

    // Search bar with navigation arrows and counter
    var searchBar = document.createElement('div');
    searchBar.className = 'ency-search';
    searchBar.innerHTML = '<span class="ency-search-icon">🔍</span>'
      + '<input type="text" id="ency-search-input" placeholder="' + ui.search + '" autocomplete="off">'
      + '<span class="ency-search-counter" id="ency-search-counter"></span>'
      + '<button class="ency-search-nav" id="ency-search-prev" title="' + (lang === 'fr' ? 'Précédent' : lang === 'en' ? 'Previous' : 'Anterior') + '" disabled>▲</button>'
      + '<button class="ency-search-nav" id="ency-search-next" title="' + (lang === 'fr' ? 'Suivant' : lang === 'en' ? 'Next' : 'Siguiente') + '" disabled>▼</button>';
    container.appendChild(searchBar);

    // Cards grid
    var grid = document.createElement('div');
    grid.className = 'ency-cards';
    for (var i = 0; i < sections.length; i++) {
      var s = sections[i];
      var label = s[lang] || s.es;
      var card = document.createElement('a');
      card.className = 'ency-card';
      card.href = '#' + s.id;
      card.innerHTML = '<span class="ency-card-icon">' + s.icon + '</span><span class="ency-card-label">' + label + '</span>';
      // Click scrolls to the correct section even if ID differs
      (function (baseId) {
        card.addEventListener('click', function (e) {
          var target = findSection(baseId);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      })(s.id);
      grid.appendChild(card);
    }
    container.appendChild(grid);

    // No-results message (hidden)
    var noResults = document.createElement('p');
    noResults.className = 'ency-no-results';
    noResults.id = 'ency-no-results';
    noResults.textContent = ui.noResults;
    noResults.style.display = 'none';
    container.appendChild(noResults);

    return container;
  }

  // --- Búsqueda: muestra/oculta secciones según texto ---
  // Busca en todas las secciones de contenido (no la nav).
  // Normaliza acentos para que "taino" encuentre "taíno".
  // Resalta las coincidencias en amarillo con <mark>.
  function setupSearch() {
    var input = document.getElementById('ency-search-input');
    if (!input) return;

    var noResults = document.getElementById('ency-no-results');

    function normalize(str) {
      return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    // Eliminar todos los <mark> de resaltado previos
    function clearHighlights() {
      var marks = document.querySelectorAll('.contenedor mark.ency-highlight');
      for (var i = 0; i < marks.length; i++) {
        var parent = marks[i].parentNode;
        parent.replaceChild(document.createTextNode(marks[i].textContent), marks[i]);
        parent.normalize(); // fusionar nodos de texto adyacentes
      }
    }

    // Resaltar coincidencias dentro de nodos de texto de un elemento
    function highlightIn(el, query) {
      if (!query) return;
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
      var nodesToProcess = [];
      while (walker.nextNode()) {
        nodesToProcess.push(walker.currentNode);
      }
      for (var i = 0; i < nodesToProcess.length; i++) {
        var node = nodesToProcess[i];
        var normalizedText = normalize(node.textContent);
        var idx = normalizedText.indexOf(query);
        if (idx === -1) continue;

        // Encontrar la posición en el texto original (puede diferir por acentos)
        // Recorremos el texto original mapeando posiciones normalizadas
        var original = node.textContent;
        var origIdx = 0;
        var normCount = 0;
        while (normCount < idx && origIdx < original.length) {
          var char = original[origIdx];
          var normChar = normalize(char);
          normCount += normChar.length;
          origIdx++;
        }
        // Encontrar el fin del match en el texto original
        var matchNormLen = query.length;
        var origEnd = origIdx;
        var matchNorm = 0;
        while (matchNorm < matchNormLen && origEnd < original.length) {
          var char = original[origEnd];
          var normChar = normalize(char);
          matchNorm += normChar.length;
          origEnd++;
        }

        var before = original.substring(0, origIdx);
        var match = original.substring(origIdx, origEnd);
        var after = original.substring(origEnd);

        var mark = document.createElement('mark');
        mark.className = 'ency-highlight';
        mark.textContent = match;

        var parent = node.parentNode;
        var frag = document.createDocumentFragment();
        if (before) frag.appendChild(document.createTextNode(before));
        frag.appendChild(mark);
        if (after) frag.appendChild(document.createTextNode(after));
        parent.replaceChild(frag, node);
      }
    }

    var currentMatch = -1;
    var counter = document.getElementById('ency-search-counter');
    var prevBtn = document.getElementById('ency-search-prev');
    var nextBtn = document.getElementById('ency-search-next');

    function updateCounter() {
      var marks = document.querySelectorAll('.contenedor mark.ency-highlight');
      var total = marks.length;
      if (total === 0) {
        counter.textContent = '';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
      }
      counter.textContent = (currentMatch + 1) + ' / ' + total;
      prevBtn.disabled = total <= 1;
      nextBtn.disabled = total <= 1;
    }

    function scrollToMatch(index) {
      var marks = document.querySelectorAll('.contenedor mark.ency-highlight');
      if (marks.length === 0) return;
      // Quitar resaltado activo del anterior
      var active = document.querySelector('mark.ency-highlight-active');
      if (active) active.classList.remove('ency-highlight-active');
      // Aplicar al nuevo
      currentMatch = ((index % marks.length) + marks.length) % marks.length;
      marks[currentMatch].classList.add('ency-highlight-active');
      marks[currentMatch].scrollIntoView({ behavior: 'smooth', block: 'center' });
      updateCounter();
    }

    input.addEventListener('input', function () {
      clearHighlights();
      currentMatch = -1;

      var allSections = document.querySelectorAll('.contenedor section[id]');
      var query = normalize(this.value.trim());

      if (!query) {
        for (var i = 0; i < allSections.length; i++) allSections[i].style.display = '';
        if (noResults) noResults.style.display = 'none';
        updateCounter();
        return;
      }

      var found = 0;
      for (var i = 0; i < allSections.length; i++) {
        var sec = allSections[i];
        var text = normalize(sec.textContent);
        if (text.indexOf(query) !== -1) {
          sec.style.display = '';
          highlightIn(sec, query);
          found++;
        } else {
          sec.style.display = 'none';
        }
      }
      if (noResults) noResults.style.display = found === 0 ? '' : 'none';

      // Auto-navegar al primer resultado
      var marks = document.querySelectorAll('.contenedor mark.ency-highlight');
      if (marks.length > 0) {
        scrollToMatch(0);
      } else {
        updateCounter();
      }
    });

    // Enter en el input = siguiente resultado
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) {
          scrollToMatch(currentMatch - 1);
        } else {
          scrollToMatch(currentMatch + 1);
        }
      }
    });

    if (prevBtn) prevBtn.addEventListener('click', function () { scrollToMatch(currentMatch - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollToMatch(currentMatch + 1); });
  }

  // --- Inicializar ---
  // El script se carga al final del body, así que el DOM ya está listo.
  // Usamos un check para soportar ambos casos (carga temprana o tardía).
  function init() {
    var contenedor = document.querySelector('.contenedor');
    if (!contenedor) return;

    var nav = createNavCards();
    contenedor.insertBefore(nav, contenedor.firstChild);
    setupSearch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
