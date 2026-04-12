// ============================================================
// HISTORY.JS — Banco de 100 preguntas trilingues de Historia
// ============================================================
// Cubre: civilizacion taina, era colonial, cimarrones,
// Enriquillo, patrimonio arqueologico, leyes de proteccion.
// Tono: divertido, referencias pop, pensamiento critico.
// Tipos: tf (verdadero/falso), mcq (opcion multiple),
//        fill (completar), match (emparejar columnas).
// ============================================================

window.ARC_QUESTIONS = window.ARC_QUESTIONS || {};
window.ARC_QUESTIONS.history = [

  // ---- 1-10: Taino civilization basics ----

  {
    id: 'hist-001', type: 'tf',
    lang: {
      es: { q: 'Plot twist nivel Gravity Falls: los tainos llegaron al Caribe alrededor del 3000 a.C., mucho antes que Colon.', answer: true, explanation: 'Los tainos migraron desde Sudamerica y se establecieron en las Antillas miles de anos antes de 1492.' },
      en: { q: 'Gravity Falls-level plot twist: the Tainos arrived in the Caribbean around 3000 BC, way before Columbus.', answer: true, explanation: 'The Tainos migrated from South America and settled in the Antilles thousands of years before 1492.' },
      fr: { q: 'Plot twist digne de Gravity Falls : les Tainos sont arrives aux Caraibes vers 3000 av. J.-C., bien avant Colomb.', answer: true, explanation: 'Les Tainos ont migre depuis l\'Amerique du Sud et se sont installes aux Antilles des milliers d\'annees avant 1492.' }
    }
  },

  {
    id: 'hist-002', type: 'mcq',
    lang: {
      es: { q: 'Si los tainos fueran un clan de One Piece, su base se llamaria... ¿como se llamaban sus aldeas?', options: ['Conucos', 'Yucayeques', 'Bohios', 'Bateys'], answer: 1, explanation: 'Los yucayeques eran las aldeas o comunidades tainas, gobernadas por un cacique.' },
      en: { q: 'If the Tainos were a One Piece crew, their base would be called... what were their villages named?', options: ['Conucos', 'Yucayeques', 'Bohios', 'Bateys'], answer: 1, explanation: 'Yucayeques were the Taino villages or communities, governed by a cacique (chief).' },
      fr: { q: 'Si les Tainos etaient un equipage de One Piece, leur base s\'appellerait... comment nommait-on leurs villages ?', options: ['Conucos', 'Yucayeques', 'Bohios', 'Bateys'], answer: 1, explanation: 'Les yucayeques etaient les villages ou communautes tainos, gouvernes par un cacique.' }
    }
  },

  {
    id: 'hist-003', type: 'fill',
    lang: {
      es: { q: 'Los tainos hacian pan sin trigo, nivel de creatividad Percy Jackson. ¿Como se llama ese pan hecho de yuca?', answer: ['casabe', 'cazabe', 'Casabe', 'Cazabe'], explanation: 'El casabe es un pan plano hecho de harina de yuca (mandioca), alimento basico taino que aun se come en RD.' },
      en: { q: 'The Tainos made bread without wheat, Percy Jackson-level creativity. What is that yuca bread called?', answer: ['casabe', 'cazabe', 'cassava bread', 'Casabe'], explanation: 'Casabe is a flatbread made from yuca (cassava) flour, a Taino staple food still eaten in the DR today.' },
      fr: { q: 'Les Tainos faisaient du pain sans ble, creativite niveau Percy Jackson. Comment s\'appelle ce pain de manioc ?', answer: ['casabe', 'cazabe', 'cassave', 'Casabe'], explanation: 'Le casabe est un pain plat fait de farine de manioc, aliment de base taino encore consomme en RD.' }
    }
  },

  {
    id: 'hist-004', type: 'mcq',
    lang: {
      es: { q: 'Un bohio taino era como la Batcueva pero tropical. ¿Que era exactamente?', options: ['Un templo religioso', 'Una vivienda redonda de madera y paja', 'Un barco de guerra', 'Una plaza para jugar batu'], answer: 1, explanation: 'Los bohios eran las viviendas tipicas tainas: estructuras circulares de madera con techo de paja.' },
      en: { q: 'A Taino bohio was like the Batcave but tropical. What was it exactly?', options: ['A religious temple', 'A round dwelling made of wood and thatch', 'A warship', 'A plaza for playing batu'], answer: 1, explanation: 'Bohios were typical Taino dwellings: circular wooden structures with thatched roofs.' },
      fr: { q: 'Un bohio taino, c\'etait comme la Batcave mais tropicale. Qu\'est-ce que c\'etait exactement ?', options: ['Un temple religieux', 'Une habitation ronde en bois et paille', 'Un navire de guerre', 'Une place pour jouer au batu'], answer: 1, explanation: 'Les bohios etaient les habitations typiques tainos : structures circulaires en bois avec toit de paille.' }
    }
  },

  {
    id: 'hist-005', type: 'tf',
    lang: {
      es: { q: 'Los cemies eran como los Horrocruxes de Harry Potter: objetos donde vivia un espiritu. ¿Verdad o cuento?', answer: true, explanation: 'Los cemies eran figuras rituales que representaban espiritus o deidades tainas. Eran centrales en su religion.' },
      en: { q: 'Cemis were like Harry Potter Horcruxes: objects where a spirit lived. True or tale?', answer: true, explanation: 'Cemis were ritual figures representing Taino spirits or deities. They were central to their religion.' },
      fr: { q: 'Les cemis etaient comme les Horcruxes de Harry Potter : des objets ou residait un esprit. Vrai ou conte ?', answer: true, explanation: 'Les cemis etaient des figures rituelles representant des esprits ou divinites tainos. Ils etaient centraux dans leur religion.' }
    }
  },

  {
    id: 'hist-006', type: 'match',
    lang: {
      es: { q: 'Conecta cada termino taino con su significado, como un puzzle de Adventure Time:', pairs: [['Cacique', 'Jefe de la aldea'], ['Conuco', 'Parcela de cultivo'], ['Batey', 'Plaza central / cancha'], ['Areito', 'Danza ceremonial'], ['Canoa', 'Embarcacion de tronco']], explanation: 'Estos terminos tainos describen aspectos fundamentales de su organizacion social y vida cotidiana.' },
      en: { q: 'Match each Taino term with its meaning, like an Adventure Time puzzle:', pairs: [['Cacique', 'Village chief'], ['Conuco', 'Farming plot'], ['Batey', 'Central plaza / court'], ['Areito', 'Ceremonial dance'], ['Canoa', 'Log boat']], explanation: 'These Taino terms describe fundamental aspects of their social organization and daily life.' },
      fr: { q: 'Relie chaque terme taino a sa signification, comme un puzzle d\'Adventure Time :', pairs: [['Cacique', 'Chef du village'], ['Conuco', 'Parcelle de culture'], ['Batey', 'Place centrale / terrain'], ['Areito', 'Danse ceremonielle'], ['Canoa', 'Embarcation en tronc']], explanation: 'Ces termes tainos decrivent des aspects fondamentaux de leur organisation sociale et vie quotidienne.' }
    }
  },

  {
    id: 'hist-007', type: 'mcq',
    lang: {
      es: { q: 'El batu era el deporte taino, como el Quidditch pero sin escobas voladoras. ¿Con que parte del cuerpo golpeaban la pelota principalmente?', options: ['Las manos', 'La cabeza', 'La cadera', 'Los pies'], answer: 2, explanation: 'En el batu, los jugadores golpeaban la pelota de goma principalmente con la cadera, aunque tambien usaban hombros y rodillas.' },
      en: { q: 'Batu was the Taino sport, like Quidditch but without flying brooms. Which body part did they mainly use to hit the ball?', options: ['Hands', 'Head', 'Hips', 'Feet'], answer: 2, explanation: 'In batu, players hit the rubber ball mainly with their hips, though they also used shoulders and knees.' },
      fr: { q: 'Le batu etait le sport taino, comme le Quidditch mais sans balais volants. Avec quelle partie du corps frappaient-ils la balle principalement ?', options: ['Les mains', 'La tete', 'Les hanches', 'Les pieds'], answer: 2, explanation: 'Au batu, les joueurs frappaient la balle en caoutchouc principalement avec les hanches, mais aussi les epaules et genoux.' }
    }
  },

  {
    id: 'hist-008', type: 'tf',
    lang: {
      es: { q: 'Los petroglifos son como los memes de los tainos: imagenes talladas en piedra para comunicar ideas. ¿Los tainos tallaban petroglifos en cuevas?', answer: true, explanation: 'Los tainos tallaron miles de petroglifos en cuevas y rocas por todo el Caribe. Son su forma de arte y comunicacion mas duradera.' },
      en: { q: 'Petroglyphs are like the Tainos\' memes: images carved in stone to communicate ideas. Did the Tainos carve petroglyphs in caves?', answer: true, explanation: 'The Tainos carved thousands of petroglyphs in caves and rocks throughout the Caribbean. They are their most enduring form of art.' },
      fr: { q: 'Les petroglyphes sont comme les memes des Tainos : des images gravees dans la pierre pour communiquer. Les Tainos gravaient-ils des petroglyphes dans des grottes ?', answer: true, explanation: 'Les Tainos ont grave des milliers de petroglyphes dans des grottes et rochers a travers les Caraibes. C\'est leur forme d\'art la plus durable.' }
    }
  },

  {
    id: 'hist-009', type: 'fill',
    lang: {
      es: { q: 'Como Finn y Jake tienen su casa del arbol, los tainos tenian la casa del cacique, mas grande que un bohio. ¿Como se llamaba?', answer: ['caney', 'Caney', 'el caney'], explanation: 'El caney era la vivienda del cacique, mas grande y rectangular, a diferencia de los bohios circulares del resto de la comunidad.' },
      en: { q: 'Like Finn and Jake have their treehouse, the Taino chief had a bigger house than a bohio. What was it called?', answer: ['caney', 'Caney', 'the caney'], explanation: 'The caney was the chief\'s dwelling, larger and rectangular, unlike the circular bohios of the rest of the community.' },
      fr: { q: 'Comme Finn et Jake ont leur cabane dans l\'arbre, le chef taino avait une maison plus grande qu\'un bohio. Comment s\'appelait-elle ?', answer: ['caney', 'Caney', 'le caney'], explanation: 'Le caney etait l\'habitation du cacique, plus grande et rectangulaire, contrairement aux bohios circulaires du reste de la communaute.' }
    }
  },

  {
    id: 'hist-010', type: 'mcq',
    lang: {
      es: { q: 'Los tainos viajaban entre islas como piratas del Caribe (pero sin Johnny Depp). ¿Que usaban para navegar?', options: ['Veleros europeos', 'Canoas talladas de un solo tronco', 'Balsas de bambu', 'Tablas de surf gigantes'], answer: 1, explanation: 'Los tainos construian canoas tallando un solo tronco de arbol. Algunas podian llevar hasta 100 personas.' },
      en: { q: 'The Tainos traveled between islands like Pirates of the Caribbean (minus Johnny Depp). What did they use to navigate?', options: ['European sailboats', 'Canoes carved from a single log', 'Bamboo rafts', 'Giant surfboards'], answer: 1, explanation: 'The Tainos built canoes by carving a single tree trunk. Some could carry up to 100 people.' },
      fr: { q: 'Les Tainos voyageaient entre les iles comme des Pirates des Caraibes (sans Johnny Depp). Qu\'utilisaient-ils pour naviguer ?', options: ['Des voiliers europeens', 'Des canots tailles dans un seul tronc', 'Des radeaux en bambou', 'Des planches de surf geantes'], answer: 1, explanation: 'Les Tainos construisaient des canots en taillant un seul tronc d\'arbre. Certains pouvaient transporter jusqu\'a 100 personnes.' }
    }
  },

  // ---- 11-20: Colonial era & La Isabela ----

  {
    id: 'hist-011', type: 'mcq',
    lang: {
      es: { q: 'Cristobal Colon fundo la primera ciudad europea en America, como Luffy plantando su bandera. ¿En que ano se fundo La Isabela?', options: ['1492', '1494', '1500', '1502'], answer: 1, explanation: 'La Isabela fue fundada en 1494 en la costa norte de La Hispaniola. Fue la primera ciudad europea permanente en el Nuevo Mundo.' },
      en: { q: 'Columbus founded the first European city in America, like Luffy planting his flag. What year was La Isabela founded?', options: ['1492', '1494', '1500', '1502'], answer: 1, explanation: 'La Isabela was founded in 1494 on the north coast of Hispaniola. It was the first permanent European city in the New World.' },
      fr: { q: 'Colomb a fonde la premiere ville europeenne en Amerique, comme Luffy plantant son drapeau. En quelle annee La Isabela a-t-elle ete fondee ?', options: ['1492', '1494', '1500', '1502'], answer: 1, explanation: 'La Isabela a ete fondee en 1494 sur la cote nord d\'Hispaniola. C\'etait la premiere ville europeenne permanente du Nouveau Monde.' }
    }
  },

  {
    id: 'hist-012', type: 'tf',
    lang: {
      es: { q: 'Como el Gobierno Mundial de One Piece tiene su sede en Mariejois, los espanoles tenian La Isabela como su primera capital en America.', answer: true, explanation: 'La Isabela fue efectivamente la primera capital europea en las Americas, aunque fue abandonada pocos anos despues por Santo Domingo.' },
      en: { q: 'Like the World Government in One Piece has Mariejois, the Spanish had La Isabela as their first capital in the Americas.', answer: true, explanation: 'La Isabela was indeed the first European capital in the Americas, though it was abandoned a few years later for Santo Domingo.' },
      fr: { q: 'Comme le Gouvernement Mondial de One Piece a Mariejois, les Espagnols avaient La Isabela comme premiere capitale en Amerique.', answer: true, explanation: 'La Isabela fut effectivement la premiere capitale europeenne des Ameriques, bien qu\'elle fut abandonnee quelques annees plus tard pour Santo Domingo.' }
    }
  },

  {
    id: 'hist-013', type: 'mcq',
    lang: {
      es: { q: '¿Donde esta ubicada La Isabela? Pista: no es Wakanda.', options: ['Costa sur de Cuba', 'Costa norte de La Hispaniola', 'Costa este de Puerto Rico', 'Costa oeste de Jamaica'], answer: 1, explanation: 'La Isabela se encuentra en la costa norte de la isla La Hispaniola, en lo que hoy es la provincia de Puerto Plata, Republica Dominicana.' },
      en: { q: 'Where is La Isabela located? Hint: it\'s not Wakanda.', options: ['South coast of Cuba', 'North coast of Hispaniola', 'East coast of Puerto Rico', 'West coast of Jamaica'], answer: 1, explanation: 'La Isabela is on the north coast of Hispaniola, in what is now the province of Puerto Plata, Dominican Republic.' },
      fr: { q: 'Ou se trouve La Isabela ? Indice : ce n\'est pas le Wakanda.', options: ['Cote sud de Cuba', 'Cote nord d\'Hispaniola', 'Cote est de Porto Rico', 'Cote ouest de la Jamaique'], answer: 1, explanation: 'La Isabela se trouve sur la cote nord d\'Hispaniola, dans l\'actuelle province de Puerto Plata, Republique dominicaine.' }
    }
  },

  {
    id: 'hist-014', type: 'tf',
    lang: {
      es: { q: 'Colon llego a America en 1492. ¿Pero sabes que? No fue el primer humano en pisar estas tierras. Los tainos ya llevaban miles de anos alli.', answer: true, explanation: 'Correcto. Colon llego en 1492, pero los pueblos indigenas ya habitaban el Caribe desde hace unos 5000 anos.' },
      en: { q: 'Columbus arrived in America in 1492. But guess what? He wasn\'t the first human to set foot there. The Tainos had been there for thousands of years.', answer: true, explanation: 'Correct. Columbus arrived in 1492, but indigenous peoples had been living in the Caribbean for about 5000 years.' },
      fr: { q: 'Colomb est arrive en Amerique en 1492. Mais devinez quoi ? Il n\'etait pas le premier humain a y poser le pied. Les Tainos y vivaient depuis des milliers d\'annees.', answer: true, explanation: 'Correct. Colomb est arrive en 1492, mais les peuples autochtones habitaient les Caraibes depuis environ 5000 ans.' }
    }
  },

  {
    id: 'hist-015', type: 'fill',
    lang: {
      es: { q: 'Colon llamo a la isla donde estan RD y Haiti "La ________". Suena a nombre de telenovela, pero es real.', answer: ['Hispaniola', 'Espanola', 'hispaniola', 'espanola'], explanation: 'Colon bautizo la isla como "La Espanola" (Hispaniola en latin), que hoy comparten Republica Dominicana y Haiti.' },
      en: { q: 'Columbus named the island where DR and Haiti are "La ________". Sounds like a soap opera, but it\'s real.', answer: ['Hispaniola', 'Espanola', 'hispaniola', 'espanola'], explanation: 'Columbus named the island "La Espanola" (Hispaniola in Latin), today shared by the Dominican Republic and Haiti.' },
      fr: { q: 'Colomb a nomme l\'ile ou se trouvent la RD et Haiti "La ________". On dirait un titre de telenovela, mais c\'est reel.', answer: ['Hispaniola', 'Espanola', 'hispaniola', 'espanola'], explanation: 'Colomb a baptise l\'ile "La Espanola" (Hispaniola en latin), aujourd\'hui partagee entre la Republique dominicaine et Haiti.' }
    }
  },

  {
    id: 'hist-016', type: 'mcq',
    lang: {
      es: { q: 'Fray Ramon Pane fue el primer europeo en escribir sobre la cultura taina. Era como el cronista oficial, estilo Usopp contando historias. ¿Que escribio?', options: ['Un libro de recetas tainas', 'La Relacion acerca de las Antiguedades de los Indios', 'Un mapa del tesoro', 'Una guia turistica del Caribe'], answer: 1, explanation: 'Fray Ramon Pane escribio la primera cronica etnografica de America, documentando las creencias y costumbres tainas.' },
      en: { q: 'Fray Ramon Pane was the first European to write about Taino culture. He was like the official chronicler, Usopp-style storytelling. What did he write?', options: ['A Taino recipe book', 'An Account of the Antiquities of the Indians', 'A treasure map', 'A Caribbean travel guide'], answer: 1, explanation: 'Fray Ramon Pane wrote the first ethnographic chronicle of the Americas, documenting Taino beliefs and customs.' },
      fr: { q: 'Fray Ramon Pane fut le premier Europeen a ecrire sur la culture taino. C\'etait le chroniqueur officiel, style Usopp. Qu\'a-t-il ecrit ?', options: ['Un livre de recettes tainos', 'Une Relation sur les Antiquites des Indiens', 'Une carte au tresor', 'Un guide touristique des Caraibes'], answer: 1, explanation: 'Fray Ramon Pane a ecrit la premiere chronique ethnographique des Ameriques, documentant les croyances et coutumes tainos.' }
    }
  },

  {
    id: 'hist-017', type: 'tf',
    lang: {
      es: { q: 'La Isabela fue un exito total y se convirtio en una gran metropolis. Spoiler: no, no lo fue.', answer: false, explanation: 'La Isabela fracaso. Enfermedades, hambre y conflictos la hicieron insostenible. Fue abandonada y reemplazada por Santo Domingo.' },
      en: { q: 'La Isabela was a total success and became a great metropolis. Spoiler: no, it did not.', answer: false, explanation: 'La Isabela failed. Disease, famine, and conflicts made it unsustainable. It was abandoned and replaced by Santo Domingo.' },
      fr: { q: 'La Isabela fut un succes total et devint une grande metropole. Spoiler : non, ce ne fut pas le cas.', answer: false, explanation: 'La Isabela a echoue. Maladies, famines et conflits l\'ont rendue insoutenable. Elle fut abandonnee et remplacee par Santo Domingo.' }
    }
  },

  {
    id: 'hist-018', type: 'match',
    lang: {
      es: { q: 'Conecta cada evento colonial con su fecha, como si ordenaras una timeline de Marvel:', pairs: [['Llegada de Colon', '1492'], ['Fundacion de La Isabela', '1494'], ['Fundacion de Santo Domingo', '1498'], ['Rebelion de Enriquillo', '1519']], explanation: 'Estos eventos marcan los primeros 30 anos de la colonizacion espanola en La Hispaniola.' },
      en: { q: 'Match each colonial event with its date, like organizing a Marvel timeline:', pairs: [['Columbus arrives', '1492'], ['La Isabela founded', '1494'], ['Santo Domingo founded', '1498'], ['Enriquillo\'s rebellion', '1519']], explanation: 'These events mark the first 30 years of Spanish colonization of Hispaniola.' },
      fr: { q: 'Relie chaque evenement colonial a sa date, comme pour organiser une timeline Marvel :', pairs: [['Arrivee de Colomb', '1492'], ['Fondation de La Isabela', '1494'], ['Fondation de Santo Domingo', '1498'], ['Rebellion d\'Enriquillo', '1519']], explanation: 'Ces evenements marquent les 30 premieres annees de la colonisation espagnole d\'Hispaniola.' }
    }
  },

  {
    id: 'hist-019', type: 'mcq',
    lang: {
      es: { q: 'Los espanoles obligaron a los tainos a trabajar en minas de oro. Este sistema de trabajo forzado se llamaba...', options: ['Encomienda', 'Hacienda', 'Yucayeque', 'Bohio'], answer: 0, explanation: 'La encomienda era un sistema colonial donde los indigenas eran "encomendados" a un espanol para trabajar, basicamente esclavitud disfrazada.' },
      en: { q: 'The Spanish forced the Tainos to work in gold mines. This forced labor system was called...', options: ['Encomienda', 'Hacienda', 'Yucayeque', 'Bohio'], answer: 0, explanation: 'The encomienda was a colonial system where indigenous people were "entrusted" to a Spaniard for labor, basically disguised slavery.' },
      fr: { q: 'Les Espagnols ont force les Tainos a travailler dans les mines d\'or. Ce systeme de travail force s\'appelait...', options: ['Encomienda', 'Hacienda', 'Yucayeque', 'Bohio'], answer: 0, explanation: 'L\'encomienda etait un systeme colonial ou les autochtones etaient "confies" a un Espagnol pour travailler, essentiellement de l\'esclavage deguise.' }
    }
  },

  {
    id: 'hist-020', type: 'tf',
    lang: {
      es: { q: 'Los cemies tainos eran de oro puro, como el tesoro de Smaug en El Hobbit.', answer: false, explanation: 'Los cemies no eran de oro puro. Tenian detalles de guanin, una aleacion de oro, plata y cobre. Muchos eran de piedra, madera o concha.' },
      en: { q: 'Taino cemis were made of pure gold, like Smaug\'s treasure in The Hobbit.', answer: false, explanation: 'Cemis were not pure gold. They had details of guanin, an alloy of gold, silver, and copper. Many were made of stone, wood, or shell.' },
      fr: { q: 'Les cemis tainos etaient en or pur, comme le tresor de Smaug dans Le Hobbit.', answer: false, explanation: 'Les cemis n\'etaient pas en or pur. Ils avaient des details en guanin, un alliage d\'or, d\'argent et de cuivre. Beaucoup etaient en pierre, bois ou coquillage.' }
    }
  },

  // ---- 21-30: Enriquillo's rebellion ----

  {
    id: 'hist-021', type: 'mcq',
    lang: {
      es: { q: 'Si Enriquillo fuera un personaje de Marvel, seria Resistencia-Man. ¿Cuantos anos duro su rebelion contra los espanoles?', options: ['5 anos', '10 anos', '14 anos', '20 anos'], answer: 2, explanation: 'La rebelion de Enriquillo duro 14 anos, de 1519 a 1533. Fue la primera revuelta indigena exitosa en America.' },
      en: { q: 'If Enriquillo were a Marvel character, he\'d be Resistance-Man. How many years did his rebellion against the Spanish last?', options: ['5 years', '10 years', '14 years', '20 years'], answer: 2, explanation: 'Enriquillo\'s rebellion lasted 14 years, from 1519 to 1533. It was the first successful indigenous revolt in the Americas.' },
      fr: { q: 'Si Enriquillo etait un personnage Marvel, ce serait Resistance-Man. Combien d\'annees a dure sa rebellion contre les Espagnols ?', options: ['5 ans', '10 ans', '14 ans', '20 ans'], answer: 2, explanation: 'La rebellion d\'Enriquillo a dure 14 ans, de 1519 a 1533. Ce fut la premiere revolte indigene reussie en Amerique.' }
    }
  },

  {
    id: 'hist-022', type: 'tf',
    lang: {
      es: { q: 'Como Luffy declarandole la guerra al Gobierno Mundial, Enriquillo lucho contra el Imperio Espanol durante 14 anos y logro un tratado de paz.', answer: true, explanation: 'Enriquillo resistio desde las montanas de Bahoruco y en 1533 firmo un tratado de paz con el emperador Carlos V.' },
      en: { q: 'Like Luffy declaring war on the World Government, Enriquillo fought the Spanish Empire for 14 years and achieved a peace treaty.', answer: true, explanation: 'Enriquillo resisted from the Bahoruco mountains and in 1533 signed a peace treaty with Emperor Charles V.' },
      fr: { q: 'Comme Luffy declarant la guerre au Gouvernement Mondial, Enriquillo a combattu l\'Empire espagnol pendant 14 ans et obtenu un traite de paix.', answer: true, explanation: 'Enriquillo a resiste depuis les montagnes de Bahoruco et en 1533 a signe un traite de paix avec l\'empereur Charles Quint.' }
    }
  },

  {
    id: 'hist-023', type: 'fill',
    lang: {
      es: { q: 'Enriquillo se refugio en las montanas de ________, como Batman en su cueva, pero en el suroeste de La Hispaniola.', answer: ['Bahoruco', 'bahoruco', 'Sierra de Bahoruco', 'sierra de Bahoruco'], explanation: 'La Sierra de Bahoruco fue el refugio natural de Enriquillo, desde donde resistio 14 anos contra los espanoles.' },
      en: { q: 'Enriquillo took refuge in the ________ mountains, like Batman in his cave, but in southwestern Hispaniola.', answer: ['Bahoruco', 'bahoruco', 'Sierra de Bahoruco'], explanation: 'The Sierra de Bahoruco was Enriquillo\'s natural refuge, from where he resisted 14 years against the Spanish.' },
      fr: { q: 'Enriquillo s\'est refugie dans les montagnes de ________, comme Batman dans sa grotte, mais au sud-ouest d\'Hispaniola.', answer: ['Bahoruco', 'bahoruco', 'Sierra de Bahoruco'], explanation: 'La Sierra de Bahoruco fut le refuge naturel d\'Enriquillo, d\'ou il a resiste 14 ans contre les Espagnols.' }
    }
  },

  {
    id: 'hist-024', type: 'mcq',
    lang: {
      es: { q: 'Enriquillo firmo un tratado de paz con un emperador muy poderoso. ¿Con cual? Pista: gobernaba medio mundo.', options: ['Felipe II', 'Carlos V', 'Fernando el Catolico', 'Napoleon'], answer: 1, explanation: 'Enriquillo firmo la paz con el emperador Carlos V (Carlos I de Espana), quien gobernaba un imperio donde "nunca se ponia el sol".' },
      en: { q: 'Enriquillo signed a peace treaty with a very powerful emperor. Which one? Hint: he ruled half the world.', options: ['Philip II', 'Charles V', 'Ferdinand the Catholic', 'Napoleon'], answer: 1, explanation: 'Enriquillo signed peace with Emperor Charles V (Charles I of Spain), who ruled an empire where "the sun never set".' },
      fr: { q: 'Enriquillo a signe un traite de paix avec un empereur tres puissant. Lequel ? Indice : il gouvernait la moitie du monde.', options: ['Philippe II', 'Charles Quint', 'Ferdinand le Catholique', 'Napoleon'], answer: 1, explanation: 'Enriquillo a signe la paix avec l\'empereur Charles Quint (Charles Ier d\'Espagne), qui regnait sur un empire ou "le soleil ne se couchait jamais".' }
    }
  },

  {
    id: 'hist-025', type: 'tf',
    lang: {
      es: { q: 'Mencia, la esposa de Enriquillo, fue educada por los frailes espanoles. Era como Hermione: lista y criada entre los "enemigos".', answer: true, explanation: 'Mencia fue educada por frailes franciscanos. Al casarse con Enriquillo, ambos usaron su educacion espanola para negociar mejor con la Corona.' },
      en: { q: 'Mencia, Enriquillo\'s wife, was educated by Spanish friars. She was like Hermione: smart and raised among the "enemies".', answer: true, explanation: 'Mencia was educated by Franciscan friars. When she married Enriquillo, both used their Spanish education to negotiate better with the Crown.' },
      fr: { q: 'Mencia, l\'epouse d\'Enriquillo, fut eduquee par les freres espagnols. C\'etait comme Hermione : intelligente et elevee parmi les "ennemis".', answer: true, explanation: 'Mencia fut eduquee par des freres franciscains. En epousant Enriquillo, tous deux utiliserent leur education espagnole pour mieux negocier avec la Couronne.' }
    }
  },

  {
    id: 'hist-026', type: 'mcq',
    lang: {
      es: { q: 'El Lago Enriquillo lleva el nombre del cacique rebelde. ¿Que tiene de especial este lago? Es como el Mar Muerto, pero caribeno.', options: ['Es el mas profundo del Caribe', 'Esta 40 metros bajo el nivel del mar y es hipersalino', 'Tiene aguas termales', 'Es artificial'], answer: 1, explanation: 'El Lago Enriquillo esta a 40 metros bajo el nivel del mar y es hipersalino. Es el lago mas bajo del Caribe y alberga cocodrilos americanos.' },
      en: { q: 'Lake Enriquillo is named after the rebel cacique. What\'s special about this lake? It\'s like the Dead Sea, but Caribbean.', options: ['It\'s the deepest in the Caribbean', 'It\'s 40m below sea level and hypersaline', 'It has hot springs', 'It\'s artificial'], answer: 1, explanation: 'Lake Enriquillo is 40 meters below sea level and hypersaline. It\'s the lowest lake in the Caribbean and home to American crocodiles.' },
      fr: { q: 'Le Lac Enriquillo porte le nom du cacique rebelle. Qu\'a-t-il de special ? C\'est comme la Mer Morte, mais caribeen.', options: ['C\'est le plus profond des Caraibes', 'Il est a 40m sous le niveau de la mer et hypersalin', 'Il a des sources thermales', 'Il est artificiel'], answer: 1, explanation: 'Le Lac Enriquillo est a 40 metres sous le niveau de la mer et hypersalin. C\'est le lac le plus bas des Caraibes, abritant des crocodiles americains.' }
    }
  },

  {
    id: 'hist-027', type: 'fill',
    lang: {
      es: { q: 'La isla en medio del Lago Enriquillo donde Enriquillo tenia su base se llama Isla ________. Los tainos la llamaban Guarizacca.', answer: ['Cabritos', 'cabritos', 'de los Cabritos'], explanation: 'La Isla Cabritos (Guarizacca en taino) esta en el centro del Lago Enriquillo y es hoy un parque nacional con fauna endemica.' },
      en: { q: 'The island in the middle of Lake Enriquillo where Enriquillo had his base is called ________ Island. The Tainos called it Guarizacca.', answer: ['Cabritos', 'cabritos'], explanation: 'Cabritos Island (Guarizacca in Taino) is in the center of Lake Enriquillo and is now a national park with endemic wildlife.' },
      fr: { q: 'L\'ile au milieu du Lac Enriquillo ou Enriquillo avait sa base s\'appelle Isla ________. Les Tainos l\'appelaient Guarizacca.', answer: ['Cabritos', 'cabritos', 'de los Cabritos'], explanation: 'L\'Isla Cabritos (Guarizacca en taino) se trouve au centre du Lac Enriquillo et est aujourd\'hui un parc national avec une faune endemique.' }
    }
  },

  {
    id: 'hist-028', type: 'tf',
    lang: {
      es: { q: 'La rebelion de Enriquillo fue la primera revuelta indigena exitosa en todo el continente americano. Nivel logro desbloqueado.', answer: true, explanation: 'Enriquillo logro algo que ningun otro lider indigena habia conseguido: un tratado de paz formal con la Corona espanola.' },
      en: { q: 'Enriquillo\'s rebellion was the first successful indigenous revolt in all of the Americas. Achievement unlocked.', answer: true, explanation: 'Enriquillo achieved what no other indigenous leader had: a formal peace treaty with the Spanish Crown.' },
      fr: { q: 'La rebellion d\'Enriquillo fut la premiere revolte indigene reussie dans toutes les Ameriques. Succes debloque.', answer: true, explanation: 'Enriquillo a accompli ce qu\'aucun autre leader autochtone n\'avait reussi : un traite de paix formel avec la Couronne espagnole.' }
    }
  },

  {
    id: 'hist-029', type: 'mcq',
    lang: {
      es: { q: 'Enriquillo empezo su rebelion porque un espanol le robo algo muy personal, como un villain origin story. ¿Que paso?', options: ['Le quitaron su cemi sagrado', 'Un encomendero le quito sus tierras y abuso de Mencia', 'Le prohibieron jugar batu', 'Le cobraron impuestos excesivos'], answer: 1, explanation: 'El encomendero Valenzuela le quito sus tierras y abuso de su esposa Mencia. Enriquillo busco justicia legal pero fue ignorado, asi que se rebelo.' },
      en: { q: 'Enriquillo started his rebellion because a Spaniard took something very personal, like a villain origin story. What happened?', options: ['They took his sacred cemi', 'An encomendero took his lands and abused Mencia', 'They banned him from playing batu', 'They charged excessive taxes'], answer: 1, explanation: 'The encomendero Valenzuela took his lands and abused his wife Mencia. Enriquillo sought legal justice but was ignored, so he rebelled.' },
      fr: { q: 'Enriquillo a commence sa rebellion parce qu\'un Espagnol lui a pris quelque chose de tres personnel, comme une origin story de villain. Que s\'est-il passe ?', options: ['On lui a pris son cemi sacre', 'Un encomendero lui a pris ses terres et a abuse de Mencia', 'On lui a interdit de jouer au batu', 'On lui a impose des taxes excessives'], answer: 1, explanation: 'L\'encomendero Valenzuela lui a pris ses terres et a abuse de sa femme Mencia. Enriquillo a cherche justice legalement mais fut ignore, alors il s\'est rebelle.' }
    }
  },

  {
    id: 'hist-030', type: 'match',
    lang: {
      es: { q: 'Conecta cada personaje historico con su descripcion, como si crearas tu equipo de RPG:', pairs: [['Enriquillo', 'Cacique rebelde del Bahoruco'], ['Mencia', 'Esposa educada por frailes'], ['Carlos V', 'Emperador que firmo la paz'], ['Valenzuela', 'Encomendero abusivo']], explanation: 'Estos personajes son clave en la historia de la primera rebelion indigena exitosa de America.' },
      en: { q: 'Match each historical figure with their description, like building your RPG party:', pairs: [['Enriquillo', 'Rebel cacique of Bahoruco'], ['Mencia', 'Wife educated by friars'], ['Charles V', 'Emperor who signed the peace'], ['Valenzuela', 'Abusive encomendero']], explanation: 'These characters are key to the story of the first successful indigenous rebellion in the Americas.' },
      fr: { q: 'Relie chaque personnage historique a sa description, comme pour creer ton equipe de RPG :', pairs: [['Enriquillo', 'Cacique rebelle du Bahoruco'], ['Mencia', 'Epouse eduquee par les freres'], ['Charles Quint', 'Empereur qui signa la paix'], ['Valenzuela', 'Encomendero abusif']], explanation: 'Ces personnages sont essentiels dans l\'histoire de la premiere rebellion indigene reussie des Ameriques.' }
    }
  },

  // ---- 31-40: Sebastian Lemba & maroons ----

  {
    id: 'hist-031', type: 'mcq',
    lang: {
      es: { q: 'Sebastian Lemba lideraba cimarrones como un capitan pirata de One Piece, pero luchaba por la libertad. ¿Que eran los cimarrones?', options: ['Soldados espanoles rebeldes', 'Esclavos africanos que escaparon y formaron comunidades libres', 'Comerciantes tainos', 'Piratas franceses'], answer: 1, explanation: 'Los cimarrones eran personas esclavizadas de origen africano que escapaban y creaban comunidades libres en las montanas.' },
      en: { q: 'Sebastian Lemba led maroons like a One Piece pirate captain, but he fought for freedom. What were the maroons?', options: ['Rebel Spanish soldiers', 'Escaped enslaved Africans who formed free communities', 'Taino merchants', 'French pirates'], answer: 1, explanation: 'Maroons were enslaved people of African origin who escaped and created free communities in the mountains.' },
      fr: { q: 'Sebastian Lemba menait les marrons comme un capitaine pirate de One Piece, mais il luttait pour la liberte. Qu\'etaient les marrons ?', options: ['Des soldats espagnols rebelles', 'Des esclaves africains evades ayant forme des communautes libres', 'Des marchands tainos', 'Des pirates francais'], answer: 1, explanation: 'Les marrons etaient des personnes asservies d\'origine africaine qui s\'evadaient et creaient des communautes libres dans les montagnes.' }
    }
  },

  {
    id: 'hist-032', type: 'tf',
    lang: {
      es: { q: 'El Palenque de Lemba fue la primera comunidad libre de afrodescendientes en America. Como Wakanda, pero real.', answer: true, explanation: 'Se considera que la comunidad cimarrona de Lemba (~1540s) fue una de las primeras comunidades libres de afrodescendientes en el continente.' },
      en: { q: 'Lemba\'s Palenque was the first free Afro-descendant community in the Americas. Like Wakanda, but real.', answer: true, explanation: 'Lemba\'s maroon community (~1540s) is considered one of the first free Afro-descendant communities in the continent.' },
      fr: { q: 'Le Palenque de Lemba fut la premiere communaute libre d\'afro-descendants en Amerique. Comme le Wakanda, mais en vrai.', answer: true, explanation: 'La communaute marronne de Lemba (~1540) est consideree comme l\'une des premieres communautes libres d\'afro-descendants du continent.' }
    }
  },

  {
    id: 'hist-033', type: 'fill',
    lang: {
      es: { q: 'Las comunidades cimarronas se llamaban "________". Eran como bases secretas en las montanas. ¡Nivel Fortress of Solitude!', answer: ['palenques', 'Palenques', 'palenque', 'Palenque'], explanation: 'Los palenques eran asentamientos fortificados donde los cimarrones vivian en libertad, ocultos en las montanas.' },
      en: { q: 'Maroon communities were called "________". They were like secret mountain bases. Fortress of Solitude level!', answer: ['palenques', 'Palenques', 'palenque', 'Palenque'], explanation: 'Palenques were fortified settlements where maroons lived in freedom, hidden in the mountains.' },
      fr: { q: 'Les communautes marronnes s\'appelaient "________". C\'etaient comme des bases secretes en montagne. Niveau Forteresse de Solitude !', answer: ['palenques', 'Palenques', 'palenque', 'Palenque'], explanation: 'Les palenques etaient des etablissements fortifies ou les marrons vivaient en liberte, caches dans les montagnes.' }
    }
  },

  {
    id: 'hist-034', type: 'mcq',
    lang: {
      es: { q: 'Sebastian Lemba resistio a los espanoles durante unos 15 anos. ¿En que decada aproximada lideraba su palenque?', options: ['1490s', '1540s', '1600s', '1750s'], answer: 1, explanation: 'Lemba fue lider cimarron alrededor de la decada de 1540, apenas unas decadas despues de que comenzara la esclavitud africana en La Hispaniola.' },
      en: { q: 'Sebastian Lemba resisted the Spanish for about 15 years. Around which decade did he lead his palenque?', options: ['1490s', '1540s', '1600s', '1750s'], answer: 1, explanation: 'Lemba was a maroon leader around the 1540s, just decades after African slavery began in Hispaniola.' },
      fr: { q: 'Sebastian Lemba a resiste aux Espagnols pendant environ 15 ans. Vers quelle decennie dirigeait-il son palenque ?', options: ['1490', '1540', '1600', '1750'], answer: 1, explanation: 'Lemba etait un chef marron vers les annees 1540, seulement quelques decennies apres le debut de l\'esclavage africain a Hispaniola.' }
    }
  },

  {
    id: 'hist-035', type: 'tf',
    lang: {
      es: { q: 'Los cimarrones solo eran de origen africano. No habia tainos ni mestizos en los palenques.', answer: false, explanation: 'Aunque la mayoria eran africanos, los palenques a veces incluian tainos y mestizos que tambien huian de la opresion espanola.' },
      en: { q: 'Maroons were only of African origin. There were no Tainos or mixed-race people in the palenques.', answer: false, explanation: 'While most were African, palenques sometimes included Tainos and mixed-race people also fleeing Spanish oppression.' },
      fr: { q: 'Les marrons etaient uniquement d\'origine africaine. Il n\'y avait ni Tainos ni metis dans les palenques.', answer: false, explanation: 'Bien que la plupart fussent africains, les palenques incluaient parfois des Tainos et des metis fuyant aussi l\'oppression espagnole.' }
    }
  },

  {
    id: 'hist-036', type: 'mcq',
    lang: {
      es: { q: 'En el juego ArcLycee, el palenque de Lemba esta en las montanas. ¿Que personaje del palenque es herrero y te da un arma?', options: ['Marcos el vigia', 'Kofi el herrero', 'Amara la tamborera', 'Yemaya la curandera'], answer: 1, explanation: 'Kofi el herrero te da el Machete Cimarron (+2 dano) en el Palenque de Lemba del juego.' },
      en: { q: 'In ArcLycee, Lemba\'s palenque is in the mountains. Which character is the blacksmith who gives you a weapon?', options: ['Marcos the lookout', 'Kofi the blacksmith', 'Amara the drummer', 'Yemaya the healer'], answer: 1, explanation: 'Kofi the blacksmith gives you the Maroon Machete (+2 damage) in Lemba\'s Palenque in the game.' },
      fr: { q: 'Dans ArcLycee, le palenque de Lemba est dans les montagnes. Quel personnage est le forgeron qui te donne une arme ?', options: ['Marcos la sentinelle', 'Kofi le forgeron', 'Amara la tambourinaire', 'Yemaya la guerisseuse'], answer: 1, explanation: 'Kofi le forgeron te donne la Machette Marronne (+2 degats) dans le Palenque de Lemba du jeu.' }
    }
  },

  {
    id: 'hist-037', type: 'match',
    lang: {
      es: { q: 'Relaciona cada miembro del palenque con su rol, como un equipo de Avengers cimarrones:', pairs: [['Sebastian Lemba', 'Lider y mentor'], ['Kofi', 'Herrero'], ['Amara', 'Tamborera y musica'], ['Yemaya', 'Curandera'], ['Marcos', 'Vigia y guardian']], explanation: 'El palenque era una comunidad organizada donde cada persona tenia un rol esencial para la supervivencia del grupo.' },
      en: { q: 'Match each palenque member with their role, like a team of maroon Avengers:', pairs: [['Sebastian Lemba', 'Leader and mentor'], ['Kofi', 'Blacksmith'], ['Amara', 'Drummer and musician'], ['Yemaya', 'Healer'], ['Marcos', 'Lookout and guardian']], explanation: 'The palenque was an organized community where each person had an essential role for the group\'s survival.' },
      fr: { q: 'Relie chaque membre du palenque a son role, comme une equipe d\'Avengers marrons :', pairs: [['Sebastian Lemba', 'Chef et mentor'], ['Kofi', 'Forgeron'], ['Amara', 'Tambourinaire et musicienne'], ['Yemaya', 'Guerisseuse'], ['Marcos', 'Sentinelle et gardien']], explanation: 'Le palenque etait une communaute organisee ou chaque personne avait un role essentiel pour la survie du groupe.' }
    }
  },

  {
    id: 'hist-038', type: 'tf',
    lang: {
      es: { q: 'Los tambores eran solo para hacer musica en los palenques. No tenian funcion militar.', answer: false, explanation: 'Los tambores servian para comunicacion a larga distancia, alertas de peligro y coordinacion militar, ademas de musica y ceremonias.' },
      en: { q: 'Drums were only used for music in the palenques. They had no military function.', answer: false, explanation: 'Drums served for long-distance communication, danger alerts, and military coordination, in addition to music and ceremonies.' },
      fr: { q: 'Les tambours ne servaient qu\'a faire de la musique dans les palenques. Ils n\'avaient pas de fonction militaire.', answer: false, explanation: 'Les tambours servaient a la communication longue distance, aux alertes de danger et a la coordination militaire, en plus de la musique et des ceremonies.' }
    }
  },

  {
    id: 'hist-039', type: 'fill',
    lang: {
      es: { q: 'Sebastian ________ fue el lider cimarron mas famoso de La Hispaniola. Su apellido suena a leon, y luchaba como uno.', answer: ['Lemba', 'lemba'], explanation: 'Sebastian Lemba es considerado un heroe de la resistencia afrodescendiente en la Republica Dominicana.' },
      en: { q: 'Sebastian ________ was the most famous maroon leader of Hispaniola. His last name sounds like it could be a lion\'s, and he fought like one.', answer: ['Lemba', 'lemba'], explanation: 'Sebastian Lemba is considered a hero of Afro-descendant resistance in the Dominican Republic.' },
      fr: { q: 'Sebastian ________ fut le chef marron le plus celebre d\'Hispaniola. Son nom de famille ressemble a celui d\'un lion, et il se battait comme tel.', answer: ['Lemba', 'lemba'], explanation: 'Sebastian Lemba est considere comme un heros de la resistance afro-descendante en Republique dominicaine.' }
    }
  },

  {
    id: 'hist-040', type: 'mcq',
    lang: {
      es: { q: 'La herencia africana en RD se ve en la musica, la comida y las tradiciones. ¿Que instrumento de origen africano es central en la musica dominicana?', options: ['La guitarra', 'El tambor/la tambora', 'El violin', 'La flauta'], answer: 1, explanation: 'La tambora de origen africano es uno de los instrumentos fundamentales del merengue y otras expresiones musicales dominicanas.' },
      en: { q: 'African heritage in DR is seen in music, food, and traditions. What instrument of African origin is central to Dominican music?', options: ['Guitar', 'Drum/tambora', 'Violin', 'Flute'], answer: 1, explanation: 'The tambora of African origin is one of the fundamental instruments of merengue and other Dominican musical expressions.' },
      fr: { q: 'L\'heritage africain en RD se voit dans la musique, la nourriture et les traditions. Quel instrument d\'origine africaine est central dans la musique dominicaine ?', options: ['La guitare', 'Le tambour/la tambora', 'Le violon', 'La flute'], answer: 1, explanation: 'La tambora d\'origine africaine est un des instruments fondamentaux du merengue et d\'autres expressions musicales dominicaines.' }
    }
  },

  // ---- 41-50: Anacaona and other caciques ----

  {
    id: 'hist-041', type: 'mcq',
    lang: {
      es: { q: 'Anacaona era la cacica de Xaragua, poetisa y artista. Si fuera un personaje de Disney, seria una mezcla de Moana y Rapunzel. ¿Que significa su nombre en taino?', options: ['Estrella de mar', 'Flor de oro', 'Luna plateada', 'Rio sagrado'], answer: 1, explanation: 'Anacaona significa "Flor de Oro" en lengua taina. Fue una de las figuras mas importantes de la resistencia taina.' },
      en: { q: 'Anacaona was the cacica of Xaragua, a poet and artist. If she were a Disney character, she\'d be a mix of Moana and Rapunzel. What does her name mean in Taino?', options: ['Starfish', 'Golden flower', 'Silver moon', 'Sacred river'], answer: 1, explanation: 'Anacaona means "Golden Flower" in the Taino language. She was one of the most important figures of Taino resistance.' },
      fr: { q: 'Anacaona etait la cacique de Xaragua, poetesse et artiste. Si elle etait un personnage Disney, elle serait un melange de Moana et Rapunzel. Que signifie son nom en taino ?', options: ['Etoile de mer', 'Fleur d\'or', 'Lune d\'argent', 'Riviere sacree'], answer: 1, explanation: 'Anacaona signifie "Fleur d\'Or" en langue tainoe. Elle fut l\'une des figures les plus importantes de la resistance taino.' }
    }
  },

  {
    id: 'hist-042', type: 'tf',
    lang: {
      es: { q: 'Anacaona fue ejecutada por los espanoles porque rechazo someterse. Es una historia tragica, como la de muchos heroes.', answer: true, explanation: 'Anacaona fue ejecutada en 1503 por orden del gobernador Nicolas de Ovando, quien la acuso falsamente de conspirar una rebelion.' },
      en: { q: 'Anacaona was executed by the Spanish because she refused to submit. It\'s a tragic story, like many heroes\'.', answer: true, explanation: 'Anacaona was executed in 1503 by order of Governor Nicolas de Ovando, who falsely accused her of plotting a rebellion.' },
      fr: { q: 'Anacaona fut executee par les Espagnols parce qu\'elle refusa de se soumettre. C\'est une histoire tragique, comme celle de nombreux heros.', answer: true, explanation: 'Anacaona fut executee en 1503 sur ordre du gouverneur Nicolas de Ovando, qui l\'accusa faussement de comploter une rebellion.' }
    }
  },

  {
    id: 'hist-043', type: 'fill',
    lang: {
      es: { q: 'El cacique que recibio a Colon en su primer viaje y le dio refugio fue Cacique ________. Nivel hospitalidad: over 9000.', answer: ['Guacanagarix', 'guacanagarix', 'Guacanagaríx'], explanation: 'Guacanagarix fue el cacique de Marien que recibio amablemente a Colon en 1492 y lo ayudo cuando el Santa Maria naufago.' },
      en: { q: 'The cacique who welcomed Columbus on his first voyage and sheltered him was Cacique ________. Hospitality level: over 9000.', answer: ['Guacanagarix', 'guacanagarix', 'Guacanagaríx'], explanation: 'Guacanagarix was the cacique of Marien who kindly welcomed Columbus in 1492 and helped him when the Santa Maria shipwrecked.' },
      fr: { q: 'Le cacique qui accueillit Colomb lors de son premier voyage et lui donna refuge etait le Cacique ________. Niveau hospitalite : plus de 9000.', answer: ['Guacanagarix', 'guacanagarix', 'Guacanagaríx'], explanation: 'Guacanagarix fut le cacique de Marien qui accueillit aimablement Colomb en 1492 et l\'aida lorsque le Santa Maria fit naufrage.' }
    }
  },

  {
    id: 'hist-044', type: 'mcq',
    lang: {
      es: { q: 'Xaragua era uno de los cinco cacicazgos de La Hispaniola. ¿Que es un cacicazgo?', options: ['Un tipo de comida', 'Un territorio gobernado por un cacique', 'Un ritual religioso', 'Un tipo de canoa'], answer: 1, explanation: 'Un cacicazgo era una division territorial y politica gobernada por un cacique. La Hispaniola tenia 5 cacicazgos principales.' },
      en: { q: 'Xaragua was one of the five cacicazgos of Hispaniola. What is a cacicazgo?', options: ['A type of food', 'A territory ruled by a cacique', 'A religious ritual', 'A type of canoe'], answer: 1, explanation: 'A cacicazgo was a territorial and political division ruled by a cacique. Hispaniola had 5 main cacicazgos.' },
      fr: { q: 'Xaragua etait l\'un des cinq cacicazgos d\'Hispaniola. Qu\'est-ce qu\'un cacicazgo ?', options: ['Un type de nourriture', 'Un territoire gouverne par un cacique', 'Un rituel religieux', 'Un type de canot'], answer: 1, explanation: 'Un cacicazgo etait une division territoriale et politique gouvernee par un cacique. Hispaniola avait 5 cacicazgos principaux.' }
    }
  },

  {
    id: 'hist-045', type: 'match',
    lang: {
      es: { q: 'Conecta cada cacicazgo de La Hispaniola con su cacique historico:', pairs: [['Marien', 'Guacanagarix'], ['Xaragua', 'Anacaona / Bohechio'], ['Maguana', 'Caonabo'], ['Higuey', 'Cotubanama']], explanation: 'La Hispaniola estaba dividida en cinco grandes cacicazgos, cada uno con su propio cacique y territorio.' },
      en: { q: 'Match each cacicazgo of Hispaniola with its historical cacique:', pairs: [['Marien', 'Guacanagarix'], ['Xaragua', 'Anacaona / Bohechio'], ['Maguana', 'Caonabo'], ['Higuey', 'Cotubanama']], explanation: 'Hispaniola was divided into five great cacicazgos, each with its own cacique and territory.' },
      fr: { q: 'Relie chaque cacicazgo d\'Hispaniola a son cacique historique :', pairs: [['Marien', 'Guacanagarix'], ['Xaragua', 'Anacaona / Bohechio'], ['Maguana', 'Caonabo'], ['Higuey', 'Cotubanama']], explanation: 'Hispaniola etait divisee en cinq grands cacicazgos, chacun avec son propre cacique et territoire.' }
    }
  },

  {
    id: 'hist-046', type: 'tf',
    lang: {
      es: { q: 'Los areitos eran fiestas donde los tainos solo bailaban. No tenian ningun otro proposito.', answer: false, explanation: 'Los areitos eran ceremonias complejas donde se bailaba, cantaba y se transmitia la historia oral de la comunidad. Eran educacion, religion y arte a la vez.' },
      en: { q: 'Areitos were parties where the Tainos only danced. They had no other purpose.', answer: false, explanation: 'Areitos were complex ceremonies involving dance, song, and oral history transmission. They were education, religion, and art all at once.' },
      fr: { q: 'Les areitos etaient des fetes ou les Tainos ne faisaient que danser. Ils n\'avaient aucun autre but.', answer: false, explanation: 'Les areitos etaient des ceremonies complexes incluant danse, chant et transmission de l\'histoire orale. Ils etaient education, religion et art a la fois.' }
    }
  },

  {
    id: 'hist-047', type: 'mcq',
    lang: {
      es: { q: 'Caonabo fue un cacique guerrero que resistio a los espanoles. Era originario de otra isla. ¿De donde venia?', options: ['Puerto Rico', 'Cuba', 'Probablemente de las Bahamas o una isla caribe', 'Jamaica'], answer: 2, explanation: 'Caonabo era probablemente de origen caribe (no taino), lo que lo hacia un guerrero mas agresivo. Gobernaba el cacicazgo de Maguana.' },
      en: { q: 'Caonabo was a warrior cacique who resisted the Spanish. He was originally from another island. Where was he from?', options: ['Puerto Rico', 'Cuba', 'Probably from the Bahamas or a Carib island', 'Jamaica'], answer: 2, explanation: 'Caonabo was probably of Carib (not Taino) origin, which made him a more aggressive warrior. He ruled the cacicazgo of Maguana.' },
      fr: { q: 'Caonabo etait un cacique guerrier qui a resiste aux Espagnols. Il etait originaire d\'une autre ile. D\'ou venait-il ?', options: ['Porto Rico', 'Cuba', 'Probablement des Bahamas ou d\'une ile caraibe', 'Jamaique'], answer: 2, explanation: 'Caonabo etait probablement d\'origine caraibe (pas taino), ce qui en faisait un guerrier plus agressif. Il gouvernait le cacicazgo de Maguana.' }
    }
  },

  {
    id: 'hist-048', type: 'fill',
    lang: {
      es: { q: 'Los tainos cultivaban en parcelas llamadas ________. Era como un jardin pero mas pro: yuca, batata, maiz, aji...', answer: ['conucos', 'Conucos', 'conuco', 'Conuco'], explanation: 'Los conucos eran el sistema agricola taino: monticulos de tierra donde cultivaban varios alimentos a la vez (policultivo).' },
      en: { q: 'The Tainos farmed in plots called ________. Like a garden but more pro: yuca, sweet potato, corn, chili...', answer: ['conucos', 'Conucos', 'conuco', 'Conuco'], explanation: 'Conucos were the Taino farming system: mounds of earth where they grew several crops at once (polyculture).' },
      fr: { q: 'Les Tainos cultivaient dans des parcelles appelees ________. Comme un jardin mais plus pro : manioc, patate douce, mais, piment...', answer: ['conucos', 'Conucos', 'conuco', 'Conuco'], explanation: 'Les conucos etaient le systeme agricole taino : des monticules de terre ou ils cultivaient plusieurs aliments a la fois (polyculture).' }
    }
  },

  {
    id: 'hist-049', type: 'tf',
    lang: {
      es: { q: 'La Hispaniola solo tenia 2 cacicazgos antes de la llegada de Colon.', answer: false, explanation: 'La Hispaniola tenia 5 cacicazgos principales: Marien, Magua, Maguana, Xaragua e Higuey.' },
      en: { q: 'Hispaniola only had 2 cacicazgos before Columbus arrived.', answer: false, explanation: 'Hispaniola had 5 main cacicazgos: Marien, Magua, Maguana, Xaragua, and Higuey.' },
      fr: { q: 'Hispaniola n\'avait que 2 cacicazgos avant l\'arrivee de Colomb.', answer: false, explanation: 'Hispaniola avait 5 cacicazgos principaux : Marien, Magua, Maguana, Xaragua et Higuey.' }
    }
  },

  {
    id: 'hist-050', type: 'mcq',
    lang: {
      es: { q: 'Anacaona era famosa no solo como lider sino tambien como artista. ¿En que arte era especialmente talentosa?', options: ['Pintura en cuevas', 'Poesia y cantos (areitos)', 'Escultura de cemies', 'Navegacion'], answer: 1, explanation: 'Anacaona era una poetisa destacada que componia areitos (cantos y poemas). Su nombre "Flor de Oro" tambien refleja su sensibilidad artistica.' },
      en: { q: 'Anacaona was famous not only as a leader but also as an artist. In what art was she especially talented?', options: ['Cave painting', 'Poetry and songs (areitos)', 'Cemi sculpture', 'Navigation'], answer: 1, explanation: 'Anacaona was a distinguished poet who composed areitos (songs and poems). Her name "Golden Flower" also reflects her artistic sensitivity.' },
      fr: { q: 'Anacaona etait celebre non seulement comme chef mais aussi comme artiste. Dans quel art etait-elle particulierement talentueuse ?', options: ['Peinture rupestre', 'Poesie et chants (areitos)', 'Sculpture de cemis', 'Navigation'], answer: 1, explanation: 'Anacaona etait une poetesse distinguee qui composait des areitos (chants et poemes). Son nom "Fleur d\'Or" reflete aussi sa sensibilite artistique.' }
    }
  },

  // ---- 51-60: Archaeological sites ----

  {
    id: 'hist-051', type: 'mcq',
    lang: {
      es: { q: 'Las Cuevas del Pomier son como la galeria de arte mas antigua de RD. ¿Que contienen?', options: ['Tesoros espanoles escondidos', 'Miles de petroglifos y pictografias tainas', 'Fosiles de dinosaurios', 'Ruinas de una ciudad subterranea'], answer: 1, explanation: 'Las Cuevas del Pomier (San Cristobal) contienen una de las mayores colecciones de arte rupestre del Caribe, con miles de petroglifos y pictografias.' },
      en: { q: 'The Pomier Caves are like the oldest art gallery in DR. What do they contain?', options: ['Hidden Spanish treasures', 'Thousands of Taino petroglyphs and pictographs', 'Dinosaur fossils', 'Ruins of an underground city'], answer: 1, explanation: 'The Pomier Caves (San Cristobal) contain one of the largest collections of rock art in the Caribbean, with thousands of petroglyphs and pictographs.' },
      fr: { q: 'Les Grottes du Pomier sont comme la plus ancienne galerie d\'art de RD. Que contiennent-elles ?', options: ['Des tresors espagnols caches', 'Des milliers de petroglyphes et pictographies tainos', 'Des fossiles de dinosaures', 'Des ruines d\'une cite souterraine'], answer: 1, explanation: 'Les Grottes du Pomier (San Cristobal) contiennent l\'une des plus grandes collections d\'art rupestre des Caraibes, avec des milliers de petroglyphes et pictographies.' }
    }
  },

  {
    id: 'hist-052', type: 'fill',
    lang: {
      es: { q: 'Las ________ es un famoso sitio de petroglifos en el Lago Enriquillo. Su nombre describe lo que parecen: rostros tallados en la roca.', answer: ['Caritas', 'Las Caritas', 'las caritas', 'caritas'], explanation: 'Las Caritas son petroglifos tallados en la roca a orillas del Lago Enriquillo. Representan rostros (caritas) y son un importante sitio arqueologico.' },
      en: { q: '________ is a famous petroglyph site at Lake Enriquillo. Its name describes what they look like: little faces carved in rock.', answer: ['Las Caritas', 'Caritas', 'las caritas', 'caritas'], explanation: 'Las Caritas are petroglyphs carved in rock on the shores of Lake Enriquillo. They represent faces (caritas) and are an important archaeological site.' },
      fr: { q: '________ est un celebre site de petroglyphes au Lac Enriquillo. Son nom decrit ce qu\'ils semblent etre : de petits visages graves dans la roche.', answer: ['Las Caritas', 'Caritas', 'las caritas', 'caritas'], explanation: 'Las Caritas sont des petroglyphes graves dans la roche au bord du Lac Enriquillo. Ils representent des visages (caritas) et constituent un important site archeologique.' }
    }
  },

  {
    id: 'hist-053', type: 'tf',
    lang: {
      es: { q: 'Los petroglifos son lo mismo que las pictografias. Son exactamente la misma cosa.', answer: false, explanation: 'No. Los petroglifos son tallados/grabados en piedra, mientras que las pictografias son pintadas sobre la superficie. Tecnicas diferentes.' },
      en: { q: 'Petroglyphs are the same thing as pictographs. They are exactly identical.', answer: false, explanation: 'No. Petroglyphs are carved/engraved in stone, while pictographs are painted on the surface. Different techniques.' },
      fr: { q: 'Les petroglyphes sont la meme chose que les pictographies. Ce sont exactement la meme chose.', answer: false, explanation: 'Non. Les petroglyphes sont tailles/graves dans la pierre, tandis que les pictographies sont peintes sur la surface. Techniques differentes.' }
    }
  },

  {
    id: 'hist-054', type: 'mcq',
    lang: {
      es: { q: 'El Manantial de la Aleta es un cenote sagrado taino. ¿Que es un cenote? Piensa en un portal al inframundo, estilo Percy Jackson.', options: ['Un volcan extinto', 'Un pozo natural de agua profunda en roca caliza', 'Un rio subterraneo', 'Una fuente termal'], answer: 1, explanation: 'Un cenote es una formacion geologica: un pozo natural de agua dulce creado por el colapso de roca caliza. Los tainos los consideraban sagrados.' },
      en: { q: 'Manantial de la Aleta is a sacred Taino cenote. What is a cenote? Think of a portal to the underworld, Percy Jackson style.', options: ['An extinct volcano', 'A natural deep-water sinkhole in limestone', 'An underground river', 'A thermal spring'], answer: 1, explanation: 'A cenote is a geological formation: a natural freshwater sinkhole created by the collapse of limestone. The Tainos considered them sacred.' },
      fr: { q: 'Le Manantial de la Aleta est un cenote sacre taino. Qu\'est-ce qu\'un cenote ? Pensez a un portail vers les enfers, style Percy Jackson.', options: ['Un volcan eteint', 'Un puits naturel d\'eau profonde dans le calcaire', 'Une riviere souterraine', 'Une source thermale'], answer: 1, explanation: 'Un cenote est une formation geologique : un puits naturel d\'eau douce cree par l\'effondrement du calcaire. Les Tainos les consideraient sacres.' }
    }
  },

  {
    id: 'hist-055', type: 'tf',
    lang: {
      es: { q: 'Los tainos dejaban ofrendas en los cenotes, como los griegos dejaban ofrendas a los dioses en sus templos.', answer: true, explanation: 'Los cenotes eran sitios sagrados donde los tainos dejaban ofrendas de ceramica, cemies y otros objetos rituales para sus deidades.' },
      en: { q: 'The Tainos left offerings in cenotes, like the Greeks left offerings to the gods in their temples.', answer: true, explanation: 'Cenotes were sacred sites where the Tainos left offerings of ceramics, cemis, and other ritual objects to their deities.' },
      fr: { q: 'Les Tainos laissaient des offrandes dans les cenotes, comme les Grecs laissaient des offrandes aux dieux dans leurs temples.', answer: true, explanation: 'Les cenotes etaient des sites sacres ou les Tainos deposaient des offrandes de ceramique, cemis et autres objets rituels pour leurs divinites.' }
    }
  },

  {
    id: 'hist-056', type: 'mcq',
    lang: {
      es: { q: 'El Manantial de la Aleta esta dentro de un parque nacional. ¿Cual?', options: ['Parque Nacional Los Haitises', 'Parque Nacional Cotubanama (antes del Este)', 'Parque Nacional Jaragua', 'Parque Nacional Sierra de Bahoruco'], answer: 1, explanation: 'El Manantial de la Aleta esta en el Parque Nacional Cotubanama (antes conocido como Parque Nacional del Este), en la costa sureste de RD.' },
      en: { q: 'Manantial de la Aleta is inside a national park. Which one?', options: ['Los Haitises National Park', 'Cotubanama National Park (formerly Del Este)', 'Jaragua National Park', 'Sierra de Bahoruco National Park'], answer: 1, explanation: 'Manantial de la Aleta is in Cotubanama National Park (formerly known as Del Este National Park), on the southeast coast of DR.' },
      fr: { q: 'Le Manantial de la Aleta se trouve dans un parc national. Lequel ?', options: ['Parc National Los Haitises', 'Parc National Cotubanama (anciennement Del Este)', 'Parc National Jaragua', 'Parc National Sierra de Bahoruco'], answer: 1, explanation: 'Le Manantial de la Aleta se trouve dans le Parc National Cotubanama (anciennement Parc National de l\'Est), sur la cote sud-est de la RD.' }
    }
  },

  {
    id: 'hist-057', type: 'match',
    lang: {
      es: { q: 'Conecta cada sitio arqueologico con lo que lo hace especial:', pairs: [['Cuevas del Pomier', 'Mayor coleccion de arte rupestre del Caribe'], ['Las Caritas', 'Petroglifos de rostros junto al Lago Enriquillo'], ['Manantial de la Aleta', 'Cenote sagrado con ofrendas tainas'], ['La Isabela', 'Primera ciudad europea en America']], explanation: 'La Republica Dominicana tiene un patrimonio arqueologico riquísimo que debemos conocer y proteger.' },
      en: { q: 'Match each archaeological site with what makes it special:', pairs: [['Pomier Caves', 'Largest rock art collection in the Caribbean'], ['Las Caritas', 'Face petroglyphs by Lake Enriquillo'], ['Manantial de la Aleta', 'Sacred cenote with Taino offerings'], ['La Isabela', 'First European city in the Americas']], explanation: 'The Dominican Republic has an incredibly rich archaeological heritage that we must know and protect.' },
      fr: { q: 'Relie chaque site archeologique a ce qui le rend special :', pairs: [['Grottes du Pomier', 'Plus grande collection d\'art rupestre des Caraibes'], ['Las Caritas', 'Petroglyphes de visages pres du Lac Enriquillo'], ['Manantial de la Aleta', 'Cenote sacre avec offrandes tainos'], ['La Isabela', 'Premiere ville europeenne en Amerique']], explanation: 'La Republique dominicaine possede un patrimoine archeologique incroyablement riche que nous devons connaitre et proteger.' }
    }
  },

  {
    id: 'hist-058', type: 'tf',
    lang: {
      es: { q: 'El Museo del Hombre Dominicano es como el Smithsonian, pero para la historia taina y dominicana. Esta en Santo Domingo.', answer: true, explanation: 'El Museo del Hombre Dominicano, en Santo Domingo, es el principal museo de arqueologia y etnografia del pais, con una impresionante coleccion taina.' },
      en: { q: 'The Museum of the Dominican Man is like the Smithsonian, but for Taino and Dominican history. It\'s in Santo Domingo.', answer: true, explanation: 'The Museum of the Dominican Man, in Santo Domingo, is the country\'s main archaeology and ethnography museum, with an impressive Taino collection.' },
      fr: { q: 'Le Musee de l\'Homme Dominicain est comme le Smithsonian, mais pour l\'histoire taino et dominicaine. Il est a Saint-Domingue.', answer: true, explanation: 'Le Musee de l\'Homme Dominicain, a Saint-Domingue, est le principal musee d\'archeologie et d\'ethnographie du pays, avec une impressionnante collection taino.' }
    }
  },

  {
    id: 'hist-059', type: 'mcq',
    lang: {
      es: { q: 'Cotubanama fue un cacique guerrero del este de la isla. ¿Por que un parque nacional lleva su nombre hoy?', options: ['Porque descubrio el parque', 'Para honrar su resistencia contra los espanoles', 'Porque planto todos los arboles', 'Porque era biologo'], answer: 1, explanation: 'Cotubanama fue un cacique que resistio ferozmente la colonizacion espanola en el este de La Hispaniola. El parque lleva su nombre en su honor.' },
      en: { q: 'Cotubanama was a warrior cacique from eastern Hispaniola. Why does a national park bear his name today?', options: ['Because he discovered the park', 'To honor his resistance against the Spanish', 'Because he planted all the trees', 'Because he was a biologist'], answer: 1, explanation: 'Cotubanama was a cacique who fiercely resisted Spanish colonization in eastern Hispaniola. The park bears his name in his honor.' },
      fr: { q: 'Cotubanama etait un cacique guerrier de l\'est de l\'ile. Pourquoi un parc national porte-t-il son nom aujourd\'hui ?', options: ['Parce qu\'il a decouvert le parc', 'Pour honorer sa resistance contre les Espagnols', 'Parce qu\'il a plante tous les arbres', 'Parce qu\'il etait biologiste'], answer: 1, explanation: 'Cotubanama fut un cacique qui resista ferocement la colonisation espagnole a l\'est d\'Hispaniola. Le parc porte son nom en son honneur.' }
    }
  },

  {
    id: 'hist-060', type: 'fill',
    lang: {
      es: { q: 'Roberto ________ es un historiador dominicano real que ha dedicado su vida a estudiar la historia de RD. Aparece en ArcLycee como NPC.', answer: ['Cassa', 'Cassá', 'cassa', 'cassá'], explanation: 'Roberto Cassa es uno de los historiadores mas importantes de la Republica Dominicana y aparece como personaje en ArcLycee.' },
      en: { q: 'Roberto ________ is a real Dominican historian who has dedicated his life to studying DR history. He appears in ArcLycee as an NPC.', answer: ['Cassa', 'Cassá', 'cassa', 'cassá'], explanation: 'Roberto Cassa is one of the most important historians of the Dominican Republic and appears as a character in ArcLycee.' },
      fr: { q: 'Roberto ________ est un veritable historien dominicain qui a consacre sa vie a etudier l\'histoire de la RD. Il apparait dans ArcLycee comme PNJ.', answer: ['Cassa', 'Cassá', 'cassa', 'cassá'], explanation: 'Roberto Cassa est l\'un des historiens les plus importants de la Republique dominicaine et apparait comme personnage dans ArcLycee.' }
    }
  },

  // ---- 61-70: Heritage protection & laws ----

  {
    id: 'hist-061', type: 'mcq',
    lang: {
      es: { q: 'En RD existe una ley que protege el patrimonio arqueologico, como las leyes de proteccion de Hogwarts pero para artefactos reales. ¿Cual es?', options: ['Ley 1-12', 'Ley 318-68', 'Ley 502-99', 'Ley 64-00'], answer: 1, explanation: 'La Ley 318-68 es la ley dominicana que protege el patrimonio cultural y arqueologico del pais.' },
      en: { q: 'In DR there\'s a law that protects archaeological heritage, like Hogwarts protection laws but for real artifacts. Which one?', options: ['Law 1-12', 'Law 318-68', 'Law 502-99', 'Law 64-00'], answer: 1, explanation: 'Law 318-68 is the Dominican law that protects the country\'s cultural and archaeological heritage.' },
      fr: { q: 'En RD, il existe une loi qui protege le patrimoine archeologique, comme les lois de protection de Poudlard mais pour de vrais artefacts. Laquelle ?', options: ['Loi 1-12', 'Loi 318-68', 'Loi 502-99', 'Loi 64-00'], answer: 1, explanation: 'La Loi 318-68 est la loi dominicaine qui protege le patrimoine culturel et archeologique du pays.' }
    }
  },

  {
    id: 'hist-062', type: 'tf',
    lang: {
      es: { q: 'Es totalmente legal llevarte un artefacto taino de un sitio arqueologico como souvenir. ¿Verdad?', answer: false, explanation: 'Falso. La Ley 318-68 y convenciones internacionales prohiben la extraccion de artefactos arqueologicos. Es un delito contra el patrimonio.' },
      en: { q: 'It\'s totally legal to take a Taino artifact from an archaeological site as a souvenir. True?', answer: false, explanation: 'False. Law 318-68 and international conventions prohibit the extraction of archaeological artifacts. It\'s a crime against heritage.' },
      fr: { q: 'C\'est totalement legal d\'emporter un artefact taino d\'un site archeologique comme souvenir. Vrai ?', answer: false, explanation: 'Faux. La Loi 318-68 et les conventions internationales interdisent l\'extraction d\'artefacts archeologiques. C\'est un delit contre le patrimoine.' }
    }
  },

  {
    id: 'hist-063', type: 'mcq',
    lang: {
      es: { q: 'La UNESCO tiene una convencion importante sobre trafico de bienes culturales. ¿De que ano es? Pista: fue el mismo ano que los Beatles se separaron.', options: ['1960', '1970', '1980', '1990'], answer: 1, explanation: 'La Convencion UNESCO de 1970 es el tratado internacional principal contra el trafico ilicito de bienes culturales.' },
      en: { q: 'UNESCO has an important convention on trafficking of cultural property. What year? Hint: same year the Beatles broke up.', options: ['1960', '1970', '1980', '1990'], answer: 1, explanation: 'The 1970 UNESCO Convention is the main international treaty against illicit trafficking of cultural property.' },
      fr: { q: 'L\'UNESCO a une convention importante sur le trafic de biens culturels. De quelle annee ? Indice : la meme annee que la separation des Beatles.', options: ['1960', '1970', '1980', '1990'], answer: 1, explanation: 'La Convention UNESCO de 1970 est le principal traite international contre le trafic illicite de biens culturels.' }
    }
  },

  {
    id: 'hist-064', type: 'fill',
    lang: {
      es: { q: 'La organizacion internacional que protege el patrimonio cultural mundial se llama ________. Tiene su sede en Paris.', answer: ['UNESCO', 'Unesco', 'unesco'], explanation: 'La UNESCO (Organizacion de las Naciones Unidas para la Educacion, la Ciencia y la Cultura) protege el patrimonio cultural y natural mundial.' },
      en: { q: 'The international organization that protects world cultural heritage is called ________. It\'s based in Paris.', answer: ['UNESCO', 'Unesco', 'unesco'], explanation: 'UNESCO (United Nations Educational, Scientific and Cultural Organization) protects world cultural and natural heritage.' },
      fr: { q: 'L\'organisation internationale qui protege le patrimoine culturel mondial s\'appelle ________. Elle a son siege a Paris.', answer: ['UNESCO', 'Unesco', 'unesco', 'l\'UNESCO'], explanation: 'L\'UNESCO (Organisation des Nations Unies pour l\'Education, la Science et la Culture) protege le patrimoine culturel et naturel mondial.' }
    }
  },

  {
    id: 'hist-065', type: 'tf',
    lang: {
      es: { q: 'INTERPOL solo investiga robos de bancos y cibercrimen. No tiene nada que ver con artefactos arqueologicos.', answer: false, explanation: 'INTERPOL tiene una unidad dedicada a combatir el trafico de bienes culturales y artefactos arqueologicos a nivel mundial.' },
      en: { q: 'INTERPOL only investigates bank robberies and cybercrime. It has nothing to do with archaeological artifacts.', answer: false, explanation: 'INTERPOL has a dedicated unit to combat trafficking of cultural property and archaeological artifacts worldwide.' },
      fr: { q: 'INTERPOL n\'enquete que sur les braquages de banques et la cybercriminalite. Cela n\'a rien a voir avec les artefacts archeologiques.', answer: false, explanation: 'INTERPOL dispose d\'une unite dediee a la lutte contre le trafic de biens culturels et d\'artefacts archeologiques dans le monde entier.' }
    }
  },

  {
    id: 'hist-066', type: 'mcq',
    lang: {
      es: { q: 'En ArcLycee, te enfrentas a un traficante de artefactos en el aeropuerto. ¿Con que "armas" lo derrotas si usas la ruta pacifista?', options: ['Espadas y escudos', 'Leyes, evidencia forense y cooperacion internacional', 'Hechizos magicos', 'Dinero y sobornos'], answer: 1, explanation: 'En el combate legal del juego, usas la Ley 318, evidencia forense, INTERPOL y la Convencion UNESCO 1970 para detener al traficante.' },
      en: { q: 'In ArcLycee, you face an artifact trafficker at the airport. How do you beat them using the pacifist route?', options: ['Swords and shields', 'Laws, forensic evidence, and international cooperation', 'Magic spells', 'Money and bribes'], answer: 1, explanation: 'In the game\'s legal combat, you use Law 318, forensic evidence, INTERPOL, and the 1970 UNESCO Convention to stop the trafficker.' },
      fr: { q: 'Dans ArcLycee, tu affrontes un trafiquant d\'artefacts a l\'aeroport. Comment le vaincre par la voie pacifiste ?', options: ['Epees et boucliers', 'Lois, preuves forensiques et cooperation internationale', 'Sorts magiques', 'Argent et pots-de-vin'], answer: 1, explanation: 'Dans le combat legal du jeu, tu utilises la Loi 318, les preuves forensiques, INTERPOL et la Convention UNESCO 1970 pour arreter le trafiquant.' }
    }
  },

  {
    id: 'hist-067', type: 'match',
    lang: {
      es: { q: 'Conecta cada herramienta legal con su funcion en la proteccion del patrimonio:', pairs: [['Ley 318-68', 'Proteccion nacional del patrimonio en RD'], ['UNESCO 1970', 'Convencion contra trafico internacional'], ['INTERPOL', 'Policia internacional contra traficantes'], ['Evidencia forense', 'Prueba cientifica del origen de artefactos']], explanation: 'La proteccion del patrimonio requiere leyes locales, tratados internacionales y cooperacion policial.' },
      en: { q: 'Match each legal tool with its function in heritage protection:', pairs: [['Law 318-68', 'National heritage protection in DR'], ['UNESCO 1970', 'Convention against international trafficking'], ['INTERPOL', 'International police against traffickers'], ['Forensic evidence', 'Scientific proof of artifact origins']], explanation: 'Heritage protection requires local laws, international treaties, and police cooperation.' },
      fr: { q: 'Relie chaque outil juridique a sa fonction dans la protection du patrimoine :', pairs: [['Loi 318-68', 'Protection nationale du patrimoine en RD'], ['UNESCO 1970', 'Convention contre le trafic international'], ['INTERPOL', 'Police internationale contre les trafiquants'], ['Preuve forensique', 'Preuve scientifique de l\'origine des artefacts']], explanation: 'La protection du patrimoine necessite des lois locales, des traites internationaux et la cooperation policiere.' }
    }
  },

  {
    id: 'hist-068', type: 'tf',
    lang: {
      es: { q: 'El trafico de artefactos arqueologicos es un crimen que solo afecta a museos ricos. No le importa a nadie mas.', answer: false, explanation: 'El trafico destruye el contexto arqueologico, borra la historia de pueblos enteros y es un crimen contra la humanidad. Nos afecta a todos.' },
      en: { q: 'Archaeological artifact trafficking is a crime that only affects rich museums. Nobody else cares.', answer: false, explanation: 'Trafficking destroys archaeological context, erases the history of entire peoples, and is a crime against humanity. It affects us all.' },
      fr: { q: 'Le trafic d\'artefacts archeologiques est un crime qui n\'affecte que les musees riches. Personne d\'autre n\'est concerne.', answer: false, explanation: 'Le trafic detruit le contexte archeologique, efface l\'histoire de peuples entiers et est un crime contre l\'humanite. Cela nous concerne tous.' }
    }
  },

  {
    id: 'hist-069', type: 'mcq',
    lang: {
      es: { q: '¿Por que es tan importante NO mover un artefacto de su sitio original? Piensa en una escena del crimen nivel CSI.', options: ['Porque pesa mucho', 'Porque el contexto (donde y como se encontro) es tan valioso como el objeto', 'Porque esta maldito', 'Porque los museos no los quieren'], answer: 1, explanation: 'El contexto arqueologico (posicion, capa de tierra, objetos cercanos) da informacion crucial sobre la historia del artefacto y su cultura.' },
      en: { q: 'Why is it so important NOT to move an artifact from its original site? Think CSI crime scene level.', options: ['Because it\'s too heavy', 'Because the context (where and how it was found) is as valuable as the object', 'Because it\'s cursed', 'Because museums don\'t want them'], answer: 1, explanation: 'Archaeological context (position, soil layer, nearby objects) provides crucial information about the artifact\'s history and culture.' },
      fr: { q: 'Pourquoi est-il si important de NE PAS deplacer un artefact de son site original ? Pense a une scene de crime niveau Les Experts.', options: ['Parce qu\'il est trop lourd', 'Parce que le contexte (ou et comment il a ete trouve) est aussi precieux que l\'objet', 'Parce qu\'il est maudit', 'Parce que les musees n\'en veulent pas'], answer: 1, explanation: 'Le contexte archeologique (position, couche de terre, objets voisins) fournit des informations cruciales sur l\'histoire de l\'artefact et sa culture.' }
    }
  },

  {
    id: 'hist-070', type: 'fill',
    lang: {
      es: { q: 'La ley dominicana que protege el patrimonio es la Ley ___-68. Memoriza ese numero, es como tu codigo de heroe.', answer: ['318', '318-68'], explanation: 'La Ley 318-68 es la piedra angular de la proteccion del patrimonio cultural en la Republica Dominicana.' },
      en: { q: 'The Dominican law that protects heritage is Law ___-68. Memorize that number, it\'s like your hero code.', answer: ['318', '318-68'], explanation: 'Law 318-68 is the cornerstone of cultural heritage protection in the Dominican Republic.' },
      fr: { q: 'La loi dominicaine qui protege le patrimoine est la Loi ___-68. Memorise ce numero, c\'est comme ton code de heros.', answer: ['318', '318-68'], explanation: 'La Loi 318-68 est la pierre angulaire de la protection du patrimoine culturel en Republique dominicaine.' }
    }
  },

  // ---- 71-80: Critical thinking & connections ----

  {
    id: 'hist-071', type: 'mcq',
    lang: {
      es: { q: 'Tanto Enriquillo como Lemba lucharon por la libertad, pero desde perspectivas diferentes. ¿Que tenian en comun?', options: ['Ambos eran caciques tainos', 'Ambos usaron las montanas como refugio y resistieron la opresion espanola', 'Ambos firmaron tratados con la Corona', 'Ambos eran de Africa'], answer: 1, explanation: 'Tanto Enriquillo (taino) como Lemba (africano) usaron las montanas de La Hispaniola como base para resistir la opresion colonial espanola.' },
      en: { q: 'Both Enriquillo and Lemba fought for freedom, but from different perspectives. What did they have in common?', options: ['Both were Taino caciques', 'Both used mountains as refuge and resisted Spanish oppression', 'Both signed treaties with the Crown', 'Both were from Africa'], answer: 1, explanation: 'Both Enriquillo (Taino) and Lemba (African) used Hispaniola\'s mountains as a base to resist Spanish colonial oppression.' },
      fr: { q: 'Enriquillo et Lemba ont tous deux lutte pour la liberte, mais de perspectives differentes. Qu\'avaient-ils en commun ?', options: ['Les deux etaient des caciques tainos', 'Les deux ont utilise les montagnes comme refuge et resiste a l\'oppression espagnole', 'Les deux ont signe des traites avec la Couronne', 'Les deux venaient d\'Afrique'], answer: 1, explanation: 'Enriquillo (taino) et Lemba (africain) ont tous deux utilise les montagnes d\'Hispaniola comme base pour resister a l\'oppression coloniale espagnole.' }
    }
  },

  {
    id: 'hist-072', type: 'tf',
    lang: {
      es: { q: 'La identidad dominicana es solo taina. La herencia africana y espanola no son importantes.', answer: false, explanation: 'La identidad dominicana es trietnica: una mezcla de herencia taina, africana y espanola. Las tres culturas son igualmente importantes.' },
      en: { q: 'Dominican identity is only Taino. African and Spanish heritage are not important.', answer: false, explanation: 'Dominican identity is tri-ethnic: a mix of Taino, African, and Spanish heritage. All three cultures are equally important.' },
      fr: { q: 'L\'identite dominicaine est uniquement taino. L\'heritage africain et espagnol n\'est pas important.', answer: false, explanation: 'L\'identite dominicaine est triethnique : un melange d\'heritages taino, africain et espagnol. Les trois cultures sont egalement importantes.' }
    }
  },

  {
    id: 'hist-073', type: 'mcq',
    lang: {
      es: { q: 'En ArcLycee hay una ruta pacifista y una agresiva, como en Undertale. ¿Que nos ensena esto sobre la resolucion de conflictos historicos?', options: ['Que la violencia siempre gana', 'Que tanto el dialogo como la fuerza fueron usados historicamente, pero la paz dura mas', 'Que los conflictos no existieron', 'Que solo los fuertes sobreviven'], answer: 1, explanation: 'La historia muestra que tanto la resistencia armada como la negociacion fueron estrategias reales. Enriquillo uso ambas antes de lograr la paz.' },
      en: { q: 'In ArcLycee there\'s a pacifist and aggressive route, like in Undertale. What does this teach about resolving historical conflicts?', options: ['That violence always wins', 'That both dialogue and force were used historically, but peace lasts longer', 'That conflicts never existed', 'That only the strong survive'], answer: 1, explanation: 'History shows that both armed resistance and negotiation were real strategies. Enriquillo used both before achieving peace.' },
      fr: { q: 'Dans ArcLycee, il y a une voie pacifiste et une voie agressive, comme dans Undertale. Qu\'est-ce que cela enseigne sur la resolution des conflits historiques ?', options: ['Que la violence gagne toujours', 'Que le dialogue et la force furent utilises historiquement, mais la paix dure plus longtemps', 'Que les conflits n\'ont jamais existe', 'Que seuls les forts survivent'], answer: 1, explanation: 'L\'histoire montre que la resistance armee et la negociation furent de vraies strategies. Enriquillo utilisa les deux avant d\'obtenir la paix.' }
    }
  },

  {
    id: 'hist-074', type: 'fill',
    lang: {
      es: { q: 'La identidad dominicana es ________: una mezcla de tres raices culturales (taina, africana y espanola).', answer: ['trietnica', 'triétnica', 'tri-étnica', 'tri-etnica', 'Trietnica'], explanation: 'La cultura dominicana es producto de la mezcla de tres herencias: taina (indigena), africana (cimarrones y esclavos) y espanola (colonizadores).' },
      en: { q: 'Dominican identity is ________: a blend of three cultural roots (Taino, African, and Spanish).', answer: ['tri-ethnic', 'triethnic', 'tri ethnic', 'Tri-ethnic'], explanation: 'Dominican culture is the product of three heritages: Taino (indigenous), African (maroons and enslaved), and Spanish (colonizers).' },
      fr: { q: 'L\'identite dominicaine est ________ : un melange de trois racines culturelles (taino, africaine et espagnole).', answer: ['triethnique', 'tri-ethnique', 'Triethnique'], explanation: 'La culture dominicaine est le produit de trois heritages : taino (autochtone), africain (marrons et esclaves) et espagnol (colonisateurs).' }
    }
  },

  {
    id: 'hist-075', type: 'mcq',
    lang: {
      es: { q: 'La palabra "huracan" viene del idioma taino. ¿Que otras palabras del espanol cotidiano vienen del taino?', options: ['Pizza, chocolate, tomate', 'Hamaca, canoa, tabaco, barbacoa', 'Telefono, computadora, internet', 'Libro, mesa, silla'], answer: 1, explanation: 'Muchas palabras del espanol vienen del taino: hamaca, canoa, tabaco, barbacoa, guayaba, maiz, iguana, y muchas mas.' },
      en: { q: 'The word "hurricane" comes from the Taino language. What other everyday English words come from Taino?', options: ['Pizza, chocolate, tomato', 'Hammock, canoe, tobacco, barbecue', 'Telephone, computer, internet', 'Book, table, chair'], answer: 1, explanation: 'Many English words come from Taino: hammock, canoe, tobacco, barbecue, guava, maize, iguana, and many more.' },
      fr: { q: 'Le mot "ouragan" vient de la langue taino. Quels autres mots du quotidien viennent du taino ?', options: ['Pizza, chocolat, tomate', 'Hamac, canoe, tabac, barbecue', 'Telephone, ordinateur, internet', 'Livre, table, chaise'], answer: 1, explanation: 'De nombreux mots viennent du taino : hamac, canoe, tabac, barbecue, goyave, mais, iguane, et bien d\'autres.' }
    }
  },

  {
    id: 'hist-076', type: 'tf',
    lang: {
      es: { q: 'Los tainos desaparecieron completamente y no dejaron ninguna huella en la cultura dominicana actual.', answer: false, explanation: 'Los tainos dejaron una huella inmensa: palabras (hamaca, canoa), alimentos (casabe, yuca), tecnicas agricolas, toponimos y genes en la poblacion actual.' },
      en: { q: 'The Tainos completely disappeared and left no trace in current Dominican culture.', answer: false, explanation: 'The Tainos left an immense legacy: words (hammock, canoe), foods (casabe, yuca), farming techniques, place names, and genes in today\'s population.' },
      fr: { q: 'Les Tainos ont completement disparu et n\'ont laisse aucune trace dans la culture dominicaine actuelle.', answer: false, explanation: 'Les Tainos ont laisse un immense heritage : mots (hamac, canoe), aliments (casabe, manioc), techniques agricoles, toponymie et genes dans la population actuelle.' }
    }
  },

  {
    id: 'hist-077', type: 'match',
    lang: {
      es: { q: 'Conecta cada palabra del espanol con su origen taino original:', pairs: [['Hamaca', 'Cama colgante de red'], ['Canoa', 'Embarcacion de tronco'], ['Tabaco', 'Planta ceremonial fumada'], ['Barbacoa', 'Parrilla de madera elevada'], ['Huracan', 'Dios taino de las tormentas']], explanation: 'Decenas de palabras del espanol cotidiano tienen origen taino, demostrando cuanto de su cultura sobrevive hoy.' },
      en: { q: 'Match each word with its original Taino meaning:', pairs: [['Hammock', 'Hanging net bed'], ['Canoe', 'Log boat'], ['Tobacco', 'Ceremonial smoked plant'], ['Barbecue', 'Elevated wooden grill'], ['Hurricane', 'Taino storm god']], explanation: 'Dozens of everyday English words have Taino origins, showing how much of their culture survives today.' },
      fr: { q: 'Relie chaque mot a son sens taino original :', pairs: [['Hamac', 'Lit suspendu en filet'], ['Canoe', 'Embarcation en tronc'], ['Tabac', 'Plante ceremonielle fumee'], ['Barbecue', 'Gril en bois sureleve'], ['Ouragan', 'Dieu taino des tempetes']], explanation: 'Des dizaines de mots courants ont des origines tainos, montrant combien de leur culture survit aujourd\'hui.' }
    }
  },

  {
    id: 'hist-078', type: 'mcq',
    lang: {
      es: { q: '¿Que material usaban los tainos para hacer sus cemies? (Pueden ser varios, pero uno era el mas comun.)', options: ['Metal y cristal', 'Piedra, madera, hueso y concha', 'Plastico y vidrio', 'Oro puro y diamantes'], answer: 1, explanation: 'Los cemies se hacian de diversos materiales naturales: piedra, madera, hueso, concha, algodon y a veces guanin (aleacion de oro/plata/cobre).' },
      en: { q: 'What materials did the Tainos use to make their cemis? (There were several, but one was most common.)', options: ['Metal and crystal', 'Stone, wood, bone, and shell', 'Plastic and glass', 'Pure gold and diamonds'], answer: 1, explanation: 'Cemis were made from various natural materials: stone, wood, bone, shell, cotton, and sometimes guanin (gold/silver/copper alloy).' },
      fr: { q: 'Quels materiaux les Tainos utilisaient-ils pour fabriquer leurs cemis ? (Plusieurs, mais un etait le plus courant.)', options: ['Metal et cristal', 'Pierre, bois, os et coquillage', 'Plastique et verre', 'Or pur et diamants'], answer: 1, explanation: 'Les cemis etaient fabriques en divers materiaux naturels : pierre, bois, os, coquillage, coton et parfois guanin (alliage or/argent/cuivre).' }
    }
  },

  {
    id: 'hist-079', type: 'tf',
    lang: {
      es: { q: 'El guanin era oro puro que los tainos importaban de Europa.', answer: false, explanation: 'El guanin era una aleacion de oro, plata y cobre que los tainos ya conocian antes de la llegada de los europeos. No venia de Europa.' },
      en: { q: 'Guanin was pure gold that the Tainos imported from Europe.', answer: false, explanation: 'Guanin was an alloy of gold, silver, and copper that the Tainos already knew before the Europeans arrived. It did not come from Europe.' },
      fr: { q: 'Le guanin etait de l\'or pur que les Tainos importaient d\'Europe.', answer: false, explanation: 'Le guanin etait un alliage d\'or, d\'argent et de cuivre que les Tainos connaissaient deja avant l\'arrivee des Europeens. Il ne venait pas d\'Europe.' }
    }
  },

  {
    id: 'hist-080', type: 'mcq',
    lang: {
      es: { q: 'Si pudieras viajar en el tiempo a 1492, ¿cuantos cacicazgos principales encontrarias en La Hispaniola?', options: ['3', '5', '7', '10'], answer: 1, explanation: 'La Hispaniola tenia 5 cacicazgos principales: Marien (noroeste), Magua (noreste), Maguana (centro), Xaragua (suroeste) e Higuey (sureste).' },
      en: { q: 'If you could time-travel to 1492, how many main cacicazgos would you find in Hispaniola?', options: ['3', '5', '7', '10'], answer: 1, explanation: 'Hispaniola had 5 main cacicazgos: Marien (northwest), Magua (northeast), Maguana (center), Xaragua (southwest), and Higuey (southeast).' },
      fr: { q: 'Si tu pouvais voyager dans le temps jusqu\'en 1492, combien de cacicazgos principaux trouverais-tu a Hispaniola ?', options: ['3', '5', '7', '10'], answer: 1, explanation: 'Hispaniola avait 5 cacicazgos principaux : Marien (nord-ouest), Magua (nord-est), Maguana (centre), Xaragua (sud-ouest) et Higuey (sud-est).' }
    }
  },

  // ---- 81-90: Deeper history & culture ----

  {
    id: 'hist-081', type: 'mcq',
    lang: {
      es: { q: 'Los tainos tenian un ritual donde un lider espiritual (behique) inhalaba polvo de cohoba para comunicarse con los espiritus. ¿Que usaban para inhalar?', options: ['Una pipa de agua', 'Un inhalador de ceramica o madera en forma de Y', 'Una mascara de gas', 'Un telescopio'], answer: 1, explanation: 'Los behiques usaban inhaladores de ceramica o madera en forma de Y para aspirar el polvo de cohoba durante rituales de comunicacion espiritual.' },
      en: { q: 'The Tainos had a ritual where a spiritual leader (behique) inhaled cohoba powder to communicate with spirits. What did they use to inhale?', options: ['A water pipe', 'A Y-shaped ceramic or wood inhaler', 'A gas mask', 'A telescope'], answer: 1, explanation: 'Behiques used Y-shaped ceramic or wooden inhalers to sniff cohoba powder during spiritual communication rituals.' },
      fr: { q: 'Les Tainos avaient un rituel ou un chef spirituel (behique) inhalait de la poudre de cohoba pour communiquer avec les esprits. Qu\'utilisaient-ils ?', options: ['Une pipe a eau', 'Un inhalateur en ceramique ou bois en forme de Y', 'Un masque a gaz', 'Un telescope'], answer: 1, explanation: 'Les behiques utilisaient des inhalateurs en ceramique ou bois en forme de Y pour aspirer la poudre de cohoba durant les rituels de communication spirituelle.' }
    }
  },

  {
    id: 'hist-082', type: 'fill',
    lang: {
      es: { q: 'El lider espiritual taino se llamaba ________. Era como el Dumbledore de la aldea: sabio, curandero y sacerdote.', answer: ['behique', 'Behique', 'behíque', 'buhiti', 'Buhiti'], explanation: 'El behique (o buhiti) era el chaman taino: medico, sacerdote y sabio que realizaba rituales de cohoba y curaba enfermedades.' },
      en: { q: 'The Taino spiritual leader was called ________. Like the village\'s Dumbledore: wise, healer, and priest.', answer: ['behique', 'Behique', 'buhiti', 'Buhiti'], explanation: 'The behique (or buhiti) was the Taino shaman: doctor, priest, and wise person who performed cohoba rituals and healed illnesses.' },
      fr: { q: 'Le chef spirituel taino s\'appelait ________. Comme le Dumbledore du village : sage, guerisseur et pretre.', answer: ['behique', 'Behique', 'buhiti', 'Buhiti'], explanation: 'Le behique (ou buhiti) etait le chamane taino : medecin, pretre et sage qui pratiquait les rituels de cohoba et guerissait les maladies.' }
    }
  },

  {
    id: 'hist-083', type: 'tf',
    lang: {
      es: { q: 'El batu se jugaba en el batey, que era la plaza central de la aldea. Era como el estadio del yucayeque.', answer: true, explanation: 'El batey era la plaza central del yucayeque donde se jugaba batu, se hacian areitos y se tomaban decisiones comunitarias importantes.' },
      en: { q: 'Batu was played in the batey, which was the village\'s central plaza. It was like the yucayeque\'s stadium.', answer: true, explanation: 'The batey was the central plaza where batu was played, areitos were held, and important community decisions were made.' },
      fr: { q: 'Le batu se jouait dans le batey, qui etait la place centrale du village. C\'etait comme le stade du yucayeque.', answer: true, explanation: 'Le batey etait la place centrale du yucayeque ou l\'on jouait au batu, organisait les areitos et prenait les decisions communautaires importantes.' }
    }
  },

  {
    id: 'hist-084', type: 'mcq',
    lang: {
      es: { q: 'Los tainos hacian ceramica increible. ¿Cual de estas NO era una funcion de la ceramica taina?', options: ['Cocinar y almacenar alimentos', 'Rituales religiosos', 'Decoracion de bohios', 'Fabricar armas de guerra'], answer: 3, explanation: 'La ceramica taina tenia funciones domesticas (cocina, almacenaje), rituales (cemies, vasijas ceremoniales) y decorativas, pero no se usaba para armas.' },
      en: { q: 'The Tainos made incredible pottery. Which of these was NOT a function of Taino ceramics?', options: ['Cooking and food storage', 'Religious rituals', 'Bohio decoration', 'Making war weapons'], answer: 3, explanation: 'Taino ceramics had domestic (cooking, storage), ritual (cemis, ceremonial vessels), and decorative functions, but were not used for weapons.' },
      fr: { q: 'Les Tainos fabriquaient d\'incroyables ceramiques. Laquelle de ces fonctions N\'ETAIT PAS une fonction de la ceramique taino ?', options: ['Cuisine et stockage d\'aliments', 'Rituels religieux', 'Decoration de bohios', 'Fabrication d\'armes de guerre'], answer: 3, explanation: 'La ceramique taino avait des fonctions domestiques (cuisine, stockage), rituelles (cemis, vases ceremoniels) et decoratives, mais pas d\'armes.' }
    }
  },

  {
    id: 'hist-085', type: 'match',
    lang: {
      es: { q: 'Relaciona cada alimento con su origen, como un master chef historico:', pairs: [['Casabe', 'Yuca (taino)'], ['Mangú', 'Platano (africano)'], ['Pan de trigo', 'Trigo (espanol)'], ['Aji', 'Pimiento picante (taino)'], ['Cafe', 'Grano (africano/arabe)']], explanation: 'La gastronomia dominicana es una fusion de ingredientes y tecnicas tainas, africanas y espanolas.' },
      en: { q: 'Match each food with its origin, like a historical master chef:', pairs: [['Casabe', 'Yuca (Taino)'], ['Mangu', 'Plantain (African)'], ['Wheat bread', 'Wheat (Spanish)'], ['Aji', 'Hot pepper (Taino)'], ['Coffee', 'Bean (African/Arab)']], explanation: 'Dominican gastronomy is a fusion of Taino, African, and Spanish ingredients and techniques.' },
      fr: { q: 'Relie chaque aliment a son origine, comme un master chef historique :', pairs: [['Casabe', 'Manioc (taino)'], ['Mangu', 'Banane plantain (africain)'], ['Pain de ble', 'Ble (espagnol)'], ['Aji', 'Piment (taino)'], ['Cafe', 'Grain (africain/arabe)']], explanation: 'La gastronomie dominicaine est une fusion d\'ingredients et techniques tainos, africaines et espagnoles.' }
    }
  },

  {
    id: 'hist-086', type: 'tf',
    lang: {
      es: { q: 'La pelota del batu era de goma sintetica traida de Europa.', answer: false, explanation: 'La pelota del batu era de latex natural, extraido del arbol de caucho americano. Los europeos desconocian el caucho hasta contactar con los pueblos americanos.' },
      en: { q: 'The batu ball was made of synthetic rubber brought from Europe.', answer: false, explanation: 'The batu ball was made of natural latex, extracted from the American rubber tree. Europeans didn\'t know about rubber until contacting American peoples.' },
      fr: { q: 'La balle de batu etait en caoutchouc synthetique apporte d\'Europe.', answer: false, explanation: 'La balle de batu etait en latex naturel, extrait de l\'arbre a caoutchouc americain. Les Europeens ne connaissaient pas le caoutchouc avant le contact avec les peuples americains.' }
    }
  },

  {
    id: 'hist-087', type: 'mcq',
    lang: {
      es: { q: 'Cuando Colon llego en 1492, estimo que habia entre 250,000 y 1 millon de tainos en La Hispaniola. 50 anos despues, ¿cuantos quedaban aproximadamente?', options: ['Casi los mismos', 'La mitad', 'Unos 500', 'Aumentaron a 2 millones'], answer: 2, explanation: 'La poblacion taina se redujo drasticamente por enfermedades europeas, trabajo forzado y violencia. En 50 anos, de cientos de miles a apenas unos cientos.' },
      en: { q: 'When Columbus arrived in 1492, he estimated 250,000 to 1 million Tainos in Hispaniola. 50 years later, about how many remained?', options: ['About the same', 'Half', 'About 500', 'It grew to 2 million'], answer: 2, explanation: 'The Taino population was decimated by European diseases, forced labor, and violence. In 50 years, from hundreds of thousands to barely a few hundred.' },
      fr: { q: 'Quand Colomb est arrive en 1492, il estimait 250 000 a 1 million de Tainos a Hispaniola. 50 ans plus tard, combien en restait-il environ ?', options: ['A peu pres les memes', 'La moitie', 'Environ 500', 'Augmente a 2 millions'], answer: 2, explanation: 'La population taino fut decimee par les maladies europeennes, le travail force et la violence. En 50 ans, de centaines de milliers a peine quelques centaines.' }
    }
  },

  {
    id: 'hist-088', type: 'fill',
    lang: {
      es: { q: 'Los tainos llamaban a la isla donde estan RD y Haiti "________". Antes de que Colon le cambiara el nombre.', answer: ['Quisqueya', 'quisqueya', 'Haiti', 'Ayiti', 'Bohio', 'Haití'], explanation: 'Los tainos llamaban a la isla Quisqueya ("madre de todas las tierras"), Haiti ("tierra montanosa") o Bohio ("hogar"), segun la region.' },
      en: { q: 'The Tainos called the island where DR and Haiti are "________". Before Columbus renamed it.', answer: ['Quisqueya', 'quisqueya', 'Haiti', 'Ayiti', 'Bohio', 'Haití'], explanation: 'The Tainos called the island Quisqueya ("mother of all lands"), Haiti ("mountainous land"), or Bohio ("home"), depending on the region.' },
      fr: { q: 'Les Tainos appelaient l\'ile ou se trouvent la RD et Haiti "________". Avant que Colomb ne la rebaptise.', answer: ['Quisqueya', 'quisqueya', 'Haiti', 'Ayiti', 'Bohio', 'Haití'], explanation: 'Les Tainos appelaient l\'ile Quisqueya ("mere de toutes les terres"), Haiti ("terre montagneuse") ou Bohio ("maison"), selon la region.' }
    }
  },

  {
    id: 'hist-089', type: 'mcq',
    lang: {
      es: { q: 'El naufragio del Santa Maria en 1492 fue un evento clave. ¿Que hizo Colon con los restos del barco?', options: ['Lo hundio completamente', 'Construyo el Fuerte Navidad con los restos', 'Lo reparo y siguio navegando', 'Lo vendio a los tainos'], answer: 1, explanation: 'Colon uso los restos del Santa Maria para construir el Fuerte Navidad (La Navidad), el primer asentamiento europeo en America, con ayuda de Guacanagarix.' },
      en: { q: 'The wreck of the Santa Maria in 1492 was a key event. What did Columbus do with the ship\'s remains?', options: ['He sank it completely', 'He built Fort Navidad from the remains', 'He repaired it and kept sailing', 'He sold it to the Tainos'], answer: 1, explanation: 'Columbus used the Santa Maria\'s remains to build Fort Navidad (La Navidad), the first European settlement in America, with Guacanagarix\'s help.' },
      fr: { q: 'Le naufrage du Santa Maria en 1492 fut un evenement cle. Qu\'a fait Colomb avec les restes du navire ?', options: ['Il l\'a completement coule', 'Il a construit le Fort Navidad avec les restes', 'Il l\'a repare et a continue a naviguer', 'Il l\'a vendu aux Tainos'], answer: 1, explanation: 'Colomb utilisa les restes du Santa Maria pour construire le Fort Navidad (La Navidad), le premier etablissement europeen en Amerique, avec l\'aide de Guacanagarix.' }
    }
  },

  {
    id: 'hist-090', type: 'tf',
    lang: {
      es: { q: 'La Zona Colonial de Santo Domingo es Patrimonio de la Humanidad de la UNESCO. ¡Como Hogwarts, pero real y en el Caribe!', answer: true, explanation: 'La Zona Colonial de Santo Domingo fue declarada Patrimonio de la Humanidad por la UNESCO en 1990. Contiene las primeras construcciones europeas de America.' },
      en: { q: 'The Colonial Zone of Santo Domingo is a UNESCO World Heritage Site. Like Hogwarts, but real and in the Caribbean!', answer: true, explanation: 'The Colonial Zone of Santo Domingo was declared a UNESCO World Heritage Site in 1990. It contains the first European buildings in the Americas.' },
      fr: { q: 'La Zone Coloniale de Saint-Domingue est un site du Patrimoine Mondial de l\'UNESCO. Comme Poudlard, mais reel et dans les Caraibes !', answer: true, explanation: 'La Zone Coloniale de Saint-Domingue a ete declaree Patrimoine Mondial de l\'UNESCO en 1990. Elle contient les premiers batiments europeens des Ameriques.' }
    }
  },

  // ---- 91-100: Mixed review & advanced ----

  {
    id: 'hist-091', type: 'match',
    lang: {
      es: { q: 'Conecta cada resistente historico con su forma de lucha principal:', pairs: [['Enriquillo', 'Guerrilla y negociacion diplomatica'], ['Anacaona', 'Resistencia cultural y politica'], ['Sebastian Lemba', 'Cimarronaje y palenques'], ['Cotubanama', 'Resistencia armada directa']], explanation: 'Cada lider encontro su propia forma de resistir la opresion colonial, desde la diplomacia hasta la lucha armada.' },
      en: { q: 'Match each historical resister with their main form of struggle:', pairs: [['Enriquillo', 'Guerrilla warfare and diplomacy'], ['Anacaona', 'Cultural and political resistance'], ['Sebastian Lemba', 'Marronage and palenques'], ['Cotubanama', 'Direct armed resistance']], explanation: 'Each leader found their own way to resist colonial oppression, from diplomacy to armed struggle.' },
      fr: { q: 'Relie chaque resistant historique a sa forme de lutte principale :', pairs: [['Enriquillo', 'Guerilla et negociation diplomatique'], ['Anacaona', 'Resistance culturelle et politique'], ['Sebastian Lemba', 'Marronnage et palenques'], ['Cotubanama', 'Resistance armee directe']], explanation: 'Chaque leader a trouve sa propre facon de resister a l\'oppression coloniale, de la diplomatie a la lutte armee.' }
    }
  },

  {
    id: 'hist-092', type: 'mcq',
    lang: {
      es: { q: '¿Por que es importante que un juego como ArcLycee ensene sobre la historia taina? Piensa como un personaje de Gravity Falls investigando misterios.', options: ['Solo para sacar buenas notas', 'Para conocer nuestras raices, proteger el patrimonio y no repetir errores del pasado', 'Para ser mejores en videojuegos', 'No es importante en absoluto'], answer: 1, explanation: 'Conocer nuestra historia nos permite valorar nuestro patrimonio, entender nuestra identidad y trabajar por un futuro mas justo.' },
      en: { q: 'Why is it important for a game like ArcLycee to teach Taino history? Think like a Gravity Falls character investigating mysteries.', options: ['Only to get good grades', 'To know our roots, protect heritage, and not repeat past mistakes', 'To be better at videogames', 'It\'s not important at all'], answer: 1, explanation: 'Knowing our history allows us to value our heritage, understand our identity, and work for a more just future.' },
      fr: { q: 'Pourquoi est-il important qu\'un jeu comme ArcLycee enseigne l\'histoire taino ? Pense comme un personnage de Gravity Falls enquetant sur des mysteres.', options: ['Juste pour avoir de bonnes notes', 'Pour connaitre nos racines, proteger le patrimoine et ne pas repeter les erreurs du passe', 'Pour etre meilleur aux jeux video', 'Ce n\'est pas important du tout'], answer: 1, explanation: 'Connaitre notre histoire nous permet de valoriser notre patrimoine, comprendre notre identite et travailler pour un avenir plus juste.' }
    }
  },

  {
    id: 'hist-093', type: 'tf',
    lang: {
      es: { q: 'En ArcLycee, el combate contra el pez leon tiene opciones ecologicas porque el pez leon es una especie invasora real en el Caribe.', answer: true, explanation: 'El pez leon (Pterois volitans) es una especie invasora real en el Caribe que amenaza los arrecifes. El juego ensena formas reales de combatirlo.' },
      en: { q: 'In ArcLycee, the lionfish combat has ecological options because the lionfish is a real invasive species in the Caribbean.', answer: true, explanation: 'The lionfish (Pterois volitans) is a real invasive species in the Caribbean that threatens reefs. The game teaches real ways to combat it.' },
      fr: { q: 'Dans ArcLycee, le combat contre le poisson-lion a des options ecologiques car le poisson-lion est une vraie espece invasive dans les Caraibes.', answer: true, explanation: 'Le poisson-lion (Pterois volitans) est une veritable espece invasive dans les Caraibes qui menace les recifs. Le jeu enseigne de vraies facons de le combattre.' }
    }
  },

  {
    id: 'hist-094', type: 'fill',
    lang: {
      es: { q: 'El cacique ________ gobernaba Xaragua junto con su hermano Bohechio. Era poetisa y fue ejecutada en 1503.', answer: ['Anacaona', 'anacaona'], explanation: 'Anacaona ("Flor de Oro") fue la cacica de Xaragua tras la muerte de su hermano Bohechio. Fue ejecutada por Ovando en 1503.' },
      en: { q: 'The cacique ________ ruled Xaragua along with her brother Bohechio. She was a poet and was executed in 1503.', answer: ['Anacaona', 'anacaona'], explanation: 'Anacaona ("Golden Flower") was the cacica of Xaragua after her brother Bohechio\'s death. She was executed by Ovando in 1503.' },
      fr: { q: 'La cacique ________ gouvernait Xaragua avec son frere Bohechio. C\'etait une poetesse et elle fut executee en 1503.', answer: ['Anacaona', 'anacaona'], explanation: 'Anacaona ("Fleur d\'Or") fut la cacique de Xaragua apres la mort de son frere Bohechio. Elle fut executee par Ovando en 1503.' }
    }
  },

  {
    id: 'hist-095', type: 'mcq',
    lang: {
      es: { q: 'Imagina que encuentras un cemi en una cueva. ¿Que deberias hacer segun la Ley 318-68?', options: ['Llevartelo a casa como souvenir', 'Venderlo en internet', 'No tocarlo y avisar a las autoridades o a un arqueologo', 'Ponerlo en tu mochila y donarlo a un museo'], answer: 2, explanation: 'Lo correcto es no tocar el artefacto y avisar a las autoridades. Moverlo destruye su contexto arqueologico y es ilegal.' },
      en: { q: 'Imagine you find a cemi in a cave. What should you do according to Law 318-68?', options: ['Take it home as a souvenir', 'Sell it online', 'Don\'t touch it and notify authorities or an archaeologist', 'Put it in your backpack and donate it to a museum'], answer: 2, explanation: 'The right thing is not to touch the artifact and notify authorities. Moving it destroys its archaeological context and is illegal.' },
      fr: { q: 'Imagine que tu trouves un cemi dans une grotte. Que devrais-tu faire selon la Loi 318-68 ?', options: ['Le ramener chez toi comme souvenir', 'Le vendre sur internet', 'Ne pas le toucher et prevenir les autorites ou un archeologue', 'Le mettre dans ton sac et le donner a un musee'], answer: 2, explanation: 'La bonne chose est de ne pas toucher l\'artefact et de prevenir les autorites. Le deplacer detruit son contexte archeologique et est illegal.' }
    }
  },

  {
    id: 'hist-096', type: 'tf',
    lang: {
      es: { q: 'Bartolome de las Casas denuncio los abusos contra los tainos. Fue como el primer activista de derechos humanos en America.', answer: true, explanation: 'Bartolome de las Casas fue un fraile dominico que documento y denuncio los horrores de la colonizacion en su "Brevisima Relacion de la Destruccion de las Indias".' },
      en: { q: 'Bartolome de las Casas denounced the abuses against the Tainos. He was like the first human rights activist in the Americas.', answer: true, explanation: 'Bartolome de las Casas was a Dominican friar who documented and denounced the horrors of colonization in his "Short Account of the Destruction of the Indies".' },
      fr: { q: 'Bartolome de las Casas a denonce les abus contre les Tainos. Il fut comme le premier activiste des droits humains en Amerique.', answer: true, explanation: 'Bartolome de las Casas fut un frere dominicain qui documenta et denonca les horreurs de la colonisation dans sa "Tres Breve Relation de la Destruction des Indes".' }
    }
  },

  {
    id: 'hist-097', type: 'mcq',
    lang: {
      es: { q: 'ArcLycee tiene multiples finales, como un juego de Telltale. ¿Que determina si obtienes el final pacifista?', options: ['Tener mucho oro', 'Resolver todos los combates sin violencia', 'Matar a todos los enemigos', 'Tener todos los companeros'], answer: 1, explanation: 'El final pacifista requiere completar 8+ nodos del juego y resolver TODOS los combates de forma pacifica (convencimiento, no violencia).' },
      en: { q: 'ArcLycee has multiple endings, like a Telltale game. What determines if you get the pacifist ending?', options: ['Having lots of gold', 'Resolving all combats without violence', 'Killing all enemies', 'Having all companions'], answer: 1, explanation: 'The pacifist ending requires completing 8+ game nodes and resolving ALL combats peacefully (persuasion, not violence).' },
      fr: { q: 'ArcLycee a plusieurs fins, comme un jeu Telltale. Qu\'est-ce qui determine si tu obtiens la fin pacifiste ?', options: ['Avoir beaucoup d\'or', 'Resoudre tous les combats sans violence', 'Tuer tous les ennemis', 'Avoir tous les compagnons'], answer: 1, explanation: 'La fin pacifiste requiert de completer 8+ noeuds du jeu et resoudre TOUS les combats pacifiquement (persuasion, pas de violence).' }
    }
  },

  {
    id: 'hist-098', type: 'match',
    lang: {
      es: { q: 'Conecta cada siglo con los eventos mas importantes de La Hispaniola:', pairs: [['Siglo XV (1400s)', 'Llegada de Colon, fundacion de La Isabela'], ['Siglo XVI (1500s)', 'Rebelion de Enriquillo, cimarrones de Lemba'], ['Antes de 1492', 'Civilizacion taina en su esplendor'], ['Siglo XXI (2000s)', 'Proteccion del patrimonio, arqueologia moderna']], explanation: 'La historia de La Hispaniola abarca miles de anos, desde los tainos hasta la proteccion moderna del patrimonio.' },
      en: { q: 'Match each century with the most important events of Hispaniola:', pairs: [['15th century (1400s)', 'Columbus arrives, La Isabela founded'], ['16th century (1500s)', 'Enriquillo\'s rebellion, Lemba\'s maroons'], ['Before 1492', 'Taino civilization at its peak'], ['21st century (2000s)', 'Heritage protection, modern archaeology']], explanation: 'Hispaniola\'s history spans thousands of years, from the Tainos to modern heritage protection.' },
      fr: { q: 'Relie chaque siecle aux evenements les plus importants d\'Hispaniola :', pairs: [['XVe siecle (1400)', 'Arrivee de Colomb, fondation de La Isabela'], ['XVIe siecle (1500)', 'Rebellion d\'Enriquillo, marrons de Lemba'], ['Avant 1492', 'Civilisation taino a son apogee'], ['XXIe siecle (2000)', 'Protection du patrimoine, archeologie moderne']], explanation: 'L\'histoire d\'Hispaniola s\'etend sur des milliers d\'annees, des Tainos a la protection moderne du patrimoine.' }
    }
  },

  {
    id: 'hist-099', type: 'tf',
    lang: {
      es: { q: 'Los crocodrilos americanos del Lago Enriquillo son los unicos cocodrilos que viven en agua salada en todo el Caribe insular.', answer: true, explanation: 'Los Crocodylus acutus del Lago Enriquillo son una poblacion unica que se ha adaptado a vivir en agua hipersalina, algo raro para esta especie.' },
      en: { q: 'The American crocodiles of Lake Enriquillo are the only crocodiles living in saltwater in the entire insular Caribbean.', answer: true, explanation: 'The Crocodylus acutus of Lake Enriquillo are a unique population adapted to living in hypersaline water, which is rare for this species.' },
      fr: { q: 'Les crocodiles americains du Lac Enriquillo sont les seuls crocodiles vivant en eau salee dans toutes les Caraibes insulaires.', answer: true, explanation: 'Les Crocodylus acutus du Lac Enriquillo sont une population unique adaptee a vivre en eau hypersaline, ce qui est rare pour cette espece.' }
    }
  },

  {
    id: 'hist-100', type: 'mcq',
    lang: {
      es: { q: 'Ultima pregunta, nivel boss final: ¿Cual es el mensaje principal de ArcLycee sobre la historia dominicana?', options: ['Que el pasado no importa', 'Que solo los europeos hicieron cosas importantes', 'Que nuestro patrimonio trietnico (taino, africano, espanol) es valioso y debemos conocerlo y protegerlo', 'Que la arqueologia es aburrida'], answer: 2, explanation: 'ArcLycee ensena que la identidad dominicana es una rica fusion de herencias taina, africana y espanola, y que proteger este patrimonio es responsabilidad de todos.' },
      en: { q: 'Final question, boss fight level: What is ArcLycee\'s main message about Dominican history?', options: ['That the past doesn\'t matter', 'That only Europeans did important things', 'That our tri-ethnic heritage (Taino, African, Spanish) is valuable and we must know and protect it', 'That archaeology is boring'], answer: 2, explanation: 'ArcLycee teaches that Dominican identity is a rich fusion of Taino, African, and Spanish heritages, and that protecting this patrimony is everyone\'s responsibility.' },
      fr: { q: 'Derniere question, niveau boss final : quel est le message principal d\'ArcLycee sur l\'histoire dominicaine ?', options: ['Que le passe n\'a pas d\'importance', 'Que seuls les Europeens ont fait des choses importantes', 'Que notre patrimoine triethnique (taino, africain, espagnol) est precieux et que nous devons le connaitre et le proteger', 'Que l\'archeologie est ennuyeuse'], answer: 2, explanation: 'ArcLycee enseigne que l\'identite dominicaine est une riche fusion d\'heritages taino, africain et espagnol, et que proteger ce patrimoine est la responsabilite de tous.' }
    }
  }

];
