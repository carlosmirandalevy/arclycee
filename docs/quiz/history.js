// ============================================================
// HISTORY.JS — Banco de 100 preguntas trilingües de Historia
// ============================================================
// Cubre: civilización taína, era colonial, cimarrones,
// Enriquillo, patrimonio arqueológico, leyes de protección.
// Tono: divertido, referencias pop, pensamiento crítico.
// Tipos: tf (verdadero/falso), mcq (opción múltiple),
//        fill (completar), match (emparejar columnas).
// ============================================================

window.ARC_QUESTIONS = window.ARC_QUESTIONS || {};
window.ARC_QUESTIONS.history = [

  // ---- 1-10: Taino civilization basics ----

  {
    id: 'hist-001', type: 'tf',
    lang: {
      es: { q: 'Plot twist nivel Gravity Falls: los taínos llegaron al Caribe alrededor del 3000 a.C., mucho antes que Colón.', answer: true, explanation: 'Los taínos migraron desde Sudamérica y se establecieron en las Antillas miles de años antes de 1492.' },
      en: { q: 'Gravity Falls-level plot twist: the Tainos arrived in the Caribbean around 3000 BC, way before Columbus.', answer: true, explanation: 'The Tainos migrated from South America and settled in the Antilles thousands of years before 1492.' },
      fr: { q: 'Plot twist digne de Gravity Falls : les Taïnos sont arrivés aux Caraïbes vers 3000 av. J.-C., bien avant Colomb.', answer: true, explanation: 'Les Taïnos ont migré depuis l\'Amérique du Sud et se sont installés aux Antilles des milliers d\'années avant 1492.' }
    }
  },

  {
    id: 'hist-002', type: 'mcq',
    lang: {
      es: { q: 'Si los taínos fueran un clan de One Piece, su base se llamaría... ¿cómo se llamaban sus aldeas?', options: ['Conucos', 'Yucayeques', 'Bohíos', 'Bateys'], answer: 1, explanation: 'Los yucayeques eran las aldeas o comunidades taínas, gobernadas por un cacique.' },
      en: { q: 'If the Tainos were a One Piece crew, their base would be called... what were their villages named?', options: ['Conucos', 'Yucayeques', 'Bohios', 'Bateys'], answer: 1, explanation: 'Yucayeques were the Taino villages or communities, governed by a cacique (chief).' },
      fr: { q: 'Si les Taïnos étaient un équipage de One Piece, leur base s\'appellerait... comment nommait-on leurs villages ?', options: ['Conucos', 'Yucayeques', 'Bohíos', 'Bateys'], answer: 1, explanation: 'Les yucayeques étaient les villages ou communautés taïnos, gouvernés par un cacique.' }
    }
  },

  {
    id: 'hist-003', type: 'fill',
    lang: {
      es: { q: 'Los taínos hacían pan sin trigo, nivel de creatividad Percy Jackson. ¿Cómo se llama ese pan hecho de yuca?', answer: ['casabe', 'cazabe'], explanation: 'El casabe es un pan plano hecho de harina de yuca (mandioca), alimento básico taíno que aún se come en RD.' },
      en: { q: 'The Tainos made bread without wheat, Percy Jackson-level creativity. What is that yuca bread called?', answer: ['casabe', 'cazabe', 'cassava bread'], explanation: 'Casabe is a flatbread made from yuca (cassava) flour, a Taino staple food still eaten in the DR today.' },
      fr: { q: 'Les Taïnos faisaient du pain sans blé, créativité niveau Percy Jackson. Comment s\'appelle ce pain de manioc ?', answer: ['casabe', 'cazabe', 'cassave'], explanation: 'Le casabe est un pain plat fait de farine de manioc, aliment de base taïno encore consommé en RD.' }
    }
  },

  {
    id: 'hist-004', type: 'mcq',
    lang: {
      es: { q: 'Un bohío taíno era como la Batcueva pero tropical. ¿Qué era exactamente?', options: ['Un templo religioso', 'Una vivienda redonda de madera y paja', 'Un barco de guerra', 'Una plaza para jugar batú'], answer: 1, explanation: 'Los bohíos eran las viviendas típicas taínas: estructuras circulares de madera con techo de paja.' },
      en: { q: 'A Taino bohio was like the Batcave but tropical. What was it exactly?', options: ['A religious temple', 'A round dwelling made of wood and thatch', 'A warship', 'A plaza for playing batu'], answer: 1, explanation: 'Bohios were typical Taino dwellings: circular wooden structures with thatched roofs.' },
      fr: { q: 'Un bohío taïno, c\'était comme la Batcave mais tropicale. Qu\'est-ce que c\'était exactement ?', options: ['Un temple religieux', 'Une habitation ronde en bois et paille', 'Un navire de guerre', 'Une place pour jouer au batú'], answer: 1, explanation: 'Les bohíos étaient les habitations typiques taïnos : structures circulaires en bois avec toit de paille.' }
    }
  },

  {
    id: 'hist-005', type: 'tf',
    lang: {
      es: { q: 'Los cemíes eran como los Horrocruxes de Harry Potter: objetos donde vivía un espíritu. ¿Verdad o cuento?', answer: true, explanation: 'Los cemíes eran figuras rituales que representaban espíritus o deidades taínas. Eran centrales en su religión.' },
      en: { q: 'Cemis were like Harry Potter Horcruxes: objects where a spirit lived. True or tale?', answer: true, explanation: 'Cemis were ritual figures representing Taino spirits or deities. They were central to their religion.' },
      fr: { q: 'Les cemís étaient comme les Horcruxes de Harry Potter : des objets où résidait un esprit. Vrai ou conte ?', answer: true, explanation: 'Les cemís étaient des figures rituelles représentant des esprits ou divinités taïnos. Ils étaient centraux dans leur religion.' }
    }
  },

  {
    id: 'hist-006', type: 'match',
    lang: {
      es: { q: 'Conecta cada término taíno con su significado, como un puzzle de Adventure Time:', pairs: [['Cacique', 'Jefe de la aldea'], ['Conuco', 'Parcela de cultivo'], ['Batey', 'Plaza central / cancha'], ['Areíto', 'Danza ceremonial'], ['Canoa', 'Embarcación de tronco']], explanation: 'Estos términos taínos describen aspectos fundamentales de su organización social y vida cotidiana.' },
      en: { q: 'Match each Taino term with its meaning, like an Adventure Time puzzle:', pairs: [['Cacique', 'Village chief'], ['Conuco', 'Farming plot'], ['Batey', 'Central plaza / court'], ['Areito', 'Ceremonial dance'], ['Canoa', 'Log boat']], explanation: 'These Taino terms describe fundamental aspects of their social organization and daily life.' },
      fr: { q: 'Relie chaque terme taïno à sa signification, comme un puzzle d\'Adventure Time :', pairs: [['Cacique', 'Chef du village'], ['Conuco', 'Parcelle de culture'], ['Batey', 'Place centrale / terrain'], ['Areíto', 'Danse cérémonielle'], ['Canoa', 'Embarcation en tronc']], explanation: 'Ces termes taïnos décrivent des aspects fondamentaux de leur organisation sociale et vie quotidienne.' }
    }
  },

  {
    id: 'hist-007', type: 'mcq',
    lang: {
      es: { q: 'El batú era el deporte taíno, como el Quidditch pero sin escobas voladoras. ¿Con qué parte del cuerpo golpeaban la pelota principalmente?', options: ['Las manos', 'La cabeza', 'La cadera', 'Los pies'], answer: 2, explanation: 'En el batú, los jugadores golpeaban la pelota de goma principalmente con la cadera, aunque también usaban hombros y rodillas.' },
      en: { q: 'Batu was the Taino sport, like Quidditch but without flying brooms. Which body part did they mainly use to hit the ball?', options: ['Hands', 'Head', 'Hips', 'Feet'], answer: 2, explanation: 'In batu, players hit the rubber ball mainly with their hips, though they also used shoulders and knees.' },
      fr: { q: 'Le batú était le sport taïno, comme le Quidditch mais sans balais volants. Avec quelle partie du corps frappaient-ils la balle principalement ?', options: ['Les mains', 'La tête', 'Les hanches', 'Les pieds'], answer: 2, explanation: 'Au batú, les joueurs frappaient la balle en caoutchouc principalement avec les hanches, mais aussi les épaules et genoux.' }
    }
  },

  {
    id: 'hist-008', type: 'tf',
    lang: {
      es: { q: 'Los petroglifos son como los memes de los taínos: imágenes talladas en piedra para comunicar ideas. ¿Los taínos tallaban petroglifos en cuevas?', answer: true, explanation: 'Los taínos tallaron miles de petroglifos en cuevas y rocas por todo el Caribe. Son su forma de arte y comunicación más duradera.' },
      en: { q: 'Petroglyphs are like the Tainos\' memes: images carved in stone to communicate ideas. Did the Tainos carve petroglyphs in caves?', answer: true, explanation: 'The Tainos carved thousands of petroglyphs in caves and rocks throughout the Caribbean. They are their most enduring form of art.' },
      fr: { q: 'Les pétroglyphes sont comme les mèmes des Taïnos : des images gravées dans la pierre pour communiquer. Les Taïnos gravaient-ils des pétroglyphes dans des grottes ?', answer: true, explanation: 'Les Taïnos ont gravé des milliers de pétroglyphes dans des grottes et rochers à travers les Caraïbes. C\'est leur forme d\'art la plus durable.' }
    }
  },

  {
    id: 'hist-009', type: 'fill',
    lang: {
      es: { q: 'Como Finn y Jake tienen su casa del árbol, los taínos tenían la casa del cacique, más grande que un bohío. ¿Cómo se llamaba?', answer: ['caney', 'el caney'], explanation: 'El caney era la vivienda del cacique, más grande y rectangular, a diferencia de los bohíos circulares del resto de la comunidad.' },
      en: { q: 'Like Finn and Jake have their treehouse, the Taino chief had a bigger house than a bohio. What was it called?', answer: ['caney', 'the caney'], explanation: 'The caney was the chief\'s dwelling, larger and rectangular, unlike the circular bohios of the rest of the community.' },
      fr: { q: 'Comme Finn et Jake ont leur cabane dans l\'arbre, le chef taïno avait une maison plus grande qu\'un bohío. Comment s\'appelait-elle ?', answer: ['caney', 'le caney'], explanation: 'Le caney était l\'habitation du cacique, plus grande et rectangulaire, contrairement aux bohíos circulaires du reste de la communauté.' }
    }
  },

  {
    id: 'hist-010', type: 'mcq',
    lang: {
      es: { q: 'Los taínos viajaban entre islas como piratas del Caribe (pero sin Johnny Depp). ¿Qué usaban para navegar?', options: ['Veleros europeos', 'Canoas talladas de un solo tronco', 'Balsas de bambú', 'Tablas de surf gigantes'], answer: 1, explanation: 'Los taínos construían canoas tallando un solo tronco de árbol. Algunas podían llevar hasta 100 personas.' },
      en: { q: 'The Tainos traveled between islands like Pirates of the Caribbean (minus Johnny Depp). What did they use to navigate?', options: ['European sailboats', 'Canoes carved from a single log', 'Bamboo rafts', 'Giant surfboards'], answer: 1, explanation: 'The Tainos built canoes by carving a single tree trunk. Some could carry up to 100 people.' },
      fr: { q: 'Les Taïnos voyageaient entre les îles comme des Pirates des Caraïbes (sans Johnny Depp). Qu\'utilisaient-ils pour naviguer ?', options: ['Des voiliers européens', 'Des canots taillés dans un seul tronc', 'Des radeaux en bambou', 'Des planches de surf géantes'], answer: 1, explanation: 'Les Taïnos construisaient des canots en taillant un seul tronc d\'arbre. Certains pouvaient transporter jusqu\'à 100 personnes.' }
    }
  },

  // ---- 11-20: Colonial era & La Isabela ----

  {
    id: 'hist-011', type: 'mcq',
    lang: {
      es: { q: 'Cristóbal Colón fundó la primera ciudad europea en América, como Luffy plantando su bandera. ¿En qué año se fundó La Isabela?', options: ['1492', '1494', '1500', '1502'], answer: 1, explanation: 'La Isabela fue fundada en 1494 en la costa norte de La Hispaniola. Fue la primera ciudad europea permanente en el Nuevo Mundo.' },
      en: { q: 'Columbus founded the first European city in America, like Luffy planting his flag. What year was La Isabela founded?', options: ['1492', '1494', '1500', '1502'], answer: 1, explanation: 'La Isabela was founded in 1494 on the north coast of Hispaniola. It was the first permanent European city in the New World.' },
      fr: { q: 'Colomb a fondé la première ville européenne en Amérique, comme Luffy plantant son drapeau. En quelle année La Isabela a-t-elle été fondée ?', options: ['1492', '1494', '1500', '1502'], answer: 1, explanation: 'La Isabela a été fondée en 1494 sur la côte nord d\'Hispaniola. C\'était la première ville européenne permanente du Nouveau Monde.' }
    }
  },

  {
    id: 'hist-012', type: 'tf',
    lang: {
      es: { q: 'Como el Gobierno Mundial de One Piece tiene su sede en Mariejois, los españoles tenían La Isabela como su primera capital en América.', answer: true, explanation: 'La Isabela fue efectivamente la primera capital europea en las Américas, aunque fue abandonada pocos años después por Santo Domingo.' },
      en: { q: 'Like the World Government in One Piece has Mariejois, the Spanish had La Isabela as their first capital in the Americas.', answer: true, explanation: 'La Isabela was indeed the first European capital in the Americas, though it was abandoned a few years later for Santo Domingo.' },
      fr: { q: 'Comme le Gouvernement Mondial de One Piece a Mariejois, les Espagnols avaient La Isabela comme première capitale en Amérique.', answer: true, explanation: 'La Isabela fut effectivement la première capitale européenne des Amériques, bien qu\'elle fût abandonnée quelques années plus tard pour Santo Domingo.' }
    }
  },

  {
    id: 'hist-013', type: 'mcq',
    lang: {
      es: { q: '¿Dónde está ubicada La Isabela? Pista: no es Wakanda.', options: ['Costa sur de Cuba', 'Costa norte de La Hispaniola', 'Costa este de Puerto Rico', 'Costa oeste de Jamaica'], answer: 1, explanation: 'La Isabela se encuentra en la costa norte de la isla La Hispaniola, en lo que hoy es la provincia de Puerto Plata, República Dominicana.' },
      en: { q: 'Where is La Isabela located? Hint: it\'s not Wakanda.', options: ['South coast of Cuba', 'North coast of Hispaniola', 'East coast of Puerto Rico', 'West coast of Jamaica'], answer: 1, explanation: 'La Isabela is on the north coast of Hispaniola, in what is now the province of Puerto Plata, Dominican Republic.' },
      fr: { q: 'Où se trouve La Isabela ? Indice : ce n\'est pas le Wakanda.', options: ['Côte sud de Cuba', 'Côte nord d\'Hispaniola', 'Côte est de Porto Rico', 'Côte ouest de la Jamaïque'], answer: 1, explanation: 'La Isabela se trouve sur la côte nord d\'Hispaniola, dans l\'actuelle province de Puerto Plata, République dominicaine.' }
    }
  },

  {
    id: 'hist-014', type: 'tf',
    lang: {
      es: { q: 'Colón llegó a América en 1492. ¿Pero sabes qué? No fue el primer humano en pisar estas tierras. Los taínos ya llevaban miles de años allí.', answer: true, explanation: 'Correcto. Colón llegó en 1492, pero los pueblos indígenas ya habitaban el Caribe desde hace unos 5000 años.' },
      en: { q: 'Columbus arrived in America in 1492. But guess what? He wasn\'t the first human to set foot there. The Tainos had been there for thousands of years.', answer: true, explanation: 'Correct. Columbus arrived in 1492, but indigenous peoples had been living in the Caribbean for about 5000 years.' },
      fr: { q: 'Colomb est arrivé en Amérique en 1492. Mais devinez quoi ? Il n\'était pas le premier humain à y poser le pied. Les Taïnos y vivaient depuis des milliers d\'années.', answer: true, explanation: 'Correct. Colomb est arrivé en 1492, mais les peuples autochtones habitaient les Caraïbes depuis environ 5000 ans.' }
    }
  },

  {
    id: 'hist-015', type: 'fill',
    lang: {
      es: { q: 'Colón llamó a la isla donde están RD y Haití "La ________". Suena a nombre de telenovela, pero es real.', answer: ['Hispaniola', 'Española'], explanation: 'Colón bautizó la isla como "La Española" (Hispaniola en latín), que hoy comparten República Dominicana y Haití.' },
      en: { q: 'Columbus named the island where DR and Haiti are "La ________". Sounds like a soap opera, but it\'s real.', answer: ['Hispaniola', 'Espanola', 'Española'], explanation: 'Columbus named the island "La Espanola" (Hispaniola in Latin), today shared by the Dominican Republic and Haiti.' },
      fr: { q: 'Colomb a nommé l\'île où se trouvent la RD et Haïti "La ________". On dirait un titre de telenovela, mais c\'est réel.', answer: ['Hispaniola', 'Española'], explanation: 'Colomb a baptisé l\'île "La Española" (Hispaniola en latin), aujourd\'hui partagée entre la République dominicaine et Haïti.' }
    }
  },

  {
    id: 'hist-016', type: 'mcq',
    lang: {
      es: { q: 'Fray Ramón Pané fue el primer europeo en escribir sobre la cultura taína. Era como el cronista oficial, estilo Usopp contando historias. ¿Qué escribió?', options: ['Un libro de recetas taínas', 'La Relación acerca de las Antigüedades de los Indios', 'Un mapa del tesoro', 'Una guía turística del Caribe'], answer: 1, explanation: 'Fray Ramón Pané escribió la primera crónica etnográfica de América, documentando las creencias y costumbres taínas.' },
      en: { q: 'Fray Ramon Pane was the first European to write about Taino culture. He was like the official chronicler, Usopp-style storytelling. What did he write?', options: ['A Taino recipe book', 'An Account of the Antiquities of the Indians', 'A treasure map', 'A Caribbean travel guide'], answer: 1, explanation: 'Fray Ramon Pane wrote the first ethnographic chronicle of the Americas, documenting Taino beliefs and customs.' },
      fr: { q: 'Fray Ramón Pané fut le premier Européen à écrire sur la culture taïno. C\'était le chroniqueur officiel, style Usopp. Qu\'a-t-il écrit ?', options: ['Un livre de recettes taïnos', 'Une Relation sur les Antiquités des Indiens', 'Une carte au trésor', 'Un guide touristique des Caraïbes'], answer: 1, explanation: 'Fray Ramón Pané a écrit la première chronique ethnographique des Amériques, documentant les croyances et coutumes taïnos.' }
    }
  },

  {
    id: 'hist-017', type: 'tf',
    lang: {
      es: { q: 'La Isabela fue un éxito total y se convirtió en una gran metrópolis. Spoiler: no, no lo fue.', answer: false, explanation: 'La Isabela fracasó. Enfermedades, hambre y conflictos la hicieron insostenible. Fue abandonada y reemplazada por Santo Domingo.' },
      en: { q: 'La Isabela was a total success and became a great metropolis. Spoiler: no, it did not.', answer: false, explanation: 'La Isabela failed. Disease, famine, and conflicts made it unsustainable. It was abandoned and replaced by Santo Domingo.' },
      fr: { q: 'La Isabela fut un succès total et devint une grande métropole. Spoiler : non, ce ne fut pas le cas.', answer: false, explanation: 'La Isabela a échoué. Maladies, famines et conflits l\'ont rendue insoutenable. Elle fut abandonnée et remplacée par Santo Domingo.' }
    }
  },

  {
    id: 'hist-018', type: 'match',
    lang: {
      es: { q: 'Conecta cada evento colonial con su fecha, como si ordenaras una timeline de Marvel:', pairs: [['Llegada de Colón', '1492'], ['Fundación de La Isabela', '1494'], ['Fundación de Santo Domingo', '1498'], ['Rebelión de Enriquillo', '1519']], explanation: 'Estos eventos marcan los primeros 30 años de la colonización española en La Hispaniola.' },
      en: { q: 'Match each colonial event with its date, like organizing a Marvel timeline:', pairs: [['Columbus arrives', '1492'], ['La Isabela founded', '1494'], ['Santo Domingo founded', '1498'], ['Enriquillo\'s rebellion', '1519']], explanation: 'These events mark the first 30 years of Spanish colonization of Hispaniola.' },
      fr: { q: 'Relie chaque événement colonial à sa date, comme pour organiser une timeline Marvel :', pairs: [['Arrivée de Colomb', '1492'], ['Fondation de La Isabela', '1494'], ['Fondation de Santo Domingo', '1498'], ['Rébellion d\'Enriquillo', '1519']], explanation: 'Ces événements marquent les 30 premières années de la colonisation espagnole d\'Hispaniola.' }
    }
  },

  {
    id: 'hist-019', type: 'mcq',
    lang: {
      es: { q: 'Los españoles obligaron a los taínos a trabajar en minas de oro. Este sistema de trabajo forzado se llamaba...', options: ['Encomienda', 'Hacienda', 'Yucayeque', 'Bohío'], answer: 0, explanation: 'La encomienda era un sistema colonial donde los indígenas eran "encomendados" a un español para trabajar, básicamente esclavitud disfrazada.' },
      en: { q: 'The Spanish forced the Tainos to work in gold mines. This forced labor system was called...', options: ['Encomienda', 'Hacienda', 'Yucayeque', 'Bohio'], answer: 0, explanation: 'The encomienda was a colonial system where indigenous people were "entrusted" to a Spaniard for labor, basically disguised slavery.' },
      fr: { q: 'Les Espagnols ont forcé les Taïnos à travailler dans les mines d\'or. Ce système de travail forcé s\'appelait...', options: ['Encomienda', 'Hacienda', 'Yucayeque', 'Bohío'], answer: 0, explanation: 'L\'encomienda était un système colonial où les autochtones étaient "confiés" à un Espagnol pour travailler, essentiellement de l\'esclavage déguisé.' }
    }
  },

  {
    id: 'hist-020', type: 'tf',
    lang: {
      es: { q: 'Los cemíes taínos eran de oro puro, como el tesoro de Smaug en El Hobbit.', answer: false, explanation: 'Los cemíes no eran de oro puro. Tenían detalles de guanín, una aleación de oro, plata y cobre. Muchos eran de piedra, madera o concha.' },
      en: { q: 'Taino cemis were made of pure gold, like Smaug\'s treasure in The Hobbit.', answer: false, explanation: 'Cemis were not pure gold. They had details of guanin, an alloy of gold, silver, and copper. Many were made of stone, wood, or shell.' },
      fr: { q: 'Les cemís taïnos étaient en or pur, comme le trésor de Smaug dans Le Hobbit.', answer: false, explanation: 'Les cemís n\'étaient pas en or pur. Ils avaient des détails en guanín, un alliage d\'or, d\'argent et de cuivre. Beaucoup étaient en pierre, bois ou coquillage.' }
    }
  },

  // ---- 21-30: Enriquillo's rebellion ----

  {
    id: 'hist-021', type: 'mcq',
    lang: {
      es: { q: 'Si Enriquillo fuera un personaje de Marvel, sería Resistencia-Man. ¿Cuántos años duró su rebelión contra los españoles?', options: ['5 años', '10 años', '14 años', '20 años'], answer: 2, explanation: 'La rebelión de Enriquillo duró 14 años, de 1519 a 1533. Fue la primera revuelta indígena exitosa en América.' },
      en: { q: 'If Enriquillo were a Marvel character, he\'d be Resistance-Man. How many years did his rebellion against the Spanish last?', options: ['5 years', '10 years', '14 years', '20 years'], answer: 2, explanation: 'Enriquillo\'s rebellion lasted 14 years, from 1519 to 1533. It was the first successful indigenous revolt in the Americas.' },
      fr: { q: 'Si Enriquillo était un personnage Marvel, ce serait Résistance-Man. Combien d\'années a duré sa rébellion contre les Espagnols ?', options: ['5 ans', '10 ans', '14 ans', '20 ans'], answer: 2, explanation: 'La rébellion d\'Enriquillo a duré 14 ans, de 1519 à 1533. Ce fut la première révolte indigène réussie en Amérique.' }
    }
  },

  {
    id: 'hist-022', type: 'tf',
    lang: {
      es: { q: 'Como Luffy declarándole la guerra al Gobierno Mundial, Enriquillo luchó contra el Imperio Español durante 14 años y logró un tratado de paz.', answer: true, explanation: 'Enriquillo resistió desde las montañas de Bahoruco y en 1533 firmó un tratado de paz con el emperador Carlos V.' },
      en: { q: 'Like Luffy declaring war on the World Government, Enriquillo fought the Spanish Empire for 14 years and achieved a peace treaty.', answer: true, explanation: 'Enriquillo resisted from the Bahoruco mountains and in 1533 signed a peace treaty with Emperor Charles V.' },
      fr: { q: 'Comme Luffy déclarant la guerre au Gouvernement Mondial, Enriquillo a combattu l\'Empire espagnol pendant 14 ans et obtenu un traité de paix.', answer: true, explanation: 'Enriquillo a résisté depuis les montagnes de Bahoruco et en 1533 a signé un traité de paix avec l\'empereur Charles Quint.' }
    }
  },

  {
    id: 'hist-023', type: 'fill',
    lang: {
      es: { q: 'Enriquillo se refugió en las montañas de ________, como Batman en su cueva, pero en el suroeste de La Hispaniola.', answer: ['Bahoruco', 'Sierra de Bahoruco', 'Baoruco'], explanation: 'La Sierra de Bahoruco fue el refugio natural de Enriquillo, desde donde resistió 14 años contra los españoles.' },
      en: { q: 'Enriquillo took refuge in the ________ mountains, like Batman in his cave, but in southwestern Hispaniola.', answer: ['Bahoruco', 'Sierra de Bahoruco', 'Baoruco'], explanation: 'The Sierra de Bahoruco was Enriquillo\'s natural refuge, from where he resisted 14 years against the Spanish.' },
      fr: { q: 'Enriquillo s\'est réfugié dans les montagnes de ________, comme Batman dans sa grotte, mais au sud-ouest d\'Hispaniola.', answer: ['Bahoruco', 'Sierra de Bahoruco', 'Baoruco'], explanation: 'La Sierra de Bahoruco fut le refuge naturel d\'Enriquillo, d\'où il a résisté 14 ans contre les Espagnols.' }
    }
  },

  {
    id: 'hist-024', type: 'mcq',
    lang: {
      es: { q: 'Enriquillo firmó un tratado de paz con un emperador muy poderoso. ¿Con cuál? Pista: gobernaba medio mundo.', options: ['Felipe II', 'Carlos V', 'Fernando el Católico', 'Napoleón'], answer: 1, explanation: 'Enriquillo firmó la paz con el emperador Carlos V (Carlos I de España), quien gobernaba un imperio donde "nunca se ponía el sol".' },
      en: { q: 'Enriquillo signed a peace treaty with a very powerful emperor. Which one? Hint: he ruled half the world.', options: ['Philip II', 'Charles V', 'Ferdinand the Catholic', 'Napoleon'], answer: 1, explanation: 'Enriquillo signed peace with Emperor Charles V (Charles I of Spain), who ruled an empire where "the sun never set".' },
      fr: { q: 'Enriquillo a signé un traité de paix avec un empereur très puissant. Lequel ? Indice : il gouvernait la moitié du monde.', options: ['Philippe II', 'Charles Quint', 'Ferdinand le Catholique', 'Napoléon'], answer: 1, explanation: 'Enriquillo a signé la paix avec l\'empereur Charles Quint (Charles Ier d\'Espagne), qui régnait sur un empire où "le soleil ne se couchait jamais".' }
    }
  },

  {
    id: 'hist-025', type: 'tf',
    lang: {
      es: { q: 'Mencía, la esposa de Enriquillo, fue educada por los frailes españoles. Era como Hermione: lista y criada entre los "enemigos".', answer: true, explanation: 'Mencía fue educada por frailes franciscanos. Al casarse con Enriquillo, ambos usaron su educación española para negociar mejor con la Corona.' },
      en: { q: 'Mencia, Enriquillo\'s wife, was educated by Spanish friars. She was like Hermione: smart and raised among the "enemies".', answer: true, explanation: 'Mencia was educated by Franciscan friars. When she married Enriquillo, both used their Spanish education to negotiate better with the Crown.' },
      fr: { q: 'Mencía, l\'épouse d\'Enriquillo, fut éduquée par les frères espagnols. C\'était comme Hermione : intelligente et élevée parmi les "ennemis".', answer: true, explanation: 'Mencía fut éduquée par des frères franciscains. En épousant Enriquillo, tous deux utilisèrent leur éducation espagnole pour mieux négocier avec la Couronne.' }
    }
  },

  {
    id: 'hist-026', type: 'mcq',
    lang: {
      es: { q: 'El Lago Enriquillo lleva el nombre del cacique rebelde. ¿Qué tiene de especial este lago? Es como el Mar Muerto, pero caribeño.', options: ['Es el más profundo del Caribe', 'Está 40 metros bajo el nivel del mar y es hipersalino', 'Tiene aguas termales', 'Es artificial'], answer: 1, explanation: 'El Lago Enriquillo está a 40 metros bajo el nivel del mar y es hipersalino. Es el lago más bajo del Caribe y alberga cocodrilos americanos.' },
      en: { q: 'Lake Enriquillo is named after the rebel cacique. What\'s special about this lake? It\'s like the Dead Sea, but Caribbean.', options: ['It\'s the deepest in the Caribbean', 'It\'s 40m below sea level and hypersaline', 'It has hot springs', 'It\'s artificial'], answer: 1, explanation: 'Lake Enriquillo is 40 meters below sea level and hypersaline. It\'s the lowest lake in the Caribbean and home to American crocodiles.' },
      fr: { q: 'Le Lac Enriquillo porte le nom du cacique rebelle. Qu\'a-t-il de spécial ? C\'est comme la Mer Morte, mais caribéen.', options: ['C\'est le plus profond des Caraïbes', 'Il est à 40m sous le niveau de la mer et hypersalin', 'Il a des sources thermales', 'Il est artificiel'], answer: 1, explanation: 'Le Lac Enriquillo est à 40 mètres sous le niveau de la mer et hypersalin. C\'est le lac le plus bas des Caraïbes, abritant des crocodiles américains.' }
    }
  },

  {
    id: 'hist-027', type: 'fill',
    lang: {
      es: { q: 'La isla en medio del Lago Enriquillo donde Enriquillo tenía su base se llama Isla ________. Los taínos la llamaban Guarizacca.', answer: ['Cabritos', 'Guarizacca'], explanation: 'La Isla Cabritos (Guarizacca en taíno) está en el centro del Lago Enriquillo y es hoy un parque nacional con fauna endémica.' },
      en: { q: 'The island in the middle of Lake Enriquillo where Enriquillo had his base is called ________ Island. The Tainos called it Guarizacca.', answer: ['Cabritos', 'Guarizacca'], explanation: 'Cabritos Island (Guarizacca in Taino) is in the center of Lake Enriquillo and is now a national park with endemic wildlife.' },
      fr: { q: 'L\'île au milieu du Lac Enriquillo où Enriquillo avait sa base s\'appelle Isla ________. Les Taïnos l\'appelaient Guarizacca.', answer: ['Cabritos', 'Guarizacca'], explanation: 'L\'Isla Cabritos (Guarizacca en taïno) se trouve au centre du Lac Enriquillo et est aujourd\'hui un parc national avec une faune endémique.' }
    }
  },

  {
    id: 'hist-028', type: 'tf',
    lang: {
      es: { q: 'La rebelión de Enriquillo fue la primera revuelta indígena exitosa en todo el continente americano. Nivel logro desbloqueado.', answer: true, explanation: 'Enriquillo logró algo que ningún otro líder indígena había conseguido: un tratado de paz formal con la Corona española.' },
      en: { q: 'Enriquillo\'s rebellion was the first successful indigenous revolt in all of the Americas. Achievement unlocked.', answer: true, explanation: 'Enriquillo achieved what no other indigenous leader had: a formal peace treaty with the Spanish Crown.' },
      fr: { q: 'La rébellion d\'Enriquillo fut la première révolte indigène réussie dans toutes les Amériques. Succès débloqué.', answer: true, explanation: 'Enriquillo a accompli ce qu\'aucun autre leader autochtone n\'avait réussi : un traité de paix formel avec la Couronne espagnole.' }
    }
  },

  {
    id: 'hist-029', type: 'mcq',
    lang: {
      es: { q: 'Enriquillo empezó su rebelión porque un español le robó algo muy personal, como un villain origin story. ¿Qué pasó?', options: ['Le quitaron su cemí sagrado', 'Un encomendero le quitó sus tierras y abusó de Mencía', 'Le prohibieron jugar batú', 'Le cobraron impuestos excesivos'], answer: 1, explanation: 'El encomendero Valenzuela le quitó sus tierras y abusó de su esposa Mencía. Enriquillo buscó justicia legal pero fue ignorado, así que se rebeló.' },
      en: { q: 'Enriquillo started his rebellion because a Spaniard took something very personal, like a villain origin story. What happened?', options: ['They took his sacred cemi', 'An encomendero took his lands and abused Mencia', 'They banned him from playing batu', 'They charged excessive taxes'], answer: 1, explanation: 'The encomendero Valenzuela took his lands and abused his wife Mencia. Enriquillo sought legal justice but was ignored, so he rebelled.' },
      fr: { q: 'Enriquillo a commencé sa rébellion parce qu\'un Espagnol lui a pris quelque chose de très personnel, comme une origin story de villain. Que s\'est-il passé ?', options: ['On lui a pris son cemí sacré', 'Un encomendero lui a pris ses terres et a abusé de Mencía', 'On lui a interdit de jouer au batú', 'On lui a imposé des taxes excessives'], answer: 1, explanation: 'L\'encomendero Valenzuela lui a pris ses terres et a abusé de sa femme Mencía. Enriquillo a cherché justice légalement mais fut ignoré, alors il s\'est rebellé.' }
    }
  },

  {
    id: 'hist-030', type: 'match',
    lang: {
      es: { q: 'Conecta cada personaje histórico con su descripción, como si crearas tu equipo de RPG:', pairs: [['Enriquillo', 'Cacique rebelde del Bahoruco'], ['Mencía', 'Esposa educada por frailes'], ['Carlos V', 'Emperador que firmó la paz'], ['Valenzuela', 'Encomendero abusivo']], explanation: 'Estos personajes son clave en la historia de la primera rebelión indígena exitosa de América.' },
      en: { q: 'Match each historical figure with their description, like building your RPG party:', pairs: [['Enriquillo', 'Rebel cacique of Bahoruco'], ['Mencia', 'Wife educated by friars'], ['Charles V', 'Emperor who signed the peace'], ['Valenzuela', 'Abusive encomendero']], explanation: 'These characters are key to the story of the first successful indigenous rebellion in the Americas.' },
      fr: { q: 'Relie chaque personnage historique à sa description, comme pour créer ton équipe de RPG :', pairs: [['Enriquillo', 'Cacique rebelle du Bahoruco'], ['Mencía', 'Épouse éduquée par les frères'], ['Charles Quint', 'Empereur qui signa la paix'], ['Valenzuela', 'Encomendero abusif']], explanation: 'Ces personnages sont essentiels dans l\'histoire de la première rébellion indigène réussie des Amériques.' }
    }
  },

  // ---- 31-40: Sebastian Lemba & maroons ----

  {
    id: 'hist-031', type: 'mcq',
    lang: {
      es: { q: 'Sebastián Lemba lideraba cimarrones como un capitán pirata de One Piece, pero luchaba por la libertad. ¿Qué eran los cimarrones?', options: ['Soldados españoles rebeldes', 'Esclavos africanos que escaparon y formaron comunidades libres', 'Comerciantes taínos', 'Piratas franceses'], answer: 1, explanation: 'Los cimarrones eran personas esclavizadas de origen africano que escapaban y creaban comunidades libres en las montañas.' },
      en: { q: 'Sebastian Lemba led maroons like a One Piece pirate captain, but he fought for freedom. What were the maroons?', options: ['Rebel Spanish soldiers', 'Escaped enslaved Africans who formed free communities', 'Taino merchants', 'French pirates'], answer: 1, explanation: 'Maroons were enslaved people of African origin who escaped and created free communities in the mountains.' },
      fr: { q: 'Sebastián Lemba menait les marrons comme un capitaine pirate de One Piece, mais il luttait pour la liberté. Qu\'étaient les marrons ?', options: ['Des soldats espagnols rebelles', 'Des esclaves africains évadés ayant formé des communautés libres', 'Des marchands taïnos', 'Des pirates français'], answer: 1, explanation: 'Les marrons étaient des personnes asservies d\'origine africaine qui s\'évadaient et créaient des communautés libres dans les montagnes.' }
    }
  },

  {
    id: 'hist-032', type: 'tf',
    lang: {
      es: { q: 'El Palenque de Lemba fue la primera comunidad libre de afrodescendientes en América. Como Wakanda, pero real.', answer: true, explanation: 'Se considera que la comunidad cimarrona de Lemba (~1540s) fue una de las primeras comunidades libres de afrodescendientes en el continente.' },
      en: { q: 'Lemba\'s Palenque was the first free Afro-descendant community in the Americas. Like Wakanda, but real.', answer: true, explanation: 'Lemba\'s maroon community (~1540s) is considered one of the first free Afro-descendant communities in the continent.' },
      fr: { q: 'Le Palenque de Lemba fut la première communauté libre d\'afro-descendants en Amérique. Comme le Wakanda, mais en vrai.', answer: true, explanation: 'La communauté marronne de Lemba (~1540) est considérée comme l\'une des premières communautés libres d\'afro-descendants du continent.' }
    }
  },

  {
    id: 'hist-033', type: 'fill',
    lang: {
      es: { q: 'Las comunidades cimarronas se llamaban "________". Eran como bases secretas en las montañas. ¡Nivel Fortress of Solitude!', answer: ['palenques', 'palenque', 'manieles', 'maniel'], explanation: 'Los palenques eran asentamientos fortificados donde los cimarrones vivían en libertad, ocultos en las montañas.' },
      en: { q: 'Maroon communities were called "________". They were like secret mountain bases. Fortress of Solitude level!', answer: ['palenques', 'palenque', 'manieles', 'maniel'], explanation: 'Palenques were fortified settlements where maroons lived in freedom, hidden in the mountains.' },
      fr: { q: 'Les communautés marronnes s\'appelaient "________". C\'étaient comme des bases secrètes en montagne. Niveau Forteresse de Solitude !', answer: ['palenques', 'palenque', 'manieles', 'maniel'], explanation: 'Les palenques étaient des établissements fortifiés où les marrons vivaient en liberté, cachés dans les montagnes.' }
    }
  },

  {
    id: 'hist-034', type: 'mcq',
    lang: {
      es: { q: 'Sebastián Lemba resistió a los españoles durante unos 15 años. ¿En qué década aproximada lideraba su palenque?', options: ['1490s', '1540s', '1600s', '1750s'], answer: 1, explanation: 'Lemba fue líder cimarrón alrededor de la década de 1540, apenas unas décadas después de que comenzara la esclavitud africana en La Hispaniola.' },
      en: { q: 'Sebastian Lemba resisted the Spanish for about 15 years. Around which decade did he lead his palenque?', options: ['1490s', '1540s', '1600s', '1750s'], answer: 1, explanation: 'Lemba was a maroon leader around the 1540s, just decades after African slavery began in Hispaniola.' },
      fr: { q: 'Sebastián Lemba a résisté aux Espagnols pendant environ 15 ans. Vers quelle décennie dirigeait-il son palenque ?', options: ['1490', '1540', '1600', '1750'], answer: 1, explanation: 'Lemba était un chef marron vers les années 1540, seulement quelques décennies après le début de l\'esclavage africain à Hispaniola.' }
    }
  },

  {
    id: 'hist-035', type: 'tf',
    lang: {
      es: { q: 'Los cimarrones solo eran de origen africano. No había taínos ni mestizos en los palenques.', answer: false, explanation: 'Aunque la mayoría eran africanos, los palenques a veces incluían taínos y mestizos que también huían de la opresión española.' },
      en: { q: 'Maroons were only of African origin. There were no Tainos or mixed-race people in the palenques.', answer: false, explanation: 'While most were African, palenques sometimes included Tainos and mixed-race people also fleeing Spanish oppression.' },
      fr: { q: 'Les marrons étaient uniquement d\'origine africaine. Il n\'y avait ni Taïnos ni métis dans les palenques.', answer: false, explanation: 'Bien que la plupart fussent africains, les palenques incluaient parfois des Taïnos et des métis fuyant aussi l\'oppression espagnole.' }
    }
  },

  {
    id: 'hist-036', type: 'mcq',
    lang: {
      es: { q: 'En el juego ArcLycée, el palenque de Lemba está en las montañas. ¿Qué personaje del palenque es herrero y te da un arma?', options: ['Marcos el vigía', 'Kofi el herrero', 'Amara la tamborera', 'Yemayá la curandera'], answer: 1, explanation: 'Kofi el herrero te da el Machete Cimarrón (+2 daño) en el Palenque de Lemba del juego.' },
      en: { q: 'In ArcLycee, Lemba\'s palenque is in the mountains. Which character is the blacksmith who gives you a weapon?', options: ['Marcos the lookout', 'Kofi the blacksmith', 'Amara the drummer', 'Yemaya the healer'], answer: 1, explanation: 'Kofi the blacksmith gives you the Maroon Machete (+2 damage) in Lemba\'s Palenque in the game.' },
      fr: { q: 'Dans ArcLycée, le palenque de Lemba est dans les montagnes. Quel personnage est le forgeron qui te donne une arme ?', options: ['Marcos la sentinelle', 'Kofi le forgeron', 'Amara la tambourinaire', 'Yemayá la guérisseuse'], answer: 1, explanation: 'Kofi le forgeron te donne la Machette Marronne (+2 dégâts) dans le Palenque de Lemba du jeu.' }
    }
  },

  {
    id: 'hist-037', type: 'match',
    lang: {
      es: { q: 'Relaciona cada miembro del palenque con su rol, como un equipo de Avengers cimarrones:', pairs: [['Sebastián Lemba', 'Líder y mentor'], ['Kofi', 'Herrero'], ['Amara', 'Tamborera y música'], ['Yemayá', 'Curandera'], ['Marcos', 'Vigía y guardián']], explanation: 'El palenque era una comunidad organizada donde cada persona tenía un rol esencial para la supervivencia del grupo.' },
      en: { q: 'Match each palenque member with their role, like a team of maroon Avengers:', pairs: [['Sebastian Lemba', 'Leader and mentor'], ['Kofi', 'Blacksmith'], ['Amara', 'Drummer and musician'], ['Yemaya', 'Healer'], ['Marcos', 'Lookout and guardian']], explanation: 'The palenque was an organized community where each person had an essential role for the group\'s survival.' },
      fr: { q: 'Relie chaque membre du palenque à son rôle, comme une équipe d\'Avengers marrons :', pairs: [['Sebastián Lemba', 'Chef et mentor'], ['Kofi', 'Forgeron'], ['Amara', 'Tambourinaire et musicienne'], ['Yemayá', 'Guérisseuse'], ['Marcos', 'Sentinelle et gardien']], explanation: 'Le palenque était une communauté organisée où chaque personne avait un rôle essentiel pour la survie du groupe.' }
    }
  },

  {
    id: 'hist-038', type: 'tf',
    lang: {
      es: { q: 'Los tambores eran solo para hacer música en los palenques. No tenían función militar.', answer: false, explanation: 'Los tambores servían para comunicación a larga distancia, alertas de peligro y coordinación militar, además de música y ceremonias.' },
      en: { q: 'Drums were only used for music in the palenques. They had no military function.', answer: false, explanation: 'Drums served for long-distance communication, danger alerts, and military coordination, in addition to music and ceremonies.' },
      fr: { q: 'Les tambours ne servaient qu\'à faire de la musique dans les palenques. Ils n\'avaient pas de fonction militaire.', answer: false, explanation: 'Les tambours servaient à la communication longue distance, aux alertes de danger et à la coordination militaire, en plus de la musique et des cérémonies.' }
    }
  },

  {
    id: 'hist-039', type: 'fill',
    lang: {
      es: { q: 'Sebastián ________ fue el líder cimarrón más famoso de La Hispaniola. Su apellido suena a león, y luchaba como uno.', answer: ['Lemba'], explanation: 'Sebastián Lemba es considerado un héroe de la resistencia afrodescendiente en la República Dominicana.' },
      en: { q: 'Sebastian ________ was the most famous maroon leader of Hispaniola. His last name sounds like it could be a lion\'s, and he fought like one.', answer: ['Lemba'], explanation: 'Sebastian Lemba is considered a hero of Afro-descendant resistance in the Dominican Republic.' },
      fr: { q: 'Sebastián ________ fut le chef marron le plus célèbre d\'Hispaniola. Son nom de famille ressemble à celui d\'un lion, et il se battait comme tel.', answer: ['Lemba'], explanation: 'Sebastián Lemba est considéré comme un héros de la résistance afro-descendante en République dominicaine.' }
    }
  },

  {
    id: 'hist-040', type: 'mcq',
    lang: {
      es: { q: 'La herencia africana en RD se ve en la música, la comida y las tradiciones. ¿Qué instrumento de origen africano es central en la música dominicana?', options: ['La guitarra', 'El tambor/la tambora', 'El violín', 'La flauta'], answer: 1, explanation: 'La tambora de origen africano es uno de los instrumentos fundamentales del merengue y otras expresiones musicales dominicanas.' },
      en: { q: 'African heritage in DR is seen in music, food, and traditions. What instrument of African origin is central to Dominican music?', options: ['Guitar', 'Drum/tambora', 'Violin', 'Flute'], answer: 1, explanation: 'The tambora of African origin is one of the fundamental instruments of merengue and other Dominican musical expressions.' },
      fr: { q: 'L\'héritage africain en RD se voit dans la musique, la nourriture et les traditions. Quel instrument d\'origine africaine est central dans la musique dominicaine ?', options: ['La guitare', 'Le tambour/la tambora', 'Le violon', 'La flûte'], answer: 1, explanation: 'La tambora d\'origine africaine est un des instruments fondamentaux du merengue et d\'autres expressions musicales dominicaines.' }
    }
  },

  // ---- 41-50: Anacaona and other caciques ----

  {
    id: 'hist-041', type: 'mcq',
    lang: {
      es: { q: 'Anacaona era la cacica de Xaragua, poetisa y artista. Si fuera un personaje de Disney, sería una mezcla de Moana y Rapunzel. ¿Qué significa su nombre en taíno?', options: ['Estrella de mar', 'Flor de oro', 'Luna plateada', 'Río sagrado'], answer: 1, explanation: 'Anacaona significa "Flor de Oro" en lengua taína. Fue una de las figuras más importantes de la resistencia taína.' },
      en: { q: 'Anacaona was the cacica of Xaragua, a poet and artist. If she were a Disney character, she\'d be a mix of Moana and Rapunzel. What does her name mean in Taino?', options: ['Starfish', 'Golden flower', 'Silver moon', 'Sacred river'], answer: 1, explanation: 'Anacaona means "Golden Flower" in the Taino language. She was one of the most important figures of Taino resistance.' },
      fr: { q: 'Anacaona était la cacique de Xaragua, poétesse et artiste. Si elle était un personnage Disney, elle serait un mélange de Moana et Rapunzel. Que signifie son nom en taïno ?', options: ['Étoile de mer', 'Fleur d\'or', 'Lune d\'argent', 'Rivière sacrée'], answer: 1, explanation: 'Anacaona signifie "Fleur d\'Or" en langue taïno. Elle fut l\'une des figures les plus importantes de la résistance taïno.' }
    }
  },

  {
    id: 'hist-042', type: 'tf',
    lang: {
      es: { q: 'Anacaona fue ejecutada por los españoles porque rechazó someterse. Es una historia trágica, como la de muchos héroes.', answer: true, explanation: 'Anacaona fue ejecutada en 1503 por orden del gobernador Nicolás de Ovando, quien la acusó falsamente de conspirar una rebelión.' },
      en: { q: 'Anacaona was executed by the Spanish because she refused to submit. It\'s a tragic story, like many heroes\'.', answer: true, explanation: 'Anacaona was executed in 1503 by order of Governor Nicolas de Ovando, who falsely accused her of plotting a rebellion.' },
      fr: { q: 'Anacaona fut exécutée par les Espagnols parce qu\'elle refusa de se soumettre. C\'est une histoire tragique, comme celle de nombreux héros.', answer: true, explanation: 'Anacaona fut exécutée en 1503 sur ordre du gouverneur Nicolás de Ovando, qui l\'accusa faussement de comploter une rébellion.' }
    }
  },

  {
    id: 'hist-043', type: 'fill',
    lang: {
      es: { q: 'El cacique que recibió a Colón en su primer viaje y le dio refugio fue Cacique ________. Nivel hospitalidad: over 9000.', answer: ['Guacanagaríx', 'Guacanagarix'], explanation: 'Guacanagaríx fue el cacique de Marién que recibió amablemente a Colón en 1492 y lo ayudó cuando el Santa María naufragó.' },
      en: { q: 'The cacique who welcomed Columbus on his first voyage and sheltered him was Cacique ________. Hospitality level: over 9000.', answer: ['Guacanagarix', 'Guacanagaríx'], explanation: 'Guacanagarix was the cacique of Marien who kindly welcomed Columbus in 1492 and helped him when the Santa Maria shipwrecked.' },
      fr: { q: 'Le cacique qui accueillit Colomb lors de son premier voyage et lui donna refuge était le Cacique ________. Niveau hospitalité : plus de 9000.', answer: ['Guacanagaríx', 'Guacanagarix'], explanation: 'Guacanagaríx fut le cacique de Marién qui accueillit aimablement Colomb en 1492 et l\'aida lorsque le Santa María fit naufrage.' }
    }
  },

  {
    id: 'hist-044', type: 'mcq',
    lang: {
      es: { q: 'Xaragua era uno de los cinco cacicazgos de La Hispaniola. ¿Qué es un cacicazgo?', options: ['Un tipo de comida', 'Un territorio gobernado por un cacique', 'Un ritual religioso', 'Un tipo de canoa'], answer: 1, explanation: 'Un cacicazgo era una división territorial y política gobernada por un cacique. La Hispaniola tenía 5 cacicazgos principales.' },
      en: { q: 'Xaragua was one of the five cacicazgos of Hispaniola. What is a cacicazgo?', options: ['A type of food', 'A territory ruled by a cacique', 'A religious ritual', 'A type of canoe'], answer: 1, explanation: 'A cacicazgo was a territorial and political division ruled by a cacique. Hispaniola had 5 main cacicazgos.' },
      fr: { q: 'Xaragua était l\'un des cinq cacicazgos d\'Hispaniola. Qu\'est-ce qu\'un cacicazgo ?', options: ['Un type de nourriture', 'Un territoire gouverné par un cacique', 'Un rituel religieux', 'Un type de canot'], answer: 1, explanation: 'Un cacicazgo était une division territoriale et politique gouvernée par un cacique. Hispaniola avait 5 cacicazgos principaux.' }
    }
  },

  {
    id: 'hist-045', type: 'match',
    lang: {
      es: { q: 'Conecta cada cacicazgo de La Hispaniola con su cacique histórico:', pairs: [['Marién', 'Guacanagaríx'], ['Xaragua', 'Anacaona / Bohechío'], ['Maguana', 'Caonabó'], ['Higüey', 'Cotubanamá']], explanation: 'La Hispaniola estaba dividida en cinco grandes cacicazgos, cada uno con su propio cacique y territorio.' },
      en: { q: 'Match each cacicazgo of Hispaniola with its historical cacique:', pairs: [['Marien', 'Guacanagarix'], ['Xaragua', 'Anacaona / Bohechio'], ['Maguana', 'Caonabo'], ['Higuey', 'Cotubanama']], explanation: 'Hispaniola was divided into five great cacicazgos, each with its own cacique and territory.' },
      fr: { q: 'Relie chaque cacicazgo d\'Hispaniola à son cacique historique :', pairs: [['Marién', 'Guacanagaríx'], ['Xaragua', 'Anacaona / Bohechío'], ['Maguana', 'Caonabó'], ['Higüey', 'Cotubanamá']], explanation: 'Hispaniola était divisée en cinq grands cacicazgos, chacun avec son propre cacique et territoire.' }
    }
  },

  {
    id: 'hist-046', type: 'tf',
    lang: {
      es: { q: 'Los areítos eran fiestas donde los taínos solo bailaban. No tenían ningún otro propósito.', answer: false, explanation: 'Los areítos eran ceremonias complejas donde se bailaba, cantaba y se transmitía la historia oral de la comunidad. Eran educación, religión y arte a la vez.' },
      en: { q: 'Areitos were parties where the Tainos only danced. They had no other purpose.', answer: false, explanation: 'Areitos were complex ceremonies involving dance, song, and oral history transmission. They were education, religion, and art all at once.' },
      fr: { q: 'Les areítos étaient des fêtes où les Taïnos ne faisaient que danser. Ils n\'avaient aucun autre but.', answer: false, explanation: 'Les areítos étaient des cérémonies complexes incluant danse, chant et transmission de l\'histoire orale. Ils étaient éducation, religion et art à la fois.' }
    }
  },

  {
    id: 'hist-047', type: 'mcq',
    lang: {
      es: { q: 'Caonabó fue un cacique guerrero que resistió a los españoles. Era originario de otra isla. ¿De dónde venía?', options: ['Puerto Rico', 'Cuba', 'Probablemente de las Bahamas o una isla caribe', 'Jamaica'], answer: 2, explanation: 'Caonabó era probablemente de origen caribe (no taíno), lo que lo hacía un guerrero más agresivo. Gobernaba el cacicazgo de Maguana.' },
      en: { q: 'Caonabo was a warrior cacique who resisted the Spanish. He was originally from another island. Where was he from?', options: ['Puerto Rico', 'Cuba', 'Probably from the Bahamas or a Carib island', 'Jamaica'], answer: 2, explanation: 'Caonabo was probably of Carib (not Taino) origin, which made him a more aggressive warrior. He ruled the cacicazgo of Maguana.' },
      fr: { q: 'Caonabó était un cacique guerrier qui a résisté aux Espagnols. Il était originaire d\'une autre île. D\'où venait-il ?', options: ['Porto Rico', 'Cuba', 'Probablement des Bahamas ou d\'une île caraïbe', 'Jamaïque'], answer: 2, explanation: 'Caonabó était probablement d\'origine caraïbe (pas taïno), ce qui en faisait un guerrier plus agressif. Il gouvernait le cacicazgo de Maguana.' }
    }
  },

  {
    id: 'hist-048', type: 'fill',
    lang: {
      es: { q: 'Los taínos cultivaban en parcelas llamadas ________. Era como un jardín pero más pro: yuca, batata, maíz, ají...', answer: ['conucos', 'conuco'], explanation: 'Los conucos eran el sistema agrícola taíno: montículos de tierra donde cultivaban varios alimentos a la vez (policultivo).' },
      en: { q: 'The Tainos farmed in plots called ________. Like a garden but more pro: yuca, sweet potato, corn, chili...', answer: ['conucos', 'conuco'], explanation: 'Conucos were the Taino farming system: mounds of earth where they grew several crops at once (polyculture).' },
      fr: { q: 'Les Taïnos cultivaient dans des parcelles appelées ________. Comme un jardin mais plus pro : manioc, patate douce, maïs, piment...', answer: ['conucos', 'conuco'], explanation: 'Les conucos étaient le système agricole taïno : des monticules de terre où ils cultivaient plusieurs aliments à la fois (polyculture).' }
    }
  },

  {
    id: 'hist-049', type: 'tf',
    lang: {
      es: { q: 'La Hispaniola solo tenía 2 cacicazgos antes de la llegada de Colón.', answer: false, explanation: 'La Hispaniola tenía 5 cacicazgos principales: Marién, Maguá, Maguana, Xaragua e Higüey.' },
      en: { q: 'Hispaniola only had 2 cacicazgos before Columbus arrived.', answer: false, explanation: 'Hispaniola had 5 main cacicazgos: Marien, Magua, Maguana, Xaragua, and Higuey.' },
      fr: { q: 'Hispaniola n\'avait que 2 cacicazgos avant l\'arrivée de Colomb.', answer: false, explanation: 'Hispaniola avait 5 cacicazgos principaux : Marién, Maguá, Maguana, Xaragua et Higüey.' }
    }
  },

  {
    id: 'hist-050', type: 'mcq',
    lang: {
      es: { q: 'Anacaona era famosa no solo como líder sino también como artista. ¿En qué arte era especialmente talentosa?', options: ['Pintura en cuevas', 'Poesía y cantos (areítos)', 'Escultura de cemíes', 'Navegación'], answer: 1, explanation: 'Anacaona era una poetisa destacada que componía areítos (cantos y poemas). Su nombre "Flor de Oro" también refleja su sensibilidad artística.' },
      en: { q: 'Anacaona was famous not only as a leader but also as an artist. In what art was she especially talented?', options: ['Cave painting', 'Poetry and songs (areitos)', 'Cemi sculpture', 'Navigation'], answer: 1, explanation: 'Anacaona was a distinguished poet who composed areitos (songs and poems). Her name "Golden Flower" also reflects her artistic sensitivity.' },
      fr: { q: 'Anacaona était célèbre non seulement comme chef mais aussi comme artiste. Dans quel art était-elle particulièrement talentueuse ?', options: ['Peinture rupestre', 'Poésie et chants (areítos)', 'Sculpture de cemís', 'Navigation'], answer: 1, explanation: 'Anacaona était une poétesse distinguée qui composait des areítos (chants et poèmes). Son nom "Fleur d\'Or" reflète aussi sa sensibilité artistique.' }
    }
  },

  // ---- 51-60: Archaeological sites ----

  {
    id: 'hist-051', type: 'mcq',
    lang: {
      es: { q: 'Las Cuevas del Pomier son como la galería de arte más antigua de RD. ¿Qué contienen?', options: ['Tesoros españoles escondidos', 'Miles de petroglifos y pictografías taínas', 'Fósiles de dinosaurios', 'Ruinas de una ciudad subterránea'], answer: 1, explanation: 'Las Cuevas del Pomier (San Cristóbal) contienen una de las mayores colecciones de arte rupestre del Caribe, con miles de petroglifos y pictografías.' },
      en: { q: 'The Pomier Caves are like the oldest art gallery in DR. What do they contain?', options: ['Hidden Spanish treasures', 'Thousands of Taino petroglyphs and pictographs', 'Dinosaur fossils', 'Ruins of an underground city'], answer: 1, explanation: 'The Pomier Caves (San Cristobal) contain one of the largest collections of rock art in the Caribbean, with thousands of petroglyphs and pictographs.' },
      fr: { q: 'Les Grottes du Pomier sont comme la plus ancienne galerie d\'art de RD. Que contiennent-elles ?', options: ['Des trésors espagnols cachés', 'Des milliers de pétroglyphes et pictographies taïnos', 'Des fossiles de dinosaures', 'Des ruines d\'une cité souterraine'], answer: 1, explanation: 'Les Grottes du Pomier (San Cristóbal) contiennent l\'une des plus grandes collections d\'art rupestre des Caraïbes, avec des milliers de pétroglyphes et pictographies.' }
    }
  },

  {
    id: 'hist-052', type: 'fill',
    lang: {
      es: { q: 'Las ________ es un famoso sitio de petroglifos en el Lago Enriquillo. Su nombre describe lo que parecen: rostros tallados en la roca.', answer: ['Caritas', 'Las Caritas'], explanation: 'Las Caritas son petroglifos tallados en la roca a orillas del Lago Enriquillo. Representan rostros (caritas) y son un importante sitio arqueológico.' },
      en: { q: '________ is a famous petroglyph site at Lake Enriquillo. Its name describes what they look like: little faces carved in rock.', answer: ['Las Caritas', 'Caritas', 'The Little Faces'], explanation: 'Las Caritas are petroglyphs carved in rock on the shores of Lake Enriquillo. They represent faces (caritas) and are an important archaeological site.' },
      fr: { q: '________ est un célèbre site de pétroglyphes au Lac Enriquillo. Son nom décrit ce qu\'ils semblent être : de petits visages gravés dans la roche.', answer: ['Las Caritas', 'Caritas'], explanation: 'Las Caritas sont des pétroglyphes gravés dans la roche au bord du Lac Enriquillo. Ils représentent des visages (caritas) et constituent un important site archéologique.' }
    }
  },

  {
    id: 'hist-053', type: 'tf',
    lang: {
      es: { q: 'Los petroglifos son lo mismo que las pictografías. Son exactamente la misma cosa.', answer: false, explanation: 'No. Los petroglifos son tallados/grabados en piedra, mientras que las pictografías son pintadas sobre la superficie. Técnicas diferentes.' },
      en: { q: 'Petroglyphs are the same thing as pictographs. They are exactly identical.', answer: false, explanation: 'No. Petroglyphs are carved/engraved in stone, while pictographs are painted on the surface. Different techniques.' },
      fr: { q: 'Les pétroglyphes sont la même chose que les pictographies. Ce sont exactement la même chose.', answer: false, explanation: 'Non. Les pétroglyphes sont taillés/gravés dans la pierre, tandis que les pictographies sont peintes sur la surface. Techniques différentes.' }
    }
  },

  {
    id: 'hist-054', type: 'mcq',
    lang: {
      es: { q: 'El Manantial de la Aleta es un cenote sagrado taíno. ¿Qué es un cenote? Piensa en un portal al inframundo, estilo Percy Jackson.', options: ['Un volcán extinto', 'Un pozo natural de agua profunda en roca caliza', 'Un río subterráneo', 'Una fuente termal'], answer: 1, explanation: 'Un cenote es una formación geológica: un pozo natural de agua dulce creado por el colapso de roca caliza. Los taínos los consideraban sagrados.' },
      en: { q: 'Manantial de la Aleta is a sacred Taino cenote. What is a cenote? Think of a portal to the underworld, Percy Jackson style.', options: ['An extinct volcano', 'A natural deep-water sinkhole in limestone', 'An underground river', 'A thermal spring'], answer: 1, explanation: 'A cenote is a geological formation: a natural freshwater sinkhole created by the collapse of limestone. The Tainos considered them sacred.' },
      fr: { q: 'Le Manantial de la Aleta est un cenote sacré taïno. Qu\'est-ce qu\'un cenote ? Pensez à un portail vers les enfers, style Percy Jackson.', options: ['Un volcan éteint', 'Un puits naturel d\'eau profonde dans le calcaire', 'Une rivière souterraine', 'Une source thermale'], answer: 1, explanation: 'Un cenote est une formation géologique : un puits naturel d\'eau douce créé par l\'effondrement du calcaire. Les Taïnos les considéraient sacrés.' }
    }
  },

  {
    id: 'hist-055', type: 'tf',
    lang: {
      es: { q: 'Los taínos dejaban ofrendas en los cenotes, como los griegos dejaban ofrendas a los dioses en sus templos.', answer: true, explanation: 'Los cenotes eran sitios sagrados donde los taínos dejaban ofrendas de cerámica, cemíes y otros objetos rituales para sus deidades.' },
      en: { q: 'The Tainos left offerings in cenotes, like the Greeks left offerings to the gods in their temples.', answer: true, explanation: 'Cenotes were sacred sites where the Tainos left offerings of ceramics, cemis, and other ritual objects to their deities.' },
      fr: { q: 'Les Taïnos laissaient des offrandes dans les cenotes, comme les Grecs laissaient des offrandes aux dieux dans leurs temples.', answer: true, explanation: 'Les cenotes étaient des sites sacrés où les Taïnos déposaient des offrandes de céramique, cemís et autres objets rituels pour leurs divinités.' }
    }
  },

  {
    id: 'hist-056', type: 'mcq',
    lang: {
      es: { q: 'El Manantial de la Aleta está dentro de un parque nacional. ¿Cuál?', options: ['Parque Nacional Los Haitises', 'Parque Nacional Cotubanamá (antes del Este)', 'Parque Nacional Jaragua', 'Parque Nacional Sierra de Bahoruco'], answer: 1, explanation: 'El Manantial de la Aleta está en el Parque Nacional Cotubanamá (antes conocido como Parque Nacional del Este), en la costa sureste de RD.' },
      en: { q: 'Manantial de la Aleta is inside a national park. Which one?', options: ['Los Haitises National Park', 'Cotubanama National Park (formerly Del Este)', 'Jaragua National Park', 'Sierra de Bahoruco National Park'], answer: 1, explanation: 'Manantial de la Aleta is in Cotubanama National Park (formerly known as Del Este National Park), on the southeast coast of DR.' },
      fr: { q: 'Le Manantial de la Aleta se trouve dans un parc national. Lequel ?', options: ['Parc National Los Haitises', 'Parc National Cotubanamá (anciennement Del Este)', 'Parc National Jaragua', 'Parc National Sierra de Bahoruco'], answer: 1, explanation: 'Le Manantial de la Aleta se trouve dans le Parc National Cotubanamá (anciennement Parc National de l\'Est), sur la côte sud-est de la RD.' }
    }
  },

  {
    id: 'hist-057', type: 'match',
    lang: {
      es: { q: 'Conecta cada sitio arqueológico con lo que lo hace especial:', pairs: [['Cuevas del Pomier', 'Mayor colección de arte rupestre del Caribe'], ['Las Caritas', 'Petroglifos de rostros junto al Lago Enriquillo'], ['Manantial de la Aleta', 'Cenote sagrado con ofrendas taínas'], ['La Isabela', 'Primera ciudad europea en América']], explanation: 'La República Dominicana tiene un patrimonio arqueológico riquísimo que debemos conocer y proteger.' },
      en: { q: 'Match each archaeological site with what makes it special:', pairs: [['Pomier Caves', 'Largest rock art collection in the Caribbean'], ['Las Caritas', 'Face petroglyphs by Lake Enriquillo'], ['Manantial de la Aleta', 'Sacred cenote with Taino offerings'], ['La Isabela', 'First European city in the Americas']], explanation: 'The Dominican Republic has an incredibly rich archaeological heritage that we must know and protect.' },
      fr: { q: 'Relie chaque site archéologique à ce qui le rend spécial :', pairs: [['Grottes du Pomier', 'Plus grande collection d\'art rupestre des Caraïbes'], ['Las Caritas', 'Pétroglyphes de visages près du Lac Enriquillo'], ['Manantial de la Aleta', 'Cenote sacré avec offrandes taïnos'], ['La Isabela', 'Première ville européenne en Amérique']], explanation: 'La République dominicaine possède un patrimoine archéologique incroyablement riche que nous devons connaître et protéger.' }
    }
  },

  {
    id: 'hist-058', type: 'tf',
    lang: {
      es: { q: 'El Museo del Hombre Dominicano es como el Smithsonian, pero para la historia taína y dominicana. Está en Santo Domingo.', answer: true, explanation: 'El Museo del Hombre Dominicano, en Santo Domingo, es el principal museo de arqueología y etnografía del país, con una impresionante colección taína.' },
      en: { q: 'The Museum of the Dominican Man is like the Smithsonian, but for Taino and Dominican history. It\'s in Santo Domingo.', answer: true, explanation: 'The Museum of the Dominican Man, in Santo Domingo, is the country\'s main archaeology and ethnography museum, with an impressive Taino collection.' },
      fr: { q: 'Le Musée de l\'Homme Dominicain est comme le Smithsonian, mais pour l\'histoire taïno et dominicaine. Il est à Saint-Domingue.', answer: true, explanation: 'Le Musée de l\'Homme Dominicain, à Saint-Domingue, est le principal musée d\'archéologie et d\'ethnographie du pays, avec une impressionnante collection taïno.' }
    }
  },

  {
    id: 'hist-059', type: 'mcq',
    lang: {
      es: { q: 'Cotubanamá fue un cacique guerrero del este de la isla. ¿Por qué un parque nacional lleva su nombre hoy?', options: ['Porque descubrió el parque', 'Para honrar su resistencia contra los españoles', 'Porque plantó todos los árboles', 'Porque era biólogo'], answer: 1, explanation: 'Cotubanamá fue un cacique que resistió ferozmente la colonización española en el este de La Hispaniola. El parque lleva su nombre en su honor.' },
      en: { q: 'Cotubanama was a warrior cacique from eastern Hispaniola. Why does a national park bear his name today?', options: ['Because he discovered the park', 'To honor his resistance against the Spanish', 'Because he planted all the trees', 'Because he was a biologist'], answer: 1, explanation: 'Cotubanama was a cacique who fiercely resisted Spanish colonization in eastern Hispaniola. The park bears his name in his honor.' },
      fr: { q: 'Cotubanamá était un cacique guerrier de l\'est de l\'île. Pourquoi un parc national porte-t-il son nom aujourd\'hui ?', options: ['Parce qu\'il a découvert le parc', 'Pour honorer sa résistance contre les Espagnols', 'Parce qu\'il a planté tous les arbres', 'Parce qu\'il était biologiste'], answer: 1, explanation: 'Cotubanamá fut un cacique qui résista férocement la colonisation espagnole à l\'est d\'Hispaniola. Le parc porte son nom en son honneur.' }
    }
  },

  {
    id: 'hist-060', type: 'fill',
    lang: {
      es: { q: 'Roberto ________ es un historiador dominicano real que ha dedicado su vida a estudiar la historia de RD. Aparece en ArcLycée como NPC.', answer: ['Cassá', 'Cassa'], explanation: 'Roberto Cassá es uno de los historiadores más importantes de la República Dominicana y aparece como personaje en ArcLycée.' },
      en: { q: 'Roberto ________ is a real Dominican historian who has dedicated his life to studying DR history. He appears in ArcLycee as an NPC.', answer: ['Cassá', 'Cassa'], explanation: 'Roberto Cassa is one of the most important historians of the Dominican Republic and appears as a character in ArcLycee.' },
      fr: { q: 'Roberto ________ est un véritable historien dominicain qui a consacré sa vie à étudier l\'histoire de la RD. Il apparaît dans ArcLycée comme PNJ.', answer: ['Cassá', 'Cassa'], explanation: 'Roberto Cassá est l\'un des historiens les plus importants de la République dominicaine et apparaît comme personnage dans ArcLycée.' }
    }
  },

  // ---- 61-70: Heritage protection & laws ----

  {
    id: 'hist-061', type: 'mcq',
    lang: {
      es: { q: 'En RD existe una ley que protege el patrimonio arqueológico, como las leyes de protección de Hogwarts pero para artefactos reales. ¿Cuál es?', options: ['Ley 1-12', 'Ley 318-68', 'Ley 502-99', 'Ley 64-00'], answer: 1, explanation: 'La Ley 318-68 es la ley dominicana que protege el patrimonio cultural y arqueológico del país.' },
      en: { q: 'In DR there\'s a law that protects archaeological heritage, like Hogwarts protection laws but for real artifacts. Which one?', options: ['Law 1-12', 'Law 318-68', 'Law 502-99', 'Law 64-00'], answer: 1, explanation: 'Law 318-68 is the Dominican law that protects the country\'s cultural and archaeological heritage.' },
      fr: { q: 'En RD, il existe une loi qui protège le patrimoine archéologique, comme les lois de protection de Poudlard mais pour de vrais artefacts. Laquelle ?', options: ['Loi 1-12', 'Loi 318-68', 'Loi 502-99', 'Loi 64-00'], answer: 1, explanation: 'La Loi 318-68 est la loi dominicaine qui protège le patrimoine culturel et archéologique du pays.' }
    }
  },

  {
    id: 'hist-062', type: 'tf',
    lang: {
      es: { q: 'Es totalmente legal llevarte un artefacto taíno de un sitio arqueológico como souvenir. ¿Verdad?', answer: false, explanation: 'Falso. La Ley 318-68 y convenciones internacionales prohíben la extracción de artefactos arqueológicos. Es un delito contra el patrimonio.' },
      en: { q: 'It\'s totally legal to take a Taino artifact from an archaeological site as a souvenir. True?', answer: false, explanation: 'False. Law 318-68 and international conventions prohibit the extraction of archaeological artifacts. It\'s a crime against heritage.' },
      fr: { q: 'C\'est totalement légal d\'emporter un artefact taïno d\'un site archéologique comme souvenir. Vrai ?', answer: false, explanation: 'Faux. La Loi 318-68 et les conventions internationales interdisent l\'extraction d\'artefacts archéologiques. C\'est un délit contre le patrimoine.' }
    }
  },

  {
    id: 'hist-063', type: 'mcq',
    lang: {
      es: { q: 'La UNESCO tiene una convención importante sobre tráfico de bienes culturales. ¿De qué año es? Pista: fue el mismo año que los Beatles se separaron.', options: ['1960', '1970', '1980', '1990'], answer: 1, explanation: 'La Convención UNESCO de 1970 es el tratado internacional principal contra el tráfico ilícito de bienes culturales.' },
      en: { q: 'UNESCO has an important convention on trafficking of cultural property. What year? Hint: same year the Beatles broke up.', options: ['1960', '1970', '1980', '1990'], answer: 1, explanation: 'The 1970 UNESCO Convention is the main international treaty against illicit trafficking of cultural property.' },
      fr: { q: 'L\'UNESCO a une convention importante sur le trafic de biens culturels. De quelle année ? Indice : la même année que la séparation des Beatles.', options: ['1960', '1970', '1980', '1990'], answer: 1, explanation: 'La Convention UNESCO de 1970 est le principal traité international contre le trafic illicite de biens culturels.' }
    }
  },

  {
    id: 'hist-064', type: 'fill',
    lang: {
      es: { q: 'La organización internacional que protege el patrimonio cultural mundial se llama ________. Tiene su sede en París.', answer: ['UNESCO'], explanation: 'La UNESCO (Organización de las Naciones Unidas para la Educación, la Ciencia y la Cultura) protege el patrimonio cultural y natural mundial.' },
      en: { q: 'The international organization that protects world cultural heritage is called ________. It\'s based in Paris.', answer: ['UNESCO'], explanation: 'UNESCO (United Nations Educational, Scientific and Cultural Organization) protects world cultural and natural heritage.' },
      fr: { q: 'L\'organisation internationale qui protège le patrimoine culturel mondial s\'appelle ________. Elle a son siège à Paris.', answer: ['UNESCO', 'l\'UNESCO'], explanation: 'L\'UNESCO (Organisation des Nations Unies pour l\'Éducation, la Science et la Culture) protège le patrimoine culturel et naturel mondial.' }
    }
  },

  {
    id: 'hist-065', type: 'tf',
    lang: {
      es: { q: 'INTERPOL solo investiga robos de bancos y cibercrimen. No tiene nada que ver con artefactos arqueológicos.', answer: false, explanation: 'INTERPOL tiene una unidad dedicada a combatir el tráfico de bienes culturales y artefactos arqueológicos a nivel mundial.' },
      en: { q: 'INTERPOL only investigates bank robberies and cybercrime. It has nothing to do with archaeological artifacts.', answer: false, explanation: 'INTERPOL has a dedicated unit to combat trafficking of cultural property and archaeological artifacts worldwide.' },
      fr: { q: 'INTERPOL n\'enquête que sur les braquages de banques et la cybercriminalité. Cela n\'a rien à voir avec les artefacts archéologiques.', answer: false, explanation: 'INTERPOL dispose d\'une unité dédiée à la lutte contre le trafic de biens culturels et d\'artefacts archéologiques dans le monde entier.' }
    }
  },

  {
    id: 'hist-066', type: 'mcq',
    lang: {
      es: { q: 'En ArcLycée, te enfrentas a un traficante de artefactos en el aeropuerto. ¿Con qué "armas" lo derrotas si usas la ruta pacifista?', options: ['Espadas y escudos', 'Leyes, evidencia forense y cooperación internacional', 'Hechizos mágicos', 'Dinero y sobornos'], answer: 1, explanation: 'En el combate legal del juego, usas la Ley 318, evidencia forense, INTERPOL y la Convención UNESCO 1970 para detener al traficante.' },
      en: { q: 'In ArcLycee, you face an artifact trafficker at the airport. How do you beat them using the pacifist route?', options: ['Swords and shields', 'Laws, forensic evidence, and international cooperation', 'Magic spells', 'Money and bribes'], answer: 1, explanation: 'In the game\'s legal combat, you use Law 318, forensic evidence, INTERPOL, and the 1970 UNESCO Convention to stop the trafficker.' },
      fr: { q: 'Dans ArcLycée, tu affrontes un trafiquant d\'artefacts à l\'aéroport. Comment le vaincre par la voie pacifiste ?', options: ['Épées et boucliers', 'Lois, preuves forensiques et coopération internationale', 'Sorts magiques', 'Argent et pots-de-vin'], answer: 1, explanation: 'Dans le combat légal du jeu, tu utilises la Loi 318, les preuves forensiques, INTERPOL et la Convention UNESCO 1970 pour arrêter le trafiquant.' }
    }
  },

  {
    id: 'hist-067', type: 'match',
    lang: {
      es: { q: 'Conecta cada herramienta legal con su función en la protección del patrimonio:', pairs: [['Ley 318-68', 'Protección nacional del patrimonio en RD'], ['UNESCO 1970', 'Convención contra tráfico internacional'], ['INTERPOL', 'Policía internacional contra traficantes'], ['Evidencia forense', 'Prueba científica del origen de artefactos']], explanation: 'La protección del patrimonio requiere leyes locales, tratados internacionales y cooperación policial.' },
      en: { q: 'Match each legal tool with its function in heritage protection:', pairs: [['Law 318-68', 'National heritage protection in DR'], ['UNESCO 1970', 'Convention against international trafficking'], ['INTERPOL', 'International police against traffickers'], ['Forensic evidence', 'Scientific proof of artifact origins']], explanation: 'Heritage protection requires local laws, international treaties, and police cooperation.' },
      fr: { q: 'Relie chaque outil juridique à sa fonction dans la protection du patrimoine :', pairs: [['Loi 318-68', 'Protection nationale du patrimoine en RD'], ['UNESCO 1970', 'Convention contre le trafic international'], ['INTERPOL', 'Police internationale contre les trafiquants'], ['Preuve forensique', 'Preuve scientifique de l\'origine des artefacts']], explanation: 'La protection du patrimoine nécessite des lois locales, des traités internationaux et la coopération policière.' }
    }
  },

  {
    id: 'hist-068', type: 'tf',
    lang: {
      es: { q: 'El tráfico de artefactos arqueológicos es un crimen que solo afecta a museos ricos. No le importa a nadie más.', answer: false, explanation: 'El tráfico destruye el contexto arqueológico, borra la historia de pueblos enteros y es un crimen contra la humanidad. Nos afecta a todos.' },
      en: { q: 'Archaeological artifact trafficking is a crime that only affects rich museums. Nobody else cares.', answer: false, explanation: 'Trafficking destroys archaeological context, erases the history of entire peoples, and is a crime against humanity. It affects us all.' },
      fr: { q: 'Le trafic d\'artefacts archéologiques est un crime qui n\'affecte que les musées riches. Personne d\'autre n\'est concerné.', answer: false, explanation: 'Le trafic détruit le contexte archéologique, efface l\'histoire de peuples entiers et est un crime contre l\'humanité. Cela nous concerne tous.' }
    }
  },

  {
    id: 'hist-069', type: 'mcq',
    lang: {
      es: { q: '¿Por qué es tan importante NO mover un artefacto de su sitio original? Piensa en una escena del crimen nivel CSI.', options: ['Porque pesa mucho', 'Porque el contexto (dónde y cómo se encontró) es tan valioso como el objeto', 'Porque está maldito', 'Porque los museos no los quieren'], answer: 1, explanation: 'El contexto arqueológico (posición, capa de tierra, objetos cercanos) da información crucial sobre la historia del artefacto y su cultura.' },
      en: { q: 'Why is it so important NOT to move an artifact from its original site? Think CSI crime scene level.', options: ['Because it\'s too heavy', 'Because the context (where and how it was found) is as valuable as the object', 'Because it\'s cursed', 'Because museums don\'t want them'], answer: 1, explanation: 'Archaeological context (position, soil layer, nearby objects) provides crucial information about the artifact\'s history and culture.' },
      fr: { q: 'Pourquoi est-il si important de NE PAS déplacer un artefact de son site original ? Pense à une scène de crime niveau Les Experts.', options: ['Parce qu\'il est trop lourd', 'Parce que le contexte (où et comment il a été trouvé) est aussi précieux que l\'objet', 'Parce qu\'il est maudit', 'Parce que les musées n\'en veulent pas'], answer: 1, explanation: 'Le contexte archéologique (position, couche de terre, objets voisins) fournit des informations cruciales sur l\'histoire de l\'artefact et sa culture.' }
    }
  },

  {
    id: 'hist-070', type: 'fill',
    lang: {
      es: { q: 'La ley dominicana que protege el patrimonio es la Ley ___-68. Memoriza ese número, es como tu código de héroe.', answer: ['318', '318-68'], explanation: 'La Ley 318-68 es la piedra angular de la protección del patrimonio cultural en la República Dominicana.' },
      en: { q: 'The Dominican law that protects heritage is Law ___-68. Memorize that number, it\'s like your hero code.', answer: ['318', '318-68'], explanation: 'Law 318-68 is the cornerstone of cultural heritage protection in the Dominican Republic.' },
      fr: { q: 'La loi dominicaine qui protège le patrimoine est la Loi ___-68. Mémorise ce numéro, c\'est comme ton code de héros.', answer: ['318', '318-68'], explanation: 'La Loi 318-68 est la pierre angulaire de la protection du patrimoine culturel en République dominicaine.' }
    }
  },

  // ---- 71-80: Critical thinking & connections ----

  {
    id: 'hist-071', type: 'mcq',
    lang: {
      es: { q: 'Tanto Enriquillo como Lemba lucharon por la libertad, pero desde perspectivas diferentes. ¿Qué tenían en común?', options: ['Ambos eran caciques taínos', 'Ambos usaron las montañas como refugio y resistieron la opresión española', 'Ambos firmaron tratados con la Corona', 'Ambos eran de África'], answer: 1, explanation: 'Tanto Enriquillo (taíno) como Lemba (africano) usaron las montañas de La Hispaniola como base para resistir la opresión colonial española.' },
      en: { q: 'Both Enriquillo and Lemba fought for freedom, but from different perspectives. What did they have in common?', options: ['Both were Taino caciques', 'Both used mountains as refuge and resisted Spanish oppression', 'Both signed treaties with the Crown', 'Both were from Africa'], answer: 1, explanation: 'Both Enriquillo (Taino) and Lemba (African) used Hispaniola\'s mountains as a base to resist Spanish colonial oppression.' },
      fr: { q: 'Enriquillo et Lemba ont tous deux lutté pour la liberté, mais de perspectives différentes. Qu\'avaient-ils en commun ?', options: ['Les deux étaient des caciques taïnos', 'Les deux ont utilisé les montagnes comme refuge et résisté à l\'oppression espagnole', 'Les deux ont signé des traités avec la Couronne', 'Les deux venaient d\'Afrique'], answer: 1, explanation: 'Enriquillo (taïno) et Lemba (africain) ont tous deux utilisé les montagnes d\'Hispaniola comme base pour résister à l\'oppression coloniale espagnole.' }
    }
  },

  {
    id: 'hist-072', type: 'tf',
    lang: {
      es: { q: 'La identidad dominicana es solo taína. La herencia africana y española no son importantes.', answer: false, explanation: 'La identidad dominicana es triétnica: una mezcla de herencia taína, africana y española. Las tres culturas son igualmente importantes.' },
      en: { q: 'Dominican identity is only Taino. African and Spanish heritage are not important.', answer: false, explanation: 'Dominican identity is tri-ethnic: a mix of Taino, African, and Spanish heritage. All three cultures are equally important.' },
      fr: { q: 'L\'identité dominicaine est uniquement taïno. L\'héritage africain et espagnol n\'est pas important.', answer: false, explanation: 'L\'identité dominicaine est triéthnique : un mélange d\'héritages taïno, africain et espagnol. Les trois cultures sont également importantes.' }
    }
  },

  {
    id: 'hist-073', type: 'mcq',
    lang: {
      es: { q: 'En ArcLycée hay una ruta pacifista y una agresiva, como en Undertale. ¿Qué nos enseña esto sobre la resolución de conflictos históricos?', options: ['Que la violencia siempre gana', 'Que tanto el diálogo como la fuerza fueron usados históricamente, pero la paz dura más', 'Que los conflictos no existieron', 'Que solo los fuertes sobreviven'], answer: 1, explanation: 'La historia muestra que tanto la resistencia armada como la negociación fueron estrategias reales. Enriquillo usó ambas antes de lograr la paz.' },
      en: { q: 'In ArcLycee there\'s a pacifist and aggressive route, like in Undertale. What does this teach about resolving historical conflicts?', options: ['That violence always wins', 'That both dialogue and force were used historically, but peace lasts longer', 'That conflicts never existed', 'That only the strong survive'], answer: 1, explanation: 'History shows that both armed resistance and negotiation were real strategies. Enriquillo used both before achieving peace.' },
      fr: { q: 'Dans ArcLycée, il y a une voie pacifiste et une voie agressive, comme dans Undertale. Qu\'est-ce que cela enseigne sur la résolution des conflits historiques ?', options: ['Que la violence gagne toujours', 'Que le dialogue et la force furent utilisés historiquement, mais la paix dure plus longtemps', 'Que les conflits n\'ont jamais existé', 'Que seuls les forts survivent'], answer: 1, explanation: 'L\'histoire montre que la résistance armée et la négociation furent de vraies stratégies. Enriquillo utilisa les deux avant d\'obtenir la paix.' }
    }
  },

  {
    id: 'hist-074', type: 'fill',
    lang: {
      es: { q: 'La identidad dominicana es ________: una mezcla de tres raíces culturales (taína, africana y española).', answer: ['triétnica', 'tri-étnica', 'mestiza'], explanation: 'La cultura dominicana es producto de la mezcla de tres herencias: taína (indígena), africana (cimarrones y esclavos) y española (colonizadores).' },
      en: { q: 'Dominican identity is ________: a blend of three cultural roots (Taino, African, and Spanish).', answer: ['tri-ethnic', 'triethnic', 'tri ethnic'], explanation: 'Dominican culture is the product of three heritages: Taino (indigenous), African (maroons and enslaved), and Spanish (colonizers).' },
      fr: { q: 'L\'identité dominicaine est ________ : un mélange de trois racines culturelles (taïno, africaine et espagnole).', answer: ['triéthnique', 'tri-ethnique'], explanation: 'La culture dominicaine est le produit de trois héritages : taïno (autochtone), africain (marrons et esclaves) et espagnol (colonisateurs).' }
    }
  },

  {
    id: 'hist-075', type: 'mcq',
    lang: {
      es: { q: 'La palabra "huracán" viene del idioma taíno. ¿Qué otras palabras del español cotidiano vienen del taíno?', options: ['Pizza, chocolate, tomate', 'Hamaca, canoa, tabaco, barbacoa', 'Teléfono, computadora, internet', 'Libro, mesa, silla'], answer: 1, explanation: 'Muchas palabras del español vienen del taíno: hamaca, canoa, tabaco, barbacoa, guayaba, maíz, iguana, y muchas más.' },
      en: { q: 'The word "hurricane" comes from the Taino language. What other everyday English words come from Taino?', options: ['Pizza, chocolate, tomato', 'Hammock, canoe, tobacco, barbecue', 'Telephone, computer, internet', 'Book, table, chair'], answer: 1, explanation: 'Many English words come from Taino: hammock, canoe, tobacco, barbecue, guava, maize, iguana, and many more.' },
      fr: { q: 'Le mot "ouragan" vient de la langue taïno. Quels autres mots du quotidien viennent du taïno ?', options: ['Pizza, chocolat, tomate', 'Hamac, canoë, tabac, barbecue', 'Téléphone, ordinateur, internet', 'Livre, table, chaise'], answer: 1, explanation: 'De nombreux mots viennent du taïno : hamac, canoë, tabac, barbecue, goyave, maïs, iguane, et bien d\'autres.' }
    }
  },

  {
    id: 'hist-076', type: 'tf',
    lang: {
      es: { q: 'Los taínos desaparecieron completamente y no dejaron ninguna huella en la cultura dominicana actual.', answer: false, explanation: 'Los taínos dejaron una huella inmensa: palabras (hamaca, canoa), alimentos (casabe, yuca), técnicas agrícolas, topónimos y genes en la población actual.' },
      en: { q: 'The Tainos completely disappeared and left no trace in current Dominican culture.', answer: false, explanation: 'The Tainos left an immense legacy: words (hammock, canoe), foods (casabe, yuca), farming techniques, place names, and genes in today\'s population.' },
      fr: { q: 'Les Taïnos ont complètement disparu et n\'ont laissé aucune trace dans la culture dominicaine actuelle.', answer: false, explanation: 'Les Taïnos ont laissé un immense héritage : mots (hamac, canoë), aliments (casabe, manioc), techniques agricoles, toponymie et gènes dans la population actuelle.' }
    }
  },

  {
    id: 'hist-077', type: 'match',
    lang: {
      es: { q: 'Conecta cada palabra del español con su origen taíno original:', pairs: [['Hamaca', 'Cama colgante de red'], ['Canoa', 'Embarcación de tronco'], ['Tabaco', 'Planta ceremonial fumada'], ['Barbacoa', 'Parrilla de madera elevada'], ['Huracán', 'Dios taíno de las tormentas']], explanation: 'Decenas de palabras del español cotidiano tienen origen taíno, demostrando cuánto de su cultura sobrevive hoy.' },
      en: { q: 'Match each word with its original Taino meaning:', pairs: [['Hammock', 'Hanging net bed'], ['Canoe', 'Log boat'], ['Tobacco', 'Ceremonial smoked plant'], ['Barbecue', 'Elevated wooden grill'], ['Hurricane', 'Taino storm god']], explanation: 'Dozens of everyday English words have Taino origins, showing how much of their culture survives today.' },
      fr: { q: 'Relie chaque mot à son sens taïno original :', pairs: [['Hamac', 'Lit suspendu en filet'], ['Canoë', 'Embarcation en tronc'], ['Tabac', 'Plante cérémonielle fumée'], ['Barbecue', 'Gril en bois surélevé'], ['Ouragan', 'Dieu taïno des tempêtes']], explanation: 'Des dizaines de mots courants ont des origines taïnos, montrant combien de leur culture survit aujourd\'hui.' }
    }
  },

  {
    id: 'hist-078', type: 'mcq',
    lang: {
      es: { q: '¿Qué material usaban los taínos para hacer sus cemíes? (Pueden ser varios, pero uno era el más común.)', options: ['Metal y cristal', 'Piedra, madera, hueso y concha', 'Plástico y vidrio', 'Oro puro y diamantes'], answer: 1, explanation: 'Los cemíes se hacían de diversos materiales naturales: piedra, madera, hueso, concha, algodón y a veces guanín (aleación de oro/plata/cobre).' },
      en: { q: 'What materials did the Tainos use to make their cemis? (There were several, but one was most common.)', options: ['Metal and crystal', 'Stone, wood, bone, and shell', 'Plastic and glass', 'Pure gold and diamonds'], answer: 1, explanation: 'Cemis were made from various natural materials: stone, wood, bone, shell, cotton, and sometimes guanin (gold/silver/copper alloy).' },
      fr: { q: 'Quels matériaux les Taïnos utilisaient-ils pour fabriquer leurs cemís ? (Plusieurs, mais un était le plus courant.)', options: ['Métal et cristal', 'Pierre, bois, os et coquillage', 'Plastique et verre', 'Or pur et diamants'], answer: 1, explanation: 'Les cemís étaient fabriqués en divers matériaux naturels : pierre, bois, os, coquillage, coton et parfois guanín (alliage or/argent/cuivre).' }
    }
  },

  {
    id: 'hist-079', type: 'tf',
    lang: {
      es: { q: 'El guanín era oro puro que los taínos importaban de Europa.', answer: false, explanation: 'El guanín era una aleación de oro, plata y cobre que los taínos ya conocían antes de la llegada de los europeos. No venía de Europa.' },
      en: { q: 'Guanin was pure gold that the Tainos imported from Europe.', answer: false, explanation: 'Guanin was an alloy of gold, silver, and copper that the Tainos already knew before the Europeans arrived. It did not come from Europe.' },
      fr: { q: 'Le guanín était de l\'or pur que les Taïnos importaient d\'Europe.', answer: false, explanation: 'Le guanín était un alliage d\'or, d\'argent et de cuivre que les Taïnos connaissaient déjà avant l\'arrivée des Européens. Il ne venait pas d\'Europe.' }
    }
  },

  {
    id: 'hist-080', type: 'mcq',
    lang: {
      es: { q: 'Si pudieras viajar en el tiempo a 1492, ¿cuántos cacicazgos principales encontrarías en La Hispaniola?', options: ['3', '5', '7', '10'], answer: 1, explanation: 'La Hispaniola tenía 5 cacicazgos principales: Marién (noroeste), Maguá (noreste), Maguana (centro), Xaragua (suroeste) e Higüey (sureste).' },
      en: { q: 'If you could time-travel to 1492, how many main cacicazgos would you find in Hispaniola?', options: ['3', '5', '7', '10'], answer: 1, explanation: 'Hispaniola had 5 main cacicazgos: Marien (northwest), Magua (northeast), Maguana (center), Xaragua (southwest), and Higuey (southeast).' },
      fr: { q: 'Si tu pouvais voyager dans le temps jusqu\'en 1492, combien de cacicazgos principaux trouverais-tu à Hispaniola ?', options: ['3', '5', '7', '10'], answer: 1, explanation: 'Hispaniola avait 5 cacicazgos principaux : Marién (nord-ouest), Maguá (nord-est), Maguana (centre), Xaragua (sud-ouest) et Higüey (sud-est).' }
    }
  },

  // ---- 81-90: Deeper history & culture ----

  {
    id: 'hist-081', type: 'mcq',
    lang: {
      es: { q: 'Los taínos tenían un ritual donde un líder espiritual (behique) inhalaba polvo de cohoba para comunicarse con los espíritus. ¿Qué usaban para inhalar?', options: ['Una pipa de agua', 'Un inhalador de cerámica o madera en forma de Y', 'Una máscara de gas', 'Un telescopio'], answer: 1, explanation: 'Los behiques usaban inhaladores de cerámica o madera en forma de Y para aspirar el polvo de cohoba durante rituales de comunicación espiritual.' },
      en: { q: 'The Tainos had a ritual where a spiritual leader (behique) inhaled cohoba powder to communicate with spirits. What did they use to inhale?', options: ['A water pipe', 'A Y-shaped ceramic or wood inhaler', 'A gas mask', 'A telescope'], answer: 1, explanation: 'Behiques used Y-shaped ceramic or wooden inhalers to sniff cohoba powder during spiritual communication rituals.' },
      fr: { q: 'Les Taïnos avaient un rituel où un chef spirituel (behique) inhalait de la poudre de cohoba pour communiquer avec les esprits. Qu\'utilisaient-ils ?', options: ['Une pipe à eau', 'Un inhalateur en céramique ou bois en forme de Y', 'Un masque à gaz', 'Un télescope'], answer: 1, explanation: 'Les behiques utilisaient des inhalateurs en céramique ou bois en forme de Y pour aspirer la poudre de cohoba durant les rituels de communication spirituelle.' }
    }
  },

  {
    id: 'hist-082', type: 'fill',
    lang: {
      es: { q: 'El líder espiritual taíno se llamaba ________. Era como el Dumbledore de la aldea: sabio, curandero y sacerdote.', answer: ['behique', 'buhiti', 'chamán'], explanation: 'El behique (o buhiti) era el chamán taíno: médico, sacerdote y sabio que realizaba rituales de cohoba y curaba enfermedades.' },
      en: { q: 'The Taino spiritual leader was called ________. Like the village\'s Dumbledore: wise, healer, and priest.', answer: ['behique', 'buhiti', 'shaman'], explanation: 'The behique (or buhiti) was the Taino shaman: doctor, priest, and wise person who performed cohoba rituals and healed illnesses.' },
      fr: { q: 'Le chef spirituel taïno s\'appelait ________. Comme le Dumbledore du village : sage, guérisseur et prêtre.', answer: ['behique', 'buhiti', 'chamane'], explanation: 'Le behique (ou buhiti) était le chamane taïno : médecin, prêtre et sage qui pratiquait les rituels de cohoba et guérissait les maladies.' }
    }
  },

  {
    id: 'hist-083', type: 'tf',
    lang: {
      es: { q: 'El batú se jugaba en el batey, que era la plaza central de la aldea. Era como el estadio del yucayeque.', answer: true, explanation: 'El batey era la plaza central del yucayeque donde se jugaba batú, se hacían areítos y se tomaban decisiones comunitarias importantes.' },
      en: { q: 'Batu was played in the batey, which was the village\'s central plaza. It was like the yucayeque\'s stadium.', answer: true, explanation: 'The batey was the central plaza where batu was played, areitos were held, and important community decisions were made.' },
      fr: { q: 'Le batú se jouait dans le batey, qui était la place centrale du village. C\'était comme le stade du yucayeque.', answer: true, explanation: 'Le batey était la place centrale du yucayeque où l\'on jouait au batú, organisait les areítos et prenait les décisions communautaires importantes.' }
    }
  },

  {
    id: 'hist-084', type: 'mcq',
    lang: {
      es: { q: 'Los taínos hacían cerámica increíble. ¿Cuál de estas NO era una función de la cerámica taína?', options: ['Cocinar y almacenar alimentos', 'Rituales religiosos', 'Decoración de bohíos', 'Fabricar armas de guerra'], answer: 3, explanation: 'La cerámica taína tenía funciones domésticas (cocina, almacenaje), rituales (cemíes, vasijas ceremoniales) y decorativas, pero no se usaba para armas.' },
      en: { q: 'The Tainos made incredible pottery. Which of these was NOT a function of Taino ceramics?', options: ['Cooking and food storage', 'Religious rituals', 'Bohio decoration', 'Making war weapons'], answer: 3, explanation: 'Taino ceramics had domestic (cooking, storage), ritual (cemis, ceremonial vessels), and decorative functions, but were not used for weapons.' },
      fr: { q: 'Les Taïnos fabriquaient d\'incroyables céramiques. Laquelle de ces fonctions N\'ÉTAIT PAS une fonction de la céramique taïno ?', options: ['Cuisine et stockage d\'aliments', 'Rituels religieux', 'Décoration de bohíos', 'Fabrication d\'armes de guerre'], answer: 3, explanation: 'La céramique taïno avait des fonctions domestiques (cuisine, stockage), rituelles (cemís, vases cérémoniels) et décoratives, mais pas d\'armes.' }
    }
  },

  {
    id: 'hist-085', type: 'match',
    lang: {
      es: { q: 'Relaciona cada alimento con su origen, como un master chef histórico:', pairs: [['Casabe', 'Yuca (taíno)'], ['Mangú', 'Plátano (africano)'], ['Pan de trigo', 'Trigo (español)'], ['Ají', 'Pimiento picante (taíno)'], ['Café', 'Grano (africano/árabe)']], explanation: 'La gastronomía dominicana es una fusión de ingredientes y técnicas taínas, africanas y españolas.' },
      en: { q: 'Match each food with its origin, like a historical master chef:', pairs: [['Casabe', 'Yuca (Taino)'], ['Mangu', 'Plantain (African)'], ['Wheat bread', 'Wheat (Spanish)'], ['Aji', 'Hot pepper (Taino)'], ['Coffee', 'Bean (African/Arab)']], explanation: 'Dominican gastronomy is a fusion of Taino, African, and Spanish ingredients and techniques.' },
      fr: { q: 'Relie chaque aliment à son origine, comme un master chef historique :', pairs: [['Casabe', 'Manioc (taïno)'], ['Mangú', 'Banane plantain (africain)'], ['Pain de blé', 'Blé (espagnol)'], ['Ají', 'Piment (taïno)'], ['Café', 'Grain (africain/arabe)']], explanation: 'La gastronomie dominicaine est une fusion d\'ingrédients et techniques taïnos, africaines et espagnoles.' }
    }
  },

  {
    id: 'hist-086', type: 'tf',
    lang: {
      es: { q: 'La pelota del batú era de goma sintética traída de Europa.', answer: false, explanation: 'La pelota del batú era de látex natural, extraído del árbol de caucho americano. Los europeos desconocían el caucho hasta contactar con los pueblos americanos.' },
      en: { q: 'The batu ball was made of synthetic rubber brought from Europe.', answer: false, explanation: 'The batu ball was made of natural latex, extracted from the American rubber tree. Europeans didn\'t know about rubber until contacting American peoples.' },
      fr: { q: 'La balle de batú était en caoutchouc synthétique apporté d\'Europe.', answer: false, explanation: 'La balle de batú était en latex naturel, extrait de l\'arbre à caoutchouc américain. Les Européens ne connaissaient pas le caoutchouc avant le contact avec les peuples américains.' }
    }
  },

  {
    id: 'hist-087', type: 'mcq',
    lang: {
      es: { q: 'Cuando Colón llegó en 1492, estimó que había entre 250,000 y 1 millón de taínos en La Hispaniola. 50 años después, ¿cuántos quedaban aproximadamente?', options: ['Casi los mismos', 'La mitad', 'Unos 500', 'Aumentaron a 2 millones'], answer: 2, explanation: 'La población taína se redujo drásticamente por enfermedades europeas, trabajo forzado y violencia. En 50 años, de cientos de miles a apenas unos cientos.' },
      en: { q: 'When Columbus arrived in 1492, he estimated 250,000 to 1 million Tainos in Hispaniola. 50 years later, about how many remained?', options: ['About the same', 'Half', 'About 500', 'It grew to 2 million'], answer: 2, explanation: 'The Taino population was decimated by European diseases, forced labor, and violence. In 50 years, from hundreds of thousands to barely a few hundred.' },
      fr: { q: 'Quand Colomb est arrivé en 1492, il estimait 250 000 à 1 million de Taïnos à Hispaniola. 50 ans plus tard, combien en restait-il environ ?', options: ['À peu près les mêmes', 'La moitié', 'Environ 500', 'Augmenté à 2 millions'], answer: 2, explanation: 'La population taïno fut décimée par les maladies européennes, le travail forcé et la violence. En 50 ans, de centaines de milliers à peine quelques centaines.' }
    }
  },

  {
    id: 'hist-088', type: 'fill',
    lang: {
      es: { q: 'Los taínos llamaban a la isla donde están RD y Haití "________". Antes de que Colón le cambiara el nombre.', answer: ['Quisqueya', 'Haití', 'Ayiti', 'Bohío'], explanation: 'Los taínos llamaban a la isla Quisqueya ("madre de todas las tierras"), Haití ("tierra montañosa") o Bohío ("hogar"), según la región.' },
      en: { q: 'The Tainos called the island where DR and Haiti are "________". Before Columbus renamed it.', answer: ['Quisqueya', 'Haiti', 'Ayiti', 'Bohio'], explanation: 'The Tainos called the island Quisqueya ("mother of all lands"), Haiti ("mountainous land"), or Bohio ("home"), depending on the region.' },
      fr: { q: 'Les Taïnos appelaient l\'île où se trouvent la RD et Haïti "________". Avant que Colomb ne la rebaptise.', answer: ['Quisqueya', 'Haïti', 'Ayiti', 'Bohío'], explanation: 'Les Taïnos appelaient l\'île Quisqueya ("mère de toutes les terres"), Haïti ("terre montagneuse") ou Bohío ("maison"), selon la région.' }
    }
  },

  {
    id: 'hist-089', type: 'mcq',
    lang: {
      es: { q: 'El naufragio del Santa María en 1492 fue un evento clave. ¿Qué hizo Colón con los restos del barco?', options: ['Lo hundió completamente', 'Construyó el Fuerte Navidad con los restos', 'Lo reparó y siguió navegando', 'Lo vendió a los taínos'], answer: 1, explanation: 'Colón usó los restos del Santa María para construir el Fuerte Navidad (La Navidad), el primer asentamiento europeo en América, con ayuda de Guacanagaríx.' },
      en: { q: 'The wreck of the Santa Maria in 1492 was a key event. What did Columbus do with the ship\'s remains?', options: ['He sank it completely', 'He built Fort Navidad from the remains', 'He repaired it and kept sailing', 'He sold it to the Tainos'], answer: 1, explanation: 'Columbus used the Santa Maria\'s remains to build Fort Navidad (La Navidad), the first European settlement in America, with Guacanagarix\'s help.' },
      fr: { q: 'Le naufrage du Santa María en 1492 fut un événement clé. Qu\'a fait Colomb avec les restes du navire ?', options: ['Il l\'a complètement coulé', 'Il a construit le Fort Navidad avec les restes', 'Il l\'a réparé et a continué à naviguer', 'Il l\'a vendu aux Taïnos'], answer: 1, explanation: 'Colomb utilisa les restes du Santa María pour construire le Fort Navidad (La Navidad), le premier établissement européen en Amérique, avec l\'aide de Guacanagaríx.' }
    }
  },

  {
    id: 'hist-090', type: 'tf',
    lang: {
      es: { q: 'La Zona Colonial de Santo Domingo es Patrimonio de la Humanidad de la UNESCO. ¡Como Hogwarts, pero real y en el Caribe!', answer: true, explanation: 'La Zona Colonial de Santo Domingo fue declarada Patrimonio de la Humanidad por la UNESCO en 1990. Contiene las primeras construcciones europeas de América.' },
      en: { q: 'The Colonial Zone of Santo Domingo is a UNESCO World Heritage Site. Like Hogwarts, but real and in the Caribbean!', answer: true, explanation: 'The Colonial Zone of Santo Domingo was declared a UNESCO World Heritage Site in 1990. It contains the first European buildings in the Americas.' },
      fr: { q: 'La Zone Coloniale de Saint-Domingue est un site du Patrimoine Mondial de l\'UNESCO. Comme Poudlard, mais réel et dans les Caraïbes !', answer: true, explanation: 'La Zone Coloniale de Saint-Domingue a été déclarée Patrimoine Mondial de l\'UNESCO en 1990. Elle contient les premiers bâtiments européens des Amériques.' }
    }
  },

  // ---- 91-100: Mixed review & advanced ----

  {
    id: 'hist-091', type: 'match',
    lang: {
      es: { q: 'Conecta cada resistente histórico con su forma de lucha principal:', pairs: [['Enriquillo', 'Guerrilla y negociación diplomática'], ['Anacaona', 'Resistencia cultural y política'], ['Sebastián Lemba', 'Cimarronaje y palenques'], ['Cotubanamá', 'Resistencia armada directa']], explanation: 'Cada líder encontró su propia forma de resistir la opresión colonial, desde la diplomacia hasta la lucha armada.' },
      en: { q: 'Match each historical resister with their main form of struggle:', pairs: [['Enriquillo', 'Guerrilla warfare and diplomacy'], ['Anacaona', 'Cultural and political resistance'], ['Sebastian Lemba', 'Marronage and palenques'], ['Cotubanama', 'Direct armed resistance']], explanation: 'Each leader found their own way to resist colonial oppression, from diplomacy to armed struggle.' },
      fr: { q: 'Relie chaque résistant historique à sa forme de lutte principale :', pairs: [['Enriquillo', 'Guérilla et négociation diplomatique'], ['Anacaona', 'Résistance culturelle et politique'], ['Sebastián Lemba', 'Marronnage et palenques'], ['Cotubanamá', 'Résistance armée directe']], explanation: 'Chaque leader a trouvé sa propre façon de résister à l\'oppression coloniale, de la diplomatie à la lutte armée.' }
    }
  },

  {
    id: 'hist-092', type: 'mcq',
    lang: {
      es: { q: '¿Por qué es importante que un juego como ArcLycée enseñe sobre la historia taína? Piensa como un personaje de Gravity Falls investigando misterios.', options: ['Solo para sacar buenas notas', 'Para conocer nuestras raíces, proteger el patrimonio y no repetir errores del pasado', 'Para ser mejores en videojuegos', 'No es importante en absoluto'], answer: 1, explanation: 'Conocer nuestra historia nos permite valorar nuestro patrimonio, entender nuestra identidad y trabajar por un futuro más justo.' },
      en: { q: 'Why is it important for a game like ArcLycee to teach Taino history? Think like a Gravity Falls character investigating mysteries.', options: ['Only to get good grades', 'To know our roots, protect heritage, and not repeat past mistakes', 'To be better at videogames', 'It\'s not important at all'], answer: 1, explanation: 'Knowing our history allows us to value our heritage, understand our identity, and work for a more just future.' },
      fr: { q: 'Pourquoi est-il important qu\'un jeu comme ArcLycée enseigne l\'histoire taïno ? Pense comme un personnage de Gravity Falls enquêtant sur des mystères.', options: ['Juste pour avoir de bonnes notes', 'Pour connaître nos racines, protéger le patrimoine et ne pas répéter les erreurs du passé', 'Pour être meilleur aux jeux vidéo', 'Ce n\'est pas important du tout'], answer: 1, explanation: 'Connaître notre histoire nous permet de valoriser notre patrimoine, comprendre notre identité et travailler pour un avenir plus juste.' }
    }
  },

  {
    id: 'hist-093', type: 'tf',
    lang: {
      es: { q: 'En ArcLycée, el combate contra el pez león tiene opciones ecológicas porque el pez león es una especie invasora real en el Caribe.', answer: true, explanation: 'El pez león (Pterois volitans) es una especie invasora real en el Caribe que amenaza los arrecifes. El juego enseña formas reales de combatirlo.' },
      en: { q: 'In ArcLycee, the lionfish combat has ecological options because the lionfish is a real invasive species in the Caribbean.', answer: true, explanation: 'The lionfish (Pterois volitans) is a real invasive species in the Caribbean that threatens reefs. The game teaches real ways to combat it.' },
      fr: { q: 'Dans ArcLycée, le combat contre le poisson-lion a des options écologiques car le poisson-lion est une vraie espèce invasive dans les Caraïbes.', answer: true, explanation: 'Le poisson-lion (Pterois volitans) est une véritable espèce invasive dans les Caraïbes qui menace les récifs. Le jeu enseigne de vraies façons de le combattre.' }
    }
  },

  {
    id: 'hist-094', type: 'fill',
    lang: {
      es: { q: 'El cacique ________ gobernaba Xaragua junto con su hermano Bohechío. Era poetisa y fue ejecutada en 1503.', answer: ['Anacaona', 'Flor de Oro'], explanation: 'Anacaona ("Flor de Oro") fue la cacica de Xaragua tras la muerte de su hermano Bohechío. Fue ejecutada por Ovando en 1503.' },
      en: { q: 'The cacique ________ ruled Xaragua along with her brother Bohechio. She was a poet and was executed in 1503.', answer: ['Anacaona', 'Golden Flower'], explanation: 'Anacaona ("Golden Flower") was the cacica of Xaragua after her brother Bohechio\'s death. She was executed by Ovando in 1503.' },
      fr: { q: 'La cacique ________ gouvernait Xaragua avec son frère Bohechío. C\'était une poétesse et elle fut exécutée en 1503.', answer: ['Anacaona', 'Fleur d\'Or'], explanation: 'Anacaona ("Fleur d\'Or") fut la cacique de Xaragua après la mort de son frère Bohechío. Elle fut exécutée par Ovando en 1503.' }
    }
  },

  {
    id: 'hist-095', type: 'mcq',
    lang: {
      es: { q: 'Imagina que encuentras un cemí en una cueva. ¿Qué deberías hacer según la Ley 318-68?', options: ['Llevártelo a casa como souvenir', 'Venderlo en internet', 'No tocarlo y avisar a las autoridades o a un arqueólogo', 'Ponerlo en tu mochila y donarlo a un museo'], answer: 2, explanation: 'Lo correcto es no tocar el artefacto y avisar a las autoridades. Moverlo destruye su contexto arqueológico y es ilegal.' },
      en: { q: 'Imagine you find a cemi in a cave. What should you do according to Law 318-68?', options: ['Take it home as a souvenir', 'Sell it online', 'Don\'t touch it and notify authorities or an archaeologist', 'Put it in your backpack and donate it to a museum'], answer: 2, explanation: 'The right thing is not to touch the artifact and notify authorities. Moving it destroys its archaeological context and is illegal.' },
      fr: { q: 'Imagine que tu trouves un cemí dans une grotte. Que devrais-tu faire selon la Loi 318-68 ?', options: ['Le ramener chez toi comme souvenir', 'Le vendre sur internet', 'Ne pas le toucher et prévenir les autorités ou un archéologue', 'Le mettre dans ton sac et le donner à un musée'], answer: 2, explanation: 'La bonne chose est de ne pas toucher l\'artefact et de prévenir les autorités. Le déplacer détruit son contexte archéologique et est illégal.' }
    }
  },

  {
    id: 'hist-096', type: 'tf',
    lang: {
      es: { q: 'Bartolomé de las Casas denunció los abusos contra los taínos. Fue como el primer activista de derechos humanos en América.', answer: true, explanation: 'Bartolomé de las Casas fue un fraile dominico que documentó y denunció los horrores de la colonización en su "Brevísima Relación de la Destrucción de las Indias".' },
      en: { q: 'Bartolome de las Casas denounced the abuses against the Tainos. He was like the first human rights activist in the Americas.', answer: true, explanation: 'Bartolome de las Casas was a Dominican friar who documented and denounced the horrors of colonization in his "Short Account of the Destruction of the Indies".' },
      fr: { q: 'Bartolomé de las Casas a dénoncé les abus contre les Taïnos. Il fut comme le premier activiste des droits humains en Amérique.', answer: true, explanation: 'Bartolomé de las Casas fut un frère dominicain qui documenta et dénonça les horreurs de la colonisation dans sa "Très Brève Relation de la Destruction des Indes".' }
    }
  },

  {
    id: 'hist-097', type: 'mcq',
    lang: {
      es: { q: 'ArcLycée tiene múltiples finales, como un juego de Telltale. ¿Qué determina si obtienes el final pacifista?', options: ['Tener mucho oro', 'Resolver todos los combates sin violencia', 'Matar a todos los enemigos', 'Tener todos los compañeros'], answer: 1, explanation: 'El final pacifista requiere completar 8+ nodos del juego y resolver TODOS los combates de forma pacífica (convencimiento, no violencia).' },
      en: { q: 'ArcLycee has multiple endings, like a Telltale game. What determines if you get the pacifist ending?', options: ['Having lots of gold', 'Resolving all combats without violence', 'Killing all enemies', 'Having all companions'], answer: 1, explanation: 'The pacifist ending requires completing 8+ game nodes and resolving ALL combats peacefully (persuasion, not violence).' },
      fr: { q: 'ArcLycée a plusieurs fins, comme un jeu Telltale. Qu\'est-ce qui détermine si tu obtiens la fin pacifiste ?', options: ['Avoir beaucoup d\'or', 'Résoudre tous les combats sans violence', 'Tuer tous les ennemis', 'Avoir tous les compagnons'], answer: 1, explanation: 'La fin pacifiste requiert de compléter 8+ nœuds du jeu et résoudre TOUS les combats pacifiquement (persuasion, pas de violence).' }
    }
  },

  {
    id: 'hist-098', type: 'match',
    lang: {
      es: { q: 'Conecta cada siglo con los eventos más importantes de La Hispaniola:', pairs: [['Siglo XV (1400s)', 'Llegada de Colón, fundación de La Isabela'], ['Siglo XVI (1500s)', 'Rebelión de Enriquillo, cimarrones de Lemba'], ['Antes de 1492', 'Civilización taína en su esplendor'], ['Siglo XXI (2000s)', 'Protección del patrimonio, arqueología moderna']], explanation: 'La historia de La Hispaniola abarca miles de años, desde los taínos hasta la protección moderna del patrimonio.' },
      en: { q: 'Match each century with the most important events of Hispaniola:', pairs: [['15th century (1400s)', 'Columbus arrives, La Isabela founded'], ['16th century (1500s)', 'Enriquillo\'s rebellion, Lemba\'s maroons'], ['Before 1492', 'Taino civilization at its peak'], ['21st century (2000s)', 'Heritage protection, modern archaeology']], explanation: 'Hispaniola\'s history spans thousands of years, from the Tainos to modern heritage protection.' },
      fr: { q: 'Relie chaque siècle aux événements les plus importants d\'Hispaniola :', pairs: [['XVe siècle (1400)', 'Arrivée de Colomb, fondation de La Isabela'], ['XVIe siècle (1500)', 'Rébellion d\'Enriquillo, marrons de Lemba'], ['Avant 1492', 'Civilisation taïno à son apogée'], ['XXIe siècle (2000)', 'Protection du patrimoine, archéologie moderne']], explanation: 'L\'histoire d\'Hispaniola s\'étend sur des milliers d\'années, des Taïnos à la protection moderne du patrimoine.' }
    }
  },

  {
    id: 'hist-099', type: 'tf',
    lang: {
      es: { q: 'Los cocodrilos americanos del Lago Enriquillo son los únicos cocodrilos que viven en agua salada en todo el Caribe insular.', answer: true, explanation: 'Los Crocodylus acutus del Lago Enriquillo son una población única que se ha adaptado a vivir en agua hipersalina, algo raro para esta especie.' },
      en: { q: 'The American crocodiles of Lake Enriquillo are the only crocodiles living in saltwater in the entire insular Caribbean.', answer: true, explanation: 'The Crocodylus acutus of Lake Enriquillo are a unique population adapted to living in hypersaline water, which is rare for this species.' },
      fr: { q: 'Les crocodiles américains du Lac Enriquillo sont les seuls crocodiles vivant en eau salée dans toutes les Caraïbes insulaires.', answer: true, explanation: 'Les Crocodylus acutus du Lac Enriquillo sont une population unique adaptée à vivre en eau hypersaline, ce qui est rare pour cette espèce.' }
    }
  },

  {
    id: 'hist-100', type: 'mcq',
    lang: {
      es: { q: 'Última pregunta, nivel boss final: ¿Cuál es el mensaje principal de ArcLycée sobre la historia dominicana?', options: ['Que el pasado no importa', 'Que solo los europeos hicieron cosas importantes', 'Que nuestro patrimonio triétnico (taíno, africano, español) es valioso y debemos conocerlo y protegerlo', 'Que la arqueología es aburrida'], answer: 2, explanation: 'ArcLycée enseña que la identidad dominicana es una rica fusión de herencias taína, africana y española, y que proteger este patrimonio es responsabilidad de todos.' },
      en: { q: 'Final question, boss fight level: What is ArcLycee\'s main message about Dominican history?', options: ['That the past doesn\'t matter', 'That only Europeans did important things', 'That our tri-ethnic heritage (Taino, African, Spanish) is valuable and we must know and protect it', 'That archaeology is boring'], answer: 2, explanation: 'ArcLycee teaches that Dominican identity is a rich fusion of Taino, African, and Spanish heritages, and that protecting this patrimony is everyone\'s responsibility.' },
      fr: { q: 'Dernière question, niveau boss final : quel est le message principal d\'ArcLycée sur l\'histoire dominicaine ?', options: ['Que le passé n\'a pas d\'importance', 'Que seuls les Européens ont fait des choses importantes', 'Que notre patrimoine triéthnique (taïno, africain, espagnol) est précieux et que nous devons le connaître et le protéger', 'Que l\'archéologie est ennuyeuse'], answer: 2, explanation: 'ArcLycée enseigne que l\'identité dominicaine est une riche fusion d\'héritages taïno, africain et espagnol, et que protéger ce patrimoine est la responsabilité de tous.' }
    }
  }

];
