// social.js — 100 preguntas trilingues sobre habilidades sociales y responsabilidad civica
// Cubre: ruta pacifista, combates civicos, ecologia, leyes de patrimonio, sistema de reputacion,
// consecuencias de decisiones, y por que las soluciones pacificas funcionan.
// Tipos distribuidos: tf (25), mcq (25), fill (25), match (25)

window.ARC_QUESTIONS = window.ARC_QUESTIONS || {};
window.ARC_QUESTIONS.social = [

  // ===== TRUE / FALSE (soc-001 a soc-025) =====

  {
    id: 'soc-001', type: 'tf',
    lang: {
      es: {
        q: 'En ArcLycee, como en Undertale, es posible completar todo el juego sin usar violencia.',
        answer: true,
        explanation: 'La ruta pacifista permite resolver cada conflicto con dialogo, evidencia o acciones civicas, igual que en Undertale.'
      },
      en: {
        q: 'In ArcLycee, like in Undertale, it is possible to complete the entire game without using violence.',
        answer: true,
        explanation: 'The pacifist route lets you solve every conflict through dialogue, evidence, or civic action, just like Undertale.'
      },
      fr: {
        q: 'Dans ArcLycee, comme dans Undertale, il est possible de terminer tout le jeu sans utiliser la violence.',
        answer: true,
        explanation: 'La route pacifiste permet de resoudre chaque conflit par le dialogue, les preuves ou des actions civiques, comme dans Undertale.'
      }
    }
  },

  {
    id: 'soc-002', type: 'tf',
    lang: {
      es: {
        q: 'Las victorias violentas dan mas reputacion (+15) que las pacificas (+5).',
        answer: false,
        explanation: 'Es al reves: las victorias pacificas dan +15 reputacion, las violentas solo +5. El juego recompensa la diplomacia.'
      },
      en: {
        q: 'Violent victories give more reputation (+15) than peaceful ones (+5).',
        answer: false,
        explanation: 'It is the opposite: peaceful victories give +15 reputation, violent ones only +5. The game rewards diplomacy.'
      },
      fr: {
        q: 'Les victoires violentes donnent plus de reputation (+15) que les pacifiques (+5).',
        answer: false,
        explanation: 'C\'est l\'inverse : les victoires pacifiques donnent +15 de reputation, les violentes seulement +5. Le jeu recompense la diplomatie.'
      }
    }
  },

  {
    id: 'soc-003', type: 'tf',
    lang: {
      es: {
        q: 'La Ley 318-68 de Republica Dominicana protege el patrimonio cultural del pais.',
        answer: true,
        explanation: 'La Ley 318-68 es la legislacion dominicana para proteger bienes culturales. En el juego, la usas contra el traficante Torres.'
      },
      en: {
        q: 'Law 318-68 of the Dominican Republic protects the country\'s cultural heritage.',
        answer: true,
        explanation: 'Law 318-68 is the Dominican legislation to protect cultural property. In the game, you use it against trafficker Torres.'
      },
      fr: {
        q: 'La Loi 318-68 de la Republique dominicaine protege le patrimoine culturel du pays.',
        answer: true,
        explanation: 'La Loi 318-68 est la legislation dominicaine pour proteger les biens culturels. Dans le jeu, on l\'utilise contre le trafiquant Torres.'
      }
    }
  },

  {
    id: 'soc-004', type: 'tf',
    lang: {
      es: {
        q: 'En el combate contra el pez leon, debes matarlo para ganar. No hay opcion pacifica.',
        answer: false,
        explanation: 'Puedes atraparlo, pescar con arponcito, proteger el coral o alertar buzos. Todas son opciones ecologicas, no violentas.'
      },
      en: {
        q: 'In the lionfish combat, you must kill it to win. There is no peaceful option.',
        answer: false,
        explanation: 'You can trap it, spearfish, protect the coral, or alert divers. All are ecological, non-violent options.'
      },
      fr: {
        q: 'Dans le combat contre le poisson-lion, il faut le tuer pour gagner. Il n\'y a pas d\'option pacifique.',
        answer: false,
        explanation: 'On peut le pieger, le pecher au harpon, proteger le corail ou alerter les plongeurs. Ce sont toutes des options ecologiques.'
      }
    }
  },

  {
    id: 'soc-005', type: 'tf',
    lang: {
      es: {
        q: 'La Convencion UNESCO de 1970 combate el trafico ilicito de bienes culturales a nivel internacional.',
        answer: true,
        explanation: 'La Convencion UNESCO 1970 es un tratado internacional contra el trafico de patrimonio. En el juego, es una de tus armas legales contra Torres.'
      },
      en: {
        q: 'The 1970 UNESCO Convention fights the illicit trafficking of cultural property at an international level.',
        answer: true,
        explanation: 'The 1970 UNESCO Convention is an international treaty against heritage trafficking. In the game, it is one of your legal weapons against Torres.'
      },
      fr: {
        q: 'La Convention UNESCO de 1970 lutte contre le trafic illicite de biens culturels au niveau international.',
        answer: true,
        explanation: 'La Convention UNESCO de 1970 est un traite international contre le trafic de patrimoine. Dans le jeu, c\'est une de vos armes legales contre Torres.'
      }
    }
  },

  {
    id: 'soc-006', type: 'tf',
    lang: {
      es: {
        q: 'El medidor de conviccion debe llegar a 100% para ganar un combate de forma pacifica.',
        answer: true,
        explanation: 'Conviccion al 100% = victoria pacifica. Es como convencer a alguien con argumentos, como Dumbledore hablando con Tom Riddle.'
      },
      en: {
        q: 'The conviction meter must reach 100% to win a combat peacefully.',
        answer: true,
        explanation: 'Conviction at 100% = peaceful victory. It is like convincing someone with arguments, like Dumbledore talking to Tom Riddle.'
      },
      fr: {
        q: 'Le compteur de conviction doit atteindre 100% pour gagner un combat de maniere pacifique.',
        answer: true,
        explanation: 'Conviction a 100% = victoire pacifique. C\'est comme convaincre quelqu\'un par des arguments, comme Dumbledore parlant a Tom Riddle.'
      }
    }
  },

  {
    id: 'soc-007', type: 'tf',
    lang: {
      es: {
        q: 'En el duelo de espadas contra el Soldado Diego, huir se considera una victoria pacifista.',
        answer: true,
        explanation: 'Huir del duelo cuenta como resolucion pacifista. A veces la mejor batalla es la que no se pelea, como diria el Maestro Oogway.'
      },
      en: {
        q: 'In the sword duel against Soldier Diego, fleeing counts as a pacifist victory.',
        answer: true,
        explanation: 'Fleeing the duel counts as a pacifist resolution. Sometimes the best battle is the one not fought, as Master Oogway would say.'
      },
      fr: {
        q: 'Dans le duel d\'epees contre le Soldat Diego, fuir est considere comme une victoire pacifiste.',
        answer: true,
        explanation: 'Fuir le duel compte comme une resolution pacifiste. Parfois le meilleur combat est celui qu\'on ne livre pas, comme dirait Maitre Oogway.'
      }
    }
  },

  {
    id: 'soc-008', type: 'tf',
    lang: {
      es: {
        q: 'INTERPOL solo se dedica a perseguir ladrones de bancos y no tiene nada que ver con el patrimonio cultural.',
        answer: false,
        explanation: 'INTERPOL tiene un programa dedicado a combatir el trafico de obras de arte y bienes culturales. En el juego, es clave contra Torres.'
      },
      en: {
        q: 'INTERPOL only deals with bank robbers and has nothing to do with cultural heritage.',
        answer: false,
        explanation: 'INTERPOL has a dedicated program to combat trafficking of artworks and cultural property. In the game, it is key against Torres.'
      },
      fr: {
        q: 'INTERPOL ne s\'occupe que des braqueurs de banques et n\'a rien a voir avec le patrimoine culturel.',
        answer: false,
        explanation: 'INTERPOL a un programme dedie a la lutte contre le trafic d\'oeuvres d\'art et de biens culturels. Dans le jeu, c\'est cle contre Torres.'
      }
    }
  },

  {
    id: 'soc-009', type: 'tf',
    lang: {
      es: {
        q: 'Rescatar al manati y limpiar el arrecife son acciones ecologicas que suman a tu progreso en el juego.',
        answer: true,
        explanation: 'Ambas acciones incrementan tu contador de acciones ecologicas y completan la mision secundaria rescateManati.'
      },
      en: {
        q: 'Rescuing the manatee and cleaning the reef are ecological actions that count toward your game progress.',
        answer: true,
        explanation: 'Both actions increase your ecological action counter and complete the rescueManatee side quest.'
      },
      fr: {
        q: 'Sauver le lamantin et nettoyer le recif sont des actions ecologiques qui comptent pour ta progression.',
        answer: true,
        explanation: 'Les deux actions augmentent ton compteur d\'actions ecologiques et completent la quete secondaire sauvetageManatin.'
      }
    }
  },

  {
    id: 'soc-010', type: 'tf',
    lang: {
      es: {
        q: 'El juego tiene un unico final, sin importar las decisiones del jugador.',
        answer: false,
        explanation: 'ArcLycee tiene 5 finales diferentes (completo, pacifista, museo, ecologico, oscuro) segun tus decisiones. Tus acciones importan.'
      },
      en: {
        q: 'The game has only one ending, regardless of the player\'s decisions.',
        answer: false,
        explanation: 'ArcLycee has 5 different endings (complete, pacifist, museum, ecological, dark) based on your decisions. Your actions matter.'
      },
      fr: {
        q: 'Le jeu n\'a qu\'une seule fin, peu importe les decisions du joueur.',
        answer: false,
        explanation: 'ArcLycee a 5 fins differentes (complete, pacifiste, musee, ecologique, sombre) selon tes decisions. Tes actions comptent.'
      }
    }
  },

  {
    id: 'soc-011', type: 'tf',
    lang: {
      es: {
        q: 'Contra el Constructor Mendez, puedes usar carteles de protesta y una cadena humana como estrategia.',
        answer: true,
        explanation: 'Las opciones civicas contra Mendez incluyen carteles, prensa, accion legal y cadena humana. Activismo ciudadano real.'
      },
      en: {
        q: 'Against Builder Mendez, you can use protest signs and a human chain as a strategy.',
        answer: true,
        explanation: 'Civic options against Mendez include protest signs, press, legal action, and human chains. Real citizen activism.'
      },
      fr: {
        q: 'Contre le Constructeur Mendez, on peut utiliser des pancartes de protestation et une chaine humaine comme strategie.',
        answer: true,
        explanation: 'Les options civiques contre Mendez incluent pancartes, presse, action legale et chaine humaine. Du vrai activisme citoyen.'
      }
    }
  },

  {
    id: 'soc-012', type: 'tf',
    lang: {
      es: {
        q: 'El sistema de reputacion del juego no tiene ningun efecto real en la historia.',
        answer: false,
        explanation: 'La reputacion influye en los finales. El juego rastrea combates pacificados vs violentos para determinar tu final.'
      },
      en: {
        q: 'The game\'s reputation system has no real effect on the story.',
        answer: false,
        explanation: 'Reputation influences your endings. The game tracks pacified vs violent combats to determine your finale.'
      },
      fr: {
        q: 'Le systeme de reputation du jeu n\'a aucun effet reel sur l\'histoire.',
        answer: false,
        explanation: 'La reputation influence les fins. Le jeu suit les combats pacifies vs violents pour determiner ta finale.'
      }
    }
  },

  {
    id: 'soc-013', type: 'tf',
    lang: {
      es: {
        q: 'Hablar con el Soldado Diego puede subir tu medidor de conviccion hasta ganar sin pelear, como Aang en Avatar.',
        answer: true,
        explanation: 'En modo pacifista, dialogar con Diego sube la conviccion a 100%. Como Aang, que derroto al Senor del Fuego sin matarlo.'
      },
      en: {
        q: 'Talking to Soldier Diego can raise your conviction meter to win without fighting, like Aang in Avatar.',
        answer: true,
        explanation: 'In pacifist mode, talking to Diego raises conviction to 100%. Like Aang, who defeated the Fire Lord without killing him.'
      },
      fr: {
        q: 'Parler au Soldat Diego peut monter ton compteur de conviction pour gagner sans combattre, comme Aang dans Avatar.',
        answer: true,
        explanation: 'En mode pacifiste, dialoguer avec Diego monte la conviction a 100%. Comme Aang qui a vaincu le Seigneur du Feu sans le tuer.'
      }
    }
  },

  {
    id: 'soc-014', type: 'tf',
    lang: {
      es: {
        q: 'La evidencia forense es una de las herramientas para enfrentar al traficante Torres en el aeropuerto.',
        answer: true,
        explanation: 'Contra Torres usas evidencia forense junto con la Ley 318, INTERPOL y la Convencion UNESCO. La ciencia y la ley son tus armas.'
      },
      en: {
        q: 'Forensic evidence is one of the tools to confront trafficker Torres at the airport.',
        answer: true,
        explanation: 'Against Torres you use forensic evidence along with Law 318, INTERPOL, and the UNESCO Convention. Science and law are your weapons.'
      },
      fr: {
        q: 'Les preuves medico-legales sont l\'un des outils pour affronter le trafiquant Torres a l\'aeroport.',
        answer: true,
        explanation: 'Contre Torres on utilise les preuves medico-legales avec la Loi 318, INTERPOL et la Convention UNESCO. La science et la loi sont tes armes.'
      }
    }
  },

  {
    id: 'soc-015', type: 'tf',
    lang: {
      es: {
        q: 'El pez leon es una especie nativa del Caribe que no representa ningun peligro ecologico.',
        answer: false,
        explanation: 'El pez leon es una especie invasora en el Caribe. En el juego, lo enfrentas con metodos ecologicos como trampa y pesca controlada.'
      },
      en: {
        q: 'The lionfish is a native Caribbean species that poses no ecological danger.',
        answer: false,
        explanation: 'The lionfish is an invasive species in the Caribbean. In the game, you confront it with ecological methods like trapping and controlled fishing.'
      },
      fr: {
        q: 'Le poisson-lion est une espece native des Caraibes qui ne represente aucun danger ecologique.',
        answer: false,
        explanation: 'Le poisson-lion est une espece invasive dans les Caraibes. Dans le jeu, on l\'affronte avec des methodes ecologiques comme le piegeage.'
      }
    }
  },

  {
    id: 'soc-016', type: 'tf',
    lang: {
      es: {
        q: 'Para obtener el final "completo" necesitas al menos 8 nodos completados, 5 misiones secundarias y todos los combates pacificados.',
        answer: true,
        explanation: 'El final completo es el mas dificil: requiere exploracion total, ayudar a todos y nunca recurrir a la violencia.'
      },
      en: {
        q: 'To get the "complete" ending you need at least 8 completed nodes, 5 side quests, and all combats pacified.',
        answer: true,
        explanation: 'The complete ending is the hardest: it requires full exploration, helping everyone, and never resorting to violence.'
      },
      fr: {
        q: 'Pour obtenir la fin "complete", il faut au moins 8 noeuds termines, 5 quetes secondaires et tous les combats pacifies.',
        answer: true,
        explanation: 'La fin complete est la plus difficile : elle exige une exploration totale, aider tout le monde et ne jamais recourir a la violence.'
      }
    }
  },

  {
    id: 'soc-017', type: 'tf',
    lang: {
      es: {
        q: 'Alertar a los buzos sobre el pez leon es una accion mas efectiva a largo plazo que simplemente matar un solo pez.',
        answer: true,
        explanation: 'Alertar buzos crea conciencia colectiva, como cuando Luffy inspira a pueblos enteros. Una persona informada multiplica el impacto.'
      },
      en: {
        q: 'Alerting divers about the lionfish is a more effective long-term action than simply killing a single fish.',
        answer: true,
        explanation: 'Alerting divers creates collective awareness, like when Luffy inspires entire towns. An informed person multiplies the impact.'
      },
      fr: {
        q: 'Alerter les plongeurs sur le poisson-lion est une action plus efficace a long terme que simplement tuer un seul poisson.',
        answer: true,
        explanation: 'Alerter les plongeurs cree une conscience collective, comme quand Luffy inspire des villes entieres. Une personne informee multiplie l\'impact.'
      }
    }
  },

  {
    id: 'soc-018', type: 'tf',
    lang: {
      es: {
        q: 'La cadena humana contra el Constructor Mendez es un ejemplo de desobediencia civil no violenta.',
        answer: true,
        explanation: 'La cadena humana es una forma clasica de protesta pacifica, como las marchas de Martin Luther King Jr.'
      },
      en: {
        q: 'The human chain against Builder Mendez is an example of nonviolent civil disobedience.',
        answer: true,
        explanation: 'The human chain is a classic form of peaceful protest, like Martin Luther King Jr.\'s marches.'
      },
      fr: {
        q: 'La chaine humaine contre le Constructeur Mendez est un exemple de desobeissance civile non violente.',
        answer: true,
        explanation: 'La chaine humaine est une forme classique de protestation pacifique, comme les marches de Martin Luther King Jr.'
      }
    }
  },

  {
    id: 'soc-019', type: 'tf',
    lang: {
      es: {
        q: 'En ArcLycee, el medidor de hostilidad sube cuando usas la violencia contra tus oponentes.',
        answer: true,
        explanation: 'La hostilidad aumenta con acciones agresivas. Conviccion y hostilidad son fuerzas opuestas, como la luz y la oscuridad en Star Wars.'
      },
      en: {
        q: 'In ArcLycee, the hostility meter rises when you use violence against opponents.',
        answer: true,
        explanation: 'Hostility increases with aggressive actions. Conviction and hostility are opposing forces, like light and dark in Star Wars.'
      },
      fr: {
        q: 'Dans ArcLycee, le compteur d\'hostilite monte quand on utilise la violence contre les adversaires.',
        answer: true,
        explanation: 'L\'hostilite augmente avec les actions agressives. Conviction et hostilite sont des forces opposees, comme la lumiere et l\'obscurite dans Star Wars.'
      }
    }
  },

  {
    id: 'soc-020', type: 'tf',
    lang: {
      es: {
        q: 'Limpiar un arrecife de coral contaminado es un acto de responsabilidad ecologica que el juego recompensa.',
        answer: true,
        explanation: 'La limpieza del arrecife suma a tus acciones ecologicas y ayuda a completar la mision del manati. Cada accion cuenta.'
      },
      en: {
        q: 'Cleaning a contaminated coral reef is an act of ecological responsibility that the game rewards.',
        answer: true,
        explanation: 'Reef cleaning adds to your ecological actions and helps complete the manatee mission. Every action counts.'
      },
      fr: {
        q: 'Nettoyer un recif de corail contamine est un acte de responsabilite ecologique que le jeu recompense.',
        answer: true,
        explanation: 'Le nettoyage du recif s\'ajoute aux actions ecologiques et aide a completer la mission du lamantin. Chaque action compte.'
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
        q: 'La fin "sombre" s\'obtient quand le joueur resout tous les conflits de maniere violente.',
        answer: true,
        explanation: 'La fin sombre reflete les consequences de toujours choisir la violence. Comme dans Undertale, la route genocide a un prix.'
      }
    }
  },

  {
    id: 'soc-022', type: 'tf',
    lang: {
      es: {
        q: 'Usar la prensa como herramienta contra el Constructor Mendez es una forma de activismo mediatico.',
        answer: true,
        explanation: 'Llamar a la prensa expone la destruccion del patrimonio. La libertad de prensa es una herramienta democratica real.'
      },
      en: {
        q: 'Using the press as a tool against Builder Mendez is a form of media activism.',
        answer: true,
        explanation: 'Calling the press exposes heritage destruction. Freedom of the press is a real democratic tool.'
      },
      fr: {
        q: 'Utiliser la presse comme outil contre le Constructeur Mendez est une forme d\'activisme mediatique.',
        answer: true,
        explanation: 'Appeler la presse expose la destruction du patrimoine. La liberte de la presse est un outil democratique reel.'
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
        q: 'La fin pacifiste requiert de completer 8+ noeuds et que tous les combats soient pacifies.',
        answer: true,
        explanation: 'La fin pacifiste recompense la coherence : explorer le monde ET resoudre chaque conflit sans violence.'
      }
    }
  },

  {
    id: 'soc-024', type: 'tf',
    lang: {
      es: {
        q: 'Proteger el coral es una de las cuatro opciones ecologicas en el combate contra el pez leon.',
        answer: true,
        explanation: 'Las 4 opciones son: atrapar, pescar con arpon, proteger coral y alertar buzos. Todas defienden el ecosistema marino.'
      },
      en: {
        q: 'Protecting the coral is one of the four ecological options in the lionfish combat.',
        answer: true,
        explanation: 'The 4 options are: trapping, spearfishing, protecting coral, and alerting divers. All defend the marine ecosystem.'
      },
      fr: {
        q: 'Proteger le corail est l\'une des quatre options ecologiques dans le combat contre le poisson-lion.',
        answer: true,
        explanation: 'Les 4 options sont : pieger, pecher au harpon, proteger le corail et alerter les plongeurs. Toutes defendent l\'ecosysteme marin.'
      }
    }
  },

  {
    id: 'soc-025', type: 'tf',
    lang: {
      es: {
        q: 'En el juego, las palabras y la evidencia pueden ser mas poderosas que la fuerza fisica.',
        answer: true,
        explanation: 'El sistema de conviccion demuestra que los argumentos ganan batallas. Como dice Batman: la mente es el arma mas peligrosa.'
      },
      en: {
        q: 'In the game, words and evidence can be more powerful than physical force.',
        answer: true,
        explanation: 'The conviction system shows that arguments win battles. As Batman says: the mind is the most dangerous weapon.'
      },
      fr: {
        q: 'Dans le jeu, les mots et les preuves peuvent etre plus puissants que la force physique.',
        answer: true,
        explanation: 'Le systeme de conviction demontre que les arguments gagnent des batailles. Comme dit Batman : l\'esprit est l\'arme la plus dangereuse.'
      }
    }
  },

  // ===== MULTIPLE CHOICE (soc-026 a soc-050) =====

  {
    id: 'soc-026', type: 'mcq',
    lang: {
      es: {
        q: 'En ArcLycee, como en Undertale, puedes ganar sin hacer dano. Que sube cuando convences al enemigo?',
        options: ['Barra de vida', 'Medidor de conviccion', 'Medidor de hostilidad', 'Puntos de experiencia'],
        answer: 1,
        explanation: 'El medidor de conviccion sube con dialogo y argumentos. Al llegar a 100%, ganas sin violencia.'
      },
      en: {
        q: 'In ArcLycee, like in Undertale, you can win without causing harm. What rises when you convince the enemy?',
        options: ['Health bar', 'Conviction meter', 'Hostility meter', 'Experience points'],
        answer: 1,
        explanation: 'The conviction meter rises with dialogue and arguments. At 100%, you win without violence.'
      },
      fr: {
        q: 'Dans ArcLycee, comme dans Undertale, on peut gagner sans faire de mal. Qu\'est-ce qui monte quand tu convaincs l\'ennemi ?',
        options: ['Barre de vie', 'Compteur de conviction', 'Compteur d\'hostilite', 'Points d\'experience'],
        answer: 1,
        explanation: 'Le compteur de conviction monte avec le dialogue et les arguments. A 100%, tu gagnes sans violence.'
      }
    }
  },

  {
    id: 'soc-027', type: 'mcq',
    lang: {
      es: {
        q: 'Si la regla de Batman de "no matar" fuera una mecanica de juego, que medidor llenaria?',
        options: ['Hostilidad', 'Fuerza', 'Conviccion', 'Dano'],
        answer: 2,
        explanation: 'Batman derrota villanos sin matarlos, igual que la ruta pacifista. Conviccion = ganar con principios.'
      },
      en: {
        q: 'If Batman\'s "no kill rule" were a game mechanic, which meter would it fill?',
        options: ['Hostility', 'Strength', 'Conviction', 'Damage'],
        answer: 2,
        explanation: 'Batman defeats villains without killing them, just like the pacifist route. Conviction = winning with principles.'
      },
      fr: {
        q: 'Si la regle de Batman de "ne pas tuer" etait une mecanique de jeu, quel compteur remplirait-elle ?',
        options: ['Hostilite', 'Force', 'Conviction', 'Degats'],
        answer: 2,
        explanation: 'Batman vainc les vilains sans les tuer, comme la route pacifiste. Conviction = gagner avec des principes.'
      }
    }
  },

  {
    id: 'soc-028', type: 'mcq',
    lang: {
      es: {
        q: 'Cuantos finales diferentes tiene ArcLycee?',
        options: ['2', '3', '5', '10'],
        answer: 2,
        explanation: 'Hay 5 finales: completo, pacifista, museo, ecologico y oscuro. Cada uno refleja un estilo de juego diferente.'
      },
      en: {
        q: 'How many different endings does ArcLycee have?',
        options: ['2', '3', '5', '10'],
        answer: 2,
        explanation: 'There are 5 endings: complete, pacifist, museum, ecological, and dark. Each reflects a different play style.'
      },
      fr: {
        q: 'Combien de fins differentes a ArcLycee ?',
        options: ['2', '3', '5', '10'],
        answer: 2,
        explanation: 'Il y a 5 fins : complete, pacifiste, musee, ecologique et sombre. Chacune reflete un style de jeu different.'
      }
    }
  },

  {
    id: 'soc-029', type: 'mcq',
    lang: {
      es: {
        q: 'Cual de estas NO es una opcion contra el traficante Torres en el combate legal?',
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
        q: 'Laquelle de ces options N\'est PAS une option contre le trafiquant Torres en combat legal ?',
        options: ['Loi 318', 'Preuves medico-legales', 'INTERPOL', 'Epee de combat'],
        answer: 3,
        explanation: 'Contre Torres on utilise la loi, la science et les organisations internationales. Pas d\'epees, c\'est un combat d\'arguments.'
      }
    }
  },

  {
    id: 'soc-030', type: 'mcq',
    lang: {
      es: {
        q: 'Que reputacion ganas con una victoria pacifica vs una violenta?',
        options: ['+5 pacifica, +15 violenta', '+15 pacifica, +5 violenta', '+10 ambas', '+20 pacifica, +0 violenta'],
        answer: 1,
        explanation: 'Pacifica = +15, violenta = +5. El juego te da tres veces mas reputacion por resolver sin violencia.'
      },
      en: {
        q: 'What reputation do you gain from a peaceful victory vs a violent one?',
        options: ['+5 peaceful, +15 violent', '+15 peaceful, +5 violent', '+10 both', '+20 peaceful, +0 violent'],
        answer: 1,
        explanation: 'Peaceful = +15, violent = +5. The game gives you three times more reputation for solving without violence.'
      },
      fr: {
        q: 'Quelle reputation gagnes-tu avec une victoire pacifique vs violente ?',
        options: ['+5 pacifique, +15 violente', '+15 pacifique, +5 violente', '+10 les deux', '+20 pacifique, +0 violente'],
        answer: 1,
        explanation: 'Pacifique = +15, violente = +5. Le jeu donne trois fois plus de reputation pour resoudre sans violence.'
      }
    }
  },

  {
    id: 'soc-031', type: 'mcq',
    lang: {
      es: {
        q: 'Que ley dominicana usas como arma legal contra el traficante de artefactos?',
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
        q: 'Quelle loi dominicaine utilises-tu comme arme legale contre le trafiquant d\'artefacts ?',
        options: ['Loi 100-00', 'Loi 318-68', 'Loi 502-99', 'Loi 64-00'],
        answer: 1,
        explanation: 'La Loi 318-68 protege le patrimoine culturel dominicain. Connaitre tes droits est un vrai superpouvoir.'
      }
    }
  },

  {
    id: 'soc-032', type: 'mcq',
    lang: {
      es: {
        q: 'En el combate contra el Constructor Mendez, cual de estas es una opcion civica?',
        options: ['Lanzar piedras', 'Carteles de protesta', 'Incendiar la obra', 'Hackear su cuenta bancaria'],
        answer: 1,
        explanation: 'Los carteles de protesta son activismo pacifico legal. Como los X-Men de Xavier, no los de Magneto.'
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
        explanation: 'Les pancartes de protestation sont de l\'activisme pacifique legal. Comme les X-Men de Xavier, pas ceux de Magneto.'
      }
    }
  },

  {
    id: 'soc-033', type: 'mcq',
    lang: {
      es: {
        q: 'Cual organizacion internacional ayuda a detener el trafico de artefactos culturales entre paises?',
        options: ['FIFA', 'INTERPOL', 'NASA', 'OMS'],
        answer: 1,
        explanation: 'INTERPOL coordina la policia internacional contra el trafico de bienes culturales. Es como el S.H.I.E.L.D. del mundo real.'
      },
      en: {
        q: 'Which international organization helps stop the trafficking of cultural artifacts between countries?',
        options: ['FIFA', 'INTERPOL', 'NASA', 'WHO'],
        answer: 1,
        explanation: 'INTERPOL coordinates international police against cultural property trafficking. Like a real-world S.H.I.E.L.D.'
      },
      fr: {
        q: 'Quelle organisation internationale aide a stopper le trafic d\'artefacts culturels entre pays ?',
        options: ['FIFA', 'INTERPOL', 'NASA', 'OMS'],
        answer: 1,
        explanation: 'INTERPOL coordonne la police internationale contre le trafic de biens culturels. Comme un S.H.I.E.L.D. du monde reel.'
      }
    }
  },

  {
    id: 'soc-034', type: 'mcq',
    lang: {
      es: {
        q: 'Que medidor muestra el combate contra el pez leon en lugar de "Convencido"?',
        options: ['"Derrotado:"', '"Controlado:"', '"Eliminado:"', '"Capturado:"'],
        answer: 1,
        explanation: 'El pez leon usa "Controlado:" porque no se trata de convencer a un pez, sino de controlar una especie invasora.'
      },
      en: {
        q: 'What label does the lionfish combat show instead of "Convinced"?',
        options: ['"Defeated:"', '"Controlled:"', '"Eliminated:"', '"Captured:"'],
        answer: 1,
        explanation: 'The lionfish uses "Controlled:" because it is not about convincing a fish, but controlling an invasive species.'
      },
      fr: {
        q: 'Quelle etiquette le combat du poisson-lion affiche-t-il au lieu de "Convaincu" ?',
        options: ['"Vaincu :"', '"Controle :"', '"Elimine :"', '"Capture :"'],
        answer: 1,
        explanation: 'Le poisson-lion utilise "Controle :" car il ne s\'agit pas de convaincre un poisson, mais de controler une espece invasive.'
      }
    }
  },

  {
    id: 'soc-035', type: 'mcq',
    lang: {
      es: {
        q: 'Que etiqueta especial usa el combate contra Torres en lugar de "Convencido"?',
        options: ['"Culpable:"', '"Evidencia:"', '"Arrestado:"', '"Acusado:"'],
        answer: 1,
        explanation: 'Contra Torres, acumulas evidencia legal. El medidor se llama "Evidencia:" porque es un caso juridico, no una pelea.'
      },
      en: {
        q: 'What special label does the Torres combat use instead of "Convinced"?',
        options: ['"Guilty:"', '"Evidence:"', '"Arrested:"', '"Accused:"'],
        answer: 1,
        explanation: 'Against Torres, you accumulate legal evidence. The meter is called "Evidence:" because it is a legal case, not a fight.'
      },
      fr: {
        q: 'Quelle etiquette speciale le combat contre Torres utilise-t-il au lieu de "Convaincu" ?',
        options: ['"Coupable :"', '"Preuve :"', '"Arrete :"', '"Accuse :"'],
        answer: 1,
        explanation: 'Contre Torres, on accumule des preuves legales. Le compteur s\'appelle "Preuve :" car c\'est un cas juridique, pas un combat.'
      }
    }
  },

  {
    id: 'soc-036', type: 'mcq',
    lang: {
      es: {
        q: 'Como Captain America usando diplomacia antes que fuerza, cual es la mejor primera opcion en ArcLycee?',
        options: ['Atacar con todo', 'Dialogar y convencer', 'Huir siempre', 'Ignorar al enemigo'],
        answer: 1,
        explanation: 'Como Cap negociando antes de pelear, el dialogo es la herramienta mas poderosa. Te da mas reputacion y mejores finales.'
      },
      en: {
        q: 'Like Captain America using diplomacy before force, what is the best first option in ArcLycee?',
        options: ['Attack with everything', 'Talk and convince', 'Always flee', 'Ignore the enemy'],
        answer: 1,
        explanation: 'Like Cap negotiating before fighting, dialogue is the most powerful tool. It gives you more reputation and better endings.'
      },
      fr: {
        q: 'Comme Captain America utilisant la diplomatie avant la force, quelle est la meilleure premiere option dans ArcLycee ?',
        options: ['Attaquer a fond', 'Dialoguer et convaincre', 'Toujours fuir', 'Ignorer l\'ennemi'],
        answer: 1,
        explanation: 'Comme Cap negociant avant de combattre, le dialogue est l\'outil le plus puissant. Il donne plus de reputation et de meilleurs fins.'
      }
    }
  },

  {
    id: 'soc-037', type: 'mcq',
    lang: {
      es: {
        q: 'Que dos acciones ecologicas completan la mision del manati en el Santuario?',
        options: ['Pescar y nadar', 'Liberar manati y limpiar arrecife', 'Fotografiar y bucear', 'Alimentar y curar'],
        answer: 1,
        explanation: 'Liberar al manati atrapado y limpiar el arrecife contaminado son las dos acciones que completan la mision ecologica.'
      },
      en: {
        q: 'What two ecological actions complete the manatee mission in the Sanctuary?',
        options: ['Fish and swim', 'Free manatee and clean reef', 'Photograph and dive', 'Feed and heal'],
        answer: 1,
        explanation: 'Freeing the trapped manatee and cleaning the contaminated reef are the two actions that complete the ecological mission.'
      },
      fr: {
        q: 'Quelles deux actions ecologiques completent la mission du lamantin dans le Sanctuaire ?',
        options: ['Pecher et nager', 'Liberer le lamantin et nettoyer le recif', 'Photographier et plonger', 'Nourrir et soigner'],
        answer: 1,
        explanation: 'Liberer le lamantin piege et nettoyer le recif contamine sont les deux actions qui completent la mission ecologique.'
      }
    }
  },

  {
    id: 'soc-038', type: 'mcq',
    lang: {
      es: {
        q: 'En el duelo contra el Soldado Diego, que opciones de dialogo tienes antes de pelear?',
        options: ['Solo atacar', 'Atacar, Hablar, Negociar, Huir', 'Atacar o Defender', 'Hablar o Callar'],
        answer: 1,
        explanation: 'Tienes 4 opciones: Atacar (agresivo), Hablar (pacifico), Negociar (pacifico) y Huir (pacifico). 3 de 4 son pacificas.'
      },
      en: {
        q: 'In the duel against Soldier Diego, what dialogue options do you have before fighting?',
        options: ['Only attack', 'Attack, Talk, Negotiate, Flee', 'Attack or Defend', 'Talk or Stay Silent'],
        answer: 1,
        explanation: 'You have 4 options: Attack (aggressive), Talk (peaceful), Negotiate (peaceful), and Flee (peaceful). 3 out of 4 are peaceful.'
      },
      fr: {
        q: 'Dans le duel contre le Soldat Diego, quelles options de dialogue as-tu avant de combattre ?',
        options: ['Seulement attaquer', 'Attaquer, Parler, Negocier, Fuir', 'Attaquer ou Defendre', 'Parler ou Se taire'],
        answer: 1,
        explanation: 'Tu as 4 options : Attaquer (agressif), Parler (pacifique), Negocier (pacifique) et Fuir (pacifique). 3 sur 4 sont pacifiques.'
      }
    }
  },

  {
    id: 'soc-039', type: 'mcq',
    lang: {
      es: {
        q: 'Como en Gravity Falls donde Dipper resuelve misterios con pistas, que usas contra Torres?',
        options: ['Fuerza bruta', 'Evidencia y leyes', 'Magia', 'Sobornos'],
        answer: 1,
        explanation: 'Como Dipper con su diario, tu arma es la informacion: evidencia forense, leyes y cooperacion internacional.'
      },
      en: {
        q: 'Like in Gravity Falls where Dipper solves mysteries with clues, what do you use against Torres?',
        options: ['Brute force', 'Evidence and laws', 'Magic', 'Bribes'],
        answer: 1,
        explanation: 'Like Dipper with his journal, your weapon is information: forensic evidence, laws, and international cooperation.'
      },
      fr: {
        q: 'Comme dans Gravity Falls ou Dipper resout des mysteres avec des indices, qu\'utilises-tu contre Torres ?',
        options: ['Force brute', 'Preuves et lois', 'Magie', 'Pots-de-vin'],
        answer: 1,
        explanation: 'Comme Dipper avec son journal, ton arme est l\'information : preuves medico-legales, lois et cooperation internationale.'
      }
    }
  },

  {
    id: 'soc-040', type: 'mcq',
    lang: {
      es: {
        q: 'Que pasa al final del combate legal contra Torres? (Piensa en una escena de pelicula policiaca.)',
        options: ['Torres escapa', 'Torres es arrestado cinematograficamente', 'Torres se une a tu equipo', 'Nada especial'],
        answer: 1,
        explanation: 'Miguel Sanchez y el Agente Montero caminan hacia Torres, lo arrestan con dialogo y lo escoltan fuera. Justicia cinematografica.'
      },
      en: {
        q: 'What happens at the end of the legal combat against Torres? (Think of a cop movie scene.)',
        options: ['Torres escapes', 'Torres is cinematically arrested', 'Torres joins your team', 'Nothing special'],
        answer: 1,
        explanation: 'Miguel Sanchez and Agent Montero walk toward Torres, arrest him with dialogue, and escort him out. Cinematic justice.'
      },
      fr: {
        q: 'Que se passe-t-il a la fin du combat legal contre Torres ? (Pense a une scene de film policier.)',
        options: ['Torres s\'echappe', 'Torres est arrete de maniere cinematographique', 'Torres rejoint ton equipe', 'Rien de special'],
        answer: 1,
        explanation: 'Miguel Sanchez et l\'Agent Montero marchent vers Torres, l\'arretent par dialogue et l\'escortent dehors. Justice cinematographique.'
      }
    }
  },

  {
    id: 'soc-041', type: 'mcq',
    lang: {
      es: {
        q: 'En que ano se firmo la Convencion UNESCO contra el trafico de bienes culturales?',
        options: ['1945', '1960', '1970', '2000'],
        answer: 2,
        explanation: 'La Convencion UNESCO de 1970 es el tratado internacional mas importante contra el trafico de patrimonio cultural.'
      },
      en: {
        q: 'In what year was the UNESCO Convention against cultural property trafficking signed?',
        options: ['1945', '1960', '1970', '2000'],
        answer: 2,
        explanation: 'The 1970 UNESCO Convention is the most important international treaty against cultural heritage trafficking.'
      },
      fr: {
        q: 'En quelle annee la Convention UNESCO contre le trafic de biens culturels a-t-elle ete signee ?',
        options: ['1945', '1960', '1970', '2000'],
        answer: 2,
        explanation: 'La Convention UNESCO de 1970 est le traite international le plus important contre le trafic de patrimoine culturel.'
      }
    }
  },

  {
    id: 'soc-042', type: 'mcq',
    lang: {
      es: {
        q: 'Como Finn en Adventure Time enfrentando dilemas morales, que rastrean las decisiones en ArcLycee?',
        options: ['Solo puntos', 'Combates pacificados vs violentos', 'Tiempo de juego', 'Monedas recogidas'],
        answer: 1,
        explanation: 'El juego cuenta separadamente combates pacificados y violentos. Cada decision moral tiene peso, como las de Finn.'
      },
      en: {
        q: 'Like Finn in Adventure Time facing moral dilemmas, what do decisions track in ArcLycee?',
        options: ['Just points', 'Pacified vs violent combats', 'Play time', 'Coins collected'],
        answer: 1,
        explanation: 'The game separately counts pacified and violent combats. Each moral decision carries weight, like Finn\'s choices.'
      },
      fr: {
        q: 'Comme Finn dans Adventure Time face a des dilemmes moraux, que suivent les decisions dans ArcLycee ?',
        options: ['Juste des points', 'Combats pacifies vs violents', 'Temps de jeu', 'Pieces ramassees'],
        answer: 1,
        explanation: 'Le jeu compte separement les combats pacifies et violents. Chaque decision morale a du poids, comme celles de Finn.'
      }
    }
  },

  {
    id: 'soc-043', type: 'mcq',
    lang: {
      es: {
        q: 'Cual es el principal problema ecologico del pez leon en el Caribe?',
        options: ['Es demasiado bonito', 'Es una especie invasora que destruye ecosistemas', 'Es venenoso para los humanos', 'Roba comida a los pescadores'],
        answer: 1,
        explanation: 'El pez leon es invasor: devora peces nativos y dana arrecifes. Controlarlo es responsabilidad ecologica, no crueldad.'
      },
      en: {
        q: 'What is the main ecological problem of the lionfish in the Caribbean?',
        options: ['It is too pretty', 'It is an invasive species that destroys ecosystems', 'It is poisonous to humans', 'It steals food from fishers'],
        answer: 1,
        explanation: 'The lionfish is invasive: it devours native fish and damages reefs. Controlling it is ecological responsibility, not cruelty.'
      },
      fr: {
        q: 'Quel est le principal probleme ecologique du poisson-lion dans les Caraibes ?',
        options: ['Il est trop beau', 'C\'est une espece invasive qui detruit les ecosystemes', 'Il est venimeux pour les humains', 'Il vole la nourriture des pecheurs'],
        answer: 1,
        explanation: 'Le poisson-lion est invasif : il devore les poissons natifs et endommage les recifs. Le controler est une responsabilite ecologique.'
      }
    }
  },

  {
    id: 'soc-044', type: 'mcq',
    lang: {
      es: {
        q: 'Que pasa cuando la hostilidad del enemigo sube demasiado en un combate?',
        options: ['Nada, es solo visual', 'El combate se vuelve mas dificil y peligroso', 'Ganas automaticamente', 'El enemigo huye'],
        answer: 1,
        explanation: 'Alta hostilidad = enemigo mas agresivo. Es la consecuencia directa de usar violencia. Las acciones tienen consecuencias.'
      },
      en: {
        q: 'What happens when the enemy\'s hostility rises too much in combat?',
        options: ['Nothing, it is just visual', 'Combat becomes harder and more dangerous', 'You win automatically', 'The enemy flees'],
        answer: 1,
        explanation: 'High hostility = more aggressive enemy. It is the direct consequence of using violence. Actions have consequences.'
      },
      fr: {
        q: 'Que se passe-t-il quand l\'hostilite de l\'ennemi monte trop dans un combat ?',
        options: ['Rien, c\'est juste visuel', 'Le combat devient plus difficile et dangereux', 'Tu gagnes automatiquement', 'L\'ennemi fuit'],
        answer: 1,
        explanation: 'Haute hostilite = ennemi plus agressif. C\'est la consequence directe de la violence. Les actions ont des consequences.'
      }
    }
  },

  {
    id: 'soc-045', type: 'mcq',
    lang: {
      es: {
        q: 'Que final obtiene un jugador que explora todo pero usa violencia en algunos combates?',
        options: ['Final completo', 'Final pacifista', 'Final museo o ecologico', 'Final oscuro'],
        answer: 2,
        explanation: 'Sin pacificar todos los combates no puedes ser completo ni pacifista. Dependiendo de tus acciones, sera museo o ecologico.'
      },
      en: {
        q: 'What ending does a player get who explores everything but uses violence in some combats?',
        options: ['Complete ending', 'Pacifist ending', 'Museum or ecological ending', 'Dark ending'],
        answer: 2,
        explanation: 'Without pacifying all combats you cannot get complete or pacifist. Depending on your actions, it will be museum or ecological.'
      },
      fr: {
        q: 'Quelle fin obtient un joueur qui explore tout mais utilise la violence dans certains combats ?',
        options: ['Fin complete', 'Fin pacifiste', 'Fin musee ou ecologique', 'Fin sombre'],
        answer: 2,
        explanation: 'Sans pacifier tous les combats, pas de fin complete ni pacifiste. Selon tes actions, ce sera musee ou ecologique.'
      }
    }
  },

  {
    id: 'soc-046', type: 'mcq',
    lang: {
      es: {
        q: 'Como el equipo de Luffy en One Piece resuelve problemas a traves de lazos, que recurso usa ArcLycee?',
        options: ['Dinero', 'Companeros que suman fuerza al atacar', 'Nada, vas solo', 'Trucos magicos'],
        answer: 1,
        explanation: 'Tus companeros (Magnoboot +3, Viralata +2, Cemi +4) aportan fuerza extra, pero la verdadera fuerza es la cooperacion.'
      },
      en: {
        q: 'Like Luffy\'s crew in One Piece solving problems through bonds, what resource does ArcLycee use?',
        options: ['Money', 'Companions who add strength when attacking', 'Nothing, you go alone', 'Magic tricks'],
        answer: 1,
        explanation: 'Your companions (Magnoboot +3, Viralata +2, Cemi +4) add extra strength, but the real power is cooperation.'
      },
      fr: {
        q: 'Comme l\'equipage de Luffy dans One Piece resout les problemes par les liens, quelle ressource utilise ArcLycee ?',
        options: ['Argent', 'Compagnons qui ajoutent de la force en attaquant', 'Rien, tu y vas seul', 'Tours de magie'],
        answer: 1,
        explanation: 'Tes compagnons (Magnoboot +3, Viralata +2, Cemi +4) ajoutent de la force, mais le vrai pouvoir est la cooperation.'
      }
    }
  },

  {
    id: 'soc-047', type: 'mcq',
    lang: {
      es: {
        q: 'Que ganas al completar las dos acciones ecologicas en el Santuario del Manati?',
        options: ['Un arma especial', '+10 reputacion por cada accion y completar la mision', 'Solo experiencia', 'Una nueva escena'],
        answer: 1,
        explanation: 'Cada accion ecologica da +10 reputacion y al completar ambas se termina la mision secundaria rescateManati.'
      },
      en: {
        q: 'What do you earn by completing both ecological actions in the Manatee Sanctuary?',
        options: ['A special weapon', '+10 reputation per action and quest completion', 'Just experience', 'A new scene'],
        answer: 1,
        explanation: 'Each ecological action gives +10 reputation and completing both finishes the rescueManatee side quest.'
      },
      fr: {
        q: 'Que gagnes-tu en completant les deux actions ecologiques dans le Sanctuaire du Lamantin ?',
        options: ['Une arme speciale', '+10 reputation par action et completion de la quete', 'Juste de l\'experience', 'Une nouvelle scene'],
        answer: 1,
        explanation: 'Chaque action ecologique donne +10 reputation et completer les deux termine la quete secondaire sauvetageManatin.'
      }
    }
  },

  {
    id: 'soc-048', type: 'mcq',
    lang: {
      es: {
        q: 'Si Dumbledore preferia hablar antes que luchar, que medidor subiria en ArcLycee?',
        options: ['Hostilidad', 'Conviccion', 'Dano', 'Velocidad'],
        answer: 1,
        explanation: 'Dumbledore siempre ofrecio redencion primero. En ArcLycee, el dialogo sube la conviccion, no la hostilidad.'
      },
      en: {
        q: 'If Dumbledore preferred talking to fighting, what meter would rise in ArcLycee?',
        options: ['Hostility', 'Conviction', 'Damage', 'Speed'],
        answer: 1,
        explanation: 'Dumbledore always offered redemption first. In ArcLycee, dialogue raises conviction, not hostility.'
      },
      fr: {
        q: 'Si Dumbledore preferait parler plutot que combattre, quel compteur monterait dans ArcLycee ?',
        options: ['Hostilite', 'Conviction', 'Degats', 'Vitesse'],
        answer: 1,
        explanation: 'Dumbledore offrait toujours la redemption d\'abord. Dans ArcLycee, le dialogue monte la conviction, pas l\'hostilite.'
      }
    }
  },

  {
    id: 'soc-049', type: 'mcq',
    lang: {
      es: {
        q: 'En que ubicacion del juego ocurre el combate legal contra el traficante Torres?',
        options: ['Una cueva', 'El aeropuerto de Punta Cana', 'El museo', 'La playa'],
        answer: 1,
        explanation: 'El Mundo Juridico se situa en el aeropuerto de Punta Cana, donde Torres intenta sacar artefactos del pais.'
      },
      en: {
        q: 'In what game location does the legal combat against trafficker Torres take place?',
        options: ['A cave', 'Punta Cana airport', 'The museum', 'The beach'],
        answer: 1,
        explanation: 'The Legal World is set at Punta Cana airport, where Torres tries to take artifacts out of the country.'
      },
      fr: {
        q: 'Dans quel lieu du jeu se deroule le combat legal contre le trafiquant Torres ?',
        options: ['Une grotte', 'L\'aeroport de Punta Cana', 'Le musee', 'La plage'],
        answer: 1,
        explanation: 'Le Monde Juridique se situe a l\'aeroport de Punta Cana, ou Torres essaie de sortir des artefacts du pays.'
      }
    }
  },

  {
    id: 'soc-050', type: 'mcq',
    lang: {
      es: {
        q: 'Cuantas opciones ecologicas tienes en el combate contra el pez leon?',
        options: ['2', '3', '4', '6'],
        answer: 2,
        explanation: 'Hay 4 opciones: atrapar, pescar con arpon, proteger coral y alertar buzos. Todas son ecologicamente responsables.'
      },
      en: {
        q: 'How many ecological options do you have in the lionfish combat?',
        options: ['2', '3', '4', '6'],
        answer: 2,
        explanation: 'There are 4 options: trapping, spearfishing, protecting coral, and alerting divers. All are ecologically responsible.'
      },
      fr: {
        q: 'Combien d\'options ecologiques as-tu dans le combat contre le poisson-lion ?',
        options: ['2', '3', '4', '6'],
        answer: 2,
        explanation: 'Il y a 4 options : pieger, pecher au harpon, proteger le corail et alerter les plongeurs. Toutes sont ecologiquement responsables.'
      }
    }
  },

  // ===== FILL IN THE BLANK (soc-051 a soc-075) =====

  {
    id: 'soc-051', type: 'fill',
    lang: {
      es: {
        q: 'El medidor de _______ debe llegar a 100% para ganar un combate sin violencia.',
        answer: 'conviccion',
        explanation: 'La conviccion mide cuanto has persuadido al oponente. 100% = victoria pacifica total.'
      },
      en: {
        q: 'The _______ meter must reach 100% to win a combat without violence.',
        answer: 'conviction',
        explanation: 'Conviction measures how much you have persuaded the opponent. 100% = total peaceful victory.'
      },
      fr: {
        q: 'Le compteur de _______ doit atteindre 100% pour gagner un combat sans violence.',
        answer: 'conviction',
        explanation: 'La conviction mesure combien tu as persuade l\'adversaire. 100% = victoire pacifique totale.'
      }
    }
  },

  {
    id: 'soc-052', type: 'fill',
    lang: {
      es: {
        q: 'Las victorias pacificas dan +_______ de reputacion, tres veces mas que las violentas.',
        answer: '15',
        explanation: 'Pacifica = +15, violenta = +5. El juego recompensa claramente la diplomacia sobre la fuerza.'
      },
      en: {
        q: 'Peaceful victories give +_______ reputation, three times more than violent ones.',
        answer: '15',
        explanation: 'Peaceful = +15, violent = +5. The game clearly rewards diplomacy over force.'
      },
      fr: {
        q: 'Les victoires pacifiques donnent +_______ de reputation, trois fois plus que les violentes.',
        answer: '15',
        explanation: 'Pacifique = +15, violente = +5. Le jeu recompense clairement la diplomatie plutot que la force.'
      }
    }
  },

  {
    id: 'soc-053', type: 'fill',
    lang: {
      es: {
        q: 'La Ley _______-68 de la Republica Dominicana protege el patrimonio cultural.',
        answer: '318',
        explanation: 'La Ley 318-68 es la principal herramienta legal dominicana para proteger bienes culturales.'
      },
      en: {
        q: 'Law _______-68 of the Dominican Republic protects cultural heritage.',
        answer: '318',
        explanation: 'Law 318-68 is the main Dominican legal tool to protect cultural property.'
      },
      fr: {
        q: 'La Loi _______-68 de la Republique dominicaine protege le patrimoine culturel.',
        answer: '318',
        explanation: 'La Loi 318-68 est le principal outil juridique dominicain pour proteger les biens culturels.'
      }
    }
  },

  {
    id: 'soc-054', type: 'fill',
    lang: {
      es: {
        q: 'La Convencion UNESCO de _______ combate el trafico ilicito de bienes culturales.',
        answer: '1970',
        explanation: 'La Convencion de 1970 es un hito internacional en la proteccion del patrimonio de la humanidad.'
      },
      en: {
        q: 'The UNESCO Convention of _______ combats the illicit trafficking of cultural property.',
        answer: '1970',
        explanation: 'The 1970 Convention is an international milestone in protecting humanity\'s heritage.'
      },
      fr: {
        q: 'La Convention UNESCO de _______ combat le trafic illicite de biens culturels.',
        answer: '1970',
        explanation: 'La Convention de 1970 est un jalon international dans la protection du patrimoine de l\'humanite.'
      }
    }
  },

  {
    id: 'soc-055', type: 'fill',
    lang: {
      es: {
        q: 'ArcLycee tiene _______ finales diferentes segun las decisiones del jugador.',
        answer: '5',
        explanation: 'Los 5 finales son: completo, pacifista, museo, ecologico y oscuro. Tus elecciones moldean la historia.'
      },
      en: {
        q: 'ArcLycee has _______ different endings depending on the player\'s decisions.',
        answer: '5',
        explanation: 'The 5 endings are: complete, pacifist, museum, ecological, and dark. Your choices shape the story.'
      },
      fr: {
        q: 'ArcLycee a _______ fins differentes selon les decisions du joueur.',
        answer: '5',
        explanation: 'Les 5 fins sont : complete, pacifiste, musee, ecologique et sombre. Tes choix faconnent l\'histoire.'
      }
    }
  },

  {
    id: 'soc-056', type: 'fill',
    lang: {
      es: {
        q: 'Contra el Constructor Mendez, puedes formar una cadena _______ para proteger el patrimonio.',
        answer: 'humana',
        explanation: 'La cadena humana es una forma clasica de protesta no violenta. Cuerpos unidos como escudo pacifico.'
      },
      en: {
        q: 'Against Builder Mendez, you can form a human _______ to protect heritage.',
        answer: 'chain',
        explanation: 'The human chain is a classic form of nonviolent protest. Bodies united as a peaceful shield.'
      },
      fr: {
        q: 'Contre le Constructeur Mendez, on peut former une chaine _______ pour proteger le patrimoine.',
        answer: 'humaine',
        explanation: 'La chaine humaine est une forme classique de protestation non violente. Des corps unis comme bouclier pacifique.'
      }
    }
  },

  {
    id: 'soc-057', type: 'fill',
    lang: {
      es: {
        q: 'En el combate contra el pez leon, el medidor se llama "_______:" en vez de "Convencido:".',
        answer: 'Controlado',
        explanation: 'No convences a un pez, lo controlas ecologicamente. El nombre del medidor refleja la realidad de la situacion.'
      },
      en: {
        q: 'In the lionfish combat, the meter is called "_______:" instead of "Convinced:".',
        answer: 'Controlled',
        explanation: 'You do not convince a fish, you ecologically control it. The meter name reflects the reality of the situation.'
      },
      fr: {
        q: 'Dans le combat du poisson-lion, le compteur s\'appelle "_______ :" au lieu de "Convaincu :".',
        answer: 'Controle',
        explanation: 'On ne convainc pas un poisson, on le controle ecologiquement. Le nom du compteur reflete la realite de la situation.'
      }
    }
  },

  {
    id: 'soc-058', type: 'fill',
    lang: {
      es: {
        q: 'La organizacion internacional _______ ayuda a perseguir traficantes de artefactos culturales entre paises.',
        answer: 'INTERPOL',
        explanation: 'INTERPOL coordina policias de 195 paises. Su unidad de obras de arte combate el trafico cultural globalmente.'
      },
      en: {
        q: 'The international organization _______ helps pursue cultural artifact traffickers across countries.',
        answer: 'INTERPOL',
        explanation: 'INTERPOL coordinates police from 195 countries. Its works of art unit combats cultural trafficking globally.'
      },
      fr: {
        q: 'L\'organisation internationale _______ aide a poursuivre les trafiquants d\'artefacts culturels entre pays.',
        answer: 'INTERPOL',
        explanation: 'INTERPOL coordonne les polices de 195 pays. Son unite d\'oeuvres d\'art combat le trafic culturel mondialement.'
      }
    }
  },

  {
    id: 'soc-059', type: 'fill',
    lang: {
      es: {
        q: 'En ArcLycee, liberar al _______ y limpiar el arrecife completan la mision ecologica del Santuario.',
        answer: 'manati',
        explanation: 'El manati (Trichechus manatus) es una especie en peligro del Caribe. Rescatarlo es accion ecologica directa.'
      },
      en: {
        q: 'In ArcLycee, freeing the _______ and cleaning the reef complete the Sanctuary\'s ecological mission.',
        answer: 'manatee',
        explanation: 'The manatee (Trichechus manatus) is an endangered Caribbean species. Rescuing it is direct ecological action.'
      },
      fr: {
        q: 'Dans ArcLycee, liberer le _______ et nettoyer le recif completent la mission ecologique du Sanctuaire.',
        answer: 'lamantin',
        explanation: 'Le lamantin (Trichechus manatus) est une espece en danger des Caraibes. Le sauver est une action ecologique directe.'
      }
    }
  },

  {
    id: 'soc-060', type: 'fill',
    lang: {
      es: {
        q: 'Las victorias violentas solo dan +_______ de reputacion, comparado con +15 de las pacificas.',
        answer: '5',
        explanation: 'La diferencia de 10 puntos es el precio de la violencia. El juego penaliza sutilmente las soluciones agresivas.'
      },
      en: {
        q: 'Violent victories only give +_______ reputation, compared to +15 for peaceful ones.',
        answer: '5',
        explanation: 'The 10-point difference is the price of violence. The game subtly penalizes aggressive solutions.'
      },
      fr: {
        q: 'Les victoires violentes ne donnent que +_______ de reputation, contre +15 pour les pacifiques.',
        answer: '5',
        explanation: 'La difference de 10 points est le prix de la violence. Le jeu penalise subtilement les solutions agressives.'
      }
    }
  },

  {
    id: 'soc-061', type: 'fill',
    lang: {
      es: {
        q: 'En el duelo contra el Soldado Diego, la opcion de _______ cuenta como victoria pacifista sin pelear.',
        answer: 'huir',
        explanation: 'A veces la verdadera valentia es evitar el conflicto. Como dijo Sun Tzu: la batalla suprema es la que no se libra.'
      },
      en: {
        q: 'In the duel against Soldier Diego, the option to _______ counts as a pacifist victory without fighting.',
        answer: 'flee',
        explanation: 'Sometimes true bravery is avoiding conflict. As Sun Tzu said: the supreme battle is the one not fought.'
      },
      fr: {
        q: 'Dans le duel contre le Soldat Diego, l\'option de _______ compte comme victoire pacifiste sans combattre.',
        answer: 'fuir',
        explanation: 'Parfois le vrai courage est d\'eviter le conflit. Comme disait Sun Tzu : la bataille supreme est celle qu\'on ne livre pas.'
      }
    }
  },

  {
    id: 'soc-062', type: 'fill',
    lang: {
      es: {
        q: 'Contra el traficante Torres, el medidor se llama "_______:" porque es un caso juridico.',
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
        explanation: 'On ne convainc pas Torres avec de belles paroles, mais avec des preuves legales irrefutables. La justice exige des faits.'
      }
    }
  },

  {
    id: 'soc-063', type: 'fill',
    lang: {
      es: {
        q: 'El pez _______ es una especie invasora del Caribe que el juego te ensena a controlar ecologicamente.',
        answer: 'leon',
        explanation: 'El pez leon (Pterois) invadio el Caribe desde el Pacifico. Controlarlo es vital para los arrecifes locales.'
      },
      en: {
        q: 'The _______ fish is an invasive Caribbean species that the game teaches you to control ecologically.',
        answer: 'lion',
        explanation: 'The lionfish (Pterois) invaded the Caribbean from the Pacific. Controlling it is vital for local reefs.'
      },
      fr: {
        q: 'Le poisson-_______ est une espece invasive des Caraibes que le jeu t\'apprend a controler ecologiquement.',
        answer: 'lion',
        explanation: 'Le poisson-lion (Pterois) a envahi les Caraibes depuis le Pacifique. Le controler est vital pour les recifs locaux.'
      }
    }
  },

  {
    id: 'soc-064', type: 'fill',
    lang: {
      es: {
        q: 'El final _______ se obtiene cuando el jugador tiene 8+ nodos, 5 sidequests y todos los combates pacificados.',
        answer: 'completo',
        explanation: 'El final completo es el logro maximo: exploraste todo, ayudaste a todos y nunca usaste violencia innecesaria.'
      },
      en: {
        q: 'The _______ ending is obtained when the player has 8+ nodes, 5 side quests, and all combats pacified.',
        answer: 'complete',
        explanation: 'The complete ending is the ultimate achievement: you explored everything, helped everyone, and never used unnecessary violence.'
      },
      fr: {
        q: 'La fin _______ s\'obtient quand le joueur a 8+ noeuds, 5 quetes secondaires et tous les combats pacifies.',
        answer: 'complete',
        explanation: 'La fin complete est l\'accomplissement ultime : tu as tout explore, aide tout le monde et jamais utilise de violence inutile.'
      }
    }
  },

  {
    id: 'soc-065', type: 'fill',
    lang: {
      es: {
        q: 'Llamar a la _______ es una de las opciones civicas contra el Constructor Mendez para exponer la destruccion.',
        answer: 'prensa',
        explanation: 'La prensa libre es un pilar de la democracia. Exponer injusticias publicamente genera presion social para el cambio.'
      },
      en: {
        q: 'Calling the _______ is one of the civic options against Builder Mendez to expose the destruction.',
        answer: 'press',
        explanation: 'A free press is a pillar of democracy. Publicly exposing injustice generates social pressure for change.'
      },
      fr: {
        q: 'Appeler la _______ est l\'une des options civiques contre le Constructeur Mendez pour exposer la destruction.',
        answer: 'presse',
        explanation: 'La presse libre est un pilier de la democratie. Exposer publiquement les injustices genere une pression sociale pour le changement.'
      }
    }
  },

  {
    id: 'soc-066', type: 'fill',
    lang: {
      es: {
        q: 'Cuando la _______ del enemigo sube, el combate se vuelve mas peligroso. Es mejor mantenerla baja.',
        answer: 'hostilidad',
        explanation: 'La hostilidad es lo opuesto a la conviccion. Sube con violencia y hace al enemigo mas agresivo. Evitala.'
      },
      en: {
        q: 'When the enemy\'s _______ rises, combat becomes more dangerous. It is better to keep it low.',
        answer: 'hostility',
        explanation: 'Hostility is the opposite of conviction. It rises with violence and makes the enemy more aggressive. Avoid it.'
      },
      fr: {
        q: 'Quand l\'_______ de l\'ennemi monte, le combat devient plus dangereux. Mieux vaut la garder basse.',
        answer: 'hostilite',
        explanation: 'L\'hostilite est l\'oppose de la conviction. Elle monte avec la violence et rend l\'ennemi plus agressif. Evite-la.'
      }
    }
  },

  {
    id: 'soc-067', type: 'fill',
    lang: {
      es: {
        q: 'El arresto de Torres es _______, con agentes caminando hacia el y escoltandolo fuera.',
        answer: 'cinematografico',
        explanation: 'La escena del arresto es una recompensa narrativa: ves la justicia en accion, paso a paso, como en una pelicula.'
      },
      en: {
        q: 'Torres\'s arrest is _______, with agents walking toward him and escorting him out.',
        answer: 'cinematic',
        explanation: 'The arrest scene is a narrative reward: you see justice in action, step by step, like in a movie.'
      },
      fr: {
        q: 'L\'arrestation de Torres est _______, avec des agents marchant vers lui et l\'escortant dehors.',
        answer: 'cinematographique',
        explanation: 'La scene d\'arrestation est une recompense narrative : on voit la justice en action, pas a pas, comme dans un film.'
      }
    }
  },

  {
    id: 'soc-068', type: 'fill',
    lang: {
      es: {
        q: 'Las acciones _______ (como rescatar manaties) cuentan para determinar tu final en el juego.',
        answer: 'ecologicas',
        explanation: 'El juego rastrea tus acciones ecologicas. Suficientes de ellas pueden llevarte al final ecologico.'
      },
      en: {
        q: '_______ actions (like rescuing manatees) count toward determining your ending in the game.',
        answer: 'Ecological',
        explanation: 'The game tracks your ecological actions. Enough of them can lead you to the ecological ending.'
      },
      fr: {
        q: 'Les actions _______ (comme sauver des lamantins) comptent pour determiner ta fin dans le jeu.',
        answer: 'ecologiques',
        explanation: 'Le jeu suit tes actions ecologiques. Assez d\'entre elles peuvent mener a la fin ecologique.'
      }
    }
  },

  {
    id: 'soc-069', type: 'fill',
    lang: {
      es: {
        q: 'En el combate ciudadano, los carteles de _______ son una herramienta de activismo pacifico.',
        answer: 'protesta',
        explanation: 'Los carteles de protesta son libertad de expresion en accion. Una forma legal y efectiva de defender tus derechos.'
      },
      en: {
        q: 'In citizen combat, _______ signs are a tool for peaceful activism.',
        answer: 'protest',
        explanation: 'Protest signs are freedom of expression in action. A legal and effective way to defend your rights.'
      },
      fr: {
        q: 'Dans le combat citoyen, les pancartes de _______ sont un outil d\'activisme pacifique.',
        answer: 'protestation',
        explanation: 'Les pancartes de protestation sont la liberte d\'expression en action. Un moyen legal et efficace de defendre tes droits.'
      }
    }
  },

  {
    id: 'soc-070', type: 'fill',
    lang: {
      es: {
        q: 'La _______ forense es una de las 4 armas legales contra el traficante Torres.',
        answer: 'evidencia',
        explanation: 'La evidencia forense (analisis cientifico de artefactos) prueba el origen y la autenticidad. Ciencia al servicio de la justicia.'
      },
      en: {
        q: 'Forensic _______ is one of the 4 legal weapons against trafficker Torres.',
        answer: 'evidence',
        explanation: 'Forensic evidence (scientific analysis of artifacts) proves origin and authenticity. Science serving justice.'
      },
      fr: {
        q: 'La _______ medico-legale est l\'une des 4 armes legales contre le trafiquant Torres.',
        answer: 'preuve',
        explanation: 'La preuve medico-legale (analyse scientifique des artefacts) prouve l\'origine et l\'authenticite. La science au service de la justice.'
      }
    }
  },

  {
    id: 'soc-071', type: 'fill',
    lang: {
      es: {
        q: 'El juego rastrea combates _______ versus combates violentos para calcular tu final.',
        answer: 'pacificados',
        explanation: 'Cada combate se clasifica como pacificado o violento. Tu historial completo determina que final obtienes.'
      },
      en: {
        q: 'The game tracks _______ combats versus violent combats to calculate your ending.',
        answer: 'pacified',
        explanation: 'Each combat is classified as pacified or violent. Your complete record determines which ending you get.'
      },
      fr: {
        q: 'Le jeu suit les combats _______ versus les combats violents pour calculer ta fin.',
        answer: 'pacifies',
        explanation: 'Chaque combat est classe comme pacifie ou violent. Ton historique complet determine quelle fin tu obtiens.'
      }
    }
  },

  {
    id: 'soc-072', type: 'fill',
    lang: {
      es: {
        q: 'Alertar a los _______ sobre el pez leon es la opcion ecologica con mayor impacto a largo plazo.',
        answer: 'buzos',
        explanation: 'Informar a buzos crea una red de vigilancia. Un solo pez controlado ayuda; una comunidad informada transforma.'
      },
      en: {
        q: 'Alerting _______ about the lionfish is the ecological option with the greatest long-term impact.',
        answer: 'divers',
        explanation: 'Informing divers creates a monitoring network. One controlled fish helps; an informed community transforms.'
      },
      fr: {
        q: 'Alerter les _______ sur le poisson-lion est l\'option ecologique avec le plus grand impact a long terme.',
        answer: 'plongeurs',
        explanation: 'Informer les plongeurs cree un reseau de surveillance. Un poisson controle aide ; une communaute informee transforme.'
      }
    }
  },

  {
    id: 'soc-073', type: 'fill',
    lang: {
      es: {
        q: 'Contra el Soldado Diego, hablar sube la _______ hasta 100%, lo que equivale a una victoria sin espadas.',
        answer: 'conviccion',
        explanation: 'Las palabras pueden ser tan afiladas como una espada, pero no hieren. La conviccion es tu arma pacifica.'
      },
      en: {
        q: 'Against Soldier Diego, talking raises _______ to 100%, which equals a victory without swords.',
        answer: 'conviction',
        explanation: 'Words can be as sharp as a sword, but they do not wound. Conviction is your peaceful weapon.'
      },
      fr: {
        q: 'Contre le Soldat Diego, parler monte la _______ a 100%, ce qui equivaut a une victoire sans epees.',
        answer: 'conviction',
        explanation: 'Les mots peuvent etre aussi tranchants qu\'une epee, mais ils ne blessent pas. La conviction est ton arme pacifique.'
      }
    }
  },

  {
    id: 'soc-074', type: 'fill',
    lang: {
      es: {
        q: 'La accion _______ contra Mendez consiste en iniciar un proceso judicial para detener la construccion.',
        answer: 'legal',
        explanation: 'La accion legal usa el sistema de justicia para proteger el patrimonio. Las leyes existen para ser aplicadas.'
      },
      en: {
        q: '_______ action against Mendez involves starting a judicial process to stop the construction.',
        answer: 'Legal',
        explanation: 'Legal action uses the justice system to protect heritage. Laws exist to be enforced.'
      },
      fr: {
        q: 'L\'action _______ contre Mendez consiste a entamer un processus judiciaire pour arreter la construction.',
        answer: 'legale',
        explanation: 'L\'action legale utilise le systeme de justice pour proteger le patrimoine. Les lois existent pour etre appliquees.'
      }
    }
  },

  {
    id: 'soc-075', type: 'fill',
    lang: {
      es: {
        q: 'El sistema de _______ del juego mide como te perciben los personajes segun tus decisiones.',
        answer: 'reputacion',
        explanation: 'Tu reputacion refleja tus acciones acumuladas. Como en la vida real, se construye con cada decision.'
      },
      en: {
        q: 'The game\'s _______ system measures how characters perceive you based on your decisions.',
        answer: 'reputation',
        explanation: 'Your reputation reflects your accumulated actions. Like in real life, it is built with every decision.'
      },
      fr: {
        q: 'Le systeme de _______ du jeu mesure comment les personnages te percoivent selon tes decisions.',
        answer: 'reputation',
        explanation: 'Ta reputation reflete tes actions accumulees. Comme dans la vie reelle, elle se construit a chaque decision.'
      }
    }
  },

  // ===== MATCH (soc-076 a soc-100) =====

  {
    id: 'soc-076', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada combate con su tipo de resolucion pacifica:',
        pairs: [
          ['Constructor Mendez', 'Protesta civica (carteles, prensa, cadena humana)'],
          ['Pez leon', 'Control ecologico (trampa, pesca, proteccion)'],
          ['Traficante Torres', 'Evidencia legal (Ley 318, INTERPOL, UNESCO)'],
          ['Soldado Diego', 'Dialogo y conviccion (hablar, negociar, huir)']
        ],
        explanation: 'Cada conflicto tiene sus propias herramientas pacificas. No hay una solucion unica para todo.'
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
        q: 'Associe chaque combat avec son type de resolution pacifique :',
        pairs: [
          ['Constructeur Mendez', 'Protestation civique (pancartes, presse, chaine humaine)'],
          ['Poisson-lion', 'Controle ecologique (piegeage, peche, protection)'],
          ['Trafiquant Torres', 'Preuve legale (Loi 318, INTERPOL, UNESCO)'],
          ['Soldat Diego', 'Dialogue et conviction (parler, negocier, fuir)']
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
          ['Final ecologico', 'Muchas acciones ecologicas']
        ],
        explanation: 'Cada final es un espejo de tu estilo de juego. El juego no juzga, pero si refleja tus decisiones.'
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
          ['Fin complete', '8+ noeuds, 5 quetes secondaires, tous pacifies'],
          ['Fin pacifiste', '8+ noeuds, tous pacifies'],
          ['Fin sombre', 'Majorite de combats violents'],
          ['Fin ecologique', 'Beaucoup d\'actions ecologiques']
        ],
        explanation: 'Chaque fin est un miroir de ton style de jeu. Le jeu ne juge pas, mais il reflete tes decisions.'
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
          ['UNESCO 1970', 'Combate el trafico internacional de bienes culturales'],
          ['INTERPOL', 'Coordina policias de 195 paises contra el trafico'],
          ['Evidencia forense', 'Prueba cientificamente el origen de artefactos']
        ],
        explanation: 'Estas cuatro herramientas juntas forman un escudo legal casi impenetrable contra el trafico.'
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
        q: 'Associe chaque outil legal avec ce qu\'il fait :',
        pairs: [
          ['Loi 318-68', 'Protege le patrimoine culturel dominicain'],
          ['UNESCO 1970', 'Combat le trafic international de biens culturels'],
          ['INTERPOL', 'Coordonne les polices de 195 pays contre le trafic'],
          ['Preuve medico-legale', 'Prouve scientifiquement l\'origine des artefacts']
        ],
        explanation: 'Ces quatre outils ensemble forment un bouclier legal quasi impenetrable contre le trafic.'
      }
    }
  },

  {
    id: 'soc-079', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada medidor del combate con su funcion:',
        pairs: [
          ['Conviccion', 'Mide cuanto has persuadido al oponente'],
          ['Hostilidad', 'Mide cuanto se ha enfurecido el oponente'],
          ['HP del jugador', 'Tu salud, baja con ataques enemigos'],
          ['Reputacion', 'Como te perciben todos en el juego']
        ],
        explanation: 'Conviccion y hostilidad son los dos lados de la misma moneda. Tus acciones determinan cual sube.'
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
          ['Conviction', 'Mesure combien tu as persuade l\'adversaire'],
          ['Hostilite', 'Mesure combien l\'adversaire s\'est enrage'],
          ['PV du joueur', 'Ta sante, diminue avec les attaques ennemies'],
          ['Reputation', 'Comment tout le monde dans le jeu te percoit']
        ],
        explanation: 'Conviction et hostilite sont les deux faces de la meme piece. Tes actions determinent laquelle monte.'
      }
    }
  },

  {
    id: 'soc-080', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada opcion contra el pez leon con su accion:',
        pairs: [
          ['Atrapar', 'Capturar vivo con trampa ecologica'],
          ['Pescar con arpon', 'Pesca controlada de especie invasora'],
          ['Proteger coral', 'Defender el ecosistema de arrecife'],
          ['Alertar buzos', 'Crear conciencia colectiva sobre la invasion']
        ],
        explanation: 'Las 4 opciones atacan el problema desde angulos diferentes: captura, pesca, defensa y educacion.'
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
          ['Pieger', 'Capturer vivant avec un piege ecologique'],
          ['Pecher au harpon', 'Peche controlee d\'espece invasive'],
          ['Proteger le corail', 'Defendre l\'ecosysteme de recif'],
          ['Alerter les plongeurs', 'Creer une conscience collective sur l\'invasion']
        ],
        explanation: 'Les 4 options attaquent le probleme sous differents angles : capture, peche, defense et education.'
      }
    }
  },

  {
    id: 'soc-081', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada personaje de ficcion con el principio que comparten con ArcLycee:',
        pairs: [
          ['Frisk (Undertale)', 'Ganar sin hacer dano a nadie'],
          ['Batman', 'Regla de no matar, justicia con principios'],
          ['Captain America', 'Diplomacia antes que fuerza'],
          ['Dumbledore', 'Ofrecer redencion y dialogo primero']
        ],
        explanation: 'Estos heroes demuestran que la fuerza moral supera la fuerza fisica. ArcLycee aplica esa misma filosofia.'
      },
      en: {
        q: 'Match each fictional character with the principle they share with ArcLycee:',
        pairs: [
          ['Frisk (Undertale)', 'Winning without hurting anyone'],
          ['Batman', 'No-kill rule, justice with principles'],
          ['Captain America', 'Diplomacy before force'],
          ['Dumbledore', 'Offering redemption and dialogue first']
        ],
        explanation: 'These heroes show that moral strength surpasses physical force. ArcLycee applies that same philosophy.'
      },
      fr: {
        q: 'Associe chaque personnage de fiction avec le principe qu\'ils partagent avec ArcLycee :',
        pairs: [
          ['Frisk (Undertale)', 'Gagner sans faire de mal a personne'],
          ['Batman', 'Regle de ne pas tuer, justice avec principes'],
          ['Captain America', 'Diplomatie avant la force'],
          ['Dumbledore', 'Offrir la redemption et le dialogue d\'abord']
        ],
        explanation: 'Ces heros montrent que la force morale surpasse la force physique. ArcLycee applique cette meme philosophie.'
      }
    }
  },

  {
    id: 'soc-082', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada opcion contra el Constructor Mendez con su tipo de accion:',
        pairs: [
          ['Carteles de protesta', 'Libertad de expresion'],
          ['Llamar a la prensa', 'Activismo mediatico'],
          ['Accion legal', 'Sistema judicial'],
          ['Cadena humana', 'Desobediencia civil no violenta']
        ],
        explanation: 'Cuatro pilares de la democracia participativa: expresion, prensa, justicia y accion directa pacifica.'
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
          ['Pancartes de protestation', 'Liberte d\'expression'],
          ['Appeler la presse', 'Activisme mediatique'],
          ['Action legale', 'Systeme judiciaire'],
          ['Chaine humaine', 'Desobeissance civile non violente']
        ],
        explanation: 'Quatre piliers de la democratie participative : expression, presse, justice et action directe pacifique.'
      }
    }
  },

  {
    id: 'soc-083', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada tipo de victoria con su recompensa de reputacion:',
        pairs: [
          ['Victoria pacifica', '+15 reputacion'],
          ['Victoria violenta', '+5 reputacion'],
          ['Accion ecologica (manati)', '+10 reputacion'],
          ['Huir del duelo (Diego)', 'Victoria pacifista sin combate']
        ],
        explanation: 'El juego asigna valor a cada tipo de resolucion. La paz siempre paga mas que la guerra.'
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
        q: 'Associe chaque type de victoire avec sa recompense de reputation :',
        pairs: [
          ['Victoire pacifique', '+15 reputation'],
          ['Victoire violente', '+5 reputation'],
          ['Action ecologique (lamantin)', '+10 reputation'],
          ['Fuir le duel (Diego)', 'Victoire pacifiste sans combat']
        ],
        explanation: 'Le jeu attribue une valeur a chaque type de resolution. La paix paie toujours plus que la guerre.'
      }
    }
  },

  {
    id: 'soc-084', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada accion ecologica del Santuario con su impacto:',
        pairs: [
          ['Liberar al manati', 'Salvar una especie en peligro directamente'],
          ['Limpiar el arrecife', 'Restaurar un ecosistema marino danado'],
          ['Completar ambas', 'Terminar la mision rescateManati'],
          ['Cada accion individual', '+10 reputacion al progreso']
        ],
        explanation: 'Cada accion ecologica tiene impacto individual y colectivo. Juntas, completan algo mas grande.'
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
        q: 'Associe chaque action ecologique du Sanctuaire avec son impact :',
        pairs: [
          ['Liberer le lamantin', 'Sauver directement une espece en danger'],
          ['Nettoyer le recif', 'Restaurer un ecosysteme marin endommage'],
          ['Completer les deux', 'Terminer la quete sauvetageManatin'],
          ['Chaque action individuelle', '+10 reputation au progres']
        ],
        explanation: 'Chaque action ecologique a un impact individuel et collectif. Ensemble, elles completent quelque chose de plus grand.'
      }
    }
  },

  {
    id: 'soc-085', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada opcion del duelo de Diego con su resultado:',
        pairs: [
          ['Atacar', 'Modo agresivo, combate de espadas'],
          ['Hablar', 'Modo pacifista, sube conviccion'],
          ['Negociar', 'Modo pacifista, sube conviccion'],
          ['Huir', 'Victoria pacifista inmediata, sin pelea']
        ],
        explanation: '3 de 4 opciones son pacificas. El juego te da muchas mas oportunidades de paz que de guerra.'
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
        q: 'Associe chaque option du duel de Diego avec son resultat :',
        pairs: [
          ['Attaquer', 'Mode agressif, combat d\'epees'],
          ['Parler', 'Mode pacifiste, monte la conviction'],
          ['Negocier', 'Mode pacifiste, monte la conviction'],
          ['Fuir', 'Victoire pacifiste immediate, sans combat']
        ],
        explanation: '3 sur 4 options sont pacifiques. Le jeu donne bien plus d\'opportunites de paix que de guerre.'
      }
    }
  },

  {
    id: 'soc-086', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada concepto del juego con su equivalente en la vida real:',
        pairs: [
          ['Medidor de conviccion', 'Persuasion y argumentacion logica'],
          ['Medidor de hostilidad', 'Escalada de conflicto por agresion'],
          ['Reputacion', 'Como te percibe tu comunidad'],
          ['Multiples finales', 'Las consecuencias de tus decisiones']
        ],
        explanation: 'ArcLycee simula dinamicas sociales reales. Lo que aprendes en el juego aplica a la vida.'
      },
      en: {
        q: 'Match each game concept with its real-life equivalent:',
        pairs: [
          ['Conviction meter', 'Persuasion and logical argumentation'],
          ['Hostility meter', 'Conflict escalation through aggression'],
          ['Reputation', 'How your community perceives you'],
          ['Multiple endings', 'The consequences of your decisions']
        ],
        explanation: 'ArcLycee simulates real social dynamics. What you learn in the game applies to life.'
      },
      fr: {
        q: 'Associe chaque concept du jeu avec son equivalent dans la vie reelle :',
        pairs: [
          ['Compteur de conviction', 'Persuasion et argumentation logique'],
          ['Compteur d\'hostilite', 'Escalade du conflit par l\'agression'],
          ['Reputation', 'Comment ta communaute te percoit'],
          ['Fins multiples', 'Les consequences de tes decisions']
        ],
        explanation: 'ArcLycee simule des dynamiques sociales reelles. Ce que tu apprends dans le jeu s\'applique a la vie.'
      }
    }
  },

  {
    id: 'soc-087', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada etiqueta especial de combate con su enemigo:',
        pairs: [
          ['Convencido:', 'Combates estandar (Mendez, soldados)'],
          ['Controlado:', 'Pez leon (control ecologico)'],
          ['Evidencia:', 'Traficante Torres (caso legal)'],
          ['Conviccion en duelo', 'Soldado Diego (dialogo)']
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
        q: 'Associe chaque etiquette speciale de combat avec son ennemi :',
        pairs: [
          ['Convaincu :', 'Combats standard (Mendez, soldats)'],
          ['Controle :', 'Poisson-lion (controle ecologique)'],
          ['Preuve :', 'Trafiquant Torres (cas legal)'],
          ['Conviction en duel', 'Soldat Diego (dialogue)']
        ],
        explanation: 'Chaque compteur a un nom refletant la nature du conflit. Tous les problemes ne se resolvent pas de la meme facon.'
      }
    }
  },

  {
    id: 'soc-088', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada referencia de cultura pop con su leccion en ArcLycee:',
        pairs: [
          ['Undertale (Frisk)', 'Puedes ganar cualquier batalla sin violencia'],
          ['Gravity Falls (Dipper)', 'La informacion y las pistas resuelven misterios'],
          ['One Piece (Luffy)', 'Los lazos y la cooperacion son la verdadera fuerza'],
          ['Adventure Time (Finn)', 'Los dilemas morales no tienen respuestas faciles']
        ],
        explanation: 'La cultura pop nos ensena valores constantemente. ArcLycee los convierte en mecanicas jugables.'
      },
      en: {
        q: 'Match each pop culture reference with its lesson in ArcLycee:',
        pairs: [
          ['Undertale (Frisk)', 'You can win any battle without violence'],
          ['Gravity Falls (Dipper)', 'Information and clues solve mysteries'],
          ['One Piece (Luffy)', 'Bonds and cooperation are the true strength'],
          ['Adventure Time (Finn)', 'Moral dilemmas do not have easy answers']
        ],
        explanation: 'Pop culture constantly teaches us values. ArcLycee turns them into playable mechanics.'
      },
      fr: {
        q: 'Associe chaque reference de culture pop avec sa lecon dans ArcLycee :',
        pairs: [
          ['Undertale (Frisk)', 'On peut gagner n\'importe quelle bataille sans violence'],
          ['Gravity Falls (Dipper)', 'L\'information et les indices resolvent les mysteres'],
          ['One Piece (Luffy)', 'Les liens et la cooperation sont la vraie force'],
          ['Adventure Time (Finn)', 'Les dilemmes moraux n\'ont pas de reponses faciles']
        ],
        explanation: 'La culture pop nous enseigne constamment des valeurs. ArcLycee les transforme en mecaniques jouables.'
      }
    }
  },

  {
    id: 'soc-089', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada companero con el bonus de ataque que aporta:',
        pairs: [
          ['Magnoboot', '+3 de dano en ataque conjunto'],
          ['Viralata', '+2 de dano en ataque conjunto'],
          ['Cemi', '+4 de dano en ataque conjunto'],
          ['Solo (sin companero)', 'Dano base sin bonus']
        ],
        explanation: 'Tus companeros multiplican tu fuerza, pero recuerda: la conviccion sigue siendo mas poderosa que el dano.'
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
          ['Magnoboot', '+3 de degats en attaque conjointe'],
          ['Viralata', '+2 de degats en attaque conjointe'],
          ['Cemi', '+4 de degats en attaque conjointe'],
          ['Seul (sans compagnon)', 'Degats de base sans bonus']
        ],
        explanation: 'Tes compagnons multiplient ta force, mais rappelle-toi : la conviction reste plus puissante que les degats.'
      }
    }
  },

  {
    id: 'soc-090', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada escenario de combate con su ubicacion en el juego:',
        pairs: [
          ['Duelo de espadas (Diego)', 'La Isabela'],
          ['Combate civico (Mendez)', 'Zona Colonial'],
          ['Combate ecologico (Pez leon)', 'Mundo Acuatico'],
          ['Combate legal (Torres)', 'Aeropuerto de Punta Cana']
        ],
        explanation: 'Cada mundo tiene su propio tipo de conflicto, reflejando problemas reales de cada region.'
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
        q: 'Associe chaque scenario de combat avec sa localisation dans le jeu :',
        pairs: [
          ['Duel d\'epees (Diego)', 'La Isabela'],
          ['Combat civique (Mendez)', 'Zone Coloniale'],
          ['Combat ecologique (Poisson-lion)', 'Monde Aquatique'],
          ['Combat legal (Torres)', 'Aeroport de Punta Cana']
        ],
        explanation: 'Chaque monde a son propre type de conflit, refletant les vrais problemes de chaque region.'
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
          ['Dialogo', 'Lo confrontan verbalmente'],
          ['Escoltando', 'Lo sacan del aeropuerto']
        ],
        explanation: 'El arresto es una secuencia cinematografica: la justicia avanza paso a paso, sin prisa pero sin pausa.'
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
        q: 'Associe chaque phase de l\'arrestation de Torres avec son etat :',
        pairs: [
          ['En attente', 'Les agents se preparent'],
          ['En marche', 'Les agents s\'approchent de Torres'],
          ['Dialogue', 'Ils le confrontent verbalement'],
          ['Escorte', 'Ils le sortent de l\'aeroport']
        ],
        explanation: 'L\'arrestation est une sequence cinematographique : la justice avance pas a pas, lentement mais surement.'
      }
    }
  },

  {
    id: 'soc-092', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada principio social con su mecanica en ArcLycee:',
        pairs: [
          ['Las acciones tienen consecuencias', 'Tracking de combates pacificados vs violentos'],
          ['La cooperacion multiplica la fuerza', 'Companeros con bonus de ataque'],
          ['La informacion es poder', 'Evidencia forense contra Torres'],
          ['La comunidad protege', 'Cadena humana contra Mendez']
        ],
        explanation: 'Cada mecanica del juego enseña un principio social. Aprendes jugando, no leyendo.'
      },
      en: {
        q: 'Match each social principle with its mechanic in ArcLycee:',
        pairs: [
          ['Actions have consequences', 'Tracking pacified vs violent combats'],
          ['Cooperation multiplies strength', 'Companions with attack bonus'],
          ['Information is power', 'Forensic evidence against Torres'],
          ['Community protects', 'Human chain against Mendez']
        ],
        explanation: 'Each game mechanic teaches a social principle. You learn by playing, not by reading.'
      },
      fr: {
        q: 'Associe chaque principe social avec sa mecanique dans ArcLycee :',
        pairs: [
          ['Les actions ont des consequences', 'Suivi des combats pacifies vs violents'],
          ['La cooperation multiplie la force', 'Compagnons avec bonus d\'attaque'],
          ['L\'information est le pouvoir', 'Preuves medico-legales contre Torres'],
          ['La communaute protege', 'Chaine humaine contre Mendez']
        ],
        explanation: 'Chaque mecanique de jeu enseigne un principe social. On apprend en jouant, pas en lisant.'
      }
    }
  },

  {
    id: 'soc-093', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada problema real con el combate del juego que lo representa:',
        pairs: [
          ['Destruccion del patrimonio por construccion', 'Combate contra Constructor Mendez'],
          ['Especies invasoras marinas', 'Combate contra pez leon'],
          ['Trafico internacional de artefactos', 'Combate contra traficante Torres'],
          ['Colonialismo y opresion historica', 'Duelo contra Soldado Diego']
        ],
        explanation: 'Cada combate del juego refleja un problema real. ArcLycee usa la ficcion para enseñar sobre realidades.'
      },
      en: {
        q: 'Match each real-world problem with the game combat that represents it:',
        pairs: [
          ['Heritage destruction by construction', 'Combat against Builder Mendez'],
          ['Invasive marine species', 'Combat against lionfish'],
          ['International artifact trafficking', 'Combat against trafficker Torres'],
          ['Colonialism and historical oppression', 'Duel against Soldier Diego']
        ],
        explanation: 'Each game combat reflects a real problem. ArcLycee uses fiction to teach about realities.'
      },
      fr: {
        q: 'Associe chaque probleme reel avec le combat du jeu qui le represente :',
        pairs: [
          ['Destruction du patrimoine par la construction', 'Combat contre Constructeur Mendez'],
          ['Especes marines invasives', 'Combat contre poisson-lion'],
          ['Trafic international d\'artefacts', 'Combat contre trafiquant Torres'],
          ['Colonialisme et oppression historique', 'Duel contre Soldat Diego']
        ],
        explanation: 'Chaque combat du jeu reflete un vrai probleme. ArcLycee utilise la fiction pour enseigner des realites.'
      }
    }
  },

  {
    id: 'soc-094', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada tipo de inteligencia con su uso en ArcLycee:',
        pairs: [
          ['Inteligencia emocional', 'Dialogar y convencer sin violencia'],
          ['Inteligencia ecologica', 'Rescatar manati, controlar pez leon'],
          ['Inteligencia juridica', 'Usar leyes y evidencia contra el trafico'],
          ['Inteligencia social', 'Movilizar prensa y cadenas humanas']
        ],
        explanation: 'ArcLycee premia multiples formas de inteligencia, no solo la fuerza bruta.'
      },
      en: {
        q: 'Match each type of intelligence with its use in ArcLycee:',
        pairs: [
          ['Emotional intelligence', 'Dialogue and convincing without violence'],
          ['Ecological intelligence', 'Rescuing manatee, controlling lionfish'],
          ['Legal intelligence', 'Using laws and evidence against trafficking'],
          ['Social intelligence', 'Mobilizing press and human chains']
        ],
        explanation: 'ArcLycee rewards multiple forms of intelligence, not just brute force.'
      },
      fr: {
        q: 'Associe chaque type d\'intelligence avec son usage dans ArcLycee :',
        pairs: [
          ['Intelligence emotionnelle', 'Dialoguer et convaincre sans violence'],
          ['Intelligence ecologique', 'Sauver le lamantin, controler le poisson-lion'],
          ['Intelligence juridique', 'Utiliser les lois et preuves contre le trafic'],
          ['Intelligence sociale', 'Mobiliser la presse et les chaines humaines']
        ],
        explanation: 'ArcLycee recompense de multiples formes d\'intelligence, pas seulement la force brute.'
      }
    }
  },

  {
    id: 'soc-095', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada decision del jugador con su impacto en el mundo del juego:',
        pairs: [
          ['Pacificar todos los combates', 'Desbloquea finales completo y pacifista'],
          ['Usar violencia frecuentemente', 'Conduce al final oscuro'],
          ['Completar acciones ecologicas', 'Puede dar el final ecologico'],
          ['Completar 5+ misiones secundarias', 'Requisito para el final completo']
        ],
        explanation: 'Cada decision acumula peso. El juego no olvida ninguna de tus acciones.'
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
        q: 'Associe chaque decision du joueur avec son impact sur le monde du jeu :',
        pairs: [
          ['Pacifier tous les combats', 'Debloque les fins complete et pacifiste'],
          ['Utiliser la violence frequemment', 'Conduit a la fin sombre'],
          ['Completer les actions ecologiques', 'Peut donner la fin ecologique'],
          ['Completer 5+ quetes secondaires', 'Exigence pour la fin complete']
        ],
        explanation: 'Chaque decision accumule du poids. Le jeu n\'oublie aucune de tes actions.'
      }
    }
  },

  {
    id: 'soc-096', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada villano del juego con su motivacion:',
        pairs: [
          ['Constructor Mendez', 'Lucro destruyendo patrimonio historico'],
          ['Pez leon', 'Instinto invasor (no es "malvado", es ecologia)'],
          ['Traficante Torres', 'Vender artefactos culturales ilegalmente'],
          ['Soldado Diego', 'Seguir ordenes coloniales (es complejo, no evil)']
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
          ['Constructeur Mendez', 'Profit en detruisant le patrimoine historique'],
          ['Poisson-lion', 'Instinct invasif (pas "mechant", c\'est l\'ecologie)'],
          ['Trafiquant Torres', 'Vendre des artefacts culturels illegalement'],
          ['Soldat Diego', 'Suivre les ordres coloniaux (complexe, pas mechant)']
        ],
        explanation: 'Tous les antagonistes ne sont pas "mechants". Comprendre leurs motivations aide a trouver des solutions reelles.'
      }
    }
  },

  {
    id: 'soc-097', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada habilidad social con donde se practica en el juego:',
        pairs: [
          ['Negociacion', 'Duelo con Diego (opcion Negociar)'],
          ['Activismo civico', 'Protesta contra Mendez'],
          ['Pensamiento critico', 'Reunir evidencia contra Torres'],
          ['Conciencia ecologica', 'Santuario del Manati']
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
        q: 'Associe chaque competence sociale avec ou elle se pratique dans le jeu :',
        pairs: [
          ['Negociation', 'Duel avec Diego (option Negocier)'],
          ['Activisme civique', 'Protestation contre Mendez'],
          ['Pensee critique', 'Rassembler des preuves contre Torres'],
          ['Conscience ecologique', 'Sanctuaire du Lamantin']
        ],
        explanation: 'Le jeu est un simulateur de competences sociales deguise en RPG. Chaque monde entraine quelque chose de different.'
      }
    }
  },

  {
    id: 'soc-098', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada leccion del juego con su aplicacion en la vida real:',
        pairs: [
          ['Conviccion > hostilidad', 'El dialogo resuelve mas que los gritos'],
          ['Reputacion pacifica x3', 'La gente respeta mas a quien no agrede'],
          ['Multiples finales', 'Tus decisiones de hoy moldean tu futuro'],
          ['Tracking de acciones', 'La sociedad recuerda tus actos']
        ],
        explanation: 'Todo lo que ArcLycee te ensena es aplicable fuera de la pantalla. Ese es el verdadero juego.'
      },
      en: {
        q: 'Match each game lesson with its real-life application:',
        pairs: [
          ['Conviction > hostility', 'Dialogue solves more than shouting'],
          ['Peaceful reputation x3', 'People respect those who do not attack more'],
          ['Multiple endings', 'Today\'s decisions shape your future'],
          ['Action tracking', 'Society remembers your deeds']
        ],
        explanation: 'Everything ArcLycee teaches you applies outside the screen. That is the real game.'
      },
      fr: {
        q: 'Associe chaque lecon du jeu avec son application dans la vie reelle :',
        pairs: [
          ['Conviction > hostilite', 'Le dialogue resout plus que les cris'],
          ['Reputation pacifique x3', 'Les gens respectent plus ceux qui n\'agressent pas'],
          ['Fins multiples', 'Les decisions d\'aujourd\'hui faconnent ton avenir'],
          ['Suivi des actions', 'La societe se souvient de tes actes']
        ],
        explanation: 'Tout ce qu\'ArcLycee t\'apprend s\'applique en dehors de l\'ecran. C\'est ca le vrai jeu.'
      }
    }
  },

  {
    id: 'soc-099', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada nivel de proteccion con su alcance:',
        pairs: [
          ['Ley 318-68', 'Proteccion nacional (Republica Dominicana)'],
          ['Convencion UNESCO 1970', 'Proteccion internacional (tratado global)'],
          ['INTERPOL', 'Cooperacion policial entre 195 paises'],
          ['Evidencia forense', 'Prueba cientifica caso por caso']
        ],
        explanation: 'La proteccion del patrimonio funciona en capas: local, nacional, internacional, cientifica.'
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
        q: 'Associe chaque niveau de protection avec sa portee :',
        pairs: [
          ['Loi 318-68', 'Protection nationale (Republique dominicaine)'],
          ['Convention UNESCO 1970', 'Protection internationale (traite global)'],
          ['INTERPOL', 'Cooperation policiere entre 195 pays'],
          ['Preuve medico-legale', 'Preuve scientifique cas par cas']
        ],
        explanation: 'La protection du patrimoine fonctionne en couches : locale, nationale, internationale, scientifique.'
      }
    }
  },

  {
    id: 'soc-100', type: 'match',
    lang: {
      es: {
        q: 'Asocia cada mensaje final del juego con lo que el jugador aprendio:',
        pairs: [
          ['Final completo', 'La excelencia requiere exploracion, ayuda y paz'],
          ['Final pacifista', 'La no-violencia consistente es heroica'],
          ['Final ecologico', 'Cuidar el planeta es cuidar nuestro futuro'],
          ['Final oscuro', 'La violencia tiene consecuencias duraderas']
        ],
        explanation: 'Cada final es una leccion. El juego no te dice que hacer, te muestra que pasa cuando lo haces.'
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
          ['Fin complete', 'L\'excellence exige exploration, aide et paix'],
          ['Fin pacifiste', 'La non-violence constante est heroique'],
          ['Fin ecologique', 'Prendre soin de la planete, c\'est prendre soin de notre avenir'],
          ['Fin sombre', 'La violence a des consequences durables']
        ],
        explanation: 'Chaque fin est une lecon. Le jeu ne te dit pas quoi faire, il te montre ce qui arrive quand tu le fais.'
      }
    }
  }

];
