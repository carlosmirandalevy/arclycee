// Traducciones al español — idioma principal del juego
// Cada sección agrupa textos por contexto de uso para facilitar mantenimiento

const es = {
  menu: {
    titulo: 'ArcLycée',
    nuevoJuego: 'Nuevo Juego',
    continuarJuego: 'Continuar Juego',
    opciones: 'Opciones',
    idioma: 'Idioma',
    creditos: 'Créditos',
    mapaReal: 'Mapa Real',
    documentacion: 'Documentación',
    controlesTactiles: 'Controles táctiles',
    joystick: 'Joystick',
    cruceta: 'Cruceta',
    descJoystick: 'Stick analógico — arrastra para moverte',
    descCruceta: 'Botones de dirección clásicos',
    opcionesVolver: 'Presiona Q / Escape para volver'
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
    oxigeno: 'O₂',
    inventario: 'Inventario',
    guardar: 'Guardar',
    mapa: 'Mapa',
    misiones: 'Misiones',
    opciones: 'Opciones',
    muerteFrases: [
      'Se hizo lo que se pudo, bye...',
      "Livin' la vida loca, no more!",
      'Houston, we have a problem...',
      'Game over, man!',
      'GG no re',
      'F en el chat...',
      'Wasted.',
      '¡Mamá, ven a buscarme!',
      'Error 404: vida no encontrada',
      'Respawneando con dignidad...'
    ]
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
      arqueologoGuanin: '¡Fascinante! Nunca se ha hallado un cemí completamente dorado, pero los taínos adornaban sus cemíes con guanín — una aleación de oro, plata y cobre — especialmente en los ojos y los órganos sensoriales.',
      arqueologoRegalo: 'Toma, necesitarás esto allá afuera. Es Magnoboot, un robot excavador que te ayudará.',
      arqueologoDespedida: 'Cuida el patrimonio. Cada pieza que encuentres pertenece al pueblo dominicano.',

      misionExplorar: 'Explora la cueva y encuentra los petroglifos',
      misionSalir: 'Busca la salida de la cueva',
      misionArtefacto: 'Lleva el artefacto a la salida',
      caida: '¡Caíste al vacío! Vuelves al último punto seguro.'
    },

    // Diálogos de la aldea taína — enseñan sobre la vida cotidiana
    aldea: {
      cacique1: '¡Bienvenido/a a nuestro yucayeque, joven viajero/a!',
      cacique2: 'Soy Guacanagaríx, cacique de esta aldea. Mi pueblo ha vivido aquí por generaciones.',
      cacique3: 'Un yucayeque es nuestra aldea — con bohíos para las familias y el caney donde vivo yo.',
      cacique4: 'Habla con los aldeanos. Cada uno tiene mucho que enseñarte sobre nuestra forma de vida.',

      alfarera1: '¡Hola! Estoy haciendo una vasija de barro para cocinar.',
      alfarera2: 'Los taínos éramos grandes alfareros. Nuestras vasijas se decoraban con caras y figuras.',
      alfarera3: 'Con el barro hacíamos ollas, platos y burenes — el burén es para tostar el casabe.',
      alfarera4: 'El casabe se hace con yuca rallada y prensada. ¡Es el pan de nuestro pueblo!',
      alfarerVasija: 'Toma esta vasija con pulpa de higüero, savia de maguey y tuna. ¡Es nuestra medicina natural!',
      alfareraSaludo: '¡Sigue creando arte con la arcilla de nuestra tierra!',

      pescador1: '¡Buenos días! Hoy la pesca ha sido buena en el río.',
      pescador2: 'Los taínos pescábamos con redes de algodón, nasas de mimbre y anzuelos de hueso.',
      pescador3: 'También hacíamos canoas talladas en un solo tronco de ceiba.',
      pescador4: '¡Algunas canoas podían llevar hasta 50 personas entre las islas del Caribe!',

      perro1: '¡Un perro callejero! Parece amigable... tiene hambre y te mira con ojos suplicantes.',
      perro2: 'El perro mueve la cola y se acerca despacio. ¡Parece que quiere acompañarte!',
      perro3: '¡Decidido! Lo llamarás Viralata. Su nariz puede oler objetos escondidos. ¡Ahora te acompaña!',

      misionHablar: 'Habla con los 3 aldeanos de la aldea',
      misionCompleta: '¡Aldea explorada! Vuelve al mapa (M)'
    },

    // Diálogos del Palenque de Lemba — comunidad cimarrona
    montana: {
      nombreLugar: '⛰️ Palenque de Lemba',
      lembaNombre: 'Sebastián Lemba',
      herreroNombre: 'Kofi',
      tamboraNombre: 'Amara',
      curanderaNombre: 'Yemayá',
      vigiaNombre: 'Marcos',
      // Lemba — mentor rotativo (5 temas)
      lemba1: 'Soy Sebastián Lemba. Escapé de las cadenas y fundé este palenque en las montañas.',
      lemba2: 'En los años 1540, lideramos la primera rebelión de esclavizados en las Américas.',
      lemba3: 'Los cimarrones vivimos libres. Estas montañas son nuestro refugio y nuestra fortaleza.',
      lemba4: 'Trajimos nuestra cultura africana — nuestros ritmos, nuestra medicina, nuestra forja.',
      lemba5: 'Las comunidades cimarronas dejaron una huella profunda en la cultura dominicana de hoy.',
      // Kofi — herrero
      herrero1: 'Soy Kofi, herrero de este palenque. Forjo herramientas con el arte de mis ancestros de África occidental.',
      herrero2: 'En mi tierra, los herreros éramos respetados como guardianes del fuego sagrado.',
      herrero3: 'Con este machete defendemos nuestra libertad. Tómalo — te servirá en tu camino.',
      herreroSaludo: '¡El fuego de la forja nunca se apaga, como nuestra lucha por la libertad!',
      // Amara — tamborera
      tambora1: '¡Bienvenido al círculo de tambores! Soy Amara.',
      tambora2: 'Los tambores son nuestra voz. Con ellos transmitimos mensajes, celebramos y recordamos.',
      tambora3: 'Los palos y atabales que se tocan hoy en la República Dominicana vienen de nuestras tradiciones africanas.',
      tambora4: 'Este tambor de guerra nos protege. Llévalo contigo — su ritmo te dará fuerza.',
      tamboraSaludo: '¡Los tambores siguen sonando — la libertad nunca se calla!',
      // Yemayá — curandera
      curandera1: 'Soy Yemayá, curandera del palenque. Mi nombre honra a la diosa yoruba del mar.',
      curandera2: 'Mezclamos la medicina africana con las plantas que aprendimos de los taínos.',
      curandera3: 'La guanábana, el jengibre, la sábila — esta isla tiene todo lo que necesitamos para sanar.',
      curandera4: 'Déjame curarte con mis remedios. ¡Quedarás como nuevo!',
      curanderaCurar: '¡Listo! Las hierbas sagradas te han sanado.',
      curanderaSano: 'Te veo bien de salud. ¡Que la fuerza de los ancestros te proteja!',
      // Marcos — vigía
      vigia1: '¡Alto! Soy Marcos, el vigía del palenque.',
      vigia2: '¡Cuidado! Veo un cazador de cimarrones acercándose por el sendero.',
      vigia3: '¡Prepárate para defender nuestra libertad!',
      vigilaPaz: 'El soldado entendió que no puede encadenar a quien nació libre.',
      vigiaVictoria: 'El cazador ha huido. ¡Nuestra montaña sigue siendo libre!',
      enemigoCazador: 'Cazador de Cimarrones',
      // Misión
      misionHablar: 'Explora el palenque y habla con los cimarrones',
      misionCompleta: '¡Palenque explorado! Vuelve al mapa (M)',
    },

    // Diálogos del Lago Enriquillo — rebelión indígena
    enriquillo: {
      nombreLugar: '🐊 Lago Enriquillo — El lago más grande del Caribe',
      enriquilloNombre: 'Cacique Enriquillo',
      menciaNombre: 'Mencía',
      tamayoNombre: 'Tamayo',
      mordidaCocodrilo: '¡Mordida de cocodrilo!',
      // Enriquillo — rotativo (6 pares)
      enriquillo1: 'Soy Guarocuya, pero los españoles me bautizaron Enriquillo.',
      enriquillo2: 'Me criaron los frailes franciscanos. Aprendí a leer, a escribir y las leyes de Castilla.',
      enriquillo3: 'Los españoles nos quitaron todo. Nuestras tierras, nuestra libertad, nuestra dignidad.',
      enriquillo4: 'Cuando el encomendero Valenzuela me humilló y golpeó a mi esposa Mencía, dije: ¡basta!',
      enriquillo5: 'Mencía es mi fuerza. Nos conocimos en el convento — ella también fue educada por los frailes.',
      enriquillo6: 'Nuestro amor nació entre libros y oraciones, pero se forjó en la resistencia. Juntos escapamos a las montañas del Bahoruco.',
      enriquillo7: 'Mencía no solo es mi esposa — es una líder. Organiza la comunidad, cuida a los heridos y mantiene viva la esperanza.',
      enriquillo8: 'Dicen que un hombre solo puede cambiar el mundo, pero sin Mencía, yo no habría cambiado nada.',
      enriquillo9: 'Llevamos 13 años resistiendo (1519-1533). Los españoles enviaron ejércitos, pero las montañas nos protegen.',
      enriquillo10: 'Al final, Carlos V firmó un tratado de paz reconociendo nuestra libertad. ¡La primera victoria indígena de las Américas!',
      enriquillo11: 'Este lago lleva mi nombre. Pero la verdadera victoria no fue mía — fue de todos los que lucharon.',
      enriquillo12: 'La resistencia no siempre es violencia. A veces es sobrevivir, mantener tu cultura y nunca rendirte.',
      // Entrega del ídolo
      enriquilloRecibe1: '¿Un cemí sagrado de Anacaona? ¡Esto es un regalo invaluable!',
      enriquilloRecibe2: 'Los cemíes nos conectan con nuestros ancestros y los espíritus de la tierra.',
      enriquilloRecibe3: 'Con este poder espiritual, nuestra lucha se fortalece. Gracias, joven guerrero.',
      reputacionIdolo: 'Ídolo entregado a Enriquillo',
      // Mencía
      mencia1: 'Soy Mencía. Los frailes me educaron junto a Guarocuya — así nos conocimos.',
      mencia2: 'Cuando Valenzuela me atacó, Guarocuya juró que nunca más nos someteríamos.',
      mencia3: 'Aquí en las montañas somos libres. Cuido a nuestra gente y les enseño a leer.',
      mencia4: 'El amor no es solo sentimiento — es acción. Luchamos juntos cada día por un futuro digno.',
      menciaSaludo: 'Mientras haya montañas, habrá libertad. Y mientras haya amor, habrá esperanza.',
      // Tamayo
      tamayo1: 'Soy Tamayo, guerrero y aliado de Enriquillo.',
      tamayo2: 'Conozco cada sendero de estas montañas. Los españoles se pierden, pero nosotros somos parte de la tierra.',
      tamayo3: 'Nuestra estrategia es simple: conocer el terreno, moverse rápido y nunca pelear donde ellos quieren.',
      tamayoSaludo: '¡Las montañas del Bahoruco son invencibles!',
      // Las Caritas — petroglifos del acantilado norte
      caritas1: '¡Petroglifos tallados en la roca caliza! Son "Las Caritas" — rostros esculpidos por los taínos.',
      caritas2: 'Estas caras tienen entre 500 y 1,000 años. Representan espíritus, ancestros y divinidades.',
      caritas3: 'Los taínos tallaban petroglifos en cuevas y acantilados. Estos del Lago Enriquillo son de los más accesibles.',
      caritas4: 'Cada rostro tiene una expresión diferente: sonrisas, sorpresa, seriedad. ¿Qué querrían comunicar?',
      caritasRepite: 'Los rostros tallados en la roca te observan con expresiones milenarias. Cada uno es único.',
      // Misión
      datoGeografico: '40m bajo el nivel del mar — aguas hipersalinas, 3× más saladas que el mar',
      cocodriloInfo: 'Cocodrilo Americano (Crocodylus acutus) — la mayor población del Caribe vive en este lago',
      culebraInfo: 'Culebra Corredora (Haitiophis anomalus) — la serpiente más larga de las Antillas, hasta 2m. La mayor colúbrida de las Américas.',
      iguanaRinoceronteInfo: 'Iguana Rinoceronte (Cyclura cornuta) — reconocible por sus cuernos en el hocico. Endémica de la Hispaniola.',
      iguanaRicordInfo: 'Iguana de Ricord (Cyclura ricordii) — ojos rojos distintivos. Una de las iguanas más amenazadas del mundo.',
      cucuInfo1: 'Cucú (Athene cunicularia) — búho diurno que vive en madrigueras en el suelo',
      cucuInfo2: '¡No excavan! Usan madrigueras abandonadas de otros animales. Son búhos que "piden prestado". 😄',
      guarizacca: 'Isla Cabritos — Guarizacca en lengua taína',
      enriquillo13: 'Joven guerrero... deberías volver a esta isla más adelante en tu viaje.',
      enriquillo14: 'Siento espíritus antiguos de cemíes en esta tierra. Y temo que uno podría despertar.',
      enriquillo15: 'Si encuentras una espada ceremonial y un lugar de poder... prepárate. No todos los espíritus son benévolos.',
      yaBendecido: 'Ya posees la Bendición Divina. El espíritu te reconoce como aliado.',
      bendicionRecibida: 'Bendición Divina: +30 vida max, +5 fuerza, +20% velocidad',
      misionEntregar: 'Lleva el cemí a Enriquillo en la Isla Cabritos',
      misionExplorar: 'Explora el Lago Enriquillo',
      misionCompleta: '¡Ídolo entregado! Habla con Enriquillo para aprender más.',
    },

    // Anacaona — sidequest del ídolo de Enriquillo (en aldea1)
    anacaonaIdolo: {
      anacaonaIdolo1: 'Tengo algo importante que pedirte.',
      anacaonaIdolo2: 'He tallado un cemí sagrado. Necesito que se lo lleves a Enriquillo, en el Lago Enriquillo.',
      anacaonaIdolo3: 'Enriquillo lucha contra los españoles en las montañas del Bahoruco. Este cemí le dará fuerza espiritual.',
      anacaonaIdolo4: 'El lago está al suroeste de la isla. Cuidado con los cocodrilos — la Isla Cabritos está en el centro del lago.',
    },

    // Diálogos de la segunda aldea — agricultura, medicina y ceremonias
    aldea2: {
      behique1: 'Soy Yuisa, el behique — curandero y guía espiritual de esta aldea.',
      behique2: 'Las plantas de esta isla tienen grandes poderes curativos que los dioses nos enseñaron.',
      behique3: 'El tabaco lo usamos en la ceremonia de la cohoba, para comunicarnos con los cemíes.',
      behique4: 'La guayaba cura la fiebre, la jagua protege la piel y la sábila sana las heridas.',
      behiqueCurar: 'Déjame prepararte un remedio con hierbas sagradas. ¡Quedarás como nuevo!',
      behiqueCuroToast: 'El behique te ha curado',
      behiqueSano: 'Te veo bien de salud. ¡Que los cemíes te protejan en tu viaje!',

      agricultor1: '¡Mira nuestros conucos! Cada montículo de tierra es un jardín de comida.',
      agricultor2: 'Los conucos son montículos donde plantamos. Así la tierra drena mejor y las raíces crecen fuertes.',
      agricultor3: 'Cultivamos yuca, maíz, batata, ají picante y tabaco — todo lo que necesitamos para vivir.',
      agricultor4: 'La yuca es lo más importante. Con ella hacemos el casabe, que es nuestro pan de cada día.',
      agricultorGuanabana: 'Toma estas hojas y semillas de guanábana. ¡Son muy medicinales para el camino!',
      agricultorSaludo: '¡Los conucos están dando buena cosecha hoy!',

      musico1: '¡Bienvenido/a al batey, el corazón de nuestra aldea!',
      musico2: 'Aquí celebramos el areíto — nuestra gran ceremonia de música, danza y memoria.',
      musico3: 'Tocamos maracas de higüero, güiros de calabaza y tambores tallados en troncos de ceiba.',
      musico4: 'En el areíto cantamos la historia de nuestro pueblo — así los jóvenes nunca olvidan de dónde vienen.',

      behiqueCemi: '¡El espíritu del Cemí Murciélago te ha elegido! Él te guiará en las cuevas con su eco-localización.',

      // Batú — diálogos de Higüemota para el mini-juego
      batuOferta1: '¿Quieres jugar batú? Es nuestro juego de pelota sagrado.',
      batuOferta2: 'Se golpea con la cadera, los hombros y la cabeza. ¡Nunca con las manos!',
      batuAceptar: '¡Sí, vamos a jugar!',
      batuRechazar: 'Ahora no, quizás después.',
      batuOfertaRepite: '¿Listo para el batú? ¡El batey te espera!',
      batuPendiente: '🏐 Misión pendiente: Batú',
      batuReputacion: 'Batú completado',
      batuVictoria: '¡Impresionante! Juegas como un verdadero taíno.',
      batuDerrota: '¡Buen intento! El batú requiere mucha práctica.',
      batuRepite: '¡Fue un gran partido! El batú une a las aldeas y resuelve conflictos sin violencia.',
      batuRevancha: '¡Fue un gran partido! ¿Quieres jugar otra vez?',

      misionHablar: 'Habla con los 3 aldeanos de la aldea',
      misionCompleta: '¡Aldea explorada! Vuelve al mapa (M)'
    },

    // La Isabela — primer asentamiento europeo en América (1494)
    isabela: {
      soldado1: '¡Alto! ¡Esta zona está prohibida por orden del Virrey!',
      soldado2: '¡Nadie puede entrar a las ruinas sin permiso de la Corona!',
      soldadoPaz1: 'Tienes razón... estas ruinas deben ser protegidas, no prohibidas.',
      soldadoPaz2: 'La Isabela fue fundada en 1494. Es la primera ciudad europea en América.',

      cronista1: 'Soy Fray Ramón Pané, el primer cronista de las Indias.',
      cronista2: 'Escribo sobre las costumbres de los taínos para que no se pierdan.',
      cronista3: 'Mi obra se llama "Relación acerca de las antigüedades de los indios".',
      cronista4: 'Es el primer libro escrito en América. Proteger la historia es mi deber.',

      taino1: 'Soy Guatiguaná. Mi pueblo fue de los primeros en resistir a los invasores.',
      taino2: 'Los españoles nos obligaron a buscar oro. Muchos murieron de trabajo forzado.',
      taino3: 'Pero nuestra cultura no murió. Vive en las palabras: hamaca, canoa, tabaco, maíz.',
      taino4: 'Cada vez que dices "huracán" o comes casabe, los taínos seguimos vivos.',

      // Roberto Cassá — historiador dominicano
      cassa1: 'Soy Roberto Cassá, historiador. Estudio los orígenes de nuestra nación.',
      cassaSinArcabuz: 'Busco artefactos coloniales de La Isabela. Si encuentras algo, tráemelo — tengo algo valioso que ofrecerte a cambio.',
      cassaVeArcabuz: '¡Un arcabuz colonial! Estos se usaban en La Isabela desde 1494. Es una pieza invaluable.',
      cassaIntercambio: 'Te propongo un intercambio: dame el arcabuz para el museo, y yo te doy mi mapa de sitios coloniales.',
      cassaEntrega: '¡Trato hecho! Con este mapa podrás visitar la Zona Colonial de Santo Domingo y otros sitios históricos.',
      cassaRepite: 'Usa el mapa colonial para visitar los sitios históricos. ¡Hay mucho por descubrir!',

      misionHablar: 'Explora las ruinas de La Isabela',
      misionCompleta: '¡La Isabela explorada! Vuelve al mapa (M)'
    },

    // Zona Colonial de Santo Domingo — Patrimonio de la Humanidad (UNESCO)
    zonaColonial: {
      constructor1: '¡Fuera de aquí, mocoso! ¡Estas piedras viejas van a caer para hacer espacio a mi hotel!',
      constructor2: '¡Nadie va a impedirme construir! ¡Estos escombros no valen nada!',
      constructorPaz1: 'Espera... ¿Patrimonio de la Humanidad? No tenía idea.',
      constructorPaz2: 'Voy a reunir a mi equipo e inversionistas y traer historiadores para rediseñar el proyecto.',
      constructorPaz3: 'Un hotel que proteja y destaque estas ruinas... será más caro, pero le dará un valor único.',
      constructorPaz4: 'Incluso podría ser más rentable. Y además... es lo correcto.',
      constructorDerrota1: 'Está bien, está bien... me hiciste pensar.',
      constructorDerrota2: 'Hablaré con los inversionistas. Quizás podamos construir algo que respete la historia.',
      // Artefacto del Museo de la Catedral
      artefactoAparece: '¡Algo brilla entre los escombros!',
      constructorArtefacto1: 'Encontramos eso excavando los cimientos. Parece muy antiguo...',
      constructorArtefacto2: 'Llévalo al Museo de la Catedral. Fabiola Herrera sabrá qué hacer con él.',
      fabiolaRecibe1: '¿Un artefacto de la excavación? ¡Déjame ver!',
      fabiolaRecibe2: '¡Es una pieza religiosa del siglo XVI! Un sagrario de plata con grabados originales.',
      fabiolaRecibe3: 'Vamos a crear una vitrina especial con una placa para la empresa constructora.',
      fabiolaRecibe4: 'Cuando patrimonio y construcción colaboran, todos ganamos. ¡Gracias!',
      fabiolaPostEntrega: '¡La nueva vitrina es un éxito! Los visitantes no paran de fotografiarla.',
      fabiolaPostEntrega2: 'La empresa constructora está orgullosa de su placa. ¡Y el holograma del artefacto es espectacular!',
      constructorRepite: 'Ya hablé con los inversionistas. Vamos a rediseñar el hotel para proteger las ruinas. ¡Será único!',

      arqueologa1: 'Soy la Dra. Pérez, arqueóloga del Museo del Hombre Dominicano.',
      arqueologa2: 'La Zona Colonial tiene más de 500 años. Cada piedra cuenta una historia.',
      arqueologa3: 'Hay tesoros enterrados bajo estas calles. Tu robot podría ayudar a encontrarlos.',
      arqueologa4: 'Presiona F para que Magnoboot escanee el suelo. Si detecta algo, podrás excavarlo con E.',

      guia1: '¡Bienvenido a la Zona Colonial! Soy Don Rafael, guía certificado.',
      guia2: 'La Catedral Primada fue la primera de América. ¡Se empezó a construir en 1512!',
      guia3: 'El Hospital San Nicolás de Bari fue el primer hospital del Nuevo Mundo, fundado en 1503.',
      guia4: 'Y la Calle de las Damas es la primera calle empedrada de América. ¡Caminas sobre historia!',

      estudiante1: '¡Hola! Soy María, estudio arquitectura en la UASD.',
      estudiante2: 'Estoy investigando las técnicas de construcción colonial. ¡Usaban coral fosilizado como material!',
      estudiante3: 'El Monasterio San Francisco fue el primero de América. Hoy sus ruinas son un escenario de conciertos.',
      estudiante4: 'El Panteón Nacional era una iglesia jesuita. Ahora guarda los restos de nuestros héroes nacionales.',

      // Fabiola Herrera — Directora del Voluntariado, Museo de la Catedral
      fabiola1: '¡Bienvenido al Museo de la Catedral! Soy Fabiola Herrera, directora del voluntariado.',
      fabiola2: 'Este museo está en la antigua Real Cárcel de Santo Domingo. La restauramos para preservar siglos de historia y fe.',
      fabiola3: 'Tenemos 15 salas con tesoros del siglo XVI al XX: el portapaz de Colón, cruces pectorales, el Águila Bicéfala, el Coro Bajo de la Catedral...',
      fabiola4: 'Yo soy matemática, trabajé proyectos de tecnología toda mi vida, pero un día descubrí que mi verdadera misión era transformar este sueño en realidad.',
      fabiola5: 'Un museo no es solo un espacio de exhibición. Es un viaje que transporta al visitante a un pasado lleno de arte y devoción.',
      fabiola6: 'Cada objeto aquí cuenta una historia. La Piedra Pentagonal, las esculturas restauradas con su pátina original... ¡todo habla!',

      // Roberto Cassá — conversaciones rotativas (mentor recurrente)
      cassaZC1: '¡Volvemos a encontrarnos! Vine a investigar la Zona Colonial.',
      cassaZC2: 'Este lugar tiene más de 500 años de historia. Cada esquina esconde un secreto.',

      cassaConflicto1: '¿Viste al constructor? Pasa mucho: empresarios que quieren demoler para construir.',
      cassaConflicto2: 'Pero la historia no se puede reemplazar. Un hotel nuevo se construye en meses... estas piedras tardaron siglos.',
      cassaConflicto3: 'Lo mejor es cuando logran integrarse: modernidad y patrimonio conviviendo. Todos ganan.',

      cassaDatos1: '¿Sabías que la Catedral Primada tiene los restos que se atribuyen a Cristóbal Colón?',
      cassaDatos2: 'El Hospital San Nicolás de Bari atendía a españoles e indígenas por igual. Fue revolucionario para su época.',
      cassaDatos3: 'Y la Calle de las Damas se llama así porque las damas de la corte de María de Toledo paseaban por ella.',

      cassaPatrimonio1: 'La UNESCO declaró esta zona Patrimonio de la Humanidad en 1990.',
      cassaPatrimonio2: 'Eso significa que pertenece a todos los pueblos del mundo, no solo a nosotros.',
      cassaPatrimonio3: 'Proteger el patrimonio no es solo conservar piedras — es mantener viva la memoria de quiénes somos.',

      cassaCalle1: '¿Ves esta calle? Es la Calle de las Damas — la primera calle empedrada de América.',
      cassaCalle2: 'Fue trazada por orden de Nicolás de Ovando en 1502. Por aquí pasaban los gobernadores y sus familias.',
      cassaCalle3: 'Se dice que las damas de la corte de María de Toledo paseaban aquí cada tarde. De ahí su nombre.',

      cassaReloj1: '¿Has visto el Reloj de Sol? Es uno de los más antiguos de América.',
      cassaReloj2: 'Fue construido en el siglo XVI para que los vecinos de la ciudad pudieran medir el tiempo.',
      cassaReloj3: 'Antes de los relojes mecánicos, el sol era el único reloj. Esta columna proyectaba su sombra sobre las marcas horarias.',

      cassaPista1: 'Has aprendido mucho sobre los taínos y los colonizadores...',
      cassaPista2: 'Pero hay un mundo que aún no has explorado: el mar que rodea nuestra isla.',
      cassaPista3: 'Los océanos guardan tesoros y peligros. Ballenas, tortugas, arrecifes... y amenazas que debemos enfrentar.',
      cassaPista4: 'Cuando estés listo, el Mundo Acuático te espera. ¡Buena suerte, joven arqueólogo!',

      // Combo pista → Mundo Acuático (el texto final que adelanta el siguiente mundo)
      // Esto aparece cuando Cassá habla de los océanos

      // Guardias del Panteón Nacional — Primer Regimiento de la Guardia Presidencial
      guardia1: 'Los guardias no pueden hablar mientras montan guardia. Es parte del protocolo militar.',
      guardia2: 'Son miembros del Primer Regimiento Dominicano de la Guardia Presidencial.',
      guardia3: 'Custodian la entrada del Panteón Nacional, donde reposan los restos de los héroes de la patria.',
      guardia4: 'Cada cierto tiempo realizan el cambio de guardia: una ceremonia solemne donde dos guardias relevan a los anteriores.',
      guardia5: 'Dentro del Panteón arde una llama que nunca se apaga — símbolo eterno del sacrificio de los padres de la nación.',

      // Combate con Constructor Méndez — opciones de activismo ciudadano
      combatePista: 'Usa activismo ciudadano para convencer al Constructor',
      accionRedes: 'Redes Sociales',
      accionRedesMsg: '¡Publicas fotos de las ruinas amenazadas en redes!',
      respuestaRedes: 'Méndez paga influencers para promover su hotel.',
      accionProtestas: 'Protestas',
      accionProtestasMsg: '¡Organizas una manifestación frente a la obra!',
      respuestaProtestas: 'Méndez patrocina un teteo y conciertos para la comunidad.',
      accionDenuncia: 'Denunciar',
      accionDenunciaMsg: '¡Denuncias la demolición ante las autoridades!',
      respuestaDenuncia: 'Méndez negocia permisos y excepciones con políticos.',
      accionLegal: 'Vía Legal',
      accionLegalMsg: '¡Presentas un recurso legal para detener la obra!',
      respuestaLegal: 'Méndez usa maniobras legales para dilatar mientras sigue construyendo.',

      misionExplorar: 'Explora la Zona Colonial',
      misionCompleta: '¡Zona Colonial explorada! Vuelve al mapa (M)'
    },

    // Mundo Acuático — Naufragio de la Santa María
    // Un pescador lleva a Pepito a explorar los restos submarinos
    // de la Santa María, donde aprende sobre fauna marina y especies invasoras
    acuatico: {
      // Pescador Manuel — introduce la historia del naufragio
      pescador1: '¡Bienvenido al fondo del mar, muchacho! Soy Manuel, pescador de Montecristi.',
      pescador2: 'Aquí abajo están los restos de la Santa María, la nave capitana de Colón.',
      pescador3: 'La Santa María encalló en un arrecife la Nochebuena de 1492. Con sus maderos construyeron el Fuerte Navidad.',
      pescador4: '¡Cuidado con las medusas! Su picadura duele y te hace nadar más lento.',

      // Tortuga carey — educación sobre especies en peligro
      tortuga1: 'Soy una tortuga carey. Mi especie lleva 100 millones de años nadando en estos mares.',
      tortuga2: 'Estamos en peligro crítico de extinción. Nos cazan por nuestro caparazón, que usan para joyería.',
      tortuga3: 'Los arrecifes de coral son nuestro hogar. Si el coral muere, nosotros también.',
      tortuga4: 'Las tortugas carey comemos esponjas marinas que son tóxicas para otros animales. ¡Somos las guardianas del arrecife!',

      // Tortuga tinglar (Dermochelys coriacea) — la más grande del mundo
      tinglar1: 'Soy una tortuga tinglar, la más grande del mundo. Puedo pesar hasta 700 kg.',
      tinglar2: 'Mi caparazón no tiene escamas duras como las otras tortugas — es coriáceo, como cuero.',
      tinglar3: 'Como casi solo medusas. Puedo comer 200 kg al día. ¡Las bolsas de plástico me confunden porque parecen medusas!',
      tinglar4: 'Puedo bucear a más de 1,000 metros de profundidad. Soy el reptil que más profundo se sumerge en el mundo.',

      // Tortuga caguama (Caretta caretta) — cabeza grande y mandíbulas poderosas
      caguama1: 'Soy una tortuga caguama. Tengo la cabeza más grande de todas las tortugas marinas.',
      caguama2: 'Mis mandíbulas son tan poderosas que puedo triturar cangrejos, erizos y caracoles.',
      caguama3: 'Las luces artificiales en las playas confunden a nuestras crías. Caminan hacia la luz en vez del mar.',
      caguama4: 'Las redes de pesca nos atrapan por accidente. La pesca responsable y los dispositivos de escape salvan vidas.',

      // Arqueóloga submarina — da el mapa de naufragios
      arqueologa1: 'Soy arqueóloga submarina. Estudio los naufragios del Caribe dominicano.',
      arqueologa2: 'Hay más de 400 naufragios registrados en las costas de esta isla.',
      arqueologa3: 'Cada naufragio es una cápsula del tiempo. Los clavos, cerámicas y monedas nos cuentan la historia.',
      arqueologa4: 'Toma este mapa de naufragios. Te ayudará a encontrar otros sitios submarinos.',
      arqueologaRepite: 'Usa el mapa de naufragios para encontrar más restos submarinos. ¡El mar Caribe esconde muchos secretos!',
      arqueologaRobot1: '¡Un robot submarino! ¿Lo programaron en el LFSD? ¡Impresionante!',
      arqueologaRobot2: 'Con este robot podré explorar zonas que son demasiado profundas o peligrosas para buzos.',
      arqueologaRobot3: '¡Mira! El robot ya encontró señales de 4 naufragios que no teníamos registrados.',
      arqueologaRobot4: 'He añadido los nuevos descubrimientos a tu mapa de naufragios. ¡La tecnología y la arqueología hacen un gran equipo!',
      arqueologaPostRobot: 'El robot sigue escaneando el fondo marino. Cada día encuentra algo nuevo. ¡Gracias por traerlo!',

      // Pez león — especie invasora (combate)
      pezLeonIntro1: '¡Un pez león! Esta especie invasora del Indo-Pacífico está destruyendo los arrecifes del Caribe.',
      pezLeonIntro2: 'Come hasta 30 especies nativas y no tiene depredadores naturales aquí. ¡Hay que actuar!',
      pezLeonPaz1: 'La pesca controlada mantendrá el equilibrio del arrecife.',
      pezLeonPaz2: '¿Sabías que la carne de pez león es deliciosa y nutritiva? ¡Cocinarme es ecológico!',
      pezLeonDerrota: 'El pez león se retira... pero volverán más si no se controla la invasión.',

      // Opciones de combate ecológico contra el pez león
      combatePista: 'Usa acciones ecológicas para controlar al invasor',
      etiquetaControl: 'Controlado:',
      accionAtrapar: 'Atrapar',
      accionAtraparMsg: '¡Intentas atrapar al pez león con una red para llevarlo al acuario!',
      respuestaAtrapar: 'El pez león eriza sus espinas venenosas. ¡Cuidado con la picadura!',
      accionPescar: 'Pescar',
      accionPescarMsg: '¡Preparas el arpón! El pez león es comestible y pescarlo ayuda al arrecife.',
      respuestaPescar: '¡Se reproduce rápidamente! Mientras pescas uno, aparecen más juveniles.',
      accionProteger: 'Proteger Coral',
      accionProtegerMsg: '¡Colocas barreras para proteger el coral y los peces herbívoros!',
      respuestaProteger: 'El pez león devora peces herbívoros. Sin ellos, las algas invaden el coral.',
      accionAlertar: 'Alertar Buzos',
      accionAlertarMsg: '¡Alertas a otros buzos para organizar una jornada de remoción!',
      respuestaAlertar: 'El pez león caza peces loro jóvenes. ¡Sin ellos el coral no se limpiará!',

      // Medusa
      medusaPicadura: '🪼 ¡Picadura de medusa! Movimiento reducido',

      // Misión
      cantoBallenaCerca: '🐋 ¡Escuchas el canto de una ballena jorobada a lo lejos!',

      misionExplorar: 'Explora el naufragio de la Santa María',
      misionCompleta: '¡Naufragio explorado! Vuelve al mapa (M)',

      // Transición al santuario
      transicionSantuario1: '🤿 Dejamos los tanques de oxígeno y el equipo de buceo.',
      transicionSantuario2: '🫁 Nadamos a pulmón con snorkel entre los corales, sin tocarlos ni perturbar la vida local...'
    },

    // Santuario del Manatí — sub-nivel marino con acciones ecológicas
    // Dos acciones ecológicas: liberar manatí atrapado + limpiar arrecife
    santuario: {
      // Bióloga Marina — guía del santuario, explica la Ley 64-00
      biologa1: '¡Bienvenida al Santuario del Manatí! Soy la Dra. Sofía, bióloga marina.',
      biologa2: 'Los manatíes antillanos están en peligro de extinción. Quedan menos de 2,500 en todo el Caribe.',
      biologa3: 'La Ley 64-00 protege la biodiversidad dominicana. Dañar a un manatí es un delito ambiental.',
      biologa4: 'Los manatíes quedan atrapados por accidente en redes de pesca abandonadas — las llamamos "redes fantasma".',
      biologa5: 'Para liberarlos sin hacerles daño, hay que cortar la red con cuidado, sin tocar al animal. Un manatí asustado puede agitarse y lastimarse más.',
      biologa6: '¡Hay un manatí adulto atrapado ahora mismo! Ve a la red fantasma al este y usa [E] para cortarla. ¡Rápido, pero con calma!',

      // Tortuga Verde — conciencia sobre contaminación marina
      tortugaVerde1: 'Soy una tortuga verde. A diferencia de la carey, como algas y pastos marinos.',
      tortugaVerde2: 'La basura en el mar nos mata. Confundimos bolsas de plástico con medusas y las comemos.',
      tortugaVerde3: 'Mira todos esos desechos atrapados en el arrecife. ¡Están asfixiando al coral!',
      tortugaVerde4: 'Si recoges los desechos, el arrecife podrá respirar y recuperarse. ¡Cada acción cuenta!',

      // Manatí Bebé — vínculo emocional, lleva al jugador hacia la madre
      manatiBebe1: '¡El manatí bebé llora suavemente! Su madre está atrapada en la red más adelante.',
      manatiBebe2: 'Te mira con ojos grandes y nada hacia el este, guiándote...',

      // Acciones ecológicas
      liberarManati: '¡Manatí liberado! La madre y su cría nadan juntas de nuevo.',
      necesitasBiologa: 'Necesitas hablar con la bióloga primero para saber cómo liberar al manatí.',
      recogerDesecho: 'Desecho recogido',
      limpiezaCompleta: '¡Arrecife limpiado! Los corales podrán recuperarse sin basura.',
      necesitasTortuga: 'Habla con la tortuga verde para entender por qué la limpieza es importante.',

      // Objetivos del HUD
      objHablar: 'Hablar con habitantes',
      objManati: 'Liberar al manatí',
      objArrecife: 'Limpiar arrecife',

      // Misión
      misionExplorar: 'Explora el Santuario del Manatí',
      misionCompleta: '¡Santuario protegido! Vuelve al mapa (M)',

      // Peligros
      tiburonAlerta: '🦈 ¡Tiburón cerca! ¡Aléjate!',
      zonaHelice: '⚠ ¡Zona de hélices! ¡Peligro!',
      golpeLancha: '💥 ¡Una lancha te golpeó! ¡Aléjate de la superficie!',
      oxigenoBajo: '🫁 ¡Oxígeno bajo! ¡Sube a la superficie para respirar!',

      // Objeto coleccionable
      dienteDescripcion: 'Diente fósil de tiburón megalodón. Prueba de que estos gigantes nadaron aquí hace millones de años.',

      cantoBallenaCerca: '🐋 ¡Una ballena jorobada canta cerca! Migran aquí cada invierno desde el Atlántico Norte.',

      // Robot submarino — entrega del robot programado en LFSD
      biologaRobot1: '¡El robot submarino del LFSD! ¡Increíble, lo lograron!',
      biologaRobot2: 'Con esto podré explorar las zonas más profundas del santuario y los arrecifes cercanos.',
      biologaRobot3: '¡Mira! El robot ya detectó señales de 4 naufragios que no teníamos registrados.',
      biologaRobot4: 'He añadido los descubrimientos a tu mapa de naufragios. ¡La tecnología y la biología marina hacen un gran equipo!',
      biologaPostRobot: 'El robot sigue escaneando el fondo marino. Cada día encuentra algo nuevo. ¡Gracias por traerlo!',

      // Transición de vuelta al naufragio
      transicionNaufragio1: '🫧 Recogemos los tanques de oxígeno y el equipo de buceo.',
      transicionNaufragio2: '🤿 Nos sumergimos en las aguas profundas en busca de los restos del naufragio...'
    },

    // Mundo Jurídico — Aeropuerto de Punta Cana (Acto 4)
    // El jugador usa leyes de protección patrimonial para detener
    // una red de tráfico de artefactos arqueológicos
    juridico: {
      // Dra. Martínez — conecta con el Mundo Acuático
      draMartinez1: '¡Te estaba esperando! El mapa de naufragios reveló algo inquietante.',
      draMartinez2: 'Alguien está sacando artefactos arqueológicos del país a través de este aeropuerto.',
      draMartinez3: 'Necesitamos evidencia sólida. Habla con la Agente de Aduanas y el Inspector de INTERPOL.',
      draMartinez4: 'La Licenciada Carmen Vidal te asesorará sobre las leyes de protección patrimonial.',
      draMartinezRepite: 'Habla con la Agente Montero en aduanas. Ella puede darte los registros.',
      draMartinezPostCombate: '¡Lo lograste! Los artefactos serán devueltos al Museo del Hombre Dominicano.',

      // Agente Rosa Montero — enseña la Ley 318
      agente1: 'Soy la Agente Rosa Montero, de Aduanas. He detectado movimientos sospechosos.',
      agente2: 'La Ley 318-68 prohíbe sacar del país cualquier bien del patrimonio cultural dominicano.',
      agente3: 'Las multas van desde 500 hasta 10,000 salarios mínimos, más prisión de 2 a 10 años.',
      agente4: 'He preparado un registro aduanal con las anomalías. Búscalo cerca de la máquina de rayos X.',
      agenteRepite: 'El registro aduanal está cerca de la máquina de rayos X. Recógelo como evidencia.',
      agentePostCombate: 'Este caso sentará un precedente. La Ley 318 se aplica con todo su peso.',

      // Inspector Ramírez — cooperación internacional
      inspector1: 'Inspector Ramírez, INTERPOL. Estamos rastreando una red de tráfico de antigüedades.',
      inspector2: 'INTERPOL tiene una base de datos de obras de arte robadas con más de 52,000 registros.',
      inspector3: 'La cooperación entre países es clave. Un artefacto robado en RD puede aparecer en una subasta en Europa.',
      inspector4: 'Con tu evidencia y la Ley 318, podemos activar una alerta internacional contra Torres.',
      inspectorRepite: 'Reúne toda la evidencia posible antes de confrontar al sospechoso.',
      inspectorPostCombate: 'INTERPOL ya emitió la alerta. Este traficante no escapará de la justicia internacional.',

      // Lcda. Carmen Vidal — mentora legal (5 conversaciones rotativas)
      carmen1_1: 'Soy la Licenciada Carmen Vidal, especialista en derecho patrimonial.',
      carmen1_2: 'La Ley 318-68 declara patrimonio nacional todo objeto arqueológico encontrado en suelo dominicano.',
      carmen1_3: 'Nadie puede exportar, vender ni destruir bienes patrimoniales sin autorización del Estado.',
      carmen2_1: 'La Convención UNESCO de 1970 es el marco internacional contra el tráfico de bienes culturales.',
      carmen2_2: 'Más de 140 países la ratificaron. Obliga a devolver bienes culturales robados a su país de origen.',
      carmen3_1: 'Para denunciar tráfico de patrimonio, se presenta una denuncia ante el Ministerio de Cultura.',
      carmen3_2: 'También puedes ir a la Procuraduría General. Ellos activan la cadena judicial.',
      carmen4_1: 'El Ministerio de Cultura custodia el patrimonio nacional a través de la Dirección de Patrimonio Monumental.',
      carmen4_2: 'Ellos mantienen el registro de bienes culturales y autorizan — o niegan — cualquier exportación.',
      carmen5_1: 'En 2014, RD recuperó artefactos taínos que habían sido vendidos ilegalmente a coleccionistas europeos.',
      carmen5_2: 'Gracias a INTERPOL y la Ley 318, las piezas volvieron al Museo del Hombre Dominicano.',

      // Traficante Rodrigo Torres
      traficante1: '¿Qué quieres, muchacho? Estoy esperando mi vuelo.',
      traficante2: '¿Artefactos? No sé de qué hablas. Esta maleta tiene... souvenirs.',
      traficantePaz1: 'La evidencia es abrumadora. Torres se rinde ante las autoridades.',
      traficantePaz2: 'Los artefactos serán devueltos al Museo del Hombre Dominicano.',
      traficanteDerrota: 'Torres es detenido. El caso pasa a los tribunales.',
      traficantePostCombate: 'Me atraparon... pero esto es más grande que yo. Hay toda una red.',

      // Arresto cinematográfico — Inspector y Agente escoltan a Torres
      arrestoInspector1: 'Rodrigo Torres, queda usted detenido por tráfico ilícito de bienes culturales.',
      arrestoAgente1: 'Tiene derecho a un abogado. Todo lo que diga será usado en su contra.',
      arrestoTorres1: '¡No pueden hacerme esto! ¡Tengo contactos!',
      arrestoInspector2: 'Sus contactos no le servirán. INTERPOL ya notificó a todas las aduanas del Caribe.',
      arrestoAgente2: 'Llévenselo. Los artefactos quedan confiscados como evidencia.',
      inspectorPostArresto: 'Torres está bajo custodia. INTERPOL investigará toda su red de contactos.',

      // Opciones de combate legal
      etiquetaEvidencia: 'Evidencia:',
      combatePista: 'Usa las leyes y la evidencia para construir un caso legal',
      accionLey318: 'Ley 318',
      accionLey318Msg: '¡Citas la Ley 318-68 de Patrimonio Cultural!',
      respuestaLey318: 'Torres muestra permisos de exportación falsificados.',
      accionForense: 'Evidencia',
      accionForenseMsg: '¡Presentas la evidencia forense de autenticidad!',
      respuestaForense: 'Torres alega que son réplicas artesanales.',
      accionInterpol: 'INTERPOL',
      accionInterpolMsg: '¡Activas la alerta internacional de INTERPOL!',
      respuestaInterpol: 'Torres amenaza con huir a otra jurisdicción.',
      accionUnesco: 'UNESCO 1970',
      accionUnescoMsg: '¡Invocas la Convención UNESCO de 1970!',
      respuestaUnesco: 'Torres intenta sobornar para que lo dejen ir.',

      // Misión
      misionExplorar: 'Investiga el tráfico de artefactos',
      misionCompleta: '¡Caso resuelto! Vuelve al mapa (M)'
    },

    // Mundo Laboratorio — Museo de las Atarazanas Reales (Acto 5)
    // El jugador aprende sobre autenticación, restauración y museología
    laboratorio: {
      morban1: 'Bienvenido al Museo de las Atarazanas Reales. Soy el Dr. Fernando Morbán, director.',
      morban2: 'Este museo conserva los tesoros rescatados de los naufragios del Caribe.',
      morban3: 'Cada artefacto que llega debe ser autenticado. Sin autenticación, no tiene valor histórico.',
      morban4: 'Habla con la Dra. López en el laboratorio y con Ana en restauración. Ellas te enseñarán el proceso.',
      morbanRepite: 'Visita el laboratorio C-14 y el taller de restauración. La ciencia protege la historia.',
      morbanPostEntrega: 'La Dra. López está muy contenta con el equipo reparado. Se nota que los jóvenes del LFSD saben lo que hacen.',
      morbanPostDescubrimiento: '¡El descubrimiento de la Dra. López ha puesto al museo en el mapa internacional! Y tú eres parte de eso.',

      lopez1: 'Soy la Dra. López, especialista en datación por Carbono-14.',
      lopez2: 'El Carbono-14 es un átomo radiactivo que todos los seres vivos absorben. Cuando mueren, empieza a descomponerse.',
      lopez3: 'Midiendo cuánto C-14 queda en un objeto orgánico, calculamos su antigüedad con precisión.',
      lopez4: '¡Así confirmamos si un artefacto tiene 500 años o si es una falsificación moderna!',
      lopezRepite: 'Recuerda: la datación C-14 funciona con materiales orgánicos — madera, hueso, tela.',
      lopezEsperaEquipo: '¿Escuché que repararon el equipo en el LFSD? ¡Tráemelo cuando puedas, tengo muchas muestras pendientes!',
      lopezRecibeEquipo1: '¡El equipo de análisis! ¿Los estudiantes del LFSD lo repararon? ¡Increíble!',
      lopezRecibeEquipo2: 'Llevaba semanas sin poder hacer dataciones precisas. Esto cambia todo.',
      lopezRecibeEquipo3: 'Voy a recalibrar el espectrómetro y empezar a analizar las muestras pendientes.',
      lopezRecibeEquipo4: '¡Gracias! Vuelve pronto — tengo el presentimiento de que este equipo nos dará sorpresas.',
      lopezDescubrimiento1: '¡No vas a creer esto! El equipo reparado detectó algo extraordinario.',
      lopezDescubrimiento2: 'Encontramos trazas de guanín auténtico en un artefacto que creíamos era una réplica.',
      lopezDescubrimiento3: '¡Es una pieza taína original de hace más de 500 años! Esto cambia lo que sabíamos del sitio.',
      lopezDescubrimiento4: 'Voy a publicar los resultados. ¡Los estudiantes del LFSD y tú serán co-autores del hallazgo!',
      lopezPeriodico1: '¡Mira! ¡Salimos en el periódico! Tú y los estudiantes del LFSD son mencionados.',
      lopezPeriodico2: 'El artículo habla del descubrimiento y cómo la colaboración entre jóvenes y científicos hizo posible todo esto.',
      lopezPeriodico3: 'Toma, quédate con un ejemplar. ¡Te lo mereces!',
      lopezPostPeriodico: '¡El artículo ha generado interés internacional! Ya hay 3 universidades que quieren colaborar con nosotros.',
      repEntregaEquipo: 'Equipo entregado a la Dra. López',
      repDescubrimiento: 'Descubrimiento científico',

      ana1: 'Soy Ana, restauradora de artefactos. Mi trabajo es reparar sin alterar.',
      ana2: 'La regla de oro de la restauración: todo lo que hagas debe ser reversible.',
      ana3: 'Usamos adhesivos especiales, consolidantes y microscopios para no dañar la pieza original.',
      ana4: 'Un artefacto mal restaurado pierde su valor histórico para siempre. ¡La paciencia es clave!',
      anaRepite: 'Restaurar es como ser doctor de artefactos: primero, no hacer daño.',
      anaPostEntrega: 'He oído que trajiste el equipo reparado. ¡La Dra. López no para de hablar de las pruebas que va a hacer!',
      anaPostDescubrimiento: '¡El artefacto que descubrió la Dra. López necesita restauración! Es la pieza más emocionante que he visto en años.',

      cassa1_1: '¡Nos encontramos de nuevo! Este museo es uno de mis lugares favoritos.',
      cassa1_2: 'Las Atarazanas Reales eran los almacenes del puerto de Santo Domingo en el siglo XVI.',
      cassa2_1: '¿Sabías que este edificio fue restaurado en los años 70?',
      cassa2_2: 'La restauración respetó la estructura original. Así debería hacerse siempre.',
      cassa3_1: 'Los museos no son almacenes de objetos viejos. Son lugares vivos.',
      cassa3_2: 'Cada pieza aquí cuenta una historia que conecta el pasado con el presente.',
      cassa4_1: 'La República Dominicana tiene más de 60 museos.',
      cassa4_2: 'Desde el Museo del Hombre Dominicano hasta el Memorial de la Resistencia.',
      cassa5_1: 'Has recorrido un largo camino, joven arqueólogo.',
      cassa5_2: 'Desde las cuevas del Pomier hasta este museo, has aprendido a proteger el patrimonio.',

      sospechoso1: '¡Psst! ¿Quieres comprar una reliquia taína auténtica? Precio especial.',
      sospechoso2: '¿Me estás diciendo que necesita un certificado? Pero si la encontré en mi patio...',
      sospechoso3: 'Tienes razón. Sin autenticación científica, cualquiera puede vender falsificaciones.',
      sospechoso4: 'Mejor la llevo al museo para que la examinen. ¡Gracias por el consejo!',
      sospechosoRepite: 'Estoy esperando los resultados del laboratorio. ¡Ojalá sea auténtica!',

      misionExplorar: 'Explora el Museo de las Atarazanas Reales',
      misionCompleta: '¡Museo explorado! Presiona M para ver el final',
      misionFinal: '¡Misión completa! Presiona M para ver el final',

      // Weird Science — misión completada en el laboratorio
      misionWSCompleta: 'Weird Science — Completada',
      misionWSCompletaDesc: 'El equipo reparado permitió un descubrimiento científico. ¡Saliste en el periódico!'
    },

    // Finales — 5 posibles secuencias de cierre
    finales: {
      completo: {
        linea1: 'Has dominado cada rincón de esta isla: los mundos, las misiones, los desafíos.',
        linea2: 'Calibraste el magnetómetro, programaste el robot, reparaste el equipo, jugaste batú y salvaste al manatí.',
        linea3: 'Desde las cuevas del Pomier hasta el LFSD, dejaste huella en cada lugar.',
        linea4: 'Los artefactos están en los museos, los arrecifes se recuperan, y la justicia llegó.',
        linea5: 'Eres la leyenda de Quisqueya. 100% completado.'
      },
      pacifista: {
        linea1: 'Has completado todos los desafíos con sabiduría y paz.',
        linea2: 'Desde las cuevas del Pomier hasta el Museo de las Atarazanas, protegiste el patrimonio dominicano.',
        linea3: 'Los artefactos están seguros en los museos. Los traficantes, ante la justicia.',
        linea4: 'El pez león está bajo control. Los arrecifes se recuperan.',
        linea5: 'Eres un verdadero guardián del patrimonio. La historia te recordará.'
      },
      museo: {
        linea1: 'Los artefactos recuperados brillan bajo las luces del museo.',
        linea2: 'El Dr. Morbán inaugura la nueva sala de exhibición con tus descubrimientos.',
        linea3: 'Desde los petroglifos taínos hasta los tesoros coloniales, cada pieza cuenta una historia.',
        linea4: 'Los visitantes aprenden sobre la rica historia de la República Dominicana.',
        linea5: 'El patrimonio está protegido. Tu misión ha terminado... por ahora.'
      },
      ecologico: {
        linea1: 'El mar Caribe brilla con colores renovados.',
        linea2: 'Gracias a tus acciones ecológicas, los arrecifes de coral se están recuperando.',
        linea3: 'Las tortugas carey nadan libres. Los peces nativos regresan.',
        linea4: 'Tu ejemplo inspiró a comunidades enteras a proteger el medio ambiente marino.',
        linea5: 'La naturaleza y la historia van de la mano. Proteger una es proteger la otra.'
      },
      oscuro: {
        linea1: 'Los artefactos llegaron al museo, pero no todos intactos.',
        linea2: 'La violencia dejó marcas. Algunas piezas se dañaron en los enfrentamientos.',
        linea3: 'El constructor Méndez sigue buscando maneras de demoler las ruinas.',
        linea4: 'Los traficantes escaparon hacia otras rutas. La red sigue activa.',
        linea5: 'El patrimonio merece ser protegido con inteligencia, no con fuerza.'
      }
    }
  },

  // Batú — juego de pelota taíno (mini-juego)
  // Boss fight del Espíritu del Cemí (bullet hell en Isla Cabritos)
  bossCemi: {
    titulo: 'Espíritu del Cemí',
    intro1: 'El cemí brilla con una luz sobrenatural...',
    intro2: 'Una presencia antigua despierta. Tu conciencia se traslada a otro plano.',
    intro3: '¡Esquiva los orbes y sobrevive hasta que el espíritu se debilite!',
    continuar: '[E] Comenzar',
    ciclo: 'Ciclo',
    aturdido: '¡El espíritu está aturdido!',
    atacar: '[E] Atacar con la Espada de Enriquillo',
    victoria: 'Has dominado al espíritu del cemí.',
    victoriaDialogo1: '¡¿Cómo te ATREVES a despertarme de mi sueño eterno?!',
    victoriaDialogo2: 'Pero... debo admitir que esta gloriosa batalla ha sido lo más divertido que he tenido en siglos.',
    victoriaDialogo3: 'Así que he decidido bendecirte, hijo mío.',
    victoriaDialogo4: 'Pero no me hagas enfadar de nuevo... o sentirás todo el poder de mi ira.',
    bendicion: '✨ Recibes la Bendición Divina ✨',
    bendicionDetalle: '+30 vida máxima | +5 fuerza | +20% velocidad',
    derrota: 'La visión se desvanece... despiertas frente al pedestal.',
    controles: 'WASD/Flechas: esquivar | E: atacar (cuando aturdido)',
  },

  batu: {
    titulo: 'BATÚ',
    tituloIntro: '¡Juego de Batú!',
    introDisputa1: 'Dos aldeas discuten por un territorio de pesca.',
    introDisputa2: 'Los caciques han decidido resolver la disputa con un juego de batú.',
    introDisputa3: '¡El ganador se queda con los derechos de pesca!',
    introCeremonia1: '¡Es día de areíto! La aldea celebra con música y juegos.',
    introCeremonia2: 'Higüemota te reta a un partido amistoso de batú.',
    introCeremonia3: '¡Demuestra tu habilidad en el batey!',
    reglas: 'Reglas: golpea la pelota con cadera, hombros o cabeza. ¡Sin manos ni pies!',
    reglas2: 'Primero en 5 puntos gana. La pelota no puede tocar el suelo de tu lado.',
    continuar: '[E] Continuar',
    controles: '← → mover | Golpea con el cuerpo (cadera, hombro, cabeza, rodilla)',
    saqueJugador: '¡Tu saque!',
    saqueRival: '¡Saque de Guarocuya!',
    puntoJugador: '¡Tu punto!',
    puntoRival: '¡Punto para Guarocuya!',
    sabiasQue: '¿Sabías que...?',
    victoria: '¡Victoria!',
    derrota: '¡Derrota!',
    victoriaDisputa: '¡Tu aldea gana los derechos de pesca! El batú resolvió el conflicto sin violencia.',
    derrotaDisputa: 'La otra aldea gana. Pero el batú evitó un conflicto violento.',
    victoriaCeremonia: '¡Gran partido! Higüemota te felicita. El areíto continúa con más fuerza.',
    derrotaCeremonia: 'Higüemota gana esta vez. ¡Pero lo importante es la celebración!',
    datoFisica: 'La pelota del batú se hacía con látex del árbol de cupey. Era muy elástica y del tamaño de una softball.',
    datoCancha: 'Los bateyes (canchas) tenían petroglifos tallados en las piedras de los bordes. Eran lugares sagrados.',
    datoYugo: 'El yugo era un cinturón de piedra o madera que se usaba para golpear la pelota con la cadera.',
    datoCeremonia: 'El batú se jugaba durante las fiestas de areíto, junto con música, danza y comida.',
    datoDisputa: 'El batú servía para resolver disputas entre aldeas sin recurrir a la guerra. Diplomacia deportiva taína.',
    datoArqueologia: 'Se han encontrado bateyes en Chacuey y La Aleta (RD), y en Tibes y Caguana (Puerto Rico).'
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
    navaja: 'Navaja Suiza Arqueológica',
    brujula: 'Brújula',
    mapa: 'Mapa Antiguo',
    magnetometro: 'Magnetómetro',
    fragmentoMapa: 'Fragmento de Mapa',
    artefactoTaino: 'Artefacto Taíno',

    descLinterna: 'Ilumina la oscuridad de las cuevas. Aumenta tu radio de visión.',
    descNavaja: 'Herramienta polivalente diseñada por Diana e impresa en 3D. Incluye cepillo, espátula, lupa y regla de escala.',
    descBrujula: 'Señala el norte. Te ayuda a no perderte en lugares grandes.',
    descMapa: 'Un mapa antiguo con marcas misteriosas de sitios arqueológicos.',
    descFragmentoMapa: 'Un pedazo de mapa antiguo. Parece mostrar la ubicación de otras cuevas.',
    descArtefactoTaino: 'Un cemí con detalles dorados. Debe ser llevado al museo para su estudio.',
    idoloCemi: 'Ídolo Cemí Sagrado',
    descIdoloCemi: 'Cemí tallado por Anacaona. Llévalo a Enriquillo en el Lago Enriquillo.',
    espadaEnriquillo: 'Espada de Enriquillo',
    descEspadaEnriquillo: 'Espada ceremonial del cacique. Necesaria para enfrentar al espíritu del cemí.',
    macheteCimarron: 'Machete Cimarrón',
    descMacheteCimarron: 'Machete forjado por cimarrones africanos. +2 daño en combate.',
    tamborGuerra: 'Tambor de Guerra',
    descTamborGuerra: 'Tambor africano de guerra. Su ritmo inspira coraje. +2 daño en combate.',
    pergaminoLibertad: 'Pergamino de Libertad',
    descPergaminoLibertad: 'Documento que proclama la libertad de los cimarrones del palenque de Lemba.',
    artefactoCatedral: 'Artefacto del Museo de la Catedral',
    descArtefactoCatedral: 'Pieza religiosa del siglo XVI descubierta durante una excavación. Fabiola Herrera la espera.',
    cucharaLegendaria: 'La Cuchara Legendaria',
    descCucharaLegendaria: 'Una cuchara mística forjada en el Pomier. Aumenta el radio de detección de objetos ocultos. También es excelente para rascarse la espalda. 😄',
    descMagnetometro: 'Detecta objetos metálicos enterrados bajo la tierra.',

    arcabuz: 'Arcabuz Colonial',
    descArcabuz: 'Arma de fuego del siglo XV usada por los conquistadores. Pieza de museo.',
    mapaColonial: 'Mapa Colonial',
    descMapaColonial: 'Mapa con los sitios coloniales más importantes de la isla. Regalo de Roberto Cassá.',

    planoColonial: 'Plano Arquitectónico',
    descPlanoColonial: 'Plano original de la Catedral Primada de América. Documento histórico invaluable.',
    monedaColonial: 'Moneda de la Corona',
    descMonedaColonial: 'Moneda española del siglo XVI encontrada bajo las calles de la Zona Colonial.',
    azulejoAntiguo: 'Azulejo Colonial',
    descAzulejoAntiguo: 'Azulejo de cerámica decorada del periodo colonial. Técnica traída de España.',
    llaveHierro: 'Llave de Hierro',
    descLlaveHierro: 'Llave colonial de hierro forjado. Podría abrir alguna puerta antigua.',

    clavoBronce: 'Clavo de Bronce',
    descClavoBronce: 'Clavo de bronce del casco de la Santa María. Resistía la corrosión del agua salada.',
    mapaNaufragios: 'Mapa de Naufragios',
    descMapaNaufragios: 'Mapa con la ubicación de naufragios en el Caribe dominicano. Regalo de la arqueóloga submarina.',

    registroAduanal: 'Registro Aduanal',
    descRegistroAduanal: 'Documento oficial de aduanas con las anomalías detectadas en los envíos de Torres.',
    ordenJudicial: 'Orden Judicial',
    descOrdenJudicial: 'Orden del tribunal que autoriza la confiscación de los artefactos traficados.',

    certificadoAutenticidad: 'Certificado de Autenticidad',
    descCertificadoAutenticidad: 'Documento oficial que certifica la autenticidad de un artefacto arqueológico.',
    catalogoMuseo: 'Catálogo del Museo',
    descCatalogoMuseo: 'Catálogo con todos los artefactos del Museo de las Atarazanas Reales.',

    dienteTiburon: 'Diente de Tiburón Fósil',
    descDienteTiburon: 'Diente fósil de tiburón megalodón. Prueba de que estos gigantes nadaron aquí hace millones de años.',

    periodico: 'Artículo de Periódico',
    descPeriodico: 'Artículo sobre el descubrimiento arqueológico logrado con el equipo reparado en el LFSD. ¡Tú y los estudiantes son co-autores!',

    robotSubmarino: 'Robot Submarino',
    descRobotSubmarino: 'Robot submarino programado en el LFSD. Llévalo a la Dra. Sofía en el Santuario del Manatí.',

    equipoAnalisis: 'Equipo de Análisis',
    descEquipoAnalisis: 'Equipo de análisis reparado en el LFSD. Llévalo a la Dra. López en el Museo de las Atarazanas Reales.',

    casabe: 'Casabe',
    descCasabe: 'Pan taíno hecho de yuca rallada y tostada. Restaura 25 de vida.',
    hierbasCurativas: 'Hierbas Curativas',
    descHierbasCurativas: 'Plantas medicinales del behique. Restauran 30 de vida.',
    guanabana: 'Hojas de Guanábana',
    descGuanabana: 'Hojas y semillas medicinales de guanábana. Restauran 30 de vida.',
    vasijaCurativa: 'Vasija Curativa',
    descVasijaCurativa: 'Vasija con pulpa de higüero, savia de maguey y tuna. Restaura 35 de vida.'
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
  },

  // LFSD — Diálogos del aula del Liceo Francés de Santo Domingo
  // Tres estudiantes dan misiones relacionadas con robótica y arqueología
  lfsd: {
    // Leonardo — experto en electrónica (camisa azul)
    emile1: '¡Hola! Soy Leonardo, del club de robótica "les fous du robot". Trabajo con sensores electromagnéticos.',
    emile2: 'Estoy calibrando un magnetómetro para detectar artefactos metálicos bajo tierra. Los campos electromagnéticos son fascinantes.',
    emile3: 'El magnetómetro mide variaciones en el campo magnético de la Tierra. Cualquier objeto metálico altera ese campo.',
    emile4: '¿Quieres intentar calibrarlo? Hay que ajustar la frecuencia, la amplitud y la fase para que coincida con la onda de referencia.',

    // Leonardo — diálogos extra (flavor, pares a/b se muestran en secuencia)
    emile5a: '¿Conoces nuestro club? ¡Somos "les fous du robot"! Construimos robots para exploración arqueológica.',
    emile5b: 'Usamos Arduino, sensores ultrasónicos y hasta cámaras infrarrojas. ¡La tecnología al servicio de la historia!',
    emile6a: 'En el LFSD aprendemos en tres idiomas: español, francés e inglés. ¡Eso nos ayuda a colaborar con equipos internacionales!',
    emile6b: 'Vamos a presentar nuestro proyecto en una feria de ciencias. ¡Será increíble!',

    // Diana — programadora y diseñadora (camisa verde)
    sofiaNombre: 'Sofia',
    sofia1: '¡Hola! Soy Sofia. Me encanta el diseño 3D y la impresión.',
    sofia2: 'Diseñé una cuchara arqueológica en Tinkercad. ¡Es mi primer proyecto de impresión 3D!',
    sofia3: 'Lo que más me gusta del club es combinar ciencia con historia.',
    sofia4: 'Cada robot que construimos tiene un propósito: proteger el patrimonio.',

    // Sofia — diálogos extra (flavor)
    sofia5a: 'En el LFSD aprendemos en tres idiomas. Eso nos ayuda a colaborar con equipos internacionales.',
    sofia5b: 'Vamos a presentar nuestro proyecto en una feria de ciencias. ¡Será increíble!',
    sofia6a: 'La tecnología puede ayudar a la arqueología de maneras increíbles.',
    sofia6b: '¡Algún día quiero ser ingeniera y proteger el patrimonio con robots!',

    // Hugo — mecánico (camisa naranja)
    lucas1: '¡Hey! Soy Hugo, el mecánico del equipo. Me encargo del mantenimiento del equipo de análisis.',
    lucas2: 'El equipo de análisis tiene un circuito de conexiones que se dañó. Los cables de colores se desconectaron.',
    lucas3: 'Cada cable tiene que conectarse con su par del mismo color. Si te equivocas, ¡salta una chispa!',
    lucas4: '¿Me ayudas a repararlo? Es como un rompecabezas eléctrico. Tienes que conectar los pares correctos.',

    // Hugo — diálogos extra (flavor, pares a/b se muestran en secuencia)
    lucas5a: '¿Sabías que los taínos eran excelentes ingenieros? Sus canoas podían llevar 50 personas.',
    lucas5b: 'Nosotros seguimos esa tradición de innovación. Solo que ahora usamos circuitos en vez de troncos de ceiba.',

    // Theo Jules — fan de Sonic, velocidad y papas fritas
    theo1: '¡Sonic X Shadow Generations es el MEJOR juego que existe! Shadow usando Chaos Control es lo máximo.',
    theo2: 'En los juegos siempre elijo al personaje más rápido. La velocidad es todo. ¡Como Sonic!',
    theo3: 'Me encantan los movimientos de Sonic: el spin dash, el homing attack, el boost... ¡perfección!',
    theo4: '¿Quieres unas papas fritas? Siempre tengo una bolsa por aquí. Son mi combustible para programar.',
    theo5: 'Un buen juego necesita lore, backstory, un universo profundo. Sin eso, es solo un jueguito.',
    theo6: 'Usamos Arduino y sensores ultrasónicos. ¡La tecnología al servicio de la historia!',
    theo7: 'Shadow es el mejor personaje de Sonic. Es rápido, es oscuro, tiene historia. Sonic es cool pero Shadow es ÉPICO.',
    theo8: 'Si nuestro robot pudiera moverse a la velocidad de Sonic, ya habríamos explorado todas las cuevas del país.',

    // Tea — fan de One Piece, Blue Lock, Roblox, hamburguesas de Wendy's
    nael1: '¿Juegas Roblox? Tengo como 500 horas. ¡Hay de todo ahí!',
    nael2: 'Las hamburguesas de Wendy\'s son superiores. El Baconator es una obra de arte culinaria.',
    nael3: 'En One Piece, Luffy nunca se rinde. ¡Gear Fifth es lo más épico que he visto en mi vida!',
    nael4: 'Blue Lock es INCREÍBLE. Isagi calculando ángulos de tiro es básicamente lo que hacemos con el robot pero con fútbol.',
    nael5: '¡Je, je! Acabo de esconder la mochila de Tom. No te digo dónde. *risa malvada*',
    nael6: 'Mi hermano dice que lo molesto mucho. Yo digo que es entrenamiento de combate. ¡Es por su bien!',
    nael7: 'Diseñamos robots submarinos. ¡Hay mucho patrimonio sumergido esperando ser descubierto!',
    nael8: 'Zoro de One Piece se pierde más que nuestro robot cuando le falla el GPS. Y eso es mucho decir.',

    // Jules — fan de Star Wars, Assassin's Creed, dinosaurios, surf, guitarra
    jules1: 'Assassin\'s Creed me hizo amar la historia. Las zonas restringidas del juego son lo mejor: si entras, los NPC sospechan.',
    jules2: '¡Star Wars! Lightsabers, la Fuerza, los Sith... Si pudiera ser un Jedi Y un arqueólogo, sería perfecto.',
    jules3: '¿Sabías que los dinosaurios vivieron en esta isla? Bueno, no aquí exactamente, pero en la Hispaniola se han encontrado fósiles.',
    jules4: 'Después del club voy a surfear. Las olas de Cabarete son perfectas para aprender. ¡Nada como el mar Caribe!',
    jules5: 'Toco guitarra desde los 8 años. A veces le pongo música a nuestras presentaciones del club.',
    jules6: 'En Assassin\'s Creed eres un asesino que protege la historia. Nosotros somos robots que protegen el patrimonio. ¡Misma energía!',
    jules7: 'El T-Rex tenía brazos pequeños, pero el Velociraptor tenía garras letales. Como nuestra pinza robótica pero más... mortal.',
    jules8: 'Combinar ciencia con historia no es solo programar por programar. Cada robot tiene un propósito.',

    // Rafael — fan de Core Keeper, Minecraft, Brawl Stars, pasta, guitarra, side quests
    rafael1: 'En Minecraft construí una réplica de la Zona Colonial. ¡Con cada detalle! Me tomó tres meses.',
    rafael2: '¿Lo mejor de cualquier juego? Las side quests. Apartarse de la historia principal y descubrir secretos ocultos.',
    rafael3: 'Toco guitarra y me gusta la música épica. Cuando programo, pongo soundtracks de videojuegos. ¡Ayuda a concentrarse!',
    rafael4: 'Core Keeper es adictivo. Excavar, construir, explorar... ¡Es como arqueología pero en pixeles!',
    rafael5: 'Pizza y pasta son lo mejor que existe. Si pudiera comer pasta mientras programo, lo haría. De hecho... *mira su plato*',
    rafael6: 'En Brawl Stars, mi main es León. Invisible y letal. Como un arqueólogo: observar sin ser visto.',
    rafael7: 'El año pasado presentamos nuestro proyecto en una feria de ciencias en París. ¡Fue increíble!',
    rafael8: 'Los mejores juegos son los que te dejan explorar libremente. Las side quests son donde está la verdadera aventura.',

    // Alberto — fan de Terraria, Core Keeper, sushi, bromista
    alberto1: 'Terraria tiene más de 5,000 ítems. ¡CINCO MIL! Y yo los quiero todos. Soy coleccionista obsesivo.',
    alberto2: '¿Probaste el sushi de salmón? Es mi comida favorita. Eso y los pancakes con sirope. ¡No juntos!',
    alberto3: 'Binding of Isaac es perturbador pero genial. Cada run es diferente. ¡Como cada excavación arqueológica!',
    alberto4: 'Je, je... le escondí el libro a Carlos Guillermo otra vez. ¡Es que siempre cae! Pero somos buenos amigos, eh.',
    alberto5: 'Core Keeper y Terraria son primos. Ambos tienen la misma filosofía: excavar, construir, sobrevivir.',
    alberto6: '¿Leer libros? Nah, prefiero leer código. Los libros no tienen bugs... bueno, algunos tienen erratas.',
    alberto7: 'Mew Genics va a ser INCREÍBLE cuando salga. Gatos mutantes + Edmund McMillen = perfección.',
    alberto8: 'A veces le escondo la lonchera a Carlos Guillermo también. ¡Pero siempre se la devuelvo! Somos un gran equipo y nos la pasamos increíble juntos.',

    // Carlos Guillermo — fan de Percy Jackson, Hollow Knight, Adventure Time, etc.
    carlosG1: 'Percy Jackson me enseñó que los mitos griegos son reales... bueno, casi. Pero la arqueología también descubre mitos que resultaron ser verdad.',
    carlosG2: '¿Conoces Hollow Knight? Hallownest es una civilización perdida bajo tierra. ¡Como las cuevas del Pomier! Silksong es aún mejor.',
    carlosG3: 'En Deltarune, Ralsei dice que las decisiones importan. En la arqueología también: cada pieza que proteges cambia la historia.',
    carlosG4: 'Gravity Falls es lo máximo. Dipper investigando misterios ocultos es básicamente lo que hacemos nosotros, pero con robots.',
    carlosG5: 'Adventure Time parece random, pero tiene la lore más profunda. La Guerra de los Hongos es post-apocalíptica. Finn vive en las ruinas de nuestra civilización.',
    carlosG6: 'Delicious in Dungeon me hizo pensar: ¿y si los arqueólogos cocinaran lo que encuentran? ...Mejor no. Pero Senshi es un genio.',
    carlosG7: 'Dan Da Dan mezcla aliens, fantasmas y romance. Es caótico y brillante. Okarun transformándose nunca deja de ser épico.',
    carlosG8: 'Annabeth Chase habría sido una arqueóloga increíble. Hija de Atenea, obsesionada con la arquitectura antigua... es prácticamente una de nosotros.',
    carlosG9: 'Spider-Man: Across the Spider-Verse tiene el estilo gráfico más increíble del cine. Cada frame es una obra de arte. ¡CADA FRAME!',
    carlosG10: 'Un buen personaje necesita definición completa: carácter, historia, motivaciones. Sin eso, es solo un sprite caminando.',
    carlosG11: 'Los boss fights son lo que define un juego. Si el boss no te hace sudar las manos, no está bien hecho.',
    carlosG12: 'Me encanta leer. Percy Jackson, Harry Potter, El Señor de los Anillos... los libros te llevan a mundos que los juegos no pueden.',
    carlosG13: '¿Shawarma de pollo o falafel? ¡Los dos! Son la comida perfecta para maratones de lectura.',
    carlosG14: 'Undertale demostró que puedes ganar sin pelear. La ruta pacifista es la más difícil y la más hermosa.',
    carlosG15: 'En Minecraft construyo mundos enteros. Ciudades, calabozos, templos... es como ser arquitecto y explorador al mismo tiempo.',
    carlosG16: 'Scott Pilgrim vs. the World es mi película favorita. ¡Derrotar a los 7 ex malvados para estar con la persona que amas! Edgar Wright es un genio.',
    carlosG17: 'El juego de Scott Pilgrim es un beat \'em up perfecto. River City Ransom + pixel art + Anamanaguchi. ¡Y ahora podemos jugarlo de nuevo!',

    // Elian — impresión 3D, Fortnite, Gatorade, aguacate con atún
    elian1: 'Estoy diseñando el chasis del robot con impresión 3D. ¡Es más liviano que el aluminio!',
    elian2: 'Un buen robot necesita buena estructura. Como los bohíos taínos: ingeniería simple pero eficaz.',
    elian3: '¡Necesito mi Gatorade! Programar da sed. ¿Azul o rojo? Azul, siempre azul.',
    elian4: 'En Fortnite mi técnica es esconderme en un arbusto hasta que queden pocos. ¡Estrategia pura!',
    elian5: '¿Probaste aguacate con atún y mayonesa? Suena raro pero es DELICIOSO. Confía en mí.',
    elian6: '*se rasca la espalda con una cuchara* ¿Qué? Es multiusos. También sirve para mezclar resina de impresión 3D.',
    elian7: 'Quiero ver opciones. Siempre hay que ver todas las opciones antes de decidir. En Fortnite y en la vida.',
    elian8: 'La impresora 3D es mi herramienta favorita. Puedo hacer cualquier pieza que necesitemos para el robot.',

    // Tom — Brawl Stars, pasta, bromas, IA, handball
    tom1: 'Yo manejo la comunicación Bluetooth entre el robot y la tablet de control.',
    tom2: 'Las señales inalámbricas bajo el agua son difíciles. ¡Por eso usamos cables para el submarino!',
    tom3: '¡Brawl Stars! Mi main es Shelly. Simple pero efectiva. Como un buen algoritmo.',
    tom4: 'La inteligencia artificial me fascina. ¿Y si le ponemos IA al robot para que tome decisiones solo?',
    tom5: 'La pasta con salsa boloñesa es la mejor comida del mundo. No acepto debate.',
    tom6: 'Juego handball en el equipo del LFSD. Es como programar: hay que calcular ángulos y anticipar movimientos.',
    tom7: '*mira a Tea* Je, je... Acabo de cambiarle el fondo de pantalla a su computadora. No le digas.',
    tom8: 'Algún día la IA va a poder analizar artefactos arqueológicos automáticamente. ¡Y nosotros seremos los primeros en usarla!',

    // Prof. Nicolas Droulers — profesor de robótica y líder del proyecto
    profesorNombre: 'Prof. Nicolas Droulers',
    profesor1: 'Bienvenido a la clase de robótica del Liceo Francés. Soy Nicolas Droulers, el profesor de este grupo.',
    profesor2: 'Estos estudiantes son "les fous du robot". Locos por los robots, pero también por la historia de este país.',
    profesor3: 'Yo tuve la idea de combinar robótica con arqueología. Un mapa, un videojuego, robots que exploran el patrimonio.',
    profesor4: 'Los chicos le dieron vida al proyecto. Diseñan, programan, resuelven problemas reales. Aprenden haciendo.',
    profesor5: 'La República Dominicana tiene un patrimonio arqueológico enorme y mucho por descubrir.',
    profesor6: 'Nuestro trabajo es conectar la ciencia con la cultura. Robótica al servicio de la historia.',
    profesor7: 'Conozco a cada uno de mis estudiantes. Cada uno aporta algo diferente: electrónica, programación, mecánica, diseño...',
    profesor8: 'Lo más importante no es el robot en sí, sino lo que aprenden construyéndolo juntos. Eso es lo que me hace más orgulloso.',
    profesor9: 'Este proyecto nació de una idea simple: ¿y si la tecnología pudiera ayudar a proteger el patrimonio?',
    profesor10: 'Cada chico aportó al proyecto y realizó distintos aspectos también. Todos investigaron mucho.',

    // Sub-misión: entregar robot submarino
    subMisionRobot: 'Entregar Robot Submarino',
    subMisionRobotDesc: 'Lleva el Robot Submarino a la Dra. Sofía en el Santuario del Manatí.',

    // Sub-misión: entregar equipo de análisis
    subMisionEquipo: 'Entregar Equipo de Análisis',
    subMisionEquipoDesc: 'Lleva el equipo reparado a la Dra. López en el Museo de las Atarazanas Reales.',
    equipoObtenido: '¡Equipo reparado! Llévalo a la Dra. López.',

    // Lucas — estados post mini-juego
    lucasCompleto: '¡El equipo funciona de nuevo! Ahora hay que llevárselo a la Dra. López en el museo.',
    lucasPostEntrega: '¡La Dra. López ya tiene el equipo! A ver qué descubre con eso.',
    lucasPostDescubrimiento: '¡Salimos en el periódico! El artículo dice que nuestro club ayudó a un descubrimiento científico.',
    lucasPostDescubrimiento2: 'Mi mamá lo recortó y lo pegó en la nevera. ¡Dice que soy famoso!'
  },

  // Registro de misiones — interfaz del diario de juego
  registro: {
    titulo: 'Registro de Misiones',
    principal: 'Historia Principal',
    secundaria: 'Misiones Secundarias',
    vacio: 'No hay misiones registradas',
    bloqueado: '???',
    nodos: {
      nodo0: { nombre: 'Cuevas del Pomier', desc: 'Explora las cuevas con petroglifos y pictografías taínas.' },
      nodo1: { nombre: 'Asentamiento Taíno I', desc: 'Descubre la vida cotidiana de una aldea taína.' },
      nodo2: { nombre: 'Asentamiento Taíno II', desc: 'Visita el batey y las ceremonias del cacicazgo.' },
      nodo3: { nombre: 'La Isabela', desc: 'Investiga las ruinas del segundo asentamiento europeo (1494).' },
      nodo4: { nombre: 'Zona Colonial', desc: 'Recorre la primera ciudad europea permanente de América.' },
      nodo5: { nombre: 'Naufragio Santa María', desc: 'Sumérgete para explorar los restos de la nave capitana de Colón.' },
      nodo6: { nombre: 'Aeropuerto Punta Cana', desc: 'Detén el tráfico ilegal de artefactos arqueológicos.' },
      nodo7: { nombre: 'Museo Atarazanas', desc: 'Analiza los artefactos recuperados en el museo.' },
      nodo8: { nombre: 'LFSD', desc: 'Completa misiones de robótica con les fous du robot.' }
    }
  },

  // Reputación — niveles de reconocimiento del jugador
  reputacion: {
    etiqueta: 'Reputación',
    desconocido: 'Desconocido',
    conocido: 'Conocido',
    respetado: 'Respetado',
    legendario: 'Legendario'
  },

  // Calibración — mini-juego "Good Vibrations" (magnetómetro)
  calibracion: {
    titulo: 'Good Vibrations',
    intro: 'Calibra el magnetómetro ajustando la onda para que coincida con la referencia. ¡Precisión es clave!',
    instrucciones: '↑↓ ajustar | ←→ cambiar dial | E confirmar',
    frecuencia: 'Frecuencia',
    amplitud: 'Amplitud',
    fase: 'Fase',
    exito: '¡Magnetómetro calibrado!',
    fallo: 'Calibración fallida. Inténtalo de nuevo.',
    tiempo: 'Tiempo'
  },

  // Programación — mini-juego "Full Metal Archeologist" (robot submarino)
  programacion: {
    titulo: 'Full Metal Archeologist',
    intro: 'Programa el robot submarino para que llegue al punto de escaneo. Cada comando cuenta.',
    instrucciones: '↑↓ seleccionar | E añadir | ← eliminar | Enter ejecutar',
    avanzar: 'Avanzar',
    girarIzq: 'Girar Izq',
    girarDer: 'Girar Der',
    escanear: 'Escanear',
    sumergir: 'Sumergir',
    ascender: 'Ascender',
    exito: '¡Robot llegó al objetivo!',
    fallo: 'Robot chocó. Inténtalo de nuevo.',
    ejecutando: 'Ejecutando...'
  },

  // Conexión — mini-juego "Weird Science" (reparar circuito)
  conexion: {
    titulo: 'Weird Science',
    intro: 'Conecta los cables del mismo color para reparar el equipo de análisis. ¡Cuidado con las chispas!',
    instrucciones: '↑↓ seleccionar | E conectar',
    exito: '¡Circuito completo!',
    fallo: '¡Se acabó el tiempo! Inténtalo de nuevo.',
    chispa: '¡Conexión incorrecta!'
  },

  // Misiones — títulos y descripciones de las sidequests
  misiones: {
    batuTitulo: 'Batú',
    batuDesc: 'Jugar un partido de batú contra Higüemota en el batey.',
    buenasVibracionesTitulo: 'Good Vibrations',
    buenasVibracionesDesc: 'Calibra el magnetómetro en la clase de robótica del LFSD.',
    metalCompletoTitulo: 'Full Metal Archeologist',
    metalCompletoDesc: 'Programa el robot submarino en el LFSD.',
    cienciaLocaTitulo: 'Weird Science',
    cienciaLocaDesc: 'Repara el equipo de análisis en el LFSD.',
    idoloEnriquilloTitulo: 'El Ídolo de Enriquillo',
    idoloEnriquilloDesc: 'Llevar el cemí sagrado a Enriquillo en el Lago Enriquillo.',
    idoloEnriquilloCompleta: '¡Misión completada: El Ídolo de Enriquillo!',
    museoCatedralTitulo: 'Museo de la Catedral',
    museoCatedralDesc: 'Llevar el artefacto religioso a Fabiola Herrera en el Museo de la Catedral.',
    museoCatedralCompleta: '¡Misión completada: Museo de la Catedral!',
    museoCatedralReputacion: 'Museo de la Catedral completado',
    rescateManatiTitulo: 'Rescate del manatí',
    rescateManatiDesc: 'Libera al manatí atrapado y limpia el arrecife en el Santuario.',
    rescateManatiReputacion: 'Manatí liberado',
    limpiezaReputacion: 'Arrecife limpiado',
    descubierta: '¡Misión descubierta!'
  },

  // Álbum de fotos — capturas del jugador durante la aventura
  album: {
    titulo: 'Álbum de Fotos',
    fotos: 'Fotos',
    selfies: 'Selfies',
    vacio: '¡Aún no tienes fotos. Explora y captura momentos!',
    vacioSelfies: '¡Aún no tienes selfies. ¡Posa con lo que encuentres!',
    tomarFoto: '[T] Foto',
    tomarSelfie: '[G] Selfie',
    fotoTomada: '¡Foto guardada!',
    selfieTomada: '¡Selfie guardada!',
    instrucciones: '← → cambiar pestaña | ↑ ↓ desplazar | P cerrar'
  },

  // Sitios arqueológicos — 8 sitios reales por explorar
  // Textos de interfaz usados en múltiples escenas y mundos
  // (controles, etiquetas de acción, indicadores del HUD)
  ui: {
    // --- Indicadores de continuar ---
    presionaE: 'Presiona E para continuar',
    presionaESaltar: 'Presiona E para saltar',
    cartelNoGrafiti: 'No escribir en las paredes',
    cartelProteger: 'Protejamos los petroglifos',
    eContinuar: '[E] Continuar',
    eComenzar: '[E] Comenzar',
    comenzar: 'Comenzar',
    continuar: 'Continuar',

    // --- Acciones sobre NPCs y objetos ---
    eHablar: '[E] Hablar',
    eExaminar: '[E] Examinar',
    eEntrar: '[E] Entrar',
    eCurar: '[E] Curar',
    eAdoptar: '[E] Adoptar',
    eExcavar: '[E] Excavar',
    eAlerta: '[E] ¡Alerta!',
    eSospechoso: '[E] ¡Sospechoso!',
    eLiberar: '[E] Liberar',
    eLiberarManati: '[E] Liberar manatí',
    fDetectarMetal: '[F] Detectar Metal',

    // --- Controles de mundos (barra inferior) ---
    controlesCueva: 'WASD: mover | Espacio: saltar | E: examinar | I: inventario | M: mapa | P: fotos | L: misiones',
    controlesAldea: 'WASD: mover | E: hablar | I: inventario | M: mapa | P: fotos | L: misiones',
    controlesHabilidad: 'WASD: mover | E: hablar | F: habilidad | I: inventario | M: mapa | P: fotos | L: misiones',
    controlesNadar: 'WASD: nadar | E: hablar | I: inventario | M: mapa | P: fotos | L: misiones',
    controlesNadarInteractuar: 'WASD: nadar | E: interactuar | I: inventario | M: mapa | P: fotos | L: misiones',
    controlesCaminar: 'WASD: caminar | E: hablar | I: inventario | M: mapa | P: fotos | L: misiones',
    controlesExcavar: 'WASD: mover | E: hablar/excavar | F: detectar | I: inventario | M: mapa | P: fotos | L: misiones',
    controlesMuseo: 'WASD: mover | E: hablar/recoger | M: mapa | I: inventario | P: fotos | L: misiones',
    controlesLFSD: 'WASD: mover | E: hablar | M: mapa | I: inventario | P: fotos | L: misiones',
    controlesMapa: 'E: entrar | I: inventario | R: mapa real | +/−: zoom | Q: menú',

    // --- Toasts ---
    partidaGuardada: '💾 Partida guardada',

    // --- Combate ---
    hostilidad: 'Hostilidad:',
    tuVida: 'Tu vida:',
    tuTurno: '< Tu turno — elige una acción >',
    turnoEnemigo: '... turno del enemigo ...',
    controlesCombate: 'Flechas: elegir | E: confirmar',
    pistaDefecto: 'Usa Hablar o Negociar para convencer al oponente',

    // --- Panel de ayuda de combate (H) ---
    infoCombateTitulo: 'Cómo funciona el combate',
    infoObjetivo: '🏆 OBJETIVO:',
    infoObj1: 'Convence al oponente (barra verde al 100%)',
    infoObj2: 'O derrótalo reduciendo su vida a 0',
    infoPacifista: '☮️ RUTA PACIFISTA (recomendada):',
    infoPac1: 'Usa "Hablar" y "Negociar" para subir Convencido',
    infoPac2: 'Convencido al 100% = victoria pacífica (+15 reputación)',
    infoPac3: 'La hostilidad baja al hablar con calma',
    infoAgresivo: '⚔️ RUTA AGRESIVA:',
    infoAgr1: '"Atacar" hace daño pero sube la hostilidad',
    infoAgr2: 'Victoria por fuerza = solo +5 reputación',
    infoMedidores: '📊 MEDIDORES:',
    infoConv: '■ Convencido: sube con Hablar/Negociar → 100% = paz',
    infoHost: '■ Hostilidad: sube al atacar, baja al hablar',
    infoCerrar: '[H] Cerrar',
    estadoCasiPaz: '☮️ ¡Casi convencido!',
    estadoPeligro: '⚠️ ¡Muy hostil!',
    estadoBien: '✓ Progresando',
    estadoMal: '✗ Situación tensa',
    pistaMapaReal: '🗺️ Presiona R para ver el mapa real',
    palenqueBienvenida: 'Palenque de Lemba — Comunidad Cimarrona',
    pantallaCompleta: 'Pantalla Completa',
    activada: 'Activada',
    desactivada: 'Desactivada',
    danoEnCombate: 'daño en combate',
    eExaminar: '[E] Examinar',
    caritasDescubiertas: 'Las Caritas descubiertas — petroglifos taínos',
    controlespalenque: 'WASD: mover | E: hablar | I: inventario | M: mapa | P: fotos | L: misiones',
    elegirCompanero: '¿Con quién atacas?',
    elegirCompaneroControles: '< Elige un aliado — Q para cancelar >',
    elegir: 'elegir',
    confirmar: 'confirmar',
    cancelar: 'cancelar',

    // --- Diálogos ---
    presionaEContinuar: 'Presiona E para continuar ▶',

    // --- Selección de personaje ---
    descripcionPersonaje: '14 años. Ascendencia taína, española y africana.',
    controlesSeleccion: 'Izquierda/Derecha: cambiar | Enter/E: confirmar | Q/Esc: volver',

    // --- Cinemática de intro ---
    introLugar: 'En algún lugar de Santo Domingo...',
    introBrilla: 'Algo brilla entre los escombros...',
    introCuidado: '¡CUIDADO! ¡El suelo se derrumba!',
    introDonde: '...¿Dónde estoy?',

    // --- Menú principal ---
    controlesMenu: 'Flechas/WASD: navegar | Enter/E: seleccionar',
    volverMenu: 'Presiona Q / Escape / Enter para volver',

    // --- Selector de niveles (Konami) ---
    selectorNiveles: '🔓 SELECTOR DE NIVELES 🔓',
    konamiActivado: '(Código Konami activado)',
    masNivelesArriba: '▲ más niveles',
    masNivelesAbajo: '▼ más niveles',
    controlesSelector: '↑↓: elegir  |  E: ir al nivel  |  Q: cerrar',

    // --- Créditos cinematográficos ---
    subtituloJuego: 'Aventura Arqueológica Dominicana',
    creadoPor: 'Creado por',
    profesor: 'Profesor',
    claseRobotica: 'Clase de Robótica',
    ubicacion: 'Santo Domingo, República Dominicana',
    tecnologias: 'Tecnologías',
    inspiradoEn: 'Inspirado en',
    agradecimiento1: 'El patrimonio arqueológico de la República Dominicana',
    agradecimiento2: 'Los investigadores del Museo del Hombre Dominicano',
    agradecimiento3: 'La Zona Colonial de Santo Domingo (UNESCO)',
    agradecimiento4: 'Las Cuevas del Pomier y sus petroglifos taínos',
    mensajeFinal1: 'Protejamos nuestro patrimonio.',
    mensajeFinal2: 'La historia nos pertenece a todos.',
    copyright: 'Lycée Français de Saint-Domingue © 2026',

    // --- Opciones de volumen ---
    volumenMusica: 'Volumen Música',
    volumenSonidos: 'Volumen Sonidos',

    // --- Batú controles ---
    controlesBatu: '← → mover | Golpea con el cuerpo (cadera, hombro, cabeza, rodilla)',
    tu: 'Tú',
    rival: 'Guarocuya',

    // --- Registro de misiones controles ---
    controlesRegistro: '← → cambiar pestaña | ↑ ↓ scroll | Q cerrar',

    // --- Misión completa ---
    misionCompletaFinal: '¡Misión completa! Presiona M para ver el final',

    // --- Mini-juegos (fallbacks) ---
    calibracionTitulo: 'Calibración de Señal',
    calibracionInstrucciones: '↑↓: cambiar perilla | ←→: ajustar | E: confirmar',
    calibracionDesc1: 'Ajusta las 3 perillas para que la onda coincida',
    calibracionDesc2: 'con la señal objetivo (línea punteada).',

    programacionTitulo: 'Programación del Robot',
    programacionDesc1: 'Ordena los bloques para guiar al robot',
    programacionDesc2: 'hasta el punto de escaneo.',
    programacionInstrucciones: '↑↓: elegir bloque | E: agregar | ←: quitar | F: ejecutar',
    programacionBloques: 'Bloques:',
    programacionPrograma: 'Programa:',
    programacionControles: '↑↓: elegir | E: agregar | ←: quitar | F: ejecutar',
    programacionEjecutando: 'Ejecutando programa...',

    conexionTitulo: 'Conexión de Cables',
    conexionDesc1: 'Conecta cada cable con su par correcto.',
    conexionDesc2: 'Empareja colores y símbolos.',
    conexionInstrucciones: '↑↓: navegar | E: seleccionar/conectar | Q: cancelar',
    conexionBonus: '¡Bonus de velocidad! +5 reputación extra',

    // --- Nombre de LFSD ---
    lfsdTitulo: 'LFSD - Classe de Robotique',
    bienvenida: '🤖 Bienvenido a les Fous du Robot',
    lfsdPizarra: 'Classe de Robotique - LFSD',
    impresora3D: 'Impresora 3D',

    // --- Hablar con habitantes (fallback) ---
    hablarHabitantes: 'Hablar con habitantes',

    // --- Nombres de personajes en diálogos ---
    espirituTaina: '🌀 Espíritu Taína',
    petroglifo: '🗿 Petroglifo',

    // --- Toasts de inventario ---
    itemAnadido: 'ítem añadido al inventario',
    itemAnadidoCorto: 'añadido al inventario',
    itemAnadidoBrief: 'ítem añadido',

    // --- Toasts de guardado ---
    noHayPartida: 'No hay partida guardada',
    partidaCargada: '📂 Partida cargada',

    // --- Toasts de misiones ---
    misionDescubierta: '📋 Misión descubierta:',
    misionCompletada: '✅ ¡Misión completada:',
    accionEcologica: '¡Acción ecológica completada!',

    // --- Toasts de zona colonial ---
    cassaInteresante: '💬 Roberto Cassá siempre tiene algo interesante que contar',
    cambioGuardia: '🎖️ ¡Cambio de guardia en el Panteón Nacional!',

    // --- Toasts de laboratorio ---
    morbanAutenticacion: '🏛 Dr. Morbán: proceso de autenticación explicado',
    periodicoRecogido: '📰 ¡Artículo de periódico recogido!',
    descubrimientoCientifico: '📰 ¡Descubrimiento científico! ¡Saldrás en el periódico!',
    equipoEntregado: '🔬 Equipo entregado — ¡la Dra. López va a investigar!',
    lopezCarbono: '🔬 Dra. López: datación por Carbono-14',
    anaRestauracion: '🔧 Ana: principios de restauración',
    visitanteConvencido: '🕵 Visitante convencido de autenticar su pieza',
    certificadoRecogido: '📜 ¡Certificado de Autenticidad recogido!',
    catalogoRecogido: '📖 ¡Catálogo del Museo recogido!',

    // --- Toasts de santuario del manatí ---
    robotEntregado: '🤖 Robot entregado — ¡4 nuevos naufragios descubiertos!',

    // --- Etiquetas de ubicación ---
    salida: 'SALIDA',
    recepcion: 'RECEPCIÓN',
    aduanas: 'ADUANAS',
    museo: 'MUSEO',
    santuario: 'Santuario',
    helices: '⚠ HÉLICES ⚠',

    // --- Mapa de riesgo (Zona Colonial) ---
    mapaRiesgo: 'Mapa de Riesgo:',
    protegido: 'Protegido',
    enPeligro: 'En peligro',
    amenazado: 'Amenazado',

    // --- HUD del mapa ---
    bloqueadoNivel: '🔒 Bloqueado — completa el nivel anterior',
    completadoNivel: '(Completado)',

    // --- Mapa de referencia (marcadores) ---
    completado: '✅ Completado',
    bloqueado: '🔒 Bloqueado',
    disponible: '🟡 Disponible',
    viajarAqui: '🗺️ Viajar aquí',
    descubiertoRobot: '📡 Descubierto por Robot LFSD',
    cerrarMapa: 'R / Esc — cerrar mapa'
  },

  sitiosArqueologicos: {
    titulo: 'Sitios Inexplorados',
    cuevaBerna: 'Cueva de Berna — Pictografías taínas, parcialmente estudiadas.',
    puntaMacao: 'Punta Macao — Sitio precerámico con excavación mínima.',
    elCabo: 'El Cabo — Gran aldea taína, parcialmente excavada.',
    playaGrande: 'Playa Grande — Período cerámico, estudio limitado.',
    lomaGuayacanes: 'Loma de Guayacanes — Sitio de enterramientos, necesita prospección.',
    padreNuestro: 'Padre Nuestro — Sistema de cuevas con petroglifos.',
    cuevaMaravillas: 'Cueva de las Maravillas — Cámaras adicionales sin explorar.',
    bocaYuma: 'Boca de Yuma — Cuevas costeras con prospección arqueológica limitada.'
  },

  // --- Nombres de lugares, estructuras y cultivos visibles en pantalla ---
  lugares: {
    // Asentamiento Taíno I
    bohioAlfarero: 'Bohío del Alfarero',
    bohioPescador: 'Bohío del Pescador',
    bohioCurandera: 'Bohío de la Curandera',
    caneyCacique: 'Caney del Cacique',
    bohioCasabe: 'Bohío de Casabe',

    // Asentamiento Taíno II
    bohioBehique: 'Bohío del Behique',
    bohioSemillas: 'Bohío de Semillas',
    bohioAgricultor: 'Bohío del Agricultor',
    caneyCeremonial: 'Caney Ceremonial',
    dujo: 'Dujo',
    chozaLider: 'Choza del Líder',
    chozaForja: 'Choza de la Forja',
    chozaTambores: 'Círculo de Tambores',
    chozaSanacion: 'Choza de Sanación',
    atalaya: 'Atalaya del Vigía',

    // Cultivos taínos
    yuca: 'yuca',
    batata: 'batata',
    maiz: 'maíz',
    aji: 'ají',
    tabaco: 'tabaco',

    // La Isabela
    iglesiaRuinas: 'Iglesia (ruinas)',
    casaColon: 'Casa de Colón',
    alhondiga: 'Alhóndiga',
    torreVigia: 'Torre de Vigía',
    cementerioColonial: 'Cementerio Colonial',

    // Museo Atarazanas Reales
    salaExhibicion: 'Sala de Exhibición',
    laboratorioC14: 'Laboratorio C-14',
    tallerRestauracion: 'Taller de Restauración',
    vitrinaTaina: 'Vitrina Taína',
    vitrinaColonial: 'Vitrina Colonial',
    vitrinaSubmarina: 'Vitrina Submarina',
    almacenPiezas: 'Almacén de Piezas'
  },

  // ==========================================================
  // MAPA DE REFERENCIA LEAFLET — textos del mapa real
  // ==========================================================
  mapaReal: {
    // --- UI ---
    cerrarMapa: 'R / Esc — cerrar mapa',
    completado: '✅ Completado',
    bloqueado: '🔒 Bloqueado',
    disponible: '🟡 Disponible',
    viajarAqui: '🗺️ Viajar aquí',
    descubiertoRobot: '📡 Descubierto por Robot LFSD',

    // --- Capas base de tiles ---
    capas: {
      acuarela: 'Acuarela',
      terreno: 'Terreno',
      toner: 'Tóner',
      oscuro: 'Oscuro',
      suave: 'Suave',
      osm: 'OSM Moderno',
      voyager: 'Voyager (CARTO)'
    },

    // --- Overlays (capas alternables de sitios) ---
    overlays: {
      tainos: '🗿 Sitios Taínos',
      coloniales: '🏰 Sitios Coloniales',
      naufragios: '⚓ Naufragios',
      museos: '🏛 Museos',
      inexplorados: '🔍 Sitios Inexplorados',
      potencial: '🔬 Potencial Arqueológico'
    },

    // --- Ubicaciones del juego (marcadores principales) ---
    ubicaciones: {
      cuevasPomier: 'Cuevas del Pomier',
      descCuevasPomier: 'Sistema de 55 cuevas con más de 6,000 petroglifos taínos. Patrimonio Nacional.',
      asentamiento1: 'Asentamiento Taíno I',
      descAsentamiento1: 'Aldea taína reconstruida con bohíos, conucos y plaza ceremonial.',
      asentamiento2: 'Asentamiento Taíno II',
      descAsentamiento2: 'Centro agrícola y ceremonial taíno. Conucos, areíto y ritos de cohoba.',
      isabela: 'La Isabela',
      descIsabela: 'Primer asentamiento europeo permanente en América, fundado por Colón en 1493.',
      zonaColonial: 'Zona Colonial',
      descZonaColonial: 'Primera ciudad permanente de América. Patrimonio UNESCO desde 1990.',
      santaMaria: 'Naufragio Santa María',
      descSantaMaria: 'Restos de la nave capitana de Colón, encallada la Nochebuena de 1492 cerca de Cap-Haïtien.',
      aeropuerto: 'Aeropuerto Punta Cana',
      descAeropuerto: 'Aeropuerto Internacional de Punta Cana (PUJ). Punto de control aduanero.',
      atarazanas: 'Museo Atarazanas Reales',
      descAtarazanas: 'Museo de las Atarazanas Reales. Artefactos de naufragios y patrimonio marítimo.'
    },

    // --- Sitios taínos / precolombinos reales ---
    sitiosTainos: {
      cuevasPomierBorbon: 'Cuevas del Pomier (Borbón)',
      descCuevasPomierBorbon: 'Sistema de 55 cuevas con más de 6,000 pictografías y petroglifos taínos e igneris.',
      cuevaMaravillas: 'Cueva de las Maravillas',
      descCuevaMaravillas: 'Más de 500 petroglifos y pictografías taínos, incluyendo escenas de rituales funerarios.',
      losHaitises: 'Parque Nacional Los Haitises',
      descLosHaitises: 'Cuevas accesibles solo por mar con más de 1,000 pictografías y petroglifos taínos.',
      cuevaFunFun: 'Cueva Fun Fun',
      descCuevaFunFun: 'Enorme sistema de cuevas con río subterráneo y arte rupestre indígena en Hato Mayor.',
      cuevaBerna: 'Cueva de Berna',
      descCuevaBerna: 'Unos 300 petroglifos taínos tallados en roca en el Parque Nacional Cotubanamá.',
      cuevaPadreNuestro: 'Cueva Padre Nuestro',
      descCuevaPadreNuestro: 'Cenotes con piscinas de agua dulce y petroglifos en el Parque Nacional Cotubanamá.',
      lasCaritas: 'Las Caritas de los Indios',
      descLasCaritas: 'Petroglifos pre-taínos tallados en roca coralina frente al Lago Enriquillo.',
      guacarasCotui: 'Guácaras de Cotuí',
      descGuacarasCotui: 'Cavernas con petroglifos taínos en Sánchez Ramírez (Hoyo de Sanabe, Guácara del Lago).',
      chacuey: 'Petroglifos de Chacuey',
      descChacuey: 'Centenares de petroglifos a orillas del río Chacuey en Dajabón, cerca de la frontera.',
      laCaleta: 'Parque Submarino La Caleta',
      descLaCaleta: 'Cementerio precolombino y museo, parque submarino con esculturas de dioses taínos.',
      juanDolio: 'Plaza Ceremonial de Juan Dolio',
      descJuanDolio: 'Sitio arqueológico taíno costero con restos de plaza ceremonial y batey.',
      enBasSaline: 'En Bas Saline',
      descEnBasSaline: 'Uno de los mayores asentamientos taínos (95,000 m²), posible pueblo del cacique Guacanagarí.',
      fortLiberte: 'Fort-Liberté (Bayajá)',
      descFortLiberte: '164 vestigios de asentamientos taínos documentados y ruinas coloniales en la bahía.',
      grotteMarieJeanne: 'Grotte Marie-Jeanne',
      descGrotteMarieJeanne: 'Cueva natural más larga de Haití (5.3 km) con vestigios precolombinos cerca de Port-à-Piment.',
      museoTainoCapHaitien: 'Museo Taíno de Cap-Haïtien',
      descMuseoTainoCapHaitien: 'Colección de brazaletes, cemíes y artefactos ceremoniales taínos del norte de Haití.',
      petroSainteSuzanne: 'Petroglifos de Sainte-Suzanne',
      descPetroSainteSuzanne: 'Garganta con petroglifos taínos notables en el norte de Haití.'
    },

    // --- Sitios coloniales reales ---
    sitiosColoniales: {
      zonaColonialSD: 'Zona Colonial de Santo Domingo',
      descZonaColonialSD: 'Primera ciudad colonial permanente del Nuevo Mundo. Patrimonio UNESCO desde 1990.',
      laIsabela: 'La Isabela',
      descLaIsabela: 'Primer asentamiento europeo planificado en América, fundado por Colón en 1493.',
      alcazarColon: 'Alcázar de Colón',
      descAlcazarColon: 'Palacio virreinal de Diego Colón (1510), hoy museo con mobiliario y arte colonial.',
      sanFrancisco: 'Ruinas del Monasterio de San Francisco',
      descSanFrancisco: 'Primer monasterio construido en América (1508), destruido por terremotos.',
      vegaVieja: 'La Vega Vieja',
      descVegaVieja: 'Ruinas de la primera ciudad minera de oro en América, destruida por terremoto en 1562.',
      sanFelipe: 'Fortaleza San Felipe',
      descSanFelipe: 'Fortaleza del siglo XVI en Puerto Plata para defender la costa norte de corsarios.',
      capHaitien: 'Cap-Haïtien (Centro Histórico)',
      descCapHaitien: 'Antigua capital de Saint-Domingue, "París de las Antillas", con arquitectura colonial francesa.',
      jacmel: 'Jacmel (Centro Histórico)',
      descJacmel: 'Ciudad colonial con arquitectura de hierro forjado del siglo XIX, patrimonio cultural haitiano.'
    },

    // --- Naufragios históricos ---
    naufragios: {
      santaMaria1492: 'Santa María (1492)',
      descSantaMaria1492: 'Nave capitana de Colón, encalló la noche de Navidad cerca de Cap-Haïtien. Sus maderas construyeron el fuerte La Navidad.',
      sanMiguel1551: 'San Miguel (1551)',
      descSanMiguel1551: 'Galeón español cargado de tesoros, naufragó en la costa norte cerca de Río San Juan.',
      concepcion1641: 'Ntra. Sra. de la Concepción (1641)',
      descConcepcion1641: 'Galeón de la flota de plata en el Banco de la Plata. Burt Webber recuperó 25 toneladas de plata en 1978.',
      monteCristi1660: 'Monte Cristi Pipe Wreck (1660)',
      descMonteCristi1660: 'Barco mercante holandés con más de 10,000 pipas de arcilla, la mayor colección de artefactos de tabaco submarinos.',
      quedagh1699: 'Quedagh Merchant (1699)',
      descQuedagh1699: 'Barco armenio capturado por el pirata Capitán Kidd, abandonado cerca de Isla Catalina. Hoy museo submarino.',
      guadalupe1724: 'Ntra. Sra. de Guadalupe (1724)',
      descGuadalupe1724: 'Galeón de azogue español hundido en Bahía de Samaná durante un huracán con 400 toneladas de mercurio.',
      tolosa1724: 'Conde de Tolosa (1724)',
      descTolosa1724: 'Compañero de la Guadalupe en la Flota de Azogues, naufragó en Samaná con más de 550 víctimas.',
      scipion1782: 'Le Scipion (1782)',
      descScipion1782: 'Navío francés de 74 cañones, veterano de la Batalla de Chesapeake, chocó contra roca en Bahía de Samaná.',
      goldenFleece1827: 'Golden Fleece (1827)',
      descGoldenFleece1827: 'Barco mercante estadounidense perdido en el Banco de la Plata, arrecifes traicioneros al norte de la isla.',
      astron1978: 'Astron (1978)',
      descAstron1978: 'Carguero soviético de 127 m encallado frente a Playa Bávaro, Punta Cana. Popular sitio de buceo.',
      hickory1944: 'Hickory (1944)',
      descHickory1944: 'Barco de la Armada de EE.UU. hundido cerca de la costa sureste durante la Segunda Guerra Mundial.',
      zonaSantoDomingo: 'Zona de naufragios de Santo Domingo',
      descZonaSantoDomingo: 'Área con múltiples naufragios coloniales al sur de Santo Domingo. Arqueología submarina activa.'
    },

    // --- Museos ---
    museos: {
      hombreDominicano: 'Museo del Hombre Dominicano',
      descHombreDominicano: 'Principal museo antropológico del Caribe con la mayor colección de artefactos taínos.',
      atarazanasReales: 'Museo de las Atarazanas Reales',
      descAtarazanasReales: 'Antiguo arsenal naval colonial con arqueología subacuática y restos de naufragios del s. XVI.',
      alcazarColonMuseo: 'Museo Alcázar de Colón',
      descAlcazarColonMuseo: 'Palacio virreinal de Diego Colón (1510), el edificio colonial más importante del Nuevo Mundo.',
      casasReales: 'Museo de las Casas Reales',
      descCasasReales: 'Antigua sede de la Real Audiencia con historia colonial de La Española desde 1492.',
      catedralPrimada: 'Museo de la Catedral Primada',
      descCatedralPrimada: 'Tesoro de arte sacro colonial dentro de la primera catedral del Nuevo Mundo (1512-1540).',
      historiaNatural: 'Museo Nacional de Historia Natural',
      descHistoriaNatural: 'Biodiversidad y geología de La Española con ecosistemas caribeños y especies endémicas.',
      resistencia: 'Museo de la Resistencia Dominicana',
      descResistencia: 'Memorial sobre la lucha contra la dictadura de Trujillo (1930-1961).',
      bellapart: 'Museo Bellapart',
      descBellapart: 'Colección privada de arte dominicano de los siglos XIX y XX.',
      arteModerno: 'Museo de Arte Moderno',
      descArteModerno: 'Principal museo de arte contemporáneo dominicano en la Plaza de la Cultura.',
      trampolin: 'Museo Infantil Trampolín',
      descTrampolin: 'Museo interactivo para niños en la Casa de Rodrigo de Bastidas, Calle Las Damas.',
      mundoAmbar: 'Museo Mundo del Ámbar',
      descMundoAmbar: 'Ámbar dominicano con insectos fosilizados de millones de años, en la Zona Colonial.',
      larimar: 'Museo de Larimar',
      descLarimar: 'Piedra semipreciosa azul exclusiva de RD, con exhibiciones sobre geología y extracción.',
      fortalezaOzama: 'Museo Fortaleza Ozama',
      descFortalezaOzama: 'Fortaleza militar más antigua de América (1502) con la Torre del Homenaje.',
      faroColon: 'Faro a Colón',
      descFaroColon: 'Monumental museo-mausoleo en forma de cruz con restos atribuidos a Cristóbal Colón.',
      centroLeon: 'Centro León',
      descCentroLeon: 'Centro cultural con colecciones de arte, historia y antropología dominicana.',
      tabacoAurora: 'Museo del Tabaco La Aurora',
      descTabacoAurora: 'Historia del tabaco dominicano dentro de la fábrica La Aurora (fundada 1903).',
      ambarPP: 'Museo del Ámbar (Puerto Plata)',
      descAmbarPP: 'Ámbar y ámbar azul dominicano en la Villa Bentz con insectos prehistóricos.',
      fortalezaSanFelipe: 'Museo Fortaleza San Felipe',
      descFortalezaSanFelipe: 'Fortaleza española del s. XVI convertida en museo militar e histórico.',
      arqueologicoIsabela: 'Museo Arqueológico La Isabela',
      descArqueologicoIsabela: 'Sitio del primer asentamiento europeo permanente en América (1493).',
      altosChavon: 'Museo Arqueológico Altos de Chavón',
      descAltosChavon: 'Más de 3,000 piezas precolombinas taínas junto al río Chavón en La Romana.',
      ballenasSamana: 'Museo de las Ballenas (Samaná)',
      descBallenasSamana: 'Historia natural marina dedicada a las ballenas jorobadas que migran a la bahía.',
      vegaViejaMuseo: 'Parque Museo La Vega Vieja',
      descVegaViejaMuseo: 'Ruinas de la ciudad fundada por Colón (1494) con artefactos taínos y coloniales.',
      hermanasMirabal: 'Casa Museo Hermanas Mirabal',
      descHermanasMirabal: 'Casa-museo de las heroínas de la resistencia contra Trujillo en Salcedo.',
      altagracia: 'Museo Basílica de la Altagracia',
      descAltagracia: 'Arte sacro junto a la basílica patronal de RD en Higüey.',
      sanPedroMacoris: 'Museo de San Pedro de Macorís',
      descSanPedroMacoris: 'Historia azucarera y la inmigración de los cocolos antillanos angloparlantes.',
      mupanah: 'MUPANAH (Panthéon National Haïtien)',
      descMupanah: 'Museo nacional haitiano con héroes de la independencia y el ancla de la Santa María.',
      arteHaitiano: "Musée d'Art Haïtien",
      descArteHaitiano: 'Mayor colección de arte haitiano con obras maestras del movimiento naíf.',
      centreArt: "Centre d'Art (Port-au-Prince)",
      descCentreArt: 'Institución fundada en 1944 que impulsó el movimiento artístico haitiano.',
      saintMartial: 'Musée Saint-Martial',
      descSaintMartial: 'Histórico colegio-seminario (1864) con colección de historia natural y cultural.',
      ogierFombrun: 'Musée Ogier-Fombrun',
      descOgierFombrun: 'Plantación azucarera del s. XVIII en Montrouis con artefactos taínos y de la Revolución Haitiana.'
    },

    // --- Naufragios descubiertos por el robot del LFSD ---
    naufragiosRobot: {
      luperon: 'Pecio de Luperón (s. XVII)',
      descLuperon: 'Restos de un barco mercante español encontrado por el robot en la bahía de Luperón. Cargamento de cerámica y herramientas.',
      islaSaona: 'Pecio de Isla Saona (s. XVIII)',
      descIslaSaona: 'Barco de esclavos hundido al sur de Isla Saona. El robot detectó anclas y cadenas en el fondo arenoso.',
      galeonPP: 'Galeón de Puerto Plata (1563)',
      descGaleonPP: 'Galeón de la flota de Nueva España perdido durante un huracán. El robot encontró cañones y lingotes.',
      sanAndres: 'Vapor costero San Andrés (1891)',
      descSanAndres: 'Vapor dominicano hundido cerca de Boca Chica. El robot escaneó calderas y estructura metálica intacta.'
    },

    // --- Sitios arqueológicos inexplorados ---
    sitiosInexplorados: {
      cuevaBerna: 'Cueva de Berna',
      descCuevaBerna: 'Parque Nacional del Este — pictografías precolombinas en cuevas costeras poco documentadas.',
      puntaMacao: 'Punta Macao',
      descPuntaMacao: 'Zona de Higüey — sitio precerámico con evidencia de ocupación humana anterior a los taínos.',
      elCabo: 'El Cabo',
      descElCabo: 'Costa este — gran aldea taína con restos de bohíos, cerámicas y herramientas líticas.',
      playaGrande: 'Playa Grande',
      descPlayaGrande: 'Río San Juan — sitio del período cerámico con fragmentos de vasijas y depósitos culturales.',
      lomaGuayacanes: 'Loma de Guayacanes',
      descLomaGuayacanes: 'San Pedro de Macorís — sitio funerario con enterramientos precolombinos y ofrendas rituales.',
      padreNuestro: 'Padre Nuestro',
      descPadreNuestro: 'Bayahíbe — sistema de cuevas con petroglifos, cenotes y evidencia de uso ceremonial taíno.',
      cuevaMaravillasInex: 'Cueva de las Maravillas',
      descCuevaMaravillasInex: 'San Pedro — cámaras inexploradas más allá de la zona turística con posibles pictografías inéditas.',
      bocaYuma: 'Boca de Yuma',
      descBocaYuma: 'Cuevas costeras con estratigrafía arqueológica que abarca múltiples períodos de ocupación.'
    },

    // --- Potencial Arqueológico (15 sitios inexplorados/subexplorados) ---
    potencialArqueologico: {
      elCabo: 'El Cabo y alrededores (Higüey)',
      descElCabo: 'Asentamientos taínos costeros no excavados. Leiden University excavó la aldea principal (600-1504 d.C.) pero los alrededores apenas se han explorado.',
      manantialAleta: 'Manantial de la Aleta (cenote)',
      descManantialAleta: 'Cenote sagrado taíno de 73m con ofrendas de madera extraordinarias. Solo se ha investigado "la punta del iceberg" — las profundidades siguen inexploradas.',
      monteCristi: 'Plataforma costera de Montecristi',
      descMonteCristi: 'Más de 400 naufragios coloniales reportados, menos de 50 localizados. Zona prioritaria de patrimonio subacuático UNESCO.',
      samanaBay: 'Bahía de Samaná',
      descSamanaBay: 'Además de los galeones Guadalupe y Tolosa (1724), las aguas protegidas contienen naufragios no descubiertos. El sitio arcaico El Pozito indica ocupación costera pre-colombina.',
      fortLiberte: 'Fort-Liberté y En Bas Saline (Haití)',
      descFortLiberte: '~300 sitios arqueológicos en riesgo de saqueo. Candidato más probable para La Navidad, el primer fuerte europeo en las Américas (Colón, 1492).',
      pomierInexplorado: 'Cuevas del Pomier (secciones inexploradas)',
      descPomierInexplorado: '55 cuevas con 6,000+ pinturas rupestres — la mayor concentración del Caribe. Solo 5 abiertas al público; las ~50 restantes contienen arte no documentado.',
      jaraguaCuevas: 'Cuevas del Parque Nacional Jaragua',
      descJaraguaCuevas: 'Cacicazgo de Jaragua. Cuevas con pictogramas datados hasta 2590 a.C. El interior kárstico (1,374 km²) nunca se ha prospectado sistemáticamente.',
      grotteMarieJeanne: 'Grotte Marie-Jeanne (Haití)',
      descGrotteMarieJeanne: 'Potencialmente el sistema de cuevas más grande del Caribe (~1 km). Cerámica taína, herramientas y arte rupestre de uso ritual sagrado.',
      manielOcoa: 'Maniel de Ocoa (cimarrón)',
      descManielOcoa: 'Primer asentamiento cimarrón documentado de la Hispaniola (s. XVI, hasta ~1666). Nunca excavado sistemáticamente pese a estar documentado históricamente.',
      bahorucoMaroon: 'Sierra de Bahoruco (cimarrón)',
      descBahorucoMaroon: 'Durante 85+ años grandes comunidades cimarronas ocuparon estas montañas. También refugio de Enriquillo (1519-1533). Sin prospección sistemática.',
      chacuey: 'Valle del río Chacuey',
      descChacuey: 'Cientos de petroglifos y plazas ceremoniales con caminos sofisticados. El patrón de asentamientos agrícolas del valle no se ha excavado comprehensivamente.',
      cibaoInterior: 'Interior del Valle del Cibao',
      descCibaoInterior: 'Evidencia paleoecológica de agricultura pre-colombina. ~300 sitios indígenas registrados pero el interior ha recibido mucha menos atención que la costa.',
      bocaNigua: 'Boca de Nigua',
      descBocaNigua: 'Restos de asentamiento taíno sin excavar. Sitio de la revuelta de esclavizados de 1796 — doble dimensión arqueológica: taína y cimarrona.',
      islaCatalina: 'Isla Catalina (subacuático)',
      descIslaCatalina: 'El Quedagh Merchant del Capitán Kidd descubierto aquí en 2007. El sistema de arrecifes probablemente contiene naufragios adicionales no documentados.',
      costaHaitiSW: 'Costa suroeste de Haití',
      descCostaHaitiSW: 'Cacicazgo de Jaragua. Aldeas pesqueras pre-colombinas probablemente presentes a lo largo de Les Cayes-Jérémie. Sin prospección costera sistemática.'
    }
  }
};

export default es;
