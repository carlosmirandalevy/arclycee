// Traductions en français — pour les joueurs francophones du lycée
// La structure reflète exactement celle du fichier espagnol pour maintenir la cohérence

const fr = {
  menu: {
    titulo: 'ArcLycée',
    nuevoJuego: 'Nouvelle Partie',
    continuarJuego: 'Continuer la Partie',
    opciones: 'Options',
    idioma: 'Langue',
    creditos: 'Crédits'
  },

  seleccion: {
    eligePersonaje: 'Choisis ton Personnage',
    pepito: 'Pepito',
    pepita: 'Pepita',
    descripcion: 'Description',
    confirmar: 'Confirmer'
  },

  interfaz: {
    vida: 'Vie',
    inventario: 'Inventaire',
    guardar: 'Sauvegarder',
    mapa: 'Carte',
    misiones: 'Missions',
    opciones: 'Options'
  },

  // Les dialogues conservent certains mots en espagnol quand le contexte culturel l'exige
  dialogos: {
    intro: {
      linea1: "Qu'est-ce qui brille parmi les décombres de la construction ?",
      linea2: "On dirait... une relique ancienne ?",
      linea3: 'ATTENTION ! Le sol s\'effondre !',
      linea4: "...Où suis-je ? Ça ressemble à... une grotte."
    },

    // Le grand-père dominicain transmet des valeurs sur le patrimoine collectif
    abuelo: {
      saludo: 'Mon petit-enfant, la terre garde des secrets que seuls les curieux peuvent découvrir.',
      consejo1: 'Rappelle-toi : chaque pièce que tu trouves appartient au peuple, pas à une seule personne.'
    },

    // La grand-mère francophone reflète l'héritage éducatif franco-dominicain
    abuela: {
      saludo: "Mon petit/e, l'aventure t'attend ! Mais d'abord, prépare-toi bien.",
      consejo1: 'Dans chaque musée il y a une histoire... dans chaque histoire il y a un musée.'
    },

    // L'esprit taïno relie le joueur à l'histoire précolombienne
    espirituTaina: {
      saludo: "Jeune descendant/e, les cemíes t'ont choisi/e pour protéger ce qui reste de notre peuple.",
      revelacion: 'La grotte du Pomier cache plus de secrets que tu ne l\'imagines...'
    },

    // L'esprit africain honore l'héritage afro-descendant du pays
    espirituAfricano: {
      saludo: 'La force de tes ancêtres coule dans tes veines, jeune guerrier/ère.',
      sabiduria: "Tout trésor ne brille pas. Parfois le vrai trésor est la connaissance."
    },

    // Magnoboot ajoute humour et fonctionnalité en tant que compagnon robotique
    magnoboot: {
      presentacion: '¡BZZT! Je suis Magnoboot, robot excavateur modèle MX-7. Prêt à déblayer !',
      ayuda: 'Je détecte quelque chose de métallique sous ces roches ! Tu veux que je creuse ?'
    },

    // Viralata est le chien errant — reflète la faune urbaine dominicaine
    viralata: {
      descripcion: 'Le chien errant remue la queue avec excitation. Il semble avoir trouvé une piste...'
    },

    // Le Cemí Chauve-souris est lié à la mythologie taïno des grottes
    cemiMurcielago: {
      presentacion: 'Une chauve-souris spectrale apparaît parmi les ombres de la grotte...',
      vinculo: "Tu ressens une connexion ancestrale avec l'esprit Cemí."
    },

    cueva: {
      espirituIntro1: 'Jeune descendant/e... les cemíes t\'ont amené/e ici pour une raison.',
      espirituIntro2: 'Ces grottes gardent la mémoire de notre peuple taïno.',
      espirituIntro3: 'Cherche les pétroglyphes sacrés. Ils te montreront le chemin.',
      espirituIntro4: 'Fais attention aux graffitis... quelqu\'un a profané ce lieu.',

      petroSol: 'C\'est le pétroglyphe du Soleil. Les Taïnos l\'adoraient comme source de toute vie. Sa chaleur nourrissait les conucos et sa lumière guidait les pêcheurs.',
      petroMurcielago: 'Le Cemí Chauve-souris... Les Taïnos croyaient que les esprits des morts se transformaient en chauves-souris et habitaient les grottes.',
      petroCara: 'Un visage sculpté dans la roche. Il peut représenter un cacique ou un esprit ancestral qui protégeait la grotte.',
      petroEspiral: 'La spirale symbolise l\'eau et le mouvement éternel. La mer était sacrée pour les Taïnos — elle apportait la subsistance.',
      petroRana: 'La grenouille représentait la fertilité et la pluie. Sans pluie pas de récolte, sans récolte pas de peuple.',

      arqueologoIntro: 'Halte-là ! Qui es-tu ?',
      arqueologoReconoce: 'Attends... tu as trouvé des pétroglyphes ? Incroyable ! Je suis la Dre Martínez, archéologue.',
      arqueologoRegalo: 'Tiens, tu en auras besoin dehors. C\'est Magnoboot, un robot excavateur qui t\'aidera.',
      arqueologoDespedida: 'Prends soin du patrimoine. Chaque pièce que tu trouves appartient au peuple dominicain.',

      misionExplorar: 'Explore la grotte et trouve les pétroglyphes',
      misionSalir: 'Cherche la sortie de la grotte',
      misionArtefacto: 'Apporte l\'artefact à la sortie',
      caida: 'Tu es tombé/e dans le vide ! Retour au dernier point sûr.'
    },

    // Dialogues du village taïno — enseignent la vie quotidienne
    aldea: {
      cacique1: 'Bienvenue dans notre yucayeque, jeune voyageur/euse !',
      cacique2: 'Je suis Guacanagaríx, cacique de ce village. Mon peuple vit ici depuis des générations.',
      cacique3: 'Un yucayeque est notre village — avec des bohíos pour les familles et le caney où je vis.',
      cacique4: 'Parle aux villageois. Chacun a beaucoup à t\'apprendre sur notre mode de vie.',

      alfarera1: 'Bonjour ! Je fabrique un pot en argile pour cuisiner.',
      alfarera2: 'Les Taïnos étaient de grands potiers. Nos vases étaient décorés de visages et de figures.',
      alfarera3: 'Avec l\'argile nous faisions des marmites, des assiettes et des burenes — le burén sert à griller le casabe.',
      alfarera4: 'Le casabe est fait de yuca râpée et pressée. C\'est le pain de notre peuple !',

      pescador1: 'Bonjour ! La pêche a été bonne dans la rivière aujourd\'hui.',
      pescador2: 'Les Taïnos pêchaient avec des filets de coton, des nasses en osier et des hameçons en os.',
      pescador3: 'Nous faisions aussi des pirogues taillées dans un seul tronc de ceiba.',
      pescador4: 'Certaines pirogues pouvaient transporter jusqu\'à 50 personnes entre les îles des Caraïbes !',

      perro1: 'Un chien errant ! Il a l\'air amical... il a faim et te regarde avec des yeux suppliants.',
      perro2: 'Le chien remue la queue et s\'approche doucement. Il veut t\'accompagner !',
      perro3: 'C\'est décidé ! Tu l\'appelleras Viralata. Son nez peut flairer les objets cachés. Il rejoint ton équipe !',

      misionHablar: 'Parle aux 3 villageois',
      misionCompleta: 'Village exploré ! Retour à la carte (Q)'
    },

    // Dialogues du deuxième village — agriculture, médecine et cérémonies
    aldea2: {
      behique1: 'Je suis Yuisa, le behique — guérisseur et guide spirituel de ce village.',
      behique2: 'Les plantes de cette île ont de grands pouvoirs curatifs que les dieux nous ont enseignés.',
      behique3: 'Nous utilisons le tabac dans la cérémonie de la cohoba, pour communiquer avec les cemíes.',
      behique4: 'La goyave guérit la fièvre, le jagua protège la peau et l\'aloès soigne les blessures.',

      agricultor1: 'Regarde nos conucos ! Chaque monticule de terre est un jardin de nourriture.',
      agricultor2: 'Les conucos sont des monticules où nous plantons. Ainsi la terre draine mieux et les racines poussent fortes.',
      agricultor3: 'Nous cultivons le yuca, le maïs, la patate douce, le piment et le tabac — tout ce dont nous avons besoin.',
      agricultor4: 'Le yuca est le plus important. Avec lui nous faisons le casabe, qui est notre pain quotidien.',

      musico1: 'Bienvenue au batey, le cœur de notre village !',
      musico2: 'Ici nous célébrons l\'areíto — notre grande cérémonie de musique, danse et mémoire.',
      musico3: 'Nous jouons des maracas en higüero, des güiros en calebasse et des tambours taillés dans des troncs de ceiba.',
      musico4: 'Dans l\'areíto nous chantons l\'histoire de notre peuple — pour que les jeunes n\'oublient jamais d\'où ils viennent.',

      misionHablar: 'Parle aux 3 villageois',
      misionCompleta: 'Village exploré ! Retour à la carte (Q)'
    }
  },

  // Le combat privilégie la résolution pacifique — reflète l'approche éducative du jeu
  combate: {
    atacar: 'Attaquer',
    hablar: 'Parler',
    negociar: 'Négocier',
    huir: 'Fuir',
    persuadir: 'Persuader',
    educar: 'Éduquer',
    pacificar: 'Pacifier'
  },

  objetos: {
    linterna: 'Lampe torche',
    navaja: 'Couteau suisse',
    brujula: 'Boussole',
    mapa: 'Carte Ancienne',
    magnetometro: 'Magnétomètre',
    fragmentoMapa: 'Fragment de Carte',
    artefactoTaino: 'Artefact Taïno',

    descLinterna: 'Éclaire l\'obscurité des grottes. Augmente ton rayon de vision.',
    descNavaja: 'Outil multifonction. Utile pour couper des lianes et ouvrir des serrures.',
    descBrujula: 'Indique le nord. T\'aide à ne pas te perdre dans les grands espaces.',
    descMapa: 'Une carte ancienne avec des marques mystérieuses de sites archéologiques.',
    descFragmentoMapa: 'Un morceau de carte ancienne. Il semble montrer d\'autres grottes.',
    descArtefactoTaino: 'Un cemí doré. Il doit être emmené au musée pour étude.',
    descMagnetometro: 'Détecte les objets métalliques enterrés sous terre.'
  },

  inventario: {
    titulo: 'Inventaire',
    vacio: 'Ton sac est vide',
    lleno: 'Sac plein',
    usar: '[E] Utiliser',
    cerrar: '[I] ou [Q] Fermer',
    slots: 'slots'
  },

  // Les mondes représentent des couches thématiques de l'histoire dominicaine
  mundos: {
    taino: 'Monde Taïno',
    colonial: 'Monde Colonial',
    acuatico: 'Monde Aquatique',
    juridico: 'Monde Juridique',
    laboratorio: 'Laboratoire / Musée'
  },

  // Le climat affecte le gameplay et reflète les phénomènes réels des Caraïbes
  clima: {
    soleado: 'Ensoleillé',
    lluvia: 'Pluie',
    huracan: 'Ouragan !',
    terremoto: 'Tremblement de terre !'
  },

  guardado: {
    guardarPartida: 'Sauvegarder la Partie',
    cargarPartida: 'Charger la Partie',
    nombreSesion: 'Nom de la session',
    contrasena: 'Mot de passe',
    guardarLocal: 'Sauvegarder Localement',
    guardarNube: 'Sauvegarder dans le Cloud',
    guardadoExitoso: 'Partie sauvegardée !',
    errorGuardado: 'Erreur lors de la sauvegarde'
  },

  tutorial: {
    bienvenida: 'Bienvenue dans ArcLycée !',
    movimiento: 'Utilise les flèches ou WASD pour te déplacer',
    accion: 'Appuie sur E pour interagir avec les objets et personnages',
    saltar: 'Appuie sur ESPACE pour sauter (dans les zones de plateformes)'
  }
};

export default fr;
