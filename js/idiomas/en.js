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
      misionCompleta: 'Village explored! Return to map (Q)'
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

      misionHablar: 'Talk to the 3 villagers',
      misionCompleta: 'Village explored! Return to map (Q)'
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
    descMagnetometro: 'Detects metallic objects buried underground.'
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
