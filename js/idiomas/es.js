// Traducciones al español — idioma principal del juego
// Cada sección agrupa textos por contexto de uso para facilitar mantenimiento

const es = {
  menu: {
    titulo: 'ArcLycée',
    nuevoJuego: 'Nuevo Juego',
    continuarJuego: 'Continuar Juego',
    opciones: 'Opciones',
    idioma: 'Idioma',
    creditos: 'Créditos'
  },

  seleccion: {
    eligePersonaje: 'Elige tu Personaje',
    pepito: 'Pepito',
    pepita: 'Pepita',
    descripcion: 'Descripción',
    confirmar: 'Confirmar'
  },

  interfaz: {
    vida: 'Vida',
    inventario: 'Inventario',
    guardar: 'Guardar',
    mapa: 'Mapa',
    misiones: 'Misiones',
    opciones: 'Opciones'
  },

  // Los diálogos definen la narrativa central del juego —
  // cada personaje tiene líneas que reflejan su trasfondo cultural
  dialogos: {
    intro: {
      linea1: '¡Qué es eso brillando entre los escombros de la construcción?',
      linea2: 'Parece... ¿una reliquia antigua?',
      linea3: '¡CUIDADO! ¡El suelo se derrumba!',
      linea4: '...¿Dónde estoy? Esto parece... una cueva.'
    },

    // El abuelo dominicano transmite valores sobre patrimonio colectivo
    abuelo: {
      saludo: 'Mi nieto/a, la tierra guarda secretos que solo los curiosos pueden descubrir.',
      consejo1: 'Recuerda: cada pieza que encuentres pertenece al pueblo, no a una persona.'
    },

    // La abuela francófona refleja la herencia educativa franco-dominicana
    abuela: {
      saludo: "Mon petit/e, l'aventure t'attend! Mais d'abord, prépare-toi bien.",
      consejo1: "Dans chaque musée il y a une histoire... en cada museo hay una historia."
    },

    // El espíritu taíno conecta al jugador con la historia precolombina
    espirituTaina: {
      saludo: 'Joven descendiente, los cemíes te han elegido para proteger lo que queda de nuestro pueblo.',
      revelacion: 'La cueva del Pomier guarda más secretos de los que imaginas...'
    },

    // El espíritu africano honra la herencia afrodescendiente del país
    espirituAfricano: {
      saludo: 'La fuerza de tus ancestros corre por tus venas, joven guerrero/a.',
      sabiduria: 'No todo tesoro brilla. A veces el verdadero tesoro es el conocimiento.'
    },

    // Magnoboot añade humor y funcionalidad de compañero robótico
    magnoboot: {
      presentacion: '¡BZZT! Soy Magnoboot, robot excavador modelo MX-7. ¡Listo para remover escombros!',
      ayuda: '¡Detecto algo metálico bajo estas rocas! ¿Quieres que excave?'
    },

    // Viralata es el perro callejero — refleja la fauna urbana dominicana
    viralata: {
      descripcion: 'El perro callejero mueve la cola emocionado. Parece haber encontrado un rastro...'
    },

    // El Cemí Murciélago conecta con la mitología taína de las cuevas
    cemiMurcielago: {
      presentacion: 'Un murciélago espectral aparece entre las sombras de la cueva...',
      vinculo: 'Sientes una conexión ancestral con el espíritu Cemí.'
    }
  },

  // El combate prioriza la resolución pacífica — refleja el enfoque educativo del juego
  combate: {
    atacar: 'Atacar',
    hablar: 'Hablar',
    negociar: 'Negociar',
    huir: 'Huir',
    persuadir: 'Persuadir',
    educar: 'Educar',
    pacificar: 'Pacificar'
  },

  objetos: {
    linterna: 'Linterna',
    navaja: 'Navaja Suiza',
    brujula: 'Brújula',
    mapa: 'Mapa Antiguo',
    magnetometro: 'Magnetómetro'
  },

  // Los mundos representan capas temáticas de la historia dominicana
  mundos: {
    taino: 'Mundo Taíno',
    colonial: 'Mundo Colonial',
    acuatico: 'Mundo Acuático',
    juridico: 'Mundo Jurídico',
    laboratorio: 'Laboratorio / Museo'
  },

  // El clima afecta la jugabilidad y refleja fenómenos reales del Caribe
  clima: {
    soleado: 'Soleado',
    lluvia: 'Lluvia',
    huracan: '¡Huracán!',
    terremoto: '¡Terremoto!'
  },

  guardado: {
    guardarPartida: 'Guardar Partida',
    cargarPartida: 'Cargar Partida',
    nombreSesion: 'Nombre de la sesión',
    contrasena: 'Contraseña',
    guardarLocal: 'Guardar Localmente',
    guardarNube: 'Guardar en la Nube',
    guardadoExitoso: '¡Partida guardada!',
    errorGuardado: 'Error al guardar'
  },

  tutorial: {
    bienvenida: '¡Bienvenido/a a ArcLycée!',
    movimiento: 'Usa las flechas o WASD para moverte',
    accion: 'Presiona E para interactuar con objetos y personajes',
    saltar: 'Presiona ESPACIO para saltar (en zonas de plataformas)'
  }
};

export default es;
