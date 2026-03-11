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
    magnetometro: 'Magnétomètre'
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
