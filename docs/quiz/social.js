// social.js — 100 preguntas trilingües sobre habilidades sociales y responsabilidad cívica
// Cubre: ruta pacifista, combates cívicos, ecología, leyes de patrimonio, sistema de reputación,
// consecuencias de decisiones, y por qué las soluciones pacíficas funcionan.
// Tipos distribuidos: tf (25), mcq (25), fill (25), match (25)

window.ARC_QUESTIONS = window.ARC_QUESTIONS || {};
window.ARC_QUESTIONS.social = [

  // ===== TRUE / FALSE (soc-001 a soc-025) =====

  {
    id: 'soc-001', type: 'tf',
    lang: {
      es: {
        q: 'En ArcLycée, como en Undertale, es posible completar todo el juego sin usar violencia.',
        answer: true,
        explanation: 'La ruta pacifista permite resolver cada conflicto con diálogo, evidencia o acciones cívicas, igual que en Undertale.'
      },
      en: {
        q: 'In ArcLycée, like in Undertale, it is possible to complete the entire game without using violence.',
        answer: true,
        explanation: 'The pacifist route lets you solve every conflict through dialogue, evidence, or civic action, just like Undertale.'
      },
      fr: {
        q: 'Dans ArcLycée, comme dans Undertale, il est possible de terminer tout le jeu sans utiliser la violence.',
        answer: true,
        explanation: 'La route pacifiste permet de résoudre chaque conflit par le dialogue, les preuves ou des actions civiques, comme dans Undertale.'
      }
    }
  },

  {
    id: 'soc-002', type: 'tf',
    lang: {
      es: {
        q: 'Las victorias violentas dan más reputación (+15) que las pacíficas (+5).',
        answer: false,
        explanation: 'Es al revés: las victorias pacíficas dan +15 reputación, las violentas solo +5. El juego recompensa la diplomacia.'
      },
      en: {
        q: 'Violent victories give more reputation (+15) than peaceful ones (+5).',
        answer: false,
        explanation: 'It is the opposite: peaceful victories give +15 reputation, violent ones only +5. The game rewards diplomacy.'
      },
      fr: {
        q: 'Les victoires violentes donnent plus de réputation (+15) que les pacifiques (+5).',
        answer: false,
        explanation: 'C\'est l\'inverse : les victoires pacifiques donnent +15 de réputation, les violentes seulement +5. Le jeu récompense la diplomatie.'
      }
    }
  },

  {
    id: 'soc-003', type: 'tf',
    lang: {
      es: {
        q: 'La Ley 318-68 de República Dominicana protege el patrimonio cultural del país.',
        answer: true,
        explanation: 'La Ley 318-68 es la legislación dominicana para proteger bienes culturales. En el juego, la usas contra el traficante Torres.'
      },
      en: {
        q: 'Law 318-68 of the Dominican Republic protects the country\'s cultural heritage.',
        answer: true,
        explanation: 'Law 318-68 is the Dominican legislation to protect cultural property. In the game, you use it against trafficker Torres.'
      },
      fr: {
        q: 'La Loi 318-68 de la République dominicaine protège le patrimoine culturel du pays.',
        answer: true,
        explanation: 'La Loi 318-68 est la législation dominicaine pour protéger les biens culturels. Dans le jeu, on l\'utilise contre le trafiquant Torres.'
      }
    }
  },

  {
    id: 'soc-004', type: 'tf',
    lang: {
      es: {
        q: 'En el combate contra el pez león, debes matarlo para ganar. No hay opción pacífica.',
        answer: false,
        explanation: 'Puedes atraparlo, pescar con arponcito, proteger el coral o alertar buzos. Todas son opciones ecológicas, no violentas.'
      },
      en: {
        q: 'In the lionfish combat, you must kill it to win. There is no peaceful option.',
        answer: false,
        explanation: 'You can trap it, spearfish, protect the coral, or alert divers. All are ecological, non-violent options.'
      },
      fr: {
        q: 'Dans le combat contre le poisson-lion, il faut le tuer pour gagner. Il n\'y a pas d\'option pacifique.',
        answer: false,
        explanation: 'On peut le piéger, le pêcher au harpon, protéger le corail ou alerter les plongeurs. Ce sont toutes des options écologiques.'
      }
    }
  },

  {
    id: 'soc-005', type: 'tf',
    lang: {
      es: {
        q: 'La Convención UNESCO de 1970 combate el tráfico ilícito de bienes culturales a nivel internacional.',
        answer: true,
        explanation: 'La Convención UNESCO 1970 es un tratado internacional contra el tráfico de patrimonio. En el juego, es una de tus armas legales contra Torres.'
      },
      en: {
        q: 'The 1970 UNESCO Convention fights the illicit trafficking of cultural property at an international level.',
        answer: true,
        explanation: 'The 1970 UNESCO Convention is an international treaty against heritage trafficking. In the game, it is one of your legal weapons against Torres.'
      },
      fr: {
        q: 'La Convention UNESCO de 1970 lutte contre le trafic illicite de biens culturels au niveau international.',
        answer: true,
        explanation: 'La Convention UNESCO de 1970 est un traité international contre le trafic de patrimoine. Dans le jeu, c\'est une de vos armes légales contre Torres.'
      }
    }
  },

  {
    id: 'soc-006', type: 'tf',
    lang: {
      es: {
        q: 'El medidor de convicción debe llegar a 100% para ganar un combate de forma pacífica.',
        answer: true,
        explanation: 'Convicción al 100% = victoria pacífica. Es como convencer a alguien con argumentos, como Dumbledore hablando con Tom Riddle.'
      },
      en: {
        q: 'The conviction meter must reach 100% to win a combat peacefully.',
        answer: true,
        explanation: 'Conviction at 100% = peaceful victory. It is like convincing someone with arguments, like Dumbledore talking to Tom Riddle.'
      },
      fr: {
        q: 'Le compteur de conviction doit atteindre 100% pour gagner un combat de manière pacifique.',
        answer: true,
        explanation: 'Conviction à 100% = victoire pacifique. C\'est comme convaincre quelqu\'un par des arguments, comme Dumbledore parlant à Tom Riddle.'
      }
    }
  },

  {
    id: 'soc-007', type: 'tf',
    lang: {
      es: {
        q: 'En el duelo de espadas contra el Soldado Diego, huir se considera una victoria pacifista.',
        answer: true,
        explanation: 'Huir del duelo cuenta como resolución pacifista. A veces la mejor batalla es la que no se pelea, como diría el Maestro Oogway.'
      },
      en: {
        q: 'In the sword duel against Soldier Diego, fleeing counts as a pacifist victory.',
        answer: true,
        explanation: 'Fleeing the duel counts as a pacifist resolution. Sometimes the best battle is the one not fought, as Master Oogway would say.'
      },
      fr: {
        q: 'Dans le duel d\'épées contre le Soldat Diego, fuir est considéré comme une victoire pacifiste.',
        answer: true,
        explanation: 'Fuir le duel compte comme une résolution pacifiste. Parfois le meilleur combat est celui qu\'on ne livre pas, comme dirait Maître Oogway.'
      }
    }
  },

  {
    id: 'soc-008', type: 'tf',
    lang: {
      es: {
        q: 'INTERPOL solo se dedica a perseguir ladrones de bancos y no tiene nada que ver con el patrimonio cultural.',
        answer: false,
        explanation: 'INTERPOL tiene un programa dedicado a combatir el tráfico de obras de arte y bienes culturales. En el juego, es clave contra Torres.'
      },
      en: {
        q: 'INTERPOL only deals with bank robbers and has nothing to do with cultural heritage.',
        answer: false,
        explanation: 'INTERPOL has a dedicated program to combat trafficking of artworks and cultural property. In the game, it is key against Torres.'
      },
      fr: {
        q: 'INTERPOL ne s\'occupe que des braqueurs de banques et n\'a rien à voir avec le patrimoine culturel.',
        answer: false,
        explanation: 'INTERPOL a un programme dédié à la lutte contre le trafic d\'œuvres d\'art et de biens culturels. Dans le jeu, c\'est clé contre Torres.'
      }
    }
  },

  {
    id: 'soc-009', type: 'tf',
    lang: {
      es: {
        q: 'Rescatar al manatí y limpiar el arrecife son acciones ecológicas que suman a tu progreso en el juego.',
        answer: true,
        explanation: 'Ambas acciones incrementan tu contador de acciones ecológicas y completan la misión secundaria rescateManatí.'
      },
      en: {
        q: 'Rescuing the manatee and cleaning the reef are ecological actions that count toward your game progress.',
        answer: true,
        explanation: 'Both actions increase your ecological action counter and complete the rescueManatee side quest.'
      },
      fr: {
        q: 'Sauver le lamantin et nettoyer le récif sont des actions écologiques qui comptent pour ta progression.',
        answer: true,
        explanation: 'Les deux actions augmentent ton compteur d\'actions écologiques et complètent la quête secondaire sauvetageManatin.'
      }
    }
  },

  {
    id: 'soc-010', type: 'tf',
    lang: {
      es: {
        q: 'El juego tiene un único final, sin importar las decisiones del jugador.',
        answer: false,
        explanation: 'ArcLycée tiene 5 finales diferentes (completo, pacifista, museo, ecológico, oscuro) según tus decisiones. Tus acciones importan.'
      },
      en: {
        q: 'The game has only one ending, regardless of the player\'s decisions.',
        answer: false,
        explanation: 'ArcLycée has 5 different endings (complete, pacifist, museum, ecological, dark) based on your decisions. Your actions matter.'
      },
      fr: {
        q: 'Le jeu n\'a qu\'une seule fin, peu importe les décisions du joueur.',
        answer: false,
        explanation: 'ArcLycée a 5 fins différentes (complète, pacifiste, musée, écologique, sombre) selon tes décisions. Tes actions comptent.'
      }
    }
  },

  {
    id: 'soc-011', type: 'tf',
    lang: {
      es: {
        q: 'Contra el Constructor Méndez, puedes usar carteles de protesta y una cadena humana como estrategia.',
        answer: true,
        explanation: 'Las opciones cívicas contra Méndez incluyen carteles, prensa, acción legal y cadena humana. Activismo ciudadano real.'
      },
      en: {
        q: 'Against Builder Mendez, you can use protest signs and a human chain as a strategy.',
        answer: true,
        explanation: 'Civic options against Mendez include protest signs, press, legal action, and human chains. Real citizen activism.'
      },
      fr: {
        q: 'Contre le Constructeur Mendez, on peut utiliser des pancartes de protestation et une chaîne humaine comme stratégie.',
        answer: true,
        explanation: 'Les options civiques contre Mendez incluent pancartes, presse, action légale et chaîne humaine. Du vrai activisme citoyen.'
      }
    }
  },

  {
    id: 'soc-012', type: 'tf',
    lang: {
      es: {
        q: 'El sistema de reputación del juego no tiene ningún efecto real en la historia.',
        answer: false,
        explanation: 'La reputación influye en los finales. El juego rastrea combates pacificados vs violentos para determinar tu final.'
      },
      en: {
        q: 'The game\'s reputation system has no real effect on the story.',
        answer: false,
        explanation: 'Reputation influences your endings. The game tracks pacified vs violent combats to determine your finale.'
      },
      fr: {
        q: 'Le système de réputation du jeu n\'a aucun effet réel sur l\'histoire.',
        answer: false,
        explanation: 'La réputation influence les fins. Le jeu suit les combats pacifiés vs violents pour déterminer ta finale.'
      }
    }
  },

  {
    id: 'soc-013', type: 'tf',
    lang: {
      es: {
        q: 'Hablar con el Soldado Diego puede subir tu medidor de convicción hasta ganar sin pelear, como Aang en Avatar.',
        answer: true,
        explanation: 'En modo pacifista, dialogar con Diego sube la convicción a 100%. Como Aang, que derrotó al Señor del Fuego sin matarlo.'
      },
      en: {
        q: 'Talking to Soldier Diego can raise your conviction meter to win without fighting, like Aang in Avatar.',
        answer: true,
        explanation: 'In pacifist mode, talking to Diego raises conviction to 100%. Like Aang, who defeated the Fire Lord without killing him.'
      },
      fr: {
        q: 'Parler au Soldat Diego peut monter ton compteur de conviction pour gagner sans combattre, comme Aang dans Avatar.',
        answer: true,
        explanation: 'En mode pacifiste, dialoguer avec Diego monte la conviction à 100%. Comme Aang qui a vaincu le Seigneur du Feu sans le tuer.'
      }
    }
  },

  {
    id: 'soc-014', type: 'tf',
    lang: {
      es: {
        q: 'La evidencia forense es una de las herramientas para enfrentar al traficante Torres en el aeropuerto.',
        answer: true,
        explanation: 'Contra Torres usas evidencia forense junto con la Ley 318, INTERPOL y la Convención UNESCO. La ciencia y la ley son tus armas.'
      },
      en: {
        q: 'Forensic evidence is one of the tools to confront trafficker Torres at the airport.',
        answer: true,
        explanation: 'Against Torres you use forensic evidence along with Law 318, INTERPOL, and the UNESCO Convention. Science and law are your weapons.'
      },
      fr: {
        q: 'Les preuves médico-légales sont l\'un des outils pour affronter le trafiquant Torres à l\'aéroport.',
        answer: true,
        explanation: 'Contre Torres on utilise les preuves médico-légales avec la Loi 318, INTERPOL et la Convention UNESCO. La science et la loi sont tes armes.'
      }
    }
  },

  {
    id: 'soc-015', type: 'tf',
    lang: {
      es: {
        q: 'El pez león es una especie nativa del Caribe que no representa ningún peligro ecológico.',
        answer: false,
        explanation: 'El pez león es una especie invasora en el Caribe. En el juego, lo enfrentas con métodos ecológicos como trampa y pesca controlada.'
      },
      en: {
        q: 'The lionfish is a native Caribbean species that poses no ecological danger.',
        answer: false,
        explanation: 'The lionfish is an invasive species in the Caribbean. In the game, you confront it with ecological methods like trapping and controlled fishing.'
      },
      fr: {
        q: 'Le poisson-lion est une espèce native des Caraïbes qui ne représente aucun danger écologique.',
        answer: false,
        explanation: 'Le poisson-lion est une espèce invasive dans les Caraïbes. Dans le jeu, on l\'affronte avec des méthodes écologiques comme le piégeage.'
      }
    }
  },

  {
    id: 'soc-016', type: 'tf',
    lang: {
      es: {
        q: 'Para obtener el final "completo" necesitas al menos 8 nodos completados, 5 misiones secundarias y todos los combates pacificados.',
        answer: true,
        explanation: 'El final completo es el más difícil: requiere exploración total, ayudar a todos y nunca recurrir a la violencia.'
      },
      en: {
        q: 'To get the "complete" ending you need at least 8 completed nodes, 5 side quests, and all combats pacified.',
        answer: true,
        explanation: 'The complete ending is the hardest: it requires full exploration, helping everyone, and never resorting to violence.'
      },
      fr: {
        q: 'Pour obtenir la fin "complète", il faut au moins 8 nœuds terminés, 5 quêtes secondaires et tous les combats pacifiés.',
        answer: true,
        explanation: 'La fin complète est la plus difficile : elle exige une exploration totale, aider tout le monde et ne jamais recourir à la violence.'
      }
    }
  },

  {
    id: 'soc-017', type: 'tf',
    lang: {
      es: {
        q: 'Alertar a los buzos sobre el pez león es una acción más efectiva a largo plazo que simplemente matar un solo pez.',
        answer: true,
        explanation: 'Alertar buzos crea conciencia colectiva, como cuando Luffy inspira a pueblos enteros. Una persona informada multiplica el impacto.'
      },
      en: {
        q: 'Alerting divers about the lionfish is a more effective long-term action than simply killing a single fish.',
        answer: true,
        explanation: 'Alerting divers creates collective awareness, like when Luffy inspires entire towns. An informed person multiplies the impact.'
      },
      fr: {
        q: 'Alerter les plongeurs sur le poisson-lion est une action plus efficace à long terme que simplement tuer un seul poisson.',
        answer: true,
        explanation: 'Alerter les plongeurs crée une conscience collective, comme quand Luffy inspire des villes entières. Une personne informée multiplie l\'impact.'
      }
    }
  },

  {
    id: 'soc-018', type: 'tf',
    lang: {
      es: {
        q: 'La cadena humana contra el Constructor Méndez es un ejemplo de desobediencia civil no violenta.',
        answer: true,
        explanation: 'La cadena humana es una forma clásica de protesta pacífica, como las marchas de Martin Luther King Jr.'
      },
      en: {
        q: 'The human chain against Builder Mendez is an example of nonviolent civil disobedience.',
        answer: true,
        explanation: 'The human chain is a classic form of peaceful protest, like Martin Luther King Jr.\'s marches.'
      },
      fr: {
        q: 'La chaîne humaine contre le Constructeur Mendez est un exemple de désobéissance civile non violente.',
        answer: true,
        explanation: 'La chaîne humaine est une forme classique de protestation pacifique, comme les marches de Martin Luther King Jr.'
      }
    }
  },

  {
    id: 'soc-019', type: 'tf',
    lang: {
      es: {
        q: 'En ArcLycée, el medidor de hostilidad sube cuando usas la violencia contra tus oponentes.',
        answer: true,
        explanation: 'La hostilidad aumenta con acciones agresivas. Convicción y hostilidad son fuerzas opuestas, como la luz y la oscuridad en Star Wars.'
      },
      en: {
        q: 'In ArcLycée, the hostility meter rises when you use violence against opponents.',
        answer: true,
        explanation: 'Hostility increases with aggressive actions. Conviction and hostility are opposing forces, like light and dark in Star Wars.'
      },
      fr: {
        q: 'Dans ArcLycée, le compteur d\'hostilité monte quand on utilise la violence contre les adversaires.',
        answer: true,
        explanation: 'L\'hostilité augmente avec les actions agressives. Conviction et hostilité sont des forces opposées, comme la lumière et l\'obscurité dans Star Wars.'
      }
    }
  },

  {
    id: 'soc-020', type: 'tf',
    lang: {
      es: {
        q: 'Limpiar un arrecife de coral contaminado es un acto de responsabilidad ecológica que el juego recompensa.',
        answer: true,
        explanation: 'La limpieza del arrecife suma a tus acciones ecológicas y ayuda a completar la misión del manatí. Cada acción cuenta.'
      },
      en: {
        q: 'Cleaning a contaminated coral reef is an act of ecological responsibility that the game rewards.',
        answer: true,
        explanation: 'Reef cleaning adds to your ecological actions and helps complete the manatee mission. Every action counts.'
      },
      fr: {
        q: 'Nettoyer un récif de corail contaminé est un acte de responsabilité écologique que le jeu récompense.',
        answer: true,
        explanation: 'Le nettoyage du récif s\'ajoute aux actions écologiques et aide à compléter la mission du lamantin. Chaque action compte.'
      }
    }
  },

  {
    id: 'soc-021', type: 'tf',
    lang: {
      es: {
        q: 'El final "oscuro" se obtiene cuando el jugador resuelve todos los conflictos de manera violenta.',
        answer: true,
        explanation: 'El final oscuro refleja las consecuencias de elegir siempre la violencia. Como en Undertale, la ruta genocida tiene un precio.'
      },
      en: {
        q: 'The "dark" ending is obtained when the player resolves all conflicts violently.',
        answer: true,
        explanation: 'The dark ending reflects the consequences of always choosing violence. Like in Undertale, the genocide route has a price.'
      },
      fr: {
        q: 'La fin "sombre" s\'obtient quand le joueur résout tous les conflits de manière violente.',
        answer: true,
        explanation: 'La fin sombre reflète les conséquences de toujours choisir la violence. Comme dans Undertale, la route génocide a un prix.'
      }
    }
  },

  {
    id: 'soc-022', type: 'tf',
    lang: {
      es: {
        q: 'Usar la prensa como herramienta contra el Constructor Méndez es una forma de activismo mediático.',
        answer: true,
        explanation: 'Llamar a la prensa expone la destrucción del patrimonio. La libertad de prensa es una herramienta democrática real.'
      },
      en: {
        q: 'Using the press as a tool against Builder Mendez is a form of media activism.',
        answer: true,
        explanation: 'Calling the press exposes heritage destruction. Freedom of the press is a real democratic tool.'
      },
      fr: {
        q: 'Utiliser la presse comme outil contre le Constructeur Mendez est une forme d\'activisme médiatique.',
        answer: true,
        explanation: 'Appeler la presse expose la destruction du patrimoine. La liberté de la presse est un outil démocratique réel.'
      }
    }
  },

  {
    id: 'soc-023', type: 'tf',
    lang: {
      es: {
        q: 'El final pacifista requiere completar 8+ nodos y que todos los combates sean pacificados.',
        answer: true,
        explanation: 'El final pacifista premia la consistencia: explorar el mundo Y resolver cada conflicto sin violencia.'
      },
      en: {
        q: 'The pacifist ending requires completing 8+ nodes and having all combats pacified.',
        answer: true,
        explanation: 'The pacifist ending rewards consistency: exploring the world AND resolving every conflict without violence.'
      },
      fr: {
        q: 'La fin pacifiste requiert de compléter 8+ nœuds et que tous les combats soient pacifiés.',
        answer: true,
        explanation: 'La fin pacifiste récompense la cohérence : explorer le monde ET résoudre chaque conflit sans violence.'
      }
    }
  },

  {
    id: 'soc-024', type: 'tf',
    lang: {
      es: {
        q: 'Proteger el coral es una de las cuatro opciones ecológicas en el combate contra el pez león.',
        answer: true,
        explanation: 'Las 4 opciones son: atrapar, pescar con arpón, proteger coral y alertar buzos. Todas defienden el ecosistema marino.'
      },
      en: {
        q: 'Protecting the coral is one of the four ecological options in the lionfish combat.',
        answer: true,
        explanation: 'The 4 options are: trapping, spearfishing, protecting coral, and alerting divers. All defend the marine ecosystem.'
      },
      fr: {
        q: 'Protéger le corail est l\'une des quatre options écologiques dans le combat contre le poisson-lion.',
        answer: true,
        explanation: 'Les 4 options sont : piéger, pêcher au harpon, protéger le corail et alerter les plongeurs. Toutes défendent l\'écosystème marin.'
      }
    }
  },

  {
    id: 'soc-025', type: 'tf',
    lang: {
      es: {
        q: 'En el juego, las palabras y la evidencia pueden ser más poderosas que la fuerza física.',
        answer: true,
        explanation: 'El sistema de convicción demuestra que los argumentos ganan batallas. Como dice Batman: la mente es el arma más peligrosa.'
      },
      en: {
        q: 'In the game, words and evidence can be more powerful than physical force.',
        answer: true,
        explanation: 'The conviction system shows that arguments win battles. As Batman says: the mind is the most dangerous weapon.'
      },
      fr: {
        q: 'Dans le jeu, les mots et les preuves peuvent être plus puissants que la force physique.',
        answer: true,
        explanation: 'Le système de conviction démontre que les arguments gagnent des batailles. Comme dit Batman : l\'esprit est l\'arme la plus dangereuse.'
      }
    }
  },

  // ===== MULTIPLE CHOICE (soc-026 a soc-050) =====

  {
    id: 'soc-026', type: 'mcq',
    lang: {
      es: {
        q: '¿En ArcLycée, como en Undertale, puedes ganar sin hacer daño. Qué sube cuando convences al enemigo?',
        options: ['Barra de vida', 'Medidor de convicción', 'Medidor de hostilidad', 'Puntos de experiencia'],
        answer: 1,
        explanation: 'El medidor de convicción sube con diálogo y argumentos. Al llegar a 100%, ganas sin violencia.'
      },
      en: {
        q: 'In ArcLycée, like in Undertale, you can win without causing harm. What rises when you convince the enemy?',
        options: ['Health bar', 'Conviction meter', 'Hostility meter', 'Experience points'],
        answer: 1,
        explanation: 'The conviction meter rises with dialogue and arguments. At 100%, you win without violence.'
      },
      fr: {
        q: 'Dans ArcLycée, comme dans Undertale, on peut gagner sans faire de mal. Qu\'est-ce qui monte quand tu convaincs l\'ennemi ?',
        options: ['Barre de vie', 'Compteur de conviction', 'Compteur d\'hostilité', 'Points d\'expérience'],
        answer: 1,
        explanation: 'Le compteur de conviction monte avec le dialogue et les arguments. À 100%, tu gagnes sans violence.'
      }
    }
  },

  {
    id: 'soc-027', type: 'mcq',
    lang: {
      es: {
        q: '¿Si la regla de Batman de "no matar" fuera una mecánica de juego, qué medidor llenaría?',
        options: ['Hostilidad', 'Fuerza', 'Convicción', 'Daño'],
        answer: 2,
        explanation: 'Batman derrota villanos sin matarlos, igual que la ruta pacifista. Convicción = ganar con principios.'
      },
      en: {
        q: 'If Batman\'s "no kill rule" were a game mechanic, which meter would it fill?',
        options: ['Hostility', 'Strength', 'Conviction', 'Damage'],
        answer: 2,
        explanation: 'Batman defeats villains without killing them, just like the pacifist route. Conviction = winning with principles.'
      },
      fr: {
        q: 'Si la règle de Batman de "ne pas tuer" était une mécanique de jeu, quel compteur remplirait-elle ?',
        options: ['Hostilité', 'Force', 'Conviction', 'Dégâts'],
        answer: 2,
        explanation: 'Batman vainc les vilains sans les tuer, comme la route pacifiste. Conviction = gagner avec des principes.'
      }
    }
  },

  {
    id: 'soc-028', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuántos finales diferentes tiene ArcLycée?',
        options: ['2', '3', '5', '10'],
        answer: 2,
        explanation: 'Hay 5 finales: completo, pacifista, museo, ecológico y oscuro. Cada uno refleja un estilo de juego diferente.'
      },
      en: {
        q: 'How many different endings does ArcLycée have?',
        options: ['2', '3', '5', '10'],
        answer: 2,
        explanation: 'There are 5 endings: complete, pacifist, museum, ecological, and dark. Each reflects a different play style.'
      },
      fr: {
        q: 'Combien de fins différentes a ArcLycée ?',
        options: ['2', '3', '5', '10'],
        answer: 2,
        explanation: 'Il y a 5 fins : complète, pacifiste, musée, écologique et sombre. Chacune reflète un style de jeu différent.'
      }
    }
  },

  {
    id: 'soc-029', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuál de estas NO es una opción contra el traficante Torres en el combate legal?',
        options: ['Ley 318', 'Evidencia forense', 'INTERPOL', 'Espada de combate'],
        answer: 3,
        explanation: 'Contra Torres usas la ley, la ciencia y organizaciones internacionales. No hay espadas, es un combate de argumentos.'
      },
      en: {
        q: 'Which of these is NOT an option against trafficker Torres in legal combat?',
        options: ['Law 318', 'Forensic evidence', 'INTERPOL', 'Combat sword'],
        answer: 3,
        explanation: 'Against Torres you use law, science, and international organizations. No swords here, it is a battle of arguments.'
      },
      fr: {
        q: 'Laquelle de ces options N\'est PAS une option contre le trafiquant Torres en combat légal ?',
        options: ['Loi 318', 'Preuves médico-légales', 'INTERPOL', 'Épée de combat'],
        answer: 3,
        explanation: 'Contre Torres on utilise la loi, la science et les organisations internationales. Pas d\'épées, c\'est un combat d\'arguments.'
      }
    }
  },

  {
    id: 'soc-030', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué reputación ganas con una victoria pacífica vs una violenta?',
        options: ['+5 pacífica, +15 violenta', '+15 pacífica, +5 violenta', '+10 ambas', '+20 pacífica, +0 violenta'],
        answer: 1,
        explanation: 'Pacífica = +15, violenta = +5. El juego te da tres veces más reputación por resolver sin violencia.'
      },
      en: {
        q: 'What reputation do you gain from a peaceful victory vs a violent one?',
        options: ['+5 peaceful, +15 violent', '+15 peaceful, +5 violent', '+10 both', '+20 peaceful, +0 violent'],
        answer: 1,
        explanation: 'Peaceful = +15, violent = +5. The game gives you three times more reputation for solving without violence.'
      },
      fr: {
        q: 'Quelle réputation gagnes-tu avec une victoire pacifique vs violente ?',
        options: ['+5 pacifique, +15 violente', '+15 pacifique, +5 violente', '+10 les deux', '+20 pacifique, +0 violente'],
        answer: 1,
        explanation: 'Pacifique = +15, violente = +5. Le jeu donne trois fois plus de réputation pour résoudre sans violence.'
      }
    }
  },

  {
    id: 'soc-031', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué ley dominicana usas como arma legal contra el traficante de artefactos?',
        options: ['Ley 100-00', 'Ley 318-68', 'Ley 502-99', 'Ley 64-00'],
        answer: 1,
        explanation: 'La Ley 318-68 protege el patrimonio cultural dominicano. Conocer tus derechos es un superpoder real.'
      },
      en: {
        q: 'What Dominican law do you use as a legal weapon against the artifact trafficker?',
        options: ['Law 100-00', 'Law 318-68', 'Law 502-99', 'Law 64-00'],
        answer: 1,
        explanation: 'Law 318-68 protects Dominican cultural heritage. Knowing your rights is a real superpower.'
      },
      fr: {
        q: 'Quelle loi dominicaine utilises-tu comme arme légale contre le trafiquant d\'artefacts ?',
        options: ['Loi 100-00', 'Loi 318-68', 'Loi 502-99', 'Loi 64-00'],
        answer: 1,
        explanation: 'La Loi 318-68 protège le patrimoine culturel dominicain. Connaître tes droits est un vrai superpouvoir.'
      }
    }
  },

  {
    id: 'soc-032', type: 'mcq',
    lang: {
      es: {
        q: '¿En el combate contra el Constructor Méndez, cuál de estas es una opción cívica?',
        options: ['Lanzar piedras', 'Carteles de protesta', 'Incendiar la obra', 'Hackear su cuenta bancaria'],
        answer: 1,
        explanation: 'Los carteles de protesta son activismo pacífico legal. Como los X-Men de Xavier, no los de Magneto.'
      },
      en: {
        q: 'In combat against Builder Mendez, which of these is a civic option?',
        options: ['Throwing rocks', 'Protest signs', 'Setting the construction on fire', 'Hacking his bank account'],
        answer: 1,
        explanation: 'Protest signs are legal peaceful activism. Like Xavier\'s X-Men approach, not Magneto\'s.'
      },
      fr: {
        q: 'Dans le combat contre le Constructeur Mendez, laquelle de ces options est civique ?',
        options: ['Lancer des pierres', 'Pancartes de protestation', 'Incendier le chantier', 'Pirater son compte bancaire'],
        answer: 1,
        explanation: 'Les pancartes de protestation sont de l\'activisme pacifique légal. Comme les X-Men de Xavier, pas ceux de Magneto.'
      }
    }
  },

  {
    id: 'soc-033', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuál organización internacional ayuda a detener el tráfico de artefactos culturales entre países?',
        options: ['FIFA', 'INTERPOL', 'NASA', 'OMS'],
        answer: 1,
        explanation: 'INTERPOL coordina la policía internacional contra el tráfico de bienes culturales. Es como el S.H.I.E.L.D. del mundo real.'
      },
      en: {
        q: 'Which international organization helps stop the trafficking of cultural artifacts between countries?',
        options: ['FIFA', 'INTERPOL', 'NASA', 'WHO'],
        answer: 1,
        explanation: 'INTERPOL coordinates international police against cultural property trafficking. Like a real-world S.H.I.E.L.D.'
      },
      fr: {
        q: 'Quelle organisation internationale aide à stopper le trafic d\'artefacts culturels entre pays ?',
        options: ['FIFA', 'INTERPOL', 'NASA', 'OMS'],
        answer: 1,
        explanation: 'INTERPOL coordonne la police internationale contre le trafic de biens culturels. Comme un S.H.I.E.L.D. du monde réel.'
      }
    }
  },

  {
    id: 'soc-034', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué medidor muestra el combate contra el pez león en lugar de "Convencido"?',
        options: ['"Derrotado:"', '"Controlado:"', '"Eliminado:"', '"Capturado:"'],
        answer: 1,
        explanation: 'El pez león usa "Controlado:" porque no se trata de convencer a un pez, sino de controlar una especie invasora.'
      },
      en: {
        q: 'What label does the lionfish combat show instead of "Convinced"?',
        options: ['"Defeated:"', '"Controlled:"', '"Eliminated:"', '"Captured:"'],
        answer: 1,
        explanation: 'The lionfish uses "Controlled:" because it is not about convincing a fish, but controlling an invasive species.'
      },
      fr: {
        q: 'Quelle étiquette le combat du poisson-lion affiche-t-il au lieu de "Convaincu" ?',
        options: ['"Vaincu :"', '"Contrôlé :"', '"Éliminé :"', '"Capturé :"'],
        answer: 1,
        explanation: 'Le poisson-lion utilise "Contrôlé :" car il ne s\'agit pas de convaincre un poisson, mais de contrôler une espèce invasive.'
      }
    }
  },

  {
    id: 'soc-035', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué etiqueta especial usa el combate contra Torres en lugar de "Convencido"?',
        options: ['"Culpable:"', '"Evidencia:"', '"Arrestado:"', '"Acusado:"'],
        answer: 1,
        explanation: 'Contra Torres, acumulas evidencia legal. El medidor se llama "Evidencia:" porque es un caso jurídico, no una pelea.'
      },
      en: {
        q: 'What special label does the Torres combat use instead of "Convinced"?',
        options: ['"Guilty:"', '"Evidence:"', '"Arrested:"', '"Accused:"'],
        answer: 1,
        explanation: 'Against Torres, you accumulate legal evidence. The meter is called "Evidence:" because it is a legal case, not a fight.'
      },
      fr: {
        q: 'Quelle étiquette spéciale le combat contre Torres utilise-t-il au lieu de "Convaincu" ?',
        options: ['"Coupable :"', '"Preuve :"', '"Arrêté :"', '"Accusé :"'],
        answer: 1,
        explanation: 'Contre Torres, on accumule des preuves légales. Le compteur s\'appelle "Preuve :" car c\'est un cas juridique, pas un combat.'
      }
    }
  },

  {
    id: 'soc-036', type: 'mcq',
    lang: {
      es: {
        q: '¿Como Captain America usando diplomacia antes que fuerza, cuál es la mejor primera opción en ArcLycée?',
        options: ['Atacar con todo', 'Dialogar y convencer', 'Huir siempre', 'Ignorar al enemigo'],
        answer: 1,
        explanation: 'Como Cap negociando antes de pelear, el diálogo es la herramienta más poderosa. Te da más reputación y mejores finales.'
      },
      en: {
        q: 'Like Captain America using diplomacy before force, what is the best first option in ArcLycée?',
        options: ['Attack with everything', 'Talk and convince', 'Always flee', 'Ignore the enemy'],
        answer: 1,
        explanation: 'Like Cap negotiating before fighting, dialogue is the most powerful tool. It gives you more reputation and better endings.'
      },
      fr: {
        q: 'Comme Captain America utilisant la diplomatie avant la force, quelle est la meilleure première option dans ArcLycée ?',
        options: ['Attaquer à fond', 'Dialoguer et convaincre', 'Toujours fuir', 'Ignorer l\'ennemi'],
        answer: 1,
        explanation: 'Comme Cap négociant avant de combattre, le dialogue est l\'outil le plus puissant. Il donne plus de réputation et de meilleures fins.'
      }
    }
  },

  {
    id: 'soc-037', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué dos acciones ecológicas completan la misión del manatí en el Santuario?',
        options: ['Pescar y nadar', 'Liberar manatí y limpiar arrecife', 'Fotografiar y bucear', 'Alimentar y curar'],
        answer: 1,
        explanation: 'Liberar al manatí atrapado y limpiar el arrecife contaminado son las dos acciones que completan la misión ecológica.'
      },
      en: {
        q: 'What two ecological actions complete the manatee mission in the Sanctuary?',
        options: ['Fish and swim', 'Free manatee and clean reef', 'Photograph and dive', 'Feed and heal'],
        answer: 1,
        explanation: 'Freeing the trapped manatee and cleaning the contaminated reef are the two actions that complete the ecological mission.'
      },
      fr: {
        q: 'Quelles deux actions écologiques complètent la mission du lamantin dans le Sanctuaire ?',
        options: ['Pêcher et nager', 'Libérer le lamantin et nettoyer le récif', 'Photographier et plonger', 'Nourrir et soigner'],
        answer: 1,
        explanation: 'Libérer le lamantin piégé et nettoyer le récif contaminé sont les deux actions qui complètent la mission écologique.'
      }
    }
  },

  {
    id: 'soc-038', type: 'mcq',
    lang: {
      es: {
        q: '¿En el duelo contra el Soldado Diego, qué opciones de diálogo tienes antes de pelear?',
        options: ['Solo atacar', 'Atacar, Hablar, Negociar, Huir', 'Atacar o Defender', 'Hablar o Callar'],
        answer: 1,
        explanation: 'Tienes 4 opciones: Atacar (agresivo), Hablar (pacífico), Negociar (pacífico) y Huir (pacífico). 3 de 4 son pacíficas.'
      },
      en: {
        q: 'In the duel against Soldier Diego, what dialogue options do you have before fighting?',
        options: ['Only attack', 'Attack, Talk, Negotiate, Flee', 'Attack or Defend', 'Talk or Stay Silent'],
        answer: 1,
        explanation: 'You have 4 options: Attack (aggressive), Talk (peaceful), Negotiate (peaceful), and Flee (peaceful). 3 out of 4 are peaceful.'
      },
      fr: {
        q: 'Dans le duel contre le Soldat Diego, quelles options de dialogue as-tu avant de combattre ?',
        options: ['Seulement attaquer', 'Attaquer, Parler, Négocier, Fuir', 'Attaquer ou Défendre', 'Parler ou Se taire'],
        answer: 1,
        explanation: 'Tu as 4 options : Attaquer (agressif), Parler (pacifique), Négocier (pacifique) et Fuir (pacifique). 3 sur 4 sont pacifiques.'
      }
    }
  },

  {
    id: 'soc-039', type: 'mcq',
    lang: {
      es: {
        q: '¿Como en Gravity Falls donde Dipper resuelve misterios con pistas, qué usas contra Torres?',
        options: ['Fuerza bruta', 'Evidencia y leyes', 'Magia', 'Sobornos'],
        answer: 1,
        explanation: 'Como Dipper con su diario, tu arma es la información: evidencia forense, leyes y cooperación internacional.'
      },
      en: {
        q: 'Like in Gravity Falls where Dipper solves mysteries with clues, what do you use against Torres?',
        options: ['Brute force', 'Evidence and laws', 'Magic', 'Bribes'],
        answer: 1,
        explanation: 'Like Dipper with his journal, your weapon is information: forensic evidence, laws, and international cooperation.'
      },
      fr: {
        q: 'Comme dans Gravity Falls où Dipper résout des mystères avec des indices, qu\'utilises-tu contre Torres ?',
        options: ['Force brute', 'Preuves et lois', 'Magie', 'Pots-de-vin'],
        answer: 1,
        explanation: 'Comme Dipper avec son journal, ton arme est l\'information : preuves médico-légales, lois et coopération internationale.'
      }
    }
  },

  {
    id: 'soc-040', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué pasa al final del combate legal contra Torres? (Piensa en una escena de película policíaca.)',
        options: ['Torres escapa', 'Torres es arrestado cinematográficamente', 'Torres se une a tu equipo', 'Nada especial'],
        answer: 1,
        explanation: 'Miguel Sánchez y el Agente Montero caminan hacia Torres, lo arrestan con diálogo, y lo escoltan fuera. Justicia cinematográfica.'
      },
      en: {
        q: 'What happens at the end of the legal combat against Torres? (Think of a cop movie scene.)',
        options: ['Torres escapes', 'Torres is cinematically arrested', 'Torres joins your team', 'Nothing special'],
        answer: 1,
        explanation: 'Miguel Sanchez and Agent Montero walk toward Torres, arrest him with dialogue, and escort him out. Cinematic justice.'
      },
      fr: {
        q: 'Que se passe-t-il à la fin du combat légal contre Torres ? (Pense à une scène de film policier.)',
        options: ['Torres s\'échappe', 'Torres est arrêté de manière cinématographique', 'Torres rejoint ton équipe', 'Rien de spécial'],
        answer: 1,
        explanation: 'Miguel Sánchez et l\'Agent Montero marchent vers Torres, l\'arrêtent par dialogue et l\'escortent dehors. Justice cinématographique.'
      }
    }
  },

  {
    id: 'soc-041', type: 'mcq',
    lang: {
      es: {
        q: '¿En qué año se firmó la Convención UNESCO contra el tráfico de bienes culturales?',
        options: ['1945', '1960', '1970', '2000'],
        answer: 2,
        explanation: 'La Convención UNESCO de 1970 es el tratado internacional más importante contra el tráfico de patrimonio cultural.'
      },
      en: {
        q: 'In what year was the UNESCO Convention against cultural property trafficking signed?',
        options: ['1945', '1960', '1970', '2000'],
        answer: 2,
        explanation: 'The 1970 UNESCO Convention is the most important international treaty against cultural heritage trafficking.'
      },
      fr: {
        q: 'En quelle année la Convention UNESCO contre le trafic de biens culturels a-t-elle été signée ?',
        options: ['1945', '1960', '1970', '2000'],
        answer: 2,
        explanation: 'La Convention UNESCO de 1970 est le traité international le plus important contre le trafic de patrimoine culturel.'
      }
    }
  },

  {
    id: 'soc-042', type: 'mcq',
    lang: {
      es: {
        q: '¿Como Finn en Adventure Time enfrentando dilemas morales, qué rastrean las decisiones en ArcLycée?',
        options: ['Solo puntos', 'Combates pacificados vs violentos', 'Tiempo de juego', 'Monedas recogidas'],
        answer: 1,
        explanation: 'El juego cuenta separadamente combates pacificados y violentos. Cada decisión moral tiene peso, como las de Finn.'
      },
      en: {
        q: 'Like Finn in Adventure Time facing moral dilemmas, what do decisions track in ArcLycée?',
        options: ['Just points', 'Pacified vs violent combats', 'Play time', 'Coins collected'],
        answer: 1,
        explanation: 'The game separately counts pacified and violent combats. Each moral decision carries weight, like Finn\'s choices.'
      },
      fr: {
        q: 'Comme Finn dans Adventure Time face à des dilemmes moraux, que suivent les décisions dans ArcLycée ?',
        options: ['Juste des points', 'Combats pacifiés vs violents', 'Temps de jeu', 'Pièces ramassées'],
        answer: 1,
        explanation: 'Le jeu compte séparément les combats pacifiés et violents. Chaque décision morale a du poids, comme celles de Finn.'
      }
    }
  },

  {
    id: 'soc-043', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuál es el principal problema ecológico del pez león en el Caribe?',
        options: ['Es demasiado bonito', 'Es una especie invasora que destruye ecosistemas', 'Es venenoso para los humanos', 'Roba comida a los pescadores'],
        answer: 1,
        explanation: 'El pez león es invasor: devora peces nativos y daña arrecifes. Controlarlo es responsabilidad ecológica, no crueldad.'
      },
      en: {
        q: 'What is the main ecological problem of the lionfish in the Caribbean?',
        options: ['It is too pretty', 'It is an invasive species that destroys ecosystems', 'It is poisonous to humans', 'It steals food from fishers'],
        answer: 1,
        explanation: 'The lionfish is invasive: it devours native fish and damages reefs. Controlling it is ecological responsibility, not cruelty.'
      },
      fr: {
        q: 'Quel est le principal problème écologique du poisson-lion dans les Caraïbes ?',
        options: ['Il est trop beau', 'C\'est une espèce invasive qui détruit les écosystèmes', 'Il est venimeux pour les humains', 'Il vole la nourriture des pêcheurs'],
        answer: 1,
        explanation: 'Le poisson-lion est invasif : il dévore les poissons natifs et endommage les récifs. Le contrôler est une responsabilité écologique.'
      }
    }
  },

  {
    id: 'soc-044', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué pasa cuando la hostilidad del enemigo sube demasiado en un combate?',
        options: ['Nada, es solo visual', 'El combate se vuelve más difícil y peligroso', 'Ganas automáticamente', 'El enemigo huye'],
        answer: 1,
        explanation: 'Alta hostilidad = enemigo más agresivo. Es la consecuencia directa de usar violencia. Las acciones tienen consecuencias.'
      },
      en: {
        q: 'What happens when the enemy\'s hostility rises too much in combat?',
        options: ['Nothing, it is just visual', 'Combat becomes harder and more dangerous', 'You win automatically', 'The enemy flees'],
        answer: 1,
        explanation: 'High hostility = more aggressive enemy. It is the direct consequence of using violence. Actions have consequences.'
      },
      fr: {
        q: 'Que se passe-t-il quand l\'hostilité de l\'ennemi monte trop dans un combat ?',
        options: ['Rien, c\'est juste visuel', 'Le combat devient plus difficile et dangereux', 'Tu gagnes automatiquement', 'L\'ennemi fuit'],
        answer: 1,
        explanation: 'Haute hostilité = ennemi plus agressif. C\'est la conséquence directe de la violence. Les actions ont des conséquences.'
      }
    }
  },

  {
    id: 'soc-045', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué final obtiene un jugador que explora todo pero usa violencia en algunos combates?',
        options: ['Final completo', 'Final pacifista', 'Final museo o ecológico', 'Final oscuro'],
        answer: 2,
        explanation: 'Sin pacificar todos los combates no puedes ser completo ni pacifista. Dependiendo de tus acciones, será museo o ecológico.'
      },
      en: {
        q: 'What ending does a player get who explores everything but uses violence in some combats?',
        options: ['Complete ending', 'Pacifist ending', 'Museum or ecological ending', 'Dark ending'],
        answer: 2,
        explanation: 'Without pacifying all combats you cannot get complete or pacifist. Depending on your actions, it will be museum or ecological.'
      },
      fr: {
        q: 'Quelle fin obtient un joueur qui explore tout mais utilise la violence dans certains combats ?',
        options: ['Fin complète', 'Fin pacifiste', 'Fin musée ou écologique', 'Fin sombre'],
        answer: 2,
        explanation: 'Sans pacifier tous les combats, pas de fin complète ni pacifiste. Selon tes actions, ce sera musée ou écologique.'
      }
    }
  },

  {
    id: 'soc-046', type: 'mcq',
    lang: {
      es: {
        q: '¿Como el equipo de Luffy en One Piece resuelve problemas a través de lazos, qué recurso usa ArcLycée?',
        options: ['Dinero', 'Compañeros que suman fuerza al atacar', 'Nada, vas solo', 'Trucos mágicos'],
        answer: 1,
        explanation: 'Tus compañeros (Magnoboot +3, Viralata +2, Cemí +4) aportan fuerza extra, pero la verdadera fuerza es la cooperación.'
      },
      en: {
        q: 'Like Luffy\'s crew in One Piece solving problems through bonds, what resource does ArcLycée use?',
        options: ['Money', 'Companions who add strength when attacking', 'Nothing, you go alone', 'Magic tricks'],
        answer: 1,
        explanation: 'Your companions (Magnoboot +3, Viralata +2, Cemi +4) add extra strength, but the real power is cooperation.'
      },
      fr: {
        q: 'Comme l\'équipage de Luffy dans One Piece résout les problèmes par les liens, quelle ressource utilise ArcLycée ?',
        options: ['Argent', 'Compagnons qui ajoutent de la force en attaquant', 'Rien, tu y vas seul', 'Tours de magie'],
        answer: 1,
        explanation: 'Tes compagnons (Magnoboot +3, Viralata +2, Cemí +4) ajoutent de la force, mais le vrai pouvoir est la coopération.'
      }
    }
  },

  {
    id: 'soc-047', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué ganas al completar las dos acciones ecológicas en el Santuario del Manatí?',
        options: ['Un arma especial', '+10 reputación por cada acción y completar la misión', 'Solo experiencia', 'Una nueva escena'],
        answer: 1,
        explanation: 'Cada acción ecológica da +10 reputación y al completar ambas se termina la misión secundaria rescateManatí.'
      },
      en: {
        q: 'What do you earn by completing both ecological actions in the Manatee Sanctuary?',
        options: ['A special weapon', '+10 reputation per action and quest completion', 'Just experience', 'A new scene'],
        answer: 1,
        explanation: 'Each ecological action gives +10 reputation and completing both finishes the rescueManatee side quest.'
      },
      fr: {
        q: 'Que gagnes-tu en complétant les deux actions écologiques dans le Sanctuaire du Lamantin ?',
        options: ['Une arme spéciale', '+10 réputation par action et complétion de la quête', 'Juste de l\'expérience', 'Une nouvelle scène'],
        answer: 1,
        explanation: 'Chaque action écologique donne +10 réputation et compléter les deux termine la quête secondaire sauvetageManatin.'
      }
    }
  },

  {
    id: 'soc-048', type: 'mcq',
    lang: {
      es: {
        q: '¿Si Dumbledore prefería hablar antes que luchar, qué medidor subiría en ArcLycée?',
        options: ['Hostilidad', 'Convicción', 'Daño', 'Velocidad'],
        answer: 1,
        explanation: 'Dumbledore siempre ofreció redención primero. En ArcLycée, el diálogo sube la convicción, no la hostilidad.'
      },
      en: {
        q: 'If Dumbledore preferred talking to fighting, what meter would rise in ArcLycée?',
        options: ['Hostility', 'Conviction', 'Damage', 'Speed'],
        answer: 1,
        explanation: 'Dumbledore always offered redemption first. In ArcLycée, dialogue raises conviction, not hostility.'
      },
      fr: {
        q: 'Si Dumbledore préférait parler plutôt que combattre, quel compteur monterait dans ArcLycée ?',
        options: ['Hostilité', 'Conviction', 'Dégâts', 'Vitesse'],
        answer: 1,
        explanation: 'Dumbledore offrait toujours la rédemption d\'abord. Dans ArcLycée, le dialogue monte la conviction, pas l\'hostilité.'
      }
    }
  },

  {
    id: 'soc-049', type: 'mcq',
    lang: {
      es: {
        q: '¿En qué ubicación del juego ocurre el combate legal contra el traficante Torres?',
        options: ['Una cueva', 'El aeropuerto de Punta Cana', 'El museo', 'La playa'],
        answer: 1,
        explanation: 'El Mundo Jurídico se sitúa en el aeropuerto de Punta Cana, donde Torres intenta sacar artefactos del país.'
      },
      en: {
        q: 'In what game location does the legal combat against trafficker Torres take place?',
        options: ['A cave', 'Punta Cana airport', 'The museum', 'The beach'],
        answer: 1,
        explanation: 'The Legal World is set at Punta Cana airport, where Torres tries to take artifacts out of the country.'
      },
      fr: {
        q: 'Dans quel lieu du jeu se déroule le combat légal contre le trafiquant Torres ?',
        options: ['Une grotte', 'L\'aéroport de Punta Cana', 'Le musée', 'La plage'],
        answer: 1,
        explanation: 'Le Monde Juridique se situe à l\'aéroport de Punta Cana, où Torres essaie de sortir des artefacts du pays.'
      }
    }
  },

  {
    id: 'soc-050', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuántas opciones ecológicas tienes en el combate contra el pez león?',
        options: ['2', '3', '4', '6'],
        answer: 2,
        explanation: 'Hay 4 opciones: atrapar, pescar con arpón, proteger coral y alertar buzos. Todas son ecológicamente responsables.'
      },
      en: {
        q: 'How many ecological options do you have in the lionfish combat?',
        options: ['2', '3', '4', '6'],
        answer: 2,
        explanation: 'There are 4 options: trapping, spearfishing, protecting coral, and alerting divers. All are ecologically responsible.'
      },
      fr: {
        q: 'Combien d\'options écologiques as-tu dans le combat contre le poisson-lion ?',
        options: ['2', '3', '4', '6'],
        answer: 2,
        explanation: 'Il y a 4 options : piéger, pêcher au harpon, protéger le corail et alerter les plongeurs. Toutes sont écologiquement responsables.'
      }
    }
  },

  // ===== FILL IN THE BLANK (soc-051 a soc-075) =====

  {
    id: 'soc-051', type: 'fill',
    lang: {
      es: {
        q: 'El medidor de _______ debe llegar a 100% para ganar un combate sin violencia.',
        answer: 'convicción',
        explanation: 'La convicción mide cuánto has persuadido al oponente. 100% = victoria pacífica total.'
      },
      en: {
        q: 'The _______ meter must reach 100% to win a combat without violence.',
        answer: 'conviction',
        explanation: 'Conviction measures how much you have persuaded the opponent. 100% = total peaceful victory.'
      },
      fr: {
        q: 'Le compteur de _______ doit atteindre 100% pour gagner un combat sans violence.',
        answer: 'conviction',
        explanation: 'La conviction mesure combien tu as persuadé l\'adversaire. 100% = victoire pacifique totale.'
      }
    }
  },

  {
    id: 'soc-052', type: 'fill',
    lang: {
      es: {
        q: 'Las victorias pacíficas dan +_______ de reputación, tres veces más que las violentas.',
        answer: '15',
        explanation: 'Pacífica = +15, violenta = +5. El juego recompensa claramente la diplomacia sobre la fuerza.'
      },
      en: {
        q: 'Peaceful victories give +_______ reputation, three times more than violent ones.',
        answer: '15',
        explanation: 'Peaceful = +15, violent = +5. The game clearly rewards diplomacy over force.'
      },
      fr: {
        q: 'Les victoires pacifiques donnent +_______ de réputation, trois fois plus que les violentes.',
        answer: '15',
        explanation: 'Pacifique = +15, violente = +5. Le jeu récompense clairement la diplomatie plutôt que la force.'
      }
    }
  },

  {
    id: 'soc-053', type: 'fill',
    lang: {
      es: {
        q: 'La Ley _______-68 de la República Dominicana protege el patrimonio cultural.',
        answer: '318',
        explanation: 'La Ley 318-68 es la principal herramienta legal dominicana para proteger bienes culturales.'
      },
      en: {
        q: 'Law _______-68 of the Dominican Republic protects cultural heritage.',
        answer: '318',
        explanation: 'Law 318-68 is the main Dominican legal tool to protect cultural property.'
      },
      fr: {
        q: 'La Loi _______-68 de la République dominicaine protège le patrimoine culturel.',
        answer: '318',
        explanation: 'La Loi 318-68 est le principal outil juridique dominicain pour protéger les biens culturels.'
      }
    }
  },

  {
    id: 'soc-054', type: 'fill',
    lang: {
      es: {
        q: 'La Convención UNESCO de _______ combate el tráfico ilícito de bienes culturales.',
        answer: '1970',
        explanation: 'La Convención de 1970 es un hito internacional en la protección del patrimonio de la humanidad.'
      },
      en: {
        q: 'The UNESCO Convention of _______ combats the illicit trafficking of cultural property.',
        answer: '1970',
        explanation: 'The 1970 Convention is an international milestone in protecting humanity\'s heritage.'
      },
      fr: {
        q: 'La Convention UNESCO de _______ combat le trafic illicite de biens culturels.',
        answer: '1970',
        explanation: 'La Convention de 1970 est un jalon international dans la protection du patrimoine de l\'humanité.'
      }
    }
  },

  {
    id: 'soc-055', type: 'fill',
    lang: {
      es: {
        q: 'ArcLycée tiene _______ finales diferentes según las decisiones del jugador.',
        answer: '5',
        explanation: 'Los 5 finales son: completo, pacifista, museo, ecológico y oscuro. Tus elecciones moldean la historia.'
      },
      en: {
        q: 'ArcLycée has _______ different endings depending on the player\'s decisions.',
        answer: '5',
        explanation: 'The 5 endings are: complete, pacifist, museum, ecological, and dark. Your choices shape the story.'
      },
      fr: {
        q: 'ArcLycée a _______ fins différentes selon les décisions du joueur.',
        answer: '5',
        explanation: 'Les 5 fins sont : complète, pacifiste, musée, écologique et sombre. Tes choix façonnent l\'histoire.'
      }
    }
  },

  {
    id: 'soc-056', type: 'fill',
    lang: {
      es: {
        q: 'Contra el Constructor Méndez, puedes formar una cadena _______ para proteger el patrimonio.',
        answer: 'humana',
        explanation: 'La cadena humana es una forma clásica de protesta no violenta. Cuerpos unidos como escudo pacífico.'
      },
      en: {
        q: 'Against Builder Mendez, you can form a human _______ to protect heritage.',
        answer: 'chain',
        explanation: 'The human chain is a classic form of nonviolent protest. Bodies united as a peaceful shield.'
      },
      fr: {
        q: 'Contre le Constructeur Mendez, on peut former une chaîne _______ pour protéger le patrimoine.',
        answer: 'humaine',
        explanation: 'La chaîne humaine est une forme classique de protestation non violente. Des corps unis comme bouclier pacifique.'
      }
    }
  },

  {
    id: 'soc-057', type: 'fill',
    lang: {
      es: {
        q: 'En el combate contra el pez león, el medidor se llama "_______:" en vez de "Convencido:".',
        answer: 'Controlado',
        explanation: 'No convences a un pez, lo controlas ecológicamente. El nombre del medidor refleja la realidad de la situación.'
      },
      en: {
        q: 'In the lionfish combat, the meter is called "_______:" instead of "Convinced:".',
        answer: 'Controlled',
        explanation: 'You do not convince a fish, you ecologically control it. The meter name reflects the reality of the situation.'
      },
      fr: {
        q: 'Dans le combat du poisson-lion, le compteur s\'appelle "_______ :" au lieu de "Convaincu :".',
        answer: 'Contrôlé',
        explanation: 'On ne convainc pas un poisson, on le contrôle écologiquement. Le nom du compteur reflète la réalité de la situation.'
      }
    }
  },

  {
    id: 'soc-058', type: 'fill',
    lang: {
      es: {
        q: 'La organización internacional _______ ayuda a perseguir traficantes de artefactos culturales entre países.',
        answer: 'INTERPOL',
        explanation: 'INTERPOL coordina policías de 195 países. Su unidad de obras de arte combate el tráfico cultural globalmente.'
      },
      en: {
        q: 'The international organization _______ helps pursue cultural artifact traffickers across countries.',
        answer: 'INTERPOL',
        explanation: 'INTERPOL coordinates police from 195 countries. Its works of art unit combats cultural trafficking globally.'
      },
      fr: {
        q: 'L\'organisation internationale _______ aide à poursuivre les trafiquants d\'artefacts culturels entre pays.',
        answer: 'INTERPOL',
        explanation: 'INTERPOL coordonne les polices de 195 pays. Son unité d\'œuvres d\'art combat le trafic culturel mondialement.'
      }
    }
  },

  {
    id: 'soc-059', type: 'fill',
    lang: {
      es: {
        q: 'En ArcLycée, liberar al _______ y limpiar el arrecife completan la misión ecológica del Santuario.',
        answer: 'manatí',
        explanation: 'El manatí (Trichechus manatus) es una especie en peligro del Caribe. Rescatarlo es acción ecológica directa.'
      },
      en: {
        q: 'In ArcLycée, freeing the _______ and cleaning the reef complete the Sanctuary\'s ecological mission.',
        answer: 'manatee',
        explanation: 'The manatee (Trichechus manatus) is an endangered Caribbean species. Rescuing it is direct ecological action.'
      },
      fr: {
        q: 'Dans ArcLycée, libérer le _______ et nettoyer le récif complètent la mission écologique du Sanctuaire.',
        answer: 'lamantin',
        explanation: 'Le lamantin (Trichechus manatus) est une espèce en danger des Caraïbes. Le sauver est une action écologique directe.'
      }
    }
  },

  {
    id: 'soc-060', type: 'fill',
    lang: {
      es: {
        q: 'Las victorias violentas solo dan +_______ de reputación, comparado con +15 de las pacíficas.',
        answer: '5',
        explanation: 'La diferencia de 10 puntos es el precio de la violencia. El juego penaliza sutilmente las soluciones agresivas.'
      },
      en: {
        q: 'Violent victories only give +_______ reputation, compared to +15 for peaceful ones.',
        answer: '5',
        explanation: 'The 10-point difference is the price of violence. The game subtly penalizes aggressive solutions.'
      },
      fr: {
        q: 'Les victoires violentes ne donnent que +_______ de réputation, contre +15 pour les pacifiques.',
        answer: '5',
        explanation: 'La différence de 10 points est le prix de la violence. Le jeu pénalise subtilement les solutions agressives.'
      }
    }
  },

  {
    id: 'soc-061', type: 'fill',
    lang: {
      es: {
        q: 'En el duelo contra el Soldado Diego, la opción de _______ cuenta como victoria pacifista sin pelear.',
        answer: 'huir',
        explanation: 'A veces la verdadera valentía es evitar el conflicto. Como dijo Sun Tzu: la batalla suprema es la que no se libra.'
      },
      en: {
        q: 'In the duel against Soldier Diego, the option to _______ counts as a pacifist victory without fighting.',
        answer: 'flee',
        explanation: 'Sometimes true bravery is avoiding conflict. As Sun Tzu said: the supreme battle is the one not fought.'
      },
      fr: {
        q: 'Dans le duel contre le Soldat Diego, l\'option de _______ compte comme victoire pacifiste sans combattre.',
        answer: 'fuir',
        explanation: 'Parfois le vrai courage est d\'éviter le conflit. Comme disait Sun Tzu : la bataille suprême est celle qu\'on ne livre pas.'
      }
    }
  },

  {
    id: 'soc-062', type: 'fill',
    lang: {
      es: {
        q: 'Contra el traficante Torres, el medidor se llama "_______:" porque es un caso jurídico.',
        answer: 'Evidencia',
        explanation: 'No convences a Torres con palabras bonitas, sino con pruebas legales irrefutables. La justicia requiere hechos.'
      },
      en: {
        q: 'Against trafficker Torres, the meter is called "_______:" because it is a legal case.',
        answer: 'Evidence',
        explanation: 'You do not convince Torres with nice words, but with irrefutable legal proof. Justice requires facts.'
      },
      fr: {
        q: 'Contre le trafiquant Torres, le compteur s\'appelle "_______ :" car c\'est un cas juridique.',
        answer: 'Preuve',
        explanation: 'On ne convainc pas Torres avec de belles paroles, mais avec des preuves légales irréfutables. La justice exige des faits.'
      }
    }
  },

  {
    id: 'soc-063', type: 'fill',
    lang: {
      es: {
        q: 'El pez _______ es una especie invasora del Caribe que el juego te enseña a controlar ecológicamente.',
        answer: 'león',
        explanation: 'El pez león (Pterois) invadió el Caribe desde el Pacífico. Controlarlo es vital para los arrecifes locales.'
      },
      en: {
        q: 'The _______ fish is an invasive Caribbean species that the game teaches you to control ecologically.',
        answer: 'lion',
        explanation: 'The lionfish (Pterois) invaded the Caribbean from the Pacific. Controlling it is vital for local reefs.'
      },
      fr: {
        q: 'Le poisson-_______ est une espèce invasive des Caraïbes que le jeu t\'apprend à contrôler écologiquement.',
        answer: 'lion',
        explanation: 'Le poisson-lion (Pterois) a envahi les Caraïbes depuis le Pacifique. Le contrôler est vital pour les récifs locaux.'
      }
    }
  },

  {
    id: 'soc-064', type: 'fill',
    lang: {
      es: {
        q: 'El final _______ se obtiene cuando el jugador tiene 8+ nodos, 5 sidequests y todos los combates pacificados.',
        answer: 'completo',
        explanation: 'El final completo es el logro máximo: exploraste todo, ayudaste a todos y nunca usaste violencia innecesaria.'
      },
      en: {
        q: 'The _______ ending is obtained when the player has 8+ nodes, 5 side quests, and all combats pacified.',
        answer: 'complete',
        explanation: 'The complete ending is the ultimate achievement: you explored everything, helped everyone, and never used unnecessary violence.'
      },
      fr: {
        q: 'La fin _______ s\'obtient quand le joueur a 8+ nœuds, 5 quêtes secondaires et tous les combats pacifiés.',
        answer: 'complète',
        explanation: 'La fin complète est l\'accomplissement ultime : tu as tout exploré, aidé tout le monde et jamais utilisé de violence inutile.'
      }
    }
  },

  {
    id: 'soc-065', type: 'fill',
    lang: {
      es: {
        q: 'Llamar a la _______ es una de las opciones cívicas contra el Constructor Méndez para exponer la destrucción.',
        answer: 'prensa',
        explanation: 'La prensa libre es un pilar de la democracia. Exponer injusticias públicamente genera presión social para el cambio.'
      },
      en: {
        q: 'Calling the _______ is one of the civic options against Builder Mendez to expose the destruction.',
        answer: 'press',
        explanation: 'A free press is a pillar of democracy. Publicly exposing injustice generates social pressure for change.'
      },
      fr: {
        q: 'Appeler la _______ est l\'une des options civiques contre le Constructeur Mendez pour exposer la destruction.',
        answer: 'presse',
        explanation: 'La presse libre est un pilier de la démocratie. Exposer publiquement les injustices génère une pression sociale pour le changement.'
      }
    }
  },

  {
    id: 'soc-066', type: 'fill',
    lang: {
      es: {
        q: 'Cuando la _______ del enemigo sube, el combate se vuelve más peligroso. Es mejor mantenerla baja.',
        answer: 'hostilidad',
        explanation: 'La hostilidad es lo opuesto a la convicción. Sube con violencia y hace al enemigo más agresivo. Evítala.'
      },
      en: {
        q: 'When the enemy\'s _______ rises, combat becomes more dangerous. It is better to keep it low.',
        answer: 'hostility',
        explanation: 'Hostility is the opposite of conviction. It rises with violence and makes the enemy more aggressive. Avoid it.'
      },
      fr: {
        q: 'Quand l\'_______ de l\'ennemi monte, le combat devient plus dangereux. Mieux vaut la garder basse.',
        answer: 'hostilité',
        explanation: 'L\'hostilité est l\'opposé de la conviction. Elle monte avec la violence et rend l\'ennemi plus agressif. Évite-la.'
      }
    }
  },

  {
    id: 'soc-067', type: 'fill',
    lang: {
      es: {
        q: 'El arresto de Torres es _______, con agentes caminando hacia él y escoltándolo fuera.',
        answer: 'cinematográfico',
        explanation: 'La escena del arresto es una recompensa narrativa: ves la justicia en acción, paso a paso, como en una película.'
      },
      en: {
        q: 'Torres\'s arrest is _______, with agents walking toward him and escorting him out.',
        answer: 'cinematic',
        explanation: 'The arrest scene is a narrative reward: you see justice in action, step by step, like in a movie.'
      },
      fr: {
        q: 'L\'arrestation de Torres est _______, avec des agents marchant vers lui et l\'escortant dehors.',
        answer: 'cinématographique',
        explanation: 'La scène d\'arrestation est une récompense narrative : on voit la justice en action, pas à pas, comme dans un film.'
      }
    }
  },

  {
    id: 'soc-068', type: 'fill',
    lang: {
      es: {
        q: 'Las acciones _______ (como rescatar manatíes) cuentan para determinar tu final en el juego.',
        answer: 'ecológicas',
        explanation: 'El juego rastrea tus acciones ecológicas. Suficientes de ellas pueden llevarte al final ecológico.'
      },
      en: {
        q: '_______ actions (like rescuing manatees) count toward determining your ending in the game.',
        answer: 'Ecological',
        explanation: 'The game tracks your ecological actions. Enough of them can lead you to the ecological ending.'
      },
      fr: {
        q: 'Les actions _______ (comme sauver des lamantins) comptent pour déterminer ta fin dans le jeu.',
        answer: 'écologiques',
        explanation: 'Le jeu suit tes actions écologiques. Assez d\'entre elles peuvent mener à la fin écologique.'
      }
    }
  },

  {
    id: 'soc-069', type: 'fill',
    lang: {
      es: {
        q: 'En el combate ciudadano, los carteles de _______ son una herramienta de activismo pacífico.',
        answer: 'protesta',
        explanation: 'Los carteles de protesta son libertad de expresión en acción. Una forma legal y efectiva de defender tus derechos.'
      },
      en: {
        q: 'In citizen combat, _______ signs are a tool for peaceful activism.',
        answer: 'protest',
        explanation: 'Protest signs are freedom of expression in action. A legal and effective way to defend your rights.'
      },
      fr: {
        q: 'Dans le combat citoyen, les pancartes de _______ sont un outil d\'activisme pacifique.',
        answer: 'protestation',
        explanation: 'Les pancartes de protestation sont la liberté d\'expression en action. Un moyen légal et efficace de défendre tes droits.'
      }
    }
  },

  {
    id: 'soc-070', type: 'fill',
    lang: {
      es: {
        q: 'La _______ forense es una de las 4 armas legales contra el traficante Torres.',
        answer: 'evidencia',
        explanation: 'La evidencia forense (análisis científico de artefactos) prueba el origen y la autenticidad. Ciencia al servicio de la justicia.'
      },
      en: {
        q: 'Forensic _______ is one of the 4 legal weapons against trafficker Torres.',
        answer: 'evidence',
        explanation: 'Forensic evidence (scientific analysis of artifacts) proves origin and authenticity. Science serving justice.'
      },
      fr: {
        q: 'La _______ médico-légale est l\'une des 4 armes légales contre le trafiquant Torres.',
        answer: 'preuve',
        explanation: 'La preuve médico-légale (analyse scientifique des artefacts) prouve l\'origine et l\'authenticité. La science au service de la justice.'
      }
    }
  },

  {
    id: 'soc-071', type: 'fill',
    lang: {
      es: {
        q: 'El juego rastrea combates _______ versus combates violentos para calcular tu final.',
        answer: 'pacificados',
        explanation: 'Cada combate se clasifica como pacificado o violento. Tu historial completo determina qué final obtienes.'
      },
      en: {
        q: 'The game tracks _______ combats versus violent combats to calculate your ending.',
        answer: 'pacified',
        explanation: 'Each combat is classified as pacified or violent. Your complete record determines which ending you get.'
      },
      fr: {
        q: 'Le jeu suit les combats _______ versus les combats violents pour calculer ta fin.',
        answer: 'pacifiés',
        explanation: 'Chaque combat est classé comme pacifié ou violent. Ton historique complet détermine quelle fin tu obtiens.'
      }
    }
  },

  {
    id: 'soc-072', type: 'fill',
    lang: {
      es: {
        q: 'Alertar a los _______ sobre el pez león es la opción ecológica con mayor impacto a largo plazo.',
        answer: 'buzos',
        explanation: 'Informar a buzos crea una red de vigilancia. Un solo pez controlado ayuda; una comunidad informada transforma.'
      },
      en: {
        q: 'Alerting _______ about the lionfish is the ecological option with the greatest long-term impact.',
        answer: 'divers',
        explanation: 'Informing divers creates a monitoring network. One controlled fish helps; an informed community transforms.'
      },
      fr: {
        q: 'Alerter les _______ sur le poisson-lion est l\'option écologique avec le plus grand impact à long terme.',
        answer: 'plongeurs',
        explanation: 'Informer les plongeurs crée un réseau de surveillance. Un poisson contrôlé aide ; une communauté informée transforme.'
      }
    }
  },

  {
    id: 'soc-073', type: 'fill',
    lang: {
      es: {
        q: 'Contra el Soldado Diego, hablar sube la _______ hasta 100%, lo que equivale a una victoria sin espadas.',
        answer: 'convicción',
        explanation: 'Las palabras pueden ser tan afiladas como una espada, pero no hieren. La convicción es tu arma pacífica.'
      },
      en: {
        q: 'Against Soldier Diego, talking raises _______ to 100%, which equals a victory without swords.',
        answer: 'conviction',
        explanation: 'Words can be as sharp as a sword, but they do not wound. Conviction is your peaceful weapon.'
      },
      fr: {
        q: 'Contre le Soldat Diego, parler monte la _______ à 100%, ce qui équivaut à une victoire sans épées.',
        answer: 'conviction',
        explanation: 'Les mots peuvent être aussi tranchants qu\'une épée, mais ils ne blessent pas. La conviction est ton arme pacifique.'
      }
    }
  },

  {
    id: 'soc-074', type: 'fill',
    lang: {
      es: {
        q: 'La acción _______ contra Méndez consiste en iniciar un proceso judicial para detener la construcción.',
        answer: 'legal',
        explanation: 'La acción legal usa el sistema de justicia para proteger el patrimonio. Las leyes existen para ser aplicadas.'
      },
      en: {
        q: '_______ action against Mendez involves starting a judicial process to stop the construction.',
        answer: 'Legal',
        explanation: 'Legal action uses the justice system to protect heritage. Laws exist to be enforced.'
      },
      fr: {
        q: 'L\'action _______ contre Mendez consiste à entamer un processus judiciaire pour arrêter la construction.',
        answer: 'légale',
        explanation: 'L\'action légale utilise le système de justice pour protéger le patrimoine. Les lois existent pour être appliquées.'
      }
    }
  },

  {
    id: 'soc-075', type: 'fill',
    lang: {
      es: {
        q: 'El sistema de _______ del juego mide cómo te perciben los personajes según tus decisiones.',
        answer: 'reputación',
        explanation: 'Tu reputación refleja tus acciones acumuladas. Como en la vida real, se construye con cada decisión.'
      },
      en: {
        q: 'The game\'s _______ system measures how characters perceive you based on your decisions.',
        answer: 'reputation',
        explanation: 'Your reputation reflects your accumulated actions. Like in real life, it is built with every decision.'
      },
      fr: {
        q: 'Le système de _______ du jeu mesure comment les personnages te perçoivent selon tes décisions.',
        answer: 'réputation',
        explanation: 'Ta réputation reflète tes actions accumulées. Comme dans la vie réelle, elle se construit à chaque décision.'
      }
    }
  },

  // ===== MATCH (soc-076 a soc-100) =====

  {
    id: 'soc-076', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada combate con su tipo de resolución pacífica:',
        pairs: [
          ['Constructor Méndez', 'Protesta cívica (carteles, prensa, cadena humana)'],
          ['Pez león', 'Control ecológico (trampa, pesca, protección)'],
          ['Traficante Torres', 'Evidencia legal (Ley 318, INTERPOL, UNESCO)'],
          ['Soldado Diego', 'Diálogo y convicción (hablar, negociar, huir)']
        ],
        explanation: 'Cada conflicto tiene sus propias herramientas pacíficas. No hay una solución única para todo.'
      },
      en: {
        q: 'Match each combat with its type of peaceful resolution:',
        pairs: [
          ['Builder Mendez', 'Civic protest (signs, press, human chain)'],
          ['Lionfish', 'Ecological control (trapping, fishing, protection)'],
          ['Trafficker Torres', 'Legal evidence (Law 318, INTERPOL, UNESCO)'],
          ['Soldier Diego', 'Dialogue and conviction (talk, negotiate, flee)']
        ],
        explanation: 'Each conflict has its own peaceful tools. There is no one-size-fits-all solution.'
      },
      fr: {
        q: 'Associe chaque combat avec son type de résolution pacifique :',
        pairs: [
          ['Constructeur Mendez', 'Protestation civique (pancartes, presse, chaîne humaine)'],
          ['Poisson-lion', 'Contrôle écologique (piégeage, pêche, protection)'],
          ['Trafiquant Torres', 'Preuve légale (Loi 318, INTERPOL, UNESCO)'],
          ['Soldat Diego', 'Dialogue et conviction (parler, négocier, fuir)']
        ],
        explanation: 'Chaque conflit a ses propres outils pacifiques. Il n\'y a pas de solution unique pour tout.'
      }
    }
  },

  {
    id: 'soc-077', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada final del juego con su requisito principal:',
        pairs: [
          ['Final completo', '8+ nodos, 5 sidequests, todos pacificados'],
          ['Final pacifista', '8+ nodos, todos pacificados'],
          ['Final oscuro', 'Mayoría de combates violentos'],
          ['Final ecológico', 'Muchas acciones ecológicas']
        ],
        explanation: 'Cada final es un espejo de tu estilo de juego. El juego no juzga, pero sí refleja tus decisiones.'
      },
      en: {
        q: 'Match each game ending with its main requirement:',
        pairs: [
          ['Complete ending', '8+ nodes, 5 side quests, all pacified'],
          ['Pacifist ending', '8+ nodes, all pacified'],
          ['Dark ending', 'Majority of violent combats'],
          ['Ecological ending', 'Many ecological actions']
        ],
        explanation: 'Each ending is a mirror of your play style. The game does not judge, but it does reflect your decisions.'
      },
      fr: {
        q: 'Associe chaque fin du jeu avec son exigence principale :',
        pairs: [
          ['Fin complète', '8+ nœuds, 5 quêtes secondaires, tous pacifiés'],
          ['Fin pacifiste', '8+ nœuds, tous pacifiés'],
          ['Fin sombre', 'Majorité de combats violents'],
          ['Fin écologique', 'Beaucoup d\'actions écologiques']
        ],
        explanation: 'Chaque fin est un miroir de ton style de jeu. Le jeu ne juge pas, mais il reflète tes décisions.'
      }
    }
  },

  {
    id: 'soc-078', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada herramienta legal con lo que hace:',
        pairs: [
          ['Ley 318-68', 'Protege el patrimonio cultural dominicano'],
          ['UNESCO 1970', 'Combate el tráfico internacional de bienes culturales'],
          ['INTERPOL', 'Coordina policías de 195 países contra el tráfico'],
          ['Evidencia forense', 'Prueba científicamente el origen de artefactos']
        ],
        explanation: 'Estas cuatro herramientas juntas forman un escudo legal casi impenetrable contra el tráfico.'
      },
      en: {
        q: 'Match each legal tool with what it does:',
        pairs: [
          ['Law 318-68', 'Protects Dominican cultural heritage'],
          ['UNESCO 1970', 'Combats international cultural property trafficking'],
          ['INTERPOL', 'Coordinates police from 195 countries against trafficking'],
          ['Forensic evidence', 'Scientifically proves the origin of artifacts']
        ],
        explanation: 'These four tools together form a nearly impenetrable legal shield against trafficking.'
      },
      fr: {
        q: 'Associe chaque outil légal avec ce qu\'il fait :',
        pairs: [
          ['Loi 318-68', 'Protège le patrimoine culturel dominicain'],
          ['UNESCO 1970', 'Combat le trafic international de biens culturels'],
          ['INTERPOL', 'Coordonne les polices de 195 pays contre le trafic'],
          ['Preuve médico-légale', 'Prouve scientifiquement l\'origine des artefacts']
        ],
        explanation: 'Ces quatre outils ensemble forment un bouclier légal quasi impénétrable contre le trafic.'
      }
    }
  },

  {
    id: 'soc-079', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada medidor del combate con su función:',
        pairs: [
          ['Convicción', 'Mide cuánto has persuadido al oponente'],
          ['Hostilidad', 'Mide cuánto se ha enfurecido el oponente'],
          ['HP del jugador', 'Tu salud, baja con ataques enemigos'],
          ['Reputación', 'Cómo te perciben todos en el juego']
        ],
        explanation: 'Convicción y hostilidad son los dos lados de la misma moneda. Tus acciones determinan cuál sube.'
      },
      en: {
        q: 'Match each combat meter with its function:',
        pairs: [
          ['Conviction', 'Measures how much you have persuaded the opponent'],
          ['Hostility', 'Measures how enraged the opponent has become'],
          ['Player HP', 'Your health, decreases with enemy attacks'],
          ['Reputation', 'How everyone in the game perceives you']
        ],
        explanation: 'Conviction and hostility are two sides of the same coin. Your actions determine which one rises.'
      },
      fr: {
        q: 'Associe chaque compteur de combat avec sa fonction :',
        pairs: [
          ['Conviction', 'Mesure combien tu as persuadé l\'adversaire'],
          ['Hostilité', 'Mesure combien l\'adversaire s\'est enragé'],
          ['PV du joueur', 'Ta santé, diminue avec les attaques ennemies'],
          ['Réputation', 'Comment tout le monde dans le jeu te perçoit']
        ],
        explanation: 'Conviction et hostilité sont les deux faces de la même pièce. Tes actions déterminent laquelle monte.'
      }
    }
  },

  {
    id: 'soc-080', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada opción contra el pez león con su acción:',
        pairs: [
          ['Atrapar', 'Capturar vivo con trampa ecológica'],
          ['Pescar con arpón', 'Pesca controlada de especie invasora'],
          ['Proteger coral', 'Defender el ecosistema de arrecife'],
          ['Alertar buzos', 'Crear conciencia colectiva sobre la invasión']
        ],
        explanation: 'Las 4 opciones atacan el problema desde ángulos diferentes: captura, pesca, defensa y educación.'
      },
      en: {
        q: 'Match each lionfish option with its action:',
        pairs: [
          ['Trapping', 'Capture alive with ecological trap'],
          ['Spearfishing', 'Controlled fishing of invasive species'],
          ['Protect coral', 'Defend the reef ecosystem'],
          ['Alert divers', 'Create collective awareness about the invasion']
        ],
        explanation: 'The 4 options attack the problem from different angles: capture, fishing, defense, and education.'
      },
      fr: {
        q: 'Associe chaque option contre le poisson-lion avec son action :',
        pairs: [
          ['Piéger', 'Capturer vivant avec un piège écologique'],
          ['Pêcher au harpon', 'Pêche contrôlée d\'espèce invasive'],
          ['Protéger le corail', 'Défendre l\'écosystème de récif'],
          ['Alerter les plongeurs', 'Créer une conscience collective sur l\'invasion']
        ],
        explanation: 'Les 4 options attaquent le problème sous différents angles : capture, pêche, défense et éducation.'
      }
    }
  },

  {
    id: 'soc-081', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada personaje de ficción con el principio que comparten con ArcLycée:',
        pairs: [
          ['Frisk (Undertale)', 'Ganar sin hacer daño a nadie'],
          ['Batman', 'Regla de no matar, justicia con principios'],
          ['Captain America', 'Diplomacia antes que fuerza'],
          ['Dumbledore', 'Ofrecer redención y diálogo primero']
        ],
        explanation: 'Estos héroes demuestran que la fuerza moral supera la fuerza física. ArcLycée aplica esa misma filosofía.'
      },
      en: {
        q: 'Match each fictional character with the principle they share with ArcLycée:',
        pairs: [
          ['Frisk (Undertale)', 'Winning without hurting anyone'],
          ['Batman', 'No-kill rule, justice with principles'],
          ['Captain America', 'Diplomacy before force'],
          ['Dumbledore', 'Offering redemption and dialogue first']
        ],
        explanation: 'These heroes show that moral strength surpasses physical force. ArcLycée applies that same philosophy.'
      },
      fr: {
        q: 'Associe chaque personnage de fiction avec le principe qu\'ils partagent avec ArcLycée :',
        pairs: [
          ['Frisk (Undertale)', 'Gagner sans faire de mal à personne'],
          ['Batman', 'Règle de ne pas tuer, justice avec principes'],
          ['Captain America', 'Diplomatie avant la force'],
          ['Dumbledore', 'Offrir la rédemption et le dialogue d\'abord']
        ],
        explanation: 'Ces héros montrent que la force morale surpasse la force physique. ArcLycée applique cette même philosophie.'
      }
    }
  },

  {
    id: 'soc-082', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada opción contra el Constructor Méndez con su tipo de acción:',
        pairs: [
          ['Carteles de protesta', 'Libertad de expresión'],
          ['Llamar a la prensa', 'Activismo mediático'],
          ['Acción legal', 'Sistema judicial'],
          ['Cadena humana', 'Desobediencia civil no violenta']
        ],
        explanation: 'Cuatro pilares de la democracia participativa: expresión, prensa, justicia y acción directa pacífica.'
      },
      en: {
        q: 'Match each option against Builder Mendez with its type of action:',
        pairs: [
          ['Protest signs', 'Freedom of expression'],
          ['Call the press', 'Media activism'],
          ['Legal action', 'Judicial system'],
          ['Human chain', 'Nonviolent civil disobedience']
        ],
        explanation: 'Four pillars of participatory democracy: expression, press, justice, and peaceful direct action.'
      },
      fr: {
        q: 'Associe chaque option contre le Constructeur Mendez avec son type d\'action :',
        pairs: [
          ['Pancartes de protestation', 'Liberté d\'expression'],
          ['Appeler la presse', 'Activisme médiatique'],
          ['Action légale', 'Système judiciaire'],
          ['Chaîne humaine', 'Désobéissance civile non violente']
        ],
        explanation: 'Quatre piliers de la démocratie participative : expression, presse, justice et action directe pacifique.'
      }
    }
  },

  {
    id: 'soc-083', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada tipo de victoria con su recompensa de reputación:',
        pairs: [
          ['Victoria pacífica', '+15 reputación'],
          ['Victoria violenta', '+5 reputación'],
          ['Acción ecológica (manatí)', '+10 reputación'],
          ['Huir del duelo (Diego)', 'Victoria pacifista sin combate']
        ],
        explanation: 'El juego asigna valor a cada tipo de resolución. La paz siempre paga más que la guerra.'
      },
      en: {
        q: 'Match each type of victory with its reputation reward:',
        pairs: [
          ['Peaceful victory', '+15 reputation'],
          ['Violent victory', '+5 reputation'],
          ['Ecological action (manatee)', '+10 reputation'],
          ['Fleeing duel (Diego)', 'Pacifist victory without combat']
        ],
        explanation: 'The game assigns value to each type of resolution. Peace always pays more than war.'
      },
      fr: {
        q: 'Associe chaque type de victoire avec sa récompense de réputation :',
        pairs: [
          ['Victoire pacifique', '+15 réputation'],
          ['Victoire violente', '+5 réputation'],
          ['Action écologique (lamantin)', '+10 réputation'],
          ['Fuir le duel (Diego)', 'Victoire pacifiste sans combat']
        ],
        explanation: 'Le jeu attribue une valeur à chaque type de résolution. La paix paie toujours plus que la guerre.'
      }
    }
  },

  {
    id: 'soc-084', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada acción ecológica del Santuario con su impacto:',
        pairs: [
          ['Liberar al manatí', 'Salvar una especie en peligro directamente'],
          ['Limpiar el arrecife', 'Restaurar un ecosistema marino dañado'],
          ['Completar ambas', 'Terminar la misión rescateManatí'],
          ['Cada acción individual', '+10 reputación al progreso']
        ],
        explanation: 'Cada acción ecológica tiene impacto individual y colectivo. Juntas, completan algo más grande.'
      },
      en: {
        q: 'Match each Sanctuary ecological action with its impact:',
        pairs: [
          ['Free the manatee', 'Directly saving an endangered species'],
          ['Clean the reef', 'Restoring a damaged marine ecosystem'],
          ['Complete both', 'Finish the rescueManatee quest'],
          ['Each individual action', '+10 reputation progress']
        ],
        explanation: 'Each ecological action has individual and collective impact. Together, they complete something bigger.'
      },
      fr: {
        q: 'Associe chaque action écologique du Sanctuaire avec son impact :',
        pairs: [
          ['Libérer le lamantin', 'Sauver directement une espèce en danger'],
          ['Nettoyer le récif', 'Restaurer un écosystème marin endommagé'],
          ['Compléter les deux', 'Terminer la quête sauvetageManatin'],
          ['Chaque action individuelle', '+10 réputation au progrès']
        ],
        explanation: 'Chaque action écologique a un impact individuel et collectif. Ensemble, elles complètent quelque chose de plus grand.'
      }
    }
  },

  {
    id: 'soc-085', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada opción del duelo de Diego con su resultado:',
        pairs: [
          ['Atacar', 'Modo agresivo, combate de espadas'],
          ['Hablar', 'Modo pacifista, sube convicción'],
          ['Negociar', 'Modo pacifista, sube convicción'],
          ['Huir', 'Victoria pacifista inmediata, sin pelea']
        ],
        explanation: '3 de 4 opciones son pacíficas. El juego te da muchas más oportunidades de paz que de guerra.'
      },
      en: {
        q: 'Match each Diego duel option with its outcome:',
        pairs: [
          ['Attack', 'Aggressive mode, sword combat'],
          ['Talk', 'Pacifist mode, raises conviction'],
          ['Negotiate', 'Pacifist mode, raises conviction'],
          ['Flee', 'Immediate pacifist victory, no fight']
        ],
        explanation: '3 out of 4 options are peaceful. The game gives you many more opportunities for peace than war.'
      },
      fr: {
        q: 'Associe chaque option du duel de Diego avec son résultat :',
        pairs: [
          ['Attaquer', 'Mode agressif, combat d\'épées'],
          ['Parler', 'Mode pacifiste, monte la conviction'],
          ['Négocier', 'Mode pacifiste, monte la conviction'],
          ['Fuir', 'Victoire pacifiste immédiate, sans combat']
        ],
        explanation: '3 sur 4 options sont pacifiques. Le jeu donne bien plus d\'opportunités de paix que de guerre.'
      }
    }
  },

  {
    id: 'soc-086', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada concepto del juego con su equivalente en la vida real:',
        pairs: [
          ['Medidor de convicción', 'Persuasión y argumentación lógica'],
          ['Medidor de hostilidad', 'Escalada de conflicto por agresión'],
          ['Reputación', 'Cómo te percibe tu comunidad'],
          ['Múltiples finales', 'Las consecuencias de tus decisiones']
        ],
        explanation: 'ArcLycée simula dinámicas sociales reales. Lo que aprendes en el juego aplica a la vida.'
      },
      en: {
        q: 'Match each game concept with its real-life equivalent:',
        pairs: [
          ['Conviction meter', 'Persuasion and logical argumentation'],
          ['Hostility meter', 'Conflict escalation through aggression'],
          ['Reputation', 'How your community perceives you'],
          ['Multiple endings', 'The consequences of your decisions']
        ],
        explanation: 'ArcLycée simulates real social dynamics. What you learn in the game applies to life.'
      },
      fr: {
        q: 'Associe chaque concept du jeu avec son équivalent dans la vie réelle :',
        pairs: [
          ['Compteur de conviction', 'Persuasion et argumentation logique'],
          ['Compteur d\'hostilité', 'Escalade du conflit par l\'agression'],
          ['Réputation', 'Comment ta communauté te perçoit'],
          ['Fins multiples', 'Les conséquences de tes décisions']
        ],
        explanation: 'ArcLycée simule des dynamiques sociales réelles. Ce que tu apprends dans le jeu s\'applique à la vie.'
      }
    }
  },

  {
    id: 'soc-087', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada etiqueta especial de combate con su enemigo:',
        pairs: [
          ['Convencido:', 'Combates estándar (Méndez, soldados)'],
          ['Controlado:', 'Pez león (control ecológico)'],
          ['Evidencia:', 'Traficante Torres (caso legal)'],
          ['Convicción en duelo', 'Soldado Diego (diálogo)']
        ],
        explanation: 'Cada medidor tiene un nombre que refleja la naturaleza del conflicto. No todos los problemas se resuelven igual.'
      },
      en: {
        q: 'Match each special combat label with its enemy:',
        pairs: [
          ['Convinced:', 'Standard combats (Mendez, soldiers)'],
          ['Controlled:', 'Lionfish (ecological control)'],
          ['Evidence:', 'Trafficker Torres (legal case)'],
          ['Conviction in duel', 'Soldier Diego (dialogue)']
        ],
        explanation: 'Each meter has a name reflecting the nature of the conflict. Not all problems are solved the same way.'
      },
      fr: {
        q: 'Associe chaque étiquette spéciale de combat avec son ennemi :',
        pairs: [
          ['Convaincu :', 'Combats standard (Mendez, soldats)'],
          ['Contrôlé :', 'Poisson-lion (contrôle écologique)'],
          ['Preuve :', 'Trafiquant Torres (cas légal)'],
          ['Conviction en duel', 'Soldat Diego (dialogue)']
        ],
        explanation: 'Chaque compteur a un nom reflétant la nature du conflit. Tous les problèmes ne se résolvent pas de la même façon.'
      }
    }
  },

  {
    id: 'soc-088', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada referencia de cultura pop con su lección en ArcLycée:',
        pairs: [
          ['Undertale (Frisk)', 'Puedes ganar cualquier batalla sin violencia'],
          ['Gravity Falls (Dipper)', 'La información y las pistas resuelven misterios'],
          ['One Piece (Luffy)', 'Los lazos y la cooperación son la verdadera fuerza'],
          ['Adventure Time (Finn)', 'Los dilemas morales no tienen respuestas fáciles']
        ],
        explanation: 'La cultura pop nos enseña valores constantemente. ArcLycée los convierte en mecánicas jugables.'
      },
      en: {
        q: 'Match each pop culture reference with its lesson in ArcLycée:',
        pairs: [
          ['Undertale (Frisk)', 'You can win any battle without violence'],
          ['Gravity Falls (Dipper)', 'Information and clues solve mysteries'],
          ['One Piece (Luffy)', 'Bonds and cooperation are the true strength'],
          ['Adventure Time (Finn)', 'Moral dilemmas do not have easy answers']
        ],
        explanation: 'Pop culture constantly teaches us values. ArcLycée turns them into playable mechanics.'
      },
      fr: {
        q: 'Associe chaque référence de culture pop avec sa leçon dans ArcLycée :',
        pairs: [
          ['Undertale (Frisk)', 'On peut gagner n\'importe quelle bataille sans violence'],
          ['Gravity Falls (Dipper)', 'L\'information et les indices résolvent les mystères'],
          ['One Piece (Luffy)', 'Les liens et la coopération sont la vraie force'],
          ['Adventure Time (Finn)', 'Les dilemmes moraux n\'ont pas de réponses faciles']
        ],
        explanation: 'La culture pop nous enseigne constamment des valeurs. ArcLycée les transforme en mécaniques jouables.'
      }
    }
  },

  {
    id: 'soc-089', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada compañero con el bonus de ataque que aporta:',
        pairs: [
          ['Magnoboot', '+3 de daño en ataque conjunto'],
          ['Viralata', '+2 de daño en ataque conjunto'],
          ['Cemí', '+4 de daño en ataque conjunto'],
          ['Solo (sin compañero)', 'Daño base sin bonus']
        ],
        explanation: 'Tus compañeros multiplican tu fuerza, pero recuerda: la convicción sigue siendo más poderosa que el daño.'
      },
      en: {
        q: 'Match each companion with the attack bonus they provide:',
        pairs: [
          ['Magnoboot', '+3 damage in joint attack'],
          ['Viralata', '+2 damage in joint attack'],
          ['Cemi', '+4 damage in joint attack'],
          ['Solo (no companion)', 'Base damage without bonus']
        ],
        explanation: 'Your companions multiply your strength, but remember: conviction is still more powerful than damage.'
      },
      fr: {
        q: 'Associe chaque compagnon avec le bonus d\'attaque qu\'il apporte :',
        pairs: [
          ['Magnoboot', '+3 de dégâts en attaque conjointe'],
          ['Viralata', '+2 de dégâts en attaque conjointe'],
          ['Cemí', '+4 de dégâts en attaque conjointe'],
          ['Seul (sans compagnon)', 'Dégâts de base sans bonus']
        ],
        explanation: 'Tes compagnons multiplient ta force, mais rappelle-toi : la conviction reste plus puissante que les dégâts.'
      }
    }
  },

  {
    id: 'soc-090', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada escenario de combate con su ubicación en el juego:',
        pairs: [
          ['Duelo de espadas (Diego)', 'La Isabela'],
          ['Combate cívico (Méndez)', 'Zona Colonial'],
          ['Combate ecológico (Pez león)', 'Mundo Acuático'],
          ['Combate legal (Torres)', 'Aeropuerto de Punta Cana']
        ],
        explanation: 'Cada mundo tiene su propio tipo de conflicto, reflejando problemas reales de cada región.'
      },
      en: {
        q: 'Match each combat scenario with its location in the game:',
        pairs: [
          ['Sword duel (Diego)', 'La Isabela'],
          ['Civic combat (Mendez)', 'Colonial Zone'],
          ['Ecological combat (Lionfish)', 'Aquatic World'],
          ['Legal combat (Torres)', 'Punta Cana Airport']
        ],
        explanation: 'Each world has its own type of conflict, reflecting real problems of each region.'
      },
      fr: {
        q: 'Associe chaque scénario de combat avec sa localisation dans le jeu :',
        pairs: [
          ['Duel d\'épées (Diego)', 'La Isabela'],
          ['Combat civique (Mendez)', 'Zone Coloniale'],
          ['Combat écologique (Poisson-lion)', 'Monde Aquatique'],
          ['Combat légal (Torres)', 'Aéroport de Punta Cana']
        ],
        explanation: 'Chaque monde a son propre type de conflit, reflétant les vrais problèmes de chaque région.'
      }
    }
  },

  {
    id: 'soc-091', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada fase del arresto de Torres con su estado:',
        pairs: [
          ['Esperando', 'Los agentes se preparan'],
          ['Caminando', 'Los agentes se acercan a Torres'],
          ['Diálogo', 'Lo confrontan verbalmente'],
          ['Escoltando', 'Lo sacan del aeropuerto']
        ],
        explanation: 'El arresto es una secuencia cinematográfica: la justicia avanza paso a paso, sin prisa pero sin pausa.'
      },
      en: {
        q: 'Match each phase of Torres\'s arrest with its state:',
        pairs: [
          ['Waiting', 'The agents prepare'],
          ['Walking', 'The agents approach Torres'],
          ['Dialogue', 'They confront him verbally'],
          ['Escorting', 'They take him out of the airport']
        ],
        explanation: 'The arrest is a cinematic sequence: justice advances step by step, slow but steady.'
      },
      fr: {
        q: 'Associe chaque phase de l\'arrestation de Torres avec son état :',
        pairs: [
          ['En attente', 'Les agents se préparent'],
          ['En marche', 'Les agents s\'approchent de Torres'],
          ['Dialogue', 'Ils le confrontent verbalement'],
          ['Escorte', 'Ils le sortent de l\'aéroport']
        ],
        explanation: 'L\'arrestation est une séquence cinématographique : la justice avance pas à pas, lentement mais sûrement.'
      }
    }
  },

  {
    id: 'soc-092', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada principio social con su mecánica en ArcLycée:',
        pairs: [
          ['Las acciones tienen consecuencias', 'Tracking de combates pacificados vs violentos'],
          ['La cooperación multiplica la fuerza', 'Compañeros con bonus de ataque'],
          ['La información es poder', 'Evidencia forense contra Torres'],
          ['La comunidad protege', 'Cadena humana contra Méndez']
        ],
        explanation: 'Cada mecánica del juego enseña un principio social. Aprendes jugando, no leyendo.'
      },
      en: {
        q: 'Match each social principle with its mechanic in ArcLycée:',
        pairs: [
          ['Actions have consequences', 'Tracking pacified vs violent combats'],
          ['Cooperation multiplies strength', 'Companions with attack bonus'],
          ['Information is power', 'Forensic evidence against Torres'],
          ['Community protects', 'Human chain against Mendez']
        ],
        explanation: 'Each game mechanic teaches a social principle. You learn by playing, not by reading.'
      },
      fr: {
        q: 'Associe chaque principe social avec sa mécanique dans ArcLycée :',
        pairs: [
          ['Les actions ont des conséquences', 'Suivi des combats pacifiés vs violents'],
          ['La coopération multiplie la force', 'Compagnons avec bonus d\'attaque'],
          ['L\'information est le pouvoir', 'Preuves médico-légales contre Torres'],
          ['La communauté protège', 'Chaîne humaine contre Mendez']
        ],
        explanation: 'Chaque mécanique de jeu enseigne un principe social. On apprend en jouant, pas en lisant.'
      }
    }
  },

  {
    id: 'soc-093', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada problema real con el combate del juego que lo representa:',
        pairs: [
          ['Destrucción del patrimonio por construcción', 'Combate contra Constructor Méndez'],
          ['Especies invasoras marinas', 'Combate contra pez león'],
          ['Tráfico internacional de artefactos', 'Combate contra traficante Torres'],
          ['Colonialismo y opresión histórica', 'Duelo contra Soldado Diego']
        ],
        explanation: 'Cada combate del juego refleja un problema real. ArcLycée usa la ficción para enseñar sobre realidades.'
      },
      en: {
        q: 'Match each real-world problem with the game combat that represents it:',
        pairs: [
          ['Heritage destruction by construction', 'Combat against Builder Mendez'],
          ['Invasive marine species', 'Combat against lionfish'],
          ['International artifact trafficking', 'Combat against trafficker Torres'],
          ['Colonialism and historical oppression', 'Duel against Soldier Diego']
        ],
        explanation: 'Each game combat reflects a real problem. ArcLycée uses fiction to teach about realities.'
      },
      fr: {
        q: 'Associe chaque problème réel avec le combat du jeu qui le représente :',
        pairs: [
          ['Destruction du patrimoine par la construction', 'Combat contre Constructeur Mendez'],
          ['Espèces marines invasives', 'Combat contre poisson-lion'],
          ['Trafic international d\'artefacts', 'Combat contre trafiquant Torres'],
          ['Colonialisme et oppression historique', 'Duel contre Soldat Diego']
        ],
        explanation: 'Chaque combat du jeu reflète un vrai problème. ArcLycée utilise la fiction pour enseigner des réalités.'
      }
    }
  },

  {
    id: 'soc-094', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada tipo de inteligencia con su uso en ArcLycée:',
        pairs: [
          ['Inteligencia emocional', 'Dialogar y convencer sin violencia'],
          ['Inteligencia ecológica', 'Rescatar manatí, controlar pez león'],
          ['Inteligencia jurídica', 'Usar leyes y evidencia contra el tráfico'],
          ['Inteligencia social', 'Movilizar prensa y cadenas humanas']
        ],
        explanation: 'ArcLycée premia múltiples formas de inteligencia, no solo la fuerza bruta.'
      },
      en: {
        q: 'Match each type of intelligence with its use in ArcLycée:',
        pairs: [
          ['Emotional intelligence', 'Dialogue and convincing without violence'],
          ['Ecological intelligence', 'Rescuing manatee, controlling lionfish'],
          ['Legal intelligence', 'Using laws and evidence against trafficking'],
          ['Social intelligence', 'Mobilizing press and human chains']
        ],
        explanation: 'ArcLycée rewards multiple forms of intelligence, not just brute force.'
      },
      fr: {
        q: 'Associe chaque type d\'intelligence avec son usage dans ArcLycée :',
        pairs: [
          ['Intelligence émotionnelle', 'Dialoguer et convaincre sans violence'],
          ['Intelligence écologique', 'Sauver le lamantin, contrôler le poisson-lion'],
          ['Intelligence juridique', 'Utiliser les lois et preuves contre le trafic'],
          ['Intelligence sociale', 'Mobiliser la presse et les chaînes humaines']
        ],
        explanation: 'ArcLycée récompense de multiples formes d\'intelligence, pas seulement la force brute.'
      }
    }
  },

  {
    id: 'soc-095', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada decisión del jugador con su impacto en el mundo del juego:',
        pairs: [
          ['Pacificar todos los combates', 'Desbloquea finales completo y pacifista'],
          ['Usar violencia frecuentemente', 'Conduce al final oscuro'],
          ['Completar acciones ecológicas', 'Puede dar el final ecológico'],
          ['Completar 5+ misiones secundarias', 'Requisito para el final completo']
        ],
        explanation: 'Cada decisión acumula peso. El juego no olvida ninguna de tus acciones.'
      },
      en: {
        q: 'Match each player decision with its impact on the game world:',
        pairs: [
          ['Pacify all combats', 'Unlocks complete and pacifist endings'],
          ['Use violence frequently', 'Leads to the dark ending'],
          ['Complete ecological actions', 'Can give the ecological ending'],
          ['Complete 5+ side quests', 'Requirement for complete ending']
        ],
        explanation: 'Each decision accumulates weight. The game does not forget any of your actions.'
      },
      fr: {
        q: 'Associe chaque décision du joueur avec son impact sur le monde du jeu :',
        pairs: [
          ['Pacifier tous les combats', 'Débloque les fins complète et pacifiste'],
          ['Utiliser la violence fréquemment', 'Conduit à la fin sombre'],
          ['Compléter les actions écologiques', 'Peut donner la fin écologique'],
          ['Compléter 5+ quêtes secondaires', 'Exigence pour la fin complète']
        ],
        explanation: 'Chaque décision accumule du poids. Le jeu n\'oublie aucune de tes actions.'
      }
    }
  },

  {
    id: 'soc-096', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada villano del juego con su motivación:',
        pairs: [
          ['Constructor Méndez', 'Lucro destruyendo patrimonio histórico'],
          ['Pez león', 'Instinto invasor (no es "malvado", es ecología)'],
          ['Traficante Torres', 'Vender artefactos culturales ilegalmente'],
          ['Soldado Diego', 'Seguir órdenes coloniales (es complejo, no evil)']
        ],
        explanation: 'No todos los antagonistas son "malos". Entender sus motivaciones ayuda a encontrar soluciones reales.'
      },
      en: {
        q: 'Match each game villain with their motivation:',
        pairs: [
          ['Builder Mendez', 'Profit by destroying historical heritage'],
          ['Lionfish', 'Invasive instinct (not "evil," it is ecology)'],
          ['Trafficker Torres', 'Selling cultural artifacts illegally'],
          ['Soldier Diego', 'Following colonial orders (complex, not evil)']
        ],
        explanation: 'Not all antagonists are "evil." Understanding their motivations helps find real solutions.'
      },
      fr: {
        q: 'Associe chaque vilain du jeu avec sa motivation :',
        pairs: [
          ['Constructeur Mendez', 'Profit en détruisant le patrimoine historique'],
          ['Poisson-lion', 'Instinct invasif (pas "méchant", c\'est l\'écologie)'],
          ['Trafiquant Torres', 'Vendre des artefacts culturels illégalement'],
          ['Soldat Diego', 'Suivre les ordres coloniaux (complexe, pas méchant)']
        ],
        explanation: 'Tous les antagonistes ne sont pas "méchants". Comprendre leurs motivations aide à trouver des solutions réelles.'
      }
    }
  },

  {
    id: 'soc-097', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada habilidad social con dónde se practica en el juego:',
        pairs: [
          ['Negociación', 'Duelo con Diego (opción Negociar)'],
          ['Activismo cívico', 'Protesta contra Méndez'],
          ['Pensamiento crítico', 'Reunir evidencia contra Torres'],
          ['Conciencia ecológica', 'Santuario del Manatí']
        ],
        explanation: 'El juego es un simulador de habilidades sociales disfrazado de RPG. Cada mundo entrena algo diferente.'
      },
      en: {
        q: 'Match each social skill with where it is practiced in the game:',
        pairs: [
          ['Negotiation', 'Duel with Diego (Negotiate option)'],
          ['Civic activism', 'Protest against Mendez'],
          ['Critical thinking', 'Gathering evidence against Torres'],
          ['Environmental awareness', 'Manatee Sanctuary']
        ],
        explanation: 'The game is a social skills simulator disguised as an RPG. Each world trains something different.'
      },
      fr: {
        q: 'Associe chaque compétence sociale avec où elle se pratique dans le jeu :',
        pairs: [
          ['Négociation', 'Duel avec Diego (option Négocier)'],
          ['Activisme civique', 'Protestation contre Mendez'],
          ['Pensée critique', 'Rassembler des preuves contre Torres'],
          ['Conscience écologique', 'Sanctuaire du Lamantin']
        ],
        explanation: 'Le jeu est un simulateur de compétences sociales déguisé en RPG. Chaque monde entraîne quelque chose de différent.'
      }
    }
  },

  {
    id: 'soc-098', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada lección del juego con su aplicación en la vida real:',
        pairs: [
          ['Convicción > hostilidad', 'El diálogo resuelve más que los gritos'],
          ['Reputación pacífica x3', 'La gente respeta más a quien no agrede'],
          ['Múltiples finales', 'Tus decisiones de hoy moldean tu futuro'],
          ['Tracking de acciones', 'La sociedad recuerda tus actos']
        ],
        explanation: 'Todo lo que ArcLycée te enseña es aplicable fuera de la pantalla. Ese es el verdadero juego.'
      },
      en: {
        q: 'Match each game lesson with its real-life application:',
        pairs: [
          ['Conviction > hostility', 'Dialogue solves more than shouting'],
          ['Peaceful reputation x3', 'People respect those who do not attack more'],
          ['Multiple endings', 'Today\'s decisions shape your future'],
          ['Action tracking', 'Society remembers your deeds']
        ],
        explanation: 'Everything ArcLycée teaches you applies outside the screen. That is the real game.'
      },
      fr: {
        q: 'Associe chaque leçon du jeu avec son application dans la vie réelle :',
        pairs: [
          ['Conviction > hostilité', 'Le dialogue résout plus que les cris'],
          ['Réputation pacifique x3', 'Les gens respectent plus ceux qui n\'agressent pas'],
          ['Fins multiples', 'Les décisions d\'aujourd\'hui façonnent ton avenir'],
          ['Suivi des actions', 'La société se souvient de tes actes']
        ],
        explanation: 'Tout ce qu\'ArcLycée t\'apprend s\'applique en dehors de l\'écran. C\'est ça le vrai jeu.'
      }
    }
  },

  {
    id: 'soc-099', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada nivel de protección con su alcance:',
        pairs: [
          ['Ley 318-68', 'Protección nacional (República Dominicana)'],
          ['Convención UNESCO 1970', 'Protección internacional (tratado global)'],
          ['INTERPOL', 'Cooperación policial entre 195 países'],
          ['Evidencia forense', 'Prueba científica caso por caso']
        ],
        explanation: 'La protección del patrimonio funciona en capas: local, nacional, internacional, científica.'
      },
      en: {
        q: 'Match each level of protection with its scope:',
        pairs: [
          ['Law 318-68', 'National protection (Dominican Republic)'],
          ['UNESCO Convention 1970', 'International protection (global treaty)'],
          ['INTERPOL', 'Police cooperation among 195 countries'],
          ['Forensic evidence', 'Scientific proof case by case']
        ],
        explanation: 'Heritage protection works in layers: local, national, international, scientific.'
      },
      fr: {
        q: 'Associe chaque niveau de protection avec sa portée :',
        pairs: [
          ['Loi 318-68', 'Protection nationale (République dominicaine)'],
          ['Convention UNESCO 1970', 'Protection internationale (traité global)'],
          ['INTERPOL', 'Coopération policière entre 195 pays'],
          ['Preuve médico-légale', 'Preuve scientifique cas par cas']
        ],
        explanation: 'La protection du patrimoine fonctionne en couches : locale, nationale, internationale, scientifique.'
      }
    }
  },

  {
    id: 'soc-100', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada mensaje final del juego con lo que el jugador aprendió:',
        pairs: [
          ['Final completo', 'La excelencia requiere exploración, ayuda y paz'],
          ['Final pacifista', 'La no-violencia consistente es heroica'],
          ['Final ecológico', 'Cuidar el planeta es cuidar nuestro futuro'],
          ['Final oscuro', 'La violencia tiene consecuencias duraderas']
        ],
        explanation: 'Cada final es una lección. El juego no te dice qué hacer, te muestra qué pasa cuando lo haces.'
      },
      en: {
        q: 'Match each game ending message with what the player learned:',
        pairs: [
          ['Complete ending', 'Excellence requires exploration, help, and peace'],
          ['Pacifist ending', 'Consistent non-violence is heroic'],
          ['Ecological ending', 'Caring for the planet is caring for our future'],
          ['Dark ending', 'Violence has lasting consequences']
        ],
        explanation: 'Each ending is a lesson. The game does not tell you what to do, it shows you what happens when you do it.'
      },
      fr: {
        q: 'Associe chaque message de fin du jeu avec ce que le joueur a appris :',
        pairs: [
          ['Fin complète', 'L\'excellence exige exploration, aide et paix'],
          ['Fin pacifiste', 'La non-violence constante est héroïque'],
          ['Fin écologique', 'Prendre soin de la planète, c\'est prendre soin de notre avenir'],
          ['Fin sombre', 'La violence a des conséquences durables']
        ],
        explanation: 'Chaque fin est une leçon. Le jeu ne te dit pas quoi faire, il te montre ce qui arrive quand tu le fais.'
      }
    }
  }

];
