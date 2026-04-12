// ============================================================
// ASSESSMENT.JS — Motor de quizzes para evaluación pedagógica
// ============================================================
// Presenta 20 preguntas aleatorias de un banco de 100 por tema.
// Tipos: verdadero/falso, opción múltiple, completar, emparejar.
// Feedback inmediato + comentarios motivacionales cada 4 preguntas.
// ============================================================

(function () {
  'use strict';

  // --- Detectar idioma desde el HTML ---
  var lang = document.documentElement.lang || 'es';
  if (lang !== 'es' && lang !== 'en' && lang !== 'fr') lang = 'es';

  // --- Textos de UI ---
  var UI = {
    es: {
      title: 'Evaluación',
      subtitle: 'Pon a prueba lo que aprendiste en ArcLycée. Cada quiz presenta 20 preguntas aleatorias.',
      start: 'Comenzar',
      next: 'Siguiente',
      finish: 'Ver resultados',
      back: 'Volver a los quizzes',
      of: 'de',
      correct: '¡Correcto!',
      incorrect: '¡Incorrecto!',
      score: 'Puntuación',
      submit: 'Responder',
      selectAll: 'Selecciona todas las parejas',
      fillPlaceholder: 'Escribe tu respuesta...',
      true: 'Verdadero',
      false: 'Falso',
      quizNames: {
        history: '📜 Historia',
        geography: '🗺️ Geografía',
        sciences: '🔬 Ciencias Naturales',
        social: '🤝 Habilidades Sociales',
        cultural: '🎭 Conciencia Cultural',
        stem: '🔧 STEM'
      },
      quizDescs: {
        history: 'Taínos, cimarrones, colonia y patrimonio arqueológico',
        geography: 'La Hispaniola, ecosistemas y ubicaciones reales',
        sciences: 'Fauna, flora, ecosistemas y conservación',
        social: 'Resolución pacífica, activismo y ciudadanía',
        cultural: 'Identidad triétnica, diversidad y patrimonio',
        stem: 'Robótica, datación C-14, programación y diseño'
      },
      encourageGood: [
        '¡Vas volando! Sigue así, crack.',
        'A este ritmo vas a sacar un S-Rank como en el areíto.',
        '¡Tremendo! Enriquillo estaría orgulloso.',
        '¡Imparable! Como Luffy después de un banquete.',
        '¡Dale que va! Dominas esto.'
      ],
      encourageStruggle: [
        '¡Tranqui! Hasta los héroes fallan antes de subir de nivel.',
        'Cada error es XP para la próxima ronda. ¡Tú puedes!',
        'Ni Luffy ganó su primera pelea. ¡Sigue intentando!',
        'Lo importante es seguir adelante. ¡Ánimo, crack!',
        'Los errores son power-ups disfrazados. ¡No pares!'
      ],
      encourageNearEnd: [
        '¡Ya casi llegas al final! Sprint final, crack.',
        '¡Última recta! Como el episodio final de temporada.',
        '¡Quedan pocas! Termina fuerte como un boss fight.'
      ],
      finalFeedback: function(score, total) {
        var pct = score / total;
        if (pct >= 0.9) return '¡LEGENDARIO! ' + score + '/' + total + ' — Eres como un behique del conocimiento. ¡Nivel S!';
        if (pct >= 0.7) return '¡Genial! ' + score + '/' + total + ' — Sabes más que la mayoría. Un par más de aventuras y llegas al nivel máximo.';
        if (pct >= 0.5) return '¡Buen intento! ' + score + '/' + total + ' — Vas por buen camino. Vuelve a explorar los mundos y regresa más fuerte.';
        return '¡No te rindas! ' + score + '/' + total + ' — Cada error es un power-up para la próxima vez. ¡Vuelve a jugar y aprende más!';
      }
    },
    en: {
      title: 'Assessment',
      subtitle: 'Test what you learned in ArcLycée. Each quiz presents 20 random questions.',
      start: 'Start',
      next: 'Next',
      finish: 'See results',
      back: 'Back to quizzes',
      of: 'of',
      correct: 'Correct!',
      incorrect: 'Incorrect!',
      score: 'Score',
      submit: 'Submit',
      selectAll: 'Match all pairs',
      fillPlaceholder: 'Type your answer...',
      true: 'True',
      false: 'False',
      quizNames: {
        history: '📜 History',
        geography: '🗺️ Geography',
        sciences: '🔬 Natural Sciences',
        social: '🤝 Social Skills',
        cultural: '🎭 Cultural Awareness',
        stem: '🔧 STEM'
      },
      quizDescs: {
        history: 'Taínos, maroons, colonial era and archaeological heritage',
        geography: 'Hispaniola, ecosystems and real-world locations',
        sciences: 'Fauna, flora, ecosystems and conservation',
        social: 'Peaceful resolution, activism and citizenship',
        cultural: 'Tri-ethnic identity, diversity and heritage',
        stem: 'Robotics, C-14 dating, programming and design'
      },
      encourageGood: [
        'You\'re on fire! Keep going, champ.',
        'At this rate you\'ll get an S-Rank like in the areíto.',
        'Awesome! Enriquillo would be proud.',
        'Unstoppable! Like Luffy after a feast.',
        'You\'re crushing it! Keep that streak going.'
      ],
      encourageStruggle: [
        'No worries! Even heroes fail before they level up.',
        'Every mistake is XP for the next round. You got this!',
        'Luffy didn\'t win his first fight either. Keep going!',
        'What matters is pushing forward. Hang in there, champ!',
        'Mistakes are power-ups in disguise. Don\'t stop!'
      ],
      encourageNearEnd: [
        'Almost there! Final sprint, champ.',
        'Last stretch! Like a season finale episode.',
        'Just a few left! Finish strong like a boss fight.'
      ],
      finalFeedback: function(score, total) {
        var pct = score / total;
        if (pct >= 0.9) return 'LEGENDARY! ' + score + '/' + total + ' — You\'re basically a behique of knowledge. S-Rank unlocked!';
        if (pct >= 0.7) return 'Great job! ' + score + '/' + total + ' — You know more than most. A few more adventures and you\'ll max out.';
        if (pct >= 0.5) return 'Nice try! ' + score + '/' + total + ' — You\'re on the right track. Explore the worlds again and come back stronger.';
        return 'Don\'t give up! ' + score + '/' + total + ' — Every mistake is a power-up for next time. Play again and learn more!';
      }
    },
    fr: {
      title: 'Évaluation',
      subtitle: 'Teste ce que tu as appris dans ArcLycée. Chaque quiz présente 20 questions aléatoires.',
      start: 'Commencer',
      next: 'Suivant',
      finish: 'Voir les résultats',
      back: 'Retour aux quiz',
      of: 'sur',
      correct: 'Correct !',
      incorrect: 'Incorrect !',
      score: 'Score',
      submit: 'Répondre',
      selectAll: 'Associe toutes les paires',
      fillPlaceholder: 'Écris ta réponse...',
      true: 'Vrai',
      false: 'Faux',
      quizNames: {
        history: '📜 Histoire',
        geography: '🗺️ Géographie',
        sciences: '🔬 Sciences Naturelles',
        social: '🤝 Compétences Sociales',
        cultural: '🎭 Conscience Culturelle',
        stem: '🔧 STEM'
      },
      quizDescs: {
        history: 'Taïnos, marrons, ère coloniale et patrimoine archéologique',
        geography: 'Hispaniola, écosystèmes et lieux réels',
        sciences: 'Faune, flore, écosystèmes et conservation',
        social: 'Résolution pacifique, activisme et citoyenneté',
        cultural: 'Identité tri-ethnique, diversité et patrimoine',
        stem: 'Robotique, datation C-14, programmation et conception'
      },
      encourageGood: [
        'Tu gères ! Continue comme ça, champion.',
        'À ce rythme tu vas avoir un S-Rank comme dans l\'areíto.',
        'Incroyable ! Enriquillo serait fier.',
        'Inarrêtable ! Comme Luffy après un festin.',
        'Tu assures ! Continue sur cette lancée.'
      ],
      encourageStruggle: [
        'T\'inquiète ! Même les héros échouent avant de monter de niveau.',
        'Chaque erreur c\'est de l\'XP pour le prochain tour. Tu peux le faire !',
        'Luffy n\'a pas gagné son premier combat non plus. Continue !',
        'L\'important c\'est d\'avancer. Courage, champion !',
        'Les erreurs sont des power-ups déguisés. N\'arrête pas !'
      ],
      encourageNearEnd: [
        'Presque fini ! Sprint final, champion.',
        'Dernière ligne droite ! Comme un épisode final de saison.',
        'Plus que quelques-unes ! Termine en force comme un boss fight.'
      ],
      finalFeedback: function(score, total) {
        var pct = score / total;
        if (pct >= 0.9) return 'LÉGENDAIRE ! ' + score + '/' + total + ' — Tu es un vrai behique du savoir. Rang S débloqué !';
        if (pct >= 0.7) return 'Super ! ' + score + '/' + total + ' — Tu en sais plus que la plupart. Encore quelques aventures et tu atteins le max.';
        if (pct >= 0.5) return 'Bon essai ! ' + score + '/' + total + ' — Tu es sur la bonne voie. Réexplore les mondes et reviens plus fort.';
        return 'N\'abandonne pas ! ' + score + '/' + total + ' — Chaque erreur est un power-up pour la prochaine fois. Rejoue et apprends !';
      }
    }
  };

  var ui = UI[lang];
  var QUESTIONS_PER_QUIZ = 20;
  var ENCOURAGE_EVERY = 4;

  // --- Estado del quiz activo ---
  var currentQuiz = null;
  var questions = [];
  var currentIndex = 0;
  var score = 0;
  var answered = false;
  var scoreAtLastEncourage = 0;

  // --- Utilidades ---
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function el(id) { return document.getElementById(id); }

  // --- Renderizar tarjetas de quizzes ---
  function renderCards() {
    var container = el('quiz-cards');
    if (!container) return;
    var quizIds = ['history', 'geography', 'sciences', 'social', 'cultural', 'stem'];
    var colors = ['#DAA520', '#2E8B57', '#4488cc', '#cc6644', '#9944aa', '#4488ff'];
    var html = '';
    for (var i = 0; i < quizIds.length; i++) {
      var qid = quizIds[i];
      var bank = window.ARC_QUESTIONS && window.ARC_QUESTIONS[qid];
      var count = bank ? bank.length : 0;
      html += '<div class="quiz-card" data-quiz="' + qid + '" style="border-color:' + colors[i] + '">'
            + '<div class="quiz-card-icon" style="color:' + colors[i] + '">' + ui.quizNames[qid].split(' ')[0] + '</div>'
            + '<h3>' + ui.quizNames[qid] + '</h3>'
            + '<p>' + ui.quizDescs[qid] + '</p>'
            + '<p class="quiz-card-count">' + count + ' ' + (lang === 'fr' ? 'questions' : lang === 'en' ? 'questions' : 'preguntas') + '</p>'
            + '<button class="quiz-start-btn" style="background:' + colors[i] + '">' + ui.start + '</button>'
            + '</div>';
    }
    container.innerHTML = html;

    // Event listeners
    var btns = container.querySelectorAll('.quiz-start-btn');
    for (var b = 0; b < btns.length; b++) {
      btns[b].addEventListener('click', function () {
        var qid = this.closest('.quiz-card').getAttribute('data-quiz');
        startQuiz(qid);
      });
    }
  }

  // --- Iniciar quiz ---
  function startQuiz(quizId) {
    var bank = window.ARC_QUESTIONS && window.ARC_QUESTIONS[quizId];
    if (!bank || bank.length === 0) return;
    currentQuiz = quizId;
    questions = shuffle(bank).slice(0, QUESTIONS_PER_QUIZ);
    currentIndex = 0;
    score = 0;
    scoreAtLastEncourage = 0;
    el('quiz-cards-section').style.display = 'none';
    el('quiz-play-section').style.display = 'block';
    renderQuestion();
  }

  // --- Renderizar pregunta actual ---
  function renderQuestion() {
    var q = questions[currentIndex];
    var ql = q.lang[lang] || q.lang.es;
    var area = el('quiz-question-area');
    var progress = el('quiz-progress');
    progress.textContent = (currentIndex + 1) + ' ' + ui.of + ' ' + questions.length;

    answered = false;
    var html = '<div class="quiz-question">';
    html += '<p class="quiz-q-text">' + ql.q + '</p>';

    if (q.type === 'tf') {
      html += '<div class="quiz-options">'
            + '<button class="quiz-option" data-val="true">' + ui.true + '</button>'
            + '<button class="quiz-option" data-val="false">' + ui.false + '</button>'
            + '</div>';
    } else if (q.type === 'mcq') {
      html += '<div class="quiz-options">';
      for (var i = 0; i < ql.options.length; i++) {
        html += '<button class="quiz-option" data-val="' + i + '">' + ql.options[i] + '</button>';
      }
      html += '</div>';
    } else if (q.type === 'fill') {
      html += '<div class="quiz-fill">'
            + '<input type="text" class="quiz-fill-input" id="quiz-fill-input" placeholder="' + ui.fillPlaceholder + '" autocomplete="off">'
            + '<button class="quiz-submit-btn" id="quiz-fill-submit">' + ui.submit + '</button>'
            + '</div>';
    } else if (q.type === 'match') {
      html += '<div class="quiz-match">';
      html += '<p class="quiz-match-hint">' + ui.selectAll + '</p>';
      var left = ql.pairs.map(function (p, i) { return { text: p[0], idx: i }; });
      var right = shuffle(ql.pairs.map(function (p, i) { return { text: p[1], idx: i }; }));
      html += '<div class="quiz-match-cols">';
      html += '<div class="quiz-match-col">';
      for (var l = 0; l < left.length; l++) {
        html += '<div class="quiz-match-item quiz-match-left" data-idx="' + left[l].idx + '">' + left[l].text + '</div>';
      }
      html += '</div>';
      html += '<div class="quiz-match-col">';
      for (var r = 0; r < right.length; r++) {
        html += '<div class="quiz-match-item quiz-match-right" data-idx="' + right[r].idx + '">' + right[r].text + '</div>';
      }
      html += '</div>';
      html += '</div>';
      html += '<button class="quiz-submit-btn" id="quiz-match-submit" disabled>' + ui.submit + '</button>';
      html += '</div>';
    }

    html += '<div class="quiz-feedback" id="quiz-feedback" style="display:none"></div>';
    html += '</div>';
    area.innerHTML = html;

    // Botón siguiente (oculto hasta responder)
    el('quiz-next-btn').style.display = 'none';

    // Bind events según tipo
    if (q.type === 'tf' || q.type === 'mcq') {
      var opts = area.querySelectorAll('.quiz-option');
      for (var o = 0; o < opts.length; o++) {
        opts[o].addEventListener('click', function () {
          if (answered) return;
          handleAnswer(this.getAttribute('data-val'));
        });
      }
    } else if (q.type === 'fill') {
      el('quiz-fill-submit').addEventListener('click', function () {
        if (answered) return;
        handleAnswer(el('quiz-fill-input').value.trim());
      });
      el('quiz-fill-input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !answered) handleAnswer(this.value.trim());
      });
    } else if (q.type === 'match') {
      setupMatch();
    }
  }

  // --- Match: lógica de selección ---
  var matchSelLeft = null;
  var matchPairs = {};
  var matchTotal = 0;

  function setupMatch() {
    matchSelLeft = null;
    matchPairs = {};
    matchTotal = questions[currentIndex].lang[lang].pairs.length;
    var lefts = document.querySelectorAll('.quiz-match-left');
    var rights = document.querySelectorAll('.quiz-match-right');
    var colors = ['#DAA520', '#4488cc', '#cc6644', '#2E8B57', '#9944aa', '#ff6688'];

    // Función auxiliar para deshacer una pareja existente
    function unmatchPair(leftIdx) {
      var oldRightIdx = matchPairs[leftIdx];
      delete matchPairs[leftIdx];
      // Limpiar estilos del lado izquierdo
      var leftEl = document.querySelector('.quiz-match-left[data-idx="' + leftIdx + '"]');
      if (leftEl) {
        leftEl.classList.remove('matched');
        leftEl.style.borderColor = '';
        leftEl.style.background = '';
      }
      // Limpiar estilos del lado derecho
      if (oldRightIdx !== undefined) {
        var rightEl = document.querySelector('.quiz-match-right[data-idx="' + oldRightIdx + '"]');
        if (rightEl) {
          rightEl.classList.remove('matched');
          rightEl.style.borderColor = '';
          rightEl.style.background = '';
        }
      }
      el('quiz-match-submit').disabled = true;
    }

    for (var i = 0; i < lefts.length; i++) {
      lefts[i].addEventListener('click', function () {
        if (answered) return;
        var idx = this.getAttribute('data-idx');
        // Si ya estaba emparejado, deshacemos la pareja para reasignar
        if (this.classList.contains('matched')) {
          unmatchPair(idx);
        }
        document.querySelectorAll('.quiz-match-left').forEach(function (el) { el.classList.remove('selected'); });
        this.classList.add('selected');
        matchSelLeft = idx;
      });
    }
    for (var j = 0; j < rights.length; j++) {
      rights[j].addEventListener('click', function () {
        if (answered || matchSelLeft === null) return;
        var rightIdx = this.getAttribute('data-idx');
        // Si este lado derecho ya está emparejado con OTRO izquierdo, ignorar el clic.
        // El usuario debe deshacer esa otra pareja primero (clic en el izquierdo).
        // Esto evita romper parejas silenciosamente y confundir al usuario.
        if (this.classList.contains('matched')) return;
        var pairColor = colors[Object.keys(matchPairs).length % colors.length];
        matchPairs[matchSelLeft] = rightIdx;
        // Visual feedback
        var leftEl = document.querySelector('.quiz-match-left[data-idx="' + matchSelLeft + '"]');
        leftEl.classList.remove('selected');
        leftEl.classList.add('matched');
        leftEl.style.borderColor = pairColor;
        leftEl.style.background = pairColor + '22';
        this.classList.add('matched');
        this.style.borderColor = pairColor;
        this.style.background = pairColor + '22';
        matchSelLeft = null;
        if (Object.keys(matchPairs).length >= matchTotal) {
          el('quiz-match-submit').disabled = false;
        }
      });
    }
    el('quiz-match-submit').addEventListener('click', function () {
      if (answered) return;
      handleMatchAnswer();
    });
  }

  function handleMatchAnswer() {
    var q = questions[currentIndex];
    var ql = q.lang[lang] || q.lang.es;
    // Comparar por TEXTO de la pareja, no por índice.
    // Esto maneja correctamente parejas con valores duplicados en el
    // lado derecho (ej: "Palenque→Africano" y "Tambor→Africano").
    var correctCount = 0;
    for (var leftIdx in matchPairs) {
      var rightIdx = matchPairs[leftIdx];
      var correctRightText = ql.pairs[parseInt(leftIdx)][1];
      var chosenRightText = ql.pairs[parseInt(rightIdx)][1];
      if (correctRightText === chosenRightText) correctCount++;
    }
    var allCorrect = correctCount === matchTotal;
    if (allCorrect) score++;
    answered = true;
    showFeedback(allCorrect, ql.explanation);
  }

  // --- Procesar respuesta ---
  function handleAnswer(val) {
    var q = questions[currentIndex];
    var ql = q.lang[lang] || q.lang.es;
    var isCorrect = false;

    if (q.type === 'tf') {
      isCorrect = (val === String(ql.answer));
    } else if (q.type === 'mcq') {
      isCorrect = (parseInt(val) === ql.answer);
    } else if (q.type === 'fill') {
      var answers = Array.isArray(ql.answer) ? ql.answer : [ql.answer];
      var normalized = val.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      isCorrect = answers.some(function (a) {
        return a.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === normalized;
      });
    }

    if (isCorrect) score++;
    answered = true;

    // Highlight correct/incorrect options
    if (q.type === 'mcq') {
      var opts = document.querySelectorAll('.quiz-option');
      for (var i = 0; i < opts.length; i++) {
        var optVal = parseInt(opts[i].getAttribute('data-val'));
        if (optVal === ql.answer) opts[i].classList.add('correct');
        else if (optVal === parseInt(val)) opts[i].classList.add('wrong');
        opts[i].style.pointerEvents = 'none';
      }
    } else if (q.type === 'tf') {
      var opts = document.querySelectorAll('.quiz-option');
      for (var i = 0; i < opts.length; i++) {
        if (opts[i].getAttribute('data-val') === String(ql.answer)) opts[i].classList.add('correct');
        else if (opts[i].getAttribute('data-val') === val) opts[i].classList.add('wrong');
        opts[i].style.pointerEvents = 'none';
      }
    }

    showFeedback(isCorrect, ql.explanation);
  }

  // --- Mostrar feedback ---
  function showFeedback(isCorrect, explanation) {
    var fb = el('quiz-feedback');
    fb.style.display = 'block';
    fb.className = 'quiz-feedback ' + (isCorrect ? 'quiz-fb-correct' : 'quiz-fb-wrong');
    var text = isCorrect ? ui.correct : ui.incorrect;
    fb.innerHTML = '<strong>' + text + '</strong> ' + (explanation || '');

    // Mostrar ánimo cada 4 preguntas, adaptado al rendimiento reciente.
    // Si acertó 3+ de las últimas 4 → felicitar. Si no → animar sin elogiar.
    // Después de pregunta 12 se usan mensajes de "casi terminas".
    var num = currentIndex + 1;
    if (num % ENCOURAGE_EVERY === 0 && num < questions.length) {
      var recentCorrect = score - (scoreAtLastEncourage || 0);
      scoreAtLastEncourage = score;
      var pool;
      if (num > 12 && ui.encourageNearEnd) {
        pool = ui.encourageNearEnd;
      } else {
        pool = recentCorrect >= 3 ? ui.encourageGood : ui.encourageStruggle;
      }
      var enc = pool[Math.floor(Math.random() * pool.length)];
      fb.innerHTML += '<div class="quiz-encourage">' + enc + '</div>';
    }

    // Mostrar botón siguiente
    var nextBtn = el('quiz-next-btn');
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent = (currentIndex >= questions.length - 1) ? ui.finish : ui.next;
  }

  // --- Siguiente pregunta o final ---
  function nextQuestion() {
    currentIndex++;
    if (currentIndex >= questions.length) {
      showResults();
    } else {
      renderQuestion();
    }
  }

  // --- Mostrar resultados ---
  function showResults() {
    var area = el('quiz-question-area');
    var feedback = ui.finalFeedback(score, questions.length);
    var pct = Math.round((score / questions.length) * 100);
    var stars = pct >= 90 ? '⭐⭐⭐⭐⭐' : pct >= 70 ? '⭐⭐⭐⭐' : pct >= 50 ? '⭐⭐⭐' : pct >= 30 ? '⭐⭐' : '⭐';

    area.innerHTML = '<div class="quiz-results">'
      + '<div class="quiz-results-stars">' + stars + '</div>'
      + '<div class="quiz-results-score">' + score + ' / ' + questions.length + '</div>'
      + '<div class="quiz-results-pct">' + pct + '%</div>'
      + '<p class="quiz-results-msg">' + feedback + '</p>'
      + '<button class="quiz-back-btn" id="quiz-back-btn">' + ui.back + '</button>'
      + '</div>';

    el('quiz-next-btn').style.display = 'none';
    el('quiz-progress').textContent = ui.score;

    el('quiz-back-btn').addEventListener('click', function () {
      el('quiz-play-section').style.display = 'none';
      el('quiz-cards-section').style.display = 'block';
    });
  }

  // --- Inicializar al cargar ---
  document.addEventListener('DOMContentLoaded', function () {
    renderCards();

    var nextBtn = el('quiz-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (!answered) return;
        nextQuestion();
      });
    }
  });
})();
