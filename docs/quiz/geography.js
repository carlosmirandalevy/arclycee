// geography.js — 100 preguntas trilingües sobre la geografía de ArcLycée
// Tipos: tf (verdadero/falso), mcq (opción múltiple), fill (completar), match (emparejar)
// Tono: divertido, referencias pop, pensamiento crítico

window.ARC_QUESTIONS = window.ARC_QUESTIONS || {};
window.ARC_QUESTIONS.geography = [

  // ── 1-25: TRUE/FALSE ──────────────────────────────────────────────

  {
    id: 'geo-001', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: Como el Mapa del Merodeador, el mapa del juego fue trazado píxel a píxel a partir de imágenes topográficas reales de la NASA.', answer: true, explanation: 'El mapa de la isla se trazó directamente de imágenes satelitales y topográficas de la NASA, con 128×68 tiles.' },
      en: { q: "True or false: Like the Marauder's Map, the game's island map was traced pixel by pixel from real NASA topographic imagery.", answer: true, explanation: 'The island map was traced directly from NASA satellite and topographic images, with 128×68 tiles.' },
      fr: { q: "Vrai ou faux : Comme la Carte du Maraudeur, la carte du jeu a été tracée pixel par pixel à partir d'images topographiques réelles de la NASA.", answer: true, explanation: "La carte de l'île a été tracée directement à partir d'images satellites et topographiques de la NASA, avec 128×68 tuiles." }
    }
  },
  {
    id: 'geo-002', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: La isla de La Española es compartida por tres países.', answer: false, explanation: 'La Española es compartida por dos países: República Dominicana y Haití. Dos, no tres — no es como las Reliquias de la Muerte que se dividen en tres.' },
      en: { q: 'True or false: The island of Hispaniola is shared by three countries.', answer: false, explanation: 'Hispaniola is shared by two countries: the Dominican Republic and Haiti. Two, not three — it\'s not like the Deathly Hallows split into three.' },
      fr: { q: "Vrai ou faux : L'île d'Hispaniola est partagée par trois pays.", answer: false, explanation: "Hispaniola est partagée par deux pays : la République dominicaine et Haïti. Deux, pas trois — ce n'est pas comme les Reliques de la Mort divisées en trois." }
    }
  },
  {
    id: 'geo-003', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: El Lago Enriquillo está a 40 metros SOBRE el nivel del mar, como la Torre de los Vengadores sobre Manhattan.', answer: false, explanation: 'El Lago Enriquillo está a 40 metros BAJO el nivel del mar. Es el punto más bajo del Caribe, no el más alto.' },
      en: { q: 'True or false: Lake Enriquillo sits 40 meters ABOVE sea level, like Avengers Tower above Manhattan.', answer: false, explanation: 'Lake Enriquillo is 40 meters BELOW sea level. It\'s the lowest point in the Caribbean, not the highest.' },
      fr: { q: "Vrai ou faux : Le lac Enriquillo se trouve à 40 mètres AU-DESSUS du niveau de la mer, comme la Tour des Avengers au-dessus de Manhattan.", answer: false, explanation: "Le lac Enriquillo se trouve à 40 mètres EN DESSOUS du niveau de la mer. C'est le point le plus bas des Caraïbes, pas le plus haut." }
    }
  },
  {
    id: 'geo-004', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: El Lago Enriquillo es el lago más grande del Caribe.', answer: true, explanation: '¡Correcto! Es el lago más grande de todas las islas del Caribe. Un lago épico digno de One Piece.' },
      en: { q: 'True or false: Lake Enriquillo is the largest lake in the Caribbean.', answer: true, explanation: 'Correct! It\'s the biggest lake across all Caribbean islands. An epic lake worthy of One Piece.' },
      fr: { q: 'Vrai ou faux : Le lac Enriquillo est le plus grand lac des Caraïbes.', answer: true, explanation: "Correct ! C'est le plus grand lac de toutes les îles des Caraïbes. Un lac épique digne de One Piece." }
    }
  },
  {
    id: 'geo-005', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: Santo Domingo fue la primera ciudad europea fundada en las Américas.', answer: true, explanation: 'La Zona Colonial de Santo Domingo es la primera ciudad europea permanente en el Nuevo Mundo. OG level histórico.' },
      en: { q: 'True or false: Santo Domingo was the first European city founded in the Americas.', answer: true, explanation: 'The Zona Colonial in Santo Domingo is the first permanent European city in the New World. OG historical status.' },
      fr: { q: "Vrai ou faux : Saint-Domingue a été la première ville européenne fondée dans les Amériques.", answer: true, explanation: "La Zona Colonial de Saint-Domingue est la première ville européenne permanente du Nouveau Monde. Un statut historique OG." }
    }
  },
  {
    id: 'geo-006', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: El Pico Duarte es la montaña más alta del Caribe, más alta que cualquier pico de Cuba, Jamaica o Puerto Rico.', answer: true, explanation: 'Con 3,098 metros, el Pico Duarte es el campeón indiscutible de altitud en todo el Caribe insular.' },
      en: { q: 'True or false: Pico Duarte is the tallest mountain in the Caribbean, taller than any peak in Cuba, Jamaica, or Puerto Rico.', answer: true, explanation: 'At 3,098 meters, Pico Duarte is the undisputed altitude champion of the entire insular Caribbean.' },
      fr: { q: 'Vrai ou faux : Le Pico Duarte est la plus haute montagne des Caraïbes, plus haute que tout sommet de Cuba, de Jamaïque ou de Porto Rico.', answer: true, explanation: "Avec 3 098 mètres, le Pico Duarte est le champion incontesté d'altitude dans toutes les Caraïbes insulaires." }
    }
  },
  {
    id: 'geo-007', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: Punta Cana está en la punta occidental de la República Dominicana.', answer: false, explanation: 'Punta Cana está en la punta ORIENTAL (este). Si fuera un mapa de Fortnite, estarías en la esquina derecha.' },
      en: { q: 'True or false: Punta Cana is on the western tip of the Dominican Republic.', answer: false, explanation: 'Punta Cana is on the EASTERN tip. If this were a Fortnite map, you\'d be in the right corner.' },
      fr: { q: "Vrai ou faux : Punta Cana se trouve à la pointe occidentale de la République dominicaine.", answer: false, explanation: "Punta Cana se trouve à la pointe ORIENTALE (est). Si c'était une carte de Fortnite, tu serais dans le coin droit." }
    }
  },
  {
    id: 'geo-008', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: La Isabela, el primer asentamiento europeo, está en la costa sur de la isla.', answer: false, explanation: 'La Isabela está en Puerto Plata, en la costa NORTE. Colón eligió esa ubicación por su puerto natural.' },
      en: { q: 'True or false: La Isabela, the first European settlement, is on the southern coast of the island.', answer: false, explanation: 'La Isabela is in Puerto Plata, on the NORTHERN coast. Columbus chose that location for its natural harbor.' },
      fr: { q: "Vrai ou faux : La Isabela, le premier établissement européen, se trouve sur la côte sud de l'île.", answer: false, explanation: "La Isabela se trouve à Puerto Plata, sur la côte NORD. Colomb a choisi cet emplacement pour son port naturel." }
    }
  },
  {
    id: 'geo-009', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: El Lago Enriquillo es hipersalino — aproximadamente 3 veces más salado que el océano.', answer: true, explanation: 'Así es. Si Mario nadara ahí, sus monedas se corroerían tres veces más rápido.' },
      en: { q: 'True or false: Lake Enriquillo is hypersaline — approximately 3 times saltier than the ocean.', answer: true, explanation: 'That\'s right. If Mario swam there, his coins would corrode three times faster.' },
      fr: { q: "Vrai ou faux : Le lac Enriquillo est hypersalin — environ 3 fois plus salé que l'océan.", answer: true, explanation: "C'est exact. Si Mario y nageait, ses pièces se corroderaient trois fois plus vite." }
    }
  },
  {
    id: 'geo-010', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: El Manantial de la Aleta es un cenote sagrado ubicado en el Parque Nacional Cotubanamá, cerca de Bayahíbe.', answer: true, explanation: 'Correcto. Los taínos lo usaban como sitio ceremonial. En el juego bajas haciendo rapel, exploras la cueva oscura y buceas en el cenote.' },
      en: { q: 'True or false: Manantial de la Aleta is a sacred cenote located in Cotubanamá National Park, near Bayahíbe.', answer: true, explanation: 'Correct. The Taíno used it as a ceremonial site. In the game you rappel down, explore the dark cave, and dive into the cenote.' },
      fr: { q: "Vrai ou faux : Le Manantial de la Aleta est un cénote sacré situé dans le Parc National de Cotubanamá, près de Bayahíbe.", answer: true, explanation: "Correct. Les Taïnos l'utilisaient comme site cérémoniel. Dans le jeu, tu descends en rappel, explores la grotte sombre et plonges dans le cénote." }
    }
  },
  {
    id: 'geo-011', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: República Dominicana está bañada por el Océano Pacífico al norte.', answer: false, explanation: 'Al norte está el Océano Atlántico, y al sur el Mar Caribe. El Pacífico queda al otro lado del continente, bro.' },
      en: { q: 'True or false: The Dominican Republic is bordered by the Pacific Ocean to the north.', answer: false, explanation: 'The Atlantic Ocean is to the north, and the Caribbean Sea to the south. The Pacific is on the other side of the continent, bro.' },
      fr: { q: "Vrai ou faux : La République dominicaine est bordée par l'océan Pacifique au nord.", answer: false, explanation: "L'océan Atlantique est au nord, et la mer des Caraïbes au sud. Le Pacifique est de l'autre côté du continent, mec." }
    }
  },
  {
    id: 'geo-012', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: Las Cuevas del Pomier están en la provincia de San Cristóbal.', answer: true, explanation: 'Correcto. San Cristóbal, cerca de Santo Domingo. Las cuevas contienen la mayor colección de arte rupestre del Caribe.' },
      en: { q: 'True or false: Cuevas del Pomier are located in San Cristóbal province.', answer: true, explanation: 'Correct. San Cristóbal, near Santo Domingo. The caves contain the largest collection of cave art in the Caribbean.' },
      fr: { q: 'Vrai ou faux : Les Cuevas del Pomier se trouvent dans la province de San Cristóbal.', answer: true, explanation: "Correct. San Cristóbal, près de Saint-Domingue. Les grottes contiennent la plus grande collection d'art rupestre des Caraïbes." }
    }
  },
  {
    id: 'geo-013', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: La Cordillera Central y la Sierra de Bahoruco son las mismas montañas.', answer: false, explanation: 'Son cadenas montañosas DIFERENTES. La Cordillera Central está en el centro (con Pico Duarte), y la Sierra de Bahoruco está en el suroeste, cerca del Lago Enriquillo.' },
      en: { q: 'True or false: The Cordillera Central and the Sierra de Bahoruco are the same mountain range.', answer: false, explanation: 'They are DIFFERENT mountain ranges. The Cordillera Central is in the center (with Pico Duarte), and the Sierra de Bahoruco is in the southwest, near Lake Enriquillo.' },
      fr: { q: 'Vrai ou faux : La Cordillera Central et la Sierra de Bahoruco sont les mêmes montagnes.', answer: false, explanation: "Ce sont des chaînes de montagnes DIFFÉRENTES. La Cordillera Central est au centre (avec le Pico Duarte), et la Sierra de Bahoruco est au sud-ouest, près du lac Enriquillo." }
    }
  },
  {
    id: 'geo-014', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: El Río Ozama pasa por Santo Domingo, como el Sena por París.', answer: true, explanation: 'Correcto. El Ozama atraviesa Santo Domingo y desemboca en el Mar Caribe. Es al Santo Domingo lo que el Sena a París.' },
      en: { q: 'True or false: The Ozama River flows through Santo Domingo, like the Seine through Paris.', answer: true, explanation: 'Correct. The Ozama flows through Santo Domingo and empties into the Caribbean Sea. It\'s to Santo Domingo what the Seine is to Paris.' },
      fr: { q: 'Vrai ou faux : Le fleuve Ozama traverse Saint-Domingue, comme la Seine traverse Paris.', answer: true, explanation: "Correct. L'Ozama traverse Saint-Domingue et se jette dans la mer des Caraïbes. C'est pour Saint-Domingue ce que la Seine est pour Paris." }
    }
  },
  {
    id: 'geo-015', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: La Isla Cabritos está dentro del Lago Enriquillo — es una isla dentro de una isla dentro de una isla (la isla de La Española está en el océano).', answer: true, explanation: '¡Inception geográfico! Isla Cabritos es una isla en el Lago Enriquillo, que está en la isla de La Española, que está en el océano. Tres niveles, como un sueño dentro de un sueño.' },
      en: { q: 'True or false: Isla Cabritos is inside Lake Enriquillo — it\'s an island within an island within an island (Hispaniola is in the ocean).', answer: true, explanation: 'Geographic Inception! Isla Cabritos is an island in Lake Enriquillo, which is on the island of Hispaniola, which is in the ocean. Three levels deep, like a dream within a dream.' },
      fr: { q: "Vrai ou faux : L'Isla Cabritos se trouve dans le lac Enriquillo — c'est une île dans une île dans une île (Hispaniola est dans l'océan).", answer: true, explanation: "Inception géographique ! L'Isla Cabritos est une île dans le lac Enriquillo, qui se trouve sur l'île d'Hispaniola, qui est dans l'océan. Trois niveaux, comme un rêve dans un rêve." }
    }
  },
  {
    id: 'geo-016', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: En el juego, los 13 mundos están posicionados en ubicaciones geográficas correctas dentro del mapa de la isla.', answer: true, explanation: 'Los desarrolladores trazaron el mapa real y colocaron cada mundo en su ubicación geográfica real. Nada de mundos random como en Minecraft.' },
      en: { q: 'True or false: In the game, all 13 worlds are positioned at their correct geographic locations on the island map.', answer: true, explanation: 'The developers traced the real map and placed each world at its actual geographic location. No random worlds like in Minecraft.' },
      fr: { q: 'Vrai ou faux : Dans le jeu, les 13 mondes sont positionnés à leurs emplacements géographiques corrects sur la carte.', answer: true, explanation: "Les développeurs ont tracé la carte réelle et placé chaque monde à son emplacement géographique réel. Pas de mondes aléatoires comme dans Minecraft." }
    }
  },
  {
    id: 'geo-017', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: El Étang Saumâtre es un lago en el lado haitiano, cerca del Lago Enriquillo.', answer: true, explanation: 'Correcto. Son como lagos gemelos separados por la frontera, uno en cada país. El Étang Saumâtre es el segundo lago más grande de La Española.' },
      en: { q: 'True or false: Étang Saumâtre is a lake on the Haitian side, near Lake Enriquillo.', answer: true, explanation: 'Correct. They\'re like twin lakes separated by the border, one in each country. Étang Saumâtre is the second largest lake in Hispaniola.' },
      fr: { q: "Vrai ou faux : L'Étang Saumâtre est un lac du côté haïtien, près du lac Enriquillo.", answer: true, explanation: "Correct. Ce sont comme des lacs jumeaux séparés par la frontière, un dans chaque pays. L'Étang Saumâtre est le deuxième plus grand lac d'Hispaniola." }
    }
  },
  {
    id: 'geo-018', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: El mapa del juego usa un bitmap de 128×68 caracteres donde "1" significa tierra y "0" significa agua.', answer: true, explanation: 'El ISLA_BITMAP es literalmente un array de strings con 1s y 0s. Así de nerd es el mapa. Cero magia, puro código.' },
      en: { q: 'True or false: The game map uses a 128×68 character bitmap where "1" means land and "0" means water.', answer: true, explanation: 'The ISLA_BITMAP is literally an array of strings with 1s and 0s. That\'s how nerdy the map is. Zero magic, pure code.' },
      fr: { q: 'Vrai ou faux : La carte du jeu utilise un bitmap de 128×68 caractères où "1" signifie terre et "0" signifie eau.', answer: true, explanation: "L'ISLA_BITMAP est littéralement un tableau de chaînes avec des 1 et des 0. C'est ça le niveau geek de la carte. Zéro magie, que du code." }
    }
  },
  {
    id: 'geo-019', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: El Yaque del Norte y el Yaque del Sur son el mismo río que cambia de nombre a mitad de camino.', answer: false, explanation: 'Son dos ríos completamente diferentes. El Yaque del Norte va hacia el noroeste y el Yaque del Sur hacia el suroeste. Como Fred y George Weasley: parecidos pero distintos.' },
      en: { q: 'True or false: The Yaque del Norte and the Yaque del Sur are the same river that changes its name halfway through.', answer: false, explanation: 'They are two completely different rivers. The Yaque del Norte flows northwest and the Yaque del Sur flows southwest. Like Fred and George Weasley: similar but different.' },
      fr: { q: 'Vrai ou faux : Le Yaque del Norte et le Yaque del Sur sont le même fleuve qui change de nom à mi-chemin.', answer: false, explanation: "Ce sont deux fleuves complètement différents. Le Yaque del Norte coule vers le nord-ouest et le Yaque del Sur vers le sud-ouest. Comme Fred et George Weasley : similaires mais différents." }
    }
  },
  {
    id: 'geo-020', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: El Mar Caribe está al norte de la República Dominicana y el Atlántico al sur.', answer: false, explanation: 'Es al revés: el Atlántico está al norte y el Mar Caribe al sur. No te confundas como un GPS sin señal.' },
      en: { q: 'True or false: The Caribbean Sea is to the north of the Dominican Republic and the Atlantic to the south.', answer: false, explanation: 'It\'s the other way around: the Atlantic is to the north and the Caribbean Sea to the south. Don\'t get confused like a GPS with no signal.' },
      fr: { q: "Vrai ou faux : La mer des Caraïbes est au nord de la République dominicaine et l'Atlantique au sud.", answer: false, explanation: "C'est l'inverse : l'Atlantique est au nord et la mer des Caraïbes au sud. Ne te trompe pas comme un GPS sans signal." }
    }
  },
  {
    id: 'geo-021', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: Bayahíbe, donde está el Parque Nacional Cotubanamá, se encuentra en la costa sureste de la República Dominicana.', answer: true, explanation: 'Correcto. Bayahíbe está en la costa sureste, provincia de La Altagracia. Ahí es donde llegas al Manantial de la Aleta en el juego.' },
      en: { q: 'True or false: Bayahíbe, where Cotubanamá National Park is located, sits on the southeastern coast of the Dominican Republic.', answer: true, explanation: 'Correct. Bayahíbe is on the southeastern coast, La Altagracia province. That\'s where you reach Manantial de la Aleta in the game.' },
      fr: { q: 'Vrai ou faux : Bayahíbe, où se trouve le Parc National de Cotubanamá, est situé sur la côte sud-est de la République dominicaine.', answer: true, explanation: "Correct. Bayahíbe est sur la côte sud-est, province de La Altagracia. C'est là que tu arrives au Manantial de la Aleta dans le jeu." }
    }
  },
  {
    id: 'geo-022', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: El Pico Duarte está en la Cordillera Central de la República Dominicana.', answer: true, explanation: 'Sí. La Cordillera Central es la columna vertebral montañosa de la isla, y el Pico Duarte es su punto más alto a 3,098m.' },
      en: { q: 'True or false: Pico Duarte is located in the Cordillera Central of the Dominican Republic.', answer: true, explanation: 'Yes. The Cordillera Central is the mountainous backbone of the island, and Pico Duarte is its highest point at 3,098m.' },
      fr: { q: 'Vrai ou faux : Le Pico Duarte se trouve dans la Cordillera Central de la République dominicaine.', answer: true, explanation: "Oui. La Cordillera Central est l'épine dorsale montagneuse de l'île, et le Pico Duarte est son point culminant à 3 098 m." }
    }
  },
  {
    id: 'geo-023', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: La Cordillera Central de la República Dominicana contiene el Pico Duarte, el punto más alto de todo el Caribe.', answer: true, explanation: '¡Correcto! El Pico Duarte alcanza 3,098 metros y es la montaña más alta de todas las Antillas. Como el Monte Olimpo de Percy Jackson, pero en el Caribe.' },
      en: { q: 'True or false: The Cordillera Central of the Dominican Republic contains Pico Duarte, the highest point in the entire Caribbean.', answer: true, explanation: 'Correct! Pico Duarte reaches 3,098 meters and is the tallest mountain in all the Antilles. Like Mount Olympus from Percy Jackson, but in the Caribbean.' },
      fr: { q: 'Vrai ou faux : La Cordillera Central de la République Dominicaine contient le Pico Duarte, le point le plus élevé de toutes les Caraïbes.', answer: true, explanation: 'Correct ! Le Pico Duarte atteint 3 098 mètres et est la plus haute montagne de toutes les Antilles. Comme le Mont Olympe de Percy Jackson, mais aux Caraïbes.' }
    }
  },
  {
    id: 'geo-024', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: Puerto Plata está en la costa sur de la República Dominicana.', answer: false, explanation: 'Puerto Plata está en la costa NORTE. Por eso La Isabela (primer asentamiento) está en el norte — Colón llegó por el Atlántico.' },
      en: { q: 'True or false: Puerto Plata is on the southern coast of the Dominican Republic.', answer: false, explanation: 'Puerto Plata is on the NORTHERN coast. That\'s why La Isabela (first settlement) is in the north — Columbus arrived from the Atlantic.' },
      fr: { q: 'Vrai ou faux : Puerto Plata est sur la côte sud de la République dominicaine.', answer: false, explanation: "Puerto Plata est sur la côte NORD. C'est pourquoi La Isabela (premier établissement) est au nord — Colomb est arrivé par l'Atlantique." }
    }
  },
  {
    id: 'geo-025', type: 'tf',
    lang: {
      es: { q: 'Verdadero o falso: El juego tiene 5 ríos generados con el algoritmo de Bresenham, como si dibujaran líneas en un monitor antiguo.', answer: true, explanation: 'Los 5 ríos (Yaque del Norte, Yaque del Sur, Ozama y más) se dibujan con Bresenham — el mismo algoritmo que usaban para líneas en pantallas de los 60s. Retro tech para un juego retro.' },
      en: { q: 'True or false: The game has 5 rivers generated using Bresenham\'s algorithm, as if drawing lines on an old monitor.', answer: true, explanation: 'The 5 rivers (Yaque del Norte, Yaque del Sur, Ozama and more) are drawn with Bresenham — the same algorithm used for lines on 1960s screens. Retro tech for a retro game.' },
      fr: { q: "Vrai ou faux : Le jeu a 5 rivières générées avec l'algorithme de Bresenham, comme si on traçait des lignes sur un écran ancien.", answer: true, explanation: "Les 5 rivières (Yaque del Norte, Yaque del Sur, Ozama et plus) sont tracées avec Bresenham — le même algorithme utilisé pour les lignes sur les écrans des années 60. Tech rétro pour un jeu rétro." }
    }
  },

  // ── 26-50: MULTIPLE CHOICE ────────────────────────────────────────

  {
    id: 'geo-026', type: 'mcq',
    lang: {
      es: { q: 'Si el Lago Enriquillo fuera un nivel de Mario, estarías nadando en agua 3 veces más salada que el mar. ¿A cuántos metros bajo el nivel del mar está?', options: ['10 metros', '25 metros', '40 metros', '100 metros'], answer: 2, explanation: 'El Lago Enriquillo está a 40 metros bajo el nivel del mar. Es el punto más bajo de todo el Caribe.' },
      en: { q: 'If Lake Enriquillo were a Mario level, you\'d be swimming in water 3 times saltier than the sea. How many meters below sea level is it?', options: ['10 meters', '25 meters', '40 meters', '100 meters'], answer: 2, explanation: 'Lake Enriquillo is 40 meters below sea level. It\'s the lowest point in the entire Caribbean.' },
      fr: { q: "Si le lac Enriquillo était un niveau de Mario, tu nagerais dans une eau 3 fois plus salée que la mer. À combien de mètres sous le niveau de la mer se trouve-t-il ?", options: ['10 mètres', '25 mètres', '40 mètres', '100 mètres'], answer: 2, explanation: "Le lac Enriquillo est à 40 mètres sous le niveau de la mer. C'est le point le plus bas de toutes les Caraïbes." }
    }
  },
  {
    id: 'geo-027', type: 'mcq',
    lang: {
      es: { q: '¿Qué dos países comparten la isla de La Española, como dos roommates que dividen un apartamento?', options: ['Cuba y Haití', 'República Dominicana y Cuba', 'República Dominicana y Haití', 'Jamaica y Haití'], answer: 2, explanation: 'República Dominicana ocupa los dos tercios orientales y Haití el tercio occidental de La Española.' },
      en: { q: 'Which two countries share the island of Hispaniola, like two roommates splitting an apartment?', options: ['Cuba and Haiti', 'Dominican Republic and Cuba', 'Dominican Republic and Haiti', 'Jamaica and Haiti'], answer: 2, explanation: 'The Dominican Republic occupies the eastern two-thirds and Haiti the western third of Hispaniola.' },
      fr: { q: "Quels deux pays partagent l'île d'Hispaniola, comme deux colocataires qui divisent un appartement ?", options: ['Cuba et Haïti', 'République dominicaine et Cuba', 'République dominicaine et Haïti', 'Jamaïque et Haïti'], answer: 2, explanation: "La République dominicaine occupe les deux tiers orientaux et Haïti le tiers occidental d'Hispaniola." }
    }
  },
  {
    id: 'geo-028', type: 'mcq',
    lang: {
      es: { q: '¿En qué provincia se encuentran las Cuevas del Pomier, la "Gravity Falls" de la arqueología dominicana?', options: ['Santiago', 'Puerto Plata', 'San Cristóbal', 'La Altagracia'], answer: 2, explanation: 'Las Cuevas del Pomier están en la provincia de San Cristóbal, a unos 40 km al norte de Santo Domingo.' },
      en: { q: 'In which province are the Cuevas del Pomier located — the "Gravity Falls" of Dominican archaeology?', options: ['Santiago', 'Puerto Plata', 'San Cristóbal', 'La Altagracia'], answer: 2, explanation: 'Cuevas del Pomier are in San Cristóbal province, about 40 km north of Santo Domingo.' },
      fr: { q: 'Dans quelle province se trouvent les Cuevas del Pomier, le « Gravity Falls » de l\'archéologie dominicaine ?', options: ['Santiago', 'Puerto Plata', 'San Cristóbal', 'La Altagracia'], answer: 2, explanation: 'Les Cuevas del Pomier sont dans la province de San Cristóbal, à environ 40 km au nord de Saint-Domingue.' }
    }
  },
  {
    id: 'geo-029', type: 'mcq',
    lang: {
      es: { q: '¿Cuál es la montaña más alta del Caribe? Pista: es como el Olimpo de Percy Jackson pero en versión tropical.', options: ['Monte Pelée', 'Blue Mountain Peak', 'Pico Duarte', 'Pico Turquino'], answer: 2, explanation: 'Pico Duarte (3,098m) en la Cordillera Central de RD. Blue Mountain Peak (Jamaica) solo tiene 2,256m y Pico Turquino (Cuba) 1,974m.' },
      en: { q: 'What is the highest mountain in the Caribbean? Hint: it\'s like Percy Jackson\'s Mount Olympus but in a tropical version.', options: ['Mount Pelée', 'Blue Mountain Peak', 'Pico Duarte', 'Pico Turquino'], answer: 2, explanation: 'Pico Duarte (3,098m) in the DR\'s Cordillera Central. Blue Mountain Peak (Jamaica) is only 2,256m and Pico Turquino (Cuba) 1,974m.' },
      fr: { q: "Quelle est la plus haute montagne des Caraïbes ? Indice : c'est comme le Mont Olympe de Percy Jackson mais en version tropicale.", options: ['Montagne Pelée', 'Blue Mountain Peak', 'Pico Duarte', 'Pico Turquino'], answer: 2, explanation: "Le Pico Duarte (3 098 m) dans la Cordillera Central de RD. Le Blue Mountain Peak (Jamaïque) ne fait que 2 256 m et le Pico Turquino (Cuba) 1 974 m." }
    }
  },
  {
    id: 'geo-030', type: 'mcq',
    lang: {
      es: { q: '¿Dónde está ubicada La Isabela, el primer asentamiento europeo permanente en las Américas?', options: ['Santo Domingo (sur)', 'Puerto Plata (norte)', 'Punta Cana (este)', 'Barahona (suroeste)'], answer: 1, explanation: 'La Isabela fue fundada por Colón en 1494 en la costa norte, actual provincia de Puerto Plata.' },
      en: { q: 'Where is La Isabela located, the first permanent European settlement in the Americas?', options: ['Santo Domingo (south)', 'Puerto Plata (north)', 'Punta Cana (east)', 'Barahona (southwest)'], answer: 1, explanation: 'La Isabela was founded by Columbus in 1494 on the northern coast, in present-day Puerto Plata province.' },
      fr: { q: "Où se trouve La Isabela, le premier établissement européen permanent dans les Amériques ?", options: ['Saint-Domingue (sud)', 'Puerto Plata (nord)', 'Punta Cana (est)', 'Barahona (sud-ouest)'], answer: 1, explanation: "La Isabela a été fondée par Colomb en 1494 sur la côte nord, dans l'actuelle province de Puerto Plata." }
    }
  },
  {
    id: 'geo-031', type: 'mcq',
    lang: {
      es: { q: '¿Cuántos mundos tiene el juego posicionados en ubicaciones geográficas reales?', options: ['7', '10', '13', '20'], answer: 2, explanation: '13 mundos, cada uno en su ubicación geográfica real dentro del mapa trazado de imágenes de la NASA.' },
      en: { q: 'How many game worlds are positioned at real geographic locations?', options: ['7', '10', '13', '20'], answer: 2, explanation: '13 worlds, each at its real geographic location on the map traced from NASA imagery.' },
      fr: { q: "Combien de mondes du jeu sont positionnés à des emplacements géographiques réels ?", options: ['7', '10', '13', '20'], answer: 2, explanation: "13 mondes, chacun à son emplacement géographique réel sur la carte tracée à partir d'images de la NASA." }
    }
  },
  {
    id: 'geo-032', type: 'mcq',
    lang: {
      es: { q: '¿Qué océano baña la costa NORTE de la República Dominicana?', options: ['Mar Caribe', 'Océano Pacífico', 'Océano Atlántico', 'Océano Índico'], answer: 2, explanation: 'El Atlántico está al norte. Colón cruzó el Atlántico para llegar a La Isabela en la costa norte.' },
      en: { q: 'Which ocean borders the NORTHERN coast of the Dominican Republic?', options: ['Caribbean Sea', 'Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean'], answer: 2, explanation: 'The Atlantic is to the north. Columbus crossed the Atlantic to reach La Isabela on the northern coast.' },
      fr: { q: "Quel océan borde la côte NORD de la République dominicaine ?", options: ['Mer des Caraïbes', 'Océan Pacifique', 'Océan Atlantique', 'Océan Indien'], answer: 2, explanation: "L'Atlantique est au nord. Colomb a traversé l'Atlantique pour atteindre La Isabela sur la côte nord." }
    }
  },
  {
    id: 'geo-033', type: 'mcq',
    lang: {
      es: { q: '¿Por qué crees que Colón fundó La Isabela en la costa norte y no en la sur?', options: ['Porque la costa norte estaba más lejos de los taínos', 'Porque venía del Atlántico (norte) y era la primera tierra que encontró', 'Porque la costa sur era inhabitable', 'Porque quería estar más cerca de Cuba'], answer: 1, explanation: 'Colón navegaba desde Europa por el Atlántico. La costa norte era lo primero que encontraba al llegar. Es pura lógica geográfica de navegación.' },
      en: { q: 'Why do you think Columbus founded La Isabela on the north coast and not the south?', options: ['Because the north coast was farther from the Taíno', 'Because he came from the Atlantic (north) and it was the first land he found', 'Because the south coast was uninhabitable', 'Because he wanted to be closer to Cuba'], answer: 1, explanation: 'Columbus sailed from Europe across the Atlantic. The northern coast was the first thing he encountered upon arrival. Pure geographic navigation logic.' },
      fr: { q: "Pourquoi Colomb a-t-il fondé La Isabela sur la côte nord et pas la côte sud, à ton avis ?", options: ["Parce que la côte nord était plus loin des Taïnos", "Parce qu'il venait de l'Atlantique (nord) et c'était la première terre trouvée", "Parce que la côte sud était inhabitable", "Parce qu'il voulait être plus près de Cuba"], answer: 1, explanation: "Colomb naviguait depuis l'Europe par l'Atlantique. La côte nord était la première chose qu'il trouvait en arrivant. Pure logique géographique de navigation." }
    }
  },
  {
    id: 'geo-034', type: 'mcq',
    lang: {
      es: { q: '¿Cuántos ríos se representan en el mapa del juego?', options: ['3', '5', '8', '12'], answer: 1, explanation: '5 ríos dibujados con el algoritmo de Bresenham, incluyendo el Yaque del Norte, Yaque del Sur y Ozama.' },
      en: { q: 'How many rivers are represented on the game map?', options: ['3', '5', '8', '12'], answer: 1, explanation: '5 rivers drawn with Bresenham\'s algorithm, including the Yaque del Norte, Yaque del Sur, and Ozama.' },
      fr: { q: 'Combien de rivières sont représentées sur la carte du jeu ?', options: ['3', '5', '8', '12'], answer: 1, explanation: "5 rivières tracées avec l'algorithme de Bresenham, dont le Yaque del Norte, le Yaque del Sur et l'Ozama." }
    }
  },
  {
    id: 'geo-035', type: 'mcq',
    lang: {
      es: { q: '¿Qué isla está dentro del Lago Enriquillo? Imagina una isla dentro de un lago dentro de una isla — inception geográfico.', options: ['Isla Saona', 'Isla Catalina', 'Isla Cabritos', 'Isla Beata'], answer: 2, explanation: 'Isla Cabritos, hogar de cocodrilos e iguanas. En el juego, es donde el Espíritu del Cemí espera como boss secreto.' },
      en: { q: 'Which island is inside Lake Enriquillo? Imagine an island inside a lake inside an island — geographic inception.', options: ['Isla Saona', 'Isla Catalina', 'Isla Cabritos', 'Isla Beata'], answer: 2, explanation: 'Isla Cabritos, home to crocodiles and iguanas. In the game, it\'s where the Spirit of the Cemí awaits as a secret boss.' },
      fr: { q: "Quelle île se trouve dans le lac Enriquillo ? Imagine une île dans un lac dans une île — inception géographique.", options: ['Isla Saona', 'Isla Catalina', 'Isla Cabritos', 'Isla Beata'], answer: 2, explanation: "Isla Cabritos, foyer de crocodiles et d'iguanes. Dans le jeu, c'est là que l'Esprit du Cemí attend en tant que boss secret." }
    }
  },
  {
    id: 'geo-036', type: 'mcq',
    lang: {
      es: { q: '¿En qué zona de la República Dominicana está el Lago Enriquillo?', options: ['Noreste, cerca de Samaná', 'Suroeste, cerca de la frontera con Haití', 'Centro, en la Cordillera Central', 'Sureste, cerca de Punta Cana'], answer: 1, explanation: 'El Lago Enriquillo está en el suroeste, en la depresión del Enriquillo, pegado a la frontera haitiana. Es una fosa tectónica.' },
      en: { q: 'In which part of the Dominican Republic is Lake Enriquillo located?', options: ['Northeast, near Samaná', 'Southwest, near the Haitian border', 'Center, in the Cordillera Central', 'Southeast, near Punta Cana'], answer: 1, explanation: 'Lake Enriquillo is in the southwest, in the Enriquillo depression, close to the Haitian border. It\'s a tectonic trough.' },
      fr: { q: 'Dans quelle partie de la République dominicaine se trouve le lac Enriquillo ?', options: ['Nord-est, près de Samaná', 'Sud-ouest, près de la frontière haïtienne', 'Centre, dans la Cordillera Central', 'Sud-est, près de Punta Cana'], answer: 1, explanation: "Le lac Enriquillo est au sud-ouest, dans la dépression d'Enriquillo, près de la frontière haïtienne. C'est un fossé tectonique." }
    }
  },
  {
    id: 'geo-037', type: 'mcq',
    lang: {
      es: { q: '¿Por qué el Lago Enriquillo es tan salado? Piensa como un científico de Adventure Time.', options: ['Porque le echan sal los pescadores', 'Porque antiguamente era parte del mar y quedó atrapado al subir el terreno', 'Porque los cocodrilos producen sal', 'Porque está conectado al océano por un túnel secreto'], answer: 1, explanation: 'El Lago Enriquillo era un canal marino que conectaba la bahía de Neiba con la de Puerto Príncipe. Al elevarse el terreno, quedó atrapado y la evaporación concentró la sal.' },
      en: { q: 'Why is Lake Enriquillo so salty? Think like an Adventure Time scientist.', options: ['Because fishermen add salt', 'Because it was once part of the sea and got trapped when the land rose', 'Because crocodiles produce salt', 'Because it\'s connected to the ocean via a secret tunnel'], answer: 1, explanation: 'Lake Enriquillo was a marine channel connecting Neiba Bay to Port-au-Prince Bay. When the terrain rose, it got trapped and evaporation concentrated the salt.' },
      fr: { q: "Pourquoi le lac Enriquillo est-il si salé ? Réfléchis comme un scientifique d'Adventure Time.", options: ['Parce que les pêcheurs y ajoutent du sel', "Parce qu'il faisait autrefois partie de la mer et a été piégé quand le terrain s'est élevé", 'Parce que les crocodiles produisent du sel', "Parce qu'il est connecté à l'océan par un tunnel secret"], answer: 1, explanation: "Le lac Enriquillo était un canal marin reliant la baie de Neiba à celle de Port-au-Prince. Quand le terrain s'est élevé, il a été piégé et l'évaporation a concentré le sel." }
    }
  },
  {
    id: 'geo-038', type: 'mcq',
    lang: {
      es: { q: '¿Cuántos lagos tiene el mapa del juego?', options: ['1', '2', '4', '6'], answer: 1, explanation: '2 lagos: el Lago Enriquillo (lado dominicano) y el Étang Saumâtre (lado haitiano). Lagos gemelos a cada lado de la frontera.' },
      en: { q: 'How many lakes does the game map have?', options: ['1', '2', '4', '6'], answer: 1, explanation: '2 lakes: Lake Enriquillo (Dominican side) and Étang Saumâtre (Haitian side). Twin lakes on each side of the border.' },
      fr: { q: 'Combien de lacs la carte du jeu a-t-elle ?', options: ['1', '2', '4', '6'], answer: 1, explanation: "2 lacs : le lac Enriquillo (côté dominicain) et l'Étang Saumâtre (côté haïtien). Des lacs jumeaux de chaque côté de la frontière." }
    }
  },
  {
    id: 'geo-039', type: 'mcq',
    lang: {
      es: { q: '¿Cuántas cadenas montañosas están definidas en el código del mapa del juego?', options: ['3', '5', '8', '12'], answer: 2, explanation: '8 cadenas montañosas en el array CORDILLERAS, incluyendo la Cordillera Central y la Sierra de Bahoruco.' },
      en: { q: 'How many mountain chains are defined in the game map code?', options: ['3', '5', '8', '12'], answer: 2, explanation: '8 mountain chains in the CORDILLERAS array, including the Cordillera Central and Sierra de Bahoruco.' },
      fr: { q: 'Combien de chaînes de montagnes sont définies dans le code de la carte du jeu ?', options: ['3', '5', '8', '12'], answer: 2, explanation: '8 chaînes de montagnes dans le tableau CORDILLERAS, dont la Cordillera Central et la Sierra de Bahoruco.' }
    }
  },
  {
    id: 'geo-040', type: 'mcq',
    lang: {
      es: { q: '¿Qué ciudad alberga la Zona Colonial, la primera ciudad europea de América?', options: ['La Isabela', 'Santiago', 'Santo Domingo', 'Puerto Plata'], answer: 2, explanation: 'Santo Domingo fue fundada en 1498 y su Zona Colonial es Patrimonio de la Humanidad por la UNESCO.' },
      en: { q: 'Which city houses the Zona Colonial, the first European city in the Americas?', options: ['La Isabela', 'Santiago', 'Santo Domingo', 'Puerto Plata'], answer: 2, explanation: 'Santo Domingo was founded in 1498 and its Zona Colonial is a UNESCO World Heritage Site.' },
      fr: { q: "Quelle ville abrite la Zona Colonial, la première ville européenne des Amériques ?", options: ['La Isabela', 'Santiago', 'Saint-Domingue', 'Puerto Plata'], answer: 2, explanation: "Saint-Domingue a été fondée en 1498 et sa Zona Colonial est un site du patrimoine mondial de l'UNESCO." }
    }
  },
  {
    id: 'geo-041', type: 'mcq',
    lang: {
      es: { q: '¿Cuál de estos ríos NO es uno de los tres principales de la República Dominicana?', options: ['Yaque del Norte', 'Ozama', 'Amazonas', 'Yaque del Sur'], answer: 2, explanation: 'El Amazonas está en Sudamérica, no en RD. Los tres ríos principales dominicanos son Yaque del Norte, Yaque del Sur y Ozama.' },
      en: { q: 'Which of these rivers is NOT one of the three main rivers of the Dominican Republic?', options: ['Yaque del Norte', 'Ozama', 'Amazon', 'Yaque del Sur'], answer: 2, explanation: 'The Amazon is in South America, not the DR. The three main Dominican rivers are Yaque del Norte, Yaque del Sur, and Ozama.' },
      fr: { q: "Lequel de ces fleuves N'est PAS l'un des trois principaux de la République dominicaine ?", options: ['Yaque del Norte', 'Ozama', 'Amazone', 'Yaque del Sur'], answer: 2, explanation: "L'Amazone est en Amérique du Sud, pas en RD. Les trois principaux fleuves dominicains sont le Yaque del Norte, le Yaque del Sur et l'Ozama." }
    }
  },
  {
    id: 'geo-042', type: 'mcq',
    lang: {
      es: { q: 'Si estás en Punta Cana mirando al horizonte, ¿en qué dirección general estás respecto al resto de la isla?', options: ['En la punta más al norte', 'En la punta más al oeste', 'En la punta más al este', 'En el centro exacto'], answer: 2, explanation: 'Punta Cana está en la punta oriental (este) de la República Dominicana. Es literalmente la punta del país.' },
      en: { q: 'If you\'re in Punta Cana looking at the horizon, which direction are you relative to the rest of the island?', options: ['The northernmost tip', 'The westernmost tip', 'The easternmost tip', 'The exact center'], answer: 2, explanation: 'Punta Cana is on the eastern tip of the Dominican Republic. It\'s literally the tip of the country.' },
      fr: { q: "Si tu es à Punta Cana et que tu regardes l'horizon, dans quelle direction es-tu par rapport au reste de l'île ?", options: ['La pointe la plus au nord', "La pointe la plus à l'ouest", "La pointe la plus à l'est", 'Le centre exact'], answer: 2, explanation: "Punta Cana est à la pointe orientale (est) de la République dominicaine. C'est littéralement la pointe du pays." }
    }
  },
  {
    id: 'geo-043', type: 'mcq',
    lang: {
      es: { q: '¿Qué tiene en común el Lago Enriquillo con el Mar Muerto?', options: ['Ambos están en desiertos africanos', 'Ambos son hipersalinos y están bajo el nivel del mar', 'Ambos son de agua dulce', 'Ambos están en islas del Caribe'], answer: 1, explanation: 'Ambos son hipersalinos y están bajo el nivel del mar. El Mar Muerto es el más extremo (-430m), pero Enriquillo (-40m) es su hermano menor caribeño.' },
      en: { q: 'What do Lake Enriquillo and the Dead Sea have in common?', options: ['Both are in African deserts', 'Both are hypersaline and below sea level', 'Both are freshwater', 'Both are on Caribbean islands'], answer: 1, explanation: 'Both are hypersaline and below sea level. The Dead Sea is more extreme (-430m), but Enriquillo (-40m) is its little Caribbean sibling.' },
      fr: { q: "Qu'ont en commun le lac Enriquillo et la mer Morte ?", options: ['Les deux sont dans des déserts africains', 'Les deux sont hypersalins et sous le niveau de la mer', "Les deux sont d'eau douce", 'Les deux sont sur des îles des Caraïbes'], answer: 1, explanation: "Les deux sont hypersalins et sous le niveau de la mer. La mer Morte est plus extrême (-430 m), mais Enriquillo (-40 m) est son petit frère caribéen." }
    }
  },
  {
    id: 'geo-044', type: 'mcq',
    lang: {
      es: { q: '¿Qué es un cenote, como el Manantial de la Aleta?', options: ['Un volcán dormido', 'Una cueva inundada de agua dulce formada por colapso de roca caliza', 'Un tipo de montaña submarina', 'Un arrecife de coral fosilizado'], answer: 1, explanation: 'Un cenote es una depresión natural con agua subterránea, formada al colapsar la roca caliza. Los taínos los usaban como sitios sagrados.' },
      en: { q: 'What is a cenote, like Manantial de la Aleta?', options: ['A dormant volcano', 'A freshwater-filled cave formed by limestone collapse', 'A type of underwater mountain', 'A fossilized coral reef'], answer: 1, explanation: 'A cenote is a natural depression with groundwater, formed when limestone collapses. The Taíno used them as sacred sites.' },
      fr: { q: "Qu'est-ce qu'un cénote, comme le Manantial de la Aleta ?", options: ['Un volcan endormi', "Une grotte remplie d'eau douce formée par l'effondrement du calcaire", 'Un type de montagne sous-marine', 'Un récif corallien fossilisé'], answer: 1, explanation: "Un cénote est une dépression naturelle avec de l'eau souterraine, formée par l'effondrement du calcaire. Les Taïnos les utilisaient comme sites sacrés." }
    }
  },
  {
    id: 'geo-045', type: 'mcq',
    lang: {
      es: { q: '¿Cuál es la dimensión del bitmap que define la isla en el código del juego?', options: ['64×32 tiles', '128×68 tiles', '256×128 tiles', '512×256 tiles'], answer: 1, explanation: '128×68 tiles, escalado 2× desde el bitmap original. Cada tile puede ser tierra (1), agua (0), montaña, bosque, lago o río.' },
      en: { q: 'What is the dimension of the bitmap that defines the island in the game code?', options: ['64×32 tiles', '128×68 tiles', '256×128 tiles', '512×256 tiles'], answer: 1, explanation: 'The bitmap is 128×68 tiles, scaled 2× from the original. Each tile can be land (1), water (0), mountain, forest, lake, or river.' },
      fr: { q: "Quelle est la dimension du bitmap qui définit l'île dans le code du jeu ?", options: ['64×32 tuiles', '128×68 tuiles', '256×128 tuiles', '512×256 tuiles'], answer: 1, explanation: "128×68 tuiles, mis à l'échelle 2× à partir de l'original. Chaque tuile peut être terre (1), eau (0), montagne, forêt, lac ou rivière." }
    }
  },
  {
    id: 'geo-046', type: 'mcq',
    lang: {
      es: { q: '¿Qué mar baña la costa SUR de la República Dominicana?', options: ['Océano Atlántico', 'Mar Mediterráneo', 'Mar Caribe', 'Golfo de México'], answer: 2, explanation: 'El Mar Caribe baña la costa sur. El Atlántico está al norte. Como los lados de una moneda — siempre opuestos.' },
      en: { q: 'Which sea borders the SOUTHERN coast of the Dominican Republic?', options: ['Atlantic Ocean', 'Mediterranean Sea', 'Caribbean Sea', 'Gulf of Mexico'], answer: 2, explanation: 'The Caribbean Sea borders the southern coast. The Atlantic is to the north. Like two sides of a coin — always opposite.' },
      fr: { q: 'Quelle mer borde la côte SUD de la République dominicaine ?', options: ['Océan Atlantique', 'Mer Méditerranée', 'Mer des Caraïbes', 'Golfe du Mexique'], answer: 2, explanation: "La mer des Caraïbes borde la côte sud. L'Atlantique est au nord. Comme les deux faces d'une pièce — toujours opposées." }
    }
  },
  {
    id: 'geo-047', type: 'mcq',
    lang: {
      es: { q: '¿Por qué Santo Domingo se convirtió en la capital y no La Isabela, que fue fundada antes?', options: ['Porque La Isabela tenía WiFi más lento', 'Porque La Isabela fue abandonada por enfermedades y conflictos, y Santo Domingo tenía un mejor puerto en el sur', 'Porque los taínos destruyeron La Isabela', 'Porque a Colón no le gustaba el norte'], answer: 1, explanation: 'La Isabela fracasó por enfermedades, hambre y conflictos. Santo Domingo fue fundada luego en la costa sur con el río Ozama como puerto natural, mucho más estratégico.' },
      en: { q: 'Why did Santo Domingo become the capital and not La Isabela, which was founded earlier?', options: ['Because La Isabela had slower WiFi', 'Because La Isabela was abandoned due to disease and conflict, and Santo Domingo had a better southern port', 'Because the Taíno destroyed La Isabela', 'Because Columbus didn\'t like the north'], answer: 1, explanation: 'La Isabela failed due to disease, hunger, and conflict. Santo Domingo was later founded on the southern coast with the Ozama River as a natural port, much more strategic.' },
      fr: { q: "Pourquoi Saint-Domingue est-elle devenue la capitale et pas La Isabela, qui a été fondée avant ?", options: ['Parce que La Isabela avait un WiFi plus lent', 'Parce que La Isabela a été abandonnée à cause de maladies et conflits, et Saint-Domingue avait un meilleur port au sud', 'Parce que les Taïnos ont détruit La Isabela', "Parce que Colomb n'aimait pas le nord"], answer: 1, explanation: "La Isabela a échoué à cause de maladies, de la famine et de conflits. Saint-Domingue a été fondée plus tard sur la côte sud avec le fleuve Ozama comme port naturel, bien plus stratégique." }
    }
  },
  {
    id: 'geo-048', type: 'mcq',
    lang: {
      es: { q: 'En el juego, ¿qué técnica se usa para generar los bosques en el mapa?', options: ['Inteligencia artificial', 'Hash pseudo-aleatorio', 'Fractales de Mandelbrot', 'Se dibujaron a mano uno por uno'], answer: 1, explanation: 'Los bosques se generan con un hash pseudo-aleatorio. Es como un generador de semillas de Minecraft pero más simple.' },
      en: { q: 'In the game, what technique is used to generate forests on the map?', options: ['Artificial intelligence', 'Pseudo-random hash', 'Mandelbrot fractals', 'They were hand-drawn one by one'], answer: 1, explanation: 'Forests are generated with a pseudo-random hash. It\'s like a Minecraft seed generator but simpler.' },
      fr: { q: 'Dans le jeu, quelle technique est utilisée pour générer les forêts sur la carte ?', options: ['Intelligence artificielle', 'Hash pseudo-aléatoire', 'Fractales de Mandelbrot', 'Elles ont été dessinées à la main une par une'], answer: 1, explanation: "Les forêts sont générées avec un hash pseudo-aléatoire. C'est comme un générateur de seeds Minecraft mais plus simple." }
    }
  },
  {
    id: 'geo-049', type: 'mcq',
    lang: {
      es: { q: '¿Cuál es el nombre taíno de la Isla Cabritos, donde habita Enriquillo en el juego?', options: ['Quisqueya', 'Guarizacca', 'Bohío', 'Ayiti'], answer: 1, explanation: 'Guarizacca era el nombre taíno de la Isla Cabritos. En el juego, es donde vive Enriquillo y donde se esconde el boss secreto del Espíritu del Cemí.' },
      en: { q: 'What is the Taíno name for Isla Cabritos, where Enriquillo lives in the game?', options: ['Quisqueya', 'Guarizacca', 'Bohío', 'Ayiti'], answer: 1, explanation: 'Guarizacca was the Taíno name for Isla Cabritos. In the game, it\'s where Enriquillo lives and where the secret Cemí Spirit boss hides.' },
      fr: { q: "Quel est le nom taïno de l'Isla Cabritos, où vit Enriquillo dans le jeu ?", options: ['Quisqueya', 'Guarizacca', 'Bohío', 'Ayiti'], answer: 1, explanation: "Guarizacca était le nom taïno de l'Isla Cabritos. Dans le jeu, c'est là que vit Enriquillo et où se cache le boss secret de l'Esprit du Cemí." }
    }
  },
  {
    id: 'geo-050', type: 'mcq',
    lang: {
      es: { q: '¿Qué característica especial tiene el Parque Nacional Cotubanamá donde está el Manantial de la Aleta?', options: ['Tiene el volcán más activo del Caribe', 'Combina ecosistemas terrestres y marinos, con un cenote sagrado taíno', 'Es la zona más fría de la isla', 'Es un desierto con cactus gigantes'], answer: 1, explanation: 'Cotubanamá combina bosques, costas, arrecifes y el cenote del Manantial de la Aleta, un sitio sagrado taíno con ofrendas sumergidas.' },
      en: { q: 'What special feature does Cotubanamá National Park have, where Manantial de la Aleta is located?', options: ['It has the most active volcano in the Caribbean', 'It combines land and marine ecosystems with a sacred Taíno cenote', 'It\'s the coldest zone on the island', 'It\'s a desert with giant cacti'], answer: 1, explanation: 'Cotubanamá combines forests, coastlines, reefs, and the Manantial de la Aleta cenote, a sacred Taíno site with submerged offerings.' },
      fr: { q: "Quelle caractéristique spéciale a le Parc National de Cotubanamá, où se trouve le Manantial de la Aleta ?", options: ['Il a le volcan le plus actif des Caraïbes', 'Il combine des écosystèmes terrestres et marins avec un cénote sacré taïno', "C'est la zone la plus froide de l'île", "C'est un désert avec des cactus géants"], answer: 1, explanation: "Cotubanamá combine forêts, côtes, récifs et le cénote du Manantial de la Aleta, un site sacré taïno avec des offrandes submergées." }
    }
  },

  // ── 51-75: FILL IN THE BLANK ──────────────────────────────────────

  {
    id: 'geo-051', type: 'fill',
    lang: {
      es: { q: 'El Lago Enriquillo está a _____ metros bajo el nivel del mar.', answer: ['40', 'cuarenta'], explanation: '40 metros bajo el nivel del mar. Es la depresión más profunda del Caribe insular.' },
      en: { q: 'Lake Enriquillo is _____ meters below sea level.', answer: ['40', 'forty'], explanation: '40 meters below sea level. It\'s the deepest depression in the insular Caribbean.' },
      fr: { q: 'Le lac Enriquillo se trouve à _____ mètres sous le niveau de la mer.', answer: ['40', 'quarante'], explanation: "40 mètres sous le niveau de la mer. C'est la dépression la plus profonde des Caraïbes insulaires." }
    }
  },
  {
    id: 'geo-052', type: 'fill',
    lang: {
      es: { q: 'La isla de La Española es compartida por República Dominicana y _______.', answer: ['Haití', 'Haiti'], explanation: 'Haití ocupa el tercio occidental de La Española.' },
      en: { q: 'The island of Hispaniola is shared by the Dominican Republic and _______.', answer: ['Haiti', 'Haití'], explanation: 'Haiti occupies the western third of Hispaniola.' },
      fr: { q: "L'île d'Hispaniola est partagée par la République dominicaine et _______.", answer: ['Haïti', 'Haiti'], explanation: "Haïti occupe le tiers occidental d'Hispaniola." }
    }
  },
  {
    id: 'geo-053', type: 'fill',
    lang: {
      es: { q: 'El _______ es el pico más alto del Caribe, ubicado en la Cordillera Central.', answer: ['Pico Duarte', 'pico duarte', 'Duarte'], explanation: 'Pico Duarte, a 3,098 metros de altitud. Lleva el nombre de Juan Pablo Duarte, padre fundador de la República Dominicana.' },
      en: { q: 'The _______ is the highest peak in the Caribbean, located in the Cordillera Central.', answer: ['Pico Duarte', 'pico duarte', 'Duarte'], explanation: 'Pico Duarte, at 3,098 meters elevation. Named after Juan Pablo Duarte, founding father of the Dominican Republic.' },
      fr: { q: 'Le _______ est le plus haut sommet des Caraïbes, situé dans la Cordillera Central.', answer: ['Pico Duarte', 'pico duarte', 'Duarte'], explanation: 'Le Pico Duarte, à 3 098 mètres. Nommé en hommage à Juan Pablo Duarte, père fondateur de la République dominicaine.' }
    }
  },
  {
    id: 'geo-054', type: 'fill',
    lang: {
      es: { q: 'La Zona Colonial está en la ciudad de _______, la primera ciudad europea de las Américas.', answer: ['Santo Domingo', 'santo domingo'], explanation: 'Santo Domingo, fundada en 1498 en la desembocadura del río Ozama.' },
      en: { q: 'The Zona Colonial is in the city of _______, the first European city in the Americas.', answer: ['Santo Domingo', 'santo domingo'], explanation: 'Santo Domingo, founded in 1498 at the mouth of the Ozama River.' },
      fr: { q: 'La Zona Colonial se trouve dans la ville de _______, la première ville européenne des Amériques.', answer: ['Saint-Domingue', 'Santo Domingo', 'saint-domingue', 'santo domingo'], explanation: "Saint-Domingue, fondée en 1498 à l'embouchure du fleuve Ozama." }
    }
  },
  {
    id: 'geo-055', type: 'fill',
    lang: {
      es: { q: 'El Manantial de la Aleta está en el Parque Nacional _______, cerca de Bayahíbe.', answer: ['Cotubanamá', 'Cotubamana', 'cotubanamá', 'cotubamana', 'Del Este'], explanation: 'Parque Nacional Cotubanamá (antes llamado Parque Nacional del Este), en la costa sureste.' },
      en: { q: 'Manantial de la Aleta is in _______ National Park, near Bayahíbe.', answer: ['Cotubanamá', 'Cotubamana', 'cotubanamá', 'cotubamana', 'Del Este'], explanation: 'Cotubanamá National Park (formerly called Del Este National Park), on the southeastern coast.' },
      fr: { q: 'Le Manantial de la Aleta se trouve dans le Parc National de _______, près de Bayahíbe.', answer: ['Cotubanamá', 'Cotubamana', 'cotubanamá', 'cotubamana', 'Del Este'], explanation: "Parc National de Cotubanamá (anciennement appelé Parc National de l'Est), sur la côte sud-est." }
    }
  },
  {
    id: 'geo-056', type: 'fill',
    lang: {
      es: { q: 'La Isabela fue fundada en lo que hoy es la provincia de _______, en la costa norte.', answer: ['Puerto Plata', 'puerto plata'], explanation: 'Puerto Plata, en la costa norte atlántica de la República Dominicana.' },
      en: { q: 'La Isabela was founded in what is now _______ province, on the northern coast.', answer: ['Puerto Plata', 'puerto plata'], explanation: 'Puerto Plata, on the northern Atlantic coast of the Dominican Republic.' },
      fr: { q: 'La Isabela a été fondée dans ce qui est aujourd\'hui la province de _______, sur la côte nord.', answer: ['Puerto Plata', 'puerto plata'], explanation: 'Puerto Plata, sur la côte atlantique nord de la République dominicaine.' }
    }
  },
  {
    id: 'geo-057', type: 'fill',
    lang: {
      es: { q: 'El lago hipersalino en el lado haitiano, cerca del Enriquillo, se llama Étang _______.', answer: ['Saumâtre', 'Saumatre', 'saumâtre', 'saumatre'], explanation: 'Étang Saumâtre (que significa "lago salobre" en francés). Es el segundo lago más grande de La Española.' },
      en: { q: 'The hypersaline lake on the Haitian side, near Enriquillo, is called Étang _______.', answer: ['Saumâtre', 'Saumatre', 'saumâtre', 'saumatre'], explanation: 'Étang Saumâtre (meaning "brackish lake" in French). It\'s the second largest lake in Hispaniola.' },
      fr: { q: "Le lac hypersalin du côté haïtien, près d'Enriquillo, s'appelle Étang _______.", answer: ['Saumâtre', 'Saumatre', 'saumâtre', 'saumatre'], explanation: "L'Étang Saumâtre (qui signifie « lac saumâtre »). C'est le deuxième plus grand lac d'Hispaniola." }
    }
  },
  {
    id: 'geo-058', type: 'fill',
    lang: {
      es: { q: 'El río que atraviesa Santo Domingo se llama Río _______.', answer: ['Ozama', 'ozama'], explanation: 'El Río Ozama divide Santo Domingo y desemboca en el Mar Caribe. Es como el río que separa dos distritos en Los Juegos del Hambre.' },
      en: { q: 'The river that flows through Santo Domingo is called the _______ River.', answer: ['Ozama', 'ozama'], explanation: 'The Ozama River divides Santo Domingo and empties into the Caribbean Sea. Like the river separating two districts in The Hunger Games.' },
      fr: { q: 'Le fleuve qui traverse Saint-Domingue s\'appelle le fleuve _______.', answer: ['Ozama', 'ozama'], explanation: "Le fleuve Ozama divise Saint-Domingue et se jette dans la mer des Caraïbes. Comme le fleuve séparant deux districts dans Hunger Games." }
    }
  },
  {
    id: 'geo-059', type: 'fill',
    lang: {
      es: { q: 'Las Cuevas del Pomier están en la provincia de San _______.', answer: ['Cristóbal', 'Cristobal', 'cristóbal', 'cristobal'], explanation: 'San Cristóbal, a unos 40 km de Santo Domingo. Las cuevas tienen más de 6,000 pictografías y petroglifos.' },
      en: { q: 'The Cuevas del Pomier are in the province of San _______.', answer: ['Cristóbal', 'Cristobal', 'cristóbal', 'cristobal'], explanation: 'San Cristóbal, about 40 km from Santo Domingo. The caves have over 6,000 pictographs and petroglyphs.' },
      fr: { q: 'Les Cuevas del Pomier se trouvent dans la province de San _______.', answer: ['Cristóbal', 'Cristobal', 'cristóbal', 'cristobal'], explanation: 'San Cristóbal, à environ 40 km de Saint-Domingue. Les grottes contiennent plus de 6 000 pictographies et pétroglyphes.' }
    }
  },
  {
    id: 'geo-060', type: 'fill',
    lang: {
      es: { q: '_______ Cana está en la punta oriental de la República Dominicana, donde se ubica el aeropuerto del nivel Mundo Jurídico.', answer: ['Punta', 'punta'], explanation: 'Punta Cana, en el extremo este. En el juego, ahí es donde ocurre el combate contra el traficante en el aeropuerto.' },
      en: { q: '_______ Cana is on the eastern tip of the Dominican Republic, where the Juridical World airport level is located.', answer: ['Punta', 'punta'], explanation: 'Punta Cana, on the eastern tip. In the game, that\'s where the fight against the trafficker takes place at the airport.' },
      fr: { q: '_______ Cana est à la pointe orientale de la République dominicaine, où se trouve le niveau Monde Juridique de l\'aéroport.', answer: ['Punta', 'punta'], explanation: "Punta Cana, à la pointe est. Dans le jeu, c'est là que se déroule le combat contre le trafiquant à l'aéroport." }
    }
  },
  {
    id: 'geo-061', type: 'fill',
    lang: {
      es: { q: 'La cadena montañosa principal de la isla donde está el Pico Duarte se llama Cordillera _______.', answer: ['Central', 'central'], explanation: 'La Cordillera Central es la espina dorsal de La Española. Atraviesa el centro de la isla de noroeste a sureste.' },
      en: { q: 'The main mountain range of the island where Pico Duarte is located is called the Cordillera _______.', answer: ['Central', 'central'], explanation: 'The Cordillera Central is the backbone of Hispaniola. It crosses the center of the island from northwest to southeast.' },
      fr: { q: 'La chaîne de montagnes principale de l\'île où se trouve le Pico Duarte s\'appelle la Cordillera _______.', answer: ['Central', 'central', 'Centrale', 'centrale'], explanation: "La Cordillera Central est la colonne vertébrale d'Hispaniola. Elle traverse le centre de l'île du nord-ouest au sud-est." }
    }
  },
  {
    id: 'geo-062', type: 'fill',
    lang: {
      es: { q: 'El Lago Enriquillo es aproximadamente _____ veces más salado que el océano.', answer: ['3', 'tres', 'three', 'trois'], explanation: '3 veces más salado. Es hipersalino por la evaporación sin salida al mar.' },
      en: { q: 'Lake Enriquillo is approximately _____ times saltier than the ocean.', answer: ['3', 'three', 'tres', 'trois'], explanation: '3 times saltier. It\'s hypersaline due to evaporation with no ocean outlet.' },
      fr: { q: "Le lac Enriquillo est environ _____ fois plus salé que l'océan.", answer: ['3', 'trois', 'tres', 'three'], explanation: "3 fois plus salé. Il est hypersalin à cause de l'évaporation sans sortie vers la mer." }
    }
  },
  {
    id: 'geo-063', type: 'fill',
    lang: {
      es: { q: 'En el mapa del juego, "1" en el bitmap ISLA_BITMAP significa _______ y "0" significa agua.', answer: ['tierra', 'Tierra', 'land'], explanation: 'El bitmap usa 1=tierra y 0=agua. Simple como el código binario: 1 y 0, como Matrix pero para islas.' },
      en: { q: 'In the game map, "1" in the ISLA_BITMAP bitmap means _______ and "0" means water.', answer: ['land', 'Land', 'tierra'], explanation: 'The bitmap uses 1=land and 0=water. Simple as binary code: 1 and 0, like the Matrix but for islands.' },
      fr: { q: 'Dans la carte du jeu, "1" dans le bitmap ISLA_BITMAP signifie _______ et "0" signifie eau.', answer: ['terre', 'Terre', 'land'], explanation: 'Le bitmap utilise 1=terre et 0=eau. Simple comme le code binaire : 1 et 0, comme Matrix mais pour les îles.' }
    }
  },
  {
    id: 'geo-064', type: 'fill',
    lang: {
      es: { q: 'La Sierra de _______ es una cadena montañosa en el suroeste de la República Dominicana, cerca del Lago Enriquillo.', answer: ['Bahoruco', 'bahoruco', 'Baoruco', 'baoruco'], explanation: 'La Sierra de Bahoruco bordea el lado sur del Lago Enriquillo. Es una de las sierras con mayor biodiversidad del Caribe.' },
      en: { q: 'The Sierra de _______ is a mountain range in the southwest of the Dominican Republic, near Lake Enriquillo.', answer: ['Bahoruco', 'bahoruco', 'Baoruco', 'baoruco'], explanation: 'The Sierra de Bahoruco borders the southern side of Lake Enriquillo. It\'s one of the most biodiverse ranges in the Caribbean.' },
      fr: { q: 'La Sierra de _______ est une chaîne de montagnes au sud-ouest de la République dominicaine, près du lac Enriquillo.', answer: ['Bahoruco', 'bahoruco', 'Baoruco', 'baoruco'], explanation: "La Sierra de Bahoruco borde le côté sud du lac Enriquillo. C'est l'une des sierras les plus riches en biodiversité des Caraïbes." }
    }
  },
  {
    id: 'geo-065', type: 'fill',
    lang: {
      es: { q: 'El nombre de la isla compartida por RD y Haití es La _______.', answer: ['Española', 'española', 'Hispaniola', 'hispaniola'], explanation: 'La Española (Hispaniola en otros idiomas). Es la segunda isla más grande del Caribe después de Cuba.' },
      en: { q: 'The name of the island shared by DR and Haiti is _______.', answer: ['Hispaniola', 'hispaniola', 'La Española', 'Española'], explanation: 'Hispaniola (La Española in Spanish). It\'s the second largest Caribbean island after Cuba.' },
      fr: { q: "Le nom de l'île partagée par la RD et Haïti est _______.", answer: ['Hispaniola', 'hispaniola', 'La Española', 'Española'], explanation: "Hispaniola (La Española en espagnol). C'est la deuxième plus grande île des Caraïbes après Cuba." }
    }
  },
  {
    id: 'geo-066', type: 'fill',
    lang: {
      es: { q: 'El río más largo de la República Dominicana es el Yaque del _______.', answer: ['Norte', 'norte'], explanation: 'El Yaque del Norte (296 km) es el río más largo del país. Nace en la Cordillera Central y desemboca en la bahía de Monte Cristi, al noroeste.' },
      en: { q: 'The longest river in the Dominican Republic is the Yaque del _______.', answer: ['Norte', 'norte', 'North', 'north'], explanation: 'The Yaque del Norte (296 km) is the country\'s longest river. It originates in the Cordillera Central and empties into Monte Cristi Bay, to the northwest.' },
      fr: { q: 'Le plus long fleuve de la République dominicaine est le Yaque del _______.', answer: ['Norte', 'norte', 'Nord', 'nord'], explanation: 'Le Yaque del Norte (296 km) est le plus long fleuve du pays. Il prend sa source dans la Cordillera Central et se jette dans la baie de Monte Cristi, au nord-ouest.' }
    }
  },
  {
    id: 'geo-067', type: 'fill',
    lang: {
      es: { q: 'La isla dentro del Lago Enriquillo se llama Isla _______.', answer: ['Cabritos', 'cabritos'], explanation: 'Isla Cabritos. Hogar de cocodrilos americanos e iguanas endémicas. También conocida como Guarizacca en taíno.' },
      en: { q: 'The island inside Lake Enriquillo is called Isla _______.', answer: ['Cabritos', 'cabritos'], explanation: 'Isla Cabritos. Home to American crocodiles and endemic iguanas. Also known as Guarizacca in Taíno.' },
      fr: { q: "L'île dans le lac Enriquillo s'appelle Isla _______.", answer: ['Cabritos', 'cabritos'], explanation: "Isla Cabritos. Foyer de crocodiles américains et d'iguanes endémiques. Aussi connue sous le nom de Guarizacca en taïno." }
    }
  },
  {
    id: 'geo-068', type: 'fill',
    lang: {
      es: { q: 'El juego tiene _____ mundos posicionados en ubicaciones geográficas reales del mapa.', answer: ['13', 'trece'], explanation: '13 mundos distribuidos geográficamente. Desde La Isabela al norte hasta el Lago Enriquillo al suroeste y Punta Cana al este.' },
      en: { q: 'The game has _____ worlds positioned at real geographic locations on the map.', answer: ['13', 'thirteen'], explanation: '13 worlds distributed geographically. From La Isabela in the north to Lake Enriquillo in the southwest and Punta Cana in the east.' },
      fr: { q: 'Le jeu a _____ mondes positionnés à des emplacements géographiques réels sur la carte.', answer: ['13', 'treize'], explanation: "13 mondes distribués géographiquement. De La Isabela au nord jusqu'au lac Enriquillo au sud-ouest et Punta Cana à l'est." }
    }
  },
  {
    id: 'geo-069', type: 'fill',
    lang: {
      es: { q: 'El océano _______ está al norte de la República Dominicana.', answer: ['Atlántico', 'Atlantico', 'atlantico', 'atlántico', 'Atlantic'], explanation: 'El Océano Atlántico baña toda la costa norte de la isla. Colón lo cruzó para llegar aquí.' },
      en: { q: 'The _______ Ocean is to the north of the Dominican Republic.', answer: ['Atlantic', 'atlantic', 'Atlántico'], explanation: 'The Atlantic Ocean borders the entire northern coast. Columbus crossed it to get here.' },
      fr: { q: "L'océan _______ se trouve au nord de la République dominicaine.", answer: ['Atlantique', 'atlantique', 'Atlantic'], explanation: "L'océan Atlantique borde toute la côte nord de l'île. Colomb l'a traversé pour arriver ici." }
    }
  },
  {
    id: 'geo-070', type: 'fill',
    lang: {
      es: { q: 'El mar _______ baña la costa sur de la República Dominicana.', answer: ['Caribe', 'caribe', 'Caribbean', 'des Caraïbes'], explanation: 'El Mar Caribe, también llamado Mar de las Antillas. Es donde ocurren las aventuras acuáticas del juego.' },
      en: { q: 'The _______ Sea borders the southern coast of the Dominican Republic.', answer: ['Caribbean', 'caribbean', 'Caribe'], explanation: 'The Caribbean Sea, also called the Sea of the Antilles. It\'s where the game\'s aquatic adventures take place.' },
      fr: { q: 'La mer des _______ borde la côte sud de la République dominicaine.', answer: ['Caraïbes', 'caraïbes', 'Caraibes', 'caraibes'], explanation: "La mer des Caraïbes, aussi appelée mer des Antilles. C'est là que se déroulent les aventures aquatiques du jeu." }
    }
  },
  {
    id: 'geo-071', type: 'fill',
    lang: {
      es: { q: 'El Pico Duarte mide _______ metros de altitud (redondea a la unidad).', answer: ['3098', '3,098', '3.098'], explanation: '3,098 metros. Más alto que cualquier otra montaña del Caribe insular. Es como 10 Torres Eiffel apiladas.' },
      en: { q: 'Pico Duarte is _______ meters in altitude (round to the nearest unit).', answer: ['3098', '3,098', '3.098'], explanation: '3,098 meters. Taller than any other mountain in the insular Caribbean. That\'s like 10 Eiffel Towers stacked up.' },
      fr: { q: 'Le Pico Duarte mesure _______ mètres d\'altitude (arrondir à l\'unité).', answer: ['3098', '3 098', '3,098', '3.098'], explanation: "3 098 mètres. Plus haut que n'importe quelle autre montagne des Caraïbes insulaires. C'est comme 10 Tours Eiffel empilées." }
    }
  },
  {
    id: 'geo-072', type: 'fill',
    lang: {
      es: { q: 'En el código del juego, los ríos se generan con el algoritmo de _______, el mismo que se usaba para dibujar líneas en las primeras pantallas de computadora.', answer: ['Bresenham', 'bresenham'], explanation: 'El algoritmo de Bresenham (1962) calcula qué píxeles encender para formar una línea recta. En el juego, traza los ríos tile por tile.' },
      en: { q: 'In the game code, rivers are generated using _______\'s algorithm, the same one used to draw lines on early computer screens.', answer: ['Bresenham', 'bresenham'], explanation: 'Bresenham\'s algorithm (1962) calculates which pixels to light up to form a straight line. In the game, it traces rivers tile by tile.' },
      fr: { q: 'Dans le code du jeu, les rivières sont générées avec l\'algorithme de _______, le même utilisé pour tracer des lignes sur les premiers écrans d\'ordinateur.', answer: ['Bresenham', 'bresenham'], explanation: "L'algorithme de Bresenham (1962) calcule quels pixels allumer pour former une ligne droite. Dans le jeu, il trace les rivières tuile par tuile." }
    }
  },
  {
    id: 'geo-073', type: 'fill',
    lang: {
      es: { q: 'El Manantial de la Aleta es un tipo de formación geológica llamada _______, similar a los de la Península de Yucatán.', answer: ['cenote', 'Cenote', 'cénote'], explanation: 'Un cenote: depresión natural con agua subterránea, formada por colapso de roca caliza. Los mayas y los taínos los consideraban sagrados.' },
      en: { q: 'Manantial de la Aleta is a type of geological formation called a _______, similar to those in the Yucatán Peninsula.', answer: ['cenote', 'Cenote'], explanation: 'A cenote: a natural depression with groundwater, formed by limestone collapse. Both the Maya and the Taíno considered them sacred.' },
      fr: { q: 'Le Manantial de la Aleta est un type de formation géologique appelée _______, similaire à ceux de la péninsule du Yucatán.', answer: ['cénote', 'cenote', 'Cénote', 'Cenote'], explanation: "Un cénote : une dépression naturelle avec de l'eau souterraine, formée par l'effondrement du calcaire. Les Mayas et les Taïnos les considéraient comme sacrés." }
    }
  },
  {
    id: 'geo-074', type: 'fill',
    lang: {
      es: { q: 'República Dominicana ocupa los dos tercios _______ (este/oeste) de la isla de La Española.', answer: ['orientales', 'este', 'orientals', 'eastern', 'east'], explanation: 'Los dos tercios orientales (este). Haití tiene el tercio occidental (oeste).' },
      en: { q: 'The Dominican Republic occupies the _______ (eastern/western) two-thirds of the island of Hispaniola.', answer: ['eastern', 'Eastern', 'east', 'East'], explanation: 'The eastern two-thirds. Haiti has the western third.' },
      fr: { q: "La République dominicaine occupe les deux tiers _______ (est/ouest) de l'île d'Hispaniola.", answer: ['orientaux', 'est', 'Eastern', 'eastern'], explanation: "Les deux tiers orientaux (est). Haïti a le tiers occidental (ouest)." }
    }
  },
  {
    id: 'geo-075', type: 'fill',
    lang: {
      es: { q: 'El juego ArcLycée tiene un mapa Leaflet con _____ capas de datos toggleables (sitios taínos, coloniales, naufragios, museos, etc.).', answer: ['6', 'seis'], explanation: '6 capas: Taínos, Coloniales, Naufragios, Museos, Inexplorados y Potencial Arqueológico.' },
      en: { q: 'The ArcLycée game has a Leaflet map with _____ toggleable data layers (Taíno sites, colonial, shipwrecks, museums, etc.).', answer: ['6', 'six'], explanation: '6 layers: Taíno, Colonial, Shipwrecks, Museums, Unexplored, and Archaeological Potential.' },
      fr: { q: 'Le jeu ArcLycée a une carte Leaflet avec _____ couches de données commutables (sites taïnos, coloniaux, naufrages, musées, etc.).', answer: ['6', 'six'], explanation: '6 couches : Taïnos, Coloniaux, Naufrages, Musées, Inexplorés et Potentiel Archéologique.' }
    }
  },

  // ── 76-100: MATCH ─────────────────────────────────────────────────

  {
    id: 'geo-076', type: 'match',
    lang: {
      es: { q: 'Conecta cada lugar con su ubicación geográfica — como un mini-juego de emparejamiento de Candy Crush pero educativo:', pairs: [['La Isabela', 'Costa norte (Puerto Plata)'], ['Zona Colonial', 'Santo Domingo (costa sur)'], ['Lago Enriquillo', 'Suroeste (frontera haitiana)'], ['Punta Cana', 'Punta este']], explanation: 'Cada lugar del juego corresponde a una zona real de la República Dominicana.' },
      en: { q: 'Connect each place with its geographic location — like a Candy Crush matching mini-game but educational:', pairs: [['La Isabela', 'North coast (Puerto Plata)'], ['Zona Colonial', 'Santo Domingo (south coast)'], ['Lake Enriquillo', 'Southwest (Haitian border)'], ['Punta Cana', 'Eastern tip']], explanation: 'Each game location corresponds to a real area in the Dominican Republic.' },
      fr: { q: 'Relie chaque lieu à sa localisation géographique — comme un mini-jeu d\'association Candy Crush mais éducatif :', pairs: [['La Isabela', 'Côte nord (Puerto Plata)'], ['Zona Colonial', 'Saint-Domingue (côte sud)'], ['Lac Enriquillo', 'Sud-ouest (frontière haïtienne)'], ['Punta Cana', 'Pointe est']], explanation: 'Chaque lieu du jeu correspond à une zone réelle de la République dominicaine.' }
    }
  },
  {
    id: 'geo-077', type: 'match',
    lang: {
      es: { q: 'Empareja cada río con la ciudad o zona por donde pasa:', pairs: [['Río Ozama', 'Santo Domingo'], ['Yaque del Norte', 'Noroeste hacia Monte Cristi'], ['Yaque del Sur', 'Suroeste hacia Barahona'], ['Todos los anteriores', 'Nacen en la Cordillera Central']], explanation: 'Los tres ríos principales nacen en la Cordillera Central pero van en direcciones diferentes.' },
      en: { q: 'Match each river with the city or area it flows through:', pairs: [['Ozama River', 'Santo Domingo'], ['Yaque del Norte', 'Northwest toward Monte Cristi'], ['Yaque del Sur', 'Southwest toward Barahona'], ['All of the above', 'Originate in the Cordillera Central']], explanation: 'All three main rivers originate in the Cordillera Central but flow in different directions.' },
      fr: { q: 'Associe chaque fleuve à la ville ou zone qu\'il traverse :', pairs: [['Fleuve Ozama', 'Saint-Domingue'], ['Yaque del Norte', 'Nord-ouest vers Monte Cristi'], ['Yaque del Sur', 'Sud-ouest vers Barahona'], ['Tous les précédents', 'Naissent dans la Cordillera Central']], explanation: 'Les trois principaux fleuves naissent dans la Cordillera Central mais coulent dans des directions différentes.' }
    }
  },
  {
    id: 'geo-078', type: 'match',
    lang: {
      es: { q: 'Empareja cada cuerpo de agua con su característica principal:', pairs: [['Lago Enriquillo', '40m bajo el nivel del mar'], ['Étang Saumâtre', 'Lado haitiano de la depresión'], ['Mar Caribe', 'Costa sur de RD'], ['Océano Atlántico', 'Costa norte de RD']], explanation: 'Cuatro cuerpos de agua que rodean o están en la isla, cada uno con características únicas.' },
      en: { q: 'Match each body of water with its main characteristic:', pairs: [['Lake Enriquillo', '40m below sea level'], ['Étang Saumâtre', 'Haitian side of the depression'], ['Caribbean Sea', 'South coast of DR'], ['Atlantic Ocean', 'North coast of DR']], explanation: 'Four bodies of water that surround or are on the island, each with unique characteristics.' },
      fr: { q: "Associe chaque étendue d'eau à sa caractéristique principale :", pairs: [['Lac Enriquillo', '40 m sous le niveau de la mer'], ['Étang Saumâtre', 'Côté haïtien de la dépression'], ['Mer des Caraïbes', 'Côte sud de la RD'], ['Océan Atlantique', 'Côte nord de la RD']], explanation: "Quatre étendues d'eau qui entourent ou se trouvent sur l'île, chacune avec des caractéristiques uniques." }
    }
  },
  {
    id: 'geo-079', type: 'match',
    lang: {
      es: { q: 'Conecta cada técnica de programación con lo que genera en el mapa — es como un crafting table de Minecraft pero con código:', pairs: [['Bitmap ISLA_BITMAP', 'Forma de la isla (tierra/agua)'], ['Algoritmo de Bresenham', 'Ríos'], ['_distanciaACordilleras()', 'Montañas'], ['Hash pseudo-aleatorio', 'Bosques']], explanation: 'El mapa usa 4 técnicas diferentes para generar el terreno proceduralmente, sin dibujar nada a mano.' },
      en: { q: 'Connect each programming technique with what it generates on the map — like a Minecraft crafting table but with code:', pairs: [['ISLA_BITMAP bitmap', 'Island shape (land/water)'], ['Bresenham\'s algorithm', 'Rivers'], ['_distanciaACordilleras()', 'Mountains'], ['Pseudo-random hash', 'Forests']], explanation: 'The map uses 4 different techniques to generate terrain procedurally, without drawing anything by hand.' },
      fr: { q: 'Relie chaque technique de programmation à ce qu\'elle génère sur la carte — comme une table de craft Minecraft mais avec du code :', pairs: [['Bitmap ISLA_BITMAP', "Forme de l'île (terre/eau)"], ['Algorithme de Bresenham', 'Rivières'], ['_distanciaACordilleras()', 'Montagnes'], ['Hash pseudo-aléatoire', 'Forêts']], explanation: 'La carte utilise 4 techniques différentes pour générer le terrain de manière procédurale, sans rien dessiner à la main.' }
    }
  },
  {
    id: 'geo-080', type: 'match',
    lang: {
      es: { q: 'Empareja cada cadena montañosa con su ubicación general en la isla:', pairs: [['Cordillera Central', 'Centro de la isla (tiene Pico Duarte)'], ['Sierra de Bahoruco', 'Suroeste (bordea Lago Enriquillo)'], ['Cordillera Septentrional', 'Norte (paralela a la costa atlántica)'], ['Sierra de Neiba', 'Oeste (entre los dos lagos)']], explanation: 'La isla tiene múltiples cadenas montañosas en distintas orientaciones, lo que crea microclimas variados.' },
      en: { q: 'Match each mountain range with its general location on the island:', pairs: [['Cordillera Central', 'Center of the island (has Pico Duarte)'], ['Sierra de Bahoruco', 'Southwest (borders Lake Enriquillo)'], ['Cordillera Septentrional', 'North (parallel to the Atlantic coast)'], ['Sierra de Neiba', 'West (between the two lakes)']], explanation: 'The island has multiple mountain ranges in different orientations, creating varied microclimates.' },
      fr: { q: "Associe chaque chaîne de montagnes à sa localisation générale sur l'île :", pairs: [['Cordillera Central', "Centre de l'île (a le Pico Duarte)"], ['Sierra de Bahoruco', 'Sud-ouest (borde le lac Enriquillo)'], ['Cordillera Septentrional', 'Nord (parallèle à la côte atlantique)'], ['Sierra de Neiba', 'Ouest (entre les deux lacs)']], explanation: "L'île a plusieurs chaînes de montagnes dans différentes orientations, créant des microclimats variés." }
    }
  },
  {
    id: 'geo-081', type: 'match',
    lang: {
      es: { q: 'Empareja cada lugar del juego con el nivel/mundo donde aparece — como emparejar pokémon con sus tipos:', pairs: [['Lago Enriquillo', 'Nodo 10 — Enriquillo y cocodrilos'], ['Manantial de la Aleta', 'Nodo 12 — cenote con 3 fases'], ['La Isabela', 'Costa norte — duelo de espadas'], ['Punta Cana', 'Mundo Jurídico — aeropuerto']], explanation: 'Cada mundo del juego está ubicado donde realmente existe ese lugar en la República Dominicana.' },
      en: { q: 'Match each game location with the level/world where it appears — like matching pokémon with their types:', pairs: [['Lake Enriquillo', 'Node 10 — Enriquillo and crocodiles'], ['Manantial de la Aleta', 'Node 12 — cenote with 3 phases'], ['La Isabela', 'North coast — sword duel'], ['Punta Cana', 'Juridical World — airport']], explanation: 'Each game world is located where that place actually exists in the Dominican Republic.' },
      fr: { q: 'Associe chaque lieu du jeu au niveau/monde où il apparaît — comme associer des pokémon à leurs types :', pairs: [['Lac Enriquillo', 'Nœud 10 — Enriquillo et crocodiles'], ['Manantial de la Aleta', 'Nœud 12 — cénote avec 3 phases'], ['La Isabela', 'Côte nord — duel à l\'épée'], ['Punta Cana', 'Monde Juridique — aéroport']], explanation: 'Chaque monde du jeu est situé là où cet endroit existe réellement en République dominicaine.' }
    }
  },
  {
    id: 'geo-082', type: 'match',
    lang: {
      es: { q: 'Conecta cada dato numérico con su correspondencia geográfica:', pairs: [['40 metros', 'Profundidad bajo el mar del Lago Enriquillo'], ['3,098 metros', 'Altitud del Pico Duarte'], ['128×68', 'Dimensiones del bitmap del mapa'], ['3 veces', 'Salinidad del Enriquillo vs. océano']], explanation: 'Números clave de la geografía del juego y la isla real.' },
      en: { q: 'Connect each number with its geographic match:', pairs: [['40 meters', 'Depth below sea level of Lake Enriquillo'], ['3,098 meters', 'Altitude of Pico Duarte'], ['128×68', 'Game map bitmap dimensions'], ['3 times', 'Enriquillo salinity vs. ocean']], explanation: 'Key numbers from the game\'s geography and the real island.' },
      fr: { q: 'Relie chaque donnée numérique à sa correspondance géographique :', pairs: [['40 mètres', 'Profondeur sous la mer du lac Enriquillo'], ['3 098 mètres', 'Altitude du Pico Duarte'], ['128×68', 'Dimensions du bitmap de la carte'], ['3 fois', "Salinité de l'Enriquillo vs. océan"]], explanation: "Chiffres clés de la géographie du jeu et de l'île réelle." }
    }
  },
  {
    id: 'geo-083', type: 'match',
    lang: {
      es: { q: 'Empareja cada extremo geográfico de RD con lo que encontrarías:', pairs: [['Norte (Puerto Plata)', 'La Isabela y el Atlántico'], ['Sur (Santo Domingo)', 'Zona Colonial y el Caribe'], ['Este (Punta Cana)', 'Aeropuerto y playas'], ['Suroeste (Barahona)', 'Lago Enriquillo e iguanas']], explanation: 'Cada punto cardinal de la isla tiene un carácter geográfico y cultural diferente.' },
      en: { q: 'Match each geographic extreme of the DR with what you\'d find there:', pairs: [['North (Puerto Plata)', 'La Isabela and the Atlantic'], ['South (Santo Domingo)', 'Zona Colonial and the Caribbean'], ['East (Punta Cana)', 'Airport and beaches'], ['Southwest (Barahona)', 'Lake Enriquillo and iguanas']], explanation: 'Each cardinal point of the island has a different geographic and cultural character.' },
      fr: { q: 'Associe chaque extrême géographique de la RD à ce que tu y trouverais :', pairs: [['Nord (Puerto Plata)', "La Isabela et l'Atlantique"], ['Sud (Saint-Domingue)', 'Zona Colonial et les Caraïbes'], ['Est (Punta Cana)', 'Aéroport et plages'], ['Sud-ouest (Barahona)', 'Lac Enriquillo et iguanes']], explanation: "Chaque point cardinal de l'île a un caractère géographique et culturel différent." }
    }
  },
  {
    id: 'geo-084', type: 'match',
    lang: {
      es: { q: 'Conecta cada tipo de terreno del mapa con cómo se genera en el código:', pairs: [['Tierra vs. agua', 'Lookup en bitmap (1 o 0)'], ['Montañas', 'Distancia a 8 cordilleras'], ['Ríos', 'Líneas Bresenham entre puntos'], ['Lagos', 'Array LAGOS con 2 lagos'], ['Bosques', 'Hash pseudo-aleatorio']], explanation: '5 tipos de terreno, 5 técnicas de generación procedural diferentes.' },
      en: { q: 'Connect each terrain type on the map with how it\'s generated in the code:', pairs: [['Land vs. water', 'Bitmap lookup (1 or 0)'], ['Mountains', 'Distance to 8 mountain chains'], ['Rivers', 'Bresenham lines between points'], ['Lakes', 'LAGOS array with 2 lakes'], ['Forests', 'Pseudo-random hash']], explanation: '5 terrain types, 5 different procedural generation techniques.' },
      fr: { q: 'Relie chaque type de terrain de la carte à la façon dont il est généré dans le code :', pairs: [['Terre vs. eau', 'Lookup dans le bitmap (1 ou 0)'], ['Montagnes', 'Distance à 8 chaînes de montagnes'], ['Rivières', 'Lignes Bresenham entre points'], ['Lacs', 'Tableau LAGOS avec 2 lacs'], ['Forêts', 'Hash pseudo-aléatoire']], explanation: '5 types de terrain, 5 techniques de génération procédurale différentes.' }
    }
  },
  {
    id: 'geo-085', type: 'match',
    lang: {
      es: { q: 'Empareja cada parque/zona protegida con lo que protege — nivel de conciencia ambiental activado:', pairs: [['Parque Nacional Cotubanamá', 'Cenote del Manantial de la Aleta'], ['Isla Cabritos', 'Cocodrilos e iguanas endémicas'], ['Cuevas del Pomier', 'Arte rupestre taíno'], ['Zona Colonial', 'Primera arquitectura europea']], explanation: 'Cada zona protegida conserva un aspecto diferente del patrimonio natural o cultural.' },
      en: { q: 'Match each park/protected area with what it protects — environmental awareness level activated:', pairs: [['Cotubanamá National Park', 'Manantial de la Aleta cenote'], ['Isla Cabritos', 'Crocodiles and endemic iguanas'], ['Cuevas del Pomier', 'Taíno cave art'], ['Zona Colonial', 'First European architecture']], explanation: 'Each protected area preserves a different aspect of natural or cultural heritage.' },
      fr: { q: 'Associe chaque parc/zone protégée à ce qu\'il protège — niveau de conscience environnementale activé :', pairs: [['Parc National de Cotubanamá', 'Cénote du Manantial de la Aleta'], ['Isla Cabritos', 'Crocodiles et iguanes endémiques'], ['Cuevas del Pomier', 'Art rupestre taïno'], ['Zona Colonial', 'Première architecture européenne']], explanation: 'Chaque zone protégée préserve un aspect différent du patrimoine naturel ou culturel.' }
    }
  },
  {
    id: 'geo-086', type: 'match',
    lang: {
      es: { q: 'Conecta cada comparación geográfica con la realidad:', pairs: [['Enriquillo : Mar Muerto', 'Ambos hipersalinos y bajo el nivel del mar'], ['La Española : Gran Bretaña', 'Islas divididas entre culturas'], ['Cenotes de RD : Cenotes de Yucatán', 'Misma formación en roca caliza'], ['Pico Duarte : Mont Blanc', 'Picos más altos de su región']], explanation: 'Comparaciones que ayudan a entender la geografía dominicana en contexto global.' },
      en: { q: 'Connect each geographic comparison with reality:', pairs: [['Enriquillo : Dead Sea', 'Both hypersaline and below sea level'], ['Hispaniola : Great Britain', 'Islands divided between cultures'], ['DR cenotes : Yucatán cenotes', 'Same formation in limestone'], ['Pico Duarte : Mont Blanc', 'Highest peaks in their region']], explanation: 'Comparisons that help understand Dominican geography in a global context.' },
      fr: { q: 'Relie chaque comparaison géographique à la réalité :', pairs: [['Enriquillo : Mer Morte', 'Les deux hypersalins et sous le niveau de la mer'], ['Hispaniola : Grande-Bretagne', 'Îles divisées entre cultures'], ['Cénotes de RD : Cénotes du Yucatán', 'Même formation dans le calcaire'], ['Pico Duarte : Mont Blanc', 'Plus hauts sommets de leur région']], explanation: 'Des comparaisons qui aident à comprendre la géographie dominicaine dans un contexte mondial.' }
    }
  },
  {
    id: 'geo-087', type: 'match',
    lang: {
      es: { q: 'Empareja cada provincia/ciudad con la costa donde se encuentra:', pairs: [['Puerto Plata', 'Costa norte (Atlántico)'], ['Santo Domingo', 'Costa sur (Caribe)'], ['Punta Cana', 'Costa este'], ['San Cristóbal', 'Interior sur (cerca de la costa)']], explanation: 'La República Dominicana tiene costas en el Atlántico (norte), Caribe (sur) y puntas este/oeste.' },
      en: { q: 'Match each province/city with the coast where it\'s located:', pairs: [['Puerto Plata', 'North coast (Atlantic)'], ['Santo Domingo', 'South coast (Caribbean)'], ['Punta Cana', 'East coast'], ['San Cristóbal', 'Southern interior (near the coast)']], explanation: 'The Dominican Republic has coasts on the Atlantic (north), Caribbean (south), and east/west tips.' },
      fr: { q: 'Associe chaque province/ville à la côte où elle se trouve :', pairs: [['Puerto Plata', 'Côte nord (Atlantique)'], ['Saint-Domingue', 'Côte sud (Caraïbes)'], ['Punta Cana', 'Côte est'], ['San Cristóbal', 'Intérieur sud (près de la côte)']], explanation: "La République dominicaine a des côtes sur l'Atlantique (nord), les Caraïbes (sud) et les pointes est/ouest." }
    }
  },
  {
    id: 'geo-088', type: 'match',
    lang: {
      es: { q: 'Conecta cada "récord" geográfico con su dueño caribeño:', pairs: [['Lago más grande del Caribe', 'Lago Enriquillo'], ['Pico más alto del Caribe', 'Pico Duarte'], ['Primera ciudad europea de América', 'Santo Domingo'], ['Punto más bajo del Caribe', 'Lago Enriquillo (-40m)']], explanation: 'La República Dominicana tiene varios récords geográficos del Caribe. ¡Es la MVP de la región!' },
      en: { q: 'Connect each Caribbean geographic "record" with its holder:', pairs: [['Largest lake in the Caribbean', 'Lake Enriquillo'], ['Highest peak in the Caribbean', 'Pico Duarte'], ['First European city in the Americas', 'Santo Domingo'], ['Lowest point in the Caribbean', 'Lake Enriquillo (-40m)']], explanation: 'The Dominican Republic holds several Caribbean geographic records. It\'s the MVP of the region!' },
      fr: { q: 'Relie chaque « record » géographique caribéen à son détenteur :', pairs: [['Plus grand lac des Caraïbes', 'Lac Enriquillo'], ['Plus haut sommet des Caraïbes', 'Pico Duarte'], ['Première ville européenne des Amériques', 'Saint-Domingue'], ['Point le plus bas des Caraïbes', 'Lac Enriquillo (-40 m)']], explanation: 'La République dominicaine détient plusieurs records géographiques des Caraïbes. C\'est la MVP de la région !' }
    }
  },
  {
    id: 'geo-089', type: 'match',
    lang: {
      es: { q: 'Empareja cada elemento del mapa del juego con su cantidad:', pairs: [['Ríos', '5'], ['Lagos', '2'], ['Cadenas montañosas', '8'], ['Mundos jugables', '13']], explanation: 'Números del mapa procedural del juego. Todo generado con algoritmos, no dibujado a mano.' },
      en: { q: 'Match each game map element with its quantity:', pairs: [['Rivers', '5'], ['Lakes', '2'], ['Mountain chains', '8'], ['Playable worlds', '13']], explanation: 'Numbers from the game\'s procedural map. All generated with algorithms, not hand-drawn.' },
      fr: { q: 'Associe chaque élément de la carte du jeu à sa quantité :', pairs: [['Rivières', '5'], ['Lacs', '2'], ['Chaînes de montagnes', '8'], ['Mondes jouables', '13']], explanation: 'Chiffres de la carte procédurale du jeu. Tout généré par algorithmes, pas dessiné à la main.' }
    }
  },
  {
    id: 'geo-090', type: 'match',
    lang: {
      es: { q: 'Conecta cada capa del mapa Leaflet del juego con su emoji:', pairs: [['Sitios Taínos', '🗿 (16 sitios)'], ['Sitios Coloniales', '🏰 (8 sitios)'], ['Naufragios', '⚓ (12 pecios)'], ['Museos', '🏛 (30 museos)'], ['Potencial Arqueológico', '🔬 (15 sitios)']], explanation: '6 capas de datos reales sobre un mapa interactivo. Más de 80 marcadores en total.' },
      en: { q: 'Connect each Leaflet map layer in the game with its emoji:', pairs: [['Taíno Sites', '🗿 (16 sites)'], ['Colonial Sites', '🏰 (8 sites)'], ['Shipwrecks', '⚓ (12 wrecks)'], ['Museums', '🏛 (30 museums)'], ['Archaeological Potential', '🔬 (15 sites)']], explanation: '6 layers of real data on an interactive map. Over 80 markers in total.' },
      fr: { q: 'Relie chaque couche de la carte Leaflet du jeu à son emoji :', pairs: [['Sites Taïnos', '🗿 (16 sites)'], ['Sites Coloniaux', '🏰 (8 sites)'], ['Naufrages', '⚓ (12 épaves)'], ['Musées', '🏛 (30 musées)'], ['Potentiel Archéologique', '🔬 (15 sites)']], explanation: "6 couches de données réelles sur une carte interactive. Plus de 80 marqueurs au total." }
    }
  },
  {
    id: 'geo-091', type: 'match',
    lang: {
      es: { q: 'Empareja cada fenómeno geográfico con su causa — piensa como Dexter del laboratorio:', pairs: [['Lago Enriquillo hipersalino', 'Evaporación sin salida al mar'], ['Cenote del Manantial', 'Colapso de roca caliza'], ['Isla Cabritos', 'Isla en lago en isla (tectónica)'], ['Cordillera Central', 'Choque de placas tectónicas']], explanation: 'Cada formación geográfica tiene una explicación científica. La geología es como el lore de un RPG — todo tiene un origen.' },
      en: { q: 'Match each geographic phenomenon with its cause — think like Dexter from the lab:', pairs: [['Hypersaline Lake Enriquillo', 'Evaporation with no ocean outlet'], ['Manantial cenote', 'Limestone collapse'], ['Isla Cabritos', 'Island in lake in island (tectonics)'], ['Cordillera Central', 'Tectonic plate collision']], explanation: 'Each geographic formation has a scientific explanation. Geology is like RPG lore — everything has an origin.' },
      fr: { q: 'Associe chaque phénomène géographique à sa cause — réfléchis comme Dexter du labo :', pairs: [['Lac Enriquillo hypersalin', 'Évaporation sans sortie vers la mer'], ['Cénote du Manantial', 'Effondrement du calcaire'], ['Isla Cabritos', 'Île dans un lac dans une île (tectonique)'], ['Cordillera Central', 'Collision de plaques tectoniques']], explanation: "Chaque formation géographique a une explication scientifique. La géologie c'est comme le lore d'un RPG — tout a une origine." }
    }
  },
  {
    id: 'geo-092', type: 'match',
    lang: {
      es: { q: 'Empareja cada mundo acuático del juego con su ubicación:', pairs: [['Mundo Acuático', 'Costa caribeña (tortugas, corales)'], ['Santuario del Manatí', 'Sub-nivel del Mundo Acuático'], ['Lago Enriquillo', 'Suroeste (cocodrilos, iguanas)'], ['Cenote (Manantial de la Aleta)', 'Sureste (Cotubanamá)']], explanation: 'El juego tiene 4 zonas de agua diferentes, cada una con su ecosistema y mecánicas únicas.' },
      en: { q: 'Match each aquatic game world with its location:', pairs: [['Aquatic World', 'Caribbean coast (turtles, corals)'], ['Manatee Sanctuary', 'Sub-level of Aquatic World'], ['Lake Enriquillo', 'Southwest (crocodiles, iguanas)'], ['Cenote (Manantial de la Aleta)', 'Southeast (Cotubanamá)']], explanation: 'The game has 4 different water zones, each with its own ecosystem and unique mechanics.' },
      fr: { q: 'Associe chaque monde aquatique du jeu à sa localisation :', pairs: [['Monde Aquatique', 'Côte caribéenne (tortues, coraux)'], ['Sanctuaire du Lamantin', 'Sous-niveau du Monde Aquatique'], ['Lac Enriquillo', 'Sud-ouest (crocodiles, iguanes)'], ['Cénote (Manantial de la Aleta)', 'Sud-est (Cotubanamá)']], explanation: "Le jeu a 4 zones d'eau différentes, chacune avec son propre écosystème et des mécaniques uniques." }
    }
  },
  {
    id: 'geo-093', type: 'match',
    lang: {
      es: { q: 'Conecta cada "primero" histórico-geográfico con su lugar:', pairs: [['Primer asentamiento europeo', 'La Isabela (1494)'], ['Primera ciudad europea permanente', 'Santo Domingo (1498)'], ['Primera catedral de América', 'Zona Colonial, Santo Domingo'], ['Primer contacto Colón-taínos', 'Costa norte de La Española']], explanation: 'La Española fue el epicentro de los "primeros" europeos en el Nuevo Mundo. Todo empezó aquí.' },
      en: { q: 'Connect each historical-geographic "first" with its place:', pairs: [['First European settlement', 'La Isabela (1494)'], ['First permanent European city', 'Santo Domingo (1498)'], ['First cathedral in the Americas', 'Zona Colonial, Santo Domingo'], ['First Columbus-Taíno contact', 'North coast of Hispaniola']], explanation: 'Hispaniola was the epicenter of European "firsts" in the New World. It all started here.' },
      fr: { q: 'Relie chaque « première » historico-géographique à son lieu :', pairs: [['Premier établissement européen', 'La Isabela (1494)'], ['Première ville européenne permanente', 'Saint-Domingue (1498)'], ['Première cathédrale des Amériques', 'Zona Colonial, Saint-Domingue'], ['Premier contact Colomb-Taïnos', "Côte nord d'Hispaniola"]], explanation: "Hispaniola a été l'épicentre des « premières » européennes dans le Nouveau Monde. Tout a commencé ici." }
    }
  },
  {
    id: 'geo-094', type: 'match',
    lang: {
      es: { q: 'Empareja cada zona climática/geográfica de RD con lo que la caracteriza — como biomas de Minecraft:', pairs: [['Suroeste (Enriquillo)', 'Semiárido, hipersalino, cactus'], ['Costa norte (Atlántico)', 'Húmedo, olas grandes, bahías'], ['Este (Punta Cana)', 'Playas de arena blanca, arrecifes'], ['Centro (Cordillera)', 'Montañoso, fresco, pinos']], explanation: 'La isla tiene una diversidad geográfica increíble para su tamaño. Es como tener 4 biomas en un solo mapa.' },
      en: { q: 'Match each climate/geographic zone of the DR with what characterizes it — like Minecraft biomes:', pairs: [['Southwest (Enriquillo)', 'Semi-arid, hypersaline, cacti'], ['North coast (Atlantic)', 'Humid, big waves, bays'], ['East (Punta Cana)', 'White sand beaches, reefs'], ['Center (Cordillera)', 'Mountainous, cool, pine trees']], explanation: 'The island has incredible geographic diversity for its size. It\'s like having 4 biomes in a single map.' },
      fr: { q: 'Associe chaque zone climatique/géographique de la RD à ce qui la caractérise — comme des biomes de Minecraft :', pairs: [['Sud-ouest (Enriquillo)', 'Semi-aride, hypersalin, cactus'], ['Côte nord (Atlantique)', 'Humide, grosses vagues, baies'], ['Est (Punta Cana)', 'Plages de sable blanc, récifs'], ['Centre (Cordillera)', 'Montagneux, frais, pins']], explanation: "L'île a une diversité géographique incroyable pour sa taille. C'est comme avoir 4 biomes sur une seule carte." }
    }
  },
  {
    id: 'geo-095', type: 'match',
    lang: {
      es: { q: 'Conecta cada detalle del Lago Enriquillo con su dato correcto:', pairs: [['Elevación', '-40 metros (bajo el nivel del mar)'], ['Salinidad', '3 veces la del océano'], ['Isla interior', 'Isla Cabritos (Guarizacca)'], ['Récord caribeño', 'Lago más grande del Caribe']], explanation: 'El Lago Enriquillo es básicamente el boss final de la geografía dominicana — tiene todos los récords.' },
      en: { q: 'Connect each Lake Enriquillo detail with its correct fact:', pairs: [['Elevation', '-40 meters (below sea level)'], ['Salinity', '3 times that of the ocean'], ['Interior island', 'Isla Cabritos (Guarizacca)'], ['Caribbean record', 'Largest lake in the Caribbean']], explanation: 'Lake Enriquillo is basically the final boss of Dominican geography — it holds all the records.' },
      fr: { q: 'Relie chaque détail du lac Enriquillo à son fait correct :', pairs: [['Élévation', '-40 mètres (sous le niveau de la mer)'], ['Salinité', "3 fois celle de l'océan"], ['Île intérieure', 'Isla Cabritos (Guarizacca)'], ['Record caribéen', 'Plus grand lac des Caraïbes']], explanation: 'Le lac Enriquillo est essentiellement le boss final de la géographie dominicaine — il détient tous les records.' }
    }
  },
  {
    id: 'geo-096', type: 'match',
    lang: {
      es: { q: 'Empareja cada dirección con lo que bordea a la República Dominicana:', pairs: [['Norte', 'Océano Atlántico'], ['Sur', 'Mar Caribe'], ['Este', 'Canal de la Mona (hacia Puerto Rico)'], ['Oeste', 'Haití']], explanation: 'RD está rodeada de agua por 3 lados y comparte frontera terrestre con Haití al oeste.' },
      en: { q: 'Match each direction with what borders the Dominican Republic:', pairs: [['North', 'Atlantic Ocean'], ['South', 'Caribbean Sea'], ['East', 'Mona Passage (toward Puerto Rico)'], ['West', 'Haiti']], explanation: 'The DR is surrounded by water on 3 sides and shares a land border with Haiti to the west.' },
      fr: { q: 'Associe chaque direction à ce qui borde la République dominicaine :', pairs: [['Nord', 'Océan Atlantique'], ['Sud', 'Mer des Caraïbes'], ['Est', 'Canal de la Mona (vers Porto Rico)'], ['Ouest', 'Haïti']], explanation: "La RD est entourée d'eau sur 3 côtés et partage une frontière terrestre avec Haïti à l'ouest." }
    }
  },
  {
    id: 'geo-097', type: 'match',
    lang: {
      es: { q: 'Empareja cada referencia pop con el dato geográfico real que ilustra:', pairs: [['Mapa del Merodeador', 'Mapa trazado de imágenes NASA reales'], ['Nivel de Mario bajo el agua', 'Lago Enriquillo 40m bajo el nivel del mar'], ['Inception (sueño dentro de sueño)', 'Isla dentro de lago dentro de isla'], ['Biomas de Minecraft', '4 zonas climáticas en una isla pequeña']], explanation: 'Las referencias pop ayudan a entender conceptos geográficos complejos. ¡La cultura nerd al servicio de la educación!' },
      en: { q: 'Match each pop reference with the real geographic fact it illustrates:', pairs: [["Marauder's Map", 'Map traced from real NASA imagery'], ['Underwater Mario level', 'Lake Enriquillo 40m below sea level'], ['Inception (dream within a dream)', 'Island within a lake within an island'], ['Minecraft biomes', '4 climate zones on a small island']], explanation: 'Pop references help understand complex geographic concepts. Nerd culture in service of education!' },
      fr: { q: 'Associe chaque référence pop au fait géographique réel qu\'elle illustre :', pairs: [['Carte du Maraudeur', "Carte tracée d'images NASA réelles"], ['Niveau sous-marin de Mario', 'Lac Enriquillo 40 m sous le niveau de la mer'], ['Inception (rêve dans un rêve)', 'Île dans un lac dans une île'], ['Biomes de Minecraft', '4 zones climatiques sur une petite île']], explanation: "Les références pop aident à comprendre des concepts géographiques complexes. La culture geek au service de l'éducation !" }
    }
  },
  {
    id: 'geo-098', type: 'match',
    lang: {
      es: { q: 'Conecta cada fase del Manantial de la Aleta con su mecánica de juego:', pairs: [['Rapel por el pozo', 'Flechas de dirección (rappel.js)'], ['Cueva oscura', 'Linterna con máscara radial'], ['Buceo en cenote', 'O₂ 120s + corrientes + artefactos'], ['Hub principal', 'Gestión de fases y prerequisitos']], explanation: 'El Manantial de la Aleta es un nivel de 3 fases que refleja la geografía real del cenote: bajada, cueva y agua subterránea.' },
      en: { q: 'Connect each Manantial de la Aleta phase with its game mechanic:', pairs: [['Rappelling down the shaft', 'Direction arrows (rappel.js)'], ['Dark cave', 'Flashlight with radial mask'], ['Cenote diving', 'O₂ 120s + currents + artifacts'], ['Main hub', 'Phase management and prerequisites']], explanation: 'Manantial de la Aleta is a 3-phase level reflecting the cenote\'s real geography: descent, cave, and underground water.' },
      fr: { q: 'Relie chaque phase du Manantial de la Aleta à sa mécanique de jeu :', pairs: [['Rappel dans le puits', 'Flèches de direction (rappel.js)'], ['Grotte sombre', 'Lampe torche avec masque radial'], ['Plongée dans le cénote', 'O₂ 120 s + courants + artéfacts'], ['Hub principal', 'Gestion des phases et prérequis']], explanation: 'Le Manantial de la Aleta est un niveau en 3 phases reflétant la géographie réelle du cénote : descente, grotte et eau souterraine.' }
    }
  },
  {
    id: 'geo-099', type: 'match',
    lang: {
      es: { q: 'Empareja cada par de "gemelos geográficos" — lugares que se parecen entre sí:', pairs: [['Lago Enriquillo', 'Étang Saumâtre (Haití)'], ['Yaque del Norte', 'Yaque del Sur (van en direcciones opuestas)'], ['La Isabela (primer asentamiento)', 'Santo Domingo (primera ciudad estable)'], ['Cordillera Central', 'Sierra de Bahoruco (ambas en RD)']], explanation: 'La geografía de La Española está llena de pares complementarios — como los dúos de personajes en todo buen RPG.' },
      en: { q: 'Match each pair of "geographic twins" — places that mirror each other:', pairs: [['Lake Enriquillo', 'Étang Saumâtre (Haiti)'], ['Yaque del Norte', 'Yaque del Sur (flow in opposite directions)'], ['La Isabela (first settlement)', 'Santo Domingo (first stable city)'], ['Cordillera Central', 'Sierra de Bahoruco (both in DR)']], explanation: 'Hispaniola\'s geography is full of complementary pairs — like character duos in any good RPG.' },
      fr: { q: 'Associe chaque paire de « jumeaux géographiques » — des lieux qui se reflètent :', pairs: [['Lac Enriquillo', 'Étang Saumâtre (Haïti)'], ['Yaque del Norte', 'Yaque del Sur (coulent en directions opposées)'], ['La Isabela (premier établissement)', 'Saint-Domingue (première ville stable)'], ['Cordillera Central', 'Sierra de Bahoruco (les deux en RD)']], explanation: "La géographie d'Hispaniola est pleine de paires complémentaires — comme les duos de personnages dans tout bon RPG." }
    }
  },
  {
    id: 'geo-100', type: 'match',
    lang: {
      es: { q: 'Gran final: empareja cada razón geográfica con su consecuencia histórica — porque la geografía explica la historia:', pairs: [['Costa norte con puerto natural', 'Colón fundó La Isabela ahí'], ['Río Ozama navegable en el sur', 'Santo Domingo se volvió la capital'], ['Lago Enriquillo aislado', 'Enriquillo lideró la rebelión ahí'], ['Cenote en roca caliza (sureste)', 'Taínos lo usaron como sitio sagrado'], ['Montañas de difícil acceso', 'Cimarrones se refugiaron ahí']], explanation: 'La geografía no es solo mapas — determina DÓNDE y POR QUÉ sucedieron los eventos históricos. Cada montaña, río y costa cuenta una historia.' },
      en: { q: 'Grand finale: match each geographic reason with its historical consequence — because geography explains history:', pairs: [['North coast with natural harbor', 'Columbus founded La Isabela there'], ['Navigable Ozama River in the south', 'Santo Domingo became the capital'], ['Isolated Lake Enriquillo', 'Enriquillo led the rebellion there'], ['Cenote in limestone (southeast)', 'Taíno used it as a sacred site'], ['Hard-to-access mountains', 'Maroons took refuge there']], explanation: 'Geography isn\'t just maps — it determines WHERE and WHY historical events happened. Every mountain, river, and coast tells a story.' },
      fr: { q: 'Grand final : associe chaque raison géographique à sa conséquence historique — parce que la géographie explique l\'histoire :', pairs: [['Côte nord avec port naturel', 'Colomb a fondé La Isabela là'], ['Fleuve Ozama navigable au sud', 'Saint-Domingue est devenue la capitale'], ['Lac Enriquillo isolé', 'Enriquillo y a mené la rébellion'], ['Cénote dans le calcaire (sud-est)', 'Les Taïnos en ont fait un site sacré'], ['Montagnes difficiles d\'accès', 'Les cimarrons s\'y sont réfugiés']], explanation: "La géographie ce n'est pas que des cartes — elle détermine OÙ et POURQUOI les événements historiques se sont produits. Chaque montagne, rivière et côte raconte une histoire." }
    }
  }

];
