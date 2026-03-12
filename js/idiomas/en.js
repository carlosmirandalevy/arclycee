// Traducciones al inglés — para jugadores angloparlantes
// La estructura replica exactamente la del archivo español para mantener coherencia

const en = {
  menu: {
    titulo: 'ArcLycée',
    nuevoJuego: 'New Game',
    continuarJuego: 'Continue Game',
    opciones: 'Options',
    idioma: 'Language',
    creditos: 'Credits'
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
    inventario: 'Inventory',
    guardar: 'Save',
    mapa: 'Map',
    misiones: 'Quests',
    opciones: 'Options'
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

    // Second village dialogues — agriculture, medicine, and ceremonies
    aldea2: {
      behique1: 'I am Yuisa, the behique — healer and spiritual guide of this village.',
      behique2: 'The plants of this island have great healing powers that the gods taught us.',
      behique3: 'We use tobacco in the cohoba ceremony, to communicate with the cemíes.',
      behique4: 'Guava cures fever, jagua protects the skin, and aloe heals wounds.',

      agricultor1: 'Look at our conucos! Each mound of earth is a garden of food.',
      agricultor2: 'Conucos are raised mounds where we plant. This way the soil drains better and roots grow strong.',
      agricultor3: 'We grow yuca, corn, sweet potato, hot peppers, and tobacco — everything we need to live.',
      agricultor4: 'Yuca is the most important. With it we make casabe, which is our daily bread.',

      musico1: 'Welcome to the batey, the heart of our village!',
      musico2: 'Here we celebrate the areíto — our great ceremony of music, dance, and memory.',
      musico3: 'We play maracas made from higüero, güiros from gourds, and drums carved from ceiba trunks.',
      musico4: 'In the areíto we sing the history of our people — so the young never forget where they come from.',

      behiqueCemi: 'The Cemí Bat spirit has chosen you! It will guide you in the caves with its echo-location.',

      misionHablar: 'Talk to the 3 villagers',
      misionCompleta: 'Village explored! Return to map (M)'
    },

    // La Isabela — first European settlement in the Americas (1494)
    isabela: {
      soldado1: 'Halt! This area is forbidden by order of the Viceroy!',
      soldado2: 'No one may enter the ruins without permission from the Crown!',
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
      fabiola3: 'We have 15 rooms with treasures from the 16th to 20th century: the Tabernacle, pectoral crosses, the Double-Headed Eagle, the High Choir...',
      fabiola4: 'I used to be an economist, but I discovered that my true mission was to turn this dream into reality.',
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
      combatePista: 'Use citizen activism to fill the Patience bar',
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
    }
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
    navaja: 'Swiss Knife',
    brujula: 'Compass',
    mapa: 'Ancient Map',
    magnetometro: 'Magnetometer',
    fragmentoMapa: 'Map Fragment',
    artefactoTaino: 'Taíno Artifact',

    descLinterna: 'Lights up the darkness of caves. Increases your vision radius.',
    descNavaja: 'Multi-tool. Useful for cutting vines and picking locks.',
    descBrujula: 'Points north. Helps you navigate large areas.',
    descMapa: 'An ancient map with mysterious marks of archaeological sites.',
    descFragmentoMapa: 'A piece of an ancient map. It seems to show the location of other caves.',
    descArtefactoTaino: 'A golden cemí. It should be taken to the museum for study.',
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
    descLlaveHierro: 'A colonial wrought-iron key. It might open some old door.'
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
  }
};

export default en;
