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

    // Diálogos de la segunda aldea — agricultura, medicina y ceremonias
    aldea2: {
      behique1: 'Soy Yuisa, el behique — curandero y guía espiritual de esta aldea.',
      behique2: 'Las plantas de esta isla tienen grandes poderes curativos que los dioses nos enseñaron.',
      behique3: 'El tabaco lo usamos en la ceremonia de la cohoba, para comunicarnos con los cemíes.',
      behique4: 'La guayaba cura la fiebre, la jagua protege la piel y la sábila sana las heridas.',

      agricultor1: '¡Mira nuestros conucos! Cada montículo de tierra es un jardín de comida.',
      agricultor2: 'Los conucos son montículos donde plantamos. Así la tierra drena mejor y las raíces crecen fuertes.',
      agricultor3: 'Cultivamos yuca, maíz, batata, ají picante y tabaco — todo lo que necesitamos para vivir.',
      agricultor4: 'La yuca es lo más importante. Con ella hacemos el casabe, que es nuestro pan de cada día.',

      musico1: '¡Bienvenido/a al batey, el corazón de nuestra aldea!',
      musico2: 'Aquí celebramos el areíto — nuestra gran ceremonia de música, danza y memoria.',
      musico3: 'Tocamos maracas de higüero, güiros de calabaza y tambores tallados en troncos de ceiba.',
      musico4: 'En el areíto cantamos la historia de nuestro pueblo — así los jóvenes nunca olvidan de dónde vienen.',

      behiqueCemi: '¡El espíritu del Cemí Murciélago te ha elegido! Él te guiará en las cuevas con su eco-localización.',

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

    // Mundo Acuático — Naufragio de La Pinta
    // Un pescador lleva a Pepito a explorar los restos submarinos
    // de La Pinta, donde aprende sobre fauna marina y especies invasoras
    acuatico: {
      // Pescador Manuel — introduce la historia del naufragio
      pescador1: '¡Bienvenido al fondo del mar, muchacho! Soy Manuel, pescador de Montecristi.',
      pescador2: 'Aquí abajo están los restos de La Pinta, una de las tres carabelas de Colón.',
      pescador3: 'Los maderos de La Pinta se usaron para construir el Fuerte Navidad — la primera estructura europea en América.',
      pescador4: '¡Cuidado con las medusas! Su picadura duele y te hace nadar más lento.',

      // Tortuga carey — educación sobre especies en peligro
      tortuga1: 'Soy una tortuga carey. Mi especie lleva 100 millones de años nadando en estos mares.',
      tortuga2: 'Estamos en peligro crítico de extinción. Nos cazan por nuestro caparazón, que usan para joyería.',
      tortuga3: 'Los arrecifes de coral son nuestro hogar. Si el coral muere, nosotros también.',
      tortuga4: 'Las tortugas carey comemos esponjas marinas que son tóxicas para otros animales. ¡Somos las guardianas del arrecife!',

      // Arqueóloga submarina — da el mapa de naufragios
      arqueologa1: 'Soy arqueóloga submarina. Estudio los naufragios del Caribe dominicano.',
      arqueologa2: 'Hay más de 400 naufragios registrados en las costas de esta isla.',
      arqueologa3: 'Cada naufragio es una cápsula del tiempo. Los clavos, cerámicas y monedas nos cuentan la historia.',
      arqueologa4: 'Toma este mapa de naufragios. Te ayudará a encontrar otros sitios submarinos.',
      arqueologaRepite: 'Usa el mapa de naufragios para encontrar más restos submarinos. ¡El mar Caribe esconde muchos secretos!',

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
      misionExplorar: 'Explora el naufragio de La Pinta',
      misionCompleta: '¡Naufragio explorado! Vuelve al mapa (M)'
    },

    // Mundo Jurídico — Aeropuerto Las Américas (Acto 4)
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

      lopez1: 'Soy la Dra. López, especialista en datación por Carbono-14.',
      lopez2: 'El Carbono-14 es un átomo radiactivo que todos los seres vivos absorben. Cuando mueren, empieza a descomponerse.',
      lopez3: 'Midiendo cuánto C-14 queda en un objeto orgánico, calculamos su antigüedad con precisión.',
      lopez4: '¡Así confirmamos si un artefacto tiene 500 años o si es una falsificación moderna!',
      lopezRepite: 'Recuerda: la datación C-14 funciona con materiales orgánicos — madera, hueso, tela.',

      ana1: 'Soy Ana, restauradora de artefactos. Mi trabajo es reparar sin alterar.',
      ana2: 'La regla de oro de la restauración: todo lo que hagas debe ser reversible.',
      ana3: 'Usamos adhesivos especiales, consolidantes y microscopios para no dañar la pieza original.',
      ana4: 'Un artefacto mal restaurado pierde su valor histórico para siempre. ¡La paciencia es clave!',
      anaRepite: 'Restaurar es como ser doctor de artefactos: primero, no hacer daño.',

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
      misionFinal: '¡Misión completa! Presiona M para ver el final'
    },

    // Finales — 4 posibles secuencias de cierre
    finales: {
      completo: {
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
    descArtefactoTaino: 'Un cemí con detalles dorados. Debe ser llevado al museo para su estudio.',
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
    descClavoBronce: 'Clavo de bronce del casco de La Pinta. Resistía la corrosión del agua salada.',
    mapaNaufragios: 'Mapa de Naufragios',
    descMapaNaufragios: 'Mapa con la ubicación de naufragios en el Caribe dominicano. Regalo de la arqueóloga submarina.',

    registroAduanal: 'Registro Aduanal',
    descRegistroAduanal: 'Documento oficial de aduanas con las anomalías detectadas en los envíos de Torres.',
    ordenJudicial: 'Orden Judicial',
    descOrdenJudicial: 'Orden del tribunal que autoriza la confiscación de los artefactos traficados.',

    certificadoAutenticidad: 'Certificado de Autenticidad',
    descCertificadoAutenticidad: 'Documento oficial que certifica la autenticidad de un artefacto arqueológico.',
    catalogoMuseo: 'Catálogo del Museo',
    descCatalogoMuseo: 'Catálogo con todos los artefactos del Museo de las Atarazanas Reales.'
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
