// Traducciones al inglés — para jugadores angloparlantes
// La estructura replica exactamente la del archivo español para mantener coherencia

const en = {
  menu: {
    titulo: 'ArcLycée',
    nuevoJuego: 'New Game',
    continuarJuego: 'Continue Game',
    opciones: 'Options',
    idioma: 'Language',
    creditos: 'Credits',
    mapaReal: 'Real Map',
    documentacion: 'Documentation',
    controlesTactiles: 'Touch controls',
    joystick: 'Joystick',
    cruceta: 'D-Pad',
    descJoystick: 'Analog stick — drag to move',
    descCruceta: 'Classic directional buttons',
    opcionesVolver: 'Press Q / Escape to go back'
  },

  seleccion: {
    eligePersonaje: 'Choose Your Character',
    pepito: 'Pepito',
    pepita: 'Pepita',
    descripcion: 'Description',
    confirmar: 'Confirm'
  },

  interfaz: {
    vida: 'Health',
    oxigeno: 'O₂',
    inventario: 'Inventory',
    guardar: 'Save',
    mapa: 'Map',
    misiones: 'Quests',
    opciones: 'Options',
    muerteFrases: [
      'We did what we could, bye...',
      "Livin' la vida loca, no more!",
      'Houston, we have a problem...',
      'Game over, man!',
      'GG no re',
      'F in the chat...',
      'Wasted.',
      'Mom, come pick me up!',
      'Error 404: life not found',
      'Respawning with dignity...'
    ]
  },

  // Los diálogos mantienen referencias culturales dominicanas incluso en inglés
  dialogos: {
    intro: {
      linea1: 'What is that shining among the construction rubble?',
      linea2: 'It looks like... an ancient relic?',
      linea3: 'WATCH OUT! The ground is collapsing!',
      linea4: "...Where am I? This looks like... a cave."
    },

    // El abuelo dominicano transmite valores sobre patrimonio colectivo
    abuelo: {
      saludo: 'My grandchild, the earth holds secrets that only the curious can discover.',
      consejo1: 'Remember: every piece you find belongs to the people, not to one person.'
    },

    // La abuela francófona refleja la herencia educativa franco-dominicana
    abuela: {
      saludo: "Mon petit/e, adventure awaits you! But first, prepare yourself well.",
      consejo1: 'In every museum there is a story... in every story there is a museum.'
    },

    // El espíritu taíno conecta al jugador con la historia precolombina
    espirituTaina: {
      saludo: 'Young descendant, the cemíes have chosen you to protect what remains of our people.',
      revelacion: 'The Pomier cave holds more secrets than you can imagine...'
    },

    // El espíritu africano honra la herencia afrodescendiente del país
    espirituAfricano: {
      saludo: 'The strength of your ancestors flows through your veins, young warrior.',
      sabiduria: 'Not every treasure shines. Sometimes the true treasure is knowledge.'
    },

    // Magnoboot añade humor y funcionalidad de compañero robótico
    magnoboot: {
      presentacion: 'BZZT! I am Magnoboot, excavator robot model MX-7. Ready to clear rubble!',
      ayuda: 'I detect something metallic under these rocks! Want me to dig?'
    },

    // Viralata es el perro callejero — refleja la fauna urbana dominicana
    viralata: {
      descripcion: 'The stray dog wags its tail excitedly. It seems to have found a trail...'
    },

    // El Cemí Murciélago conecta con la mitología taína de las cuevas
    cemiMurcielago: {
      presentacion: 'A spectral bat appears among the shadows of the cave...',
      vinculo: 'You feel an ancestral connection with the Cemí spirit.'
    },

    cueva: {
      espirituIntro1: 'Young descendant... the cemíes brought you here for a reason.',
      espirituIntro2: 'These caves hold the memory of our Taíno people.',
      espirituIntro3: 'Find the sacred petroglyphs. They will show you the way.',
      espirituIntro4: 'Beware of the graffiti... someone has desecrated this place.',

      petroSol: 'This is the Sun petroglyph. The Taínos worshipped the sun as the source of all life. Its warmth fed the conucos and its light guided the fishermen.',
      petroMurcielago: 'The Bat Cemí... The Taínos believed that the spirits of the dead became bats and dwelled in caves.',
      petroCara: 'A face carved in the rock. It may represent a cacique or an ancestral spirit that protected the cave.',
      petroEspiral: 'The spiral symbolizes water and eternal movement. The sea was sacred to the Taínos — it provided sustenance.',
      petroRana: 'The frog represented fertility and rain. Without rain there is no harvest, without harvest there is no people.',

      arqueologoIntro: 'Hold it right there! Who are you?',
      arqueologoReconoce: 'Wait... you found petroglyphs? Amazing! I\'m Dr. Martínez, archaeologist.',
      arqueologoGuanin: 'Fascinating! No fully golden cemí has ever been found, but the Taínos adorned their cemíes with guanín — an alloy of gold, silver, and copper — especially on the eyes and sensory organs.',
      arqueologoRegalo: 'Here, you\'ll need this out there. It\'s Magnoboot, an excavator robot that will help you.',
      arqueologoDespedida: 'Protect the heritage. Every piece you find belongs to the Dominican people.',

      misionExplorar: 'Explore the cave and find the petroglyphs',
      misionSalir: 'Find the cave exit',
      misionArtefacto: 'Bring the artifact to the exit',
      caida: 'You fell into the void! Returning to last safe point.'
    },

    // Village dialogues — teach about daily Taíno life
    aldea: {
      cacique1: 'Welcome to our yucayeque, young traveler!',
      cacique2: 'I am Guacanagaríx, cacique of this village. My people have lived here for generations.',
      cacique3: 'A yucayeque is our village — with bohíos for families and the caney where I live.',
      cacique4: 'Talk to the villagers. Each one has much to teach you about our way of life.',

      alfarera1: 'Hello! I\'m making a clay pot for cooking.',
      alfarera2: 'The Taínos were great potters. Our vessels were decorated with faces and figures.',
      alfarera3: 'With clay we made pots, plates, and burenes — the burén is for toasting casabe.',
      alfarera4: 'Casabe is made from grated and pressed yuca. It\'s the bread of our people!',
      alfarerVasija: 'Take this vessel with higüero pulp, maguey sap, and prickly pear. It\'s our natural medicine!',
      alfareraSaludo: 'Keep creating art with the clay of our land!',
      anacaonaPista: '🏺 Anacaona has more to tell you… come back to speak with her to unlock a secret quest and place.',

      pescador1: 'Good morning! The fishing has been good in the river today.',
      pescador2: 'The Taínos fished with cotton nets, wicker traps, and bone hooks.',
      pescador3: 'We also made canoes carved from a single ceiba tree trunk.',
      pescador4: 'Some canoes could carry up to 50 people between the Caribbean islands!',

      perro1: 'A stray dog! It looks friendly... it\'s hungry and staring at you with pleading eyes.',
      perro2: 'The dog wags its tail and approaches slowly. It seems like it wants to come with you!',
      perro3: 'It\'s decided! You\'ll call him Viralata. His nose can sniff out hidden objects. He joins your team!',

      misionHablar: 'Talk to the 3 villagers',
      misionCompleta: 'Village explored! Return to map (M)'
    },

    // Mountain World — Palenque de Lemba (maroon community, 1540s)
    montana: {
      nombreLugar: '⛰️ Palenque de Lemba',
      lembaNombre: 'Sebastián Lemba',
      herreroNombre: 'Kofi',
      tamboraNombre: 'Amara',
      curanderaNombre: 'Yemayá',
      vigiaNombre: 'Marcos',
      // Lemba — rotating mentor (5 topics)
      lemba1: 'I am Sebastián Lemba. I escaped my chains and founded this palenque in the mountains.',
      lemba2: 'In the 1540s, we led the first slave uprising in the Americas.',
      lemba3: 'We maroons live free. These mountains are our refuge and our fortress.',
      lemba4: 'We brought our African culture — our rhythms, our medicine, our forge.',
      lemba5: 'Maroon communities left a deep mark on Dominican culture today.',
      // Kofi — blacksmith
      herrero1: 'I am Kofi, blacksmith of this palenque. I forge tools with the craft of my West African ancestors.',
      herrero2: 'In my homeland, blacksmiths were revered as guardians of the sacred fire.',
      herrero3: 'With this machete we defend our freedom. Take it — it will serve you well on your journey.',
      herreroSaludo: 'The forge fire never dies out, just like our fight for freedom!',
      // Amara — drummer
      tambora1: 'Welcome to the drum circle! I am Amara.',
      tambora2: 'The drums are our voice. With them we send messages, celebrate, and remember.',
      tambora3: 'The palos and atabales played today in the Dominican Republic come from our African traditions.',
      tambora4: 'This war drum protects us. Take it with you — its rhythm will give you strength.',
      tamboraSaludo: 'The drums keep beating — freedom never falls silent!',
      // Yemayá — healer
      curandera1: 'I am Yemayá, healer of the palenque. My name honours the Yoruba goddess of the sea.',
      curandera2: 'We blend African medicine with the plants we learned about from the Taínos.',
      curandera3: 'Soursop, ginger, aloe — this island has everything we need to heal.',
      curandera4: 'Let me heal you with my remedies. You will feel as good as new!',
      curanderaCurar: 'Done! The sacred herbs have healed you.',
      curanderaSano: 'You look healthy to me. May the strength of the ancestors protect you!',
      // Marcos — lookout
      vigia1: 'Halt! I am Marcos, the lookout of the palenque.',
      vigia2: 'Watch out! I see a slave hunter approaching on the trail.',
      vigia3: 'Get ready to defend our freedom!',
      vigilaPaz: 'The soldier understood that you cannot chain someone who was born free.',
      vigiaVictoria: 'The hunter has fled. Our mountain remains free!',
      enemigoCazador: 'Maroon Hunter',
      // Mission
      misionHablar: 'Explore the palenque and talk to the maroons',
      misionCompleta: 'Palenque explored! Return to map (M)',
    },

    // Lago Enriquillo dialogues — indigenous rebellion
    enriquillo: {
      nombreLugar: '🐊 Lago Enriquillo — The largest lake in the Caribbean',
      enriquilloNombre: 'Cacique Enriquillo',
      menciaNombre: 'Mencía',
      tamayoNombre: 'Tamayo',
      mordidaCocodrilo: 'Crocodile bite!',
      // Enriquillo — rotating (6 pairs)
      enriquillo1: 'I am Guarocuya, but the Spaniards baptised me Enriquillo.',
      enriquillo2: 'I was raised by Franciscan friars. I learned to read, to write, and the laws of Castile.',
      enriquillo3: 'The Spaniards took everything from us. Our lands, our freedom, our dignity.',
      enriquillo4: 'When the encomendero Valenzuela humiliated me and struck my wife Mencía, I said: enough!',
      enriquillo5: 'Mencía is my strength. We met at the convent — she too was educated by the friars.',
      enriquillo6: 'Our love was born between books and prayers, but was forged in resistance. Together we fled to the Bahoruco mountains.',
      enriquillo7: 'Mencía is not just my wife — she is a leader. She organises the community, tends the wounded, and keeps hope alive.',
      enriquillo8: 'They say a man alone can change the world, but without Mencía, I would have changed nothing.',
      enriquillo9: 'We have been resisting for 13 years (1519-1533). The Spaniards sent armies, but the mountains protect us.',
      enriquillo10: 'In the end, Charles V signed a peace treaty recognising our freedom. The first indigenous victory in the Americas!',
      enriquillo11: 'This lake bears my name. But the true victory was not mine — it belonged to all who fought.',
      enriquillo12: 'Resistance is not always violence. Sometimes it is surviving, preserving your culture, and never giving up.',
      // Idol delivery
      enriquilloRecibe1: 'A sacred cemí from Anacaona? This is a priceless gift!',
      enriquilloRecibe2: 'The cemíes connect us with our ancestors and the spirits of the earth.',
      enriquilloRecibe3: 'With this spiritual power, our struggle grows stronger. Thank you, young warrior.',
      reputacionIdolo: 'Idol delivered to Enriquillo',
      // Mencía
      mencia1: 'I am Mencía. The friars educated me alongside Guarocuya — that is how we met.',
      mencia2: 'When Valenzuela attacked me, Guarocuya swore we would never submit again.',
      mencia3: 'Here in the mountains we are free. I care for our people and teach them to read.',
      mencia4: 'Love is not just a feeling — it is action. We fight together every day for a dignified future.',
      menciaSaludo: 'As long as there are mountains, there will be freedom. And as long as there is love, there will be hope.',
      // Tamayo
      tamayo1: 'I am Tamayo, warrior and ally of Enriquillo.',
      tamayo2: 'I know every trail in these mountains. The Spaniards get lost, but we are part of the land.',
      tamayo3: 'Our strategy is simple: know the terrain, move fast, and never fight where they want.',
      tamayoSaludo: 'The Bahoruco mountains are invincible!',
      // Las Caritas — petroglyphs on the north cliff
      caritas1: 'Petroglyphs carved in limestone! These are "Las Caritas" — faces sculpted by the Taínos.',
      caritas2: 'These faces are 500 to 1,000 years old. They represent spirits, ancestors, and deities.',
      caritas3: 'The Taínos carved petroglyphs in caves and cliffs. These at Lago Enriquillo are among the most accessible.',
      caritas4: 'Each face has a different expression: smiles, surprise, seriousness. What were they trying to communicate?',
      caritasRepite: 'The ancient faces carved in stone watch you with timeless expressions. Each one is unique.',
      enriquillo13: 'Young warrior... you should come back to this island later in your journey.',
      enriquillo14: 'I sense ancient cemí spirits on this land. And I fear one might awaken.',
      enriquillo15: 'If you find a ceremonial blade and a place of power... prepare yourself. Not all spirits are benevolent.',
      // Mission
      yaBendecido: 'You already possess the Godly Blessing. The spirit recognizes you as an ally.',
      bendicionRecibida: 'Godly Blessing: +30 max health, +5 strength, +20% speed',
      misionEntregar: 'Bring the cemí to Enriquillo on Isla Cabritos',
      misionExplorar: 'Explore Lago Enriquillo',
      misionCompleta: 'Idol delivered! Talk to Enriquillo to learn more.',
      pistaTormenta1: '⛈️ A storm lashed the lake… something ancient has surfaced from the mud.',
      pistaTormenta2: '⚔️ They say Enriquillo\'s lost Sword awaits whoever returns to the lake.',
    },

    // Anacaona — Enriquillo idol sidequest (in aldea1)
    anacaonaIdolo: {
      anacaonaIdolo1: 'I have something important to ask of you.',
      anacaonaIdolo2: 'I have carved a sacred cemí. I need you to take it to Enriquillo, at Lago Enriquillo.',
      anacaonaIdolo3: 'Enriquillo fights against the Spaniards in the Bahoruco mountains. This cemí will give him spiritual strength.',
      anacaonaIdolo4: 'The lake is to the south-west of the island. Beware of the crocodiles — Isla Cabritos is in the centre of the lake.',
    },

    // Second village dialogues — agriculture, medicine, and ceremonies
    aldea2: {
      behique1: 'I am Yuisa, the behique — healer and spiritual guide of this village.',
      behique2: 'The plants of this island have great healing powers that the gods taught us.',
      behique3: 'We use tobacco in the cohoba ceremony, to communicate with the cemíes.',
      behique4: 'Guava cures fever, jagua protects the skin, and aloe heals wounds.',
      behiqueCurar: 'Let me prepare a remedy with sacred herbs. You\'ll feel brand new!',
      behiqueCuroToast: 'The behique healed you',
      behiqueSano: 'You look healthy to me. May the cemíes protect you on your journey!',

      agricultor1: 'Look at our conucos! Each mound of earth is a garden of food.',
      agricultor2: 'Conucos are raised mounds where we plant. This way the soil drains better and roots grow strong.',
      agricultor3: 'We grow yuca, corn, sweet potato, hot peppers, and tobacco — everything we need to live.',
      agricultor4: 'Yuca is the most important. With it we make casabe, which is our daily bread.',
      agricultorGuanabana: 'Take these soursop leaves and seeds. They\'re very medicinal for the journey!',
      agricultorSaludo: 'The conucos are giving a great harvest today!',

      musico1: 'Welcome to the batey, the heart of our village!',
      musico2: 'Here we celebrate the areíto — our great ceremony of music, dance, and memory.',
      musico3: 'We play maracas made from higüero, güiros from gourds, and drums carved from ceiba trunks.',
      musico4: 'In the areíto we sing the history of our people — so the young never forget where they come from.',

      behiqueCemi: 'The Cemí Bat spirit has chosen you! It will guide you in the caves with its echo-location.',

      // Batú — Higüemota dialogues for the mini-game
      batuOferta1: 'Want to play batú? It\'s our sacred ball game.',
      batuOferta2: 'You hit the ball with your hips, shoulders, and head. Never with your hands!',
      batuAceptar: 'Yes, let\'s play!',
      batuRechazar: 'Not now, maybe later.',
      batuOfertaRepite: 'Ready for batú? The batey awaits!',
      batuPendiente: '🏐 Pending quest: Batú',
      batuReputacion: 'Batú completed',
      batuVictoria: 'Impressive! You play like a true Taíno.',
      batuDerrota: 'Good try! Batú takes a lot of practice.',
      batuAbandonado: '🏐 You abandoned the match. You can try again by speaking with the Cacique.',
      batuRepite: 'That was a great match! Batú unites villages and resolves conflicts without violence.',
      batuRevancha: 'That was a great match! Want to play again?',

      misionHablar: 'Talk to the 3 villagers',
      misionCompleta: 'Village explored! Return to map (M)'
    },

    // La Isabela — first European settlement in the Americas (1494)
    isabela: {
      soldado1: 'Halt! This area is forbidden by order of the Viceroy!',
      soldado2: 'No one may enter the ruins without permission from the Crown!',
      opAtacar: '⚔️ Attack',
      opHablar: '💬 Talk',
      opNegociar: '🤝 Negotiate',
      opHuir: '🏃 Flee',
      soldadoHuida: 'Run! But don\'t come back here...',
      soldadoDerrota: 'Argh! I surrender... explore the ruins if you wish.',
      soldadoVence: 'Ha! Come back when you\'re ready for a real duel.',
      soldadoPaz1: 'You\'re right... these ruins should be protected, not forbidden.',
      soldadoPaz2: 'La Isabela was founded in 1494. It\'s the first European city in the Americas.',

      cronista1: 'I am Fray Ramón Pané, the first chronicler of the Indies.',
      cronista2: 'I write about Taíno customs so they are not lost to time.',
      cronista3: 'My work is called "Account of the Antiquities of the Indians".',
      cronista4: 'It\'s the first book written in the Americas. Protecting history is my duty.',

      taino1: 'I am Guatiguaná. My people were among the first to resist the invaders.',
      taino2: 'The Spanish forced us to search for gold. Many died from forced labor.',
      taino3: 'But our culture did not die. It lives in words: hammock, canoe, tobacco, corn.',
      taino4: 'Every time you say "hurricane" or eat casabe, the Taínos live on.',

      cassa1: 'I am Roberto Cassá, historian. I study the origins of our nation.',
      cassaSinArcabuz: 'I\'m looking for colonial artifacts from La Isabela. If you find something, bring it to me — I have something valuable to offer in return.',
      cassaVeArcabuz: 'A colonial arquebus! These were used at La Isabela since 1494. It\'s an invaluable piece.',
      cassaIntercambio: 'I propose a trade: give me the arquebus for the museum, and I\'ll give you my map of colonial sites.',
      cassaEntrega: 'Deal! With this map you can visit the Zona Colonial of Santo Domingo and other historical sites.',
      cassaRepite: 'Use the colonial map to visit historical sites. There\'s so much to discover!',

      misionHablar: 'Explore the ruins of La Isabela',
      misionCompleta: 'La Isabela explored! Return to map (M)'
    },

    // Zona Colonial de Santo Domingo — UNESCO World Heritage Site
    zonaColonial: {
      constructor1: 'Get out of here, kid! These old rocks are coming down to make room for my hotel!',
      constructor2: 'Nobody is going to stop me from building! This rubble is worthless!',
      constructorPaz1: 'Wait... World Heritage Site? I had no idea.',
      constructorPaz2: 'I\'ll gather my team, investors, and bring in historians to redesign the project.',
      constructorPaz3: 'A hotel that protects and highlights these ruins... it\'ll cost more, but it\'ll have a unique value.',
      constructorPaz4: 'It might even be more profitable. And besides... it\'s the right thing to do.',
      constructorDerrota1: 'Okay, okay... you made me think.',
      constructorDerrota2: 'I\'ll talk to the investors. Maybe we can build something that respects the history.',
      artefactoAparece: 'Something glows among the rubble!',
      constructorArtefacto1: 'We found that digging the foundations. It looks very old...',
      constructorArtefacto2: 'Take it to the Cathedral Museum. Fabiola Herrera will know what to do with it.',
      fabiolaRecibe1: 'An artifact from the excavation? Let me see!',
      fabiolaRecibe2: 'It\'s a 16th century religious piece! A silver tabernacle with original engravings.',
      fabiolaRecibe3: 'We\'ll create a special display case with a plaque for the construction company.',
      fabiolaRecibe4: 'When heritage and construction collaborate, everyone wins. Thank you!',
      fabiolaPostEntrega: 'The new display case is a hit! Visitors can\'t stop taking photos.',
      fabiolaPostEntrega2: 'The construction company is proud of their plaque. And the artifact hologram is spectacular!',
      constructorRepite: 'I already talked to the investors. We\'re redesigning the hotel to protect the ruins. It\'ll be one of a kind!',

      arqueologa1: 'I\'m Dr. Pérez, archaeologist from the Museum of the Dominican Man.',
      arqueologa2: 'The Zona Colonial is over 500 years old. Every stone tells a story.',
      arqueologa3: 'There are treasures buried under these streets. Your robot could help find them.',
      arqueologa4: 'Press F to have Magnoboot scan the ground. If it detects something, you can dig it up with E.',

      guia1: 'Welcome to the Zona Colonial! I\'m Don Rafael, certified guide.',
      guia2: 'The Primada Cathedral was the first in the Americas. Construction began in 1512!',
      guia3: 'Hospital San Nicolás de Bari was the first hospital in the New World, founded in 1503.',
      guia4: 'And Calle de las Damas is the first paved street in the Americas. You\'re walking on history!',

      estudiante1: 'Hi! I\'m María, I study architecture at UASD.',
      estudiante2: 'I\'m researching colonial construction techniques. They used fossilized coral as building material!',
      estudiante3: 'The San Francisco Monastery was the first in the Americas. Today its ruins host concerts.',
      estudiante4: 'The National Pantheon used to be a Jesuit church. Now it holds the remains of our national heroes.',

      // Fabiola Herrera — Director of Volunteers, Cathedral Museum
      fabiola1: 'Welcome to the Cathedral Museum! I\'m Fabiola Herrera, director of volunteers.',
      fabiola2: 'This museum is housed in the old Royal Jail of Santo Domingo. We restored it to preserve centuries of history and faith.',
      fabiola3: 'We have 15 rooms with treasures from the 16th to 20th century: Columbus\'s pax, pectoral crosses, the Double-Headed Eagle, the Cathedral\'s Lower Choir...',
      fabiola4: 'I\'m a mathematician. I worked on technology projects my whole life, but one day I discovered that my true mission was to turn this dream into reality.',
      fabiola5: 'A museum is not just an exhibition space. It\'s a journey that transports visitors to a past filled with art and devotion.',
      fabiola6: 'Every object here tells a story. The Pentagonal Stone, the restored sculptures with their original patina... everything speaks!',

      // Roberto Cassá — rotating conversations (recurring mentor)
      cassaZC1: 'We meet again! I came to research the Zona Colonial.',
      cassaZC2: 'This place has over 500 years of history. Every corner hides a secret.',

      cassaConflicto1: 'Did you see the builder? It happens a lot: businessmen wanting to demolish to build.',
      cassaConflicto2: 'But history cannot be replaced. A new hotel is built in months... these stones took centuries.',
      cassaConflicto3: 'The best outcome is when they integrate: modernity and heritage coexisting. Everyone wins.',

      cassaDatos1: 'Did you know the Primada Cathedral holds the remains attributed to Christopher Columbus?',
      cassaDatos2: 'Hospital San Nicolás de Bari treated Spaniards and indigenous people equally. Revolutionary for its time.',
      cassaDatos3: 'Calle de las Damas got its name because the ladies of María de Toledo\'s court would stroll along it.',

      cassaPatrimonio1: 'UNESCO declared this area a World Heritage Site in 1990.',
      cassaPatrimonio2: 'That means it belongs to all peoples of the world, not just us.',
      cassaPatrimonio3: 'Protecting heritage isn\'t just preserving stones — it\'s keeping alive the memory of who we are.',

      cassaCalle1: 'See this street? It\'s the Calle de las Damas — the first paved street in the Americas.',
      cassaCalle2: 'It was laid out by order of Nicolás de Ovando in 1502. Governors and their families walked this way.',
      cassaCalle3: 'They say the ladies of María de Toledo\'s court would stroll here every afternoon. That\'s how it got its name.',

      cassaReloj1: 'Have you seen the Sundial? It\'s one of the oldest in the Americas.',
      cassaReloj2: 'It was built in the 16th century so the city\'s residents could tell the time.',
      cassaReloj3: 'Before mechanical clocks, the sun was the only clock. This column cast its shadow over the hour markings.',

      cassaPista1: 'You\'ve learned a lot about the Taínos and the colonizers...',
      cassaPista2: 'But there\'s a world you haven\'t explored yet: the sea surrounding our island.',
      cassaPista3: 'The oceans hold treasures and dangers. Whales, turtles, reefs... and threats we must face.',
      cassaPista4: 'When you\'re ready, the Aquatic World awaits. Good luck, young archaeologist!',

      // Panteón Nacional guards — First Regiment of the Presidential Guard
      guardia1: 'The guards cannot speak while on duty. It\'s part of military protocol.',
      guardia2: 'They are members of the First Dominican Regiment of the Presidential Guard.',
      guardia3: 'They guard the entrance to the National Pantheon, where the remains of the nation\'s heroes rest.',
      guardia4: 'At regular intervals they perform the changing of the guard: a solemn ceremony where two guards relieve the previous pair.',
      guardia5: 'Inside the Pantheon burns a flame that never goes out — an eternal symbol of the sacrifice of the nation\'s founders.',

      // Constructor Méndez combat — citizen activism options
      combatePista: 'Use citizen activism to convince the Constructor',
      accionRedes: 'Social Media',
      accionRedesMsg: 'You post photos of the endangered ruins online!',
      respuestaRedes: 'Méndez hires influencers to promote his hotel.',
      accionProtestas: 'Protests',
      accionProtestasMsg: 'You organize a demonstration in front of the site!',
      respuestaProtestas: 'Méndez sponsors a block party and concerts for the community.',
      accionDenuncia: 'Denounce',
      accionDenunciaMsg: 'You report the demolition to the authorities!',
      respuestaDenuncia: 'Méndez negotiates permits and waivers with politicians.',
      accionLegal: 'Legal Action',
      accionLegalMsg: 'You file a legal injunction to stop construction!',
      respuestaLegal: 'Méndez uses legal maneuvers to stall while continuing to build.',

      misionExplorar: 'Explore the Zona Colonial',
      misionCompleta: 'Zona Colonial explored! Return to map (M)'
    },

    // Aquatic World — Santa María Shipwreck
    acuatico: {
      pescador1: 'Welcome to the ocean floor, kid! I\'m Manuel, a fisherman from Montecristi.',
      pescador2: 'Down here lie the remains of the Santa María, Columbus\'s flagship.',
      pescador3: 'The Santa María ran aground on a reef on Christmas Eve 1492. Her timbers were used to build Fort Navidad.',
      pescador4: 'Watch out for jellyfish! Their sting hurts and slows you down.',

      tortuga1: 'I\'m a hawksbill turtle. My species has been swimming these seas for 100 million years.',
      tortuga2: 'We\'re critically endangered. They hunt us for our shells, used in jewelry.',
      tortuga3: 'Coral reefs are our home. If the coral dies, so do we.',
      tortuga4: 'Hawksbill turtles eat sea sponges that are toxic to other animals. We\'re the reef\'s guardians!',

      arqueologa1: 'I\'m an underwater archaeologist. I study Caribbean shipwrecks.',
      arqueologa2: 'There are over 400 recorded shipwrecks off the coasts of this island.',
      arqueologa3: 'Each shipwreck is a time capsule. Nails, ceramics, and coins tell us the story.',
      arqueologa4: 'Take this shipwreck map. It will help you find other underwater sites.',
      arqueologaRepite: 'Use the shipwreck map to find more underwater remains. The Caribbean Sea hides many secrets!',
      arqueologaRobot1: 'An underwater robot! Did they program it at LFSD? Impressive!',
      arqueologaRobot2: 'With this robot I can explore areas that are too deep or dangerous for divers.',
      arqueologaRobot3: 'Look! The robot already found signals from 4 shipwrecks we didn\'t have on record.',
      arqueologaRobot4: 'I\'ve added the new discoveries to your shipwreck map. Technology and archaeology make a great team!',
      arqueologaPostRobot: 'The robot is still scanning the seabed. It finds something new every day. Thanks for bringing it!',

      // Leatherback turtle (Dermochelys coriacea) — the largest in the world
      tinglar1: 'I\'m a leatherback turtle, the largest in the world. I can weigh up to 700 kg.',
      tinglar2: 'My shell doesn\'t have hard scales like other turtles — it\'s leathery, like leather.',
      tinglar3: 'I eat almost only jellyfish. I can eat 200 kg a day. Plastic bags confuse me because they look like jellyfish!',
      tinglar4: 'I can dive over 1,000 meters deep. I\'m the deepest-diving reptile in the world.',

      // Loggerhead turtle (Caretta caretta) — big head, powerful jaws
      caguama1: 'I\'m a loggerhead turtle. I have the largest head of all sea turtles.',
      caguama2: 'My jaws are so powerful I can crush crabs, sea urchins, and snails.',
      caguama3: 'Artificial lights on beaches confuse our hatchlings. They walk toward the light instead of the sea.',
      caguama4: 'Fishing nets trap us by accident. Responsible fishing and escape devices save lives.',

      pezLeonIntro1: 'A lionfish! This invasive species from the Indo-Pacific is destroying Caribbean reefs.',
      pezLeonIntro2: 'It eats up to 30 native species and has no natural predators here. We must act!',
      pezLeonPaz1: 'Controlled fishing will maintain the reef\'s balance.',
      pezLeonPaz2: 'Did you know lionfish meat is delicious and nutritious? Eating me is ecological!',
      pezLeonDerrota: 'The lionfish retreats... but more will come if the invasion isn\'t controlled.',

      combatePista: 'Use ecological actions to control the invasive species',
      etiquetaControl: 'Controlled:',
      accionAtrapar: 'Capture',
      accionAtraparMsg: 'You try to catch the lionfish with a net for the aquarium!',
      respuestaAtrapar: 'The lionfish flares its venomous spines. Watch out for the sting!',
      accionPescar: 'Fish',
      accionPescarMsg: 'You ready the spear! Lionfish is edible and fishing them helps the reef.',
      respuestaPescar: 'It reproduces fast! While you catch one, more juveniles appear.',
      accionProteger: 'Protect Coral',
      accionProtegerMsg: 'You set up barriers to protect the coral and herbivorous fish!',
      respuestaProteger: 'The lionfish devours herbivorous fish. Without them, algae invade the coral.',
      accionAlertar: 'Alert Divers',
      accionAlertarMsg: 'You alert other divers to organize a group removal effort!',
      respuestaAlertar: 'The lionfish hunts juvenile parrotfish. Without them the coral won\'t be cleaned!',

      medusaPicadura: 'Jellyfish sting! Movement slowed',

      cantoBallenaCerca: 'You hear a humpback whale singing in the distance!',

      misionExplorar: 'Explore the wreck of the Santa María',
      misionCompleta: 'Shipwreck explored! Return to map (M)',

      // Transition to sanctuary
      transicionSantuario1: '🤿 We leave our oxygen tanks and diving gear behind.',
      transicionSantuario2: '🫁 We swim with snorkels among the corals, careful not to touch them or disturb local life...'
    },

    // Manatee Sanctuary — marine sub-level with ecological actions
    santuario: {
      biologa1: 'Welcome to the Manatee Sanctuary! I\'m Dr. Sofía, marine biologist.',
      biologa2: 'Antillean manatees are endangered. Fewer than 2,500 remain in the entire Caribbean.',
      biologa3: 'Law 64-00 protects Dominican biodiversity. Harming a manatee is an environmental crime.',
      biologa4: 'Manatees get caught accidentally in abandoned fishing nets — we call them "ghost nets".',
      biologa5: 'To free them without harm, you must cut the net carefully without touching the animal. A scared manatee can thrash and injure itself further.',
      biologa6: 'There\'s an adult manatee trapped right now! Go to the ghost net to the east and press [E] to cut it. Quickly, but calmly!',

      tortugaVerde1: 'I\'m a green turtle. Unlike the hawksbill, I eat algae and seagrass.',
      tortugaVerde2: 'Ocean trash kills us. We mistake plastic bags for jellyfish and eat them.',
      tortugaVerde3: 'Look at all that debris trapped in the reef. It\'s suffocating the coral!',
      tortugaVerde4: 'If you clean up the debris, the reef can breathe and recover. Every action counts!',

      manatiBebe1: 'The baby manatee cries softly! Its mother is trapped in the net ahead.',
      manatiBebe2: 'It looks at you with big eyes and swims east, guiding you...',

      liberarManati: 'Manatee freed! Mother and calf swim together again.',
      necesitasBiologa: 'You need to talk to the biologist first to learn how to free the manatee.',
      recogerDesecho: 'Debris collected',
      limpiezaCompleta: 'Reef cleaned! The corals can recover without trash.',
      necesitasTortuga: 'Talk to the green turtle to understand why cleanup matters.',

      objHablar: 'Talk to inhabitants',
      objManati: 'Free the manatee',
      objArrecife: 'Clean reef',

      misionExplorar: 'Explore the Manatee Sanctuary',
      misionCompleta: 'Sanctuary protected! Return to map (M)',

      tiburonAlerta: 'Shark nearby! Stay away!',
      zonaHelice: 'Propeller zone! Danger!',
      golpeLancha: 'A speedboat hit you! Stay away from the surface!',
      oxigenoBajo: 'Low oxygen! Swim to the surface to breathe!',

      dienteDescripcion: 'Fossil megalodon shark tooth. Proof these giants swam here millions of years ago.',

      cantoBallenaCerca: 'A humpback whale sings nearby! They migrate here every winter from the North Atlantic.',

      // Submarine robot — delivery of the robot programmed at LFSD
      biologaRobot1: 'The LFSD submarine robot! Incredible, you did it!',
      biologaRobot2: 'With this I can explore the deepest areas of the sanctuary and nearby reefs.',
      biologaRobot3: 'Look! The robot already detected signals from 4 shipwrecks we didn\'t have on record.',
      biologaRobot4: 'I\'ve added the discoveries to your shipwreck map. Technology and marine biology make a great team!',
      biologaPostRobot: 'The robot keeps scanning the ocean floor. Every day it finds something new.',
      biologaPostBuceo: 'Have you explored the Manantial de la Aleta with the diving gear yet? They say there are Taíno wooden offerings preserved for over 500 years!',
      biologaBuceo1: 'Wait... I have something for you.',
      biologaBuceo2: 'This professional diving gear will let you explore cenotes and underwater caves.',
      biologaBuceo3: 'I\'ve heard that the Manantial de la Aleta, in Cotubanamá National Park, has a sacred Taíno cenote with submerged offerings.',
      biologaBuceo4: 'With this gear you\'ll be able to dive down and explore what lies in the depths!',

      // Transition back to shipwreck
      transicionNaufragio1: '🫧 We pick up our oxygen tanks and diving gear.',
      transicionNaufragio2: '🤿 We dive into the deep waters in search of the shipwreck remnants...'
    },

    // Legal World — Punta Cana Airport (Act 4)
    juridico: {
      draMartinez1: 'I was waiting for you! The shipwreck map revealed something disturbing.',
      draMartinez2: 'Someone is smuggling archaeological artifacts out of the country through this airport.',
      draMartinez3: 'We need solid evidence. Talk to the Customs Agent and the INTERPOL Inspector.',
      draMartinez4: 'Attorney Carmen Vidal will advise you on heritage protection laws.',
      draMartinezRepite: 'Talk to Agent Montero at customs. She can give you the records.',
      draMartinezPostCombate: 'You did it! The artifacts will be returned to the Museum of the Dominican Man.',

      agente1: 'I\'m Agent Rosa Montero, Customs. I\'ve detected suspicious activity.',
      agente2: 'Law 318-68 prohibits exporting any Dominican cultural heritage property.',
      agente3: 'Fines range from 500 to 10,000 minimum wages, plus 2 to 10 years in prison.',
      agente4: 'I\'ve prepared a customs registry with the anomalies. Look for it near the X-ray machine.',
      agenteRepite: 'The customs registry is near the X-ray machine. Pick it up as evidence.',
      agentePostCombate: 'This case will set a precedent. Law 318 is being applied with full force.',

      // Miguel Sánchez — real person who helped the team with research and regulations
      inspector1: 'Miguel Sánchez, INTERPOL. We\'re tracking an antiquities trafficking network.',
      inspector2: 'INTERPOL has a database of stolen artworks with over 52,000 records.',
      inspector3: 'International cooperation is key. An artifact stolen in DR can appear at a European auction.',
      inspector4: 'With your evidence and Law 318, we can issue an international alert against Torres.',
      inspectorRepite: 'Gather all possible evidence before confronting the suspect.',
      inspectorPostCombate: 'INTERPOL has issued the alert. This trafficker won\'t escape international justice.',

      carmen1_1: 'I\'m Attorney Carmen Vidal, heritage law specialist.',
      carmen1_2: 'Law 318-68 declares all archaeological objects found on Dominican soil as national heritage.',
      carmen1_3: 'No one can export, sell, or destroy heritage property without State authorization.',
      carmen2_1: 'The 1970 UNESCO Convention is the international framework against cultural property trafficking.',
      carmen2_2: 'Over 140 countries ratified it. It requires returning stolen cultural property to its country of origin.',
      carmen3_1: 'To report heritage trafficking, file a complaint with the Ministry of Culture.',
      carmen3_2: 'You can also go to the Attorney General\'s Office. They activate the judicial process.',
      carmen4_1: 'The Ministry of Culture guards national heritage through the Monumental Heritage Directorate.',
      carmen4_2: 'They maintain the cultural property registry and authorize — or deny — any export.',
      carmen5_1: 'In 2014, DR recovered Taíno artifacts that had been illegally sold to European collectors.',
      carmen5_2: 'Thanks to INTERPOL and Law 318, the pieces returned to the Museum of the Dominican Man.',

      traficante1: 'What do you want, kid? I\'m waiting for my flight.',
      traficante2: 'Artifacts? I don\'t know what you\'re talking about. This suitcase has... souvenirs.',
      traficantePaz1: 'The evidence is overwhelming. Torres surrenders to the authorities.',
      traficantePaz2: 'The artifacts will be returned to the Museum of the Dominican Man.',
      traficanteDerrota: 'Torres is arrested. The case goes to court.',
      traficantePostCombate: 'You got me... but this is bigger than me. There\'s a whole network.',

      // Arrest cutscene
      arrestoInspector1: 'Rodrigo Torres, you are under arrest for illicit trafficking of cultural property.',
      arrestoAgente1: 'You have the right to an attorney. Anything you say can be used against you.',
      arrestoTorres1: 'You can\'t do this to me! I have connections!',
      arrestoInspector2: 'Your connections won\'t help you. INTERPOL has notified every customs office in the Caribbean.',
      arrestoAgente2: 'Take him away. The artifacts are confiscated as evidence.',
      inspectorPostArresto: 'Torres is in custody. INTERPOL will investigate his entire network.',

      etiquetaEvidencia: 'Evidence:',
      combatePista: 'Use laws and evidence to build a legal case',
      accionLey318: 'Law 318',
      accionLey318Msg: 'You cite Heritage Law 318-68!',
      respuestaLey318: 'Torres shows forged export permits.',
      accionForense: 'Evidence',
      accionForenseMsg: 'You present forensic evidence of authenticity!',
      respuestaForense: 'Torres claims they are artisan replicas.',
      accionInterpol: 'INTERPOL',
      accionInterpolMsg: 'You activate the INTERPOL international alert!',
      respuestaInterpol: 'Torres threatens to flee to another jurisdiction.',
      accionUnesco: 'UNESCO 1970',
      accionUnescoMsg: 'You invoke the 1970 UNESCO Convention!',
      respuestaUnesco: 'Torres tries to bribe his way out.',

      misionExplorar: 'Investigate the artifact trafficking',
      misionCompleta: 'Case solved! Return to map (M)'
    },

    // Laboratory World — Museum of the Royal Shipyards (Act 5)
    laboratorio: {
      morban1: 'Welcome to the Museum of the Royal Shipyards. I\'m Dr. Fernando Morbán, director.',
      morban2: 'This museum preserves treasures rescued from Caribbean shipwrecks.',
      morban3: 'Every artifact that arrives must be authenticated. Without authentication, it has no historical value.',
      morban4: 'Talk to Dr. López in the lab and Ana in restoration. They\'ll teach you the process.',
      morbanRepite: 'Visit the C-14 lab and the restoration workshop. Science protects history.',
      morbanPostEntrega: 'Dr. López is thrilled with the repaired equipment. Those LFSD kids really know what they\'re doing.',
      morbanPostDescubrimiento: 'Dr. López\'s discovery has put our museum on the international map! And you\'re part of it.',

      lopez1: 'I\'m Dr. López, Carbon-14 dating specialist.',
      lopez2: 'Carbon-14 is a radioactive atom that all living things absorb. When they die, it starts to decay.',
      lopez3: 'By measuring how much C-14 remains in an organic object, we calculate its age precisely.',
      lopez4: 'That\'s how we confirm if an artifact is 500 years old or a modern forgery!',
      lopezRepite: 'Remember: C-14 dating works with organic materials — wood, bone, fabric.',
      lopezEsperaEquipo: 'I heard the LFSD students repaired the equipment! Bring it to me when you can — I have so many samples waiting!',
      lopezRecibeEquipo1: 'The analysis equipment! The LFSD students repaired it? Amazing!',
      lopezRecibeEquipo2: 'I\'ve been unable to run precise datings for weeks. This changes everything.',
      lopezRecibeEquipo3: 'I\'m going to recalibrate the spectrometer and start analyzing the pending samples.',
      lopezRecibeEquipo4: 'Thank you! Come back soon — I have a feeling this equipment will bring us surprises.',
      lopezDescubrimiento1: 'You won\'t believe this! The repaired equipment detected something extraordinary.',
      lopezDescubrimiento2: 'We found traces of authentic guanín in an artifact we thought was a replica.',
      lopezDescubrimiento3: 'It\'s an original Taíno piece over 500 years old! This changes what we knew about the site.',
      lopezDescubrimiento4: 'I\'m going to publish the results. The LFSD students and you will be co-authors of the discovery!',
      lopezPeriodico1: 'Look! We\'re in the newspaper! You and the LFSD students are mentioned.',
      lopezPeriodico2: 'The article talks about the discovery and how collaboration between young people and scientists made it all possible.',
      lopezPeriodico3: 'Here, keep a copy. You\'ve earned it!',
      lopezPostPeriodico: 'The article has generated international interest! Three universities already want to collaborate with us.',
      repEntregaEquipo: 'Equipment delivered to Dr. López',
      repDescubrimiento: 'Scientific discovery',

      ana1: 'I\'m Ana, artifact restorer. My job is to repair without altering.',
      ana2: 'The golden rule of restoration: everything you do must be reversible.',
      ana3: 'We use special adhesives, consolidants, and microscopes to avoid damaging the original piece.',
      ana4: 'A poorly restored artifact loses its historical value forever. Patience is key!',
      anaRepite: 'Restoring is like being a doctor for artifacts: first, do no harm.',
      anaPostEntrega: 'I heard you brought the repaired equipment. Dr. López can\'t stop talking about the tests she\'s going to run!',
      anaPostDescubrimiento: 'The artifact Dr. López discovered needs restoration! It\'s the most exciting piece I\'ve seen in years.',

      cassa1_1: 'We meet again! This museum is one of my favorite places.',
      cassa1_2: 'The Royal Shipyards were the port warehouses of Santo Domingo in the 16th century.',
      cassa2_1: 'Did you know this building was restored in the 1970s?',
      cassa2_2: 'The restoration respected the original structure. That\'s how it should always be done.',
      cassa3_1: 'Museums are not warehouses for old objects. They are living places.',
      cassa3_2: 'Every piece here tells a story that connects the past with the present.',
      cassa4_1: 'The Dominican Republic has over 60 museums.',
      cassa4_2: 'From the Museum of the Dominican Man to the Memorial of Resistance.',
      cassa5_1: 'You\'ve come a long way, young archaeologist.',
      cassa5_2: 'From the Pomier caves to this museum, you\'ve learned to protect heritage.',

      sospechoso1: 'Psst! Want to buy an authentic Taíno relic? Special price for you.',
      sospechoso2: 'You\'re saying it needs a certificate? But I found it in my backyard...',
      sospechoso3: 'You\'re right. Without scientific authentication, anyone can sell fakes.',
      sospechoso4: 'I\'d better take it to the museum for examination. Thanks for the advice!',
      sospechosoRepite: 'I\'m waiting for the lab results. Hope it\'s authentic!',

      misionExplorar: 'Explore the Museum of the Royal Shipyards',
      misionCompleta: 'Museum explored! Press M to see the ending',
      misionFinal: 'Mission complete! Press M to see the ending',

      misionWSCompleta: 'Weird Science — Completed',
      misionWSCompletaDesc: 'The repaired equipment led to a scientific discovery. You made the newspaper!'
    },

    // Endings — 5 possible closing sequences
    finales: {
      completo: {
        linea1: 'You mastered every corner of this island: the worlds, the missions, the challenges.',
        linea2: 'You calibrated the magnetometer, programmed the robot, repaired the equipment, played batú and saved the manatee.',
        linea3: 'From the Pomier caves to the LFSD, you left your mark everywhere.',
        linea4: 'The artifacts are in museums, the reefs are recovering, and justice was served.',
        linea5: 'You are the legend of Quisqueya. 100% completed.'
      },
      pacifista: {
        linea1: 'You completed every challenge with wisdom and peace.',
        linea2: 'From the Pomier caves to the Royal Shipyards Museum, you protected Dominican heritage.',
        linea3: 'The artifacts are safe in museums. The traffickers face justice.',
        linea4: 'The lionfish is under control. The reefs are recovering.',
        linea5: 'You are a true guardian of heritage. History will remember you.'
      },
      museo: {
        linea1: 'The recovered artifacts shine under the museum lights.',
        linea2: 'Dr. Morbán opens the new exhibition hall with your discoveries.',
        linea3: 'From Taíno petroglyphs to colonial treasures, every piece tells a story.',
        linea4: 'Visitors learn about the rich history of the Dominican Republic.',
        linea5: 'Heritage is protected. Your mission is complete... for now.'
      },
      ecologico: {
        linea1: 'The Caribbean Sea gleams with renewed colors.',
        linea2: 'Thanks to your ecological actions, the coral reefs are recovering.',
        linea3: 'Hawksbill turtles swim free. Native fish are returning.',
        linea4: 'Your example inspired entire communities to protect the marine environment.',
        linea5: 'Nature and history go hand in hand. Protecting one is protecting the other.'
      },
      oscuro: {
        linea1: 'The artifacts reached the museum, but not all intact.',
        linea2: 'Violence left its mark. Some pieces were damaged in the confrontations.',
        linea3: 'Builder Méndez still seeks ways to demolish the ruins.',
        linea4: 'The traffickers escaped through other routes. The network remains active.',
        linea5: 'Heritage deserves to be protected with intelligence, not force.'
      }
    }
  },

  // Boss fight — Cemí Spirit (bullet hell on Isla Cabritos)
  bossCemi: {
    titulo: 'Spirit of the Cemí',
    intro1: 'The cemí glows with a supernatural light...',
    intro2: 'An ancient presence awakens. Your consciousness shifts to another plane.',
    intro3: 'Dodge the orbs and survive until the spirit weakens!',
    continuar: '[E] Begin',
    ciclo: 'Cycle',
    aturdido: 'The spirit is stunned!',
    atacar: '[E] Strike with Enriquillo\'s Sword',
    victoria: 'You have mastered the spirit of the cemí.',
    victoriaDialogo1: 'How DARE you wake me from my eternal slumber?!',
    victoriaDialogo2: 'But... I must admit this glorious battle has been the most fun I have had in centuries.',
    victoriaDialogo3: 'So I have decided to bless you, my child.',
    victoriaDialogo4: 'But do not anger me again... or you will feel the full power of my wrath.',
    bendicion: 'You receive the Godly Blessing: +30 health, +5 strength, +20% speed',
    bendicionDetalle: '+30 max health | +5 strength | +20% speed',
    derrota: 'The vision fades... you wake up before the pedestal.',
    controles: 'WASD/Arrows: dodge | E: attack (when stunned)',
  },

  // Sword duel against Soldado Diego
  duelo: {
    titulo: '⚔️ Sword Duel',
    ctrl1: '← → : Move',
    ctrl2: 'E : Attack with sword',
    ctrl3: 'Q : Block (hold) / Parry (just in time)',
    ctrl4: '↓ : Duck (dodge high attacks)',
    modoPaz: '🕊️ Pacifist Mode — Defend yourself while talking',
    modoAtaque: '⚔️ Aggressive Mode — Defeat the soldier',
    comenzar: '[E] Start',
    tuVida: 'HP',
    conviccion: 'Conviction',
    controles: '← → Move | E Attack | Q Block | ↓ Duck',
    victoriaPaz: '🕊️ Diego yields — Pacifist Victory!',
    victoriaFuerza: '⚔️ Victory by force!',
    derrota: '💀 You have been defeated...',
    continuar: '[E] Continue',
    paz1: 'Wait! I just want to talk about history.',
    paz2: 'These ruins tell the story of your people.',
    paz3: 'La Isabela was the first European city in the Americas. It deserves protection!',
    paz4: 'I\'m not your enemy. I\'m an accidental archaeologist.',
    paz5: 'Heritage belongs to everyone. Let\'s fight together to protect it.',
    paz6: 'Your duty is to protect these ruins, not forbid them.',
    paz7: 'The Taínos and the Spaniards share this history.',
    paz8: 'Think about what Fray Ramón Pané would say!',
    enGarde: '⚔️ En garde!',
    parry: '✨ Parry!',
  },

  // Batú — Taíno ball game (mini-game)
  batu: {
    titulo: 'BATÚ',
    tituloIntro: 'Batú Ball Game!',
    introDisputa1: 'Two villages disagree over fishing territory.',
    introDisputa2: 'The caciques have decided to settle the dispute with a batú game.',
    introDisputa3: 'The winner gets the fishing rights!',
    introCeremonia1: 'It\'s areíto day! The village celebrates with music and games.',
    introCeremonia2: 'Higüemota challenges you to a friendly batú match.',
    introCeremonia3: 'Show your skill on the batey!',
    reglas: 'Rules: hit the ball with hips, shoulders, or head. No hands or feet!',
    reglas2: 'First to 5 points wins. The ball cannot touch the ground on your side.',
    continuar: '[E] Continue',
    controles: '← → move | Hit with your body (hip, shoulder, head, knee)',
    saqueJugador: 'Your serve!',
    saqueRival: 'Guarocuya\'s serve!',
    puntoJugador: 'Your point!',
    puntoRival: 'Point for Guarocuya!',
    sabiasQue: 'Did you know...?',
    victoria: 'Victory!',
    derrota: 'Defeat!',
    victoriaDisputa: 'Your village wins the fishing rights! Batú resolved the conflict without violence.',
    derrotaDisputa: 'The other village wins. But batú prevented a violent conflict.',
    victoriaCeremonia: 'Great match! Higüemota congratulates you. The areíto continues with more energy.',
    derrotaCeremonia: 'Higüemota wins this time. But the celebration is what matters!',
    datoFisica: 'The batú ball was made from cupey tree latex. It was very bouncy and softball-sized.',
    datoCancha: 'Bateyes (courts) had petroglyphs carved on their stone borders. They were sacred places.',
    datoYugo: 'The yugo was a stone or wooden belt used to hit the ball with the hips.',
    datoCeremonia: 'Batú was played during areíto festivals, alongside music, dance, and food.',
    datoDisputa: 'Batú was used to settle disputes between villages without going to war. Taíno sports diplomacy.',
    datoArqueologia: 'Bateyes have been found at Chacuey and La Aleta (DR), and Tibes and Caguana (Puerto Rico).'
  },

  // El combate prioriza la resolución pacífica — refleja el enfoque educativo del juego
  combate: {
    atacar: 'Attack',
    hablar: 'Talk',
    negociar: 'Negotiate',
    huir: 'Flee',
    persuadir: 'Persuade',
    educar: 'Educate',
    pacificar: 'Pacify'
  },

  objetos: {
    linterna: 'Flashlight',
    navaja: 'Archaeological Swiss Knife',
    brujula: 'Compass',
    mapa: 'Ancient Map',
    magnetometro: 'Magnetometer',
    fragmentoMapa: 'Map Fragment',
    artefactoTaino: 'Taíno Artifact',

    descLinterna: 'Lights up the darkness of caves. Increases your vision radius.',
    descNavaja: 'Multi-purpose tool designed by Diana and 3D-printed. Includes brush, spatula, magnifying glass, and scale ruler.',
    descBrujula: 'Points north. Helps you navigate large areas.',
    descMapa: 'An ancient map with mysterious marks of archaeological sites.',
    descFragmentoMapa: 'A piece of an ancient map. It seems to show the location of other caves.',
    descArtefactoTaino: 'A cemí with golden details. It should be taken to the museum for study.',
    idoloCemi: 'Sacred Cemí Idol',
    descIdoloCemi: 'Cemí carved by Anacaona. Take it to Enriquillo at Lago Enriquillo.',
    espadaEnriquillo: 'Enriquillo\'s Sword',
    descEspadaEnriquillo: 'Ceremonial sword of the cacique. Needed to face the spirit of the cemí.',
    macheteCimarron: 'Maroon Machete',
    descMacheteCimarron: 'Machete forged by African maroons. +2 damage in combat.',
    tamborGuerra: 'War Drum',
    descTamborGuerra: 'African war drum. Its rhythm inspires courage. +2 damage in combat.',
    pergaminoLibertad: 'Scroll of Freedom',
    descPergaminoLibertad: 'Document proclaiming the freedom of the maroons of Lemba\'s palenque.',
    artefactoCatedral: 'Cathedral Museum Artifact',
    descArtefactoCatedral: '16th century religious piece discovered during excavation. Fabiola Herrera is expecting it.',
    cucharaLegendaria: 'The Legendary Spoon',
    descCucharaLegendaria: 'A mystical spoon forged in the depths of Pomier. Increases hidden object detection range. Also great for scratching your back. 😄',
    descMagnetometro: 'Detects metallic objects buried underground.',

    arcabuz: 'Colonial Arquebus',
    descArcabuz: 'A 15th century firearm used by the conquistadors. A museum piece.',
    mapaColonial: 'Colonial Map',
    descMapaColonial: 'Map showing the most important colonial sites on the island. A gift from Roberto Cassá.',

    planoColonial: 'Architectural Blueprint',
    descPlanoColonial: 'Original blueprint of the Primada Cathedral of the Americas. An invaluable historical document.',
    monedaColonial: 'Crown Coin',
    descMonedaColonial: 'A 16th century Spanish coin found under the streets of the Zona Colonial.',
    azulejoAntiguo: 'Colonial Tile',
    descAzulejoAntiguo: 'A decorated ceramic tile from the colonial period. Technique brought from Spain.',
    llaveHierro: 'Iron Key',
    descLlaveHierro: 'A colonial wrought-iron key. It might open some old door.',

    clavoBronce: 'Bronze Nail',
    descClavoBronce: 'A bronze nail from the Santa María\'s hull. It resisted saltwater corrosion.',
    mapaNaufragios: 'Shipwreck Map',
    descMapaNaufragios: 'Map showing shipwreck locations in the Dominican Caribbean. Gift from the underwater archaeologist.',

    registroAduanal: 'Customs Registry',
    descRegistroAduanal: 'Official customs document with anomalies detected in Torres\'s shipments.',
    ordenJudicial: 'Court Order',
    descOrdenJudicial: 'Court order authorizing the confiscation of trafficked artifacts.',

    certificadoAutenticidad: 'Certificate of Authenticity',
    descCertificadoAutenticidad: 'Official document certifying the authenticity of an archaeological artifact.',
    catalogoMuseo: 'Museum Catalog',
    descCatalogoMuseo: 'Catalog of all artifacts in the Museum of the Royal Shipyards.',

    dienteTiburon: 'Fossil Shark Tooth',
    descDienteTiburon: 'Fossil megalodon shark tooth. Proof these giants swam here millions of years ago.',

    periodico: 'Newspaper Article',
    descPeriodico: 'Article about the archaeological discovery made with the equipment repaired at LFSD. You and the students are co-authors!',

    robotSubmarino: 'Underwater Robot',
    descRobotSubmarino: 'Underwater robot programmed at LFSD. Bring it to Dr. Sofía at the Manatee Sanctuary.',

    equipoAnalisis: 'Analysis Equipment',
    descEquipoAnalisis: 'Analysis equipment repaired at LFSD. Bring it to Dr. López at the Royal Shipyards Museum.',

    casabe: 'Casabe',
    descCasabe: 'Taíno bread made from grated and toasted cassava. Restores 25 health.',
    hierbasCurativas: 'Healing Herbs',
    descHierbasCurativas: 'Medicinal plants from the behique. Restore 30 health.',
    guanabana: 'Soursop Leaves',
    descGuanabana: 'Medicinal soursop leaves and seeds. Restore 30 health.',
    vasijaCurativa: 'Healing Vessel',
    descVasijaCurativa: 'Clay vessel with higüero fruit pulp, maguey sap, and prickly pear. Restores 35 health.'
  },

  inventario: {
    titulo: 'Inventory',
    vacio: 'Your backpack is empty',
    lleno: 'Backpack full',
    usar: '[E] Use',
    cerrar: '[I] or [Q] Close',
    slots: 'slots'
  },

  // Los mundos representan capas temáticas de la historia dominicana
  mundos: {
    taino: 'Taíno World',
    colonial: 'Colonial World',
    acuatico: 'Aquatic World',
    juridico: 'Legal World',
    laboratorio: 'Laboratory / Museum'
  },

  // El clima afecta la jugabilidad y refleja fenómenos reales del Caribe
  clima: {
    soleado: 'Sunny',
    lluvia: 'Rain',
    huracan: 'Hurricane!',
    terremoto: 'Earthquake!'
  },

  guardado: {
    guardarPartida: 'Save Game',
    cargarPartida: 'Load Game',
    nombreSesion: 'Session Name',
    contrasena: 'Password',
    guardarLocal: 'Save Locally',
    guardarNube: 'Save to Cloud',
    guardadoExitoso: 'Game saved!',
    errorGuardado: 'Error saving'
  },

  tutorial: {
    bienvenida: 'Welcome to ArcLycée!',
    movimiento: 'Use arrow keys or WASD to move',
    accion: 'Press E to interact with objects and characters',
    saltar: 'Press SPACE to jump (in platforming areas)'
  },

  // LFSD — Lycée Français de Santo Domingo classroom dialogues
  // Three students offer quests related to robotics and archaeology
  lfsd: {
    // Leonardo — electronics expert (blue shirt)
    emile1: 'Hi! I\'m Leonardo, from the robotics club "les fous du robot". I work with electromagnetic sensors.',
    emile2: 'I\'m calibrating a magnetometer to detect metal artifacts underground. Electromagnetic fields are fascinating.',
    emile3: 'The magnetometer measures variations in Earth\'s magnetic field. Any metal object disrupts that field.',
    emile4: 'Want to try calibrating it? You need to adjust frequency, amplitude, and phase to match the reference waveform.',

    // Leonardo — extra dialogue (flavor, a/b pairs shown in sequence)
    emile5a: 'Know our club? We\'re "les fous du robot"! We build robots for archaeological exploration.',
    emile5b: 'We use Arduino, ultrasonic sensors, and even infrared cameras. Technology in the service of history!',
    emile6a: 'At LFSD we learn in three languages: Spanish, French, and English. It helps us collaborate with international teams!',
    emile6b: 'We\'re going to present our project at a science fair. It\'s going to be amazing!',

    // Diana — programmer and designer (green shirt)
    sofiaNombre: 'Sofia',
    sofia1: 'Hi! I\'m Sofia. I love 3D design and printing.',
    sofia2: 'I designed an archaeological spoon in Tinkercad. It\'s my first 3D printing project!',
    sofia3: 'What I love most about the club is combining science with history.',
    sofia4: 'Every robot we build has a purpose: protecting heritage.',

    // Sofia — extra dialogue (flavor)
    sofia5a: 'At LFSD we learn in three languages. It helps us collaborate with international teams.',
    sofia5b: 'We\'re going to present our project at a science fair. It\'s going to be amazing!',
    sofia6a: 'Technology can help archaeology in incredible ways.',
    sofia6b: 'Someday I want to be an engineer and protect heritage with robots!',

    // Hugo — mechanic (orange shirt)
    lucas1: 'Hey! I\'m Hugo, the team\'s mechanic. I maintain the analysis equipment.',
    lucas2: 'The analysis equipment has a connection circuit that got damaged. The colored wires came loose.',
    lucas3: 'Each wire needs to connect with its matching color pair. Get it wrong and sparks fly!',
    lucas4: 'Can you help me fix it? It\'s like an electric puzzle. You have to match the correct pairs.',

    // Hugo — extra dialogue (flavor, a/b pairs shown in sequence)
    lucas5a: 'Did you know the Taínos were excellent engineers? Their canoes could carry 50 people.',
    lucas5b: 'We carry on that tradition of innovation. Only now we use circuits instead of ceiba tree trunks.',

    // Theo Jules — Sonic fan, speed, fries
    theo1: 'Sonic X Shadow Generations is the BEST game ever! Shadow using Chaos Control is insane.',
    theo2: 'In games I always pick the fastest character. Speed is everything. Like Sonic!',
    theo3: 'I love Sonic\'s moves: spin dash, homing attack, boost... perfection!',
    theo4: 'Want some fries? I always have a bag around. They\'re my fuel for coding.',
    theo5: 'A good game needs lore, backstory, a deep universe. Without that, it\'s just a little game.',
    theo6: 'We use Arduino and ultrasonic sensors. Technology serving history!',
    theo7: 'Shadow is the best Sonic character. Fast, dark, with a story. Sonic is cool but Shadow is EPIC.',
    theo8: 'If our robot could move at Sonic speed, we\'d have explored every cave in the country.',

    // Tea — One Piece, Blue Lock, Roblox, Wendy's, pranks
    nael1: 'Do you play Roblox? I have like 500 hours. There\'s everything there!',
    nael2: 'Wendy\'s burgers are superior. The Baconator is a culinary masterpiece.',
    nael3: 'In One Piece, Luffy never gives up. Gear Fifth is the most epic thing I\'ve ever seen!',
    nael4: 'Blue Lock is INCREDIBLE. Isagi calculating shot angles is basically what we do with the robot but with soccer.',
    nael5: 'Hehe! I just hid Tom\'s backpack. Not telling where. *evil laugh*',
    nael6: 'My brother says I bug him too much. I say it\'s combat training. It\'s for his own good!',
    nael7: 'We design submarine robots. There\'s so much submerged heritage waiting to be discovered!',
    nael8: 'Zoro from One Piece gets lost more than our robot when the GPS fails. And that\'s saying a lot.',

    // Jules — Star Wars, Assassin's Creed, dinosaurs, surf, guitar
    jules1: 'Assassin\'s Creed made me love history. The restricted zones are the best: enter and NPCs get suspicious.',
    jules2: 'Star Wars! Lightsabers, the Force, the Sith... If I could be a Jedi AND an archaeologist, that\'d be perfect.',
    jules3: 'Did you know dinosaurs lived on this island? Well, not exactly here, but fossils have been found in Hispaniola.',
    jules4: 'After the club I go surfing. Cabarete waves are perfect for learning. Nothing like the Caribbean!',
    jules5: 'I\'ve played guitar since I was 8. Sometimes I add music to our club presentations.',
    jules6: 'In Assassin\'s Creed you\'re an assassin protecting history. We\'re robots protecting heritage. Same energy!',
    jules7: 'T-Rex had tiny arms, but Velociraptor had lethal claws. Like our robotic gripper but more... deadly.',
    jules8: 'Every robot we build has a purpose: protecting Dominican archaeological heritage.',

    // Rafael — Core Keeper, Minecraft, Brawl Stars, pasta, guitar, side quests
    rafael1: 'In Minecraft I built a replica of the Zona Colonial. Every detail! Took me three months.',
    rafael2: 'Best part of any game? The side quests. Going off the main story and discovering hidden secrets.',
    rafael3: 'I play guitar and love epic music. When I code, I play game soundtracks. Helps me focus!',
    rafael4: 'Core Keeper is addictive. Dig, build, explore... It\'s like archaeology but in pixels!',
    rafael5: 'Pizza and pasta are the best food ever. If I could eat pasta while coding, I would. Actually... *looks at plate*',
    rafael6: 'In Brawl Stars, my main is Leon. Invisible and lethal. Like an archaeologist: observe without being seen.',
    rafael7: 'Last year we presented our project at a science fair in Paris. It was amazing!',
    rafael8: 'The best games let you explore freely. Side quests are where the real adventure is.',

    // Alberto — Terraria, Core Keeper, sushi, prankster
    alberto1: 'Terraria has over 5,000 items. FIVE THOUSAND! And I want them all. I\'m an obsessive collector.',
    alberto2: 'Tried salmon sushi? It\'s my favorite food. That and pancakes with syrup. Not together!',
    alberto3: 'Binding of Isaac is disturbing but genius. Every run is different. Like every archaeological dig!',
    alberto4: 'Hehe... I hid Carlos Guillermo\'s book again. He always falls for it! But we\'re good friends, you know.',
    alberto5: 'Core Keeper and Terraria are cousins. Same philosophy: dig, build, survive.',
    alberto6: 'Read books? Nah, I prefer reading code. Books don\'t have bugs... well, some have typos.',
    alberto7: 'Mew Genics is gonna be INCREDIBLE when it comes out. Mutant cats + Edmund McMillen = perfection.',
    alberto8: 'Sometimes I hide Carlos Guillermo\'s lunch box too. But I always give it back! We\'re a great team and we have an amazing time together.',

    // Carlos Guillermo — Percy Jackson, Hollow Knight, Adventure Time, etc.
    carlosG1: 'Percy Jackson taught me that Greek myths are real... well, almost. But archaeology also uncovers myths that turned out to be true.',
    carlosG2: 'Do you know Hollow Knight? Hallownest is a lost civilization underground. Just like the Pomier caves! Silksong is even better.',
    carlosG3: 'In Deltarune, Ralsei says choices matter. In archaeology too: every piece you protect changes history.',
    carlosG4: 'Gravity Falls is the best. Dipper investigating hidden mysteries is basically what we do, but with robots.',
    carlosG5: 'Adventure Time seems random, but it has the deepest lore. The Mushroom War is post-apocalyptic. Finn lives in the ruins of our civilization.',
    carlosG6: 'Delicious in Dungeon made me think: what if archaeologists cooked what they found? ...Better not. But Senshi is a genius.',
    carlosG7: 'Dan Da Dan mixes aliens, ghosts and romance. It\'s chaotic and brilliant. Okarun transforming never stops being epic.',
    carlosG8: 'Annabeth Chase would have been an incredible archaeologist. Daughter of Athena, obsessed with ancient architecture... she\'s practically one of us.',
    carlosG9: 'Spider-Man: Across the Spider-Verse has the most incredible art style in cinema. Every frame is a masterpiece. EVERY FRAME!',
    carlosG10: 'A good character needs complete definition: personality, history, motivations. Without that, it\'s just a walking sprite.',
    carlosG11: 'Boss fights define a game. If the boss doesn\'t make your palms sweat, it\'s not done right.',
    carlosG12: 'I love reading. Percy Jackson, Harry Potter, Lord of the Rings... books take you to worlds games can\'t.',
    carlosG13: 'Chicken shawarma or falafel? Both! They\'re the perfect food for reading marathons.',
    carlosG14: 'Undertale proved you can win without fighting. The pacifist route is the hardest and the most beautiful.',
    carlosG15: 'In Minecraft I build entire worlds. Cities, dungeons, temples... it\'s like being an architect and explorer at once.',
    carlosG16: 'Scott Pilgrim vs. the World is my favorite movie. Defeating the 7 evil exes to be with the person you love! Edgar Wright is a genius.',
    carlosG17: 'The Scott Pilgrim game is a perfect beat \'em up. River City Ransom + pixel art + Anamanaguchi. And now we can play it again!',

    // Elian — 3D printing, Fortnite, Gatorade, avocado with tuna
    elian1: 'I\'m designing the robot chassis with 3D printing. It\'s lighter than aluminum!',
    elian2: 'A good robot needs good structure. Like Taíno bohíos: simple but effective engineering.',
    elian3: 'I need my Gatorade! Coding makes you thirsty. Blue or red? Blue, always blue.',
    elian4: 'In Fortnite my strategy is hiding in a bush until few are left. Pure strategy!',
    elian5: 'Tried avocado with tuna and mayo? Sounds weird but it\'s DELICIOUS. Trust me.',
    elian6: '*scratches back with a spoon* What? It\'s multi-purpose. Also works for mixing 3D printing resin.',
    elian7: 'Always check all options before deciding. In Fortnite and in life.',
    elian8: 'The 3D printer is my favorite workshop tool.',

    // Tom — Brawl Stars, pasta, pranks, AI, handball
    tom1: 'I handle the Bluetooth communication between the robot and the control tablet.',
    tom2: 'Wireless signals underwater are tricky. That\'s why we use cables for the submarine bot!',
    tom3: 'Brawl Stars! My main is Shelly. Simple but effective. Like a good algorithm.',
    tom4: 'AI fascinates me. What if we add AI to the robot so it makes decisions on its own?',
    tom5: 'Pasta with bolognese sauce is the best food in the world. I don\'t accept debate.',
    tom6: 'I play handball on the LFSD team. It\'s like coding: calculate angles and anticipate moves.',
    tom7: '*looks at Tea* Hehe... I just changed her desktop wallpaper. Don\'t tell her.',
    tom8: 'Someday AI will analyze archaeological artifacts automatically. And we\'ll be the first to use it!',

    // Eduardo — archaeologists and the state's role in heritage protection
    eduardo1: 'Did you know there are only 4 archaeologists supervising construction across the whole country?',
    eduardo2: 'I researched Dominican heritage laws. Law 318 is key.',
    eduardo3: 'The State has the responsibility to protect archaeological sites.',
    eduardo4: 'In France, before building, an archaeological team inspects the terrain. We should do the same here!',
    eduardo5: 'An archaeological risk map would help prevent the destruction of sites.',
    eduardo6: 'We talked with archaeologist Wilton Khoury. He told us incredible things!',
    eduardo7: 'The Pedernales airport was built over possible Taíno remains. Nobody checked.',
    eduardo8: 'Protecting heritage isn\'t just about laws, it\'s about awareness.',

    // Prof. Nicolas Droulers — robotics teacher and project leader
    profesorNombre: 'Prof. Nicolas Droulers',
    profesor1: 'Welcome to the Lycée Français robotics class. I\'m Nicolas Droulers, the teacher of this group.',
    profesor2: 'These students are "les fous du robot". Crazy about robots, but also about this country\'s history.',
    profesor3: 'I had the idea of combining robotics with archaeology. A map, a video game, robots exploring heritage.',
    profesor4: 'The kids brought the project to life. They design, program, solve real problems. They learn by doing.',
    profesor5: 'The Dominican Republic has an enormous archaeological heritage and so much left to discover.',
    profesor6: 'Our work connects science with culture. Robotics in service of history.',
    profesor7: 'I know each and every one of my students. Each one brings something different: electronics, programming, mechanics, design...',
    profesor8: 'The most important thing isn\'t the robot itself, but what they learn building it together. That\'s what makes me proudest.',
    profesor9: 'This project was born from a simple idea: what if technology could help protect heritage?',
    profesor10: 'Each student contributed to the project and worked on different aspects too. They all did a lot of research.',

    // Sub-mission: deliver submarine robot
    subMisionRobot: 'Deliver Submarine Robot',
    subMisionRobotDesc: 'Bring the Submarine Robot to Dr. Sofía at the Manatee Sanctuary.',

    // Sub-mission: deliver analysis equipment
    subMisionEquipo: 'Deliver Analysis Equipment',
    subMisionEquipoDesc: 'Bring the repaired equipment to Dr. López at the Royal Shipyards Museum.',
    equipoObtenido: 'Equipment repaired! Bring it to Dr. López.',

    // Lucas — post mini-game states
    lucasCompleto: 'The equipment works again! Now we need to bring it to Dr. López at the museum.',
    lucasPostEntrega: 'Dr. López has the equipment! Let\'s see what she discovers with it.',
    lucasPostDescubrimiento: 'We\'re in the newspaper! The article says our club helped with a scientific discovery.',
    lucasPostDescubrimiento2: 'My mom cut it out and stuck it on the fridge. She says I\'m famous!'
  },

  // Game log — mission journal UI
  registro: {
    titulo: 'Mission Log',
    principal: 'Main Story',
    secundaria: 'Side Quests',
    vacio: 'No missions logged',
    bloqueado: '???',
    nodos: {
      nodo0: { nombre: 'Pomier Caves', desc: 'Explore caves with Taíno petroglyphs and pictographs.' },
      nodo1: { nombre: 'Taíno Settlement I', desc: 'Discover the daily life of a Taíno village.' },
      nodo2: { nombre: 'Taíno Settlement II', desc: 'Visit the batey and chiefdom ceremonies.' },
      nodo3: { nombre: 'La Isabela', desc: 'Investigate the ruins of the second European settlement (1494).' },
      nodo4: { nombre: 'Colonial Zone', desc: 'Tour the first permanent European city in the Americas.' },
      nodo5: { nombre: 'Santa María Shipwreck', desc: 'Dive to explore the remains of Columbus\'s flagship.' },
      nodo6: { nombre: 'Punta Cana Airport', desc: 'Stop the illegal trafficking of archaeological artifacts.' },
      nodo7: { nombre: 'Atarazanas Museum', desc: 'Analyze the recovered artifacts at the museum.' },
      nodo8: { nombre: 'LFSD', desc: 'Complete robotics missions with les fous du robot.' }
    }
  },

  // Reputation — player recognition levels
  reputacion: {
    etiqueta: 'Reputation',
    desconocido: 'Unknown',
    conocido: 'Known',
    respetado: 'Respected',
    legendario: 'Legendary'
  },

  // Calibration — "Good Vibrations" mini-game (magnetometer)
  calibracion: {
    titulo: 'Good Vibrations',
    intro: 'Calibrate the magnetometer by matching the target waveform. Precision is key!',
    instrucciones: '↑↓ adjust | ←→ switch dial | E confirm',
    frecuencia: 'Frequency',
    amplitud: 'Amplitude',
    fase: 'Phase',
    exito: 'Magnetometer calibrated!',
    fallo: 'Calibration failed. Try again.',
    tiempo: 'Time'
  },

  // Programming — "Full Metal Archeologist" mini-game (submarine robot)
  programacion: {
    titulo: 'Full Metal Archeologist',
    intro: 'Program the submarine robot to reach the scan point. Every command counts.',
    instrucciones: '↑↓ select | E add | ← remove | Enter execute',
    avanzar: 'Forward',
    girarIzq: 'Turn Left',
    girarDer: 'Turn Right',
    escanear: 'Scan',
    sumergir: 'Dive',
    ascender: 'Rise',
    exito: 'Robot reached the target!',
    fallo: 'Robot crashed. Try again.',
    ejecutando: 'Executing...'
  },

  // Connection — "Weird Science" mini-game (circuit repair)
  conexion: {
    titulo: 'Weird Science',
    intro: 'Connect matching colored wires to repair the analysis equipment. Watch out for sparks!',
    instrucciones: '↑↓ select | E connect',
    exito: 'Circuit complete!',
    fallo: 'Time\'s up! Try again.',
    chispa: 'Wrong connection!'
  },

  // Quests — sidequest titles and descriptions
  misiones: {
    batuTitulo: 'Batú',
    batuDesc: 'Play a batú match against Higüemota at the batey.',
    buenasVibracionesTitulo: 'Good Vibrations',
    buenasVibracionesDesc: 'Calibrate the magnetometer at the LFSD robotics class.',
    metalCompletoTitulo: 'Full Metal Archeologist',
    metalCompletoDesc: 'Program the submarine robot at LFSD.',
    cienciaLocaTitulo: 'Weird Science',
    cienciaLocaDesc: 'Repair the analysis equipment at LFSD.',
    idoloEnriquilloTitulo: 'Enriquillo\'s Idol',
    idoloEnriquilloDesc: 'Bring the sacred cemí to Enriquillo at Lago Enriquillo.',
    idoloEnriquilloCompleta: 'Mission complete: Enriquillo\'s Idol!',
    museoCatedralTitulo: 'Cathedral Museum',
    museoCatedralDesc: 'Bring the religious artifact to Fabiola Herrera at the Cathedral Museum.',
    museoCatedralCompleta: 'Mission complete: Cathedral Museum!',
    museoCatedralReputacion: 'Cathedral Museum completed',
    rescateManatiTitulo: 'Manatee Rescue',
    rescateManatiDesc: 'Free the trapped manatee and clean the reef at the Sanctuary.',
    rescateManatiReputacion: 'Manatee freed',
    limpiezaReputacion: 'Reef cleaned',
    descubierta: 'Quest discovered!'
  },

  // Photo album — player captures during the adventure
  album: {
    titulo: 'Photo Album',
    fotos: 'Photos',
    selfies: 'Selfies',
    vacio: 'No photos yet. Explore and capture moments!',
    vacioSelfies: 'No selfies yet. Pose with whatever you find!',
    tomarFoto: '[T] Photo',
    tomarSelfie: '[G] Selfie',
    fotoTomada: 'Photo saved!',
    selfieTomada: 'Selfie saved!',
    instrucciones: '← → switch tab | ↑ ↓ scroll | P close'
  },

  // Archaeological sites — 8 real sites to explore
  // UI strings used across multiple scenes and worlds
  // (controls, action labels, HUD indicators)
  ui: {
    presionaE: 'Press E to continue',
    presionaESaltar: 'Press E to skip',
    cartelNoGrafiti: 'Do not write on the walls',
    cartelProteger: 'Protect the petroglyphs',
    eContinuar: '[E] Continue',
    eComenzar: '[E] Start',
    comenzar: 'Start',
    continuar: 'Continue',

    eHablar: '[E] Talk',
    eExaminar: '[E] Examine',
    eEntrar: '[E] Enter',
    eCurar: '[E] Heal',
    eAdoptar: '[E] Adopt',
    eExcavar: '[E] Dig',
    eAlerta: '[E] Alert!',
    eSospechoso: '[E] Suspect!',
    eLiberar: '[E] Free',
    eLiberarManati: '[E] Free manatee',
    fDetectarMetal: '[F] Detect Metal',

    controlesCueva: 'WASD: move | Space: jump | E: examine | I: inventory | M: map | P: photos | L: quests',
    controlesAldea: 'WASD: move | E: talk | I: inventory | M: map | P: photos | L: quests',
    controlesHabilidad: 'WASD: move | E: talk | F: ability | I: inventory | M: map | P: photos | L: quests',
    controlesNadar: 'WASD: swim | E: talk | I: inventory | M: map | P: photos | L: quests',
    controlesNadarInteractuar: 'WASD: swim | E: interact | I: inventory | M: map | P: photos | L: quests',
    controlesCaminar: 'WASD: walk | E: talk | I: inventory | M: map | P: photos | L: quests',
    controlesExcavar: 'WASD: move | E: talk/dig | F: detect | I: inventory | M: map | P: photos | L: quests',
    controlesMuseo: 'WASD: move | E: talk/pick up | M: map | I: inventory | P: photos | L: quests',
    controlesLFSD: 'WASD: move | E: talk | M: map | I: inventory | P: photos | L: quests',
    controlesMapa: 'E: enter | I: inventory | R: real map | +/−: zoom | Q: menu',

    // --- Toasts ---
    partidaGuardada: '💾 Game saved',

    hostilidad: 'Hostility:',
    tuVida: 'Your health:',
    tuTurno: '< Your turn — choose an action >',
    turnoEnemigo: '... enemy turn ...',
    controlesCombate: 'Arrows: choose | E: confirm',
    pistaDefecto: 'Use Talk or Negotiate to convince the opponent',

    infoCombateTitulo: 'How combat works',
    infoObjetivo: '🏆 OBJECTIVE:',
    infoObj1: 'Convince the opponent (green bar to 100%)',
    infoObj2: 'Or defeat them by reducing their health to 0',
    infoPacifista: '☮️ PACIFIST PATH (recommended):',
    infoPac1: 'Use "Talk" and "Negotiate" to raise Convinced',
    infoPac2: 'Convinced at 100% = peaceful victory (+15 reputation)',
    infoPac3: 'Hostility drops when you speak calmly',
    infoAgresivo: '⚔️ AGGRESSIVE PATH:',
    infoAgr1: '"Attack" deals damage but raises hostility',
    infoAgr2: 'Victory by force = only +5 reputation',
    infoMedidores: '📊 METERS:',
    infoConv: '■ Convinced: rises with Talk/Negotiate → 100% = peace',
    infoHost: '■ Hostility: rises when attacking, drops when talking',
    infoCerrar: '[H] Close',
    estadoCasiPaz: '☮️ Almost convinced!',
    estadoPeligro: '⚠️ Very hostile!',
    estadoBien: '✓ Making progress',
    estadoMal: '✗ Tense situation',
    pistaMapaReal: '🗺️ Press R to view the real map',
    palenqueBienvenida: 'Palenque de Lemba — Maroon Community',
    pantallaCompleta: 'Full Screen',
    activada: 'On',
    desactivada: 'Off',
    danoEnCombate: 'damage in combat',
    eExaminar: '[E] Examine',
    caritasDescubiertas: 'Las Caritas discovered — Taíno petroglyphs',
    controlespalenque: 'WASD: move | E: talk | I: inventory | M: map | P: photos | L: quests',
    elegirCompanero: 'Who do you attack with?',
    elegirCompaneroControles: '< Choose an ally — Q to cancel >',
    elegir: 'choose',
    confirmar: 'confirm',
    cancelar: 'cancel',

    presionaEContinuar: 'Press E to continue ▶',

    descripcionPersonaje: '14 years old. Taíno, Spanish and African ancestry.',
    controlesSeleccion: 'Left/Right: change | Enter/E: confirm | Q/Esc: back',

    introLugar: 'Somewhere in Santo Domingo...',
    introBrilla: 'Something shines among the rubble...',
    introCuidado: 'WATCH OUT! The ground is collapsing!',
    introDonde: '...Where am I?',

    controlesMenu: 'Arrows/WASD: navigate | Enter/E: select',
    volverMenu: 'Press Q / Escape / Enter to go back',

    selectorNiveles: '🔓 LEVEL SELECTOR 🔓',
    konamiActivado: '(Konami Code activated)',
    masNivelesArriba: '▲ more levels',
    masNivelesAbajo: '▼ more levels',
    controlesSelector: '↑↓: choose  |  E: go to level  |  Q: close',

    subtituloJuego: 'Dominican Archaeological Adventure',
    creadoPor: 'Created by',
    profesor: 'Teacher',
    claseRobotica: 'Robotics Class',
    ubicacion: 'Santo Domingo, Dominican Republic',
    tecnologias: 'Technologies',
    inspiradoEn: 'Inspired by',
    agradecimiento1: 'The archaeological heritage of the Dominican Republic',
    agradecimiento2: 'The researchers of the Museum of the Dominican Man',
    agradecimiento3: 'The Zona Colonial of Santo Domingo (UNESCO)',
    agradecimiento4: 'The Pomier Caves and their Taíno petroglyphs',
    mensajeFinal1: 'Let us protect our heritage.',
    mensajeFinal2: 'History belongs to all of us.',
    copyright: 'Lycée Français de Saint-Domingue © 2026',

    volumenMusica: 'Music Volume',
    volumenSonidos: 'Sound Volume',

    controlesBatu: '← → move | Hit with your body (hip, shoulder, head, knee)',
    tu: 'You',
    rival: 'Guarocuya',

    controlesRegistro: '← → change tab | ↑ ↓ scroll | Q close',

    misionCompletaFinal: 'Mission complete! Press M to see the ending',

    calibracionTitulo: 'Signal Calibration',
    calibracionInstrucciones: '↑↓: change knob | ←→: adjust | E: confirm',
    calibracionDesc1: 'Adjust the 3 knobs so the wave matches',
    calibracionDesc2: 'the target signal (dotted line).',

    programacionTitulo: 'Robot Programming',
    programacionDesc1: 'Arrange the blocks to guide the robot',
    programacionDesc2: 'to the scan point.',
    programacionInstrucciones: '↑↓: choose block | E: add | ←: remove | F: run',
    programacionBloques: 'Blocks:',
    programacionPrograma: 'Program:',
    programacionControles: '↑↓: choose | E: add | ←: remove | F: run',
    programacionEjecutando: 'Running program...',

    conexionTitulo: 'Cable Connection',
    conexionDesc1: 'Connect each cable to its matching pair.',
    conexionDesc2: 'Match colors and symbols.',
    conexionInstrucciones: '↑↓: navigate | E: select/connect | Q: cancel',
    conexionBonus: 'Speed bonus! +5 extra reputation',

    lfsdTitulo: 'LFSD - Robotics Class',
    bienvenida: '🤖 Welcome to les Fous du Robot',
    lfsdPizarra: 'Robotics Class - LFSD',
    impresora3D: '3D Printer',

    hablarHabitantes: 'Talk to inhabitants',

    // --- Character names in dialogues ---
    espirituTaina: '🌀 Taíno Spirit',
    petroglifo: '🗿 Petroglyph',

    // --- Inventory toasts ---
    itemAnadido: 'item added to inventory',
    itemAnadidoCorto: 'added to inventory',
    itemAnadidoBrief: 'item added',

    // --- Save toasts ---
    noHayPartida: 'No saved game found',
    partidaCargada: '📂 Game loaded',

    // --- Quest toasts ---
    misionDescubierta: '📋 Quest discovered:',
    misionCompletada: '✅ Quest completed:',
    accionEcologica: 'Ecological action completed!',

    // --- Colonial zone toasts ---
    cassaInteresante: '💬 Roberto Cassá always has something interesting to say',
    cambioGuardia: '🎖️ Changing of the guard at the National Pantheon!',

    // --- Laboratory toasts ---
    morbanAutenticacion: '🏛 Dr. Morbán: authentication process explained',
    periodicoRecogido: '📰 Newspaper article collected!',
    descubrimientoCientifico: '📰 Scientific discovery! You\'ll be in the newspaper!',
    equipoEntregado: '🔬 Equipment delivered — Dr. López will investigate!',
    lopezCarbono: '🔬 Dr. López: Carbon-14 dating',
    anaRestauracion: '🔧 Ana: restoration principles',
    visitanteConvencido: '🕵 Visitor convinced to authenticate their piece',
    certificadoRecogido: '📜 Certificate of Authenticity collected!',
    catalogoRecogido: '📖 Museum Catalogue collected!',

    // --- Manatee sanctuary toasts ---
    robotEntregado: '🤖 Robot delivered — 4 new wrecks discovered!',
    equipoBuceo: 'Diving Gear',
    descEquipoBuceo: 'Professional diving gear from Dra. Sofía. Allows exploring cenotes and underwater caves.',
    equipoBuceoToast: '🤿 Received professional Diving Gear!',

    // --- Location labels ---
    salida: 'EXIT',
    recepcion: 'RECEPTION',
    aduanas: 'CUSTOMS',
    museo: 'MUSEUM',
    santuario: 'Sanctuary',
    helices: '⚠ PROPELLERS ⚠',

    // --- Risk map (Colonial Zone) ---
    mapaRiesgo: 'Risk Map:',
    protegido: 'Protected',
    enPeligro: 'In danger',
    amenazado: 'Threatened',

    // --- Map HUD ---
    bloqueadoNivel: '🔒 Locked — complete the previous level',
    completadoNivel: '(Completed)',

    // --- Reference map (markers) ---
    completado: '✅ Completed',
    bloqueado: '🔒 Locked',
    disponible: '🟡 Available',
    viajarAqui: '🗺️ Travel here',
    descubiertoRobot: '📡 Discovered by LFSD Robot',
    cerrarMapa: 'R / Esc — close map'
  },

  sitiosArqueologicos: {
    titulo: 'Unexplored Sites',
    cuevaBerna: 'Cave of Berna — Taíno pictographs, partially studied.',
    puntaMacao: 'Punta Macao — Pre-ceramic site, minimal excavation.',
    elCabo: 'El Cabo — Large Taíno village, partially excavated.',
    playaGrande: 'Playa Grande — Ceramic period, limited study.',
    lomaGuayacanes: 'Loma de Guayacanes — Burial site, needs survey.',
    padreNuestro: 'Padre Nuestro — Cave system with petroglyphs.',
    cuevaMaravillas: 'Cueva de las Maravillas — Additional chambers unexplored.',
    bocaYuma: 'Boca de Yuma — Coastal caves, limited archaeological survey.'
  },

  // --- Place names, structures and crops visible on screen ---
  lugares: {
    // Taíno Settlement I
    bohioAlfarero: 'Potter\'s Bohío',
    bohioPescador: 'Fisherman\'s Bohío',
    bohioCurandera: 'Healer\'s Bohío',
    caneyCacique: 'Cacique\'s Caney',
    bohioCasabe: 'Casabe Bohío',

    // Taíno Settlement II
    bohioBehique: 'Behique\'s Bohío',
    bohioSemillas: 'Seed Bohío',
    bohioAgricultor: 'Farmer\'s Bohío',
    caneyCeremonial: 'Ceremonial Caney',
    dujo: 'Dujo',
    chozaLider: 'Leader\'s Hut',
    chozaForja: 'Forge Hut',
    chozaTambores: 'Drum Circle',
    chozaSanacion: 'Healing Hut',
    atalaya: 'Lookout Tower',

    // Taíno crops
    yuca: 'cassava',
    batata: 'sweet potato',
    maiz: 'corn',
    aji: 'chili pepper',
    tabaco: 'tobacco',

    // La Isabela
    iglesiaRuinas: 'Church (ruins)',
    casaColon: 'Columbus\'s House',
    alhondiga: 'Granary',
    torreVigia: 'Watchtower',
    cementerioColonial: 'Colonial Cemetery',

    // Atarazanas Reales Museum
    salaExhibicion: 'Exhibition Hall',
    laboratorioC14: 'C-14 Laboratory',
    tallerRestauracion: 'Restoration Workshop',
    vitrinaTaina: 'Taíno Display Case',
    vitrinaColonial: 'Colonial Display Case',
    vitrinaSubmarina: 'Underwater Display Case',
    almacenPiezas: 'Artifact Storage'
  },

  // ==========================================================
  // REAL LEAFLET MAP — texts for the real-world reference map
  // ==========================================================
  mapaReal: {
    // --- UI ---
    cerrarMapa: 'R / Esc — close map',
    completado: '✅ Completed',
    bloqueado: '🔒 Locked',
    disponible: '🟡 Available',
    viajarAqui: '🗺️ Travel here',
    descubiertoRobot: '📡 Discovered by LFSD Robot',

    // --- Base tile layers ---
    capas: {
      acuarela: 'Watercolor',
      terreno: 'Terrain',
      toner: 'Toner',
      oscuro: 'Dark',
      suave: 'Soft',
      osm: 'Modern OSM',
      voyager: 'Voyager (CARTO)'
    },

    // --- Overlays (toggleable site layers) ---
    overlays: {
      tainos: '🗿 Taíno Sites',
      coloniales: '🏰 Colonial Sites',
      naufragios: '⚓ Shipwrecks',
      museos: '🏛 Museums',
      inexplorados: '🔍 Unexplored Sites',
      potencial: '🔬 Archaeological Potential'
    },

    // --- In-game locations (main markers) ---
    ubicaciones: {
      cuevasPomier: 'Cuevas del Pomier',
      descCuevasPomier: 'System of 55 caves with over 6,000 Taíno petroglyphs. National Heritage site.',
      asentamiento1: 'Taíno Settlement I',
      descAsentamiento1: 'Reconstructed Taíno village with bohíos, conucos and a ceremonial plaza.',
      asentamiento2: 'Taíno Settlement II',
      descAsentamiento2: 'Taíno agricultural and ceremonial center. Conucos, areíto and cohoba rites.',
      isabela: 'La Isabela',
      descIsabela: 'First permanent European settlement in the Americas, founded by Columbus in 1493.',
      zonaColonial: 'Colonial Zone',
      descZonaColonial: 'First permanent city in the Americas. UNESCO World Heritage Site since 1990.',
      santaMaria: 'Santa María Shipwreck',
      descSantaMaria: 'Remains of Columbus\'s flagship, run aground on Christmas Eve 1492 near Cap-Haïtien.',
      aeropuerto: 'Punta Cana Airport',
      descAeropuerto: 'Punta Cana International Airport (PUJ). Customs checkpoint.',
      atarazanas: 'Museo Atarazanas Reales',
      descAtarazanas: 'Museum of the Royal Shipyards. Shipwreck artifacts and maritime heritage.'
    },

    // --- Real Taíno / pre-Columbian sites ---
    sitiosTainos: {
      cuevasPomierBorbon: 'Cuevas del Pomier (Borbón)',
      descCuevasPomierBorbon: 'System of 55 caves with over 6,000 Taíno and Igneri pictographs and petroglyphs.',
      cuevaMaravillas: 'Cueva de las Maravillas',
      descCuevaMaravillas: 'Over 500 Taíno petroglyphs and pictographs, including scenes of funerary rituals.',
      losHaitises: 'Los Haitises National Park',
      descLosHaitises: 'Caves accessible only by sea with over 1,000 Taíno pictographs and petroglyphs.',
      cuevaFunFun: 'Cueva Fun Fun',
      descCuevaFunFun: 'Vast cave system with an underground river and indigenous rock art in Hato Mayor.',
      cuevaBerna: 'Cueva de Berna',
      descCuevaBerna: 'About 300 Taíno petroglyphs carved into rock in Cotubanamá National Park.',
      cuevaPadreNuestro: 'Cueva Padre Nuestro',
      descCuevaPadreNuestro: 'Cenotes with freshwater pools and petroglyphs in Cotubanamá National Park.',
      lasCaritas: 'Las Caritas de los Indios',
      descLasCaritas: 'Pre-Taíno petroglyphs carved into coral rock overlooking Lake Enriquillo.',
      guacarasCotui: 'Guácaras de Cotuí',
      descGuacarasCotui: 'Caverns with Taíno petroglyphs in Sánchez Ramírez (Hoyo de Sanabe, Guácara del Lago).',
      chacuey: 'Petroglifos de Chacuey',
      descChacuey: 'Hundreds of petroglyphs along the Chacuey river in Dajabón, near the border.',
      laCaleta: 'La Caleta Underwater Park',
      descLaCaleta: 'Pre-Columbian cemetery and museum, underwater park with sculptures of Taíno gods.',
      juanDolio: 'Juan Dolio Ceremonial Plaza',
      descJuanDolio: 'Coastal Taíno archaeological site with remains of a ceremonial plaza and batey.',
      enBasSaline: 'En Bas Saline',
      descEnBasSaline: 'One of the largest Taíno settlements (95,000 m²), likely the village of chief Guacanagarí.',
      fortLiberte: 'Fort-Liberté (Bayajá)',
      descFortLiberte: '164 documented Taíno settlement vestiges and colonial ruins in the bay.',
      grotteMarieJeanne: 'Grotte Marie-Jeanne',
      descGrotteMarieJeanne: 'Longest natural cave in Haiti (5.3 km) with pre-Columbian vestiges near Port-à-Piment.',
      museoTainoCapHaitien: 'Musée Taíno de Cap-Haïtien',
      descMuseoTainoCapHaitien: 'Collection of bracelets, cemís and Taíno ceremonial artifacts from northern Haiti.',
      petroSainteSuzanne: 'Petroglifos de Sainte-Suzanne',
      descPetroSainteSuzanne: 'Gorge with notable Taíno petroglyphs in northern Haiti.'
    },

    // --- Real colonial sites ---
    sitiosColoniales: {
      zonaColonialSD: 'Colonial Zone of Santo Domingo',
      descZonaColonialSD: 'First permanent colonial city of the New World. UNESCO World Heritage Site since 1990.',
      laIsabela: 'La Isabela',
      descLaIsabela: 'First planned European settlement in the Americas, founded by Columbus in 1493.',
      alcazarColon: 'Alcázar de Colón',
      descAlcazarColon: 'Viceregal palace of Diego Columbus (1510), now a museum of colonial furniture and art.',
      sanFrancisco: 'Ruins of the San Francisco Monastery',
      descSanFrancisco: 'First monastery built in the Americas (1508), destroyed by earthquakes.',
      vegaVieja: 'La Vega Vieja',
      descVegaVieja: 'Ruins of the first gold-mining town in the Americas, destroyed by earthquake in 1562.',
      sanFelipe: 'Fortaleza San Felipe',
      descSanFelipe: '16th-century fortress in Puerto Plata built to defend the northern coast from privateers.',
      capHaitien: 'Cap-Haïtien (Historic Center)',
      descCapHaitien: 'Former capital of Saint-Domingue, the "Paris of the Antilles", with French colonial architecture.',
      jacmel: 'Jacmel (Historic Center)',
      descJacmel: 'Colonial city with 19th-century wrought-iron architecture, Haitian cultural heritage.'
    },

    // --- Historic shipwrecks ---
    naufragios: {
      santaMaria1492: 'Santa María (1492)',
      descSantaMaria1492: 'Columbus\'s flagship, ran aground on Christmas night near Cap-Haïtien. Its timbers were used to build Fort La Navidad.',
      sanMiguel1551: 'San Miguel (1551)',
      descSanMiguel1551: 'Spanish galleon laden with treasure, wrecked on the northern coast near Río San Juan.',
      concepcion1641: 'Ntra. Sra. de la Concepción (1641)',
      descConcepcion1641: 'Silver fleet galleon on the Silver Bank. Burt Webber recovered 25 tonnes of silver in 1978.',
      monteCristi1660: 'Monte Cristi Pipe Wreck (1660)',
      descMonteCristi1660: 'Dutch merchant ship carrying over 10,000 clay pipes — the largest underwater collection of tobacco artifacts.',
      quedagh1699: 'Quedagh Merchant (1699)',
      descQuedagh1699: 'Armenian ship captured by pirate Captain Kidd, abandoned near Isla Catalina. Now an underwater museum.',
      guadalupe1724: 'Ntra. Sra. de Guadalupe (1724)',
      descGuadalupe1724: 'Spanish mercury galleon sunk in Samaná Bay during a hurricane, carrying 400 tonnes of mercury.',
      tolosa1724: 'Conde de Tolosa (1724)',
      descTolosa1724: 'Companion of the Guadalupe in the Quicksilver Fleet, wrecked in Samaná with over 550 casualties.',
      scipion1782: 'Le Scipion (1782)',
      descScipion1782: '74-gun French warship, veteran of the Battle of Chesapeake, struck a rock in Samaná Bay.',
      goldenFleece1827: 'Golden Fleece (1827)',
      descGoldenFleece1827: 'American merchant vessel lost on the Silver Bank, treacherous reefs north of the island.',
      astron1978: 'Astron (1978)',
      descAstron1978: '127-metre Soviet cargo ship grounded off Playa Bávaro, Punta Cana. Popular diving site.',
      hickory1944: 'Hickory (1944)',
      descHickory1944: 'US Navy vessel sunk near the southeastern coast during World War II.',
      zonaSantoDomingo: 'Santo Domingo Shipwreck Zone',
      descZonaSantoDomingo: 'Area with multiple colonial-era wrecks south of Santo Domingo. Active underwater archaeology.'
    },

    // --- Shipwrecks discovered by the LFSD robot ---
    naufragiosRobot: {
      luperon: 'Luperón Wreck (17th c.)',
      descLuperon: 'Remains of a Spanish merchant ship found by the robot in Luperón bay. Cargo of ceramics and tools.',
      islaSaona: 'Isla Saona Wreck (18th c.)',
      descIslaSaona: 'Slave ship sunk south of Isla Saona. The robot detected anchors and chains on the sandy seabed.',
      galeonPP: 'Puerto Plata Galleon (1563)',
      descGaleonPP: 'New Spain fleet galleon lost during a hurricane. The robot found cannons and ingots.',
      sanAndres: 'Coastal Steamer San Andrés (1891)',
      descSanAndres: 'Dominican steamship sunk near Boca Chica. The robot scanned intact boilers and metal structure.'
    },

    // --- Unexplored archaeological sites ---
    sitiosInexplorados: {
      cuevaBerna: 'Cueva de Berna',
      descCuevaBerna: 'Parque Nacional del Este — pre-Columbian pictographs in poorly documented coastal caves.',
      puntaMacao: 'Punta Macao',
      descPuntaMacao: 'Higüey area — pre-ceramic site with evidence of human occupation predating the Taíno.',
      elCabo: 'El Cabo',
      descElCabo: 'Eastern coast — large Taíno village with remains of bohíos, ceramics and lithic tools.',
      playaGrande: 'Playa Grande',
      descPlayaGrande: 'Río San Juan — ceramic-period site with pottery fragments and cultural deposits.',
      lomaGuayacanes: 'Loma de Guayacanes',
      descLomaGuayacanes: 'San Pedro de Macorís — funerary site with pre-Columbian burials and ritual offerings.',
      padreNuestro: 'Padre Nuestro',
      descPadreNuestro: 'Bayahíbe — cave system with petroglyphs, cenotes and evidence of Taíno ceremonial use.',
      cuevaMaravillasInex: 'Cueva de las Maravillas',
      descCuevaMaravillasInex: 'San Pedro — unexplored chambers beyond the tourist zone with possible undocumented pictographs.',
      bocaYuma: 'Boca de Yuma',
      descBocaYuma: 'Coastal caves with archaeological stratigraphy spanning multiple periods of occupation.'
    },

    potencialArqueologico: {
      elCabo: 'El Cabo and surroundings (Higüey)',
      descElCabo: 'Unexcavated coastal Taíno settlements. Leiden University excavated the main village (600-1504 AD) but the surroundings have barely been explored.',
      manantialAleta: 'Manantial de la Aleta (cenote)',
      descManantialAleta: 'Sacred Taíno cenote 73m deep with extraordinary wooden offerings. Only "the tip of the iceberg" has been investigated — the depths remain unexplored.',
      monteCristi: 'Montecristi coastal platform',
      descMonteCristi: 'Over 400 colonial shipwrecks reported, fewer than 50 located. UNESCO priority underwater heritage zone.',
      samanaBay: 'Samaná Bay',
      descSamanaBay: 'Beyond the galleons Guadalupe and Tolosa (1724), the sheltered waters contain undiscovered shipwrecks. The archaic site El Pozito indicates pre-Columbian coastal occupation.',
      fortLiberte: 'Fort-Liberté and En Bas Saline (Haiti)',
      descFortLiberte: '~300 archaeological sites at risk of looting. Most likely candidate for La Navidad, the first European fort in the Americas (Columbus, 1492).',
      pomierInexplorado: 'Cuevas del Pomier (unexplored sections)',
      descPomierInexplorado: '55 caves with 6,000+ cave paintings — the largest concentration in the Caribbean. Only 5 open to the public; the ~50 remaining contain undocumented art.',
      jaraguaCuevas: 'Jaragua National Park caves',
      descJaraguaCuevas: 'Jaragua chiefdom. Caves with pictograms dated as far back as 2590 BC. The karst interior (1,374 km²) has never been systematically surveyed.',
      grotteMarieJeanne: 'Grotte Marie-Jeanne (Haiti)',
      descGrotteMarieJeanne: 'Potentially the largest cave system in the Caribbean (~1 km). Taíno ceramics, tools and cave art from sacred ritual use.',
      manielOcoa: 'Maniel de Ocoa (maroon)',
      descManielOcoa: 'First documented maroon settlement on Hispaniola (16th c., until ~1666). Never systematically excavated despite being historically documented.',
      bahorucoMaroon: 'Sierra de Bahoruco (maroon)',
      descBahorucoMaroon: 'For 85+ years large maroon communities occupied these mountains. Also refuge of Enriquillo (1519-1533). No systematic survey conducted.',
      chacuey: 'Chacuey river valley',
      descChacuey: 'Hundreds of petroglyphs and ceremonial plazas with sophisticated pathways. The agricultural settlement pattern of the valley has not been comprehensively excavated.',
      cibaoInterior: 'Cibao Valley interior',
      descCibaoInterior: 'Paleoecological evidence of pre-Columbian agriculture. ~300 indigenous sites recorded but the interior has received far less attention than the coast.',
      bocaNigua: 'Boca de Nigua',
      descBocaNigua: 'Unexcavated Taíno settlement remains. Site of the 1796 enslaved people\'s revolt — dual archaeological dimension: Taíno and maroon.',
      islaCatalina: 'Catalina Island (underwater)',
      descIslaCatalina: 'Captain Kidd\'s Quedagh Merchant discovered here in 2007. The reef system likely contains additional undocumented shipwrecks.',
      costaHaitiSW: 'Southwest coast of Haiti',
      descCostaHaitiSW: 'Jaragua chiefdom. Pre-Columbian fishing villages likely present along Les Cayes-Jérémie. No systematic coastal survey conducted.'
    }
  }
};

export default en;
