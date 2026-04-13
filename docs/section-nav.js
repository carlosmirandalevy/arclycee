// ============================================================
// SECTION-NAV.JS — Auto-generated section navigation cards
// ============================================================
// Scans the page for <h2> headings inside .contenedor, generates
// clickable navigation cards at the top, and includes a search
// bar with highlighting and result navigation. Replaces both the
// old manual TOC approach and encyclopedia-nav.js.
//
// Also replaces emoji icons with Lucide SVG icons globally.
// ============================================================

(function () {
  'use strict';

  // --- Lucide SVG icons (inline, no CDN dependency) ---
  // Thin-stroke archaeological/educational icon set
  var ICONS = {
    // Section icons (mapped from emoji spans)
    'default': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
    'scroll': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/></svg>',
    'users': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'landmark': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>',
    'scale': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>',
    'paw': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></svg>',
    'home': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    'drum': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m2 2 8 8"/><path d="m22 2-8 8"/><ellipse cx="12" cy="9" rx="10" ry="5"/><path d="M2 9v6c0 2.76 4.48 5 10 5s10-2.24 10-5V9"/></svg>',
    'map': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg>',
    'flask': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16.5h10"/></svg>',
    'globe': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
    'handshake': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>',
    'masks': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"/><path d="M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z"/><path d="M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z"/></svg>',
    'wrench': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    'book': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>',
    'brain': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>',
    'languages': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>',
    'link': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    'compass': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    'clipboard': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>',
    'robot': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" x2="8" y1="16" y2="16"/><line x1="16" x2="16" y1="16" y2="16"/></svg>',
    'pen': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>',
    'search': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    'leaf': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
    'swords': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/></svg>',
    'gamepad': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>',
    'anchor': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><circle cx="12" cy="5" r="3"/></svg>',
    'mountain': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>',
    'sunrise': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/></svg>',
    'waves': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>',
    'wheat': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/></svg>',
    'fish': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.46-3.44 6-7 6-3.56 0-7.56-2.54-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5 .23 6.5C5.58 18.03 7 16 7 13.33"/></svg>',
    'skull': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/></svg>',
  };

  // --- Map emoji text to icon keys ---
  var EMOJI_MAP = {
    '📖': 'book', '📜': 'scroll', '👤': 'users', '👥': 'users',
    '🏛️': 'landmark', '🏛': 'landmark', '⚖️': 'scale', '⚖': 'scale',
    '🦎': 'paw', '🏘️': 'home', '🏘': 'home', '🥁': 'drum',
    '🗺️': 'map', '🗺': 'map', '🔬': 'flask', '🌍': 'globe',
    '🤝': 'handshake', '🎭': 'masks', '🔧': 'wrench',
    '🧭': 'compass', '📋': 'clipboard', '🤖': 'robot',
    '📝': 'pen', '📚': 'book', '🌿': 'leaf', '⚔️': 'swords', '⚔': 'swords',
    '🎮': 'gamepad', '🔦': 'flask', '🤿': 'globe',
    '🧑‍🦯': 'users', '🧪': 'flask', '🐊': 'paw',
    '💬': 'scroll', '⚙️': 'wrench', '💻': 'wrench',
    '🔍': 'search', '🧠': 'brain', '🌐': 'languages',
    '📎': 'link',
    '⚓': 'anchor', '⚓️': 'anchor',
    '⛰️': 'mountain', '⛰': 'mountain',
    '🌅': 'sunrise',
    '🌊': 'waves',
    '🌾': 'wheat',
    '🐋': 'fish',
    '👹': 'skull',
    '🕳️': 'compass', '🕳': 'compass',
  };

  var lang = document.documentElement.lang || 'es';
  var UI = {
    es: { search: 'Buscar en esta página...', noResults: 'Sin resultados.', backTop: 'Inicio' },
    en: { search: 'Search this page...', noResults: 'No results.', backTop: 'Top' },
    fr: { search: 'Rechercher dans cette page...', noResults: 'Aucun résultat.', backTop: 'Haut' }
  };
  var ui = UI[lang] || UI.es;

  // --- Replace emoji icons with SVG across the page ---
  function replaceEmojis() {
    // Replace in .icono spans (h2 heading icons)
    var iconSpans = document.querySelectorAll('.icono');
    for (var i = 0; i < iconSpans.length; i++) {
      var span = iconSpans[i];
      var text = span.textContent.trim();
      var iconKey = EMOJI_MAP[text];
      if (iconKey && ICONS[iconKey]) {
        span.innerHTML = ICONS[iconKey];
        span.style.display = 'flex';
        span.style.alignItems = 'center';
        span.style.justifyContent = 'center';
      }
    }
  }

  // --- Get icon SVG for a heading ---
  function getIconForHeading(text) {
    // Try to find an emoji in the heading text
    for (var emoji in EMOJI_MAP) {
      if (text.indexOf(emoji) !== -1) {
        var key = EMOJI_MAP[emoji];
        return ICONS[key] || ICONS['default'];
      }
    }
    // Try to match by keywords
    var lower = text.toLowerCase();
    if (lower.indexOf('histor') !== -1) return ICONS['scroll'];
    if (lower.indexOf('person') !== -1 || lower.indexOf('figure') !== -1) return ICONS['users'];
    if (lower.indexOf('sitio') !== -1 || lower.indexOf('site') !== -1 || lower.indexOf('arqu') !== -1) return ICONS['landmark'];
    if (lower.indexOf('legal') !== -1 || lower.indexOf('loi') !== -1 || lower.indexOf('ley') !== -1) return ICONS['scale'];
    if (lower.indexOf('fauna') !== -1 || lower.indexOf('eco') !== -1 || lower.indexOf('natur') !== -1) return ICONS['paw'];
    if (lower.indexOf('taín') !== -1 || lower.indexOf('taïn') !== -1 || lower.indexOf('cultur') !== -1) return ICONS['home'];
    if (lower.indexOf('afric') !== -1 || lower.indexOf('héritage') !== -1 || lower.indexOf('herencia') !== -1) return ICONS['drum'];
    if (lower.indexOf('geo') !== -1 || lower.indexOf('map') !== -1 || lower.indexOf('carte') !== -1) return ICONS['map'];
    if (lower.indexOf('museo') !== -1 || lower.indexOf('musée') !== -1 || lower.indexOf('museum') !== -1) return ICONS['landmark'];
    if (lower.indexOf('cien') !== -1 || lower.indexOf('scien') !== -1 || lower.indexOf('méthod') !== -1) return ICONS['flask'];
    if (lower.indexOf('equipo') !== -1 || lower.indexOf('team') !== -1 || lower.indexOf('équipe') !== -1) return ICONS['users'];
    if (lower.indexOf('stem') !== -1 || lower.indexOf('robot') !== -1 || lower.indexOf('code') !== -1) return ICONS['wrench'];
    if (lower.indexOf('civic') !== -1 || lower.indexOf('social') !== -1 || lower.indexOf('civis') !== -1) return ICONS['handshake'];
    if (lower.indexOf('idiom') !== -1 || lower.indexOf('langu') !== -1 || lower.indexOf('langue') !== -1) return ICONS['languages'];
    if (lower.indexOf('recurs') !== -1 || lower.indexOf('resourc') !== -1 || lower.indexOf('lien') !== -1) return ICONS['link'];
    if (lower.indexOf('guía') !== -1 || lower.indexOf('guide') !== -1) return ICONS['compass'];
    if (lower.indexOf('combat') !== -1 || lower.indexOf('duel') !== -1) return ICONS['swords'];
    if (lower.indexOf('mini') !== -1 || lower.indexOf('juego') !== -1 || lower.indexOf('game') !== -1 || lower.indexOf('jeu') !== -1) return ICONS['gamepad'];
    if (lower.indexOf('evalua') !== -1 || lower.indexOf('assess') !== -1 || lower.indexOf('quiz') !== -1) return ICONS['clipboard'];
    return ICONS['book'];
  }

  // --- Build section cards + search ---
  function buildNav() {
    var contenedor = document.querySelector('.contenedor');
    if (!contenedor) return;

    var sections = contenedor.querySelectorAll('section[id]');
    if (sections.length < 2) return; // Don't show nav for single-section pages

    var navEl = document.createElement('div');
    navEl.className = 'sec-nav';

    // Search bar
    navEl.innerHTML = '<div class="sec-search" id="sec-search-bar">'
      + '<span class="sec-search-icon">' + ICONS['search'] + '</span>'
      + '<input type="text" id="sec-search-input" placeholder="' + ui.search + '" autocomplete="off">'
      + '<span class="sec-search-counter" id="sec-search-counter"></span>'
      + '<button class="sec-search-nav" id="sec-search-prev" disabled>&#9650;</button>'
      + '<button class="sec-search-nav" id="sec-search-next" disabled>&#9660;</button>'
      + '</div>';

    // Detect narrative pages (many chapters — use dropdown instead of cards)
    var isNarrative = window.location.pathname.indexOf('narrativa') !== -1;

    if (isNarrative) {
      // --- Narrative: search (left) + chapter dropdown (right) inline ---
      navEl.classList.add('sec-nav-narrative');

      var dropLabel = { es: 'Ir al capítulo...', en: 'Jump to chapter...', fr: 'Aller au chapitre...' };
      var wrapper = document.createElement('div');
      wrapper.className = 'sec-chapter-nav';

      var select = document.createElement('select');
      select.className = 'sec-chapter-select';
      select.innerHTML = '<option value="">' + (dropLabel[lang] || dropLabel.es) + '</option>';

      for (var i = 0; i < sections.length; i++) {
        var sec = sections[i];
        var h2 = sec.querySelector('h2');
        if (!h2) continue;
        var text = h2.textContent.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '').replace(/[\n\r]+/g, ' ').trim();
        var opt = document.createElement('option');
        opt.value = sec.id;
        opt.textContent = text;
        select.appendChild(opt);
      }

      select.addEventListener('change', function () {
        if (!this.value) return;
        var target = document.getElementById(this.value);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.value = '';
      });

      wrapper.appendChild(select);
      navEl.appendChild(wrapper);
    } else {
      // --- Cards grid for regular pages ---
      var grid = document.createElement('div');
      grid.className = 'sec-cards';

      for (var i = 0; i < sections.length; i++) {
        var sec = sections[i];
        var h2 = sec.querySelector('h2');
        if (!h2) continue;

        var text = h2.textContent.replace(/[\n\r]+/g, ' ').trim();
        var icon = getIconForHeading(text);
        var label = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '').trim();
        if (label.length > 30) label = label.substring(0, 28) + '…';

        var card = document.createElement('a');
        card.className = 'sec-card';
        card.href = '#' + sec.id;
        card.innerHTML = '<span class="sec-card-icon">' + icon + '</span>'
          + '<span class="sec-card-label">' + label + '</span>';

        card.addEventListener('click', (function(target) {
          return function(e) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          };
        })(sec));

        grid.appendChild(card);
      }

      navEl.appendChild(grid);
    }

    // No-results message
    var noRes = document.createElement('p');
    noRes.className = 'sec-no-results';
    noRes.id = 'sec-no-results';
    noRes.textContent = ui.noResults;
    noRes.style.display = 'none';
    navEl.appendChild(noRes);

    // Placeholder for sticky
    var placeholder = document.createElement('div');
    placeholder.className = 'sec-search-placeholder';
    placeholder.id = 'sec-search-placeholder';
    navEl.insertBefore(placeholder, navEl.firstChild);

    contenedor.insertBefore(navEl, contenedor.firstChild);
  }

  // --- Search with highlighting and navigation ---
  function setupSearch() {
    var input = document.getElementById('sec-search-input');
    if (!input) return;

    var noResults = document.getElementById('sec-no-results');
    var counter = document.getElementById('sec-search-counter');
    var prevBtn = document.getElementById('sec-search-prev');
    var nextBtn = document.getElementById('sec-search-next');
    var searchBar = document.getElementById('sec-search-bar');
    var placeholder = document.getElementById('sec-search-placeholder');
    var currentMatch = -1;

    function normalize(str) {
      return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function clearHighlights() {
      var marks = document.querySelectorAll('.contenedor mark.sec-hl');
      for (var i = 0; i < marks.length; i++) {
        var p = marks[i].parentNode;
        p.replaceChild(document.createTextNode(marks[i].textContent), marks[i]);
        p.normalize();
      }
    }

    function highlightIn(el, query) {
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
      var nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var normText = normalize(node.textContent);
        var idx = normText.indexOf(query);
        if (idx === -1) continue;
        var orig = node.textContent;
        var oi = 0, nc = 0;
        while (nc < idx && oi < orig.length) { nc += normalize(orig[oi]).length; oi++; }
        var oe = oi, mc = 0;
        while (mc < query.length && oe < orig.length) { mc += normalize(orig[oe]).length; oe++; }
        var mark = document.createElement('mark');
        mark.className = 'sec-hl';
        mark.textContent = orig.substring(oi, oe);
        var frag = document.createDocumentFragment();
        if (oi > 0) frag.appendChild(document.createTextNode(orig.substring(0, oi)));
        frag.appendChild(mark);
        if (oe < orig.length) frag.appendChild(document.createTextNode(orig.substring(oe)));
        node.parentNode.replaceChild(frag, node);
      }
    }

    function updateCounter() {
      var marks = document.querySelectorAll('.contenedor mark.sec-hl');
      if (marks.length === 0) { counter.textContent = ''; prevBtn.disabled = true; nextBtn.disabled = true; return; }
      counter.textContent = (currentMatch + 1) + ' / ' + marks.length;
      prevBtn.disabled = marks.length <= 1;
      nextBtn.disabled = marks.length <= 1;
    }

    function scrollToMatch(index) {
      var marks = document.querySelectorAll('.contenedor mark.sec-hl');
      if (marks.length === 0) return;
      var active = document.querySelector('mark.sec-hl-active');
      if (active) active.classList.remove('sec-hl-active');
      currentMatch = ((index % marks.length) + marks.length) % marks.length;
      marks[currentMatch].classList.add('sec-hl-active');
      marks[currentMatch].scrollIntoView({ behavior: 'smooth', block: 'center' });
      updateCounter();
    }

    function updateSticky() {
      if (!searchBar || !placeholder) return;
      var hasQuery = input.value.trim().length > 0;
      if (!hasQuery) { searchBar.classList.remove('sticky'); placeholder.classList.remove('visible'); placeholder.style.height = ''; return; }
      var rect = placeholder.getBoundingClientRect();
      if (rect.top < 0) {
        if (!searchBar.classList.contains('sticky')) {
          placeholder.style.height = searchBar.offsetHeight + 'px';
          placeholder.classList.add('visible');
          searchBar.classList.add('sticky');
        }
      } else {
        searchBar.classList.remove('sticky');
        placeholder.classList.remove('visible');
        placeholder.style.height = '';
      }
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
        requestAnimationFrame(updateSticky);
        return;
      }
      var found = 0;
      for (var i = 0; i < allSections.length; i++) {
        var sec = allSections[i];
        if (normalize(sec.textContent).indexOf(query) !== -1) {
          sec.style.display = '';
          highlightIn(sec, query);
          found++;
        } else {
          sec.style.display = 'none';
        }
      }
      if (noResults) noResults.style.display = found === 0 ? '' : 'none';
      var marks = document.querySelectorAll('.contenedor mark.sec-hl');
      if (marks.length > 0) scrollToMatch(0); else updateCounter();
      requestAnimationFrame(updateSticky);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); scrollToMatch(e.shiftKey ? currentMatch - 1 : currentMatch + 1); }
    });

    if (prevBtn) prevBtn.addEventListener('click', function () { scrollToMatch(currentMatch - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollToMatch(currentMatch + 1); });
    if (searchBar && placeholder) {
      window.addEventListener('scroll', updateSticky, { passive: true });
      input.addEventListener('input', function () { requestAnimationFrame(updateSticky); });
    }
  }

  // --- Init ---
  function init() {
    replaceEmojis();
    buildNav();
    setupSearch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
