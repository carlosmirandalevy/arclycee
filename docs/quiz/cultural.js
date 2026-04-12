// cultural.js — 100 preguntas trilingües sobre diversidad cultural y conciencia patrimonial
// Parte del sistema de quiz de ArcLycée
// Cubre: identidad tri-étnica dominicana, cultura taína, herencia africana,
// complejidad colonial, preservación cultural, diversidad lingüística
//
// Tipos: tf (verdadero/falso), mcq (opción múltiple), fill (completar), match (emparejar)
// 25 preguntas de cada tipo, distribuidas equitativamente

window.ARC_QUESTIONS = window.ARC_QUESTIONS || {};
window.ARC_QUESTIONS.cultural = [

  // =============================================
  // VERDADERO O FALSO (tf) — 25 preguntas
  // =============================================

  {
    id: 'cul-001', type: 'tf',
    lang: {
      es: { q: 'La identidad dominicana es una mezcla de tres raíces principales: taína, española y africana.', answer: true, explanation: '¡Exacto! Como Miles Morales, que es afrolatino y tiene múltiples identidades, la cultura dominicana es una fusión de tres herencias que la hacen única.' },
      en: { q: 'Dominican identity is a blend of three main roots: Taíno, Spanish, and African.', answer: true, explanation: 'Exactly! Like Miles Morales being Afro-Latino with multiple identities, Dominican culture is a fusion of three heritages that makes it unique.' },
      fr: { q: "L'identité dominicaine est un mélange de trois racines principales : taïno, espagnole et africaine.", answer: true, explanation: "Exactement ! Comme Miles Morales, afro-latino avec de multiples identités, la culture dominicaine est une fusion de trois héritages qui la rend unique." }
    }
  },
  {
    id: 'cul-002', type: 'tf',
    lang: {
      es: { q: 'Los cemíes eran figuras decorativas sin ningún significado espiritual para los taínos.', answer: false, explanation: 'Los cemíes eran figuras sagradas que representaban espíritus y ancestros. Imagina destruir los Horrocruxes de Voldemort — así de importante era proteger los cemíes para los taínos.' },
      en: { q: 'Cemíes were purely decorative figures with no spiritual meaning for the Taínos.', answer: false, explanation: 'Cemíes were sacred figures representing spirits and ancestors. Imagine destroying Voldemort\'s Horcruxes — that\'s how important protecting cemíes was for the Taínos.' },
      fr: { q: "Les cemíes étaient des figures purement décoratives sans signification spirituelle pour les Taïnos.", answer: false, explanation: "Les cemíes étaient des figures sacrées représentant des esprits et des ancêtres. Imagine détruire les Horcruxes de Voldemort — c'est à quel point protéger les cemíes était important pour les Taïnos." }
    }
  },
  {
    id: 'cul-003', type: 'tf',
    lang: {
      es: { q: 'La palabra "hamaca" viene del idioma taíno y se usa en muchos idiomas del mundo.', answer: true, explanation: '¡Sí! "Hamaca" es una de las muchas palabras taínas que sobreviven hoy. También "huracán", "canoa" y "barbacoa". Los taínos literalmente inventaron el chill. 🏖️' },
      en: { q: 'The word "hammock" comes from the Taíno language and is used in many world languages.', answer: true, explanation: 'Yes! "Hammock" is one of many Taíno words that survive today. Also "hurricane", "canoe", and "barbecue". The Taínos literally invented chill vibes.' },
      fr: { q: 'Le mot "hamac" vient de la langue taïno et est utilisé dans de nombreuses langues du monde.', answer: true, explanation: 'Oui ! "Hamac" est l\'un des nombreux mots taïnos qui survivent aujourd\'hui. Aussi "ouragan", "canoë" et "barbecue". Les Taïnos ont littéralement inventé le mode détente.' }
    }
  },
  {
    id: 'cul-004', type: 'tf',
    lang: {
      es: { q: 'Sebastián Lemba fue un líder cimarrón africano que estableció un palenque en las montañas de la isla alrededor de 1540.', answer: true, explanation: 'Lemba fue un verdadero héroe de la resistencia. Su palenque en las montañas era como la base rebelde de Star Wars: un refugio secreto donde los esclavizados encontraban libertad.' },
      en: { q: 'Sebastián Lemba was an African maroon leader who established a palenque in the island\'s mountains around 1540.', answer: true, explanation: 'Lemba was a true resistance hero. His palenque in the mountains was like the rebel base in Star Wars: a secret refuge where enslaved people found freedom.' },
      fr: { q: 'Sebastián Lemba était un chef marron africain qui a établi un palenque dans les montagnes de l\'île vers 1540.', answer: true, explanation: 'Lemba était un vrai héros de la résistance. Son palenque dans les montagnes était comme la base rebelle de Star Wars : un refuge secret où les esclaves trouvaient la liberté.' }
    }
  },
  {
    id: 'cul-005', type: 'tf',
    lang: {
      es: { q: 'La Zona Colonial de Santo Domingo es Patrimonio de la Humanidad de la UNESCO por ser el primer asentamiento europeo permanente en América.', answer: true, explanation: 'Es como el nivel tutorial de la colonización — el primer lugar donde Europa y América se encontraron permanentemente. Por eso protegerlo importa tanto.' },
      en: { q: 'The Zona Colonial in Santo Domingo is a UNESCO World Heritage Site as the first permanent European settlement in the Americas.', answer: true, explanation: 'It\'s like the tutorial level of colonization — the first place where Europe and the Americas permanently met. That\'s why protecting it matters so much.' },
      fr: { q: 'La Zona Colonial de Saint-Domingue est un site du patrimoine mondial de l\'UNESCO en tant que premier établissement européen permanent dans les Amériques.', answer: true, explanation: "C'est comme le niveau tutoriel de la colonisation — le premier endroit où l'Europe et les Amériques se sont rencontrées de façon permanente. C'est pourquoi le protéger est si important." }
    }
  },
  {
    id: 'cul-006', type: 'tf',
    lang: {
      es: { q: 'Los taínos vivían en bohíos, que eran casas circulares con techo de paja de palma.', answer: true, explanation: 'Los bohíos eran geniales: diseñados para resistir huracanes (los taínos sabían de eso, ¡ellos le dieron nombre!) y mantenerse frescos en el trópico. Arquitectura inteligente nivel pro.' },
      en: { q: 'The Taínos lived in bohíos, which were circular houses with palm-thatched roofs.', answer: true, explanation: 'Bohíos were genius: designed to withstand hurricanes (the Taínos knew about those, they named them!) and stay cool in the tropics. Pro-level smart architecture.' },
      fr: { q: 'Les Taïnos vivaient dans des bohíos, des maisons circulaires aux toits de palme tressée.', answer: true, explanation: 'Les bohíos étaient géniaux : conçus pour résister aux ouragans (les Taïnos les connaissaient bien, ils les ont nommés !) et rester frais sous les tropiques. Architecture intelligente niveau pro.' }
    }
  },
  {
    id: 'cul-007', type: 'tf',
    lang: {
      es: { q: 'El casabe, hecho de yuca, sigue siendo un alimento básico en República Dominicana, heredado de los taínos.', answer: true, explanation: 'Cada vez que comes casabe, estás comiendo historia taína de más de 500 años. Es como si un alimento fuera un save file de la cultura que nunca se corrompió.' },
      en: { q: 'Casabe, made from yuca/cassava, is still a staple food in the Dominican Republic, inherited from the Taínos.', answer: true, explanation: 'Every time you eat casabe, you\'re eating Taíno history over 500 years old. It\'s like a save file of culture that never got corrupted.' },
      fr: { q: 'Le casabe, fait de yuca/manioc, reste un aliment de base en République dominicaine, hérité des Taïnos.', answer: true, explanation: 'Chaque fois que tu manges du casabe, tu manges une histoire taïno de plus de 500 ans. C\'est comme un fichier de sauvegarde culturel qui n\'a jamais été corrompu.' }
    }
  },
  {
    id: 'cul-008', type: 'tf',
    lang: {
      es: { q: 'Anacaona fue una cacica, poeta y líder del cacicazgo de Xaragua.', answer: true, explanation: 'Anacaona era una mujer multitalento: líder política, poeta y artista. Si existiera hoy, tendría millones de seguidores. Fue ejecutada injustamente por Ovando en 1503.' },
      en: { q: 'Anacaona was a cacica, poet, and leader of the Xaragua chiefdom.', answer: true, explanation: 'Anacaona was a multi-talented woman: political leader, poet, and artist. If she existed today, she\'d have millions of followers. She was unjustly executed by Ovando in 1503.' },
      fr: { q: 'Anacaona était une cacica, poétesse et dirigeante du caciquat de Xaragua.', answer: true, explanation: "Anacaona était une femme multi-talentueuse : leader politique, poétesse et artiste. Si elle existait aujourd'hui, elle aurait des millions d'abonnés. Elle fut injustement exécutée par Ovando en 1503." }
    }
  },
  {
    id: 'cul-009', type: 'tf',
    lang: {
      es: { q: 'El colonialismo fue simplemente una historia de "buenos contra malos" sin complejidades.', answer: false, explanation: 'La historia real es más compleja que cualquier serie de Netflix. Hubo conquista Y resistencia, destrucción Y mestizaje. Entender esa complejidad nos hace más inteligentes.' },
      en: { q: 'Colonialism was simply a "good vs evil" story with no complexities.', answer: false, explanation: 'Real history is more complex than any Netflix series. There was conquest AND resistance, destruction AND mestizaje/mixing. Understanding that complexity makes us smarter.' },
      fr: { q: 'Le colonialisme était simplement une histoire de "bons contre méchants" sans complexités.', answer: false, explanation: "L'histoire réelle est plus complexe que n'importe quelle série Netflix. Il y a eu conquête ET résistance, destruction ET métissage. Comprendre cette complexité nous rend plus intelligents." }
    }
  },
  {
    id: 'cul-010', type: 'tf',
    lang: {
      es: { q: 'Los palenques eran comunidades de personas esclavizadas que escaparon y vivían libres en las montañas.', answer: true, explanation: 'Los palenques eran las primeras comunidades libres de América. Como una versión real de Wakanda: lugares escondidos donde la gente preservaba su cultura y su libertad.' },
      en: { q: 'Palenques were communities of enslaved people who escaped and lived freely in the mountains.', answer: true, explanation: 'Palenques were the first free communities in the Americas. Like a real-life Wakanda: hidden places where people preserved their culture and freedom.' },
      fr: { q: 'Les palenques étaient des communautés de personnes asservies qui s\'échappaient et vivaient librement dans les montagnes.', answer: true, explanation: "Les palenques étaient les premières communautés libres des Amériques. Comme un vrai Wakanda : des lieux cachés où les gens préservaient leur culture et leur liberté." }
    }
  },
  {
    id: 'cul-011', type: 'tf',
    lang: {
      es: { q: 'Enriquillo usó la ley española para negociar un tratado de paz, lo que muestra su educación bicultural.', answer: true, explanation: 'Enriquillo fue educado por frailes y usó ese conocimiento como herramienta. Es como un hacker que usa el sistema contra sí mismo — resistencia inteligente.' },
      en: { q: 'Enriquillo used Spanish law to negotiate a peace treaty, showing his bicultural education.', answer: true, explanation: 'Enriquillo was educated by friars and used that knowledge as a tool. Like a hacker using the system against itself — smart resistance.' },
      fr: { q: 'Enriquillo a utilisé le droit espagnol pour négocier un traité de paix, montrant son éducation biculturelle.', answer: true, explanation: 'Enriquillo a été éduqué par des frères et a utilisé ces connaissances comme outil. Comme un hacker qui utilise le système contre lui-même — résistance intelligente.' }
    }
  },
  {
    id: 'cul-012', type: 'tf',
    lang: {
      es: { q: 'La palabra "huracán" proviene del inglés y fue adoptada por los taínos.', answer: false, explanation: '¡Al revés! "Huracán" viene del taíno Juracán, el dios de las tormentas. El inglés, español, francés y otros idiomas adoptaron esta palabra taína. Los taínos nombraron el fenómeno primero.' },
      en: { q: 'The word "hurricane" comes from English and was adopted by the Taínos.', answer: false, explanation: 'Other way around! "Hurricane" comes from the Taíno Juracán, the god of storms. English, Spanish, French and other languages adopted this Taíno word. The Taínos named it first.' },
      fr: { q: 'Le mot "ouragan" vient de l\'anglais et a été adopté par les Taïnos.', answer: false, explanation: "C'est l'inverse ! \"Ouragan\" vient du taïno Juracán, le dieu des tempêtes. L'anglais, l'espagnol, le français et d'autres langues ont adopté ce mot taïno. Les Taïnos l'ont nommé en premier." }
    }
  },
  {
    id: 'cul-013', type: 'tf',
    lang: {
      es: { q: 'Los behiques eran los sacerdotes y curanderos de la sociedad taína.', answer: true, explanation: 'Los behiques eran como los Jedi de los taínos: sanadores, consejeros espirituales y guardianes del conocimiento ancestral. Usaban plantas medicinales y rituales de curación.' },
      en: { q: 'Behiques were the priests and healers of Taíno society.', answer: true, explanation: 'Behiques were like the Jedi of the Taínos: healers, spiritual advisors, and guardians of ancestral knowledge. They used medicinal plants and healing rituals.' },
      fr: { q: 'Les behiques étaient les prêtres et guérisseurs de la société taïno.', answer: true, explanation: 'Les behiques étaient comme les Jedi des Taïnos : guérisseurs, conseillers spirituels et gardiens du savoir ancestral. Ils utilisaient des plantes médicinales et des rituels de guérison.' }
    }
  },
  {
    id: 'cul-014', type: 'tf',
    lang: {
      es: { q: 'ArcLycée está disponible solo en español porque trata sobre la República Dominicana.', answer: false, explanation: 'ArcLycée es trilingüe (español, inglés y francés), reflejando la realidad multilingüe dominicana y la comunidad del Liceo Francés. La cultura no tiene un solo idioma.' },
      en: { q: 'ArcLycée is only available in Spanish because it\'s about the Dominican Republic.', answer: false, explanation: 'ArcLycée is trilingual (Spanish, English, and French), reflecting the Dominican multilingual reality and the Lycée Français community. Culture doesn\'t have just one language.' },
      fr: { q: 'ArcLycée n\'est disponible qu\'en espagnol car il traite de la République dominicaine.', answer: false, explanation: "ArcLycée est trilingue (espagnol, anglais et français), reflétant la réalité multilingue dominicaine et la communauté du Lycée Français. La culture n'a pas qu'une seule langue." }
    }
  },
  {
    id: 'cul-015', type: 'tf',
    lang: {
      es: { q: 'El batú era un juego de pelota taíno que se jugaba en un campo llamado batey.', answer: true, explanation: 'El batú era el deporte nacional taíno — como el fútbol de hoy. Se jugaba con una pelota de goma en un batey y los jugadores usaban caderas, hombros y rodillas. ¡Nada de manos!' },
      en: { q: 'Batú was a Taíno ball game played on a field called a batey.', answer: true, explanation: 'Batú was the Taíno national sport — like soccer today. It was played with a rubber ball on a batey and players used hips, shoulders, and knees. No hands allowed!' },
      fr: { q: 'Le batú était un jeu de balle taïno qui se jouait sur un terrain appelé batey.', answer: true, explanation: 'Le batú était le sport national taïno — comme le football aujourd\'hui. On jouait avec une balle en caoutchouc sur un batey et les joueurs utilisaient hanches, épaules et genoux. Pas de mains !' }
    }
  },
  {
    id: 'cul-016', type: 'tf',
    lang: {
      es: { q: 'Mencía fue educada junto a Enriquillo y participó como co-líder en la resistencia.', answer: true, explanation: 'Mencía no fue solo "la esposa de Enriquillo" — fue una líder en su propio derecho, educada y estratégica. La historia a menudo borra a las mujeres líderes, pero ellas siempre estuvieron ahí.' },
      en: { q: 'Mencía was educated alongside Enriquillo and participated as co-leader in the resistance.', answer: true, explanation: 'Mencía wasn\'t just "Enriquillo\'s wife" — she was a leader in her own right, educated and strategic. History often erases women leaders, but they were always there.' },
      fr: { q: 'Mencía a été éduquée aux côtés d\'Enriquillo et a participé en tant que co-leader de la résistance.', answer: true, explanation: "Mencía n'était pas juste \"la femme d'Enriquillo\" — elle était une leader à part entière, éduquée et stratégique. L'histoire efface souvent les femmes leaders, mais elles étaient toujours là." }
    }
  },
  {
    id: 'cul-017', type: 'tf',
    lang: {
      es: { q: 'Los tambores africanos en la cultura dominicana son solo instrumentos musicales sin significado cultural profundo.', answer: false, explanation: 'Los tambores eran mucho más que música: eran comunicación, resistencia, identidad y espiritualidad. En los palenques, los tambores mantenían viva la conexión con África.' },
      en: { q: 'African drums in Dominican culture are just musical instruments with no deep cultural meaning.', answer: false, explanation: 'Drums were much more than music: they were communication, resistance, identity, and spirituality. In the palenques, drums kept the connection to Africa alive.' },
      fr: { q: 'Les tambours africains dans la culture dominicaine ne sont que des instruments de musique sans signification culturelle profonde.', answer: false, explanation: "Les tambours étaient bien plus que de la musique : communication, résistance, identité et spiritualité. Dans les palenques, les tambours maintenaient vivante la connexion avec l'Afrique." }
    }
  },
  {
    id: 'cul-018', type: 'tf',
    lang: {
      es: { q: 'Los conucos eran el sistema agrícola de los taínos, donde cultivaban yuca, maíz, batata y otros alimentos.', answer: true, explanation: 'Los conucos eran agricultura de nivel experto: montículos que mejoraban el drenaje y la fertilidad. Los taínos alimentaban a miles de personas con este sistema sostenible.' },
      en: { q: 'Conucos were the Taíno farming system where they grew yuca, corn, sweet potato, and other foods.', answer: true, explanation: 'Conucos were expert-level agriculture: mounds that improved drainage and fertility. The Taínos fed thousands of people with this sustainable system.' },
      fr: { q: 'Les conucos étaient le système agricole des Taïnos, où ils cultivaient le yuca, le maïs, la patate douce et d\'autres aliments.', answer: true, explanation: 'Les conucos étaient de l\'agriculture niveau expert : des buttes qui amélioraient le drainage et la fertilité. Les Taïnos nourrissaient des milliers de personnes avec ce système durable.' }
    }
  },
  {
    id: 'cul-019', type: 'tf',
    lang: {
      es: { q: 'Proteger los sitios arqueológicos solo importa para los historiadores, no para la gente común.', answer: false, explanation: '¿Conocer tus raíces no importa? Proteger el patrimonio es como proteger el código fuente de tu identidad. Sin él, no sabes de dónde vienes ni quién eres realmente.' },
      en: { q: 'Protecting archaeological sites only matters for historians, not for ordinary people.', answer: false, explanation: 'Doesn\'t knowing your roots matter? Protecting heritage is like protecting the source code of your identity. Without it, you don\'t know where you come from or who you really are.' },
      fr: { q: 'Protéger les sites archéologiques n\'intéresse que les historiens, pas les gens ordinaires.', answer: false, explanation: "Connaître tes racines, ça ne compte pas ? Protéger le patrimoine, c'est comme protéger le code source de ton identité. Sans lui, tu ne sais pas d'où tu viens ni qui tu es vraiment." }
    }
  },
  {
    id: 'cul-020', type: 'tf',
    lang: {
      es: { q: 'Las maracas y güiros usados en la música dominicana tienen origen taíno.', answer: true, explanation: 'Cada vez que suena una maraca o un güiro en merengue o bachata, suena un eco taíno de más de 500 años. La música dominicana lleva la herencia taína en su ADN rítmico.' },
      en: { q: 'The maracas and güiros used in Dominican music have Taíno origins.', answer: true, explanation: 'Every time a maraca or güiro sounds in merengue or bachata, a Taíno echo of over 500 years rings out. Dominican music carries Taíno heritage in its rhythmic DNA.' },
      fr: { q: 'Les maracas et güiros utilisés dans la musique dominicaine ont des origines taïno.', answer: true, explanation: 'Chaque fois qu\'un maraca ou güiro résonne dans le merengue ou la bachata, un écho taïno de plus de 500 ans retentit. La musique dominicaine porte l\'héritage taïno dans son ADN rythmique.' }
    }
  },
  {
    id: 'cul-021', type: 'tf',
    lang: {
      es: { q: 'Un yucayeque era una ciudad fortificada taína con murallas de piedra.', answer: false, explanation: 'Un yucayeque era una aldea taína, no una fortaleza. Estaba organizada alrededor de un batey central con bohíos y un caney (la casa del cacique). Era una comunidad, no un castillo.' },
      en: { q: 'A yucayeque was a fortified Taíno city with stone walls.', answer: false, explanation: 'A yucayeque was a Taíno village, not a fortress. It was organized around a central batey with bohíos and a caney (the chief\'s house). It was a community, not a castle.' },
      fr: { q: 'Un yucayeque était une cité taïno fortifiée avec des murs de pierre.', answer: false, explanation: "Un yucayeque était un village taïno, pas une forteresse. Il était organisé autour d'un batey central avec des bohíos et un caney (la maison du cacique). C'était une communauté, pas un château." }
    }
  },
  {
    id: 'cul-022', type: 'tf',
    lang: {
      es: { q: 'La palabra "canoa" viene del taíno y es una de las primeras palabras indígenas americanas adoptadas por los europeos.', answer: true, explanation: 'Cuando Colón vio las canoas taínas, no tenía palabra para describirlas. Así que adoptó la palabra taína. Es una de las primeras transferencias lingüísticas del Nuevo Mundo al Viejo.' },
      en: { q: 'The word "canoe" comes from Taíno and is one of the first indigenous American words adopted by Europeans.', answer: true, explanation: 'When Columbus saw Taíno canoes, he had no word to describe them. So he adopted the Taíno word. It\'s one of the first linguistic transfers from the New World to the Old.' },
      fr: { q: 'Le mot "canoë" vient du taïno et est l\'un des premiers mots indigènes américains adoptés par les Européens.', answer: true, explanation: "Quand Colomb a vu les canoës taïnos, il n'avait pas de mot pour les décrire. Il a donc adopté le mot taïno. C'est l'un des premiers transferts linguistiques du Nouveau Monde vers l'Ancien." }
    }
  },
  {
    id: 'cul-023', type: 'tf',
    lang: {
      es: { q: 'Representar culturas con estereotipos en los videojuegos no causa ningún daño real.', answer: false, explanation: 'Los estereotipos en medios sí importan: moldean cómo la gente ve otras culturas. Un buen juego, como ArcLycée, presenta las culturas con respeto y complejidad, no como caricaturas.' },
      en: { q: 'Representing cultures with stereotypes in video games causes no real harm.', answer: false, explanation: 'Stereotypes in media do matter: they shape how people see other cultures. A good game, like ArcLycée, presents cultures with respect and complexity, not as caricatures.' },
      fr: { q: 'Représenter les cultures avec des stéréotypes dans les jeux vidéo ne cause aucun tort réel.', answer: false, explanation: "Les stéréotypes dans les médias comptent : ils façonnent la façon dont les gens voient les autres cultures. Un bon jeu, comme ArcLycée, présente les cultures avec respect et complexité, pas comme des caricatures." }
    }
  },
  {
    id: 'cul-024', type: 'tf',
    lang: {
      es: { q: 'El areíto era una ceremonia taína que combinaba danza, canto y narrativa oral para transmitir la historia del pueblo.', answer: true, explanation: 'El areíto era el TikTok de los taínos — pero en serio. Era así como pasaban su historia de generación en generación, sin escritura, usando música y movimiento. Tradición oral nivel legendario.' },
      en: { q: 'The areíto was a Taíno ceremony that combined dance, song, and oral narrative to transmit the people\'s history.', answer: true, explanation: 'The areíto was the Taínos\' TikTok — but for real. That\'s how they passed their history from generation to generation, without writing, using music and movement. Legendary-level oral tradition.' },
      fr: { q: 'L\'areíto était une cérémonie taïno qui combinait danse, chant et récit oral pour transmettre l\'histoire du peuple.', answer: true, explanation: "L'areíto était le TikTok des Taïnos — mais pour de vrai. C'est ainsi qu'ils transmettaient leur histoire de génération en génération, sans écriture, en utilisant musique et mouvement. Tradition orale niveau légendaire." }
    }
  },
  {
    id: 'cul-025', type: 'tf',
    lang: {
      es: { q: 'La "barbacoa" es una invención estadounidense moderna sin raíces indígenas.', answer: false, explanation: '¡"Barbacoa" es una palabra taína! Los taínos cocinaban carne sobre una estructura de madera elevada. Los europeos adoptaron la técnica y la palabra. Así que cada BBQ es un homenaje taíno.' },
      en: { q: '"Barbecue" is a modern American invention with no indigenous roots.', answer: false, explanation: '"Barbecue" is a Taíno word! The Taínos cooked meat on a raised wooden structure. Europeans adopted the technique and the word. So every BBQ is a Taíno tribute.' },
      fr: { q: 'Le "barbecue" est une invention américaine moderne sans racines indigènes.', answer: false, explanation: '"Barbecue" est un mot taïno ! Les Taïnos cuisinaient la viande sur une structure en bois surélevée. Les Européens ont adopté la technique et le mot. Chaque BBQ est donc un hommage taïno.' }
    }
  },

  // =============================================
  // OPCIÓN MÚLTIPLE (mcq) — 25 preguntas
  // =============================================

  {
    id: 'cul-026', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuáles son las tres raíces principales de la identidad dominicana?',
        options: ['Taína, española y francesa', 'Taína, española y africana', 'Maya, española y africana', 'Taína, portuguesa y africana'],
        answer: 1,
        explanation: 'La identidad dominicana es una fusión de herencia taína (indígena), española (colonial) y africana (de la esclavitud). Como un personaje con múltiples orígenes que lo hacen más fuerte.'
      },
      en: {
        q: 'What are the three main roots of Dominican identity?',
        options: ['Taíno, Spanish, and French', 'Taíno, Spanish, and African', 'Maya, Spanish, and African', 'Taíno, Portuguese, and African'],
        answer: 1,
        explanation: 'Dominican identity is a fusion of Taíno (indigenous), Spanish (colonial), and African (from slavery) heritage. Like a character with multiple origins that make them stronger.'
      },
      fr: {
        q: "Quelles sont les trois racines principales de l'identité dominicaine ?",
        options: ['Taïno, espagnole et française', 'Taïno, espagnole et africaine', 'Maya, espagnole et africaine', 'Taïno, portugaise et africaine'],
        answer: 1,
        explanation: "L'identité dominicaine est une fusion d'héritages taïno (indigène), espagnol (colonial) et africain (de l'esclavage). Comme un personnage aux origines multiples qui le rendent plus fort."
      }
    }
  },
  {
    id: 'cul-027', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué era un cacique en la sociedad taína?',
        options: ['Un guerrero', 'Un sacerdote', 'Un jefe o líder político', 'Un agricultor'],
        answer: 2,
        explanation: 'El cacique era el líder de un yucayeque (aldea). Era como el capitán del equipo — tomaba las decisiones importantes y representaba a su comunidad.'
      },
      en: {
        q: 'What was a cacique in Taíno society?',
        options: ['A warrior', 'A priest', 'A chief or political leader', 'A farmer'],
        answer: 2,
        explanation: 'The cacique was the leader of a yucayeque (village). Like the team captain — they made the important decisions and represented their community.'
      },
      fr: {
        q: "Qu'était un cacique dans la société taïno ?",
        options: ['Un guerrier', 'Un prêtre', 'Un chef ou leader politique', 'Un agriculteur'],
        answer: 2,
        explanation: "Le cacique était le leader d'un yucayeque (village). Comme le capitaine de l'équipe — il prenait les décisions importantes et représentait sa communauté."
      }
    }
  },
  {
    id: 'cul-028', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué hizo especial a Enriquillo como líder de resistencia?',
        options: ['Tenía armas europeas superiores', 'Usó su educación bicultural y la ley española para negociar', 'Contaba con un ejército más grande que los españoles', 'Recibió ayuda militar de otro país'],
        answer: 1,
        explanation: 'Enriquillo fue educado por frailes y usó ese conocimiento para hackear el sistema legal español. En vez de solo pelear, negoció un tratado de paz usando las propias leyes de España.'
      },
      en: {
        q: 'What made Enriquillo special as a resistance leader?',
        options: ['He had superior European weapons', 'He used his bicultural education and Spanish law to negotiate', 'He had a larger army than the Spanish', 'He received military help from another country'],
        answer: 1,
        explanation: 'Enriquillo was educated by friars and used that knowledge to hack the Spanish legal system. Instead of just fighting, he negotiated a peace treaty using Spain\'s own laws.'
      },
      fr: {
        q: "Qu'est-ce qui rendait Enriquillo spécial comme leader de résistance ?",
        options: ["Il avait des armes européennes supérieures", "Il a utilisé son éducation biculturelle et le droit espagnol pour négocier", "Il avait une armée plus grande que les Espagnols", "Il a reçu une aide militaire d'un autre pays"],
        answer: 1,
        explanation: "Enriquillo a été éduqué par des frères et a utilisé ces connaissances pour hacker le système juridique espagnol. Au lieu de simplement combattre, il a négocié un traité de paix en utilisant les propres lois de l'Espagne."
      }
    }
  },
  {
    id: 'cul-029', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuál de estas palabras NO viene del idioma taíno?',
        options: ['Hamaca', 'Chocolate', 'Canoa', 'Huracán'],
        answer: 1,
        explanation: '"Chocolate" viene del náhuatl (azteca), no del taíno. Hamaca, canoa y huracán son todas palabras taínas que el mundo entero adoptó. ¡Los taínos enriquecieron muchos idiomas!'
      },
      en: {
        q: 'Which of these words does NOT come from the Taíno language?',
        options: ['Hammock', 'Chocolate', 'Canoe', 'Hurricane'],
        answer: 1,
        explanation: '"Chocolate" comes from Nahuatl (Aztec), not Taíno. Hammock, canoe, and hurricane are all Taíno words that the whole world adopted. The Taínos enriched many languages!'
      },
      fr: {
        q: 'Lequel de ces mots ne vient PAS de la langue taïno ?',
        options: ['Hamac', 'Chocolat', 'Canoë', 'Ouragan'],
        answer: 1,
        explanation: '"Chocolat" vient du nahuatl (aztèque), pas du taïno. Hamac, canoë et ouragan sont tous des mots taïnos que le monde entier a adoptés. Les Taïnos ont enrichi de nombreuses langues !'
      }
    }
  },
  {
    id: 'cul-030', type: 'mcq',
    lang: {
      es: {
        q: '¿Quién fue Anacaona?',
        options: ['Una diosa taína de la lluvia', 'Una cacica, poeta y líder del cacicazgo de Xaragua', 'La primera gobernadora española de la isla', 'Una curandera famosa del siglo XVI'],
        answer: 1,
        explanation: 'Anacaona fue una de las líderes más importantes de la historia del Caribe: cacica de Xaragua, poeta y artista. Fue ejecutada injustamente por el gobernador Ovando en 1503.'
      },
      en: {
        q: 'Who was Anacaona?',
        options: ['A Taíno rain goddess', 'A cacica, poet, and leader of the Xaragua chiefdom', 'The first Spanish governor of the island', 'A famous 16th-century healer'],
        answer: 1,
        explanation: 'Anacaona was one of the most important leaders in Caribbean history: cacica of Xaragua, poet, and artist. She was unjustly executed by Governor Ovando in 1503.'
      },
      fr: {
        q: "Qui était Anacaona ?",
        options: ['Une déesse taïno de la pluie', 'Une cacica, poétesse et dirigeante du caciquat de Xaragua', "La première gouverneure espagnole de l'île", 'Une guérisseuse célèbre du XVIe siècle'],
        answer: 1,
        explanation: "Anacaona était l'une des leaders les plus importantes de l'histoire des Caraïbes : cacica de Xaragua, poétesse et artiste. Elle fut injustement exécutée par le gouverneur Ovando en 1503."
      }
    }
  },
  {
    id: 'cul-031', type: 'mcq',
    lang: {
      es: {
        q: '¿En qué siglo aproximadamente Sebastián Lemba estableció su palenque?',
        options: ['Siglo XV (1400s)', 'Siglo XVI (1500s)', 'Siglo XVII (1600s)', 'Siglo XVIII (1700s)'],
        answer: 1,
        explanation: 'Lemba estableció su palenque alrededor de 1540, en el siglo XVI. Fue uno de los primeros líderes cimarrones del Caribe, apenas décadas después de que comenzara la esclavitud en la isla.'
      },
      en: {
        q: 'In approximately what century did Sebastián Lemba establish his palenque?',
        options: ['15th century (1400s)', '16th century (1500s)', '17th century (1600s)', '18th century (1700s)'],
        answer: 1,
        explanation: 'Lemba established his palenque around 1540, in the 16th century. He was one of the first maroon leaders in the Caribbean, just decades after slavery began on the island.'
      },
      fr: {
        q: 'Vers quel siècle Sebastián Lemba a-t-il établi son palenque ?',
        options: ['XVe siècle (1400s)', 'XVIe siècle (1500s)', 'XVIIe siècle (1600s)', 'XVIIIe siècle (1700s)'],
        answer: 1,
        explanation: "Lemba a établi son palenque vers 1540, au XVIe siècle. Il fut l'un des premiers chefs marrons des Caraïbes, quelques décennies seulement après le début de l'esclavage sur l'île."
      }
    }
  },
  {
    id: 'cul-032', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué clase social taína estaba compuesta por los nobles que servían al cacique?',
        options: ['Naborías', 'Behiques', 'Nitaínos', 'Guatiaos'],
        answer: 2,
        explanation: 'Los nitaínos eran la nobleza taína — como los caballeros en la corte del rey. Ayudaban al cacique a gobernar y tenían privilegios especiales en el yucayeque.'
      },
      en: {
        q: 'Which Taíno social class was made up of nobles who served the cacique?',
        options: ['Naborías', 'Behiques', 'Nitaínos', 'Guatiaos'],
        answer: 2,
        explanation: 'The nitaínos were the Taíno nobility — like knights in the king\'s court. They helped the cacique govern and had special privileges in the yucayeque.'
      },
      fr: {
        q: 'Quelle classe sociale taïno était composée de nobles qui servaient le cacique ?',
        options: ['Naborías', 'Behiques', 'Nitaínos', 'Guatiaos'],
        answer: 2,
        explanation: "Les nitaínos étaient la noblesse taïno — comme les chevaliers à la cour du roi. Ils aidaient le cacique à gouverner et avaient des privilèges spéciaux dans le yucayeque."
      }
    }
  },
  {
    id: 'cul-033', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuántos idiomas tiene ArcLycée y cuáles son?',
        options: ['2: español e inglés', '3: español, inglés y francés', '4: español, inglés, francés y criollo', '3: español, francés y taíno'],
        answer: 1,
        explanation: 'ArcLycée tiene 3 idiomas: español, inglés y francés. Refleja que la cultura y la educación no tienen fronteras lingüísticas, especialmente en un liceo francés en RD.'
      },
      en: {
        q: 'How many languages does ArcLycée have and which are they?',
        options: ['2: Spanish and English', '3: Spanish, English, and French', '4: Spanish, English, French, and Creole', '3: Spanish, French, and Taíno'],
        answer: 1,
        explanation: 'ArcLycée has 3 languages: Spanish, English, and French. It reflects that culture and education have no linguistic borders, especially at a French school in DR.'
      },
      fr: {
        q: "Combien de langues a ArcLycée et lesquelles sont-elles ?",
        options: ["2 : espagnol et anglais", "3 : espagnol, anglais et français", "4 : espagnol, anglais, français et créole", "3 : espagnol, français et taïno"],
        answer: 1,
        explanation: "ArcLycée a 3 langues : espagnol, anglais et français. Cela reflète que la culture et l'éducation n'ont pas de frontières linguistiques, surtout dans un lycée français en RD."
      }
    }
  },
  {
    id: 'cul-034', type: 'mcq',
    lang: {
      es: {
        q: '¿Por qué es importante la Zona Colonial de Santo Domingo para la historia mundial?',
        options: ['Es donde nació Colón', 'Es el primer asentamiento europeo permanente en América', 'Es donde se firmó la independencia dominicana', 'Es el puerto más grande del Caribe'],
        answer: 1,
        explanation: 'La Zona Colonial es literalmente donde comenzó la historia colonial de América. La primera catedral, la primera universidad, el primer hospital del "Nuevo Mundo" están ahí.'
      },
      en: {
        q: 'Why is the Zona Colonial of Santo Domingo important for world history?',
        options: ['It\'s where Columbus was born', 'It\'s the first permanent European settlement in the Americas', 'It\'s where Dominican independence was signed', 'It\'s the largest port in the Caribbean'],
        answer: 1,
        explanation: 'The Zona Colonial is literally where the colonial history of the Americas began. The first cathedral, first university, first hospital of the "New World" are all there.'
      },
      fr: {
        q: "Pourquoi la Zona Colonial de Saint-Domingue est-elle importante pour l'histoire mondiale ?",
        options: ["C'est là où Colomb est né", "C'est le premier établissement européen permanent dans les Amériques", "C'est là où l'indépendance dominicaine a été signée", "C'est le plus grand port des Caraïbes"],
        answer: 1,
        explanation: "La Zona Colonial est littéralement là où l'histoire coloniale des Amériques a commencé. La première cathédrale, la première université, le premier hôpital du \"Nouveau Monde\" s'y trouvent."
      }
    }
  },
  {
    id: 'cul-035', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué gobernador español ejecutó a Anacaona en 1503?',
        options: ['Cristóbal Colón', 'Nicolás de Ovando', 'Bartolomé Colón', 'Diego Velázquez'],
        answer: 1,
        explanation: 'Nicolás de Ovando engañó a Anacaona invitándola a una fiesta y luego la capturó. Fue uno de los actos más crueles de la conquista. Ovando temía el poder y la influencia de Anacaona.'
      },
      en: {
        q: 'Which Spanish governor executed Anacaona in 1503?',
        options: ['Christopher Columbus', 'Nicolás de Ovando', 'Bartolomé Colón', 'Diego Velázquez'],
        answer: 1,
        explanation: 'Nicolás de Ovando tricked Anacaona by inviting her to a feast and then captured her. It was one of the cruelest acts of the conquest. Ovando feared Anacaona\'s power and influence.'
      },
      fr: {
        q: 'Quel gouverneur espagnol a exécuté Anacaona en 1503 ?',
        options: ['Christophe Colomb', 'Nicolás de Ovando', 'Bartolomé Colón', 'Diego Velázquez'],
        answer: 1,
        explanation: "Nicolás de Ovando a piégé Anacaona en l'invitant à une fête puis l'a capturée. Ce fut l'un des actes les plus cruels de la conquête. Ovando craignait le pouvoir et l'influence d'Anacaona."
      }
    }
  },
  {
    id: 'cul-036', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuál es la mejor comparación para entender por qué el mestizaje cultural importa?',
        options: ['Es como mezclar colores: el resultado es más rico que los originales', 'Es como perder archivos: se borra lo anterior', 'Es como copiar: uno reemplaza al otro', 'Es como un virus: se propaga sin control'],
        answer: 0,
        explanation: 'El mestizaje cultural es como mezclar colores: no pierdes los originales, creas algo nuevo y más rico. La identidad dominicana no es "menos" por ser mezclada — es "más".'
      },
      en: {
        q: 'What is the best comparison for understanding why cultural mixing matters?',
        options: ['It\'s like mixing colors: the result is richer than the originals', 'It\'s like losing files: the previous ones get erased', 'It\'s like copying: one replaces the other', 'It\'s like a virus: it spreads uncontrollably'],
        answer: 0,
        explanation: 'Cultural mixing is like mixing colors: you don\'t lose the originals, you create something new and richer. Dominican identity isn\'t "less" for being mixed — it\'s "more".'
      },
      fr: {
        q: "Quelle est la meilleure comparaison pour comprendre pourquoi le métissage culturel est important ?",
        options: ["C'est comme mélanger des couleurs : le résultat est plus riche que les originaux", "C'est comme perdre des fichiers : les précédents s'effacent", "C'est comme copier : l'un remplace l'autre", "C'est comme un virus : ça se propage sans contrôle"],
        answer: 0,
        explanation: "Le métissage culturel est comme mélanger des couleurs : on ne perd pas les originaux, on crée quelque chose de nouveau et plus riche. L'identité dominicaine n'est pas \"moins\" pour être métissée — elle est \"plus\"."
      }
    }
  },
  {
    id: 'cul-037', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué papel jugaban los behiques en la sociedad taína?',
        options: ['Eran los guerreros principales', 'Eran los sacerdotes, curanderos y guardianes del conocimiento', 'Eran los constructores de bohíos', 'Eran los navegantes y pescadores'],
        answer: 1,
        explanation: 'Los behiques eran los curanderos y sacerdotes: usaban plantas medicinales, dirigían ceremonias y mantenían la conexión entre el mundo físico y el espiritual. Los sabios de la aldea.'
      },
      en: {
        q: 'What role did behiques play in Taíno society?',
        options: ['They were the main warriors', 'They were the priests, healers, and knowledge keepers', 'They were the bohío builders', 'They were the navigators and fishers'],
        answer: 1,
        explanation: 'Behiques were the healers and priests: they used medicinal plants, led ceremonies, and maintained the connection between the physical and spiritual worlds. The village wise ones.'
      },
      fr: {
        q: 'Quel rôle jouaient les behiques dans la société taïno ?',
        options: ['Ils étaient les guerriers principaux', 'Ils étaient les prêtres, guérisseurs et gardiens du savoir', 'Ils étaient les constructeurs de bohíos', 'Ils étaient les navigateurs et pêcheurs'],
        answer: 1,
        explanation: "Les behiques étaient les guérisseurs et prêtres : ils utilisaient des plantes médicinales, dirigeaient les cérémonies et maintenaient la connexion entre le monde physique et spirituel. Les sages du village."
      }
    }
  },
  {
    id: 'cul-038', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuál era la clase social más numerosa de los taínos?',
        options: ['Los caciques', 'Los nitaínos', 'Los naborías (gente común)', 'Los behiques'],
        answer: 2,
        explanation: 'Los naborías eran la gente común — los trabajadores, agricultores y artesanos que formaban la mayoría de la sociedad. Como en cualquier civilización, la base de la pirámide era la más grande.'
      },
      en: {
        q: 'What was the most numerous social class of the Taínos?',
        options: ['The caciques', 'The nitaínos', 'The naborías (commoners)', 'The behiques'],
        answer: 2,
        explanation: 'The naborías were the common people — the workers, farmers, and artisans who made up the majority of society. Like in any civilization, the base of the pyramid was the largest.'
      },
      fr: {
        q: 'Quelle était la classe sociale la plus nombreuse des Taïnos ?',
        options: ['Les caciques', 'Les nitaínos', 'Les naborías (gens du commun)', 'Les behiques'],
        answer: 2,
        explanation: "Les naborías étaient les gens du commun — les travailleurs, agriculteurs et artisans qui formaient la majorité de la société. Comme dans toute civilisation, la base de la pyramide était la plus grande."
      }
    }
  },
  {
    id: 'cul-039', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué instrumento musical taíno se usa todavía en la música dominicana moderna?',
        options: ['La guitarra', 'El piano', 'La maraca', 'El violín'],
        answer: 2,
        explanation: '¡Las maracas son herencia taína directa! Se usan en merengue, bachata y muchos otros géneros. Cada vez que escuchas maracas, hay un eco de los taínos vibrando.'
      },
      en: {
        q: 'Which Taíno musical instrument is still used in modern Dominican music?',
        options: ['The guitar', 'The piano', 'The maraca', 'The violin'],
        answer: 2,
        explanation: 'Maracas are direct Taíno heritage! They\'re used in merengue, bachata, and many other genres. Every time you hear maracas, there\'s a Taíno echo vibrating.'
      },
      fr: {
        q: 'Quel instrument de musique taïno est encore utilisé dans la musique dominicaine moderne ?',
        options: ['La guitare', 'Le piano', 'Le maraca', 'Le violon'],
        answer: 2,
        explanation: "Les maracas sont un héritage taïno direct ! Elles sont utilisées dans le merengue, la bachata et bien d'autres genres. Chaque fois que tu entends des maracas, il y a un écho taïno qui vibre."
      }
    }
  },
  {
    id: 'cul-040', type: 'mcq',
    lang: {
      es: {
        q: 'En el juego ArcLycée, ¿qué enfoque se usa para presentar la historia colonial?',
        options: ['Solo muestra el lado español como héroes', 'Solo muestra a los taínos como víctimas', 'Presenta la complejidad: conquista, resistencia y mestizaje', 'Ignora completamente la colonización'],
        answer: 2,
        explanation: 'ArcLycée no simplifica la historia. Muestra la conquista, la resistencia indígena y africana, Y el mestizaje. La historia real no es blanco o negro — es una mezcla compleja.'
      },
      en: {
        q: 'In the game ArcLycée, what approach is used to present colonial history?',
        options: ['It only shows the Spanish side as heroes', 'It only shows the Taínos as victims', 'It presents complexity: conquest, resistance, and mestizaje', 'It completely ignores colonization'],
        answer: 2,
        explanation: 'ArcLycée doesn\'t simplify history. It shows the conquest, indigenous and African resistance, AND mestizaje. Real history isn\'t black or white — it\'s a complex mix.'
      },
      fr: {
        q: "Dans le jeu ArcLycée, quelle approche est utilisée pour présenter l'histoire coloniale ?",
        options: ["Il ne montre que le côté espagnol comme héros", "Il ne montre que les Taïnos comme victimes", "Il présente la complexité : conquête, résistance et métissage", "Il ignore complètement la colonisation"],
        answer: 2,
        explanation: "ArcLycée ne simplifie pas l'histoire. Il montre la conquête, la résistance indigène et africaine, ET le métissage. La vraie histoire n'est pas noire ou blanche — c'est un mélange complexe."
      }
    }
  },
  {
    id: 'cul-041', type: 'mcq',
    lang: {
      es: {
        q: '¿Cómo se llama el alimento hecho de yuca que los taínos preparaban y que sigue siendo popular en RD?',
        options: ['Tortilla', 'Casabe', 'Arepa', 'Tamale'],
        answer: 1,
        explanation: 'El casabe es pan de yuca — el OG de la comida dominicana. Tiene más de 500 años y sigue en las mesas dominicanas. Comida que conecta directamente con los ancestros taínos.'
      },
      en: {
        q: 'What is the food made from yuca that the Taínos prepared and is still popular in DR?',
        options: ['Tortilla', 'Casabe', 'Arepa', 'Tamale'],
        answer: 1,
        explanation: 'Casabe is yuca bread — the OG of Dominican food. It\'s over 500 years old and still on Dominican tables. Food that directly connects to Taíno ancestors.'
      },
      fr: {
        q: "Comment s'appelle l'aliment fait de yuca que les Taïnos préparaient et qui est toujours populaire en RD ?",
        options: ['Tortilla', 'Casabe', 'Arepa', 'Tamale'],
        answer: 1,
        explanation: "Le casabe est du pain de yuca — l'OG de la cuisine dominicaine. Il a plus de 500 ans et est toujours sur les tables dominicaines. Un aliment qui connecte directement aux ancêtres taïnos."
      }
    }
  },
  {
    id: 'cul-042', type: 'mcq',
    lang: {
      es: {
        q: '¿Por qué conocer tu herencia cultural te ayuda como persona?',
        options: ['Solo sirve para pasar exámenes de historia', 'Te da identidad, raíces y un sentido de pertenencia', 'No ayuda en nada práctico', 'Solo importa si eres historiador profesional'],
        answer: 1,
        explanation: 'Conocer tu herencia es como conocer tu código fuente — te ayuda a entender quién eres, de dónde vienes y hacia dónde puedes ir. Es la base de tu identidad.'
      },
      en: {
        q: 'Why does knowing your cultural heritage help you as a person?',
        options: ['It only serves to pass history exams', 'It gives you identity, roots, and a sense of belonging', 'It doesn\'t help with anything practical', 'It only matters if you\'re a professional historian'],
        answer: 1,
        explanation: 'Knowing your heritage is like knowing your source code — it helps you understand who you are, where you come from, and where you can go. It\'s the foundation of your identity.'
      },
      fr: {
        q: "Pourquoi connaître ton héritage culturel t'aide en tant que personne ?",
        options: ["Ça ne sert qu'à réussir les examens d'histoire", "Ça te donne une identité, des racines et un sentiment d'appartenance", "Ça n'aide en rien de pratique", "Ça ne compte que si tu es historien professionnel"],
        answer: 1,
        explanation: "Connaître ton héritage, c'est comme connaître ton code source — ça t'aide à comprendre qui tu es, d'où tu viens et où tu peux aller. C'est la base de ton identité."
      }
    }
  },
  {
    id: 'cul-043', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué era el guanín para los taínos?',
        options: ['Un tipo de comida sagrada', 'Una aleación de oro, plata y cobre usada en objetos ceremoniales', 'Un instrumento musical de guerra', 'Una planta medicinal sagrada'],
        answer: 1,
        explanation: 'El guanín era una aleación que los taínos valoraban más que el oro puro. Los cemíes tenían detalles de guanín. No era "oro" como pensaban los españoles — era algo culturalmente más significativo.'
      },
      en: {
        q: 'What was guanín for the Taínos?',
        options: ['A type of sacred food', 'An alloy of gold, silver, and copper used in ceremonial objects', 'A war musical instrument', 'A sacred medicinal plant'],
        answer: 1,
        explanation: 'Guanín was an alloy the Taínos valued more than pure gold. Cemíes had guanín details. It wasn\'t "gold" as the Spanish thought — it was something culturally more significant.'
      },
      fr: {
        q: "Qu'était le guanín pour les Taïnos ?",
        options: ['Un type de nourriture sacrée', "Un alliage d'or, d'argent et de cuivre utilisé dans les objets cérémoniels", 'Un instrument de musique de guerre', 'Une plante médicinale sacrée'],
        answer: 1,
        explanation: "Le guanín était un alliage que les Taïnos valorisaient plus que l'or pur. Les cemíes avaient des détails en guanín. Ce n'était pas de \"l'or\" comme le pensaient les Espagnols — c'était quelque chose de culturellement plus significatif."
      }
    }
  },
  {
    id: 'cul-044', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué período aproximado cubre la rebelión de Enriquillo?',
        options: ['1492-1500', '1519-1533', '1540-1560', '1600-1620'],
        answer: 1,
        explanation: 'La rebelión de Enriquillo duró de 1519 a 1533 — ¡14 años de resistencia! Terminó con un tratado de paz, algo increíble para la época. Enriquillo jugó el juego largo y ganó.'
      },
      en: {
        q: 'What approximate period does Enriquillo\'s rebellion cover?',
        options: ['1492-1500', '1519-1533', '1540-1560', '1600-1620'],
        answer: 1,
        explanation: 'Enriquillo\'s rebellion lasted from 1519 to 1533 — 14 years of resistance! It ended with a peace treaty, something incredible for the time. Enriquillo played the long game and won.'
      },
      fr: {
        q: "Quelle période approximative couvre la rébellion d'Enriquillo ?",
        options: ['1492-1500', '1519-1533', '1540-1560', '1600-1620'],
        answer: 1,
        explanation: "La rébellion d'Enriquillo a duré de 1519 à 1533 — 14 ans de résistance ! Elle s'est terminée par un traité de paix, quelque chose d'incroyable pour l'époque. Enriquillo a joué le long terme et a gagné."
      }
    }
  },
  {
    id: 'cul-045', type: 'mcq',
    lang: {
      es: {
        q: '¿Cuál de estos NO es un ejemplo de herencia africana en la cultura dominicana?',
        options: ['Los tambores y ritmos musicales', 'La resistencia cimarrona', 'El sistema de conucos', 'Las tradiciones espirituales sincréticas'],
        answer: 2,
        explanation: 'El conuco es herencia taína, no africana. Los tambores, la resistencia cimarrona y las tradiciones sincréticas son contribuciones africanas fundamentales a la cultura dominicana.'
      },
      en: {
        q: 'Which of these is NOT an example of African heritage in Dominican culture?',
        options: ['Drums and musical rhythms', 'Maroon resistance', 'The conuco farming system', 'Syncretic spiritual traditions'],
        answer: 2,
        explanation: 'The conuco is Taíno heritage, not African. Drums, maroon resistance, and syncretic traditions are fundamental African contributions to Dominican culture.'
      },
      fr: {
        q: "Lequel de ces exemples n'est PAS un héritage africain dans la culture dominicaine ?",
        options: ['Les tambours et rythmes musicaux', 'La résistance des marrons', 'Le système de conucos', 'Les traditions spirituelles syncrétiques'],
        answer: 2,
        explanation: "Le conuco est un héritage taïno, pas africain. Les tambours, la résistance des marrons et les traditions syncrétiques sont des contributions africaines fondamentales à la culture dominicaine."
      }
    }
  },
  {
    id: 'cul-046', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué comparación ayuda a entender la importancia de preservar el patrimonio arqueológico?',
        options: ['Es como guardar tus fotos viejas — recuerdos que no puedes recuperar', 'Es como coleccionar estampitas — un hobby para algunos', 'Es como guardar basura — cosas viejas que ya no sirven', 'Es como un museo aburrido — solo para adultos'],
        answer: 0,
        explanation: 'Los sitios arqueológicos son como fotos de familia de toda una civilización. Si los destruyes, pierdes historias que nadie podrá contar jamás. Son irreemplazables, como tus mejores recuerdos.'
      },
      en: {
        q: 'What comparison helps understand the importance of preserving archaeological heritage?',
        options: ['It\'s like saving your old photos — memories you can\'t get back', 'It\'s like collecting stickers — a hobby for some', 'It\'s like keeping trash — old things that are useless', 'It\'s like a boring museum — only for adults'],
        answer: 0,
        explanation: 'Archaeological sites are like family photos of an entire civilization. If you destroy them, you lose stories no one can ever tell again. They\'re irreplaceable, like your best memories.'
      },
      fr: {
        q: "Quelle comparaison aide à comprendre l'importance de préserver le patrimoine archéologique ?",
        options: ["C'est comme sauvegarder tes vieilles photos — des souvenirs irrécupérables", "C'est comme collectionner des autocollants — un hobby pour certains", "C'est comme garder des déchets — de vieilles choses inutiles", "C'est comme un musée ennuyeux — seulement pour les adultes"],
        answer: 0,
        explanation: "Les sites archéologiques sont comme des photos de famille de toute une civilisation. Si tu les détruis, tu perds des histoires que personne ne pourra jamais raconter. Ils sont irremplaçables, comme tes meilleurs souvenirs."
      }
    }
  },
  {
    id: 'cul-047', type: 'mcq',
    lang: {
      es: {
        q: '¿Cómo se llamaba la casa del cacique, más grande que los bohíos comunes?',
        options: ['Batey', 'Caney', 'Conuco', 'Dujo'],
        answer: 1,
        explanation: 'El caney era la casa grande del cacique — rectangular y más espaciosa que los bohíos circulares. Era como la "casa blanca" del yucayeque, donde se tomaban las decisiones importantes.'
      },
      en: {
        q: "What was the cacique's house called, which was larger than common bohíos?",
        options: ['Batey', 'Caney', 'Conuco', 'Dujo'],
        answer: 1,
        explanation: 'The caney was the cacique\'s large house — rectangular and more spacious than the circular bohíos. It was like the "white house" of the yucayeque, where important decisions were made.'
      },
      fr: {
        q: 'Comment s\'appelait la maison du cacique, plus grande que les bohíos communs ?',
        options: ['Batey', 'Caney', 'Conuco', 'Dujo'],
        answer: 1,
        explanation: "Le caney était la grande maison du cacique — rectangulaire et plus spacieuse que les bohíos circulaires. C'était comme la \"maison blanche\" du yucayeque, où les décisions importantes étaient prises."
      }
    }
  },
  {
    id: 'cul-048', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué nos enseña la historia de Miles Morales (Spider-Man) sobre las identidades múltiples?',
        options: ['Que tener varias identidades culturales es confuso y negativo', 'Que ser multicultural te hace más fuerte y único, como la identidad dominicana', 'Que debes elegir una sola cultura', 'Que las identidades mezcladas no funcionan en la vida real'],
        answer: 1,
        explanation: 'Miles Morales es afrolatino y eso lo hace único como Spider-Man. Lo mismo pasa con la identidad dominicana: la mezcla taína + española + africana no es una debilidad, es un superpoder.'
      },
      en: {
        q: 'What does Miles Morales\' (Spider-Man) story teach us about multiple identities?',
        options: ['That having multiple cultural identities is confusing and negative', 'That being multicultural makes you stronger and unique, like Dominican identity', 'That you must choose a single culture', 'That mixed identities don\'t work in real life'],
        answer: 1,
        explanation: 'Miles Morales is Afro-Latino and that makes him unique as Spider-Man. Same with Dominican identity: the Taíno + Spanish + African mix isn\'t a weakness, it\'s a superpower.'
      },
      fr: {
        q: "Que nous apprend l'histoire de Miles Morales (Spider-Man) sur les identités multiples ?",
        options: ["Qu'avoir plusieurs identités culturelles est confus et négatif", "Qu'être multiculturel te rend plus fort et unique, comme l'identité dominicaine", "Qu'il faut choisir une seule culture", "Que les identités mixtes ne fonctionnent pas dans la vie réelle"],
        answer: 1,
        explanation: "Miles Morales est afro-latino et ça le rend unique en tant que Spider-Man. Pareil pour l'identité dominicaine : le mélange taïno + espagnol + africain n'est pas une faiblesse, c'est un super-pouvoir."
      }
    }
  },
  {
    id: 'cul-049', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué es un dujo en la cultura taína?',
        options: ['Un tipo de canoa de guerra', 'Un asiento ceremonial de madera tallada', 'Un instrumento musical de percusión', 'Un arma de caza'],
        answer: 1,
        explanation: 'El dujo era un asiento ceremonial tallado en madera, usado por caciques y behiques. Era un símbolo de autoridad y estatus — como un trono, pero con diseños que contaban historias.'
      },
      en: {
        q: 'What is a dujo in Taíno culture?',
        options: ['A type of war canoe', 'A ceremonial carved wooden seat', 'A percussion musical instrument', 'A hunting weapon'],
        answer: 1,
        explanation: 'The dujo was a ceremonial seat carved from wood, used by caciques and behiques. It was a symbol of authority and status — like a throne, but with designs that told stories.'
      },
      fr: {
        q: "Qu'est-ce qu'un dujo dans la culture taïno ?",
        options: ['Un type de canoë de guerre', 'Un siège cérémoniel en bois sculpté', 'Un instrument de musique à percussion', 'Une arme de chasse'],
        answer: 1,
        explanation: "Le dujo était un siège cérémoniel sculpté dans le bois, utilisé par les caciques et les behiques. C'était un symbole d'autorité et de statut — comme un trône, mais avec des motifs qui racontaient des histoires."
      }
    }
  },
  {
    id: 'cul-050', type: 'mcq',
    lang: {
      es: {
        q: '¿Qué tienen en común la protección de artefactos arqueológicos y la protección de Horrocruxes en Harry Potter?',
        options: ['Ambos son ficción', 'Ambos contienen una parte del alma/identidad de un pueblo y son irreemplazables', 'No tienen nada en común', 'Ambos son peligrosos al tacto'],
        answer: 1,
        explanation: 'Como los Horrocruxes contienen fragmentos del alma, los artefactos arqueológicos contienen fragmentos de la identidad de un pueblo. Destruirlos es perder para siempre una parte de quiénes somos.'
      },
      en: {
        q: 'What do protecting archaeological artifacts and protecting Horcruxes in Harry Potter have in common?',
        options: ['Both are fiction', 'Both contain a part of the soul/identity of a people and are irreplaceable', 'They have nothing in common', 'Both are dangerous to touch'],
        answer: 1,
        explanation: 'Like Horcruxes contain soul fragments, archaeological artifacts contain fragments of a people\'s identity. Destroying them means losing forever a part of who we are.'
      },
      fr: {
        q: "Qu'ont en commun la protection des artefacts archéologiques et la protection des Horcruxes dans Harry Potter ?",
        options: ['Les deux sont de la fiction', "Les deux contiennent une partie de l'âme/identité d'un peuple et sont irremplaçables", "Ils n'ont rien en commun", 'Les deux sont dangereux au toucher'],
        answer: 1,
        explanation: "Comme les Horcruxes contiennent des fragments d'âme, les artefacts archéologiques contiennent des fragments de l'identité d'un peuple. Les détruire, c'est perdre pour toujours une partie de qui nous sommes."
      }
    }
  },

  // =============================================
  // COMPLETAR (fill) — 25 preguntas
  // =============================================

  {
    id: 'cul-051', type: 'fill',
    lang: {
      es: { q: 'Las casas circulares de los taínos con techo de palma se llamaban _____.', answer: 'bohíos', explanation: 'Los bohíos eran viviendas circulares hechas de madera y palma — resistentes a huracanes y frescas en el trópico. Arquitectura inteligente sin necesidad de aire acondicionado.' },
      en: { q: 'The circular Taíno houses with palm roofs were called _____.', answer: 'bohíos', explanation: 'Bohíos were circular dwellings made of wood and palm — hurricane-resistant and cool in the tropics. Smart architecture without needing air conditioning.' },
      fr: { q: 'Les maisons circulaires taïno avec des toits en palme s\'appelaient des _____.', answer: 'bohíos', explanation: 'Les bohíos étaient des habitations circulaires en bois et palme — résistantes aux ouragans et fraîches sous les tropiques. Architecture intelligente sans besoin de climatisation.' }
    }
  },
  {
    id: 'cul-052', type: 'fill',
    lang: {
      es: { q: 'El sistema agrícola taíno basado en montículos para cultivar yuca y otros alimentos se llamaba _____.', answer: 'conuco', explanation: 'El conuco era el sistema agrícola de los taínos. Los montículos mejoraban el drenaje y la fertilidad del suelo. Todavía se usa la palabra "conuco" en RD para referirse a una pequeña finca.' },
      en: { q: 'The Taíno farming system based on mounds for growing yuca and other foods was called _____.', answer: 'conuco', explanation: 'The conuco was the Taíno farming system. The mounds improved soil drainage and fertility. The word "conuco" is still used in DR to refer to a small farm.' },
      fr: { q: 'Le système agricole taïno basé sur des buttes pour cultiver le yuca et d\'autres aliments s\'appelait _____.', answer: 'conuco', explanation: 'Le conuco était le système agricole des Taïnos. Les buttes amélioraient le drainage et la fertilité du sol. Le mot "conuco" est encore utilisé en RD pour désigner une petite ferme.' }
    }
  },
  {
    id: 'cul-053', type: 'fill',
    lang: {
      es: { q: 'Las figuras sagradas taínas que representaban espíritus y ancestros se llamaban _____.', answer: 'cemíes', explanation: 'Los cemíes eran objetos sagrados, no simples esculturas. Representaban la conexión entre el mundo humano y el espiritual. Algunos tenían detalles de guanín (aleación de oro, plata y cobre).' },
      en: { q: 'The sacred Taíno figures that represented spirits and ancestors were called _____.', answer: 'cemíes', explanation: 'Cemíes were sacred objects, not mere sculptures. They represented the connection between the human and spiritual worlds. Some had guanín details (an alloy of gold, silver, and copper).' },
      fr: { q: 'Les figures sacrées taïno qui représentaient des esprits et des ancêtres s\'appelaient des _____.', answer: 'cemíes', explanation: "Les cemíes étaient des objets sacrés, pas de simples sculptures. Ils représentaient la connexion entre le monde humain et le monde spirituel. Certains avaient des détails en guanín (alliage d'or, d'argent et de cuivre)." }
    }
  },
  {
    id: 'cul-054', type: 'fill',
    lang: {
      es: { q: 'El líder político de una aldea taína (yucayeque) recibía el título de _____.', answer: 'cacique', explanation: 'El cacique era el jefe del yucayeque. La palabra "cacique" sobrevive hoy en español — todavía se usa para referirse a un líder local poderoso. ¡Herencia taína en el vocabulario cotidiano!' },
      en: { q: 'The political leader of a Taíno village (yucayeque) held the title of _____.', answer: 'cacique', explanation: 'The cacique was the chief of the yucayeque. The word "cacique" survives in Spanish today — it\'s still used to refer to a powerful local leader. Taíno heritage in everyday vocabulary!' },
      fr: { q: 'Le leader politique d\'un village taïno (yucayeque) portait le titre de _____.', answer: 'cacique', explanation: "Le cacique était le chef du yucayeque. Le mot \"cacique\" survit aujourd'hui en espagnol — il est encore utilisé pour désigner un leader local puissant. Héritage taïno dans le vocabulaire quotidien !" }
    }
  },
  {
    id: 'cul-055', type: 'fill',
    lang: {
      es: { q: 'La ceremonia taína que combinaba danza, canto y narrativa histórica se llamaba _____.', answer: 'areíto', explanation: 'El areíto era el método taíno de preservar y transmitir su historia — sin escritura, solo con música, danza y poesía. Era como un podcast en vivo, pero hace 500 años.' },
      en: { q: 'The Taíno ceremony that combined dance, song, and historical narrative was called _____.', answer: 'areíto', explanation: 'The areíto was the Taíno method of preserving and transmitting their history — without writing, only with music, dance, and poetry. It was like a live podcast, but 500 years ago.' },
      fr: { q: 'La cérémonie taïno qui combinait danse, chant et récit historique s\'appelait _____.', answer: 'areíto', explanation: "L'areíto était la méthode taïno de préserver et transmettre leur histoire — sans écriture, seulement avec musique, danse et poésie. C'était comme un podcast en direct, mais il y a 500 ans." }
    }
  },
  {
    id: 'cul-056', type: 'fill',
    lang: {
      es: { q: 'El juego de pelota taíno que se jugaba en un batey usando caderas y rodillas se llamaba _____.', answer: 'batú', explanation: 'El batú era el deporte más popular de los taínos. Se jugaba con una pelota de goma (caucho) y no se podían usar las manos — como un ancestro del fútbol, pero más extremo.' },
      en: { q: 'The Taíno ball game played on a batey using hips and knees was called _____.', answer: 'batú', explanation: 'Batú was the most popular Taíno sport. It was played with a rubber ball and hands couldn\'t be used — like an ancestor of soccer, but more extreme.' },
      fr: { q: 'Le jeu de balle taïno qui se jouait sur un batey en utilisant les hanches et les genoux s\'appelait _____.', answer: 'batú', explanation: "Le batú était le sport le plus populaire des Taïnos. On jouait avec une balle en caoutchouc et on ne pouvait pas utiliser les mains — comme un ancêtre du football, mais plus extrême." }
    }
  },
  {
    id: 'cul-057', type: 'fill',
    lang: {
      es: { q: 'La cacica, poeta y líder del cacicazgo de Xaragua que fue ejecutada por Ovando en 1503 se llamaba _____.', answer: 'Anacaona', explanation: 'Anacaona fue una de las mujeres más poderosas de la historia del Caribe. Su nombre significa "Flor de Oro" en taíno. Poeta, líder, artista — un ícono que fue silenciado injustamente.' },
      en: { q: 'The cacica, poet, and leader of the Xaragua chiefdom who was executed by Ovando in 1503 was named _____.', answer: 'Anacaona', explanation: 'Anacaona was one of the most powerful women in Caribbean history. Her name means "Golden Flower" in Taíno. Poet, leader, artist — an icon who was unjustly silenced.' },
      fr: { q: 'La cacica, poétesse et dirigeante du caciquat de Xaragua qui a été exécutée par Ovando en 1503 s\'appelait _____.', answer: 'Anacaona', explanation: "Anacaona fut l'une des femmes les plus puissantes de l'histoire des Caraïbes. Son nom signifie \"Fleur d'Or\" en taïno. Poétesse, leader, artiste — une icône injustement réduite au silence." }
    }
  },
  {
    id: 'cul-058', type: 'fill',
    lang: {
      es: { q: 'El líder taíno bicultural que usó la ley española para negociar un tratado de paz se llamaba _____.', answer: 'Enriquillo', explanation: 'Enriquillo (nombre taíno: Guarocuya) fue educado por frailes pero nunca olvidó sus raíces. Usó ambas culturas como herramientas de resistencia. El OG del code-switching cultural.' },
      en: { q: 'The bicultural Taíno leader who used Spanish law to negotiate a peace treaty was named _____.', answer: 'Enriquillo', explanation: 'Enriquillo (Taíno name: Guarocuya) was educated by friars but never forgot his roots. He used both cultures as resistance tools. The OG of cultural code-switching.' },
      fr: { q: 'Le leader taïno biculturel qui a utilisé le droit espagnol pour négocier un traité de paix s\'appelait _____.', answer: 'Enriquillo', explanation: "Enriquillo (nom taïno : Guarocuya) a été éduqué par des frères mais n'a jamais oublié ses racines. Il a utilisé les deux cultures comme outils de résistance. L'OG du code-switching culturel." }
    }
  },
  {
    id: 'cul-059', type: 'fill',
    lang: {
      es: { q: 'El líder cimarrón africano que estableció un palenque en las montañas de Hispaniola alrededor de 1540 fue _____.', answer: 'Sebastián Lemba', explanation: 'Sebastián Lemba fue un héroe de la resistencia africana en el Caribe. Su palenque era un refugio de libertad en las montañas. Fue líder, estratega y símbolo de esperanza.' },
      en: { q: 'The African maroon leader who established a palenque in Hispaniola\'s mountains around 1540 was _____.', answer: 'Sebastián Lemba', explanation: 'Sebastián Lemba was a hero of African resistance in the Caribbean. His palenque was a refuge of freedom in the mountains. He was a leader, strategist, and symbol of hope.' },
      fr: { q: 'Le chef marron africain qui a établi un palenque dans les montagnes d\'Hispaniola vers 1540 était _____.', answer: 'Sebastián Lemba', explanation: "Sebastián Lemba fut un héros de la résistance africaine dans les Caraïbes. Son palenque était un refuge de liberté dans les montagnes. Il était leader, stratège et symbole d'espoir." }
    }
  },
  {
    id: 'cul-060', type: 'fill',
    lang: {
      es: { q: 'Las comunidades de personas esclavizadas que escaparon y vivían libres en las montañas se llamaban _____.', answer: 'palenques', explanation: 'Los palenques eran mucho más que escondites — eran comunidades organizadas con su propia cultura, agricultura y sistema de defensa. Eran islas de libertad en un mundo de esclavitud.' },
      en: { q: 'The communities of enslaved people who escaped and lived freely in the mountains were called _____.', answer: 'palenques', explanation: 'Palenques were much more than hiding places — they were organized communities with their own culture, farming, and defense systems. They were islands of freedom in a world of slavery.' },
      fr: { q: 'Les communautés de personnes asservies qui s\'échappaient et vivaient librement dans les montagnes s\'appelaient des _____.', answer: 'palenques', explanation: "Les palenques étaient bien plus que des cachettes — c'étaient des communautés organisées avec leur propre culture, agriculture et système de défense. Des îles de liberté dans un monde d'esclavage." }
    }
  },
  {
    id: 'cul-061', type: 'fill',
    lang: {
      es: { q: 'La aldea taína organizada alrededor de un batey central con bohíos se llamaba _____.', answer: 'yucayeque', explanation: 'El yucayeque era la unidad básica de la sociedad taína — una comunidad completa con hogares, espacio recreativo y liderazgo. Como una mini-ciudad bien planificada.' },
      en: { q: 'The Taíno village organized around a central batey with bohíos was called a _____.', answer: 'yucayeque', explanation: 'The yucayeque was the basic unit of Taíno society — a complete community with homes, recreational space, and leadership. Like a well-planned mini-city.' },
      fr: { q: 'Le village taïno organisé autour d\'un batey central avec des bohíos s\'appelait un _____.', answer: 'yucayeque', explanation: "Le yucayeque était l'unité de base de la société taïno — une communauté complète avec des foyers, un espace récréatif et un leadership. Comme une mini-ville bien planifiée." }
    }
  },
  {
    id: 'cul-062', type: 'fill',
    lang: {
      es: { q: 'Los nobles taínos que servían al cacique y ayudaban a gobernar se llamaban _____.', answer: 'nitaínos', explanation: 'Los nitaínos eran la élite del yucayeque — consejeros y administradores del cacique. Como el "gabinete" de un presidente, pero en versión taína. Tenían privilegios y responsabilidades.' },
      en: { q: 'The Taíno nobles who served the cacique and helped govern were called _____.', answer: 'nitaínos', explanation: 'The nitaínos were the yucayeque elite — advisors and administrators to the cacique. Like a president\'s "cabinet," but in Taíno version. They had privileges and responsibilities.' },
      fr: { q: 'Les nobles taïno qui servaient le cacique et aidaient à gouverner s\'appelaient des _____.', answer: 'nitaínos', explanation: "Les nitaínos étaient l'élite du yucayeque — conseillers et administrateurs du cacique. Comme le \"cabinet\" d'un président, mais en version taïno. Ils avaient des privilèges et des responsabilités." }
    }
  },
  {
    id: 'cul-063', type: 'fill',
    lang: {
      es: { q: 'La palabra taína para la tormenta destructiva que hoy conocemos como "huracán" era _____.', answer: 'Juracán', explanation: 'Juracán era el dios taíno de las tormentas. Cuando los españoles experimentaron esos fenómenos, adoptaron la palabra. Hoy, prácticamente todos los idiomas del mundo usan una variante de "huracán".' },
      en: { q: 'The Taíno word for the destructive storm that we now know as "hurricane" was _____.', answer: 'Juracán', explanation: 'Juracán was the Taíno god of storms. When the Spanish experienced these phenomena, they adopted the word. Today, practically every language in the world uses a variant of "hurricane."' },
      fr: { q: 'Le mot taïno pour la tempête destructrice que nous connaissons aujourd\'hui comme "ouragan" était _____.', answer: 'Juracán', explanation: "Juracán était le dieu taïno des tempêtes. Quand les Espagnols ont vécu ces phénomènes, ils ont adopté le mot. Aujourd'hui, pratiquement toutes les langues du monde utilisent une variante d'\"ouragan\"." }
    }
  },
  {
    id: 'cul-064', type: 'fill',
    lang: {
      es: { q: 'El pan de yuca preparado por los taínos que sigue siendo popular en República Dominicana se llama _____.', answer: 'casabe', explanation: 'El casabe es el alimento más antiguo que se sigue consumiendo en RD — un link directo a la cultura taína en cada bocado. Es como comer un pedazo de historia viva.' },
      en: { q: 'The yuca bread prepared by the Taínos that remains popular in the Dominican Republic is called _____.', answer: 'casabe', explanation: 'Casabe is the oldest food still consumed in DR — a direct link to Taíno culture in every bite. It\'s like eating a piece of living history.' },
      fr: { q: 'Le pain de yuca préparé par les Taïnos qui reste populaire en République dominicaine s\'appelle _____.', answer: 'casabe', explanation: "Le casabe est l'aliment le plus ancien encore consommé en RD — un lien direct avec la culture taïno dans chaque bouchée. C'est comme manger un morceau d'histoire vivante." }
    }
  },
  {
    id: 'cul-065', type: 'fill',
    lang: {
      es: { q: 'La mujer educada junto a Enriquillo que fue co-líder de la resistencia se llamaba _____.', answer: 'Mencía', explanation: 'Mencía fue educada en un monasterio junto con Enriquillo. Fue estratega y co-líder de la resistencia. Su historia demuestra que las mujeres siempre fueron agentes de cambio, no solo espectadoras.' },
      en: { q: 'The woman educated alongside Enriquillo who was co-leader of the resistance was named _____.', answer: 'Mencía', explanation: 'Mencía was educated in a monastery along with Enriquillo. She was a strategist and co-leader of the resistance. Her story proves women were always agents of change, not just spectators.' },
      fr: { q: 'La femme éduquée aux côtés d\'Enriquillo qui était co-leader de la résistance s\'appelait _____.', answer: 'Mencía', explanation: "Mencía a été éduquée dans un monastère avec Enriquillo. Elle était stratège et co-leader de la résistance. Son histoire prouve que les femmes étaient toujours des agents de changement, pas de simples spectatrices." }
    }
  },
  {
    id: 'cul-066', type: 'fill',
    lang: {
      es: { q: 'La identidad dominicana es una mezcla de tres herencias: taína, española y _____.', answer: 'africana', explanation: 'La herencia africana es un pilar fundamental de la identidad dominicana. Desde la música hasta la resistencia cimarrona, África está presente en cada aspecto de la cultura dominicana.' },
      en: { q: 'Dominican identity is a blend of three heritages: Taíno, Spanish, and _____.', answer: 'African', explanation: 'African heritage is a fundamental pillar of Dominican identity. From music to maroon resistance, Africa is present in every aspect of Dominican culture.' },
      fr: { q: 'L\'identité dominicaine est un mélange de trois héritages : taïno, espagnol et _____.', answer: 'africain', explanation: "L'héritage africain est un pilier fondamental de l'identité dominicaine. De la musique à la résistance des marrons, l'Afrique est présente dans chaque aspect de la culture dominicaine." }
    }
  },
  {
    id: 'cul-067', type: 'fill',
    lang: {
      es: { q: 'La aleación de oro, plata y cobre que los taínos valoraban más que el oro puro se llamaba _____.', answer: 'guanín', explanation: 'El guanín demuestra que cada cultura define su propio "valor". Los españoles buscaban oro puro, pero los taínos apreciaban más esta aleación por su significado espiritual y estético.' },
      en: { q: 'The alloy of gold, silver, and copper that the Taínos valued more than pure gold was called _____.', answer: 'guanín', explanation: 'Guanín shows that each culture defines its own "value." The Spanish sought pure gold, but the Taínos appreciated this alloy more for its spiritual and aesthetic meaning.' },
      fr: { q: "L'alliage d'or, d'argent et de cuivre que les Taïnos valorisaient plus que l'or pur s'appelait _____.", answer: 'guanín', explanation: "Le guanín démontre que chaque culture définit sa propre \"valeur\". Les Espagnols cherchaient l'or pur, mais les Taïnos appréciaient davantage cet alliage pour sa signification spirituelle et esthétique." }
    }
  },
  {
    id: 'cul-068', type: 'fill',
    lang: {
      es: { q: 'El instrumento de percusión taíno hecho de una calabaza con semillas que todavía se usa en música dominicana es la _____.', answer: 'maraca', explanation: 'La maraca es uno de los legados musicales más directos de los taínos. Desde las ceremonias areíto hasta el merengue de hoy, esa vibración ha sonado por más de 500 años.' },
      en: { q: 'The Taíno percussion instrument made from a gourd with seeds that is still used in Dominican music is the _____.', answer: 'maraca', explanation: 'The maraca is one of the most direct musical legacies of the Taínos. From areíto ceremonies to today\'s merengue, that vibration has been sounding for over 500 years.' },
      fr: { q: 'L\'instrument de percussion taïno fait d\'une calebasse avec des graines qui est encore utilisé dans la musique dominicaine est le _____.', answer: 'maraca', explanation: "Le maraca est l'un des héritages musicaux les plus directs des Taïnos. Des cérémonies areíto au merengue d'aujourd'hui, cette vibration résonne depuis plus de 500 ans." }
    }
  },
  {
    id: 'cul-069', type: 'fill',
    lang: {
      es: { q: 'El proceso de mezcla de culturas (taína, española y africana) que creó la identidad dominicana se llama _____.', answer: 'mestizaje', explanation: 'El mestizaje no fue solo mezcla racial — fue una fusión de lenguas, comidas, música, creencias y tradiciones. Es lo que hace a la cultura dominicana tan rica y única.' },
      en: { q: 'The process of cultural mixing (Taíno, Spanish, and African) that created Dominican identity is called _____.', answer: 'mestizaje', explanation: 'Mestizaje wasn\'t just racial mixing — it was a fusion of languages, foods, music, beliefs, and traditions. It\'s what makes Dominican culture so rich and unique.' },
      fr: { q: "Le processus de mélange culturel (taïno, espagnol et africain) qui a créé l'identité dominicaine s'appelle le _____.", answer: 'métissage', explanation: "Le métissage n'était pas qu'un mélange racial — c'était une fusion de langues, nourritures, musiques, croyances et traditions. C'est ce qui rend la culture dominicaine si riche et unique." }
    }
  },
  {
    id: 'cul-070', type: 'fill',
    lang: {
      es: { q: 'El instrumento taíno de raspado hecho de calabaza que se usa en la música dominicana es el _____.', answer: 'güiro', explanation: 'El güiro es esencial en el merengue y la bachata — ese sonido raspado que te hace mover los pies. Cada vez que lo escuchas, un taíno ancestral sonríe.' },
      en: { q: 'The Taíno scraping instrument made from a gourd that is used in Dominican music is the _____.', answer: 'güiro', explanation: 'The güiro is essential in merengue and bachata — that scraping sound that makes your feet move. Every time you hear it, an ancestral Taíno smiles.' },
      fr: { q: 'L\'instrument taïno de grattage fait d\'une calebasse qui est utilisé dans la musique dominicaine est le _____.', answer: 'güiro', explanation: "Le güiro est essentiel dans le merengue et la bachata — ce son de grattage qui fait bouger les pieds. Chaque fois que tu l'entends, un Taïno ancestral sourit." }
    }
  },
  {
    id: 'cul-071', type: 'fill',
    lang: {
      es: { q: 'La primera ciudad europea permanente en América, hoy Patrimonio de la Humanidad, es la _____ de Santo Domingo.', answer: 'Zona Colonial', explanation: 'La Zona Colonial es el kilómetro cero de la historia colonial americana. Primera catedral, primera calle, primera universidad del "Nuevo Mundo". Un museo a cielo abierto.' },
      en: { q: 'The first permanent European city in the Americas, now a World Heritage Site, is the _____ of Santo Domingo.', answer: 'Zona Colonial', explanation: 'The Zona Colonial is ground zero of American colonial history. First cathedral, first street, first university of the "New World." An open-air museum.' },
      fr: { q: 'La première ville européenne permanente dans les Amériques, aujourd\'hui site du patrimoine mondial, est la _____ de Saint-Domingue.', answer: 'Zona Colonial', explanation: "La Zona Colonial est le kilomètre zéro de l'histoire coloniale américaine. Première cathédrale, première rue, première université du \"Nouveau Monde\". Un musée à ciel ouvert." }
    }
  },
  {
    id: 'cul-072', type: 'fill',
    lang: {
      es: { q: 'Los sacerdotes y curanderos de la sociedad taína que usaban plantas medicinales se llamaban _____.', answer: 'behiques', explanation: 'Los behiques eran los médicos, psicólogos y sacerdotes de los taínos, todo en uno. Conocían las propiedades de cientos de plantas. Sabiduría ancestral que la ciencia moderna está redescubriendo.' },
      en: { q: 'The priests and healers of Taíno society who used medicinal plants were called _____.', answer: 'behiques', explanation: 'Behiques were the doctors, psychologists, and priests of the Taínos, all in one. They knew the properties of hundreds of plants. Ancestral wisdom that modern science is rediscovering.' },
      fr: { q: 'Les prêtres et guérisseurs de la société taïno qui utilisaient des plantes médicinales s\'appelaient des _____.', answer: 'behiques', explanation: "Les behiques étaient les médecins, psychologues et prêtres des Taïnos, tout en un. Ils connaissaient les propriétés de centaines de plantes. Sagesse ancestrale que la science moderne redécouvre." }
    }
  },
  {
    id: 'cul-073', type: 'fill',
    lang: {
      es: { q: 'La gente común de la sociedad taína, que incluía trabajadores y artesanos, se llamaba _____.', answer: 'naborías', explanation: 'Los naborías eran el corazón del yucayeque — agricultores, artesanos, pescadores. Sin ellos, la sociedad no funcionaba. Como en todas las civilizaciones, la gente trabajadora es la base de todo.' },
      en: { q: 'The common people of Taíno society, which included workers and artisans, were called _____.', answer: 'naborías', explanation: 'The naborías were the heart of the yucayeque — farmers, artisans, fishers. Without them, society wouldn\'t function. Like in all civilizations, working people are the foundation of everything.' },
      fr: { q: 'Les gens du commun de la société taïno, qui comprenaient les travailleurs et artisans, s\'appelaient des _____.', answer: 'naborías', explanation: "Les naborías étaient le cœur du yucayeque — agriculteurs, artisans, pêcheurs. Sans eux, la société ne fonctionnerait pas. Comme dans toutes les civilisations, les travailleurs sont la base de tout." }
    }
  },
  {
    id: 'cul-074', type: 'fill',
    lang: {
      es: { q: 'ArcLycée está disponible en tres idiomas: español, inglés y _____.', answer: 'francés', explanation: 'El francés refleja que ArcLycée fue creado por estudiantes del Liceo Francés de Santo Domingo. La diversidad lingüística del juego refleja la diversidad cultural de sus creadores.' },
      en: { q: 'ArcLycée is available in three languages: Spanish, English, and _____.', answer: 'French', explanation: 'French reflects that ArcLycée was created by students at the Lycée Français in Santo Domingo. The game\'s linguistic diversity reflects the cultural diversity of its creators.' },
      fr: { q: 'ArcLycée est disponible en trois langues : espagnol, anglais et _____.', answer: 'français', explanation: "Le français reflète qu'ArcLycée a été créé par des élèves du Lycée Français de Saint-Domingue. La diversité linguistique du jeu reflète la diversité culturelle de ses créateurs." }
    }
  },
  {
    id: 'cul-075', type: 'fill',
    lang: {
      es: { q: 'El campo central de una aldea taína donde se jugaba batú y se celebraban areítos se llamaba _____.', answer: 'batey', explanation: 'El batey era el corazón social del yucayeque — como la plaza de un pueblo. Ahí se jugaba batú, se celebraban areítos y se tomaban decisiones comunitarias. La vida social taína sucedía en el batey.' },
      en: { q: 'The central field of a Taíno village where batú was played and areítos were celebrated was called a _____.', answer: 'batey', explanation: 'The batey was the social heart of the yucayeque — like a town square. Batú was played there, areítos were celebrated, and community decisions were made. Taíno social life happened in the batey.' },
      fr: { q: 'Le terrain central d\'un village taïno où l\'on jouait au batú et célébrait les areítos s\'appelait un _____.', answer: 'batey', explanation: "Le batey était le cœur social du yucayeque — comme la place d'un village. On y jouait au batú, on y célébrait les areítos et on y prenait les décisions communautaires. La vie sociale taïno se passait au batey." }
    }
  },

  // =============================================
  // EMPAREJAR (match) — 25 preguntas
  // =============================================

  {
    id: 'cul-076', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada palabra con su origen cultural:',
        pairs: [
          ['Hamaca', 'Taíno'],
          ['Palenque', 'Africano'],
          ['Catedral', 'Español'],
          ['Tambor', 'Africano']
        ],
        explanation: 'La hamaca y el tambor son herencias directas de taínos y africanos respectivamente. La catedral vino de España, y los palenques fueron creados por africanos esclavizados que escaparon.'
      },
      en: {
        q: 'Match each word with its cultural origin:',
        pairs: [
          ['Hammock', 'Taíno'],
          ['Palenque', 'African'],
          ['Cathedral', 'Spanish'],
          ['Drum', 'African']
        ],
        explanation: 'The hammock and drum are direct heritages from Taínos and Africans respectively. The cathedral came from Spain, and palenques were created by enslaved Africans who escaped.'
      },
      fr: {
        q: 'Associe chaque mot à son origine culturelle :',
        pairs: [
          ['Hamac', 'Taïno'],
          ['Palenque', 'Africain'],
          ['Cathédrale', 'Espagnol'],
          ['Tambour', 'Africain']
        ],
        explanation: 'Le hamac et le tambour sont des héritages directs des Taïnos et des Africains respectivement. La cathédrale venait d\'Espagne, et les palenques ont été créés par des Africains asservis qui se sont échappés.'
      }
    }
  },
  {
    id: 'cul-077', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada clase social taína con su rol:',
        pairs: [
          ['Cacique', 'Líder político de la aldea'],
          ['Nitaíno', 'Noble y consejero'],
          ['Behique', 'Sacerdote y curandero'],
          ['Naboría', 'Gente común trabajadora']
        ],
        explanation: 'La sociedad taína tenía una estructura clara: el cacique lideraba, los nitaínos aconsejaban, los behiques sanaban y guiaban espiritualmente, y los naborías eran la base trabajadora.'
      },
      en: {
        q: 'Match each Taíno social class with its role:',
        pairs: [
          ['Cacique', 'Political leader of the village'],
          ['Nitaíno', 'Noble and advisor'],
          ['Behique', 'Priest and healer'],
          ['Naboría', 'Working common people']
        ],
        explanation: 'Taíno society had a clear structure: the cacique led, nitaínos advised, behiques healed and guided spiritually, and naborías were the working base.'
      },
      fr: {
        q: 'Associe chaque classe sociale taïno à son rôle :',
        pairs: [
          ['Cacique', 'Leader politique du village'],
          ['Nitaíno', 'Noble et conseiller'],
          ['Behique', 'Prêtre et guérisseur'],
          ['Naboría', 'Gens du commun travailleurs']
        ],
        explanation: 'La société taïno avait une structure claire : le cacique dirigeait, les nitaínos conseillaient, les behiques soignaient et guidaient spirituellement, et les naborías étaient la base travailleuse.'
      }
    }
  },
  {
    id: 'cul-078', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada líder histórico con su acción principal:',
        pairs: [
          ['Anacaona', 'Gobernó Xaragua como cacica y poeta'],
          ['Enriquillo', 'Negoció un tratado de paz con España'],
          ['Sebastián Lemba', 'Fundó un palenque cimarrón'],
          ['Mencía', 'Co-lideró la resistencia con Enriquillo']
        ],
        explanation: 'Cada uno resistió a su manera: Anacaona con liderazgo y arte, Enriquillo con leyes, Lemba con fuga y comunidad, y Mencía con estrategia. No hay un solo tipo de héroe.'
      },
      en: {
        q: 'Match each historical leader with their main action:',
        pairs: [
          ['Anacaona', 'Governed Xaragua as cacica and poet'],
          ['Enriquillo', 'Negotiated a peace treaty with Spain'],
          ['Sebastián Lemba', 'Founded a maroon palenque'],
          ['Mencía', 'Co-led the resistance with Enriquillo']
        ],
        explanation: 'Each resisted in their own way: Anacaona with leadership and art, Enriquillo with laws, Lemba with escape and community, and Mencía with strategy. There\'s not just one type of hero.'
      },
      fr: {
        q: 'Associe chaque leader historique à son action principale :',
        pairs: [
          ['Anacaona', 'A gouverné Xaragua comme cacica et poétesse'],
          ['Enriquillo', 'A négocié un traité de paix avec l\'Espagne'],
          ['Sebastián Lemba', 'A fondé un palenque marron'],
          ['Mencía', 'A co-dirigé la résistance avec Enriquillo']
        ],
        explanation: 'Chacun a résisté à sa manière : Anacaona avec le leadership et l\'art, Enriquillo avec les lois, Lemba avec la fuite et la communauté, et Mencía avec la stratégie. Il n\'y a pas qu\'un seul type de héros.'
      }
    }
  },
  {
    id: 'cul-079', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada palabra taína con lo que significa hoy:',
        pairs: [
          ['Hamaca', 'Cama colgante para descansar'],
          ['Canoa', 'Embarcación pequeña'],
          ['Barbacoa', 'Método de cocinar sobre fuego'],
          ['Huracán', 'Tormenta tropical destructiva']
        ],
        explanation: 'Estas cuatro palabras taínas se usan en español, inglés, francés y muchos otros idiomas. Los taínos dejaron su huella lingüística en todo el planeta. Nada mal para una cultura "desaparecida".'
      },
      en: {
        q: 'Match each Taíno word with what it means today:',
        pairs: [
          ['Hammock', 'Hanging bed for resting'],
          ['Canoe', 'Small boat'],
          ['Barbecue', 'Method of cooking over fire'],
          ['Hurricane', 'Destructive tropical storm']
        ],
        explanation: 'These four Taíno words are used in Spanish, English, French, and many other languages. The Taínos left their linguistic mark on the entire planet. Not bad for a "disappeared" culture.'
      },
      fr: {
        q: 'Associe chaque mot taïno à ce qu\'il signifie aujourd\'hui :',
        pairs: [
          ['Hamac', 'Lit suspendu pour se reposer'],
          ['Canoë', 'Petite embarcation'],
          ['Barbecue', 'Méthode de cuisson sur le feu'],
          ['Ouragan', 'Tempête tropicale destructrice']
        ],
        explanation: 'Ces quatre mots taïnos sont utilisés en espagnol, anglais, français et bien d\'autres langues. Les Taïnos ont laissé leur empreinte linguistique sur toute la planète. Pas mal pour une culture "disparue".'
      }
    }
  },
  {
    id: 'cul-080', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada elemento cultural taíno con su función:',
        pairs: [
          ['Bohío', 'Vivienda circular familiar'],
          ['Batey', 'Campo central para juegos y ceremonias'],
          ['Conuco', 'Terreno agrícola con montículos'],
          ['Caney', 'Casa grande del cacique']
        ],
        explanation: 'Cada espacio tenía un propósito claro en el yucayeque. Los bohíos para vivir, el batey para socializar, el conuco para comer y el caney para gobernar. Una sociedad bien organizada.'
      },
      en: {
        q: 'Match each Taíno cultural element with its function:',
        pairs: [
          ['Bohío', 'Circular family dwelling'],
          ['Batey', 'Central field for games and ceremonies'],
          ['Conuco', 'Agricultural land with mounds'],
          ['Caney', 'Large house of the cacique']
        ],
        explanation: 'Each space had a clear purpose in the yucayeque. Bohíos for living, batey for socializing, conuco for eating, and caney for governing. A well-organized society.'
      },
      fr: {
        q: 'Associe chaque élément culturel taïno à sa fonction :',
        pairs: [
          ['Bohío', 'Habitation circulaire familiale'],
          ['Batey', 'Terrain central pour jeux et cérémonies'],
          ['Conuco', 'Terrain agricole avec des buttes'],
          ['Caney', 'Grande maison du cacique']
        ],
        explanation: 'Chaque espace avait un but clair dans le yucayeque. Les bohíos pour vivre, le batey pour socialiser, le conuco pour manger et le caney pour gouverner. Une société bien organisée.'
      }
    }
  },
  {
    id: 'cul-081', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada herencia cultural con un ejemplo concreto en la RD actual:',
        pairs: [
          ['Herencia taína', 'El casabe como alimento básico'],
          ['Herencia española', 'La Zona Colonial de Santo Domingo'],
          ['Herencia africana', 'Los tambores en la música popular'],
          ['Mestizaje', 'La identidad dominicana tri-étnica']
        ],
        explanation: 'Lo genial de la cultura dominicana es que puedes ver las tres herencias en la vida cotidiana. No están en museos — están vivas en la comida, la arquitectura, la música y la gente.'
      },
      en: {
        q: 'Match each cultural heritage with a concrete example in today\'s DR:',
        pairs: [
          ['Taíno heritage', 'Casabe as a staple food'],
          ['Spanish heritage', 'The Zona Colonial of Santo Domingo'],
          ['African heritage', 'Drums in popular music'],
          ['Mestizaje', 'The tri-ethnic Dominican identity']
        ],
        explanation: 'The cool thing about Dominican culture is you can see all three heritages in daily life. They\'re not in museums — they\'re alive in food, architecture, music, and people.'
      },
      fr: {
        q: "Associe chaque héritage culturel à un exemple concret dans la RD d'aujourd'hui :",
        pairs: [
          ['Héritage taïno', 'Le casabe comme aliment de base'],
          ['Héritage espagnol', 'La Zona Colonial de Saint-Domingue'],
          ['Héritage africain', 'Les tambours dans la musique populaire'],
          ['Métissage', 'L\'identité dominicaine tri-ethnique']
        ],
        explanation: "Ce qui est génial dans la culture dominicaine, c'est qu'on peut voir les trois héritages dans la vie quotidienne. Ils ne sont pas dans les musées — ils sont vivants dans la nourriture, l'architecture, la musique et les gens."
      }
    }
  },
  {
    id: 'cul-082', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada instrumento musical con su origen:',
        pairs: [
          ['Maraca', 'Taíno'],
          ['Güiro', 'Taíno'],
          ['Tambor', 'Africano'],
          ['Guitarra', 'Español']
        ],
        explanation: 'La música dominicana es literalmente una mezcla de tres continentes: instrumentos taínos (maracas, güiro), africanos (tambores) y europeos (guitarra). Por eso suena tan única.'
      },
      en: {
        q: 'Match each musical instrument with its origin:',
        pairs: [
          ['Maraca', 'Taíno'],
          ['Güiro', 'Taíno'],
          ['Drum', 'African'],
          ['Guitar', 'Spanish']
        ],
        explanation: 'Dominican music is literally a mix of three continents: Taíno instruments (maracas, güiro), African (drums), and European (guitar). That\'s why it sounds so unique.'
      },
      fr: {
        q: 'Associe chaque instrument de musique à son origine :',
        pairs: [
          ['Maraca', 'Taïno'],
          ['Güiro', 'Taïno'],
          ['Tambour', 'Africain'],
          ['Guitare', 'Espagnol']
        ],
        explanation: 'La musique dominicaine est littéralement un mélange de trois continents : instruments taïnos (maracas, güiro), africains (tambours) et européens (guitare). C\'est pourquoi elle sonne si unique.'
      }
    }
  },
  {
    id: 'cul-083', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada forma de resistencia con su protagonista:',
        pairs: [
          ['Resistencia legal (tratado)', 'Enriquillo'],
          ['Resistencia cultural (poesía)', 'Anacaona'],
          ['Resistencia cimarrona (fuga)', 'Sebastián Lemba'],
          ['Resistencia estratégica (co-liderazgo)', 'Mencía']
        ],
        explanation: 'La resistencia no tiene una sola forma. Enriquillo usó la ley, Anacaona el arte, Lemba la fuga y Mencía la estrategia. Cada uno encontró su propio camino para luchar.'
      },
      en: {
        q: 'Match each form of resistance with its protagonist:',
        pairs: [
          ['Legal resistance (treaty)', 'Enriquillo'],
          ['Cultural resistance (poetry)', 'Anacaona'],
          ['Maroon resistance (escape)', 'Sebastián Lemba'],
          ['Strategic resistance (co-leadership)', 'Mencía']
        ],
        explanation: 'Resistance doesn\'t have just one form. Enriquillo used law, Anacaona used art, Lemba used escape, and Mencía used strategy. Each found their own path to fight.'
      },
      fr: {
        q: 'Associe chaque forme de résistance à son protagoniste :',
        pairs: [
          ['Résistance légale (traité)', 'Enriquillo'],
          ['Résistance culturelle (poésie)', 'Anacaona'],
          ['Résistance marronne (fuite)', 'Sebastián Lemba'],
          ['Résistance stratégique (co-leadership)', 'Mencía']
        ],
        explanation: "La résistance n'a pas qu'une seule forme. Enriquillo a utilisé la loi, Anacaona l'art, Lemba la fuite et Mencía la stratégie. Chacun a trouvé son propre chemin pour lutter."
      }
    }
  },
  {
    id: 'cul-084', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada concepto cultural con su análogo en la cultura pop:',
        pairs: [
          ['Identidad multi-étnica dominicana', 'Miles Morales (Spider-Man multicultural)'],
          ['Preservar patrimonio arqueológico', 'Proteger Horrocruxes (Harry Potter)'],
          ['Palenques cimarrones', 'Base rebelde (Star Wars)'],
          ['Behiques (curanderos)', 'Jedi (guardianes sabios)']
        ],
        explanation: 'La cultura pop nos ayuda a entender conceptos históricos. La clave es que estas comparaciones no trivializan la historia — la hacen accesible y relatable.'
      },
      en: {
        q: 'Match each cultural concept with its pop culture analogue:',
        pairs: [
          ['Multi-ethnic Dominican identity', 'Miles Morales (multicultural Spider-Man)'],
          ['Preserving archaeological heritage', 'Protecting Horcruxes (Harry Potter)'],
          ['Maroon palenques', 'Rebel base (Star Wars)'],
          ['Behiques (healers)', 'Jedi (wise guardians)']
        ],
        explanation: 'Pop culture helps us understand historical concepts. The key is that these comparisons don\'t trivialize history — they make it accessible and relatable.'
      },
      fr: {
        q: 'Associe chaque concept culturel à son analogue dans la culture pop :',
        pairs: [
          ['Identité multi-ethnique dominicaine', 'Miles Morales (Spider-Man multiculturel)'],
          ['Préserver le patrimoine archéologique', 'Protéger les Horcruxes (Harry Potter)'],
          ['Palenques marrons', 'Base rebelle (Star Wars)'],
          ['Behiques (guérisseurs)', 'Jedi (gardiens sages)']
        ],
        explanation: "La culture pop nous aide à comprendre les concepts historiques. La clé est que ces comparaisons ne trivialisent pas l'histoire — elles la rendent accessible et relatable."
      }
    }
  },
  {
    id: 'cul-085', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada alimento con su herencia cultural:',
        pairs: [
          ['Casabe (pan de yuca)', 'Herencia taína'],
          ['Mangú (plátano)', 'Herencia africana'],
          ['Arroz con habichuelas', 'Mestizaje (mezcla)'],
          ['Pan de trigo', 'Herencia española']
        ],
        explanation: 'La mesa dominicana es un mapa cultural. Cada plato cuenta la historia de un pueblo: el casabe de los taínos, el mangú de África, el pan de España, y el arroz con habichuelas como símbolo de fusión.'
      },
      en: {
        q: 'Match each food with its cultural heritage:',
        pairs: [
          ['Casabe (yuca bread)', 'Taíno heritage'],
          ['Mangú (plantain)', 'African heritage'],
          ['Rice and beans', 'Mestizaje (mixing)'],
          ['Wheat bread', 'Spanish heritage']
        ],
        explanation: 'The Dominican table is a cultural map. Each dish tells a people\'s story: casabe from the Taínos, mangú from Africa, bread from Spain, and rice and beans as a symbol of fusion.'
      },
      fr: {
        q: 'Associe chaque aliment à son héritage culturel :',
        pairs: [
          ['Casabe (pain de yuca)', 'Héritage taïno'],
          ['Mangú (plantain)', 'Héritage africain'],
          ['Riz et haricots', 'Métissage (mélange)'],
          ['Pain de blé', 'Héritage espagnol']
        ],
        explanation: "La table dominicaine est une carte culturelle. Chaque plat raconte l'histoire d'un peuple : le casabe des Taïnos, le mangú d'Afrique, le pain d'Espagne, et le riz aux haricots comme symbole de fusion."
      }
    }
  },
  {
    id: 'cul-086', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada fecha con su evento histórico:',
        pairs: [
          ['1503', 'Ejecución de Anacaona por Ovando'],
          ['1519-1533', 'Rebelión de Enriquillo'],
          ['~1540', 'Palenque de Sebastián Lemba'],
          ['1492', 'Llegada de Colón a Hispaniola']
        ],
        explanation: 'En solo 50 años (1492-1540) pasaron eventos que cambiarían la historia del Caribe para siempre: contacto, conquista, resistencia indígena y cimarrona. Un siglo de transformación total.'
      },
      en: {
        q: 'Match each date with its historical event:',
        pairs: [
          ['1503', 'Execution of Anacaona by Ovando'],
          ['1519-1533', 'Enriquillo\'s rebellion'],
          ['~1540', 'Sebastián Lemba\'s palenque'],
          ['1492', 'Columbus\'s arrival in Hispaniola']
        ],
        explanation: 'In just 50 years (1492-1540), events happened that would change Caribbean history forever: contact, conquest, indigenous and maroon resistance. A century of total transformation.'
      },
      fr: {
        q: 'Associe chaque date à son événement historique :',
        pairs: [
          ['1503', 'Exécution d\'Anacaona par Ovando'],
          ['1519-1533', 'Rébellion d\'Enriquillo'],
          ['~1540', 'Palenque de Sebastián Lemba'],
          ['1492', 'Arrivée de Colomb à Hispaniola']
        ],
        explanation: 'En seulement 50 ans (1492-1540), des événements se sont produits qui allaient changer l\'histoire des Caraïbes pour toujours : contact, conquête, résistance indigène et marronne. Un siècle de transformation totale.'
      }
    }
  },
  {
    id: 'cul-087', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada ceremonia/actividad taína con su descripción:',
        pairs: [
          ['Areíto', 'Danza ceremonial con canto e historia oral'],
          ['Batú', 'Juego de pelota con caderas y rodillas'],
          ['Cohoba', 'Ritual espiritual del behique'],
          ['Conuco', 'Trabajo agrícola comunitario']
        ],
        explanation: 'Los taínos tenían una vida cultural rica: ceremonias para conectar con los espíritus (areíto, cohoba), deportes (batú) y trabajo comunitario (conuco). Una sociedad completa y vibrante.'
      },
      en: {
        q: 'Match each Taíno ceremony/activity with its description:',
        pairs: [
          ['Areíto', 'Ceremonial dance with song and oral history'],
          ['Batú', 'Ball game with hips and knees'],
          ['Cohoba', 'Spiritual ritual of the behique'],
          ['Conuco', 'Community agricultural work']
        ],
        explanation: 'The Taínos had a rich cultural life: ceremonies for spirit connection (areíto, cohoba), sports (batú), and community work (conuco). A complete and vibrant society.'
      },
      fr: {
        q: 'Associe chaque cérémonie/activité taïno à sa description :',
        pairs: [
          ['Areíto', 'Danse cérémonielle avec chant et histoire orale'],
          ['Batú', 'Jeu de balle avec hanches et genoux'],
          ['Cohoba', 'Rituel spirituel du behique'],
          ['Conuco', 'Travail agricole communautaire']
        ],
        explanation: 'Les Taïnos avaient une vie culturelle riche : cérémonies de connexion spirituelle (areíto, cohoba), sports (batú) et travail communautaire (conuco). Une société complète et vibrante.'
      }
    }
  },
  {
    id: 'cul-088', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada idioma de ArcLycée con su conexión cultural:',
        pairs: [
          ['Español', 'Idioma oficial de República Dominicana'],
          ['Francés', 'Idioma del Liceo Francés donde se creó el juego'],
          ['Inglés', 'Idioma internacional de los videojuegos'],
          ['Taíno (en el contenido)', 'Herencia indígena presente en vocabulario']
        ],
        explanation: 'El trilingüismo de ArcLycée no es casual — refleja la realidad multicultural de sus creadores y la diversidad lingüística del Caribe. ¡Y el taíno sobrevive en el contenido educativo!'
      },
      en: {
        q: 'Match each ArcLycée language with its cultural connection:',
        pairs: [
          ['Spanish', 'Official language of the Dominican Republic'],
          ['French', 'Language of the Lycée Français where the game was created'],
          ['English', 'International language of video games'],
          ['Taíno (in content)', 'Indigenous heritage present in vocabulary']
        ],
        explanation: 'ArcLycée\'s trilingualism isn\'t accidental — it reflects the multicultural reality of its creators and the linguistic diversity of the Caribbean. And Taíno survives in the educational content!'
      },
      fr: {
        q: "Associe chaque langue d'ArcLycée à sa connexion culturelle :",
        pairs: [
          ['Espagnol', 'Langue officielle de la République dominicaine'],
          ['Français', 'Langue du Lycée Français où le jeu a été créé'],
          ['Anglais', 'Langue internationale des jeux vidéo'],
          ['Taïno (dans le contenu)', 'Héritage indigène présent dans le vocabulaire']
        ],
        explanation: "Le trilinguisme d'ArcLycée n'est pas un hasard — il reflète la réalité multiculturelle de ses créateurs et la diversité linguistique des Caraïbes. Et le taïno survit dans le contenu éducatif !"
      }
    }
  },
  {
    id: 'cul-089', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada valor de ArcLycée con su aplicación en el juego:',
        pairs: [
          ['Respeto cultural', 'Presentar culturas sin estereotipos'],
          ['Pensamiento crítico', 'Mostrar complejidad, no "buenos vs malos"'],
          ['Preservación', 'Misiones sobre proteger sitios arqueológicos'],
          ['Diversidad', 'Trilingüe con herencia taína, española y africana']
        ],
        explanation: 'ArcLycée no es solo un juego — es una declaración de valores. Cada mecánica enseña algo sobre cómo tratar la historia y las culturas con respeto e inteligencia.'
      },
      en: {
        q: 'Match each ArcLycée value with its application in the game:',
        pairs: [
          ['Cultural respect', 'Presenting cultures without stereotypes'],
          ['Critical thinking', 'Showing complexity, not "good vs evil"'],
          ['Preservation', 'Missions about protecting archaeological sites'],
          ['Diversity', 'Trilingual with Taíno, Spanish, and African heritage']
        ],
        explanation: 'ArcLycée isn\'t just a game — it\'s a statement of values. Every mechanic teaches something about treating history and cultures with respect and intelligence.'
      },
      fr: {
        q: "Associe chaque valeur d'ArcLycée à son application dans le jeu :",
        pairs: [
          ['Respect culturel', 'Présenter les cultures sans stéréotypes'],
          ['Pensée critique', 'Montrer la complexité, pas "bons vs méchants"'],
          ['Préservation', 'Missions sur la protection des sites archéologiques'],
          ['Diversité', 'Trilingue avec héritage taïno, espagnol et africain']
        ],
        explanation: "ArcLycée n'est pas qu'un jeu — c'est une déclaration de valeurs. Chaque mécanique enseigne quelque chose sur comment traiter l'histoire et les cultures avec respect et intelligence."
      }
    }
  },
  {
    id: 'cul-090', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada personaje histórico con su siglo:',
        pairs: [
          ['Anacaona', 'Siglo XV-XVI (murió en 1503)'],
          ['Enriquillo', 'Siglo XVI (rebelión 1519-1533)'],
          ['Sebastián Lemba', 'Siglo XVI (~1540)'],
          ['Cristóbal Colón', 'Siglo XV (llegó en 1492)']
        ],
        explanation: 'Todos estos personajes vivieron en el mismo siglo turbulento — entre finales del XV y mediados del XVI. Fue la era del contacto, la conquista y las primeras resistencias.'
      },
      en: {
        q: 'Match each historical character with their century:',
        pairs: [
          ['Anacaona', '15th-16th century (died 1503)'],
          ['Enriquillo', '16th century (rebellion 1519-1533)'],
          ['Sebastián Lemba', '16th century (~1540)'],
          ['Christopher Columbus', '15th century (arrived 1492)']
        ],
        explanation: 'All these characters lived in the same turbulent century — between the late 15th and mid-16th. It was the era of contact, conquest, and the first resistances.'
      },
      fr: {
        q: 'Associe chaque personnage historique à son siècle :',
        pairs: [
          ['Anacaona', 'XVe-XVIe siècle (morte en 1503)'],
          ['Enriquillo', 'XVIe siècle (rébellion 1519-1533)'],
          ['Sebastián Lemba', 'XVIe siècle (~1540)'],
          ['Christophe Colomb', 'XVe siècle (arrivé en 1492)']
        ],
        explanation: "Tous ces personnages ont vécu dans le même siècle turbulent — entre la fin du XVe et le milieu du XVIe. C'était l'ère du contact, de la conquête et des premières résistances."
      }
    }
  },
  {
    id: 'cul-091', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada tipo de vivienda con su cultura:',
        pairs: [
          ['Bohío circular', 'Taínos del Caribe'],
          ['Choza circular africana', 'Cimarrones del palenque'],
          ['Casa colonial de piedra', 'Colonizadores españoles'],
          ['Caney rectangular', 'Cacique taíno']
        ],
        explanation: 'Cada cultura construía según sus necesidades y tradiciones. Los bohíos resistían huracanes, las chozas africanas preservaban tradiciones del continente, y las casas coloniales imitaban a Europa.'
      },
      en: {
        q: 'Match each type of dwelling with its culture:',
        pairs: [
          ['Circular bohío', 'Caribbean Taínos'],
          ['Circular African hut', 'Palenque maroons'],
          ['Colonial stone house', 'Spanish colonizers'],
          ['Rectangular caney', 'Taíno cacique']
        ],
        explanation: 'Each culture built according to their needs and traditions. Bohíos withstood hurricanes, African huts preserved continental traditions, and colonial houses imitated Europe.'
      },
      fr: {
        q: 'Associe chaque type d\'habitation à sa culture :',
        pairs: [
          ['Bohío circulaire', 'Taïnos des Caraïbes'],
          ['Hutte circulaire africaine', 'Marrons du palenque'],
          ['Maison coloniale en pierre', 'Colonisateurs espagnols'],
          ['Caney rectangulaire', 'Cacique taïno']
        ],
        explanation: "Chaque culture construisait selon ses besoins et traditions. Les bohíos résistaient aux ouragans, les huttes africaines préservaient les traditions du continent, et les maisons coloniales imitaient l'Europe."
      }
    }
  },
  {
    id: 'cul-092', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada razón de preservar el patrimonio con su beneficio:',
        pairs: [
          ['Identidad', 'Saber quiénes somos y de dónde venimos'],
          ['Educación', 'Aprender de las culturas del pasado'],
          ['Turismo cultural', 'Desarrollo económico sostenible'],
          ['Justicia histórica', 'Reconocer las contribuciones de todos los pueblos']
        ],
        explanation: 'Preservar el patrimonio no es solo nostalgia — tiene beneficios prácticos: fortalece la identidad, educa, genera economía y hace justicia a las historias olvidadas. Es ganar-ganar-ganar-ganar.'
      },
      en: {
        q: 'Match each reason for preserving heritage with its benefit:',
        pairs: [
          ['Identity', 'Knowing who we are and where we come from'],
          ['Education', 'Learning from past cultures'],
          ['Cultural tourism', 'Sustainable economic development'],
          ['Historical justice', 'Recognizing the contributions of all peoples']
        ],
        explanation: 'Preserving heritage isn\'t just nostalgia — it has practical benefits: it strengthens identity, educates, generates economy, and does justice to forgotten stories. It\'s win-win-win-win.'
      },
      fr: {
        q: 'Associe chaque raison de préserver le patrimoine à son bénéfice :',
        pairs: [
          ['Identité', "Savoir qui nous sommes et d'où nous venons"],
          ['Éducation', 'Apprendre des cultures du passé'],
          ['Tourisme culturel', 'Développement économique durable'],
          ['Justice historique', 'Reconnaître les contributions de tous les peuples']
        ],
        explanation: "Préserver le patrimoine n'est pas que de la nostalgie — ça a des bénéfices pratiques : renforcer l'identité, éduquer, générer de l'économie et rendre justice aux histoires oubliées. C'est gagnant-gagnant-gagnant-gagnant."
      }
    }
  },
  {
    id: 'cul-093', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada cultivo taíno con su importancia:',
        pairs: [
          ['Yuca', 'Base del casabe, alimento principal'],
          ['Maíz', 'Cereal para tortillas y bebidas'],
          ['Batata (camote)', 'Tubérculo dulce nutritivo'],
          ['Tabaco', 'Uso ceremonial y espiritual']
        ],
        explanation: 'La agricultura taína era diversa y sostenible. La yuca era la estrella (casabe), pero también cultivaban maíz, batata, ají y tabaco (para ceremonias, no para fumar por diversión).'
      },
      en: {
        q: 'Match each Taíno crop with its importance:',
        pairs: [
          ['Yuca', 'Base for casabe, main food source'],
          ['Corn', 'Cereal for tortillas and beverages'],
          ['Sweet potato', 'Nutritious sweet tuber'],
          ['Tobacco', 'Ceremonial and spiritual use']
        ],
        explanation: 'Taíno agriculture was diverse and sustainable. Yuca was the star (casabe), but they also grew corn, sweet potato, chili peppers, and tobacco (for ceremonies, not recreational smoking).'
      },
      fr: {
        q: 'Associe chaque culture taïno à son importance :',
        pairs: [
          ['Yuca', 'Base du casabe, aliment principal'],
          ['Maïs', 'Céréale pour tortillas et boissons'],
          ['Patate douce', 'Tubercule sucré nutritif'],
          ['Tabac', 'Usage cérémoniel et spirituel']
        ],
        explanation: "L'agriculture taïno était diverse et durable. Le yuca était la star (casabe), mais ils cultivaient aussi le maïs, la patate douce, le piment et le tabac (pour les cérémonies, pas pour fumer par plaisir)."
      }
    }
  },
  {
    id: 'cul-094', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada aspecto de la resistencia de Enriquillo con su significado:',
        pairs: [
          ['Educación por frailes', 'Adquirió herramientas biculturales'],
          ['Uso de la ley española', 'Venció al sistema con sus propias reglas'],
          ['14 años de resistencia', 'Perseverancia y estrategia a largo plazo'],
          ['Tratado de paz', 'Victoria diplomática sin rendición']
        ],
        explanation: 'Enriquillo fue el primer "hacker social" del Caribe: usó las herramientas del colonizador para derrotarlo legalmente. 14 años de resistencia inteligente que terminaron en un tratado de paz.'
      },
      en: {
        q: 'Match each aspect of Enriquillo\'s resistance with its meaning:',
        pairs: [
          ['Education by friars', 'Acquired bicultural tools'],
          ['Use of Spanish law', 'Beat the system with its own rules'],
          ['14 years of resistance', 'Perseverance and long-term strategy'],
          ['Peace treaty', 'Diplomatic victory without surrender']
        ],
        explanation: 'Enriquillo was the first "social hacker" of the Caribbean: he used the colonizer\'s tools to defeat them legally. 14 years of smart resistance that ended in a peace treaty.'
      },
      fr: {
        q: "Associe chaque aspect de la résistance d'Enriquillo à sa signification :",
        pairs: [
          ['Éducation par des frères', 'A acquis des outils biculturels'],
          ['Usage du droit espagnol', 'A battu le système avec ses propres règles'],
          ['14 ans de résistance', 'Persévérance et stratégie à long terme'],
          ['Traité de paix', 'Victoire diplomatique sans reddition']
        ],
        explanation: "Enriquillo fut le premier \"hacker social\" des Caraïbes : il a utilisé les outils du colonisateur pour le vaincre légalement. 14 ans de résistance intelligente qui se sont terminés par un traité de paix."
      }
    }
  },
  {
    id: 'cul-095', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada concepto de diversidad con su ejemplo en el Caribe:',
        pairs: [
          ['Multilingüismo', 'Español, francés, criollo e inglés coexisten'],
          ['Multietnicidad', 'Raíces taínas, europeas y africanas'],
          ['Sincretismo religioso', 'Mezcla de catolicismo y creencias africanas/taínas'],
          ['Gastronomía fusión', 'Casabe + arroz + plátano en una misma mesa']
        ],
        explanation: 'El Caribe es una de las regiones más diversas del planeta. Múltiples idiomas, etnias, religiones y cocinas conviven y se mezclan. La diversidad es la norma, no la excepción.'
      },
      en: {
        q: 'Match each diversity concept with its Caribbean example:',
        pairs: [
          ['Multilingualism', 'Spanish, French, Creole, and English coexist'],
          ['Multi-ethnicity', 'Taíno, European, and African roots'],
          ['Religious syncretism', 'Mix of Catholicism and African/Taíno beliefs'],
          ['Fusion cuisine', 'Casabe + rice + plantain on the same table']
        ],
        explanation: 'The Caribbean is one of the most diverse regions on the planet. Multiple languages, ethnicities, religions, and cuisines coexist and mix. Diversity is the norm, not the exception.'
      },
      fr: {
        q: 'Associe chaque concept de diversité à son exemple caribéen :',
        pairs: [
          ['Multilinguisme', 'Espagnol, français, créole et anglais coexistent'],
          ['Multi-ethnicité', 'Racines taïno, européennes et africaines'],
          ['Syncrétisme religieux', 'Mélange de catholicisme et croyances africaines/taïno'],
          ['Cuisine fusion', 'Casabe + riz + plantain sur la même table']
        ],
        explanation: "Les Caraïbes sont l'une des régions les plus diverses de la planète. Multiples langues, ethnies, religions et cuisines coexistent et se mélangent. La diversité est la norme, pas l'exception."
      }
    }
  },
  {
    id: 'cul-096', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada "primero" de la Zona Colonial con su importancia:',
        pairs: [
          ['Primera catedral de América', 'Símbolo del poder religioso colonial'],
          ['Primera universidad', 'Inicio de la educación formal europea'],
          ['Primera calle empedrada', 'Infraestructura urbana europea'],
          ['Primer hospital', 'Atención médica al estilo europeo']
        ],
        explanation: 'La Zona Colonial fue el "prototipo" de todas las ciudades coloniales americanas. Todo lo que vino después se basó en lo que se probó primero en Santo Domingo.'
      },
      en: {
        q: 'Match each Zona Colonial "first" with its importance:',
        pairs: [
          ['First cathedral in the Americas', 'Symbol of colonial religious power'],
          ['First university', 'Start of formal European education'],
          ['First paved street', 'European urban infrastructure'],
          ['First hospital', 'European-style medical care']
        ],
        explanation: 'The Zona Colonial was the "prototype" for all American colonial cities. Everything that came after was based on what was first tested in Santo Domingo.'
      },
      fr: {
        q: 'Associe chaque "première" de la Zona Colonial à son importance :',
        pairs: [
          ['Première cathédrale des Amériques', 'Symbole du pouvoir religieux colonial'],
          ['Première université', "Début de l'éducation formelle européenne"],
          ['Première rue pavée', 'Infrastructure urbaine européenne'],
          ['Premier hôpital', 'Soins médicaux à l\'européenne']
        ],
        explanation: "La Zona Colonial était le \"prototype\" de toutes les villes coloniales américaines. Tout ce qui est venu après s'est basé sur ce qui a d'abord été testé à Saint-Domingue."
      }
    }
  },
  {
    id: 'cul-097', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada pregunta de pensamiento crítico con su respuesta clave:',
        pairs: [
          ['¿Por qué importa conocer tu herencia?', 'Te da raíces e identidad'],
          ['¿La conquista fue solo destrucción?', 'No, también hubo resistencia y mestizaje'],
          ['¿Los estereotipos culturales importan?', 'Sí, moldean cómo vemos a otros'],
          ['¿Qué se pierde al destruir sitios arqueológicos?', 'Historias irreemplazables de la humanidad']
        ],
        explanation: 'El pensamiento crítico es el superpoder más importante. No aceptar respuestas simples, buscar la complejidad y cuestionar lo que parece obvio — eso te hace realmente inteligente.'
      },
      en: {
        q: 'Match each critical thinking question with its key answer:',
        pairs: [
          ['Why does knowing your heritage matter?', 'It gives you roots and identity'],
          ['Was conquest only destruction?', 'No, there was also resistance and mestizaje'],
          ['Do cultural stereotypes matter?', 'Yes, they shape how we see others'],
          ['What is lost when destroying archaeological sites?', 'Irreplaceable stories of humanity']
        ],
        explanation: 'Critical thinking is the most important superpower. Not accepting simple answers, seeking complexity, and questioning what seems obvious — that\'s what makes you truly smart.'
      },
      fr: {
        q: 'Associe chaque question de pensée critique à sa réponse clé :',
        pairs: [
          ['Pourquoi connaître ton héritage est important ?', 'Ça te donne des racines et une identité'],
          ['La conquête n\'était que destruction ?', 'Non, il y a eu aussi résistance et métissage'],
          ['Les stéréotypes culturels importent-ils ?', 'Oui, ils façonnent comment nous voyons les autres'],
          ['Que perd-on en détruisant des sites archéologiques ?', "Des histoires irremplaçables de l'humanité"]
        ],
        explanation: "La pensée critique est le super-pouvoir le plus important. Ne pas accepter les réponses simples, chercher la complexité et questionner ce qui semble évident — c'est ça qui te rend vraiment intelligent."
      }
    }
  },
  {
    id: 'cul-098', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada contribución de Anacaona con su impacto:',
        pairs: [
          ['Liderazgo como cacica', 'Demostró que las mujeres podían gobernar'],
          ['Poesía y areítos', 'Preservó la cultura taína a través del arte'],
          ['Diplomacia con españoles', 'Intentó la paz antes que la guerra'],
          ['Su legado como símbolo', 'Ícono de resistencia y dignidad caribeña']
        ],
        explanation: 'Anacaona fue multifacética: líder política, artista, diplomática y finalmente mártir. Su historia desafía la idea de que las mujeres indígenas eran pasivas — ella fue todo lo contrario.'
      },
      en: {
        q: 'Match each of Anacaona\'s contributions with its impact:',
        pairs: [
          ['Leadership as cacica', 'Proved that women could govern'],
          ['Poetry and areítos', 'Preserved Taíno culture through art'],
          ['Diplomacy with the Spanish', 'Attempted peace before war'],
          ['Her legacy as a symbol', 'Icon of Caribbean resistance and dignity']
        ],
        explanation: 'Anacaona was multifaceted: political leader, artist, diplomat, and ultimately martyr. Her story challenges the idea that indigenous women were passive — she was the complete opposite.'
      },
      fr: {
        q: "Associe chaque contribution d'Anacaona à son impact :",
        pairs: [
          ['Leadership comme cacica', 'A prouvé que les femmes pouvaient gouverner'],
          ['Poésie et areítos', "A préservé la culture taïno à travers l'art"],
          ['Diplomatie avec les Espagnols', 'A tenté la paix avant la guerre'],
          ['Son héritage comme symbole', 'Icône de résistance et dignité caribéenne']
        ],
        explanation: "Anacaona était multifacettes : leader politique, artiste, diplomate et finalement martyre. Son histoire défie l'idée que les femmes indigènes étaient passives — elle était tout le contraire."
      }
    }
  },
  {
    id: 'cul-099', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada lección del juego ArcLycée con su mensaje:',
        pairs: [
          ['Ruta pacifista en combate', 'La violencia no es la única solución'],
          ['Misiones ecológicas', 'Proteger el medio ambiente importa'],
          ['Recoger artefactos para el museo', 'El patrimonio pertenece a todos'],
          ['Diálogos con NPCs de distintas culturas', 'La diversidad enriquece']
        ],
        explanation: 'Cada mecánica de ArcLycée tiene un mensaje educativo detrás. No es solo jugar — es aprender que la paz, la ecología, el patrimonio y la diversidad son valores que nos hacen mejores.'
      },
      en: {
        q: 'Match each ArcLycée game lesson with its message:',
        pairs: [
          ['Pacifist combat route', 'Violence isn\'t the only solution'],
          ['Ecological missions', 'Protecting the environment matters'],
          ['Collecting artifacts for the museum', 'Heritage belongs to everyone'],
          ['Dialogues with NPCs from different cultures', 'Diversity enriches']
        ],
        explanation: 'Every ArcLycée mechanic has an educational message behind it. It\'s not just playing — it\'s learning that peace, ecology, heritage, and diversity are values that make us better.'
      },
      fr: {
        q: "Associe chaque leçon du jeu ArcLycée à son message :",
        pairs: [
          ['Route pacifiste en combat', "La violence n'est pas la seule solution"],
          ['Missions écologiques', "Protéger l'environnement compte"],
          ['Collecter des artefacts pour le musée', 'Le patrimoine appartient à tous'],
          ['Dialogues avec des PNJ de différentes cultures', 'La diversité enrichit']
        ],
        explanation: "Chaque mécanique d'ArcLycée a un message éducatif derrière. Ce n'est pas que jouer — c'est apprendre que la paix, l'écologie, le patrimoine et la diversité sont des valeurs qui nous rendent meilleurs."
      }
    }
  },
  {
    id: 'cul-100', type: 'match',
    lang: {
      es: {
        q: 'Empareja cada desafío de la diversidad cultural con su solución:',
        pairs: [
          ['Estereotipos en medios', 'Representación respetuosa y compleja'],
          ['Olvido de herencias minoritarias', 'Educación inclusiva sobre todas las raíces'],
          ['Destrucción de sitios arqueológicos', 'Leyes de protección y concientización'],
          ['Discriminación por origen étnico', 'Valorar la mezcla como fortaleza, no debilidad']
        ],
        explanation: 'Cada problema tiene solución, pero requiere acción. Representar bien, educar sobre todas las raíces, proteger el patrimonio y celebrar la diversidad — así se construye un mundo mejor. ¡Y tú puedes ser parte del cambio!'
      },
      en: {
        q: 'Match each cultural diversity challenge with its solution:',
        pairs: [
          ['Stereotypes in media', 'Respectful and complex representation'],
          ['Forgetting minority heritages', 'Inclusive education about all roots'],
          ['Destruction of archaeological sites', 'Protection laws and awareness'],
          ['Discrimination by ethnic origin', 'Valuing mixing as strength, not weakness']
        ],
        explanation: 'Every problem has a solution, but it requires action. Representing well, educating about all roots, protecting heritage, and celebrating diversity — that\'s how you build a better world. And you can be part of the change!'
      },
      fr: {
        q: 'Associe chaque défi de la diversité culturelle à sa solution :',
        pairs: [
          ['Stéréotypes dans les médias', 'Représentation respectueuse et complexe'],
          ['Oubli des héritages minoritaires', 'Éducation inclusive sur toutes les racines'],
          ['Destruction des sites archéologiques', 'Lois de protection et sensibilisation'],
          ['Discrimination par origine ethnique', 'Valoriser le mélange comme force, pas faiblesse']
        ],
        explanation: 'Chaque problème a une solution, mais elle nécessite de l\'action. Bien représenter, éduquer sur toutes les racines, protéger le patrimoine et célébrer la diversité — c\'est ainsi qu\'on construit un monde meilleur. Et tu peux faire partie du changement !'
      }
    }
  }

];
