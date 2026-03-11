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
    magnetometro: 'Magnetometer'
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
