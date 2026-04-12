// sciences.js — 100 preguntas trilingües sobre ciencias naturales en ArcLycée
// Tipos: tf (verdadero/falso), mcq (opción múltiple), fill (completar), match (emparejar)
// Cada pregunta tiene id único, tipo y traducciones en es/en/fr
// Tono: divertido para adolescentes, con referencias a cultura pop

window.ARC_QUESTIONS = window.ARC_QUESTIONS || {};
window.ARC_QUESTIONS.sciences = [

  // ═══════════════════════════════════════════════════════════════
  // TRUE / FALSE (sci-001 a sci-025)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'sci-001', type: 'tf',
    lang: {
      es: {
        q: 'Como un Pokémon con evoluciones distintas, la Iguana de Ricord tiene ojos rojos mientras que la Iguana Rinoceronte tiene ojos amarillos.',
        answer: true,
        explanation: 'Cyclura ricordii tiene ojos rojos y Cyclura cornuta ojos amarillos. ¡Dos especies endémicas de La Hispaniola con looks únicos!'
      },
      en: {
        q: 'Like a Pokémon with different evolutions, the Ricord\'s Iguana has red eyes while the Rhinoceros Iguana has yellow ones.',
        answer: true,
        explanation: 'Cyclura ricordii has red eyes and Cyclura cornuta has yellow eyes. Two endemic species of Hispaniola with unique looks!'
      },
      fr: {
        q: 'Comme un Pokémon avec des évolutions différentes, l\'Iguane de Ricord a les yeux rouges tandis que l\'Iguane Rhinocéros a les yeux jaunes.',
        answer: true,
        explanation: 'Cyclura ricordii a les yeux rouges et Cyclura cornuta les yeux jaunes. Deux espèces endémiques d\'Hispaniola avec des looks uniques !'
      }
    }
  },

  {
    id: 'sci-002', type: 'tf',
    lang: {
      es: {
        q: 'El pez león es originario del Caribe y siempre ha vivido ahí, como Aquaman en Atlantis.',
        answer: false,
        explanation: 'El pez león (Pterois volitans) es una especie invasora del Indo-Pacífico. Llegó al Caribe probablemente por liberación de acuarios. ¡Es más como Thanos invadiendo la Tierra!'
      },
      en: {
        q: 'The lionfish is native to the Caribbean and has always lived there, like Aquaman in Atlantis.',
        answer: false,
        explanation: 'The lionfish (Pterois volitans) is an invasive species from the Indo-Pacific. It likely arrived in the Caribbean through aquarium releases. More like Thanos invading Earth!'
      },
      fr: {
        q: 'Le poisson-lion est originaire des Caraïbes et y a toujours vécu, comme Aquaman à Atlantis.',
        answer: false,
        explanation: 'Le poisson-lion (Pterois volitans) est une espèce invasive de l\'Indo-Pacifique. Il est probablement arrivé aux Caraïbes par des libérations d\'aquariums. Plutôt comme Thanos envahissant la Terre !'
      }
    }
  },

  {
    id: 'sci-003', type: 'tf',
    lang: {
      es: {
        q: 'El Lago Enriquillo tiene la mayor población de cocodrilos americanos (Crocodylus acutus) del Caribe. Literalmente, es el Jurassic Park dominicano.',
        answer: true,
        explanation: 'El Lago Enriquillo alberga la mayor población de Crocodylus acutus en el Caribe insular. ¡Y no necesitan una cerca eléctrica para quedarse!'
      },
      en: {
        q: 'Lake Enriquillo has the largest population of American Crocodiles (Crocodylus acutus) in the Caribbean. It\'s literally the Dominican Jurassic Park.',
        answer: true,
        explanation: 'Lake Enriquillo hosts the largest population of Crocodylus acutus in the insular Caribbean. And they don\'t need an electric fence to stay!'
      },
      fr: {
        q: 'Le Lac Enriquillo abrite la plus grande population de Crocodiles américains (Crocodylus acutus) des Caraïbes. C\'est littéralement le Jurassic Park dominicain.',
        answer: true,
        explanation: 'Le Lac Enriquillo abrite la plus grande population de Crocodylus acutus dans les Caraïbes insulaires. Et ils n\'ont pas besoin de clôture électrique pour rester !'
      }
    }
  },

  {
    id: 'sci-004', type: 'tf',
    lang: {
      es: {
        q: 'Los manatíes son carnívoros feroces, como los tiburones de Finding Nemo.',
        answer: false,
        explanation: 'Trichechus manatus es herbívoro. Come pastos marinos y plantas acuáticas. Son las vacas del mar, ¡no los lobos!'
      },
      en: {
        q: 'Manatees are fierce carnivores, like the sharks in Finding Nemo.',
        answer: false,
        explanation: 'Trichechus manatus is a herbivore. It eats seagrass and aquatic plants. They\'re the cows of the sea, not the wolves!'
      },
      fr: {
        q: 'Les lamantins sont des carnivores féroces, comme les requins dans Le Monde de Nemo.',
        answer: false,
        explanation: 'Trichechus manatus est herbivore. Il mange des herbes marines et des plantes aquatiques. Ce sont les vaches de la mer, pas les loups !'
      }
    }
  },

  {
    id: 'sci-005', type: 'tf',
    lang: {
      es: {
        q: 'Las ballenas jorobadas migran a las aguas de República Dominicana para reproducirse, como si fuera su resort de vacaciones.',
        answer: true,
        explanation: 'Megaptera novaeangliae viaja desde aguas frías del Atlántico Norte hasta la Bahía de Samaná y el Banco de la Plata cada invierno para aparearse y dar a luz.'
      },
      en: {
        q: 'Humpback whales migrate to Dominican Republic waters to breed, as if it were their vacation resort.',
        answer: true,
        explanation: 'Megaptera novaeangliae travels from cold North Atlantic waters to Samaná Bay and Silver Bank every winter to mate and give birth.'
      },
      fr: {
        q: 'Les baleines à bosse migrent vers les eaux de la République dominicaine pour se reproduire, comme si c\'était leur station balnéaire.',
        answer: true,
        explanation: 'Megaptera novaeangliae voyage depuis les eaux froides de l\'Atlantique Nord jusqu\'à la Baie de Samaná et le Banc de la Plata chaque hiver pour s\'accoupler et mettre bas.'
      }
    }
  },

  {
    id: 'sci-006', type: 'tf',
    lang: {
      es: {
        q: 'El cucú (Athene cunicularia) es un búho que vive en madrigueras bajo tierra. Sí, un búho que vive como un hobbit.',
        answer: true,
        explanation: 'El Burrowing Owl o cucú anida en madrigueras en el suelo y es activo durante el día, a diferencia de la mayoría de los búhos. ¡La Comarca de los búhos!'
      },
      en: {
        q: 'The Burrowing Owl (Athene cunicularia) lives in underground burrows. Yes, an owl that lives like a hobbit.',
        answer: true,
        explanation: 'The Burrowing Owl nests in ground burrows and is active during the day, unlike most owls. The Shire of owls!'
      },
      fr: {
        q: 'La Chevêche des terriers (Athene cunicularia) vit dans des terriers souterrains. Oui, une chouette qui vit comme un hobbit.',
        answer: true,
        explanation: 'La Chevêche des terriers niche dans des terriers au sol et est active le jour, contrairement à la plupart des chouettes. La Comté des chouettes !'
      }
    }
  },

  {
    id: 'sci-007', type: 'tf',
    lang: {
      es: {
        q: 'La Iguana de Ricord (Cyclura ricordii) es más común que la Iguana Rinoceronte. Hay miles en todos lados.',
        answer: false,
        explanation: 'La Iguana de Ricord está en peligro crítico de extinción y es mucho más rara que la Iguana Rinoceronte. Es como encontrar un shiny legendario en la vida real.'
      },
      en: {
        q: 'Ricord\'s Iguana (Cyclura ricordii) is more common than the Rhinoceros Iguana. There are thousands everywhere.',
        answer: false,
        explanation: 'Ricord\'s Iguana is critically endangered and much rarer than the Rhinoceros Iguana. It\'s like finding a shiny legendary in real life.'
      },
      fr: {
        q: 'L\'Iguane de Ricord (Cyclura ricordii) est plus commun que l\'Iguane Rhinocéros. Il y en a des milliers partout.',
        answer: false,
        explanation: 'L\'Iguane de Ricord est en danger critique d\'extinction et beaucoup plus rare que l\'Iguane Rhinocéros. C\'est comme trouver un légendaire chromatique dans la vie réelle.'
      }
    }
  },

  {
    id: 'sci-008', type: 'tf',
    lang: {
      es: {
        q: 'Los flamencos rosados se paran en una pata para regular su temperatura corporal. No es solo para verse aesthetic.',
        answer: true,
        explanation: 'Phoenicopterus ruber se para en una sola pata para reducir la pérdida de calor corporal. ¡Es termorregulación, no una pose de yoga!'
      },
      en: {
        q: 'Greater Flamingos stand on one leg to regulate their body temperature. It\'s not just to look aesthetic.',
        answer: true,
        explanation: 'Phoenicopterus ruber stands on one leg to reduce body heat loss. It\'s thermoregulation, not a yoga pose!'
      },
      fr: {
        q: 'Les flamants roses se tiennent sur une patte pour réguler leur température corporelle. Ce n\'est pas juste pour avoir l\'air esthétique.',
        answer: true,
        explanation: 'Phoenicopterus ruber se tient sur une patte pour réduire la perte de chaleur corporelle. C\'est de la thermorégulation, pas une pose de yoga !'
      }
    }
  },

  {
    id: 'sci-009', type: 'tf',
    lang: {
      es: {
        q: 'La tortuga carey (Eretmochelys imbricata) vive en los arrecifes de coral y su caparazón tiene un patrón que parece arte abstracto.',
        answer: true,
        explanation: 'La tortuga carey habita arrecifes de coral y tiene un caparazón con patrones marrones y dorados superpuestos. Está en peligro crítico de extinción.'
      },
      en: {
        q: 'The Hawksbill Turtle (Eretmochelys imbricata) lives in coral reefs and its shell has a pattern that looks like abstract art.',
        answer: true,
        explanation: 'The Hawksbill Turtle inhabits coral reefs and has a shell with overlapping brown and golden patterns. It\'s critically endangered.'
      },
      fr: {
        q: 'La tortue imbriquée (Eretmochelys imbricata) vit dans les récifs coralliens et sa carapace a un motif qui ressemble à de l\'art abstrait.',
        answer: true,
        explanation: 'La tortue imbriquée habite les récifs coralliens et a une carapace avec des motifs bruns et dorés superposés. Elle est en danger critique d\'extinction.'
      }
    }
  },

  {
    id: 'sci-010', type: 'tf',
    lang: {
      es: {
        q: 'El Lago Enriquillo está a 40 metros SOBRE el nivel del mar.',
        answer: false,
        explanation: 'El Lago Enriquillo está a 40 metros BAJO el nivel del mar. Es el punto más bajo del Caribe. Imagina un lago que está más abajo que la playa.'
      },
      en: {
        q: 'Lake Enriquillo is 40 meters ABOVE sea level.',
        answer: false,
        explanation: 'Lake Enriquillo is 40 meters BELOW sea level. It\'s the lowest point in the Caribbean. Imagine a lake that\'s lower than the beach.'
      },
      fr: {
        q: 'Le Lac Enriquillo est à 40 mètres AU-DESSUS du niveau de la mer.',
        answer: false,
        explanation: 'Le Lac Enriquillo est à 40 mètres EN-DESSOUS du niveau de la mer. C\'est le point le plus bas des Caraïbes. Imaginez un lac plus bas que la plage.'
      }
    }
  },

  {
    id: 'sci-011', type: 'tf',
    lang: {
      es: {
        q: 'La Haitiophis anomalus (culebra corredora hispana) es la colubrida más grande de las Américas y puede llegar a medir 2 metros. Es como una serpiente con modo turbo.',
        answer: true,
        explanation: 'Haitiophis anomalus es efectivamente la colubrida más grande del continente americano, alcanzando hasta 2 metros. ¡Pero no es venenosa!'
      },
      en: {
        q: 'The Hispaniolan Racer (Haitiophis anomalus) is the largest colubrid in the Americas and can reach 2 meters. It\'s like a snake with turbo mode.',
        answer: true,
        explanation: 'Haitiophis anomalus is indeed the largest colubrid in the Americas, reaching up to 2 meters. But it\'s not venomous!'
      },
      fr: {
        q: 'La Couleuvre d\'Hispaniola (Haitiophis anomalus) est le plus grand colubridé des Amériques et peut atteindre 2 mètres. C\'est comme un serpent en mode turbo.',
        answer: true,
        explanation: 'Haitiophis anomalus est effectivement le plus grand colubridé des Amériques, atteignant 2 mètres. Mais elle n\'est pas venimeuse !'
      }
    }
  },

  {
    id: 'sci-012', type: 'tf',
    lang: {
      es: {
        q: 'Un cenote es un lago de agua salada formado por la evaporación del mar.',
        answer: false,
        explanation: 'Un cenote es una dolina de agua dulce formada por el colapso de roca caliza que expone el agua subterránea. Como una piscina natural secreta del planeta.'
      },
      en: {
        q: 'A cenote is a saltwater lake formed by sea evaporation.',
        answer: false,
        explanation: 'A cenote is a freshwater sinkhole formed by the collapse of limestone that exposes groundwater. Like a secret natural pool on the planet.'
      },
      fr: {
        q: 'Un cénote est un lac d\'eau salée formé par l\'évaporation de la mer.',
        answer: false,
        explanation: 'Un cénote est une doline d\'eau douce formée par l\'effondrement du calcaire qui expose les eaux souterraines. Comme une piscine naturelle secrète de la planète.'
      }
    }
  },

  {
    id: 'sci-013', type: 'tf',
    lang: {
      es: {
        q: 'El coral cerebro tiene surcos que se parecen a un cerebro humano. No es que piense, pero se ve como si pudiera.',
        answer: true,
        explanation: 'El coral cerebro (familia Mussidae) tiene surcos meándricos que forman patrones similares a las circunvoluciones del cerebro humano. Pura coincidencia visual.'
      },
      en: {
        q: 'Brain coral has grooves that look like a human brain. It doesn\'t think, but it looks like it could.',
        answer: true,
        explanation: 'Brain coral (family Mussidae) has meandering grooves that form patterns similar to the convolutions of the human brain. Pure visual coincidence.'
      },
      fr: {
        q: 'Le corail cerveau a des sillons qui ressemblent à un cerveau humain. Il ne pense pas, mais on dirait qu\'il pourrait.',
        answer: true,
        explanation: 'Le corail cerveau (famille Mussidae) a des sillons méandriques qui forment des motifs similaires aux circonvolutions du cerveau humain. Pure coïncidence visuelle.'
      }
    }
  },

  {
    id: 'sci-014', type: 'tf',
    lang: {
      es: {
        q: 'Los taínos cultivaban algodón. Sí, tenían su propia línea de producción textil antes de que fuera trendy.',
        answer: true,
        explanation: 'Los taínos cultivaban algodón para hacer hamacas, redes de pesca y vestimenta. Eran agricultores expertos con más de 30 cultivos diferentes.'
      },
      en: {
        q: 'The Taínos grew cotton. Yes, they had their own textile production line before it was trendy.',
        answer: true,
        explanation: 'The Taínos grew cotton to make hammocks, fishing nets, and clothing. They were expert farmers with over 30 different crops.'
      },
      fr: {
        q: 'Les Taïnos cultivaient du coton. Oui, ils avaient leur propre ligne de production textile avant que ce soit tendance.',
        answer: true,
        explanation: 'Les Taïnos cultivaient du coton pour fabriquer des hamacs, des filets de pêche et des vêtements. C\'étaient des agriculteurs experts avec plus de 30 cultures différentes.'
      }
    }
  },

  {
    id: 'sci-015', type: 'tf',
    lang: {
      es: {
        q: 'El pez león tiene espinas venenosas que usa para cazar a sus presas activamente, como un ninja acuático.',
        answer: false,
        explanation: 'Las espinas del pez león son venenosas pero son DEFENSIVAS, no para cazar. Caza usando su velocidad y camuflaje. Es más como un tanque con armadura que un ninja.'
      },
      en: {
        q: 'The lionfish has venomous spines that it actively uses to hunt its prey, like an aquatic ninja.',
        answer: false,
        explanation: 'Lionfish spines are venomous but they\'re DEFENSIVE, not for hunting. It hunts using speed and camouflage. It\'s more like an armored tank than a ninja.'
      },
      fr: {
        q: 'Le poisson-lion a des épines venimeuses qu\'il utilise activement pour chasser ses proies, comme un ninja aquatique.',
        answer: false,
        explanation: 'Les épines du poisson-lion sont venimeuses mais DÉFENSIVES, pas pour la chasse. Il chasse en utilisant sa vitesse et son camouflage. C\'est plus un tank blindé qu\'un ninja.'
      }
    }
  },

  {
    id: 'sci-016', type: 'tf',
    lang: {
      es: {
        q: 'La yuca (cassava) era el cultivo principal de los taínos. Era como su arroz, su pan y sus papitas fritas, todo en uno.',
        answer: true,
        explanation: 'La yuca era la base de la dieta taína. Hacían casabe (pan de yuca), que podía conservarse por meses. ¡El snack OG del Caribe!'
      },
      en: {
        q: 'Cassava (yuca) was the main crop of the Taínos. It was like their rice, bread, and fries, all in one.',
        answer: true,
        explanation: 'Cassava was the base of the Taíno diet. They made casabe (cassava bread), which could be preserved for months. The OG Caribbean snack!'
      },
      fr: {
        q: 'Le manioc (yuca) était la culture principale des Taïnos. C\'était comme leur riz, leur pain et leurs frites, tout en un.',
        answer: true,
        explanation: 'Le manioc était la base de l\'alimentation taïno. Ils fabriquaient le casabe (pain de manioc), conservable pendant des mois. Le snack OG des Caraïbes !'
      }
    }
  },

  {
    id: 'sci-017', type: 'tf',
    lang: {
      es: {
        q: 'La Iguana Rinoceronte se llama así porque tiene cuernos nasales, como un mini rinoceronte reptiliano.',
        answer: true,
        explanation: 'Cyclura cornuta tiene proyecciones óseas en el hocico que parecen cuernos, de ahí su nombre. Es como el Rhyhorn de las iguanas.'
      },
      en: {
        q: 'The Rhinoceros Iguana is named so because it has nasal horns, like a mini reptilian rhinoceros.',
        answer: true,
        explanation: 'Cyclura cornuta has bony projections on its snout that look like horns, hence the name. It\'s like the Rhyhorn of iguanas.'
      },
      fr: {
        q: 'L\'Iguane Rhinocéros tire son nom de ses cornes nasales, comme un mini rhinocéros reptilien.',
        answer: true,
        explanation: 'Cyclura cornuta a des projections osseuses sur le museau qui ressemblent à des cornes, d\'où son nom. C\'est comme le Rhinocorne des iguanes.'
      }
    }
  },

  {
    id: 'sci-018', type: 'tf',
    lang: {
      es: {
        q: 'El death roll del cocodrilo americano es cuando gira sobre su propio eje para despedazar a su presa. Básicamente, es el Beyblade de los reptiles.',
        answer: true,
        explanation: 'El death roll es una técnica real de los cocodrilos: agarran a la presa y giran violentamente para arrancar trozos de carne. ¡Let it rip!'
      },
      en: {
        q: 'The death roll of the American Crocodile is when it spins on its own axis to tear apart its prey. Basically, it\'s the Beyblade of reptiles.',
        answer: true,
        explanation: 'The death roll is a real crocodile technique: they grab prey and spin violently to tear off chunks of meat. Let it rip!'
      },
      fr: {
        q: 'Le death roll du Crocodile américain c\'est quand il tourne sur son propre axe pour déchiqueter sa proie. En gros, c\'est le Beyblade des reptiles.',
        answer: true,
        explanation: 'Le death roll est une vraie technique des crocodiles : ils attrapent la proie et tournent violemment pour arracher des morceaux de chair. Let it rip !'
      }
    }
  },

  {
    id: 'sci-019', type: 'tf',
    lang: {
      es: {
        q: 'Los flamencos nacen rosados. Es su color natural desde el huevo.',
        answer: false,
        explanation: 'Los flamencos nacen grises/blancos. El color rosado viene de los carotenoides en su dieta de algas y crustáceos. ¡Eres lo que comes, literalmente!'
      },
      en: {
        q: 'Flamingos are born pink. It\'s their natural color from the egg.',
        answer: false,
        explanation: 'Flamingos are born grey/white. The pink color comes from carotenoids in their diet of algae and crustaceans. You are what you eat, literally!'
      },
      fr: {
        q: 'Les flamants naissent roses. C\'est leur couleur naturelle dès l\'œuf.',
        answer: false,
        explanation: 'Les flamants naissent gris/blancs. La couleur rose vient des caroténoïdes de leur régime d\'algues et crustacés. On est ce qu\'on mange, littéralement !'
      }
    }
  },

  {
    id: 'sci-020', type: 'tf',
    lang: {
      es: {
        q: 'La gorgonia (coral abanico) es una planta marina que hace fotosíntesis.',
        answer: false,
        explanation: 'Las gorgonias son animales coloniales del filo Cnidaria, no plantas. Aunque parecen abanicos vegetales, son colonias de pólipos. ¡Las apariencias engañan!'
      },
      en: {
        q: 'The sea fan (gorgonian) is a marine plant that photosynthesizes.',
        answer: false,
        explanation: 'Gorgonians are colonial animals of the phylum Cnidaria, not plants. Though they look like vegetable fans, they\'re colonies of polyps. Looks can be deceiving!'
      },
      fr: {
        q: 'La gorgone (corail éventail) est une plante marine qui fait la photosynthèse.',
        answer: false,
        explanation: 'Les gorgones sont des animaux coloniaux du phylum des Cnidaires, pas des plantes. Bien qu\'elles ressemblent à des éventails végétaux, ce sont des colonies de polypes. Les apparences sont trompeuses !'
      }
    }
  },

  {
    id: 'sci-021', type: 'tf',
    lang: {
      es: {
        q: 'El bosque xerofítico es un ecosistema húmedo y lluvioso, como la selva amazónica.',
        answer: false,
        explanation: 'Xerofítico viene del griego "xero" (seco). Es un bosque adaptado a condiciones áridas con cactus y plantas suculentas. Lo opuesto a una selva tropical.'
      },
      en: {
        q: 'Xerophytic forest is a humid and rainy ecosystem, like the Amazon rainforest.',
        answer: false,
        explanation: 'Xerophytic comes from the Greek "xero" (dry). It\'s a forest adapted to arid conditions with cacti and succulent plants. The opposite of a tropical rainforest.'
      },
      fr: {
        q: 'La forêt xérophyte est un écosystème humide et pluvieux, comme la forêt amazonienne.',
        answer: false,
        explanation: 'Xérophyte vient du grec "xero" (sec). C\'est une forêt adaptée aux conditions arides avec des cactus et des plantes succulentes. L\'opposé d\'une forêt tropicale.'
      }
    }
  },

  {
    id: 'sci-022', type: 'tf',
    lang: {
      es: {
        q: 'Los taínos cultivaban tabaco, y lo usaban en ceremonias religiosas, no para fumar por diversión.',
        answer: true,
        explanation: 'El tabaco era sagrado para los taínos. Los behiques (chamanes) lo usaban en la cohoba, una ceremonia ritual. Era espiritual, no recreativo.'
      },
      en: {
        q: 'The Taínos grew tobacco, and used it in religious ceremonies, not for recreational smoking.',
        answer: true,
        explanation: 'Tobacco was sacred to the Taínos. The behiques (shamans) used it in the cohoba, a ritual ceremony. It was spiritual, not recreational.'
      },
      fr: {
        q: 'Les Taïnos cultivaient du tabac et l\'utilisaient dans des cérémonies religieuses, pas pour fumer par plaisir.',
        answer: true,
        explanation: 'Le tabac était sacré pour les Taïnos. Les behiques (chamanes) l\'utilisaient dans la cohoba, une cérémonie rituelle. C\'était spirituel, pas récréatif.'
      }
    }
  },

  {
    id: 'sci-023', type: 'tf',
    lang: {
      es: {
        q: 'El Lago Enriquillo es un lago de agua dulce donde se puede nadar tranquilamente.',
        answer: false,
        explanation: 'El Lago Enriquillo es hipersalino — más salado que el mar. Además, está lleno de cocodrilos americanos. ¡No es exactamente un balneario!'
      },
      en: {
        q: 'Lake Enriquillo is a freshwater lake where you can swim peacefully.',
        answer: false,
        explanation: 'Lake Enriquillo is hypersaline — saltier than the sea. Plus, it\'s full of American Crocodiles. Not exactly a swimming pool!'
      },
      fr: {
        q: 'Le Lac Enriquillo est un lac d\'eau douce où l\'on peut nager tranquillement.',
        answer: false,
        explanation: 'Le Lac Enriquillo est hypersalin — plus salé que la mer. En plus, il est plein de Crocodiles américains. Ce n\'est pas exactement une piscine !'
      }
    }
  },

  {
    id: 'sci-024', type: 'tf',
    lang: {
      es: {
        q: 'El manglar es un ecosistema donde los árboles tienen raíces que crecen por encima del agua, como si caminaran.',
        answer: true,
        explanation: 'Los manglares tienen raíces aéreas llamadas zancos o neumatóforos que les permiten sobrevivir en agua salada. Son como los Ents de El Señor de los Anillos, pero reales.'
      },
      en: {
        q: 'The mangrove is an ecosystem where trees have roots that grow above water, as if they were walking.',
        answer: true,
        explanation: 'Mangroves have aerial roots called stilts or pneumatophores that allow them to survive in salt water. They\'re like the Ents from Lord of the Rings, but real.'
      },
      fr: {
        q: 'La mangrove est un écosystème où les arbres ont des racines qui poussent au-dessus de l\'eau, comme s\'ils marchaient.',
        answer: true,
        explanation: 'Les mangroves ont des racines aériennes appelées échasses ou pneumatophores qui leur permettent de survivre en eau salée. Ce sont comme les Ents du Seigneur des Anneaux, mais en vrai.'
      }
    }
  },

  {
    id: 'sci-025', type: 'tf',
    lang: {
      es: {
        q: 'La batata (sweet potato) fue uno de los cultivos taínos que Colón llevó a Europa. Básicamente, exportaron comida antes de que existiera Amazon.',
        answer: true,
        explanation: 'La batata fue uno de los primeros cultivos americanos en llegar a Europa tras 1492. Los taínos la cultivaban extensivamente junto con la yuca y el maíz.'
      },
      en: {
        q: 'The sweet potato (batata) was one of the Taíno crops that Columbus brought to Europe. Basically, they exported food before Amazon existed.',
        answer: true,
        explanation: 'The sweet potato was one of the first American crops to reach Europe after 1492. The Taínos cultivated it extensively along with cassava and corn.'
      },
      fr: {
        q: 'La patate douce (batata) fut l\'une des cultures taïnos que Colomb ramena en Europe. En gros, ils exportaient de la nourriture avant qu\'Amazon n\'existe.',
        answer: true,
        explanation: 'La patate douce fut l\'une des premières cultures américaines à arriver en Europe après 1492. Les Taïnos la cultivaient abondamment avec le manioc et le maïs.'
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // MULTIPLE CHOICE (sci-026 a sci-050)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'sci-026', type: 'mcq',
    lang: {
      es: {
        q: 'El pez león es como Thanos en el Caribe: invasor y difícil de detener. ¿De dónde viene originalmente?',
        options: ['Mar Mediterráneo', 'Indo-Pacífico', 'Océano Ártico', 'Golfo de México'],
        answer: 1,
        explanation: 'Pterois volitans es nativo del Indo-Pacífico (Australia, Indonesia, Filipinas). Llegó al Caribe probablemente por liberaciones accidentales de acuarios en los años 80-90.'
      },
      en: {
        q: 'The lionfish is like Thanos in the Caribbean: invasive and hard to stop. Where does it originally come from?',
        options: ['Mediterranean Sea', 'Indo-Pacific', 'Arctic Ocean', 'Gulf of Mexico'],
        answer: 1,
        explanation: 'Pterois volitans is native to the Indo-Pacific (Australia, Indonesia, Philippines). It arrived in the Caribbean likely through accidental aquarium releases in the 80s-90s.'
      },
      fr: {
        q: 'Le poisson-lion est comme Thanos dans les Caraïbes : invasif et difficile à arrêter. D\'où vient-il à l\'origine ?',
        options: ['Mer Méditerranée', 'Indo-Pacifique', 'Océan Arctique', 'Golfe du Mexique'],
        answer: 1,
        explanation: 'Pterois volitans est originaire de l\'Indo-Pacifique (Australie, Indonésie, Philippines). Il est arrivé aux Caraïbes probablement par des libérations accidentelles d\'aquariums dans les années 80-90.'
      }
    }
  },

  {
    id: 'sci-027', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuál es el nombre científico del cocodrilo americano que vive en el Lago Enriquillo? Piensa en él como el boss final del lago.',
        options: ['Crocodylus niloticus', 'Crocodylus acutus', 'Alligator mississippiensis', 'Crocodylus porosus'],
        answer: 1,
        explanation: 'Crocodylus acutus es el cocodrilo americano. No confundir con el del Nilo (niloticus), el aligátor (Alligator) o el de agua salada (porosus).'
      },
      en: {
        q: 'What is the scientific name of the American Crocodile that lives in Lake Enriquillo? Think of it as the final boss of the lake.',
        options: ['Crocodylus niloticus', 'Crocodylus acutus', 'Alligator mississippiensis', 'Crocodylus porosus'],
        answer: 1,
        explanation: 'Crocodylus acutus is the American Crocodile. Don\'t confuse it with the Nile croc (niloticus), the alligator (Alligator), or the saltwater croc (porosus).'
      },
      fr: {
        q: 'Quel est le nom scientifique du Crocodile américain qui vit au Lac Enriquillo ? Pensez à lui comme le boss final du lac.',
        options: ['Crocodylus niloticus', 'Crocodylus acutus', 'Alligator mississippiensis', 'Crocodylus porosus'],
        answer: 1,
        explanation: 'Crocodylus acutus est le Crocodile américain. Ne pas confondre avec celui du Nil (niloticus), l\'alligator (Alligator) ou le crocodile marin (porosus).'
      }
    }
  },

  {
    id: 'sci-028', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué hace tan especial al Lago Enriquillo como ecosistema? Es como si la naturaleza hubiera hecho un nivel secreto.',
        options: [
          'Es el lago más grande del mundo',
          'Es hipersalino y está 40m bajo el nivel del mar',
          'Tiene agua dulce cristalina',
          'Está en la cima de una montaña'
        ],
        answer: 1,
        explanation: 'El Lago Enriquillo es hipersalino (más salado que el mar) y está a 40 metros bajo el nivel del mar, siendo el punto más bajo del Caribe.'
      },
      en: {
        q: 'What makes Lake Enriquillo so special as an ecosystem? It\'s like nature made a secret level.',
        options: [
          'It\'s the largest lake in the world',
          'It\'s hypersaline and 40m below sea level',
          'It has crystal-clear freshwater',
          'It\'s on top of a mountain'
        ],
        answer: 1,
        explanation: 'Lake Enriquillo is hypersaline (saltier than the sea) and sits 40 meters below sea level, the lowest point in the Caribbean.'
      },
      fr: {
        q: 'Qu\'est-ce qui rend le Lac Enriquillo si spécial comme écosystème ? C\'est comme si la nature avait créé un niveau secret.',
        options: [
          'C\'est le plus grand lac du monde',
          'Il est hypersalin et à 40m sous le niveau de la mer',
          'Il a de l\'eau douce cristalline',
          'Il est au sommet d\'une montagne'
        ],
        answer: 1,
        explanation: 'Le Lac Enriquillo est hypersalin (plus salé que la mer) et se trouve à 40 mètres sous le niveau de la mer, le point le plus bas des Caraïbes.'
      }
    }
  },

  {
    id: 'sci-029', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuál de estas NO es una especie de tortuga marina que aparece en el Mundo Acuático de ArcLycée?',
        options: ['Carey (Hawksbill)', 'Tinglar (Leatherback)', 'Galápagos (Giant)', 'Caguama (Loggerhead)'],
        answer: 2,
        explanation: 'Las tortugas de Galápagos son terrestres y viven en el Pacífico. El juego tiene carey, tinglar, caguama y verde, todas presentes en aguas dominicanas.'
      },
      en: {
        q: 'Which of these is NOT a sea turtle species that appears in ArcLycée\'s Aquatic World?',
        options: ['Hawksbill', 'Leatherback', 'Galápagos Giant', 'Loggerhead'],
        answer: 2,
        explanation: 'Galápagos tortoises are terrestrial and live in the Pacific. The game features hawksbill, leatherback, loggerhead, and green turtles, all present in Dominican waters.'
      },
      fr: {
        q: 'Laquelle de ces espèces n\'est PAS une tortue marine du Monde Aquatique d\'ArcLycée ?',
        options: ['Imbriquée (Carey)', 'Luth (Tinglar)', 'Géante des Galápagos', 'Caouanne (Caguama)'],
        answer: 2,
        explanation: 'Les tortues des Galápagos sont terrestres et vivent dans le Pacifique. Le jeu a l\'imbriquée, la luth, la caouanne et la verte, toutes présentes dans les eaux dominicaines.'
      }
    }
  },

  {
    id: 'sci-030', type: 'mcq',
    lang: {
      es: {
        q: '¿Por qué el pez león es tan peligroso para el ecosistema del Caribe? Es como un villain de Marvel sin héroes locales que lo detengan.',
        options: [
          'Porque es muy grande y asusta a los turistas',
          'Porque no tiene depredadores naturales y se reproduce muy rápido',
          'Porque contamina el agua con veneno',
          'Porque destruye los barcos pesqueros'
        ],
        answer: 1,
        explanation: 'En el Caribe, el pez león no tiene depredadores naturales, se reproduce todo el año y una hembra puede poner 2 millones de huevos al año. ¡Es un invasor sin control natural!'
      },
      en: {
        q: 'Why is the lionfish so dangerous to the Caribbean ecosystem? It\'s like a Marvel villain with no local heroes to stop it.',
        options: [
          'Because it\'s very large and scares tourists',
          'Because it has no natural predators and reproduces very fast',
          'Because it contaminates water with venom',
          'Because it destroys fishing boats'
        ],
        answer: 1,
        explanation: 'In the Caribbean, the lionfish has no natural predators, reproduces year-round, and a female can lay 2 million eggs per year. An invader with no natural control!'
      },
      fr: {
        q: 'Pourquoi le poisson-lion est-il si dangereux pour l\'écosystème caribéen ? C\'est comme un vilain Marvel sans héros locaux pour l\'arrêter.',
        options: [
          'Parce qu\'il est très grand et effraie les touristes',
          'Parce qu\'il n\'a pas de prédateurs naturels et se reproduit très vite',
          'Parce qu\'il contamine l\'eau avec du venin',
          'Parce qu\'il détruit les bateaux de pêche'
        ],
        answer: 1,
        explanation: 'Dans les Caraïbes, le poisson-lion n\'a pas de prédateurs naturels, se reproduit toute l\'année et une femelle peut pondre 2 millions d\'œufs par an. Un envahisseur sans contrôle naturel !'
      }
    }
  },

  {
    id: 'sci-031', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué estrategia de conservación se usa en ArcLycée para combatir al pez león? Think like an eco-warrior.',
        options: [
          'Poner veneno en el agua',
          'Atrapar, pescar, proteger coral y alertar buzos',
          'Construir muros submarinos',
          'Introducir tiburones importados'
        ],
        answer: 1,
        explanation: 'En el juego, las opciones ecológicas contra el pez león son: atraparlo, pescarlo, proteger el coral y alertar buzos. ¡Estrategias reales de conservación!'
      },
      en: {
        q: 'What conservation strategy is used in ArcLycée to fight the lionfish? Think like an eco-warrior.',
        options: [
          'Put poison in the water',
          'Trap, fish, protect coral, and alert divers',
          'Build underwater walls',
          'Introduce imported sharks'
        ],
        answer: 1,
        explanation: 'In the game, ecological options against lionfish are: trap it, fish it, protect coral, and alert divers. Real conservation strategies!'
      },
      fr: {
        q: 'Quelle stratégie de conservation est utilisée dans ArcLycée pour combattre le poisson-lion ? Pense comme un éco-guerrier.',
        options: [
          'Mettre du poison dans l\'eau',
          'Piéger, pêcher, protéger le corail et alerter les plongeurs',
          'Construire des murs sous-marins',
          'Introduire des requins importés'
        ],
        answer: 1,
        explanation: 'Dans le jeu, les options écologiques contre le poisson-lion sont : le piéger, le pêcher, protéger le corail et alerter les plongeurs. De vraies stratégies de conservation !'
      }
    }
  },

  {
    id: 'sci-032', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué tipo de coral tiene forma de abanico y es en realidad una colonia de animales? Parece sacado de Adventure Time.',
        options: ['Coral cerebro', 'Coral cuerno de alce', 'Gorgonia (coral abanico)', 'Coral mesa'],
        answer: 2,
        explanation: 'La gorgonia o coral abanico es una colonia de pólipos que crece en forma de abanico plano. Es del filo Cnidaria, como las medusas y anémonas.'
      },
      en: {
        q: 'What type of coral is fan-shaped and is actually a colony of animals? Looks like something from Adventure Time.',
        options: ['Brain coral', 'Elkhorn coral', 'Gorgonian (sea fan)', 'Table coral'],
        answer: 2,
        explanation: 'The gorgonian or sea fan is a colony of polyps that grows in a flat fan shape. It\'s from the phylum Cnidaria, like jellyfish and anemones.'
      },
      fr: {
        q: 'Quel type de corail a la forme d\'un éventail et est en fait une colonie d\'animaux ? On dirait quelque chose d\'Adventure Time.',
        options: ['Corail cerveau', 'Corail corne d\'élan', 'Gorgone (corail éventail)', 'Corail table'],
        answer: 2,
        explanation: 'La gorgone ou corail éventail est une colonie de polypes qui pousse en forme d\'éventail plat. Elle appartient au phylum des Cnidaires, comme les méduses et les anémones.'
      }
    }
  },

  {
    id: 'sci-033', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuál es la principal amenaza para la tortuga carey en el Caribe?',
        options: [
          'Los tiburones la cazan demasiado',
          'El comercio ilegal de su caparazón y la destrucción de arrecifes',
          'El frío del agua en invierno',
          'La competencia con el pez león'
        ],
        answer: 1,
        explanation: 'La tortuga carey ha sido cazada durante siglos por su hermoso caparazón (para joyería y decoración) y la destrucción de arrecifes elimina su hábitat y alimento.'
      },
      en: {
        q: 'What is the main threat to the Hawksbill Turtle in the Caribbean?',
        options: [
          'Sharks hunt them too much',
          'Illegal trade of their shell and reef destruction',
          'Cold water in winter',
          'Competition with lionfish'
        ],
        answer: 1,
        explanation: 'The Hawksbill Turtle has been hunted for centuries for its beautiful shell (for jewelry and decoration) and reef destruction eliminates its habitat and food.'
      },
      fr: {
        q: 'Quelle est la principale menace pour la Tortue imbriquée dans les Caraïbes ?',
        options: [
          'Les requins les chassent trop',
          'Le commerce illégal de leur carapace et la destruction des récifs',
          'Le froid de l\'eau en hiver',
          'La compétition avec le poisson-lion'
        ],
        answer: 1,
        explanation: 'La Tortue imbriquée est chassée depuis des siècles pour sa belle carapace (bijoux et décoration) et la destruction des récifs élimine son habitat et sa nourriture.'
      }
    }
  },

  {
    id: 'sci-034', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuál cultivo taíno se usa para hacer casabe, un pan que puede durar meses sin echarse a perder? Como las galletas de supervivencia.',
        options: ['Maíz', 'Batata', 'Yuca', 'Ají'],
        answer: 2,
        explanation: 'La yuca (Manihot esculenta) se rallaba, se exprimía y se cocinaba en forma de tortas planas llamadas casabe. Podía conservarse durante meses.'
      },
      en: {
        q: 'Which Taíno crop is used to make casabe, a bread that can last months without spoiling? Like survival crackers.',
        options: ['Corn', 'Sweet potato', 'Cassava', 'Chili pepper'],
        answer: 2,
        explanation: 'Cassava (Manihot esculenta) was grated, squeezed, and cooked into flat cakes called casabe. It could be preserved for months.'
      },
      fr: {
        q: 'Quelle culture taïno sert à faire le casabe, un pain qui peut durer des mois sans se gâter ? Comme des crackers de survie.',
        options: ['Maïs', 'Patate douce', 'Manioc', 'Piment'],
        answer: 2,
        explanation: 'Le manioc (Manihot esculenta) était râpé, pressé et cuit en galettes plates appelées casabe. Il pouvait se conserver pendant des mois.'
      }
    }
  },

  {
    id: 'sci-035', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué tienen en común las medusas del Mundo Acuático y los Dementores de Harry Potter?',
        options: [
          'Ambos vuelan',
          'Su contacto causa daño, lentitud y una sacudida, como si te chuparan la energía',
          'Son invisibles',
          'Solo aparecen de noche'
        ],
        answer: 1,
        explanation: 'En el juego, las medusas son peligros pasivos cuyo contacto causa daño + efecto de lentitud + sacudida del avatar. Como los Dementores, te dejan débil y lento.'
      },
      en: {
        q: 'What do the jellyfish in the Aquatic World and the Dementors from Harry Potter have in common?',
        options: [
          'Both fly',
          'Their touch causes damage, slowness, and a shake, as if draining your energy',
          'They\'re invisible',
          'They only appear at night'
        ],
        answer: 1,
        explanation: 'In the game, jellyfish are passive dangers whose contact causes damage + slowness effect + avatar shake. Like Dementors, they leave you weak and slow.'
      },
      fr: {
        q: 'Qu\'ont en commun les méduses du Monde Aquatique et les Détraqueurs de Harry Potter ?',
        options: [
          'Les deux volent',
          'Leur contact cause dégâts, lenteur et secousse, comme s\'ils aspiraient ton énergie',
          'Ils sont invisibles',
          'Ils n\'apparaissent que la nuit'
        ],
        answer: 1,
        explanation: 'Dans le jeu, les méduses sont des dangers passifs dont le contact cause dégâts + effet de lenteur + secousse de l\'avatar. Comme les Détraqueurs, elles te laissent faible et lent.'
      }
    }
  },

  {
    id: 'sci-036', type: 'mcq',
    lang: {
      es: {
        q: 'El Pilosocereus polygonus es un cactus columnar de la zona de Enriquillo. ¿A qué tipo de ecosistema pertenece?',
        options: ['Manglar', 'Bosque xerofítico', 'Arrecife de coral', 'Bosque nublado'],
        answer: 1,
        explanation: 'Los cactus columnares como el Pilosocereus son típicos del bosque xerofítico (seco), adaptados a condiciones de poca agua y alta temperatura.'
      },
      en: {
        q: 'Pilosocereus polygonus is a columnar cactus from the Enriquillo area. What type of ecosystem does it belong to?',
        options: ['Mangrove', 'Xerophytic forest', 'Coral reef', 'Cloud forest'],
        answer: 1,
        explanation: 'Columnar cacti like Pilosocereus are typical of xerophytic (dry) forests, adapted to low water and high temperature conditions.'
      },
      fr: {
        q: 'Pilosocereus polygonus est un cactus colonnaire de la zone d\'Enriquillo. À quel type d\'écosystème appartient-il ?',
        options: ['Mangrove', 'Forêt xérophyte', 'Récif corallien', 'Forêt de nuages'],
        answer: 1,
        explanation: 'Les cactus colonnaires comme le Pilosocereus sont typiques de la forêt xérophyte (sèche), adaptés aux conditions de faible eau et haute température.'
      }
    }
  },

  {
    id: 'sci-037', type: 'mcq',
    lang: {
      es: {
        q: '¿Por qué las ballenas jorobadas viajan miles de kilómetros hasta RD cada invierno? Es el viaje más épico del océano.',
        options: [
          'Para escapar de los depredadores árticos',
          'Para alimentarse de los peces del Caribe',
          'Para reproducirse y dar a luz en aguas cálidas',
          'Porque se pierden durante la migración'
        ],
        answer: 2,
        explanation: 'Las ballenas jorobadas migran desde aguas frías ricas en alimento hasta aguas tropicales cálidas para reproducirse y parir. Los ballenatos nacen sin la capa de grasa que necesitan para sobrevivir en aguas frías.'
      },
      en: {
        q: 'Why do humpback whales travel thousands of kilometers to DR every winter? It\'s the most epic ocean journey.',
        options: [
          'To escape Arctic predators',
          'To feed on Caribbean fish',
          'To breed and give birth in warm waters',
          'Because they get lost during migration'
        ],
        answer: 2,
        explanation: 'Humpback whales migrate from cold, food-rich waters to warm tropical waters to breed and give birth. Calves are born without the fat layer needed to survive cold waters.'
      },
      fr: {
        q: 'Pourquoi les baleines à bosse voyagent-elles des milliers de kilomètres jusqu\'en RD chaque hiver ? C\'est le voyage le plus épique de l\'océan.',
        options: [
          'Pour échapper aux prédateurs arctiques',
          'Pour se nourrir des poissons des Caraïbes',
          'Pour se reproduire et mettre bas dans les eaux chaudes',
          'Parce qu\'elles se perdent pendant la migration'
        ],
        answer: 2,
        explanation: 'Les baleines à bosse migrent des eaux froides riches en nourriture vers les eaux tropicales chaudes pour se reproduire et mettre bas. Les baleineaux naissent sans la couche de graisse nécessaire pour survivre en eaux froides.'
      }
    }
  },

  {
    id: 'sci-038', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué acción ecológica puedes hacer en el Santuario del Manatí de ArcLycée? Elige tu misión de héroe marino.',
        options: [
          'Construir un acuario y capturar especies',
          'Liberar un manatí atrapado y limpiar el arrecife',
          'Pescar todos los peces del área',
          'Drenar el agua del santuario'
        ],
        answer: 1,
        explanation: 'En el Santuario del Manatí hay 2 acciones ecológicas: liberar un manatí y limpiar un arrecife. Completar ambas termina la misión de rescate.'
      },
      en: {
        q: 'What ecological action can you do in ArcLycée\'s Manatee Sanctuary? Choose your marine hero mission.',
        options: [
          'Build an aquarium and capture species',
          'Free a trapped manatee and clean the reef',
          'Fish out all species in the area',
          'Drain the water from the sanctuary'
        ],
        answer: 1,
        explanation: 'In the Manatee Sanctuary there are 2 ecological actions: free a manatee and clean a reef. Completing both finishes the rescue mission.'
      },
      fr: {
        q: 'Quelle action écologique peut-on faire dans le Sanctuaire du Lamantin d\'ArcLycée ? Choisis ta mission de héros marin.',
        options: [
          'Construire un aquarium et capturer des espèces',
          'Libérer un lamantin piégé et nettoyer le récif',
          'Pêcher toutes les espèces de la zone',
          'Vider l\'eau du sanctuaire'
        ],
        answer: 1,
        explanation: 'Dans le Sanctuaire du Lamantin, il y a 2 actions écologiques : libérer un lamantin et nettoyer un récif. Compléter les deux termine la mission de sauvetage.'
      }
    }
  },

  {
    id: 'sci-039', type: 'mcq',
    lang: {
      es: {
        q: 'Harrisia nashii es un cactus dominicano conocido comúnmente como:',
        options: ['Tuna', 'Pitahaya', 'Nopal', 'Saguaro'],
        answer: 1,
        explanation: 'Harrisia nashii es la pitahaya, un cactus nativo de La Hispaniola que produce frutos comestibles. No confundir con el saguaro, que es del desierto de Sonora.'
      },
      en: {
        q: 'Harrisia nashii is a Dominican cactus commonly known as:',
        options: ['Prickly pear', 'Pitahaya', 'Nopal', 'Saguaro'],
        answer: 1,
        explanation: 'Harrisia nashii is the pitahaya, a cactus native to Hispaniola that produces edible fruit. Not to be confused with the saguaro from the Sonoran Desert.'
      },
      fr: {
        q: 'Harrisia nashii est un cactus dominicain communément appelé :',
        options: ['Figuier de Barbarie', 'Pitahaya', 'Nopal', 'Saguaro'],
        answer: 1,
        explanation: 'Harrisia nashii est le pitahaya, un cactus natif d\'Hispaniola qui produit des fruits comestibles. À ne pas confondre avec le saguaro du désert de Sonora.'
      }
    }
  },

  {
    id: 'sci-040', type: 'mcq',
    lang: {
      es: {
        q: '¿Cómo se alimentan los flamencos? Hint: no comen como tú en la cafetería.',
        options: [
          'Cazan peces con el pico como los pelícanos',
          'Filtran el agua con su pico para atrapar algas y crustáceos',
          'Comen insectos del aire como los murciélagos',
          'Pastan hierba del fondo del lago'
        ],
        answer: 1,
        explanation: 'Los flamencos son filtradores. Sumergen el pico invertido en el agua y filtran algas, crustáceos y microorganismos. Los carotenoides de su dieta les dan el color rosado.'
      },
      en: {
        q: 'How do flamingos feed? Hint: they don\'t eat like you in the cafeteria.',
        options: [
          'They hunt fish with their beak like pelicans',
          'They filter water with their beak to catch algae and crustaceans',
          'They eat insects from the air like bats',
          'They graze grass from the lake bottom'
        ],
        answer: 1,
        explanation: 'Flamingos are filter feeders. They submerge their inverted beak in water and filter algae, crustaceans, and microorganisms. Carotenoids in their diet give them their pink color.'
      },
      fr: {
        q: 'Comment les flamants se nourrissent-ils ? Indice : ils ne mangent pas comme toi à la cantine.',
        options: [
          'Ils chassent les poissons avec le bec comme les pélicans',
          'Ils filtrent l\'eau avec leur bec pour attraper algues et crustacés',
          'Ils mangent des insectes en vol comme les chauves-souris',
          'Ils broutent l\'herbe au fond du lac'
        ],
        answer: 1,
        explanation: 'Les flamants sont des filtreurs. Ils plongent leur bec inversé dans l\'eau et filtrent algues, crustacés et micro-organismes. Les caroténoïdes de leur régime leur donnent la couleur rose.'
      }
    }
  },

  {
    id: 'sci-041', type: 'mcq',
    lang: {
      es: {
        q: '¿Por qué la velocidad del jugador se reduce al 70% en el Mundo Acuático de ArcLycée?',
        options: [
          'Porque el personaje está cansado',
          'Para simular la resistencia del agua al nadar',
          'Porque hay una maldición mágica',
          'Para que el juego sea más difícil'
        ],
        answer: 1,
        explanation: 'La velocidad × 0.7 simula la resistencia del agua. En la vida real, moverse bajo el agua es mucho más lento que en tierra debido a la densidad del agua (800× mayor que el aire).'
      },
      en: {
        q: 'Why is the player speed reduced to 70% in ArcLycée\'s Aquatic World?',
        options: [
          'Because the character is tired',
          'To simulate water resistance while swimming',
          'Because there\'s a magic curse',
          'To make the game harder'
        ],
        answer: 1,
        explanation: 'Speed × 0.7 simulates water resistance. In real life, moving underwater is much slower than on land due to water density (800× greater than air).'
      },
      fr: {
        q: 'Pourquoi la vitesse du joueur est-elle réduite à 70% dans le Monde Aquatique d\'ArcLycée ?',
        options: [
          'Parce que le personnage est fatigué',
          'Pour simuler la résistance de l\'eau en nageant',
          'Parce qu\'il y a une malédiction magique',
          'Pour rendre le jeu plus difficile'
        ],
        answer: 1,
        explanation: 'La vitesse × 0.7 simule la résistance de l\'eau. Dans la vie réelle, se déplacer sous l\'eau est beaucoup plus lent que sur terre en raison de la densité de l\'eau (800× plus que l\'air).'
      }
    }
  },

  {
    id: 'sci-042', type: 'mcq',
    lang: {
      es: {
        q: 'En el Santuario del Manatí, el oxígeno se agota en ~60 segundos bajo el agua. ¿Qué pasa cuando se acaba?',
        options: [
          'El jugador muere instantáneamente',
          'El jugador pierde 3 puntos de vida cada 1.5 segundos por asfixia',
          'El jugador es teletransportado a la superficie',
          'No pasa nada, es solo decorativo'
        ],
        answer: 1,
        explanation: 'Sin oxígeno, el jugador pierde -3 vida cada 1.5 segundos. Debe subir a la superficie para recargar. En la vida real, un buzo con tanque tiene unos 45-60 minutos de aire.'
      },
      en: {
        q: 'In the Manatee Sanctuary, oxygen runs out in ~60 seconds underwater. What happens when it\'s gone?',
        options: [
          'The player dies instantly',
          'The player loses 3 HP every 1.5 seconds from suffocation',
          'The player is teleported to the surface',
          'Nothing happens, it\'s just decorative'
        ],
        answer: 1,
        explanation: 'Without oxygen, the player loses -3 HP every 1.5 seconds. They must surface to recharge. In real life, a scuba diver has about 45-60 minutes of air.'
      },
      fr: {
        q: 'Dans le Sanctuaire du Lamantin, l\'oxygène s\'épuise en ~60 secondes sous l\'eau. Que se passe-t-il quand il n\'y en a plus ?',
        options: [
          'Le joueur meurt instantanément',
          'Le joueur perd 3 PV toutes les 1,5 secondes par asphyxie',
          'Le joueur est téléporté à la surface',
          'Rien ne se passe, c\'est juste décoratif'
        ],
        answer: 1,
        explanation: 'Sans oxygène, le joueur perd -3 PV toutes les 1,5 secondes. Il doit remonter à la surface pour recharger. Dans la vie réelle, un plongeur a environ 45-60 minutes d\'air.'
      }
    }
  },

  {
    id: 'sci-043', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuál de estos animales del Lago Enriquillo es nocturno en la vida real pero aparece de día en el juego?',
        options: [
          'El cocodrilo americano',
          'El flamenco rosado',
          'El cucú (búho cavador)',
          'La iguana rinoceronte'
        ],
        answer: 2,
        explanation: '¡Trampa! El cucú (Athene cunicularia) es realmente diurno a diferencia de la mayoría de búhos. Caza de día y vive en madrigueras. El juego lo representa fielmente.'
      },
      en: {
        q: 'Which of these Lake Enriquillo animals is nocturnal in real life but appears during the day in the game?',
        options: [
          'The American Crocodile',
          'The Greater Flamingo',
          'The Burrowing Owl (cucú)',
          'The Rhinoceros Iguana'
        ],
        answer: 2,
        explanation: 'Trick question! The Burrowing Owl (Athene cunicularia) is actually diurnal unlike most owls. It hunts during the day and lives in burrows. The game represents it faithfully.'
      },
      fr: {
        q: 'Lequel de ces animaux du Lac Enriquillo est nocturne dans la vraie vie mais apparaît de jour dans le jeu ?',
        options: [
          'Le Crocodile américain',
          'Le Flamant rose',
          'La Chevêche des terriers (cucú)',
          'L\'Iguane Rhinocéros'
        ],
        answer: 2,
        explanation: 'Question piège ! La Chevêche des terriers (Athene cunicularia) est en fait diurne contrairement à la plupart des chouettes. Elle chasse le jour et vit dans des terriers. Le jeu la représente fidèlement.'
      }
    }
  },

  {
    id: 'sci-044', type: 'mcq',
    lang: {
      es: {
        q: 'Si fueras un biólogo marino en RD, ¿cuál sería la forma más efectiva de controlar al pez león?',
        options: [
          'Cerrar las playas al público',
          'Organizar torneos de pesca de pez león y promover su consumo',
          'Echar cloro al mar',
          'Esperar a que se adapte al ecosistema solo'
        ],
        answer: 1,
        explanation: 'La pesca activa y el consumo de pez león son las estrategias más efectivas. Su carne es deliciosa y no tiene las toxinas de las espinas. ¡Comer al invasor es conservación!'
      },
      en: {
        q: 'If you were a marine biologist in DR, what would be the most effective way to control lionfish?',
        options: [
          'Close beaches to the public',
          'Organize lionfish fishing tournaments and promote their consumption',
          'Pour chlorine in the sea',
          'Wait for it to adapt to the ecosystem on its own'
        ],
        answer: 1,
        explanation: 'Active fishing and lionfish consumption are the most effective strategies. Its meat is delicious and doesn\'t have the spine toxins. Eating the invader is conservation!'
      },
      fr: {
        q: 'Si tu étais biologiste marin en RD, quelle serait la façon la plus efficace de contrôler le poisson-lion ?',
        options: [
          'Fermer les plages au public',
          'Organiser des tournois de pêche au poisson-lion et promouvoir sa consommation',
          'Verser du chlore dans la mer',
          'Attendre qu\'il s\'adapte seul à l\'écosystème'
        ],
        answer: 1,
        explanation: 'La pêche active et la consommation de poisson-lion sont les stratégies les plus efficaces. Sa chair est délicieuse et n\'a pas les toxines des épines. Manger l\'envahisseur, c\'est de la conservation !'
      }
    }
  },

  {
    id: 'sci-045', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuántas especies de tortuga marina puedes encontrar en el Mundo Acuático? Es como coleccionar Pokémon marinos.',
        options: ['2', '3', '4', '6'],
        answer: 2,
        explanation: 'En el Mundo Acuático hay 4 especies: carey, tinglar, caguama y verde. Todas con aletas animadas y comportamientos únicos.'
      },
      en: {
        q: 'How many sea turtle species can you find in the Aquatic World? It\'s like collecting marine Pokémon.',
        options: ['2', '3', '4', '6'],
        answer: 2,
        explanation: 'In the Aquatic World there are 4 species: hawksbill, leatherback, loggerhead, and green. All with animated fins and unique behaviors.'
      },
      fr: {
        q: 'Combien d\'espèces de tortues marines peut-on trouver dans le Monde Aquatique ? C\'est comme collectionner des Pokémon marins.',
        options: ['2', '3', '4', '6'],
        answer: 2,
        explanation: 'Dans le Monde Aquatique, il y a 4 espèces : imbriquée, luth, caouanne et verte. Toutes avec des nageoires animées et des comportements uniques.'
      }
    }
  },

  {
    id: 'sci-046', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué cultivo taíno es el ancestro directo de lo que hoy conocemos como chile/ají picante?',
        options: ['Tabaco', 'Batata', 'Ají', 'Algodón'],
        answer: 2,
        explanation: 'El ají (Capsicum) fue domesticado por pueblos americanos incluyendo los taínos. Hoy es base de salsas picantes en todo el mundo. ¡Gracias, taínos!'
      },
      en: {
        q: 'Which Taíno crop is the direct ancestor of what we know today as chili/hot pepper?',
        options: ['Tobacco', 'Sweet potato', 'Ají (chili pepper)', 'Cotton'],
        answer: 2,
        explanation: 'Ají (Capsicum) was domesticated by American peoples including the Taínos. Today it\'s the base of hot sauces worldwide. Thanks, Taínos!'
      },
      fr: {
        q: 'Quelle culture taïno est l\'ancêtre direct de ce que nous connaissons aujourd\'hui comme piment ?',
        options: ['Tabac', 'Patate douce', 'Ají (piment)', 'Coton'],
        answer: 2,
        explanation: 'L\'ají (Capsicum) a été domestiqué par les peuples américains, dont les Taïnos. Aujourd\'hui, c\'est la base des sauces piquantes du monde entier. Merci, Taïnos !'
      }
    }
  },

  {
    id: 'sci-047', type: 'mcq',
    lang: {
      es: {
        q: 'El Manantial de la Aleta en ArcLycée es un cenote sagrado taíno. ¿Qué puedes encontrar en su fase de buceo?',
        options: [
          'Tesoros piratas y cofres de oro',
          'Artefactos taínos sumergidos en agua dulce',
          'Monstruos marinos gigantes',
          'Un portal a otra dimensión'
        ],
        answer: 1,
        explanation: 'En el cenote de buceo hay 3 artefactos taínos sumergidos, corrientes de agua y un sistema de oxígeno de 120 segundos. El Manantial de la Aleta es un sitio arqueológico real en el Parque Nacional Cotubanamá.'
      },
      en: {
        q: 'The Manantial de la Aleta in ArcLycée is a sacred Taíno cenote. What can you find in its diving phase?',
        options: [
          'Pirate treasures and gold chests',
          'Taíno artifacts submerged in freshwater',
          'Giant sea monsters',
          'A portal to another dimension'
        ],
        answer: 1,
        explanation: 'In the diving cenote there are 3 submerged Taíno artifacts, water currents, and a 120-second oxygen system. Manantial de la Aleta is a real archaeological site in Cotubanamá National Park.'
      },
      fr: {
        q: 'Le Manantial de la Aleta dans ArcLycée est un cénote sacré taïno. Que peut-on trouver dans sa phase de plongée ?',
        options: [
          'Des trésors pirates et des coffres d\'or',
          'Des artefacts taïnos immergés dans l\'eau douce',
          'Des monstres marins géants',
          'Un portail vers une autre dimension'
        ],
        answer: 1,
        explanation: 'Dans le cénote de plongée, il y a 3 artefacts taïnos immergés, des courants d\'eau et un système d\'oxygène de 120 secondes. Le Manantial de la Aleta est un vrai site archéologique du Parc National Cotubanamá.'
      }
    }
  },

  {
    id: 'sci-048', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué diferencia principal hay entre un cocodrilo (Crocodylus) y un aligátor (Alligator)? Pregunta de biología nivel pro.',
        options: [
          'Los cocodrilos son más pequeños',
          'Los cocodrilos tienen hocico estrecho en V, los aligátores en U',
          'Los aligátores son más agresivos',
          'No hay diferencia, son lo mismo'
        ],
        answer: 1,
        explanation: 'La forma del hocico es la diferencia clave: los cocodrilos (como el C. acutus) tienen hocico estrecho en V, mientras los aligátores lo tienen ancho en U. También los cocodrilos muestran dientes al cerrar la boca.'
      },
      en: {
        q: 'What\'s the main difference between a crocodile (Crocodylus) and an alligator (Alligator)? Pro-level biology question.',
        options: [
          'Crocodiles are smaller',
          'Crocodiles have a narrow V-shaped snout, alligators have U-shaped',
          'Alligators are more aggressive',
          'No difference, they\'re the same'
        ],
        answer: 1,
        explanation: 'Snout shape is the key difference: crocodiles (like C. acutus) have narrow V-shaped snouts, while alligators have wide U-shaped ones. Crocodiles also show teeth when their mouth is closed.'
      },
      fr: {
        q: 'Quelle est la principale différence entre un crocodile (Crocodylus) et un alligator (Alligator) ? Question bio niveau pro.',
        options: [
          'Les crocodiles sont plus petits',
          'Les crocodiles ont un museau étroit en V, les alligators en U',
          'Les alligators sont plus agressifs',
          'Aucune différence, c\'est la même chose'
        ],
        answer: 1,
        explanation: 'La forme du museau est la différence clé : les crocodiles (comme C. acutus) ont un museau étroit en V, les alligators un museau large en U. Les crocodiles montrent aussi leurs dents bouche fermée.'
      }
    }
  },

  {
    id: 'sci-049', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuál de estos ecosistemas NO se encuentra en ArcLycée?',
        options: [
          'Lago hipersalino',
          'Cenote de agua dulce',
          'Tundra ártica',
          'Arrecife de coral'
        ],
        answer: 2,
        explanation: 'ArcLycée tiene lago hipersalino (Enriquillo), cenotes (Manantial de la Aleta), arrecifes (Mundo Acuático), manglares y bosque xerofítico. ¡Pero no hay tundra en el Caribe!'
      },
      en: {
        q: 'Which of these ecosystems is NOT found in ArcLycée?',
        options: [
          'Hypersaline lake',
          'Freshwater cenote',
          'Arctic tundra',
          'Coral reef'
        ],
        answer: 2,
        explanation: 'ArcLycée has hypersaline lake (Enriquillo), cenotes (Manantial de la Aleta), reefs (Aquatic World), mangroves, and xerophytic forest. But no tundra in the Caribbean!'
      },
      fr: {
        q: 'Lequel de ces écosystèmes ne se trouve PAS dans ArcLycée ?',
        options: [
          'Lac hypersalin',
          'Cénote d\'eau douce',
          'Toundra arctique',
          'Récif corallien'
        ],
        answer: 2,
        explanation: 'ArcLycée a un lac hypersalin (Enriquillo), des cénotes (Manantial de la Aleta), des récifs (Monde Aquatique), des mangroves et une forêt xérophyte. Mais pas de toundra dans les Caraïbes !'
      }
    }
  },

  {
    id: 'sci-050', type: 'mcq',
    lang: {
      es: {
        q: 'La Cyclura cornuta es endémica de La Hispaniola. ¿Qué significa "endémica"?',
        options: [
          'Que está enferma',
          'Que solo existe naturalmente en esa región',
          'Que fue traída de otro lugar',
          'Que es muy común en todo el mundo'
        ],
        answer: 1,
        explanation: 'Endémica significa que una especie solo se encuentra naturalmente en una región específica. La Iguana Rinoceronte solo existe en La Hispaniola (RD y Haití). Si desaparece de ahí, se extingue del planeta.'
      },
      en: {
        q: 'Cyclura cornuta is endemic to Hispaniola. What does "endemic" mean?',
        options: [
          'That it\'s sick',
          'That it only exists naturally in that region',
          'That it was brought from somewhere else',
          'That it\'s very common worldwide'
        ],
        answer: 1,
        explanation: 'Endemic means a species only naturally occurs in a specific region. The Rhinoceros Iguana only exists in Hispaniola (DR and Haiti). If it disappears from there, it goes extinct from the planet.'
      },
      fr: {
        q: 'Cyclura cornuta est endémique d\'Hispaniola. Que signifie « endémique » ?',
        options: [
          'Qu\'elle est malade',
          'Qu\'elle n\'existe naturellement que dans cette région',
          'Qu\'elle a été amenée d\'ailleurs',
          'Qu\'elle est très commune dans le monde entier'
        ],
        answer: 1,
        explanation: 'Endémique signifie qu\'une espèce ne se trouve naturellement que dans une région spécifique. L\'Iguane Rhinocéros n\'existe qu\'à Hispaniola (RD et Haïti). S\'il disparaît de là, il s\'éteint de la planète.'
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // FILL IN THE BLANK (sci-051 a sci-075)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'sci-051', type: 'fill',
    lang: {
      es: {
        q: 'El nombre científico del cocodrilo americano es Crocodylus _______.',
        answer: ['acutus'],
        explanation: 'Crocodylus acutus — "acutus" significa "agudo" en latín, por su hocico puntiagudo en forma de V.'
      },
      en: {
        q: 'The scientific name of the American Crocodile is Crocodylus _______.',
        answer: ['acutus'],
        explanation: 'Crocodylus acutus — "acutus" means "sharp" in Latin, referring to its pointed V-shaped snout.'
      },
      fr: {
        q: 'Le nom scientifique du Crocodile américain est Crocodylus _______.',
        answer: ['acutus'],
        explanation: 'Crocodylus acutus — « acutus » signifie « aigu » en latin, en référence à son museau pointu en V.'
      }
    }
  },

  {
    id: 'sci-052', type: 'fill',
    lang: {
      es: {
        q: 'La técnica de giro que usan los cocodrilos para despedazar a sus presas se llama death _______.',
        answer: ['roll'],
        explanation: 'El death roll (giro mortal) es cuando el cocodrilo agarra la presa y gira violentamente sobre su eje. ¡Imagina una lavadora de 500 kilos!'
      },
      en: {
        q: 'The spinning technique crocodiles use to tear apart their prey is called the death _______.',
        answer: ['roll'],
        explanation: 'The death roll is when the crocodile grabs prey and violently spins on its axis. Imagine a 500-kilo washing machine!'
      },
      fr: {
        q: 'La technique de rotation que les crocodiles utilisent pour déchiqueter leurs proies s\'appelle le death _______.',
        answer: ['roll'],
        explanation: 'Le death roll est quand le crocodile attrape sa proie et tourne violemment sur son axe. Imaginez une machine à laver de 500 kilos !'
      }
    }
  },

  {
    id: 'sci-053', type: 'fill',
    lang: {
      es: {
        q: 'El manatí antillano pertenece al género Trichechus _______. Es un mamífero marino herbívoro en peligro.',
        answer: ['manatus'],
        explanation: 'Trichechus manatus es el manatí antillano o de las Indias Occidentales. "Manatus" viene de una lengua caribe que significa "con mamas" (por sus glándulas mamarias).'
      },
      en: {
        q: 'The West Indian Manatee belongs to the species Trichechus _______. It\'s an endangered herbivorous marine mammal.',
        answer: ['manatus'],
        explanation: 'Trichechus manatus is the West Indian Manatee. "Manatus" comes from a Carib language meaning "with breasts" (referring to its mammary glands).'
      },
      fr: {
        q: 'Le Lamantin des Antilles appartient à l\'espèce Trichechus _______. C\'est un mammifère marin herbivore en danger.',
        answer: ['manatus'],
        explanation: 'Trichechus manatus est le Lamantin des Antilles. « Manatus » vient d\'une langue caribe signifiant « avec des mamelles » (en référence à ses glandes mammaires).'
      }
    }
  },

  {
    id: 'sci-054', type: 'fill',
    lang: {
      es: {
        q: 'La tortuga _______ (Eretmochelys imbricata) está en peligro crítico y vive en arrecifes de coral.',
        answer: ['carey', 'hawksbill'],
        explanation: 'La tortuga carey debe su nombre a su pico curvo como el de un halcón. Su caparazón ha sido comercializado durante siglos, poniéndola en peligro crítico.'
      },
      en: {
        q: 'The _______ turtle (Eretmochelys imbricata) is critically endangered and lives in coral reefs.',
        answer: ['hawksbill', 'carey'],
        explanation: 'The hawksbill turtle gets its name from its curved beak like a hawk\'s. Its shell has been traded for centuries, putting it at critical risk.'
      },
      fr: {
        q: 'La tortue _______ (Eretmochelys imbricata) est en danger critique et vit dans les récifs coralliens.',
        answer: ['imbriquée', 'carey', 'hawksbill'],
        explanation: 'La tortue imbriquée doit son nom à ses écailles chevauchantes. Sa carapace a été commercialisée pendant des siècles, la mettant en danger critique.'
      }
    }
  },

  {
    id: 'sci-055', type: 'fill',
    lang: {
      es: {
        q: 'El pez _______ (Pterois volitans) es una especie invasora del Caribe con espinas venenosas.',
        answer: ['león', 'leon'],
        explanation: 'El pez león tiene espinas dorsales venenosas que usa como defensa. Su "melena" de aletas le da el nombre. ¡No es tan noble como Simba, pero impone respeto!'
      },
      en: {
        q: 'The _______ (Pterois volitans) is an invasive Caribbean species with venomous spines.',
        answer: ['lionfish', 'lion fish'],
        explanation: 'The lionfish has venomous dorsal spines used for defense. Its "mane" of fins gives it its name. Not as noble as Simba, but commands respect!'
      },
      fr: {
        q: 'Le poisson-_______ (Pterois volitans) est une espèce invasive des Caraïbes avec des épines venimeuses.',
        answer: ['lion'],
        explanation: 'Le poisson-lion a des épines dorsales venimeuses utilisées pour la défense. Sa « crinière » de nageoires lui donne son nom. Pas aussi noble que Simba, mais il impose le respect !'
      }
    }
  },

  {
    id: 'sci-056', type: 'fill',
    lang: {
      es: {
        q: 'El Lago Enriquillo es un lago _______salino, más salado que el mar.',
        answer: ['hiper', 'hipersalino'],
        explanation: 'Hipersalino significa "extremadamente salado". El Lago Enriquillo tiene una salinidad mayor que el océano, lo que limita las especies que pueden vivir ahí.'
      },
      en: {
        q: 'Lake Enriquillo is a _______saline lake, saltier than the sea.',
        answer: ['hyper', 'hypersaline'],
        explanation: 'Hypersaline means "extremely salty." Lake Enriquillo has higher salinity than the ocean, limiting the species that can live there.'
      },
      fr: {
        q: 'Le Lac Enriquillo est un lac _______salin, plus salé que la mer.',
        answer: ['hyper', 'hypersalin'],
        explanation: 'Hypersalin signifie « extrêmement salé ». Le Lac Enriquillo a une salinité supérieure à celle de l\'océan, limitant les espèces pouvant y vivre.'
      }
    }
  },

  {
    id: 'sci-057', type: 'fill',
    lang: {
      es: {
        q: 'La ballena _______ (Megaptera novaeangliae) migra a RD cada invierno para reproducirse.',
        answer: ['jorobada'],
        explanation: 'La ballena jorobada debe su nombre a la joroba prominente frente a su aleta dorsal. ¡Viaja más de 5,000 km desde el Ártico!'
      },
      en: {
        q: 'The _______ whale (Megaptera novaeangliae) migrates to DR every winter to breed.',
        answer: ['humpback'],
        explanation: 'The humpback whale gets its name from the prominent hump in front of its dorsal fin. It travels over 5,000 km from the Arctic!'
      },
      fr: {
        q: 'La baleine _______ (Megaptera novaeangliae) migre vers la RD chaque hiver pour se reproduire.',
        answer: ['à bosse'],
        explanation: 'La baleine à bosse doit son nom à la bosse proéminente devant son aileron dorsal. Elle parcourt plus de 5 000 km depuis l\'Arctique !'
      }
    }
  },

  {
    id: 'sci-058', type: 'fill',
    lang: {
      es: {
        q: 'Un _______ es una dolina de agua dulce formada por el colapso de roca caliza.',
        answer: ['cenote', 'dzonot'],
        explanation: 'La palabra "cenote" viene del maya "dzonot". Son formaciones geológicas donde la roca caliza colapsa y expone el agua subterránea. El Manantial de la Aleta es uno real en RD.'
      },
      en: {
        q: 'A _______ is a freshwater sinkhole formed by the collapse of limestone.',
        answer: ['cenote', 'dzonot'],
        explanation: 'The word "cenote" comes from the Mayan "dzonot." They are geological formations where limestone collapses and exposes groundwater. Manantial de la Aleta is a real one in DR.'
      },
      fr: {
        q: 'Un _______ est une doline d\'eau douce formée par l\'effondrement du calcaire.',
        answer: ['cénote', 'cenote', 'dzonot'],
        explanation: 'Le mot « cénote » vient du maya « dzonot ». Ce sont des formations géologiques où le calcaire s\'effondre et expose les eaux souterraines. Le Manantial de la Aleta en est un réel en RD.'
      }
    }
  },

  {
    id: 'sci-059', type: 'fill',
    lang: {
      es: {
        q: 'El pan de _______, llamado casabe, era el alimento básico de los taínos y podía conservarse por meses.',
        answer: ['yuca', 'cassava'],
        explanation: 'El casabe se hacía rallando la yuca, exprimiendo su jugo tóxico y cocinando la masa en forma de torta plana. Era como las galletas de campaña de la antigüedad.'
      },
      en: {
        q: '_______ bread, called casabe, was the Taíno staple food and could be preserved for months.',
        answer: ['cassava', 'yuca'],
        explanation: 'Casabe was made by grating cassava, squeezing out its toxic juice, and cooking the dough into flat cakes. It was like ancient campaign crackers.'
      },
      fr: {
        q: 'Le pain de _______, appelé casabe, était l\'aliment de base des Taïnos et pouvait se conserver pendant des mois.',
        answer: ['manioc', 'yuca', 'cassava'],
        explanation: 'Le casabe se faisait en râpant le manioc, en exprimant son jus toxique et en cuisant la pâte en galettes plates. C\'était comme les crackers de campagne de l\'Antiquité.'
      }
    }
  },

  {
    id: 'sci-060', type: 'fill',
    lang: {
      es: {
        q: 'El Phoenicopterus _______ es el flamenco rosado que habita en el Lago Enriquillo.',
        answer: ['ruber'],
        explanation: '"Ruber" significa "rojo" en latín. El flamenco rosado (Greater Flamingo) es la especie más grande de flamencos del mundo.'
      },
      en: {
        q: 'Phoenicopterus _______ is the Greater Flamingo that inhabits Lake Enriquillo.',
        answer: ['ruber'],
        explanation: '"Ruber" means "red" in Latin. The Greater Flamingo is the largest flamingo species in the world.'
      },
      fr: {
        q: 'Phoenicopterus _______ est le Flamant rose qui habite le Lac Enriquillo.',
        answer: ['ruber'],
        explanation: '« Ruber » signifie « rouge » en latin. Le Flamant rose est la plus grande espèce de flamants au monde.'
      }
    }
  },

  {
    id: 'sci-061', type: 'fill',
    lang: {
      es: {
        q: 'La Iguana Rinoceronte tiene ojos _______ y la de Ricord tiene ojos rojos.',
        answer: ['amarillos'],
        explanation: 'Los ojos amarillos de la Cyclura cornuta contrastan con los ojos rojos de la Cyclura ricordii. ¡Una forma rápida de distinguirlas en el campo!'
      },
      en: {
        q: 'The Rhinoceros Iguana has _______ eyes and Ricord\'s has red eyes.',
        answer: ['yellow'],
        explanation: 'The yellow eyes of Cyclura cornuta contrast with the red eyes of Cyclura ricordii. A quick way to tell them apart in the field!'
      },
      fr: {
        q: 'L\'Iguane Rhinocéros a les yeux _______ et celui de Ricord a les yeux rouges.',
        answer: ['jaunes'],
        explanation: 'Les yeux jaunes de Cyclura cornuta contrastent avec les yeux rouges de Cyclura ricordii. Une façon rapide de les distinguer sur le terrain !'
      }
    }
  },

  {
    id: 'sci-062', type: 'fill',
    lang: {
      es: {
        q: 'La culebra Haitiophis anomalus puede medir hasta _______ metros de largo.',
        answer: ['2', 'dos'],
        explanation: 'La Haitiophis anomalus (culebra corredora hispana) es la colubrida más grande de las Américas con hasta 2 metros. Pero es inofensiva para los humanos.'
      },
      en: {
        q: 'The Haitiophis anomalus snake can measure up to _______ meters long.',
        answer: ['2', 'two'],
        explanation: 'Haitiophis anomalus (Hispaniolan Racer) is the largest colubrid in the Americas at up to 2 meters. But it\'s harmless to humans.'
      },
      fr: {
        q: 'Le serpent Haitiophis anomalus peut mesurer jusqu\'à _______ mètres de long.',
        answer: ['2', 'deux'],
        explanation: 'Haitiophis anomalus (Couleuvre d\'Hispaniola) est le plus grand colubridé des Amériques avec jusqu\'à 2 mètres. Mais il est inoffensif pour les humains.'
      }
    }
  },

  {
    id: 'sci-063', type: 'fill',
    lang: {
      es: {
        q: 'Un bosque _______ es un ecosistema seco con cactus y plantas suculentas, como el que rodea el Lago Enriquillo.',
        answer: ['xerofítico', 'xerofitico', 'xerófilo', 'xerofilo'],
        explanation: 'Xerofítico viene del griego "xeros" (seco) + "phyton" (planta). Estos bosques están adaptados a la aridez extrema con cactus, suculentas y árboles espinosos.'
      },
      en: {
        q: 'A _______ forest is a dry ecosystem with cacti and succulent plants, like the one surrounding Lake Enriquillo.',
        answer: ['xerophytic', 'xerophilous'],
        explanation: 'Xerophytic comes from Greek "xeros" (dry) + "phyton" (plant). These forests are adapted to extreme aridity with cacti, succulents, and thorny trees.'
      },
      fr: {
        q: 'Une forêt _______ est un écosystème sec avec des cactus et des plantes succulentes, comme celle qui entoure le Lac Enriquillo.',
        answer: ['xérophyte', 'xerophyte', 'xérophile'],
        explanation: 'Xérophyte vient du grec « xeros » (sec) + « phyton » (plante). Ces forêts sont adaptées à l\'aridité extrême avec des cactus, succulentes et arbres épineux.'
      }
    }
  },

  {
    id: 'sci-064', type: 'fill',
    lang: {
      es: {
        q: 'La Athene _______ es el búho cavador (cucú) que nidifica bajo tierra en el Lago Enriquillo.',
        answer: ['cunicularia'],
        explanation: '"Cunicularia" viene del latín "cuniculus" (conejo/madriguera). El nombre hace referencia a que este búho vive en madrigueras subterráneas, como los conejos.'
      },
      en: {
        q: 'Athene _______ is the Burrowing Owl that nests underground at Lake Enriquillo.',
        answer: ['cunicularia'],
        explanation: '"Cunicularia" comes from Latin "cuniculus" (rabbit/burrow). The name refers to this owl living in underground burrows, like rabbits.'
      },
      fr: {
        q: 'Athene _______ est la Chevêche des terriers qui niche sous terre au Lac Enriquillo.',
        answer: ['cunicularia'],
        explanation: '« Cunicularia » vient du latin « cuniculus » (lapin/terrier). Le nom fait référence à cette chouette vivant dans des terriers souterrains, comme les lapins.'
      }
    }
  },

  {
    id: 'sci-065', type: 'fill',
    lang: {
      es: {
        q: 'Los _______ son ecosistemas costeros donde los árboles tienen raíces aéreas y protegen las costas de la erosión.',
        answer: ['manglares', 'manglar'],
        explanation: 'Los manglares son uno de los ecosistemas más productivos del planeta. Sirven de criadero para peces, protegen contra huracanes y almacenan carbono.'
      },
      en: {
        q: '_______ are coastal ecosystems where trees have aerial roots and protect shores from erosion.',
        answer: ['mangroves', 'mangrove'],
        explanation: 'Mangroves are one of the most productive ecosystems on the planet. They serve as fish nurseries, protect against hurricanes, and store carbon.'
      },
      fr: {
        q: 'Les _______ sont des écosystèmes côtiers où les arbres ont des racines aériennes et protègent les côtes de l\'érosion.',
        answer: ['mangroves', 'mangrove'],
        explanation: 'Les mangroves sont l\'un des écosystèmes les plus productifs de la planète. Elles servent de pouponnière pour les poissons, protègent contre les ouragans et stockent du carbone.'
      }
    }
  },

  {
    id: 'sci-066', type: 'fill',
    lang: {
      es: {
        q: 'El color rosado de los flamencos viene de los _______ que obtienen de las algas y crustáceos que comen.',
        answer: ['carotenoides', 'carotenoids'],
        explanation: 'Los carotenoides son pigmentos orgánicos presentes en algas y crustáceos. Los flamencos los metabolizan y depositan en sus plumas. Sin ellos, serían blancos.'
      },
      en: {
        q: 'The pink color of flamingos comes from the _______ they get from the algae and crustaceans they eat.',
        answer: ['carotenoids', 'carotenoides'],
        explanation: 'Carotenoids are organic pigments found in algae and crustaceans. Flamingos metabolize them and deposit them in their feathers. Without them, they\'d be white.'
      },
      fr: {
        q: 'La couleur rose des flamants vient des _______ qu\'ils obtiennent des algues et crustacés qu\'ils mangent.',
        answer: ['caroténoïdes', 'carotenoides'],
        explanation: 'Les caroténoïdes sont des pigments organiques présents dans les algues et crustacés. Les flamants les métabolisent et les déposent dans leurs plumes. Sans eux, ils seraient blancs.'
      }
    }
  },

  {
    id: 'sci-067', type: 'fill',
    lang: {
      es: {
        q: 'Los taínos cultivaban _______ para hacer redes de pesca, hamacas y ropa.',
        answer: ['algodón', 'algodon'],
        explanation: 'El algodón (Gossypium) fue cultivado por los taínos mucho antes de la llegada de los europeos. Era esencial para su vida cotidiana.'
      },
      en: {
        q: 'The Taínos grew _______ to make fishing nets, hammocks, and clothing.',
        answer: ['cotton'],
        explanation: 'Cotton (Gossypium) was cultivated by the Taínos long before the arrival of Europeans. It was essential for their daily life.'
      },
      fr: {
        q: 'Les Taïnos cultivaient du _______ pour fabriquer des filets de pêche, des hamacs et des vêtements.',
        answer: ['coton'],
        explanation: 'Le coton (Gossypium) était cultivé par les Taïnos bien avant l\'arrivée des Européens. Il était essentiel pour leur vie quotidienne.'
      }
    }
  },

  {
    id: 'sci-068', type: 'fill',
    lang: {
      es: {
        q: 'El coral cuerno de _______ (Acropora palmata) es una especie importante para los arrecifes del Caribe.',
        answer: ['alce'],
        explanation: 'El coral cuerno de alce (elkhorn coral) forma grandes estructuras ramificadas que proporcionan refugio a cientos de especies marinas. Está amenazado por el blanqueamiento.'
      },
      en: {
        q: '_______ coral (Acropora palmata) is an important species for Caribbean reefs.',
        answer: ['elkhorn', 'elk horn'],
        explanation: 'Elkhorn coral forms large branching structures that shelter hundreds of marine species. It\'s threatened by bleaching.'
      },
      fr: {
        q: 'Le corail corne d\'_______ (Acropora palmata) est une espèce importante pour les récifs des Caraïbes.',
        answer: ['élan', 'elan'],
        explanation: 'Le corail corne d\'élan forme de grandes structures ramifiées qui abritent des centaines d\'espèces marines. Il est menacé par le blanchissement.'
      }
    }
  },

  {
    id: 'sci-069', type: 'fill',
    lang: {
      es: {
        q: 'Megaptera _______ es el nombre científico de la ballena jorobada.',
        answer: ['novaeangliae'],
        explanation: '"Novaeangliae" significa "de Nueva Inglaterra", porque fue descrita científicamente a partir de especímenes de esa región de EE.UU.'
      },
      en: {
        q: 'Megaptera _______ is the scientific name of the humpback whale.',
        answer: ['novaeangliae'],
        explanation: '"Novaeangliae" means "of New England," because it was scientifically described from specimens from that U.S. region.'
      },
      fr: {
        q: 'Megaptera _______ est le nom scientifique de la baleine à bosse.',
        answer: ['novaeangliae'],
        explanation: '« Novaeangliae » signifie « de Nouvelle-Angleterre », car elle a été décrite scientifiquement à partir de spécimens de cette région des États-Unis.'
      }
    }
  },

  {
    id: 'sci-070', type: 'fill',
    lang: {
      es: {
        q: 'El _______ es la planta que los taínos usaban en ceremonias rituales fumándola con los behiques.',
        answer: ['tabaco', 'tobacco'],
        explanation: 'El tabaco (Nicotiana tabacum) era sagrado para los taínos. La palabra "tabaco" es de origen taíno y se ha adoptado en muchos idiomas del mundo.'
      },
      en: {
        q: '_______ is the plant the Taínos used in ritual ceremonies, smoking it with the behiques.',
        answer: ['tobacco', 'tabaco'],
        explanation: 'Tobacco (Nicotiana tabacum) was sacred to the Taínos. The word "tobacco" is of Taíno origin and has been adopted in many world languages.'
      },
      fr: {
        q: 'Le _______ est la plante que les Taïnos utilisaient dans les cérémonies rituelles, la fumant avec les behiques.',
        answer: ['tabac', 'tabaco'],
        explanation: 'Le tabac (Nicotiana tabacum) était sacré pour les Taïnos. Le mot « tabac » est d\'origine taïno et a été adopté dans de nombreuses langues du monde.'
      }
    }
  },

  {
    id: 'sci-071', type: 'fill',
    lang: {
      es: {
        q: 'En el juego, el Lago Enriquillo está a 40 metros _______ del nivel del mar.',
        answer: ['bajo', 'debajo', 'por debajo'],
        explanation: 'El Lago Enriquillo es el punto más bajo del Caribe, a -40m sobre el nivel del mar. Es una depresión geológica formada hace miles de años.'
      },
      en: {
        q: 'In the game, Lake Enriquillo is 40 meters _______ sea level.',
        answer: ['below', 'under', 'beneath'],
        explanation: 'Lake Enriquillo is the lowest point in the Caribbean, at -40m above sea level. It\'s a geological depression formed thousands of years ago.'
      },
      fr: {
        q: 'Dans le jeu, le Lac Enriquillo est à 40 mètres _______ du niveau de la mer.',
        answer: ['sous', 'en dessous', 'au-dessous'],
        explanation: 'Le Lac Enriquillo est le point le plus bas des Caraïbes, à -40m au-dessus du niveau de la mer. C\'est une dépression géologique formée il y a des milliers d\'années.'
      }
    }
  },

  {
    id: 'sci-072', type: 'fill',
    lang: {
      es: {
        q: 'La Isla _______ (Guarizacca en taíno) está dentro del Lago Enriquillo y alberga cocodrilos e iguanas.',
        answer: ['Cabritos'],
        explanation: 'La Isla Cabritos es una isla dentro del Lago Enriquillo donde conviven cocodrilos americanos, iguanas rinoceronte e iguanas de Ricord. Los taínos la llamaban Guarizacca.'
      },
      en: {
        q: '_______ Island (Guarizacca in Taíno) is inside Lake Enriquillo and hosts crocodiles and iguanas.',
        answer: ['Cabritos'],
        explanation: 'Cabritos Island is an island within Lake Enriquillo where American Crocodiles, Rhinoceros Iguanas, and Ricord\'s Iguanas coexist. The Taínos called it Guarizacca.'
      },
      fr: {
        q: 'L\'Île _______ (Guarizacca en taïno) se trouve dans le Lac Enriquillo et abrite crocodiles et iguanes.',
        answer: ['Cabritos'],
        explanation: 'L\'Île Cabritos est une île au sein du Lac Enriquillo où cohabitent Crocodiles américains, Iguanes Rhinocéros et Iguanes de Ricord. Les Taïnos l\'appelaient Guarizacca.'
      }
    }
  },

  {
    id: 'sci-073', type: 'fill',
    lang: {
      es: {
        q: 'El Pterois _______ es el nombre científico del pez león.',
        answer: ['volitans'],
        explanation: '"Volitans" significa "volador" en latín, por sus aletas pectorales extendidas que parecen alas. Irónico para un pez, ¿no?'
      },
      en: {
        q: 'Pterois _______ is the scientific name of the lionfish.',
        answer: ['volitans'],
        explanation: '"Volitans" means "flying" in Latin, due to its extended pectoral fins that look like wings. Ironic for a fish, right?'
      },
      fr: {
        q: 'Pterois _______ est le nom scientifique du poisson-lion.',
        answer: ['volitans'],
        explanation: '« Volitans » signifie « volant » en latin, en raison de ses nageoires pectorales étendues qui ressemblent à des ailes. Ironique pour un poisson, non ?'
      }
    }
  },

  {
    id: 'sci-074', type: 'fill',
    lang: {
      es: {
        q: 'Los taínos cultivaban maíz, yuca, batata, ají, tabaco y _______.',
        answer: ['algodón', 'algodon'],
        explanation: 'Los 6 cultivos principales taínos eran: yuca, maíz, batata, ají, tabaco y algodón. Una agricultura diversificada y sostenible.'
      },
      en: {
        q: 'The Taínos grew corn, cassava, sweet potato, chili pepper, tobacco, and _______.',
        answer: ['cotton'],
        explanation: 'The 6 main Taíno crops were: cassava, corn, sweet potato, chili pepper, tobacco, and cotton. A diversified and sustainable agriculture.'
      },
      fr: {
        q: 'Les Taïnos cultivaient du maïs, du manioc, de la patate douce, du piment, du tabac et du _______.',
        answer: ['coton'],
        explanation: 'Les 6 principales cultures taïnos étaient : manioc, maïs, patate douce, piment, tabac et coton. Une agriculture diversifiée et durable.'
      }
    }
  },

  {
    id: 'sci-075', type: 'fill',
    lang: {
      es: {
        q: 'Cyclura _______ es la iguana con cuernos nasales endémica de La Hispaniola.',
        answer: ['cornuta'],
        explanation: '"Cornuta" viene del latín "cornu" (cuerno). Los cuernos nasales la distinguen de otras iguanas y le dan un aspecto prehistórico.'
      },
      en: {
        q: 'Cyclura _______ is the iguana with nasal horns endemic to Hispaniola.',
        answer: ['cornuta'],
        explanation: '"Cornuta" comes from Latin "cornu" (horn). The nasal horns distinguish it from other iguanas and give it a prehistoric look.'
      },
      fr: {
        q: 'Cyclura _______ est l\'iguane à cornes nasales endémique d\'Hispaniola.',
        answer: ['cornuta'],
        explanation: '« Cornuta » vient du latin « cornu » (corne). Les cornes nasales la distinguent des autres iguanes et lui donnent un aspect préhistorique.'
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // MATCH (sci-076 a sci-100)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'sci-076', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada animal del Lago Enriquillo con su nombre científico. ¡Es como un Pokédex real!',
        pairs: [
          ['Cocodrilo americano', 'Crocodylus acutus'],
          ['Iguana Rinoceronte', 'Cyclura cornuta'],
          ['Iguana de Ricord', 'Cyclura ricordii'],
          ['Flamenco rosado', 'Phoenicopterus ruber'],
          ['Cucú (búho cavador)', 'Athene cunicularia']
        ],
        explanation: 'El Lago Enriquillo es un hotspot de biodiversidad con varias especies endémicas y amenazadas conviviendo en un ecosistema único.'
      },
      en: {
        q: 'Match each Lake Enriquillo animal with its scientific name. It\'s like a real-life Pokédex!',
        pairs: [
          ['American Crocodile', 'Crocodylus acutus'],
          ['Rhinoceros Iguana', 'Cyclura cornuta'],
          ['Ricord\'s Iguana', 'Cyclura ricordii'],
          ['Greater Flamingo', 'Phoenicopterus ruber'],
          ['Burrowing Owl', 'Athene cunicularia']
        ],
        explanation: 'Lake Enriquillo is a biodiversity hotspot with several endemic and threatened species coexisting in a unique ecosystem.'
      },
      fr: {
        q: 'Associe chaque animal du Lac Enriquillo à son nom scientifique. C\'est comme un Pokédex réel !',
        pairs: [
          ['Crocodile américain', 'Crocodylus acutus'],
          ['Iguane Rhinocéros', 'Cyclura cornuta'],
          ['Iguane de Ricord', 'Cyclura ricordii'],
          ['Flamant rose', 'Phoenicopterus ruber'],
          ['Chevêche des terriers', 'Athene cunicularia']
        ],
        explanation: 'Le Lac Enriquillo est un point chaud de biodiversité avec plusieurs espèces endémiques et menacées cohabitant dans un écosystème unique.'
      }
    }
  },

  {
    id: 'sci-077', type: 'match',
    lang: {
      es: {
        q: 'Relaciona cada especie marina con su estado de conservación. Nivel: biólogo marino.',
        pairs: [
          ['Tortuga carey', 'En peligro crítico'],
          ['Manatí antillano', 'En peligro'],
          ['Pez león', 'Invasora (no amenazada)'],
          ['Ballena jorobada', 'Vulnerable']
        ],
        explanation: 'La tortuga carey y el manatí están en grave riesgo de extinción. La ballena jorobada se ha recuperado parcialmente. El pez león es todo lo contrario: demasiado exitoso donde no debería estar.'
      },
      en: {
        q: 'Match each marine species with its conservation status. Level: marine biologist.',
        pairs: [
          ['Hawksbill Turtle', 'Critically Endangered'],
          ['West Indian Manatee', 'Endangered'],
          ['Lionfish', 'Invasive (not threatened)'],
          ['Humpback Whale', 'Vulnerable']
        ],
        explanation: 'The Hawksbill Turtle and manatee are at severe risk of extinction. The humpback whale has partially recovered. The lionfish is the opposite: too successful where it shouldn\'t be.'
      },
      fr: {
        q: 'Associe chaque espèce marine à son statut de conservation. Niveau : biologiste marin.',
        pairs: [
          ['Tortue imbriquée', 'En danger critique'],
          ['Lamantin des Antilles', 'En danger'],
          ['Poisson-lion', 'Invasif (non menacé)'],
          ['Baleine à bosse', 'Vulnérable']
        ],
        explanation: 'La tortue imbriquée et le lamantin sont en grave risque d\'extinction. La baleine à bosse s\'est partiellement rétablie. Le poisson-lion est l\'opposé : trop de succès là où il ne devrait pas être.'
      }
    }
  },

  {
    id: 'sci-078', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada tipo de coral con su descripción. Son como los biomas de Minecraft, pero bajo el agua.',
        pairs: [
          ['Coral cerebro', 'Surcos que parecen circunvoluciones cerebrales'],
          ['Coral cuerno de alce', 'Ramas grandes como astas de alce'],
          ['Gorgonia (abanico)', 'Forma plana de abanico, colonia de pólipos'],
          ['Coral mesa', 'Estructura horizontal plana como una mesa']
        ],
        explanation: 'Cada tipo de coral tiene una forma y función única en el ecosistema del arrecife. Juntos forman la estructura 3D que alberga miles de especies.'
      },
      en: {
        q: 'Match each coral type with its description. They\'re like Minecraft biomes, but underwater.',
        pairs: [
          ['Brain coral', 'Grooves resembling brain convolutions'],
          ['Elkhorn coral', 'Large branches like elk antlers'],
          ['Sea fan (gorgonian)', 'Flat fan shape, colony of polyps'],
          ['Table coral', 'Flat horizontal structure like a table']
        ],
        explanation: 'Each coral type has a unique shape and role in the reef ecosystem. Together they form the 3D structure that hosts thousands of species.'
      },
      fr: {
        q: 'Associe chaque type de corail à sa description. Ce sont comme les biomes de Minecraft, mais sous l\'eau.',
        pairs: [
          ['Corail cerveau', 'Sillons ressemblant aux circonvolutions cérébrales'],
          ['Corail corne d\'élan', 'Grandes branches comme des bois d\'élan'],
          ['Gorgone (éventail)', 'Forme plate d\'éventail, colonie de polypes'],
          ['Corail table', 'Structure horizontale plate comme une table']
        ],
        explanation: 'Chaque type de corail a une forme et un rôle unique dans l\'écosystème récifal. Ensemble, ils forment la structure 3D qui abrite des milliers d\'espèces.'
      }
    }
  },

  {
    id: 'sci-079', type: 'match',
    lang: {
      es: {
        q: 'Relaciona cada cultivo taíno con su uso principal. ¡La dieta taína era más variada de lo que crees!',
        pairs: [
          ['Yuca', 'Pan (casabe), alimento básico'],
          ['Algodón', 'Textiles: hamacas, redes, ropa'],
          ['Tabaco', 'Ceremonias religiosas rituales'],
          ['Ají', 'Condimento para comidas'],
          ['Batata', 'Alimento cocido o asado']
        ],
        explanation: 'Los taínos tenían una agricultura diversificada y sofisticada. Cada cultivo cumplía un rol específico en su sociedad.'
      },
      en: {
        q: 'Match each Taíno crop with its main use. The Taíno diet was more varied than you think!',
        pairs: [
          ['Cassava', 'Bread (casabe), staple food'],
          ['Cotton', 'Textiles: hammocks, nets, clothing'],
          ['Tobacco', 'Religious ritual ceremonies'],
          ['Chili pepper', 'Food seasoning'],
          ['Sweet potato', 'Cooked or roasted food']
        ],
        explanation: 'The Taínos had a diversified and sophisticated agriculture. Each crop served a specific role in their society.'
      },
      fr: {
        q: 'Associe chaque culture taïno à son usage principal. La diète taïno était plus variée que tu ne le penses !',
        pairs: [
          ['Manioc', 'Pain (casabe), aliment de base'],
          ['Coton', 'Textiles : hamacs, filets, vêtements'],
          ['Tabac', 'Cérémonies religieuses rituelles'],
          ['Piment', 'Assaisonnement pour les repas'],
          ['Patate douce', 'Aliment cuit ou rôti']
        ],
        explanation: 'Les Taïnos avaient une agriculture diversifiée et sophistiquée. Chaque culture remplissait un rôle spécifique dans leur société.'
      }
    }
  },

  {
    id: 'sci-080', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada ecosistema con su característica principal. ¡Geografía level up!',
        pairs: [
          ['Lago hipersalino', 'Más salado que el mar, bajo el nivel del mar'],
          ['Arrecife de coral', 'Estructuras de carbonato construidas por pólipos'],
          ['Cenote', 'Agua dulce en roca caliza colapsada'],
          ['Manglar', 'Árboles con raíces aéreas en zona costera'],
          ['Bosque xerofítico', 'Cactus y suculentas en clima árido']
        ],
        explanation: 'República Dominicana tiene una increíble diversidad de ecosistemas en un territorio relativamente pequeño. Todos aparecen en ArcLycée.'
      },
      en: {
        q: 'Match each ecosystem with its main characteristic. Geography level up!',
        pairs: [
          ['Hypersaline lake', 'Saltier than the sea, below sea level'],
          ['Coral reef', 'Carbonate structures built by polyps'],
          ['Cenote', 'Freshwater in collapsed limestone'],
          ['Mangrove', 'Trees with aerial roots in coastal zone'],
          ['Xerophytic forest', 'Cacti and succulents in arid climate']
        ],
        explanation: 'The Dominican Republic has incredible ecosystem diversity in a relatively small territory. All of them appear in ArcLycée.'
      },
      fr: {
        q: 'Associe chaque écosystème à sa caractéristique principale. Géographie level up !',
        pairs: [
          ['Lac hypersalin', 'Plus salé que la mer, sous le niveau de la mer'],
          ['Récif corallien', 'Structures de carbonate construites par des polypes'],
          ['Cénote', 'Eau douce dans du calcaire effondré'],
          ['Mangrove', 'Arbres à racines aériennes en zone côtière'],
          ['Forêt xérophyte', 'Cactus et succulentes en climat aride']
        ],
        explanation: 'La République dominicaine a une incroyable diversité d\'écosystèmes sur un territoire relativement petit. Tous apparaissent dans ArcLycée.'
      }
    }
  },

  {
    id: 'sci-081', type: 'match',
    lang: {
      es: {
        q: 'Relaciona cada animal con su tipo de alimentación. ¿Eres lo que comes?',
        pairs: [
          ['Manatí', 'Herbívoro (pastos marinos)'],
          ['Cocodrilo americano', 'Carnívoro (peces, aves, mamíferos)'],
          ['Flamenco rosado', 'Filtrador (algas y crustáceos)'],
          ['Pez león', 'Carnívoro (peces pequeños e invertebrados)']
        ],
        explanation: 'Cada animal ocupa un nicho ecológico diferente. El manatí es herbívoro, el flamenco filtra el agua, y tanto el cocodrilo como el pez león son depredadores.'
      },
      en: {
        q: 'Match each animal with its feeding type. You are what you eat?',
        pairs: [
          ['Manatee', 'Herbivore (seagrass)'],
          ['American Crocodile', 'Carnivore (fish, birds, mammals)'],
          ['Greater Flamingo', 'Filter feeder (algae and crustaceans)'],
          ['Lionfish', 'Carnivore (small fish and invertebrates)']
        ],
        explanation: 'Each animal occupies a different ecological niche. The manatee is herbivorous, the flamingo filters water, and both the crocodile and lionfish are predators.'
      },
      fr: {
        q: 'Associe chaque animal à son type d\'alimentation. On est ce qu\'on mange ?',
        pairs: [
          ['Lamantin', 'Herbivore (herbes marines)'],
          ['Crocodile américain', 'Carnivore (poissons, oiseaux, mammifères)'],
          ['Flamant rose', 'Filtreur (algues et crustacés)'],
          ['Poisson-lion', 'Carnivore (petits poissons et invertébrés)']
        ],
        explanation: 'Chaque animal occupe une niche écologique différente. Le lamantin est herbivore, le flamant filtre l\'eau, et le crocodile comme le poisson-lion sont des prédateurs.'
      }
    }
  },

  {
    id: 'sci-082', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada tortuga marina del juego con su nombre científico. ¡Tortuga-dex completo!',
        pairs: [
          ['Carey', 'Eretmochelys imbricata'],
          ['Tinglar', 'Dermochelys coriacea'],
          ['Caguama', 'Caretta caretta'],
          ['Verde', 'Chelonia mydas']
        ],
        explanation: 'Las 4 tortugas marinas del juego representan especies reales que habitan las aguas de República Dominicana. Todas están amenazadas o en peligro.'
      },
      en: {
        q: 'Match each sea turtle from the game with its scientific name. Turtle-dex complete!',
        pairs: [
          ['Hawksbill', 'Eretmochelys imbricata'],
          ['Leatherback', 'Dermochelys coriacea'],
          ['Loggerhead', 'Caretta caretta'],
          ['Green', 'Chelonia mydas']
        ],
        explanation: 'The 4 sea turtles in the game represent real species that inhabit Dominican Republic waters. All are threatened or endangered.'
      },
      fr: {
        q: 'Associe chaque tortue marine du jeu à son nom scientifique. Tortue-dex complet !',
        pairs: [
          ['Imbriquée (Carey)', 'Eretmochelys imbricata'],
          ['Luth (Tinglar)', 'Dermochelys coriacea'],
          ['Caouanne (Caguama)', 'Caretta caretta'],
          ['Verte', 'Chelonia mydas']
        ],
        explanation: 'Les 4 tortues marines du jeu représentent des espèces réelles qui habitent les eaux de la République dominicaine. Toutes sont menacées ou en danger.'
      }
    }
  },

  {
    id: 'sci-083', type: 'match',
    lang: {
      es: {
        q: 'Relaciona cada rasgo físico con la especie de iguana correcta. ¡Nivel detective de la naturaleza!',
        pairs: [
          ['Cuernos nasales', 'Iguana Rinoceronte (Cyclura cornuta)'],
          ['Ojos rojos', 'Iguana de Ricord (Cyclura ricordii)'],
          ['Ojos amarillos', 'Iguana Rinoceronte (Cyclura cornuta)'],
          ['En peligro crítico', 'Iguana de Ricord (Cyclura ricordii)']
        ],
        explanation: 'La Iguana Rinoceronte tiene cuernos nasales y ojos amarillos. La de Ricord tiene ojos rojos y está en peligro crítico de extinción.'
      },
      en: {
        q: 'Match each physical trait with the correct iguana species. Nature detective level!',
        pairs: [
          ['Nasal horns', 'Rhinoceros Iguana (Cyclura cornuta)'],
          ['Red eyes', 'Ricord\'s Iguana (Cyclura ricordii)'],
          ['Yellow eyes', 'Rhinoceros Iguana (Cyclura cornuta)'],
          ['Critically endangered', 'Ricord\'s Iguana (Cyclura ricordii)']
        ],
        explanation: 'The Rhinoceros Iguana has nasal horns and yellow eyes. Ricord\'s has red eyes and is critically endangered.'
      },
      fr: {
        q: 'Associe chaque trait physique à la bonne espèce d\'iguane. Niveau détective de la nature !',
        pairs: [
          ['Cornes nasales', 'Iguane Rhinocéros (Cyclura cornuta)'],
          ['Yeux rouges', 'Iguane de Ricord (Cyclura ricordii)'],
          ['Yeux jaunes', 'Iguane Rhinocéros (Cyclura cornuta)'],
          ['En danger critique', 'Iguane de Ricord (Cyclura ricordii)']
        ],
        explanation: 'L\'Iguane Rhinocéros a des cornes nasales et des yeux jaunes. Celui de Ricord a les yeux rouges et est en danger critique d\'extinction.'
      }
    }
  },

  {
    id: 'sci-084', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada peligro del Santuario del Manatí con su tipo de ataque — como un bestiario de RPG:',
        pairs: [
          ['Tiburón', 'Mordida'],
          ['Medusa', 'Picadura'],
          ['Lancha rápida', 'Choque'],
          ['Falta de O₂', 'Asfixia']
        ],
        explanation: 'Cada peligro del santuario simula amenazas reales para los buzos: depredadores que muerden, medusas que pican, lanchas que golpean y la falta de oxígeno que asfixia.'
      },
      en: {
        q: 'Match each Manatee Sanctuary danger with its type of attack — like an RPG bestiary:',
        pairs: [
          ['Shark', 'Bite'],
          ['Jellyfish', 'Sting'],
          ['Speedboat', 'Crash'],
          ['Lack of O₂', 'Suffocation']
        ],
        explanation: 'Each sanctuary danger simulates real threats to divers: predators that bite, jellyfish that sting, boats that crash into you, and lack of oxygen that suffocates.'
      },
      fr: {
        q: 'Associe chaque danger du Sanctuaire du Lamantin à son type d\'attaque — comme un bestiaire de RPG :',
        pairs: [
          ['Requin', 'Morsure'],
          ['Méduse', 'Piqûre'],
          ['Bateau rapide', 'Collision'],
          ['Manque d\'O₂', 'Asphyxie']
        ],
        explanation: 'Chaque danger du sanctuaire simule des menaces réelles pour les plongeurs : prédateurs qui mordent, méduses qui piquent, bateaux qui percutent et manque d\'oxygène qui asphyxie.'
      }
    }
  },

  {
    id: 'sci-085', type: 'match',
    lang: {
      es: {
        q: 'Relaciona cada serpiente/reptil con su característica. ¡Herpetología 101!',
        pairs: [
          ['Haitiophis anomalus', 'Colubrida más grande de las Américas (2m)'],
          ['Crocodylus acutus', 'Death roll para despedazar presas'],
          ['Cyclura cornuta', 'Cuernos nasales como rinoceronte'],
          ['Cyclura ricordii', 'Ojos rojos, en peligro crítico']
        ],
        explanation: 'La Hispaniola tiene una increíble diversidad de reptiles endémicos. Muchos están amenazados por la pérdida de hábitat.'
      },
      en: {
        q: 'Match each snake/reptile with its characteristic. Herpetology 101!',
        pairs: [
          ['Haitiophis anomalus', 'Largest colubrid in the Americas (2m)'],
          ['Crocodylus acutus', 'Death roll to tear apart prey'],
          ['Cyclura cornuta', 'Nasal horns like a rhinoceros'],
          ['Cyclura ricordii', 'Red eyes, critically endangered']
        ],
        explanation: 'Hispaniola has incredible diversity of endemic reptiles. Many are threatened by habitat loss.'
      },
      fr: {
        q: 'Associe chaque serpent/reptile à sa caractéristique. Herpétologie 101 !',
        pairs: [
          ['Haitiophis anomalus', 'Plus grand colubridé des Amériques (2m)'],
          ['Crocodylus acutus', 'Death roll pour déchiqueter les proies'],
          ['Cyclura cornuta', 'Cornes nasales comme un rhinocéros'],
          ['Cyclura ricordii', 'Yeux rouges, en danger critique']
        ],
        explanation: 'Hispaniola possède une incroyable diversité de reptiles endémiques. Beaucoup sont menacés par la perte d\'habitat.'
      }
    }
  },

  {
    id: 'sci-086', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada acción ecológica del juego con el nivel donde se realiza.',
        pairs: [
          ['Liberar un manatí', 'Santuario del Manatí'],
          ['Limpiar un arrecife', 'Santuario del Manatí'],
          ['Controlar pez león', 'Mundo Acuático (combate)'],
          ['Recoger artefactos del cenote', 'Manantial de la Aleta']
        ],
        explanation: 'ArcLycée integra acciones de conservación real en su gameplay. Cada mundo enseña sobre un desafío ecológico diferente.'
      },
      en: {
        q: 'Match each ecological action in the game with the level where it happens.',
        pairs: [
          ['Free a manatee', 'Manatee Sanctuary'],
          ['Clean a reef', 'Manatee Sanctuary'],
          ['Control lionfish', 'Aquatic World (combat)'],
          ['Collect cenote artifacts', 'Manantial de la Aleta']
        ],
        explanation: 'ArcLycée integrates real conservation actions into its gameplay. Each world teaches about a different ecological challenge.'
      },
      fr: {
        q: 'Associe chaque action écologique du jeu au niveau où elle se déroule.',
        pairs: [
          ['Libérer un lamantin', 'Sanctuaire du Lamantin'],
          ['Nettoyer un récif', 'Sanctuaire du Lamantin'],
          ['Contrôler le poisson-lion', 'Monde Aquatique (combat)'],
          ['Collecter des artefacts du cénote', 'Manantial de la Aleta']
        ],
        explanation: 'ArcLycée intègre des actions de conservation réelles dans son gameplay. Chaque monde enseigne un défi écologique différent.'
      }
    }
  },

  {
    id: 'sci-087', type: 'match',
    lang: {
      es: {
        q: 'Relaciona cada cactus con su descripción. Flora del bosque xerofítico.',
        pairs: [
          ['Pilosocereus polygonus', 'Cactus columnar alto, tipo poste'],
          ['Harrisia nashii', 'Pitahaya, produce frutos comestibles'],
          ['Opuntia', 'Cactus de paletas con espinas (tuna)'],
          ['Melocactus', 'Cactus redondo con "gorro" rojo (cefalio)']
        ],
        explanation: 'El bosque xerofítico dominicano tiene una flora de cactus diversa y fascinante. Muchas especies son endémicas de La Hispaniola.'
      },
      en: {
        q: 'Match each cactus with its description. Xerophytic forest flora.',
        pairs: [
          ['Pilosocereus polygonus', 'Tall columnar cactus, post-like'],
          ['Harrisia nashii', 'Pitahaya, produces edible fruit'],
          ['Opuntia', 'Paddle cactus with spines (prickly pear)'],
          ['Melocactus', 'Round cactus with red "cap" (cephalium)']
        ],
        explanation: 'The Dominican xerophytic forest has diverse and fascinating cactus flora. Many species are endemic to Hispaniola.'
      },
      fr: {
        q: 'Associe chaque cactus à sa description. Flore de la forêt xérophyte.',
        pairs: [
          ['Pilosocereus polygonus', 'Grand cactus colonnaire, type poteau'],
          ['Harrisia nashii', 'Pitahaya, produit des fruits comestibles'],
          ['Opuntia', 'Cactus à raquettes avec des épines (figuier de Barbarie)'],
          ['Melocactus', 'Cactus rond avec un « bonnet » rouge (céphalium)']
        ],
        explanation: 'La forêt xérophyte dominicaine possède une flore de cactus diversifiée et fascinante. De nombreuses espèces sont endémiques d\'Hispaniola.'
      }
    }
  },

  {
    id: 'sci-088', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada especie marina del juego con su comportamiento en ArcLycée.',
        pairs: [
          ['Tortugas marinas', 'Nadan con aletas animadas, 4 especies'],
          ['Pez león', 'Patrulla en figura de 8'],
          ['Ballenas jorobadas', 'Siguen paths Bezier continuos'],
          ['Medusas', 'Movimiento sinusoidal entre waypoints']
        ],
        explanation: 'Cada especie en el juego tiene un patrón de movimiento inspirado en su comportamiento real. Los programadores estudiaron biología marina para hacerlo.'
      },
      en: {
        q: 'Match each marine species in the game with its behavior in ArcLycée.',
        pairs: [
          ['Sea turtles', 'Swim with animated fins, 4 species'],
          ['Lionfish', 'Patrols in figure-8 pattern'],
          ['Humpback whales', 'Follow continuous Bezier paths'],
          ['Jellyfish', 'Sinusoidal movement between waypoints']
        ],
        explanation: 'Each species in the game has a movement pattern inspired by its real behavior. The programmers studied marine biology to make it.'
      },
      fr: {
        q: 'Associe chaque espèce marine du jeu à son comportement dans ArcLycée.',
        pairs: [
          ['Tortues marines', 'Nagent avec des nageoires animées, 4 espèces'],
          ['Poisson-lion', 'Patrouille en figure de 8'],
          ['Baleines à bosse', 'Suivent des paths Bézier continus'],
          ['Méduses', 'Mouvement sinusoïdal entre waypoints']
        ],
        explanation: 'Chaque espèce du jeu a un patron de mouvement inspiré de son comportement réel. Les programmeurs ont étudié la biologie marine pour le créer.'
      }
    }
  },

  {
    id: 'sci-089', type: 'match',
    lang: {
      es: {
        q: 'Relaciona cada animal con la razón por la que es especial en el Caribe. ¡Récords naturales!',
        pairs: [
          ['Crocodylus acutus', 'Mayor población del Caribe en Enriquillo'],
          ['Haitiophis anomalus', 'Colubrida más grande de las Américas'],
          ['Cyclura ricordii', 'Una de las iguanas más raras del mundo'],
          ['Megaptera novaeangliae', 'Migración de 5,000+ km hasta RD']
        ],
        explanation: 'Cada una de estas especies tiene un récord o distinción que la hace única en la región del Caribe y las Américas.'
      },
      en: {
        q: 'Match each animal with why it\'s special in the Caribbean. Natural records!',
        pairs: [
          ['Crocodylus acutus', 'Largest Caribbean population at Enriquillo'],
          ['Haitiophis anomalus', 'Largest colubrid in the Americas'],
          ['Cyclura ricordii', 'One of the rarest iguanas in the world'],
          ['Megaptera novaeangliae', 'Migration of 5,000+ km to DR']
        ],
        explanation: 'Each of these species has a record or distinction that makes it unique in the Caribbean and the Americas.'
      },
      fr: {
        q: 'Associe chaque animal à la raison pour laquelle il est spécial dans les Caraïbes. Records naturels !',
        pairs: [
          ['Crocodylus acutus', 'Plus grande population caribéenne à Enriquillo'],
          ['Haitiophis anomalus', 'Plus grand colubridé des Amériques'],
          ['Cyclura ricordii', 'Un des iguanes les plus rares au monde'],
          ['Megaptera novaeangliae', 'Migration de 5 000+ km vers la RD']
        ],
        explanation: 'Chacune de ces espèces détient un record ou une distinction qui la rend unique dans les Caraïbes et les Amériques.'
      }
    }
  },

  {
    id: 'sci-090', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada significado en latín/griego con el nombre científico correcto.',
        pairs: [
          ['"Agudo" (hocico puntiagudo)', 'acutus (Crocodylus)'],
          ['"Con cuernos"', 'cornuta (Cyclura)'],
          ['"Volador" (aletas como alas)', 'volitans (Pterois)'],
          ['"De Nueva Inglaterra"', 'novaeangliae (Megaptera)'],
          ['"De madriguera" (como conejo)', 'cunicularia (Athene)']
        ],
        explanation: 'Los nombres científicos en latín y griego describen características del animal. Aprender su significado ayuda a recordar las especies.'
      },
      en: {
        q: 'Match each Latin/Greek meaning with the correct scientific name.',
        pairs: [
          ['"Sharp" (pointed snout)', 'acutus (Crocodylus)'],
          ['"Horned"', 'cornuta (Cyclura)'],
          ['"Flying" (fins like wings)', 'volitans (Pterois)'],
          ['"Of New England"', 'novaeangliae (Megaptera)'],
          ['"Of burrows" (like rabbit)', 'cunicularia (Athene)']
        ],
        explanation: 'Latin and Greek scientific names describe characteristics of the animal. Learning their meaning helps remember the species.'
      },
      fr: {
        q: 'Associe chaque signification latine/grecque au bon nom scientifique.',
        pairs: [
          ['« Aigu » (museau pointu)', 'acutus (Crocodylus)'],
          ['« Cornu »', 'cornuta (Cyclura)'],
          ['« Volant » (nageoires comme des ailes)', 'volitans (Pterois)'],
          ['« De Nouvelle-Angleterre »', 'novaeangliae (Megaptera)'],
          ['« De terriers » (comme lapin)', 'cunicularia (Athene)']
        ],
        explanation: 'Les noms scientifiques en latin et grec décrivent des caractéristiques de l\'animal. Apprendre leur signification aide à retenir les espèces.'
      }
    }
  },

  {
    id: 'sci-091', type: 'match',
    lang: {
      es: {
        q: 'Relaciona cada problema ambiental con la solución que propone ArcLycée.',
        pairs: [
          ['Manatí atrapado', 'Liberación directa en el santuario'],
          ['Arrecife contaminado', 'Limpieza del arrecife'],
          ['Invasión de pez león', 'Pesca, trampas y alertas a buzos'],
          ['Artefactos taínos sumergidos', 'Arqueología subacuática responsable']
        ],
        explanation: 'Cada problema ambiental en el juego tiene soluciones basadas en prácticas reales de conservación marina y arqueología.'
      },
      en: {
        q: 'Match each environmental problem with the solution ArcLycée proposes.',
        pairs: [
          ['Trapped manatee', 'Direct release in the sanctuary'],
          ['Contaminated reef', 'Reef cleaning'],
          ['Lionfish invasion', 'Fishing, traps, and diver alerts'],
          ['Submerged Taíno artifacts', 'Responsible underwater archaeology']
        ],
        explanation: 'Each environmental problem in the game has solutions based on real marine conservation and archaeology practices.'
      },
      fr: {
        q: 'Associe chaque problème environnemental à la solution proposée par ArcLycée.',
        pairs: [
          ['Lamantin piégé', 'Libération directe dans le sanctuaire'],
          ['Récif contaminé', 'Nettoyage du récif'],
          ['Invasion de poisson-lion', 'Pêche, pièges et alertes aux plongeurs'],
          ['Artefacts taïnos immergés', 'Archéologie sous-marine responsable']
        ],
        explanation: 'Chaque problème environnemental du jeu a des solutions basées sur de vraies pratiques de conservation marine et d\'archéologie.'
      }
    }
  },

  {
    id: 'sci-092', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada fase del Manantial de la Aleta con su mecánica de juego.',
        pairs: [
          ['Rapel por pozo vertical', 'Flechas de dirección, medidor de agarre'],
          ['Cueva oscura', 'Linterna con máscara radial de luz'],
          ['Buceo en cenote', 'Barra de O₂ 120s, corrientes, artefactos'],
          ['Hub principal', 'Gestión de fases y prerequisitos']
        ],
        explanation: 'El Manantial de la Aleta tiene 3 fases con mecánicas únicas, inspiradas en la exploración real de cenotes por arqueólogos.'
      },
      en: {
        q: 'Match each phase of Manantial de la Aleta with its game mechanic.',
        pairs: [
          ['Vertical shaft rappel', 'Direction arrows, grip meter'],
          ['Dark cave', 'Flashlight with radial light mask'],
          ['Cenote diving', 'O₂ bar 120s, currents, artifacts'],
          ['Main hub', 'Phase management and prerequisites']
        ],
        explanation: 'Manantial de la Aleta has 3 phases with unique mechanics, inspired by real cenote exploration by archaeologists.'
      },
      fr: {
        q: 'Associe chaque phase du Manantial de la Aleta à sa mécanique de jeu.',
        pairs: [
          ['Rappel dans le puits vertical', 'Flèches de direction, jauge d\'adhérence'],
          ['Grotte obscure', 'Lampe torche avec masque de lumière radial'],
          ['Plongée dans le cénote', 'Barre d\'O₂ 120s, courants, artefacts'],
          ['Hub principal', 'Gestion des phases et prérequis']
        ],
        explanation: 'Le Manantial de la Aleta a 3 phases avec des mécaniques uniques, inspirées de l\'exploration réelle des cénotes par les archéologues.'
      }
    }
  },

  {
    id: 'sci-093', type: 'match',
    lang: {
      es: {
        q: 'Relaciona cada animal con su clase taxonómica. ¡Taxonomía como en las clases de bio!',
        pairs: [
          ['Manatí', 'Mammalia (mamífero)'],
          ['Cocodrilo', 'Reptilia (reptil)'],
          ['Flamenco', 'Aves (ave)'],
          ['Pez león', 'Actinopterygii (pez óseo)'],
          ['Tortuga carey', 'Reptilia (reptil)']
        ],
        explanation: 'La clasificación taxonómica agrupa a los seres vivos por parentesco evolutivo. Saber la clase de un animal ayuda a entender sus características.'
      },
      en: {
        q: 'Match each animal with its taxonomic class. Taxonomy like in bio class!',
        pairs: [
          ['Manatee', 'Mammalia (mammal)'],
          ['Crocodile', 'Reptilia (reptile)'],
          ['Flamingo', 'Aves (bird)'],
          ['Lionfish', 'Actinopterygii (bony fish)'],
          ['Hawksbill Turtle', 'Reptilia (reptile)']
        ],
        explanation: 'Taxonomic classification groups living things by evolutionary kinship. Knowing an animal\'s class helps understand its characteristics.'
      },
      fr: {
        q: 'Associe chaque animal à sa classe taxonomique. Taxonomie comme en cours de bio !',
        pairs: [
          ['Lamantin', 'Mammalia (mammifère)'],
          ['Crocodile', 'Reptilia (reptile)'],
          ['Flamant', 'Aves (oiseau)'],
          ['Poisson-lion', 'Actinopterygii (poisson osseux)'],
          ['Tortue imbriquée', 'Reptilia (reptile)']
        ],
        explanation: 'La classification taxonomique regroupe les êtres vivants par parenté évolutive. Connaître la classe d\'un animal aide à comprendre ses caractéristiques.'
      }
    }
  },

  {
    id: 'sci-094', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada nombre común dominicano con el nombre científico. Vocabulario local.',
        pairs: [
          ['Cucú', 'Athene cunicularia'],
          ['Carey', 'Eretmochelys imbricata'],
          ['Tinglar', 'Dermochelys coriacea'],
          ['Caguama', 'Caretta caretta']
        ],
        explanation: 'En República Dominicana, los animales tienen nombres locales únicos. "Cucú" para el búho cavador, "tinglar" para la tortuga laúd y "caguama" para la boba.'
      },
      en: {
        q: 'Match each Dominican common name with the scientific name. Local vocabulary.',
        pairs: [
          ['Cucú', 'Athene cunicularia'],
          ['Carey', 'Eretmochelys imbricata'],
          ['Tinglar', 'Dermochelys coriacea'],
          ['Caguama', 'Caretta caretta']
        ],
        explanation: 'In the Dominican Republic, animals have unique local names. "Cucú" for the burrowing owl, "tinglar" for the leatherback, and "caguama" for the loggerhead.'
      },
      fr: {
        q: 'Associe chaque nom commun dominicain au nom scientifique. Vocabulaire local.',
        pairs: [
          ['Cucú', 'Athene cunicularia'],
          ['Carey', 'Eretmochelys imbricata'],
          ['Tinglar', 'Dermochelys coriacea'],
          ['Caguama', 'Caretta caretta']
        ],
        explanation: 'En République dominicaine, les animaux ont des noms locaux uniques. « Cucú » pour la chevêche, « tinglar » pour la tortue luth et « caguama » pour la caouanne.'
      }
    }
  },

  {
    id: 'sci-095', type: 'match',
    lang: {
      es: {
        q: 'Relaciona cada amenaza con la especie que más afecta. Conservación 101.',
        pairs: [
          ['Comercio ilegal de caparazón', 'Tortuga carey'],
          ['Hélices de lanchas', 'Manatí antillano'],
          ['Pérdida de hábitat seco', 'Iguana de Ricord'],
          ['Falta de depredadores naturales', 'Pez león (beneficia al invasor)']
        ],
        explanation: 'Cada especie enfrenta amenazas específicas. La tortuga carey por su caparazón, el manatí por las lanchas, la iguana por la urbanización, y el pez león prospera sin control.'
      },
      en: {
        q: 'Match each threat with the species it affects most. Conservation 101.',
        pairs: [
          ['Illegal shell trade', 'Hawksbill Turtle'],
          ['Boat propellers', 'West Indian Manatee'],
          ['Dry habitat loss', 'Ricord\'s Iguana'],
          ['Lack of natural predators', 'Lionfish (benefits the invader)']
        ],
        explanation: 'Each species faces specific threats. The hawksbill for its shell, manatee from boats, iguana from urbanization, and lionfish thrives without control.'
      },
      fr: {
        q: 'Associe chaque menace à l\'espèce qu\'elle affecte le plus. Conservation 101.',
        pairs: [
          ['Commerce illégal de carapace', 'Tortue imbriquée'],
          ['Hélices de bateaux', 'Lamantin des Antilles'],
          ['Perte d\'habitat sec', 'Iguane de Ricord'],
          ['Absence de prédateurs naturels', 'Poisson-lion (profite à l\'invasif)']
        ],
        explanation: 'Chaque espèce fait face à des menaces spécifiques. L\'imbriquée pour sa carapace, le lamantin par les bateaux, l\'iguane par l\'urbanisation, et le poisson-lion prospère sans contrôle.'
      }
    }
  },

  {
    id: 'sci-096', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada dato numérico con lo que representa. ¡Memoria de datos!',
        pairs: [
          ['40 metros', 'Profundidad del Lago Enriquillo bajo el nivel del mar'],
          ['2 metros', 'Longitud máxima de Haitiophis anomalus'],
          ['4 especies', 'Tortugas marinas en el Mundo Acuático'],
          ['120 segundos', 'Duración del oxígeno en el cenote de buceo']
        ],
        explanation: 'Los números en el juego están basados en datos reales: la profundidad del lago, el tamaño de la serpiente, las especies de tortugas y el tiempo de buceo.'
      },
      en: {
        q: 'Match each number with what it represents. Data memory!',
        pairs: [
          ['40 meters', 'Depth of Lake Enriquillo below sea level'],
          ['2 meters', 'Maximum length of Haitiophis anomalus'],
          ['4 species', 'Sea turtles in the Aquatic World'],
          ['120 seconds', 'Oxygen duration in the diving cenote']
        ],
        explanation: 'Numbers in the game are based on real data: lake depth, snake length, turtle species, and diving time.'
      },
      fr: {
        q: 'Associe chaque chiffre à ce qu\'il représente. Mémoire de données !',
        pairs: [
          ['40 mètres', 'Profondeur du Lac Enriquillo sous le niveau de la mer'],
          ['2 mètres', 'Longueur maximale de Haitiophis anomalus'],
          ['4 espèces', 'Tortues marines dans le Monde Aquatique'],
          ['120 secondes', 'Durée de l\'oxygène dans le cénote de plongée']
        ],
        explanation: 'Les chiffres du jeu sont basés sur des données réelles : profondeur du lac, taille du serpent, espèces de tortues et temps de plongée.'
      }
    }
  },

  {
    id: 'sci-097', type: 'match',
    lang: {
      es: {
        q: 'Relaciona cada palabra taína con lo que nos legaron al español moderno.',
        pairs: [
          ['Hamaca', 'Cama colgante de algodón'],
          ['Tabaco', 'Planta ceremonial, hoy conocida mundialmente'],
          ['Batata', 'Tubérculo dulce (sweet potato)'],
          ['Maíz', 'Cereal básico de América']
        ],
        explanation: 'Muchas palabras del español cotidiano vienen del taíno. Hamaca, tabaco, batata y maíz son herencias lingüísticas de esta cultura.'
      },
      en: {
        q: 'Match each Taíno word with what they gave to modern Spanish.',
        pairs: [
          ['Hamaca (hammock)', 'Hanging cotton bed'],
          ['Tabaco (tobacco)', 'Ceremonial plant, now known worldwide'],
          ['Batata (sweet potato)', 'Sweet tuber'],
          ['Maíz (maize)', 'Basic American cereal']
        ],
        explanation: 'Many everyday Spanish words come from Taíno. Hammock, tobacco, sweet potato, and maize are linguistic legacies of this culture.'
      },
      fr: {
        q: 'Associe chaque mot taïno à ce qu\'ils ont légué à l\'espagnol moderne.',
        pairs: [
          ['Hamaca (hamac)', 'Lit suspendu en coton'],
          ['Tabaco (tabac)', 'Plante cérémonielle, connue mondialement'],
          ['Batata (patate douce)', 'Tubercule sucré'],
          ['Maíz (maïs)', 'Céréale de base d\'Amérique']
        ],
        explanation: 'De nombreux mots espagnols quotidiens viennent du taïno. Hamac, tabac, patate douce et maïs sont des héritages linguistiques de cette culture.'
      }
    }
  },

  {
    id: 'sci-098', type: 'match',
    lang: {
      es: {
        q: 'Conecta cada animal con su hábitat principal en el juego. ¿Dónde vive cada uno?',
        pairs: [
          ['Ballena jorobada', 'Mar abierto / Mundo Acuático'],
          ['Cocodrilo americano', 'Lago Enriquillo'],
          ['Cucú (búho cavador)', 'Zona seca del Lago Enriquillo'],
          ['Tortuga carey', 'Arrecifes de coral'],
          ['Manatí antillano', 'Santuario del Manatí']
        ],
        explanation: 'Cada especie en ArcLycée habita el ecosistema que corresponde a su hábitat real. El juego es fiel a la biogeografía dominicana.'
      },
      en: {
        q: 'Match each animal with its main habitat in the game. Where does each one live?',
        pairs: [
          ['Humpback Whale', 'Open sea / Aquatic World'],
          ['American Crocodile', 'Lake Enriquillo'],
          ['Burrowing Owl', 'Dry zone of Lake Enriquillo'],
          ['Hawksbill Turtle', 'Coral reefs'],
          ['West Indian Manatee', 'Manatee Sanctuary']
        ],
        explanation: 'Each species in ArcLycée inhabits the ecosystem matching its real habitat. The game is faithful to Dominican biogeography.'
      },
      fr: {
        q: 'Associe chaque animal à son habitat principal dans le jeu. Où vit chacun ?',
        pairs: [
          ['Baleine à bosse', 'Haute mer / Monde Aquatique'],
          ['Crocodile américain', 'Lac Enriquillo'],
          ['Chevêche des terriers', 'Zone sèche du Lac Enriquillo'],
          ['Tortue imbriquée', 'Récifs coralliens'],
          ['Lamantin des Antilles', 'Sanctuaire du Lamantin']
        ],
        explanation: 'Chaque espèce dans ArcLycée habite l\'écosystème correspondant à son habitat réel. Le jeu est fidèle à la biogéographie dominicaine.'
      }
    }
  },

  {
    id: 'sci-099', type: 'match',
    lang: {
      es: {
        q: 'Relaciona cada comparación pop con el animal real. ¡Cultura pop meets biología!',
        pairs: [
          ['Thanos (invasor imparable)', 'Pez león'],
          ['Beyblade (giro mortal)', 'Cocodrilo americano'],
          ['Dementor (drena energía)', 'Medusa'],
          ['Hobbit (vive bajo tierra)', 'Cucú (búho cavador)'],
          ['Pokémon shiny (ultra raro)', 'Iguana de Ricord']
        ],
        explanation: '¡La biología es épica! Cada animal tiene un superpoder o característica que lo hace comparable a personajes de ficción.'
      },
      en: {
        q: 'Match each pop culture comparison with the real animal. Pop culture meets biology!',
        pairs: [
          ['Thanos (unstoppable invader)', 'Lionfish'],
          ['Beyblade (death spin)', 'American Crocodile'],
          ['Dementor (drains energy)', 'Jellyfish'],
          ['Hobbit (lives underground)', 'Burrowing Owl'],
          ['Shiny Pokémon (ultra rare)', 'Ricord\'s Iguana']
        ],
        explanation: 'Biology is epic! Each animal has a superpower or characteristic that makes it comparable to fictional characters.'
      },
      fr: {
        q: 'Associe chaque comparaison pop au vrai animal. Culture pop meets biologie !',
        pairs: [
          ['Thanos (envahisseur imparable)', 'Poisson-lion'],
          ['Beyblade (rotation mortelle)', 'Crocodile américain'],
          ['Détraqueur (aspire l\'énergie)', 'Méduse'],
          ['Hobbit (vit sous terre)', 'Chevêche des terriers'],
          ['Pokémon chromatique (ultra rare)', 'Iguane de Ricord']
        ],
        explanation: 'La biologie est épique ! Chaque animal a un super-pouvoir ou une caractéristique qui le rend comparable à des personnages fictifs.'
      }
    }
  },

  {
    id: 'sci-100', type: 'match',
    lang: {
      es: {
        q: 'Gran final: conecta cada dato fascinante con la especie correcta. ¡Demuestra que eres un experto en biodiversidad dominicana!',
        pairs: [
          ['Puede poner 2 millones de huevos al año', 'Pez león'],
          ['Su caparazón se usaba para joyería', 'Tortuga carey'],
          ['Come solo plantas marinas', 'Manatí antillano'],
          ['Viaja 5,000+ km para tener bebés', 'Ballena jorobada'],
          ['Su nombre significa "de madriguera"', 'Cucú (Athene cunicularia)']
        ],
        explanation: '¡Felicidades! Si llegaste hasta aquí, eres un verdadero conocedor de la biodiversidad de República Dominicana. ¡Sigue explorando y protegiendo la naturaleza!'
      },
      en: {
        q: 'Grand finale: match each fascinating fact with the correct species. Prove you\'re a Dominican biodiversity expert!',
        pairs: [
          ['Can lay 2 million eggs per year', 'Lionfish'],
          ['Its shell was used for jewelry', 'Hawksbill Turtle'],
          ['Eats only marine plants', 'West Indian Manatee'],
          ['Travels 5,000+ km to have babies', 'Humpback Whale'],
          ['Its name means "of burrows"', 'Burrowing Owl (Athene cunicularia)']
        ],
        explanation: 'Congratulations! If you made it this far, you\'re a true Dominican biodiversity expert. Keep exploring and protecting nature!'
      },
      fr: {
        q: 'Grande finale : associe chaque fait fascinant à la bonne espèce. Prouve que tu es un expert en biodiversité dominicaine !',
        pairs: [
          ['Peut pondre 2 millions d\'œufs par an', 'Poisson-lion'],
          ['Sa carapace servait pour la bijouterie', 'Tortue imbriquée'],
          ['Ne mange que des plantes marines', 'Lamantin des Antilles'],
          ['Voyage 5 000+ km pour avoir des bébés', 'Baleine à bosse'],
          ['Son nom signifie « de terriers »', 'Chevêche des terriers (Athene cunicularia)']
        ],
        explanation: 'Félicitations ! Si tu es arrivé jusqu\'ici, tu es un vrai connaisseur de la biodiversité dominicaine. Continue à explorer et protéger la nature !'
      }
    }
  }

];
