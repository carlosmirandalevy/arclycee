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

    // Search bar
    var searchBar = document.createElement('div');
    searchBar.className = 'ency-search';
    searchBar.innerHTML = '<input type="text" id="ency-search-input" placeholder="' + ui.search + '" autocomplete="off">'
      + '<span class="ency-search-icon">🔍</span>';
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
  function setupSearch() {
    var input = document.getElementById('ency-search-input');
    if (!input) return;

    var noResults = document.getElementById('ency-no-results');

    function normalize(str) {
      return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    input.addEventListener('input', function () {
      // Consultar secciones en cada búsqueda (no cachear, por si el DOM cambió)
      var allSections = document.querySelectorAll('.contenedor section[id]');
      var query = normalize(this.value.trim());

      if (!query) {
        for (var i = 0; i < allSections.length; i++) allSections[i].style.display = '';
        if (noResults) noResults.style.display = 'none';
        return;
      }

      var found = 0;
      for (var i = 0; i < allSections.length; i++) {
        var sec = allSections[i];
        var text = normalize(sec.textContent);
        if (text.indexOf(query) !== -1) {
          sec.style.display = '';
          found++;
        } else {
          sec.style.display = 'none';
        }
      }
      if (noResults) noResults.style.display = found === 0 ? '' : 'none';
    });
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
