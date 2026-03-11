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
    },

    // Diálogos específicos de la cueva — narran la experiencia de exploración
    cueva: {
      espirituIntro1: 'Joven descendiente... los cemíes te han traído aquí por una razón.',
      espirituIntro2: 'Estas cuevas guardan la memoria de nuestro pueblo taíno.',
      espirituIntro3: 'Busca los petroglifos sagrados. Ellos te mostrarán el camino.',
      espirituIntro4: 'Ten cuidado con los graffitis... alguien ha profanado este lugar.',

      petroSol: 'Este es el petroglifo del Sol. Los taínos lo adoraban como fuente de toda vida. Su calor alimentaba los conucos y su luz guiaba a los pescadores.',
      petroMurcielago: 'El Cemí Murciélago... Los taínos creían que los espíritus de los muertos se convertían en murciélagos y habitaban las cuevas.',
      petroCara: 'Un rostro tallado en la roca. Puede representar un cacique o un espíritu ancestral que protegía la cueva.',
      petroEspiral: 'La espiral simboliza el agua y el movimiento eterno. El mar era sagrado para los taínos — de él venía el sustento.',
      petroRana: 'La rana representaba la fertilidad y la lluvia. Sin lluvia no hay cosecha, sin cosecha no hay pueblo.',

      arqueologoIntro: '¡Alto ahí! ¿Quién eres tú?',
      arqueologoReconoce: 'Espera... ¿encontraste petroglifos? ¡Increíble! Soy la Dra. Martínez, arqueóloga.',
      arqueologoRegalo: 'Toma, necesitarás esto allá afuera. Es Magnoboot, un robot excavador que te ayudará.',
      arqueologoDespedida: 'Cuida el patrimonio. Cada pieza que encuentres pertenece al pueblo dominicano.',

      misionExplorar: 'Explora la cueva y encuentra los petroglifos',
      misionSalir: 'Busca la salida de la cueva',
      misionArtefacto: 'Lleva el artefacto a la salida',
      caida: '¡Caíste al vacío! Vuelves al último punto seguro.'
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
    magnetometro: 'Magnetómetro',
    fragmentoMapa: 'Fragmento de Mapa',
    artefactoTaino: 'Artefacto Taíno',

    descLinterna: 'Ilumina la oscuridad de las cuevas. Aumenta tu radio de visión.',
    descNavaja: 'Herramienta multiusos. Útil para cortar lianas y abrir cerraduras.',
    descBrujula: 'Señala el norte. Te ayuda a no perderte en lugares grandes.',
    descMapa: 'Un mapa antiguo con marcas misteriosas de sitios arqueológicos.',
    descFragmentoMapa: 'Un pedazo de mapa antiguo. Parece mostrar la ubicación de otras cuevas.',
    descArtefactoTaino: 'Un cemí dorado. Debe ser llevado al museo para su estudio.',
    descMagnetometro: 'Detecta objetos metálicos enterrados bajo la tierra.'
  },

  inventario: {
    titulo: 'Inventario',
    vacio: 'Tu mochila está vacía',
    lleno: 'Mochila llena',
    usar: '[E] Usar',
    cerrar: '[I] o [Q] Cerrar',
    slots: 'slots'
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
