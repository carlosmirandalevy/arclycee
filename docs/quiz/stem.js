// stem.js — 100 preguntas trilingües sobre STEM y pensamiento computacional en ArcLycée
// Tipos: "tf" (verdadero/falso), "mcq" (opción múltiple), "fill" (completar), "match" (emparejar)
// 25 preguntas de cada tipo, distribuidas entre los 16 temas STEM del juego
// Tono divertido para pre-adolescentes con referencias a cultura pop

window.ARC_QUESTIONS = window.ARC_QUESTIONS || {};
window.ARC_QUESTIONS.stem = [

  // =====================================================================
  //  TRUE / FALSE  (stm-001 → stm-025)
  // =====================================================================

  {
    id: 'stm-001', type: 'tf',
    lang: {
      es: {
        q: 'Como BMO de Hora de Aventura, ArcLycée corre completamente en un navegador web sin necesidad de instalar nada.',
        answer: true,
        explanation: 'ArcLycée usa HTML5 Canvas + JavaScript vanilla y se ejecuta directamente en el navegador, igual que BMO es una consola portátil todo-en-uno.'
      },
      en: {
        q: 'Like BMO from Adventure Time, ArcLycée runs entirely in a web browser without any installation.',
        answer: true,
        explanation: 'ArcLycée uses HTML5 Canvas + vanilla JavaScript and runs directly in the browser, just like BMO is an all-in-one portable console.'
      },
      fr: {
        q: 'Comme BMO dans Adventure Time, ArcLycée tourne entièrement dans un navigateur web sans aucune installation.',
        answer: true,
        explanation: 'ArcLycée utilise HTML5 Canvas + JavaScript vanilla et s\'exécute directement dans le navigateur, tout comme BMO est une console portable tout-en-un.'
      }
    }
  },

  {
    id: 'stm-002', type: 'tf',
    lang: {
      es: {
        q: 'El Carbono-14 puede fechar un fósil de dinosaurio de 65 millones de años.',
        answer: false,
        explanation: 'El C-14 solo funciona hasta ~50,000 años. Para dinosaurios se usan otros métodos como potasio-argón. ¡El C-14 tiene sus límites!'
      },
      en: {
        q: 'Carbon-14 can date a dinosaur fossil that is 65 million years old.',
        answer: false,
        explanation: 'C-14 only works up to ~50,000 years. For dinosaurs, other methods like potassium-argon are used. C-14 has its limits!'
      },
      fr: {
        q: 'Le Carbone-14 peut dater un fossile de dinosaure vieux de 65 millions d\'années.',
        answer: false,
        explanation: 'Le C-14 ne fonctionne que jusqu\'à ~50 000 ans. Pour les dinosaures, on utilise d\'autres méthodes comme le potassium-argon. Le C-14 a ses limites !'
      }
    }
  },

  {
    id: 'stm-003', type: 'tf',
    lang: {
      es: {
        q: 'En FIRST LEGO League, puedes usar un control remoto para manejar el robot durante la competencia.',
        answer: false,
        explanation: 'Los robots de FLL deben ser completamente autónomos. ¡Nada de control remoto! El robot decide solo, como un verdadero Transformer... pero de LEGO.'
      },
      en: {
        q: 'In FIRST LEGO League, you can use a remote control to drive the robot during the competition.',
        answer: false,
        explanation: 'FLL robots must be fully autonomous. No remote control allowed! The robot decides on its own, like a real Transformer... but made of LEGO.'
      },
      fr: {
        q: 'En FIRST LEGO League, on peut utiliser une télécommande pour piloter le robot pendant la compétition.',
        answer: false,
        explanation: 'Les robots FLL doivent être entièrement autonomes. Pas de télécommande ! Le robot décide seul, comme un vrai Transformer... mais en LEGO.'
      }
    }
  },

  {
    id: 'stm-004', type: 'tf',
    lang: {
      es: {
        q: 'Tony Stark usaría requestAnimationFrame para animar su HUD. Este método intenta ejecutarse 60 veces por segundo.',
        answer: true,
        explanation: 'requestAnimationFrame se sincroniza con la tasa de refresco del monitor, generalmente 60fps. ¡Perfecto para un HUD de Iron Man o un game loop!'
      },
      en: {
        q: 'Tony Stark would use requestAnimationFrame to animate his HUD. This method tries to run 60 times per second.',
        answer: true,
        explanation: 'requestAnimationFrame syncs with the monitor refresh rate, typically 60fps. Perfect for an Iron Man HUD or a game loop!'
      },
      fr: {
        q: 'Tony Stark utiliserait requestAnimationFrame pour animer son HUD. Cette méthode s\'exécute environ 60 fois par seconde.',
        answer: true,
        explanation: 'requestAnimationFrame se synchronise avec le taux de rafraîchissement du moniteur, généralement 60fps. Parfait pour un HUD d\'Iron Man ou une boucle de jeu !'
      }
    }
  },

  {
    id: 'stm-005', type: 'tf',
    lang: {
      es: {
        q: 'Una impresora 3D construye objetos capa por capa, como si hicieras un sándwich gigante de plástico.',
        answer: true,
        explanation: '¡Exacto! La impresión 3D es fabricación aditiva: se deposita material capa a capa. Phineas y Ferb aprobarían esta tecnología.'
      },
      en: {
        q: 'A 3D printer builds objects layer by layer, like making a giant plastic sandwich.',
        answer: true,
        explanation: 'Exactly! 3D printing is additive manufacturing: material is deposited layer by layer. Phineas and Ferb would approve of this technology.'
      },
      fr: {
        q: 'Une imprimante 3D construit des objets couche par couche, comme un sandwich géant en plastique.',
        answer: true,
        explanation: 'Exactement ! L\'impression 3D est de la fabrication additive : on dépose du matériau couche par couche. Phineas et Ferb approuveraient cette technologie.'
      }
    }
  },

  {
    id: 'stm-006', type: 'tf',
    lang: {
      es: {
        q: 'En Scratch, los bloques de código se escriben a mano como texto, igual que JavaScript.',
        answer: false,
        explanation: 'Scratch es un lenguaje visual basado en bloques que se arrastran y conectan. ¡Es como armar LEGO pero con código! JavaScript sí se escribe como texto.'
      },
      en: {
        q: 'In Scratch, code blocks are typed by hand as text, just like JavaScript.',
        answer: false,
        explanation: 'Scratch is a visual block-based language where you drag and connect blocks. It\'s like building LEGO but with code! JavaScript is typed as text.'
      },
      fr: {
        q: 'En Scratch, les blocs de code s\'écrivent à la main comme du texte, tout comme JavaScript.',
        answer: false,
        explanation: 'Scratch est un langage visuel basé sur des blocs qu\'on glisse et connecte. C\'est comme construire des LEGO mais avec du code ! JavaScript s\'écrit en texte.'
      }
    }
  },

  {
    id: 'stm-007', type: 'tf',
    lang: {
      es: {
        q: 'Un magnetómetro puede detectar artefactos metálicos enterrados sin necesidad de cavar.',
        answer: true,
        explanation: 'Los magnetómetros miden campos magnéticos y detectan anomalías causadas por metales bajo tierra. ¡Es como tener visión de rayos X, pero para metales!'
      },
      en: {
        q: 'A magnetometer can detect buried metal artifacts without digging.',
        answer: true,
        explanation: 'Magnetometers measure magnetic fields and detect anomalies caused by underground metals. It\'s like having X-ray vision, but for metals!'
      },
      fr: {
        q: 'Un magnétomètre peut détecter des artefacts métalliques enterrés sans creuser.',
        answer: true,
        explanation: 'Les magnétomètres mesurent les champs magnétiques et détectent les anomalies causées par les métaux souterrains. C\'est comme avoir une vision aux rayons X, mais pour les métaux !'
      }
    }
  },

  {
    id: 'stm-008', type: 'tf',
    lang: {
      es: {
        q: 'Los ROV (robots submarinos) siempre operan de forma totalmente autónoma, sin cable ni operador humano.',
        answer: false,
        explanation: 'ROV significa Remotely Operated Vehicle (Vehículo Operado Remotamente). Un operador humano los controla desde la superficie, generalmente por cable. ¡No son como Baymax, que va solito!'
      },
      en: {
        q: 'ROVs (submarine robots) always operate fully autonomously, without a cable or human operator.',
        answer: false,
        explanation: 'ROV stands for Remotely Operated Vehicle. A human operator controls them from the surface, usually via cable. They\'re not like Baymax, who goes solo!'
      },
      fr: {
        q: 'Les ROV (robots sous-marins) fonctionnent toujours de façon totalement autonome, sans câble ni opérateur humain.',
        answer: false,
        explanation: 'ROV signifie Remotely Operated Vehicle (Véhicule télécommandé). Un opérateur humain les contrôle depuis la surface, généralement par câble. Ce ne sont pas des Baymax autonomes !'
      }
    }
  },

  {
    id: 'stm-009', type: 'tf',
    lang: {
      es: {
        q: 'En un videojuego, la detección de colisiones AABB usa rectángulos alineados con los ejes para saber si dos objetos se tocan.',
        answer: true,
        explanation: 'AABB = Axis-Aligned Bounding Box. Es el método más rápido: solo comparas las coordenadas X e Y de dos rectángulos. ¡Franky de One Piece lo calcularía SUPER rápido!'
      },
      en: {
        q: 'In a video game, AABB collision detection uses axis-aligned rectangles to check if two objects touch.',
        answer: true,
        explanation: 'AABB = Axis-Aligned Bounding Box. It\'s the fastest method: just compare X and Y coordinates of two rectangles. Franky from One Piece would calculate it SUPER fast!'
      },
      fr: {
        q: 'Dans un jeu vidéo, la détection de collisions AABB utilise des rectangles alignés sur les axes pour vérifier si deux objets se touchent.',
        answer: true,
        explanation: 'AABB = Axis-Aligned Bounding Box. C\'est la méthode la plus rapide : on compare juste les coordonnées X et Y de deux rectangles. Franky de One Piece le calculerait SUPER vite !'
      }
    }
  },

  {
    id: 'stm-010', type: 'tf',
    lang: {
      es: {
        q: 'La Web Audio API solo puede reproducir archivos MP3, no puede generar sonidos desde cero.',
        answer: false,
        explanation: 'La Web Audio API puede crear sonidos procedurales con osciladores y filtros. ArcLycée genera 57 efectos de sonido así, ¡sin un solo archivo de audio para los SFX!'
      },
      en: {
        q: 'The Web Audio API can only play MP3 files; it cannot generate sounds from scratch.',
        answer: false,
        explanation: 'The Web Audio API can create procedural sounds with oscillators and filters. ArcLycée generates 57 sound effects this way, without a single audio file for SFX!'
      },
      fr: {
        q: 'La Web Audio API ne peut que lire des fichiers MP3, elle ne peut pas générer de sons à partir de rien.',
        answer: false,
        explanation: 'La Web Audio API peut créer des sons procéduraux avec des oscillateurs et des filtres. ArcLycée génère 57 effets sonores ainsi, sans un seul fichier audio pour les SFX !'
      }
    }
  },

  {
    id: 'stm-011', type: 'tf',
    lang: {
      es: {
        q: 'Git es un sistema de control de versiones que guarda el historial completo de todos los cambios en tu código.',
        answer: true,
        explanation: 'Git registra cada cambio (commit) con autor, fecha y mensaje. Es como una máquina del tiempo para tu código. ¡Ni Doctor Strange tiene tanto control sobre el tiempo!'
      },
      en: {
        q: 'Git is a version control system that saves the complete history of all changes to your code.',
        answer: true,
        explanation: 'Git records every change (commit) with author, date, and message. It\'s like a time machine for your code. Not even Doctor Strange has this much control over time!'
      },
      fr: {
        q: 'Git est un système de contrôle de versions qui sauvegarde l\'historique complet de toutes les modifications de votre code.',
        answer: true,
        explanation: 'Git enregistre chaque modification (commit) avec l\'auteur, la date et le message. C\'est comme une machine à remonter le temps pour votre code. Même Doctor Strange n\'a pas autant de contrôle !'
      }
    }
  },

  {
    id: 'stm-012', type: 'tf',
    lang: {
      es: {
        q: 'Leaflet.js es una librería de JavaScript que ArcLycée usa para mostrar mapas interactivos con tiles reales de satélite.',
        answer: true,
        explanation: 'Leaflet.js permite crear mapas web interactivos con capas de tiles, marcadores y más. ArcLycée lo usa para su mapa de referencia arqueológico con 6 capas de datos.'
      },
      en: {
        q: 'Leaflet.js is a JavaScript library that ArcLycée uses to show interactive maps with real satellite tiles.',
        answer: true,
        explanation: 'Leaflet.js lets you create interactive web maps with tile layers, markers, and more. ArcLycée uses it for its archaeological reference map with 6 data layers.'
      },
      fr: {
        q: 'Leaflet.js est une bibliothèque JavaScript qu\'ArcLycée utilise pour afficher des cartes interactives avec de vraies tuiles satellite.',
        answer: true,
        explanation: 'Leaflet.js permet de créer des cartes web interactives avec des couches de tuiles, des marqueurs et plus. ArcLycée l\'utilise pour sa carte de référence archéologique avec 6 couches de données.'
      }
    }
  },

  {
    id: 'stm-013', type: 'tf',
    lang: {
      es: {
        q: 'En programación, un "módulo ES" (ES module) permite dividir el código en archivos separados usando import y export.',
        answer: true,
        explanation: 'Los ES modules organizan el código como un equipo de superhéroes: cada archivo tiene su rol y se comunican con import/export. ArcLycée tiene +60 módulos así.'
      },
      en: {
        q: 'In programming, an "ES module" lets you split code into separate files using import and export.',
        answer: true,
        explanation: 'ES modules organize code like a superhero team: each file has its role and they communicate via import/export. ArcLycée has 60+ modules like this.'
      },
      fr: {
        q: 'En programmation, un "module ES" (ES module) permet de diviser le code en fichiers séparés en utilisant import et export.',
        answer: true,
        explanation: 'Les modules ES organisent le code comme une équipe de super-héros : chaque fichier a son rôle et ils communiquent par import/export. ArcLycée a plus de 60 modules ainsi.'
      }
    }
  },

  {
    id: 'stm-014', type: 'tf',
    lang: {
      es: {
        q: 'La vida media del Carbono-14 es de 5730 años, lo que significa que después de ese tiempo, la mitad de los átomos de C-14 se habrán desintegrado.',
        answer: true,
        explanation: '¡Correcto! Vida media = el tiempo para que la mitad se descomponga. Después de 5730 años, te queda la mitad. Después de 11460, un cuarto. ¡Las matemáticas son poderosas!'
      },
      en: {
        q: 'The half-life of Carbon-14 is 5730 years, meaning after that time, half the C-14 atoms will have decayed.',
        answer: true,
        explanation: 'Correct! Half-life = the time for half to decay. After 5730 years, you have half left. After 11,460, a quarter. Math is powerful!'
      },
      fr: {
        q: 'La demi-vie du Carbone-14 est de 5730 ans, ce qui signifie qu\'après cette période, la moitié des atomes de C-14 se seront désintégrés.',
        answer: true,
        explanation: 'Correct ! Demi-vie = le temps pour que la moitié se désintègre. Après 5730 ans, il en reste la moitié. Après 11 460, un quart. Les maths sont puissantes !'
      }
    }
  },

  {
    id: 'stm-015', type: 'tf',
    lang: {
      es: {
        q: 'En el game loop de ArcLycée, delta time (dt) mide cuántas veces el jugador presionó una tecla.',
        answer: false,
        explanation: 'Delta time mide el tiempo transcurrido entre un frame y el siguiente. Se usa para que el movimiento sea fluido sin importar la velocidad del computador. ¡Nada que ver con teclas!'
      },
      en: {
        q: 'In ArcLycée\'s game loop, delta time (dt) measures how many times the player pressed a key.',
        answer: false,
        explanation: 'Delta time measures the time elapsed between one frame and the next. It\'s used to make movement smooth regardless of computer speed. Nothing to do with keys!'
      },
      fr: {
        q: 'Dans la boucle de jeu d\'ArcLycée, le delta time (dt) mesure combien de fois le joueur a appuyé sur une touche.',
        answer: false,
        explanation: 'Le delta time mesure le temps écoulé entre une image et la suivante. Il sert à rendre le mouvement fluide quelle que soit la vitesse de l\'ordinateur. Rien à voir avec les touches !'
      }
    }
  },

  {
    id: 'stm-016', type: 'tf',
    lang: {
      es: {
        q: 'El método fillRect() del Canvas 2D es suficiente para dibujar sprites de personajes pixel por pixel, sin necesidad de imágenes externas.',
        answer: true,
        explanation: 'ArcLycée dibuja TODOS sus sprites con fillRect, arc y paths del Canvas, sin cargar imágenes de sprites. ¡Es como pixel art programado, al estilo Cyborg construyendo su propio cuerpo!'
      },
      en: {
        q: 'The Canvas 2D fillRect() method is enough to draw character sprites pixel by pixel, without external images.',
        answer: true,
        explanation: 'ArcLycée draws ALL its sprites with Canvas fillRect, arc, and paths, without loading sprite images. It\'s like programmatic pixel art, Cyborg-style building his own body!'
      },
      fr: {
        q: 'La méthode fillRect() du Canvas 2D suffit pour dessiner des sprites de personnages pixel par pixel, sans images externes.',
        answer: true,
        explanation: 'ArcLycée dessine TOUS ses sprites avec fillRect, arc et paths du Canvas, sans charger d\'images de sprites. C\'est comme du pixel art programmé, à la façon de Cyborg construisant son propre corps !'
      }
    }
  },

  {
    id: 'stm-017', type: 'tf',
    lang: {
      es: {
        q: 'Un oscilador en Web Audio API produce ondas de sonido que pueden tener forma de sierra, cuadrada o sinusoidal.',
        answer: true,
        explanation: 'Los osciladores generan ondas básicas: sine, square, sawtooth y triangle. Combinándolos con filtros, puedes crear desde pisadas hasta explosiones. ¡Puro sonido matemático!'
      },
      en: {
        q: 'An oscillator in the Web Audio API produces sound waves that can be sawtooth, square, or sine shaped.',
        answer: true,
        explanation: 'Oscillators generate basic waveforms: sine, square, sawtooth, and triangle. By combining them with filters, you can create anything from footsteps to explosions. Pure mathematical sound!'
      },
      fr: {
        q: 'Un oscillateur dans la Web Audio API produit des ondes sonores qui peuvent être en dents de scie, carrées ou sinusoïdales.',
        answer: true,
        explanation: 'Les oscillateurs génèrent des ondes de base : sine, square, sawtooth et triangle. En les combinant avec des filtres, on peut créer des pas comme des explosions. Du son purement mathématique !'
      }
    }
  },

  {
    id: 'stm-018', type: 'tf',
    lang: {
      es: {
        q: 'Las coordenadas GPS usan latitud y longitud para ubicar cualquier punto en la Tierra.',
        answer: true,
        explanation: 'Latitud (norte/sur) y longitud (este/oeste) son como las coordenadas X e Y de un mapa gigante. ArcLycée usa coordenadas reales para sus 70+ marcadores en el mapa Leaflet.'
      },
      en: {
        q: 'GPS coordinates use latitude and longitude to locate any point on Earth.',
        answer: true,
        explanation: 'Latitude (north/south) and longitude (east/west) are like X and Y coordinates on a giant map. ArcLycée uses real coordinates for its 70+ markers on the Leaflet map.'
      },
      fr: {
        q: 'Les coordonnées GPS utilisent la latitude et la longitude pour localiser n\'importe quel point sur Terre.',
        answer: true,
        explanation: 'La latitude (nord/sud) et la longitude (est/ouest) sont comme les coordonnées X et Y d\'une carte géante. ArcLycée utilise de vraies coordonnées pour ses 70+ marqueurs sur la carte Leaflet.'
      }
    }
  },

  {
    id: 'stm-019', type: 'tf',
    lang: {
      es: {
        q: 'En diseño de juegos, una "curva de dificultad" significa que el juego se vuelve más difícil de forma gradual, no de golpe.',
        answer: true,
        explanation: 'Una buena curva de dificultad sube gradualmente para mantener al jugador en "flow". ArcLycée lo hace en su mini-juego de rapel: el intervalo baja de 1.0s a 0.45s progresivamente.'
      },
      en: {
        q: 'In game design, a "difficulty curve" means the game gets harder gradually, not suddenly.',
        answer: true,
        explanation: 'A good difficulty curve ramps up gradually to keep the player in "flow." ArcLycée does this in its rappel mini-game: the interval drops from 1.0s to 0.45s progressively.'
      },
      fr: {
        q: 'En game design, une "courbe de difficulté" signifie que le jeu devient plus difficile progressivement, pas d\'un coup.',
        answer: true,
        explanation: 'Une bonne courbe de difficulté monte graduellement pour maintenir le joueur en "flow". ArcLycée le fait dans son mini-jeu de rappel : l\'intervalle passe de 1,0s à 0,45s progressivement.'
      }
    }
  },

  {
    id: 'stm-020', type: 'tf',
    lang: {
      es: {
        q: 'En Git, un "branch" (rama) te permite trabajar en una versión alternativa del código sin afectar la versión principal.',
        answer: true,
        explanation: 'Las ramas son como universos paralelos de tu código. Puedes experimentar sin miedo y luego fusionar (merge) los cambios. ¡Es el multiverso, pero para programadores!'
      },
      en: {
        q: 'In Git, a "branch" lets you work on an alternative version of the code without affecting the main version.',
        answer: true,
        explanation: 'Branches are like parallel universes of your code. You can experiment fearlessly and then merge the changes. It\'s the multiverse, but for programmers!'
      },
      fr: {
        q: 'En Git, une "branche" permet de travailler sur une version alternative du code sans affecter la version principale.',
        answer: true,
        explanation: 'Les branches sont comme des univers parallèles de votre code. On peut expérimenter sans crainte puis fusionner (merge) les changements. C\'est le multivers, mais pour les programmeurs !'
      }
    }
  },

  {
    id: 'stm-021', type: 'tf',
    lang: {
      es: {
        q: 'El Carbono-14 se usa para datar rocas volcánicas de millones de años.',
        answer: false,
        explanation: 'El C-14 solo funciona con materiales orgánicos (madera, huesos, conchas) y hasta ~50,000 años. Para rocas volcánicas se usa potasio-argón u otros métodos.'
      },
      en: {
        q: 'Carbon-14 is used to date volcanic rocks that are millions of years old.',
        answer: false,
        explanation: 'C-14 only works with organic materials (wood, bones, shells) and up to ~50,000 years. For volcanic rocks, potassium-argon or other methods are used.'
      },
      fr: {
        q: 'Le Carbone-14 est utilisé pour dater des roches volcaniques vieilles de millions d\'années.',
        answer: false,
        explanation: 'Le C-14 ne fonctionne qu\'avec des matériaux organiques (bois, os, coquillages) et jusqu\'à ~50 000 ans. Pour les roches volcaniques, on utilise le potassium-argon ou d\'autres méthodes.'
      }
    }
  },

  {
    id: 'stm-022', type: 'tf',
    lang: {
      es: {
        q: 'La gravedad en un videojuego 2D se simula sumando una aceleración constante a la velocidad vertical del personaje en cada frame.',
        answer: true,
        explanation: 'velocidadY += gravedad * dt. Así de simple. Es la misma fórmula que Newton descubrió, pero aplicada a píxeles. Franky de One Piece diría que es SUPER físico.'
      },
      en: {
        q: 'Gravity in a 2D game is simulated by adding a constant acceleration to the character\'s vertical velocity each frame.',
        answer: true,
        explanation: 'velocityY += gravity * dt. That simple. It\'s the same formula Newton discovered, but applied to pixels. Franky from One Piece would say it\'s SUPER physics.'
      },
      fr: {
        q: 'La gravité dans un jeu 2D est simulée en ajoutant une accélération constante à la vitesse verticale du personnage à chaque image.',
        answer: true,
        explanation: 'vitesseY += gravite * dt. Aussi simple que ça. C\'est la même formule que Newton a découverte, mais appliquée aux pixels. Franky de One Piece dirait que c\'est SUPER physique.'
      }
    }
  },

  {
    id: 'stm-023', type: 'tf',
    lang: {
      es: {
        q: 'En ArcLycée, factorTiempo = dt * 60 se usa para que el juego vaya a la misma velocidad en cualquier computador.',
        answer: true,
        explanation: 'Si un PC es lento y dt es grande, el personaje se mueve más por frame para compensar. Si es rápido y dt es pequeño, se mueve menos. ¡Resultado: misma velocidad para todos!'
      },
      en: {
        q: 'In ArcLycée, factorTiempo = dt * 60 is used so the game runs at the same speed on any computer.',
        answer: true,
        explanation: 'If a PC is slow and dt is large, the character moves more per frame to compensate. If it\'s fast and dt is small, it moves less. Result: same speed for everyone!'
      },
      fr: {
        q: 'Dans ArcLycée, factorTiempo = dt * 60 est utilisé pour que le jeu tourne à la même vitesse sur n\'importe quel ordinateur.',
        answer: true,
        explanation: 'Si un PC est lent et dt est grand, le personnage bouge plus par image pour compenser. S\'il est rapide et dt est petit, il bouge moins. Résultat : même vitesse pour tous !'
      }
    }
  },

  {
    id: 'stm-024', type: 'tf',
    lang: {
      es: {
        q: 'Los robots submarinos ROV son inútiles para la arqueología porque el agua salada destruye sus cámaras.',
        answer: false,
        explanation: 'Los ROV están diseñados para operar en el océano. Tienen cámaras, brazos mecánicos y luces para explorar naufragios y sitios arqueológicos sumergidos. ¡Son los héroes del fondo marino!'
      },
      en: {
        q: 'Submarine ROV robots are useless for archaeology because saltwater destroys their cameras.',
        answer: false,
        explanation: 'ROVs are designed to operate in the ocean. They have cameras, mechanical arms, and lights to explore shipwrecks and submerged archaeological sites. They\'re the heroes of the sea floor!'
      },
      fr: {
        q: 'Les robots sous-marins ROV sont inutiles pour l\'archéologie car l\'eau salée détruit leurs caméras.',
        answer: false,
        explanation: 'Les ROV sont conçus pour opérer dans l\'océan. Ils ont des caméras, des bras mécaniques et des lumières pour explorer les épaves et les sites archéologiques submergés. Ce sont les héros des fonds marins !'
      }
    }
  },

  {
    id: 'stm-025', type: 'tf',
    lang: {
      es: {
        q: 'En Scratch, la categoría "Eventos" contiene bloques como "al presionar bandera verde" que inician la ejecución del programa.',
        answer: true,
        explanation: '¡Sí! "Al presionar bandera verde" es el bloque más famoso de Scratch. Es como el botón de encendido de BMO: sin él, nada se ejecuta.'
      },
      en: {
        q: 'In Scratch, the "Events" category contains blocks like "when green flag clicked" that start the program\'s execution.',
        answer: true,
        explanation: 'Yes! "When green flag clicked" is Scratch\'s most famous block. It\'s like BMO\'s power button: without it, nothing runs.'
      },
      fr: {
        q: 'En Scratch, la catégorie "Événements" contient des blocs comme "quand le drapeau vert est cliqué" qui lancent l\'exécution du programme.',
        answer: true,
        explanation: 'Oui ! "Quand le drapeau vert est cliqué" est le bloc le plus célèbre de Scratch. C\'est comme le bouton d\'allumage de BMO : sans lui, rien ne s\'exécute.'
      }
    }
  },

  // =====================================================================
  //  MULTIPLE CHOICE  (stm-026 → stm-050)
  // =====================================================================

  {
    id: 'stm-026', type: 'mcq',
    lang: {
      es: {
        q: 'Tony Stark usaría requestAnimationFrame para animar su HUD. ¿Cuántas veces por segundo corre un game loop estándar?',
        options: ['30 fps', '60 fps', '120 fps', '1000 fps'],
        answer: 1,
        explanation: 'El estándar es 60fps, sincronizado con la mayoría de monitores. requestAnimationFrame se adapta a la tasa de refresco del monitor.'
      },
      en: {
        q: 'Tony Stark would use requestAnimationFrame to animate his HUD. How many times per second does a standard game loop run?',
        options: ['30 fps', '60 fps', '120 fps', '1000 fps'],
        answer: 1,
        explanation: 'The standard is 60fps, synced with most monitors. requestAnimationFrame adapts to the monitor\'s refresh rate.'
      },
      fr: {
        q: 'Tony Stark utiliserait requestAnimationFrame pour animer son HUD. Combien de fois par seconde tourne une boucle de jeu standard ?',
        options: ['30 fps', '60 fps', '120 fps', '1000 fps'],
        answer: 1,
        explanation: 'Le standard est 60fps, synchronisé avec la plupart des écrans. requestAnimationFrame s\'adapte au taux de rafraîchissement du moniteur.'
      }
    }
  },

  {
    id: 'stm-027', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuál es la vida media del Carbono-14 que los arqueólogos usan para fechar objetos antiguos?',
        options: ['573 años', '5730 años', '57,300 años', '573,000 años'],
        answer: 1,
        explanation: '5730 años es la vida media del C-14. Después de ese tiempo, la mitad del C-14 original se ha convertido en Nitrógeno-14.'
      },
      en: {
        q: 'What is the half-life of Carbon-14 that archaeologists use to date ancient objects?',
        options: ['573 years', '5,730 years', '57,300 years', '573,000 years'],
        answer: 1,
        explanation: '5,730 years is the half-life of C-14. After that time, half of the original C-14 has converted to Nitrogen-14.'
      },
      fr: {
        q: 'Quelle est la demi-vie du Carbone-14 que les archéologues utilisent pour dater les objets anciens ?',
        options: ['573 ans', '5 730 ans', '57 300 ans', '573 000 ans'],
        answer: 1,
        explanation: '5 730 ans est la demi-vie du C-14. Après ce temps, la moitié du C-14 original s\'est transformée en Azote-14.'
      }
    }
  },

  {
    id: 'stm-028', type: 'mcq',
    lang: {
      es: {
        q: 'Cyborg (DC) necesita renderizar sus sistemas. ¿Qué API usa ArcLycée para dibujar todo en pantalla?',
        options: ['WebGL 3D', 'Canvas 2D API', 'SVG con D3.js', 'DOM con CSS animations'],
        answer: 1,
        explanation: 'ArcLycée usa la Canvas 2D API de HTML5. Todo se dibuja con métodos como fillRect(), arc() y lineTo(). ¡Simple pero poderoso!'
      },
      en: {
        q: 'Cyborg (DC) needs to render his systems. What API does ArcLycée use to draw everything on screen?',
        options: ['WebGL 3D', 'Canvas 2D API', 'SVG with D3.js', 'DOM with CSS animations'],
        answer: 1,
        explanation: 'ArcLycée uses the HTML5 Canvas 2D API. Everything is drawn with methods like fillRect(), arc(), and lineTo(). Simple but powerful!'
      },
      fr: {
        q: 'Cyborg (DC) doit rendre ses systèmes. Quelle API ArcLycée utilise-t-il pour tout dessiner à l\'écran ?',
        options: ['WebGL 3D', 'Canvas 2D API', 'SVG avec D3.js', 'DOM avec CSS animations'],
        answer: 1,
        explanation: 'ArcLycée utilise l\'API Canvas 2D de HTML5. Tout est dessiné avec des méthodes comme fillRect(), arc() et lineTo(). Simple mais puissant !'
      }
    }
  },

  {
    id: 'stm-029', type: 'mcq',
    lang: {
      es: {
        q: 'En Scratch, ¿qué categoría de bloques controla el movimiento del sprite (mover, girar, ir a)?',
        options: ['Apariencia', 'Movimiento', 'Control', 'Eventos'],
        answer: 1,
        explanation: 'La categoría Movimiento (azul) tiene bloques como "mover 10 pasos", "girar 15 grados" e "ir a x: y:". ¡Es lo primero que aprendes en Scratch!'
      },
      en: {
        q: 'In Scratch, which block category controls sprite movement (move, turn, go to)?',
        options: ['Looks', 'Motion', 'Control', 'Events'],
        answer: 1,
        explanation: 'The Motion category (blue) has blocks like "move 10 steps", "turn 15 degrees", and "go to x: y:". It\'s the first thing you learn in Scratch!'
      },
      fr: {
        q: 'En Scratch, quelle catégorie de blocs contrôle le mouvement du sprite (avancer, tourner, aller à) ?',
        options: ['Apparence', 'Mouvement', 'Contrôle', 'Événements'],
        answer: 1,
        explanation: 'La catégorie Mouvement (bleue) a des blocs comme "avancer de 10 pas", "tourner de 15 degrés" et "aller à x: y:". C\'est la première chose qu\'on apprend en Scratch !'
      }
    }
  },

  {
    id: 'stm-030', type: 'mcq',
    lang: {
      es: {
        q: 'Phineas y Ferb imprimen un invento en 3D. ¿Qué tipo de fabricación es la impresión 3D?',
        options: ['Sustractiva (quitar material)', 'Aditiva (agregar capas)', 'Formativa (moldear)', 'Combinatoria (mezclar)'],
        answer: 1,
        explanation: 'La impresión 3D es fabricación ADITIVA: construye capa por capa, desde abajo hacia arriba. Lo opuesto sería tallar un bloque (sustractiva).'
      },
      en: {
        q: 'Phineas and Ferb 3D-print an invention. What type of manufacturing is 3D printing?',
        options: ['Subtractive (removing material)', 'Additive (adding layers)', 'Formative (molding)', 'Combinatorial (mixing)'],
        answer: 1,
        explanation: '3D printing is ADDITIVE manufacturing: it builds layer by layer, from bottom to top. The opposite would be carving a block (subtractive).'
      },
      fr: {
        q: 'Phineas et Ferb impriment une invention en 3D. Quel type de fabrication est l\'impression 3D ?',
        options: ['Soustractive (enlever du matériau)', 'Additive (ajouter des couches)', 'Formative (mouler)', 'Combinatoire (mélanger)'],
        answer: 1,
        explanation: 'L\'impression 3D est de la fabrication ADDITIVE : on construit couche par couche, du bas vers le haut. L\'opposé serait de sculpter un bloc (soustractive).'
      }
    }
  },

  {
    id: 'stm-031', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué mide un magnetómetro, el instrumento que los arqueólogos usan para encontrar artefactos enterrados?',
        options: ['Temperatura del suelo', 'Campos magnéticos', 'Ondas de sonido', 'Radiación ultravioleta'],
        answer: 1,
        explanation: 'Los magnetómetros detectan anomalías en el campo magnético causadas por objetos metálicos o suelos quemados bajo la superficie.'
      },
      en: {
        q: 'What does a magnetometer measure, the instrument archaeologists use to find buried artifacts?',
        options: ['Soil temperature', 'Magnetic fields', 'Sound waves', 'Ultraviolet radiation'],
        answer: 1,
        explanation: 'Magnetometers detect anomalies in the magnetic field caused by metallic objects or burnt soil beneath the surface.'
      },
      fr: {
        q: 'Que mesure un magnétomètre, l\'instrument que les archéologues utilisent pour trouver des artefacts enterrés ?',
        options: ['La température du sol', 'Les champs magnétiques', 'Les ondes sonores', 'Les rayons ultraviolets'],
        answer: 1,
        explanation: 'Les magnétomètres détectent les anomalies du champ magnétique causées par des objets métalliques ou des sols brûlés sous la surface.'
      }
    }
  },

  {
    id: 'stm-032', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué significa ROV, el tipo de robot submarino que se usa en arqueología subacuática?',
        options: ['Robot Operado Velozmente', 'Remotely Operated Vehicle', 'Robotic Ocean Vessel', 'Remote Oceanic Visualizer'],
        answer: 1,
        explanation: 'ROV = Remotely Operated Vehicle (Vehículo Operado Remotamente). Un piloto humano lo controla desde la superficie a través de un cable umbilical.'
      },
      en: {
        q: 'What does ROV stand for, the type of submarine robot used in underwater archaeology?',
        options: ['Rapid Ocean Vehicle', 'Remotely Operated Vehicle', 'Robotic Ocean Vessel', 'Remote Oceanic Visualizer'],
        answer: 1,
        explanation: 'ROV = Remotely Operated Vehicle. A human pilot controls it from the surface through an umbilical cable.'
      },
      fr: {
        q: 'Que signifie ROV, le type de robot sous-marin utilisé en archéologie subaquatique ?',
        options: ['Robot Opéré Visuellement', 'Remotely Operated Vehicle', 'Robotic Ocean Vessel', 'Remote Oceanic Visualizer'],
        answer: 1,
        explanation: 'ROV = Remotely Operated Vehicle (Véhicule télécommandé). Un pilote humain le contrôle depuis la surface via un câble ombilical.'
      }
    }
  },

  {
    id: 'stm-033', type: 'mcq',
    lang: {
      es: {
        q: 'Franky de One Piece construye máquinas con cola. En ArcLycée, ¿qué técnica genera los 57 efectos de sonido sin archivos de audio?',
        options: ['Descargar de YouTube', 'Generación procedural con Web Audio API', 'Grabarlos con micrófono', 'Usar la librería Howler.js'],
        answer: 1,
        explanation: 'ArcLycée usa osciladores y filtros de la Web Audio API para crear TODOS sus efectos de sonido de forma procedural. ¡Puro código, cero archivos!'
      },
      en: {
        q: 'Franky from One Piece builds machines with cola. In ArcLycée, what technique generates all 57 sound effects without audio files?',
        options: ['Download from YouTube', 'Procedural generation with Web Audio API', 'Record them with a microphone', 'Use the Howler.js library'],
        answer: 1,
        explanation: 'ArcLycée uses oscillators and filters from the Web Audio API to create ALL its sound effects procedurally. Pure code, zero files!'
      },
      fr: {
        q: 'Franky de One Piece construit des machines au cola. Dans ArcLycée, quelle technique génère les 57 effets sonores sans fichiers audio ?',
        options: ['Les télécharger de YouTube', 'Génération procédurale avec Web Audio API', 'Les enregistrer au micro', 'Utiliser la bibliothèque Howler.js'],
        answer: 1,
        explanation: 'ArcLycée utilise des oscillateurs et filtres de la Web Audio API pour créer TOUS ses effets sonores de façon procédurale. Du pur code, zéro fichier !'
      }
    }
  },

  {
    id: 'stm-034', type: 'mcq',
    lang: {
      es: {
        q: 'En FIRST LEGO League, el robot navega un tapete con misiones. ¿Cómo se programa generalmente el robot?',
        options: ['Con voz, hablándole', 'Con bloques visuales o código en el software del robot', 'Con señales de radio en vivo', 'No se programa, se controla manualmente'],
        answer: 1,
        explanation: 'Los robots FLL se programan con software de bloques (como SPIKE o EV3) o código. El programa se descarga al robot, que luego ejecuta las instrucciones de forma autónoma.'
      },
      en: {
        q: 'In FIRST LEGO League, the robot navigates a mat with missions. How is the robot typically programmed?',
        options: ['By voice commands', 'With visual blocks or code in the robot\'s software', 'With live radio signals', 'It\'s not programmed, it\'s manually controlled'],
        answer: 1,
        explanation: 'FLL robots are programmed with block-based software (like SPIKE or EV3) or code. The program is downloaded to the robot, which then runs autonomously.'
      },
      fr: {
        q: 'En FIRST LEGO League, le robot navigue sur un tapis avec des missions. Comment programme-t-on généralement le robot ?',
        options: ['À la voix', 'Avec des blocs visuels ou du code dans le logiciel du robot', 'Avec des signaux radio en direct', 'Il n\'est pas programmé, on le contrôle manuellement'],
        answer: 1,
        explanation: 'Les robots FLL sont programmés avec des logiciels à blocs (comme SPIKE ou EV3) ou du code. Le programme est téléchargé dans le robot, qui s\'exécute ensuite de façon autonome.'
      }
    }
  },

  {
    id: 'stm-035', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué tipo de detección de colisiones compara las coordenadas de dos rectángulos para saber si se superponen?',
        options: ['Raycasting', 'AABB (Axis-Aligned Bounding Box)', 'Pixel perfect', 'Separating Axis Theorem'],
        answer: 1,
        explanation: 'AABB compara los límites izquierdo/derecho/arriba/abajo de dos cajas. Si se superponen en ambos ejes, ¡colisión! Es rápido y sencillo.'
      },
      en: {
        q: 'What type of collision detection compares the coordinates of two rectangles to check if they overlap?',
        options: ['Raycasting', 'AABB (Axis-Aligned Bounding Box)', 'Pixel perfect', 'Separating Axis Theorem'],
        answer: 1,
        explanation: 'AABB compares the left/right/top/bottom bounds of two boxes. If they overlap on both axes, collision! It\'s fast and simple.'
      },
      fr: {
        q: 'Quel type de détection de collisions compare les coordonnées de deux rectangles pour vérifier s\'ils se chevauchent ?',
        options: ['Raycasting', 'AABB (Axis-Aligned Bounding Box)', 'Pixel perfect', 'Separating Axis Theorem'],
        answer: 1,
        explanation: 'AABB compare les limites gauche/droite/haut/bas de deux boîtes. Si elles se chevauchent sur les deux axes, collision ! C\'est rapide et simple.'
      }
    }
  },

  {
    id: 'stm-036', type: 'mcq',
    lang: {
      es: {
        q: 'En el mapa de ArcLycée con Leaflet.js, ¿qué son los "tiles" que forman el mapa base?',
        options: ['Vectores SVG grandes', 'Pequeñas imágenes cuadradas que cubren el mapa', 'Un solo PNG enorme', 'Texto ASCII que forma la imagen'],
        answer: 1,
        explanation: 'Los tiles son imágenes pequeñas (256×256 px) que se cargan bajo demanda según el zoom y la posición. Es como un rompecabezas que se arma solo.'
      },
      en: {
        q: 'In ArcLycée\'s Leaflet.js map, what are the "tiles" that form the base map?',
        options: ['Large SVG vectors', 'Small square images that cover the map', 'One huge PNG', 'ASCII text forming the image'],
        answer: 1,
        explanation: 'Tiles are small images (256x256 px) loaded on demand based on zoom and position. It\'s like a puzzle that assembles itself.'
      },
      fr: {
        q: 'Dans la carte Leaflet.js d\'ArcLycée, que sont les "tuiles" qui forment la carte de base ?',
        options: ['De grands vecteurs SVG', 'De petites images carrées qui couvrent la carte', 'Un seul PNG énorme', 'Du texte ASCII formant l\'image'],
        answer: 1,
        explanation: 'Les tuiles sont de petites images (256×256 px) chargées à la demande selon le zoom et la position. C\'est comme un puzzle qui s\'assemble tout seul.'
      }
    }
  },

  {
    id: 'stm-037', type: 'mcq',
    lang: {
      es: {
        q: 'Si Tony Stark quisiera organizar el código de su armadura en archivos separados, ¿qué usaría en JavaScript moderno?',
        options: ['Variables globales en un solo archivo', 'ES Modules con import/export', 'jQuery plugins', 'Copiar y pegar en cada archivo'],
        answer: 1,
        explanation: 'ES Modules permiten dividir el código en archivos con responsabilidades claras. ArcLycée tiene 60+ módulos organizados así.'
      },
      en: {
        q: 'If Tony Stark wanted to organize his armor\'s code in separate files, what would he use in modern JavaScript?',
        options: ['Global variables in one file', 'ES Modules with import/export', 'jQuery plugins', 'Copy and paste into each file'],
        answer: 1,
        explanation: 'ES Modules let you split code into files with clear responsibilities. ArcLycée has 60+ modules organized this way.'
      },
      fr: {
        q: 'Si Tony Stark voulait organiser le code de son armure dans des fichiers séparés, qu\'utiliserait-il en JavaScript moderne ?',
        options: ['Des variables globales dans un seul fichier', 'Des modules ES avec import/export', 'Des plugins jQuery', 'Copier-coller dans chaque fichier'],
        answer: 1,
        explanation: 'Les modules ES permettent de diviser le code en fichiers avec des responsabilités claires. ArcLycée a plus de 60 modules organisés ainsi.'
      }
    }
  },

  {
    id: 'stm-038', type: 'mcq',
    lang: {
      es: {
        q: '¿Hasta cuántos años atrás puede fechar el Carbono-14 un objeto orgánico?',
        options: ['~5,000 años', '~50,000 años', '~500,000 años', '~5 millones de años'],
        answer: 1,
        explanation: 'El C-14 funciona hasta ~50,000 años (unas 8-9 vidas medias). Después de eso, queda tan poco C-14 que es imposible medir.'
      },
      en: {
        q: 'How far back can Carbon-14 date an organic object?',
        options: ['~5,000 years', '~50,000 years', '~500,000 years', '~5 million years'],
        answer: 1,
        explanation: 'C-14 works up to ~50,000 years (about 8-9 half-lives). After that, so little C-14 remains that it\'s impossible to measure.'
      },
      fr: {
        q: 'Jusqu\'à combien d\'années en arrière le Carbone-14 peut-il dater un objet organique ?',
        options: ['~5 000 ans', '~50 000 ans', '~500 000 ans', '~5 millions d\'années'],
        answer: 1,
        explanation: 'Le C-14 fonctionne jusqu\'à ~50 000 ans (environ 8-9 demi-vies). Au-delà, il reste trop peu de C-14 pour être mesuré.'
      }
    }
  },

  {
    id: 'stm-039', type: 'mcq',
    lang: {
      es: {
        q: 'En diseño de juegos, ¿qué es un "feedback loop" (bucle de retroalimentación)?',
        options: ['Un bug que congela el juego', 'Un ciclo donde las acciones del jugador producen resultados que influyen sus próximas acciones', 'Un cable que conecta los altavoces', 'El sonido que hace el micrófono cuando está muy cerca del altavoz'],
        answer: 1,
        explanation: 'Un feedback loop en juegos es cuando hacer algo produce una recompensa (o castigo) que te motiva a seguir. ¡Es lo que hace los juegos adictivos!'
      },
      en: {
        q: 'In game design, what is a "feedback loop"?',
        options: ['A bug that freezes the game', 'A cycle where player actions produce results that influence their next actions', 'A cable connecting speakers', 'The sound a microphone makes near a speaker'],
        answer: 1,
        explanation: 'A feedback loop in games is when doing something produces a reward (or punishment) that motivates you to keep going. It\'s what makes games addictive!'
      },
      fr: {
        q: 'En game design, qu\'est-ce qu\'une "boucle de rétroaction" (feedback loop) ?',
        options: ['Un bug qui gèle le jeu', 'Un cycle où les actions du joueur produisent des résultats qui influencent ses prochaines actions', 'Un câble reliant les enceintes', 'Le son que fait un micro près d\'une enceinte'],
        answer: 1,
        explanation: 'Une boucle de rétroaction en jeu est quand faire quelque chose produit une récompense (ou punition) qui motive à continuer. C\'est ce qui rend les jeux addictifs !'
      }
    }
  },

  {
    id: 'stm-040', type: 'mcq',
    lang: {
      es: {
        q: 'Phineas y Ferb quieren guardar sus planos. ¿Qué es un "commit" en Git?',
        options: ['Un archivo ZIP del proyecto', 'Una foto instantánea del estado del código con un mensaje descriptivo', 'El momento cuando borras un archivo', 'Un email que envías al equipo'],
        answer: 1,
        explanation: 'Un commit es como una foto del código en un momento dado, con un mensaje que explica qué cambiaste y por qué. ¡Es la base del control de versiones!'
      },
      en: {
        q: 'Phineas and Ferb want to save their blueprints. What is a "commit" in Git?',
        options: ['A ZIP file of the project', 'A snapshot of the code\'s state with a descriptive message', 'The moment you delete a file', 'An email you send to the team'],
        answer: 1,
        explanation: 'A commit is like a photo of the code at a given moment, with a message explaining what you changed and why. It\'s the foundation of version control!'
      },
      fr: {
        q: 'Phineas et Ferb veulent sauvegarder leurs plans. Qu\'est-ce qu\'un "commit" en Git ?',
        options: ['Un fichier ZIP du projet', 'Un instantané de l\'état du code avec un message descriptif', 'Le moment où on supprime un fichier', 'Un email qu\'on envoie à l\'équipe'],
        answer: 1,
        explanation: 'Un commit est comme une photo du code à un moment donné, avec un message expliquant ce qu\'on a changé et pourquoi. C\'est la base du contrôle de versions !'
      }
    }
  },

  {
    id: 'stm-041', type: 'mcq',
    lang: {
      es: {
        q: '¿Por qué la gravedad en un juego TAMBIÉN debe multiplicarse por dt (delta time)?',
        options: ['Para que los personajes floten', 'Para que la caída sea realista sin importar los fps del computador', 'Para ahorrar memoria RAM', 'Para que el sonido se sincronice'],
        answer: 1,
        explanation: 'Si la gravedad no se escala con dt, un PC lento (bajo fps) aplicará menos gravedad por segundo que uno rápido. ¡El personaje caería a diferentes velocidades según tu computador!'
      },
      en: {
        q: 'Why must gravity in a game ALSO be multiplied by dt (delta time)?',
        options: ['To make characters float', 'So falling is realistic regardless of the computer\'s fps', 'To save RAM', 'To sync the sound'],
        answer: 1,
        explanation: 'If gravity isn\'t scaled by dt, a slow PC (low fps) would apply less gravity per second than a fast one. The character would fall at different speeds depending on your computer!'
      },
      fr: {
        q: 'Pourquoi la gravité dans un jeu doit-elle AUSSI être multipliée par dt (delta time) ?',
        options: ['Pour faire flotter les personnages', 'Pour que la chute soit réaliste quel que soit le fps de l\'ordinateur', 'Pour économiser la RAM', 'Pour synchroniser le son'],
        answer: 1,
        explanation: 'Si la gravité n\'est pas mise à l\'échelle avec dt, un PC lent (bas fps) appliquerait moins de gravité par seconde qu\'un rapide. Le personnage tomberait à des vitesses différentes selon l\'ordi !'
      }
    }
  },

  {
    id: 'stm-042', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué categoría de bloques en Scratch contiene "repetir", "si...entonces" y "esperar"?',
        options: ['Movimiento', 'Apariencia', 'Control', 'Sensores'],
        answer: 2,
        explanation: 'La categoría Control (naranja) tiene los bloques de flujo: bucles (repetir), condicionales (si...entonces) y esperas. ¡Son el cerebro de tu programa!'
      },
      en: {
        q: 'Which Scratch block category contains "repeat", "if...then", and "wait"?',
        options: ['Motion', 'Looks', 'Control', 'Sensing'],
        answer: 2,
        explanation: 'The Control category (orange) has flow blocks: loops (repeat), conditionals (if...then), and waits. They\'re the brain of your program!'
      },
      fr: {
        q: 'Quelle catégorie de blocs Scratch contient "répéter", "si...alors" et "attendre" ?',
        options: ['Mouvement', 'Apparence', 'Contrôle', 'Capteurs'],
        answer: 2,
        explanation: 'La catégorie Contrôle (orange) a les blocs de flux : boucles (répéter), conditions (si...alors) et attentes. C\'est le cerveau de votre programme !'
      }
    }
  },

  {
    id: 'stm-043', type: 'mcq',
    lang: {
      es: {
        q: 'ArcLycée genera sus sprites SIN imágenes externas. ¿Qué método del Canvas dibuja un rectángulo relleno?',
        options: ['drawImage()', 'fillRect()', 'strokeText()', 'clearRect()'],
        answer: 1,
        explanation: 'fillRect(x, y, ancho, alto) dibuja un rectángulo sólido del color actual. Es el bloque básico del pixel art programático en ArcLycée.'
      },
      en: {
        q: 'ArcLycée generates its sprites WITHOUT external images. Which Canvas method draws a filled rectangle?',
        options: ['drawImage()', 'fillRect()', 'strokeText()', 'clearRect()'],
        answer: 1,
        explanation: 'fillRect(x, y, width, height) draws a solid rectangle in the current color. It\'s the basic building block of ArcLycée\'s programmatic pixel art.'
      },
      fr: {
        q: 'ArcLycée génère ses sprites SANS images externes. Quelle méthode du Canvas dessine un rectangle rempli ?',
        options: ['drawImage()', 'fillRect()', 'strokeText()', 'clearRect()'],
        answer: 1,
        explanation: 'fillRect(x, y, largeur, hauteur) dessine un rectangle plein de la couleur courante. C\'est la brique de base du pixel art programmatique d\'ArcLycée.'
      }
    }
  },

  {
    id: 'stm-044', type: 'mcq',
    lang: {
      es: {
        q: 'En FIRST LEGO League, ¿cuánto tiempo tiene el robot para completar las misiones en el tapete?',
        options: ['30 segundos', '1 minuto', '2 minutos 30 segundos', '10 minutos'],
        answer: 2,
        explanation: 'El robot tiene 2 minutos 30 segundos (150 segundos) para completar tantas misiones como pueda. ¡Cada segundo cuenta!'
      },
      en: {
        q: 'In FIRST LEGO League, how much time does the robot have to complete missions on the mat?',
        options: ['30 seconds', '1 minute', '2 minutes 30 seconds', '10 minutes'],
        answer: 2,
        explanation: 'The robot has 2 minutes 30 seconds (150 seconds) to complete as many missions as possible. Every second counts!'
      },
      fr: {
        q: 'En FIRST LEGO League, combien de temps le robot a-t-il pour compléter les missions sur le tapis ?',
        options: ['30 secondes', '1 minute', '2 minutes 30 secondes', '10 minutes'],
        answer: 2,
        explanation: 'Le robot a 2 minutes 30 secondes (150 secondes) pour compléter autant de missions que possible. Chaque seconde compte !'
      }
    }
  },

  {
    id: 'stm-045', type: 'mcq',
    lang: {
      es: {
        q: 'Si Cyborg quisiera dibujar un círculo en Canvas 2D, ¿qué método usaría?',
        options: ['fillCircle()', 'arc() con beginPath()', 'drawOval()', 'circle()'],
        answer: 1,
        explanation: 'Canvas 2D no tiene un método directo para círculos. Se usa arc(x, y, radio, 0, Math.PI*2) dentro de un path. ¡Cyborg aprobaría la precisión matemática!'
      },
      en: {
        q: 'If Cyborg wanted to draw a circle on Canvas 2D, which method would he use?',
        options: ['fillCircle()', 'arc() with beginPath()', 'drawOval()', 'circle()'],
        answer: 1,
        explanation: 'Canvas 2D has no direct circle method. You use arc(x, y, radius, 0, Math.PI*2) inside a path. Cyborg would approve of the mathematical precision!'
      },
      fr: {
        q: 'Si Cyborg voulait dessiner un cercle sur Canvas 2D, quelle méthode utiliserait-il ?',
        options: ['fillCircle()', 'arc() avec beginPath()', 'drawOval()', 'circle()'],
        answer: 1,
        explanation: 'Canvas 2D n\'a pas de méthode directe pour les cercles. On utilise arc(x, y, rayon, 0, Math.PI*2) dans un path. Cyborg approuverait la précision mathématique !'
      }
    }
  },

  {
    id: 'stm-046', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué mide la datación por Carbono-14 en un objeto antiguo?',
        options: ['La cantidad de carbono total', 'La proporción de C-14 que se ha desintegrado por decaimiento radiactivo', 'El peso del objeto', 'La temperatura a la que fue creado'],
        answer: 1,
        explanation: 'Se compara cuánto C-14 queda versus cuánto debería haber. Menos C-14 = más antiguo. Es como un reloj atómico que nunca se detiene.'
      },
      en: {
        q: 'What does Carbon-14 dating measure in an ancient object?',
        options: ['Total carbon amount', 'The proportion of C-14 that has decayed through radioactive decay', 'The object\'s weight', 'The temperature at which it was created'],
        answer: 1,
        explanation: 'It compares how much C-14 remains versus how much should be there. Less C-14 = older. It\'s like an atomic clock that never stops.'
      },
      fr: {
        q: 'Que mesure la datation au Carbone-14 dans un objet ancien ?',
        options: ['La quantité totale de carbone', 'La proportion de C-14 qui s\'est désintégrée par décroissance radioactive', 'Le poids de l\'objet', 'La température à laquelle il a été créé'],
        answer: 1,
        explanation: 'On compare combien de C-14 il reste par rapport à ce qu\'il devrait y avoir. Moins de C-14 = plus ancien. C\'est comme une horloge atomique qui ne s\'arrête jamais.'
      }
    }
  },

  {
    id: 'stm-047', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué principio de game design da al jugador la sensación de que sus decisiones importan?',
        options: ['Difficulty spike', 'Player agency (agencia del jugador)', 'Pay-to-win', 'Rubber banding'],
        answer: 1,
        explanation: 'Player agency es cuando tus decisiones tienen consecuencias reales. ArcLycée lo logra con su sistema de múltiples finales basados en tus elecciones pacifistas o violentas.'
      },
      en: {
        q: 'Which game design principle gives the player the feeling that their decisions matter?',
        options: ['Difficulty spike', 'Player agency', 'Pay-to-win', 'Rubber banding'],
        answer: 1,
        explanation: 'Player agency is when your decisions have real consequences. ArcLycée achieves this with its multiple endings system based on pacifist or violent choices.'
      },
      fr: {
        q: 'Quel principe de game design donne au joueur le sentiment que ses décisions comptent ?',
        options: ['Pic de difficulté', 'Agentivité du joueur (player agency)', 'Pay-to-win', 'Rubber banding'],
        answer: 1,
        explanation: 'L\'agentivité du joueur, c\'est quand vos décisions ont de vraies conséquences. ArcLycée y parvient avec son système de fins multiples basées sur vos choix pacifistes ou violents.'
      }
    }
  },

  {
    id: 'stm-048', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuál es la ventaja principal de la impresión 3D para prototipar inventos, como haría Franky de One Piece?',
        options: ['Es más barata que comprar madera', 'Permite crear formas complejas rápidamente sin herramientas especiales', 'Solo funciona con plástico', 'Requiere una fábrica entera'],
        answer: 1,
        explanation: 'La impresión 3D permite pasar de un diseño digital a un objeto físico en horas, sin moldes ni herramientas costosas. ¡Perfecto para prototipos SUPER rápidos!'
      },
      en: {
        q: 'What is the main advantage of 3D printing for prototyping inventions, like Franky from One Piece would?',
        options: ['It\'s cheaper than buying wood', 'It can create complex shapes quickly without special tools', 'It only works with plastic', 'It requires an entire factory'],
        answer: 1,
        explanation: '3D printing lets you go from a digital design to a physical object in hours, without molds or expensive tools. Perfect for SUPER fast prototypes!'
      },
      fr: {
        q: 'Quel est le principal avantage de l\'impression 3D pour prototyper des inventions, comme le ferait Franky de One Piece ?',
        options: ['C\'est moins cher que d\'acheter du bois', 'Elle peut créer des formes complexes rapidement sans outils spéciaux', 'Elle ne fonctionne qu\'avec du plastique', 'Elle nécessite une usine entière'],
        answer: 1,
        explanation: 'L\'impression 3D permet de passer d\'un design numérique à un objet physique en quelques heures, sans moules ni outils coûteux. Parfait pour des prototypes SUPER rapides !'
      }
    }
  },

  {
    id: 'stm-049', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué tipo de onda produce un oscilador "sine" (sinusoidal) en la Web Audio API?',
        options: ['Un sonido áspero y distorsionado', 'Un tono puro y suave, como un silbido', 'Un ruido blanco aleatorio', 'Un sonido de percusión'],
        answer: 1,
        explanation: 'La onda sinusoidal es la más simple y pura: un solo tono sin armónicos. Suena como un silbido o un "beep" suave. ¡Es la base de todos los sonidos!'
      },
      en: {
        q: 'What kind of sound does a "sine" oscillator produce in the Web Audio API?',
        options: ['A harsh, distorted sound', 'A pure, smooth tone like a whistle', 'Random white noise', 'A percussion sound'],
        answer: 1,
        explanation: 'A sine wave is the simplest and purest: a single tone with no harmonics. It sounds like a whistle or a soft "beep." It\'s the basis of all sounds!'
      },
      fr: {
        q: 'Quel type de son produit un oscillateur "sine" (sinusoïdal) dans la Web Audio API ?',
        options: ['Un son rauque et distordu', 'Un ton pur et doux, comme un sifflement', 'Du bruit blanc aléatoire', 'Un son de percussion'],
        answer: 1,
        explanation: 'L\'onde sinusoïdale est la plus simple et pure : un seul ton sans harmoniques. Elle sonne comme un sifflement ou un "bip" doux. C\'est la base de tous les sons !'
      }
    }
  },

  {
    id: 'stm-050', type: 'mcq',
    lang: {
      es: {
        q: 'En el mapa de ArcLycée, ¿cuántas capas de datos arqueológicos tiene el mapa interactivo con Leaflet.js?',
        options: ['2 capas', '4 capas', '6 capas', '10 capas'],
        answer: 2,
        explanation: '6 capas: Taínos (16), Coloniales (8), Naufragios (12), Museos (30), Inexplorados (8) y Potencial Arqueológico (15). ¡Más de 70 marcadores reales!'
      },
      en: {
        q: 'In ArcLycée\'s map, how many archaeological data layers does the Leaflet.js interactive map have?',
        options: ['2 layers', '4 layers', '6 layers', '10 layers'],
        answer: 2,
        explanation: '6 layers: Taíno (16), Colonial (8), Shipwrecks (12), Museums (30), Unexplored (8), and Archaeological Potential (15). Over 70 real markers!'
      },
      fr: {
        q: 'Dans la carte d\'ArcLycée, combien de couches de données archéologiques la carte interactive Leaflet.js possède-t-elle ?',
        options: ['2 couches', '4 couches', '6 couches', '10 couches'],
        answer: 2,
        explanation: '6 couches : Taïnos (16), Coloniaux (8), Épaves (12), Musées (30), Inexplorés (8) et Potentiel Archéologique (15). Plus de 70 marqueurs réels !'
      }
    }
  },

  // =====================================================================
  //  FILL IN THE BLANK  (stm-051 → stm-075)
  // =====================================================================

  {
    id: 'stm-051', type: 'fill',
    lang: {
      es: {
        q: 'La vida media del Carbono-14 es de _____ años.',
        answer: '5730',
        explanation: '5730 años: después de ese tiempo, la mitad de los átomos de C-14 se han desintegrado en Nitrógeno-14.'
      },
      en: {
        q: 'The half-life of Carbon-14 is _____ years.',
        answer: '5730',
        explanation: '5,730 years: after that time, half of the C-14 atoms have decayed into Nitrogen-14.'
      },
      fr: {
        q: 'La demi-vie du Carbone-14 est de _____ ans.',
        answer: '5730',
        explanation: '5 730 ans : après cette période, la moitié des atomes de C-14 se sont désintégrés en Azote-14.'
      }
    }
  },

  {
    id: 'stm-052', type: 'fill',
    lang: {
      es: {
        q: 'El game loop estándar corre a _____ frames por segundo.',
        answer: '60',
        explanation: '60 fps es el estándar, sincronizado con la mayoría de monitores. requestAnimationFrame se encarga de mantener este ritmo.'
      },
      en: {
        q: 'A standard game loop runs at _____ frames per second.',
        answer: '60',
        explanation: '60 fps is the standard, synced with most monitors. requestAnimationFrame handles keeping this pace.'
      },
      fr: {
        q: 'La boucle de jeu standard tourne à _____ images par seconde.',
        answer: '60',
        explanation: '60 fps est le standard, synchronisé avec la plupart des moniteurs. requestAnimationFrame se charge de maintenir ce rythme.'
      }
    }
  },

  {
    id: 'stm-053', type: 'fill',
    lang: {
      es: {
        q: 'En ArcLycée, la fórmula para movimiento independiente del framerate es: factorTiempo = _____ * 60',
        answer: 'dt',
        explanation: 'dt (delta time) es el tiempo entre frames. Multiplicarlo por 60 normaliza el movimiento para que sea consistente a cualquier framerate.'
      },
      en: {
        q: 'In ArcLycée, the formula for frame-rate independent movement is: factorTiempo = _____ * 60',
        answer: 'dt',
        explanation: 'dt (delta time) is the time between frames. Multiplying it by 60 normalizes movement to be consistent at any framerate.'
      },
      fr: {
        q: 'Dans ArcLycée, la formule pour un mouvement indépendant du framerate est : factorTiempo = _____ * 60',
        answer: 'dt',
        explanation: 'dt (delta time) est le temps entre les images. Le multiplier par 60 normalise le mouvement pour qu\'il soit constant à tout framerate.'
      }
    }
  },

  {
    id: 'stm-054', type: 'fill',
    lang: {
      es: {
        q: 'ROV significa Remotely _____ Vehicle, un robot submarino controlado desde la superficie.',
        answer: 'Operated',
        explanation: 'Remotely Operated Vehicle = Vehículo Operado Remotamente. Se controla a distancia por cable, a diferencia de un AUV que es autónomo.'
      },
      en: {
        q: 'ROV stands for Remotely _____ Vehicle, a submarine robot controlled from the surface.',
        answer: 'Operated',
        explanation: 'Remotely Operated Vehicle. Controlled remotely via cable, unlike an AUV which is autonomous.'
      },
      fr: {
        q: 'ROV signifie Remotely _____ Vehicle, un robot sous-marin contrôlé depuis la surface.',
        answer: 'Operated',
        explanation: 'Remotely Operated Vehicle = Véhicule télécommandé. Contrôlé à distance par câble, contrairement à un AUV qui est autonome.'
      }
    }
  },

  {
    id: 'stm-055', type: 'fill',
    lang: {
      es: {
        q: 'AABB significa Axis-Aligned _____ Box, un método de detección de colisiones en juegos.',
        answer: 'Bounding',
        explanation: 'Axis-Aligned Bounding Box: una caja rectangular que envuelve un objeto y está alineada con los ejes X e Y. Simple y rápida.'
      },
      en: {
        q: 'AABB stands for Axis-Aligned _____ Box, a collision detection method in games.',
        answer: 'Bounding',
        explanation: 'Axis-Aligned Bounding Box: a rectangular box that wraps an object and is aligned with the X and Y axes. Simple and fast.'
      },
      fr: {
        q: 'AABB signifie Axis-Aligned _____ Box, une méthode de détection de collisions dans les jeux.',
        answer: 'Bounding',
        explanation: 'Axis-Aligned Bounding Box : une boîte rectangulaire qui enveloppe un objet et est alignée avec les axes X et Y. Simple et rapide.'
      }
    }
  },

  {
    id: 'stm-056', type: 'fill',
    lang: {
      es: {
        q: 'En JavaScript, para importar una función de otro archivo se usa: import { funcion } from \'./_____.js\'',
        answer: 'archivo',
        explanation: 'ES Modules usan import/export para compartir código entre archivos. Se pone la ruta relativa al archivo que contiene lo que necesitas.'
      },
      en: {
        q: 'In JavaScript, to import a function from another file you use: import { func } from \'./_____.js\'',
        answer: 'file',
        explanation: 'ES Modules use import/export to share code between files. You provide the relative path to the file containing what you need.'
      },
      fr: {
        q: 'En JavaScript, pour importer une fonction d\'un autre fichier, on utilise : import { fonction } from \'./_____.js\'',
        answer: 'fichier',
        explanation: 'Les modules ES utilisent import/export pour partager du code entre fichiers. On indique le chemin relatif vers le fichier qui contient ce dont on a besoin.'
      }
    }
  },

  {
    id: 'stm-057', type: 'fill',
    lang: {
      es: {
        q: 'ArcLycée genera sus _____ efectos de sonido con Web Audio API, sin archivos de audio.',
        answer: '57',
        explanation: '57 efectos de sonido procedurales, desde pisadas hasta truenos, todos creados con osciladores y filtros de la Web Audio API.'
      },
      en: {
        q: 'ArcLycée generates its _____ sound effects with the Web Audio API, without audio files.',
        answer: '57',
        explanation: '57 procedural sound effects, from footsteps to thunder, all created with Web Audio API oscillators and filters.'
      },
      fr: {
        q: 'ArcLycée génère ses _____ effets sonores avec la Web Audio API, sans fichiers audio.',
        answer: '57',
        explanation: '57 effets sonores procéduraux, des pas aux tonnerres, tous créés avec des oscillateurs et filtres de la Web Audio API.'
      }
    }
  },

  {
    id: 'stm-058', type: 'fill',
    lang: {
      es: {
        q: 'Scratch es un lenguaje de programación basado en _____ que se arrastran y conectan.',
        answer: 'bloques',
        explanation: 'Los bloques de Scratch son piezas visuales que encajan como un rompecabezas. Es programación sin escribir texto, ideal para principiantes.'
      },
      en: {
        q: 'Scratch is a programming language based on _____ that you drag and connect.',
        answer: 'blocks',
        explanation: 'Scratch blocks are visual pieces that snap together like a puzzle. It\'s programming without typing text, ideal for beginners.'
      },
      fr: {
        q: 'Scratch est un langage de programmation basé sur des _____ qu\'on glisse et connecte.',
        answer: 'blocs',
        explanation: 'Les blocs Scratch sont des pièces visuelles qui s\'emboîtent comme un puzzle. C\'est de la programmation sans écrire de texte, idéal pour les débutants.'
      }
    }
  },

  {
    id: 'stm-059', type: 'fill',
    lang: {
      es: {
        q: 'La función request_____Frame() sincroniza el game loop con la tasa de refresco del monitor.',
        answer: 'Animation',
        explanation: 'requestAnimationFrame() le dice al navegador que quieres dibujar un nuevo frame. El navegador lo llama cuando está listo, generalmente a 60fps.'
      },
      en: {
        q: 'The request_____Frame() function syncs the game loop with the monitor\'s refresh rate.',
        answer: 'Animation',
        explanation: 'requestAnimationFrame() tells the browser you want to draw a new frame. The browser calls it when ready, usually at 60fps.'
      },
      fr: {
        q: 'La fonction request_____Frame() synchronise la boucle de jeu avec le taux de rafraîchissement du moniteur.',
        answer: 'Animation',
        explanation: 'requestAnimationFrame() dit au navigateur que vous voulez dessiner une nouvelle image. Le navigateur l\'appelle quand il est prêt, généralement à 60fps.'
      }
    }
  },

  {
    id: 'stm-060', type: 'fill',
    lang: {
      es: {
        q: 'En Canvas 2D, el método fill_____() dibuja un rectángulo sólido relleno del color actual.',
        answer: 'Rect',
        explanation: 'fillRect(x, y, ancho, alto) es el método fundamental para dibujar rectángulos sólidos. ArcLycée lo usa para construir cada píxel de sus sprites.'
      },
      en: {
        q: 'In Canvas 2D, the fill_____() method draws a solid rectangle filled with the current color.',
        answer: 'Rect',
        explanation: 'fillRect(x, y, width, height) is the fundamental method for drawing solid rectangles. ArcLycée uses it to build every pixel of its sprites.'
      },
      fr: {
        q: 'En Canvas 2D, la méthode fill_____() dessine un rectangle plein rempli de la couleur courante.',
        answer: 'Rect',
        explanation: 'fillRect(x, y, largeur, hauteur) est la méthode fondamentale pour dessiner des rectangles pleins. ArcLycée l\'utilise pour construire chaque pixel de ses sprites.'
      }
    }
  },

  {
    id: 'stm-061', type: 'fill',
    lang: {
      es: {
        q: 'Un magnetómetro mide campos _____ para detectar artefactos metálicos enterrados.',
        answer: 'magnéticos',
        explanation: 'Los campos magnéticos de la Tierra se distorsionan cuando hay metal cerca. El magnetómetro detecta estas anomalías sin necesidad de cavar.'
      },
      en: {
        q: 'A magnetometer measures _____ fields to detect buried metal artifacts.',
        answer: 'magnetic',
        explanation: 'Earth\'s magnetic fields get distorted when metal is nearby. The magnetometer detects these anomalies without needing to dig.'
      },
      fr: {
        q: 'Un magnétomètre mesure les champs _____ pour détecter des artefacts métalliques enterrés.',
        answer: 'magnétiques',
        explanation: 'Les champs magnétiques de la Terre se déforment quand du métal est proche. Le magnétomètre détecte ces anomalies sans avoir besoin de creuser.'
      }
    }
  },

  {
    id: 'stm-062', type: 'fill',
    lang: {
      es: {
        q: 'La impresión 3D es un tipo de fabricación _____ porque construye capa por capa.',
        answer: 'aditiva',
        explanation: 'Aditiva = agregar material. Lo opuesto es sustractiva (quitar material, como tallar madera). La impresión 3D agrega plástico capa a capa.'
      },
      en: {
        q: '3D printing is a type of _____ manufacturing because it builds layer by layer.',
        answer: 'additive',
        explanation: 'Additive = adding material. The opposite is subtractive (removing material, like carving wood). 3D printing adds plastic layer by layer.'
      },
      fr: {
        q: 'L\'impression 3D est un type de fabrication _____ car elle construit couche par couche.',
        answer: 'additive',
        explanation: 'Additive = ajouter du matériau. L\'opposé est soustractive (enlever du matériau, comme sculpter du bois). L\'impression 3D ajoute du plastique couche par couche.'
      }
    }
  },

  {
    id: 'stm-063', type: 'fill',
    lang: {
      es: {
        q: 'En Git, un _____ es una versión paralela del código donde puedes experimentar sin afectar la versión principal.',
        answer: 'branch',
        explanation: 'Un branch (rama) te permite trabajar en una copia independiente del código. Cuando terminas, haces merge para unir los cambios.'
      },
      en: {
        q: 'In Git, a _____ is a parallel version of the code where you can experiment without affecting the main version.',
        answer: 'branch',
        explanation: 'A branch lets you work on an independent copy of the code. When done, you merge to combine the changes.'
      },
      fr: {
        q: 'En Git, une _____ est une version parallèle du code où on peut expérimenter sans affecter la version principale.',
        answer: 'branche',
        explanation: 'Une branche permet de travailler sur une copie indépendante du code. Quand c\'est fini, on fait un merge pour combiner les changements.'
      }
    }
  },

  {
    id: 'stm-064', type: 'fill',
    lang: {
      es: {
        q: 'Las coordenadas GPS usan _____ (norte/sur) y longitud (este/oeste) para ubicar un punto en la Tierra.',
        answer: 'latitud',
        explanation: 'Latitud va de -90° (polo sur) a +90° (polo norte). Longitud va de -180° a +180°. Juntas forman la dirección exacta de cualquier lugar.'
      },
      en: {
        q: 'GPS coordinates use _____ (north/south) and longitude (east/west) to locate a point on Earth.',
        answer: 'latitude',
        explanation: 'Latitude goes from -90° (south pole) to +90° (north pole). Longitude goes from -180° to +180°. Together they form the exact address of any place.'
      },
      fr: {
        q: 'Les coordonnées GPS utilisent la _____ (nord/sud) et la longitude (est/ouest) pour localiser un point sur Terre.',
        answer: 'latitude',
        explanation: 'La latitude va de -90° (pôle sud) à +90° (pôle nord). La longitude va de -180° à +180°. Ensemble, elles forment l\'adresse exacte de n\'importe quel lieu.'
      }
    }
  },

  {
    id: 'stm-065', type: 'fill',
    lang: {
      es: {
        q: 'En la Web Audio API, un _____ genera ondas de sonido de diferentes formas (sine, square, sawtooth).',
        answer: 'oscilador',
        explanation: 'El OscillatorNode produce ondas periódicas. Cada forma (sine, square, sawtooth, triangle) tiene un timbre diferente que se puede combinar y filtrar.'
      },
      en: {
        q: 'In the Web Audio API, an _____ generates sound waves of different shapes (sine, square, sawtooth).',
        answer: 'oscillator',
        explanation: 'The OscillatorNode produces periodic waves. Each shape (sine, square, sawtooth, triangle) has a different timbre that can be combined and filtered.'
      },
      fr: {
        q: 'Dans la Web Audio API, un _____ génère des ondes sonores de différentes formes (sine, square, sawtooth).',
        answer: 'oscillateur',
        explanation: 'L\'OscillatorNode produit des ondes périodiques. Chaque forme (sine, square, sawtooth, triangle) a un timbre différent qu\'on peut combiner et filtrer.'
      }
    }
  },

  {
    id: 'stm-066', type: 'fill',
    lang: {
      es: {
        q: 'El C-14 solo sirve para datar materiales _____ como madera, huesos y conchas.',
        answer: 'orgánicos',
        explanation: 'El Carbono-14 se incorpora a los seres vivos mientras están vivos. Al morir, deja de incorporarse y empieza a desintegrarse. Por eso solo funciona con materia orgánica.'
      },
      en: {
        q: 'C-14 only works for dating _____ materials like wood, bones, and shells.',
        answer: 'organic',
        explanation: 'Carbon-14 is incorporated into living things while alive. When they die, it stops being incorporated and starts decaying. That\'s why it only works with organic matter.'
      },
      fr: {
        q: 'Le C-14 ne sert qu\'à dater des matériaux _____ comme le bois, les os et les coquillages.',
        answer: 'organiques',
        explanation: 'Le Carbone-14 est incorporé dans les êtres vivants tant qu\'ils sont vivants. À la mort, il cesse d\'être incorporé et commence à se désintégrer. C\'est pourquoi il ne fonctionne qu\'avec la matière organique.'
      }
    }
  },

  {
    id: 'stm-067', type: 'fill',
    lang: {
      es: {
        q: 'ArcLycée usa la librería _____.js para mostrar mapas interactivos con marcadores arqueológicos reales.',
        answer: 'Leaflet',
        explanation: 'Leaflet.js es una librería JavaScript open-source para mapas interactivos. ArcLycée la usa para su mapa de referencia con 6 capas de datos y 70+ marcadores.'
      },
      en: {
        q: 'ArcLycée uses the _____.js library to display interactive maps with real archaeological markers.',
        answer: 'Leaflet',
        explanation: 'Leaflet.js is an open-source JavaScript library for interactive maps. ArcLycée uses it for its reference map with 6 data layers and 70+ markers.'
      },
      fr: {
        q: 'ArcLycée utilise la bibliothèque _____.js pour afficher des cartes interactives avec de vrais marqueurs archéologiques.',
        answer: 'Leaflet',
        explanation: 'Leaflet.js est une bibliothèque JavaScript open-source pour les cartes interactives. ArcLycée l\'utilise pour sa carte de référence avec 6 couches de données et 70+ marqueurs.'
      }
    }
  },

  {
    id: 'stm-068', type: 'fill',
    lang: {
      es: {
        q: 'En diseño de juegos, una curva de _____ bien diseñada sube gradualmente para mantener al jugador en estado de "flow".',
        answer: 'dificultad',
        explanation: 'La curva de dificultad define cómo el reto aumenta con el tiempo. Muy fácil = aburrido. Muy difícil de golpe = frustración. El equilibrio perfecto = flow.'
      },
      en: {
        q: 'In game design, a well-designed _____ curve ramps up gradually to keep the player in a state of "flow."',
        answer: 'difficulty',
        explanation: 'The difficulty curve defines how challenge increases over time. Too easy = boring. Too hard suddenly = frustration. Perfect balance = flow.'
      },
      fr: {
        q: 'En game design, une courbe de _____ bien conçue monte progressivement pour maintenir le joueur en état de "flow".',
        answer: 'difficulté',
        explanation: 'La courbe de difficulté définit comment le défi augmente au fil du temps. Trop facile = ennuyeux. Trop difficile d\'un coup = frustration. L\'équilibre parfait = flow.'
      }
    }
  },

  {
    id: 'stm-069', type: 'fill',
    lang: {
      es: {
        q: 'En un juego 2D, la gravedad se simula sumando una _____ constante a la velocidad vertical en cada frame.',
        answer: 'aceleración',
        explanation: 'La gravedad es una aceleración (9.8 m/s² en la vida real). En cada frame, velocidadY += gravedad * dt. ¡La misma física de Newton aplicada a píxeles!'
      },
      en: {
        q: 'In a 2D game, gravity is simulated by adding a constant _____ to the vertical velocity each frame.',
        answer: 'acceleration',
        explanation: 'Gravity is an acceleration (9.8 m/s² in real life). Each frame, velocityY += gravity * dt. Newton\'s same physics applied to pixels!'
      },
      fr: {
        q: 'Dans un jeu 2D, la gravité est simulée en ajoutant une _____ constante à la vitesse verticale à chaque image.',
        answer: 'accélération',
        explanation: 'La gravité est une accélération (9,8 m/s² dans la vie réelle). À chaque image, vitesseY += gravite * dt. La même physique de Newton appliquée aux pixels !'
      }
    }
  },

  {
    id: 'stm-070', type: 'fill',
    lang: {
      es: {
        q: 'ArcLycée usa HTML5 _____ como su tecnología de renderizado para dibujar todo el juego.',
        answer: 'Canvas',
        explanation: 'HTML5 Canvas proporciona un lienzo de dibujo 2D donde JavaScript puede pintar píxeles directamente. Todo el renderizado de ArcLycée pasa por su API.'
      },
      en: {
        q: 'ArcLycée uses HTML5 _____ as its rendering technology to draw the entire game.',
        answer: 'Canvas',
        explanation: 'HTML5 Canvas provides a 2D drawing surface where JavaScript can paint pixels directly. All of ArcLycée\'s rendering goes through its API.'
      },
      fr: {
        q: 'ArcLycée utilise HTML5 _____ comme technologie de rendu pour dessiner tout le jeu.',
        answer: 'Canvas',
        explanation: 'HTML5 Canvas fournit une surface de dessin 2D où JavaScript peut peindre des pixels directement. Tout le rendu d\'ArcLycée passe par son API.'
      }
    }
  },

  {
    id: 'stm-071', type: 'fill',
    lang: {
      es: {
        q: 'En programación, _____ modules permiten dividir el código en archivos separados con import y export.',
        answer: 'ES',
        explanation: 'ES Modules (ECMAScript Modules) son el estándar moderno de JavaScript para modularizar código. ArcLycée tiene más de 60 módulos organizados así.'
      },
      en: {
        q: 'In programming, _____ modules allow splitting code into separate files with import and export.',
        answer: 'ES',
        explanation: 'ES Modules (ECMAScript Modules) are the modern JavaScript standard for modularizing code. ArcLycée has over 60 modules organized this way.'
      },
      fr: {
        q: 'En programmation, les modules _____ permettent de diviser le code en fichiers séparés avec import et export.',
        answer: 'ES',
        explanation: 'Les modules ES (ECMAScript Modules) sont le standard moderne de JavaScript pour modulariser le code. ArcLycée a plus de 60 modules organisés ainsi.'
      }
    }
  },

  {
    id: 'stm-072', type: 'fill',
    lang: {
      es: {
        q: 'En Git, un _____ es una instantánea del código con un mensaje que describe los cambios realizados.',
        answer: 'commit',
        explanation: 'Cada commit guarda el estado exacto del código en ese momento, con un mensaje explicativo. Es como tomar una foto con una nota adhesiva.'
      },
      en: {
        q: 'In Git, a _____ is a snapshot of the code with a message describing the changes made.',
        answer: 'commit',
        explanation: 'Each commit saves the exact state of the code at that moment, with an explanatory message. It\'s like taking a photo with a sticky note.'
      },
      fr: {
        q: 'En Git, un _____ est un instantané du code avec un message décrivant les modifications effectuées.',
        answer: 'commit',
        explanation: 'Chaque commit sauvegarde l\'état exact du code à ce moment-là, avec un message explicatif. C\'est comme prendre une photo avec un post-it.'
      }
    }
  },

  {
    id: 'stm-073', type: 'fill',
    lang: {
      es: {
        q: 'En FLL, el robot debe ser completamente _____, sin control remoto durante la competencia.',
        answer: 'autónomo',
        explanation: 'El programa se descarga al robot antes de la ronda. Una vez que empieza, no puedes tocarlo ni controlarlo. ¡Tiene que hacer todo solo!'
      },
      en: {
        q: 'In FLL, the robot must be completely _____, with no remote control during the competition.',
        answer: 'autonomous',
        explanation: 'The program is downloaded to the robot before the round. Once it starts, you can\'t touch or control it. It has to do everything on its own!'
      },
      fr: {
        q: 'En FLL, le robot doit être complètement _____, sans télécommande pendant la compétition.',
        answer: 'autonome',
        explanation: 'Le programme est téléchargé dans le robot avant la manche. Une fois lancé, on ne peut ni le toucher ni le contrôler. Il doit tout faire seul !'
      }
    }
  },

  {
    id: 'stm-074', type: 'fill',
    lang: {
      es: {
        q: 'El delta _____ (dt) mide los segundos transcurridos entre un frame y el siguiente del game loop.',
        answer: 'time',
        explanation: 'Delta time = diferencia de tiempo entre frames. Si tu PC es lento, dt será grande. Si es rápido, dt será pequeño. Se usa para normalizar el movimiento.'
      },
      en: {
        q: 'Delta _____ (dt) measures the seconds elapsed between one game loop frame and the next.',
        answer: 'time',
        explanation: 'Delta time = time difference between frames. If your PC is slow, dt will be large. If fast, dt will be small. Used to normalize movement.'
      },
      fr: {
        q: 'Le delta _____ (dt) mesure les secondes écoulées entre une image de la boucle de jeu et la suivante.',
        answer: 'time',
        explanation: 'Delta time = différence de temps entre les images. Si votre PC est lent, dt sera grand. S\'il est rapide, dt sera petit. Utilisé pour normaliser le mouvement.'
      }
    }
  },

  {
    id: 'stm-075', type: 'fill',
    lang: {
      es: {
        q: 'La generación _____ de sonidos usa código (osciladores y filtros) en lugar de archivos de audio pregrabados.',
        answer: 'procedural',
        explanation: 'Procedural = generado por algoritmos en tiempo real. ArcLycée crea 57 efectos de sonido con código puro, sin un solo WAV ni MP3 para SFX.'
      },
      en: {
        q: '_____ sound generation uses code (oscillators and filters) instead of pre-recorded audio files.',
        answer: 'Procedural',
        explanation: 'Procedural = generated by algorithms in real time. ArcLycée creates 57 sound effects with pure code, without a single WAV or MP3 for SFX.'
      },
      fr: {
        q: 'La génération _____ de sons utilise du code (oscillateurs et filtres) au lieu de fichiers audio préenregistrés.',
        answer: 'procédurale',
        explanation: 'Procédurale = générée par des algorithmes en temps réel. ArcLycée crée 57 effets sonores avec du code pur, sans un seul WAV ni MP3 pour les SFX.'
      }
    }
  },

  // =====================================================================
  //  MATCH  (stm-076 → stm-100)
  // =====================================================================

  {
    id: 'stm-076', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada tecnología con su función en ArcLycée:',
        pairs: [
          ['Canvas 2D', 'Dibujar sprites y escenas'],
          ['Web Audio API', 'Generar efectos de sonido'],
          ['Leaflet.js', 'Mapas interactivos'],
          ['ES Modules', 'Organizar código en archivos']
        ],
        explanation: 'Cada tecnología tiene un rol específico: Canvas dibuja, Web Audio suena, Leaflet mapea y ES Modules organizan.'
      },
      en: {
        q: 'Match each technology with its function in ArcLycée:',
        pairs: [
          ['Canvas 2D', 'Draw sprites and scenes'],
          ['Web Audio API', 'Generate sound effects'],
          ['Leaflet.js', 'Interactive maps'],
          ['ES Modules', 'Organize code into files']
        ],
        explanation: 'Each technology has a specific role: Canvas draws, Web Audio makes sounds, Leaflet maps, and ES Modules organize.'
      },
      fr: {
        q: 'Associe chaque technologie à sa fonction dans ArcLycée :',
        pairs: [
          ['Canvas 2D', 'Dessiner les sprites et les scènes'],
          ['Web Audio API', 'Générer des effets sonores'],
          ['Leaflet.js', 'Cartes interactives'],
          ['Modules ES', 'Organiser le code en fichiers']
        ],
        explanation: 'Chaque technologie a un rôle spécifique : Canvas dessine, Web Audio sonne, Leaflet cartographie et les modules ES organisent.'
      }
    }
  },

  {
    id: 'stm-077', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada método de Canvas 2D con lo que dibuja:',
        pairs: [
          ['fillRect()', 'Rectángulo sólido'],
          ['arc()', 'Círculo o arco'],
          ['lineTo()', 'Línea hasta un punto'],
          ['fillText()', 'Texto en el canvas']
        ],
        explanation: 'Estos 4 métodos son los bloques básicos del dibujo en Canvas 2D. Con ellos se puede crear cualquier sprite.'
      },
      en: {
        q: 'Match each Canvas 2D method with what it draws:',
        pairs: [
          ['fillRect()', 'Solid rectangle'],
          ['arc()', 'Circle or arc'],
          ['lineTo()', 'Line to a point'],
          ['fillText()', 'Text on the canvas']
        ],
        explanation: 'These 4 methods are the basic building blocks of Canvas 2D drawing. You can create any sprite with them.'
      },
      fr: {
        q: 'Associe chaque méthode du Canvas 2D à ce qu\'elle dessine :',
        pairs: [
          ['fillRect()', 'Rectangle plein'],
          ['arc()', 'Cercle ou arc'],
          ['lineTo()', 'Ligne vers un point'],
          ['fillText()', 'Texte sur le canvas']
        ],
        explanation: 'Ces 4 méthodes sont les briques de base du dessin Canvas 2D. On peut créer n\'importe quel sprite avec elles.'
      }
    }
  },

  {
    id: 'stm-078', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada categoría de Scratch con sus bloques típicos:',
        pairs: [
          ['Movimiento', 'Mover 10 pasos, ir a x: y:'],
          ['Apariencia', 'Decir "hola", cambiar disfraz'],
          ['Control', 'Repetir, si...entonces'],
          ['Eventos', 'Al presionar bandera verde']
        ],
        explanation: 'Scratch organiza sus bloques por colores y categorías. Cada categoría agrupa acciones similares para que sea fácil encontrar lo que necesitas.'
      },
      en: {
        q: 'Match each Scratch category with its typical blocks:',
        pairs: [
          ['Motion', 'Move 10 steps, go to x: y:'],
          ['Looks', 'Say "hello", switch costume'],
          ['Control', 'Repeat, if...then'],
          ['Events', 'When green flag clicked']
        ],
        explanation: 'Scratch organizes blocks by color and category. Each category groups similar actions so it\'s easy to find what you need.'
      },
      fr: {
        q: 'Associe chaque catégorie Scratch à ses blocs typiques :',
        pairs: [
          ['Mouvement', 'Avancer de 10, aller à x: y:'],
          ['Apparence', 'Dire "bonjour", changer de costume'],
          ['Contrôle', 'Répéter, si...alors'],
          ['Événements', 'Quand drapeau vert cliqué']
        ],
        explanation: 'Scratch organise ses blocs par couleur et catégorie. Chaque catégorie regroupe des actions similaires pour trouver facilement ce qu\'on cherche.'
      }
    }
  },

  {
    id: 'stm-079', type: 'match',
    lang: {
      es: {
        q: 'Como Phineas y Ferb emparejando inventos, conecta cada concepto de física de juegos:',
        pairs: [
          ['Gravedad', 'Aceleración hacia abajo cada frame'],
          ['Velocidad', 'Distancia recorrida por segundo'],
          ['Colisión AABB', 'Comparar rectángulos que se superponen'],
          ['Delta time', 'Tiempo entre un frame y el siguiente']
        ],
        explanation: 'Estos cuatro conceptos son la base de la física en cualquier juego 2D. ¡Con ellos puedes simular un mundo entero!'
      },
      en: {
        q: 'Like Phineas and Ferb matching inventions, connect each game physics concept:',
        pairs: [
          ['Gravity', 'Downward acceleration each frame'],
          ['Velocity', 'Distance traveled per second'],
          ['AABB collision', 'Comparing overlapping rectangles'],
          ['Delta time', 'Time between one frame and the next']
        ],
        explanation: 'These four concepts are the foundation of physics in any 2D game. With them you can simulate an entire world!'
      },
      fr: {
        q: 'Comme Phineas et Ferb associant des inventions, connecte chaque concept de physique de jeu :',
        pairs: [
          ['Gravité', 'Accélération vers le bas à chaque image'],
          ['Vitesse', 'Distance parcourue par seconde'],
          ['Collision AABB', 'Comparer des rectangles qui se chevauchent'],
          ['Delta time', 'Temps entre une image et la suivante']
        ],
        explanation: 'Ces quatre concepts sont la base de la physique dans tout jeu 2D. Avec eux, on peut simuler un monde entier !'
      }
    }
  },

  {
    id: 'stm-080', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada herramienta arqueológica STEM con lo que detecta o explora:',
        pairs: [
          ['Carbono-14', 'Edad de materiales orgánicos'],
          ['Magnetómetro', 'Metales enterrados'],
          ['ROV', 'Sitios submarinos'],
          ['GPS', 'Ubicación exacta en el mapa']
        ],
        explanation: 'La arqueología moderna usa mucha tecnología: C-14 para fechar, magnetómetros para buscar, ROVs para sumergirse y GPS para mapear.'
      },
      en: {
        q: 'Match each archaeological STEM tool with what it detects or explores:',
        pairs: [
          ['Carbon-14', 'Age of organic materials'],
          ['Magnetometer', 'Buried metals'],
          ['ROV', 'Underwater sites'],
          ['GPS', 'Exact map location']
        ],
        explanation: 'Modern archaeology uses lots of technology: C-14 to date, magnetometers to search, ROVs to dive, and GPS to map.'
      },
      fr: {
        q: 'Associe chaque outil STEM archéologique à ce qu\'il détecte ou explore :',
        pairs: [
          ['Carbone-14', 'Âge des matériaux organiques'],
          ['Magnétomètre', 'Métaux enterrés'],
          ['ROV', 'Sites sous-marins'],
          ['GPS', 'Localisation exacte sur la carte']
        ],
        explanation: 'L\'archéologie moderne utilise beaucoup de technologie : C-14 pour dater, magnétomètres pour chercher, ROV pour plonger et GPS pour cartographier.'
      }
    }
  },

  {
    id: 'stm-081', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada forma de onda del oscilador con su sonido:',
        pairs: [
          ['Sine (sinusoidal)', 'Tono puro y suave como un silbido'],
          ['Square (cuadrada)', 'Sonido retro tipo consola 8-bit'],
          ['Sawtooth (sierra)', 'Sonido brillante y zumbante'],
          ['Triangle (triángulo)', 'Tono suave intermedio entre sine y square']
        ],
        explanation: 'Cada forma de onda tiene un timbre único. Los juegos retro usaban mucho square y triangle. ¡ArcLycée las combina todas!'
      },
      en: {
        q: 'Match each oscillator waveform with its sound:',
        pairs: [
          ['Sine', 'Pure smooth tone like a whistle'],
          ['Square', 'Retro sound like an 8-bit console'],
          ['Sawtooth', 'Bright buzzing sound'],
          ['Triangle', 'Soft tone between sine and square']
        ],
        explanation: 'Each waveform has a unique timbre. Retro games used square and triangle a lot. ArcLycée combines them all!'
      },
      fr: {
        q: 'Associe chaque forme d\'onde de l\'oscillateur à son son :',
        pairs: [
          ['Sine (sinusoïdale)', 'Ton pur et doux comme un sifflement'],
          ['Square (carrée)', 'Son rétro type console 8-bit'],
          ['Sawtooth (dents de scie)', 'Son brillant et bourdonnant'],
          ['Triangle', 'Ton doux entre sine et square']
        ],
        explanation: 'Chaque forme d\'onde a un timbre unique. Les jeux rétro utilisaient beaucoup square et triangle. ArcLycée les combine toutes !'
      }
    }
  },

  {
    id: 'stm-082', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada concepto de Git con su función:',
        pairs: [
          ['Commit', 'Guardar una instantánea del código'],
          ['Branch', 'Crear una versión paralela'],
          ['Merge', 'Unir dos ramas'],
          ['Clone', 'Copiar un repositorio completo']
        ],
        explanation: 'Git tiene un vocabulario propio: commit (guardar), branch (ramificar), merge (unir), clone (copiar). ¡Son los superpoderes del programador!'
      },
      en: {
        q: 'Match each Git concept with its function:',
        pairs: [
          ['Commit', 'Save a snapshot of the code'],
          ['Branch', 'Create a parallel version'],
          ['Merge', 'Join two branches'],
          ['Clone', 'Copy an entire repository']
        ],
        explanation: 'Git has its own vocabulary: commit (save), branch (fork), merge (join), clone (copy). They\'re the programmer\'s superpowers!'
      },
      fr: {
        q: 'Associe chaque concept Git à sa fonction :',
        pairs: [
          ['Commit', 'Sauvegarder un instantané du code'],
          ['Branche', 'Créer une version parallèle'],
          ['Merge', 'Fusionner deux branches'],
          ['Clone', 'Copier un dépôt entier']
        ],
        explanation: 'Git a son propre vocabulaire : commit (sauvegarder), branche (bifurquer), merge (fusionner), clone (copier). Ce sont les superpouvoirs du programmeur !'
      }
    }
  },

  {
    id: 'stm-083', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada principio de game design con su ejemplo en ArcLycée:',
        pairs: [
          ['Player agency', '5 finales diferentes según tus decisiones'],
          ['Feedback loop', 'Reputación sube al ser pacifista, baja al ser violento'],
          ['Curva de dificultad', 'Rapel: intervalo de 1.0s baja a 0.45s'],
          ['Progresión', 'Nodos del mapa se desbloquean en orden']
        ],
        explanation: 'ArcLycée aplica principios de game design reales: decisiones con consecuencias, recompensas por comportamiento, dificultad gradual y progresión clara.'
      },
      en: {
        q: 'Match each game design principle with its example in ArcLycée:',
        pairs: [
          ['Player agency', '5 different endings based on your decisions'],
          ['Feedback loop', 'Reputation rises for pacifism, drops for violence'],
          ['Difficulty curve', 'Rappel: interval from 1.0s down to 0.45s'],
          ['Progression', 'Map nodes unlock in order']
        ],
        explanation: 'ArcLycée applies real game design principles: meaningful choices, behavioral rewards, gradual difficulty, and clear progression.'
      },
      fr: {
        q: 'Associe chaque principe de game design à son exemple dans ArcLycée :',
        pairs: [
          ['Agentivité du joueur', '5 fins différentes selon vos décisions'],
          ['Boucle de rétroaction', 'Réputation monte avec le pacifisme, baisse avec la violence'],
          ['Courbe de difficulté', 'Rappel : intervalle de 1,0s à 0,45s'],
          ['Progression', 'Les nœuds de la carte se débloquent dans l\'ordre']
        ],
        explanation: 'ArcLycée applique de vrais principes de game design : choix significatifs, récompenses comportementales, difficulté graduelle et progression claire.'
      }
    }
  },

  {
    id: 'stm-084', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada tipo de fabricación con su proceso:',
        pairs: [
          ['Aditiva (impresión 3D)', 'Agregar material capa por capa'],
          ['Sustractiva (CNC/torno)', 'Quitar material de un bloque'],
          ['Formativa (moldeo)', 'Dar forma con calor o presión'],
          ['Ensamblaje', 'Unir piezas prefabricadas']
        ],
        explanation: 'La impresión 3D es aditiva. Las máquinas CNC son sustractivas. Los moldes son formativos. LEGO es ensamblaje. ¡Cada método tiene su uso!'
      },
      en: {
        q: 'Match each manufacturing type with its process:',
        pairs: [
          ['Additive (3D printing)', 'Adding material layer by layer'],
          ['Subtractive (CNC/lathe)', 'Removing material from a block'],
          ['Formative (molding)', 'Shaping with heat or pressure'],
          ['Assembly', 'Joining prefabricated parts']
        ],
        explanation: '3D printing is additive. CNC machines are subtractive. Molds are formative. LEGO is assembly. Each method has its use!'
      },
      fr: {
        q: 'Associe chaque type de fabrication à son processus :',
        pairs: [
          ['Additive (impression 3D)', 'Ajouter du matériau couche par couche'],
          ['Soustractive (CNC/tour)', 'Enlever du matériau d\'un bloc'],
          ['Formative (moulage)', 'Donner forme avec chaleur ou pression'],
          ['Assemblage', 'Assembler des pièces préfabriquées']
        ],
        explanation: 'L\'impression 3D est additive. Les machines CNC sont soustractives. Les moules sont formatifs. LEGO c\'est de l\'assemblage. Chaque méthode a son utilité !'
      }
    }
  },

  {
    id: 'stm-085', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada parte del game loop con lo que hace:',
        pairs: [
          ['Procesar entrada', 'Leer teclas y toques del jugador'],
          ['Actualizar', 'Mover personajes, aplicar física'],
          ['Dibujar', 'Renderizar todo en el Canvas'],
          ['requestAnimationFrame', 'Pedir el siguiente frame al navegador']
        ],
        explanation: 'El game loop repite eternamente: leer input → actualizar lógica → dibujar → repetir. A 60fps, esto pasa 60 veces cada segundo.'
      },
      en: {
        q: 'Match each game loop part with what it does:',
        pairs: [
          ['Process input', 'Read player keys and touches'],
          ['Update', 'Move characters, apply physics'],
          ['Draw', 'Render everything on the Canvas'],
          ['requestAnimationFrame', 'Request the next frame from the browser']
        ],
        explanation: 'The game loop repeats forever: read input, update logic, draw, repeat. At 60fps, this happens 60 times every second.'
      },
      fr: {
        q: 'Associe chaque partie de la boucle de jeu à ce qu\'elle fait :',
        pairs: [
          ['Traiter l\'entrée', 'Lire les touches et contacts du joueur'],
          ['Mettre à jour', 'Déplacer les personnages, appliquer la physique'],
          ['Dessiner', 'Rendre le tout sur le Canvas'],
          ['requestAnimationFrame', 'Demander la prochaine image au navigateur']
        ],
        explanation: 'La boucle de jeu se répète éternellement : lire l\'input → mettre à jour la logique → dessiner → recommencer. À 60fps, ça se passe 60 fois par seconde.'
      }
    }
  },

  {
    id: 'stm-086', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada dato del C-14 con su significado:',
        pairs: [
          ['5730 años', 'Vida media del C-14'],
          ['~50,000 años', 'Límite máximo de datación'],
          ['Materiales orgánicos', 'Tipo de objetos que se pueden fechar'],
          ['Nitrógeno-14', 'Producto de la desintegración del C-14']
        ],
        explanation: 'El C-14 se desintegra en N-14 con vida media de 5730 años. Solo funciona con materia orgánica hasta ~50,000 años.'
      },
      en: {
        q: 'Match each C-14 fact with its meaning:',
        pairs: [
          ['5,730 years', 'C-14 half-life'],
          ['~50,000 years', 'Maximum dating limit'],
          ['Organic materials', 'Types of objects that can be dated'],
          ['Nitrogen-14', 'Product of C-14 decay']
        ],
        explanation: 'C-14 decays into N-14 with a half-life of 5,730 years. It only works with organic matter up to ~50,000 years.'
      },
      fr: {
        q: 'Associe chaque donnée du C-14 à sa signification :',
        pairs: [
          ['5 730 ans', 'Demi-vie du C-14'],
          ['~50 000 ans', 'Limite maximale de datation'],
          ['Matériaux organiques', 'Types d\'objets datables'],
          ['Azote-14', 'Produit de la désintégration du C-14']
        ],
        explanation: 'Le C-14 se désintègre en N-14 avec une demi-vie de 5 730 ans. Il ne fonctionne qu\'avec la matière organique jusqu\'à ~50 000 ans.'
      }
    }
  },

  {
    id: 'stm-087', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada componente de FLL con su rol en la competencia:',
        pairs: [
          ['Robot autónomo', 'Completa misiones en el tapete'],
          ['Tapete con misiones', 'Superficie de juego con obstáculos'],
          ['Programa descargado', 'Instrucciones que el robot sigue solo'],
          ['2 min 30 s', 'Tiempo límite de la ronda']
        ],
        explanation: 'En FLL todo gira alrededor del robot autónomo: se programa, se descarga el código, y el robot tiene 2:30 para completar misiones en el tapete.'
      },
      en: {
        q: 'Match each FLL component with its role in the competition:',
        pairs: [
          ['Autonomous robot', 'Completes missions on the mat'],
          ['Mission mat', 'Playing surface with obstacles'],
          ['Downloaded program', 'Instructions the robot follows alone'],
          ['2 min 30 s', 'Round time limit']
        ],
        explanation: 'In FLL everything revolves around the autonomous robot: program it, download the code, and the robot has 2:30 to complete missions on the mat.'
      },
      fr: {
        q: 'Associe chaque composant FLL à son rôle dans la compétition :',
        pairs: [
          ['Robot autonome', 'Complète les missions sur le tapis'],
          ['Tapis de missions', 'Surface de jeu avec des obstacles'],
          ['Programme téléchargé', 'Instructions que le robot suit seul'],
          ['2 min 30 s', 'Limite de temps du round']
        ],
        explanation: 'En FLL tout tourne autour du robot autonome : on le programme, on télécharge le code, et le robot a 2:30 pour compléter les missions sur le tapis.'
      }
    }
  },

  {
    id: 'stm-088', type: 'match',
    lang: {
      es: {
        q: 'Como Tony Stark emparejando sistemas de JARVIS, conecta cada capa del mapa Leaflet:',
        pairs: [
          ['Taínos (16 sitios)', 'Sitios arqueológicos indígenas'],
          ['Naufragios (12 pecios)', 'Barcos hundidos en el Caribe'],
          ['Museos (30)', 'Instituciones culturales de RD y Haití'],
          ['Inexplorados (8)', 'Sitios que necesitan investigación']
        ],
        explanation: 'El mapa de ArcLycée tiene datos reales: desde sitios taínos hasta naufragios, museos e incluso sitios aún inexplorados que esperan ser descubiertos.'
      },
      en: {
        q: 'Like Tony Stark matching JARVIS systems, connect each Leaflet map layer:',
        pairs: [
          ['Taíno (16 sites)', 'Indigenous archaeological sites'],
          ['Shipwrecks (12 wrecks)', 'Ships sunk in the Caribbean'],
          ['Museums (30)', 'Cultural institutions of DR and Haiti'],
          ['Unexplored (8)', 'Sites needing investigation']
        ],
        explanation: 'ArcLycée\'s map has real data: from Taíno sites to shipwrecks, museums, and even unexplored sites waiting to be discovered.'
      },
      fr: {
        q: 'Comme Tony Stark associant les systèmes de JARVIS, connecte chaque couche de la carte Leaflet :',
        pairs: [
          ['Taïnos (16 sites)', 'Sites archéologiques indigènes'],
          ['Épaves (12 navires)', 'Navires coulés dans les Caraïbes'],
          ['Musées (30)', 'Institutions culturelles de RD et Haïti'],
          ['Inexplorés (8)', 'Sites nécessitant des recherches']
        ],
        explanation: 'La carte d\'ArcLycée contient de vraies données : des sites taïnos aux épaves, musées et même des sites inexplorés qui attendent d\'être découverts.'
      }
    }
  },

  {
    id: 'stm-089', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada aspecto de la independencia de framerate con su concepto:',
        pairs: [
          ['dt (delta time)', 'Tiempo real entre frames'],
          ['factorTiempo = dt * 60', 'Normalización del movimiento'],
          ['PC lento (dt grande)', 'Más movimiento por frame, menos frames'],
          ['PC rápido (dt pequeño)', 'Menos movimiento por frame, más frames']
        ],
        explanation: 'La clave es que movimiento × frames = distancia constante. PC lento: pocos frames grandes. PC rápido: muchos frames pequeños. ¡Mismo resultado!'
      },
      en: {
        q: 'Match each frame-rate independence aspect with its concept:',
        pairs: [
          ['dt (delta time)', 'Real time between frames'],
          ['factorTiempo = dt * 60', 'Movement normalization'],
          ['Slow PC (large dt)', 'More movement per frame, fewer frames'],
          ['Fast PC (small dt)', 'Less movement per frame, more frames']
        ],
        explanation: 'The key is that movement x frames = constant distance. Slow PC: few large frames. Fast PC: many small frames. Same result!'
      },
      fr: {
        q: 'Associe chaque aspect de l\'indépendance du framerate à son concept :',
        pairs: [
          ['dt (delta time)', 'Temps réel entre les images'],
          ['factorTiempo = dt * 60', 'Normalisation du mouvement'],
          ['PC lent (dt grand)', 'Plus de mouvement par image, moins d\'images'],
          ['PC rapide (dt petit)', 'Moins de mouvement par image, plus d\'images']
        ],
        explanation: 'La clé : mouvement × images = distance constante. PC lent : peu d\'images grandes. PC rapide : beaucoup de petites images. Même résultat !'
      }
    }
  },

  {
    id: 'stm-090', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada tipo de robot con su nivel de autonomía:',
        pairs: [
          ['ROV submarino', 'Controlado remotamente por humano via cable'],
          ['Robot FLL', 'Totalmente autónomo durante la competencia'],
          ['Dron con piloto', 'Controlado remotamente por radio'],
          ['AUV', 'Submarino autónomo sin cable']
        ],
        explanation: 'Los robots van desde totalmente controlados (ROV, drones) hasta completamente autónomos (FLL, AUV). ¡Cada nivel tiene sus ventajas!'
      },
      en: {
        q: 'Match each robot type with its autonomy level:',
        pairs: [
          ['Submarine ROV', 'Remotely controlled by human via cable'],
          ['FLL robot', 'Fully autonomous during competition'],
          ['Piloted drone', 'Remotely controlled by radio'],
          ['AUV', 'Autonomous submarine without cable']
        ],
        explanation: 'Robots range from fully controlled (ROV, drones) to completely autonomous (FLL, AUV). Each level has its advantages!'
      },
      fr: {
        q: 'Associe chaque type de robot à son niveau d\'autonomie :',
        pairs: [
          ['ROV sous-marin', 'Contrôlé à distance par humain via câble'],
          ['Robot FLL', 'Totalement autonome pendant la compétition'],
          ['Drone piloté', 'Contrôlé à distance par radio'],
          ['AUV', 'Sous-marin autonome sans câble']
        ],
        explanation: 'Les robots vont du totalement contrôlé (ROV, drones) au complètement autonome (FLL, AUV). Chaque niveau a ses avantages !'
      }
    }
  },

  {
    id: 'stm-091', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada término de programación JavaScript con su significado:',
        pairs: [
          ['import', 'Traer código de otro archivo'],
          ['export', 'Hacer código disponible para otros archivos'],
          ['const', 'Declarar una constante que no cambia'],
          ['class', 'Definir un molde para crear objetos']
        ],
        explanation: 'Estas son palabras clave fundamentales de JavaScript moderno. import/export organizan módulos, const crea constantes y class define estructuras de objetos.'
      },
      en: {
        q: 'Match each JavaScript programming term with its meaning:',
        pairs: [
          ['import', 'Bring code from another file'],
          ['export', 'Make code available to other files'],
          ['const', 'Declare a constant that doesn\'t change'],
          ['class', 'Define a template for creating objects']
        ],
        explanation: 'These are fundamental modern JavaScript keywords. import/export organize modules, const creates constants, and class defines object structures.'
      },
      fr: {
        q: 'Associe chaque terme de programmation JavaScript à sa signification :',
        pairs: [
          ['import', 'Apporter du code d\'un autre fichier'],
          ['export', 'Rendre du code disponible pour d\'autres fichiers'],
          ['const', 'Déclarer une constante qui ne change pas'],
          ['class', 'Définir un modèle pour créer des objets']
        ],
        explanation: 'Ce sont des mots-clés fondamentaux du JavaScript moderne. import/export organisent les modules, const crée des constantes et class définit des structures d\'objets.'
      }
    }
  },

  {
    id: 'stm-092', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada etapa del prototipado con impresión 3D:',
        pairs: [
          ['Diseño 3D', 'Crear el modelo en software CAD'],
          ['Slicing', 'Cortar el modelo en capas para la impresora'],
          ['Impresión', 'Depositar material capa por capa'],
          ['Post-procesado', 'Lijar, pintar o ensamblar la pieza']
        ],
        explanation: 'El flujo de impresión 3D: diseñar → rebanar → imprimir → terminar. Franky de One Piece sería experto en las 4 etapas.'
      },
      en: {
        q: 'Match each 3D printing prototyping stage:',
        pairs: [
          ['3D design', 'Create the model in CAD software'],
          ['Slicing', 'Cut the model into layers for the printer'],
          ['Printing', 'Deposit material layer by layer'],
          ['Post-processing', 'Sand, paint, or assemble the piece']
        ],
        explanation: 'The 3D printing workflow: design, slice, print, finish. Franky from One Piece would be an expert at all 4 stages.'
      },
      fr: {
        q: 'Associe chaque étape du prototypage en impression 3D :',
        pairs: [
          ['Design 3D', 'Créer le modèle dans un logiciel CAO'],
          ['Slicing', 'Découper le modèle en couches pour l\'imprimante'],
          ['Impression', 'Déposer du matériau couche par couche'],
          ['Post-traitement', 'Poncer, peindre ou assembler la pièce']
        ],
        explanation: 'Le flux d\'impression 3D : concevoir → découper → imprimer → finir. Franky de One Piece serait expert dans les 4 étapes.'
      }
    }
  },

  {
    id: 'stm-093', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada personaje de ficción con la habilidad STEM que mejor representa:',
        pairs: [
          ['Tony Stark (Iron Man)', 'Ingeniería y programación de sistemas'],
          ['Cyborg (DC)', 'Integración humano-máquina'],
          ['Franky (One Piece)', 'Construcción y mecánica'],
          ['BMO (Adventure Time)', 'Computación y videojuegos']
        ],
        explanation: 'Cada personaje representa una faceta diferente de STEM: Tony programa, Cyborg fusiona biología y tecnología, Franky construye y BMO es pura computación.'
      },
      en: {
        q: 'Match each fictional character with the STEM skill they best represent:',
        pairs: [
          ['Tony Stark (Iron Man)', 'Systems engineering and programming'],
          ['Cyborg (DC)', 'Human-machine integration'],
          ['Franky (One Piece)', 'Construction and mechanics'],
          ['BMO (Adventure Time)', 'Computing and video games']
        ],
        explanation: 'Each character represents a different facet of STEM: Tony programs, Cyborg fuses biology and tech, Franky builds, and BMO is pure computing.'
      },
      fr: {
        q: 'Associe chaque personnage fictif à la compétence STEM qu\'il représente le mieux :',
        pairs: [
          ['Tony Stark (Iron Man)', 'Ingénierie et programmation de systèmes'],
          ['Cyborg (DC)', 'Intégration humain-machine'],
          ['Franky (One Piece)', 'Construction et mécanique'],
          ['BMO (Adventure Time)', 'Informatique et jeux vidéo']
        ],
        explanation: 'Chaque personnage représente une facette différente des STEM : Tony programme, Cyborg fusionne biologie et technologie, Franky construit et BMO est pure informatique.'
      }
    }
  },

  {
    id: 'stm-094', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada módulo de ArcLycée con su responsabilidad:',
        pairs: [
          ['juego.js', 'Game loop, escenas, inventario, guardado'],
          ['entrada.js', 'Input unificado (teclado + táctil)'],
          ['sonido-procedural.js', 'Efectos con Web Audio API'],
          ['musica.js', 'Sistema de música con crossfade']
        ],
        explanation: 'Cada módulo tiene una responsabilidad clara: el juego coordina, entrada lee input, sonido genera SFX y música maneja los MP3s.'
      },
      en: {
        q: 'Match each ArcLycée module with its responsibility:',
        pairs: [
          ['juego.js', 'Game loop, scenes, inventory, saving'],
          ['entrada.js', 'Unified input (keyboard + touch)'],
          ['sonido-procedural.js', 'Effects with Web Audio API'],
          ['musica.js', 'Music system with crossfade']
        ],
        explanation: 'Each module has a clear responsibility: the game coordinates, input reads controls, sound generates SFX, and music manages MP3s.'
      },
      fr: {
        q: 'Associe chaque module d\'ArcLycée à sa responsabilité :',
        pairs: [
          ['juego.js', 'Boucle de jeu, scènes, inventaire, sauvegarde'],
          ['entrada.js', 'Input unifié (clavier + tactile)'],
          ['sonido-procedural.js', 'Effets avec Web Audio API'],
          ['musica.js', 'Système de musique avec crossfade']
        ],
        explanation: 'Chaque module a une responsabilité claire : le jeu coordonne, entrada lit les contrôles, sonido génère les SFX et musica gère les MP3s.'
      }
    }
  },

  {
    id: 'stm-095', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada sensor arqueológico con su principio físico:',
        pairs: [
          ['Magnetómetro', 'Anomalías en el campo magnético terrestre'],
          ['C-14', 'Decaimiento radiactivo de isótopos'],
          ['LIDAR', 'Pulsos láser que miden distancia'],
          ['Sonar', 'Ondas de sonido que rebotan']
        ],
        explanation: 'Cada sensor explota un fenómeno físico diferente: magnetismo, radioactividad, luz y sonido. ¡La física es la base de toda la arqueología tecnológica!'
      },
      en: {
        q: 'Match each archaeological sensor with its physical principle:',
        pairs: [
          ['Magnetometer', 'Anomalies in Earth\'s magnetic field'],
          ['C-14', 'Radioactive decay of isotopes'],
          ['LIDAR', 'Laser pulses measuring distance'],
          ['Sonar', 'Sound waves that bounce back']
        ],
        explanation: 'Each sensor exploits a different physical phenomenon: magnetism, radioactivity, light, and sound. Physics is the foundation of all technological archaeology!'
      },
      fr: {
        q: 'Associe chaque capteur archéologique à son principe physique :',
        pairs: [
          ['Magnétomètre', 'Anomalies du champ magnétique terrestre'],
          ['C-14', 'Décroissance radioactive d\'isotopes'],
          ['LIDAR', 'Impulsions laser mesurant la distance'],
          ['Sonar', 'Ondes sonores qui rebondissent']
        ],
        explanation: 'Chaque capteur exploite un phénomène physique différent : magnétisme, radioactivité, lumière et son. La physique est la base de toute l\'archéologie technologique !'
      }
    }
  },

  {
    id: 'stm-096', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada concepto de renderizado con su técnica en ArcLycée:',
        pairs: [
          ['Depth sorting', 'Ordenar entidades por Y antes de dibujar'],
          ['Máscara radial', 'Efecto de linterna en cueva oscura'],
          ['Viñeta oscura', 'Gradientes en bordes de hero images'],
          ['Sprites programáticos', 'fillRect + arc + paths sin imágenes']
        ],
        explanation: 'ArcLycée usa varias técnicas de renderizado: sorting para profundidad, compositing para iluminación, gradientes para efecto visual y código para sprites.'
      },
      en: {
        q: 'Match each rendering concept with its technique in ArcLycée:',
        pairs: [
          ['Depth sorting', 'Order entities by Y before drawing'],
          ['Radial mask', 'Flashlight effect in dark cave'],
          ['Dark vignette', 'Gradients on hero image edges'],
          ['Programmatic sprites', 'fillRect + arc + paths without images']
        ],
        explanation: 'ArcLycée uses various rendering techniques: sorting for depth, compositing for lighting, gradients for visual effect, and code for sprites.'
      },
      fr: {
        q: 'Associe chaque concept de rendu à sa technique dans ArcLycée :',
        pairs: [
          ['Tri par profondeur', 'Ordonner les entités par Y avant de dessiner'],
          ['Masque radial', 'Effet lampe torche dans la grotte obscure'],
          ['Vignette sombre', 'Dégradés sur les bords des images hero'],
          ['Sprites programmatiques', 'fillRect + arc + paths sans images']
        ],
        explanation: 'ArcLycée utilise diverses techniques de rendu : tri pour la profondeur, compositing pour l\'éclairage, dégradés pour l\'effet visuel et du code pour les sprites.'
      }
    }
  },

  {
    id: 'stm-097', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada unidad de medida con lo que mide en el desarrollo de juegos:',
        pairs: [
          ['FPS (frames por segundo)', 'Fluidez de la animación'],
          ['Milisegundos (ms)', 'Tiempo de un frame (~16.67ms a 60fps)'],
          ['Píxeles (px)', 'Posición y tamaño en pantalla'],
          ['Radianes', 'Ángulos de rotación en Canvas']
        ],
        explanation: 'El desarrollo de juegos mezcla unidades de tiempo (fps, ms), espacio (px) y geometría (radianes). ¡Math.PI*2 = 360° = un círculo completo!'
      },
      en: {
        q: 'Match each unit of measurement with what it measures in game development:',
        pairs: [
          ['FPS (frames per second)', 'Animation smoothness'],
          ['Milliseconds (ms)', 'Time of one frame (~16.67ms at 60fps)'],
          ['Pixels (px)', 'Position and size on screen'],
          ['Radians', 'Rotation angles in Canvas']
        ],
        explanation: 'Game development mixes time units (fps, ms), space (px), and geometry (radians). Math.PI*2 = 360 degrees = a full circle!'
      },
      fr: {
        q: 'Associe chaque unité de mesure à ce qu\'elle mesure dans le développement de jeux :',
        pairs: [
          ['FPS (images par seconde)', 'Fluidité de l\'animation'],
          ['Millisecondes (ms)', 'Temps d\'une image (~16,67ms à 60fps)'],
          ['Pixels (px)', 'Position et taille à l\'écran'],
          ['Radians', 'Angles de rotation dans Canvas']
        ],
        explanation: 'Le développement de jeux mélange des unités de temps (fps, ms), d\'espace (px) et de géométrie (radians). Math.PI*2 = 360° = un cercle complet !'
      }
    }
  },

  {
    id: 'stm-098', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada mini-juego de ArcLycée con el concepto STEM que enseña:',
        pairs: [
          ['Rapel por cenote', 'Curva de dificultad progresiva'],
          ['Batú (pelota taína)', 'Física 2D con gravedad y rebotes'],
          ['Areíto DDR', 'Sincronización y ritmo computacional'],
          ['Combate tipo Undertale', 'Sistemas de decisión y consecuencias']
        ],
        explanation: 'Cada mini-juego enseña un concepto diferente: el rapel muestra dificultad progresiva, el batú usa física, el areíto trabaja ritmo y el combate enseña toma de decisiones.'
      },
      en: {
        q: 'Match each ArcLycée mini-game with the STEM concept it teaches:',
        pairs: [
          ['Cenote rappel', 'Progressive difficulty curve'],
          ['Batú (Taíno ball game)', '2D physics with gravity and bounces'],
          ['Areíto DDR', 'Computational synchronization and rhythm'],
          ['Undertale-style combat', 'Decision systems and consequences']
        ],
        explanation: 'Each mini-game teaches a different concept: rappel shows progressive difficulty, batú uses physics, areíto works rhythm, and combat teaches decision-making.'
      },
      fr: {
        q: 'Associe chaque mini-jeu d\'ArcLycée au concept STEM qu\'il enseigne :',
        pairs: [
          ['Rappel dans le cénote', 'Courbe de difficulté progressive'],
          ['Batú (jeu de balle taïno)', 'Physique 2D avec gravité et rebonds'],
          ['Areíto DDR', 'Synchronisation et rythme computationnel'],
          ['Combat type Undertale', 'Systèmes de décision et conséquences']
        ],
        explanation: 'Chaque mini-jeu enseigne un concept différent : le rappel montre la difficulté progressive, le batú utilise la physique, l\'areíto travaille le rythme et le combat enseigne la prise de décision.'
      }
    }
  },

  {
    id: 'stm-099', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada problema del game loop con su solución:',
        pairs: [
          ['Juego va diferente en cada PC', 'Multiplicar movimiento por delta time'],
          ['Teclas quedan "pegadas" al cambiar pestaña', 'Limpiar teclas al perder foco (window.blur)'],
          ['Sprites parpadean al dibujar', 'Doble buffer (Canvas dibuja todo y muestra de golpe)'],
          ['Objetos se atraviesan a alta velocidad', 'Detección de colisiones continua']
        ],
        explanation: 'Cada problema del game loop tiene una solución elegante. ArcLycée implementa todas estas: dt para velocidad, blur para teclas, canvas buffer y AABB para colisiones.'
      },
      en: {
        q: 'Match each game loop problem with its solution:',
        pairs: [
          ['Game runs differently on each PC', 'Multiply movement by delta time'],
          ['Keys get "stuck" when switching tabs', 'Clear keys on focus loss (window.blur)'],
          ['Sprites flicker when drawing', 'Double buffering (Canvas draws all then displays)'],
          ['Objects pass through each other at high speed', 'Continuous collision detection']
        ],
        explanation: 'Each game loop problem has an elegant solution. ArcLycée implements all of these: dt for speed, blur for keys, canvas buffer and AABB for collisions.'
      },
      fr: {
        q: 'Associe chaque problème de la boucle de jeu à sa solution :',
        pairs: [
          ['Le jeu tourne différemment sur chaque PC', 'Multiplier le mouvement par delta time'],
          ['Les touches restent "bloquées" en changeant d\'onglet', 'Nettoyer les touches à la perte de focus (window.blur)'],
          ['Les sprites scintillent au dessin', 'Double tampon (Canvas dessine tout puis affiche)'],
          ['Les objets se traversent à haute vitesse', 'Détection de collisions continue']
        ],
        explanation: 'Chaque problème de la boucle de jeu a une solution élégante. ArcLycée les implémente toutes : dt pour la vitesse, blur pour les touches, tampon canvas et AABB pour les collisions.'
      }
    }
  },

  {
    id: 'stm-100', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada tecnología web con lo que ArcLycée NO necesita gracias a ella:',
        pairs: [
          ['HTML5 Canvas', 'No necesita motor de juego (Unity, Godot)'],
          ['Web Audio API', 'No necesita archivos de sonido para SFX'],
          ['ES Modules', 'No necesita bundler (Webpack, Vite)'],
          ['localStorage', 'No necesita servidor para guardar partidas']
        ],
        explanation: 'ArcLycée es minimalista a propósito: sin frameworks, sin bundlers, sin servidor. Solo HTML, CSS y JavaScript vanilla. ¡Así cualquier estudiante puede entender todo el código!'
      },
      en: {
        q: 'Match each web technology with what ArcLycée does NOT need thanks to it:',
        pairs: [
          ['HTML5 Canvas', 'No game engine needed (Unity, Godot)'],
          ['Web Audio API', 'No sound files needed for SFX'],
          ['ES Modules', 'No bundler needed (Webpack, Vite)'],
          ['localStorage', 'No server needed to save games']
        ],
        explanation: 'ArcLycée is minimalist on purpose: no frameworks, no bundlers, no server. Just HTML, CSS, and vanilla JavaScript. Any student can understand all the code!'
      },
      fr: {
        q: 'Associe chaque technologie web à ce dont ArcLycée N\'A PAS besoin grâce à elle :',
        pairs: [
          ['HTML5 Canvas', 'Pas besoin de moteur de jeu (Unity, Godot)'],
          ['Web Audio API', 'Pas besoin de fichiers son pour les SFX'],
          ['Modules ES', 'Pas besoin de bundler (Webpack, Vite)'],
          ['localStorage', 'Pas besoin de serveur pour sauvegarder']
        ],
        explanation: 'ArcLycée est minimaliste exprès : pas de frameworks, pas de bundlers, pas de serveur. Juste HTML, CSS et JavaScript vanilla. Tout étudiant peut comprendre tout le code !'
      }
    }
  }

];
